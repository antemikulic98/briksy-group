import { getBugReports } from "@/lib/actions/bug-reports";
import Link from "next/link";

export const metadata = { title: "Bug reporti" };

function severityBadge(severity: string) {
  const map: Record<string, string> = {
    LOW: "border-gray-200 bg-gray-50 text-gray-600",
    MEDIUM: "border-orange-200 bg-orange-50 text-orange-700",
    HIGH: "border-red-200 bg-red-50 text-red-700",
    CRITICAL: "border-red-300 bg-red-100 text-red-800",
  };
  return map[severity] || "border-gray-200 bg-gray-50 text-gray-600";
}

function statusBadge(status: string) {
  const map: Record<string, string> = {
    OPEN: "border-blue-200 bg-blue-50 text-blue-700",
    IN_PROGRESS: "border-orange-200 bg-orange-50 text-orange-700",
    RESOLVED: "border-green-200 bg-green-50 text-green-700",
    CLOSED: "border-gray-200 bg-gray-50 text-gray-600",
  };
  return map[status] || "border-gray-200 bg-gray-50 text-gray-600";
}

function statusLabel(status: string) {
  const map: Record<string, string> = {
    OPEN: "Otvoren",
    IN_PROGRESS: "U tijeku",
    RESOLVED: "Riješen",
    CLOSED: "Zatvoren",
  };
  return map[status] || status;
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

export default async function BugReportsPage({
  searchParams,
}: {
  searchParams: Promise<{ page?: string; status?: string; severity?: string }>;
}) {
  const params = await searchParams;
  const page = parseInt(params.page || "1");
  const statusFilter = params.status || undefined;
  const severityFilter = params.severity || undefined;

  const { reports, total, totalPages } = await getBugReports(
    page,
    statusFilter,
    severityFilter
  );

  return (
    <>
      <div className="mb-6 flex items-center justify-between">
        <h1 className="text-2xl font-bold text-foreground">Bug reporti</h1>
        <Link
          href="/admin/bug-reports/new"
          className="rounded-lg bg-accent px-4 py-2 text-sm font-medium text-white hover:bg-accent-dark"
        >
          Novi report
        </Link>
      </div>

      {/* Filters */}
      <div className="mb-6 flex flex-wrap gap-4">
        <div className="flex flex-wrap items-center gap-2">
          <span className="text-xs font-medium uppercase text-muted">Status:</span>
          {["", "OPEN", "IN_PROGRESS", "RESOLVED", "CLOSED"].map((s) => (
            <Link
              key={s}
              href={`/admin/bug-reports?${s ? `status=${s}` : ""}${severityFilter ? `&severity=${severityFilter}` : ""}`}
              className={`rounded-full border px-3 py-1 text-xs font-medium transition-colors ${
                (statusFilter || "") === s
                  ? "border-accent bg-accent/10 text-accent"
                  : "border-border bg-white text-muted hover:border-accent/40"
              }`}
            >
              {s ? statusLabel(s) : "Svi"}
            </Link>
          ))}
        </div>
        <div className="flex flex-wrap items-center gap-2">
          <span className="text-xs font-medium uppercase text-muted">Severity:</span>
          {["", "LOW", "MEDIUM", "HIGH", "CRITICAL"].map((s) => (
            <Link
              key={s}
              href={`/admin/bug-reports?${statusFilter ? `status=${statusFilter}&` : ""}${s ? `severity=${s}` : ""}`}
              className={`rounded-full border px-3 py-1 text-xs font-medium transition-colors ${
                (severityFilter || "") === s
                  ? "border-accent bg-accent/10 text-accent"
                  : "border-border bg-white text-muted hover:border-accent/40"
              }`}
            >
              {s || "Svi"}
            </Link>
          ))}
        </div>
      </div>

      <p className="mb-4 text-sm text-muted">Ukupno: {total} reporta</p>

      {/* Table */}
      <div className="overflow-x-auto rounded-xl border border-border bg-white shadow-sm">
        <table className="w-full text-sm">
          <thead className="bg-slate-50">
            <tr>
              <th className="px-5 py-3 text-left text-xs font-medium uppercase text-muted">
                Naslov
              </th>
              <th className="px-5 py-3 text-left text-xs font-medium uppercase text-muted">
                Severity
              </th>
              <th className="px-5 py-3 text-left text-xs font-medium uppercase text-muted">
                Status
              </th>
              <th className="px-5 py-3 text-left text-xs font-medium uppercase text-muted">
                Prijavio
              </th>
              <th className="px-5 py-3 text-left text-xs font-medium uppercase text-muted">
                Vrijeme
              </th>
            </tr>
          </thead>
          <tbody>
            {reports.length === 0 ? (
              <tr>
                <td colSpan={5} className="px-5 py-8 text-center text-muted">
                  Nema bug reporta.
                </td>
              </tr>
            ) : (
              reports.map((report) => (
                <tr
                  key={report.id}
                  className="border-b border-border last:border-0"
                >
                  <td className="px-5 py-3">
                    <Link
                      href={`/admin/bug-reports/${report.id}`}
                      className="font-medium text-accent hover:underline"
                    >
                      {report.title}
                    </Link>
                  </td>
                  <td className="px-5 py-3">
                    <span
                      className={`inline-flex rounded-full border px-2.5 py-0.5 text-xs font-medium ${severityBadge(report.severity)}`}
                    >
                      {report.severity}
                    </span>
                  </td>
                  <td className="px-5 py-3">
                    <span
                      className={`inline-flex rounded-full border px-2.5 py-0.5 text-xs font-medium ${statusBadge(report.status)}`}
                    >
                      {statusLabel(report.status)}
                    </span>
                  </td>
                  <td className="px-5 py-3 text-muted">{report.user.name}</td>
                  <td className="whitespace-nowrap px-5 py-3 text-muted">
                    {timeAgo(report.createdAt)}
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
              href={`/admin/bug-reports?page=${p}${statusFilter ? `&status=${statusFilter}` : ""}${severityFilter ? `&severity=${severityFilter}` : ""}`}
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
