import Link from "next/link";
import CookieManageButton from "./cookie-manage-button";

export default function Footer() {
  return (
    <footer className="border-t border-border bg-gray-900 text-white">
      <div className="mx-auto max-w-7xl px-6 py-12 md:py-16">
        <div className="grid gap-10 md:grid-cols-2 lg:grid-cols-4">
          {/* Logo & info */}
          <div className="lg:col-span-1">
            <div className="text-lg font-bold tracking-tight">
              briksy<span className="text-accent">.</span>group
            </div>
            <p className="mt-3 text-sm leading-relaxed text-gray-400">
              Digitalizacija i AI implementacija za kompanije. Dolazimo k vama,
              analiziramo procese i gradimo rješenja koja donose rezultate.
            </p>
            <div className="mt-4 space-y-1">
              <a
                href="mailto:info@briksygroup.com"
                className="block text-sm text-gray-400 hover:text-white"
              >
                info@briksygroup.com
              </a>
              <a
                href="tel:+385955419712"
                className="block text-sm text-gray-400 hover:text-white"
              >
                +385 95 541 9712
              </a>
            </div>
          </div>

          {/* Stranice */}
          <div>
            <h4 className="text-sm font-semibold uppercase tracking-wider text-gray-300">
              Stranice
            </h4>
            <ul className="mt-4 space-y-2.5">
              <li>
                <Link href="/o-nama" className="text-sm text-gray-400 hover:text-white">
                  Kako radimo
                </Link>
              </li>
              <li>
                <Link href="/digitalizacija" className="text-sm text-gray-400 hover:text-white">
                  Digitalizacija
                </Link>
              </li>
              <li>
                <Link href="/ai" className="text-sm text-gray-400 hover:text-white">
                  AI implementacija
                </Link>
              </li>
              <li>
                <Link href="/usluge" className="text-sm text-gray-400 hover:text-white">
                  Usluge
                </Link>
              </li>
            </ul>
          </div>

          {/* Proizvodi */}
          <div>
            <h4 className="text-sm font-semibold uppercase tracking-wider text-gray-300">
              Proizvodi
            </h4>
            <ul className="mt-4 space-y-2.5">
              <li>
                <Link href="/briksy" className="text-sm text-gray-400 hover:text-white">
                  Briksy
                </Link>
              </li>
              <li>
                <a
                  href="https://briksy.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-sm text-gray-400 hover:text-white"
                >
                  briksy.com ↗
                </a>
              </li>
            </ul>
          </div>

          {/* Ostalo */}
          <div>
            <h4 className="text-sm font-semibold uppercase tracking-wider text-gray-300">
              Ostalo
            </h4>
            <ul className="mt-4 space-y-2.5">
              <li>
                <Link href="/kontakt" className="text-sm text-gray-400 hover:text-white">
                  Kontakt
                </Link>
              </li>
              <li>
                <Link href="/login" className="text-sm text-gray-400 hover:text-white">
                  Klijentski portal
                </Link>
              </li>
              <li>
                <CookieManageButton />
              </li>
            </ul>
          </div>
        </div>

        {/* Podaci o firmi & copyright */}
        <div className="mt-12 border-t border-gray-800 pt-6 text-xs text-gray-500">
          <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
            <p>
              &copy; {new Date().getFullYear()} Briksy Group d.o.o. Sva prava pridržana.
            </p>
            <p>
              OIB: 01106775183 &middot; MBS: 060512747 &middot; Trgovački sud u Splitu
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}
