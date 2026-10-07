import { ogImage, ogSize } from "@/app/components/og-template";

export const runtime = "edge";
export const alt = "Zatražite sastanak — Briksy Group";
export const size = ogSize;
export const contentType = "image/png";

export default function OGImage() {
  return ogImage({
    headline: "Pokažite nam",
    accent: "gdje zapinje.",
    sub: "Operativna dijagnostika: 30 minuta o vašim procesima. Javimo se u roku od jednog radnog dana.",
    chips: [
      { n: "30 min", d: "razgovor" },
      { n: "1 radni dan", d: "odgovor" },
      { n: "Bez obveze", d: "" },
    ],
  });
}
