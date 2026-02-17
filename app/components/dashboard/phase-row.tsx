import { PhaseStatusBadge } from "./status-badge";
import { PhaseStatus } from "@prisma/client";

interface PhaseRowProps {
  name: string;
  description: string | null;
  status: PhaseStatus;
  percentage: number;
  startDate?: Date | null;
  endDate?: Date | null;
}

function formatDate(date: Date | null | undefined): string {
  if (!date) return "";
  return new Date(date).toLocaleDateString("hr-HR");
}

export default function PhaseRow({
  name,
  description,
  status,
  percentage,
  startDate,
  endDate,
}: PhaseRowProps) {
  return (
    <div className="rounded-lg border border-border bg-white p-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <h4 className="font-medium text-foreground">{name}</h4>
          <PhaseStatusBadge status={status} />
        </div>
        <span className="text-sm font-semibold text-foreground">
          {percentage}%
        </span>
      </div>

      {description && (
        <p className="mt-2 text-sm text-muted">{description}</p>
      )}

      {(startDate || endDate) && (
        <p className="mt-1 text-xs text-muted">
          {formatDate(startDate)}
          {startDate && endDate && " — "}
          {formatDate(endDate)}
        </p>
      )}

      {/* Progress bar */}
      <div className="mt-3">
        <div className="h-1.5 overflow-hidden rounded-full bg-slate-100">
          <div
            className="h-full rounded-full bg-accent transition-all"
            style={{ width: `${percentage}%` }}
          />
        </div>
      </div>
    </div>
  );
}
