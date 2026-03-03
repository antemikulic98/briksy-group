import { auth } from "@/lib/auth";
import { redirect } from "next/navigation";
import { getMyBugReports } from "@/lib/actions/bug-reports";
import BugReportClientForm from "./bug-report-client-form";

export const metadata = { title: "Prijavi bug" };

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

export default async function ClientBugReportPage() {
  const session = await auth();
  if (!session) redirect("/login");

  const myReports = await getMyBugReports();

  return (
    <>
      <h1 className="mb-6 text-2xl font-bold text-foreground">Prijavi bug</h1>

      <div className="grid gap-8 lg:grid-cols-2">
        <div>
          <h2 className="mb-4 text-lg font-semibold text-foreground">
            Novi report
          </h2>
          <BugReportClientForm />
        </div>

        <div>
          <h2 className="mb-4 text-lg font-semibold text-foreground">
            Moji reporti
          </h2>
          {myReports.length === 0 ? (
            <p className="text-sm text-muted">Nema prijavljenih bugova.</p>
          ) : (
            <div className="space-y-3">
              {myReports.map((report) => (
                <div
                  key={report.id}
                  className="rounded-xl border border-border bg-white p-4 shadow-sm"
                >
                  <div className="flex items-start justify-between gap-2">
                    <h3 className="text-sm font-medium text-foreground">
                      {report.title}
                    </h3>
                    <span
                      className={`shrink-0 inline-flex rounded-full border px-2.5 py-0.5 text-xs font-medium ${statusBadge(report.status)}`}
                    >
                      {statusLabel(report.status)}
                    </span>
                  </div>
                  <p className="mt-1 text-xs text-muted">
                    {report.severity} &middot;{" "}
                    {new Date(report.createdAt).toLocaleDateString("hr-HR")}
                  </p>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </>
  );
}
