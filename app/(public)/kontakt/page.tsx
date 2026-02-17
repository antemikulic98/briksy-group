import ContactForm from "@/app/components/contact-form";

export const metadata = {
  title: "Kontakt — Besplatna analiza poslovanja",
  description:
    "Kontaktirajte Briksy Group za besplatnu analizu vašeg poslovanja. Dolazimo u vašu firmu, upoznajemo vaše procese i dajemo vam iskrenu procjenu — bez obveza.",
};

export default function KontaktPage() {
  return (
    <>
      <section className="border-b border-border bg-slate-50 pt-20">
        <div className="mx-auto max-w-7xl px-6 py-20 md:py-28">
          <div className="grid gap-16 lg:grid-cols-5">
            {/* Lijeva strana — info */}
            <div className="lg:col-span-2">
              <p className="text-sm font-medium uppercase tracking-widest text-accent">
                Besplatna analiza
              </p>
              <h1 className="mt-3 text-3xl font-bold tracking-tight md:text-5xl">
                Započnite digitalnu
                <br />
                transformaciju danas.
              </h1>
              <p className="mt-6 text-lg leading-relaxed text-muted">
                Ispunite formu u 3 kratka koraka i javit ćemo vam se u roku od
                24 sata. Bez obveza, bez pritiska.
              </p>

              <div className="mt-10 space-y-5">
                {[
                  {
                    n: "1",
                    t: "Ispunite formu",
                    d: "Traje manje od minute. Odgovaramo u roku od 24 sata.",
                  },
                  {
                    n: "2",
                    t: "Dolazimo k vama",
                    d: "Upoznajemo vaše ljude, procese i probleme. Besplatno.",
                  },
                  {
                    n: "3",
                    t: "Dobivate plan",
                    d: "Izvještaj s preporukama, procjenom ušteda i konkretnim koracima.",
                  },
                  {
                    n: "4",
                    t: "Odluka je vaša",
                    d: "Vi odlučujete. Bez pritiska, bez skrivenih troškova.",
                  },
                ].map((s) => (
                  <div key={s.n} className="flex gap-4">
                    <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-accent/10 text-xs font-bold text-accent">
                      {s.n}
                    </div>
                    <div>
                      <h4 className="text-sm font-semibold text-foreground">
                        {s.t}
                      </h4>
                      <p className="mt-0.5 text-sm text-muted">{s.d}</p>
                    </div>
                  </div>
                ))}
              </div>

              {/* Kontakt info */}
              <div className="mt-10 space-y-3">
                <h3 className="text-sm font-medium uppercase tracking-wider text-muted">
                  Ili nas kontaktirajte direktno
                </h3>
                <a
                  href="mailto:info@briksy.com"
                  className="flex items-center gap-3 rounded-lg border border-border bg-white p-4 hover:bg-gray-50"
                >
                  <svg
                    className="h-5 w-5 text-accent"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                    />
                  </svg>
                  <div>
                    <div className="text-sm font-semibold">info@briksy.com</div>
                    <div className="text-xs text-muted">
                      Odgovaramo u roku od 24 sata
                    </div>
                  </div>
                </a>
                <a
                  href="tel:+385955419712"
                  className="flex items-center gap-3 rounded-lg border border-border bg-white p-4 hover:bg-gray-50"
                >
                  <svg
                    className="h-5 w-5 text-accent"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"
                    />
                  </svg>
                  <div>
                    <div className="text-sm font-semibold">+385 95 541 9712</div>
                    <div className="text-xs text-muted">
                      Radnim danom 8:00–17:00
                    </div>
                  </div>
                </a>
              </div>
            </div>

            {/* Desna strana — forma */}
            <div className="lg:col-span-3">
              <ContactForm />
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
