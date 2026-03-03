import { getBugReport } from "@/lib/actions/bug-reports";
import { notFound } from "next/navigation";
import Link from "next/link";
import StatusChanger from "./status-changer";

export const metadata = { title: "Bug report detalj" };

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

export default async function BugReportDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;

  let report;
  try {
    report = await getBugReport(id);
  } catch {
    notFound();
  }

  if (!report) notFound();

  return (
    <>
      <div className="mb-6">
        <Link
          href="/admin/bug-reports"
          className="text-sm text-muted hover:text-accent"
        >
          &larr; Natrag na listu
        </Link>
      </div>

      <div className="max-w-3xl">
        <div className="rounded-xl border border-border bg-white p-6 shadow-sm">
          <div className="mb-4 flex flex-wrap items-start justify-between gap-3">
            <h1 className="text-xl font-bold text-foreground">
              {report.title}
            </h1>
            <div className="flex gap-2">
              <span
                className={`inline-flex rounded-full border px-2.5 py-0.5 text-xs font-medium ${severityBadge(report.severity)}`}
              >
                {report.severity}
              </span>
              <span
                className={`inline-flex rounded-full border px-2.5 py-0.5 text-xs font-medium ${statusBadge(report.status)}`}
              >
                {statusLabel(report.status)}
              </span>
            </div>
          </div>

          <div className="mb-6 space-y-1 text-sm text-muted">
            <p>
              Prijavio: <span className="font-medium text-foreground">{report.user.name}</span>{" "}
              ({report.user.email})
            </p>
            <p>
              Kreirano: {new Date(report.createdAt).toLocaleDateString("hr-HR")},{" "}
              {new Date(report.createdAt).toLocaleTimeString("hr-HR", {
                hour: "2-digit",
                minute: "2-digit",
              })}
            </p>
            {report.page && (
              <p>
                Stranica: <code className="rounded bg-slate-100 px-1.5 py-0.5 text-xs">{report.page}</code>
              </p>
            )}
          </div>

          <div className="rounded-lg border border-border bg-slate-50 p-4">
            <p className="whitespace-pre-wrap text-sm text-foreground">
              {report.description}
            </p>
          </div>

          <div className="mt-6 border-t border-border pt-6">
            <h3 className="mb-3 text-sm font-semibold text-foreground">
              Promijeni status
            </h3>
            <StatusChanger reportId={report.id} currentStatus={report.status} />
          </div>
        </div>
      </div>
    </>
  );
}
