const D0 = require('./david_base');
const path = require('path');
const fs = require('fs');
// 빈칸 ______ 두 개가 한 문장에 있으면 __밑줄__ 서식으로 잘못 읽히므로 U+200B로 끊어 둔다
const ZB = (s) => s.replace(/_{3,}/g, (u) => u.split('').join('​'));
const deep = (v) => typeof v === 'string' ? ZB(v) : Array.isArray(v) ? v.map(deep)
  : (v && typeof v === 'object' && v.constructor === Object) ? Object.fromEntries(Object.entries(v).map(([k, x]) => [k, deep(x)])) : v;
const D = new Proxy(D0, { get: (t, k) => (typeof t[k] === 'function' && !['render', 'P', 'T', 'image'].includes(k)) ? (...a) => t[k](...deep(a)) : t[k] });
const COVER = JSON.parse(process.env.COVER || '{}');
const TITLE = '시간 접속사 when · before · after';
const meta = { series: D.SERIES.G, code: 'G-시간접속사', title: TITLE, category: 'G. 접속사  |  시간 접속사 when · before · after · 재시험',
  rightText: 'G  시간 접속사 재시험 B', prefix: process.env.PREFIX || '', cover: COVER.title ? { ...COVER, subtitle: (COVER.subtitle || '') + '  ·  재시험 B' } : undefined,
  retest: { set: 'B', total: 10, pass: 9 } };
const build = (m) => [
  ...D.drill(null, '', [
    { level: 'A', type: 'choice', free: true, instr: '괄호 안에서 알맞은 것을 고르시오.', items: [
      { q: 'My work begins (after / before) the shooting is over.', a: 'after', why: '[P2] 본문 — 촬영이 먼저' },
      { q: 'We’ll go home when it (will get / gets) dark.', a: 'gets', why: '[P3] 시간 부사절 → 현재시제' },
      { q: 'He reads comic books when (he has / has) free time.', a: 'he has', why: '[P1] 접속사 뒤 주어 필수' }] },
    { level: 'B', type: 'fill', free: true, instr: '<보기>에서 알맞은 말을 골라 빈칸에 쓰시오. (한 번씩만 사용)', bogi: ['arrives', 'after', 'when', 'before'], items: [
      { q: 'You should wash your hands [[before]] you eat.', why: '[P2] ~하기 전에' },
      { q: 'Max gets too excited [[when]] a lot of people are around.', why: '[P1] 본문 — ~할 때' },
      { q: 'Kevin played outside [[after]] he did his homework.', why: '[P2] ~한 후에' },
      { q: 'I will call you when Amy [[arrives]].', why: '[P3] 미래 의미 → 현재시제' }] },
    { level: 'C', type: 'write', free: true, instr: '어법상 틀린 부분을 찾아 바르게 고쳐 쓰시오.', items: [
      { q: 'I will help my mom when she will cook dinner.', a: 'will cook → cooks', why: '[P3] 시간 부사절 → 현재시제' },
      { q: 'Suho went to bed after he taking a shower.', a: 'taking → took', why: '[P2] 접속사 + 주어 + 동사(과거)' }] },
    { level: 'D', type: 'multi', free: true, instr: '해당하는 것을 모두 골라 기호를 쓰시오.', items: [
      { q: '다음 중 어법상 옳은 문장을 모두 고르시오.', box: [
        '(a) When I was young, I learned Chinese from my dad.', '(b) Before she goes to bed, she writes a diary.', '(c) Peter eats a lot when he stressed.',
        '(d) When it will rain, I will stay home.', '(e) After cleaning the room, I walked my dog.'], a: '(a), (b), (e)', why: '[P1·P2·P3] (c) he is stressed (d) rains' }] },
  ], m),
];
D.render(meta, build, process.argv[2] || '.').then(fs_ => {
  const out = fs_.map(f => { const g = path.join(path.dirname(f), path.basename(f).replace(TITLE, '시간접속사')); fs.renameSync(f, g); return g; });
  console.log(out.join('\n'));
});
