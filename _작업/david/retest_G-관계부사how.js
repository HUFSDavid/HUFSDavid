const D0 = require('./david_base');
const path = require('path');
const fs = require('fs');
// 빈칸 ______ 두 개가 한 문장에 있으면 __밑줄__ 서식으로 잘못 읽히므로 U+200B로 끊어 둔다
const ZB = (s) => s.replace(/_{3,}/g, (u) => u.split('').join('​'));
const deep = (v) => typeof v === 'string' ? ZB(v) : Array.isArray(v) ? v.map(deep)
  : (v && typeof v === 'object' && v.constructor === Object) ? Object.fromEntries(Object.entries(v).map(([k, x]) => [k, deep(x)])) : v;
const D = new Proxy(D0, { get: (t, k) => (typeof t[k] === 'function' && !['render', 'P', 'T', 'image'].includes(k)) ? (...a) => t[k](...deep(a)) : t[k] });
const COVER = JSON.parse(process.env.COVER || '{}');
const TITLE = '관계부사 how';
const meta = { series: D.SERIES.G, code: 'G-관계부사how', title: TITLE, category: 'G. 관계사  |  관계부사 how · the way · 재시험',
  rightText: 'G  관계부사 how 재시험 B', prefix: process.env.PREFIX || '', cover: COVER.title ? { ...COVER, subtitle: (COVER.subtitle || '') + '  ·  재시험 B' } : undefined,
  retest: { set: 'B', total: 10, pass: 8 } };
const build = (m) => [
  ...D.drill(null, '', [
    { level: 'A', type: 'choice', free: true, instr: '괄호 안에서 알맞은 것을 고르시오.', items: [
      { q: 'I like (the way how / the way) my teacher explains grammar.', a: 'the way', why: '[P1] the way how ✗ — 둘 중 하나만' },
      { q: 'Do you remember the day (when / where) we first went camping?', a: 'when', why: '[P2] 시간 선행사 the day → when' },
      { q: 'Can you tell me how (I can / can I) get to the library?', a: 'I can', why: '[P3] 문장 속 how + 주어 + 동사' }] },
    { level: 'B', type: 'fill', free: true, instr: '<보기>에서 알맞은 말을 골라 빈칸에 쓰시오. (한 번씩만 사용)', bogi: ['why', 'which', 'how', 'in'], items: [
      { q: 'This is [[how]] my dad makes kimchi.', why: '[P1] 관계부사 how — ‘~하는 방법’' },
      { q: 'I want to know the reason [[why]] she left early.', why: '[P2] 이유 선행사 → why' },
      { q: 'Show me the way [[in]] which you made this robot.', why: '[P1] the way in which' },
      { q: 'The hotel [[which]] we stayed at was clean.', why: '[P2] 끝에 at이 남은 불완전한 문장 → 관계대명사' }] },
    { level: 'C', type: 'write', free: true, instr: '어법상 틀린 부분을 찾아 바르게 고쳐 쓰시오.', items: [
      { q: 'The town where I visited last summer was beautiful.', a: 'where → which (that)', why: '[P2] visited의 목적어가 빠진 불완전한 문장' },
      { q: 'I wonder how did she solve the puzzle.', a: 'how did she solve → how she solved', why: '[P3] 간접의문문 어순' }] },
    { level: 'D', type: 'multi', free: true, instr: '해당하는 것을 모두 골라 기호를 쓰시오.', items: [
      { q: '다음 중 어법상 옳은 문장을 모두 고르시오.', box: [
        '(a) This is the way how I made friends with Minsu.', '(b) Tell me how long you have lived here.', '(c) The library in which I study is very quiet.',
        '(d) He knows the reason which she cried.', '(e) Mina showed us how she made the cake.'], a: '(b), (c), (e)', why: '[P1·P2·P3] (a) the way how ✗ → how 또는 the way (d) 뒤가 완전 → why' }] },
  ], m),
];
D.render(meta, build, process.argv[2] || '.').then(fs_ => {
  const out = fs_.map(f => { const g = path.join(path.dirname(f), path.basename(f).replace(TITLE, '관계부사how')); fs.renameSync(f, g); return g; });
  console.log(out.join('\n'));
});
