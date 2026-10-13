const D = require('./david_base');
const path = require('path');
const COVER = JSON.parse(process.env.COVER || '{}');
const meta = { series: D.SERIES.G, code: 'G-분사구문', title: '분사구문', category: 'G. 분사  |  분사구문',
  rightText: 'G  분사구문', prefix: process.env.PREFIX || '', cover: COVER.title ? COVER : undefined,
  question: 'When I walked along the street, I saw a man. / ~~Walking~~ along the street, I saw a man. — 접속사도 주어도 없는데 어떻게 같은 뜻이 될까?' };

const build = (m) => [
  D.section('FLOW', 'Teaching Flow — 처음 배우는 사람도 따라오는 5단계'),
  ...D.step(1, '우리말로 먼저 생각하기 — ‘~하면서, ~할 때, ~해서’', [
    '‘나는 음악을 들으면서 숙제를 했다.’ → 누가 들었나? {{나}}  누가 숙제했나? {{나}} — 주어가 같다!',
    '우리말도 ‘내가 음악을 들을 때 나는 숙제를 했다’라고 주어를 두 번 말하지 않는다.'], m),
  ...D.step(2, '이전 단원 복습 — 현재분사 · 과거분사', [
    'a **sleeping** baby (잠자고 있는 아기) → 능동·진행 = {{현재분사}}',
    'a **broken** window (깨진 창문) → 수동·완료 = {{과거분사}}'], m),
  ...D.step(3, '문제 제기 — 부사절이 너무 길다!', [
    '**When I walked** along the street, **I** saw a man with five dogs.',
    '접속사 when + 주어 I + 동사 walked … 주절의 주어도 I. 반복되는 부분을 줄일 수 없을까?'], m),
  ...D.step(4, '규칙 발견 — 3단계로 줄이기', [
    '① 접속사 {{when}} 지우기 → ② 주절과 같은 주어 {{I}} 지우기 → ③ 동사 walked → {{walking}} (동사원형 + -ing)',
    '→ **Walking** along the street, I saw a man with five dogs.'], m),
  ...D.step(5, '결론 🔑', [
    '분사구문 = 부사절을 {{분사}}로 시작하는 구로 줄인 것. 의미(시간·이유·조건·양보·동시동작)는 {{문맥}}으로 판단한다.'], m),
  ...D.infoBox('오늘의 핵심 3문장', [
    '① 접속사 생략 → 같은 주어 생략 → 동사를 {{-ing}}로',
    '② 부정은 분사 {{앞}}에 not / never',
    '③ Being / Having been은 {{생략}} 가능 → 과거분사로 시작하면 수동'], m),
  ...D.tip(['STEP 4는 칠판에 부사절을 쓰고 지우개로 직접 지우며 3단계를 보여 준다(5분).', '교과서 문장 Using various methods, experts analyze big data.를 원래 부사절로 되돌려 보게 한다.'], m),

  // ---------------- Point 1 ----------------
  D.section('Point 1', '분사구문 만드는 법 — 접속사 · 주어 · 동사', 'point'),
  ...D.table(['단계', '할 일', '예'], [
    ['①', '접속사 지우기', '~~When~~ she heard the news, she cried.'],
    ['②', '주절과 **같은 주어** 지우기', '~~she~~ heard the news'],
    ['③', '동사 → **동사원형 + -ing** (시제는 주절이 알려 줌)', '**Hearing** the news, she cried.'],
    ['주의', 'be동사 → **Being** (뒤에 형용사·명사)', 'As he was sick → **Being** sick, he stayed home.']], [1200, 4300, 4138], m),
  ...D.trick('접·주·잉!', ['접속사 빼고, 주어 빼고, 동사엔 잉! — “접·주·잉!”']),
  ...D.examPoint([
    { q: 'As they use various methods, experts analyze big data. = [[Using]] various methods, experts analyze big data.', a: 'Using', why: '접속사 As·같은 주어 they 생략, use → using' },
    { q: 'While she ate a sandwich, she waited for the train. = (Eating / Eaten) a sandwich, she waited for the train.', a: 'Eating', why: '그녀가 먹는 능동 → 현재분사' }], m),
  ...D.caution(['동사원형으로 시작하는 오답(Use various methods, …) — 명령문 + 콤마는 문장 2개라 어법상 틀림', '주어를 남겨 둔 오답(They using …)을 고르게 하는 선지가 자주 나온다.'], m),
  ...D.drill(1, '분사구문 만드는 법', [
    { level: 'Basic ①', type: 'choice', instr: '괄호 안에서 알맞은 것을 고르시오.', items: [
      { q: '(Walk / Walking) along the beach, we found a pretty shell.', a: 'Walking', why: '접속사·주어 생략 → 동사원형+-ing' },
      { q: '(Opening / Opened) the box, Tom smiled happily.', a: 'Opening', why: 'Tom이 여는 능동' },
      { q: '(Feel / Feeling) tired, I went to bed early.', a: 'Feeling', why: 'As I felt tired → Feeling' },
      { q: '(Being / Be) hungry, the kids ate everything on the table.', a: 'Being', why: 'be동사 → Being' },
      { q: '(Listening / Listened) to music, she cleaned her room.', a: 'Listening', why: '그녀가 듣는 능동' },
      { q: '(Arrive / Arriving) at the station, he called his mom.', a: 'Arriving', why: '동사원형으로 시작하면 명령문' },
      { q: '(Watching / Watches) TV, my brother fell asleep.', a: 'Watching', why: '분사구문에는 시제·수 표시 없음' },
      { q: '(Taking / Took) a deep breath, she began her speech.', a: 'Taking', why: '과거형은 분사구문 불가' },
      { q: '(Using / Used) a smartphone, you can find the way easily.', a: 'Using', why: '네가 사용하는 능동' },
      { q: '(Turning / Turn) left, you will see the library.', a: 'Turning', why: 'If you turn left → Turning' }] },
    { level: 'Basic ②', type: 'fill', instr: '<보기>에서 알맞은 말을 골라 빈칸에 쓰시오. (한 번씩만 사용)',
      bogi: ['Being', 'Reading', 'Waving', 'Singing', 'Having', 'Checking', 'Riding', 'Looking', 'Living', 'Saying'], items: [
      { q: '[[Waving]] his hand, he walked out of the house.', why: '손을 흔들며 — wave + -ing' },
      { q: '[[Reading]] the article, he dropped his cup in surprise.', why: '기사를 읽다가' },
      { q: '[[Singing]] a song, the girl rode her bike.', why: '노래를 부르며' },
      { q: '[[Being]] a good cook, my dad often makes dinner.', why: 'As he is a good cook → Being' },
      { q: '[[Having]] no money, I couldn’t buy the ticket.', why: 'have의 -ing' },
      { q: '[[Checking]] the map, we found the museum.', why: '지도를 확인하며' },
      { q: '[[Riding]] a bike, you should wear a helmet.', why: 'When you ride → Riding' },
      { q: '[[Looking]] out the window, she saw snow falling.', why: '창밖을 보다가' },
      { q: '[[Living]] near the sea, they eat a lot of fish.', why: 'live → living (e 빼고 -ing)' },
      { q: '[[Saying]] goodbye, she got on the train.', why: '작별 인사를 하며' }] },
    { level: 'Intermediate', type: 'write', instr: '어법상 틀린 부분을 찾아 바르게 고쳐 쓰시오.', items: [
      { q: 'Use various methods, experts analyze big data.', a: 'Use → Using', why: '동사원형 + 콤마 + 문장 ✗' },
      { q: 'Felt sleepy, I drank some coffee.', a: 'Felt → Feeling', why: '나는 졸린 능동 → 현재분사' },
      { q: 'Be late for school, Mina ran to the bus stop.', a: 'Be → Being', why: 'be동사 → Being' },
      { q: 'She walking along the street, she met her teacher.', a: 'She walking → Walking', why: '주절과 같은 주어는 생략' },
      { q: 'Waited for the bus, I read a comic book.', a: 'Waited → Waiting', why: '내가 기다리는 능동' },
      { q: 'Studied hard, you will pass the test.', a: 'Studied → Studying', why: 'If you study → Studying' },
      { q: 'Lived in Seoul, he knows the city very well.', a: 'Lived → Living', why: 'As he lives → Living' },
      { q: 'Smiles brightly, the baby looked at her mom.', a: 'Smiles → Smiling', why: '분사구문 = -ing' },
      { q: 'To hear the news, he jumped with joy.', a: 'To hear → Hearing', why: '소식을 듣고(때) — 분사구문' },
      { q: 'Was tired, she took a short nap.', a: 'Was → Being', why: 'As she was tired → Being' }] },
    { level: 'Advanced · 모두 고르기', type: 'multi', free: true, instr: '해당하는 것을 모두 골라 기호를 쓰시오.', items: [
      { q: '다음 중 어법상 옳은 문장을 모두 고르시오.', box: [
        '(a) Eating a sandwich, she waited for the train.', '(b) Use a map, we found the way.', '(c) Being sick, he stayed in bed.',
        '(d) He opening the door, he saw a cat.', '(e) Wear a coat, she went out.'], a: '(a), (c)', why: '(b) Using (d) 주어 생략 Opening (e) Wearing' },
      { q: '다음 중 밑줄 친 부분에 대한 설명으로 옳은 것을 모두 고르시오.', box: [
        '(a) __Using__ various methods, experts analyze big data. → 접속사와 주어 they가 생략되었다.',
        '(b) __Waving__ his hand, he walked out. → 주어는 his hand이다.',
        '(c) __Being__ tired, I slept early. → be동사가 Being으로 바뀐 것이다.',
        '(d) __Walking__ along the street, I saw a man. → 동명사 주어이다.',
        '(e) __Feeling__ cold, she closed the window. → As she felt cold로 바꿀 수 있다.'], a: '(a), (c), (e)', why: '(b) 주어는 he (d) 분사구문(동명사 주어 아님)' },
      { q: '다음 글의 밑줄 친 ⓐ~ⓔ 중 어법상 어색한 것을 모두 골라 기호를 쓰고 바르게 고치시오.', fix: true, label: '기호 / 고친 것', box: [
        'Last Sunday, ⓐ __walked__ in the park, I met Jiho. ⓑ __Holding__ a big bag, he looked busy. ⓒ __Be__ curious, I asked him about it. ⓓ __Smiling__, he showed me a puppy. ⓔ __Feeling__ happy, we played with it.'],
        a: 'ⓐ walked → walking, ⓒ Be → Being', why: 'ⓐ 내가 걷는 능동 -ing ⓒ be → Being' },
      { q: '다음 중 두 문장의 뜻이 같은 것을 모두 고르시오.', box: [
        '(a) When I saw her, I waved. = Seeing her, I waved.', '(b) As he was hungry, he ate a lot. = Hungry he was, he ate a lot.',
        '(c) While I listened to music, I studied. = Listening to music, I studied.', '(d) If you take this bus, you will get there. = Take this bus, you will get there.',
        '(e) As she lives near school, she walks there. = Living near school, she walks there.'], a: '(a), (c), (e)', why: '(b) Being hungry (d) Taking this bus' },
      { q: '다음 중 어법상 틀린 문장을 모두 고르시오.', box: [
        '(a) Having a cold, I couldn’t go out.', '(b) Opened the window, he felt a cool breeze.', '(c) Turning right, you can see the bank.',
        '(d) Being a student, she can get a discount.', '(e) Knew the answer, he raised his hand.'], a: '(b), (e)', why: '(b) Opening (e) Knowing' }] },
    { level: 'Advanced · 객관식', type: 'mcq', free: true, instr: '알맞은 답을 고르시오.', items: [
      { q: '다음 문장을 분사구문으로 바르게 바꾼 것은? — When he heard the news, he started crying.', opts: [
        'Heard the news, he started crying.', 'He hearing the news, he started crying.', 'Hearing the news, he started crying.',
        'To hear the news, he started crying.', 'Hear the news, he started crying.'], a: '③', why: '접속사·같은 주어 생략, heard → hearing' },
      { q: '다음 빈칸에 들어갈 말로 알맞은 것은? — ________ a lot of homework, I can’t go out today.', opts: ['Have', 'Had', 'Having', 'To have', 'Has'], a: '③', why: 'As I have → Having' },
      { q: '다음 중 어법상 틀린 문장의 개수는?', box: ['(a) Walking to school, I met Sumi.', '(b) Felt hungry, he ate a pizza.', '(c) Being kind, she helps everyone.', '(d) Sat on the grass, the girl fed birds.', '(e) Waving her hand, she said goodbye.'],
        opts: ['1개', '2개', '3개', '4개', '5개'], a: '②', why: '(b) Feeling (d) Sitting' },
      { q: '다음 두 문장을 한 문장으로 바르게 바꾼 것은? — She took off her hat. She said, “Nice to meet you!”', opts: [
        'Took off her hat, she said, “Nice to meet you!”', 'Taking off her hat, she said, “Nice to meet you!”', 'She taking off her hat, she said, “Nice to meet you!”',
        'Taken off her hat, she said, “Nice to meet you!”', 'Take off her hat, she said, “Nice to meet you!”'], a: '②', why: '같은 주어 생략 + take → taking' },
      { q: '다음 중 밑줄 친 부분의 쓰임이 나머지 넷과 다른 것은?', opts: ['__Reading__ a book, she drank tea.', '__Walking__ home, I met Tom.', '__Reading__ books is my hobby.',
        '__Feeling__ tired, he lay down.', '__Smiling__ at me, she came in.'], a: '③', why: '③ 동명사 주어 / 나머지 분사구문' }] },
    { level: '전환 · 연결', type: 'write', instr: '밑줄 친 부분을 분사구문으로 바꾸어 쓰시오.', items: [
      { q: '__When I opened the door__, I saw a big box.', a: 'Opening the door', why: '접속사·주어 생략, opened → opening' },
      { q: '__As she was tired__, she went to bed early.', a: 'Being tired', why: 'was → Being' },
      { q: '__While he was waiting for the bus__, he read a book.', a: '(Being) Waiting for the bus', why: 'was waiting → Waiting (Being 생략)' },
      { q: '__If you turn left__, you will find the bank.', a: 'Turning left', why: '조건 — 주어 you 생략' },
      { q: '__As I live near the park__, I often go jogging.', a: 'Living near the park', why: 'live → living' },
      { q: '__When she saw me__, she ran to me.', a: 'Seeing me', why: 'saw → seeing' },
      { q: '__As they use smartphones__, people can do many things.', a: 'Using smartphones', why: '같은 주어(they=people) 생략' },
      { q: '__While I was eating dinner__, I watched the news.', a: '(Being) Eating dinner', why: 'Being은 생략 가능' },
      { q: '__As he had a fever__, he didn’t go to school.', a: 'Having a fever', why: 'had → having' },
      { q: '__When we arrived at the hotel__, we were very tired.', a: 'Arriving at the hotel', why: 'arrived → arriving' }] },
  ], m),

  // ---------------- Point 2 ----------------
  D.section('Point 2', '분사구문의 의미 — 시간 · 이유 · 조건 · 양보 · 동시동작 · 연속동작', 'point'),
  ...D.table(['의미', '원래 접속사', '예문'], [
    ['시간', 'when, while, after', '**Walking** along the street, I saw a man. (걷다가)'],
    ['이유', 'as, because, since', '**Feeling** tired, I went to bed early. (피곤해서)'],
    ['조건', 'if', '**Turning** left, you will see the bank. (돌면)'],
    ['양보', 'though, although', '**Living** next door, I rarely see him. (살지만)'],
    ['동시동작', 'as, while', '**Eating** a sandwich, she waited for the train. (먹으면서)'],
    ['연속동작', 'and', 'He left at six, **arriving** at nine. (그리고 도착했다)']], [1500, 2300, 5838], m),
  ...D.trick('시이조양동연', ['“시·이·조·양·동·연” — 시원한 이 조양(朝陽)이 동연(同年)에 떴다!', '모르겠으면 ‘~해서 / ~하면서’부터 넣어 보기']),
  ...D.examPoint([
    { q: '__Using__ various methods, experts analyze big data. 의미: {{동시동작 (사용하여 / 사용하면서)}}', why: '방법을 쓰면서 분석' },
    { q: '__Being__ late, he took a taxi. = {{As(Because)}} he was late, he took a taxi.', why: '이유' }], m),
  ...D.caution(['접속사를 고르는 객관식: 조건(If)은 주절에 will/can이 오는 경우가 많다.', '양보는 though/although — 의미가 반대인 두 내용이 이어진다(살지만 거의 못 본다).'], m),
  ...D.drill(2, '분사구문의 의미', [
    { level: 'Basic ①', type: 'choice', instr: '밑줄 친 분사구문의 의미로 알맞은 것을 고르시오.', items: [
      { q: '__Feeling__ sick, Mina stayed home. (이유 / 조건)', a: '이유', why: '아파서 집에 있었다' },
      { q: '__Turning__ right, you will find the post office. (양보 / 조건)', a: '조건', why: '돌면 찾을 것이다' },
      { q: '__Walking__ to school, I met my friend. (시간 / 양보)', a: '시간', why: '걸어가다가' },
      { q: '__Smiling__ brightly, she waved at me. (동시동작 / 조건)', a: '동시동작', why: '웃으면서 손을 흔들었다' },
      { q: '__Having__ no umbrella, he got wet. (이유 / 조건)', a: '이유', why: '우산이 없어서' },
      { q: '__Taking__ this bus, you will get to the museum. (조건 / 양보)', a: '조건', why: '타면 도착할 것이다' },
      { q: '__Arriving__ home, I took a shower. (시간 / 이유)', a: '시간', why: '집에 도착했을 때(후)' },
      { q: '__Living__ next door, I rarely see her. (조건 / 양보)', a: '양보', why: '옆집에 살지만 거의 못 본다' },
      { q: '__Listening__ to music, he did his homework. (동시동작 / 이유)', a: '동시동작', why: '들으면서' },
      { q: '__Being__ a doctor, my aunt knows a lot about health. (이유 / 시간)', a: '이유', why: '의사여서' }] },
    { level: 'Basic ②', type: 'fill', instr: '분사구문을 부사절로 바꿀 때 <보기>에서 알맞은 접속사를 골라 쓰시오. (한 번씩만 사용)',
      bogi: ['When', 'As', 'If', 'Though', 'While', 'Because', 'After', 'Since', 'Although', 'Unless'], items: [
      { q: 'Seeing the police, the thief ran away. → [[When]] the thief saw the police, he ran away.', why: '보았을 때' },
      { q: 'Turning left, you will see the bank. → [[If]] you turn left, you will see the bank.', why: '조건 + will' },
      { q: 'Living next door, I rarely talk to him. → [[Though]] I live next door, I rarely talk to him.', why: '양보' },
      { q: 'Eating popcorn, we watched a movie. → [[While]] we ate popcorn, we watched a movie.', why: '~하는 동안' },
      { q: 'Being sick, she couldn’t come. → [[Because]] she was sick, she couldn’t come.', why: '이유' },
      { q: 'Finishing his homework, he went out to play. → [[After]] he finished his homework, he went out to play.', why: '끝낸 후에' },
      { q: 'Having no time, I skipped breakfast. → [[Since]] I had no time, I skipped breakfast.', why: '이유(since)' },
      { q: 'Knowing the answer, he didn’t say anything. → [[Although]] he knew the answer, he didn’t say anything.', why: '양보' },
      { q: 'Feeling cold, she put on a coat. → [[As]] she felt cold, she put on a coat.', why: '이유(as)' },
      { q: 'Not hurrying, you will miss the train. → [[Unless]] you hurry, you will miss the train.', why: 'If you don’t hurry = Unless you hurry' }] },
    { level: 'Intermediate', type: 'write', instr: '분사구문의 의미에 맞지 않는 접속사를 찾아 바르게 고쳐 쓰시오.', items: [
      { q: 'Turning left, you will see a church. = Though you turn left, you will see a church.', a: 'Though → If', why: '조건' },
      { q: 'Being tired, he went to bed early. = Unless he was tired, he went to bed early.', a: 'Unless → As(Because)', why: '이유' },
      { q: 'Living near the school, she is often late. = Because she lives near the school, she is often late.', a: 'Because → Though(Although)', why: '가까이 사는데도 늦는다 — 양보' },
      { q: 'Walking home, I met Mr. Kim. = If I walked home, I met Mr. Kim.', a: 'If → When(While)', why: '시간' },
      { q: 'Having a cold, she stayed in bed. = Although she had a cold, she stayed in bed.', a: 'Although → As(Because)', why: '이유' },
      { q: 'Pressing this button, you can turn on the TV. = After you press this button, you can turn on the TV.', a: 'After → If', why: '조건 — 누르면 켤 수 있다' },
      { q: 'Being rich, he never wastes money. = Because he is rich, he never wastes money.', a: 'Because → Though(Although)', why: '부자지만 낭비하지 않는다 — 양보' },
      { q: 'Watching TV, she ate dinner. = Because she watched TV, she ate dinner.', a: 'Because → While', why: '동시동작' },
      { q: 'Seeing me, the dog wagged its tail. = Though the dog saw me, it wagged its tail.', a: 'Though → When', why: '시간' },
      { q: 'Studying hard, you will get good grades. = Though you study hard, you will get good grades.', a: 'Though → If', why: '조건' }] },
    { level: 'Advanced · 모두 고르기', type: 'multi', free: true, instr: '해당하는 것을 모두 골라 기호를 쓰시오.', items: [
      { q: '밑줄 친 분사구문이 ‘이유’를 나타내는 것을 모두 고르시오.', box: [
        '(a) __Being__ hungry, I ate two bowls of rice.', '(b) __Walking__ along the river, we talked a lot.', '(c) __Having__ a headache, she took some medicine.',
        '(d) __Turning__ the corner, you will see it.', '(e) __Feeling__ nervous, he couldn’t say a word.'], a: '(a), (c), (e)', why: '(b) 동시동작 (d) 조건' },
      { q: '다음 중 밑줄 친 부분에 대한 설명으로 옳은 것을 모두 고르시오.', box: [
        '(a) __Living__ next door, I rarely see him. → Though I live next door로 바꿀 수 있다.',
        '(b) __Opening__ the window, you’ll feel fresh air. → 조건을 나타낸다.',
        '(c) __Eating__ a sandwich, she waited for the train. → 이유를 나타낸다.',
        '(d) He left at six, __arriving__ in Busan at nine. → 연속동작을 나타낸다.',
        '(e) __Using__ various methods, experts analyze big data. → 양보를 나타낸다.'], a: '(a), (b), (d)', why: '(c) 동시동작 (e) 동시동작(방법)' },
      { q: '다음 대화의 밑줄 친 ⓐ~ⓔ 중 문맥상 어색한 것을 모두 골라 기호를 쓰고 바르게 고치시오.', fix: true, label: '기호 / 고친 것', box: [
        'A: ⓐ __Being__ tired, why did you go out? B: I needed medicine. ⓑ __Felt__ sick, I went to the drugstore. A: ⓒ __Walking__ there, did you see Tom? B: Yes. ⓓ __Talk__ on the phone, he passed by. A: ⓔ __Taking__ the medicine, you’ll feel better.'],
        a: 'ⓑ Felt → Feeling, ⓓ Talk → Talking', why: 'ⓑ 내가 느끼는 능동 ⓓ 동시동작 -ing' },
      { q: '부사절로 바꿀 때 접속사가 바르게 쓰인 것을 모두 고르시오.', box: [
        '(a) Seeing the dog, she screamed. → When she saw the dog, she screamed.', '(b) Taking a taxi, you will be on time. → Though you take a taxi, you will be on time.',
        '(c) Being sleepy, I drank coffee. → As I was sleepy, I drank coffee.', '(d) Knowing her well, I can’t understand her. → Although I know her well, I can’t understand her.',
        '(e) Hearing the song, he cried. → If he heard the song, he cried.'], a: '(a), (c), (d)', why: '(b) If (e) When' },
      { q: '다음 중 분사구문의 의미가 같은 것끼리 짝지은 것을 모두 고르시오.', box: [
        '(a) Feeling hungry, … / Being sick, … (이유 – 이유)', '(b) Turning left, … / Walking home, … (조건 – 조건)', '(c) Smiling at me, … / Singing a song, … (동시동작 – 동시동작)',
        '(d) Living next door, … / Having no money, … (양보 – 양보)', '(e) Seeing me, … / Arriving home, … (시간 – 시간)'], a: '(a), (c), (e)', why: '(b) 조건–시간 (d) 양보–이유' }] },
    { level: 'Advanced · 객관식', type: 'mcq', free: true, instr: '알맞은 답을 고르시오.', items: [
      { q: '밑줄 친 부분을 부사절로 바꿀 때 알맞은 것은? — __Turning to the right__, you will find the store.', opts: [
        'Though you turn to the right', 'If you turn to the right', 'Because you turn to the right', 'While you turned to the right', 'Unless you turn to the right'], a: '②', why: '조건 + will' },
      { q: '다음 중 밑줄 친 분사구문의 의미가 나머지와 다른 것은?', opts: [
        '__Being__ busy, I couldn’t call you.', '__Feeling__ cold, she shut the door.', '__Having__ a fever, he went to the doctor.',
        '__Living__ near the sea, she can’t swim.', '__Losing__ my key, I couldn’t get in.'], a: '④', why: '④ 양보 / 나머지 이유' },
      { q: '빈칸에 들어갈 말이 바르게 짝지어진 것은? — (A) ______ the news, he got angry. (B) ______ the button, you can start the game.', opts: [
        'Heard – Press', 'Hearing – Pressing', 'Hearing – Pressed', 'Heard – Pressing', 'To hear – Press'], a: '②', why: '둘 다 능동 -ing' },
      { q: '다음 중 우리말을 영어로 바르게 옮긴 것은? — ‘그는 피곤했지만 계속 일했다.’', opts: [
        'Being tired, he kept working.', 'Though he was tired, he stopped working.', 'Tired he was, he kept working.',
        'Because he was tired, he kept working.', 'If he is tired, he keeps working.'], a: '①', why: '양보의 분사구문 (Being 생략 가능)' },
      { q: '다음 중 (A)~(C)의 의미로 알맞은 것은? — (A) __Arriving__ at the airport, I called Mom. (B) __Studying__ harder, you will pass. (C) __Living__ in Korea for years, he can’t speak Korean.', opts: [
        '시간 – 조건 – 양보', '시간 – 이유 – 양보', '이유 – 조건 – 시간', '조건 – 조건 – 양보', '시간 – 조건 – 이유'], a: '①', why: '도착했을 때 / 공부하면 / 살았지만' }] },
    { level: '전환 · 연결', type: 'write', instr: '분사구문을 괄호 안의 접속사를 사용하여 부사절로 바꾸어 쓰시오.', items: [
      { q: 'Seeing the teacher, the students stood up. (when)', a: 'When the students saw the teacher', why: '주어를 주절에서 가져와 시제 맞추기' },
      { q: 'Feeling thirsty, I drank a glass of water. (as)', a: 'As I felt thirsty', why: '주절 시제 과거' },
      { q: 'Turning left, you will see the hospital. (if)', a: 'If you turn left', why: '조건절은 현재시제' },
      { q: 'Living next door, she never says hello to me. (though)', a: 'Though she lives next door', why: '양보 · 현재' },
      { q: 'Having no money, he couldn’t buy lunch. (because)', a: 'Because he had no money', why: '과거' },
      { q: 'Walking in the park, we saw a squirrel. (while)', a: 'While we were walking(walked) in the park', why: '진행 의미 가능' },
      { q: 'Using this app, you can rent a bike easily. (if)', a: 'If you use this app', why: '조건' },
      { q: 'Being a famous singer, she is very humble. (although)', a: 'Although she is a famous singer', why: '양보' },
      { q: 'Hearing the news, Jane began to cry. (when)', a: 'When Jane heard the news', why: '주어 Jane을 절로, 주절은 she' },
      { q: 'Waving his hand, he walked out of the house. (as)', a: 'As he waved his hand', why: '동시동작 as' }] },
  ], m),

  // ---------------- Point 3 ----------------
  D.section('Point 3', '부정 분사구문 · 수동 분사구문 (Being p.p. → p.p.)', 'point'),
  ...D.table(['형태', '만드는 법', '예'], [
    ['부정', '**Not / Never** + 분사 (분사 앞!)', '**Not knowing** what to do, I called Mom.'],
    ['수동', '(Being) + 과거분사', '(Being) **Written** in easy English, the book is popular.'],
    ['형용사·명사', '(Being) + 형용사/명사 — Being 생략 가능', '(Being) **Tired**, he slept early.']], [1800, 3600, 4238], m),
  ...D.trick('낫은 맨 앞, 수동은 p.p.!', ['“낫 들고 맨 앞에!” — Not은 분사 앞', '“주어가 당했으면 p.p.!”']),
  ...D.examPoint([
    { q: '(Not knowing / Knowing not) his number, I couldn’t call him.', a: 'Not knowing', why: '부정어는 분사 앞' },
    { q: '(Surprising / Surprised) by the noise, the baby woke up.', a: 'Surprised', why: '아기가 놀람을 당함 — Being surprised' }], m),
  ...D.caution(['현재분사/과거분사 고르기는 ‘주절의 주어’와의 관계로 판단 — 주어가 하면 -ing, 당하면 p.p.', 'Not 위치 오답(Knowing not)과 Being 생략 후 형태(Seen from the sky)를 자주 묻는다.'], m),
  ...D.drill(3, '부정 · 수동 분사구문', [
    { level: 'Basic ①', type: 'choice', instr: '괄호 안에서 알맞은 것을 고르시오.', items: [
      { q: '(Not having / Having not) a pen, I borrowed one.', a: 'Not having', why: 'Not은 분사 앞' },
      { q: '(Seeing / Seen) from the sky, the island looks like a heart.', a: 'Seen', why: '섬이 보여지는 수동' },
      { q: '(Writing / Written) in English, the letter was hard to read.', a: 'Written', why: '편지가 쓰인 수동' },
      { q: '(Never / Not never) giving up, she finally won.', a: 'Never', why: 'Never + 분사' },
      { q: '(Exciting / Excited) about the trip, the kids couldn’t sleep.', a: 'Excited', why: '아이들이 신난(감정을 느낀) 수동' },
      { q: '(Making / Made) in Korea, this car is very popular.', a: 'Made', why: '차가 만들어진 수동' },
      { q: '(Not feeling / Feeling not) well, he left early.', a: 'Not feeling', why: 'Not 위치' },
      { q: '(Surrounding / Surrounded) by fans, the singer smiled.', a: 'Surrounded', why: '가수가 둘러싸인 수동' },
      { q: '(Finishing / Finished) the work, she went home.', a: 'Finishing', why: '그녀가 끝낸 능동' },
      { q: '(Tiring / Tired) from the long walk, we took a rest.', a: 'Tired', why: 'Being tired — 우리가 피곤함' }] },
    { level: 'Basic ②', type: 'fill', instr: '<보기>에서 알맞은 말을 골라 빈칸에 쓰시오. (한 번씩만 사용)',
      bogi: ['Not', 'Never', 'Built', 'Shocked', 'Painted', 'Left', 'Taken', 'Covered', 'Born', 'Known'], items: [
      { q: '[[Not]] knowing the answer, she kept silent.', why: '부정' },
      { q: '[[Never]] having seen snow, he was very excited.', why: '한 번도 ~해 본 적 없어서' },
      { q: '[[Built]] 500 years ago, the temple is still beautiful.', why: '절이 지어진 수동' },
      { q: '[[Shocked]] by the news, she couldn’t say a word.', why: '그녀가 충격받음' },
      { q: '[[Painted]] in bright colors, the house looks new.', why: '집이 칠해진 수동' },
      { q: '[[Left]] alone at home, the puppy cried all day.', why: '혼자 남겨진' },
      { q: '[[Taken]] in Jeju, these photos are my favorite.', why: '사진이 찍힌 수동' },
      { q: '[[Covered]] with snow, the mountain looked white.', why: '눈으로 덮인' },
      { q: '[[Born]] in Canada, he speaks English well.', why: 'be born → Born' },
      { q: '[[Known]] as a great writer, she gets many letters.', why: 'be known as' }] },
    { level: 'Intermediate', type: 'write', instr: '어법상 틀린 부분을 찾아 바르게 고쳐 쓰시오.', items: [
      { q: 'Knowing not what to say, he just smiled.', a: 'Knowing not → Not knowing', why: 'Not은 분사 앞' },
      { q: 'Writing in simple English, this book is easy to read.', a: 'Writing → Written', why: '책이 쓰인 수동' },
      { q: 'Exciting about the game, we shouted loudly.', a: 'Exciting → Excited', why: '우리가 흥분함' },
      { q: 'Seeing from far away, the rock looks like a lion.', a: 'Seeing → Seen', why: '바위가 보여지는 수동' },
      { q: 'Not wanted to be late, she ran to school.', a: 'wanted → wanting', why: '그녀가 원하지 않는 능동' },
      { q: 'Making of wood, the chair is very light.', a: 'Making → Made', why: '의자가 만들어진 수동' },
      { q: 'Disappointing with the result, he cried.', a: 'Disappointing → Disappointed', why: '그가 실망함' },
      { q: 'Having never been there, I got lost.', a: 'Having never → Never having', why: '부정어는 맨 앞' },
      { q: 'Inviting to the party, Sumi was very happy.', a: 'Inviting → Invited', why: '수미가 초대받음' },
      { q: 'Followed the map, we reached the top.', a: 'Followed → Following', why: '우리가 따라간 능동' }] },
    { level: 'Advanced · 모두 고르기', type: 'multi', free: true, instr: '해당하는 것을 모두 골라 기호를 쓰시오.', items: [
      { q: '다음 중 어법상 옳은 문장을 모두 고르시오.', box: [
        '(a) Not having breakfast, I was hungry.', '(b) Seen from the hill, the town looks small.', '(c) Interesting in music, he joined the band.',
        '(d) Locking the door, he went to bed.', '(e) Waking not up early, I missed the bus.'], a: '(a), (b), (d)', why: '(c) Interested (e) Not waking' },
      { q: '다음 중 밑줄 친 부분에 대한 설명으로 옳은 것을 모두 고르시오.', box: [
        '(a) __Written__ in 1900, the book is still popular. → Being written에서 Being이 생략되었다.',
        '(b) __Not knowing__ the way, I asked a police officer. → not의 위치가 틀렸다.',
        '(c) __Tired__, he lay down. → 형용사로 시작하는 분사구문이다.',
        '(d) __Surprised__ at the news, she dropped her phone. → 그녀가 다른 사람을 놀라게 했다는 뜻이다.',
        '(e) __Shocking__ the people, the news spread fast. → 뉴스가 사람들을 놀라게 한 능동이다.'], a: '(a), (c), (e)', why: '(b) 올바른 위치 (d) 그녀가 놀람(수동)' },
      { q: '다음 글의 밑줄 친 ⓐ~ⓔ 중 어법상 어색한 것을 모두 골라 기호를 쓰고 바르게 고치시오.', fix: true, label: '기호 / 고친 것', box: [
        'ⓐ __Built__ in 1920, the museum is very old. ⓑ __Filling__ with old paintings, it attracts many visitors. ⓒ __Not knowing__ much about art, I joined a tour. ⓓ __Guided__ by a kind man, we saw many rooms. ⓔ __Amazing__ by the paintings, I took many photos.'],
        a: 'ⓑ Filling → Filled, ⓔ Amazing → Amazed', why: 'ⓑ 박물관이 채워진 수동 ⓔ 내가 놀람' },
      { q: '빈칸에 과거분사가 들어가야 하는 것을 모두 고르시오.', box: [
        '(a) ______ (leave) alone, the baby started to cry.', '(b) ______ (hold) an umbrella, she walked in the rain.', '(c) ______ (wrap) in paper, the gift looked nice.',
        '(d) ______ (turn) off the light, he fell asleep.', '(e) ______ (bore) with the movie, I went out.'], a: '(a), (c), (e)', why: 'Left / Wrapped / Bored — 주어가 당함' },
      { q: '다음 중 Being이 생략된 분사구문을 모두 고르시오.', box: [
        '(a) Tired, I went to bed early.', '(b) Walking home, I saw her.', '(c) Written in French, the menu was hard to read.',
        '(d) Having no money, I stayed home.', '(e) Surrounded by trees, the house is quiet.'], a: '(a), (c), (e)', why: '형용사·과거분사로 시작 = Being 생략' }] },
    { level: 'Advanced · 객관식', type: 'mcq', free: true, instr: '알맞은 답을 고르시오.', items: [
      { q: '다음 문장을 분사구문으로 바르게 바꾼 것은? — As I didn’t know what to do, I asked my teacher.', opts: [
        'Knowing not what to do, I asked my teacher.', 'Not knowing what to do, I asked my teacher.', 'Not knew what to do, I asked my teacher.',
        'Didn’t knowing what to do, I asked my teacher.', 'Known not what to do, I asked my teacher.'], a: '②', why: 'Not + -ing' },
      { q: '빈칸에 알맞은 말이 바르게 짝지어진 것은? — (A) ______ from space, the earth looks blue. (B) ______ the window, she let fresh air in.', opts: [
        'Seen – Opening', 'Seeing – Opening', 'Seen – Opened', 'Seeing – Opened', 'To see – Open'], a: '①', why: '지구가 보여짐 / 그녀가 엶' },
      { q: '다음 중 어법상 옳은 문장의 개수는?', box: ['(a) Not feeling well, he stayed home.', '(b) Written in Korean, the sign was easy to read.', '(c) Interesting in science, she reads a lot.', '(d) Never giving up, he became a pilot.', '(e) Excited about the trip, we packed early.'],
        opts: ['1개', '2개', '3개', '4개', '5개'], a: '④', why: '(c)만 틀림 — Interested' },
      { q: '다음 중 밑줄 친 부분을 바르게 고친 것은? — __Disappointing__ with the score, she didn’t say anything.', opts: [
        'Disappoint', 'Disappointed', 'Being disappointing', 'To disappoint', 'Not disappointing'], a: '②', why: '그녀가 실망함 — (Being) disappointed' },
      { q: '다음 중 우리말을 영어로 바르게 옮긴 것은? — ‘오래전에 지어져서 그 다리는 위험하다.’', opts: [
        'Building long ago, the bridge is dangerous.', 'Built long ago, the bridge is dangerous.', 'Builds long ago, the bridge is dangerous.',
        'To build long ago, the bridge is dangerous.', 'Not built long ago, the bridge is dangerous.'], a: '②', why: '다리가 지어진 수동' }] },
    { level: '전환 · 연결', type: 'write', instr: '밑줄 친 부분을 분사구문으로 바꾸어 쓰시오.', items: [
      { q: '__As I didn’t have money__, I walked home.', a: 'Not having money', why: 'Not + -ing' },
      { q: '__Because it was written in Chinese__, the book was hard to read.', a: '(Being) Written in Chinese', why: '수동' },
      { q: '__As she was surprised at the sound__, she jumped.', a: '(Being) Surprised at the sound', why: 'Being 생략' },
      { q: '__Since he didn’t feel well__, he left early.', a: 'Not feeling well', why: '부정' },
      { q: '__When it is seen from the hill__, the lake looks beautiful.', a: '(Being) Seen from the hill', why: '수동' },
      { q: '__As I was tired from work__, I fell asleep on the sofa.', a: '(Being) Tired from work', why: '형용사' },
      { q: '__Because the cake was made by my mom__, it was delicious.', a: '(Being) Made by my mom', why: '주어 같음(the cake=it)' },
      { q: '__As we didn’t know the way__, we used a map.', a: 'Not knowing the way', why: '부정' },
      { q: '__When he was asked a question__, he blushed.', a: '(Being) Asked a question', why: '수동' },
      { q: '__As the house is surrounded by trees__, it is very quiet.', a: '(Being) Surrounded by trees', why: '주어 같음(the house=it)' }] },
  ], m),

  // ---------------- Point 4 ----------------
  D.section('Point 4', '(심화) 완료 분사구문 Having p.p. · 주어가 다른 분사구문', 'point'),
  ...D.table(['형태', '언제', '예'], [
    ['Having + p.p.', '분사구문의 때가 주절보다 **먼저**', '**Having finished** my homework, I went out. (끝낸 뒤)'],
    ['(Having been) p.p.', '먼저 + 수동', '(Having been) **written** long ago, the book is hard to read.'],
    ['주어 + 분사', '두 주어가 **다를 때** 주어를 남긴다', '**It being** sunny, we went on a picnic.'],
    ['', '', '**The class over**, the students went out. (being 생략)']], [2200, 3200, 4238], m),
  ...D.trick('먼저 한 건 해빙(Having)!', ['“먼저 끝난 일은 해빙(Having) p.p.!”', '“주어가 다르면 데려간다!” — 주어 남기기']),
  ...D.examPoint([
    { q: 'After he had lost his wallet, he went to the police. = [[Having lost]] his wallet, he went to the police.', why: '잃어버린 것이 먼저' },
    { q: 'As it was rainy, we stayed home. = (It being / Being) rainy, we stayed home.', a: 'It being', why: '주어 it ≠ we → 주어 남김' }], m),
  ...D.caution(['비인칭 it(날씨·시간)을 지운 오답: Being rainy, we … ✗', 'Having p.p.와 Being p.p.를 바꿔 놓은 선지를 자주 만든다 — 먼저 일어난 일인지 확인'], m),
  ...D.drill(4, '완료 분사구문 · 주어가 다른 분사구문', [
    { level: 'Basic ①', type: 'choice', instr: '괄호 안에서 알맞은 것을 고르시오.', items: [
      { q: '(Having finished / Finishing) the report yesterday, I can relax today.', a: 'Having finished', why: '어제 끝냄 — 주절(오늘)보다 먼저' },
      { q: '(It being / Being) cold, we stayed inside.', a: 'It being', why: '주어 it ≠ we' },
      { q: '(Having lived / Living) in Japan for years, he speaks Japanese well.', a: 'Having lived', why: '과거부터 살았던 것이 먼저' },
      { q: '(The sun setting / Setting), we went home.', a: 'The sun setting', why: '주어 the sun ≠ we' },
      { q: '(Having seen / Seeing) the movie before, I knew the ending.', a: 'Having seen', why: '전에 본 것' },
      { q: '(It being / Being) Sunday, the bank was closed.', a: 'It being', why: '비인칭 it 남김' },
      { q: '(Having been / Being) told the truth, she got angry.', a: 'Having been', why: '들은 것이 먼저 + 수동' },
      { q: '(My mom being / Being) busy, I cooked dinner.', a: 'My mom being', why: '주어 다름' },
      { q: '(Having lost / Losing) my key last week, I bought a new one.', a: 'Having lost', why: '지난주 — 먼저' },
      { q: '(The test over / Over), we played soccer.', a: 'The test over', why: '주어 the test ≠ we, being 생략' }] },
    { level: 'Basic ②', type: 'fill', instr: '<보기>에서 알맞은 말을 골라 빈칸에 쓰시오. (한 번씩만 사용)',
      bogi: ['Having', 'It', 'There', 'The', 'Weather', 'Night', 'Having been', 'All', 'School', 'Dinner'], items: [
      { q: '[[Having]] read the book twice, I know the story well.', why: '먼저 읽음' },
      { q: '[[It]] being too hot, we went swimming.', why: '비인칭 it' },
      { q: '[[There]] being no bus, we took a taxi.', why: 'There being' },
      { q: '[[The]] rain stopping, the kids ran outside.', why: '주어 the rain' },
      { q: '[[Weather]] permitting, we will go camping.', why: '관용: 날씨가 허락하면' },
      { q: '[[Night]] coming on, the stars came out.', why: '주어 night' },
      { q: '[[Having been]] built 100 years ago, the house needs repairs.', why: '먼저 + 수동' },
      { q: '[[All]] things considered, it was a good trip.', why: '관용: 모든 것을 고려하면' },
      { q: '[[School]] being over, Minsu went to the library.', why: '주어 school' },
      { q: '[[Dinner]] being ready, Mom called us.', why: '주어 dinner' }] },
    { level: 'Intermediate', type: 'write', instr: '어법상 틀린 부분을 찾아 바르게 고쳐 쓰시오.', items: [
      { q: 'Being rainy, we stayed at home.', a: 'Being → It being', why: '비인칭 주어 남기기' },
      { q: 'Finishing my homework last night, I am free now.', a: 'Finishing → Having finished', why: '어젯밤 — 주절보다 먼저' },
      { q: 'Having writing in 1800, the letter is very old.', a: 'Having writing → (Having been) written', why: '편지가 쓰인 수동' },
      { q: 'The movie ended, we left the theater.', a: 'ended → ending', why: '주어 다른 분사구문 — 콤마로 두 절 연결 ✗' },
      { q: 'Being no chairs, we sat on the floor.', a: 'Being → There being', why: 'There were no chairs → There being' },
      { q: 'Having been visited Paris before, she guided us.', a: 'Having been visited → Having visited', why: '그녀가 방문한 능동' },
      { q: 'It was sunny, we went hiking.', a: 'It was → It being', why: '콤마로 두 절 연결 ✗' },
      { q: 'Having not studied, he failed the test.', a: 'Having not → Not having', why: 'Not 위치' },
      { q: 'My dad worked late, I made dinner myself.', a: 'worked → working', why: '주어 다른 분사구문' },
      { q: 'Lost my wallet, I couldn’t buy anything.', a: 'Lost → Having lost', why: '내가 잃어버린 능동·먼저' }] },
    { level: 'Advanced · 모두 고르기', type: 'multi', free: true, instr: '해당하는 것을 모두 골라 기호를 쓰시오.', items: [
      { q: '다음 중 어법상 옳은 문장을 모두 고르시오.', box: [
        '(a) It being late, we took a taxi.', '(b) Being Saturday, there was no school.', '(c) Having eaten lunch, I am full now.',
        '(d) The bell ringing, the students ran out.', '(e) Having written by Tolstoy, the novel is famous.'], a: '(a), (c), (d)', why: '(b) It being (e) Written / Having been written' },
      { q: '밑줄 친 부분에 대한 설명으로 옳은 것을 모두 고르시오.', box: [
        '(a) __Having seen__ the film, I didn’t go with them. → 보는 일이 주절보다 먼저이다.',
        '(b) __It being__ dark, we turned on the light. → It을 생략해도 된다.',
        '(c) __The game over__, the fans went home. → being이 생략되었다.',
        '(d) __Weather permitting__, we’ll eat outside. → 관용적 분사구문이다.',
        '(e) __Having been__ invited, she came to the party. → 능동의 의미이다.'], a: '(a), (c), (d)', why: '(b) 주어 다름 → 생략 ✗ (e) 수동' },
      { q: '다음 글의 밑줄 친 ⓐ~ⓔ 중 어법상 어색한 것을 모두 골라 기호를 쓰고 바르게 고치시오.', fix: true, label: '기호 / 고친 것', box: [
        'ⓐ __Being__ windy, we didn’t go to the beach. ⓑ __Having__ nothing to do, I read a book. ⓒ __Having read__ it before, I knew the story. ⓓ __Mom came__ home, we had dinner. ⓔ __Dinner over__, we watched TV.'],
        a: 'ⓐ Being → It being, ⓓ Mom came → Mom coming', why: 'ⓐ 비인칭 it ⓓ 주어 다른 분사구문' },
      { q: '두 문장의 뜻이 같은 것을 모두 고르시오.', box: [
        '(a) As it was cold, I wore a coat. = It being cold, I wore a coat.', '(b) After I had cleaned my room, I went out. = Cleaning my room, I had gone out.',
        '(c) As there was no water, we bought some. = There being no water, we bought some.', '(d) Because he had lost his phone, he couldn’t call. = Having lost his phone, he couldn’t call.',
        '(e) When the class was over, we went home. = Being over the class, we went home.'], a: '(a), (c), (d)', why: '(b) Having cleaned my room, I went out (e) The class (being) over' },
      { q: 'Having p.p.를 써야 자연스러운 것을 모두 고르시오.', box: [
        '(a) ______ (finish) my homework an hour ago, I am watching TV now.', '(b) ______ (walk) along the street, I sang a song.', '(c) ______ (visit) Seoul twice before, she knows it well.',
        '(d) ______ (feel) tired, he slept.', '(e) ______ (save) money for a year, he bought a bike.'], a: '(a), (c), (e)', why: '주절보다 먼저 일어난 일' }] },
    { level: 'Advanced · 객관식', type: 'mcq', free: true, instr: '알맞은 답을 고르시오.', items: [
      { q: '다음 문장을 분사구문으로 바르게 바꾼 것은? — Because it was snowing heavily, we canceled the trip.', opts: [
        'Snowing heavily, we canceled the trip.', 'Being snowing heavily, we canceled the trip.', 'It snowing heavily, we canceled the trip.',
        'It snowed heavily, we canceled the trip.', 'Having snowed heavily, we canceled the trip.'], a: '③', why: '비인칭 it 남김' },
      { q: '빈칸에 알맞은 것은? — ________ the book last year, I don’t need to buy it.', opts: ['Buying', 'Bought', 'Having bought', 'Having been bought', 'Being bought'], a: '③', why: '작년 — 먼저 + 능동' },
      { q: '다음 중 어법상 틀린 문장은?', opts: [
        'There being no taxi, we walked.', 'Having been to Busan, he knows the city.', 'The door opened, the dog ran in.',
        'Night falling, it got cold.', 'It being a holiday, the store was closed.'], a: '③', why: 'The door opening(또는 (being) opened)' },
      { q: '(A)~(C)에 알맞은 말이 바르게 짝지어진 것은? — (A) ( It being / Being ) fine, we went out. (B) ( Having finished / Finishing ) it yesterday, I’m free today. (C) ( Written / Writing ) in easy words, the book is popular.', opts: [
        'It being – Having finished – Written', 'Being – Finishing – Written', 'It being – Finishing – Writing', 'Being – Having finished – Writing', 'It being – Having finished – Writing'], a: '①', why: '주어 남김 / 먼저 / 수동' },
      { q: '다음 중 우리말을 영어로 바르게 옮긴 것은? — ‘수업이 끝나서 우리는 집에 갔다.’', opts: [
        'Being over, we went home.', 'The class over, we went home.', 'Having over the class, we went home.', 'The class ending, we gone home.', 'Over the class, we went home.'], a: '②', why: '주어 남김 + being 생략' }] },
    { level: '전환 · 연결', type: 'write', instr: '밑줄 친 부분을 분사구문으로 바꾸어 쓰시오.', items: [
      { q: '__As it was very hot__, we went to the pool.', a: 'It being very hot', why: '비인칭 it' },
      { q: '__After I had eaten lunch__, I took a walk.', a: 'Having eaten lunch', why: '먼저' },
      { q: '__As there was no milk__, I drank juice.', a: 'There being no milk', why: 'There being' },
      { q: '__Because he had lived in China__, he could read the sign.', a: 'Having lived in China', why: '먼저' },
      { q: '__When the sun rose__, we started hiking.', a: 'The sun rising', why: '주어 다름' },
      { q: '__As the book was written in 1950__, it uses old words.', a: '(Having been) Written in 1950', why: '먼저 + 수동' },
      { q: '__Since I had seen the show before__, I didn’t watch it.', a: 'Having seen the show before', why: '먼저' },
      { q: '__As my brother was sick__, I took care of him.', a: 'My brother being sick', why: '주어 다름' },
      { q: '__When the game was over__, the players shook hands.', a: 'The game (being) over', why: 'being 생략 가능' },
      { q: '__Because she had not slept well__, she was tired.', a: 'Not having slept well', why: 'Not + Having p.p.' }] },
  ], m),

  // ---------------- Point 5 ----------------
  D.section('Point 5', '(심화) 접속사를 남긴 분사구문 · with + 명사 + 분사', 'point'),
  ...D.table(['형태', '뜻·특징', '예'], [
    ['접속사 + 분사', '의미를 분명히 하려고 접속사를 남김', '**While walking** home, I met Jiho.'],
    ['with + 명사 + -ing', '명사가 **하고 있는** 채로 (능동)', 'He listened **with his eyes shining**.'],
    ['with + 명사 + p.p.', '명사가 **~된** 채로 (수동)', 'She sat **with her legs crossed**.'],
    ['with + 명사 + 형용사/부사구', '~한 채로', 'Don’t speak **with your mouth full**.']], [2600, 3200, 3838], m),
  ...D.trick('위드 명사, 관계 체크!', ['“with 뒤 명사가 하면 -ing, 당하면 p.p.!”', '눈은 감기는 거 → eyes closed / 개는 짖는 거 → dog barking']),
  ...D.examPoint([
    { q: 'He slept with the TV (turning / turned) on.', a: 'turned', why: 'TV가 켜진 수동' },
    { q: 'Wormholes may contain two mouths, with a throat (connecting / connected) the two.', a: 'connecting', why: '목구멍이 연결하는 능동 (비상 8과 본문)' }], m),
  ...D.caution(['with + 명사 + 분사에서 명사 기준 능동/수동 — 주절 주어 기준으로 착각하게 만드는 선지', 'with one’s arms folded / legs crossed / eyes closed는 고정 출제'], m),
  ...D.drill(5, '접속사를 남긴 분사구문 · with + 명사 + 분사', [
    { level: 'Basic ①', type: 'choice', instr: '괄호 안에서 알맞은 것을 고르시오.', items: [
      { q: 'She was reading with her legs (crossing / crossed).', a: 'crossed', why: '다리가 꼬인 수동' },
      { q: 'He ran with his dog (following / followed) him.', a: 'following', why: '개가 따라오는 능동' },
      { q: 'Don’t talk with your mouth (full / fully).', a: 'full', why: 'with + 명사 + 형용사' },
      { q: 'While (walking / walked) in the park, I found a wallet.', a: 'walking', why: '접속사 + 분사 (내가 걷는 능동)' },
      { q: 'She listened with her eyes (closing / closed).', a: 'closed', why: '눈이 감긴' },
      { q: 'He stood there with his arms (folding / folded).', a: 'folded', why: '팔짱 낀' },
      { q: 'When (asked / asking) a question, he blushed.', a: 'asked', why: '그가 질문받음' },
      { q: 'The girl came in with her hair (blowing / blown) in the wind.', a: 'blowing', why: '머리카락이 날리는 능동' },
      { q: 'After (finishing / finished) dinner, we went for a walk.', a: 'finishing', why: '우리가 끝낸 능동' },
      { q: 'I fell asleep with the light (turning / turned) on.', a: 'turned', why: '불이 켜진 수동' }] },
    { level: 'Basic ②', type: 'fill', instr: '<보기>에서 알맞은 말을 골라 빈칸에 쓰시오. (한 번씩만 사용)',
      bogi: ['closed', 'shining', 'crossed', 'barking', 'tied', 'while', 'after', 'when', 'on', 'connecting'], items: [
      { q: 'He listened with his eyes [[shining]].', why: '눈이 빛나는 능동' },
      { q: 'She sat with her legs [[crossed]].', why: '다리 꼰' },
      { q: 'The thief ran away with the dog [[barking]] at him.', why: '개가 짖는' },
      { q: 'He prayed with his eyes [[closed]].', why: '눈 감은' },
      { q: 'She walked out with her hair [[tied]] back.', why: '머리 묶인' },
      { q: '[[While]] studying, I don’t use my phone.', why: '~하는 동안' },
      { q: '[[After]] reading the letter, she smiled.', why: '읽은 후에' },
      { q: '[[When]] seen from the top, the city looks tiny.', why: '보일 때' },
      { q: 'Don’t sleep with the TV [[on]].', why: 'with + 명사 + 부사' },
      { q: 'There are two mouths, with a throat [[connecting]] the two.', why: '목구멍이 연결하는 능동' }] },
    { level: 'Intermediate', type: 'write', instr: '어법상 틀린 부분을 찾아 바르게 고쳐 쓰시오.', items: [
      { q: 'He sat on the bench with his arms folding.', a: 'folding → folded', why: '팔이 접힌 수동' },
      { q: 'She danced with her skirt waved in the wind.', a: 'waved → waving', why: '치마가 흔들리는 능동' },
      { q: 'While walked to school, I met my friend.', a: 'walked → walking', why: '접속사 + -ing' },
      { q: 'Don’t eat with your mouth opening.', a: 'opening → open', why: 'with + 명사 + 형용사' },
      { q: 'She walked in with her coat covering with snow.', a: 'covering → covered', why: '코트가 덮인 수동' },
      { q: 'When asking about the plan, she said nothing.', a: 'asking → asked', why: '그녀가 질문받음' },
      { q: 'The dog ran to me with its tail wagged.', a: 'wagged → wagging', why: '꼬리가 흔드는 능동' },
      { q: 'After finished the test, we went home.', a: 'finished → finishing', why: '우리가 끝낸 능동' },
      { q: 'She listened to me with her eyes closing.', a: 'closing → closed', why: '눈 감은' },
      { q: 'He left the room with the lights turning on.', a: 'turning → turned', why: '불이 켜진' }] },
    { level: 'Advanced · 모두 고르기', type: 'multi', free: true, instr: '해당하는 것을 모두 골라 기호를 쓰시오.', items: [
      { q: '다음 중 어법상 옳은 문장을 모두 고르시오.', box: [
        '(a) He watched TV with his legs crossed.', '(b) She smiled with tears ran down her face.', '(c) While waiting for her, I read a book.',
        '(d) Don’t cross the road with your phone in your hand.', '(e) He came in with his shoes covering in mud.'], a: '(a), (c), (d)', why: '(b) running (e) covered' },
      { q: '밑줄 친 부분에 대한 설명으로 옳은 것을 모두 고르시오.', box: [
        '(a) with his eyes __closed__ → 눈이 감긴 수동의 의미이다.', '(b) with a throat __connecting__ the two → 목구멍이 두 입을 연결하는 능동이다.',
        '(c) __While__ riding a bike → 접속사를 생략하면 틀린 문장이 된다.', '(d) with the dog __following__ him → 주절 주어 he가 따라가는 것이다.',
        '(e) __When__ asked → 접속사를 남긴 수동 분사구문이다.'], a: '(a), (b), (e)', why: '(c) 생략해도 됨 (d) 개가 따라옴' },
      { q: '다음 글의 밑줄 친 ⓐ~ⓔ 중 어법상 어색한 것을 모두 골라 기호를 쓰고 바르게 고치시오.', fix: true, label: '기호 / 고친 것', box: [
        'My grandpa sat ⓐ __with his arms folded__. ⓑ __While listened__ to the radio, he fell asleep ⓒ __with the radio on__. Then he woke up ⓓ __with his dog licked__ his face. ⓔ __After eating__ lunch, we went out.'],
        a: 'ⓑ While listened → While listening, ⓓ licked → licking', why: 'ⓑ 접속사 + -ing ⓓ 개가 핥는 능동' },
      { q: '빈칸에 현재분사(-ing)가 들어가야 하는 것을 모두 고르시오.', box: [
        '(a) She came in with her face ______ (shine) with joy.', '(b) He stood with his hands ______ (put) in his pockets.', '(c) I slept with the fan ______ (run).',
        '(d) She left with the door ______ (lock).', '(e) The boy ran with his friends ______ (chase) him.'], a: '(a), (c), (e)', why: '얼굴이 빛나는 / 선풍기가 도는 / 친구들이 쫓는' },
      { q: '접속사를 남긴 분사구문으로 바르게 바꾼 것을 모두 고르시오.', box: [
        '(a) While I was cooking, I burned my finger. → While cooking, I burned my finger.', '(b) When it is heated, ice melts. → When heating, ice melts.',
        '(c) After she had read it, she cried. → After reading it, she cried.', '(d) Though he was tired, he kept going. → Though tired, he kept going.',
        '(e) When I was asked, I answered. → When asking, I answered.'], a: '(a), (c), (d)', why: '(b) When heated (e) When asked' }] },
    { level: 'Advanced · 객관식', type: 'mcq', free: true, instr: '알맞은 답을 고르시오.', items: [
      { q: '빈칸에 알맞은 것은? — She was sitting on the sofa with her eyes ______.', opts: ['close', 'closing', 'closed', 'to close', 'closes'], a: '③', why: '눈이 감긴' },
      { q: '다음 중 어법상 틀린 문장은?', opts: [
        'He spoke with his voice shaking.', 'She waited with her arms crossed.', 'When used well, money is useful.',
        'He ran with his heart beaten fast.', 'While eating, don’t talk.'], a: '④', why: 'beating — 심장이 뛰는 능동' },
      { q: '(A)~(C)에 알맞은 말이 바르게 짝지어진 것은? — with the baby (A)( sleeping / slept ) / with his legs (B)( crossing / crossed ) / when (C)( seeing / seen ) from above', opts: [
        'sleeping – crossed – seen', 'slept – crossed – seen', 'sleeping – crossing – seeing', 'slept – crossing – seen', 'sleeping – crossed – seeing'], a: '①', why: '아기가 잠/다리가 꼬임/보여짐' },
      { q: '다음 중 우리말을 영어로 바르게 옮긴 것은? — ‘그는 불을 켠 채로 잠들었다.’', opts: [
        'He fell asleep with the light turning on.', 'He fell asleep with the light turned on.', 'He fell asleep with turned on the light.',
        'He fell asleep the light turned on.', 'He fell asleep with the light turn on.'], a: '②', why: 'with + 명사 + p.p.' },
      { q: '다음 중 밑줄 친 부분의 쓰임이 나머지 넷과 다른 것은?', opts: [
        'with his eyes __closed__', 'with her arms __folded__', 'with the door __locked__', 'with the dog __barking__', 'with his legs __crossed__'], a: '④', why: '④ 능동 -ing / 나머지 수동 p.p.' }] },
    { level: '전환 · 연결', type: 'write', instr: '두 문장을 <with + 명사 + 분사>를 사용하여 한 문장으로 연결하시오.', items: [
      { q: 'She sat on the chair. Her legs were crossed.', a: 'She sat on the chair with her legs crossed.', why: '다리 — 수동' },
      { q: 'He listened to music. His eyes were closed.', a: 'He listened to music with his eyes closed.', why: '수동' },
      { q: 'The boy ran home. His dog was following him.', a: 'The boy ran home with his dog following him.', why: '능동' },
      { q: 'She smiled at me. Tears were running down her face.', a: 'She smiled at me with tears running down her face.', why: '능동' },
      { q: 'I fell asleep. The TV was turned on.', a: 'I fell asleep with the TV turned on.', why: '수동' },
      { q: 'He stood there. His arms were folded.', a: 'He stood there with his arms folded.', why: '수동' },
      { q: 'The girl danced. Her hair was blowing in the wind.', a: 'The girl danced with her hair blowing in the wind.', why: '능동' },
      { q: 'He left the house. The door was locked.', a: 'He left the house with the door locked.', why: '수동' },
      { q: 'The baby slept. Her mom was singing a song.', a: 'The baby slept with her mom singing a song.', why: '능동' },
      { q: 'Wormholes may contain two mouths. A throat connects the two.', a: 'Wormholes may contain two mouths, with a throat connecting the two.', why: '목구멍이 연결 — 능동' }] },
  ], m),

  // ---------------- PERFECT CHECK ----------------
  D.section('PERFECT CHECK', '상위권 함정 체크'),
  ...D.drill(null, '', [{ level: '함정', type: 'choice', instr: '실수하기 쉬운 문장들이에요. 괄호 안에서 알맞은 것을 고르시오.', items: [
    { q: '(Use / Using) various methods, experts analyze big data.', a: 'Using', why: '동사원형 시작은 명령문' },
    { q: '(Knowing not / Not knowing) the rules, I made a mistake.', a: 'Not knowing', why: 'Not 위치' },
    { q: '(Seen / Seeing) from the moon, the earth looks small.', a: 'Seen', why: '지구가 보여짐' },
    { q: '(Being / It being) cloudy, we didn’t go out.', a: 'It being', why: '비인칭 it' },
    { q: '(Having finished / Finishing) the job last week, I’m on vacation now.', a: 'Having finished', why: '먼저' },
    { q: 'He sat with his legs (crossing / crossed).', a: 'crossed', why: '명사 기준 수동' },
    { q: '(Interested / Interesting) in robots, she joined the club.', a: 'Interested', why: '그녀가 관심을 가짐' },
    { q: 'Big data is improving the performance of players, (making / made) sports more exciting.', a: 'making', why: '연속·동시동작 능동 (본문)' },
    { q: '(As / Being) information technology develops, data is growing.', a: 'As', why: '주어+동사가 있는 완전한 절 → 접속사 as (이전 Point 혼합)' },
    { q: 'The book (written / writing) by him is popular.', a: 'written', why: '명사 수식 과거분사 (이전 단원 분사 복습)' }] }], m),

  // ---------------- WRITE ----------------
  D.section('WRITE', '서술형 대비'),
  ...D.writeItem(1, 'Basic', '괄호 안의 동사를 알맞은 형태로 바꾸어 쓰시오.', ['(Wave) his hand, he walked out of the house.'], { a: 'Waving', why: '그가 흔드는 능동' }, m),
  ...D.writeItem(2, 'Basic', '괄호 안의 동사를 알맞은 형태로 바꾸어 쓰시오.', ['(Write) in easy English, the book is good for kids.'], { a: 'Written', why: '책이 쓰인 수동' }, m),
  ...D.writeItem(3, 'Intermediate', '밑줄 친 부분을 분사구문으로 바꾸어 문장을 다시 쓰시오. [문장 전환]', ['__As they use various methods__, experts analyze big data.'], { a: 'Using various methods, experts analyze big data.', why: '접속사·같은 주어 생략' }, m),
  ...D.writeItem(4, 'Intermediate', '분사구문을 접속사 as를 사용한 부사절로 바꾸어 문장을 다시 쓰시오. [문장 전환]', ['Eating a sandwich, she waited for the train.'], { a: 'As she ate a sandwich, she waited for the train.', why: '동시동작 as, 주절 과거' }, m),
  ...D.writeItem(5, 'Intermediate', '두 문장을 분사구문을 사용하여 한 문장으로 연결하시오. [두 문장 연결]', ['I didn’t know the way. I asked a police officer.'], { a: 'Not knowing the way, I asked a police officer.', why: '부정 분사구문' }, m),
  ...D.writeItem(6, 'Intermediate', '두 문장을 분사구문을 사용하여 한 문장으로 연결하시오. [두 문장 연결]', ['It was rainy. We stayed home.'], { a: 'It being rainy, we stayed home.', why: '주어 다름 — it 남김' }, m),
  ...D.writeItem(7, 'Advanced', '우리말과 같은 뜻이 되도록 <조건>에 맞게 영작하시오.', ['나는 길을 따라 걷다가 개 다섯 마리와 함께 있는 남자를 보았다.', '<조건> 분사구문으로 시작할 것 · walk, along, see, with를 사용할 것 · 총 11단어'],
    { a: 'Walking along the street, I saw a man with five dogs.', why: '교과서 문장 · 11단어 (Walking/along/the/street/I/saw/a/man/with/five/dogs)' }, m),
  ...D.writeItem(8, 'Advanced', '<보기>의 단어를 배열하여 문장을 완성하시오. (필요하면 형태를 바꿀 것)', ['그녀는 다리를 꼰 채로 책을 읽고 있었다.', '<보기> she / a book / with / her legs / was / reading / cross'],
    { a: 'She was reading a book with her legs crossed.', why: 'cross → crossed (다리가 꼬인 수동)' }, m),
  ...D.writeItem(9, 'Advanced', '어법상 틀린 부분 2개를 찾아 바르게 고치고, 그 이유를 쓰시오.', ['Being cold outside, I stayed home. Knowing not what to do, I watched TV all day.'],
    { a: '① Being → It being  ② Knowing not → Not knowing', why: '① 비인칭 주어 it ≠ I → 주어 남김 ② 부정어는 분사 앞', blanks: ['고친 것', '이유'] }, m),
  ...D.writeItem(10, 'Advanced', '어법상 틀린 부분 2개를 찾아 바르게 고치고, 그 이유를 쓰시오.', ['Seeing from the sky, the island looks like a star. Visited it last year, I want to go there again.'],
    { a: '① Seeing → Seen  ② Visited → Having visited', why: '① 섬이 보여지는 수동 ② 작년 방문 — 주절보다 먼저 + 능동', blanks: ['고친 것', '이유'] }, m),

  // ---------------- MAP ----------------
  D.section('MAP', "DAVID'S MAP — 백지노트 테스트"),
  D.P([D.T('오늘 배운 내용을 떠올리며 빈칸을 채워 보세요. 책을 보지 않고!', { size: 18, color: '595959' })], { spacing: { after: 120 }, keepNext: true }),
  ...D.image(path.join(__dirname, 'map_G-분사구문.png'), 620),
  ...D.table(['자가 체크 — 백지노트에 이 단어들이 들어갔나요?', '✔'], [
    ['접 · 주 · 잉 (접속사 → 같은 주어 → -ing)', ''], ['Being 생략 → p.p.로 시작하면 수동', ''], ['Not / Never는 분사 앞', ''],
    ['시간 · 이유 · 조건 · 양보 · 동시동작 · 연속동작', ''], ['Having p.p. = 주절보다 먼저', ''], ['주어가 다르면 주어 남기기 (It being / There being)', ''],
    ['관용: Weather permitting / All things considered', ''], ['접속사 남기기: While walking / When asked', ''], ['with + 명사 + -ing(능동) / p.p.(수동)', ''], ['교과서: Using various methods, experts analyze big data.', '']], [8838, 800], m),
  ...D.memo(['다음 시간 도입: 분사구문 → 부사절 되돌리기 5문항 퀴즈(접속사 고르기 포함)', '약한 반: Point 1·3(만들기·Being 생략)까지만 확실히, Point 4·5는 상위반 위주', '접속사 as와 함께 출제 — 분사구문 ↔ As절 전환을 반드시 연습'], m),
];
D.render(meta, build, process.argv[2] || '.').then(f => console.log(f.join('\n')));
