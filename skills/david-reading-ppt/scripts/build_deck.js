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
const GH = "A9DDF3"; // grammar highlighter (light blue)
const hookOf = (e) => e.hook || ((e.notes || "").match(/【도입 질문】\s*([^\n]+)/) || [])[1] || "";
const MISSION = { "요약문": "(A)와 (B)의 근거가 되는 문장 번호를 찾아라!", "빈칸": "빈칸의 근거가 되는 문장 번호를 찾아라!", "함의": "밑줄의 뜻을 설명해 주는 문장 번호를 찾아라!", "삽입": "주어진 문장의 지시어가 가리키는 곳을 찾아라!", "어휘": "글의 흐름과 반대 방향인 낱말을 찾아라!" };

function chip(slide, text, x, y, w, fill, color, size = 12) {
  slide.addText(text, { shape: pres.shapes.ROUNDED_RECTANGLE, rectRadius: 0.15, x, y, w, h: 0.36, fill: { color: fill }, color, fontSize: size, bold: true, align: "center", valign: "middle", margin: 0 });
}

(async () => {
  const I = {
    bulbLight: await icon(fa.FaLightbulb, HEX.lt1), search: await icon(fa.FaSearch, HEX.lt1), searchDark: await icon(fa.FaSearch, HEX.accent2), link: await icon(fa.FaLink, HEX.lt1), check: await icon(fa.FaCheck, HEX.lt1),
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
    ["2", "풀이 공식 익히기", IN.planFormula || "풀이 3단계 · Signal", "약 10분"],
    ...PARTS.slice(0, 2).map((p, i) => [String(i + 3), `Exercise ${p[0].n}–${p[p.length - 1].n}`, i === 0 ? "Hook → 단어 → 어법 워밍업 → 근거 지문 해설 → 흐름 정리" : "같은 순서 + 마지막에 복습 미니테스트", `${i + 1}차시`]),
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

  // ---------- 4. Signal ----------
  s = pres.addSlide({ masterName: "CONTENT", sectionTitle: "풀이 공식" });
  s.addText("Signal: 이 단어가 보이면 멈춰!", { placeholder: "title" });
  const SIG = IN.signals;
  const sCols = 4, sRows = Math.ceil(SIG.length / sCols), sW = 2.9, sH = (5.5 - 0.2 * (sRows - 1)) / sRows;
  SIG.forEach((g, i) => {
    const x = 0.6 + (i % sCols) * (sW + 0.167), y = 1.4 + Math.floor(i / sCols) * (sH + 0.2);
    s.addShape(pres.shapes.ROUNDED_RECTANGLE, { x, y, w: sW, h: sH, rectRadius: 0.12, fill: { color: i % 2 ? C.background1 : C.background2 }, line: { color: C.background2, width: 1.5 } });
    s.addText(g[0], { x: x + 0.2, y: y + 0.15, w: sW - 1.3, h: 0.45, fontSize: 20, bold: true, color: C.text2, margin: 0, isTextBox: true });
    if (g[3]) s.addText(g[3], { x: x + sW - 1.15, y: y + 0.2, w: 1.0, h: 0.32, fontSize: 10, bold: true, color: C.text2, fill: { color: HEX.lt1 }, align: "center", valign: "middle", margin: 0, isTextBox: true });
    s.addText(g[1], { x: x + 0.2, y: y + 0.65, w: sW - 0.4, h: 1.05, fontSize: 13, italic: true, bold: true, color: C.accent1, margin: 0, valign: "top", fit: "shrink", isTextBox: true });
    s.addText(g[2], { x: x + 0.2, y: y + 1.72, w: sW - 0.4, h: sH - 1.82, fontSize: 13, color: C.text1, margin: 0, valign: "top", fit: "shrink", isTextBox: true });
  });
  s.addNotes(IN.signalNotes || "【설명 스크립트】 \"글을 읽다가 이 단어들이 나오면 꼭 동그라미! 답이 바로 근처에 있어요.\"\n【오른쪽 위 칩】 오늘 문제 중 그 signal이 결정적이었던 Exercise 번호예요. 해당 문제에서 \"아까 배운 signal 기억나?\" 하고 다시 연결해 주세요.");

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
      d.addNotes(pi === 0 ? "【본론 시작】 \"이제 한 문제씩 해설할게요. 지문+보기를 보면서 내가 고른 답과 이유를 떠올려 보세요.\"" : "【다음 차시 시작】 지난 시간 풀이 3단계와 Signal을 1분 동안 복습하고 시작하세요.");
    }
    const kind = kindOf(e);

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
    // (A)/(B) blanks in summary sentences: color them
    const abRuns = (txt, base) => txt.split(/(\(A\)|\(B\))/).filter(Boolean).map((t) => ({ text: t, options: { ...base, ...(/^\([AB]\)$/.test(t) ? { bold: true, color: HEX.accent2 } : {}) } }));

    // --- 1) Hook
    const hook = hookOf(e);
    if (hook) {
      s = pres.addSlide({ masterName: "CONTENT", sectionTitle: sec });
      s.addText([{ text: `Ex ${e.n}  `, options: { color: C.accent2 } }, { text: e.title }], { placeholder: "title" });
      chip(s, `${kind} · Hook`, 10.6, 0.6, 2.1, C.background2, C.text2, 12);
      s.addShape(pres.shapes.ROUNDED_RECTANGLE, { x: 1.4, y: 2.0, w: 10.5, h: 3.6, rectRadius: 0.25, fill: { color: HEX.lt2 }, line: { color: HEX.lt2 } });
      s.addShape(pres.shapes.OVAL, { x: 1.9, y: 2.45, w: 1.1, h: 1.1, fill: { color: C.accent1 }, line: { color: C.accent1 } });
      s.addImage({ data: I.bulbLight, x: 2.17, y: 2.72, w: 0.56, h: 0.56 });
      s.addText("생각해 볼까?", { x: 3.3, y: 2.5, w: 6, h: 0.5, fontSize: 18, bold: true, color: C.accent1, margin: 0, isTextBox: true });
      s.addText(hook.replace(/^"|"$/g, "").replace(/" → .*$/, "").replace(/"/g, ""), { x: 3.3, y: 3.05, w: 8.2, h: 2.2, fontSize: 30, bold: true, color: C.text2, margin: 0, valign: "top", fit: "shrink", isTextBox: true });
      s.addNotes(`【Hook 진행】 지문을 펴기 전에 이 질문으로 가볍게 이야기 나누기 (정답을 고르는 단계가 아니라 오늘 글의 소재에 관심 갖기).\n【참고】 ${hook}`);
    }

    // --- 2) 어휘 (클릭하면 뜻이 나타남)
    const VO = e.vocab || [];
    if (VO.length) {
      s = pres.addSlide({ masterName: "CONTENT", sectionTitle: sec });
      s.addText([{ text: `Ex ${e.n}  `, options: { color: C.accent2 } }, { text: "오늘의 단어: 뜻이 뭘까?" }], { placeholder: "title" });
      chip(s, `${kind} · 어휘`, 10.6, 0.6, 2.1, C.background2, C.text2, 12);
      const vCols = VO.length > 8 ? 3 : 2, vRows = Math.ceil(VO.length / vCols), vW = (12.1 - 0.2 * (vCols - 1)) / vCols, vH = Math.min(1.15, (5.4 - 0.15 * (vRows - 1)) / vRows);
      VO.forEach(([w, ko], i) => {
        const x = 0.6 + (i % vCols) * (vW + 0.2), y = 1.45 + Math.floor(i / vCols) * (vH + 0.15);
        s.addShape(pres.shapes.ROUNDED_RECTANGLE, { x, y, w: vW, h: vH, rectRadius: 0.12, fill: { color: HEX.lt1 }, line: { color: HEX.lt2, width: 1.5 } });
        s.addText(String(i + 1), { shape: pres.shapes.OVAL, x: x + 0.2, y: y + vH / 2 - 0.25, w: 0.5, h: 0.5, fill: { color: C.accent1 }, color: C.background1, fontSize: 14, bold: true, align: "center", valign: "middle", margin: 0 });
        s.addText(w, { x: x + 0.9, y, w: vW * 0.5, h: vH, fontSize: 22, bold: true, color: C.text2, valign: "middle", margin: 0, fit: "shrink", isTextBox: true });
        s.addText(ko, { x: x + 0.9 + vW * 0.5, y: y + 0.12, w: vW * 0.5 - 1.05, h: vH - 0.24, fontSize: 20, bold: true, color: C.accent2, fill: { color: "FFF1EC" }, align: "center", valign: "middle", margin: 0, fit: "shrink", isTextBox: true, objectName: `ANIM_v${i}` });
      });
      s.addNotes(`【진행】 단어를 하나씩 읽고 \"뜻이 뭘까?\" 물어본 뒤 클릭 → 뜻이 나타나요 (클릭 한 번에 하나씩).\n${VO.map(([w, ko], i) => `${i + 1}. ${w} = ${ko}`).join(" / ")}`);
    }

    // --- 3) 내신 어법 체크 (워밍업: 지문 속 문장 미리보기, 클릭하면 정답)
    const GQe = (e.gq || []).slice(0, 4);
    if (GQe.length) {
      s = pres.addSlide({ masterName: "CONTENT", sectionTitle: sec });
      s.addText([{ text: `Ex ${e.n}  `, options: { color: C.accent2 } }, { text: "어법 워밍업: 알맞은 것은?" }], { placeholder: "title" });
      chip(s, `${kind} · 어법`, 10.6, 0.6, 2.1, C.background2, C.text2, 12);
      const rh = Math.min(1.35, 5.3 / GQe.length - 0.15);
      GQe.forEach((g, i) => {
        const y = 1.45 + i * (rh + 0.15);
        s.addShape(pres.shapes.ROUNDED_RECTANGLE, { x: 0.6, y, w: 12.1, h: rh, rectRadius: 0.1, fill: { color: i % 2 ? HEX.lt1 : "F2F8FB" }, line: { color: "D3E5EE", width: 1 } });
        s.addText(String(i + 1), { shape: pres.shapes.OVAL, x: 0.85, y: y + rh / 2 - 0.3, w: 0.6, h: 0.6, fill: { color: C.accent1 }, color: C.background1, fontSize: 16, bold: true, align: "center", valign: "middle", margin: 0 });
        const qr = g.q.split(/(\[[^\]]+\])/).filter(Boolean).map((t) => (t.startsWith("[") ? { text: t, options: { bold: true, color: HEX.accent2 } } : { text: t, options: { color: HEX.dk1 } }));
        s.addText(qr, { x: 1.7, y, w: 8.0, h: rh, fontSize: 20, valign: "middle", margin: 0, fit: "shrink", isTextBox: true });
        s.addText([{ text: g.a, options: { bold: true, fontSize: 18, color: HEX.dk2, breakLine: true } }, { text: g.why || "", options: { fontSize: 12, color: HEX.dk1 } }],
          { x: 9.85, y: y + 0.1, w: 2.7, h: rh - 0.2, fill: { color: GH }, align: "center", valign: "middle", margin: 0.04, fit: "shrink", isTextBox: true, objectName: `ANIM_g${i}` });
      });
      s.addNotes(`【진행】 지문을 읽기 전 워밍업! 오늘 글에 나오는 문장들이에요. 한 문제씩 \"1번 고른 사람? 2번?\" 손 들기 → 클릭하면 오른쪽에 정답이 나타나요. 문장 내용도 함께 해석해 주면 글의 내용을 미리 맛볼 수 있어요.\n\n【정답 · 해설】\n${GQe.map((g, i) => `${i + 1}. ${g.a} — ${g.why || ""}`).join("\n")}`);
    }

    // --- 4) 정답 근거 지문 (해설 강의 메인 화면)
    s = pres.addSlide({ masterName: "CONTENT", sectionTitle: sec });
    const prompt = e.prompt || (isImp(e) ? "밑줄 친 부분의 의미로 가장 적절한 것은?" : "다음 빈칸에 들어갈 말로 가장 적절한 것은?");
    s.addText([{ text: `Ex ${e.n}  `, options: { color: C.accent2 } }, { text: prompt, options: { fontSize: 24 } }], { placeholder: "title" });
    chip(s, kind, 10.6, 0.6, 2.1, C.background2, C.text2, 12);
    const G = GR[e.n] || [];
    const KH = e.keyHL || [];            // 노란 형광: 정답 근거 (단어·구 단위)
    const GPH = G.flatMap((g) => g[0]);  // 파란 형광: 문법 포인트
    const showOpts = !e.hideOptsOnProblem;
    const optLine = showOpts ? e.opts.map((o, i) => `${NUM[i]}\u00A0${o[0].replace(/\s*-{3,}\s*/g, "\u00A0–\u00A0").replace(/ /g, "\u00A0")}`).join("     ") : "";
    const fixedTxt = (e.given || "") + (e.summary || "") + optLine;
    const markRuns = (txt, base) => {
      // char-level marks for key(yellow) / grammar(blue)
      const mk = new Array(txt.length).fill(0);
      const paint = (ph, bit) => { let k = txt.indexOf(ph); while (k !== -1) { for (let j = k; j < k + ph.length; j++) mk[j] |= bit; k = txt.indexOf(ph, k + ph.length); } };
      KH.forEach((ph) => paint(ph, 1)); GPH.forEach((ph) => paint(ph, 2));
      const out = []; let st = 0;
      for (let j = 1; j <= txt.length; j++) {
        if (j === txt.length || mk[j] !== mk[st]) {
          const m = mk[st], o = { ...base };
          if (m & 1) { o.highlight = HEX.accent3; o.bold = true; }
          if (m === 2) { o.highlight = GH; o.bold = true; o.color = HEX.dk2; }
          if (m === 3) { o.underline = { style: "sng", color: HEX.accent5 }; }
          out.push({ text: txt.slice(st, j), options: o }); st = j;
        }
      }
      return out;
    };
    const totalChars = P.s.reduce((a, x) => a + x[0].length, 0);
    const cpl = (sz) => 12.05 * 72 / (sz * 0.47);
    const linesAt = (sz) => Math.ceil((totalChars + P.s.length * 4) / cpl(sz)) + Math.ceil(fixedTxt.length / cpl(sz)) + (e.given ? 1 : 0) + (e.summary ? 1 : 0) + (showOpts ? 1 : 0);
    let qs = e.qFont || 26;
    while (!e.qFont && qs > 14 && linesAt(qs) * (qs * 1.18 * 1.17 / 72) + 0.25 > 5.45) qs -= 0.5;
    const pr = [];
    if (e.given) {
      pr.push({ text: "[주어진 문장]  ", options: { fontSize: qs, bold: true, color: HEX.accent2 } });
      pr.push({ text: e.given, options: { fontSize: qs, bold: true, color: HEX.dk2, breakLine: true } });
    }
    P.s.forEach((x, i) => {
      pr.push({ text: `(${i + 1}) `, options: { fontSize: qs - 4, bold: true, color: HEX.accent1 } });
      const sentBase = { fontSize: qs, color: HEX.dk1, ...(!KH.length && x[2] ? { highlight: HEX.accent3 } : {}) };
      runs(x[0], sentBase, false).forEach((r) => {
        if (r.options.underline || r.text.startsWith("____")) pr.push(KH.includes(r.text) ? { text: r.text, options: { ...r.options, highlight: HEX.accent3 } } : r);
        else pr.push(...markRuns(r.text, r.options));
      });
      if (i < P.s.length - 1) pr.push({ text: " ", options: { fontSize: qs } });
    });
    if (e.summary || showOpts) pr[pr.length - 1].options.breakLine = true;
    if (e.summary) {
      pr.push({ text: "↓  ", options: { fontSize: qs, bold: true, color: HEX.accent1, paraSpaceBefore: 6 } });
      pr.push(...abRuns(e.summary, { fontSize: qs, color: HEX.dk2 }));
      if (showOpts) pr[pr.length - 1].options.breakLine = true;
    }
    if (showOpts) pr.push({ text: optLine, options: { fontSize: Math.max(13, qs - 4), color: HEX.accent4, paraSpaceBefore: 6 } });
    s.addShape(pres.shapes.ROUNDED_RECTANGLE, { x: 0.45, y: 1.3, w: 12.45, h: 5.65, rectRadius: 0.1, fill: { color: C.background1 }, line: { color: C.background2, width: 1.5 } });
    s.addText(pr, { x: 0.65, y: 1.4, w: 12.05, h: 5.45, margin: 0, valign: "top", lineSpacingMultiple: 1.18, fit: "shrink", isTextBox: true });
    const KW = e.keyWhy || {};
    const trans = P.s.map((x, i) => `(${i + 1}) ${x[1]}`).join("\n");
    const optsNote = e.opts.map((o, i) => `${NUM[i]} ${o[0]} — ${o[1]}${i === e.ans - 1 ? "  ★정답" : ""}`).join("\n");
    s.addNotes([
      `【정답】 ${NUM[e.ans - 1]} ${e.opts[e.ans - 1][0]}`,
      e.solve ? `\n【풀이 플로우 — 정답을 모른다고 생각하고 이렇게 이끌어 가세요】\n${e.solve.map((t, i) => `${i + 1}) ${t}`).join("\n")}` : "",
      Object.keys(KW).length ? `\n【노란 형광 = 정답 근거, 이유】\n${Object.entries(KW).map(([k, v]) => `(${k}) ${v}`).join("\n")}` : "",
      `\n【선택지 해설】\n${optsNote}`,
      G.length ? `\n【파란 형광 = 문법·내신 포인트】\n${G.map((g) => `• ${g[0].join(" … ")}\n   → ${g[1]}: ${g[2]}`).join("\n")}` : "",
      e.notes ? `\n【수업 팁】\n${e.notes}` : "",
      `\n【문장별 해석】\n${trans}`,
    ].filter(Boolean).join("\n"));

    // --- 5) 흐름 + 꼭 가져갈 것 (복습)
    s = pres.addSlide({ masterName: "CONTENT", sectionTitle: sec });
    s.addText([{ text: `Ex ${e.n}  `, options: { color: C.accent2 } }, { text: e.title }], { placeholder: "title" });
    chip(s, `${kind} · 흐름 정리`, 10.6, 0.6, 2.1, C.background2, C.text2, 12);
    s.addText("글의 흐름", { x: 0.6, y: 1.35, w: 3, h: 0.4, fontSize: 15, bold: true, color: C.accent1, margin: 0, isTextBox: true });
    const fy0 = 1.85, fh = 1.1, fg = 0.15;
    s.addShape(pres.shapes.LINE, { x: 0.95, y: fy0 + 0.35, w: 0, h: (fh + fg) * (e.flow.length - 1), line: { color: C.background2, width: 3 } });
    e.flow.forEach((f, i) => {
      const y = fy0 + i * (fh + fg);
      s.addText(String(i + 1), { shape: pres.shapes.OVAL, x: 0.65, y: y + 0.05, w: 0.6, h: 0.6, fill: { color: i === e.flow.length - 1 ? C.accent2 : C.accent1 }, color: C.background1, fontSize: 18, bold: true, align: "center", valign: "middle", margin: 0 });
      s.addText(f[0], { x: 1.5, y: y + 0.03, w: 5.6, h: 0.38, fontSize: 16, bold: true, color: C.accent1, margin: 0, isTextBox: true });
      s.addText(f[1], { x: 1.5, y: y + 0.42, w: 5.8, h: fh - 0.42, fontSize: 16, color: C.text1, margin: 0, valign: "top", fit: "shrink", isTextBox: true });
    });
    const TK = e.takeaways || [];
    s.addShape(pres.shapes.ROUNDED_RECTANGLE, { x: 7.6, y: 1.35, w: 5.1, h: 5.55, rectRadius: 0.15, fill: { color: HEX.lt2 }, line: { color: HEX.lt2 } });
    s.addImage({ data: I.key, x: 7.9, y: 1.62, w: 0.36, h: 0.36 });
    s.addText("꼭 가져갈 것", { x: 8.4, y: 1.55, w: 4, h: 0.5, fontSize: 19, bold: true, color: C.text2, margin: 0, isTextBox: true });
    s.addText(TK.map((t, i) => ({ text: t, options: { bullet: { code: "2714" }, breakLine: i < TK.length - 1 } })), { x: 7.9, y: 2.2, w: 4.6, h: 4.5, fontSize: 17, color: C.text1, margin: 0, valign: "top", paraSpaceAfter: 12, fit: "shrink", isTextBox: true });
    s.addNotes(`【복습 정리】 해설이 끝난 뒤 이 화면으로 1분 정리. \"이 글은 한마디로?\" → 학생이 흐름 4단계를 말하게 하고, 오른쪽 '꼭 가져갈 것'을 함께 읽어요.\n【한 줄 핵심】 ${e.key || ""}`);
  }

  pres.addSection({ title: "정리" });
  // ---------- 복습 미니테스트 (클릭하면 정답) ----------
  const R = D.review || {};
  const VQ = (R.vocab || EX.filter((e) => e.vocab && e.vocab.length).map((e) => e.vocab[0])).slice(0, 12);
  if (VQ.length) {
    s = pres.addSlide({ masterName: "CONTENT", sectionTitle: "정리" });
    s.addText("어휘 스피드 퀴즈", { placeholder: "title" });
    chip(s, "복습 미니테스트", 10.6, 0.6, 2.1, C.accent2, C.background1, 12);
    const cols = 3, rows = Math.ceil(VQ.length / cols), cw = 3.9, chh = Math.min(1.25, 5.3 / rows - 0.12);
    VQ.forEach(([w, ko], i) => {
      const x = 0.6 + (i % cols) * (cw + 0.2), y = 1.45 + Math.floor(i / cols) * (chh + 0.12);
      s.addShape(pres.shapes.ROUNDED_RECTANGLE, { x, y, w: cw, h: chh, rectRadius: 0.12, fill: { color: HEX.lt1 }, line: { color: HEX.lt2, width: 1.5 } });
      s.addText(String(i + 1), { shape: pres.shapes.OVAL, x: x + 0.15, y: y + chh / 2 - 0.22, w: 0.44, h: 0.44, fill: { color: C.accent1 }, color: C.background1, fontSize: 13, bold: true, align: "center", valign: "middle", margin: 0 });
      s.addText(w, { x: x + 0.7, y, w: 1.75, h: chh, fontSize: 17, bold: true, color: C.text2, valign: "middle", margin: 0, fit: "shrink", isTextBox: true });
      s.addText(ko, { x: x + 2.5, y: y + 0.12, w: 1.3, h: chh - 0.24, fontSize: 15, bold: true, color: C.accent2, fill: { color: "FFF1EC" }, align: "center", valign: "middle", margin: 0, fit: "shrink", isTextBox: true, objectName: `ANIM_q${i}` });
    });
    s.addNotes(`【진행】 번호를 부르면 손 든 학생이 뜻 말하기 → 클릭하면 뜻이 하나씩 나타나요.\n${VQ.map(([w, ko], i) => `${i + 1}. ${w} = ${ko}`).join(" / ")}`);
  }
  const GQ = (R.grammar || []).slice(0, 6);
  if (GQ.length) {
    s = pres.addSlide({ masterName: "CONTENT", sectionTitle: "정리" });
    s.addText("어법 골든벨: 알맞은 것은?", { placeholder: "title" });
    chip(s, "복습 미니테스트", 10.6, 0.6, 2.1, C.accent2, C.background1, 12);
    const rh = Math.min(0.95, 5.4 / GQ.length - 0.1);
    GQ.forEach((g, i) => {
      const y = 1.4 + i * (rh + 0.1);
      s.addShape(pres.shapes.ROUNDED_RECTANGLE, { x: 0.6, y, w: 12.1, h: rh, rectRadius: 0.1, fill: { color: i % 2 ? HEX.lt1 : "F7FAF9" }, line: { color: HEX.lt2, width: 1 } });
      s.addText(String(i + 1), { shape: pres.shapes.OVAL, x: 0.8, y: y + rh / 2 - 0.25, w: 0.5, h: 0.5, fill: { color: C.accent1 }, color: C.background1, fontSize: 14, bold: true, align: "center", valign: "middle", margin: 0 });
      const qr = g.q.split(/(\[[^\]]+\])/).filter(Boolean).map((t) => (t.startsWith("[") ? { text: t, options: { bold: true, color: HEX.accent2 } } : { text: t, options: { color: HEX.dk1 } }));
      s.addText(qr, { x: 1.5, y, w: 8.9, h: rh, fontSize: 17, valign: "middle", margin: 0, fit: "shrink", isTextBox: true });
      s.addText([{ text: g.a, options: { bold: true, fontSize: 16, color: HEX.dk2, breakLine: true } }, { text: g.why || "", options: { fontSize: 10, color: HEX.accent4 } }],
        { x: 10.5, y: y + 0.07, w: 2.1, h: rh - 0.14, fill: { color: GH }, align: "center", valign: "middle", margin: 0.03, fit: "shrink", isTextBox: true, objectName: `ANIM_b${i}` });
    });
    s.addNotes(`【진행】 골든벨처럼 동시에 답 들기 → 클릭하면 정답이 하나씩 나타나요.\n${GQ.map((g, i) => `${i + 1}. ${g.a} — ${g.why || ""}`).join("\n")}`);
  }

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
  await addClickReveals(OUT_PATH);
  console.log("written", OUT_PATH);
})();

async function addClickReveals(file) {
  let JSZip;
  try { JSZip = require("jszip"); } catch (_) { JSZip = require(require.resolve("jszip", { paths: [require.resolve("pptxgenjs")] })); }
  const zip = await JSZip.loadAsync(fs.readFileSync(file));
  const names = Object.keys(zip.files).filter((n) => /^ppt\/slides\/slide\d+\.xml$/.test(n));
  for (const n of names) {
    let x = await zip.file(n).async("string");
    const ids = [...x.matchAll(/<p:cNvPr id="(\d+)" name="ANIM_[^"]*"/g)].map((m) => m[1]);
    if (!ids.length || x.includes("<p:timing>")) continue;
    let c = 2;
    const clicks = ids.map((id) => {
      const a = ++c, b = ++c, d = ++c, f = ++c;
      return `<p:par><p:cTn id="${a}" fill="hold"><p:stCondLst><p:cond delay="indefinite"/></p:stCondLst><p:childTnLst><p:par><p:cTn id="${b}" fill="hold"><p:stCondLst><p:cond delay="0"/></p:stCondLst><p:childTnLst><p:par><p:cTn id="${d}" presetID="1" presetClass="entr" presetSubtype="0" fill="hold" nodeType="clickEffect"><p:stCondLst><p:cond delay="0"/></p:stCondLst><p:childTnLst><p:set><p:cBhvr><p:cTn id="${f}" dur="1" fill="hold"><p:stCondLst><p:cond delay="0"/></p:stCondLst></p:cTn><p:tgtEl><p:spTgt spid="${id}"/></p:tgtEl><p:attrNameLst><p:attrName>style.visibility</p:attrName></p:attrNameLst></p:cBhvr><p:to><p:strVal val="visible"/></p:to></p:set></p:childTnLst></p:cTn></p:par></p:childTnLst></p:cTn></p:par></p:childTnLst></p:cTn></p:par>`;
    }).join("");
    const timing = `<p:timing><p:tnLst><p:par><p:cTn id="1" dur="indefinite" restart="never" nodeType="tmRoot"><p:childTnLst><p:seq concurrent="1" nextAc="seek"><p:cTn id="2" dur="indefinite" nodeType="mainSeq"><p:childTnLst>${clicks}</p:childTnLst></p:cTn><p:prevCondLst><p:cond evt="onPrev" delay="0"><p:tgtEl><p:sldTgt/></p:tgtEl></p:cond></p:prevCondLst><p:nextCondLst><p:cond evt="onNext" delay="0"><p:tgtEl><p:sldTgt/></p:tgtEl></p:cond></p:nextCondLst></p:seq></p:childTnLst></p:cTn></p:par></p:tnLst></p:timing>`;
    x = x.includes("</p:clrMapOvr>") ? x.replace("</p:clrMapOvr>", "</p:clrMapOvr>" + timing) : x.replace("</p:cSld>", "</p:cSld>" + timing);
    zip.file(n, x);
  }
  fs.writeFileSync(file, await zip.generateAsync({ type: "nodebuffer", compression: "DEFLATE" }));
}
