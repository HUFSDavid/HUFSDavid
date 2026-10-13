// 독해 리뷰테스트 시험지 (Word): 학생용(표지 + 시험지 1장) / 교사용(표지 + 정답·해설 1장)
// Usage: node build_review_sheet.js data.json <출력 폴더>   (data.reviewSheet 사용)
const fs = require("fs");
const path = require("path");
const docx = require(require.resolve("docx", { paths: [process.cwd(), __dirname] }));
const { Document, Packer, Paragraph, TextRun, Table, TableRow, TableCell, WidthType, AlignmentType, BorderStyle, ShadingType, VerticalAlign, Header, Footer, TabStopType, PageNumber } = docx;
const { makeCover, headerLogo } = require("./coverlib.js");

const [, , DATA_PATH, OUT_DIR] = process.argv;
if (!DATA_PATH || !OUT_DIR) { console.error("usage: node build_review_sheet.js data.json outdir"); process.exit(1); }
const D = JSON.parse(fs.readFileSync(DATA_PATH, "utf8"));
const RS = D.reviewSheet;
const FONT = "Malgun Gothic";
const INK = "111111", GRAY = "6B6B6B", LIGHT = "D9D9D9", RED = "D6402B", HL = "FFF0A0", BAND = "F2F2F2";
const PAGE = { W: 11906, H: 16838, M: 850 };
const CW = PAGE.W - PAGE.M * 2;
const NONE = { style: BorderStyle.NONE, size: 0, color: "FFFFFF" };
const NOB = { top: NONE, bottom: NONE, left: NONE, right: NONE, insideHorizontal: NONE, insideVertical: NONE };
const ln = (size, color) => ({ style: BorderStyle.SINGLE, size, color });

const r = (t, o = {}) => new TextRun({ text: t, font: FONT, size: o.size ?? 21, bold: o.bold, italics: o.it, color: o.color ?? INK,
  shading: o.fill ? { type: ShadingType.CLEAR, fill: o.fill, color: "auto" } : undefined, underline: o.u ? {} : undefined });
const p = (runs, o = {}) => new Paragraph({ children: runs, alignment: o.align, keepNext: o.keepNext,
  spacing: { before: o.before ?? 0, after: o.after ?? 0, line: o.line ?? 264, lineRule: "auto" }, indent: o.indent, border: o.border, tabStops: o.tabs });
const cell = (children, o = {}) => new TableCell({ children, width: { size: o.w, type: WidthType.DXA }, verticalAlign: o.v ?? VerticalAlign.CENTER,
  borders: o.borders ?? NOB, margins: { top: o.mt ?? 60, bottom: o.mb ?? 60, left: o.ml ?? 100, right: o.mr ?? 100 },
  shading: o.fill ? { type: ShadingType.CLEAR, fill: o.fill, color: "auto" } : undefined });

// 문항 텍스트 표기: [A / B] = 고르기, {c____} = 첫 글자 빈칸(정답 칸), (A)(B) = 요약문 빈칸 기호
function qRuns(text, item, teacher) {
  const out = [];
  const parts = text.split(/(\[[^\]]+\]|\{[^}]+\}|\(A\)|\(B\))/).filter(Boolean);
  let bi = 0;
  for (const t of parts) {
    if (/^\[.*\]$/.test(t)) out.push(r(t, { bold: true }));
    else if (/^\{.*\}$/.test(t)) {
      const inner = t.slice(1, -1), ans = Array.isArray(item.a) ? item.a[bi] : item.a; bi++;
      if (teacher) out.push(r(` ${ans} `, { bold: true, color: RED, u: true }));
      else out.push(r(inner.replace(/_+/, (m) => "_".repeat(Math.max(m.length + 4, 12))), { bold: true }));
    } else if (/^\([AB]\)$/.test(t)) out.push(r(t, { bold: true, color: RED }));
    else out.push(r(t));
  }
  return out;
}

function sheet(teacher) {
  const kids = [];
  // 제목 띠 + 이름·점수
  const tw = [CW - 3600, 3600];
  kids.push(new Table({ width: { size: CW, type: WidthType.DXA }, columnWidths: tw, borders: NOB, rows: [new TableRow({ children: [
    cell([p([r(RS.title, { size: 30, bold: true })]), p([r(RS.subtitle, { size: 17, color: GRAY })], { before: 40 })], { w: tw[0], ml: 0, borders: { ...NOB, bottom: ln(14, INK) } }),
    cell([p(teacher ? [r("정답 · 해설", { size: 22, bold: true, color: RED })] : [r("이름 ", { size: 18, bold: true, color: GRAY }), r("______________", { size: 18, color: GRAY }), r("    점수 ", { size: 18, bold: true, color: GRAY }), r(`____ / ${RS.total || 15}`, { size: 18, color: GRAY })], { align: AlignmentType.RIGHT })],
      { w: tw[1], mr: 0, borders: { ...NOB, bottom: ln(14, INK) } }),
  ] })] }));
  let no = 0;
  RS.sections.forEach((sec) => {
    kids.push(p([r(` ${sec.title} `, { size: 19, bold: true, fill: HL }), r(sec.instruction ? `   ${sec.instruction}` : "", { size: 16, color: GRAY })], { before: teacher ? 200 : 300, after: 80, keepNext: true }));
    if (sec.box) kids.push(new Table({ width: { size: CW, type: WidthType.DXA }, columnWidths: [CW], borders: NOB, rows: [new TableRow({ children: [
      cell([p([r("보기   ", { size: 16, bold: true, color: GRAY }), r(sec.box, { size: 17 })])], { w: CW, fill: BAND, ml: 160, borders: { top: ln(4, LIGHT), bottom: ln(4, LIGHT), left: ln(4, LIGHT), right: ln(4, LIGHT) } }),
    ] })] }));
    sec.items.forEach((it) => {
      no++;
      const runs = [r(`${no}. `, { bold: true }), ...qRuns(it.q, it, teacher)];
      if (teacher && !/\{/.test(it.q)) runs.push(r(`   → ${Array.isArray(it.a) ? it.a.join(" / ") : it.a}`, { bold: true, color: RED }));
      if (!teacher && it.answerLine) runs.push(r("   ____________________________", { color: GRAY }));
      if (it.src) runs.push(r(`  (${it.src})`, { size: 15, color: GRAY }));
      kids.push(p(runs, { before: teacher ? 50 : 110, after: teacher ? 0 : 110, line: teacher ? 264 : 300, indent: { left: 340, hanging: 340 } }));
      if (teacher && it.why) kids.push(p([r(it.why, { size: 15, color: GRAY })], { after: 30, line: 240, indent: { left: 340 } }));
    });
  });
  return kids;
}

function doc(teacher) {
  const cover = makeCover({ ...RS.cover, edition: teacher ? "교사용" : "학생용" });
  const header = new Header({ children: [p([headerLogo(), r(`\t${RS.headerText || RS.title}`, { size: 15, color: GRAY })], { tabs: [{ type: TabStopType.RIGHT, position: CW }] })] });
  const footer = new Footer({ children: [p([r("JLS 정상어학원 · David English", { size: 14, color: GRAY })], { align: AlignmentType.CENTER })] });
  return new Document({ styles: { default: { document: { run: { font: FONT } } } }, sections: [cover, {
    properties: { page: { size: { width: PAGE.W, height: PAGE.H }, margin: { top: 1000, bottom: 800, left: PAGE.M, right: PAGE.M, header: 350, footer: 350 } } },
    headers: { default: header }, footers: { default: footer }, children: sheet(teacher) }] });
}

(async () => {
  fs.mkdirSync(OUT_DIR, { recursive: true });
  const base = RS.fileBase || "리뷰테스트";
  for (const [t, name] of [[false, "학생용"], [true, "교사용"]]) {
    const out = path.join(OUT_DIR, `${base}_${name}.docx`);
    fs.writeFileSync(out, await Packer.toBuffer(doc(t)));
    console.log("written", out);
  }
})();
