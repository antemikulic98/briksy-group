import Link from "next/link";

export const metadata = {
  title: "O nama — Kako radimo | Briksy Group",
  description:
    "Dolazimo u vašu firmu, učimo kako zaista radite i tek onda gradimo digitalna rješenja. Naš pristup digitalizaciji se temelji na razumijevanju vašeg poslovanja iznutra.",
};

function HeroSection() {
  return (
    <section className="border-b border-border bg-slate-50 pt-20">
      <div className="mx-auto max-w-7xl px-6 py-20 md:py-28">
        <div className="grid gap-16 lg:grid-cols-2">
          <div>
            <p className="text-sm font-medium uppercase tracking-widest text-accent">
              Naš pristup
            </p>
            <h1 className="mt-3 text-4xl font-bold leading-tight tracking-tight md:text-5xl">
              Dolazimo u vašu firmu i učimo
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
          <div className="flex items-center">
            <p className="text-lg leading-relaxed text-muted">
              Naš tim fizički dolazi u vašu firmu. Sjedimo s vašim ljudima,
              gledamo kako rade, postavljamo pitanja, razumijemo frustracije.
              Pratimo tok dokumenta od ulaza do izlaza. Vidimo gdje se gubi
              vrijeme, gdje nastaju greške, gdje se informacije zaglavljuju.
              Tek kada zaista razumijemo vaše poslovanje iz dana u dan — onda
              predlažemo rješenja. To je jedini način da digitalizacija zaista
              funkcionira.
            </p>
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

        <div className="mt-12 grid gap-px overflow-hidden rounded-lg border border-border bg-border md:grid-cols-4">
          <div className="bg-white p-8">
            <div className="text-sm font-bold text-accent">Faza 1</div>
            <h3 className="mt-2 text-lg font-semibold">Dolazak u firmu</h3>
            <p className="mt-2 text-sm leading-relaxed text-muted">
              Naš tim provodi dane u vašoj firmi. Upoznajemo vaše zaposlenike,
              procese, alate, probleme. Gledamo kako teče radni dan — od prvog
              maila do zadnjeg potpisa. Ovo nije formalna analiza s upitnicima —
              to je stvarno upoznavanje vašeg poslovanja iznutra.
            </p>
            <p className="mt-4 text-xs text-muted">
              Trajanje ovisi o veličini firme
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
              Trajanje ovisi o veličini firme
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
              Trajanje ovisi o veličini firme
            </p>
          </div>

          <div className="bg-white p-8">
            <div className="text-sm font-bold text-accent">Faza 4</div>
            <h3 className="mt-2 text-lg font-semibold">
              Podrška i optimizacija
            </h3>
            <p className="mt-2 text-sm leading-relaxed text-muted">
              Ne nestajemo nakon implementacije. Vraćamo se u firmu, pratimo
              kako se sustav koristi, slušamo feedback vaših zaposlenika i
              kontinuirano poboljšavamo. Digitalizacija je proces, ne jednokratan
              projekt.
            </p>
            <p className="mt-4 text-xs text-muted">Kontinuirana podrška</p>
          </div>
        </div>
      </div>
    </section>
  );
}

function InfoBox() {
  return (
    <section className="border-b border-border bg-slate-50 py-20 md:py-28">
      <div className="mx-auto max-w-7xl px-6">
        <div className="rounded-lg border border-border bg-white p-8">
          <div className="grid gap-8 lg:grid-cols-3">
            <div>
              <h3 className="font-semibold">
                Zašto je dolazak u firmu bitan?
              </h3>
              <p className="mt-2 text-sm leading-relaxed text-muted">
                Jer ono što vlasnik misli da se događa u firmi i ono što se
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
                Svaka firma je drugačija. Zato ne dolazimo s gotovim rješenjem
                koje pokušavamo ugurati u vaše poslovanje. Prvo učimo, pa tek
                onda gradimo. To traje malo duže, ali rezultati su nesporedivo
                bolji.
              </p>
            </div>
          </div>
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
    <section className="border-b border-border bg-white py-20 md:py-28">
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
              href="mailto:info@briksy.com"
              className="inline-flex items-center justify-center rounded-lg border border-border px-7 py-3.5 text-base font-medium hover:bg-gray-50"
            >
              info@briksy.com
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}

export default function ONamaPage() {
  return (
    <>
      <HeroSection />
      <PhaseCards />
      <InfoBox />
      <ZastoMi />
      <CTASection />
    </>
  );
}
