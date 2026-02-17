import Link from "next/link";
import { ProjectStatusBadge } from "./status-badge";
import { ProjectStatus, Phase } from "@prisma/client";

interface ProjectCardProps {
  id: string;
  name: string;
  description: string | null;
  status: ProjectStatus;
  phases: Phase[];
  href: string;
}

export default function ProjectCard({
  id,
  name,
  description,
  status,
  phases,
  href,
}: ProjectCardProps) {
  const totalPercentage =
    phases.length > 0
      ? Math.round(
          phases.reduce((sum, p) => sum + p.percentage, 0) / phases.length
        )
      : 0;

  const completedPhases = phases.filter(
    (p) => p.status === "ZAVRSENA"
  ).length;

  return (
    <Link
      href={href}
      className="block rounded-xl border border-border bg-white p-5 shadow-sm transition-shadow hover:shadow-md"
    >
      <div className="flex items-start justify-between">
        <h3 className="font-semibold text-foreground">{name}</h3>
        <ProjectStatusBadge status={status} />
      </div>

      {description && (
        <p className="mt-2 text-sm text-muted line-clamp-2">{description}</p>
      )}

      {/* Progress bar */}
      <div className="mt-4">
        <div className="mb-1 flex items-center justify-between text-xs">
          <span className="text-muted">Napredak</span>
          <span className="font-medium text-foreground">{totalPercentage}%</span>
        </div>
        <div className="h-2 overflow-hidden rounded-full bg-slate-100">
          <div
            className="h-full rounded-full bg-accent transition-all"
            style={{ width: `${totalPercentage}%` }}
          />
        </div>
      </div>

      <div className="mt-3 text-xs text-muted">
        {completedPhases} / {phases.length} faza završeno
      </div>
    </Link>
  );
}
