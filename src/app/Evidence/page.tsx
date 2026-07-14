"use client";

import Link from "next/link";
import { useMemo } from "react";
import {
  BiohazardWarningBar,
  HackerMarquee,
  InterferenceFlash,
  PhantomWhispers,
  SideTerminalCrawl,
} from "@/components/HackerChrome";
import { EvidenceDoc, type EvidenceBlock } from "@/components/EvidenceDoc";
import { Reveal, SectionLabel } from "@/components/ui";
import { brand, social, subject } from "@/lib/data";
import evidence from "@/lib/evidence-content.json";
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

function FooterX() {
  return (
    <footer className="safe-bottom border-t border-backroom/20 bg-black/60 py-8 md:py-10">
      <div className="mx-auto flex max-w-3xl flex-col items-center gap-4 px-4">
        <div className="flex flex-wrap items-center justify-center gap-3">
          <Link
            href="/"
            className="inline-flex min-h-11 items-center border border-backroom/40 bg-wall/70 px-4 py-2 font-mono text-[10px] tracking-[0.2em] text-backroom transition hover:border-backroom hover:text-backroom-hot"
          >
            ← ZONE HOME
          </Link>
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
        </div>
        <p className="font-mono text-[10px] text-fog/50">
          {brand.code} · EVIDENCE FILE · {evidence.meta.imageCount} FIGS
        </p>
      </div>
    </footer>
  );
}

export default function EvidencePage() {
  const blocks = evidence.blocks as EvidenceBlock[];
  const toc = useMemo(() => {
    const preferred = [
      "ABSTRAK",
      "MOTTO",
      "BAB I",
      "BAB II",
      "BAB III",
      "BAB IV",
      "BAB V",
      "DAFTAR PUSTAKA",
      "LAMPIRAN",
    ];
    const items: { i: number; text: string }[] = [];
    blocks.forEach((b, i) => {
      if (b.type !== "h1" && b.type !== "title") return;
      const text = ("text" in b ? b.text : "").replace(/\t+/g, " ").trim();
      if (!text || text.length > 100) return;
      // skip raw lampiran item headings in TOC; keep only main LAMPIRAN
      if (/^Lampiran\b/i.test(text) && !/^LAMPIRAN$/i.test(text)) return;
      if (b.type === "title") {
        items.push({ i, text: "JUDUL" });
        return;
      }
      const up = text.toUpperCase();
      if (
        preferred.some((p) => up === p || up.startsWith(p + " ")) ||
        up === "ABSTRAK" ||
        up === "MOTTO"
      ) {
        items.push({ i, text });
      }
    });
    // stable unique by label
    const seen = new Set<string>();
    return items.filter((x) => {
      const k = x.text.toUpperCase();
      if (seen.has(k)) return false;
      seen.add(k);
      return true;
    });
  }, [blocks]);

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
            href="/"
            className="inline-flex min-h-10 items-center border border-backroom/30 bg-black/40 px-3 py-1.5 font-mono text-[10px] tracking-[0.18em] text-fog transition hover:border-backroom hover:text-backroom-hot"
          >
            ← BACK TO ZONE
          </Link>
          <span className="font-mono text-[10px] tracking-[0.2em] text-alert">
            EVIDENCE · READ-ONLY
          </span>
        </div>

        <Reveal>
          <p className="font-mono text-[9px] tracking-[0.28em] text-alert sm:text-[10px]">
            FILE RECOVERED · EVIDENCE
          </p>
          <h1
            className="glitch mt-1 break-code font-[family-name:var(--font-elite)] text-2xl leading-tight text-backroom-hot sm:text-3xl md:text-4xl"
            data-text="EVIDENCE"
          >
            EVIDENCE
          </h1>
          <p className="mt-2 font-mono text-xs uppercase tracking-[0.16em] text-fluorescent sm:text-sm">
            Skripsi · {subject.name}
          </p>
          <div className="mt-4 grid grid-cols-3 gap-2">
            <div className="data-slab px-3 py-2">
              <p className="font-mono text-[9px] text-backroom-dim">BLOCKS</p>
              <p className="font-mono text-xs text-paper">{evidence.meta.blockCount}</p>
            </div>
            <div className="data-slab px-3 py-2">
              <p className="font-mono text-[9px] text-backroom-dim">FIGURES</p>
              <p className="font-mono text-xs text-paper">{evidence.meta.imageCount}</p>
            </div>
            <div className="data-slab px-3 py-2">
              <p className="font-mono text-[9px] text-backroom-dim">CHARS</p>
              <p className="font-mono text-xs text-paper">{evidence.meta.textChars}</p>
            </div>
          </div>
        </Reveal>

        <div className="mt-4 max-md:-mx-4">
          <HackerMarquee variant="bio" />
        </div>

        <Reveal className="mt-8">
          <SectionLabel code="INDEX">Peta file</SectionLabel>
          <div className="wet-panel p-3 sm:p-4">
            <ul className="grid gap-1.5 sm:grid-cols-2">
              {toc.map((item) => (
                <li key={item.i}>
                  <a
                    href={`#sec-${item.i}`}
                    className="block break-code border border-backroom/15 bg-black/20 px-3 py-2 font-mono text-[11px] text-fog transition hover:border-backroom/40 hover:text-backroom-hot sm:text-xs"
                  >
                    <span className="text-backroom-dim">//</span> {item.text}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </Reveal>

        <Reveal className="mt-8">
          <SectionLabel code="PAYLOAD">Isi</SectionLabel>
          <div className="wet-panel p-3 sm:p-5 md:p-6">
            <EvidenceDoc blocks={blocks} />
          </div>
        </Reveal>

        <div className="mt-8 max-md:-mx-4">
          <HackerMarquee reverse variant="alert" />
        </div>

        <div className="mt-8 text-center">
          <Link
            href="/"
            className="inline-flex min-h-11 items-center border border-backroom/50 bg-backroom/10 px-5 py-3 font-mono text-xs tracking-[0.22em] text-backroom-hot transition hover:bg-backroom/20"
          >
            KEMBALI KE UNDANGAN
          </Link>
        </div>
      </main>

      <FooterX />
    </div>
  );
}
