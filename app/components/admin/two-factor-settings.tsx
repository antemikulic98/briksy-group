"use client";

import {
  setupTwoFactor,
  confirmTwoFactorSetup,
  disableTwoFactor,
} from "@/lib/actions/two-factor";
import { useState } from "react";
import { useRouter } from "next/navigation";
import QRCode from "qrcode";

type Step = "idle" | "setup" | "confirm" | "backup" | "disable";

export default function TwoFactorSettings({
  enabled,
  backupCodesRemaining,
}: {
  enabled: boolean;
  backupCodesRemaining: number;
}) {
  const router = useRouter();
  const [step, setStep] = useState<Step>("idle");
  const [qrDataUrl, setQrDataUrl] = useState<string | null>(null);
  const [manualSecret, setManualSecret] = useState<string | null>(null);
  const [code, setCode] = useState("");
  const [password, setPassword] = useState("");
  const [backupCodes, setBackupCodes] = useState<string[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  async function handleSetup() {
    setLoading(true);
    setError(null);
    const result = await setupTwoFactor();
    setLoading(false);

    if ("error" in result) {
      setError(result.error!);
      return;
    }

    const dataUrl = await QRCode.toDataURL(result.uri!, { width: 256 });
    setQrDataUrl(dataUrl);
    setManualSecret(result.secret!);
    setStep("setup");
  }

  async function handleConfirm(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setError(null);

    const result = await confirmTwoFactorSetup(code.trim());
    setLoading(false);

    if ("error" in result) {
      setError(result.error!);
      return;
    }

    setBackupCodes(result.backupCodes!);
    setStep("backup");
  }

  async function handleDisable(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setError(null);

    const result = await disableTwoFactor(password);
    setLoading(false);

    if ("error" in result) {
      setError(result.error!);
      return;
    }

    setStep("idle");
    setPassword("");
    router.refresh();
  }

  function copyBackupCodes() {
    navigator.clipboard.writeText(backupCodes.join("\n"));
  }

  // Idle state — show status
  if (step === "idle") {
    return (
      <div className="space-y-4">
        <div className="flex items-center gap-3">
          <div
            className={`inline-flex items-center rounded-full px-3 py-1 text-xs font-medium ${
              enabled
                ? "bg-green-100 text-green-700"
                : "bg-gray-100 text-gray-600"
            }`}
          >
            {enabled ? "Aktivirano" : "Nije aktivirano"}
          </div>
          {enabled && (
            <span className="text-xs text-muted">
              Preostalo rezervnih kodova: {backupCodesRemaining}/8
            </span>
          )}
        </div>

        {enabled ? (
          <button
            onClick={() => {
              setStep("disable");
              setError(null);
            }}
            className="rounded-lg border border-red-200 px-4 py-2 text-sm font-medium text-red-600 hover:bg-red-50"
          >
            Deaktiviraj 2FA
          </button>
        ) : (
          <button
            onClick={handleSetup}
            disabled={loading}
            className="rounded-lg bg-accent px-4 py-2 text-sm font-medium text-white hover:bg-accent-dark disabled:opacity-50"
          >
            {loading ? "Priprema..." : "Aktiviraj 2FA"}
          </button>
        )}
      </div>
    );
  }

  // Setup step — show QR code
  if (step === "setup") {
    return (
      <form onSubmit={handleConfirm} className="space-y-5">
        {error && (
          <div className="rounded-lg border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-600">
            {error}
          </div>
        )}

        <div className="space-y-3">
          <p className="text-sm font-medium text-foreground">
            1. Skenirajte QR kod u autentikacijskoj aplikaciji
          </p>
          <div className="flex justify-center rounded-lg border border-border bg-white p-4">
            {qrDataUrl && (
              <img src={qrDataUrl} alt="2FA QR kod" width={200} height={200} />
            )}
          </div>
          <details className="text-xs text-muted">
            <summary className="cursor-pointer hover:text-accent">
              Ne možete skenirati? Unesite kod ručno
            </summary>
            <code className="mt-2 block break-all rounded-lg bg-gray-100 p-3 text-xs font-mono">
              {manualSecret}
            </code>
          </details>
        </div>

        <div>
          <label
            htmlFor="confirm-code"
            className="mb-1 block text-sm font-medium text-foreground"
          >
            2. Unesite kod iz aplikacije za potvrdu
          </label>
          <input
            id="confirm-code"
            type="text"
            inputMode="numeric"
            autoComplete="one-time-code"
            autoFocus
            maxLength={6}
            value={code}
            onChange={(e) => setCode(e.target.value)}
            className="w-full rounded-lg border border-border px-4 py-2.5 text-center text-lg tracking-widest outline-none transition-colors focus:border-accent focus:ring-1 focus:ring-accent"
            placeholder="000000"
          />
        </div>

        <div className="flex gap-3">
          <button
            type="submit"
            disabled={loading || code.length < 6}
            className="rounded-lg bg-accent px-4 py-2 text-sm font-medium text-white hover:bg-accent-dark disabled:opacity-50"
          >
            {loading ? "Verificiram..." : "Potvrdi"}
          </button>
          <button
            type="button"
            onClick={() => {
              setStep("idle");
              setCode("");
              setError(null);
            }}
            className="rounded-lg border border-border px-4 py-2 text-sm font-medium hover:bg-gray-50"
          >
            Odustani
          </button>
        </div>
      </form>
    );
  }

  // Backup codes step
  if (step === "backup") {
    return (
      <div className="space-y-5">
        <div className="rounded-lg border border-amber-200 bg-amber-50 p-4">
          <p className="text-sm font-semibold text-amber-800">
            Spremite rezervne kodove na sigurno mjesto!
          </p>
          <p className="mt-1 text-xs text-amber-700">
            Ovi kodovi neće biti prikazani ponovo. Koristite ih za pristup ako
            izgubite pristup autentikacijskoj aplikaciji.
          </p>
        </div>

        <div className="grid grid-cols-2 gap-2">
          {backupCodes.map((bc) => (
            <div
              key={bc}
              className="rounded-lg border border-border bg-gray-50 px-3 py-2 text-center font-mono text-sm"
            >
              {bc}
            </div>
          ))}
        </div>

        <div className="flex gap-3">
          <button
            onClick={copyBackupCodes}
            className="rounded-lg border border-border px-4 py-2 text-sm font-medium hover:bg-gray-50"
          >
            Kopiraj sve
          </button>
          <button
            onClick={() => {
              setStep("idle");
              setBackupCodes([]);
              router.refresh();
            }}
            className="rounded-lg bg-accent px-4 py-2 text-sm font-medium text-white hover:bg-accent-dark"
          >
            Gotovo
          </button>
        </div>
      </div>
    );
  }

  // Disable step — requires password
  if (step === "disable") {
    return (
      <form onSubmit={handleDisable} className="space-y-4">
        {error && (
          <div className="rounded-lg border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-600">
            {error}
          </div>
        )}

        <p className="text-sm text-muted">
          Unesite svoju lozinku za deaktiviranje dvofaktorske autentikacije.
        </p>

        <div>
          <label
            htmlFor="disable-password"
            className="mb-1 block text-sm font-medium text-foreground"
          >
            Lozinka
          </label>
          <input
            id="disable-password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full rounded-lg border border-border px-4 py-2.5 text-sm outline-none transition-colors focus:border-accent focus:ring-1 focus:ring-accent"
            placeholder="••••••••"
          />
        </div>

        <div className="flex gap-3">
          <button
            type="submit"
            disabled={loading || !password}
            className="rounded-lg bg-red-600 px-4 py-2 text-sm font-medium text-white hover:bg-red-700 disabled:opacity-50"
          >
            {loading ? "Deaktiviram..." : "Deaktiviraj 2FA"}
          </button>
          <button
            type="button"
            onClick={() => {
              setStep("idle");
              setPassword("");
              setError(null);
            }}
            className="rounded-lg border border-border px-4 py-2 text-sm font-medium hover:bg-gray-50"
          >
            Odustani
          </button>
        </div>
      </form>
    );
  }

  return null;
}
