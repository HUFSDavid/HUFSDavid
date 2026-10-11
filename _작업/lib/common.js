// David 자료 공통 헬퍼 (voca/dialogue/grammar/reading에서 공유)
const path = require("path");
const docx = require("docx");
const { makeCover, headerLogo } = require(path.join(__dirname, "..", "scripts", "coverlib.js"));
const {
  Document, Packer, Paragraph, TextRun, Table, TableRow, TableCell, WidthType, AlignmentType, BorderStyle,
  ShadingType, VerticalAlign, Header, Footer, PageNumber, TabStopType, HeightRule, PageBreak,
} = docx;

const C = { ink: "111111", gray: "6B6B6B", light: "F3F3F3", rule: "CFCFCF", rule2: "B5B5B5", hl: "FFF0A0", red: "B3261E", white: "FFFFFF", coral: "E8664F" };
const FONT = "Malgun Gothic";
const PAGE = { W: 11906, H: 16838, L: 1021, R: 1021, T: 1531, B: 1077 }; // 1.8cm, 2.7cm, 1.9cm
const CW = PAGE.W - PAGE.L - PAGE.R;
const NONE = { style: BorderStyle.NONE, size: 0, color: "FFFFFF" };
const NOB = { top: NONE, bottom: NONE, left: NONE, right: NONE, insideHorizontal: NONE, insideVertical: NONE };
const ln = (size, color) => ({ style: BorderStyle.SINGLE, size, color });

// run: t can be string; o: size(pt*2), bold, color, hl, italics, under
const r = (t, o = {}) => new TextRun({ text: t, font: FONT, size: o.size ?? 20, bold: o.bold, italics: o.it,
  color: o.color ?? C.ink, underline: o.under ? { type: o.under === true ? "single" : o.under } : undefined,
  shading: o.hl ? { type: ShadingType.CLEAR, fill: o.hl === true ? C.hl : o.hl, color: "auto" } : undefined });
const p = (runs, o = {}) => new Paragraph({ children: Array.isArray(runs) ? runs : [runs], alignment: o.align,
  spacing: { before: o.before ?? 0, after: o.after ?? 0, line: o.line ?? 264, lineRule: "auto" },
  border: o.border, indent: o.indent, keepNext: o.keepNext, tabStops: o.tabs, pageBreakBefore: o.pb });
const cell = (children, o = {}) => new TableCell({ children: Array.isArray(children) ? children : [children],
  width: { size: o.w, type: WidthType.DXA }, verticalAlign: o.v ?? VerticalAlign.CENTER, columnSpan: o.span,
  borders: o.borders ?? { top: NONE, left: NONE, right: NONE, bottom: ln(4, C.rule) },
  margins: { top: o.mt ?? 50, bottom: o.mb ?? 50, left: o.ml ?? 80, right: o.mr ?? 80 },
  shading: o.fill ? { type: ShadingType.CLEAR, fill: o.fill, color: "auto" } : undefined });
const table = (widths, rows, o = {}) => new Table({ width: { size: widths.reduce((a, b) => a + b, 0), type: WidthType.DXA },
  columnWidths: widths, borders: o.borders ?? NOB, rows });
const row = (cells, o = {}) => new TableRow({ children: cells, tableHeader: o.header, cantSplit: o.cantSplit ?? true,
  height: o.h ? { value: o.h, rule: HeightRule.ATLEAST } : undefined });
// 검정 머리 행
const headRow = (widths, labels, o = {}) => row(labels.map((l, i) => cell(p(r(l, { size: 17, bold: true, color: C.white }), { align: AlignmentType.CENTER }),
  { w: widths[i], fill: C.ink, borders: { top: NONE, left: NONE, right: NONE, bottom: NONE } })), { header: true });

function header(right) {
  return new Header({ children: [new Paragraph({
    children: [headerLogo(), new TextRun({ text: "\t" + right, font: FONT, size: 17, color: C.gray })],
    tabStops: [{ type: TabStopType.RIGHT, position: CW }],
    border: { bottom: ln(12, C.ink) }, spacing: { after: 0, line: 240, lineRule: "auto" },
  })] });
}
function footer() {
  return new Footer({ children: [new Paragraph({
    tabStops: [{ type: TabStopType.RIGHT, position: CW }],
    children: [new TextRun({ text: "Made by David", font: FONT, size: 15, color: C.gray }),
      new TextRun({ children: ["\t", PageNumber.CURRENT, " / ", PageNumber.TOTAL_PAGES], font: FONT, size: 15, color: C.gray })],
  })] });
}
function bodySection(children, right) {
  return { properties: { page: { size: { width: PAGE.W, height: PAGE.H },
    margin: { top: PAGE.T, bottom: PAGE.B, left: PAGE.L, right: PAGE.R, header: 500, footer: 500 } } },
    headers: { default: header(right) }, footers: { default: footer() }, children };
}
async function save(file, coverOpts, children, headRight) {
  const fs = require("fs");
  const doc = new Document({ styles: { default: { document: { run: { font: FONT, size: 20 } } } },
    sections: [makeCover(coverOpts), bodySection(children, headRight)] });
  fs.mkdirSync(path.dirname(file), { recursive: true });
  fs.writeFileSync(file, await Packer.toBuffer(doc));
}
// 왼쪽 굵은 선 안내 상자
const guide = (runs) => table([CW], [row([cell(p(runs, { line: 280 }), { w: CW, fill: C.light, ml: 200, mt: 100, mb: 100,
  borders: { top: NONE, bottom: NONE, right: NONE, left: ln(24, C.ink) } })])]);
const spacer = (after = 120) => p(r(""), { after });
// 시험지 머리 (소제목/제목/형 상자/정보/이름칸)
function testHead({ kicker, title, form = "A형", info, answer = false, criteria }) {
  const out = [];
  out.push(p(r(kicker, { size: 16, bold: true, color: C.gray }), { after: 40 }));
  out.push(table([CW - 1300, 1300], [row([
    cell(p(r(title, { size: 44, bold: true })), { w: CW - 1300, borders: NOB, ml: 0 }),
    cell(p(r(answer ? form + " 정답" : form, { size: 22, bold: true, color: C.white }), { align: AlignmentType.CENTER }), { w: 1300, fill: C.ink, borders: NOB }),
  ])]));
  out.push(p(r(info, { size: 17, color: C.gray }), { before: 80, after: 100, border: { bottom: ln(8, C.ink) } }));
  if (!answer) {
    const w = [800, 2500, 800, 1500, 800, 1000, 800, CW - 8200];
    const labels = ["이름", "", "날짜", "", "점수", "", "판정", "PASS / FAIL"];
    out.push(table(w, [row(labels.map((l, i) => cell(p(r(l, { size: 17, bold: i % 2 === 0, color: i % 2 === 0 ? C.ink : C.gray }), { align: AlignmentType.CENTER }),
      { w: w[i], fill: i % 2 === 0 ? C.light : undefined, borders: { top: ln(4, C.rule2), bottom: ln(4, C.rule2), left: ln(4, C.rule2), right: ln(4, C.rule2) } })), { h: 420 })]));
  } else if (criteria) {
    out.push(table([CW], [row([cell(criteria.map(c => p(r(c, { size: 17 }), { after: 30 })), { w: CW, fill: C.light, ml: 200, mt: 100, mb: 100,
      borders: { top: NONE, bottom: NONE, right: NONE, left: ln(24, C.red) } })])]));
  }
  out.push(spacer(120));
  return out;
}
// 결정적 난수
function rng(seed) { let s = seed >>> 0; return () => { s = (s * 1664525 + 1013904223) >>> 0; return s / 4294967296; }; }
function shuffle(arr, rnd) { const a = arr.slice(); for (let i = a.length - 1; i > 0; i--) { const j = Math.floor(rnd() * (i + 1)); [a[i], a[j]] = [a[j], a[i]]; } return a; }

module.exports = { docx, C, FONT, PAGE, CW, NONE, NOB, ln, r, p, cell, table, row, headRow, save, guide, spacer, testHead, rng, shuffle,
  AlignmentType, VerticalAlign, PageBreak, Paragraph, TextRun };

// 여러 섹션(섹션마다 머리글 다름) 저장
async function saveMulti(file, coverOpts, parts) {
  const fs = require("fs");
  const doc = new Document({ styles: { default: { document: { run: { font: FONT, size: 20 } } } },
    sections: [makeCover(coverOpts), ...parts.map((x) => bodySection(x.children, x.right))] });
  fs.mkdirSync(path.dirname(file), { recursive: true });
  fs.writeFileSync(file, await Packer.toBuffer(doc));
}
module.exports.saveMulti = saveMulti;

// 원문 해설 번호(위첨자) — s: {핵심} 표시 문자열, anchors: [텍스트,...] (해설 순서), render(text,isKey)→runs, whole(isKey)=true면 핵심 구간 안에서 자르지 않음
const CIRC = ["①","②","③","④","⑤","⑥","⑦","⑧","⑨","⑩","⑪","⑫"];
function anchorPositions(s, anchors) {
  const plainS = s.replace(/[{}]/g, "");
  const out = []; const miss = [];
  anchors.forEach((a, i) => { if (!a) return; const at = plainS.indexOf(a); if (at < 0) { miss.push(a); return; } out.push({ pos: at + a.length, label: CIRC[i] }); });
  out.sort((x, y) => x.pos - y.pos);
  return { inserts: out, miss };
}
function annotated(s, inserts, render, wholeKey, supSize = 13, supColor = "E8664F") {
  const sup = (l) => new TextRun({ text: l, font: FONT, size: supSize, superScript: true, bold: true, color: supColor });
  const segsA = []; const re = /\{([^}]*)\}/g; let m, last = 0;
  while ((m = re.exec(s))) { if (m.index > last) segsA.push([0, s.slice(last, m.index)]); segsA.push([1, m[1]]); last = re.lastIndex; }
  if (last < s.length) segsA.push([0, s.slice(last)]);
  const runs = []; let p0 = 0; let k = 0;
  for (const [isKey, t] of segsA) {
    const p1 = p0 + t.length;
    if (isKey && wholeKey) { runs.push(...render(t, true)); while (k < inserts.length && inserts[k].pos <= p1) runs.push(sup(inserts[k++].label)); }
    else { let cur = p0; while (k < inserts.length && inserts[k].pos <= p1) { const ip = inserts[k].pos; if (ip > cur) runs.push(...render(t.slice(cur - p0, ip - p0), !!isKey)); runs.push(sup(inserts[k++].label)); cur = ip; } if (cur < p1) runs.push(...render(t.slice(cur - p0), !!isKey)); }
    p0 = p1;
  }
  while (k < inserts.length) runs.push(sup(inserts[k++].label));
  return runs;
}
module.exports.anchorPositions = anchorPositions;
module.exports.annotated = annotated;
