const D = require('./david_base');
const COVER = JSON.parse(process.env.COVER || '{}');
const meta = { series: D.SERIES.G, code: 'G-가정법과거', title: '가정법 과거', category: 'G. 가정법  |  가정법 과거 · 재시험',
  rightText: 'G  가정법 과거 재시험 B', prefix: process.env.PREFIX || '', cover: COVER.title ? { ...COVER, subtitle: (COVER.subtitle || '') + '  ·  재시험 B' } : undefined,
  retest: { set: 'B', total: 10, pass: 8 } };
const build = (m) => [
  ...D.drill(null, '', [
    { level: 'A', type: 'choice', free: true, instr: '괄호 안에서 알맞은 것을 고르시오.', items: [
      { q: 'If my uncle (lives / lived) in Korea, I could see him more often.', a: 'lived', why: '[P1] 주절 could → if절 과거형' },
      { q: 'I wish my school (had / has) a swimming pool.', a: 'had', why: '[P3] I wish + 과거형' },
      { q: 'If it (gets / got) dark soon, we will turn on the lights.', a: 'gets', why: '[P4] 주절 will — 단순 조건문 현재시제' }] },
    { level: 'B', type: 'fill', free: true, instr: '<보기>에서 알맞은 말을 골라 빈칸에 쓰시오. (한 번씩만 사용)', bogi: ['for', 'isn’t', 'could', 'weren’t'], items: [
      { q: 'As my brother is sick, he can’t play outside. = If my brother [[weren’t]] sick, he could play outside.', why: '[P2] is → weren’t (긍정 ↔ 부정)' },
      { q: 'If it were not [[for]] the map, we would get lost.', why: '[P4] If it were not for = Without' },
      { q: 'I’m sorry that I can’t ride a bike. = I wish I [[could]] ride a bike.', why: '[P3] can’t → could' },
      { q: 'If the store were open, we could buy milk. = As the store [[isn’t]] open, we can’t buy milk.', why: '[P2] were → isn’t (직설법 현재)' }] },
    { level: 'C', type: 'write', free: true, instr: '어법상 틀린 부분을 찾아 바르게 고쳐 쓰시오.', items: [
      { q: 'If I were a doctor, I will help sick people for free. (내가 의사라면 아픈 사람들을 무료로 도울 텐데.)', a: 'will → would', why: '[P1] 가정법 주절 would + 동사원형' },
      { q: 'As I don’t know the way, I can’t guide you. = If I know the way, I could guide you.', a: 'know → knew', why: '[P2] 현재 부정 → 과거 긍정' }] },
    { level: 'D', type: 'multi', free: true, instr: '해당하는 것을 모두 골라 기호를 쓰시오.', items: [
      { q: '다음 중 어법상 옳은 문장을 모두 고르시오.', box: [
        '(a) If she has a key, she could open the door.', '(b) I wish I were on vacation now.', '(c) Without the bamboo, the painting would look empty.',
        '(d) If it will be sunny tomorrow, we’ll go hiking.', '(e) If I had a dog, I would walk it every day.'], a: '(b), (c), (e)', why: '[P3·P4·P1] (a) has → had (d) will be → is' }] },
  ], m),
];
D.render(meta, build, process.argv[2] || '.').then(f => console.log(f.join('\n')));
