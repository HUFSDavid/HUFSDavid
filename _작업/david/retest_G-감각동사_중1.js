const D0 = require('./david_base');
const path = require('path');
const fs = require('fs');
// 빈칸 ______ 두 개가 한 문장에 있으면 __밑줄__ 서식으로 잘못 읽히므로 U+200B로 끊어 둔다
const ZB = (s) => s.replace(/_{3,}/g, (u) => u.split('').join('​'));
const deep = (v) => typeof v === 'string' ? ZB(v) : Array.isArray(v) ? v.map(deep)
  : (v && typeof v === 'object' && v.constructor === Object) ? Object.fromEntries(Object.entries(v).map(([k, x]) => [k, deep(x)])) : v;
const D = new Proxy(D0, { get: (t, k) => (typeof t[k] === 'function' && !['render', 'P', 'T', 'image'].includes(k)) ? (...a) => t[k](...deep(a)) : t[k] });
const COVER = JSON.parse(process.env.COVER || '{}');
const TITLE = '감각동사';
const meta = { series: D.SERIES.G, code: 'G-감각동사', title: TITLE, category: 'G. 문장의 형식  |  감각동사 + 형용사 · like + 명사 · 재시험',
  rightText: 'G  감각동사 재시험 B', prefix: process.env.PREFIX || '', cover: COVER.title ? { ...COVER, subtitle: (COVER.subtitle || '') + '  ·  재시험 B' } : undefined,
  retest: { set: 'B', total: 10, pass: 8 } };
const build = (m) => [
  ...D.drill(null, '', [
    { level: 'A', type: 'choice', free: true, instr: '괄호 안에서 알맞은 것을 고르시오.', items: [
      { q: 'Your new song (sounds / hears) wonderful.', a: 'sounds', why: '[P1] 귀로 듣고 판단 → sound (hear ✗)' },
      { q: 'The pizza smells (good / well).', a: 'good', why: '[P2] 감각동사 + 형용사 good' },
      { q: 'This cloud (looks / looks like) a rabbit.', a: 'looks like', why: '[P3] 뒤에 명사 → look like' }] },
    { level: 'B', type: 'fill', free: true, instr: '<보기>에서 알맞은 말을 골라 빈칸에 쓰시오. (한 번씩만 사용)', bogi: ['like', 'tastes', 'carefully', 'felt'], items: [
      { q: 'I [[felt]] tired after the long walk.', why: '[P1] 과거 · 몸 상태 → feel' },
      { q: 'This soup [[tastes]] a little salty.', why: '[P1] 맛 → taste' },
      { q: 'He read the letter [[carefully]].', why: '[P2] 일반동사 read + 부사' },
      { q: 'Your plan sounds [[like]] a lot of fun.', why: '[P3] 명사 앞 like' }] },
    { level: 'C', type: 'write', free: true, instr: '우리말과 같은 뜻이 되도록 괄호 안의 말을 이용하여 영작하시오. (필요하면 형태를 바꿀 것)', items: [
      { q: '그 아이스크림은 달콤하고 시원한 맛이 났다. (the ice cream, taste, sweet, cool)', a: 'The ice cream tasted sweet and cool.', why: '[P1·P2] 과거 · and로 이은 형용사 보어' },
      { q: '이 쿠키는 초콜릿 같은 냄새가 난다. (this cookie, smell, chocolate)', a: 'This cookie smells like chocolate.', why: '[P3] like + 명사' }] },
    { level: 'D', type: 'multi', free: true, instr: '해당하는 것을 모두 골라 기호를 쓰시오.', items: [
      { q: '다음 중 어법상 옳은 문장을 모두 고르시오.', box: [
        '(a) Minji’s voice sounds lovely.', '(b) You look tiredly today.', '(c) This blanket feels warm.',
        '(d) He looks like a famous singer.', '(e) The bread smells like delicious.'], a: '(a), (c), (d)', why: '[P1·P2·P3] (b) tired (e) smells delicious' }] },
  ], m),
];
D.render(meta, build, process.argv[2] || '.').then(fs_ => console.log(fs_.join('\n')));
