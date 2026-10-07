import Link from "next/link";
import AnimateOnScroll from "@/app/components/animate-on-scroll";
import CTASection from "@/app/components/cta-section";

export const metadata = {
  title: "Digitalizacija poslovanja — Što znači i kako početi",
  description:
    "Što zapravo znači digitalizirati firmu, gdje se najčešće počinje i što se ne mora mijenjati. Objašnjeno jednostavno, bez tehničkog žargona.",
  alternates: { canonical: "https://briksygroup.com/digitalizacija" },
  openGraph: {
    title: "Digitalizacija poslovanja — Što znači i kako početi",
    description: "Što znači digitalizirati firmu, gdje se počinje i što se ne mora mijenjati.",
    url: "https://briksygroup.com/digitalizacija",
  },
};

const areas = [
  { title: "Dokumenti", desc: "Jedan sustav umjesto fascikli i mailova, s poviješću i pristupom po ulozi." },
  { title: "Operativa", desc: "Nalozi, projekti, materijal i sati na jednom mjestu, s terena i iz ureda." },
  { title: "Financije", desc: "Trošak vezan uz projekt u trenutku nastanka, ne na kraju mjeseca." },
  { title: "Odlučivanje", desc: "Uprava vidi stanje odmah, bez čekanja izvještaja." },
];

const faq = [
  {
    q: "Što je digitalizacija poslovanja?",
    a: "Zamjena ručnih, papirnatih i nepovezanih procesa sustavom u kojem podaci putuju sami. Ne samo prebacivanje u računalo, nego uklanjanje koraka: prepisivanja, slanja mailova i čekanja na informaciju.",
  },
  {
    q: "Moramo li mijenjati ERP ili postojeće alate?",
    a: "Ne. Analiziramo što imate i što radi. Nova rješenja integriramo s postojećim sustavima, a zamjenu predlažemo samo tamo gdje ima smisla.",
  },
  {
    q: "Koliko košta?",
    a: "Ovisi o opsegu. Nakon razgovora i dijagnoze dobivate jasan prijedlog s okvirnom procjenom prije bilo kakve obveze. Radimo u fazama pa i investicija ide postupno.",
  },
  {
    q: "Koliko traje?",
    a: "Prva upotrebljiva faza obično je spremna unutar nekoliko tjedana. Veći sustavi se grade kroz više faza, bez zaustavljanja poslovanja.",
  },
];

const principles = [
  "Prvo proces koji stvara najviše ručnog rada.",
  "Svaka faza upotrebljiva sama za sebe.",
  "Integracija s postojećim ERP-om i računovodstvom.",
  "Obuka na stvarnim podacima, ne na prezentaciji.",
];

export default function DigitalizacijaPage() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "BreadcrumbList",
        itemListElement: [
          { "@type": "ListItem", position: 1, name: "Početna", item: "https://briksygroup.com" },
          { "@type": "ListItem", position: 2, name: "Usluge", item: "https://briksygroup.com/usluge" },
          { "@type": "ListItem", position: 3, name: "Digitalizacija", item: "https://briksygroup.com/digitalizacija" },
        ],
      },
      {
        "@type": "Service",
        name: "Digitalizacija poslovanja",
        provider: { "@id": "https://briksygroup.com/#organization" },
        description: "Zamjena ručnih i nepovezanih procesa sustavom u kojem podaci putuju sami, uz integracije s postojećim alatima.",
        areaServed: { "@type": "Country", name: "Croatia" },
        serviceType: "Digitalna transformacija",
      },
      {
        "@type": "FAQPage",
        mainEntity: faq.map((f) => ({
          "@type": "Question",
          name: f.q,
          acceptedAnswer: { "@type": "Answer", text: f.a },
        })),
      },
    ],
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />

      <section className="bg-white pt-16">
        <div className="mx-auto max-w-6xl px-6 py-20 md:py-28">
          <div className="max-w-3xl">
            <p className="text-xs font-semibold uppercase tracking-widest text-accent">Digitalizacija poslovanja</p>
            <h1 className="mt-4 text-4xl font-bold leading-[1.05] tracking-tight md:text-6xl">
              Digitalizacija nije još jedan program. To je uklanjanje koraka.
            </h1>
            <p className="mt-6 max-w-xl text-lg leading-relaxed text-muted">
              Prepisivanje, slanje mailova, čekanje na izvještaj. Svaki od tih
              koraka košta vrijeme i stvara greške. Mi ih uklanjamo.
            </p>
          </div>

          <AnimateOnScroll>
            <div className="mt-14 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
              {areas.map((a) => (
                <div key={a.title} className="rounded-2xl bg-slate-50 p-7">
                  <h3 className="text-lg font-semibold">{a.title}</h3>
                  <p className="mt-1.5 text-sm leading-relaxed text-muted">{a.desc}</p>
                </div>
              ))}
            </div>
          </AnimateOnScroll>
        </div>
      </section>

      <section className="bg-gradient-to-br from-accent to-blue-800 py-24 text-white md:py-32">
        <div className="mx-auto max-w-6xl px-6">
          <div className="grid gap-12 lg:grid-cols-2 lg:items-center">
            <div>
              <p className="text-xs font-semibold uppercase tracking-widest text-blue-200">Gdje se počinje</p>
              <h2 className="mt-4 text-4xl font-bold leading-tight tracking-tight md:text-5xl">
                Ne morate mijenjati cijeli sustav.
              </h2>
              <p className="mt-6 max-w-md text-lg leading-relaxed text-blue-100">
                Imate ERP, ali pola firme je još u Excelu, mailovima i WhatsAppu?
                Upravo tu najčešće počinjemo: gradimo dio koji nedostaje i
                povezujemo ga s onim što već radi.
              </p>
              <Link
                href="/briksy/studija-slucaja"
                className="mt-8 inline-flex items-center gap-2 rounded-full bg-white px-6 py-3.5 text-sm font-semibold text-accent transition-colors hover:bg-blue-50"
              >
                Pogledajte primjer iz prakse →
              </Link>
            </div>
            <ul className="space-y-4">
              {principles.map((t) => (
                <li key={t} className="flex items-start gap-3 border-t border-white/20 pt-4 text-lg font-medium leading-snug">
                  <svg className="mt-1 h-5 w-5 shrink-0 text-blue-200" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                  </svg>
                  {t}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      <section className="bg-white py-24 md:py-32">
        <div className="mx-auto max-w-6xl px-6">
          <div className="grid gap-12 lg:grid-cols-12">
            <div className="lg:col-span-4">
              <p className="text-xs font-semibold uppercase tracking-widest text-accent">Česta pitanja</p>
              <h2 className="mt-4 text-4xl font-bold leading-tight tracking-tight md:text-5xl">
                Ono što nas najčešće pitaju.
              </h2>
            </div>
            <div className="divide-y divide-border lg:col-span-8">
              {faq.map((f) => (
                <div key={f.q} className="py-6 first:pt-0 last:pb-0">
                  <h3 className="text-lg font-semibold">{f.q}</h3>
                  <p className="mt-2 leading-relaxed text-muted">{f.a}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <CTASection />
    </>
  );
}
