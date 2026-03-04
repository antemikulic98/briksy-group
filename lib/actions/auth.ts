"use server";

import { signIn, signOut, auth } from "@/lib/auth";
import { AuthError } from "next-auth";
import { redirect } from "next/navigation";

export async function login(formData: FormData) {
  try {
    await signIn("credentials", {
      email: formData.get("email") as string,
      password: formData.get("password") as string,
      redirect: false,
    });
  } catch (error) {
    if (error instanceof AuthError) {
      return { error: "Pogrešan email ili lozinka." };
    }
    throw error;
  }

  // If signIn succeeded (no error thrown), get session to determine redirect
  const session = await auth();
  if (session?.user?.role === "ADMIN") {
    if (session.user.twoFactorVerified === false) {
      redirect("/login/verify-2fa");
    }
    redirect("/admin");
  } else {
    redirect("/dashboard");
  }
}

export async function logout() {
  await signOut({ redirectTo: "/login" });
}
