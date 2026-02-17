"use client";

import { createPhase, updatePhase, deletePhase } from "@/lib/actions/phases";
import { PhaseStatus } from "@prisma/client";
import { useState } from "react";
import { PhaseStatusBadge } from "@/app/components/dashboard/status-badge";

interface Phase {
  id: string;
  name: string;
  description: string | null;
  status: PhaseStatus;
  percentage: number;
  order: number;
  startDate: Date | null;
  endDate: Date | null;
}

interface PhaseManagerProps {
  projectId: string;
  phases: Phase[];
}

function formatDateForInput(date: Date | null): string {
  if (!date) return "";
  return new Date(date).toISOString().split("T")[0];
}

function formatDate(date: Date | null): string {
  if (!date) return "";
  return new Date(date).toLocaleDateString("hr-HR");
}

export default function PhaseManager({
  projectId,
  phases,
}: PhaseManagerProps) {
  const [showNewForm, setShowNewForm] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);

  async function handleCreatePhase(formData: FormData) {
    await createPhase(projectId, formData);
    setShowNewForm(false);
  }

  async function handleUpdatePhase(phaseId: string, formData: FormData) {
    await updatePhase(phaseId, projectId, formData);
    setEditingId(null);
  }

  async function handleDeletePhase(phaseId: string) {
    if (!confirm("Jeste li sigurni da želite obrisati ovu fazu?")) return;
    await deletePhase(phaseId, projectId);
  }

  return (
    <div>
      {/* Existing phases */}
      {phases.length > 0 && (
        <div className="mb-4 space-y-3">
          {phases.map((phase) =>
            editingId === phase.id ? (
              <form
                key={phase.id}
                action={(formData) => handleUpdatePhase(phase.id, formData)}
                className="rounded-lg border border-accent/30 bg-accent/5 p-4"
              >
                <div className="grid gap-3 sm:grid-cols-2">
                  <div>
                    <label className="mb-1 block text-xs font-medium text-muted">
                      Naziv
                    </label>
                    <input
                      name="name"
                      defaultValue={phase.name}
                      required
                      className="w-full rounded-lg border border-border px-3 py-2 text-sm outline-none focus:border-accent"
                    />
                  </div>
                  <div>
                    <label className="mb-1 block text-xs font-medium text-muted">
                      Status
                    </label>
                    <select
                      name="status"
                      defaultValue={phase.status}
                      className="w-full rounded-lg border border-border px-3 py-2 text-sm outline-none focus:border-accent"
                    >
                      <option value="NA_CEKANJU">Na čekanju</option>
                      <option value="U_TIJEKU">U tijeku</option>
                      <option value="ZAVRSENA">Završena</option>
                    </select>
                  </div>
                </div>
                <div className="mt-3">
                  <label className="mb-1 block text-xs font-medium text-muted">
                    Opis
                  </label>
                  <input
                    name="description"
                    defaultValue={phase.description ?? ""}
                    className="w-full rounded-lg border border-border px-3 py-2 text-sm outline-none focus:border-accent"
                  />
                </div>
                <div className="mt-3 grid gap-3 sm:grid-cols-3">
                  <div>
                    <label className="mb-1 block text-xs font-medium text-muted">
                      Napredak (%)
                    </label>
                    <input
                      name="percentage"
                      type="number"
                      min={0}
                      max={100}
                      defaultValue={phase.percentage}
                      className="w-full rounded-lg border border-border px-3 py-2 text-sm outline-none focus:border-accent"
                    />
                  </div>
                  <div>
                    <label className="mb-1 block text-xs font-medium text-muted">
                      Datum početka
                    </label>
                    <input
                      name="startDate"
                      type="date"
                      defaultValue={formatDateForInput(phase.startDate)}
                      className="w-full rounded-lg border border-border px-3 py-2 text-sm outline-none focus:border-accent"
                    />
                  </div>
                  <div>
                    <label className="mb-1 block text-xs font-medium text-muted">
                      Datum završetka
                    </label>
                    <input
                      name="endDate"
                      type="date"
                      defaultValue={formatDateForInput(phase.endDate)}
                      className="w-full rounded-lg border border-border px-3 py-2 text-sm outline-none focus:border-accent"
                    />
                  </div>
                </div>
                <div className="mt-3 flex gap-2">
                  <button
                    type="submit"
                    className="rounded-lg bg-accent px-4 py-2 text-sm font-medium text-white hover:bg-accent-dark"
                  >
                    Spremi
                  </button>
                  <button
                    type="button"
                    onClick={() => setEditingId(null)}
                    className="rounded-lg border border-border px-4 py-2 text-sm text-muted hover:bg-slate-50"
                  >
                    Odustani
                  </button>
                </div>
              </form>
            ) : (
              <div
                key={phase.id}
                className="flex flex-col gap-3 rounded-lg border border-border p-4 sm:flex-row sm:items-center sm:justify-between"
              >
                <div className="flex items-center gap-3">
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="font-medium text-foreground">
                        {phase.name}
                      </span>
                      <PhaseStatusBadge status={phase.status} />
                    </div>
                    {phase.description && (
                      <p className="mt-0.5 text-xs text-muted">
                        {phase.description}
                      </p>
                    )}
                    {(phase.startDate || phase.endDate) && (
                      <p className="mt-0.5 text-xs text-muted">
                        {formatDate(phase.startDate)}
                        {phase.startDate && phase.endDate && " — "}
                        {formatDate(phase.endDate)}
                      </p>
                    )}
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <div className="text-right">
                    <span className="text-sm font-semibold text-foreground">
                      {phase.percentage}%
                    </span>
                    <div className="mt-1 h-1.5 w-20 overflow-hidden rounded-full bg-slate-100">
                      <div
                        className="h-full rounded-full bg-accent"
                        style={{ width: `${phase.percentage}%` }}
                      />
                    </div>
                  </div>
                  <button
                    onClick={() => setEditingId(phase.id)}
                    className="rounded-lg border border-border px-3 py-1.5 text-xs text-muted hover:bg-slate-50 hover:text-foreground"
                  >
                    Uredi
                  </button>
                  <button
                    onClick={() => handleDeletePhase(phase.id)}
                    className="rounded-lg border border-red-200 px-3 py-1.5 text-xs text-red-500 hover:bg-red-50"
                  >
                    Obriši
                  </button>
                </div>
              </div>
            )
          )}
        </div>
      )}

      {/* Add new phase */}
      {showNewForm ? (
        <form
          action={handleCreatePhase}
          className="rounded-lg border border-dashed border-accent/50 bg-accent/5 p-4"
        >
          <div className="grid gap-3 sm:grid-cols-2">
            <div>
              <label className="mb-1 block text-xs font-medium text-muted">
                Naziv faze
              </label>
              <input
                name="name"
                required
                className="w-full rounded-lg border border-border px-3 py-2 text-sm outline-none focus:border-accent"
                placeholder="Analiza poslovanja"
              />
            </div>
            <div>
              <label className="mb-1 block text-xs font-medium text-muted">
                Opis (opcionalno)
              </label>
              <input
                name="description"
                className="w-full rounded-lg border border-border px-3 py-2 text-sm outline-none focus:border-accent"
                placeholder="Kratak opis faze..."
              />
            </div>
          </div>
          <div className="mt-3 grid gap-3 sm:grid-cols-2">
            <div>
              <label className="mb-1 block text-xs font-medium text-muted">
                Datum početka
              </label>
              <input
                name="startDate"
                type="date"
                className="w-full rounded-lg border border-border px-3 py-2 text-sm outline-none focus:border-accent"
              />
            </div>
            <div>
              <label className="mb-1 block text-xs font-medium text-muted">
                Datum završetka
              </label>
              <input
                name="endDate"
                type="date"
                className="w-full rounded-lg border border-border px-3 py-2 text-sm outline-none focus:border-accent"
              />
            </div>
          </div>
          <div className="mt-3 flex gap-2">
            <button
              type="submit"
              className="rounded-lg bg-accent px-4 py-2 text-sm font-medium text-white hover:bg-accent-dark"
            >
              Dodaj fazu
            </button>
            <button
              type="button"
              onClick={() => setShowNewForm(false)}
              className="rounded-lg border border-border px-4 py-2 text-sm text-muted hover:bg-slate-50"
            >
              Odustani
            </button>
          </div>
        </form>
      ) : (
        <button
          onClick={() => setShowNewForm(true)}
          className="w-full rounded-lg border border-dashed border-border py-3 text-sm text-muted transition-colors hover:border-accent hover:text-accent"
        >
          + Dodaj novu fazu
        </button>
      )}
    </div>
  );
}
