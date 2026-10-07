import { ogImage, ogSize } from "@/app/components/og-template";

export const runtime = "edge";
export const alt = "Usluge — Briksy Group";
export const size = ogSize;
export const contentType = "image/png";

export default function OGImage() {
  return ogImage({
    headline: "Jedan partner za operativu,",
    accent: "podatke i integracije.",
    sub: "Software po mjeri, integracije s ERP-om, AI obrada dokumenata, analiza i podrška.",
    chips: [
      { n: "Software", d: "po mjeri" },
      { n: "Integracije", d: "bez prepisivanja" },
      { n: "AI", d: "obrada dokumenata" },
      { n: "Podrška", d: "dugoročno" },
    ],
  });
}
