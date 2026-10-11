const D0 = require('./david_base');
const path = require('path');
const fs = require('fs');
// 한 문장에 빈칸 ______ 이 두 개 이상이면 david_base의 __밑줄__ 서식으로 잘못 읽히므로
// 밑줄 3개 이상 이어진 빈칸은 밑줄 사이에 U+200B를 넣어 둔다 (sothat · 부정대명사 스크립트와 같은 처리).
const ZB = (s) => s.replace(/_{3,}/g, (u) => u.split('').join('​'));
const deep = (v) => typeof v === 'string' ? ZB(v) : Array.isArray(v) ? v.map(deep)
  : (v && typeof v === 'object' && v.constructor === Object) ? Object.fromEntries(Object.entries(v).map(([k, x]) => [k, deep(x)])) : v;
const D = new Proxy(D0, { get: (t, k) => (typeof t[k] === 'function' && !['render', 'P', 'T', 'image'].includes(k)) ? (...a) => t[k](...deep(a)) : t[k] });
const COVER = JSON.parse(process.env.COVER || '{}');
const TITLE = 'the + 비교급, the + 비교급';
const meta = { series: D.SERIES.G, code: 'G-the비교급', title: TITLE, category: 'G. 비교  |  The + 비교급 ~, the + 비교급 … (~할수록 더 …하다)',
  rightText: 'G  the + 비교급, the + 비교급', prefix: process.env.PREFIX || '', cover: COVER.title ? COVER : undefined,
  question: '~~The more sincere~~ your apology is, ~~the better~~ it will be received. — 원래는 Your apology is more sincere.인데, 왜 more sincere가 주어 앞으로 나왔고 the는 왜 두 번이나 붙었을까?' };

const build = (m) => [
  D.section('FLOW', 'Teaching Flow — 처음 배우는 사람도 따라오는 5단계'),
  ...D.step(1, '우리말로 먼저 생각하기 — ‘~할수록 더 …하다’', [
    '‘높이 올라갈수록 더 추워졌다.’ — 한쪽이 {{커지면}} 다른 쪽도 함께 커진다(비례).',
    '우리말은 ‘~할수록’ 한 마디면 되지만, 영어는 앞 절과 뒤 절을 모두 {{The + 비교급}}으로 시작해서 짝을 맞춘다.'], m),
  ...D.step(2, '이전 학년 복습 — 비교급 만들기', [
    'tall → **taller** / big → **bigger** / early → **earlier** (짧은 말은 {{-er}})',
    'sincere → **more sincere** / good · well → {{better}} / bad → **worse** / much · many → **more** / little → **less**'], m),
  ...D.step(3, '문제 제기 — 본문 문장은 왜 순서가 이상할까?', [
    'The more sincere your apology is, the better it will be received. (본문)',
    '보통은 Your apology is more sincere. — 그런데 왜 more sincere가 주어 your apology 앞으로 나왔을까?'], m),
  ...D.step(4, '규칙 발견 — 원래 문장에서 비교급만 꺼내 맨 앞으로', [
    'your apology is {{more sincere}} → The more sincere + your apology is',
    'it will be received {{better}} → the better + it will be received / 비교급에 딸린 명사(more vegetables)는 함께 이동!'], m),
  ...D.step(5, '결론 🔑', [
    'The + 비교급 + 주어 + 동사 ~, the + 비교급 + 주어 + 동사 … = ~할수록 더 …하다 / 두 절 모두 {{the}}가 필수 / 비교급은 한 번만(more better ✗) / be동사 보어는 {{형용사}}(sincere), 일반동사를 꾸미면 부사(harder)'], m),
  ...D.infoBox('오늘의 핵심 3문장', [
    '① The more sincere your apology is, {{the better}} it will be received. (본문)',
    '② The higher we went, the {{colder}} we felt. (교과서 Grammar✚ · 부사 비교급)',
    '③ The more {{vegetables}} you have, the healthier you will be. (교과서 Grammar✚ · 명사는 비교급 뒤)'], m),
  ...D.tip(['칠판에 시소를 그리고 양쪽 끝에 [The + 비교급][주어 + 동사]를 한 칸씩 쓴다. 학생에게 먼저 평서문(your apology is more sincere)을 쓰게 하고, 비교급 덩어리만 동그라미 쳐서 the와 함께 맨 앞으로 옮기는 화살표를 그리게 하면 어순 실수가 줄어든다.',
    '같은 과 문법 관계부사 how와 한 문항에 섞여 나오므로(기출 15 · 16번) PERFECT CHECK에 how 2문항을 넣었다. As 전환과 비교급 강조(본문 even more hurt)는 Point 3에서 정리한다.'], m),

  // ---------------- Point 1 ----------------
  D.section('Point 1', '기본 구조 · 어순 — The + 비교급 + 주어 + 동사, the + 비교급 + 주어 + 동사', 'point'),
  ...D.table(['구성', '판단 기준 · 설명', '예'], [
    ['기본 구조', '두 절 모두 the + 비교급으로 시작하고, 그 뒤에 주어 + 동사', 'The **faster** you walk, the **earlier** you will arrive. (교과서)'],
    ['어순 — 비교급이 맨 앞', '원래 자리(보어 · 부사 자리)에 있던 비교급을 the와 함께 절 맨 앞으로', 'your apology is more sincere → **The more sincere your apology is** (The more your apology is sincere ✗) (기출 57)'],
    ['형용사 vs 부사', 'be · become · feel 뒤 보어 자리면 형용사, 일반동사를 꾸미면 부사', 'The more **sincere** your apology is (sincerely ✗) / The **harder** you work (본문 · 교과서)'],
    ['비교급 형태', '-er · more + 원급 — 둘 중 하나만', 'the **earlier** (the early ✗) / the **more intelligent** (the intelligenter ✗) / the **wiser** (the more wise ✗) (기출 11 · 13 · 17)'],
    ['불규칙 비교급', 'good · well – better, bad – worse, much · many – more, little – less, far – farther', 'The more I painted, the **worse** the wall looked. (교과서)']], [2300, 3300, 4038], m),
  ...D.infoBox('3단계로 만들기', [
    '① 원래 문장 쓰기: your apology is {{more sincere}} / it will be received better',
    '② 비교급 덩어리에 The를 붙여 맨 앞으로: {{The more sincere}} … , the better …',
    '③ 나머지 주어 + 동사는 그 뒤에 그대로: The more sincere {{your apology is}}, the better {{it will be received}}'], m),
  ...D.trick('비교급은 the 모자를 쓰고 맨 앞줄로', ['‘더’가 붙은 말은 the 모자를 쓴다', '모자를 쓰면 맨 앞줄로 나간다', '주어 · 동사는 뒤에서 그대로 따라온다 — 모자는 두 절 모두 하나씩!']),
  ...D.examPoint([
    { q: 'The faster you run, the {{earlier}} you will get there.', why: 'early의 비교급 earlier — the early ✗ (기출 13 ②)' },
    { q: 'The {{more sincere}} your apology is, the better it will be received.', why: '보어 형용사의 비교급이 the와 함께 맨 앞 (본문 · 기출 57)' }], m),
  ...D.caution(['비교급을 두 번 쓴 이중 비교(the more fresher ✗, the more wise ✗)와 최상급(the most people ✗)이 개수 · 모두 고르기 선지에 함께 나온다. (기출 16 · 17)',
    '본문 문장을 The more your apology is sincere ✗ / The more sincerely your apology is ✗로 바꾼 어순 · 품사 문항이 단골이다. (기출 57 · 본문 7단계)',
    '두 번째 절 앞 the를 뺀 선지(The darker it gets, lower the temperature will be ✗)를 고르게 한다. (기출 16 ⓑ)',
    '본문 문장의 received를 refused로 바꾼 어휘 문항(기출 60)과 will receive(능동 ✗)로 바꾼 어법 문항이 함께 나오므로 해석까지 확인시킨다.'], m),
  ...D.drill(1, '기본 구조 · 어순 · 비교급 형태', [
    { level: 'Basic ①', type: 'choice', instr: '괄호 안에서 알맞은 것을 고르시오.', items: [
      { q: 'The more sincere your apology is, (better / the better) it will be received.', a: 'the better', why: '두 번째 절도 the + 비교급 (본문)' },
      { q: 'The faster you walk, the (earlier / early) you will arrive.', a: 'earlier', why: 'early의 비교급 (교과서)' },
      { q: 'The (more sincerely / more sincere) your apology is, the better it will be received.', a: 'more sincere', why: 'be동사의 보어 → 형용사 (본문)' },
      { q: 'The higher we went, the (more cold / colder) we felt.', a: 'colder', why: 'cold → colder (교과서 Grammar✚)' },
      { q: 'The more you read, the (more intelligent / intelligenter) you can be.', a: 'more intelligent', why: '긴 형용사는 more + 원급 (기출 11)' },
      { q: 'The older we grow, the (wiser / more wise) we become.', a: 'wiser', why: 'wise → wiser (기출 17)' },
      { q: 'The (hard / harder) you work, the more tired you will feel.', a: 'harder', why: '앞 절도 the + 비교급 (기출 13)' },
      { q: 'The more I painted, the (worse / badder) the wall looked.', a: 'worse', why: 'bad – worse 불규칙 (교과서)' },
      { q: 'The farther we are from the city, the (fresher / more fresher) the air will be.', a: 'fresher', why: '이중 비교 ✗ (기출 16 ⓔ)' },
      { q: 'The (close / closer) you get to the fire, the warmer you feel.', a: 'closer', why: 'the + 비교급' }] },
    { level: 'Basic ②', type: 'fill', instr: '<보기>에서 알맞은 말을 골라 빈칸에 쓰시오. (한 번씩만 사용)',
      bogi: ['worse', 'the better', 'older', 'healthier', 'more', 'colder', 'The', 'earlier', 'less', 'harder'], items: [
      { q: 'The more sincere your apology is, [[the better]] it will be received.', why: '본문 — good · well의 비교급' },
      { q: 'The faster you walk, the [[earlier]] you will arrive.', why: '교과서' },
      { q: 'The higher we went, the [[colder]] we felt.', why: '교과서 Grammar✚' },
      { q: 'The [[harder]] you work, the brighter your future will be.', why: '교과서 — 일반동사를 꾸미는 부사 비교급' },
      { q: 'The [[older]] you get, the wiser you will become.', why: '교과서' },
      { q: 'The more I painted, the [[worse]] the wall looked.', why: '교과서 — bad – worse' },
      { q: 'The smaller the plant is, the [[less]] water it needs.', why: '기출 11 — little – less' },
      { q: 'The more you smile, the [[healthier]] you become.', why: '기출 23' },
      { q: '[[The]] earlier you get up in the morning, the fresher you will feel.', why: '교과서 — 앞 절도 The' },
      { q: 'The more you give, the [[more]] you will get in return.', why: '교과서 — much – more' }] },
    { level: 'Intermediate', type: 'write', instr: '어법상 틀린 부분을 찾아 바르게 고쳐 쓰시오.', items: [
      { q: 'The more sincerely your apology is, the better it will be received.', a: 'sincerely → sincere', why: '본문 변형 — be동사의 보어는 형용사' },
      { q: 'The faster you run, the early you will get there.', a: 'early → earlier', why: '기출 13 ②' },
      { q: 'The darker it gets, lower the temperature will be.', a: 'lower → the lower', why: '기출 16 ⓑ — 두 번째 절의 the' },
      { q: 'The more you read, the intelligenter you can be.', a: 'the intelligenter → the more intelligent', why: '기출 11 — 긴 형용사는 more' },
      { q: 'The older we grow, the more wise we become.', a: 'the more wise → the wiser', why: '기출 17 — wise → wiser' },
      { q: 'The farther we are away from the city, the more fresher the air will be.', a: 'the more fresher → the fresher', why: '기출 16 ⓔ — 이중 비교 ✗' },
      { q: 'The cheaper the product is, the most people will buy it.', a: 'the most → the more', why: '기출 16 ⓓ 변형 — 최상급 ✗' },
      { q: 'The more your apology is sincere, the better it will be received.', a: 'The more your apology is sincere → The more sincere your apology is', why: '기출 57 ③ — 비교급 덩어리가 함께 맨 앞' },
      { q: 'More you practice, the better you will be at it.', a: 'More → The more', why: '앞 절도 the + 비교급' },
      { q: 'The harder they worked, the more they get paid.', a: 'get → got', why: '기출 11 — 앞 절이 과거(worked)' }] },
    { level: 'Advanced · 모두 고르기', type: 'multi', free: true, instr: '해당하는 것을 모두 골라 기호를 쓰시오.', items: [
      { q: '다음 중 어법상 옳은 문장을 모두 고르시오.', box: [
        '(a) The faster you run, the early you will get there.', '(b) The more you give, the better you will feel.', '(c) The darker it gets, lower the temperature will be.',
        '(d) The harder you work, the more tired you will feel.', '(e) The higher you go up the mountain, the fresher you will feel.'], a: '(b), (d), (e)', why: '(a) earlier (c) the lower (기출 13 · 16 변형)' },
      { q: '밑줄 친 부분에 대한 설명으로 옳은 것을 모두 고르시오.', box: [
        '(a) __The more sincere your apology is__ → 원래 문장은 Your apology is more sincere.이다.',
        '(b) the better it will be __received__ → 사과가 받아들여지는 수동 관계라 be received를 썼다.',
        '(c) The __more sincere__ your apology is → more sincerely로 바꿔도 어법상 옳다.',
        '(d) The faster you walk, __the earlier__ you will arrive. → 두 번째 절의 the는 생략할 수 있다.',
        '(e) The more I painted, the __worse__ the wall looked. → bad의 비교급 worse를 썼다.'], a: '(a), (b), (e)', why: '(c) be동사의 보어 → 형용사만 ○ (d) the는 두 절 모두 필수' },
      { q: '다음 대화의 밑줄 친 ⓐ~ⓔ 중 어법상 어색한 것을 모두 골라 기호를 쓰고 바르게 고치시오.', fix: true, label: '기호 / 고친 것', box: [
        'A: How can I get better at English? — B: ⓐ __The more you practice__, the better you will be.',
        'A: Why are you studying so hard? — B: ⓑ __The harder I study__, the higher my test score will be.',
        'A: Should I leave now? — B: Yes. ⓒ __The earlier you leave__, the sooner you will arrive.',
        'A: How was the hike? — B: Great! ⓓ __The higher we went, the more cold__ we felt.',
        'A: Do you like Jinsu? — B: Yes. The more I know him, ⓔ __our friendship becomes deeper__.'], a: 'ⓓ the more cold → the colder, ⓔ → the deeper our friendship becomes', why: 'ⓓ cold → colder ⓔ 두 번째 절도 the + 비교급 + 주어 + 동사 (교과서)' },
      { q: '비교급의 형태가 바르게 쓰인 문장을 모두 고르시오.', box: [
        '(a) The more you exercise, the healthier you get.', '(b) The older we grow, the more wise we become.', '(c) The smaller the plant is, the less water it needs.',
        '(d) The more fame you get, the more polite you have to be.', '(e) The cheaper it is, the most people will buy it.'], a: '(a), (c), (d)', why: '(b) wiser (e) more (기출 11 · 16 · 17 변형)' }] },
    { level: 'Advanced · 객관식', type: 'mcq', free: true, instr: '알맞은 답을 고르시오.', items: [
      { q: '다음 글의 빈칸 (A)에 들어갈 표현으로 알맞은 것은?', box: ['You should be sincere when you apologize. Apologizing is necessary to build good friendships. Saying you’re sorry is more than just words. If you truly want to make things right, be sincere in your apology. (A)______'], opts: [
        'The more casual your apology is, the better it will be received.', 'The more your apology is sincere, the better it will be received.', 'The less sincere your apology is, the more it will be received.',
        'The more sincere your apology is, the better it will be received.', 'Your apology is the more casual, it will be received the more.'], a: '④', why: '흐름상 sincere · 어순 The more sincere your apology is (기출 57)' },
      { q: '다음 중 밑줄 친 부분이 어법상 어색한 것은?', opts: [
        'The more you give, __the better__ you will feel.', 'The faster you run, __the early__ you will get there.', 'The harder you work, __the more tired__ you will feel.',
        'The higher you go up the mountain, __the fresher__ you will feel.', 'The more you play computer games, __the worse__ your result will get.'], a: '②', why: '② the earlier (기출 13)' },
      { q: '(A)~(C)에 알맞은 말이 바르게 짝지어진 것은? — The more you read, (A)(the intelligenter / the more intelligent) you can be! / The harder they worked, the more they (B)(get / got) paid. / The smaller the plant is, (C)(the little / the less) water it needs.', opts: [
        'the intelligenter – got – the little', 'the more intelligent – get – the less', 'the intelligenter – get – the little',
        'the more intelligent – got – the little', 'the more intelligent – got – the less'], a: '⑤', why: '(A) more + 원급 (B) 과거 worked → got (C) little – less (기출 11)' },
      { q: '다음 중 어법상 알맞은 문장의 개수는?', box: [
        '(a) The harder you try, the better your future will be.', '(b) The darker it gets, lower the temperature will be.', '(c) The more fame you get, the more polite you have to be.',
        '(d) The cheaper the product is, the most people will buy it.', '(e) The farther we are away from the city, the more fresher the air will be.'], opts: ['1개', '2개', '3개', '4개', '5개'], a: '②', why: '(a) (c)만 ○ — (b) the lower (d) the more (e) the fresher (기출 16)' },
      { q: '다음 우리말을 바르게 영작한 것은? — 네가 더 많이 웃을수록, 너는 더 건강해진다.', opts: [
        'The more you smile, the healthier you become.', 'The more you smile, you become healthier.', 'More you smile, the healthier you become.',
        'The more you smile, the more healthier you become.', 'The most you smile, the healthiest you become.'], a: '①', why: '기출 23 — 두 절 모두 the + 비교급, 이중 비교 ✗' }] },
    { level: '전환 · 연결', type: 'write', instr: '두 문장을 the + 비교급, the + 비교급을 사용하여 한 문장으로 연결하시오.', items: [
      { q: 'Your apology is more sincere. / It will be received better.', a: 'The more sincere your apology is, the better it will be received.', why: '본문' },
      { q: 'You walk faster. / You will arrive earlier.', a: 'The faster you walk, the earlier you will arrive.', why: '교과서' },
      { q: 'We went higher. / We felt colder.', a: 'The higher we went, the colder we felt.', why: '교과서 Grammar✚' },
      { q: 'You work harder. / Your future will be brighter.', a: 'The harder you work, the brighter your future will be.', why: '교과서' },
      { q: 'You get older. / You will become wiser.', a: 'The older you get, the wiser you will become.', why: '교과서' },
      { q: 'You get up earlier in the morning. / You will feel fresher.', a: 'The earlier you get up in the morning, the fresher you will feel.', why: '교과서 — 나머지 부분(in the morning)은 동사 뒤에 그대로' },
      { q: 'I painted more. / The wall looked worse.', a: 'The more I painted, the worse the wall looked.', why: '교과서' },
      { q: 'I know him more. / Our friendship becomes deeper.', a: 'The more I know him, the deeper our friendship becomes.', why: '교과서' },
      { q: 'You go higher up the mountain. / You can see more of the lake below.', a: 'The higher you go up the mountain, the more you can see of the lake below.', why: '교과서' },
      { q: 'You smile more. / You become healthier.', a: 'The more you smile, the healthier you become.', why: '기출 23' }] },
  ], m),

  // ---------------- Point 2 ----------------
  D.section('Point 2', 'the more / the less + 명사 · 생략형 · 시제 — The more books you read, … / The sooner, the better', 'point'),
  ...D.table(['구성', '역할 · 설명', '예'], [
    ['the more + 명사', '명사는 비교급 바로 뒤에 붙어 함께 맨 앞으로', 'The **more vegetables** you have, the healthier you will be. (교과서 Grammar✚) / The **more time** I spend with her, the more I like her. (교과서)'],
    ['the less · fewer + 명사', '셀 수 없는 명사는 less(little), 셀 수 있는 명사는 fewer(few)', 'The smaller the plant is, the **less water** it needs. (기출 11) / the **fewer mistakes**'],
    ['the more 혼자', 'much의 비교급 more — ‘더 많이’ (동사를 꾸미거나 목적어 역할)', 'The **more** you give, the **more** you will get in return. (교과서)'],
    ['명사 떼어 놓기 ✗', '비교급과 명사를 떨어뜨려 명사를 동사 뒤에 남기면 ✗', 'The more people we invite (The more we invite people ✗) / the more orphans (the many orphans ✗) (기출 17)'],
    ['생략형 (관용)', '주어 + 동사를 빼고 the + 비교급만 남긴다', '**The sooner, the better.** (빠를수록 좋다) (교과서 Grammar✚) / **The more, the merrier.** (많을수록 즐겁다)'],
    ['시제', '앞 절(조건)은 현재, 뒤 절(결과)은 will — 과거 이야기는 두 절 모두 과거', 'The faster you walk, the earlier you **will** arrive. / The harder they worked, the more they **got** paid. (기출 11)']], [2300, 3300, 4038], m),
  ...D.infoBox('명사가 있으면 같이 데리고 간다', [
    '① you have {{more vegetables}} → The more vegetables you have',
    '② we invite more people → The {{more people}} we invite',
    '③ 명사가 없으면 more 혼자: The more {{you give}}, the more you will get in return.'], m),
  ...D.trick('비교급은 명사와 손잡고 이사 간다', ['more만 앞으로 가고 books는 집에 두면 ✗', 'The more books you read — 손 꼭 잡고 함께', '짐(주어 · 동사)은 뒤에서 따라온다']),
  ...D.examPoint([
    { q: 'The more {{vegetables}} you have, the healthier you will be.', why: '동사의 목적어 명사는 비교급 바로 뒤 (교과서 Grammar✚)' },
    { q: 'The {{sooner}}, the better. (빠르면 빠를수록 좋다.)', why: '관용 생략형 — 주어 + 동사 생략 (교과서 Grammar✚)' }], m),
  ...D.caution(['우리말 영작 ‘누가 바르게 썼나’ 문항(기출 17): The more people we invite ○ / The more we practice, the better performance we can show ○ / the many orphans ✗ / the more wise ✗ — 명사 동반과 형태를 함께 판단해야 한다.',
    'much · healthy를 주고 ____ ____ you exercise, ____ ____ you get.을 채우게 하는 조건 영작(기출 22)과 단어 수 조건 영작(기출 23) — the를 빠뜨리면 단어 수가 맞지 않는다.',
    '생략형 The sooner, the better.에서 the를 빼거나(Sooner, the better ✗) 최상급(the best ✗)으로 바꾼 선지를 확인시킨다.',
    'little – less(양) · few – fewer(수)는 교과서 범위를 조금 넘지만 the less water(기출 11)가 나왔으므로 fewer와 대비해 짧게 다룬다.'], m),
  ...D.drill(2, 'the more / the less + 명사 · 생략형 · 시제', [
    { level: 'Basic ①', type: 'choice', instr: '괄호 안에서 알맞은 것을 고르시오.', items: [
      { q: 'The more (vegetables you have / you have vegetables), the healthier you will be.', a: 'vegetables you have', why: '명사는 비교급 바로 뒤 (교과서 Grammar✚)' },
      { q: 'The smaller the plant is, the (little / less) water it needs.', a: 'less', why: 'little – less (기출 11)' },
      { q: 'The more money we earn, the (many / more) orphans we can help.', a: 'more', why: 'many – more (기출 17)' },
      { q: '(The sooner / Sooner), the better.', a: 'The sooner', why: '관용 생략형 — the 필수' },
      { q: 'The more time I spend with her, the (more / most) I like her.', a: 'more', why: '최상급 ✗ (교과서)' },
      { q: 'The harder they worked, the more they (get / got) paid.', a: 'got', why: '과거 이야기 — 두 절 모두 과거 (기출 11)' },
      { q: 'The more you give, the more you (will get / got) in return.', a: 'will get', why: '앞 절 현재 → 뒤 절 미래 (교과서)' },
      { q: 'The (less / fewer) mistakes you make, the higher your score will be.', a: 'fewer', why: 'mistakes는 셀 수 있는 명사 → fewer' },
      { q: 'The more, the (merry / merrier).', a: 'merrier', why: '관용 생략형 — 많을수록 즐겁다' },
      { q: 'The (more people / people more) we invite, the louder we have to sing.', a: 'more people', why: '명사는 비교급 바로 뒤 (기출 17)' }] },
    { level: 'Basic ②', type: 'fill', instr: '<보기>에서 알맞은 말을 골라 빈칸에 쓰시오. (한 번씩만 사용)',
      bogi: ['louder', 'got', 'merrier', 'vegetables', 'fewer', 'sooner', 'healthier', 'orphans', 'less', 'more'], items: [
      { q: 'The more [[vegetables]] you have, the healthier you will be.', why: '교과서 Grammar✚ — 명사는 비교급 뒤' },
      { q: 'The smaller the plant is, the [[less]] water it needs.', why: '기출 11' },
      { q: 'The [[sooner]], the better.', why: '교과서 Grammar✚ — 생략형' },
      { q: 'The more, the [[merrier]].', why: '관용 생략형' },
      { q: 'The more time I spend with her, the [[more]] I like her.', why: '교과서' },
      { q: 'The more people we invite, the [[louder]] we have to sing.', why: '기출 17' },
      { q: 'The more money we earn, the more [[orphans]] we can help.', why: '기출 17 — more + 명사' },
      { q: 'The [[fewer]] mistakes you make, the higher your score will be.', why: '셀 수 있는 명사 → fewer' },
      { q: 'The harder they worked, the more they [[got]] paid.', why: '기출 11 — 과거' },
      { q: 'The more you exercise, the [[healthier]] you get.', why: '기출 22' }] },
    { level: 'Intermediate', type: 'write', instr: '어법상 틀린 부분을 찾아 바르게 고쳐 쓰시오.', items: [
      { q: 'The more we invite people, the louder we have to sing.', a: 'The more we invite people → The more people we invite', why: '기출 17 — 명사는 비교급 뒤' },
      { q: 'The more money we earn, the many orphans we can help.', a: 'many → more', why: '기출 17' },
      { q: 'The smaller the plant is, the little water it needs.', a: 'little → less', why: '기출 11' },
      { q: 'The more you have vegetables, the healthier you will be.', a: 'The more you have vegetables → The more vegetables you have', why: '교과서 Grammar✚' },
      { q: 'Sooner, the better.', a: 'Sooner → The sooner', why: '생략형도 the 필수' },
      { q: 'The less mistakes you make, the higher your score will be.', a: 'less → fewer', why: '셀 수 있는 명사 mistakes' },
      { q: 'The more time I spend with her, the most I like her.', a: 'most → more', why: '최상급 ✗ (교과서)' },
      { q: 'The more you exercise, the healthy you get.', a: 'healthy → healthier', why: '기출 22' },
      { q: 'The more, the merry.', a: 'merry → merrier', why: '관용 생략형' },
      { q: 'The more you give, the more will you get in return.', a: 'will you get → you will get', why: '주어 + 동사 어순 (의문문 어순 ✗)' }] },
    { level: 'Advanced · 모두 고르기', type: 'multi', free: true, instr: '해당하는 것을 모두 골라 기호를 쓰시오.', items: [
      { q: '다음 우리말을 영작한 것 중 옳은 것을 모두 고르시오.', box: [
        '(a) 우리가 더 많은 사람들을 초대할수록, 우리는 더 크게 노래를 불러야 한다. → The more people we invite, the louder we have to sing.',
        '(b) 우리는 나이가 들면 들수록 더 현명해진다. → The older we grow, the more wise we become.',
        '(c) 우리가 더 많이 연습할수록, 우리는 더 나은 공연을 보여줄 수 있다. → The more we practice, the better performance we can show.',
        '(d) 우리가 더 많은 돈을 벌수록, 더 많은 고아들을 도울 수 있다. → The more money we earn, the many orphans we can help.',
        '(e) 빠르면 빠를수록 좋다. → The sooner, the better.'], a: '(a), (c), (e)', why: '(b) the wiser (d) the more orphans (기출 17 변형)' },
      { q: '빈칸에 more가 들어갈 수 있는 것을 모두 고르시오.', box: [
        '(a) The ______ books you read, the smarter you become.', '(b) The ______ water you drink, the healthier your skin will be.', '(c) The smaller the plant is, the ______ water it needs.',
        '(d) The ______ mistakes you make, the better your grade will be.', '(e) The more you give, the ______ you will get in return.'], a: '(a), (b), (e)', why: '(c) less — 더 적은 물 (d) fewer — 더 적은 실수' },
      { q: '다음 글의 밑줄 친 ⓐ~ⓔ 중 어법상 어색한 것을 모두 골라 기호를 쓰고 바르게 고치시오.', fix: true, label: '기호 / 고친 것', box: [
        'My Wise Sayings — ⓐ __The more you help others__, the happier you will be. ⓑ __The harder you study__, the higher your test score will be. ⓒ __The more you have friends__, the more fun your school life will be. ⓓ __The earlier you start something__, the sooner you will finish it. And remember: ⓔ __Sooner, the better__!'], a: 'ⓒ → The more friends you have, ⓔ → The sooner, the better', why: 'ⓒ 명사는 비교급 뒤 ⓔ 생략형도 the 필수 (교과서 Writing 변형)' },
      { q: '다음 우리말을 영작한 것 중 옳은 것을 모두 고르시오.', box: [
        '(a) 많을수록 더 즐겁다. → The more, the merrier.', '(b) 네가 물을 더 많이 마실수록, 너는 더 건강해질 것이다. → The more you drink water, the healthier you will be.',
        '(c) 우리가 더 많은 돈을 벌수록, 우리는 더 많은 고아를 도울 수 있다. → The more money we earn, the more orphans we can help.',
        '(d) 그 식물이 작을수록, 그것은 더 적은 물이 필요하다. → The smaller the plant is, the less water it needs.', '(e) 빠르면 빠를수록 좋다. → The sooner, the best.'], a: '(a), (c), (d)', why: '(b) The more water you drink (e) the better' }] },
    { level: 'Advanced · 객관식', type: 'mcq', free: true, instr: '알맞은 답을 고르시오.', items: [
      { q: '다음 중 우리말을 알맞게 영작한 사람을 모두 골라 짝지은 것은?', box: [
        '수진: 우리가 더 많은 사람들을 초대할수록, 우리는 더 크게 노래를 불러야 한다. → The more people we invite, the louder we have to sing.',
        '민호: 우리는 나이가 들면 들수록 더 현명해진다. → The older we grow, the more wise we become.',
        '지아: 우리가 더 많이 연습할수록, 우리는 더 나은 공연을 보여줄 수 있다. → The more we practice, the better performance we can show.',
        '태오: 우리가 더 많은 돈을 벌수록, 더 많은 고아들을 도울 수 있다. → The more money we earn, the many orphans we can help.'], opts: [
        '수진, 태오', '수진, 지아', '수진, 민호', '수진, 지아, 태오', '수진, 지아, 민호'], a: '②', why: '민호 the wiser / 태오 the more orphans (기출 17)' },
      { q: '다음 문장의 빈칸에 들어갈 말로 알맞은 것은? — The smaller the plant is, the ______ water it needs.', opts: [
        'little', 'few', 'fewer', 'less', 'least'], a: '④', why: 'water는 셀 수 없는 명사 · the + 비교급 → less (기출 11)' },
      { q: '<조건>에 맞게 문장을 완성할 때 빈칸에 차례대로 들어갈 말은? — <조건> much, healthy를 사용할 것 · 비교급 구문을 사용할 것 / ____ ____ you exercise, ____ ____ you get.', opts: [
        'The much – the healthy', 'The more – the more healthy', 'More – healthier', 'The most – the healthiest', 'The more – the healthier'], a: '⑤', why: 'much – more, healthy – healthier (기출 22)' },
      { q: '다음 중 어법상 어색한 문장은?', opts: [
        'The more we invite people, the louder we have to sing.', 'The sooner, the better.', 'The more vegetables you have, the healthier you will be.',
        'The more time I spend with her, the more I like her.', 'The more, the merrier.'], a: '①', why: '① The more people we invite' },
      { q: '다음 중 어법상 알맞은 문장의 개수는?', box: [
        '(a) The less water you use, the more money you save.', '(b) The fewer cars there are, the cleaner the air is.', '(c) The more you have books, the smarter you become.',
        '(d) Sooner, the better.', '(e) The harder they worked, the more they got paid.'], opts: ['1개', '2개', '3개', '4개', '5개'], a: '③', why: '(a) (b) (e) ○ — (c) The more books you have (d) The sooner' }] },
    { level: '전환 · 영작', type: 'write', instr: '우리말과 같은 뜻이 되도록 괄호 안의 말을 이용하여 영작하시오. (필요하면 형태를 바꿀 것)', items: [
      { q: '네가 채소를 더 많이 먹을수록, 너는 더 건강해질 것이다. (vegetables, have, healthy)', a: 'The more vegetables you have, the healthier you will be.', why: '교과서 Grammar✚' },
      { q: '빠르면 빠를수록 좋다. (soon, good)', a: 'The sooner, the better.', why: '교과서 Grammar✚ — 생략형' },
      { q: '많을수록 더 즐겁다. (many, merry)', a: 'The more, the merrier.', why: '관용 생략형' },
      { q: '내가 그녀와 더 많은 시간을 보낼수록, 나는 그녀가 더 좋다. (time, spend, like)', a: 'The more time I spend with her, the more I like her.', why: '교과서' },
      { q: '그 식물이 작을수록, 그것은 더 적은 물이 필요하다. (small, little, water)', a: 'The smaller the plant is, the less water it needs.', why: '기출 11' },
      { q: '네가 더 많이 줄수록, 너는 보답으로 더 많이 얻을 것이다. (give, get in return)', a: 'The more you give, the more you will get in return.', why: '교과서' },
      { q: '우리가 더 많은 사람들을 초대할수록, 우리는 더 크게 노래해야 한다. (people, invite, loud)', a: 'The more people we invite, the louder we have to sing.', why: '기출 17' },
      { q: '네가 더 많이 웃을수록, 너는 더 건강해진다. (smile, healthy, become)', a: 'The more you smile, the healthier you become.', why: '기출 23 — 8단어' },
      { q: '네가 실수를 더 적게 할수록, 너의 점수는 더 높아질 것이다. (few, mistakes, high)', a: 'The fewer mistakes you make, the higher your score will be.', why: 'few – fewer + 명사' },
      { q: '그들이 더 열심히 일할수록, 그들은 더 많은 돈을 받았다. (hard, much, get paid)', a: 'The harder they worked, the more they got paid.', why: '기출 11 — 과거' }] },
  ], m),

  // ---------------- Point 3 ----------------
  D.section('Point 3', '(심화) As 전환 · 흔한 오답 · 비교급 강조 — As your apology is more sincere, it will be received better', 'point'),
  ...D.table(['구분', '설명', '예'], [
    ['As 전환', 'As(~함에 따라) + 주어 + 동사 + 비교급 — the를 지우고 평서문 어순으로 되돌린다', 'The more sincere your apology is, the better it will be received. = **As** your apology is more sincere, it will be received better.'],
    ['If 풀어 쓰기', '조건으로 풀어 써도 뜻이 통한다', 'The more you practice, the better you will be. ≈ If you practice more, you will be better.'],
    ['오답 ① 두 번째 절 평서문', '두 번째 절도 the + 비교급이 맨 앞', 'The more you practice, **the better you get**. (you get better ✗)'],
    ['오답 ② 이중 비교', '비교급은 한 번만 — more + -er ✗', 'the better (the more better ✗) / the fresher (the more fresher ✗) (기출 16 ⓔ)'],
    ['오답 ③ the 빠뜨림 · 최상급', 'the는 두 개 필수, 최상급 most · -est ✗', 'The darker it gets, **the** lower the temperature will be. (lower ✗) / the more people (the most ✗) (기출 16)'],
    ['비교급 강조 (본문)', 'even · much · far · a lot + 비교급 = ‘훨씬’ (very ✗)', 'After that, June felt **even more hurt** because of Mike’s casual apology. (본문 · 기출 64)']], [2600, 3200, 3838], m),
  ...D.infoBox('As 전환 3단계', [
    '① the 두 개를 지운다: The more sincere … , the better … → more sincere … , better …',
    '② 비교급을 원래 자리(보어 · 동사 뒤)로 돌려놓는다: your apology is {{more sincere}} / it will be received {{better}}',
    '③ 앞 절에 {{As}}를 붙인다: As your apology is more sincere, it will be received better.'], m),
  ...D.trick('‘더 → 더’ 시소', ['한쪽이 올라가면 다른 쪽도 올라간다', '양쪽 모두 the 손잡이가 있어야 시소를 탄다', '손잡이(the) 하나라도 빠지면 ✗ — As로 바꾸면 손잡이를 둘 다 뗀다']),
  ...D.examPoint([
    { q: 'The more you practice, {{the better}} you get.', why: '두 번째 절도 the + 비교급 + 주어 + 동사 (you get better ✗)' },
    { q: 'As your apology is more sincere, it will be received {{better}}.', why: 'As 전환 — the를 지우고 평서문 어순 (본문 변형)' }], m),
  ...D.caution(['‘~할수록’ 해석만 보고 두 번째 절을 평서문(you get better)으로 둔 문장을 옳다고 고르는 실수가 가장 많다.',
    'As 전환에서 the를 남기거나(As your apology is the more sincere ✗) 두 번째 절에 the를 남긴 것(As we went higher, the colder we felt ✗)을 고르게 한다.',
    '비교급 강조 even · much · far · a lot ○ / very ✗ — 본문 even more hurt가 어휘 · 어법 설명 문항으로 나온다. (기출 64 형모)',
    '같은 과 관계부사 how와 섞은 개수 문항(기출 15 · 16)이 나오므로 PERFECT CHECK에 how 2문항을 넣었다.'], m),
  ...D.drill(3, 'As 전환 · 흔한 오답 · 비교급 강조', [
    { level: 'Basic ①', type: 'choice', instr: '괄호 안에서 알맞은 것을 고르시오.', items: [
      { q: 'The more you practice, (you get better / the better you get).', a: 'the better you get', why: '두 번째 절도 the + 비교급' },
      { q: '(As / The) your apology is more sincere, it will be received better.', a: 'As', why: 'As 전환 — 평서문 어순' },
      { q: 'After that, June felt (very / even) more hurt because of Mike’s casual apology.', a: 'even', why: '비교급 강조 — very ✗ (본문)' },
      { q: 'The more I know him, (deeper / the deeper) our friendship becomes.', a: 'the deeper', why: '두 번째 절의 the (교과서)' },
      { q: 'The cheaper the price becomes, the (more / most) people will buy it.', a: 'more', why: '최상급 ✗ (기출 15 ⓔ)' },
      { q: 'As we went higher, we felt (colder / the colder).', a: 'colder', why: 'As 전환 — the 지우기' },
      { q: 'The more you play computer games, the (more worse / worse) your result will get.', a: 'worse', why: '이중 비교 ✗ (기출 13)' },
      { q: 'This book is (much / very) more interesting than that one.', a: 'much', why: '비교급 강조 — much · even · far · a lot' },
      { q: '(The / As) the weather gets warmer, more people go to the beach.', a: 'As', why: '뒤 절이 평서문 → As (The warmer the weather gets, the more people … 도 ○)' },
      { q: 'The harder you try, (your future will be better / the better your future will be).', a: 'the better your future will be', why: '기출 16 ⓐ' }] },
    { level: 'Basic ②', type: 'fill', instr: '<보기>에서 알맞은 말을 골라 빈칸에 쓰시오. (한 번씩만 사용)',
      bogi: ['polite', 'As', 'fresher', 'even', 'lower', 'more', 'colder', 'want', 'the', 'earlier'], items: [
      { q: '[[As]] your apology is more sincere, it will be received better.', why: '본문 변형 — As 전환' },
      { q: 'The more you practice, [[the]] better you get.', why: '두 번째 절의 the' },
      { q: 'After that, June felt [[even]] more hurt because of Mike’s casual apology.', why: '본문 — 비교급 강조' },
      { q: 'As we went higher, we felt [[colder]].', why: '교과서 Grammar✚ 변형 — As 전환' },
      { q: 'The darker it gets, the [[lower]] the temperature will be.', why: '기출 16 ⓑ 정답형' },
      { q: 'The cheaper the price becomes, the [[more]] people will buy it.', why: '기출 15 ⓔ' },
      { q: 'As you walk faster, you will arrive [[earlier]].', why: '교과서 변형 — As 전환' },
      { q: 'The more fame you get, the more [[polite]] you have to be.', why: '기출 16 ⓒ — more + 원급' },
      { q: 'The farther we are away from the city, the [[fresher]] the air will be.', why: '기출 16 ⓔ 정답형' },
      { q: 'The more I know about him, the more I [[want]] to be good friends with him.', why: '교과서 — 주어 + 동사' }] },
    { level: 'Intermediate', type: 'write', instr: '어법상 틀린 부분을 찾아 바르게 고쳐 쓰시오.', items: [
      { q: 'The more you practice, you get better.', a: 'you get better → the better you get', why: '두 번째 절도 the + 비교급 + 주어 + 동사' },
      { q: 'The more you practice, the more better you will be.', a: 'the more better → the better', why: '이중 비교 ✗' },
      { q: 'As your apology is the more sincere, it will be received better.', a: 'the more sincere → more sincere', why: 'As 전환 — the 지우기' },
      { q: 'June felt very more hurt because of Mike’s casual apology.', a: 'very → even (much · far · a lot)', why: '본문 — 비교급 강조' },
      { q: 'More I know him, the deeper our friendship becomes.', a: 'More → The more', why: '앞 절의 the' },
      { q: 'The cheaper the price becomes, the most people will buy it.', a: 'most → more', why: '기출 15 ⓔ 변형' },
      { q: 'As we went higher, the colder we felt.', a: 'the colder we felt → we felt colder', why: 'As 전환 — 두 번째 절도 평서문' },
      { q: 'The higher you go up the mountain, more you can see of the lake below.', a: 'more → the more', why: '교과서 — 두 번째 절의 the' },
      { q: 'The more sincere your apology is, the better it will receive.', a: 'will receive → will be received', why: '본문 — 사과가 받아들여지는 수동' },
      { q: 'The harder you work, the more brighter your future will be.', a: 'the more brighter → the brighter', why: '이중 비교 ✗ (교과서)' }] },
    { level: 'Advanced · 모두 고르기', type: 'multi', free: true, instr: '해당하는 것을 모두 골라 기호를 쓰시오.', items: [
      { q: '두 문장의 의미가 같은 것을 모두 고르시오.', box: [
        '(a) The more sincere your apology is, the better it will be received. = As your apology is more sincere, it will be received better.',
        '(b) The higher we went, the colder we felt. = As we went higher, we felt colder.',
        '(c) The more you practice, the better you get. = If you practice less, you get better.',
        '(d) The sooner, the better. = It is better to do it as soon as possible.',
        '(e) The older we grow, the wiser we become. = As we grow older, we become less wise.'], a: '(a), (b), (d)', why: '(c) less — 반대 (e) less wise — 반대' },
      { q: '밑줄 친 부분에 대한 설명으로 옳은 것을 모두 고르시오.', box: [
        '(a) June felt __even__ more hurt. → even은 비교급을 강조하며 ‘훨씬’이라는 뜻이다.',
        '(b) The more you practice, __the better you get__. → you get better로 바꿔도 어법상 옳다.',
        '(c) __As__ we went higher, we felt colder. → ‘~함에 따라’라는 뜻의 접속사이다.',
        '(d) The more, the __merrier__. → 앞뒤 절의 주어와 동사가 생략된 관용 표현이다.',
        '(e) The darker it gets, __the__ lower the temperature will be. → 두 번째 the는 생략해도 된다.'], a: '(a), (c), (d)', why: '(b) 두 번째 절도 the + 비교급 (e) the는 두 절 모두 필수' },
      { q: '다음 글의 밑줄 친 ⓐ~ⓔ 중 어법상 어색한 것을 모두 골라 기호를 쓰고 바르게 고치시오.', fix: true, label: '기호 / 고친 것', box: [
        'To Jisu, The group wall-painting project failed because of me. I wasn’t thinking about the whole picture. ⓐ __The more I painted__, ⓑ __the worse the wall looked__. I felt ⓒ __very more sorry__ when I saw your face. ⓓ __As I think about it more__, I feel ⓔ __the guiltier__. I will be more careful next time. Suchan'], a: 'ⓒ very → even (much · far · a lot), ⓔ the guiltier → guiltier', why: 'ⓒ 비교급 강조 ⓔ As 문장에는 the ✗ (교과서 사과 편지 변형)' },
      { q: '다음 중 어법상 틀린 문장을 모두 고르시오.', box: [
        '(a) The more you practice, you get better.', '(b) The more you practice, the better you get.', '(c) As you practice more, you get better.',
        '(d) The more you practice, the more better you get.', '(e) More you practice, the better you get.'], a: '(a), (d), (e)', why: '(a) the better you get (d) the better (e) The more' }] },
    { level: 'Advanced · 객관식', type: 'mcq', free: true, instr: '알맞은 답을 고르시오.', items: [
      { q: '<보기>와 의미가 같은 문장은?', box: ['<보기>  The more sincere your apology is, the better it will be received.'], opts: [
        'As your apology is more sincere, it will be received worse.', 'As the more sincere your apology is, the better it will be received.', 'As your apology is more sincere, it will be received better.',
        'If your apology is less sincere, it will be received better.', 'Your apology was more sincere, so it was received better.'], a: '③', why: 'As 전환 — the 지우고 평서문 어순' },
      { q: '빈칸에 들어갈 수 없는 것은? — June felt ______ more hurt because of Mike’s casual apology.', opts: [
        'even', 'much', 'far', 'a lot', 'very'], a: '⑤', why: '비교급 강조에 very ✗ (본문 · 기출 64)' },
      { q: '다음 중 어법상 알맞은 문장은?', opts: [
        'The more you practice, you get better.', 'More you help others, the happier you will be.', 'The more I painted, the more worse the wall looked.',
        'The harder you study, the higher your test score will be.', 'The earlier you start something, sooner you will finish it.'], a: '④', why: '① the better you get ② The more ③ the worse ⑤ the sooner (교과서 Writing 변형)' },
      { q: '다음 중 어법상 어색한 문장의 개수는?', box: [
        '(a) June didn’t like the way how Mike had acted.', '(b) This is how we win!', '(c) The cheaper the price for the item becomes, the more people will buy it.',
        '(d) The darker it gets, lower the temperature will be.', '(e) The more you smile, the healthier you become.'], opts: ['1개', '2개', '3개', '4개', '5개'], a: '②', why: '(a) the way how ✗ (d) the lower — 2개 (기출 15 · 16 변형, 관계부사 how 함께)' },
      { q: '두 문장이 같은 뜻이 되도록 빈칸 ⓐ, ⓑ에 들어갈 말이 차례대로 연결된 것은? — The faster you walk, the earlier you will arrive. = As you walk ⓐ______, you will arrive ⓑ______.', opts: [
        'faster – earlier', 'the faster – the earlier', 'fast – early', 'more fast – more early', 'fastest – earliest'], a: '①', why: 'As 전환 — the 지우고 비교급은 원래 자리' }] },
    { level: '전환 · 연결', type: 'write', instr: '괄호 안의 지시대로 같은 뜻의 문장으로 바꾸어 쓰시오.', items: [
      { q: 'The more sincere your apology is, the better it will be received. (As)', a: 'As your apology is more sincere, it will be received better.', why: '본문' },
      { q: 'The higher we went, the colder we felt. (As)', a: 'As we went higher, we felt colder.', why: '교과서 Grammar✚' },
      { q: 'The faster you walk, the earlier you will arrive. (As)', a: 'As you walk faster, you will arrive earlier.', why: '교과서' },
      { q: 'As you practice more, you get better. (the + 비교급)', a: 'The more you practice, the better you get.', why: '교과서 Writing' },
      { q: 'As you get older, you will become wiser. (the + 비교급)', a: 'The older you get, the wiser you will become.', why: '교과서' },
      { q: 'As I know him more, our friendship becomes deeper. (the + 비교급)', a: 'The more I know him, the deeper our friendship becomes.', why: '교과서' },
      { q: 'The more vegetables you have, the healthier you will be. (As)', a: 'As you have more vegetables, you will be healthier.', why: '교과서 Grammar✚ — 명사도 원래 자리로' },
      { q: 'As the price becomes cheaper, more people will buy it. (the + 비교급)', a: 'The cheaper the price becomes, the more people will buy it.', why: '기출 15 ⓔ' },
      { q: 'If you study harder, your test score will be higher. (the + 비교급)', a: 'The harder you study, the higher your test score will be.', why: '교과서 Writing' },
      { q: 'The more I painted, the worse the wall looked. (As)', a: 'As I painted more, the wall looked worse.', why: '교과서 — 과거' }] },
  ], m),

  // ---------------- PERFECT CHECK ----------------
  D.section('PERFECT CHECK', '상위권 함정 체크'),
  ...D.drill(null, '', [{ level: '함정', type: 'choice', instr: '실수하기 쉬운 문장들이에요. 괄호 안에서 알맞은 것을 고르시오.', items: [
    { q: 'The more sincere your apology is, the better it will be (received / receiving).', a: 'received', why: '본문 — 수동 will be p.p.' },
    { q: 'The (more sincerely / more sincere) your apology is, the better it will be received.', a: 'more sincere', why: '본문 — be동사의 보어' },
    { q: 'The faster you run, the (early / earlier) you will get there.', a: 'earlier', why: '기출 13' },
    { q: 'The darker it gets, (the lower / lower) the temperature will be.', a: 'the lower', why: '기출 16 — the 필수' },
    { q: 'The older we grow, the (wiser / more wise) we become.', a: 'wiser', why: '기출 17' },
    { q: 'The more money we earn, the (many / more) orphans we can help.', a: 'more', why: '기출 17' },
    { q: 'After that, June felt (very / even) more hurt.', a: 'even', why: '본문 — 비교급 강조' },
    { q: 'The more you practice, (the better you get / you get better).', a: 'the better you get', why: '두 번째 절도 the + 비교급' },
    { q: 'June didn’t like (the way how / how) Mike had acted.', a: 'how', why: '본문 — 관계부사 how (the way how ✗, 같은 과 문법)' },
    { q: 'Kevin shows (how / what) he plants a tree.', a: 'how', why: '교과서 — 관계부사 how (같은 과 문법)' }] }], m),

  // ---------------- WRITE ----------------
  D.section('WRITE', '서술형 대비'),
  ...D.writeItem(1, 'Basic', '괄호 안의 단어를 알맞은 형태로 바꾸어 쓰시오.', ['The more sincere your apology is, the (good) it will be received. (본문)'], { a: 'better', why: 'good – better' }, m),
  ...D.writeItem(2, 'Basic', '괄호 안의 단어를 알맞은 형태로 바꾸어 쓰시오.', ['The faster you walk, the (early) you will arrive. (교과서)'], { a: 'earlier', why: 'early – earlier' }, m),
  ...D.writeItem(3, 'Intermediate', '<보기>의 단어를 배열하여 문장을 완성하시오.', ['너의 사과가 더 진실할수록, 그것은 더 잘 받아들여질 것이다.', '<보기> (is / the / your / apology / sincere / more), (be / better / received / it / will / the)'],
    { a: 'The more sincere your apology is, the better it will be received.', why: '본문 7단계 — 비교급 덩어리 + 주어 + 동사' }, m),
  ...D.writeItem(4, 'Intermediate', '<조건>에 맞게 문장을 완성하시오.', ['네가 더 많이 운동할수록, 너는 더 건강해진다.', '<조건> much, healthy를 사용할 것 · 비교급 구문을 사용할 것', '→ ______ ______ you exercise, ______ ______ you get.'],
    { a: 'The more you exercise, the healthier you get.', why: '기출 22 — much – more, healthy – healthier' }, m),
  ...D.writeItem(5, 'Intermediate', '우리말과 같은 뜻이 되도록 <조건>에 맞게 영작하시오.', ['네가 더 많이 웃을수록, 너는 더 건강해진다.', '<조건> ‘the + 비교급, the + 비교급’ 구문을 사용할 것 · smile, healthy, become을 사용하되 필요시 변형할 것 · 총 8단어'],
    { a: 'The more you smile, the healthier you become.', why: '기출 23 · 8단어 (The/more/you/smile/the/healthier/you/become)' }, m),
  ...D.writeItem(6, 'Intermediate', 'As를 사용하여 같은 뜻의 문장으로 바꾸어 쓰시오. [문장 전환]', ['The higher you go up the mountain, the more you can see of the lake below. (교과서)'],
    { a: 'As you go higher up the mountain, you can see more of the lake below.', why: 'the 지우고 비교급을 원래 자리로' }, m),
  ...D.writeItem(7, 'Advanced', '㉠의 우리말과 같은 뜻이 되도록 본문의 단어를 사용하여 문장을 완성하시오.', ['If you truly want to make things right, be sincere in your apology. ㉠ 너의 사과가 더 진실할수록, 그것은 더 쉽게 받아들여질 것이다.', '→ ______________________________, the more easily it will be accepted.'],
    { a: 'The more sincere your apology is', why: '기출 65 — 보어 형용사의 비교급 + 주어 + 동사' }, m),
  ...D.writeItem(8, 'Advanced', '우리말과 같은 뜻이 되도록 <조건>에 맞게 영작하시오.', ['내가 그를 더 많이 알수록, 우리의 우정은 더 깊어진다.', '<조건> ‘the + 비교급, the + 비교급’ 구문을 사용할 것 · know, deep, friendship, become을 사용하되 필요시 변형할 것 · 총 10단어'],
    { a: 'The more I know him, the deeper our friendship becomes.', why: '교과서 · 10단어 (The/more/I/know/him/the/deeper/our/friendship/becomes)' }, m),
  ...D.writeItem(9, 'Advanced', '어법상 틀린 부분 2개를 찾아 바르게 고치고, 그 이유를 쓰시오.', ['If you truly want to make things right, be sincere in your apology. The more sincerely your apology is, the better it will receive.'],
    { a: '① sincerely → sincere  ② will receive → will be received', why: '① be동사(is)의 보어 자리이므로 형용사 ② 사과(it)가 받아들여지는 수동이므로 be + p.p.', blanks: ['고친 것', '이유'] }, m),
  ...D.writeItem(10, 'Advanced', '어법상 틀린 부분 2개를 찾아 바르게 고치고, 그 이유를 쓰시오.', ['The more you practice, you get better at it. And the earlier you start something, the more sooner you will finish it.'],
    { a: '① you get better → the better you get  ② the more sooner → the sooner', why: '① 두 번째 절도 the + 비교급 + 주어 + 동사 어순 ② sooner가 이미 비교급이므로 more를 겹쳐 쓰지 않는다', blanks: ['고친 것', '이유'] }, m),

  // ---------------- MAP ----------------
  D.section('MAP', "DAVID'S MAP — 백지노트 테스트"),
  D.P([D.T('오늘 배운 내용을 떠올리며 빈칸을 채워 보세요. 책을 보지 않고!', { size: 18, color: '595959' })], { spacing: { after: 120 }, keepNext: true }),
  ...D.image(path.join(__dirname, 'map_G-the비교급.png'), 620),
  ...D.table(['자가 체크 — 백지노트에 이 단어들이 들어갔나요?', '✔'], [
    ['The + 비교급 + 주어 + 동사 ~, the + 비교급 + 주어 + 동사 … = ~할수록 더 …하다', ''], ['비교급 덩어리가 the와 함께 절 맨 앞으로 (어순)', ''],
    ['be동사 보어는 형용사: The more sincere your apology is (sincerely ✗)', ''], ['-er · more + 원급 · good – better · bad – worse · much – more · little – less', ''],
    ['명사는 비교급 바로 뒤: The more vegetables you have', ''], ['생략형: The sooner, the better. / The more, the merrier.', ''],
    ['As 전환: As your apology is more sincere, it will be received better.', ''], ['오답: you get better ✗ · the more better ✗ · the 빠뜨림 ✗ · the most ✗', ''],
    ['비교급 강조 even · much · far · a lot (very ✗): even more hurt', ''],
    ['본문: The more sincere your apology is, the better it will be received.', '']], [8838, 800], m),
  ...D.memo(['다음 시간 도입: 본문 문장(The more sincere your apology is, the better it will be received.)을 평서문 두 개로 칠판에 쓰고, 학생이 직접 비교급을 앞으로 옮겨 합치게 하기',
    '약한 반: Point 1(the 두 개 · 어순 · 형태) 확실히 → Point 2는 The more vegetables you have / The sooner, the better 두 개만 → Point 3은 you get better ✗ 오답 하나만',
    '같은 과 관계부사 how와 섞은 기출(15 · 16번) 다시 풀기 — 개수 문항에서 두 문법을 동시에 판단해야 한다.', '교과서 Writing ‘나만의 명언집’ — The more you ~, the ___ 형태로 자기 문장 3개 쓰고 짝과 서로 어법 점검'], m),
];
D.render(meta, build, process.argv[2] || '.').then(fs_ => {
  const out = fs_.map(f => { const g = path.join(path.dirname(f), path.basename(f).replace(TITLE, 'the비교급')); fs.renameSync(f, g); return g; });
  console.log(out.join('\n'));
});
