import { getSecurityLogs } from "@/lib/actions/security";
import Link from "next/link";

export const metadata = { title: "Sigurnost" };

const EVENT_TYPES = [
  { value: "", label: "Svi tipovi" },
  { value: "LOGIN_SUCCESS", label: "Uspješan login" },
  { value: "LOGIN_FAILED", label: "Neuspješan login" },
  { value: "RATE_LIMITED", label: "Rate limited" },
  { value: "SPAM_BLOCKED", label: "Spam blokiran" },
  { value: "UNAUTHORIZED_ACCESS", label: "Neovlašteni pristup" },
];

function typeBadge(type: string) {
  const map: Record<string, string> = {
    LOGIN_SUCCESS: "border-green-200 bg-green-50 text-green-700",
    LOGIN_FAILED: "border-red-200 bg-red-50 text-red-700",
    RATE_LIMITED: "border-orange-200 bg-orange-50 text-orange-700",
    SPAM_BLOCKED: "border-purple-200 bg-purple-50 text-purple-700",
    UNAUTHORIZED_ACCESS: "border-red-200 bg-red-50 text-red-700",
  };
  return map[type] || "border-gray-200 bg-gray-50 text-gray-700";
}

function typeLabel(type: string) {
  const map: Record<string, string> = {
    LOGIN_SUCCESS: "Login OK",
    LOGIN_FAILED: "Login fail",
    RATE_LIMITED: "Rate limit",
    SPAM_BLOCKED: "Spam",
    UNAUTHORIZED_ACCESS: "Unauthorized",
  };
  return map[type] || type;
}

function timeAgo(date: Date): string {
  const d = new Date(date);
  const now = new Date();
  const diff = now.getTime() - d.getTime();
  const minutes = Math.floor(diff / 60000);
  if (minutes < 1) return "upravo";
  if (minutes < 60) return `prije ${minutes} min`;
  const hours = Math.floor(minutes / 60);
  if (hours < 24) return `prije ${hours}h`;
  const days = Math.floor(hours / 24);
  return `prije ${days}d`;
}

export default async function SecurityPage({
  searchParams,
}: {
  searchParams: Promise<{ page?: string; type?: string }>;
}) {
  const params = await searchParams;
  const page = parseInt(params.page || "1");
  const typeFilter = params.type || undefined;

  const { logs, total, totalPages } = await getSecurityLogs(page, typeFilter);

  return (
    <>
      <h1 className="mb-6 text-2xl font-bold text-foreground">
        Sigurnosni logovi
      </h1>

      {/* Filters */}
      <div className="mb-6 flex flex-wrap items-center gap-2">
        {EVENT_TYPES.map((t) => (
          <Link
            key={t.value}
            href={`/admin/security${t.value ? `?type=${t.value}` : ""}`}
            className={`rounded-full border px-3 py-1.5 text-xs font-medium transition-colors ${
              (typeFilter || "") === t.value
                ? "border-accent bg-accent/10 text-accent"
                : "border-border bg-white text-muted hover:border-accent/40"
            }`}
          >
            {t.label}
          </Link>
        ))}
      </div>

      <p className="mb-4 text-sm text-muted">
        Ukupno: {total} zapisa
      </p>

      {/* Table */}
      <div className="overflow-x-auto rounded-xl border border-border bg-white shadow-sm">
        <table className="w-full text-sm">
          <thead className="bg-slate-50">
            <tr>
              <th className="px-5 py-3 text-left text-xs font-medium uppercase text-muted">
                Tip
              </th>
              <th className="px-5 py-3 text-left text-xs font-medium uppercase text-muted">
                Poruka
              </th>
              <th className="px-5 py-3 text-left text-xs font-medium uppercase text-muted">
                Email
              </th>
              <th className="px-5 py-3 text-left text-xs font-medium uppercase text-muted">
                IP
              </th>
              <th className="px-5 py-3 text-left text-xs font-medium uppercase text-muted">
                Vrijeme
              </th>
            </tr>
          </thead>
          <tbody>
            {logs.length === 0 ? (
              <tr>
                <td colSpan={5} className="px-5 py-8 text-center text-muted">
                  Nema logova.
                </td>
              </tr>
            ) : (
              logs.map((log) => (
                <tr
                  key={log.id}
                  className="border-b border-border last:border-0"
                >
                  <td className="px-5 py-3">
                    <span
                      className={`inline-flex rounded-full border px-2.5 py-0.5 text-xs font-medium ${typeBadge(log.type)}`}
                    >
                      {typeLabel(log.type)}
                    </span>
                  </td>
                  <td className="max-w-xs truncate px-5 py-3 text-foreground">
                    {log.message}
                  </td>
                  <td className="px-5 py-3 text-muted">
                    {log.email || "—"}
                  </td>
                  <td className="px-5 py-3 font-mono text-xs text-muted">
                    {log.ip || "—"}
                  </td>
                  <td className="whitespace-nowrap px-5 py-3 text-muted">
                    {timeAgo(log.createdAt)}
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      {/* Pagination */}
      {totalPages > 1 && (
        <div className="mt-6 flex items-center justify-center gap-2">
          {Array.from({ length: totalPages }, (_, i) => i + 1).map((p) => (
            <Link
              key={p}
              href={`/admin/security?page=${p}${typeFilter ? `&type=${typeFilter}` : ""}`}
              className={`flex h-9 w-9 items-center justify-center rounded-lg text-sm font-medium transition-colors ${
                p === page
                  ? "bg-accent text-white"
                  : "border border-border bg-white text-muted hover:bg-slate-50"
              }`}
            >
              {p}
            </Link>
          ))}
        </div>
      )}
    </>
  );
}
