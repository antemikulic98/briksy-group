import { getClientProject } from "@/lib/actions/projects";
import { getProjectComments } from "@/lib/actions/comments";
import { getProjectDocuments } from "@/lib/actions/documents";
import { notFound } from "next/navigation";
import { ProjectStatusBadge } from "@/app/components/dashboard/status-badge";
import PhaseRow from "@/app/components/dashboard/phase-row";
import ClientCommentsSection from "@/app/components/dashboard/comments-section";
import ClientDocumentsSection from "@/app/components/dashboard/documents-section";
import Link from "next/link";

export default async function ProjectDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const project = await getClientProject(id);

  if (!project) notFound();

  const [comments, documents] = await Promise.all([
    getProjectComments(id),
    getProjectDocuments(id),
  ]);

  const totalPercentage =
    project.phases.length > 0
      ? Math.round(
          project.phases.reduce((sum, p) => sum + p.percentage, 0) /
            project.phases.length
        )
      : 0;

  function formatDate(date: Date | null): string {
    if (!date) return "";
    return new Date(date).toLocaleDateString("hr-HR");
  }

  return (
    <>
      <Link
        href="/dashboard"
        className="mb-4 inline-flex items-center gap-1 text-sm text-muted hover:text-foreground"
      >
        &larr; Natrag na projekte
      </Link>

      <div className="mb-6 flex items-start justify-between">
        <div>
          <h1 className="text-2xl font-bold text-foreground">{project.name}</h1>
          {project.description && (
            <p className="mt-1 text-muted">{project.description}</p>
          )}
          {(project.startDate || project.endDate) && (
            <p className="mt-1 text-sm text-muted">
              {formatDate(project.startDate)}
              {project.startDate && project.endDate && " — "}
              {formatDate(project.endDate)}
            </p>
          )}
        </div>
        <ProjectStatusBadge status={project.status} />
      </div>

      {/* Progress overview */}
      <div className="mb-8 rounded-xl border border-border bg-white p-6 shadow-sm">
        <div className="mb-2 flex items-center justify-between">
          <span className="text-sm font-medium text-foreground">
            Ukupan napredak
          </span>
          <span className="text-2xl font-bold text-accent">
            {totalPercentage}%
          </span>
        </div>
        <div className="h-3 overflow-hidden rounded-full bg-slate-100">
          <div
            className="h-full rounded-full bg-accent transition-all"
            style={{ width: `${totalPercentage}%` }}
          />
        </div>
        <div className="mt-2 text-xs text-muted">
          {project.phases.filter((p) => p.status === "ZAVRSENA").length} /{" "}
          {project.phases.length} faza završeno
        </div>
      </div>

      {/* Phases */}
      <h2 className="mb-4 text-lg font-semibold text-foreground">
        Faze projekta
      </h2>

      {project.phases.length === 0 ? (
        <div className="mb-8 rounded-xl border border-border bg-white p-8 text-center">
          <p className="text-muted">Faze projekta još nisu definirane.</p>
        </div>
      ) : (
        <div className="mb-8 space-y-3">
          {project.phases.map((phase) => (
            <PhaseRow
              key={phase.id}
              name={phase.name}
              description={phase.description}
              status={phase.status}
              percentage={phase.percentage}
              startDate={phase.startDate}
              endDate={phase.endDate}
            />
          ))}
        </div>
      )}

      {/* Documents */}
      <div className="mb-8 rounded-xl border border-border bg-white p-6 shadow-sm">
        <h2 className="mb-4 text-lg font-semibold text-foreground">
          Dokumenti ({documents.length})
        </h2>
        <ClientDocumentsSection documents={documents} />
      </div>

      {/* Comments */}
      <div className="rounded-xl border border-border bg-white p-6 shadow-sm">
        <h2 className="mb-4 text-lg font-semibold text-foreground">
          Komunikacija ({comments.length})
        </h2>
        <ClientCommentsSection projectId={project.id} comments={comments} />
      </div>
    </>
  );
}
