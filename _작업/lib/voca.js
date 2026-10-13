// David 내신단어 5스텝 — A 기본단어 (exam4u WORD TEST 기반)
// usage: node voca.js config.json
const fs = require("fs");
const K = require("./common.js");
const { C, CW, r, p, cell, table, row, headRow, save, guide, spacer, testHead, rng, shuffle, AlignmentType, VerticalAlign, NONE, ln } = K;

const cfg = JSON.parse(fs.readFileSync(process.argv[2], "utf8"));
const items = JSON.parse(fs.readFileSync(cfg.data, "utf8"));
const mut = JSON.parse(fs.readFileSync(cfg.mut, "utf8"));
const L = cfg.lesson; // "7"
const OUT = cfg.outDir;
const N = items.length;
const report = { checks: [] };

const posOf = (it) => (it.pos.match(/^(n|v|a|adv|conj|prep|pron|int)\./) || ["phr"])[0];
const isPhrase = (it) => /\s/.test(it.en.replace(/\s*\(.*\)/, "")) && !it.pos;
const wcount = (en) => en.replace(/\s*\(.*?\)/g, "").trim().split(/\s+/).length;
const meaningFull = (it) => it.pos ? it.pos : (it.en === "needs" ? "pl. " + it.ko : it.ko);
const pass = (n) => n - Math.floor(n / 10);

// ---------- 셔플 ----------
function makeOrder(list, others, seed) {
  const n = list.length, idx = [...Array(n).keys()];
  const rnd = rng(seed);
  const ok = (o, strict) => {
    for (let i = 0; i < n; i++) {
      if (o[i] === i) return false;
      for (const q of others) if (q[i] === o[i]) return false;
      if (i > 0 && Math.abs(o[i] - o[i - 1]) === 1) return false;
      if (i > 0 && list[o[i]].en.slice(0, 2).toLowerCase() === list[o[i - 1]].en.slice(0, 2).toLowerCase()) return false;
      if (strict && i > 1) { const a = posOf(list[o[i]]); if (a !== "phr" && a === posOf(list[o[i - 1]]) && a === posOf(list[o[i - 2]])) return false; }
    }
    return true;
  };
  for (let t = 0; t < 200000; t++) { const o = shuffle(idx, rnd); if (ok(o, true)) return o; }
  for (let t = 0; t < 200000; t++) { const o = shuffle(idx, rnd); if (ok(o, false)) { report.checks.push("품사3연속 완화"); return o; } }
  throw new Error("shuffle fail");
}

// 영영 정의 변형
function mutate(def, m) {
  const toks = def.split(" ");
  const i = toks.findIndex((t) => t.replace(/[.,]/g, "") === m[0]);
  if (i < 0) throw new Error("mut token not found: " + def + " / " + m[0]);
  const t2 = toks.slice(); t2[i] = toks[i].replace(m[0], m[1]);
  return { text: t2.join(" "), i, toks, t2 };
}

const ee = items.filter((it) => it.ee);
const NE = ee.length;
const coverBase = (title, subtitle, edition, info) => ({
  term: cfg.term, unitNo: String(L).padStart(2, "0"), part: `${cfg.schoolsShort}  ·  단어`, title: "단어", subtitle, edition,
  info: [["학교", cfg.schools], ["교재", cfg.book], ...info],
});
const fname = (s) => `${OUT}/A_L${L}_기본단어_${s}.docx`;
const HR = (s) => `${cfg.pubShort} ${L}과 · ${s}`;

// ---------- 0. 학습지 ----------
function hlExample(ex, word) {
  const base = word.replace(/\s*\(.*\)/, "").split(" ")[0].toLowerCase();
  const stem = base.length > 4 ? base.slice(0, base.length - (/(e|y)$/.test(base) ? 1 : 0)) : base;
  const re = new RegExp("\\b(" + stem.replace(/[.*+?^${}()|[\]\\]/g, "\\$&") + "[a-z]*)\\b", "i");
  const m = ex.match(re);
  if (!m || isPhrase({ en: word, pos: "" }) && word.includes(" ")) return [r(ex, { size: 16 })];
  return [r(ex.slice(0, m.index), { size: 16 }), r(m[0], { size: 16, bold: true, hl: true }), r(ex.slice(m.index + m[0].length), { size: 16 })];
}
async function studySheet() {
  const w = [560, 1750, 1900, 2850, CW - 7060];
  const rows = [headRow(w, ["No", "단어", "뜻", "영영풀이", "예문 · 해석"])];
  for (const it of items) {
    const e = it.ee;
    const eeCell = e ? [p(r(e.defs[0][0], { size: 16 })), p(r(e.defs[0][1], { size: 14, color: C.gray }), { before: 20 }),
      ...(e.defs[1] ? [p(r(e.defs[1][0], { size: 16 }), { before: 40 }), p(r(e.defs[1][1], { size: 14, color: C.gray }))] : []),
      ...((e.syn || e.opp) ? [p([e.syn ? r("SYN " + e.syn + "  ", { size: 14, color: C.gray }) : r(""), e.opp ? r("OPP " + e.opp, { size: 14, color: C.gray }) : r("")], { before: 30 })] : [])]
      : [p(r("–", { size: 16, color: C.gray }))];
    const exCell = it.ex ? [p(hlExample(it.ex[0], it.en)), p(r(it.ex[1], { size: 14, color: C.gray }), { before: 20 })] : [p(r("–", { size: 16, color: C.gray }))];
    rows.push(row([
      cell([p(r(String(it.no), { size: 17, bold: true }), { align: AlignmentType.CENTER }), p(r("□□□", { size: 13, color: C.gray }), { align: AlignmentType.CENTER })], { w: w[0], v: VerticalAlign.TOP }),
      cell([p(r(it.en, { size: it.en.length > 12 ? 19 : 23, bold: true })), ...(it.extra ? [p(r(it.extra, { size: 14, color: C.gray }))] : [])], { w: w[1], v: VerticalAlign.TOP }),
      cell(p(r(meaningFull(it), { size: 18 })), { w: w[2], v: VerticalAlign.TOP }),
      cell(eeCell, { w: w[3], v: VerticalAlign.TOP }),
      cell(exCell, { w: w[4], v: VerticalAlign.TOP }),
    ], { cantSplit: true }));
  }
  const body = [
    p(r("VOCA NOTE", { size: 16, bold: true, color: C.gray }), { after: 40 }),
    p(r(`Lesson ${L} 기본단어 암기지`, { size: 42, bold: true }), { after: 80 }),
    p(r(`${cfg.book}  ·  단어 ${N}개 (영영풀이 ${NE}개)  ·  회독할 때마다 □에 체크`, { size: 17, color: C.gray }), { after: 120, border: { bottom: ln(8, C.ink) } }),
    table(w, rows),
  ];
  await save(fname("0단계_암기지"), coverBase("", cfg.lessonTitle, "학생용", [["구성", `암기지 · 단어 ${N}개 · 영영풀이 ${NE}개 · 예문`]]), body, HR("암기지"));
}

// ---------- 공통: 2단 문항 표 ----------
function twoCol(list, render, wq) {
  // render(it, i) => [leftCellChildren(prompt), rightCellChildren(answer)]
  const half = Math.ceil(list.length / 2);
  const wNo = 520, wA = (CW - 200) / 2 - wNo - wq;
  const w = [wNo, wq, wA, 200, wNo, wq, wA];
  const rows = [];
  for (let i = 0; i < half; i++) {
    const L1 = render(list[i], i), R1 = list[i + half] ? render(list[i + half], i + half) : null;
    const c = (x, wi, o = {}) => cell(x, { w: wi, ...o });
    rows.push(row([
      c(p(r(String(i + 1), { size: 17, bold: true }), { align: AlignmentType.CENTER }), wNo), c(L1[0], wq), c(L1[1], wA),
      cell(p(r("")), { w: 200, borders: { top: NONE, bottom: NONE, left: NONE, right: NONE } }),
      c(p(r(R1 ? String(i + half + 1) : "", { size: 17, bold: true }), { align: AlignmentType.CENTER }), wNo), c(R1 ? R1[0] : p(r("")), wq), c(R1 ? R1[1] : p(r("")), wA),
    ], { h: 470 }));
  }
  return table(w, rows);
}
function wrongTable(n) {
  // 오답 체크표: 문항 × 학생 6칸, 3블록
  const blocks = 3, per = Math.ceil(n / blocks);
  const wNo = 420, wS = Math.floor((CW - blocks * wNo - (blocks - 1) * 160) / (blocks * 6));
  const w = []; for (let b = 0; b < blocks; b++) { if (b) w.push(160); w.push(wNo); for (let s = 0; s < 6; s++) w.push(wS); }
  const bd = { top: ln(4, C.rule), bottom: ln(4, C.rule), left: ln(4, C.rule), right: ln(4, C.rule) };
  const gap = () => cell(p(r("")), { w: 160, borders: { top: NONE, bottom: NONE, left: NONE, right: NONE } });
  const hdr = []; for (let b = 0; b < blocks; b++) { if (b) hdr.push(gap()); hdr.push(cell(p(r("No", { size: 13, bold: true, color: C.white }), { align: AlignmentType.CENTER }), { w: wNo, fill: C.ink, borders: bd, mt: 20, mb: 20, ml: 20, mr: 20 }));
    for (let s = 0; s < 6; s++) hdr.push(cell(p(r("학생" + (s + 1), { size: 11, color: C.white }), { align: AlignmentType.CENTER }), { w: wS, fill: C.ink, borders: bd, mt: 20, mb: 20, ml: 10, mr: 10 })); }
  const rows = [row(hdr, { header: true })];
  for (let i = 0; i < per; i++) {
    const cs = [];
    for (let b = 0; b < blocks; b++) { const k = b * per + i + 1; if (b) cs.push(gap());
      cs.push(cell(p(r(k <= n ? String(k) : "", { size: 13 }), { align: AlignmentType.CENTER }), { w: wNo, borders: bd, mt: 10, mb: 10, ml: 20, mr: 20, fill: C.light }));
      for (let s = 0; s < 6; s++) cs.push(cell(p(r("", { size: 13 })), { w: wS, borders: bd, mt: 10, mb: 10, ml: 10, mr: 10 })); }
    rows.push(row(cs, { h: 260 }));
  }
  return [p(r("오답 체크표", { size: 22, bold: true }), { before: 300, after: 60, pb: true }),
    p(r("틀린 문항에 ✓ → 재시험(B·C형)에서 가중 출제", { size: 16, color: C.gray }), { after: 100 }), K.table(w, rows)];
}

// ---------- 1·2단계 ----------
async function stage12(stage, order) {
  const list = order.map((i) => items[i]);
  const n = list.length, passN = pass(n);
  const time = stage === 1 ? 10 : 15;
  const title = stage === 1 ? "1단계 · 영→한" : "2단계 · 한→영";
  const info = `Lesson ${L} 기본단어 전체  ·  ${n}문항  ·  ${time}분  ·  통과 ${passN}개 이상 (오답 ${n - passN}개까지)`;
  for (const ans of [false, true]) {
    const wq = stage === 1 ? 2350 : 2350;
    const render = (it) => {
      if (stage === 1) {
        const q = p(r(it.en, { size: it.en.length > 16 ? 17 : 20, bold: true }));
        const a = ans ? p(r(meaningFull(it), { size: 16, color: C.red })) : p(r(""));
        return [q, a];
      }
      const q = p([r(meaningFull(it), { size: 16 }), ...(wcount(it.en) > 1 ? [r(` (${wcount(it.en)}단어)`, { size: 14, color: C.gray })] : [])]);
      const a = ans ? p(r(it.en, { size: 19, bold: true, color: C.red })) : p(r(""));
      return [q, a];
    };
    const crit = stage === 1
      ? ["쉼표로 나뉜 뜻은 1개만 써도 정답 · 품사(n./v./a.)가 나뉜 단어는 품사별 1개 이상", "* 표시 뜻은 교과서 본문 의미 — 꼭 확인", `통과 기준 ${passN}/${n}  ·  미통과 시 재시험(B·C형)`]
      : ["철자 한 글자 · 띄어쓰기 · 대소문자(문두 아니면 소문자) 다르면 오답", "(n단어) 표시는 구(phrase) — 단어 수까지 맞아야 정답 · (동사원형)은 쓰지 않아도 됨", `통과 기준 ${passN}/${n}  ·  미통과 시 재시험(B·C형)`];
    const body = [
      ...testHead({ kicker: "VOCA TEST", title, info, answer: ans, criteria: crit }),
      ...(ans ? [] : [guide([r(stage === 1 ? "다음 단어 또는 숙어의 뜻을 우리말로 쓰시오." : "다음 우리말에 해당하는 영어 단어 또는 숙어를 쓰시오. (철자 정확히)", { size: 18, bold: true })]), spacer(120)]),
      twoCol(list, render, wq),
      ...(ans ? wrongTable(n) : []),
    ];
    const kind = stage === 1 ? "1단계_영한" : "2단계_한영";
    await save(fname(`${kind}_${ans ? "답지" : "문제"}(A형)`), coverBase("", cfg.lessonTitle, ans ? "교사용" : "학생용",
      [["시험", `${title}  ·  ${n}문항  ·  ${time}분`]]), body, HR(`${title} ${ans ? "답지" : "문제"}`));
  }
}

// ---------- 3·4단계 영영 1·2차 ----------
async function stage34(stage, order, bogiOrder) {
  const list = order.map((i) => ee[i]);
  const n = list.length, passN = pass(n);
  const time = stage === 3 ? 12 : 15;
  const title = stage === 3 ? "3단계 · 영영 1차" : "4단계 · 영영 2차";
  const info = `영영풀이 단어 ${n}개  ·  ${n}문항  ·  ${time}분  ·  통과 ${passN}개 이상  ·  ${stage === 3 ? "보기 있음" : "보기 없음"}`;
  for (const ans of [false, true]) {
    const w = [520, CW - 520 - 1900 - 1900, 1900, 1900];
    const rows = [headRow(w, ["No", "영영풀이", "단어", "뜻"])];
    list.forEach((it, i) => {
      rows.push(row([
        cell(p(r(String(i + 1), { size: 17, bold: true }), { align: AlignmentType.CENTER }), { w: w[0] }),
        cell(p(r(it.ee.defs[0][0], { size: 18 })), { w: w[1] }),
        cell(p(r(ans ? it.en : "", { size: 19, bold: true, color: C.red })), { w: w[2] }),
        cell(p(r(ans ? it.ee.ko_head : "", { size: 16, color: C.red })), { w: w[3] }),
      ], { h: 520 }));
    });
    const bogi = stage === 3 && !ans ? [table([CW], [row([cell([p(r("[보기]", { size: 17, bold: true }), { after: 60 }),
      p(r(bogiOrder.map((i) => ee[i].en).join("   ·   "), { size: 17 }), { line: 320 })], { w: CW, ml: 200, mr: 200, mt: 120, mb: 120,
      borders: { top: ln(8, C.ink), bottom: ln(8, C.ink), left: ln(8, C.ink), right: ln(8, C.ink) } })])]), spacer(160)] : [];
    const crit = ["단어(철자 정확)와 뜻이 모두 맞아야 1점", "뜻은 영영풀이에 해당하는 뜻 기준 · 쉼표로 나뉜 뜻은 1개만 써도 정답", `통과 기준 ${passN}/${n}`];
    const body = [
      ...testHead({ kicker: "VOCA TEST", title, info, answer: ans, criteria: crit }),
      ...(ans ? [] : [guide([r(stage === 3 ? "영영풀이에 해당하는 단어를 [보기]에서 골라 쓰고, 그 뜻을 우리말로 쓰시오." : "영영풀이에 해당하는 단어를 쓰고, 그 뜻을 우리말로 쓰시오.", { size: 18, bold: true })]), spacer(120)]),
      ...bogi, table(w, rows), ...(ans ? wrongTable(n) : []),
    ];
    const kind = stage === 3 ? "3단계_영영1차" : "4단계_영영2차";
    await save(fname(`${kind}_${ans ? "답지" : "문제"}(A형)`), coverBase("", cfg.lessonTitle, ans ? "교사용" : "학생용",
      [["시험", `${title}  ·  ${n}문항  ·  ${time}분`]]), body, HR(`${title} ${ans ? "답지" : "문제"}`));
  }
}

// ---------- 5단계 영영 3차 ----------
async function stage5(order) {
  const list = order.map((i) => ee[i]);
  const n = list.length, passN = pass(n);
  const oIdx = list.findIndex((it) => it.en === mut.O);
  report.oPos = oIdx + 1;
  if (oIdx <= 0 || oIdx === n - 1) throw new Error("O position invalid " + oIdx);
  const title = "5단계 · 영영 3차";
  const info = `영영풀이 단어 ${n}개  ·  ${n}문항  ·  15분  ·  통과 ${passN}개 이상  ·  의미변형 O/X`;
  const types = {};
  for (const ans of [false, true]) {
    const w = ans ? [480, 620, 1500, 1700, CW - 480 - 620 - 1500 - 1700 - 1000, 1000] : [480, 700, 1700, 1800, CW - 480 - 700 - 1700 - 1800];
    const rows = [headRow(w, ans ? ["No", "O/X", "Korean", "English", "영영풀이", "유형"] : ["No", "O/X", "Korean", "English", "영영풀이"])];
    list.forEach((it, i) => {
      const def = it.ee.defs[0][0];
      const isO = it.en === mut.O;
      let defRuns;
      if (isO) defRuns = [r(def, { size: 17 })];
      else {
        const m = mut[it.en]; if (!m) throw new Error("no mutation for " + it.en);
        const mm = mutate(def, m); types[m[2]] = (types[m[2]] || 0) + 1;
        if (!ans) defRuns = [r(mm.text, { size: 17 })];
        else {
          const before = mm.toks.slice(0, mm.i).join(" "), after = mm.toks.slice(mm.i + 1).join(" ");
          const tok = mm.toks[mm.i], wrong = mm.t2[mm.i];
          defRuns = [r(before + (before ? " " : ""), { size: 17 }), r(`${wrong}→${tok}`, { size: 17, bold: true, hl: true, color: C.red }), r((after ? " " : "") + after, { size: 17 })];
        }
      }
      const cells = [
        cell(p(r(String(i + 1), { size: 17, bold: true }), { align: AlignmentType.CENTER }), { w: w[0] }),
        cell(p(r(ans ? (isO ? "O" : "X") : "", { size: 19, bold: true, color: C.red }), { align: AlignmentType.CENTER }), { w: w[1] }),
        cell(p(r(ans ? it.ee.ko_head : "", { size: 15, color: C.red })), { w: w[2] }),
        cell(p(r(it.en, { size: 19, bold: true })), { w: w[3] }),
        cell(p(defRuns), { w: w[4] }),
      ];
      if (ans) cells.push(cell(p(r(isO ? "" : mut[it.en][2], { size: 15, color: C.gray }), { align: AlignmentType.CENTER }), { w: w[5] }));
      rows.push(row(cells, { h: 520 }));
    });
    const crit = ["O/X · 고친 부분 · 뜻이 모두 맞아야 1점", `O는 1개뿐 (${mut.O})  ·  X는 한 곳만 바뀜 → 바뀐 낱말을 원래 낱말로 고쳐 써야 정답`, `통과 기준 ${passN}/${n}`];
    const body = [
      ...testHead({ kicker: "VOCA TEST", title, info, answer: ans, criteria: crit }),
      ...(ans ? [] : [guide([r("단어·뜻과 영영풀이가 맞지 않으면 X 표시 후 바르게 고치고, 맞으면 O 표시 하시오. (Korean 칸에는 뜻을 쓰시오.)", { size: 18, bold: true })]), spacer(120)]),
      table(w, rows), ...(ans ? wrongTable(n) : []),
    ];
    await save(fname(`5단계_영영3차_${ans ? "답지" : "문제"}(A형)`), coverBase("", cfg.lessonTitle, ans ? "교사용" : "학생용",
      [["시험", `${title}  ·  ${n}문항  ·  15분`]]), body, HR(`${title} ${ans ? "답지" : "문제"}`));
  }
  report.types = Object.fromEntries(Object.entries(types).map(([k, v]) => [k, v / 2]));
}

(async () => {
  fs.mkdirSync(OUT, { recursive: true });
  await studySheet();
  const o1 = makeOrder(items, [], 11), o2 = makeOrder(items, [o1], 22);
  await stage12(1, o1); await stage12(2, o2);
  const o3 = makeOrder(ee, [], 33), o4 = makeOrder(ee, [o3], 44), bogi = makeOrder(ee, [o3, o4], 55);
  let o5, seed = 66;
  for (;;) { o5 = makeOrder(ee, [o3, o4], seed++); const k = o5.findIndex((i) => ee[i].en === mut.O); if (k > 0 && k < NE - 1) break; }
  await stage34(3, o3, bogi); await stage34(4, o4); await stage5(o5);
  // 검수
  const chk = (o, n) => new Set(o).size === n && o.length === n;
  report.counts = { all: N, ee: NE, s1: chk(o1, N), s2: chk(o2, N), s3: chk(o3, NE), s4: chk(o4, NE), s5: chk(o5, NE) };
  fs.writeFileSync(OUT + "/_report.json", JSON.stringify(report, null, 1));
  console.log(JSON.stringify(report));
})().catch((e) => { console.error(e); process.exit(1); });
