import { getProject, deleteProject } from "@/lib/actions/projects";
import { getProjectComments } from "@/lib/actions/comments";
import { getProjectDocuments } from "@/lib/actions/documents";
import { notFound, redirect } from "next/navigation";
import Link from "next/link";
import ProjectEditForm from "./project-edit-form";
import PhaseManager from "./phase-manager";
import CommentsSection from "./comments-section";
import DocumentsSection from "./documents-section";

export default async function AdminProjectDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const project = await getProject(id);

  if (!project) notFound();

  const [comments, documents] = await Promise.all([
    getProjectComments(id),
    getProjectDocuments(id),
  ]);

  async function handleDelete() {
    "use server";
    await deleteProject(id);
    redirect("/admin/projects");
  }

  return (
    <>
      <Link
        href="/admin/projects"
        className="mb-4 inline-flex items-center gap-1 text-sm text-muted hover:text-foreground"
      >
        &larr; Natrag na projekte
      </Link>

      <div className="mb-8 flex items-start justify-between">
        <div>
          <h1 className="text-2xl font-bold text-foreground">{project.name}</h1>
          <p className="mt-1 text-sm text-muted">
            Klijent: {project.client.name} ({project.client.email})
          </p>
        </div>
        <form action={handleDelete}>
          <button
            type="submit"
            onClick={() => {}}
            className="rounded-lg border border-red-200 px-4 py-2 text-sm text-red-500 transition-colors hover:bg-red-50"
          >
            Obriši projekt
          </button>
        </form>
      </div>

      {/* Edit project */}
      <div className="mb-8 rounded-xl border border-border bg-white p-6 shadow-sm">
        <h2 className="mb-4 text-lg font-semibold text-foreground">
          Postavke projekta
        </h2>
        <ProjectEditForm project={project} />
      </div>

      {/* Phase management */}
      <div className="mb-8 rounded-xl border border-border bg-white p-6 shadow-sm">
        <h2 className="mb-4 text-lg font-semibold text-foreground">
          Faze projekta ({project.phases.length})
        </h2>
        <PhaseManager projectId={project.id} phases={project.phases} />
      </div>

      {/* Documents */}
      <div className="mb-8 rounded-xl border border-border bg-white p-6 shadow-sm">
        <h2 className="mb-4 text-lg font-semibold text-foreground">
          Dokumenti ({documents.length})
        </h2>
        <DocumentsSection
          projectId={project.id}
          documents={documents}
          canDelete={true}
        />
      </div>

      {/* Comments */}
      <div className="rounded-xl border border-border bg-white p-6 shadow-sm">
        <h2 className="mb-4 text-lg font-semibold text-foreground">
          Komentari ({comments.length})
        </h2>
        <CommentsSection projectId={project.id} comments={comments} />
      </div>
    </>
  );
}
