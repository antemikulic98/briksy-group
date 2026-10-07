import Link from "next/link";
import CookieManageButton from "./cookie-manage-button";

const columns = [
  {
    title: "Usluge",
    links: [
      { href: "/usluge", label: "Sve usluge" },
      { href: "/digitalizacija", label: "Digitalizacija poslovanja" },
      { href: "/ai", label: "AI i obrada dokumenata" },
      { href: "/o-nama", label: "Kako radimo" },
    ],
  },
  {
    title: "Briksy",
    links: [
      { href: "/briksy", label: "Software za građevinarstvo" },
      { href: "/briksy/studija-slucaja", label: "Studija slučaja" },
      { href: "https://briksy.com", label: "briksy.com ↗", external: true },
    ],
  },
  {
    title: "Tvrtka",
    links: [
      { href: "/kontakt", label: "Zatražite sastanak" },
      { href: "/privatnost", label: "Politika privatnosti" },
    ],
  },
];

export default function Footer() {
  return (
    <footer className="border-t border-border bg-gray-900 text-white">
      <div className="mx-auto max-w-6xl px-6 py-12 md:py-14">
        <div className="grid gap-10 md:grid-cols-2 lg:grid-cols-5">
          <div className="lg:col-span-2">
            <div className="flex items-center gap-2.5">
              <div className="flex h-8 w-8 items-center justify-center rounded-md bg-accent text-sm font-bold text-white">
                B
              </div>
              <span className="text-base font-semibold tracking-tight">Briksy Group</span>
            </div>
            <p className="mt-4 max-w-sm text-sm leading-relaxed text-gray-400">
              Poslovni software za firme koje su prerasle Excel.
            </p>
            <div className="mt-5 space-y-1 text-sm">
              <a href="mailto:info@briksygroup.com" className="block text-gray-300 hover:text-white">
                info@briksygroup.com
              </a>
              <a href="tel:+385955419712" className="block text-gray-300 hover:text-white">
                +385 95 541 9712
              </a>
              <p className="pt-1 text-gray-500">Putaljski put 25C, 21212 Kaštel Sućurac</p>
            </div>
          </div>

          {columns.map((col) => (
            <div key={col.title}>
              <h4 className="text-xs font-semibold uppercase tracking-wider text-gray-400">
                {col.title}
              </h4>
              <ul className="mt-4 space-y-2.5">
                {col.links.map((l) =>
                  l.external ? (
                    <li key={l.href}>
                      <a
                        href={l.href}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-sm text-gray-300 hover:text-white"
                      >
                        {l.label}
                      </a>
                    </li>
                  ) : (
                    <li key={l.href}>
                      <Link href={l.href} className="text-sm text-gray-300 hover:text-white">
                        {l.label}
                      </Link>
                    </li>
                  )
                )}
                {col.title === "Tvrtka" && (
                  <li>
                    <CookieManageButton />
                  </li>
                )}
              </ul>
            </div>
          ))}
        </div>

        <div className="mt-12 flex flex-col gap-2 border-t border-gray-800 pt-6 text-xs text-gray-500 md:flex-row md:items-center md:justify-between">
          <p>&copy; {new Date().getFullYear()} Briksy Group d.o.o. Sva prava pridržana.</p>
          <p>OIB: 01106775183 &middot; MBS: 060512747 &middot; Trgovački sud u Splitu</p>
        </div>
      </div>
    </footer>
  );
}
