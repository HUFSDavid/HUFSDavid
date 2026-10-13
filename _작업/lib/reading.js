// David 본문 자료집 — 학생용 / 교사용 2파일
const fs = require("fs");
const path = require("path");
const K = require("./common.js");
const { C, CW, r, p, cell, table, row, headRow, guide, spacer, testHead, rng, shuffle, AlignmentType, VerticalAlign, NONE, ln, saveMulti } = K;

const cfg = JSON.parse(fs.readFileSync(process.argv[2], "utf8"));
const R = require(path.resolve(cfg.read));
const T = require(path.resolve(cfg.tests));
const L = cfg.lesson;
const CIR = ["①", "②", "③", "④", "⑤", "⑥", "⑦", "⑧", "⑨", "⑩", "⑪", "⑫"];
const pass = (n) => n - Math.floor(n / 10);
const plain = (s) => s.replace(/[{}]/g, "");
const HR = (s) => `${cfg.pubShort} ${L}과 · 본문 ${s}`;
const report = {};

function segs(s) { const out = []; const re = /\{([^}]*)\}/g; let m, last = 0; while ((m = re.exec(s))) { if (m.index > last) out.push([0, s.slice(last, m.index)]); out.push([1, m[1]]); last = re.lastIndex; } if (last < s.length) out.push([0, s.slice(last)]); return out; }
const blank = (t) => "_".repeat(Math.max(6, Math.round(t.length * 1.3)));
// mode: full(형광) / blank / red(해설 빨강)
function runs(s, mode, size = 19, extra = {}) {
  return segs(s).flatMap(([b, t]) => !b ? [r(t, { size, ...extra })]
    : mode === "full" ? [r(t, { size, bold: true, hl: true })]
    : mode === "red" ? [r(t, { size, bold: true, color: C.red })]
    : [r(blank(t), { size, color: C.gray })]);
}
// __밑줄__ 처리
function ul(s, size = 18, o = {}) {
  const out = []; const re = /(?<!_)__([^_\s][^_]*?[^_\s]|[^_\s])__(?!_)/g; let m, last = 0;
  while ((m = re.exec(s))) { if (m.index > last) out.push(r(s.slice(last, m.index), { size, ...o })); out.push(r(m[1], { size, under: true, ...o })); last = re.lastIndex; }
  if (last < s.length) out.push(r(s.slice(last), { size, ...o })); return out;
}
const H1 = (t, sub) => p([r(t, { size: 24, bold: true }), r(sub ? "   " + sub : "", { size: 16, color: C.gray })], { before: 260, after: 100, border: { bottom: ln(6, C.ink) }, keepNext: true });
const titleBlock = (kicker, t, info) => [p(r(kicker, { size: 16, bold: true, color: C.gray }), { after: 40 }), p(r(t, { size: 42, bold: true }), { after: 80 }),
  p(r(info, { size: 17, color: C.gray }), { after: 120, border: { bottom: ln(8, C.ink) } })];
const boxed = (children, o = {}) => table([CW], [row([cell(children, { w: CW, fill: o.fill ?? C.light, ml: 200, mr: 120, mt: 120, mb: 120, v: VerticalAlign.TOP,
  borders: { top: NONE, bottom: NONE, right: NONE, left: ln(16, o.line ?? C.ink) } })])]);
const paraText = (ids) => ids.map((id) => { const P_ = R.paras.find((x) => x.id === id); return (P_.head ? P_.head[0] + " " : "") + plain(P_.en); }).join(" ");

// ================= ① 학습지 =================
function noteInserts(P_) {
  const pl = plain(P_.en); const out = [];
  P_.notes.forEach((nt, i) => {
    const cands = [(cfg.anchors || {})[`P${P_.id}-${i + 1}`], ...nt[0].split(/ \/ |~/).map((x) => x.trim())].filter((x) => x && x.length > 1);
    const a = cands.find((x) => pl.includes(x));
    if (!a) { (report.missAnchor = report.missAnchor || []).push(`P${P_.id}-${i + 1}`); return; }
    out.push({ pos: pl.indexOf(a) + a.length, label: CIR[i] });
  });
  return out.sort((x, y) => x.pos - y.pos);
}
function study(teacher) {
  const out = titleBlock("READING NOTE", `Lesson ${L} 본문 학습지`, `${cfg.book}  ·  ${R.title}  ·  ★ = 출제 예상 문장`);
  // TEXT
  out.push(H1("TEXT", R.title));
  R.paras.forEach((P_) => {
    if (P_.head) out.push(p(r(P_.head[0], { size: 19, bold: true }), { before: 120, after: 40 }));
    const pl = plain(P_.en); let ins = noteInserts(P_);
    let s2 = pl;
    if (P_.star) { const sent = pl.match(/[^.?!]+[.?!]+["”’]?/g)[P_.star[0]]; const st = pl.indexOf(sent) + (sent.length - sent.trimStart().length); const en = pl.indexOf(sent) + sent.length;
      s2 = pl.slice(0, st) + "{★" + pl.slice(st, en) + "}" + pl.slice(en); ins = ins.map((x) => ({ ...x, pos: x.pos > st ? x.pos + 1 : x.pos })); }
    out.push(p(K.annotated(s2, ins, (t, key) => key ? (t.startsWith("★") ? [r("★", { size: 19, bold: true, color: C.coral }), r(t.slice(1), { size: 19, bold: true })] : [r(t, { size: 19, bold: true })]) : [r(t, { size: 19 })], false), { after: 80, line: 300 }));
  });
  // 어휘
  out.push(H1("핵심 어휘", `${R.vocab.length}개`));
  const n = R.vocab.length, k = Math.ceil(n / 2);
  const w = [560, 1750, CW / 2 - 560 - 1750 - 100, 200, 560, 1750, 0]; w[2] = Math.round(w[2]); w[6] = CW - w.slice(0, 6).reduce((a, b) => a + b, 0);
  const vr = [headRow(w, ["No.", "단어", "뜻", "", "No.", "단어", "뜻"])];
  for (let i = 0; i < k; i++) {
    const L1 = R.vocab[i], R1 = R.vocab[i + k];
    const c3 = (v, idx) => v ? [cell([p(r(String(idx + 1), { size: 16, bold: true }), { align: AlignmentType.CENTER }), p(r("□□□", { size: 11, color: C.gray }), { align: AlignmentType.CENTER })], { w: w[0] }),
      cell(p(r(v[0], { size: 18, bold: true })), { w: w[1] }), cell(p(r(teacher ? v[1] : "", { size: 16, color: teacher ? C.ink : C.gray })), { w: w[2] })] : [cell(p(r("")), { w: w[0] }), cell(p(r("")), { w: w[1] }), cell(p(r("")), { w: w[2] })];
    vr.push(row([...c3(L1, i), cell(p(r("")), { w: 200, borders: { top: NONE, bottom: NONE, left: NONE, right: NONE } }), ...c3(R1, i + k)]));
  }
  out.push(table(w, vr));
  // 문단별 분석
  out.push(H1("문단별 분석", teacher ? "형광 = 학생용 빈칸 · 빨강 = 학생용 해설 빈칸" : "빈칸을 채우며 읽기"));
  R.paras.forEach((P_, idx) => {
    const wP = [600, CW - 600];
    const body = [];
    if (P_.head) body.push(p(r(P_.head[0] + "  " + P_.head[1], { size: 17, bold: true, color: C.gray }), { after: 40 }));
    // 어구 번호: 강조 구간 순서대로 ①②
    const enRuns = K.annotated(P_.en, noteInserts(P_), (t, key) => !key ? [r(t, { size: 19 })] : teacher ? [r(t, { size: 19, bold: true, hl: true })] : [r(blank(t), { size: 19, color: C.gray })], !teacher, 15);
    body.push(p(enRuns, { line: 300, after: 80 }));
    body.push(p(r(P_.ko, { size: 16, color: C.gray }), { after: 80 }));
    body.push(p(r("구문 해설", { size: 16, bold: true }), { after: 30 }));
    P_.notes.forEach((nt, i) => body.push(p([r(CIR[i] + " ", { size: 16, bold: true }), ...(teacher ? [r(nt[0] + ": ", { size: 16, bold: true })] : []),
      ...runs(nt[1], teacher ? "red" : "blank", 16)], { after: 20, indent: { left: 160 } })));
    if (P_.star) body.push(p([r("★ 출제 예상: ", { size: 16, bold: true, color: C.coral }), r(teacher ? P_.star[1] : (plain(P_.en).match(/[^.?!]+[.?!]+["”’]?/g)[P_.star[0]].trim()), { size: 16, color: teacher ? C.ink : C.gray })], { before: 40 }));
    out.push(table(wP, [row([cell([p(r(`본문 ${idx + 1}`, { size: 14, bold: true, color: C.white }), { align: AlignmentType.CENTER }), p(r("□□□", { size: 11, color: C.white }), { align: AlignmentType.CENTER })], { w: wP[0], fill: C.ink, v: VerticalAlign.TOP }),
      cell(body, { w: wP[1], v: VerticalAlign.TOP, ml: 160 })], { cantSplit: false })]));
    out.push(spacer(100));
    // Grammar✚: R.gplus {id: [제목, 줄들]} 우선, 없으면 기존(L7) 내용
    const GP = R.gplus ? R.gplus[P_.id] : (P_.id === 4 ? ["분사구문", ["접속사 · (같은) 주어를 지우고 동사를 -ing로 → Using various methods = As they use various methods", "뜻은 문맥으로: 시간 · 이유 · 조건 · 양보 · 동시동작 (본문 2개 모두 동시동작)", "부정: Not + -ing / 수동: (Being) p.p."]]
      : P_.id === 7 ? ["접속사 as", ["as + 주어 + 동사 = 접속사 / as + 명사 = 전치사(~로서)", "뜻: ~할 때 · ~ 때문에 · ~함에 따라(develop, grow + 비교급) · ~하듯이(just as)", "본문: As … technology develops (~함에 따라) / just as weather experts forecast (~하듯이)"]] : null);
    if (GP) out.push(boxed([p(r("Grammar✚  " + GP[0], { size: 17, bold: true }), { after: 40 }),
      ...GP[1].map((l) => p(r("· " + l, { size: 16 }), { after: 20 }))], { fill: "F2F5FA", line: "7A93B8" }), spacer(120));
  });
  // Logic Flow
  out.push(H1("Logic Flow · 주제"));
  const wf = [1600, CW - 1600];
  out.push(table(wf, R.flow.map((f) => row([cell(p(r(f[0], { size: 17, bold: true })), { w: wf[0], fill: C.light }), cell(p(r(f[1], { size: 17 })), { w: wf[1] })]))));
  out.push(p([r("주제  ", { size: 18, bold: true }), r(R.topic[0], { size: 18 })], { before: 120 }));
  out.push(p([r(R.topic[1], { size: 17, color: C.gray })], { after: 60 }));
  // 바꿔쓰기
  out.push(H1("바꿔쓰기 표", "내용 일치·실전 선지는 이 표현으로 바뀌어 나온다"));
  const wpz = [3400, 3600, CW - 7000];
  out.push(table(wpz, [headRow(wpz, ["본문 표현", "시험 변형 표현", "뜻"]), ...R.para.map((x) => row([cell(p(r(x[0], { size: 17 })), { w: wpz[0] }),
    cell(p(r(teacher ? x[1] : "", { size: 17, bold: true, color: C.red })), { w: wpz[1] }), cell(p(r(x[2], { size: 16, color: C.gray })), { w: wpz[2] })]))]));
  // CHECK
  out.push(H1("CHECK", "교과서 내용 확인 질문 (원문) · 모범답안 자체 제작"));
  R.check.forEach((c, i) => { out.push(p([r(`${i + 1}. `, { size: 18, bold: true }), r(c[0], { size: 18 })], { before: 80, keepNext: true }));
    out.push(p(r(teacher ? "→ " + c[1] : "→ " + "_".repeat(80), { size: 17, color: teacher ? C.red : C.gray }), { indent: { left: 300 }, after: 40 })); });
  // QUIZ
  out.push(H1("QUIZ · 내용 확인", "자체 제작"));
  const wt = [500, CW - 500 - 900, 900];
  const tfRows = [headRow(wt, ["No", "문장", "T / F"])];
  R.tfOrder.forEach((ii, j) => { const x = R.tf[ii]; tfRows.push(row([cell(p(r(String(j + 1), { size: 17, bold: true }), { align: AlignmentType.CENTER }), { w: wt[0] }),
    cell([p(r(x[0], { size: 17 })), ...(teacher ? [p(r("근거: " + x[2], { size: 14, color: C.gray }))] : [])], { w: wt[1] }),
    cell(p(r(teacher ? x[1] : "T / F", { size: 17, bold: true, color: teacher ? C.red : C.gray }), { align: AlignmentType.CENTER }), { w: wt[2] })])); });
  out.push(table(wt, tfRows));
  report.tf = R.tfOrder.map((i) => R.tf[i][1]).join("");
  R.cannot.forEach((q, i) => {
    out.push(p(r(`${R.tf.length + 1 + i}. ${q.q}`, { size: 18, bold: true }), { before: 160, after: 40, keepNext: true }));
    q.opts.forEach((o, j) => out.push(p([r(CIR[j] + " " + o, { size: 18, bold: teacher && j + 1 === q.a, color: teacher && j + 1 === q.a ? C.red : C.ink })], { indent: { left: 300 }, keepNext: j < 4 })));
    if (teacher) out.push(p(r(`정답 ${CIR[q.a - 1]} — ${q.why}`, { size: 15, color: C.red }), { indent: { left: 300 }, after: 40 }));
  });
  // 고난도: 모두 고르기
  const SYM = ["ⓐ", "ⓑ", "ⓒ", "ⓓ", "ⓔ"];
  report.multi = [];
  (R.multi || []).forEach((h, i) => {
    const hitF = (o) => (h.kind === "cannot" || h.kind === "false" ? !o[1] : o[1]);
    const key = h.opts.map((o, j) => (hitF(o) ? SYM[j] : "")).join(""); report.multi.push(key);
    out.push(p([r(`${R.tf.length + R.cannot.length + 1 + i}. `, { size: 18, bold: true }), r("★고난도  ", { size: 15, bold: true, color: C.coral }), r(h.q, { size: 18, bold: true })], { before: 160, after: 40, keepNext: true }));
    h.opts.forEach((o, j) => out.push(p([r(`${SYM[j]} ${o[0]}`, { size: 18, bold: teacher && hitF(o), color: teacher && hitF(o) ? C.red : C.ink }),
      ...(teacher ? [r(`   → ${o[2]}`, { size: 14, color: C.gray })] : [])], { indent: { left: 300 }, keepNext: true })));
    out.push(p(r(teacher ? `정답: ${key}` : "정답: ______________________", { size: 18, bold: true, color: teacher ? C.red : C.ink }), { indent: { left: 300 }, before: 40, after: 40 }));
  });
  if (teacher) {
    out.push(H1("교사 메모"));
    out.push(p(r("표시: 형광 = 학생용 빈칸 어구 / 빨간 글씨 = 학생용 빈칸 해설어 / ★ = 출제 예상 (본문 해석은 인쇄 해석 그대로)", { size: 16, color: C.gray }), { after: 60 }));
    R.memo.forEach((m) => out.push(p(r("· " + m, { size: 17 }), { after: 30 })));
  }
  return out;
}

// ================= ② 문장 테스트 =================
function sentTest(form, ans) {
  const parts = T.ST[form];
  const pts = 16, pn = pass(pts);
  const out = [...testHead({ kicker: "READING TEST", title: "문장 테스트", form: form + "형", info: `본문 핵심 문장  ·  ${pts}문항(${pts}점)  ·  10분  ·  통과 ${pn}점 이상`, answer: ans,
    criteria: ["1문항 1점 · 영작·배열은 철자·대소문자·문장부호까지 같아야 정답", "영→한은 의미가 통하면 정답(핵심 어구 누락 시 오답)", `통과 기준 ${pn}/${pts}`] })];
  let q = 1;
  const rnd = rng(form.charCodeAt(0) * 97);
  const P = (t) => out.push(p(r(t, { size: 18, bold: true }), { before: 160, after: 80, keepNext: true, border: { bottom: ln(4, C.rule2) } }));
  P("PART 1  밑줄 친 부분을 우리말로 쓰시오.");
  parts[0].forEach((si) => { const s = T.S[si]; const i = s.en.indexOf(s.ek[0]);
    out.push(p([r(`${q++}. `, { size: 18, bold: true }), r(s.en.slice(0, i), { size: 18 }), r(s.ek[0], { size: 18, under: true }), r(s.en.slice(i + s.ek[0].length), { size: 18 })], { after: 30, keepNext: true }));
    out.push(p(r(ans ? "→ " + s.ek[1] : "→ " + "_".repeat(60), { size: 17, color: ans ? C.red : C.gray, bold: ans }), { indent: { left: 300 }, after: 60 })); });
  P("PART 2  우리말에 맞게 빈칸에 알맞은 말을 쓰시오.");
  parts[1].forEach((si) => { const s = T.S[si]; const i = s.en.indexOf(s.ek[0]);
    out.push(p([r(`${q++}. `, { size: 18, bold: true }), r(s.ko, { size: 17, color: C.gray })], { after: 30, keepNext: true }));
    out.push(p([r(s.en.slice(0, i), { size: 18 }), ans ? r(s.ek[0], { size: 18, bold: true, color: C.red, under: true }) : r(blank(s.ek[0]), { size: 18 }), r(s.en.slice(i + s.ek[0].length), { size: 18 })], { indent: { left: 300 }, after: 60 })); });
  P("PART 3  우리말에 맞게 주어진 어구를 배열하시오.");
  parts[2].forEach((si) => { const s = T.S[si]; const ch = s.ch.split(" / "); let sh; do { sh = shuffle(ch, rnd); } while (sh.join("|") === ch.join("|"));
    out.push(p([r(`${q++}. `, { size: 18, bold: true }), r(s.ko, { size: 17 })], { after: 30, keepNext: true }));
    out.push(p(r("( " + sh.join("  /  ") + " )", { size: 17, color: C.gray }), { indent: { left: 300 }, after: 30, keepNext: true }));
    out.push(p(r(ans ? s.en : "→ " + "_".repeat(70), { size: 17, color: ans ? C.red : C.gray, bold: ans }), { indent: { left: 300 }, after: 60 })); });
  P("PART 4  우리말에 맞게 주어진 단어를 배열하시오. (문장부호는 그대로 붙어 있음)");
  parts[3].forEach((si) => { const s = T.S[si]; const ws = s.en.split(" "); let sh; do { sh = shuffle(ws, rnd); } while (sh.join(" ") === ws.join(" "));
    out.push(p([r(`${q++}. `, { size: 18, bold: true }), r(s.ko, { size: 17 })], { after: 30, keepNext: true }));
    out.push(p(r("( " + sh.join(" / ") + " )", { size: 16, color: C.gray }), { indent: { left: 300 }, after: 30, keepNext: true }));
    out.push(p(r(ans ? s.en : "→ " + "_".repeat(70), { size: 17, color: ans ? C.red : C.gray, bold: ans }), { indent: { left: 300 }, after: 60 })); });
  if (ans) out.push(...wrong(pts));
  return out;
}

// ================= ③ 어법 집중 =================
function grammarTest(form, ans) {
  const g1 = T.G1[form]; const rnd = rng(form.charCodeAt(0) * 131);
  // [ ] 순서: 정답 위치 40~60%
  let order; for (;;) { order = g1.map(() => rnd() < 0.5); const c = order.filter(Boolean).length; const sq = order.map((x) => (x ? 1 : 0)).join(""); if (c >= g1.length * 0.4 && c <= g1.length * 0.6 && !/111|000/.test(sq) && !/(10){2}|(01){2}/.test(sq) && !/(.{4})\1/.test(sq) && !/(.{3})\1\1/.test(sq)) break; }
  report["g1" + form] = order.map((x) => (x ? "앞" : "뒤")).join("");
  const n1 = g1.length, n2 = T.G2[form].length, n3 = 3, total = n1 + n2 + n3, pn = pass(total);
  const out = [...testHead({ kicker: "READING TEST", title: "어법 집중", form: form + "형", info: `본문 전체  ·  PART 1 ${n1} + PART 2 ${n2} + PART 3 ${n3} = ${total}점  ·  15분  ·  통과 ${pn}점 이상`, answer: ans,
    criteria: ["PART 2는 틀린 것을 모두 고르고 고쳐야 1점(부분 점수 없음)", "PART 3은 틀린 곳 1개당 1점 (찾기 + 고치기)", `통과 기준 ${pn}/${total}`] })];
  const P = (t) => out.push(p(r(t, { size: 18, bold: true }), { before: 160, after: 80, keepNext: true, border: { bottom: ln(4, C.rule2) } }));
  P("PART 1  [ ] 안에서 어법상 알맞은 것을 고르시오.");
  // 문단별로 묶어 표시
  const byPara = {}; g1.forEach((g, i) => (byPara[g[0]] = byPara[g[0]] || []).push([g, i]));
  let num = 1; const numMap = {};
  Object.keys(byPara).map(Number).sort((a, b) => a - b).forEach((pid) => {
    const P_ = R.paras.find((x) => x.id === pid); let text = plain(P_.en);
    const pieces = [];
    // 원문에서 위치 찾기
    const hits = byPara[pid].map(([g, i]) => ({ g, i, at: text.indexOf(g[1]) })).sort((a, b) => a.at - b.at);
    let last = 0;
    hits.forEach((h) => { if (h.at < 0) throw new Error("G1 not found: " + h.g[1]); pieces.push(r(text.slice(last, h.at), { size: 18 }));
      const k = num++; numMap[h.i] = k; const [a, b] = order[h.i] ? [h.g[1], h.g[2]] : [h.g[2], h.g[1]];
      pieces.push(r(`(${k})[ `, { size: 18, bold: true }), r(a, { size: 18, bold: ans && a === h.g[1], color: ans && a === h.g[1] ? C.red : C.ink, under: ans && a === h.g[1] }),
        r(" / ", { size: 18 }), r(b, { size: 18, bold: ans && b === h.g[1], color: ans && b === h.g[1] ? C.red : C.ink, under: ans && b === h.g[1] }), r(" ]", { size: 18, bold: true }));
      last = h.at + h.g[1].length; });
    pieces.push(r(text.slice(last), { size: 18 }));
    out.push(boxed([p(pieces, { line: 320 })])); out.push(spacer(80));
  });
  P("PART 2  밑줄 친 ⓐ~ⓔ 중 어법상 틀린 것을 모두 골라 기호를 쓰고 바르게 고치시오.");
  T.G2[form].forEach((g, i) => { out.push(p(r(`${n1 + i + 1}.`, { size: 18, bold: true }), { after: 40, keepNext: true })); out.push(boxed([p(ul(g.t, 18), { line: 320 })]));
    out.push(p(r(ans ? "정답: " + g.ans.map((x) => `${x[0]} → ${x[1]}`).join(",  ") : "기호 / 고친 것: " + "_".repeat(60), { size: 17, color: ans ? C.red : C.gray, bold: ans }), { before: 80, after: 120 })); });
  P("PART 3  다음 글에서 어법상 틀린 곳 3개를 찾아 바르게 고치시오.");
  out.push(p(r(`${n1 + n2 + 1}~${total}.`, { size: 18, bold: true }), { after: 40, keepNext: true }));
  out.push(boxed([p(r(T.G3[form].t, { size: 18 }), { line: 320 })]));
  [0, 1, 2].forEach((i) => out.push(p(r(ans ? `(${i + 1}) ${T.G3[form].ans[i]}` : `(${i + 1}) ____________________ → ____________________`, { size: 17, color: ans ? C.red : C.ink, bold: ans }), { before: 80 })));
  if (ans) out.push(...wrong(total));
  return out;
}

// ================= ④ 변형 서술형 =================
function writeTest(ans) {
  const total = T.W.reduce((a, b) => a + b.pt, 0), pn = pass(total);
  const out = [...testHead({ kicker: "READING TEST", title: "변형 서술형", form: "A형", info: `본문 전체  ·  ${T.W.length}문항 · ${total}점  ·  25분  ·  통과 ${pn}점 이상  ·  자체 제작`, answer: ans,
    criteria: ["철자·대소문자·띄어쓰기·마침표 하나라도 틀리면 오답", "문항별 배점 · 부분 점수는 각 문항 기준대로", `통과 기준 ${pn}/${total}`] })];
  T.W.forEach((w, i) => {
    out.push(p([r(`${i + 1}. `, { size: 18, bold: true }), r(`[${w.type}] `, { size: 16, bold: true, color: C.coral }), r(w.q, { size: 18, bold: true }), r(`  (${w.pt}점)`, { size: 16, color: C.gray })], { before: 160, after: 60, keepNext: true }));
    out.push(boxed(w.box.map((b) => p(ul(b, 18), { after: 30 })), { fill: "FFFFFF", line: C.rule2 }));
    out.push(p(r(ans ? "→ " + w.a : "→ " + "_".repeat(80), { size: 17, bold: ans, color: ans ? C.red : C.gray }), { before: 80 }));
    if (ans) out.push(p(r("채점: " + w.why, { size: 15, color: C.gray }), { after: 40 }));
  });
  if (ans) out.push(...wrong(T.W.length));
  return out;
}

// ================= ⑤ 모의고사 =================
function mock(set, ans) {
  const M = T.M[set]; const nm = M.mcq.length, ns = M.sub.length, total = nm + ns, pn = pass(total);
  const out = [...testHead({ kicker: "READING TEST", title: `실전 모의고사 SET ${set}`, form: "A형", info: `본문 전체  ·  객관식 ${nm} + 서술형 ${ns} = ${total}문항  ·  45분  ·  통과 ${pn}개 이상  ·  자체 제작`, answer: ans,
    criteria: ["객관식 정답 1개 · 서술형은 철자·대소문자·문장부호까지", `정답 분포: ${[1, 2, 3, 4, 5].map((k) => CIR[k - 1] + M.mcq.filter((x) => x.a === k).length).join(" ")}`, `통과 기준 ${pn}/${total}`] })];
  report["m" + set] = M.mcq.map((x) => x.a).join("");
  M.mcq.forEach((x, i) => {
    out.push(p([r(`${i + 1}. `, { size: 18, bold: true }), r(x.q, { size: 18, bold: true }), ...(ans ? [r(`  [${x.lv}]`, { size: 15, color: C.gray })] : [])], { before: 180, after: 60, keepNext: true }));
    if (x.p) out.push(boxed([p(r(paraText(x.p), { size: 17 }), { line: 300 })], { fill: "FFFFFF", line: C.rule2 }));
    if (x.t) out.push(boxed(x.t.split("\n").map((l) => p(ul(l, 17), { line: 300, after: 30 })), { fill: "FFFFFF", line: C.rule2 }));
    if (x.box) out.push(p(r(""), { after: 40 }), boxed(x.box.map((l) => p(r(l, { size: 17 }), { after: 20 }))));
    if (x.opts.every((o) => o.length <= 14)) {
      const rr = []; x.opts.forEach((o, j) => { const hit = ans && j + 1 === x.a; rr.push(r((j ? "\t" : "") + (o === CIR[j] ? o : CIR[j] + " " + o), { size: 18, bold: hit, color: hit ? C.red : C.ink })); });
      out.push(p(rr, { indent: { left: 300 }, tabs: [1, 2, 3, 4].map((k) => ({ type: "left", position: 300 + k * 1900 })) }));
    } else x.opts.forEach((o, j) => out.push(p([r(CIR[j] + " ", { size: 18, bold: ans && j + 1 === x.a, color: ans && j + 1 === x.a ? C.red : C.ink }), ...ul(o, 18, ans && j + 1 === x.a ? { bold: true, color: C.red } : {})], { indent: { left: 300 }, keepNext: j < 4 })));
    if (ans) out.push(p(r(`정답 ${CIR[x.a - 1]} — ${x.why}`, { size: 15, color: C.red }), { indent: { left: 300 }, after: 40 }));
  });
  out.push(p(r("서술형", { size: 20, bold: true }), { before: 240, after: 60, border: { bottom: ln(6, C.ink) }, keepNext: true }));
  M.sub.forEach((x, i) => {
    out.push(p([r(`서술형 ${i + 1}. `, { size: 18, bold: true }), r(x.q, { size: 18, bold: true }), ...(ans ? [r(`  [${x.lv}]`, { size: 15, color: C.gray })] : [])], { before: 160, after: 60, keepNext: true }));
    out.push(boxed(x.box.map((l) => p(ul(l, 17), { after: 30 })), { fill: "FFFFFF", line: C.rule2 }));
    out.push(p(r(ans ? "→ " + x.a : "→ " + "_".repeat(80), { size: 17, bold: ans, color: ans ? C.red : C.gray }), { before: 80 }));
    if (ans) out.push(p(r("채점: " + x.why, { size: 15, color: C.gray }), { after: 40 }));
  });
  if (ans) out.push(...wrong(total));
  return out;
}

function wrong(n) {
  const wNo = 900, wS = Math.floor((CW - wNo) / 6); const w = [wNo, wS, wS, wS, wS, wS, CW - wNo - wS * 5];
  const bd = { top: ln(4, C.rule), bottom: ln(4, C.rule), left: ln(4, C.rule), right: ln(4, C.rule) };
  const rows = [row(["문항", "학생1", "학생2", "학생3", "학생4", "학생5", "학생6"].map((t, i) => cell(p(r(t, { size: 14, bold: true, color: C.white }), { align: AlignmentType.CENTER }), { w: w[i], fill: C.ink, borders: bd })), { header: true })];
  for (let i = 1; i <= n; i++) rows.push(row(w.map((x, j) => cell(p(r(j ? "" : String(i), { size: 14 }), { align: AlignmentType.CENTER }), { w: x, borders: bd, fill: j ? undefined : C.light, mt: 10, mb: 10 })), { h: 260 }));
  return [p(r("오답 체크표", { size: 22, bold: true }), { before: 300, after: 60, pb: true }), p(r("틀린 문항에 ✓ → 재시험·개인별 재시험 가중 출제", { size: 16, color: C.gray }), { after: 100 }), table(w, rows)];
}

(async () => {
  for (const teacher of [false, true]) {
    const ans = teacher;
    const parts = [
      { children: study(teacher), right: HR(`학습지${teacher ? " (교사용)" : ""}`) },
      { children: sentTest("A", ans), right: HR(`문장 테스트 A형${ans ? " 답지" : ""}`) },
      { children: grammarTest("A", ans), right: HR(`어법 집중 A형${ans ? " 답지" : ""}`) },
      { children: writeTest(ans), right: HR(`변형 서술형${ans ? " 답지" : ""}`) },
      { children: mock(1, ans), right: HR(`모의고사 SET 1${ans ? " 답지" : ""}`) },
      { children: mock(2, ans), right: HR(`모의고사 SET 2${ans ? " 답지" : ""}`) },
      { children: sentTest("B", ans), right: HR(`재시험 · 문장 테스트 B형${ans ? " 답지" : ""}`) },
      { children: sentTest("C", ans), right: HR(`재시험 · 문장 테스트 C형${ans ? " 답지" : ""}`) },
      { children: grammarTest("B", ans), right: HR(`재시험 · 어법 집중 B형${ans ? " 답지" : ""}`) },
      { children: grammarTest("C", ans), right: HR(`재시험 · 어법 집중 C형${ans ? " 답지" : ""}`) },
    ];
    const ed = teacher ? "교사용" : "학생용";
    await saveMulti(`${cfg.outDir}/A_L${L}_본문_자료집(${ed}).docx`, { term: cfg.term, unitNo: String(L).padStart(2, "0"), part: `${cfg.schoolsShort}  ·  본문`, title: "본문",
      subtitle: R.title, edition: ed, info: [["학교", cfg.schools], ["교재", cfg.book], ["구성", "학습지 · 문장 테스트 · 어법 집중 · 변형 서술형 · 모의고사 SET 1·2 · 재시험 B·C"]] }, parts);
  }
  console.log(JSON.stringify(report));
})().catch((e) => { console.error(e); process.exit(1); });
