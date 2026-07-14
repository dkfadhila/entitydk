"use client";

import type { ReactNode } from "react";

export type EvidenceBlock =
  | { type: "title" | "h1" | "h2" | "h3" | "p" | "caption"; text: string; style?: string }
  | { type: "image"; src: string; name: string; mime?: string; bytes?: number }
  | { type: "table"; rows: string[][] };

function cleanText(s: string) {
  return s.replace(/\t+/g, " ").replace(/[ \t]+\n/g, "\n").trim();
}

function isBibliographyLine(text: string) {
  // rough APA-ish author year
  return /\(\d{4}\)/.test(text) || /^\S+,.+\d{4}/.test(text);
}

export function EvidenceDoc({ blocks }: { blocks: EvidenceBlock[] }) {
  const nodes: ReactNode[] = [];
  let fig = 0;
  let inPustaka = false;

  for (let i = 0; i < blocks.length; i++) {
    const b = blocks[i];

    if (b.type === "h1" && /DAFTAR PUSTAKA/i.test(b.text)) inPustaka = true;
    if (b.type === "h1" && /LAMPIRAN/i.test(b.text) && !/^Lampiran\b/i.test(b.text)) inPustaka = false;

    if (b.type === "title") {
      nodes.push(
        <h1
          key={i}
          id={`sec-${i}`}
          className="evidence-title mb-8 scroll-mt-28 text-center font-[family-name:var(--font-elite)] text-[1.4rem] font-bold leading-snug tracking-wide text-backroom-hot sm:text-2xl md:text-[1.85rem]"
        >
          {cleanText(b.text)}
        </h1>
      );
      continue;
    }

    if (b.type === "h1") {
      nodes.push(
        <h2
          key={i}
          id={`sec-${i}`}
          className="evidence-h1 mt-12 scroll-mt-28 border-l-4 border-alert pl-3 font-[family-name:var(--font-elite)] text-xl font-bold uppercase tracking-wide text-backroom-hot sm:text-2xl"
        >
          {cleanText(b.text)}
        </h2>
      );
      continue;
    }

    if (b.type === "h2") {
      const label = cleanText(b.text);
      const isLampiran = /^Lampiran\b/i.test(label);
      nodes.push(
        <h3
          key={i}
          id={`sec-${i}`}
          className={
            isLampiran
              ? "evidence-h2 mt-8 scroll-mt-28 font-mono text-sm font-bold tracking-wide text-hazard sm:text-base"
              : "evidence-h2 mt-8 scroll-mt-28 font-mono text-base font-bold tracking-wide text-fluorescent sm:text-lg"
          }
        >
          {label}
        </h3>
      );
      continue;
    }

    if (b.type === "h3") {
      nodes.push(
        <h4
          key={i}
          id={`sec-${i}`}
          className="evidence-h3 mt-6 scroll-mt-28 font-mono text-sm font-semibold text-backroom sm:text-[0.95rem]"
        >
          {cleanText(b.text)}
        </h4>
      );
      continue;
    }

    if (b.type === "caption") {
      nodes.push(
        <p
          key={i}
          className="evidence-caption mx-auto mt-2 max-w-2xl text-center font-mono text-[11px] font-medium italic leading-relaxed text-fog sm:text-xs"
        >
          {cleanText(b.text)}
        </p>
      );
      continue;
    }

    if (b.type === "p") {
      const text = cleanText(b.text);
      if (!text) continue;
      const biblio = inPustaka || isBibliographyLine(text);
      nodes.push(
        <p
          key={i}
          className={
            biblio
              ? "evidence-biblio mt-2 pl-4 -indent-4 font-mono text-[12px] leading-relaxed text-paper/85 sm:text-[13px] sm:leading-7"
              : "evidence-p mt-3 text-justify font-mono text-[13px] leading-relaxed text-paper/90 sm:text-sm sm:leading-7"
          }
        >
          {text}
        </p>
      );
      continue;
    }

    if (b.type === "image") {
      fig += 1;
      const isRaster =
        !b.mime ||
        b.mime.includes("png") ||
        b.mime.includes("jpeg") ||
        b.mime.includes("jpg") ||
        b.mime.includes("gif") ||
        b.mime.includes("webp");
      // next block caption?
      const next = blocks[i + 1];
      const nextCaption =
        next && next.type === "caption" ? cleanText(next.text) : null;

      nodes.push(
        <figure key={i} className="evidence-figure my-7 overflow-hidden border border-backroom/30 bg-black/40">
          <div className="hazard-stripes h-1 w-full opacity-70" />
          <div className="relative w-full bg-[#0c0d09] p-2 sm:p-3">
            {isRaster ? (
              // eslint-disable-next-line @next/next/no-img-element
              <img
                src={b.src}
                alt={nextCaption || `Gambar ${fig}`}
                className="mx-auto h-auto max-h-[min(80vh,900px)] w-full object-contain"
                loading="lazy"
              />
            ) : (
              <p className="p-4 font-mono text-xs text-fog">[asset non-raster: {b.name}]</p>
            )}
          </div>
          {nextCaption ? (
            <figcaption className="evidence-caption border-t border-backroom/20 px-3 py-2.5 text-center font-mono text-[11px] font-medium italic leading-relaxed text-fog sm:text-xs">
              {nextCaption}
            </figcaption>
          ) : (
            <figcaption className="border-t border-backroom/20 px-3 py-2 font-mono text-[10px] tracking-[0.18em] text-backroom-dim">
              FIG.{String(fig).padStart(2, "0")}
            </figcaption>
          )}
        </figure>
      );
      // skip following caption block so it isn't duplicated under figure
      if (nextCaption) {
        i += 1;
      }
      continue;
    }

    if (b.type === "table") {
      const rows = b.rows || [];
      if (!rows.length) continue;
      // previous caption for table?
      nodes.push(
        <div key={i} className="evidence-table my-6 overflow-x-auto border border-backroom/25 bg-black/30">
          <table className="min-w-full border-collapse font-mono text-[11px] text-paper sm:text-xs">
            <tbody>
              {rows.map((row, ri) => (
                <tr
                  key={ri}
                  className={ri === 0 ? "bg-backroom/10 font-semibold text-backroom-hot" : "odd:bg-white/[0.02]"}
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

  return <div className="evidence-doc space-y-0">{nodes}</div>;
}
