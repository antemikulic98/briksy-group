import { ogImage, ogSize } from "@/app/components/og-template";

export const runtime = "edge";
export const alt = "Briksy — ERP za građevinske firme";
export const size = ogSize;
export const contentType = "image/png";

export default function OGImage() {
  return ogImage({
    headline: "Briksy. ERP za",
    accent: "građevinske firme.",
    sub: "Ured, financije, skladište i gradilište u jednom sustavu. Bez Excela, bez prepisivanja.",
    chips: [
      { n: "AI uvoz", d: "troškovnika" },
      { n: "Radni nalozi", d: "s terena" },
      { n: "Trošak", d: "po stavci" },
      { n: "Situacije", d: "i e-računi" },
    ],
  });
}
