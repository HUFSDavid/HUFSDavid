const D = require('./david_base');
const COVER = JSON.parse(process.env.COVER || '{}');
const meta = { series: D.SERIES.G, code: 'G-간접화법', title: '간접화법', category: 'G. 화법  |  직접화법 → 간접화법 · 재시험',
  rightText: 'G  간접화법 재시험 B', prefix: process.env.PREFIX || '', cover: COVER.title ? { ...COVER, subtitle: (COVER.subtitle || '') + '  ·  재시험 B' } : undefined,
  retest: { set: 'B', total: 11, pass: 9 } };
const build = (m) => [
  ...D.drill(null, '', [
    { level: 'A', type: 'choice', free: true, instr: '괄호 안에서 알맞은 것을 고르시오.', items: [
      { q: 'Yuna said to me, “I need your help.” → Yuna (said / told) me that she needed my help.', a: 'told', why: '[P1] 뒤에 듣는 사람 me → told' },
      { q: 'Dan said, “I am leaving here today.” → Dan said that he was leaving there (today / that day).', a: 'that day', why: '[P2] today → that day' },
      { q: 'Ms. Choi said to us, “Did you read the news?” → Ms. Choi asked us (whether / that) we had read the news.', a: 'whether', why: '[P3] 의문사 없는 의문문 → whether' },
      { q: 'The guide said to us, “Don’t touch the paintings.” → The guide told us (not to touch / to not touching) the paintings.', a: 'not to touch', why: '[P4] 부정 명령 → not to-v' }] },
    { level: 'B', type: 'fill', free: true, instr: '<보기>에서 알맞은 말을 골라 빈칸에 쓰시오. (한 번씩만 사용)', bogi: ['would', 'where', 'to', 'his'], items: [
      { q: 'Minsu said, “My father is a pilot.” → Minsu said that [[his]] father was a pilot.', why: '[P1] my = Minsu의 → his' },
      { q: 'Leo said, “I will call my grandma tonight.” → Leo said that he [[would]] call his grandma that night.', why: '[P2] will → would' },
      { q: 'The nurse said to me, “Drink a lot of water.” → The nurse told me [[to]] drink a lot of water.', why: '[P4] tell + 목적어 + to-v' },
      { q: 'Ryan said to me, “Where is the library?” → Ryan asked me [[where]] the library was.', why: '[P3] 의문사 + 주어 + 동사' }] },
    { level: 'C', type: 'write', free: true, instr: '어법상 틀린 부분을 찾아 바르게 고쳐 쓰시오.', items: [
      { q: 'Ben asked me where did I buy my shoes.', a: 'did I buy → I had bought', why: '[P3] 의문사 + 주어 + 동사 · 과거완료' },
      { q: 'The teacher told us that water boiled at 100°C.', a: 'boiled → boils', why: '[P2] 과학적 사실 → 현재 (시제 일치의 예외)' }] },
    { level: 'D', type: 'multi', free: true, instr: '해당하는 것을 모두 골라 기호를 쓰시오.', items: [
      { q: '다음 중 간접화법 전환이 올바른 것을 모두 고르시오.', box: [
        '(a) Jun said to me, “I’ll text you.” → Jun told me that he would text me.',
        '(b) She said, “I am busy now.” → She said that she was busy now.',
        '(c) The coach said to us, “Don’t stop running.” → The coach told us not to stop running.',
        '(d) He said to me, “Is this your phone?” → He asked me if that was my phone.',
        '(e) Mia said to him, “What do you want?” → Mia asked him what did he want.'], a: '(a), (c), (d)', why: '[P1·P2·P3·P4] (b) now → then (e) what he wanted' }] },
  ], m),
];
D.render(meta, build, process.argv[2] || '.').then(f => console.log(f.join('\n')));
