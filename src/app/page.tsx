"use client";

import Link from "next/link";
import { board, brand, event, protocol, social, subject } from "@/lib/data";
import {
  AnnoyText,
  BiohazardWarningBar,
  HackerMarquee,
  InterferenceFlash,
  PhantomWhispers,
  SideTerminalCrawl,
} from "@/components/HackerChrome";
import { CorridorStage } from "@/components/CorridorStage";
import { PortraitSprite } from "@/components/PortraitSprite";
import { DataRow, Reveal, SectionLabel } from "@/components/ui";
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
        <p className="break-code text-center font-mono text-[10px] tracking-[0.22em] text-backroom-dim sm:tracking-[0.3em]">
          {brand.code} · UPLINK
        </p>
        <a
          href={social.x.href}
          target="_blank"
          rel="noopener noreferrer"
          className="group inline-flex min-h-11 min-w-11 items-center justify-center gap-3 rounded border border-fog/20 bg-wall/80 px-5 py-3 transition active:scale-[0.98] hover:border-backroom/50 hover:bg-wall"
          aria-label="X tirtavex"
        >
          <svg
            viewBox="0 0 24 24"
            className="h-5 w-5 fill-paper transition group-hover:fill-backroom-hot"
            aria-hidden
          >
            <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-4.714-6.231-5.401 6.231H2.744l7.53-8.69L1.254 2.25H8.08l4.253 5.622zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
          </svg>
        </a>
        <p className="font-mono text-[10px] text-fog/50">{brand.level} · defense protocol</p>
      </div>
    </footer>
  );
}

export default function HomePage() {
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
      <div className="scanlines pointer-events-none fixed inset-0 z-[1] opacity-35 md:opacity-40" />

      <main className="relative z-10 mx-auto w-full max-w-3xl px-4 pb-16 pt-4 sm:pt-6 md:px-6 md:pb-20">
        <Reveal>
          <div className="mb-5 flex flex-col gap-3 sm:mb-6 sm:flex-row sm:flex-wrap sm:items-end sm:justify-between">
            <div className="min-w-0 flex-1">
              <p className="font-mono text-[9px] tracking-[0.28em] text-alert sm:text-[10px] sm:tracking-[0.35em]">
                SYSTEM ERROR 404 · FILE WET
              </p>
              <h1
                className="glitch mt-1 break-code font-[family-name:var(--font-elite)] text-[1.35rem] leading-tight text-backroom-hot xs:text-2xl sm:text-3xl md:text-4xl"
                data-text={brand.code}
              >
                <AnnoyText as="span" text={brand.code} className="inline-block break-code" rate={200} />
              </h1>
              <p className="mt-1 break-code font-mono text-[10px] text-fog/70">
                codename zone · {brand.zone}
              </p>
            </div>
            <div className="stamp-wobble w-fit self-start rounded border-2 border-alert/70 px-3 py-2 font-mono text-[10px] font-bold uppercase tracking-widest text-alert sm:self-auto">
              ENTITY ONLY
            </div>
          </div>
        </Reveal>

        <Reveal delay={0.03}>
          <div className="mb-5">
            <Link
              href="/Evidence"
              className="group inline-flex min-h-12 w-full items-center justify-center gap-2 border border-alert/60 bg-alert/10 px-4 py-3 font-mono text-xs font-bold tracking-[0.22em] text-alert transition hover:bg-alert/20 hover:text-paper active:scale-[0.99] sm:text-sm sm:tracking-[0.24em]"
            >
              <span className="warn-flash">⚠</span>
              CEK EVIDENCE
            </Link>
          </div>
        </Reveal>

        <Reveal delay={0.05}>
          <CorridorStage />
        </Reveal>

        <div className="mt-3 max-md:-mx-4 md:mt-4">
          <HackerMarquee />
        </div>

        <Reveal className="mt-8 sm:mt-10" delay={0.08}>
          <SectionLabel code="BROADCAST">Para Entitas</SectionLabel>
          <div className="wet-panel p-4 sm:p-5 md:p-6">
            <p className="font-mono text-[13px] leading-relaxed text-fog sm:text-sm md:text-[15px]">
              Para Entitas.
              <br />
              <br />
              Anomali{" "}
              <span className="break-code text-backroom-hot">{brand.code}</span> dibuka di
              zona liminal <span className="text-paper">{event.place}</span>. Target:{" "}
              <span className="text-bio">{subject.name}</span>. Kehadiran dicatat sebagai
              observer clearance. Dindingnya sama. Hum-nya juga.
            </p>
          </div>
        </Reveal>

        <Reveal className="mt-8 sm:mt-10" delay={0.05}>
          <SectionLabel code="EVENT CORE">Jadwal Zona</SectionLabel>
          <div className="grid grid-cols-1 gap-2.5 xs:gap-3 sm:grid-cols-2">
            <DataRow label="Hari" value={event.day} />
            <DataRow label="Tanggal" value={event.date} />
            <DataRow label="Waktu" value={event.time} />
            <DataRow label="Lokasi" value={event.place} />
          </div>
        </Reveal>

        <Reveal className="mt-8 sm:mt-10">
          <SectionLabel code="SUBJECT FILE">Target Entitas</SectionLabel>
          <div className="wet-panel grid gap-5 p-3 sm:gap-6 sm:p-4 md:grid-cols-[minmax(0,0.9fr)_minmax(0,1.1fr)] md:p-6">
            <div className="relative mx-auto flex w-full max-w-[300px] flex-col items-center md:max-w-[280px]">
              <PortraitSprite intervalMs={2000} className="h-[min(62vh,540px)] sm:h-[min(58vh,520px)]" />
              <p className="mt-2 break-code text-center font-mono text-[9px] tracking-[0.18em] text-backroom-dim sm:text-[10px] sm:tracking-[0.25em]">
                SUBJECT // TIRTA · SPRITE.2F · {brand.code}
              </p>
            </div>
            <div className="flex flex-col gap-2.5 sm:gap-3">
              <DataRow label="Nama" value={subject.name} />
              <DataRow label="NIM" value={subject.nim} />
              <DataRow label="Program Studi" value={subject.program} />
              <DataRow label="Jenis" value={subject.kind} />
              <div className="data-slab px-3 py-3 sm:px-4">
                <p className="font-mono text-[10px] uppercase tracking-[0.28em] text-backroom-dim">
                  Status
                </p>
                <p className="mt-1 font-mono text-sm text-bio blink-cursor">AWAITING DEFENSE</p>
              </div>
            </div>
          </div>
        </Reveal>

        <Reveal className="mt-8 sm:mt-10">
          <SectionLabel code="BOARD OF ENTITIES">Penguji</SectionLabel>
          <div className="grid gap-2.5 sm:gap-3">
            {board.map((b, i) => (
              <motion.div
                key={b.code}
                className="wet-panel flex flex-col gap-1 px-3 py-3.5 sm:px-4 sm:py-4 sm:flex-row sm:items-center sm:justify-between"
                initial={{ opacity: 0, x: -12 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, margin: "-10%" }}
                transition={{ delay: i * 0.08, duration: 0.45 }}
              >
                <div className="min-w-0">
                  <p className="font-mono text-[10px] tracking-[0.25em] text-hazard">{b.code}</p>
                  <p className="mt-1 break-code font-mono text-[13px] text-paper sm:text-sm md:text-base">
                    {b.name}
                  </p>
                </div>
                <p className="shrink-0 font-mono text-[11px] uppercase tracking-[0.16em] text-backroom sm:text-xs sm:tracking-[0.18em]">
                  {b.role}
                </p>
              </motion.div>
            ))}
          </div>
        </Reveal>

        <Reveal className="mt-8 sm:mt-10">
          <SectionLabel code="THESIS PAYLOAD">Judul Skripsi</SectionLabel>
          <div className="wet-panel border-l-4 border-l-bio p-4 terminal-pulse sm:p-5">
            <p className="break-code font-mono text-[10px] uppercase leading-relaxed tracking-wide text-fluorescent sm:text-[11px] md:text-sm">
              {subject.title}
            </p>
          </div>
        </Reveal>

        <Reveal className="mt-8 sm:mt-10">
          <SectionLabel code="QUARANTINE PROTOCOL">Wajib dibaca</SectionLabel>
          <div className="overflow-hidden border border-alert/40 bg-[#140808]/90">
            <div className="hazard-stripes h-2 w-full" />
            <div className="p-4 sm:p-5 md:p-6">
              <p className="break-code font-mono text-[11px] uppercase tracking-[0.16em] text-alert sm:text-xs sm:tracking-[0.2em]">
                ⚠ {brand.code} · zona steril-absurd
              </p>
              <p className="mt-3 font-mono text-[13px] text-fog sm:text-sm">
                Dilarang membawa masuk ke zona sidang:
              </p>
              <ul className="mt-4 space-y-3">
                {protocol.map((item, i) => (
                  <li
                    key={item}
                    className="flex items-start gap-3 font-mono text-[13px] text-paper sm:text-sm"
                  >
                    <span className="mt-0.5 inline-flex h-6 w-6 shrink-0 items-center justify-center border border-alert/50 bg-alert/10 text-[10px] text-alert">
                      {String(i + 1).padStart(2, "0")}
                    </span>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
              <p className="mt-5 font-mono text-[11px] leading-relaxed text-fog/80">
                Pelanggar digeser ke koridor yang lebih basah. Para Entitas mematuhi clearance.
              </p>
            </div>
            <div className="max-md:-mx-px">
              <HackerMarquee reverse variant="alert" />
            </div>
          </div>
        </Reveal>

        <Reveal className="mt-8 sm:mt-10">
          <div className="data-slab px-3 py-5 text-center sm:px-4">
            <p className="break-code font-mono text-[9px] tracking-[0.22em] text-backroom-dim sm:text-[10px] sm:tracking-[0.3em]">
              CLEARANCE WINDOW · {brand.code}
            </p>
            <p className="mt-2 font-[family-name:var(--font-elite)] text-lg text-backroom-hot sm:text-xl">
              {event.day}, {event.date}
            </p>
            <p className="mt-1 font-mono text-sm text-paper">
              {event.time} · {event.place}
            </p>
            <p className="mt-4 font-mono text-xs text-fog">
              Hadir sebagai Entitas. Jaga protokol. Jangan bawa barang aneh.
            </p>
            <Link
              href="/Evidence"
              className="mt-5 inline-flex min-h-11 items-center border border-alert/50 bg-alert/10 px-5 py-2.5 font-mono text-[11px] tracking-[0.2em] text-alert transition hover:bg-alert/20"
            >
              CEK EVIDENCE →
            </Link>
          </div>
        </Reveal>

        <div className="mt-6 max-md:-mx-4 sm:mt-8">
          <HackerMarquee reverse />
        </div>
      </main>

      <FooterX />
    </div>
  );
}
