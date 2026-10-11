const D = require('./david_base');
const COVER = JSON.parse(process.env.COVER || '{}');
const meta = { series: D.SERIES.G, code: 'G-시간접속사', title: '시간 접속사', category: 'G. 접속사  |  시간 접속사 · 재시험',
  rightText: 'G  시간 접속사 재시험 B', prefix: process.env.PREFIX || '', cover: COVER.title ? { ...COVER, subtitle: (COVER.subtitle || '') + '  ·  재시험 B' } : undefined,
  retest: { set: 'B', total: 10, pass: 8 } };
const build = (m) => [
  ...D.drill(null, '', [
    { level: 'A', type: 'choice', free: true, instr: '괄호 안에서 알맞은 것을 고르시오.', items: [
      { q: 'I have lived in this town (since / until) I was born.', a: 'since', why: '[P1] 현재완료 + since(~ 이래로)' },
      { q: 'I will text you as soon as I (get / will get) home.', a: 'get', why: '[P2] 시간 부사절 → 현재시제' },
      { q: 'Don’t use your phone (while / during) the test.', a: 'during', why: '[P3] 명사구 → 전치사 during' }] },
    { level: 'B', type: 'fill', free: true, instr: '<보기>에서 알맞은 말을 골라 빈칸에 쓰시오. (한 번씩만 사용)', bogi: ['while', 'until', 'arrives', 'for'], items: [
      { q: 'Let’s stay inside [[until]] the storm is over.', why: '[P1] ~할 때까지' },
      { q: 'I’ll tell him the news when he [[arrives]].', why: '[P2] 시간 부사절 → 현재시제' },
      { q: 'I slept [[for]] nine hours last night.', why: '[P3] 숫자 기간 → for' },
      { q: 'Somebody knocked on the door [[while]] I was taking a shower.', why: '[P1·P3] 주어+동사 → while' }] },
    { level: 'C', type: 'write', free: true, instr: '어법상 틀린 부분을 찾아 바르게 고쳐 쓰시오.', items: [
      { q: 'When the movie will end, we will have dinner.', a: 'will end → ends', why: '[P2] 시간 부사절 → 현재시제' },
      { q: 'The giant trevally jumps out of the water during the bird flies nearby.', a: 'during → when(while)', why: '[P3] 주어+동사 → 접속사' }] },
    { level: 'D', type: 'multi', free: true, instr: '해당하는 것을 모두 골라 기호를 쓰시오.', items: [
      { q: '다음 중 어법상 옳은 문장을 모두 고르시오.', box: [
        '(a) Humpback whales stand on their tails while they sleep.', '(b) She will wait here until the contest will be over.', '(c) I met many friends during my stay in Canada.',
        '(d) Before you go out, put on a coat.', '(e) I have known him since five years.'], a: '(a), (c), (d)', why: '[P1·P2·P3] (b) is over (e) for five years' }] },
  ], m),
];
D.render(meta, build, process.argv[2] || '.').then(f => console.log(f.join('\n')));
