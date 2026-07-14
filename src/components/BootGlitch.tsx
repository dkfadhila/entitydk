"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { brand } from "@/lib/data";

/** Boot overlay — fullscreen splash, auto-dismiss ~2.2s or tap to skip */
export function BootGlitch({ onDone }: { onDone?: () => void }) {
  const [show, setShow] = useState(true);
  const [step, setStep] = useState(0);

  const lines = [
    `MOUNT ${brand.zone}`,
    `OPEN ${brand.file}`,
    `DECODE ${brand.code}`,
    "WALLS: IDENTICAL",
    "HUM: OK / NOT OK",
  ];

  useEffect(() => {
    const iv = setInterval(() => setStep((s) => (s + 1) % lines.length), 280);
    const t = setTimeout(() => {
      setShow(false);
      onDone?.();
    }, 2200);
    return () => {
      clearInterval(iv);
      clearTimeout(t);
    };
  }, [onDone, lines.length]);

  const close = () => {
    setShow(false);
    onDone?.();
  };

  return (
    <AnimatePresence>
      {show && (
        <motion.div
          className="fixed inset-0 z-[100] flex flex-col items-center justify-center overflow-hidden bg-[#0c0b07]"
          initial={{ opacity: 1 }}
          exit={{ opacity: 0, filter: "blur(6px)" }}
          transition={{ duration: 0.5 }}
          onClick={close}
          role="dialog"
          aria-label="Boot overlay"
        >
          <div className="pointer-events-none absolute inset-0 opacity-40 hazard-stripes-y mix-blend-multiply" />
          <div className="noise absolute inset-0 opacity-[0.12]" />
          <div className="scanlines absolute inset-0 opacity-50" />

          <p className="relative z-10 font-mono text-[10px] tracking-[0.4em] text-alert warn-flash">
            BOOT · OVERLAY
          </p>

          <motion.p
            className="glitch relative z-10 mt-4 px-4 text-center font-[family-name:var(--font-elite)] text-2xl text-backroom-hot md:text-4xl"
            data-text={brand.code}
            animate={{
              x: [0, -2, 2, -1, 0],
              skewX: [0, 2, -2, 0],
            }}
            transition={{ duration: 0.45, repeat: Infinity, repeatDelay: 1.1 }}
          >
            {brand.code}
          </motion.p>

          <p className="relative z-10 mt-2 font-mono text-xs tracking-[0.35em] text-fog">
            FILE REHYDRATING
          </p>

          <div className="relative z-10 mt-8 w-[min(90vw,20rem)] border border-backroom/30 bg-black/70 p-3 font-mono text-[11px] text-bio">
            <p className="text-backroom-dim">{"> "}session</p>
            <p className="blink-cursor mt-1">{lines[step]}</p>
            <div className="mt-3 h-1 overflow-hidden bg-wall">
              <motion.div
                className="h-full bg-hazard"
                initial={{ width: "0%" }}
                animate={{ width: "100%" }}
                transition={{ duration: 2, ease: "linear" }}
              />
            </div>
          </div>

          <p className="relative z-10 mt-6 font-mono text-[10px] text-fog/70">
            tap / click to skip · {brand.level}
          </p>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
