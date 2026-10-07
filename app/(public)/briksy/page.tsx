import Link from "next/link";
import InvoiceMockup from "@/app/components/invoice-mockup";
import AnimateOnScroll from "@/app/components/animate-on-scroll";
import CTASection from "@/app/components/cta-section";

export const metadata = {
  title: "Briksy — ERP za građevinske firme",
  description:
    "Briksy povezuje ured, financije, skladište i gradilište u jedan sustav. AI uvoz troškovnika, radni nalozi, trošak po stavci, situacije i e-računi.",
  alternates: { canonical: "https://briksygroup.com/briksy" },
  openGraph: {
    title: "Briksy — ERP za građevinske firme",
    description: "Ured, financije, skladište i gradilište u jednom sustavu.",
    url: "https://briksygroup.com/briksy",
  },
};

const features = [
  { title: "AI uvoz troškovnika", desc: "Troškovnik iz PDF-a ili Excela u stavke, spremno za ponudu." },
  { title: "Usporedba kooperanata", desc: "Ponude po stavkama, jedna pored druge." },
  { title: "Radni nalozi s terena", desc: "Sati, materijal i fotografije s mobitela, direktno na projekt." },
  { title: "Trošak po stavci", desc: "Svaki račun sjeda na stavku troškovnika. Plan i stvarnost odmah." },
  { title: "Situacije i e-računi", desc: "Situacije iz napretka na gradilištu, e-računi na klik." },
  { title: "Skladište po gradilištu", desc: "Što je stiglo, što je potrošeno, gdje se nalazi." },
];

export default function BriksyPage() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "BreadcrumbList",
        itemListElement: [
          { "@type": "ListItem", position: 1, name: "Početna", item: "https://briksygroup.com" },
          { "@type": "ListItem", position: 2, name: "Briksy", item: "https://briksygroup.com/briksy" },
        ],
      },
      {
        "@type": "SoftwareApplication",
        name: "Briksy",
        url: "https://briksy.com",
        applicationCategory: "BusinessApplication",
        operatingSystem: "Web",
        description: "ERP za građevinske firme: ured, financije, skladište i gradilište u jednom sustavu.",
        offers: { "@type": "Offer", availability: "https://schema.org/InStock", priceCurrency: "EUR" },
        creator: { "@id": "https://briksygroup.com/#organization" },
      },
    ],
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />

      <section className="relative overflow-hidden bg-white pt-16">
        <div
          className="pointer-events-none absolute inset-x-0 top-0 h-[600px]"
          style={{
            background:
              "radial-gradient(55% 50% at 50% 0%, rgba(37,99,235,0.12) 0%, rgba(255,255,255,0) 100%)",
          }}
        />
        <div className="relative mx-auto max-w-6xl px-6 py-20 md:py-28">
          <div className="grid gap-14 lg:grid-cols-2 lg:items-center">
            <div>
              <p className="text-xs font-semibold uppercase tracking-widest text-accent">Naš proizvod</p>
              <h1 className="mt-4 text-4xl font-bold leading-[1.05] tracking-tight md:text-6xl">
                ERP za građevinske firme.
              </h1>
              <p className="mt-6 max-w-md text-lg leading-relaxed text-muted">
                Ured, financije, skladište i gradilište u jednom sustavu. Bez
                Excela, bez prepisivanja.
              </p>
              <div className="mt-8 flex flex-col gap-3 sm:flex-row">
                <Link
                  href="/kontakt?tema=briksy-demo"
                  className="inline-flex items-center justify-center gap-2 rounded-full bg-accent px-7 py-4 text-base font-semibold text-white shadow-lg shadow-accent/25 transition-all hover:-translate-y-0.5 hover:bg-accent-dark"
                >
                  Zatražite demo
                </Link>
                <a
                  href="https://briksy.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center rounded-full border border-border bg-white px-7 py-4 text-base font-medium transition-colors hover:bg-slate-50"
                >
                  briksy.com ↗
                </a>
              </div>
              <p className="mt-8 max-w-md text-sm leading-relaxed text-muted">
                Nastao na isti način na koji radimo i custom projekte: ušli smo u
                građevinske firme, razumjeli operativu i izgradili sustav oko nje.{" "}
                <Link href="/briksy/studija-slucaja" className="font-medium text-accent hover:underline">
                  Studija slučaja →
                </Link>
              </p>
            </div>
            <AnimateOnScroll>
              <div className="rounded-3xl bg-slate-50 p-3 md:p-5">
                <InvoiceMockup />
              </div>
            </AnimateOnScroll>
          </div>
        </div>
      </section>

      <section className="bg-gradient-to-br from-accent to-blue-800 py-24 text-white md:py-32">
        <div className="mx-auto max-w-6xl px-6">
          <p className="text-xs font-semibold uppercase tracking-widest text-blue-200">Što Briksy radi</p>
          <h2 className="mt-4 max-w-2xl text-4xl font-bold leading-tight tracking-tight md:text-5xl">
            Od troškovnika do situacije, bez prepisivanja.
          </h2>
          <AnimateOnScroll>
            <div className="mt-14 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
              {features.map((f) => (
                <div key={f.title} className="rounded-2xl bg-white/10 p-7 ring-1 ring-white/15">
                  <h3 className="text-lg font-semibold">{f.title}</h3>
                  <p className="mt-1.5 text-sm leading-relaxed text-blue-100">{f.desc}</p>
                </div>
              ))}
            </div>
          </AnimateOnScroll>
        </div>
      </section>

      <CTASection
        title="Želite vidjeti Briksy u akciji?"
        text="Demo prilagođen vašoj firmi. Ako nije za vas, nema pritiska ni naknadnih poziva."
      />
    </>
  );
}
