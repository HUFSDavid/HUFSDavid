// dialogue.js 5단계 T/F 배열을 그대로 재현해 정답 패턴(2-2 교대 등)을 미리 검사 — 문항 입력 순서만 바꿔 패턴 없는 배열을 찾음
const K = require("../../lib/common.js"); const { rng, shuffle } = K; const fs = require("fs");
const D = JSON.parse(fs.readFileSync(process.argv[2], "utf8"));
const dIds = D.dialogues.map((d) => d.id);
function orderFor(n, avoid, seed) { const rnd = rng(seed); const idx = [...Array(n).keys()]; for (let t = 0; t < 50000; t++) { const o = shuffle(idx, rnd); if (o.every((v, i) => v !== i && avoid.every((a) => a[i] !== v))) return o; } return shuffle(idx, rnd); }
const items = D.stage5;
const badTF = (tf) => { for (let i = 0; i + 3 < tf.length; i++) if (/^(TFTF|FTFT)$/.test(tf.slice(i, i + 4))) return true; return /TTTT|FFFF/.test(tf); };
let seq, seed = 808;
for (;;) { const dord = orderFor(dIds.length, [], seed++); seq = []; let okAll = true;
  for (const di of dord) { const its = items.map((x, i) => [x, i]).filter(([x]) => x[0] === dIds[di]); let placed = false;
    for (let t = 0; t < 3000 && !placed; t++) { const sh = shuffle(its, rng(seed * 31 + di * 7 + t * 1009)); const ix = sh.map(([, i]) => i);
      if (ix.length > 1 && ix.every((v, k) => k === 0 || v > ix[k - 1])) continue;
      const tf = seq.map(([x]) => x[2]).join("").slice(-3) + sh.map(([x]) => x[2]).join(""); if (badTF(tf)) continue; seq.push(...sh); placed = true; }
    if (!placed) { okAll = false; break; } }
  if (okAll) break; }
console.log(seq.map(([x]) => x[2]).join(""));
