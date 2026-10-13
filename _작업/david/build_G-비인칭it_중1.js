const D0 = require('./david_base');
const path = require('path');
const fs = require('fs');
// 중1 동아(윤정미) 8과 목표 문법 ② 비인칭 주어 it
// 한 문장에 빈칸 ______ 이 두 개 이상이면 david_base의 __밑줄__ 서식으로 잘못 읽히므로
// 밑줄 3개 이상 이어진 빈칸은 밑줄 사이에 U+200B를 넣어 둔다 (beworth · the비교급 · with분사 스크립트와 같은 처리).
const ZB = (s) => s.replace(/_{3,}/g, (u) => u.split('').join('​'));
const deep = (v) => typeof v === 'string' ? ZB(v) : Array.isArray(v) ? v.map(deep)
  : (v && typeof v === 'object' && v.constructor === Object) ? Object.fromEntries(Object.entries(v).map(([k, x]) => [k, deep(x)])) : v;
const D = new Proxy(D0, { get: (t, k) => (typeof t[k] === 'function' && !['render', 'P', 'T', 'image'].includes(k)) ? (...a) => t[k](...deep(a)) : t[k] });
const COVER = JSON.parse(process.env.COVER || '{}');
const TITLE = '비인칭 주어 it';
const meta = { series: D.SERIES.G, code: 'G-비인칭it', title: TITLE, category: 'G. 대명사  |  비인칭 주어 it (시간 · 날짜 · 요일 · 날씨 · 계절 · 거리 · 명암)',
  rightText: 'G  비인칭 주어 it', prefix: process.env.PREFIX || '', cover: COVER.title ? COVER : undefined,
  question: '~~It~~ was getting dark, and ~~it~~ started to rain. — 두 It은 무엇을 가리킬까? ‘그것’이라고 해석하면 왜 어색할까?' };

const build = (m) => [
  D.section('FLOW', 'Teaching Flow — 처음 배우는 사람도 따라오는 5단계'),
  ...D.step(1, '우리말로 먼저 생각하기 — 주어 없는 우리말 문장', [
    '‘어두워지고 있었다. 비가 오기 시작했다.’ — 우리말은 주어 없이도 말이 된다.',
    '하지만 영어 문장에는 반드시 {{주어}}가 있어야 한다. 그렇다면 무엇을 주어로 쓸까?'], m),
  ...D.step(2, '이전 학년 복습 — 대명사 it', [
    '앞에 나온 단수 사물을 다시 말할 때 it = ‘{{그것}}’: My phone is not working. … Look at this one. — I like **it**. (대화문)',
    '복수 사물은 they · them: Other people already shared **them**. (본문)'], m),
  ...D.step(3, '문제 제기 — 본문의 It은 무엇을 가리킬까?', [
    'It was getting dark, and it started to rain. (본문)',
    '앞 문장에 ‘어두워질 그것’이나 ‘비를 내리는 그것’이 나왔나? → 가리킬 대상이 {{없다}}.'], m),
  ...D.step(4, '규칙 발견 — 빈 주어 자리를 It이 채운다', [
    '날씨 · 시간 · 날짜 · 요일 · 계절 · 거리 · 명암은 주어로 세울 물건이 없다 → 주어 자리를 {{It}}으로 채운다.',
    '이 It은 뜻이 없어서 ‘그것’이라고 해석하지 {{않는다}} = 비인칭 주어'], m),
  ...D.step(5, '결론 🔑', [
    '비인칭 주어 it = 형식상 주어(뜻 없음) / 대명사 it = 앞의 단수 명사(‘그것’) / 구별법: ‘그것’을 넣어 말이 되면 {{대명사}}, 어색하면 비인칭 / this · that은 비인칭 주어 자리에 ✗'], m),
  ...D.infoBox('오늘의 핵심 3문장', [
    '① {{It}} was getting dark. (본문 · 명암)',
    '② … and {{it}} started to rain. (본문 · 날씨)',
    '③ She jumped on the smallest one again and again. It broke. — It = {{the smallest chair}} (본문 · 대명사)'], m),
  ...D.tip(['창밖을 가리키며 “What’s the weather like?”로 시작해 학생이 It’s sunny. / It’s cloudy.로 답하게 한 뒤, 같은 It을 칠판의 It broke.(본문)와 나란히 써서 ‘가리키는 것이 있나?’를 묻는다.',
    '같은 과 문법 수여동사와 [05] ‘어법상 어색한 문장의 개수’에서 섞여 나오므로 PERFECT CHECK에 수여동사 2문항을 넣었다. Point 3(날씨 표현 · get + 형용사)은 심화로 다룬다.'], m),

  // ---------------- Point 1 ----------------
  D.section('Point 1', '비인칭 주어 it의 쓰임 — 시간 · 날짜 · 요일 · 날씨 · 계절 · 거리 · 명암', 'point'),
  ...D.table(['쓰임', '질문 → 대답', '예'], [
    ['시간', 'What time is it? → It is ~', 'It’s 12 o’clock now. (교과서) / It’s 3:37.'],
    ['날짜', 'What’s the date today? → It is + 월 일', 'It’s November 5th today. (교과서) / It’s December 1st.'],
    ['요일', 'What day is it today? → It is + 요일', 'It is Tuesday. The store is closed. (교과서)'],
    ['날씨 · 기온', 'How’s the weather? / What’s the weather like? → It is + 형용사', 'It was sunny yesterday. (교과서) / It rains a lot in summer. / It was -10°C.'],
    ['계절', 'What season is it? → It is + 계절', 'It’s winter now. / It’s summer in New Zealand now.'],
    ['거리', 'How far is it ~? → It is + 거리', 'It’s two kilometers to the school. (교과서)'],
    ['명암 · 상태', 'It is dark / light / noisy ~', 'It was getting dark. (본문) / It’s dark in the room.']], [1900, 3500, 4238], m),
  ...D.infoBox('질문과 대답은 짝으로', [
    '① What time is it? — {{It’s}} 10 o’clock.',
    '② What day is it today? — It’s {{Monday}}.',
    '③ How far is it to the station? — It’s 2 {{kilometers}}.'], m),
  ...D.trick('비인칭 it이 맡는 일 — 두문자 “시날요계거명”', ['시간 · 날짜(날씨) · 요일 · 계절 · 거리 · 명암', '앞 글자만 모아 “시날요계거명”으로 외운다', '이 여섯 가지를 말할 때 주어 자리는 It이 맡는다']),
  ...D.examPoint([
    { q: '{{It}} was getting dark, and it started to rain.', why: '본문 — 명암 · 날씨 (This ✗ · That ✗)' },
    { q: 'A: How far is it to the airport? B: {{It}} is 5 kilometers.', why: '[05] — 거리' }], m),
  ...D.caution(['[05] ‘㉠It과 쓰임이 다른 것 모두 고르기’: sent it to her friend · it broke soon(대명사)을 비인칭(날씨 · 거리 · 날짜)과 섞어 낸다.',
    '그림 보고 빈칸([05] 기출): It was Saturday, December 6 yesterday, and it snowed — 요일 · 날짜 · 날씨를 한 문장에, 시제는 과거.',
    '거리는 to + 장소 또는 from A to B와 함께: It is 2 km to the school. / It’s 100 kilometers from here to Paris. (워크북)',
    '워크북 Part 2의 It’s a special day · It was a hot summer day 같은 ‘상황’ 문장은 판단이 갈릴 수 있어 이 자료에서는 문항으로 내지 않았다.'], m),
  ...D.drill(1, '비인칭 주어 it의 쓰임', [
    { level: 'Basic ①', type: 'choice', instr: '괄호 안에서 알맞은 것을 고르시오.', items: [
      { q: '(This / It) is Sunday today.', a: 'It', why: '요일 (워크북 Part 1)' },
      { q: '(It / That) was windy.', a: 'It', why: '날씨' },
      { q: 'What day is (this / it) today?', a: 'it', why: '요일 묻기' },
      { q: '(That / It)’s 2 kilometers to the zoo.', a: 'It', why: '거리' },
      { q: '(It / This) is summer in Korea.', a: 'It', why: '계절' },
      { q: '(It / That)’s dark in the room.', a: 'It', why: '명암' },
      { q: 'Is (that / it) far from here?', a: 'it', why: '거리 묻기' },
      { q: '(It / This) was getting dark, and it started to rain.', a: 'It', why: '본문 — 명암' },
      { q: 'What time is (it / that) now?', a: 'it', why: '시간 묻기' },
      { q: 'A: How’s the weather? B: (That / It)’s raining.', a: 'It', why: '날씨' }] },
    { level: 'Basic ②', type: 'fill', instr: '<보기>에서 알맞은 말을 골라 빈칸에 쓰시오. (한 번씩만 사용)',
      bogi: ['winter', 'Saturday', 'dark', '12 o’clock', 'sunny', 'snowed', 'two kilometers', 'November 5th', 'raining', 'Tuesday'], items: [
      { q: 'It’s [[12 o’clock]] now.', why: '시간 (교과서)' },
      { q: 'It’s [[November 5th]] today.', why: '날짜 (교과서)' },
      { q: 'It is [[Tuesday]]. The store is closed.', why: '요일 (교과서)' },
      { q: 'It was [[sunny]] yesterday.', why: '날씨 (교과서)' },
      { q: 'It’s [[winter]] now, but it’s not cold.', why: '계절 (워크북)' },
      { q: 'It’s [[two kilometers]] to the school.', why: '거리 (교과서)' },
      { q: 'It was getting [[dark]], and it started to rain.', why: '본문 — 명암' },
      { q: 'A: What’s the weather like in Busan? B: It’s [[raining]].', why: '날씨 (워크북 Part 3)' },
      { q: 'It was [[Saturday]], December 6 yesterday.', why: '[05] 기출 — 요일' },
      { q: 'It [[snowed]] for the first time this year.', why: '[05] 기출 — 날씨 동사 과거' }] },
    { level: 'Intermediate', type: 'write', instr: '괄호 안의 말을 이용하여 비인칭 주어 it으로 대답을 쓰시오.', items: [
      { q: 'A: What time is it now? B: ____ (3:37)', a: 'It’s 3:37.', why: '시간 (워크북)' },
      { q: 'A: What day is it today? B: ____ (Thursday)', a: 'It’s Thursday.', why: '요일' },
      { q: 'A: What’s the date today? B: ____ (February 26th)', a: 'It’s February 26th.', why: '날짜' },
      { q: 'A: What’s the weather like today? B: ____ (snowy)', a: 'It’s snowy.', why: '날씨' },
      { q: 'A: How far is the train station from here? B: ____ (2 kilometers)', a: 'It’s 2 kilometers.', why: '거리' },
      { q: 'A: What’s the weather like in Seoul? B: ____ (sunny, cool)', a: 'It’s sunny and cool.', why: '날씨 (워크북 Part 3)' },
      { q: 'A: What will the weather be like there? B: ____ (very cold and windy)', a: 'It’ll be very cold and windy there.', why: '미래 (워크북 Part 3)' },
      { q: 'A: What season is it in New Zealand now? B: ____ (summer)', a: 'It’s summer (in New Zealand now).', why: '계절' },
      { q: 'A: Is it dark outside? B: Yes, ____ (getting dark)', a: 'it’s getting dark.', why: '명암 · get + 형용사' },
      { q: 'A: Hey, HARi. What’s the date today? B: ____ (December 1st)', a: 'It’s December 1st.', why: '교과서 Use It' }] },
    { level: 'Advanced · 모두 고르기', type: 'multi', free: true, instr: '해당하는 것을 모두 골라 기호를 쓰시오.', items: [
      { q: '밑줄 친 It이 비인칭 주어인 것을 모두 고르시오.', box: [
        '(a) __It__ is 10 o’clock.', '(b) There is a pen on the desk. __It__ is red.', '(c) __It__ was cloudy yesterday.',
        '(d) I have a puppy. __It__ is 3 months old.', '(e) __It__ is six kilometers to the park.'], a: '(a), (c), (e)', why: '(b)(d) 앞의 명사를 가리키는 대명사' },
      { q: '다음 중 어법상 옳은 문장을 모두 고르시오.', box: [
        '(a) This is Monday today.', '(b) It is getting dark outside.', '(c) It rains a lot in summer.',
        '(d) That was windy yesterday.', '(e) It’s December 1st.'], a: '(b), (c), (e)', why: '(a)(d) 비인칭 주어 자리에 this · that ✗' },
      { q: '다음 일기의 밑줄 친 ⓐ~ⓔ 중 어법상 어색한 것을 모두 골라 기호를 쓰고 바르게 고치시오.', fix: true, label: '기호 / 고친 것', box: [
        'Dear diary, ⓐ __It was Saturday__ yesterday. ⓑ __This was very cold__, and ⓒ __it snowed__ in the morning. I walked to the park. ⓓ __That was 2 km__ from my house. ⓔ __It got dark__ early.'],
        a: 'ⓑ → It was very cold, ⓓ → It was 2 km', why: '날씨 · 거리 → 비인칭 주어 It' },
      { q: '질문과 대답이 바르게 짝지어진 것을 모두 고르시오.', box: [
        '(a) What’s the date today? – It’s May 5th.', '(b) What time is it? – It’s Friday.', '(c) How’s the weather? – It’s windy.',
        '(d) What day is it today? – It’s 2 km.', '(e) How far is it to the bank? – It’s sunny.'], a: '(a), (c)', why: '(b) 시간 → It’s 7:30 등 (d) 요일 → It’s Friday (e) 거리 → It’s 500 meters 등' }] },
    { level: 'Advanced · 객관식', type: 'mcq', free: true, instr: '알맞은 답을 고르시오.', items: [
      { q: '다음 대화의 빈칸에 알맞은 것은? — A: What day is it today? B: ______', opts: [
        'It’s 7 o’clock.', 'It’s Wednesday.', 'It’s April 6th.', 'It’s sunny.', 'It’s 3 km.'], a: '②', why: '요일 묻기 → 요일로 답' },
      { q: '다음 빈칸에 공통으로 들어갈 말은? — ______ is 5 kilometers to the airport. / ______ was getting dark.', opts: [
        'This', 'That', 'There', 'It', 'They'], a: '④', why: '거리 · 명암의 비인칭 주어' },
      { q: '다음 중 비인칭 주어 it이 쓰인 문장은?', opts: [
        'It is December 31st today.', 'I bought a watch, but it broke soon.', 'Look at this doll! It is very pretty.', 'She wrote a card and sent it to her friend.', 'This is my new watch. It’s very nice.'], a: '①', why: '① 날짜 · 나머지는 대명사 ([05] 기출)' },
      { q: '다음 우리말을 바르게 영작한 것은? — 밖이 어두워지고 있다.', opts: [
        'That is getting dark outside.', 'Dark is getting outside.', 'This is getting dark outside.', 'It is getting outside dark.', 'It is getting dark outside.'], a: '⑤', why: '명암 → It + get + 형용사' },
      { q: '다음 중 어법상 어색한 문장은?', opts: [
        'It’s spring now.', 'It was -10°C yesterday.', 'This is raining now.', 'It takes about one hour from Seoul to Busan.', 'It’s noisy in the classroom.'], a: '③', why: '③ 날씨 → It is raining' }] },
    { level: '전환 · 영작', type: 'write', instr: '우리말과 같은 뜻이 되도록 괄호 안의 말을 이용하여 영작하시오. (비인칭 주어 it 사용)', items: [
      { q: '날이 어두워지고 있었다. (get, dark · 과거진행형)', a: 'It was getting dark.', why: '본문' },
      { q: '비가 내리기 시작했다. (start, rain · to부정사)', a: 'It started to rain.', why: '본문' },
      { q: '지금은 12시다. (12 o’clock, now)', a: 'It’s 12 o’clock now.', why: '교과서' },
      { q: '오늘은 11월 5일이다. (November 5th, today)', a: 'It’s November 5th today.', why: '교과서' },
      { q: '학교까지는 2킬로미터이다. (two kilometers, to the school)', a: 'It’s two kilometers to the school.', why: '교과서' },
      { q: '어제는 화창했다. (sunny, yesterday)', a: 'It was sunny yesterday.', why: '교과서' },
      { q: '여름에는 비가 많이 온다. (rain, a lot, in summer)', a: 'It rains a lot in summer.', why: '워크북 — 3인칭 단수' },
      { q: '방 안이 어둡다. (dark, in the room)', a: 'It’s dark in the room.', why: '명암' },
      { q: '오늘은 금요일이다. (Friday, today)', a: 'It’s Friday today.', why: '요일' },
      { q: '지금 뉴질랜드는 여름이다. (summer, in New Zealand, now)', a: 'It’s summer in New Zealand now.', why: '계절 (워크북)' }] },
  ], m),

  // ---------------- Point 2 ----------------
  D.section('Point 2', '비인칭 주어 it vs 대명사 it — 쓰임 구별 · It takes + 시간', 'point'),
  ...D.table(['구분', '판단 기준 · 설명', '예'], [
    ['비인칭 주어 it', '날씨 · 시간 · 거리 등 — 뜻 없음, ‘그것’ ✗', '**It** was getting dark. (본문) / **It** takes about one hour from Seoul to Busan.'],
    ['대명사 it', '앞에 나온 단수 명사를 가리킴 — ‘그것’', 'She jumped on the smallest one again and again. **It** broke. (It = the smallest chair · 본문)'],
    ['구별법 ①', '‘그것’을 넣어 읽어 보기', '**It** is Friday. → ‘그것은 금요일이다’ 어색 → 비인칭 / Did you see **it**? → ‘그것을’ ○ → 대명사'],
    ['구별법 ②', '앞에 가리킬 단수 명사가 있는가?', 'Here’s the library. **It**’s open from 8 a.m. to 5 p.m. (= the library → 대명사)'],
    ['this · that ✗', '날씨 · 시간 · 거리의 주어 자리에는 this · that을 쓰지 않는다', '**That** was windy ✗ → It was windy / **This** is Sunday today ✗ → It is Sunday today'],
    ['It takes + 시간', '(시간이) 걸리다 — 비인칭 주어 · takes(3인칭 단수)', 'I ran my first marathon yesterday. **It took** five hours. (워크북)']], [2100, 3300, 4238], m),
  ...D.infoBox('구별 3단계', [
    '① 문장에서 It 찾기',
    '② 앞 문장에 가리킬 {{단수 명사}}가 있는지 보기',
    '③ 날씨 · 시간 · 거리 · 명암이면 {{비인칭}}, 앞 명사를 받으면 {{대명사}}'], m),
  ...D.trick('‘그것’ 넣어 읽기', ['It 자리에 ‘그것’을 넣어 소리 내어 읽는다', '말이 되면 앞 물건을 받는 대명사', '어색하면 날씨 · 시간을 말하는 비인칭 주어']),
  ...D.examPoint([
    { q: 'She jumped on the smallest one again and again. It broke. — It = {{the smallest chair}}', why: '본문 — 대명사(비인칭 ✗)' },
    { q: 'He bought a watch, but {{it}} broke soon. → 비인칭 주어 It과 쓰임이 다르다', why: '[05] 기출 — 대명사' }], m),
  ...D.caution(['[05] 본문 변형 ‘㉠It과 쓰임이 다른 것을 모두’ — 정답 2개(대명사 it) · 오답 선지는 날씨(it will be sunny) · 거리 · 날짜.',
    '본문 안에서도 It was getting dark(비인칭) ↔ It broke(대명사) — 두 문장이 한 지문에 있어 지칭 문항이 단골이다. “It’s so fun!”의 It은 의자 위에서 뛰는 일을 가리켜 판단이 갈리므로 문항으로 내지 않았다.',
    'It takes + 시간은 본문에는 없지만 워크북 Part 2에 나와 짧게 다룬다. it vs one(She ate the smallest one)은 본문 Grammar✚.'], m),
  ...D.drill(2, '비인칭 주어 it vs 대명사 it', [
    { level: 'Basic ①', type: 'choice', instr: '밑줄 친 It의 쓰임으로 알맞은 것을 고르시오.', items: [
      { q: '__It__’s too hot inside. Can you open the door? (비인칭 주어 / 대명사)', a: '비인칭 주어', why: '날씨 (워크북 Part 2)' },
      { q: 'Let’s get inside. __It__’s getting dark. (비인칭 주어 / 대명사)', a: '비인칭 주어', why: '명암' },
      { q: 'Where’s the bus stop? __It__’s in front of the bank. (비인칭 주어 / 대명사)', a: '대명사', why: 'It = the bus stop' },
      { q: 'Here’s the library. __It__’s open from 8 a.m. to 5 p.m. (비인칭 주어 / 대명사)', a: '대명사', why: 'It = the library' },
      { q: '__It__ takes about one hour from Seoul to Busan. (비인칭 주어 / 대명사)', a: '비인칭 주어', why: 'It takes + 시간' },
      { q: 'Today’s menu is bibimbap. __It__’s a popular Korean dish. (비인칭 주어 / 대명사)', a: '대명사', why: 'It = bibimbap' },
      { q: 'I have a puppy. __It__ is 3 months old. (비인칭 주어 / 대명사)', a: '대명사', why: 'It = a puppy' },
      { q: 'In Busan, __it__’s warm, but it’s rainy. (비인칭 주어 / 대명사)', a: '비인칭 주어', why: '날씨' },
      { q: 'Junha looks at the clock. __It__’s 7:30. (비인칭 주어 / 대명사)', a: '비인칭 주어', why: '시간' },
      { q: 'This is my new watch. __It__’s very nice. (비인칭 주어 / 대명사)', a: '대명사', why: 'It = my new watch' }] },
    { level: 'Basic ②', type: 'fill', instr: '빈칸에 알맞은 말을 쓰시오. (비인칭 주어 · 대명사 · one 중에서)', items: [
      { q: 'She jumped on the smallest one again and again. [[It]] broke, but she didn’t care.', why: '본문 — 대명사(= the smallest chair)' },
      { q: '[[It]] was getting dark, and it started to rain.', why: '본문 — 비인칭(명암)' },
      { q: 'There were three bowls of soup. She ate the smallest [[one]].', why: '본문 — 같은 종류 중 하나' },
      { q: 'I ran my first marathon yesterday. It [[took]] five hours.', why: 'It takes + 시간 (과거)' },
      { q: 'I like these books. [[They]] are interesting.', why: '복수 명사 → they' },
      { q: '[[It]] takes about one hour from Seoul to Busan.', why: '비인칭 — 시간' },
      { q: 'A: Is [[it]] far from here? B: No, it’s only 300 meters.', why: '거리 묻기' },
      { q: 'My phone is not working. I need to get a new [[one]].', why: '대화문 — a new phone' },
      { q: 'She took selfies and posted [[them]] on social media.', why: '복수 대명사(= selfies)' },
      { q: 'Look at this doll! [[It]] is very pretty.', why: '대명사(= this doll)' }] },
    { level: 'Intermediate', type: 'write', instr: '어법상 틀린 부분을 찾아 바르게 고쳐 쓰시오.', items: [
      { q: 'That was windy yesterday.', a: 'That → It', why: '날씨 — 비인칭 주어' },
      { q: 'This is Sunday today.', a: 'This → It', why: '요일 (워크북 Part 1)' },
      { q: 'That’s 2 kilometers to the zoo.', a: 'That’s → It’s', why: '거리' },
      { q: 'There were three bowls of soup. She ate the smallest it.', a: 'it → one', why: '본문 — 형용사 수식 + 같은 종류 중 하나' },
      { q: 'I like these books. It is interesting.', a: 'It is → They are', why: '복수 명사를 가리킴' },
      { q: 'It take about one hour from Seoul to Busan.', a: 'take → takes', why: 'It(3인칭 단수) + takes' },
      { q: 'Is this far from here?', a: 'this → it', why: '거리 묻기 (워크북 Part 1)' },
      { q: 'This was getting dark, and it started to rain.', a: 'This → It', why: '본문 — 명암' },
      { q: 'It is rain a lot in summer.', a: 'is rain → rains', why: '날씨 동사 rain(3인칭 단수)' },
      { q: 'I bought a new phone. One is very light.', a: 'One → It', why: '바로 그 휴대폰을 가리킴 → it' }] },
    { level: 'Advanced · 모두 고르기', type: 'multi', free: true, instr: '해당하는 것을 모두 골라 기호를 쓰시오.', items: [
      { q: '밑줄 친 it의 쓰임이 본문 It was getting dark의 It과 같은 것을 모두 고르시오.', box: [
        '(a) She wrote a card and sent __it__ to her friend.', '(b) I hope that __it__ will be sunny tomorrow.', '(c) He bought a watch, but __it__ broke soon.',
        '(d) __It__ is 5 kilometers to the airport.', '(e) __It__ is December 31st today.'], a: '(b), (d), (e)', why: '[05] 기출 — (a)(c) 대명사' },
      { q: '밑줄 친 말이 가리키는 것을 바르게 쓴 것을 모두 고르시오.', box: [
        '(a) She jumped on the smallest one. __It__ broke. → the smallest chair', '(b) __It__ was getting dark. → the forest',
        '(c) My phone is not working. I need to get a new __one__. → a phone', '(d) __It__ was Saturday yesterday. → yesterday',
        '(e) Look! Here are the new models. What do you think about this __one__? → a new model'], a: '(a), (c), (e)', why: '(b)(d) 비인칭 주어 — 가리키는 것 없음' },
      { q: '다음 글의 밑줄 친 ⓐ~ⓔ 중 어법상 어색한 것을 모두 골라 기호를 쓰고 바르게 고치시오.', fix: true, label: '기호 / 고친 것', box: [
        'I bought a new umbrella yesterday. ⓐ __It__ is yellow. ⓑ __That__ was rainy this morning, so I used ⓒ __it__. ⓓ __This__ was 3 km to school. When I got to school, ⓔ __it__ stopped raining.'],
        a: 'ⓑ → It, ⓓ → It', why: '날씨 · 거리 → 비인칭 주어 It (ⓐⓒ 대명사 = the umbrella · ⓔ 비인칭)' },
      { q: '다음 중 어법상 옳은 문장을 모두 고르시오.', box: [
        '(a) It takes two hours to get there.', '(b) This is very cold today.', '(c) It was -89.2°C in Vostok in 1983.',
        '(d) It snows a lot in winter.', '(e) That’s spring now.'], a: '(a), (c), (d)', why: '(b)(e) 비인칭 주어 자리에 this · that ✗ (워크북)' }] },
    { level: 'Advanced · 객관식', type: 'mcq', free: true, instr: '알맞은 답을 고르시오.', items: [
      { q: '다음 밑줄 친 It 중 쓰임이 나머지 넷과 다른 것은?', opts: [
        '__It__ is Monday today.', '__It__ was getting dark.', '__It__ is ten o’clock now.', '__It__ rains a lot in summer.', 'Look at this doll! __It__ is very pretty.'], a: '⑤', why: '⑤ 대명사(= this doll) · 나머지 비인칭' },
      { q: '다음 중 밑줄 친 It의 쓰임이 <보기>와 같은 것은? — <보기> She jumped on the smallest one. __It__ broke.', opts: [
        '__It__ is 2 km to the park.', '__It__ was windy.', 'Here’s the library. __It__’s open from 8 a.m.', '__It__ takes an hour.', '__It__ is getting dark.'], a: '③', why: '<보기>와 ③은 대명사 · 나머지 비인칭' },
      { q: '다음 빈칸에 들어갈 말이 나머지 넷과 다른 것은?', opts: [
        'I have three apples. I’ll eat the smallest ____.', '____ is Tuesday today.', '____ was sunny yesterday.', 'I like this apple. I’ll eat ____.', '____ takes about one hour from Seoul to Busan.'], a: '①', why: '① one · 나머지 it (교과서 Grammar✚ it vs one)' },
      { q: '다음 중 어법상 올바른 문장은?', opts: [
        'That was cloudy yesterday.', 'This is 3 km to the station.', 'It is rain now.', 'It took five hours.', 'This is getting dark.'], a: '④', why: '① ② ⑤ this · that ✗ ③ It is raining' },
      { q: '다음 중 It의 쓰임이 같은 것끼리 모두 짝지어진 것은?', box: [
        'ⓐ It was getting dark.', 'ⓑ It started to rain.', 'ⓒ It broke, but she didn’t care.', 'ⓓ I bought a phone. It is light.', 'ⓔ It was Sunday.'],
        opts: ['ⓐ, ⓒ', 'ⓐ, ⓑ, ⓔ', 'ⓑ, ⓓ', 'ⓒ, ⓔ', 'ⓐ, ⓓ, ⓔ'], a: '②', why: 'ⓐⓑⓔ 비인칭 / ⓒⓓ 대명사' }] },
    { level: '전환 · 영작', type: 'write', instr: '우리말과 같은 뜻이 되도록 괄호 안의 말을 이용하여 영작하시오.', items: [
      { q: '나는 어제 첫 마라톤을 뛰었다. 그것은 다섯 시간이 걸렸다. (take, five hours)', a: 'It took five hours.', why: '워크북 — It takes + 시간 (과거)' },
      { q: '그녀는 가장 작은 의자 위에서 뛰었다. 그것은 부서졌다. (break)', a: 'It broke.', why: '본문 — 대명사' },
      { q: '여기가 도서관이야. 그것은 오전 8시부터 오후 5시까지 열어. (open, from ~ to ~)', a: 'It’s open from 8 a.m. to 5 p.m.', why: '워크북 — 대명사' },
      { q: '집에서 학교까지 10분이 걸린다. (take, ten minutes, from home to school)', a: 'It takes ten minutes from home to school.', why: '비인칭 — 시간' },
      { q: '밖에 바람이 많이 분다. (very windy, outside)', a: 'It’s very windy outside.', why: '비인칭 — 날씨' },
      { q: '부산은 따뜻하지만, 비가 온다. (In Busan, warm, rainy)', a: 'In Busan, it’s warm, but it’s rainy.', why: '워크북 Part 3' },
      { q: '나는 강아지가 한 마리 있다. 그것은 3개월 되었다. (3 months old)', a: 'It is 3 months old.', why: '워크북 — 대명사' },
      { q: '지금 몇 시니? (what time, now)', a: 'What time is it now?', why: '교과서 Use It' },
      { q: '여기서 기차역까지 얼마나 머니? (how far, from here, the train station)', a: 'How far is it from here to the train station?', why: '거리 묻기' },
      { q: '오늘은 며칠이니? (date, today)', a: 'What’s the date today?', why: '교과서 Use It' }] },
  ], m),

  // ---------------- Point 3 ----------------
  D.section('Point 3', '(심화) 날씨 문장 3가지 틀 · get + 형용사 · start + to-v / -ing', 'point'),
  ...D.table(['구성', '판단 기준 · 설명', '예'], [
    ['It + be + 날씨 형용사', 'sunny · cloudy · rainy · snowy · windy · hot · cold', 'It was sunny yesterday. / It’s very windy.'],
    ['It + 날씨 동사', 'rain · snow — 주어 It(3인칭 단수) · 시제 맞추기', 'It **rains** a lot in summer. / It **snowed** for the first time this year. ([05])'],
    ['진행형 · 미래', '지금 오는 중 / 앞으로', 'It’s **raining**. / It **will be** rainy this afternoon. ([05])'],
    ['start + to-v / -ing', '날씨가 ~하기 시작하다 — 둘 다 ○', 'It started **to rain**. = It started **raining**. (본문 · [05])'],
    ['get + 형용사', '~해지다(변화) — 진행형이면 ‘~해지고 있다’', 'It **was getting dark**. (본문) / It’s getting cold. (darkly ✗)'],
    ['흔한 오답', 'It is rain ✗ · It rainy ✗ · It snows yesterday ✗', 'It is rain now ✗ → It is raining now / It rainy ✗ → It is rainy']], [2300, 3300, 4038], m),
  ...D.infoBox('날씨 문장 3가지 틀', [
    '① It is + {{형용사}}: It is rainy.',
    '② It + {{동사}}: It rains.',
    '③ It is + {{-ing}}: It is raining.'], m),
  ...D.trick('사흘 날씨 일기', ['월요일 — 비 오는 날이었다: It was rainy.(형용사)', '화요일 — 하늘에서 비가 내렸다: It rained.(동사)', '수요일 — 지금 창밖에 비가 내리는 중: It is raining.(진행형)']),
  ...D.examPoint([
    { q: 'It was getting dark, and it started {{raining}}. (= to rain)', why: '본문 · [05] — start + -ing / to-v' },
    { q: 'It {{snowed}} for the first time this year.', why: '[05] 그림 문제 — 과거' }], m),
  ...D.caution(['It is rain ✗(be동사 + 동사원형) · It rainy ✗(동사 없음) — 날씨 문장 오답 선지 단골이다.',
    '[05] 그림 서술형: It was Saturday, December 6 yesterday, and it snowed — 요일 · 날짜 · 날씨 + 과거시제를 한 번에 쓴다.',
    'get + 형용사는 본문 got bored(사람의 감정)와 was getting dark(명암)에 모두 쓰였다 — 감정 형용사 -ed/-ing와 함께 지도한다.'], m),
  ...D.drill(3, '날씨 문장 · get + 형용사', [
    { level: 'Basic ①', type: 'choice', instr: '괄호 안에서 알맞은 것을 고르시오.', items: [
      { q: 'It (rains / rainy) a lot in summer.', a: 'rains', why: 'It + 날씨 동사(3인칭 단수)' },
      { q: 'It (snows / snowed) for the first time last year.', a: 'snowed', why: 'last year → 과거' },
      { q: 'It is (rain / raining) now.', a: 'raining', why: '진행형' },
      { q: 'It was (sunny / sun) yesterday.', a: 'sunny', why: 'be + 형용사' },
      { q: 'It was getting (darkly / dark).', a: 'dark', why: '본문 — get + 형용사' },
      { q: 'It started (rain / to rain).', a: 'to rain', why: '본문 — start + to부정사' },
      { q: 'It (will be / is) rainy tomorrow.', a: 'will be', why: 'tomorrow → 미래' },
      { q: 'It (is / does) very windy today.', a: 'is', why: 'be + 형용사' },
      { q: 'It started (rained / raining) in the afternoon.', a: 'raining', why: 'start + 동명사' },
      { q: 'It’s getting (cold / coldly) outside.', a: 'cold', why: 'get + 형용사' }] },
    { level: 'Basic ②', type: 'fill', instr: '<보기>에서 알맞은 말을 골라 빈칸에 쓰시오. (한 번씩만 사용)',
      bogi: ['hot', 'raining', 'got', 'to rain', 'windy', 'cloudy', 'snowed', 'will be', 'dark', 'rains'], items: [
      { q: 'It [[rains]] a lot in summer.', why: '워크북' },
      { q: 'It [[snowed]] for the first time this year.', why: '[05] 기출' },
      { q: 'Take your umbrella. It’s [[raining]] now.', why: '진행형' },
      { q: 'It’s very [[windy]]. Hold your hat!', why: '날씨 형용사' },
      { q: 'It was getting [[dark]], and it started to rain.', why: '본문' },
      { q: 'It started [[to rain]]. (= It started raining.)', why: '본문' },
      { q: 'It [[will be]] rainy this afternoon.', why: '[05] 기출' },
      { q: 'It [[got]] cold at night.', why: 'get + 형용사 (과거)' },
      { q: 'It was [[cloudy]] yesterday, so we couldn’t see the stars.', why: '날씨 형용사' },
      { q: 'It’s too [[hot]] here. I can’t stand the summer heat.', why: '워크북 Part 2' }] },
    { level: 'Intermediate', type: 'write', instr: '어법상 틀린 부분을 찾아 바르게 고쳐 쓰시오.', items: [
      { q: 'It is rain now.', a: 'is rain → is raining', why: '진행형' },
      { q: 'It rainy today.', a: 'It rainy → It is rainy', why: '동사 없음' },
      { q: 'It snows yesterday.', a: 'snows → snowed', why: '과거' },
      { q: 'It was getting darkly.', a: 'darkly → dark', why: 'get + 형용사' },
      { q: 'It started rain.', a: 'rain → to rain (또는 raining)', why: 'start + to-v / -ing' },
      { q: 'It will is cold tomorrow.', a: 'will is → will be', why: '조동사 + 동사원형' },
      { q: 'It rain a lot in summer.', a: 'rain → rains', why: '3인칭 단수 현재' },
      { q: 'This was getting dark.', a: 'This → It', why: '본문 — 명암' },
      { q: 'It is sunny yesterday.', a: 'is → was', why: 'yesterday → 과거' },
      { q: 'It’s getting coldly.', a: 'coldly → cold', why: 'get + 형용사' }] },
    { level: 'Advanced · 모두 고르기', type: 'multi', free: true, instr: '해당하는 것을 모두 골라 기호를 쓰시오.', items: [
      { q: '다음 중 어법상 옳은 문장을 모두 고르시오.', box: [
        '(a) It rainy today.', '(b) It is raining now.', '(c) It snows yesterday.', '(d) It started raining.', '(e) It will be rainy this afternoon.'], a: '(b), (d), (e)', why: '(a) It is rainy (c) snowed' },
      { q: '두 문장의 뜻이 같은 것을 모두 고르시오.', box: [
        '(a) It started to rain. = It started raining.', '(b) It is 2 km to the park. = The park is 2 km away.', '(c) It is Monday today. = Today is Monday.',
        '(d) It was sunny. = It was rainy.', '(e) It got dark. = It got bright.'], a: '(a), (b), (c)', why: '(d)(e) 반대 뜻' },
      { q: '다음 글의 밑줄 친 ⓐ~ⓔ 중 어법상 어색한 것을 모두 골라 기호를 쓰고 바르게 고치시오.', fix: true, label: '기호 / 고친 것', box: [
        'ⓐ __It was Saturday__, December 6 yesterday, and ⓑ __it snows__ for the first time this year. ⓒ __It was very cold__, so I wore a coat. In the afternoon, ⓓ __it started snow__ again. ⓔ __It got dark__ early.'],
        a: 'ⓑ → it snowed, ⓓ → it started to snow (또는 snowing)', why: '[05] 기출 변형 — 과거시제 · start + to-v / -ing' },
      { q: '다음 중 비인칭 주어 it이 쓰인 문장을 모두 고르시오.', box: [
        '(a) It was a nice phone.', '(b) It got dark early.', '(c) It broke, but she didn’t care.', '(d) It rains a lot here.', '(e) It is my new watch.'], a: '(b), (d)', why: '(a)(c)(e) 앞의 물건을 가리키는 대명사' }] },
    { level: 'Advanced · 객관식', type: 'mcq', free: true, instr: '알맞은 답을 고르시오.', items: [
      { q: '다음 빈칸에 들어갈 말로 알맞은 것은? — It ______ a lot in summer.', opts: [
        'rain', 'is rain', 'rains', 'rainy', 'raining'], a: '③', why: 'It + rains(3인칭 단수 현재)' },
      { q: '다음 우리말을 바르게 영작한 것은? — 비가 내리기 시작했다.', opts: [
        'It started rain.', 'It is started to rain.', 'It started rainy.', 'Rain started it.', 'It started to rain.'], a: '⑤', why: '본문 — start + to부정사' },
      { q: '다음 중 어법상 어색한 문장은?', opts: [
        'It’s getting cold.', 'It is rain now.', 'It snowed last night.', 'It will be windy tomorrow.', 'It was hot and sunny.'], a: '②', why: '② It is raining now' },
      { q: '(A)~(C)에 알맞은 말이 바르게 짝지어진 것은? — It was getting (A)(dark / darkly). It started (B)(to rain / rain). Tomorrow, it (C)(will be / is) sunny.', opts: [
        'dark – to rain – will be', 'darkly – to rain – will be', 'dark – rain – is', 'darkly – rain – will be', 'dark – to rain – is'], a: '①', why: 'get + 형용사 · start + to-v · 미래' },
      { q: '어제 날씨 정보(토요일 · 12월 6일 · 첫눈)를 바르게 표현한 문장은?', opts: [
        'This was Saturday, and it snows.', 'It is Saturday, and it snowed.', 'It was Saturday, and that snowed.', 'It was Saturday, and it snowed.', 'It was Saturday, and it snowy.'], a: '④', why: '[05] 기출 — 과거시제 · 비인칭 주어 It' }] },
    { level: '전환 · 영작', type: 'write', instr: '괄호 안의 지시대로 쓰시오.', items: [
      { q: '날이 어두워지고 있었고, 비가 내리기 시작했다. (get, dark, start, rain)', a: 'It was getting dark, and it started to rain.', why: '본문' },
      { q: 'It started to rain. (동명사를 써서 같은 뜻으로)', a: 'It started raining.', why: '[05] 기출' },
      { q: '여름에는 비가 많이 온다. (rain, a lot, in summer)', a: 'It rains a lot in summer.', why: '날씨 동사' },
      { q: '올해 처음으로 눈이 왔다. (snow, for the first time this year)', a: 'It snowed for the first time this year.', why: '[05] 기출' },
      { q: '지금 비가 오고 있다. (rain, now)', a: 'It is raining now.', why: '진행형' },
      { q: '오늘 오후에는 비가 올 것이다. (rainy, this afternoon)', a: 'It will be rainy this afternoon.', why: '[05] 기출' },
      { q: '밖이 추워지고 있다. (get, cold, outside)', a: 'It is getting cold outside.', why: 'get + 형용사' },
      { q: '어제는 바람이 많이 불었다. (very windy, yesterday)', a: 'It was very windy yesterday.', why: '과거' },
      { q: '내가 일어났을 때 이미 밝았다. (already, light, when, wake up)', a: 'It was already light when I woke up.', why: '[05] 기출' },
      { q: 'It is snowy today. (진행형으로)', a: 'It is snowing today.', why: 'be + -ing' }] },
  ], m),

  // ---------------- PERFECT CHECK ----------------
  D.section('PERFECT CHECK', '상위권 함정 체크'),
  ...D.drill(null, '', [{ level: '함정', type: 'choice', instr: '실수하기 쉬운 문장들이에요. 괄호 안에서 알맞은 것을 고르시오.', items: [
    { q: '(This / It) was getting dark.', a: 'It', why: '본문 — 명암' },
    { q: 'She jumped on the smallest one again and again. (It / One) broke.', a: 'It', why: '본문 — 바로 그 의자(대명사)' },
    { q: '(It / That) is 5 kilometers to the airport.', a: 'It', why: '[05] — 거리' },
    { q: 'There were three bowls of soup. She ate the smallest (it / one).', a: 'one', why: '본문 — 같은 종류 중 하나' },
    { q: 'It is (rain / raining) now.', a: 'raining', why: '진행형' },
    { q: 'It (snowed / snows) for the first time last year.', a: 'snowed', why: '과거' },
    { q: 'It started (raining / rain).', a: 'raining', why: '[05] — start + -ing' },
    { q: 'It (take / takes) about one hour from Seoul to Busan.', a: 'takes', why: 'It takes + 시간' },
    { q: 'At first, people didn’t give (many likes her / her many likes).', a: 'her many likes', why: '본문 — 수여동사(같은 과 문법)' },
    { q: 'I liked the hat, and she bought (it for me / me it).', a: 'it for me', why: '[05] — 수여동사(같은 과 문법)' }] }], m),

  // ---------------- WRITE ----------------
  D.section('WRITE', '서술형 대비'),
  ...D.writeItem(1, 'Basic', '빈칸 (A), (B)에 알맞은 말을 쓰시오.', ['(A)______ was getting dark, and (B)______ started to rain. (본문)'], { a: '(A) It  (B) it', why: '명암 · 날씨의 비인칭 주어', blanks: ['(A)', '(B)'] }, m),
  ...D.writeItem(2, 'Basic', '괄호 안의 말을 이용하여 대답을 완성하시오.', ['A: What day is it today?   B: ______________. (Monday)'], { a: 'It’s Monday.', why: '요일 — 비인칭 주어' }, m),
  ...D.writeItem(3, 'Intermediate', '동명사를 사용하여 같은 뜻의 문장으로 바꾸어 쓰시오. [문장 전환]', ['It started to rain. (본문)'], { a: 'It started raining.', why: 'start + to-v = start + -ing' }, m),
  ...D.writeItem(4, 'Intermediate', 'Today로 시작하여 같은 뜻의 문장으로 바꾸어 쓰시오. [문장 전환]', ['It is Monday today.'], { a: 'Today is Monday.', why: '비인칭 주어 문장 ↔ Today 주어 문장' }, m),
  ...D.writeItem(5, 'Intermediate', 'It으로 시작하여 같은 뜻의 문장으로 바꾸어 쓰시오. [문장 전환]', ['The park is 2 kilometers away.'], { a: 'It is 2 kilometers to the park.', why: '거리 — It is + 거리 + to + 장소' }, m),
  ...D.writeItem(6, 'Intermediate', '밑줄 친 ⓐ, ⓑ가 가리키는 것을 쓰고, 가리키는 것이 없으면 ‘비인칭’이라고 쓰시오.', ['She jumped on the smallest one again and again. ⓐ __It__ broke, but she didn’t care. … ⓑ __It__ was getting dark. (본문)'],
    { a: 'ⓐ the smallest chair (the smallest one)  ⓑ 비인칭 (가리키는 것 없음)', why: '대명사 vs 비인칭 주어', blanks: ['ⓐ', 'ⓑ'] }, m),
  ...D.writeItem(7, 'Advanced', '그림 정보를 보고 <조건>에 맞게 영작하시오.', ['어제: 토요일 · 12월 6일 / 올해 첫눈', '<조건> 비인칭 주어 it을 두 번 쓸 것 · 과거시제 · and로 연결할 것'],
    { a: 'It was Saturday, December 6 yesterday, and it snowed for the first time this year.', why: '[05] 기출 — 요일 · 날짜 · 날씨' }, m),
  ...D.writeItem(8, 'Advanced', '우리말과 같은 뜻이 되도록 <조건>에 맞게 영작하시오.', ['날이 어두워지고 있었고, 비가 내리기 시작했다.', '<조건> 비인칭 주어를 쓸 것 · get, dark, start, rain을 활용할 것 · 과거진행형을 한 번 쓸 것 · 총 9단어'],
    { a: 'It was getting dark, and it started to rain.', why: '본문 — It/was/getting/dark/and/it/started/to/rain = 9단어' }, m),
  ...D.writeItem(9, 'Advanced', '어법상 틀린 부분 2개를 찾아 바르게 고치고, 그 이유를 쓰시오.', ['This was getting dark, and it started rain.'],
    { a: '① This → It  ② rain → to rain (또는 raining)', why: '① 명암은 비인칭 주어 It(this ✗) ② start 뒤에는 to부정사나 동명사', blanks: ['고친 것', '이유'] }, m),
  ...D.writeItem(10, 'Advanced', '어법상 틀린 부분 2개를 찾아 바르게 고치고, 그 이유를 쓰시오.', ['I bought a watch, but one broke soon. It snows a lot yesterday.'],
    { a: '① one → it  ② snows → snowed', why: '① 바로 그 시계를 가리키므로 대명사 it(one ✗) ② yesterday → 과거시제', blanks: ['고친 것', '이유'] }, m),

  // ---------------- MAP ----------------
  D.pageBreak(), // MAP 이미지가 쪽 끝에서 잘리지 않도록 새 쪽에서 시작
  D.section('MAP', "DAVID'S MAP — 백지노트 테스트"),
  D.P([D.T('오늘 배운 내용을 떠올리며 빈칸을 채워 보세요. 책을 보지 않고!', { size: 18, color: '595959' })], { spacing: { after: 120 }, keepNext: true }),
  ...D.image(path.join(__dirname, 'map_G-비인칭it_중1.png'), 620),
  ...D.table(['자가 체크 — 백지노트에 이 단어들이 들어갔나요?', '✔'], [
    ['비인칭 주어 it = 형식상 주어 · ‘그것’으로 해석 ✗', ''], ['시간 · 날짜 · 요일 · 날씨 · 계절 · 거리 · 명암', ''],
    ['질문과 대답: What time is it? → It’s ~ / How far is it ~? → It’s ~ km', ''], ['this · that은 비인칭 주어 자리에 ✗', ''],
    ['대명사 it = 앞의 단수 명사 — It broke.(= the smallest chair)', ''], ['구별: ‘그것’을 넣어 말이 되면 대명사', ''],
    ['It takes + 시간 = (시간이) 걸리다', ''], ['날씨 3가지 틀: It is rainy / It rains / It is raining (It is rain ✗)', ''],
    ['get + 형용사 = ~해지다: It was getting dark. · start + to-v = start + -ing', ''],
    ['본문: It was getting dark, and it started to rain.', '']], [8838, 800], m),
  ...D.memo(['다음 시간 도입: 오늘 날짜 · 요일 · 날씨 · 지금 시각을 학생이 It으로 차례로 말하게 하고, 본문 It broke.와 비교해 ‘가리키는 것이 있나?’를 다시 묻기',
    '약한 반: Point 1(시날요계거명 + this · that ✗) 확실히 → Point 2는 It broke ↔ It was getting dark 구별 하나만 → Point 3은 It is raining / It rains 두 가지만',
    '수여동사(같은 과 문법)와 섞인 [05] ‘어법상 어색한 문장의 개수’ · ‘㉠It과 쓰임이 다른 것 모두’ 다시 풀기',
    '교과서 Use It: HARi와의 대화(날짜 · 요일 · 시간 · 날씨)를 짝과 역할을 바꿔 묻고 답하기'], m),
];
D.render(meta, build, process.argv[2] || '.').then(fs_ => {
  const out = fs_.map(f => { const g = path.join(path.dirname(f), path.basename(f).replace(TITLE, '비인칭it')); fs.renameSync(f, g); return g; });
  console.log(out.join('\n'));
});
