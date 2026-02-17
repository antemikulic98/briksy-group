"use client";

import { submitInquiry } from "@/lib/actions/inquiries";
import { useState } from "react";

const INDUSTRIES = [
  "Građevinarstvo",
  "Proizvodnja",
  "Trgovina",
  "Usluge",
  "IT",
  "Financije",
  "Zdravstvo",
  "Transport i logistika",
  "Ostalo",
];

const COMPANY_SIZES = [
  { value: "1-10 zaposlenih", label: "1–10", sub: "zaposlenih" },
  { value: "11-50 zaposlenih", label: "11–50", sub: "zaposlenih" },
  { value: "51-200 zaposlenih", label: "51–200", sub: "zaposlenih" },
  { value: "200+ zaposlenih", label: "200+", sub: "zaposlenih" },
];

const BUDGETS = [
  { value: "Do 50.000 €", label: "Do 50k €" },
  { value: "50.000 - 100.000 €", label: "50k – 100k €" },
  { value: "100.000 - 500.000 €", label: "100k – 500k €" },
  { value: "500.000+ €", label: "500k+ €" },
  { value: "Nije definirano", label: "Ne znam još" },
];

type FormData = {
  name: string;
  company: string;
  email: string;
  phone: string;
  industry: string;
  companySize: string;
  budget: string;
  message: string;
};

export default function ContactForm({ compact }: { compact?: boolean }) {
  const [step, setStep] = useState(1);
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [error, setError] = useState<string | null>(null);
  const [data, setData] = useState<FormData>({
    name: "",
    company: "",
    email: "",
    phone: "",
    industry: "",
    companySize: "",
    budget: "",
    message: "",
  });

  const totalSteps = 3;

  function update(field: keyof FormData, value: string) {
    setData((prev) => ({ ...prev, [field]: value }));
  }

  function canProceed() {
    if (step === 1) return data.industry !== "" && data.companySize !== "";
    if (step === 2) return data.budget !== "";
    return data.name !== "" && data.company !== "" && data.email !== "" && data.message !== "";
  }

  function next() {
    if (canProceed() && step < totalSteps) setStep(step + 1);
  }

  function back() {
    if (step > 1) setStep(step - 1);
  }

  async function handleSubmit() {
    if (!canProceed()) return;
    setStatus("loading");
    setError(null);

    const fd = new window.FormData();
    Object.entries(data).forEach(([k, v]) => fd.append(k, v));

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
        <h3 className="text-xl font-bold text-foreground">Prijava je poslana!</h3>
        <p className="mx-auto mt-3 max-w-sm text-muted">
          Javit ćemo vam se u roku od 24 sata na <strong className="text-foreground">{data.email}</strong>. Hvala na povjerenju.
        </p>
        <div className="mx-auto mt-8 max-w-sm rounded-lg border border-border bg-white p-5">
          <p className="text-sm font-semibold text-foreground">Što slijedi?</p>
          <div className="mt-3 space-y-2.5 text-left">
            {[
              "Kontaktirat ćemo vas za dogovor termina",
              "Dolazimo k vama u firmu (ili online)",
              "Besplatna analiza bez obveza",
            ].map((t, i) => (
              <div key={i} className="flex items-start gap-2.5">
                <div className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-accent/10 text-[10px] font-bold text-accent">
                  {i + 1}
                </div>
                <span className="text-sm text-muted">{t}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className={compact ? "" : "rounded-2xl border border-border bg-white p-6 shadow-sm sm:p-8"}>
      {/* Progress */}
      <div className="mb-8">
        <div className="flex items-center justify-between">
          {[
            { n: 1, label: "Vaša firma" },
            { n: 2, label: "Budget" },
            { n: 3, label: "Kontakt" },
          ].map((s, i) => (
            <div key={s.n} className="flex items-center">
              <button
                type="button"
                onClick={() => { if (s.n < step) setStep(s.n); }}
                className={`flex h-8 w-8 items-center justify-center rounded-full text-xs font-bold transition-colors ${
                  step >= s.n
                    ? "bg-accent text-white"
                    : "border border-border bg-white text-muted"
                } ${s.n < step ? "cursor-pointer hover:bg-accent-dark" : ""}`}
              >
                {step > s.n ? (
                  <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" />
                  </svg>
                ) : (
                  s.n
                )}
              </button>
              <span className={`ml-2 hidden text-xs font-medium sm:block ${step >= s.n ? "text-foreground" : "text-muted"}`}>
                {s.label}
              </span>
              {i < 2 && (
                <div className={`mx-3 h-px w-8 sm:w-12 ${step > s.n ? "bg-accent" : "bg-border"}`} />
              )}
            </div>
          ))}
        </div>
      </div>

      {error && (
        <div className="mb-6 rounded-lg border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-600">
          {error}
        </div>
      )}

      {/* Step 1: Firma */}
      {step === 1 && (
        <div>
          <h3 className="text-lg font-semibold text-foreground">Recite nam o svojoj firmi</h3>
          <p className="mt-1 text-sm text-muted">Ovo nam pomaže da se pripremimo za razgovor.</p>

          <div className="mt-6">
            <label className="mb-2 block text-sm font-medium text-foreground">Djelatnost</label>
            <div className="flex flex-wrap gap-2">
              {INDUSTRIES.map((ind) => (
                <button
                  key={ind}
                  type="button"
                  onClick={() => update("industry", ind)}
                  className={`rounded-full border px-4 py-2 text-sm transition-colors ${
                    data.industry === ind
                      ? "border-accent bg-accent/10 font-medium text-accent"
                      : "border-border bg-white text-muted hover:border-accent/40 hover:text-foreground"
                  }`}
                >
                  {ind}
                </button>
              ))}
            </div>
          </div>

          <div className="mt-6">
            <label className="mb-2 block text-sm font-medium text-foreground">Veličina firme</label>
            <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
              {COMPANY_SIZES.map((size) => (
                <button
                  key={size.value}
                  type="button"
                  onClick={() => update("companySize", size.value)}
                  className={`rounded-xl border p-4 text-center transition-colors ${
                    data.companySize === size.value
                      ? "border-accent bg-accent/10"
                      : "border-border bg-white hover:border-accent/40"
                  }`}
                >
                  <div className={`text-xl font-bold ${data.companySize === size.value ? "text-accent" : "text-foreground"}`}>
                    {size.label}
                  </div>
                  <div className="mt-0.5 text-xs text-muted">{size.sub}</div>
                </button>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Step 2: Budget */}
      {step === 2 && (
        <div>
          <h3 className="text-lg font-semibold text-foreground">Koliki je vaš okvirni budget?</h3>
          <p className="mt-1 text-sm text-muted">Ne morate znati točan iznos — ovo je samo orijentacija.</p>

          <div className="mt-6 grid gap-3 sm:grid-cols-2">
            {BUDGETS.map((b) => (
              <button
                key={b.value}
                type="button"
                onClick={() => update("budget", b.value)}
                className={`rounded-xl border p-5 text-left transition-colors ${
                  data.budget === b.value
                    ? "border-accent bg-accent/10"
                    : "border-border bg-white hover:border-accent/40"
                }`}
              >
                <div className={`text-lg font-bold ${data.budget === b.value ? "text-accent" : "text-foreground"}`}>
                  {b.label}
                </div>
              </button>
            ))}
          </div>

          <div className="mt-6 rounded-lg bg-blue-50/80 p-4">
            <p className="text-sm text-muted">
              <strong className="text-foreground">Besplatna analiza</strong> — dolazimo k vama, upoznajemo vaše poslovanje i dajemo vam procjenu s konkretnim prijedlogom. Bez obveza.
            </p>
          </div>
        </div>
      )}

      {/* Step 3: Kontakt */}
      {step === 3 && (
        <div>
          <h3 className="text-lg font-semibold text-foreground">Kako vas možemo kontaktirati?</h3>
          <p className="mt-1 text-sm text-muted">Javit ćemo vam se u roku od 24 sata.</p>

          <div className="mt-6 space-y-4">
            <div className="grid gap-4 sm:grid-cols-2">
              <div>
                <label htmlFor="name" className="mb-1.5 block text-sm font-medium text-foreground">
                  Ime i prezime
                </label>
                <input
                  id="name"
                  type="text"
                  value={data.name}
                  onChange={(e) => update("name", e.target.value)}
                  className="w-full rounded-xl border border-border bg-white px-4 py-3 text-sm text-foreground outline-none transition-colors placeholder:text-gray-400 focus:border-accent focus:ring-2 focus:ring-accent/20"
                  placeholder="Ivan Horvat"
                />
              </div>
              <div>
                <label htmlFor="company" className="mb-1.5 block text-sm font-medium text-foreground">
                  Naziv firme
                </label>
                <input
                  id="company"
                  type="text"
                  value={data.company}
                  onChange={(e) => update("company", e.target.value)}
                  className="w-full rounded-xl border border-border bg-white px-4 py-3 text-sm text-foreground outline-none transition-colors placeholder:text-gray-400 focus:border-accent focus:ring-2 focus:ring-accent/20"
                  placeholder="Vaša firma d.o.o."
                />
              </div>
            </div>
            <div className="grid gap-4 sm:grid-cols-2">
              <div>
                <label htmlFor="email" className="mb-1.5 block text-sm font-medium text-foreground">
                  Email
                </label>
                <input
                  id="email"
                  type="email"
                  value={data.email}
                  onChange={(e) => update("email", e.target.value)}
                  className="w-full rounded-xl border border-border bg-white px-4 py-3 text-sm text-foreground outline-none transition-colors placeholder:text-gray-400 focus:border-accent focus:ring-2 focus:ring-accent/20"
                  placeholder="ivan@firma.hr"
                />
              </div>
              <div>
                <label htmlFor="phone" className="mb-1.5 block text-sm font-medium text-foreground">
                  Telefon <span className="text-muted">(opcionalno)</span>
                </label>
                <input
                  id="phone"
                  type="tel"
                  value={data.phone}
                  onChange={(e) => update("phone", e.target.value)}
                  className="w-full rounded-xl border border-border bg-white px-4 py-3 text-sm text-foreground outline-none transition-colors placeholder:text-gray-400 focus:border-accent focus:ring-2 focus:ring-accent/20"
                  placeholder="+385 ..."
                />
              </div>
            </div>
            <div>
              <label htmlFor="message" className="mb-1.5 block text-sm font-medium text-foreground">
                Kratko opišite što vas muči
              </label>
              <textarea
                id="message"
                rows={3}
                value={data.message}
                onChange={(e) => update("message", e.target.value)}
                className="w-full rounded-xl border border-border bg-white px-4 py-3 text-sm text-foreground outline-none transition-colors placeholder:text-gray-400 focus:border-accent focus:ring-2 focus:ring-accent/20"
                placeholder="Npr. gubimo previše vremena na administraciju, želimo automatizirati ponude..."
              />
            </div>
          </div>
        </div>
      )}

      {/* Navigation */}
      <div className="mt-8 flex items-center justify-between">
        {step > 1 ? (
          <button
            type="button"
            onClick={back}
            className="flex items-center gap-1.5 rounded-lg px-4 py-2.5 text-sm font-medium text-muted transition-colors hover:bg-gray-50 hover:text-foreground"
          >
            <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
            Natrag
          </button>
        ) : (
          <div />
        )}

        {step < totalSteps ? (
          <button
            type="button"
            onClick={next}
            disabled={!canProceed()}
            className="flex items-center gap-1.5 rounded-xl bg-accent px-6 py-3 text-sm font-semibold text-white transition-colors hover:bg-accent-dark disabled:opacity-40"
          >
            Dalje
            <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </button>
        ) : (
          <button
            type="button"
            onClick={handleSubmit}
            disabled={!canProceed() || status === "loading"}
            className="flex items-center gap-2 rounded-xl bg-accent px-7 py-3 text-sm font-semibold text-white transition-colors hover:bg-accent-dark disabled:opacity-40"
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
              "Pošaljite prijavu"
            )}
          </button>
        )}
      </div>

      <p className="mt-5 text-center text-xs text-muted">
        Vaši podaci su sigurni. Koristimo ih isključivo za kontaktiranje u vezi vaše prijave.
      </p>
    </div>
  );
}
