const D = require('./david_base');
const COVER = JSON.parse(process.env.COVER || '{}');
const meta = { series: D.SERIES.G, code: 'G-접속사as', title: '접속사 as', category: 'G. 접속사  |  as · 재시험',
  rightText: 'G  접속사 as 재시험 B', prefix: process.env.PREFIX || '', cover: COVER.title ? { ...COVER, subtitle: (COVER.subtitle || '') + '  ·  재시험 B' } : undefined,
  retest: { set: 'B', total: 10, pass: 8 } };
const build = (m) => [
  ...D.drill(null, '', [
    { level: 'A', type: 'choice', free: true, instr: '괄호 안에서 알맞은 것을 고르시오.', items: [
      { q: 'As the city (grow / grew), the traffic got worse.', a: 'grew', why: '[P1] 과거 시제 일치' },
      { q: '(As / Because of) the strong wind, the flight was delayed.', a: 'Because of', why: '[P2] 명사구 이유' },
      { q: 'My sister works (as / like) a flight attendant.', a: 'as', why: '[P3] ~로서' }] },
    { level: 'B', type: 'fill', free: true, instr: '<보기>에서 알맞은 말을 골라 빈칸에 쓰시오. (한 번씩만 사용)', bogi: ['taller', 'just', 'since', 'a'], items: [
      { q: 'As he grew up, he became [[taller]] than his dad.', why: '[P1] 비례 — 비교급' },
      { q: 'She draws [[just]] as her father does.', why: '[P2] just as ~처럼' },
      { q: 'As it was a holiday = [[since]] it was a holiday', why: '[P2] 이유 as = since' },
      { q: 'He is famous as [[a]] soccer player.', why: '[P3] 전치사 as + 관사 + 명사' }] },
    { level: 'C', type: 'write', free: true, instr: '어법상 틀린 부분을 찾아 바르게 고쳐 쓰시오.', items: [
      { q: 'As the river get deeper, the water gets colder.', a: 'get → gets', why: '[P1] 단수 주어' },
      { q: 'As the teacher say, the test will be hard.', a: 'say → said(says)', why: '[P2] 주어 단수 / 말한 대로' }] },
    { level: 'D', type: 'multi', free: true, instr: '해당하는 것을 모두 골라 기호를 쓰시오.', items: [
      { q: '밑줄 친 as가 전치사로 쓰인 것을 모두 고르시오.', box: [
        '(a) He used the stick __as__ a sword.', '(b) __As__ you said, it was fun.', '(c) __As__ a kid, I loved cartoons.', '(d) __As__ it got late, we left.', '(e) She spoke __as__ the class leader.'], a: '(a), (c), (e)', why: '[P3] 뒤에 명사구' }] },
  ], m),
];
D.render(meta, build, process.argv[2] || '.').then(f => console.log(f.join('\n')));
