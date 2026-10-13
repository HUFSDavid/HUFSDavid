const D = require('./david_base');
const COVER = JSON.parse(process.env.COVER || '{}');
const meta = { series: D.SERIES.G, code: 'G-분사구문', title: '분사구문', category: 'G. 분사  |  분사구문 · 재시험',
  rightText: 'G  분사구문 재시험 B', prefix: process.env.PREFIX || '', cover: COVER.title ? { ...COVER, subtitle: (COVER.subtitle || '') + '  ·  재시험 B' } : undefined,
  retest: { set: 'B', total: 10, pass: 8 } };
const build = (m) => [
  ...D.drill(null, '', [
    { level: 'A', type: 'choice', free: true, instr: '괄호 안에서 알맞은 것을 고르시오.', items: [
      { q: '(Close / Closing) the curtains, she turned off the light.', a: 'Closing', why: '[P1] 접·주·잉 — 동사원형 시작 ✗' },
      { q: '(Not wanting / Wanting not) to wake the baby, he walked quietly.', a: 'Not wanting', why: '[P3] Not은 분사 앞' },
      { q: '(Being / It being) a rainy day, the park was empty.', a: 'It being', why: '[P4] 비인칭 it ≠ the park' }] },
    { level: 'B', type: 'fill', free: true, instr: '<보기>에서 알맞은 말을 골라 빈칸에 쓰시오. (한 번씩만 사용)', bogi: ['Painted', 'Having', 'tied', 'Though'], items: [
      { q: '[[Painted]] by a famous artist, the picture is very expensive.', why: '[P3] 그림이 그려진 수동' },
      { q: '[[Having]] lost the map, we asked for directions.', why: '[P4] 잃어버린 것이 먼저' },
      { q: 'The dog waited outside with its leash [[tied]] to a tree.', why: '[P5] 줄이 묶인 수동' },
      { q: '[[Though]] living far away, she visits us every week.', why: '[P2] 양보 — 접속사를 남긴 분사구문' }] },
    { level: 'C', type: 'write', free: true, instr: '어법상 틀린 부분을 찾아 바르게 고쳐 쓰시오.', items: [
      { q: 'Arrived at the museum, we bought tickets.', a: 'Arrived → Arriving', why: '[P1] 우리가 도착한 능동' },
      { q: 'Living near the library, he never borrows books. = Because he lives near the library, he never borrows books.', a: 'Because → Though(Although)', why: '[P2] 가까이 사는데도 — 양보' }] },
    { level: 'D', type: 'multi', free: true, instr: '해당하는 것을 모두 골라 기호를 쓰시오.', items: [
      { q: '다음 중 어법상 옳은 문장을 모두 고르시오.', box: [
        '(a) She sang with her eyes closed.', '(b) Bored with the class, he yawned.', '(c) The rain stopped, we went out.',
        '(d) Having been to Rome, I know the city.', '(e) When asking a question, she blushed.'], a: '(a), (b), (d)', why: '[P5·P3·P4] (c) The rain stopping (e) When asked' }] },
  ], m),
];
D.render(meta, build, process.argv[2] || '.').then(f => console.log(f.join('\n')));
