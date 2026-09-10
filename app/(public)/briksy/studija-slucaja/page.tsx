import Link from "next/link";
import AnimateOnScroll from "@/app/components/animate-on-scroll";

export const metadata = {
  title: "Digitalizacija građevinske firme — studija slučaja",
  description:
    "Kako izgleda građevinska firma bez papira i Excela: dnevni planovi, GPS prijava radnika, skeniranje materijala i automatski izvještaji — sve u jednom sustavu, čak i bez signala na gradilištu.",
  alternates: {
    canonical: "https://briksygroup.com/briksy/studija-slucaja",
  },
  openGraph: {
    title: "Digitalizacija građevinske firme — studija slučaja",
    description:
      "Dan digitalizirane građevinske firme: od dnevnog plana i GPS prijave do automatskih izvještaja u uredu.",
    url: "https://briksygroup.com/briksy/studija-slucaja",
  },
};

export default function StudijaSlucajaPage() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "BreadcrumbList",
        itemListElement: [
          { "@type": "ListItem", position: 1, name: "Početna", item: "https://briksygroup.com" },
          { "@type": "ListItem", position: 2, name: "Briksy", item: "https://briksygroup.com/briksy" },
          { "@type": "ListItem", position: 3, name: "Studija slučaja", item: "https://briksygroup.com/briksy/studija-slucaja" },
        ],
      },
      {
        "@type": "Article",
        headline: "Digitalizacija građevinske firme — studija slučaja",
        description:
          "Kako izgleda građevinska firma bez papira i Excela: dnevni planovi, GPS prijava radnika, skeniranje materijala i automatski izvještaji u jednom sustavu.",
        author: { "@id": "https://briksygroup.com/#organization" },
        publisher: { "@id": "https://briksygroup.com/#organization" },
        datePublished: "2026-09-10",
        mainEntityOfPage: "https://briksygroup.com/briksy/studija-slucaja",
        inLanguage: "hr",
      },
    ],
  };

  const problems = [
    {
      title: "Papirnate šihterice i dnevnici",
      desc: "Sati radnika zapisuju se na papir, prekucavaju petkom, a greške se otkriju tek na plaći.",
    },
    {
      title: "Excel koji nitko ne ažurira",
      desc: "Troškovi i materijal žive u tablicama koje su zastarjele istog trena kad su napravljene.",
    },
    {
      title: "Materijal bez traga",
      desc: "Što je stiglo, što je potrošeno, što je na kojem gradilištu — nitko ne zna sa sigurnošću.",
    },
    {
      title: "Ured ne vidi gradilište",
      desc: "Informacije putuju telefonom i porukama. Dok stignu do ureda, već su zastarjele ili izgubljene.",
    },
  ];

  const dan = [
    {
      time: "07:00 — Ured",
      title: "Dnevni plan u par minuta",
      desc: "Voditelj raspoređuje ljude, vozila i opremu po gradilištima u aplikaciji. Svaki radnik na mobitelu vidi gdje ide i što radi.",
    },
    {
      time: "07:30 — Gradilište",
      title: "GPS prijava dolaska",
      desc: "Radnici se prijavljuju na gradilištu jednim klikom. Vrijeme i lokacija zabilježeni — šihterica se piše sama.",
    },
    {
      time: "Tijekom dana",
      title: "Materijal, fotke, napredak",
      desc: "Materijal se skenira barkodom pri izdavanju, fotografije i dokumenti idu direktno u sustav, radni nalozi prate planirano vs. izvedeno.",
    },
    {
      time: "Bez signala?",
      title: "Aplikacija radi offline",
      desc: "Na gradilištu bez interneta sve se sprema lokalno i sinkronizira čim se signal vrati. Nitko ne staje s poslom.",
    },
    {
      time: "16:00 — Ured",
      title: "Izvještaj se generira sam",
      desc: "Sati su zbrojeni, potrošnja materijala knjižena po gradilištu, dnevni plan izvezen u PDF. Ured je sve vidio u realnom vremenu — bez ijednog poziva.",
    },
  ];

  const moduli = [
    { title: "Dnevni plan", desc: "Ljudi, vozila i oprema po gradilištima — s PDF izvještajem na klik." },
    { title: "GPS prijava radnika", desc: "Dolazak i odlazak s lokacijom, sati se zbrajaju automatski." },
    { title: "Radni nalozi", desc: "Od naloga do izvršenja — planirane vs. izvedene količine i sati." },
    { title: "Robno-materijalno", desc: "Skeniranje barkodom, stanje skladišta i potrošnja po gradilištu." },
    { title: "Fotografije i dokumenti", desc: "Dokaz izvedenih radova s terena, direktno u projektnu mapu." },
    { title: "Troškovi po gradilištu", desc: "Svaki trošak vezan uz gradilište — plan vs. stvarnost odmah vidljivi." },
    { title: "Tim i komunikacija", desc: "Poruke po gradilištu i obavijesti — kraj lova po pozivima i grupama." },
    { title: "Kasa s fiskalizacijom", desc: "Izdavanje računa s JIR-om i ZKI-jem, gotovina i kartice." },
  ];

  const brojke = [
    { n: "12", d: "povezanih modula" },
    { n: "2", d: "platforme — iOS i Android" },
    { n: "4", d: "razine ovlasti u firmi" },
    { n: "0", d: "papira i prekucavanja" },
  ];

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      {/* Hero */}
      <section className="border-b border-border bg-slate-50 pt-16">
        <div className="mx-auto max-w-7xl px-6 py-14 md:py-20">
          <div className="grid gap-12 lg:grid-cols-2 lg:items-center">
            <div>
              <p className="text-sm font-medium uppercase tracking-widest text-accent">
                Studija slučaja — Briksy
              </p>
              <h1 className="mt-3 text-3xl font-bold tracking-tight md:text-5xl">
                Građevinska firma bez papira i Excela.
              </h1>
              <p className="mt-5 text-lg leading-relaxed text-muted">
                Briksy smo gradili godinama, na stvarnim gradilištima, s
                vlasnicima firmi i inženjerima na terenu. Ovo je konkretan
                prikaz kako izgleda dan firme u kojoj informacije putuju
                same — od gradilišta do ureda.
              </p>
              <div className="mt-8 flex gap-4">
                <Link
                  href="/kontakt"
                  className="inline-flex items-center rounded-xl bg-accent px-6 py-3 text-sm font-semibold text-white shadow-lg shadow-accent/20 transition-all hover:-translate-y-0.5 hover:bg-accent-dark"
                >
                  Zatražite demo
                </Link>
                <Link
                  href="/briksy"
                  className="inline-flex items-center rounded-xl border border-border bg-white px-6 py-3 text-sm font-medium transition-all hover:-translate-y-0.5 hover:shadow-md"
                >
                  O Briksyju
                </Link>
              </div>
            </div>

            {/* Prije / poslije */}
            <AnimateOnScroll delay={150}>
              <div className="grid gap-4 sm:grid-cols-2">
                <div className="rounded-2xl border border-border bg-white p-6">
                  <p className="text-xs font-semibold uppercase tracking-wider text-muted">
                    Prije
                  </p>
                  <ul className="mt-3 space-y-2.5 text-sm leading-relaxed text-muted">
                    <li>Šihterice na papiru</li>
                    <li>Troškovi u Excelu, tjedan dana stari</li>
                    <li>Materijal se "otprilike zna"</li>
                    <li>Ured zove gradilište po 10× dnevno</li>
                    <li>Izvještaji se slažu satima</li>
                  </ul>
                </div>
                <div className="rounded-2xl border border-accent/30 bg-accent/5 p-6">
                  <p className="text-xs font-semibold uppercase tracking-wider text-accent">
                    Poslije
                  </p>
                  <ul className="mt-3 space-y-2.5 text-sm leading-relaxed text-foreground">
                    <li>GPS prijava, sati se zbrajaju sami</li>
                    <li>Troškovi po gradilištu u realnom vremenu</li>
                    <li>Materijal skeniran barkodom</li>
                    <li>Ured sve vidi u aplikaciji</li>
                    <li>Izvještaji i PDF na jedan klik</li>
                  </ul>
                </div>
              </div>
            </AnimateOnScroll>
          </div>
        </div>
      </section>

      {/* Problem */}
      <section className="border-b border-border bg-white py-14 md:py-20">
        <div className="mx-auto max-w-7xl px-6">
          <div className="max-w-3xl">
            <p className="text-sm font-medium uppercase tracking-widest text-accent">
              Polazna točka
            </p>
            <h2 className="mt-3 text-3xl font-bold tracking-tight md:text-4xl">
              Gdje građevinske firme gube novac
            </h2>
            <p className="mt-3 text-lg text-muted">
              Problemi su svugdje isti — ne zato što ljudi loše rade, nego zato
              što informacije putuju papirom, telefonom i pamćenjem.
            </p>
          </div>

          <AnimateOnScroll>
            <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
              {problems.map((p) => (
                <div
                  key={p.title}
                  className="rounded-2xl border border-border p-6"
                >
                  <h3 className="font-semibold">{p.title}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-muted">
                    {p.desc}
                  </p>
                </div>
              ))}
            </div>
          </AnimateOnScroll>
        </div>
      </section>

      {/* Jedan dan */}
      <section className="border-b border-border bg-blue-50/50 py-14 md:py-20">
        <div className="mx-auto max-w-7xl px-6">
          <div className="max-w-3xl">
            <p className="text-sm font-medium uppercase tracking-widest text-accent">
              Rješenje
            </p>
            <h2 className="mt-3 text-3xl font-bold tracking-tight md:text-4xl">
              Jedan dan digitalizirane firme
            </h2>
            <p className="mt-3 text-lg text-muted">
              Isti posao, isti ljudi — ali informacije putuju same, u trenutku
              kad nastanu.
            </p>
          </div>

          <div className="mt-10 space-y-4">
            {dan.map((step, i) => (
              <AnimateOnScroll key={step.title} delay={i * 80}>
                <div className="flex flex-col gap-2 rounded-xl border border-border bg-white p-6 sm:flex-row sm:items-baseline sm:gap-8">
                  <div className="w-40 shrink-0 text-sm font-bold text-accent">
                    {step.time}
                  </div>
                  <div>
                    <h3 className="font-semibold">{step.title}</h3>
                    <p className="mt-1 text-sm leading-relaxed text-muted">
                      {step.desc}
                    </p>
                  </div>
                </div>
              </AnimateOnScroll>
            ))}
          </div>
        </div>
      </section>

      {/* Moduli */}
      <section className="border-b border-border bg-white py-14 md:py-20">
        <div className="mx-auto max-w-7xl px-6">
          <div className="flex items-end justify-between">
            <div className="max-w-2xl">
              <p className="text-sm font-medium uppercase tracking-widest text-accent">
                Što je sve pokriveno
              </p>
              <h2 className="mt-3 text-3xl font-bold tracking-tight md:text-4xl">
                Moduli koji rade zajedno
              </h2>
            </div>
          </div>

          <AnimateOnScroll>
            <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
              {moduli.map((m) => (
                <div
                  key={m.title}
                  className="rounded-xl border border-border p-5 transition-all duration-200 hover:-translate-y-1 hover:border-accent/30 hover:shadow-md"
                >
                  <h3 className="text-sm font-semibold">{m.title}</h3>
                  <p className="mt-1.5 text-xs leading-relaxed text-muted">
                    {m.desc}
                  </p>
                </div>
              ))}
            </div>
          </AnimateOnScroll>

          <AnimateOnScroll>
            <div className="mt-10 grid grid-cols-2 gap-4 rounded-2xl border border-border bg-slate-50 p-6 md:grid-cols-4 md:p-8">
              {brojke.map((s) => (
                <div key={s.d} className="text-center">
                  <div className="text-3xl font-bold text-accent">{s.n}</div>
                  <div className="mt-1 text-xs font-medium text-muted">
                    {s.d}
                  </div>
                </div>
              ))}
            </div>
          </AnimateOnScroll>
        </div>
      </section>

      {/* Zašto funkcionira */}
      <section className="border-b border-border bg-white py-14 md:py-20">
        <div className="mx-auto max-w-7xl px-6">
          <div className="rounded-2xl border border-accent/20 bg-accent/5 p-8 md:p-10">
            <div className="max-w-3xl">
              <h2 className="text-2xl font-bold tracking-tight md:text-3xl">
                Zašto ovo funkcionira — i izvan građevine
              </h2>
              <p className="mt-4 leading-relaxed text-muted">
                Briksy nije nastao u uredu. Svaka funkcionalnost postoji jer ju
                je netko s gradilišta zatražio i potvrdio. Isti pristup —
                naučiti kako firma stvarno radi, pa ubrzati protok informacija
                — primjenjujemo na svaku industriju: proizvodnju, logistiku,
                usluge.
              </p>
              <p className="mt-3 leading-relaxed text-muted">
                Ako se vaša firma i dalje oslanja na papir, Excel i telefonske
                pozive, ovakav sustav možemo izgraditi i za vas.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="bg-slate-50 py-14 md:py-20">
        <div className="mx-auto max-w-7xl px-6 text-center">
          <h2 className="text-3xl font-bold tracking-tight md:text-4xl">
            Želite ovakav sustav u svojoj firmi?
          </h2>
          <p className="mx-auto mt-3 max-w-xl text-lg text-muted">
            Upoznajemo kako vaša firma radi i predlažemo najjednostavniji put
            digitalizacije. Bez obveza.
          </p>
          <div className="mt-6 flex flex-col items-center justify-center gap-3 sm:flex-row">
            <Link
              href="/kontakt"
              className="inline-flex items-center justify-center rounded-xl bg-accent px-8 py-3.5 text-base font-semibold text-white hover:bg-accent-dark"
            >
              Zatražite demo
            </Link>
            <a
              href="https://briksy.com"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center rounded-xl border border-border px-8 py-3.5 text-base font-medium hover:bg-gray-50"
            >
              briksy.com
            </a>
          </div>
        </div>
      </section>
    </>
  );
}
