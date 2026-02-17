import { getClientProjects } from "@/lib/actions/projects";
import ProjectCard from "@/app/components/dashboard/project-card";

export const metadata = {
  title: "Moji projekti",
};

export default async function DashboardPage() {
  const projects = await getClientProjects();

  return (
    <>
      <h1 className="mb-6 text-2xl font-bold text-foreground">
        Moji projekti
      </h1>

      {projects.length === 0 ? (
        <div className="rounded-xl border border-border bg-white p-12 text-center">
          <p className="text-muted">Nemate aktivnih projekata.</p>
        </div>
      ) : (
        <div className="grid gap-4 sm:grid-cols-2">
          {projects.map((project) => (
            <ProjectCard
              key={project.id}
              id={project.id}
              name={project.name}
              description={project.description}
              status={project.status}
              phases={project.phases}
              href={`/dashboard/projects/${project.id}`}
            />
          ))}
        </div>
      )}
    </>
  );
}
