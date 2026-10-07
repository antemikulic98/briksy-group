import Link from "next/link";

type Props = {
  title?: string;
  text?: string;
};

export default function CTASection({
  title = "Pokažite nam gdje zapinje.",
  text = "Operativna dijagnostika: 30 minuta o vašim procesima. Na kraju znate što vrijedi automatizirati, a što ne dirati.",
}: Props) {
  return (
    <section className="bg-gradient-to-br from-accent to-blue-800 py-20 text-white md:py-28">
      <div className="mx-auto max-w-6xl px-6">
        <div className="flex flex-col gap-8 md:flex-row md:items-center md:justify-between">
          <div className="max-w-xl">
            <h2 className="text-3xl font-bold leading-tight tracking-tight md:text-5xl">{title}</h2>
            <p className="mt-4 text-lg text-blue-100">{text}</p>
          </div>
          <Link
            href="/kontakt"
            className="inline-flex shrink-0 items-center justify-center gap-2 rounded-full bg-white px-7 py-4 text-base font-semibold text-accent transition-colors hover:bg-blue-50"
          >
            Zatražite sastanak
            <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" />
            </svg>
          </Link>
        </div>
      </div>
    </section>
  );
}
