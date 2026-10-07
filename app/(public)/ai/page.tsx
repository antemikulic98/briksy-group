import AnimateOnScroll from "@/app/components/animate-on-scroll";
import CTASection from "@/app/components/cta-section";

export const metadata = {
  title: "AI u poslovanju — Obrada dokumenata i automatizacija",
  description:
    "AI primjenjujemo tamo gdje mjerljivo skraćuje posao: čitanje računa, ponuda i troškovnika, kategorizacija i povezivanje s projektima. Čovjek samo potvrdi.",
  alternates: { canonical: "https://briksygroup.com/ai" },
  openGraph: {
    title: "AI u poslovanju — Obrada dokumenata i automatizacija",
    description: "AI tamo gdje mjerljivo skraćuje posao. Čovjek samo potvrdi.",
    url: "https://briksygroup.com/ai",
  },
};

const useCases = [
  { title: "Ulazni računi", desc: "AI pročita račun, prepozna dobavljača i stavke, poveže ih s projektom. Vi potvrdite." },
  { title: "Ponude i troškovnici", desc: "Uvoz iz PDF-a ili Excela u strukturirane stavke, spremno za usporedbu." },
  { title: "Kategorizacija", desc: "Dokumenti se sami razvrstavaju po projektu, odjelu ili vrsti troška." },
  { title: "Obavijesti i odobrenja", desc: "Odobrenja i upozorenja idu ljudima koji ih trebaju, bez mailova." },
];

const flow = [
  { n: "200 PDF-ova mjesečno", d: "stižu mailom od dobavljača" },
  { n: "AI ih pročita", d: "izvuče podatke, prepozna dobavljača" },
  { n: "Poveže dokument", d: "s projektom ili odjelom" },
  { n: "Čovjek potvrdi", d: "jedan klik umjesto prepisivanja" },
];

const faq = [
  {
    q: "Gdje AI stvarno štedi vrijeme?",
    a: "Na repetitivnim zadacima s puno dokumenata: unos računa, uvoz ponuda, razvrstavanje i povezivanje. Tamo posao od sati postaje potvrda od nekoliko sekundi.",
  },
  {
    q: "Trebamo li tehničko znanje?",
    a: "Ne. AI je ugrađen u sustav koji već koristite. Zaposlenik vidi prijedlog i potvrdi ga ili ispravi.",
  },
  {
    q: "Hoće li AI zamijeniti zaposlenike?",
    a: "Ne. Preuzima prepisivanje i razvrstavanje, a ljudi se bave onim što zahtijeva odluku, pregovaranje i kontakt.",
  },
  {
    q: "Koliko košta?",
    a: "Ovisi o opsegu. Počinjemo razgovorom i dijagnozom koja pokaže gdje AI donosi najveću uštedu, pa tek onda dajemo prijedlog s okvirnom procjenom.",
  },
];

export default function AIPage() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "BreadcrumbList",
        itemListElement: [
          { "@type": "ListItem", position: 1, name: "Početna", item: "https://briksygroup.com" },
          { "@type": "ListItem", position: 2, name: "Usluge", item: "https://briksygroup.com/usluge" },
          { "@type": "ListItem", position: 3, name: "AI u poslovanju", item: "https://briksygroup.com/ai" },
        ],
      },
      {
        "@type": "Service",
        name: "AI obrada dokumenata i automatizacija",
        provider: { "@id": "https://briksygroup.com/#organization" },
        description: "Primjena AI-ja u poslovne procese: čitanje dokumenata, kategorizacija, povezivanje s projektima i automatizacija odobrenja.",
        areaServed: { "@type": "Country", name: "Croatia" },
        serviceType: "AI implementacija",
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
            <p className="text-xs font-semibold uppercase tracking-widest text-accent">AI u poslovanju</p>
            <h1 className="mt-4 text-4xl font-bold leading-[1.05] tracking-tight md:text-6xl">
              AI obrada dokumenata i automatizacija procesa.
            </h1>
            <p className="mt-6 max-w-xl text-lg leading-relaxed text-muted">
              Ne prodajemo AI. Prodajemo uklonjen posao. Proces koji je trajao sate
              svodi se na potvrdu jednog čovjeka.
            </p>
          </div>

          <AnimateOnScroll>
            <div className="mt-14 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
              {useCases.map((u) => (
                <div key={u.title} className="rounded-2xl bg-slate-50 p-7">
                  <h3 className="text-lg font-semibold">{u.title}</h3>
                  <p className="mt-1.5 text-sm leading-relaxed text-muted">{u.desc}</p>
                </div>
              ))}
            </div>
          </AnimateOnScroll>
        </div>
      </section>

      <section className="bg-gradient-to-br from-accent to-blue-800 py-24 text-white md:py-32">
        <div className="mx-auto max-w-6xl px-6">
          <p className="text-xs font-semibold uppercase tracking-widest text-blue-200">Primjer iz prakse</p>
          <h2 className="mt-4 max-w-2xl text-4xl font-bold leading-tight tracking-tight md:text-5xl">
            Dobivate 200 PDF-ova mjesečno?
          </h2>
          <AnimateOnScroll>
            <ol className="mt-14 grid gap-10 md:grid-cols-4 md:gap-8">
              {flow.map((f, i) => (
                <li key={f.n} className="border-t border-white/25 pt-6">
                  <span className="text-sm font-semibold text-blue-200">0{i + 1}</span>
                  <h3 className="mt-3 text-xl font-semibold leading-snug">{f.n}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-blue-100">{f.d}</p>
                </li>
              ))}
            </ol>
          </AnimateOnScroll>
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
