"use client";

import { motion } from "framer-motion";
import { useRef } from "react";
import { useInView } from "framer-motion";
import { cn } from "@/lib/cn";

export function Reveal({
  children,
  className,
  delay = 0,
}: {
  children: React.ReactNode;
  className?: string;
  delay?: number;
}) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-8% 0px" });

  return (
    <motion.div
      ref={ref}
      className={className}
      initial={{ opacity: 0, y: 18 }}
      animate={inView ? { opacity: 1, y: 0 } : undefined}
      transition={{ duration: 0.55, delay, ease: [0.22, 1, 0.36, 1] }}
    >
      {children}
    </motion.div>
  );
}

export function SectionLabel({
  code,
  children,
}: {
  code: string;
  children: React.ReactNode;
}) {
  return (
    <div className="mb-3 flex flex-wrap items-center gap-2 sm:mb-4 sm:gap-3">
      <span className="rounded border border-backroom/40 bg-backroom/10 px-2 py-0.5 font-mono text-[9px] tracking-[0.2em] text-backroom sm:text-[10px] sm:tracking-[0.25em]">
        {code}
      </span>
      <h2 className="font-[family-name:var(--font-elite)] text-base tracking-wide text-fluorescent sm:text-lg md:text-xl">
        {children}
      </h2>
    </div>
  );
}

export function DataRow({
  label,
  value,
  className,
}: {
  label: string;
  value: string;
  className?: string;
}) {
  return (
    <div className={cn("data-slab px-3 py-2.5 sm:px-4 sm:py-3", className)}>
      <p className="font-mono text-[9px] uppercase tracking-[0.22em] text-backroom-dim sm:text-[10px] sm:tracking-[0.28em]">
        {label}
      </p>
      <p className="mt-1 break-code font-mono text-[13px] text-paper sm:text-sm md:text-base">
        {value}
      </p>
    </div>
  );
}
