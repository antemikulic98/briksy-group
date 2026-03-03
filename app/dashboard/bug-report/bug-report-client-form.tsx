"use client";

import { createBugReport } from "@/lib/actions/bug-reports";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function BugReportClientForm() {
  const router = useRouter();
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setLoading(true);
    setError(null);

    const fd = new FormData(e.currentTarget);
    const result = await createBugReport(fd);

    if (result?.error) {
      setError(result.error);
      setLoading(false);
    } else {
      setSuccess(true);
      setLoading(false);
      e.currentTarget.reset();
      router.refresh();
      setTimeout(() => setSuccess(false), 3000);
    }
  }

  return (
    <form onSubmit={handleSubmit} className="rounded-xl border border-border bg-white p-5 shadow-sm">
      {error && (
        <div className="mb-4 rounded-lg border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-600">
          {error}
        </div>
      )}
      {success && (
        <div className="mb-4 rounded-lg border border-green-200 bg-green-50 px-4 py-3 text-sm text-green-700">
          Bug report je uspješno poslan!
        </div>
      )}

      <div className="space-y-4">
        <div>
          <label htmlFor="title" className="mb-1.5 block text-sm font-medium text-foreground">
            Naslov
          </label>
          <input
            id="title"
            name="title"
            type="text"
            required
            className="w-full rounded-lg border border-border px-4 py-2.5 text-sm outline-none transition-colors focus:border-accent focus:ring-1 focus:ring-accent"
            placeholder="Kratak opis problema"
          />
        </div>

        <div>
          <label htmlFor="description" className="mb-1.5 block text-sm font-medium text-foreground">
            Opis problema
          </label>
          <textarea
            id="description"
            name="description"
            rows={4}
            required
            className="w-full rounded-lg border border-border px-4 py-2.5 text-sm outline-none transition-colors focus:border-accent focus:ring-1 focus:ring-accent"
            placeholder="Opišite što se događa, što ste očekivali, i korake za reprodukciju..."
          />
        </div>

        <div className="grid gap-4 sm:grid-cols-2">
          <div>
            <label htmlFor="severity" className="mb-1.5 block text-sm font-medium text-foreground">
              Ozbiljnost
            </label>
            <select
              id="severity"
              name="severity"
              defaultValue="MEDIUM"
              className="w-full rounded-lg border border-border px-4 py-2.5 text-sm outline-none transition-colors focus:border-accent focus:ring-1 focus:ring-accent"
            >
              <option value="LOW">Nizak</option>
              <option value="MEDIUM">Srednji</option>
              <option value="HIGH">Visok</option>
              <option value="CRITICAL">Kritičan</option>
            </select>
          </div>
          <div>
            <label htmlFor="page" className="mb-1.5 block text-sm font-medium text-foreground">
              Stranica <span className="text-muted">(opcionalno)</span>
            </label>
            <input
              id="page"
              name="page"
              type="text"
              className="w-full rounded-lg border border-border px-4 py-2.5 text-sm outline-none transition-colors focus:border-accent focus:ring-1 focus:ring-accent"
              placeholder="/dashboard/..."
            />
          </div>
        </div>
      </div>

      <button
        type="submit"
        disabled={loading}
        className="mt-5 w-full rounded-lg bg-accent px-4 py-2.5 text-sm font-medium text-white hover:bg-accent-dark disabled:opacity-50"
      >
        {loading ? "Šaljem..." : "Pošalji report"}
      </button>
    </form>
  );
}
