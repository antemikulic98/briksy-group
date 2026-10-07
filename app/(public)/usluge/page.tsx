import Link from "next/link";
import AnimateOnScroll from "@/app/components/animate-on-scroll";
import SectionHeading from "@/app/components/section-heading";
import CTASection from "@/app/components/cta-section";

export const metadata = {
  title: "Usluge — Software po mjeri, integracije i automatizacija",
  description:
    "Software po mjeri, integracije s ERP-om i računovodstvom, automatizacija i AI obrada dokumenata. Dolazimo u firmu, učimo kako radite i gradimo oko toga.",
  alternates: { canonical: "https://briksygroup.com/usluge" },
  openGraph: {
    title: "Usluge — Software po mjeri, integracije i automatizacija",
    description: "Software po mjeri, integracije s postojećim sustavima i automatizacija procesa za operativne firme.",
    url: "https://briksygroup.com/usluge",
  },
};

const services = [
  {
    title: "Analiza poslovanja i dijagnoza",
    description:
      "Dolazimo u firmu i gledamo kako informacije stvarno putuju.",
    includes: [
      "Dolazak u firmu i praćenje procesa na terenu",
      "Mapiranje tokova podataka i dokumenata",
      "Popis procesa koje najviše vrijedi digitalizirati",
    ],
  },
  {
    title: "Software po mjeri",
    description:
      "Aplikacije građene oko vaših procesa, od jednog modula do cijelog sustava.",
    includes: [
      "Operativni sustavi za ured i teren",
      "Radni nalozi, projekti, skladište, dokumenti",
      "Dashboardi i izvještaji za upravu",
    ],
  },
  {
    title: "Integracije s postojećim sustavima",
    description:
      "ERP, računovodstvo i alati koje već koristite, bez prepisivanja.",
    includes: [
      "Dvosmjerna razmjena podataka s ERP-om",
      "Povezivanje računovodstvenih i bankovnih sustava",
      "API razvoj i povezivanje servisa",
    ],
  },
  {
    title: "Automatizacija i AI obrada dokumenata",
    description:
      "Računi, ponude i troškovnici se čitaju sami. Vi samo potvrdite.",
    includes: [
      "Čitanje računa, ponuda i troškovnika",
      "Automatska kategorizacija i povezivanje s projektima",
      "Obavijesti i odobrenja bez mailova",
    ],
  },
  {
    title: "Edukacija i podrška",
    description:
      "Obuka na stvarnim podacima i podrška dok firma raste.",
    includes: [
      "Obuka za sve razine korisnika",
      "Dokumentacija i video upute",
      "Kontinuirana tehnička podrška",
    ],
  },
  {
    title: "Briksy za građevinarstvo",
    description:
      "Gotov ERP za građevinske firme: ured, financije, skladište i gradilište.",
    includes: [
      "AI uvoz troškovnika i usporedba ponuda",
      "Radni nalozi i dnevnici s terena",
      "Trošak po stavci troškovnika",
    ],
    link: { href: "/briksy", label: "Više o Briksyju →" },
  },
];

const reasons = [
  { title: "Dolazimo k vama", desc: "Gledamo kako ljudi stvarno rade, ne kako piše u proceduri." },
  { title: "Gradimo oko postojećeg", desc: "Ono što radi ostaje. Dodajemo dio koji nedostaje." },
  { title: "Fazno, bez zaustavljanja", desc: "Prvo ono što najviše boli. Svaka faza je upotrebljiva." },
  { title: "AI gdje ima smisla", desc: "Tamo gdje mjerljivo skraćuje posao, ne kao buzzword." },
  { title: "Vlastiti proizvod kao dokaz", desc: "Briksy je ERP koji smo izgradili na isti način." },
  { title: "Dugoročno partnerstvo", desc: "Ostajemo nakon isporuke i razvijamo sustav s vama." },
];

const questions = [
  {
    q: "Koliko košta?",
    a: "Ovisi o opsegu. Nakon početnog razgovora i dijagnoze dobivate jasan prijedlog s okvirnom procjenom prije bilo kakve obveze. Projekte radimo u fazama pa i investicija ide postupno.",
  },
  {
    q: "Koliko traje?",
    a: "Prva upotrebljiva faza obično je spremna unutar nekoliko tjedana. Veći sustavi se grade u više faza kroz nekoliko mjeseci, bez zaustavljanja poslovanja.",
  },
  {
    q: "Moramo li mijenjati ERP ili postojeće alate?",
    a: "Ne. Analiziramo što imate i što radi. Nova rješenja integriramo s postojećim sustavima, a zamjenu predlažemo samo tamo gdje ima smisla.",
  },
  {
    q: "Hoće li zaposlenici prihvatiti novi sustav?",
    a: "Sustav gradimo s ljudima koji ga koriste, oko načina na koji već rade. Obuka ide na stvarnim podacima, a prve faze namjerno uklanjaju posao koji im najviše smeta.",
  },
  {
    q: "Je li Briksy samo za građevinarstvo?",
    a: "Briksy kao proizvod da. Briksy Group gradi software po mjeri i integracije za proizvodnju, logistiku, distribuciju, servisne i druge operativne firme.",
  },
  {
    q: "Radite li s manjim firmama?",
    a: "Najviše vrijednosti donosimo firmama sa stvarnom operativnom kompleksnošću: više ljudi, lokacija, dokumenata ili terenskog rada. Ako niste sigurni, javite se i iskreno ćemo reći.",
  },
];

export default function UslugePage() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "BreadcrumbList",
        itemListElement: [
          { "@type": "ListItem", position: 1, name: "Početna", item: "https://briksygroup.com" },
          { "@type": "ListItem", position: 2, name: "Usluge", item: "https://briksygroup.com/usluge" },
        ],
      },
      {
        "@type": "Service",
        name: "Poslovni software po mjeri",
        provider: { "@id": "https://briksygroup.com/#organization" },
        description: "Software po mjeri, integracije s postojećim sustavima, automatizacija i AI obrada dokumenata za operativne firme.",
        areaServed: { "@type": "Country", name: "Croatia" },
        serviceType: "Razvoj poslovnog softwarea",
      },
      {
        "@type": "FAQPage",
        mainEntity: questions.map((item) => ({
          "@type": "Question",
          name: item.q,
          acceptedAnswer: { "@type": "Answer", text: item.a },
        })),
      },
    ],
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />

      {/* Hero + usluge */}
      <section className="bg-white pt-16">
        <div className="mx-auto max-w-6xl px-6 py-20 md:py-28">
          <SectionHeading
            as="h1"
            eyebrow="Usluge"
            title="Od dijagnoze do sustava koji vaša firma stvarno koristi."
            description="Povezujemo procese, ljude i podatke u jedan sustav, uz integracije s alatima koje već koristite."
          />

          <AnimateOnScroll>
            <div className="mt-14 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
              {services.map((service) => (
                <div key={service.title} className="flex flex-col rounded-2xl bg-slate-50 p-7">
                  <h2 className="text-lg font-semibold">{service.title}</h2>
                  <p className="mt-2 text-sm leading-relaxed text-muted">{service.description}</p>
                  <ul className="mt-4 space-y-2">
                    {service.includes.map((item) => (
                      <li key={item} className="flex items-start gap-2.5 text-sm">
                        <svg className="mt-0.5 h-4 w-4 shrink-0 text-accent" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                        </svg>
                        <span className="text-foreground/80">{item}</span>
                      </li>
                    ))}
                  </ul>
                  {service.link && (
                    <Link href={service.link.href} className="mt-5 text-sm font-medium text-accent hover:underline">
                      {service.link.label}
                    </Link>
                  )}
                </div>
              ))}
            </div>
          </AnimateOnScroll>
        </div>
      </section>

      {/* Zašto mi */}
      <section className="bg-gradient-to-br from-accent to-blue-800 py-24 text-white md:py-32">
        <div className="mx-auto max-w-6xl px-6">
          <p className="text-xs font-semibold uppercase tracking-widest text-blue-200">Zašto Briksy Group</p>
          <h2 className="mt-4 max-w-2xl text-4xl font-bold leading-tight tracking-tight md:text-5xl">Što nas razlikuje od klasične software agencije.</h2>
          <AnimateOnScroll>
            <div className="mt-14 grid gap-x-10 gap-y-8 md:grid-cols-2 lg:grid-cols-3">
              {reasons.map((r) => (
                <div key={r.title} className="border-t border-white/25 pt-5">
                  <h3 className="text-lg font-semibold">{r.title}</h3>
                  <p className="mt-1.5 text-sm leading-relaxed text-blue-100">{r.desc}</p>
                </div>
              ))}
            </div>
          </AnimateOnScroll>
        </div>
      </section>

      {/* FAQ */}
      <section className="bg-white py-24 md:py-32">
        <div className="mx-auto max-w-6xl px-6">
          <div className="grid gap-12 lg:grid-cols-12">
            <div className="lg:col-span-4">
              <SectionHeading
                eyebrow="Česta pitanja"
                title="Ono što nas najčešće pitaju."
                description="Nema odgovora? Javite se, odgovaramo u roku od jednog radnog dana."
              />
            </div>
            <div className="divide-y divide-border lg:col-span-8">
              {questions.map((item) => (
                <div key={item.q} className="py-5 first:pt-0 last:pb-0">
                  <h3 className="font-semibold">{item.q}</h3>
                  <p className="mt-1.5 text-sm leading-relaxed text-muted">{item.a}</p>
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
