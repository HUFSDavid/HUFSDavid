const D0 = require('./david_base');
const path = require('path');
const fs = require('fs');
// 빈칸 ______ 두 개가 한 문장에 있으면 __밑줄__ 서식으로 잘못 읽히므로 U+200B로 끊어 둔다
const ZB = (s) => s.replace(/_{3,}/g, (u) => u.split('').join('​'));
const deep = (v) => typeof v === 'string' ? ZB(v) : Array.isArray(v) ? v.map(deep)
  : (v && typeof v === 'object' && v.constructor === Object) ? Object.fromEntries(Object.entries(v).map(([k, x]) => [k, deep(x)])) : v;
const D = new Proxy(D0, { get: (t, k) => (typeof t[k] === 'function' && !['render', 'P', 'T', 'image'].includes(k)) ? (...a) => t[k](...deep(a)) : t[k] });
const COVER = JSON.parse(process.env.COVER || '{}');
const meta = { series: D.SERIES.G, code: 'G-수의일치', title: '수의 일치', category: 'G. 일치  |  주어-동사 수의 일치 · 재시험',
  rightText: 'G  수의 일치 재시험 B', prefix: process.env.PREFIX || '', cover: COVER.title ? { ...COVER, subtitle: (COVER.subtitle || '') + '  ·  재시험 B' } : undefined,
  retest: { set: 'B', total: 10, pass: 8 } };
const build = (m) => [
  ...D.drill(null, '', [
    { level: 'A', type: 'choice', free: true, instr: '괄호 안에서 알맞은 것을 고르시오.', items: [
      { q: 'Nearly half of the students in my class (walk / walks) to school.', a: 'walk', why: '[P1] half of 뒤 the students(복수)' },
      { q: 'The number of people who shop online (are / is) increasing.', a: 'is', why: '[P2] the number of → 단수' },
      { q: 'A shop that (sell / sells) used books opened near my school.', a: 'sells', why: '[P3] 선행사 a shop(단수)' }] },
    { level: 'B', type: 'fill', free: true, instr: '<보기>에서 알맞은 말을 골라 빈칸에 쓰시오. (한 번씩만 사용)', bogi: ['have', 'are', 'was', 'spends'], items: [
      { q: 'Most of the cake [[was]] eaten by my brother last night.', why: '[P1] the cake(단수) · 과거 수동' },
      { q: 'Seventy percent of the students [[have]] a smartphone.', why: '[P1] the students(복수)' },
      { q: 'Each of my friends [[spends]] money on snacks.', why: '[P2] each of → 단수' },
      { q: 'The headphones that I bought yesterday [[are]] too big for me.', why: '[P3] 주어 the headphones(복수) — 관계절은 괄호' }] },
    { level: 'C', type: 'write', free: true, instr: '어법상 틀린 부분을 찾아 바르게 고쳐 쓰시오.', items: [
      { q: 'Every customer in the store want a discount.', a: 'want → wants', why: '[P2] every + 단수명사 → 단수' },
      { q: 'The price of the new shoes are too high for me.', a: 'are → is', why: '[P3] 주어 the price — of 전치사구는 괄호' }] },
    { level: 'D', type: 'multi', free: true, instr: '해당하는 것을 모두 골라 기호를 쓰시오.', items: [
      { q: '다음 중 어법상 옳은 문장을 모두 고르시오.', box: [
        '(a) Two thirds of the money was spent on clothes.', '(b) A number of students likes the new rule.', '(c) Buying things on sale is not always wise.',
        '(d) The girls who lives next door are my friends.', '(e) The difference of the two prices is small.'], a: '(a), (c), (e)', why: '[P1·P2·P3] (b) a number of → like (d) 선행사 the girls → live' }] },
  ], m),
];
D.render(meta, build, process.argv[2] || '.').then(fs_ => {
  const out = fs_.map(f => { const g = path.join(path.dirname(f), path.basename(f).replace('수의 일치', '수의일치')); fs.renameSync(f, g); return g; });
  console.log(out.join('\n'));
});
