// David 대화 파트 — 학습지 2 + 6단계 시험(문제/답지) 12
const fs = require("fs");
const K = require("./common.js");
const { C, CW, r, p, cell, table, row, headRow, save, guide, spacer, testHead, rng, shuffle, AlignmentType, VerticalAlign, NONE, ln } = K;

const cfg = JSON.parse(fs.readFileSync(process.argv[2], "utf8"));
const D = JSON.parse(fs.readFileSync(cfg.dlg, "utf8"));
const L = cfg.lesson, OUT = cfg.outDir;
const dmap = Object.fromEntries(D.dialogues.map((d) => [d.id, d]));
const CIR = ["①", "②", "③", "④", "⑤", "⑥", "⑦", "⑧", "⑨", "⑩", "⑪", "⑫"];
const pass = (n) => n - Math.floor(n / 10);
const report = {};
const fname = (s) => `${OUT}/A_L${L}_대화_${s}.docx`;
const HR = (s) => `${cfg.pubShort} ${L}과 · 대화 ${s}`;
const cover = (edition, info) => ({ term: cfg.term, unitNo: String(L).padStart(2, "0"), part: `${cfg.schoolsShort}  ·  대화`,
  title: "대화", subtitle: cfg.lessonTitle + "  ·  " + (cfg.dlgLabel || "Listen & Talk"), edition, info: [["학교", cfg.schools], ["교재", cfg.book], ...info] });

const plain = (s) => s.replace(/[{}]/g, "");
// {} 구간 → runs. mode: "full" | "blank" | "answer" ; numbering blanks
function segs(s) { const out = []; const re = /\{([^}]*)\}/g; let m, last = 0; while ((m = re.exec(s))) { if (m.index > last) out.push([0, s.slice(last, m.index)]); out.push([1, m[1]]); last = re.lastIndex; } if (last < s.length) out.push([0, s.slice(last)]); return out; }
const blankLen = (t) => "_".repeat(Math.max(8, Math.round(t.length * 1.4)));
function runs(s, mode, size = 19, counter) {
  return segs(s).flatMap(([b, t]) => {
    if (!b) return [r(t, { size })];
    const n = counter ? counter.n++ : null;
    const tag = n != null ? `(${n})` : "";
    if (mode === "full") return [r(t, { size, bold: true, hl: true })];
    if (mode === "blank") return [r(`${tag}${blankLen(t)}`, { size })];
    return [r(`${tag} `, { size, color: C.gray }), r(t, { size, bold: true, color: C.red, under: true })];
  });
}
const spk = (s) => r(s + ":", { size: 19, bold: true });
// 회색 박스 안 대화
// 화자 칸 너비: 한 글자(A/B/G)는 기존 480, 이름(Suji, Tony)이면 글자 수에 맞춰 넓힘
const spkW = (d, base) => Math.max(base, ...d.lines.map((l) => 160 + (l[0].length + 1) * 125));
function dlgBox(d, lineRender, o = {}) {
  const sw = spkW(d, 480);
  const w = [sw, CW - sw - 200];
  const rows = d.lines.map((ln_, i) => row([
    cell(p(spk(ln_[0])), { w: w[0], borders: NOB_(), v: VerticalAlign.TOP, mt: 30, mb: 30 }),
    cell(lineRender(ln_, i), { w: w[1], borders: NOB_(), v: VerticalAlign.TOP, mt: 30, mb: 30 }),
  ]));
  return table([CW], [row([cell([p(r(o.title ?? d.label, { size: 16, bold: true, color: C.gray }), { after: 60 }), table(w, rows)],
    { w: CW, fill: C.light, ml: 160, mr: 40, mt: 120, mb: 120, borders: { top: NONE, bottom: NONE, right: NONE, left: ln(16, C.ink) } })])]);
}
const NOB_ = () => ({ top: NONE, bottom: NONE, left: NONE, right: NONE });
const sectTitle = (t, sub) => [p([r(t, { size: 24, bold: true }), r(sub ? "   " + sub : "", { size: 16, color: C.gray })], { before: 240, after: 100, border: { bottom: ln(6, C.ink) }, keepNext: true })];

// ---------------- 학습지 ----------------
async function study(teacher) {
  const body = [p(r("DIALOGUE NOTE", { size: 16, bold: true, color: C.gray }), { after: 40 }),
    p(r(`Lesson ${L} 대화 학습지`, { size: 42, bold: true }), { after: 80 }),
    p(r(`${cfg.book}  ·  대화 ${D.dialogues.length}개  ·  형광 = 시험 빈칸 핵심 표현`, { size: 17, color: C.gray }), { after: 120, border: { bottom: ln(8, C.ink) } })];
  D.dialogues.forEach((d, k) => {
    body.push(...sectTitle(`${k + 1}. ${d.label}`, "□□□"));
    const sw = spkW(d, 460);
    const w = [sw, (CW - sw) * 0.56, (CW - sw) * 0.44].map(Math.round); w[2] = CW - w[0] - w[1];
    const rows = [headRow(w, ["", "Dialogue", "해석"])];
    // 해설 번호 위첨자 위치 찾기
    const perLine = d.lines.map(() => []);
    d.notes.forEach((n, i) => {
      const an = (cfg.anchors || {})[`${d.id}-${i + 1}`];
      if (Array.isArray(an)) { // 같은 해설 번호를 여러 곳에 (예: ③ I heard that ~ / The Internet says ~)
        an.forEach((a) => { const li = d.lines.findIndex((l) => plain(l[1]).includes(a)); if (li >= 0) perLine[li].push({ a, i }); else (report.missAnchor = report.missAnchor || []).push(`${d.id}-${i + 1}:${a}`); });
        return;
      }
      const cands = [an, ...n.split(":")[0].replace(/\(I\)\s*/, "").split(/ \/ |~|\+/).map((x) => x.replace(/[{}]/g, "").trim())].filter((x) => x && x.length > 1);
      for (const a of cands) { const li = d.lines.findIndex((l) => plain(l[1]).includes(a)); if (li >= 0) { perLine[li].push({ a, i }); return; } }
      (report.missAnchor = report.missAnchor || []).push(`${d.id}-${i + 1}`);
    });
    d.lines.forEach((l, li) => rows.push(row([
      cell(p(spk(l[0])), { w: w[0], v: VerticalAlign.TOP }),
      cell(p(K.annotated(l[1], perLine[li].map((x) => ({ pos: plain(l[1]).indexOf(x.a) + x.a.length, label: CIR[x.i] })).sort((a, b) => a.pos - b.pos),
        (t, key) => key ? [r(t, { size: 19, bold: true, hl: true })] : [r(t, { size: 19 })], false)), { w: w[1], v: VerticalAlign.TOP }),
      cell(p(r(l[2], { size: 16, color: C.gray })), { w: w[2], v: VerticalAlign.TOP }),
    ])));
    body.push(table(w, rows));
    body.push(p(r("구문 해설", { size: 17, bold: true }), { before: 120, after: 40, keepNext: true }));
    d.notes.forEach((n, i) => body.push(p([r(CIR[i] + " ", { size: 17, bold: true }), ...runs(n, teacher ? "answer" : "blank", 17).map((x) => x)], { after: 30, indent: { left: 200 } })));
  });
  // 핵심 표현 정리
  body.push(...sectTitle("핵심 표현 정리", "의사소통 기능"));
  const w = [1900, 4300, CW - 6200];
  const rows = [headRow(w, ["기능", "표현", "뜻"])];
  D.expressions.forEach((e) => rows.push(row([
    cell(p(r(e[0], { size: 17, bold: true })), { w: w[0] }),
    cell(p(runs(e[1], teacher ? "answer" : "blank", 18)), { w: w[1] }),
    cell(p(r(e[2], { size: 16, color: C.gray })), { w: w[2] }),
  ])));
  body.push(table(w, rows));
  await save(fname(`학습지(${teacher ? "교사용" : "학생용"})`), cover(teacher ? "교사용" : "학생용", [["구성", `대화 ${D.dialogues.length}개 · 구문 해설 · 핵심 표현 정리`]]), body, HR("학습지"));
}

// ---------------- 순서 도우미 ----------------
function orderFor(n, avoid, seed) { const rnd = rng(seed); const idx = [...Array(n).keys()]; for (let t = 0; t < 50000; t++) { const o = shuffle(idx, rnd); if (o.every((v, i) => v !== i && avoid.every((a) => a[i] !== v))) return o; } return shuffle(idx, rnd); }
const dIds = D.dialogues.map((d) => d.id);

async function testFiles(stage, kind, title, info, crit, guideText, build) {
  for (const ans of [false, true]) {
    const body = [...testHead({ kicker: "DIALOGUE TEST", title, info, answer: ans, criteria: crit }),
      ...(ans ? [] : [guide([r(guideText, { size: 18, bold: true })]), spacer(120)]), ...build(ans)];
    if (ans) body.push(...wrong(report["n" + stage]));
    await save(fname(`${stage}단계_${kind}_${ans ? "답지" : "문제"}(A형)`), cover(ans ? "교사용" : "학생용", [["시험", `${title}  ·  ${info.split("  ·  ").slice(1, 3).join(" · ")}`]]), body, HR(`${title} ${ans ? "답지" : "문제"}`));
  }
}
function wrong(n) {
  const wNo = 900, wS = Math.floor((CW - wNo) / 6);
  const w = [wNo, ...Array(6).fill(wS)]; w[6] = CW - wNo - wS * 5;
  const bd = { top: ln(4, C.rule), bottom: ln(4, C.rule), left: ln(4, C.rule), right: ln(4, C.rule) };
  const rows = [row(["문항", ...[1, 2, 3, 4, 5, 6].map((i) => "학생" + i)].map((t, i) => cell(p(r(t, { size: 14, bold: true, color: C.white }), { align: AlignmentType.CENTER }), { w: w[i], fill: C.ink, borders: bd })), { header: true })];
  for (let i = 1; i <= n; i++) rows.push(row(w.map((x, j) => cell(p(r(j ? "" : String(i), { size: 14 }), { align: AlignmentType.CENTER }), { w: x, borders: bd, fill: j ? undefined : C.light, mt: 10, mb: 10 })), { h: 280 }));
  return [p(r("오답 체크표", { size: 22, bold: true }), { before: 300, after: 60, pb: true }), p(r("틀린 문항에 ✓ → 재시험(B·C형) 가중 출제", { size: 16, color: C.gray }), { after: 100 }), table(w, rows)];
}

// ---------------- 1·2단계 빈칸 ----------------
async function stage12(stage) {
  const order = orderFor(dIds.length, stage === 1 ? [] : [report.o1], stage === 1 ? 101 : 202);
  report["o" + stage] = order;
  const nBlank = D.dialogues.reduce((a, d) => a + d.lines.reduce((b, l) => b + segs(l[1]).filter((s) => s[0]).length, 0), 0);
  report["n" + stage] = nBlank;
  const pn = pass(nBlank);
  const title = stage === 1 ? "1단계 · 빈칸 (보기 O)" : "2단계 · 빈칸 (보기 X)";
  const info = `대화 ${dIds.length}개  ·  빈칸 ${nBlank}개  ·  ${stage === 1 ? 12 : 15}분  ·  통과 ${pn}개 이상 (오답 ${nBlank - pn}개까지)`;
  const crit = ["빈칸 1개 = 1점 · 철자·대소문자·띄어쓰기·아포스트로피(’) 하나라도 틀리면 오답", stage === 1 ? "보기 표현은 그대로 옮겨 써야 정답" : "원문 표현 기준 · 동의 표현(예: Do you know how to ↔ Can you tell me how to)은 해당 빈칸에서 인정 ✗ (원문 그대로)", `통과 기준 ${pn}/${nBlank}`];
  await testFiles(stage, stage === 1 ? "빈칸보기" : "빈칸해석", title, info, crit,
    stage === 1 ? "<보기>에서 알맞은 표현을 골라 빈칸에 쓰시오. (보기는 대화마다 따로)" : "해석을 참고하여 빈칸에 알맞은 말을 쓰시오.",
    (ans) => {
      const out = []; const counter = { n: 1 };
      order.forEach((di, k) => {
        const d = D.dialogues[di];
        const items = d.lines.flatMap((l) => segs(l[1]).filter((s) => s[0]).map((s) => s[1]));
        if (stage === 1 && !ans) {
          const bo = orderFor(items.length, [], 300 + k).map((i) => items[i]);
          out.push(p([r("<보기>  ", { size: 17, bold: true }), r(bo.join("   /   "), { size: 17 })], { before: 200, after: 60, border: { top: ln(4, C.rule2), bottom: ln(4, C.rule2) }, keepNext: true }));
        } else out.push(spacer(160));
        out.push(dlgBox(d, (l) => [p(runs(l[1], ans ? "answer" : "blank", 19, counter)), ...(stage === 2 ? [p(r(l[2], { size: 15, color: C.gray }))] : [])], { title: `[${k + 1}]` }));
      });
      return out;
    });
}

// ---------------- 3단계 단어 배열 ----------------
async function stage3() {
  const items = D.stage3; const n = items.length; report.n3 = n;
  const order = orderFor(n, [], 404);
  const title = "3단계 · 단어 배열";
  const info = `대화 핵심 문장 ${n}개  ·  ${n}문항  ·  12분  ·  통과 ${pass(n)}개 이상`;
  await testFiles(3, "단어배열", title, info, ["문장 전체(대소문자·문장부호 포함)가 원문과 같아야 정답", "주어진 단어를 모두 한 번씩 사용", `통과 기준 ${pass(n)}/${n}`],
    "우리말과 같은 뜻이 되도록 주어진 단어를 바르게 배열하여 문장을 완성하시오. (문장 첫 글자는 대문자로)", (ans) => {
      const out = [];
      order.forEach((ii, k) => {
        const [, en, ko] = items[ii];
        const toks = en.replace(/[.?!]$/, "").split(" ").map((t, i) => (i === 0 && !/^(I|ENTER|RENT)$/.test(t) ? t[0].toLowerCase() + t.slice(1) : t).replace(/,$/, ","));
        let sh; for (let s = 0; ; s++) { sh = shuffle(toks, rng(500 + k * 7 + s)); if (sh.join(" ") !== toks.join(" ")) break; }
        out.push(p([r(`${k + 1}. `, { size: 19, bold: true }), r(ko, { size: 19 })], { before: 160, after: 60, keepNext: true }));
        out.push(p(r(`( ${sh.join(" / ")} )`, { size: 17, color: C.gray }), { after: 80, indent: { left: 300 }, keepNext: true }));
        out.push(p(r(ans ? en : "→ " + "_".repeat(78), { size: 19, bold: ans, color: ans ? C.red : C.ink }), { indent: { left: 300 }, after: 60 }));
      });
      return out;
    });
}

// ---------------- 4단계 순서 배열 ----------------
const S4CACHE = {};
async function stage4() {
  const ids = D.stage4; const n = ids.length; report.n4 = n;
  const order = orderFor(n, [], 606);
  const title = "4단계 · 순서 배열";
  const info = `대화 ${n}개  ·  ${n}문항  ·  12분  ·  통과 ${pass(n)}개 이상`;
  report.s4ans = [];
  await testFiles(4, "순서배열", title, info, ["순서 전체가 맞아야 1점 (부분 점수 없음)", "첫 문장은 고정", `통과 기준 ${pass(n)}/${n}`],
    "첫 문장 다음에 이어질 대화의 순서를 바르게 배열하시오.", (ans) => {
      const out = [];
      order.forEach((ii, k) => {
        const d = dmap[ids[ii]]; const rest = d.lines.slice(1);
        const lab = "ABCDEFGHIJKLMNOP"; // v1.2: 대사 11개 이상(Real Life Talk 12줄)도 라벨 부족 없이
        // v1.2: 정답 순서에 연속 알파벳 3개(A–B–C, F–G–H 등)가 생기지 않게 시드 조정
        const runOk = (o) => { const inv = o.map((_, ri) => o.indexOf(ri)); for (let i = 0; i + 2 < inv.length; i++) { const d1 = inv[i + 1] - inv[i], d2 = inv[i + 2] - inv[i + 1]; if (d1 === d2 && Math.abs(d1) === 1) return false; } return true; };
        let sh; for (let s4 = 0; s4 < 500; s4++) { sh = orderFor(rest.length, [], 700 + k + s4 * 1000); if (runOk(sh)) break; }
        if (rest.length <= 3) { // 짧은 대화: 순열 수가 적어 정답이 반복되지 않게 이전 정답과 다른 순서 선택
          const perms = rest.length === 3 ? [[1,2,0],[2,0,1],[0,2,1],[2,1,0],[1,0,2]] : [[1,0]];
          const cache = (S4CACHE[rest.length] = S4CACHE[rest.length] || {});
          if (!cache[k]) { const used = Object.values(cache).map((x) => x.join("")); const cand = perms.filter((pp) => !used.includes(pp.join(""))); cache[k] = (cand.length ? cand : perms)[k % (cand.length || perms.length)]; }
          sh = cache[k];
        }
        out.push(p(r(`${k + 1}.`, { size: 20, bold: true }), { before: 200, after: 60, keepNext: true }));
        const sw4 = spkW(d, 480); const w = [700, sw4, CW - 700 - sw4];
        const rows = [row([cell(p(r("첫 문장", { size: 14, color: C.gray })), { w: w[0] }), cell(p(spk(d.lines[0][0])), { w: w[1] }), cell(p(r(plain(d.lines[0][1]), { size: 18 })), { w: w[2] })])];
        sh.forEach((ri, j) => rows.push(row([cell(p(r(`(${lab[j]})`, { size: 18, bold: true })), { w: w[0] }), cell(p(spk(rest[ri][0])), { w: w[1] }), cell(p(r(plain(rest[ri][1]), { size: 18 })), { w: w[2] })])));
        out.push(table(w, rows));
        const seq = rest.map((_, ri) => lab[sh.indexOf(ri)]).join(" – ");
        if (k === 0 || ans) report.s4ans[k] = seq;
        out.push(p(r(ans ? "정답: " + seq : "정답: ______________________________________", { size: 19, bold: ans, color: ans ? C.red : C.ink }), { before: 80, after: 60 }));
      });
      return out;
    });
}

// ---------------- 5단계 T/F (+ 고난도 '모두 고르시오') ----------------
const SYM = ["ⓐ", "ⓑ", "ⓒ", "ⓓ", "ⓔ", "ⓕ"];
function hardAnswer(h) {
  const pick = (f) => h.opts.map((o, i) => (f(o) ? SYM[i] : null)).filter(Boolean).join("");
  if (h.kind === "cannot") return pick((o) => !o[1]);
  if (h.kind === "can" || h.kind === "true") return pick((o) => o[1]);
  if (h.kind === "false") return pick((o) => !o[1]);
  if (h.kind === "count") return CIR[h.opts.filter((o) => o[1]).length - 1];
}
async function stage5() {
  const items = D.stage5; const hard = D.stage5b || []; const n = items.length; report.n5 = n;
  const tot = n + hard.length * 2, pn = tot - Math.floor(tot / 10);
  // 대화 순서 섞기 + 대화 안 문항 섞기 → 전체 TF 패턴 검사(TFTF·FTFT 교대, 같은 답 4연속 금지, 원래 순서와 같은 위치 최소화)
  let seq, seed = 808;
  // v1.3: 대화별로 이어 붙이며 검사(문항 100개 안팎이면 전체 무작위 재시도로는 조건 만족 순서를 못 찾아 무한 루프)
  const badTF = (tf) => { for (let i = 0; i + 3 < tf.length; i++) if (/^(TFTF|FTFT)$/.test(tf.slice(i, i + 4))) return true; return /TTTT|FFFF/.test(tf); };
  for (;;) {
    const dord = orderFor(dIds.length, [], seed++);
    seq = []; let okAll = true;
    for (const di of dord) {
      const its = items.map((x, i) => [x, i]).filter(([x]) => x[0] === dIds[di]);
      let placed = false;
      for (let t = 0; t < 3000 && !placed; t++) {
        const sh = shuffle(its, rng(seed * 31 + di * 7 + t * 1009));
        const ix = sh.map(([, i]) => i);
        if (ix.length > 1 && ix.every((v, k) => k === 0 || v > ix[k - 1])) continue; // 원문 순서 그대로 금지
        const tf = seq.map(([x]) => x[2]).join("").slice(-3) + sh.map(([x]) => x[2]).join("");
        if (badTF(tf)) continue;
        seq.push(...sh); placed = true;
      }
      if (!placed) { okAll = false; break; }
    }
    if (okAll) { report.tf = seq.map(([x]) => x[2]).join(""); break; }
  }
  report.hard = hard.map(hardAnswer);
  const title = "5단계 · 내용 일치 T/F";
  const info = `대화 ${dIds.length}개  ·  T/F ${n}문항 + 고난도 ${hard.length}문항  ·  ${tot}점  ·  20분  ·  통과 ${pn}점 이상`;
  await testFiles(5, "TF", title, info, ["T/F 1문항 = 1점 · 고난도(모두 고르기·개수) 1문항 = 2점, 모두 맞혀야 정답(부분 점수 없음)", "F 문항은 틀린 부분을 고쳐 쓰게 해도 좋음(선택)", "※ 문항은 자체 제작 (대화 원문은 교과서 그대로)", `통과 기준 ${pn}/${tot}`],
    "대화의 내용과 일치하면 T, 일치하지 않으면 F에 ○ 하시오. ★고난도 문항은 해당하는 것을 모두 골라 기호를 쓰시오. (자체 제작)", (ans) => {
      const out = []; let curD = null, q = 1;
      const flushHard = (id) => {
        const h = hard.find((x) => x.d === id); if (!h) return;
        out.push(p([r(`${q++}. `, { size: 19, bold: true }), r("★고난도  ", { size: 15, bold: true, color: C.coral }), r(h.q, { size: 19, bold: true }), r("  (2점)", { size: 15, color: C.gray })], { before: 140, after: 60, keepNext: true, indent: { left: 200 } }));
        h.opts.forEach((o, j) => {
          const hit = h.kind === "count" ? false : (h.kind === "cannot" || h.kind === "false" ? !o[1] : o[1]);
          out.push(p([r(`${SYM[j]} `, { size: 18, bold: ans && hit, color: ans && hit ? C.red : C.ink }), r(o[0], { size: 18, bold: ans && hit, color: ans && hit ? C.red : C.ink }),
            ...(ans ? [r(`   → ${o[1] ? (h.kind === "can" || h.kind === "cannot" ? "답할 수 있음" : "일치") : (h.kind === "can" || h.kind === "cannot" ? "답할 수 없음" : "불일치")} · ${o[2]}`, { size: 14, color: C.gray })] : [])],
            { indent: { left: 500 }, after: 20, keepNext: true }));
        });
        if (h.kind === "count") out.push(p(r("①  1개      ②  2개      ③  3개      ④  4개      ⑤  5개", { size: 18 }), { indent: { left: 500 }, before: 40, keepNext: true }));
        out.push(p(r(ans ? `정답: ${hardAnswer(h)}` : (h.kind === "count" ? "정답: (        )" : "정답: ______________________"), { size: 19, bold: true, color: ans ? C.red : C.ink }), { indent: { left: 500 }, before: 60, after: 80 }));
      };
      seq.forEach(([x]) => {
        if (x[0] !== curD) { if (curD) flushHard(curD); curD = x[0]; out.push(spacer(140)); out.push(dlgBox(dmap[curD], (l) => [p(r(plain(l[1]), { size: 18 }))])); out.push(spacer(60)); }
        out.push(p([r(`${q++}. `, { size: 19, bold: true }), r(x[1], { size: 19 }), r("\t", {}), r(ans ? `  ${x[2]}` : "   T  /  F", { size: 19, bold: true, color: ans ? C.red : C.ink })],
          { after: ans ? 10 : 80, tabs: [{ type: "right", position: CW }], indent: { left: 200 } }));
        if (ans) out.push(p(r(`근거: ${x[3]}${x[4] ? "   [함정: " + x[4] + "]" : ""}`, { size: 15, color: C.gray }), { after: 70, indent: { left: 500 } }));
      });
      if (curD) flushHard(curD);
      return out;
    });
}

// ---------------- 6단계 답할 수 없는 질문 ----------------
async function stage6() {
  const items = D.stage6; const n = items.length; report.n6 = n;
  const ansNos = cfg.s6answers; // 정답 번호(1~5) 목록, 문항 순서대로
  const order = orderFor(n, [], 909);
  const title = "6단계 · 답할 수 없는 질문";
  const info = `대화 ${n}개  ·  ${n}문항  ·  15분  ·  통과 ${pass(n)}개 이상  ·  자체 제작`;
  await testFiles(6, "답할수없는질문", title, info, ["정답 1개 · 1문항 = 1점", "※ 문항은 자체 제작 (대화 원문은 교과서 그대로)", `통과 기준 ${pass(n)}/${n}`],
    "대화를 읽고, 대화의 내용으로 답할 수 없는 질문을 고르시오. (자체 제작)", (ans) => {
      const out = [];
      order.forEach((ii, k) => {
        const it = items[ii]; const d = dmap[it.d]; const a = ansNos[k];
        // 답할 수 있는 4개를 대화 순서와 다르게 섞고, 정답을 a 위치에
        const okOrd = orderFor(4, [], 950 + k).map((i) => it.ok[i]);
        const opts = okOrd.map((o) => ({ q: o[0], ok: o })); opts.splice(a - 1, 0, { q: it.ans, ok: null });
        out.push(p(r(`${k + 1}. 다음 대화를 읽고 답할 수 없는 질문은?`, { size: 20, bold: true }), { before: 240, after: 80, keepNext: true }));
        out.push(dlgBox(d, (l) => [p(r(plain(l[1]), { size: 18 }))], { title: d.label }));
        opts.forEach((o, j) => {
          out.push(p([r(`${CIR[j]} `, { size: 19, bold: ans && !o.ok, color: ans && !o.ok ? C.red : C.ink }), r(o.q, { size: 19, bold: ans && !o.ok, color: ans && !o.ok ? C.red : C.ink })], { before: 40, indent: { left: 300 }, keepNext: j < 4 || ans }));
          if (ans) out.push(p(r(o.ok ? `→ ${o.ok[1]}  [근거: ${o.ok[2]}번째 대사]` : `→ 정답 · 함정: ${it.trap} — ${it.why}`, { size: 15, color: o.ok ? C.gray : C.red }), { indent: { left: 650 }, keepNext: j < 4 }));
        });
      });
      return out;
    });
  report.s6 = ansNos;
}

(async () => {
  await study(true); await study(false);
  await stage12(1); await stage12(2); await stage3(); await stage4(); await stage5(); await stage6();
  fs.writeFileSync(OUT + "/_report.json", JSON.stringify(report));
  console.log(JSON.stringify(report));
})().catch((e) => { console.error(e); process.exit(1); });
