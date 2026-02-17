import Link from "next/link";

export const metadata = {
  title: "Digitalizacija poslovanja — Briksy Group",
  description:
    "Što znači digitalizirati firmu? Briksy Group objašnjava proces digitalne transformacije. Primjeri iz prakse, statistike i konkretne koristi digitalizacije.",
};

export default function DigitalizacijaPage() {
  return (
    <>
      {/* Digitalizacija */}
      <section className="border-b border-border bg-blue-50/50 pt-20">
        <div className="mx-auto max-w-7xl px-6 py-20 md:py-28">
          <div className="grid gap-16 lg:grid-cols-5">
            <div className="lg:col-span-2">
              <p className="text-sm font-medium uppercase tracking-widest text-accent">
                Digitalizacija — objašnjeno jednostavno
              </p>
              <h1 className="mt-3 text-3xl font-bold tracking-tight md:text-5xl">
                Što zapravo znači digitalizirati firmu?
              </h1>
              <p className="mt-6 leading-relaxed text-muted">
                Digitalizacija znači zamijeniti ručne, spore i nepouzdane poslovne
                procese digitalnim sustavima koji rade brže, točnije i bez ljudske
                pogreške. Ali to nije samo &ldquo;staviti sve u kompjuter&rdquo; — to je potpuna
                promjena načina na koji vaša firma funkcionira.
              </p>
              <p className="mt-4 leading-relaxed text-muted">
                Zamislite da svaki papir koji danas prođe kroz vaše ruke, svaki
                telefonski poziv koji služi samo za prenošenje informacija, svaka
                Excel tablica koju ručno ažurirate — nestane. I umjesto toga imate
                sustav koji to radi automatski, bez grešaka, 24 sata dnevno.
              </p>
            </div>

            <div className="space-y-6 lg:col-span-3">
              <div className="rounded-lg border border-accent/20 bg-accent/5 p-6">
                <h3 className="font-semibold">Primjer iz prakse</h3>
                <p className="mt-2 leading-relaxed text-muted">
                  Građevinska firma koja vodi projekte na papiru troši prosječno{" "}
                  <strong className="text-foreground">15 sati tjedno</strong> samo na
                  administraciju — ručno kreiranje ponuda, traženje dokumenata,
                  telefonsko usklađivanje s gradilištem. S digitalnim sustavom, taj
                  posao se svede na <strong className="text-foreground">2-3 sata</strong>.
                  Ostatak vremena ide na ono što zapravo donosi novac: gradnju,
                  pregovore, rast.
                </p>
              </div>

              <div className="grid gap-5 sm:grid-cols-2">
                <div className="rounded-lg border border-border bg-white p-5">
                  <h4 className="font-semibold">Dokumentacija</h4>
                  <p className="mt-1 text-sm leading-relaxed text-muted">
                    Umjesto fascikli, registratora i dijeljenih foldera punih starih
                    verzija — jedan sustav gdje je svaki dokument uvijek na svom
                    mjestu, s poviješću promjena i kontrolom pristupa.
                  </p>
                </div>
                <div className="rounded-lg border border-border bg-white p-5">
                  <h4 className="font-semibold">Komunikacija</h4>
                  <p className="mt-1 text-sm leading-relaxed text-muted">
                    Umjesto telefona, Vibera i &ldquo;reci Marku da javi Petru&rdquo; — jasni
                    kanali, bilješke vezane uz projekte, i ništa se ne gubi u
                    prijevodu.
                  </p>
                </div>
                <div className="rounded-lg border border-border bg-white p-5">
                  <h4 className="font-semibold">Financije</h4>
                  <p className="mt-1 text-sm leading-relaxed text-muted">
                    Umjesto da čekate kraj mjeseca da vidite koliko je projekt
                    stvarno koštao — imate uvid u realnom vremenu, svaki trošak
                    zabilježen i kategoriziran automatski.
                  </p>
                </div>
                <div className="rounded-lg border border-border bg-white p-5">
                  <h4 className="font-semibold">Odlučivanje</h4>
                  <p className="mt-1 text-sm leading-relaxed text-muted">
                    Umjesto odluka na temelju osjećaja i iskustva — konkretni podaci,
                    trendovi i izvještaji koji vam govore što funkcionira, a što ne.
                  </p>
                </div>
              </div>
            </div>
          </div>

          <div className="mt-16 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {[
              { n: "67%", d: "kompanija kaže da im je digitalizacija povećala prihode" },
              { n: "72%", d: "prijavljuje veće zadovoljstvo zaposlenika nakon transformacije" },
              { n: "89%", d: "kaže da bi ponovili odluku o digitalizaciji" },
              { n: "6-12", d: "mjeseci za potpuni povrat investicije u digitalizaciju" },
            ].map((s) => (
              <div key={s.n} className="rounded-lg border border-border bg-white p-6 text-center transition-all duration-200 hover:-translate-y-1 hover:shadow-md">
                <div className="text-3xl font-bold text-accent">{s.n}</div>
                <div className="mt-1 text-sm text-muted">{s.d}</div>
              </div>
            ))}
          </div>

          <div className="mt-12 rounded-lg border border-border bg-white p-8">
            <h3 className="text-xl font-semibold">
              Zašto firme odgađaju digitalizaciju — i zašto to ne bi trebale
            </h3>
            <div className="mt-6 grid gap-8 lg:grid-cols-3">
              <div>
                <h4 className="font-semibold text-muted">&ldquo;Preskupo je&rdquo;</h4>
                <p className="mt-2 text-sm leading-relaxed text-muted">
                  Cijena digitalizacije je uvijek manja od cijene nedigitalizacije.
                  Svaki mjesec koji prođe bez promjene je mjesec izgubljene
                  produktivnosti i nepotrebnih troškova. Naši klijenti u prosjeku
                  vrate investiciju u 6-12 mjeseci.
                </p>
              </div>
              <div>
                <h4 className="font-semibold text-muted">&ldquo;Nemamo vremena&rdquo;</h4>
                <p className="mt-2 text-sm leading-relaxed text-muted">
                  Upravo zato što nemate vremena — trebate digitalizaciju. Radimo u
                  fazama koje ne zaustavljaju vaše svakodnevno poslovanje. I upravo
                  zato dolazimo k vama — da vama proces oduzme minimalno vremena.
                </p>
              </div>
              <div>
                <h4 className="font-semibold text-muted">&ldquo;Zaposlenici neće prihvatiti&rdquo;</h4>
                <p className="mt-2 text-sm leading-relaxed text-muted">
                  Iskustvo nam govori da nakon 2-3 tjedna korištenja, zaposlenici
                  ne žele nazad na stari način rada. Ključ je u tome da im pokažemo
                  kako im alat olakšava posao, a ne da im ga komplicira. Zato
                  edukacija i podrška nikad ne prestaju.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="bg-slate-50 py-20 md:py-28">
        <div className="mx-auto max-w-7xl px-6 text-center">
          <h2 className="text-3xl font-bold tracking-tight md:text-4xl">
            Spremni za digitalizaciju?
          </h2>
          <p className="mx-auto mt-4 max-w-xl text-lg text-muted">
            Javite nam se za besplatnu analizu vašeg poslovanja. Dolazimo k vama,
            upoznajemo vaš posao i dajemo vam iskrenu procjenu — bez obveza.
          </p>
          <Link
            href="/kontakt"
            className="mt-8 inline-flex rounded-lg bg-accent px-8 py-3.5 text-base font-semibold text-white hover:bg-accent-dark"
          >
            Kontaktirajte nas
          </Link>
        </div>
      </section>
    </>
  );
}
