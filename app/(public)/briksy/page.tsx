import Link from "next/link";
import InvoiceMockup from "@/app/components/invoice-mockup";
import AnimateOnScroll from "@/app/components/animate-on-scroll";

export const metadata = {
  title: "Briksy — Softver za upravljanje građevinskom kompanijom",
  description:
    "Prva aplikacija koja spaja financije, realizaciju i robno-materijalno na jednom mjestu. Razvijena s vlasnicima kompanija i inženjerima na terenu.",
  alternates: { canonical: "https://briksygroup.com/briksy" },
  openGraph: {
    title: "Briksy — Softver za upravljanje građevinskom kompanijom",
    description: "Prva aplikacija koja spaja financije, realizaciju i robno-materijalno za građevinske kompanije.",
    url: "https://briksygroup.com/briksy",
  },
};

export default function BriksyPage() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "BreadcrumbList",
        itemListElement: [
          { "@type": "ListItem", position: 1, name: "Početna", item: "https://briksygroup.com" },
          { "@type": "ListItem", position: 2, name: "Proizvodi", item: "https://briksygroup.com/briksy" },
          { "@type": "ListItem", position: 3, name: "Briksy", item: "https://briksygroup.com/briksy" },
        ],
      },
      {
        "@type": "SoftwareApplication",
        name: "Briksy",
        url: "https://briksy.com",
        applicationCategory: "BusinessApplication",
        operatingSystem: "Web",
        description: "Prva aplikacija koja spaja financije, realizaciju i robno-materijalno poslovanje za građevinske kompanije.",
        offers: { "@type": "Offer", availability: "https://schema.org/InStock", priceCurrency: "EUR" },
        creator: { "@id": "https://briksygroup.com/#organization" },
      },
    ],
  };

  const features = [
    { title: "Financije i realizacija", desc: "Svaki trošak vezan uz projekt i fazu. Plan vs. stvarnost u realnom vremenu." },
    { title: "Robno-materijalno", desc: "Svaki materijal zabilježen — količina, cijena, dobavljač, gradilište." },
    { title: "Upravljanje projektima", desc: "Od ponude do primopredaje — zadaci, rokovi, odgovornosti, fotografije." },
    { title: "Ponude i situacije", desc: "Ponude u minutama, situacije automatski na temelju napretka na gradilištu." },
    { title: "Ured — gradilište", desc: "Fotografije, dnevni izvještaji, prijave problema — direktno u sustav." },
    { title: "Izvještaji na klik", desc: "Automatski generirani financijski izvještaji, napredak, materijal." },
  ];

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />

      {/* Hero */}
      <section className="border-b border-border bg-slate-50 pt-16">
        <div className="mx-auto max-w-7xl px-6 py-14 md:py-20">
          <div className="grid gap-12 lg:grid-cols-2">
            <div>
              <p className="text-sm font-medium uppercase tracking-widest text-accent">
                Naš proizvod
              </p>
              <h1 className="mt-3 text-3xl font-bold tracking-tight md:text-5xl">
                Briksy — financije, realizacija i materijal na jednom mjestu.
              </h1>
              <p className="mt-5 text-lg leading-relaxed text-muted">
                Više ne trebate jedan alat za financije, drugi za projekte, treći
                za materijal i Excel da ih spojite. Briksy drži sve na jednom
                mjestu i automatski povezuje.
              </p>

              <div className="mt-6 rounded-lg border border-accent/20 bg-accent/5 p-5">
                <h3 className="font-semibold">Rađen s onima koji ga koriste</h3>
                <p className="mt-1.5 text-sm leading-relaxed text-muted">
                  Razvijan godinama s vlasnicima građevinskih kompanija i
                  inženjerima na terenu. Svaka funkcionalnost postoji jer ju je
                  netko s gradilišta zatražio i potvrdio.
                </p>
              </div>

              <div className="mt-5 flex gap-4">
                <a
                  href="https://briksy.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center rounded-xl bg-accent px-6 py-3 text-sm font-semibold text-white hover:bg-accent-dark"
                >
                  Posjetite briksy.com
                  <svg className="ml-2 h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                  </svg>
                </a>
                <Link href="/kontakt" className="inline-flex items-center rounded-xl border border-border px-6 py-3 text-sm font-medium hover:bg-gray-50">
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
      <section className="border-b border-border bg-white py-14 md:py-20">
        <div className="mx-auto max-w-7xl px-6">
          <h2 className="text-2xl font-bold tracking-tight md:text-3xl">
            Sve za upravljanje građevinskom kompanijom
          </h2>

          <AnimateOnScroll>
            <div className="mt-10 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
              {features.map((f) => (
                <div key={f.title} className="rounded-xl border border-border p-5 transition-all duration-200 hover:-translate-y-1 hover:border-accent/30 hover:shadow-md">
                  <h3 className="font-semibold">{f.title}</h3>
                  <p className="mt-1.5 text-sm leading-relaxed text-muted">{f.desc}</p>
                </div>
              ))}
            </div>
          </AnimateOnScroll>
        </div>
      </section>

      {/* CTA */}
      <section className="bg-slate-50 py-14 md:py-20">
        <div className="mx-auto max-w-7xl px-6 text-center">
          <h2 className="text-3xl font-bold tracking-tight md:text-4xl">
            Želite vidjeti Briksy u akciji?
          </h2>
          <p className="mx-auto mt-3 max-w-xl text-lg text-muted">
            Demo prilagođen vašoj kompaniji. Ako nije za vas — nema daljnjeg kontakta.
          </p>
          <div className="mt-6 flex justify-center gap-4">
            <Link href="/kontakt" className="rounded-xl bg-accent px-8 py-3.5 text-base font-semibold text-white hover:bg-accent-dark">
              Zatražite demo
            </Link>
            <a href="https://briksy.com" target="_blank" rel="noopener noreferrer" className="rounded-xl border border-border px-8 py-3.5 text-base font-medium hover:bg-gray-50">
              briksy.com
            </a>
          </div>
        </div>
      </section>
    </>
  );
}
