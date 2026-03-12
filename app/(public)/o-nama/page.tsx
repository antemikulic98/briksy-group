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
      <div className="mx-auto max-w-7xl px-6 py-20 md:py-28">
        <div className="grid gap-16 lg:grid-cols-2">
          <div>
            <p className="text-sm font-medium uppercase tracking-widest text-accent">
              Naš pristup
            </p>
            <h1 className="mt-3 text-4xl font-bold leading-tight tracking-tight md:text-5xl">
              Dolazimo u vašu kompaniju i učimo
              <br />
              kako zaista radite.
            </h1>
            <p className="mt-6 text-lg leading-relaxed text-muted">
              Većina IT kompanija radi ovako: pošaljete im zahtjev, oni vam
              pošalju ponudu, naprave softver i predaju vam ključeve. Mi radimo
              potpuno drugačije — jer znamo da taj pristup ne funkcionira.
              Softver koji nastaje bez razumijevanja vašeg svakodnevnog rada
              gotovo uvijek završi kao još jedan nekorišten alat.
            </p>
          </div>
          <div className="relative min-h-[300px] overflow-hidden rounded-2xl lg:min-h-[400px]">
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
  return (
    <section className="border-b border-border bg-white py-20 md:py-28">
      <div className="mx-auto max-w-7xl px-6">
        <div className="max-w-2xl">
          <p className="text-sm font-medium uppercase tracking-widest text-accent">
            Naš proces
          </p>
          <h2 className="mt-3 text-3xl font-bold tracking-tight md:text-4xl">
            Četiri faze koje vode do rezultata.
          </h2>
          <p className="mt-4 text-lg text-muted">
            Svaka faza ima jasan cilj i mjerljive rezultate. Vi odobravate svaki
            korak prije nego što krenemo dalje.
          </p>
        </div>

        <AnimateOnScroll>
          <div className="mt-12 grid gap-px overflow-hidden rounded-lg border border-border bg-border md:grid-cols-4">
            <div className="bg-white p-8">
              <div className="text-sm font-bold text-accent">Faza 1</div>
            <h3 className="mt-2 text-lg font-semibold">Dolazak u kompaniju</h3>
            <p className="mt-2 text-sm leading-relaxed text-muted">
              Naš tim provodi dane u vašoj kompaniji. Upoznajemo vaše zaposlenike,
              procese, alate, probleme. Gledamo kako teče radni dan — od prvog
              maila do zadnjeg potpisa. Ovo nije formalna analiza s upitnicima —
              to je stvarno upoznavanje vašeg poslovanja iznutra.
            </p>
            <p className="mt-4 text-xs text-muted">
              Trajanje ovisi o veličini kompanije
            </p>
          </div>

          <div className="bg-white p-8">
            <div className="text-sm font-bold text-accent">Faza 2</div>
            <h3 className="mt-2 text-lg font-semibold">Dijagnoza i plan</h3>
            <p className="mt-2 text-sm leading-relaxed text-muted">
              Na temelju onoga što smo vidjeli i naučili, kreiramo detaljnu
              dijagnozu: gdje gubite vrijeme, gdje gubite novac, i što se može
              automatizirati. Predlažemo konkretne korake s jasnim prioritetima,
              rokovima i cijenama. Vi odobravate svaki korak.
            </p>
            <p className="mt-4 text-xs text-muted">
              Trajanje ovisi o veličini kompanije
            </p>
          </div>

          <div className="bg-white p-8">
            <div className="text-sm font-bold text-accent">Faza 3</div>
            <h3 className="mt-2 text-lg font-semibold">Implementacija</h3>
            <p className="mt-2 text-sm leading-relaxed text-muted">
              Postavljamo sustave, migriramo podatke i obučavamo vaš tim. Radimo
              u fazama da ne zaustavljamo vaše svakodnevno poslovanje. Svaki
              tjedan dobivate izvještaj o napretku. Nema iznenađenja.
            </p>
            <p className="mt-4 text-xs text-muted">
              Trajanje ovisi o veličini kompanije
            </p>
          </div>

          <div className="bg-white p-8">
            <div className="text-sm font-bold text-accent">Faza 4</div>
            <h3 className="mt-2 text-lg font-semibold">
              Podrška i optimizacija
            </h3>
            <p className="mt-2 text-sm leading-relaxed text-muted">
              Ne nestajemo nakon implementacije. Vraćamo se u kompaniju, pratimo
              kako se sustav koristi, slušamo feedback vaših zaposlenika i
              kontinuirano poboljšavamo. Digitalizacija je proces, ne jednokratan
              projekt.
            </p>
            <p className="mt-4 text-xs text-muted">Kontinuirana podrška</p>
          </div>
          </div>
        </AnimateOnScroll>
      </div>
    </section>
  );
}

function InfoBox() {
  return (
    <section className="border-b border-border bg-slate-50 py-20 md:py-28">
      <div className="mx-auto max-w-7xl px-6">
        <AnimateOnScroll>
          <div className="rounded-lg border border-border bg-white p-8">
            <div className="grid gap-8 lg:grid-cols-3">
              <div>
                <h3 className="font-semibold">
                  Zašto je dolazak u kompaniju bitan?
              </h3>
              <p className="mt-2 text-sm leading-relaxed text-muted">
                Jer ono što vlasnik misli da se događa u kompaniji i ono što se
                zaista događa — često su dvije potpuno različite stvari. Mi ne
                pitamo &ldquo;kako radite&rdquo; — mi gledamo kako radite. I tu
                je razlika između digitalizacije koja funkcionira i one koja
                završi kao još jedan nekorišten alat.
              </p>
            </div>
            <div>
              <h3 className="font-semibold">Razumijemo vašu industriju</h3>
              <p className="mt-2 text-sm leading-relaxed text-muted">
                Naši ljudi nisu samo programeri. U timu su poslovni konzultanti
                s iskustvom u građevinarstvu, proizvodnji, logistici i uslužnim
                djelatnostima. Govorimo vaš jezik i razumijemo specifičnosti
                vaše branše.
              </p>
            </div>
            <div>
              <h3 className="font-semibold">Bez šablonskih rješenja</h3>
              <p className="mt-2 text-sm leading-relaxed text-muted">
                Svaka kompanija je drugačija. Zato ne dolazimo s gotovim rješenjem
                koje pokušavamo ugurati u vaše poslovanje. Prvo učimo, pa tek
                onda gradimo. To traje malo duže, ali rezultati su nesporedivo
                bolji.
              </p>
            </div>
          </div>
          </div>
        </AnimateOnScroll>
      </div>
    </section>
  );
}

function NaseVrijednosti() {
  const values = [
    {
      title: "Iskrenost iznad svega",
      description:
        "Ako vidimo da vam digitalizacija neće donijeti rezultate — reći ćemo vam. Ne prodajemo rješenja koja vam ne trebaju. Naš posao je da vam pomognemo, ne da vam uzmemo novac.",
    },
    {
      title: "Ljudi, ne samo tehnologija",
      description:
        "Svaka transformacija počinje i završava s ljudima. Zato posvećujemo toliko vremena razumijevanju vaših zaposlenika, njihovih navika i frustracija. Tehnologija je samo alat.",
    },
    {
      title: "Mjerljivi rezultati",
      description:
        "Ne radimo projekte na slijepo. Prije implementacije definiramo jasne metrike uspjeha — koliko vremena štedite, koliko grešaka nestaje, koliki je ROI. I onda mjerimo.",
    },
    {
      title: "Bez tehničkog žargona",
      description:
        "Govorimo vaš jezik. Ne koristimo buzzwordove da bismo zvučali pametno. Objašnjavamo jednostavno što radimo, zašto i kakve rezultate možete očekivati.",
    },
    {
      title: "Odgovornost za rezultat",
      description:
        "Ne predajemo softver i nestajemo. Svaki projekt ima jasno definiran uspjeh i mi stojimo iza njega. Ako nešto ne radi kako treba — popravljamo dok ne bude.",
    },
    {
      title: "Kontinuirani rast zajedno",
      description:
        "Vaša kompanija se mijenja, a sustavi moraju pratiti. Zato ne radimo jednokratne projekte — gradimo partnerstva u kojima sustavi rastu i prilagođavaju se zajedno s vama.",
    },
  ];

  return (
    <section className="border-b border-border bg-white py-20 md:py-28">
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
          <div className="mt-14 grid gap-x-12 gap-y-10 md:grid-cols-2 lg:grid-cols-3">
            {values.map((value) => (
              <div key={value.title}>
                <h3 className="font-semibold">{value.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-muted">
                  {value.description}
                </p>
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
    <section className="bg-slate-50 py-20 md:py-28">
      <div className="mx-auto max-w-7xl px-6">
        <div className="mx-auto max-w-3xl text-center">
          <h2 className="text-3xl font-bold tracking-tight md:text-4xl">
            Spremni za razgovor?
          </h2>
          <p className="mt-4 text-lg leading-relaxed text-muted">
            Javite nam se i dogovorit ćemo besplatnu analizu vašeg poslovanja.
            Bez obveza — dolazimo k vama, upoznajemo vaše ljude i procese, i
            dajemo vam jasnu sliku stanja s preporukama.
          </p>
          <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
            <Link
              href="/kontakt"
              className="inline-flex items-center justify-center rounded-lg bg-accent px-7 py-3.5 text-base font-semibold text-white hover:bg-accent-dark"
            >
              Zakažite besplatni razgovor
            </Link>
            <a
              href="mailto:info@briksygroup.com"
              className="inline-flex items-center justify-center rounded-lg border border-border px-7 py-3.5 text-base font-medium hover:bg-gray-50"
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
        description:
          "Dolazimo u vašu kompaniju, učimo kako zaista radite i tek onda gradimo digitalna rješenja.",
        url: "https://briksygroup.com/o-nama",
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
      <HeroSection />
      <PhaseCards />
      <InfoBox />
      <NaseVrijednosti />
      <CTASection />
    </>
  );
}
