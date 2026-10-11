const D = require('./david_base');
const path = require('path');
const COVER = JSON.parse(process.env.COVER || '{}');
const meta = { series: D.SERIES.G, code: 'G-의미상주어', title: 'to부정사의 의미상 주어', category: 'G. to부정사  |  의미상 주어',
  rightText: 'G  to부정사의 의미상 주어', prefix: process.env.PREFIX || '', cover: COVER.title ? COVER : undefined,
  question: 'It is easy ~~for~~ me to ride a bike. / It is kind ~~of~~ you to help me. — 똑같이 ‘~가 …하는 것’인데 왜 하나는 for, 하나는 of일까?' };

const build = (m) => [
  D.section('FLOW', 'Teaching Flow — 처음 배우는 사람도 따라오는 5단계'),
  ...D.step(1, '우리말로 먼저 생각하기 — ‘누가 하는 거야?’', [
    '‘그가 물고기를 잡는 것은 불가능했다.’ → 잡으려던 사람은? {{그}} — 문장의 주어(It)와 실제로 행동하는 사람이 다르다!',
    '우리말은 ‘그가’ 한마디면 끝. 영어는 to부정사 앞에 행동의 주인을 따로 붙여 줘야 한다.'], m),
  ...D.step(2, '이전 단원 복습 — 가주어 it · 진주어 to부정사', [
    'To learn English is fun. → It is fun {{to learn}} English.',
    '앞의 It = {{가주어}} (해석 ✗) / 뒤의 to부정사 = {{진주어}} (‘~하는 것은’)'], m),
  ...D.step(3, '문제 제기 — 행동하는 사람이 안 보인다', [
    'It was impossible to catch any fish. — 누가 못 잡았다는 거지?',
    '‘**그가**’ 잡는 것이 불가능했다는 것을 영어로 어떻게 표시할까?'], m),
  ...D.step(4, '규칙 발견 — to부정사 바로 앞에 주인 붙이기', [
    'to부정사 앞에 {{for}} + {{목적격}} → It was impossible **for him** to catch any fish. (본문)',
    '사람의 성격·태도를 평가하는 형용사(kind, foolish …) 뒤에서는 {{of}} + 목적격 → It is nice **of you** to help me.'], m),
  ...D.step(5, '결론 🔑', [
    '의미상 주어 = to부정사의 {{행동 주체}}. 보통 {{for}} + 목적격 / 성격 형용사 뒤 {{of}} + 목적격 / 문장 주어와 같거나 {{일반인}}이면 생략'], m),
  ...D.infoBox('오늘의 핵심 3문장', [
    '① It was impossible {{for him}} to catch any fish. (본문)',
    '② It is nice {{of you}} to help me. — 성격·태도 형용사 → of',
    '③ This box is too heavy {{for me}} to lift. — 문장 끝에 it을 다시 쓰지 않는다'], m),
  ...D.tip(['본문 문장을 먼저 해석시키고 “누가 잡는 거야?”라고 발문 → for him을 학생이 스스로 찾게 한다.',
    'Point 2 도입은 “너 ~하다” 테스트(You are kind ○ / You are easy ✗)로 for와 of를 구별하게 한다(5분).'], m),

  // ---------------- Point 1 ----------------
  D.section('Point 1', 'It(가주어) ~ for + 목적격 + to부정사(진주어)', 'point'),
  ...D.table(['구성', '역할 · 설명', '예'], [
    ['It', '가주어 — 해석하지 않는다', '**It** was impossible for him to catch any fish. (본문)'],
    ['형용사', '상황·사실 판단: easy, difficult, hard, important, necessary, possible, impossible, dangerous, safe, fun', 'It is not **easy** for me to move this table. (교과서)'],
    ['for + 목적격', 'to부정사의 의미상 주어 — ‘~가, ~이’', 'It is important **for you** to manage time effectively. (교과서)'],
    ['to부정사(구)', '진주어 — ‘~하는 것은’ (to + 동사원형)', 'It is dangerous for kids **to cross at a red light**.']], [1700, 3900, 4038], m),
  ...D.infoBox('목적격 · 부정 체크', [
    'for + **me / you / him / her / us / them / 명사** ← 주격 I, he, she, we, they는 ✗',
    '부정: for + 목적격 + **not** to V → It is important for you **not to be** late. (not은 to 바로 앞)'], m),
  ...D.trick('포목점에선 주격 안 팔아요!', ['“for 뒤엔 목적격 — 포(for)·목(목적격)점!”  for he ✗ → for him ○', '“It은 가짜, to가 진짜 — 가짜 it, 진짜 to!”']),
  ...D.examPoint([
    { q: 'It was impossible {{for him}} to catch any fish. (본문) — to catch의 의미상 주어', why: 'for + 목적격 (for he ✗)' },
    { q: 'It is necessary for us {{to}} recycle plastic bottles. (that ✗)', why: '진주어 = to + 동사원형' }], m),
  ...D.caution(['for + 주격(for he / for they) 선지가 가장 흔한 오답이다.', 'to 뒤 동사 형태(to catching, to caught), It 자리에 That·This를 넣은 선지가 짝으로 나온다.', '부정어 위치: for you not to V — not이 to 뒤로 간 선지(to be not)를 함정으로 낸다.'], m),
  ...D.drill(1, 'It ~ for + 목적격 + to부정사', [
    { level: 'Basic ①', type: 'choice', instr: '괄호 안에서 알맞은 것을 고르시오.', items: [
      { q: 'It is not easy (for me / for I) to move this table.', a: 'for me', why: 'for + 목적격 (교과서)' },
      { q: 'It was impossible for him (catch / to catch) any fish.', a: 'to catch', why: '진주어 = to + 동사원형 (본문)' },
      { q: 'It is important (for we / for us) to protect the environment.', a: 'for us', why: 'for + 목적격' },
      { q: 'It is dangerous for children (to swim / swimming) in this river.', a: 'to swim', why: '진주어 to부정사' },
      { q: 'It was hard (for them / for they) to find the museum.', a: 'for them', why: 'for + 목적격' },
      { q: 'It is necessary for you (that / to) wear a helmet.', a: 'to', why: 'for 목적격 뒤 → to부정사' },
      { q: 'It is difficult for my grandma (to use / use) a smartphone.', a: 'to use', why: '진주어 to부정사' },
      { q: '(It / This) is possible for her to finish the work today.', a: 'It', why: '가주어는 it만' },
      { q: 'It is important for you (to be not / not to be) late.', a: 'not to be', why: 'not은 to 앞' },
      { q: 'It was boring (for his / for him) to wait for an hour.', a: 'for him', why: '소유격 ✗ → 목적격' }] },
    { level: 'Basic ②', type: 'fill', instr: '<보기>에서 알맞은 말을 골라 빈칸에 쓰시오. (한 번씩만 사용)',
      bogi: ['dangerous', 'to', 'me', 'ride', 'It', 'for', 'not', 'possible', 'them', 'important'], items: [
      { q: 'The river was completely frozen. It was impossible [[for]] him to catch any fish.', why: '본문 — 의미상 주어 for' },
      { q: 'I’m not good at math. It is hard for [[me]] to solve this problem.', why: '나 → 목적격 me' },
      { q: 'My parents are very busy. It is not easy for [[them]] to take a vacation.', why: '부모님 → them' },
      { q: 'It is necessary for us [[to]] save water.', why: '진주어 to부정사' },
      { q: '[[It]] is fun for me to play the guitar.', why: '가주어 it' },
      { q: 'Time is money. It is [[important]] for you to manage time effectively.', why: '교과서 — 중요하다' },
      { q: 'The ice was too thin. It was [[dangerous]] for the kids to walk on it.', why: '얇은 얼음 — 위험' },
      { q: 'The test was very easy. It was [[possible]] for everyone to get a good score.', why: '쉬운 시험 — 가능' },
      { q: 'It is important for students [[not]] to be late for class.', why: '부정 not + to' },
      { q: 'It is easy for my brother to [[ride]] a bike.', why: 'to + 동사원형' }] },
    { level: 'Intermediate', type: 'write', instr: '어법상 틀린 부분을 찾아 바르게 고쳐 쓰시오.', items: [
      { q: 'It is not easy for he to speak in front of people.', a: 'he → him', why: 'for + 목적격' },
      { q: 'It was impossible for him catch any fish.', a: 'catch → to catch', why: '본문 변형 — 진주어 to부정사' },
      { q: 'It is important for we to exercise regularly.', a: 'we → us', why: 'for + 목적격' },
      { q: 'It is dangerous for kids crossing at a red light.', a: 'crossing → to cross', why: '진주어 to부정사' },
      { q: 'That is difficult for me to understand this poem.', a: 'That → It', why: '가주어는 it' },
      { q: 'It is necessary for you to doing your homework first.', a: 'to doing → to do', why: 'to + 동사원형' },
      { q: 'It was hard for they to carry the heavy boxes.', a: 'they → them', why: 'for + 목적격' },
      { q: 'It is important for you to be not late again.', a: 'to be not → not to be', why: 'not은 to 앞' },
      { q: 'It is possible for us to finished the project today.', a: 'finished → finish', why: 'to + 동사원형' },
      { q: 'It is helpful for students that read books every day.', a: 'that read → to read', why: 'for 목적격 + to부정사' }] },
    { level: 'Advanced · 모두 고르기', type: 'multi', free: true, instr: '해당하는 것을 모두 골라 기호를 쓰시오.', items: [
      { q: '다음 중 어법상 옳은 문장을 모두 고르시오.', box: [
        '(a) It was impossible for they to win the game.', '(b) It is hard for her to wake up early.', '(c) It is dangerous for kids swim here.',
        '(d) It is important for us to keep our promises.', '(e) It is easy for my dad to cook pasta.'], a: '(b), (d), (e)', why: '(a) for them (c) to swim' },
      { q: '다음 중 밑줄 친 부분에 대한 설명으로 옳은 것을 모두 고르시오.', box: [
        '(a) __It__ was impossible for him to catch any fish. → 가주어이므로 해석하지 않는다.',
        '(b) It was impossible __for him__ to catch any fish. → 문장 전체의 주어이다.',
        '(c) It is not easy for me __to move this table__. → 진주어이다.',
        '(d) It is important for __you__ to manage time. → 주격 대명사이다.',
        '(e) __It__ is getting dark outside. → 가주어 it이다.'], a: '(a), (c)', why: '(b) 의미상 주어 (d) 목적격 (e) 명암의 비인칭 it' },
      { q: '다음 대화의 밑줄 친 ⓐ~ⓔ 중 어법상 어색한 것을 모두 골라 기호를 쓰고 바르게 고치시오.', fix: true, label: '기호 / 고친 것', box: [
        'A: Can you help me? It is hard ⓐ __for I__ to carry these books.',
        'B: Sure. ⓑ __It__ is easy for me ⓒ __to carry__ them.',
        'A: Thanks. It is important for us ⓓ __not to be__ late for the meeting.',
        'B: Right. And it is necessary for us ⓔ __finishing__ the report today.'], a: 'ⓐ for I → for me, ⓔ finishing → to finish', why: 'ⓐ for + 목적격 ⓔ 진주어 to부정사' },
      { q: '밑줄 친 It이 가주어로 쓰인 것을 모두 고르시오.', box: [
        '(a) __It__ is fun to ride a bike along the river.', '(b) __It__ is raining outside.', '(c) __It__ is my new phone.',
        '(d) __It__ was hard for me to say no.', '(e) __It__ is necessary for you to rest.'], a: '(a), (d), (e)', why: '(b) 날씨 비인칭 (c) 대명사 그것' },
      { q: '우리말과 영어가 바르게 짝지어진 것을 모두 고르시오.', box: [
        '(a) 그가 물고기를 잡는 것은 불가능했다 → It was impossible for his to catch any fish.',
        '(b) 내가 이 탁자를 옮기는 것은 쉽지 않다 → It is not easy for me to move this table.',
        '(c) 네가 일찍 자는 것은 중요하다 → It is important for you to go to bed early.',
        '(d) 우리가 그 산을 오르는 것은 위험하다 → It is dangerous for us climbing the mountain.',
        '(e) 그녀가 늦지 않는 것이 필요하다 → It is necessary for her to be not late.'], a: '(b), (c)', why: '(a) for him (d) to climb (e) not to be' }] },
    { level: 'Advanced · 객관식', type: 'mcq', free: true, instr: '알맞은 답을 고르시오.', items: [
      { q: '다음 중 밑줄 친 It의 쓰임이 나머지 넷과 다른 것은?', opts: [
        '__It__ is easy for me to swim.', '__It__ was impossible for him to catch any fish.', '__It__ is important for us to recycle.',
        '__It__ is getting dark outside.', '__It__ is hard for her to wake up early.'], a: '④', why: '④ 명암의 비인칭 it / 나머지 가주어' },
      { q: '빈칸에 들어갈 말로 알맞은 것은? — It is not easy ______ to solve this puzzle.', opts: ['for I', 'for me', 'for my', 'of I', 'me'], a: '②', why: 'for + 목적격' },
      { q: '다음 중 어법상 옳은 문장은?', opts: [
        'It is hard for he to sing well.', 'It was impossible for him catch any fish.', 'It is fun for they to play soccer.',
        'It is important for us save energy.', 'It is necessary for you to drink enough water.'], a: '⑤', why: '① him ② to catch ③ them ④ to save' },
      { q: '다음 중 어법상 틀린 문장의 개수는?', box: [
        '(a) It is easy for me to use this app.', '(b) It was hard for them to finding the way.', '(c) It is important for her not to skip breakfast.',
        '(d) That is dangerous for us to swim here.', '(e) It is possible for you coming early.'],
        opts: ['1개', '2개', '3개', '4개', '5개'], a: '③', why: '(b) to find (d) It (e) to come' },
      { q: '(A)~(C)에 알맞은 말이 바르게 짝지어진 것은? — (A) It was impossible (for him / for he) to catch any fish. (B) It is important for us (protect / to protect) nature. (C) (It / That) is not easy for me to move this table.', opts: [
        'for him – to protect – It', 'for he – to protect – It', 'for him – protect – It', 'for him – to protect – That', 'for he – protect – That'], a: '①', why: '목적격 / to부정사 / 가주어 It' }] },
    { level: '전환 · 연결', type: 'write', instr: '괄호 안의 형용사를 사용하여 <It ~ for + 목적격 + to부정사> 문장으로 바꾸어 쓰시오.', items: [
      { q: 'He couldn’t catch any fish. (impossible)', a: 'It was impossible for him to catch any fish.', why: '본문 문장 — 과거 was' },
      { q: 'I can’t move this table easily. (not easy)', a: 'It is not easy for me to move this table.', why: '교과서 문장' },
      { q: 'You should manage time effectively. (important)', a: 'It is important for you to manage time effectively.', why: '교과서 문장' },
      { q: 'Kids cross at a red light. (dangerous)', a: 'It is dangerous for kids to cross at a red light.', why: '명사 의미상 주어 for kids' },
      { q: 'We must wear seat belts in a car. (necessary)', a: 'It is necessary for us to wear seat belts in a car.', why: 'we → for us' },
      { q: 'She can finish the book in a day. (possible)', a: 'It is possible for her to finish the book in a day.', why: 'she → for her' },
      { q: 'They practice soccer every day. (fun)', a: 'It is fun for them to practice soccer every day.', why: 'they → for them' },
      { q: 'Minho learns Chinese characters. (difficult)', a: 'It is difficult for Minho to learn Chinese characters.', why: '명사 그대로 for Minho' },
      { q: 'Children in the Joseon dynasty learned important values through Munjado. (possible)', a: 'It was possible for children in the Joseon dynasty to learn important values through Munjado.', why: '본문 소재 — 과거 was' },
      { q: 'You should not be late for class. (important)', a: 'It is important for you not to be late for class.', why: '부정 → not to' }] },
  ], m),

  // ---------------- Point 2 ----------------
  D.section('Point 2', 'of + 목적격 (성격·태도 형용사) vs for + 목적격', 'point'),
  ...D.table(['형용사 종류', '의미상 주어', '예'], [
    ['성격·태도 (사람 평가) kind, nice, wise, smart, clever, foolish, silly, stupid, careless, polite, rude, brave, generous, honest', '**of** + 목적격', 'It is nice **of you** to help me. (교과서) / It is foolish **of him** to make the same mistake twice. (교과서)'],
    ['상황·사실 판단 easy, difficult, hard, important, necessary, possible, impossible, dangerous, safe', '**for** + 목적격', 'It was impossible **for him** to catch any fish. (본문)']], [3700, 1500, 4438], m),
  ...D.infoBox('for / of 구별 테스트 — 의미상 주어를 문장 주어로 올려 보기', [
    'It is kind of you to help me. → **You are kind.** (○ 말이 된다) → {{of}}',
    'It is easy for me to swim. → **I am easy.** (✗ 뜻이 이상해진다) → {{for}}',
    '전환: It is kind of you to help me. = **You are kind to help me.** (for 문장은 이렇게 바꿀 수 없다)'], m),
  ...D.trick('너 ~하다, 말 되면 of!', ['“너 친절해(○) → of / 너 쉬워(✗) → for”', '“착·멋·현·바·덜·무·예 = 사람 평가는 of!”', '(kind·nice·wise·foolish·careless·rude·polite)']),
  ...D.examPoint([
    { q: 'It was careless {{of}} you to leave the door open.', why: 'careless = 성격·태도 → of' },
    { q: 'It is necessary {{for}} you to bring your passport.', why: 'necessary = 필요성 판단 → for' }], m),
  ...D.caution(['kind / nice / wise 뒤에 for, important / necessary 뒤에 of를 넣은 선지가 짝으로 출제된다.', '‘빈칸에 들어갈 말이 다른 것’ 문항 — 해석보다 형용사 종류로 판단하게 한다.', 'of 뒤도 목적격 — of he / of they 오답 선지 주의.'], m),
  ...D.drill(2, 'of + 목적격 vs for + 목적격', [
    { level: 'Basic ①', type: 'choice', instr: '괄호 안에서 알맞은 것을 고르시오.', items: [
      { q: 'It is nice (for / of) you to help me.', a: 'of', why: 'nice 성격 (교과서)' },
      { q: 'It is difficult (of / for) me to read Chinese characters.', a: 'for', why: 'difficult 판단' },
      { q: 'It was foolish (of / for) him to make the same mistake twice.', a: 'of', why: 'foolish 성격 (교과서)' },
      { q: 'It was careless (of / for) her to lose her passport again.', a: 'of', why: 'careless 성격' },
      { q: 'It is important (of / for) us to keep our promises.', a: 'for', why: 'important 판단' },
      { q: 'It was rude (of / for) them to talk loudly in the museum.', a: 'of', why: 'rude 태도' },
      { q: 'It was brave (of / for) the boy to save the puppy.', a: 'of', why: 'brave 성격' },
      { q: 'It is necessary (of / for) you to see a doctor.', a: 'for', why: 'necessary 판단' },
      { q: 'It is dangerous (of / for) children to play near the river.', a: 'for', why: 'dangerous 판단' },
      { q: 'It was polite (of / for) Minji to say thank you first.', a: 'of', why: 'polite 태도' }] },
    { level: 'Basic ②', type: 'fill', instr: '<보기>에서 알맞은 말을 골라 빈칸에 쓰시오. (한 번씩만 사용)',
      bogi: ['brave', 'us', 'necessary', 'of', 'generous', 'safer', 'rude', 'for', 'you', 'polite'], items: [
      { q: 'It was very kind [[of]] you to carry my bags.', why: 'kind 성격 → of' },
      { q: 'It is not easy [[for]] me to move this table.', why: '교과서 — easy 판단 → for' },
      { q: 'She always greets her teachers with a bow. It is [[polite]] of her to do so.', why: '인사 — 예의 바름' },
      { q: 'He stepped on my foot but didn’t say sorry. It was [[rude]] of him not to apologize.', why: '사과 안 함 — 무례' },
      { q: 'The firefighter ran into the burning house. It was [[brave]] of him to save the baby.', why: '불 속으로 — 용감' },
      { q: 'She gave half of her lunch to her friend. It was [[generous]] of her to share it.', why: '나눠 줌 — 너그러움' },
      { q: 'Knee pads protect your knees. It’s [[safer]] for kids to wear knee pads.', why: '교과서 — 더 안전' },
      { q: 'You can’t get on the plane without it. It is [[necessary]] for you to bring your passport.', why: '필요' },
      { q: 'Our team had the best players. It was easy for [[us]] to win the game.', why: '우리 팀 → us' },
      { q: 'Thank you, Mr. Kim. It’s nice of [[you]] to say so.', why: '상대방 → you' }] },
    { level: 'Intermediate', type: 'write', instr: '어법상 틀린 부분을 찾아 바르게 고쳐 쓰시오.', items: [
      { q: 'It was very nice for you to invite me to the party.', a: 'for → of', why: 'nice 성격' },
      { q: 'It is important of us to save energy.', a: 'of → for', why: 'important 판단' },
      { q: 'It was foolish of he to believe the rumor.', a: 'he → him', why: 'of + 목적격' },
      { q: 'It is easy of my brother to fix computers.', a: 'of → for', why: 'easy 판단' },
      { q: 'It was careless for you to leave your phone on the bus.', a: 'for → of', why: 'careless 성격' },
      { q: 'It is necessary of students to wear school uniforms.', a: 'of → for', why: 'necessary 판단' },
      { q: 'It was wise of her chose the red one.', a: 'chose → to choose', why: 'of 목적격 + to부정사' },
      { q: 'It is rude for them to cut in line.', a: 'for → of', why: 'rude 태도' },
      { q: 'You were kind of help the old lady.', a: 'of help → to help', why: 'S be 형용사 + to부정사' },
      { q: 'It was smart of they to bring an umbrella.', a: 'they → them', why: 'of + 목적격' }] },
    { level: 'Advanced · 모두 고르기', type: 'multi', free: true, instr: '해당하는 것을 모두 골라 기호를 쓰시오.', items: [
      { q: '빈칸에 of가 들어갈 수 있는 것을 모두 고르시오.', box: [
        '(a) It is impossible ______ me to sleep in this noise.', '(b) It was silly ______ him to cry over it.', '(c) It is honest ______ you to tell the truth.',
        '(d) It is hard ______ us to study at night.', '(e) It was clever ______ her to solve the riddle.'], a: '(b), (c), (e)', why: '(a)(d) 판단 형용사 → for' },
      { q: '다음 중 밑줄 친 부분에 대한 설명으로 옳은 것을 모두 고르시오.', box: [
        '(a) It is nice __of you__ to help me. → nice가 사람의 성격을 나타내므로 of를 썼다.',
        '(b) It was impossible __for him__ to catch any fish. → to catch의 의미상 주어이다.',
        '(c) It is foolish __of him__ to make the same mistake twice. → for him으로 바꿔 써도 된다.',
        '(d) It is necessary __for you__ to rest. → necessary가 사람의 성격을 나타내므로 for를 썼다.',
        '(e) It is wise __of she__ to say so. → of 뒤에 주격을 썼으므로 옳다.'], a: '(a), (b)', why: '(c) of만 가능 (d) 성격 ✗ — 필요성 판단 (e) of her' },
      { q: '다음 글의 밑줄 친 ⓐ~ⓔ 중 어법상 어색한 것을 모두 골라 기호를 쓰고 바르게 고치시오.', fix: true, label: '기호 / 고친 것', box: [
        'Yesterday I left my umbrella at home. It was careless ⓐ __for me__ to forget it. My friend Sora shared hers with me. It was kind ⓑ __of her__ to do that. It is important ⓒ __for us__ to help each other. On the bus, a boy pushed us. It was rude ⓓ __for a boy__ to push people. It was hard ⓔ __for us__ to stand still.'],
        a: 'ⓐ for me → of me, ⓓ for a boy → of a boy', why: 'careless · rude = 성격·태도 → of' },
      { q: '두 문장의 뜻이 같은 것을 모두 고르시오.', box: [
        '(a) It is kind of you to help me. = You are kind to help me.', '(b) It is easy for me to swim. = I am easy to swim.',
        '(c) It was foolish of him to lie. = He was foolish to lie.', '(d) It is important for you to sleep. = You are important to sleep.',
        '(e) It was brave of her to speak up. = She was brave to speak up.'], a: '(a), (c), (e)', why: 'of 문장만 사람 주어로 전환 가능' },
      { q: '어법상 틀린 문장을 모두 고르시오.', box: [
        '(a) It is wise of you to save money.', '(b) It is dangerous of kids to cross here.', '(c) It was polite of them to wait for us.',
        '(d) It was careless for me to drop the cup.', '(e) It is possible for us to win the game.'], a: '(b), (d)', why: '(b) for kids (d) of me' }] },
    { level: 'Advanced · 객관식', type: 'mcq', free: true, instr: '알맞은 답을 고르시오.', items: [
      { q: '다음 중 빈칸에 들어갈 말이 나머지 넷과 다른 것은?', opts: [
        'It is kind ______ you to say so.', 'It is hard ______ me to wake up early.', 'It was wise ______ him to wait.',
        'It was rude ______ her to shout.', 'It is nice ______ you to come.'], a: '②', why: '② for / 나머지 of' },
      { q: '다음 중 빈칸에 for가 들어갈 수 없는 것은?', opts: [
        'It is easy ______ him to swim.', 'It is necessary ______ us to rest.', 'It is possible ______ you to win.',
        'It is safe ______ kids to play here.', 'It was silly ______ me to cry.'], a: '⑤', why: 'silly 성격 → of' },
      { q: '다음 중 어법상 옳은 문장은?', opts: [
        'It was very kind of you to help my son.', 'It is important of you to listen.', 'It was foolish for him to believe it.',
        'It is careless of she to forget it.', 'It is difficult of me to draw.'], a: '①', why: '② for ③ of ④ her ⑤ for' },
      { q: '다음 중 어법상 틀린 문장의 개수는?', box: [
        '(a) It is nice of you to help me.', '(b) It was impossible of him to catch any fish.', '(c) It is rude for you to talk like that.',
        '(d) It is hard of her to say no.', '(e) It was clever of they to find it.'],
        opts: ['1개', '2개', '3개', '4개', '5개'], a: '④', why: '(b) for him (c) of you (d) for her (e) of them' },
      { q: '(A)~(C)에 알맞은 말이 바르게 짝지어진 것은? — (A) It is generous (of / for) you to share. (B) It is difficult (of / for) me to sing. (C) It was wise (of / for) him to stay calm.', opts: [
        'for – of – of', 'of – for – of', 'of – of – for', 'for – for – of', 'of – for – for'], a: '②', why: 'generous 성격 / difficult 판단 / wise 성격' }] },
    { level: '전환 · 연결', type: 'write', instr: '<It is + 형용사 + of/for + 목적격 + to부정사> 형태로 바꾸어 쓰시오. (괄호가 있으면 그 형용사를 사용할 것)', items: [
      { q: 'You are nice to help me.', a: 'It is nice of you to help me.', why: '교과서 문장 — 성격 → of' },
      { q: 'He was foolish to make the same mistake twice.', a: 'It was foolish of him to make the same mistake twice.', why: '교과서 문장' },
      { q: 'She was careless to leave her bag on the subway.', a: 'It was careless of her to leave her bag on the subway.', why: 'she → of her' },
      { q: 'They were rude to laugh at the new student.', a: 'It was rude of them to laugh at the new student.', why: 'they → of them' },
      { q: 'You were wise to save your money.', a: 'It was wise of you to save your money.', why: '성격 → of' },
      { q: 'I can’t sleep without my teddy bear. (hard)', a: 'It is hard for me to sleep without my teddy bear.', why: '판단 → for' },
      { q: 'The boy was brave to tell the truth.', a: 'It was brave of the boy to tell the truth.', why: '명사 그대로 of the boy' },
      { q: 'Students should read many books. (important)', a: 'It is important for students to read many books.', why: '판단 → for' },
      { q: 'You are kind to hold my bag for me.', a: 'It is kind of you to hold my bag for me.', why: '성격 → of' },
      { q: 'Minsu was polite to give his seat to the old man.', a: 'It was polite of Minsu to give his seat to the old man.', why: '태도 → of' }] },
  ], m),

  // ---------------- Point 3 ----------------
  D.section('Point 3', '의미상 주어 생략 · too ~ to / enough to의 for + 목적격 · 문장 전환', 'point'),
  ...D.table(['경우', '설명', '예'], [
    ['생략 ① 일반인', '막연한 사람(we, people)이 주체', 'It is important (for us) to exercise every day. → It is important **to exercise** every day.'],
    ['생략 ② 주어·목적어와 같음', '문장의 주어나 목적어 = to부정사의 주체', 'He wants **to win** the race. (이기는 사람 = He) / I asked him **to help** me. (돕는 사람 = him)'],
    ['too ~ for 목적격 to V', '너무 ~해서 …가 ~할 수 없는', 'The box is **too heavy for me to lift**. (lift it ✗)'],
    ['~ enough for 목적격 to V', '…가 ~할 만큼 충분히 ~한 (형용사 + enough)', 'The book is **easy enough for kids to read**.'],
    ['It is ~ that S (should) V', '= It is ~ for 목적격 to V', 'It is necessary **that you should wear** a mask. = It is necessary **for you to wear** a mask.']], [2300, 2900, 4438], m),
  ...D.infoBox('전환 공식', [
    'so + 형용사 + that + S + can’t[couldn’t] V (it) ↔ too + 형용사 + for + 목적격 + to V — 문장 주어를 가리키는 {{it}}은 지운다',
    'so + 형용사 + that + S + can[could] V (it) ↔ 형용사 + {{enough}} + for + 목적격 + to V',
    'that절 주어 = 문장 주어이면 for 목적격 생략: He is so young that he can’t drive. → He is too young {{to drive}}.'], m),
  ...D.trick('같·모 생략!', ['“주어랑 같으면 생략, 모두(일반인)면 생략 — 같·모 생략!”', '“too 오면 끝 it은 떼라!” — too heavy for me to lift (it ✗)']),
  ...D.examPoint([
    { q: 'This question is too difficult {{for me}} to answer. (answer it ✗)', why: '주어 this question = answer의 목적어 → it 생략' },
    { q: 'He studied hard enough {{to pass}} the test. (for him ✗)', why: '문장 주어와 같아 의미상 주어 생략' }], m),
  ...D.caution(['so ~ that 절의 목적어 it을 too / enough 문장에 그대로 남긴 선지가 단골 오답이다.', 'that절 주어 = 문장 주어인데 for him을 넣은 선지(He is too tired for him to walk ✗).', 'so ~ that S couldn’t ↔ too ~ to 전환에서 시제는 본동사(was)에 남는다 — can’t / couldn’t 짝 확인.', 'enough 위치: 형용사 뒤(brave enough) — enough brave 오답.'], m),
  ...D.drill(3, '의미상 주어 생략 · too ~ to / enough to · 문장 전환', [
    { level: 'Basic ①', type: 'choice', instr: '괄호 안에서 알맞은 것을 고르시오.', items: [
      { q: 'The box is too heavy for me to (lift / lift it).', a: 'lift', why: '주어 = 목적어 → it ✗' },
      { q: 'He is too young (for him to drive / to drive).', a: 'to drive', why: '주어와 같음 → 생략' },
      { q: 'The question was easy enough (for I / for me) to answer.', a: 'for me', why: 'for + 목적격' },
      { q: 'It was (too / so) cold for us to swim in the sea.', a: 'too', why: 'too ~ for 목 to V' },
      { q: 'The bag is light enough for a child (to carry / carrying).', a: 'to carry', why: 'enough to부정사' },
      { q: 'It is necessary that you (to wear / should wear) a helmet.', a: 'should wear', why: 'that절 → (should) 동사원형' },
      { q: 'It is important (that we / for us) to recycle plastic.', a: 'for us', why: '뒤에 to부정사 → for 목적격' },
      { q: 'This soup is too hot for me to (eat / eat it).', a: 'eat', why: '주어 = 목적어 → it ✗' },
      { q: 'She was (brave enough / enough brave) to speak in front of everyone.', a: 'brave enough', why: '형용사 + enough' },
      { q: 'The river was so deep that we (can’t / couldn’t) cross it.', a: 'couldn’t', why: '과거 was → couldn’t' }] },
    { level: 'Basic ②', type: 'fill', instr: '<보기>에서 알맞은 말을 골라 빈칸에 쓰시오. (한 번씩만 사용)',
      bogi: ['that', 'read', 'too', 'should', 'him', 'enough', 'couldn’t', 'for', 'so', 'to'], items: [
      { q: 'The box is too heavy [[for]] me to lift.', why: 'too ~ for 목 to V' },
      { q: 'The water was clear [[enough]] for us to see the fish.', why: '형용사 + enough' },
      { q: 'This math problem is [[too]] hard for me to solve.', why: 'too ~ to' },
      { q: 'The ice was [[so]] thin that we couldn’t walk on it.', why: 'so ~ that' },
      { q: 'The man was so disappointed [[that]] he cried out to the sky.', why: '본문 — so ~ that' },
      { q: 'It was so dark that I [[couldn’t]] see anything.', why: '과거 → couldn’t' },
      { q: 'It is necessary that you [[should]] wear a seat belt.', why: 'that절 should' },
      { q: 'It is fun [[to]] learn about Munjado.', why: '일반인 → 의미상 주어 생략' },
      { q: 'The book was easy enough for my little sister to [[read]].', why: 'to + 동사원형' },
      { q: 'Grandpa waited because the tea was too hot for [[him]] to drink.', why: '할아버지 → him' }] },
    { level: 'Intermediate', type: 'write', instr: '어법상 틀린 부분을 찾아 바르게 고쳐 쓰시오.', items: [
      { q: 'This bag is too heavy for me to carry it.', a: 'carry it → carry', why: '주어 = 목적어 → it ✗' },
      { q: 'He is too short for him to reach the shelf.', a: 'for him 삭제 (too short to reach)', why: '주어와 같음 → 생략' },
      { q: 'The river was so cold that we can’t swim in it.', a: 'can’t → couldn’t', why: '과거 was' },
      { q: 'The movie was enough interesting for us to watch twice.', a: 'enough interesting → interesting enough', why: '형용사 + enough' },
      { q: 'It is important that we should to save energy.', a: 'should to save → should save', why: 'should + 동사원형' },
      { q: 'The question was too difficult for they to answer.', a: 'they → them', why: 'for + 목적격' },
      { q: 'The room was big enough for ten people to sleep in it.', a: 'sleep in it → sleep in', why: '주어 the room = in의 목적어 → it ✗' },
      { q: 'The coffee was so hot that I couldn’t drink.', a: 'drink → drink it', why: 'that절은 완전한 문장 → 목적어 it 필요' },
      { q: 'She got up early enough catching the first bus.', a: 'catching → to catch', why: 'enough + to부정사' },
      { q: 'I hope for me to visit Jeonju someday.', a: 'hope for me to visit → hope to visit', why: '주어와 같음 → 생략' }] },
    { level: 'Advanced · 모두 고르기', type: 'multi', free: true, instr: '해당하는 것을 모두 골라 기호를 쓰시오.', items: [
      { q: '다음 중 어법상 옳은 문장을 모두 고르시오.', box: [
        '(a) The shelf is too high for me to reach it.', '(b) He is too tired to walk any more.', '(c) She wants for her to be a singer.',
        '(d) The box was light enough for her to carry.', '(e) It is hard to wake up early in winter.'], a: '(b), (d), (e)', why: '(a) reach (c) wants to be' },
      { q: '다음 중 밑줄 친 부분에 대한 설명으로 옳은 것을 모두 고르시오.', box: [
        '(a) It is hard __to wake up__ early in winter. → 의미상 주어가 일반인이라 생략되었다.',
        '(b) He wants __to win__ the race. → to win의 의미상 주어는 He이다.',
        '(c) I asked him __to help__ me. → to help의 의미상 주어는 I이다.',
        '(d) The box is too heavy __for me__ to lift. → to lift의 목적어이다.',
        '(e) It was so cold __that__ we couldn’t go out. → It was too cold for we to go out.으로 바꿀 수 있다.'], a: '(a), (b)', why: '(c) him (d) 의미상 주어 (e) for us' },
      { q: '다음 글(본문 변형)의 밑줄 친 ⓐ~ⓔ 중 어법상 어색한 것을 모두 골라 기호를 쓰고 바르게 고치시오.', fix: true, label: '기호 / 고친 것', box: [
        'The man went out to the river, but it was completely frozen. It was impossible ⓐ __for him__ to catch any fish. The ice was too thick ⓑ __for him to break it__. He was ⓒ __so__ disappointed that he cried out to the sky. Then the ice melted, and the carp were slow ⓓ __enough for him to catch__. The fish was ⓔ __enough fresh__ for his mother to eat.'],
        a: 'ⓑ for him to break it → for him to break, ⓔ enough fresh → fresh enough', why: 'ⓑ 주어 the ice = 목적어 → it ✗ ⓔ 형용사 + enough' },
      { q: '두 문장의 뜻이 같은 것을 모두 고르시오.', box: [
        '(a) The soup was so hot that I couldn’t eat it. = The soup was too hot for me to eat.',
        '(b) The test was so easy that we could pass it. = The test was too easy for us to pass.',
        '(c) He is so strong that he can lift the rock. = He is strong enough to lift the rock.',
        '(d) It is necessary that you should rest. = It is necessary for you to rest.',
        '(e) She is so kind that she helps everyone. = It is kind for her to help everyone.'], a: '(a), (c), (d)', why: '(b) 할 수 있다 → easy enough (e) 뜻 다름 · kind → of' },
      { q: '빈칸에 for us를 쓸 수 없는 것을 모두 고르시오.', box: [
        '(a) It was too dark ______ to play outside.', '(b) We are too tired ______ to walk home.', '(c) The lake was warm enough ______ to swim in.',
        '(d) We hope ______ to win the game.', '(e) It is important ______ to keep the rules.'], a: '(b), (d)', why: '문장 주어 We와 같음 → 생략' }] },
    { level: 'Advanced · 객관식', type: 'mcq', free: true, instr: '알맞은 답을 고르시오.', items: [
      { q: '다음 문장과 뜻이 같은 것은? — The box was so heavy that I couldn’t lift it.', opts: [
        'The box was too heavy for me to lift it.', 'The box was heavy enough for me to lift.', 'The box was too heavy for me to lift.',
        'The box was too heavy for I to lift.', 'The box is too heavy for me to lift.'], a: '③', why: '① it ✗ ② 뜻 반대 ④ me ⑤ 시제' },
      { q: '다음 중 밑줄 친 부분을 생략할 수 있는 것은?', opts: [
        'It is hard __for us__ to live without water.', 'It was kind __of him__ to help me.', 'It is easy __for me__ to cook ramyeon.',
        'The bag is too big __for her__ to carry.', 'It was impossible __for him__ to catch any fish.'], a: '①', why: '① 일반인(우리 모두) → 생략 가능' },
      { q: '다음 중 어법상 틀린 문장은?', opts: [
        'It is important that you should listen carefully.', 'The water is clean enough for us to drink.', 'He was too sick to go to school.',
        'The bridge was too narrow for the truck to cross it.', 'It was so cold that we stayed inside.'], a: '④', why: '④ cross it → cross' },
      { q: '다음 중 두 문장의 뜻이 같지 않은 것은?', opts: [
        'It is necessary that we should wait. = It is necessary for us to wait.', 'She is so smart that she can solve it. = She is smart enough to solve it.',
        'The tea was too hot for me to drink. = The tea was so hot that I couldn’t drink it.', 'He is too young to watch the movie. = He is so young that he can’t watch the movie.',
        'The shoes were so small that I couldn’t wear them. = The shoes were small enough for me to wear.'], a: '⑤', why: '⑤ 신을 수 없음 ↔ 신을 수 있음' },
      { q: '(A)~(C)에 알맞은 말이 바르게 짝지어진 것은? — (A) The rope was strong (enough / too) to hold him. (B) It was too dark (for we / for us) to see. (C) The book is too difficult for me to (read / read it).', opts: [
        'enough – for we – read', 'too – for us – read it', 'enough – for us – read', 'too – for we – read', 'enough – for us – read it'], a: '③', why: '형용사 + enough / 목적격 / it ✗' }] },
    { level: '전환 · 연결', type: 'write', instr: '같은 뜻이 되도록 괄호 안의 지시대로 문장을 바꾸어 쓰시오.', items: [
      { q: 'The box was so heavy that I couldn’t lift it. (too ~ to)', a: 'The box was too heavy for me to lift.', why: 'I → for me, it 삭제' },
      { q: 'He is so young that he can’t drive a car. (too ~ to)', a: 'He is too young to drive a car.', why: '주어와 같음 → for him 생략' },
      { q: 'The river was so clean that we could swim in it. (enough to)', a: 'The river was clean enough for us to swim in.', why: 'we → for us, it 삭제' },
      { q: 'It is necessary that you should wear a helmet. (for + 목적격 + to부정사)', a: 'It is necessary for you to wear a helmet.', why: 'you → for you' },
      { q: 'It is important for us to save energy. (that ~ should)', a: 'It is important that we should save energy.', why: 'for us → that we should' },
      { q: 'The question was too difficult for them to answer. (so ~ that)', a: 'The question was so difficult that they couldn’t answer it.', why: '과거 → couldn’t, 목적어 it 추가' },
      { q: 'The ice was thick enough for the kids to walk on. (so ~ that)', a: 'The ice was so thick that the kids could walk on it.', why: '과거 → could, on it' },
      { q: 'It was so cold that we couldn’t go outside. (too ~ to)', a: 'It was too cold for us to go outside.', why: 'we → for us' },
      { q: 'The music was so loud that I couldn’t hear you. (too ~ to)', a: 'The music was too loud for me to hear you.', why: '목적어 you ≠ 주어 → 그대로 둔다' },
      { q: 'She is so tall that she can touch the ceiling. (enough to)', a: 'She is tall enough to touch the ceiling.', why: '주어와 같음 → 생략' }] },
  ], m),

  // ---------------- PERFECT CHECK ----------------
  D.section('PERFECT CHECK', '상위권 함정 체크'),
  ...D.drill(null, '', [{ level: '함정', type: 'choice', instr: '실수하기 쉬운 문장들이에요. 괄호 안에서 알맞은 것을 고르시오.', items: [
    { q: 'It was impossible (for him / of him) to catch any fish.', a: 'for him', why: '본문 — impossible 판단 → for' },
    { q: 'It is very kind (for you / of you) to say so.', a: 'of you', why: 'kind 성격 → of' },
    { q: 'The puzzle was too hard for me to (solve it / solve).', a: 'solve', why: '주어 = 목적어 → it ✗' },
    { q: 'She is (old enough / enough old) to travel alone.', a: 'old enough', why: '형용사 + enough' },
    { q: 'It was careless (of he / of him) to leave the door open.', a: 'of him', why: 'of + 목적격' },
    { q: 'It would be wonderful if I (can / could) eat fresh fish.', a: 'could', why: '본문 — 가정법 과거 (같은 과 문법 혼합)' },
    { q: '(It / That) is not easy for me to move this table.', a: 'It', why: '가주어 it' },
    { q: 'He was too sleepy (to do / for him to do) his homework.', a: 'to do', why: '주어와 같음 → 생략' },
    { q: 'It is necessary that you (eating / should eat) more vegetables.', a: 'should eat', why: 'that절 → (should) 동사원형' },
    { q: 'Munjado is a type of folk painting (what / that) was popular in the late Joseon dynasty.', a: 'that', why: '본문 — 선행사 있음 → 주격 관계대명사 (이전 단원 복습)' }] }], m),

  // ---------------- WRITE ----------------
  D.section('WRITE', '서술형 대비'),
  ...D.writeItem(1, 'Basic', '괄호 안의 단어를 알맞은 형태로 바꾸어 쓰시오.', ['It was impossible for (he) to catch any fish. (본문)'], { a: 'him', why: 'for + 목적격' }, m),
  ...D.writeItem(2, 'Basic', '빈칸에 알맞은 전치사를 쓰시오.', ['It’s very kind ______ you to help my son.'], { a: 'of', why: 'kind 성격 → of (교과서)' }, m),
  ...D.writeItem(3, 'Intermediate', '두 문장의 의미가 같도록 <It ~ for + 목적격 + to부정사>를 사용하여 문장을 완성하시오. [문장 전환]', ['It is necessary that we should protect old paintings like Munjado.'],
    { a: 'It is necessary for us to protect old paintings like Munjado.', why: 'that we should → for us to' }, m),
  ...D.writeItem(4, 'Intermediate', '같은 뜻이 되도록 too ~ to를 사용하여 문장을 바꾸어 쓰시오. [문장 전환]', ['The ice on the river was so thick that the man couldn’t break it. (본문 변형)'],
    { a: 'The ice on the river was too thick for the man to break.', why: 'the man → for the man, 주어를 가리키는 it 삭제' }, m),
  ...D.writeItem(5, 'Intermediate', '두 문장을 <It ~ of + 목적격 + to부정사>를 사용하여 한 문장으로 연결하시오. [두 문장 연결]', ['Junho gave his seat to an old lady on the bus. He was polite.'],
    { a: 'It was polite of Junho to give his seat to an old lady on the bus.', why: 'polite 태도 → of, 과거 was' }, m),
  ...D.writeItem(6, 'Intermediate', '같은 뜻이 되도록 enough to를 사용하여 문장을 바꾸어 쓰시오. [문장 전환]', ['The lotus flowers were so strong that they could bloom in muddy ponds. (본문 소재)'],
    { a: 'The lotus flowers were strong enough to bloom in muddy ponds.', why: '주어와 같음 → 의미상 주어 생략, 형용사 + enough' }, m),
  ...D.writeItem(7, 'Advanced', '우리말과 같은 뜻이 되도록 <조건>에 맞게 영작하시오.', ['그가 같은 실수를 두 번 하다니 어리석다.', '<조건> 가주어 it을 사용할 것 · foolish, mistake, twice를 사용할 것 · 현재시제 · 총 11단어'],
    { a: 'It is foolish of him to make the same mistake twice.', why: '교과서 문장 · 11단어 (It/is/foolish/of/him/to/make/the/same/mistake/twice)' }, m),
  ...D.writeItem(8, 'Advanced', '<보기>의 단어를 배열하여 문장을 완성하시오. (필요하면 형태를 바꿀 것)', ['조선 시대 아이들이 문자도를 통해 가족 간 화합의 중요성을 배우는 것은 가능했다.', '<보기> it / be / possible / for / children in the Joseon dynasty / learn / the importance of harmony in family / through Munjado'],
    { a: 'It was possible for children in the Joseon dynasty to learn the importance of harmony in family through Munjado.', why: 'be → was, learn → to learn (본문 소재)' }, m),
  ...D.writeItem(9, 'Advanced', '어법상 틀린 부분 2개를 찾아 바르게 고치고, 그 이유를 쓰시오.', ['It was careless for him to lose his key. The door was too strong for him to open it.'],
    { a: '① for him → of him  ② open it → open', why: '① careless는 성격 형용사 → of ② too ~ to에서 주어(The door)를 가리키는 목적어 it 생략', blanks: ['고친 것', '이유'] }, m),
  ...D.writeItem(10, 'Advanced', '어법상 틀린 부분 2개를 찾아 바르게 고치고, 그 이유를 쓰시오.', ['It is important for they to keep their promises, and it was nice for you to remind them.'],
    { a: '① they → them  ② for you → of you', why: '① for + 목적격 ② nice는 성격 형용사 → of', blanks: ['고친 것', '이유'] }, m),

  // ---------------- MAP ----------------
  D.section('MAP', "DAVID'S MAP — 백지노트 테스트"),
  D.P([D.T('오늘 배운 내용을 떠올리며 빈칸을 채워 보세요. 책을 보지 않고!', { size: 18, color: '595959' })], { spacing: { after: 120 }, keepNext: true }),
  ...D.image(path.join(__dirname, 'map_G-의미상주어.png'), 620),
  ...D.table(['자가 체크 — 백지노트에 이 단어들이 들어갔나요?', '✔'], [
    ['It = 가주어 / to부정사 = 진주어', ''], ['의미상 주어 = to부정사의 행동 주체', ''], ['for + 목적격 (for he ✗ → for him)', ''],
    ['판단 형용사: easy · hard · important · necessary · impossible → for', ''], ['성격 형용사: kind · nice · wise · foolish · careless · rude · polite → of', ''],
    ['“너 ~하다” 테스트: You are kind ○ → of', ''], ['생략: 주어·목적어와 같을 때 · 일반인일 때 (같·모 생략)', ''],
    ['too ~ for 목 to V (끝 it ✗) ↔ so ~ that S can’t V it', ''], ['형용사 + enough + for 목 + to V / It is ~ that S should V', ''],
    ['본문: It was impossible for him to catch any fish.', '']], [8838, 800], m),
  ...D.memo(['다음 시간 도입: for / of 판단 10초 퀴즈 10문항 (형용사만 보여 주고 손 들기)', '약한 반: Point 1·2 확실히 → Point 3은 too ~ to의 it 삭제와 enough 위치만 집중',
    '같은 과 가정법 과거와 섞어 본문 문장 2개(It was impossible … / It would be wonderful …) 통째 암기 확인'], m),
];
D.render(meta, build, process.argv[2] || '.').then(f => console.log(f.join('\n')));
