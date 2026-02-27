import Link from "next/link";
import { packages, calculatePackagePrice } from "./data";

export const metadata = {
  title: "Boat Supply — Provision Packages",
  description:
    "Pre-made provisioning packages for your sailing trip. Choose a package, customize quantities, and get everything delivered to your marina.",
};

export default function BoatSupplyPage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-50 to-white">
      {/* Hero */}
      <header className="px-4 pt-10 pb-3 sm:px-6 sm:pt-12 md:pt-20 md:pb-8">
        <div className="mx-auto max-w-5xl text-center">
          <div className="inline-flex items-center gap-2 rounded-full bg-accent/10 px-3 py-1 text-xs font-medium text-accent sm:px-4 sm:py-1.5 sm:text-sm">
            <svg className="h-3.5 w-3.5 sm:h-4 sm:w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 100 4 2 2 0 000-4z" />
            </svg>
            Boat Provisioning
          </div>
          <h1 className="mt-5 text-3xl font-bold tracking-tight sm:mt-6 sm:text-4xl md:text-5xl lg:text-6xl">
            Everything your crew needs,
            <br className="hidden sm:block" />
            <span className="text-accent"> delivered to the marina.</span>
          </h1>
          <p className="mx-auto mt-4 max-w-2xl text-base text-muted sm:mt-6 sm:text-lg">
            Skip the supermarket queues. Choose a ready-made package or build
            your own — we&apos;ll have it waiting at your boat on check-in day.
          </p>
        </div>
      </header>

      {/* Steps */}
      <div className="px-4 pb-10 sm:px-6 sm:pb-14 md:pb-20">
        <div className="mx-auto flex max-w-3xl gap-3 overflow-x-auto sm:flex-row sm:gap-4">
          {[
            { n: "1", text: "Pick a package" },
            { n: "2", text: "Adjust quantities" },
            { n: "3", text: "We deliver it" },
          ].map((s) => (
            <div key={s.n} className="flex min-w-0 flex-1 items-center gap-2.5 rounded-xl bg-white p-3 shadow-sm ring-1 ring-border sm:flex-col sm:gap-3 sm:p-4 sm:text-center">
              <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-accent text-xs font-bold text-white sm:h-9 sm:w-9 sm:text-sm">
                {s.n}
              </div>
              <p className="text-xs font-medium sm:text-sm">{s.text}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Packages */}
      <section className="px-4 pb-16 sm:px-6 sm:pb-20 md:pb-28">
        <div className="mx-auto max-w-5xl">
          <div className="grid gap-4 sm:gap-6 md:grid-cols-2">
            {packages.map((pkg) => {
              const price = calculatePackagePrice(pkg);
              const itemCount = pkg.items.reduce((s, i) => s + i.defaultQty, 0);
              const isCustom = pkg.slug === "custom";

              return (
                <Link
                  key={pkg.slug}
                  href={`/boat-supply/${pkg.slug}`}
                  className={`group relative flex flex-col overflow-hidden rounded-xl bg-white shadow-sm ring-1 ring-border transition-all duration-200 active:scale-[0.99] hover:-translate-y-1 hover:shadow-xl hover:ring-accent/40 sm:rounded-2xl ${isCustom ? "md:col-span-2" : ""}`}
                >
                  {/* Image */}
                  <div className={`relative overflow-hidden ${isCustom ? "h-36 sm:h-44 md:h-52" : "h-40 sm:h-48"}`}>
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      src={pkg.image}
                      alt={pkg.name}
                      className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent" />
                    <div className="absolute bottom-0 left-0 p-4 sm:p-6">
                      <h2 className="text-xl font-bold text-white sm:text-2xl">{pkg.name}</h2>
                      {!isCustom && (
                        <p className="mt-0.5 text-xs text-white/80 sm:mt-1 sm:text-sm">
                          {pkg.items.length} products &middot; {itemCount} items
                        </p>
                      )}
                    </div>
                    {isCustom && (
                      <span className="absolute right-3 top-3 rounded-full bg-white/90 px-2.5 py-1 text-[10px] font-semibold text-slate-700 backdrop-blur-sm sm:right-4 sm:top-4 sm:px-3 sm:text-xs">
                        Build Your Own
                      </span>
                    )}
                  </div>

                  {/* Content */}
                  <div className={`flex flex-1 flex-col p-4 sm:p-6 ${isCustom ? "md:flex-row md:items-center md:justify-between" : ""}`}>
                    <p className={`text-sm leading-relaxed text-muted ${isCustom ? "md:max-w-md" : ""}`}>
                      {pkg.description}
                    </p>

                    <div className={`mt-4 flex items-center justify-between sm:mt-5 ${isCustom ? "md:mt-0 md:shrink-0 md:ml-8" : ""}`}>
                      {!isCustom ? (
                        <div className="flex items-baseline gap-0.5">
                          <span className="text-2xl font-bold text-accent sm:text-3xl">{price.toFixed(2)}</span>
                          <span className="text-sm font-semibold text-accent sm:text-base">&euro;</span>
                        </div>
                      ) : (
                        <div />
                      )}
                      <span className={`inline-flex items-center gap-1.5 rounded-xl px-4 py-2.5 text-xs font-semibold transition-colors sm:gap-2 sm:px-5 sm:text-sm ${isCustom ? "bg-slate-900 text-white group-hover:bg-slate-800" : "bg-accent text-white group-hover:bg-accent-dark"}`}>
                        {isCustom ? "Start building" : "View & order"}
                        <svg className="h-3.5 w-3.5 transition-transform group-hover:translate-x-0.5 sm:h-4 sm:w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                          <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
                        </svg>
                      </span>
                    </div>
                  </div>
                </Link>
              );
            })}
          </div>
        </div>
      </section>

      {/* Trust */}
      <footer className="border-t border-border bg-white px-4 py-6 sm:px-6 sm:py-8">
        <div className="mx-auto flex max-w-5xl flex-col items-center gap-2 text-xs text-muted sm:flex-row sm:flex-wrap sm:justify-center sm:gap-x-8 sm:gap-y-2 sm:text-sm">
          {["Locally sourced products", "Delivered to your marina", "Save 2+ hours on check-in day"].map((t) => (
            <span key={t} className="flex items-center gap-1.5">
              <svg className="h-3.5 w-3.5 text-green-500 sm:h-4 sm:w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
              </svg>
              {t}
            </span>
          ))}
        </div>
      </footer>
    </div>
  );
}
