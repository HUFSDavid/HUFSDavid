const D = require('./david_base');
const path = require('path');
const COVER = JSON.parse(process.env.COVER || '{}');
const meta = { series: D.SERIES.G, code: 'G-접속사as', title: '접속사 as', category: 'G. 접속사  |  as',
  rightText: 'G  접속사 as', prefix: process.env.PREFIX || '', cover: COVER.title ? COVER : undefined,
  question: '~~As~~ it was late, we went home. / She got wiser ~~as~~ she got older. — 같은 as인데 왜 하나는 ‘때문에’, 하나는 ‘~함에 따라’일까?' };

const build = (m) => [
  D.section('FLOW', 'Teaching Flow — 처음 배우는 사람도 따라오는 5단계'),
  ...D.step(1, '우리말로 먼저 생각하기 — ‘~해서, ~할 때, ~함에 따라, ~처럼’', [
    '‘늦어서 집에 갔다’ ‘나이가 들수록 현명해졌다’ ‘내가 말했듯이’ — 우리말은 서로 다른 말인데, 영어는 전부 {{as}} 하나!'], m),
  ...D.step(2, '이전 단원 복습 — 접속사 뒤에는?', [
    'because, when, if 뒤에는 {{주어}} + {{동사}}가 온다 → 완전한 절'], m),
  ...D.step(3, '문제 제기 — 뜻이 너무 많다', [
    '**As** I told you, we will meet at 6:00. / **As** it was late at night, we went back home.', '같은 as를 어떻게 구별할까?'], m),
  ...D.step(4, '규칙 발견 — 앞뒤 문맥 보기', [
    '비교급·변화 동사(grow, get, develop) → {{~함에 따라}} / 원인·결과 → {{~때문에}} / 말하다·예측하다 → {{~하듯이, ~대로}}',
    'as 뒤에 명사만 있으면? → 전치사 {{~로서}}'], m),
  ...D.step(5, '결론 🔑', [
    '접속사 as = 뒤에 {{주어 + 동사}} · 뜻은 문맥으로(시간·이유·비례·양태) / 전치사 as = 뒤에 {{명사}} (~로서)'], m),
  ...D.infoBox('오늘의 핵심 3문장', [
    '① As information technology develops, data grows. → {{~함에 따라}}',
    '② Health experts forecast a disease just as weather experts forecast the weather. → {{~하듯이}}',
    '③ As it was late at night, we went back home. → {{~때문에}}'], m),
  ...D.tip(['교과서 본문 두 문장(As information … / just as weather experts …)을 먼저 해석시키고 뜻을 분류하게 한다.', '분사구문과 함께 출제되므로 As절 ↔ 분사구문 전환을 꼭 섞는다.'], m),

  // ---------- Point 1 ----------
  D.section('Point 1', '시간 · 동시(~할 때, ~하면서) / 비례(~함에 따라, ~할수록)', 'point'),
  ...D.table(['뜻', '단서', '예'], [
    ['~할 때 · ~하면서', '동시에 일어나는 두 동작', 'He called me **as** I was writing a report.'],
    ['~함에 따라 · ~할수록', '비교급 · 변화 동사 (grow, get, develop, change)', '**As** information technology develops, the amount of data is getting greater.'],
    ['', '', 'She got wiser **as** she got older.']], [2300, 3500, 3838], m),
  ...D.trick('변하면 따라 as!', ['“grow · get · develop — 변하면 따라 as!” (~함에 따라)']),
  ...D.examPoint([
    { q: '__As__ spring comes, it gets warmer and warmer. 뜻: {{~함에 따라}}', why: '변화 + 비교급 반복' },
    { q: 'The phone rang __as__ I was taking a shower. 뜻: {{~할 때, ~하는 동안}}', why: '동시' }], m),
  ...D.caution(['as를 when / while로 바꿀 수 있는 것과 because로 바꿀 수 있는 것을 구분하는 문항이 자주 나온다.'], m),
  ...D.drill(1, '시간 · 비례의 as', [
    { level: 'Basic ①', type: 'choice', instr: '밑줄 친 as의 뜻으로 알맞은 것을 고르시오.', items: [
      { q: '__As__ we grow older, we become wiser. (~함에 따라 / ~ 때문에)', a: '~함에 따라', why: '변화 + 비교급' },
      { q: 'She smiled __as__ she opened the gift. (~하면서 / ~처럼)', a: '~하면서', why: '동시동작' },
      { q: '__As__ the sun rose, the sky turned red. (~할 때 / ~처럼)', a: '~할 때', why: '시간' },
      { q: '__As__ technology develops, our lives change. (~함에 따라 / ~로서)', a: '~함에 따라', why: 'develop 변화' },
      { q: 'I saw him __as__ I was getting off the bus. (~할 때 / ~ 때문에)', a: '~할 때', why: '동시' },
      { q: '__As__ it gets darker, it gets colder. (~할수록 / ~처럼)', a: '~할수록', why: '비교급 + get' },
      { q: 'He sang __as__ he walked. (~하면서 / ~ 때문에)', a: '~하면서', why: '동시' },
      { q: '__As__ time passed, she felt better. (~함에 따라 / ~처럼)', a: '~함에 따라', why: '시간의 흐름(변화)' },
      { q: 'The phone rang __as__ I came in. (~할 때 / ~로서)', a: '~할 때', why: '시간' },
      { q: '__As__ the population grows, cities get bigger. (~함에 따라 / ~하듯이)', a: '~함에 따라', why: 'grow 변화' }] },
    { level: 'Basic ②', type: 'fill', instr: '<보기>에서 알맞은 말을 골라 빈칸에 쓰시오. (한 번씩만 사용)',
      bogi: ['older', 'develops', 'was', 'warmer', 'more', 'gets', 'came', 'passed', 'faster', 'grew'], items: [
      { q: 'She got wiser as she got [[older]].', why: '비교급' },
      { q: 'As information technology [[develops]], the amount of data is getting greater.', why: '본문 — 3인칭 단수 현재' },
      { q: 'He called me as I [[was]] writing a science report.', why: '과거진행' },
      { q: 'As spring comes, it gets [[warmer]] and warmer.', why: '비교급 and 비교급' },
      { q: 'As I practiced, I became [[more]] confident.', why: 'more + 형용사' },
      { q: 'As the night [[gets]] darker, the stars look brighter.', why: '3인칭 단수 현재' },
      { q: 'Everyone stood up as the teacher [[came]] in.', why: '과거' },
      { q: 'As time [[passed]], the pain went away.', why: '과거' },
      { q: 'As the car went [[faster]], I got more scared.', why: '비교급' },
      { q: 'As the children [[grew]], the house felt smaller.', why: '과거' }] },
    { level: 'Intermediate', type: 'write', instr: '어법상 틀린 부분을 찾아 바르게 고쳐 쓰시오.', items: [
      { q: 'As technology develop, our lives are changing.', a: 'develop → develops', why: '주어 technology 단수' },
      { q: 'As she grew old, she became wiser.', a: 'old → older', why: '비례 — 비교급과 짝' },
      { q: 'As the weather gets cold, people wear more clothes.', a: 'cold → colder', why: '변화 비교급' },
      { q: 'He fell asleep as he watching TV.', a: 'watching → was watching', why: 'as 뒤 주어+동사' },
      { q: 'As spring comes, it gets warm and warm.', a: 'warm and warm → warmer and warmer', why: '비교급 and 비교급' },
      { q: 'As getting older, I like reading more.', a: 'As getting → As I get', why: '접속사 as 뒤 주어+동사' },
      { q: 'As the plane takes off, I felt excited.', a: 'takes → took', why: '시제 일치(과거)' },
      { q: 'As time go by, things change.', a: 'go → goes', why: '주어 time 단수' },
      { q: 'As the population grows, the city get crowded.', a: 'get → gets', why: '주어 the city 단수' },
      { q: 'The phone rang as I am taking a shower.', a: 'am → was', why: '과거 시제 일치' }] },
    { level: 'Advanced · 모두 고르기', type: 'multi', free: true, instr: '해당하는 것을 모두 골라 기호를 쓰시오.', items: [
      { q: '밑줄 친 as가 ‘~함에 따라’의 뜻인 것을 모두 고르시오.', box: [
        '(a) __As__ he grew up, he became taller.', '(b) __As__ it was cold, I wore gloves.', '(c) __As__ the river got deeper, the water got darker.',
        '(d) Do in Rome __as__ the Romans do.', '(e) __As__ technology develops, we use more data.'], a: '(a), (c), (e)', why: '(b) 이유 (d) 양태' },
      { q: '다음 중 밑줄 친 부분에 대한 설명으로 옳은 것을 모두 고르시오.', box: [
        '(a) She got wiser __as__ she got older. → 비례를 나타낸다.', '(b) He called me __as__ I was studying. → while로 바꿔 쓸 수 있다.',
        '(c) __As__ technology develops, … → 뒤에 주어와 동사가 있으므로 접속사이다.', '(d) __As__ spring comes, … → ‘봄처럼’이라는 뜻이다.',
        '(e) __As__ time passed, … → because로 바꿔 쓸 수 있다.'], a: '(a), (b), (c)', why: '(d) 봄이 옴에 따라 (e) 비례' },
      { q: '다음 글의 밑줄 친 ⓐ~ⓔ 중 어법상 어색한 것을 모두 골라 기호를 쓰고 바르게 고치시오.', fix: true, label: '기호 / 고친 것', box: [
        'As information technology ⓐ __develops__, the amount of data ⓑ __are__ getting much greater. As we use more apps, we leave ⓒ __more__ traces. As time ⓓ __go__ by, data will become ⓔ __more important__.'],
        a: 'ⓑ are → is, ⓓ go → goes', why: 'ⓑ 주어 the amount ⓓ 주어 time' },
      { q: 'as를 when 또는 while로 바꿔 쓸 수 있는 것을 모두 고르시오.', box: [
        '(a) She was singing as she cooked.', '(b) As it was raining, we stayed inside.', '(c) I met him as I was leaving school.',
        '(d) As you know, he is my cousin.', '(e) The bell rang as we entered the room.'], a: '(a), (c), (e)', why: '시간·동시만 / (b) 이유 (d) 양태' },
      { q: '우리말과 영어가 바르게 짝지어진 것을 모두 고르시오.', box: [
        '(a) 나이가 들수록 → as I get older', '(b) 기술이 발달함에 따라 → as technology develops', '(c) 버스에서 내릴 때 → as I got off the bus',
        '(d) 시간이 지남에 따라 → as time passing', '(e) 봄이 오면서 → as comes spring'], a: '(a), (b), (c)', why: '(d) passes/passed (e) as spring comes' }] },
    { level: 'Advanced · 객관식', type: 'mcq', free: true, instr: '알맞은 답을 고르시오.', items: [
      { q: '다음 중 밑줄 친 as의 뜻이 나머지 넷과 다른 것은?', opts: [
        '__As__ he got older, he got quieter.', '__As__ it got dark, we went home.', '__As__ prices rise, people buy less.',
        '__As__ you said, the test was easy.', '__As__ the sun rose higher, it got hotter.'], a: '④', why: '④ ~하듯이 / 나머지 비례' },
      { q: '빈칸에 공통으로 알맞은 말은? — ________ the city grew, more people moved in. / He waved ________ the train left.', opts: ['If', 'As', 'Though', 'So', 'Unless'], a: '②', why: '비례 / 시간' },
      { q: '다음 중 어법상 옳은 문장은?', opts: [
        'As technology develop, life changes.', 'As I got older, I got more busy.', 'As the days get shorter, it gets colder.',
        'As getting dark, we went home.', 'She smiled as she opening the box.'], a: '③', why: '① develops ② busier ④ As it got dark ⑤ opened' },
      { q: '(A)~(C)의 as의 뜻이 바르게 짝지어진 것은? — (A) As spring comes, it gets warmer. (B) He called me as I was writing a report. (C) As it was late, we went home.', opts: [
        '비례 – 시간 – 이유', '비례 – 이유 – 시간', '시간 – 비례 – 이유', '이유 – 시간 – 비례', '비례 – 시간 – 양태'], a: '①', why: '봄이 옴에 따라 / 쓰고 있을 때 / 늦어서' },
      { q: '다음 중 우리말을 영어로 바르게 옮긴 것은? — ‘시간이 지날수록 그는 더 행복해졌다.’', opts: [
        'As time passed, he became happier.', 'As time passes, he becomes happy.', 'As passing time, he became happier.',
        'Time as passed, he became happier.', 'As time passed, he became more happy than.'], a: '①', why: '과거 + 비교급' }] },
    { level: '전환 · 연결', type: 'write', instr: '두 문장을 접속사 as를 사용하여 한 문장으로 연결하시오.', items: [
      { q: 'Technology develops. Our lives become easier.', a: 'As technology develops, our lives become easier.', why: '비례' },
      { q: 'I was leaving the house. The phone rang.', a: 'The phone rang as I was leaving the house.', why: '시간' },
      { q: 'She got older. She got wiser.', a: 'She got wiser as she got older.', why: '교과서 문장 — 비례' },
      { q: 'Spring comes. It gets warmer and warmer.', a: 'As spring comes, it gets warmer and warmer.', why: '비례' },
      { q: 'He walked to school. He listened to music.', a: 'He listened to music as he walked to school.', why: '동시' },
      { q: 'The night got darker. The wind got stronger.', a: 'As the night got darker, the wind got stronger.', why: '비례' },
      { q: 'I was writing a report. He called me.', a: 'He called me as I was writing a report.', why: '시간' },
      { q: 'We climbed higher. The air got colder.', a: 'As we climbed higher, the air got colder.', why: '비례' },
      { q: 'The teacher came in. Everyone stood up.', a: 'Everyone stood up as the teacher came in.', why: '시간' },
      { q: 'Prices go up. People spend less money.', a: 'As prices go up, people spend less money.', why: '비례' }] },
  ], m),

  // ---------- Point 2 ----------
  D.section('Point 2', '이유(~ 때문에) · 양태(~처럼, ~하듯이, ~대로)', 'point'),
  ...D.table(['뜻', '단서', '예'], [
    ['~ 때문에', '원인 → 결과 (= because, since)', '**As** it was late at night, we went back home.'],
    ['~하듯이 · ~처럼', 'just as / 비교 대상', 'Health professionals can forecast a disease **just as** weather experts forecast the weather.'],
    ['~대로', 'as I told you / as you know / as predicted', '**As** I told you, we will meet at 6:00.']], [2000, 3500, 4138], m),
  ...D.trick('왜냐면 as, 말한 대로 as!', ['“원인 있으면 왜냐면 as, 말한 거 있으면 대로 as!”', '“just as = 딱 ~처럼”']),
  ...D.examPoint([
    { q: '__As__ the elevator was broken, we had to walk up the stairs. 뜻: {{~ 때문에}}', why: '원인 → 결과' },
    { q: 'Do in Rome __as__ the Romans do. 뜻: {{~하는 대로, ~처럼}}', why: '양태' }], m),
  ...D.caution(['as(이유) = because / since 바꿔 쓰기, as(양태) ≠ because — 바꿔 쓰기 선지로 함정', 'just as는 ‘딱 ~처럼’ — 본문 문장 그대로 빈칸·영작 출제'], m),
  ...D.drill(2, '이유 · 양태의 as', [
    { level: 'Basic ①', type: 'choice', instr: '밑줄 친 as의 뜻으로 알맞은 것을 고르시오.', items: [
      { q: '__As__ I was busy, I couldn’t call you. (~ 때문에 / ~처럼)', a: '~ 때문에', why: '원인' },
      { q: '__As__ I told you, the test is on Monday. (~대로 / ~ 때문에)', a: '~대로', why: '말한 대로' },
      { q: 'Do it __as__ I showed you. (~처럼 / ~함에 따라)', a: '~처럼', why: '보여 준 대로' },
      { q: '__As__ he was sick, he stayed home. (~ 때문에 / ~할수록)', a: '~ 때문에', why: '원인' },
      { q: '__As__ you know, Jiho moved to Busan. (~하듯이 / ~ 때문에)', a: '~하듯이', why: '아시다시피' },
      { q: 'She sings just __as__ her mother does. (~처럼 / ~할 때)', a: '~처럼', why: 'just as' },
      { q: '__As__ it was raining, the game was canceled. (~ 때문에 / ~대로)', a: '~ 때문에', why: '원인' },
      { q: '__As__ the forecast said, it snowed a lot. (~대로 / ~할 때)', a: '~대로', why: '예보대로' },
      { q: '__As__ the store was closed, we went home. (~ 때문에 / ~처럼)', a: '~ 때문에', why: '원인' },
      { q: 'Leave the room __as__ it is. (~대로 / ~ 때문에)', a: '~대로', why: '있는 그대로' }] },
    { level: 'Basic ②', type: 'fill', instr: '<보기>에서 알맞은 말을 골라 빈칸에 쓰시오. (한 번씩만 사용)',
      bogi: ['just', 'told', 'was', 'because', 'know', 'predicted', 'do', 'since', 'is', 'said'], items: [
      { q: 'Health professionals can now forecast a disease [[just]] as weather experts forecast the weather.', why: '본문 just as' },
      { q: 'As I [[told]] you, we will meet at 6:00.', why: '말했듯이' },
      { q: 'As it [[was]] late at night, we went back home.', why: '과거' },
      { q: 'As it was cold = [[because]] it was cold', why: '이유 as = because' },
      { q: 'As you [[know]], she is the class president.', why: '아시다시피' },
      { q: 'As the weather forecast [[predicted]], it rained all day.', why: '예측대로' },
      { q: 'Do in Rome as the Romans [[do]].', why: '대동사 do' },
      { q: 'As I was tired = [[since]] I was tired', why: '이유 as = since' },
      { q: 'Leave everything as it [[is]].', why: '있는 그대로' },
      { q: 'As the teacher [[said]], the test was difficult.', why: '선생님 말씀대로' }] },
    { level: 'Intermediate', type: 'write', instr: '어법상 틀린 부분을 찾아 바르게 고쳐 쓰시오.', items: [
      { q: 'As the elevator broken, we had to walk up the stairs.', a: 'broken → was broken', why: 'as 뒤 주어+동사(수동)' },
      { q: 'Just as weather experts forecasts the weather, doctors can forecast a disease.', a: 'forecasts → forecast', why: '주어 experts 복수' },
      { q: 'As I tell you yesterday, the store is closed.', a: 'tell → told', why: 'yesterday — 과거' },
      { q: 'As it is late last night, we went home.', a: 'is → was', why: '과거' },
      { q: 'As my brother were sick, I stayed with him.', a: 'were → was', why: '주어 단수' },
      { q: 'Do in Rome as the Romans does.', a: 'does → do', why: '주어 the Romans 복수' },
      { q: 'As busy, I couldn’t answer the phone.', a: 'As busy → As I was busy', why: '접속사 as 뒤 주어+동사' },
      { q: 'As you knows, the festival starts today.', a: 'knows → know', why: '주어 you' },
      { q: 'As the forecast predict, it snowed.', a: 'predict → predicted', why: '과거' },
      { q: 'As of the heavy rain, the road was closed.', a: 'As of → Because of', why: '명사구 앞 이유 = because of' }] },
    { level: 'Advanced · 모두 고르기', type: 'multi', free: true, instr: '해당하는 것을 모두 골라 기호를 쓰시오.', items: [
      { q: '밑줄 친 as를 because로 바꿔 쓸 수 있는 것을 모두 고르시오.', box: [
        '(a) __As__ I was hungry, I ate a lot.', '(b) __As__ you know, he is honest.', '(c) __As__ the road was icy, we drove slowly.',
        '(d) __As__ she got older, she got wiser.', '(e) __As__ it was a holiday, the bank was closed.'], a: '(a), (c), (e)', why: '(b) 양태 (d) 비례' },
      { q: '다음 중 밑줄 친 부분에 대한 설명으로 옳은 것을 모두 고르시오.', box: [
        '(a) Health experts forecast a disease just __as__ weather experts forecast the weather. → ‘~하듯이’의 뜻이다.',
        '(b) __As__ I told you, … → ‘내가 말했기 때문에’로만 해석한다.', '(c) __As__ it was late, … → since로 바꿔 쓸 수 있다.',
        '(d) Do __as__ I say. → ‘~하는 대로’의 뜻이다.', '(e) __As__ it was late, … → 뒤에 명사만 오므로 전치사이다.'], a: '(a), (c), (d)', why: '(b) 말했듯이 (e) 주어+동사 → 접속사' },
      { q: '다음 글의 밑줄 친 ⓐ~ⓔ 중 어법상 어색한 것을 모두 골라 기호를 쓰고 바르게 고치시오.', fix: true, label: '기호 / 고친 것', box: [
        'ⓐ __As__ the weather forecast predicted, it rained all day. ⓑ __As__ it was raining, we ⓒ __stay__ home. ⓓ __Just as__ Mom said, the movie was fun. ⓔ __As of__ the rain, we couldn’t go out.'],
        a: 'ⓒ stay → stayed, ⓔ As of → Because of', why: 'ⓒ 과거 ⓔ 명사구 앞 because of' },
      { q: '다음 중 두 문장의 뜻이 같은 것을 모두 고르시오.', box: [
        '(a) As it was cold, I wore a coat. = Because it was cold, I wore a coat.', '(b) As I said, he is kind. = Because I said, he is kind.',
        '(c) As she was tired, she slept early. = Being tired, she slept early.', '(d) As I was sick, I stayed home. = Since I was sick, I stayed home.',
        '(e) Do as I do. = Do because I do.'], a: '(a), (c), (d)', why: '(b)(e) 양태 as ≠ because' },
      { q: '빈칸에 as를 쓸 수 있는 것을 모두 고르시오.', box: [
        '(a) ______ I was late, I ran.', '(b) ______ the rain, we stayed in.', '(c) Do it ______ I told you.',
        '(d) ______ of the noise, I couldn’t sleep.', '(e) Just ______ I expected, he won.'], a: '(a), (c), (e)', why: '(b)(d) 명사구 → because of' }] },
    { level: 'Advanced · 객관식', type: 'mcq', free: true, instr: '알맞은 답을 고르시오.', items: [
      { q: '다음 중 밑줄 친 as의 쓰임이 나머지 넷과 다른 것은?', opts: [
        '__As__ I was busy, I missed the show.', '__As__ it was hot, we went swimming.', '__As__ you told me, I brought an umbrella.',
        '__As__ he was tired, he went to bed.', '__As__ the bus was late, I took a taxi.'], a: '③', why: '③ 양태(~대로) / 나머지 이유' },
      { q: '밑줄 친 As와 바꿔 쓸 수 있는 것은? — __As__ the elevator was broken, we had to walk up the stairs.', opts: ['If', 'Though', 'Since', 'Unless', 'While'], a: '③', why: '이유 = since' },
      { q: '다음 중 어법상 틀린 문장의 개수는?', box: ['(a) As I told you, we will meet at six.', '(b) As it was late, we went home.', '(c) As the rain, the game was canceled.', '(d) Just as he said, it was easy.', '(e) As she were sick, she stayed home.'],
        opts: ['1개', '2개', '3개', '4개', '5개'], a: '②', why: '(c) Because of the rain (e) was' },
      { q: '(A)~(C)의 as의 뜻이 바르게 짝지어진 것은? — (A) As I told you, … (B) As it was late, … (C) As he got older, …', opts: [
        '양태 – 이유 – 비례', '이유 – 양태 – 비례', '양태 – 비례 – 이유', '이유 – 이유 – 비례', '양태 – 이유 – 시간'], a: '①', why: '말했듯이 / 늦어서 / 들수록' },
      { q: '다음 우리말을 영어로 바르게 옮긴 것은? — ‘날씨 전문가들이 날씨를 예측하듯이 건강 전문가들은 질병을 예측할 수 있다.’', opts: [
        'Health professionals can forecast a disease just because weather experts forecast the weather.',
        'Health professionals can forecast a disease just as weather experts forecast the weather.',
        'Health professionals can forecast a disease just as weather experts forecasts the weather.',
        'Health professionals can forecast a disease just like weather experts forecast the weather as.',
        'Health professionals can forecast a disease as just weather experts forecast the weather.'], a: '②', why: '본문 just as' }] },
    { level: '전환 · 연결', type: 'write', instr: '두 문장을 접속사 as를 사용하여 한 문장으로 연결하시오.', items: [
      { q: 'It was late at night. We went back home.', a: 'As it was late at night, we went back home.', why: '이유' },
      { q: 'The elevator was broken. We had to walk up the stairs.', a: 'As the elevator was broken, we had to walk up the stairs.', why: '이유' },
      { q: 'I told you. We will meet at 6:00.', a: 'As I told you, we will meet at 6:00.', why: '양태' },
      { q: 'I was busy. I couldn’t call you.', a: 'As I was busy, I couldn’t call you.', why: '이유' },
      { q: 'The weather forecast predicted it. It rained all day.', a: 'As the weather forecast predicted, it rained all day.', why: '양태 — it 생략' },
      { q: 'Jane was very tired. She went to bed early.', a: 'As Jane was very tired, she went to bed early.', why: '이유' },
      { q: 'You know. Tom is from Canada.', a: 'As you know, Tom is from Canada.', why: '양태' },
      { q: 'The store was closed. We bought snacks at home.', a: 'As the store was closed, we bought snacks at home.', why: '이유' },
      { q: 'Weather experts forecast the weather. Health experts forecast a disease. (just)', a: 'Health experts forecast a disease just as weather experts forecast the weather.', why: '본문 구조 just as' },
      { q: 'It was raining. The picnic was canceled.', a: 'As it was raining, the picnic was canceled.', why: '이유' }] },
  ], m),

  // ---------- Point 3 ----------
  D.section('Point 3', '(심화) 전치사 as(~로서) · as 쓰임 구별', 'point'),
  ...D.table(['as', '뒤에 오는 것', '예'], [
    ['접속사', '주어 + 동사', '**As** it was late, we went home.'],
    ['전치사 (~로서)', '명사(구)', 'She works **as** a nurse. / People use bikes **as** a form of transportation.'],
    ['as ~ as (원급)', '형용사/부사 원급', 'He is **as** tall **as** his dad.'],
    ['such as (~와 같은)', '예시 명사', 'sports **such as** soccer and baseball']], [2300, 2300, 5038], m),
  ...D.trick('주동이면 접, 명사면 전!', ['“as 뒤에 주어·동사 = 접속사, 명사 혼자 = 전치사(~로서)!” — 주동이면 접, 명사면 전!']),
  ...D.examPoint([
    { q: 'He is known __as__ a great singer. 품사: {{전치사}}', why: '뒤에 명사구 — ~로서' },
    { q: '__As__ he was a great singer, he was invited. 품사: {{접속사}}', why: '주어+동사 — ~ 때문에' }], m),
  ...D.caution(['“쓰임이 나머지와 다른 것” 문항에 전치사 as 1개를 숨겨 놓는 패턴이 가장 흔하다.', 'as ~ as 원급 비교의 as는 접속사 as와 구별 문제로 섞인다.'], m),
  ...D.drill(3, '전치사 as · 쓰임 구별', [
    { level: 'Basic ①', type: 'choice', instr: '밑줄 친 as가 접속사인지 전치사인지 고르시오.', items: [
      { q: 'She worked __as__ a teacher for 20 years. (접속사 / 전치사)', a: '전치사', why: '명사구 — ~로서' },
      { q: '__As__ it was sunny, we went out. (접속사 / 전치사)', a: '접속사', why: '주어+동사' },
      { q: 'People use bikes __as__ a form of transportation. (접속사 / 전치사)', a: '전치사', why: '~로서' },
      { q: '__As__ I said, he is kind. (접속사 / 전치사)', a: '접속사', why: '주어+동사' },
      { q: 'I used the box __as__ a table. (접속사 / 전치사)', a: '전치사', why: '~로' },
      { q: '__As__ a child, I lived in Jeju. (접속사 / 전치사)', a: '전치사', why: '어렸을 때(아이로서)' },
      { q: '__As__ he grew up, he became shy. (접속사 / 전치사)', a: '접속사', why: '주어+동사' },
      { q: 'He is famous __as__ a writer. (접속사 / 전치사)', a: '전치사', why: '~로서' },
      { q: 'The bell rang __as__ we sat down. (접속사 / 전치사)', a: '접속사', why: '주어+동사' },
      { q: 'She joined the club __as__ a member. (접속사 / 전치사)', a: '전치사', why: '~로서' }] },
    { level: 'Basic ②', type: 'fill', instr: '<보기>에서 알맞은 말을 골라 빈칸에 쓰시오. (한 번씩만 사용)',
      bogi: ['as', 'like', 'such', 'because of', 'because', 'tall', 'well', 'a', 'when', 'than'], items: [
      { q: 'She works [[as]] a nurse at the hospital.', why: '~로서' },
      { q: 'He looks [[like]] his father.', why: 'look like (as ✗)' },
      { q: 'I like fruits [[such]] as apples and bananas.', why: 'such as' },
      { q: 'The game was canceled [[because of]] the rain.', why: '명사구 이유' },
      { q: 'We stayed home [[because]] it was cold.', why: '절 이유' },
      { q: 'Minsu is as [[tall]] as his brother.', why: '원급' },
      { q: 'She can swim as [[well]] as a fish.', why: '부사 원급' },
      { q: 'He is known as [[a]] great scientist.', why: '관사' },
      { q: 'I lived in Daegu [[when]] I was a child.', why: '절 — 때' },
      { q: 'This bag is heavier [[than]] that one.', why: '비교급 than (as ✗)' }] },
    { level: 'Intermediate', type: 'write', instr: '어법상 틀린 부분을 찾아 바르게 고쳐 쓰시오.', items: [
      { q: 'She works like a doctor at a big hospital.', a: 'like → as', why: '직업 — ~로서' },
      { q: 'He is as taller as his dad.', a: 'taller → tall', why: 'as 원급 as' },
      { q: 'As the heavy rain, we stayed inside.', a: 'As → Because of', why: '명사구 이유' },
      { q: 'I like sports such like soccer.', a: 'such like → such as', why: 'such as' },
      { q: 'As a child, I am very shy.', a: 'am → was', why: '어렸을 때 — 과거' },
      { q: 'She is known as great singer.', a: 'as great → as a great', why: '관사' },
      { q: 'He ran as fast as he can.', a: 'can → could', why: '시제 일치' },
      { q: 'We use bikes as form of transportation.', a: 'as form → as a form', why: '본문 — a form' },
      { q: 'This box is as heavy than that one.', a: 'than → as', why: 'as ~ as' },
      { q: 'As he a famous actor, many people know him.', a: 'he a → he is a', why: '접속사 as 뒤 동사' }] },
    { level: 'Advanced · 모두 고르기', type: 'multi', free: true, instr: '해당하는 것을 모두 골라 기호를 쓰시오.', items: [
      { q: '밑줄 친 as가 전치사로 쓰인 것을 모두 고르시오.', box: [
        '(a) He worked __as__ a guide.', '(b) __As__ you know, it’s my birthday.', '(c) I used my coat __as__ a pillow.',
        '(d) __As__ a student, you should study hard.', '(e) __As__ it got dark, we hurried.'], a: '(a), (c), (d)', why: '뒤에 명사구' },
      { q: '다음 중 밑줄 친 부분에 대한 설명으로 옳은 것을 모두 고르시오.', box: [
        '(a) People use bikes __as__ a form of transportation. → ‘~로서’의 전치사이다.', '(b) He is __as__ tall as me. → 원급 비교의 as이다.',
        '(c) __As__ I was late, I ran. → 전치사이다.', '(d) fruits __such as__ apples → ‘~와 같은’ 예시이다.', '(e) __As__ a child, … → ‘아이 때문에’로 해석한다.'], a: '(a), (b), (d)', why: '(c) 접속사 (e) 어렸을 때' },
      { q: '다음 글의 밑줄 친 ⓐ~ⓔ 중 어법상 어색한 것을 모두 골라 기호를 쓰고 바르게 고치시오.', fix: true, label: '기호 / 고친 것', box: [
        'My aunt works ⓐ __like__ a scientist. ⓑ __As__ a child, she loved science. She is ⓒ __as smart as__ Einstein, my mom says. ⓓ __As__ she studies data, she uses tools ⓔ __such like__ computers.'],
        a: 'ⓐ like → as, ⓔ such like → such as', why: 'ⓐ 직업 ~로서 ⓔ such as' },
      { q: '밑줄 친 as의 뜻이 서로 같은 것끼리 짝지은 것을 모두 고르시오.', box: [
        '(a) She works __as__ a vet. / He spoke __as__ a leader.', '(b) __As__ it was hot, … / __As__ he was ill, …', '(c) __As__ I said, … / __As__ he grew, …',
        '(d) __As__ time passed, … / __As__ we got older, …', '(e) __As__ a boy, … / __As__ you know, …'], a: '(a), (b), (d)', why: '(c) 양태–비례 (e) 전치사–양태' },
      { q: '빈칸에 as가 들어갈 수 없는 것을 모두 고르시오.', box: [
        '(a) He looks ______ a movie star.', '(b) She is known ______ a kind teacher.', '(c) I’m taller ______ my sister.',
        '(d) ______ it was dark, I turned on the light.', '(e) Do it ______ I told you.'], a: '(a), (c)', why: '(a) like (c) than' }] },
    { level: 'Advanced · 객관식', type: 'mcq', free: true, instr: '알맞은 답을 고르시오.', items: [
      { q: '다음 중 밑줄 친 as의 쓰임이 나머지 넷과 다른 것은?', opts: [
        '__As__ it was late, we went home.', 'She got wiser __as__ she got older.', '__As__ I told you, we’ll meet at six.',
        'People use bikes __as__ a form of transportation.', 'He called me __as__ I was writing a report.'], a: '④', why: '④ 전치사 / 나머지 접속사' },
      { q: '다음 중 어법상 옳은 문장은?', opts: [
        'She works like a chef.', 'He is as busier as his dad.', 'I used a book as a fan.', 'As the noise, I couldn’t sleep.', 'I like animals such like dogs.'], a: '③', why: '① as ② busy ④ Because of ⑤ such as' },
      { q: '다음 중 밑줄 친 as의 뜻이 ‘~로서’인 것의 개수는?', box: ['(a) He works __as__ a pilot.', '(b) __As__ it rained, we stayed in.', '(c) __As__ a leader, she was great.', '(d) I used it __as__ a cup.', '(e) __As__ you know, I’m busy.'],
        opts: ['1개', '2개', '3개', '4개', '5개'], a: '③', why: '(a)(c)(d)' },
      { q: '(A)~(C)에 알맞은 말이 바르게 짝지어진 것은? — (A) She works ( as / like ) a nurse. (B) He looks ( as / like ) his mom. (C) ( As / Because of ) it was cold, I wore gloves.', opts: [
        'as – like – As', 'like – as – As', 'as – as – Because of', 'like – like – Because of', 'as – like – Because of'], a: '①', why: '~로서 / ~처럼 보이다 / 절 앞 As' },
      { q: '다음 우리말을 영어로 바르게 옮긴 것은? — ‘사람들은 환경을 위해 교통수단으로 자전거를 사용하고 있다.’', opts: [
        'People are using bikes like a form of transportation for the environment.', 'People are using bikes as a form of transportation for the environment.',
        'People are using bikes as form of transportation for the environment.', 'People are using bikes such as a form of transportation for the environment.', 'People are using bikes as a form transportation for the environment.'], a: '②', why: '전치사 as + a form of' }] },
  ], m),

  // ---------- PERFECT CHECK ----------
  D.section('PERFECT CHECK', '상위권 함정 체크'),
  ...D.drill(null, '', [{ level: '함정', type: 'choice', instr: '실수하기 쉬운 문장들이에요. 괄호 안에서 알맞은 것을 고르시오.', items: [
    { q: '(As / Because of) the heavy snow, the school was closed.', a: 'Because of', why: '명사구' },
    { q: 'As information technology (develop / develops), data grows.', a: 'develops', why: '단수 주어' },
    { q: 'She got wiser as she got (old / older).', a: 'older', why: '비례 — 비교급' },
    { q: 'Health experts forecast a disease just as weather experts (forecast / forecasts) the weather.', a: 'forecast', why: '복수 주어' },
    { q: 'He works (as / like) a reporter.', a: 'as', why: '~로서' },
    { q: 'As I (tell / told) you yesterday, the class is canceled.', a: 'told', why: '과거' },
    { q: '(As / Being) it was cold, I closed the window.', a: 'As', why: '주어+동사가 있는 절 앞은 접속사' },
    { q: '(Using / Used) various methods, experts analyze big data.', a: 'Using', why: '분사구문 복습' },
    { q: 'He is as (strong / stronger) as his brother.', a: 'strong', why: 'as 원급 as' },
    { q: 'As the plane took off, I (feel / felt) nervous.', a: 'felt', why: '시제 일치' }] }], m),

  // ---------- WRITE ----------
  D.section('WRITE', '서술형 대비'),
  ...D.writeItem(1, 'Basic', '괄호 안의 단어를 알맞은 형태로 바꾸어 쓰시오.', ['As information technology (develop), the amount of data is getting greater.'], { a: 'develops', why: '단수 주어 · 현재' }, m),
  ...D.writeItem(2, 'Basic', '괄호 안의 단어를 알맞은 형태로 바꾸어 쓰시오.', ['She got wiser as she got (old).'], { a: 'older', why: '비례 — 비교급' }, m),
  ...D.writeItem(3, 'Intermediate', '두 문장을 접속사 as를 사용하여 한 문장으로 연결하시오. [두 문장 연결]', ['Jane was very tired. She went to bed early.'], { a: 'As Jane was very tired, she went to bed early.', why: '이유 as' }, m),
  ...D.writeItem(4, 'Intermediate', '밑줄 친 부분을 접속사 as를 사용한 절로 바꾸어 문장을 다시 쓰시오. [문장 전환]', ['__Being sick__, he stayed home.'], { a: 'As he was sick, he stayed home.', why: '분사구문 → 이유 as절' }, m),
  ...D.writeItem(5, 'Intermediate', '밑줄 친 부분을 because of를 사용하여 같은 뜻의 문장으로 바꾸시오. [문장 전환]', ['__As it rained heavily__, the game was canceled.'], { a: 'Because of the heavy rain, the game was canceled.', why: '절 → 명사구 (rained heavily → the heavy rain)' }, m),
  ...D.writeItem(6, 'Intermediate', '두 문장을 접속사 as를 사용하여 한 문장으로 연결하시오. [두 문장 연결]', ['Spring comes. It gets warmer and warmer.'], { a: 'As spring comes, it gets warmer and warmer.', why: '비례 as' }, m),
  ...D.writeItem(7, 'Advanced', '우리말과 같은 뜻이 되도록 <조건>에 맞게 영작하시오.', ['날씨 전문가들이 날씨를 예측하듯이 건강 전문가들은 질병을 예측할 수 있다.', '<조건> just as를 사용할 것 · health professionals, forecast, a disease를 사용할 것 · 총 13단어'],
    { a: 'Health professionals can forecast a disease just as weather experts forecast the weather.', why: '본문 문장 · 13단어 (Health/professionals/can/forecast/a/disease/just/as/weather/experts/forecast/the/weather)' }, m),
  ...D.writeItem(8, 'Advanced', '<보기>의 단어를 배열하여 문장을 완성하시오. (필요하면 형태를 바꿀 것)', ['정보 통신 기술이 발달함에 따라 우리가 가진 데이터의 양이 훨씬 더 많아지고 있다.', '<보기> as / information and communication technology / develop / the amount of data / we have / is getting / much / great'],
    { a: 'As information and communication technology develops, the amount of data we have is getting much greater.', why: 'develop → develops, great → greater' }, m),
  ...D.writeItem(9, 'Advanced', '어법상 틀린 부분 2개를 찾아 바르게 고치고, 그 이유를 쓰시오.', ['As the heavy rain, we stayed home. As time go by, we got bored.'],
    { a: '① As → Because of  ② go → went', why: '① 명사구 앞 → because of ② 과거 시제·as 뒤 동사 일치(we got)', blanks: ['고친 것', '이유'] }, m),
  ...D.writeItem(10, 'Advanced', '어법상 틀린 부분 2개를 찾아 바르게 고치고, 그 이유를 쓰시오.', ['My uncle works like a chef. As I told you yesterday, he is as busier as a bee.'],
    { a: '① like → as  ② busier → busy', why: '① 직업 — 전치사 as(~로서) ② as 원급 as', blanks: ['고친 것', '이유'] }, m),

  // ---------- MAP ----------
  D.section('MAP', "DAVID'S MAP — 백지노트 테스트"),
  D.P([D.T('오늘 배운 내용을 떠올리며 빈칸을 채워 보세요. 책을 보지 않고!', { size: 18, color: '595959' })], { spacing: { after: 120 }, keepNext: true }),
  ...D.image(path.join(__dirname, 'map_G-접속사as.png'), 620),
  ...D.table(['자가 체크 — 백지노트에 이 단어들이 들어갔나요?', '✔'], [
    ['as 뒤 주어 + 동사 = 접속사', ''], ['시간·동시: ~할 때, ~하면서 (= when, while)', ''], ['비례: ~함에 따라 (grow · get · develop + 비교급)', ''],
    ['이유: ~ 때문에 (= because, since)', ''], ['양태: ~하듯이, ~대로 (just as, as I told you)', ''], ['전치사 as = ~로서 (+ 명사)', ''],
    ['명사구 이유 → because of', ''], ['as 원급 as / such as', ''], ['본문: As information and communication technology develops, …', ''], ['본문: … just as weather experts forecast the weather.', '']], [8838, 800], m),
  ...D.memo(['다음 시간 도입: as 뜻 분류 OX 10문항 (시간·이유·비례·양태·전치사)', '약한 반: Point 1·2만, Point 3 전치사 as는 구별 문항 위주', '분사구문과 묶어 As절 ↔ 분사구문 전환 5문항 추가 연습'], m),
];
D.render(meta, build, process.argv[2] || '.').then(f => console.log(f.join('\n')));
