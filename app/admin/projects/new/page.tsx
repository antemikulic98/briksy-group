"use client";

import { createProject, getClientsForSelect } from "@/lib/actions/projects";
import { useState, useEffect } from "react";
import Link from "next/link";

export default function NewProjectPage() {
  const [error, setError] = useState<string | null>(null);
  const [clients, setClients] = useState<
    { id: string; name: string; email: string }[]
  >([]);

  useEffect(() => {
    getClientsForSelect().then(setClients);
  }, []);

  async function handleSubmit(formData: FormData) {
    setError(null);
    const result = await createProject(formData);
    if (result?.error) {
      setError(result.error);
    }
  }

  return (
    <>
      <Link
        href="/admin/projects"
        className="mb-4 inline-flex items-center gap-1 text-sm text-muted hover:text-foreground"
      >
        &larr; Natrag na projekte
      </Link>

      <h1 className="mb-6 text-2xl font-bold text-foreground">Novi projekt</h1>

      <div className="max-w-lg rounded-xl border border-border bg-white p-6 shadow-sm">
        <form action={handleSubmit} className="space-y-4">
          {error && (
            <div className="rounded-lg border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-600">
              {error}
            </div>
          )}

          <div>
            <label
              htmlFor="name"
              className="mb-1 block text-sm font-medium text-foreground"
            >
              Naziv projekta
            </label>
            <input
              id="name"
              name="name"
              type="text"
              required
              className="w-full rounded-lg border border-border px-4 py-2.5 text-sm outline-none transition-colors focus:border-accent focus:ring-1 focus:ring-accent"
              placeholder="Digitalizacija poslovanja"
            />
          </div>

          <div>
            <label
              htmlFor="description"
              className="mb-1 block text-sm font-medium text-foreground"
            >
              Opis (opcionalno)
            </label>
            <textarea
              id="description"
              name="description"
              rows={3}
              className="w-full rounded-lg border border-border px-4 py-2.5 text-sm outline-none transition-colors focus:border-accent focus:ring-1 focus:ring-accent"
              placeholder="Kratak opis projekta..."
            />
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
                className="w-full rounded-lg border border-border px-4 py-2.5 text-sm outline-none transition-colors focus:border-accent focus:ring-1 focus:ring-accent"
              />
            </div>
          </div>

          <div>
            <label
              htmlFor="clientId"
              className="mb-1 block text-sm font-medium text-foreground"
            >
              Klijent
            </label>
            <select
              id="clientId"
              name="clientId"
              required
              className="w-full rounded-lg border border-border px-4 py-2.5 text-sm outline-none transition-colors focus:border-accent focus:ring-1 focus:ring-accent"
            >
              <option value="">Odaberi klijenta</option>
              {clients.map((client) => (
                <option key={client.id} value={client.id}>
                  {client.name} ({client.email})
                </option>
              ))}
            </select>
          </div>

          <button
            type="submit"
            className="rounded-lg bg-accent px-6 py-2.5 text-sm font-medium text-white transition-colors hover:bg-accent-dark"
          >
            Kreiraj projekt
          </button>
        </form>
      </div>
    </>
  );
}
