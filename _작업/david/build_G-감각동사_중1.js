const D0 = require('./david_base');
const path = require('path');
const fs = require('fs');
// 중1 천재(이상기) 7과 목표 문법 ① 감각동사 + 형용사 (같은 과 ② 비교급은 별도 스크립트)
// 한 문장에 빈칸 ______ 이 두 개 이상이면 david_base의 __밑줄__ 서식으로 잘못 읽히므로
// 밑줄 3개 이상 이어진 빈칸은 밑줄 사이에 U+200B를 넣어 둔다 (beworth · the비교급 · with분사 스크립트와 같은 처리).
const ZB = (s) => s.replace(/_{3,}/g, (u) => u.split('').join('​'));
const deep = (v) => typeof v === 'string' ? ZB(v) : Array.isArray(v) ? v.map(deep)
  : (v && typeof v === 'object' && v.constructor === Object) ? Object.fromEntries(Object.entries(v).map(([k, x]) => [k, deep(x)])) : v;
const D = new Proxy(D0, { get: (t, k) => (typeof t[k] === 'function' && !['render', 'P', 'T', 'image'].includes(k)) ? (...a) => t[k](...deep(a)) : t[k] });
const COVER = JSON.parse(process.env.COVER || '{}');
const TITLE = '감각동사';
const meta = { series: D.SERIES.G, code: 'G-감각동사', title: TITLE, category: 'G. 문장의 형식  |  감각동사 (look · smell · taste · sound · feel) + 형용사',
  rightText: 'G  감각동사 + 형용사', prefix: process.env.PREFIX || '', cover: COVER.title ? COVER : undefined,
  question: 'Do you feel ~~hungry~~ now? — 우리말은 ‘배고프게’ 느끼는데 왜 hungrily가 아닐까? 그리고 It will taste ~~better~~!는 왜 well이 아닐까?' };

const build = (m) => [
  D.section('FLOW', 'Teaching Flow — 처음 배우는 사람도 따라오는 5단계'),
  ...D.step(1, '우리말로 먼저 생각하기 — ‘~하게 보이다 · ~한 맛이 나다’', [
    '‘이 수프는 맛있는 냄새가 난다.’ · ‘너 피곤해 보여.’ — 눈 · 코 · 혀 · 귀 · 피부로 느낀 {{상태}}를 말하는 문장이다.',
    '이렇게 다섯 감각을 나타내는 동사 look · smell · taste · sound · feel을 {{감각동사}}라고 한다.'], m),
  ...D.step(2, '이전 학년 복습 — be동사 + 형용사', [
    'The omelet is **popular**. (본문) — 주어(The omelet)의 상태를 형용사가 설명한다.',
    '주어를 설명하는 말 = {{보어}} → 보어 자리에는 형용사가 온다.'], m),
  ...D.step(3, '문제 제기 — 본문의 감각동사 뒤에는 무엇이 왔나?', [
    'Do you feel **hungry** now? / Just add cheese, vegetables, or meat. It will taste **better**! (본문)',
    '우리말로는 ‘배고프게 · 더 좋게’처럼 들리는데, 왜 hungrily · well(부사)을 쓰지 않았을까?'], m),
  ...D.step(4, '규칙 발견 — be동사 자리에 감각동사를 넣어 보기', [
    'The soup is delicious. → The soup {{smells}} delicious. — ‘수프 = 맛있는’ 관계는 그대로다.',
    '감각동사도 주어의 상태를 설명하므로 뒤에 {{형용사}} 보어가 온다. (deliciously ✗)'], m),
  ...D.step(5, '결론 🔑', [
    '감각동사(look · smell · taste · sound · feel) + {{형용사}} / 감각동사 + {{like}} + 명사 = ‘~처럼 …하다’ / -ly 부사 ✗ · good을 well로 ✗ · like + 형용사 ✗'], m),
  ...D.infoBox('오늘의 핵심 3문장', [
    '① Do you feel {{hungry}} now? (본문 · hungrily ✗)',
    '② These oranges taste {{sour}}. (교과서 Grammar · taste sourly ✗ [04] 기출)',
    '③ Hotteok looks {{like}} pancakes, but it is sweeter than pancakes. (교과서 Write & Present)'], m),
  ...D.tip(['칠판에 The soup is delicious.를 쓰고 is를 지운 자리에 smells · tastes · looks를 차례로 넣어 보이면 ‘be동사 자리에 들어가니까 뒤에는 형용사’를 한 번에 보여 줄 수 있다.',
    '같은 과 문법 비교급이 본문 It will taste better!(taste + good의 비교급)와 [05] This candy tastes sweeter than that one.에서 함께 나오므로 PERFECT CHECK · WRITE에 비교급을 섞은 문항을 넣었다. Point 3(like + 명사 · taste 쓰임 구별)은 심화로 다룬다.'], m),

  // ---------------- Point 1 ----------------
  D.section('Point 1', '감각동사 + 형용사 — 다섯 가지 감각', 'point'),
  ...D.table(['감각동사', '뜻 · 설명', '예'], [
    ['look (눈)', '~하게 보이다', 'Today’s lunch **looks healthy**. (교과서) / Everyone **looks happy**. (Wrap Up)'],
    ['smell (코)', '~한 냄새가 나다', 'The soup **smells delicious**. (교과서) / Something **smells good**. (Use It)'],
    ['taste (혀)', '~한 맛이 나다', 'These oranges **taste sour**. (교과서) / It will **taste better**! (본문)'],
    ['sound (귀)', '~하게 들리다', 'That **sounds cool**. (교과서) / The music **sounds good**. (Wrap Up)'],
    ['feel (피부 · 기분)', '~한 느낌이 들다 · ~하게 느끼다', 'Do you **feel hungry** now? (본문) / The blanket **feels warm**. (Grammar✚)'],
    ['수 · 시제', '3인칭 단수 현재 -s · 과거 looked · smelled · tasted · sounded · felt', 'The scarf **felt smooth** when I touched it. ([06]) / He **looked sad** after the test. ([06])']], [2300, 3300, 4038], m),
  ...D.infoBox('3단계로 만들기', [
    '① 어떤 감각인가: 냄새 → {{smell}}',
    '② 주어의 수 · 시제에 맞추기: The soup → {{smells}}',
    '③ 상태를 나타내는 형용사를 뒤에: The soup smells {{delicious}}.'], m),
  ...D.trick('다섯 손가락 = 다섯 감각', ['엄지 눈 look · 검지 코 smell · 중지 혀 taste', '약지 귀 sound · 새끼 손끝 feel', '손가락 끝에는 언제나 형용사가 붙는다']),
  ...D.examPoint([
    { q: 'A: The soup {{smells}} delicious. B: Would you like some?', why: '[04] 기출 — 대화 빈칸 감각동사 고르기 (eats · makes ✗)' },
    { q: '이 커피는 쓴맛이 난다. → This coffee {{tastes bitter}}.', why: '[04] 기출 — <보기> taste, this로 4단어 영작' }], m),
  ...D.caution(['[04] 대화 빈칸: The soup ____ delicious. — smells / eats / makes / cooks / has 중 감각동사 고르기. 뒤에 형용사가 있으면 감각동사 자리.',
    '[06] 대화 완성: 떡볶이 It tastes really spicy · The music sounds so loud — <보기>에서 동사와 형용사를 둘 다 골라 형태까지 바꾸게 한다.',
    'see · hear · listen · eat는 감각동사 자리에 못 온다: The cat sees hungry ✗ → looks / Your words hear strange ✗ → sound / The story listens funny ✗ → sounds',
    '보어 자리에 명사 ✗: This burrito tastes salt ✗ → salty / The boy looks sleep ✗ → sleepy — 명사와 형용사 구별도 함께 묻는다.'], m),
  ...D.drill(1, '감각동사 고르기 · 형용사 보어', [
    { level: 'Basic ①', type: 'choice', instr: '괄호 안에서 알맞은 것을 고르시오.', items: [
      { q: 'Today’s lunch (looks / sees) healthy.', a: 'looks', why: '교과서 Grammar — 눈으로 보고 판단 → look' },
      { q: 'The soup (smells / eats) delicious.', a: 'smells', why: '교과서 Grammar — 냄새 → smell' },
      { q: 'These oranges (sound / taste) sour.', a: 'taste', why: '교과서 Grammar — 맛 → taste' },
      { q: 'That (hears / sounds) cool.', a: 'sounds', why: '교과서 Grammar — hear는 감각동사 자리 ✗' },
      { q: 'Do you (feel / touch) hungry now?', a: 'feel', why: '본문 — 기분 · 몸 상태 → feel' },
      { q: 'Your idea (listens / sounds) great!', a: 'sounds', why: '워크북 — listen은 감각동사 자리 ✗' },
      { q: 'The milk (sounds / tastes) sour.', a: 'tastes', why: '워크북 — 맛 → taste' },
      { q: 'The socks (look / see) dirty.', a: 'look', why: '워크북 — see ✗' },
      { q: 'This sweater (feels / sounds) very soft.', a: 'feels', why: '워크북 — 촉감 → feel' },
      { q: 'I can smell bulgogi. Something (hears / smells) good.', a: 'smells', why: '교과서 Use It — 냄새 → smell' }] },
    { level: 'Basic ②', type: 'fill', instr: '<보기>에서 알맞은 말을 골라 빈칸에 쓰시오. (한 번씩만 사용)',
      bogi: ['felt', 'look', 'tastes', 'smells', 'feel', 'looked', 'sounds', 'taste', 'feels', 'looks'], items: [
      { q: 'Today is my birthday. Everyone [[looks]] happy.', why: 'Wrap Up 6 — Everyone은 단수 취급' },
      { q: 'The music [[sounds]] good.', why: 'Wrap Up 6' },
      { q: 'Come and enjoy my birthday cake. It [[tastes]] sweet and delicious!', why: 'Wrap Up 6' },
      { q: 'Do you [[feel]] hungry now? How about trying an omelet?', why: '본문' },
      { q: 'The lemons [[taste]] sour.', why: '[05] 기출 — 복수 주어' },
      { q: 'The bear doll [[feels]] warm.', why: '[05] 기출 — 촉감' },
      { q: 'The scarf [[felt]] smooth when I touched it.', why: '[06] 기출 — 과거 touched에 맞춰 felt' },
      { q: 'I saw Tom after the test. He [[looked]] sad.', why: '[06] 기출 변형 — 과거' },
      { q: 'Your perfume [[smells]] nice.', why: '워크북 Part 1' },
      { q: 'Fireworks [[look]] fantastic.', why: '워크북 Part 1 — 복수 주어' }] },
    { level: 'Intermediate', type: 'write', instr: '어법상 틀린 부분을 찾아 바르게 고쳐 쓰시오.', items: [
      { q: 'The story listens very funny.', a: 'listens → sounds', why: '객관식 — 귀로 듣고 판단 → sound' },
      { q: 'Your words hear strange.', a: 'hear → sound', why: '객관식 — hear ✗' },
      { q: 'The cat sees hungry.', a: 'sees → looks', why: '객관식 — see ✗' },
      { q: 'The cake smell nice.', a: 'smell → smells', why: '3인칭 단수 현재' },
      { q: 'They feels so happy.', a: 'feels → feel', why: '복수 주어' },
      { q: 'Yesterday, Jane look sad.', a: 'look → looked', why: '과거 Yesterday' },
      { q: 'The soup eats delicious.', a: 'eats → tastes', why: 'eat는 감각동사 ✗' },
      { q: 'Do you feel hunger now?', a: 'hunger → hungry', why: '본문 — 명사 ✗ · 형용사 보어' },
      { q: 'This burrito tastes salt.', a: 'salt → salty', why: '객관식 — 명사 ✗ · 형용사 보어' },
      { q: 'The music sound so loud.', a: 'sound → sounds', why: '[06] 기출 변형 — 3인칭 단수 현재' }] },
    { level: 'Advanced · 모두 고르기', type: 'multi', free: true, instr: '해당하는 것을 모두 골라 기호를 쓰시오.', items: [
      { q: '다음 중 어법상 옳은 문장을 모두 고르시오.', box: [
        '(a) The cat sees hungry.', '(b) The milk smells strange.', '(c) Today’s lunch looks healthy.',
        '(d) This burrito tastes salt.', '(e) That sounds cool.'], a: '(b), (c), (e)', why: '(a) sees → looks (d) salt → salty ([04] · 교과서)' },
      { q: '다음 빈칸에 들어갈 수 있는 말을 모두 고르시오. — I feel ______.', box: [
        '(a) good', '(b) peace', '(c) bored', '(d) tired', '(e) happiness'], a: '(a), (c), (d)', why: '(b) peace (e) happiness는 명사 — 보어는 형용사' },
      { q: '다음 글의 밑줄 친 ⓐ~ⓔ 중 어법상 어색한 것을 모두 골라 기호를 쓰고 바르게 고치시오.', fix: true, label: '기호 / 고친 것', box: [
        'Today is my birthday. Everyone ⓐ __looks happy__. The music ⓑ __listens good__. Mom’s bulgogi ⓒ __smell delicious__. My birthday cake ⓓ __tastes sweet__. I ⓔ __feel great__ today!'],
        a: 'ⓑ → sounds good, ⓒ → smells delicious', why: 'Wrap Up 6 변형 — listen ✗ · 3인칭 단수 -s' },
      { q: '다음 빈칸에 tastes가 들어갈 수 있는 것을 모두 고르시오.', box: [
        '(a) This candy ______ sweet.', '(b) The music ______ great.', '(c) Hotteok ______ delicious.',
        '(d) Your perfume ______ nice.', '(e) This soup ______ salty.'], a: '(a), (c), (e)', why: '(b) sounds (d) smells' }] },
    { level: 'Advanced · 객관식', type: 'mcq', free: true, instr: '알맞은 답을 고르시오.', items: [
      { q: '다음 대화의 빈칸에 들어갈 말로 알맞은 것은? — A: He looks sick. B: No, he feels ______. His best friend moved to another city.', opts: [
        'sleepy', 'tired', 'lonely', 'hungry', 'excited'], a: '③', why: '친한 친구가 이사 → 외로운 (객관식)' },
      { q: '다음 대화의 빈칸에 들어갈 말로 알맞은 것은? — A: This cake ______ good. B: Can I eat some?', opts: [
        'tastes', 'talks', 'makes', 'sounds', 'finds'], a: '①', why: '케이크의 맛 → taste' },
      { q: '빈칸 (A)~(C)에 들어갈 말이 바르게 짝지어진 것은? — Suho is playing the guitar. It (A)____ wonderful. / I’m having spaghetti. It (B)____ delicious. / They (C)____ so happy.', opts: [
        'sound – eats – are', 'sounds – eats – looks', 'listens – tastes – looks', 'listen – taste – are', 'sounds – tastes – look'], a: '⑤', why: '기타 소리 → sounds / 스파게티 맛 → tastes / 복수 They → look' },
      { q: '다음 대화의 빈칸에 들어갈 말로 알맞은 것은? — A: The soup ______ delicious. B: Would you like some? A: Yes, please.', opts: [
        'eats', 'smells', 'makes', 'cooks', 'has'], a: '②', why: '[04] 기출 — 형용사 delicious 앞 감각동사' },
      { q: '우리말과 같도록 빈칸에 들어갈 말이 바르게 짝지어진 것은? — 떡볶이는 정말 매운맛이 났다. It ____ really ____. / 음악이 너무 크게 들린다. The music ____ so ____.', opts: [
        'tasted – spicily / sounds – loud', 'tasted – spicy / hears – loud', 'looked – spicy / sounds – loudly', 'tasted – spicy / sounds – loud', 'tastes – spicy / listens – loud'], a: '④', why: '[06] 기출 변형 — taste + spicy / sound + loud' }] },
    { level: '전환 · 영작', type: 'write', instr: '우리말과 같은 뜻이 되도록 괄호 안의 말을 이용하여 영작하시오. (필요하면 형태를 바꿀 것)', items: [
      { q: '여러분은 지금 배가 고프다고 느끼나요? (feel, hungry, now)', a: 'Do you feel hungry now?', why: '본문' },
      { q: '오늘 점심은 건강에 좋아 보인다. (today’s lunch, healthy)', a: 'Today’s lunch looks healthy.', why: '교과서 Grammar' },
      { q: '그 수프는 맛있는 냄새가 난다. (soup, delicious)', a: 'The soup smells delicious.', why: '교과서 Grammar' },
      { q: '이 오렌지들은 신맛이 난다. (these oranges, sour)', a: 'These oranges taste sour.', why: '교과서 Grammar — 복수 주어' },
      { q: '그것은 멋지게 들린다. (that, cool)', a: 'That sounds cool.', why: '교과서 Grammar' },
      { q: '이 커피는 쓴맛이 난다. (this, bitter · 4단어)', a: 'This coffee tastes bitter.', why: '[04] 기출' },
      { q: '그 곰 인형은 따뜻한 느낌이 난다. (bear doll, warm)', a: 'The bear doll feels warm.', why: '[05] 기출' },
      { q: '그 소년과 소녀는 행복해 보였다. (the boy and the girl, happy)', a: 'The boy and the girl looked happy.', why: '[05] 변형 — 과거' },
      { q: '그녀의 손은 참 따뜻하게 느껴져요. (hands, so, warm)', a: 'Her hands feel so warm.', why: '워크북 Part 5 — 복수 주어' },
      { q: '그 왕은 당황한 듯 보였다. (king, puzzled)', a: 'The king looked puzzled.', why: '워크북 Part 5' }] },
  ], m),

  // ---------------- Point 2 ----------------
  D.section('Point 2', '형용사 vs 부사 — 감각동사 뒤에 -ly ✗', 'point'),
  ...D.table(['구분', '판단 기준 · 설명', '예'], [
    ['감각동사 + 형용사', '주어의 상태를 설명(보어) — 우리말 ‘~하게’로 해석돼도 형용사', 'This ice cream tastes **sweet**. ○ / tastes **sweetly** ✗ (워크북)'],
    ['일반동사 + 부사', '동작을 꾸밈(수식어) — smile · sing · cook · read 뒤에는 부사', 'She smiles **happily**. / He sings **beautifully**. / My sister cooks **carefully**.'],
    ['good vs well', 'good = 형용사(좋은) / well = 부사(잘)', 'The cookies smelled **good**. ○ (smelled well ✗) / Sam plays football **well**.'],
    ['-ly 형용사', 'friendly · lovely · lonely는 -ly로 끝나도 형용사 → 감각동사 뒤 ○', 'Your uncle looks **friendly**. / She looks **lovely**. / She often feels **lonely**.'],
    ['형용사 두 개', 'and로 이어도 둘 다 형용사', 'It looked **pretty and tasty**. ([05]) / The flowers smell fresh and **nicely** ✗ → **nice** ([06])'],
    ['비교급도 형용사', 'good의 비교급 better, sweet의 비교급 sweeter도 보어', 'It will taste **better**! (본문) / This candy tastes **sweeter** than that one. ([05])']], [2300, 3300, 4038], m),
  ...D.infoBox('형용사냐 부사냐 3단계', [
    '① 동사가 감각동사인가? They felt … → feel = {{감각동사}}',
    '② be동사로 바꿔 말이 되나? They were hungry. ○ → 보어 = {{형용사}}',
    '③ -ly를 떼어 형용사로: hungrily → {{hungry}}'], m),
  ...D.trick('감각동사는 등호(=)', ['The soup smells delicious = The soup is delicious', '등호 뒤에는 상태(형용사)가 서고', '동작을 꾸밀 때만 -ly(부사)를 붙인다: smile happily']),
  ...D.examPoint([
    { q: 'They felt {{hungry}} after playing soccer.', why: '[04] 기출 — hungrily ✗' },
    { q: 'They tasted {{sweet}} and fruity.', why: '[05] 기출 — 과자 집 글 · sweetly ✗' }], m),
  ...D.caution(['[04] 밑줄 어색한 것 고치기: They felt hungrily after playing soccer. → hungry / These oranges taste sourly. → sour',
    '[05] 본문 변형: Do you feel ⓓhungrily now? → hungry — 본문 문장을 틀리게 바꿔 낸다.',
    '[05] 과자 집 글 ⓒ They tasted sweetly and fruity → sweet / [06] ⓒ The flowers smell fresh and nicely → nice — and 뒤 두 번째 보어를 노린다.',
    '본문 You can make it easily.는 일반동사 make를 꾸미는 부사지만, make it easy(5형식)도 문법상 가능해 괄호 고르기로 내지 않았다. lonelily · friendlily처럼 실제로 거의 쓰지 않는 말은 보기로 넣지 않는다.'], m),
  ...D.drill(2, '형용사 vs 부사', [
    { level: 'Basic ①', type: 'choice', instr: '괄호 안에서 알맞은 것을 고르시오.', items: [
      { q: 'Do you feel (hungry / hungrily) now?', a: 'hungry', why: '본문 — 감각동사 + 형용사' },
      { q: 'These oranges taste (sour / sourly).', a: 'sour', why: '교과서 · [04] 기출' },
      { q: 'The piano sounds (beautifully / beautiful).', a: 'beautiful', why: '워크북 Part 2' },
      { q: 'Susan is smiling (happy / happily).', a: 'happily', why: '워크북 — 일반동사 smile + 부사' },
      { q: 'The cookies smelled (good / well).', a: 'good', why: '워크북 — smell + 형용사 good' },
      { q: 'Sam plays football (good / well).', a: 'well', why: '워크북 — 일반동사 play + 부사' },
      { q: 'He sings (beautiful / beautifully).', a: 'beautifully', why: '워크북 — 일반동사 sing + 부사' },
      { q: 'Your uncle looks (friendly / friend).', a: 'friendly', why: '객관식 — -ly 형용사 · 명사 ✗' },
      { q: 'This fabric feels so (good / well) on the skin.', a: 'good', why: '워크북 Part 2' },
      { q: 'It’s raining (heavy / heavily).', a: 'heavily', why: '워크북 — 일반동사 rain + 부사' }] },
    { level: 'Basic ②', type: 'fill', instr: '<보기>에서 알맞은 말을 골라 빈칸에 쓰시오. (한 번씩만 사용)',
      bogi: ['angry', 'quickly', 'good', 'lonely', 'carefully', 'delicious', 'well', 'soft', 'expensive', 'peacefully'], items: [
      { q: 'The soup tastes [[delicious]].', why: '감각동사 + 형용사' },
      { q: 'The test was easy, so I finished it [[quickly]].', why: '일반동사 finish + 부사' },
      { q: 'This sweater feels very [[soft]].', why: '워크북 — 촉감' },
      { q: 'The baby is sleeping [[peacefully]].', why: '일반동사 sleep + 부사' },
      { q: 'Those earrings look [[expensive]].', why: '워크북' },
      { q: 'I listened [[carefully]] to the music.', why: '워크북 — 일반동사 listen + 부사' },
      { q: 'She lives alone and often feels [[lonely]].', why: '객관식 — -ly 형용사' },
      { q: 'Tom sounded [[angry]] when he spoke to me.', why: '워크북 Part 3' },
      { q: 'Mrs. Barnes works [[well]] with many people.', why: '워크북 — 일반동사 work + 부사' },
      { q: 'The apple pie smells [[good]].', why: '워크북 — smell + good' }] },
    { level: 'Intermediate', type: 'write', instr: '어법상 틀린 부분을 찾아 바르게 고쳐 쓰시오.', items: [
      { q: 'Do you feel hungrily now?', a: 'hungrily → hungry', why: '[05] 본문 변형' },
      { q: 'These oranges taste sourly.', a: 'sourly → sour', why: '[04] 기출' },
      { q: 'They felt hungrily after playing soccer.', a: 'hungrily → hungry', why: '[04] 기출' },
      { q: 'The coffee smells well.', a: 'well → good', why: '객관식 — smell + 형용사' },
      { q: 'Cindy looks happily.', a: 'happily → happy', why: '객관식' },
      { q: 'The music sounds beautifully.', a: 'beautifully → beautiful', why: '객관식' },
      { q: 'She smiles happy.', a: 'happy → happily', why: '객관식 — 일반동사 smile + 부사' },
      { q: 'My sister cooks careful.', a: 'careful → carefully', why: '객관식 — 일반동사 cook + 부사' },
      { q: 'The flowers smell fresh and nicely.', a: 'nicely → nice', why: '[06] 기출 — and로 이은 보어도 형용사' },
      { q: 'This math problem looks easily.', a: 'easily → easy', why: '객관식' }] },
    { level: 'Advanced · 모두 고르기', type: 'multi', free: true, instr: '해당하는 것을 모두 골라 기호를 쓰시오.', items: [
      { q: '다음 중 어법상 옳은 문장을 모두 고르시오.', box: [
        '(a) The pizza tastes deliciously.', '(b) Jay looked lovely at that time.', '(c) The baby slept calmly.',
        '(d) The roses smell sweetly.', '(e) Your uncle looks friendly.'], a: '(b), (c), (e)', why: '(a) delicious (d) sweet — (c)는 일반동사 sleep + 부사 ○' },
      { q: '다음 빈칸에 들어갈 수 있는 말을 모두 고르시오. — The ice cream smells ______.', box: [
        '(a) sweet', '(b) greatly', '(c) fast', '(d) nice', '(e) strange'], a: '(a), (d), (e)', why: '(b)(c) 부사 ✗ (객관식 개수 문항 변형)' },
      { q: '다음 글의 밑줄 친 ⓐ~ⓔ 중 어법상 어색한 것을 모두 골라 기호를 쓰고 바르게 고치시오.', fix: true, label: '기호 / 고친 것', box: [
        'Something ⓐ __smelled delicious__ around the girl and the boy. They found the cookie house. It ⓑ __looked pretty and tasty__. They ate the cookies and candies on the roof. They ⓒ __tasted sweetly and fruity__. The girl and the boy ⓓ __felt happily__ after eating them. They ⓔ __smiled brightly__.'],
        a: 'ⓒ → tasted sweet and fruity, ⓓ → felt happy', why: '[05] 기출 변형 — ⓔ는 일반동사 smile + 부사 ○' },
      { q: '다음 빈칸에 들어갈 수 있는 말을 모두 고르시오. — Ms. Lee looked ______.', box: [
        '(a) nice', '(b) pretty', '(c) lovely', '(d) sadly', '(e) calm', '(f) happily'], a: '(a), (b), (c), (e)', why: '(c) lovely는 -ly 형용사 ○ / (d)(f) 부사 ✗ (객관식)' }] },
    { level: 'Advanced · 객관식', type: 'mcq', free: true, instr: '알맞은 답을 고르시오.', items: [
      { q: '다음 빈칸에 들어갈 말로 알맞지 않은 것은? — My mother looks ______ now.', opts: [
        'sad', 'happily', 'tired', 'excited', 'great'], a: '②', why: 'happily는 부사 → happy (객관식)' },
      { q: '다음 빈칸에 들어갈 말이 순서대로 바르게 짝지어진 것은? — The boy is singing ____. / Her voice sounds ____. / She looks ____ these days.', opts: [
        'happy – sad – angry', 'happily – sad – angrily', 'beautifully – sadly – nice', 'beautiful – strangely – nicely', 'happily – strange – angry'], a: '⑤', why: 'sing + 부사 / sound · look + 형용사 (객관식)' },
      { q: '다음 중 어법상 올바른 문장은?', opts: [
        'She looks lovely.', 'The pizza tastes deliciously.', 'The music sounds nicely.', 'The roses smell sweetly.', 'I felt nervously.'], a: '①', why: '② delicious ③ nice ④ sweet ⑤ nervous (객관식)' },
      { q: '다음 중 어법상 어색한 문장은?', opts: [
        'That sounds terrible!', 'Wow, you look really different today!', 'The bread smells really great.', 'This hamburger tastes badly.', 'The scarf feels soft.'], a: '④', why: '④ badly → bad' },
      { q: '다음 중 어법상 올바른 문장은 모두 몇 개인가?', box: [
        '• This math problem looks easy.', '• She smiles happy.', '• I felt sad.', '• The dog smelled terribly.', '• They read the questions carefully.'],
        opts: ['1개', '2개', '3개', '4개', '5개'], a: '③', why: '첫째 · 셋째 · 다섯째 ○ / smiles happily · smelled terrible (객관식)' }] },
    { level: '전환 · 영작', type: 'write', instr: '괄호 안의 말을 알맞은 형태(형용사 또는 부사)로 바꾸어 빈칸에 쓰시오.', items: [
      { q: 'The dog is angry. It barks ______. (angry)', a: 'angrily', why: '워크북 Part 3 — 일반동사 bark + 부사' },
      { q: 'The woman is talking ______ and she looks ______. (loud, angry)', a: 'loudly, angry', why: '워크북 Part 3 — talk + 부사 / look + 형용사' },
      { q: 'The little boy looked ______. He looked at me ______. (sad)', a: 'sad, sadly', why: '워크북 Part 3 — look + 형용사 / look at + 부사' },
      { q: 'I tasted the soup ______ but it tasted ______. (careful, wonderful)', a: 'carefully, wonderful', why: '워크북 Part 3 — 맛보다(일반동사) / 맛이 나다(감각동사)' },
      { q: 'Street food looks ______ and tastes ______. (good, delicious)', a: 'good, delicious', why: '워크북 Part 3' },
      { q: 'She likes the dress. It looks ______. (modern)', a: 'modern', why: '워크북 Part 3' },
      { q: 'I don’t like her pictures. She paints ______. (terrible)', a: 'terribly', why: '워크북 Part 3 — 일반동사 paint + 부사' },
      { q: 'The peach ice cream tasted ______ on that hot summer night. (good)', a: 'good', why: '워크북 Part 3' },
      { q: 'Do you feel ______ now? How about trying an omelet? (hungry)', a: 'hungry', why: '본문' },
      { q: 'They found the cookie house. It looked pretty and ______. (taste)', a: 'tasty', why: '[05] 기출 — 명사 taste → 형용사 tasty' }] },
  ], m),

  // ---------------- Point 3 ----------------
  D.section('Point 3', '(심화) 감각동사 + like + 명사 · taste / look의 다른 쓰임', 'point'),
  ...D.table(['구성', '판단 기준 · 설명', '예'], [
    ['감각동사 + 형용사', '뒤에 형용사 하나 → like 없이', 'Your question sounds **difficult**. / You look **cold**. (워크북)'],
    ['감각동사 + like + 명사', '‘~처럼 …하다 · ~ 같은 …이 나다’ — 뒤에 명사(구)', 'Hotteok **looks like pancakes**. (교과서) / That **sounds like a good idea**. ([06]) / It **smells like rain** outside. ([04])'],
    ['like 빠뜨리기 ✗', '명사 앞에 like가 없으면 틀림', 'This soap smells an orange ✗ → smells **like** an orange / That cake tastes potatoes ✗ → tastes **like** potatoes'],
    ['like + 형용사 ✗', '형용사 앞에는 like ✗', 'The room smells like strange ✗ → smells **strange** ([06]) / He looks like angry ✗ → looks **angry**'],
    ['taste 쓰임 구별', '~한 맛이 나다(+ 형용사) vs 맛보다(+ 목적어) vs 맛(명사)', 'This bread **tastes salty**. / She **tasted the cookies**. / the **taste** of coffee ([05])'],
    ['look 쓰임 구별', 'look + 형용사(~하게 보이다) vs look at + 명사(~을 보다) + 부사', 'The book **looks interesting**. / They all **look at** the stars **curiously**. (객관식)']], [2300, 3300, 4038], m),
  ...D.infoBox('like를 쓸까 말까 3단계', [
    '① 감각동사 뒤의 말 찾기: That sounds … {{a good idea}}',
    '② 명사(a · an · the가 붙는 말)인가 형용사인가? → {{명사}}',
    '③ 명사면 like를 넣고, 형용사면 like 없이: That sounds {{like}} a good idea.'], m),
  ...D.trick('like는 명사 섬으로 가는 다리', ['형용사 섬은 바로 붙어 있어 다리가 필요 없다: smells strange', '명사 섬으로 건너갈 때만 다리(like)를 놓는다', 'looks like pancakes · sounds like a good idea']),
  ...D.examPoint([
    { q: 'Hotteok looks {{like}} pancakes, but it is sweeter than pancakes.', why: '교과서 Write & Present — like + 명사 (비교급과 함께)' },
    { q: 'The room smells {{strange}}. (smells like strange ✗)', why: '[06] 기출 — 형용사 앞 like ✗' }], m),
  ...D.caution(['[06] ‘어법상 알맞은 문장의 개수’: The scarf felt smooth … · That sounds like a good idea. · He looked sad after the test. ○ / The room smells like strange. ✗ — like + 명사 · 형용사 구별을 개수로 묻는다.',
    '[05] 본문 ⓑtaste와 뜻이 같은 것: This bread tastes salty and buttery. · This candy tastes sweeter than that one. (~한 맛이 나다) vs We will taste spicy food. · She tasted the cookies. (맛보다) · the taste of coffee (명사)',
    '교과서 Viewing · Write & Present: Black pudding looks like sundae. / Takoyaki looks like small dumplings. — 음식 소개 글에 like + 명사와 비교급이 함께 나온다.',
    '[06] 같은 문항의 ⓑ The water tastes salt like the seawater.는 고친 문장(salty like the seawater)도 어색해 이 자료에서는 쓰지 않았다.'], m),
  ...D.drill(3, 'like + 명사 · taste / look의 쓰임', [
    { level: 'Basic ①', type: 'choice', instr: '괄호 안에서 알맞은 것을 고르시오.', items: [
      { q: 'Judy (looks like / looks) her sister Ann.', a: 'looks like', why: '워크북 Part 4 — 뒤에 명사' },
      { q: 'Your question (sounds / sounds like) difficult.', a: 'sounds', why: '워크북 Part 4 — 뒤에 형용사' },
      { q: 'These towels (feel like / feel) wet.', a: 'feel', why: '워크북 Part 4 — 형용사' },
      { q: 'It (looks / looks like) an elephant’s leg.', a: 'looks like', why: '워크북 Part 4 — 명사구' },
      { q: 'You (look / look like) cold.', a: 'look', why: '워크북 Part 4 — 형용사' },
      { q: 'Your dad (sounds / sounds like) a wise man.', a: 'sounds like', why: '워크북 Part 4 — 명사구' },
      { q: 'That (sounds / sounds like) a good idea.', a: 'sounds like', why: '[06] 기출' },
      { q: 'The room smells (strange / like strange).', a: 'strange', why: '[06] 기출 — like + 형용사 ✗' },
      { q: 'Hotteok (looks / looks like) pancakes.', a: 'looks like', why: '교과서 Write & Present' },
      { q: 'The opera (sounds like / sounds) boring.', a: 'sounds', why: '워크북 Part 4 — 형용사' }] },
    { level: 'Basic ②', type: 'fill', instr: '<보기>에서 알맞은 말을 골라 빈칸에 쓰시오. (한 번씩만 사용)',
      bogi: ['carefully', 'sounds', 'at', 'salty', 'looks', 'taste', 'like', 'strange', 'smells', 'tasted'], items: [
      { q: 'Takoyaki looks [[like]] small dumplings.', why: '교과서 Write & Present 예시' },
      { q: 'This bread tastes [[salty]] and buttery.', why: '[05] 기출 — ~한 맛이 나다' },
      { q: 'She [[tasted]] the cookies before selling them.', why: '[05] 기출 — 맛보다(+ 목적어)' },
      { q: 'Black pudding [[looks]] like sundae, but black pudding is bigger than sundae.', why: '교과서 Viewing — 크기는 눈으로' },
      { q: 'The room smells [[strange]].', why: '[06] 기출' },
      { q: 'This soap [[smells]] like an orange. I love the smell.', why: '객관식 — 냄새' },
      { q: 'That [[sounds]] like a good idea.', why: '[06] 기출' },
      { q: 'We will [[taste]] spicy food in Mexico.', why: '[05] 기출 — 맛보다(+ 목적어)' },
      { q: 'They all looked [[at]] the stars curiously.', why: '객관식 — look at + 명사 + 부사' },
      { q: 'Judy tasted the hot chili [[carefully]].', why: '워크북 — 맛보다(일반동사) + 부사' }] },
    { level: 'Intermediate', type: 'write', instr: '어법상 틀린 부분을 찾아 바르게 고쳐 쓰시오.', items: [
      { q: 'This soap smells an orange.', a: 'smells → smells like', why: '객관식 — 명사 앞 like' },
      { q: 'That cake tastes potatoes.', a: 'tastes → tastes like', why: '객관식 — 명사 앞 like' },
      { q: 'The room smells like strange.', a: 'smells like → smells', why: '[06] 기출 — 형용사 앞 like ✗' },
      { q: 'He looks like angry.', a: 'looks like → looks', why: '객관식 — 형용사 앞 like ✗' },
      { q: 'Susie felt like thirsty.', a: 'felt like → felt', why: '객관식 — 형용사 앞 like ✗' },
      { q: 'It sounds like great.', a: 'sounds like → sounds', why: '형용사 앞 like ✗' },
      { q: 'Hotteok looks pancakes.', a: 'looks → looks like', why: '교과서 Write & Present — 명사 앞 like' },
      { q: 'My dad sounds a wise man.', a: 'sounds → sounds like', why: '워크북 Part 4 — 명사 앞 like' },
      { q: 'The fruit tastes like sweetly.', a: 'like sweetly → sweet', why: '객관식 — like 삭제 · 형용사' },
      { q: 'They all look at the stars curious.', a: 'curious → curiously', why: '객관식 — look at(일반동사) + 부사' }] },
    { level: 'Advanced · 모두 고르기', type: 'multi', free: true, instr: '해당하는 것을 모두 골라 기호를 쓰시오.', items: [
      { q: '다음 중 어법상 옳은 문장을 모두 고르시오.', box: [
        '(a) That sounds like a good idea.', '(b) The room smells like strange.', '(c) It smells like rain outside.',
        '(d) The scarf felt smooth when I touched it.', '(e) He looks like angry.'], a: '(a), (c), (d)', why: '(b) smells strange (e) looks angry ([04] · [06] 기출)' },
      { q: '밑줄 친 taste가 ‘~한 맛이 나다’라는 뜻으로 쓰인 것을 모두 고르시오.', box: [
        '(a) This bread __tastes__ salty and buttery.', '(b) We will __taste__ spicy food in Mexico.', '(c) He does not like the __taste__ of coffee.',
        '(d) This candy __tastes__ sweeter than that one.', '(e) She __tasted__ the cookies before selling them.'], a: '(a), (d)', why: '[05] 기출 — (b)(e) 맛보다 (c) 명사 맛' },
      { q: '다음 글의 밑줄 친 ⓐ~ⓔ 중 어법상 어색한 것을 모두 골라 기호를 쓰고 바르게 고치시오.', fix: true, label: '기호 / 고친 것', box: [
        'Do you know hotteok? Hotteok is popular in Korea. People in Korea usually eat it in winter. Hotteok ⓐ __looks pancakes__, but it is sweeter than pancakes. It ⓑ __smells sweet__, and it ⓒ __tastes deliciously__. My friends ⓓ __look happy__ when they eat it. Making hotteok together ⓔ __sounds like fun__!'],
        a: 'ⓐ → looks like pancakes, ⓒ → tastes delicious', why: '교과서 Write & Present 변형 — 명사 앞 like · 형용사 보어' },
      { q: '빈칸에 like가 들어가야 하는 것을 모두 고르시오.', box: [
        '(a) The opera sounds ______ boring.', '(b) Your dad sounds ______ a wise man.', '(c) These towels feel ______ wet.',
        '(d) This fruit looks ______ a Kiwi bird.', '(e) The fabric feels ______ silk.'], a: '(b), (d), (e)', why: '뒤에 명사(구) → like / (a)(c) 형용사 (워크북 · 본문 해설)' }] },
    { level: 'Advanced · 객관식', type: 'mcq', free: true, instr: '알맞은 답을 고르시오.', items: [
      { q: '다음 빈칸에 들어갈 말로 알맞은 것은? — She looks ______.', opts: [
        'sadly', 'me', 'interest', 'sleepy', 'happily'], a: '④', why: 'look + 형용사 (객관식)' },
      { q: '다음 빈칸에 들어갈 말이 순서대로 바르게 짝지어진 것은? — This picture looks ______. / Snow White looks like ______ to me.', opts: [
        'peaceful – cute', 'peaceful – a cute girl', 'peacefully – cute', 'peacefully – a cute girl', 'like peace – cute'], a: '②', why: 'look + 형용사 / look like + 명사 (객관식)' },
      { q: '다음 우리말을 어법에 맞게 영작한 것은?', opts: [
        '그는 화가 난 것처럼 보인다. → He looks like angrily.', 'Susie는 목이 말랐다. → Susie felt like thirsty.', '그건 정말 이상하게 들려. → It sounds really strangely.',
        '이 음식은 정말 맛있어. → This food tastes deliciously.', '그것은 좋은 생각처럼 들린다. → It sounds like a good idea.'], a: '⑤', why: '① looks angry ② felt thirsty ③ strange ④ delicious (객관식)' },
      { q: '다음 문장의 밑줄 친 look과 쓰임이 같은 것은? — The babies __look__ lovely.', opts: [
        'Please look closely at the picture.', 'I’m looking for my bag.', 'The book looks interesting. Can I borrow it?', 'Why don’t you take a look around?', 'Look carefully and you can see my house.'], a: '③', why: '‘~하게 보이다’(감각동사 + 형용사) — ①⑤ 보다 ② 찾다 ④ 명사 (객관식)' },
      { q: '다음 중 어법상 어색한 문장은?', opts: [
        'That cake tastes potatoes.', 'Anna feels excited.', 'That sounds like a great idea.', 'Hotteok looks like pancakes.', 'The scarf feels soft.'], a: '①', why: '① tastes like potatoes (객관식)' }] },
    { level: '전환 · 영작', type: 'write', instr: '우리말과 같은 뜻이 되도록 괄호 안의 말을 이용하여 영작하시오. (필요하면 형태를 바꿀 것)', items: [
      { q: '그것은 좋은 생각처럼 들린다. (that, sound, a good idea)', a: 'That sounds like a good idea.', why: '[06] 기출' },
      { q: '밖에서 비 냄새가 난다. (it, smell, rain, outside)', a: 'It smells like rain outside.', why: '[04] 기출' },
      { q: '그 천은 실크처럼 느껴진다. (the fabric, silk)', a: 'The fabric feels like silk.', why: '본문 해설' },
      { q: '타코야키는 작은 만두처럼 보인다. (takoyaki, small dumplings)', a: 'Takoyaki looks like small dumplings.', why: '교과서 Write & Present 예시' },
      { q: '그것은 작은 공처럼 생겼다. (small, like)', a: 'It looks like a small ball.', why: '워크북 Part 5' },
      { q: '그 즙은 혈액처럼 보입니다. (juice, look, blood)', a: 'The juice looks like blood.', why: '워크북 Part 5' },
      { q: '이 과일은 키위 새처럼 생겼어. (this fruit, a Kiwi bird)', a: 'This fruit looks like a Kiwi bird.', why: '워크북 Part 5' },
      { q: '그것은 매우 흥미진진하게 들리는군요. (it, exciting)', a: 'It sounds very exciting.', why: '워크북 Part 5 — 형용사 → like ✗' },
      { q: '그것은 우리 학교 같지 않았어. (like, my school)', a: 'It didn’t look like my school.', why: '워크북 Part 5 — 부정문' },
      { q: '그녀는 쿠키를 팔기 전에 그것들을 맛보았다. (taste, before selling them)', a: 'She tasted the cookies before selling them.', why: '[05] 기출 — 맛보다(일반동사)' }] },
  ], m),

  // ---------------- PERFECT CHECK ----------------
  D.section('PERFECT CHECK', '상위권 함정 체크'),
  ...D.drill(null, '', [{ level: '함정', type: 'choice', instr: '실수하기 쉬운 문장들이에요. 괄호 안에서 알맞은 것을 고르시오.', items: [
    { q: 'Just add cheese, vegetables, or meat. It will taste (more well / better)!', a: 'better', why: '본문 — taste + good의 비교급 better(같은 과 문법 비교급)' },
    { q: 'Do you feel (hungry / hungrily) now?', a: 'hungry', why: '본문 · [05] 기출' },
    { q: 'This candy tastes (sweeter / more sweetly) than that one.', a: 'sweeter', why: '[05] — 형용사 비교급 보어(같은 과 문법 비교급)' },
    { q: 'The room smells (like strange / strange).', a: 'strange', why: '[06] 기출 — like + 형용사 ✗' },
    { q: 'That sounds (like a good idea / a good idea).', a: 'like a good idea', why: '[06] 기출 — like + 명사' },
    { q: 'She lives alone and often feels (lonely / loneliness).', a: 'lonely', why: '-ly 형용사 · 명사 ✗' },
    { q: 'The flowers smell fresh and (nicely / nice).', a: 'nice', why: '[06] 기출 — and 뒤 보어도 형용사' },
    { q: 'She tasted the cookies (careful / carefully) before selling them.', a: 'carefully', why: '[05] — 맛보다(일반동사) + 부사' },
    { q: 'A: Chicken fried rice is inside a thin omelet. B: Wow! It sounds (tasty / tastily).', a: 'tasty', why: '[06] 기출 대화 — Sounds tasty.' },
    { q: 'Hotteok looks (pancakes / like pancakes), but it is sweeter than pancakes.', a: 'like pancakes', why: '교과서 Write & Present' }] }], m),

  // ---------------- WRITE ----------------
  D.section('WRITE', '서술형 대비'),
  ...D.writeItem(1, 'Basic', '괄호 안의 단어를 바르게 배열하시오.', ['Do you ( hungry / feel / now )? How about trying an omelet? (본문)'], { a: 'feel hungry now', why: '감각동사 + 형용사 보어' }, m),
  ...D.writeItem(2, 'Basic', '<보기>의 단어를 빈칸에 알맞은 형태로 한 번씩 써서 글을 완성하시오.', ['<보기> sound   taste   look',
    'Today is my birthday. Everyone (1)______ happy. The music (2)______ good. Come and enjoy my birthday cake. It (3)______ sweet and delicious! (Wrap Up 6)'],
    { a: '(1) looks  (2) sounds  (3) tastes', why: '3인칭 단수 현재 -s · 감각동사 + 형용사', blanks: ['(1)', '(2)', '(3)'] }, m),
  ...D.writeItem(3, 'Intermediate', '밑줄 친 부분에서 어법상 틀린 것을 찾아 바르게 고쳐 쓰시오.', ['In Malaysia, people wrap chicken fried rice with a thin omelet. It is also popular in Indonesia and Singapore. __Do you feel hungrily now?__ How about trying an omelet? ([05] 본문 변형)'],
    { a: 'hungrily → hungry', why: '감각동사 feel + 형용사 보어' }, m),
  ...D.writeItem(4, 'Intermediate', '우리말과 같은 뜻이 되도록 <보기>의 단어를 모두 사용하여 4단어로 영작하시오. (필요하면 형태를 바꿀 것)', ['이 커피는 쓴맛이 난다.', '<보기> taste, this'],
    { a: 'This coffee tastes bitter.', why: '[04] 기출 — taste → tastes(3인칭 단수)' }, m),
  ...D.writeItem(5, 'Intermediate', '<보기>에서 알맞은 단어를 골라 우리말과 같은 뜻이 되도록 문장을 완성하시오. (필요하면 형태를 바꾸고 중복 사용하지 말 것)', ['<보기> taste, feel, sour, warm, sourly, warmly',
    '(1) 레몬들은 신맛이 난다. → The lemons ______________.   (2) 곰 인형은 따뜻한 느낌이 난다. → The bear doll ______________.'],
    { a: '(1) taste sour  (2) feels warm', why: '[05] 기출 — 부사 sourly · warmly ✗', blanks: ['(1)', '(2)'] }, m),
  ...D.writeItem(6, 'Intermediate', '<보기>에서 알맞은 단어를 골라 대화를 완성하시오. (필요하면 형태를 바꿀 것)', ['<보기> taste, look, smell, sound, feel, loud, soft, spicy, sweet',
    '(1) G: Tim, your face is so red. What’s wrong? B: I just ate some tteokbokki. It ______ really ______.',
    '(2) G: The music ______ so ______. B: Oh, really? G: Can you turn it down, please?'],
    { a: '(1) tastes[tasted], spicy  (2) sounds, loud', why: '[06] 기출', blanks: ['(1)', '(2)'] }, m),
  ...D.writeItem(7, 'Advanced', '우리말과 같은 뜻이 되도록 <조건>에 맞게 영작하시오.', ['호떡은 팬케이크처럼 보이지만, 그것은 팬케이크보다 더 달콤하다.', '<조건> look, sweet를 사용할 것(필요시 형태 변화) · but을 사용할 것'],
    { a: 'Hotteok looks like pancakes, but it is sweeter than pancakes.', why: '교과서 Write & Present — look like + 명사 · 비교급(같은 과 문법)' }, m),
  ...D.writeItem(8, 'Advanced', '어법상 어색한 문장 두 개를 찾아 기호를 쓰고 바르게 고쳐 쓰시오.', ['(A) That sounds cool.  (B) It smells like rain outside.  (C) They felt hungrily after playing soccer.  (D) The room smells like strange.  (E) He looked sad after the test.'],
    { a: '(C) hungrily → hungry  /  (D) smells like strange → smells strange', why: '[04] · [06] 기출 — 감각동사 + 형용사 · like + 형용사 ✗', blanks: ['기호 · 고친 것 ①', '기호 · 고친 것 ②'] }, m),
  ...D.writeItem(9, 'Advanced', '어법상 틀린 부분 2개를 찾아 바르게 고치고, 그 이유를 쓰시오.', ['They ate the cookies and candies on the roof. They tasted sweetly and fruity. The flowers on the roof smelled fresh and nicely.'],
    { a: '① sweetly → sweet  ② nicely → nice', why: '감각동사(taste · smell) 뒤 보어는 형용사이고, and로 이어진 두 번째 보어도 형용사여야 한다 ([05] · [06] 기출)', blanks: ['고친 것', '이유'] }, m),
  ...D.writeItem(10, 'Advanced', '우리말과 같은 뜻이 되도록 <조건>에 맞게 영작하시오.', ['그 과자 집은 예쁘고 맛있어 보였다.', '<조건> look, pretty, tasty를 사용할 것 · 과거 시제 · the cookie house로 시작하는 7단어'],
    { a: 'The cookie house looked pretty and tasty.', why: '[05] 기출 — look + 형용사 두 개(and)' }, m),

  // ---------------- MAP ----------------
  D.pageBreak(), // MAP 이미지가 쪽 끝에서 잘리지 않도록 새 쪽에서 시작
  D.section('MAP', "DAVID'S MAP — 백지노트 테스트"),
  D.P([D.T('오늘 배운 내용을 떠올리며 빈칸을 채워 보세요. 책을 보지 않고!', { size: 18, color: '595959' })], { spacing: { after: 120 }, keepNext: true }),
  ...D.image(path.join(__dirname, 'map_G-감각동사_중1.png'), 620),
  ...D.table(['자가 체크 — 백지노트에 이 단어들이 들어갔나요?', '✔'], [
    ['감각동사 5개: look · smell · taste · sound · feel', ''], ['감각동사 + 형용사(보어): Do you feel hungry now? (hungrily ✗)', ''],
    ['be동사로 바꿔 보기: The soup smells delicious = The soup is delicious', ''], ['good(형용사) vs well(부사): smells good (smells well ✗)', ''],
    ['-ly 형용사: friendly · lovely · lonely → looks lovely ○', ''], ['일반동사 + 부사: smile happily · sing beautifully · cook carefully', ''],
    ['and로 이은 보어도 형용사: looked pretty and tasty (tasted sweetly ✗)', ''], ['감각동사 + like + 명사: looks like pancakes · sounds like a good idea', ''],
    ['like + 형용사 ✗: smells like strange ✗ → smells strange', ''],
    ['본문: It will taste better! — taste + good의 비교급', '']], [8838, 800], m),
  ...D.memo(['다음 시간 도입: 칠판에 The soup is delicious.를 쓰고 is 자리에 smells · tastes · looks를 넣어 보게 한 뒤, deliciously를 넣으면 왜 안 되는지 학생이 직접 설명하게 하기',
    '약한 반: Point 1(다섯 감각동사 + 형용사) 확실히 → Point 2는 hungry / hungrily · good / well 두 쌍만 → Point 3은 looks like pancakes 하나만',
    '같은 과 비교급과 섞인 문항(It will taste better! · tastes sweeter than) 다시 풀기 — 감각동사 뒤 비교급도 형용사라는 점을 확인한다.',
    '교과서 Write & Present: 좋아하는 음식을 looks like + 명사 · tastes + 형용사 · 비교급으로 한 문장씩 소개하고 짝과 서로 어법 점검'], m),
];
D.render(meta, build, process.argv[2] || '.').then(fs_ => {
  console.log(fs_.join('\n'));
});
