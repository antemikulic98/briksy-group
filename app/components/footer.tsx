import Link from "next/link";
import CookieManageButton from "./cookie-manage-button";

export default function Footer() {
  return (
    <footer className="border-t border-border bg-gray-900 py-10 text-white">
      <div className="mx-auto max-w-7xl px-6">
        <div className="flex flex-col items-center justify-between gap-6 md:flex-row">
          <div>
            <div className="text-lg font-bold tracking-tight">
              briksy<span className="text-accent">.</span>group
            </div>
            <p className="mt-1 text-sm text-gray-400">
              Digitalizacija i AI implementacija za kompanije.
            </p>
            <div className="mt-3 flex flex-col gap-1">
              <a
                href="mailto:info@briksygroup.com"
                className="text-sm text-gray-400 hover:text-white"
              >
                info@briksygroup.com
              </a>
              <a
                href="tel:+385955419712"
                className="text-sm text-gray-400 hover:text-white"
              >
                +385 95 541 9712
              </a>
            </div>
          </div>

          <div className="flex flex-wrap items-center justify-center gap-6">
            <Link href="/o-nama" className="text-sm text-gray-400 hover:text-white">
              Kako radimo
            </Link>
            <Link href="/digitalizacija" className="text-sm text-gray-400 hover:text-white">
              Digitalizacija
            </Link>
            <Link href="/ai" className="text-sm text-gray-400 hover:text-white">
              AI
            </Link>
            <Link href="/usluge" className="text-sm text-gray-400 hover:text-white">
              Usluge
            </Link>
            <Link href="/briksy" className="text-sm text-gray-400 hover:text-white">
              Briksy
            </Link>
            <a
              href="https://briksy.com"
              target="_blank"
              rel="noopener noreferrer"
              className="text-sm text-gray-400 hover:text-white"
            >
              briksy.com
            </a>
            <Link href="/kontakt" className="text-sm text-gray-400 hover:text-white">
              Kontakt
            </Link>
            <Link href="/login" className="text-sm text-gray-400 hover:text-white">
              Portal
            </Link>
            <CookieManageButton />
          </div>
        </div>

        <div className="mt-8 border-t border-gray-800 pt-6 text-center text-sm text-gray-500">
          &copy; {new Date().getFullYear()} Briksy Group d.o.o. Sva prava pridržana.
        </div>
      </div>
    </footer>
  );
}
