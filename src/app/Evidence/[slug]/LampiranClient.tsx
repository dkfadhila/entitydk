"use client";

import Link from "next/link";
import { notFound } from "next/navigation";
import {
  BiohazardWarningBar,
  HackerMarquee,
  InterferenceFlash,
  PhantomWhispers,
  SideTerminalCrawl,
} from "@/components/HackerChrome";
import { EvidenceDoc } from "@/components/EvidenceDoc";
import { Reveal } from "@/components/ui";
import { brand, social } from "@/lib/data";
import { getLampiran, lampiranList } from "@/lib/evidence";
import { motion, useScroll, useSpring } from "framer-motion";

function ScrollProgress() {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, { stiffness: 90, damping: 24, mass: 0.3 });
  return (
    <motion.div
      className="scroll-glow fixed left-0 right-0 top-0 z-[60] h-[2px] origin-left"
      style={{ scaleX }}
    />
  );
}

export default function LampiranClient({ slug }: { slug: string }) {
  const item = getLampiran(slug);
  if (!item) {
    notFound();
  }

  const idx = lampiranList.findIndex((x) => x.slug === slug);
  const prev = idx > 0 ? lampiranList[idx - 1] : null;
  const next = idx >= 0 && idx < lampiranList.length - 1 ? lampiranList[idx + 1] : null;

  return (
    <div className="relative min-h-dvh backroom-wall force-motion">
      <ScrollProgress />
      <BiohazardWarningBar />
      <SideTerminalCrawl />
      <div className="phantom-soft">
        <PhantomWhispers />
      </div>
      <InterferenceFlash />

      <div className="stain-overlay pointer-events-none fixed inset-0 z-0" />
      <div className="noise pointer-events-none fixed inset-0 z-[1]" />
      <div className="vignette pointer-events-none fixed inset-0 z-[1]" />
      <div className="scanlines pointer-events-none fixed inset-0 z-[1] opacity-30" />

      <main className="relative z-10 mx-auto w-full max-w-3xl px-4 pb-16 pt-4 sm:pt-6 md:px-6 md:pb-20">
        <div className="mb-4 flex flex-wrap items-center justify-between gap-2">
          <Link
            href="/Evidence#lampiran-index"
            className="inline-flex min-h-10 items-center border border-backroom/30 bg-black/40 px-3 py-1.5 font-mono text-[10px] tracking-[0.18em] text-fog transition hover:border-backroom hover:text-backroom-hot"
          >
            ← LAMPIRAN MENU
          </Link>
          <span className="font-mono text-[10px] tracking-[0.2em] text-hazard">
            LAMPIRAN {String(item.n).padStart(2, "0")} / {String(lampiranList.length).padStart(2, "0")}
          </span>
        </div>

        <Reveal>
          <p className="font-mono text-[9px] tracking-[0.28em] text-hazard sm:text-[10px]">
            {brand.code} · ANNEX FILE
          </p>
          <h1 className="mt-2 break-code font-[family-name:var(--font-elite)] text-xl font-bold leading-snug text-backroom-hot sm:text-2xl md:text-3xl">
            {item.title}
          </h1>
        </Reveal>

        <div className="mt-4 max-md:-mx-4">
          <HackerMarquee variant="alert" />
        </div>

        <Reveal className="mt-6">
          <div className="wet-panel p-3 sm:p-5 md:p-6">
            <EvidenceDoc blocks={item.blocks} />
          </div>
        </Reveal>

        <div className="mt-8 flex flex-col gap-2 sm:flex-row sm:justify-between">
          {prev ? (
            <Link
              href={prev.href}
              className="inline-flex min-h-11 items-center justify-center border border-backroom/40 bg-black/30 px-4 py-2 font-mono text-[11px] text-fog transition hover:border-backroom hover:text-backroom-hot"
            >
              ← Lampiran {prev.n}
            </Link>
          ) : (
            <span />
          )}
          {next ? (
            <Link
              href={next.href}
              className="inline-flex min-h-11 items-center justify-center border border-hazard/40 bg-hazard/10 px-4 py-2 font-mono text-[11px] text-hazard transition hover:bg-hazard/20"
            >
              Lampiran {next.n} →
            </Link>
          ) : (
            <Link
              href="/Evidence#lampiran-index"
              className="inline-flex min-h-11 items-center justify-center border border-backroom/40 px-4 py-2 font-mono text-[11px] text-backroom"
            >
              SELESAI · MENU
            </Link>
          )}
        </div>

        <div className="mt-8 text-center">
          <Link
            href="/Evidence"
            className="inline-flex min-h-11 items-center border border-backroom/50 bg-backroom/10 px-5 py-3 font-mono text-xs tracking-[0.22em] text-backroom-hot transition hover:bg-backroom/20"
          >
            KEMBALI KE EVIDENCE
          </Link>
        </div>
      </main>

      <footer className="safe-bottom border-t border-backroom/20 bg-black/60 py-8">
        <div className="mx-auto flex max-w-3xl flex-col items-center gap-3 px-4">
          <a
            href={social.x.href}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex min-h-11 min-w-11 items-center justify-center border border-fog/20 bg-wall/80 px-4 py-2"
            aria-label="X tirtavex"
          >
            <svg viewBox="0 0 24 24" className="h-5 w-5 fill-paper" aria-hidden>
              <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-4.714-6.231-5.401 6.231H2.744l7.53-8.69L1.254 2.25H8.08l4.253 5.622zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
            </svg>
          </a>
          <p className="font-mono text-[10px] text-fog/50">
            {brand.code} · {item.slug}
          </p>
        </div>
      </footer>
    </div>
  );
}
