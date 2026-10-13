const D0 = require('./david_base');
const path = require('path');
const fs = require('fs');
// 빈칸 ______ 두 개가 한 문장에 있으면 __밑줄__ 서식으로 잘못 읽히므로 U+200B로 끊어 둔다
const ZB = (s) => s.replace(/_{3,}/g, (u) => u.split('').join('​'));
const deep = (v) => typeof v === 'string' ? ZB(v) : Array.isArray(v) ? v.map(deep)
  : (v && typeof v === 'object' && v.constructor === Object) ? Object.fromEntries(Object.entries(v).map(([k, x]) => [k, deep(x)])) : v;
const D = new Proxy(D0, { get: (t, k) => (typeof t[k] === 'function' && !['render', 'P', 'T', 'image'].includes(k)) ? (...a) => t[k](...deep(a)) : t[k] });
const COVER = JSON.parse(process.env.COVER || '{}');
const TITLE = '수여동사';
const meta = { series: D.SERIES.G, code: 'G-수여동사', title: TITLE, category: 'G. 문장의 형식  |  수여동사 (4형식 ↔ 3형식) · 재시험',
  rightText: 'G  수여동사 재시험 B', prefix: process.env.PREFIX || '', cover: COVER.title ? { ...COVER, subtitle: (COVER.subtitle || '') + '  ·  재시험 B' } : undefined,
  retest: { set: 'B', total: 10, pass: 8 } };
const build = (m) => [
  ...D.drill(null, '', [
    { level: 'A', type: 'choice', free: true, instr: '괄호 안에서 알맞은 것을 고르시오.', items: [
      { q: 'Grandma read (a story Michael / Michael a story) before bed.', a: 'Michael a story', why: '[P1] 4형식 — 사람 → 물건' },
      { q: 'Mina cooked some soup (for / to) her sick brother.', a: 'for', why: '[P2] cook → for' },
      { q: 'This is my old bike. I gave (it to my cousin / my cousin it).', a: 'it to my cousin', why: '[P3] 대명사 직접목적어 → 3형식' }] },
    { level: 'B', type: 'fill', free: true, instr: '<보기>에서 알맞은 말을 골라 빈칸에 쓰시오. (한 번씩만 사용)', bogi: ['of', 'us', 'to', 'for'], items: [
      { q: 'Our teacher showed [[us]] some old photos.', why: '[P1] 간접목적어' },
      { q: 'Jenny wrote a thank-you card [[to]] her teacher.', why: '[P2] write → to' },
      { q: 'Can I ask a question [[of]] you?', why: '[P2] ask → of' },
      { q: 'Dad got a new phone [[for]] me.', why: '[P2] get → for' }] },
    { level: 'C', type: 'write', free: true, instr: '괄호 안의 지시대로 바꾸어 쓰시오.', items: [
      { q: 'Kate made her friends some cupcakes. (3형식으로)', a: 'Kate made some cupcakes for her friends.', why: '[P2] make → for' },
      { q: 'Tom sold his old guitar to Ben. (4형식으로)', a: 'Tom sold Ben his old guitar.', why: '[P2] to 삭제 · 사람 → 물건' }] },
    { level: 'D', type: 'multi', free: true, instr: '해당하는 것을 모두 골라 기호를 쓰시오.', items: [
      { q: '다음 중 어법상 옳은 문장을 모두 고르시오.', box: [
        '(a) She sent me it.', '(b) He bought a cap for his son.', '(c) Please pass me the pepper.',
        '(d) My aunt made a sweater to me.', '(e) I lent my notebook to Jiwoo.'], a: '(b), (c), (e)', why: '[P1·P2·P3] (a) sent it to me (d) for me' }] },
  ], m),
];
D.render(meta, build, process.argv[2] || '.').then(fs_ => console.log(fs_.join('\n')));
