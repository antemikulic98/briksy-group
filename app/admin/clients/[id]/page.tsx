import { getClient, deleteClient } from "@/lib/actions/clients";
import { ProjectStatusBadge } from "@/app/components/dashboard/status-badge";
import { notFound, redirect } from "next/navigation";
import Link from "next/link";

export default async function ClientDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const client = await getClient(id);

  if (!client) notFound();

  async function handleDelete() {
    "use server";
    await deleteClient(id);
    redirect("/admin/clients");
  }

  return (
    <>
      <Link
        href="/admin/clients"
        className="mb-4 inline-flex items-center gap-1 text-sm text-muted hover:text-foreground"
      >
        &larr; Natrag na klijente
      </Link>

      <div className="mb-8 flex items-start justify-between">
        <div>
          <h1 className="text-2xl font-bold text-foreground">{client.name}</h1>
          <p className="mt-1 text-sm text-muted">{client.email}</p>
          <p className="mt-0.5 text-xs text-muted">
            Klijent od{" "}
            {new Date(client.createdAt).toLocaleDateString("hr-HR")}
          </p>
        </div>
        <form action={handleDelete}>
          <button
            type="submit"
            className="rounded-lg border border-red-200 px-4 py-2 text-sm text-red-500 transition-colors hover:bg-red-50"
          >
            Obriši klijenta
          </button>
        </form>
      </div>

      {/* Projects */}
      <div className="rounded-xl border border-border bg-white p-6 shadow-sm">
        <h2 className="mb-4 text-lg font-semibold text-foreground">
          Projekti ({client.projects.length})
        </h2>

        {client.projects.length === 0 ? (
          <p className="text-sm text-muted">Nema projekata za ovog klijenta.</p>
        ) : (
          <div className="space-y-3">
            {client.projects.map((project) => {
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
                <Link
                  key={project.id}
                  href={`/admin/projects/${project.id}`}
                  className="flex items-center justify-between rounded-lg border border-border p-4 transition-colors hover:border-accent/30 hover:bg-accent/5"
                >
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="font-medium text-foreground">
                        {project.name}
                      </span>
                      <ProjectStatusBadge status={project.status} />
                    </div>
                    {project.description && (
                      <p className="mt-0.5 text-xs text-muted line-clamp-1">
                        {project.description}
                      </p>
                    )}
                  </div>
                  <div className="text-right">
                    <span className="text-sm font-semibold text-foreground">
                      {avgPercentage}%
                    </span>
                    <div className="mt-1 h-1.5 w-20 overflow-hidden rounded-full bg-slate-100">
                      <div
                        className="h-full rounded-full bg-accent"
                        style={{ width: `${avgPercentage}%` }}
                      />
                    </div>
                  </div>
                </Link>
              );
            })}
          </div>
        )}
      </div>
    </>
  );
}
