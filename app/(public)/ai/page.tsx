import Link from "next/link";
import AnimateOnScroll from "@/app/components/animate-on-scroll";

export const metadata = {
  title: "AI u poslovanju — Implementacija i automatizacija",
  description:
    "Implementiramo AI rješenja koja automatiziraju repetitivne zadatke, analiziraju podatke i ubrzavaju obradu dokumenata. Besplatna analiza.",
  alternates: { canonical: "https://briksygroup.com/ai" },
  openGraph: {
    title: "AI u poslovanju — Implementacija i automatizacija",
    description: "AI rješenja koja automatiziraju repetitivne zadatke i ubrzavaju obradu dokumenata u vašoj kompaniji.",
    url: "https://briksygroup.com/ai",
  },
};

export default function AIPage() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "BreadcrumbList",
        itemListElement: [
          { "@type": "ListItem", position: 1, name: "Početna", item: "https://briksygroup.com" },
          { "@type": "ListItem", position: 2, name: "Usluge", item: "https://briksygroup.com/usluge" },
          { "@type": "ListItem", position: 3, name: "AI u poslovanju", item: "https://briksygroup.com/ai" },
        ],
      },
      {
        "@type": "Service",
        name: "AI implementacija u poslovanju",
        provider: { "@id": "https://briksygroup.com/#organization" },
        description: "Implementacija umjetne inteligencije u poslovne procese — automatizacija repetitivnih zadataka, pametna analitika, obrada dokumenata.",
        areaServed: { "@type": "Country", name: "Croatia" },
        serviceType: "AI implementacija",
      },
    ],
  };

  const useCases = [
    {
      title: "Automatizacija zadataka",
      desc: "Unos podataka, kategorizacija dokumenata, kreiranje izvještaja — AI preuzima poslove koji oduzimaju sate dnevno.",
      icon: (
        <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
        </svg>
      ),
    },
    {
      title: "Pametna analitika",
      desc: "AI prepoznaje obrasce u vašim podacima, predviđa kašnjenja i identificira rizične troškove.",
      icon: (
        <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
        </svg>
      ),
    },
    {
      title: "Obrada dokumenata",
      desc: "AI čita ugovore, kategorizira poštu po prioritetu i generira sažetke — posao od sati završava u sekundama.",
      icon: (
        <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
        </svg>
      ),
    },
    {
      title: "Integracija u postojeće sustave",
      desc: "Ne trebate mijenjati način rada. AI se uklapa u vaše postojeće alate — bez nove krivulje učenja.",
      icon: (
        <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M11 4a2 2 0 114 0v1a1 1 0 001 1h3a1 1 0 011 1v3a1 1 0 01-1 1h-1a2 2 0 100 4h1a1 1 0 011 1v3a1 1 0 01-1 1h-3a1 1 0 01-1-1v-1a2 2 0 10-4 0v1a1 1 0 01-1 1H7a1 1 0 01-1-1v-3a1 1 0 00-1-1H4a2 2 0 110-4h1a1 1 0 001-1V7a1 1 0 011-1h3a1 1 0 001-1V4z" />
        </svg>
      ),
    },
  ];

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />

      {/* Hero */}
      <section className="border-b border-border bg-slate-50 pt-16">
        <div className="mx-auto max-w-7xl px-6 py-14 md:py-20">
          <div className="mx-auto max-w-3xl text-center">
            <p className="text-sm font-medium uppercase tracking-widest text-accent">
              Umjetna inteligencija u poslovanju
            </p>
            <h1 className="mt-3 text-3xl font-bold tracking-tight md:text-5xl">
              Gdje AI stvarno štedi vrijeme
              — i gdje samo baca novac.
            </h1>
            <p className="mt-5 text-lg leading-relaxed text-muted">
              Pomažemo vam identificirati gdje AI donosi stvarnu vrijednost
              i implementiramo ga na način koji vaši zaposlenici zaista mogu koristiti.
            </p>
          </div>

          <AnimateOnScroll>
            <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
              {useCases.map((item) => (
                <div key={item.title} className="group rounded-2xl border border-border bg-white p-6 transition-all duration-300 hover:-translate-y-1 hover:border-accent/30 hover:shadow-lg">
                  <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-accent/10 text-accent transition-colors group-hover:bg-accent group-hover:text-white">
                    {item.icon}
                  </div>
                  <h3 className="mt-4 font-semibold">{item.title}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-muted">{item.desc}</p>
                </div>
              ))}
            </div>
          </AnimateOnScroll>
        </div>
      </section>

      {/* Kako u praksi */}
      <section className="border-b border-border bg-white py-14 md:py-20">
        <div className="mx-auto max-w-7xl px-6">
          <div className="grid gap-10 lg:grid-cols-2 lg:items-center">
            <div>
              <h2 className="text-2xl font-bold tracking-tight md:text-3xl">
                Kako izgleda AI implementacija u praksi?
              </h2>
              <p className="mt-4 leading-relaxed text-muted">
                Počinjemo s identificiranjem najrepetitivnijih procesa. Zatim
                postavljamo AI rješenja koja se uklapaju u vaš postojeći tok rada.
                Svaka implementacija uključuje obuku tima i mjerenje rezultata.
              </p>
              <p className="mt-3 leading-relaxed text-muted">
                AI nije čarobni štapić — ali na pravom mjestu drastično smanjuje
                ručni rad i eliminira ponavljajuće greške.
              </p>
            </div>
            <AnimateOnScroll>
              <div className="grid grid-cols-2 gap-4">
                {[
                  { n: "AI", d: "Analiza podataka i odluke" },
                  { n: "NLP", d: "Obrada dokumenata i teksta" },
                  { n: "OCR", d: "Digitalizacija papira" },
                  { n: "24/7", d: "Sustavi rade non-stop" },
                ].map((s) => (
                  <div key={s.n} className="rounded-xl border border-border p-5 text-center transition-all duration-200 hover:-translate-y-1 hover:shadow-md">
                    <div className="text-2xl font-bold text-accent">{s.n}</div>
                    <div className="mt-1 text-xs text-muted">{s.d}</div>
                  </div>
                ))}
              </div>
            </AnimateOnScroll>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="bg-slate-50 py-14 md:py-20">
        <div className="mx-auto max-w-7xl px-6 text-center">
          <h2 className="text-3xl font-bold tracking-tight md:text-4xl">
            Spremni za AI u vašem poslovanju?
          </h2>
          <p className="mx-auto mt-3 max-w-xl text-lg text-muted">
            Besplatna analiza — identificiramo gdje AI donosi najveću vrijednost.
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
