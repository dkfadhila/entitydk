"use client";

import { useEffect, useState, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { brand } from "@/lib/data";

const SCARE_LINES = [
  "JANGAN GANDAKAN.",
  "ENTITY AKAN KELUAR.",
  "FILE INI MILIK ZONA.",
  "DUPLIKASI = PELANGGARAN CLEARANCE.",
  "KORIDOR MENUNGGU.",
  "HUM SEMAKIN KERAS.",
  "KAMU TIDAK AKAN KELUAR.",
];

/** Disable selection + copy/cut/contextmenu; jumpscare on attempt */
export function CopyGuard() {
  const [scare, setScare] = useState(false);
  const [line, setLine] = useState(0);
  const [attempts, setAttempts] = useState(0);

  const trigger = useCallback(() => {
    setScare(true);
    setLine(Math.floor(Math.random() * SCARE_LINES.length));
    setAttempts((a) => a + 1);
    const t = window.setTimeout(() => setScare(false), 2600);
    return () => window.clearTimeout(t);
  }, []);

  useEffect(() => {
    const onCopy = (e: ClipboardEvent) => {
      e.preventDefault();
      if (e.clipboardData) {
        try {
          e.clipboardData.setData("text/plain", "⚠ ENTITY ZONE · NO DUPLICATE");
        } catch {
          /* ignore */
        }
      }
      trigger();
    };
    const onCut = (e: ClipboardEvent) => {
      e.preventDefault();
      trigger();
    };
    const onContext = (e: MouseEvent) => {
      e.preventDefault();
      trigger();
    };
    const onDrag = (e: DragEvent) => {
      e.preventDefault();
    };
    // block common copy shortcuts
    const onKey = (e: KeyboardEvent) => {
      const k = e.key.toLowerCase();
      const ctrl = e.ctrlKey || e.metaKey;
      if (ctrl && (k === "c" || k === "x" || k === "a" || k === "s" || k === "u")) {
        // allow inside inputs/textareas for accessibility? still block on this site
        const target = e.target as HTMLElement | null;
        const isField =
          target &&
          (target.tagName === "INPUT" ||
            target.tagName === "TEXTAREA" ||
            target.isContentEditable);
        if (!isField) {
          e.preventDefault();
          trigger();
        }
      }
      // block devtools-ish combos lightly (F12 / Ctrl+Shift+I) — soft nudge only
      if (k === "f12") {
        e.preventDefault();
        trigger();
      }
      if (ctrl && e.shiftKey && (k === "i" || k === "j" || k === "c")) {
        e.preventDefault();
        trigger();
      }
    };

    document.addEventListener("copy", onCopy);
    document.addEventListener("cut", onCut);
    document.addEventListener("contextmenu", onContext);
    document.addEventListener("dragstart", onDrag);
    document.addEventListener("keydown", onKey);
    return () => {
      document.removeEventListener("copy", onCopy);
      document.removeEventListener("cut", onCut);
      document.removeEventListener("contextmenu", onContext);
      document.removeEventListener("dragstart", onDrag);
      document.removeEventListener("keydown", onKey);
    };
  }, [trigger]);

  return (
    <AnimatePresence>
      {scare && (
        <motion.div
          className="fixed inset-0 z-[200] flex items-center justify-center overflow-hidden bg-black/92"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.08 }}
          onClick={() => setScare(false)}
          role="alertdialog"
          aria-label="duplication warning"
        >
          {/* violent red flash bg */}
          <motion.div
            className="absolute inset-0 bg-alert/25"
            animate={{ opacity: [0.1, 0.5, 0.15, 0.55, 0.1] }}
            transition={{ duration: 0.5, repeat: Infinity }}
          />
          <div className="noise absolute inset-0 opacity-[0.18]" />
          <div className="scanlines absolute inset-0 opacity-70" />
          <div className="hazard-stripes absolute inset-x-0 top-0 h-3 opacity-90" />
          <div className="hazard-stripes absolute inset-x-0 bottom-0 h-3 opacity-90" />

          <div className="relative z-10 px-4 text-center">
            <motion.div
              className="mx-auto mb-4 inline-flex h-16 w-16 items-center justify-center rounded-full border-4 border-alert bg-black text-3xl font-bold text-alert"
              animate={{
                scale: [1, 1.18, 0.95, 1.15, 1],
                rotate: [0, -4, 4, -2, 0],
              }}
              transition={{ duration: 0.45, repeat: Infinity }}
            >
              ☣
            </motion.div>

            <motion.p
              key={line}
              className="glitch font-[family-name:var(--font-elite)] text-2xl font-bold uppercase tracking-wider text-alert sm:text-4xl md:text-5xl"
              data-text={SCARE_LINES[line]}
              initial={{ opacity: 0, scale: 0.8, y: 10 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              transition={{ duration: 0.15 }}
            >
              {SCARE_LINES[line]}
            </motion.p>

            <p className="mt-4 font-mono text-[11px] uppercase tracking-[0.3em] text-paper/80 sm:text-xs">
              {brand.code} · ANTI-DUPLICATE
            </p>
            <p className="mt-2 font-mono text-[10px] text-fog/70">
              entity akan keluar jika digandakan · attempt #{attempts}
            </p>

            <motion.div
              className="mx-auto mt-6 h-1 w-40 overflow-hidden bg-wall"
              initial={{ opacity: 0.6 }}
              animate={{ opacity: 0.6 }}
            >
              <motion.div
                className="h-full bg-alert"
                initial={{ width: "100%" }}
                animate={{ width: "0%" }}
                transition={{ duration: 2.6, ease: "linear" }}
              />
            </motion.div>

            <p className="mt-4 font-mono text-[9px] text-fog/40">
              tap to dismiss
            </p>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
