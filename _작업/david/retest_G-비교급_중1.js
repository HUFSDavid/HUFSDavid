const D0 = require('./david_base');
const path = require('path');
const fs = require('fs');
// 빈칸 ______ 두 개가 한 문장에 있으면 __밑줄__ 서식으로 잘못 읽히므로 U+200B로 끊어 둔다
const ZB = (s) => s.replace(/_{3,}/g, (u) => u.split('').join('​'));
const deep = (v) => typeof v === 'string' ? ZB(v) : Array.isArray(v) ? v.map(deep)
  : (v && typeof v === 'object' && v.constructor === Object) ? Object.fromEntries(Object.entries(v).map(([k, x]) => [k, deep(x)])) : v;
const D = new Proxy(D0, { get: (t, k) => (typeof t[k] === 'function' && !['render', 'P', 'T', 'image'].includes(k)) ? (...a) => t[k](...deep(a)) : t[k] });
const COVER = JSON.parse(process.env.COVER || '{}');
const TITLE = '비교급';
const meta = { series: D.SERIES.G, code: 'G-비교급', title: TITLE, category: 'G. 비교  |  비교급 (-er than · more ~ than) · 원급 비교 (as ~ as) · 재시험',
  rightText: 'G  비교급 재시험 B', prefix: process.env.PREFIX || '', cover: COVER.title ? { ...COVER, subtitle: (COVER.subtitle || '') + '  ·  재시험 B' } : undefined,
  retest: { set: 'B', total: 10, pass: 8 } };
const build = (m) => [
  ...D.drill(null, '', [
    { level: 'A', type: 'choice', free: true, instr: '괄호 안에서 알맞은 것을 고르시오.', items: [
      { q: 'An olive is not as (bigger / big) as an egg.', a: 'big', why: '[P4] as ~ as 사이는 원급' },
      { q: 'My cold is (worse / badder) today than yesterday.', a: 'worse', why: '[P2] bad → worse' },
      { q: 'This bag is (very / even) bigger than yours.', a: 'even', why: '[P3] 비교급 강조 — very ✗' }] },
    { level: 'B', type: 'fill', free: true, instr: '우리말과 같은 뜻이 되도록 <보기>에서 알맞은 말을 골라 빈칸에 쓰시오. (한 번씩만 사용)', bogi: ['yours', 'more', 'hotter', 'better'], items: [
      { q: 'Summer is [[hotter]] than spring. (여름은 봄보다 더 덥다.)', why: '[P1] 자음 반복' },
      { q: 'Mina sings [[better]] than her sister. (미나는 언니보다 노래를 더 잘한다.)', why: '[P2] well → better' },
      { q: 'This omelet is [[more]] delicious than that one. (이 오믈렛은 저것보다 더 맛있다.)', why: '[P1] more + 원급' },
      { q: 'My pencil is shorter than [[yours]]. (내 연필은 네 것보다 더 짧다.)', why: '[P3] 비교 대상 — 소유대명사' }] },
    { level: 'C', type: 'write', free: true, instr: '괄호 안의 지시대로 쓰시오.', items: [
      { q: 'Black pudding is more bigger than sundae. (어법에 맞게 고쳐 쓸 것)', a: 'Black pudding is bigger than sundae.', why: '[P3] 이중 비교 ✗' },
      { q: '사탕은 초콜릿보다 훨씬 더 알록달록하다. (much, colorful)', a: 'Candy is much more colorful than chocolate.', why: '[P1·P3] -ful → more · much + 비교급' }] },
    { level: 'D', type: 'multi', free: true, instr: '해당하는 것을 모두 골라 기호를 쓰시오.', items: [
      { q: '다음 중 어법상 옳은 문장을 모두 고르시오.', box: [
        '(a) Hotteok is sweeter than pancakes.', '(b) My bag is heavier than you.', '(c) She runs faster than her brother.',
        '(d) This box is very bigger than that box.', '(e) He has less money than his sister.'], a: '(a), (c), (e)', why: '[P1·P2·P3] (b) yours (d) much · even · far · a lot' }] },
  ], m),
];
D.render(meta, build, process.argv[2] || '.').then(fs_ => console.log(fs_.join('\n')));
