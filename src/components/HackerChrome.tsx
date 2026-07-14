"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { motion } from "framer-motion";
import { alertBanners, brand, hackerLines, phantomLabels } from "@/lib/data";

const GLITCH_CHARS = "█▓▒░ entitas404/\\|#@*S1D4NG";

function corrupt(text: string, amount = 0.08) {
  return text
    .split("")
    .map((ch) => {
      if (ch === " " || ch === "·" || ch === "/" || ch === ".") return ch;
      return Math.random() < amount
        ? GLITCH_CHARS[Math.floor(Math.random() * GLITCH_CHARS.length)]
        : ch;
    })
    .join("");
}

export function AnnoyText({
  text,
  className = "",
  as: Tag = "span",
  rate = 220,
}: {
  text: string;
  className?: string;
  as?: "span" | "p" | "h1" | "h2";
  rate?: number;
}) {
  const [out, setOut] = useState(text);

  useEffect(() => {
    const id = setInterval(() => {
      if (Math.random() < 0.35) setOut(corrupt(text, 0.12 + Math.random() * 0.14));
      else setOut(text);
    }, rate);
    return () => clearInterval(id);
  }, [text, rate]);

  return (
    <Tag className={className} data-text={text} aria-label={text}>
      {out}
    </Tag>
  );
}

/** CSS + JS dual marquee — always moves on desktop even with reduced-motion OS flag */
function MarqueeTrack({
  children,
  reverse = false,
  pace = "normal",
}: {
  children: React.ReactNode;
  reverse?: boolean;
  pace?: "normal" | "fast" | "faster";
}) {
  const trackRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = trackRef.current;
    if (!el) return;

    // JS drive as primary (CSS may be killed by OS)
    let x = 0;
    let half = 0;
    let raf = 0;
    let last = performance.now();
    const speed = pace === "faster" ? 38 : pace === "fast" ? 30 : 24;
    const dir = reverse ? 1 : -1;

    const measure = () => {
      const first = el.children[0] as HTMLElement | undefined;
      half = first?.scrollWidth || first?.offsetWidth || 0;
    };
    measure();
    const t = window.setTimeout(measure, 100);
    const t2 = window.setTimeout(measure, 400);
    const ro = new ResizeObserver(measure);
    ro.observe(el);

    const tick = (now: number) => {
      const dt = Math.min(0.05, (now - last) / 1000);
      last = now;
      if (half < 20) measure();
      if (half >= 20) {
        x += dir * speed * dt;
        if (!reverse && x <= -half) x += half;
        if (reverse && x >= 0) x -= half;
        el.style.transform = `translate3d(${x}px,0,0)`;
      }
      raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);

    return () => {
      cancelAnimationFrame(raf);
      clearTimeout(t);
      clearTimeout(t2);
      ro.disconnect();
    };
  }, [reverse, pace]);

  const cssClass =
    pace === "faster"
      ? "marquee-force faster"
      : pace === "fast"
        ? "marquee-force fast"
        : reverse
          ? "marquee-force reverse"
          : "marquee-force";

  return (
    <div className="overflow-hidden">
      <div ref={trackRef} className={`flex w-max will-change-transform ${cssClass}`}>
        <div className="flex shrink-0 whitespace-nowrap pr-8">{children}</div>
        <div className="flex shrink-0 whitespace-nowrap pr-8" aria-hidden>
          {children}
        </div>
      </div>
    </div>
  );
}

export function HackerMarquee({
  reverse = false,
  variant = "default",
}: {
  reverse?: boolean;
  variant?: "default" | "alert" | "bio";
}) {
  const items =
    variant === "alert"
      ? alertBanners
      : variant === "bio"
        ? [
            `${brand.code} · BIOHAZARD CLEARANCE`,
            "NO SHARP OBJECTS · NO NARCOTICS · NO WEIRD CARGO",
            "THE BUZZING MEANS THE LIGHTS ARE HONEST",
            "YOU HAVE ALWAYS BEEN IN THIS CORRIDOR",
            ...alertBanners.slice(0, 2),
          ]
        : hackerLines;

  const color =
    variant === "alert"
      ? "text-alert"
      : variant === "bio"
        ? "text-hazard"
        : "text-bio";

  const bg =
    variant === "alert"
      ? "bg-alert/15 border-alert/50"
      : variant === "bio"
        ? "bg-hazard/15 border-hazard/50"
        : "bg-black/55 border-backroom/35";

  const pace = variant === "alert" ? "faster" : variant === "bio" ? "fast" : "normal";

  const row = items.map((line, i) => (
    <span key={`${line}-${i}`} className="mx-5 inline-flex items-center gap-3">
      <span className="text-backroom-dim">//</span>
      <span>{line}</span>
      <span className="text-backroom-dim">·</span>
    </span>
  ));

  return (
    <div
      className={`relative border-y ${bg} py-2.5 font-mono text-[11px] uppercase tracking-wider ${color} md:text-xs`}
    >
      <MarqueeTrack reverse={reverse} pace={pace as "normal" | "fast" | "faster"}>
        {row}
      </MarqueeTrack>
    </div>
  );
}

export function BiohazardWarningBar() {
  return (
    <div className="sticky top-0 z-50">
      <div className="hazard-stripes h-1.5 w-full sm:h-2" aria-hidden />
      <div className="flex items-center justify-center gap-2 border-b border-alert/50 bg-[#1a0808]/96 px-2 py-2 backdrop-blur-sm sm:gap-3 sm:px-3">
        <span
          className="inline-flex h-6 w-6 shrink-0 items-center justify-center rounded-full border-2 border-alert bg-black text-[10px] font-bold text-alert bio-ring warn-flash sm:h-7 sm:w-7"
          aria-hidden
        >
          ☣
        </span>
        <div className="min-w-0 text-center">
          <p className="break-code font-mono text-[9px] font-bold uppercase tracking-[0.14em] text-alert sm:text-[10px] sm:tracking-[0.22em] md:text-xs">
            <AnnoyText text={`${brand.code} · BIOHAZARD`} rate={260} />
          </p>
        </div>
      </div>
      <div className="max-md:text-[10px]">
        <HackerMarquee variant="bio" />
      </div>
    </div>
  );
}

export function SideTerminalCrawl() {
  const lines = [
    ...hackerLines,
    `${brand.code} STILL MOUNTED`,
    "WAITING FOR ENTITIES…",
    "HUM: 60Hz FOREVER",
  ];
  const wrapRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = wrapRef.current;
    if (!el) return;
    let y = 0;
    let raf = 0;
    let last = performance.now();
    const tick = (now: number) => {
      const dt = Math.min(0.05, (now - last) / 1000);
      last = now;
      y -= 12 * dt;
      if (y < -700) y = 0;
      el.style.transform = `translate3d(0,${y}px,0)`;
      raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, []);

  const col = (
    <div className="flex flex-col gap-3 py-4">
      {lines.map((l, i) => (
        <span key={i} className="block px-2">
          {"> "}
          {l}
        </span>
      ))}
    </div>
  );

  return (
    <div
      className="pointer-events-none fixed right-0 top-28 z-20 hidden h-[55vh] w-40 overflow-hidden border-l border-bio/25 bg-black/40 font-mono text-[9px] leading-relaxed text-bio/60 lg:block"
      aria-hidden
    >
      <div ref={wrapRef} className="will-change-transform">
        {col}
        {col}
      </div>
    </div>
  );
}

export function PhantomWhispers() {
  const spots = useMemo(
    () =>
      phantomLabels.map((label, i) => ({
        label,
        top: `${8 + ((i * 17) % 78)}%`,
        left: `${(i * 23 + 5) % 88}%`,
        delay: i * 0.35,
        dur: 3.2 + (i % 5) * 0.4,
        rot: -18 + (i % 7) * 5,
      })),
    []
  );

  return (
    <div className="pointer-events-none fixed inset-0 z-[2] overflow-hidden" aria-hidden>
      {spots.map((s) => (
        <motion.span
          key={s.label + s.top}
          className="absolute font-mono text-[10px] font-bold uppercase tracking-[0.25em] text-backroom/30 md:text-xs"
          style={{ top: s.top, left: s.left, rotate: s.rot }}
          initial={{ opacity: 0 }}
          animate={{
            opacity: [0, 0.5, 0.12, 0.55, 0],
            x: [0, 10, -8, 4, 0],
            y: [0, -12, 6, -4, 0],
          }}
          transition={{
            duration: s.dur,
            delay: s.delay,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        >
          {s.label}
        </motion.span>
      ))}
    </div>
  );
}

export function InterferenceFlash() {
  const [on, setOn] = useState(false);
  const [top, setTop] = useState(30);

  useEffect(() => {
    let t: ReturnType<typeof setTimeout>;
    const loop = () => {
      t = setTimeout(
        () => {
          setTop(15 + Math.random() * 60);
          setOn(true);
          setTimeout(() => setOn(false), 110);
          loop();
        },
        2400 + Math.random() * 3200
      );
    };
    loop();
    return () => clearTimeout(t);
  }, []);

  if (!on) return null;
  return (
    <div
      className="pointer-events-none fixed inset-x-0 z-[45] h-10 bg-backroom/30 mix-blend-screen"
      style={{ top: `${top}%` }}
      aria-hidden
    />
  );
}
