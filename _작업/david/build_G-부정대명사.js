const D = require('./david_base');
const path = require('path');
const COVER = JSON.parse(process.env.COVER || '{}');
const meta = { series: D.SERIES.G, code: 'G-부정대명사', title: '부정대명사', category: 'G. 대명사  |  부정대명사 one · another · the other · some · others',
  rightText: 'G  부정대명사', prefix: process.env.PREFIX || '', cover: COVER.title ? COVER : undefined,
  question: 'Some gave him angry looks, and ~~others~~ shouted at him. / One is flying, and ~~the other~~ is sitting on the tree. — 둘 다 ‘다른 쪽’인데 왜 하나는 others, 하나는 the other일까?' };

const build = (m) => [
  D.section('FLOW', 'Teaching Flow — 처음 배우는 사람도 따라오는 5단계'),
  ...D.step(1, '우리말로 먼저 생각하기 — ‘다른 사람들’ vs ‘나머지’', [
    '‘공원에서 어떤 사람들은 자전거를 타고, 다른 사람들은 책을 읽었다.’ / ‘우리 반 20명 중 몇 명은 축구를, 나머지는 농구를 했다.’ — 공원 사람들은 수가 {{정해지지 않았고}}, 우리 반은 수가 정해져 있다.',
    '우리말은 ‘다른’과 ‘나머지’로 구별한다. 영어는 남은 것을 모두 가리킬 때 {{the}}를 붙여 ‘이제 남은 것이 없다’를 표시한다.'], m),
  ...D.step(2, '이전 단원 복습 — 대명사 it / they', [
    'I lost my pen. I have to find {{it}}. — 이미 말한 ‘바로 그 펜’ (특정한 대상)',
    '그렇다면 정해지지 않은 ‘하나’, ‘몇몇’, ‘또 하나’, ‘나머지’는 어떤 대명사로 가리킬까? → 부정(不定)대명사 = 정해지지 않은 대상을 가리키는 대명사'], m),
  ...D.step(3, '문제 제기 — the가 붙을 때와 안 붙을 때', [
    'A: What are the birds doing? B: One is flying, and **the other** is sitting on the tree. (교과서)',
    'Many people passed by. Some gave Corky angry looks, and **others** shouted at him. (본문) — 왜 한쪽은 the other, 한쪽은 others일까?'], m),
  ...D.step(4, '규칙 발견 — 전체 수가 정해졌나?', [
    '새는 두 마리(정해진 수) → 하나는 one, 남은 하나는 {{the other}} / 지나가는 사람들은 수가 정해지지 않음 → 몇몇은 some, 다른 몇몇은 {{others}}',
    '셋이면 one → {{another}}(또 하나) → the other / 정해진 여럿에서 남은 전부는 {{the others}}'], m),
  ...D.step(5, '결론 🔑', [
    '둘: one ~, {{the other}} / 셋: one ~, another ~, the other / 막연한 다수: some ~, {{others}} / 정해진 다수: some ~, {{the others}} / 마지막 남은 것(들)에는 항상 {{the}}'], m),
  ...D.infoBox('오늘의 핵심 3문장', [
    '① Some gave Corky angry looks, and {{others}} shouted at him. (본문)',
    '② One is flying, and {{the other}} is sitting on the tree. (교과서)',
    '③ Corky and {{the others}} began fighting. (본문)'], m),
  ...D.tip(['칠판에 ○ △ 를 그리고 하나씩 지우며 one → the other, ○ △ ★ 로 one → another → the other를 말하게 한다. ‘마지막 하나를 지우는 순간 the’를 몸으로 익히게 한다.',
    '같은 과 문법 5형식(동사 + 목적어 + to부정사)과 함께 출제되므로 PERFECT CHECK에 2문항을 섞어 두었다. 본문에 others · the others · another way · 19 other warriors · the other warriors가 모두 나오므로 본문 문장을 통째로 확인시킨다.'], m),

  // ---------------- Point 1 ----------------
  D.section('Point 1', 'one ~ the other · one ~ another ~ the other — 정해진 둘 · 셋', 'point'),
  ...D.table(['표현', '쓰임', '예'], [
    ['one ~, the other …', '(정해진 둘 중) 하나는 ~, 나머지 하나는 …', 'B: **One** is flying, and **the other** is sitting on the tree. (교과서)'],
    ['one ~, another …, the other —', '(정해진 셋 중) 하나는 ~, 또 하나는 …, 나머지 하나는 —', 'My sister has three hobbies. **One** is playing the piano, **another** is reading a book, and **the other** is singing a song. (기출)'],
    ['the other + 단수동사', 'the other는 남은 ‘하나’ → is · was · likes (are ✗)', 'We need two things for peace. One is love. **The other is** hope. (교과서)'],
    ['another', 'an + other = ‘또 하나’ — 아직 남은 것이 있을 때 · 단수', 'I don’t like this shirt. Show me **another**. (워크북)'],
    ['one of + 복수명사', '‘~ 중 하나’ — 동사는 단수', '**One of the twins is** Betty, and **the other** is Liz. (워크북)']], [2300, 3300, 4038], m),
  ...D.infoBox('하나씩 지워 가며 세기 — 마지막 하나에는 the', [
    '○ △ (둘): one → {{the other}}',
    '○ △ ★ (셋): one → {{another}} → the other',
    '아직 더 남아 있으면 another, 마지막 남은 하나면 the other / 처음 하나를 She · It · He로 쓰면 ✗ (I have two sisters. {{One}} is a teacher.)'], m),
  ...D.trick('둘이면 원 · 디아더, 셋이면 원 · 어나더 · 디아더!', ['“둘이면 원 · 디아더, 셋이면 원 · 어나더 · 디아더!”', '“마지막 하나엔 꼭 더(the) — 끝나면 더!”']),
  ...D.examPoint([
    { q: 'She has two cats. One is brown and {{the other}} is white. (another ✗)', why: '정해진 둘 중 나머지 하나 (기출)' },
    { q: 'My sister has three hobbies. One is playing the piano, {{another}} is reading a book, and the other is singing a song.', why: '셋 중 두 번째 → another (기출)' }], m),
  ...D.caution(['둘인데 another를 쓴 선지(There are two dogs. One is eating snow, and another is jumping up and down ✗)가 가장 흔하다. (기출)',
    'the 없는 other 단독 주어(One is jumping a rope and other is flying a kite ✗ → the other)가 서술형 오류 수정으로 나온다. (기출)',
    '셋일 때 순서를 바꾼 선지 — One ~, the other ~, and another ~ ✗ (마지막이 the other) (기출)',
    'the other 뒤 동사를 are로 바꾼 수일치 함정, 첫 대상을 She · It으로 쓴 선지도 함께 나온다.'], m),
  ...D.drill(1, 'one ~ the other · one ~ another ~ the other', [
    { level: 'Basic ①', type: 'choice', instr: '괄호 안에서 알맞은 것을 고르시오.', items: [
      { q: 'Look at the two birds. (The other / One) is small, and the other is big.', a: 'One', why: '둘 중 처음 하나 → one' },
      { q: 'Mary has two cups. One is big, and (the other / another) is small.', a: 'the other', why: '정해진 둘 중 나머지 하나 (워크북)' },
      { q: 'I have two sisters. (One / She) is a teacher, and the other is a cook.', a: 'One', why: '처음 하나 → one (She ✗) (워크북)' },
      { q: 'There are two dogs. One is eating snow, and (another / the other) is jumping up and down.', a: 'the other', why: '두 마리 → the other (교과서 · 기출)' },
      { q: 'There are three tables. One is white, another is brown, and (other / the other) is black.', a: 'the other', why: '셋 중 마지막 하나 (워크북)' },
      { q: 'Mrs. Han has three children. One is Yeseo, (another / the other) is Yebin, and the other is Hyena.', a: 'another', why: '셋 중 두 번째 → another (워크북)' },
      { q: 'We need two things for peace. One is love. The other (are / is) hope.', a: 'is', why: 'the other = 하나 → 단수동사 (교과서)' },
      { q: 'I don’t like this shirt. Can you show me (other / another)?', a: 'another', why: '또 다른 하나 — other 단독 ✗ (기출)' },
      { q: 'One of the twins is Betty, and (the other / another) is Liz.', a: 'the other', why: '쌍둥이 = 둘 → 나머지 하나 (워크북)' },
      { q: 'Helen has two brothers. (One / Some) is 10 years old, and the other is 8.', a: 'One', why: '둘 중 하나 · 단수동사 is (워크북)' }] },
    { level: 'Basic ②', type: 'fill', instr: '<보기>에서 알맞은 말을 골라 빈칸에 쓰시오. (한 번씩만 사용)',
      bogi: ['is', 'another', 'hand', 'two', 'it', 'the other', 'of', 'three', 'was', 'one'], items: [
      { q: 'Here are [[two]] cars. One is mine, and the other is my sister’s.', why: '워크북 — one ~ the other = 둘' },
      { q: 'There are [[three]] flowers. One is a lily, another is a rose, and the other is a tulip.', why: '워크북 — another가 있으므로 셋' },
      { q: 'Mary has two cups. One is big, and [[the other]] is small.', why: '워크북 — 둘 중 나머지 하나' },
      { q: 'Do you see the three boys there? One is tall, [[another]] is short, and the other is thin.', why: '워크북 — 셋 중 두 번째' },
      { q: 'I need a pencil. If you have a pencil, please lend me [[one]].', why: '기출 — 같은 종류의 아무 연필 하나' },
      { q: 'One [[of]] the twins is Betty, and the other is Liz.', why: '워크북 — one of + 복수명사' },
      { q: 'We need two things for peace. One is love. The other [[is]] hope.', why: '교과서 — the other + 단수동사 (현재)' },
      { q: 'I got three letters. One [[was]] from my father, another was from my mother, and the other was from my girlfriend.', why: '워크북 — 과거(got)의 일, 단수동사' },
      { q: 'She was holding the wheel with one hand and waving with the other [[hand]].', why: '워크북 — the other + 단수명사(형용사 용법)' },
      { q: 'I lost my umbrella yesterday, but I found [[it]] this morning.', why: '잃어버린 바로 그 우산 → it' }] },
    { level: 'Intermediate', type: 'write', instr: '어법상 틀린 부분을 찾아 바르게 고쳐 쓰시오.', items: [
      { q: 'I have two pets. One is a dog, and another is a cat.', a: 'another → the other', why: '워크북 — 둘 중 나머지 하나' },
      { q: 'There are two girls in the playground. One is jumping a rope and other is flying a kite.', a: 'other → the other', why: '기출 서술형 — other 단독 주어 ✗' },
      { q: 'I have two sisters. She lives in Paris, and the other lives in Tokyo.', a: 'She → One', why: '워크북 — 처음 하나는 one' },
      { q: 'My sister has three hobbies. One is playing the piano, the other is reading a book, and another is singing a song.', a: 'the other ↔ another (the other → another, another → the other)', why: '기출 — 셋: one → another → the other' },
      { q: 'They are twins, but one likes making robots and the others like making dolls.', a: 'the others like → the other likes', why: '워크북 — 쌍둥이 = 둘, 단수동사' },
      { q: 'We need two things for peace. One is love. The other are hope.', a: 'are → is', why: '교과서 — the other + 단수동사' },
      { q: 'I don’t like this cap. Show me other.', a: 'other → another', why: '또 하나 — other 단독 ✗' },
      { q: 'Do you see the three men there? One is tall, other is short, and the other is thin.', a: 'other → another', why: '워크북 — 셋 중 두 번째' },
      { q: 'My friend Sumi has two strong points. One is that she sings well. Other is that she is humorous.', a: 'Other → The other', why: '기출 서술형 — 둘 중 나머지 하나' },
      { q: 'Two men are standing inside the gate. One is holding a sword, and the others are holding a stick.', a: 'the others are → the other is', why: '교과서 Think and Write — 두 명' }] },
    { level: 'Advanced · 모두 고르기', type: 'multi', free: true, instr: '해당하는 것을 모두 골라 기호를 쓰시오.', items: [
      { q: '다음 중 어법상 옳은 문장을 모두 고르시오.', box: [
        '(a) She has two cats. One is brown and the other is white.', '(b) There are two dogs. One is eating snow, and another is jumping up and down.', '(c) I have three caps. One is red, another is blue, and the other is black.',
        '(d) I have two brothers. He is a doctor, and the other is a cook.', '(e) We need two things for peace. One is love. The other is hope.'], a: '(a), (c), (e)', why: '(b) 둘 → the other (d) He → One (기출 · 교과서)' },
      { q: '밑줄 친 부분에 대한 설명으로 옳은 것을 모두 고르시오.', box: [
        '(a) One is flying, and __the other__ is sitting on the tree. → 셋 이상 중 나머지 전부를 가리킨다.',
        '(b) I don’t like this shirt. Show me __another__. → 정해진 둘 중 나머지 하나를 가리킨다.',
        '(c) One is red, __another__ is blue, and the other is green. → 셋 중 두 번째 하나를 가리킨다.',
        '(d) My sister has three hobbies. __One__ is playing the piano. → 셋 중 처음 하나를 가리킨다.',
        '(e) One is love. The other __is__ hope. → the other가 하나를 가리키므로 단수동사를 쓴다.'], a: '(c), (d), (e)', why: '(a) 둘 중 나머지 하나 (b) 또 다른 하나(아직 남은 것이 있음)' },
      { q: '다음 글(교과서 Think and Write 변형)의 밑줄 친 ⓐ~ⓔ 중 어법상 어색한 것을 모두 골라 기호를 쓰고 바르게 고치시오.', fix: true, label: '기호 / 고친 것', box: [
        'Two people are talking in the hall. ⓐ __One__ is the king, and ⓑ __another__ is Corky. The king orders Corky to go to the military school. At the gate, two men are standing. One is holding a sword, and ⓒ __the other__ is holding a stick. Corky has three things to learn. One is patience, ⓓ __other__ is words, and ⓔ __the other__ is peace.'],
        a: 'ⓑ another → the other, ⓓ other → another', why: 'ⓑ 두 사람 중 나머지 한 명 ⓓ 셋 중 두 번째 → another' },
      { q: '빈칸에 the other가 들어갈 수 있는 것을 모두 고르시오.', box: [
        '(a) I have two pens. One is black, and _​_​_​_​_​_ is red.', '(b) I don’t like this hat. Can you show me _​_​_​_​_​_?', '(c) Mrs. Kim has three sons. One is a soldier, _​_​_​_​_​_ is a teacher, and the other is a farmer.',
        '(d) She was holding the wheel with one hand and waving with _​_​_​_​_​_ hand.', '(e) One of my parents is a nurse, and _​_​_​_​_​_ is a police officer.'], a: '(a), (d), (e)', why: '(b)(c) 또 하나 → another / (e) 부모 = 둘' },
      { q: '다음 대화의 밑줄 친 ⓐ~ⓔ 중 어법상 알맞은 것을 모두 고르시오.', box: [
        'A: What are the birds doing? — B: ⓐ __One is flying, and the other is sitting on the tree.__',
        'A: How many hobbies do you have? — B: Three. ⓑ __One is swimming, another is cooking, and the other is drawing.__',
        'A: This shirt is too small for me. — B: ⓒ __Then I’ll show you other.__',
        'A: Who are the two girls? — B: ⓓ __One is my sister, and the other is my cousin.__',
        'A: What are your two wishes? — B: ⓔ __One is to be healthy. The other are to travel.__'], a: 'ⓐ, ⓑ, ⓓ', why: 'ⓒ other → another ⓔ The other are → The other is' }] },
    { level: 'Advanced · 객관식', type: 'mcq', free: true, instr: '알맞은 답을 고르시오.', items: [
      { q: '다음 빈칸에 들어갈 알맞은 말은? — She has two cats. One is brown and _​_​_​_​_​_ is white.', opts: [
        'another', 'other', 'the other', 'others', 'the others'], a: '③', why: '정해진 둘 중 나머지 하나 (기출)' },
      { q: '빈칸에 들어갈 말이 차례대로 바르게 짝지어진 것은? — My sister has three hobbies. _​_​_​_​_​_ is playing the piano, _​_​_​_​_​_ is reading a book, and _​_​_​_​_​_ is singing a song.', opts: [
        'One – other – the other', 'Some – other – the others', 'One – the other – another', 'Some – another – the other', 'One – another – the other'], a: '⑤', why: '셋: one → another → the other (기출)' },
      { q: '다음 중 어법상 알맞은 것은?', opts: [
        'I have two sisters. One is a teacher, and the other is a cook.', 'There are two dogs. One is eating snow, and another is jumping up and down.', 'I have two pens. One is red, and other is blue.',
        'Look at your hands. One is your right hand. The other are your left hand.', 'Three boys are there. One is tall, the other is short, and another is thin.'], a: '①', why: '② the other ③ the other ④ is ⑤ another – the other 순서' },
      { q: '우리말과 같도록 빈칸에 알맞은 것은? — 내 친구 민수는 두 가지 장점이 있다. 하나는 축구를 잘한다는 것이고, 나머지 하나는 잘생겼다는 것이다. → My friend Minsu has two good points. One is that he plays soccer well. _​_​_​_​_​_ is that he is handsome.', opts: [
        'Another', 'Other', 'Others', 'The other', 'The others'], a: '④', why: '두 가지 중 나머지 하나 (교과서 Link to the World)' },
      { q: '빈칸 (A), (B)에 들어갈 말이 바르게 짝지어진 것은?', box: [
        '• Two men are standing inside the gate. One is holding a sword, and (A) _​_​_​_​_​_ is holding a stick.', '• I don’t like this sword. Show me (B) _​_​_​_​_​_.'],
        opts: ['another – the other', 'the other – another', 'the other – other', 'other – another', 'the others – another'], a: '②', why: '(A) 두 명 중 나머지 한 명 (B) 또 다른 하나' }] },
    { level: '배열 · 영작', type: 'write', instr: '우리말과 같은 뜻이 되도록 괄호 안의 말을 이용하여 영작하시오.', items: [
      { q: '나는 모자를 두 개 갖고 있다. 하나는 노란색이고, 다른 하나는 빨간색이다. → I have two caps. (yellow, red)', a: 'One is yellow, and the other is red.', why: '워크북 — 둘' },
      { q: '운동장에 세 명의 소년이 있다. 한 명은 뛰고, 또 한 명은 자전거를 타고, 나머지 한 명은 연을 날리고 있다. (run, ride a bike, fly a kite)', a: 'One is running, another is riding a bike, and the other is flying a kite.', why: '워크북 — 셋' },
      { q: '네 손을 보렴. 하나는 네 오른손이고, 다른 하나는 네 왼손이다. → Look at your hands. (right hand, left hand)', a: 'One is your right hand. The other is your left hand.', why: '워크북 — 손 = 둘' },
      { q: '나는 편지를 세 통 받았다. 하나는 아버지, 또 하나는 어머니, 나머지 하나는 여자친구에게서 온 것이었다. (from)', a: 'I got three letters. One was from my father, another was from my mother, and the other was from my girlfriend.', why: '워크북 — 셋, 과거 was' },
      { q: '새들은 무엇을 하고 있니? — 한 마리는 날고 있고, 나머지 한 마리는 나무 위에 앉아 있어. (fly, sit on the tree)', a: 'One is flying, and the other is sitting on the tree.', why: '교과서 Focus In' },
      { q: '개 두 마리가 있다. 한 마리는 눈을 먹고 있고, 나머지 한 마리는 펄쩍펄쩍 뛰고 있다. (eat snow, jump up and down)', a: 'There are two dogs. One is eating snow, and the other is jumping up and down.', why: '교과서 Focus In 예시 대화' },
      { q: '우리는 평화를 위해 두 가지가 필요하다. 하나는 사랑이고, 나머지 하나는 희망이다. (love, hope)', a: 'We need two things for peace. One is love, and the other is hope.', why: '교과서 Do It Yourself' },
      { q: '두 사람이 홀에서 이야기하고 있다. 한 명은 왕이고 나머지 한 명은 Corky이다. (the king, Corky)', a: 'Two people are talking in the hall. One is the king, and the other is Corky.', why: '교과서 Think and Write' },
      { q: '쌍둥이 중 한 명은 Betty이고, 나머지 한 명은 Liz이다. (one of, twins)', a: 'One of the twins is Betty, and the other is Liz.', why: '워크북 — one of + 복수명사 + 단수동사' },
      { q: '이 셔츠는 마음에 들지 않아요. 다른 것을 보여 주세요. (show, another)', a: 'I don’t like this shirt. Show me another.', why: '워크북 — 또 하나 → another' }] },
  ], m),

  // ---------------- Point 2 ----------------
  D.section('Point 2', 'some ~ others · some ~ the others · one ~ the others — 막연한 다수 vs 정해진 다수', 'point'),
  ...D.table(['표현', '쓰임', '예'], [
    ['some ~, others …', '(막연한 다수 중) 일부는 ~, 다른 일부는 … — 전체 수가 정해지지 않음', 'Many people passed by. **Some** gave Corky angry looks, and **others** shouted at him. (본문)'],
    ['some ~, the others …', '(정해진 다수 중) 일부는 ~, 나머지 전부는 …', 'There are five books. **Some** of them are written in English, and **the others** are in French. (워크북)'],
    ['one ~, the others …', '(정해진 셋 이상 중) 하나는 ~, 나머지 전부는 …', 'Seven people are enjoying the show. **One** is taking pictures, and **the others** are waving their hands. (기출)'],
    ['some ~, others …, the others —', '(정해진 다수 중) 일부 / 또 다른 일부 / 나머지 전부', '**Some** are baseballs. **Others** are tennis balls. **The others** are golf balls. (교과서 Grammar✚)'],
    ['숫자 ~, the others …', 'Three (of them) ~, the others … — 정해진 수에서 남은 전부', 'I have eight books. Three books are novels, and **the others** are comic books. (기출)'],
    ['수 일치', 'some · others · the others → 복수동사 / one · another · the other → 단수동사', 'Three of them are making a snowman, and the others **are** having snowball fights. (기출)']], [2300, 3300, 4038], m),
  ...D.infoBox('전체 수가 정해졌나? — the의 유무', [
    '전체 수가 {{정해지지 않음}} (many people, a lot of people, 사람들 일반) → some ~, others',
    '전체 수가 정해짐 (five books, 20 students, ten people) → 남은 전부에 {{the}} → the others',
    'others = other people(다른 사람들, 남들) — We should be kind to {{others}}. / 단원 제목 Make Peace with Others'], m),
  ...D.trick('세면 더(the), 못 세면 그냥!', ['“셀 수 있으면 디아더스, 못 세면 아더스!”', '“나머지 전부 = 디아더스 — 다 쓸어 담는 더(the)!”']),
  ...D.examPoint([
    { q: 'Many people passed by. Some gave Corky angry looks, and {{others}} shouted at him. (the others ✗)', why: '지나가는 사람들 — 전체 수가 정해지지 않음 (본문)' },
    { q: 'I have eight books. Three books are novels and {{the others}} are comic books.', why: '여덟 권 중 남은 다섯 권 전부 (기출)' }], m),
  ...D.caution(['a lot of people · many people(막연한 다수)인데 the others를 쓴 선지 — There are a lot of people in the park. Some are riding bikes and the others ✗ (워크북)',
    '정해진 수(20 students · 25 students · five dogs)인데 others · the other를 쓴 선지가 짝으로 나온다.',
    'the others 뒤 단수동사(the others is ✗), the other 뒤 복수동사(the other are ✗) 수일치 함정 (기출)',
    '본문 Some gave Corky angry looks, and ⓑothers shouted at him.의 others는 어법상 옳은 쪽으로 출제된다 — the others로 고치는 학생이 많다.'], m),
  ...D.drill(2, 'some ~ others · some ~ the others · one ~ the others', [
    { level: 'Basic ①', type: 'choice', instr: '괄호 안에서 알맞은 것을 고르시오.', items: [
      { q: 'Some boys are playing soccer, and (others / other) are playing baseball.', a: 'others', why: 'other 단독 복수 주어 ✗ → others (워크북)' },
      { q: 'Many people passed by. Some gave Corky angry looks, and (the others / others) shouted at him.', a: 'others', why: '막연한 다수 (본문)' },
      { q: 'There are four watches. One is mine, and (the other / the others) are my sister’s.', a: 'the others', why: '넷 중 나머지 셋 전부 · are (워크북)' },
      { q: 'Some people like classical music, and (others / the others) like popular music.', a: 'others', why: '사람들 일반 — 막연한 다수 (워크북)' },
      { q: 'I invited ten people to my birthday party. Some came, but (the others / others) didn’t.', a: 'the others', why: '정해진 10명 중 나머지 전부 (워크북)' },
      { q: 'She bought three books. One was for herself, and (others / the others) were for her parents.', a: 'the others', why: '셋 중 나머지 둘 전부 (워크북)' },
      { q: 'Seven people are enjoying the show. One is taking pictures, and the others (are / is) waving their hands.', a: 'are', why: 'the others → 복수동사 (기출)' },
      { q: 'There were 19 other warriors in the hall. Corky and (the others / the other) began fighting.', a: 'the others', why: '정해진 19명 전부 (본문)' },
      { q: 'Some students enjoy working in groups, but (the other / others) prefer working on their own.', a: 'others', why: '학생들 일반 — 막연한 다수 (워크북)' },
      { q: 'There are 20 students in my class. Some of them like math, and (others / the others) don’t like it.', a: 'the others', why: '정해진 20명 중 나머지 전부 (워크북)' }] },
    { level: 'Basic ②', type: 'fill', instr: '<보기>에서 알맞은 말을 골라 빈칸에 쓰시오. (한 번씩만 사용)',
      bogi: ['the others', 'were', 'Some', 'is', 'many', 'Three', 'others', 'of', 'One', 'are'], items: [
      { q: '[[Some]] believe in ghosts, while others don’t believe in them at all.', why: '워크북 — some ~, others (막연한 다수)' },
      { q: 'Some people go jogging in the morning, and [[others]] go jogging at night.', why: '워크북 — 사람들 일반' },
      { q: 'There are three cars. One is red, and [[the others]] are silver.', why: '워크북 — 셋 중 나머지 둘 전부' },
      { q: 'Ten children are in the snow. Three of them are making a snowman, and the others [[are]] having snowball fights.', why: '기출 — the others + 복수동사' },
      { q: 'I have eight books. [[Three]] books are novels, and the other five are comic books.', why: '기출 변형 — 8 = 3 + 5' },
      { q: 'Some [[of]] the apples in the basket are ripe, but the others are unripe.', why: '워크북 — some of + 정해진 대상' },
      { q: 'There were [[many]] people in the park. Some were playing tennis, and others were eating lunch.', why: '워크북 — 막연한 다수 → others' },
      { q: 'I got three presents. One was from my mom, and the others [[were]] from my friends.', why: '워크북 — the others + 복수동사(과거)' },
      { q: '[[One]] of his seven sons is very tall, and the others are short.', why: '워크북 — one of + 복수명사 + 단수동사' },
      { q: 'There are five dogs. One [[is]] black, and the others are white.', why: 'one + 단수동사' }] },
    { level: 'Intermediate', type: 'write', instr: '어법상 틀린 부분을 찾아 바르게 고쳐 쓰시오.', items: [
      { q: 'There are a lot of people in the park. Some are riding bikes and the others are reading books.', a: 'the others → others', why: '워크북 — 막연한 다수' },
      { q: 'There are 20 students in my class. Some of them like math, and the other doesn’t like it.', a: 'the other doesn’t → the others don’t', why: '워크북 — 정해진 20명 중 나머지 전부' },
      { q: 'You can see many shapes around you. Some are squares and the other are circles.', a: 'the other → others', why: '워크북 — 막연한 다수' },
      { q: 'There are 25 students in the class. Some are girls and others are boys.', a: 'others → the others', why: '워크북 — 정해진 25명 중 나머지 전부' },
      { q: 'Five singers are on the stage. One is singing, and the other are dancing to the song.', a: 'the other → the others', why: '기출 — 다섯 명 중 나머지 넷' },
      { q: 'Ten children are having fun in the snow. Three of them are making a snowman, and the others is having snowball fights.', a: 'is → are', why: '기출 — the others + 복수동사' },
      { q: 'I bought three shirts. One is red and others are yellow.', a: 'others → the others', why: '기출 — 셋 중 나머지 둘 전부' },
      { q: 'Many people passed by. Some gave Corky angry looks, and other shouted at him.', a: 'other → others', why: '본문 — other 단독 ✗' },
      { q: 'Some magazines are interesting, while the other are not.', a: 'the other → others', why: '워크북 — 막연한 다수' },
      { q: 'There were 19 other warriors in the hall. Corky and the other began fighting.', a: 'the other → the others', why: '본문 기출 — 19명 전부' }] },
    { level: 'Advanced · 모두 고르기', type: 'multi', free: true, instr: '해당하는 것을 모두 골라 기호를 쓰시오.', items: [
      { q: '다음 중 어법상 어색한 것을 모두 고르시오.', box: [
        '(a) There are 30 students in my class. Some walk to school, and the others take the bus.', '(b) Some people like rock music, and the others like jazz.', '(c) Five boys are in the gym. One is jumping rope, and the others are playing basketball.',
        '(d) I have three sisters. One is a nurse, and the others is a student.', '(e) A lot of tourists visit Jeju. Some go to the beach, and others climb Hallasan.'], a: '(b), (d)', why: '(b) 사람들 일반 → others (d) the others are students' },
      { q: '밑줄 친 부분에 대한 설명으로 옳은 것을 모두 고르시오.', box: [
        '(a) Many people passed by. Some gave Corky angry looks, and __others__ shouted at him. → 수가 정해지지 않은 사람들 중 또 다른 몇몇이다.',
        '(b) Corky and __the others__ began fighting. → 홀에 있던 전사들 중 Corky를 뺀 나머지 전부이다.',
        '(c) I have eight books. Three are novels and __the others__ are comic books. → 남은 책 중 일부만 가리킨다.',
        '(d) Some are baseballs. Others are tennis balls. __The others__ are golf balls. → 남은 공 전부이므로 the를 붙였다.',
        '(e) __Some__ like summer; others like winter. → 정해진 두 사람 중 한 명이다.'], a: '(a), (b), (d)', why: '(c) 남은 다섯 권 전부 (e) 막연한 다수 중 일부' },
      { q: '다음 글(본문 변형)의 밑줄 친 ⓐ~ⓔ 중 어법상 어색한 것을 모두 골라 기호를 쓰고 바르게 고치시오.', fix: true, label: '기호 / 고친 것', box: [
        'Many people passed by. ⓐ __Some__ gave Corky angry looks, and ⓑ __the others__ shouted at him. … Next, the teacher took Corky to a large hall. There were 19 ⓒ __other__ warriors who had passed their tests. Corky and ⓓ __the other__ began fighting. ⓔ __The other__ warriors saw this and fought even harder.'],
        a: 'ⓑ the others → others, ⓓ the other → the others', why: 'ⓑ 지나가는 사람들 — 막연한 다수 ⓓ 19명 전부 (ⓒ · ⓔ는 형용사 용법으로 옳음 — Point 3)' },
      { q: '빈칸에 the others가 들어갈 수 있는 것을 모두 고르시오.', box: [
        '(a) Some people go jogging in the morning, and _​_​_​_​_​_ go jogging at night.', '(b) There were three books on the desk. One is here. Where are _​_​_​_​_​_?', '(c) Mrs. Lee has two daughters. One is a nurse, and _​_​_​_​_​_ is a singer.',
        '(d) I have four tickets. One is for my sister, and _​_​_​_​_​_ are for my brothers.', '(e) He has five children. Two of them are soldiers, and _​_​_​_​_​_ are students.'], a: '(b), (d), (e)', why: '(a) 사람들 일반 → others (c) 둘 → the other' },
      { q: '다음 그림 설명(교과서 Focus In 변형) 중 어법에 맞는 것을 모두 고르시오.', box: [
        '(a) Many people are in the snow. Some are making snowmen, and others are playing with snowballs.',
        '(b) Three children are building a snowman. One is rolling a big snowball, and the others are holding sticks.',
        '(c) Ten children are having fun. Three of them are making a snowman, and the others is having snowball fights.',
        '(d) Five singers are on the stage. One is singing, and the other are dancing.',
        '(e) Seven people are enjoying the show. One is taking pictures, and the others are waving their hands.'], a: '(a), (b), (e)', why: '(c) is → are (d) the other → the others (기출)' }] },
    { level: 'Advanced · 객관식', type: 'mcq', free: true, instr: '알맞은 답을 고르시오.', items: [
      { q: '빈칸에 알맞은 말이 순서대로 짝지어진 것은? — Many teenagers are big fans of BTS. _​_​_​_​_​_ like their beautiful songs, and _​_​_​_​_​_ like their powerful dancing.', opts: [
        'One – another', 'Another – one', 'The former – the latter', 'Some – others', 'This – that'], a: '④', why: '막연한 다수 → some ~, others (기출)' },
      { q: '빈칸에 들어갈 말로 알맞은 것은? — I have eight books. Three books are novels and _​_​_​_​_​_ are comic books.', opts: [
        'the others', 'some', 'they', 'others', 'the other'], a: '①', why: '정해진 여덟 권 중 남은 전부 (기출)' },
      { q: '다음 중 어법에 맞는 것은?', opts: [
        'There are two dogs. One is eating snow, and another is jumping up and down.', 'Five singers are on the stage. One is singing, and the other are dancing to the song.',
        'Ten children are having fun. Three of them are making a snowman, and the others is having snowball fights.', 'Three children are building a snowman. One is rolling a big snowball, the other is lifting a small snowball, and another is holding two sticks.',
        'Seven people are enjoying the show. One is taking pictures and the others are waving their hands to the song.'], a: '⑤', why: '① the other ② the others ③ are ④ another – the other 순서 (기출)' },
      { q: '빈칸에 others가 들어갈 수 없는 것은?', opts: [
        'Some like summer; _​_​_​_​_​_ like winter.', 'We should be kind to _​_​_​_​_​_.', 'I have four caps. One is red, and _​_​_​_​_​_ are blue.',
        'Some people drink coffee in the morning; _​_​_​_​_​_ prefer tea.', 'Don’t care about _​_​_​_​_​_. It’s time to think about yourself.'], a: '③', why: '③ 정해진 넷 중 나머지 전부 → the others' },
      { q: '(A)~(C)에 알맞은 말이 바르게 짝지어진 것은? — (A) Many people passed by. Some gave Corky angry looks, and (others / the others) shouted at him. (B) There were 19 other warriors. Corky and (the other / the others) began fighting. (C) Ten people came. Some sang, and the others (was / were) dancing.', opts: [
        'others – the other – was', 'others – the others – were', 'the others – the others – were', 'others – the others – was', 'the others – the other – were'], a: '②', why: '막연한 다수 / 19명 전부 / the others + 복수동사' }] },
    { level: '배열 · 영작', type: 'write', instr: '우리말과 같은 뜻이 되도록 괄호 안의 말을 이용하여 영작하시오.', items: [
      { q: '이 바구니 안의 사과 몇 개는 잘 익었지만, 나머지는 덜 익었다. (some of, ripe, the others, unripe)', a: 'Some of the apples in the basket are ripe, but the others are unripe.', why: '워크북 — 정해진 바구니 안 사과' },
      { q: '그의 일곱 아들 중 한 명은 키가 매우 크고, 나머지는 작다. (one of, the others)', a: 'One of his seven sons is very tall, and the others are short.', why: '워크북 — one ~, the others' },
      { q: '나는 남자형제가 넷 있다. 한 명은 나보다 어리고, 나머지는 나보다 나이가 많다. → I have four brothers. (younger, older)', a: 'One is younger than I, and the others are older than I[me].', why: '워크북 — 넷 중 하나 / 나머지 셋' },
      { q: '그 꽃 가게에는 장미가 많이 있었다. 어떤 것들은 노란색이었고, 다른 것들은 흰색이었다. (some, others)', a: 'There were lots of roses in the flower shop. Some were yellow, and others were white.', why: '워크북 — 막연한 다수' },
      { q: '어떤 잡지들은 흥미로운 반면, 다른 잡지들은 그렇지 않다. (some magazines, while, others)', a: 'Some magazines are interesting, while others are not.', why: '워크북 — some ~, others' },
      { q: '어떤 사람들은 고기를 먹는 반면, 다른 사람들은 먹지 않는다. (eat meat, while, do not)', a: 'Some eat meat while others do not.', why: '워크북 — 사람들 일반' },
      { q: '광장에 많은 사람들이 있다. 한 사람은 노래를 부르고 있고, 나머지 모두는 그 노래에 맞춰 춤을 추고 있다. (sing, dance to the song)', a: 'One is singing, and the others are dancing to the song.', why: '워크북 — 하나 / 나머지 전부' },
      { q: '세 권의 책이 있다. 하나는 내 것이고, 나머지는 그녀의 것이다. (mine, hers)', a: 'There are three books. One is mine, and the others are hers.', why: '워크북 — 셋 중 하나 / 나머지 둘' },
      { q: '많은 사람이 지나갔다. 몇몇은 Corky를 화난 표정으로 쳐다봤고, 다른 몇몇은 그에게 소리를 질렀다. (give, angry looks, shout at)', a: 'Many people passed by. Some gave Corky angry looks, and others shouted at him.', why: '본문' },
      { q: '많은 사람이 Corky 주변에 서 있다. 한 사람은 Corky에게 말하고 있고, 나머지는 듣고 있다. (talk to, listen)', a: 'One is talking to Corky, and the others are listening.', why: '교과서 Think and Write' }] },
  ], m),

  // ---------------- Point 3 ----------------
  D.section('Point 3', '(심화) another · other · the other + 명사 · others · one vs it — 본문 another way · 19 other warriors', 'point'),
  ...D.table(['구분', '설명', '예'], [
    ['another + 단수명사', '또 하나의, 다른 (an + other) — 복수명사 앞 ✗', '“I need to try **another way**,” he thought. (본문)'],
    ['other + 복수명사', '(막연한) 다른 ~들 — 단수명사 앞 ✗', 'There were **19 other warriors** who had passed their tests. (본문)'],
    ['the other + 명사', '(정해진 것 중) 나머지 ~ / 복수명사면 나머지 전부', '**The other warriors** saw this and fought even harder. (본문)'],
    ['others = other + 복수명사', '대명사 — 다른 사람들[것들], 남들', 'We should be kind to **others**. (기출) / Make Peace with **Others** (단원 제목)'],
    ['one vs it', 'one = a + 명사(같은 종류의 아무거나) / it = the + 명사(바로 그것) / 복수는 ones', 'My computer is broken, so I’ll buy **one**. (기출) / I lost my pen, but I found **it** under the desk.'],
    ['one (사람)', 'the first one = 첫 번째 사람 — 형용사의 꾸밈을 받는 one', '“**The first one** to sit in the chair will be the winner.” (본문)']], [2300, 3300, 4038], m),
  ...D.infoBox('대명사인가, 형용사인가? — 뒤에 명사가 있는지 보자', [
    '뒤에 명사가 오면 형용사: another {{way}}(단수) / other warriors(복수) / the other warriors',
    '뒤에 명사가 없으면 대명사: another / {{others}} / the other / the others (other 혼자 주어 · 목적어 ✗)',
    'another + 복수명사 ✗ (19 another warriors ✗) / other + 단수명사 ✗ (He gave me other chance ✗ → {{another}} chance)'], m),
  ...D.trick('어나더는 하나, 아더는 여럿!', ['“어나더 뒤엔 하나, 아더 뒤엔 여럿!”', '“아더 혼자 오면 탈락 — s를 붙이든 the를 붙이든!”']),
  ...D.trick('원은 아무거나, 잇은 바로 그거!', ['“새로 살 땐 원(one), 찾았으면 잇(it)!”']),
  ...D.examPoint([
    { q: '“I need to try {{another}} way,” he thought. (other ✗)', why: 'another + 단수명사 (본문)' },
    { q: 'I failed once. Fortunately, he gave me {{another}} chance. (other chance ✗)', why: '단수명사 앞 → another (기출)' }], m),
  ...D.caution(['기출: ⓒ We should be kind to others(○) / ⓓ He gave me other chance(✗) — others(남들)를 틀린 것으로 고르는 학생이 많다.',
    '본문 There were 19 other warriors(○) ↔ 19 another warriors ✗ / The other warriors saw this(○) — the other + 복수명사는 옳다.',
    'one vs it — My computer is broken, so I’ll buy one(○, 새것 아무거나) — 같은 문항에 Can you show me another?(○)가 함께 나온다. (기출)',
    'all the warriors except Thunder were(○) — all + 복수명사 → 복수동사, Thunder에 맞춰 was로 고치는 함정 (본문 기출)'], m),
  ...D.drill(3, 'another · other · the other + 명사 · others · one vs it', [
    { level: 'Basic ①', type: 'choice', instr: '괄호 안에서 알맞은 것을 고르시오.', items: [
      { q: '“I need to try (other / another) way,” he thought.', a: 'another', why: 'another + 단수명사 (본문)' },
      { q: 'There were 19 (another / other) warriors who had passed their tests.', a: 'other', why: 'other + 복수명사 (본문)' },
      { q: '(The other / Another) warriors saw this and fought even harder.', a: 'The other', why: '나머지 전사들 — the other + 복수명사 (본문)' },
      { q: 'We should be kind to (others / other).', a: 'others', why: '남들 = other people (기출)' },
      { q: 'I failed once. Fortunately, he gave me (other / another) chance.', a: 'another', why: '단수명사 chance 앞 (기출)' },
      { q: 'My computer is broken, so I’ll buy a new (one / it).', a: 'one', why: '같은 종류의 아무 컴퓨터 → one (기출 변형)' },
      { q: 'I lost my wallet yesterday, but I found (it / one) under my bed.', a: 'it', why: '잃어버린 바로 그 지갑' },
      { q: 'Some students have long hair. (Other / Others) have short hair.', a: 'Others', why: '대명사 → others (other 단독 ✗)' },
      { q: 'She lives on (another / the other) side of the river.', a: 'the other', why: '강의 양쪽 = 둘 → 나머지 한쪽' },
      { q: '“The first (one / ones) to sit in the chair will be the winner,” the teacher said.', a: 'one', why: '가장 먼저 앉는 한 사람 (본문)' }] },
    { level: 'Basic ②', type: 'fill', instr: '<보기>에서 알맞은 말을 골라 빈칸에 쓰시오. (한 번씩만 사용)',
      bogi: ['ones', 'each', 'other', 'it', 'all', 'another', 'way', 'others', 'the other', 'one'], items: [
      { q: '“I need to try another [[way]],” he thought.', why: '본문 — another + 단수명사' },
      { q: 'There were 19 [[other]] warriors who had passed their tests.', why: '본문 — other + 복수명사' },
      { q: 'Corky had two swords. He held one in his right hand and [[the other]] in his left hand.', why: '두 자루 중 나머지 하나' },
      { q: 'This cake is delicious. Can I have [[another]] piece?', why: '또 한 조각 — another + 단수명사' },
      { q: 'Be kind to [[others]], and they will be kind to you.', why: '남들 = other people' },
      { q: 'I don’t have a pencil. Can you lend me [[one]]?', why: '아무 연필 하나 → one' },
      { q: 'Where is my phone? I can’t find [[it]].', why: '바로 그 전화기 → it' },
      { q: 'These shoes are too small. I need bigger [[ones]].', why: '복수 shoes → ones' },
      { q: 'Corky and Thunder looked at [[each]] other and smiled.', why: 'each other — 서로' },
      { q: 'Soon, [[all]] the warriors except Thunder were following Corky.', why: '본문 — all + the + 복수명사 + 복수동사' }] },
    { level: 'Intermediate', type: 'write', instr: '어법상 틀린 부분을 찾아 바르게 고쳐 쓰시오.', items: [
      { q: '“I need to try other way,” he thought.', a: 'other → another', why: '본문 — 단수명사 way 앞' },
      { q: 'There were 19 another warriors who had passed their tests.', a: 'another → other', why: '본문 — 복수명사 warriors 앞' },
      { q: 'I failed once. Fortunately, he gave me other chance.', a: 'other → another', why: '기출 — 단수명사 chance 앞' },
      { q: 'We should be kind to other.', a: 'other → others', why: '대명사 — other 단독 ✗' },
      { q: 'My bike is broken, so I need to buy a new it.', a: 'it → one', why: '같은 종류의 아무 자전거' },
      { q: 'This is my new phone. My dad bought one for me.', a: 'one → it', why: '바로 이 전화기 → it' },
      { q: 'These pants are too long. Do you have shorter one?', a: 'one → ones', why: '복수 pants → ones' },
      { q: 'Another warriors saw this and fought even harder.', a: 'Another → The other', why: '본문 — 나머지 전사들, another + 복수 ✗' },
      { q: 'Soon, all the warriors except Thunder was following Corky.', a: 'was → were', why: '본문 기출 — 주어 all the warriors(복수)' },
      { q: 'There are still many cookies in the jar. Can I have the other cookie?', a: 'the other → another', why: '아직 많이 남아 있음 → 또 하나' }] },
    { level: 'Advanced · 모두 고르기', type: 'multi', free: true, instr: '해당하는 것을 모두 골라 기호를 쓰시오.', items: [
      { q: '다음 중 어법상 옳은 문장을 모두 고르시오.', box: [
        '(a) “I need to try other way,” he thought.', '(b) There were 19 another warriors in the hall.', '(c) We should be kind to others.',
        '(d) I failed once, but he gave me another chance.', '(e) My computer is broken, so I’ll buy one.'], a: '(c), (d), (e)', why: '(a) other → another (b) another → other' },
      { q: '밑줄 친 부분에 대한 설명으로 옳은 것을 모두 고르시오.', box: [
        '(a) There were 19 __other__ warriors. → 복수명사 warriors를 꾸미는 형용사이다.',
        '(b) __The other__ warriors saw this. → Corky를 제외한 나머지 전사들을 가리킨다.',
        '(c) My computer is broken, so I’ll buy __one__. → 고장 난 바로 그 컴퓨터를 가리킨다.',
        '(d) Make Peace with __Others__ → ‘다른 사람들’이라는 뜻의 대명사이다.',
        '(e) I need to try __another__ way. → 복수명사 앞에도 쓸 수 있다.'], a: '(a), (b), (d)', why: '(c) 같은 종류의 새 컴퓨터 (e) another + 단수명사만' },
      { q: '다음 글(본문 변형)의 밑줄 친 ⓐ~ⓔ 중 어법상 어색한 것을 모두 골라 기호를 쓰고 바르게 고치시오.', fix: true, label: '기호 / 고친 것', box: [
        '“I need to try ⓐ __other__ way,” he thought. Then, Corky began to speak softly. … There were 19 ⓑ __other__ warriors who had passed their tests. Corky and ⓒ __the others__ began fighting. … ⓓ __Another__ warriors saw this and fought even harder. Soon, ⓔ __all__ the warriors except Thunder were following Corky.'],
        a: 'ⓐ other → another, ⓓ Another → The other', why: 'ⓐ 단수명사 way 앞 ⓓ 나머지 전사들 — another + 복수명사 ✗' },
      { q: '빈칸에 another가 들어갈 수 있는 것을 모두 고르시오.', box: [
        '(a) I don’t like this shirt. Show me _​_​_​_​_​_.', '(b) I’ll stay here for _​_​_​_​_​_ week.', '(c) This pie is delicious. Can I have _​_​_​_​_​_ piece?',
        '(d) I have two hands. One is big, and _​_​_​_​_​_ is small.', '(e) Some people like dogs, and _​_​_​_​_​_ like cats.'], a: '(a), (b), (c)', why: '(d) 둘 → the other (e) 막연한 다수 → others' },
      { q: '다음 대화의 밑줄 친 ⓐ~ⓔ 중 어법상 알맞은 것을 모두 고르시오.', box: [
        'A: My pen doesn’t work. Can you lend me ⓐ __one__?',
        'B: Sure. Oh, wait. This is my favorite pen. Please give ⓑ __one__ back to me later.',
        'A: OK. By the way, do you have ⓒ __another__ eraser?',
        'B: Yes, I have two erasers. Take ⓓ __the other__ one. I’ll use this one.',
        'A: Thanks. You’re always kind to ⓔ __other__.'], a: 'ⓐ, ⓒ, ⓓ', why: 'ⓑ 바로 그 펜 → it ⓔ 대명사 → others' }] },
    { level: 'Advanced · 객관식', type: 'mcq', free: true, instr: '알맞은 답을 고르시오.', items: [
      { q: '빈칸에 들어갈 말로 알맞은 것은? — “I need to try _​_​_​_​_​_ way,” he thought.', opts: [
        'other', 'another', 'others', 'the others', 'ones'], a: '②', why: 'another + 단수명사 (본문)' },
      { q: '다음 중 밑줄 친 부분이 어색한 것은?', opts: [
        'My computer is broken, so I’ll buy __one__.', 'I think it doesn’t look good on me. Can you show me __another__?', 'Some like summer; __others__ like winter.',
        'I have three balls. One is red and __the other__ are yellow.', 'If you have a pencil, please lend me __one__.'], a: '④', why: '④ 셋 중 나머지 둘 → the others (기출)' },
      { q: '다음 중 어색한 부분이 있는 것끼리 짝지어진 것은?', box: [
        'ⓐ Mrs. Green has five dogs. Four of them are brown and the other is black.', 'ⓑ I bought three shirts. One is red and others are yellow.', 'ⓒ We should be kind to others.',
        'ⓓ I failed once. Fortunately, he gave me other chance.', 'ⓔ There are a lot of people in the park. Some are playing soccer, and others are sitting on the bench.'],
        opts: ['ⓑ, ⓓ', 'ⓐ, ⓑ', 'ⓐ, ⓒ', 'ⓑ, ⓒ', 'ⓐ, ⓑ, ⓔ'], a: '①', why: 'ⓑ the others ⓓ another chance / ⓐ 다섯 중 남은 하나 → the other ○ (기출)' },
      { q: '본문의 빈칸 (A)~(C)에 들어갈 말이 바르게 짝지어진 것은? — There were 19 (A) _​_​_​_​_​_ warriors who had passed their tests. … Corky and (B) _​_​_​_​_​_ began fighting. … (C) _​_​_​_​_​_ warriors saw this and fought even harder.', opts: [
        'another – the other – Other', 'other – the other – Another', 'other – others – The other', 'another – the others – The others', 'other – the others – The other'], a: '⑤', why: 'other + 복수명사 / 나머지 전부 the others / 나머지 전사들 The other warriors (본문)' },
      { q: '빈칸에 one이 아니라 it이 들어가야 하는 것은?', opts: [
        'My bike is too old. I want a new _​_​_​_​_​_.', 'I don’t have a pencil. Can you lend me _​_​_​_​_​_?', 'This is the watch my dad gave me. I love _​_​_​_​_​_ very much.',
        'There are many apples. You can take _​_​_​_​_​_.', 'This cap is too small. Do you have a bigger _​_​_​_​_​_?'], a: '③', why: '③ 아빠가 준 바로 그 시계 → it' }] },
  ], m),

  // ---------------- PERFECT CHECK ----------------
  D.section('PERFECT CHECK', '상위권 함정 체크'),
  ...D.drill(null, '', [{ level: '함정', type: 'choice', instr: '실수하기 쉬운 문장들이에요. 괄호 안에서 알맞은 것을 고르시오.', items: [
    { q: 'Many people passed by. Some gave Corky angry looks, and (others / the others) shouted at him.', a: 'others', why: '본문 — 막연한 다수' },
    { q: 'A: What are the birds doing? B: One is flying, and (another / the other) is sitting on the tree.', a: 'the other', why: '교과서 — 두 마리' },
    { q: 'There were 19 (other / another) warriors who had passed their tests.', a: 'other', why: '본문 — other + 복수명사' },
    { q: 'Corky and (the others / the other) began fighting.', a: 'the others', why: '본문 — 19명 전부' },
    { q: 'I have four caps. One is red, and the others (is / are) blue.', a: 'are', why: 'the others + 복수동사' },
    { q: 'Three children are building a snowman. One is rolling a big snowball, (the other / another) is lifting a small one, and the other is holding sticks.', a: 'another', why: '기출 — 셋 중 두 번째' },
    { q: 'The teacher told Corky (to stand / stand) against a pole.', a: 'to stand', why: '본문 — tell + 목적어 + to부정사 (같은 과 5형식)' },
    { q: 'My bike is broken, so I need a new (it / one).', a: 'one', why: '같은 종류의 아무 자전거' },
    { q: 'The king ordered him (go / to go) to a famous military school.', a: 'to go', why: '본문 — order + 목적어 + to부정사 (같은 과 5형식)' },
    { q: 'There are 25 students in the class. Some are girls and (the others / others) are boys.', a: 'the others', why: '워크북 — 정해진 25명 중 나머지 전부' }] }], m),

  // ---------------- WRITE ----------------
  D.section('WRITE', '서술형 대비'),
  ...D.writeItem(1, 'Basic', '빈칸에 알맞은 부정대명사를 쓰시오.', ['A: What are the birds doing?', 'B: One is flying, and _​_​_​_​_​_​_​_​_​_​_​_​_​_ is sitting on the tree. (교과서)'], { a: 'the other', why: '정해진 두 마리 중 나머지 한 마리' }, m),
  ...D.writeItem(2, 'Basic', '빈칸에 알맞은 부정대명사를 쓰시오.', ['Many people passed by. Some gave Corky angry looks, and _​_​_​_​_​_​_​_​_​_​_​_​_​_ shouted at him. (본문)'], { a: 'others', why: '지나가는 사람들 — 전체 수가 정해지지 않은 다수' }, m),
  ...D.writeItem(3, 'Intermediate', '주어진 정보를 one과 the other를 사용하여 한 문장으로 연결하시오. [두 문장 연결]', ['There are two girls in the playground.', 'A girl is jumping a rope. The remaining girl is flying a kite.'],
    { a: 'One is jumping a rope, and the other is flying a kite.', why: '기출 서술형 — 정해진 둘' }, m),
  ...D.writeItem(4, 'Intermediate', '주어진 정보를 one, another, the other를 사용하여 한 문장으로 연결하시오. [두 문장 연결]', ['My sister has three hobbies.', 'Hobby 1: playing the piano / Hobby 2: reading a book / Hobby 3: singing a song'],
    { a: 'One is playing the piano, another is reading a book, and the other is singing a song.', why: '기출 — 셋: one → another → the other' }, m),
  ...D.writeItem(5, 'Intermediate', '주어진 정보를 some과 the others를 사용하여 한 문장으로 바꾸어 쓰시오. [문장 전환]', ['There are ten people in the park.', 'Four of them are reading books. All the remaining people are riding bikes.'],
    { a: 'Some are reading books, and the others are riding bikes.', why: '정해진 10명 중 나머지 전부 → the others' }, m),
  ...D.writeItem(6, 'Intermediate', '밑줄 친 부분을 부정대명사로 바꾸어 문장을 다시 쓰시오. [문장 전환]', ['We should be kind to __other people__.'],
    { a: 'We should be kind to others.', why: 'other people = others (기출)' }, m),
  ...D.writeItem(7, 'Advanced', '우리말과 같은 뜻이 되도록 <조건>에 맞게 영작하시오.', ['나의 친구 Sumi는 두 가지 장점을 가지고 있다. 하나는 그녀가 노래를 잘한다는 것이다. 다른 하나는 그녀가 유머가 있다는 것이다.', 'My friend Sumi has two strong points. One is that she sings well. _​_​_​_​_​_​_​_​_​_​_​_​_​_​_​_​_​_​_​_​_​_​_​_​_​_​_​_​_​_', '<조건> 부정대명사를 사용할 것 · that절을 사용할 것 · humorous를 사용할 것 · 총 7단어'],
    { a: 'The other is that she is humorous.', why: '기출 서술형 · 7단어 (The/other/is/that/she/is/humorous)' }, m),
  ...D.writeItem(8, 'Advanced', '<보기>의 단어를 배열하여 문장을 완성하시오. (필요하면 형태를 바꿀 것)', ['많은 사람이 지나갔다. 몇몇은 Corky를 화난 표정으로 쳐다봤고, 다른 몇몇은 그에게 소리를 질렀다.', 'Many people passed by.', '<보기> some / give / Corky / angry looks / and / other / shout at / him'],
    { a: 'Some gave Corky angry looks, and others shouted at him.', why: 'give → gave, other → others, shout → shouted (본문)' }, m),
  ...D.writeItem(9, 'Advanced', '어법상 틀린 부분 2개를 찾아 바르게 고치고, 그 이유를 쓰시오.', ['There are two dogs in the snow. One is eating snow, and another is jumping up and down. Many children are watching them. Some are laughing, and the others are taking pictures.'],
    { a: '① another → the other  ② the others → others', why: '① 정해진 둘 중 나머지 하나는 the other ② 아이들의 수가 정해지지 않은 막연한 다수이므로 others', blanks: ['고친 것', '이유'] }, m),
  ...D.writeItem(10, 'Advanced', '어법상 틀린 부분 2개를 찾아 바르게 고치고, 그 이유를 쓰시오.', ['“I need to try other way,” Corky thought. Later, there were 19 other warriors in the hall. Corky and the other began fighting.'],
    { a: '① other way → another way  ② the other → the others', why: '① 단수명사 way 앞에는 another ② 정해진 19명 전부를 가리키므로 the others', blanks: ['고친 것', '이유'] }, m),

  // ---------------- MAP ----------------
  D.section('MAP', "DAVID'S MAP — 백지노트 테스트"),
  D.P([D.T('오늘 배운 내용을 떠올리며 빈칸을 채워 보세요. 책을 보지 않고!', { size: 18, color: '595959' })], { spacing: { after: 120 }, keepNext: true }),
  ...D.image(path.join(__dirname, 'map_G-부정대명사.png'), 620),
  ...D.table(['자가 체크 — 백지노트에 이 단어들이 들어갔나요?', '✔'], [
    ['부정대명사 = 정해지지 않은 대상을 가리키는 대명사 (one · another · other · some · all …)', ''], ['정해진 둘: one ~, the other …', ''],
    ['정해진 셋: one ~, another …, the other —', ''], ['막연한 다수: some ~, others … (many people · 사람들 일반)', ''],
    ['정해진 다수: some[one · 숫자] ~, the others … — 남은 전부에 the', ''], ['수 일치: the other · another · one → 단수 / the others · others → 복수', ''],
    ['another + 단수명사 · other + 복수명사 · the other + 명사', ''], ['others = other people (남들) · other 혼자 ✗', ''],
    ['one(같은 종류 아무거나) vs it(바로 그것) · ones', ''],
    ['본문: Some gave Corky angry looks, and others shouted at him. / Corky and the others began fighting.', '']], [8838, 800], m),
  ...D.memo(['다음 시간 도입: 도형 퀴즈 — ○△ · ○△★ · ○○○△△△ 그림을 보고 부정대명사 말하기 10문항', '약한 반: Point 1 · 2(the 유무)만 확실히 → Point 3은 another way · 19 other warriors · the other warriors 본문 3문장만 집중',
    '같은 과 5형식(tell · order + 목적어 + to부정사)과 섞어 본문 단락(Then, the teacher told Corky to stand … Some gave Corky angry looks, and others shouted at him.) 통째 암기 확인', '서술형 단골: other → the other(기출 14번), The other is that she is humorous.(기출 22번) — 쓰기 연습 2회 반복'], m),
];
D.render(meta, build, process.argv[2] || '.').then(f => console.log(f.join('\n')));
