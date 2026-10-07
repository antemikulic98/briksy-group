import { ogImage, ogSize } from "@/app/components/og-template";

export const runtime = "edge";
export const alt = "Briksy Group — Poslovni software po mjeri";
export const size = ogSize;
export const contentType = "image/png";

export default function OGImage() {
  return ogImage({
    headline: "Software za firme koje su",
    accent: "prerasle Excel.",
    sub: "Povezujemo procese, ljude i podatke u jedan sustav, uz integracije s alatima koje već koristite.",
    chips: [
      { n: "Software", d: "po mjeri" },
      { n: "Integracije", d: "s ERP-om i alatima" },
      { n: "AI", d: "obrada dokumenata" },
      { n: "Briksy", d: "ERP za građevinske firme" },
    ],
  });
}
