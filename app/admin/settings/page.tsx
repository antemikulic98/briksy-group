import TwoFactorSettings from "@/app/components/admin/two-factor-settings";
import { getTwoFactorStatus } from "@/lib/actions/two-factor";

export const metadata = {
  title: "Postavke — Admin",
};

export default async function AdminSettingsPage() {
  const status = await getTwoFactorStatus();

  return (
    <>
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-foreground">Postavke</h1>
        <p className="mt-1 text-sm text-muted">
          Upravljajte sigurnosnim postavkama vašeg računa.
        </p>
      </div>

      <div className="rounded-xl border border-border bg-white p-6">
        <h2 className="text-lg font-semibold text-foreground">
          Dvofaktorska autentikacija (2FA)
        </h2>
        <p className="mt-1 text-sm text-muted">
          Zaštitite svoj račun dodatnim slojem sigurnosti. Nakon aktivacije,
          prilikom svake prijave trebat ćete unijeti kod iz autentikacijske
          aplikacije.
        </p>
        <div className="mt-6">
          <TwoFactorSettings
            enabled={status.enabled}
            backupCodesRemaining={status.backupCodesRemaining}
          />
        </div>
      </div>
    </>
  );
}
