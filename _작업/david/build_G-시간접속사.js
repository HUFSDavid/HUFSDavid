const D = require('./david_base');
const path = require('path');
const COVER = JSON.parse(process.env.COVER || '{}');
const meta = { series: D.SERIES.G, code: 'G-시간접속사', title: '시간 접속사', category: 'G. 접속사  |  시간 접속사',
  rightText: 'G  시간 접속사', prefix: process.env.PREFIX || '', cover: COVER.title ? COVER : undefined,
  question: 'Humpback whales stand on their tails ~~while~~ they sleep. / We will wait until Peter ~~comes~~. — 왜 during이 아니라 while이고, 미래인데 왜 will come이 아니라 comes일까?' };

const build = (m) => [
  D.section('FLOW', 'Teaching Flow — 처음 배우는 사람도 따라오는 5단계'),
  ...D.step(1, '우리말로 먼저 생각하기 — ‘언제?’를 붙이는 말', [
    '‘잠을 자는 동안’ ‘조개가 나타날 때까지’ ‘영화를 본 후에’ — 우리말은 동사 끝(~동안, ~까지, ~후에)에 붙이지만, 영어는 문장 앞에 {{접속사}} 하나를 붙인다.'], m),
  ...D.step(2, '이전 단원 복습 — 접속사 뒤에는?', [
    'because, if, that 뒤에는 {{주어}} + {{동사}}가 온다 → 완전한 절', '시간 접속사도 똑같다: while **they sleep** / until **a clam appears**'], m),
  ...D.step(3, '문제 제기 — 비슷한 뜻, 다른 짝', [
    'Humpback whales stand on their tails (while / during) they sleep. — 둘 다 ‘~ 동안’인데 무엇을 쓸까?',
    'She will wait here until the contest (is / will be) over. — 미래의 일인데 will을 쓸까?'], m),
  ...D.step(4, '규칙 발견 — 뒤를 보고, 절의 종류를 본다', [
    'while 뒤 = {{주어 + 동사}} / during 뒤 = {{명사(구)}}',
    '시간을 나타내는 부사절에서는 미래의 일도 {{현재시제}}로 쓴다 → until the contest **is** over'], m),
  ...D.step(5, '결론 🔑', [
    '시간 접속사(when · while · before · after · until · since · as soon as) + {{주어 + 동사}} / 시간 부사절 속 미래 = {{현재시제}} / 명사 앞이면 {{전치사}}(during · for)'], m),
  ...D.infoBox('오늘의 핵심 3문장', [
    '① Humpback whales stand on their tails {{while}} they sleep. (본문) — ~하는 동안',
    '② The tuskfish blows on the sand {{until}} a clam appears. (본문) — ~할 때까지',
    '③ We will wait until Peter {{comes}}. (교과서) — 미래지만 현재시제'], m),
  ...D.tip(['본문 두 문장(while they sleep / until a clam appears)을 먼저 해석시키고, 접속사 뒤에 주어·동사가 있는지 표시하게 한다.',
    '같은 과 문법 whose와 함께 출제되므로 마지막 PERFECT CHECK에 whose 1문항을 섞어 두었다. 접속사 as(시간)는 별도 ‘접속사 as’ 자료와 연결한다.'], m),

  // ---------------- Point 1 ----------------
  D.section('Point 1', '시간 접속사의 종류와 뜻 · 부사절의 위치', 'point'),
  ...D.table(['접속사', '뜻', '예'], [
    ['when', '~할 때', '**When** they wake up, they come out of the water for a deep breath. (본문)'],
    ['while', '~하는 동안 · ~하면서', 'Humpback whales stand on their tails **while** they sleep. (본문)'],
    ['before', '~하기 전에', 'You should finish your homework **before** you go out.'],
    ['after', '~한 후에', 'We had dinner **after** we watched a movie. (교과서)'],
    ['until', '~할 때까지 (계속)', 'The tuskfish blows on the sand **until** a clam appears. (본문)'],
    ['since', '~한 이래로 (주절은 보통 현재완료)', '**Since** he left, the town has changed a lot.'],
    ['as soon as', '~하자마자', '**As soon as** Tom saw me, he ran away. (교과서)'],
    ['as', '~할 때 · ~하면서 → ‘접속사 as’ 자료 참고', 'He called me **as** I was writing a report.']], [1700, 3000, 4938], m),
  ...D.infoBox('부사절의 위치 · 콤마 체크', [
    '시간 부사절은 주절의 앞·뒤 어디에나 올 수 있다. **앞에 오면 절 끝에 콤마(,)**',
    'Let’s meet at the bus stop after school is over. = **After school is over,** let’s meet at the bus stop.',
    '접속사 뒤에는 반드시 주어 + 동사: after **I eat** dinner (after eat ✗)'], m),
  ...D.trick('접속사 뒤엔 주동!', ['“시간 접속사 뒤엔 무조건 주어+동사 — 접주동!”', '“until = 그때까지 쭉~ / as soon as = 땡! 하자마자”']),
  ...D.examPoint([
    { q: 'The tuskfish blows on the sand {{until}} a clam appears. (본문) — ‘조개가 나타날 때까지’', why: 'until = ~할 때까지 (계속)' },
    { q: 'You should finish your homework __before you go out__. — 밑줄 친 부분은 {{시간의 부사절(종속절)}}', why: '접속사가 이끄는 절 — 주절이 아니다 (기출)' }], m),
  ...D.caution(['밑줄 친 부사절을 ‘주절’이라고 설명한 선지가 기출에 그대로 나왔다(설명 고르기형).', '문맥상 어색한 접속사 찾기 — didn’t stop ~ as soon as(✗) → until, Before they finished cleaning(✗) → After 같은 글 속 ⓐ~ⓔ형.', 'since 뒤 과거 + 주절 현재완료 짝, 접속사 뒤 동사 빠뜨림(after eat)이 단골 오답이다.'], m),
  ...D.drill(1, '시간 접속사의 종류와 뜻', [
    { level: 'Basic ①', type: 'choice', instr: '문맥상 괄호 안에서 알맞은 것을 고르시오.', items: [
      { q: 'Humpback whales stand on their tails (while / until) they sleep.', a: 'while', why: '자는 동안 (본문)' },
      { q: 'The tuskfish blows on the sand (until / before) a clam appears.', a: 'until', why: '나타날 때까지 (본문)' },
      { q: 'Wash your hands (after / before) you eat something.', a: 'before', why: '먹기 전에' },
      { q: '(Before / When) they wake up, they come out of the water for a deep breath.', a: 'When', why: '깨어날 때 (본문)' },
      { q: 'We had dinner (after / until) we watched a movie.', a: 'after', why: '본 후에 (교과서)' },
      { q: 'Somebody called me (since / while) I was taking a shower.', a: 'while', why: '샤워하는 동안' },
      { q: 'He ran away (as soon as / until) he saw me.', a: 'as soon as', why: '보자마자' },
      { q: 'I have lived here (since / before) I was ten.', a: 'since', why: '현재완료 — ~ 이래로' },
      { q: 'Let’s wait here (after / until) the rain stops.', a: 'until', why: '그칠 때까지' },
      { q: 'Birds have to be careful (when / before) a giant trevally is around.', a: 'when', why: '주변에 있을 때 (본문)' }] },
    { level: 'Basic ②', type: 'fill', instr: '<보기>에서 알맞은 말을 골라 빈칸에 쓰시오. (한 번씩만 사용)',
      bogi: ['while', 'until', 'When', 'after', 'before', 'since', 'As soon as', 'appears', 'was', 'has changed'], items: [
      { q: 'Humpback whales stand on their tails [[while]] they sleep.', why: '본문 — ~하는 동안' },
      { q: 'The tuskfish blows on the sand until a clam [[appears]].', why: '본문 — 3인칭 단수 현재' },
      { q: '[[When]] the bird flies nearby, the giant trevally jumps out of the water.', why: '본문 — ~할 때' },
      { q: 'Minho and Yuri played soccer [[after]] they finished their homework.', why: '교과서 — 숙제를 끝낸 후' },
      { q: 'It’s cold outside. You should finish your homework [[before]] you go out.', why: '나가기 전에' },
      { q: 'We are old friends. I have known her [[since]] she was a child.', why: '현재완료 + since' },
      { q: '[[As soon as]] Tom saw me, he ran away.', why: '교과서 — 보자마자' },
      { q: 'Tom waited in front of the door [[until]] someone came out.', why: '교과서 — 나올 때까지' },
      { q: 'Mr. Cho met many foreigners while he [[was]] abroad.', why: '교과서 — 과거' },
      { q: 'Since he left, the town [[has changed]] a lot.', why: 'since절 + 주절 현재완료' }] },
    { level: 'Intermediate', type: 'write', instr: '어법상 틀린 부분을 찾아 바르게 고쳐 쓰시오.', items: [
      { q: 'I always do my homework after eat dinner.', a: 'after eat → after I eat', why: '접속사 뒤 주어+동사' },
      { q: 'As soon as the game starting, it began to rain.', a: 'starting → started', why: '접속사 뒤 동사 · 과거' },
      { q: 'She reads a book while she was waiting for the bus.', a: 'reads → read', why: '시제 일치(과거)' },
      { q: 'After he met you, he becomes a different person.', a: 'becomes → became', why: '시제 일치(과거)' },
      { q: 'Since I moved here, I made many friends.', a: 'made → have made', why: 'since절 → 주절 현재완료' },
      { q: 'The tuskfish blows on the sand until a clam appear.', a: 'appear → appears', why: '주어 a clam 단수' },
      { q: 'When they wakes up, they come out of the water.', a: 'wakes → wake', why: '주어 they 복수' },
      { q: 'While I walking down the street, I ran into my friend.', a: 'walking → was walking', why: '접속사 뒤 주어+동사' },
      { q: 'He has lived in Seoul since he is a child.', a: 'is → was', why: 'since 뒤 과거 시점' },
      { q: 'Before go out, put on your coat.', a: 'Before go → Before you go', why: '접속사 뒤 주어+동사 (Before going도 가능)' }] },
    { level: 'Advanced · 모두 고르기', type: 'multi', free: true, instr: '해당하는 것을 모두 골라 기호를 쓰시오.', items: [
      { q: '다음 중 어법상 옳은 문장을 모두 고르시오.', box: [
        '(a) Humpback whales stand on their tails while they sleep.', '(b) I have lived here since I am ten.', '(c) As soon as she heard the news, she cry.',
        '(d) We had dinner after we watched a movie.', '(e) Tom waited in front of the door until someone came out.'], a: '(a), (d), (e)', why: '(b) was (c) cried' },
      { q: '다음 중 밑줄 친 부분에 대한 설명으로 옳은 것을 모두 고르시오.', box: [
        '(a) Humpback whales stand on their tails __while__ they sleep. → ‘~하는 동안’의 뜻이다.',
        '(b) The tuskfish blows on the sand __until__ a clam appears. → ‘조개가 나타나기 전에’로 해석한다.',
        '(c) __When the bird flies nearby__, the giant trevally jumps out of the water. → 부사절이 주절 앞에 와서 콤마를 썼다.',
        '(d) You should finish your homework __before you go out__. → 이 문장의 주절이다.',
        '(e) I have known her __since__ she was a child. → ‘~ 때문에’의 뜻이다.'], a: '(a), (c)', why: '(b) 나타날 때까지 (d) 부사절(종속절) (e) ~ 이래로' },
      { q: '다음 글의 밑줄 친 ⓐ~ⓔ 중 문맥상 어색한 것을 모두 골라 기호를 쓰고 바르게 고치시오.', fix: true, label: '기호 / 고친 것', box: [
        'Jiho’s family cleaned the house. Jiho cleaned the window ⓐ __while__ his dad vacuumed the living room. His sister mopped the floor ⓑ __until__ it looked very shiny. ⓒ __Before__ they finished cleaning, his mom put flowers on the table. Jiho had to finish his homework ⓓ __before__ he went to bed. His sister didn’t stop practicing the violin ⓔ __as soon as__ she could play it very well.'],
        a: 'ⓒ Before → After, ⓔ as soon as → until', why: 'ⓒ 청소를 끝낸 후 꽃을 놓음 ⓔ 잘할 수 있을 때까지 멈추지 않음 (기출 변형)' },
      { q: '빈칸에 while이 들어갈 수 있는 것을 모두 고르시오.', box: [
        '(a) I fell asleep ______ I was watching the movie.', '(b) Let’s wait here ______ the rain stops.', '(c) Don’t disturb him ______ he is studying.',
        '(d) I have lived in Ulsan ______ I was born.', '(e) Mr. Cho met many foreigners ______ he was abroad.'], a: '(a), (c), (e)', why: '(b) until (d) since' },
      { q: '우리말과 영어가 바르게 짝지어진 것을 모두 고르시오.', box: [
        '(a) 그가 떠난 이후로 → since he left', '(b) 비가 그칠 때까지 → before the rain stops', '(c) 그녀를 보자마자 → as soon as I saw her',
        '(d) 그들이 잠을 자는 동안 → while they sleep', '(e) 저녁을 먹은 후에 → after eat dinner'], a: '(a), (c), (d)', why: '(b) until (e) after I eat(ate) dinner' }] },
    { level: 'Advanced · 객관식', type: 'mcq', free: true, instr: '알맞은 답을 고르시오.', items: [
      { q: '우리말과 같은 뜻이 되도록 빈칸에 들어갈 말로 알맞은 것은? — 혹등고래는 잠을 자는 동안 꼬리로 서 있는다. → Humpback whales stand on their tails ______ they sleep.', opts: ['during', 'for', 'until', 'while', 'after'], a: '④', why: '뒤에 주어+동사 → 접속사 while (during ✗)' },
      { q: '다음 밑줄 친 부분에 대한 설명으로 알맞지 않은 것은? — You should finish your homework __before you go out__.', opts: [
        '접속사가 이끄는 절이다.', '이 문장의 주절이다.', '시간의 부사절이라고도 부른다.', '‘네가 나가기 전에’라고 해석된다.',
        'Before you go out, you should finish your homework.로 바꿔 쓸 수 있다.'], a: '②', why: '종속절(부사절) — 주절은 You should finish your homework (기출)' },
      { q: '다음 중 문맥상 밑줄 친 접속사의 쓰임이 어색한 것은?', opts: [
        'Let’s wait here __until__ the rain stops.', 'I have known him __since__ he was five.', '__As soon as__ Tom saw me, he ran away.',
        'Wash your hands __before__ you eat.', 'She didn’t stop practicing __as soon as__ she could play the song well.'], a: '⑤', why: '⑤ 잘할 수 있을 때까지 → until (기출)' },
      { q: '(A)~(C)에 알맞은 말이 바르게 짝지어진 것은? — (A) The tuskfish blows on the sand (until / while) a clam appears. (B) (When / Before) they wake up, they come out of the water for a deep breath. (C) 우리는 영화를 본 후에 저녁을 먹었다. → We had dinner (before / after) we watched a movie.', opts: [
        'until – When – after', 'while – When – after', 'until – Before – before', 'while – Before – after', 'until – When – before'], a: '①', why: '나타날 때까지 / 깨어날 때 / 본 후에' },
      { q: '다음 우리말을 영어로 바르게 옮긴 것은? — ‘그는 그 소식을 듣자마자 나의 집으로 달려왔다.’', opts: [
        'As soon as he heard the news, he rushes to my house.', 'Soon as he heard the news, he rushed to my house.', 'As soon as he heard the news, he rushed to my house.',
        'As soon as hearing the news, he rushed to my house.', 'As soon as he heard the news, he was rush to my house.'], a: '③', why: '① rushed ② As soon as ④ he heard ⑤ rushed' }] },
    { level: '전환 · 연결', type: 'write', instr: '괄호 안의 접속사를 사용하여 두 문장을 한 문장으로 연결하시오.', items: [
      { q: 'Humpback whales stand on their tails. They sleep. (while)', a: 'Humpback whales stand on their tails while they sleep.', why: '본문 문장' },
      { q: 'The tuskfish blows on the sand. A clam appears. (until)', a: 'The tuskfish blows on the sand until a clam appears.', why: '본문 문장' },
      { q: 'We watched a movie. Then we had dinner. (after)', a: 'We had dinner after we watched a movie. (= After we watched a movie, we had dinner.)', why: '교과서 문장' },
      { q: 'Tom waited in front of the door. Someone came out. (until)', a: 'Tom waited in front of the door until someone came out.', why: '교과서 문장' },
      { q: 'Mr. Cho was abroad. He met many foreigners. (while)', a: 'Mr. Cho met many foreigners while he was abroad. (= While he was abroad, Mr. Cho met …)', why: '교과서 문장' },
      { q: 'Charlie saw her message. He called her back. (as soon as)', a: 'As soon as Charlie saw her message, he called her back.', why: '~하자마자' },
      { q: 'The bird flies nearby. The giant trevally jumps out of the water. (when)', a: 'When the bird flies nearby, the giant trevally jumps out of the water.', why: '본문 문장 — 앞에 오면 콤마' },
      { q: 'He left the town. The town has changed a lot since then. (since)', a: 'Since he left, the town has changed a lot.', why: 'since + 과거 / 주절 현재완료' },
      { q: 'I graduated from college. Then I went to America to study more. (after)', a: 'After I graduated from college, I went to America to study more.', why: '~한 후에' },
      { q: 'It began to rain. Judy was working in the garden at that time. (while)', a: 'It began to rain while Judy was working in the garden.', why: '~하는 동안 (과거진행)' }] },
  ], m),

  // ---------------- Point 2 ----------------
  D.section('Point 2', '시간 · 조건의 부사절 — 현재시제가 미래를 대신한다', 'point'),
  ...D.table(['구분', '규칙', '예'], [
    ['주절', '미래의 일 → will / be going to 그대로', 'We **will wait** until Peter comes. (교과서)'],
    ['시간 부사절', 'when · before · after · until · as soon as + **현재시제** (will ✗)', 'He will call her when he **leaves** the house.'],
    ['조건 부사절', 'if · unless도 똑같이 현재시제', '**If** it **rains**, I will stay home. (기출)'],
    ['명사절 (예외)', 'know · wonder의 목적어인 when(언제)절은 미래면 will', 'I wonder when he **will come** back.'],
    ['과거의 일', '과거는 과거 그대로', 'Tom was 23 when his father **died**.']], [1700, 3700, 4238], m),
  ...D.infoBox('부사절인지 명사절인지 구별하기', [
    '부사절: 빼도 문장이 성립 → I will call you (when I arrive). — when = ~할 때 → {{현재시제}}',
    '명사절: 빼면 목적어가 없어짐 → I don’t know (when he will arrive). — when = 언제 ~할지 → {{will}} 가능',
    '주절이 명령문이어도 같다: Before you **go** out, put on a coat! (will go ✗)'], m),
  ...D.trick('시조는 현재!', ['“시간·조건 부사절엔 will 출입 금지 — 시조는 현재!”', '“궁금해·몰라 뒤 when(언제)은 명사절 → will OK”']),
  ...D.examPoint([
    { q: 'She will wait here until the contest {{is}} over. (will be ✗)', why: '시간 부사절 → 현재시제가 미래 대신 (기출)' },
    { q: 'When she {{comes}} back home, she will call her dad. (will come ✗)', why: '주절만 will (기출 서술형)' }], m),
  ...D.caution(['until the contest will be over / When she will come back 선지가 2023 기출에 반복 출제되었다.', '주절의 will까지 현재로 바꾼 선지(We buy a house when we have money ✗ → will buy)를 짝으로 낸다.', 'I wonder when ~ will … 같은 명사절 will은 ‘옳은 문장’으로 섞어 낸다 — 무조건 will을 지우지 않게 지도.'], m),
  ...D.drill(2, '시간 부사절의 현재시제 (미래 대신)', [
    { level: 'Basic ①', type: 'choice', instr: '괄호 안에서 알맞은 것을 고르시오.', items: [
      { q: 'She will wait here until the contest (is / will be) over.', a: 'is', why: '시간 부사절 → 현재' },
      { q: 'When she (comes / will come) back home, she will call her dad.', a: 'comes', why: '시간 부사절 → 현재' },
      { q: 'We will get married as soon as we (will graduate / graduate) from university.', a: 'graduate', why: '시간 부사절 → 현재' },
      { q: 'I (call / will call) you when I arrive in Seoul.', a: 'will call', why: '주절은 미래 그대로' },
      { q: 'Before you (go / will go) out, put on your coat.', a: 'go', why: '시간 부사절 → 현재' },
      { q: 'After it (will stop / stops) raining, we will go shopping.', a: 'stops', why: '시간 부사절 → 현재' },
      { q: 'I wonder when he (comes / will come) back.', a: 'will come', why: 'wonder의 목적어 — 명사절' },
      { q: 'We (will wait / wait) here until Peter comes.', a: 'will wait', why: '주절은 미래 (교과서)' },
      { q: 'Tom was 23 when his father (dies / died).', a: 'died', why: '과거의 일은 과거' },
      { q: 'If it (rains / will rain) tomorrow, I will stay home.', a: 'rains', why: '조건 부사절 → 현재' }] },
    { level: 'Basic ②', type: 'fill', instr: '<보기>에서 알맞은 말을 골라 빈칸에 쓰시오. (한 번씩만 사용)',
      bogi: ['comes', 'finish', 'is', 'will buy', 'arrive', 'stops', 'will be', 'graduate', 'will call', 'hear'], items: [
      { q: 'We will wait until Peter [[comes]].', why: '교과서 — 시간 부사절 현재' },
      { q: 'You can play with your friends after you [[finish]] your homework.', why: '시간 부사절 현재' },
      { q: 'She will wait here until the contest [[is]] over.', why: '기출 — will be ✗' },
      { q: 'We [[will buy]] a house when we have enough money.', why: '기출 — 주절은 미래' },
      { q: 'I’ll telephone you after I [[arrive]].', why: '시간 부사절 현재' },
      { q: 'Let’s go out as soon as the rain [[stops]].', why: '3인칭 단수 현재' },
      { q: 'I don’t know when the store [[will be]] open tomorrow.', why: 'know의 목적어 — 명사절 → will' },
      { q: 'We will get married as soon as we [[graduate]] from the university.', why: '기출 — 시간 부사절 현재' },
      { q: 'Mom [[will call]] us when dinner is ready.', why: '주절은 미래' },
      { q: 'I will let you know as soon as I [[hear]] any news.', why: '시간 부사절 현재' }] },
    { level: 'Intermediate', type: 'write', instr: '어법상 틀린 부분을 찾아 바르게 고쳐 쓰시오.', items: [
      { q: 'Please turn off your computer before you’ll go out.', a: 'you’ll go → you go', why: '시간 부사절 → 현재' },
      { q: 'After you will finish your homework, you can play with your friends.', a: 'will finish → finish', why: '시간 부사절 → 현재' },
      { q: 'I’ll telephone you after I will arrive.', a: 'will arrive → arrive', why: '시간 부사절 → 현재' },
      { q: 'When Yongchan will grow up, he will be a scientist.', a: 'will grow → grows', why: '기출 — 3인칭 단수 현재' },
      { q: 'He will call his father when he will come back home.', a: 'will come → comes', why: '시간 부사절 → 현재' },
      { q: 'We will do something before it’ll be too late.', a: 'it’ll be → it is', why: '시간 부사절 → 현재' },
      { q: 'As soon as I will save enough money, I’ll buy a new game.', a: 'will save → save', why: '시간 부사절 → 현재' },
      { q: 'If it will rain tomorrow, we will stay home.', a: 'will rain → rains', why: '조건 부사절 → 현재' },
      { q: 'I don’t know when he comes back tomorrow.', a: 'comes → will come', why: 'know의 목적어 — 명사절은 미래 will' },
      { q: 'Until you will finish your work, we will wait for you.', a: 'will finish → finish', why: '시간 부사절 → 현재' }] },
    { level: 'Advanced · 모두 고르기', type: 'multi', free: true, instr: '해당하는 것을 모두 골라 기호를 쓰시오.', items: [
      { q: '다음 중 어법상 어색한 문장을 모두 고르시오.', box: [
        '(a) When he was a child, he lived in Busan.', '(b) She will wait here until the contest will be over.', '(c) Mike called her back as soon as he saw her message.',
        '(d) When he will come home, I will tell him.', '(e) He always gets up before the sun rises.'], a: '(b), (d)', why: '(b) is over (d) comes (기출)' },
      { q: '다음 중 밑줄 친 부분에 대한 설명으로 옳은 것을 모두 고르시오.', box: [
        '(a) We will wait until Peter __comes__. → 미래의 일이지만 현재시제로 썼다.',
        '(b) When she comes back home, she __will call__ her dad. → 주절의 will call도 calls로 바꿔야 한다.',
        '(c) I wonder when he __will arrive__. → 명사절이므로 will을 쓸 수 있다.',
        '(d) If it __rains__ tomorrow, I will stay home. → 조건의 부사절이라 현재시제를 썼다.',
        '(e) Tom was 23 when his father __died__. → died를 dies로 고쳐야 한다.'], a: '(a), (c), (d)', why: '(b) 주절은 will 그대로 (e) 과거의 일은 과거' },
      { q: '다음 글의 밑줄 친 ⓐ~ⓔ 중 어법상 어색한 것을 모두 골라 기호를 쓰고 바르게 고치시오.', fix: true, label: '기호 / 고친 것', box: [
        'I love my girlfriend so much. When she ⓐ __asks__ me for help, I ⓑ __will do__ it with pleasure. We will get married as soon as we ⓒ __will graduate__ from the university. We ⓓ __will buy__ a house when we ⓔ __will have__ enough money.'],
        a: 'ⓒ will graduate → graduate, ⓔ will have → have', why: '시간 부사절 → 현재 / 주절 ⓑⓓ는 will 그대로 (기출 변형)' },
      { q: '빈칸에 will come을 쓸 수 있는 것을 모두 고르시오.', box: [
        '(a) I’ll be happy when he ______ back.', '(b) I don’t know when he ______ back.', '(c) Let’s wait until he ______ back.',
        '(d) Do you know if he ______ to the party?', '(e) Tell me as soon as he ______ back.'], a: '(b), (d)', why: '명사절(know의 목적어)만 will / (a)(c)(e) 시간 부사절 → comes' },
      { q: '괄호 안의 접속사를 사용하여 두 문장을 바르게 연결한 것을 모두 고르시오.', box: [
        '(a) We had dinner. We watched a movie. (after) → We had dinner after we watched a movie.',
        '(b) She will come back. She will call her dad. (when) → When she comes back, she will call her dad.',
        '(c) Yongchan will grow up. He will be a scientist. (when) → When Yongchan will grow up, he will be a scientist.',
        '(d) The rain will stop. We won’t go for a walk. (until) → We won’t go for a walk until the rain will stop.',
        '(e) You will be ready. I’ll pick you up. (when) → I’ll pick you up when you are ready.'], a: '(a), (b), (e)', why: '(c) grows (d) stops (기출 변형)' }] },
    { level: 'Advanced · 객관식', type: 'mcq', free: true, instr: '알맞은 답을 고르시오.', items: [
      { q: '다음 중 어법상 어색한 것은?', opts: [
        'When he was young, he liked to play soccer.', 'I learned English after I moved to New York.', 'When she will come back home, she will call her dad.',
        'I met Tom while I was on my way to school.', 'You have to finish your homework before you go to bed.'], a: '③', why: '③ comes (기출)' },
      { q: '(A)~(C)에서 어법상 알맞은 말이 바르게 짝지어진 것은? — When she (A)(asks / will ask) me for help, I will do it with pleasure. We will get married as soon as we (B)(graduate / will graduate) from the university. We (C)(buy / will buy) a house when we have enough money.', opts: [
        'asks – graduate – will buy', 'will ask – will graduate – will buy', 'asks – graduate – buy', 'will ask – graduate – buy', 'asks – will graduate – buy'], a: '①', why: '부사절 현재 / 부사절 현재 / 주절 미래 (기출)' },
      { q: '다음 중 어법상 옳은 문장의 개수는?', box: ['(a) We will wait until Peter comes.', '(b) I’ll call you after I will arrive.', '(c) I wonder when the circus will start.', '(d) If it rains, I will stay home.', '(e) Before you go out, put on a coat.'],
        opts: ['1개', '2개', '3개', '4개', '5개'], a: '④', why: '(b)만 틀림 → arrive' },
      { q: '빈칸에 들어갈 말로 알맞은 것은? — Will you give him this note when he ______ tomorrow?', opts: ['arrive', 'arrived', 'will arrive', 'to arrive', 'arrives'], a: '⑤', why: '시간 부사절 + 3인칭 단수 현재' },
      { q: '다음 밑줄 친 부분이 어법상 어색한 것은?', opts: [
        'When he __was__ a child, he lived in Busan.', 'She will wait here until the contest __will be__ over.', 'The floor looked shiny after Jenny __mopped__ it.',
        'I met my friend while I __was jogging__ at the park.', 'He will call his dad back as soon as he __comes__ back home.'], a: '②', why: '② is (기출)' }] },
    { level: '전환 · 연결', type: 'write', instr: '괄호 안의 접속사를 사용하여 두 문장을 한 문장으로 연결하시오. (시제에 주의할 것)', items: [
      { q: 'She will come back home. She will call her dad. (when)', a: 'When she comes back home, she will call her dad.', why: '부사절 현재 / 주절 미래' },
      { q: 'We have ten minutes. The train leaves. (before)', a: 'We have ten minutes before the train leaves.', why: '~하기 전에' },
      { q: 'We won’t go for a walk. The rain will stop. (until)', a: 'We won’t go for a walk until the rain stops.', why: 'will stop → stops' },
      { q: 'I’ll pick you up. You will be ready. (when)', a: 'I’ll pick you up when you are ready.', why: 'will be → are' },
      { q: 'I’ll buy a new computer game. I’ll save enough money. (as soon as)', a: 'I’ll buy a new computer game as soon as I save enough money.', why: 'will save → save' },
      { q: 'You cannot go outside. You will finish your homework. (until)', a: 'You cannot go outside until you finish your homework.', why: 'will finish → finish' },
      { q: 'It will stop raining. We will go shopping. (after)', a: 'After it stops raining, we will go shopping.', why: 'will stop → stops' },
      { q: 'We’ll finish our work. We’ll go out. (before)', a: 'We’ll finish our work before we go out.', why: 'will go → go' },
      { q: 'Yongchan will grow up. He will be a scientist. (when)', a: 'When Yongchan grows up, he will be a scientist.', why: '기출 — will grow → grows' },
      { q: 'My parents will arrive. I will go home. (as soon as)', a: 'I will go home as soon as my parents arrive.', why: 'will arrive → arrive' }] },
  ], m),

  // ---------------- Point 3 ----------------
  D.section('Point 3', '(심화) 접속사 while vs 전치사 during · for / until vs by / since · while의 다른 뜻', 'point'),
  ...D.table(['구분', '뒤에 오는 것 · 뜻', '예'], [
    ['while (접속사)', '주어 + 동사 — ~하는 동안', 'Humpback whales stand on their tails **while** they sleep. (본문)'],
    ['during (전치사)', '명사(구) — 특정 기간 동안 (무엇을 하는 동안)', 'She has four costume changes **during** the play. (교과서 해설)'],
    ['for (전치사)', '숫자 + 기간 — 얼마 동안', 'I stayed in Busan **for** three days.'],
    ['until vs by', 'until = 그때까지 계속 / by = 그때까지 완료(기한)', 'Wait here **until** 5. / Finish it **by** 5.'],
    ['since — 시간 vs 이유', '시간: ~ 이래로 (현재완료) / 이유: ~ 때문에', 'I have known her **since** she was a child. / **Since** they are not fish, they need to come up to breathe. (본문)'],
    ['while의 다른 뜻', '~인 반면 (접속사) / a while = 잠시 (명사)', 'Some people sleep well **while** other people don’t. / Wait here for **a while**. (교과서)'],
    ['as (시간)', '~할 때 · ~하면서 → ‘접속사 as’ 자료에서 자세히', 'She smiled **as** she opened the gift.']], [2000, 3300, 4338], m),
  ...D.infoBox('전치사로도 쓰이는 시간 표현', [
    'before · after · until · since 뒤에 **명사**가 오면 전치사: after school / before meals / until noon / since 2020',
    'while 뒤에는 명사 혼자 ✗ → while the movie (✗) → **during** the movie (○) / **while** I was watching the movie (○)',
    'since + 시점(2020, Monday, I was a child) / for + 기간(three years, two hours)'], m),
  ...D.trick('와일은 주동, 듀링은 명사!', ['“while 뒤엔 주어+동사, during 뒤엔 명사 — 와일은 주동, 듀링은 명사!”', '“until은 쭉~ 기다려, by는 그때까지 끝내!”', '“since 뒤 + 현재완료 = 시간 / 현재완료 없으면 이유부터 의심!”']),
  ...D.examPoint([
    { q: 'Humpback whales stand on their tails {{while}} they sleep. (during ✗)', why: '뒤에 주어+동사 → 접속사 (기출 본문 어법)' },
    { q: '__Since__ they are not fish, they need to come up to breathe. (본문) 뜻: {{~ 때문에}}', why: '이유 — 현재완료 없음 (기출 ‘쓰임이 같은 것’)' }], m),
  ...D.caution(['본문 ‘stand on their tails ⓑduring they sleep’ 어법 오류 찾기, (A)[while / during] 고르기가 2023 기출에 반복 출제되었다.', '본문 Since(이유)와 쓰임·의미가 같은 것 고르기 — 선지 대부분이 ‘~ 이래로’(현재완료)라 하나만 이유다.', 'until ↔ by, during ↔ for 바꿔 쓰기 선지 주의. 접속사 as(시간)는 ‘접속사 as’ 자료 Point 1과 연결.'], m),
  ...D.drill(3, '접속사 vs 전치사 · 헷갈리는 시간 표현', [
    { level: 'Basic ①', type: 'choice', instr: '괄호 안에서 알맞은 것을 고르시오.', items: [
      { q: 'Humpback whales stand on their tails (during / while) they sleep.', a: 'while', why: '주어+동사 → 접속사 (본문)' },
      { q: 'She has four costume changes (during / while) the play.', a: 'during', why: '명사구 → 전치사' },
      { q: 'I stayed in Busan (for / during) three days.', a: 'for', why: '숫자 기간 → for' },
      { q: 'Please finish the report (until / by) Friday.', a: 'by', why: '완료 기한 → by' },
      { q: 'Let’s wait here (until / by) the rain stops.', a: 'until', why: '계속 → until' },
      { q: 'I fell asleep (during / while) the movie.', a: 'during', why: '명사구 → during' },
      { q: 'I have known her (for / since) she was a child.', a: 'since', why: '시점(절) → since' },
      { q: 'Don’t use your phone (while / during) class.', a: 'during', why: '명사 → during' },
      { q: 'He has lived here (for / since) ten years.', a: 'for', why: '기간 → for' },
      { q: 'We talked (while / during) we were walking home.', a: 'while', why: '주어+동사 → while' }] },
    { level: 'Basic ②', type: 'fill', instr: '<보기>에서 알맞은 말을 골라 빈칸에 쓰시오. (한 번씩만 사용)',
      bogi: ['while', 'during', 'for', 'by', 'until', 'since', 'a while', 'after', 'before', 'as'], items: [
      { q: 'I read a book [[while]] I was waiting for the bus.', why: '주어+동사 → while' },
      { q: 'Many students get sleepy [[during]] the afternoon class.', why: '명사구 → during' },
      { q: 'He was late. I waited for him [[for]] two hours.', why: '숫자 기간 → for' },
      { q: 'You must return the book [[by]] next Monday.', why: '기한 → by' },
      { q: 'The store is open [[until]] 10 p.m.', why: '그때까지 계속 → until' },
      { q: 'It has been ten years [[since]] the war ended.', why: '현재완료 — ~ 이래로 (기출 선지)' },
      { q: 'I’m busy now. Wait here for [[a while]].', why: '교과서 — 잠시' },
      { q: 'We played soccer [[after]] school.', why: '명사 앞 전치사 after' },
      { q: 'Wash your hands [[before]] meals.', why: '명사 앞 전치사 before' },
      { q: 'She smiled [[as]] she opened the gift.', why: '~하면서 — 접속사 as(시간)' }] },
    { level: 'Intermediate', type: 'write', instr: '어법상 틀린 부분을 찾아 바르게 고쳐 쓰시오.', items: [
      { q: 'Humpback whales stand on their tails during they sleep.', a: 'during → while', why: '기출 — 주어+동사 → 접속사' },
      { q: 'I fell asleep while the movie.', a: 'while → during', why: '명사구 → 전치사' },
      { q: 'I lived in London during three years.', a: 'during → for', why: '숫자 기간 → for' },
      { q: 'You have to finish your homework until tomorrow.', a: 'until → by', why: '완료 기한 → by' },
      { q: 'I have known him since five years.', a: 'since → for', why: '기간 → for' },
      { q: 'While my stay in Jeju, I visited Hallasan.', a: 'While → During', why: '명사구 → during' },
      { q: 'I have been busy for last Monday.', a: 'for → since', why: '시점 → since' },
      { q: 'Let’s wait here by the bus comes.', a: 'by → until', why: '계속 기다림 → until' },
      { q: 'During I was cooking, the phone rang.', a: 'During → While', why: '주어+동사 → while' },
      { q: 'Wait here for while.', a: 'for while → for a while', why: '교과서 — a while(잠시)' }] },
    { level: 'Advanced · 모두 고르기', type: 'multi', free: true, instr: '해당하는 것을 모두 골라 기호를 쓰시오.', items: [
      { q: '빈칸에 during이 들어갈 수 있는 것을 모두 고르시오.', box: [
        '(a) Don’t talk ______ the teacher is speaking.', '(b) I visited my uncle ______ the vacation.', '(c) Nobody spoke ______ the meeting.',
        '(d) He slept ______ ten hours.', '(e) It rained a lot ______ the night.'], a: '(b), (c), (e)', why: '(a) while (d) for' },
      { q: '밑줄 친 Since와 쓰임이 같은 것을 모두 고르시오. — __Since__ they are not fish, they need to come up to breathe. (본문)', box: [
        '(a) I have known her __since__ she was a child.', '(b) __Since__ we didn’t have enough time, we took a taxi.', '(c) It has been ten years __since__ the war ended.',
        '(d) __Since__ you were late, your teacher got angry.', '(e) He has not been home __since__ Christmas.'], a: '(b), (d)', why: '본문 = 이유 / (a)(c)(e) ~ 이래로' },
      { q: '다음 글(본문 변형)의 밑줄 친 ⓐ~ⓔ 중 어법상 어색한 것을 모두 골라 기호를 쓰고 바르게 고치시오.', fix: true, label: '기호 / 고친 것', box: [
        'Humpback whales stand on their tails ⓐ __during__ they sleep. They sleep near the surface ⓑ __during__ the night. ⓒ __Since__ they are not fish, they need to come up to breathe. ⓓ __When__ they wake up, they come out of the water for a deep breath. They can stay underwater ⓔ __since__ about 30 minutes.'],
        a: 'ⓐ during → while, ⓔ since → for', why: 'ⓐ 주어+동사 → 접속사 ⓔ 기간 → for' },
      { q: '다음 중 밑줄 친 부분에 대한 설명으로 옳은 것을 모두 고르시오.', box: [
        '(a) Wait here for __a while__. → ‘잠시’라는 뜻의 명사이다.',
        '(b) Some people sleep well __while__ other people don’t. → ‘~하는 반면’의 뜻이다.',
        '(c) Please finish it __by__ Friday. → until로 바꿔도 뜻이 같다.',
        '(d) We played soccer __after__ school. → 뒤에 명사가 왔으므로 전치사이다.',
        '(e) She smiled __as__ she opened the gift. → ‘~ 때문에’의 뜻이다.'], a: '(a), (b), (d)', why: '(c) by = 완료 기한, until = 계속 (e) ~하면서' },
      { q: '우리말과 영어가 바르게 짝지어진 것을 모두 고르시오.', box: [
        '(a) 3시간 동안 → during three hours', '(b) 수업 시간 동안 → during the class', '(c) 내가 자고 있는 동안 → while I was sleeping',
        '(d) 내가 어렸을 때부터 → since I was a child', '(e) 금요일까지 제출하다 → hand in until Friday'], a: '(b), (c), (d)', why: '(a) for three hours (e) by Friday' }] },
    { level: 'Advanced · 객관식', type: 'mcq', free: true, instr: '알맞은 답을 고르시오.', items: [
      { q: '(A)~(C)에서 어법상 알맞은 말이 바르게 짝지어진 것은? — Humpback whales stand on their tails (A)(while / during) they sleep. … Also, they don’t fall (B)(sleep / asleep) completely. When they wake up, they come out of the water for a deep breath and (C)(dive / diving) back into the sea.', opts: [
        'during – asleep – dive', 'while – sleep – diving', 'while – asleep – diving', 'during – sleep – dive', 'while – asleep – dive'], a: '⑤', why: '주어+동사 → while / fall asleep / come과 병렬 → dive (기출)' },
      { q: '밑줄 친 Since와 쓰임과 의미가 같은 것은? — __Since__ they are not fish, they need to come up to breathe.', opts: [
        'I have known her __since__ she was a child.', 'He has not been home __since__ Christmas.', '__Since__ you were late, your teacher got angry.',
        'It has been ten years __since__ the war ended.', '__Since__ 2019, he has won every competition.'], a: '③', why: '이유 / 나머지 ~ 이래로 (기출)' },
      { q: '다음 중 빈칸에 들어갈 말이 나머지 넷과 다른 것은?', opts: [
        'Don’t talk ______ you are eating.', 'I visited Paris ______ the vacation.', 'She cooked dinner ______ I was cleaning.',
        'Be quiet ______ I am speaking.', 'He fell asleep ______ he was reading.'], a: '②', why: '② during (명사구) / 나머지 while' },
      { q: '다음 중 어법상 옳은 문장은?', opts: [
        'Humpback whales stand on their tails during they sleep.', 'I have lived here since three years.', 'You must finish it until tomorrow.',
        'Nobody spoke during the meeting.', 'While the vacation, I read many books.'], a: '④', why: '① while ② for ③ by ⑤ During' },
      { q: '다음 중 밑줄 친 as가 ‘~할 때, ~하면서’의 뜻인 것은? (→ 접속사 as 자료 참고)', opts: [
        'He called me __as__ I was writing a report.', '__As__ it was late, we went home.', 'She works __as__ a nurse.',
        '__As__ you know, he is honest.', 'He is __as__ tall as his dad.'], a: '①', why: '① 시간 ② 이유 ③ ~로서 ④ ~하듯이 ⑤ 원급 비교' }] },
    { level: '전환 · 연결', type: 'write', instr: '괄호 안의 말을 사용하여 같은 뜻이 되도록 문장을 바꾸어 쓰시오.', items: [
      { q: 'I fell asleep while I was watching the movie. (during)', a: 'I fell asleep during the movie.', why: '절 → 명사구' },
      { q: 'During my stay in Jeju, I visited Hallasan. (while)', a: 'While I was staying(stayed) in Jeju, I visited Hallasan.', why: '명사구 → 절' },
      { q: 'Please be quiet while the class is going on. (during)', a: 'Please be quiet during the class.', why: '절 → 명사구' },
      { q: 'Humpback whales stand on their tails while they sleep. (during)', a: 'Humpback whales stand on their tails during their sleep.', why: '본문 변형 — during + 명사' },
      { q: 'While I was on vacation, I read five books. (during)', a: 'During my(the) vacation, I read five books.', why: '절 → 명사구' },
      { q: 'Since they are not fish, they need to come up to breathe. (because)', a: 'Because they are not fish, they need to come up to breathe.', why: '본문 — 이유 since = because' },
      { q: 'I met him five years ago, and I still know him. (have known, for)', a: 'I have known him for five years.', why: '기간 → for + 현재완료' },
      { q: 'I started to live here in 2020, and I still live here. (have lived, since)', a: 'I have lived here since 2020.', why: '시점 → since + 현재완료' },
      { q: 'I was eating lunch. My friend called me then. (while)', a: 'My friend called me while I was eating lunch.', why: '과거진행 + while' },
      { q: 'Nobody said a word during the meeting. (while, we, have)', a: 'Nobody said a word while we were having the meeting.', why: '명사구 → 절 (과거진행)' }] },
  ], m),

  // ---------------- PERFECT CHECK ----------------
  D.section('PERFECT CHECK', '상위권 함정 체크'),
  ...D.drill(null, '', [{ level: '함정', type: 'choice', instr: '실수하기 쉬운 문장들이에요. 괄호 안에서 알맞은 것을 고르시오.', items: [
    { q: 'Humpback whales stand on their tails (while / during) they sleep.', a: 'while', why: '본문 — 주어+동사 → 접속사' },
    { q: 'She will wait here until the contest (is / will be) over.', a: 'is', why: '시간 부사절 → 현재' },
    { q: 'I have known her (for / since) she was a child.', a: 'since', why: '시점 → since' },
    { q: 'The tuskfish blows on the sand until a clam (appears / appear).', a: 'appears', why: '본문 — 단수 주어' },
    { q: 'I wonder when he (will come / comes) back.', a: 'will come', why: '명사절 → will 가능' },
    { q: 'When they wake up, they come out of the water for a deep (breathe / breath).', a: 'breath', why: '본문 — 형용사 deep 뒤 명사' },
    { q: 'Please hand in your report (until / by) Friday.', a: 'by', why: '완료 기한' },
    { q: 'This small fish (whose / which) favorite food is clams uses a tool.', a: 'whose', why: '본문 — 소유격 관계대명사 (같은 과 문법 혼합)' },
    { q: 'As soon as Tom (saw / sees) me, he ran away.', a: 'saw', why: '과거 시제 일치' },
    { q: 'Wait here for (while / a while).', a: 'a while', why: '교과서 — 잠시(명사)' }] }], m),

  // ---------------- WRITE ----------------
  D.section('WRITE', '서술형 대비'),
  ...D.writeItem(1, 'Basic', '괄호 안의 단어를 알맞은 형태로 바꾸어 쓰시오.', ['The tuskfish blows on the sand until a clam (appear). (본문)'], { a: 'appears', why: '주어 a clam 단수 · 현재' }, m),
  ...D.writeItem(2, 'Basic', '괄호 안의 단어를 알맞은 형태로 바꾸어 쓰시오.', ['We will wait until Peter (come).'], { a: 'comes', why: '시간 부사절 → 현재시제가 미래 대신 (교과서)' }, m),
  ...D.writeItem(3, 'Intermediate', '두 문장을 접속사 while을 사용하여 한 문장으로 연결하시오. [두 문장 연결]', ['Mr. Cho met many foreigners. He was abroad.'], { a: 'Mr. Cho met many foreigners while he was abroad.', why: '교과서 문장 — while + 주어+동사' }, m),
  ...D.writeItem(4, 'Intermediate', '밑줄 친 부분을 접속사 while을 사용한 절로 바꾸어 문장을 다시 쓰시오. [문장 전환]', ['__During my stay in London__, I visited many museums.'], { a: 'While I was staying(stayed) in London, I visited many museums.', why: 'during + 명사구 → while + 주어+동사' }, m),
  ...D.writeItem(5, 'Intermediate', '밑줄 친 우리말을 <조건>에 맞게 영작하시오.', ['__그녀가 집에 돌아오면__, she will call her dad.', '<조건> back, when을 사용할 것 · 5단어로 쓸 것'], { a: 'When she comes back home', why: '기출 서술형 — 시간 부사절 현재시제 (will come ✗)' }, m),
  ...D.writeItem(6, 'Intermediate', '두 문장을 as soon as를 사용하여 한 문장으로 연결하시오. [두 문장 연결]', ['I will save enough money. I will buy a new computer game.'], { a: 'As soon as I save enough money, I will buy a new computer game.', why: 'will save → save (주절은 will 그대로)' }, m),
  ...D.writeItem(7, 'Advanced', '우리말과 같은 뜻이 되도록 <조건>에 맞게 영작하시오.', ['혹등고래는 잠을 자는 동안 꼬리로 서 있는다.', '<조건> while을 사용할 것 · humpback whales, stand, tail을 사용할 것 · 총 9단어'],
    { a: 'Humpback whales stand on their tails while they sleep.', why: '본문 문장 · 9단어 (Humpback/whales/stand/on/their/tails/while/they/sleep)' }, m),
  ...D.writeItem(8, 'Advanced', '<보기>의 단어를 배열하여 문장을 완성하시오. (필요하면 형태를 바꿀 것)', ['지호는 아빠가 거실을 진공청소기로 청소하는 동안 창문을 닦았다.', '<보기> Jiho / clean / the window / while / his dad / vacuum / the living room'],
    { a: 'Jiho cleaned the window while his dad vacuumed the living room.', why: '교과서 In Context — clean → cleaned, vacuum → vacuumed' }, m),
  ...D.writeItem(9, 'Advanced', '어법상 틀린 부분 2개를 찾아 바르게 고치고, 그 이유를 쓰시오.', ['Humpback whales stand on their tails during they sleep. When they will wake up, they come out of the water.'],
    { a: '① during → while  ② will wake → wake', why: '① 뒤에 주어+동사 → 접속사 while ② 시간 부사절에서는 will을 쓰지 않고 현재시제', blanks: ['고친 것', '이유'] }, m),
  ...D.writeItem(10, 'Advanced', '어법상 틀린 부분 2개를 찾아 바르게 고치고, 그 이유를 쓰시오.', ['I have lived in Seoul since three years. Please call me as soon as you will arrive.'],
    { a: '① since → for  ② will arrive → arrive', why: '① 기간(three years) 앞 → for ② 시간 부사절 → 현재시제가 미래 대신', blanks: ['고친 것', '이유'] }, m),

  // ---------------- MAP ----------------
  D.section('MAP', "DAVID'S MAP — 백지노트 테스트"),
  D.P([D.T('오늘 배운 내용을 떠올리며 빈칸을 채워 보세요. 책을 보지 않고!', { size: 18, color: '595959' })], { spacing: { after: 120 }, keepNext: true }),
  ...D.image(path.join(__dirname, 'map_G-시간접속사.png'), 620),
  ...D.table(['자가 체크 — 백지노트에 이 단어들이 들어갔나요?', '✔'], [
    ['시간 접속사 + 주어 + 동사 (완전한 절)', ''], ['when ~할 때 / while ~하는 동안 / before ~하기 전에 / after ~한 후에', ''],
    ['until ~할 때까지 / since ~ 이래로(현재완료) / as soon as ~하자마자', ''], ['부사절이 앞에 오면 콤마(,)', ''],
    ['시간·조건 부사절: 미래도 현재시제 (시조는 현재!)', ''], ['명사절(know · wonder + when)은 will 가능', ''],
    ['while + 주어·동사 / during + 명사 / for + 기간', ''], ['until(계속) vs by(완료 기한) · since 이유(~ 때문에)', ''],
    ['본문: Humpback whales stand on their tails while they sleep.', ''], ['본문: The tuskfish blows on the sand until a clam appears.', '']], [8838, 800], m),
  ...D.memo(['다음 시간 도입: 접속사 뜻 10초 퀴즈 + will 출입 금지 OX 10문항', '약한 반: Point 1·2 확실히 → Point 3은 while / during 구별과 본문 Since(이유)만 집중',
    '같은 과 whose와 섞어 본문 문장 3개(whose favorite food … / while they sleep / until a clam appears) 통째 암기 확인', 'as(시간 · ~하면서)는 접속사 as 자료 Point 1로 연결'], m),
];
D.render(meta, build, process.argv[2] || '.').then(f => console.log(f.join('\n')));
