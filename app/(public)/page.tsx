import Image from "next/image";
import Link from "next/link";
import ContactForm from "@/app/components/contact-form";
import AnimateOnScroll from "@/app/components/animate-on-scroll";
import AnimatedCounter from "@/app/components/animated-counter";

function Hero() {
  return (
    <section className="relative overflow-hidden border-b border-border bg-gradient-to-br from-slate-50 via-white to-blue-50/40 pt-16">
      {/* Dot grid pattern */}
      <div className="pointer-events-none absolute inset-0 opacity-[0.04]" style={{ backgroundImage: "radial-gradient(circle, #2563eb 1px, transparent 1px)", backgroundSize: "20px 20px" }} />

      {/* Floating dekorativni elementi — istaknuti */}
      <div className="pointer-events-none absolute left-[6%] top-24 hidden opacity-30 lg:block">
        <svg width="80" height="80" viewBox="0 0 80 80" fill="none">
          <rect x="8" y="8" width="64" height="64" rx="16" stroke="#2563eb" strokeWidth="2" strokeDasharray="6 4" />
          <rect x="24" y="24" width="32" height="32" rx="8" stroke="#2563eb" strokeWidth="1.5" opacity="0.5" />
        </svg>
      </div>
      <div className="pointer-events-none absolute right-[8%] top-28 hidden opacity-30 lg:block">
        <svg width="100" height="100" viewBox="0 0 100 100" fill="none">
          <circle cx="50" cy="50" r="45" stroke="#2563eb" strokeWidth="1.5" />
          <circle cx="50" cy="50" r="28" stroke="#2563eb" strokeWidth="1.5" strokeDasharray="4 4" />
          <circle cx="50" cy="50" r="10" stroke="#2563eb" strokeWidth="1.5" />
          <circle cx="50" cy="50" r="3" fill="#2563eb" />
        </svg>
      </div>
      <div className="pointer-events-none absolute bottom-40 left-[5%] hidden opacity-25 lg:block">
        <svg width="72" height="72" viewBox="0 0 72 72" fill="none">
          <path d="M36 4L68 36L36 68L4 36Z" stroke="#2563eb" strokeWidth="1.5" />
          <path d="M36 18L54 36L36 54L18 36Z" stroke="#2563eb" strokeWidth="1.5" strokeDasharray="3 3" />
          <circle cx="36" cy="36" r="4" fill="#2563eb" opacity="0.4" />
        </svg>
      </div>
      <div className="pointer-events-none absolute bottom-32 right-[7%] hidden opacity-30 lg:block">
        <svg width="64" height="64" viewBox="0 0 64 64" fill="none">
          <path d="M32 2L62 32L32 62L2 32Z" stroke="#2563eb" strokeWidth="2" />
          <circle cx="32" cy="32" r="3" fill="#2563eb" opacity="0.5" />
        </svg>
      </div>
      <div className="pointer-events-none absolute right-[25%] top-20 hidden opacity-20 lg:block">
        <svg width="48" height="48" viewBox="0 0 48 48" fill="none">
          <line x1="0" y1="24" x2="48" y2="24" stroke="#2563eb" strokeWidth="2" />
          <line x1="24" y1="0" x2="24" y2="48" stroke="#2563eb" strokeWidth="2" />
          <circle cx="24" cy="24" r="6" stroke="#2563eb" strokeWidth="1.5" />
        </svg>
      </div>
      <div className="pointer-events-none absolute bottom-44 left-[28%] hidden opacity-20 lg:block">
        <svg width="44" height="44" viewBox="0 0 44 44" fill="none">
          <polygon points="22,2 42,36 2,36" stroke="#2563eb" strokeWidth="1.5" fill="none" />
          <polygon points="22,14 32,32 12,32" stroke="#2563eb" strokeWidth="1" fill="none" opacity="0.5" />
        </svg>
      </div>
      <div className="pointer-events-none absolute left-[18%] top-[55%] hidden opacity-15 lg:block">
        <svg width="36" height="36" viewBox="0 0 36 36" fill="none">
          <circle cx="18" cy="18" r="16" stroke="#2563eb" strokeWidth="1.5" strokeDasharray="2 3" />
          <circle cx="18" cy="18" r="5" fill="#2563eb" opacity="0.15" />
        </svg>
      </div>
      <div className="pointer-events-none absolute right-[20%] bottom-28 hidden opacity-20 lg:block">
        <svg width="40" height="40" viewBox="0 0 40 40" fill="none">
          <rect x="4" y="4" width="32" height="32" rx="4" stroke="#2563eb" strokeWidth="1.5" />
          <rect x="12" y="12" width="16" height="16" rx="2" stroke="#2563eb" strokeWidth="1" strokeDasharray="2 2" />
        </svg>
      </div>

      <div className="relative mx-auto max-w-7xl px-6 py-16 md:py-20 lg:py-24">
        <div className="mx-auto max-w-3xl text-center">
          {/* Badge */}
          <div className="animate-slide-up inline-flex items-center gap-2 rounded-full border border-accent/20 bg-accent/5 px-4 py-1.5 opacity-0" style={{ animationDelay: "0.1s", animationFillMode: "forwards" }}>
            <span className="relative flex h-2 w-2">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-accent opacity-75" />
              <span className="relative inline-flex h-2 w-2 rounded-full bg-accent" />
            </span>
            <span className="text-xs font-semibold text-accent">Digitalizacija poslovanja</span>
          </div>

          <h1 className="animate-slide-up mt-5 text-4xl font-bold leading-tight tracking-tight opacity-0 md:text-6xl lg:text-7xl" style={{ animationDelay: "0.25s", animationFillMode: "forwards" }}>
            Manje ručnog rada.
            <br />
            <span className="text-accent">Više rezultata.</span>
          </h1>

          <p className="animate-slide-up mx-auto mt-5 max-w-xl text-lg leading-relaxed text-muted opacity-0 md:text-xl" style={{ animationDelay: "0.4s", animationFillMode: "forwards" }}>
            Analiziramo vaše procese, pronalazimo gdje gubite vrijeme
            i gradimo rješenja koja povećavaju efikasnost.
          </p>

          <div className="animate-slide-up mt-8 flex flex-col justify-center gap-3 opacity-0 sm:flex-row" style={{ animationDelay: "0.55s", animationFillMode: "forwards" }}>
            <Link
              href="/kontakt"
              className="group inline-flex items-center justify-center gap-2 rounded-xl bg-accent px-8 py-4 text-base font-semibold text-white shadow-lg shadow-accent/20 transition-all hover:-translate-y-0.5 hover:bg-accent-dark hover:shadow-xl hover:shadow-accent/30"
            >
              Besplatna analiza poslovanja
              <svg className="h-4 w-4 transition-transform group-hover:translate-x-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </Link>
            <Link
              href="/o-nama"
              className="inline-flex items-center justify-center rounded-xl border border-border bg-white/80 px-8 py-4 text-base font-medium backdrop-blur-sm transition-all hover:-translate-y-0.5 hover:shadow-md"
            >
              Kako to radimo?
            </Link>
          </div>
        </div>

        {/* Stat kartice */}
        <div className="mx-auto mt-14 grid max-w-4xl grid-cols-2 gap-4 md:grid-cols-4">
          {[
            { value: 7, suffix: "+", label: "Godina iskustva", icon: <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" /></svg> },
            { value: 100, suffix: "%", label: "Rješenja po mjeri", icon: <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z" /></svg> },
            { value: 0, suffix: " €", label: "Početna analiza", static: true, icon: <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg> },
            { value: 24, suffix: "h", label: "Vrijeme odgovora", icon: <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" /></svg> },
          ].map((stat, i) => (
            <AnimateOnScroll key={stat.label} delay={i * 100}>
              <div className="group rounded-xl border border-border bg-white/80 p-4 text-center backdrop-blur-sm transition-all duration-300 hover:-translate-y-1 hover:border-accent/30 hover:shadow-lg">
                <div className="mx-auto mb-2 flex h-8 w-8 items-center justify-center rounded-lg bg-accent/10 text-accent transition-colors group-hover:bg-accent group-hover:text-white">
                  {stat.icon}
                </div>
                <div className="text-2xl font-bold text-foreground">
                  {stat.static ? (
                    `${stat.value}${stat.suffix}`
                  ) : (
                    <AnimatedCounter end={stat.value} suffix={stat.suffix} />
                  )}
                </div>
                <div className="mt-0.5 text-xs font-medium text-muted">{stat.label}</div>
              </div>
            </AnimateOnScroll>
          ))}
        </div>
      </div>

      {/* Background glow */}
      <div className="pointer-events-none absolute -right-40 -top-40 h-[500px] w-[500px] rounded-full bg-accent/5 blur-3xl" />
      <div className="pointer-events-none absolute -bottom-20 -left-20 h-[300px] w-[300px] rounded-full bg-blue-100/50 blur-3xl" />
    </section>
  );
}

function KakoRadimo() {
  const steps = [
    {
      num: "01",
      title: "Upoznamo vaše poslovanje",
      desc: "Učimo kako vaša firma funkcionira, razgovaramo s ljudima i mapiramo procese.",
      icon: (
        <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
        </svg>
      ),
    },
    {
      num: "02",
      title: "Pronalazimo prilike za uštede",
      desc: "Identificiramo gdje se gubi vrijeme, gdje nastaju greške i što se može automatizirati.",
      icon: (
        <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
        </svg>
      ),
    },
    {
      num: "03",
      title: "Gradimo rješenje",
      desc: "Razvijamo softver i automatizacije prilagođene točno vašim potrebama.",
      icon: (
        <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" />
        </svg>
      ),
    },
    {
      num: "04",
      title: "Vi rastete",
      desc: "Vaši ljudi rade na onome što je bitno. Mi ostajemo kao dugoročni partner.",
      icon: (
        <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
        </svg>
      ),
    },
  ];

  return (
    <section className="border-b border-border bg-white py-14 md:py-20">
      <div className="mx-auto max-w-7xl px-6">
        <AnimateOnScroll>
          <div className="mx-auto max-w-2xl text-center">
            <p className="text-sm font-medium uppercase tracking-widest text-accent">
              Kako radimo
            </p>
            <h2 className="mt-3 text-3xl font-bold tracking-tight md:text-4xl">
              Četiri koraka do efikasnijeg poslovanja
            </h2>
          </div>
        </AnimateOnScroll>

        <div className="mt-10 grid gap-6 md:grid-cols-2 lg:grid-cols-4">
          {steps.map((step, i) => (
            <AnimateOnScroll key={step.num} delay={i * 100}>
              <div className="group relative rounded-2xl border border-border bg-white p-6 transition-all duration-300 hover:-translate-y-2 hover:border-accent/30 hover:shadow-xl">
                <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-accent/10 text-accent transition-colors group-hover:bg-accent group-hover:text-white">
                  {step.icon}
                </div>
                <div className="mt-4 text-xs font-bold text-accent">{step.num}</div>
                <h3 className="mt-1 text-lg font-semibold">{step.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-muted">{step.desc}</p>
              </div>
            </AnimateOnScroll>
          ))}
        </div>
      </div>
    </section>
  );
}

function UslugePreview() {
  const services = [
    {
      title: "Analiza i konzalting",
      desc: "Mapiramo procese i identificiramo prilike za optimizaciju.",
      icon: (
        <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01" />
        </svg>
      ),
    },
    {
      title: "Softver po mjeri",
      desc: "Web i mobilne aplikacije prilagođene vašem poslovanju.",
      icon: (
        <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
        </svg>
      ),
    },
    {
      title: "AI implementacija",
      desc: "Primjenjujemo AI tamo gdje donosi stvarnu vrijednost.",
      icon: (
        <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
        </svg>
      ),
    },
    {
      title: "Edukacija i podrška",
      desc: "Obučavamo vaš tim i ostajemo dugoročni partner.",
      icon: (
        <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
        </svg>
      ),
    },
  ];

  return (
    <section className="border-b border-border bg-slate-50 py-14 md:py-20">
      <div className="mx-auto max-w-7xl px-6">
        <AnimateOnScroll>
          <div className="flex items-end justify-between">
            <div className="max-w-2xl">
              <p className="text-sm font-medium uppercase tracking-widest text-accent">
                Što radimo
              </p>
              <h2 className="mt-3 text-3xl font-bold tracking-tight md:text-4xl">
                Sve što vam treba za digitalnu transformaciju
              </h2>
            </div>
            <Link href="/usluge" className="hidden text-sm font-medium text-accent hover:underline md:block">
              Sve usluge →
            </Link>
          </div>
        </AnimateOnScroll>

        <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {services.map((s, i) => (
            <AnimateOnScroll key={s.title} delay={i * 100}>
              <div className="group rounded-2xl border border-border bg-white p-6 transition-all duration-300 hover:-translate-y-2 hover:border-accent/30 hover:shadow-xl">
                <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-accent/10 text-accent transition-colors group-hover:bg-accent group-hover:text-white">
                  {s.icon}
                </div>
                <h3 className="mt-4 font-semibold">{s.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-muted">{s.desc}</p>
              </div>
            </AnimateOnScroll>
          ))}
        </div>

        <div className="mt-8 text-center md:hidden">
          <Link href="/usluge" className="text-sm font-medium text-accent hover:underline">
            Sve usluge →
          </Link>
        </div>
      </div>
    </section>
  );
}

function BriksyPreview() {
  return (
    <section className="border-b border-border bg-white py-14 md:py-20">
      <div className="mx-auto max-w-7xl px-6">
        <div className="grid gap-10 lg:grid-cols-2 lg:items-center">
          <AnimateOnScroll>
            <div>
              <p className="text-sm font-medium uppercase tracking-widest text-accent">
                Naš proizvod
              </p>
              <h2 className="mt-3 text-3xl font-bold tracking-tight md:text-4xl">
                Briksy — softver za građevinarstvo
              </h2>
              <p className="mt-4 text-lg leading-relaxed text-muted">
                Financije, realizacija i robno-materijalno na jednom mjestu.
                Bez Excela, bez ručnog prekucavanja.
              </p>
              <div className="mt-8 flex gap-4">
                <Link
                  href="/briksy"
                  className="inline-flex items-center rounded-xl bg-accent px-6 py-3 text-sm font-semibold text-white shadow-lg shadow-accent/20 transition-all hover:-translate-y-0.5 hover:bg-accent-dark"
                >
                  Saznajte više
                </Link>
                <a
                  href="https://briksy.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center rounded-xl border border-border px-6 py-3 text-sm font-medium transition-all hover:-translate-y-0.5 hover:shadow-md"
                >
                  briksy.com
                  <svg className="ml-2 h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                  </svg>
                </a>
              </div>
            </div>
          </AnimateOnScroll>

          <AnimateOnScroll delay={150}>
            <div className="grid grid-cols-2 gap-4">
              {[
                { title: "Financije i realizacija", desc: "Svaki trošak vezan uz projekt u realnom vremenu." },
                { title: "Robno-materijalno", desc: "Količina, cijena, gradilište — sve na jednom mjestu." },
                { title: "Upravljanje projektima", desc: "Od ponude do primopredaje, svaki korak dokumentiran." },
                { title: "Izvještaji na klik", desc: "Automatski generirani bez kopanja po podacima." },
              ].map((item) => (
                <div key={item.title} className="group rounded-xl border border-border p-5 transition-all duration-300 hover:-translate-y-1 hover:border-accent/30 hover:shadow-lg">
                  <h4 className="text-sm font-semibold">{item.title}</h4>
                  <p className="mt-1 text-xs leading-relaxed text-muted">{item.desc}</p>
                </div>
              ))}
            </div>
          </AnimateOnScroll>
        </div>
      </div>
    </section>
  );
}

function CTASection() {
  return (
    <section id="kontakt" className="bg-slate-50 py-14 md:py-20">
      <div className="mx-auto max-w-7xl px-6">
        <div className="grid gap-12 lg:grid-cols-5">
          <AnimateOnScroll className="lg:col-span-2">
            <div>
              <h2 className="text-3xl font-bold tracking-tight md:text-4xl">
                Javite nam se.
              </h2>
              <p className="mt-4 text-lg leading-relaxed text-muted">
                Ispunite formu — javit ćemo vam se u roku od 24 sata. Bez obveza.
              </p>

              <div className="mt-8 space-y-3">
                <a href="mailto:info@briksygroup.com" className="flex items-center gap-3 rounded-xl border border-border bg-white p-4 transition-all hover:-translate-y-0.5 hover:shadow-md">
                  <svg className="h-5 w-5 text-accent" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                  </svg>
                  <div>
                    <div className="text-sm font-semibold">info@briksygroup.com</div>
                    <div className="text-xs text-muted">Odgovaramo u roku od 24 sata</div>
                  </div>
                </a>
                <a href="tel:+385955419712" className="flex items-center gap-3 rounded-xl border border-border bg-white p-4 transition-all hover:-translate-y-0.5 hover:shadow-md">
                  <svg className="h-5 w-5 text-accent" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                  </svg>
                  <div>
                    <div className="text-sm font-semibold">+385 95 541 9712</div>
                    <div className="text-xs text-muted">Radnim danom 8:00–17:00</div>
                  </div>
                </a>
              </div>
            </div>
          </AnimateOnScroll>

          <AnimateOnScroll className="lg:col-span-3" delay={150}>
            <ContactForm />
          </AnimateOnScroll>
        </div>
      </div>
    </section>
  );
}

function PortalBanner() {
  return (
    <section className="border-b border-border bg-white py-10 md:py-14">
      <div className="mx-auto max-w-7xl px-6">
        <AnimateOnScroll>
          <div className="flex flex-col items-center justify-between gap-6 rounded-2xl border border-border bg-gradient-to-r from-slate-50 to-blue-50/40 p-8 md:flex-row md:p-10">
            <div>
              <h3 className="text-xl font-bold text-foreground">
                Već ste naš klijent?
              </h3>
              <p className="mt-2 max-w-lg text-muted">
                Pratite napredak svog projekta u realnom vremenu — faze, postotci i status na jednom mjestu.
              </p>
            </div>
            <Link
              href="/login"
              className="shrink-0 rounded-xl border border-accent bg-white px-8 py-3 text-sm font-semibold text-accent transition-all hover:-translate-y-0.5 hover:bg-accent hover:text-white hover:shadow-lg"
            >
              Prijava u portal
            </Link>
          </div>
        </AnimateOnScroll>
      </div>
    </section>
  );
}

export default function Home() {
  return (
    <>
      <Hero />
      <KakoRadimo />
      <UslugePreview />
      <BriksyPreview />
      <CTASection />
      <PortalBanner />
    </>
  );
}
