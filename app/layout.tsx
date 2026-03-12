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
  metadataBase: new URL("https://briksygroup.com"),
  title: {
    default:
      "Digitalizacija poslovanja | Briksy Group — AI i softver",
    template: "%s | Briksy Group",
  },
  description:
    "Dolazimo u vašu kompaniju, analiziramo procese i gradimo digitalna rješenja koja donose rezultate. AI implementacija, softver za građevinarstvo i konzalting. Besplatna analiza.",
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
    url: "https://briksygroup.com",
    siteName: "Briksy Group",
    title:
      "Digitalizacija poslovanja | Briksy Group — AI i softver",
    description:
      "Dolazimo u vašu kompaniju, analiziramo procese i gradimo digitalna rješenja koja donose rezultate. AI implementacija i softver. Besplatna analiza.",
    images: ["/opengraph-image"],
  },
  twitter: {
    card: "summary_large_image",
    title: "Digitalizacija poslovanja | Briksy Group — AI i softver",
    description:
      "Dolazimo u vašu kompaniju, analiziramo procese i gradimo digitalna rješenja koja donose rezultate. Besplatna analiza.",
    images: ["/opengraph-image"],
  },
  alternates: {
    canonical: "https://briksygroup.com",
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
        "@id": "https://briksygroup.com/#organization",
        name: "Briksy Group",
        legalName: "Briksy Group d.o.o.",
        url: "https://briksygroup.com",
        logo: {
          "@type": "ImageObject",
          url: "https://briksygroup.com/icon.svg",
        },
        description:
          "Vodeća hrvatska tvrtka za digitalizaciju poslovanja. Specijalizirani za digitalnu transformaciju, AI implementaciju i razvoj softvera za građevinarstvo i druge industrije.",
        foundingDate: "2018",
        address: {
          "@type": "PostalAddress",
          addressCountry: "HR",
        },
        contactPoint: {
          "@type": "ContactPoint",
          telephone: "+385-95-541-9712",
          email: "info@briksygroup.com",
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
        "@id": "https://briksygroup.com/#website",
        url: "https://briksygroup.com",
        name: "Briksy Group",
        publisher: {
          "@id": "https://briksygroup.com/#organization",
        },
        inLanguage: "hr",
      },
      {
        "@type": "WebPage",
        "@id": "https://briksygroup.com/#webpage",
        url: "https://briksygroup.com",
        name: "Digitalizacija poslovanja | Briksy Group — AI i softver",
        description:
          "Briksy Group digitalizira kompanije u Hrvatskoj. Dolazimo u vašu kompaniju, analiziramo procese i implementiramo rješenja koja donose rezultate.",
        isPartOf: {
          "@id": "https://briksygroup.com/#website",
        },
        about: {
          "@id": "https://briksygroup.com/#organization",
        },
        inLanguage: "hr",
      },
    ],
  };

  return (
    <html lang="hr">
      <head>
        <link rel="preconnect" href="https://www.googletagmanager.com" />
        <link rel="dns-prefetch" href="https://www.googletagmanager.com" />
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
