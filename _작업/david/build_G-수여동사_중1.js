const D0 = require('./david_base');
const path = require('path');
const fs = require('fs');
// 중1 동아(윤정미) 8과 목표 문법 ① 수여동사(4형식) · 3형식 전환(to · for · of)
// 한 문장에 빈칸 ______ 이 두 개 이상이면 david_base의 __밑줄__ 서식으로 잘못 읽히므로
// 밑줄 3개 이상 이어진 빈칸은 밑줄 사이에 U+200B를 넣어 둔다 (beworth · the비교급 · with분사 스크립트와 같은 처리).
const ZB = (s) => s.replace(/_{3,}/g, (u) => u.split('').join('​'));
const deep = (v) => typeof v === 'string' ? ZB(v) : Array.isArray(v) ? v.map(deep)
  : (v && typeof v === 'object' && v.constructor === Object) ? Object.fromEntries(Object.entries(v).map(([k, x]) => [k, deep(x)])) : v;
const D = new Proxy(D0, { get: (t, k) => (typeof t[k] === 'function' && !['render', 'P', 'T', 'image'].includes(k)) ? (...a) => t[k](...deep(a)) : t[k] });
const COVER = JSON.parse(process.env.COVER || '{}');
const TITLE = '수여동사';
const meta = { series: D.SERIES.G, code: 'G-수여동사', title: TITLE, category: 'G. 문장의 형식  |  수여동사 (4형식) · 3형식 전환 to · for · of',
  rightText: 'G  수여동사 (4형식 ↔ 3형식)', prefix: process.env.PREFIX || '', cover: COVER.title ? COVER : undefined,
  question: 'People didn’t give ~~her many likes~~. — 왜 give 뒤에 목적어가 두 개나 올까? 그리고 ‘~에게’를 뜻하는 to는 어디로 갔을까?' };

const build = (m) => [
  D.section('FLOW', 'Teaching Flow — 처음 배우는 사람도 따라오는 5단계'),
  ...D.step(1, '우리말로 먼저 생각하기 — ‘~에게 …을 (해) 주다’', [
    '‘엄마가 나에게 자전거를 사 주셨다.’ — 받는 사람(나에게)과 주는 물건(자전거를) {{두}} 가지가 필요한 문장이다.',
    '이렇게 ‘~에게 …을 주다’라는 뜻을 가진 동사를 {{수여동사}}라고 한다. (수여 = 주다)'], m),
  ...D.step(2, '이전 학년 복습 — 목적어', [
    '목적어 = 동사의 대상 ‘~을/를’: Goldilocks posted **everyday things**. (본문)',
    '목적어가 하나인 문장 = 주어 + 동사 + 목적어 = {{3형식}}'], m),
  ...D.step(3, '문제 제기 — 본문에는 목적어가 두 개?', [
    'At first, she posted everyday things, but people didn’t give **her** **many likes**. (본문)',
    'give 뒤에 her와 many likes가 나란히 왔다. 둘 다 목적어일까? 순서를 바꿔도 될까?'], m),
  ...D.step(4, '규칙 발견 — 받는 사람 먼저, 물건 나중', [
    'her = ‘그녀에게’(받는 사람) = {{간접목적어}} / many likes = ‘많은 좋아요를’(주는 것) = {{직접목적어}}',
    '순서를 바꾸려면 받는 사람 앞에 전치사가 필요하다: didn’t give many likes {{to}} her'], m),
  ...D.step(5, '결론 🔑', [
    '4형식 = 주어 + 수여동사 + 간접목적어(~에게) + 직접목적어(…을) / 3형식 = 주어 + 동사 + 직접목적어 + {{to · for · of}} + 간접목적어 / 직접목적어가 it · them이면 {{3형식}}만'], m),
  ...D.infoBox('오늘의 핵심 3문장', [
    '① At first, people didn’t give {{her}} many likes. (본문)',
    '② Mom bought me a bike. = Mom bought a bike {{for}} me. (교과서 Grammar)',
    '③ I liked the hat, and she bought {{it for me}}. (bought me it ✗ · [05] 기출)'], m),
  ...D.tip(['칠판에 [사람] 상자와 [물건] 상자를 그리고, 4형식은 [동사][사람][물건] 순서, 3형식은 [동사][물건][전치사 + 사람] 순서로 상자를 옮겨 보이면 ‘전치사가 붙으면 사람이 뒤로 간다’를 한 번에 보여 줄 수 있다.',
    '같은 과 문법 비인칭 주어 it과 한 지문(본문 1~2단락)에서 함께 나오므로 PERFECT CHECK에 비인칭 it 2문항을 넣었다. 중1이라 Point 3(대명사 직접목적어 · 형식 구별)은 심화로 다룬다.'], m),

  // ---------------- Point 1 ----------------
  D.section('Point 1', '4형식 — 주어 + 수여동사 + 간접목적어(~에게) + 직접목적어(…을)', 'point'),
  ...D.table(['구성', '판단 기준 · 설명', '예'], [
    ['간접목적어', '‘~에게’ — 받는 사람(동물)', 'people didn’t give **her** many likes (본문) / Mike sent **me** a text message. (교과서)'],
    ['직접목적어', '‘…을/를’ — 주는 물건 · 정보', 'He always tells us **funny stories**. (교과서) / She made me **a nice dinner**. (교과서)'],
    ['어순', '간접목적어(사람) → 직접목적어(사물) 순서 고정', 'Mom bought **me a bike**. ○ / Mom bought **a bike me**. ✗'],
    ['대표 수여동사', 'give · send · show · tell · teach · bring · write · buy · make · cook · get · ask · lend · pass', 'Ann gave him a birthday present. / I wrote him a letter. (교과서 워크북)'],
    ['명령문 · 조동사', '동사가 맨 앞에 오거나 조동사 뒤에 와도 어순은 같다', '**Bring me** a coffee. / **Can you get me** some cold water? (워크북)'],
    ['목적어 1개 vs 2개', '‘~에게’가 없으면 수여동사도 3형식', 'She sent an email. (3형식) / She sent **her teacher** an email. (4형식)']], [2300, 3300, 4038], m),
  ...D.infoBox('3단계로 만들기', [
    '① 누가 · 무엇을 했나: {{Mom}} bought …',
    '② 받는 사람(간접목적어)을 동사 바로 뒤에: Mom bought {{me}} …',
    '③ 주는 물건(직접목적어)을 마지막에: Mom bought me {{a bike}}.'], m),
  ...D.trick('택배 이야기', ['택배 기사는 먼저 받는 사람 이름을 부르고(간접목적어)', '그다음에 상자를 건넨다(직접목적어)', 'Mom bought me a bike — 받는 사람 me, 상자 a bike']),
  ...D.examPoint([
    { q: 'At first, people didn’t give {{her many likes}}. (her / many likes 순서)', why: '본문 — 사람 먼저, 물건 나중 (give many likes her ✗)' },
    { q: 'Sumi sent {{Jiho}} text messages.', why: '교과서 Use It · [05] 기출 — sent text messages Jiho ✗' }], m),
  ...D.caution(['<조건> 6단어 영작([05] 기출): people didn’t give her many likes — like → likes(복수), didn’t give를 써야 6단어. 3형식(to her)으로 쓰면 7단어라 조건 위반.',
    '그림 보고 문장 완성(교과서 Use It · [05]): made Ms. Brown cookies / sent Jiho text messages / showed Lisa his pictures — 사람과 물건의 순서를 바꾼 오답이 단골이다.',
    '직접목적어 찾기(워크북 Warm-up): He gave a lot of flowers to her.처럼 3형식 문장에서도 직접목적어는 a lot of flowers — to her는 간접목적어가 아니다.',
    '4형식으로 쓸 수 없는 동사(explain · say · suggest)는 중1 범위를 넘어 Point 3에서 설명만 하고 4형식 문항으로는 내지 않았다.'], m),
  ...D.drill(1, '4형식 어순 — 간접목적어 + 직접목적어', [
    { level: 'Basic ①', type: 'choice', instr: '괄호 안에서 알맞은 것을 고르시오.', items: [
      { q: 'At first, people didn’t give (many likes her / her many likes).', a: 'her many likes', why: '본문 — 간접목적어 → 직접목적어' },
      { q: 'Mike sent (me a text message / a text message me).', a: 'me a text message', why: '교과서' },
      { q: 'He always tells (us funny stories / funny stories us).', a: 'us funny stories', why: '교과서' },
      { q: 'Mom bought (a bike me / me a bike).', a: 'me a bike', why: '교과서 Grammar' },
      { q: 'She made (a nice dinner me / me a nice dinner).', a: 'me a nice dinner', why: '교과서' },
      { q: 'Can you get (me some cold water / some cold water me)?', a: 'me some cold water', why: '워크북 — 조동사 의문문도 어순 같음' },
      { q: 'Sora (me gave a book / gave me a book).', a: 'gave me a book', why: '동사 바로 뒤에 간접목적어' },
      { q: 'Show (your office them / them your office).', a: 'them your office', why: '명령문 — 동사 + 간접목적어 + 직접목적어' },
      { q: 'The doctor gave (Sam a vision test / a vision test Sam).', a: 'Sam a vision test', why: '워크북 Part 4' },
      { q: 'Ted made (Ms. Brown cookies / cookies Ms. Brown).', a: 'Ms. Brown cookies', why: '교과서 Use It' }] },
    { level: 'Basic ②', type: 'fill', instr: '<보기>에서 알맞은 말을 골라 빈칸에 쓰시오. (한 번씩만 사용)',
      bogi: ['sent', 'bought', 'tells', 'lent', 'give', 'made', 'wrote', 'showed', 'teaches', 'brought'], items: [
      { q: 'At first, people didn’t [[give]] her many likes.', why: '본문' },
      { q: 'Sumi [[sent]] Jiho text messages yesterday.', why: '교과서 Use It' },
      { q: 'James [[showed]] Lisa his pictures.', why: '교과서 Use It' },
      { q: 'He always [[tells]] us funny stories.', why: '교과서 — 3인칭 단수 현재' },
      { q: 'Dad [[bought]] me the book last week.', why: '워크북' },
      { q: 'Ted [[made]] Ms. Brown cookies.', why: '교과서 Use It' },
      { q: 'Mr. Kim [[teaches]] us English every Monday.', why: '3인칭 단수 현재' },
      { q: 'My cousin [[brought]] us a lot of fruit.', why: '워크북 Part 4' },
      { q: 'I [[wrote]] him a letter last night.', why: '워크북' },
      { q: 'Tom [[lent]] Kevin his baseball cap.', why: '[05] 기출 — lend-lent' }] },
    { level: 'Intermediate', type: 'write', instr: '어법상 틀린 부분을 찾아 바르게 고쳐 쓰시오.', items: [
      { q: 'At first, people didn’t give many likes her.', a: 'many likes her → her many likes (또는 many likes to her)', why: '본문 — 4형식 어순' },
      { q: 'Sumi sent text messages Jiho.', a: 'text messages Jiho → Jiho text messages', why: '[05] 기출' },
      { q: 'She taught math us.', a: 'math us → us math (또는 math to us)', why: '워크북 Part 5' },
      { q: 'My grandma read many stories me.', a: 'many stories me → me many stories', why: '워크북 Part 5' },
      { q: 'He teaches English us.', a: 'English us → us English', why: '워크북 Part 5' },
      { q: 'Mom bought a bike me.', a: 'a bike me → me a bike', why: '교과서 Grammar' },
      { q: 'Show your picture Grandpa.', a: 'your picture Grandpa → Grandpa your picture', why: '명령문 4형식' },
      { q: 'Can you pass some ketchup me?', a: 'some ketchup me → me some ketchup', why: '워크북 Part 1' },
      { q: 'Sora me gave a book.', a: 'me gave → gave me', why: '동사 다음에 간접목적어' },
      { q: 'He gave a camera his sister.', a: 'a camera his sister → his sister a camera', why: '워크북 Part 3' }] },
    { level: 'Advanced · 모두 고르기', type: 'multi', free: true, instr: '해당하는 것을 모두 골라 기호를 쓰시오.', items: [
      { q: '다음 중 어법상 옳은 문장을 모두 고르시오.', box: [
        '(a) Mike sent a text message me.', '(b) She made me a nice dinner.', '(c) Can you get me some water?',
        '(d) He always tells funny stories us.', '(e) Show them your office.'], a: '(b), (c), (e)', why: '(a) me a text message (d) us funny stories' },
      { q: '밑줄 친 부분이 간접목적어(~에게)인 것을 모두 고르시오.', box: [
        '(a) My mother gave __me__ a doll.', '(b) He showed me __the ticket__.', '(c) Mr. Brown teaches __us__ English.',
        '(d) He gave a lot of flowers __to her__.', '(e) The doctor gave __Sam__ a vision test.'], a: '(a), (c), (e)', why: '(b) 직접목적어 (d) 3형식의 전치사구 — 간접목적어 아님 (워크북 Warm-up)' },
      { q: '다음 글의 밑줄 친 ⓐ~ⓔ 중 어법상 어색한 것을 모두 골라 기호를 쓰고 바르게 고치시오.', fix: true, label: '기호 / 고친 것', box: [
        'Last weekend, Minsu ⓐ __bought Peter a book__. Ted ⓑ __made cookies Ms. Brown__. Sumi ⓒ __sent Jiho text messages__. James ⓓ __showed his pictures Lisa__. Mom ⓔ __cooked us dinner__.'],
        a: 'ⓑ → made Ms. Brown cookies, ⓓ → showed Lisa his pictures', why: '교과서 Use It 변형 — 사람이 먼저' },
      { q: '다음 중 4형식 문장을 모두 고르시오.', box: [
        '(a) She sent an email.', '(b) She sent her teacher an email.', '(c) Goldilocks posted everyday things.',
        '(d) People didn’t give her many likes.', '(e) He gave a lot of flowers to her.'], a: '(b), (d)', why: '(a)(c) 목적어 1개 (e) 3형식(to her)' }] },
    { level: 'Advanced · 객관식', type: 'mcq', free: true, instr: '알맞은 답을 고르시오.', items: [
      { q: '다음 빈칸에 들어갈 말로 알맞은 것은? — Mom bought ______.', opts: [
        'a bike me', 'me to a bike', 'me a bike', 'to me a bike', 'a bike to me'], a: '③', why: '4형식 — 사람 + 물건 / ⑤ buy는 for' },
      { q: '다음 우리말을 바르게 영작한 것은? — Mike는 나에게 문자 메시지를 보냈다.', opts: [
        'Mike sent me a text message.', 'Mike sent a text message me.', 'Mike me sent a text message.',
        'Mike sent to me a text message.', 'Mike sent me to a text message.'], a: '①', why: '동사 + 간접목적어 + 직접목적어' },
      { q: '다음 중 어법상 어색한 문장은?', opts: [
        'He told us a story.', 'Dad bought me the book.', 'I wrote him a letter.', 'Ann gave him a present.', 'She showed her friends to the photos.'], a: '⑤', why: '⑤ showed her friends the photos (또는 showed the photos to her friends)' },
      { q: '다음 중 어법상 알맞은 문장의 개수는?', box: [
        '(a) Sora gave me a book.', '(b) He bought her a rose.', '(c) She made a doll me.', '(d) Bring me a coffee.', '(e) Sell them your car.'],
        opts: ['1개', '2개', '3개', '4개', '5개'], a: '④', why: '(c)만 ✗ → made me a doll (워크북 Warm-up)' },
      { q: '(A)~(C)에 알맞은 말이 바르게 짝지어진 것은? — Goldilocks showed (A)(her followers the selfies / the selfies her followers). / People didn’t give (B)(many likes her / her many likes). / Can you pass (C)(me the salt / the salt me)?', opts: [
        'the selfies her followers – her many likes – me the salt', 'her followers the selfies – her many likes – me the salt', 'her followers the selfies – many likes her – the salt me',
        'the selfies her followers – many likes her – me the salt', 'her followers the selfies – her many likes – the salt me'], a: '②', why: '모두 사람 → 물건 순서' }] },
    { level: '전환 · 영작', type: 'write', instr: '우리말과 같은 뜻이 되도록 괄호 안의 말을 이용하여 4형식 문장으로 영작하시오. (필요하면 형태를 바꿀 것)', items: [
      { q: '사람들은 그녀에게 ‘좋아요’를 많이 주지 않았다. (people, give, many likes)', a: 'People didn’t give her many likes.', why: '본문 · [05] 6단어 영작' },
      { q: 'Mike는 나에게 문자 메시지를 보냈다. (send, a text message)', a: 'Mike sent me a text message.', why: '교과서' },
      { q: '그는 항상 우리에게 재미있는 이야기를 해 준다. (always, tell, funny stories)', a: 'He always tells us funny stories.', why: '교과서' },
      { q: '그녀는 나에게 멋진 저녁 식사를 만들어 주었다. (make, a nice dinner)', a: 'She made me a nice dinner.', why: '교과서' },
      { q: '엄마가 나에게 자전거를 사 주셨다. (buy, a bike)', a: 'Mom bought me a bike.', why: '교과서' },
      { q: 'Ted는 Brown 부인에게 쿠키를 만들어 주었다. (make, cookies)', a: 'Ted made Ms. Brown cookies.', why: '교과서 Use It' },
      { q: '수미는 지호에게 문자 메시지들을 보냈다. (send, text messages)', a: 'Sumi sent Jiho text messages.', why: '교과서 Use It' },
      { q: 'James는 Lisa에게 자신의 사진들을 보여 주었다. (show, his pictures)', a: 'James showed Lisa his pictures.', why: '교과서 Use It' },
      { q: 'Brown 씨는 Kevin에게 야구 장갑을 가져다주었다. (bring, a baseball glove)', a: 'Mr. Brown brought Kevin a baseball glove.', why: '[05] 기출' },
      { q: '나에게 커피 한 잔을 가져다주세요. (bring, a coffee)', a: 'Bring me a coffee.', why: '워크북 — 명령문' }] },
  ], m),

  // ---------------- Point 2 ----------------
  D.section('Point 2', '4형식 → 3형식 전환 — 직접목적어 + to · for · of + 간접목적어', 'point'),
  ...D.table(['구성', '판단 기준 · 설명', '예'], [
    ['3형식 어순', '주어 + 동사 + 직접목적어(물건) + 전치사 + 간접목적어(사람)', 'people didn’t give many likes **to** her (본문 전환)'],
    ['to를 쓰는 동사', '상대에게 ‘건네는’ 동작: give · send · show · tell · teach · bring · write · sell · lend · pass', 'He teaches history **to** us. / Sumi sent text messages **to** Jiho.'],
    ['for를 쓰는 동사', '상대를 ‘위해’ 해 주는 동작: make · buy · cook · get', 'Let’s buy a toy **for** him. / Lily made a cake **for** me.'],
    ['of를 쓰는 동사', '‘묻다’ ask (+ a question · a favor)', 'Some students asked a question **of** him. / May I ask a favor **of** you?'],
    ['4형식 ↔ 3형식', '뜻은 같고 어순만 다르다 — 전치사가 붙으면 사람이 뒤로', 'Mom bought me a bike. = Mom bought a bike **for** me.'],
    ['자주 틀리는 것', 'make · buy에 to ✗ / give · send에 for ✗ / ask에 to ✗', 'made an apple pie to Tom ✗ → **for** Tom / sent a letter for me ✗ → **to** me']], [2300, 3300, 4038], m),
  ...D.infoBox('바꾸는 3단계', [
    '① 물건(직접목적어)을 동사 바로 뒤로: Mom bought {{a bike}} …',
    '② 동사에 맞는 전치사 고르기: buy → {{for}}',
    '③ 사람(간접목적어)을 맨 뒤로: Mom bought a bike for {{me}}.'], m),
  ...D.trick('엄마의 부엌 이야기 — for 동사 4개', ['엄마는 나를 위해(for) 장을 봐서 사 오고(buy)', '필요한 재료를 구해 와(get) 요리하고(cook) 케이크를 만든다(make)', '나머지 ‘건네는’ 동사는 to, 질문하는 ask만 of']),
  ...D.examPoint([
    { q: 'People didn’t give many likes {{to}} her.', why: '본문 전환 — give → to' },
    { q: 'His mom made an apple pie {{for}} Tom.', why: '워크북 Part 5 · [05] — make → for (to ✗)' }], m),
  ...D.caution(['[05] 기출 그림 문제: Ted made chocolate cookies of Ms. Brown ✗(→ for) / Sumi sent text messages Jiho ✗(→ to Jiho) — 전치사 고르기와 어순을 함께 묻는다.',
    '표 보고 문장 완성([05] 기출): Dad got new sneakers for Kevin / Tom lent Kevin his baseball cap / Mr. Brown brought Kevin a baseball glove — get은 for, lend · bring은 to.',
    'ask는 of: ask a question of ~ · ask a favor of ~ 형태로만 낸다. ask a question to ~는 오답 처리.',
    'read · pass · hand · lend · sell · take도 to를 쓰는 동사로 워크북에 나온다(Read me the email → Read the email to me).'], m),
  ...D.drill(2, '3형식 전환 — to · for · of', [
    { level: 'Basic ①', type: 'choice', instr: '괄호 안에서 알맞은 전치사를 고르시오.', items: [
      { q: 'People didn’t give many likes (to / for) her.', a: 'to', why: '본문 — give → to' },
      { q: 'Let’s buy a toy (to / for) him.', a: 'for', why: 'buy → for' },
      { q: 'He teaches history (for / to) us.', a: 'to', why: 'teach → to' },
      { q: 'Some students asked a question (of / to) him.', a: 'of', why: 'ask → of' },
      { q: 'Lily made a cake (for / of) me.', a: 'for', why: 'make → for' },
      { q: 'I’ll bring some grapes (for / to) you.', a: 'to', why: 'bring → to' },
      { q: 'She cooked pizza (for / to) her children.', a: 'for', why: 'cook → for' },
      { q: 'Can I ask a favor (of / for) you?', a: 'of', why: 'ask a favor of' },
      { q: 'Please pass the salt (for / to) me.', a: 'to', why: 'pass → to' },
      { q: 'I’ll get a glass of warm milk (to / for) you.', a: 'for', why: 'get → for' }] },
    { level: 'Basic ②', type: 'fill', instr: '두 문장의 뜻이 같도록 <보기>에서 알맞은 말을 골라 빈칸에 쓰시오. (한 번씩만 사용)',
      bogi: ['history', 'of', 'them', 'Show', 'to', 'sick man', 'you', 'for', 'Ms. Brown', 'sent'], items: [
      { q: 'People didn’t give her many likes. = People didn’t give many likes [[to]] her.', why: '본문' },
      { q: 'Mom bought me a bike. = Mom bought a bike [[for]] me.', why: '교과서' },
      { q: 'Some students asked him a question. = Some students asked a question [[of]] him.', why: '교과서 Grammar Point' },
      { q: 'He teaches us history. = He teaches [[history]] to us.', why: '직접목적어를 동사 뒤로' },
      { q: 'Let me make you some tea. = Let me make some tea for [[you]].', why: '워크북 Part 3' },
      { q: 'Sumi sent Jiho text messages. = Sumi [[sent]] text messages to Jiho.', why: '교과서 Use It' },
      { q: 'Ted made Ms. Brown cookies. = Ted made cookies for [[Ms. Brown]].', why: '교과서 Use It' },
      { q: 'Show Grandpa your picture. = [[Show]] your picture to Grandpa.', why: '워크북 Part 3' },
      { q: 'She cooked them a good dinner. = She cooked a good dinner for [[them]].', why: '워크북 Part 3' },
      { q: 'He brought the sick man some flowers. = He brought some flowers to the [[sick man]].', why: '워크북 Part 3' }] },
    { level: 'Intermediate', type: 'write', instr: '어법상 틀린 부분을 찾아 바르게 고쳐 쓰시오.', items: [
      { q: 'He sent a letter for me.', a: 'for → to', why: '워크북 Part 5 — send → to' },
      { q: 'His mom made an apple pie to Tom.', a: 'to → for', why: '워크북 Part 5 — make → for' },
      { q: 'Lily made a cake of me.', a: 'of → for', why: 'make → for' },
      { q: 'He asked a question to me.', a: 'to → of', why: 'ask → of' },
      { q: 'She cooked pasta to her children.', a: 'to → for', why: 'cook → for' },
      { q: 'I will lend some money for you.', a: 'for → to', why: 'lend → to' },
      { q: 'Dad bought new shoes to me.', a: 'to → for', why: 'buy → for' },
      { q: 'He showed one of his stories for an editor.', a: 'for → to', why: '워크북 Part 5 — show → to' },
      { q: 'She told a funny story for us.', a: 'for → to', why: 'tell → to' },
      { q: 'They got a ticket to me.', a: 'to → for', why: 'get → for' }] },
    { level: 'Advanced · 모두 고르기', type: 'multi', free: true, instr: '해당하는 것을 모두 골라 기호를 쓰시오.', items: [
      { q: '빈칸에 to가 들어가는 것을 모두 고르시오.', box: [
        '(a) Give a big kiss ______ him.', '(b) My uncle made a big chair ______ me.', '(c) I sent the book ______ Tommy.',
        '(d) Kate will buy a bag ______ you.', '(e) You taught a good lesson ______ me.'], a: '(a), (c), (e)', why: '(b) (d) for (워크북 Part 2)' },
      { q: '두 문장의 의미가 같은 것을 모두 고르시오.', box: [
        '(a) He sent her a present. = He sent a present for her.', '(b) Mom made me a dress. = Mom made a dress for me.',
        '(c) She cooked him meals. = She cooked meals to him.', '(d) May I ask you a favor? = May I ask a favor of you?',
        '(e) Show the children the picture. = Show the picture to the children.'], a: '(b), (d), (e)', why: '(a) to her (c) for him' },
      { q: '다음 글의 밑줄 친 ⓐ~ⓔ 중 어법상 어색한 것을 모두 골라 기호를 쓰고 바르게 고치시오.', fix: true, label: '기호 / 고친 것', box: [
        'Kevin joined a baseball team. Dad ⓐ __got new sneakers to Kevin__. Tom ⓑ __lent Kevin his baseball cap__. Mr. Brown ⓒ __brought a baseball glove for Kevin__. Grandma ⓓ __bought Kevin a bat__. His coach ⓔ __asked a question of Kevin__.'],
        a: 'ⓐ → got new sneakers for Kevin, ⓒ → brought a baseball glove to Kevin', why: '[05] 기출 표 문제 변형 — get → for · bring → to' },
      { q: '3형식으로 바꿀 때 전치사 for가 필요한 문장을 모두 고르시오.', box: [
        '(a) Mom cooks us nice meals every day.', '(b) He gave his sister a camera.', '(c) Let me get you some coffee.',
        '(d) She told me a story.', '(e) He handed the driver a street map.'], a: '(a), (c)', why: 'cook · get → for / (b)(d)(e) → to' }] },
    { level: 'Advanced · 객관식', type: 'mcq', free: true, instr: '알맞은 답을 고르시오.', items: [
      { q: '다음 빈칸에 들어갈 말이 나머지 넷과 다른 것은?', opts: [
        'I sent the book ____ Tommy.', 'My uncle made a big chair ____ me.', 'Please pass the salt ____ me.', 'You taught a good lesson ____ me.', 'Give the medicine ____ me.'], a: '②', why: '② for · 나머지 to (워크북 Part 2)' },
      { q: '다음 문장을 3형식으로 바르게 바꾼 것은? — She asked me my name.', opts: [
        'She asked my name to me.', 'She asked my name for me.', 'She asked me of my name.', 'She asked to me my name.', 'She asked my name of me.'], a: '⑤', why: 'ask → of (워크북 Part 2 She asked their names of the children.)' },
      { q: '다음 중 어법상 어색한 문장은?', opts: [
        'He made an apple pie to Tom.', 'She sent a postcard to me.', 'Mom cooked some pasta for us.', 'Tom brought a sandwich to me.', 'Let’s buy a toy for him.'], a: '①', why: '① make → for' },
      { q: '다음 중 두 문장의 의미가 같지 않은 것은?', opts: [
        'He sent her a present. = He sent a present to her.', 'I gave my wife some flowers. = I gave some flowers to my wife.', 'She made us some cookies. = She made some cookies for us.',
        'He teaches them English. = He teaches English for them.', 'Mom made me a dress. = Mom made a dress for me.'], a: '④', why: '④ teach → to' },
      { q: '(A)~(C)에 들어갈 전치사가 바르게 짝지어진 것은? — Dad got new sneakers (A)____ Kevin. / Tom lent his cap (B)____ Kevin. / Kevin asked a question (C)____ the coach.', opts: [
        'to – to – of', 'for – for – of', 'for – to – of', 'to – for – to', 'for – to – to'], a: '③', why: 'get → for / lend → to / ask → of' }] },
    { level: '전환 · 영작', type: 'write', instr: '괄호 안의 지시대로 같은 뜻의 문장으로 바꾸어 쓰시오.', items: [
      { q: 'People didn’t give her many likes. (3형식으로)', a: 'People didn’t give many likes to her.', why: '본문 — give → to' },
      { q: 'Mom bought me a bike. (3형식으로)', a: 'Mom bought a bike for me.', why: 'buy → for' },
      { q: 'Some students asked him a question. (3형식으로)', a: 'Some students asked a question of him.', why: 'ask → of' },
      { q: 'He teaches adults German. (3형식으로)', a: 'He teaches German to adults.', why: '워크북 Part 3' },
      { q: 'She cooked them a good dinner every night. (3형식으로)', a: 'She cooked a good dinner for them every night.', why: '워크북 Part 3 — 시간 부사는 맨 뒤' },
      { q: 'Let me make some tea for you. (4형식으로)', a: 'Let me make you some tea.', why: '워크북 Part 3' },
      { q: 'Could you send the bill to me? (4형식으로)', a: 'Could you send me the bill?', why: '워크북 Part 3' },
      { q: 'I took the report to Mr. Black. (4형식으로)', a: 'I took Mr. Black the report.', why: '워크북 Part 3' },
      { q: 'He bought a new camera for me. (4형식으로)', a: 'He bought me a new camera.', why: '워크북 Part 3' },
      { q: 'Goldilocks showed her selfies to her followers. (4형식으로)', a: 'Goldilocks showed her followers her selfies.', why: '본문 소재' }] },
  ], m),

  // ---------------- Point 3 ----------------
  D.section('Point 3', '(심화) 직접목적어가 대명사일 때 · 문장 형식 구별', 'point'),
  ...D.table(['구성', '판단 기준 · 설명', '예'], [
    ['직접목적어가 대명사', 'it · them이 ‘…을’ 자리에 오면 4형식 ✗ → 3형식만', 'She sent him it ✗ → She sent **it to him** ○ / I liked the hat, and she bought **it for me**. ([05])'],
    ['간접목적어가 대명사', '사람 쪽이 대명사인 것은 괜찮다', 'Mom bought **me** a bike. ○ / He told **us** funny stories. ○'],
    ['목적어가 하나인 문장', '‘~에게’가 없으면 3형식 (수여동사도 마찬가지)', 'Goldilocks **posted** everyday things. / She **sent** an email.'],
    ['to + 사람 ≠ 간접목적어', '3형식의 to her · for me는 전치사구(목적어 아님)', 'He gave a lot of flowers **to her**. — 직접목적어는 a lot of flowers (워크북)'],
    ['4형식으로 못 쓰는 동사', 'explain · say · suggest는 to + 사람만 (중1 참고)', 'He explained the rule **to us**. (explained us the rule ✗)'],
    ['문장 형식 구별', '동사 뒤 목적어 수로 판단: 없음(1·2형식) · 1개(3형식) · 2개(4형식)', 'Goldilocks was happy.(2) / She posted funny pictures.(3) / People didn’t give her many likes.(4)']], [2300, 3300, 4038], m),
  ...D.infoBox('형식 판별 3단계', [
    '① 동사 찾기: People didn’t {{give}} …',
    '② 동사 뒤 명사(목적어) 개수 세기: her / many likes → {{2}}개',
    '③ ‘~에게’ + ‘…을’ 두 개면 {{4형식}}, ‘…을’ 하나면 3형식'], m),
  ...D.trick('it은 먼저 나간다', ['이미 아는 물건 it은 포장 없이 바로 건넨다', '그래서 it이 동사 바로 뒤에 서고', '받는 사람은 to · for를 데리고 뒤에 선다: sent it to him']),
  ...D.examPoint([
    { q: 'I liked the hat, and she bought {{it for me}}.', why: '[05] 기출 — bought me it ✗' },
    { q: 'He gave a lot of flowers to her. — 직접목적어: {{a lot of flowers}}', why: '워크북 Warm-up — to her는 간접목적어 아님' }], m),
  ...D.caution(['[05] ‘어법상 어색한 문장의 개수’: bought me it ✗ · wrote to us Christmas cards ✗ — 대명사 직접목적어와 전치사 위치를 함께 묻는다(It was already light ~ · It will be rainy ~ 같은 비인칭 문장과 섞임).',
    'send you them ✗ → send them to you (워크북 Part 5) · My parents sent me it ✗ → sent it to me',
    '형식 구별은 중1 범위에서 1~4형식만 다룬다(5형식은 중2). explain · say는 설명만 하고 출제는 하지 않는다.'], m),
  ...D.drill(3, '대명사 직접목적어 · 형식 구별', [
    { level: 'Basic ①', type: 'choice', instr: '괄호 안에서 알맞은 것을 고르시오.', items: [
      { q: 'She sent (it to him / him it).', a: 'it to him', why: '대명사 직접목적어 → 3형식' },
      { q: 'I liked the hat, and she bought (it for me / me it).', a: 'it for me', why: '[05] 기출' },
      { q: 'Mom bought (a bike me / me a bike).', a: 'me a bike', why: '간접목적어가 대명사인 것은 ○' },
      { q: 'I will take some pictures and send (you them / them to you).', a: 'them to you', why: '워크북 Part 5' },
      { q: 'My parents sent (it to me / me it).', a: 'it to me', why: '워크북 Part 5' },
      { q: 'Here is your book. I’ll give (you it / it to you).', a: 'it to you', why: '대명사 직접목적어' },
      { q: 'He told (to us funny stories / us funny stories).', a: 'us funny stories', why: '4형식 — 간접목적어 앞에 전치사 ✗' },
      { q: 'He explained the rule (to us / us).', a: 'to us', why: 'explain은 4형식 ✗' },
      { q: 'These are my old shoes. I’ll give (them to my brother / my brother them).', a: 'them to my brother', why: '대명사 직접목적어' },
      { q: 'Can you pass (it me / it to me)?', a: 'it to me', why: '대명사 직접목적어' }] },
    { level: 'Basic ②', type: 'fill', instr: '<보기>에서 알맞은 말을 골라 빈칸에 쓰시오. (한 번씩만 사용)',
      bogi: ['us', 'for', 'the salt', 'them', 'her', 'to', 'of', 'me', 'him', 'it'], items: [
      { q: 'This is my new bike. Dad bought [[it]] for me.', why: '대명사 직접목적어 → 3형식' },
      { q: 'I took some pictures and sent [[them]] to my friends.', why: '대명사 직접목적어' },
      { q: 'Here is your umbrella. I’ll give it [[to]] you.', why: 'give → to' },
      { q: 'I liked the hat, and Mom bought it [[for]] me.', why: 'buy → for' },
      { q: 'Mike sent [[me]] a text message.', why: '간접목적어(대명사 ○)' },
      { q: 'He always tells [[us]] funny stories.', why: '간접목적어' },
      { q: 'At first, people didn’t give [[her]] many likes.', why: '본문' },
      { q: 'May I ask a favor [[of]] you?', why: 'ask → of' },
      { q: 'Ann gave [[him]] a birthday present.', why: '간접목적어' },
      { q: 'Please pass me [[the salt]].', why: '직접목적어(명사)' }] },
    { level: 'Intermediate', type: 'write', instr: '어법상 틀린 부분을 찾아 바르게 고쳐 쓰시오.', items: [
      { q: 'She sent him it.', a: 'him it → it to him', why: '대명사 직접목적어 → 3형식' },
      { q: 'I liked the hat, and she bought me it.', a: 'me it → it for me', why: '[05] 기출' },
      { q: 'My parents sent me it.', a: 'me it → it to me', why: '워크북 Part 5' },
      { q: 'I will take some pictures and send you them.', a: 'you them → them to you', why: '워크북 Part 5' },
      { q: 'Here is the letter. Please give me it.', a: 'me it → it to me', why: '대명사 직접목적어' },
      { q: 'He explained us the rule.', a: 'explained us the rule → explained the rule to us', why: 'explain은 4형식 ✗' },
      { q: 'This cake is for you. I made you it.', a: 'you it → it for you', why: 'make → for' },
      { q: 'The teacher wrote to us Christmas cards.', a: 'to us Christmas cards → us Christmas cards (또는 Christmas cards to us)', why: '[05] 기출 — 4형식 간접목적어 앞 전치사 ✗' },
      { q: 'Kathy left her little sister to a message.', a: 'her little sister to a message → her little sister a message', why: '워크북 Part 5' },
      { q: 'Tommy sold his neighbor to his car.', a: 'his neighbor to his car → his neighbor his car (또는 his car to his neighbor)', why: '워크북 Part 5' }] },
    { level: 'Advanced · 모두 고르기', type: 'multi', free: true, instr: '해당하는 것을 모두 골라 기호를 쓰시오.', items: [
      { q: '다음 중 어법상 옳은 문장을 모두 고르시오.', box: [
        '(a) He sent me it.', '(b) She bought it for me.', '(c) The teacher wrote to us Christmas cards.',
        '(d) They got me a ticket for the concert.', '(e) I liked the hat, and she bought me it.'], a: '(b), (d)', why: '(a) it to me (c) us Christmas cards (e) it for me ([05] 기출)' },
      { q: '다음 중 4형식 문장을 모두 고르시오.', box: [
        '(a) People didn’t give her many likes.', '(b) Goldilocks posted everyday things.', '(c) She sent it to him.',
        '(d) Goldilocks was happy.', '(e) Mom cooked us some pasta.'], a: '(a), (e)', why: '(b)(c) 3형식 (d) 2형식' },
      { q: '다음 글의 밑줄 친 ⓐ~ⓔ 중 어법상 어색한 것을 모두 골라 기호를 쓰고 바르게 고치시오.', fix: true, label: '기호 / 고친 것', box: [
        'Yesterday was my birthday. My mom ⓐ __made me a cake__. My dad bought a new watch and ⓑ __gave me it__. My friend Mina ⓒ __sent a card to me__. My brother ⓓ __showed me a funny video__. I took pictures and ⓔ __sent my friends them__.'],
        a: 'ⓑ → gave it to me, ⓔ → sent them to my friends', why: '대명사 직접목적어 → 3형식' },
      { q: '밑줄 친 부분이 직접목적어(…을)인 것을 모두 고르시오.', box: [
        '(a) He showed me __the ticket__.', '(b) Mr. Brown teaches __us__ English.', '(c) He gave __a lot of flowers__ to her.',
        '(d) I will give you __fun and useful homework__.', '(e) My father gave __me__ a camera.'], a: '(a), (c), (d)', why: '(b)(e) 간접목적어 (워크북 Warm-up)' }] },
    { level: 'Advanced · 객관식', type: 'mcq', free: true, instr: '알맞은 답을 고르시오.', items: [
      { q: '다음 빈칸에 들어갈 말로 알맞은 것은? — I liked the hat, and she bought ______.', opts: [
        'me it', 'it me', 'for me it', 'it for me', 'me for it'], a: '④', why: '[05] 기출 — 대명사 직접목적어 → it for me' },
      { q: '다음 중 어법상 올바른 문장은?', opts: [
        'She sent him it.', 'I took some pictures and sent them to you.', 'He explained us the rule.', 'The teacher wrote to us cards.', 'My parents sent me it.'], a: '②', why: '① ⑤ 대명사 직접목적어 4형식 ✗ ③ explain ✗ ④ to 삭제' },
      { q: '다음 중 문장의 형식이 나머지 넷과 다른 것은?', opts: [
        'Mike sent me a text message.', 'He always tells us funny stories.', 'She made me a nice dinner.', 'Mom bought me a bike.', 'Goldilocks posted all the selfies on social media.'], a: '⑤', why: '⑤ 3형식 · 나머지 4형식' },
      { q: '다음 중 어법상 어색한 문장의 개수는?', box: [
        '(a) They got me a ticket.', '(b) It was already light when I woke up.', '(c) I liked the hat, and she bought me it.',
        '(d) The teacher wrote us Christmas cards.', '(e) It will be rainy this afternoon.'], opts: ['1개', '2개', '3개', '4개', '5개'], a: '①', why: '(c)만 ✗ → it for me ([05] 기출 변형)' },
      { q: '다음 대화의 빈칸에 들어갈 말로 알맞은 것은? — A: Where is my umbrella? B: I gave ______ yesterday.', opts: [
        'your brother it', 'it your brother', 'it to your brother', 'to your brother it', 'it for your brother'], a: '③', why: '대명사 직접목적어 + give → to' }] },
    { level: '전환 · 영작', type: 'write', instr: '괄호 안의 지시대로 쓰시오.', items: [
      { q: 'She sent him it. (어법에 맞게 고쳐 쓸 것)', a: 'She sent it to him.', why: '대명사 직접목적어' },
      { q: '그녀는 그것을 나에게 사 주었다. (it, buy)', a: 'She bought it for me.', why: 'buy → for' },
      { q: '나는 사진을 찍어서 그것들을 너에게 보낼게. (take some pictures, send, them)', a: 'I will take some pictures and send them to you.', why: '워크북 Part 5' },
      { q: '이건 내 오래된 자전거야. 나는 그것을 내 남동생에게 줄 거야. (give, my brother)', a: 'I will give it to my brother.', why: '대명사 직접목적어' },
      { q: '그는 우리에게 그 규칙을 설명했다. (explain, the rule)', a: 'He explained the rule to us.', why: 'explain → to (4형식 ✗)' },
      { q: 'Mom cooked us some pasta. (3형식으로)', a: 'Mom cooked some pasta for us.', why: 'cook → for' },
      { q: '사람들은 그녀에게 많은 ‘좋아요’를 주었다. (4형식 · give, many likes)', a: 'People gave her many likes.', why: '본문 변형' },
      { q: 'Lily made a cake for me. (4형식으로)', a: 'Lily made me a cake.', why: '교과서 Grammar✚' },
      { q: 'Tom brought me a sandwich. (3형식으로)', a: 'Tom brought a sandwich to me.', why: '교과서 Grammar✚' },
      { q: '그 선생님은 우리에게 크리스마스카드를 썼다. (4형식 · write, Christmas cards)', a: 'The teacher wrote us Christmas cards.', why: '[05] 기출 변형' }] },
  ], m),

  // ---------------- PERFECT CHECK ----------------
  D.section('PERFECT CHECK', '상위권 함정 체크'),
  ...D.drill(null, '', [{ level: '함정', type: 'choice', instr: '실수하기 쉬운 문장들이에요. 괄호 안에서 알맞은 것을 고르시오.', items: [
    { q: 'At first, people didn’t give (many likes her / her many likes).', a: 'her many likes', why: '본문 — 4형식 어순' },
    { q: 'Ted made chocolate cookies (of / for) Ms. Brown.', a: 'for', why: '[05] 기출 — make → for' },
    { q: 'Sumi sent text messages (to Jiho / Jiho).', a: 'to Jiho', why: '[05] 기출 — 3형식은 전치사 필요' },
    { q: 'I liked the hat, and she bought (it for me / me it).', a: 'it for me', why: '[05] 기출 — 대명사 직접목적어' },
    { q: 'Some students asked a question (to / of) him.', a: 'of', why: 'ask → of' },
    { q: 'The teacher wrote (us / to us) Christmas cards.', a: 'us', why: '[05] 기출 — 4형식 간접목적어 앞 전치사 ✗' },
    { q: 'Tom lent (Kevin his baseball cap / his baseball cap Kevin).', a: 'Kevin his baseball cap', why: '[05] 기출 — lend-lent' },
    { q: 'I will take some pictures and send (you them / them to you).', a: 'them to you', why: '워크북 Part 5' },
    { q: '(This / It) was getting dark, and it started to rain.', a: 'It', why: '본문 — 비인칭 주어(같은 과 문법)' },
    { q: '(It / That) is 5 kilometers to the airport.', a: 'It', why: '[05] — 거리의 비인칭 주어(같은 과 문법)' }] }], m),

  // ---------------- WRITE ----------------
  D.section('WRITE', '서술형 대비'),
  ...D.writeItem(1, 'Basic', '괄호 안의 단어를 바르게 배열하시오.', ['At first, she posted everyday things, but people didn’t ( her / give / many likes ). (본문)'], { a: 'give her many likes', why: '동사 + 간접목적어 + 직접목적어' }, m),
  ...D.writeItem(2, 'Basic', '빈칸에 알맞은 전치사를 쓰시오.', ['(1) Dad got new sneakers ______ Kevin.  (2) Tom lent his baseball cap ______ Kevin. ([05] 변형)'], { a: '(1) for  (2) to', why: 'get → for / lend → to', blanks: ['(1)', '(2)'] }, m),
  ...D.writeItem(3, 'Intermediate', '전치사를 사용한 3형식 문장으로 바꾸어 쓰시오. [문장 전환]', ['At first, people didn’t give her many likes. (본문)'], { a: 'At first, people didn’t give many likes to her.', why: 'give → to · 직접목적어를 동사 뒤로' }, m),
  ...D.writeItem(4, 'Intermediate', '전치사를 사용한 3형식 문장으로 바꾸어 쓰시오. [문장 전환]', ['Mom cooked us some pasta. (교과서 Grammar✚)'], { a: 'Mom cooked some pasta for us.', why: 'cook → for' }, m),
  ...D.writeItem(5, 'Intermediate', '4형식 문장으로 바꾸어 쓰시오. [문장 전환]', ['May I ask a favor of you?'], { a: 'May I ask you a favor?', why: 'of 삭제 · 간접목적어 you를 동사 뒤로' }, m),
  ...D.writeItem(6, 'Intermediate', '4형식 문장으로 바꾸어 쓰시오. [문장 전환]', ['Goldilocks showed all the selfies to her followers.'], { a: 'Goldilocks showed her followers all the selfies.', why: 'to 삭제 · 사람 → 물건' }, m),
  ...D.writeItem(7, 'Advanced', '우리말과 같은 뜻이 되도록 <조건>에 맞게 영작하시오.', ['사람들은 그녀에게 ‘좋아요’를 많이 주지 않았다.', '<조건> like, give, many를 사용할 것(필요시 형태 변화) · 6단어로 쓸 것'],
    { a: 'People didn’t give her many likes.', why: '[05] 기출 — 4형식(3형식은 7단어) · likes 복수' }, m),
  ...D.writeItem(8, 'Advanced', '표를 보고 문장을 완성하시오. (과거형으로 쓸 것)', ['Dad – get – new sneakers / Tom – lend – his baseball cap / Mr. Brown – bring – a baseball glove (받는 사람: Kevin)',
    '(1) Dad got new sneakers ______________.   (2) Tom ______________.   (3) Mr. Brown ______________.  ※ (2)(3)은 4형식으로'],
    { a: '(1) for Kevin  (2) lent Kevin his baseball cap  (3) brought Kevin a baseball glove', why: '[05] 기출 — get → for · lend-lent · bring-brought', blanks: ['(1)', '(2)', '(3)'] }, m),
  ...D.writeItem(9, 'Advanced', '어법상 틀린 부분 2개를 찾아 바르게 고치고, 그 이유를 쓰시오.', ['I liked the hat, and she bought me it. The teacher wrote to us Christmas cards.'],
    { a: '① bought me it → bought it for me  ② wrote to us Christmas cards → wrote us Christmas cards (또는 wrote Christmas cards to us)', why: '① 직접목적어가 대명사이면 4형식 ✗ → 3형식(buy는 for) ② 4형식의 간접목적어 앞에는 전치사를 쓰지 않는다', blanks: ['고친 것', '이유'] }, m),
  ...D.writeItem(10, 'Advanced', '어법상 틀린 부분 2개를 찾아 바르게 고치고, 그 이유를 쓰시오.', ['Ted made chocolate cookies of Ms. Brown. Sumi sent text messages Jiho.'],
    { a: '① of → for  ② text messages Jiho → Jiho text messages (또는 text messages to Jiho)', why: '① make는 3형식에서 for ② 4형식은 사람 → 물건, 3형식이면 사람 앞에 to ([05] 기출)', blanks: ['고친 것', '이유'] }, m),

  // ---------------- MAP ----------------
  D.pageBreak(), // MAP 이미지가 쪽 끝에서 잘리지 않도록 새 쪽에서 시작
  D.section('MAP', "DAVID'S MAP — 백지노트 테스트"),
  D.P([D.T('오늘 배운 내용을 떠올리며 빈칸을 채워 보세요. 책을 보지 않고!', { size: 18, color: '595959' })], { spacing: { after: 120 }, keepNext: true }),
  ...D.image(path.join(__dirname, 'map_G-수여동사_중1.png'), 620),
  ...D.table(['자가 체크 — 백지노트에 이 단어들이 들어갔나요?', '✔'], [
    ['4형식: 주어 + 수여동사 + 간접목적어(~에게) + 직접목적어(…을)', ''], ['사람 먼저, 물건 나중: give her many likes (many likes her ✗)', ''],
    ['3형식: 주어 + 동사 + 직접목적어 + 전치사 + 간접목적어', ''], ['to: give · send · show · tell · teach · bring · write · sell · lend · pass', ''],
    ['for: make · buy · cook · get / of: ask', ''], ['직접목적어가 it · them이면 3형식만: bought it for me (bought me it ✗)', ''],
    ['4형식의 간접목적어 앞에는 전치사 ✗: wrote us cards (wrote to us cards ✗)', ''], ['목적어 수로 형식 구별: 1개 = 3형식 · 2개 = 4형식', ''],
    ['3형식의 to her · for me는 간접목적어가 아니다(전치사구)', ''],
    ['본문: people didn’t give her many likes = didn’t give many likes to her', '']], [8838, 800], m),
  ...D.memo(['다음 시간 도입: 칠판에 Mom bought me a bike.를 쓰고 학생이 직접 3형식으로 바꾸게 한 뒤, give · make · ask를 넣어 전치사가 어떻게 달라지는지 말하게 하기',
    '약한 반: Point 1(사람 → 물건 어순) 확실히 → Point 2는 to / for 두 가지만(ask-of는 한 문장으로) → Point 3은 bought it for me 하나만',
    '비인칭 주어 it(같은 과 문법)과 섞인 [05] ‘어법상 어색한 문장의 개수’ 문항 다시 풀기 — 수여동사 문장과 비인칭 문장을 먼저 구별하게 한다.',
    '교과서 Use It: 지난 주말에 가족·친구에게 해 준 일을 4형식 · 3형식으로 한 문장씩 말하고 짝과 서로 어법 점검'], m),
];
D.render(meta, build, process.argv[2] || '.').then(fs_ => {
  console.log(fs_.join('\n'));
});
