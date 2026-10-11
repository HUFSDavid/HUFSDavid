const D = require('./david_base');
const fs = require('fs');
const COVER = JSON.parse(process.env.COVER || '{}');
const meta = { series: D.SERIES.G, code: 'G-if', title: 'if (~인지 아닌지)', category: 'G. 접속사  |  명사절 if · whether · 재시험',
  rightText: 'G  if (~인지 아닌지) 재시험 B', prefix: process.env.PREFIX || '', cover: COVER.title ? { ...COVER, subtitle: (COVER.subtitle || '') + '  ·  재시험 B' } : undefined,
  retest: { set: 'B', total: 10, pass: 8 } };
const build = (m) => [
  ...D.drill(null, '', [
    { level: 'A', type: 'choice', free: true, instr: '괄호 안에서 알맞은 것을 고르시오.', items: [
      { q: 'I want to know if (does he have / he has) a sister.', a: 'he has', why: '[P1] if + 주어 + 동사 — does 빼기' },
      { q: 'Sujin can’t decide (whether / if) to join the drama club.', a: 'whether', why: '[P2] to부정사 앞 → whether만' },
      { q: 'If the bus (will be / is) late again, I will take a taxi.', a: 'is', why: '[P3] 조건절 → 미래도 현재시제' }] },
    { level: 'B', type: 'fill', free: true, instr: '<보기>에서 알맞은 말을 골라 빈칸에 쓰시오. (한 번씩만 사용)', bogi: ['will', 'are', 'whether', 'if'], items: [
      { q: 'Please tell me [[if]] the library is open today.', why: '[P1] 목적어 명사절 ‘~인지’ (whether는 3번에서 사용)' },
      { q: 'Ask the teacher if the test results [[are]] ready.', why: '[P1] if + 주어 + 동사 · 복수 results' },
      { q: 'The real question is [[whether]] the rumor is true or not.', why: '[P2] 보어 자리 → whether' },
      { q: 'I’m not sure if my team [[will]] win the final tomorrow.', why: '[P3] 명사절 → 미래는 will 그대로' }] },
    { level: 'C', type: 'write', free: true, instr: '어법상 틀린 부분을 찾아 바르게 고쳐 쓰시오.', items: [
      { q: 'Do you know if is the museum open on Mondays?', a: 'is the museum → the museum is', why: '[P1] 간접의문문 어순' },
      { q: 'I’ll call you if I will arrive at the station.', a: 'will arrive → arrive', why: '[P3] 조건절 → 현재시제' }] },
    { level: 'D', type: 'multi', free: true, instr: '해당하는 것을 모두 골라 기호를 쓰시오.', items: [
      { q: '★고난도 — 밑줄 친 if를 whether로 바꿔 쓸 수 있는 것을 모두 고르시오.', box: [
        '(a) __If__ you are free, let’s watch a movie.', '(b) I asked her __if__ she was free.', '(c) Let’s see __if__ the store is still open.',
        '(d) I’ll lend you my umbrella __if__ it rains.', '(e) She isn’t sure __if__ he will call her back.'], a: '(b), (c), (e)', why: '[P2·P3] (a)(d) 조건 ‘~라면’ → whether ✗ / (b)(c)(e) 목적어 명사절' }] },
  ], m),
];
D.render(meta, build, process.argv[2] || '.').then(fs_ => {
  const out = fs_.map(f => { const g = f.replace('DAVID_G-if_if (~인지 아닌지)', 'DAVID_G-if_if_인지아닌지'); fs.renameSync(f, g); return g; });
  console.log(out.join('\n'));
});
