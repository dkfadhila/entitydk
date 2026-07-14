"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { cn } from "@/lib/cn";

const FRAMES = [
  { src: "/portrait-a.png", alt: "Subject frame A" },
  { src: "/portrait-b.png", alt: "Subject frame B" },
] as const;

/**
 * 2-frame sprite — swap tiap interval biar keliatan "gerak".
 * object-contain + object-bottom: full body, tidak kepotong.
 */
export function PortraitSprite({
  intervalMs = 2200,
  className,
}: {
  intervalMs?: number;
  className?: string;
}) {
  const [i, setI] = useState(0);
  const [glitch, setGlitch] = useState(false);

  useEffect(() => {
    const id = setInterval(() => {
      setGlitch(true);
      setTimeout(() => {
        setI((v) => (v + 1) % FRAMES.length);
        setGlitch(false);
      }, 90);
    }, intervalMs);
    return () => clearInterval(id);
  }, [intervalMs]);

  const frame = FRAMES[i];

  return (
    <div
      className={cn(
        "relative h-[min(62vh,540px)] w-full overflow-hidden rounded-sm border border-backroom/40 bg-[#12130c] sm:h-[min(58vh,520px)]",
        className
      )}
    >
      {/* CRT / containment chrome */}
      <div className="pointer-events-none absolute inset-x-0 top-0 z-20 h-1 hazard-stripes opacity-80" />
      <div className="pointer-events-none absolute left-2 top-2 z-20 font-mono text-[9px] tracking-[0.25em] text-backroom/80">
        SUBJECT.SPR · F{i}
      </div>
      <div className="pointer-events-none absolute bottom-2 right-2 z-20 font-mono text-[9px] text-alert/70">
        LIVE
      </div>

      <AnimatePresence mode="sync">
        <motion.div
          key={frame.src}
          className="absolute inset-0"
          initial={{ opacity: 0, filter: "hue-rotate(20deg) contrast(1.3)" }}
          animate={{
            opacity: 1,
            filter: glitch
              ? "hue-rotate(90deg) contrast(1.6) saturate(0.4)"
              : "hue-rotate(0deg) contrast(1.05) saturate(0.85)",
            x: glitch ? [0, -3, 2, 0] : 0,
          }}
          exit={{ opacity: 0, x: 4 }}
          transition={{ duration: 0.12 }}
        >
          <Image
            src={frame.src}
            alt={frame.alt}
            fill
            priority={i === 0}
            className="object-contain object-bottom"
            sizes="(max-width:768px) 90vw, 280px"
          />
        </motion.div>
      </AnimatePresence>

      {/* scan / wet grade */}
      <div className="pointer-events-none absolute inset-0 z-10 scanlines opacity-40" />
      <div
        className="pointer-events-none absolute inset-0 z-10"
        style={{
          background:
            "radial-gradient(ellipse at 50% 80%, transparent 40%, rgba(0,0,0,.55) 100%), linear-gradient(180deg, rgba(214,194,58,.08), transparent 30%, rgba(0,0,0,.25))",
        }}
      />
      {glitch && (
        <div className="pointer-events-none absolute inset-0 z-30 bg-backroom/10 mix-blend-screen" />
      )}
    </div>
  );
}
