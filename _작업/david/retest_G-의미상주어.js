const D = require('./david_base');
const COVER = JSON.parse(process.env.COVER || '{}');
const meta = { series: D.SERIES.G, code: 'G-의미상주어', title: 'to부정사의 의미상 주어', category: 'G. to부정사  |  의미상 주어 · 재시험',
  rightText: 'G  의미상 주어 재시험 B', prefix: process.env.PREFIX || '', cover: COVER.title ? { ...COVER, subtitle: (COVER.subtitle || '') + '  ·  재시험 B' } : undefined,
  retest: { set: 'B', total: 10, pass: 8 } };
const build = (m) => [
  ...D.drill(null, '', [
    { level: 'A', type: 'choice', free: true, instr: '괄호 안에서 알맞은 것을 고르시오.', items: [
      { q: 'It is not safe (for we / for us) to ride bikes on this road.', a: 'for us', why: '[P1] for + 목적격' },
      { q: 'It was generous (for / of) Mr. Han to pay for our lunch.', a: 'of', why: '[P2] generous 성격 → of' },
      { q: 'The jacket was (too / enough) small for my brother to wear.', a: 'too', why: '[P3] too + 형용사 / enough는 형용사 뒤' }] },
    { level: 'B', type: 'fill', free: true, instr: '<보기>에서 알맞은 말을 골라 빈칸에 쓰시오. (한 번씩만 사용)', bogi: ['to', 'enough', 'for', 'of'], items: [
      { q: 'It is difficult [[for]] my grandpa to read small letters.', why: '[P1] difficult 판단 → for' },
      { q: 'It was silly [[of]] me to believe the fake news.', why: '[P2] silly 성격 → of' },
      { q: 'The rope was long [[enough]] for us to reach the boat.', why: '[P3] 형용사 + enough' },
      { q: 'It is necessary for all students [[to]] follow the school rules.', why: '[P1] 진주어 to부정사' }] },
    { level: 'C', type: 'write', free: true, instr: '어법상 틀린 부분을 찾아 바르게 고쳐 쓰시오.', items: [
      { q: 'It was very wise for her to bring a map.', a: 'for her → of her', why: '[P2] wise 성격 → of' },
      { q: 'The puzzle was too hard for my sister to solve it.', a: 'solve it → solve', why: '[P3] 주어 = 목적어 → it ✗' }] },
    { level: 'D', type: 'multi', free: true, instr: '해당하는 것을 모두 골라 기호를 쓰시오.', items: [
      { q: '다음 중 어법상 옳은 문장을 모두 고르시오.', box: [
        '(a) It was rude of they to shout at the waiter.', '(b) It is important for him to drink enough water.', '(c) It is easy of me to cook fried rice.',
        '(d) She is old enough to vote.', '(e) The bus was so crowded that we couldn’t get on it.'], a: '(b), (d), (e)', why: '[P1·P2·P3] (a) of them (c) for me' }] },
  ], m),
];
D.render(meta, build, process.argv[2] || '.').then(f => console.log(f.join('\n')));
