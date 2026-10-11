const D = require('./david_base');
const path = require('path');
const fs = require('fs');
const COVER = JSON.parse(process.env.COVER || '{}');
const meta = { series: D.SERIES.G, code: 'G-5형식to부정사', title: '5형식 + to부정사', category: 'G. 문장의 형식  |  동사 + 목적어 + to부정사 (목적격 보어)',
  rightText: 'G  5형식 + to부정사', prefix: process.env.PREFIX || '', cover: COVER.title ? COVER : undefined,
  question: 'Corky ~~wanted to be~~ a general. / The king ~~ordered him to go~~ to a military school. — 둘 다 to부정사인데, 왜 하나는 동사 바로 뒤에, 하나는 him 뒤에 올까?' };

const build = (m) => [
  D.section('FLOW', 'Teaching Flow — 처음 배우는 사람도 따라오는 5단계'),
  ...D.step(1, '우리말로 먼저 생각하기 — ‘가는 사람이 누구야?’', [
    '‘나는 가고 싶다.’ → 가는 사람 = {{나(주어)}} / ‘나는 네가 가기를 원한다.’ → 가는 사람 = {{너(목적어)}}',
    '우리말은 ‘네가 ~하기를’ 한마디로 끝. 영어는 동사 뒤에 행동하는 사람(목적어)을 먼저 놓고, 그 뒤에 to부정사를 붙인다.'], m),
  ...D.step(2, '이전 단원 복습 — to부정사를 목적어로 쓰는 동사 (3형식)', [
    'He wanted {{to be}} a general. (본문) — want + to부정사: 주어 자신이 하고 싶은 일',
    'want · hope · decide · plan · learn + to부정사 → 행동하는 사람 = 문장의 {{주어}}'], m),
  ...D.step(3, '문제 제기 — 행동하는 사람이 주어가 아니라면?', [
    '왕이 명령한 것은 ‘왕이 가는 것’이 아니라 ‘**Corky가** 가는 것’.',
    'The king ordered ~ go to a famous military school. — Corky를 어디에, go를 어떤 모양으로 써야 할까?'], m),
  ...D.step(4, '규칙 발견 — 동사 + 목적어 + to부정사', [
    'He ordered **Corky** {{to go}} to a famous military school. (본문) / The teacher told **Corky** {{to stand}} against a pole. (본문)',
    'Corky(목적어) = 행동하는 사람 / to go(목적격 보어) = 목적어가 할 행동 → ‘목적어가 ~하도록 …하다’'], m),
  ...D.step(5, '결론 🔑', [
    '5형식 = 주어 + 동사 + 목적어 + {{to부정사}}(목적격 보어) / want · ask · tell · order · allow · expect · advise · encourage · force / 부정은 {{not to}} + 동사원형 / 사역동사(make · have · let) · 지각동사(see · hear) 뒤는 {{동사원형}}'], m),
  ...D.infoBox('오늘의 핵심 3문장', [
    '① The king ordered him {{to go}} to a famous military school. (교과서 Grammar)',
    '② Then, the teacher told Corky {{to stand}} against a pole. (본문)',
    '③ Finally, the people let him {{go}}. (본문 — 사역동사 let은 동사원형)'], m),
  ...D.tip(['STEP 1에서 “가는 사람이 누구야?”를 두 번 물어 주어/목적어를 손으로 가리키게 한다. 답이 목적어가 되는 순간 5형식이 시작된다.',
    '같은 과 문법 부정대명사(Some ~, others …)와 함께 출제되므로 PERFECT CHECK에 부정대명사 2문항을 섞어 두었다. 본문에 사역(let him go) · 지각(saw him approach)이 함께 나오므로 Point 3 대비는 반드시 한다.'], m),

  // ---------------- Point 1 ----------------
  D.section('Point 1', '동사 + 목적어 + to부정사 — 형태 · 의미 · 대표 동사', 'point'),
  ...D.table(['동사', '의미 (목적어 = 행동하는 사람)', '예'], [
    ['want', 'O가 ~하기를 원하다', 'The boy wanted the girl **to feed** the ducks. (교과서)'],
    ['ask', 'O에게 ~해 달라고 요청(부탁)하다', 'The girl asked the boy **to help** her. (교과서)'],
    ['tell', 'O에게 ~하라고 말하다', 'Then, the teacher told Corky **to stand** against a pole. (본문)'],
    ['order', 'O에게 ~하라고 명령하다', 'He ordered Corky **to go** to a famous military school. (본문)'],
    ['allow', 'O가 ~하도록 허락하다', 'The man allowed the boy **to enter** the grass. (교과서)'],
    ['expect', 'O가 ~할 것을 기대(예상)하다', 'I didn’t expect him **to become** a writer.'],
    ['advise', 'O에게 ~하라고 충고(조언)하다', 'He advised me **to drink** enough water. (기출)'],
    ['encourage', 'O가 ~하도록 격려하다', 'My teacher encouraged me **to try** again. (교과서 Grammar✚)'],
    ['force', 'O가 ~하도록 강요하다', 'His father forces him **to go** to music lessons.'],
    ['그 밖에', 'persuade 설득하다 · warn 경고하다 · get 시키다 · enable 가능하게 하다 · cause 야기하다 · beg 간청하다 · invite 초대하다 · remind 상기시키다 · require 요구하다 · urge 촉구하다', 'Mike persuaded me **to join** his art club.']], [1500, 3500, 4638], m),
  ...D.infoBox('5형식 문장 읽기 — 목적어가 하는 행동', [
    '주어 + 동사 + 목적어(행동하는 사람) + to부정사(목적어가 할 행동) — He ordered **Corky** **to go**. → 가는 사람은 Corky',
    '목적어 자리 대명사는 {{목적격}}: ordered **him** (he ✗) / asked **me** (I ✗) / 동사 바로 뒤 — advised to me ✗',
    'want + to-v (3형식, 주어가 함) vs want + O + to-v (5형식, {{목적어}}가 함) — He wanted to be a general. / The king wanted him to be a general.'], m),
  ...D.trick('원부말명, 허기충격강!', ['“원하고 부탁하고 말하고 명령하고 — 허락 · 기대 · 충고 · 격려 · 강요!”', '“want · ask · tell · order / allow · expect · advise · encourage · force — 전부 투(to) 들고 와!”']),
  ...D.examPoint([
    { q: 'He ordered Corky {{to go}} to a famous military school. (going ✗)', why: 'order + 목적어 + to부정사 (본문 기출)' },
    { q: 'My mom told me {{to do}} my homework first. (do ✗ / doing ✗)', why: 'tell + 목적어 + to부정사 (기출)' }], m),
  ...D.caution(['to부정사 자리에 동사원형 · -ing · to + -ing를 넣은 선지(told me eat · allowed them visiting · expect her to coming)가 가장 흔한 오답이다. (기출)',
    '본문 배열 · 영작: He ordered Corky to go … — 목적어와 to부정사의 순서를 바꾼 선지(ordered to go Corky ✗)가 본문 변형으로 나온다. (기출)',
    '목적어 자리에 주격(I · he · she · we)을 넣은 선지, want that절 선지가 서술형 감점 1순위다.'], m),
  ...D.drill(1, '동사 + 목적어 + to부정사 — 형태와 의미', [
    { level: 'Basic ①', type: 'choice', instr: '괄호 안에서 알맞은 것을 고르시오.', items: [
      { q: 'He ordered Corky (to go / go) to a famous military school.', a: 'to go', why: 'order + O + to부정사 (본문)' },
      { q: 'Then, the teacher told Corky (stand / to stand) against a pole.', a: 'to stand', why: 'tell + O + to부정사 (본문)' },
      { q: 'The girl asked the boy (helping / to help) her.', a: 'to help', why: 'ask + O + to부정사 (교과서)' },
      { q: 'The man allowed the boy (to enter / enter) the grass.', a: 'to enter', why: 'allow + O + to부정사 (교과서)' },
      { q: 'I want (you / your) to read this article carefully.', a: 'you', why: '목적어 자리 → 목적격 (교과서 Grammar✚)' },
      { q: 'My teacher encouraged me (trying / to try) again.', a: 'to try', why: 'encourage + O + to부정사 (교과서 Grammar✚)' },
      { q: 'The coach expected (we / us) to win the game.', a: 'us', why: '목적어 자리 → 목적격' },
      { q: 'His wife asked him (buy / to buy) a new car.', a: 'to buy', why: 'ask + O + to부정사 (교과서 Grammar✚)' },
      { q: 'The doctor advised (me / for me) to drink enough water.', a: 'me', why: 'advise + O — 목적어 앞 전치사 ✗' },
      { q: 'Bad weather forced the players (to stop / stopping) the game.', a: 'to stop', why: 'force + O + to부정사' }] },
    { level: 'Basic ②', type: 'fill', instr: '<보기>에서 알맞은 말을 골라 빈칸에 쓰시오. (한 번씩만 사용)',
      bogi: ['expected', 'feed', 'to', 'careful', 'asked', 'him', 'stand', 'allowed', 'enter', 'go'], items: [
      { q: 'He ordered Corky to [[go]] to a famous military school.', why: '본문 — to + 동사원형' },
      { q: 'Then, the teacher told Corky to [[stand]] against a pole.', why: '본문 — tell + O + to부정사' },
      { q: 'The woman told the boy to be [[careful]].', why: '교과서 — to be + 형용사' },
      { q: 'The man allowed the boy to [[enter]] the grass.', why: '교과서 — allow + O + to부정사' },
      { q: 'The boy wanted the girl to [[feed]] the ducks.', why: '교과서 — want + O + to부정사' },
      { q: 'The king ordered [[him]] to go to a famous military school.', why: '교과서 Grammar — 목적어 자리 목적격' },
      { q: 'Nobody [[expected]] the little team to win, but they did!', why: '기대(예상)하지 않았는데 이겼다 → expect' },
      { q: 'Mom [[allowed]] me to use her phone. She said, “Sure, go ahead.”', why: '“Sure, go ahead.” → 허락 allow' },
      { q: '“Can you lend me your notebook?” — Sumi [[asked]] me to lend her my notebook.', why: '부탁 → ask' },
      { q: 'The teacher told us not [[to]] run in the hallway.', why: '부정 not + to부정사' }] },
    { level: 'Intermediate', type: 'write', instr: '어법상 틀린 부분을 찾아 바르게 고쳐 쓰시오.', items: [
      { q: 'He ordered Corky going to a famous military school.', a: 'going → to go', why: '본문 기출 — order + O + to부정사' },
      { q: 'The police officer told him stop.', a: 'stop → to stop', why: 'tell + O + to부정사' },
      { q: 'They don’t allow people smoking in this hotel.', a: 'smoking → to smoke', why: 'allow + O + to부정사' },
      { q: 'She expected him attend the meeting.', a: 'attend → to attend', why: '기출 — expect + O + to부정사' },
      { q: 'I want she to be a teacher.', a: 'she → her', why: '목적어 자리 → 목적격' },
      { q: 'They expect her to coming to the party.', a: 'to coming → to come', why: 'to + 동사원형' },
      { q: 'Mike wanted me playing soccer after school.', a: 'playing → to play', why: 'want + O + to부정사' },
      { q: 'His dad encouraged him drinking milk.', a: 'drinking → to drink', why: 'encourage + O + to부정사' },
      { q: 'The doctor advised me exercise regularly.', a: 'exercise → to exercise', why: 'advise + O + to부정사' },
      { q: 'My parents want that I study harder.', a: 'want that I study → want me to study', why: 'want는 that절 ✗ → 목적어 + to부정사' }] },
    { level: 'Advanced · 모두 고르기', type: 'multi', free: true, instr: '해당하는 것을 모두 골라 기호를 쓰시오.', items: [
      { q: '다음 중 어법상 옳은 문장을 모두 고르시오.', box: [
        '(a) I wanted her to exercise regularly.', '(b) Technology let us to have more free time.', '(c) His mother told him to be careful.',
        '(d) She expected him attend the meeting.', '(e) The doctor advised me to take a rest.'], a: '(a), (c), (e)', why: '(b) let + 동사원형 → have (d) to attend (기출)' },
      { q: '밑줄 친 부분에 대한 설명으로 옳은 것을 모두 고르시오.', box: [
        '(a) He wanted __to be__ a general. → 동사 wanted의 목적어로 쓰인 to부정사이다.',
        '(b) You have much __to learn__. → 목적격 보어로 쓰인 to부정사이다.',
        '(c) The teacher told __Corky__ to stand against a pole. → 기둥에 기대어 서는 사람은 the teacher이다.',
        '(d) He ordered Corky __to go__ to a famous military school. → 목적어 Corky의 행동을 설명하는 목적격 보어이다.',
        '(e) The man allowed __the boy__ to enter the grass. → 잔디에 들어가는 사람은 the boy이다.'], a: '(a), (d), (e)', why: '(b) 명사 much를 꾸미는 형용사적 용법 (c) 서는 사람은 목적어 Corky (본문)' },
      { q: '빈칸에 들어갈 수 있는 동사를 모두 고르시오. — The doctor ______ me to take a rest.', box: [
        '(a) made     (b) advised     (c) had     (d) told     (e) let'], a: '(b), (d)', why: '(a)(c)(e) 사역동사 → 동사원형 take (기출 변형)' },
      { q: '다음 글(본문 변형)의 밑줄 친 ⓐ~ⓔ 중 어법상 어색한 것을 모두 골라 기호를 쓰고 바르게 고치시오.', fix: true, label: '기호 / 고친 것', box: [
        'Corky was a brave young man. He wanted ⓐ __to be__ a general, but the king said, “You’re the strongest man in my army, but you have much ⓑ __to learn__.” He ordered Corky ⓒ __going__ to a famous military school. … Then, the teacher told Corky ⓓ __stand__ against a pole. Suddenly, he tied Corky ⓔ __to__ the pole.'],
        a: 'ⓒ going → to go, ⓓ stand → to stand', why: 'order · tell + 목적어 + to부정사 / ⓔ tie A to B (전치사 to)' },
      { q: '밑줄 친 to부정사가 목적격 보어로 쓰인 것을 모두 고르시오.', box: [
        '(a) The woman told the boy __to be__ careful.', '(b) His wife asked him __to buy__ a new car.', '(c) “I need __to try__ another way,” he thought.',
        '(d) I want you __to read__ this article carefully.', '(e) Everyone wants __to stand__ on the side of peace.'], a: '(a), (b), (d)', why: '(c)(e) 동사의 목적어 (3형식) — 행동하는 사람 = 주어' }] },
    { level: 'Advanced · 객관식', type: 'mcq', free: true, instr: '알맞은 답을 고르시오.', items: [
      { q: '다음 빈칸에 들어갈 말로 알맞은 것은? — My mom told me ______ my homework first.', opts: [
        'do', 'doing', 'to do', 'done', 'to doing'], a: '③', why: 'tell + O + to부정사 (기출)' },
      { q: '다음 중 어법상 알맞지 않은 것은?', opts: [
        'I wanted her to exercise regularly.', 'She asked me to give her a hand.', 'His mother told him to be careful.',
        'The teacher told her not to talk with her friends.', 'Technology let us to have more free time.'], a: '⑤', why: '⑤ 사역동사 let + 동사원형 have (기출)' },
      { q: '괄호 안의 말을 배열할 때 알맞은 것은? (필요하면 한 단어를 추가할 것) — (Corky / he / go / to a famous military school / ordered)', opts: [
        'He ordered Corky to go to a famous military school.', 'He ordered to go Corky to a famous military school.', 'He ordered Corky go to a famous military school.',
        'Corky ordered him to go to a famous military school.', 'He ordered Corky going to a famous military school.'], a: '①', why: 'order + 목적어 + to부정사 (본문 기출 서술형)' },
      { q: '다음 문장을 바꿔 쓸 때 빈칸에 들어갈 말로 바르게 짝지어진 것은? — The king said to Corky, “Go to a famous military school.” → The king ______ Corky ______ to a famous military school.', opts: [
        'told – go', 'kept – from going', 'asked – gone', 'ordered – to go', 'ordered – going'], a: '④', why: '명령 → order + O + to부정사 (기출 변형)' },
      { q: '다음 중 밑줄 친 to부정사의 쓰임이 나머지 넷과 다른 것은?', opts: [
        'The king ordered him __to go__ to school.', 'Corky began __to speak__ softly.', 'The man allowed the boy __to enter__ the grass.',
        'I want you __to read__ this article.', 'My teacher encouraged me __to try__ again.'], a: '②', why: '② 동사 began의 목적어 / 나머지 목적격 보어' }] },
    { level: '전환 · 연결', type: 'write', instr: '괄호 안의 동사를 사용하여 두 문장을 ‘목적어 + to부정사’가 들어간 한 문장으로 연결하시오.', items: [
      { q: 'The king gave an order. Corky had to go to a famous military school. (order)', a: 'The king ordered Corky to go to a famous military school.', why: '본문' },
      { q: 'The teacher said something to Corky. Corky had to stand against a pole. (tell)', a: 'The teacher told Corky to stand against a pole.', why: '본문' },
      { q: 'The girl needed help. She asked the boy for it. (ask)', a: 'The girl asked the boy to help her.', why: '교과서' },
      { q: 'The girl fed the ducks. The boy wanted that. (want)', a: 'The boy wanted the girl to feed the ducks.', why: '교과서 — 행동하는 사람 the girl이 목적어' },
      { q: 'The man said yes. The boy could enter the grass. (allow)', a: 'The man allowed the boy to enter the grass.', why: '교과서 · 기출 서술형' },
      { q: 'I will pass the test. My parents expect that. (expect)', a: 'My parents expect me to pass the test.', why: '목적어 자리 목적격 me' },
      { q: '“Try again!” My teacher said this to me warmly. (encourage)', a: 'My teacher encouraged me to try again.', why: '교과서 Grammar✚' },
      { q: '“Drink enough water.” The doctor gave me this advice. (advise)', a: 'The doctor advised me to drink enough water.', why: '기출 서술형' },
      { q: 'Jake didn’t want to sing on stage. But his friends made him do it. (force)', a: 'His friends forced Jake to sing on stage.', why: 'force + O + to부정사' },
      { q: 'You should be honest with me. I want that. (want)', a: 'I want you to be honest with me.', why: 'want that절 ✗ → want + O + to부정사' }] },
  ], m),

  // ---------------- Point 2 ----------------
  D.section('Point 2', '부정 not to · 명령문/that절 → 5형식 전환 (tell · ask · advise · allow · order)', 'point'),
  ...D.table(['구분', '설명', '예'], [
    ['부정형', 'not(never) + to부정사 — not은 to 바로 앞', 'She advised me **not to sell** my house. (not sell ✗)'],
    ['동사 부정 vs to부정사 부정', '무엇을 부정하느냐에 따라 뜻이 달라진다', 'He **didn’t tell** me to go. (가라고 말하지 않았다) / He told me **not to go**. (가지 말라고 말했다)'],
    ['명령문 → tell', '듣는 사람을 목적어로, 동사원형 앞에 to', 'Jane said to Paul, “Be quiet!” → Jane told Paul **to be** quiet.'],
    ['부정 명령문 → tell … not to', 'Don’t ~ → not to ~', 'Tom said to Yuri, “Don’t be late!” → Tom told Yuri **not to be** late.'],
    ['부탁(Please · Can you ~?) → ask', '부탁 · 요청은 ask', 'Judy said to Mark, “Please close the window.” → Judy asked Mark **to close** the window.'],
    ['충고(You should ~) → advise', '충고 · 조언은 advise', 'Jenny said to Paul, “You should exercise.” → Jenny advised Paul **to exercise**.'],
    ['허락(You can ~) → allow', '허락은 allow', 'Judy said to Ann, “You can use my camera.” → Judy allowed Ann **to use** her camera.'],
    ['that절 → 5형식', 'tell + O + that + S + should V = tell + O + to-v', 'I told her that she should arrive on time. = I told her **to arrive** on time. (기출)']], [2400, 2900, 4338], m),
  ...D.infoBox('명령문 전환 3단계', [
    '① 전달 동사 고르기: 명령 tell · order / 부탁 {{ask}} / 충고 advise / 허락 allow',
    '② 듣는 사람을 목적어로 (told **to** Paul ✗ → told Paul) · 인칭 바꾸기 (your → his · her)',
    '③ 동사원형 앞에 to, Don’t ~ → {{not to}} ~ / want · tell 뒤에 that절을 쓰면 should를 살린다 — I told her that she {{should}} arrive.'], m),
  ...D.trick('돈트 보면 낫투!', ['“Don’t 보이면 not to로 변신 — 돈트 보면 낫투!”', '“not은 to 앞 지정석 — not to 한 몸!”']),
  ...D.examPoint([
    { q: 'He told his son {{not to play}} outside before finishing his homework.', why: 'tell + O + not to부정사 (기출 서술형)' },
    { q: 'I told her that she should arrive on time. → I told her {{to arrive}} on time.', why: 'that절 → 목적어 + to부정사 (기출)' }], m),
  ...D.caution(['부정어 위치 — not go · don’t go · to go not 선지는 모두 오답, not to go만 정답으로 처리한다(내신 기준).',
    'He didn’t tell me to go ≠ He told me not to go — 부정 위치에 따른 우리말 뜻 고르기 문항이 나온다.',
    '명령문 전환에서 told to Paul(전치사 ✗) · 인칭(my → his/her) · 전달 동사(ask/tell/advise)를 한꺼번에 묻는다. (교과서 · 기출 서술형)'], m),
  ...D.drill(2, '부정 not to · 5형식 전환', [
    { level: 'Basic ①', type: 'choice', instr: '괄호 안에서 알맞은 것을 고르시오.', items: [
      { q: 'She advised me (not sell / not to sell) my house.', a: 'not to sell', why: '부정 not + to부정사' },
      { q: 'Mom told me (not to / to) touch the hot pan. It’s dangerous!', a: 'not to', why: '위험하니 만지지 말라 → not to' },
      { q: '“Don’t run in the hallway.” → The teacher told us (not to run / to run) in the hallway.', a: 'not to run', why: 'Don’t ~ → not to ~' },
      { q: '“Can you show me the way?” → He (told / asked) her to show him the way.', a: 'asked', why: '부탁 → ask' },
      { q: '“Please don’t shout.” → She asked him (don’t shout / not to shout).', a: 'not to shout', why: '부정 부탁 → ask + O + not to' },
      { q: 'I told her that she (should / to) arrive on time.', a: 'should', why: 'that절 → 주어 + (should) 동사' },
      { q: 'I told her (to arrive / arrive) on time.', a: 'to arrive', why: 'tell + O + to부정사 (기출)' },
      { q: 'My parents want (that I study / me to study) harder.', a: 'me to study', why: 'want는 that절 ✗' },
      { q: 'Jenny said to Paul, “You should exercise.” → Jenny (allowed / advised) Paul to exercise.', a: 'advised', why: 'You should ~ → 충고 advise' },
      { q: 'Judy said, “You can use my camera.” → Judy (allowed / forced) Ann to use her camera.', a: 'allowed', why: 'You can ~ → 허락 allow' }] },
    { level: 'Basic ②', type: 'fill', instr: '<보기>에서 알맞은 말을 골라 빈칸에 쓰시오. (한 번씩만 사용)',
      bogi: ['his', 'advised', 'should', 'be', 'told', 'her', 'not', 'allowed', 'to', 'asked'], items: [
      { q: 'Tom said to Yuri, “Don’t be late!” → Tom told Yuri not to [[be]] late.', why: '부정 명령문 → not to be' },
      { q: 'Mom said to Judy, “Don’t turn on the TV.” → Mom told Judy [[not]] to turn on the TV.', why: 'Don’t → not to' },
      { q: 'Judy said to Mark, “Please close the window.” → Judy [[asked]] Mark to close the window.', why: 'Please → 부탁 ask' },
      { q: 'Jenny said to Paul, “You should exercise every morning.” → Jenny [[advised]] Paul to exercise every morning.', why: 'You should → 충고 advise' },
      { q: 'The woman said to the girl, “You can have some cake.” → The woman [[allowed]] the girl to have some cake.', why: 'You can → 허락 allow' },
      { q: 'Jane said to Paul, “Be quiet!” → Jane [[told]] Paul to be quiet.', why: '명령문 → tell' },
      { q: 'Jenny said to John, “Don’t forget to bring your camera.” → Jenny asked John not to forget to bring [[his]] camera.', why: 'your → his (John)' },
      { q: 'Ms. Kim said to Julie, “Can you tell me the answer?” → Ms. Kim asked Julie to tell [[her]] the answer.', why: 'me → her (Ms. Kim)' },
      { q: 'I told her that she [[should]] arrive on time.', why: 'that절 — should + 동사원형 (기출)' },
      { q: 'He told his son not [[to]] play outside before finishing his homework.', why: '기출 서술형 — not to' }] },
    { level: 'Intermediate', type: 'write', instr: '어법상 틀린 부분을 찾아 바르게 고쳐 쓰시오.', items: [
      { q: 'He ordered the soldiers not go out of the room.', a: 'not go → not to go', why: 'order + O + not to부정사' },
      { q: 'I order you not leave the room.', a: 'not leave → not to leave', why: 'not + to부정사' },
      { q: 'The doctor told me not eating too much salt.', a: 'not eating → not to eat', why: 'tell + O + not to부정사' },
      { q: 'She asked me don’t come in.', a: 'don’t come → not to come', why: 'Don’t ~ → not to ~' },
      { q: 'My parents want that I become a doctor.', a: 'want that I become → want me to become', why: 'want는 that절 ✗' },
      { q: 'Mom said to me, “Clean your room.” → Mom told me clean my room.', a: 'clean → to clean', why: '명령문 → tell + O + to부정사' },
      { q: 'Jane said to Paul, “Be quiet!” → Jane told to Paul to be quiet.', a: 'told to Paul → told Paul', why: 'tell 뒤 목적어 바로 — 전치사 ✗' },
      { q: 'Tom said to Yuri, “Don’t be late!” → Tom told Yuri not to late.', a: 'not to late → not to be late', why: 'late는 형용사 → be 필요' },
      { q: 'Jenny said to John, “Bring your camera.” → Jenny told John to bring my camera.', a: 'my → his', why: '인칭 바꾸기 your → his' },
      { q: 'I told her that she arrive on time.', a: 'arrive → should arrive', why: 'that절 — should + 동사원형 (기출)' }] },
    { level: 'Advanced · 모두 고르기', type: 'multi', free: true, instr: '해당하는 것을 모두 골라 기호를 쓰시오.', items: [
      { q: '밑줄 친 부분의 우리말 뜻을 바르게 설명한 것을 모두 고르시오.', box: [
        '(a) He told me __not to go__ out. → 나가지 말라고 말했다.',
        '(b) He __didn’t tell__ me to go out. → 나가라고 말하지 않았다.',
        '(c) She asked me __not to shout__. → 소리치라고 부탁하지 않았다.',
        '(d) The doctor advised him __not to smoke__. → 담배를 피우지 말라고 충고했다.',
        '(e) Mom __didn’t allow__ me to go out. → 나가지 말라고 허락했다.'], a: '(a), (b), (d)', why: '(c) 소리치지 말라고 부탁했다 (e) 나가는 것을 허락하지 않았다' },
      { q: '직접화법을 5형식으로 바르게 바꾼 것을 모두 고르시오.', box: [
        '(a) Jane said to Paul, “Be quiet!” → Jane told Paul being quiet.',
        '(b) Tom said to Yuri, “Don’t be late!” → Tom told Yuri not to be late.',
        '(c) Mom said to Judy, “Don’t turn on the TV.” → Mom told Judy not to turn on the TV.',
        '(d) Judy said to Mark, “Please close the window.” → Judy asked Mark close the window.',
        '(e) Jenny said to Paul, “You should exercise.” → Jenny advised to Paul to exercise.'], a: '(b), (c)', why: '(a) to be (d) to close (e) advised Paul (전치사 ✗)' },
      { q: '다음 대화의 밑줄 친 ⓐ~ⓔ 중 어법상 어색한 것을 모두 골라 기호를 쓰고 바르게 고치시오.', fix: true, label: '기호 / 고친 것', box: [
        'A: What did the doctor say? — B: He advised me ⓐ __to drink__ enough water.',
        'A: Did your mom let you go to the concert? — B: No. She told me ⓑ __not go__ out at night.',
        'A: What did Ms. Kim ask you? — B: She asked me ⓒ __to help__ her carry the boxes.',
        'A: Why are you studying so hard? — B: My parents want ⓓ __that I get__ good grades.',
        'A: Did the coach say anything? — B: He encouraged us ⓔ __to try__ again.'], a: 'ⓑ not go → not to go, ⓓ that I get → me to get', why: 'ⓑ tell + O + not to부정사 ⓓ want는 that절 ✗' },
      { q: '두 문장의 의미가 같은 것을 모두 고르시오.', box: [
        '(a) She asked me to open the window. = She asked me if I opened the window.',
        '(b) He said to me, “Don’t worry.” = He told me not to worry.',
        '(c) I told her that she should arrive on time. = I told her to arrive on time.',
        '(d) Mom didn’t allow me to go out. = Mom allowed me not to go out.',
        '(e) The doctor said to me, “You should get some rest.” = The doctor advised me to get some rest.'], a: '(b), (c), (e)', why: '(a) 열어 달라고 부탁 ≠ 열었는지 물음 (d) 허락하지 않음 ≠ 안 나가도 된다고 허락' },
      { q: '다음 중 어법상 옳은 문장을 모두 고르시오.', box: [
        '(a) The teacher told us not to use our phones in class.', '(b) My parents want that I come home early.', '(c) She asked me not to tell anyone her secret.',
        '(d) Dad advised me not to stay up too late.', '(e) He told me don’t make any noise.'], a: '(a), (c), (d)', why: '(b) want me to come (e) not to make' }] },
    { level: 'Advanced · 객관식', type: 'mcq', free: true, instr: '알맞은 답을 고르시오.', items: [
      { q: '다음 문장을 같은 뜻으로 바르게 바꾼 것은? — Ms. Han said to us, “Don’t be late for class.”', opts: [
        'Ms. Han told us be not late for class.', 'Ms. Han told us not being late for class.', 'Ms. Han told to us not to be late for class.',
        'Ms. Han told us to be late for class.', 'Ms. Han told us not to be late for class.'], a: '⑤', why: 'Don’t → not to be / told us (전치사 ✗)' },
      { q: '두 문장의 뜻이 같도록 빈칸에 들어갈 말로 알맞은 것은? — I told her that she should arrive on time. = I ______ her ______ on time.', opts: [
        'told – arrive', 'told – to arrive', 'asked – arriving', 'said – to arrive', 'told – arrived'], a: '②', why: 'tell + O + to부정사 (기출)' },
      { q: '우리말을 영어로 바르게 옮긴 것은? — 그는 아들에게 숙제를 끝내기 전에 밖에서 놀지 말라고 말했다.', opts: [
        'He told his son not play outside before finishing his homework.', 'He didn’t tell his son to play outside before finishing his homework.',
        'He told his son to play not outside before finishing his homework.', 'He told his son not to play outside before finishing his homework.',
        'He told to his son not to play outside before finishing his homework.'], a: '④', why: 'tell + O + not to부정사 (기출 서술형)' },
      { q: '다음 문장을 바꿔 쓸 때 (A), (B)에 알맞은 말이 바르게 짝지어진 것은? — Sora said to me, “Can you help me?” → Sora (A) ______ me (B) ______ her.', opts: [
        'asked – to help', 'told – helping', 'asked – help', 'said – to help', 'wanted – helping'], a: '①', why: '부탁 → ask + O + to부정사 · me → her' },
      { q: '다음 중 어법상 틀린 문장의 개수는?', box: [
        '(a) She advised me not to sell my house.', '(b) My parents want that I study harder.', '(c) Mom told me not watch TV too much.',
        '(d) He asked me to close the door.', '(e) The teacher told to us to be quiet.'], opts: ['1개', '2개', '3개', '4개', '5개'], a: '③', why: '(b) want me to study (c) not to watch (e) told us — 3개' }] },
    { level: '전환 · 연결', type: 'write', instr: '괄호 안의 동사를 사용하여 ‘목적어 + to부정사’ 문장으로 바꾸어 쓰시오.', items: [
      { q: 'Jane said to Paul, “Be quiet!” (tell)', a: 'Jane told Paul to be quiet.', why: '명령문 → tell + O + to부정사 (GBU)' },
      { q: 'Tom said to Yuri, “Don’t be late!” (tell)', a: 'Tom told Yuri not to be late.', why: '부정 명령문 → not to' },
      { q: 'Mom said to Judy, “Don’t turn on the TV.” (tell)', a: 'Mom told Judy not to turn on the TV.', why: '부정 명령문 → not to' },
      { q: 'Mr. Lee said to Julie, “Can you tell me the answer, please?” (ask)', a: 'Mr. Lee asked Julie to tell him the answer.', why: '부탁 → ask · me → him' },
      { q: 'Jenny said to John, “Don’t forget to bring your camera.” (ask)', a: 'Jenny asked John not to forget to bring his camera.', why: 'not to · your → his' },
      { q: 'The woman said to the boy, “You can have some cake.” (allow)', a: 'The woman allowed the boy to have some cake.', why: '허락 → allow' },
      { q: 'Jenny said to Paul, “You should exercise every morning.” (advise)', a: 'Jenny advised Paul to exercise every morning.', why: '충고 → advise' },
      { q: 'I told her that she should arrive on time. (that절 없이)', a: 'I told her to arrive on time.', why: '기출 — that + S + should V → to부정사' },
      { q: 'The doctor told me that I should not eat too much. (that절 없이)', a: 'The doctor told me not to eat too much.', why: 'should not → not to' },
      { q: 'The captain said to the soldiers, “Don’t go out of the room.” (order)', a: 'The captain ordered the soldiers not to go out of the room.', why: '명령 → order + O + not to' }] },
  ], m),

  // ---------------- Point 3 ----------------
  D.section('Point 3', '(심화) to부정사 vs 동사원형 — 사역동사 · 지각동사 · help · get', 'point'),
  ...D.table(['동사', '목적격 보어', '예'], [
    ['want · ask · tell · order · allow · expect · advise · encourage · force · get', 'to부정사', 'He ordered Corky **to go** to a famous military school. (본문) / I’ll get my brother **to fix** my bike.'],
    ['사역동사 make · have · let', '동사원형', 'Finally, the people let him **go**. (본문) / I made him **tell** the truth.'],
    ['지각동사 see · watch · hear · feel', '동사원형 / -ing (진행 강조)', 'When the king saw him **approach**, … (본문) / He saw Corky **standing** with his 18 followers. (본문)'],
    ['help', '동사원형 · to부정사 모두 ○', 'I’ll help you **find** it. (교과서) = I’ll help you **to find** it.'],
    ['make · keep · find · leave', '형용사', 'That made the situation **worse**. (본문) / Keep your room **clean**.']], [3100, 2100, 4438], m),
  ...D.infoBox('보어 모양 3초 판단 — 동사를 먼저 본다', [
    '같은 ‘시키다’라도 make · have · let → {{동사원형}} / get → {{to부정사}}',
    'see · hear · watch · feel → 동사원형 또는 -ing (to ✗) / help → 원형 · to부정사 모두 ○',
    'let과 allow는 뜻이 같아도 모양이 다르다: let me go = allow me {{to go}}'], m),
  ...D.trick('메해렛은 원형만!', ['“메이크 · 해브 · 렛 — 원형만 렛츠고!”', '“보고 듣고 느끼면 to 빼! 겟(get)은 투(to)를 겟!”']),
  ...D.examPoint([
    { q: 'Finally, the people let him {{go}}. (to go ✗)', why: '사역동사 let + 목적어 + 동사원형 (본문 기출)' },
    { q: 'The boy saw her {{approach}}. (to approach ✗)', why: '지각동사 see + 목적어 + 동사원형 (기출)' }], m),
  ...D.caution(['사역동사 + to부정사 선지(Technology let us to have ✗ / He made his son to water ✗)가 단골 오답이다. (기출 · GBU)',
    '‘빈칸에 들어갈 수 있는 것 모두’: The doctor ____ me to take a rest. → ordered · told · advised ○ / made · had ✗ (기출)',
    'help는 원형 · to부정사 모두 정답 — help you to find를 틀린 것으로 고르는 학생이 많다. 본문 He kept (saying / to say)처럼 3형식 동명사 문항도 같이 나온다.'], m),
  ...D.drill(3, 'to부정사 vs 동사원형', [
    { level: 'Basic ①', type: 'choice', instr: '괄호 안에서 알맞은 것을 고르시오.', items: [
      { q: 'Finally, the people let him (go / to go).', a: 'go', why: '사역동사 let + 동사원형 (본문)' },
      { q: 'Technology lets us (to have / have) more free time.', a: 'have', why: 'let + 동사원형 (기출)' },
      { q: 'When the king saw him (to approach / approach), he smiled.', a: 'approach', why: '지각동사 see + 동사원형 (본문)' },
      { q: 'My guitar teacher (convinced / made) me to practice for two hours.', a: 'convinced', why: 'to부정사 → convince (make ✗)' },
      { q: 'His friends (persuaded / made) him to jump into the pool.', a: 'persuaded', why: 'to부정사 → persuade' },
      { q: 'Sometimes my father (gets / lets) me watch TV late at night.', a: 'lets', why: '동사원형 watch → let' },
      { q: 'I will (have / get) him to go camping tomorrow.', a: 'get', why: 'to부정사 → get' },
      { q: 'Calm down! I’ll help you (find / finding) it.', a: 'find', why: 'help + 동사원형 (교과서)' },
      { q: 'That made the situation (worse / more badly).', a: 'worse', why: 'make + O + 형용사 (본문)' },
      { q: 'I heard people (to shout / shout) in the cafe.', a: 'shout', why: '지각동사 hear + 동사원형' }] },
    { level: 'Basic ②', type: 'fill', instr: '<보기>에서 알맞은 말을 골라 빈칸에 쓰시오. (한 번씩만 사용)',
      bogi: ['to fix', 'worse', 'cry', 'to win', 'standing', 'tell', 'go', 'to join', 'take', 'to clean'], items: [
      { q: 'Finally, the people let him [[go]].', why: '본문 — let + 동사원형' },
      { q: 'Then, he saw Corky [[standing]] with his 18 followers.', why: '본문 — 지각동사 + -ing (진행 강조)' },
      { q: 'That made the situation [[worse]].', why: '본문 — make + O + 형용사(비교급)' },
      { q: 'Mom had me [[take]] English lessons.', why: '사역동사 have + 동사원형' },
      { q: 'Dad asked me [[to clean]] my messy room.', why: 'ask + O + to부정사' },
      { q: 'I made him [[tell]] the truth.', why: '사역동사 make + 동사원형' },
      { q: 'I got a mechanic [[to fix]] my bike.', why: 'get + O + to부정사' },
      { q: 'The sad movie made everyone [[cry]].', why: 'make + 동사원형' },
      { q: 'Mike persuaded me [[to join]] his art club.', why: 'persuade + O + to부정사' },
      { q: 'Nobody expected our team [[to win]] the final.', why: 'expect + O + to부정사' }] },
    { level: 'Intermediate', type: 'write', instr: '어법상 틀린 부분을 찾아 바르게 고쳐 쓰시오.', items: [
      { q: 'Technology let us to have more free time.', a: 'to have → have', why: '기출 — let + 동사원형' },
      { q: 'He made his son to water the plants.', a: 'to water → water', why: 'make + 동사원형' },
      { q: 'Judy saw a strange man to enter the house.', a: 'to enter → enter(entering)', why: '지각동사 see + 동사원형/-ing' },
      { q: 'He allowed me go to the movies.', a: 'go → to go', why: 'allow + O + to부정사' },
      { q: 'Finally, the people let him to go.', a: 'to go → go', why: '본문 — let + 동사원형' },
      { q: 'I will have him to fix my computer.', a: 'to fix → fix', why: 'have + 동사원형' },
      { q: 'I’ll get my brother help me with the boxes.', a: 'help → to help', why: 'get + O + to부정사' },
      { q: 'I heard someone to call my name.', a: 'to call → call(calling)', why: '지각동사 hear + 동사원형/-ing' },
      { q: 'That made the situation more worse.', a: 'more worse → worse', why: '본문 — worse 자체가 비교급' },
      { q: 'My parents let me to buy a new computer.', a: 'to buy → buy', why: 'let + 동사원형' }] },
    { level: 'Advanced · 모두 고르기', type: 'multi', free: true, instr: '해당하는 것을 모두 골라 기호를 쓰시오.', items: [
      { q: '밑줄 친 부분에 대한 설명으로 옳은 것을 모두 고르시오.', box: [
        '(a) The people let him __go__. → 사역동사 let의 목적격 보어로 동사원형이 쓰였다.',
        '(b) The king saw him __approach__. → 지각동사 see 뒤이므로 to approach로 바꿔도 된다.',
        '(c) He saw Corky __standing__ with his followers. → 진행의 의미를 강조하는 현재분사 목적격 보어이다.',
        '(d) That made the situation __worse__. → 목적격 보어로 형용사의 비교급이 쓰였다.',
        '(e) I’ll help you __find__ it. → help 뒤에는 동사원형만 올 수 있다.'], a: '(a), (c), (d)', why: '(b) 지각동사 + to ✗ (e) help는 to find도 가능 (본문)' },
      { q: '빈칸에 to가 꼭 필요한 것을 모두 고르시오.', box: [
        '(a) Mom let me ___ go to the party.', '(b) Mom had me ___ take English lessons.', '(c) The girl asked the boy ___ help her.',
        '(d) I watched him ___ cross the street.', '(e) I’ll get my sister ___ walk the dog.'], a: '(c), (e)', why: '(a)(b) 사역동사 (d) 지각동사 → 동사원형' },
      { q: '다음 글(본문 변형)의 밑줄 친 ⓐ~ⓔ 중 어법상 어색한 것을 모두 골라 기호를 쓰고 바르게 고치시오.', fix: true, label: '기호 / 고친 것', box: [
        'Then, the teacher told Corky ⓐ __to stand__ against a pole. … Corky shouted back. That made the situation ⓑ __worse__. “I need to try another way,” he thought. Then, Corky began ⓒ __to speak__ softly. He kept ⓓ __to say__ this in all possible ways. Finally, the people let him ⓔ __to go__.'],
        a: 'ⓓ to say → saying, ⓔ to go → go', why: 'ⓓ keep + -ing ⓔ 사역동사 let + 동사원형 (기출 변형)' },
      { q: '다음 중 어법상 옳은 문장을 모두 고르시오.', box: [
        '(a) My guitar teacher made me to practice every night.', '(b) His father always forces him to go to music lessons.', '(c) My teacher is going to have me take a special math class.',
        '(d) I heard the children to sing all together.', '(e) She let me use her cell phone.'], a: '(b), (c), (e)', why: '(a) make + 동사원형 practice (d) hear + sing(singing) (GBU)' },
      { q: '두 문장의 의미가 같은 것을 모두 고르시오.', box: [
        '(a) Mom let me go to the concert. = Mom allowed me to go to the concert.', '(b) I had him fix my bike. = I got him to fix my bike.',
        '(c) He made me clean the room. = He made me to clean the room.', '(d) She told me not to go. = She didn’t tell me to go.',
        '(e) I’ll help you find it. = I’ll help you to find it.'], a: '(a), (b), (e)', why: '(c) made me to clean ✗ (d) 가지 말라고 말함 ≠ 가라고 말하지 않음' }] },
    { level: 'Advanced · 객관식', type: 'mcq', free: true, instr: '알맞은 답을 고르시오.', items: [
      { q: '다음 빈칸에 들어갈 말로 알맞지 않은 것은? — The doctor ______ me to take a rest.', opts: [
        'ordered', 'told', 'advised', 'made', 'asked'], a: '④', why: '④ 사역동사 make → 동사원형 take (기출)' },
      { q: '다음 중 어법상 가장 어색한 것은?', opts: [
        'She expected him attend the meeting.', 'I want you to be a teacher.', 'He asked her to marry him.',
        'The boy saw her approach.', 'My father advised me not to go there.'], a: '①', why: '① expect + O + to attend (기출)' },
      { q: '(A)~(C)에 알맞은 말이 바르게 짝지어진 것은? — Then, the teacher told Corky (A)[stand / to stand] against a pole. … He kept (B)[to say / saying] this in all possible ways. Finally, the people let him (C)[go / to go].', opts: [
        'stand – to say – go', 'to stand – saying – to go', 'stand – saying – go', 'to stand – to say – to go', 'to stand – saying – go'], a: '⑤', why: 'tell + to부정사 / keep + -ing / let + 동사원형 (기출)' },
      { q: '밑줄 친 to부정사를 동사원형으로 바꾸어도 어법상 옳은 것은?', opts: [
        'I want you __to read__ this article.', 'The man allowed me __to enter__ the grass.', 'They helped me __to carry__ the heavy box.',
        'I asked her __to join__ us.', 'He expected me __to win__ the race.'], a: '③', why: '③ help + 동사원형/to부정사 모두 ○' },
      { q: '우리말을 영어로 바르게 옮긴 것은? — 엄마는 내가 친구들과 캠핑 가는 것을 허락하셨다.', opts: [
        'Mom let me to go camping with my friends.', 'Mom allowed me to go camping with my friends.', 'Mom allowed me go camping with my friends.',
        'Mom let me going camping with my friends.', 'Mom allowed to me go camping with my friends.'], a: '②', why: 'allow + O + to부정사 (let이면 go)' }] },
    { level: '전환 · 연결', type: 'write', instr: '괄호 안의 지시대로 같은 뜻의 문장으로 바꾸어 쓰시오.', items: [
      { q: 'Finally, the people let him go. (allow)', a: 'Finally, the people allowed him to go.', why: '본문 — let + 원형 = allow + to부정사' },
      { q: 'Mom let me use her laptop. (allow)', a: 'Mom allowed me to use her laptop.', why: 'let → allow + to부정사' },
      { q: 'I had my brother fix my bike. (get)', a: 'I got my brother to fix my bike.', why: 'have + 원형 = get + to부정사' },
      { q: 'The man allowed the boy to enter the grass. (let)', a: 'The man let the boy enter the grass.', why: '교과서 — allow → let + 동사원형' },
      { q: 'I’ll get my friend to carry the boxes. (have)', a: 'I’ll have my friend carry the boxes.', why: 'get → have + 동사원형' },
      { q: 'He forced me to tell the truth. (make)', a: 'He made me tell the truth.', why: 'force → make + 동사원형' },
      { q: 'I’ll help you to find it. (to 없이)', a: 'I’ll help you find it.', why: '교과서 — help + 동사원형' },
      { q: 'I saw him. He was crossing the road. (see, 한 문장)', a: 'I saw him crossing the road.', why: '지각동사 + -ing (진행 강조)' },
      { q: 'The king saw Corky. Corky approached. (see, 한 문장)', a: 'The king saw Corky approach.', why: '본문 — 지각동사 + 동사원형' },
      { q: 'They made me do the dishes. (force)', a: 'They forced me to do the dishes.', why: 'make → force + to부정사' }] },
  ], m),

  // ---------------- PERFECT CHECK ----------------
  D.section('PERFECT CHECK', '상위권 함정 체크'),
  ...D.drill(null, '', [{ level: '함정', type: 'choice', instr: '실수하기 쉬운 문장들이에요. 괄호 안에서 알맞은 것을 고르시오.', items: [
    { q: 'The king ordered (him / he) to go to a famous military school.', a: 'him', why: '교과서 Grammar — 목적어 자리 목적격' },
    { q: 'The woman told the boy (to be / be) careful.', a: 'to be', why: '교과서 — tell + O + to부정사' },
    { q: 'Finally, the people let him (to go / go).', a: 'go', why: '본문 — 사역동사 let + 동사원형' },
    { q: 'Some gave Corky angry looks, and (the other / others) shouted at him.', a: 'others', why: '본문 — 막연한 다수 Some ~, others … (같은 과 부정대명사)' },
    { q: 'The king said, “You have much (to learn / learning).”', a: 'to learn', why: '본문 — 명사 much를 꾸미는 형용사적 용법' },
    { q: 'Ms. Kim told us (not be / not to be) late again.', a: 'not to be', why: '부정 not + to부정사' },
    { q: 'My parents want (that I / me to) study abroad.', a: 'me to', why: 'want는 that절 ✗' },
    { q: 'She has two cats. One is brown, and (the other / another) is white.', a: 'the other', why: '둘 중 나머지 하나 (같은 과 부정대명사 기출)' },
    { q: 'The boy saw her (approach / to approach).', a: 'approach', why: '지각동사 see + 동사원형 (기출)' },
    { q: 'I’ll get my brother (help / to help) me.', a: 'to help', why: 'get + O + to부정사 (have면 help)' }] }], m),

  // ---------------- WRITE ----------------
  D.section('WRITE', '서술형 대비'),
  ...D.writeItem(1, 'Basic', '괄호 안의 동사를 알맞은 형태로 바꾸어 쓰시오.', ['He ordered Corky (go) to a famous military school. (본문)'], { a: 'to go', why: 'order + 목적어 + to부정사' }, m),
  ...D.writeItem(2, 'Basic', '괄호 안의 동사를 알맞은 형태로 바꾸어 쓰시오. (각 1칸)', ['(1) The woman told the boy (be) careful. (교과서)', '(2) Finally, the people let him (go). (본문)'],
    { a: '(1) to be  (2) go', why: '(1) tell + O + to부정사 (2) 사역동사 let + 동사원형', blanks: ['(1)', '(2)'] }, m),
  ...D.writeItem(3, 'Intermediate', '두 문장의 뜻이 같도록 ‘목적어 + to부정사’를 사용하여 문장을 완성하시오. [문장 전환]', ['I told her that she should arrive on time.'],
    { a: 'I told her to arrive on time.', why: 'that + S + should V → 목적어 + to부정사 (기출)' }, m),
  ...D.writeItem(4, 'Intermediate', '직접화법 문장을 tell을 사용하여 5형식 문장으로 바꾸어 쓰시오. [문장 전환]', ['Tom said to Yuri, “Don’t be late!”'],
    { a: 'Tom told Yuri not to be late.', why: '부정 명령문 → tell + O + not to부정사' }, m),
  ...D.writeItem(5, 'Intermediate', '두 문장을 want를 사용하여 한 문장으로 연결하시오. [두 문장 연결]', ['The girl fed the ducks. The boy wanted that.'],
    { a: 'The boy wanted the girl to feed the ducks.', why: '교과서 — want + O + to부정사' }, m),
  ...D.writeItem(6, 'Intermediate', 'allow를 사용하여 같은 뜻의 문장으로 바꾸어 쓰시오. [문장 전환]', ['Mom let me go to the concert with my friends.'],
    { a: 'Mom allowed me to go to the concert with my friends.', why: 'let + 동사원형 = allow + to부정사' }, m),
  ...D.writeItem(7, 'Advanced', '우리말과 같은 뜻이 되도록 <조건>에 맞게 영작하시오.', ['A: What did the doctor advise you to do?', 'B: 그는 내게 충분한 물을 마시라고 권했어.', '<조건> advise, water, enough를 사용할 것 · 과거시제 · 총 7단어'],
    { a: 'He advised me to drink enough water.', why: '기출 서술형 · 7단어 (He/advised/me/to/drink/enough/water)' }, m),
  ...D.writeItem(8, 'Advanced', '<보기>의 단어를 배열하여 문장을 완성하시오. (필요하면 형태를 바꾸고 한 단어를 추가할 것)', ['남자는 소년에게 잔디에 들어가는 것을 허락했다.', '<보기> the man / allow / the boy / enter / the grass'],
    { a: 'The man allowed the boy to enter the grass.', why: 'allow → allowed, to 추가 (교과서 · 기출 서술형)' }, m),
  ...D.writeItem(9, 'Advanced', '어법상 틀린 부분 2개를 찾아 바르게 고치고, 그 이유를 쓰시오.', ['He allowed them visiting his house. She told me eat less fat.'],
    { a: '① visiting → to visit  ② eat → to eat', why: '① allow + 목적어 + to부정사 ② tell + 목적어 + to부정사 (기출)', blanks: ['고친 것', '이유'] }, m),
  ...D.writeItem(10, 'Advanced', '어법상 틀린 부분 2개를 찾아 바르게 고치고, 그 이유를 쓰시오.', ['My father advised me not drink too much soda. He also made me to exercise every day.'],
    { a: '① not drink → not to drink  ② to exercise → exercise', why: '① 부정은 not + to부정사 ② 사역동사 make + 동사원형', blanks: ['고친 것', '이유'] }, m),

  // ---------------- MAP ----------------
  D.section('MAP', "DAVID'S MAP — 백지노트 테스트"),
  D.P([D.T('오늘 배운 내용을 떠올리며 빈칸을 채워 보세요. 책을 보지 않고!', { size: 18, color: '595959' })], { spacing: { after: 120 }, keepNext: true }),
  ...D.image(path.join(__dirname, 'map_G-5형식to부정사.png'), 620),
  ...D.table(['자가 체크 — 백지노트에 이 단어들이 들어갔나요?', '✔'], [
    ['5형식 = 주어 + 동사 + 목적어 + 목적격 보어(to부정사)', ''], ['목적어 = to부정사의 행동을 하는 사람 (목적격 him · me · us)', ''],
    ['want · ask · tell · order · allow · expect · advise · encourage · force (원부말명, 허기충격강)', ''], ['want + to-v (3형식) vs want + O + to-v (5형식) · want that절 ✗', ''],
    ['부정: not to + 동사원형 (not go ✗ · don’t go ✗)', ''], ['명령문 → tell / 부탁 → ask / 충고 → advise / 허락 → allow · 인칭 바꾸기', ''],
    ['tell + O + that + S + should V = tell + O + to-v', ''], ['사역동사 make · have · let + 동사원형 (let = allow + to-v)', ''],
    ['지각동사 see · hear · watch + 동사원형 / -ing · get + to-v · help + 원형/to-v', ''],
    ['본문: He ordered Corky to go to a famous military school. / The teacher told Corky to stand against a pole.', '']], [8838, 800], m),
  ...D.memo(['다음 시간 도입: 동사 카드 10초 퀴즈 — 동사만 보여 주고 “투(to)냐 원형이냐” 손 들기 10문항', '약한 반: Point 1·2 확실히 → Point 3은 let · make · have / see · hear 원형만 집중',
    '같은 과 부정대명사와 섞어 본문 문장 3개(He ordered Corky to go … / Some gave Corky angry looks, and others … / the people let him go) 통째 암기 확인', '명령문 전환은 교과서 Grammar Write(told the boy to be careful 등) 4문항으로 서술형 마무리'], m),
];
D.render(meta, build, process.argv[2] || '.').then(fs_ => {
  const out = fs_.map(f => { const g = path.join(path.dirname(f), path.basename(f).replace('5형식 + to부정사', '5형식to부정사')); fs.renameSync(f, g); return g; });
  console.log(out.join('\n'));
});
