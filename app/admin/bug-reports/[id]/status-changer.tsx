"use client";

import { updateBugReportStatus } from "@/lib/actions/bug-reports";
import { useState } from "react";

const STATUSES = [
  { value: "OPEN", label: "Otvoren" },
  { value: "IN_PROGRESS", label: "U tijeku" },
  { value: "RESOLVED", label: "Riješen" },
  { value: "CLOSED", label: "Zatvoren" },
];

export default function StatusChanger({
  reportId,
  currentStatus,
}: {
  reportId: string;
  currentStatus: string;
}) {
  const [loading, setLoading] = useState(false);

  async function handleChange(status: string) {
    if (status === currentStatus) return;
    setLoading(true);
    await updateBugReportStatus(reportId, status);
    setLoading(false);
  }

  return (
    <div className="flex flex-wrap gap-2">
      {STATUSES.map((s) => (
        <button
          key={s.value}
          type="button"
          onClick={() => handleChange(s.value)}
          disabled={loading || s.value === currentStatus}
          className={`rounded-lg border px-4 py-2 text-sm font-medium transition-colors disabled:opacity-50 ${
            s.value === currentStatus
              ? "border-accent bg-accent/10 text-accent"
              : "border-border bg-white text-muted hover:border-accent/40 hover:text-foreground"
          }`}
        >
          {s.label}
        </button>
      ))}
    </div>
  );
}
