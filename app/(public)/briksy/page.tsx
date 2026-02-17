import Link from "next/link";
import InvoiceMockup from "@/app/components/invoice-mockup";

export const metadata = {
  title: "Briksy — Softver za građevinarstvo",
  description:
    "Briksy je prva aplikacija koja spaja financije, realizaciju i robno-materijalno poslovanje za građevinske firme. Razvijena u suradnji s vlasnicima firmi i inženjerima na terenu.",
};

export default function BriksyPage() {
  return (
    <>
      {/* Hero */}
      <section className="border-b border-border bg-slate-50 pt-20">
        <div className="mx-auto max-w-7xl px-6 py-20 md:py-28">
          <div className="grid gap-16 lg:grid-cols-2">
            <div>
              <p className="text-sm font-medium uppercase tracking-widest text-accent">
                Naš proizvod
              </p>
              <h1 className="mt-3 text-3xl font-bold tracking-tight md:text-5xl">
                Briksy — prva aplikacija koja spaja financije, realizaciju i
                robno-materijalno na jednom mjestu.
              </h1>
              <p className="mt-6 text-lg leading-relaxed text-muted">
                Građevinske firme su godinama koristile jedan alat za financije,
                drugi za praćenje projekata, treći za materijal i zalihe — i onda
                ručno pokušavale sve to spojiti u Excelu. Briksy je prvi sustav
                koji sve te podatke drži na jednom mjestu i automatski ih povezuje.
              </p>
              <p className="mt-4 leading-relaxed text-muted">
                Vidite koliko je projekt zaradio, koliko materijala je utrošeno,
                je li realizacija u skladu s planom — sve u realnom vremenu, na
                jednom ekranu. Bez ručnog unosa, bez prekucavanja, bez čekanja
                kraj mjeseca da saznate kako stojite.
              </p>

              <div className="mt-8 rounded-lg border border-accent/20 bg-accent/5 p-6">
                <h3 className="font-semibold">Rađen s onima koji ga koriste</h3>
                <p className="mt-2 leading-relaxed text-muted">
                  Briksy nije nastao u uredu programera koji zamišljaju kako
                  bi gradilište trebalo funkcionirati. Razvijali smo ga godinama
                  u suradnji s vlasnicima građevinskih firmi i inženjerima na
                  terenu. Svaka funkcionalnost postoji jer ju je netko s gradilišta
                  zatražio, testirao i potvrdio da mu zaista pomaže u svakodnevnom
                  radu.
                </p>
              </div>

              <div className="mt-6 flex gap-4">
                <a
                  href="https://briksy.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center rounded-lg bg-accent px-6 py-3 text-sm font-semibold text-white hover:bg-accent-dark"
                >
                  Posjetite briksy.com
                  <svg className="ml-2 h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                  </svg>
                </a>
                <Link
                  href="/kontakt"
                  className="inline-flex items-center rounded-lg border border-border px-6 py-3 text-sm font-medium hover:bg-gray-50"
                >
                  Zatražite demo
                </Link>
              </div>
            </div>

            <div className="flex items-start">
              <InvoiceMockup />
            </div>
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="border-b border-border bg-white py-20 md:py-28">
        <div className="mx-auto max-w-7xl px-6">
          <h2 className="text-2xl font-bold tracking-tight md:text-3xl">
            Sve što trebate za upravljanje građevinskom firmom
          </h2>

          <div className="mt-12 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            <div className="rounded-lg border border-border p-6 transition-all duration-200 hover:-translate-y-1 hover:border-accent/30 hover:shadow-md">
              <h3 className="font-semibold">Financije i realizacija — povezano</h3>
              <p className="mt-2 text-sm leading-relaxed text-muted">
                Svaki trošak je automatski vezan uz projekt i fazu. Vidite koliko
                košta svaka stavka u realizaciji, usporedite plan i stvarnost, i
                reagirajte prije nego što odstupanja postanu problem. Nema više
                iznenađenja na kraju mjeseca.
              </p>
            </div>
            <div className="rounded-lg border border-border p-6 transition-all duration-200 hover:-translate-y-1 hover:border-accent/30 hover:shadow-md">
              <h3 className="font-semibold">Robno-materijalno praćenje</h3>
              <p className="mt-2 text-sm leading-relaxed text-muted">
                Svaki materijal koji uđe na gradilište je zabilježen — količina,
                cijena, dobavljač, projekt. Automatsko usklađivanje sa situacijama
                i budžetom. Znate točno koliko betona, armature ili crijepa imate
                i koliko vam treba.
              </p>
            </div>
            <div className="rounded-lg border border-border p-6 transition-all duration-200 hover:-translate-y-1 hover:border-accent/30 hover:shadow-md">
              <h3 className="font-semibold">Upravljanje projektima</h3>
              <p className="mt-2 text-sm leading-relaxed text-muted">
                Od ponude do primopredaje — svaki korak je dokumentiran. Zadaci,
                rokovi, odgovornosti, fotografije s terena. Više nema &ldquo;mislio sam
                da to radi netko drugi&rdquo; ili &ldquo;nisam znao da kasni&rdquo;.
              </p>
            </div>
            <div className="rounded-lg border border-border p-6 transition-all duration-200 hover:-translate-y-1 hover:border-accent/30 hover:shadow-md">
              <h3 className="font-semibold">Ponude, ugovori i situacije</h3>
              <p className="mt-2 text-sm leading-relaxed text-muted">
                Kreirajte ponude u minutama, pretvarajte ih u ugovore jednim klikom,
                generirajte situacije automatski na temelju stvarnog napretka na
                gradilištu. Profesionalno, brzo, bez ručnog prekucavanja.
              </p>
            </div>
            <div className="rounded-lg border border-border p-6 transition-all duration-200 hover:-translate-y-1 hover:border-accent/30 hover:shadow-md">
              <h3 className="font-semibold">Komunikacija ured — gradilište</h3>
              <p className="mt-2 text-sm leading-relaxed text-muted">
                Fotografije s terena, dnevni izvještaji, prijave problema — sve
                dolazi direktno u sustav i veže se uz pravi projekt. Nema više
                traženja informacija po Viberu ili čekanja da se netko vrati u ured.
              </p>
            </div>
            <div className="rounded-lg border border-border p-6 transition-all duration-200 hover:-translate-y-1 hover:border-accent/30 hover:shadow-md">
              <h3 className="font-semibold">Izvještaji na jedan klik</h3>
              <p className="mt-2 text-sm leading-relaxed text-muted">
                Automatski generirani izvještaji — financijski, o napretku,
                o materijalu, o radnim satima. Sve što vam treba za sastanak,
                reviziju ili vlastiti pregled — bez kopanja po podacima i
                ručnog zbrajanja.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="bg-slate-50 py-20 md:py-28">
        <div className="mx-auto max-w-7xl px-6 text-center">
          <h2 className="text-3xl font-bold tracking-tight md:text-4xl">
            Želite vidjeti Briksy u akciji?
          </h2>
          <p className="mx-auto mt-4 max-w-xl text-lg text-muted">
            Javite nam se i organizirat ćemo demo prilagođen vašoj firmi —
            besplatno i bez obveza.
          </p>
          <div className="mt-8 flex justify-center gap-4">
            <Link
              href="/kontakt"
              className="rounded-lg bg-accent px-8 py-3.5 text-base font-semibold text-white hover:bg-accent-dark"
            >
              Zatražite demo
            </Link>
            <a
              href="https://briksy.com"
              target="_blank"
              rel="noopener noreferrer"
              className="rounded-lg border border-border px-8 py-3.5 text-base font-medium hover:bg-gray-50"
            >
              briksy.com
            </a>
          </div>
        </div>
      </section>
    </>
  );
}
