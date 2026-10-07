"use client";

import { submitInquiry } from "@/lib/actions/inquiries";
import { Suspense, useState } from "react";
import { useSearchParams } from "next/navigation";

type FormData = {
  name: string;
  company: string;
  phone: string;
  email: string;
  message: string;
  website: string;
};

export default function ContactForm() {
  return (
    <Suspense fallback={<ContactFormInner topic="" />}>
      <ContactFormWithParams />
    </Suspense>
  );
}

function ContactFormWithParams() {
  const params = useSearchParams();
  const topic = params.get("tema") === "briksy-demo" ? "briksy-demo" : "";
  return <ContactFormInner topic={topic} />;
}

function ContactFormInner({ topic }: { topic: string }) {
  const isDemo = topic === "briksy-demo";
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [error, setError] = useState<string | null>(null);
  const [data, setData] = useState<FormData>({
    name: "",
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
    return data.name !== "" && data.company !== "" && data.email !== "" && data.phone !== "";
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!canSubmit()) return;
    setStatus("loading");
    setError(null);

    const fd = new window.FormData();
    (Object.keys(data) as (keyof FormData)[]).forEach((key) => fd.append(key, data[key]));
    fd.append("topic", topic);

    const result = await submitInquiry(fd);
    if (result?.error) {
      setError(result.error);
      setStatus("error");
    } else {
      setStatus("success");
      if (typeof window !== "undefined" && typeof window.gtag === "function") {
        window.gtag("event", "generate_lead", {
          event_category: "kontakt",
          event_label: isDemo ? "briksy-demo" : "sastanak",
        });
      }
    }
  }

  if (status === "success") {
    return (
      <div className="animate-fade-in-up rounded-3xl bg-white p-10 text-center shadow-sm ring-1 ring-black/5 sm:p-14">
        <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-accent/10">
          <div className="flex h-10 w-10 items-center justify-center rounded-full bg-accent text-white">
            <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
            </svg>
          </div>
        </div>
        <h3 className="mt-6 text-2xl font-bold tracking-tight md:text-3xl">Hvala, zahtjev je zaprimljen.</h3>
        <p className="mx-auto mt-3 max-w-md leading-relaxed text-muted">
          Javit ćemo vam se u roku od jednog radnog dana na{" "}
          <span className="font-medium text-foreground">{data.email}</span> i dogovoriti termin
          {isDemo ? " za demo Briksyja" : " sastanka"} koji vama odgovara.
        </p>
      </div>
    );
  }

  const inputClass =
    "w-full rounded-xl border border-border bg-slate-50 px-4 py-3.5 text-base text-foreground outline-none transition-all placeholder:text-gray-400 focus:border-accent focus:bg-white focus:ring-4 focus:ring-accent/10";
  const labelClass = "mb-2 block text-sm font-medium text-foreground";

  return (
    <form onSubmit={handleSubmit} className="rounded-3xl bg-white p-6 shadow-sm ring-1 ring-black/5 sm:p-10">
      {isDemo && (
        <div className="mb-6 flex items-center gap-3 rounded-xl bg-accent/5 px-4 py-3 text-sm ring-1 ring-accent/15">
          <span className="h-2 w-2 shrink-0 rounded-full bg-accent" />
          <span>
            <span className="font-semibold text-foreground">Demo Briksyja.</span>{" "}
            <span className="text-muted">Pokazat ćemo vam sustav na primjeru vaše firme.</span>
          </span>
        </div>
      )}
      {error && (
        <div className="mb-5 rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-600">
          {error}
        </div>
      )}

      <div className="grid gap-5 sm:grid-cols-2">
        <div>
          <label htmlFor="name" className={labelClass}>Ime i prezime</label>
          <input
            id="name"
            type="text"
            required
            autoComplete="name"
            value={data.name}
            onChange={(e) => update("name", e.target.value)}
            className={inputClass}
            placeholder="Ivan Horvat"
          />
        </div>
        <div>
          <label htmlFor="company" className={labelClass}>Firma</label>
          <input
            id="company"
            type="text"
            required
            autoComplete="organization"
            value={data.company}
            onChange={(e) => update("company", e.target.value)}
            className={inputClass}
            placeholder="Firma d.o.o."
          />
        </div>
        <div>
          <label htmlFor="email" className={labelClass}>Email</label>
          <input
            id="email"
            type="email"
            required
            autoComplete="email"
            value={data.email}
            onChange={(e) => update("email", e.target.value)}
            className={inputClass}
            placeholder="ivan@firma.hr"
          />
        </div>
        <div>
          <label htmlFor="phone" className={labelClass}>Telefon</label>
          <input
            id="phone"
            type="tel"
            required
            autoComplete="tel"
            value={data.phone}
            onChange={(e) => update("phone", e.target.value)}
            className={inputClass}
            placeholder="+385 ..."
          />
        </div>
        <div className="sm:col-span-2">
          <label htmlFor="message" className={labelClass}>
            Poruka <span className="font-normal text-muted">(opcionalno)</span>
          </label>
          <textarea
            id="message"
            rows={3}
            value={data.message}
            onChange={(e) => update("message", e.target.value)}
            className={inputClass}
            placeholder={isDemo ? "Ukratko, koliko gradilišta vodite i što vas najviše zanima?" : "Ukratko, gdje vam trenutno najviše zapinje?"}
          />
        </div>
      </div>

      <div className="mt-7 flex flex-col items-center gap-4 sm:flex-row sm:justify-between">
        <p className="text-xs text-muted">
          Javimo se u roku od jednog radnog dana.{" "}
          <a href="/privatnost" className="text-accent hover:underline">Politika privatnosti</a>
        </p>
        <button
          type="submit"
          disabled={!canSubmit() || status === "loading"}
          className="inline-flex w-full items-center justify-center gap-2 rounded-full bg-accent px-7 py-3.5 text-sm font-semibold text-white transition-all hover:bg-accent-dark disabled:cursor-not-allowed disabled:opacity-40 sm:w-auto"
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
            <>
              {isDemo ? "Zatražite demo" : "Zatražite sastanak"}
              <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </>
          )}
        </button>
      </div>

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
    </form>
  );
}
