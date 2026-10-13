const D0 = require('./david_base');
const path = require('path');
const fs = require('fs');
// 빈칸 ______ 두 개가 한 문장에 있으면 __밑줄__ 서식으로 잘못 읽히므로 U+200B로 끊어 둔다
const ZB = (s) => s.replace(/_{3,}/g, (u) => u.split('').join('​'));
const deep = (v) => typeof v === 'string' ? ZB(v) : Array.isArray(v) ? v.map(deep)
  : (v && typeof v === 'object' && v.constructor === Object) ? Object.fromEntries(Object.entries(v).map(([k, x]) => [k, deep(x)])) : v;
const D = new Proxy(D0, { get: (t, k) => (typeof t[k] === 'function' && !['render', 'P', 'T', 'image'].includes(k)) ? (...a) => t[k](...deep(a)) : t[k] });
const COVER = JSON.parse(process.env.COVER || '{}');
const TITLE = 'to부정사의 부사적 용법';
const meta = { series: D.SERIES.G, code: 'G-to부정사부사', title: TITLE, category: 'G. to부정사  |  부사적 용법(목적) · 재시험',
  rightText: 'G  to부정사의 부사적 용법 재시험 B', prefix: process.env.PREFIX || '', cover: COVER.title ? { ...COVER, subtitle: (COVER.subtitle || '') + '  ·  재시험 B' } : undefined,
  retest: { set: 'B', total: 10, pass: 9 } };
const build = (m) => [
  ...D.drill(null, '', [
    { level: 'A', type: 'choice', free: true, instr: '괄호 안에서 알맞은 것을 고르시오.', items: [
      { q: 'Mina went to the gym (working / to work) out.', a: 'to work', why: '[P1] 목적 — to + 동사원형' },
      { q: 'I want (to be / being) a photographer.', a: 'to be', why: '[P2] want + to부정사(명사적)' },
      { q: 'I went to the store (to / for) a new cap.', a: 'for', why: '[P3] for + 명사' }] },
    { level: 'B', type: 'fill', free: true, instr: '<보기>에서 알맞은 말을 골라 빈칸에 쓰시오. (한 번씩만 사용)', bogi: ['for', 'not to', 'to calm', 'in order'], items: [
      { q: 'Jennifer uses hand signals [[to calm]] Max.', why: '[P1] 본문 — 목적' },
      { q: 'He left early [[in order]] to catch the train.', why: '[P1] in order to' },
      { q: 'I studied hard [[not to]] fail the test.', why: '[P1] 목적의 부정' },
      { q: 'Let’s go to the bakery [[for]] some bread.', why: '[P3] for + 명사' }] },
    { level: 'C', type: 'write', free: true, instr: '어법상 틀린 부분을 찾아 바르게 고쳐 쓰시오.', items: [
      { q: 'Peter uses drones capture happy moments.', a: 'capture → to capture', why: '[P1] 동사가 두 개 → 목적의 to부정사' },
      { q: 'Tom and Max are going to playing on the beach.', a: 'playing → play', why: '[P3] be going to + 동사원형' }] },
    { level: 'D', type: 'multi', free: true, instr: '해당하는 것을 모두 골라 기호를 쓰시오.', items: [
      { q: '다음 중 어법상 옳은 문장을 모두 고르시오.', box: [
        '(a) She went to the park to playing.', '(b) To stay healthy, eat fruits.', '(c) My job is to find perfect places.',
        '(d) I went to town for meet my friends.', '(e) I came back home early to do my homework.'], a: '(b), (c), (e)', why: '[P1·P2] (a) to play (d) to meet' }] },
  ], m),
];
D.render(meta, build, process.argv[2] || '.').then(fs_ => {
  const out = fs_.map(f => { const g = path.join(path.dirname(f), path.basename(f).replace(TITLE, 'to부정사부사')); fs.renameSync(f, g); return g; });
  console.log(out.join('\n'));
});
