import { prisma } from "@/lib/prisma";
import { auth } from "@/lib/auth";
import { redirect } from "next/navigation";
import { ProjectStatusBadge } from "@/app/components/dashboard/status-badge";
import { ProjectStatus } from "@prisma/client";
import Link from "next/link";
import DeleteProjectButton from "./delete-project-button";

export const metadata = {
  title: "Projekti",
};

const PAGE_SIZE = 10;

export default async function ProjectsPage({
  searchParams,
}: {
  searchParams: Promise<{ search?: string; status?: string; page?: string }>;
}) {
  const session = await auth();
  if (!session || session.user.role !== "ADMIN") redirect("/login");

  const params = await searchParams;
  const search = params.search || "";
  const statusFilter = params.status || "";
  const page = parseInt(params.page || "1");

  const where = {
    ...(search
      ? {
          OR: [
            { name: { contains: search, mode: "insensitive" as const } },
            {
              client: {
                name: { contains: search, mode: "insensitive" as const },
              },
            },
          ],
        }
      : {}),
    ...(statusFilter ? { status: statusFilter as ProjectStatus } : {}),
  };

  const [projects, total] = await Promise.all([
    prisma.project.findMany({
      where,
      include: {
        client: { select: { id: true, name: true, email: true } },
        phases: { orderBy: { order: "asc" } },
      },
      orderBy: { createdAt: "desc" },
      skip: (page - 1) * PAGE_SIZE,
      take: PAGE_SIZE,
    }),
    prisma.project.count({ where }),
  ]);

  const totalPages = Math.ceil(total / PAGE_SIZE);

  function buildUrl(overrides: Record<string, string>) {
    const p: Record<string, string> = {};
    if (search) p.search = search;
    if (statusFilter) p.status = statusFilter;
    if (page > 1) p.page = String(page);
    return `/admin/projects?${new URLSearchParams({ ...p, ...overrides })}`;
  }

  return (
    <>
      <div className="mb-6 flex items-center justify-between">
        <h1 className="text-2xl font-bold text-foreground">Projekti</h1>
        <Link
          href="/admin/projects/new"
          className="rounded-lg bg-accent px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-accent-dark"
        >
          Novi projekt
        </Link>
      </div>

      {/* Search + Filter */}
      <div className="mb-4 flex flex-col gap-3 sm:flex-row sm:flex-wrap sm:items-center">
        <form>
          <input
            name="search"
            type="text"
            defaultValue={search}
            placeholder="Pretraži projekt ili klijenta..."
            className="w-full rounded-lg border border-border px-4 py-2.5 text-sm text-foreground sm:w-64 outline-none transition-colors placeholder:text-gray-400 focus:border-accent focus:ring-1 focus:ring-accent"
          />
          {statusFilter && (
            <input type="hidden" name="status" value={statusFilter} />
          )}
        </form>
        <div className="flex gap-1">
          {[
            { label: "Svi", value: "" },
            { label: "Aktivni", value: "AKTIVAN" },
            { label: "Pausirani", value: "PAUZIRAN" },
            { label: "Završeni", value: "ZAVRSEN" },
          ].map((f) => (
            <Link
              key={f.value}
              href={`/admin/projects?${new URLSearchParams({
                ...(search ? { search } : {}),
                ...(f.value ? { status: f.value } : {}),
              })}`}
              className={`rounded-lg px-3 py-1.5 text-sm transition-colors ${
                statusFilter === f.value
                  ? "bg-accent text-white"
                  : "border border-border text-muted hover:bg-slate-50"
              }`}
            >
              {f.label}
            </Link>
          ))}
        </div>
      </div>

      {projects.length === 0 ? (
        <div className="rounded-xl border border-border bg-white p-12 text-center">
          <p className="text-muted">
            {search || statusFilter
              ? "Nema rezultata za zadane filtere."
              : "Nema projekata."}
          </p>
        </div>
      ) : (
        <>
          <div className="overflow-x-auto rounded-xl border border-border bg-white shadow-sm">
            <table className="w-full min-w-[700px] text-sm">
              <thead>
                <tr className="border-b border-border bg-slate-50 text-left">
                  <th className="px-5 py-3 font-medium text-muted">Projekt</th>
                  <th className="px-5 py-3 font-medium text-muted">Klijent</th>
                  <th className="px-5 py-3 font-medium text-muted">Status</th>
                  <th className="px-5 py-3 text-center font-medium text-muted">
                    Faze
                  </th>
                  <th className="px-5 py-3 text-center font-medium text-muted">
                    Napredak
                  </th>
                  <th className="px-5 py-3 font-medium text-muted"></th>
                </tr>
              </thead>
              <tbody>
                {projects.map((project) => {
                  const avgPercentage =
                    project.phases.length > 0
                      ? Math.round(
                          project.phases.reduce(
                            (sum, p) => sum + p.percentage,
                            0
                          ) / project.phases.length
                        )
                      : 0;

                  return (
                    <tr
                      key={project.id}
                      className="border-b border-border last:border-0"
                    >
                      <td className="px-5 py-3 font-medium text-foreground">
                        {project.name}
                      </td>
                      <td className="px-5 py-3 text-muted">
                        {project.client.name}
                      </td>
                      <td className="px-5 py-3">
                        <ProjectStatusBadge status={project.status} />
                      </td>
                      <td className="px-5 py-3 text-center">
                        {project.phases.length}
                      </td>
                      <td className="px-5 py-3 text-center font-medium">
                        {avgPercentage}%
                      </td>
                      <td className="px-5 py-3 text-right">
                        <div className="flex items-center justify-end gap-3">
                          <Link
                            href={`/admin/projects/${project.id}`}
                            className="text-accent hover:underline"
                          >
                            Uredi
                          </Link>
                          <DeleteProjectButton projectId={project.id} />
                        </div>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>

          {/* Pagination */}
          {totalPages > 1 && (
            <div className="mt-4 flex items-center justify-between">
              <span className="text-sm text-muted">
                Prikazano {(page - 1) * PAGE_SIZE + 1}–
                {Math.min(page * PAGE_SIZE, total)} od {total}
              </span>
              <div className="flex gap-2">
                {page > 1 && (
                  <Link
                    href={buildUrl({ page: String(page - 1) })}
                    className="rounded-lg border border-border px-3 py-1.5 text-sm text-muted hover:bg-slate-50"
                  >
                    Prethodna
                  </Link>
                )}
                {page < totalPages && (
                  <Link
                    href={buildUrl({ page: String(page + 1) })}
                    className="rounded-lg border border-border px-3 py-1.5 text-sm text-muted hover:bg-slate-50"
                  >
                    Sljedeća
                  </Link>
                )}
              </div>
            </div>
          )}
        </>
      )}
    </>
  );
}
