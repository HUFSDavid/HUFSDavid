const D0 = require('./david_base');
const path = require('path');
const fs = require('fs');
// 한 문장에 빈칸 ______ 이 두 개 이상이면 david_base의 __밑줄__ 서식으로 잘못 읽히므로
// 밑줄 3개 이상 이어진 빈칸은 밑줄 사이에 U+200B를 넣어 둔다 (with분사 · sothat · 부정대명사 스크립트와 같은 처리).
const ZB = (s) => s.replace(/_{3,}/g, (u) => u.split('').join('​'));
const deep = (v) => typeof v === 'string' ? ZB(v) : Array.isArray(v) ? v.map(deep)
  : (v && typeof v === 'object' && v.constructor === Object) ? Object.fromEntries(Object.entries(v).map(([k, x]) => [k, deep(x)])) : v;
const D = new Proxy(D0, { get: (t, k) => (typeof t[k] === 'function' && !['render', 'P', 'T', 'image'].includes(k)) ? (...a) => t[k](...deep(a)) : t[k] });
const COVER = JSON.parse(process.env.COVER || '{}');
const TITLE = '관계부사 how';
const meta = { series: D.SERIES.G, code: 'G-관계부사how', title: TITLE, category: 'G. 관계사  |  관계부사 how · the way (where · when · why와 비교, 의문사 how와 구별)',
  rightText: 'G  관계부사 how', prefix: process.env.PREFIX || '', cover: COVER.title ? COVER : undefined,
  question: 'June didn’t like ~~how~~ Mike had acted. = June didn’t like ~~the way~~ Mike had acted. — 둘 다 되는데, 왜 the way how는 안 될까?' };

const build = (m) => [
  D.section('FLOW', 'Teaching Flow — 처음 배우는 사람도 따라오는 5단계'),
  ...D.step(1, '우리말로 먼저 생각하기 — ‘~하는 방식(방법)’', [
    '‘June은 Mike가 행동했던 {{방식}}이 마음에 들지 않았다.’ — ‘방식’이라는 명사를 뒤의 문장(Mike가 행동했다)이 꾸민다.',
    '우리말은 ‘~하는 방식’ 한마디면 끝이지만, 영어는 the way(방식) 또는 그 뜻을 품은 {{how}} 하나로 문장을 이어 붙인다.'], m),
  ...D.step(2, '이전 단원 복습 — 관계대명사는 뒤가 빈다', [
    'This includes family members and the people **who** are close to you. (본문) → who 뒤에 주어가 빠짐 = {{불완전}}한 문장',
    'The restaurant **which** we visited was nice. → visited의 목적어가 빠짐 — 관계대명사 뒤는 늘 한 자리가 비어 있다.'], m),
  ...D.step(3, '문제 제기 — 같은 뜻인데 세 가지 모양?', [
    'June didn’t like **how** Mike had acted. (본문) / June didn’t like **the way** Mike had acted. (기출 44)',
    'This is the way **how** the microwave works. (✗ 교과서 Grammar✚) — 둘 다 되는데 둘을 같이 쓰면 왜 틀릴까?'], m),
  ...D.step(4, '규칙 발견 — how 안에 the way가 이미 들어 있다', [
    'how = the way + 관계부사 → the way how는 ‘방식 + 방식’을 두 번 말한 꼴 → {{둘 중 하나만}} 쓴다.',
    'Mike had acted는 빠진 것 없는 완전한 문장 → 관계대명사가 아니라 {{관계부사}} — where · when · why와 같은 가족이다.'], m),
  ...D.step(5, '결론 🔑', [
    'how = the way = the way that = the way {{in which}} / the way how ✗ / 관계부사(where · when · why · how) 뒤는 완전한 문장, 관계대명사(which · that) 뒤는 불완전한 문장 / how + 형용사 · how to · How could ~? 는 의문사 how'], m),
  ...D.infoBox('오늘의 핵심 3문장', [
    '① June didn’t like {{how}} Mike had acted. (본문)',
    '② Sunmin’s sister disliked {{the way}} Sunmin had treated her. (본문 how ↔ the way)',
    '③ This is the way the microwave works. (O) / This is the way how the microwave works. ({{X}}) (교과서 Grammar✚)'], m),
  ...D.tip(['칠판에 [the way] [how] 두 칸짜리 의자를 그리고 “한 자리에는 한 명만 앉는다”고 말한 뒤, 학생에게 둘 중 하나를 지우게 한다. 지운 자리에 that · in which를 넣어 4가지 모양을 한 줄에 쓰게 하면 기출 19번 같은 0~2단어 빈칸 문항이 쉬워진다.',
    '같은 과 문법 ‘the + 비교급, the + 비교급’과 한 시험에 나오므로 PERFECT CHECK에 2문항을 넣었다. Point 2는 기출 12 · 15 · 18번(in where · where … at · the reason which)이 그대로 나오는 구간이라 반드시 시간을 들인다.'], m),

  // ---------------- Point 1 ----------------
  D.section('Point 1', '관계부사 how = the way — 둘 중 하나만, the way that · the way in which', 'point'),
  ...D.table(['형태', '규칙 · 해석', '예'], [
    ['how + 주어 + 동사', '선행사 the way를 품은 관계부사 → ‘~하는 방식(방법)’', 'June didn’t like **how** Mike had acted. (본문)'],
    ['the way + 주어 + 동사', 'how를 빼고 선행사만 남긴 모양 — 뜻은 같다', 'June didn’t like **the way** Mike had acted. (기출 44)'],
    ['the way how ✗', 'how와 the way는 함께 쓰지 않는다 — 반드시 하나는 생략', 'This is the way how the microwave works. ✗ (교과서 Grammar✚)'],
    ['the way that · the way in which', 'that 또는 전치사 + which로 바꿔 쓸 수 있다', 'She told us the way **that[in which]** she had earned so much money. (기출 19)'],
    ['the way which … in', 'which만 쓰면 전치사 in이 문장 끝에 남아야 한다', 'She told us the way **which** she had earned so much money **in**. (기출 19)'],
    ['how절의 자리', '주어 · 목적어 · 보어 자리에 모두 온다 — 주어면 단수 취급', '**How the accident happened** was still unknown. / This is **how** we win! (기출 19 · 20)']], [2300, 3300, 4038], m),
  ...D.infoBox('the way와 how — 한 자리에 한 명만', [
    '① how만: June didn’t like {{how}} Mike had acted.',
    '② the way만: June didn’t like {{the way}} Mike had acted.',
    '③ the way + that / in which: the way {{that}} Mike had acted · the way in which Mike had acted   ④ the way how: ✗'], m),
  ...D.trick('how 안에는 the way가 숨어 있다', ['how = the way + 접착제', '숨은 the way를 또 꺼내면 중복!', 'the way how는 언제나 X']),
  ...D.examPoint([
    { q: 'He asked me the way I fixed my computer. → He asked me {{how}} I fixed my computer.', why: 'the way = how (기출 9)' },
    { q: 'She told us the way {{in which}} she had earned so much money. (= the way that)', why: 'the way + 전치사 + which (기출 19)' }], m),
  ...D.caution(['the way how가 들어간 문장을 옳다고 고르게 하는 선지가 가장 많다. (기출 14 ② This is the way how I solve the problem. / 15 ⓒ June didn’t like the way how Mike had acted. / 18 ⓔ)',
    '본문 how를 the way로 바꾼 문장은 옳다(기출 44 ⓔ) — ‘how를 바꿨으니 틀렸다’로 착각하지 않게 한다.',
    '기출 19는 빈칸 단어 수(0~2개)를 조건으로 the way (which) … (in) / the way (that) … (X)을 쓰게 한다. which만 쓰면 끝에 in, that이나 in which면 끝에 아무것도 없다.',
    'how절이 주어일 때 동사는 단수(was), 그리고 How 뒤 어순은 주어 + 동사 (How happened the accident ✗ 기출 14 ③).'], m),
  ...D.drill(1, 'how = the way, 둘 중 하나만', [
    { level: 'Basic ①', type: 'choice', instr: '괄호 안에서 알맞은 것을 고르시오.', items: [
      { q: 'June didn’t like (how / which) Mike had acted.', a: 'how', why: '뒤가 완전한 문장, ‘~하는 방식’ (본문)' },
      { q: 'Sunmin’s sister disliked (the way how / how) Sunmin had treated her.', a: 'how', why: 'the way how ✗ (본문)' },
      { q: 'This is (the way / the way how) the microwave works.', a: 'the way', why: '둘 중 하나만 (교과서 Grammar✚)' },
      { q: 'That is (how / what) I solved the difficult problem.', a: 'how', why: '뒤가 완전한 문장 — what ✗ (교과서)' },
      { q: 'These directions show (which / how) we can use the machine.', a: 'how', why: '‘~하는 방법’ (교과서)' },
      { q: 'He asked me the way (how / that) I fixed my computer.', a: 'that', why: 'the way that ○ / the way how ✗ (기출 9 변형)' },
      { q: 'She told us the way (in which / which) she had earned so much money.', a: 'in which', why: '문장 끝에 in이 없으므로 in which (기출 19)' },
      { q: 'Jason shows (the way how / how) he makes pizza.', a: 'how', why: 'the way how ✗ (기출 14 ①)' },
      { q: 'Show me (the way how / the way) you solved the problem.', a: 'the way', why: 'the way how ✗ (기출 18 ⓔ)' },
      { q: '(How / What) the accident happened was still unknown.', a: 'How', why: '주어 자리 how절 — 뒤가 완전 (기출 19)' }] },
    { level: 'Basic ②', type: 'fill', instr: '<보기>에서 알맞은 말을 골라 빈칸에 쓰시오. (한 번씩만 사용)',
      bogi: ['which', 'why', 'how', 'who', 'in', 'where', 'what', 'that', 'when', 'way'], items: [
      { q: 'June didn’t like [[how]] Mike had acted.', why: '본문 — 관계부사 how' },
      { q: 'This is the [[way]] the microwave works.', why: '교과서 Grammar✚ — the way만 남긴 모양' },
      { q: 'He asked me the way [[that]] I fixed my computer.', why: 'the way that (how ✗)' },
      { q: 'She told us the way [[in]] which she had earned so much money.', why: '기출 19 — 전치사 + which' },
      { q: 'She told us the way [[which]] she had earned so much money in.', why: '기출 19 — 끝에 in이 있으므로 which' },
      { q: 'Do you remember the day [[when]] we first met?', why: '교과서 Grammar✚ — 시간 선행사' },
      { q: 'I don’t know the reason [[why]] my mom is angry with me.', why: '기출 10 — 이유 선행사' },
      { q: 'This is the hotel [[where]] her favorite singer stayed.', why: '기출 18 변형 — 장소, 뒤가 완전' },
      { q: 'This includes family members and the people [[who]] are close to you.', why: '본문 — 관계대명사(주어 빠짐)' },
      { q: '[[What]] you need to do is to say, “I’m sorry.”', why: '본문 변형 — 선행사 없는 관계대명사(목적어 빠짐)' }] },
    { level: 'Intermediate', type: 'write', instr: '어법상 틀린 부분을 찾아 바르게 고쳐 쓰시오.', items: [
      { q: 'June didn’t like the way how Mike had acted.', a: 'the way how → how (또는 the way)', why: '기출 15 ⓒ' },
      { q: 'This is the way how I solve the problem.', a: 'the way how → how (또는 the way)', why: '기출 14 ②' },
      { q: 'Kevin shows how he plants a tree in.', a: 'in 삭제', why: '기출 12 ① — how 뒤는 완전한 문장, 전치사 불필요' },
      { q: 'She told us the way which she had earned so much money.', a: 'which → that(in which)', why: '기출 19 — which만 쓰면 끝에 in 필요' },
      { q: 'This is the way in how the microwave works.', a: 'in how → in which (또는 how)', why: '전치사 뒤에는 which' },
      { q: 'Sunmin’s sister disliked what Sunmin had treated her.', a: 'what → how (the way)', why: '본문 — 뒤가 완전한 문장' },
      { q: 'She told us the way in that she had earned so much money.', a: 'in that → in which (또는 that)', why: '전치사 뒤에 that ✗' },
      { q: 'That’s which I made friends with Minsu.', a: 'which → how', why: '‘그것이 내가 민수와 친구가 된 방법이다’ — 뒤가 완전' },
      { q: 'Kevin taught me the way how I could improve my health.', a: 'the way how → how (또는 the way)', why: '기출 24 변형' },
      { q: 'How the accident happened were still unknown.', a: 'were → was', why: 'how절 주어는 단수 취급 (기출 19 변형)' }] },
    { level: 'Advanced · 모두 고르기', type: 'multi', free: true, instr: '해당하는 것을 모두 골라 기호를 쓰시오.', items: [
      { q: '다음 중 어법상 옳은 문장을 모두 고르시오.', box: [
        '(a) This is the way how the microwave works.', '(b) June didn’t like how Mike had acted.', '(c) Show me the way how you solved the problem.',
        '(d) She told us the way in which she had earned so much money.', '(e) He asked me the way how I fixed my computer.'], a: '(b), (d)', why: '(a)(c)(e) the way how ✗ (기출 14 · 18 변형)' },
      { q: '빈칸에 들어갈 수 있는 말을 모두 고르시오. — June didn’t like ______ Mike had acted.', box: [
        '(a) how', '(b) what', '(c) the way in which', '(d) the way how', '(e) the way that'], a: '(a), (c), (e)', why: '(b) 뒤가 완전 → what ✗ (d) 함께 ✗' },
      { q: '밑줄 친 부분에 대한 설명으로 옳은 것을 모두 고르시오.', box: [
        '(a) June didn’t like __how__ Mike had acted. → 앞에 선행사 the way가 생략되어 있다.',
        '(b) This is __the way__ the microwave works. → 관계부사 how를 생략하고 the way만 남긴 문장이다.',
        '(c) She told us the way __in which__ she had earned so much money. → in which는 that으로 바꿔 쓸 수 있다.',
        '(d) She told us the way __which__ she had earned so much money in. → 문장 끝의 in을 빼도 어법상 옳다.',
        '(e) Sunmin’s sister disliked __how__ Sunmin had treated her. → how 대신 what을 써도 같은 뜻이다.'], a: '(a), (b), (c)', why: '(d) which만 쓰면 in 필요 (e) 뒤가 완전 → what ✗' },
      { q: '다음 글의 밑줄 친 ⓐ~ⓔ 중 어법상 어색한 것을 모두 골라 기호를 쓰고 바르게 고치시오.', fix: true, label: '기호 / 고친 것', box: [
        'June didn’t like ⓐ __the way how Mike had acted__. Later, Mike asked his teacher ⓑ __how he could say sorry__ to June. The teacher showed him ⓒ __the way in which he could write a note__. Mike wrote it in ⓓ __the way that his teacher had told him__. June liked ⓔ __the way which he apologized__ this time.'],
        a: 'ⓐ the way how → how(the way), ⓔ which → in which(that, 또는 which 삭제)', why: 'ⓐ 둘 중 하나만 ⓔ which만 쓰면 끝에 in 필요' },
      { q: '밑줄 친 부분을 how로 바꿔 쓸 수 있는 것을 모두 고르시오.', box: [
        '(a) I don’t know __the reason__ my mom is angry with me.', '(b) This is __the way__ we win!', '(c) Let me show you __the way__ to the nurse’s room.',
        '(d) I like __the way that__ she smiles.', '(e) He told me __the way in which__ he made the cake.'], a: '(b), (d), (e)', why: '(a) 이유 → why (c) ‘길’이라는 명사 — 관계부사 ✗ (대화)' }] },
    { level: 'Advanced · 객관식', type: 'mcq', free: true, instr: '알맞은 답을 고르시오.', items: [
      { q: '다음 두 문장의 의미가 같도록 빈칸에 들어갈 말로 알맞은 것은? — He asked me the way I fixed my computer. → He asked me ______ I fixed my computer.', opts: [
        'why', 'what', 'when', 'how', 'where'], a: '④', why: 'the way = how (기출 9)' },
      { q: '빈칸에 들어갈 말로 알맞지 않은 것은? — That is ______ I solved the difficult problem.', opts: [
        'how', 'the way how', 'the way', 'the way that', 'the way in which'], a: '②', why: 'the way how ✗ (교과서 변형)' },
      { q: '다음 중 어법상 어색한 문장은?', opts: [
        'June didn’t like how Mike had acted.', 'This is how we win!', 'Jason shows how he makes pizza.',
        'She told us the way in which she had earned so much money.', 'Sunmin’s sister disliked the way how Sunmin had treated her.'], a: '⑤', why: '⑤ the way how ✗ (본문 변형)' },
      { q: '다음 중 어법상 어색한 문장의 개수는?', box: [
        '(a) June didn’t like the way how Mike had acted.', '(b) This is the way the microwave works.', '(c) She told us the way which she had earned so much money in.',
        '(d) These directions show how we can use the machine.', '(e) He asked me the way in which I fixed my computer.'], opts: ['1개', '2개', '3개', '4개', '5개'], a: '①', why: '(a)만 틀림 — the way how ✗ / (c) 끝에 in이 있어 ○' },
      { q: '다음 우리말을 바르게 영작한 것은? — 이것이 우리가 이기는 방법이야!', opts: [
        'This is the way how we win!', 'This is what we win!', 'This is how we win!', 'This is the way which we win!', 'This is how do we win!'], a: '③', why: '기출 20 — how 또는 the way 하나만' }] },
    { level: '전환 · 연결', type: 'write', instr: '두 문장을 관계부사 how를 사용하여 한 문장으로 연결하시오.', items: [
      { q: 'June didn’t like the way. Mike had acted in the way.', a: 'June didn’t like how Mike had acted.', why: '본문' },
      { q: 'Sunmin’s sister disliked the way. Sunmin had treated her in the way.', a: 'Sunmin’s sister disliked how Sunmin had treated her.', why: '본문' },
      { q: 'This is the way. The microwave works in the way.', a: 'This is how the microwave works.', why: '교과서 Grammar✚' },
      { q: 'That is the way. I solved the difficult problem in the way.', a: 'That is how I solved the difficult problem.', why: '교과서' },
      { q: 'These directions show the way. We can use the machine in the way.', a: 'These directions show how we can use the machine.', why: '교과서' },
      { q: 'Amy shows the way. She fixes a robot in the way.', a: 'Amy shows how she fixes a robot.', why: '교과서 Write It' },
      { q: 'The way was still unknown. The accident happened in the way.', a: 'How the accident happened was still unknown.', why: '기출 19 (H) — 주어 자리' },
      { q: 'He asked me the way. I fixed my computer in the way.', a: 'He asked me how I fixed my computer.', why: '기출 9' },
      { q: 'Kevin taught me the way. I could improve my health with exercise in the way.', a: 'Kevin taught me how I could improve my health with exercise.', why: '기출 24' },
      { q: 'I like the way. My grandma talks to me in the way.', a: 'I like how my grandma talks to me.', why: 'the way + in the way → how' }] },
  ], m),

  // ---------------- Point 2 ----------------
  D.section('Point 2', '관계부사 4형제 where · when · why · how — 전치사 + which 전환, 관계대명사와 구별', 'point'),
  ...D.table(['뜻', '선행사', '관계부사', '전치사 + which', '예'], [
    ['시간', 'the time · the day · the month', 'when', 'at[on, in] which', 'Do you remember the day **when[on which]** we first met? (교과서 Grammar✚)'],
    ['장소', 'the place · the house · the city', 'where', 'in[on, at] which', 'Seoul is the city **where[in which]** the festival is held. (기출 12)'],
    ['이유', 'the reason', 'why', 'for which', 'I don’t know the reason **why** he is upset. (기출 18)'],
    ['방법', 'the way', 'how (함께 ✗)', 'in which', 'June didn’t like **how** Mike had acted. (본문)']], [900, 2050, 1350, 1700, 3638], m),
  ...D.table(['구분', '뒤 문장', '예'], [
    ['관계대명사 which · that', '주어나 목적어가 빠진 불완전한 문장', 'The restaurant **which** we visited was nice. (visited 뒤 목적어 빠짐)'],
    ['관계부사 where · when · why · how', '빠진 것 없는 완전한 문장', 'The restaurant **where** we had lunch was nice. (had lunch 완전)'],
    ['전치사 + which = 관계부사', '전치사가 앞으로 가면 뒤는 완전해진다', 'the hotel **at which** she stayed = the hotel **where** she stayed = the hotel **which** she stayed **at**'],
    ['생략', 'the time · the reason처럼 흔한 선행사나 관계부사는 생략 가능 — 단 the way · how는 반드시 하나만', 'This was not the first time Sunmin hadn’t apologized to her little sister. (본문 — when 생략)']], [2600, 2700, 4338], m),
  ...D.infoBox('관계사 고르기 2단계', [
    '① 선행사 보기: 시간 → when / 장소 → where / 이유 → why / 방법 → {{how}}(the way와 함께 ✗)',
    '② 뒤 문장 보기: 빠진 것이 있으면 {{which · that}}, 빠진 것이 없으면 관계부사',
    '③ 전치사가 붙어 있으면 무조건 which: in which ○ / in {{where}} ✗ / in that ✗'], m),
  ...D.trick('선행사보다 뒤 문장이 먼저다', ['장소라고 다 where 아니다', 'visited 뒤가 비면 which', '빈자리 있으면 대명사, 꽉 차면 부사']),
  ...D.examPoint([
    { q: 'This is the hotel {{where}} her favorite singer stayed. (= the hotel which her favorite singer stayed at)', why: '뒤가 완전 → where / at이 남으면 which (기출 18 ⓑ)' },
    { q: 'April is the month {{when}} my sister was born.', why: '시간 선행사 → when, where ✗ (기출 15 ⓑ)' }], m),
  ...D.caution(['전치사 뒤에 where를 쓴 선지가 단골이다 — in where ✗ → in which · where (기출 12 ③ the city in where / 15 ⓐ the house in where).',
    'where를 쓰고 문장 끝에 전치사를 남긴 선지 — The restaurant where we visited at ✗ (기출 12 ②), the hotel where … stayed at ✗ (기출 18 ⓑ).',
    'the reason which ✗ / the reason what ✗ → why 또는 for which (기출 15 ⓓ · 12 ④).',
    '선행사가 장소여도 뒤가 불완전하면 which: The restaurant where we visited ✗ — visit는 타동사라 목적어가 빠졌다.'], m),
  ...D.drill(2, '관계부사 4형제 · 관계대명사와 구별', [
    { level: 'Basic ①', type: 'choice', instr: '괄호 안에서 알맞은 것을 고르시오.', items: [
      { q: 'I’ll never forget the day (when / where) we met.', a: 'when', why: '시간 선행사 (기출 10)' },
      { q: 'I don’t know the reason (how / why) my mom is angry with me.', a: 'why', why: '이유 선행사 (기출 10)' },
      { q: 'Do you know the office (in where / in which) Mr. Kim works?', a: 'in which', why: '전치사 뒤에는 which (기출 18 ⓒ)' },
      { q: 'This is the hotel (where / which) her favorite singer stayed.', a: 'where', why: '뒤가 완전 (기출 18 ⓑ 변형)' },
      { q: 'April is the month (when / where) my sister was born.', a: 'when', why: '시간 선행사 (기출 15 ⓑ)' },
      { q: 'Summer is the season (when / which) most people go to the ocean.', a: 'when', why: '뒤가 완전 + 시간 (기출 18 ⓐ)' },
      { q: 'This is the hotel (where / which) her favorite singer stayed at.', a: 'which', why: '끝에 at이 남아 불완전 (기출 18 ⓑ)' },
      { q: 'We need to know the reason (which / why) Mr. Kim was really angry.', a: 'why', why: '뒤가 완전 + 이유 (기출 15 ⓓ)' },
      { q: 'The bed (in which / which) I slept last Saturday was comfortable.', a: 'in which', why: 'slept는 자동사 — 뒤가 완전 (기출 12 ⑤)' },
      { q: 'The restaurant (where / which) we visited was nice.', a: 'which', why: 'visited의 목적어가 빠짐 (기출 12 ② 변형)' }] },
    { level: 'Basic ②', type: 'fill', instr: '<보기>에서 알맞은 말을 골라 빈칸에 쓰시오. (한 번씩만 사용)',
      bogi: ['for', 'how', 'whose', 'where', 'on', 'which', 'when', 'in', 'who', 'why'], items: [
      { q: 'Do you remember the day [[when]] we first met?', why: '교과서 Grammar✚ — 시간' },
      { q: 'Do you remember the day [[on]] which we first met?', why: '교과서 Grammar✚ — on which = when' },
      { q: 'I don’t know the reason [[why]] he is upset.', why: '기출 18 ⓓ — 이유' },
      { q: 'I don’t know the reason [[for]] which he is upset.', why: 'for which = why' },
      { q: 'Seoul is the city [[where]] the festival is held.', why: '기출 12 ③ 변형 — 장소' },
      { q: 'Seoul is the city [[in]] which the festival is held.', why: 'in which = where' },
      { q: 'June didn’t like [[how]] Mike had acted.', why: '본문 — 방법' },
      { q: 'This includes family members and the people [[who]] are close to you.', why: '본문 — 관계대명사(주어 빠짐)' },
      { q: 'The restaurant [[which]] we visited was nice.', why: '관계대명사(목적어 빠짐)' },
      { q: 'I have a friend [[whose]] sister is a famous singer.', why: '소유격 관계대명사' }] },
    { level: 'Intermediate', type: 'write', instr: '어법상 틀린 부분을 찾아 바르게 고쳐 쓰시오.', items: [
      { q: 'He knows the house in where she lives.', a: 'in where → in which (또는 where)', why: '기출 15 ⓐ' },
      { q: 'April is the month where my sister was born.', a: 'where → when', why: '기출 15 ⓑ — 시간' },
      { q: 'We need to know the reason which Mr. Kim was really angry.', a: 'which → why (for which)', why: '기출 15 ⓓ — 뒤가 완전' },
      { q: 'This is the hotel where her favorite singer stayed at.', a: 'at 삭제 (또는 where → which)', why: '기출 18 ⓑ' },
      { q: 'The restaurant where we visited was nice.', a: 'where → which (that)', why: '기출 12 ② 변형 — 목적어 빠짐' },
      { q: 'Please tell me the reason what you quit smoking.', a: 'what → why', why: '기출 12 ④' },
      { q: 'Do you remember the day which we first met?', a: 'which → when (on which)', why: '교과서 Grammar✚ — 뒤가 완전' },
      { q: 'I visited the town when my father was born.', a: 'when → where (in which)', why: '장소 선행사' },
      { q: 'This is the park which I often walk my dog.', a: 'which → where (in which)', why: '뒤가 완전 (walk my dog)' },
      { q: 'The bed which I slept last Saturday was comfortable.', a: 'which → in which (where)', why: '기출 12 ⑤ 변형 — slept는 자동사' }] },
    { level: 'Advanced · 모두 고르기', type: 'multi', free: true, instr: '해당하는 것을 모두 골라 기호를 쓰시오.', items: [
      { q: '다음 중 어법상 알맞은 문장을 모두 고르시오.', box: [
        '(a) This is the hotel where her favorite singer stayed at.', '(b) Summer is the season when most people go to the ocean.', '(c) Do you know the office in which Mr. Kim works?',
        '(d) Show me the way how you solved the problem.', '(e) I don’t know the reason why he is upset.'], a: '(b), (c), (e)', why: '(a) at 삭제 또는 which (d) the way how ✗ (기출 18)' },
      { q: '빈칸에 where가 들어갈 수 있는 것을 모두 고르시오.', box: [
        '(a) This is the town ______ I grew up.', '(b) This is the park ______ we played soccer.', '(c) The library ______ I study is very quiet.',
        '(d) The library ______ I visited yesterday was quiet.', '(e) 2002 was the year ______ the World Cup was held in Korea.'], a: '(a), (b), (c)', why: '(d) 목적어 빠짐 → which (e) 시간 → when' },
      { q: '밑줄 친 부분을 ‘전치사 + which’로 바르게 바꾼 것을 모두 고르시오.', box: [
        '(a) the day __when__ we first met → the day on which we first met', '(b) the reason __why__ he is upset → the reason in which he is upset',
        '(c) the house __where__ she lives → the house in which she lives', '(d) the way Mike had acted → the way __in which__ Mike had acted',
        '(e) the city __where__ the festival is held → the city for which the festival is held'], a: '(a), (c), (d)', why: '(b) for which (e) in which' },
      { q: '다음 글의 밑줄 친 ⓐ~ⓔ 중 어법상 어색한 것을 모두 골라 기호를 쓰고 바르게 고치시오.', fix: true, label: '기호 / 고친 것', box: [
        'Last weekend, I visited the city ⓐ __where my grandma lives__. I’ll never forget the day ⓑ __where I arrived there__. She showed me the park ⓒ __in which she used to play__. She also told me the reason ⓓ __which she moved there__. I loved ⓔ __how she talked about her town__.'],
        a: 'ⓑ where → when(on which), ⓓ which → why(for which)', why: 'ⓑ 시간 선행사 ⓓ 이유 선행사 + 완전한 문장' },
      { q: '빈칸에 관계대명사 which(또는 that)가 들어가야 하는 것을 모두 고르시오.', box: [
        '(a) This is the book ______ I borrowed from my sister.', '(b) This is the house ______ my sister lives.', '(c) The hotel ______ she stayed at was nice.',
        '(d) I don’t know the reason ______ he left early.', '(e) The restaurant ______ we visited was nice.'], a: '(a), (c), (e)', why: '(b) where (d) why — 뒤가 완전' }] },
    { level: 'Advanced · 객관식', type: 'mcq', free: true, instr: '알맞은 답을 고르시오.', items: [
      { q: '빈칸 (A), (B), (C)에 들어갈 말로 알맞게 연결된 것은? — • I don’t know the reason (A)______ my mom is angry with me. • I’ll never forget the day (B)______ we met. • Can you tell me (C)______ you solved the problem?', opts: [
        'how – when – why', 'why – how – when', 'what – when – why', 'how – why – when', 'why – when – how'], a: '⑤', why: '이유 why · 시간 when · 방법 how (기출 10)' },
      { q: '다음 중 어법상 알맞은 것은?', opts: [
        'Kevin shows how he plants a tree in.', 'The restaurant where we visited at was nice.', 'The bed in which I slept last Saturday was comfortable.',
        'Seoul is the city in where the festival is held.', 'Please tell me the reason what you quit smoking.'], a: '③', why: '① in 삭제 ② which, at 유지 ④ in which ⑤ why (기출 12)' },
      { q: '빈칸에 들어갈 말이 나머지 넷과 다른 것은?', opts: [
        'I remember the day ______ we first met.', 'This is the town ______ I was born.', 'The park ______ we played was crowded.',
        'Do you know a store ______ I can buy a cake?', 'Seoul is the city ______ the festival is held.'], a: '①', why: '① when / 나머지 where' },
      { q: '다음 중 어법상 어색한 문장의 개수는?', box: [
        '(a) He knows the house in where she lives.', '(b) April is the month where my sister was born.', '(c) June didn’t like the way how Mike had acted.',
        '(d) We need to know the reason which Mr. Kim was really angry.', '(e) This is how the microwave works.'], opts: ['1개', '2개', '3개', '4개', '5개'], a: '④', why: '(a)(b)(c)(d) 틀림 / (e)만 ○ (기출 15 변형)' },
      { q: '두 문장의 의미가 같도록 빈칸에 들어갈 말로 알맞은 것은? — I’ll never forget the day when we met. = I’ll never forget the day ______ we met.', opts: [
        'in which', 'on which', 'for which', 'at where', 'which'], a: '②', why: 'the day → on which' }] },
  ], m),

  // ---------------- Point 3 ----------------
  D.section('Point 3', '(심화) 관계부사 how vs 의문사 how — how + 형용사 · how to · 간접의문문 어순 · the way(길)', 'point'),
  ...D.table(['구분', '판단 기준', '예'], [
    ['관계부사 how', 'the way로 바꿔도 뜻이 같다 · ‘~하는 방식(방법)’', 'June didn’t like **how** Mike had acted. = the way Mike had acted (본문)'],
    ['간접의문문 how + 주어 + 동사', 'know · wonder · ask · tell 뒤 ‘어떻게 ~하는지’ — 어순은 how + 주어 + 동사', 'I wonder **how she could make** the baby sleep. (기출 14 ④) / how did his uncle fix ✗ (기출 14 ⑤)'],
    ['how + 형용사 · 부사', '‘얼마나 ~’ — 의문사, the way로 바꿀 수 없다', '**How long** have you known him? (교과서) / I don’t know **how old** she is.'],
    ['how + to부정사', '‘~하는 방법’ — 의문사 + to부정사 (= how + 주어 + should + 동사)', 'Do you mind telling me **how to say** sorry to her? / I can show you **how to solve** it. (대화)'],
    ['직접의문문', 'How + 조동사 + 주어 ~? — 의문문 어순', '**How could** her own sister ignore her feelings? (본문)'],
    ['the way = 길', '‘~로 가는 길’이라는 명사 — 관계부사가 아니다', 'Let me show you **the way** to the nurse’s room. (대화)']], [2500, 3200, 3938], m),
  ...D.infoBox('how를 만나면 3초 체크', [
    '① 바로 뒤에 형용사 · 부사? → 의문사 ({{how long}} · how old · how much)',
    '② 바로 뒤에 to부정사? → 의문사 + to부정사 (how {{to say}} sorry)',
    '③ 뒤에 주어 + 동사? → 문장 속이면 어순은 언제나 how + {{주어 + 동사}}, the way로 바뀌면 관계부사'], m),
  ...D.trick('문장 속 how는 줄을 선다', ['How could she …? 는 물음표 문장', '문장 안에 들어오면 how + 주어 + 동사', 'the way로 바뀌면 관계부사']),
  ...D.examPoint([
    { q: '{{How the accident happened}} was still unknown. (How happened the accident ✗)', why: '주어 자리 how절 — how + 주어 + 동사 (기출 14 ③ · 19)' },
    { q: 'Let me show you {{the way}} to the nurse’s room. (how ✗)', why: '‘길’ — 명사 the way (대화)' }], m),
  ...D.caution(['간접의문문 어순 오류(how did his uncle fix ✗, How happened the accident ✗)와 the way how(✗)를 한 문항에 섞어 ‘모두 고르기’로 낸다. (기출 14 정답 ① · ④)',
    '‘밑줄 친 how의 쓰임이 다른 것’ 문항은 How long ~? · How about ~? · How could ~? 같은 의문사 how를 고르게 한다 — the way로 바꿔 보면 바로 걸러진다.',
    'how to + 동사원형에서 to를 빼거나(how say ✗), 주어를 넣고 to를 남기는(how I to say ✗) 오답이 나온다.',
    'know · wonder · ask + how + 주어 + 동사는 ‘어떻게 ~하는지’로 해석이 같아 관계부사 how와 모양이 같다. 내신에서는 이 둘을 가르는 문항보다 어순을 묻는 문항이 나온다.'], m),
  ...D.drill(3, '관계부사 how vs 의문사 how', [
    { level: 'Basic ①', type: 'choice', instr: '괄호 안에서 알맞은 것을 고르시오.', items: [
      { q: 'Do you mind telling me (how to / how) say sorry to her?', a: 'how to', why: '의문사 + to부정사 (대화)' },
      { q: 'I wonder how (could she / she could) make the baby sleep.', a: 'she could', why: '간접의문문 어순 (기출 14 ④)' },
      { q: '(How happened the accident / How the accident happened) was still unknown.', a: 'How the accident happened', why: '주어 자리 how절 (기출 14 ③)' },
      { q: 'He doesn’t know how (his uncle fixed / did his uncle fix) his laptop.', a: 'his uncle fixed', why: '간접의문문 어순 (기출 14 ⑤)' },
      { q: '(How / The way) long have you known him?', a: 'How', why: 'how + 부사 — 의문사 (교과서)' },
      { q: 'Let me show you (how / the way) to the nurse’s room.', a: 'the way', why: '‘길’ — 명사 (대화)' },
      { q: 'I can show you how (solve / to solve) it.', a: 'to solve', why: 'how + to부정사 (대화)' },
      { q: '(What / How) could her own sister ignore her feelings?', a: 'How', why: '‘어떻게’ — 직접의문문 (본문)' },
      { q: 'Do you know how (we write / do we write) a note of apology?', a: 'we write', why: '문장 속 how + 주어 + 동사 (대화)' },
      { q: 'Jason shows (how he makes / how does he make) pizza.', a: 'how he makes', why: '관계부사 how + 주어 + 동사 (기출 14 ①)' }] },
    { level: 'Basic ②', type: 'fill', instr: '<보기>에서 알맞은 말을 골라 빈칸에 쓰시오. (한 번씩만 사용)',
      bogi: ['much', 'could', 'wonder', 'way', 'old', 'to', 'about', 'how', 'long', 'often'], items: [
      { q: 'Do you mind telling me how [[to]] say sorry to her?', why: '대화 — how + to부정사' },
      { q: 'How [[long]] have you known him? — I have known him for ten years.', why: '교과서 — 기간' },
      { q: 'Let me show you the [[way]] to the nurse’s room.', why: '대화 — 길' },
      { q: 'These directions show [[how]] we can use the machine.', why: '교과서 — 관계부사 how' },
      { q: 'How [[could]] her own sister ignore her feelings?', why: '본문 — 직접의문문' },
      { q: 'How [[about]] a case for her smartphone?', why: '대화 — 제안' },
      { q: 'I don’t know how [[much]] sugar we need for the cake.', why: '양 — how much' },
      { q: 'How [[often]] do you exercise? — Three times a week.', why: '빈도 — how often' },
      { q: 'I don’t know how [[old]] the tree is. — Maybe 100 years old.', why: '나이 — how old' },
      { q: 'I [[wonder]] how she could make the baby sleep.', why: '기출 14 ④ — 간접의문문' }] },
    { level: 'Intermediate', type: 'write', instr: '어법상 틀린 부분을 찾아 바르게 고쳐 쓰시오.', items: [
      { q: 'How happened the accident was still unknown.', a: 'How happened the accident → How the accident happened', why: '기출 14 ③' },
      { q: 'He doesn’t know how did his uncle fix his laptop.', a: 'how did his uncle fix → how his uncle fixed', why: '기출 14 ⑤' },
      { q: 'Do you mind telling me how say sorry to her?', a: 'how say → how to say', why: '대화 — how + to부정사' },
      { q: 'Let me show you how to the nurse’s room.', a: 'how → the way', why: '대화 — 길' },
      { q: 'I wonder how could she make the baby sleep.', a: 'how could she make → how she could make', why: '기출 14 ④ 변형' },
      { q: 'The way long have you known him?', a: 'The way → How', why: 'how + 부사 — 의문사' },
      { q: 'Can you tell me how do I get to the station?', a: 'how do I get → how I get (how to get)', why: '간접의문문 어순' },
      { q: 'These directions show how can we use the machine.', a: 'how can we use → how we can use', why: '교과서 변형' },
      { q: 'I don’t know how old is she.', a: 'how old is she → how old she is', why: 'how + 형용사 + 주어 + 동사' },
      { q: 'He asked me how did I fix my computer.', a: 'how did I fix → how I fixed', why: '기출 9 변형' }] },
    { level: 'Advanced · 모두 고르기', type: 'multi', free: true, instr: '해당하는 것을 모두 골라 기호를 쓰시오.', items: [
      { q: '다음 중 어법상 알맞은 것을 모두 고르시오.', box: [
        '(a) Jason shows how he makes pizza.', '(b) This is the way how I solve the problem.', '(c) How happened the accident was still unknown.',
        '(d) I wonder how she could make the baby sleep.', '(e) He doesn’t know how did his uncle fix his laptop.'], a: '(a), (d)', why: '(b) the way how ✗ (c) How the accident happened (e) how his uncle fixed (기출 14)' },
      { q: '밑줄 친 how를 the way로 바꿔 쓸 수 있는 것을 모두 고르시오.', box: [
        '(a) __How__ long have you known him?', '(b) That is __how__ I solved the difficult problem.', '(c) Do you mind telling me __how__ to say sorry to her?',
        '(d) Sunmin’s sister disliked __how__ Sunmin had treated her.', '(e) __How__ could her own sister ignore her feelings?'], a: '(b), (d)', why: '(a) how + 부사 (c) how to (e) 직접의문문 — 의문사' },
      { q: '밑줄 친 부분에 대한 설명으로 옳은 것을 모두 고르시오.', box: [
        '(a) Let me show you __the way__ to the nurse’s room. → ‘길’이라는 뜻의 명사이므로 how로 바꿀 수 없다.',
        '(b) __How could__ her own sister ignore her feelings? → 직접의문문이라 How 뒤에 조동사 + 주어 어순이다.',
        '(c) I don’t know __how old__ she is. → how old 대신 the way old를 쓸 수 있다.',
        '(d) He doesn’t know __how his uncle fixed__ his laptop. → how did his uncle fix로 고쳐야 한다.',
        '(e) I can show you __how to solve__ it. → how I should solve it으로 바꿔 쓸 수 있다.'], a: '(a), (b), (e)', why: '(c) how + 형용사는 의문사 (d) 간접의문문은 how + 주어 + 동사 — 그대로 ○' },
      { q: '다음 대화의 밑줄 친 ⓐ~ⓔ 중 어법상 어색한 것을 모두 골라 기호를 쓰고 바르게 고치시오.', fix: true, label: '기호 / 고친 것', box: [
        'A: Do you mind telling me ⓐ __how should I write__ a note of apology?',
        'B: Not at all. First, think about ⓑ __how your friend felt__. Then, write about ⓒ __the way how you will make things right__.',
        'A: I really appreciate your advice. By the way, do you know ⓓ __how long it takes__ to get to the post office?',
        'B: Sure. Let me show you ⓔ __the way to the post office__.'], a: 'ⓐ how should I write → how I should write(how to write), ⓒ the way how → how(the way)', why: 'ⓐ 간접의문문 어순 ⓒ 둘 중 하나만' },
      { q: '밑줄 친 how가 의문사인 것을 모두 고르시오.', box: [
        '(a) __How__ about a case for her smartphone?', '(b) That is __how__ I solved the difficult problem.', '(c) __How__ long have you known him?',
        '(d) Amy shows __how__ she fixes a robot.', '(e) Do you mind telling me __how__ to say sorry to her?'], a: '(a), (c), (e)', why: '(b)(d) the way로 바꿀 수 있는 관계부사' }] },
    { level: 'Advanced · 객관식', type: 'mcq', free: true, instr: '알맞은 답을 고르시오.', items: [
      { q: '다음 중 밑줄 친 how의 쓰임이 나머지 넷과 다른 것은?', opts: [
        '__How__ long have you known him?', 'June didn’t like __how__ Mike had acted.', 'That is __how__ I solved the difficult problem.',
        'These directions show __how__ we can use the machine.', 'This is __how__ the microwave works.'], a: '①', why: '① 의문사(how + 부사) / 나머지 관계부사' },
      { q: '다음 중 어법상 알맞은 것은?', opts: [
        'How happened the accident was still unknown.', 'He doesn’t know how did his uncle fix his laptop.', 'Let me show you how to the nurse’s room.',
        'I wonder how she could make the baby sleep.', 'This is the way how I solve the problem.'], a: '④', why: '④ 간접의문문 어순 ○ (기출 14)' },
      { q: '다음 우리말을 바르게 영작한 것은? — 이 수학 문제를 어떻게 푸는지 가르쳐 줄 수 있니?', opts: [
        'Do you mind teaching me how solve this math problem?', 'Do you mind teaching me how to solve this math problem?', 'Do you mind teaching me the way how to solve this math problem?',
        'Do you mind teaching me how do I solve this math problem?', 'Do you mind teaching me what to solve this math problem?'], a: '②', why: 'how + to부정사 (대화)' },
      { q: '빈칸에 how가 들어갈 수 없는 것은?', opts: [
        'Can you tell me ______ to get to the station?', '______ long have you lived here?', 'This is ______ we win!',
        'I wonder ______ she could make the baby sleep.', 'This is the way ______ the microwave works.'], a: '⑤', why: '⑤ the way how ✗' },
      { q: '다음 중 어법상 알맞은 문장의 개수는?', box: [
        '(a) How the accident happened was still unknown.', '(b) I don’t know how old is she.', '(c) These directions show how we can use the machine.',
        '(d) Can you tell me how to say sorry to her?', '(e) He asked me how did I fix my computer.'], opts: ['1개', '2개', '3개', '4개', '5개'], a: '③', why: '(a)(c)(d) ○ / (b) how old she is (e) how I fixed' }] },
    { level: '전환 · 연결', type: 'write', instr: '괄호 안의 지시대로 같은 뜻의 문장으로 바꾸어 쓰시오.', items: [
      { q: 'Do you mind telling me? + How should I say sorry to her? (한 문장으로)', a: 'Do you mind telling me how I should say sorry to her?', why: 'how to say도 ○ (대화)' },
      { q: 'He doesn’t know. + How did his uncle fix his laptop? (한 문장으로)', a: 'He doesn’t know how his uncle fixed his laptop.', why: '기출 14 ⑤ — did 빼고 과거형' },
      { q: 'I wonder. + How could she make the baby sleep? (한 문장으로)', a: 'I wonder how she could make the baby sleep.', why: '기출 14 ④' },
      { q: 'How did the accident happen? + It was still unknown. (How로 시작)', a: 'How the accident happened was still unknown.', why: '기출 14 ③ · 19 — 주어 자리' },
      { q: 'Tell me. + How long have you known him? (한 문장으로)', a: 'Tell me how long you have known him.', why: 'how long + 주어 + 동사' },
      { q: 'Do you know? + How do we write a note of apology? (한 문장으로)', a: 'Do you know how we write a note of apology?', why: '대화 — do 빼기' },
      { q: 'Do you mind teaching me how I should solve this problem? (how to부정사)', a: 'Do you mind teaching me how to solve this problem?', why: '대화' },
      { q: 'I can show you how you should solve it. (how to부정사)', a: 'I can show you how to solve it.', why: '대화' },
      { q: 'June didn’t like how Mike had acted. (the way)', a: 'June didn’t like the way Mike had acted.', why: '본문 — 관계부사 how' },
      { q: 'This is the way we win! (how)', a: 'This is how we win!', why: '기출 20' }] },
  ], m),

  // ---------------- PERFECT CHECK ----------------
  D.section('PERFECT CHECK', '상위권 함정 체크'),
  ...D.drill(null, '', [{ level: '함정', type: 'choice', instr: '실수하기 쉬운 문장들이에요. 괄호 안에서 알맞은 것을 고르시오.', items: [
    { q: 'June didn’t like (the way how / how) Mike had acted.', a: 'how', why: '본문 — the way how ✗' },
    { q: 'This is the hotel (where / which) her favorite singer stayed at.', a: 'which', why: '기출 18 — 끝에 at' },
    { q: 'She told us the way (in which / which) she had earned so much money.', a: 'in which', why: '기출 19 — 끝에 in 없음' },
    { q: '(How the accident happened / How happened the accident) was still unknown.', a: 'How the accident happened', why: '기출 14 ③' },
    { q: 'The restaurant (where / which) we visited was nice.', a: 'which', why: '기출 12 — 목적어 빠짐' },
    { q: 'April is the month (when / where) my sister was born.', a: 'when', why: '기출 15 — 시간' },
    { q: 'Let me show you (the way / how) to the nurse’s room.', a: 'the way', why: '대화 — 길' },
    { q: 'The more sincere your apology is, (the better / the best) it will be received.', a: 'the better', why: '본문 — the + 비교급 (같은 과 문법)' },
    { q: 'He knows the house (in where / in which) she lives.', a: 'in which', why: '기출 15 ⓐ' },
    { q: 'The faster you walk, (earlier / the earlier) you will arrive.', a: 'the earlier', why: '교과서 — the + 비교급 (같은 과 문법)' }] }], m),

  // ---------------- WRITE ----------------
  D.section('WRITE', '서술형 대비'),
  ...D.writeItem(1, 'Basic', '빈칸에 알맞은 관계부사를 쓰시오.', ['June didn’t like ______ Mike had acted. (본문)'], { a: 'how', why: '‘~하는 방식’ — the way를 품은 관계부사' }, m),
  ...D.writeItem(2, 'Basic', '두 문장의 의미가 같도록 빈칸에 알맞은 말을 쓰시오.', ['I’ll never forget the day when we met. = I’ll never forget the day ______ ______ we met.'], { a: 'on which', why: 'when = on which' }, m),
  ...D.writeItem(3, 'Intermediate', '관계부사 how를 사용하여 두 문장을 한 문장으로 연결하시오. [두 문장 연결]', ['Sunmin’s sister disliked the way. + Sunmin had treated her in the way.'],
    { a: 'Sunmin’s sister disliked how Sunmin had treated her.', why: '본문' }, m),
  ...D.writeItem(4, 'Intermediate', 'the way를 사용하여 같은 뜻의 문장을 서로 다른 두 가지로 쓰시오. [문장 전환]', ['June didn’t like how Mike had acted.'],
    { a: 'June didn’t like the way Mike had acted. / June didn’t like the way that[in which] Mike had acted.', why: '본문 · 기출 44 — the way how ✗' }, m),
  ...D.writeItem(5, 'Intermediate', '두 문장을 한 문장으로 연결하시오. (in which를 사용할 것) [두 문장 연결]', ['She told us the way. + She had earned so much money in the way.'],
    { a: 'She told us the way in which she had earned so much money.', why: '기출 19 (E)' }, m),
  ...D.writeItem(6, 'Intermediate', '두 문장을 한 문장으로 연결하시오. (How로 시작할 것) [두 문장 연결]', ['The way was still unknown. + The accident happened in the way.'],
    { a: 'How the accident happened was still unknown.', why: '기출 19 (H) — how절 주어, 단수 was' }, m),
  ...D.writeItem(7, 'Advanced', '우리말과 같은 뜻이 되도록 <조건>에 맞게 영작하시오.', ['이것이 우리가 이기는 방법이야!', '<조건> <보기>에서 필요한 단어만 골라 쓸 것 · 필요시 변형 또는 추가하여 총 5~6단어', '<보기> way, this, how, win, the'],
    { a: 'This is how we win! (This is the way we win!)', why: '기출 20 — how와 the way 중 하나만' }, m),
  ...D.writeItem(8, 'Advanced', '우리말과 같은 뜻이 되도록 <조건>에 맞게 영작하시오.', ['Jason은 그가 그의 자동차를 어떻게 수리하는지 보여 준다.', '<조건> 관계부사 how를 사용하여 현재시제로 쓸 것 · show, repair, car를 사용하되 필요시 변형 또는 추가하여 총 7단어'],
    { a: 'Jason shows how he repairs his car.', why: '기출 21 · 7단어' }, m),
  ...D.writeItem(9, 'Advanced', '우리말과 같은 뜻이 되도록 <조건>에 맞게 영작하시오.', ['Kevin은 내가 운동으로 어떻게 건강을 향상시킬 수 있는지 가르쳐 주었다.', '<조건> 관계부사 how를 사용하여 과거시제로 쓸 것 · Kevin을 주어로 · teach, exercise, could, health, with, improve를 사용하되 필요시 변형 또는 추가하여 총 11단어'],
    { a: 'Kevin taught me how I could improve my health with exercise.', why: '기출 24 · 11단어 (Kevin/taught/me/how/I/could/improve/my/health/with/exercise)' }, m),
  ...D.writeItem(10, 'Advanced', '어법상 틀린 부분 2개를 찾아 바르게 고치고, 그 이유를 쓰시오.', ['June didn’t like the way how Mike had acted. Later, Mike asked his friend how could he say sorry to June.'],
    { a: '① the way how → how (또는 the way)  ② how could he → how he could', why: '① 관계부사 how는 선행사 the way와 함께 쓰지 않는다 ② 문장 속 how절은 how + 주어 + 동사 어순', blanks: ['고친 것', '이유'] }, m),

  // ---------------- MAP ----------------
  D.section('MAP', "DAVID'S MAP — 백지노트 테스트"),
  D.P([D.T('오늘 배운 내용을 떠올리며 빈칸을 채워 보세요. 책을 보지 않고!', { size: 18, color: '595959' })], { spacing: { after: 120 }, keepNext: true }),
  ...D.image(path.join(__dirname, 'map_G-관계부사how.png'), 620),
  ...D.table(['자가 체크 — 백지노트에 이 단어들이 들어갔나요?', '✔'], [
    ['관계부사 how = the way(선행사 포함) · ‘~하는 방식(방법)’', ''], ['the way how ✗ — how와 the way 중 하나만', ''],
    ['the way that · the way in which ○ / the way which … in ○', ''], ['how절이 주어면 단수 (How the accident happened was …)', ''],
    ['when(시간) · where(장소) · why(이유) · how(방법)', ''], ['on which · in which · for which · in which', ''],
    ['관계대명사 뒤는 불완전, 관계부사 뒤는 완전', ''], ['in where ✗ · where … at ✗ · the reason which ✗', ''],
    ['how long · how to · How could ~? 는 의문사 how / the way to ~ 는 ‘길’', ''],
    ['본문: June didn’t like how Mike had acted. / Sunmin’s sister disliked how Sunmin had treated her.', '']], [8838, 800], m),
  ...D.memo(['다음 시간 도입: 본문 두 문장(June didn’t like how Mike had acted / Sunmin’s sister disliked how Sunmin had treated her)을 the way · the way that · the way in which로 바꿔 말하게 하기',
    '약한 반: Point 1(the way how ✗) 확실히 → Point 2는 in which · where … at · the reason why 세 가지만 → Point 3은 how + 주어 + 동사 어순 하나만',
    '기출 19번(0~2단어 빈칸)을 다시 풀기 — the way (which) … (in) / the way (that) … (X) 짝을 말로 설명하게 한다.', '같은 과 the + 비교급과 섞은 개수 문항(기출 15 ⓔ ⓕ) 다시 풀기'], m),
];
D.render(meta, build, process.argv[2] || '.').then(fs_ => {
  const out = fs_.map(f => { const g = path.join(path.dirname(f), path.basename(f).replace(TITLE, '관계부사how')); fs.renameSync(f, g); return g; });
  console.log(out.join('\n'));
});
