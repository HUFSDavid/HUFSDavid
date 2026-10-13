// David 공통 표지 v2 — 구글 미리보기에서도 1쪽 (바깥 프레임 표·exact 줄간격 없음)
const fs = require("fs");
const path = require("path");
const docx = require(require.resolve("docx", { paths: [process.cwd(), __dirname] }));
const {
  Paragraph, TextRun, Table, TableRow, TableCell, WidthType, AlignmentType, BorderStyle,
  ShadingType, VerticalAlign, HeightRule, ImageRun,
} = docx;

const ASSETS = process.env.DAVID_ASSETS || path.join(__dirname, "..", "assets");
const C = { ink: "111111", gray: "6B6B6B", mid: "9A9A9A", light: "CFCFCF", ghost: "E4E4E4", hl: "FFF0A0", white: "FFFFFF",
  jls: ["0072BB", "EE1556", "F7A11A", "003A70"] };
const FONT = "Malgun Gothic";
const PAGE = { W: 11906, H: 16838, M: 1134 };
const CW = PAGE.W - PAGE.M * 2;
const NONE = { style: BorderStyle.NONE, size: 0, color: "FFFFFF" };
const NOB = { top: NONE, bottom: NONE, left: NONE, right: NONE, insideHorizontal: NONE, insideVertical: NONE };
const line = (size, color) => ({ style: BorderStyle.SINGLE, size, color });

const r = (t, o = {}) => new TextRun({ text: t, font: FONT, size: o.size ?? 20, bold: o.bold, color: o.color ?? C.ink,
  characterSpacing: o.sp, shading: o.fill ? { type: ShadingType.CLEAR, fill: o.fill, color: "auto" } : undefined });
const p = (runs, o = {}) => new Paragraph({ children: runs, alignment: o.align,
  spacing: { before: o.before ?? 0, after: o.after ?? 0, line: o.line ?? 276, lineRule: o.exact ? "exact" : "auto" },
  border: o.border, indent: o.indent });
const cell = (children, o = {}) => new TableCell({ children, width: { size: o.w, type: WidthType.DXA },
  verticalAlign: o.v ?? VerticalAlign.TOP, borders: o.borders ?? NOB,
  margins: { top: o.mt ?? 0, bottom: o.mb ?? 0, left: o.ml ?? 0, right: o.mr ?? 0 },
  shading: o.fill ? { type: ShadingType.CLEAR, fill: o.fill, color: "auto" } : undefined });
const tbl = (widths, rows) => new Table({ width: { size: widths.reduce((a, b) => a + b, 0), type: WidthType.DXA }, columnWidths: widths, borders: NOB, rows });
const img = (file, h) => {
  const buf = fs.readFileSync(path.join(ASSETS, file));
  const w = buf.readUInt32BE(16), hh = buf.readUInt32BE(20); // PNG IHDR
  return new ImageRun({ data: buf, type: "png", transformation: { width: Math.round((w / hh) * h), height: h } });
};

function makeCover(o) {
  const top = tbl([CW - 4000, 4000], [new TableRow({ children: [
    cell([p([img("jls.png", 40)])], { w: CW - 4000, v: VerticalAlign.CENTER }),
    cell([
      p([r(o.term, { size: 16, bold: true, sp: 10 })], { align: AlignmentType.RIGHT }),
      p([r(o.org ?? "JLS 정상어학원  ·  David English", { size: 14, color: C.mid, sp: 10 })], { align: AlignmentType.RIGHT, before: 40 }),
    ], { w: 4000, v: VerticalAlign.CENTER }),
  ] })]);
  const rule = p([r("", { size: 4 })], { border: { bottom: line(18, C.ink) }, after: 0 });

  const lw = 3700, rw = CW - lw;
  const titleBlock = tbl([lw, rw], [new TableRow({ cantSplit: true, children: [
    cell([
      p([r(o.unitLabel ?? "LESSON", { size: 22, bold: true, sp: 120 })], { after: 0 }),
      p([r(o.unitNo, { size: 160, bold: true, color: C.ghost, sp: -40 })], { line: 240 }),
    ], { w: lw, v: VerticalAlign.BOTTOM, borders: { ...NOB, right: line(12, C.ink) }, mr: 200 }),
    cell([
      p([r(o.part, { size: 22, bold: true, color: C.gray, sp: 40 })], { after: 120 }),
      p([r(` ${o.title} `, { size: 84, bold: true, fill: C.hl })], { line: 240, after: 160 }),
      p([r(o.subtitle, { size: 24 })], { after: 60 }),
    ], { w: rw, v: VerticalAlign.BOTTOM, ml: 360, mb: 140 }),
  ] })]);

  const iw = [1300, CW - 1300];
  const info = tbl(iw, o.info.map(([k, v], i) => new TableRow({ cantSplit: true, children: [
    cell([p([r(k, { size: 16, bold: true, color: C.gray, sp: 30 })])], { w: iw[0], mt: 110, mb: 110, borders: { ...NOB, top: i === 0 ? line(10, C.ink) : line(4, C.light), bottom: line(4, C.light) } }),
    cell([p([r(v, { size: 18 })])], { w: iw[1], mt: 110, mb: 110, borders: { ...NOB, top: i === 0 ? line(10, C.ink) : line(4, C.light), bottom: line(4, C.light) } }),
  ] })));

  const chips = p([
    r(`  ${o.kicker ?? "ENGLISH"}  `, { size: 16, bold: true, color: C.white, fill: C.ink, sp: 40 }),
    r(`   ${o.tag ?? "내신 대비"}`, { size: 17, bold: true, color: C.gray, sp: 20 }),
  ], { before: 1500, after: 500 });

  const bw = [2600, CW - 2600 - 2100, 2100];
  const bottom = tbl(bw, [new TableRow({ cantSplit: true, children: [
    cell([p([img("david.png", 96)])], { w: bw[0], v: VerticalAlign.BOTTOM }),
    cell([
      p([r("NAME", { size: 15, bold: true, color: C.gray, sp: 50 })], { after: 80 }),
      p([r(" ", { size: 26 })], { indent: { right: 500 }, border: { bottom: line(8, C.ink) }, after: 0 }),
    ], { w: bw[1], v: VerticalAlign.BOTTOM, ml: 300, mb: 60 }),
    cell([p([r(o.edition, { size: 26, bold: true, color: C.white, sp: 60 })], { align: AlignmentType.CENTER })],
      { w: bw[2], v: VerticalAlign.CENTER, fill: C.ink, mt: 200, mb: 200 }),
  ] })]);

  const sw = [CW * 0.4, CW * 0.25, CW * 0.15, CW * 0.2].map(Math.round); sw[3] = CW - sw[0] - sw[1] - sw[2];
  const stripe = tbl(sw, [new TableRow({ height: { value: 110, rule: HeightRule.EXACT },
    children: C.jls.map((c, i) => cell([p([r("", { size: 2 })], { line: 20, exact: true })], { w: sw[i], fill: c })) })]);

  return {
    properties: { page: { size: { width: PAGE.W, height: PAGE.H }, margin: { top: PAGE.M, bottom: PAGE.M, left: PAGE.M, right: PAGE.M, header: 400, footer: 400 } } },
    children: [top, rule, chips, titleBlock, p([r("")], { after: 500 }), info, p([r("")], { before: 2100, after: 0 }), bottom, p([r("", { size: 2 })], { after: 160, line: 240 }), stripe],
  };
}

// 내지 머리글용 DAVID 로고 (높이 44px ≈ 1.15cm)
function headerLogo(h = 44) { return img("david.png", h); }

module.exports = { makeCover, headerLogo, ASSETS };
