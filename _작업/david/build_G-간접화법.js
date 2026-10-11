const D = require('./david_base');
const path = require('path');
const COVER = JSON.parse(process.env.COVER || '{}');
const meta = { series: D.SERIES.G, code: 'G-간접화법', title: '간접화법', category: 'G. 화법  |  직접화법 → 간접화법',
  rightText: 'G  간접화법 (Reported Speech)', prefix: process.env.PREFIX || '', cover: COVER.title ? COVER : undefined,
  question: 'Garcia-Fuller said, “~~I am~~ teaching ~~my~~ students …” / Garcia-Fuller said ~~she was~~ teaching ~~her~~ students … — 같은 말인데 왜 I가 she로, am이 was로 바뀔까?' };

const build = (m) => [
  D.section('FLOW', 'Teaching Flow — 처음 배우는 사람도 따라오는 5단계'),
  ...D.step(1, '우리말로 먼저 생각하기 — 남의 말 전하기', [
    '민지: “나 배고파.” → (친구에게 전할 때) ‘민지가 {{자기가}} 배고프다고 했어.’ — 전하는 사람 입장에서 ‘나’가 ‘자기(그녀)’로 바뀐다.',
    '말을 그대로 따옴표로 옮기면 {{직접화법}}, 따옴표 없이 전하는 사람 입장으로 바꿔 전하면 {{간접화법}}.'], m),
  ...D.step(2, '이전 단원 복습 — that절 · 과거완료 had p.p.', [
    'I think {{that}} he is honest. — that은 ‘~라는 것’ 명사절을 이끄는 접속사, 목적어 자리의 that은 생략 가능',
    'The article said Nobel {{had died}} in France. — said(과거)보다 먼저 일어난 일은 had p.p. (6과 과거완료)'], m),
  ...D.step(3, '문제 제기 — 따옴표를 떼면 무엇이 바뀔까?', [
    'Garcia-Fuller said, “**I am** teaching **my** students how to tell fake news from real news.”',
    '따옴표를 떼고 ‘내’가 전하면? I는 누구? am은 언제? my는 누구의 학생?'], m),
  ...D.step(4, '규칙 발견 — 인칭 · 시제 · 부사를 전하는 사람 입장으로', [
    'Garcia-Fuller said (that) {{she}} {{was}} teaching {{her}} students how to tell fake news from real news. (본문)',
    'I → she (말한 사람) / am → was (said가 과거 → 시제 일치) / my → her / 지금(now) → {{then}}'], m),
  ...D.step(5, '결론 🔑', [
    '평서문 = said (that) / say to → {{told}} + 사람 · 의문사 있는 의문문 = asked + 의문사 + {{주어 + 동사}} · 의문사 없는 의문문 = asked + {{if / whether}} · 명령문 = told / asked + 목적어 + {{to-v}}'], m),
  ...D.infoBox('오늘의 핵심 3문장', [
    '① Garcia-Fuller said {{she was}} teaching her students how to tell fake news from real news. (본문)',
    '② She {{told}} her brother that she was not crying. (교과서)',
    '③ You also have to check {{if}} they are based on facts. (본문 · ~인지)'], m),
  ...D.tip(['칠판에 말풍선(직접화법)과 전하는 사람(간접화법)을 나란히 그리고, 말풍선 속 I · my · now · am에 동그라미 → 화살표로 she · her · then · was로 바꾸는 장면을 보여 준다.',
    '같은 과 문법 if(~인지)는 의문사 없는 의문문 전환(asked if / whether)과 직결되므로 Point 3에서 함께 다루고, PERFECT CHECK에 if 2문항을 섞어 두었다.'], m),

  // ---------------- Point 1 ----------------
  D.section('Point 1', '평서문의 화법 전환 — said (that) · say to → told · 인칭 바꾸기', 'point'),
  ...D.table(['직접화법', '간접화법 · 설명', '예'], [
    ['say, “…”', 'say (that) + 주어 + 동사 — 콤마 · 따옴표를 없애고 that으로 연결 (that 생략 가능)', 'Jane said, “I want to be a teacher.” → Jane **said (that)** she wanted to be a teacher. (교과서)'],
    ['say to + 사람, “…”', 'tell + 사람 + (that) … — tell 뒤에는 듣는 사람(목적어)이 꼭 온다', 'She said to her brother, “I am not crying.” → She **told her brother** that she was not crying. (교과서)'],
    ['인칭 바꾸기', 'I · my → 말한 사람(he · she · his · her) / you · your → 들은 사람(me · him · my …)', 'Tom said to me, “I like your cap.” → Tom told me that **he** liked **my** cap.'],
    ['본문 (간접화법)', '직접화법으로 되돌리면 I · am · my', 'Garcia-Fuller said **she was** teaching **her** students how to tell fake news from real news. ← Garcia-Fuller said, “I am teaching my students …” (본문)'],
    ['전달동사가 현재', 'says · tells → that절 시제는 그대로', 'He says, “I’m hungry.” → He says that he **is** hungry. (워크북)']], [2000, 3500, 4138], m),
  ...D.infoBox('평서문 전환 4단계', [
    '① 전달동사: said → said / said to + 사람 → {{told}} + 사람',
    '② 콤마 · 따옴표 → {{that}} (생략 가능)',
    '③ 인칭: 따옴표 속 I는 말한 사람, you는 들은 사람으로 / ④ 시제 · 부사: 전달동사가 과거면 한 칸 과거로 (Point 2)'], m),
  ...D.trick('세이 투는 텔! 텔 뒤엔 사람!', ['“say to는 tell로 — 세이 투는 텔!”', '“told 뒤엔 반드시 사람 — told that ✗, said me ✗ → 텔 뒤엔 사람, 세이 뒤엔 바로 that!”']),
  ...D.examPoint([
    { q: 'She {{told}} her brother that she was not crying. (said ✗)', why: '뒤에 듣는 사람 her brother → told (교과서)' },
    { q: 'Jane said, “I want to be a teacher.” → Jane said that {{she}} wanted to be a teacher. (I ✗)', why: '말한 사람 Jane 입장 → she (기출)' }], m),
  ...D.caution(['tell 뒤 목적어를 뺀 선지(She told that she was sorry ✗)와 say 뒤에 목적어를 바로 쓴 선지(He said me that ✗)가 짝으로 나온다.',
    '인칭을 바꾸지 않은 선지 — He told me that you looked tired ✗ / Jane said that I wanted to be a teacher ✗ (기출 #20)',
    '직접화법으로 되돌리기: My son said that he would do his best. → My son said, “I will do my best.” — his를 그대로 둔 선지가 오답 (기출 #13)'], m),
  ...D.drill(1, '평서문의 화법 전환 — 전달동사 · 인칭', [
    { level: 'Basic ①', type: 'choice', instr: '괄호 안에서 알맞은 것을 고르시오.', items: [
      { q: 'Jane said, “I want to be a teacher.” → Jane said that (I / she) wanted to be a teacher.', a: 'she', why: '말한 사람 Jane → she (교과서 Your Turn)' },
      { q: 'She said to her brother, “I am not crying.” → She (told / said) her brother that she was not crying.', a: 'told', why: 'say to + 사람 → tell + 사람 (교과서)' },
      { q: 'Garcia-Fuller said (she / I) was teaching her students how to tell fake news from real news.', a: 'she', why: '본문 — I → she (전달자 입장)' },
      { q: 'Tom said to me, “I like your cap.” → Tom told me that he liked (your / my) cap.', a: 'my', why: 'your = 들은 사람(나) → my' },
      { q: 'Judy said to me, “I’m too sleepy.” → Judy (said / told) me that she was too sleepy.', a: 'told', why: '뒤에 목적어 me → told' },
      { q: 'Bob said, “My sister looks happy.” → Bob said (that / what) his sister looked happy.', a: 'that', why: '평서문 → that (교과서 Think & Try)' },
      { q: 'Mina said to Jiho, “You are very tall.” → Mina told Jiho that (you were / he was) very tall.', a: 'he was', why: 'you = 들은 사람 Jiho → he' },
      { q: 'He (told / said), “I don’t need anything more.”', a: 'said', why: '듣는 사람 없이 직접화법 → said (워크북)' },
      { q: 'The old man said, “I want some water.” → The old man said (he / I) wanted some water.', a: 'he', why: '말한 사람 the old man → he (교과서)' },
      { q: 'My mom said to me, “I will buy a new phone for you.” → My mom told me that she would buy a new phone for (me / you).', a: 'me', why: 'you = 들은 사람(나) → me' }] },
    { level: 'Basic ②', type: 'fill', instr: '<보기>에서 알맞은 말을 골라 빈칸에 쓰시오. (한 번씩만 사용)',
      bogi: ['told', 'said', 'she', 'that', 'my', 'him', 'they', 'his', 'her', 'me'], items: [
      { q: 'Garcia-Fuller said [[she]] was teaching her students how to tell fake news from real news.', why: '본문 — I → she' },
      { q: 'She [[told]] her brother that she was not crying.', why: '교과서 — 뒤에 듣는 사람 → told' },
      { q: 'Patricia said to me, “I like your post.” → Patricia told me that she liked [[my]] post.', why: 'your(들은 사람 = 나) → my' },
      { q: 'Jake said to Amy, “I will help you.” → Jake told Amy that he would help [[her]].', why: 'you = Amy → her' },
      { q: 'Ben said, “My dog is sick.” → Ben said that [[his]] dog was sick.', why: 'my = Ben의 → his' },
      { q: 'Sujin said to Minho, “I miss you.” → Sujin told Minho that she missed [[him]].', why: 'you = Minho → him' },
      { q: 'The kids said, “We are hungry.” → The kids said that [[they]] were hungry.', why: 'we = 말한 사람들 → they' },
      { q: 'Dad said to me, “I’m proud of you.” → Dad told [[me]] that he was proud of me.', why: 'tell + 듣는 사람(me)' },
      { q: 'McKenzie [[said]], “Opinions are good to read.”', why: '본문 — 듣는 사람 없는 직접화법 → said' },
      { q: 'Jina told me [[that]] she wanted to be a scientist.', why: '평서문 전환 — 접속사 that' }] },
    { level: 'Intermediate', type: 'write', instr: '어법상 틀린 부분을 찾아 바르게 고쳐 쓰시오.', items: [
      { q: 'She told that she was sorry.', a: 'told → said', why: 'tell 뒤에는 듣는 사람 필수 (told me that도 가능) (기출)' },
      { q: 'He said me that he was sick.', a: 'said → told', why: '목적어 me가 있으면 told (워크북)' },
      { q: 'Jane said, “I want to be a teacher.” → Jane said that I wanted to be a teacher.', a: 'I → she', why: '말한 사람 Jane 입장 (기출)' },
      { q: 'He said to me, “You look tired.” → He told me that you looked tired.', a: 'you → I', why: 'you = 들은 사람(나) → I (기출)' },
      { q: 'Dad talked me that he loved me.', a: 'talked → told', why: '‘~에게 …라고 말하다’ = tell + 사람 + that (워크북)' },
      { q: 'Garcia-Fuller said she is teaching her students how to tell fake news from real news.', a: 'is → was', why: '본문 — said(과거) → 시제 일치' },
      { q: 'Mike said to Sue, “I like your idea.” → Mike told Sue that he liked my idea.', a: 'my → her', why: 'your = 들은 사람 Sue → her' },
      { q: 'She said to us, “I will miss you.” → She told us that she would miss them.', a: 'them → us', why: 'you = 들은 사람(우리) → us' },
      { q: 'Bob said, “My sister looks happy.” → Bob said what his sister looked happy.', a: 'what → that', why: '평서문 → 접속사 that' },
      { q: 'The girls said, “We are ready.” → The girls said that we were ready.', a: 'we → they', why: 'we = 말한 사람들 → they' }] },
    { level: 'Advanced · 모두 고르기', type: 'multi', free: true, instr: '해당하는 것을 모두 골라 기호를 쓰시오.', items: [
      { q: '다음 중 간접화법 전환이 올바른 것을 모두 고르시오.', box: [
        '(a) Jane said, “I want to be a teacher.” → Jane said that I wanted to be a teacher.',
        '(b) She said to her brother, “I am not crying.” → She told her brother that she was not crying.',
        '(c) He said to me, “I like you.” → He said me that he liked me.',
        '(d) Tom said to Amy, “I’ll call you.” → Tom told Amy that he would call her.',
        '(e) Bob said, “My sister looks happy.” → Bob told that his sister looked happy.'], a: '(b), (d)', why: '(a) I → she (c) said me → told me (e) told → said' },
      { q: '다음 중 밑줄 친 부분에 대한 설명으로 옳은 것을 모두 고르시오.', box: [
        '(a) Garcia-Fuller said __she__ was teaching her students … → 직접화법의 I를 전달자 입장으로 바꾼 것이다.',
        '(b) She __told__ her brother that she was not crying. → told 뒤의 her brother는 생략할 수 있다.',
        '(c) Jane said __that__ she wanted to be a teacher. → 명사절을 이끄는 접속사로 생략할 수 있다.',
        '(d) He __says__ that he is hungry. → 전달동사가 현재이므로 that절은 과거시제로 바꿔야 한다.',
        '(e) Mina told me that she liked __my__ bag. → 직접화법의 your를 전달자 입장에서 바꾼 것이다.'], a: '(a), (c), (e)', why: '(b) tell 뒤 듣는 사람 생략 ✗ (d) 전달동사 현재 → 시제 그대로' },
      { q: '다음 대화의 밑줄 친 ⓐ~ⓔ 중 어법상 어색한 것을 모두 골라 기호를 쓰고 바르게 고치시오.', fix: true, label: '기호 / 고친 것', box: [
        'A: What did the woman say to her brother?',
        'B: She ⓐ __told him__ that she ⓑ __is__ very happy to meet him. She ⓒ __said him__ that ⓓ __he__ was very tall. She also told him that ⓔ __she__ had blue eyes like her.'],
        a: 'ⓑ is → was, ⓒ said him → told him, ⓔ she → he', why: 'ⓑ 시제 일치 ⓒ 듣는 사람 → told ⓔ “You have blue eyes like me.” → he had blue eyes like her (교과서 Say Say 변형)' },
      { q: '빈칸에 told가 들어갈 수 있는 것을 모두 고르시오.', box: [
        '(a) Garcia-Fuller ______ she was teaching her students how to tell fake news.',
        '(b) She ______ her brother that she was not crying.',
        '(c) Mina ______ me that she wanted to be a doctor.',
        '(d) He ______, “I don’t need anything more.”',
        '(e) My teacher ______ us that the test was easy.'], a: '(b), (c), (e)', why: '(a)(d) 듣는 사람(목적어)이 없음 → said' },
      { q: '간접화법 문장을 직접화법으로 바르게 되돌린 것을 모두 고르시오.', box: [
        '(a) Garcia-Fuller said she was teaching her students how to tell fake news from real news. → Garcia-Fuller said, “I am teaching my students how to tell fake news from real news.”',
        '(b) My son said that he would do his best. → My son said, “I will do his best.”',
        '(c) She told her brother that she was not crying. → She said to her brother, “She is not crying.”',
        '(d) Bob said his sister looked happy. → Bob said, “My sister looks happy.”',
        '(e) Jane told me that she liked my dress. → Jane said to me, “I like my dress.”'], a: '(a), (d)', why: '(b) his → my (기출) (c) She → I (e) my dress → your dress' }] },
    { level: 'Advanced · 객관식', type: 'mcq', free: true, instr: '알맞은 답을 고르시오.', items: [
      { q: '다음 문장을 간접화법으로 바꿀 때 빈칸에 알맞은 것은? — She said to me, “I like your dress.” → She told me that ______.', opts: [
        'I liked your dress', 'she likes my dress', 'she liked your dress', 'she liked my dress', 'I like my dress'], a: '④', why: 'I → she / your → my / like → liked' },
      { q: '다음 문장을 직접화법으로 바르게 바꿔 쓴 것은? — My son said that he would do his best.', opts: [
        'My son said, “I will do his best.”', 'My son said, “I will do my best.”', 'My son said, “He will do my best.”', 'My son told, “I will do my best.”', 'My son said, “He will do his best.”'], a: '②', why: 'he · his → I · my / would → will (기출 #13)' },
      { q: '빈칸 (A), (B)에 들어갈 말이 바르게 짝지어진 것은?', box: [
        '• Junho (A) ______ Somi that he liked the movie.', '• Somi (B) ______ she thought it was a bit boring.'],
        opts: ['said – told', 'said – said', 'told – told', 'said – that', 'told – said'], a: '⑤', why: '(A) 뒤에 듣는 사람 Somi → told (B) 듣는 사람 없음 → said (기출 #11 변형)' },
      { q: '다음 중 어법상 틀린 문장의 개수는?', box: [
        '(a) She told that she was sorry.', '(b) Bob said his sister looked happy.', '(c) Mina told me she wanted some water.',
        '(d) He told me that he was busy.', '(e) Jane told her mom that she was hungry.'], opts: ['1개', '2개', '3개', '4개', '5개'], a: '①', why: '(a)만 틀림 — told → said (기출)' },
      { q: '우리말을 영어로 바르게 옮긴 것은? — 그녀는 오빠에게 자신은 울고 있지 않다고 말했다.', opts: [
        'She said her brother that she was not crying.', 'She told her brother that I was not crying.', 'She told her brother that she was not crying.',
        'She told to her brother that she was not crying.', 'She said her brother she is not crying.'], a: '③', why: 'told + 사람 + that + she was (교과서)' }] },
    { level: '전환 · 연결', type: 'write', instr: '직접화법은 간접화법으로, 간접화법은 직접화법으로 바꾸어 쓰시오.', items: [
      { q: 'Jane said, “I want to be a teacher.”', a: 'Jane said (that) she wanted to be a teacher.', why: '교과서 Your Turn' },
      { q: 'She said to her brother, “I am not crying.”', a: 'She told her brother (that) she was not crying.', why: '교과서 — say to → tell' },
      { q: 'Garcia-Fuller said, “I am teaching my students how to tell fake news from real news.”', a: 'Garcia-Fuller said (that) she was teaching her students how to tell fake news from real news.', why: '본문' },
      { q: 'The old man said, “I want some water.”', a: 'The old man said (that) he wanted some water.', why: '교과서 Think & Try' },
      { q: 'Bob said, “My sister looks happy.”', a: 'Bob said (that) his sister looked happy.', why: 'my → his / looks → looked' },
      { q: 'Mina said to me, “I like your new shoes.”', a: 'Mina told me (that) she liked my new shoes.', why: 'your → my' },
      { q: 'He said, “I know the answer.”', a: 'He said (that) he knew the answer.', why: '교과서 Your Turn' },
      { q: 'Tony said to Emma, “You are my best friend.”', a: 'Tony told Emma (that) she was his best friend.', why: 'you → she / my → his' },
      { q: 'Jina told me that she wanted to be a scientist. (직접화법으로)', a: 'Jina said to me, “I want to be a scientist.”', why: '역전환 — told me → said to me, she → I' },
      { q: 'The students said, “We need more time.”', a: 'The students said (that) they needed more time.', why: 'we → they' }] },
  ], m),

  // ---------------- Point 2 ----------------
  D.section('Point 2', '시제 일치와 부사(구) 바꾸기 — now → then · today → that day (+ 시제 일치의 예외)', 'point'),
  ...D.table(['구분', '직접화법 → 간접화법 (전달동사가 과거일 때)', '예'], [
    ['현재 → 과거', 'am · is → was / are → were / 일반동사 → 과거형', 'John said, “I am so happy now.” → John said that he **was** so happy **then**. (교과서)'],
    ['과거 · 현재완료 → 과거완료', 'saw · have seen → had seen (말한 시점보다 먼저)', 'She said to me, “I saw your sister today.” → She told me that she **had seen** my sister **that day**. (기출)'],
    ['조동사', 'will → would / can → could / may → might', 'She said, “I can leave tomorrow.” → She said that she **could** leave **the next day**. (기출)'],
    ['때 · 장소 · 지시어', 'now → then / here → there / this(these) → that(those) / ago → before', 'He said, “I saw her three days ago.” → He said that he had seen her three days **before**. (워크북)'],
    ['날짜 표현', 'today → that day / tonight → that night / yesterday → the day before(the previous day) / tomorrow → the next day(the following day) / last week → the week before / next week → the following week', 'Amy said, “I’ll be home late tonight.” → Amy said that she would be home late **that night**. (워크북)']], [2100, 3800, 3738], m),
  ...D.infoBox('시제 일치의 예외 — 바꾸지 않는 경우', [
    '전달동사가 현재(says · tells · asks) → that절 시제 {{그대로}}: He says, “I was busy yesterday.” → He says that he was busy yesterday.',
    '불변의 진리 · 속담 → 항상 {{현재}}: My mom told me that the sun {{rises}} in the east. (rose ✗) / Dad told me that time is money.',
    '현재의 습관 · 지금도 사실인 일 → 현재 가능: He told me that he gets up at 5 every morning. / Garcia-Fuller also said sometimes it {{can}} be very hard to be a smart news reader. (본문)'], m),
  ...D.trick('시제는 한 칸 뒤로 이사!', ['“am → was, will → would, saw → had seen — 시제는 한 칸씩 뒤로 이사!”', '“나우는 덴, 히어는 데어, 투데이는 댓 데이, 어고는 비포!”', '“진리 · 습관은 이사 안 감 — 해는 늘 rises!”']),
  ...D.examPoint([
    { q: 'She said, “I can leave tomorrow.” → She said that she {{could}} leave {{the next day}}.', why: 'can → could / tomorrow → the next day (기출 #12)' },
    { q: 'She said to me, “I saw your sister today.” → She told me that she {{had seen}} my sister {{that day}}.', why: 'saw → had seen / today → that day (기출 #14)' }], m),
  ...D.caution(['시제만 바꾸고 부사를 그대로 둔 선지 — Mary said that she was living in Seoul now ✗ (then) / she could leave tomorrow ✗ (기출 #12, #16)',
    '부사만 바꾸고 시제를 그대로 둔 선지 — Amy told her brother that that day he is late again ✗ (was) (기출 #16)',
    'tomorrow → the day before / the previous day를 섞은 선지(기출 #15), ago를 그대로 둔 선지, 진리를 과거로 바꾼 선지(the sun rose ✗)가 단골이다.'], m),
  ...D.drill(2, '시제 일치 · 부사(구) 바꾸기', [
    { level: 'Basic ①', type: 'choice', instr: '괄호 안에서 알맞은 것을 고르시오.', items: [
      { q: 'John said, “I am so happy now.” → John said that he was so happy (then / now).', a: 'then', why: 'now → then (교과서)' },
      { q: 'She said, “I can leave tomorrow.” → She said that she (can / could) leave the next day.', a: 'could', why: 'can → could (기출)' },
      { q: 'Amy said, “I’ll be home late tonight.” → Amy said that she would be home late (tonight / that night).', a: 'that night', why: 'tonight → that night (워크북)' },
      { q: 'Frank said, “I saw a UFO last night.” → Frank said that he (had seen / has seen) a UFO the night before.', a: 'had seen', why: '과거 → 과거완료 (워크북)' },
      { q: 'He said, “I saw her three days ago.” → He said that he had seen her three days (before / ago).', a: 'before', why: 'ago → before (워크북)' },
      { q: 'Mike said, “I’m meeting a friend here.” → Mike said that he was meeting a friend (here / there).', a: 'there', why: 'here → there' },
      { q: 'My mom told me that the sun (rises / rose) in the east.', a: 'rises', why: '불변의 진리 → 현재 (워크북)' },
      { q: 'He says, “I was busy yesterday.” → He says that he (was / had been) busy yesterday.', a: 'was', why: '전달동사 현재 → 시제 그대로 (교과서)' },
      { q: 'Tom said, “I will visit my grandma tomorrow.” → Tom said that he would visit his grandma (tomorrow / the next day).', a: 'the next day', why: 'tomorrow → the next day' },
      { q: 'Sujin said, “I don’t like these shoes.” → Sujin said that she didn’t like (these / those) shoes.', a: 'those', why: 'these → those' }] },
    { level: 'Basic ②', type: 'fill', instr: '<보기>에서 알맞은 말을 골라 빈칸에 쓰시오. (한 번씩만 사용)',
      bogi: ['then', 'there', 'that day', 'before', 'the next day', 'would', 'had', 'those', 'could', 'boils'], items: [
      { q: 'Mary said, “I’m living in Seoul now.” → Mary said that she was living in Seoul [[then]].', why: 'now → then (기출)' },
      { q: 'She said to me, “I saw your sister today.” → She told me that she had seen my sister [[that day]].', why: 'today → that day (기출)' },
      { q: 'Kate said to Tom, “I will meet your sister tomorrow.” → Kate told Tom that she [[would]] meet his sister the next day.', why: 'will → would (기출)' },
      { q: 'He said, “I lost my bag two days ago.” → He said that he had lost his bag two days [[before]].', why: 'ago → before' },
      { q: 'Greg said to me, “I will meet you here.” → Greg told me that he would meet me [[there]].', why: 'here → there' },
      { q: 'Ann said, “I can swim very fast.” → Ann said that she [[could]] swim very fast.', why: 'can → could' },
      { q: 'Our science teacher said that water [[boils]] at 100°C.', why: '과학적 사실 → 현재' },
      { q: 'Leo said, “I have finished my homework.” → Leo said that he [[had]] finished his homework.', why: '현재완료 → 과거완료' },
      { q: 'Jisu said, “I want these cookies.” → Jisu said that she wanted [[those]] cookies.', why: 'these → those' },
      { q: 'Chris said to me, “I’ll call you tomorrow.” → Chris told me that he would call me [[the next day]].', why: 'tomorrow → the next day' }] },
    { level: 'Intermediate', type: 'write', instr: '어법상 틀린 부분을 찾아 바르게 고쳐 쓰시오.', items: [
      { q: 'Mary said that she was living in Seoul now.', a: 'now → then', why: '부사 변환 (기출 #16)' },
      { q: 'Maria said that she lives in Atlanta then.', a: 'lives → lived', why: '시제 일치 (워크북)' },
      { q: 'She told me that she will visit the museum the next day.', a: 'will → would', why: '시제 일치 (워크북)' },
      { q: 'My brother said that he eats spaghetti the day before.', a: 'eats → had eaten', why: 'the day before(전날)의 일 → 과거완료 (워크북)' },
      { q: 'He said that he had seen her three days ago.', a: 'ago → before', why: '부사 변환' },
      { q: 'My mom told me that the sun rose in the east.', a: 'rose → rises', why: '불변의 진리 → 현재 (워크북)' },
      { q: 'Kate told Tom that she would meet his sister tomorrow.', a: 'tomorrow → the next day', why: '부사 변환 (기출)' },
      { q: 'Amy told her brother that that day he is late again.', a: 'is → was', why: '시제 일치 (기출 #16)' },
      { q: 'Jake said that he can come to my party the next day.', a: 'can → could', why: '조동사 시제 일치' },
      { q: 'Sam said that he has already finished his homework.', a: 'has → had', why: '현재완료 → 과거완료' }] },
    { level: 'Advanced · 모두 고르기', type: 'multi', free: true, instr: '해당하는 것을 모두 골라 기호를 쓰시오.', items: [
      { q: '다음 중 간접화법 전환이 올바른 것을 모두 고르시오.', box: [
        '(a) She said, “I can leave tomorrow.” → She said that she could leave the next day.',
        '(b) Mary said, “I’m living in Seoul now.” → Mary said that she was living in Seoul now.',
        '(c) She said to me, “I saw your sister today.” → She told me that she had seen your sister that day.',
        '(d) He said, “I lost my key yesterday.” → He said that he had lost his key the day before.',
        '(e) Amy said, “I’ll be home late tonight.” → Amy said that she will be home late that night.'], a: '(a), (d)', why: '(b) now → then (c) your → my (e) will → would' },
      { q: '다음 중 밑줄 친 부분에 대한 설명으로 옳은 것을 모두 고르시오.', box: [
        '(a) John said that he was so happy __then__. → 직접화법의 now를 바꾼 것이다.',
        '(b) My teacher said that the earth __goes__ around the sun. → 전달동사가 과거이므로 went로 고쳐야 한다.',
        '(c) She told me that she __had seen__ my sister that day. → 직접화법의 과거시제 saw를 과거완료로 바꾼 것이다.',
        '(d) He said he __would__ help me the next day. → 직접화법의 will을 시제 일치시킨 것이다.',
        '(e) Sora said that she had met him two days __ago__. → ago는 간접화법에서도 그대로 쓴다.'], a: '(a), (c), (d)', why: '(b) 진리 → 현재 그대로 (e) ago → before' },
      { q: '다음 글의 밑줄 친 ⓐ~ⓔ 중 어법상 어색한 것을 모두 골라 기호를 쓰고 바르게 고치시오.', fix: true, label: '기호 / 고친 것', box: [
        'Yesterday I met Ivy, one of Garcia-Fuller’s students. She told me that she ⓐ __was reading__ a news story about a tree octopus ⓑ __now__. She said that she ⓒ __has found__ the website two days ⓓ __before__. She also said that she ⓔ __would__ check the facts once more.'],
        a: 'ⓑ now → then, ⓒ has found → had found', why: 'ⓑ 부사 변환 ⓒ 말한 시점보다 먼저 → 과거완료 (본문 소재 변형)' },
      { q: '밑줄 친 부분을 현재시제 그대로 쓸 수 있는 것을 모두 고르시오.', box: [
        '(a) Our teacher said that light __travels__ faster than sound.',
        '(b) Tom says that he __is__ hungry.',
        '(c) He told me that he __gets__ up at 5 every morning.',
        '(d) Mina said that she __is__ tired then.',
        '(e) She said that she __wants__ to go home then.'], a: '(a), (b), (c)', why: '(a) 과학적 사실 (b) 전달동사 현재 (c) 현재의 습관 / (d)(e) then — 그때의 일 → was · wanted' },
      { q: '직접화법을 간접화법으로 바꿀 때(전달동사 과거), 부사(구) 변환이 올바른 것을 모두 고르시오.', box: [
        '(a) today → that day', '(b) tomorrow → the day before', '(c) here → there', '(d) ago → later', '(e) last night → the night before'],
        a: '(a), (c), (e)', why: '(b) tomorrow → the next day (d) ago → before' }] },
    { level: 'Advanced · 객관식', type: 'mcq', free: true, instr: '알맞은 답을 고르시오.', items: [
      { q: '다음 문장을 간접화법으로 바꿀 때 빈칸에 알맞은 것은? — She said, “I can leave tomorrow.” → She said that ______.', opts: [
        'she can be leaving today', 'she could leave the following day', 'she can leave the next day', 'she could leave tomorrow', 'she would leave tomorrow'], a: '②', why: 'can → could / tomorrow → the following day (기출 #12)' },
      { q: '다음 문장을 간접화법으로 바꿀 때 빈칸에 알맞은 것은? — She said to me, “I saw your sister today.” → She told me that ______.', opts: [
        'she saw my sister that day', 'she saw your sister that day', 'she had seen your sister the day before', 'she had seen my sister the day before', 'she had seen my sister that day'], a: '⑤', why: 'saw → had seen / your → my / today → that day (기출 #14)' },
      { q: '다음 문장과 같은 의미가 되도록 바꾸어 쓴 것으로 옳은 것은? — You said to me, “I will play soccer tomorrow.”', opts: [
        'You said that I will play soccer then.', 'You told that I would play soccer then.', 'You told me that you would play soccer the following day.',
        'You said to me that you will play soccer the day before.', 'You told me that you would play soccer the previous day.'], a: '③', why: 'told me / would / the following day (기출 #15)' },
      { q: '다음 중 어법상 옳은 문장은?', opts: [
        'My mom told me that the sun __rises__ in the east.', 'Maria said that she __lives__ in Atlanta then.', 'He said that he __will__ come again.',
        'She told me that she __is__ busy that day.', 'My brother said that he __eats__ spaghetti the day before.'], a: '①', why: '① 진리 → 현재 / ② lived ③ would ④ was ⑤ had eaten' },
      { q: '(A)~(C)에 알맞은 말이 바르게 짝지어진 것은? — (A) Frank said that he had seen a UFO (the night before / last night). (B) Ted said that he (would / will) meet me the next day. (C) He said that he had met her three days (ago / before).', opts: [
        'last night – will – ago', 'the night before – will – before', 'last night – would – before', 'the night before – would – before', 'the night before – would – ago'], a: '④', why: 'last night → the night before / will → would / ago → before' }] },
    { level: '전환 · 연결', type: 'write', instr: '다음 직접화법 문장을 간접화법으로 바꾸어 쓰시오.', items: [
      { q: 'John said, “I am so happy now.”', a: 'John said (that) he was so happy then.', why: '교과서 Grammar✚' },
      { q: 'Kate said to Tom, “I will meet your sister tomorrow.”', a: 'Kate told Tom (that) she would meet his sister the next day[the following day].', why: '기출 서술형 #26' },
      { q: 'Frank said, “I saw a UFO last night.”', a: 'Frank said (that) he had seen a UFO the night before[the previous night].', why: '워크북' },
      { q: 'Amy said, “I’ll be home late tonight.”', a: 'Amy said (that) she would be home late that night.', why: '워크북' },
      { q: 'Chris said to me, “I’ll meet you here at the library.”', a: 'Chris told me (that) he would meet me there at the library.', why: '워크북 — here → there' },
      { q: 'He said, “I saw her three days ago.”', a: 'He said (that) he had seen her three days before.', why: '워크북 — ago → before' },
      { q: 'Mina said, “I might move to Jeju next year.”', a: 'Mina said (that) she might move to Jeju the next year[the following year].', why: 'might는 그대로 / next year → the following year' },
      { q: 'Sally said to me, “I met Judy yesterday.”', a: 'Sally told me (that) she had met Judy the day before[the previous day].', why: '워크북' },
      { q: 'Leo said, “I have lost my phone.”', a: 'Leo said (that) he had lost his phone.', why: '현재완료 → 과거완료' },
      { q: 'Our teacher said, “The earth goes around the sun.”', a: 'Our teacher said (that) the earth goes around the sun.', why: '진리 → 현재 그대로' }] },
  ], m),

  // ---------------- Point 3 ----------------
  D.section('Point 3', '의문문의 화법 전환 — asked + 의문사 + 주어 + 동사 · asked if / whether', 'point'),
  ...D.table(['구분', '간접화법 · 설명', '예'], [
    ['전달동사', 'said (to) → asked — 듣는 사람은 ask 바로 뒤 (asked to me ✗)', 'He said to me, “Who are you?” → He **asked me** who I was. (워크북)'],
    ['의문사 있는 의문문', 'asked (+ 사람) + 의문사 + 주어 + 동사 — 평서문 어순, 물음표 → 마침표', 'Mike said to me, “Where are you living now?” → Mike asked me **where I was living** then. (기출)'],
    ['의문사가 주어', '의문사 + 동사 어순 그대로', 'She said, “Who is knocking on the door?” → She asked **who was knocking** on the door.'],
    ['의문사 없는 의문문', 'asked (+ 사람) + if / whether + 주어 + 동사 (‘~인지’)', 'The foreigner said to me, “Can you speak English?” → The foreigner asked me **whether I could** speak English. (기출)'],
    ['if(~인지) 연결', 'if절 = ‘~인지 아닌지’ 명사절 / whether or not ○, if or not ✗ / 조건의 if(‘만약 ~라면’)와 구별', 'You also have to check **if** they are based on facts. (본문)']], [2100, 3600, 3938], m),
  ...D.infoBox('의문문 전환 3단계', [
    '① 전달동사: said (to) → {{asked}}',
    '② 의문사가 있으면 의문사 그대로, 없으면 {{if / whether}}로 연결 (that ✗)',
    '③ 어순: 의문사 + {{주어 + 동사}} (do · did는 빼고 동사에 시제 반영) + 인칭 · 시제 · 부사 변환, ? → .'], m),
  ...D.trick('물음표 떼면 의 · 주 · 동!', ['“의문사 + 주어 + 동사 — 의·주·동! what was she ✗ → what she was”', '“예/아니오 질문은 이프 · 웨더 — 댓(that)은 출입 금지!”']),
  ...D.examPoint([
    { q: 'Mike said to me, “Where are you living now?” → Mike asked me where {{I was living}} {{then}}.', why: '의문사 + 주어 + 동사 / now → then (기출 #24)' },
    { q: 'The foreigner said to me, “Can you speak English?” → The foreigner asked me {{whether I could}} speak English.', why: '의문사 없음 → whether(if) / can → could (기출 #10)' }], m),
  ...D.caution(['의문문 어순을 그대로 둔 선지 — Mike asked her what was she doing there ✗ (기출 #16) / Tom asked her how could he get to her house ✗',
    '의문사 없는 의문문에 that을 쓴 선지(asked me that I was done ✗), 인칭을 안 바꾼 선지(asked me whether you liked her ✗) (기출 #20)',
    '시제를 안 바꾼 선지 — John asked me whether I have seen this movie ✗ (had) (기출 #22) / if or not ✗, whether or not ○ (기출 #18)'], m),
  ...D.drill(3, '의문문의 화법 전환', [
    { level: 'Basic ①', type: 'choice', instr: '괄호 안에서 알맞은 것을 고르시오.', items: [
      { q: 'Gilbert said to Anne, “Why are you crying?” → Gilbert asked Anne why (she was crying / was she crying).', a: 'she was crying', why: '의문사 + 주어 + 동사 (워크북)' },
      { q: 'Judy said to me, “Can you speak French?” → Judy asked me (if / that) I could speak French.', a: 'if', why: '의문사 없는 의문문 → if (워크북)' },
      { q: 'He said to me, “What are you doing now?” → He asked me what (was I / I was) doing then.', a: 'I was', why: '의문사 + 주어 + 동사 (워크북)' },
      { q: 'She said to me, “Where did he live?” → She (said / asked) me where he had lived.', a: 'asked', why: '의문문 → asked (워크북)' },
      { q: 'She said, “Who is knocking on the door?” → She asked (who was knocking / who knocking was) on the door.', a: 'who was knocking', why: '의문사가 주어 → 의문사 + 동사' },
      { q: 'Mom said to me, “Did you finish your homework?” → Mom asked me (what / whether) I had finished my homework.', a: 'whether', why: '의문사 없음 → whether' },
      { q: 'He said to me, “Who are you?” → He asked me who (was I / I was).', a: 'I was', why: '의문사 + 주어 + 동사 (워크북)' },
      { q: 'I said to her, “Where do you live?” → I asked her where (she lived / did she live).', a: 'she lived', why: 'do는 빼고 동사에 시제 반영' },
      { q: 'The man said to me, “Do you know the way to the station?” → The man asked me (if / that) I knew the way to the station.', a: 'if', why: '의문사 없음 → if' },
      { q: 'She said to him, “How long have you been ill?” → She asked him how long (he has been / he had been) ill.', a: 'he had been', why: '현재완료 → 과거완료 (워크북)' }] },
    { level: 'Basic ②', type: 'fill', instr: '<보기>에서 알맞은 말을 골라 빈칸에 쓰시오. (한 번씩만 사용)',
      bogi: ['asked', 'if', 'where', 'what', 'who', 'whether', 'I was', 'he had', 'how', 'when'], items: [
      { q: 'Mike said to me, “Where are you living now?” → Mike asked me [[where]] I was living then.', why: '기출 — 의문사 그대로' },
      { q: 'The foreigner said to me, “Can you speak English?” → The foreigner asked me [[whether]] or not I could speak English.', why: '바로 뒤 or not → whether (if or not ✗)' },
      { q: 'Jenny said to him, “Did you get the T-shirt?” → Jenny asked him [[if]] he had got the T-shirt.', why: '워크북 — 의문사 없음' },
      { q: 'He said to me, “What are you doing here?” → He asked me what [[I was]] doing there.', why: '의문사 + 주어 + 동사' },
      { q: 'Sam said to me, “When will the bus come?” → Sam asked me [[when]] the bus would come.', why: '의문사 when / will → would' },
      { q: 'Tina said to me, “Who is your teacher?” → Tina asked me [[who]] my teacher was.', why: '의문사 + 주어 + 동사' },
      { q: 'Ms. Lee said to Ben, “Have you seen my glasses?” → Ms. Lee asked Ben if [[he had]] seen her glasses.', why: '현재완료 → 과거완료' },
      { q: 'My dad [[asked]] me what I wanted for my birthday.', why: '의문문 → asked' },
      { q: 'I said to the cook, “How did you make the pizza?” → I asked the cook [[how]] he had made the pizza.', why: '워크북 — 의문사 how' },
      { q: 'She said to me, “What do you want to buy?” → She asked me [[what]] I wanted to buy.', why: '교과서 Your Turn' }] },
    { level: 'Intermediate', type: 'write', instr: '어법상 틀린 부분을 찾아 바르게 고쳐 쓰시오.', items: [
      { q: 'Mike asked her what was she doing there.', a: 'was she → she was', why: '의문사 + 주어 + 동사 (기출 #16)' },
      { q: 'Alice asked me that I was done with my homework.', a: 'that → if(whether)', why: '의문사 없는 의문문 (워크북)' },
      { q: 'She asked us where will the money go.', a: 'will the money go → the money would go', why: '어순 + 시제 일치 (워크북 변형)' },
      { q: 'John asked me whether I have seen the movie.', a: 'have → had', why: '현재완료 → 과거완료 (기출 #22)' },
      { q: 'He asked me if or not I liked spicy food.', a: 'if → whether', why: 'if or not ✗ / whether or not ○' },
      { q: 'Tom asked her how could he get to her house.', a: 'could he → he could', why: '의문사 + 주어 + 동사 (워크북)' },
      { q: 'He said to me, “Do you like her?” → He asked me whether you liked her.', a: 'you → I', why: '인칭 변환 (기출 #20)' },
      { q: 'My sister asked to me where I had put her phone.', a: 'asked to me → asked me', why: 'ask + 사람 (전치사 ✗)' },
      { q: 'The teacher asked us what time is it.', a: 'is it → it was', why: '어순 + 시제 일치' },
      { q: 'Jiho asked me where did I buy my bag.', a: 'did I buy → I had bought', why: 'did 빼고 평서문 어순 + 과거완료' }] },
    { level: 'Advanced · 모두 고르기', type: 'multi', free: true, instr: '해당하는 것을 모두 골라 기호를 쓰시오.', items: [
      { q: '다음 중 간접화법 전환이 올바른 것을 모두 고르시오.', box: [
        '(a) He said to me, “Do you like her?” → He asked me whether you liked her.',
        '(b) She said to me, “What do you want to buy now?” → She asked me what I wanted to buy then.',
        '(c) John said to me, “Have you seen this movie?” → John asked me whether I have seen this movie.',
        '(d) Mike said to her, “What are you doing here?” → Mike asked her what she was doing there.',
        '(e) The man said to me, “Is this your bag?” → The man asked me that that was my bag.'], a: '(b), (d)', why: '(a) you → I (c) have → had (e) that → if(whether) (기출 #20 · #22)' },
      { q: '다음 중 밑줄 친 부분에 대한 설명으로 옳은 것을 모두 고르시오.', box: [
        '(a) You also have to check __if__ they are based on facts. → ‘~인지’의 뜻으로 명사절을 이끈다.',
        '(b) He asked me __where I lived__. → 「의문사 + 주어 + 동사」 어순이다.',
        '(c) She asked who __was knocking__ on the door. → 의문사가 주어이므로 주어 + 동사 어순으로 바꿔야 한다.',
        '(d) I asked him __whether__ or not he was ready. → whether 대신 if를 써도 된다.',
        '(e) The man asked me __if__ I could help him. → ‘만약 ~라면’의 뜻이다.'], a: '(a), (b)', why: '(c) 의문사 주어 → 의문사 + 동사 그대로 (d) if or not ✗ (e) ‘~인지’' },
      { q: '다음 대화의 밑줄 친 ⓐ~ⓔ 중 어법상 어색한 것을 모두 골라 기호를 쓰고 바르게 고치시오.', fix: true, label: '기호 / 고친 것', box: [
        'A: What did the reporter ask you?',
        'B: She ⓐ __asked me__ ⓑ __that__ I read the news every day. Then she asked me where ⓒ __did I get__ my news. She also asked me ⓓ __whether__ I ⓔ __had__ ever believed a fake story.'],
        a: 'ⓑ that → if(whether), ⓒ did I get → I got', why: 'ⓑ 의문사 없는 의문문 ⓒ 의문사 + 주어 + 동사 / ⓔ “Have you ever …?” → had ever believed ○' },
      { q: '빈칸에 if가 들어갈 수 있는 것을 모두 고르시오.', box: [
        '(a) I asked him ______ he was ready.', '(b) ______ you like it or not doesn’t matter.', '(c) She asked me ______ or not I needed help.',
        '(d) You also have to check ______ they are based on facts.', '(e) Do you know ______ the store is open now?'], a: '(a), (d), (e)', why: '(b) 주어 자리 → Whether (c) 바로 뒤 or not → whether (기출 #18 · #25)' },
      { q: '간접화법 문장을 직접화법으로 바르게 되돌린 것을 모두 고르시오.', box: [
        '(a) My father asked us if we had any free time. → My father said to us, “Do you have any free time?”',
        '(b) My sister asked me what I had done with her dress. → My sister said to me, “What have you done with my dress?”',
        '(c) She asked me if I would help her. → She said to me, “Will I help you?”',
        '(d) My mom asked me who had taught me English. → My mom said to me, “Who taught you English?”',
        '(e) He asked me where I was going. → He said to me, “Where was I going?”'], a: '(a), (b), (d)', why: '(c) “Will you help me?” (e) “Where are you going?” (기출 #22 변형)' }] },
    { level: 'Advanced · 객관식', type: 'mcq', free: true, instr: '알맞은 답을 고르시오.', items: [
      { q: '두 문장이 같은 뜻이 되도록 빈칸에 알맞은 것은? — The foreigner said to me, “Can you speak English?” → The foreigner asked me ______ speak English.', opts: [
        'can I', 'if I can', 'whether I could', 'whether I can', 'that I could'], a: '③', why: '의문사 없음 → whether / can → could (기출 #10)' },
      { q: '다음 문장을 간접화법으로 바르게 바꾼 것은? — Mike said to me, “Where are you living now?”', opts: [
        'Mike asked me where I was living then.', 'Mike asked me where was I living then.', 'Mike asked me where I am living now.',
        'Mike told me where I was living then.', 'Mike asked me if I was living then.'], a: '①', why: '의문사 + 주어 + 동사 / now → then (기출 #24)' },
      { q: '다음 중 화법 전환이 어색한 것은?', opts: [
        'He said to me, “Who are you?” → He asked me who I was.', 'Judy said to me, “Can you speak French?” → Judy asked me if I could speak French.',
        'She said to me, “Where do you live?” → She asked me where I lived.', 'He said to me, “Did you write the letter?” → He asked me whether I had written the letter.',
        'Sally said to me, “Are you done with your homework?” → Sally asked me that I was done with my homework.'], a: '⑤', why: '⑤ that → if(whether)' },
      { q: '다음 밑줄 친 if의 쓰임이 나머지 넷과 다른 것은?', opts: [
        'Let me check __if__ she’s in the meeting now.', 'The concert will be canceled __if__ it rains.', 'Do you know __if__ he is married?',
        'I’m not sure __if__ they will give me a big hand.', 'I wonder __if__ the reporter saw the scene herself.'], a: '②', why: '② 조건(만약 ~라면) / 나머지 ‘~인지’ (기출 #21)' },
      { q: '우리말을 영어로 바르게 옮긴 것은? — 미나는 나에게 숙제를 끝냈는지 물었다.', opts: [
        'Mina asked me that I had finished my homework.', 'Mina asked me if had I finished my homework.', 'Mina told me if I had finished my homework.',
        'Mina asked me if I had finished my homework.', 'Mina asked to me whether I finished my homework.'], a: '④', why: 'asked + 사람 + if + 주어 + 동사 (워크북 Part 7)' }] },
    { level: '전환 · 연결', type: 'write', instr: '다음 직접화법 문장을 간접화법으로 바꾸어 쓰시오.', items: [
      { q: 'He said to me, “Who are you?”', a: 'He asked me who I was.', why: '워크북' },
      { q: 'Mike said to me, “Where are you living now?”', a: 'Mike asked me where I was living then.', why: '기출 서술형 #24' },
      { q: 'She said to him, “What are you doing here?”', a: 'She asked him what he was doing there.', why: 'here → there' },
      { q: 'He asks me, “When will she arrive?”', a: 'He asks me when she will arrive.', why: '전달동사 현재 → 시제 그대로 (워크북)' },
      { q: 'She said to him, “How long have you been ill?”', a: 'She asked him how long he had been ill.', why: '현재완료 → 과거완료 (워크북)' },
      { q: 'Jenny said to him, “Did you get the T-shirt?”', a: 'Jenny asked him if[whether] he had got(gotten) the T-shirt.', why: '의문사 없음 → if / whether' },
      { q: 'He said to me, “Do you want to buy a phone made in Korea?”', a: 'He asked me if[whether] I wanted to buy a phone made in Korea.', why: '워크북' },
      { q: 'Sally said to me, “Are you done with your math homework?”', a: 'Sally asked me if[whether] I was done with my math homework.', why: '워크북' },
      { q: 'She said, “Who broke the window?”', a: 'She asked who had broken the window.', why: '의문사가 주어 → 의문사 + 동사' },
      { q: 'I said to the cook, “How did you make the potato pizza?”', a: 'I asked the cook how he[she] had made the potato pizza.', why: '워크북 — did 빼고 과거완료' }] },
  ], m),

  // ---------------- Point 4 ----------------
  D.section('Point 4', '명령문의 화법 전환 — tell · ask · advise · order + 목적어 + to-v', 'point'),
  ...D.table(['직접화법', '간접화법 · 설명', '예'], [
    ['명령 · 지시', 'tell + 목적어 + to-v', 'Mom said to me, “Clean your room.” → Mom **told me to clean** my room.'],
    ['부탁 (Please ~)', 'ask + 목적어 + to-v', 'She said to me, “Please help me.” → She **asked me to help** her.'],
    ['충고', 'advise + 목적어 + to-v', 'The doctor said to me, “Take the medicine three times a day.” → The doctor **advised me to take** the medicine three times a day. (워크북)'],
    ['강한 명령', 'order + 목적어 + to-v', 'The librarian said to me, “Don’t speak loudly.” → The librarian **ordered me not to speak** loudly. (워크북)'],
    ['부정 명령 (Don’t ~)', 'tell · ask + 목적어 + not to-v', 'The father said to his child, “Don’t go near the fire.” → The father told his child **not to go** near the fire. (워크북)']], [2100, 3300, 4238], m),
  ...D.infoBox('명령문 vs 평서문 — 기출 서술형 비교', [
    '명령문: She said to her students, “Check the information.” → She told her students {{to check}} the information.',
    '평서문(have to): She said to her students, “You have to check the information.” → She told her students that they {{had to}} check the information. (기출 #51)',
    '본문: The lesson, Garcia-Fuller tells her students, is to “check the information you’re seeing once more carefully” and to “question everything, even things that I say.”'], m),
  ...D.trick('명령은 투! 금지는 낫투!', ['“명령문 전환은 텔 · 애스크 · 어드바이스 · 오더 + 사람 + 투!”', '“하지 마(Don’t)는 낫 투 — not은 to 앞에!”']),
  ...D.examPoint([
    { q: 'My teacher said to me, “Don’t be nervous.” → My teacher told me {{not to be}} nervous.', why: '부정 명령문 → not to-v (워크북)' },
    { q: 'Minho’s father said to him, “Stop laughing.” → Minho’s father {{told}} him to stop laughing. (said to ✗)', why: '명령문 → tell + 목적어 + to-v (워크북)' }], m),
  ...D.caution(['Don’t를 그대로 둔 선지(told me don’t eat ✗), not 위치를 바꾼 선지(told me to not eating ✗), to를 뺀 선지(told me clean ✗)가 기본 오답이다.',
    'said to him to stop ✗ / told to me ✗ — 전달동사 형태 오답 (워크북 Part 6)',
    'your → my 인칭 변환 누락(told me to clean your room ✗), here → there 누락이 명령문에서도 함께 출제된다.'], m),
  ...D.drill(4, '명령문의 화법 전환', [
    { level: 'Basic ①', type: 'choice', instr: '괄호 안에서 알맞은 것을 고르시오.', items: [
      { q: 'Mom said to me, “Wash your hands.” → Mom told me (wash / to wash) my hands.', a: 'to wash', why: 'tell + 목적어 + to-v' },
      { q: 'The father said to his child, “Don’t go near the fire.” → The father told his child (don’t go / not to go) near the fire.', a: 'not to go', why: '부정 명령 → not to-v (워크북)' },
      { q: 'She said to me, “Please help me.” → She (asked / said) me to help her.', a: 'asked', why: '부탁 → ask + 목적어 + to-v' },
      { q: 'The doctor said to me, “Get some rest.” → The doctor (advised / said) me to get some rest.', a: 'advised', why: '충고 → advise + 목적어 + to-v' },
      { q: 'Mr. Park said to me, “Don’t be late again.” → Mr. Park told me (not be / not to be) late again.', a: 'not to be', why: 'not to-v (워크북)' },
      { q: 'I said to my dog, “Get out of the room!” → I ordered my dog (to get / get) out of the room.', a: 'to get', why: 'order + 목적어 + to-v (워크북)' },
      { q: 'Minho’s father (told / said to) him to stop laughing.', a: 'told', why: 'tell + 목적어 + to-v (워크북)' },
      { q: 'Mr. Wilson said to me, “Come and have tea at my home.” → Mr. Wilson asked me to come and have tea at (my / his) home.', a: 'his', why: 'my = 말한 사람(Mr. Wilson) → his (워크북)' },
      { q: 'Mom said to me, “Don’t eat junk food.” → Mom told me (to don’t eat / not to eat) junk food.', a: 'not to eat', why: 'not to-v (워크북)' },
      { q: 'The coach said to us, “Run faster.” → The coach told (us / to us) to run faster.', a: 'us', why: 'tell + 목적어 (to ✗)' }] },
    { level: 'Basic ②', type: 'fill', instr: '<보기>에서 알맞은 말을 골라 빈칸에 쓰시오. (한 번씩만 사용)',
      bogi: ['to', 'not', 'told', 'asked', 'advised', 'ordered', 'me', 'his', 'be', 'wait'], items: [
      { q: 'Garcia-Fuller [[told]] her students to question everything, even things that she said.', why: '본문 변형 — tell + 목적어 + to-v' },
      { q: 'I said to the old man, “Wait here for a minute.” → I asked the old man to [[wait]] there for a minute.', why: '워크북 — to + 동사원형' },
      { q: 'Mom said to me, “Brush your teeth.” → Mom told me [[to]] brush my teeth.', why: 'tell + 목적어 + to-v' },
      { q: 'The doctor said to him, “Exercise every day.” → The doctor [[advised]] him to exercise every day.', why: '충고 → advise' },
      { q: 'Father said to Tom, “Try your best.” → Father told Tom to try [[his]] best.', why: 'your = Tom의 → his' },
      { q: 'The coast guard said to me, “Don’t swim too far.” → The coast guard told me [[not]] to swim too far.', why: '워크북 — not to-v' },
      { q: 'Jisu said to me, “Please lend me your pen.” → Jisu [[asked]] me to lend her my pen.', why: '부탁 → ask' },
      { q: 'My teacher said to me, “Don’t be nervous.” → My teacher told me not to [[be]] nervous.', why: '워크북 — not to be' },
      { q: 'The general said to the soldiers, “Attack!” → The general [[ordered]] the soldiers to attack.', why: '강한 명령 → order' },
      { q: 'The nurse said to me, “Stay in bed.” → The nurse told [[me]] to stay in bed.', why: 'tell + 듣는 사람' }] },
    { level: 'Intermediate', type: 'write', instr: '어법상 틀린 부분을 찾아 바르게 고쳐 쓰시오.', items: [
      { q: 'Minho’s father said to him to stop laughing.', a: 'said to → told', why: '워크북 — tell + 목적어 + to-v' },
      { q: 'My mom told me don’t eat junk food.', a: 'don’t eat → not to eat', why: '부정 명령 → not to-v' },
      { q: 'The doctor advised me take the medicine three times a day.', a: 'take → to take', why: 'advise + 목적어 + to-v' },
      { q: 'She told to me to wait for her.', a: 'told to me → told me', why: 'tell + 목적어 (to ✗)' },
      { q: 'The teacher told us not run in the hall.', a: 'not run → not to run', why: 'not to-v' },
      { q: 'Mom said to me, “Clean your room.” → Mom told me to clean your room.', a: 'your → my', why: '인칭 변환' },
      { q: 'He asked me helping him with his homework.', a: 'helping → to help', why: 'ask + 목적어 + to-v' },
      { q: 'The librarian ordered me to not speaking loudly.', a: 'to not speaking → not to speak', why: '워크북 — not to + 동사원형' },
      { q: 'Garcia-Fuller told her students check the information once more carefully.', a: 'check → to check', why: '본문 변형 — tell + 목적어 + to-v' },
      { q: 'I said to the old man, “Wait here.” → I asked the old man to wait here.', a: 'here → there', why: '부사 변환' }] },
    { level: 'Advanced · 모두 고르기', type: 'multi', free: true, instr: '해당하는 것을 모두 골라 기호를 쓰시오.', items: [
      { q: '다음 중 간접화법 전환이 올바른 것을 모두 고르시오.', box: [
        '(a) The father said to his child, “Don’t go near the fire.” → The father told his child not to go near the fire.',
        '(b) She said to me, “Please open the window.” → She asked me to open the window.',
        '(c) Mom said to me, “Clean your room.” → Mom told me clean my room.',
        '(d) Mr. Park said to me, “Don’t be late again.” → Mr. Park told me don’t be late again.',
        '(e) The doctor said to him, “Get some sleep.” → The doctor advised him to get some sleep.'], a: '(a), (b), (e)', why: '(c) to clean (d) not to be' },
      { q: '다음 중 밑줄 친 부분에 대한 설명으로 옳은 것을 모두 고르시오.', box: [
        '(a) Mom told me __to clean__ my room. → 목적격보어로 쓰인 to부정사이다.',
        '(b) My teacher told me __not to be__ nervous. → 부정 명령문은 not을 to 뒤에 쓴다.',
        '(c) She __asked__ me to help her. → 부탁을 전할 때 쓰는 전달동사이다.',
        '(d) The lesson is __to check__ the information once more carefully. → 명령문을 전환한 목적격보어이다.',
        '(e) She told her students that they __had to__ check the information. → 직접화법의 have to를 시제 일치시킨 것이다.'], a: '(a), (c), (e)', why: '(b) not은 to 앞 (d) is의 주격보어 (본문)' },
      { q: '다음 글의 밑줄 친 ⓐ~ⓔ 중 어법상 어색한 것을 모두 골라 기호를 쓰고 바르게 고치시오.', fix: true, label: '기호 / 고친 것', box: [
        'Garcia-Fuller tests her students with a website about a tree octopus. After the test, she ⓐ __told__ her students ⓑ __check__ the information once more carefully. She also asked them ⓒ __not to believe__ everything on the Internet. One student said to her, “Can I use this site for my report?” She told him ⓓ __not use__ it and ⓔ __to find__ better sources.'],
        a: 'ⓑ check → to check, ⓓ not use → not to use', why: 'tell + 목적어 + to-v / 부정 → not to-v (본문 소재 변형)' },
      { q: '빈칸에 not to가 들어갈 수 있는 것을 모두 고르시오.', box: [
        '(a) She told me that she was ______ tired.', '(b) The coach told us ______ give up.', '(c) He told me ______ that he was sorry.',
        '(d) Mom asked me ______ eat too much candy.', '(e) The librarian ordered us ______ talk loudly.'], a: '(b), (d), (e)', why: '(a) was not tired (not만) (c) 평서문 전환 → that절' },
      { q: '직접화법이 명령문이었던 간접화법 문장을 모두 고르시오.', box: [
        '(a) The doctor advised me to take the medicine.', '(b) She told her students that they had to check the information.',
        '(c) Mom told me not to eat junk food.', '(d) She asked me to lend her my pen.', '(e) He told me that he would help me.'], a: '(a), (c), (d)', why: '(b) “You have to …” 평서문 (기출 #51) (e) “I will help you.” 평서문' }] },
    { level: 'Advanced · 객관식', type: 'mcq', free: true, instr: '알맞은 답을 고르시오.', items: [
      { q: '다음 문장을 간접화법으로 바르게 바꾼 것은? — The coast guard said to me, “Don’t swim too far off the beach.”', opts: [
        'The coast guard told me don’t swim too far off the beach.', 'The coast guard said me not to swim too far off the beach.', 'The coast guard told me to not swimming too far off the beach.',
        'The coast guard told to me not to swim too far off the beach.', 'The coast guard told me not to swim too far off the beach.'], a: '⑤', why: 'told + 목적어 + not to-v (워크북)' },
      { q: '빈칸 (A), (B)에 들어갈 말이 바르게 짝지어진 것은?', box: [
        '• The doctor (A) ______ me to take the medicine three times a day.', '• My teacher told me (B) ______ nervous.'],
        opts: ['said – not be', 'advised – to not', 'advised – not to be', 'said to – not to be', 'told – don’t be'], a: '③', why: '(A) advise + 목적어 + to-v (B) not to be' },
      { q: '다음 문장을 간접화법으로 바르게 바꾼 것은? — She said to her students, “You have to check the information and question everything, even things that I say.”', opts: [
        'She told her students that they had to check the information and question everything, even things that she said.',
        'She told her students that you had to check the information and question everything, even things that I said.',
        'She told her students that they have to check the information and question everything, even things that I say.',
        'She said her students that they had to check the information and question everything, even things that she said.',
        'She asked her students if they had to check the information and question everything, even things that she said.'], a: '①', why: '평서문 → told + 사람 + that / you → they / I → she / have to → had to (기출 #51)' },
      { q: '다음 중 어법상 틀린 문장은?', opts: [
        'The father told his child not to go near the fire.', 'She asked me to wait for her.', 'The doctor advised me to get some rest.',
        'My mom told me don’t check my text messages.', 'The librarian ordered me not to speak loudly.'], a: '④', why: '④ don’t check → not to check' },
      { q: '우리말과 같도록 <보기>를 배열할 때 4번째로 오는 것은? — 그 사서는 나에게 큰 소리로 이야기하지 말라고 지시했다.', box: [
        '<보기>  loudly / not / to / me / ordered / speak / the librarian'],
        opts: ['me', 'not', 'to', 'speak', 'ordered'], a: '②', why: 'The librarian / ordered / me / not / to / speak / loudly (워크북 Part 7)' }] },
    { level: '전환 · 연결', type: 'write', instr: '직접화법은 간접화법으로, 간접화법은 직접화법으로 바꾸어 쓰시오.', items: [
      { q: 'The father said to his child, “Don’t go near the fire.”', a: 'The father told his child not to go near the fire.', why: '워크북' },
      { q: 'I said to my dog, “Get out of the room!”', a: 'I ordered[told] my dog to get out of the room.', why: '워크북' },
      { q: 'Mr. Wilson said to me, “Come and have tea at my home at 4 o’clock.”', a: 'Mr. Wilson asked[told] me to come and have tea at his home at 4 o’clock.', why: '워크북 — my → his' },
      { q: 'My mother said to me, “Don’t eat any junk food on your way home.”', a: 'My mother told me not to eat any junk food on my way home.', why: '워크북 — your → my' },
      { q: 'The mechanic said to the customer, “Change the engine oil next month.”', a: 'The mechanic advised[told] the customer to change the engine oil the next[following] month.', why: '워크북 — next month → the following month' },
      { q: 'Father said to me, “Try your best all the time.”', a: 'Father told me to try my best all the time.', why: '워크북' },
      { q: 'I said to my mother, “Don’t check my text messages!”', a: 'I asked[told] my mother not to check my text messages.', why: '워크북 — my는 말한 사람(나) → my 그대로' },
      { q: 'Mr. Park said to me, “Don’t be late again.”', a: 'Mr. Park told me not to be late again.', why: '워크북' },
      { q: 'The doctor said to me, “Take the medicine three times a day.”', a: 'The doctor advised[told] me to take the medicine three times a day.', why: '워크북' },
      { q: 'My teacher told me not to be nervous. (직접화법으로)', a: 'My teacher said to me, “Don’t be nervous.”', why: '역전환 — not to-v → Don’t' }] },
  ], m),

  // ---------------- PERFECT CHECK ----------------
  D.section('PERFECT CHECK', '상위권 함정 체크'),
  ...D.drill(null, '', [
    { level: '함정', type: 'choice', instr: '실수하기 쉬운 문장들이에요. 괄호 안에서 알맞은 것을 고르시오.', items: [
      { q: 'She said to her brother, “I am not crying.” → She (said / told) her brother that she was not crying.', a: 'told', why: '교과서 — 듣는 사람 → told' },
      { q: 'Mike asked me where (I was / was I) living then.', a: 'I was', why: '기출 — 의문사 + 주어 + 동사' },
      { q: 'You also have to check (that / if) they are based on facts.', a: 'if', why: '본문 — ‘~인지’ (같은 과 if)' },
      { q: 'Jack told me that he (will / would) come again.', a: 'would', why: '시제 일치 (워크북)' },
      { q: 'My teacher said that light (travels / traveled) faster than sound.', a: 'travels', why: '과학적 사실 → 현재' },
      { q: 'The father told his child (not to go / to not going) near the fire.', a: 'not to go', why: '부정 명령 → not to-v' },
      { q: 'He said that he had met her two days (ago / before).', a: 'before', why: 'ago → before' },
      { q: '(Whether / If) you like it or not makes no difference.', a: 'Whether', why: '주어 자리 → Whether (같은 과 if · 기출 #25)' },
      { q: 'She asked me (whether / that) I had eaten breakfast.', a: 'whether', why: '의문사 없는 의문문 → whether' },
      { q: 'Amy said to me, “I saw your sister today.” → Amy told me that she had seen my sister (today / that day).', a: 'that day', why: 'today → that day (기출)' }] },
    { level: 'O / X 함정', type: 'choice', free: true, instr: '간접화법 문장이 어법상 옳으면 O, 틀리면 X를 쓰시오. (함정 주의!)', items: [
      { q: 'She told that she was sorry.  ( O / X )', a: 'X', why: 'tell 뒤 듣는 사람 필수 → said / told me (기출 #23)' },
      { q: 'Garcia-Fuller also said sometimes it can be very hard to be a smart news reader.  ( O / X )', a: 'O', why: '본문 — 지금도 사실인 일반적 내용 → can 그대로 가능 (could도 가능)' },
      { q: 'He told me that he gets up at 5 every morning.  ( O / X )', a: 'O', why: '현재의 습관 → 현재 가능 (워크북)' },
      { q: 'He asked me what my name is.  ( O / X )', a: 'X', why: '시제 일치 → what my name was (기출 #23)' },
      { q: 'Mike asked her what was she doing there.  ( O / X )', a: 'X', why: '의문사 + 주어 + 동사 → what she was doing' },
      { q: 'The coach told us don’t give up.  ( O / X )', a: 'X', why: '부정 명령 → not to give up' },
      { q: 'He said that that dish tasted good.  ( O / X )', a: 'O', why: '접속사 that + 지시형용사 that(this → that) — that that ○ (기출 #23)' },
      { q: 'She asked me if or not I was ready.  ( O / X )', a: 'X', why: 'if or not ✗ → whether or not' }] },
    { level: '★고난도 · 모두 고르기', type: 'multi', free: true, instr: '해당하는 것을 모두 골라 기호를 쓰시오.', items: [
      { q: '★고난도  다음 중 간접화법 전환이 올바른 것을 모두 고르시오.', box: [
        '(a) Tom said, “I am sick.” → Tom said that he was sick.',
        '(b) He said to me, “I will help you tomorrow.” → He told me that he would help me the next day.',
        '(c) Amy said to her brother, “Today you are late again.” → Amy told her brother that that day he is late again.',
        '(d) Dad said to me, “Time is money.” → Dad told me that time is money.',
        '(e) I said to my dad, “Don’t worry about me.” → I told my dad not to worry about him.',
        '(f) She said to him, “Where did you buy it?” → She asked him where did he buy it.'], a: '(a), (b), (d)', why: '(c) is → was (기출 #16) (d) 속담 → 현재 ○ (e) me(말한 사람 = 나) → me 그대로 (f) where he had bought it' }] }], m),

  // ---------------- WRITE ----------------
  D.section('WRITE', '서술형 대비'),
  ...D.writeItem(1, 'Basic', '괄호 안의 동사를 알맞은 형태로 바꾸어 쓰시오.', ['Garcia-Fuller said she (be) teaching her students how to tell fake news from real news. (본문)'], { a: 'was', why: 'said(과거) → 시제 일치 / 주어 she' }, m),
  ...D.writeItem(2, 'Basic', '빈칸에 알맞은 말을 쓰시오. (2단어)', ['Mike said to me, “Where are you living now?” → Mike asked me where ______________ living then.'], { a: 'I was', why: '의문사 + 주어 + 동사 / you → I / are → was (기출 #24)' }, m),
  ...D.writeItem(3, 'Intermediate', '다음 문장을 간접화법으로 바꾸어 쓰시오. [문장 전환]', ['Kate said to Tom, “I will meet your sister tomorrow.”'],
    { a: 'Kate told Tom that she would meet his sister the next day.', why: 'told / your → his / will → would / tomorrow → the next day (기출 #26)' }, m),
  ...D.writeItem(4, 'Intermediate', '다음 문장을 간접화법으로 바꾸어 쓰시오. [문장 전환]', ['The foreigner said to me, “Can you speak English?”'],
    { a: 'The foreigner asked me if[whether] I could speak English.', why: '의문사 없는 의문문 → asked + if / whether + 주어 + 동사 (기출 #10)' }, m),
  ...D.writeItem(5, 'Intermediate', '다음 문장을 간접화법으로 바꾸어 쓰시오. [문장 전환]', ['My mother said to me, “Don’t play computer games too late.”'],
    { a: 'My mother told me not to play computer games too late.', why: '부정 명령문 → told + 목적어 + not to-v' }, m),
  ...D.writeItem(6, 'Intermediate', '다음 문장을 직접화법으로 바꾸어 쓰시오. [문장 전환]', ['Garcia-Fuller said she was teaching her students how to tell fake news from real news. (본문)'],
    { a: 'Garcia-Fuller said, “I am teaching my students how to tell fake news from real news.”', why: 'she → I / was → am / her → my (본문 해설)' }, m),
  ...D.writeItem(7, 'Advanced', '우리말과 같은 뜻이 되도록 <조건>에 맞게 영작하시오.', ['그녀는 학생들에게 정보를 한 번 더 주의 깊게 확인하라고 말했다.', '<조건> tell을 알맞은 형태로 쓸 것 · to부정사를 사용할 것 · information, once more, carefully를 사용할 것 · 총 11단어'],
    { a: 'She told her students to check the information once more carefully.', why: 'told + 목적어 + to-v · 11단어 (She/told/her/students/to/check/the/information/once/more/carefully) (본문 변형)' }, m),
  ...D.writeItem(8, 'Advanced', '<보기>의 단어를 배열하여 문장을 완성하시오. (필요하면 형태를 바꿀 것)', ['성규는 나에게 그 전날 그 모자를 샀다고 말했다.', '<보기> Sungkyu / me / that / tell / he / buy / that cap / the day / before'],
    { a: 'Sungkyu told me that he had bought that cap the day before.', why: 'tell → told / buy → had bought (말한 시점보다 먼저) / yesterday → the day before (워크북 Part 7)' }, m),
  ...D.writeItem(9, 'Advanced', '어법상 틀린 부분 2개를 찾아 바르게 고치고, 그 이유를 쓰시오.', ['Mary said that she is living in Seoul now.'],
    { a: '① is → was  ② now → then', why: '① 전달동사 said가 과거이므로 시제 일치 ② 간접화법에서 now는 then으로 바꾼다 (기출 #16)', blanks: ['고친 것', '이유'] }, m),
  ...D.writeItem(10, 'Advanced', '어법상 틀린 부분 2개를 찾아 바르게 고치고, 그 이유를 쓰시오.', ['The teacher asked us what time is it, and she told us don’t be late.'],
    { a: '① what time is it → what time it was  ② don’t be → not to be', why: '① 의문사 + 주어 + 동사 어순 · 시제 일치 ② 부정 명령문은 tell + 목적어 + not to-v', blanks: ['고친 것', '이유'] }, m),

  // ---------------- MAP ----------------
  D.section('MAP', "DAVID'S MAP — 백지노트 테스트"),
  D.P([D.T('오늘 배운 내용을 떠올리며 빈칸을 채워 보세요. 책을 보지 않고!', { size: 18, color: '595959' })], { spacing: { after: 120 }, keepNext: true }),
  ...D.image(path.join(__dirname, 'map_G-간접화법.png'), 620),
  ...D.table(['자가 체크 — 백지노트에 이 단어들이 들어갔나요?', '✔'], [
    ['직접화법(“ ” 그대로) vs 간접화법(전하는 사람 입장)', ''], ['평서문: said (that) / say to + 사람 → told + 사람 (told that ✗ · said me ✗)', ''],
    ['인칭: I · my → 말한 사람 / you · your → 들은 사람', ''], ['시제 일치: 현재 → 과거 · 과거 · 현재완료 → had p.p. · will → would · can → could', ''],
    ['부사: now → then · here → there · today → that day · tomorrow → the next day · ago → before', ''],
    ['예외: 전달동사 현재 · 진리 · 현재 습관 → 현재 그대로', ''], ['의문사 있는 의문문: asked + 의문사 + 주어 + 동사 (what was she ✗)', ''],
    ['의문사 없는 의문문: asked + if / whether (that ✗ · if or not ✗)', ''], ['명령문: tell · ask · advise · order + 목적어 + to-v / 부정 not to-v', ''],
    ['본문: Garcia-Fuller said she was teaching her students how to tell fake news from real news.', '']], [8838, 800], m),
  ...D.memo(['다음 시간 도입: 말풍선 카드 10장 — 직접화법을 보고 10초 안에 간접화법으로 말하기 (평서 4 · 의문 4 · 명령 2)',
    '약한 반: Point 1 · 2(said/told, 인칭, 시제 한 칸) 확실히 → Point 3은 ‘의·주·동’ 어순, Point 4는 ‘낫 투’만 집중',
    '같은 과 if(~인지)와 묶어 asked if / whether ↔ 조건의 if 구별 5문항 보강 (기출 #17 · #21 유형)',
    '서술형 대비: 기출 #26(9단어 조건) · #51(본문 변형 간접화법) 유형을 통째로 한 번 더 써 보게 한다'], m),
];
D.render(meta, build, process.argv[2] || '.').then(f => console.log(f.join('\n')));
