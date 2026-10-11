const D0 = require('./david_base');
const path = require('path');
const fs = require('fs');
// 한 문장에 빈칸 ______ 이 두 개 이상이면 david_base의 __밑줄__ 서식으로 잘못 읽히므로
// 밑줄 3개 이상 이어진 빈칸은 밑줄 사이에 U+200B를 넣어 둔다 (so that · 부정대명사 스크립트와 같은 처리).
const ZB = (s) => s.replace(/_{3,}/g, (u) => u.split('').join('​'));
const deep = (v) => typeof v === 'string' ? ZB(v) : Array.isArray(v) ? v.map(deep)
  : (v && typeof v === 'object' && v.constructor === Object) ? Object.fromEntries(Object.entries(v).map(([k, x]) => [k, deep(x)])) : v;
const D = new Proxy(D0, { get: (t, k) => (typeof t[k] === 'function' && !['render', 'P', 'T', 'image'].includes(k)) ? (...a) => t[k](...deep(a)) : t[k] });
const COVER = JSON.parse(process.env.COVER || '{}');
const meta = { series: D.SERIES.G, code: 'G-수의일치', title: '수의 일치', category: 'G. 일치  |  주어-동사 수의 일치 (부분 표현 · each/every · 동명사 주어 · 관계대명사 선행사)',
  rightText: 'G  수의 일치', prefix: process.env.PREFIX || '', cover: COVER.title ? COVER : undefined,
  question: 'More than half of the boys on his soccer team ~~wear~~ them. / Most of her money ~~is~~ spent on buying the new items. — 둘 다 ‘~의 일부’인데, 왜 하나는 복수동사 wear, 하나는 단수동사 is일까?' };

const build = (m) => [
  D.section('FLOW', 'Teaching Flow — 처음 배우는 사람도 따라오는 5단계'),
  ...D.step(1, '우리말로 먼저 생각하기 — ‘누가’ 하는 일인가?', [
    '‘그의 축구팀에 있는 소년들의 반 이상이 그 축구화를 신는다.’ — 축구화를 신는 것은 팀이 아니라 {{소년들}}이다.',
    '우리말은 주어가 하나든 여럿이든 ‘신는다’ 그대로지만, 영어는 주어가 단수냐 복수냐에 따라 동사 모양(wears / wear)이 바뀐다. 이것이 {{수의 일치}}다.'], m),
  ...D.step(2, '이전 단원 복습 — 3인칭 단수 현재 -s', [
    'Jeff {{goes}} to the shopping center and {{sees}} a pair of soccer shoes on display. (본문) — 주어 Jeff(3인칭 단수) → 동사에 -s',
    'The boys {{wear}} the shoes. — 주어가 복수면 -s를 붙이지 않는다. 그렇다면 주어가 ‘~의 반’, ‘~의 대부분’이라면?'], m),
  ...D.step(3, '문제 제기 — half · most는 단수일까, 복수일까?', [
    'more than half of **the boys** on his soccer team ___ them. / Most of **her money** ___ spent on buying the new items.',
    'half, most만 보면 단수인지 복수인지 알 수 없다. 동사는 무엇을 보고 정해야 할까?'], m),
  ...D.step(4, '규칙 발견 — 부분 표현은 of 뒤 명사를 본다', [
    'more than half of the {{boys}}(복수) on his soccer team → **wear** them. (본문)',
    'Most of her {{money}}(셀 수 없는 명사) → **is** spent on buying the new items. (본문)'], m),
  ...D.step(5, '결론 🔑', [
    '부분 표현(half · most · all · some · the rest · 분수 · percent) of + 명사 → {{of 뒤 명사}}에 일치 / each · every · one of · the number of → {{단수}} / a number of → {{복수}} / 동명사 · to부정사 · 명사절 주어 → 단수 / 수식어구 · 관계대명사절은 괄호 치고 {{진짜 주어}}(선행사)에 일치'], m),
  ...D.infoBox('오늘의 핵심 3문장', [
    '① He recognizes the shoes at a glance because more than half of the boys on his soccer team {{wear}} them. (본문)',
    '② Most of her money {{is}} spent on buying the new items to complete her new look. (본문)',
    '③ The Diderot effect is the concept that purchasing a new item often {{leads}} to more unplanned purchases. (본문)'], m),
  ...D.tip(['칠판에 [부분 표현] → of → [명사] → [동사] 네 칸을 그리고, 본문 두 문장(half of the boys / Most of her money)을 칸에 나눠 넣게 한다. 동사 화살표가 half · most가 아니라 of 뒤 명사에서 나간다는 것을 눈으로 확인시킨다.',
    '같은 과 문법 접속사 as와 함께 출제되므로(기출 81 · 99처럼 본문 문항에 섞임) PERFECT CHECK에 접속사 as 2문항을 섞어 두었다. Point 3(수식어구 · 관계대명사절)은 본문 문장(the difference of the two prices becomes · a wagon that encourages) 중심으로 다룬다.'], m),

  // ---------------- Point 1 ----------------
  D.section('Point 1', '부분 표현 — half · most · all · some · 분수 · percent · the rest of + 명사', 'point'),
  ...D.table(['구성', '역할 · 설명', '예'], [
    ['half of + 명사', '‘~의 반’ — of 뒤 명사의 수에 동사를 맞춘다', 'More than half of the **boys** on his soccer team **wear** them. (본문) / Half of the **money** **was** donated to people in need. (교과서)'],
    ['most · all · some of + 명사', '복수명사 → 복수동사 / 단수명사 · 셀 수 없는 명사 → 단수동사', 'Most of her **money** **is** spent on buying the new items. (본문) / All of the **paintings** **were** sold in a day. (교과서)'],
    ['분수 · percent of + 명사', 'one third · two thirds · a quarter · 10 percent … — 역시 of 뒤 명사', 'One third of the world’s **food** **is** wasted. (교과서) / Only 10 percent of the **children** **go** to school. (교과서)'],
    ['the rest of + 명사', '‘~의 나머지’ — of 뒤 명사', 'The rest of the **people** **are** working on another project. (기출)'],
    ['none of + 명사', '단수 · 셀 수 없는 명사 → 단수 / 복수명사 → 복수(단수도 가능) — 학교 시험은 본문대로 복수', 'But she sees that none of her **bags** **match** her new clothes. (본문)']], [2300, 3300, 4038], m),
  ...D.infoBox('부분 표현 주어 3단계', [
    '① 부분 표현(half, most, 분수, percent …) 다음의 {{of}}를 찾는다.',
    '② of 뒤 명사가 복수인지, 단수 · 셀 수 없는 명사인지 확인: the boys(복수) / her money({{셀 수 없는 명사}})',
    '③ 그 명사에 동사를 맞춘다: the boys → wear / her money → {{is}}'], m),
  ...D.trick('오브 뒤를 봐라!', ['“half, most, 퍼센트 — 앞은 껍데기, 오브(of) 뒤가 진짜!”', '“돈(money) · 물(water) · 음식(food)은 못 세니까 단수!”']),
  ...D.examPoint([
    { q: 'He recognizes the shoes at a glance because more than half of the boys on his soccer team {{wear}} them. (wears ✗)', why: 'of 뒤 the boys(복수) → wear (본문 기출 81 · 99)' },
    { q: 'Most of her money {{is}} spent on buying the new items to complete her new look. (are ✗)', why: 'her money(셀 수 없는 명사) → is (본문 기출 128)' }], m),
  ...D.caution(['of 앞 단어(half, most)나 동사 바로 앞 명사(team)에 맞춘 선지 — more than half of the boys on his soccer team wears ✗(team에 맞춤)가 본문 기출 단골이다. (기출 81 · 99)',
    'money · water · food · garbage · milk · time · land는 셀 수 없는 명사 → 단수: Most of the floating garbage are ✗, Some of the milk are ✗, Most of the time were ✗ (기출 17 · 18 · 27)',
    '분수 · percent: Two thirds of the world’s food are wasted ✗ / About half of the apples in the box was rotten ✗ — 같은 분수라도 of 뒤 명사에 따라 달라진다. (기출 20 · 21)',
    'none of + 복수명사: 교재는 단수 · 복수 모두 가능하다고 설명하지만, 워크북 · 기출은 본문대로 match(복수)를 정답 처리했다(none of her bags matches ✗). 시험 대비는 본문 형태로 쓰게 한다.'], m),
  ...D.drill(1, '부분 표현 + of + 명사 → 명사에 일치', [
    { level: 'Basic ①', type: 'choice', instr: '괄호 안에서 알맞은 것을 고르시오.', items: [
      { q: 'He recognizes the shoes because more than half of the boys on his soccer team (wear / wears) them.', a: 'wear', why: 'of 뒤 the boys(복수) (본문)' },
      { q: 'Most of her money (are / is) spent on buying the new items.', a: 'is', why: 'her money — 셀 수 없는 명사 (본문)' },
      { q: 'All of the paintings (was / were) sold in a day.', a: 'were', why: 'the paintings(복수) (교과서)' },
      { q: 'Half of the money (were / was) donated to people in need.', a: 'was', why: 'the money — 셀 수 없는 명사 (교과서)' },
      { q: 'About half of the water (is / are) used to raise animals in the U.S.', a: 'is', why: 'the water — 셀 수 없는 명사 (교과서)' },
      { q: 'In Somalia, only 10 percent of the children (goes / go) to school.', a: 'go', why: 'the children(복수) (교과서)' },
      { q: 'Most of the floating garbage (are / is) plastic.', a: 'is', why: 'garbage — 셀 수 없는 명사 (기출 17)' },
      { q: 'Some of the milk (was / were) spilled.', a: 'was', why: 'milk — 셀 수 없는 명사 (기출 18 변형)' },
      { q: 'Two thirds of the students (like / likes) listening to the radio.', a: 'like', why: 'the students(복수) (기출 26)' },
      { q: 'The rest of the people (is / are) working on another project.', a: 'are', why: 'the people(복수) (기출 26)' }] },
    { level: 'Basic ②', type: 'fill', instr: '<보기>에서 알맞은 말을 골라 빈칸에 쓰시오. (한 번씩만 사용)',
      bogi: ['were', 'save', 'is', 'don’t', 'wear', 'are', 'record', 'match', 'was', 'get'], items: [
      { q: 'He recognizes the shoes at a glance because more than half of the boys on his soccer team [[wear]] them.', why: '본문 — the boys(복수)' },
      { q: 'Most of her money [[is]] spent on buying the new items to complete her new look.', why: '본문 — money(셀 수 없는 명사)' },
      { q: 'But she sees that none of her bags [[match]] her new clothes.', why: '본문 — her bags(복수)' },
      { q: 'Ninety percent of the students [[get]] an allowance.', why: '교과서 Think & Write — the students(복수)' },
      { q: 'Sixty percent of the students [[save]] their money.', why: '교과서 Think & Write' },
      { q: 'Three quarters of the students [[record]] their spending.', why: '교과서 Think & Write' },
      { q: 'Half of the money [[was]] donated to people in need last year.', why: '교과서 — money(단수) · 과거' },
      { q: 'All of the paintings [[were]] sold in a day.', why: '교과서 — paintings(복수) · 과거' },
      { q: 'About 14 percent of all people [[don’t]] know how to read.', why: '교과서 — all people(복수)' },
      { q: 'Forty percent of the student council members [[are]] in the meeting room.', why: '기출 10 — members(복수)' }] },
    { level: 'Intermediate', type: 'write', instr: '어법상 틀린 부분을 찾아 바르게 고쳐 쓰시오.', items: [
      { q: 'He recognizes the shoes because more than half of the boys on his soccer team wears them.', a: 'wears → wear', why: '본문 기출 81 — of 뒤 the boys' },
      { q: 'Most of her money are spent on buying the new items to complete her new look.', a: 'are → is', why: '워크북 — money(셀 수 없는 명사)' },
      { q: 'But she sees that none of her bags matches her new clothes.', a: 'matches → match', why: '워크북 — 본문대로 복수' },
      { q: 'Most of the time be spent on the bus during the last trip.', a: 'be → was', why: '기출 27 — time(단수) · 과거' },
      { q: 'Two thirds of the world’s food are wasted every year.', a: 'are → is', why: '기출 20 — food(셀 수 없는 명사)' },
      { q: 'About half of the apples in the box was rotten.', a: 'was → were', why: '기출 21 — the apples(복수)' },
      { q: 'More than 80 percent of the people lives in the country.', a: 'lives → live', why: '기출 18 — the people(복수)' },
      { q: 'All of the members of my team was in good condition.', a: 'was → were', why: '기출 22 — the members(복수)' },
      { q: 'One fifth of the atmosphere are oxygen.', a: 'are → is', why: '기출 24 — the atmosphere(단수)' },
      { q: 'Some of the books that he has is English novels.', a: 'is → are', why: '기출 24 — the books(복수)' }] },
    { level: 'Advanced · 모두 고르기', type: 'multi', free: true, instr: '해당하는 것을 모두 골라 기호를 쓰시오.', items: [
      { q: '다음 중 어법상 옳은 문장을 모두 고르시오.', box: [
        '(a) Half of the students are women.', '(b) Most of the floating garbage are plastic.', '(c) A quarter of the money was spent on books.',
        '(d) Some of the milk are spilled.', '(e) Only 10 percent of the people agree with the new rule.'], a: '(a), (c), (e)', why: '(b) garbage → is (d) milk → is/was (기출 17 · 18 · 19 · 22 · 25)' },
      { q: '밑줄 친 부분에 대한 설명으로 옳은 것을 모두 고르시오.', box: [
        '(a) More than half of the boys on his soccer team __wear__ them. → of 뒤의 복수명사 the boys에 맞춰 복수동사를 썼다.',
        '(b) Most of her money __is__ spent on buying the new items. → money가 셀 수 없는 명사라서 단수동사를 썼다.',
        '(c) None of her bags __match__ her new clothes. → of 뒤의 복수명사 her bags에 맞췄다.',
        '(d) Two thirds of the world’s food __is__ wasted. → 분수가 복수(thirds)이므로 are로 고쳐야 한다.',
        '(e) All of the paintings __were__ sold in a day. → all은 ‘모든’이라 뒤에 무엇이 와도 항상 복수동사를 쓴다.'], a: '(a), (b), (c)', why: '(d) of 뒤 food(셀 수 없는 명사) → is가 맞다 (e) All of the money is ~처럼 단수도 가능' },
      { q: '다음 글(본문 변형)의 밑줄 친 ⓐ~ⓔ 중 어법상 어색한 것을 모두 골라 기호를 쓰고 바르게 고치시오.', fix: true, label: '기호 / 고친 것', box: [
        'Jeff sees a pair of soccer shoes on display. More than half of the boys on his soccer team ⓐ __wears__ them. Lisa buys a new coat, but none of her bags ⓑ __match__ her new clothes. Most of her money ⓒ __are__ spent on buying the new items. About half of the water ⓓ __is__ used to raise animals in the U.S. Only 10 percent of the children in Somalia ⓔ __go__ to school.'],
        a: 'ⓐ wears → wear, ⓒ are → is', why: 'ⓐ of 뒤 the boys(복수) ⓒ her money(셀 수 없는 명사)' },
      { q: '빈칸에 is가 들어갈 수 있는 것을 모두 고르시오.', box: [
        '(a) Forty percent of the student council members ______ in the meeting room.', '(b) Most of the land ______ covered with ice.', '(c) The rest of the people ______ working on another project.',
        '(d) None of this money ______ ours.', '(e) One fifth of the atmosphere ______ oxygen.'], a: '(b), (d), (e)', why: '(a)(c) 복수명사 → are (기출 10 · 12 · 24 · 26)' },
      { q: '다음 중 우리말을 바르게 영작한 것을 모두 고르시오.', box: [
        '(a) 모든 그림이 하루 만에 다 팔렸다. → All of the paintings was sold in a day.', '(b) 40%의 학생들은 규칙적으로 운동한다. → Forty percent of the students exercises regularly.',
        '(c) 돈의 절반이 어려운 사람들에게 기부되었다. → Half of the money was donated to people in need.', '(d) 떠다니는 쓰레기의 대부분은 플라스틱이다. → Most of the floating garbage are plastic.',
        '(e) 상자 안 사과의 절반이 썩었다. → Half of the apples in the box were rotten.'], a: '(c), (e)', why: '(a) were (b) exercise (d) is (기출 17 · 21)' }] },
    { level: 'Advanced · 객관식', type: 'mcq', free: true, instr: '알맞은 답을 고르시오.', items: [
      { q: '다음 중 빈칸에 들어갈 be동사의 형태가 나머지 넷과 다른 하나는?', opts: [
        'None of this money ______ ours.', 'More than half of the report ______ already completed.', 'One third of the world’s food ______ wasted every year.',
        'Forty percent of the student council members ______ in the meeting room.', 'Most of the land ______ covered with ice.'], a: '④', why: '④ members(복수) → are / 나머지 is (기출 10 · 12)' },
      { q: '다음 중 밑줄 친 부분이 어법상 알맞은 것은?', opts: [
        'Most of the time __were__ spent on the bus.', 'Ten percent of the children __go__ to school.', 'I think that most of the kids __likes__ animals.',
        'Some of the milk __are__ spilled.', 'About half of the apples in the box __was__ rotten.'], a: '②', why: '① was ③ like ④ is/was ⑤ were (기출 18 · 21)' },
      { q: '다음 중 어법상 어색한 것은?', opts: [
        'The rest of the money is donated.', 'Ten percent of the children go to school.', 'Half of the water is used to raise animals.',
        'Many of my friends were happy with the news.', 'Two thirds of the world’s food are wasted.'], a: '⑤', why: '⑤ food(셀 수 없는 명사) → is (기출 20)' },
      { q: '(A)~(C)에 알맞은 말이 바르게 짝지어진 것은? — (A) More than half of the boys on his team (wear / wears) them. (B) Most of her money (is / are) spent on new items. (C) Three quarters of the students (record / records) their spending.', opts: [
        'wear – is – record', 'wears – is – record', 'wear – are – records', 'wears – are – record', 'wear – is – records'], a: '①', why: '(A) the boys (B) money (C) the students' },
      { q: '다음 중 어법상 틀린 문장의 개수는?', box: [
        '(a) Half of the students are women.', '(b) Most of mathematics are difficult for us to study.', '(c) All of the members of my team was in good condition.',
        '(d) About 14 percent of all people don’t know how to read.', '(e) Some of the books that he has is English novels.'], opts: ['1개', '2개', '3개', '4개', '5개'], a: '③', why: '(b) is (c) were (e) are — 3개 (기출 22 · 24 · 25)' }] },
    { level: '전환 · 연결', type: 'write', instr: '우리말과 같은 뜻이 되도록 괄호 안의 말을 이용하여 문장을 완성하시오. (동사의 수와 시제에 주의)', items: [
      { q: '그의 축구팀 소년들의 반 이상이 그 신발을 신는다. (more than half, the boys, wear)', a: 'More than half of the boys on his soccer team wear those shoes.', why: '본문 · 교과서 Language in Use' },
      { q: '그녀의 돈 대부분이 새 물품을 사는 데 쓰인다. (most, her money, spend)', a: 'Most of her money is spent on buying the new items.', why: '본문' },
      { q: '미국에서 물의 약 절반이 동물을 기르는 데 사용된다. (about half, the water, use)', a: 'About half of the water is used to raise animals in the U.S.', why: '교과서 · 기출 29' },
      { q: '세계 식량의 3분의 1이 매년 낭비된다. (one third, food, waste)', a: 'One third of the world’s food is wasted every year.', why: '교과서 · 기출 29' },
      { q: '소말리아에서는 아이들의 10퍼센트만이 학교에 다닌다. (only 10 percent, the children, go)', a: 'In Somalia, only 10 percent of the children go to school.', why: '교과서 · 기출 29' },
      { q: '학생들의 90퍼센트가 용돈을 받는다. (ninety percent, the students, get)', a: 'Ninety percent of the students get an allowance.', why: '교과서 Think & Write' },
      { q: '학생들의 4분의 3이 지출을 기록한다. (three quarters, the students, record)', a: 'Three quarters of the students record their spending.', why: '교과서 Think & Write' },
      { q: '모든 그림들이 하루 만에 팔렸다. (all, the paintings, sell)', a: 'All of the paintings were sold in a day.', why: '교과서 — 과거 수동' },
      { q: '돈의 절반이 어려운 사람들에게 기부되었다. (half, the money, donate)', a: 'Half of the money was donated to people in need.', why: '교과서 — 과거 수동' },
      { q: '그녀의 가방 중 어느 것도 새 옷과 어울리지 않는다. (none, her bags, match)', a: 'None of her bags match her new clothes.', why: '본문 — 복수명사 → match' }] },
  ], m),

  // ---------------- Point 2 ----------------
  D.section('Point 2', '항상 단수 · 항상 복수 — each · every · one of · the number of vs a number of · 동명사 주어', 'point'),
  ...D.table(['구성', '역할 · 설명', '예'], [
    ['each · every + 단수명사', '‘각각의, 모든’ — 단수명사 + 단수동사', '**Every** rule **has** its exception. / **Each** member in the group **has** a nickname. (기출 19)'],
    ['each of · one of + 복수명사', '복수명사가 와도 주어는 each · one → 단수동사', '**One of** the students **doesn’t** have a school bag. (기출 22) / **Each of** these systems **has** its advantages. (교과서 Grammar✚)'],
    ['the number of + 복수명사', '‘~의 수’ — 주어는 number → **단수**', '**The number of** smartphone users **is** growing rapidly. (기출 22)'],
    ['a number of + 복수명사', '‘많은 ~’(= many) → **복수**', '**A number of** people **are** gathering to see the boy band. (기출 19)'],
    ['동명사 · to부정사 · 명사절 주어', '하나의 행동 · 사실 → 단수', '~ the concept that **purchasing a new item** often **leads** to more unplanned purchases. / Let’s consider **what affects** us. (본문)'],
    ['시간 · 거리 · 금액 · 학문명', '하나의 덩어리 · -s로 끝나도 단수', '**Two hours seems** enough to take a walk. (기출 26) / **Physics is** the scientific study of forces. (기출 12)']], [2600, 3000, 4038], m),
  ...D.infoBox('단수냐 복수냐 — 주어의 ‘머리’를 찾아라', [
    '① each · every · one (of) → 머리가 하나 → {{단수}} (each 뒤 명사도 단수: Each member ○ · Each members ✗)',
    '② the number of → 머리가 number(수) → {{단수}} / a number of = many → {{복수}}',
    '③ 동명사 · to부정사 · 명사절 주어 → 하나의 행동 · 사실 → 단수: Purchasing a new item often {{leads}} to more unplanned purchases.'], m),
  ...D.trick('더 넘버는 하나, 어 넘버는 많다!', ['“The number(그 수)는 숫자 하나 — 단수! A number of는 many — 복수!”', '“에브리 · 이치 · 원 오브 — 하나씩 세면 단수!”']),
  ...D.examPoint([
    { q: 'The Diderot effect is the concept that purchasing a new item often {{leads}} to more unplanned purchases. (lead ✗)', why: '동명사구 주어 → 단수 (본문 기출 110)' },
    { q: 'The number of students in our class {{is}} twenty. / A number of people {{are}} gathering to see the boy band.', why: 'the number of → 단수 / a number of → 복수 (기출 19)' }], m),
  ...D.caution(['동명사 주어 문장을 lead(복수형)로 바꿔 출제한다 — purchasing a new item often lead ✗ (기출 110). 동명사 뒤 명사(item)가 아니라 동명사구 전체가 주어.',
    'each · every 뒤 명사 형태: Each members ✗(기출 23), Each member in the group have ✗(기출 19) — 명사도 단수, 동사도 단수.',
    'the number of + 복수명사 + are ✗(The number of injuries from the war are ✗, 기출 26) / A number of books is ✗(기출 25) / A number of the students likes ✗(기출 26)',
    '-s로 끝나는 학문명 · 시간(Physics, mathematics, Two hours)은 단수 — 기출 12 · 25 · 26에서 ‘나머지 넷과 다른 것’ 유형으로 나왔다.'], m),
  ...D.drill(2, 'each · every · the number of · a number of · 동명사 주어', [
    { level: 'Basic ①', type: 'choice', instr: '괄호 안에서 알맞은 것을 고르시오.', items: [
      { q: 'The Diderot effect is the concept that purchasing a new item often (lead / leads) to more unplanned purchases.', a: 'leads', why: '동명사구 주어 → 단수 (본문)' },
      { q: 'Let’s consider what (affect / affects) us when it comes to buying things.', a: 'affects', why: '의문사 what이 주어 → 단수 (본문)' },
      { q: 'Every rule (has / have) its exception.', a: 'has', why: 'every + 단수명사 → 단수 (기출 19)' },
      { q: 'Each member in the group (has / have) a nickname.', a: 'has', why: 'each + 단수명사 → 단수 (기출 19)' },
      { q: 'The number of smartphone users (is / are) growing rapidly.', a: 'is', why: 'the number of → 단수 (기출 22)' },
      { q: 'A number of people (is / are) gathering to see the lion.', a: 'are', why: 'a number of → 복수 (기출 23)' },
      { q: 'One of the students (don’t / doesn’t) have a school bag.', a: 'doesn’t', why: 'one of + 복수명사 → 단수 (기출 22)' },
      { q: 'Two hours (seems / seem) enough to take a walk.', a: 'seems', why: '시간 덩어리 → 단수 (기출 26)' },
      { q: 'Physics (are / is) the scientific study of forces.', a: 'is', why: '학문명 → 단수 (기출 12)' },
      { q: 'Taking a walk (is / are) good exercise.', a: 'is', why: '동명사 주어 → 단수 (교과서 구문 UP)' }] },
    { level: 'Basic ②', type: 'fill', instr: '<보기>에서 알맞은 말을 골라 빈칸에 쓰시오. (한 번씩만 사용)',
      bogi: ['has', 'seems', 'are', 'leads', 'have', 'is', 'doesn’t', 'decreases', 'was', 'affects'], items: [
      { q: 'Purchasing a new item often [[leads]] to more unplanned purchases.', why: '본문 — 동명사구 주어' },
      { q: 'Let’s consider what [[affects]] us when it comes to buying things.', why: '본문 — what 주어' },
      { q: 'Every student [[is]] gathering on the ground now.', why: '기출 25 — every + 단수' },
      { q: 'A number of school events [[are]] held in fall.', why: '기출 17 — a number of → 복수' },
      { q: 'The number of students [[decreases]] day by day.', why: '기출 18 — the number of → 단수' },
      { q: 'Each of these systems [[has]] its advantages and disadvantages.', why: '교과서 Grammar✚ — each of → 단수' },
      { q: 'One of the students [[doesn’t]] have a school bag.', why: '기출 22 — one of → 단수' },
      { q: 'The number of employees [[was]] reduced from 40 to 25 last year.', why: '교과서 Grammar✚ — 단수 · 과거' },
      { q: 'A number of problems [[have]] arisen.', why: '교과서 Grammar✚ — 복수 · 현재완료' },
      { q: 'Two hours [[seems]] enough to take a walk.', why: '기출 26 — 시간 → 단수' }] },
    { level: 'Intermediate', type: 'write', instr: '어법상 틀린 부분을 찾아 바르게 고쳐 쓰시오.', items: [
      { q: 'The Diderot effect is the concept that purchasing a new item often lead to more unplanned purchases.', a: 'lead → leads', why: '기출 110 — 동명사구 주어' },
      { q: 'Let’s consider what affect us when it comes to buying things.', a: 'affect → affects', why: '워크북 — what 주어 → 단수' },
      { q: 'Each member in the group have a nickname.', a: 'have → has', why: '기출 19 — each + 단수' },
      { q: 'Each members in the group has a nickname.', a: 'members → member', why: '기출 23 — each + 단수명사' },
      { q: 'A number of books is on the table.', a: 'is → are', why: '기출 25 — a number of → 복수' },
      { q: 'The number of injuries from the war are shocking.', a: 'are → is', why: '기출 26 — the number of → 단수' },
      { q: 'A number of the students likes online classes.', a: 'likes → like', why: '기출 26 — a number of → 복수' },
      { q: 'It is said that the number of students in a small town decrease day by day.', a: 'decrease → decreases', why: '기출 24 — the number of → 단수' },
      { q: 'One of the students don’t have a school bag.', a: 'don’t → doesn’t', why: '기출 22 변형 — one of → 단수' },
      { q: 'Physics are the scientific study of forces.', a: 'are → is', why: '기출 12 변형 — 학문명 → 단수' }] },
    { level: 'Advanced · 모두 고르기', type: 'multi', free: true, instr: '해당하는 것을 모두 골라 기호를 쓰시오.', items: [
      { q: '다음 중 어법상 옳은 문장을 모두 고르시오.', box: [
        '(a) Each member in the group have a nickname.', '(b) Every rule has its exception.', '(c) A number of books is on the table.',
        '(d) The number of students in our class is twenty.', '(e) Two hours seems enough to take a walk.'], a: '(b), (d), (e)', why: '(a) has (c) are (기출 19 · 25 · 26)' },
      { q: '밑줄 친 동사가 단수형인 이유가 ‘주어가 동명사(구) · 명사절이기 때문’인 것을 모두 고르시오.', box: [
        '(a) Purchasing a new item often __leads__ to more unplanned purchases.', '(b) Let’s consider what __affects__ us when it comes to buying things.',
        '(c) The number of smartphone users __is__ growing rapidly.', '(d) Taking a walk __is__ good exercise.', '(e) Every rule __has__ its exception.'], a: '(a), (b), (d)', why: '(c) the number of (e) every + 단수명사' },
      { q: '다음 글의 밑줄 친 ⓐ~ⓔ 중 어법상 어색한 것을 모두 골라 기호를 쓰고 바르게 고치시오.', fix: true, label: '기호 / 고친 것', box: [
        'Let’s consider what ⓐ __affects__ us when it comes to buying things. A number of people ⓑ __buys__ things just because other people have bought them. The number of such buyers ⓒ __is__ growing. Each of these effects ⓓ __explain__ our behavior. Purchasing a new item often ⓔ __leads__ to more unplanned purchases.'],
        a: 'ⓑ buys → buy, ⓓ explain → explains', why: 'ⓑ a number of → 복수 ⓓ each of → 단수' },
      { q: '빈칸에 is가 들어갈 수 있는 것을 모두 고르시오.', box: [
        '(a) A number of people ______ waiting outside the store.', '(b) It says that the number of imported cars ______ increasing every year.', '(c) Each of the students ______ in the English class.',
        '(d) Taking a walk ______ good exercise.', '(e) A number of bridges ______ built by the workers last year.'], a: '(b), (c), (d)', why: '(a) are (e) were (기출 10 · 12)' },
      { q: '괄호 안의 동사를 복수형(현재)으로 써야 하는 것을 모두 고르시오.', box: [
        '(a) A number of students (like) online classes.', '(b) Every student (be) gathering on the ground.', '(c) Two thirds of the students (like) listening to the radio.',
        '(d) The number of students (decrease) day by day.', '(e) I think that most of the kids (like) animals.'], a: '(a), (c), (e)', why: '(b) is (d) decreases (기출 18 · 25 · 26)' }] },
    { level: 'Advanced · 객관식', type: 'mcq', free: true, instr: '알맞은 답을 고르시오.', items: [
      { q: '다음 중 빈칸에 들어갈 말이 나머지 넷과 다른 것은? (현재시제)', opts: [
        'Two hours ______ enough to take a walk.', 'Most of the land ______ covered with ice.', 'A number of bridges ______ built by the workers.',
        'Physics ______ the scientific study of forces.', 'Each of the students ______ in the English class.'], a: '③', why: '③ are / 나머지 is · seems (단수) (기출 12)' },
      { q: '다음 중 어법상 어색한 것은?', opts: [
        'Every rule has its exception.', 'A number of people are gathering to see the boy band.', 'Only 10 percent of the people agree with the new rule.',
        'The number of students in our class is twenty.', 'Each member in the group have a nickname.'], a: '⑤', why: '⑤ each + 단수명사 → has (기출 19)' },
      { q: '다음 중 어법상 알맞은 것은?', opts: [
        'The number of students decreases day by day.', 'A number of the students likes online classes.', 'The number of injuries from the war are shocking.',
        'Each members in the group has a nickname.', 'Purchasing a new item often lead to more unplanned purchases.'], a: '①', why: '② like ③ is ④ member ⑤ leads (기출 18 · 23 · 26 · 110)' },
      { q: '(A)~(C)에 알맞은 말이 바르게 짝지어진 것은? — (A) The number of smartphone users (is / are) growing. (B) A number of problems (has / have) arisen. (C) Purchasing a new item often (lead / leads) to more purchases.', opts: [
        'are – has – lead', 'is – has – leads', 'are – have – leads', 'is – have – leads', 'is – have – lead'], a: '④', why: '(A) the number of → 단수 (B) a number of → 복수 (C) 동명사구 → 단수' },
      { q: '다음 중 어법상 틀린 문장의 개수는?', box: [
        '(a) Every student is gathering on the ground.', '(b) One of the students don’t have a school bag.', '(c) Two hours seems enough to take a walk.',
        '(d) A number of school events is held in fall.', '(e) Let’s consider what affects us.'], opts: ['1개', '2개', '3개', '4개', '5개'], a: '②', why: '(b) doesn’t (d) are — 2개 (기출 17 · 22)' }] },
    { level: '전환 · 연결', type: 'write', instr: '우리말과 같은 뜻이 되도록 괄호 안의 말을 이용하여 문장을 완성하시오. (동사의 수와 시제에 주의)', items: [
      { q: '새로운 물품을 구입하는 것은 흔히 계획에 없던 더 많은 구매로 이어진다. (purchase, lead to)', a: 'Purchasing a new item often leads to more unplanned purchases.', why: '본문 — 동명사구 주어' },
      { q: '무엇이 우리에게 영향을 주는지 생각해 보자. (consider, what, affect)', a: 'Let’s consider what affects us.', why: '본문 — what 주어 → 단수' },
      { q: '스마트폰 사용자의 수가 빠르게 늘고 있다. (the number, grow)', a: 'The number of smartphone users is growing rapidly.', why: '기출 22' },
      { q: '많은 사람들이 그 보이 밴드를 보려고 모이고 있다. (a number, gather)', a: 'A number of people are gathering to see the boy band.', why: '기출 19' },
      { q: '모든 규칙에는 예외가 있다. (every, have)', a: 'Every rule has its exception.', why: '기출 19' },
      { q: '그 그룹의 각 구성원은 별명을 가지고 있다. (each, member, have)', a: 'Each member in the group has a nickname.', why: '기출 19' },
      { q: '학생들 중 한 명은 책가방이 없다. (one, not have)', a: 'One of the students doesn’t have a school bag.', why: '기출 22' },
      { q: '산책하는 것은 좋은 운동이다. (take a walk, be)', a: 'Taking a walk is good exercise.', why: '교과서 구문 UP — 동명사 주어' },
      { q: '많은 학교 행사들이 가을에 열린다. (a number, hold)', a: 'A number of school events are held in fall.', why: '기출 17 — 복수 · 수동' },
      { q: '직원의 수가 40명에서 25명으로 줄었다. (the number, employees, reduce)', a: 'The number of employees was reduced from 40 to 25.', why: '교과서 Grammar✚ — 단수 · 과거 수동' }] },
  ], m),

  // ---------------- Point 3 ----------------
  D.section('Point 3', '(심화) 진짜 주어 찾기 — 수식어구 · 관계대명사절 선행사 · there is/are · 상관접속사', 'point'),
  ...D.table(['구분', '설명', '예'], [
    ['주어 + 전치사구', '전치사구는 괄호! 동사는 앞의 진짜 주어에', 'As **the difference** (of the two prices) **becomes** bigger, ~ (본문) — prices에 맞추지 않는다'],
    ['주어 + 분사구', '분사구(p.p. · -ing)도 괄호', '**The situation** (described above) **is** an example of the “anchoring effect.” / **The price** (mentioned first) **affects** our opinion ~ (본문)'],
    ['주격 관계대명사절', 'who · which · that 뒤 동사 → **선행사**에 일치', 'a **wagon** in a parade that **encourages** people ~ / new **pants** that **go** perfectly ~ / an “**anchor**” that **fixes** our thoughts (본문)'],
    ['there is / there are', 'there는 주어가 아님 → 뒤의 명사에 일치', 'There **are** many things that influence our purchases. (본문 응용)'],
    ['both A and B · A as well as B', 'both A and B → 복수 / A as well as B → A에 일치', '**Both** Jeff **and** Lisa **buy** things they don’t need. / **Lisa** as well as her friends **likes** shopping. (본문 응용)'],
    ['either A or B · not only A but also B', '동사와 가까운 **B**에 일치', 'Either you or **Jeff has** to pay. / Not only Jeff but also **his friends wear** the shoes. (본문 응용)']], [2600, 3200, 3838], m),
  ...D.infoBox('진짜 주어 찾기 3단계', [
    '① 전치사구(of ~, on ~, in ~) · 분사구(described ~, mentioned ~)에 괄호 치기 — 단, half · most · 분수 · percent of는 Point 1처럼 of 뒤를 본다',
    '② 괄호 밖에 남은 명사가 진짜 주어: the difference (of the two prices) → {{the difference}} → becomes',
    '③ 관계대명사절 동사는 선행사를 보고: a wagon that {{encourages}} / new pants that {{go}}'], m),
  ...D.trick('부분은 of 뒤, 나머지는 of 앞!', ['“half · most · 퍼센트면 오브 뒤, difference · price면 오브 앞!”', '“관계대명사 that 뒤 동사는 선행사 따라간다!”']),
  ...D.examPoint([
    { q: 'Furthermore, as the difference of the two prices {{becomes}} bigger, the effect will be more powerful. (become ✗)', why: '주어 the difference(단수) — prices에 맞추지 않음 (본문)' },
    { q: 'A bandwagon is a wagon in a parade that {{encourages}} people to jump aboard and enjoy the music. (encourage ✗)', why: '선행사 a wagon(단수) → encourages (본문)' }], m),
  ...D.caution(['동사 바로 앞 명사에 맞춘 선지 — the difference of the two prices become ✗, The price mentioned first affect ✗: 전치사구 · 분사구는 괄호.',
    '관계대명사절: new pants that goes ✗(선행사 pants 복수), an anchor that fix ✗ — 선행사부터 찾게 한다. 목적격(a coat that she really loves)은 관계절의 주어 she에 맞춘다.',
    'more than half of the boys on his soccer team wears ✗는 부분 표현(of 뒤 boys) + 수식어구(on his soccer team) 함정이 한 문장에 겹친 본문 대표 문항이다. (기출 81 · 99)',
    'there is/are, 상관접속사(both A and B · either A or B · A as well as B)는 교과서 Grammar✚ 밖 — 응용 문항으로만 다룬다.'], m),
  ...D.drill(3, '진짜 주어 찾기 — 수식어구 · 관계대명사절', [
    { level: 'Basic ①', type: 'choice', instr: '괄호 안에서 알맞은 것을 고르시오.', items: [
      { q: 'As the difference of the two prices (becomes / become) bigger, the effect will be more powerful.', a: 'becomes', why: '주어 the difference (본문)' },
      { q: 'The situation described above (are / is) an example of the “anchoring effect.”', a: 'is', why: '주어 the situation — 분사구 괄호 (본문)' },
      { q: 'The price mentioned first (affect / affects) our opinion of prices mentioned afterwards.', a: 'affects', why: '주어 the price (본문)' },
      { q: 'A bandwagon is a wagon in a parade that (encourages / encourage) people to jump aboard.', a: 'encourages', why: '선행사 a wagon (본문)' },
      { q: 'So, she buys new pants that (go / goes) perfectly with her new coat.', a: 'go', why: '선행사 new pants (본문)' },
      { q: 'The price mentioned first acts as an “anchor” that (fix / fixes) our thoughts.', a: 'fixes', why: '선행사 an anchor (본문)' },
      { q: 'Lisa buys a coat that she really (loves / love).', a: 'loves', why: '목적격 관계절의 주어 she (본문)' },
      { q: 'There (are / is) many things that influence our purchases.', a: 'are', why: 'there 뒤 many things (본문 응용)' },
      { q: 'Both Jeff and Lisa (buy / buys) things they don’t need.', a: 'buy', why: 'both A and B → 복수 (본문 응용)' },
      { q: 'Not only Jeff but also his friends (wears / wear) the shoes.', a: 'wear', why: 'B(his friends)에 일치 (본문 응용)' }] },
    { level: 'Basic ②', type: 'fill', instr: '<보기>에서 알맞은 말을 골라 빈칸에 쓰시오. (한 번씩만 사용)',
      bogi: ['fixes', 'was', 'go', 'likes', 'is', 'becomes', 'are', 'encourages', 'were', 'affects'], items: [
      { q: 'As the difference of the two prices [[becomes]] bigger, the effect will be more powerful.', why: '본문 — the difference' },
      { q: 'The situation described above [[is]] an example of the “anchoring effect.”', why: '본문 — the situation' },
      { q: 'The price mentioned first [[affects]] our opinion of prices mentioned afterwards.', why: '본문 — the price' },
      { q: 'A bandwagon is a wagon in a parade that [[encourages]] people to jump aboard.', why: '본문 — 선행사 a wagon' },
      { q: 'She buys new pants that [[go]] perfectly with her new coat.', why: '본문 — 선행사 pants' },
      { q: 'The price mentioned first acts as an “anchor” that [[fixes]] our thoughts about the price of an item.', why: '본문 — 선행사 an anchor' },
      { q: 'Yesterday Jeff and Lisa [[were]] sure that they needed new things.', why: '기출 24 변형 — A and B · 과거' },
      { q: 'There [[are]] many hidden causes that affect our purchases.', why: '본문 응용 — there + 복수명사' },
      { q: 'I saw a little boy who [[was]] playing soccer.', why: '교과서 구문 UP — 선행사 a little boy · 과거' },
      { q: 'Lisa as well as her friends [[likes]] shopping.', why: '본문 응용 — A as well as B → A' }] },
    { level: 'Intermediate', type: 'write', instr: '어법상 틀린 부분을 찾아 바르게 고쳐 쓰시오.', items: [
      { q: 'Furthermore, as the difference of the two prices become bigger, the effect will be more powerful.', a: 'become → becomes', why: '본문 — 주어 the difference' },
      { q: 'The situation described above are an example of the “anchoring effect.”', a: 'are → is', why: '본문 — 주어 the situation' },
      { q: 'The price mentioned first affect our opinion of prices mentioned afterwards.', a: 'affect → affects', why: '본문 — 주어 the price' },
      { q: 'A bandwagon is a wagon in a parade that encourage people to jump aboard.', a: 'encourage → encourages', why: '본문 — 선행사 a wagon' },
      { q: 'So, she buys new pants that goes perfectly with her new coat.', a: 'goes → go', why: '본문 — 선행사 pants' },
      { q: 'The price mentioned first acts as an “anchor” that fix our thoughts.', a: 'fix → fixes', why: '본문 — 선행사 an anchor' },
      { q: 'In this way, people tend to buy something just because other people has bought it.', a: 'has → have', why: '본문 · 기출 99 변형 — other people(복수)' },
      { q: 'Lisa buys a coat that she really love.', a: 'love → loves', why: '본문 — 관계절의 주어 she' },
      { q: 'There is many reasons why we buy things we don’t need.', a: 'is → are', why: '본문 응용 — there + 복수명사' },
      { q: 'Both Jeff and Lisa buys things without seriously considering why.', a: 'buys → buy', why: '본문 응용 — both A and B → 복수' }] },
    { level: 'Advanced · 모두 고르기', type: 'multi', free: true, instr: '해당하는 것을 모두 골라 기호를 쓰시오.', items: [
      { q: '다음 중 어법상 옳은 문장을 모두 고르시오.', box: [
        '(a) As the difference of the two prices become bigger, the effect will be more powerful.', '(b) The price mentioned first affects our opinion of prices.',
        '(c) She buys new pants that goes perfectly with her new coat.', '(d) A bandwagon is a wagon that encourages people to jump aboard.',
        '(e) The situation described above is an example of the anchoring effect.'], a: '(b), (d), (e)', why: '(a) becomes (c) go (본문)' },
      { q: '밑줄 친 동사와 수를 일치시킨 ‘진짜 주어(선행사)’가 바르게 짝지어진 것을 모두 고르시오.', box: [
        '(a) As the difference of the two prices __becomes__ bigger → prices', '(b) a wagon in a parade that __encourages__ people → a wagon',
        '(c) new pants that __go__ perfectly with her new coat → new pants', '(d) The price mentioned first __acts__ as an anchor → an anchor',
        '(e) more than half of the boys on his soccer team __wear__ them → his soccer team'], a: '(b), (c)', why: '(a) the difference (d) the price (e) the boys' },
      { q: '다음 글(본문 변형)의 밑줄 친 ⓐ~ⓔ 중 어법상 어색한 것을 모두 골라 기호를 쓰고 바르게 고치시오.', fix: true, label: '기호 / 고친 것', box: [
        'The situation described above ⓐ __is__ an example of the “anchoring effect.” The price mentioned first ⓑ __affect__ our opinion of prices mentioned afterwards. For example, if we start with $200, then $160 will seem cheap in comparison. Furthermore, as the difference of the two prices ⓒ __become__ bigger, the effect will be more powerful. As such, the price mentioned first ⓓ __acts__ as an “anchor” that ⓔ __fixes__ our thoughts about the price of an item.'],
        a: 'ⓑ affect → affects, ⓒ become → becomes', why: 'ⓑ 주어 the price ⓒ 주어 the difference' },
      { q: '빈칸에 are가 들어갈 수 있는 것을 모두 고르시오.', box: [
        '(a) There ______ many hidden causes behind our purchases.', '(b) The difference of the two prices ______ very big.', '(c) The shoes that his friends wear ______ on display.',
        '(d) Lisa as well as her friends ______ interested in shopping.', '(e) Both Jeff and Lisa ______ good examples of the effects.'], a: '(a), (c), (e)', why: '(b) the difference → is (d) Lisa → is' },
      { q: '다음 중 우리말을 바르게 영작한 것을 모두 고르시오.', box: [
        '(a) 위에 묘사된 상황은 앵커링 효과의 한 예이다. → The situation described above is an example of the anchoring effect.',
        '(b) 그녀는 새 코트와 완벽하게 어울리는 바지를 산다. → She buys pants that goes perfectly with her new coat.',
        '(c) 밴드 왜건은 사람들이 올라타도록 부추기는 마차이다. → A bandwagon is a wagon that encourage people to jump aboard.',
        '(d) 처음에 언급된 가격이 닻 역할을 한다. → The price mentioned first acts as an anchor.',
        '(e) Jeff와 Lisa 둘 다 필요 없는 것을 산다. → Both Jeff and Lisa buy things they don’t need.'], a: '(a), (d), (e)', why: '(b) go (c) encourages' }] },
    { level: 'Advanced · 객관식', type: 'mcq', free: true, instr: '알맞은 답을 고르시오.', items: [
      { q: '다음 글의 밑줄 친 ⓐ~ⓔ 중 어법상 어색한 것은?', box: [
        'A bandwagon is a wagon in a parade that ⓐ __encourages__ people to jump aboard. As more and more people ⓑ __gets__ on the bandwagon, others ⓒ __are__ more likely to get on or follow it. In this way, people ⓓ __tend__ to buy something just because other people ⓔ __have__ bought it.'],
        opts: ['ⓐ', 'ⓑ', 'ⓒ', 'ⓓ', 'ⓔ'], a: '②', why: 'ⓑ 주어 more and more people(복수) → get (본문)' },
      { q: '다음 중 어법상 어색한 것은?', opts: [
        'The situation described above is an example of the anchoring effect.', 'The price mentioned first affects our opinion of prices.', 'She buys new pants that go perfectly with her new coat.',
        'As the difference of the two prices become bigger, the effect will be more powerful.', 'The price acts as an anchor that fixes our thoughts.'], a: '④', why: '④ 주어 the difference → becomes (본문)' },
      { q: '밑줄 친 동사와 수를 일치시킨 주어(선행사)가 바르게 연결된 것은?', opts: [
        'a wagon in a parade that __encourages__ people → a wagon', 'new pants that __go__ perfectly with her new coat → her new coat', 'the difference of the two prices __becomes__ bigger → prices',
        'more than half of the boys on his soccer team __wear__ them → his soccer team', 'purchasing a new item often __leads__ to more purchases → a new item'], a: '①', why: '② new pants ③ the difference ④ the boys ⑤ 동명사구 purchasing a new item' },
      { q: '(A)~(C)에 알맞은 말이 바르게 짝지어진 것은? — (A) The situation described above (is / are) an example. (B) She buys new pants that (go / goes) with her coat. (C) Both Jeff and Lisa (buy / buys) things they don’t need.', opts: [
        'are – go – buy', 'is – goes – buys', 'are – goes – buy', 'is – go – buys', 'is – go – buy'], a: '⑤', why: '(A) the situation (B) 선행사 pants (C) both A and B → 복수' },
      { q: '다음 중 어법상 틀린 문장의 개수는?', box: [
        '(a) There is many reasons why we buy things.', '(b) The price mentioned first affects our opinion.', '(c) Lisa as well as her friends like shopping.',
        '(d) Either you or Jeff has to pay for it.', '(e) The shoes that his friends wear is on display.'], opts: ['1개', '2개', '3개', '4개', '5개'], a: '③', why: '(a) are (c) likes (e) are — 3개' }] },
    { level: '전환 · 연결', type: 'write', instr: '우리말과 같은 뜻이 되도록 괄호 안의 말을 이용하여 문장을 완성하시오. (동사의 수에 주의)', items: [
      { q: '두 가격의 차이가 커질수록, 그 효과는 더 강력해질 것이다. (as, the difference, become)', a: 'As the difference of the two prices becomes bigger, the effect will be more powerful.', why: '본문' },
      { q: '위에 묘사된 상황은 앵커링 효과의 한 예이다. (describe, be)', a: 'The situation described above is an example of the anchoring effect.', why: '본문' },
      { q: '처음 언급된 가격이 나중에 언급된 가격에 대한 우리의 의견에 영향을 준다. (mention, affect)', a: 'The price mentioned first affects our opinion of prices mentioned afterwards.', why: '본문' },
      { q: '밴드 왜건은 사람들이 올라타도록 부추기는 퍼레이드의 마차이다. (that, encourage)', a: 'A bandwagon is a wagon in a parade that encourages people to jump aboard.', why: '본문 — 선행사 a wagon' },
      { q: '그녀는 새 코트와 완벽하게 어울리는 새 바지를 산다. (that, go perfectly with)', a: 'She buys new pants that go perfectly with her new coat.', why: '본문 — 선행사 pants' },
      { q: '처음 언급된 가격은 우리의 생각을 고정하는 ‘닻’으로 작용한다. (that, fix)', a: 'The price mentioned first acts as an “anchor” that fixes our thoughts.', why: '본문 — 선행사 an anchor' },
      { q: '사람들은 단지 다른 사람들이 그것을 샀다는 이유로 무언가를 사는 경향이 있다. (just because, have bought)', a: 'People tend to buy something just because other people have bought it.', why: '본문' },
      { q: '우리의 구매에 영향을 주는 많은 것들이 있다. (there, many things, influence)', a: 'There are many things that influence our purchases.', why: '본문 응용' },
      { q: 'Jeff와 Lisa 둘 다 필요 없는 물건을 산다. (both, buy)', a: 'Both Jeff and Lisa buy things that they don’t need.', why: '본문 응용' },
      { q: 'Lisa뿐만 아니라 그녀의 친구들도 쇼핑을 좋아한다. (not only, but also, like)', a: 'Not only Lisa but also her friends like shopping.', why: '본문 응용 — B에 일치' }] },
  ], m),

  // ---------------- PERFECT CHECK ----------------
  D.section('PERFECT CHECK', '상위권 함정 체크'),
  ...D.drill(null, '', [{ level: '함정', type: 'choice', instr: '실수하기 쉬운 문장들이에요. 괄호 안에서 알맞은 것을 고르시오.', items: [
    { q: 'He recognizes the shoes because more than half of the boys on his soccer team (wear / wears) them.', a: 'wear', why: '본문 — of 뒤 the boys' },
    { q: 'Most of her money (are / is) spent on buying the new items.', a: 'is', why: '본문 — money(셀 수 없는 명사)' },
    { q: 'But she sees that none of her bags (matches / match) her new clothes.', a: 'match', why: '본문 · 워크북 — 복수' },
    { q: 'Two thirds of the world’s food (is / are) wasted.', a: 'is', why: '기출 20 — food' },
    { q: 'The number of students in our class (is / are) twenty.', a: 'is', why: '기출 19 — the number of → 단수' },
    { q: 'Each (member / members) in the group has a nickname.', a: 'member', why: '기출 23 — each + 단수명사' },
    { q: 'Purchasing a new item often (lead / leads) to more unplanned purchases.', a: 'leads', why: '본문 · 기출 110 — 동명사구 주어' },
    { q: 'As the difference of the two prices (become / becomes) bigger, the effect will be more powerful.', a: 'becomes', why: '본문 — 주어 the difference' },
    { q: '(As / If) more and more people get on the bandwagon, others are more likely to get on it.', a: 'As', why: '본문 — 접속사 as ‘~할수록’ (같은 과 문법)' },
    { q: '(Because of / As) he is young, he can’t drive yet.', a: 'As', why: '기출 9 — 접속사 as ‘~ 때문에’ + 절 (같은 과 문법)' }] }], m),

  // ---------------- WRITE ----------------
  D.section('WRITE', '서술형 대비'),
  ...D.writeItem(1, 'Basic', '괄호 안의 단어를 알맞은 형태로 바꾸어 쓰시오.', ['Most of her money (be) spent on buying the new items to complete her new look. (본문)'], { a: 'is', why: 'her money(셀 수 없는 명사) → 단수 · 현재' }, m),
  ...D.writeItem(2, 'Basic', '빈칸에 알맞은 말을 쓰시오. (wear를 알맞은 형태로)', ['He recognizes the shoes at a glance because more than half of the boys on his soccer team ______ them. (본문)'], { a: 'wear', why: 'of 뒤 the boys(복수) → 복수동사' }, m),
  ...D.writeItem(3, 'Intermediate', '다음 문장에서 어법상 어색한 부분을 찾아 바르게 고쳐 쓰시오. [기출 27]', ['Most of the time be spent on the bus during the last trip.'],
    { a: 'be → was', why: 'time(셀 수 없는 명사) → 단수 · last trip → 과거' }, m),
  ...D.writeItem(4, 'Intermediate', '도표를 보고, 괄호 안의 동사를 알맞은 형태로 바꾸어 문장을 완성하시오. [기출 29]', ['<도표> 물 50% — 미국에서 동물을 기르는 데 사용됨', 'About half of the water ______ (use) to raise animals in the U.S.'],
    { a: 'is used', why: 'the water(셀 수 없는 명사) → 단수 · 수동태' }, m),
  ...D.writeItem(5, 'Intermediate', '도표를 보고, 빈칸에 알맞은 말을 쓰시오. (괄호 안의 동사는 알맞은 형태로) [기출 29]', ['<도표> 세계 식량 1/3 — 매년 13억 톤이 낭비됨', '______ ______ of the world’s food ______ (waste) — 1.3 billion tons every year.'],
    { a: 'One third, is wasted', why: '분수 one third / the world’s food(셀 수 없는 명사) → 단수 · 수동태' }, m),
  ...D.writeItem(6, 'Intermediate', '도표를 보고, 빈칸에 알맞은 말을 쓰시오. (괄호 안의 동사는 알맞은 형태로) [기출 29]', ['<도표> 소말리아 아이들 10% — 학교에 다님', 'In Somalia, only ten ______ of the children ______ (go) to school.'],
    { a: 'percent, go', why: 'percent는 복수형 ✗ / the children(복수) → go' }, m),
  ...D.writeItem(7, 'Advanced', '우리말과 같은 뜻이 되도록 <조건>에 맞게 영작하시오.', ['디드로 효과는 새로운 물품을 구입하는 것이 흔히 계획에 없던 더 많은 구매로 이어진다는 개념이다.', '<조건> The Diderot effect로 시작할 것 · that, purchase, lead를 사용하되 필요시 형태를 바꿀 것 · 총 17단어'],
    { a: 'The Diderot effect is the concept that purchasing a new item often leads to more unplanned purchases.', why: '본문 · 기출 102 — 동명사구 주어 → leads · 17단어' }, m),
  ...D.writeItem(8, 'Advanced', '<보기>의 단어를 배열하여 문장을 완성하시오. (필요하면 형태를 바꿀 것)', ['그녀는 자신의 가방 중 어느 것도 새 옷과 어울리지 않는다는 것을 알게 된다.', '<보기> she / sees / that / none / of / her bags / matches / her new clothes'],
    { a: 'She sees that none of her bags match her new clothes.', why: 'matches → match (본문 · 워크북: none of + 복수명사 → 복수동사)' }, m),
  ...D.writeItem(9, 'Advanced', '어법상 틀린 부분 2개를 찾아 바르게 고치고, 그 이유를 쓰시오.', ['Jeff recognizes the shoes because more than half of the boys on his soccer team wears them. A bandwagon is a wagon in a parade that encourage people to jump aboard.'],
    { a: '① wears → wear  ② encourage → encourages', why: '① half of 뒤 복수명사 the boys에 일치 ② 주격 관계대명사절의 동사는 선행사 a wagon(단수)에 일치', blanks: ['고친 것', '이유'] }, m),
  ...D.writeItem(10, 'Advanced', '어법상 틀린 부분 2개를 찾아 바르게 고치고, 그 이유를 쓰시오.', ['The number of students who buy things on sale are growing. A number of them buys things just because other people have bought them.'],
    { a: '① are → is  ② buys → buy', why: '① the number of는 number(수)가 주어 → 단수 ② a number of(= many) → 복수', blanks: ['고친 것', '이유'] }, m),

  // ---------------- MAP ----------------
  D.section('MAP', "DAVID'S MAP — 백지노트 테스트"),
  D.P([D.T('오늘 배운 내용을 떠올리며 빈칸을 채워 보세요. 책을 보지 않고!', { size: 18, color: '595959' })], { spacing: { after: 120 }, keepNext: true }),
  ...D.image(path.join(__dirname, 'map_G-수의일치.png'), 620),
  ...D.table(['자가 체크 — 백지노트에 이 단어들이 들어갔나요?', '✔'], [
    ['수의 일치 = 주어의 수(단수 · 복수)에 동사를 맞춘다', ''], ['부분 표현(half · most · all · some · 분수 · percent · the rest) of + 명사 → of 뒤 명사에 일치', ''],
    ['셀 수 없는 명사(money · water · food · garbage · time) → 단수', ''], ['none of + 복수명사 → 본문대로 복수(match)', ''],
    ['each · every + 단수명사 → 단수 / one of · each of + 복수명사 → 단수', ''], ['the number of → 단수 / a number of (= many) → 복수', ''],
    ['동명사 · to부정사 · 명사절 주어 → 단수 (purchasing a new item often leads)', ''], ['수식어구(전치사구 · 분사구)는 괄호 → 진짜 주어에 일치 (the difference … becomes)', ''],
    ['주격 관계대명사절 동사 → 선행사에 일치 (a wagon that encourages / pants that go)', ''],
    ['본문: More than half of the boys on his soccer team wear them. / Most of her money is spent ~', '']], [8838, 800], m),
  ...D.memo(['다음 시간 도입: 본문 수일치 문장 6개(wear · is spent · match · leads · becomes · encourages)를 동사만 빈칸으로 두고 1분 퀴즈',
    '약한 반: Point 1(of 뒤 명사 · 셀 수 없는 명사) 확실히 → Point 2는 the number of / a number of 구별만 → Point 3은 본문 3문장(becomes · encourages · go)만 집중',
    '같은 과 접속사 as와 섞은 본문 기출(81 · 99번) 다시 풀기 — 한 지문에 as ‘~할수록’과 수일치(wears ✗)가 함께 나온다.', 'none of + 복수명사의 단수 · 복수는 교재와 기출 처리가 다르니, 질문이 나오면 ‘둘 다 쓰이지만 우리 시험은 본문대로 복수’로 정리'], m),
];
D.render(meta, build, process.argv[2] || '.').then(fs_ => {
  const out = fs_.map(f => { const g = path.join(path.dirname(f), path.basename(f).replace('수의 일치', '수의일치')); fs.renameSync(f, g); return g; });
  console.log(out.join('\n'));
});
