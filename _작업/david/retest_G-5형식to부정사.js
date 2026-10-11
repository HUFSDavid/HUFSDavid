const D = require('./david_base');
const path = require('path');
const fs = require('fs');
const COVER = JSON.parse(process.env.COVER || '{}');
const meta = { series: D.SERIES.G, code: 'G-5형식to부정사', title: '5형식 + to부정사', category: 'G. 문장의 형식  |  동사 + 목적어 + to부정사 · 재시험',
  rightText: 'G  5형식 + to부정사 재시험 B', prefix: process.env.PREFIX || '', cover: COVER.title ? { ...COVER, subtitle: (COVER.subtitle || '') + '  ·  재시험 B' } : undefined,
  retest: { set: 'B', total: 12, pass: 10 } };
const build = (m) => [
  ...D.drill(null, '', [
    { level: 'A', type: 'choice', free: true, instr: '괄호 안에서 알맞은 것을 고르시오.', items: [
      { q: 'My coach advised us (to warm up / warming up) before every game.', a: 'to warm up', why: '[P1] advise + O + to부정사' },
      { q: 'Grandma told me (don’t worry / not to worry) about her.', a: 'not to worry', why: '[P2] 부정 not + to부정사' },
      { q: 'The funny movie made my little brother (laugh / to laugh) loudly.', a: 'laugh', why: '[P3] 사역동사 make + 동사원형' }] },
    { level: 'B', type: 'fill', free: true, instr: '<보기>에서 알맞은 말을 골라 빈칸에 쓰시오. (한 번씩만 사용)', bogi: ['feel', 'asked', 'to wear', 'not'], items: [
      { q: 'The lifeguard told the kids [[to wear]] life jackets.', why: '[P1] tell + O + to부정사' },
      { q: '“Please water the plants.” → Mina [[asked]] her brother to water the plants.', why: '[P2] 부탁 → ask' },
      { q: 'Dad told us [[not]] to play ball inside the house.', why: '[P2] not + to부정사' },
      { q: 'Warm tea always makes me [[feel]] better.', why: '[P3] make + 동사원형' }] },
    { level: 'C', type: 'write', free: true, instr: '어법상 틀린 부분을 찾아 바르게 고쳐 쓰시오.', items: [
      { q: 'Our teacher wanted we to read three books this month.', a: 'we → us', why: '[P1] 목적어 자리 → 목적격' },
      { q: 'Mr. Choi said to Ben, “Don’t use your phone in class.” → Mr. Choi told Ben not use his phone in class.', a: 'not use → not to use', why: '[P2] 부정 명령문 → not to' },
      { q: 'I watched the baby birds to fly away.', a: 'to fly → fly(flying)', why: '[P3] 지각동사 watch + 동사원형/-ing' }] },
    { level: 'D', type: 'multi', free: true, instr: '해당하는 것을 모두 골라 기호를 쓰시오.', items: [
      { q: '다음 중 어법상 옳은 문장을 모두 고르시오.', box: [
        '(a) The coach encouraged the players doing their best.', '(b) She had her son to wash the dishes.', '(c) I expect you to keep your promise.',
        '(d) Mom wants that I go to bed early.', '(e) We heard someone knock on the door.'], a: '(c), (e)', why: '[P1·P3] (a) to do (b) wash (d) wants me to go' },
      { q: '두 문장의 의미가 같은 것을 모두 고르시오.', box: [
        '(a) Sam said to me, “Close the door.” = Sam told me to close the door.', '(b) Ms. Park let us leave early. = Ms. Park allowed us to leave early.',
        '(c) Ann said to Tim, “Don’t be noisy.” = Ann told Tim to be not noisy.', '(d) I told him that he should study. = I told him studying.',
        '(e) He got me to fix the chair. = He had me fix the chair.'], a: '(a), (b), (e)', why: '[P2·P3] (c) not to be noisy (d) to study' }] },
  ], m),
];
D.render(meta, build, process.argv[2] || '.').then(fs_ => {
  const out = fs_.map(f => { const g = path.join(path.dirname(f), path.basename(f).replace('5형식 + to부정사', '5형식to부정사')); fs.renameSync(f, g); return g; });
  console.log(out.join('\n'));
});
