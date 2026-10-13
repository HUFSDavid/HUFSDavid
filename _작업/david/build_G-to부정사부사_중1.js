const D0 = require('./david_base');
const path = require('path');
const fs = require('fs');
// 중1 동아(윤정미) 7과 Grammar Point 1 — to부정사의 부사적 용법(목적) (중1 수준 · 새로 작성)
// 한 문장에 빈칸 ______ 이 두 개 이상이면 david_base의 __밑줄__ 서식으로 잘못 읽히므로 밑줄 3개 이상 빈칸은 U+200B로 끊는다 (beworth·the비교급과 같은 처리)
const ZB = (s) => s.replace(/_{3,}/g, (u) => u.split('').join('​'));
const deep = (v) => typeof v === 'string' ? ZB(v) : Array.isArray(v) ? v.map(deep)
  : (v && typeof v === 'object' && v.constructor === Object) ? Object.fromEntries(Object.entries(v).map(([k, x]) => [k, deep(x)])) : v;
const D = new Proxy(D0, { get: (t, k) => (typeof t[k] === 'function' && !['render', 'P', 'T', 'image'].includes(k)) ? (...a) => t[k](...deep(a)) : t[k] });
const COVER = JSON.parse(process.env.COVER || '{}');
const TITLE = 'to부정사의 부사적 용법';
const meta = { series: D.SERIES.G, code: 'G-to부정사부사', title: TITLE, category: 'G. to부정사  |  부사적 용법 — 목적 (~하기 위해)',
  rightText: 'G  to부정사의 부사적 용법', prefix: process.env.PREFIX || '', cover: COVER.title ? COVER : undefined,
  question: 'A lot of people are working hard ~~to create~~ this movie. / My job is ~~to find~~ perfect places. — 똑같이 to + 동사원형인데 왜 하나는 ‘만들기 위해’, 하나는 ‘찾는 것’일까?' };

const build = (m) => [
  D.section('FLOW', 'Teaching Flow — 처음 배우는 사람도 따라오는 5단계'),
  ...D.step(1, '우리말로 먼저 생각하기 — ‘왜?’에 대한 대답', [
    '‘나는 빵을 사려고 빵집에 갔다.’ — ‘사려고(~하기 위해)’는 내가 그 일을 한 {{목적}}을 말한다.',
    '우리말은 동사 끝에 ‘~하려고, ~하기 위해’를 붙이지만, 영어는 동사 앞에 {{to}}를 붙여 문장 뒤에 덧붙인다: I went to the bakery **to buy** bread.'], m),
  ...D.step(2, '이전에 배운 것 복습 — to부정사의 모양', [
    'to부정사 = to + {{동사원형}} (to buys ✗ · to bought ✗ · to buying ✗)',
    '이미 아는 to부정사: I **want to be** a pilot. / I **like to travel**. (본문) — ‘~하는 것을’ = 명사처럼 쓰인 to부정사(명사적 용법)'], m),
  ...D.step(3, '문제 제기 — 본문의 두 가지 to', [
    'A lot of people are working hard **to create** this movie. (본문) → ‘만들기 위해’',
    'My job is **to find** perfect places for shooting. (본문) → ‘찾는 것’ — 둘 다 to + 동사원형인데 뜻이 왜 다를까?'], m),
  ...D.step(4, '규칙 발견 — to부정사를 빼 본다', [
    'A lot of people are working hard. → 빼도 문장이 {{완전}}하다 → to create는 덧붙인 말(부사) = ‘~하기 위해’',
    'My job is. → 빼면 문장이 {{깨진다}} → to find는 꼭 필요한 말(명사) = ‘~하는 것’'], m),
  ...D.step(5, '결론 🔑', [
    '완전한 문장 + to + 동사원형 = {{~하기 위해}}(목적) / 문장 앞에 쓰면 콤마: **To capture** their happy moments, I’m going to use drones. / = in order to = {{so as to}} / 부정은 {{not to}}'], m),
  ...D.infoBox('오늘의 핵심 3문장', [
    '① A lot of people are working hard {{to create}} this movie. (본문) — 만들기 위해',
    '② {{To capture}} their happy moments, I’m going to use drones. (본문) — 문장 앞 + 콤마',
    '③ So, I use hand signals {{to calm}} him. (본문) — 그를 진정시키기 위해'], m),
  ...D.tip(['본문에서 to부정사 6개(to create · to meet · to find · to travel · To capture · to calm · To create)에 동그라미 → 하나씩 빼 보고 ‘문장이 살아남는지’ 확인시키면 목적(부사적)과 명사적이 한 번에 갈린다.',
    '같은 과 문법 시간 접속사(when · before · after)가 같은 지문(본문 4 · 5)에 함께 나오므로 PERFECT CHECK에 2문항을 섞었다. 감정의 원인 · 결과 · 형용사 수식은 Point 2에서 ‘쓰임 구별’용으로만 다룬다(중1 범위).'], m),

  // ---------------- Point 1 ----------------
  D.section('Point 1', '목적의 to부정사 — ‘~하기 위해(서)’', 'point'),
  ...D.table(['구성', '판단 기준 · 설명', '예'], [
    ['to + 동사원형', '‘~하기 위해(서)’ — 동작을 한 목적 · 완전한 문장 뒤에 덧붙인다', 'A lot of people are working hard **to create** this movie. (본문) / Olivia came to Seoul **to study** Korean. (교과서)'],
    ['문장 앞 + 콤마', '목적을 강조할 때는 문장 맨 앞 — 뒤에 콤마(,)', '**To capture** their happy moments, I’m going to use drones. (본문) / **To create** a better story, I can change the order of scenes. (본문)'],
    ['in order to · so as to', 'to와 같은 뜻 — 목적을 더 분명히 나타낸다', 'I use hand signals **in order to** calm him. = I use hand signals **so as to** calm him. (본문 전환)'],
    ['부정: not to + 동사원형', '‘~하지 않기 위해’ — not은 to 앞에', 'Jake put on a warm jacket **not to** catch a cold. (교과서) / I ran fast **not to** be late for school. (예상 2회)'],
    ['흔한 오답', 'for to · for + 동사 · to + -ing · to + 과거형 · to 빠뜨림 · in order 뒤 to 빠뜨림', 'for to learn ✗ / for meet ✗ / to learning ✗ / to had ✗ / every day keep fit ✗ / in order see ✗ (Grammar Build Up)']], [2300, 3300, 4038], m),
  ...D.infoBox('3단계로 만들기', [
    '① 무엇을 했는지 먼저 쓴다: {{I went to the library}} …',
    '② ‘왜?’ — 목적 앞에 to: I went to the library {{to}} …',
    '③ to 뒤에는 동사원형: I went to the library to {{borrow}} books. (to borrowing ✗ · for borrow ✗)'], m),
  ...D.trick('촬영장 스태프 인터뷰 (본문 스토리로 외우기)', ['Jim 감독이 스태프에게 “왜 그 일을 해요?” 하고 묻는다.',
    'Peter: 행복한 순간을 담으려고 드론을 띄워요. → To capture',
    'Jennifer: Max를 진정시키려고 손짓을 해요. → to calm',
    'Emma: 더 좋은 이야기를 만들려고 장면을 바꿔요. → To create',
    '‘왜?’에 답하는 to + 동사원형 = 목적']),
  ...D.examPoint([
    { q: 'Olivia came to Seoul {{to study}} Korean.', why: '목적 ‘공부하기 위해’ — studies · studied · studying · to studying ✗ (PRE-STEP)' },
    { q: 'So, I use hand signals {{to calm}} him.', why: '완전한 문장 뒤 목적 — calm만 쓰면 동사가 두 개 (본문)' }], m),
  ...D.caution(['빈칸에 알맞은 형태 고르기(PRE-STEP): to study가 정답, studies · studied · studying · to studying이 오답 선지로 나온다.',
    '어법상 어색한 문장 고르기 · 개수 세기(예상 2회): To breathing ✗ · to relaxing ✗(PRE-STEP 주관식)처럼 to 뒤 -ing가 단골 오답이다.',
    '우리말 영작 객관식(PRE-STEP): I go to the library to borrowing ✗ · in order borrow ✗ · not to borrow(뜻 반대) ✗를 함께 낸다.',
    'to not + 동사원형은 학교 문법에서 오답으로 처리하므로 부정은 not to로만 가르친다.'], m),
  ...D.drill(1, '목적의 to부정사', [
    { level: 'Basic ①', type: 'choice', instr: '괄호 안에서 알맞은 것을 고르시오.', items: [
      { q: 'Olivia came to Seoul (to study / studying) Korean.', a: 'to study', why: '목적 ‘공부하기 위해’ (교과서 · PRE-STEP)' },
      { q: 'Tom exercises every day (be / to be) healthy.', a: 'to be', why: '동사가 두 개 ✗ → to be (교과서)' },
      { q: 'A lot of people are working hard (to creating / to create) this movie.', a: 'to create', why: 'to + 동사원형 (본문)' },
      { q: 'I went to the bakery (to buy / for buy) some bread.', a: 'to buy', why: 'for + 동사 ✗ (교과서 Use It)' },
      { q: '(To capture / Captured) their happy moments, I’m going to use drones.', a: 'To capture', why: '문장 앞 목적 + 콤마 (본문)' },
      { q: 'So, I use hand signals (calm / to calm) him.', a: 'to calm', why: '본문 — 진정시키기 위해' },
      { q: 'She put on a warm jacket (not to catch / to catch not) a cold.', a: 'not to catch', why: '부정은 not to + 동사원형 (교과서)' },
      { q: 'We used the computer in order (to save / saving) time.', a: 'to save', why: 'in order to + 동사원형 (교과서)' },
      { q: 'I go to school (for to learn / to learn) English.', a: 'to learn', why: 'for to ✗ (Grammar Build Up)' },
      { q: 'He went to Paris (visit / to visit) his mother.', a: 'to visit', why: '목적 ‘방문하기 위해’ (Grammar Build Up)' }] },
    { level: 'Basic ②', type: 'fill', instr: '<보기>에서 알맞은 말을 골라 빈칸에 쓰시오. (한 번씩만 사용 · 문장 첫 글자는 대문자로)',
      bogi: ['not to', 'to watch', 'so as', 'to calm', 'to take', 'in order', 'to create', 'to learn', 'to capture', 'to buy'], items: [
      { q: 'A lot of people are working hard [[to create]] this movie.', why: '본문' },
      { q: '[[To capture]] their happy moments, I’m going to use drones.', why: '본문 — 문장 앞 대문자' },
      { q: 'So, I use hand signals [[to calm]] him.', why: '본문' },
      { q: 'I turned on the TV [[to watch]] the news.', why: 'Grammar Build Up' },
      { q: 'He went to England [[to learn]] English.', why: 'Grammar Build Up' },
      { q: 'We use a camera [[to take]] photographs.', why: 'Grammar Build Up' },
      { q: 'He left early [[in order]] to catch the train.', why: 'in order to' },
      { q: 'I went to a bookstore [[so as]] to buy a book.', why: 'so as to' },
      { q: 'Jake put on a warm jacket [[not to]] catch a cold.', why: '부정 not to' },
      { q: 'I went to the store [[to buy]] a T-shirt.', why: '교과서 Use It' }] },
    { level: 'Intermediate', type: 'write', instr: '어법상 틀린 부분을 찾아 바르게 고쳐 쓰시오.', items: [
      { q: 'I go to school for to learn English.', a: 'for to → to', why: 'for to ✗ (Grammar Build Up)' },
      { q: 'I went to town for meet my friends.', a: 'for → to', why: 'for + 동사 ✗' },
      { q: 'I go jogging every day keep fit.', a: 'keep → to keep', why: 'to 빠뜨림 → 동사가 두 개' },
      { q: 'She went to the park playing with her friends.', a: 'playing → to play', why: '목적 → to부정사' },
      { q: 'I watch TV in English to learning more words.', a: 'to learning → to learn', why: 'to + 동사원형' },
      { q: 'I practice the piano in order getting better.', a: 'in order getting → in order to get', why: 'in order to + 동사원형' },
      { q: 'To breathing fresh air, he often goes to the forest.', a: 'To breathing → To breathe', why: '예상 2회 — to + 동사원형' },
      { q: 'The girl listens to music to relaxing.', a: 'to relaxing → to relax', why: 'PRE-STEP 주관식' },
      { q: 'We’re going to Egypt in order see the Pyramids.', a: 'in order see → in order to see', why: 'in order 뒤 to 필수' },
      { q: 'Peter is going to use drones capture their happy moments.', a: 'capture → to capture', why: '본문 변형 — 목적' }] },
    { level: 'Advanced · 모두 고르기', type: 'multi', free: true, instr: '해당하는 것을 모두 골라 기호를 쓰시오.', items: [
      { q: '밑줄 친 to부정사가 ‘목적(~하기 위해)’을 나타내는 것을 모두 고르시오.', box: [
        '(a) Tom exercises every day __to be__ healthy.', '(b) Her goal is __to travel__ the world.', '(c) I went to the library __to borrow__ books.',
        '(d) I decided __to leave__ the company.', '(e) __To capture__ their happy moments, I’m going to use drones.'], a: '(a), (c), (e)', why: '(b) 보어 (d) 목적어 — 명사적 용법 (PRE-STEP 변형)' },
      { q: '다음 중 어법상 옳은 문장을 모두 고르시오.', box: [
        '(a) She saved money to go to Portugal.', '(b) We used the computer so as to save time.', '(c) I went to the gym to working out.',
        '(d) I came back home early to do my homework.', '(e) He sat on a chair for get some rest.'], a: '(a), (b), (d)', why: '(c) to work out (e) to get (교과서 Grammar Point 변형)' },
      { q: '다음 글의 밑줄 친 ⓐ~ⓔ 중 어법상 어색한 것을 모두 골라 기호를 쓰고 바르게 고치시오.', fix: true, label: '기호 / 고친 것', box: [
        'A lot of people are working hard ⓐ __to create__ this movie. Peter is going to use drones ⓑ __capture__ happy moments. Jennifer uses hand signals ⓒ __to calm__ Max. ⓓ __To creating__ a better story, Emma changes the order of scenes. Chris uses rice and a plastic container ⓔ __to make__ the sound of waves.'],
        a: 'ⓑ → to capture, ⓓ → To create', why: 'ⓑ 동사가 두 개 → to부정사 ⓓ to + 동사원형 (본문 변형)' },
      { q: '두 문장의 의미가 같은 것을 모두 고르시오.', box: [
        '(a) He ran fast not to be late. = He ran fast to be late.', '(b) I went to the market to buy fish. = I went to the market in order to buy fish.',
        '(c) Tom exercises to be healthy. = Tom exercises because he is healthy.', '(d) She studies hard to pass the test. = She studies hard so as to pass the test.',
        '(e) I needed some vegetables, so I went to the market. = I went to the market to buy some vegetables.'], a: '(b), (d), (e)', why: '(a) not 빠짐 — 반대 (c) 목적 ≠ 이유 (e 예상 2회)' }] },
    { level: 'Advanced · 객관식', type: 'mcq', free: true, instr: '알맞은 답을 고르시오.', items: [
      { q: '다음 빈칸에 들어갈 말로 알맞은 것은? — Olivia came to Seoul ______ Korean.', opts: [
        'studies', 'studied', 'to study', 'studying', 'to studying'], a: '③', why: '목적 to + 동사원형 (PRE-STEP)' },
      { q: '다음 우리말을 영어로 바르게 옮긴 것은? — 나는 책을 빌리기 위해 도서관에 간다.', opts: [
        'I go the library and borrow books.', 'I go to the library to borrowing books.', 'I go to the library not to borrow books.',
        'I go to the library in order borrow books.', 'I go to the library to borrow books.'], a: '⑤', why: '② to + -ing ✗ ③ 뜻 반대 ④ in order to (PRE-STEP)' },
      { q: '다음 중 밑줄 친 부분이 ‘목적’을 나타내는 것은?', opts: [
        'Tom exercises every day __to be__ healthy.', '__To learn__ English is difficult.', 'Her goal is __to travel__ the world.',
        'I decided __to leave__ the company.', 'He wanted __to get__ a good grade.'], a: '①', why: '② 주어 ③ 보어 ④ ⑤ 목적어 (PRE-STEP)' },
      { q: '두 문장을 한 문장으로 바르게 연결한 것은? — I’m saving money. I want to buy new clothes.', opts: [
        'I’m saving money buy new clothes.', 'I’m saving money for buy new clothes.', 'I want saving money to buy new clothes.',
        'I’m saving money to buy new clothes.', 'I’m saving money to buying new clothes.'], a: '④', why: '목적 to + 동사원형 (PRE-STEP 주관식)' },
      { q: '다음 중 어법상 어색한 문장은?', opts: [
        'To get up early, I go to bed early.', 'She went to the park to playing with her friends.', 'I study hard to pass the exam.',
        'He hurried to the airport to catch the flight.', 'They put on sun cream to protect their skin.'], a: '②', why: '② to play (PRE-STEP · Grammar Build Up)' }] },
    { level: '두 문장 연결', type: 'write', instr: 'to부정사를 사용하여 두 문장을 한 문장으로 연결하시오.', items: [
      { q: 'Judy went by bus. + She wanted to save money.', a: 'Judy went by bus to save money.', why: 'Grammar Build Up' },
      { q: 'My mother went to the post office. + She had to post some letters.', a: 'My mother went to the post office to post some letters.', why: 'Grammar Build Up' },
      { q: 'Paul did some exercises. + He wanted to lose weight.', a: 'Paul did some exercises to lose weight.', why: 'Grammar Build Up' },
      { q: 'Sam went to the supermarket. + He wanted to buy some sugar.', a: 'Sam went to the supermarket to buy some sugar.', why: 'Grammar Build Up' },
      { q: 'Daisy is studying hard. + She wants to be a doctor.', a: 'Daisy is studying hard to be a doctor.', why: 'Grammar Build Up' },
      { q: 'Jennifer uses hand signals. + She wants to calm Max.', a: 'Jennifer uses hand signals to calm Max.', why: '본문 변형' },
      { q: 'I phoned the dentist. + I wanted to make an appointment.', a: 'I phoned the dentist to make an appointment.', why: 'Grammar Build Up' },
      { q: 'A lot of people are working hard. + They want to create this movie.', a: 'A lot of people are working hard to create this movie.', why: '본문' },
      { q: 'Peter is going to use drones. + He wants to capture their happy moments. (To로 시작할 것)', a: 'To capture their happy moments, Peter is going to use drones.', why: '본문 — 문장 앞 + 콤마' },
      { q: 'I’m saving money. + I want to buy new clothes.', a: 'I’m saving money to buy new clothes.', why: 'PRE-STEP 주관식' }] },
  ], m),

  // ---------------- Point 2 ----------------
  D.section('Point 2', '쓰임 구별 — 부사적 용법(목적 · 감정의 원인 · 결과 · 형용사 수식) vs 명사적 용법', 'point'),
  ...D.table(['쓰임', '판단 기준 · 해석', '예'], [
    ['부사적 · 목적', '완전한 문장 뒤 · 앞 — ‘~하기 위해’', 'working hard **to create** this movie (본문) / use hand signals **to calm** him (본문)'],
    ['부사적 · 감정의 원인', '감정 형용사(glad · happy · sad · sorry) 뒤 — ‘~해서’', 'I’m so glad **to meet** you. (교과서) / We were sad **to hear** the news. (예상 2회)'],
    ['부사적 · 결과', 'grow up to be ~ — ‘(자라서) ~이 되다’', 'The boy grew up **to be** a great musician. (교과서)'],
    ['부사적 · 형용사 수식', '형용사 뒤 — ‘~하기에’', 'The quiz is fun **to solve**. (교과서)'],
    ['명사적 · 목적어', 'want · like · decide · hope + to-v — ‘~하는 것을’', 'Do you **want to meet** some of them? (본문) / I **like to travel**. (본문)'],
    ['명사적 · 보어 · 주어', 'be동사 뒤(보어) · 문장 맨 앞 주어 — ‘~하는 것’ (주어면 동사는 단수)', 'My job is **to find** perfect places. (본문) / **To learn** English **is** difficult. (PRE-STEP)']], [2300, 3300, 4038], m),
  ...D.infoBox('구별 3단계', [
    '① to부정사(구)를 빼 본다 → 남은 문장이 완전하면 {{부사적}} 용법',
    '② ‘~하는 것(을)’로 해석되고, 빼면 문장이 깨지면 {{명사적}} 용법',
    '③ 부사적이면 앞을 본다: 감정 형용사 → {{감정의 원인}} / 그 밖의 형용사 → ~하기에 / 나머지 대부분 → 목적'], m),
  ...D.trick('Anna의 명함과 Jennifer의 손짓 (본문으로 구별하기)', ['Anna의 명함: My job is to find perfect places.',
    '‘to find’를 지우면 My job is. — 명함이 반쪽이 된다 → 명사적',
    'Jennifer의 손짓: I use hand signals to calm him.',
    '‘to calm him’을 지워도 I use hand signals. — 문장이 살아 있다 → 부사적(목적)']),
  ...D.examPoint([
    { q: '밑줄 친 부분의 쓰임: Do you want __to meet__ some of them? → {{명사적 용법(목적어)}}', why: 'want의 목적어 ‘만나는 것을’ — 빼면 Do you want? 불완전 (본문)' },
    { q: '밑줄 친 부분의 쓰임: We hurried to the airport __to catch__ the flight. → {{부사적 용법(목적)}}', why: '‘잡기 위해’ (예상 1회)' }], m),
  ...D.caution(['‘밑줄 친 to부정사의 쓰임이 다른 하나’(예상 1회): 명사적 4개(promised not to play · decided to eat · To practice · is to read) 속에 목적 1개(to catch the flight)를 숨긴다.',
    '‘㉠to create와 쓰임이 같은 것’(예상 2회): 본문 working hard to create의 목적 용법을 고르게 한다 — 보기에 want to · is to · To + 주어 자리가 섞여 나온다.',
    'not to는 명사적 용법(promised not to play)에도 쓰인다 → not to가 있다고 무조건 목적이 아님을 짚는다.',
    '감정의 원인 · 결과 · 형용사 수식은 중1 교과서 Grammar Point 설명에만 나오므로 ‘쓰임 구별’ 문항으로만 낸다.'], m),
  ...D.drill(2, '부사적 용법 vs 명사적 용법 구별', [
    { level: 'Basic ①', type: 'choice', instr: '밑줄 친 to부정사의 쓰임으로 알맞은 것을 고르시오.', items: [
      { q: 'Do you want __to meet__ some of them? (부사적 / 명사적)', a: '명사적', why: 'want의 목적어 (본문)' },
      { q: 'A lot of people are working hard __to create__ this movie. (부사적 / 명사적)', a: '부사적', why: '목적 (본문)' },
      { q: 'So, I use hand signals __to calm__ him. (부사적 / 명사적)', a: '부사적', why: '목적 (본문)' },
      { q: 'My job is __to find__ perfect places for shooting. (부사적 / 명사적)', a: '명사적', why: '보어 (본문)' },
      { q: 'I like __to travel__ and enjoy challenges. (부사적 / 명사적)', a: '명사적', why: 'like의 목적어 (본문)' },
      { q: '__To create__ a better story, I can change the order of scenes. (부사적 / 명사적)', a: '부사적', why: '목적 (본문)' },
      { q: 'My hobby is __to play__ the guitar. (부사적 / 명사적)', a: '명사적', why: '보어 (Grammar Build Up)' },
      { q: 'The girl decided __to go__ to the theater. (부사적 / 명사적)', a: '명사적', why: 'decide의 목적어 (Grammar Build Up)' },
      { q: 'I watch the news on TV __to learn__ about the world. (부사적 / 명사적)', a: '부사적', why: '목적 (Grammar Build Up)' },
      { q: '__To learn__ French, she goes to France. (부사적 / 명사적)', a: '부사적', why: '목적 — 콤마 뒤 완전한 문장 (Grammar Build Up)' }] },
    { level: 'Basic ②', type: 'fill', instr: '밑줄 친 to부정사의 쓰임을 <보기>에서 골라 쓰시오. (같은 말을 여러 번 써도 됨)',
      bogi: ['형용사 수식', '목적', '주어', '감정의 원인', '보어', '결과', '목적어'], items: [
      { q: 'I’m so glad __to meet__ you. → [[감정의 원인]]', why: '교과서 Grammar Point' },
      { q: 'The boy grew up __to be__ a great musician. → [[결과]]', why: '교과서 Grammar Point' },
      { q: 'The quiz is fun __to solve__. → [[형용사 수식]]', why: '교과서 Grammar Point' },
      { q: 'Tom exercises every day __to be__ healthy. → [[목적]]', why: '교과서 예문' },
      { q: 'My dream is __to become__ a teacher. → [[보어]]', why: '명사적 — be동사 뒤' },
      { q: 'I want __to eat__ pizza. → [[목적어]]', why: '명사적 — want의 목적어' },
      { q: '__To read__ books is fun. → [[주어]]', why: '명사적 — 동사 is 앞' },
      { q: 'We were sad __to hear__ the news. → [[감정의 원인]]', why: '예상 2회' },
      { q: '__To capture__ their happy moments, I’m going to use drones. → [[목적]]', why: '본문' },
      { q: 'This book is easy __to read__. → [[형용사 수식]]', why: '‘읽기에’ 쉬운' }] },
    { level: 'Intermediate', type: 'write', instr: '밑줄 친 부분을 우리말로 해석하시오.', items: [
      { q: 'A lot of people are working hard __to create this movie__.', a: '이 영화를 만들기 위해', why: '목적 (본문)' },
      { q: 'My job is __to find perfect places for shooting__.', a: '촬영을 위한 완벽한 장소를 찾는 것', why: '보어 (본문)' },
      { q: 'I’m happy __to meet you__.', a: '너를 만나서', why: '감정의 원인' },
      { q: 'He grew up __to be a doctor__.', a: '(자라서) 의사가 되었다', why: '결과 (내용정리 Grammar+)' },
      { q: 'Do you want __to meet some of them__?', a: '그들 중 몇 명을 만나는 것을 (→ 만나고 싶나요?)', why: '목적어 (본문)' },
      { q: 'So, I use hand signals __to calm him__.', a: '그를 진정시키기 위해', why: '목적 (본문)' },
      { q: 'The quiz is fun __to solve__.', a: '풀기에', why: '형용사 수식' },
      { q: '__To create a better story__, I can change the order of scenes.', a: '더 좋은 이야기를 만들기 위해서', why: '목적 (본문)' },
      { q: 'I like __to travel__.', a: '여행하는 것을', why: '목적어 (본문)' },
      { q: 'Jake put on a warm jacket __not to catch a cold__.', a: '감기에 걸리지 않기 위해', why: '목적의 부정' }] },
    { level: 'Advanced · 모두 고르기', type: 'multi', free: true, instr: '해당하는 것을 모두 골라 기호를 쓰시오.', items: [
      { q: '밑줄 친 to부정사의 쓰임이 본문의 working hard to create this movie의 to create와 같은 것을 모두 고르시오.', box: [
        '(a) I want __to be__ a pilot.', '(b) She saved money __to go__ to Portugal.', '(c) My plan is __to read__ five books.',
        '(d) He sat on a chair __to get__ some rest.', '(e) __To stay__ healthy, eat fruits.'], a: '(b), (d), (e)', why: '목적 — (a) 목적어 (c) 보어 (예상 2회 유형)' },
      { q: '밑줄 친 to부정사가 명사적 용법인 것을 모두 고르시오.', box: [
        '(a) My hobby is __to play__ the guitar.', '(b) I came __to see__ you.', '(c) The girl decided __to go__ to the theater.',
        '(d) __To use__ our time wisely, we have to make plans.', '(e) __To climb__ this mountain is very difficult.'], a: '(a), (c), (e)', why: '(a) 보어 (c) 목적어 (e) 주어 / (b) (d) 목적 (Grammar Build Up)' },
      { q: '밑줄 친 부분에 대한 설명으로 옳은 것을 모두 고르시오.', box: [
        '(a) My job is __to find__ perfect places. → be동사 뒤 보어로 쓰인 명사적 용법이다.',
        '(b) I’m glad __to see__ you. → 감정의 원인을 나타내는 부사적 용법이다.',
        '(c) I use hand signals __to calm__ him. → ‘그를 진정시키는 것’으로 해석한다.',
        '(d) I like __to travel__. → traveling으로 바꿔 써도 뜻이 같다.',
        '(e) Do you want __to meet__ them? → 목적을 나타내는 부사적 용법이다.'], a: '(a), (b), (d)', why: '(c) ‘진정시키기 위해’ (e) want의 목적어(명사적)' },
      { q: '다음 중 어법상 옳은 문장을 모두 고르시오.', box: [
        '(a) I decided to leave the company.', '(b) I like to travel and enjoy challenges.', '(c) Her goal is travel the world.',
        '(d) To learn English are difficult.', '(e) He grew up to be a great musician.'], a: '(a), (b), (e)', why: '(c) to travel (d) to부정사 주어 → is' }] },
    { level: 'Advanced · 객관식', type: 'mcq', free: true, instr: '알맞은 답을 고르시오.', items: [
      { q: '다음 중 밑줄 친 to부정사의 쓰임이 다른 하나는?', opts: [
        'They promised __not to play__ video games.', 'I decided __to eat__ healthy food.', '__To practice__ English every day is important.',
        'We hurried to the airport __to catch__ the flight.', 'Her plan is __to read__ 5 books.'], a: '④', why: '④ 목적(부사적) — 나머지 명사적 (예상 1회)' },
      { q: '밑줄 친 부분의 쓰임이 다음 문장과 같은 것은? — A lot of people are working hard __to create__ this movie.', opts: [
        'I want __to visit__ Paris.', 'I went to the market __to buy__ some fish.', 'My dream is __to be__ a chef.',
        '__To read__ books is fun.', 'She likes __to swim__.'], a: '②', why: '목적 (예상 2회 유형)' },
      { q: '다음 중 밑줄 친 부분이 명사적 용법인 것은?', opts: [
        'I’m happy __to meet__ you.', 'He went to the gym __to work__ out.', '__To catch__ the bus, I ran.',
        'The quiz is fun __to solve__.', 'Do you want __to meet__ some of them?'], a: '⑤', why: '⑤ want의 목적어 (본문)' },
      { q: '다음 중 밑줄 친 to부정사가 ‘감정의 원인’을 나타내는 것은?', opts: [
        'We were sad __to hear__ the news.', 'I study hard __to pass__ the test.', 'The boy grew up __to be__ a singer.',
        'I like __to draw__ pictures.', 'This river is dangerous __to swim__ in.'], a: '①', why: '② 목적 ③ 결과 ④ 목적어 ⑤ 형용사 수식' },
      { q: '다음 중 어법상 옳은 문장의 개수는?', box: [
        '(a) To learn French, she goes to France.', '(b) My hobby is play the guitar.', '(c) I’m so glad to meeting you.',
        '(d) The quiz is fun to solve.', '(e) I hope to see you again.'], opts: ['1개', '2개', '3개', '4개', '5개'], a: '③', why: '(a) (d) (e) ○ — (b) to play (c) to meet' }] },
    { level: '문장 전환', type: 'write', instr: '괄호 안의 지시대로 같은 뜻의 문장으로 바꾸어 쓰시오.', items: [
      { q: 'I use hand signals to calm him. (in order to를 사용할 것)', a: 'I use hand signals in order to calm him.', why: '본문 — 내용정리 전환' },
      { q: 'To create a better story, I can change the order of scenes. (So as to로 시작할 것)', a: 'So as to create a better story, I can change the order of scenes.', why: '본문 — 내용정리 전환' },
      { q: 'Peter uses drones to capture happy moments. (To로 시작할 것)', a: 'To capture happy moments, Peter uses drones.', why: '문장 앞 + 콤마' },
      { q: 'I like to travel. (동명사를 사용할 것)', a: 'I like traveling.', why: '명사적 to부정사 ↔ 동명사 (본문 내용정리)' },
      { q: 'My job is to find perfect places for shooting. (동명사를 사용할 것)', a: 'My job is finding perfect places for shooting.', why: '보어 to부정사 ↔ 동명사 (본문 내용정리)' },
      { q: 'I needed some vegetables, so I went to the market. (to부정사를 사용하여 한 문장으로 · buy를 쓸 것)', a: 'I went to the market to buy some vegetables.', why: '예상 2회 — so 문장 → 목적' },
      { q: 'Q: Why did Somin go to the bakery? (buy a cake) → A: She went there ______.', a: 'She went there to buy a cake.', why: '교과서 Wrap Up 8' },
      { q: 'Q: Why did Minho go to the mall? (watch a movie) → A: He went there ______.', a: 'He went there to watch a movie.', why: '교과서 Wrap Up 8' },
      { q: 'She practices the piano to win the contest. (in order to를 사용할 것)', a: 'She practices the piano in order to win the contest.', why: '예상 2회' },
      { q: 'He ran fast because he didn’t want to be late for school. (not to를 사용할 것)', a: 'He ran fast not to be late for school.', why: '예상 2회 — 부정' }] },
  ], m),

  // ---------------- Point 3 ----------------
  D.section('Point 3', '닮은꼴 to 구별 — 전치사 to · for + 명사 · be going to', 'point'),
  ...D.table(['구성', '역할 · 설명', '예'], [
    ['to부정사 (to + 동사원형)', '‘~하기 위해’ — to 뒤에 동사원형', 'I went to the park **to jog**. (교과서 Play Time)'],
    ['전치사 to (to + 명사)', '‘~로, ~에게’ — to 뒤에 장소 · 사람', 'I went **to the park** to jog. / I sent a card **to my grandma**.'],
    ['for + 명사', '‘~을 위해, ~을 구하러’ — for 뒤에는 명사만', 'I went to the store **for some milk**. = I went to the store **to buy** some milk. / for **meet** ✗ · for **to** learn ✗'],
    ['be going to + 동사원형', '‘~할 예정이다’ — 미래', 'I’m **going to use** drones. (본문) / Tom and Max are **going to play** together. (본문)'],
    ['be going to + 장소', '‘~로 가고 있다’ — 현재진행', 'Tom and Max are **going to the beach**. (내용정리 참고)'],
    ['want to · like to (명사적)', '‘~하는 것을’ — 목적어', 'Do you **want to meet** some of them? (본문) / I **like to travel**. (본문)']], [2300, 3300, 4038], m),
  ...D.infoBox('구별 3단계', [
    '① to 뒤를 본다 → 동사원형이면 {{to부정사}}, 명사(장소 · 사람)면 {{전치사}}',
    '② for 뒤에는 {{명사}}만 → 동사로 목적을 말하려면 for가 아니라 to',
    '③ be going to 뒤 동사원형 = {{미래}}(~할 예정) / 장소 = 가는 중'], m),
  ...D.trick('Peter의 촬영 날 (같은 to, 다른 정체)', ['아침: Peter is going to the beach. — 해변으로 가는 중(장소)',
    '도착: He is going to use drones. — 드론을 쓸 예정(미래)',
    '이유: He uses drones to capture happy moments. — 담기 위해(목적)',
    '점심: He goes to the store for some snacks. — 간식을 사러(for + 명사)']),
  ...D.examPoint([
    { q: 'I went to the store {{for}} some milk. = I went to the store {{to buy}} some milk.', why: 'for + 명사 / to + 동사원형' },
    { q: 'Tom and Max are going to {{play}} together with a ball on the beach.', why: 'be going to + 동사원형 = 미래 (본문)' }], m),
  ...D.caution(['for meet ✗ · for to learn ✗(Grammar Build Up Part 4)는 ‘for + 동사’ 오류 — 목적을 동사로 말할 때는 to만 쓴다.',
    'be going to 뒤에 -ing를 쓰는 오류(going to playing ✗)와 be going to + 장소(가는 중)를 구별하게 한다(내용정리 Grammar+ will vs. be going to).',
    '‘밑줄 친 to의 쓰임이 다른 것’은 전치사 to(walked to school)를 정답으로 숨기는 경우가 많다.',
    'go for a walk · go to the park to jog처럼 for와 to가 한 문장에 함께 나오는 문장을 활용한다.'], m),
  ...D.drill(3, '닮은꼴 to 구별', [
    { level: 'Basic ①', type: 'choice', instr: '괄호 안에서 알맞은 것을 고르시오.', items: [
      { q: 'I went to the store (to / for) some milk.', a: 'for', why: 'for + 명사' },
      { q: 'I went to the store (to / for) buy some milk.', a: 'to', why: 'to + 동사원형' },
      { q: 'I’m going to (use / using) drones.', a: 'use', why: 'be going to + 동사원형 (본문)' },
      { q: 'We are going (for / to) the beach now.', a: 'to', why: '전치사 to + 장소 — 가는 중' },
      { q: 'She went to the library (to / for) a book about iguanas.', a: 'for', why: 'for + 명사 (Grammar Build Up 변형)' },
      { q: 'He called his friend (to / for) ask for help.', a: 'to', why: 'to + 동사원형 (Grammar Build Up)' },
      { q: 'Do you want (meeting / to meet) some of them?', a: 'to meet', why: 'want + to부정사 (본문)' },
      { q: 'I like (travel / to travel) and enjoy challenges.', a: 'to travel', why: 'like + to부정사 (본문)' },
      { q: 'Let’s go (for / to) a walk after lunch.', a: 'for', why: 'go for a walk' },
      { q: 'They are going to (visit / visited) their uncle this weekend.', a: 'visit', why: 'be going to + 동사원형' }] },
    { level: 'Basic ②', type: 'fill', instr: '<보기>에서 알맞은 말을 골라 빈칸에 쓰시오. (한 번씩만 사용)',
      bogi: ['travel', 'going', 'for', 'visit', 'meet', 'use', 'go', 'buy', 'to', 'play'], items: [
      { q: 'I’m going to [[use]] drones.', why: '본문' },
      { q: 'Tom and Max are going to [[play]] together with a ball on the beach.', why: '본문' },
      { q: 'Do you want to [[meet]] some of them?', why: '본문' },
      { q: 'I like to [[travel]] and enjoy challenges.', why: '본문' },
      { q: 'I went to the bakery [[for]] some bread.', why: 'for + 명사' },
      { q: 'I went to the bakery to [[buy]] some bread.', why: 'to + 동사원형' },
      { q: 'Tom and Max are [[going]] to the beach.', why: '가는 중 (현재진행)' },
      { q: 'Let’s [[go]] to the park to jog.', why: 'Let’s + 동사원형 (교과서 Play Time)' },
      { q: 'I sent a birthday card [[to]] my grandmother.', why: '전치사 to + 사람' },
      { q: 'We are going to [[visit]] the museum tomorrow.', why: '미래' }] },
    { level: 'Intermediate', type: 'write', instr: '어법상 틀린 부분을 찾아 바르게 고쳐 쓰시오.', items: [
      { q: 'I went to the store for buy some milk.', a: 'for → to', why: 'for + 동사 ✗' },
      { q: 'I cleaned the kitchen for help my mom.', a: 'for → to', why: 'Grammar Build Up' },
      { q: 'I’m going to using drones.', a: 'using → use', why: 'be going to + 동사원형' },
      { q: 'Tom and Max are going to playing together.', a: 'playing → play', why: '본문 변형' },
      { q: 'Do you want meeting some of them?', a: 'meeting → to meet', why: 'want + to부정사 (본문)' },
      { q: 'She went to the market for to buy some fish.', a: 'for to → to', why: 'for to ✗' },
      { q: 'I went to a store to some milk.', a: 'to → for (또는 to buy)', why: 'to + 명사(milk) = 목적 ✗' },
      { q: 'We are going to visited our uncle.', a: 'visited → visit', why: 'be going to + 동사원형' },
      { q: 'I want to being a pilot.', a: 'being → be', why: 'to + 동사원형' },
      { q: 'He is going to the library read books.', a: 'read → to read', why: '목적 to 빠뜨림' }] },
    { level: 'Advanced · 모두 고르기', type: 'multi', free: true, instr: '해당하는 것을 모두 골라 기호를 쓰시오.', items: [
      { q: '밑줄 친 to가 to부정사(to + 동사원형)의 to인 것을 모두 고르시오.', box: [
        '(a) I went __to__ the park.', '(b) I went to the park __to__ jog.', '(c) Give this letter __to__ Jim.',
        '(d) I’m going __to__ use drones.', '(e) She wants __to__ be a chef.'], a: '(b), (d), (e)', why: '(a) (c) 전치사 to + 명사' },
      { q: '다음 중 어법상 옳은 문장을 모두 고르시오.', box: [
        '(a) I went to the store for some milk.', '(b) I went to the store for buy some milk.', '(c) We are going to the beach.',
        '(d) I’m going to calling you.', '(e) He went out for a walk.'], a: '(a), (c), (e)', why: '(b) to buy (d) call' },
      { q: '밑줄 친 부분에 대한 설명으로 옳은 것을 모두 고르시오.', box: [
        '(a) Tom and Max are __going to play__ together. → ‘놀 예정이다’라는 미래의 뜻이다.',
        '(b) They are __going to the beach__. → ‘해변에 갈 예정이다’라는 뜻만 나타낸다.',
        '(c) I went to the store __for__ some milk. → for 뒤에는 명사가 온다.',
        '(d) Do you want __to meet__ them? → want의 목적어로 쓰인 to부정사이다.',
        '(e) I went to the park __to__ jog. → to 뒤에 장소가 왔으므로 전치사이다.'], a: '(a), (c), (d)', why: '(b) ‘가는 중이다’ (e) to + 동사원형 jog = to부정사' },
      { q: '다음 글의 밑줄 친 ⓐ~ⓔ 중 어법상 어색한 것을 모두 골라 기호를 쓰고 바르게 고치시오.', fix: true, label: '기호 / 고친 것', box: [
        'I’m Peter. Today, Tom and Max are going to ⓐ __play__ together on the beach. I’m going to ⓑ __using__ drones ⓒ __to capture__ their happy moments. After the shooting, I’ll go to the store ⓓ __for buy__ some snacks. Then I’ll go ⓔ __to__ the hotel.'],
        a: 'ⓑ → use, ⓓ → to buy (또는 for)', why: 'ⓑ be going to + 동사원형 ⓓ for + 동사 ✗' }] },
    { level: 'Advanced · 객관식', type: 'mcq', free: true, instr: '알맞은 답을 고르시오.', items: [
      { q: '다음 빈칸에 들어갈 말로 알맞은 것은? — I went to the bakery ______ some bread.', opts: [
        'to', 'for', 'at', 'by', 'with'], a: '②', why: 'for + 명사 ‘~을 사러’ (to some bread ✗)' },
      { q: '다음 중 밑줄 친 to의 쓰임이 나머지와 다른 것은?', opts: [
        'I want __to__ be a pilot.', 'She went out __to__ buy milk.', 'I’m going __to__ use drones.',
        'We walked __to__ school.', 'He hopes __to__ see you.'], a: '④', why: '④ 전치사 to + 명사 — 나머지는 to + 동사원형' },
      { q: '다음 우리말을 영어로 바르게 옮긴 것은? — Tom과 Max는 해변에서 함께 놀 예정이다.', opts: [
        'Tom and Max are going to play together on the beach.', 'Tom and Max are going to playing together on the beach.', 'Tom and Max are going play together on the beach.',
        'Tom and Max is going to play together on the beach.', 'Tom and Max going to play together on the beach.'], a: '①', why: '본문 — be going to + 동사원형 · 복수 주어 are' },
      { q: '다음 중 어법상 어색한 문장은?', opts: [
        'I went to the store for some milk.', 'We are going to the beach.', 'She is going to visit her uncle.',
        'I went to the park to jog.', 'He went to the library for read books.'], a: '⑤', why: '⑤ to read (또는 for books)' },
      { q: '(A)~(C)에 알맞은 말이 바르게 짝지어진 것은? — I went to the mall (A)(for / to) buy a cap. / I went to the mall (B)(for / to) a cap. / I’m going to (C)(meet / meeting) Jim there.', opts: [
        'for – to – meet', 'to – to – meeting', 'to – for – meet', 'for – for – meeting', 'to – for – meeting'], a: '③', why: '(A) to + 동사원형 (B) for + 명사 (C) be going to + 동사원형' }] },
    { level: '영작', type: 'write', instr: '우리말과 같은 뜻이 되도록 괄호 안의 말을 이용하여 영작하시오.', items: [
      { q: '나는 빵을 좀 사기 위해 빵집에 갔다. (bakery, buy, some bread)', a: 'I went to the bakery to buy some bread.', why: '교과서 Use It' },
      { q: '나는 나의 개를 산책시키기 위해 공원에 갔다. (park, walk my dog)', a: 'I went to the park to walk my dog.', why: '교과서 Use It' },
      { q: '나는 운동하기 위해 체육관에 갔다. (gym, work out)', a: 'I went to the gym to work out.', why: '교과서 Use It' },
      { q: '많은 사람들이 이 영화를 만들기 위해 열심히 일하고 있다. (a lot of, work hard, create)', a: 'A lot of people are working hard to create this movie.', why: '본문 — 현재진행형' },
      { q: '그들의 행복한 순간을 포착하기 위해, 나는 드론을 사용할 것이다. (capture, be going to, drones)', a: 'To capture their happy moments, I’m going to use drones.', why: '본문' },
      { q: '그래서 나는 그를 진정시키기 위해 수신호를 사용한다. (hand signals, calm)', a: 'So, I use hand signals to calm him.', why: '본문' },
      { q: '더 좋은 이야기를 만들기 위해서, 나는 장면의 순서를 바꿀 수 있다. (create, a better story, change, order)', a: 'To create a better story, I can change the order of scenes.', why: '본문' },
      { q: '그녀는 시험에 합격하기 위해 열심히 공부한다. (study, pass the exam)', a: 'She studies hard to pass the exam.', why: '3인칭 단수 studies' },
      { q: '그는 기차를 잡기 위해 일찍 떠났다. (in order to, catch)', a: 'He left early in order to catch the train.', why: 'Grammar Build Up' },
      { q: '그녀는 첫 기차를 타기 위해 일찍 일어났다. (get up, catch, first train)', a: 'She got up early to catch the first train.', why: 'Grammar Build Up' }] },
  ], m),

  // ---------------- PERFECT CHECK ----------------
  D.section('PERFECT CHECK', '상위권 함정 체크'),
  ...D.drill(null, '', [{ level: '함정', type: 'choice', instr: '실수하기 쉬운 문장들이에요. 괄호 안에서 알맞은 것을 고르시오.', items: [
    { q: 'A lot of people are working hard (to create / creating) this movie.', a: 'to create', why: '본문 — 목적' },
    { q: '(To capture / Capture) their happy moments, I’m going to use drones.', a: 'To capture', why: '본문 — 문장 앞 목적' },
    { q: 'I go to school (for to learn / to learn) English.', a: 'to learn', why: 'for to ✗' },
    { q: 'My job is (to find / finds) perfect places for shooting.', a: 'to find', why: '본문 — 보어(명사적)' },
    { q: 'She put on a warm jacket (not to / to not) catch a cold.', a: 'not to', why: '부정은 not to' },
    { q: 'I went to the store (to / for) some milk.', a: 'for', why: 'for + 명사' },
    { q: 'To (breathing / breathe) fresh air, he often goes to the forest.', a: 'breathe', why: '예상 2회 — to + 동사원형' },
    { q: 'We were sad (to hear / hearing) the news.', a: 'to hear', why: '감정의 원인 (예상 2회)' },
    { q: 'Max gets too excited when a lot of people (will be / are) around.', a: 'are', why: '본문 — 시간 부사절 현재시제(같은 과 문법)' },
    { q: 'My work begins (before / after) the shooting is over.', a: 'after', why: '본문 — 촬영이 끝난 ‘후에’(같은 과 문법)' }] }], m),

  // ---------------- WRITE ----------------
  D.section('WRITE', '서술형 대비'),
  ...D.writeItem(1, 'Basic', '괄호 안의 단어를 알맞은 형태로 바꾸어 쓰시오.', ['A lot of people are working hard (create) this movie. (본문)'], { a: 'to create', why: '목적 — to + 동사원형' }, m),
  ...D.writeItem(2, 'Basic', '괄호 안의 단어를 알맞은 형태로 바꾸어 쓰시오.', ['So, I use hand signals (calm) him. (본문)'], { a: 'to calm', why: '목적 — 동사가 두 개 ✗' }, m),
  ...D.writeItem(3, 'Intermediate', 'to부정사를 사용하여 두 문장을 한 문장으로 연결하시오. [두 문장 연결]', ['I’m saving money.', 'I want to buy new clothes.'],
    { a: 'I’m saving money to buy new clothes.', why: 'PRE-STEP 주관식 — want to 대신 목적의 to' }, m),
  ...D.writeItem(4, 'Intermediate', 'to부정사를 사용하여 두 문장을 한 문장으로 연결하시오. [두 문장 연결]', ['Jennifer uses hand signals.', 'She wants to calm Max when he gets too excited.'],
    { a: 'Jennifer uses hand signals to calm Max when he gets too excited.', why: '본문 변형 — 목적의 to + 시간 접속사 when' }, m),
  ...D.writeItem(5, 'Intermediate', 'To로 시작하는 문장으로 바꾸어 쓰시오. [문장 전환]', ['I’m going to use drones to capture their happy moments.'],
    { a: 'To capture their happy moments, I’m going to use drones.', why: '본문 — 문장 앞 + 콤마' }, m),
  ...D.writeItem(6, 'Intermediate', 'in order to를 사용하여 같은 뜻의 문장으로 바꾸어 쓰시오. [문장 전환]', ['To create a better story, I can change the order of scenes.'],
    { a: 'In order to create a better story, I can change the order of scenes.', why: '본문 — 내용정리 전환 (So as to도 같은 뜻)' }, m),
  ...D.writeItem(7, 'Advanced', '그림의 내용을 보고 <조건>에 맞게 대답을 완성하시오.', ['지수: 도서관 — 책을 읽기 위해', 'A: Why did Jisu go to the library?', '<조건> there, read를 사용할 것 · 대명사 She로 시작할 것 · 총 5단어'],
    { a: 'She went there to read.', why: '교과서 Wrap Up 8 e.g. — 5단어 (She/went/there/to/read)' }, m),
  ...D.writeItem(8, 'Advanced', '<보기>의 단어를 배열하여 우리말과 같은 뜻의 문장을 완성하시오.', ['그녀는 산책하기 위해 공원에 갔다.', '<보기> (to / a / went / park / the / to / she / walk / take)'],
    { a: 'She went to the park to take a walk.', why: 'Grammar Build Up — 전치사 to + 장소 / to + 동사원형' }, m),
  ...D.writeItem(9, 'Advanced', '어법상 틀린 부분 2개를 찾아 바르게 고치고, 그 이유를 쓰시오.', ['The girl listens to music to relaxing. Then she goes to the store for buy some milk.'],
    { a: '① to relaxing → to relax  ② for buy → to buy (또는 for some milk)', why: '① to부정사는 to + 동사원형 ② for 뒤에는 명사가 오므로 동사로 목적을 나타내려면 to + 동사원형을 쓴다', blanks: ['고친 것', '이유'] }, m),
  ...D.writeItem(10, 'Advanced', '어법상 틀린 부분 2개를 찾아 바르게 고치고, 그 이유를 쓰시오.', ['Emma is a film editor. To creates a better story, she changes the order of scenes. She reads a lot for to learn storytelling skills.'],
    { a: '① To creates → To create  ② for to learn → to learn', why: '① to 뒤에는 동사원형 ② 목적은 to + 동사원형 — for to ✗', blanks: ['고친 것', '이유'] }, m),

  // ---------------- MAP ----------------
  D.section('MAP', "DAVID'S MAP — 백지노트 테스트"),
  D.P([D.T('오늘 배운 내용을 떠올리며 빈칸을 채워 보세요. 책을 보지 않고!', { size: 18, color: '595959' })], { spacing: { after: 120 }, keepNext: true }),
  ...D.image(path.join(__dirname, 'map_G-to부정사부사_중1.png'), 620),
  ...D.table(['자가 체크 — 백지노트에 이 단어들이 들어갔나요?', '✔'], [
    ['완전한 문장 + to + 동사원형 = ~하기 위해(목적)', ''], ['문장 앞에 쓰면 콤마: To capture their happy moments, ~', ''],
    ['in order to = so as to = to (목적)', ''], ['부정: not to + 동사원형 (to not ✗)', ''],
    ['오답: for to · for + 동사 · to + -ing · to + 과거형 · to 빠뜨림', ''], ['빼 보기: 빼도 완전 → 부사적 / ‘~하는 것’ → 명사적', ''],
    ['부사적 4가지: 목적 · 감정의 원인 · 결과 · 형용사 수식', ''], ['for + 명사 / to + 장소 = 전치사 / be going to + 동사원형 = 미래', ''],
    ['본문: working hard to create · To capture · to calm · To create', ''], ['본문 명사적: want to meet · is to find · like to travel', '']], [8838, 800], m),
  ...D.memo(['다음 시간 도입: 본문 6문단에서 to부정사를 모두 찾아 ‘빼 보기’로 목적(부사적) 4개와 명사적 3개를 나누게 하기',
    '약한 반: Point 1(to + 동사원형 · 오답 5가지)만 확실히 → Point 2는 ‘빼 보기’ 하나만 → Point 3은 for + 명사 vs to + 동사원형만',
    '같은 과 시간 접속사와 함께 나오는 본문 4(to calm · when)와 본문 5(after · To create) 문장을 한 번 더 영작',
    '교과서 Use It · Wrap Up 8: Why did ~ go to ~? — She went there to ~. 짝 말하기로 두 문장 연결 연습'], m),
];
D.render(meta, build, process.argv[2] || '.').then(fs_ => {
  const out = fs_.map(f => { const g = path.join(path.dirname(f), path.basename(f).replace(TITLE, 'to부정사부사')); fs.renameSync(f, g); return g; });
  console.log(out.join('\n'));
});
