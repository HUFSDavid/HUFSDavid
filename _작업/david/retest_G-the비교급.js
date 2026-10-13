const D0 = require('./david_base');
const path = require('path');
const fs = require('fs');
// 빈칸 ______ 두 개가 한 문장에 있으면 __밑줄__ 서식으로 잘못 읽히므로 U+200B로 끊어 둔다
const ZB = (s) => s.replace(/_{3,}/g, (u) => u.split('').join('​'));
const deep = (v) => typeof v === 'string' ? ZB(v) : Array.isArray(v) ? v.map(deep)
  : (v && typeof v === 'object' && v.constructor === Object) ? Object.fromEntries(Object.entries(v).map(([k, x]) => [k, deep(x)])) : v;
const D = new Proxy(D0, { get: (t, k) => (typeof t[k] === 'function' && !['render', 'P', 'T', 'image'].includes(k)) ? (...a) => t[k](...deep(a)) : t[k] });
const COVER = JSON.parse(process.env.COVER || '{}');
const TITLE = 'the + 비교급, the + 비교급';
const meta = { series: D.SERIES.G, code: 'G-the비교급', title: TITLE, category: 'G. 비교  |  The + 비교급 ~, the + 비교급 … · 재시험',
  rightText: 'G  the + 비교급, the + 비교급 재시험 B', prefix: process.env.PREFIX || '', cover: COVER.title ? { ...COVER, subtitle: (COVER.subtitle || '') + '  ·  재시험 B' } : undefined,
  retest: { set: 'B', total: 10, pass: 8 } };
const build = (m) => [
  ...D.drill(null, '', [
    { level: 'A', type: 'choice', free: true, instr: '괄호 안에서 알맞은 것을 고르시오.', items: [
      { q: 'The (hotter / hottest) it gets, the more water you should drink.', a: 'hotter', why: '[P1] the + 비교급 — 최상급 ✗' },
      { q: 'The more you exercise, (you will be stronger / the stronger you will be).', a: 'the stronger you will be', why: '[P1·P3] 두 번째 절도 the + 비교급 + 주어 + 동사' },
      { q: 'The (fewer / less) money you spend, the more you can save.', a: 'less', why: '[P2] money는 셀 수 없는 명사 → less' }] },
    { level: 'B', type: 'fill', free: true, instr: '<보기>에서 알맞은 말을 골라 빈칸에 쓰시오. (한 번씩만 사용)', bogi: ['worse', 'As', 'the', 'more'], items: [
      { q: 'The more books you read, [[the]] wiser you become.', why: '[P1] 두 번째 절의 the' },
      { q: 'The [[more]] friends you have, the happier you will be.', why: '[P2] more + 명사가 함께 앞으로' },
      { q: 'The longer he waited, the [[worse]] his mood became.', why: '[P1] bad – worse' },
      { q: '[[As]] you get older, you become wiser.', why: '[P3] As 전환 — 평서문 어순' }] },
    { level: 'C', type: 'write', free: true, instr: '어법상 틀린 부분을 찾아 바르게 고쳐 쓰시오.', items: [
      { q: 'The more you sleep, the more healthier you feel.', a: 'the more healthier → the healthier', why: '[P1·P3] 이중 비교 ✗' },
      { q: 'The earlier you leave, sooner you will arrive.', a: 'sooner → the sooner', why: '[P3] 두 번째 절의 the 빠뜨림' }] },
    { level: 'D', type: 'multi', free: true, instr: '해당하는 것을 모두 골라 기호를 쓰시오.', items: [
      { q: '다음 중 어법상 옳은 문장을 모두 고르시오.', box: [
        '(a) The sooner, the better.', '(b) The more you have money, the more you want.', '(c) The colder it got, the more people stayed home.',
        '(d) As it got darker, we walked faster.', '(e) The harder you try, the best you will do.'], a: '(a), (c), (d)', why: '[P2·P3] (b) The more money you have (e) the better' }] },
  ], m),
];
D.render(meta, build, process.argv[2] || '.').then(fs_ => {
  const out = fs_.map(f => { const g = path.join(path.dirname(f), path.basename(f).replace(TITLE, 'the비교급')); fs.renameSync(f, g); return g; });
  console.log(out.join('\n'));
});
