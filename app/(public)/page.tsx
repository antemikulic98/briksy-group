import Link from "next/link";
import ContactForm from "@/app/components/contact-form";

function Hero() {
  return (
    <section className="border-b border-border bg-slate-50 pt-20">
      <div className="mx-auto max-w-7xl px-6 py-20 md:py-28">
        <div className="grid gap-16 lg:grid-cols-2 lg:items-center">
          <div>
            <p className="mb-4 text-sm font-medium uppercase tracking-widest text-accent">
              Briksy Group — partner za digitalnu transformaciju
            </p>

            <h1 className="text-4xl font-bold leading-tight tracking-tight md:text-6xl">
              Digitaliziramo kompanije
              <br />
              koje žele rasti.
            </h1>

            <p className="mt-6 text-lg leading-relaxed text-muted">
              Ne radimo digitalizaciju iz ureda. Dolazimo k vama, učimo kako vaša
              firma diše iz dana u dan, i tek onda gradimo sustave koji zaista
              rješavaju vaše probleme. Rezultat? Manje ručnog rada, manje grešaka,
              više vremena za ono što zaista pokreće vaš posao.
            </p>

            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
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
                Kako to radimo?
              </Link>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-5">
            <div className="rounded-lg bg-white p-6 shadow-sm transition-all duration-200 hover:-translate-y-1 hover:shadow-md">
              <div className="text-3xl font-bold text-accent">50+</div>
              <div className="mt-1 text-sm text-muted">
                kompanija kojima smo pomogli transformirati poslovanje
              </div>
            </div>
            <div className="rounded-lg bg-white p-6 shadow-sm transition-all duration-200 hover:-translate-y-1 hover:shadow-md">
              <div className="text-3xl font-bold text-accent">8+</div>
              <div className="mt-1 text-sm text-muted">
                godina iskustva u digitalizaciji i razvoju softvera
              </div>
            </div>
            <div className="rounded-lg bg-white p-6 shadow-sm transition-all duration-200 hover:-translate-y-1 hover:shadow-md">
              <div className="text-3xl font-bold text-accent">3x</div>
              <div className="mt-1 text-sm text-muted">
                prosječno ubrzanje poslovnih procesa nakon implementacije
              </div>
            </div>
            <div className="rounded-lg bg-white p-6 shadow-sm transition-all duration-200 hover:-translate-y-1 hover:shadow-md">
              <div className="text-3xl font-bold text-accent">40%</div>
              <div className="mt-1 text-sm text-muted">
                prosječna ušteda na operativnim troškovima
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function SocialProof() {
  return (
    <section className="border-b border-border bg-white py-12">
      <div className="mx-auto max-w-7xl px-6">
        <p className="text-center text-sm font-medium text-muted">
          Firme koje su nam povjerile svoju digitalnu transformaciju
        </p>
        <div className="mt-8 flex flex-wrap items-center justify-center gap-x-12 gap-y-6">
          {[
            "Gradnja Plus",
            "TerraBuild",
            "Adriatic Consulting",
            "ProjeKT",
            "MontažaPro",
            "DataVia",
          ].map((name) => (
            <div
              key={name}
              className="text-lg font-bold tracking-tight text-gray-300 transition-colors hover:text-gray-400"
            >
              {name}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function UslugePreview() {
  const services = [
    { title: "Analiza i konzalting", desc: "Dolazimo u vašu firmu, upoznajemo ljude i mapiramo procese. Početna analiza je besplatna." },
    { title: "Razvoj prilagođenih rješenja", desc: "Web i mobilne aplikacije šivane po mjeri vašeg poslovanja — od automatizacija do kompletnih sustava." },
    { title: "AI implementacija", desc: "Identificiramo gdje AI donosi stvarnu vrijednost i implementiramo ga u vaše postojeće procese." },
    { title: "Edukacija i podrška", desc: "Obučavamo vaš tim i ostajemo kao dugoročni partner. Podrška ne prestaje nakon implementacije." },
  ];

  return (
    <section className="border-b border-border bg-white py-20 md:py-28">
      <div className="mx-auto max-w-7xl px-6">
        <div className="flex items-end justify-between">
          <div className="max-w-2xl">
            <p className="text-sm font-medium uppercase tracking-widest text-accent">
              Naše usluge
            </p>
            <h2 className="mt-3 text-3xl font-bold tracking-tight md:text-4xl">
              Od analize do potpune transformacije.
            </h2>
          </div>
          <Link href="/usluge" className="hidden text-sm font-medium text-accent hover:underline md:block">
            Sve usluge &rarr;
          </Link>
        </div>

        <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {services.map((s) => (
            <div key={s.title} className="rounded-lg border border-border p-6 transition-all duration-200 hover:-translate-y-1 hover:border-accent/30 hover:shadow-md">
              <h3 className="font-semibold">{s.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-muted">{s.desc}</p>
            </div>
          ))}
        </div>

        <div className="mt-8 text-center md:hidden">
          <Link href="/usluge" className="text-sm font-medium text-accent hover:underline">
            Sve usluge &rarr;
          </Link>
        </div>
      </div>
    </section>
  );
}

function KakoRadimoPreview() {
  const steps = [
    { num: "01", title: "Dolazak u firmu", desc: "Naš tim provodi dane u vašoj firmi i uči kako zaista radite." },
    { num: "02", title: "Dijagnoza i plan", desc: "Mapiramo procese, identificiramo probleme i predlažemo konkretne korake." },
    { num: "03", title: "Implementacija", desc: "Postavljamo sustave u fazama — bez zaustavljanja vašeg poslovanja." },
    { num: "04", title: "Podrška", desc: "Ostajemo s vama, pratimo rezultate i kontinuirano poboljšavamo." },
  ];

  return (
    <section className="border-b border-border bg-slate-50 py-20 md:py-28">
      <div className="mx-auto max-w-7xl px-6">
        <div className="max-w-2xl">
          <p className="text-sm font-medium uppercase tracking-widest text-accent">
            Naš pristup
          </p>
          <h2 className="mt-3 text-3xl font-bold tracking-tight md:text-4xl">
            Dolazimo u vašu firmu i učimo kako zaista radite.
          </h2>
          <p className="mt-4 text-lg text-muted">
            Ne radimo na daljinu od prvog dana. Fizički dolazimo, sjedimo s vašim
            ljudima, razumijemo frustracije. Tek onda predlažemo rješenja.
          </p>
        </div>

        <div className="mt-12 grid gap-px overflow-hidden rounded-lg border border-border bg-border md:grid-cols-4">
          {steps.map((s) => (
            <div key={s.num} className="bg-white p-8">
              <div className="text-sm font-bold text-accent">{s.num}</div>
              <h3 className="mt-2 text-lg font-semibold">{s.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-muted">{s.desc}</p>
            </div>
          ))}
        </div>

        <div className="mt-8 text-center">
          <Link href="/o-nama" className="text-sm font-medium text-accent hover:underline">
            Saznajte više o našem pristupu &rarr;
          </Link>
        </div>
      </div>
    </section>
  );
}

function BriksyPreview() {
  return (
    <section className="border-b border-border bg-white py-20 md:py-28">
      <div className="mx-auto max-w-7xl px-6">
        <div className="grid gap-12 lg:grid-cols-2 lg:items-center">
          <div>
            <p className="text-sm font-medium uppercase tracking-widest text-accent">
              Naš proizvod
            </p>
            <h2 className="mt-3 text-3xl font-bold tracking-tight md:text-4xl">
              Briksy — prva aplikacija koja spaja financije, realizaciju i
              robno-materijalno.
            </h2>
            <p className="mt-4 text-lg leading-relaxed text-muted">
              Razvijana godinama u suradnji s vlasnicima građevinskih firmi i
              inženjerima na terenu. Sve na jednom mjestu — bez Excela, bez ručnog
              prekucavanja.
            </p>
            <div className="mt-6 flex gap-4">
              <Link
                href="/briksy"
                className="inline-flex items-center rounded-lg bg-accent px-6 py-3 text-sm font-semibold text-white hover:bg-accent-dark"
              >
                Saznajte više
              </Link>
              <a
                href="https://briksy.com"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center rounded-lg border border-border px-6 py-3 text-sm font-medium hover:bg-gray-50"
              >
                briksy.com
                <svg className="ml-2 h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                </svg>
              </a>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="rounded-lg border border-border p-5 transition-all duration-200 hover:-translate-y-1 hover:shadow-md">
              <h4 className="font-semibold">Financije i realizacija</h4>
              <p className="mt-1 text-sm text-muted">Svaki trošak vezan uz projekt — u realnom vremenu.</p>
            </div>
            <div className="rounded-lg border border-border p-5 transition-all duration-200 hover:-translate-y-1 hover:shadow-md">
              <h4 className="font-semibold">Robno-materijalno</h4>
              <p className="mt-1 text-sm text-muted">Svaki materijal zabilježen — količina, cijena, gradilište.</p>
            </div>
            <div className="rounded-lg border border-border p-5 transition-all duration-200 hover:-translate-y-1 hover:shadow-md">
              <h4 className="font-semibold">Upravljanje projektima</h4>
              <p className="mt-1 text-sm text-muted">Od ponude do primopredaje — svaki korak dokumentiran.</p>
            </div>
            <div className="rounded-lg border border-border p-5 transition-all duration-200 hover:-translate-y-1 hover:shadow-md">
              <h4 className="font-semibold">Izvještaji na klik</h4>
              <p className="mt-1 text-sm text-muted">Automatski generirani izvještaji bez kopanja po podacima.</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function CTASection() {
  return (
    <section id="kontakt" className="bg-slate-50 py-20 md:py-28">
      <div className="mx-auto max-w-7xl px-6">
        <div className="grid gap-16 lg:grid-cols-5">
          <div className="lg:col-span-2">
            <h2 className="text-3xl font-bold tracking-tight md:text-4xl">
              Započnite digitalnu
              <br />
              transformaciju danas.
            </h2>
            <p className="mt-4 text-lg leading-relaxed text-muted">
              Ispunite formu u 3 kratka koraka — javit ćemo vam se u roku od 24 sata. Bez obveza.
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
                    <h4 className="text-sm font-semibold text-foreground">{s.t}</h4>
                    <p className="mt-0.5 text-sm text-muted">{s.d}</p>
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-10 space-y-3">
              <h3 className="text-sm font-medium uppercase tracking-wider text-muted">
                Ili nas kontaktirajte direktno
              </h3>
              <a href="mailto:info@briksy.com" className="flex items-center gap-3 rounded-lg border border-border bg-white p-4 hover:bg-gray-50">
                <svg className="h-5 w-5 text-accent" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
                <div>
                  <div className="text-sm font-semibold">info@briksy.com</div>
                  <div className="text-xs text-muted">Odgovaramo u roku od 24 sata</div>
                </div>
              </a>
              <a href="tel:+385955419712" className="flex items-center gap-3 rounded-lg border border-border bg-white p-4 hover:bg-gray-50">
                <svg className="h-5 w-5 text-accent" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                </svg>
                <div>
                  <div className="text-sm font-semibold">+385 95 541 9712</div>
                  <div className="text-xs text-muted">Radnim danom 8:00–17:00</div>
                </div>
              </a>
            </div>
          </div>

          <div className="lg:col-span-3">
            <ContactForm />
          </div>
        </div>
      </div>
    </section>
  );
}

function PortalBanner() {
  return (
    <section className="border-b border-border bg-white py-16">
      <div className="mx-auto max-w-7xl px-6">
        <div className="flex flex-col items-center justify-between gap-6 rounded-2xl border border-border bg-slate-50 p-8 md:flex-row md:p-10">
          <div>
            <h3 className="text-xl font-bold text-foreground">
              Već ste naš klijent?
            </h3>
            <p className="mt-2 max-w-lg text-muted">
              Pratite napredak svog projekta u realnom vremenu — faze, postotci i status na jednom mjestu.
            </p>
          </div>
          <Link
            href="/login"
            className="shrink-0 rounded-lg border border-accent bg-white px-8 py-3 text-sm font-semibold text-accent transition-colors hover:bg-accent hover:text-white"
          >
            Prijava u portal
          </Link>
        </div>
      </div>
    </section>
  );
}

export default function Home() {
  return (
    <>
      <Hero />
      <SocialProof />
      <UslugePreview />
      <KakoRadimoPreview />
      <BriksyPreview />
      <CTASection />
      <PortalBanner />
    </>
  );
}
