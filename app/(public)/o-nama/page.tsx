import Image from "next/image";
import AnimateOnScroll from "@/app/components/animate-on-scroll";
import CTASection from "@/app/components/cta-section";

export const metadata = {
  title: "Kako radimo — Prvo učimo kako radite, onda gradimo",
  description:
    "Dolazimo u firmu, učimo kako stvarno radite i tek onda gradimo. Četiri koraka od prvog razgovora do sustava koji vaša firma koristi.",
  alternates: { canonical: "https://briksygroup.com/o-nama" },
  openGraph: {
    title: "Kako radimo — Briksy Group",
    description: "Dolazimo u firmu, učimo kako stvarno radite i tek onda gradimo.",
    url: "https://briksygroup.com/o-nama",
  },
};

const steps = [
  { title: "Upoznamo vaše poslovanje", desc: "Dolazimo u firmu, razgovaramo s ljudima koji rade posao i gledamo kako informacije stvarno putuju." },
  { title: "Dijagnoza i prijedlog", desc: "Što vrijedi digitalizirati, što ne dirati, i treba li custom software, integracija ili postojeći alat." },
  { title: "Gradimo u fazama", desc: "Prvo ono što najviše boli. Svaka faza je upotrebljiva sama za sebe i ne zaustavlja poslovanje." },
  { title: "Ostajemo uz vas", desc: "Obuka na stvarnim podacima, podrška i razvoj dok se firma mijenja i raste." },
];

const tkoSmo = [
  { title: "Od 2018.", desc: "Hrvatska tvrtka za poslovni software. Sjedište u Kaštel Sućurcu, radimo po cijeloj Hrvatskoj." },
  { title: "Konzultanti i developeri", desc: "U timu su ljudi s iskustvom u građevinarstvu, proizvodnji i logistici, ne samo programeri." },
  { title: "Vlastiti proizvod", desc: "Briksy, ERP za građevinske firme, izgrađen je na isti način na koji radimo i vaš projekt." },
];

const principles = [
  { title: "Gledamo, ne pitamo", desc: "Ono što vlasnik misli da se događa i ono što se stvarno događa često su dvije različite stvari." },
  { title: "Gradimo oko postojećeg", desc: "ERP i alati koji rade ostaju. Dodajemo dio koji nedostaje." },
  { title: "Iskreno", desc: "Ako digitalizacija neće donijeti rezultat, reći ćemo vam. Ne prodajemo ono što vam ne treba." },
  { title: "Bez žargona", desc: "Objašnjavamo jednostavno što radimo, zašto i što možete očekivati." },
  { title: "Mjerljivo", desc: "Prije implementacije dogovaramo što znači uspjeh, pa to i mjerimo." },
  { title: "Dugoročno", desc: "Ne predajemo software i nestajemo. Sustav raste s firmom." },
];

export default function ONamaPage() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "BreadcrumbList",
        itemListElement: [
          { "@type": "ListItem", position: 1, name: "Početna", item: "https://briksygroup.com" },
          { "@type": "ListItem", position: 2, name: "Kako radimo", item: "https://briksygroup.com/o-nama" },
        ],
      },
      {
        "@type": "AboutPage",
        name: "Kako radimo — Briksy Group",
        description: "Dolazimo u firmu, učimo kako stvarno radite i tek onda gradimo.",
        url: "https://briksygroup.com/o-nama",
        mainEntity: { "@type": "Organization", "@id": "https://briksygroup.com/#organization" },
      },
    ],
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />

      <section className="bg-white pt-16">
        <div className="mx-auto max-w-6xl px-6 py-20 md:py-28">
          <div className="grid gap-12 lg:grid-cols-2 lg:items-center">
            <div>
              <p className="text-xs font-semibold uppercase tracking-widest text-accent">Kako radimo</p>
              <h1 className="mt-4 text-4xl font-bold leading-[1.05] tracking-tight md:text-6xl">
                Prvo učimo kako radite. Onda gradimo.
              </h1>
              <p className="mt-6 max-w-md text-lg leading-relaxed text-muted">
                Software koji nastane bez razumijevanja svakodnevnog rada završi
                kao nekorišten alat. Zato prvo dolazimo k vama.
              </p>
            </div>
            <div className="relative min-h-[300px] overflow-hidden rounded-3xl lg:min-h-[420px]">
              <Image
                src="/img/tim-analiza.jpg"
                alt="Tim zajedno analizira poslovne procese"
                fill
                sizes="(min-width: 1024px) 50vw, 100vw"
                className="object-cover"
                priority
              />
            </div>
          </div>
        </div>
      </section>

      <section className="bg-gradient-to-br from-accent to-blue-800 py-24 text-white md:py-32">
        <div className="mx-auto max-w-6xl px-6">
          <p className="text-xs font-semibold uppercase tracking-widest text-blue-200">Četiri koraka</p>
          <h2 className="mt-4 max-w-2xl text-4xl font-bold leading-tight tracking-tight md:text-5xl">
            Od prvog razgovora do sustava koji firma stvarno koristi.
          </h2>
          <AnimateOnScroll>
            <ol className="mt-14 grid gap-10 md:grid-cols-2 lg:grid-cols-4 lg:gap-8">
              {steps.map((s, i) => (
                <li key={s.title} className="border-t border-white/25 pt-6">
                  <span className="text-sm font-semibold text-blue-200">0{i + 1}</span>
                  <h3 className="mt-3 text-xl font-semibold leading-snug">{s.title}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-blue-100">{s.desc}</p>
                </li>
              ))}
            </ol>
          </AnimateOnScroll>
        </div>
      </section>

      <section className="bg-white py-24 md:py-32">
        <div className="mx-auto max-w-6xl px-6">
          <div className="grid gap-10 border-b border-border pb-20 md:grid-cols-12 md:pb-24">
            <div className="md:col-span-4">
              <p className="text-xs font-semibold uppercase tracking-widest text-accent">Tko smo</p>
              <h2 className="mt-4 text-3xl font-bold leading-tight tracking-tight md:text-4xl">
                Briksy Group d.o.o.
              </h2>
            </div>
            <div className="grid gap-8 sm:grid-cols-3 md:col-span-8">
              {tkoSmo.map((t) => (
                <div key={t.title}>
                  <p className="text-lg font-semibold">{t.title}</p>
                  <p className="mt-1.5 text-sm leading-relaxed text-muted">{t.desc}</p>
                </div>
              ))}
            </div>
          </div>

          <p className="mt-20 text-xs font-semibold uppercase tracking-widest text-accent md:mt-24">Principi</p>
          <h2 className="mt-4 max-w-2xl text-4xl font-bold leading-tight tracking-tight md:text-5xl">
            Kako razmišljamo o svakom projektu.
          </h2>
          <AnimateOnScroll>
            <div className="mt-14 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
              {principles.map((p) => (
                <div key={p.title} className="rounded-2xl bg-slate-50 p-7">
                  <h3 className="text-lg font-semibold">{p.title}</h3>
                  <p className="mt-1.5 text-sm leading-relaxed text-muted">{p.desc}</p>
                </div>
              ))}
            </div>
          </AnimateOnScroll>
        </div>
      </section>

      <CTASection />
    </>
  );
}
