const D0 = require('./david_base');
const path = require('path');
const fs = require('fs');
// 한 문장에 빈칸 ______ 이 두 개 이상이면 david_base의 __밑줄__ 서식으로 잘못 읽히므로
// 밑줄 3개 이상 이어진 빈칸은 밑줄 사이에 U+200B를 넣어 둔다 (the비교급 · with분사 스크립트와 같은 처리).
const ZB = (s) => s.replace(/_{3,}/g, (u) => u.split('').join('​'));
const deep = (v) => typeof v === 'string' ? ZB(v) : Array.isArray(v) ? v.map(deep)
  : (v && typeof v === 'object' && v.constructor === Object) ? Object.fromEntries(Object.entries(v).map(([k, x]) => [k, deep(x)])) : v;
const D = new Proxy(D0, { get: (t, k) => (typeof t[k] === 'function' && !['render', 'P', 'T', 'image'].includes(k)) ? (...a) => t[k](...deep(a)) : t[k] });
const COVER = JSON.parse(process.env.COVER || '{}');
const TITLE = 'be worth -ing';
const meta = { series: D.SERIES.G, code: 'G-beworth', title: TITLE, category: 'G. 동명사  |  be worth + -ing (~할 가치가 있다)',
  rightText: 'G  be worth -ing', prefix: process.env.PREFIX || '', cover: COVER.title ? COVER : undefined,
  question: 'But it is still ~~worth paying~~ attention ~~to~~. — 팝 아트는 ‘주목받는’ 대상인데 왜 being paid가 아니라 paying일까? 그리고 문장은 왜 to로 끝날까?' };

const build = (m) => [
  D.section('FLOW', 'Teaching Flow — 처음 배우는 사람도 따라오는 5단계'),
  ...D.step(1, '우리말로 먼저 생각하기 — ‘~할 가치가 있다’', [
    '‘그 영화는 정말 볼 만했다.’ — 어떤 것의 {{가치}}를 말할 때 쓰는 표현이다.',
    '우리말은 ‘~할 만하다’ 한 마디면 되지만, 영어는 be + {{worth}} + 동사-ing 한 덩어리로 말한다.'], m),
  ...D.step(2, '이전 학년 복습 — 동명사', [
    '동사에 -ing를 붙이면 명사처럼 쓰인다: **Drawing** is fun. / I enjoy **drawing**. / I’m good at {{drawing}}.',
    '전치사 뒤에는 to부정사가 아니라 {{동명사}}: How about **creating** a work of pop art? / **By using** daily images … (본문)'], m),
  ...D.step(3, '문제 제기 — 본문 문장은 왜 to로 끝날까?', [
    'Using common images, pop art looks plain. But it is still worth paying attention to. (본문)',
    'it(= pop art)은 ‘주목받는’ 대상인데 왜 being paid가 아니라 paying일까? 그리고 to 뒤의 목적어는 어디로 갔을까?'], m),
  ...D.step(4, '규칙 발견 — 주어가 동명사의 목적어 자리에서 나왔다', [
    'We pay attention to {{pop art}}. → Pop art is worth paying attention to ____. (빈자리 = 주어)',
    'worth 뒤에는 명사 · 동명사만 온다(to부정사 ✗). 주어가 목적어 몫을 하므로 목적어는 다시 쓰지 않고, 전치사 {{to}}만 남는다.'], m),
  ...D.step(5, '결론 🔑', [
    '주어 + be + worth + -ing = ~할 가치가 있다 / -ing는 늘 {{능동형}}(being p.p. ✗) / 목적어 다시 쓰기 ✗ · 전치사는 남긴다 / = It is worth -ing + 목적어 = It is {{worthwhile}} to-v[-ing] + 목적어'], m),
  ...D.infoBox('오늘의 핵심 3문장', [
    '① But it is still worth {{paying}} attention to. (본문)',
    '② Books about world history are worth {{reading}}. (교과서 Grammar)',
    '③ The movie was really worth {{watching}}. (교과서 Think and Write · 기출 69)'], m),
  ...D.tip(['칠판에 We pay attention to pop art.를 쓰고 pop art에 동그라미를 친 뒤, 동그라미를 문장 맨 앞 주어 자리로 옮기는 화살표를 그린다. 빈자리에 ‘(목적어 자리 비움)’이라고 써 두면 to만 남는 이유와 reading it ✗를 한 번에 설명할 수 있다.',
    '같은 과 문법 분사구문과 한 지문에서 함께 나오므로(본문 첫 단락 · 기출 47 · 65 · 68) PERFECT CHECK에 분사구문 2문항을 넣었다. 동명사 관용 표현은 Point 3에서 비교한다.'], m),

  // ---------------- Point 1 ----------------
  D.section('Point 1', '기본 형태 · 뜻 — be worth + -ing / be worth + 명사', 'point'),
  ...D.table(['구성', '판단 기준 · 설명', '예'], [
    ['be worth + -ing', '‘~할 가치가 있다’ — worth 뒤에는 동명사', 'Books about world history are **worth reading**. (교과서) / The game was **worth watching**. (기출 15 ⓒ)'],
    ['be worth + 명사', '‘~의 가치가 있다’ — 값 · 가치를 나타내는 명사', 'This painting **is worth $100**. / The museum **is worth a visit**. (한번 가 볼 만하다)'],
    ['worth 뒤 형태 ✗', 'to부정사 · 동사원형 · 과거분사는 올 수 없다', 'worth **to buy** ✗ (기출 15 ⓓ) / worth **live** ✗ (기출 20 ⓐ) / worth **watched** ✗'],
    ['be동사 필수 · 수 일치', 'worth는 동사가 아니다 → 시제 · 수는 be동사로', 'It **worth** to buy the watch ✗ (기출 15 ⓑ) / These jeans **were** worth buying (was ✗) / The project **was** worth working on. (교과서)'],
    ['make + 목적어 + worth -ing', '목적격 보어 자리에도 worth -ing가 온다', 'What makes life **worth living**? (기출 20 ⓐ)'],
    ['worth vs worthy', 'worthy는 of + 명사, worth는 of 없이 바로', 'His bravery is **worthy of praise**. (기출 20 ⓑ) / worth **of** reading ✗']], [2300, 3300, 4038], m),
  ...D.infoBox('3단계로 만들기', [
    '① 무엇이 가치 있는지 주어로 쓰기: {{The movie}} …',
    '② 시제 · 수에 맞는 be동사 + worth: The movie {{was worth}} …',
    '③ worth 뒤에는 동사-ing: The movie was worth {{watching}}. (to watch ✗ · watch ✗ · watched ✗)'], m),
  ...D.trick('worth는 가격표', ['가격표에는 이름(명사)만 적힌다: worth $10', '동사는 -ing 이름표를 달아야 올라간다', 'to를 달고 오면 가격표에 못 붙는다']),
  ...D.examPoint([
    { q: 'The art gallery is worth {{watching}}.', why: 'worth + 동명사 — to watch · watch · watched ✗ (기출 7)' },
    { q: 'These expensive jeans {{were}} worth buying.', why: 'worth는 동사가 아님 → be동사로 수 일치 (기출 15 ⓓ 변형)' }], m),
  ...D.caution(['worth 뒤 형태를 고르는 빈칸 객관식(기출 7 · 8)이 기본이다. to부정사 · 동사원형 · 과거분사 · 3인칭 단수형이 오답 선지로 나온다.',
    '‘옳은 것 모두 짝짓기’(기출 15)에서 It worth to buy ✗(be 빠뜨림 + to부정사), These jeans was worth to buy ✗(수 일치 + to부정사), worth spent ✗가 함께 나온다.',
    'What makes life worth live?(기출 20 ⓐ)처럼 5형식 목적격 보어 자리에 들어간 worth를 놓치지 않게 한다.',
    'worthy of + 명사(기출 20 ⓑ)를 worth of로 바꾼 선지가 나올 수 있다. 교과서 Grammar✚의 worthy of -ing · worthy to be p.p. · 주어 + is worthwhile to-v 형태는 쓰임에 논란이 있어 이 자료에서는 문항으로 내지 않았다.'], m),
  ...D.drill(1, 'be worth + -ing · be worth + 명사', [
    { level: 'Basic ①', type: 'choice', instr: '괄호 안에서 알맞은 것을 고르시오.', items: [
      { q: 'Books about world history are worth (reading / to read).', a: 'reading', why: 'worth + 동명사 (교과서)' },
      { q: 'The art gallery is worth (to watch / watching).', a: 'watching', why: 'to부정사 ✗ (기출 7)' },
      { q: 'The game was worth (watched / watching).', a: 'watching', why: '과거분사 ✗ (기출 15 ⓒ)' },
      { q: 'The project (was worth / worth) working on.', a: 'was worth', why: 'worth는 동사가 아님 → be동사 필수 (교과서)' },
      { q: 'This old painting is worth (a lot of money / to pay a lot).', a: 'a lot of money', why: 'worth + 명사 = ~의 값어치가 있다' },
      { q: 'Jeju Island is worth (visit / visiting) in summer.', a: 'visiting', why: '동사원형 ✗ (교과서 Say It)' },
      { q: 'These jeans (was / were) worth buying.', a: 'were', why: '복수 주어 jeans → were (기출 15 ⓓ 변형)' },
      { q: 'The Yellow House is worth (looking / to look) at.', a: 'looking', why: 'worth + 동명사' },
      { q: 'What makes life worth (live / living)?', a: 'living', why: 'make + 목적어 + worth -ing (기출 20 ⓐ)' },
      { q: 'His bravery is (worth / worthy) of praise.', a: 'worthy', why: 'worthy of + 명사 (기출 20 ⓑ)' }] },
    { level: 'Basic ②', type: 'fill', instr: '<보기>에서 알맞은 말을 골라 빈칸에 쓰시오. (한 번씩만 사용)',
      bogi: ['watching', 'worthy', 'going', 'a visit', 'reading', 'was', 'buying', '$50', 'worth', 'living'], items: [
      { q: 'Books about world history are worth [[reading]].', why: '교과서 Grammar' },
      { q: 'The movie was really worth [[watching]].', why: '교과서 Think and Write · 기출 69' },
      { q: 'The East Sea is worth [[going]] to. It has beautiful scenery.', why: '교과서 Say It — go to의 to가 남음' },
      { q: 'The project [[was]] worth working on because I could experience many things.', why: '교과서 — be동사 필수' },
      { q: 'The new science museum is worth [[a visit]].', why: 'worth + 명사' },
      { q: 'This T-shirt is worth [[$50]].', why: 'worth + 값' },
      { q: 'His bravery is [[worthy]] of praise.', why: '기출 20 ⓑ — worthy of + 명사' },
      { q: 'What makes life worth [[living]]?', why: '기출 20 ⓐ' },
      { q: 'Could you tell me which bag is worth [[buying]]?', why: '기출 20 ⓓ 변형' },
      { q: 'But pop art is still [[worth]] paying attention to.', why: '본문' }] },
    { level: 'Intermediate', type: 'write', instr: '어법상 틀린 부분을 찾아 바르게 고쳐 쓰시오.', items: [
      { q: 'The art gallery is worth to watch.', a: 'to watch → watching', why: '기출 7 — worth + 동명사' },
      { q: 'It worth to buy the watch.', a: 'worth to buy → is worth buying', why: '기출 15 ⓑ — be동사 필수 · to부정사 ✗' },
      { q: 'These expensive jeans was worth to buy.', a: 'was worth to buy → were worth buying', why: '기출 15 ⓓ — 수 일치 · to부정사 ✗' },
      { q: 'This museum is worth visit.', a: 'visit → visiting', why: '동사원형 ✗' },
      { q: 'What makes life worth live?', a: 'live → living', why: '기출 20 ⓐ' },
      { q: 'Books about history are worth read.', a: 'read → reading', why: '기출 8 변형' },
      { q: 'The play is worth of seeing.', a: 'worth of seeing → worth seeing', why: 'worth 뒤에 of ✗' },
      { q: 'Her new song worth listening to.', a: 'worth → is worth', why: 'worth는 동사가 아님 → be동사 필수' },
      { q: 'Pop art is worth to pay attention to.', a: 'to pay → paying', why: '본문 · 기출 48 — to부정사 ✗' },
      { q: 'The game was worth watched.', a: 'watched → watching', why: '과거분사 ✗' }] },
    { level: 'Advanced · 모두 고르기', type: 'multi', free: true, instr: '해당하는 것을 모두 골라 기호를 쓰시오.', items: [
      { q: '다음 중 어법상 옳은 문장을 모두 고르시오.', box: [
        '(a) She is worth taking risks for.', '(b) It worth to buy the watch.', '(c) The game was worth watching.',
        '(d) These expensive jeans was worth to buy.', '(e) We believe our freedom is worth fighting for.'], a: '(a), (c), (e)', why: '(b) It is worth buying (d) were worth buying (기출 15)' },
      { q: '밑줄 친 부분에 대한 설명으로 옳은 것을 모두 고르시오.', box: [
        '(a) Pop art is worth __paying__ attention to. → worth 뒤의 paying은 동명사이다.',
        '(b) This painting is worth __$1,000__. → worth 뒤에 명사가 와서 ‘~의 값어치가 있다’는 뜻이다.',
        '(c) The movie __was__ worth watching. → worth가 동사이므로 was를 빼도 된다.',
        '(d) His bravery is __worthy of__ praise. → worthy of를 worth of로 바꿔도 된다.',
        '(e) The book is worth __reading__. → to read로 바꿔도 어법상 옳다.'], a: '(a), (b)', why: '(c) worth는 동사가 아님 (d) worth of ✗ (e) worth to-v ✗' },
      { q: '다음 글의 밑줄 친 ⓐ~ⓔ 중 어법상 어색한 것을 모두 골라 기호를 쓰고 바르게 고치시오.', fix: true, label: '기호 / 고친 것', box: [
        'A Movie That Moved Me — Last Saturday I went to my friend’s house ⓐ __to watch__ a movie. I liked the story, and the actor Roy Jones ⓑ __was worth to see__. ⓒ __Watching the emotional scenes__, I was moved. The music ⓓ __was worth listening to__, too. The movie ⓔ __really worth watching__.'],
        a: 'ⓑ → was worth seeing, ⓔ → was really worth watching', why: 'ⓑ worth to-v ✗ ⓔ be동사 필수 (교과서 Think and Write 변형)' },
      { q: '다음 우리말을 영작한 것 중 옳은 것을 모두 고르시오.', box: [
        '(a) 그 박물관은 한번 가 볼 만하다. → The museum is worth a visit.', '(b) 그 책은 읽을 가치가 있었다. → The book was worth to read.',
        '(c) 이 그림은 100만 달러의 가치가 있다. → This painting is worth one million dollars.', '(d) 무엇이 인생을 살 가치가 있게 만드는가? → What makes life worth living?',
        '(e) 그 영화는 볼 만했다. → The movie worth watching.'], a: '(a), (c), (d)', why: '(b) worth reading (e) was worth watching' }] },
    { level: 'Advanced · 객관식', type: 'mcq', free: true, instr: '알맞은 답을 고르시오.', items: [
      { q: '다음 빈칸에 들어갈 말로 알맞은 것은? — Books about history are worth ______.', opts: [
        'to read', 'read', 'have read', 'reading', 'reads'], a: '④', why: 'worth + 동명사 (기출 8)' },
      { q: '다음 우리말을 바르게 영작한 것은? — 그 영화는 볼 만한 가치가 있었다.', opts: [
        'The movie was worth watching.', 'The movie worth watching.', 'The movie was worth to watch.',
        'The movie was worth watch.', 'The movie was worth watched.'], a: '①', why: 'be동사 + worth + 동명사' },
      { q: '다음 중 어법상 어색한 문장은?', opts: [
        'The game was worth watching.', 'What makes life worth living?', 'This necklace is worth $500.',
        'The museum is worth a visit.', 'It worth to buy the watch.'], a: '⑤', why: '⑤ It is worth buying (기출 15 ⓑ)' },
      { q: '다음 중 어법상 알맞은 문장의 개수는?', box: [
        '(a) She is worth taking risks for.', '(b) I bet that this book is worth reading several times.', '(c) The art gallery is worth to watch.',
        '(d) These jeans was worth buying.', '(e) His bravery is worthy of praise.'], opts: ['1개', '2개', '3개', '4개', '5개'], a: '③', why: '(a) (b) (e) ○ — (c) watching (d) were (기출 15 · 20 변형)' },
      { q: '(A)~(C)에 알맞은 말이 바르게 짝지어진 것은? — The movie (A)(was / were) worth watching. / Jeju Island is worth (B)(to visit / visiting). / This bag is worth (C)(of $30 / $30).', opts: [
        'were – to visit – of $30', 'was – visiting – $30', 'was – to visit – $30', 'were – visiting – $30', 'was – visiting – of $30'], a: '②', why: '(A) 단수 movie (B) 동명사 (C) worth + 명사' }] },
    { level: '전환 · 영작', type: 'write', instr: '우리말과 같은 뜻이 되도록 괄호 안의 말을 이용하여 영작하시오. (필요하면 형태를 바꿀 것)', items: [
      { q: '세계사에 관한 책들은 읽을 가치가 있다. (books about world history, read)', a: 'Books about world history are worth reading.', why: '교과서 Grammar' },
      { q: '그 영화는 정말 볼 만한 가치가 있었다. (movie, really, watch)', a: 'The movie was really worth watching.', why: '교과서 Think and Write' },
      { q: '양양은 여름 방학 동안 방문할 만한 가치가 있다. (Yangyang, visit, during the summer vacation)', a: 'Yangyang is worth visiting during the summer vacation.', why: '교과서 Say It' },
      { q: '그 경기는 볼 만한 가치가 있었다. (game, watch)', a: 'The game was worth watching.', why: '기출 15 ⓒ' },
      { q: '이 책은 여러 번 읽을 가치가 있다. (book, read, several times)', a: 'This book is worth reading several times.', why: '기출 15 ⓕ' },
      { q: '그 박물관은 한번 가 볼 만하다. (museum, a visit)', a: 'The museum is worth a visit.', why: 'worth + 명사' },
      { q: '이 그림은 100달러의 가치가 있다. (painting, 100 dollars)', a: 'This painting is worth 100 dollars.', why: 'worth + 값' },
      { q: '무엇이 인생을 살 가치가 있게 만드는가? (make, life, live)', a: 'What makes life worth living?', why: '기출 20 ⓐ' },
      { q: '그의 용기는 칭찬받을 만하다. (bravery, worthy, praise)', a: 'His bravery is worthy of praise.', why: '기출 20 ⓑ' },
      { q: '그 프로젝트는 할 만한 가치가 있었다. (project, work on)', a: 'The project was worth working on.', why: '교과서 — 전치사 on이 남음' }] },
  ], m),

  // ---------------- Point 2 ----------------
  D.section('Point 2', '능동형 · 목적어 비우기 · 전치사 남기기 — It is worth -ing = It is worthwhile to-v', 'point'),
  ...D.table(['구성', '역할 · 설명', '예'], [
    ['능동형 -ing', '주어가 ‘읽히는’ 대상이어도 -ing는 능동형 그대로', 'The book is worth **reading**. (being read ✗ · to be read ✗)'],
    ['목적어 비우기', '주어 = 동명사의 의미상 목적어 → 목적어를 다시 쓰지 않는다', 'The book is worth reading. (reading **it** ✗) / Pop art is worth paying attention to. (to **it** ✗)'],
    ['전치사 남기기', 'pay attention to · listen to · work on · fight for · go to의 전치사는 그대로', 'Pop art is worth paying attention **to**. (본문) / His songs are worth listening **to**. (기출 14) / freedom is worth fighting **for** (기출 15 ⓔ)'],
    ['It is worth -ing ~', '가주어 It — 목적어는 -ing 뒤 제자리에', '**It is worth listening to his songs.** = His songs are worth listening to. (기출 14 ⑤ · ④)'],
    ['It is worthwhile to-v[-ing] ~', 'worthwhile은 to부정사 · -ing 둘 다 가능 (worth to-v ✗)', 'It is **worthwhile to visit** the museum. = It is **worthwhile visiting** the museum. (기출 20 ⓒ)'],
    ['흔한 오답', 'worth to-v · 동명사 주어로 뒤집기', 'it is still worth **to pay** ✗ (기출 48 · 68) / Listening to his songs **are worth** ✗ (기출 14 ③)']], [2300, 3300, 4038], m),
  ...D.infoBox('같은 뜻 세 문장', [
    '① His songs are worth listening {{to}}. (주어 = listen to의 목적어 → 자리 비움)',
    '② It is worth listening to {{his songs}}. (가주어 It → 목적어 제자리)',
    '③ It is {{worthwhile}} to listen to his songs. (worthwhile 뒤에는 to부정사도 ○)'], m),
  ...D.trick('빈 의자는 비워 둔다', ['주어가 목적어 의자에서 일어나 맨 앞으로 갔다', '빈 의자에 it을 또 앉히면 자리 다툼', '의자 옆 전치사 to는 그대로 남는다']),
  ...D.examPoint([
    { q: 'But it is still worth paying attention {{to}}.', why: '주어 it(= pop art)이 pay attention to의 목적어 → to만 남는다 (본문 · 기출 48)' },
    { q: 'It is worth listening to his songs. = His songs are worth {{listening to}}.', why: '가주어 전환 — 목적어가 주어로 가면 자리 비움 (기출 14)' }], m),
  ...D.caution(['우리말 영작 ‘모두 고르기’(기출 14): His songs are worth listening ✗(to 빠뜨림) / It is worth listen to ✗ / Listening to his songs are worth ✗ / ④ · ⑤만 ○.',
    '본문 문장을 it is still worth to pay attention ✗, that is still worth to paying attention to ✗로 바꾼 영작 객관식(기출 48)과 ‘worth to pay로 바꿀 수 있다’는 설명 고르기(기출 68 진우 ✗)가 단골이다.',
    'reading it ✗ · being read ✗ — 주어가 동명사의 목적어라는 사실을 해석(‘읽을 가치가 있는 것은 책’)으로 확인시킨다.',
    'worthwhile은 to부정사 · -ing 모두 ○(기출 20 ⓒ), worth는 -ing만 ○ — 두 단어를 바꿔 넣은 선지를 고르게 한다. 기출 20 ⓔ(It might worthwhile …)는 be 누락까지 겹쳐 정답표와 판단이 엇갈리므로 쓰지 않았다.'], m),
  ...D.drill(2, '능동형 · 목적어 비우기 · 전치사 남기기 · It 전환', [
    { level: 'Basic ①', type: 'choice', instr: '괄호 안에서 알맞은 것을 고르시오.', items: [
      { q: 'But it is still worth (paying / being paid) attention to.', a: 'paying', why: '능동형 -ing (본문)' },
      { q: 'The book is worth (reading / reading it).', a: 'reading', why: '주어가 의미상 목적어 → 목적어 다시 쓰기 ✗' },
      { q: 'His songs are worth (listening / listening to).', a: 'listening to', why: '전치사 to가 남음 (기출 14)' },
      { q: 'It is worth (visiting / visited) the museum.', a: 'visiting', why: 'It is worth + -ing + 목적어' },
      { q: 'It is (worth / worthwhile) to visit the museum.', a: 'worthwhile', why: 'worth to-v ✗ · worthwhile to-v ○' },
      { q: 'This problem is worth (thinking / thinking about).', a: 'thinking about', why: 'think about의 about이 남음' },
      { q: 'The temple is worth (visiting / being visited).', a: 'visiting', why: '수동 의미여도 능동형' },
      { q: '(That / It) is worth listening to his songs.', a: 'It', why: '가주어 It (기출 14 ⑤)' },
      { q: 'We believe our freedom is worth fighting (for it / for).', a: 'for', why: '목적어 다시 쓰기 ✗ (기출 15 ⓔ)' },
      { q: 'The project was worth working (on / on it).', a: 'on', why: '교과서 — 전치사만 남김' }] },
    { level: 'Basic ②', type: 'fill', instr: '<보기>에서 알맞은 말을 골라 빈칸에 쓰시오. (한 번씩만 사용)',
      bogi: ['about', 'It', 'listening', 'for', 'paying', 'worthwhile', 'on', 'visiting', 'to', 'thinking'], items: [
      { q: 'But it is still worth [[paying]] attention to.', why: '본문' },
      { q: 'His songs are worth listening [[to]].', why: '기출 14 ④' },
      { q: '[[It]] is worth listening to his songs.', why: '기출 14 ⑤ — 가주어' },
      { q: 'It is [[worthwhile]] to visit the museum.', why: 'worthwhile + to-v' },
      { q: 'We believe our freedom is worth fighting [[for]].', why: '기출 15 ⓔ' },
      { q: 'The project was worth working [[on]].', why: '교과서' },
      { q: 'Her song is worth [[listening]] to.', why: '교과서 Grammar✚' },
      { q: 'Jeju Island is worth [[visiting]].', why: '교과서 Say It 변형' },
      { q: 'The problem is worth talking [[about]].', why: 'talk about의 about이 남음' },
      { q: 'This idea is worth [[thinking]] about.', why: 'worth + 동명사 + 전치사' }] },
    { level: 'Intermediate', type: 'write', instr: '어법상 틀린 부분을 찾아 바르게 고쳐 쓰시오.', items: [
      { q: 'But it is still worth paying attention.', a: 'attention → attention to', why: '본문 — pay attention to의 to가 남음' },
      { q: 'The book is worth reading it.', a: 'reading it → reading', why: '주어가 의미상 목적어' },
      { q: 'His songs are worth listening.', a: 'listening → listening to', why: '기출 14 ①' },
      { q: 'It is worth listen to his songs.', a: 'listen → listening', why: '기출 14 ②' },
      { q: 'Listening to his songs are worth.', a: 'Listening to his songs are worth → His songs are worth listening to', why: '기출 14 ③ — 주어 + be worth + -ing' },
      { q: 'The museum is worth being visited.', a: 'being visited → visiting', why: '능동형 -ing' },
      { q: 'It is worthwhile visit the museum.', a: 'visit → to visit (또는 visiting)', why: 'worthwhile + to-v[-ing]' },
      { q: 'The bridge is worth looking.', a: 'looking → looking at', why: 'look at의 at이 남음' },
      { q: 'This book is worth to be read.', a: 'to be read → reading', why: '능동형 -ing · to부정사 ✗' },
      { q: 'That restaurant is worth going to it.', a: 'going to it → going to', why: '목적어 다시 쓰기 ✗' }] },
    { level: 'Advanced · 모두 고르기', type: 'multi', free: true, instr: '해당하는 것을 모두 골라 기호를 쓰시오.', items: [
      { q: '다음 우리말을 알맞게 영작한 것을 모두 고르시오. — 그의 노래들은 들을 만한 가치가 있다.', box: [
        '(a) His songs are worth listening.', '(b) It is worth listen to his songs.', '(c) His songs are worth listening to.',
        '(d) It is worth listening to his songs.', '(e) It is worthwhile to listen to his songs.'], a: '(c), (d), (e)', why: '(a) listening to (b) listening (기출 14 + worthwhile)' },
      { q: '밑줄 친 부분에 대한 설명으로 옳은 것을 모두 고르시오.', box: [
        '(a) Pop art is worth paying attention __to__. → 주어 Pop art가 to의 의미상 목적어라서 to를 남긴다.',
        '(b) The book is worth __reading__. → 책이 ‘읽히는’ 것이므로 being read로 바꿔야 한다.',
        '(c) It is worth visiting __the museum__. → the museum은 visiting의 목적어이다.',
        '(d) It is __worthwhile__ to visit the museum. → worthwhile을 worth로 바꿔도 어법상 옳다.',
        '(e) The project was worth working __on__. → on을 빼도 어법상 옳다.'], a: '(a), (c)', why: '(b) 능동형 그대로 (d) worth to-v ✗ (e) work on의 on은 남김' },
      { q: '다음 대화의 밑줄 친 ⓐ~ⓔ 중 어법상 어색한 것을 모두 골라 기호를 쓰고 바르게 고치시오.', fix: true, label: '기호 / 고친 것', box: [
        'A: What do you think of the book? — B: I think ⓐ __it’s worth reading__.',
        'A: How was the movie? — B: It was boring. It ⓑ __wasn’t worth watching it__.',
        'A: Is the new museum good? — B: Yes. ⓒ __It is worth visiting the museum__ this weekend.',
        'A: Do you like her new song? — B: Yes. It ⓓ __is worth listening__.',
        'A: Should I see the play? — B: Sure. ⓔ __It is worthwhile to see it__.'], a: 'ⓑ → wasn’t worth watching, ⓓ → is worth listening to', why: 'ⓑ 목적어 다시 쓰기 ✗ ⓓ listen to의 to가 남음 (ⓐ 기출 26 ②)' },
      { q: '두 문장의 의미가 같은 것을 모두 고르시오.', box: [
        '(a) His songs are worth listening to. = It is worth listening to his songs.',
        '(b) The museum is worth visiting. = It is worthwhile to visit the museum.',
        '(c) This book is worth reading. = It is not worth reading this book.',
        '(d) The bridge is worth looking at. = It is worthwhile looking at the bridge.',
        '(e) The movie was worth watching. = The movie was too boring to watch.'], a: '(a), (b), (d)', why: '(c) not — 반대 (e) 볼 가치가 없었다 — 반대' }] },
    { level: 'Advanced · 객관식', type: 'mcq', free: true, instr: '알맞은 답을 고르시오.', items: [
      { q: '다음 우리말을 알맞게 영작한 것은? — 하지만 그것은 여전히 주목할 만한 가치가 있다. → But ______.', opts: [
        'it is still worth pay attention', 'it is still worth to pay attention', 'it is still worth paying attention to',
        'that is still worth to pay attention to', 'that is still worth to paying attention to'], a: '③', why: 'worth + 동명사 + 전치사 to 남김 (기출 48)' },
      { q: '다음 중 어법상 어색한 문장은?', opts: [
        'The book is worth reading.', 'His songs are worth listening to.', 'It is worth visiting the museum.',
        'It is worthwhile to visit the museum.', 'The book is worth reading it.'], a: '⑤', why: '⑤ 목적어 it 다시 쓰기 ✗' },
      { q: '다음 문장과 뜻이 같은 것은? — It is worth listening to his songs.', opts: [
        'His songs are worth listening.', 'His songs are worth listening to.', 'His songs are worth being listened to.',
        'It is worth to listen to his songs.', 'It is worthwhile listen to his songs.'], a: '②', why: '① to 빠뜨림 ③ 능동형 ④ worth to-v ✗ ⑤ to listen · listening' },
      { q: '다음 중 빈칸에 to가 들어갈 수 없는 것은?', opts: [
        'Pop art is worth paying attention ____.', 'His songs are worth listening ____.', 'The East Sea is worth going ____.',
        'The project was worth working ____.', 'It is worthwhile ____ visit the museum.'], a: '④', why: '④ work on — on이 들어감 (교과서)' },
      { q: '다음 중 어법상 알맞은 문장의 개수는?', box: [
        '(a) The book is worth reading it.', '(b) The temple is worth visiting.', '(c) It is worth to visit the temple.',
        '(d) The temple is worth being visited.', '(e) Her advice is worth listening.'], opts: ['1개', '2개', '3개', '4개', '5개'], a: '①', why: '(b)만 ○ — (a) it ✗ (c) visiting (d) visiting (e) listening to' }] },
    { level: '전환 · 연결', type: 'write', instr: '괄호 안의 지시대로 같은 뜻의 문장으로 바꾸어 쓰시오.', items: [
      { q: 'Pop art is worth paying attention to. (It is worth ~)', a: 'It is worth paying attention to pop art.', why: '본문 — 목적어를 제자리로' },
      { q: 'His songs are worth listening to. (It is worth ~)', a: 'It is worth listening to his songs.', why: '기출 14' },
      { q: 'It is worth reading books about world history. (Books about world history로 시작)', a: 'Books about world history are worth reading.', why: '교과서 — 복수 주어 are' },
      { q: 'The East Sea is worth going to. (It is worthwhile to ~)', a: 'It is worthwhile to go to the East Sea.', why: '교과서 Say It' },
      { q: 'Jeju Island is worth visiting. (It is worthwhile to ~)', a: 'It is worthwhile to visit Jeju Island.', why: '교과서 Say It' },
      { q: 'It is worthwhile to watch the movie. (The movie로 시작, worth 사용)', a: 'The movie is worth watching.', why: '목적어가 주어로 → 자리 비움' },
      { q: 'It is worthwhile to work on the project. (The project로 시작, worth 사용)', a: 'The project is worth working on.', why: '교과서 — on이 남음' },
      { q: 'It is worth fighting for our freedom. (Our freedom으로 시작)', a: 'Our freedom is worth fighting for.', why: '기출 15 ⓔ — for가 남음' },
      { q: 'It is worthwhile to look at the trends. (It is worthwhile + -ing)', a: 'It is worthwhile looking at the trends.', why: '기출 20 ⓒ' },
      { q: 'It was worth watching the game. (The game으로 시작)', a: 'The game was worth watching.', why: '기출 15 ⓒ — 시제는 be동사로' }] },
  ], m),

  // ---------------- Point 3 ----------------
  D.section('Point 3', '(심화) 동명사 관용 표현 비교 — be busy -ing · feel like -ing · look forward to -ing …', 'point'),
  ...D.table(['표현', '뜻 · 주의', '예'], [
    ['be busy -ing', '~하느라 바쁘다 (busy to-v ✗)', 'Andy Warhol was **busy making** copies of his works.'],
    ['feel like -ing', '~하고 싶다 (feel like to-v ✗)', 'I **feel like going** to the art museum today.'],
    ['look forward to -ing', '~을 고대하다 — 이 to는 전치사 (to + 동사원형 ✗)', 'I’m **looking forward to seeing** his exhibition.'],
    ['cannot help -ing', '~하지 않을 수 없다 (help + 동사원형 ✗)', 'I **couldn’t help laughing** at the cartoon.'],
    ['spend + 시간 · 돈 + -ing', '~하는 데 시간 · 돈을 쓰다 (to-v ✗)', 'She **spent three hours painting** the wall.'],
    ['have difficulty[trouble] -ing', '~하는 데 어려움을 겪다', 'I **had difficulty finding** the gallery.'],
    ['be used to -ing vs used to + 동사원형', '~하는 데 익숙하다 / ~하곤 했다', 'I’m **used to drawing** cartoons. / He **used to make** soft sculptures.'],
    ['전치사 + 동명사 (본문)', 'How about · by · for 뒤에는 -ing', '**How about creating** a work of pop art today? / **By using** daily images … (본문)']], [2700, 3000, 3938], m),
  ...D.infoBox('동명사 vs 현재분사 — 같은 -ing, 다른 역할', [
    '① 동명사(명사 역할): worth {{paying}} / How about {{creating}} … / I’m good at drawing.',
    '② 현재분사(분사구문): {{Using}} common images, pop art looks plain. (= Because pop art uses …)',
    '③ 구별법: 앞에 worth · 전치사 · 관용 동사가 있으면 동명사, 콤마 앞에서 접속사 · 주어가 빠진 부사절이면 {{분사구문}}'], m),
  ...D.trick('전치사 to를 알아보는 법', ['to 뒤라고 다 동사원형은 아니다', 'look forward to · be used to의 to는 전치사', '전치사 to 뒤 손님은 언제나 -ing']),
  ...D.trick('used to 쌍둥이', ['be가 붙으면 익숙함, 뒤는 -ing', 'be가 없으면 옛날 습관, 뒤는 동사원형', 'He used to make → 예전엔 만들곤 했다']),
  ...D.examPoint([
    { q: 'I’m looking forward to {{seeing}} his new exhibition.', why: 'look forward to의 to는 전치사 → 동명사' },
    { q: 'How about {{creating}} a work of pop art today?', why: '전치사 about + 동명사 (본문)' }], m),
  ...D.caution(['‘쓰임이 같은 것’(기출 47)은 본문 Using common images(분사구문)와 동명사 주어 · 목적어를 섞어 낸다. -ing의 역할(동명사 vs 현재분사)을 먼저 판단하게 한다.',
    'look forward to see ✗ · be used to get ✗ — to를 to부정사로 착각한 오답이 가장 많다. used to + 동사원형(~하곤 했다)과 짝지어 낸다.',
    'spend + 시간 + to-v ✗, cannot help + 동사원형 ✗, feel like + to-v ✗가 한 문항의 선지로 함께 나온다.',
    'have difficulty -ing · be used to -ing는 교과서 범위를 조금 넘지만 동명사 관용 표현 비교 문항에 자주 섞여 짧게 다룬다.'], m),
  ...D.drill(3, '동명사 관용 표현 비교', [
    { level: 'Basic ①', type: 'choice', instr: '괄호 안에서 알맞은 것을 고르시오.', items: [
      { q: 'Andy Warhol was busy (making / to make) copies of his works.', a: 'making', why: 'be busy -ing' },
      { q: 'I feel like (to go / going) to the art museum today.', a: 'going', why: 'feel like -ing' },
      { q: 'I’m looking forward to (see / seeing) his new exhibition.', a: 'seeing', why: 'look forward to의 to는 전치사' },
      { q: 'I couldn’t help (laughing / laugh) at the funny cartoon.', a: 'laughing', why: 'cannot help -ing' },
      { q: 'Oldenburg spent many days (to make / making) the huge sculpture.', a: 'making', why: 'spend + 시간 + -ing' },
      { q: 'I had difficulty (to find / finding) the gallery.', a: 'finding', why: 'have difficulty -ing' },
      { q: 'In the beginning, he used to (make / making) soft sculptures.', a: 'make', why: 'used to + 동사원형 = ~하곤 했다 (본문 변형)' },
      { q: 'I’m used to (draw / drawing) cartoons every day.', a: 'drawing', why: 'be used to -ing = ~에 익숙하다' },
      { q: 'How about (create / creating) a work of pop art today?', a: 'creating', why: '전치사 + 동명사 (본문)' },
      { q: 'By (using / use) daily images, pop artists changed that thought.', a: 'using', why: '전치사 by + 동명사 (본문)' }] },
    { level: 'Basic ②', type: 'fill', instr: '<보기>에서 알맞은 말을 골라 빈칸에 쓰시오. (한 번씩만 사용)',
      bogi: ['laughing', 'using', 'make', 'seeing', 'finding', 'making', 'creating', 'going', 'drawing', 'painting'], items: [
      { q: 'Andy Warhol was busy [[making]] many copies of his works.', why: 'be busy -ing' },
      { q: 'I feel like [[going]] to an art exhibition this weekend.', why: 'feel like -ing' },
      { q: 'I’m looking forward to [[seeing]] Lichtenstein’s cartoon paintings.', why: 'look forward to -ing' },
      { q: 'When I saw the cartoon, I couldn’t help [[laughing]].', why: 'cannot help -ing' },
      { q: 'She spent the whole afternoon [[painting]] the wall.', why: 'spend + 시간 + -ing' },
      { q: 'Many visitors had difficulty [[finding]] the outdoor sculpture.', why: 'have difficulty -ing' },
      { q: 'Claes Oldenburg used to [[make]] soft sculptures.', why: 'used to + 동사원형' },
      { q: 'Tom is used to [[drawing]] cartoons with a pencil.', why: 'be used to -ing' },
      { q: 'How about [[creating]] a work of pop art today?', why: '본문' },
      { q: 'By [[using]] daily images and bright colors, pop artists changed that thought.', why: '본문' }] },
    { level: 'Intermediate', type: 'write', instr: '어법상 틀린 부분을 찾아 바르게 고쳐 쓰시오.', items: [
      { q: 'Andy Warhol was busy to make copies of his works.', a: 'to make → making', why: 'be busy -ing' },
      { q: 'I feel like to go to the art museum.', a: 'to go → going', why: 'feel like -ing' },
      { q: 'I’m looking forward to see his exhibition.', a: 'see → seeing', why: 'look forward to -ing' },
      { q: 'I couldn’t help laugh at the cartoon.', a: 'laugh → laughing', why: 'cannot help -ing' },
      { q: 'He spent three hours to paint the picture.', a: 'to paint → painting', why: 'spend + 시간 + -ing' },
      { q: 'I had difficulty to find the gallery.', a: 'to find → finding', why: 'have difficulty -ing' },
      { q: 'Claes Oldenburg used to making soft sculptures.', a: 'making → make', why: 'used to + 동사원형 (~하곤 했다)' },
      { q: 'I’m used to get up early on weekends.', a: 'get → getting', why: 'be used to -ing' },
      { q: 'How about create a work of pop art today?', a: 'create → creating', why: '본문 — 전치사 + 동명사' },
      { q: 'Pop artists changed that thought by use daily images.', a: 'use → using', why: '본문 — 전치사 by + 동명사' }] },
    { level: 'Advanced · 모두 고르기', type: 'multi', free: true, instr: '해당하는 것을 모두 골라 기호를 쓰시오.', items: [
      { q: '다음 중 어법상 옳은 문장을 모두 고르시오.', box: [
        '(a) I feel like eat pizza.', '(b) She is busy preparing for the exhibition.', '(c) We are looking forward to meeting the artist.',
        '(d) I couldn’t help smile at the cartoon.', '(e) He spent all his money buying paintings.'], a: '(b), (c), (e)', why: '(a) eating (d) smiling' },
      { q: '밑줄 친 부분에 대한 설명으로 옳은 것을 모두 고르시오.', box: [
        '(a) I’m looking forward __to__ seeing you. → 이 to는 전치사이므로 뒤에 동명사가 온다.',
        '(b) He __used to__ make soft sculptures. → ‘~에 익숙하다’라는 뜻이다.',
        '(c) __Using__ common images, pop art looks plain. → Using은 동명사로 문장의 주어이다.',
        '(d) How about __creating__ a work of pop art? → 전치사 about의 목적어인 동명사이다.',
        '(e) I couldn’t help __laughing__. → ‘웃는 것을 도울 수 없었다’라고 해석한다.'], a: '(a), (d)', why: '(b) ~하곤 했다 (c) 분사구문(현재분사) (e) 웃지 않을 수 없었다' },
      { q: '다음 글의 밑줄 친 ⓐ~ⓔ 중 어법상 어색한 것을 모두 골라 기호를 쓰고 바르게 고치시오.', fix: true, label: '기호 / 고친 것', box: [
        'Dear Mina, Last week I ⓐ __was busy studying__ for exams, so I couldn’t call you. Now I ⓑ __feel like to go__ out. I ⓒ __am looking forward to visit__ the pop art exhibition with you. I’m sure we ⓓ __will spend hours looking at__ the paintings. ⓔ __It is worth visiting__ the exhibition. See you soon!'],
        a: 'ⓑ → feel like going, ⓒ → am looking forward to visiting', why: 'ⓑ feel like -ing ⓒ look forward to의 to는 전치사' },
      { q: '괄호 안의 동사를 알맞은 형태로 바꿀 때, -ing 형태가 들어가는 것을 모두 고르시오.', box: [
        '(a) I decided ______ (join) the art club.', '(b) He used to ______ (paint) cartoons.', '(c) I had trouble ______ (open) the door.',
        '(d) The exhibition is worth ______ (see).', '(e) I want ______ (be) an artist.'], a: '(c), (d)', why: '(a) to join (b) paint (e) to be' }] },
    { level: 'Advanced · 객관식', type: 'mcq', free: true, instr: '알맞은 답을 고르시오.', items: [
      { q: '다음 빈칸에 들어갈 말로 알맞지 않은 것은? — I ______ drawing cartoons.', opts: [
        'enjoy', 'want', 'finished', 'am used to', 'feel like'], a: '②', why: 'want는 to부정사를 목적어로 (want to draw)' },
      { q: '다음 밑줄 친 부분과 쓰임이 같은 것은? — __Using__ common images, pop art looks plain.', opts: [
        'Saving energy is a great way for all of us.', 'Do you mind my practicing the violin here?', 'He is good at playing the piano, but I’m not.',
        'Studying harder, you will do better next time.', 'Drinking enough water is good for your health.'], a: '④', why: '분사구문(현재분사) — 나머지는 동명사 (기출 47 변형)' },
      { q: '다음 중 어법상 어색한 문장은?', opts: [
        'I’m looking forward to see you.', 'She is busy cleaning her room.', 'I couldn’t help laughing.',
        'He spent two hours reading.', 'I don’t feel like eating now.'], a: '①', why: '① to seeing' },
      { q: '(A)~(C)에 알맞은 말이 바르게 짝지어진 것은? — The pop art exhibition is worth (A)(visiting / to visit). / I spent the afternoon (B)(to look / looking) at Warhol’s works. / I’m looking forward to (C)(come / coming) back again.', opts: [
        'to visit – looking – coming', 'visiting – to look – come', 'visiting – looking – come', 'to visit – to look – coming', 'visiting – looking – coming'], a: '⑤', why: '(A) worth -ing (B) spend + 시간 + -ing (C) look forward to -ing' },
      { q: '다음 우리말을 바르게 영작한 것은? — 나는 그 만화를 보고 웃지 않을 수 없었다.', opts: [
        'I couldn’t help laugh at the cartoon.', 'I could help laughing at the cartoon.', 'I couldn’t help laughing at the cartoon.',
        'I couldn’t help to laugh at the cartoon.', 'I couldn’t laughing at the cartoon.'], a: '③', why: 'cannot help -ing' }] },
    { level: '전환 · 영작', type: 'write', instr: '우리말과 같은 뜻이 되도록 괄호 안의 말을 이용하여 영작하시오. (필요하면 형태를 바꿀 것)', items: [
      { q: '그는 그의 작품들의 복사본을 만드느라 바빴다. (busy, make copies of)', a: 'He was busy making copies of his works.', why: 'be busy -ing (본문 소재)' },
      { q: '나는 오늘 미술관에 가고 싶다. (feel like, go to the art museum)', a: 'I feel like going to the art museum today.', why: 'feel like -ing' },
      { q: '나는 그의 전시회를 보기를 고대하고 있다. (look forward to, see, exhibition)', a: 'I’m looking forward to seeing his exhibition.', why: 'look forward to -ing' },
      { q: '나는 그 만화를 보고 웃지 않을 수 없었다. (help, laugh at)', a: 'I couldn’t help laughing at the cartoon.', why: 'cannot help -ing' },
      { q: '그녀는 그 벽을 칠하는 데 세 시간을 보냈다. (spend, three hours, paint the wall)', a: 'She spent three hours painting the wall.', why: 'spend + 시간 + -ing' },
      { q: '나는 그 미술관을 찾는 데 어려움을 겪었다. (difficulty, find, gallery)', a: 'I had difficulty finding the gallery.', why: 'have difficulty -ing' },
      { q: '그는 매일 일찍 일어나는 것에 익숙하다. (used, get up early)', a: 'He is used to getting up early every day.', why: 'be used to -ing' },
      { q: '오늘 팝 아트 작품을 하나 만들어 보는 게 어때? (how about, create)', a: 'How about creating a work of pop art today?', why: '본문' },
      { q: '일상의 이미지를 사용함으로써 팝 아트 예술가들은 그 생각을 바꿨다. (by, use, daily images)', a: 'By using daily images, pop artists changed that thought.', why: '본문 변형' },
      { q: '그 팝 아트 전시회는 방문할 가치가 있다. (exhibition, worth, visit)', a: 'The pop art exhibition is worth visiting.', why: 'be worth -ing' }] },
  ], m),

  // ---------------- PERFECT CHECK ----------------
  D.section('PERFECT CHECK', '상위권 함정 체크'),
  ...D.drill(null, '', [{ level: '함정', type: 'choice', instr: '실수하기 쉬운 문장들이에요. 괄호 안에서 알맞은 것을 고르시오.', items: [
    { q: 'But it is still worth paying attention (to / to it).', a: 'to', why: '본문 — 목적어 다시 쓰기 ✗' },
    { q: 'The book is worth (reading / being read).', a: 'reading', why: '능동형 -ing' },
    { q: 'These expensive jeans (was / were) worth buying.', a: 'were', why: '기출 15 ⓓ — 수 일치' },
    { q: 'It is (worthwhile / worth) to visit the museum.', a: 'worthwhile', why: 'worth to-v ✗' },
    { q: 'What makes life worth (live / living)?', a: 'living', why: '기출 20 ⓐ' },
    { q: 'I’m looking forward to (see / seeing) the exhibition.', a: 'seeing', why: '전치사 to + 동명사' },
    { q: 'His bravery is (worthy / worth) of praise.', a: 'worthy', why: '기출 20 ⓑ' },
    { q: 'He spent two hours (to look / looking) at Warhol’s works.', a: 'looking', why: 'spend + 시간 + -ing' },
    { q: '(Used / Using) common images, pop art looks plain.', a: 'Using', why: '본문 — 분사구문(능동, 같은 과 문법)' },
    { q: '(Wanting / Wanted) everyone to enjoy his art, he set up his works in outdoor places.', a: 'Wanting', why: '본문 — 분사구문(능동, 같은 과 문법)' }] }], m),

  // ---------------- WRITE ----------------
  D.section('WRITE', '서술형 대비'),
  ...D.writeItem(1, 'Basic', '괄호 안의 단어를 알맞은 형태로 바꾸어 쓰시오.', ['Using common images, pop art looks plain. But it is still worth (pay) attention to. (본문)'], { a: 'paying', why: 'worth + 동명사' }, m),
  ...D.writeItem(2, 'Basic', '괄호 안의 단어를 알맞은 형태로 바꾸어 쓰시오.', ['Books about world history (be) worth (read). (교과서)'], { a: 'are, reading', why: '복수 주어 → are / worth + 동명사' }, m),
  ...D.writeItem(3, 'Intermediate', '주어를 His songs로 하여 같은 뜻의 문장으로 바꾸어 쓰시오. [문장 전환]', ['It is worth listening to his songs. (기출 14)'],
    { a: 'His songs are worth listening to.', why: '목적어가 주어로 → 자리 비움, to는 남김' }, m),
  ...D.writeItem(4, 'Intermediate', 'It is worthwhile을 사용하여 같은 뜻의 문장으로 바꾸어 쓰시오. [문장 전환]', ['The East Sea is worth going to. (교과서)'],
    { a: 'It is worthwhile to go to the East Sea. (또는 It is worthwhile going to the East Sea.)', why: 'worthwhile + to-v[-ing] + 목적어 제자리' }, m),
  ...D.writeItem(5, 'Intermediate', '주어를 The project로 하고 worth를 사용하여 같은 뜻의 문장으로 바꾸어 쓰시오. [문장 전환]', ['It was worthwhile to work on the project.'],
    { a: 'The project was worth working on.', why: '교과서 — 시제는 be동사, on은 남김' }, m),
  ...D.writeItem(6, 'Intermediate', '주어를 Pop art로 하고 worth를 사용하여 같은 뜻의 문장으로 바꾸어 쓰시오. [문장 전환]', ['It is worthwhile to pay attention to pop art.'],
    { a: 'Pop art is worth paying attention to.', why: '교과서 Lesson Points — 주어 = pay attention to의 목적어, to는 남김' }, m),
  ...D.writeItem(7, 'Advanced', '우리말과 같은 뜻이 되도록 <조건>에 맞게 영작하시오.', ['A: How was the movie?  B: 그 영화는 볼 만한 가치가 있었어. I was so moved.', '<조건> worth, see를 사용하되 필요시 변형할 것 · 과거 시제 · 총 5단어'],
    { a: 'The movie was worth seeing.', why: '기출 19 (1) 변형 · 5단어 (The/movie/was/worth/seeing)' }, m),
  ...D.writeItem(8, 'Advanced', '<보기>의 단어를 배열하여 우리말과 같은 뜻의 문장을 완성하시오. (필요시 형태를 바꿀 것)', ['하지만 그것은 여전히 주목할 만한 가치가 있다.', '<보기> (it / still / to / is / pay / worth / attention)', '→ But ______________________________.'],
    { a: 'But it is still worth paying attention to.', why: '본문 — pay → paying, to는 맨 끝' }, m),
  ...D.writeItem(9, 'Advanced', '어법상 틀린 부분 2개를 찾아 바르게 고치고, 그 이유를 쓰시오.', ['Using common images, pop art looks plain. But it is still worth to pay attention. Although it looks plain, it is filled with meaning.'],
    { a: '① to pay → paying  ② attention → attention to', why: '① worth 뒤에는 동명사가 온다(to부정사 ✗) ② 주어 it(= pop art)이 pay attention to의 목적어이므로 목적어는 비우고 전치사 to는 남긴다', blanks: ['고친 것', '이유'] }, m),
  ...D.writeItem(10, 'Advanced', '어법상 틀린 부분 2개를 찾아 바르게 고치고, 그 이유를 쓰시오.', ['I’m looking forward to see the pop art exhibition. My friend said that it is worth visiting it.'],
    { a: '① see → seeing  ② visiting it → visiting', why: '① look forward to의 to는 전치사이므로 동명사 ② 주어 it(= the exhibition)이 visiting의 의미상 목적어이므로 다시 쓰지 않는다', blanks: ['고친 것', '이유'] }, m),

  // ---------------- MAP ----------------
  D.section('MAP', "DAVID'S MAP — 백지노트 테스트"),
  D.P([D.T('오늘 배운 내용을 떠올리며 빈칸을 채워 보세요. 책을 보지 않고!', { size: 18, color: '595959' })], { spacing: { after: 120 }, keepNext: true }),
  ...D.image(path.join(__dirname, 'map_G-beworth.png'), 620),
  ...D.table(['자가 체크 — 백지노트에 이 단어들이 들어갔나요?', '✔'], [
    ['주어 + be + worth + -ing = ~할 가치가 있다', ''], ['worth + 명사: worth $100 · worth a visit', ''],
    ['worth 뒤 to부정사 ✗ · 동사원형 ✗ · 과거분사 ✗ / worth는 동사가 아님 → be 필수', ''], ['-ing는 능동형 그대로: worth reading (being read ✗)', ''],
    ['주어 = 동명사의 의미상 목적어 → 목적어 다시 쓰기 ✗ (reading it ✗)', ''], ['전치사는 남긴다: worth paying attention to · listening to · working on', ''],
    ['It is worth -ing + 목적어 = It is worthwhile to-v[-ing] + 목적어', ''], ['worthy of + 명사 (worth of ✗)', ''],
    ['busy · feel like · look forward to · cannot help · spend + 시간 · have difficulty · be used to + -ing', ''],
    ['본문: But it is still worth paying attention to.', '']], [8838, 800], m),
  ...D.memo(['다음 시간 도입: We pay attention to pop art. → Pop art is worth paying attention to. 를 칠판에서 학생이 직접 바꾸게 하고, 빈자리에 무엇이 빠졌는지 말하게 하기',
    '약한 반: Point 1(worth + -ing · be 필수) 확실히 → Point 2는 reading it ✗ · listening to 두 가지만 → Point 3은 look forward to -ing 하나만',
    '분사구문(같은 과 문법)과 섞인 기출 47 · 65 · 68 다시 풀기 — 같은 -ing라도 동명사인지 분사구문인지 먼저 판단하게 한다.',
    '교과서 Say It: 가 볼 만한 곳을 ~ is worth going to[visiting]. 로 두 문장씩 말하고 짝과 서로 어법 점검'], m),
];
D.render(meta, build, process.argv[2] || '.').then(fs_ => {
  const out = fs_.map(f => { const g = path.join(path.dirname(f), path.basename(f).replace(TITLE, 'beworth')); fs.renameSync(f, g); return g; });
  console.log(out.join('\n'));
});
