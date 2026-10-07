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
  alternates: { canonical: "https://briksygroup.com" },
  title: {
    default:
      "Poslovni software po mjeri | Briksy Group",
    template: "%s | Briksy Group",
  },
  description:
    "Software za firme koje su prerasle Excel, mailove i nepovezane programe. Povezujemo procese, ljude i podatke u jedan sustav, uz integracije s alatima koje već koristite.",
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
      "Poslovni software po mjeri | Briksy Group",
    description:
      "Software za firme koje su prerasle Excel. Povezujemo procese, ljude i podatke u jedan sustav, uz integracije s alatima koje već koristite.",
    images: ["/opengraph-image"],
  },
  twitter: {
    card: "summary_large_image",
    title: "Poslovni software po mjeri | Briksy Group",
    description:
      "Software za firme koje su prerasle Excel, mailove i nepovezane programe.",
    images: ["/opengraph-image"],
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
          url: "https://briksygroup.com/img/icon.png",
          width: 512,
          height: 512,
        },
        description:
          "Hrvatska tvrtka za poslovni software po mjeri. Gradimo operativne sustave za firme koje su prerasle Excel: software po mjeri, integracije s ERP-om, automatizacija i AI obrada dokumenata, te Briksy, software za građevinarstvo.",
        foundingDate: "2018",
        address: {
          "@type": "PostalAddress",
          streetAddress: "Putaljski put 25C",
          addressLocality: "Kaštel Sućurac",
          postalCode: "21212",
          addressRegion: "Splitsko-dalmatinska županija",
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
          "Poslovni software po mjeri",
          "Digitalizacija poslovanja",
          "Integracija ERP sustava",
          "Software za građevinarstvo",
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
        name: "Poslovni software po mjeri | Briksy Group",
        description:
          "Briksy Group gradi poslovni software po mjeri za firme u Hrvatskoj. Dolazimo u firmu, učimo kako radite i povezujemo procese, ljude i podatke u jedan sustav.",
        isPartOf: {
          "@id": "https://briksygroup.com/#website",
        },
        about: {
          "@id": "https://briksygroup.com/#organization",
        },
        inLanguage: "hr",
      },
      {
        "@type": "LocalBusiness",
        "@id": "https://briksygroup.com/#localbusiness",
        name: "Briksy Group",
        image: "https://briksygroup.com/img/icon.png",
        url: "https://briksygroup.com",
        telephone: "+385-95-541-9712",
        email: "info@briksygroup.com",
        address: {
          "@type": "PostalAddress",
          streetAddress: "Putaljski put 25C",
          addressLocality: "Kaštel Sućurac",
          postalCode: "21212",
          addressRegion: "Splitsko-dalmatinska županija",
          addressCountry: "HR",
        },
        geo: {
          "@type": "GeoCoordinates",
          latitude: 43.5397,
          longitude: 16.4475,
        },
        openingHoursSpecification: {
          "@type": "OpeningHoursSpecification",
          dayOfWeek: [
            "Monday",
            "Tuesday",
            "Wednesday",
            "Thursday",
            "Friday",
          ],
          opens: "08:00",
          closes: "17:00",
        },
        parentOrganization: {
          "@id": "https://briksygroup.com/#organization",
        },
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
