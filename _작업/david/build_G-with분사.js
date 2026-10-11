const D0 = require('./david_base');
const path = require('path');
const fs = require('fs');
// 한 문장에 빈칸 ______ 이 두 개 이상이면 david_base의 __밑줄__ 서식으로 잘못 읽히므로
// 밑줄 3개 이상 이어진 빈칸은 밑줄 사이에 U+200B를 넣어 둔다 (sothat · 부정대명사 스크립트와 같은 처리).
const ZB = (s) => s.replace(/_{3,}/g, (u) => u.split('').join('​'));
const deep = (v) => typeof v === 'string' ? ZB(v) : Array.isArray(v) ? v.map(deep)
  : (v && typeof v === 'object' && v.constructor === Object) ? Object.fromEntries(Object.entries(v).map(([k, x]) => [k, deep(x)])) : v;
const D = new Proxy(D0, { get: (t, k) => (typeof t[k] === 'function' && !['render', 'P', 'T', 'image'].includes(k)) ? (...a) => t[k](...deep(a)) : t[k] });
const COVER = JSON.parse(process.env.COVER || '{}');
const TITLE = 'with + 명사 + 분사';
const meta = { series: D.SERIES.G, code: 'G-with분사', title: TITLE, category: 'G. 분사  |  부대상황 with + 명사 + 분사 (형용사 · 부사 · 전치사구)',
  rightText: 'G  with + 명사 + 분사', prefix: process.env.PREFIX || '', cover: COVER.title ? COVER : undefined,
  question: 'Wormholes may contain two mouths, with a throat ~~connecting~~ the two. / Fold it with the dots ~~matched~~ up. — 둘 다 ‘with + 명사 + 분사’인데, 왜 하나는 -ing이고 하나는 -ed일까?' };

const build = (m) => [
  D.section('FLOW', 'Teaching Flow — 처음 배우는 사람도 따라오는 5단계'),
  ...D.step(1, '우리말로 먼저 생각하기 — ‘~한 채로, ~하면서’', [
    '‘그는 팔짱을 낀 채로 서 있었다.’ — 서 있는 동작과 팔짱을 낀 상태가 {{동시에}} 일어난다(부대상황).',
    '우리말은 ‘~한 채로, ~하면서’를 붙이면 끝이지만, 영어는 {{with}} + 명사(팔) + 그 명사의 상태(낀)로 나타낸다.'], m),
  ...D.step(2, '이전 단원 복습 — 현재분사 · 과거분사', [
    'a **sleeping** baby (자고 있는 아기) → 명사가 직접 하는 능동 = {{현재분사}}',
    'a **broken** leg (부러진 다리) → 명사가 당하는 수동 = {{과거분사}}'], m),
  ...D.step(3, '문제 제기 — 같은 with인데 왜 모양이 다를까?', [
    'Wormholes may contain two mouths, with a throat **connecting** the two. (본문)',
    'Take the paper and fold it with the dots **matched** up. (본문) — 무엇을 보고 -ing와 -ed를 고를까?'], m),
  ...D.step(4, '규칙 발견 — with 뒤 명사에게 물어보기', [
    '목구멍(a throat)이 둘을 연결한다 → 명사가 직접 함 → {{connecting}} (능동)',
    '점들(the dots)이 맞춰진다 → 명사가 당함 → {{matched}} (수동) / 주어(He, She)가 아니라 with 뒤 명사가 기준!'], m),
  ...D.step(5, '결론 🔑', [
    'with + 명사 + 현재분사 = 명사가 ~하는 채로(능동) / with + 명사 + {{과거분사}} = 명사가 ~된 채로(수동) / 분사 자리에 형용사 · 부사 · 전치사구도 온다: with her mouth {{full}}, with your shoes {{on}}, with a book {{in her hand}}'], m),
  ...D.infoBox('오늘의 핵심 3문장', [
    '① Wormholes may contain two mouths, with a throat {{connecting}} the two. (본문 · 능동)',
    '② Chris looked at the stars through a telescope with one eye {{closed}}. (교과서 · 수동)',
    '③ She was talking to me with her mouth {{full}}. (교과서 Grammar✚ · 형용사)'], m),
  ...D.tip(['칠판에 [with] → [명사] → [상태] 세 칸을 그리고, 명사 칸에 든 것에게 “네가 직접 하니, 당하니?”를 묻게 한다. 주어 칸(He · She)은 손으로 가리고 보게 하면 closing / closed 혼동이 줄어든다.',
    '같은 과 문법 가정법 과거와 한 문항에 섞여 나오므로(기출 17 · 19번) PERFECT CHECK에 가정법 과거 2문항을 넣었다. 분사구문과의 구별은 Point 3에서 ‘주어가 하면 분사구문, with 뒤 명사의 상태면 with’로 정리한다.'], m),

  // ---------------- Point 1 ----------------
  D.section('Point 1', 'with + 명사 + 현재분사(능동) · 과거분사(수동) — 부대상황 ‘~한 채로, ~하면서’', 'point'),
  ...D.table(['구성', '판단 기준 · 해석', '예'], [
    ['with + 명사 + 현재분사(-ing)', '명사가 직접 ~하는 능동 · 진행 → ‘명사가 ~하면서, ~하는 채로’', 'Wormholes may contain two mouths, with a throat **connecting** the two. (본문)'],
    ['with + 명사 + 과거분사(p.p.)', '명사가 ~되는 수동 · 완료 → ‘명사가 ~된 채로’', 'Take the paper and fold it with the dots **matched** up. (본문)'],
    ['자동사는 -ing만', 'shine · fall · blow · rest처럼 목적어 없이 쓰는 동사는 수동이 없다', 'She spoke with tears **falling** down her cheeks. / with his eyes **shining** (shined ✗) (기출)'],
    ['몸의 일부 + p.p.', '눈 · 팔 · 다리는 사람이 감고 · 끼고 · 꼬는 대상 → 과거분사', 'He stood with his arms **folded**. / with her legs **crossed** (crossing ✗) (기출)'],
    ['with 자리', 'by · and로 바꿀 수 없고, 분사 자리에 동사원형 · to부정사 ✗', 'He fell asleep **with** the TV **turned** on. (by ✗ · turn ✗ · to turn ✗) (기출)']], [2300, 3300, 4038], m),
  ...D.infoBox('-ing일까 p.p.일까 — 3단계 판단', [
    '① with 뒤 명사 찾기: with {{her legs}} crossed — 주어 The woman은 보지 않는다',
    '② 명사와 분사를 문장으로 이어 보기: her legs cross? ✗ → her legs {{are crossed}} ○',
    '③ ‘~이 …한다’면 -ing, ‘~이 …된다’면 p.p.: a throat {{connects}} the two → connecting'], m),
  ...D.trick('명사에게 직접 물어본다', ['눈아, 네가 감니? 아니, 감겨 → closed', '목구멍아, 네가 잇니? 응, 내가 이어 → connecting', '사람(주어) 말고 with 뒤 명사가 대답한다']),
  ...D.examPoint([
    { q: 'Jenny counted the stars with her finger {{pointing}} at each of them.', why: '손가락이 가리키는 능동 → 현재분사 (교과서 · 기출 9)' },
    { q: 'He fell asleep {{with}} the TV {{turned}} on.', why: 'TV가 켜진 수동 → with + 명사 + 과거분사 (기출 10)' }], m),
  ...D.caution(['다리를 꼬다 · 팔짱을 끼다 · 눈을 감다는 우리말이 능동이라 crossing · folding · closing을 고르는 학생이 많다. 명사(legs · arms · eyes)는 꼬이는 · 감기는 대상 → p.p. (기출 16 ⑤ with her legs crossing ✗)',
    '거꾸로 자동사(shine · blow · fall · beat)를 p.p.로 바꾼 선지(with his eyes shined ✗, 기출 17 ③)도 나온다.',
    '본문 두 군데(with the dots matched up / with a throat connecting the two)를 바꿔 놓고 고르게 하는 어법 문항(matching ✗ · connected ✗)이 서술형 · 객관식 모두 단골이다. (기출 57 · 68)',
    '우리말 영작 빈칸 ⓐ ⓑ에 with / by, turned / turn / to turn을 짝지은 선지 — with + 명사 + 분사 세트로 확인시킨다. (기출 10)'], m),
  ...D.drill(1, 'with + 명사 + 현재분사 · 과거분사', [
    { level: 'Basic ①', type: 'choice', instr: '괄호 안에서 알맞은 것을 고르시오.', items: [
      { q: 'Wormholes may contain two mouths, with a throat (connected / connecting) the two.', a: 'connecting', why: '목구멍이 둘을 연결하는 능동 (본문)' },
      { q: 'Take the paper and fold it with the dots (matched / matching) up.', a: 'matched', why: '점들이 맞춰지는 수동 (본문)' },
      { q: 'Chris looked at the stars with one eye (closed / closing).', a: 'closed', why: '눈이 감기는 수동 (교과서)' },
      { q: 'Jenny counted the stars with her finger (pointed / pointing) at each of them.', a: 'pointing', why: '손가락이 가리키는 능동 (교과서)' },
      { q: 'He fell asleep with the TV (turning / turned) on.', a: 'turned', why: 'TV가 켜진 수동 (기출)' },
      { q: 'She spoke with tears (fallen / falling) down her cheeks.', a: 'falling', why: '눈물이 흘러내리는 능동 — fall은 자동사 (교과서 Grammar✚)' },
      { q: 'The woman was sitting with her legs (crossed / crossing).', a: 'crossed', why: '다리가 꼬인 수동 (기출)' },
      { q: 'He walked home with his dog (followed / following) him.', a: 'following', why: '개가 그를 따라오는 능동 — 뒤에 목적어 him' },
      { q: 'The bird flew away with its leg (breaking / broken).', a: 'broken', why: '다리가 부러진 수동 (기출)' },
      { q: 'He stood at the gate with his arms (folded / folding).', a: 'folded', why: '팔이 접힌(팔짱 낀) 수동 (교과서 Grammar✚)' }] },
    { level: 'Basic ②', type: 'fill', instr: '<보기>에서 알맞은 말을 골라 빈칸에 쓰시오. (한 번씩만 사용)',
      bogi: ['beating', 'turned', 'blowing', 'closed', 'following', 'crossed', 'running', 'connecting', 'broken', 'pointing'], items: [
      { q: 'Wormholes may contain two mouths, with a throat [[connecting]] the two.', why: '본문 — 목구멍이 연결하는 능동' },
      { q: 'Sit comfortably with your eyes [[closed]] and breathe slowly.', why: '교과서 — 눈이 감긴 수동' },
      { q: 'The woman was sitting on the chair with her legs [[crossed]].', why: '기출 — 다리가 꼬인 수동' },
      { q: 'He fell asleep with the TV [[turned]] on.', why: '기출 — TV가 켜진 수동' },
      { q: 'Jenny counted the stars with her finger [[pointing]] at each of them.', why: '교과서 — 손가락이 가리키는 능동' },
      { q: 'She read the letter with her heart [[beating]] fast.', why: '기출 — 심장이 뛰는 능동' },
      { q: 'The bird flew away with its leg [[broken]].', why: '기출 — 다리가 부러진 수동' },
      { q: 'He walked home with his dog [[following]] him.', why: '개가 따라오는 능동' },
      { q: 'She stood on the hill with her hair [[blowing]] in the wind.', why: '머리카락이 바람에 날리는 능동 — blow는 자동사' },
      { q: 'He left the car with the engine [[running]].', why: '엔진이 돌아가는 능동' }] },
    { level: 'Intermediate', type: 'write', instr: '어법상 틀린 부분을 찾아 바르게 고쳐 쓰시오.', items: [
      { q: 'Mary was sitting with her legs crossing on the bench.', a: 'crossing → crossed', why: '기출 16 — 다리가 꼬인 수동' },
      { q: 'John listened to his teacher with his eyes shined.', a: 'shined → shining', why: '기출 17 — 눈이 반짝이는 능동(자동사)' },
      { q: 'Wormholes may contain two mouths, with a throat connected the two.', a: 'connected → connecting', why: '본문 기출 — 능동, 뒤에 목적어 the two' },
      { q: 'Take the paper and fold it with the dots matching up.', a: 'matching → matched', why: '본문 기출 — 점들이 맞춰지는 수동' },
      { q: 'Jenny counted the stars with her finger point at each of them.', a: 'point → pointing', why: '교과서 — 분사 자리에 동사원형 ✗' },
      { q: 'He fell asleep with the TV turn on.', a: 'turn → turned', why: '기출 10 — TV가 켜진 수동' },
      { q: 'It was a beautiful morning with little wind blown.', a: 'blown → blowing', why: '기출 17 — 바람이 부는 능동(자동사)' },
      { q: 'She stood at the door with her arms folding.', a: 'folding → folded', why: '팔이 접힌 수동' },
      { q: 'He fell asleep by the TV turned on.', a: 'by → with', why: '기출 10 — 부대상황은 with' },
      { q: 'The puppy ran to me with its tail wagged.', a: 'wagged → wagging', why: '꼬리가 흔들리며 움직이는 능동(자동사)' }] },
    { level: 'Advanced · 모두 고르기', type: 'multi', free: true, instr: '해당하는 것을 모두 골라 기호를 쓰시오.', items: [
      { q: '다음 중 어법상 옳은 문장을 모두 고르시오.', box: [
        '(a) Chris looked at the stars with one eye closing.', '(b) The bird flew away with its leg broken.', '(c) She read the letter with her heart beating fast.',
        '(d) He fell asleep with the TV turning on.', '(e) It was a quiet night with the stars shining brightly.'], a: '(b), (c), (e)', why: '(a) 눈이 감긴 수동 → closed (d) TV가 켜진 수동 → turned (기출 19 변형)' },
      { q: '밑줄 친 부분에 대한 설명으로 옳은 것을 모두 고르시오.', box: [
        '(a) Wormholes may contain two mouths, with a throat __connecting__ the two. → a throat가 둘을 연결하는 능동 관계라 현재분사를 썼다.',
        '(b) Fold it with the dots __matched__ up. → the dots가 맞춰지는 수동 관계라 과거분사를 썼다.',
        '(c) He stood with his arms __folded__. → 주어 He가 팔짱을 끼므로 현재분사 folding으로 고쳐야 한다.',
        '(d) She spoke with tears __falling__ down her cheeks. → ‘눈물을 흘리면서’라는 부대상황을 나타낸다.',
        '(e) He fell asleep __with__ the TV turned on. → with 대신 by를 써도 같은 뜻이다.'], a: '(a), (b), (d)', why: '(c) 기준은 with 뒤 명사(his arms) → folded가 맞다 (e) 부대상황은 with만 ○' },
      { q: '다음 대화의 밑줄 친 ⓐ~ⓔ 중 어법상 어색한 것을 모두 골라 기호를 쓰고 바르게 고치시오.', fix: true, label: '기호 / 고친 것', box: [
        'A: What did you do last night? — B: I watched a movie ⓐ __with my dog sleeping__ next to me.',
        'A: How did Jenny count the stars? — B: She counted them ⓑ __with her finger pointed__ at each of them.',
        'A: Why didn’t you hear me? — B: I was listening to music ⓒ __with my eyes closed__.',
        'A: How was your yoga class? — B: We sat ⓓ __with our legs crossing__ for an hour.',
        'A: Did you sleep well? — B: No. I fell asleep ⓔ __with the light turned on__.'], a: 'ⓑ pointed → pointing, ⓓ crossing → crossed', why: 'ⓑ 손가락이 가리키는 능동 ⓓ 다리가 꼬인 수동' },
      { q: '괄호 안 동사의 현재분사(-ing)가 빈칸에 들어가야 하는 것을 모두 고르시오.', box: [
        '(a) She sat on the sofa with her cat ______ on her lap. (sleep)', '(b) The robot moved forward with its arms ______ high. (raise)', '(c) We walked along the beach with the sun ______ brightly. (shine)',
        '(d) She left the room with the window ______. (break)', '(e) The runner crossed the finish line with his legs ______. (shake)'], a: '(a), (c), (e)', why: '(b) 팔이 들어 올려진 수동 → raised (d) 창문이 깨진 수동 → broken' },
      { q: '다음 우리말을 영작한 것 중 옳은 것을 모두 고르시오.', box: [
        '(a) 그는 눈을 감은 채 음악을 들었다. → He listened to music with his eyes closed.', '(b) 그녀는 다리를 꼰 채 앉아 있었다. → She was sitting with her legs crossing.',
        '(c) 그는 개가 뒤따라오는 채로 걸었다. → He walked with his dog following him.', '(d) 그는 TV를 켜 놓은 채 잠들었다. → He fell asleep with the TV turned on.',
        '(e) 그 새는 다리가 부러진 채 날아갔다. → The bird flew away with its leg breaking.'], a: '(a), (c), (d)', why: '(b) crossed (e) broken — 둘 다 수동' }] },
    { level: 'Advanced · 객관식', type: 'mcq', free: true, instr: '알맞은 답을 고르시오.', items: [
      { q: '다음 문장의 빈칸에 들어갈 말로 알맞은 것은? — When Jenny went camping, she counted the stars with her finger ______ at each of them.', opts: [
        'point', 'pointed', 'pointing', 'be pointed', 'are pointing'], a: '③', why: '손가락이 가리키는 능동 → 현재분사 (기출 9)' },
      { q: '다음 우리말을 영작할 때 빈칸 ⓐ, ⓑ에 들어갈 말이 차례대로 연결된 것은? — 그녀는 문을 잠근 채로 외출했다. → She went out ⓐ______ the door ⓑ______.', opts: [
        'by – locking', 'with – lock', 'with – to lock', 'by – locked', 'with – locked'], a: '⑤', why: '부대상황 with + 문이 잠긴 수동 locked (기출 10 변형)' },
      { q: '다음 중 어법상 어색한 문장은?', opts: [
        'Sit comfortably with your eyes closed.', 'Mary was sitting with her legs crossing on the bench.', 'Balance on your arms with your knees resting on the upper arms.',
        'Lower your head to the ground with your arms stretched.', 'Sit with your legs extended and lean forward.'], a: '②', why: '② 다리가 꼬인 수동 → crossed (기출 16)' },
      { q: '다음 중 어법상 알맞은 문장의 개수는?', box: [
        '(a) The cat walked away with its tail raised.', '(b) Jenny was standing with her arms folded.', '(c) He ran to the bus stop with his bag bouncing on his back.',
        '(d) John listened to his teacher with his eyes shined.', '(e) It was a beautiful morning with little wind blowing.'], opts: ['1개', '2개', '3개', '4개', '5개'], a: '④', why: '(d)만 틀림 → shining / 나머지 4개 ○ (기출 17 · 19 변형)' },
      { q: '(A)~(C)에 알맞은 말이 바르게 짝지어진 것은? — Fold it with the dots (A)(matched / matching) up. Wormholes may contain two mouths, with a throat (B)(connected / connecting) the two. He fell asleep with the radio (C)(playing / played).', opts: [
        'matched – connecting – playing', 'matched – connected – playing', 'matching – connecting – played', 'matching – connected – playing', 'matched – connecting – played'], a: '①', why: '(A) 수동 (B) 능동 (C) 라디오가 나오는 능동 (기출 57 변형)' }] },
    { level: '전환 · 연결', type: 'write', instr: '두 문장을 with + 명사 + 분사를 사용하여 한 문장으로 연결하시오.', items: [
      { q: 'Jenny counted the stars. Her finger was pointing at each of them.', a: 'Jenny counted the stars with her finger pointing at each of them.', why: '교과서 — 능동 · 진행' },
      { q: 'Chris looked at the stars through a telescope. One eye was closed.', a: 'Chris looked at the stars through a telescope with one eye closed.', why: '교과서 — 수동' },
      { q: 'He fell asleep. The TV was turned on.', a: 'He fell asleep with the TV turned on.', why: '기출 — was turned → turned' },
      { q: 'The woman was sitting on the chair. Her legs were crossed.', a: 'The woman was sitting on the chair with her legs crossed.', why: '기출 — 수동' },
      { q: 'She spoke. Tears were falling down her cheeks.', a: 'She spoke with tears falling down her cheeks.', why: '교과서 Grammar✚ — 능동' },
      { q: 'He stood at the gate. His arms were folded.', a: 'He stood at the gate with his arms folded.', why: '교과서 Grammar✚ — 수동' },
      { q: 'The boy came home. His shirt was covered with mud.', a: 'The boy came home with his shirt covered with mud.', why: '수동 — be동사만 빼고 p.p. 그대로' },
      { q: 'We walked through the park. The birds were singing.', a: 'We walked through the park with the birds singing.', why: '능동 — were singing → singing' },
      { q: 'Sit on the floor. Your legs are extended.', a: 'Sit on the floor with your legs extended.', why: '교과서 요가 — 수동' },
      { q: 'He drove away. Smoke was coming out of the car.', a: 'He drove away with smoke coming out of the car.', why: '능동 — 연기가 나오는' }] },
  ], m),

  // ---------------- Point 2 ----------------
  D.section('Point 2', 'with + 명사 + 형용사 · 부사 · 전치사구 — 분사 자리에 오는 다른 말', 'point'),
  ...D.table(['구성', '역할 · 설명', '예'], [
    ['with + 명사 + 형용사', '명사의 상태를 형용사로 — 부사(-ly) · 분사로 바꾸지 않는다', 'She was talking to me with her mouth **full**. (fully ✗) (교과서 Grammar✚)'],
    ['with + 명사 + 부사', 'on · off · out · up 등 — ‘켠 · 끈 · 신은 · 쓴 채로’', 'Do not enter with your shoes **on**. / Don’t sleep with the light **on**. (교과서 Grammar✚)'],
    ['with + 명사 + 전치사구', '명사가 있는 위치를 전치사구로', 'I walked along the street with my hands **in my pockets**. (교과서 Grammar✚)'],
    ['어순', 'with 뒤에 바로 명사, 그 뒤에 상태 — 상태가 명사 앞으로 오지 않는다', 'with **his hair wet** (with wet his hair ✗)'],
    ['동사 · -ing 덧붙이기 ✗', '부사 on · off에 동사를 붙이거나 형용사를 -ing로 바꾸지 않는다', 'with your shoes on (putting on ✗) / with his mouth full (fulling ✗)']], [2300, 3300, 4038], m),
  ...D.infoBox('분사 자리에 들어오는 4가지', [
    '① 분사: with his eyes {{closed}} · with a throat connecting the two',
    '② 형용사: with her mouth {{full}} · with the window open',
    '③ 부사: with your shoes {{on}} · with the lights off   ④ 전치사구: with a book {{in her hand}}'], m),
  ...D.trick('with 의자에 앉는 손님들', ['꽉 찬 입(full), 신은 신발(on)', '손 안의 책(in her hand)도 앉을 수 있다', '자리 주인은 명사, 손님은 상태 하나']),
  ...D.examPoint([
    { q: 'She was talking to me with her mouth {{full}}. (그녀는 입에 음식을 가득 넣은 채로 나에게 이야기하고 있었다.)', why: '형용사 full — fully ✗ (교과서 Grammar✚)' },
    { q: 'Do not enter with your shoes {{on}}. (신발을 신은 채 들어가지 마시오.)', why: '부사 on — ‘신은 채로’ (교과서 Grammar✚)' }], m),
  ...D.caution(['형용사 자리에 부사(-ly)를 넣은 선지(with her mouth fully ✗)와 상태를 명사 앞에 둔 어순 오류(with full her mouth ✗)가 영작 문항 오답이다.',
    'on · off를 동사처럼 바꾼 선지(with your shoes putting on ✗, with the lights turning off ✗) — turned off처럼 수동 분사면 ○, 부사 하나만 써도 ○.',
    '전치사구에서 전치사를 빠뜨린 선지(with my hands my pockets ✗), at her hand(✗ → in her hand)도 함께 나온다.',
    '교과서 Grammar✚ 예문은 with my hands in the pocket이지만, 수업 · 문항에서는 자연스러운 in my pockets로 바꿔 썼다(학생이 질문하면 둘 다 의미는 같다고 설명).'], m),
  ...D.drill(2, 'with + 명사 + 형용사 · 부사 · 전치사구', [
    { level: 'Basic ①', type: 'choice', instr: '괄호 안에서 알맞은 것을 고르시오.', items: [
      { q: 'She was talking to me with her mouth (full / fully).', a: 'full', why: '명사의 상태 — 형용사 (교과서 Grammar✚)' },
      { q: 'Do not enter with your shoes (putting / on).', a: 'on', why: '‘신은 채로’ — 부사 on (교과서 Grammar✚)' },
      { q: 'He sat on the sofa with his eyes (opening / open).', a: 'open', why: '눈을 뜬 상태 — 형용사 open' },
      { q: 'He waited for the bus with his hands (in his pockets / his pockets).', a: 'in his pockets', why: '위치 — 전치사구 (교과서 Grammar✚)' },
      { q: 'Don’t sleep with the light (on / turning on).', a: 'on', why: '불을 켠 채로 — 부사 on' },
      { q: 'She left the house with the door (wide open / widely opening).', a: 'wide open', why: '문이 활짝 열린 상태 — 형용사' },
      { q: 'He answered the phone with his mouth (fully / full) of rice.', a: 'full', why: 'full of — 형용사' },
      { q: 'We watched the movie with the lights (off / turning off).', a: 'off', why: '불을 끈 채로 — 부사 off' },
      { q: 'My grandpa fell asleep with his glasses (on / wearing).', a: 'on', why: '안경을 쓴 채로 — 부사 on' },
      { q: 'The girl ran to her mom with a flower (on her hand / in her hand).', a: 'in her hand', why: '손에 든 — in one’s hand' }] },
    { level: 'Basic ②', type: 'fill', instr: '<보기>에서 알맞은 말을 골라 빈칸에 쓰시오. (한 번씩만 사용)',
      bogi: ['wet', 'under', 'full', 'off', 'wide', 'in', 'behind', 'on', 'over', 'open'], items: [
      { q: 'She was talking to me with her mouth [[full]] of food.', why: '교과서 Grammar✚ — 형용사 full of' },
      { q: 'Do not enter the room with your shoes [[on]]. (신발을 신은 채)', why: '교과서 Grammar✚ — 부사 on' },
      { q: 'We went out with the lights [[off]] to save energy. (불을 끈 채)', why: '부사 off' },
      { q: 'He slept with the window [[open]] all night. (창문을 열어 둔 채)', why: '형용사 open' },
      { q: 'She walked into class with a book [[in]] her hand.', why: '전치사구 in her hand' },
      { q: 'He came back from the rain with his hair [[wet]]. (머리가 젖은 채)', why: '형용사 wet' },
      { q: 'The boy stood with his hands [[behind]] his back. (뒷짐을 진 채)', why: '전치사구 behind his back' },
      { q: 'Grandma sat by the fire with a blanket [[over]] her knees. (무릎에 담요를 덮은 채)', why: '전치사구 over her knees' },
      { q: 'She stared at the sky with her eyes [[wide]] open. (눈을 크게 뜬 채)', why: '부사 wide + 형용사 open' },
      { q: 'He fell asleep with his phone [[under]] his pillow. (베개 밑에 휴대폰을 둔 채)', why: '전치사구 under his pillow' }] },
    { level: 'Intermediate', type: 'write', instr: '어법상 틀린 부분을 찾아 바르게 고쳐 쓰시오.', items: [
      { q: 'Don’t talk with your mouth fully.', a: 'fully → full', why: '명사의 상태 — 형용사' },
      { q: 'He slept with the window opening.', a: 'opening → open(opened)', why: '창문이 열린 상태 — 형용사 open(수동 opened도 ○)' },
      { q: 'Do not enter with your shoes putting on.', a: 'putting on → on', why: '교과서 Grammar✚ — 부사 on' },
      { q: 'He waited for the bus with his hands his pockets.', a: 'his pockets → in his pockets', why: '위치 — 전치사 in 필요' },
      { q: 'She was watching TV with the lights turning off.', a: 'turning off → off(turned off)', why: '불이 꺼진 상태 — 부사 off / 수동 turned off' },
      { q: 'My dad fell asleep with his glasses wearing.', a: 'wearing → on', why: '안경을 쓴 채로 — 부사 on' },
      { q: 'The girl smiled with her eyes fulling of tears.', a: 'fulling → full', why: 'full은 형용사 — -ing ✗' },
      { q: 'She ran out with a sandwich at her hand.', a: 'at → in', why: '손에 든 — in one’s hand' },
      { q: 'He came into the room with wet his hair.', a: 'with wet his hair → with his hair wet', why: '어순 — with + 명사 + 상태' },
      { q: 'Don’t speak by your mouth full.', a: 'by → with', why: '부대상황은 with' }] },
    { level: 'Advanced · 모두 고르기', type: 'multi', free: true, instr: '해당하는 것을 모두 골라 기호를 쓰시오.', items: [
      { q: '다음 중 어법상 옳은 문장을 모두 고르시오.', box: [
        '(a) She came in with her hair wetly.', '(b) Don’t sleep with the TV on.', '(c) He waited with his arms around his knees.',
        '(d) Do not enter with your shoes putting on.', '(e) She sang with her eyes full of tears.'], a: '(b), (c), (e)', why: '(a) wetly → wet (d) putting on → on' },
      { q: '밑줄 친 부분에 대한 설명으로 옳은 것을 모두 고르시오.', box: [
        '(a) She was talking with her mouth __full__. → 명사 her mouth의 상태를 나타내는 형용사이다.',
        '(b) Do not enter with your shoes __on__. → ‘신은 채로’라는 뜻의 부사이다.',
        '(c) I walked with my hands __in my pockets__. → with 뒤 명사의 위치를 나타내는 전치사구이다.',
        '(d) He slept with the window __open__. → 동사원형이므로 opening으로 고쳐야 한다.',
        '(e) She stood with a book __in her hand__. → with 대신 by를 써도 같은 뜻이다.'], a: '(a), (b), (c)', why: '(d) open은 형용사 — 그대로 ○ (e) 부대상황은 with만 ○' },
      { q: '다음 글의 밑줄 친 ⓐ~ⓔ 중 어법상 어색한 것을 모두 골라 기호를 쓰고 바르게 고치시오.', fix: true, label: '기호 / 고친 것', box: [
        'My little brother has some bad habits. He often talks ⓐ __with his mouth full__. He comes into the house ⓑ __with his shoes on__. He sleeps ⓒ __with the light turning on__. He watches TV ⓓ __with his feet on the table__. He also walks around ⓔ __with his hands his pockets__.'],
        a: 'ⓒ turning on → on(turned on), ⓔ his pockets → in his pockets', why: 'ⓒ 불이 켜진 상태 — 부사 on / 수동 turned on ⓔ 전치사 in 필요' },
      { q: '빈칸에 on이 들어갈 수 있는 것을 모두 고르시오.', box: [
        '(a) Don’t sleep with the light ______.', '(b) He talked with his mouth ______ of bread.', '(c) Do not enter with your shoes ______.',
        '(d) He sat with a cup ______ his hand.', '(e) She was dancing with her headphones ______.'], a: '(a), (c), (e)', why: '(b) full (d) in' },
      { q: '밑줄 친 부분이 분사가 아닌 것(형용사 · 부사 · 전치사구)을 모두 고르시오.', box: [
        '(a) He listened with his eyes __closed__.', '(b) She talked with her mouth __full__.', '(c) He fell asleep with the TV __on__.',
        '(d) Wormholes may contain two mouths, with a throat __connecting__ the two.', '(e) She left with the window __broken__.'], a: '(b), (c)', why: '(b) 형용사 (c) 부사 / (a)(e) 과거분사 (d) 현재분사' }] },
    { level: 'Advanced · 객관식', type: 'mcq', free: true, instr: '알맞은 답을 고르시오.', items: [
      { q: '다음 우리말을 바르게 영작한 것은? — 입에 음식을 가득 넣은 채로 말하지 마라.', opts: [
        'Don’t talk with full your mouth.', 'Don’t talk with your mouth fully.', 'Don’t talk with your mouth filling.', 'Don’t talk with your mouth full.', 'Don’t talk by your mouth full.'], a: '④', why: 'with + 명사 + 형용사 full (교과서 Grammar✚)' },
      { q: '다음 중 밑줄 친 부분의 품사가 나머지 넷과 다른 것은?', opts: [
        'He fell asleep with the TV __on__.', 'She listened with her eyes __closed__.', 'Don’t come in with your shoes __off__.', 'He came in with his hat __on__.', 'We sat in the dark with the lights __out__.'], a: '②', why: '② 과거분사 / 나머지 부사' },
      { q: '(A)~(C)에 알맞은 말이 바르게 짝지어진 것은? — Do not enter with your shoes (A)(on / putting). She was talking with her mouth (B)(full / fully). I walked with my hands (C)(in / at) my pockets.', opts: [
        'putting – full – in', 'on – fully – in', 'on – full – at', 'putting – fully – at', 'on – full – in'], a: '⑤', why: '부사 on · 형용사 full · 전치사 in (교과서 Grammar✚)' },
      { q: '다음 중 어법상 어색한 문장은?', opts: [
        'He sat there with his hat putting on.', 'She walked in with her coat on.', 'She stood with a baby in her arms.', 'We slept with the windows open.', 'He was smiling with his face red.'], a: '①', why: '① putting on → on' },
      { q: '다음 중 어법상 틀린 문장의 개수는?', box: [
        '(a) Don’t eat with your mouth opening.', '(b) He stood with his back against the wall.', '(c) She was dancing with her headphones putting on.',
        '(d) I can’t sleep with the light on.', '(e) He came in with his face wetly.'], opts: ['1개', '2개', '3개', '4개', '5개'], a: '③', why: '(a) open (c) on (e) wet — 3개' }] },
  ], m),

  // ---------------- Point 3 ----------------
  D.section('Point 3', '(심화) 분사구문과의 비교 · 전환 — closing her eyes ↔ with her eyes closed · and절 ↔ with', 'point'),
  ...D.table(['구분', '설명', '예'], [
    ['분사구문 (주어가 직접)', '주절의 주어가 하는 동작 → 현재분사 + 목적어', 'She listened to music, **closing** her eyes. (그녀가 눈을 감으며)'],
    ['with + 명사 + 분사 (명사의 상태)', 'with 뒤 명사가 기준 → 같은 장면도 수동 p.p.', 'She listened to music **with her eyes closed**. (눈이 감긴 채)'],
    ['같은 뜻 짝', '동사 + 목적어 ↔ with + 목적어였던 명사 + p.p.', 'folding his arms = with his arms folded / crossing her legs = with her legs crossed'],
    ['and절 ↔ with', 'and + 명사 + be동사 + 분사 → be동사를 빼고 with', 'He fell asleep, and the TV was turned on. → He fell asleep **with the TV turned on**.'],
    ['and절 ↔ with (능동)', 'and + 명사 + 동사 → with + 명사 + -ing', 'Wormholes may contain two mouths, and a throat connects the two. → **with a throat connecting** the two. (본문)'],
    ['도구의 with와 구별', 'with + 명사 하나로 끝나면 ‘~으로, ~을 가지고’(도구)', 'I saw the stars **with a telescope**. (도구) ≠ with one eye closed (부대상황)']], [2600, 3200, 3838], m),
  ...D.infoBox('분사구문? with? — 누가 하는지 보라', [
    '주절의 주어가 직접 하면 {{분사구문}}: He sat, crossing his legs. (He가 다리를 꼼)',
    'with 뒤 명사의 상태면 with + 명사 + 분사: He sat with his legs {{crossed}}. (다리가 꼬임)',
    'and절은 be동사를 빼고 with로: and his arms were folded → {{with}} his arms folded'], m),
  ...D.trick('주인이 바뀌면 옷도 바뀐다', ['내가 눈을 감으면 closing my eyes', '눈 입장에선 감기니까 with my eyes closed', '같은 장면, 주인공만 바꿔 입은 옷']),
  ...D.examPoint([
    { q: 'He sat on the bench, crossing his legs. = He sat on the bench with his legs {{crossed}}.', why: '분사구문(주어가 꼼) ↔ with + 명사 + p.p.(다리가 꼬임)' },
    { q: 'Jenny counted the stars, and her finger was pointing at each of them. = Jenny counted the stars {{with}} her finger pointing at each of them.', why: 'and절 → with, be동사 생략 (교과서 · 기출 23)' }], m),
  ...D.caution(['분사구문과 with를 섞은 선지(with crossing his legs ✗, with folding his arms ✗)가 가장 많다 — with 뒤에는 명사가 먼저 온다.',
    'with를 빼고 분사구문으로 바꾸면서 p.p.를 남긴 선지(She sat, crossed her legs ✗)도 함께 나온다.',
    '누가 따라가는지 바뀌는 의미 함정: He walked home with his dog following him ≠ He walked home, following his dog. — 의미상 주어를 해석으로 확인시킨다.',
    '독립분사구문(He stood there, his arms folded.)은 교과서 범위 밖 — 학생이 물으면 with를 뺀 형태라고만 설명한다.'], m),
  ...D.drill(3, '분사구문 vs with + 명사 + 분사', [
    { level: 'Basic ①', type: 'choice', instr: '괄호 안에서 알맞은 것을 고르시오.', items: [
      { q: 'She listened to the music, (closing / closed) her eyes.', a: 'closing', why: '분사구문 — 그녀가 눈을 감는 능동, 뒤에 목적어' },
      { q: 'She listened to the music with her eyes (closed / closing).', a: 'closed', why: 'with + 명사 — 눈이 감긴 수동' },
      { q: 'He sat on the sofa, (crossed / crossing) his legs.', a: 'crossing', why: '분사구문 — 그가 다리를 꼬는 능동' },
      { q: 'He sat on the sofa with his legs (crossing / crossed).', a: 'crossed', why: 'with + 명사 — 다리가 꼬인 수동' },
      { q: 'Jenny smiled at me, (waving / waved) her hand.', a: 'waving', why: '분사구문 — Jenny가 손을 흔드는 능동' },
      { q: 'Chris walked home (and / with) his dog following him.', a: 'with', why: 'and 뒤에는 절(동사)이 와야 함 → with + 명사 + 분사' },
      { q: 'The man stood there, (folded / folding) his arms.', a: 'folding', why: '분사구문 — 남자가 팔짱을 끼는 능동' },
      { q: 'Tom ran out of the house, (shouted / shouting) for help.', a: 'shouting', why: '분사구문 — Tom이 외치는 능동' },
      { q: 'She waited for the bus (with / by) her arms crossed.', a: 'with', why: '부대상황은 with' },
      { q: '(Sitting / Sat) on the bench, he read a book.', a: 'Sitting', why: '분사구문 — 그가 앉는 능동' }] },
    { level: 'Basic ②', type: 'fill', instr: '<보기>에서 알맞은 말을 골라 빈칸에 쓰시오. (한 번씩만 사용)',
      bogi: ['crossed', 'and', 'singing', 'closing', 'raised', 'with', 'following', 'crossing', 'closed', 'raising'], items: [
      { q: 'Mina sat quietly in the garden, [[closing]] her eyes.', why: '분사구문 — 목적어 her eyes' },
      { q: 'Mina said nothing with her eyes [[closed]].', why: 'with + 명사 — 수동' },
      { q: 'The student asked a question, [[raising]] her hand.', why: '분사구문 — 목적어 her hand' },
      { q: 'The student waited for her turn with her hand [[raised]].', why: 'with + 명사 — 손이 들린 수동' },
      { q: 'The model posed for the camera, [[crossing]] her legs.', why: '분사구문 — 목적어 her legs' },
      { q: 'The model sat on the chair with her legs [[crossed]].', why: 'with + 명사 — 수동' },
      { q: 'The kids walked to school, [[singing]] a song.', why: '분사구문 — 아이들이 노래하는 능동' },
      { q: 'He walked to school [[with]] his friend following him.', why: 'with + 명사 + 분사' },
      { q: 'He walked to school, [[and]] his friend followed him.', why: '뒤에 절(followed) → and' },
      { q: 'The duck swam across the pond with her babies [[following]] her.', why: 'with + 명사 — 새끼들이 따라오는 능동' }] },
    { level: 'Intermediate', type: 'write', instr: '어법상 틀린 부분을 찾아 바르게 고쳐 쓰시오.', items: [
      { q: 'She listened to the music with her eyes closing.', a: 'closing → closed', why: 'with + 명사 — 눈이 감긴 수동' },
      { q: 'She listened to the music, closed her eyes.', a: 'closed → closing (and closed도 ○)', why: '분사구문 — 그녀가 감는 능동' },
      { q: 'He stood at the door with folding his arms.', a: 'with folding his arms → with his arms folded', why: 'with 뒤에는 명사 먼저 (folding his arms만 써도 ○)' },
      { q: 'The baby slept with her mom sang a lullaby.', a: 'sang → singing', why: 'with + 명사 + 분사 — 엄마가 노래하는 능동' },
      { q: 'Waved her hand, Jenny said goodbye.', a: 'Waved → Waving', why: '분사구문 — Jenny가 흔드는 능동' },
      { q: 'Tom came home with his face covering with mud.', a: 'covering → covered', why: '얼굴이 진흙으로 덮인 수동' },
      { q: 'He walked along the beach and his dog following him.', a: 'and → with (and his dog followed him도 ○)', why: 'and 뒤에는 동사가 있는 절' },
      { q: 'Crossed her legs, she sat on the sofa.', a: 'Crossed → Crossing', why: '분사구문 — 그녀가 꼬는 능동' },
      { q: 'The girl asked a question with raising her hand.', a: 'with raising her hand → raising her hand (with her hand raised도 ○)', why: '분사구문에는 with ✗' },
      { q: 'Wormholes may contain two mouths, and a throat connecting the two.', a: 'and → with (and a throat connects도 ○)', why: '본문 변형 — and 뒤에는 절' }] },
    { level: 'Advanced · 모두 고르기', type: 'multi', free: true, instr: '해당하는 것을 모두 골라 기호를 쓰시오.', items: [
      { q: '두 문장의 의미가 같은 것을 모두 고르시오.', box: [
        '(a) He listened, closing his eyes. = He listened with his eyes closed.',
        '(b) She stood with her arms folded. = She stood, folding her arms.',
        '(c) He fell asleep with the TV turned on. = He fell asleep, turning off the TV.',
        '(d) Jenny counted the stars with her finger pointing at each of them. = Jenny counted the stars, and her finger was pointing at each of them.',
        '(e) He walked home with his dog following him. = He walked home, following his dog.'], a: '(a), (b), (d)', why: '(c) TV를 끈 것 — 반대 (e) 따라가는 사람이 바뀜' },
      { q: '밑줄 친 부분에 대한 설명으로 옳은 것을 모두 고르시오.', box: [
        '(a) He walked home with his dog __following__ him. → 분사 following의 의미상 주어는 He이다.',
        '(b) She sang, __closing__ her eyes. → 주어 She가 눈을 감는 능동이므로 현재분사를 쓴 분사구문이다.',
        '(c) She sang with her eyes __closed__. → her eyes가 감기는 수동 관계라 과거분사를 썼다.',
        '(d) He sat __with his legs crossed__. → crossing his legs로 바꾸면 뜻이 반대가 된다.',
        '(e) Wormholes may contain two mouths, __with__ a throat connecting the two. → and로 바꾸면 a throat connects the two처럼 동사를 써야 한다.'], a: '(b), (c), (e)', why: '(a) 의미상 주어는 his dog (d) 같은 뜻' },
      { q: '다음 글의 밑줄 친 ⓐ~ⓔ 중 어법상 어색한 것을 모두 골라 기호를 쓰고 바르게 고치시오.', fix: true, label: '기호 / 고친 것', box: [
        'Last Sunday, I did yoga at home. First, I sat on the mat ⓐ __with my legs crossed__. Then I breathed slowly, ⓑ __closed my eyes__. Next, I lay down ⓒ __with my arms stretched__ above my head. My cat watched me ⓓ __with its tail moved__ from side to side. I finished the class ⓔ __with a big smile on my face__.'],
        a: 'ⓑ closed → closing, ⓓ moved → moving', why: 'ⓑ 분사구문 — 내가 감는 능동 ⓓ 꼬리가 움직이는 능동' },
      { q: '빈칸에 with가 들어갈 수 있는 것을 모두 고르시오.', box: [
        '(a) She came home ______ her shoes covered with mud.', '(b) ______ at the stars, Chris made a wish.', '(c) Don’t drive ______ your seat belt unfastened.',
        '(d) He went to bed early ______ he was very tired.', '(e) The old man sat on the bench ______ his dog lying at his feet.'], a: '(a), (c), (e)', why: '(b) Looking — 분사구문 (d) 뒤에 절 → because' },
      { q: '분사구문을 with + 명사 + 분사로 바르게 바꾼 것을 모두 고르시오.', box: [
        '(a) She sat, folding her arms. → She sat with her arms folded.', '(b) Mina danced, raising her arms. → Mina danced with her arms raised.',
        '(c) He answered, crossing his arms. → He answered with his arms crossing.', '(d) The boy stood, stretching his arms. → The boy stood with his arms stretched.',
        '(e) The girl stood, bowing her head. → The girl stood with her head bowing.'], a: '(a), (b), (d)', why: '(c) crossed (e) bowed — 목적어였던 명사는 수동' }] },
    { level: 'Advanced · 객관식', type: 'mcq', free: true, instr: '알맞은 답을 고르시오.', items: [
      { q: '<보기>와 의미가 같은 문장은?', box: ['<보기>  He sat on the bench with his legs crossed.'], opts: [
        'He sat on the bench, crossed his legs.', 'He sat on the bench, crossing his legs.', 'He sat on the bench with crossing his legs.', 'He sat on the bench, his legs crossing.', 'He sat on the bench with his legs crossing.'], a: '②', why: '분사구문 — 그가 다리를 꼬는 능동 + 목적어' },
      { q: '빈칸에 공통으로 들어갈 말은? — She sang a song ______ her eyes closed. / He went out ______ the lights on.', opts: [
        'by', 'and', 'as', 'with', 'for'], a: '④', why: '부대상황 with + 명사 + 분사 · 부사' },
      { q: '다음 중 밑줄 친 with의 쓰임이 나머지 넷과 다른 것은?', opts: [
        'I saw the stars __with__ a telescope.', 'She spoke __with__ tears falling down her cheeks.', 'He slept __with__ the window open.',
        'Don’t talk __with__ your mouth full.', 'He stood __with__ his arms folded.'], a: '①', why: '① 도구(~으로) / 나머지 부대상황' },
      { q: '다음 우리말을 바르게 영작한 것은? — 그 소년은 강아지가 뒤를 따라오는 채로 집에 걸어갔다.', opts: [
        'The boy walked home, following his puppy.', 'The boy walked home with his puppy followed him.', 'The boy walked home with following his puppy.',
        'The boy walked home and his puppy following him.', 'The boy walked home with his puppy following him.'], a: '⑤', why: '강아지가 따라오는 능동 → with his puppy following him' },
      { q: '다음 중 어법상 틀린 문장의 개수는?', box: [
        '(a) Closing her eyes, she made a wish.', '(b) She made a wish with her eyes closing.', '(c) He stood there, folded his arms.',
        '(d) He stood there with his arms folded.', '(e) He came home with his shirt covering with sweat.'], opts: ['1개', '2개', '3개', '4개', '5개'], a: '③', why: '(b) closed (c) folding (e) covered — 3개' }] },
    { level: '전환 · 연결', type: 'write', instr: '괄호 안의 지시대로 같은 뜻의 문장으로 바꾸어 쓰시오.', items: [
      { q: 'She listened to the music, closing her eyes. (with)', a: 'She listened to the music with her eyes closed.', why: '목적어였던 명사 → 수동 p.p.' },
      { q: 'He stood at the door with his arms folded. (분사구문)', a: 'He stood at the door, folding his arms.', why: '주어가 하는 능동 + 목적어' },
      { q: 'The woman sat on the chair, crossing her legs. (with)', a: 'The woman sat on the chair with her legs crossed.', why: '기출 20 변형' },
      { q: 'Jenny counted the stars, and her finger was pointing at each of them. (with)', a: 'Jenny counted the stars with her finger pointing at each of them.', why: '교과서 — and · was 빼기' },
      { q: 'He fell asleep, and the TV was turned on. (with)', a: 'He fell asleep with the TV turned on.', why: '기출 10 — 수동' },
      { q: 'The student waited, raising her hand. (with)', a: 'The student waited with her hand raised.', why: '목적어였던 명사 → 수동 p.p.' },
      { q: 'Wormholes may contain two mouths, with a throat connecting the two. (and)', a: 'Wormholes may contain two mouths, and a throat connects the two.', why: '본문 — 분사 → 동사 (may connect도 ○)' },
      { q: 'She was talking to me, and her mouth was full. (with)', a: 'She was talking to me with her mouth full.', why: '교과서 Grammar✚ — 형용사' },
      { q: 'He walked along the street, and his hands were in his pockets. (with)', a: 'He walked along the street with his hands in his pockets.', why: '전치사구' },
      { q: 'The girl ran to her dad, and her hair was blowing in the wind. (with)', a: 'The girl ran to her dad with her hair blowing in the wind.', why: '능동 — was blowing → blowing' }] },
  ], m),

  // ---------------- PERFECT CHECK ----------------
  D.section('PERFECT CHECK', '상위권 함정 체크'),
  ...D.drill(null, '', [{ level: '함정', type: 'choice', instr: '실수하기 쉬운 문장들이에요. 괄호 안에서 알맞은 것을 고르시오.', items: [
    { q: 'Wormholes may contain two mouths, (and / with) a throat connecting the two.', a: 'with', why: '본문 — and 뒤에는 절' },
    { q: 'Now, take the paper and fold it with the dots (matched / matching) up.', a: 'matched', why: '본문 — 점들이 맞춰지는 수동' },
    { q: 'John listened to his teacher with his eyes (shining / shined).', a: 'shining', why: '기출 17 — 자동사 shine → 능동' },
    { q: 'He fell asleep (with / by) the TV turned on.', a: 'with', why: '기출 10 — 부대상황 with' },
    { q: 'Don’t speak with your mouth (fully / full).', a: 'full', why: '형용사 full' },
    { q: 'She sat on the sofa, (crossed / crossing) her legs.', a: 'crossing', why: '분사구문 — 주어가 꼬는 능동' },
    { q: 'She sat on the sofa with her legs (crossed / crossing).', a: 'crossed', why: 'with + 명사 — 다리가 꼬인 수동' },
    { q: 'It was a beautiful morning with little wind (blown / blowing).', a: 'blowing', why: '기출 17 — 바람이 부는 능동' },
    { q: 'If such wormholes (exist / existed) in space, we could travel very far.', a: 'existed', why: '본문 — 가정법 과거 (같은 과 문법)' },
    { q: 'If I (were / am) an astronaut, I would walk in space.', a: 'were', why: '교과서 — 가정법 과거 be동사 were (같은 과 문법)' }] }], m),

  // ---------------- WRITE ----------------
  D.section('WRITE', '서술형 대비'),
  ...D.writeItem(1, 'Basic', '괄호 안의 단어를 알맞은 형태로 바꾸어 쓰시오.', ['Chris looked at the stars through a telescope with one eye (close). (교과서)'], { a: 'closed', why: '눈이 감긴 수동 → 과거분사' }, m),
  ...D.writeItem(2, 'Basic', '괄호 안의 단어를 알맞은 형태로 바꾸어 쓰시오.', ['Wormholes may contain two mouths, with a throat (connect) the two. (본문)'], { a: 'connecting', why: '목구멍이 연결하는 능동 → 현재분사' }, m),
  ...D.writeItem(3, 'Intermediate', 'with + 명사 + 분사를 사용하여 두 문장을 한 문장으로 연결하시오. [두 문장 연결]', ['Lower your head to the ground. Your arms are stretched.'],
    { a: 'Lower your head to the ground with your arms stretched.', why: '교과서 요가 · 기출 24 — 수동' }, m),
  ...D.writeItem(4, 'Intermediate', 'with + 명사 + 분사를 사용하여 두 문장을 한 문장으로 연결하시오. [두 문장 연결]', ['Balance on your arms. Your knees are resting on the upper arms.'],
    { a: 'Balance on your arms with your knees resting on the upper arms.', why: '교과서 요가 — 능동(rest는 자동사)' }, m),
  ...D.writeItem(5, 'Intermediate', 'with를 사용하여 같은 뜻의 문장으로 바꾸어 쓰시오. [문장 전환]', ['My dad was sleeping on the sofa, and his glasses were on.'],
    { a: 'My dad was sleeping on the sofa with his glasses on.', why: 'with + 명사 + 부사' }, m),
  ...D.writeItem(6, 'Intermediate', 'with를 사용하여 같은 뜻의 문장으로 바꾸어 쓰시오. [문장 전환]', ['She read the letter, and her heart was beating fast.'],
    { a: 'She read the letter with her heart beating fast.', why: '기출 19 — 능동, was 빼기' }, m),
  ...D.writeItem(7, 'Advanced', '우리말과 같은 뜻이 되도록 <조건>에 맞게 영작하시오.', ['TV가 켜진 채로 공부하는 것은 좋지 않다.', '<조건> It으로 시작할 것 · with와 turn을 사용할 것(필요시 형태를 바꿀 것) · 총 11단어'],
    { a: 'It is not good to study with the TV turned on.', why: '기출 20 · 11단어 (It/is/not/good/to/study/with/the/TV/turned/on)' }, m),
  ...D.writeItem(8, 'Advanced', '<보기>의 단어를 배열하여 문장을 완성하시오. (필요하면 형태를 바꿀 것)', ['그 여자는 다리를 꼰 채로 의자에 앉아 있었다.', '<보기> the woman / was sitting / on the chair / with / her legs / cross'],
    { a: 'The woman was sitting on the chair with her legs crossed.', why: 'cross → crossed (다리가 꼬인 수동) (기출 20)' }, m),
  ...D.writeItem(9, 'Advanced', '어법상 틀린 부분 2개를 찾아 바르게 고치고, 그 이유를 쓰시오.', ['Now, take the paper and fold it with the dots matching up. Like this, wormholes in space may contain two mouths, with a throat connected the two.'],
    { a: '① matching → matched  ② connected → connecting', why: '① 점들이 맞춰지는 수동이므로 과거분사 ② 목구멍이 둘을 연결하는 능동이므로 현재분사(뒤에 목적어 the two)', blanks: ['고친 것', '이유'] }, m),
  ...D.writeItem(10, 'Advanced', '어법상 틀린 부분 2개를 찾아 바르게 고치고, 그 이유를 쓰시오.', ['She was talking to me with her mouth fully, and her brother was sitting next to her with his arms folding.'],
    { a: '① fully → full  ② folding → folded', why: '① 명사의 상태는 형용사 ② 팔이 접힌(팔짱 낀) 수동이므로 과거분사', blanks: ['고친 것', '이유'] }, m),

  // ---------------- MAP ----------------
  D.section('MAP', "DAVID'S MAP — 백지노트 테스트"),
  D.P([D.T('오늘 배운 내용을 떠올리며 빈칸을 채워 보세요. 책을 보지 않고!', { size: 18, color: '595959' })], { spacing: { after: 120 }, keepNext: true }),
  ...D.image(path.join(__dirname, 'map_G-with분사.png'), 620),
  ...D.table(['자가 체크 — 백지노트에 이 단어들이 들어갔나요?', '✔'], [
    ['with + 명사 + 분사 = 부대상황 ‘~한 채로, ~하면서’', ''], ['기준은 주어가 아니라 with 뒤 명사', ''],
    ['명사가 직접 ~하면 현재분사(-ing): with a throat connecting the two', ''], ['명사가 ~되면 과거분사(p.p.): with the dots matched up', ''],
    ['eyes closed · arms folded · legs crossed (몸의 일부 → p.p.)', ''], ['자동사 shine · blow · fall → -ing만 (shined ✗)', ''],
    ['형용사 · 부사 · 전치사구: mouth full · shoes on · a book in her hand', ''], ['with 자리에 by · and ✗ / 분사 자리에 동사원형 · to부정사 ✗', ''],
    ['분사구문 closing her eyes = with her eyes closed', ''],
    ['본문: Wormholes may contain two mouths, with a throat connecting the two.', '']], [8838, 800], m),
  ...D.memo(['다음 시간 도입: 본문 두 문장(fold it with the dots matched up / with a throat connecting the two)을 칠판에 빈칸으로 쓰고 -ing / p.p. 이유를 말로 설명하게 하기',
    '약한 반: Point 1(명사에게 묻기 · eyes closed · legs crossed) 확실히 → Point 2는 full · on · in her hand 세 개만 → Point 3은 closing her eyes ↔ with her eyes closed 한 쌍만',
    '같은 과 가정법 과거와 섞은 기출(17 · 19번) 다시 풀기 — 개수 문항에서 두 문법을 동시에 판단해야 한다.', '교과서 요가 자막(기출 24) — 그림 없이 우리말만 주고 with + 명사 + 분사로 4문장 말하기'], m),
];
D.render(meta, build, process.argv[2] || '.').then(fs_ => {
  const out = fs_.map(f => { const g = path.join(path.dirname(f), path.basename(f).replace(TITLE, 'with분사')); fs.renameSync(f, g); return g; });
  console.log(out.join('\n'));
});
