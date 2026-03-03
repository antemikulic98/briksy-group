import NextAuth from "next-auth";
import Credentials from "next-auth/providers/credentials";
import bcrypt from "bcryptjs";
import { prisma } from "./prisma";
import { Role } from "@prisma/client";
import { rateLimit } from "./rate-limit";
import { logSecurityEvent } from "./security-logger";

export const { handlers, signIn, signOut, auth } = NextAuth({
  providers: [
    Credentials({
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Lozinka", type: "password" },
      },
      async authorize(credentials, request) {
        if (!credentials?.email || !credentials?.password) return null;

        const email = credentials.email as string;

        // Rate limit login attempts per email
        const rl = rateLimit(`login:${email}`, 5, 15 * 60 * 1000);
        if (!rl.success) {
          const ip = request?.headers?.get?.("x-forwarded-for")?.split(",")[0]?.trim();
          await logSecurityEvent("RATE_LIMITED", `Login rate limited for ${email}`, {
            ip: ip || undefined,
            email,
          });
          return null;
        }

        const user = await prisma.user.findUnique({
          where: { email },
        });

        if (!user) {
          await logSecurityEvent("LOGIN_FAILED", `Failed login — unknown email`, { email });
          return null;
        }

        const isValid = await bcrypt.compare(
          credentials.password as string,
          user.password
        );

        if (!isValid) {
          await logSecurityEvent("LOGIN_FAILED", `Failed login — wrong password`, {
            email,
            userId: user.id,
          });
          return null;
        }

        await logSecurityEvent("LOGIN_SUCCESS", `Successful login`, {
          email,
          userId: user.id,
        });

        return {
          id: user.id,
          email: user.email,
          name: user.name,
          role: user.role,
        };
      },
    }),
  ],
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id as string;
        token.role = user.role;
      }
      return token;
    },
    async session({ session, token }) {
      session.user.id = token.id as string;
      session.user.role = token.role as Role;
      return session;
    },
  },
  pages: {
    signIn: "/login",
  },
  session: {
    strategy: "jwt",
  },
});
