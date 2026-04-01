import ContactForm from "@/app/components/contact-form";

export const metadata = {
  title: "Kontakt — Zakažite besplatnu analizu poslovanja",
  description:
    "Javite nam se za besplatnu analizu vašeg poslovanja. Dolazimo u vašu kompaniju, upoznajemo procese i dajemo iskrenu procjenu — bez obveza.",
  alternates: { canonical: "https://briksygroup.com/kontakt" },
  openGraph: {
    title: "Kontakt — Zakažite besplatnu analizu poslovanja",
    description: "Besplatna analiza poslovanja. Dolazimo u vašu kompaniju, upoznajemo procese — bez obveza.",
    url: "https://briksygroup.com/kontakt",
  },
};

export default function KontaktPage() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "BreadcrumbList",
        itemListElement: [
          { "@type": "ListItem", position: 1, name: "Početna", item: "https://briksygroup.com" },
          { "@type": "ListItem", position: 2, name: "Kontakt", item: "https://briksygroup.com/kontakt" },
        ],
      },
      {
        "@type": "ContactPage",
        name: "Kontakt — Briksy Group",
        description:
          "Kontaktirajte Briksy Group za besplatnu analizu vašeg poslovanja.",
        url: "https://briksygroup.com/kontakt",
        mainEntity: {
          "@type": "Organization",
          "@id": "https://briksygroup.com/#organization",
        },
      },
    ],
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <section className="border-b border-border bg-slate-50 pt-16">
        <div className="mx-auto max-w-7xl px-6 py-20 md:py-28">
          <div className="grid gap-16 lg:grid-cols-5">
            {/* Lijeva strana — info */}
            <div className="lg:col-span-2">
              <h1 className="text-3xl font-bold tracking-tight md:text-5xl">
                Kontaktirajte nas
              </h1>
              <p className="mt-4 text-lg leading-relaxed text-muted">
                Ispunite formu ili nas kontaktirajte direktno.
                Javimo se u roku od 24 sata.
              </p>

              {/* Kontakt info */}
              <div className="mt-8 space-y-3">
                <a
                  href="mailto:info@briksygroup.com"
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
                    <div className="text-sm font-semibold">info@briksygroup.com</div>
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

              {/* Podaci o firmi */}
              <div className="mt-8 border-t border-border pt-8">
                <p className="text-sm font-semibold text-foreground">
                  BRIKSY GROUP d.o.o.
                </p>
                <p className="mt-1 text-xs leading-relaxed text-muted">
                  Društvo s ograničenom odgovornošću za razvoj i održavanje web
                  aplikacija i softverskih rješenja
                </p>
                <dl className="mt-4 space-y-1.5 text-xs text-muted">
                  <div className="flex gap-2">
                    <dt>OIB:</dt>
                    <dd className="text-foreground">01106775183</dd>
                  </div>
                  <div className="flex gap-2">
                    <dt>MBS:</dt>
                    <dd className="text-foreground">060512747</dd>
                  </div>
                  <div className="flex gap-2">
                    <dt>Sud:</dt>
                    <dd className="text-foreground">Trgovački sud u Splitu</dd>
                  </div>
                  <div className="flex gap-2">
                    <dt>Sjedište:</dt>
                    <dd className="text-foreground">Kaštel Sućurac, Putaljski put 25C</dd>
                  </div>
                </dl>
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
