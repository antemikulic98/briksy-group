import { ProjectStatus, PhaseStatus } from "@prisma/client";

const projectStatusConfig: Record<
  ProjectStatus,
  { label: string; className: string }
> = {
  AKTIVAN: {
    label: "Aktivan",
    className: "border-green-200 bg-green-50 text-green-700",
  },
  ZAVRSEN: {
    label: "Završen",
    className: "border-blue-200 bg-blue-50 text-blue-700",
  },
  PAUZIRAN: {
    label: "Pauziran",
    className: "border-orange-200 bg-orange-50 text-orange-700",
  },
};

const phaseStatusConfig: Record<
  PhaseStatus,
  { label: string; className: string }
> = {
  NA_CEKANJU: {
    label: "Na čekanju",
    className: "border-gray-200 bg-gray-50 text-gray-600",
  },
  U_TIJEKU: {
    label: "U tijeku",
    className: "border-accent/30 bg-accent/5 text-accent",
  },
  ZAVRSENA: {
    label: "Završena",
    className: "border-green-200 bg-green-50 text-green-700",
  },
};

export function ProjectStatusBadge({ status }: { status: ProjectStatus }) {
  const config = projectStatusConfig[status];
  return (
    <span
      className={`inline-flex rounded-full border px-2.5 py-0.5 text-xs font-medium ${config.className}`}
    >
      {config.label}
    </span>
  );
}

export function PhaseStatusBadge({ status }: { status: PhaseStatus }) {
  const config = phaseStatusConfig[status];
  return (
    <span
      className={`inline-flex rounded-full border px-2.5 py-0.5 text-xs font-medium ${config.className}`}
    >
      {config.label}
    </span>
  );
}
