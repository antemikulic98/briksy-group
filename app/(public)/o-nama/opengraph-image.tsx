import { ogImage, ogSize } from "@/app/components/og-template";

export const runtime = "edge";
export const alt = "Kako radimo — Briksy Group";
export const size = ogSize;
export const contentType = "image/png";

export default function OGImage() {
  return ogImage({
    headline: "Prvo učimo kako radite.",
    accent: "Onda gradimo.",
    sub: "Dolazimo u firmu, gledamo kako informacije stvarno putuju i tek onda predlažemo.",
    chips: [
      { n: "01", d: "Upoznamo poslovanje" },
      { n: "02", d: "Dijagnoza" },
      { n: "03", d: "Gradimo u fazama" },
      { n: "04", d: "Ostajemo uz vas" },
    ],
  });
}
