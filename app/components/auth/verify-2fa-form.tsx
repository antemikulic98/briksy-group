"use client";

import { verifyTwoFactorLogin } from "@/lib/actions/two-factor";
import { logout } from "@/lib/actions/auth";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function VerifyTwoFactorForm() {
  const { update } = useSession();
  const router = useRouter();
  const [code, setCode] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [useBackupCode, setUseBackupCode] = useState(false);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setError(null);

    const trimmed = code.trim();
    if (trimmed.length < 6) {
      setError("Kod mora imati najmanje 6 znakova.");
      setLoading(false);
      return;
    }

    const result = await verifyTwoFactorLogin(trimmed);

    if (result.error) {
      setError(result.error);
      setLoading(false);
      return;
    }

    // Update JWT to set twoFactorVerified = true
    await update({ twoFactorVerified: true });
    router.push("/admin");
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      {error && (
        <div className="rounded-lg border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-600">
          {error}
        </div>
      )}

      <div>
        <label
          htmlFor="code"
          className="mb-1 block text-sm font-medium text-foreground"
        >
          {useBackupCode ? "Rezervni kod" : "Autentikacijski kod"}
        </label>
        <input
          id="code"
          type="text"
          inputMode={useBackupCode ? "text" : "numeric"}
          autoComplete="one-time-code"
          autoFocus
          required
          maxLength={useBackupCode ? 8 : 6}
          value={code}
          onChange={(e) => setCode(e.target.value)}
          className="w-full rounded-lg border border-border px-4 py-2.5 text-center text-lg tracking-widest outline-none transition-colors focus:border-accent focus:ring-1 focus:ring-accent"
          placeholder={useBackupCode ? "a3f1b2c4" : "000000"}
        />
        <p className="mt-1.5 text-xs text-muted">
          {useBackupCode
            ? "Unesite jedan od rezervnih kodova koje ste dobili pri aktivaciji 2FA."
            : "Unesite 6-znamenkasti kod iz autentikacijske aplikacije (Google Authenticator, Authy, itd.)"}
        </p>
      </div>

      <button
        type="submit"
        disabled={loading}
        className="w-full rounded-lg bg-accent px-4 py-2.5 text-sm font-medium text-white transition-colors hover:bg-accent-dark disabled:opacity-50"
      >
        {loading ? "Verificiram..." : "Verificiraj"}
      </button>

      <div className="flex items-center justify-between pt-2">
        <button
          type="button"
          onClick={() => {
            setUseBackupCode(!useBackupCode);
            setCode("");
            setError(null);
          }}
          className="text-xs text-muted hover:text-accent"
        >
          {useBackupCode
            ? "Koristite autentikacijski kod"
            : "Koristite rezervni kod"}
        </button>

        <button
          type="button"
          onClick={() => logout()}
          className="text-xs text-muted hover:text-red-600"
        >
          Odjavi se
        </button>
      </div>
    </form>
  );
}
