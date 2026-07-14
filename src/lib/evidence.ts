import type { EvidenceBlock } from "@/components/EvidenceDoc";
import split from "./evidence-split.json";

export type LampiranItem = {
  n: number;
  slug: string;
  title: string;
  href: string;
  blockCount: number;
  blocks: EvidenceBlock[];
};

export const evidenceMeta = split.meta as {
  title: string;
  author: string;
  nim: string;
  imageCount: number;
  blockCount: number;
  textChars: number;
  lampiranCount: number;
  mainBlockCount: number;
};

export const evidenceMainBlocks = split.main as EvidenceBlock[];

export const lampiranList = (split.lampiran as LampiranItem[]).map((x) => ({
  ...x,
  href: `/Evidence/${x.slug}`,
}));

export function getLampiran(slug: string) {
  return lampiranList.find((x) => x.slug === slug) || null;
}

export function lampiranSlugs() {
  return lampiranList.map((x) => x.slug);
}
