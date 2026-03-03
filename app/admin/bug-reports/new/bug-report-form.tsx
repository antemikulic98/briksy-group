"use client";

import { createBugReport } from "@/lib/actions/bug-reports";
import { useRouter } from "next/navigation";
import { useState } from "react";

const SEVERITIES = ["LOW", "MEDIUM", "HIGH", "CRITICAL"];

export default function BugReportForm() {
  const router = useRouter();
  const [error, setError] = useState<string | null>(null);
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
      router.push("/admin/bug-reports");
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-5">
      {error && (
        <div className="rounded-lg border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-600">
          {error}
        </div>
      )}

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
          placeholder="Kratak opis buga"
        />
      </div>

      <div>
        <label htmlFor="description" className="mb-1.5 block text-sm font-medium text-foreground">
          Opis
        </label>
        <textarea
          id="description"
          name="description"
          rows={5}
          required
          className="w-full rounded-lg border border-border px-4 py-2.5 text-sm outline-none transition-colors focus:border-accent focus:ring-1 focus:ring-accent"
          placeholder="Detaljno opišite problem, korake za reprodukciju, očekivano ponašanje..."
        />
      </div>

      <div>
        <label htmlFor="severity" className="mb-1.5 block text-sm font-medium text-foreground">
          Severity
        </label>
        <select
          id="severity"
          name="severity"
          defaultValue="MEDIUM"
          className="w-full rounded-lg border border-border px-4 py-2.5 text-sm outline-none transition-colors focus:border-accent focus:ring-1 focus:ring-accent"
        >
          {SEVERITIES.map((s) => (
            <option key={s} value={s}>
              {s}
            </option>
          ))}
        </select>
      </div>

      <div>
        <label htmlFor="page" className="mb-1.5 block text-sm font-medium text-foreground">
          Stranica / URL <span className="text-muted">(opcionalno)</span>
        </label>
        <input
          id="page"
          name="page"
          type="text"
          className="w-full rounded-lg border border-border px-4 py-2.5 text-sm outline-none transition-colors focus:border-accent focus:ring-1 focus:ring-accent"
          placeholder="/admin/projects/..."
        />
      </div>

      <div className="flex gap-3 pt-2">
        <button
          type="submit"
          disabled={loading}
          className="rounded-lg bg-accent px-6 py-2.5 text-sm font-medium text-white hover:bg-accent-dark disabled:opacity-50"
        >
          {loading ? "Šaljem..." : "Kreiraj report"}
        </button>
        <button
          type="button"
          onClick={() => router.back()}
          className="rounded-lg border border-border px-4 py-2.5 text-sm text-muted hover:bg-slate-50"
        >
          Odustani
        </button>
      </div>
    </form>
  );
}
