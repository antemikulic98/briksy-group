import Link from "next/link";
import AnimateOnScroll from "@/app/components/animate-on-scroll";

export const metadata = {
  title: "Digitalizacija poslovanja — Što znači i kako početi",
  description:
    "Što znači digitalizirati kompaniju? Primjeri iz prakse, konkretne statistike i koristi digitalne transformacije. Besplatna analiza vašeg poslovanja.",
  alternates: { canonical: "https://briksygroup.com/digitalizacija" },
  openGraph: {
    title: "Digitalizacija poslovanja — Što znači i kako početi",
    description: "Primjeri iz prakse, statistike i konkretne koristi digitalne transformacije za vašu kompaniju.",
    url: "https://briksygroup.com/digitalizacija",
  },
};

export default function DigitalizacijaPage() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "BreadcrumbList",
        itemListElement: [
          { "@type": "ListItem", position: 1, name: "Početna", item: "https://briksygroup.com" },
          { "@type": "ListItem", position: 2, name: "Usluge", item: "https://briksygroup.com/usluge" },
          { "@type": "ListItem", position: 3, name: "Digitalizacija", item: "https://briksygroup.com/digitalizacija" },
        ],
      },
      {
        "@type": "Service",
        name: "Digitalizacija poslovanja",
        provider: { "@id": "https://briksygroup.com/#organization" },
        description: "Kompletna digitalizacija poslovnih procesa — zamjena ručnih, sporih procesa digitalnim sustavima koji rade brže, točnije i bez ljudske pogreške.",
        areaServed: { "@type": "Country", name: "Croatia" },
        serviceType: "Digitalna transformacija",
      },
    ],
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />

      {/* Hero */}
      <section className="border-b border-border bg-blue-50/50 pt-16">
        <div className="mx-auto max-w-7xl px-6 py-14 md:py-20">
          <div className="grid gap-12 lg:grid-cols-5">
            <div className="lg:col-span-2">
              <p className="text-sm font-medium uppercase tracking-widest text-accent">
                Digitalizacija — objašnjeno jednostavno
              </p>
              <h1 className="mt-3 text-3xl font-bold tracking-tight md:text-5xl">
                Što zapravo znači digitalizirati kompaniju?
              </h1>
              <p className="mt-5 leading-relaxed text-muted">
                Zamijeniti ručne, spore procese digitalnim sustavima koji rade
                brže, točnije i bez ljudske pogreške. Ne samo "staviti u kompjuter"
                — nego promijeniti način na koji kompanija funkcionira.
              </p>
            </div>

            <div className="space-y-5 lg:col-span-3">
              <div className="rounded-lg border border-accent/20 bg-accent/5 p-5">
                <h3 className="font-semibold">Primjer iz prakse</h3>
                <p className="mt-2 text-sm leading-relaxed text-muted">
                  Građevinska kompanija troši <strong className="text-foreground">15 sati tjedno</strong> na
                  administraciju — ponude, dokumenti, usklađivanje s gradilištem.
                  S digitalnim sustavom: <strong className="text-foreground">2-3 sata</strong>.
                  Ostatak ide na gradnju, pregovore i rast.
                </p>
              </div>

              <AnimateOnScroll>
                <div className="grid gap-4 sm:grid-cols-2">
                  {[
                    { title: "Dokumentacija", desc: "Jedan sustav umjesto fascikli — s poviješću promjena i kontrolom pristupa." },
                    { title: "Komunikacija", desc: "Jasni kanali vezani uz projekte. Ništa se ne gubi u prijevodu." },
                    { title: "Financije", desc: "Uvid u troškove u realnom vremenu, automatski kategorizirano." },
                    { title: "Odlučivanje", desc: "Konkretni podaci i trendovi umjesto odluka na temelju osjećaja." },
                  ].map((item) => (
                    <div key={item.title} className="rounded-lg border border-border bg-white p-5">
                      <h4 className="font-semibold">{item.title}</h4>
                      <p className="mt-1 text-sm leading-relaxed text-muted">{item.desc}</p>
                    </div>
                  ))}
                </div>
              </AnimateOnScroll>
            </div>
          </div>

          {/* Objections */}
          <AnimateOnScroll>
            <div className="mt-12 rounded-lg border border-border bg-white p-6">
              <h3 className="text-lg font-semibold">
                Zašto kompanije odgađaju — i zašto ne bi trebale
              </h3>
              <div className="mt-5 grid gap-6 lg:grid-cols-3">
                {[
                  { q: "\"Preskupo je\"", a: "Cijena nedigitalizacije je veća. Naši klijenti u prosjeku vrate investiciju u 6-12 mjeseci." },
                  { q: "\"Nemamo vremena\"", a: "Upravo zato trebate digitalizaciju. Radimo u fazama koje ne zaustavljaju vaše poslovanje." },
                  { q: "\"Zaposlenici neće prihvatiti\"", a: "Nakon 2-3 tjedna korištenja, ne žele nazad. Ključ je pokazati im kako im alat olakšava posao." },
                ].map((item) => (
                  <div key={item.q}>
                    <h4 className="font-semibold text-muted">{item.q}</h4>
                    <p className="mt-1.5 text-sm leading-relaxed text-muted">{item.a}</p>
                  </div>
                ))}
              </div>
            </div>
          </AnimateOnScroll>
        </div>
      </section>

      {/* CTA */}
      <section className="bg-slate-50 py-14 md:py-20">
        <div className="mx-auto max-w-7xl px-6 text-center">
          <h2 className="text-3xl font-bold tracking-tight md:text-4xl">
            Spremni za digitalizaciju?
          </h2>
          <p className="mx-auto mt-3 max-w-xl text-lg text-muted">
            Besplatna analiza vašeg poslovanja. Bez obveza.
          </p>
          <Link
            href="/kontakt"
            className="mt-6 inline-flex rounded-xl bg-accent px-8 py-3.5 text-base font-semibold text-white hover:bg-accent-dark"
          >
            Kontaktirajte nas
          </Link>
        </div>
      </section>
    </>
  );
}
