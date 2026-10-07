import { ogImage, ogSize } from "@/app/components/og-template";

export const runtime = "edge";
export const alt = "AI u poslovanju — Briksy Group";
export const size = ogSize;
export const contentType = "image/png";

export default function OGImage() {
  return ogImage({
    headline: "Ne prodajemo AI.",
    accent: "Prodajemo uklonjen posao.",
    sub: "Računi, ponude i troškovnici se čitaju sami. Čovjek samo potvrdi.",
    chips: [
      { n: "Ulazni računi", d: "AI pročita, vi potvrdite" },
      { n: "Troškovnici", d: "uvoz iz PDF-a" },
      { n: "Kategorizacija", d: "automatski" },
      { n: "Odobrenja", d: "bez mailova" },
    ],
  });
}
