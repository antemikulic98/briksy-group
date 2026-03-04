import { auth } from "@/lib/auth";
import { NextResponse } from "next/server";

export default auth((req) => {
  const { pathname } = req.nextUrl;
  const isLoggedIn = !!req.auth;
  const role = req.auth?.user?.role;
  const twoFactorVerified = req.auth?.user?.twoFactorVerified;

  // Handle 2FA verification page
  if (pathname === "/login/verify-2fa") {
    if (!isLoggedIn) {
      return NextResponse.redirect(new URL("/login", req.url));
    }
    // Only admins who haven't verified 2FA should be here
    if (role !== "ADMIN" || twoFactorVerified !== false) {
      const target = role === "ADMIN" ? "/admin" : "/dashboard";
      return NextResponse.redirect(new URL(target, req.url));
    }
    return NextResponse.next();
  }

  // Zaštita dashboard ruta — zahtijeva login
  if (pathname.startsWith("/dashboard")) {
    if (!isLoggedIn) {
      return NextResponse.redirect(new URL("/login", req.url));
    }
    // Admini idu na /admin, ne /dashboard
    if (role === "ADMIN") {
      return NextResponse.redirect(new URL("/admin", req.url));
    }
  }

  // Zaštita admin ruta — zahtijeva ADMIN role
  if (pathname.startsWith("/admin")) {
    if (!isLoggedIn) {
      return NextResponse.redirect(new URL("/login", req.url));
    }
    if (role !== "ADMIN") {
      return NextResponse.redirect(new URL("/dashboard", req.url));
    }
    // Admin mora završiti 2FA verifikaciju
    if (twoFactorVerified === false) {
      return NextResponse.redirect(new URL("/login/verify-2fa", req.url));
    }
  }

  // Ako je logiran i ide na /login, redirectaj ga
  if (pathname === "/login" && isLoggedIn) {
    if (role === "ADMIN") {
      if (twoFactorVerified === false) {
        return NextResponse.redirect(new URL("/login/verify-2fa", req.url));
      }
      return NextResponse.redirect(new URL("/admin", req.url));
    }
    return NextResponse.redirect(new URL("/dashboard", req.url));
  }

  return NextResponse.next();
});

export const config = {
  matcher: ["/dashboard/:path*", "/admin/:path*", "/login", "/login/verify-2fa"],
};
