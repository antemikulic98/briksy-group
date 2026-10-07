import { ogImage, ogSize } from "@/app/components/og-template";

export const runtime = "edge";
export const alt = "Digitalizacija poslovanja — Briksy Group";
export const size = ogSize;
export const contentType = "image/png";

export default function OGImage() {
  return ogImage({
    headline: "Digitalizacija je",
    accent: "uklanjanje koraka.",
    sub: "Ne morate mijenjati cijeli sustav. Često nedostaje samo jedan dio.",
    chips: [
      { n: "Dokumenti", d: "jedan sustav" },
      { n: "Operativa", d: "teren i ured" },
      { n: "Financije", d: "trošak odmah" },
      { n: "Uprava", d: "vidi stanje odmah" },
    ],
  });
}
