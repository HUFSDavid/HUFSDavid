const D = require('./david_base');
const COVER = JSON.parse(process.env.COVER || '{}');
const meta = { series: D.SERIES.G, code: 'G-whose', title: '소유격 관계대명사 whose', category: 'G. 관계대명사  |  소유격 whose · 재시험',
  rightText: 'G  소유격 관계대명사 whose 재시험 B', prefix: process.env.PREFIX || '', cover: COVER.title ? { ...COVER, subtitle: (COVER.subtitle || '') + '  ·  재시험 B' } : undefined,
  retest: { set: 'B', total: 10, pass: 8 } };
const build = (m) => [
  ...D.drill(null, '', [
    { level: 'A', type: 'choice', free: true, instr: '괄호 안에서 알맞은 것을 고르시오.', items: [
      { q: 'I have a friend (who / whose) father runs a business in L.A.', a: 'whose', why: '[P1] 뒤에 명사 father + 동사 → 소유격' },
      { q: 'The girl (whose / that) is riding a bike is Judy.', a: 'that', why: '[P2] 뒤에 바로 동사 → 주격' },
      { q: 'I need a table of which (the legs / legs) are very long.', a: 'the legs', why: '[P3] of which + the + 명사' }] },
    { level: 'B', type: 'fill', free: true, instr: '<보기>에서 알맞은 말을 골라 빈칸에 쓰시오. (한 번씩만 사용)', bogi: ['of', 'is', 'whose', 'who'], items: [
      { q: 'There are many animals [[whose]] lives are in great danger.', why: '[P1] Their lives → whose lives' },
      { q: 'The man whose children are doctors [[is]] my neighbor.', why: '[P1] 문장 동사 — 선행사 The man(단수)' },
      { q: 'Do you know anyone [[who]] can fix this computer?', why: '[P2] 뒤에 바로 동사 → 주격' },
      { q: 'Find a house [[of]] which the front door is broken.', why: '[P3] of which + the + 명사' }] },
    { level: 'C', type: 'write', free: true, instr: '어법상 틀린 부분을 찾아 바르게 고쳐 쓰시오.', items: [
      { q: 'I stayed at a house which windows were white.', a: 'which → whose', why: '[P2] 뒤에 명사 windows + 동사 → 소유격' },
      { q: 'I’m looking for a bag of which its color is red.', a: 'its → the', why: '[P3] of which its ✗' }] },
    { level: 'D', type: 'multi', free: true, instr: '해당하는 것을 모두 골라 기호를 쓰시오.', items: [
      { q: '다음 중 어법상 옳은 문장을 모두 고르시오.', box: [
        '(a) I know a girl whose name is the same as mine.', '(b) The boy whose dog is very big is Tom.', '(c) I met a man who wife is a nurse.',
        '(d) That is the woman whose life you saved.', '(e) Jane, that favorite subject is math, hates English.'], a: '(a), (b), (d)', why: '[P1·P2·P3] (c) who → whose (e) that → whose' }] },
  ], m),
];
D.render(meta, build, process.argv[2] || '.').then(f => console.log(f.join('\n')));
