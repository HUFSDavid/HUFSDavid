const D0 = require('./david_base');
const path = require('path');
const fs = require('fs');
// 빈칸 ______ 두 개가 한 문장에 있으면 __밑줄__ 서식으로 잘못 읽히므로 U+200B로 끊어 둔다
const ZB = (s) => s.replace(/_{3,}/g, (u) => u.split('').join('​'));
const deep = (v) => typeof v === 'string' ? ZB(v) : Array.isArray(v) ? v.map(deep)
  : (v && typeof v === 'object' && v.constructor === Object) ? Object.fromEntries(Object.entries(v).map(([k, x]) => [k, deep(x)])) : v;
const D = new Proxy(D0, { get: (t, k) => (typeof t[k] === 'function' && !['render', 'P', 'T', 'image'].includes(k)) ? (...a) => t[k](...deep(a)) : t[k] });
const COVER = JSON.parse(process.env.COVER || '{}');
const TITLE = 'with + 명사 + 분사';
const meta = { series: D.SERIES.G, code: 'G-with분사', title: TITLE, category: 'G. 분사  |  부대상황 with + 명사 + 분사 · 재시험',
  rightText: 'G  with + 명사 + 분사 재시험 B', prefix: process.env.PREFIX || '', cover: COVER.title ? { ...COVER, subtitle: (COVER.subtitle || '') + '  ·  재시험 B' } : undefined,
  retest: { set: 'B', total: 10, pass: 8 } };
const build = (m) => [
  ...D.drill(null, '', [
    { level: 'A', type: 'choice', free: true, instr: '괄호 안에서 알맞은 것을 고르시오.', items: [
      { q: 'The kids watched the fireworks with their mouths (opening / open).', a: 'open', why: '[P2] 입이 벌어진 상태 — 형용사 open' },
      { q: 'Mom was cooking dinner with the radio (played / playing) softly.', a: 'playing', why: '[P1] 라디오가 나오는 능동 → 현재분사' },
      { q: 'The runner finished the race with both arms (raised / raising) in the air.', a: 'raised', why: '[P1] 팔이 들어 올려진 수동 → 과거분사' }] },
    { level: 'B', type: 'fill', free: true, instr: '<보기>에서 알맞은 말을 골라 빈칸에 쓰시오. (한 번씩만 사용)', bogi: ['on', 'tied', 'with', 'sleeping'], items: [
      { q: 'The baby smiled [[with]] a toy duck in her hand.', why: '[P2] 부대상황 with + 명사 + 전치사구' },
      { q: 'She was studying with her cat [[sleeping]] on the desk.', why: '[P1] 고양이가 자는 능동' },
      { q: 'He ran the race with his shoelaces [[tied]] tightly.', why: '[P1] 신발 끈이 묶인 수동' },
      { q: 'Please don’t go out with the heater [[on]]. (히터를 켠 채)', why: '[P2] 부사 on' }] },
    { level: 'C', type: 'write', free: true, instr: '어법상 틀린 부분을 찾아 바르게 고쳐 쓰시오.', items: [
      { q: 'Ann walked into the classroom, held a big box.', a: 'held → holding', why: '[P3] 분사구문 — Ann이 드는 능동 (and held도 ○)' },
      { q: 'The girl sat by the lake with her feet touched the water.', a: 'touched → touching', why: '[P1·P3] 발이 물에 닿는 능동, 뒤에 목적어' }] },
    { level: 'D', type: 'multi', free: true, instr: '해당하는 것을 모두 골라 기호를 쓰시오.', items: [
      { q: '다음 중 어법상 옳은 문장을 모두 고르시오.', box: [
        '(a) Ben played the guitar with his eyes closing.', '(b) Lisa came home with her umbrella broken.', '(c) Don’t go swimming with your watch on.',
        '(d) He watched the game, eating popcorn.', '(e) The cat sat on the roof with its tail moved slowly.'], a: '(b), (c), (d)', why: '[P1·P2·P3] (a) 눈이 감긴 수동 → closed (e) 꼬리가 움직이는 능동 → moving' }] },
  ], m),
];
D.render(meta, build, process.argv[2] || '.').then(fs_ => {
  const out = fs_.map(f => { const g = path.join(path.dirname(f), path.basename(f).replace(TITLE, 'with분사')); fs.renameSync(f, g); return g; });
  console.log(out.join('\n'));
});
