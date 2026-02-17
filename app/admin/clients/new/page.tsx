"use client";

import { createClient } from "@/lib/actions/clients";
import { useState } from "react";
import Link from "next/link";

export default function NewClientPage() {
  const [error, setError] = useState<string | null>(null);

  async function handleSubmit(formData: FormData) {
    setError(null);
    const result = await createClient(formData);
    if (result?.error) {
      setError(result.error);
    }
  }

  return (
    <>
      <Link
        href="/admin/clients"
        className="mb-4 inline-flex items-center gap-1 text-sm text-muted hover:text-foreground"
      >
        &larr; Natrag na klijente
      </Link>

      <h1 className="mb-6 text-2xl font-bold text-foreground">Novi klijent</h1>

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
              Ime klijenta
            </label>
            <input
              id="name"
              name="name"
              type="text"
              required
              className="w-full rounded-lg border border-border px-4 py-2.5 text-sm outline-none transition-colors focus:border-accent focus:ring-1 focus:ring-accent"
              placeholder="Naziv firme d.o.o."
            />
          </div>

          <div>
            <label
              htmlFor="email"
              className="mb-1 block text-sm font-medium text-foreground"
            >
              Email
            </label>
            <input
              id="email"
              name="email"
              type="email"
              required
              className="w-full rounded-lg border border-border px-4 py-2.5 text-sm outline-none transition-colors focus:border-accent focus:ring-1 focus:ring-accent"
              placeholder="klijent@firma.com"
            />
          </div>

          <div>
            <label
              htmlFor="password"
              className="mb-1 block text-sm font-medium text-foreground"
            >
              Lozinka
            </label>
            <input
              id="password"
              name="password"
              type="password"
              required
              minLength={6}
              className="w-full rounded-lg border border-border px-4 py-2.5 text-sm outline-none transition-colors focus:border-accent focus:ring-1 focus:ring-accent"
              placeholder="Min. 6 znakova"
            />
          </div>

          <button
            type="submit"
            className="rounded-lg bg-accent px-6 py-2.5 text-sm font-medium text-white transition-colors hover:bg-accent-dark"
          >
            Kreiraj klijenta
          </button>
        </form>
      </div>
    </>
  );
}
