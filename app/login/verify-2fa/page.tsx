import SessionProviderWrapper from "@/app/components/auth/session-provider-wrapper";
import VerifyTwoFactorForm from "@/app/components/auth/verify-2fa-form";
import Link from "next/link";

export const metadata = {
  title: "Dvofaktorska verifikacija — Briksy Group",
};

export default function VerifyTwoFactorPage() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-slate-50 px-6">
      <div className="w-full max-w-sm">
        <div className="mb-8 text-center">
          <Link href="/" className="inline-block">
            <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-accent text-lg font-bold text-white">
              B
            </div>
          </Link>
          <h1 className="text-xl font-bold text-foreground">
            Dvofaktorska autentikacija
          </h1>
          <p className="mt-1 text-sm text-muted">
            Unesite kod iz vaše autentikacijske aplikacije
          </p>
        </div>

        <div className="rounded-2xl border border-border bg-white p-6 shadow-sm">
          <SessionProviderWrapper>
            <VerifyTwoFactorForm />
          </SessionProviderWrapper>
        </div>
      </div>
    </div>
  );
}
