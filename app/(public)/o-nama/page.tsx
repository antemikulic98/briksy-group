import Image from "next/image";
import Link from "next/link";
import AnimateOnScroll from "@/app/components/animate-on-scroll";

export const metadata = {
  title: "O nama — Naš pristup digitalizaciji poslovanja",
  description:
    "Dolazimo u vašu kompaniju, učimo kako zaista radite i tek onda gradimo digitalna rješenja. Pristup temeljen na razumijevanju vašeg poslovanja iznutra.",
  alternates: { canonical: "https://briksygroup.com/o-nama" },
  openGraph: {
    title: "O nama — Naš pristup digitalizaciji poslovanja",
    description: "Dolazimo u vašu kompaniju, učimo kako zaista radite i tek onda gradimo digitalna rješenja.",
    url: "https://briksygroup.com/o-nama",
  },
};

function HeroSection() {
  return (
    <section className="border-b border-border bg-slate-50 pt-16">
      <div className="mx-auto max-w-7xl px-6 py-14 md:py-20">
        <div className="grid gap-12 lg:grid-cols-2 lg:items-center">
          <div>
            <p className="text-sm font-medium uppercase tracking-widest text-accent">
              Naš pristup
            </p>
            <h1 className="mt-3 text-4xl font-bold leading-tight tracking-tight md:text-5xl">
              Prvo učimo kako radite.
              <br />
              Onda gradimo.
            </h1>
            <p className="mt-5 text-lg leading-relaxed text-muted">
              Softver koji nastaje bez razumijevanja vašeg svakodnevnog rada
              gotovo uvijek završi kao nekorišten alat. Zato dolazimo k vama,
              upoznajemo ljude i procese — i tek onda predlažemo rješenja.
            </p>
          </div>
          <div className="relative min-h-[280px] overflow-hidden rounded-2xl lg:min-h-[360px]">
            <Image
              src="https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=900&q=80"
              alt="Tim stručnjaka zajedno analizira poslovne procese"
              fill
              className="object-cover"
              priority
            />
            <div className="absolute inset-0 rounded-2xl ring-1 ring-inset ring-black/5" />
          </div>
        </div>
      </div>
    </section>
  );
}

function PhaseCards() {
  const phases = [
    {
      num: "01",
      title: "Dolazak u kompaniju",
      desc: "Upoznajemo vaše zaposlenike, procese i alate. Gledamo kako teče radni dan — od prvog maila do zadnjeg potpisa.",
    },
    {
      num: "02",
      title: "Dijagnoza i plan",
      desc: "Kreiramo detaljnu dijagnozu: gdje gubite vrijeme, što se može automatizirati. Predlažemo korake s jasnim prioritetima i cijenama.",
    },
    {
      num: "03",
      title: "Implementacija",
      desc: "Postavljamo sustave i obučavamo vaš tim. Radimo u fazama da ne zaustavljamo vaše poslovanje. Svaki tjedan dobivate izvještaj.",
    },
    {
      num: "04",
      title: "Podrška i optimizacija",
      desc: "Pratimo kako se sustav koristi, slušamo feedback i kontinuirano poboljšavamo. Digitalizacija je proces, ne jednokratan projekt.",
    },
  ];

  return (
    <section className="border-b border-border bg-white py-14 md:py-20">
      <div className="mx-auto max-w-7xl px-6">
        <div className="max-w-2xl">
          <p className="text-sm font-medium uppercase tracking-widest text-accent">
            Naš proces
          </p>
          <h2 className="mt-3 text-3xl font-bold tracking-tight md:text-4xl">
            Četiri faze koje vode do rezultata.
          </h2>
        </div>

        <AnimateOnScroll>
          <div className="mt-10 grid gap-px overflow-hidden rounded-lg border border-border bg-border md:grid-cols-4">
            {phases.map((p) => (
              <div key={p.num} className="bg-white p-6">
                <div className="text-sm font-bold text-accent">Faza {p.num}</div>
                <h3 className="mt-2 text-lg font-semibold">{p.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-muted">{p.desc}</p>
              </div>
            ))}
          </div>
        </AnimateOnScroll>
      </div>
    </section>
  );
}

function InfoBox() {
  const items = [
    {
      title: "Zašto dolazimo u kompaniju?",
      desc: "Ono što vlasnik misli da se događa i ono što se zaista događa — često su dvije različite stvari. Mi ne pitamo kako radite — gledamo.",
    },
    {
      title: "Razumijemo vašu industriju",
      desc: "U timu su poslovni konzultanti s iskustvom u građevinarstvu, proizvodnji, logistici i uslužnim djelatnostima. Govorimo vaš jezik.",
    },
    {
      title: "Bez šablonskih rješenja",
      desc: "Ne dolazimo s gotovim rješenjem. Prvo učimo, pa tek onda gradimo. Traje malo duže, ali rezultati su nesporedivo bolji.",
    },
  ];

  return (
    <section className="border-b border-border bg-slate-50 py-14 md:py-20">
      <div className="mx-auto max-w-7xl px-6">
        <AnimateOnScroll>
          <div className="grid gap-6 rounded-lg border border-border bg-white p-6 lg:grid-cols-3 lg:p-8">
            {items.map((item) => (
              <div key={item.title}>
                <h3 className="font-semibold">{item.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-muted">{item.desc}</p>
              </div>
            ))}
          </div>
        </AnimateOnScroll>
      </div>
    </section>
  );
}

function NaseVrijednosti() {
  const values = [
    { title: "Iskrenost iznad svega", desc: "Ako digitalizacija neće donijeti rezultate — reći ćemo vam. Ne prodajemo rješenja koja vam ne trebaju." },
    { title: "Ljudi, ne samo tehnologija", desc: "Svaka transformacija počinje s ljudima. Zato posvećujemo toliko vremena razumijevanju vaših zaposlenika." },
    { title: "Mjerljivi rezultati", desc: "Prije implementacije definiramo jasne metrike uspjeha — koliko vremena štedite, koliki je ROI. I onda mjerimo." },
    { title: "Bez tehničkog žargona", desc: "Govorimo vaš jezik. Objašnjavamo jednostavno što radimo, zašto i kakve rezultate možete očekivati." },
    { title: "Odgovornost za rezultat", desc: "Ne predajemo softver i nestajemo. Ako nešto ne radi kako treba — popravljamo dok ne bude." },
    { title: "Rast zajedno", desc: "Vaša kompanija se mijenja, sustavi moraju pratiti. Ne radimo jednokratne projekte — gradimo partnerstva." },
  ];

  return (
    <section className="border-b border-border bg-white py-14 md:py-20">
      <div className="mx-auto max-w-7xl px-6">
        <div className="max-w-3xl">
          <p className="text-sm font-medium uppercase tracking-widest text-accent">
            Naše vrijednosti
          </p>
          <h2 className="mt-3 text-3xl font-bold tracking-tight md:text-4xl">
            Principi po kojima radimo svaki dan.
          </h2>
        </div>

        <AnimateOnScroll>
          <div className="mt-10 grid gap-x-10 gap-y-8 md:grid-cols-2 lg:grid-cols-3">
            {values.map((v) => (
              <div key={v.title}>
                <h3 className="font-semibold">{v.title}</h3>
                <p className="mt-1.5 text-sm leading-relaxed text-muted">{v.desc}</p>
              </div>
            ))}
          </div>
        </AnimateOnScroll>
      </div>
    </section>
  );
}

function CTASection() {
  return (
    <section className="bg-slate-50 py-14 md:py-20">
      <div className="mx-auto max-w-7xl px-6">
        <div className="mx-auto max-w-3xl text-center">
          <h2 className="text-3xl font-bold tracking-tight md:text-4xl">
            Spremni za razgovor?
          </h2>
          <p className="mt-3 text-lg text-muted">
            Besplatna analiza vašeg poslovanja. Bez obveza.
          </p>
          <div className="mt-6 flex flex-col items-center justify-center gap-3 sm:flex-row">
            <Link
              href="/kontakt"
              className="inline-flex items-center justify-center rounded-xl bg-accent px-7 py-3.5 text-base font-semibold text-white hover:bg-accent-dark"
            >
              Zakažite razgovor
            </Link>
            <a
              href="mailto:info@briksygroup.com"
              className="inline-flex items-center justify-center rounded-xl border border-border px-7 py-3.5 text-base font-medium hover:bg-gray-50"
            >
              info@briksygroup.com
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}

export default function ONamaPage() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "BreadcrumbList",
        itemListElement: [
          { "@type": "ListItem", position: 1, name: "Početna", item: "https://briksygroup.com" },
          { "@type": "ListItem", position: 2, name: "O nama", item: "https://briksygroup.com/o-nama" },
        ],
      },
      {
        "@type": "AboutPage",
        name: "O nama — Briksy Group",
        description: "Dolazimo u vašu kompaniju, učimo kako zaista radite i tek onda gradimo digitalna rješenja.",
        url: "https://briksygroup.com/o-nama",
        mainEntity: { "@type": "Organization", "@id": "https://briksygroup.com/#organization" },
      },
    ],
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <HeroSection />
      <PhaseCards />
      <InfoBox />
      <NaseVrijednosti />
      <CTASection />
    </>
  );
}
