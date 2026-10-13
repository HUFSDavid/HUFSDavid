const D0 = require('./david_base');
const path = require('path');
const fs = require('fs');
// 중1 천재(이상기) 7과 Tasty World 목표 문법 — 비교급 (-er than / more ~ than) · 공통 문법
// 한 문장에 빈칸 ______ 이 두 개 이상이면 david_base의 __밑줄__ 서식으로 잘못 읽히므로
// 밑줄 3개 이상 이어진 빈칸은 밑줄 사이에 U+200B를 넣어 둔다 (beworth · the비교급 · with분사 스크립트와 같은 처리).
const ZB = (s) => s.replace(/_{3,}/g, (u) => u.split('').join('​'));
const deep = (v) => typeof v === 'string' ? ZB(v) : Array.isArray(v) ? v.map(deep)
  : (v && typeof v === 'object' && v.constructor === Object) ? Object.fromEntries(Object.entries(v).map(([k, x]) => [k, deep(x)])) : v;
const D = new Proxy(D0, { get: (t, k) => (typeof t[k] === 'function' && !['render', 'P', 'T', 'image'].includes(k)) ? (...a) => t[k](...deep(a)) : t[k] });
const COVER = JSON.parse(process.env.COVER || '{}');
const TITLE = '비교급';
const meta = { series: D.SERIES.G, code: 'G-비교급', title: TITLE, category: 'G. 비교  |  비교급 (-er than · more ~ than · 불규칙 · 비교급 강조)',
  rightText: 'G  비교급 (-er than · more ~ than)', prefix: process.env.PREFIX || '', cover: COVER.title ? COVER : undefined,
  question: 'I’m ~~bigger~~ than an olive. / Do you want a ~~more delicious~~ omelet? — 왜 big은 g를 하나 더 쓰고, delicious는 앞에 more를 붙일까?' };

const build = (m) => [
  D.section('FLOW', 'Teaching Flow — 처음 배우는 사람도 따라오는 5단계'),
  ...D.step(1, '우리말로 먼저 생각하기 — ‘~보다 더 …한’', [
    '‘달걀은 올리브보다 더 크다.’ — 두 가지(달걀 · 올리브)를 {{비교}}하는 문장이다.',
    '우리말은 ‘더’ 한 글자를 붙이면 되지만, 영어는 형용사 · 부사의 {{모양}}을 바꾼다.'], m),
  ...D.step(2, '이전 학년 복습 — 형용사와 부사', [
    '형용사 = 명사의 상태 ‘~한’: The omelet is a **popular** egg dish. (본문)',
    '부사 = 동사를 꾸밈 ‘~하게’: You can make it **easily**. (본문) — 비교급은 형용사 · {{부사}} 모두 만들 수 있다.'], m),
  ...D.step(3, '문제 제기 — 본문의 비교 문장들', [
    'I’m **bigger** than an olive, but I’m **smaller** than an avocado. (본문)',
    'Do you want a **more delicious** omelet? … It will taste **better**! — 왜 모양이 제각각일까? good은 왜 gooder가 아닐까?'], m),
  ...D.step(4, '규칙 발견 — 단어 모양에 따라 바꾸는 법이 다르다', [
    '짧은 단어는 뒤에 {{-er}}: small → smaller / 단모음 + 단자음은 자음을 한 번 더: big → {{bigger}}',
    '긴 단어(3음절 이상 · -ous 등)는 앞에 {{more}}: delicious → more delicious / good은 불규칙: good → {{better}}'], m),
  ...D.step(5, '결론 🔑', [
    'A + 동사 + 비교급 + {{than}} + B = A는 B보다 더 …하다 / 비교급을 ‘훨씬’ 강조할 때는 much · even · far · a lot (very ✗)'], m),
  ...D.infoBox('오늘의 핵심 3문장', [
    '① I’m {{bigger}} than an olive, but I’m {{smaller}} than an avocado. (본문)',
    '② Do you want a {{more delicious}} omelet? (본문 — deliciouser ✗)',
    '③ Just add cheese, vegetables, or meat. It will taste {{better}}! (본문 — gooder ✗)'], m),
  ...D.tip(['칠판에 올리브 · 달걀 · 아보카도를 크기 순서로 그리고 “달걀은 올리브보다?” “아보카도보다?”를 물어 bigger than / smaller than을 학생 입에서 먼저 나오게 한다.',
    '비교급 규칙은 표를 외우게 하기보다 단어를 소리 내어 읽고 ‘짧다 → -er / 길다 → more’로 먼저 나누게 하면 중1이 훨씬 빨리 익힌다.',
    '같은 과 문법 감각동사(taste · look 등)와 본문 한 문장(It will taste better!)에서 만나므로 PERFECT CHECK와 WRITE에 감각동사가 섞인 문항을 1~2개 넣었다.'], m),

  // ---------------- Point 1 ----------------
  D.section('Point 1', '비교급 만들기 — 규칙 변화 (+er · +r · y→ier · 자음 반복 · more)', 'point'),
  ...D.table(['원급의 모양', '만드는 법', '예'], [
    ['대부분의 형용사 · 부사', '+ -er', 'small → **smaller** (본문) / tall → taller / fast → faster / sweet → sweeter'],
    ['-e로 끝나는 단어', '+ -r', 'large → **larger** / nice → nicer / safe → safer / wide → wider'],
    ['자음 + y로 끝나는 단어', 'y를 i로 바꾸고 + -er', 'happy → **happier** / easy → easier / early → earlier / heavy → heavier / spicy → spicier'],
    ['단모음 + 단자음으로 끝나는 단어', '마지막 자음을 한 번 더 쓰고 + -er', 'big → **bigger** (본문) / hot → hotter / thin → thinner / fat → fatter'],
    ['3음절 이상 · -ful · -ous · -ive · -ing로 끝나는 단어 · -ly 부사', 'more + 원급', 'delicious → **more delicious** (본문) / popular → more popular / colorful → more colorful / slowly → more slowly'],
    ['비교급 + than', '‘~보다 더 …한/하게’ — than 앞에는 반드시 비교급', 'Strawberries are **sweeter than** apples. / Candy is **more colorful than** chocolate. (교과서)']], [2600, 2600, 4438], m),
  ...D.infoBox('3단계로 만들기', [
    '① 원급의 끝 모양 보기: big = 단모음(i) + 단자음(g) → {{자음 반복}}',
    '② 규칙대로 바꾸기: big → {{bigger}}',
    '③ than + 비교 대상 붙이기: I’m bigger {{than}} an olive.'], m),
  ...D.trick('짧으면 꼬리, 길면 모자', ['짧은 단어는 뒤에 꼬리(-er)를 단다: small → smaller', '긴 단어는 꼬리가 무거워서 앞에 모자(more)를 쓴다: delicious → more delicious', '꼬리와 모자를 동시에 하면 ✗: more smaller'], m),
  ...D.examPoint([
    { q: 'I’m {{bigger}} than an olive. (big)', why: '본문 · [05] 기출 — biger ✗ (단모음 + 단자음)' },
    { q: 'Do you want a {{more delicious}} omelet? (delicious)', why: '본문 · [06] 기출 — deliciouser ✗' }], m),
  ...D.caution(['본문 어법 문항([05]·[06]): I’m biger ✗ / more small ✗ / deliciouser ✗ — 본문 한 문장에서 규칙 두세 개를 한꺼번에 묻는다.',
    '[04] 우리말 영작 ‘사탕은 초콜릿보다 더 알록달록하다’: 필요 없는 단어 colorfuler 고르기 — -ful은 more colorful.',
    'early는 -ly로 끝나도 부사 -ly가 아니라 earlier(y → ier), slowly · quickly는 more slowly · more quickly — 자주 섞어 낸다.',
    '-ly로 끝나는 2음절 형용사(lovely · friendly)나 clever · polite처럼 -er과 more가 둘 다 쓰이는 단어는 정답이 갈리므로 문항에 넣지 않았다.'], m),
  ...D.drill(1, '비교급 만들기 — 규칙 변화', [
    { level: 'Basic ①', type: 'choice', instr: '괄호 안에서 알맞은 것을 고르시오.', items: [
      { q: 'I’m (bigger / biger) than an olive.', a: 'bigger', why: '본문 — 단모음 + 단자음 → 자음 반복' },
      { q: 'Do you want a (more delicious / deliciouser) omelet?', a: 'more delicious', why: '본문 — 3음절 -ous → more' },
      { q: 'Today is (hoter / hotter) than yesterday.', a: 'hotter', why: '[04] 기출 — hot → hotter' },
      { q: 'Jenny is (prettier / prettyer) than her sister.', a: 'prettier', why: '[05] 기출 — y → ier' },
      { q: 'Russia is (larger / more large) than Canada.', a: 'larger', why: '[05] 기출 — -e로 끝남 → +r' },
      { q: 'Candy is (colorfuler / more colorful) than chocolate.', a: 'more colorful', why: '교과서 — -ful → more' },
      { q: 'Old cats are (lazyer / lazier) than kittens.', a: 'lazier', why: '[08] — y → ier' },
      { q: 'My pet dog is (fatter / more fat) than your pet dog.', a: 'fatter', why: '[05] 기출 — fat → fatter' },
      { q: 'Strawberries are (more sweet / sweeter) than apples.', a: 'sweeter', why: '교과서 · [04] — 1음절 → -er' },
      { q: 'Kate runs (slowlier / more slowly) than me.', a: 'more slowly', why: '[08] — -ly 부사 → more' }] },
    { level: 'Basic ②', type: 'fill', instr: '괄호 안의 말을 비교급으로 바꾸어 빈칸에 쓰시오.', items: [
      { q: 'I’m bigger than an olive, but I’m [[smaller]] than an avocado. (small)', why: '본문' },
      { q: 'Bluemon is [[stronger]] than Pinkmon. (strong)', why: '교과서 Use It' },
      { q: 'Pinkmon is [[smarter]] than Bluemon. (smart)', why: '교과서 Use It' },
      { q: 'Pinkmon is [[more dangerous]] than Bluemon. (dangerous)', why: '교과서 Use It — -ous → more' },
      { q: 'English is [[easier]] than math for me. (easy)', why: '교과서 Wrap Up — y → ier' },
      { q: 'Book A is [[thicker]] than Book B. (thick)', why: '[06] 기출' },
      { q: 'Book C is [[thinner]] than Book B. (thin)', why: '[06] 기출 — 자음 반복' },
      { q: 'Watermelons are [[more expensive]] than apples. (expensive)', why: '교과서 Wrap Up' },
      { q: 'Sundae is [[chewier]] than black pudding. (chewy)', why: '교과서 Viewing — y → ier' },
      { q: 'A soccer ball is [[heavier]] than a baseball. (heavy)', why: '[04] 기출' }] },
    { level: 'Intermediate', type: 'write', instr: '어법상 틀린 부분을 찾아 바르게 고쳐 쓰시오.', items: [
      { q: 'I’m biger than an olive.', a: 'biger → bigger', why: '본문 어법 — 자음 반복' },
      { q: 'Do you want a deliciouser omelet?', a: 'deliciouser → more delicious', why: '본문 어법' },
      { q: 'Healthy food is expensiver than fast food.', a: 'expensiver → more expensive', why: '[08]' },
      { q: 'That pig is fater than that one.', a: 'fater → fatter', why: '[08]' },
      { q: 'His room is dirtyer than his sister’s room.', a: 'dirtyer → dirtier', why: '[08] — y → ier' },
      { q: 'I think your tool is usefuler than his tool.', a: 'usefuler → more useful', why: '[08] — -ful → more' },
      { q: 'This exam is more easy than the last one.', a: 'more easy → easier', why: '[08] — 2음절 자음 + y → ier' },
      { q: 'Alice has longger hair than Mira.', a: 'longger → longer', why: '[08] — 자음 2개로 끝남 → +er만' },
      { q: 'Superman is popular than Batman.', a: 'popular → more popular', why: '[08] — than 앞은 비교급' },
      { q: 'She gets up earlyer than my father.', a: 'earlyer → earlier', why: '[08] — y → ier' }] },
    { level: 'Advanced · 모두 고르기', type: 'multi', free: true, instr: '해당하는 것을 모두 골라 기호를 쓰시오.', items: [
      { q: '원급과 비교급이 바르게 짝지어진 것을 모두 고르시오.', box: [
        '(a) hot – hotter', '(b) happy – happyer', '(c) large – larger', '(d) beautiful – more beautiful', '(e) thin – thiner'],
        a: '(a), (c), (d)', why: '(b) happier (e) thinner ([08] 변형)' },
      { q: 'more를 붙여 비교급을 만드는 단어를 모두 고르시오.', box: [
        '(a) small', '(b) useful', '(c) heavy', '(d) difficult', '(e) famous'], a: '(b), (d), (e)', why: '(a) smaller (c) heavier ([08] <보기> 변형)' },
      { q: '다음 글의 밑줄 친 ⓐ~ⓔ 중 어법상 어색한 것을 모두 골라 기호를 쓰고 바르게 고치시오.', fix: true, label: '기호 / 고친 것', box: [
        'Hotteok looks like pancakes, but it is ⓐ __more sweet__ than pancakes. It is also ⓑ __thicker__ than pancakes. Takoyaki is ⓒ __softer__ than dumplings. Black pudding is ⓓ __biger__ than sundae, and sundae is ⓔ __chewier__ than black pudding.'],
        a: 'ⓐ → sweeter, ⓓ → bigger', why: '교과서 Write & Present · Viewing 변형 — 1음절 sweet → -er / big → 자음 반복' },
      { q: '비교급이 바르게 쓰인 문장을 모두 고르시오.', box: [
        '(a) Daegu is hoter than Ilsan in summer.', '(b) Elephants are heavier than cats.', '(c) This bag is more expensive than that bag.',
        '(d) The red car is expensiver than the blue one.', '(e) I got up earlier than my brother.'], a: '(b), (c), (e)', why: '(a) hotter (d) more expensive ([08] · [04])' }] },
    { level: 'Advanced · 객관식', type: 'mcq', free: true, instr: '알맞은 답을 고르시오.', items: [
      { q: '다음 빈칸에 들어갈 말로 알맞은 것은? — The elephant is ______ than the mouse.', opts: [
        'big', 'biger', 'bigger', 'bigest', 'more big'], a: '③', why: '[08] — big → bigger' },
      { q: '다음 중 원급과 비교급이 바르게 짝지어진 것은?', opts: [
        'hot – hoter', 'large – largeer', 'thin – thiner', 'easy – easier', 'beautiful – beautifuler'], a: '④', why: '① hotter ② larger ③ thinner ⑤ more beautiful' },
      { q: '다음 우리말을 영작할 때 필요하지 않은 단어는? — 사탕은 초콜릿보다 더 알록달록하다.', opts: [
        'colorfuler', 'chocolate', 'candy', 'is', 'than'], a: '①', why: '[04] 기출 — Candy is more colorful than chocolate.' },
      { q: '다음 중 어법상 어색한 문장은?', opts: [
        'Math is more difficult than science for me.', 'Today’s weather is hotter than yesterday’s.', 'My pet dog is fatter than your pet dog.',
        'Jenny is prettier than her sister.', 'This bag is largeer than that bag.'], a: '⑤', why: '⑤ larger ([05] 기출 변형)' },
      { q: '(A)~(C)에 알맞은 말이 바르게 짝지어진 것은? — This bag is (A)(larger / more large) than that one. / The white bag is (B)(heavyer / heavier) than the green one. / A baseball field is (C)(biger / bigger) than a basketball court.', opts: [
        'larger – heavier – biger', 'larger – heavier – bigger', 'larger – heavyer – bigger', 'more large – heavyer – biger', 'more large – heavier – bigger'], a: '②', why: '[08] — +r · y → ier · 자음 반복' }] },
    { level: '전환 · 영작', type: 'write', instr: '우리말과 같은 뜻이 되도록 괄호 안의 말을 이용하여 영작하시오. (필요하면 형태를 바꿀 것)', items: [
      { q: '나는 올리브보다 더 크지만, 아보카도보다 더 작다. (big, small)', a: 'I’m bigger than an olive, but I’m smaller than an avocado.', why: '본문 · [05] 영작' },
      { q: '너는 더 맛있는 오믈렛을 원하니? (want, delicious, omelet)', a: 'Do you want a more delicious omelet?', why: '본문 · [06] 영작' },
      { q: '딸기는 사과보다 더 달콤하다. (sweet)', a: 'Strawberries are sweeter than apples.', why: '교과서' },
      { q: '사탕은 초콜릿보다 더 알록달록하다. (colorful)', a: 'Candy is more colorful than chocolate.', why: '교과서' },
      { q: '나는 내 여동생보다 더 빠르게 요리할 수 있다. (cook, fast)', a: 'I can cook faster than my sister.', why: '교과서 — 부사 fast → faster' },
      { q: '수박은 사과보다 더 크다. (watermelons, big)', a: 'Watermelons are bigger than apples.', why: '교과서 Wrap Up' },
      { q: '토끼는 거북보다 더 빠르다. (rabbits, fast)', a: 'Rabbits are faster than turtles.', why: '교과서 Wrap Up' },
      { q: '타코야키는 만두보다 더 부드럽다. (takoyaki, soft)', a: 'Takoyaki is softer than dumplings.', why: '교과서 Write & Present' },
      { q: '오늘은 어제보다 더 덥다. (hot)', a: 'Today is hotter than yesterday.', why: '[04] 기출' },
      { q: '축구공은 야구공보다 더 무겁다. (a soccer ball, heavy)', a: 'A soccer ball is heavier than a baseball.', why: '[04] 기출' }] },
  ], m),

  // ---------------- Point 2 ----------------
  D.section('Point 2', '불규칙 변화 · 비교급 + than 문장 만들기', 'point'),
  ...D.table(['구성', '판단 기준 · 설명', '예'], [
    ['good / well → better', '‘더 좋은 · 더 잘’ — gooder · weller ✗', 'It will taste **better**! (본문) / You sing **better** than my brother. (워크북)'],
    ['bad / ill → worse', '‘더 나쁜’ — badder ✗', 'My brother’s test score is **worse** than my score. ([08])'],
    ['many / much → more', '‘더 많은 · 더 많이’ — 수 · 양 모두 more', 'You should read **more** science books. / I eat **more** than he eats. ([08])'],
    ['little → less', '‘더 적은 · 더 적게’ — littler ✗', 'He has **less** money than his brother. ([08])'],
    ['A + 동사 + 비교급 + than + B', 'be동사 뒤 → 형용사 비교급 / 일반동사 뒤 → 부사 비교급', 'I’m **bigger than** an olive. / I can cook **faster than** my sister. (교과서)'],
    ['명사 앞 비교급', '비교급이 명사를 꾸밀 수도 있다 (than 없이도 가능)', 'Do you want **a more delicious omelet**? (본문) / I want **an older** friend. (워크북)'],
    ['(참고) less + 원급', '‘덜 …한’ — 반대 방향 비교', 'The pizza is **less expensive** than the steak. ([05] 기출)']], [2300, 3300, 4038], m),
  ...D.infoBox('비교 문장 3단계', [
    '① 누구를 누구와 비교하나: {{Strawberries}} vs. apples',
    '② 형용사 · 부사를 비교급으로: sweet → {{sweeter}} / good → {{better}}',
    '③ than + 비교 대상: Strawberries are sweeter {{than}} apples.'], m),
  ...D.trick('불규칙 4총사는 한 문장으로', ['좋은(good) 건 더 좋아지고(better)', '나쁜(bad) 건 더 나빠지고(worse)', '많은(many · much) 건 더 많아지고(more), 적은(little) 건 더 적어진다(less)'], m),
  ...D.examPoint([
    { q: 'Just add cheese, vegetables, or meat. It will taste {{better}}! (good)', why: '본문 · [06] 기출 — gooder ✗, taste + 형용사' },
    { q: 'Today’s weather is {{better}} than yesterday’s. (good)', why: '[05] 기출 — gooder → better 고치기' }], m),
  ...D.caution(['[05] 기출: Today’s weather is gooder than yesterday’s. — 어법상 어색한 것 고르기. good · bad의 불규칙을 가장 많이 묻는다.',
    '[06] 기출 본문 빈칸: It will taste (A)______! — 흐름상 ‘더 맛있을’이므로 better (worse ✗). 감각동사 taste 뒤 형용사 자리라는 점도 함께 묻는다.',
    '[05] 표 문제(steak $20 · spaghetti $8 · pizza $12): more expensive than / less expensive than / cheaper than — less + 원급은 참고로만 다루고 WRITE에 1문항 넣었다.',
    'Which do you like better, A or B?(best와 better 모두 들은 학생이 있어 정답 시비 가능)와 far → farther / further는 문항으로 내지 않았다.'], m),
  ...D.drill(2, '불규칙 변화 · 비교급 + than', [
    { level: 'Basic ①', type: 'choice', instr: '괄호 안에서 알맞은 것을 고르시오.', items: [
      { q: 'Just add cheese, vegetables, or meat. It will taste (gooder / better)!', a: 'better', why: '본문 — good → better' },
      { q: 'My brother’s test score is (badder / worse) than my score.', a: 'worse', why: '[08] — bad → worse' },
      { q: 'They don’t have much money. We have (more / much) money than they do.', a: 'more', why: '[08] — much → more' },
      { q: 'He has (less / little) money than his brother.', a: 'less', why: '[08] — little → less' },
      { q: 'You sing (gooder / better) than my brother.', a: 'better', why: '워크북 — well → better' },
      { q: 'The traffic today is bad, but the traffic yesterday was (worse / badder).', a: 'worse', why: '워크북 Part 3' },
      { q: 'I love you (more / much) than you love me.', a: 'more', why: '[08] — much → more' },
      { q: 'I like dogs (more good / better) than cats.', a: 'better', why: '[08] — good · well → better' },
      { q: 'Cheetahs are faster (as / than) lions.', a: 'than', why: '워크북 — 비교급 + than' },
      { q: 'The shoes cost (more / much) than I thought.', a: 'more', why: '[08] — much → more' }] },
    { level: 'Basic ②', type: 'fill', instr: '괄호 안의 말을 알맞은 형태로 바꾸어 빈칸에 쓰시오.', items: [
      { q: 'Just add cheese, vegetables, or meat. It will taste [[better]]! (good)', why: '본문' },
      { q: 'We answered all the questions [[better]] than the other students. (well)', why: '워크북 Part 2 — 부사 well → better' },
      { q: 'Our new teacher explains the exercises [[worse]] than our old teacher. (badly)', why: '워크북 Part 2 — badly → worse' },
      { q: 'The math exam was bad, but the science exam was even [[worse]]. (bad)', why: '워크북 Part 3' },
      { q: 'You should read [[more]] science books. (many)', why: '워크북 Part 8' },
      { q: 'Mary has [[less]] money than her brother. (little)', why: 'little → less' },
      { q: 'Most brown hens eat [[more]] than white ones. (much)', why: '워크북 Part 8 — much → more' },
      { q: 'Doing something is [[better]] than doing nothing at all. (good)', why: '워크북 Part 8' },
      { q: 'My cold got [[worse]] last night. (bad)', why: 'bad → worse' },
      { q: 'This bag is [[cheaper]] than that one. (cheap)', why: '규칙 변화 섞기 — +er' }] },
    { level: 'Intermediate', type: 'write', instr: '어법상 틀린 부분을 찾아 바르게 고쳐 쓰시오.', items: [
      { q: 'Just add cheese, vegetables, or meat. It will taste gooder!', a: 'gooder → better', why: '본문 어법 ([01])' },
      { q: 'Today’s weather is gooder than yesterday’s.', a: 'gooder → better', why: '[05] 기출' },
      { q: 'The conditions are badder than I thought.', a: 'badder → worse', why: '[08]' },
      { q: 'He had little money than her.', a: 'little → less', why: '[08]' },
      { q: 'The shoes cost much than I thought.', a: 'much → more', why: '[08]' },
      { q: 'I’m strong than my sister.', a: 'strong → stronger', why: '[08] — than 앞은 비교급' },
      { q: 'This book is interesting than that one.', a: 'interesting → more interesting', why: '[08]' },
      { q: 'Steve better sings than me.', a: 'better sings → sings better', why: '[08] — 부사 비교급은 동사 뒤' },
      { q: 'Cheetahs are faster as lions.', a: 'as → than', why: '워크북 — 비교급 + than' },
      { q: 'I love you much than you love me.', a: 'much → more', why: '[08]' }] },
    { level: 'Advanced · 모두 고르기', type: 'multi', free: true, instr: '해당하는 것을 모두 골라 기호를 쓰시오.', items: [
      { q: '다음 중 어법상 옳은 문장을 모두 고르시오.', box: [
        '(a) He had little money than her.', '(b) I like dogs better than cats.', '(c) This exam is easier than the last one.',
        '(d) Health is important than money.', '(e) It will taste better!'], a: '(b), (c), (e)', why: '(a) less (d) more important ([08] 변형)' },
      { q: '원급과 비교급이 바르게 짝지어진 것을 모두 고르시오.', box: [
        '(a) good – better', '(b) bad – worser', '(c) much – more', '(d) little – littler', '(e) well – better'], a: '(a), (c), (e)', why: '(b) worse (d) less' },
      { q: '다음 글의 밑줄 친 ⓐ~ⓔ 중 어법상 어색한 것을 모두 골라 기호를 쓰고 바르게 고치시오.', fix: true, label: '기호 / 고친 것', box: [
        'Do you want a ⓐ __more delicious__ omelet? Just add cheese. It will taste ⓑ __gooder__! Mina cooks ⓒ __better__ than her brother. She uses ⓓ __little__ oil than her mom, and her omelets are ⓔ __thinner__ than her mom’s.'],
        a: 'ⓑ → better, ⓓ → less', why: '본문 변형 — good → better · little → less' },
      { q: '빈칸에 more가 들어갈 수 있는 것을 모두 고르시오.', box: [
        '(a) You should read ______ science books.', '(b) This book is ______ interesting than that one.', '(c) I eat ______ than he eats.',
        '(d) It will taste ______ than before.', '(e) Cars are ______ faster than bikes.'], a: '(a), (b), (c)', why: '(d) better (e) much · even 등 — more faster ✗' }] },
    { level: 'Advanced · 객관식', type: 'mcq', free: true, instr: '알맞은 답을 고르시오.', items: [
      { q: '다음 빈칸에 들어갈 말로 알맞은 것은? — Just add cheese, vegetables, or meat. It will taste ______! (그것은 더 맛있을 것이다!)', opts: [
        'good', 'gooder', 'better', 'more good', 'well'], a: '③', why: '본문 — good → better (‘더’ 맛있을 것)' },
      { q: '다음 중 밑줄 친 부분이 어법상 어색한 것은?', opts: [
        'She sings __better__ than I do.', 'Jane is __more beautiful__ than Mary.', 'The Earth is __smaller__ than the Sun.',
        'This summer is __hotter__ than last summer.', 'My brother’s test score is __badder__ than my score.'], a: '⑤', why: '⑤ worse ([08])' },
      { q: '다음 중 밑줄 친 부분이 어법상 어색한 것은?', opts: [
        'This one is __more good__ than that one.', 'The white bag is __heavier__ than the green one.', 'Today’s weather is __colder__ than yesterday’s.',
        'The black T-shirt is __bigger__ than the yellow one.', 'The blue shoes are __more comfortable__ than the red ones.'], a: '①', why: '① better ([08])' },
      { q: '다음 중 어법상 올바른 문장의 개수는?', box: [
        '(a) It will taste better!', '(b) He runs faster than me.', '(c) The conditions are badder than I thought.',
        '(d) I eat more than he eats.', '(e) The shoes cost much than I thought.'], opts: ['1개', '2개', '3개', '4개', '5개'], a: '③', why: '(a)(b)(d) ○ / (c) worse (e) more' },
      { q: '(A)~(C)에 알맞은 말이 바르게 짝지어진 것은? — Mina cooks (A)(better / gooder) than her brother. / She has (B)(less / little) free time than him. / Her soup tastes (C)(worse / badder) today.', opts: [
        'better – little – worse', 'better – less – worse', 'gooder – less – badder', 'better – less – badder', 'gooder – little – worse'], a: '②', why: 'well → better / little → less / bad → worse' }] },
    { level: '전환 · 영작', type: 'write', instr: '우리말과 같은 뜻이 되도록 괄호 안의 말을 이용하여 영작하시오. (필요하면 형태를 바꿀 것)', items: [
      { q: '그것은 더 맛있을 것이다! (taste, good)', a: 'It will taste better!', why: '본문 · [06] 영작' },
      { q: '너는 내 남동생보다 노래를 더 잘한다. (sing, well)', a: 'You sing better than my brother.', why: '워크북 Part 2' },
      { q: '그의 상태는 미나의 상태보다 더 나빴다. (his condition, bad, Mina’s)', a: 'His condition was worse than Mina’s.', why: '[08]' },
      { q: '너는 더 많은 과학책을 읽어야 한다. (should, many)', a: 'You should read more science books.', why: '워크북 Part 8' },
      { q: '그는 그의 형보다 돈을 더 적게 가지고 있다. (little, money)', a: 'He has less money than his brother.', why: '[08] <보기>' },
      { q: '나는 그보다 더 많이 먹는다. (eat, much)', a: 'I eat more than he does. (than he eats · than him도 정답)', why: '[08]' },
      { q: '무언가를 하는 것이 아무것도 하지 않는 것보다 더 낫다. (do something, good, do nothing)', a: 'Doing something is better than doing nothing.', why: '워크북 Part 8' },
      { q: '나는 오늘 기분이 더 좋다. (feel, good)', a: 'I feel better today.', why: '감각동사 feel + 형용사 비교급' },
      { q: '나는 더 나이 많은 친구를 원한다. (want, old)', a: 'I want an older friend.', why: '워크북 Part 8 — 명사 앞 비교급 (a → an)' },
      { q: '피자는 스테이크보다 덜 비싸다. (less, expensive)', a: 'The pizza is less expensive than the steak.', why: '[05] 기출 — less + 원급' }] },
  ], m),

  // ---------------- Point 3 ----------------
  D.section('Point 3', '비교급 강조 (much · even · far · a lot) · 자주 틀리는 비교급', 'point'),
  ...D.table(['구성', '판단 기준 · 설명', '예'], [
    ['비교급 강조 ‘훨씬 더’', 'much · even · far · a lot + 비교급 (still도 가능)', 'Jenny is **much lighter** than her sisters. / This bag is **even bigger** than yours. ([08])'],
    ['very ✗', 'very는 원급만 꾸민다 (very big ○ / very bigger ✗)', 'The chair is very more comfortable ✗ → **much** more comfortable'],
    ['이중 비교 ✗', '-er과 more를 함께 쓰지 않는다', 'more bigger ✗ → **bigger** / more easier ✗ → **easier** ([08])'],
    ['much + 원급 ✗', 'much 뒤에도 비교급이 와야 한다', 'much expensive ✗ → **much more expensive**'],
    ['than 뒤 비교 대상', '같은 종류끼리 비교 — 소유대명사 yours · his · mine', 'Your dog’s body is warmer than **yours**. (your ✗) / Your program is cheaper than **his**. (him ✗) ([08])'],
    ['(참고) a little + 비교급', '‘조금 더’', 'Emma is **a little older** than Sam. (워크북)']], [2300, 3300, 4038], m),
  ...D.infoBox('강조 문장 3단계', [
    '① 비교급 문장 만들기: Watermelons are bigger than apples.',
    '② 비교급 바로 앞에 강조어: Watermelons are {{much}} bigger than apples.',
    '③ very로 바꿀 수 있나? → {{없다}} (very bigger ✗)'], m),
  ...D.trick('훨씬 4형제', ['much · even · far · a lot은 비교급의 경호원', 'very는 원급 전용 경호원이라 비교급에는 못 들어간다', '경호원은 더블(more bigger)을 싫어한다 — 비교 표시는 한 번만'], m),
  ...D.examPoint([
    { q: 'This bag is ______ bigger than yours. — 들어갈 수 없는 말: {{very}}', why: '[08] — much · even · far · a lot ○' },
    { q: 'Your dog’s body is always warmer than {{yours}}. (your ✗)', why: '[08] — 비교 대상은 같은 종류(네 몸 = yours)' }], m),
  ...D.caution(['[08] 다수: ‘밑줄 친 부분의 쓰임이 어색한 것’ — very more comfortable ✗만 오답, much · even · a lot · still은 정답으로 낸다.',
    '[08] ‘어법상 옳은 것을 모두 고른 것’: more easier ✗ · than your ✗ · much expensive ✗ — 한 문항에 Point 3 함정이 세 개씩 섞인다.',
    'than me / than I (am)은 둘 다 정답으로 인정하는 학교가 많아 than 뒤 주격 · 목적격은 문항으로 내지 않았다.',
    '[08]의 Nothing is more important than health(최상급 의미) · not so ~ than · the latter / latest 문항은 중1 범위를 넘어 쓰지 않았다.'], m),
  ...D.drill(3, '비교급 강조 · 자주 틀리는 비교급', [
    { level: 'Basic ①', type: 'choice', instr: '괄호 안에서 알맞은 것을 고르시오.', items: [
      { q: 'Jenny is (much / very) lighter than her sisters.', a: 'much', why: '[08] — 비교급 강조' },
      { q: 'The chair is (even / very) more comfortable than that one.', a: 'even', why: '[08] — very ✗' },
      { q: 'Black pudding is (more bigger / much bigger) than sundae.', a: 'much bigger', why: '이중 비교 ✗' },
      { q: 'This book is (more easier / easier) than that.', a: 'easier', why: '[08] — 이중 비교 ✗' },
      { q: 'His house is (larger / more larger) than ours.', a: 'larger', why: '[08]' },
      { q: 'Your dog’s body is always warmer than (your / yours).', a: 'yours', why: '[08] — 비교 대상 = 네 몸' },
      { q: 'Your program is cheaper than (him / his).', a: 'his', why: '[08] — 그의 프로그램' },
      { q: 'The red car is (much more expensive / much expensive) than the blue one.', a: 'much more expensive', why: '[08] — much + 비교급' },
      { q: 'Today it is (a lot / very) hotter than yesterday.', a: 'a lot', why: 'a lot + 비교급' },
      { q: 'My computer is more expensive than (you / yours).', a: 'yours', why: '[08] <보기> — 네 컴퓨터' }] },
    { level: 'Basic ②', type: 'fill', instr: '우리말과 같은 뜻이 되도록 <보기>에서 알맞은 말을 골라 빈칸에 쓰시오. (한 번씩만 사용)',
      bogi: ['than', 'mine', 'easier', 'much', 'yours', 'bigger', 'better', 'hers', 'more', 'worse'], items: [
      { q: 'Black pudding is [[bigger]] than sundae. (블랙 푸딩은 순대보다 더 크다.)', why: '교과서 Viewing — more bigger ✗' },
      { q: 'My bag is heavier than [[yours]]. (내 가방은 네 것보다 더 무겁다.)', why: '소유대명사' },
      { q: 'This test is [[easier]] than the last one. (이번 시험은 지난번 것보다 더 쉽다.)', why: 'more easier ✗' },
      { q: 'Cheetahs are faster [[than]] lions. (치타는 사자보다 더 빠르다.)', why: '비교급 + than' },
      { q: 'Mary’s car isn’t very big. My car is bigger than [[hers]]. (내 차는 그녀의 것보다 더 크다.)', why: '워크북 Part 2' },
      { q: 'A watermelon is [[much]] bigger than an apple. (수박은 사과보다 훨씬 더 크다.)', why: '비교급 강조' },
      { q: 'Your room is cleaner than [[mine]]. (네 방은 내 것보다 더 깨끗하다.)', why: '소유대명사' },
      { q: 'Just add some cheese. It will taste [[better]]! (그것은 더 맛있을 것이다!)', why: '본문 — good → better' },
      { q: 'I eat [[more]] than my brother. (나는 형보다 더 많이 먹는다.)', why: 'much → more' },
      { q: 'His cold got [[worse]] last night. (그의 감기는 어젯밤 더 나빠졌다.)', why: 'bad → worse' }] },
    { level: 'Intermediate', type: 'write', instr: '어법상 틀린 부분을 찾아 바르게 고쳐 쓰시오.', items: [
      { q: 'The chair is very more comfortable than that one.', a: 'very → much (even · far · a lot)', why: '[08] — very ✗' },
      { q: 'She was very prettier than her sister.', a: 'very → much (even · far · a lot)', why: '[08]' },
      { q: 'This book is more easier than that.', a: 'more easier → easier', why: '[08] — 이중 비교 ✗' },
      { q: 'His house is more larger than ours.', a: 'more larger → larger', why: '[08]' },
      { q: 'The Empire State Building is more shorter than the CN Tower.', a: 'more shorter → shorter', why: '[08] <보기>' },
      { q: 'They were more later than other students.', a: 'more later → later', why: '[08]' },
      { q: 'Your dog’s body is always warmer than your.', a: 'your → yours', why: '[08] — 비교 대상' },
      { q: 'My computer is more expensive than you.', a: 'you → yours', why: '[08] <보기>' },
      { q: 'The red car is much expensive than the blue one.', a: 'much expensive → much more expensive (또는 more expensive)', why: '[08]' },
      { q: 'Your program is cheaper than him.', a: 'him → his', why: '[08]' }] },
    { level: 'Advanced · 모두 고르기', type: 'multi', free: true, instr: '해당하는 것을 모두 골라 기호를 쓰시오.', items: [
      { q: '빈칸에 들어갈 수 있는 말을 모두 고르시오. — This bag is ______ bigger than yours.', box: [
        '(a) much', '(b) very', '(c) even', '(d) far', '(e) a lot'], a: '(a), (c), (d), (e)', why: '(b) very는 비교급 강조 ✗' },
      { q: '다음 중 어법상 옳은 문장을 모두 고르시오.', box: [
        '(a) Daegu is hotter than Seoul.', '(b) This book is more easier than that.', '(c) Your purple shirt is cheaper than his.',
        '(d) Your dog’s body is always warmer than your.', '(e) The red car is much expensive than the blue one.'], a: '(a), (c)', why: '(b) easier (d) yours (e) much more expensive ([08])' },
      { q: '다음 글의 밑줄 친 ⓐ~ⓔ 중 어법상 어색한 것을 모두 골라 기호를 쓰고 바르게 고치시오.', fix: true, label: '기호 / 고친 것', box: [
        'Takoyaki looks like small dumplings, but it is ⓐ __very softer__ than dumplings. Hotteok is ⓑ __much sweeter__ than pancakes. My hotteok is ⓒ __bigger than yours__. Black pudding is ⓓ __more bigger__ than sundae, and sundae is ⓔ __even chewier__ than black pudding.'],
        a: 'ⓐ → much (even · far · a lot) softer, ⓓ → bigger', why: '교과서 Write & Present · Viewing 변형 — very ✗ · 이중 비교 ✗' },
      { q: '밑줄 친 부분이 어법상 옳은 것을 모두 고르시오.', box: [
        '(a) Jenny is __much lighter__ than her sisters.', '(b) The chair is __very more comfortable__ than that one.', '(c) This bag is __even bigger__ than yours.',
        '(d) The black T-shirts are __a lot larger__ than the white ones.', '(e) You’re __still more bigger__ than him.'], a: '(a), (c), (d)', why: '(b) very ✗ (e) 이중 비교 ✗ ([08])' }] },
    { level: 'Advanced · 객관식', type: 'mcq', free: true, instr: '알맞은 답을 고르시오.', items: [
      { q: '다음 빈칸에 들어갈 수 없는 것은? — This candy is ______ sweeter than that one.', opts: [
        'much', 'even', 'very', 'far', 'a lot'], a: '③', why: 'very는 비교급 강조 ✗' },
      { q: '다음 중 어법상 올바른 문장은?', opts: [
        'My hair is longer than yours.', 'Your program is cheaper than him.', 'She was very prettier than her sister.',
        'They were more later than other students.', 'His house is more larger than ours.'], a: '①', why: '② his ③ much ④ later ⑤ larger ([08])' },
      { q: '다음 중 밑줄 친 부분의 쓰임이 어색한 것은?', opts: [
        'Jenny is __much__ lighter than her sisters.', 'This bag is __even__ bigger than yours.', 'The black T-shirts are __a lot__ larger than the white T-shirts.',
        'Yuna can run __far__ faster than Tom.', 'The chair is __very__ more comfortable than that one.'], a: '⑤', why: '⑤ very ✗ ([08])' },
      { q: '다음 중 어법상 올바른 문장의 개수는?', box: [
        '(a) An ox is bigger than a frog.', '(b) My mother is wiser than me.', '(c) This bag is much heavier than mine.',
        '(d) My computer is more expensive than you.', '(e) Hotteok is even sweeter than pancakes.'], opts: ['1개', '2개', '3개', '4개', '5개'], a: '④', why: '(d)만 ✗ → yours ([08] <보기> 변형)' },
      { q: '(A)~(C)에 알맞은 말이 바르게 짝지어진 것은? — Takoyaki is (A)(much / very) softer than dumplings. / My omelet is bigger than (B)(your / yours). / This book is (C)(easier / more easier) than that one.', opts: [
        'very – yours – easier', 'much – yours – easier', 'much – your – easier', 'much – yours – more easier', 'very – your – more easier'], a: '②', why: '강조 much · 소유대명사 · 이중 비교 ✗' }] },
    { level: '전환 · 영작', type: 'write', instr: '괄호 안의 지시대로 쓰시오.', items: [
      { q: '수박은 사과보다 훨씬 더 크다. (much, big)', a: 'Watermelons are much bigger than apples.', why: '교과서 Wrap Up 변형' },
      { q: '이 가방은 네 것보다 훨씬 더 무겁다. (even, heavy, yours)', a: 'This bag is even heavier than yours.', why: '강조 + 소유대명사' },
      { q: '타코야키는 만두보다 훨씬 더 부드럽다. (a lot, soft)', a: 'Takoyaki is a lot softer than dumplings.', why: '교과서 Write & Present 변형' },
      { q: '치타는 사자보다 훨씬 더 빠르다. (far, fast)', a: 'Cheetahs are far faster than lions.', why: 'far + 비교급' },
      { q: 'You’re very taller than me. (어법에 맞게 고쳐 쓸 것)', a: 'You’re much (even · far · a lot) taller than me.', why: 'very ✗' },
      { q: 'This book is more easier than that one. (어법에 맞게 고쳐 쓸 것)', a: 'This book is easier than that one.', why: '이중 비교 ✗' },
      { q: '네 개의 몸은 항상 네 것보다 더 따뜻하다. (your dog’s body, always, warm, yours)', a: 'Your dog’s body is always warmer than yours.', why: '[08] · 워크북 Part 8' },
      { q: '내 컴퓨터는 네 것보다 더 비싸다. (expensive, yours)', a: 'My computer is more expensive than yours.', why: '[08] <보기>' },
      { q: '오늘은 어제보다 훨씬 더 덥다. (much, hot)', a: 'Today is much hotter than yesterday. (It is much hotter today than yesterday.)', why: '워크북 Part 4' },
      { q: 'Emma는 Sam보다 나이가 조금 더 많다. (a little, old)', a: 'Emma is a little older than Sam.', why: '워크북 Part 4 — a little + 비교급' }] },
  ], m),

  // ---------------- PERFECT CHECK ----------------
  D.section('PERFECT CHECK', '상위권 함정 체크'),
  ...D.drill(null, '', [{ level: '함정', type: 'choice', instr: '실수하기 쉬운 문장들이에요. 괄호 안에서 알맞은 것을 고르시오.', items: [
    { q: 'I’m (biger / bigger) than an olive, but I’m smaller than an avocado.', a: 'bigger', why: '본문 — 자음 반복' },
    { q: 'Do you want a (more delicious / deliciouser) omelet?', a: 'more delicious', why: '본문 — more + 원급' },
    { q: 'Just add cheese, vegetables, or meat. It will taste (better / gooder)!', a: 'better', why: '본문 — good → better (감각동사 taste + 형용사)' },
    { q: 'This candy tastes (more sweetly / sweeter) than that one.', a: 'sweeter', why: '[05] — 감각동사 taste 뒤는 형용사 비교급(같은 과 문법)' },
    { q: 'Black pudding is (more bigger / bigger) than sundae.', a: 'bigger', why: '이중 비교 ✗' },
    { q: 'The chair is (much / very) more comfortable than that one.', a: 'much', why: '[08] — very ✗' },
    { q: 'My bag is heavier than (you / yours).', a: 'yours', why: '비교 대상 = 네 가방' },
    { q: 'He had (little / less) money than his brother.', a: 'less', why: '[08] — little → less' },
    { q: 'I usually get up (earlier / earlyer) than my sister.', a: 'earlier', why: '[08] — y → ier' },
    { q: 'Superman is (more popular / popular) than Batman.', a: 'more popular', why: '[08] — than 앞은 비교급' }] }], m),

  // ---------------- WRITE ----------------
  D.section('WRITE', '서술형 대비'),
  ...D.writeItem(1, 'Basic', '괄호 안의 단어를 바르게 배열하시오.', ['( bigger / I’m / an olive / than ), but ( than / smaller / I’m / an avocado ). (본문)'],
    { a: 'I’m bigger than an olive, but I’m smaller than an avocado.', why: '주어 + be동사 + 비교급 + than + 비교 대상' }, m),
  ...D.writeItem(2, 'Basic', '카드를 보고 괄호 안의 말을 이용하여 문장을 완성하시오.', ['(1) Bluemon is ______________ Pinkmon. (strong)   (2) Pinkmon is ______________ Bluemon. (dangerous) (교과서 Use It)'],
    { a: '(1) stronger than  (2) more dangerous than', why: '1음절 → -er / -ous → more', blanks: ['(1)', '(2)'] }, m),
  ...D.writeItem(3, 'Intermediate', '어법상 틀린 부분 2개를 찾아 바르게 고쳐 쓰시오.', ['I’m biger than an olive, but I’m more small than an avocado. What am I? (본문)'],
    { a: '① biger → bigger  ② more small → smaller', why: '① 단모음 + 단자음 → 자음 반복 ② 1음절 small은 -er ([01] 본문 어법)', blanks: ['①', '②'] }, m),
  ...D.writeItem(4, 'Intermediate', '우리말과 같은 뜻이 되도록 <조건>에 맞게 영작하시오.', ['여러분은 더 맛있는 오믈렛을 원하나요?', '<조건> want, delicious, omelet을 사용할 것 · 7단어로 쓸 것'],
    { a: 'Do you want a more delicious omelet?', why: '본문 · [06] 기출 — delicious → more delicious, 관사 a' }, m),
  ...D.writeItem(5, 'Intermediate', '<보기>를 보고 비교급 문장을 완성하시오.', ['<보기> a soccer ball – 410 g / a baseball – 142 g',
    '(1) A soccer ball is ______________ a baseball.   (2) A baseball is ______________ a soccer ball.'],
    { a: '(1) heavier than  (2) lighter than', why: '[04] 기출 — heavy → heavier (y → ier)', blanks: ['(1)', '(2)'] }, m),
  ...D.writeItem(6, 'Intermediate', '표를 보고 <보기>의 단어를 활용하여 문장을 완성하시오. (각 빈칸에 한 단어씩)', ['Steak $20 / Spaghetti $8 / Pizza $12    <보기> expensive, cheap',
    '(1) The steak is ____ ____ ____ the spaghetti.  (2) The pizza is ____ ____ ____ the steak.  (3) The spaghetti is ____ ____ the pizza.'],
    { a: '(1) more expensive than  (2) less expensive than  (3) cheaper than', why: '[05] 기출 — more + 원급 · less + 원급(덜 …한) · cheap → cheaper', blanks: ['(1)', '(2)', '(3)'] }, m),
  ...D.writeItem(7, 'Advanced', '표를 보고 <조건>에 맞게 빈칸을 완성하시오.', ['Sales: Book A ★★ / Book B ★★★★ / Book C ★★★    Thickness: Book A 5 cm / Book B 3 cm / Book C 2 cm',
    '<조건> thin, thick, popular를 어법에 맞게 사용할 것 (중복 사용 가능)',
    '(1) Book A is ______________ Book B. (두께)  (2) Book C is ______________ Book B. (두께)  (3) Book B is ______________ the other books. (인기도)'],
    { a: '(1) thicker than  (2) thinner than  (3) more popular than', why: '[06] 기출 — thin → thinner(자음 반복) · popular → more popular', blanks: ['(1)', '(2)', '(3)'] }, m),
  ...D.writeItem(8, 'Advanced', '우리말과 같은 뜻이 되도록 <조건>에 맞게 영작하시오.', ['호떡은 팬케이크처럼 보이지만, 그것은 팬케이크보다 훨씬 더 달콤하다.', '<조건> look like, sweet, much를 사용할 것 (필요시 형태 변화)'],
    { a: 'Hotteok looks like pancakes, but it is much sweeter than pancakes.', why: '교과서 Write & Present — look like + 명사(감각동사) · much + 비교급' }, m),
  ...D.writeItem(9, 'Advanced', '어법상 틀린 부분 2개를 찾아 바르게 고치고, 그 이유를 쓰시오.', ['The chair is very more comfortable than that one. My computer is more expensive than you.'],
    { a: '① very → much (even · far · a lot)  ② you → yours', why: '① very는 비교급을 강조할 수 없다 ② 비교 대상은 같은 종류(내 컴퓨터 ↔ 네 컴퓨터)여야 하므로 소유대명사 yours ([08])', blanks: ['고친 것', '이유'] }, m),
  ...D.writeItem(10, 'Advanced', '어법상 틀린 부분 2개를 찾아 바르게 고치고, 그 이유를 쓰시오.', ['Do you want a deliciouser omelet? Just add cheese, vegetables, or meat. It will taste gooder!'],
    { a: '① deliciouser → more delicious  ② gooder → better', why: '① 3음절 -ous 형용사는 more + 원급 ② good의 비교급은 불규칙 better ([01] 본문 어법 · [06] 기출)', blanks: ['고친 것', '이유'] }, m),

  // ---------------- MAP ----------------
  D.pageBreak(), // MAP 이미지가 쪽 끝에서 잘리지 않도록 새 쪽에서 시작
  D.section('MAP', "DAVID'S MAP — 백지노트 테스트"),
  D.P([D.T('오늘 배운 내용을 떠올리며 빈칸을 채워 보세요. 책을 보지 않고!', { size: 18, color: '595959' })], { spacing: { after: 120 }, keepNext: true }),
  ...D.image(path.join(__dirname, 'map_G-비교급_중1.png'), 620),
  ...D.table(['자가 체크 — 백지노트에 이 단어들이 들어갔나요?', '✔'], [
    ['A + 동사 + 비교급 + than + B = A는 B보다 더 …하다', ''], ['대부분 + -er: small → smaller / -e로 끝나면 + -r: large → larger', ''],
    ['자음 + y → i + er: easy → easier · early → earlier', ''], ['단모음 + 단자음 → 자음 반복: big → bigger · hot → hotter · thin → thinner', ''],
    ['3음절 이상 · -ful · -ous · -ive · -ly 부사 → more + 원급: more delicious', ''], ['불규칙: good/well → better · bad → worse · many/much → more · little → less', ''],
    ['강조 much · even · far · a lot + 비교급 (very ✗)', ''], ['이중 비교 ✗: more bigger → bigger', ''],
    ['than 뒤 비교 대상은 같은 종류: than yours (than you ✗)', ''],
    ['본문: I’m bigger than an olive / a more delicious omelet / It will taste better!', '']], [8838, 800], m),
  ...D.memo(['다음 시간 도입: 올리브 · 달걀 · 아보카도 그림을 보여 주고 학생이 직접 수수께끼 문장(I’m bigger than …, but I’m smaller than …)을 만들게 하기',
    '약한 반: Point 1(규칙 변화)을 단어 카드 분류 활동으로 확실히 → Point 2는 good → better · bad → worse 두 개만 → Point 3은 very ✗ 하나만',
    '감각동사(같은 과 문법)와 섞인 It will taste better! · This candy tastes sweeter than that one. 문장을 다시 보며 ‘taste + 형용사 비교급’을 확인',
    '교과서 Write & Present: 소개하고 싶은 음식을 비슷한 음식과 비교하는 문장(It is ___er than ___.)을 한 문장씩 쓰고 짝과 서로 어법 점검'], m),
];
D.render(meta, build, process.argv[2] || '.').then(fs_ => {
  console.log(fs_.join('\n'));
});
