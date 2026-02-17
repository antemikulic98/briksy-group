import Link from "next/link";

export const metadata = {
  title: "Usluge — Analiza, razvoj, AI implementacija i podrška",
  description:
    "Briksy Group nudi kompletne usluge digitalizacije — od besplatne analize poslovanja, razvoja prilagođenih rješenja i AI implementacije do edukacije i kontinuirane podrške.",
};

function Usluge() {
  const services = [
    {
      title: "Analiza i konzalting",
      description:
        "Dolazimo u vašu firmu, upoznajemo vaše ljude i detaljno mapiramo kako radite. Identificiramo uska grla, mjerimo koliko vas koštaju neučinkovitosti, i dajemo vam jasnu sliku stanja. Ovu početnu analizu radimo besplatno.",
      includes: [
        "Fizički dolazak u firmu i praćenje procesa",
        "Mapiranje svih poslovnih tokova",
        "Procjena troškova nedigitalizacije",
        "Detaljan izvještaj s preporukama",
      ],
    },
    {
      title: "Razvoj prilagođenih rješenja",
      description:
        "Svaka firma je drugačija. Ako standardni alati ne pokrivaju vaše potrebe, naš tim razvija rješenja šivana po mjeri vašeg poslovanja — od web i mobilnih aplikacija do automatizacija specifičnih procesa.",
      includes: [
        "Web i mobilne aplikacije po mjeri",
        "Automatizacija poslovnih procesa",
        "Integracija postojećih sustava",
        "API razvoj i povezivanje servisa",
      ],
    },
    {
      title: "AI implementacija",
      description:
        "Identificiramo gdje umjetna inteligencija može donijeti stvarnu vrijednost u vašem poslovanju i implementiramo AI rješenja koja se prirodno uklapaju u vaš postojeći način rada.",
      includes: [
        "Analiza procesa pogodnih za AI automatizaciju",
        "Implementacija AI za obradu dokumenata",
        "Prediktivna analitika i izvještavanje",
        "Obuka tima za korištenje AI alata",
      ],
    },
    {
      title: "Edukacija i podrška",
      description:
        "Tehnologija je beskorisna ako je ljudi ne koriste. Posvećujemo posebnu pažnju edukaciji vašeg tima — ne samo kako koristiti alate, nego zašto im to olakšava svakodnevni posao. Podrška ne prestaje nakon implementacije.",
      includes: [
        "Obuka za sve razine korisnika",
        "Video materijali i dokumentacija",
        "Dedicirani account manager",
        "Kontinuirana tehnička podrška",
      ],
    },
  ];

  return (
    <section className="border-b border-border bg-white py-20 md:py-28">
      <div className="mx-auto max-w-7xl px-6">
        <div className="max-w-3xl">
          <p className="text-sm font-medium uppercase tracking-widest text-accent">
            Naše usluge
          </p>
          <h2 className="mt-3 text-3xl font-bold tracking-tight md:text-4xl">
            Od analize do potpune transformacije — pokrivamo svaki korak.
          </h2>
          <p className="mt-4 text-lg text-muted">
            Ne prodajemo kutije sa softverom. Radimo s vama od prvog posjeta vašoj
            firmi do trenutka kada vaš tim kaže: &ldquo;Kako smo uopće radili bez
            ovoga?&rdquo;
          </p>
        </div>

        <div className="mt-14 grid gap-8 md:grid-cols-2">
          {services.map((service) => (
            <div
              key={service.title}
              className="rounded-lg border border-border p-8 transition-all duration-200 hover:-translate-y-1 hover:border-accent/30 hover:shadow-md"
            >
              <h3 className="text-xl font-semibold">{service.title}</h3>
              <p className="mt-3 leading-relaxed text-muted">
                {service.description}
              </p>
              <ul className="mt-5 space-y-2">
                {service.includes.map((item) => (
                  <li key={item} className="flex items-start gap-2 text-sm">
                    <svg
                      className="mt-0.5 h-4 w-4 shrink-0 text-accent"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M5 13l4 4L19 7"
                      />
                    </svg>
                    <span className="text-muted">{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function ZastoMi() {
  const reasons = [
    {
      title: "Dolazimo k vama i učimo vaš posao",
      description:
        "Ne radimo na daljinu od prvog dana. Fizički dolazimo u vašu firmu, sjedimo s vašim zaposlenicima, gledamo kako rade. Tek kad razumijemo vaš posao iznutra — predlažemo rješenja.",
    },
    {
      title: "Radimo s vama, ne za vas",
      description:
        "Uključujemo vaš tim u svaki korak jer oni najbolje znaju kako posao zaista funkcionira. Mi donosimo tehnologiju i AI, vi donosite znanje o industriji. Zajedno gradimo nešto što ima smisla.",
    },
    {
      title: "Dokazani rezultati u praksi",
      description:
        "Više od 50 kompanija je prošlo kroz naš proces. Prosječno smanjenje operativnih troškova je 40%, ubrzanje procesa 3x. Realni podaci, ne marketinški slogani.",
    },
    {
      title: "AI kao alat, ne kao buzzword",
      description:
        "Implementiramo umjetnu inteligenciju tamo gdje donosi stvarnu vrijednost — ne da bismo bili moderni, nego da bismo vam uštedjeli vrijeme i novac na konkretnim zadacima.",
    },
    {
      title: "Fer i transparentne cijene",
      description:
        "Nema skrivenih troškova. Prije početka točno znate koliko košta svaka faza. Plaćate samo za ono što je dogovoreno. Početna analiza je besplatna.",
    },
    {
      title: "Dugoročno partnerstvo",
      description:
        "Ne radimo projekte i odlazimo. Ostajemo s vama kao tehnološki partner — pratimo razvoj firme, predlažemo poboljšanja, osiguravamo da sustavi rastu zajedno s vama.",
    },
  ];

  return (
    <section className="border-b border-border bg-blue-50/50 py-20 md:py-28">
      <div className="mx-auto max-w-7xl px-6">
        <div className="max-w-3xl">
          <p className="text-sm font-medium uppercase tracking-widest text-accent">
            Zašto Briksy Group
          </p>
          <h2 className="mt-3 text-3xl font-bold tracking-tight md:text-4xl">
            Što nas razlikuje od svih ostalih koji obećavaju digitalizaciju.
          </h2>
        </div>

        <div className="mt-14 grid gap-x-12 gap-y-10 md:grid-cols-2 lg:grid-cols-3">
          {reasons.map((reason) => (
            <div key={reason.title}>
              <h3 className="font-semibold">{reason.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-muted">
                {reason.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function FAQ() {
  const questions = [
    {
      q: "Koliko košta digitalizacija?",
      a: "Ovisi o veličini firme i opsegu transformacije. Početna analiza je besplatna — dolazimo k vama, upoznajemo vaše poslovanje i dajemo vam procjenu. Za većinu srednje velikih firmi, investicija se vrati u prvih 6-12 mjeseci kroz uštede.",
    },
    {
      q: "Koliko traje cijeli proces?",
      a: "Tipična digitalizacija traje 2-3 mjeseca od prvog posjeta do punog pokretanja. Radimo u fazama, pa koristi počinjete vidjeti već nakon nekoliko tjedana. Kompleksnije transformacije s AI implementacijom mogu trajati 4-6 mjeseci.",
    },
    {
      q: "Hoće li moji zaposlenici prihvatiti promjenu?",
      a: "Upravo zato dolazimo u vašu firmu i uključujemo zaposlenike od prvog dana. Iskustvo nam govori da nakon 2-3 tjedna korištenja, ljudi ne žele nazad na stari način. Ključ je da im pokažemo kako im alat olakšava posao, a ne komplicira.",
    },
    {
      q: "Što ako već imamo neke digitalne alate?",
      a: "Odlično — to znači da imate osnovu. Analiziramo alate koje koristite, procjenjujemo što radi a što ne, i predlažemo integracije ili zamjene tamo gdje ima smisla. Ne bacamo sve — gradimo na onome što funkcionira.",
    },
    {
      q: "Je li Briksy samo za građevinarstvo?",
      a: "Briksy platforma je dizajnirana specifično za građevinarstvo — to je prva aplikacija koja spaja financije, realizaciju i robno-materijalno. Ali Briksy Group kao kompanija digitalizira firme iz svih industrija koristeći vlastite i provjerene alate trećih strana.",
    },
    {
      q: "Kako funkcionira AI implementacija?",
      a: "Počinjemo s identificiranjem procesa koji su najrepetitivniji i gdje se gubi najviše vremena. Zatim postavljamo AI rješenja koja se uklapaju u vaš postojeći tok rada. Svaka implementacija uključuje obuku vašeg tima i mjerenje rezultata.",
    },
  ];

  return (
    <section className="border-b border-border bg-white py-20 md:py-28">
      <div className="mx-auto max-w-7xl px-6">
        <div className="grid gap-16 lg:grid-cols-5">
          <div className="lg:col-span-2">
            <p className="text-sm font-medium uppercase tracking-widest text-accent">
              Česta pitanja
            </p>
            <h2 className="mt-3 text-3xl font-bold tracking-tight md:text-4xl">
              Sve što želite znati prije nego što nas kontaktirate.
            </h2>
            <p className="mt-4 leading-relaxed text-muted">
              Ako ne pronađete odgovor na vaše pitanje, javite nam se direktno.
              Uvijek odgovaramo u roku od 24 sata.
            </p>
          </div>

          <div className="divide-y divide-border lg:col-span-3">
            {questions.map((item) => (
              <div key={item.q} className="py-6 first:pt-0 last:pb-0">
                <h3 className="font-semibold">{item.q}</h3>
                <p className="mt-2 leading-relaxed text-muted">{item.a}</p>
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
    <section className="bg-slate-50 py-20 md:py-28">
      <div className="mx-auto max-w-7xl px-6 text-center">
        <h2 className="text-3xl font-bold tracking-tight md:text-4xl">
          Spremni za sljedeći korak?
        </h2>
        <p className="mx-auto mt-4 max-w-2xl text-lg leading-relaxed text-muted">
          Javite nam se i zakažite besplatnu analizu vašeg poslovanja. Dolazimo k
          vama, upoznajemo vaš posao i dajemo vam konkretan plan — bez obveza.
        </p>
        <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
          <Link
            href="/kontakt"
            className="inline-flex items-center justify-center rounded-lg bg-accent px-7 py-3.5 text-base font-semibold text-white hover:bg-accent-dark"
          >
            Zakažite besplatni razgovor
          </Link>
          <Link
            href="/o-nama"
            className="inline-flex items-center justify-center rounded-lg border border-border px-7 py-3.5 text-base font-medium hover:bg-gray-50"
          >
            Saznajte više o nama
          </Link>
        </div>
      </div>
    </section>
  );
}

export default function UslugePage() {
  return (
    <>
      <Usluge />
      <ZastoMi />
      <FAQ />
      <CTABanner />
    </>
  );
}
