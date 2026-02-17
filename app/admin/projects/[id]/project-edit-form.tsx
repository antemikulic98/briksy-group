"use client";

import { updateProject } from "@/lib/actions/projects";
import { ProjectStatus } from "@prisma/client";
import { useState } from "react";

interface ProjectEditFormProps {
  project: {
    id: string;
    name: string;
    description: string | null;
    status: ProjectStatus;
    startDate: Date | null;
    endDate: Date | null;
  };
}

function formatDateForInput(date: Date | null): string {
  if (!date) return "";
  return new Date(date).toISOString().split("T")[0];
}

export default function ProjectEditForm({ project }: ProjectEditFormProps) {
  const [saved, setSaved] = useState(false);

  async function handleSubmit(formData: FormData) {
    setSaved(false);
    await updateProject(project.id, formData);
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
  }

  return (
    <form action={handleSubmit} className="space-y-4">
      <div className="grid gap-4 sm:grid-cols-2">
        <div>
          <label
            htmlFor="name"
            className="mb-1 block text-sm font-medium text-foreground"
          >
            Naziv
          </label>
          <input
            id="name"
            name="name"
            type="text"
            defaultValue={project.name}
            required
            className="w-full rounded-lg border border-border px-4 py-2.5 text-sm outline-none transition-colors focus:border-accent focus:ring-1 focus:ring-accent"
          />
        </div>

        <div>
          <label
            htmlFor="status"
            className="mb-1 block text-sm font-medium text-foreground"
          >
            Status
          </label>
          <select
            id="status"
            name="status"
            defaultValue={project.status}
            className="w-full rounded-lg border border-border px-4 py-2.5 text-sm outline-none transition-colors focus:border-accent focus:ring-1 focus:ring-accent"
          >
            <option value="AKTIVAN">Aktivan</option>
            <option value="PAUZIRAN">Pauziran</option>
            <option value="ZAVRSEN">Završen</option>
          </select>
        </div>
      </div>

      <div className="grid gap-4 sm:grid-cols-2">
        <div>
          <label
            htmlFor="startDate"
            className="mb-1 block text-sm font-medium text-foreground"
          >
            Datum početka
          </label>
          <input
            id="startDate"
            name="startDate"
            type="date"
            defaultValue={formatDateForInput(project.startDate)}
            className="w-full rounded-lg border border-border px-4 py-2.5 text-sm outline-none transition-colors focus:border-accent focus:ring-1 focus:ring-accent"
          />
        </div>

        <div>
          <label
            htmlFor="endDate"
            className="mb-1 block text-sm font-medium text-foreground"
          >
            Datum završetka
          </label>
          <input
            id="endDate"
            name="endDate"
            type="date"
            defaultValue={formatDateForInput(project.endDate)}
            className="w-full rounded-lg border border-border px-4 py-2.5 text-sm outline-none transition-colors focus:border-accent focus:ring-1 focus:ring-accent"
          />
        </div>
      </div>

      <div>
        <label
          htmlFor="description"
          className="mb-1 block text-sm font-medium text-foreground"
        >
          Opis
        </label>
        <textarea
          id="description"
          name="description"
          rows={3}
          defaultValue={project.description ?? ""}
          className="w-full rounded-lg border border-border px-4 py-2.5 text-sm outline-none transition-colors focus:border-accent focus:ring-1 focus:ring-accent"
        />
      </div>

      <div className="flex items-center gap-3">
        <button
          type="submit"
          className="rounded-lg bg-accent px-6 py-2.5 text-sm font-medium text-white transition-colors hover:bg-accent-dark"
        >
          Spremi promjene
        </button>
        {saved && (
          <span className="text-sm text-green-600">Spremljeno!</span>
        )}
      </div>
    </form>
  );
}
