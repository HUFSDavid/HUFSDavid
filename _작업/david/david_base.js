// ============================================================
//  DAVID 공통 틀 (Common Frame) v1
//  - 모든 영역(단어·영영풀이·대화·본문·문법·외부지문·직전보강)이 공유하는 부품
//  - 같은 코드에서 mode 인자만 바꿔 _학생용 / _교사용 두 파일 생성
//    학생용(student): 정답·근거·지도 팁·출제 주의·메모 없음, 쓰기 문항엔 답 쓰는 줄
//    교사용(teacher): 모든 문항 옆 빨간 정답 + 근거, 지도 팁, 출제 주의, 보강 메모
//  - 문서 안에는 '학생용/교사용'이라는 말을 절대 쓰지 않는다 (파일명으로만 구분)
// ============================================================
const fs = require('fs');
const path = require('path');
const {
  Document, Packer, Paragraph, TextRun, ImageRun, Table, TableRow, TableCell,
  Header, Footer, AlignmentType, BorderStyle, WidthType, ShadingType,
  VerticalAlign, PageNumber, PositionalTab, PositionalTabAlignment,
  PositionalTabRelativeTo, PositionalTabLeader, PageBreak, TabStopType,
} = require('docx');

// ---------- 브랜드 토큰 ----------
const C = {
  ink: '111111',      // 잉크 블랙
  coral: 'E0413A',    // 포인트 코랄
  answer: 'C00000',   // 정답 빨강
  head: '2B2B2B',     // 표 머리행
  zebra: 'F5F7FB',    // 표 줄무늬
  pinkBg: 'FDF1F0',   // 출제포인트 배경
  trickBg: 'FFF9E6',  // DAVID'S TRICK 배경
  tipBg: 'EEF3FA',    // 지도 팁 배경
  line: 'BFBFBF',
  grey: '808080',
  sub: '595959',
};
const F = { ko: 'Pretendard', en: 'Montserrat', pen: 'Nanum Pen' };
const PAGE_W = 11906, MARGIN = 1134, CW = PAGE_W - MARGIN * 2; // 본문 폭 9638
const SLOGAN = 'PRACTICE MAKES PERFECT';
const ASSETS = path.join(__dirname, 'assets');

// ---------- 시리즈 (영역) ----------
// 문법만 확정. 나머지는 제안값 — 사용자 확정 후 수정
const SERIES = {
  G: 'DAVID GRAMMAR BIBLE',
  V: 'DAVID VOCA BIBLE',
  E: 'DAVID VOCA BIBLE',
  D: 'DAVID READING BIBLE',
  R: 'DAVID READING BIBLE',
  X: 'DAVID READING BIBLE',
  F: 'DAVID FINAL CHECK',
};

// ---------- 인라인 마크업 ----------
//  **굵게**   {{정답}} → 학생: (        ) / 교사: ( 정답 ) 빨강
//  [[정답]]   → 학생: 밑줄 빈칸 ________ / 교사: 빨간 밑줄 정답
//  ~~코랄~~   → 코랄 강조
//  __밑줄__   → 밑줄 (어법 오류 찾기, 밑줄 친 부분 문항)
function rich(text, mode, base = {}) {
  const out = [];
  const re = /(\*\*[^*]+\*\*|\{\{[^}]*\}\}|\[\[[^\]]*\]\]|~~[^~]+~~|__[^_]+__)/g;
  let last = 0, m;
  const push = (t, o = {}) => t && out.push(new TextRun({ text: t, font: F.ko, ...base, ...o }));
  while ((m = re.exec(text))) {
    push(text.slice(last, m.index));
    const tok = m[0];
    if (tok.startsWith('**')) push(tok.slice(2, -2), { bold: true });
    else if (tok.startsWith('~~')) push(tok.slice(2, -2), { bold: true, color: C.coral });
    else if (tok.startsWith('__')) push(tok.slice(2, -2), { underline: {} });
    else if (tok.startsWith('{{')) {
      const a = tok.slice(2, -2);
      if (mode === 'teacher') { push('( '); push(a, { bold: true, color: C.answer }); push(' )'); }
      else push('(' + ' '.repeat(Math.max(8, a.length * 2)) + ')');
    } else {
      const a = tok.slice(2, -2);
      if (mode === 'teacher') push(' ' + a + ' ', { bold: true, color: C.answer, underline: {} });
      else push(' '.repeat(Math.max(10, a.length * 2)), { underline: {} });
    }
    last = m.index + tok.length;
  }
  push(text.slice(last));
  return out;
}

const P = (children, o = {}) => new Paragraph({ children, ...o });
const T = (text, o = {}) => new TextRun({ text, font: F.ko, ...o });
const spacer = (after = 120) => P([T('')], { spacing: { after } });
const pageBreak = () => P([new PageBreak()]);

// ---------- 표 공통 ----------
const bLine = (color = C.line, size = 4, style = BorderStyle.SINGLE) => ({ style, size, color });
const borders = (b) => ({ top: b, bottom: b, left: b, right: b });
const NONE = { style: BorderStyle.NONE, size: 0, color: 'FFFFFF' };
const cellMargins = { top: 90, bottom: 90, left: 140, right: 140 };

function box(paragraphs, { fill = 'FFFFFF', border = bLine(), width = CW } = {}) {
  return new Table({
    width: { size: width, type: WidthType.DXA }, columnWidths: [width],
    rows: [new TableRow({ cantSplit: true, children: [new TableCell({
      width: { size: width, type: WidthType.DXA }, borders: borders(border),
      shading: { type: ShadingType.CLEAR, fill, color: 'auto' },
      margins: cellMargins, children: paragraphs,
    })] })],
  });
}

// ---------- 머리말 / 꼬리말 (로고는 머리말에만) ----------
function header(series, rightText) {
  const logo = fs.readFileSync(path.join(ASSETS, 'DAVID_logo_mono.png'));
  return new Header({ children: [P([
    require(path.join(__dirname, '..', 'scripts', 'coverlib.js')).headerLogo(),
    new TextRun({ text: '  ' + series, font: F.en, bold: true, size: 15, color: C.ink }),
    new TextRun({ text: '\t' + rightText, font: F.ko, size: 15, color: C.grey }),
  ], { tabStops: [{ type: TabStopType.RIGHT, position: CW }], border: { bottom: { style: BorderStyle.SINGLE, size: 6, color: C.ink, space: 2 } } })] });
}
function footer() {
  return new Footer({ children: [P([
    new TextRun({ text: '◇ ' + SLOGAN + '  ·  ', font: F.en, size: 13, color: C.grey }),
    new TextRun({ children: [PageNumber.CURRENT], font: F.en, size: 18, bold: true, color: C.ink }),
  ], { alignment: AlignmentType.CENTER })] });
}

// ---------- 제목 블록 (문서 첫머리) ----------
function titleBlock({ series, category, title, question, retest }, mode) {
  const out = [
    P([new TextRun({ text: series, font: F.en, bold: true, size: 17, color: C.coral }),
       T('   ' + category, { size: 16, color: C.grey })], { spacing: { after: 20 } }),
    P([T(retest ? title + '  ' : title, { bold: true, size: 44, color: C.ink }), ...(retest ? [new TextRun({ text: ' RETEST ' + retest.set + ' ', font: F.en, bold: true, size: 24, color: 'FFFFFF', shading: { type: ShadingType.CLEAR, fill: C.coral, color: 'auto' } })] : [])], { spacing: { after: 80 } }),
  ];
  if (retest) {
    const ws = [2900, 2400, 2338, 2000];
    const cells = ['이름', '날짜', `점수        / ${retest.total}`, `통과 ${retest.pass}점 이상`];
    out.push(new Table({ width: { size: CW, type: WidthType.DXA }, columnWidths: ws,
      rows: [new TableRow({ children: cells.map((c, i) => new TableCell({ width: { size: ws[i], type: WidthType.DXA },
        borders: borders(bLine(C.ink, 6)), margins: { top: 110, bottom: 110, left: 140, right: 140 },
        shading: { type: ShadingType.CLEAR, fill: i === 3 ? C.pinkBg : 'FFFFFF', color: 'auto' },
        children: [P([T(c, { bold: true, size: 18, color: i === 3 ? C.coral : C.ink })])] })) })] }), spacer(200));
  }
  if (question) out.push(P([T('오늘의 질문: ', { size: 19, color: C.sub }), ...rich(question, mode, { size: 19, bold: true })],
    { spacing: { after: 240 } }));
  return out;
}

// ---------- 섹션 제목 ----------
// kind: 'point'(검정 라벨) | 'coral'(FLOW·PRACTICE 대단원·PERFECT CHECK·WRITE·MAP·MEMO)
function section(label, title, kind = 'coral') {
  const fill = kind === 'point' ? C.ink : C.coral;
  return P([
    new TextRun({ text: ' ' + label + ' ', font: F.en, bold: true, size: 26, color: 'FFFFFF',
      shading: { type: ShadingType.CLEAR, fill, color: 'auto' } }),
    T('  ' + title, { bold: true, size: 26, color: C.ink }),
  ], { spacing: { before: 280, after: 160 }, keepNext: true,
       border: { bottom: { style: BorderStyle.SINGLE, size: 8, color: C.coral, space: 3 } } });
}

// ---------- STEP 박스 (Teaching Flow) ----------
function step(n, title, lines, mode) {
  const W1 = 900, W2 = CW - W1;
  return [new Table({
    width: { size: CW, type: WidthType.DXA }, columnWidths: [W1, W2],
    rows: [new TableRow({ cantSplit: true, children: [
      new TableCell({ width: { size: W1, type: WidthType.DXA }, borders: borders(bLine(C.ink)),
        shading: { type: ShadingType.CLEAR, fill: C.ink, color: 'auto' }, margins: cellMargins,
        children: [P([new TextRun({ text: 'STEP', font: F.en, bold: true, size: 14, color: 'FFFFFF' })], { alignment: AlignmentType.CENTER }),
                   P([new TextRun({ text: String(n), font: F.en, bold: true, size: 40, color: C.coral })], { alignment: AlignmentType.CENTER })] }),
      new TableCell({ width: { size: W2, type: WidthType.DXA }, borders: borders(bLine()), margins: cellMargins,
        children: [P([T(title, { bold: true, size: 21 })], { spacing: { after: 60 } }),
                   ...lines.map(l => P(rich(l, mode, { size: 19 }), { spacing: { after: 30 } }))] }),
    ] })],
  }), spacer(160)];
}

// ---------- 일반 표 (검정 머리행 + 줄무늬) ----------
function table(headers, rows, widths, mode) {
  const sum = widths.reduce((a, b) => a + b, 0);
  const cell = (content, w, i, isHead) => new TableCell({
    width: { size: w, type: WidthType.DXA }, borders: borders(bLine(isHead ? C.head : '9A9A9A')),
    shading: { type: ShadingType.CLEAR, fill: isHead ? C.head : (i % 2 ? C.zebra : 'FFFFFF'), color: 'auto' },
    margins: { top: 70, bottom: 70, left: 110, right: 110 }, verticalAlign: VerticalAlign.CENTER,
    children: [P(isHead ? [T(content, { bold: true, size: 18, color: 'FFFFFF' })] : rich(content, mode, { size: 18 }))],
  });
  return [new Table({
    width: { size: sum, type: WidthType.DXA }, columnWidths: widths,
    rows: [new TableRow({ tableHeader: true, children: headers.map((h, j) => cell(h, widths[j], 0, true)) }),
      ...rows.map((r, i) => new TableRow({ children: r.map((c, j) => cell(c, widths[j], i, false)) }))],
  }), spacer(200)];
}

// ---------- DAVID'S TRICK (손글씨 박스) ----------
function trick(title, lines) {
  const dash = { style: BorderStyle.DASHED, size: 8, color: C.coral };
  return [new Table({
    width: { size: CW, type: WidthType.DXA }, columnWidths: [CW],
    rows: [new TableRow({ cantSplit: true, children: [new TableCell({
      width: { size: CW, type: WidthType.DXA }, borders: { top: dash, bottom: dash, left: NONE, right: NONE },
      shading: { type: ShadingType.CLEAR, fill: C.trickBg, color: 'auto' }, margins: { top: 120, bottom: 120, left: 200, right: 200 },
      children: [
        P([T('💡 ', { size: 20 }), new TextRun({ text: "DAVID'S TRICK", font: F.en, bold: true, size: 20, color: C.coral }),
           T('  ' + title, { bold: true, size: 20 })], { spacing: { after: 40 } }),
        ...lines.map(l => P([new TextRun({ text: l, font: F.pen, size: 30, color: C.ink })], { spacing: { after: 0 } })),
      ] })] })],
  }), spacer(200)];
}

// ---------- 정보 박스 (회청색) ----------
function infoBox(title, lines, mode) {
  return [box([P([T(title, { bold: true, size: 19 })], { spacing: { after: 60 } }),
    ...lines.map(l => P(rich(l, mode, { size: 18 }), { spacing: { after: 30 } }))],
    { fill: 'F2F5FA', border: bLine('C9D3E3') }), spacer(200)];
}

// ---------- 출제포인트 예제 (분홍 박스) ----------
function examPoint(items, mode) {
  return [P([T('▶ 출제포인트 예제', { bold: true, size: 19 })], { spacing: { after: 80 }, keepNext: true }),
    box(items.map((it, i) => P([T('①②③④⑤⑥'[i] + ' ', { size: 19 }), ...rich(it.q, mode, { size: 19 }),
      ...answerRuns(it, mode)], { spacing: { after: 40 } })), { fill: C.pinkBg, border: bLine('E8C4C1') }),
    spacer(200)];
}

// ---------- 정답 + 근거 (교사만) ----------
function answerRuns(it, mode) {
  if (mode !== 'teacher' || (!it.a && !it.why)) return [];
  const r = [];
  if (it.a) r.push(T('   ▶ ' + it.a, { bold: true, size: 18, color: C.answer }));
  if (it.why) r.push(T('   근거: ' + it.why, { size: 16, color: C.answer }));
  return r;
}

// ---------- PRACTICE (드릴) ----------
function practice(n, instruction, items, mode) {
  return [P([T('✏️ ', { size: 20 }), new TextRun({ text: 'PRACTICE ' + n, font: F.en, bold: true, size: 20 }),
      T('  ' + instruction, { size: 19 })], { spacing: { before: 80, after: 80 }, keepNext: true }),
    ...items.map((it, i) => P([T(`${i + 1}. `, { size: 19 }), ...rich(it.q, mode, { size: 19 }), ...answerRuns(it, mode)],
      { indent: { left: 280 }, spacing: { after: 50 } })),
    spacer(200)];
}


// ---------- DRILL (한끗내신형 PRACTICE 세트) ----------
//  Point 하나당 PRACTICE 세트 1개, 15~22문항, 번호는 세트 안에서 이어짐
//  levels: [{ level:'Basic ①', instr, bogi?:[...], type:'choice'|'write'|'mcq', items:[...] }]
//   choice : 괄호 고르기 등 — 학생: 문항만 / 교사: ▶ 정답 + 근거
//   write  : 빈칸·오류 수정 — 학생: 문항 끝 답 쓰는 칸 / 교사: 빨간 정답 + 근거
//   fill   : 문장 속 [[정답]] 빈칸 — 학생: 밑줄 / 교사: 빈칸 자리에 빨간 정답
//   multi  : 옳은 것/틀린 것 '모두 고르기' 주관식 — { q, box:[(a)~(e)], a, why, fix?, label? }
//            학생: 답 쓰는 줄 / 교사: 빨간 정답 + 근거  (옳은·틀린 것 고르기는 전부 이 유형)
//   mcq    : 내신 객관식 (쓰임 구별, (A)(B)(C) 짝, 개수 세기 등 '하나 고르기'만) — { q, opts:[5개], a:'③', why }
const CIRC = ['①', '②', '③', '④', '⑤'];
function bogiBox(words) {
  return [box([P([T('<보기>', { bold: true, size: 18, color: C.coral }), T('    ' + words.join('   /   '), { size: 19 })],
    { alignment: AlignmentType.CENTER })], { border: bLine('9A9A9A'), width: CW - 560 }), spacer(100)];
}
function drill(n, title, levels, mode) {
  const out = n == null ? [] : [P([T('✏️ ', { size: 21 }), new TextRun({ text: 'PRACTICE ' + n, font: F.en, bold: true, size: 21 }),
    T('  ' + title, { bold: true, size: 20 })], { spacing: { before: 160, after: 100 }, keepNext: true,
    border: { bottom: { style: BorderStyle.SINGLE, size: 4, color: C.line, space: 2 } } })];
  let no = 1;
  for (const L of levels) {
    if (!L.free && L.items.length !== 10) console.warn(`[DAVID] PRACTICE ${n ?? ''} [${L.level}] 문항 수 ${L.items.length} — 단계별 10문항 규칙`);
    out.push(P([T('[' + L.level + '] ', { bold: true, size: 19, color: C.coral }), T(L.instr, { bold: true, size: 19 })],
      { spacing: { before: 140, after: 80 }, keepNext: true }));
    if (L.bogi) out.push(...bogiBox(L.bogi));
    for (const it of L.items) {
      if (L.type === 'multi') {
        out.push(P([T(`${no}. `, { bold: true, size: 19 }), ...rich(it.q, mode, { size: 19 })],
          { indent: { left: 280 }, spacing: { before: 80, after: 40 }, keepNext: true }));
        out.push(box(it.box.map(l => P(rich(l, mode, { size: 18 }), { spacing: { after: 20 } })),
          { border: bLine('9A9A9A'), width: CW - 560 }));
        if (mode === 'teacher') out.push(P(answerRuns(it, mode), { indent: { left: 560 }, spacing: { before: 60, after: 100 } }));
        else out.push(P([T((it.label || '답') + ': ', { bold: true, size: 19 }), T('_'.repeat(it.fix ? 60 : 30), { size: 19, color: '7F7F7F' })],
          { indent: { left: 560 }, spacing: { before: 120, after: 120 } }));
      } else if (L.type === 'mcq') {
        out.push(P([T(`${no}. `, { bold: true, size: 19 }), ...rich(it.q, mode, { size: 19 })],
          { indent: { left: 280 }, spacing: { before: 80, after: 40 }, keepNext: true }));
        if (it.box) out.push(box(it.box.map(l => P(rich(l, mode, { size: 18 }), { spacing: { after: 20 } })),
          { border: bLine('9A9A9A'), width: CW - 560 }), spacer(60));
        if (it.opts.every(o => o.length <= 8)) {
          const runs = [];
          it.opts.forEach((o, k) => runs.push(T((k ? '\t' : '') + CIRC[k] + ' ', { size: 19 }), ...rich(o, mode, { size: 19 })));
          out.push(P(runs, { indent: { left: 560 }, spacing: { after: 20 }, keepNext: mode === 'teacher',
            tabStops: [1, 2, 3, 4].map(k => ({ type: TabStopType.LEFT, position: 560 + k * 1500 })) }));
        } else it.opts.forEach((o, k) => out.push(P([T(CIRC[k] + ' ', { size: 19 }), ...rich(o, mode, { size: 19 })],
          { indent: { left: 560 }, spacing: { after: 20 }, keepNext: k < it.opts.length - 1 || mode === 'teacher' })));
        if (mode === 'teacher') out.push(P(answerRuns(it, mode), { indent: { left: 560 }, spacing: { after: 60 } }));
        else out.push(spacer(60));
      } else {
        const tail = (L.type === 'write' && mode !== 'teacher')
          ? [T('   → ', { size: 19 }), T('_'.repeat(24), { size: 19, color: '7F7F7F' })] : [];
        out.push(P([T(`${no}. `, { size: 19 }), ...rich(it.q, mode, { size: 19 }), ...tail, ...answerRuns(it, mode)],
          { indent: { left: 280, hanging: 0 }, spacing: { after: L.type === 'write' ? 90 : 50 } }));
      }
      no++;
    }
  }
  out.push(spacer(240));
  return out;
}

// ---------- WRITE (서술형) ----------
// level: Basic / Intermediate / Advanced
function writeItem(n, level, instruction, lines, it, mode) {
  const body = lines.map(l => P(rich(l, mode, { size: 19 }), { spacing: { after: 40 } }));
  if (mode === 'teacher') {
    body.push(P([T('→ ', { size: 19 }), T(it.a, { bold: true, size: 19, color: C.answer })], { spacing: { before: 60 } }));
    if (it.why) body.push(P([T('근거: ' + it.why, { size: 16, color: C.answer })]));
  } else {
    for (const lab of (it.blanks || ['→'])) body.push(P([T(lab + (lab === '→' ? ' ' : ': ') + '\t', { size: 19 })],
      { spacing: { before: 200 }, tabStops: [{ type: TabStopType.RIGHT, position: CW - 600, leader: 'underscore' }] }));
  }
  return [P([T(`${n}. `, { bold: true, size: 19 }), T(`[${level}] `, { bold: true, size: 19, color: C.coral }),
      T(instruction, { bold: true, size: 19 })], { spacing: { before: 120, after: 80 }, keepNext: true }),
    box(body, { border: bLine('9A9A9A') }), spacer(160)];
}

// ---------- 교사 전용 박스 (학생 파일에는 아예 생성되지 않음) ----------
function tip(lines, mode) {      // 지도 팁
  if (mode !== 'teacher') return [];
  return [box([P([T('🎯 지도 팁', { bold: true, size: 19, color: C.ink })], { spacing: { after: 60 } }),
    ...lines.map(l => P(rich(l, mode, { size: 18 }), { spacing: { after: 30 } }))],
    { fill: C.tipBg, border: { style: BorderStyle.SINGLE, size: 12, color: '7A93B8' } }), spacer(200)];
}
function caution(lines, mode) {  // 출제 주의
  if (mode !== 'teacher') return [];
  return [box([P([T('⚠ 출제 주의', { bold: true, size: 19, color: C.answer })], { spacing: { after: 60 } }),
    ...lines.map(l => P(rich(l, mode, { size: 18 }), { spacing: { after: 30 } }))],
    { fill: 'FFFFFF', border: { style: BorderStyle.SINGLE, size: 12, color: C.answer } }), spacer(200)];
}
function memo(lines, mode) {     // 보강 메모 (MEMO 섹션)
  if (mode !== 'teacher') return [];
  return [section('MEMO', '보강 메모'),
    box(lines.map(l => P(rich(l, mode, { size: 18 }), { spacing: { after: 50 } })),
      { border: { style: BorderStyle.DASHED, size: 6, color: C.grey } }), spacer(200)];
}

// ---------- 이미지 (DAVID'S MAP 등 도식 PNG) ----------
function image(file, widthPx) {
  const buf = fs.readFileSync(file);
  const w = buf.readUInt32BE(16), h = buf.readUInt32BE(20);
  return [P([new ImageRun({ type: 'png', data: buf, transformation: { width: widthPx, height: Math.round(widthPx * h / w) } })],
    { alignment: AlignmentType.CENTER, spacing: { after: 160 } })];
}

// ---------- 문서 조립 + 저장 ----------
//  meta: { series, code, title, category, question, rightText }
//  build(mode) → 문단 배열.  파일명: DAVID_{code}_{title}_{학생용|교사용}.docx
async function render(meta, build, outDir) {
  const files = [];
  for (const mode of ['student', 'teacher']) {
    const doc = new Document({
      styles: { default: { document: { run: { font: F.ko, size: 19 } } } },
      sections: [...(meta.cover ? [require(path.join(__dirname, '..', 'scripts', 'coverlib.js')).makeCover({ ...meta.cover, edition: meta.cover.edition || 'GRAMMAR' })] : []), {
        properties: { page: { size: { width: PAGE_W, height: 16838 },
          margin: { top: 1560, right: MARGIN, bottom: MARGIN, left: MARGIN, header: 708, footer: 708 } } },
        headers: { default: header(meta.series, meta.rightText || `${meta.code}  ${meta.title}`) },
        footers: { default: footer() },
        children: [...titleBlock(meta, mode), ...build(mode)],
      }],
    });
    const name = `${meta.prefix || ''}DAVID_${meta.code}_${meta.title}${meta.retest ? '_재시험' + meta.retest.set : ''}_${mode === 'teacher' ? '교사용' : '학생용'}.docx`;
    const out = path.join(outDir, name);
    fs.writeFileSync(out, await Packer.toBuffer(doc));
    files.push(out);
  }
  return files;
}

module.exports = { C, F, CW, SERIES, rich, P, T, spacer, pageBreak, box, section, step, table, trick,
  infoBox, examPoint, practice, drill, bogiBox, writeItem, tip, caution, memo, image, render };
