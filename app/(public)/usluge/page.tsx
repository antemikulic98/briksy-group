import Link from "next/link";
import AnimateOnScroll from "@/app/components/animate-on-scroll";

export const metadata = {
  title: "Usluge — Analiza, razvoj, AI i podrška",
  description:
    "Briksy Group nudi kompletne usluge digitalizacije — od besplatne analize poslovanja, razvoja prilagođenih rješenja i AI implementacije do edukacije i kontinuirane podrške.",
  alternates: { canonical: "https://briksygroup.com/usluge" },
  openGraph: {
    title: "Usluge — Analiza, razvoj, AI i podrška",
    description: "Kompletne usluge digitalizacije — od besplatne analize do implementacije i podrške.",
    url: "https://briksygroup.com/usluge",
  },
};

function Usluge() {
  const services = [
    {
      title: "Analiza i konzalting",
      description: "Dolazimo u vašu kompaniju, mapiramo procese i identificiramo uska grla. Početna analiza je besplatna.",
      includes: ["Fizički dolazak i praćenje procesa", "Mapiranje poslovnih tokova", "Procjena troškova nedigitalizacije", "Izvještaj s preporukama"],
    },
    {
      title: "Razvoj prilagođenih rješenja",
      description: "Web i mobilne aplikacije šivane po mjeri — od automatizacija do kompletnih sustava.",
      includes: ["Web i mobilne aplikacije po mjeri", "Automatizacija poslovnih procesa", "Integracija postojećih sustava", "API razvoj i povezivanje servisa"],
    },
    {
      title: "AI implementacija",
      description: "Identificiramo gdje AI donosi stvarnu vrijednost i implementiramo ga u vaš postojeći način rada.",
      includes: ["Analiza procesa za AI automatizaciju", "Obrada dokumenata s AI", "Prediktivna analitika", "Obuka tima za AI alate"],
    },
    {
      title: "Edukacija i podrška",
      description: "Obučavamo vaš tim i ostajemo kao dugoročni partner. Podrška ne prestaje nakon implementacije.",
      includes: ["Obuka za sve razine korisnika", "Video materijali i dokumentacija", "Dedicirani account manager", "Kontinuirana tehnička podrška"],
    },
  ];

  return (
    <section className="border-b border-border bg-white pt-36 pb-14 md:pt-44 md:pb-20">
      <div className="mx-auto max-w-7xl px-6">
        <div className="max-w-3xl">
          <p className="text-sm font-medium uppercase tracking-widest text-accent">
            Naše usluge
          </p>
          <h1 className="mt-3 text-3xl font-bold tracking-tight md:text-4xl">
            Od analize do potpune transformacije.
          </h1>
          <p className="mt-3 text-lg text-muted">
            Radimo s vama od prvog posjeta do trenutka kada vaš tim kaže:
            "Kako smo uopće radili bez ovoga?"
          </p>
        </div>

        <AnimateOnScroll>
          <div className="mt-10 grid gap-6 md:grid-cols-2">
            {services.map((service) => (
              <div key={service.title} className="rounded-xl border border-border p-6 transition-all duration-200 hover:-translate-y-1 hover:border-accent/30 hover:shadow-md">
                <h3 className="text-lg font-semibold">{service.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-muted">{service.description}</p>
                <ul className="mt-4 space-y-1.5">
                  {service.includes.map((item) => (
                    <li key={item} className="flex items-start gap-2 text-sm">
                      <svg className="mt-0.5 h-4 w-4 shrink-0 text-accent" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                      <span className="text-muted">{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </AnimateOnScroll>
      </div>
    </section>
  );
}

function ZastoMi() {
  const reasons = [
    { title: "Dolazimo k vama", desc: "Fizički dolazimo, sjedimo s vašim zaposlenicima, gledamo kako rade." },
    { title: "Radimo s vama, ne za vas", desc: "Vi donosite znanje o industriji, mi tehnologiju. Zajedno gradimo." },
    { title: "Mjerljivi rezultati", desc: "Svaki projekt počinje jasnim ciljevima i metrikama uspjeha." },
    { title: "AI gdje ima smisla", desc: "Implementiramo AI tamo gdje donosi stvarnu vrijednost, ne kao buzzword." },
    { title: "Transparentne cijene", desc: "Nema skrivenih troškova. Početna analiza je besplatna." },
    { title: "Dugoročno partnerstvo", desc: "Ostajemo s vama — pratimo razvoj i predlažemo poboljšanja." },
  ];

  return (
    <section className="border-b border-border bg-blue-50/50 py-14 md:py-20">
      <div className="mx-auto max-w-7xl px-6">
        <div className="max-w-3xl">
          <p className="text-sm font-medium uppercase tracking-widest text-accent">
            Zašto Briksy Group
          </p>
          <h2 className="mt-3 text-3xl font-bold tracking-tight md:text-4xl">
            Što nas razlikuje
          </h2>
        </div>

        <AnimateOnScroll>
          <div className="mt-10 grid gap-x-10 gap-y-6 md:grid-cols-2 lg:grid-cols-3">
            {reasons.map((r) => (
              <div key={r.title}>
                <h3 className="font-semibold">{r.title}</h3>
                <p className="mt-1 text-sm leading-relaxed text-muted">{r.desc}</p>
              </div>
            ))}
          </div>
        </AnimateOnScroll>
      </div>
    </section>
  );
}

function FAQ() {
  const questions = [
    { q: "Koliko košta digitalizacija?", a: "Ovisi o opsegu. Početna analiza je besplatna. Većina klijenata vrati investiciju u 6-12 mjeseci." },
    { q: "Koliko traje cijeli proces?", a: "Tipično 2-3 mjeseca. Radimo u fazama, koristi vidite već nakon nekoliko tjedana." },
    { q: "Hoće li zaposlenici prihvatiti promjenu?", a: "Nakon 2-3 tjedna ne žele nazad. Ključ je pokazati im kako alat olakšava posao." },
    { q: "Što ako već imamo neke alate?", a: "Analiziramo što radi, predlažemo integracije ili zamjene. Ne bacamo sve — gradimo na onome što funkcionira." },
    { q: "Je li Briksy samo za građevinarstvo?", a: "Briksy platforma da. Ali Briksy Group digitalizira kompanije iz svih industrija." },
    { q: "Kako funkcionira AI implementacija?", a: "Identificiramo najrepetitivnije procese, postavljamo AI rješenja u vaš tok rada i obučavamo tim." },
  ];

  return (
    <section className="border-b border-border bg-white py-14 md:py-20">
      <div className="mx-auto max-w-7xl px-6">
        <div className="grid gap-12 lg:grid-cols-5">
          <div className="lg:col-span-2">
            <p className="text-sm font-medium uppercase tracking-widest text-accent">
              Česta pitanja
            </p>
            <h2 className="mt-3 text-3xl font-bold tracking-tight md:text-4xl">
              Sve što želite znati.
            </h2>
            <p className="mt-3 text-muted">
              Nema odgovora? Javite nam se — odgovaramo u roku od 24 sata.
            </p>
          </div>

          <div className="divide-y divide-border lg:col-span-3">
            {questions.map((item) => (
              <div key={item.q} className="py-5 first:pt-0 last:pb-0">
                <h3 className="font-semibold">{item.q}</h3>
                <p className="mt-1.5 text-sm leading-relaxed text-muted">{item.a}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

function CTABanner() {
  return (
    <section className="bg-slate-50 py-14 md:py-20">
      <div className="mx-auto max-w-7xl px-6 text-center">
        <h2 className="text-3xl font-bold tracking-tight md:text-4xl">
          Spremni za sljedeći korak?
        </h2>
        <p className="mx-auto mt-3 max-w-xl text-lg text-muted">
          Besplatna analiza vašeg poslovanja. Bez obveza.
        </p>
        <div className="mt-6 flex flex-col items-center justify-center gap-3 sm:flex-row">
          <Link href="/kontakt" className="inline-flex items-center justify-center rounded-xl bg-accent px-7 py-3.5 text-base font-semibold text-white hover:bg-accent-dark">
            Zakažite razgovor
          </Link>
          <Link href="/o-nama" className="inline-flex items-center justify-center rounded-xl border border-border px-7 py-3.5 text-base font-medium hover:bg-gray-50">
            Saznajte više o nama
          </Link>
        </div>
      </div>
    </section>
  );
}

export default function UslugePage() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "BreadcrumbList",
        itemListElement: [
          { "@type": "ListItem", position: 1, name: "Početna", item: "https://briksygroup.com" },
          { "@type": "ListItem", position: 2, name: "Usluge", item: "https://briksygroup.com/usluge" },
        ],
      },
      {
        "@type": "Service",
        name: "Digitalizacija poslovanja",
        provider: { "@id": "https://briksygroup.com/#organization" },
        description: "Kompletna digitalizacija poslovnih procesa — od analize i konzaltinga do implementacije softvera i AI rješenja.",
        areaServed: { "@type": "Country", name: "Croatia" },
        serviceType: "Digitalna transformacija",
      },
      {
        "@type": "FAQPage",
        mainEntity: [
          { "@type": "Question", name: "Koliko košta digitalizacija?", acceptedAnswer: { "@type": "Answer", text: "Ovisi o opsegu. Početna analiza je besplatna. Većina klijenata vrati investiciju u 6-12 mjeseci." } },
          { "@type": "Question", name: "Koliko traje cijeli proces?", acceptedAnswer: { "@type": "Answer", text: "Tipično 2-3 mjeseca. Radimo u fazama, koristi vidite već nakon nekoliko tjedana." } },
          { "@type": "Question", name: "Hoće li zaposlenici prihvatiti promjenu?", acceptedAnswer: { "@type": "Answer", text: "Nakon 2-3 tjedna ne žele nazad. Ključ je pokazati im kako alat olakšava posao." } },
          { "@type": "Question", name: "Što ako već imamo neke alate?", acceptedAnswer: { "@type": "Answer", text: "Analiziramo što radi, predlažemo integracije ili zamjene. Gradimo na onome što funkcionira." } },
          { "@type": "Question", name: "Je li Briksy samo za građevinarstvo?", acceptedAnswer: { "@type": "Answer", text: "Briksy platforma da. Ali Briksy Group digitalizira kompanije iz svih industrija." } },
          { "@type": "Question", name: "Kako funkcionira AI implementacija?", acceptedAnswer: { "@type": "Answer", text: "Identificiramo najrepetitivnije procese, postavljamo AI rješenja u vaš tok rada i obučavamo tim." } },
        ],
      },
    ],
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <Usluge />
      <ZastoMi />
      <FAQ />
      <CTABanner />
    </>
  );
}
