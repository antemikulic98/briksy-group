import { notFound } from "next/navigation";
import { packages, getPackage } from "../data";
import PackageDetail from "./package-detail";

export function generateStaticParams() {
  return packages.map((pkg) => ({ slug: pkg.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const pkg = getPackage(slug);
  if (!pkg) return { title: "Package Not Found" };
  return {
    title: `${pkg.name} — Boat Supply`,
    description: pkg.description,
  };
}

export default async function PackagePage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const pkg = getPackage(slug);
  if (!pkg) notFound();

  return <PackageDetail pkg={pkg} />;
}
