import Link from "next/link";

export const metadata = {
  title: "Politika privatnosti",
  description:
    "Saznajte koje osobne podatke Briksy Group prikuplja, u koje svrhe ih obrađuje i koja su vaša prava prema Općoj uredbi o zaštiti podataka (GDPR).",
  alternates: { canonical: "https://briksygroup.com/privatnost" },
  openGraph: {
    title: "Politika privatnosti | Briksy Group",
    description:
      "Koje osobne podatke prikupljamo, u koje svrhe i koja su vaša prava prema GDPR-u.",
    url: "https://briksygroup.com/privatnost",
  },
};

const sections = [
  {
    title: "1. Voditelj obrade",
    content: (
      <>
        <p>
          Voditelj obrade vaših osobnih podataka je{" "}
          <strong>BRIKSY GROUP d.o.o.</strong>, Putaljski put 25C, 21212 Kaštel
          Sućurac, OIB: 01106775183, MBS: 060512747, upisano u sudski registar
          Trgovačkog suda u Splitu.
        </p>
        <p>
          Za sva pitanja o zaštiti osobnih podataka možete nas kontaktirati na{" "}
          <a href="mailto:info@briksygroup.com" className="text-accent hover:underline">
            info@briksygroup.com
          </a>{" "}
          ili na telefon +385 95 541 9712.
        </p>
      </>
    ),
  },
  {
    title: "2. Koje podatke prikupljamo",
    content: (
      <>
        <p>Osobne podatke prikupljamo isključivo kada nam ih sami dostavite:</p>
        <ul>
          <li>
            <strong>Kontakt forma:</strong> naziv firme, telefonski broj,
            e-mail adresa i sadržaj poruke.
          </li>
          <li>
            <strong>Izravni kontakt:</strong> podaci koje nam dostavite e-mailom
            ili telefonom.
          </li>
          <li>
            <strong>Klijentski portal:</strong> ime, e-mail adresa i podaci o
            projektu, ako ste naš klijent s korisničkim računom.
          </li>
          <li>
            <strong>Kolačići za analitiku:</strong> anonimizirani podaci o
            korištenju stranice (Google Analytics) — isključivo uz vašu
            privolu putem obavijesti o kolačićima.
          </li>
        </ul>
      </>
    ),
  },
  {
    title: "3. Svrhe i pravna osnova obrade",
    content: (
      <ul>
        <li>
          <strong>Odgovor na upit</strong> — obrada je nužna za poduzimanje
          radnji na vaš zahtjev prije sklapanja ugovora (čl. 6. st. 1. t. (b)
          GDPR-a).
        </li>
        <li>
          <strong>Izvršenje ugovora</strong> — vođenje projekata i klijentskog
          portala za postojeće klijente (čl. 6. st. 1. t. (b) GDPR-a).
        </li>
        <li>
          <strong>Analitika web stranice</strong> — na temelju vaše privole
          (čl. 6. st. 1. t. (a) GDPR-a), koju možete povući u bilo kojem
          trenutku putem postavki kolačića u podnožju stranice.
        </li>
        <li>
          <strong>Zakonske obveze</strong> — računovodstvena i porezna
          dokumentacija (čl. 6. st. 1. t. (c) GDPR-a).
        </li>
      </ul>
    ),
  },
  {
    title: "4. Kome prosljeđujemo podatke",
    content: (
      <>
        <p>
          Vaše podatke ne prodajemo niti dijelimo s trećim stranama u
          marketinške svrhe. Podatke obrađuju samo pouzdani izvršitelji obrade
          koji nam pružaju tehničke usluge:
        </p>
        <ul>
          <li>pružatelji usluga poslužitelja i e-mail infrastrukture,</li>
          <li>
            Google Ireland Ltd. (Google Analytics) — isključivo uz vašu privolu
            za analitičke kolačiće.
          </li>
        </ul>
      </>
    ),
  },
  {
    title: "5. Koliko dugo čuvamo podatke",
    content: (
      <ul>
        <li>
          <strong>Upiti putem kontakt forme:</strong> do 2 godine od zadnje
          komunikacije, osim ako postane klijentski odnos.
        </li>
        <li>
          <strong>Podaci klijenata:</strong> za vrijeme trajanja poslovnog
          odnosa i nakon toga u rokovima propisanim zakonom.
        </li>
        <li>
          <strong>Privola za kolačiće:</strong> pohranjuje se 12 mjeseci, nakon
          čega vas ponovno pitamo.
        </li>
      </ul>
    ),
  },
  {
    title: "6. Vaša prava",
    content: (
      <>
        <p>Prema GDPR-u imate pravo na:</p>
        <ul>
          <li>pristup svojim osobnim podacima,</li>
          <li>ispravak netočnih podataka,</li>
          <li>brisanje podataka („pravo na zaborav"),</li>
          <li>ograničenje obrade i prigovor na obradu,</li>
          <li>prenosivost podataka,</li>
          <li>povlačenje privole u bilo kojem trenutku.</li>
        </ul>
        <p>
          Za ostvarivanje prava javite se na{" "}
          <a href="mailto:info@briksygroup.com" className="text-accent hover:underline">
            info@briksygroup.com
          </a>
          . Ako smatrate da obrađujemo vaše podatke protivno propisima, imate
          pravo podnijeti prigovor Agenciji za zaštitu osobnih podataka (AZOP),
          Selska cesta 136, 10000 Zagreb,{" "}
          <a
            href="https://azop.hr"
            target="_blank"
            rel="noopener noreferrer"
            className="text-accent hover:underline"
          >
            azop.hr
          </a>
          .
        </p>
      </>
    ),
  },
  {
    title: "7. Kolačići",
    content: (
      <>
        <p>
          Stranica koristi nužne kolačiće (za rad obavijesti o privoli i
          prijavu u klijentski portal) te analitičke kolačiće Google Analyticsa
          koji se aktiviraju samo ako ih prihvatite. Svoju odluku možete
          promijeniti u bilo kojem trenutku klikom na „Postavke kolačića" u
          podnožju stranice.
        </p>
      </>
    ),
  },
  {
    title: "8. Izmjene ove politike",
    content: (
      <p>
        Politiku privatnosti povremeno ažuriramo. Datum zadnje izmjene:
        10. rujna 2026. Značajne promjene objavit ćemo na ovoj stranici.
      </p>
    ),
  },
];

export default function PrivatnostPage() {
  return (
    <section className="border-b border-border bg-white pt-36 pb-14 md:pt-44 md:pb-20">
      <div className="mx-auto max-w-3xl px-6">
        <p className="text-sm font-medium uppercase tracking-widest text-accent">
          Pravno
        </p>
        <h1 className="mt-3 text-3xl font-bold tracking-tight md:text-4xl">
          Politika privatnosti
        </h1>
        <p className="mt-3 text-lg text-muted">
          Vaše povjerenje nam je važno. Ovdje transparentno objašnjavamo koje
          podatke prikupljamo, zašto i koja su vaša prava.
        </p>

        <div className="mt-10 space-y-10">
          {sections.map((s) => (
            <div key={s.title}>
              <h2 className="text-xl font-semibold">{s.title}</h2>
              <div className="prose-sm mt-3 space-y-3 text-sm leading-relaxed text-muted [&_li]:ml-4 [&_li]:list-disc [&_ul]:space-y-1.5">
                {s.content}
              </div>
            </div>
          ))}
        </div>

        <div className="mt-12 rounded-xl border border-border bg-slate-50 p-6">
          <p className="text-sm text-muted">
            Imate pitanja o zaštiti podataka?{" "}
            <Link href="/kontakt" className="font-medium text-accent hover:underline">
              Javite nam se
            </Link>{" "}
            — odgovaramo u roku od 24 sata.
          </p>
        </div>
      </div>
    </section>
  );
}
