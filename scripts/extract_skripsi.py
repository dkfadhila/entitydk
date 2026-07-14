"""Extract ordered text + images from skripsi.docx into evidence assets."""
from __future__ import annotations

import hashlib
import json
import re
from pathlib import Path

from docx import Document
from docx.oxml.ns import qn
from docx.table import Table
from docx.text.paragraph import Paragraph
from docx.parts.image import ImagePart

ROOT = Path(__file__).resolve().parents[1]
SRC = ROOT / "scripts" / "skripsi.docx"
OUT_DIR = ROOT / "public" / "evidence" / "images"
OUT_JSON = ROOT / "src" / "lib" / "evidence-content.json"


def save_image(part: ImagePart, saved: dict, counter: list[int]):
    blob = part.blob
    h = hashlib.md5(blob).hexdigest()[:10]
    if h in saved:
        return saved[h]
    counter[0] += 1
    ext = {
        "image/png": ".png",
        "image/jpeg": ".jpg",
        "image/jpg": ".jpg",
        "image/gif": ".gif",
        "image/webp": ".webp",
        "image/bmp": ".bmp",
        "image/tiff": ".tiff",
        "image/x-emf": ".emf",
        "image/x-wmf": ".wmf",
    }.get(part.content_type, ".bin")
    name = f"fig-{counter[0]:03d}-{h}{ext}"
    (OUT_DIR / name).write_bytes(blob)
    info = {
        "src": f"/evidence/images/{name}",
        "name": name,
        "mime": part.content_type,
        "bytes": len(blob),
    }
    saved[h] = info
    return info


def para_images(paragraph: Paragraph, img_map: dict, saved: dict, counter: list[int]):
    images = []
    for blip in paragraph._element.findall(".//" + qn("a:blip")):
        rid = blip.get(qn("r:embed"))
        if rid and rid in img_map:
            images.append(save_image(img_map[rid], saved, counter))
    return images


def style_name(paragraph: Paragraph) -> str:
    try:
        return paragraph.style.name if paragraph.style else "Normal"
    except Exception:
        return "Normal"


def classify_heading(text: str, style: str):
    t = text.strip()
    s = (style or "").lower()
    if not t:
        return None
    if "heading 1" in s:
        return "h1"
    if "heading 2" in s:
        return "h2"
    if "heading 3" in s:
        return "h3"
    if "title" in s:
        return "h1"
    if re.match(r"^BAB\s+[IVXLC0-9]+", t, re.I):
        return "h1"
    upper = t.upper()
    markers = [
        "HALAMAN JUDUL",
        "HALAMAN PENGESAHAN",
        "HALAMAN PERNYATAAN",
        "ABSTRAK",
        "ABSTRACT",
        "KATA PENGANTAR",
        "DAFTAR ISI",
        "DAFTAR GAMBAR",
        "DAFTAR TABEL",
        "DAFTAR LAMPIRAN",
        "DAFTAR PUSTAKA",
        "LAMPIRAN",
        "PENDAHULUAN",
        "TINJAUAN PUSTAKA",
        "METODE PENELITIAN",
        "METODOLOGI",
        "HASIL DAN PEMBAHASAN",
        "HASIL PENELITIAN",
        "PEMBAHASAN",
        "KESIMPULAN DAN SARAN",
        "KESIMPULAN",
        "SARAN",
    ]
    if len(t) < 90 and any(upper == m or upper.startswith(m + " ") or upper.startswith(m) for m in markers):
        return "h1"
    if re.match(r"^\d+\.\d+\.\d+\s+\S", t):
        return "h3"
    if re.match(r"^\d+\.\d+\s+\S", t) and len(t) < 120:
        return "h2"
    if re.match(r"^\d+\s+[A-ZÀ-ÖØ-Þ]", t) and len(t) < 100 and "heading" in s:
        return "h2"
    return None


def main():
    if not SRC.exists():
        raise SystemExit(f"missing {SRC}")
    OUT_DIR.mkdir(parents=True, exist_ok=True)
    # clean previous extract images
    for p in OUT_DIR.glob("fig-*"):
        p.unlink()

    doc = Document(str(SRC))
    img_map = {}
    for rel in doc.part.rels.values():
        if "image" in rel.reltype:
            img_map[rel.rId] = rel.target_part

    saved = {}
    counter = [0]
    blocks = []

    body = doc.element.body
    for child in body.iterchildren():
        if child.tag == qn("w:p"):
            p = Paragraph(child, doc)
            text = p.text.replace("\u00a0", " ").strip()
            images = para_images(p, img_map, saved, counter)
            style = style_name(p)
            if not text and not images:
                continue
            if images and not text:
                for im in images:
                    blocks.append({"type": "image", **im})
                continue
            level = classify_heading(text, style)
            if level:
                blocks.append({"type": level, "text": text, "style": style})
            else:
                # caption-ish
                if re.match(r"^(Gambar|Figure|Tabel|Table)\s+\d+", text, re.I):
                    blocks.append({"type": "caption", "text": text, "style": style})
                else:
                    blocks.append({"type": "p", "text": text, "style": style})
            for im in images:
                blocks.append({"type": "image", **im})
        elif child.tag == qn("w:tbl"):
            table = Table(child, doc)
            rows = []
            for row in table.rows:
                cells = []
                for cell in row.cells:
                    cell_text = "\n".join(
                        pp.text.strip() for pp in cell.paragraphs if pp.text.strip()
                    )
                    for pp in cell.paragraphs:
                        for im in para_images(pp, img_map, saved, counter):
                            blocks.append({"type": "image", **im})
                    cells.append(cell_text)
                rows.append(cells)
            if any(any((c or "").strip() for c in r) for r in rows):
                blocks.append({"type": "table", "rows": rows})

    meta = {
        "title": "ANALISIS DINAMIKA ATMOSFER KEJADIAN BANJIR PADA TANGGAL 25 MARET 2025 DI KABUPATEN KUDUS",
        "author": "Decka Fadhila Tirta",
        "nim": "22306144046",
        "source": SRC.name,
        "blockCount": len(blocks),
        "imageCount": counter[0],
        "uniqueImages": len(saved),
        "textChars": sum(len(b.get("text", "")) for b in blocks),
    }
    OUT_JSON.write_text(
        json.dumps({"meta": meta, "blocks": blocks}, ensure_ascii=False),
        encoding="utf-8",
    )
    print(json.dumps(meta, indent=2, ensure_ascii=False))
    heads = [b["text"][:100] for b in blocks if b["type"] in ("h1", "h2", "h3")][:40]
    print("HEADINGS:")
    for h in heads:
        print(" -", h)
    print("json_bytes", OUT_JSON.stat().st_size)
    print("images", len(list(OUT_DIR.glob("fig-*"))))


if __name__ == "__main__":
    main()
