import { prisma } from "@/lib/prisma";
import { auth } from "@/lib/auth";
import { redirect } from "next/navigation";
import { getSecurityStats } from "@/lib/actions/security";

export const metadata = { title: "Analitika" };

function StatCard({ label, value, sub }: { label: string; value: string | number; sub?: string }) {
  return (
    <div className="rounded-xl border border-border bg-white p-5 shadow-sm">
      <div className="text-sm text-muted">{label}</div>
      <div className="mt-1 text-2xl font-bold text-foreground">{value}</div>
      {sub && <div className="mt-0.5 text-xs text-muted">{sub}</div>}
    </div>
  );
}

export default async function AnalyticsPage() {
  const session = await auth();
  if (!session || session.user.role !== "ADMIN") redirect("/login");

  const now = new Date();
  const last30d = new Date(now.getTime() - 30 * 24 * 60 * 60 * 1000);

  const [
    projectsByStatus,
    topClients,
    inquiriesByIndustry,
    inquiriesByBudget,
    totalInquiries,
    unreadInquiries,
    recentActivities30d,
    securityStats,
  ] = await Promise.all([
    prisma.project.groupBy({
      by: ["status"],
      _count: true,
    }),
    prisma.project.groupBy({
      by: ["clientId"],
      _count: true,
      orderBy: { _count: { clientId: "desc" } },
      take: 5,
    }),
    prisma.inquiry.groupBy({
      by: ["industry"],
      _count: true,
      orderBy: { _count: { industry: "desc" } },
    }),
    prisma.inquiry.groupBy({
      by: ["budget"],
      _count: true,
      orderBy: { _count: { budget: "desc" } },
    }),
    prisma.inquiry.count(),
    prisma.inquiry.count({ where: { read: false } }),
    prisma.activity.count({ where: { createdAt: { gte: last30d } } }),
    getSecurityStats(),
  ]);

  // Fetch client names for top clients
  const clientIds = topClients.map((c) => c.clientId);
  const clients = await prisma.user.findMany({
    where: { id: { in: clientIds } },
    select: { id: true, name: true },
  });
  const clientMap = new Map(clients.map((c) => [c.id, c.name]));

  const totalProjects = projectsByStatus.reduce((s, p) => s + p._count, 0);
  const activeProjects = projectsByStatus.find((p) => p.status === "AKTIVAN")?._count ?? 0;
  const completedProjects = projectsByStatus.find((p) => p.status === "ZAVRSEN")?._count ?? 0;

  // Security stats
  const failedLogins24h = securityStats.last24hCounts.find((c) => c.type === "LOGIN_FAILED")?._count ?? 0;
  const rateLimited24h = securityStats.last24hCounts.find((c) => c.type === "RATE_LIMITED")?._count ?? 0;
  const spamBlocked24h = securityStats.last24hCounts.find((c) => c.type === "SPAM_BLOCKED")?._count ?? 0;
  const failedLogins7d = securityStats.last7dCounts.find((c) => c.type === "LOGIN_FAILED")?._count ?? 0;
  const rateLimited7d = securityStats.last7dCounts.find((c) => c.type === "RATE_LIMITED")?._count ?? 0;

  return (
    <>
      <h1 className="mb-6 text-2xl font-bold text-foreground">Analitika</h1>

      {/* Project stats */}
      <h2 className="mb-3 text-lg font-semibold text-foreground">Projekti</h2>
      <div className="mb-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <StatCard label="Ukupno projekata" value={totalProjects} />
        <StatCard label="Aktivnih" value={activeProjects} />
        <StatCard label="Završenih" value={completedProjects} />
        <StatCard label="Aktivnosti (30d)" value={recentActivities30d} />
      </div>

      {/* Security stats */}
      <h2 className="mb-3 text-lg font-semibold text-foreground">Sigurnost</h2>
      <div className="mb-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <StatCard label="Neuspješni logini" value={failedLogins24h} sub="zadnjih 24h" />
        <StatCard label="Rate limited" value={rateLimited24h} sub="zadnjih 24h" />
        <StatCard label="Spam blokiran" value={spamBlocked24h} sub="zadnjih 24h" />
        <StatCard
          label="Sigurnosni eventi"
          value={securityStats.last30dTotal}
          sub="zadnjih 30 dana"
        />
      </div>

      <div className="grid gap-8 lg:grid-cols-2">
        {/* Top clients */}
        <div className="rounded-xl border border-border bg-white p-6 shadow-sm">
          <h2 className="mb-4 text-lg font-semibold text-foreground">
            Top klijenti po projektima
          </h2>
          {topClients.length === 0 ? (
            <p className="text-sm text-muted">Nema podataka.</p>
          ) : (
            <div className="space-y-3">
              {topClients.map((c, i) => (
                <div key={c.clientId} className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="flex h-7 w-7 items-center justify-center rounded-full bg-accent/10 text-xs font-bold text-accent">
                      {i + 1}
                    </div>
                    <span className="text-sm font-medium text-foreground">
                      {clientMap.get(c.clientId) || "—"}
                    </span>
                  </div>
                  <span className="text-sm font-bold text-accent">{c._count}</span>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Inquiries by industry */}
        <div className="rounded-xl border border-border bg-white p-6 shadow-sm">
          <h2 className="mb-4 text-lg font-semibold text-foreground">
            Prijave po djelatnosti
          </h2>
          <p className="mb-3 text-xs text-muted">
            Ukupno: {totalInquiries} ({unreadInquiries} nepročitanih)
          </p>
          {inquiriesByIndustry.length === 0 ? (
            <p className="text-sm text-muted">Nema podataka.</p>
          ) : (
            <div className="space-y-2">
              {inquiriesByIndustry.map((item) => {
                const pct = totalInquiries ? Math.round((item._count / totalInquiries) * 100) : 0;
                return (
                  <div key={item.industry}>
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-foreground">{item.industry}</span>
                      <span className="font-medium text-muted">{item._count}</span>
                    </div>
                    <div className="mt-1 h-1.5 overflow-hidden rounded-full bg-slate-100">
                      <div
                        className="h-full rounded-full bg-accent"
                        style={{ width: `${pct}%` }}
                      />
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>

        {/* Inquiries by budget */}
        <div className="rounded-xl border border-border bg-white p-6 shadow-sm">
          <h2 className="mb-4 text-lg font-semibold text-foreground">
            Prijave po budgetu
          </h2>
          {inquiriesByBudget.length === 0 ? (
            <p className="text-sm text-muted">Nema podataka.</p>
          ) : (
            <div className="space-y-2">
              {inquiriesByBudget.map((item) => {
                const pct = totalInquiries ? Math.round((item._count / totalInquiries) * 100) : 0;
                return (
                  <div key={item.budget}>
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-foreground">{item.budget}</span>
                      <span className="font-medium text-muted">{item._count}</span>
                    </div>
                    <div className="mt-1 h-1.5 overflow-hidden rounded-full bg-slate-100">
                      <div
                        className="h-full rounded-full bg-accent"
                        style={{ width: `${pct}%` }}
                      />
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>

        {/* Security over 7d */}
        <div className="rounded-xl border border-border bg-white p-6 shadow-sm">
          <h2 className="mb-4 text-lg font-semibold text-foreground">
            Sigurnost — zadnjih 7 dana
          </h2>
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-sm text-foreground">Neuspješni logini</span>
              <span className={`text-sm font-bold ${failedLogins7d > 10 ? "text-red-600" : "text-foreground"}`}>
                {failedLogins7d}
              </span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-sm text-foreground">Rate limited</span>
              <span className={`text-sm font-bold ${rateLimited7d > 5 ? "text-orange-600" : "text-foreground"}`}>
                {rateLimited7d}
              </span>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
