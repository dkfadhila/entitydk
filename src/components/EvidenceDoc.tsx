"use client";

import type { ReactNode } from "react";

export type EvidenceBlock =
  | { type: "h1" | "h2" | "h3" | "p" | "caption"; text: string; style?: string }
  | { type: "image"; src: string; name: string; mime?: string; bytes?: number }
  | { type: "table"; rows: string[][] };

function cleanText(s: string) {
  return s.replace(/\t+/g, " ").replace(/[ \t]+\n/g, "\n").trim();
}

export function EvidenceDoc({ blocks }: { blocks: EvidenceBlock[] }) {
  const nodes: ReactNode[] = [];
  let fig = 0;

  for (let i = 0; i < blocks.length; i++) {
    const b = blocks[i];
    if (b.type === "h1") {
      nodes.push(
        <h2
          key={i}
          id={`sec-${i}`}
          className="evidence-h1 mt-10 scroll-mt-28 border-l-4 border-alert pl-3 font-[family-name:var(--font-elite)] text-xl text-backroom-hot sm:text-2xl"
        >
          {cleanText(b.text)}
        </h2>
      );
    } else if (b.type === "h2") {
      nodes.push(
        <h3
          key={i}
          id={`sec-${i}`}
          className="evidence-h2 mt-8 scroll-mt-28 font-mono text-base font-semibold tracking-wide text-fluorescent sm:text-lg"
        >
          {cleanText(b.text)}
        </h3>
      );
    } else if (b.type === "h3") {
      nodes.push(
        <h4
          key={i}
          id={`sec-${i}`}
          className="mt-6 scroll-mt-28 font-mono text-sm font-semibold text-backroom sm:text-base"
        >
          {cleanText(b.text)}
        </h4>
      );
    } else if (b.type === "caption") {
      nodes.push(
        <p
          key={i}
          className="mt-2 text-center font-mono text-[11px] italic leading-relaxed text-fog sm:text-xs"
        >
          {cleanText(b.text)}
        </p>
      );
    } else if (b.type === "p") {
      const t = cleanText(b.text);
      if (!t) continue;
      nodes.push(
        <p
          key={i}
          className="mt-3 font-mono text-[13px] leading-relaxed text-paper/90 sm:text-sm sm:leading-7"
        >
          {t}
        </p>
      );
    } else if (b.type === "image") {
      fig += 1;
      const isRaster =
        !b.mime ||
        b.mime.includes("png") ||
        b.mime.includes("jpeg") ||
        b.mime.includes("jpg") ||
        b.mime.includes("gif") ||
        b.mime.includes("webp");
      nodes.push(
        <figure key={i} className="my-6 overflow-hidden border border-backroom/30 bg-black/40">
          <div className="hazard-stripes h-1 w-full opacity-70" />
          <div className="relative w-full bg-[#0c0d09] p-2 sm:p-3">
            {isRaster ? (
              // eslint-disable-next-line @next/next/no-img-element
              <img
                src={b.src}
                alt={`Evidence figure ${fig}`}
                className="mx-auto h-auto max-h-[min(80vh,900px)] w-full object-contain"
                loading="lazy"
              />
            ) : (
              <p className="p-4 font-mono text-xs text-fog">[asset non-raster: {b.name}]</p>
            )}
          </div>
          <figcaption className="border-t border-backroom/20 px-3 py-2 font-mono text-[10px] tracking-[0.18em] text-backroom-dim">
            FIG.{String(fig).padStart(2, "0")} · {b.name}
          </figcaption>
        </figure>
      );
    } else if (b.type === "table") {
      const rows = b.rows || [];
      if (!rows.length) continue;
      nodes.push(
        <div key={i} className="my-5 overflow-x-auto border border-backroom/25 bg-black/30">
          <table className="min-w-full border-collapse font-mono text-[11px] text-paper sm:text-xs">
            <tbody>
              {rows.map((row, ri) => (
                <tr
                  key={ri}
                  className={ri === 0 ? "bg-backroom/10 text-backroom-hot" : "odd:bg-white/[0.02]"}
                >
                  {row.map((cell, ci) => (
                    <td
                      key={ci}
                      className="border border-backroom/15 px-2 py-1.5 align-top whitespace-pre-wrap"
                    >
                      {cell}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      );
    }
  }

  return <div className="evidence-doc">{nodes}</div>;
}
