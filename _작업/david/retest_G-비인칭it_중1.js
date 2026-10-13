const D0 = require('./david_base');
const path = require('path');
const fs = require('fs');
// 빈칸 ______ 두 개가 한 문장에 있으면 __밑줄__ 서식으로 잘못 읽히므로 U+200B로 끊어 둔다
const ZB = (s) => s.replace(/_{3,}/g, (u) => u.split('').join('​'));
const deep = (v) => typeof v === 'string' ? ZB(v) : Array.isArray(v) ? v.map(deep)
  : (v && typeof v === 'object' && v.constructor === Object) ? Object.fromEntries(Object.entries(v).map(([k, x]) => [k, deep(x)])) : v;
const D = new Proxy(D0, { get: (t, k) => (typeof t[k] === 'function' && !['render', 'P', 'T', 'image'].includes(k)) ? (...a) => t[k](...deep(a)) : t[k] });
const COVER = JSON.parse(process.env.COVER || '{}');
const TITLE = '비인칭 주어 it';
const meta = { series: D.SERIES.G, code: 'G-비인칭it', title: TITLE, category: 'G. 대명사  |  비인칭 주어 it · 재시험',
  rightText: 'G  비인칭 주어 it 재시험 B', prefix: process.env.PREFIX || '', cover: COVER.title ? { ...COVER, subtitle: (COVER.subtitle || '') + '  ·  재시험 B' } : undefined,
  retest: { set: 'B', total: 10, pass: 8 } };
const build = (m) => [
  ...D.drill(null, '', [
    { level: 'A', type: 'choice', free: true, instr: '괄호 안에서 알맞은 것을 고르시오.', items: [
      { q: '(That / It) is 3 kilometers from my house to the library.', a: 'It', why: '[P1] 거리 — 비인칭 주어' },
      { q: 'I lost my bag yesterday. (It / One) was blue.', a: 'It', why: '[P2] 바로 그 가방 — 대명사 it' },
      { q: 'It (snowed / snows) a lot last winter.', a: 'snowed', why: '[P3] last winter → 과거' }] },
    { level: 'B', type: 'fill', free: true, instr: '<보기>에서 알맞은 말을 골라 빈칸에 쓰시오. (한 번씩만 사용)', bogi: ['raining', 'takes', 'Wednesday', 'one'], items: [
      { q: 'A: What day is it today? B: It’s [[Wednesday]].', why: '[P1] 요일' },
      { q: 'It [[takes]] twenty minutes from here to the beach.', why: '[P2] It takes + 시간' },
      { q: 'These cookies are good. Can I have another [[one]]?', why: '[P2] 같은 종류 중 하나 → one' },
      { q: 'Don’t go out now. It’s [[raining]] hard.', why: '[P3] 진행형' }] },
    { level: 'C', type: 'write', free: true, instr: '어법상 틀린 부분을 찾아 바르게 고쳐 쓰시오.', items: [
      { q: 'This was very foggy this morning.', a: 'This → It', why: '[P1] 날씨 — 비인칭 주어' },
      { q: 'It started get dark at six.', a: 'get → to get (또는 getting)', why: '[P3] start + to-v / -ing' }] },
    { level: 'D', type: 'multi', free: true, instr: '해당하는 것을 모두 골라 기호를 쓰시오.', items: [
      { q: '밑줄 친 It이 비인칭 주어인 것을 모두 고르시오.', box: [
        '(a) __It__ is my sister’s bike.', '(b) __It__ was very hot last summer.', '(c) I found a key. __It__ was under the desk.',
        '(d) __It__ is Children’s Day today.', '(e) __It__ is getting dark outside.'], a: '(b), (d), (e)', why: '[P1·P2] (a)(c) 앞의 물건을 가리키는 대명사' }] },
  ], m),
];
D.render(meta, build, process.argv[2] || '.').then(fs_ => {
  const out = fs_.map(f => { const g = path.join(path.dirname(f), path.basename(f).replace(TITLE, '비인칭it')); fs.renameSync(f, g); return g; });
  console.log(out.join('\n'));
});
