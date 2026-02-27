import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import CookieConsent from "@/app/components/cookie-consent";
import GoogleAnalytics from "@/app/components/google-analytics";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin", "latin-ext"],
});

export const metadata: Metadata = {
  metadataBase: new URL("https://briksy.group"),
  title: {
    default:
      "Digitalizacija poslovanja u Hrvatskoj | Briksy Group — AI, softver, konzalting",
    template: "%s | Briksy Group",
  },
  description:
    "Briksy Group je vodeća hrvatska tvrtka za digitalizaciju poslovanja. Dolazimo u vašu firmu, analiziramo procese i implementiramo digitalna rješenja i AI koji donose rezultate. Digitalizacija građevinarstva, proizvodnje i uslužnih djelatnosti. Besplatna analiza.",
  keywords: [
    "digitalizacija",
    "digitalizacija poslovanja",
    "digitalizacija firme",
    "digitalizacija poduzeća",
    "digitalizacija tvrtke",
    "digitalna transformacija",
    "digitalna transformacija poslovanja",
    "digitalizacija poslovanja Hrvatska",
    "digitalizacija poslovanja Zagreb",
    "digitalizacija građevinarstva",
    "digitalizacija građevinske firme",
    "softver za građevinarstvo",
    "softver za gradilište",
    "softver za građevinske firme",
    "AI implementacija",
    "AI u poslovanju",
    "umjetna inteligencija poslovanje",
    "automatizacija poslovnih procesa",
    "Briksy",
    "Briksy Group",
    "ERP građevinarstvo",
    "upravljanje projektima građevinarstvo",
    "robno materijalno poslovanje",
    "digitalizacija dokumenata",
    "poslovni softver Hrvatska",
    "IT konzalting Hrvatska",
  ],
  authors: [{ name: "Briksy Group d.o.o." }],
  creator: "Briksy Group",
  publisher: "Briksy Group d.o.o.",
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  openGraph: {
    type: "website",
    locale: "hr_HR",
    url: "https://briksy.group",
    siteName: "Briksy Group",
    title:
      "Digitalizacija poslovanja u Hrvatskoj | Briksy Group",
    description:
      "Dolazimo u vašu firmu, učimo kako radite i gradimo digitalne sustave koji donose rezultate. Digitalizacija, AI implementacija i softver za građevinarstvo. Besplatna analiza poslovanja.",
    images: ["/opengraph-image"],
  },
  twitter: {
    card: "summary_large_image",
    title: "Digitalizacija poslovanja u Hrvatskoj | Briksy Group",
    description:
      "Dolazimo u vašu firmu, učimo kako radite i gradimo digitalne sustave koji donose rezultate. Besplatna analiza poslovanja.",
    images: ["/opengraph-image"],
  },
  alternates: {
    canonical: "https://briksy.group",
  },
  category: "technology",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Organization",
        "@id": "https://briksy.group/#organization",
        name: "Briksy Group",
        legalName: "Briksy Group d.o.o.",
        url: "https://briksy.group",
        logo: {
          "@type": "ImageObject",
          url: "https://briksy.group/logo.png",
        },
        description:
          "Vodeća hrvatska tvrtka za digitalizaciju poslovanja. Specijalizirani za digitalnu transformaciju, AI implementaciju i razvoj softvera za građevinarstvo i druge industrije.",
        foundingDate: "2018",
        address: {
          "@type": "PostalAddress",
          addressCountry: "HR",
          addressLocality: "Hrvatska",
        },
        contactPoint: {
          "@type": "ContactPoint",
          telephone: "+385-95-541-9712",
          email: "info@briksy.com",
          contactType: "sales",
          availableLanguage: ["Croatian", "English"],
          areaServed: {
            "@type": "Country",
            name: "Croatia",
          },
        },
        sameAs: ["https://briksy.com"],
        knowsAbout: [
          "Digitalizacija poslovanja",
          "Digitalna transformacija",
          "Softver za građevinarstvo",
          "AI implementacija",
          "Automatizacija poslovnih procesa",
          "ERP sustavi",
          "Upravljanje projektima",
        ],
      },
      {
        "@type": "WebSite",
        "@id": "https://briksy.group/#website",
        url: "https://briksy.group",
        name: "Briksy Group",
        publisher: {
          "@id": "https://briksy.group/#organization",
        },
        inLanguage: "hr",
      },
      {
        "@type": "WebPage",
        "@id": "https://briksy.group/#webpage",
        url: "https://briksy.group",
        name: "Digitalizacija poslovanja u Hrvatskoj | Briksy Group",
        description:
          "Briksy Group digitalizira kompanije u Hrvatskoj. Dolazimo u vašu firmu, analiziramo procese i implementiramo rješenja koja donose rezultate.",
        isPartOf: {
          "@id": "https://briksy.group/#website",
        },
        about: {
          "@id": "https://briksy.group/#organization",
        },
        inLanguage: "hr",
      },
      {
        "@type": "Service",
        name: "Digitalizacija poslovanja",
        provider: {
          "@id": "https://briksy.group/#organization",
        },
        description:
          "Kompletna digitalizacija poslovnih procesa — od analize i konzaltinga do implementacije softvera i AI rješenja. Dolazimo u vašu firmu i učimo kako radite.",
        areaServed: {
          "@type": "Country",
          name: "Croatia",
        },
        serviceType: "Digitalna transformacija",
      },
      {
        "@type": "SoftwareApplication",
        name: "Briksy",
        url: "https://briksy.com",
        applicationCategory: "BusinessApplication",
        operatingSystem: "Web",
        description:
          "Prva aplikacija koja spaja financije, realizaciju i robno-materijalno poslovanje za građevinske firme. Razvijena u suradnji s vlasnicima firmi i inženjerima.",
        offers: {
          "@type": "Offer",
          availability: "https://schema.org/InStock",
          priceCurrency: "EUR",
        },
        creator: {
          "@id": "https://briksy.group/#organization",
        },
      },
      {
        "@type": "FAQPage",
        mainEntity: [
          {
            "@type": "Question",
            name: "Koliko košta digitalizacija poslovanja?",
            acceptedAnswer: {
              "@type": "Answer",
              text: "Ovisi o veličini firme i opsegu transformacije. Početna analiza je besplatna — dolazimo k vama, upoznajemo vaše poslovanje i dajemo vam procjenu. Za većinu srednje velikih firmi, investicija se vrati u prvih 6-12 mjeseci kroz uštede.",
            },
          },
          {
            "@type": "Question",
            name: "Koliko traje digitalizacija firme?",
            acceptedAnswer: {
              "@type": "Answer",
              text: "Tipična digitalizacija traje 2-3 mjeseca od prvog posjeta do punog pokretanja. Radimo u fazama, pa koristi počinjete vidjeti već nakon nekoliko tjedana. Kompleksnije transformacije s AI implementacijom mogu trajati 4-6 mjeseci.",
            },
          },
          {
            "@type": "Question",
            name: "Što je Briksy softver?",
            acceptedAnswer: {
              "@type": "Answer",
              text: "Briksy je prva aplikacija koja spaja financije, realizaciju i robno-materijalno poslovanje na jednom mjestu. Dizajnirana je specifično za građevinske firme i razvijena u suradnji s vlasnicima firmi i inženjerima na terenu.",
            },
          },
          {
            "@type": "Question",
            name: "Kako AI može pomoći mojoj firmi?",
            acceptedAnswer: {
              "@type": "Answer",
              text: "AI automatizira repetitivne zadatke poput unosa podataka, kategorizacije dokumenata i kreiranja izvještaja. Naši klijenti u prosjeku prijavljuju 60% manje vremena utrošenog na administrativne zadatke i značajno manje grešaka u obradi podataka.",
            },
          },
        ],
      },
    ],
  };

  return (
    <html lang="hr">
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body className={`${inter.variable} antialiased`}>
        {children}
        <GoogleAnalytics />
        <CookieConsent />
      </body>
    </html>
  );
}
