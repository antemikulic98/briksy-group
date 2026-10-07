import ContactForm from "@/app/components/contact-form";

export const metadata = {
  title: "Zatražite sastanak — Operativna dijagnostika",
  description:
    "Ostavite kontakt i dogovorimo 30 minuta o vašim procesima. Javimo se u roku od jednog radnog dana. Bez obveze.",
  alternates: { canonical: "https://briksygroup.com/kontakt" },
  openGraph: {
    title: "Zatražite sastanak — Briksy Group",
    description: "30 minuta o vašim procesima. Javimo se u roku od jednog radnog dana.",
    url: "https://briksygroup.com/kontakt",
  },
};

const results = [
  { title: "Koje procese najviše vrijedi automatizirati", desc: "Dva do tri mjesta gdje se gubi najviše vremena i gdje promjena najbrže vraća uloženo." },
  { title: "Što ne treba dirati", desc: "Ono što već radi ostaje. Ne prodajemo zamjenu cijelog sustava." },
  { title: "Kako bi to izgledalo", desc: "Custom software, integracija ili postojeći alat, s okvirnim načinom implementacije." },
];

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
        name: "Zatražite sastanak — Briksy Group",
        description: "Dogovorite 30-minutni razgovor o vašim poslovnim procesima.",
        url: "https://briksygroup.com/kontakt",
        mainEntity: { "@type": "Organization", "@id": "https://briksygroup.com/#organization" },
      },
    ],
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />

      <section className="relative overflow-hidden bg-slate-50 pt-16">
        <div
          className="pointer-events-none absolute inset-x-0 top-0 h-[500px]"
          style={{
            background:
              "radial-gradient(55% 50% at 50% 0%, rgba(37,99,235,0.12) 0%, rgba(248,250,252,0) 100%)",
          }}
        />
        <div className="relative mx-auto max-w-3xl px-6 py-20 md:py-28">
          <div className="text-center">
            <p className="text-xs font-semibold uppercase tracking-widest text-accent">Operativna dijagnostika</p>
            <h1 className="mt-4 text-4xl font-bold leading-tight tracking-tight md:text-6xl">
              Pokažite nam gdje zapinje.
            </h1>
            <p className="mx-auto mt-5 max-w-lg text-lg leading-relaxed text-muted">
              30 minuta o vašim procesima, uživo ili online. Javimo se u roku od
              jednog radnog dana i dogovorimo termin. Bez obveze.
            </p>
          </div>

          <div className="mt-12">
            <ContactForm />
          </div>

          <div className="mt-14">
            <p className="text-center text-xs font-semibold uppercase tracking-widest text-muted">
              Što dobivate na kraju razgovora
            </p>
            <ol className="mt-6 grid gap-6 sm:grid-cols-3">
              {results.map((r, i) => (
                <li key={r.title} className="rounded-2xl bg-white p-6 ring-1 ring-black/5">
                  <span className="inline-flex h-8 w-8 items-center justify-center rounded-full bg-accent/10 text-sm font-semibold text-accent">
                    {i + 1}
                  </span>
                  <p className="mt-3 font-semibold leading-snug">{r.title}</p>
                  <p className="mt-1 text-sm leading-relaxed text-muted">{r.desc}</p>
                </li>
              ))}
            </ol>
            <p className="mt-8 text-center text-sm text-muted">
              Najviše vrijednosti donosimo firmama s 20 i više zaposlenih, više lokacija ili puno terenskog rada.
              Ako niste sigurni jeste li za nas, javite se, iskreno ćemo reći.
            </p>
          </div>

          <div className="mt-14 flex flex-col gap-2 border-t border-border pt-8 text-sm text-muted sm:flex-row sm:items-center sm:justify-between">
            <p>
              <a href="mailto:info@briksygroup.com" className="font-medium text-foreground hover:text-accent">info@briksygroup.com</a>
              {" · "}
              <a href="tel:+385955419712" className="font-medium text-foreground hover:text-accent">+385 95 541 9712</a>
            </p>
            <p className="text-xs">
              Briksy Group d.o.o. · Putaljski put 25C, 21212 Kaštel Sućurac · OIB 01106775183
            </p>
          </div>
        </div>
      </section>
    </>
  );
}
