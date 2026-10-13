const pptxgen = require("pptxgenjs");
const React = require("react");
const ReactDOMServer = require("react-dom/server");
const sharp = require("sharp");
const fa = require("react-icons/fa");
const fs = require("fs");

// Usage: node build_deck.js <data.json> <output.pptx>
const [, , DATA_PATH, OUT_PATH] = process.argv;
if (!DATA_PATH || !OUT_PATH) { console.error("usage: node build_deck.js data.json out.pptx"); process.exit(1); }
const D = JSON.parse(fs.readFileSync(DATA_PATH, "utf8"));
const M = D.meta, IN = D.intro || {};
const EX = D.exercises;
const PS = Object.fromEntries(EX.map((e) => [e.n, { foot: e.foot || "", s: e.sentences }]));
const GR = Object.fromEntries(EX.map((e) => [e.n, e.grammar || []]));
const isImp = (e) => e.type === "함의";
const kindOf = (e) => e.kind || (isImp(e) ? "함의 추론" : `${e.type} 추론`);
// split exercises into parts of up to 6 (one class period each)
const PARTS = [];
// up to 7 problems per class period, split evenly
const PER = Math.ceil(EX.length / Math.ceil(EX.length / 7));
for (let i = 0; i < EX.length; i += PER) PARTS.push(EX.slice(i, i + PER));
const partOf = (e) => PARTS.findIndex((p) => p.includes(e));
const partName = (pi) => `Part ${pi + 1} · Ex ${PARTS[pi][0].n}–${PARTS[pi][PARTS[pi].length - 1].n}`;

const THEME = {
  name: "Blank Hunter",
  headFontFace: "맑은 고딕",
  bodyFontFace: "맑은 고딕",
  colors: {
    dk1: "1E2B2A", lt1: "FFFFFF", dk2: "14453D", lt2: "E6F2ED",
    accent1: "1F7A64", accent2: "EF5B3F", accent3: "FFD45C",
    accent4: "6E7F7C", accent5: "2C7DA0", accent6: "F7E9E4",
    hlink: "1F7A64", folHlink: "6E7F7C",
  },
};
const HEX = THEME.colors;

const pres = new pptxgen();
pres.layout = "LAYOUT_WIDE"; // 13.33 x 7.5
pres.theme = { headFontFace: THEME.headFontFace, bodyFontFace: THEME.bodyFontFace };
pres.title = `${M.title} 해설강의`;
pres.author = M.author || "David";
// hex colors (no theme post-processing needed)
const C = { text1: HEX.dk1, text2: HEX.dk2, background1: HEX.lt1, background2: HEX.lt2, accent1: HEX.accent1, accent2: HEX.accent2, accent3: HEX.accent3, accent4: HEX.accent4, accent5: HEX.accent5, accent6: HEX.accent6 };

async function icon(Comp, color, size = 256) {
  const svg = ReactDOMServer.renderToStaticMarkup(React.createElement(Comp, { color: "#" + color, size: String(size) }));
  const buf = await sharp(Buffer.from(svg)).png().toBuffer();
  return "image/png;base64," + buf.toString("base64");
}
const shadow = () => ({ type: "outer", color: "1E2B2A", opacity: 0.12, blur: 8, offset: 2, angle: 90 });

// ---------- Layouts ----------
pres.defineSlideMaster({
  title: "DARK",
  background: { color: C.text2 },
  objects: [
    { placeholder: { options: { name: "title", type: "title", x: 0.8, y: 2.2, w: 11.7, h: 1.6, fontSize: 44, bold: true, color: C.background1, valign: "middle", align: "left", margin: 0 }, text: "" } },
    { placeholder: { options: { name: "body", type: "body", x: 0.8, y: 3.9, w: 11.7, h: 1.4, fontSize: 20, color: C.background2, valign: "top", align: "left", margin: 0 }, text: "" } },
  ],
});
pres.defineSlideMaster({
  title: "CONTENT",
  background: { color: C.background1 },
  objects: [
    { placeholder: { options: { name: "title", type: "title", x: 0.6, y: 0.35, w: 9.8, h: 0.85, fontSize: 30, bold: true, color: C.text2, valign: "middle", align: "left", margin: 0 }, text: "" } },
    { text: { text: M.footer, options: { x: 0.6, y: 7.05, w: 6, h: 0.3, fontSize: 10, color: C.accent4, margin: 0 } } },
  ],
  slideNumber: { x: 12.2, y: 7.05, w: 0.5, h: 0.3, fontSize: 10, color: C.accent4, align: "right" },
});

const TAG = {
  "정답": { fill: C.accent2, color: C.background1 },
  "반대": { fill: C.text2, color: C.background1 },
  "언급 없음": { fill: C.background2, color: C.text2 },
  "소재 함정": { fill: C.accent3, color: C.text1 },
  "범위 오류": { fill: C.accent5, color: C.background1 },
  "반쪽 정답": { fill: "F4C7BC", color: C.text1 },
};
const NUM = ["①", "②", "③", "④", "⑤"];

function chip(slide, text, x, y, w, fill, color, size = 12) {
  slide.addText(text, { shape: pres.shapes.ROUNDED_RECTANGLE, rectRadius: 0.15, x, y, w, h: 0.36, fill: { color: fill }, color, fontSize: size, bold: true, align: "center", valign: "middle", margin: 0 });
}

(async () => {
  const I = {
    search: await icon(fa.FaSearch, HEX.lt1), link: await icon(fa.FaLink, HEX.lt1), check: await icon(fa.FaCheck, HEX.lt1),
    key: await icon(fa.FaKey, HEX.accent2), bulb: await icon(fa.FaLightbulb, HEX.dk2), flag: await icon(fa.FaFlag, HEX.lt1),
    exch: await icon(fa.FaExchangeAlt, HEX.lt1), arrowR: await icon(fa.FaArrowRight, HEX.accent2), quote: await icon(fa.FaQuoteLeft, HEX.lt1),
    chalk: await icon(fa.FaChalkboardTeacher, HEX.accent3), golf: await icon(fa.FaGolfBall, HEX.dk2), clock: await icon(fa.FaClock, HEX.dk2),
  };

  // ---------- 1. Title ----------
  pres.addSection({ title: "도입" });
  let s = pres.addSlide({ masterName: "DARK", sectionTitle: "도입" });
  s.addImage({ data: I.chalk, x: 0.8, y: 1.0, w: 0.9, h: 0.9 });
  s.addText(`${M.title}  ${M.range}`, { placeholder: "title" });
  s.addText([
    { text: M.summary, options: { breakLine: true } },
    { text: `오늘의 목표: ${M.goal}`, options: { color: C.accent3, bold: true } },
  ], { placeholder: "body" });
  s.addNotes(`【인사·목표 제시】 \"숙제로 풀어 온 ${EX.length}문제를 오늘 하나씩 해설할 거예요. 오늘의 목표는 하나, ${M.goal}!\"\n【시간 배분 추천】 ${PARTS.map((p, i) => `${i + 1}차시 = ${i === 0 ? "채점 + 풀이 공식 + " : ""}Ex ${p[0].n}~${p[p.length - 1].n}`).join(", ")}. 한 문제당 약 8~9분(지문+보기·근거 3분 + 문법 2분 + 흐름·정답·오답 3~4분). 시간이 부족하면 문법 슬라이드는 위의 두 개만 짚고 넘어가세요.`);

  // ---------- 채점: 정답 한눈에 보기 ----------
  s = pres.addSlide({ masterName: "CONTENT", sectionTitle: "도입" });
  s.addText("채점부터! 정답 한눈에 보기", { placeholder: "title" });
  const gCols = EX.length <= 12 ? Math.min(6, Math.ceil(EX.length / Math.ceil(EX.length / 6))) : 7;
  const gStep = 12.1 / Math.max(gCols, 6), gW = gStep - 0.18;
  EX.forEach((e, i) => {
    const x = 0.6 + (i % gCols) * gStep, y = 1.45 + Math.floor(i / gCols) * 2.6;
    s.addShape(pres.shapes.ROUNDED_RECTANGLE, { x, y, w: gW, h: 2.35, rectRadius: 0.12, fill: { color: isImp(e) ? HEX.accent6 : HEX.lt2 }, line: { color: isImp(e) ? HEX.accent2 : HEX.lt2, width: 1 } });
    s.addText(`Ex ${e.n}`, { x, y: y + 0.15, w: gW, h: 0.45, fontSize: 18, bold: true, color: C.text2, align: "center", margin: 0, isTextBox: true });
    s.addText(NUM[e.ans - 1], { x, y: y + 0.6, w: gW, h: 1.1, fontSize: 60, bold: true, color: C.accent2, align: "center", valign: "middle", margin: 0, isTextBox: true });
    s.addText(isImp(e) ? "함의(밑줄)" : e.type, { x, y: y + 1.8, w: gW, h: 0.35, fontSize: 13, color: C.accent4, align: "center", margin: 0, isTextBox: true });
  });
  s.addText("틀린 문제 번호에 동그라미 → 해설 때 집중해서 듣기!", { x: 0.6, y: 6.62, w: 12.1, h: 0.35, fontSize: 14, bold: true, color: C.accent1, margin: 0, isTextBox: true });
  s.addNotes(`【채점 진행】 \"숙제 꺼내세요. 정답 불러 줄게요.\" 학생들이 스스로 채점하게 한 뒤, 문제별로 틀린 사람 손 들기 → 많이 틀린 번호를 칠판에 적어 두고 해설 때 시간을 더 쓰세요.\n【정답】 ${EX.map((e) => `${e.n}-${NUM[e.ans - 1]}`).join(" ")}\n【한 줄 핵심】 ${EX.map((e) => `${e.n} ${e.key}`).join(" / ")}`);

  // ---------- 2. 수업 순서 ----------
  s = pres.addSlide({ masterName: "CONTENT", sectionTitle: "도입" });
  s.addText("오늘 수업은 이렇게 진행해요", { placeholder: "title" });
  const plan = [
    ["1", "채점하기", "정답 한눈에 보기로 채점 → 틀린 문제 표시", "약 5분"],
    ["2", "풀이 공식 익히기", IN.planFormula || "풀이 3단계 · 신호어 · 오답 함정", "약 10분"],
    ...PARTS.slice(0, 2).map((p, i) => [String(i + 3), `Exercise ${p[0].n}–${p[p.length - 1].n}`, i === 0 ? "지문+보기 → 근거·문법 → 흐름 → 정답·오답" : "같은 순서로 해설 → 학생이 단서 먼저 말하기", `${i + 1}차시`]),
  ];
  plan.forEach((p, i) => {
    const x = 0.6 + i * 3.1;
    s.addShape(pres.shapes.ROUNDED_RECTANGLE, { x, y: 1.7, w: 2.85, h: 4.6, rectRadius: 0.15, fill: { color: i % 2 ? C.background1 : C.background2 }, line: { color: C.background2, width: 1 }, shadow: shadow() });
    s.addText(p[0], { shape: pres.shapes.OVAL, x: x + 0.3, y: 2.0, w: 0.9, h: 0.9, fill: { color: C.accent1 }, color: C.background1, fontSize: 32, bold: true, align: "center", valign: "middle", margin: 0 });
    s.addText(p[1], { x: x + 0.3, y: 3.15, w: 2.3, h: 0.9, fontSize: 20, bold: true, color: C.text2, margin: 0, valign: "top", isTextBox: true });
    s.addText(p[2], { x: x + 0.3, y: 4.1, w: 2.3, h: 1.3, fontSize: 15, color: C.text1, margin: 0, valign: "top", isTextBox: true });
    chip(s, p[3], x + 0.3, 5.6, 1.4, C.accent2, C.background1, 13);
  });
  s.addNotes("【진행 방식 안내】 \"숙제로 다 풀어 왔죠? 매 문제마다 ① 지문+보기 보면서 고른 답 확인 → ② 정답 근거 & 문법 포인트 → ③ 글의 흐름 정리 → ④ 정답과 오답 이유, 이 순서로 해설할게요.\"\n【팁】 지문+보기 슬라이드를 띄우자마자 \"몇 번 골랐어?\" 손가락으로 표시하게 하면 오답 분포를 바로 알 수 있어요. 많이 틀린 선택지는 정답·오답 슬라이드에서 더 오래 설명하세요.");

  // ---------- 3. 빈칸 3단계 ----------
  pres.addSection({ title: "풀이 공식" });
  s = pres.addSlide({ masterName: "CONTENT", sectionTitle: "풀이 공식" });
  s.addText(IN.steps.title, { placeholder: "title" });
  const steps = IN.steps.items.map((it, i) => [[I.search, I.link, I.check][i], `STEP ${i + 1}`, it[0], it[1]]);
  steps.forEach((st, i) => {
    const x = 0.6 + i * 4.15;
    s.addShape(pres.shapes.ROUNDED_RECTANGLE, { x, y: 1.6, w: 3.85, h: 4.9, rectRadius: 0.15, fill: { color: C.background2 }, line: { color: C.background2 } });
    s.addShape(pres.shapes.OVAL, { x: x + 0.35, y: 1.95, w: 1.0, h: 1.0, fill: { color: C.accent1 }, line: { color: C.accent1 } });
    s.addImage({ data: st[0], x: x + 0.6, y: 2.2, w: 0.5, h: 0.5 });
    s.addText(st[1], { x: x + 1.55, y: 2.05, w: 2.0, h: 0.4, fontSize: 14, bold: true, color: C.accent2, margin: 0, isTextBox: true });
    s.addText(st[2], { x: x + 1.55, y: 2.45, w: 2.2, h: 0.5, fontSize: 20, bold: true, color: C.text2, margin: 0, isTextBox: true });
    s.addText(st[3], { x: x + 0.35, y: 3.3, w: 3.2, h: 2.9, fontSize: 17, color: C.text1, margin: 0, valign: "top", paraSpaceAfter: 6, isTextBox: true });
    if (i < 2) s.addImage({ data: I.arrowR, x: x + 3.88, y: 3.85, w: 0.25, h: 0.25 });
  });
  s.addNotes(IN.steps.notes || "");

  // ---------- 4. 신호어 ----------
  s = pres.addSlide({ masterName: "CONTENT", sectionTitle: "풀이 공식" });
  s.addText("이런 단어가 보이면 멈춰! 신호어 4종", { placeholder: "title" });
  const sig = IN.signals.map((g, i) => [[I.exch, I.flag, I.search, I.quote][i], ...g]);
  sig.forEach((g, i) => {
    const x = 0.6 + (i % 2) * 6.15, y = 1.55 + Math.floor(i / 2) * 2.7;
    s.addShape(pres.shapes.ROUNDED_RECTANGLE, { x, y, w: 5.95, h: 2.45, rectRadius: 0.12, fill: { color: C.background1 }, line: { color: C.background2, width: 1.5 }, shadow: shadow() });
    s.addShape(pres.shapes.OVAL, { x: x + 0.3, y: y + 0.3, w: 0.8, h: 0.8, fill: { color: C.accent1 }, line: { color: C.accent1 } });
    s.addImage({ data: g[0], x: x + 0.5, y: y + 0.5, w: 0.4, h: 0.4 });
    s.addText(g[1], { x: x + 1.3, y: y + 0.3, w: 2.5, h: 0.45, fontSize: 22, bold: true, color: C.text2, margin: 0, isTextBox: true });
    chip(s, g[4], x + 4.4, y + 0.35, 1.25, C.background2, C.text2, 12);
    s.addText(g[2], { x: x + 1.3, y: y + 0.8, w: 4.4, h: 0.4, fontSize: 14, italic: true, color: C.accent1, margin: 0, isTextBox: true });
    s.addText(g[3], { x: x + 1.3, y: y + 1.3, w: 4.4, h: 0.95, fontSize: 15, color: C.text1, margin: 0, valign: "top", isTextBox: true });
  });
  s.addNotes("【설명 스크립트】 \"글을 읽다가 이 네 종류 단어가 나오면 꼭 동그라미 치세요. 답이 바로 근처에 있어요.\"\n【오른쪽 위 칩】 오늘 문제 중 그 신호어가 결정적이었던 Exercise 번호예요. 해당 문제를 풀 때 \"아까 배운 반전 신호어 기억나?\" 하고 다시 연결해 주세요.");

  // ---------- 5. 오답 함정 ----------
  s = pres.addSlide({ masterName: "CONTENT", sectionTitle: "풀이 공식" });
  s.addText("오답은 4가지 얼굴로 나타난다", { placeholder: "title" });
  const traps = IN.traps;
  traps.forEach((t, i) => {
    const y = 1.55 + i * 1.33;
    s.addShape(pres.shapes.ROUNDED_RECTANGLE, { x: 0.6, y, w: 12.1, h: 1.15, rectRadius: 0.12, fill: { color: i % 2 ? C.background1 : C.background2 }, line: { color: C.background2, width: 1 } });
    s.addText(t[0], { shape: pres.shapes.ROUNDED_RECTANGLE, rectRadius: 0.15, x: 0.9, y: y + 0.3, w: 1.9, h: 0.55, fill: { color: TAG[t[0]].fill }, color: TAG[t[0]].color, fontSize: 18, bold: true, align: "center", valign: "middle", margin: 0 });
    s.addText(t[1], { x: 3.1, y: y + 0.2, w: 4.4, h: 0.75, fontSize: 18, bold: true, color: C.text2, valign: "middle", margin: 0, isTextBox: true });
    s.addText("예) " + t[2], { x: 7.6, y: y + 0.2, w: 4.9, h: 0.75, fontSize: 15, color: C.text1, valign: "middle", margin: 0, isTextBox: true });
  });
  s.addNotes("【설명 스크립트】 \"오답에도 패턴이 있어요. 이 4가지만 알면 5개 중 2~3개는 바로 지울 수 있어요.\"\n【활용 팁】 뒤에 나오는 '정답 & 오답 체크' 슬라이드에서 각 선택지 오른쪽에 이 4가지 라벨이 붙어 있어요. 학생에게 \"이 선택지는 어떤 함정일까?\"를 먼저 물어보고 라벨을 확인시키면 참여형 수업이 됩니다.\n【색 기억법】 빨강 = 정답, 남색 = 반대, 연두 = 언급 없음, 노랑 = 소재 함정, 파랑 = 범위 오류.");

  // ---------- 6. 함의 추론 ----------
  const IMP = IN.implication;
  if (IMP) {
  s = pres.addSlide({ masterName: "CONTENT", sectionTitle: "풀이 공식" });
  s.addText("함의(밑줄) 추론: 비유를 '주제'로 번역하기", { placeholder: "title" });
  const hs = [["1", "밑줄은 비유다", `문자 그대로 해석하면 오답! ${IMP.literal}`], ["2", "주제문 찾기", "밑줄 앞뒤 1~2문장에 설명이 있다\n(That's why / This means 등)"], ["3", "비유 ↔ 주제 연결", "밑줄 속 단어를 글의 핵심 개념으로 바꿔 넣고, 같은 뜻의 선택지 고르기"]];
  hs.forEach((h, i) => {
    const y = 1.6 + i * 1.75;
    s.addText(h[0], { shape: pres.shapes.OVAL, x: 0.6, y, w: 0.75, h: 0.75, fill: { color: C.accent1 }, color: C.background1, fontSize: 24, bold: true, align: "center", valign: "middle", margin: 0 });
    s.addText(h[1], { x: 1.6, y: y - 0.02, w: 4.6, h: 0.45, fontSize: 20, bold: true, color: C.text2, margin: 0, isTextBox: true });
    s.addText(h[2], { x: 1.6, y: y + 0.5, w: 4.6, h: 1.05, fontSize: 15, color: C.text1, margin: 0, valign: "top", isTextBox: true });
  });
  s.addShape(pres.shapes.ROUNDED_RECTANGLE, { x: 6.7, y: 1.6, w: 6.0, h: 5.0, rectRadius: 0.15, fill: { color: C.background2 }, line: { color: C.background2 } });
  s.addText(`예시 · ${IMP.exRef}`, { x: 7.0, y: 1.85, w: 3, h: 0.4, fontSize: 14, bold: true, color: C.accent2, margin: 0, isTextBox: true });
  s.addText(`"${IMP.quote}"`, { x: 7.0, y: 2.3, w: 5.4, h: 0.5, fontSize: 18, italic: true, bold: true, color: C.text2, margin: 0, isTextBox: true });
  IMP.pairs.forEach((r, i) => {
    const y = 3.15 + i * 1.15;
    s.addText(r[0], { shape: pres.shapes.ROUNDED_RECTANGLE, rectRadius: 0.12, x: 7.0, y, w: 2.3, h: 0.8, fill: { color: C.background1 }, color: C.text2, fontSize: 17, bold: true, align: "center", valign: "middle", margin: 0 });
    s.addImage({ data: I.arrowR, x: 9.5, y: y + 0.25, w: 0.3, h: 0.3 });
    s.addText(r[1], { shape: pres.shapes.ROUNDED_RECTANGLE, rectRadius: 0.12, x: 10.0, y, w: 2.4, h: 0.8, fill: { color: C.accent1 }, color: C.background1, fontSize: 17, bold: true, align: "center", valign: "middle", margin: 0 });
  });
  s.addText(`= ${IMP.conclusion}`, { x: 7.0, y: 5.6, w: 5.4, h: 0.7, fontSize: 16, bold: true, color: C.accent2, margin: 0, valign: "middle", isTextBox: true });
  s.addNotes(`【설명 스크립트】 \"밑줄 문제는 '암호 풀기'예요. 밑줄은 비유라서 단어 하나하나를 글의 핵심 개념으로 바꿔 줘야 해요.\"\n【칠판 활동】 오른쪽 예시처럼 '밑줄 단어 → 글의 개념'을 표로 만들어 보여 주세요. ${EX.filter(isImp).map((e) => "Ex " + e.n).join("과 ")}가 이 유형입니다.`);
  }

  // ---------- Exercises ----------
  for (const e of EX) {
    const pi = partOf(e), sec = partName(pi);
    if (PARTS[pi][0] === e) {
      pres.addSection({ title: sec });
      const d = pres.addSlide({ masterName: "DARK", sectionTitle: sec });
      d.addText(`Part ${pi + 1}  ·  Exercise ${PARTS[pi][0].n}–${PARTS[pi][PARTS[pi].length - 1].n}`, { placeholder: "title" });
      d.addText(PARTS[pi].map((x) => x.topic || x.title).join(" · "), { placeholder: "body" });
      d.addNotes(pi === 0 ? "【본론 시작】 \"이제 한 문제씩 해설할게요. 지문+보기를 보면서 내가 고른 답과 이유를 떠올려 보세요.\"" : "【다음 차시 시작】 지난 시간 풀이 3단계와 신호어 4종을 1분 동안 복습하고 시작하세요.");
    }
    const kind = kindOf(e);

    // --- Passage: 지문 전문
    const P = PS[e.n];
    const ansText = e.opts[e.ans - 1][0];
    // split "{B}" and "__u__" into runs
    const runs = (txt, base, fillBlank) => {
      const out = [];
      txt.split(/(\{B\}|__[^_]+__)/).forEach((part) => {
        if (!part) return;
        if (part === "{B}") out.push({ text: fillBlank ? ansText : "____________", options: { ...base, bold: true, color: HEX.accent2, underline: fillBlank ? undefined : undefined } });
        else if (part.startsWith("__")) out.push({ text: part.slice(2, -2), options: { ...base, underline: { style: "sng" }, bold: true } });
        else out.push({ text: part, options: { ...base } });
      });
      return out;
    };
    const totalChars = P.s.reduce((a, x) => a + x[0].length, 0);
    const passH = (sz) => 5.9 * (totalChars / 1000) * (sz / 24) ** 2;
    const lineH = (sz) => (sz * 1.2 * 1.15) / 72;
    const showOpts = !e.hideOptsOnProblem;
    const extraTxt = (e.given || "") + (e.summary || "");
    const optLines = (sz) => (showOpts ? e.opts.reduce((a, o) => a + Math.ceil((o[0].length + 3) / (11.6 * 72 / (sz * 0.52))), 0) : 0) + Math.ceil(extraTxt.length / (11.6 * 72 / (sz * 0.52))) + (extraTxt ? 1 : 0);
    // (A)/(B) blanks in summary sentences: color them
    const abRuns = (txt, base) => txt.split(/(\(A\)|\(B\))/).filter(Boolean).map((t) => ({ text: t, options: { ...base, ...(/^\([AB]\)$/.test(t) ? { bold: true, color: HEX.accent2 } : {}) } }));

    // --- Problem slide: 지문 + 보기 (시험지처럼)
    s = pres.addSlide({ masterName: "CONTENT", sectionTitle: sec });
    const prompt = e.prompt || (isImp(e) ? "밑줄 친 부분의 의미로 가장 적절한 것은?" : "다음 빈칸에 들어갈 말로 가장 적절한 것은?");
    s.addText([{ text: `Ex ${e.n}  `, options: { color: C.accent2 } }, { text: prompt, options: { fontSize: 24 } }], { placeholder: "title" });
    chip(s, kind, 10.6, 0.6, 2.1, C.background2, C.text2, 12);
    // e.qFont lets you force a size if a long passage overflows in PowerPoint
    let qs = e.qFont || 22;
    while (!e.qFont && qs > 13 && passH(qs) + lineH(qs) * (optLines(qs) + 1) + 0.35 > (extraTxt ? 5.15 : 4.9)) qs -= 0.5;
    const qr = [];
    if (e.given) {
      qr.push({ text: "[주어진 문장]  ", options: { fontSize: qs, bold: true, color: HEX.accent2 } });
      qr.push({ text: e.given, options: { fontSize: qs, bold: true, color: HEX.dk2, breakLine: true } });
      qr.push({ text: " ", options: { fontSize: 6, breakLine: true } });
    }
    P.s.forEach((x, i) => {
      qr.push(...runs(x[0], { fontSize: qs, color: HEX.dk1 }, false));
      if (i < P.s.length - 1) qr.push({ text: " ", options: { fontSize: qs } });
    });
    qr[qr.length - 1].options.breakLine = true;
    if (P.foot) qr.push({ text: P.foot, options: { fontSize: 11, italic: true, color: HEX.accent4, align: "right", breakLine: true, paraSpaceBefore: 2 } });
    if (e.summary) {
      qr.push({ text: "↓  ", options: { fontSize: qs, bold: true, color: HEX.accent1, paraSpaceBefore: 8 } });
      qr.push(...abRuns(e.summary, { fontSize: qs, color: HEX.dk2, bold: false }));
      qr[qr.length - 1].options.breakLine = showOpts;
    }
    if (showOpts) e.opts.forEach((o, i) => {
      qr.push({ text: `${NUM[i]}  ${o[0]}`, options: { fontSize: qs, color: HEX.dk2, paraSpaceBefore: i === 0 ? 10 : 2, breakLine: i < 4 } });
    });
    if (!showOpts) delete qr[qr.length - 1].options.breakLine;
    s.addShape(pres.shapes.ROUNDED_RECTANGLE, { x: 0.6, y: 1.35, w: 12.1, h: 5.55, rectRadius: 0.1, fill: { color: C.background1 }, line: { color: C.background2, width: 1.5 } });
    s.addText(qr, { x: 0.85, y: 1.5, w: 11.6, h: 5.3, margin: 0, valign: "top", lineSpacingMultiple: 1.15, isTextBox: true });
    s.addNotes(`【이 슬라이드 사용법】 숙제로 풀어 온 문제를 그대로 띄운 화면입니다. \"몇 번 골랐어?\" 손가락으로 표시하게 해서 답 분포를 확인하고, 정답은 아직 말하지 마세요. 많이 고른 오답이 있으면 정답·오답 슬라이드에서 그 선택지를 더 오래 설명하세요.\n【한 줄 요약】 ${e.find}`);

    // --- 정답 근거 찾기 (형광)
    s = pres.addSlide({ masterName: "CONTENT", sectionTitle: sec });
    s.addText([{ text: `Ex ${e.n}  `, options: { color: C.accent2 } }, { text: "정답 근거 & 문법 포인트" }], { placeholder: "title" });
    chip(s, `${kind} · 근거`, 10.6, 0.6, 2.1, C.background2, C.text2, 12);
    const pSize = Math.min(e.vocab && e.vocab.length ? 21 : 22, Math.floor(24 * Math.sqrt((e.vocab && e.vocab.length ? 3.05 : 3.7) * 1000 / (5.9 * totalChars))));
    const pr = [];
    const G = GR[e.n] || [];
    const seenG = new Set();
    P.s.forEach((x, i) => {
      const base = { fontSize: pSize, color: HEX.dk1 };
      if (x[2]) base.highlight = HEX.accent3;
      pr.push({ text: `(${i + 1}) `, options: { fontSize: pSize - 3, bold: true, color: HEX.accent1 } });
      runs(x[0], base, false).forEach((r) => {
        if (r.options.bold || r.options.underline) { pr.push(r); return; }
        // split plain runs by grammar phrases
        let parts = [{ t: r.text, g: -1 }];
        G.forEach((g, gi) => g[0].forEach((ph) => {
          parts = parts.flatMap((pt) => {
            if (pt.g !== -1 || !pt.t.includes(ph)) return [pt];
            const k = pt.t.indexOf(ph);
            return [{ t: pt.t.slice(0, k), g: -1 }, { t: ph, g: gi }, { t: pt.t.slice(k + ph.length), g: -1 }].filter((z) => z.t);
          });
        }));
        parts.forEach((pt) => {
          if (pt.g === -1) { pr.push({ text: pt.t, options: { ...r.options } }); return; }
          pr.push({ text: pt.t, options: { ...r.options, bold: true, color: HEX.accent5 } });
        });
      });
      if (i < P.s.length - 1) pr.push({ text: " ", options: { fontSize: pSize } });
    });
    const VO = e.vocab || [];
    // vocab words: green dotted underline in passage, meanings in a bottom box
    VO.forEach(([w]) => {
      const re = new RegExp("\\b" + w.replace(/[-.*+?^${}()|[\]\\]/g, "\\$&") + "\\b");
      for (let k = 0; k < pr.length; k++) {
        const m = pr[k].text.match(re);
        if (!m || pr[k].vw) continue;
        const o = pr[k].options, t = pr[k].text, end = m.index + w.length;
        const wordColor = o.color === HEX.accent5 ? HEX.accent5 : HEX.accent1;
        pr.splice(k, 1,
          ...(m.index ? [{ text: t.slice(0, m.index), options: { ...o } }] : []),
          { text: t.slice(m.index, end), options: { ...o, color: wordColor, underline: { style: "dotted", color: HEX.accent1 } }, vw: true },
          ...(t.slice(end) ? [{ text: t.slice(end), options: { ...o } }] : []));
        break;
      }
    });
    pr.forEach((r) => delete r.vw);
    const boxH = VO.length ? 4.35 : 5.2;
    s.addShape(pres.shapes.ROUNDED_RECTANGLE, { x: 0.6, y: 1.35, w: 12.1, h: boxH, rectRadius: 0.1, fill: { color: C.background1 }, line: { color: C.background2, width: 1.5 } });
    s.addText(pr, { x: 0.85, y: 1.5, w: 11.6, h: boxH - 0.25, margin: 0, valign: "top", lineSpacingMultiple: 1.2, fit: "shrink", isTextBox: true });
    if (VO.length) {
      const vr = [{ text: " 어휘 ", options: { bold: true, color: HEX.lt1, highlight: HEX.accent1 } }, { text: "   ", options: {} }];
      VO.forEach(([w, ko], vi) => {
        vr.push({ text: w + " ", options: { bold: true, color: HEX.accent1 } });
        vr.push({ text: ko + (vi < VO.length - 1 ? "   ·   " : ""), options: { color: HEX.dk1 } });
      });
      s.addShape(pres.shapes.ROUNDED_RECTANGLE, { x: 0.6, y: 5.8, w: 12.1, h: 0.8, rectRadius: 0.1, fill: { color: "EAF5EF" }, line: { color: "CFE6D9", width: 1 } });
      s.addText(vr, { x: 0.8, y: 5.85, w: 11.7, h: 0.7, fontSize: 14, valign: "middle", margin: 0, lineSpacingMultiple: 1.1, fit: "shrink", isTextBox: true });
    }
    s.addText([
      { text: "■ ", options: { color: HEX.accent3 } }, { text: "형광 = 정답 근거 문장     ", options: {} },
      { text: "파란 굵은 글씨 ", options: { color: HEX.accent5, bold: true } }, { text: "= 문법·내신 포인트     ", options: {} },
      ...(e.vocab && e.vocab.length ? [{ text: "초록 점선 단어 ", options: { color: HEX.accent1, bold: true } }, { text: "= 하단 어휘     ", options: {} }] : []),
      { text: "(1) (2) (3) ", options: { color: HEX.accent1, bold: true } }, { text: "= 문장 번호", options: {} },
    ], { x: 0.6, y: 6.65, w: 12.1, h: 0.3, fontSize: 11, color: C.accent4, margin: 0, isTextBox: true });
    const keyNums = P.s.map((x, i) => (x[2] ? i + 1 : 0)).filter(Boolean).join(", ");
    const trans = P.s.map((x, i) => `(${i + 1})${x[2] ? " ★" : ""} ${x[1]}`).join("\n");
    s.addNotes(`【이 슬라이드 사용법】 문장 번호 순서대로 읽으며 해설하고, 형광 문장(${keyNums}번)에서 멈춰 \"여기가 정답 근거!\"라고 강조하세요. 파란 굵은 글씨는 문법·내신 포인트로, 다음 슬라이드에서 정리합니다.\n\n${e.notes}\n\n【문장별 해석 · 선생님 참고용 (★ = 정답 근거)】\n${trans}`);

    // --- 문법·내신 포인트 정리
    s = pres.addSlide({ masterName: "CONTENT", sectionTitle: sec });
    s.addText([{ text: `Ex ${e.n}  `, options: { color: C.accent2 } }, { text: "문법·내신 포인트" }], { placeholder: "title" });
    chip(s, `${kind} · 문법`, 10.6, 0.6, 2.1, C.background2, C.text2, 12);
    const gh = Math.min(1.15, (5.5 - 0.12 * (G.length - 1)) / G.length);
    G.forEach((g, gi) => {
      const y = 1.4 + gi * (gh + 0.12);
      s.addShape(pres.shapes.ROUNDED_RECTANGLE, { x: 0.6, y, w: 12.1, h: gh, rectRadius: 0.1, fill: { color: gi % 2 ? HEX.lt1 : "EAF3F7" }, line: { color: "D3E5EE", width: 1 } });
      s.addText(g[0].join("  …  "), { x: 0.9, y: y + 0.1, w: 5.8, h: gh - 0.2, fontSize: 15, bold: true, italic: true, color: C.accent5, valign: "middle", margin: 0, isTextBox: true });
      s.addText([
        { text: g[1], options: { bold: true, color: HEX.dk2, fontSize: 17, breakLine: true } },
        { text: g[2], options: { color: HEX.dk1, fontSize: 14 } },
      ], { x: 7.0, y: y + 0.08, w: 5.5, h: gh - 0.16, valign: "middle", margin: 0, paraSpaceAfter: 2, isTextBox: true });
    });
    s.addNotes(`【이 슬라이드 사용법】 앞 슬라이드의 파란 굵은 글씨를 위에서부터 하나씩 짚으며 설명하세요. 내신 어법 문제는 주로 '수일치 · 병렬 · 관계사 · 분사 · 도치'에서 나옵니다. \"이 자리에 다른 형태가 오면 왜 틀릴까?\"를 물어보면 좋아요.\n\n${G.map((g) => `• ${g[1]}: ${g[2]}`).join("\n")}`);

    // --- Slide A: 흐름 잡기
    s = pres.addSlide({ masterName: "CONTENT", sectionTitle: sec });
    s.addText([{ text: `Ex ${e.n}  `, options: { color: C.accent2 } }, { text: e.title }], { placeholder: "title" });
    chip(s, `${kind} · 흐름 잡기`, 10.6, 0.6, 2.1, C.background2, C.text2, 12);
    // left: blank sentence card
    s.addShape(pres.shapes.ROUNDED_RECTANGLE, { x: 0.6, y: 1.45, w: 5.7, h: 2.65, rectRadius: 0.12, fill: { color: C.background2 }, line: { color: C.background2 } });
    s.addText(e.step1Label || (isImp(e) ? "STEP 1 · 밑줄 문장" : (e.type === "빈칸" ? "STEP 1 · 빈칸 문장 먼저" : "STEP 1 · 핵심 문장")), { x: 0.9, y: 1.6, w: 5.1, h: 0.35, fontSize: 13, bold: true, color: C.accent1, margin: 0, isTextBox: true });
    const longB = e.blank.length > 110;
    s.addText(e.blank, { x: 0.9, y: 2.0, w: 5.1, h: longB ? 0.95 : 0.85, fontSize: longB ? 13 : 16, bold: true, italic: true, color: C.text2, margin: 0, valign: "top", fit: "shrink", isTextBox: true });
    s.addText(e.blankKo, { x: 0.9, y: longB ? 2.97 : 2.85, w: 5.1, h: longB ? 0.5 : 0.55, fontSize: longB ? 11 : 14, color: C.text1, margin: 0, valign: "top", fit: "shrink", isTextBox: true });
    s.addText([{ text: "찾을 것  ", options: { bold: true, color: C.accent2 } }, { text: e.find, options: { bold: true, color: C.text2 } }], { x: 0.9, y: 3.5, w: 5.1, h: 0.45, fontSize: 15, margin: 0, isTextBox: true });
    // left: key clue card
    s.addShape(pres.shapes.ROUNDED_RECTANGLE, { x: 0.6, y: 4.3, w: 5.7, h: 2.55, rectRadius: 0.12, fill: { color: C.background1 }, line: { color: C.accent2, width: 1.5 } });
    s.addImage({ data: I.key, x: 0.9, y: 4.48, w: 0.3, h: 0.3 });
    s.addText("STEP 2 · 결정적 단서", { x: 1.3, y: 4.45, w: 4.5, h: 0.35, fontSize: 13, bold: true, color: C.accent2, margin: 0, isTextBox: true });
    s.addText(e.clue, { x: 0.9, y: 4.9, w: 5.1, h: 1.1, fontSize: 14, italic: true, color: C.text2, margin: 0, valign: "top", isTextBox: true });
    s.addText(e.clueKo, { x: 0.9, y: 6.0, w: 5.1, h: 0.75, fontSize: 13, color: C.accent4, margin: 0, valign: "top", isTextBox: true });
    // right: flow
    s.addText("글의 흐름", { x: 6.8, y: 1.45, w: 3, h: 0.35, fontSize: 13, bold: true, color: C.accent1, margin: 0, isTextBox: true });
    const fy0 = 1.9, fh = 1.15, fg = 0.13;
    s.addShape(pres.shapes.LINE, { x: 7.15, y: fy0 + 0.35, w: 0, h: (fh + fg) * 3, line: { color: C.background2, width: 3 } });
    e.flow.forEach((f, i) => {
      const y = fy0 + i * (fh + fg);
      s.addText(String(i + 1), { shape: pres.shapes.OVAL, x: 6.85, y: y + 0.05, w: 0.6, h: 0.6, fill: { color: i === e.flow.length - 1 ? C.accent2 : C.accent1 }, color: C.background1, fontSize: 18, bold: true, align: "center", valign: "middle", margin: 0 });
      s.addText(f[0], { x: 7.7, y: y + 0.05, w: 4.9, h: 0.35, fontSize: 14, bold: true, color: C.accent1, margin: 0, isTextBox: true });
      s.addText(f[1], { x: 7.7, y: y + 0.42, w: 5.0, h: fh - 0.42, fontSize: 14, color: C.text1, margin: 0, valign: "top", isTextBox: true });
    });
    s.addNotes(`【이 슬라이드 사용법】 근거 찾기를 마친 뒤 \"그래서 이 글은 한마디로 뭐야?\" 하고 정리할 때 띄우세요. 왼쪽 위(빈칸 문장) → 오른쪽(글의 흐름 1~4) → 왼쪽 아래(결정적 단서) 순서로 설명하면 됩니다. 정답은 다음 슬라이드에서 공개!\n\n${e.notes}`);

    // --- Slide B: 정답 & 오답
    s = pres.addSlide({ masterName: "CONTENT", sectionTitle: sec });
    s.addText([{ text: `Ex ${e.n}  `, options: { color: C.accent2 } }, { text: "정답 & 오답 체크" }], { placeholder: "title" });
    chip(s, `${kind} · STEP 3`, 10.6, 0.6, 2.1, C.background2, C.text2, 12);
    s.addShape(pres.shapes.ROUNDED_RECTANGLE, { x: 0.6, y: 1.45, w: 4.1, h: 5.45, rectRadius: 0.15, fill: { color: C.text2 }, line: { color: C.text2 } });
    s.addText("정답", { x: 0.95, y: 1.7, w: 3.4, h: 0.4, fontSize: 16, bold: true, color: C.accent3, margin: 0, isTextBox: true });
    s.addText(NUM[e.ans - 1], { x: 0.95, y: 2.1, w: 3.4, h: 1.3, fontSize: 72, bold: true, color: C.background1, margin: 0, isTextBox: true });
    const a = e.opts[e.ans - 1];
    s.addText(a[0], { x: 0.95, y: 3.65, w: 3.45, h: 1.4, fontSize: 17, bold: true, italic: true, color: C.background1, margin: 0, valign: "top", isTextBox: true });
    s.addText(a[1], { x: 0.95, y: 5.1, w: 3.45, h: 1.6, fontSize: 14, color: C.background2, margin: 0, valign: "top", isTextBox: true });
    e.opts.forEach((o, i) => {
      const y = 1.45 + i * 1.11, ok = i === e.ans - 1;
      s.addShape(pres.shapes.ROUNDED_RECTANGLE, { x: 5.0, y, w: 7.7, h: 0.99, rectRadius: 0.1, fill: { color: ok ? C.accent6 : C.background1 }, line: { color: ok ? C.accent2 : C.background2, width: ok ? 2 : 1 } });
      s.addText(NUM[i], { x: 5.2, y: y + 0.12, w: 0.45, h: 0.45, fontSize: 20, bold: true, color: ok ? C.accent2 : C.accent4, margin: 0, isTextBox: true });
      s.addText(o[0], { x: 5.75, y: y + 0.08, w: 5.4, h: 0.45, fontSize: 14, bold: ok, color: C.text2, margin: 0, valign: "middle", fit: "shrink", isTextBox: true });
      s.addText((ok ? "✔ " : o[2] === "적절" ? "○ " : "✘ ") + o[1], { x: 5.75, y: y + 0.52, w: 5.4, h: 0.4, fontSize: 12, color: ok ? C.accent2 : C.accent4, margin: 0, valign: "middle", isTextBox: true });
      const t = TAG[o[2]] || { fill: C.background2, color: C.text2 };
      s.addText(o[2], { shape: pres.shapes.ROUNDED_RECTANGLE, rectRadius: 0.15, x: 11.3, y: y + 0.3, w: 1.2, h: 0.4, fill: { color: t.fill }, color: t.color, fontSize: 12, bold: true, align: "center", valign: "middle", margin: 0 });
    });
    const wrong = e.opts.map((o, i) => `${NUM[i]} ${o[2]}: ${o[1]}`).join("\n");
    s.addNotes(`【이 슬라이드 사용법】 정답을 바로 말하지 말고 먼저 \"몇 번 골랐어?\" 손 들기 → 오답 하나씩 \"이건 왜 틀렸을까?\" 질문 → 마지막에 정답 공개.\n\n【선택지별 설명】\n${wrong}\n\n【마무리 멘트】 \"정답 ${NUM[e.ans - 1]}은 지문의 결정적 단서를 다른 말로 바꾼 거예요. 빈칸 답은 늘 지문 안에 있다!\"`);
  }

  pres.addSection({ title: "정리" });
  // ---------- 마무리 ----------
  s = pres.addSlide({ masterName: "DARK", sectionTitle: "정리" });
  s.addImage({ data: I.chalk, x: 0.8, y: 1.0, w: 0.9, h: 0.9 });
  s.addText(M.closing, { placeholder: "title" });
  s.addText([
    { text: IN.steps.items.map((it, i) => `${NUM[i]} ${it[0]}`).join("   "), options: { breakLine: true } },
    { text: `복습 과제: ${M.homework}`, options: { color: C.accent3, bold: true } },
  ], { placeholder: "body" });
  s.addNotes(`【마무리 멘트】 \"오늘 ${EX.length}문제를 같은 방법으로 풀었어요. 다음 시간에도 ${IN.steps.items.map((it) => it[0]).join(" → ")}!\"\n【과제 안내】 ${M.homework}. 다음 시간 시작 5분 동안 확인하세요.`);

  await pres.writeFile({ fileName: OUT_PATH });
  console.log("written", OUT_PATH);
})();
