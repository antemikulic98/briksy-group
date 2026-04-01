"use client";

import { submitInquiry } from "@/lib/actions/inquiries";
import { useState } from "react";

type FormData = {
  company: string;
  phone: string;
  email: string;
  message: string;
  website: string;
};

export default function ContactForm() {
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [error, setError] = useState<string | null>(null);
  const [data, setData] = useState<FormData>({
    company: "",
    phone: "",
    email: "",
    message: "",
    website: "",
  });

  function update(field: keyof FormData, value: string) {
    setData((prev) => ({ ...prev, [field]: value }));
  }

  function canSubmit() {
    return data.company !== "" && data.email !== "" && data.phone !== "";
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!canSubmit()) return;
    setStatus("loading");
    setError(null);

    const fd = new window.FormData();
    fd.append("company", data.company);
    fd.append("phone", data.phone);
    fd.append("email", data.email);
    fd.append("message", data.message);
    fd.append("website", data.website);

    const result = await submitInquiry(fd);
    if (result?.error) {
      setError(result.error);
      setStatus("error");
    } else {
      setStatus("success");
    }
  }

  if (status === "success") {
    return (
      <div className="rounded-2xl border border-green-200 bg-gradient-to-b from-green-50 to-white p-10 text-center">
        <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-green-100">
          <svg className="h-8 w-8 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
          </svg>
        </div>
        <h3 className="text-xl font-bold text-foreground">Poruka je poslana!</h3>
        <p className="mx-auto mt-3 max-w-sm text-muted">
          Javit ćemo vam se u najkraćem mogućem roku na <strong className="text-foreground">{data.email}</strong>. Hvala na povjerenju.
        </p>
      </div>
    );
  }

  const inputClass =
    "w-full rounded-xl border border-border bg-white px-4 py-3 text-sm text-foreground outline-none transition-colors placeholder:text-gray-400 focus:border-accent focus:ring-2 focus:ring-accent/20";

  return (
    <form onSubmit={handleSubmit} className="rounded-2xl border border-border bg-white p-6 shadow-sm sm:p-8">
      <h3 className="text-lg font-semibold text-foreground">Javite nam se</h3>
      <p className="mt-1 text-sm text-muted">Odgovaramo u roku od 24 sata.</p>

      {error && (
        <div className="mt-4 rounded-lg border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-600">
          {error}
        </div>
      )}

      <div className="mt-6 space-y-4">
        <div>
          <label htmlFor="company" className="mb-1.5 block text-sm font-medium text-foreground">
            Naziv firme
          </label>
          <input
            id="company"
            type="text"
            required
            value={data.company}
            onChange={(e) => update("company", e.target.value)}
            className={inputClass}
            placeholder="Vaša kompanija d.o.o."
          />
        </div>

        <div className="grid gap-4 sm:grid-cols-2">
          <div>
            <label htmlFor="phone" className="mb-1.5 block text-sm font-medium text-foreground">
              Kontakt broj
            </label>
            <input
              id="phone"
              type="tel"
              required
              value={data.phone}
              onChange={(e) => update("phone", e.target.value)}
              className={inputClass}
              placeholder="+385 ..."
            />
          </div>
          <div>
            <label htmlFor="email" className="mb-1.5 block text-sm font-medium text-foreground">
              Email
            </label>
            <input
              id="email"
              type="email"
              required
              value={data.email}
              onChange={(e) => update("email", e.target.value)}
              className={inputClass}
              placeholder="ivan@kompanija.hr"
            />
          </div>
        </div>

        <div>
          <label htmlFor="message" className="mb-1.5 block text-sm font-medium text-foreground">
            Poruka <span className="text-muted">(opcionalno)</span>
          </label>
          <textarea
            id="message"
            rows={3}
            value={data.message}
            onChange={(e) => update("message", e.target.value)}
            className={inputClass}
            placeholder="Kako vam možemo pomoći?"
          />
        </div>
      </div>

      <button
        type="submit"
        disabled={!canSubmit() || status === "loading"}
        className="mt-6 flex w-full items-center justify-center gap-2 rounded-xl bg-accent px-7 py-3 text-sm font-semibold text-white transition-colors hover:bg-accent-dark disabled:opacity-40"
      >
        {status === "loading" ? (
          <>
            <svg className="h-4 w-4 animate-spin" viewBox="0 0 24 24" fill="none">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
            </svg>
            Šaljem...
          </>
        ) : (
          "Pošaljite poruku"
        )}
      </button>

      {/* Honeypot — hidden from real users */}
      <div aria-hidden="true" style={{ position: "absolute", left: "-9999px", top: "-9999px" }}>
        <label htmlFor="website">Website</label>
        <input
          id="website"
          name="website"
          type="text"
          tabIndex={-1}
          autoComplete="off"
          value={data.website}
          onChange={(e) => update("website", e.target.value)}
        />
      </div>

      <p className="mt-5 text-center text-xs text-muted">
        Vaši podaci su sigurni. Koristimo ih isključivo za kontaktiranje.
      </p>
    </form>
  );
}
