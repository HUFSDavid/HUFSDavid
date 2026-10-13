// David 단원 통합 실전 모의고사 — 회차별 문제지(학생용) · 정답해설(교사용)
// node m1_cji7/mock/build_mock.js m1_cji7/mock/cji7m1_mcfg.json
// 문제지: 표지(1단) → 첫 쪽 머리(1단: 제목·이름/반/점수) → 본문 2단(세로 구분선)
// 정답해설: 표지 → 정답표(1단) → 해설 2단
const fs = require("fs");
const path = require("path");
const K = require(path.join(__dirname, "..", "..", "lib", "common.js"));
const { makeCover, headerLogo } = require(path.join(__dirname, "..", "..", "scripts", "coverlib.js"));
const { docx, C, FONT, PAGE, CW, NONE, ln, r, rng } = K;
const { Document, Packer, Paragraph, TextRun, Table, TableRow, TableCell, WidthType, AlignmentType, VerticalAlign, Header, Footer, PageNumber, TabStopType, SectionType, BorderStyle, ShadingType } = docx;

const cfg = JSON.parse(fs.readFileSync(process.argv[2], "utf8"));
const DATA = require(path.resolve(cfg.data));
const L = cfg.lesson;
const CIR = ["①", "②", "③", "④", "⑤"];
const GAP = 440;
const COLW = Math.floor((CW - GAP) / 2);
const FS = 18; // 본문 9pt
const report = { colW: COLW, sets: {} };

// ---------- 공통 머리글·바닥글 ----------
function header(right) {
  return new Header({ children: [new Paragraph({
    children: [headerLogo(), new TextRun({ text: "\t" + right, font: FONT, size: 17, color: C.gray })],
    tabStops: [{ type: TabStopType.RIGHT, position: CW }],
    border: { bottom: ln(12, C.ink) }, spacing: { after: 0, line: 240, lineRule: "auto" } })] });
}
function footer() {
  return new Footer({ children: [new Paragraph({ tabStops: [{ type: TabStopType.RIGHT, position: CW }],
    children: [new TextRun({ text: "Made by David", font: FONT, size: 15, color: C.gray }),
      new TextRun({ children: ["\t", PageNumber.CURRENT, " / ", PageNumber.TOTAL_PAGES], font: FONT, size: 15, color: C.gray })] })] });
}
const pageProps = { size: { width: PAGE.W, height: PAGE.H }, margin: { top: PAGE.T, bottom: PAGE.B, left: PAGE.L, right: PAGE.R, header: 500, footer: 500 } };
const sec = (children, right, o = {}) => ({ properties: { page: pageProps, ...(o.cols ? { type: SectionType.CONTINUOUS, column: { count: 2, space: GAP, separate: true, equalWidth: true } } : {}) },
  headers: { default: header(right) }, footers: { default: footer() }, children });

// ---------- 문단 도우미 ----------
// __밑줄__ 처리
function rich(s, size = FS, o = {}) {
  const out = []; const re = /(_{3,})|__([^_].*?)__/g; let m, last = 0; // ___(3개 이상)=빈칸 그대로, __x__=밑줄
  while ((m = re.exec(s))) { if (m.index > last) out.push(r(s.slice(last, m.index), { size, ...o })); out.push(m[1] ? r(m[1], { size, ...o }) : r(m[2], { size, under: true, ...o })); last = re.lastIndex; }
  if (last < s.length) out.push(r(s.slice(last), { size, ...o }));
  return out;
}
const P = (runs, o = {}) => new Paragraph({ children: Array.isArray(runs) ? runs : [runs], alignment: o.align,
  spacing: { before: o.before ?? 0, after: o.after ?? 0, line: o.line ?? 264, lineRule: "auto" },
  border: o.border, indent: o.indent, keepNext: o.keepNext, keepLines: o.keepLines ?? true, tabStops: o.tabs, shading: o.fill ? { type: ShadingType.CLEAR, fill: o.fill, color: "auto" } : undefined });
const BOX = { top: ln(4, C.rule2), bottom: ln(4, C.rule2), left: ln(4, C.rule2), right: ln(4, C.rule2) };
const boxB = (c = C.rule2, sz = 4) => ({ top: { ...ln(sz, c), space: 4 }, bottom: { ...ln(sz, c), space: 4 }, left: { ...ln(sz, c), space: 4 }, right: { ...ln(sz, c), space: 4 } });
// 테두리 상자(연속 문단 → 하나의 상자). keepNext: 상자 뒤 문항과 붙임
function boxLines(lines, o = {}) {
  const b = boxB(o.color, o.sz);
  return lines.map((l, i) => P(Array.isArray(l) ? l : rich(l, o.size ?? FS), { border: b, indent: { left: 100, right: 100, hanging: o.hang }, line: o.line ?? 276,
    before: i === 0 ? 40 : 0, after: i === lines.length - 1 ? 60 : 20, keepNext: o.keepNext ?? true, fill: o.fill }));
}
// 대화 상자: 화자 + 내어쓰기
function dlgLines(d, o = {}) {
  const w = Math.max(...d.map(([s]) => s.length)) > 2 ? 820 : 380;
  const b = boxB();
  return d.map(([s, t], i) => P([r(s + ":", { size: FS, bold: true }), r("\t", { size: FS }), ...rich(t, FS)], { border: b, indent: { left: 100 + w, right: 100, hanging: w },
    tabs: [{ type: TabStopType.LEFT, position: 100 + w }], line: 276, before: i === 0 ? 40 : 0, after: i === d.length - 1 ? 60 : 10, keepNext: o.keepNext ?? true }));
}
// 글자 폭(대략): 한글 2, 영문 1
const wlen = (s) => [...s.replace(/__([^_])/g, "$1").replace(/([^_])__/g, "$1")].reduce((a, c) => a + (/[ㄱ-힝]/.test(c) ? 1.9 : 1), 0);

// ---------- 정답 위치 정하기 ----------
const isRun = (a, b, c) => (b - a === 1 && c - b === 1) || (a - b === 1 && b - c === 1);
function keyOK(k) {
  for (let i = 2; i < k.length; i++) { if (k[i] === k[i - 1] && k[i] === k[i - 2]) return false; if (isRun(k[i - 2], k[i - 1], k[i])) return false; }
  for (let i = 3; i < k.length; i++) if (k[i] === k[i - 2] && k[i - 1] === k[i - 3]) return false; // ABAB 교대
  for (let i = 5; i < k.length; i++) if (k[i] === k[i - 3] && k[i - 1] === k[i - 4] && k[i - 2] === k[i - 5]) return false; // ABCABC 반복
  const cnt = [1, 2, 3, 4, 5].map((n) => k.filter((x) => x === n).length);
  if (cnt.some((c) => c < 3 || c > 5)) return false;
  const seq = k.filter((x, i) => x === (i % 5) + 1).length; // 문항 순서 = 정답 순서
  if (seq > 3) return false;
  let same = 0; for (let i = 1; i < k.length; i++) if (k[i] === k[i - 1]) same++;
  if (same > 2) return false;
  return true;
}
function chooseKey(items, seed, avoid) {
  const rnd = rng(seed);
  for (let t = 0; t < 200000; t++) {
    const k = items.map((it) => it.fixed ? it.a : 1 + Math.floor(rnd() * 5));
    if (keyOK(k) && (!avoid || k.join("") !== avoid)) return k;
  }
  throw new Error("no key");
}
// 정답을 key 위치로 옮기고 나머지는 원래 순서 유지
function place(it, k) {
  if (it.fixed) return { opts: it.opts, a: it.a };
  const right = it.opts[it.a - 1]; const rest = it.opts.filter((_, i) => i !== it.a - 1);
  rest.splice(k - 1, 0, right); return { opts: rest, a: k };
}

// ---------- 문제지(학생용) ----------
function optionParas(opts, ans) {
  const out = []; const texts = opts.map((o) => o[0]);
  const plainCir = texts.every((t, j) => t === CIR[j]);
  const mx = Math.max(...texts.map(wlen));
  const red = (j) => ans && j + 1 === ans;
  const lab = (j, t) => plainCir ? [r(CIR[j], { size: FS, bold: red(j), color: red(j) ? C.red : C.ink })] :
    [r(CIR[j] + " ", { size: FS, bold: red(j), color: red(j) ? C.red : C.ink }), ...rich(t, FS, red(j) ? { bold: true, color: C.red } : {})];
  const perLine = plainCir || mx <= 5 ? 5 : mx <= 10 ? 3 : mx <= 19 ? 2 : 1;
  if (perLine === 1) { texts.forEach((t, j) => out.push(P(lab(j, t), { indent: { left: 460, hanging: 260 }, line: 264, after: j === 4 ? 110 : 10, keepNext: j < 4 }))); return out; }
  const step = Math.floor((COLW - 200) / perLine);
  for (let s = 0; s < 5; s += perLine) {
    const runs = []; for (let j = s; j < Math.min(5, s + perLine); j++) { if (j > s) runs.push(r("\t", { size: FS })); runs.push(...lab(j, texts[j])); }
    const last = s + perLine >= 5;
    out.push(P(runs, { indent: { left: 200 }, tabs: Array.from({ length: perLine - 1 }, (_, k) => ({ type: TabStopType.LEFT, position: 200 + step * (k + 1) })), after: last ? 110 : 10, keepNext: !last }));
  }
  return out;
}
function smallTable(rows) {
  const n = rows[0].length; const w0 = 900; const wi = Math.floor((COLW - 200 - w0) / (n - 1)); const ws = [w0, ...Array(n - 1).fill(wi)];
  const bd = { top: ln(4, C.rule2), bottom: ln(4, C.rule2), left: ln(4, C.rule2), right: ln(4, C.rule2) };
  return new Table({ width: { size: ws.reduce((a, b) => a + b, 0), type: WidthType.DXA }, columnWidths: ws, alignment: AlignmentType.CENTER,
    rows: rows.map((rw, i) => new TableRow({ cantSplit: true, children: rw.map((c, j) => new TableCell({ width: { size: ws[j], type: WidthType.DXA }, borders: bd,
      shading: i === 0 || j === 0 ? { type: ShadingType.CLEAR, fill: C.light, color: "auto" } : undefined, margins: { top: 40, bottom: 40, left: 60, right: 60 },
      children: [new Paragraph({ alignment: AlignmentType.CENTER, keepNext: true, children: [r(c, { size: 16, bold: i === 0 || j === 0 })] })] })) })) });
}
function stem(no, it, ans) {
  return P([r(`${no}. `, { size: FS + 1, bold: true }), r(it.q, { size: FS, bold: true }), r(`  [${it.pt}점]`, { size: 15, color: C.gray }),
    ...(ans ? [r(`  ${it.area}·${it.tag}`, { size: 14, color: C.coral })] : [])], { before: 130, after: 50, keepNext: true, line: 252, indent: { left: 300, hanging: 300 } });
}
function condBox(cond) { return boxLines([[r("<조건>", { size: 16, bold: true })], ...cond.map((c) => [r("• " + c, { size: 16 })])], { color: C.gray, fill: C.light }); }

function studentBody(S, keys) {
  const out = []; let no = 0; const itemNos = [];
  S.mcq.forEach((b) => {
    if (b.pass) {
      out.push(P([r(`[${b.pass.range}] `, { size: FS, bold: true }), r(b.pass.lead, { size: FS, bold: true })], { before: 180, after: 50, keepNext: true }));
      if (b.pass.dlg) out.push(...dlgLines(b.pass.dlg, { keepNext: true }));
      if (b.pass.lines) out.push(...boxLines(b.pass.lines.map((l) => [r("  ", { size: FS }), ...rich(l, FS)]), { line: 280, keepNext: true }));
      return;
    }
    no++; const it = b; const pl = place(it, keys[no - 1]); it._pl = pl; it._no = no; itemNos.push(it);
    out.push(stem(no, it));
    if (it.box) out.push(...boxLines(it.box));
    if (it.dlg) out.push(...dlgLines(it.dlg));
    out.push(...optionParas(pl.opts));
  });
  // 서술형
  out.push(P([r("  서술형  ", { size: 20, bold: true, color: C.white, hl: C.ink }), r("   철자·대소문자·문장부호까지 정확히 쓰시오.", { size: 15, color: C.gray })], { before: 300, after: 80, keepNext: true, border: { bottom: ln(8, C.ink) } }));
  S.sub.forEach((it, i) => {
    out.push(P([r(`서술형 ${i + 1}. `, { size: FS + 1, bold: true }), r(it.q, { size: FS, bold: true }), r(`  [${it.pt}점]`, { size: 15, color: C.gray })], { before: 200, after: 60, keepNext: true, indent: { left: 0 } }));
    if (it.table) { out.push(smallTable(it.table)); out.push(P(r("", { size: 8 }), { keepNext: true })); }
    if (it.dlg) out.push(...dlgLines(it.dlg));
    if (it.box) out.push(...boxLines(it.box));
    if (it.cond) out.push(...condBox(it.cond));
    it.slots.forEach((s, j) => {
      const last = j === it.slots.length - 1;
      if (it.plainSlots) out.push(P(r(s, { size: 17 }), { before: 260, after: last ? 80 : 0, keepNext: !last }));
      else out.push(P([r(s + " ", { size: 17, bold: true }), r(" ", { size: 17 })], { before: s === "→" || s === "A." ? 400 : 280, after: last ? 100 : 0, border: { bottom: ln(4, C.rule2) }, keepNext: !last }));
      if (!it.plainSlots && !last) out.push(P(r("", { size: 4 }), { line: 120, keepNext: true }));
    });
  });
  out.push(P(r("— 수고했습니다 —", { size: 16, color: C.gray }), { before: 300, align: AlignmentType.CENTER }));
  return { out, itemNos };
}
function examHead(set, total) {
  const w = [CW - 2600, 2600];
  const t = new Table({ width: { size: CW, type: WidthType.DXA }, columnWidths: w, borders: K.NOB, rows: [new TableRow({ children: [
    new TableCell({ width: { size: w[0], type: WidthType.DXA }, borders: K.NOB, children: [
      P(r(`${cfg.term}  ·  ${cfg.schools}  ·  영어`, { size: 16, bold: true, color: C.gray }), { after: 40 }),
      P([r(`Lesson ${L}  ${cfg.lessonTitle}  `, { size: 36, bold: true }), r(` 실전 모의고사 ${set}회 `, { size: 30, bold: true, hl: true })], { after: 40 }),
      P(r(`${cfg.book}  ·  객관식 20 · 서술형 6  ·  ${total}점  ·  45분`, { size: 16, color: C.gray }))] }),
    new TableCell({ width: { size: w[1], type: WidthType.DXA }, borders: K.NOB, verticalAlign: VerticalAlign.BOTTOM, children: [nameBox()] }),
  ] })] });
  return [t, P(r("", { size: 6 }), { border: { bottom: ln(12, C.ink) }, after: 80 }),
    P([r("※ ", { size: 15, bold: true }), r("객관식은 알맞은 답 하나를 고르고, 서술형은 답란에 쓰시오. 지문이 있는 문항은 지문을 먼저 읽으시오.", { size: 15, color: C.gray })], { after: 60 })];
}
function nameBox() {
  const w = [700, 1900]; const bd = { top: ln(4, C.rule2), bottom: ln(4, C.rule2), left: ln(4, C.rule2), right: ln(4, C.rule2) };
  const rw = (k, v) => new TableRow({ height: { value: 360, rule: docx.HeightRule.ATLEAST }, children: [
    new TableCell({ width: { size: w[0], type: WidthType.DXA }, borders: bd, verticalAlign: VerticalAlign.CENTER, shading: { type: ShadingType.CLEAR, fill: C.light, color: "auto" }, children: [new Paragraph({ alignment: AlignmentType.CENTER, children: [r(k, { size: 16, bold: true })] })] }),
    new TableCell({ width: { size: w[1], type: WidthType.DXA }, borders: bd, verticalAlign: VerticalAlign.CENTER, children: [new Paragraph({ alignment: AlignmentType.RIGHT, children: [r(v, { size: 15, color: C.gray })] })] })] });
  return new Table({ width: { size: 2600, type: WidthType.DXA }, columnWidths: w, rows: [rw("반", "1학년     반     번 "), rw("이름", ""), rw("점수", "/ 100 ")] });
}

// ---------- 정답해설(교사용) ----------
function keyGrid(itemNos, S) {
  const n = 10; const w0 = 900; const wi = Math.floor((CW - w0) / n); const ws = [w0, ...Array(n).fill(wi)]; ws[n] = CW - w0 - wi * (n - 1);
  const bd = { top: ln(4, C.rule2), bottom: ln(4, C.rule2), left: ln(4, C.rule2), right: ln(4, C.rule2) };
  const c = (t, j, o = {}) => new TableCell({ width: { size: ws[j], type: WidthType.DXA }, borders: bd, verticalAlign: VerticalAlign.CENTER,
    shading: o.fill ? { type: ShadingType.CLEAR, fill: o.fill, color: "auto" } : undefined, margins: { top: 50, bottom: 50, left: 40, right: 40 },
    children: [new Paragraph({ alignment: AlignmentType.CENTER, children: [r(t, { size: o.size ?? 17, bold: o.bold, color: o.color ?? C.ink })] })] });
  const rows = [];
  for (let s = 0; s < 20; s += 10) {
    rows.push(new TableRow({ cantSplit: true, children: [c("문항", 0, { fill: C.ink, color: C.white, bold: true }), ...itemNos.slice(s, s + 10).map((it, j) => c(String(it._no), j + 1, { fill: C.light, bold: true }))] }));
    rows.push(new TableRow({ cantSplit: true, children: [c("정답", 0, { fill: C.ink, color: C.white, bold: true }), ...itemNos.slice(s, s + 10).map((it, j) => c(CIR[it._pl.a - 1], j + 1, { size: 22, bold: true, color: C.red }))] }));
  }
  const grid = new Table({ width: { size: CW, type: WidthType.DXA }, columnWidths: ws, rows });
  // 서술형 정답
  const sw = [1100, CW - 1100 - 700, 700];
  const sc = (t, j, o = {}) => new TableCell({ width: { size: sw[j], type: WidthType.DXA }, borders: bd, verticalAlign: VerticalAlign.CENTER,
    shading: o.fill ? { type: ShadingType.CLEAR, fill: o.fill, color: "auto" } : undefined, margins: { top: 50, bottom: 50, left: 100, right: 80 },
    children: [new Paragraph({ alignment: o.align, children: o.runs ?? [r(t, { size: 17, bold: o.bold, color: o.color ?? C.ink })] })] });
  const srows = [new TableRow({ children: [sc("서술형", 0, { fill: C.ink, color: C.white, bold: true, align: AlignmentType.CENTER }), sc("정답", 1, { fill: C.ink, color: C.white, bold: true }), sc("배점", 2, { fill: C.ink, color: C.white, bold: true, align: AlignmentType.CENTER })] })];
  S.sub.forEach((it, i) => srows.push(new TableRow({ cantSplit: true, children: [sc(String(i + 1), 0, { fill: C.light, bold: true, align: AlignmentType.CENTER }),
    sc("", 1, { runs: it.a.flatMap((a, j) => [...(j ? [r("   ", { size: 17 })] : []), ...(it.slots.length > 1 && !it.plainSlots ? [r(it.slots[j] + " ", { size: 16, color: C.gray })] : it.plainSlots ? [r(`(${j + 1}) `, { size: 16, color: C.gray })] : []), r(a, { size: 17, bold: true, color: C.red })]) }),
    sc(`${it.pt}점`, 2, { align: AlignmentType.CENTER })] })));
  const stab = new Table({ width: { size: CW, type: WidthType.DXA }, columnWidths: sw, rows: srows });
  const dist = [1, 2, 3, 4, 5].map((k) => CIR[k - 1] + " " + itemNos.filter((x) => x._pl.a === k).length + "개").join("   ");
  return [grid, P(r(`정답 분포  ${dist}   ·   객관식 20문항 × 3점 = 60점  ·  서술형 6문항 40점`, { size: 15, color: C.gray }), { before: 60, after: 160 }), stab];
}
function teacherHead(set) {
  return [P(r(`${cfg.term}  ·  ${cfg.schools}`, { size: 16, bold: true, color: C.gray }), { after: 40 }),
    P([r(`실전 모의고사 ${set}회  `, { size: 36, bold: true }), r(" 정답 · 해설 ", { size: 28, bold: true, color: C.white, hl: C.ink })], { after: 40 }),
    P(r(`${cfg.book}  ·  정답표 → 문항별 해설(근거 · 오답 이유)`, { size: 16, color: C.gray }), { after: 120, border: { bottom: ln(12, C.ink) } })];
}
function teacherBody(S, itemNos) {
  const out = [P([r("  문항별 해설  ", { size: 20, bold: true, color: C.white, hl: C.ink })], { before: 60, after: 80, keepNext: true, border: { bottom: ln(8, C.ink) } })];
  let lastArea = "";
  itemNos.forEach((it) => {
    const pl = it._pl;
    if (it.area !== lastArea) { lastArea = it.area; }
    out.push(P([r(`${it._no}. `, { size: FS + 1, bold: true }), r(`정답 ${CIR[pl.a - 1]}`, { size: FS, bold: true, color: C.red }), r(`   ${it.area} · ${it.tag}`, { size: 15, bold: true, color: C.coral })],
      { before: 150, after: 20, keepNext: true, border: { bottom: ln(4, C.rule) } }));
    out.push(P(rich(it.q, 15, { color: C.gray }), { after: 40, keepNext: true }));
    const right = pl.opts[pl.a - 1][0];
    if (!/^[①-⑤ⓐ-ⓔ]$/.test(right) && !/^\d개$/.test(right)) out.push(P([r(CIR[pl.a - 1] + " ", { size: 16, bold: true, color: C.red }), ...rich(right, 16, { bold: true, color: C.red })], { after: 40, keepNext: true, indent: { left: 200, hanging: 200 } }));
    out.push(P([r("근거  ", { size: 15, bold: true, color: C.white, hl: C.coral }), r(" ", { size: 16 }), ...rich(it.why, 16)], { after: 30, line: 264, keepNext: true }));
    const wrong = pl.opts.map((o, j) => [j, o]).filter(([j, o]) => j + 1 !== pl.a && o[1]);
    if (wrong.length) {
      out.push(P(r("오답", { size: 15, bold: true, color: C.gray }), { after: 10, keepNext: true }));
      wrong.forEach(([j, o], k) => {
        const lbl = /^[①-⑤ⓐ-ⓔ]$/.test(o[0]) || /^\d개$/.test(o[0]) ? CIR[j] + (o[0] === CIR[j] ? "" : " " + o[0]) : CIR[j];
        out.push(P([r(lbl + "  ", { size: 15, bold: true }), ...rich(o[1], 15, { color: C.ink })], { indent: { left: 300, hanging: 300 }, after: 10, line: 252, keepNext: k < wrong.length - 1 }));
      });
    }
  });
  out.push(P([r("  서술형 해설  ", { size: 20, bold: true, color: C.white, hl: C.ink })], { before: 300, after: 80, keepNext: true, border: { bottom: ln(8, C.ink) } }));
  S.sub.forEach((it, i) => {
    out.push(P([r(`서술형 ${i + 1}. `, { size: FS + 1, bold: true }), r(`[${it.pt}점]`, { size: 15, color: C.gray }), r(`   ${it.area} · ${it.tag}`, { size: 15, bold: true, color: C.coral })], { before: 150, after: 20, keepNext: true, border: { bottom: ln(4, C.rule) } }));
    out.push(P(rich(it.q, 15, { color: C.gray }), { after: 40, keepNext: true }));
    if (it.box && it.tag.includes("요약")) out.push(...boxLines(it.box, { size: 15 }));
    it.a.forEach((a, j) => out.push(P([r(it.plainSlots ? `(${j + 1}) ` : it.slots.length > 1 ? it.slots[j] + " " : "→ ", { size: 16, bold: true, color: C.red }), r(a, { size: 16, bold: true, color: C.red })], { after: 20, keepNext: true, indent: { left: 200 } })));
    out.push(P([r("해설  ", { size: 15, bold: true, color: C.white, hl: C.coral }), r(" ", { size: 16 }), ...rich(it.why, 16)], { before: 30, after: 30, line: 264 }));
  });
  return out;
}

// ---------- 실행 ----------
(async () => {
  let prevKey = null;
  for (const set of [1, 2]) {
    const S = DATA[set];
    const items = S.mcq.filter((b) => !b.pass);
    if (items.length !== 20 || S.sub.length !== 6) throw new Error(`set ${set}: ${items.length} mcq / ${S.sub.length} sub`);
    const total = items.reduce((a, b) => a + b.pt, 0) + S.sub.reduce((a, b) => a + b.pt, 0);
    if (total !== 100) throw new Error(`set ${set}: total ${total}`);
    items.forEach((it, i) => { if (it.opts.length !== 5) throw new Error(`set ${set} #${i + 1} opts`); if (it.opts[it.a - 1][1] !== "" && !it.fixed) throw new Error(`set ${set} #${i + 1}: 정답 보기에 오답 메모`); });
    const keys = chooseKey(items, cfg.seeds[set - 1], prevKey); prevKey = keys.join("");
    const { out, itemNos } = studentBody(S, keys);
    const cover = (ed) => makeCover({ term: cfg.term, unitNo: String(L).padStart(2, "0"), part: `${cfg.schoolsShort}  ·  실전 모의고사`, title: "실전 모의고사",
      subtitle: `${cfg.lessonTitle} · ${set}회`, edition: ed, info: [["학교", cfg.schools], ["범위", `${cfg.book.replace(/\s+/g, " ")}`], ["구성", "객관식 20 · 서술형 6 · 45분"]] });
    const HR = (s) => `${cfg.pubShort} ${L}과 · 실전 모의고사 ${set}회 ${s}`;
    const docS = new Document({ styles: { default: { document: { run: { font: FONT, size: 20 } } } },
      sections: [cover("학생용"), sec(examHead(set, total), HR("문제지")), sec(out, HR("문제지"), { cols: true })] });
    const docT = new Document({ styles: { default: { document: { run: { font: FONT, size: 20 } } } },
      sections: [cover("교사용"), sec([...teacherHead(set), ...keyGrid(itemNos, S)], HR("정답·해설")), sec(teacherBody(S, itemNos), HR("정답·해설"), { cols: true })] });
    fs.mkdirSync(cfg.outDir, { recursive: true });
    const fS = `${cfg.outDir}/A_L${L}_실전모의고사_${set}회_문제지.docx`, fT = `${cfg.outDir}/A_L${L}_실전모의고사_${set}회_정답해설.docx`;
    fs.writeFileSync(fS, await Packer.toBuffer(docS)); fs.writeFileSync(fT, await Packer.toBuffer(docT));
    const cnt = [1, 2, 3, 4, 5].map((k) => keys.filter((x) => x === k).length);
    report.sets[set] = { key: keys.join(""), dist: cnt, seqMatch: keys.filter((x, i) => x === (i % 5) + 1).length, fixed: items.map((it, i) => it.fixed ? i + 1 : 0).filter(Boolean),
      areas: items.reduce((a, it) => (a[it.area] = (a[it.area] || 0) + 1, a), {}), subAreas: S.sub.map((x) => x.area + "·" + x.tag), files: [fS, fT],
      answers: itemNos.map((it) => ({ no: it._no, a: it._pl.a, text: it._pl.opts[it._pl.a - 1][0] })), subAnswers: S.sub.map((x) => x.a) };
  }
  // 1회·2회 문항 중복 검사(발문+정답 보기 문장)
  const sig = (S) => S.mcq.filter((b) => !b.pass).map((it) => it.opts[it.a - 1][0]).concat(S.sub.map((x) => x.a.join("|")));
  const dup = sig(DATA[1]).filter((s) => sig(DATA[2]).includes(s) && !/^[①-⑤ⓐ-ⓔ]$/.test(s));
  report.dupAnswers = dup;
  fs.writeFileSync(cfg.report, JSON.stringify(report, null, 1));
  console.log(JSON.stringify({ k1: report.sets[1].key, k2: report.sets[2].key, d1: report.sets[1].dist, d2: report.sets[2].dist, dup }));
})().catch((e) => { console.error(e); process.exit(1); });
