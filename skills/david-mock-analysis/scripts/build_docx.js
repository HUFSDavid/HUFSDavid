#!/usr/bin/env node
/*
 * David 모의고사 지문분석 Word 생성기
 *
 * 사용법: node build_docx.js analysis.json 출력폴더 [logo.png] [--student] [--review-files]
 *   - 기본: 수업용 분석 자료(교사용) .docx 한 파일만 만든다.
 *   - --student: 해석·어휘 뜻 등을 비운 학생용 필기 노트도 함께 만든다.
 *   - review.key_points의 예시 문항은 분석 자료 안, 각 포인트 바로 아래에 정답과 함께 들어간다.
 *   - --review-files: (요청할 때만) 예시 문항을 모아 Review Test 문제지·답지 파일도 따로 만든다.
 *   - analysis.json 구조는 references/json-schema.md 참고.
 *   - 'docx' npm 패키지가 필요하다 (npm i docx).
 */
const fs = require("fs");
const path = require("path");
const {
  Document, Packer, Paragraph, TextRun, Table, TableRow, TableCell, WidthType,
  AlignmentType, BorderStyle, ShadingType, Header, Footer, PageNumber, ImageRun,
  PageBreak, TabStopType, VerticalAlign,
} = loadDocx();

// 스킬 폴더가 아니라 작업 폴더(cwd)의 node_modules에서 docx를 찾는다.
function loadDocx() {
  try {
    return require(require.resolve("docx", { paths: [process.cwd(), __dirname] }));
  } catch (e) {
    console.error("docx 패키지가 없습니다. 작업 폴더에서 `npm i docx` 후 다시 실행하세요.");
    process.exit(1);
  }
}

const args = process.argv.slice(2);
const withStudent = args.includes("--student");
const withReviewFiles = args.includes("--review-files");
const [inPath, outDir = ".", logoPath] = args.filter((a) => !a.startsWith("--"));
if (!inPath) {
  console.error("사용법: node build_docx.js analysis.json 출력폴더 [logo.png] [--student] [--review-files]");
  process.exit(1);
}
const data = JSON.parse(fs.readFileSync(inPath, "utf8"));
const meta = data.meta || {};
const passages = data.passages || [];

// ---------- 디자인 토큰 (David 공통) ----------
const C = {
  ink: "111111", gray: "6B6B6B", bg: "F3F3F3", line: "CFCFCF", line2: "B5B5B5",
  hl: "FFF0A0", ans: "B3261E", white: "FFFFFF", blue: "1F4E9A",
};
const FONT = "Malgun Gothic";
const PAGE = { W: 11906, H: 16838, L: 1020, R: 1020, T: 1520, B: 1100 };
const CONTENT_W = PAGE.W - PAGE.L - PAGE.R;
const NONE = { style: BorderStyle.NONE, size: 0, color: "FFFFFF" };
const thin = (color = C.line) => ({ style: BorderStyle.SINGLE, size: 4, color });

// ---------- 공통 헬퍼 ----------
function run(text, o = {}) {
  return new TextRun({
    text: String(text ?? ""), font: FONT, size: o.size ?? 20, bold: o.bold,
    italics: o.italics, color: o.color ?? C.ink, underline: o.underline,
    highlight: o.highlight, shading: o.shade ? { type: ShadingType.CLEAR, fill: o.shade, color: "auto" } : undefined,
    superScript: o.sup,
  });
}

// **굵게**, ==형광==, [[정답색]], __밑줄__ 간단 마크업 지원
function rich(text, o = {}) {
  const out = [];
  const re = /(\*\*[^*]+\*\*|==[^=]+==|\[\[[^\]]+\]\]|__(?=\S)[^_]+?(?<=\S)__)/g;
  String(text ?? "").split(re).forEach((part) => {
    if (!part) return;
    if (part.startsWith("**")) out.push(run(part.slice(2, -2), { ...o, bold: true }));
    else if (part.startsWith("==")) out.push(run(part.slice(2, -2), { ...o, shade: C.hl }));
    else if (part.startsWith("[[")) out.push(run(part.slice(2, -2), { ...o, bold: true, color: C.ans }));
    else if (part.startsWith("__")) out.push(run(part.slice(2, -2), { ...o, underline: {} }));
    else out.push(run(part, o));
  });
  return out;
}

function p(children, o = {}) {
  return new Paragraph({
    children: Array.isArray(children) ? children : [children],
    spacing: { before: o.before ?? 0, after: o.after ?? 60, line: o.line ?? 300 },
    alignment: o.align, indent: o.indent, keepNext: o.keepNext,
    border: o.border, shading: o.shade ? { type: ShadingType.CLEAR, fill: o.shade, color: "auto" } : undefined,
    tabStops: o.tabs,
  });
}
const txt = (t, o = {}) => p(rich(t, o), o);
const spacer = (h = 120) => p([run("")], { after: h });

function cell(children, o = {}) {
  return new TableCell({
    children: (Array.isArray(children) ? children : [children]).map((c) =>
      typeof c === "string" ? txt(c, { size: o.size ?? 18, after: 20, bold: o.bold, color: o.color }) : c),
    width: o.w ? { size: o.w, type: WidthType.DXA } : undefined,
    shading: o.fill ? { type: ShadingType.CLEAR, fill: o.fill, color: "auto" } : undefined,
    verticalAlign: o.valign ?? VerticalAlign.CENTER,
    margins: { top: 60, bottom: 60, left: 100, right: 100 },
    columnSpan: o.span,
    borders: o.borders,
  });
}

// 검정 헤더 + 가로선만 있는 표
function table(headers, rows, widths) {
  const hBorder = { top: thin(C.ink), bottom: thin(C.ink), left: NONE, right: NONE };
  const rBorder = { top: thin(), bottom: thin(), left: NONE, right: NONE };
  return new Table({
    width: { size: CONTENT_W, type: WidthType.DXA },
    columnWidths: widths,
    rows: [
      new TableRow({
        tableHeader: true,
        children: headers.map((h, i) => cell(txt(h, { size: 17, bold: true, color: C.white, after: 0, align: AlignmentType.CENTER }), { w: widths[i], fill: C.ink, borders: hBorder })),
      }),
      ...rows.map((r) => new TableRow({
        cantSplit: true,
        children: r.map((v, i) => cell(Array.isArray(v) ? v : [String(v ?? "")], { w: widths[i], borders: rBorder })),
      })),
    ],
  });
}

// 왼쪽 굵은선 회색 박스
function noteBox(title, lines, o = {}) {
  const children = [];
  if (title) children.push(txt(title, { bold: true, size: 19, after: 60, color: o.titleColor }));
  lines.forEach((l) => children.push(typeof l === "string" ? txt(l, { size: 18, after: 40 }) : l));
  return new Table({
    width: { size: CONTENT_W, type: WidthType.DXA },
    columnWidths: [CONTENT_W],
    rows: [new TableRow({
      children: [cell(children, {
        w: CONTENT_W, fill: o.fill ?? C.bg, valign: VerticalAlign.TOP,
        borders: { left: { style: BorderStyle.SINGLE, size: 24, color: o.bar ?? C.ink }, top: NONE, bottom: NONE, right: NONE },
      })],
    })],
  });
}

// 섹션 제목: 검정 라벨 + 제목
function sectionTitle(label, title) {
  return p([
    run(` ${label} `, { size: 16, bold: true, color: C.white, shade: C.ink }),
    run(`  ${title}`, { size: 23, bold: true }),
  ], { before: 240, after: 100, keepNext: true, border: { bottom: { style: BorderStyle.SINGLE, size: 6, color: C.line2, space: 4 } } });
}

function blankLine(n = 1) {
  return Array.from({ length: n }, () => p([run(" ")], {
    after: 40, border: { bottom: { style: BorderStyle.SINGLE, size: 4, color: C.line2, space: 8 } },
  }));
}

const circled = (n) => "①②③④⑤⑥⑦⑧⑨⑩"[n - 1] ?? `(${n})`;
const join = (v) => (Array.isArray(v) ? v.filter(Boolean).join(", ") : v ?? "");

// ---------- 머리글·바닥글 ----------
function makeHeader(rightText) {
  const kids = [];
  if (logoPath && fs.existsSync(logoPath)) {
    kids.push(new ImageRun({ data: fs.readFileSync(logoPath), transformation: { width: 88, height: 44 }, type: "png" }));
  } else {
    kids.push(run("DAVID", { size: 28, bold: true }));
  }
  kids.push(run(`\t${rightText}`, { size: 17, color: C.gray }));
  return new Header({
    children: [p(kids, {
      after: 0, tabs: [{ type: TabStopType.RIGHT, position: CONTENT_W }],
      border: { bottom: { style: BorderStyle.SINGLE, size: 12, color: C.ink, space: 4 } },
    })],
  });
}
function makeFooter() {
  return new Footer({
    children: [p([
      run("Made by David", { size: 16, color: C.gray }),
      new TextRun({ children: ["\t", PageNumber.CURRENT, " / ", PageNumber.TOTAL_PAGES], font: FONT, size: 16, color: C.gray }),
    ], { tabs: [{ type: TabStopType.RIGHT, position: CONTENT_W }], after: 0 })],
  });
}

// ---------- 지문 블록 ----------
function coverBlock(ps, forTeacher) {
  const out = [];
  const tag = [ps.source ?? meta.source, ps.grade ?? meta.grade].filter(Boolean).join(" · ");
  out.push(p([
    run(` ${ps.number}번 `, { size: 22, bold: true, color: C.white, shade: C.ink }),
    run(`  ${ps.type ?? ""}`, { size: 22, bold: true }),
    run(`    ${tag}`, { size: 17, color: C.gray }),
  ], { after: 120 }));
  if (ps.title_en) out.push(txt(ps.title_en, { size: 26, bold: true, after: 20 }));
  if (ps.title_ko) out.push(txt(`(${ps.title_ko})`, { size: 19, color: C.gray, after: 120 }));
  // 주제문·요약은 정답을 알려 주므로 학생용에서는 빈칸으로 둔다.
  if (ps.topic_en || ps.topic_ko) {
    const lines = [];
    if (!forTeacher) lines.push(...blankLine(2));
    else {
      if (ps.topic_en) lines.push(txt(ps.topic_en, { size: 19, bold: true, after: 20 }));
      if (ps.topic_ko) lines.push(txt(ps.topic_ko, { size: 18, color: C.gray, after: 0 }));
    }
    out.push(noteBox(forTeacher ? "주제문" : "주제문 (영어 또는 우리말로 쓰기)", lines));
    out.push(spacer(80));
  }
  if (ps.summary && forTeacher) {
    out.push(noteBox("내용 요약", [ps.summary]));
    out.push(spacer(80));
  }
  if (ps.flow?.length) {
    out.push(txt("Flow Check", { bold: true, size: 20, after: 60 }));
    out.push(table(["문장", "단계", "내용"],
      ps.flow.map((f) => [f.range, f.stage, forTeacher ? f.text : ""]),
      [1300, 1300, CONTENT_W - 2600]));
  }
  return out;
}

function originalBlock(ps) {
  const out = [sectionTitle("ORIGINAL", "원문")];
  if (ps.question?.stem) out.push(txt(ps.question.stem, { bold: true, size: 20, after: 80 }));
  const body = ps.original ?? (ps.sentences ?? []).map((s) => s.en).join(" ");
  body.split(/\n+/).forEach((para) => out.push(txt(para, { size: 20, line: 340, after: 80 })));
  if (ps.question?.note) out.push(txt(ps.question.note, { size: 16, color: C.gray, align: AlignmentType.RIGHT }));
  (ps.question?.choices ?? []).forEach((c, i) => out.push(txt(`${circled(i + 1)} ${c}`, { size: 19, after: 30 })));
  return out;
}

function sentenceBlock(ps, forTeacher) {
  const out = [sectionTitle("SENTENCE", "문장별 구문 분석 · 직독직해")];
  (ps.sentences ?? []).forEach((s) => {
    const tags = (s.tags ?? []).map((t) => run(`  ${t} `, { size: 15, bold: true, color: C.white, shade: C.blue }));
    out.push(p([run(`${s.no}  `, { size: 22, bold: true }), ...tags], { before: 160, after: 40, keepNext: true }));
    // 끊어읽기 문장
    out.push(txt(s.chunked ?? s.en, { size: 21, line: 360, after: 40, keepNext: true }));
    if (forTeacher && s.structure) out.push(txt(s.structure, { size: 16, color: C.blue, after: 40 }));
    if (forTeacher) {
      if (s.literal) out.push(txt(`직독직해  ${s.literal}`, { size: 17, color: C.gray, after: 20 }));
      if (s.ko) out.push(txt(`해석  ${s.ko}`, { size: 19, bold: true, after: 40 }));
      if (s.points?.length) {
        out.push(noteBox(null, s.points.map((pt) => txt(`${pt.label ?? ""} **${pt.title ?? ""}**: ${pt.text ?? ""}`, { size: 17, after: 40 }))));
      }
    } else {
      out.push(txt("해석", { size: 16, color: C.gray, after: 0 }));
      out.push(...blankLine(2));
      if (s.points?.length) {
        out.push(txt(`구문 포인트: ${s.points.map((pt) => `${pt.label ?? ""} ____________`).join("   ")}`, { size: 16, color: C.gray }));
      }
    }
  });
  return out;
}

function vocabBlock(ps, forTeacher) {
  if (!ps.vocab?.length) return [];
  const out = [sectionTitle("VOCA", "어휘 · 유의어 · 반의어 · 파생어 · 어근")];
  const W = [1650, 1650, 1600, 1450, 2050, CONTENT_W - 8400];
  out.push(table(["단어", "뜻", "유의어", "반의어", "파생어", "어근·접사"],
    ps.vocab.map((v) => forTeacher
      ? [[txt(`**${v.word}**${v.pos ? ` (${v.pos})` : ""}`, { size: 17, after: 0 })], v.meaning, join(v.syn), join(v.ant), join(v.deriv), v.root ?? ""]
      : [[txt(`**${v.word}**${v.pos ? ` (${v.pos})` : ""}`, { size: 17, after: 0 })], "", "", "", "", ""]),
    W));
  if (forTeacher && ps.idioms?.length) {
    out.push(spacer(80));
    out.push(table(["숙어·표현", "뜻", "예문 / 비고"], ps.idioms.map((d) => [d.phrase, d.meaning, d.note ?? ""]), [2800, 2600, CONTENT_W - 5400]));
  }
  return out;
}

function solvingBlock(ps, forTeacher) {
  const sv = ps.solving;
  if (!sv) return [];
  const out = [sectionTitle("수능", `${ps.type ?? ""} 유형 문제풀이`)];
  if (sv.strategy?.length) {
    out.push(noteBox(`${ps.type ?? ""} 유형 풀이 순서`, sv.strategy.map((s, i) => `${i + 1}. ${s}`)));
    out.push(spacer(80));
  }
  if (!forTeacher) {
    out.push(txt("정답:  ______      근거 문장 번호:  ______", { size: 19, bold: true, after: 60 }));
    out.push(txt("근거 / 오답 이유 메모", { size: 16, color: C.gray, after: 0 }));
    out.push(...blankLine(4));
    return out;
  }
  if (ps.question?.answer) out.push(txt(`정답  [[${circled(ps.question.answer)} ${ps.question.choices?.[ps.question.answer - 1] ?? ""}]]`, { size: 21, after: 60 }));
  (sv.evidence ?? []).forEach((e) => out.push(txt(`근거 [${join(e.sent)}번 문장]  ${e.text}`, { size: 18, after: 40 })));
  if (sv.explanation) out.push(txt(sv.explanation, { size: 18, after: 80 }));
  if (sv.wrong?.length) {
    out.push(table(["선지", "오답 이유 (매력적 오답 포인트)"],
      sv.wrong.map((w) => [`${circled(w.no)} ${w.choice ?? ""}`, w.why]), [2800, CONTENT_W - 2800]));
  }
  if (sv.trap) { out.push(spacer(60)); out.push(noteBox("함정 주의", [sv.trap], { bar: C.ans })); }
  return out;
}

function naesinBlock(ps, forTeacher) {
  const nx = ps.naesin;
  if (!nx) return [];
  const out = [sectionTitle("내신", "출제 포인트")];
  if (nx.likely_types?.length) {
    const all = ["목적", "심경·분위기", "주장", "함축의미", "요지", "주제", "제목", "도표", "일치·불일치", "어법", "어휘", "빈칸", "무관한 문장", "순서", "문장 삽입", "요약", "지칭", "연결어", "서술형"];
    const on = new Set(nx.likely_types);
    out.push(p(all.map((t) => run(`${on.has(t) ? "■" : "□"} ${t}   `, { size: 17, bold: on.has(t), color: on.has(t) ? C.ink : C.gray })), { after: 100 }));
  }
  if (nx.points?.length) {
    out.push(table(["문장", "출제 포인트", "변형 방법"],
      nx.points.map((x) => [join(x.sent), x.point, forTeacher ? x.how ?? "" : ""]), [900, 4200, CONTENT_W - 5100]));
    out.push(spacer(100));
  }
  return out;
}

// 분석 자료 안의 Review Test 포인트: 짚을 것 → 정리 → 이렇게 내면 된다(예시 문항+정답)
function reviewPointBlock(ps) {
  const kp = ps.review?.key_points;
  if (!kp?.length) return [];
  const out = [sectionTitle("REVIEW", "Review Test 포인트 — 시험에 낼 핵심")];
  kp.forEach((k, i) => {
    out.push(p([
      run(` POINT ${i + 1} `, { size: 17, bold: true, color: C.white, shade: C.ans }),
      run(`  ${k.title}`, { size: 22, bold: true }),
      run(k.sent ? `   [${join(k.sent)}번 문장]` : "", { size: 16, color: C.gray }),
    ], { before: 240, after: 60, keepNext: true }));
    if (k.why) out.push(txt(`왜 중요? ${k.why}`, { size: 17, color: C.gray, after: 60, keepNext: true }));
    if (k.notes?.length) {
      out.push(noteBox("정리", k.notes.map((n) => txt(n, { size: 18, after: 40 }))));
      out.push(spacer(60));
    }
    if (k.questions?.length) {
      out.push(txt("▶ 이렇게 내면 된다", { size: 19, bold: true, before: 60, after: 0, keepNext: true }));
      k.questions.forEach((q, j) => out.push(...questionBlock(j + 1, q, true)));
    }
  });
  return out;
}

function grammarPlusBlock(ps) {
  if (!ps.grammar_plus?.length) return [];
  const out = [sectionTitle("Grammar✚", "함께 정리할 문법")];
  ps.grammar_plus.forEach((g) => {
    out.push(noteBox(g.title, [...(g.body ?? []), ...(g.examples ?? []).map((e) => txt(`e.g. ${e}`, { size: 17, color: C.gray, after: 20 }))]));
    out.push(spacer(80));
  });
  return out;
}

function fullTranslation(ps) {
  const ko = ps.translation ?? (ps.sentences ?? []).map((s) => s.ko).join(" ");
  if (!ko) return [];
  return [sectionTitle("해석", "전체 해석"), txt(ko, { size: 19, line: 340 })];
}

// ---------- 문서 조립 ----------
function buildDoc(forTeacher) {
  const children = [];
  const label = forTeacher ? "교사용" : "학생용";
  children.push(p([run("MOCK EXAM ANALYSIS", { size: 18, bold: true, color: C.gray })], { after: 40 }));
  children.push(p([
    run(meta.title ?? "모의고사 지문분석", { size: 40, bold: true }),
    run(`   ${label}`, { size: 22, bold: true, color: C.white, shade: forTeacher ? C.ans : C.ink }),
  ], { after: 80 }));
  if (meta.source || meta.grade) children.push(txt([meta.source, meta.grade].filter(Boolean).join(" · "), { size: 20, color: C.gray, after: 200 }));
  children.push(table(["번호", "유형", "제목"], passages.map((ps) => [`${ps.number}번`, ps.type ?? "", ps.title_ko ?? ps.title_en ?? ""]), [1200, 2000, CONTENT_W - 3200]));
  if (!forTeacher) {
    children.push(spacer(200));
    children.push(table(["이름", "날짜", "점수", "확인"], [["", "", "", ""]], [3000, 2400, 2000, CONTENT_W - 7400]));
  }

  passages.forEach((ps) => {
    children.push(new Paragraph({ children: [new PageBreak()] }));
    children.push(...coverBlock(ps, forTeacher));
    children.push(...originalBlock(ps));
    children.push(...sentenceBlock(ps, forTeacher));
    children.push(...vocabBlock(ps, forTeacher));
    children.push(...solvingBlock(ps, forTeacher));
    children.push(...naesinBlock(ps, forTeacher));
    if (forTeacher) {
      children.push(...reviewPointBlock(ps));
      children.push(...grammarPlusBlock(ps));
      children.push(...fullTranslation(ps));
    }
  });

  const headerRight = `${meta.short ?? meta.title ?? "지문분석"} · ${label}`;
  return new Document({
    creator: "David",
    title: `${meta.title ?? "지문분석"} (${label})`,
    styles: { default: { document: { run: { font: FONT, size: 20 } } } },
    sections: [{
      properties: { page: { size: { width: PAGE.W, height: PAGE.H }, margin: { top: PAGE.T, bottom: PAGE.B, left: PAGE.L, right: PAGE.R, header: 600, footer: 500 } } },
      headers: { default: makeHeader(headerRight) },
      footers: { default: makeFooter() },
      children,
    }],
  });
}

// ---------- Review Test (문제지·답지) ----------
function reviewQuestions() {
  const qs = [];
  passages.forEach((ps) => [
    ...(ps.review?.key_points ?? []).flatMap((k) => (k.questions ?? []).map((q) => ({ point: k.title, ...q }))),
    ...(ps.review?.questions ?? []),
  ].forEach((q) => qs.push({ ps, q })));
  return qs;
}

function questionBlock(no, q, withAnswer) {
  const out = [];
  out.push(p([
    run(`${no}. `, { size: 21, bold: true }),
    ...rich(q.stem, { size: 20, bold: true }),
    ...(q.type ? [run(`  [${q.type}]`, { size: 15, color: C.gray })] : []),
  ], { before: 200, after: 80, keepNext: true }));
  if (q.text) {
    out.push(noteBox(null, String(q.text).split(/\n/).map((l) => txt(l, { size: 19, line: 340, after: 40 })), { fill: C.white, bar: C.line2 }));
    out.push(spacer(60));
  }
  if (q.boxes?.length) {
    out.push(noteBox("<보기>", q.boxes.map((b) => txt(b, { size: 18, after: 30 })), { fill: C.white, bar: C.line2 }));
    out.push(spacer(60));
  }
  (q.choices ?? []).forEach((c, i) => out.push(p(rich(`${circled(i + 1)} ${c}`, { size: 19 }), { after: 30, indent: { left: 200 } })));
  if (!q.choices?.length && !withAnswer) out.push(...blankLine(q.lines ?? 2));
  if (withAnswer) {
    const ans = (typeof q.answer === "number" ? `${circled(q.answer)} ${q.choices?.[q.answer - 1] ?? ""}` : String(q.answer ?? "")).replace(/__/g, "");
    out.push(txt(`정답  [[${ans}]]`, { size: 19, before: 60, after: 40 }));
    if (q.explanation) out.push(noteBox(null, String(q.explanation).split(/\n/).map((l) => txt(l, { size: 17, after: 30 }))));
  }
  return out;
}

function buildReviewDoc(withAnswer) {
  const qs = reviewQuestions();
  const children = [];
  children.push(p([run("REVIEW TEST", { size: 18, bold: true, color: C.gray })], { after: 40 }));
  children.push(p([
    run(meta.title ? `${meta.title} Review Test` : "Review Test", { size: 36, bold: true }),
    run(`   ${withAnswer ? "ANSWER KEY" : "문제지"}`, { size: 22, bold: true, color: C.white, shade: withAnswer ? C.ans : C.ink }),
  ], { after: 80 }));
  const range = passages.filter((ps) => ps.review?.questions?.length).map((ps) => `${ps.number}번`).join(", ");
  children.push(txt(`범위 ${range}   ·   ${qs.length}문항`, { size: 19, color: C.gray, after: 160 }));
  if (withAnswer) {
    children.push(table(["번호", "정답", "포인트"], qs.map(({ q }, i) => [String(i + 1),
      typeof q.answer === "number" ? circled(q.answer) : String(q.answer).slice(0, 40), q.point ?? q.type ?? ""]), [900, 4200, CONTENT_W - 5100]));
  } else {
    children.push(table(["이름", "날짜", "점수", "확인"], [["", "", ` / ${qs.length}`, ""]], [3000, 2400, 2000, CONTENT_W - 7400]));
  }
  let cur = null;
  qs.forEach(({ ps, q }, i) => {
    if (ps !== cur) {
      cur = ps;
      children.push(p([
        run(` ${ps.number}번 `, { size: 19, bold: true, color: C.white, shade: C.ink }),
        run(`  ${ps.type ?? ""}  ${ps.title_ko ?? ""}`, { size: 19, bold: true }),
      ], { before: 320, after: 60, keepNext: true, border: { bottom: { style: BorderStyle.SINGLE, size: 6, color: C.line2, space: 4 } } }));
    }
    children.push(...questionBlock(i + 1, q, withAnswer));
  });
  const label = withAnswer ? "Review Test 답지" : "Review Test";
  return new Document({
    creator: "David",
    title: `${meta.title ?? "지문분석"} ${label}`,
    styles: { default: { document: { run: { font: FONT, size: 20 } } } },
    sections: [{
      properties: { page: { size: { width: PAGE.W, height: PAGE.H }, margin: { top: PAGE.T, bottom: PAGE.B, left: PAGE.L, right: PAGE.R, header: 600, footer: 500 } } },
      headers: { default: makeHeader(`${meta.short ?? meta.title ?? "지문분석"} · ${label}`) },
      footers: { default: makeFooter() },
      children,
    }],
  });
}

(async () => {
  fs.mkdirSync(outDir, { recursive: true });
  const base = meta.filename ?? "지문분석";
  for (const forTeacher of withStudent ? [true, false] : [true]) {
    const file = path.join(outDir, forTeacher ? `${base}.docx` : `${base}_학생용.docx`);
    fs.writeFileSync(file, await Packer.toBuffer(buildDoc(forTeacher)));
    console.log("저장:", file);
  }
  if (withReviewFiles && reviewQuestions().length) {
    for (const withAnswer of [false, true]) {
      const file = path.join(outDir, `${base}_ReviewTest${withAnswer ? "_답지" : ""}.docx`);
      fs.writeFileSync(file, await Packer.toBuffer(buildReviewDoc(withAnswer)));
      console.log("저장:", file);
    }
  }
})();
