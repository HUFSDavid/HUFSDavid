const D0 = require('./david_base');
const path = require('path');
const fs = require('fs');
// 한 문장에 빈칸 ______ 이 두 개 이상이면 david_base의 __밑줄__ 서식으로 잘못 읽히므로
// 밑줄 3개 이상 이어진 빈칸은 밑줄 사이에 U+200B를 넣어 둔다 (부정대명사 스크립트와 같은 처리).
const ZB = (s) => s.replace(/_{3,}/g, (u) => u.split('').join('​'));
const deep = (v) => typeof v === 'string' ? ZB(v) : Array.isArray(v) ? v.map(deep)
  : (v && typeof v === 'object' && v.constructor === Object) ? Object.fromEntries(Object.entries(v).map(([k, x]) => [k, deep(x)])) : v;
const D = new Proxy(D0, { get: (t, k) => (typeof t[k] === 'function' && !['render', 'P', 'T', 'image'].includes(k)) ? (...a) => t[k](...deep(a)) : t[k] });
const COVER = JSON.parse(process.env.COVER || '{}');
const meta = { series: D.SERIES.G, code: 'G-sothat', title: 'so that', category: 'G. 접속사  |  목적의 so that ~ can (in order to · so as to)',
  rightText: 'G  so that', prefix: process.env.PREFIX || '', cover: COVER.title ? COVER : undefined,
  question: 'I went to the library ~~to borrow~~ some books. / It navigates roads for you ~~so that you can relax~~. — 둘 다 ‘~하기 위해서’인데, 왜 하나는 to 하나로 끝나고 하나는 so that + 주어 + can일까?' };

const build = (m) => [
  D.section('FLOW', 'Teaching Flow — 처음 배우는 사람도 따라오는 5단계'),
  ...D.step(1, '우리말로 먼저 생각하기 — ‘~하도록, ~하기 위해서’', [
    '‘네가 쉬면서 주행을 즐길 수 있도록, 자율 주행차가 길을 찾아 준다.’ — 뒷부분은 앞 행동을 하는 {{목적}}이다.',
    '우리말은 ‘~하도록, ~하기 위해서’를 문장 끝에 붙이면 되지만, 영어는 목적을 이끄는 접속사 {{so that}}을 쓰고 그 뒤에 문장(주어 + 동사)을 이어 붙인다.'], m),
  ...D.step(2, '이전 단원 복습 — to부정사의 부사적 용법(목적)', [
    'I went to the library {{to borrow}} some books. — 도서관에 간 사람도, 책을 빌리는 사람도 ‘나’ (주어가 하나)',
    '주어가 하나일 때는 to + 동사원형으로 충분하다. 그렇다면 목적 부분의 주어가 다르다면?'], m),
  ...D.step(3, '문제 제기 — 행동하는 사람이 둘이라면?', [
    'The car navigates roads for you. + **You** can relax and enjoy the ride.',
    '길을 찾는 것은 차, 쉬는 것은 ‘당신’. 주어가 다른 두 문장을 ‘~하도록’으로 이으려면 어떻게 할까?'], m),
  ...D.step(4, '규칙 발견 — so that + 주어 + can + 동사원형', [
    'It can navigate roads for you {{so that}} you can relax and enjoy the ride. (본문)',
    'so that 뒤에는 완전한 절: 주어(you) + {{can}} + 동사원형 / 주절이 과거면 시제를 맞춰 {{could}} (I practiced singing so that I could join a band.)'], m),
  ...D.step(5, '결론 🔑', [
    '목적 = so that + 주어 + can/will + 동사원형 (‘~하도록, ~하기 위해서’) = {{in order that}} ~ / 주어가 같으면 to V = in order to V = {{so as to}} V / 부정은 so that ~ not = in order {{not to}} V / so + 형용사 + that은 {{결과}}(매우 ~해서)'], m),
  ...D.infoBox('오늘의 핵심 3문장', [
    '① It can navigate roads for you {{so that}} you can relax and enjoy the ride. (본문)',
    '② They find survivors, deal with dangers, and clear routes so that people {{can escape}} to safety. (본문)',
    '③ I practiced singing so that I {{could}} join a band. (교과서)'], m),
  ...D.tip(['칠판에 [주절] → so that → [주어] → [can + 동사원형] 네 칸을 그리고, 본문 두 문장을 칸에 나눠 넣게 한다. 주어 칸이 비면 ✗, 주절이 과거면 can 칸이 could로 바뀐다는 것을 눈으로 확인시킨다.',
    '같은 과 문법 가정법 과거와 함께 출제되므로(기출 39·40번처럼 한 문항에 섞임) PERFECT CHECK에 가정법 과거 2문항을 섞어 두었다. 결과의 so ~ that · too ~ to · enough to는 Point 3에서 ‘목적과 구별’ 중심으로 다룬다.'], m),

  // ---------------- Point 1 ----------------
  D.section('Point 1', '목적의 so that — so that + 주어 + can/will + 동사원형 · 시제 일치', 'point'),
  ...D.table(['구성', '역할 · 설명', '예'], [
    ['so that + 주어 + can + 동사원형', '‘…가 ~할 수 있도록, ~하기 위해서’ — 목적', 'It can navigate roads for you **so that you can relax** and enjoy the ride. (본문)'],
    ['that 뒤 주어 생략 ✗', 'so that 뒤는 절 → 주어 + 동사가 꼭 있어야 한다', 'Please speak louder so that **we** can hear you. (so that can hear ✗) (기출)'],
    ['시제 일치', '주절 현재 · 미래 · 명령문 → can · will / 주절 과거 → **could · would**', 'I practiced singing so that I **could** join a band. (교과서)'],
    ['will · may · 현재시제', '조동사 will · may(격식)나 현재시제도 쓸 수 있다', 'Let’s start early so that we **may** arrive before dark. (워크북)'],
    ['in order that', 'so that과 같은 뜻 — that 뒤에 역시 주어 + 동사', 'Please turn off the light **in order that** we can go to sleep. (기출)']], [2300, 3300, 4038], m),
  ...D.infoBox('so that 문장 만들기 3단계', [
    '① 앞 행동(주절) 쓰기: They clear routes',
    '② 목적의 주어 쓰기: so that {{people}} (주어 생략 ✗)',
    '③ can + 동사원형 — 주절이 과거면 {{could}}: They cleared routes so that people could escape to safety.'], m),
  ...D.trick('쏘댓 뒤엔 주·캔·동!', ['“so that 뒤엔 주캔동 — 주어, can, 동사원형!”', '“주절이 과거면 can도 과거 — 쿨하게 could!”']),
  ...D.examPoint([
    { q: 'They find survivors, deal with dangers, and clear routes {{so that}} people can escape to safety.', why: '사람들이 탈출할 수 있도록 — 목적 (본문 기출)' },
    { q: 'I practiced singing so that I {{could}} join a band. (can ✗)', why: '주절 과거(practiced) → could (교과서)' }], m),
  ...D.caution(['주절이 과거인데 can · will을 그대로 둔 선지(Jim got up early so that he can catch the first bus ✗)가 가장 흔한 오답이다. (기출)',
    'so that 뒤 주어를 뺀 선지(so that can hear you ✗), 조동사 뒤 형태 오류(could have get ✗)가 함께 나온다. (기출)',
    'in order to + 절(in order to he could sleep ✗), in that(✗)처럼 접속사 모양을 바꾼 선지 — that절이면 so that · in order that만 ○ (기출)',
    '흐름상 어색한 목적을 고르는 문항(Please turn off the light so that she can bake cookies ✗) — 앞 행동과 목적이 이어지는지 해석으로 확인시킨다. (기출)'], m),
  ...D.drill(1, '목적의 so that — 형태 · 시제 일치', [
    { level: 'Basic ①', type: 'choice', instr: '괄호 안에서 알맞은 것을 고르시오.', items: [
      { q: 'With cameras, sensors, and software, it can navigate roads for you (so as / so that) you can relax.', a: 'so that', why: '뒤에 주어 + 동사(you can relax) → so that (본문)' },
      { q: 'They clear routes so that people (can escape / escaping) to safety.', a: 'can escape', why: 'so that + 주어 + can + 동사원형 (본문)' },
      { q: 'I’ll do something so that she (can / could) cheer up.', a: 'can', why: '주절 미래(I’ll) → can (교과서)' },
      { q: 'I practiced singing so that I (can / could) join a band.', a: 'could', why: '주절 과거 → could (교과서)' },
      { q: 'Please speak louder so that (can hear / we can hear) you.', a: 'we can hear', why: 'that 뒤 주어 필수 (기출)' },
      { q: 'We sat at the front so that we (could / can) see the stage well.', a: 'could', why: '주절 과거(sat) → could (교과서)' },
      { q: 'I’ll draw a picture of the leaf so that it can never (fall / falls).', a: 'fall', why: '조동사 can + 동사원형 (교과서)' },
      { q: 'Jim got up early so that he (could / can) catch the first bus.', a: 'could', why: '주절 과거(got up) → could (기출)' },
      { q: 'Please turn off the light (in order to / in order that) we can go to sleep.', a: 'in order that', why: '뒤에 절 → in order that (기출)' },
      { q: 'I hurried so that I (won’t / wouldn’t) be late for school.', a: 'wouldn’t', why: '주절 과거(hurried) → would not (워크북)' }] },
    { level: 'Basic ②', type: 'fill', instr: '<보기>에서 알맞은 말을 골라 빈칸에 쓰시오. (한 번씩만 사용)',
      bogi: ['so', 'that', 'could', 'can', 'order', 'wouldn’t', 'relax', 'healthy', 'get', 'may'], items: [
      { q: 'It can navigate roads for you so that you can [[relax]] and enjoy the ride.', why: '본문 — can + 동사원형' },
      { q: 'Some people exercise regularly so that they can stay [[healthy]].', why: '교과서 — stay + 형용사' },
      { q: 'I donated my allowance so that people in need could [[get]] help.', why: '교과서 — could + 동사원형' },
      { q: 'I practiced singing so that I [[could]] join a band.', why: '교과서 — 주절 과거 → could' },
      { q: 'Be sure to get enough sleep so that you [[can]] focus during class.', why: '교과서 — 명령문 → can' },
      { q: 'Search-and-rescue robots clear routes [[so]] that people can escape to safety.', why: '본문 — so that' },
      { q: 'Turn the music down so [[that]] I can read the book.', why: '워크북 — so that' },
      { q: 'We went early in [[order]] that we could get good seats.', why: '워크북 — in order that = so that' },
      { q: 'I hurried so that I [[wouldn’t]] be late. (늦지 않도록)', why: '워크북 — 주절 과거, 부정 → wouldn’t' },
      { q: 'Let’s start early so that we [[may]] arrive before dark.', why: '워크북 — may(격식)도 가능' }] },
    { level: 'Intermediate', type: 'write', instr: '어법상 틀린 부분을 찾아 바르게 고쳐 쓰시오.', items: [
      { q: 'It can navigate roads for you so as to you can relax and enjoy the ride.', a: 'so as to → so that', why: '본문 기출 — 뒤에 주어 + 동사' },
      { q: 'Jim got up early so that he can catch the first bus.', a: 'can → could', why: '기출 — 주절 과거' },
      { q: 'Please speak louder so that can hear you.', a: 'so that can → so that we can', why: '기출 — that 뒤 주어 필수' },
      { q: 'We stayed inside so that we could have get some rest.', a: 'could have get → could get', why: '기출 — could + 동사원형' },
      { q: 'We spoke quietly in order to he could sleep.', a: 'in order to → so that(in order that)', why: '기출 — 뒤에 절' },
      { q: 'I locked the door in that nobody could enter the room.', a: 'in that → so that(in order that)', why: '기출 — 목적의 접속사' },
      { q: 'They clear routes so that people can escaping to safety.', a: 'escaping → escape', why: '본문 — can + 동사원형' },
      { q: 'I’ll draw a picture of the leaf so that it can never falls.', a: 'falls → fall', why: '교과서 — 조동사 뒤 동사원형' },
      { q: 'He went to the post office so that he can send a parcel.', a: 'can → could', why: '기출 — 주절 과거(went)' },
      { q: 'I donated my allowance so that people in need can get help.', a: 'can → could', why: '교과서 — 주절 과거(donated)' }] },
    { level: 'Advanced · 모두 고르기', type: 'multi', free: true, instr: '해당하는 것을 모두 골라 기호를 쓰시오.', items: [
      { q: '다음 중 어법상 옳은 문장을 모두 고르시오.', box: [
        '(a) Please speak louder so that can hear you.', '(b) Jim got up early so that he could catch the first bus.', '(c) We sat at the front so that we could see the stage well.',
        '(d) He went to the post office so that he can send a parcel.', '(e) Please turn on the light so that we can find the key on the floor.'], a: '(b), (c), (e)', why: '(a) that 뒤 주어 we 필요 (d) 주절 과거 → could (기출)' },
      { q: '밑줄 친 부분에 대한 설명으로 옳은 것을 모두 고르시오.', box: [
        '(a) It can navigate roads for you __so that__ you can relax. → ‘~하도록, ~하기 위해서’라는 목적을 나타낸다.',
        '(b) I practiced singing so that I __could__ join a band. → 주절이 과거이므로 시제를 맞춰 could를 썼다.',
        '(c) They clear routes so that __people__ can escape to safety. → so that절의 주어이므로 생략할 수 있다.',
        '(d) Please turn off the light __in order that__ we can go to sleep. → in order to로 바꿔 써도 된다.',
        '(e) I’ll draw a picture of the leaf so that it can never __fall__. → 조동사 can 뒤라서 동사원형을 썼다.'], a: '(a), (b), (e)', why: '(c) that절의 주어는 생략 ✗ (d) 뒤에 절 → in order to ✗' },
      { q: '다음 대화의 밑줄 친 ⓐ~ⓔ 중 어법상 어색한 것을 모두 골라 기호를 쓰고 바르게 고치시오.', fix: true, label: '기호 / 고친 것', box: [
        'A: Why did you get up early today? — B: I got up early ⓐ __so that I could catch__ the first bus.',
        'A: Why are you saving money? — B: I’m saving money ⓑ __so that I can buy__ a new bike.',
        'A: Why did you turn off the TV? — B: I turned it off ⓒ __so that my brother can study__.',
        'A: What does a self-driving car do? — B: It navigates roads ⓓ __so that you can relaxing__.',
        'A: Why did the teacher speak up? — B: She spoke up ⓔ __so that every student could hear__ her.'], a: 'ⓒ can → could, ⓓ relaxing → relax', why: 'ⓒ 주절 과거(turned) → could ⓓ can + 동사원형' },
      { q: '빈칸에 so that이 들어갈 수 있는 것을 모두 고르시오.', box: [
        '(a) My family went to the beach ______ my parents first met.', '(b) She called Tom ______ she could invite him to dinner.', '(c) I went to the library ______ borrow some books.',
        '(d) He swims every morning ______ he can stay healthy.', '(e) I donated my allowance ______ people in need could get help.'], a: '(b), (d), (e)', why: '(a) 장소 → where (c) 뒤에 동사원형 → to(in order to) (기출 27 변형)' },
      { q: '다음 중 문장의 흐름(목적)이 자연스러운 것을 모두 고르시오.', box: [
        '(a) Our team will practice hard so that we can win the race.', '(b) Please turn off the light so that she can bake cookies at home.', '(c) I want a robot cook so that the automatic process of driving cars can be easier.',
        '(d) Be sure to get enough sleep so that you can focus during class.', '(e) I’ll teach him sign language so that he can communicate with others.'], a: '(a), (d), (e)', why: '(b) 불을 끄는 것과 쿠키 굽기 ✗ (c) 요리 로봇과 운전 ✗ (기출 37·38)' }] },
    { level: 'Advanced · 객관식', type: 'mcq', free: true, instr: '알맞은 답을 고르시오.', items: [
      { q: '다음 우리말을 바르게 영작한 것은? — 그녀가 기운을 낼 수 있도록 내가 무언가를 하겠어.', opts: [
        'I’ll do something so that can cheer up.', 'I’ll do something in order to she can cheer up.', 'I’ll do something so that she can cheer up.',
        'I’ll do something so as to she can cheer up.', 'I’ll do something so that she can cheers up.'], a: '③', why: 'so that + 주어 + can + 동사원형 (교과서)' },
      { q: '다음 중 빈칸에 들어갈 말이 나머지 넷과 다른 것은?', opts: [
        'She called Tom ______ she could invite him to dinner.', 'He swims every morning ______ he can stay healthy.', 'I will draw a picture of the leaf ______ it can never fall.',
        'I donated my allowance ______ people in need could get help.', 'My family went to the beach ______ my parents first met.'], a: '⑤', why: '⑤ where (장소) / 나머지 so that (기출 27)' },
      { q: '다음 중 어법상 어색한 것은?', opts: [
        'I went to the library so that I could borrow some books.', 'Narae turned off the TV so that she can read a book.', 'We went up to the top floor so that we could see the view.',
        'She swims every morning so that she can stay healthy.', 'I went to the tourist information center so that I could get a city map.'], a: '②', why: '② 주절 과거(turned off) → could (기출 39 변형)' },
      { q: '(A)~(C)에 알맞은 말이 바르게 짝지어진 것은? — (A) Minho ran fast so that he (can / could) catch the bus. (B) Please step aside so that I (can / could) pass by. (C) It can navigate roads for you so that you can (relax / relaxing).', opts: [
        'can – can – relax', 'could – could – relaxing', 'can – could – relax', 'could – can – relax', 'could – can – relaxing'], a: '④', why: '(A) 주절 과거 (B) 명령문 → can (C) 동사원형' },
      { q: '다음 중 어법상 틀린 문장의 개수는?', box: [
        '(a) Please speak louder so that can hear you.', '(b) Tom got up early so that he could catch the first bus.', '(c) We stayed inside so that we could have get some rest.',
        '(d) Call me so that we can talk about this problem.', '(e) He went to the post office so that he can send a parcel.'], opts: ['1개', '2개', '3개', '4개', '5개'], a: '③', why: '(a) 주어 we (c) could get (e) could — 3개 (기출 45)' }] },
    { level: '전환 · 연결', type: 'write', instr: '두 문장을 so that을 사용하여 한 문장으로 연결하시오. (시제에 주의)', items: [
      { q: 'They practiced hard. They wanted to be able to win the game.', a: 'They practiced hard so that they could win the game.', why: '워크북 — 주절 과거 → could' },
      { q: 'Mike took a taxi. He wanted to be able to arrive there in time.', a: 'Mike took a taxi so that he could arrive there in time.', why: '워크북' },
      { q: 'I sent them an e-mail. I wanted to be able to ask some questions.', a: 'I sent them an e-mail so that I could ask some questions.', why: '워크북' },
      { q: 'Turn down the volume. I want to be able to sleep.', a: 'Turn down the volume so that I can sleep.', why: '워크북 — 명령문 → can' },
      { q: 'It can navigate roads for you. You can relax and enjoy the ride.', a: 'It can navigate roads for you so that you can relax and enjoy the ride.', why: '본문' },
      { q: 'They clear routes. People can escape to safety.', a: 'They clear routes so that people can escape to safety.', why: '본문' },
      { q: 'The teacher spoke up. Every student could hear him.', a: 'The teacher spoke up so that every student could hear him.', why: '기출 49' },
      { q: 'He saved money. He could buy a bike.', a: 'He saved money so that he could buy a bike.', why: '기출 49' },
      { q: 'The girl bought two dolls. Her sister could have one.', a: 'The girl bought two dolls so that her sister could have one.', why: '기출 49' },
      { q: 'They opened the door. I could go into the room.', a: 'They opened the door so that I could go into the room.', why: '워크북 — 주어가 달라도 so that으로 연결' }] },
  ], m),

  // ---------------- Point 2 ----------------
  D.section('Point 2', '전환 — in order that · to V · in order to · so as to · for + 목적격 · 부정 not to', 'point'),
  ...D.table(['전환', '조건 · 설명', '예'], [
    ['so that ~ = in order that ~', '뒤에 절(주어 + 동사) 그대로', 'I saved money so that I could buy a car. = I saved money **in order that** I could buy a car. (워크북)'],
    ['주어가 같을 때 → to V · in order to V · so as to V', 'that절의 주어와 조동사를 지우고 to + 동사원형', '= I saved money **to buy** a car. = **in order to buy** = **so as to buy** (워크북)'],
    ['주어가 다를 때 → in order for + 목적격 + to V', 'to부정사의 의미상 주어를 for + 목적격으로 남긴다', 'We spoke quietly so that the baby could sleep. = We spoke quietly **in order for the baby to sleep**. (교과서 Grammar✚)'],
    ['부정: so that ~ not', '= in order not to V = so as not to V — not은 to 앞', 'I hurried so that I wouldn’t be late. = I hurried **in order not to** be late. (워크북)'],
    ['주어가 다른데 so as to ✗', '목적의 주어가 사라져 뜻이 바뀐다', 'They clear routes so that people can escape. = ~ **for people to escape** (so as to escape ✗) (기출)']], [2600, 3000, 4038], m),
  ...D.infoBox('전환 3단계 — 주어부터 확인!', [
    '① 주절의 주어와 that절의 주어가 같은지 확인: I saved money so that I could buy a car. → 둘 다 {{I}}',
    '② 같으면 주어 + could를 지우고 to + 동사원형: to buy / in order to buy / {{so as to}} buy',
    '③ 다르면 for + 목적격을 남긴다: in order {{for the baby}} to sleep / 부정은 not을 to 앞에: in order {{not to}} be late'], m),
  ...D.trick('같으면 싹, 다르면 for!', ['“주어 같으면 싹 지우고 to, 다르면 for 붙여 남긴다!”', '“낫투(not to) — not은 to 앞에 줄 선다!”']),
  ...D.examPoint([
    { q: 'Jason eats an orange every morning {{so as to}} get some vitamin C. (= so that he can get)', why: '주어가 같음 → so as to + 동사원형 (기출 28)' },
    { q: 'The robot clears routes {{for you}} to escape to safety. (= so that you can escape)', why: '주어가 다름 → for + 목적격 + to V (기출 46)' }], m),
  ...D.caution(['의미가 다른 선지 찾기: as he can get some vitamin C ✗(기출 28), so that she would be late ✗(not이 빠짐, 기출 46) — 전환 후 부정어가 살아 있는지 확인.',
    '주어가 다른데 so as to로 바꾼 선지(They clear routes so as to escape ✗ — 탈출하는 것은 people)가 본문 기출로 나왔다. (기출 133)',
    'in order to + 절, so as to + 주어 + 동사, in order to not(✗ → in order not to)이 형태 오답 단골이다. (학교 시험은 not to 순서만 정답 처리)',
    '자습서 · 기출에는 so as for us to walk도 ‘같은 뜻’으로 처리된 문항이 있다(기출 46④). 수업에서는 in order for + 목적격 + to V를 기본형으로 가르친다.'], m),
  ...D.drill(2, 'so that ↔ in order that · to V · in order to · so as to', [
    { level: 'Basic ①', type: 'choice', instr: '괄호 안에서 알맞은 것을 고르시오.', items: [
      { q: 'I saved money (in order to / in order that) buy a car.', a: 'in order to', why: '뒤에 동사원형 → in order to (워크북)' },
      { q: 'I saved money (so as to / so that) I could buy a car.', a: 'so that', why: '뒤에 주어 + 동사 → so that (워크북)' },
      { q: 'Jason eats an orange every morning (so that / so as to) get some vitamin C.', a: 'so as to', why: '뒤에 동사원형 (기출)' },
      { q: 'I hurried in order (not to / to not) be late.', a: 'not to', why: '부정 — not은 to 앞 (워크북)' },
      { q: 'We spoke quietly in order (for the baby / the baby) to sleep.', a: 'for the baby', why: '주어가 다름 → for + 목적격 (교과서 Grammar✚)' },
      { q: 'Step forward (so that / so as to) take a closer look at them.', a: 'so as to', why: '뒤에 동사원형 (교과서 Grammar✚)' },
      { q: 'He took a taxi (so as to not / so as not to) be late.', a: 'so as not to', why: '부정 so as not to' },
      { q: 'I went to the library (so that borrow / to borrow) some books.', a: 'to borrow', why: '목적의 to부정사 (워크북)' },
      { q: 'The robot clears routes (for you / you) to escape to safety.', a: 'for you', why: '의미상 주어 for + 목적격 (기출)' },
      { q: 'He stepped aside (so that / so as to) I could pass by.', a: 'so that', why: '주어가 다름(He / I) + 절 → so that (워크북)' }] },
    { level: 'Basic ②', type: 'fill', instr: '<보기>에서 알맞은 말을 골라 빈칸에 쓰시오. (한 번씩만 사용)',
      bogi: ['as', 'order', 'for', 'not', 'that', 'could', 'wouldn’t', 'to', 'us', 'in'], items: [
      { q: 'Jessica exercises hard so [[as]] to lose some weight.', why: '워크북 — so as to' },
      { q: 'They went to bed early in [[order]] to get up early in the morning.', why: '워크북 — in order to' },
      { q: 'We spoke quietly in order [[for]] the baby to sleep.', why: '교과서 Grammar✚ — 의미상 주어' },
      { q: 'He took a taxi in order [[not]] to be late.', why: '워크북 — in order not to' },
      { q: 'I saved money in order [[that]] I could buy a car.', why: '워크북 — in order that + 절' },
      { q: 'I went to Canada so that I [[could]] learn English.', why: '워크북 — 주절 과거 → could' },
      { q: 'I took off my shoes so that I [[wouldn’t]] make any noise.', why: '워크북 — 소리를 내지 않도록' },
      { q: 'Step forward so as [[to]] take a closer look at them.', why: '교과서 Grammar✚ — so as to' },
      { q: 'Turn on the flashlight in order for [[us]] to walk through the tunnel.', why: '기출 변형 — for + 목적격' },
      { q: 'Rachel bought a swimsuit [[in]] order to swim in the pool.', why: '워크북 — in order to' }] },
    { level: 'Intermediate', type: 'write', instr: '어법상 틀린 부분을 찾아 바르게 고쳐 쓰시오.', items: [
      { q: 'I saved money in order to I could buy a car.', a: 'in order to → in order that(so that)', why: '뒤에 절' },
      { q: 'Jason eats an orange every morning so as to gets some vitamin C.', a: 'gets → get', why: 'so as to + 동사원형' },
      { q: 'I hurried in order to not be late.', a: 'to not → not to', why: 'not은 to 앞' },
      { q: 'We spoke quietly in order the baby to sleep.', a: 'in order the baby → in order for the baby', why: '의미상 주어 for + 목적격' },
      { q: 'They clear routes so as to people can escape to safety.', a: 'so as to → so that', why: '본문 변형 — 뒤에 절' },
      { q: 'Step forward so as take a closer look at them.', a: 'so as → so as to', why: 'so as to + 동사원형' },
      { q: 'He took a taxi so that he would not to be late.', a: 'would not to be → would not be', why: '조동사 + 동사원형' },
      { q: 'Mary saved her money in order that travel to Europe.', a: 'in order that → in order to', why: '뒤에 동사원형' },
      { q: 'I went to the library so that borrow some books.', a: 'so that → to(in order to)', why: '뒤에 동사원형 (so that I could borrow도 ○)' },
      { q: 'She practiced skating every day so as to being good at it.', a: 'being → be', why: 'so as to + 동사원형' }] },
    { level: 'Advanced · 모두 고르기', type: 'multi', free: true, instr: '해당하는 것을 모두 골라 기호를 쓰시오.', items: [
      { q: '두 문장의 의미가 같은 것을 모두 고르시오.', box: [
        '(a) Jason eats an orange so that he can get vitamin C. = Jason eats an orange as he can get vitamin C.',
        '(b) I saved money so that I could buy a car. = I saved money in order to buy a car.',
        '(c) We spoke quietly so that the baby could sleep. = We spoke quietly in order for the baby to sleep.',
        '(d) I hurried so that I wouldn’t be late. = I hurried so that I would be late.',
        '(e) Step forward so that you can take a closer look. = Step forward so as to take a closer look.'], a: '(b), (c), (e)', why: '(a) as는 목적 ✗ (d) not이 빠져 뜻이 반대' },
      { q: '밑줄 친 부분에 대한 설명으로 옳은 것을 모두 고르시오.', box: [
        '(a) I went to the library __to borrow__ some books. → 목적을 나타내는 to부정사의 부사적 용법이다.',
        '(b) Jason eats an orange __so as to__ get vitamin C. → 뒤에 주어 + 동사가 온다.',
        '(c) We spoke quietly in order __for the baby__ to sleep. → to부정사의 의미상 주어이다.',
        '(d) I hurried __in order not to__ be late. → not은 to 뒤로 옮겨야 한다.',
        '(e) He saved money __in order that__ he could buy a bike. → so that으로 바꿔 쓸 수 있다.'], a: '(a), (c), (e)', why: '(b) so as to + 동사원형 (d) not은 to 앞이 맞다' },
      { q: '빈칸에 so as to가 들어갈 수 있는 것을 모두 고르시오.', box: [
        '(a) I studied hard ______ pass the exam.', '(b) Rachel bought a swimsuit ______ swim in the pool.', '(c) They clear routes ______ people can escape to safety.',
        '(d) He stepped aside ______ I could pass by.', '(e) Dan is taking tennis lessons ______ lose some weight.'], a: '(a), (b), (e)', why: '(c)(d) 뒤에 절 → so that' },
      { q: '다음 글(본문 변형)의 밑줄 친 ⓐ~ⓔ 중 어법상 어색한 것을 모두 골라 기호를 쓰고 바르게 고치시오.', fix: true, label: '기호 / 고친 것', box: [
        'A self-driving car doesn’t need a driver. It can navigate roads for you ⓐ __so that you can relax__ and enjoy the ride. Search-and-rescue robots go into disaster areas ⓑ __in order to find__ survivors. They clear routes ⓒ __so as to people can escape__ to safety. They also work together ⓓ __in order to not miss__ anyone. Some people expect robots to help us ⓔ __so that our lives can become__ more convenient.'],
        a: 'ⓒ so as to → so that, ⓓ in order to not → in order not to', why: 'ⓒ 뒤에 절(people can escape) ⓓ not은 to 앞' },
      { q: '<He took a taxi so that he wouldn’t be late.>와 의미가 같은 것을 모두 고르시오.', box: [
        '(a) He took a taxi in order not to be late.', '(b) He took a taxi so as not to be late.', '(c) He took a taxi so that he would be late.',
        '(d) He took a taxi in order that he wouldn’t be late.', '(e) He took a taxi so as to not late.'], a: '(a), (b), (d)', why: '(c) not 빠짐 (e) to 뒤 동사원형 be 필요 · not to 순서' }] },
    { level: 'Advanced · 객관식', type: 'mcq', free: true, instr: '알맞은 답을 고르시오.', items: [
      { q: '다음 <보기>의 밑줄 친 부분과 의미가 다른 것은?', box: ['<보기>  Jason eats an orange every morning __so that he can get some vitamin C__.'], opts: [
        'to get some vitamin C', 'so as to get some vitamin C', 'in order to get some vitamin C', 'as he can get some vitamin C', 'for some vitamin C'], a: '④', why: '④ as는 ‘~하기 때문에 · ~할 때’ — 목적 ✗ (기출 28)' },
      { q: '본문의 밑줄 친 문장과 의미가 같은 것은?', box: ['They find survivors, deal with dangers, and clear routes __so that people can escape to safety__.'], opts: [
        'They ~ clear routes for people to escape to safety.', 'They ~ clear routes so as to escape to safety.', 'They ~ clear routes in order not to escape to safety.',
        'They ~ clear routes in order that they can escape to safety.', 'They ~ clear routes so well that people can escape to safety.'], a: '①', why: '주어가 다름 → for people to escape / ② 로봇이 탈출 ③ 부정 ④ they ≠ people ⑤ 결과 (기출 133)' },
      { q: '빈칸에 들어갈 수 있는 것을 <보기>에서 모두 골라 짝지은 것은? — Please turn off the light ______ we can go to sleep.', box: ['<보기>  ⓐ to   ⓑ so that   ⓒ in order to   ⓓ in order that'], opts: [
        'ⓐ, ⓑ', 'ⓐ, ⓒ', 'ⓑ, ⓒ', 'ⓑ, ⓒ, ⓓ', 'ⓑ, ⓓ'], a: '⑤', why: '뒤에 절 → so that · in order that (기출 16)' },
      { q: '다음 중 두 문장의 의미가 같지 않은 것은?', opts: [
        'The robot clears routes for you to escape. → The robot clears routes so that you can escape.', 'She took a taxi so as not to be late. → She took a taxi so that she would be late.',
        'I saved money to buy a car. → I saved money in order that I could buy a car.', 'Step forward so that you can take a closer look. → Step forward in order to take a closer look.',
        'We spoke quietly so that the baby could sleep. → We spoke quietly in order for the baby to sleep.'], a: '②', why: '② not이 빠져 뜻이 반대 (기출 46)' },
      { q: '다음 우리말을 바르게 영작한 것은? — 늦지 않기 위해 나는 서둘렀다.', opts: [
        'I hurried in order to not be late.', 'I hurried so as not being late.', 'I hurried in order that not to be late.',
        'I hurried so that I wouldn’t be late.', 'I hurried so that I won’t be late.'], a: '④', why: 'so that ~ wouldn’t = in order not to (워크북) / ⑤ 주절 과거 → wouldn’t' }] },
    { level: '전환 · 연결', type: 'write', instr: '괄호 안의 지시대로 같은 뜻의 문장으로 바꾸어 쓰시오.', items: [
      { q: 'I saved money so that I could buy a car. (in order to)', a: 'I saved money in order to buy a car.', why: '워크북 — 주어가 같음' },
      { q: 'Step forward so that you can take a closer look at them. (so as to)', a: 'Step forward so as to take a closer look at them.', why: '교과서 Grammar✚' },
      { q: 'We spoke quietly so that the baby could sleep. (in order for)', a: 'We spoke quietly in order for the baby to sleep.', why: '교과서 Grammar✚ — 주어가 다름' },
      { q: 'I hurried so that I wouldn’t be late. (in order not to)', a: 'I hurried in order not to be late.', why: '워크북 — 부정' },
      { q: 'Jane ran out to catch a taxi. (so that)', a: 'Jane ran out so that she could catch a taxi.', why: '워크북 — 주절 과거 → could' },
      { q: 'I studied hard in order to pass the exam. (so that)', a: 'I studied hard so that I could pass the exam.', why: '워크북' },
      { q: 'He practices running every day in order to finish the marathon. (so that)', a: 'He practices running every day so that he can finish the marathon.', why: '워크북 — 주절 현재 → can' },
      { q: 'She borrowed some money so as to buy some snacks. (in order that)', a: 'She borrowed some money in order that she could buy some snacks.', why: '워크북' },
      { q: 'Turn off the light for the baby to sleep well. (so that)', a: 'Turn off the light so that the baby can sleep well.', why: '워크북 — for + 목적격 → 주어' },
      { q: 'I took off my shoes. I didn’t want to make any noise. (so as not to)', a: 'I took off my shoes so as not to make any noise.', why: '워크북 — 부정' }] },
  ], m),

  // ---------------- Point 3 ----------------
  D.section('Point 3', '(심화) 목적 so that vs 결과 so ~ that · , so that — too ~ to · enough to', 'point'),
  ...D.table(['구분', '설명', '예'], [
    ['목적 so that', '‘~하도록, ~하기 위해서’ — so와 that이 붙어 있다', 'They clear routes **so that** people can escape to safety. (본문)'],
    ['결과 so + 형용사/부사 + that', '‘매우 ~해서 …하다’ — so와 that 사이에 형용사 · 부사', 'He was **so tired that** he couldn’t do his homework. (워크북)'],
    ['결과 , so that', '쉼표 + so that = ‘그래서, 그 결과’', 'She studied hard**, so that** she passed the test. (워크북)'],
    ['so ~ that + can’t ↔ too ~ to', '‘너무 ~해서 …할 수 없다’ — too ~ to에는 not을 쓰지 않는다', 'I was **so tired that** I couldn’t go out. = I was **too tired to** go out.'],
    ['so ~ that + can ↔ ~ enough to', '‘…할 만큼 충분히 ~하다’ — enough는 형용사 · 부사 뒤', 'He is **so tall that** he can reach the shelf. = He is **tall enough to** reach the shelf.'],
    ['주어가 다르면 for + 목적격', 'too · enough 전환에서도 의미상 주어는 for + 목적격', 'It’s so hot that I can’t sleep. = It’s **too hot for me to** sleep.']], [2600, 3200, 3838], m),
  ...D.infoBox('목적? 결과? — so와 that 사이를 보라', [
    'so와 that이 붙어 있으면 {{목적}}(~하도록) / 사이에 형용사 · 부사가 있으면 {{결과}}(매우 ~해서)',
    '쉼표 + so that은 결과 ‘그래서’ — She studied hard, so that she passed the test.',
    'so ~ that + can’t = {{too}} ~ to / so ~ that + can = ~ {{enough}} to (tall enough ○ · enough tall ✗)'], m),
  ...D.trick('붙으면 목적, 벌어지면 결과!', ['“so that 붙으면 목적, 사이가 벌어지면 결과!”', '“too는 못(not) 해, enough는 돼(can)!”']),
  ...D.examPoint([
    { q: 'He tried {{so hard that}} he could win the prize. (= Because he tried so hard, he could win the prize.)', why: '결과 — 매우 열심히 해서 (기출 46)' },
    { q: 'It’s so hot that I {{can’t}} sleep well at night. (= 너무 더워서 잠을 잘 못 잔다)', why: '결과 so ~ that (기출 32)' }], m),
  ...D.caution(['‘~하기 위해’인데 결과 so ~ that, enough to, too ~ to로 쓴 선지가 우리말 영작 문항의 오답으로 나온다. (기출 30)',
    '본문 문장을 so well that(결과)으로 바꾼 선지는 의미가 다르다. (They clear routes so well that ~ ✗, 기출 133)',
    'too ~ to 전환에서 not을 남긴 선지(too tired to not ✗), enough의 위치(enough tall ✗), for 뒤 주격(for I ✗)이 형태 오답이다.',
    '쉼표 + so that(결과)은 교과서 범위 밖 — 의미 구별(목적 vs 결과)만 확인한다.'], m),
  ...D.drill(3, '목적 so that vs 결과 so ~ that', [
    { level: 'Basic ①', type: 'choice', instr: '괄호 안에서 알맞은 것을 고르시오.', items: [
      { q: 'He was (such / so) tired that he couldn’t do his homework.', a: 'so', why: 'so + 형용사 + that (워크북)' },
      { q: 'I exercise during the day (so hard that / so that) I can sleep well at night. (잘 자기 위해)', a: 'so that', why: '목적 — ~하기 위해 (기출)' },
      { q: 'It’s (so hot / so that hot) that I can’t sleep well at night.', a: 'so hot', why: '결과 so + 형용사 + that (기출)' },
      { q: 'This soup is too hot (to eat / eating).', a: 'to eat', why: 'too ~ to + 동사원형' },
      { q: 'He is tall (so / enough) to reach the top shelf.', a: 'enough', why: '형용사 + enough to' },
      { q: 'She is (old enough / enough old) to drive a car.', a: 'old enough', why: 'enough는 형용사 뒤' },
      { q: 'The question was (so / too) difficult that nobody could answer it.', a: 'so', why: 'so ~ that (too ~ that ✗)' },
      { q: 'The question was (too / so) difficult for us to answer.', a: 'too', why: 'too ~ for 목적격 to V' },
      { q: 'She studied hard, (so as to / so that) she passed the test. (그 결과)', a: 'so that', why: '쉼표 + so that = 결과 (워크북)' },
      { q: 'I got up so late that I (could catch / missed) the bus.', a: 'missed', why: '결과 — 너무 늦게 일어나서 놓쳤다' }] },
    { level: 'Basic ②', type: 'fill', instr: '<보기>에서 알맞은 말을 골라 빈칸에 쓰시오. (한 번씩만 사용)',
      bogi: ['so', 'that', 'too', 'enough', 'for', 'can’t', 'could', 'couldn’t', 'to', 'well'], items: [
      { q: 'He was [[so]] tired that he couldn’t do his homework.', why: '워크북 — so ~ that' },
      { q: 'The box was too heavy [[for]] me to carry.', why: '의미상 주어 for + 목적격' },
      { q: 'He is old [[enough]] to travel alone.', why: '형용사 + enough to' },
      { q: 'It was [[too]] cold to swim in the sea.', why: 'too ~ to' },
      { q: 'It’s so hot that I [[can’t]] sleep well at night.', why: '기출 — 현재 · 할 수 없다' },
      { q: 'He tried so hard that he [[could]] win the prize.', why: '기출 — 결과 · 할 수 있었다' },
      { q: 'The music was so loud that we [[couldn’t]] hear each other.', why: '결과 — 들을 수 없었다' },
      { q: 'They clear routes so [[that]] people can escape to safety.', why: '본문 — 목적' },
      { q: 'The robot cleans the house so [[well]] that I don’t have to clean at all.', why: 'so + 부사 + that (결과)' },
      { q: 'She was too sleepy [[to]] finish her homework.', why: 'too ~ to + 동사원형' }] },
    { level: 'Intermediate', type: 'write', instr: '어법상 또는 의미상 틀린 부분을 찾아 바르게 고쳐 쓰시오.', items: [
      { q: 'It’s so hot that I can sleep well at night. (너무 더워서 잠을 잘 못 잔다)', a: 'can → can’t', why: '기출 — 결과의 의미' },
      { q: 'He is enough tall to reach the top shelf.', a: 'enough tall → tall enough', why: 'enough는 형용사 뒤' },
      { q: 'The soup was too hot to not eat.', a: 'to not eat → to eat', why: 'too ~ to에 not ✗' },
      { q: 'The question was so difficult that nobody can answer it.', a: 'can → could', why: '주절 과거(was)' },
      { q: 'She was very tired that she went to bed early.', a: 'very → so', why: 'so + 형용사 + that' },
      { q: 'The box is too heavy for I to carry.', a: 'for I → for me', why: 'for + 목적격' },
      { q: 'He spoke so quietly that everyone could hear him. (아무도 들을 수 없었다)', a: 'could → couldn’t (everyone → nobody도 ○)', why: '결과의 의미 — 들을 수 없었다' },
      { q: 'I was so sleepy as I couldn’t keep my eyes open.', a: 'as → that', why: 'so ~ that' },
      { q: 'The bag was too expensive for me to buying.', a: 'to buying → to buy', why: 'to + 동사원형' },
      { q: 'He is so strong to lift the rock.', a: 'so strong → strong enough', why: '~ enough to (so strong that he can lift도 ○)' }] },
    { level: 'Advanced · 모두 고르기', type: 'multi', free: true, instr: '해당하는 것을 모두 골라 기호를 쓰시오.', items: [
      { q: '밑줄 친 부분이 ‘목적(~하도록, ~하기 위해서)’을 나타내는 것을 모두 고르시오.', box: [
        '(a) She studied hard, __so that__ she passed the test.', '(b) It can navigate roads for you __so that__ you can relax.', '(c) He was __so tired that__ he couldn’t do his homework.',
        '(d) I’ll do something __so that__ she can cheer up.', '(e) We sat at the front __so that__ we could see the stage well.'], a: '(b), (d), (e)', why: '(a) 쉼표 + so that = 결과 (c) so + 형용사 + that = 결과' },
      { q: '밑줄 친 부분에 대한 설명으로 옳은 것을 모두 고르시오.', box: [
        '(a) It was __so hot that__ I couldn’t sleep. → ‘매우 ~해서 …하다’라는 결과를 나타낸다.',
        '(b) They clear routes __so that__ people can escape. → 결과를 나타내므로 ‘그래서’로 해석한다.',
        '(c) The soup was __too__ hot to eat. → ‘…할 수 없다’는 뜻이므로 to 뒤에 not을 써야 한다.',
        '(d) He is old __enough to__ drive. → so old that he can drive로 바꿔 쓸 수 있다.',
        '(e) The box is too heavy __for me__ to carry. → to부정사의 의미상 주어이다.'], a: '(a), (d), (e)', why: '(b) 목적 — ~하도록 (본문) (c) too ~ to 자체가 부정의 뜻' },
      { q: '두 문장의 의미가 같은 것을 모두 고르시오.', box: [
        '(a) It’s so hot that I can’t sleep. = It’s too hot for me to sleep.',
        '(b) I’m too tired to go out. = I’m so tired that I can’t go out.',
        '(c) He is tall enough to reach the shelf. = He is so tall that he can’t reach the shelf.',
        '(d) Because he tried so hard, he could win the prize. = He tried so hard that he could win the prize.',
        '(e) They clear routes so that people can escape. = They clear routes so well that people can escape.'], a: '(a), (b), (d)', why: '(c) can’t → can (e) 목적 ↔ 결과 (기출 46 · 133)' },
      { q: '다음 글의 밑줄 친 ⓐ~ⓔ 중 어법상 어색한 것을 모두 골라 기호를 쓰고 바르게 고치시오.', fix: true, label: '기호 / 고친 것', box: [
        'Last night, it was ⓐ __so hot that__ I couldn’t sleep well. I opened the window ⓑ __so that I could feel__ the fresh air. But the noise outside was ⓒ __so loud that__ I could hear nothing else. In the morning, I was ⓓ __too tired to not get up__ on time. So I drank a glass of cold water ⓔ __so that I can stay__ awake in class.'],
        a: 'ⓓ too tired to not get up → too tired to get up, ⓔ can → could', why: 'ⓓ too ~ to에 not ✗ ⓔ 주절 과거(drank) → could' },
      { q: '빈칸에 that이 들어갈 수 있는 것을 모두 고르시오.', box: [
        '(a) She is old enough ______ drive a car.', '(b) He was so tired ______ he fell asleep on the sofa.', '(c) Speak louder so ______ everyone can hear you.',
        '(d) The tea is too hot ______ drink.', '(e) I was so busy ______ I couldn’t call you.'], a: '(b), (c), (e)', why: '(a)(d) to부정사 to' }] },
    { level: 'Advanced · 객관식', type: 'mcq', free: true, instr: '알맞은 답을 고르시오.', items: [
      { q: '다음 우리말을 바르게 영작한 것은? — 그 질문은 너무 어려워서 아무도 답할 수 없었다.', opts: [
        'The question was so difficult that nobody can answer it.', 'The question was difficult so that nobody could answer it.', 'The question was too difficult that nobody could answer it.',
        'The question was so difficult that nobody could answer it.', 'The question was difficult enough for nobody to answer it.'], a: '④', why: '결과 so + 형용사 + that, 주절 과거 → could' },
      { q: '다음 중 밑줄 친 so that의 쓰임이 나머지 넷과 다른 것은?', opts: [
        'I’ll draw a picture of the leaf __so that__ it can never fall.', 'Be sure to get enough sleep __so that__ you can focus during class.', 'I donated my allowance __so that__ people in need could get help.',
        'It navigates roads for you __so that__ you can relax.', 'She studied hard, __so that__ she passed the test.'], a: '⑤', why: '⑤ 결과(그래서) / 나머지 목적' },
      { q: '<This bag is so heavy that I can’t carry it.>과 같은 뜻의 문장은?', opts: [
        'This bag is too heavy for me to carry.', 'This bag is heavy enough for me to carry.', 'This bag is too heavy for me not to carry.',
        'This bag is so heavy for me to carry.', 'This bag is heavy so that I can’t carry it.'], a: '①', why: 'so ~ that can’t = too ~ for 목적격 to V' },
      { q: '(A)~(C)에 알맞은 말이 바르게 짝지어진 것은? — (A) He is tall (enough / so) to reach the shelf. (B) It was (so / too) cold that we stayed inside. (C) I got up early (so that / so as) I could catch the first train.', opts: [
        'so – so – so as', 'enough – too – so that', 'enough – so – so as', 'so – too – so that', 'enough – so – so that'], a: '⑤', why: '~ enough to / so ~ that / 목적 so that + 절' },
      { q: '다음 우리말을 바르게 영작한 것은? — 나는 더 건강해질 수 있도록 체육관에 갈 거야.', opts: [
        'I went to the gym, so that I could be healthy.', 'I will go to the gym so that I can be healthier.', 'Going to the gym is so healthy that I could be healthier.',
        'It is healthy enough to go to the gym.', 'It is too easy to go to the gym.'], a: '②', why: '목적 so that + 주어 + can, 주절 미래 (기출 30)' }] },
    { level: '전환 · 연결', type: 'write', instr: '괄호 안의 지시대로 같은 뜻의 문장으로 바꾸어 쓰시오.', items: [
      { q: 'I was so tired that I couldn’t go out. (too ~ to)', a: 'I was too tired to go out.', why: 'so ~ that can’t = too ~ to' },
      { q: 'He is so tall that he can reach the top shelf. (enough to)', a: 'He is tall enough to reach the top shelf.', why: 'so ~ that can = ~ enough to' },
      { q: 'It’s so hot that I can’t sleep well at night. (too ~ to)', a: 'It’s too hot for me to sleep well at night.', why: '기출 — 주어가 다름 → for me' },
      { q: 'This box is too heavy for me to carry. (so ~ that)', a: 'This box is so heavy that I can’t carry it.', why: 'too ~ to → so ~ that can’t, 목적어 it 필요' },
      { q: 'She is old enough to drive a car. (so ~ that)', a: 'She is so old that she can drive a car.', why: '~ enough to → so ~ that can' },
      { q: 'Because he tried so hard, he could win the prize. (so ~ that)', a: 'He tried so hard that he could win the prize.', why: '기출 46 — 결과' },
      { q: 'The tea was too hot for us to drink. (so ~ that)', a: 'The tea was so hot that we couldn’t drink it.', why: '주절 과거 → couldn’t' },
      { q: 'The music was very loud. We couldn’t hear each other. (so ~ that)', a: 'The music was so loud that we couldn’t hear each other.', why: '두 문장 → 결과' },
      { q: 'I sat at the front. I wanted to see the stage well. (so that)', a: 'I sat at the front so that I could see the stage well.', why: '교과서 — 목적, 주절 과거 → could' },
      { q: 'The robot cleans very well. I don’t have to clean at all. (so ~ that)', a: 'The robot cleans so well that I don’t have to clean at all.', why: 'so + 부사 + that (결과)' }] },
  ], m),

  // ---------------- PERFECT CHECK ----------------
  D.section('PERFECT CHECK', '상위권 함정 체크'),
  ...D.drill(null, '', [{ level: '함정', type: 'choice', instr: '실수하기 쉬운 문장들이에요. 괄호 안에서 알맞은 것을 고르시오.', items: [
    { q: 'It can navigate roads for you so that you can (relax / relaxing) and enjoy the ride.', a: 'relax', why: '본문 — can + 동사원형' },
    { q: 'They clear routes (so as to / so that) people can escape to safety.', a: 'so that', why: '본문 — 뒤에 절' },
    { q: 'Narae turned off the TV so that she (can / could) read a book.', a: 'could', why: '워크북 — 주절 과거' },
    { q: 'Please speak louder so that (we can / can) hear you.', a: 'we can', why: '기출 — that 뒤 주어 필수' },
    { q: 'Jason eats an orange every morning (so as to / so that) get some vitamin C.', a: 'so as to', why: '기출 — 뒤에 동사원형' },
    { q: 'I hurried (in order not to / in order to not) be late.', a: 'in order not to', why: '부정 — not은 to 앞' },
    { q: 'We spoke quietly in order (him / for him) to sleep.', a: 'for him', why: '의미상 주어 for + 목적격' },
    { q: 'He was (too tired / so tired) that he couldn’t do his homework.', a: 'so tired', why: '결과 so ~ that' },
    { q: 'Cooking and cleaning (would / will) be easier if you had one.', a: 'would', why: '본문 — 가정법 과거 (같은 과 문법)' },
    { q: 'If my mom (is / were) at home, I would ask her to pick me up.', a: 'were', why: '기출 — 가정법 과거 be동사 were (같은 과 문법)' }] }], m),

  // ---------------- WRITE ----------------
  D.section('WRITE', '서술형 대비'),
  ...D.writeItem(1, 'Basic', '괄호 안의 단어를 알맞은 형태로 바꾸어 쓰시오.', ['I practiced singing so that I (can) join a band. (교과서)'], { a: 'could', why: '주절 과거(practiced) → could' }, m),
  ...D.writeItem(2, 'Basic', '빈칸에 알맞은 말을 쓰시오. (2단어)', ['Search-and-rescue robots clear routes ______ ______ people can escape to safety. (본문)'], { a: 'so that', why: '사람들이 안전한 곳으로 탈출할 수 있도록 — 목적' }, m),
  ...D.writeItem(3, 'Intermediate', '두 문장을 so that을 사용하여 한 문장으로 연결하시오. [두 문장 연결]', ['The girl bought two dolls. She wanted her sister to have one.'],
    { a: 'The girl bought two dolls so that her sister could have one.', why: '기출 49 — 주절 과거 → could' }, m),
  ...D.writeItem(4, 'Intermediate', 'in order that을 사용하여 같은 뜻의 문장으로 바꾸어 쓰시오. [문장 전환]', ['Jessica exercises hard to lose some weight.'],
    { a: 'Jessica exercises hard in order that she can lose some weight.', why: '워크북 — 주절 현재 → can' }, m),
  ...D.writeItem(5, 'Intermediate', 'so as not to를 사용하여 같은 뜻의 문장으로 바꾸어 쓰시오. [문장 전환]', ['He took a taxi so that he wouldn’t be late for school.'],
    { a: 'He took a taxi so as not to be late for school.', why: '부정 — not은 to 앞' }, m),
  ...D.writeItem(6, 'Intermediate', 'in order for를 사용하여 같은 뜻의 문장으로 바꾸어 쓰시오. [문장 전환]', ['Turn on the flashlight so that we can walk through the tunnel.'],
    { a: 'Turn on the flashlight in order for us to walk through the tunnel.', why: '기출 46 변형 — 의미상 주어 for + 목적격(us)' }, m),
  ...D.writeItem(7, 'Advanced', '우리말과 같은 뜻이 되도록 <조건>에 맞게 영작하시오.', ['그것(자율 주행차)은 당신이 쉬면서 주행을 즐길 수 있도록 당신을 위해 길을 찾아갈 수 있다.', '<조건> It으로 시작할 것 · so that을 사용할 것 · navigate, relax, ride를 사용할 것 · 총 15단어'],
    { a: 'It can navigate roads for you so that you can relax and enjoy the ride.', why: '본문 문장 · 15단어 (It/can/navigate/roads/for/you/so/that/you/can/relax/and/enjoy/the/ride)' }, m),
  ...D.writeItem(8, 'Advanced', '<보기>의 단어를 배열하여 문장을 완성하시오. (필요하면 형태를 바꿀 것)', ['나는 어려움에 처한 사람들이 도움을 받을 수 있도록 용돈을 기부했다.', '<보기> I / donated / my allowance / so / that / people in need / can / get / help'],
    { a: 'I donated my allowance so that people in need could get help.', why: 'can → could (주절 과거) (교과서)' }, m),
  ...D.writeItem(9, 'Advanced', '어법상 틀린 부분 2개를 찾아 바르게 고치고, 그 이유를 쓰시오.', ['I went to the library so as to I could borrow some books. Then I studied hard in order to not fail the exam.'],
    { a: '① so as to → so that(in order that)  ② in order to not → in order not to', why: '① 뒤에 절(주어 + 동사)이 오므로 so that ② to부정사의 부정은 not을 to 앞에', blanks: ['고친 것', '이유'] }, m),
  ...D.writeItem(10, 'Advanced', '어법상 틀린 부분 2개를 찾아 바르게 고치고, 그 이유를 쓰시오.', ['Jim got up early so that he can catch the first bus. But it was too cold that he couldn’t wait outside.'],
    { a: '① can → could  ② too → so', why: '① 주절이 과거(got up)이므로 could ② 결과 ‘매우 ~해서 …하다’는 so ~ that', blanks: ['고친 것', '이유'] }, m),

  // ---------------- MAP ----------------
  D.section('MAP', "DAVID'S MAP — 백지노트 테스트"),
  D.P([D.T('오늘 배운 내용을 떠올리며 빈칸을 채워 보세요. 책을 보지 않고!', { size: 18, color: '595959' })], { spacing: { after: 120 }, keepNext: true }),
  ...D.image(path.join(__dirname, 'map_G-sothat.png'), 620),
  ...D.table(['자가 체크 — 백지노트에 이 단어들이 들어갔나요?', '✔'], [
    ['목적 so that + 주어 + can/will + 동사원형 = ~하도록, ~하기 위해서', ''], ['that 뒤 주어 생략 ✗ (so that can hear ✗)', ''],
    ['시제 일치: 주절 과거 → could · would', ''], ['so that = in order that (뒤에 절)', ''],
    ['주어가 같으면 to V = in order to V = so as to V', ''], ['주어가 다르면 in order for + 목적격 + to V', ''],
    ['부정: so that ~ not = in order not to = so as not to', ''], ['결과 so + 형용사/부사 + that (매우 ~해서) · , so that (그래서)', ''],
    ['so ~ that can’t = too ~ to / so ~ that can = ~ enough to', ''],
    ['본문: It can navigate roads for you so that you can relax and enjoy the ride.', '']], [8838, 800], m),
  ...D.memo(['다음 시간 도입: 본문 두 문장(navigate roads … / clear routes …)을 so that · in order that · for + 목적격 to V로 세 번씩 바꿔 말하기',
    '약한 반: Point 1(주어 · could) 확실히 → Point 2는 in order to / so as to / not to 형태만 → Point 3은 ‘붙으면 목적, 벌어지면 결과’ 구별만',
    '같은 과 가정법 과거와 섞은 기출(39 · 40번) 다시 풀기 — 한 문항에 if절 시제와 so that 시제 일치가 함께 나온다.', 'so as for + 목적격 + to V는 기출에 ‘같은 뜻’으로 나온 적이 있으니 질문이 나오면 in order for를 기본으로 설명'], m),
];
D.render(meta, build, process.argv[2] || '.').then(fs_ => {
  const out = fs_.map(f => { const g = path.join(path.dirname(f), path.basename(f).replace('so that', 'sothat')); fs.renameSync(f, g); return g; });
  console.log(out.join('\n'));
});
