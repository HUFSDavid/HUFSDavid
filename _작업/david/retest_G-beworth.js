const D0 = require('./david_base');
const path = require('path');
const fs = require('fs');
// 빈칸 ______ 두 개가 한 문장에 있으면 __밑줄__ 서식으로 잘못 읽히므로 U+200B로 끊어 둔다
const ZB = (s) => s.replace(/_{3,}/g, (u) => u.split('').join('​'));
const deep = (v) => typeof v === 'string' ? ZB(v) : Array.isArray(v) ? v.map(deep)
  : (v && typeof v === 'object' && v.constructor === Object) ? Object.fromEntries(Object.entries(v).map(([k, x]) => [k, deep(x)])) : v;
const D = new Proxy(D0, { get: (t, k) => (typeof t[k] === 'function' && !['render', 'P', 'T', 'image'].includes(k)) ? (...a) => t[k](...deep(a)) : t[k] });
const COVER = JSON.parse(process.env.COVER || '{}');
const TITLE = 'be worth -ing';
const meta = { series: D.SERIES.G, code: 'G-beworth', title: TITLE, category: 'G. 동명사  |  be worth + -ing · 재시험',
  rightText: 'G  be worth -ing 재시험 B', prefix: process.env.PREFIX || '', cover: COVER.title ? { ...COVER, subtitle: (COVER.subtitle || '') + '  ·  재시험 B' } : undefined,
  retest: { set: 'B', total: 10, pass: 8 } };
const build = (m) => [
  ...D.drill(null, '', [
    { level: 'A', type: 'choice', free: true, instr: '괄호 안에서 알맞은 것을 고르시오.', items: [
      { q: 'The new art museum is worth (to visit / visiting).', a: 'visiting', why: '[P1] worth + 동명사 — to부정사 ✗' },
      { q: 'This old map is worth (studying / studying it).', a: 'studying', why: '[P2] 주어가 의미상 목적어 → 목적어 다시 쓰기 ✗' },
      { q: 'Mina is busy (to practice / practicing) for the concert.', a: 'practicing', why: '[P3] be busy -ing' }] },
    { level: 'B', type: 'fill', free: true, instr: '<보기>에서 알맞은 말을 골라 빈칸에 쓰시오. (한 번씩만 사용)', bogi: ['forward', 'to', 'worthwhile', 'listening'], items: [
      { q: 'The speech was worth [[listening]] to.', why: '[P1] worth + 동명사' },
      { q: 'That small town is worth going [[to]].', why: '[P2] go to의 to가 남음' },
      { q: 'It is [[worthwhile]] to read this novel.', why: '[P2] It is worthwhile + to-v' },
      { q: 'We are looking [[forward]] to meeting the artist.', why: '[P3] look forward to -ing' }] },
    { level: 'C', type: 'write', free: true, instr: '어법상 틀린 부분을 찾아 바르게 고쳐 쓰시오.', items: [
      { q: 'The concert was worth to wait for.', a: 'to wait → waiting', why: '[P1] worth + 동명사' },
      { q: 'He spent the whole weekend to clean the garage.', a: 'to clean → cleaning', why: '[P3] spend + 시간 + -ing' }] },
    { level: 'D', type: 'multi', free: true, instr: '해당하는 것을 모두 골라 기호를 쓰시오.', items: [
      { q: '다음 중 어법상 옳은 문장을 모두 고르시오.', box: [
        '(a) The castle is worth being visited.', '(b) This song is worth listening to.', '(c) I couldn’t help smiling at the baby.',
        '(d) It is worth to watch this show.', '(e) The watch is worth 200 dollars.'], a: '(b), (c), (e)', why: '[P1·P2·P3] (a) worth visiting (d) worth watching · worthwhile to watch' }] },
  ], m),
];
D.render(meta, build, process.argv[2] || '.').then(fs_ => {
  const out = fs_.map(f => { const g = path.join(path.dirname(f), path.basename(f).replace(TITLE, 'beworth')); fs.renameSync(f, g); return g; });
  console.log(out.join('\n'));
});
