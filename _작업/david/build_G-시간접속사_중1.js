const D0 = require('./david_base');
const path = require('path');
const fs = require('fs');
// 중1 동아(윤정미) 7과 Grammar Point 2 — 시간 접속사 when · before · after (중1 수준 · 새로 작성 · 중3용 build_G-시간접속사.js와 별개)
// 한 문장에 빈칸 ______ 이 두 개 이상이면 __밑줄__ 서식으로 잘못 읽히므로 밑줄 3개 이상 빈칸은 U+200B로 끊는다
const ZB = (s) => s.replace(/_{3,}/g, (u) => u.split('').join('​'));
const deep = (v) => typeof v === 'string' ? ZB(v) : Array.isArray(v) ? v.map(deep)
  : (v && typeof v === 'object' && v.constructor === Object) ? Object.fromEntries(Object.entries(v).map(([k, x]) => [k, deep(x)])) : v;
const D = new Proxy(D0, { get: (t, k) => (typeof t[k] === 'function' && !['render', 'P', 'T', 'image'].includes(k)) ? (...a) => t[k](...deep(a)) : t[k] });
const COVER = JSON.parse(process.env.COVER || '{}');
const TITLE = '시간 접속사 when · before · after';
const meta = { series: D.SERIES.G, code: 'G-시간접속사', title: TITLE, category: 'G. 접속사  |  시간 접속사 when · before · after',
  rightText: 'G  시간 접속사 when · before · after', prefix: process.env.PREFIX || '', cover: COVER.title ? COVER : undefined,
  question: 'Max gets too excited ~~when~~ a lot of people ~~are~~ around. / When Amy ~~arrives~~, we will have dinner. — when 뒤에는 왜 주어와 동사가 다 있고, 미래의 일인데 왜 will arrive가 아닐까?' };

const build = (m) => [
  D.section('FLOW', 'Teaching Flow — 처음 배우는 사람도 따라오는 5단계'),
  ...D.step(1, '우리말로 먼저 생각하기 — ‘언제?’를 붙이는 말', [
    '‘사람들이 많을 때’ ‘먹기 전에’ ‘촬영이 끝난 후에’ — 우리말은 동사 끝(~할 때, ~전에, ~후에)에 붙이지만,',
    '영어는 문장 앞에 {{접속사}} 하나를 붙인다: **when** a lot of people are around / **before** you eat / **after** the shooting is over'], m),
  ...D.step(2, '이전에 배운 것 복습 — 문장 두 개를 잇는 말', [
    'and · but · so는 대등한 두 문장을 잇는다: Max is a great actor, **but** he sometimes gets too excited. (본문)',
    '의문사 when은 ‘{{언제}}’를 묻는다: **When** does the bus leave? — 뒤는 의문문 어순(does + 주어 + 동사)'], m),
  ...D.step(3, '문제 제기 — 본문의 when · after', [
    'Max gets too excited **when** a lot of people **are** around. (본문) — when 뒤에 주어(a lot of people)와 동사(are)가 다 있다.',
    'When Amy (arrives / will arrive), we will have dinner. — 저녁은 미래의 일인데, will을 쓸까?'], m),
  ...D.step(4, '규칙 발견 — 접속사 뒤는 완전한 절', [
    'when · before · after + {{주어 + 동사}} → 시간을 나타내는 부사절 (주절 앞이면 끝에 콤마)',
    '시간을 나타내는 부사절에서는 미래의 일도 {{현재시제}}로 쓴다 → When Amy **arrives**, we will have dinner.'], m),
  ...D.step(5, '결론 🔑', [
    'when(~할 때) · before(~하기 전에) · after(~한 후에) + {{주어 + 동사}} / A before B = B {{after}} A / 시간 부사절 속 미래 = {{현재시제}}'], m),
  ...D.infoBox('오늘의 핵심 3문장', [
    '① Max gets too excited {{when}} a lot of people are around. (본문) — ~할 때',
    '② My work begins {{after}} the shooting is over. (본문) — ~한 후에',
    '③ {{Before}} you eat, you should wash your hands. (교과서) — ~하기 전에'], m),
  ...D.tip(['본문 4 · 5 · 6에서 when 2개(when a lot of people are around · when recording on location is not easy)와 after 1개에 동그라미 → 뒤에 주어(초록) · 동사(빨강) 밑줄을 긋게 하면 ‘접속사 + 주어 + 동사’가 눈에 보인다.',
    'recording on location(동명사구)이 when절의 주어라 is가 온다는 점은 상위권용으로 짚는다. 같은 과 문법 to부정사(목적)가 같은 문단(본문 4 to calm · 본문 5 To create)에 있어 PERFECT CHECK에 2문항을 넣었다.'], m),

  // ---------------- Point 1 ----------------
  D.section('Point 1', '접속사 when — ‘~할 때’ · 의문사 when과 구별', 'point'),
  ...D.table(['구성', '판단 기준 · 설명', '예'], [
    ['when + 주어 + 동사', '‘~할 때’ — 반드시 주어와 동사를 갖춘 절이 온다', 'Max gets too excited **when a lot of people are around**. (본문)'],
    ['절의 위치 · 콤마', '주절 뒤 · 앞 모두 가능 — 앞에 오면 when절 끝에 콤마(,)', '**When I feel tired**, I take a nap. = I take a nap **when I feel tired**. (교과서)'],
    ['동명사(구) 주어', 'when절의 주어가 동명사구 → 단수 취급(is)', 'I create sound effects in my studio **when recording on location is not easy**. (본문)'],
    ['의문사 when', '‘언제?’ — 의문문 맨 앞, 뒤는 의문문 어순', '**When** does the bus leave? (PRE-STEP) / **When** are you happy? (PRE-STEP)'],
    ['흔한 오답', 'when 뒤 주어 · 동사 빠뜨림 · 콤마 없이 붙여 쓰기', 'He reads comic books when **has** free time ✗ (PRE-STEP) / when he **stressed** ✗ / When I feel tired I take a nap (콤마 ✗)']], [2300, 3300, 4038], m),
  ...D.infoBox('3단계로 만들기', [
    '① 주절을 먼저 쓴다: {{Max gets too excited}} …',
    '② ‘언제?’ — when + 주어 + 동사: … when {{a lot of people are}} around.',
    '③ when절을 앞으로 보내면 끝에 콤마: When a lot of people are around{{,}} Max gets too excited.'], m),
  ...D.trick('when의 두 얼굴 (본문 Max 이야기)', ['질문하는 when: 감독이 “Max는 언제 흥분해요?” — When does Max get excited?',
    '→ 문장 맨 앞에서 묻고, 끝에 물음표가 붙는다.',
    '대답하는 when: Jennifer가 “사람들이 많을 때요.” — when a lot of people are around',
    '→ 두 문장을 잇고, 양쪽에 주어 + 동사가 하나씩 있다.']),
  ...D.examPoint([
    { q: '• {{When}} does the bus leave?  • {{When}} he is upset, he runs in the park.', why: '의문사 · 접속사 공통 (PRE-STEP)' },
    { q: 'He reads comic books when {{he}} has free time.', why: '접속사 뒤 주어 필수 (PRE-STEP 주관식)' }], m),
  ...D.caution(['공통 빈칸(PRE-STEP): 의문사 When과 접속사 When을 한 빈칸에 묻는다 — How · Where · Before · After가 오답 선지.',
    '‘(A)when과 쓰임이 다른 것’(예상 1회): 본문 when(접속사) 속에 의문사 when(When does ~?)이 정답으로 숨는다. Do you know when ~?(간접의문문)은 중1 범위 밖이라 ‘의문사’로만 짚는다.',
    '그림 보고 when 문장 완성(예상 2회): when 뒤 주어 + 동사 · 3인칭 단수 -s를 함께 채점한다.',
    'when 뒤 주어 빠뜨림(when has ✗)이 서술형 단골 감점 — 두 문장 연결 문항에서 반드시 확인.'], m),
  ...D.drill(1, '접속사 when', [
    { level: 'Basic ①', type: 'choice', instr: '괄호 안에서 알맞은 것을 고르시오.', items: [
      { q: 'Max gets too excited (when / what) a lot of people are around.', a: 'when', why: '본문 — ~할 때' },
      { q: 'I take a nap (then / when) I feel tired.', a: 'when', why: 'then은 접속사 ✗ (교과서)' },
      { q: '(When / Because of) I was young, I learned Chinese from my dad.', a: 'When', why: 'because of + 명사 ✗ (Grammar Build Up)' },
      { q: 'He reads comic books when (he has / has) free time.', a: 'he has', why: '주어 필수 (PRE-STEP)' },
      { q: 'When she is sick, Minji (drinking / drinks) warm tea.', a: 'drinks', why: '주절 동사 (예상 1회)' },
      { q: 'I create sound effects in my studio when recording on location (is / are) not easy.', a: 'is', why: '본문 — 동명사구 주어 단수' },
      { q: 'Peter eats a lot when he (is / are) stressed.', a: 'is', why: '주어 he (예상 1회)' },
      { q: 'My arm hurts when I (playing / play) tennis.', a: 'play', why: 'Grammar Build Up' },
      { q: 'Raise your hand when you (having / have) a question.', a: 'have', why: 'Grammar Build Up' },
      { q: 'Max is a great actor, (but / when) he sometimes gets too excited.', a: 'but', why: '본문 — 대조(그러나)' }] },
    { level: 'Basic ②', type: 'fill', instr: '<보기>에서 알맞은 말을 골라 빈칸에 쓰시오. (한 번씩만 사용)',
      bogi: ['he saw', 'it stops', 'is', 'you get', 'she was', 'you have', 'when', 'I play', 'he is', 'are'], items: [
      { q: 'Max gets too excited when a lot of people [[are]] around.', why: '본문' },
      { q: 'I create sound effects when recording on location [[is]] not easy.', why: '본문' },
      { q: 'My arm hurts when [[I play]] tennis.', why: 'Grammar Build Up' },
      { q: 'We will take the dog for a walk when [[it stops]] raining.', why: 'Grammar Build Up' },
      { q: 'When [[you have]] a headache, you must take an aspirin.', why: 'Grammar Build Up' },
      { q: 'I liked bugs [[when]] I was a child.', why: 'Grammar Build Up' },
      { q: 'Henry gets some sleep when [[he is]] very tired.', why: 'Grammar Build Up' },
      { q: 'When [[he saw]] the baby, he smiled.', why: 'Grammar Build Up' },
      { q: 'She often went to the movies when [[she was]] young.', why: 'Grammar Build Up' },
      { q: 'The dog will bark when [[you get]] in the house.', why: 'Grammar Build Up' }] },
    { level: 'Intermediate', type: 'write', instr: '어법상 틀린 부분을 찾아 바르게 고쳐 쓰시오.', items: [
      { q: 'He reads comic books when has free time.', a: 'when has → when he has', why: 'PRE-STEP 주관식 — 주어 필수' },
      { q: 'Max gets too excited when a lot of people around.', a: 'people around → people are around', why: '본문 — 동사 필수' },
      { q: 'When I feel tired I take a nap.', a: 'tired I → tired, I', why: 'when절이 앞이면 콤마' },
      { q: 'Peter eats a lot when he stressed.', a: 'he stressed → he is stressed', why: '예상 1회 — be동사 필수' },
      { q: 'When recording on location are not easy, I create sound effects.', a: 'are → is', why: '본문 — 동명사구 주어 단수' },
      { q: 'I listen to music when I free.', a: 'I free → I’m free', why: '교과서 — 동사 필수' },
      { q: 'When he see me yesterday, he waved.', a: 'see → saw', why: '과거 이야기 (yesterday)' },
      { q: 'Raise your hand when you having a question.', a: 'having → have', why: '동사원형(현재)' },
      { q: 'I smile when I happy.', a: 'I happy → I am happy', why: 'Grammar Build Up' },
      { q: 'When Minji sick, she drinks warm tea.', a: 'Minji sick → Minji is sick', why: '예상 1회 변형' }] },
    { level: 'Advanced · 모두 고르기', type: 'multi', free: true, instr: '해당하는 것을 모두 골라 기호를 쓰시오.', items: [
      { q: '밑줄 친 when이 ‘~할 때’라는 뜻의 접속사인 것을 모두 고르시오.', box: [
        '(a) __When__ does the play begin?', '(b) We went fishing __when__ we were on vacation.', '(c) __When__ are we leaving?',
        '(d) Call me __when__ you get home.', '(e) __When__ he saw me, he waved.'], a: '(b), (d), (e)', why: '(a) (c) 의문사 (Grammar Build Up Part 4)' },
      { q: '다음 중 어법상 옳은 문장을 모두 고르시오.', box: [
        '(a) When she is sick, Minji drinks warm tea.', '(b) Peter eats a lot when he is stressed.', '(c) He reads comic books when has free time.',
        '(d) When I was young I learned Chinese, from my dad.', '(e) I create sound effects when recording is not easy.'], a: '(a), (b), (e)', why: '(c) when he has (d) young, I learned (예상 1회 · PRE-STEP)' },
      { q: '다음 글의 밑줄 친 ⓐ~ⓔ 중 어법상 어색한 것을 모두 골라 기호를 쓰고 바르게 고치시오.', fix: true, label: '기호 / 고친 것', box: [
        'Max is a great actor, but he sometimes gets too excited ⓐ __when__ a lot of people ⓑ __is__ around. So, I use hand signals to calm him. ⓒ __When Max calm__, we start shooting again. I’m happy ⓓ __when__ the shooting ⓔ __goes__ well.'],
        a: 'ⓑ → are, ⓒ → When Max is calm', why: 'ⓑ a lot of people 복수 ⓒ 동사(be) 필수 (본문 변형)' },
      { q: '두 문장의 의미가 같은 것을 모두 고르시오.', box: [
        '(a) I liked bugs when I was a child. = When I was a child, I liked bugs.', '(b) Raise your hand when you have a question. = When you have a question, raise your hand.',
        '(c) Max gets excited when people are around. = People are around when Max gets excited.', '(d) When it rains, I take an umbrella. = I take an umbrella when it rains.',
        '(e) When I saw him, he was running. = When he saw me, I was running.'], a: '(a), (b), (d)', why: '(c) (e) 절의 내용이 뒤바뀜 — 위치만 바꿔야 같은 뜻' }] },
    { level: 'Advanced · 객관식', type: 'mcq', free: true, instr: '알맞은 답을 고르시오.', items: [
      { q: '다음 빈칸에 공통으로 들어갈 말로 알맞은 것은? — • ______ does the bus leave?  • ______ he is upset, he runs in the park.', opts: [
        'How', 'Where', 'Before', 'When', 'After'], a: '④', why: '의문사 · 접속사 when (PRE-STEP)' },
      { q: '다음 중 밑줄 친 when의 쓰임이 나머지와 다른 것은?', opts: [
        '__When__ does the movie start?', 'I cry __when__ I hear that song.', 'You can go __when__ the bell rings.',
        '__When__ I was in school, we didn’t have computers.', 'The dogs bark __when__ anyone comes.'], a: '①', why: '① 의문사 — 나머지 접속사 (예상 1회 유형)' },
      { q: '다음 우리말을 영어로 바르게 옮긴 것은? — 주변에 사람들이 많을 때 Max는 너무 흥분한다.', opts: [
        'Max gets too excited when around a lot of people are.', 'Max gets too excited when a lot of people around.', 'Max gets too excited when a lot of people are around.',
        'Max gets too excited, when are a lot of people around.', 'When Max gets too excited, a lot of people are around.'], a: '③', why: '본문 — when + 주어 + 동사 · ⑤ 뜻이 바뀜' },
      { q: '다음 중 어법상 어색한 것은?', opts: [
        'When I am happy, I smile.', 'I liked bugs when I was a child.', 'Call me when you get home.',
        'When it rains, I put on a raincoat.', 'He reads comic books when has free time.'], a: '⑤', why: '⑤ when he has (PRE-STEP)' },
      { q: '다음 대화의 빈칸에 들어갈 말로 알맞은 것은? — A: When are you happy?  B: I’m happy ______.', opts: [
        'when play with my friends', 'when I play with my friends', 'when I playing with my friends',
        'I play with my friends when', 'when my friends I play with'], a: '②', why: 'PRE-STEP 배열 — when + 주어 + 동사' }] },
    { level: '두 문장 연결', type: 'write', instr: 'when을 사용하여 두 문장을 한 문장으로 연결하시오.', items: [
      { q: 'I smile. + I am happy.', a: 'I smile when I am happy. (= When I am happy, I smile.)', why: 'Grammar Build Up' },
      { q: 'I liked bugs. + I was a child.', a: 'I liked bugs when I was a child. (= When I was a child, I liked bugs.)', why: 'Grammar Build Up' },
      { q: 'Raise your hand. + You have a question.', a: 'Raise your hand when you have a question.', why: 'Grammar Build Up' },
      { q: 'Max gets too excited. + A lot of people are around.', a: 'Max gets too excited when a lot of people are around.', why: '본문' },
      { q: 'I create sound effects in my studio. + Recording on location is not easy.', a: 'I create sound effects in my studio when recording on location is not easy.', why: '본문' },
      { q: 'The dog barked. + It noticed the cat.', a: 'The dog barked when it noticed the cat.', why: 'Grammar Build Up' },
      { q: 'Minji drinks warm tea. + She is sick. (When으로 시작할 것)', a: 'When she is sick, Minji drinks warm tea. (또는 When Minji is sick, she drinks warm tea.)', why: '예상 1회' },
      { q: 'Peter eats a lot. + He is stressed.', a: 'Peter eats a lot when he is stressed.', why: '예상 1회' },
      { q: 'The judge heard the old woman’s story. + He understood and smiled. (When으로 시작할 것)', a: 'When the judge heard the old woman’s story, he understood and smiled.', why: 'Grammar Build Up' },
      { q: 'He saw the baby. + He smiled. (When으로 시작할 것)', a: 'When he saw the baby, he smiled.', why: 'Grammar Build Up' }] },
  ], m),

  // ---------------- Point 2 ----------------
  D.section('Point 2', 'before · after — ‘~하기 전에’ · ‘~한 후에’ / 순서 바꿔 쓰기', 'point'),
  ...D.table(['구성', '판단 기준 · 설명', '예'], [
    ['before + 주어 + 동사', '‘~하기 전에’ — before 뒤의 일이 나중에 일어난다', '**Before you eat**, you should wash your hands. (교과서) / I read a book **before I go to bed**. (교과서)'],
    ['after + 주어 + 동사', '‘~한 후에’ — after 뒤의 일이 먼저 일어난다', 'My work begins **after the shooting is over**. (본문) / **After Kevin did his homework**, he played outside. (교과서)'],
    ['순서 바꿔 쓰기', 'A before B = B after A (일어난 순서는 그대로)', 'He takes a walk after he has dinner. = He has dinner **before** he takes a walk. (PRE-STEP)'],
    ['전치사 before · after', '뒤에 명사 · 동명사 — 주어 없이', '**After cleaning** the room, I walked my dog. (예상 2회) / **after school** · **before dinner**'],
    ['흔한 오답', '접속사 뒤 동사 빠뜨림 · 순서 거꾸로', 'Before he **handing** in ✗ (예상 2회) / after he **taking** a shower ✗ (예상 1회) / 순서가 뒤집힌 before ↔ after (예상 1회 · 2회)']], [2300, 3300, 4038], m),
  ...D.infoBox('순서 바꿔 쓰기 3단계', [
    '① 먼저 일어난 일(1)과 나중 일(2)을 정한다: 샤워(1) → 잠(2)',
    '② (2) {{after}} (1): Suho went to bed after he took a shower.',
    '③ (1) {{before}} (2): Suho took a shower before he went to bed.'], m),
  ...D.trick('Emma의 하루 (본문으로 순서 외우기)', ['아침: 해변에서 촬영이 진행된다. (먼저)',
    '오후: 촬영이 끝난 뒤 Emma의 편집이 시작된다. (나중)',
    'My work begins after the shooting is over. — after 뒤 = 먼저 끝난 일',
    'The shooting is over before my work begins. — before 뒤 = 나중에 할 일']),
  ...D.examPoint([
    { q: '나는 항상 숙제를 한 후에 게임을 한다. = I always play the game {{after}} I do my homework.', why: 'PRE-STEP' },
    { q: 'He takes a walk after he has dinner. = He has dinner {{before}} he takes a walk.', why: '순서 그대로, 접속사만 바꿈 (PRE-STEP)' }], m),
  ...D.caution(['우리말 영작에 필요하지 않은 단어 고르기(PRE-STEP: 너는 먹기 전에 손을 씻어야 한다 → after가 정답).',
    '그림(시간표) 설명 일치 · 어법(예상 1회): before ↔ after 내용 오류 + after he taking ✗ 어법 오류를 한 문항에 섞는다.',
    '두 문장 의미가 다른 것(예상 2회): popcorn → movie 순서를 before로 뒤집은 선지가 정답, After taking(전치사 + 동명사)은 같은 뜻.',
    '계획표 보고 서술형(예상 1회 Yumi): 시간 순서를 보고 before / after를 고르고 동사 형태까지 채점.'], m),
  ...D.drill(2, 'before · after', [
    { level: 'Basic ①', type: 'choice', instr: '괄호 안에서 알맞은 것을 고르시오.', items: [
      { q: 'My work begins (after / before) the shooting is over.', a: 'after', why: '본문 — 촬영이 먼저 끝남' },
      { q: '(Before / After) you eat, you should wash your hands.', a: 'Before', why: '교과서' },
      { q: 'I got dressed (after / before) I left home.', a: 'before', why: 'Grammar Build Up' },
      { q: 'He cleaned his teeth (before / after) he went to bed.', a: 'before', why: 'Grammar Build Up' },
      { q: 'We arrived in Madrid (after / before) we drove all night.', a: 'after', why: 'Grammar Build Up' },
      { q: 'Don’t forget to take your umbrella (after / before) you go out.', a: 'before', why: 'Grammar Build Up' },
      { q: 'You must wash your hands (before / after) you eat anything.', a: 'before', why: 'Grammar Build Up' },
      { q: 'Look both ways (before / after) you cross the street.', a: 'before', why: 'Grammar Build Up' },
      { q: 'After (clean / cleaning) the room, I walked my dog.', a: 'cleaning', why: '전치사 after + 동명사 (예상 2회)' },
      { q: 'Suho went to bed after he (taking / took) a shower.', a: 'took', why: '접속사 + 주어 + 동사(과거) (예상 1회)' }] },
    { level: 'Basic ②', type: 'fill', instr: '<보기>에서 알맞은 말을 골라 빈칸에 쓰시오. (한 번씩만 사용)',
      bogi: ['took', 'eat', 'After', 'is over', 'arrive', 'left', 'Before', 'go', 'leaves', 'cleaning'], items: [
      { q: 'My work begins after the shooting [[is over]].', why: '본문' },
      { q: '[[Before]] you eat, you should wash your hands.', why: '교과서' },
      { q: 'Suho went to bed after he [[took]] a shower.', why: '예상 1회' },
      { q: 'After [[cleaning]] the room, I walked my dog.', why: '예상 2회 — 전치사 + 동명사' },
      { q: 'I read a book before I [[go]] to bed.', why: '교과서' },
      { q: 'He wants to see you before he [[leaves]].', why: 'Grammar Build Up' },
      { q: '[[After]] Kevin did his homework, he played outside.', why: '교과서' },
      { q: 'I got dressed before I [[left]] home.', why: 'Grammar Build Up' },
      { q: 'Give me a call after you [[arrive]].', why: 'Grammar Build Up' },
      { q: 'You must wash your hands before you [[eat]] anything.', why: 'Grammar Build Up' }] },
    { level: 'Intermediate', type: 'write', instr: '어법상 또는 내용상 틀린 부분을 찾아 바르게 고쳐 쓰시오.', items: [
      { q: 'Before he handing in his homework, he checks it again.', a: 'he handing → he hands (또는 Before handing)', why: '예상 2회' },
      { q: 'Suho went to bed after he taking a shower.', a: 'taking → took', why: '예상 1회' },
      { q: 'My work begins after the shooting over.', a: 'the shooting over → the shooting is over', why: '본문 — 동사 필수' },
      { q: 'After she eat breakfast, she brushes her teeth.', a: 'eat → eats', why: 'PRE-STEP 변형 — 3인칭 단수' },
      { q: 'Before eat, wash your hands.', a: 'eat → eating (또는 Before you eat)', why: '전치사 + 동명사 / 접속사 + 주어 + 동사' },
      { q: 'I read a book before I goes to bed.', a: 'goes → go', why: '주어 I' },
      { q: 'After clean the room, I walked my dog.', a: 'clean → cleaning', why: '예상 2회 — 전치사 + 동명사' },
      { q: 'The players stretch before they plays soccer.', a: 'plays → play', why: 'PRE-STEP 변형 — 주어 they' },
      { q: 'Amy watched TV before she reviewed her lessons. (Amy는 4시에 복습하고 7시에 TV를 봄)', a: 'before → after', why: '예상 1회 ⓒ — 내용 오류' },
      { q: 'We watched a movie before we bought popcorn. (팝콘을 산 다음 영화를 봄)', a: 'before → after', why: '예상 2회 ③ — 순서 뒤집힘' }] },
    { level: 'Advanced · 모두 고르기', type: 'multi', free: true, instr: '해당하는 것을 모두 골라 기호를 쓰시오.', items: [
      { q: '다음 중 어법상 옳은 문장을 모두 고르시오.', box: [
        '(a) Before she goes to bed, she writes a diary.', '(b) After the rain stopped, we went outside.', '(c) Before he handing in his homework, he checks it.',
        '(d) After cleaning the room, I walked my dog.', '(e) Suho went to bed after he taking a shower.'], a: '(a), (b), (d)', why: '(c) he hands (e) he took (PRE-STEP · 예상 1·2회)' },
      { q: '두 문장의 의미가 같은 것을 모두 고르시오.', box: [
        '(a) They greeted each other before they started the debate. = They started the debate after they greeted each other.',
        '(b) We bought popcorn, and then we watched a movie. = We watched a movie before we bought popcorn.',
        '(c) After they took family pictures, they ate out. = After taking family pictures, they ate out.',
        '(d) He takes a walk after he has dinner. = He has dinner after he takes a walk.',
        '(e) I turn off the light before I sleep. = I sleep after I turn off the light.'], a: '(a), (c), (e)', why: '(b) (d) 순서가 뒤집힘 (예상 2회 · PRE-STEP)' },
      { q: 'Yumi의 토요일 계획표를 보고, 밑줄 친 ⓐ~ⓔ 중 내용상 어색한 것을 모두 골라 기호를 쓰고 바르게 고치시오.', fix: true, label: '기호 / 고친 것', box: [
        '[계획표] 9:00 아침 식사 → 10:00 숙제 → 2:00 피아노 레슨 → 6:00 저녁 식사 → 7:00 TV 시청',
        'ⓐ __After__ Yumi has breakfast, she will do her homework. She will do her homework ⓑ __after__ she goes to her piano lesson. ⓒ __Before__ she has dinner, she will go to her piano lesson. She will have dinner ⓓ __before__ her piano lesson. ⓔ __After having__ dinner, she will watch TV.'],
        a: 'ⓑ → before, ⓓ → after', why: '숙제(10:00) → 레슨(2:00) → 저녁(6:00) 순서 (예상 1회 서술형 유형)' },
      { q: '밑줄 친 before · after가 전치사로 쓰인 것을 모두 고르시오.', box: [
        '(a) My work begins __after__ the shooting is over.', '(b) __After__ cleaning the room, I walked my dog.', '(c) __Before__ you speak, think carefully.',
        '(d) Let’s meet at the bus stop __after__ school.', '(e) Wash your hands __before__ dinner.'], a: '(b), (d), (e)', why: '뒤에 명사 · 동명사 → 전치사 / (a) (c) 주어 + 동사 → 접속사' }] },
    { level: 'Advanced · 객관식', type: 'mcq', free: true, instr: '알맞은 답을 고르시오.', items: [
      { q: '다음 빈칸에 들어갈 말로 알맞은 것은? — 나는 항상 숙제를 한 후에 게임을 한다. = I always play the game ______ I do my homework.', opts: [
        'when', 'after', 'before', 'that', 'because'], a: '②', why: 'PRE-STEP' },
      { q: '다음 우리말을 영작할 때 필요하지 않은 단어는? — 너는 먹기 전에 손을 씻어야 한다.', opts: [
        'hands', 'wash', 'should', 'eat', 'after'], a: '⑤', why: 'You should wash your hands before you eat. (PRE-STEP)' },
      { q: '두 문장이 같은 의미가 되도록 빈칸에 알맞은 것은? — He takes a walk after he has dinner. = He has dinner ______ he takes a walk.', opts: [
        'before', 'when', 'that', 'until', 'because'], a: '①', why: '순서 그대로 (PRE-STEP)' },
      { q: '다음 중 짝지어진 두 문장의 의미가 서로 다른 것은?', opts: [
        'They greeted each other before they started the debate. → They started the debate after they greeted each other.',
        'She practices the piano to win the contest. → She practices the piano in order to win the contest.',
        'We bought popcorn, and then we watched a movie. → We watched a movie before we bought popcorn.',
        'I needed some vegetables, so I went to the market. → I went to the market to buy some vegetables.',
        'After they took family pictures, they ate out. → After taking family pictures, they ate out.'], a: '③', why: '③ before → after (예상 2회)' },
      { q: '다음 중 어법상 어색한 것은?', opts: [
        'Before she goes to bed, she writes a diary.', 'After the rain stopped, we went outside.', 'To get up early, I go to bed early.',
        'We’ll go home when it will get dark.', 'I study hard to pass the exam.'], a: '④', why: '④ gets — 시간 부사절 현재시제 (PRE-STEP)' }] },
    { level: '문장 전환', type: 'write', instr: '괄호 안의 지시대로 같은 뜻의 문장으로 바꾸어 쓰시오.', items: [
      { q: 'He takes a walk after he has dinner. (before를 사용할 것)', a: 'He has dinner before he takes a walk.', why: 'PRE-STEP' },
      { q: 'I turn off the light before I sleep. (after를 사용할 것)', a: 'I sleep after I turn off the light.', why: 'PRE-STEP 주관식' },
      { q: 'We bought tickets. + We entered the circus. (Before로 시작할 것)', a: 'Before we entered the circus, we bought tickets.', why: 'Grammar Build Up' },
      { q: 'We bought tickets. + We entered the circus. (After로 시작할 것)', a: 'After we bought tickets, we entered the circus.', why: 'Grammar Build Up' },
      { q: 'He locked the door. + He went out. (before를 사용할 것)', a: 'He locked the door before he went out.', why: 'Grammar Build Up' },
      { q: 'He locked the door. + He went out. (after를 사용할 것)', a: 'He went out after he locked the door.', why: 'Grammar Build Up' },
      { q: 'The shooting is over. Then my work begins. (My work로 시작 · after를 사용할 것)', a: 'My work begins after the shooting is over.', why: '본문' },
      { q: 'After they took family pictures, they ate out. (After + 동명사로 시작할 것)', a: 'After taking family pictures, they ate out.', why: '예상 2회' },
      { q: 'Mina walked her dog. Then she had lunch. (Mina had lunch로 시작할 것)', a: 'Mina had lunch after she walked her dog.', why: '교과서 Wrap Up 9' },
      { q: 'Mina had lunch. Then she did her homework. (Mina did her homework로 시작할 것)', a: 'Mina did her homework after she had lunch.', why: '교과서 Wrap Up 9' }] },
  ], m),

  // ---------------- Point 3 ----------------
  D.section('Point 3', '시제 맞추기 — 시간 부사절 속 미래는 현재시제', 'point'),
  ...D.table(['구성', '판단 기준 · 설명', '예'], [
    ['미래 의미 → 현재시제', 'when · before · after 절 안에서는 앞으로 일어날 일도 현재시제 (will ✗)', 'When Amy **arrives**, we will have dinner. (교과서) / I will call you when I **arrive**. (내용정리)'],
    ['주절은 will 가능', '주절은 미래 그대로 will + 동사원형', 'I **will help** my mom when she **cooks** dinner. (예상 2회 — will cook ✗)'],
    ['과거 이야기 → 둘 다 과거', '이미 일어난 일은 절과 주절 모두 과거', 'When the bell **rang**, everyone **stopped** working. (Grammar Build Up)'],
    ['반복되는 일 → 둘 다 현재', '습관 · 늘 그런 일은 현재', 'Max **gets** too excited when a lot of people **are** around. (본문)'],
    ['주어와 수 일치', '절의 주어에 맞춘 동사 (3인칭 단수 -s)', 'When she **gets** up, she **starts** texting her friends. (Grammar Build Up)']], [2300, 3300, 4038], m),
  ...D.infoBox('시제 3단계', [
    '① 주절의 시제를 먼저 본다 (과거 / 현재 / 미래)',
    '② 주절이 과거면 시간 부사절도 {{과거}}, 늘 하는 일이면 {{현재}}',
    '③ 주절이 미래(will)여도 시간 부사절은 {{현재시제}}: When Amy arrives, we will have dinner.'], m),
  ...D.trick('‘시조현’ (두문자로 외우기)', ['시 — 시간 부사절 (when · before · after)',
    '조 — 조건 부사절 (if — 2학년에서 배움)',
    '현 — 미래의 일이라도 현재시제로 쓴다',
    '주절은 will 그대로: I will call you when I arrive.']),
  ...D.examPoint([
    { q: 'We’ll go home when it {{gets}} dark.', why: 'will get ✗ (PRE-STEP)' },
    { q: 'I will help my mom when she {{cooks}} dinner.', why: '주절 will · 부사절 현재 (예상 2회)' }], m),
  ...D.caution(['어법상 어색한 것(PRE-STEP): We’ll go home when it will get dark ✗가 정답 — 나머지는 before · after · to부정사 문장이 섞인다.',
    '어법 개수 세기(예상 2회 ⓒ): I will help my mom when she will cook dinner ✗ — 주절의 will help는 맞다는 것까지 설명하게 한다.',
    '동사 형태 쓰기(Grammar Build Up Part 2): 과거 이야기(died · rang · got)와 미래 의미 현재시제(arrives · come)를 섞어 낸다.',
    'if(조건)는 중1 범위 밖이므로 문항으로 내지 않고 ‘시조현’ 설명에만 넣었다.'], m),
  ...D.drill(3, '시간 부사절의 시제', [
    { level: 'Basic ①', type: 'choice', instr: '괄호 안에서 알맞은 것을 고르시오.', items: [
      { q: 'We’ll go home when it (will get / gets) dark.', a: 'gets', why: 'PRE-STEP' },
      { q: 'I will help my mom when she (cooks / will cook) dinner.', a: 'cooks', why: '예상 2회' },
      { q: 'When Amy (arrives / will arrive), we will have dinner.', a: 'arrives', why: '교과서' },
      { q: 'I will call on you when I (will finish / finish) my homework.', a: 'finish', why: 'Grammar Build Up' },
      { q: 'Tom was 23 when his father (dies / died).', a: 'died', why: '과거 이야기' },
      { q: 'When the bell (rang / rings), everyone stopped working.', a: 'rang', why: '과거 이야기' },
      { q: 'The house was very quiet when I (get / got) home.', a: 'got', why: '과거 이야기' },
      { q: 'Their friends will visit them when they (will come / come) to Oxford.', a: 'come', why: 'Grammar Build Up' },
      { q: 'He will finish his work before he (goes / will go) home.', a: 'goes', why: 'Grammar Build Up' },
      { q: 'Max (gets / will gets) too excited when a lot of people are around.', a: 'gets', why: '본문 — 반복되는 일' }] },
    { level: 'Basic ②', type: 'fill', instr: '괄호 안의 동사를 알맞은 형태로 바꾸어 빈칸에 쓰시오.', items: [
      { q: 'Will you give him this note when he [[arrives]] (arrive)?', why: '미래 의미 → 현재시제' },
      { q: 'When the bell [[rang]] (ring), everyone stopped working.', why: '과거 이야기' },
      { q: 'She often [[went]] (go) to the movies when she was young.', why: '과거 이야기' },
      { q: 'The snow [[began]] (begin) to melt when the sun came out.', why: '과거 이야기' },
      { q: 'When it [[rains]] (rain), I put on a raincoat.', why: '반복되는 일 · 3인칭 단수' },
      { q: 'When she [[gets]] (get) up in the morning, she starts texting her friends.', why: '3인칭 단수' },
      { q: 'I’ll pick you up when you [[are]] (be) ready.', why: 'will be ✗' },
      { q: 'When I [[have]] (have) enough money, I will buy you a new phone.', why: 'will have ✗' },
      { q: 'Judy [[will buy]] (buy) some meat when she goes to the market.', why: '주절은 미래 will' },
      { q: 'My work [[begins]] (begin) after the shooting is over.', why: '본문' }] },
    { level: 'Intermediate', type: 'write', instr: '어법상 틀린 부분을 찾아 바르게 고쳐 쓰시오.', items: [
      { q: 'We’ll go home when it will get dark.', a: 'will get → gets', why: 'PRE-STEP' },
      { q: 'I will help my mom when she will cook dinner.', a: 'will cook → cooks', why: '예상 2회' },
      { q: 'When Amy will arrive, we will have dinner.', a: 'will arrive → arrives', why: '교과서' },
      { q: 'I’ll pick you up when you will be ready.', a: 'will be → are', why: 'Grammar Build Up' },
      { q: 'When I see him yesterday, he was running.', a: 'see → saw', why: '과거 이야기' },
      { q: 'When the bell rings, everyone stopped working.', a: 'rings → rang', why: '주절 과거' },
      { q: 'Tom was 23 when his father dies.', a: 'dies → died', why: 'Grammar Build Up' },
      { q: 'When she get up, she starts texting her friends.', a: 'get → gets', why: '3인칭 단수' },
      { q: 'I’ll show you my photos when I will see you tomorrow.', a: 'will see → see', why: 'Grammar Build Up' },
      { q: 'When I will have enough money, I will buy a new bike.', a: 'will have → have', why: 'Grammar Build Up' }] },
    { level: 'Advanced · 모두 고르기', type: 'multi', free: true, instr: '해당하는 것을 모두 골라 기호를 쓰시오.', items: [
      { q: '다음 중 어법상 옳은 문장을 모두 고르시오.', box: [
        '(a) I will call you when I arrive.', '(b) When it will rain, I will stay home.', '(c) When the bell rang, he picked up the phone.',
        '(d) Max gets too excited when a lot of people are around.', '(e) I will help my mom when she will cook dinner.'], a: '(a), (c), (d)', why: '(b) rains (e) cooks' },
      { q: '다음 중 어법상 어색한 문장을 모두 고르시오.', box: [
        '(a) After cleaning the room, I walked my dog.', '(b) Before he handing in his homework, he checks it again.', '(c) I ran fast not to be late for school.',
        '(d) To breathing fresh air, he often goes to the forest.', '(e) I will help my mom when she will cook dinner.'], a: '(b), (d), (e)', why: '(b) he hands (d) To breathe (e) cooks — 같은 과 문법 함께 (예상 2회)' },
      { q: '밑줄 친 부분에 대한 설명으로 옳은 것을 모두 고르시오.', box: [
        '(a) When Amy __arrives__, we will have dinner. → 미래의 일이지만 현재시제를 썼다.',
        '(b) I will call you when I __arrive__. → will arrive로 바꿔도 어법상 옳다.',
        '(c) __When__ does the bus leave? → ‘~할 때’라는 뜻의 접속사이다.',
        '(d) My work begins __after__ the shooting is over. → 촬영이 먼저 끝나고 일이 시작된다.',
        '(e) When she is sick, Minji __drinks__ warm tea. → 늘 하는 일이라 현재시제를 썼다.'], a: '(a), (d), (e)', why: '(b) will arrive ✗ (c) 의문사' },
      { q: '다음 글의 밑줄 친 ⓐ~ⓔ 중 어법상 어색한 것을 모두 골라 기호를 쓰고 바르게 고치시오.', fix: true, label: '기호 / 고친 것', box: [
        'Tomorrow is my birthday. When my friends ⓐ __will come__, we ⓑ __will have__ a party. After we ⓒ __eat__ cake, we ⓓ __will play__ games. Before they ⓔ __will leave__, I will give them some cookies.'],
        a: 'ⓐ → come, ⓔ → leave', why: '시간 부사절 → 현재시제 / 주절 will은 그대로' }] },
    { level: 'Advanced · 객관식', type: 'mcq', free: true, instr: '알맞은 답을 고르시오.', items: [
      { q: '다음 빈칸에 들어갈 말로 알맞은 것은? — When Amy ______, we will have dinner.', opts: [
        'arrive', 'will arrive', 'arriving', 'arrived', 'arrives'], a: '⑤', why: '시간 부사절 현재 · 3인칭 단수' },
      { q: '다음 중 어법상 어색한 것은?', opts: [
        'When I am happy, I smile.', 'I liked bugs when I was a child.', 'We’ll go home when it will get dark.',
        'Before she goes to bed, she writes a diary.', 'After the rain stopped, we went outside.'], a: '③', why: '③ gets (PRE-STEP)' },
      { q: '괄호 안의 동사를 알맞은 형태로 바르게 짝지은 것은? — When it (A)(rain) tomorrow, I (B)(stay) home.', opts: [
        'rains – will stay', 'will rain – will stay', 'rained – stayed', 'rains – stayed', 'will rain – stay'], a: '①', why: '(A) 시간 부사절 현재 (B) 주절 미래' },
      { q: '그림 내용을 보고, 설명이 어법상 또는 내용상 알맞지 않은 것을 모두 고른 것은?', box: [
        '[그림] 민지: 아플 때 따뜻한 차 / Peter: 스트레스 받을 때 많이 먹음 / Amy: 4:00 복습 → 7:00 TV / 수호: 8:00 샤워 → 10:00 취침',
        'ⓐ When she is sick, Minji drinks warm tea.', 'ⓑ Peter eats a lot when he is stressed.', 'ⓒ Amy watched TV before she reviewed her lessons.',
        'ⓓ Suho went to bed after he taking a shower.'], opts: ['ⓐ, ⓑ', 'ⓐ, ⓒ', 'ⓑ, ⓒ', 'ⓒ, ⓓ', 'ⓑ, ⓓ'], a: '④', why: 'ⓒ before → after(내용) ⓓ taking → took(어법) (예상 1회)' },
      { q: '다음 중 어법상 옳은 문장의 개수는?', box: [
        '(a) I will call you when I arrive.', '(b) When the bell rang, he picked up the phone.', '(c) When she gets up, she start texting.',
        '(d) After she eat breakfast, she brushes her teeth.', '(e) Before you will go out, close the window.'], opts: ['1개', '2개', '3개', '4개', '5개'], a: '②', why: '(a) (b) ○ — (c) starts (d) eats (e) go' }] },
    { level: '영작', type: 'write', instr: '우리말과 같은 뜻이 되도록 괄호 안의 말을 이용하여 영작하시오.', items: [
      { q: '나는 피곤할 때 낮잠을 잔다. (when, feel tired, take a nap)', a: 'I take a nap when I feel tired. (또는 When I feel tired, I take a nap.)', why: '교과서' },
      { q: '주변에 사람들이 많을 때 Max는 가끔 너무 흥분한다. (sometimes, get, excited, a lot of)', a: 'Max sometimes gets too excited when a lot of people are around.', why: '본문 — 빈도부사 위치' },
      { q: '내 일은 촬영이 끝난 후에 시작된다. (work, begin, shooting, be over)', a: 'My work begins after the shooting is over.', why: '본문' },
      { q: '너는 먹기 전에 손을 씻어야 한다. (before, should, wash)', a: 'You should wash your hands before you eat. (또는 Before you eat, you should wash your hands.)', why: '교과서' },
      { q: 'Amy가 도착하면 우리는 저녁을 먹을 것이다. (when, arrive, have dinner)', a: 'When Amy arrives, we will have dinner.', why: '교과서 — 시조현' },
      { q: '나는 시간이 날 때 피아노 치는 것을 즐긴다. (when, free time, enjoy, play the piano)', a: 'When I have free time, I enjoy playing the piano.', why: '교과서 Wrap Up 10' },
      { q: '나는 잠자리에 들기 전에 보통 책을 읽는다. (before, go to bed, usually)', a: 'Before I go to bed, I usually read books.', why: '교과서 Wrap Up 10' },
      { q: '나는 저녁을 먹은 후에 보통 짧은 산책을 한다. (after, eat dinner, take a short walk)', a: 'After I eat dinner, I usually take a short walk.', why: '교과서 Wrap Up 10' },
      { q: '나는 야외 촬영장에서 녹음하는 게 쉽지 않을 때 내 작업실에서 음향 효과를 만든다. (create, sound effects, recording on location)', a: 'I create sound effects in my studio when recording on location is not easy.', why: '본문' },
      { q: '네가 집에 도착하면 나에게 전화해. (call, when, get home)', a: 'Call me when you get home.', why: '명령문 + when절' }] },
  ], m),

  // ---------------- PERFECT CHECK ----------------
  D.section('PERFECT CHECK', '상위권 함정 체크'),
  ...D.drill(null, '', [{ level: '함정', type: 'choice', instr: '실수하기 쉬운 문장들이에요. 괄호 안에서 알맞은 것을 고르시오.', items: [
    { q: 'Max gets too excited when a lot of people (is / are) around.', a: 'are', why: '본문 — a lot of people 복수' },
    { q: 'I create sound effects when recording on location (is / are) not easy.', a: 'is', why: '본문 — 동명사구 주어 단수' },
    { q: 'My work begins (after / before) the shooting is over.', a: 'after', why: '본문 — 촬영이 먼저' },
    { q: 'We’ll go home when it (will get / gets) dark.', a: 'gets', why: 'PRE-STEP — 시조현' },
    { q: 'He reads comic books when (has / he has) free time.', a: 'he has', why: 'PRE-STEP — 주어 필수' },
    { q: '(When / What) he is upset, he runs in the park.', a: 'When', why: 'PRE-STEP' },
    { q: 'He takes a walk after he has dinner. = He has dinner (after / before) he takes a walk.', a: 'before', why: 'PRE-STEP — 순서 그대로' },
    { q: 'After (clean / cleaning) the room, I walked my dog.', a: 'cleaning', why: '예상 2회 — 전치사 + 동명사' },
    { q: 'So, I use hand signals (to calm / calming) him.', a: 'to calm', why: '본문 — 목적의 to부정사(같은 과 문법)' },
    { q: 'To (creating / create) a better story, I can change the order of scenes.', a: 'create', why: '본문 — to + 동사원형(같은 과 문법)' }] }], m),

  // ---------------- WRITE ----------------
  D.section('WRITE', '서술형 대비'),
  ...D.writeItem(1, 'Basic', '괄호 안의 단어를 알맞은 형태로 바꾸어 쓰시오.', ['Max is a great actor, but he sometimes gets too excited when a lot of people (be) around. (본문)'], { a: 'are', why: '주어 a lot of people 복수 · 반복되는 일 현재' }, m),
  ...D.writeItem(2, 'Basic', '괄호 안의 단어를 알맞은 형태로 바꾸어 쓰시오.', ['My work (begin) after the shooting (be) over. (본문)'], { a: 'begins, is', why: '3인칭 단수 현재' }, m),
  ...D.writeItem(3, 'Intermediate', 'when을 사용하여 두 문장을 한 문장으로 연결하시오. [두 문장 연결]', ['Max gets too excited.', 'A lot of people are around.'],
    { a: 'Max gets too excited when a lot of people are around. (또는 When a lot of people are around, Max gets too excited.)', why: '본문 — 앞으로 보내면 콤마' }, m),
  ...D.writeItem(4, 'Intermediate', 'after를 사용하여 같은 뜻의 문장으로 바꾸어 쓰시오. [문장 전환]', ['I turn off the light before I sleep.'],
    { a: 'I sleep after I turn off the light.', why: 'PRE-STEP 주관식 — 순서 그대로' }, m),
  ...D.writeItem(5, 'Intermediate', 'After로 시작하는 한 문장으로 연결하시오. [두 문장 연결]', ['Kevin did his homework.', 'Then he played outside.'],
    { a: 'After Kevin did his homework, he played outside.', why: '교과서 — 콤마' }, m),
  ...D.writeItem(6, 'Intermediate', '그림의 내용을 보고 <보기>의 표현과 접속사 when을 사용하여 문장을 완성하시오.', ['[그림] 비가 오는 날 — 지수가 우산을 쓴다.', '<보기> use an umbrella, rain', '→ Jisu ______________________________.'],
    { a: 'Jisu uses an umbrella when it rains.', why: '예상 2회 유형 — 3인칭 단수 uses · rains' }, m),
  ...D.writeItem(7, 'Advanced', '우리말과 같은 뜻이 되도록 <조건>에 맞게 영작하시오.', ['나는 야외 촬영장에서 녹음하는 게 쉽지 않을 때 내 작업실에서 음향 효과를 만든다.', '<조건> when을 사용할 것 · recording, location, studio를 활용할 것 · 총 14단어'],
    { a: 'I create sound effects in my studio when recording on location is not easy.', why: '본문 — 동명사구 주어 단수 is · 14단어' }, m),
  ...D.writeItem(8, 'Advanced', 'Yumi의 계획표를 보고 빈칸에 알맞은 말을 쓰시오.', ['[계획표] 10:00 숙제하기 → 1:00 점심 먹기 → 3:00 친구 만나기', '(1) Yumi will have lunch ______ she does her homework.', '(2) Before Yumi ______ her friends, she will have lunch. (meet)'],
    { a: '(1) after  (2) meets', why: '(1) 숙제가 먼저 (2) 시간 부사절 현재 · 3인칭 단수 (예상 1회 유형)', blanks: ['(1)', '(2)'] }, m),
  ...D.writeItem(9, 'Advanced', '어법상 틀린 부분 2개를 찾아 바르게 고치고, 그 이유를 쓰시오.', ['We’ll go home when it will get dark. Before he handing in his homework, he checks it again.'],
    { a: '① will get → gets  ② he handing → he hands (또는 Before handing)', why: '① 시간 부사절에서는 미래의 일도 현재시제 ② 접속사 before 뒤에는 주어 + 동사가 와야 한다 (전치사로 쓰면 주어 없이 동명사)', blanks: ['고친 것', '이유'] }, m),
  ...D.writeItem(10, 'Advanced', '어법상 틀린 부분 2개를 찾아 바르게 고치고, 그 이유를 쓰시오.', ['Suho went to bed after he taking a shower. Max gets too excited when a lot of people is around.'],
    { a: '① taking → took  ② is → are', why: '① 접속사 after 뒤에는 주어 + 동사(주절 went에 맞춰 과거) ② 주어 a lot of people은 복수', blanks: ['고친 것', '이유'] }, m),

  // ---------------- MAP ----------------
  D.section('MAP', "DAVID'S MAP — 백지노트 테스트"),
  D.P([D.T('오늘 배운 내용을 떠올리며 빈칸을 채워 보세요. 책을 보지 않고!', { size: 18, color: '595959' })], { spacing: { after: 120 }, keepNext: true }),
  ...D.image(path.join(__dirname, 'map_G-시간접속사_중1.png'), 620),
  ...D.table(['자가 체크 — 백지노트에 이 단어들이 들어갔나요?', '✔'], [
    ['when(~할 때) · before(~하기 전에) · after(~한 후에) + 주어 + 동사', ''], ['부사절이 앞이면 끝에 콤마: When I feel tired, I take a nap.', ''],
    ['의문사 when(언제?) vs 접속사 when(~할 때)', ''], ['A before B = B after A (일어난 순서 그대로)', ''],
    ['전치사 before · after + 명사 · 동명사 (After cleaning the room)', ''], ['시간 부사절: 미래 일도 현재시제 (will ✗) · 주절은 will 가능', ''],
    ['과거 이야기는 둘 다 과거 · 늘 하는 일은 둘 다 현재', ''], ['오답: when has ✗ · after he taking ✗ · when it will get dark ✗', ''],
    ['본문: when a lot of people are around · when recording on location is not easy', ''], ['본문: My work begins after the shooting is over.', '']], [8838, 800], m),
  ...D.memo(['다음 시간 도입: 본문 4 · 5 · 6에서 when · after 문장을 찾아 접속사 뒤 주어 · 동사에 밑줄 → 부사절을 앞으로 옮겨 콤마 붙이기',
    '약한 반: Point 1(when + 주어 + 동사) → Point 2는 before ↔ after 바꿔 쓰기 한 가지 → Point 3은 when it gets dark(will ✗) 한 문장만',
    '교과서 Wrap Up 9 · 10(미나의 하루 · 나의 일상)으로 before · after · when 문장 말하기 — 짝이 시제 · 3인칭 단수 점검',
    '같은 과 to부정사(목적)와 한 문장에 섞인 서술형: Jennifer uses hand signals to calm Max when he gets too excited.'], m),
];
D.render(meta, build, process.argv[2] || '.').then(fs_ => {
  const out = fs_.map(f => { const g = path.join(path.dirname(f), path.basename(f).replace(TITLE, '시간접속사')); fs.renameSync(f, g); return g; });
  console.log(out.join('\n'));
});
