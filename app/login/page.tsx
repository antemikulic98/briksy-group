import LoginForm from "@/app/components/auth/login-form";
import Link from "next/link";

export const metadata = {
  title: "Prijava u portal — Briksy Group",
  description:
    "Prijavite se u Briksy Group klijentski portal. Pratite napredak svog projekta, faze implementacije i status digitalne transformacije u realnom vremenu.",
};

export default function LoginPage() {
  return (
    <div className="flex min-h-screen bg-slate-50">
      {/* Info panel — lijeva strana */}
      <div className="hidden w-1/2 bg-accent lg:flex lg:flex-col lg:justify-between lg:p-12">
        <div>
          <Link href="/" className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-white/20 text-lg font-bold text-white">
              B
            </div>
            <span className="text-lg font-bold text-white">Briksy Group</span>
          </Link>
        </div>

        <div>
          <h2 className="text-3xl font-bold leading-tight text-white">
            Pratite svoj projekt
            <br />
            u realnom vremenu.
          </h2>
          <p className="mt-4 text-lg leading-relaxed text-white/80">
            Klijentski portal vam daje potpuni uvid u napredak vaše digitalne
            transformacije — bez čekanja na izvještaje, bez telefonskih poziva.
          </p>

          <div className="mt-10 space-y-5">
            {[
              {
                t: "Faze projekta",
                d: "Vidite svaku fazu implementacije, od analize do puštanja u rad.",
              },
              {
                t: "Napredak u postocima",
                d: "Jasni postoci i status za svaki korak — znate točno gdje ste.",
              },
              {
                t: "Transparentnost",
                d: "Bez iznenađenja — sve informacije su vam dostupne 24/7.",
              },
              {
                t: "Komunikacija na jednom mjestu",
                d: "Sve vezano uz vaš projekt je dokumentirano i lako dostupno.",
              },
            ].map((item) => (
              <div key={item.t} className="flex gap-3">
                <svg
                  className="mt-0.5 h-5 w-5 shrink-0 text-white/60"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M5 13l4 4L19 7"
                  />
                </svg>
                <div>
                  <div className="font-semibold text-white">{item.t}</div>
                  <div className="text-sm text-white/70">{item.d}</div>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="rounded-lg bg-white/10 p-5">
          <p className="text-sm leading-relaxed text-white/80">
            &ldquo;Portal nam je potpuno promijenio način praćenja projekta.
            Umjesto tjednih poziva, sad jednostavno otvorimo stranicu i vidimo
            gdje smo.&rdquo;
          </p>
          <p className="mt-3 text-sm font-semibold text-white/90">
            — Klijent, građevinska firma
          </p>
        </div>
      </div>

      {/* Login forma — desna strana */}
      <div className="flex w-full items-center justify-center px-6 lg:w-1/2">
        <div className="w-full max-w-sm">
          <div className="mb-8 text-center">
            <Link href="/" className="inline-block">
              <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-accent text-lg font-bold text-white">
                B
              </div>
            </Link>
            <h1 className="text-xl font-bold text-foreground">Briksy Group</h1>
            <p className="mt-1 text-sm text-muted">
              Prijavite se u klijentski portal
            </p>
          </div>

          <div className="rounded-2xl border border-border bg-white p-6 shadow-sm">
            <LoginForm />
          </div>

          <p className="mt-6 text-center text-sm text-muted">
            Nemate pristup?{" "}
            <Link href="/kontakt" className="font-medium text-accent hover:underline">
              Kontaktirajte nas
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
