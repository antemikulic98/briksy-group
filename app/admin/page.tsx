import { prisma } from "@/lib/prisma";
import { auth } from "@/lib/auth";
import { redirect } from "next/navigation";
import Link from "next/link";

export const metadata = {
  title: "Admin pregled",
};

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

function activityIcon(type: string): string {
  switch (type) {
    case "PROJECT_CREATED":
      return "+";
    case "PROJECT_UPDATED":
      return "~";
    case "PHASE_CREATED":
      return "+";
    case "PHASE_UPDATED":
      return "~";
    case "PHASE_DELETED":
      return "-";
    case "COMMENT_ADDED":
      return "C";
    case "DOCUMENT_UPLOADED":
      return "D";
    default:
      return "•";
  }
}

export default async function AdminPage() {
  const session = await auth();
  if (!session || session.user.role !== "ADMIN") redirect("/login");

  const [clientCount, projectCounts, phaseStats, recentActivities, recentInquiries] =
    await Promise.all([
      prisma.user.count({ where: { role: "CLIENT" } }),
      prisma.project.groupBy({
        by: ["status"],
        _count: true,
      }),
      prisma.phase.aggregate({
        _avg: { percentage: true },
        _count: true,
      }),
      prisma.activity.findMany({
        include: {
          user: { select: { name: true } },
          project: { select: { name: true } },
        },
        orderBy: { createdAt: "desc" },
        take: 10,
      }),
      prisma.inquiry.findMany({
        orderBy: { createdAt: "desc" },
        take: 5,
      }),
    ]);

  const totalProjects = projectCounts.reduce((sum, p) => sum + p._count, 0);
  const activeProjects =
    projectCounts.find((p) => p.status === "AKTIVAN")?._count ?? 0;
  const completedProjects =
    projectCounts.find((p) => p.status === "ZAVRSEN")?._count ?? 0;
  const pausedProjects =
    projectCounts.find((p) => p.status === "PAUZIRAN")?._count ?? 0;

  const stats = [
    { label: "Klijenata", value: clientCount },
    { label: "Ukupno projekata", value: totalProjects },
    { label: "Aktivnih", value: activeProjects },
    { label: "Završenih", value: completedProjects },
    { label: "Pauziranih", value: pausedProjects },
    {
      label: "Prosj. napredak",
      value: `${Math.round(phaseStats._avg.percentage ?? 0)}%`,
    },
  ];

  return (
    <>
      <h1 className="mb-6 text-2xl font-bold text-foreground">Pregled</h1>

      {/* Stats */}
      <div className="mb-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {stats.map((stat) => (
          <div
            key={stat.label}
            className="rounded-xl border border-border bg-white p-5 shadow-sm"
          >
            <div className="text-sm text-muted">{stat.label}</div>
            <div className="mt-1 text-2xl font-bold text-foreground">
              {stat.value}
            </div>
          </div>
        ))}
      </div>

      <div className="grid gap-8 lg:grid-cols-2">
        {/* Recent activities */}
        <div className="rounded-xl border border-border bg-white p-6 shadow-sm">
          <h2 className="mb-4 text-lg font-semibold text-foreground">
            Nedavne aktivnosti
          </h2>
          {recentActivities.length === 0 ? (
            <p className="text-sm text-muted">Nema aktivnosti.</p>
          ) : (
            <div className="space-y-3">
              {recentActivities.map((activity) => (
                <div key={activity.id} className="flex items-start gap-3">
                  <div className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-slate-100 text-xs font-bold text-slate-500">
                    {activityIcon(activity.type)}
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm text-foreground">
                      {activity.message}
                    </p>
                    <p className="text-xs text-muted">
                      {activity.project.name} &middot;{" "}
                      {timeAgo(activity.createdAt)}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Recent inquiries */}
        <div className="rounded-xl border border-border bg-white p-6 shadow-sm">
          <div className="mb-4 flex items-center justify-between">
            <h2 className="text-lg font-semibold text-foreground">
              Nedavne prijave
            </h2>
            <Link
              href="/admin/inquiries"
              className="text-sm text-accent hover:underline"
            >
              Sve prijave
            </Link>
          </div>
          {recentInquiries.length === 0 ? (
            <p className="text-sm text-muted">Nema prijava.</p>
          ) : (
            <div className="space-y-3">
              {recentInquiries.map((inquiry) => (
                <div
                  key={inquiry.id}
                  className={`rounded-lg border p-3 ${
                    !inquiry.read
                      ? "border-accent/30 bg-accent/5"
                      : "border-border"
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-medium text-foreground">
                      {inquiry.company}
                    </span>
                    {!inquiry.read && (
                      <span className="rounded-full bg-accent px-2 py-0.5 text-[10px] font-medium text-white">
                        Nova
                      </span>
                    )}
                  </div>
                  <p className="mt-0.5 text-xs text-muted">
                    {inquiry.name} &middot; {inquiry.email}
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
