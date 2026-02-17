import Link from "next/link";

export const metadata = {
  title: "AI implementacija u poslovanju — Briksy Group",
  description:
    "Kako umjetna inteligencija može pomoći vašoj firmi? Briksy Group implementira AI rješenja koja automatiziraju repetitivne zadatke, analiziraju podatke i ubrzavaju obradu dokumenata.",
};

export default function AIPage() {
  return (
    <>
      {/* Hero */}
      <section className="border-b border-border bg-slate-50 pt-20">
        <div className="mx-auto max-w-7xl px-6 py-20 md:py-28">
          <div className="grid gap-16 lg:grid-cols-2">
            <div>
              <p className="text-sm font-medium uppercase tracking-widest text-accent">
                Umjetna inteligencija u poslovanju
              </p>
              <h1 className="mt-3 text-3xl font-bold tracking-tight md:text-5xl">
                AI nije budućnost — AI je sada.
                <br />I vaša firma ga može koristiti.
              </h1>
              <p className="mt-6 text-lg leading-relaxed text-muted">
                Umjetna inteligencija više nije rezervirana za tech gigante i
                Silicon Valley. Danas AI može pomoći svakoj firmi — od automatskog
                čitanja i kategoriziranja faktura, do predviđanja kašnjenja na
                projektima prije nego se dogode.
              </p>
              <p className="mt-4 leading-relaxed text-muted">
                Mi vam pomažemo da identificirate gdje AI donosi stvarnu vrijednost
                u vašem poslovanju i implementiramo ga na način koji vaši
                zaposlenici zaista mogu koristiti — bez da trebaju biti tehnički
                stručnjaci.
              </p>
            </div>

            <div className="space-y-5">
              {[
                { t: "Automatizacija repetitivnih zadataka", d: "Unos podataka, kategorizacija dokumenata, kreiranje izvještaja, odgovaranje na standardne upite — AI preuzima zadatke koji vašim ljudima oduzimaju sate dnevno, a ne zahtijevaju kreativno razmišljanje. Vaši zaposlenici se fokusiraju na posao koji zaista zahtijeva ljudski um." },
                { t: "Pametna analitika i predviđanja", d: "AI analizira vaše podatke i prepoznaje obrasce koje ljudsko oko ne može vidjeti. Predviđa kašnjenja na projektima, identificira rizične troškove, sugerira optimalne rasporede. Ne zamjenjuje vaše odlučivanje — daje vam bolje informacije za bolje odluke." },
                { t: "Obrada dokumenata i komunikacije", d: "AI čita ugovore i izvlači ključne informacije, kategorizira pristiglu poštu po prioritetu, generira sažetke dugih dokumenata i pomaže u kreiranju ponuda na temelju prethodnih projekata. Posao koji je trajao sate, završava u sekundama." },
                { t: "Integracija u postojeće sustave", d: "Ne trebate mijenjati cijeli način rada da biste koristili AI. Implementiramo AI komponente unutar vaših postojećih alata i procesa — tako da vaši zaposlenici dobiju nove mogućnosti bez nove krivulje učenja." },
              ].map((item) => (
                <div key={item.t} className="rounded-lg border border-border bg-white p-6 transition-all duration-200 hover:-translate-y-1 hover:border-accent/30 hover:shadow-md">
                  <h3 className="font-semibold">{item.t}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-muted">{item.d}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Kako izgleda u praksi */}
      <section className="border-b border-border bg-white py-20 md:py-28">
        <div className="mx-auto max-w-7xl px-6">
          <div className="rounded-lg border border-border p-8">
            <div className="grid gap-8 lg:grid-cols-2">
              <div>
                <h2 className="text-xl font-semibold">
                  Kako izgleda AI implementacija u praksi?
                </h2>
                <p className="mt-4 leading-relaxed text-muted">
                  Počinjemo s identificiranjem procesa koji su najrepetitivniji
                  i gdje se gubi najviše vremena. Zatim postavljamo AI rješenja
                  koja se uklapaju u vaš postojeći tok rada. Svaka implementacija
                  uključuje temeljitu obuku vašeg tima i praćenje rezultata.
                </p>
                <p className="mt-4 leading-relaxed text-muted">
                  Naši klijenti koji su implementirali AI u poslovne procese
                  u prosjeku prijavljuju 60% manje vremena utrošenog na
                  administrativne zadatke i značajno manje grešaka u obradi
                  podataka.
                </p>
              </div>
              <div className="grid grid-cols-2 gap-4">
                {[
                  { n: "60%", d: "manje vremena na admin zadatke" },
                  { n: "85%", d: "manje grešaka u obradi podataka" },
                  { n: "10x", d: "brža obrada dokumenata" },
                  { n: "24/7", d: "AI sustavi rade non-stop" },
                ].map((s) => (
                  <div key={s.n} className="rounded-lg border border-border p-5 text-center transition-all duration-200 hover:-translate-y-1 hover:shadow-md">
                    <div className="text-3xl font-bold">{s.n}</div>
                    <div className="mt-1 text-sm text-muted">{s.d}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="bg-slate-50 py-20 md:py-28">
        <div className="mx-auto max-w-7xl px-6 text-center">
          <h2 className="text-3xl font-bold tracking-tight md:text-4xl">
            Spremni za AI u vašem poslovanju?
          </h2>
          <p className="mx-auto mt-4 max-w-xl text-lg text-muted">
            Javite nam se i zajedno ćemo identificirati gdje AI može donijeti
            najveću vrijednost u vašoj firmi — besplatna analiza, bez obveza.
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
