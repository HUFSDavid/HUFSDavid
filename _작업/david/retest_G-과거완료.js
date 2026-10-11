const D = require('./david_base');
const COVER = JSON.parse(process.env.COVER || '{}');
const meta = { series: D.SERIES.G, code: 'G-과거완료', title: '과거완료', category: 'G. 시제  |  과거완료 had p.p. · 재시험',
  rightText: 'G  과거완료 재시험 B', prefix: process.env.PREFIX || '', cover: COVER.title ? { ...COVER, subtitle: (COVER.subtitle || '') + '  ·  재시험 B' } : undefined,
  retest: { set: 'B', total: 10, pass: 8 } };
const build = (m) => [
  ...D.drill(null, '', [
    { level: 'A', type: 'choice', free: true, instr: '괄호 안에서 알맞은 것을 고르시오.', items: [
      { q: 'When Sarah arrived at the party, Paul (has already gone / had already gone) home.', a: 'had already gone', why: '[P1] 도착한 시점(과거)보다 먼저 → had p.p.' },
      { q: 'She had been ill in bed (since / for) last Monday when I visited her.', a: 'since', why: '[P2] 계속 — since + 시작점' },
      { q: 'I lost my umbrella two days ago, so I (bought / have bought) a new one yesterday.', a: 'bought', why: '[P3] yesterday → 과거시제' }] },
    { level: 'B', type: 'fill', free: true, instr: '<보기>에서 알맞은 말을 골라 빈칸에 쓰시오. (한 번씩만 사용)', bogi: ['got', 'had', 'become', 'since'], items: [
      { q: 'The newspaper said that Nobel had [[become]] rich from the deaths of others.', why: '[P1] had + 과거분사 become' },
      { q: 'I hadn’t eaten anything [[since]] lunch, so I was starving.', why: '[P2] 계속 — since + 시작점' },
      { q: 'By the time we [[got]] to the stadium, the game had already started.', why: '[P3] by the time + 과거시제' },
      { q: 'Everyone was surprised at what Gansong [[had]] done.', why: '[P1] 놀란 시점보다 먼저 한 일' }] },
    { level: 'C', type: 'write', free: true, instr: '어법상 틀린 부분을 찾아 바르게 고쳐 쓰시오.', items: [
      { q: 'When I came back home, I found that someone has broken the window.', a: 'has broken → had broken', why: '[P1] 발견한 시점(과거)보다 먼저' },
      { q: 'I had gone to school after I took a shower quickly.', a: 'had gone → went', why: '[P3] 나중 일에 had ✗ (기출)' }] },
    { level: 'D', type: 'multi', free: true, instr: '해당하는 것을 모두 골라 기호를 쓰시오.', items: [
      { q: '다음 중 어법상 옳은 문장을 모두 고르시오.', box: [
        '(a) I had never saw snow before I moved to Canada.', '(b) It said Nobel had died in France from a heart attack.', '(c) My sister was excited because she had never been to Jeju Island before.',
        '(d) My dog has died two weeks ago.', '(e) By the time the police arrived, the thieves had already run away.'], a: '(b), (c), (e)', why: '[P1·P2·P3] (a) saw → seen (d) has died → died' }] },
  ], m),
];
D.render(meta, build, process.argv[2] || '.').then(f => console.log(f.join('\n')));
