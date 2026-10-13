// 문법 스크립트 정답 패턴 검사: choice (A / B) 정답 위치 · mcq 정답 번호 · multi 정답 집합 · fill 보기 순서
// usage: node check_grammar.js ../../david/build_G-xxx.js
const path = require('path');
const D0 = require(path.resolve(__dirname, '../../david/david_base.js'));
const levels = [];
const origDrill = D0.drill;
D0.drill = (n, title, L, mode) => { if (mode === 'teacher') levels.push(...L.map((x) => ({ ...x, n }))); return origDrill(n, title, L, mode); };
D0.render = async (meta, build) => { build('teacher'); return []; };
require(path.resolve(process.argv[2]));
setTimeout(() => {
  const bad = (s) => /AAA|BBB|ABAB|BABA|AABBAA|BBAABB/.test(s);
  for (const L of levels) {
    if (L.type === 'choice') {
      const pos = L.items.map((it) => { const m = it.q.match(/\(([^()]*?) \/ ([^()]*?)\)/); if (!m) return '?'; const a = it.a.replace(/[^\w’' -]/g, '').trim();
        return m[1].trim() === it.a.trim() ? 'A' : m[2].trim() === it.a.trim() ? 'B' : '?'; }).join('');
      console.log(`P${L.n} ${L.level} choice ${pos} ${bad(pos) || pos.includes('?') ? '<<< CHECK' : 'ok'}`);
    } else if (L.type === 'mcq') {
      const s = L.items.map((it) => it.a).join('');
      const nums = L.items.map((it) => '①②③④⑤'.indexOf(it.a) + 1);
      const seq = nums.some((v, i) => i >= 2 && v - nums[i - 1] === nums[i - 1] - nums[i - 2] && Math.abs(v - nums[i - 1]) === 1);
      const same3 = nums.some((v, i) => i >= 2 && v === nums[i - 1] && v === nums[i - 2]);
      console.log(`P${L.n} ${L.level} mcq ${s} ${seq || same3 ? '<<< CHECK' : 'ok'}`);
    } else if (L.type === 'multi') {
      console.log(`P${L.n} ${L.level} multi ${L.items.map((it) => it.a).join(' | ')}`);
    } else if (L.type === 'fill' && L.bogi) {
      const ans = L.items.map((it) => (it.q.match(/\[\[(.*?)\]\]/) || [])[1]);
      const idx = ans.map((a) => L.bogi.findIndex((b) => b.toLowerCase() === (a || '').toLowerCase()));
      const runs = idx.some((v, i) => i >= 2 && v - idx[i - 1] === 1 && idx[i - 1] - idx[i - 2] === 1);
      console.log(`P${L.n} ${L.level} fill bogi-idx ${idx.join(',')} ${idx.includes(-1) && L.bogi.length === L.items.length ? '<<< missing' : ''}${runs ? '<<< seq' : ''}`);
    }
  }
}, 300);
