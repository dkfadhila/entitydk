import { lampiranSlugs } from "@/lib/evidence";
import LampiranClient from "./LampiranClient";

export function generateStaticParams() {
  return lampiranSlugs().map((slug) => ({ slug }));
}

export default async function LampiranPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  return <LampiranClient slug={slug} />;
}
