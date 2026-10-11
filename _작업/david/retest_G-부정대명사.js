const D = require('./david_base');
const COVER = JSON.parse(process.env.COVER || '{}');
const meta = { series: D.SERIES.G, code: 'G-부정대명사', title: '부정대명사', category: 'G. 대명사  |  부정대명사 one · another · the other · some · others · 재시험',
  rightText: 'G  부정대명사 재시험 B', prefix: process.env.PREFIX || '', cover: COVER.title ? { ...COVER, subtitle: (COVER.subtitle || '') + '  ·  재시험 B' } : undefined,
  retest: { set: 'B', total: 10, pass: 8 } };
const build = (m) => [
  ...D.drill(null, '', [
    { level: 'A', type: 'choice', free: true, instr: '괄호 안에서 알맞은 것을 고르시오.', items: [
      { q: 'I have two umbrellas. One is yellow, and (another / the other) is green.', a: 'the other', why: '[P1] 정해진 둘 중 나머지 하나' },
      { q: 'Lots of people were at the beach. Some were swimming, and (others / the others) were sleeping.', a: 'others', why: '[P2] 수가 정해지지 않은 막연한 다수' },
      { q: 'This soup is delicious. Can I have (another / other) bowl?', a: 'another', why: '[P3] another + 단수명사' }] },
    { level: 'B', type: 'fill', free: true, instr: '<보기>에서 알맞은 말을 골라 빈칸에 쓰시오. (한 번씩만 사용)', bogi: ['ones', 'One', 'the others', 'another'], items: [
      { q: 'Jisu has three dogs. One is white, [[another]] is brown, and the other is black.', why: '[P1] 셋 중 두 번째' },
      { q: 'There are twelve eggs in the box. Five of them are broken, and [[the others]] are fine.', why: '[P2] 정해진 12개 중 나머지 전부' },
      { q: 'These socks have holes. I need new [[ones]].', why: '[P3] 같은 종류의 복수 → ones' },
      { q: '[[One]] of my two uncles is a pilot, and the other is a chef.', why: '[P1] one of + 복수명사 + 단수동사' }] },
    { level: 'C', type: 'write', free: true, instr: '어법상 틀린 부분을 찾아 바르게 고쳐 쓰시오.', items: [
      { q: 'Students around the world have different dreams. Some want to be doctors, and the others want to be teachers.', a: 'the others → others', why: '[P2] 전 세계 학생들 — 막연한 다수' },
      { q: 'My parents have two cars. One is white, and other is gray.', a: 'other → the other', why: '[P1] other 단독 주어 ✗ — 둘 중 나머지 하나' }] },
    { level: 'D', type: 'multi', free: true, instr: '해당하는 것을 모두 골라 기호를 쓰시오.', items: [
      { q: '다음 중 어법상 옳은 문장을 모두 고르시오.', box: [
        '(a) He has two sons. One is a singer, and another is an actor.', '(b) There are 30 students in the room. Some are reading, and the others are sleeping.', '(c) We should listen to others.',
        '(d) Three cats are on the sofa. One is sleeping, and the others is playing.', '(e) I lost my pen, so I bought a new one.'], a: '(b), (c), (e)', why: '[P1·P2·P3] (a) another → the other (d) is → are' }] },
  ], m),
];
D.render(meta, build, process.argv[2] || '.').then(f => console.log(f.join('\n')));
