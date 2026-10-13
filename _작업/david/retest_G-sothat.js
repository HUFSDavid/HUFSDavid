const D0 = require('./david_base');
const path = require('path');
const fs = require('fs');
// 빈칸 ______ 두 개가 한 문장에 있으면 __밑줄__ 서식으로 잘못 읽히므로 U+200B로 끊어 둔다
const ZB = (s) => s.replace(/_{3,}/g, (u) => u.split('').join('​'));
const deep = (v) => typeof v === 'string' ? ZB(v) : Array.isArray(v) ? v.map(deep)
  : (v && typeof v === 'object' && v.constructor === Object) ? Object.fromEntries(Object.entries(v).map(([k, x]) => [k, deep(x)])) : v;
const D = new Proxy(D0, { get: (t, k) => (typeof t[k] === 'function' && !['render', 'P', 'T', 'image'].includes(k)) ? (...a) => t[k](...deep(a)) : t[k] });
const COVER = JSON.parse(process.env.COVER || '{}');
const meta = { series: D.SERIES.G, code: 'G-sothat', title: 'so that', category: 'G. 접속사  |  목적의 so that ~ can · 재시험',
  rightText: 'G  so that 재시험 B', prefix: process.env.PREFIX || '', cover: COVER.title ? { ...COVER, subtitle: (COVER.subtitle || '') + '  ·  재시험 B' } : undefined,
  retest: { set: 'B', total: 10, pass: 8 } };
const build = (m) => [
  ...D.drill(null, '', [
    { level: 'A', type: 'choice', free: true, instr: '괄호 안에서 알맞은 것을 고르시오.', items: [
      { q: 'Dad bought a bigger car so that the whole family (can / could) travel together.', a: 'could', why: '[P1] 주절 과거(bought) → could' },
      { q: 'Ella left home early (so as to / so that) arrive on time.', a: 'so as to', why: '[P2] 뒤에 동사원형 → so as to' },
      { q: 'The water was (so / too) cold that we couldn’t swim.', a: 'so', why: '[P3] 결과 so + 형용사 + that' }] },
    { level: 'B', type: 'fill', free: true, instr: '<보기>에서 알맞은 말을 골라 빈칸에 쓰시오. (한 번씩만 사용)', bogi: ['not', 'that', 'for', 'enough'], items: [
      { q: 'Robots can do dangerous work so [[that]] humans can stay safe.', why: '[P1] 목적 so that + 주어 + can' },
      { q: 'Mom turned down the TV in order [[for]] me to study.', why: '[P2] 주어가 다름 → for + 목적격 + to V' },
      { q: 'I set two alarms so as [[not]] to oversleep.', why: '[P2] 부정 so as not to' },
      { q: 'My little brother is old [[enough]] to ride a bike.', why: '[P3] 형용사 + enough to' }] },
    { level: 'C', type: 'write', free: true, instr: '어법상 틀린 부분을 찾아 바르게 고쳐 쓰시오.', items: [
      { q: 'Sora wore a thick coat so that she won’t catch a cold.', a: 'won’t → wouldn’t', why: '[P1] 주절 과거(wore) → would not' },
      { q: 'He whispered in order to the baby could keep sleeping.', a: 'in order to → so that(in order that)', why: '[P2] 뒤에 절(주어 + 동사)' }] },
    { level: 'D', type: 'multi', free: true, instr: '해당하는 것을 모두 골라 기호를 쓰시오.', items: [
      { q: '다음 중 어법상 옳은 문장을 모두 고르시오.', box: [
        '(a) I’ll leave the door open so that you can come in.', '(b) She locked the door so that nobody can get in.', '(c) We climbed higher in order to get a better view.',
        '(d) The tea was too hot for me to drinking.', '(e) He is strong enough to carry the heavy box.'], a: '(a), (c), (e)', why: '[P1·P2·P3] (b) 주절 과거 → could (d) to + 동사원형 drink' }] },
  ], m),
];
D.render(meta, build, process.argv[2] || '.').then(fs_ => {
  const out = fs_.map(f => { const g = path.join(path.dirname(f), path.basename(f).replace('so that', 'sothat')); fs.renameSync(f, g); return g; });
  console.log(out.join('\n'));
});
