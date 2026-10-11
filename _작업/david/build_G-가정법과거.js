const D = require('./david_base');
const path = require('path');
const COVER = JSON.parse(process.env.COVER || '{}');
const meta = { series: D.SERIES.G, code: 'G-가정법과거', title: '가정법 과거', category: 'G. 가정법  |  가정법 과거',
  rightText: 'G  가정법 과거', prefix: process.env.PREFIX || '', cover: COVER.title ? COVER : undefined,
  question: 'If it ~~is~~ sunny tomorrow, I will go out. / If I ~~were~~ a bird, I would fly to you. — 지금 이야기인데 왜 과거형 were를 쓸까?' };

const build = (m) => [
  D.section('FLOW', 'Teaching Flow — 처음 배우는 사람도 따라오는 5단계'),
  ...D.step(1, '우리말로 먼저 생각하기 — ‘~하면 …할 거야’ vs ‘~라면 …할 텐데’', [
    '‘내일 맑으면 소풍 갈 거야.’ → 정말 맑을 수도 있다 (가능한 일)',
    '‘내가 새라면 너에게 날아갈 텐데.’ → 실제로 나는 {{새가 아니다}} — 우리말도 ‘~할 텐데’로 현실과 다르다는 것을 표시한다.'], m),
  ...D.step(2, '이전 단원 복습 — 조건의 if', [
    'If it rains tomorrow, I {{will}} stay home. → 내일 일이라도 if절은 {{현재}}시제 (단순 조건문)'], m),
  ...D.step(3, '문제 제기 — 지금 먹고 싶은데 왜 과거형?', [
    '병든 어머니의 말: “It **would** be wonderful if I **could** eat fresh fish.” (본문)',
    '지금 이 순간의 바람인데 왜 will · can이 아니라 would · could일까?'], m),
  ...D.step(4, '규칙 발견 — 시제를 한 칸 뒤로', [
    '현재 사실과 반대 → if절 동사를 {{과거형}}으로 / be동사는 인칭과 관계없이 {{were}}',
    '주절은 would · could · might + {{동사원형}} → 과거형이 ‘현실과 거리가 멀다’는 신호!'], m),
  ...D.step(5, '결론 🔑', [
    '가정법 과거 = 형태는 {{과거}}, 뜻은 {{현재}} 사실의 반대 — ‘만약 ~라면, …할 텐데’'], m),
  ...D.infoBox('오늘의 핵심 3문장', [
    '① If + 주어 + {{과거동사(were)}}, 주어 + would / could / might + {{동사원형}}',
    '② If I had time, I could go. = As I {{don’t have}} time, I {{can’t}} go.',
    '③ I wish I {{were}} taller. = I’m sorry that I {{am not}} taller.'], m),
  ...D.tip(['STEP 1에서 ‘~할 거야 / ~할 텐데’ 두 문장을 칠판에 쓰고 “진짜 일어날 수 있나?”를 손들기로 묻는다(3분).',
    '본문 문장 It would be wonderful if I could eat fresh fish.를 직설법(As I can’t eat fresh fish, …)으로 되돌려 보며 Point 2로 연결한다.'], m),

  // ---------------- Point 1 ----------------
  D.section('Point 1', '가정법 과거의 형태와 의미 — If + 과거(were), would/could/might + 동사원형', 'point'),
  ...D.table(['구분', '형태', '예'], [
    ['if절', 'If + 주어 + **동사의 과거형** (be동사 → 인칭과 관계없이 **were**)', 'If I **had** wings, … / If Sally **were** here, …'],
    ['주절', '주어 + **would / could / might** + **동사원형**', '…, I **could** fly. / …, she **would** help me.'],
    ['의미', '현재 사실의 반대 · 실현 가능성이 낮은 일 — ‘만약 ~라면, …할 텐데’', 'It **would** be wonderful if I **could** eat fresh fish. (본문)'],
    ['어순', 'if절이 뒤로 가면 콤마 없이 쓴다', 'I **would** call him if I **knew** his phone number.']], [1200, 4300, 4138], m),
  ...D.infoBox('주절 조동사의 뜻 차이', [
    '**would** + 동사원형 → ~할 텐데 (의지·결과)   /   **could** + 동사원형 → ~할 수 있을 텐데 (능력·가능)   /   **might** + 동사원형 → ~할지도 모를 텐데'], m),
  ...D.trick('과거 옷 입은 현재!', ['“모양은 과거, 마음은 지금 — 과거 옷 입은 현재!”', '“I도 were, he도 were — 가정법 be는 누구든 were!”']),
  ...D.examPoint([
    { q: 'If I (have / had) a car, I could drive you home.', a: 'had', why: '현재 사실(차가 없음)의 반대 → 과거형' },
    { q: 'It would be wonderful if I [[could]] eat fresh fish. (본문)', a: 'could', why: '먹을 수 있다면 — can의 과거형' }], m),
  ...D.caution(['if절에 would를 넣은 오답(If I would have …)과 주절에 will을 넣은 혼합 오답이 가장 많이 나온다.',
    '주절 조동사 뒤에 과거형을 쓴 오답(would bought, could flew) — 조동사 뒤는 반드시 동사원형.',
    'if절 be동사는 원칙적으로 were — 학교 시험은 was를 오답으로 처리하는 경우가 대부분이다.'], m),
  ...D.drill(1, '가정법 과거의 형태와 의미', [
    { level: 'Basic ①', type: 'choice', instr: '괄호 안에서 알맞은 것을 고르시오.', items: [
      { q: 'If I (am / were) a bird, I would fly to my grandma’s house.', a: 'were', why: '가정법 be동사 → 인칭 관계없이 were' },
      { q: 'If he (had / has) more free time, he could join our book club.', a: 'had', why: 'if절 동사 과거형' },
      { q: 'If you (lived / live) closer, we could meet every day.', a: 'lived', why: '주절 could → 가정법 과거' },
      { q: 'If she knew the answer, she (will / would) tell us.', a: 'would', why: 'if절 knew → 주절 조동사 과거형' },
      { q: 'If it (is / were) warmer today, we could go swimming.', a: 'were', why: '오늘(현재) 사실의 반대 → were' },
      { q: 'If I lived near the sea, I could (swim / swam) every morning.', a: 'swim', why: '조동사 뒤 동사원형' },
      { q: 'If my mom (is / were) here, she would help me with this.', a: 'were', why: '주절 would → were' },
      { q: 'If we had a map, we (can / could) find the museum easily.', a: 'could', why: '찾을 수 있을 텐데 — can의 과거형' },
      { q: 'If Minho (spoke / speaks) English well, he could be a tour guide.', a: 'spoke', why: 'if절 과거형' },
      { q: 'It (would / will) be wonderful if I could eat fresh fish. (본문)', a: 'would', why: 'if절 could → 주절 would' }] },
    { level: 'Basic ②', type: 'fill', instr: '<보기>에서 알맞은 말을 골라 빈칸에 쓰시오. (한 번씩만 사용)',
      bogi: ['might', 'ate', 'were', 'eat', 'knew', 'could', 'snowed', 'had', 'lived', 'would'], items: [
      { q: 'If I [[were]] you, I would apologize to her first.', why: 'If I were you — be동사 were' },
      { q: 'If we [[had]] wings, we could fly over the mountains.', why: 'have의 과거형' },
      { q: 'If she knew his number, she [[would]] call him right now. (지금 바로 전화할 텐데)', why: '~할 텐데 → would' },
      { q: 'If I had a lot of money, I [[could]] buy a house for my parents. (살 수 있을 텐데)', why: '~할 수 있을 텐데 → could' },
      { q: 'If it [[snowed]] today, we might build a snowman.', why: 'snow의 과거형' },
      { q: 'If they practiced more, they [[might]] win the game. (이길지도 모를 텐데)', why: '~할지도 모를 텐데 → might' },
      { q: 'If my brother [[knew]] the truth, he would be angry.', why: 'know의 과거형' },
      { q: 'If Jisu [[lived]] in Seoul, we could meet more often.', why: 'live의 과거형' },
      { q: 'If you [[ate]] more vegetables, you would be healthier.', why: 'eat의 과거형' },
      { q: 'It would be wonderful if I could [[eat]] fresh fish. (본문)', why: '조동사 could 뒤 동사원형' }] },
    { level: 'Intermediate', type: 'write', instr: '어법상 틀린 부분을 찾아 바르게 고쳐 쓰시오. (우리말 뜻이 있으면 그 뜻에 맞출 것)', items: [
      { q: 'If I am you, I would take the bus.', a: 'am → were', why: '가정법 be동사 were' },
      { q: 'If he has a car, he could drive us to the station. (그가 차가 있다면 우리를 역까지 태워 줄 수 있을 텐데.)', a: 'has → had', why: '주절 could → if절 과거형' },
      { q: 'If we lived on the moon, we will feel very light. (우리가 달에 산다면 몸이 아주 가볍게 느껴질 텐데.)', a: 'will → would', why: 'if절 lived → 주절 would' },
      { q: 'If she were rich, she would bought a big house.', a: 'bought → buy', why: '조동사 뒤 동사원형' },
      { q: 'If I would know her address, I would visit her.', a: 'would know → knew', why: 'if절에는 would ✗ → 과거형' },
      { q: 'If it weren’t so hot, we can go hiking. (이렇게 덥지 않다면 하이킹을 갈 수 있을 텐데.)', a: 'can → could', why: '가정법 주절 조동사 과거형' },
      { q: 'If my sister were here, she helps me. (언니가 여기 있다면 나를 도와줄 텐데.)', a: 'helps → would help', why: '주절 = would + 동사원형' },
      { q: 'If you get up earlier, you wouldn’t be late for school. (네가 더 일찍 일어난다면 학교에 늦지 않을 텐데.)', a: 'get → got', why: '주절 wouldn’t → if절 과거형' },
      { q: 'If Tom were taller, he could reaches the top shelf.', a: 'reaches → reach', why: '조동사 뒤 동사원형' },
      { q: 'It would be wonderful if I can eat fresh fish.', a: 'can → could', why: '본문 — 가정법 if절 could' }] },
    { level: 'Advanced · 모두 고르기', type: 'multi', free: true, instr: '해당하는 것을 모두 골라 기호를 쓰시오.', items: [
      { q: '다음 중 어법상 옳은 문장을 모두 고르시오.', box: [
        '(a) If I were a cat, I would sleep all day.', '(b) If she has time, she would visit us.', '(c) If we had a boat, we could cross the river.',
        '(d) If he were here, he will help me.', '(e) If I knew the answer, I would told you.'], a: '(a), (c)', why: '(b) has → had (d) will → would (e) told → tell' },
      { q: '다음 중 밑줄 친 부분에 대한 설명으로 옳은 것을 모두 고르시오.', box: [
        '(a) If I __were__ you, … → 주어가 I이므로 was로 고쳐야 한다.',
        '(b) It __would be__ wonderful if I could eat fresh fish. → 현재 사실의 반대를 나타낸다.',
        '(c) If he __had__ a bike, … → 과거 사실의 반대를 나타낸다.',
        '(d) If she lived near a pool, she __could__ swim every day. → ‘~할 수 있을 텐데’로 해석한다.',
        '(e) If it __were__ sunny, we would go out. → 실제로는 지금 맑지 않다는 뜻이다.'], a: '(b), (d), (e)', why: '(a) 가정법은 인칭 관계없이 were (c) 형태는 과거, 뜻은 현재의 반대' },
      { q: '다음 대화의 밑줄 친 ⓐ~ⓔ 중 어법상 어색한 것을 모두 골라 기호를 쓰고 바르게 고치시오.', fix: true, label: '기호 / 고친 것', box: [
        'A: What would you do if you ⓐ __were__ a superhero?', 'B: If I ⓑ __have__ great powers, I ⓒ __would help__ people in danger. What about you?',
        'A: If I ⓓ __can__ fly, I would travel around the world.', 'B: That ⓔ __would be__ amazing!'],
        a: 'ⓑ have → had, ⓓ can → could', why: 'ⓑ 주절 would help → if절 과거형 ⓓ 주절 would → if절 can의 과거형 could' },
      { q: '다음 중 현재 사실과 반대되는 상황을 가정하는 문장을 모두 고르시오.', box: [
        '(a) If I were a bird, I could fly to you.', '(b) If it rains tomorrow, I will stay home.', '(c) It would be great if I could speak French.',
        '(d) If you need help, call me.', '(e) If she had a pet, she wouldn’t feel lonely.'], a: '(a), (c), (e)', why: '(b)(d) 일어날 수 있는 일 — 단순 조건문' },
      { q: '우리말과 영어가 바르게 짝지어진 것을 모두 고르시오.', box: [
        '(a) 내가 너라면 → if I am you', '(b) 그녀가 답을 안다면 → if she knew the answer', '(c) 우리에게 돈이 있다면 → if we had money',
        '(d) 나는 날 수 있을 텐데 → I can fly', '(e) 신선한 물고기를 먹을 수 있다면 → if I could eat fresh fish'], a: '(b), (c), (e)', why: '(a) if I were you (d) I could fly' }] },
    { level: 'Advanced · 객관식', type: 'mcq', free: true, instr: '알맞은 답을 고르시오.', items: [
      { q: '빈칸에 들어갈 말로 알맞은 것은? — If I ________ a million dollars, I would build a school for poor children.', opts: ['have', 'will have', 'has', 'had', 'having'], a: '④', why: '주절 would build → if절 과거형' },
      { q: '다음 중 어법상 틀린 문장의 개수는?', box: ['(a) If I were you, I wouldn’t go there.', '(b) If he knew her, he would say hello.', '(c) If we have more time, we could stay longer.',
        '(d) If she were older, she can drive a car.', '(e) If it were sunny, we would go on a picnic.'], opts: ['1개', '2개', '3개', '4개', '5개'], a: '②', why: '(c) have → had (d) can → could' },
      { q: '다음 우리말을 영어로 바르게 옮긴 것은? — ‘내가 새라면 하늘 높이 날 수 있을 텐데.’', opts: [
        'If I am a bird, I can fly high in the sky.', 'If I were a bird, I will fly high in the sky.', 'If I were a bird, I could flew high in the sky.',
        'If I would be a bird, I could fly high in the sky.', 'If I were a bird, I could fly high in the sky.'], a: '⑤', why: 'If + were, could + 동사원형' },
      { q: '(A)~(C)에 알맞은 말이 바르게 짝지어진 것은? — (A) If Sally ( is / were ) here, she would help me. (B) If I had wings, I ( can / could ) fly. (C) It would be wonderful if I could ( eat / ate ) fresh fish.', opts: [
        'is – can – eat', 'were – could – eat', 'were – can – ate', 'is – could – ate', 'were – could – ate'], a: '②', why: 'were / could / 조동사 뒤 동사원형 eat' },
      { q: '다음 중 밑줄 친 could의 쓰임이 나머지 넷과 다른 것은?', opts: [
        'If I had time, I __could__ help you.', 'If he were here, he __could__ fix it.', 'When I was five, I __could__ swim.',
        'It would be nice if we __could__ meet.', 'If she studied harder, she __could__ pass.'], a: '③', why: '③ 과거의 능력(~할 수 있었다) / 나머지 가정법' }] },
    { level: '전환 · 연결', type: 'write', instr: '주어진 말을 이용하여 가정법 과거 문장을 완성하시오. (동사의 형태를 바꿀 것)', items: [
      { q: '(I / be / a famous singer) + (I / hold / a free concert · would)', a: 'If I were a famous singer, I would hold a free concert.', why: 'be → were' },
      { q: '(we / have / a garden) + (we / grow / tomatoes · could)', a: 'If we had a garden, we could grow tomatoes.', why: 'have → had' },
      { q: '(he / know / the password) + (he / open / the file · could)', a: 'If he knew the password, he could open the file.', why: 'know → knew' },
      { q: '(it / be / Saturday) + (I / sleep / late · would)', a: 'If it were Saturday, I would sleep late.', why: 'be → were' },
      { q: '(she / live / in Jeju) + (she / go / to the beach every day · could)', a: 'If she lived in Jeju, she could go to the beach every day.', why: 'live → lived' },
      { q: '(I / have / a time machine) + (I / visit / the Joseon dynasty · would)', a: 'If I had a time machine, I would visit the Joseon dynasty.', why: 'have → had' },
      { q: '(my dog / can / talk) + (it / tell / me its secrets · would)', a: 'If my dog could talk, it would tell me its secrets.', why: 'can → could' },
      { q: '(they / practice / harder) + (they / win / the final · might)', a: 'If they practiced harder, they might win the final.', why: 'practice → practiced' },
      { q: '(you / be / here) + (you / see / the beautiful lotus flowers · could)', a: 'If you were here, you could see the beautiful lotus flowers.', why: 'be → were' },
      { q: '주절을 앞에: (it / be / wonderful · would) + (I / can / eat / fresh fish)', a: 'It would be wonderful if I could eat fresh fish.', why: '본문 — if절이 뒤로 가면 콤마 없음' }] },
  ], m),

  // ---------------- Point 2 ----------------
  D.section('Point 2', '직설법 ↔ 가정법 과거 전환 — As(Because) ~ not ↔ If ~', 'point'),
  ...D.table(['방향', '바꾸는 법', '예'], [
    ['가정법 → 직설법', '① If → **As / Because**  ② 과거 → **현재**  ③ 긍정 ↔ **부정** 뒤집기  ④ could → **can**', 'If I knew the answer, I could tell you. → As I **don’t know** the answer, I **can’t** tell you.'],
    ['직설법 → 가정법', '① As / Because → **If**  ② 현재 → **과거** (be → were)  ③ 긍정 ↔ 부정  ④ can → **could**', 'As he isn’t tall, he can’t reach the shelf. → If he **were** tall, he **could** reach the shelf.'],
    ['not 뒤집기', 'not이 있으면 빼고, 없으면 넣는다 (양쪽 절 모두)', 'As I **am** busy, I **can’t** go. → If I **weren’t** busy, I **could** go.'],
    ['so 연결', '원인, so 결과 → If + 원인 반대, 결과 반대', 'I don’t have a pet, so I feel lonely. → If I **had** a pet, I **wouldn’t** feel lonely.']], [1700, 3900, 4038], m),
  ...D.trick('한 칸 뒤로, 한 번 뒤집기!', ['“시제는 한 칸 뒤로, not은 한 번 뒤집기!”', '“현실(As)은 현재, 상상(If)은 과거 — 현재 현실, 과거 상상!”']),
  ...D.examPoint([
    { q: 'As I don’t have a map, I can’t find the way. = If I {{had}} a map, I {{could}} find the way.', why: '현재 → 과거, 부정 → 긍정' },
    { q: 'If it were not rainy, we could go out. = As it {{is}} rainy, we {{can’t}} go out.', why: '과거 → 현재, 긍정·부정 뒤집기' }], m),
  ...D.caution(['직설법으로 바꿀 때 과거시제(As I didn’t have …, I couldn’t …)로 쓰는 오답 — 가정법 과거는 현재 사실이므로 직설법은 현재시제.',
    '한쪽 절만 부정을 뒤집은 선지(As I don’t have time, I can go.)가 ‘의미가 같은 것’ 문항의 단골 오답이다.',
    '부정문 속 any → 긍정문 some 변화(can’t catch any fish ↔ could catch some fish)도 서술형 감점 포인트.'], m),
  ...D.drill(2, '직설법 ↔ 가정법 과거 전환', [
    { level: 'Basic ①', type: 'choice', instr: '두 문장의 뜻이 같도록 괄호 안에서 알맞은 것을 고르시오.', items: [
      { q: 'If I had a bike, I could ride to school. = As I (don’t have / didn’t have) a bike, I can’t ride to school.', a: 'don’t have', why: '가정법 과거 → 직설법 현재' },
      { q: 'As she is sick, she can’t go to the party. = If she (weren’t / isn’t) sick, she could go to the party.', a: 'weren’t', why: '현재 긍정 → 과거 부정' },
      { q: 'If he knew her name, he could call her. = As he (knew / doesn’t know) her name, he can’t call her.', a: 'doesn’t know', why: '과거 긍정 → 현재 부정' },
      { q: 'As I don’t have time, I can’t help you. = If I (have / had) time, I could help you.', a: 'had', why: '직설법 현재 부정 → 가정법 과거 긍정' },
      { q: 'If it were warm, we could swim. = As it (isn’t / wasn’t) warm, we can’t swim.', a: 'isn’t', why: '직설법은 현재시제' },
      { q: 'As we live far away, we can’t visit often. = If we (lived / didn’t live) far away, we could visit often.', a: 'didn’t live', why: '긍정 → 부정 뒤집기' },
      { q: 'If you were tall enough, you could ride the roller coaster. = As you aren’t tall enough, you (couldn’t / can’t) ride it.', a: 'can’t', why: '직설법 현재 → can’t' },
      { q: 'As Minji is busy, she can’t join us. = If Minji (weren’t / were) busy, she could join us.', a: 'weren’t', why: 'is → weren’t (부정 뒤집기)' },
      { q: 'If I had a brother, I could play with him. = (As / If) I don’t have a brother, I can’t play with him.', a: 'As', why: '직설법 = As(Because) + 현재' },
      { q: 'As the river is frozen, the man can’t catch any fish. = If the river (is not / were not) frozen, the man could catch some fish.', a: 'were not', why: '본문 상황 — 가정법 be동사 were' }] },
    { level: 'Basic ②', type: 'fill', instr: '두 문장의 뜻이 같도록 <보기>에서 알맞은 말을 골라 빈칸에 쓰시오. (한 번씩만 사용)',
      bogi: ['isn’t', 'spoke', 'can’t', 'didn’t', 'knew', 'wouldn’t', 'is', 'weren’t', 'could', 'doesn’t'], items: [
      { q: 'As I don’t know the answer, I can’t tell you. = If I [[knew]] the answer, I could tell you.', why: '현재 부정 → 과거 긍정' },
      { q: 'If he were not shy, he could make many friends. = As he [[is]] shy, he can’t make many friends.', why: '과거 부정 → 현재 긍정' },
      { q: 'As we don’t have a car, we can’t go camping. = If we had a car, we [[could]] go camping.', why: 'can’t → could' },
      { q: 'If I had enough money, I could buy the sneakers. = As I don’t have enough money, I [[can’t]] buy the sneakers.', why: 'could → can’t' },
      { q: 'As it is raining, I can’t play soccer. = If it [[weren’t]] raining, I could play soccer.', why: 'is → weren’t' },
      { q: 'If she lived near here, she could walk to school. = As she [[doesn’t]] live near here, she can’t walk to school.', why: '3인칭 단수 현재 부정' },
      { q: 'As my dad works late, he can’t eat dinner with us. = If my dad [[didn’t]] work late, he could eat dinner with us.', why: 'works → didn’t work' },
      { q: 'If Tom were here, he could help us. = As Tom [[isn’t]] here, he can’t help us.', why: 'were → isn’t' },
      { q: 'I don’t have a pet, so I feel lonely. = If I had a pet, I [[wouldn’t]] feel lonely.', why: '긍정 feel → 부정 wouldn’t feel' },
      { q: 'As you don’t speak Chinese, you can’t talk with them. = If you [[spoke]] Chinese, you could talk with them.', why: 'speak의 과거형' }] },
    { level: 'Intermediate', type: 'write', instr: '두 문장의 뜻이 같도록 할 때, 두 번째 문장에서 틀린 부분을 찾아 바르게 고쳐 쓰시오.', items: [
      { q: 'As I don’t have wings, I can’t fly. = If I have wings, I could fly.', a: 'have → had', why: '가정법 과거 if절 과거형' },
      { q: 'If I were rich, I could travel the world. = As I am rich, I can’t travel the world.', a: 'am → am not', why: '긍정 ↔ 부정 뒤집기' },
      { q: 'As he isn’t here, he can’t help me. = If he were here, he can help me.', a: 'can → could', why: '가정법 주절 조동사 과거형' },
      { q: 'If she knew the way, she could guide us. = As she didn’t know the way, she can’t guide us.', a: 'didn’t know → doesn’t know', why: '직설법은 현재시제' },
      { q: 'As it is cold, we can’t go out. = If it were cold, we could go out.', a: 'were → weren’t', why: '긍정 → 부정 뒤집기' },
      { q: 'If I had a smartphone, I could take photos. = As I don’t have a smartphone, I couldn’t take photos.', a: 'couldn’t → can’t', why: '직설법 현재' },
      { q: 'As we don’t have a ladder, we can’t reach the roof. = If we don’t have a ladder, we could reach the roof.', a: 'don’t have → had', why: '현재 부정 → 과거 긍정' },
      { q: 'If he were not sick, he could go hiking. = Because he is not sick, he can’t go hiking.', a: 'is not → is', why: '부정 → 긍정 뒤집기' },
      { q: 'As I am not a bird, I can’t fly to you. = If I am a bird, I could fly to you.', a: 'am → were', why: '가정법 be동사 were' },
      { q: 'If my brother cleaned his room, my mom wouldn’t be upset. = As my brother doesn’t clean his room, my mom is not upset.', a: 'is not → is', why: 'wouldn’t be → is (부정 → 긍정)' }] },
    { level: 'Advanced · 모두 고르기', type: 'multi', free: true, instr: '해당하는 것을 모두 골라 기호를 쓰시오.', items: [
      { q: '다음 중 두 문장의 뜻이 같은 것을 모두 고르시오.', box: [
        '(a) If I had time, I could go. = As I don’t have time, I can’t go.', '(b) If she were here, she could help. = As she is here, she can help.',
        '(c) If it were sunny, we could play outside. = As it wasn’t sunny, we couldn’t play outside.', '(d) As he doesn’t know it, he can’t tell us. = If he knew it, he could tell us.',
        '(e) As I’m busy, I can’t join you. = If I weren’t busy, I could join you.'], a: '(a), (d), (e)', why: '(b) isn’t here (c) 직설법은 현재 isn’t / can’t' },
      { q: '다음 중 밑줄 친 부분에 대한 설명으로 옳은 것을 모두 고르시오.', box: [
        '(a) If I __knew__ the answer, … → As I don’t know the answer로 바꿀 수 있다.',
        '(b) If it __were__ not cold, … → 실제로는 지금 춥다는 뜻이다.',
        '(c) As he __isn’t__ here, … → 가정법으로 바꾸면 If he weren’t here가 된다.',
        '(d) As I don’t have a car, I __can’t__ drive. → 가정법으로 바꾸면 couldn’t가 된다.',
        '(e) If she __had__ a key, … → 직설법으로 바꾸면 현재시제 doesn’t have가 된다.'], a: '(a), (b), (e)', why: '(c) If he were here (d) could (부정 → 긍정)' },
      { q: '다음 글의 밑줄 친 ⓐ~ⓔ 중 어법상 어색한 것을 모두 골라 기호를 쓰고 바르게 고치시오.', fix: true, label: '기호 / 고친 것', box: [
        'My friend said, “As I ⓐ __don’t have__ a dog, I can’t take a walk with one.” I said, “If you ⓑ __have__ a dog, you ⓒ __could__ walk with it every day. But as you ⓓ __live__ in a small apartment, you ⓔ __couldn’t__ keep a big dog.”'],
        a: 'ⓑ have → had, ⓔ couldn’t → can’t', why: 'ⓑ 가정법 if절 과거형 ⓔ as절(직설법 현재)의 결과 → can’t' },
      { q: '다음 중 직설법 문장을 가정법 과거로 바르게 바꾼 것을 모두 고르시오.', box: [
        '(a) As he lives far away, I can’t see him. → If he lived far away, I could see him.', '(b) As I am not tall, I can’t reach it. → If I were tall, I could reach it.',
        '(c) As it is snowing, we can’t drive. → If it weren’t snowing, we could drive.', '(d) As I don’t know her, I can’t invite her. → If I knew her, I can invite her.',
        '(e) As we don’t have a ball, we can’t play. → If we had a ball, we could play.'], a: '(b), (c), (e)', why: '(a) didn’t live (d) could invite' },
      { q: '두 문장의 뜻이 같도록 할 때, 빈칸에 not(n’t)이 들어가야 하는 것을 모두 고르시오.', box: [
        '(a) As I am tired, I can’t go out. = If I were ______ tired, I could go out.', '(b) As she doesn’t have money, she can’t buy it. = If she had ______ money, she could buy it.',
        '(c) As he is busy, he can’t help us. = If he were ______ busy, he could help us.', '(d) If it were sunny, we could go on a picnic. = As it is ______ sunny, we can’t go on a picnic.',
        '(e) As I don’t know his address, I can’t write to him. = If I knew ______ his address, I could write to him.'], a: '(a), (c), (d)', why: '(b)(e) 직설법 부정 → 가정법 긍정이므로 not 불필요' }] },
    { level: 'Advanced · 객관식', type: 'mcq', free: true, instr: '알맞은 답을 고르시오.', items: [
      { q: '다음 문장과 의미가 같은 것은? — If I had a camera, I could take pictures of the lotus flowers.', opts: [
        'As I have a camera, I can take pictures of the lotus flowers.', 'As I had a camera, I could take pictures of the lotus flowers.',
        'As I don’t have a camera, I can’t take pictures of the lotus flowers.', 'As I didn’t have a camera, I couldn’t take pictures of the lotus flowers.',
        'As I don’t have a camera, I can take pictures of the lotus flowers.'], a: '③', why: '현재시제 + 양쪽 부정' },
      { q: '다음 문장을 가정법 과거로 바르게 바꾼 것은? — As Jiho is not here, he can’t help us.', opts: [
        'If Jiho is here, he can help us.', 'If Jiho were not here, he could help us.', 'If Jiho was not here, he can help us.',
        'If Jiho would be here, he could help us.', 'If Jiho were here, he could help us.'], a: '⑤', why: 'is not → were, can’t → could' },
      { q: '빈칸 (A), (B)에 들어갈 말이 바르게 짝지어진 것은? — As I ( A ) a key, I can’t open the door. = If I had a key, I ( B ) open the door.', opts: [
        'don’t have – could', 'didn’t have – could', 'don’t have – can', 'have – could', 'didn’t have – would'], a: '①', why: '직설법 현재 부정 / 가정법 could' },
      { q: '다음 중 두 문장의 의미가 같지 않은 것은?', opts: [
        'If he were rich, he could buy it. = As he isn’t rich, he can’t buy it.', 'If we had time, we could talk. = As we don’t have time, we can’t talk.',
        'If it weren’t hot, I could run. = As it is hot, I can’t run.', 'If she knew him, she could ask him. = As she knows him, she can’t ask him.',
        'If I lived in Busan, I could see the sea every day. = As I don’t live in Busan, I can’t see the sea every day.'], a: '④', why: '④ As she doesn’t know him' },
      { q: '다음 중 두 문장의 뜻이 같은 것의 개수는?', box: [
        '(a) As I don’t have a pen, I can’t write. = If I had a pen, I could write.', '(b) If he were kind, he could have many friends. = As he is kind, he can’t have many friends.',
        '(c) As it is late, we can’t go. = If it were late, we could go.', '(d) If I knew it, I could tell you. = As I didn’t know it, I couldn’t tell you.',
        '(e) As she is sick, she can’t come. = If she weren’t sick, she could come.'], opts: ['1개', '2개', '3개', '4개', '5개'], a: '②', why: '(a)(e) / (b) isn’t kind (c) weren’t late (d) 현재시제' }] },
    { level: '전환 · 연결', type: 'write', instr: '직설법 문장은 If를 사용한 가정법 과거로, 가정법 과거 문장은 As를 사용한 직설법으로 바꾸어 쓰시오.', items: [
      { q: 'As I don’t have a ticket, I can’t see the concert.', a: 'If I had a ticket, I could see the concert.', why: '현재 부정 → 과거 긍정' },
      { q: 'If she were not tired, she could study more.', a: 'As she is tired, she can’t study more.', why: '과거 부정 → 현재 긍정' },
      { q: 'As it is too dark, we can’t see the stars.', a: 'If it weren’t too dark, we could see the stars.', why: 'is → weren’t' },
      { q: 'If I knew how to swim, I could join the swimming club.', a: 'As I don’t know how to swim, I can’t join the swimming club.', why: 'knew → don’t know' },
      { q: 'Because my sister is sick, she can’t go to school.', a: 'If my sister weren’t sick, she could go to school.', why: 'Because도 As처럼 전환' },
      { q: 'If we lived in the country, we could have a big dog.', a: 'As we don’t live in the country, we can’t have a big dog.', why: 'lived → don’t live' },
      { q: 'As he doesn’t have a passport, he can’t travel abroad.', a: 'If he had a passport, he could travel abroad.', why: 'doesn’t have → had' },
      { q: 'If the river weren’t frozen, the man could catch fish.', a: 'As the river is frozen, the man can’t catch (any) fish.', why: '본문 상황 — weren’t → is' },
      { q: 'I am not good at drawing, so I can’t paint Munjado.', a: 'If I were good at drawing, I could paint Munjado.', why: 'so 연결 → If + 원인 반대' },
      { q: 'If you were my classmate, we could play together every day.', a: 'As you aren’t my classmate, we can’t play together every day.', why: 'were → aren’t' }] },
  ], m),

  // ---------------- Point 3 ----------------
  D.section('Point 3', 'I wish + 가정법 과거 (↔ I’m sorry that) · as if', 'point'),
  ...D.table(['형태', '뜻', '직설법으로'], [
    ['I wish + 주어 + **과거동사 (were)**', '~라면 좋을 텐데 (지금 이룰 수 없는 소망)', 'I wish I **had** a sister. = I’m sorry that I **don’t have** a sister.'],
    ['I wish + 주어 + **could** + 동사원형', '~할 수 있으면 좋을 텐데', 'I wish I **could** fly. = I’m sorry that I **can’t** fly.'],
    ['as if + 주어 + **과거동사 (were)**', '마치 ~인 것처럼 (실제로는 아님)', 'He talks **as if** he **were** a doctor. = In fact, he **isn’t** a doctor.']], [3300, 2900, 3438], m),
  ...D.infoBox('I hope vs. I wish', [
    '**I hope** + 현재(미래) → 실현 가능한 바람: I hope it **is** sunny tomorrow.',
    '**I wish** + 과거 → 현실과 반대인 바람: I wish it **were** sunny now. (지금 맑지 않음)'], m),
  ...D.trick('호가 위불!', ['“hope는 가능, wish는 불가능 — 호가 위불!”', '“wish 뒤엔 과거로 쉬~익! (I wish I were …)”']),
  ...D.examPoint([
    { q: 'I wish I (have / had) a younger brother.', a: 'had', why: 'I wish + 과거 (현재 소망)' },
    { q: 'I’m sorry that I can’t speak Chinese. = I wish I {{could}} speak Chinese.', why: 'can’t → could (부정 → 긍정)' }], m),
  ...D.caution(['I wish 뒤에 현재형·will·can을 쓴 오답, I hope + 과거(I hope I were …)를 섞은 오답이 짝으로 나온다.',
    'I wish → I’m sorry that 전환: 시제는 현재, 긍정·부정은 반대(I wish I were → I’m sorry that I am not).',
    'as if + were — ‘실제로는 아니다’라는 문맥 문장(In fact, …)과 함께 출제된다.'], m),
  ...D.drill(3, 'I wish 가정법 과거 · as if', [
    { level: 'Basic ①', type: 'choice', instr: '괄호 안에서 알맞은 것을 고르시오.', items: [
      { q: 'I wish I (have / had) a big brother.', a: 'had', why: 'I wish + 과거형' },
      { q: 'I wish my grandma (is / were) healthy now.', a: 'were', why: 'I wish + were' },
      { q: 'I wish I (could / can) speak French.', a: 'could', why: 'I wish + could + 동사원형' },
      { q: 'I (wish / hope) it will be sunny tomorrow.', a: 'hope', why: '실현 가능한 바람 + will → hope' },
      { q: 'I wish we (live / lived) closer to the beach.', a: 'lived', why: 'I wish + 과거형' },
      { q: 'I’m sorry that I (am not / weren’t) taller. = I wish I were taller.', a: 'am not', why: 'I’m sorry that + 직설법 현재' },
      { q: 'He talks as if he (were / is) a famous chef. In fact, he isn’t a chef.', a: 'were', why: '실제로 아님 → as if + were' },
      { q: 'I wish my dog (can / could) understand me.', a: 'could', why: 'I wish + could' },
      { q: 'I wish it (will be / were) Friday today.', a: 'were', why: '오늘(현재)과 반대 → were' },
      { q: 'The sick mother said, “I wish I (could / can) eat fresh fish.”', a: 'could', why: '본문 상황 — I wish + could' }] },
    { level: 'Basic ②', type: 'fill', instr: '<보기>에서 알맞은 말을 골라 빈칸에 쓰시오. (한 번씩만 사용)',
      bogi: ['lived', 'don’t', 'wish', 'could', 'isn’t', 'hope', 'were', 'can’t', 'if', 'had'], items: [
      { q: 'I wish I [[were]] good at dancing.', why: 'I wish + were' },
      { q: 'I wish my parents [[had]] more free time.', why: 'have의 과거형' },
      { q: 'I wish I [[could]] go to the concert with you.', why: 'I wish + could + 동사원형' },
      { q: 'I’m sorry that I [[don’t]] have a pet. = I wish I had a pet.', why: '직설법 현재 부정' },
      { q: 'I [[hope]] you get well soon.', why: '실현 가능한 바람 + 현재 → hope' },
      { q: 'She acts as [[if]] she were a princess.', why: 'as if + 과거' },
      { q: 'I wish my sister [[lived]] with us.', why: 'live의 과거형' },
      { q: 'I’m sorry that I [[can’t]] swim. = I wish I could swim.', why: 'could ↔ can’t' },
      { q: 'I [[wish]] I knew the answer to this question.', why: '과거형 knew → wish' },
      { q: 'I’m sorry that he [[isn’t]] here. = I wish he were here.', why: 'were ↔ isn’t' }] },
    { level: 'Intermediate', type: 'write', instr: '어법상 틀린 부분을 찾아 바르게 고쳐 쓰시오.', items: [
      { q: 'I wish I have a sister.', a: 'have → had', why: 'I wish + 과거형' },
      { q: 'I wish my best friend is in my class.', a: 'is → were', why: 'I wish + were' },
      { q: 'I wish I can play the guitar well.', a: 'can → could', why: 'I wish + could' },
      { q: 'I wish I were taller. = I’m sorry that I was not taller.', a: 'was not → am not', why: '직설법은 현재시제' },
      { q: 'I hope I were a famous singer.', a: 'hope → wish', why: '현실과 반대(were) → wish' },
      { q: 'I’m sorry that I can’t drive. = I wish I couldn’t drive.', a: 'couldn’t → could', why: '부정 → 긍정 뒤집기' },
      { q: 'I wish I don’t have so much homework.', a: 'don’t have → didn’t have', why: 'I wish + 과거형' },
      { q: 'He acts as if he is a king. (실제로 그는 왕이 아니다.)', a: 'is → were', why: '실제와 반대 → as if + were' },
      { q: 'I wish I will be at home now.', a: 'will be → were', why: 'now — 현재 반대 → were' },
      { q: 'I’m sorry that I don’t know her phone number. = I wish I know her phone number.', a: 'know → knew', why: 'I wish + 과거형' }] },
    { level: 'Advanced · 모두 고르기', type: 'multi', free: true, instr: '해당하는 것을 모두 골라 기호를 쓰시오.', items: [
      { q: '다음 중 어법상 옳은 문장을 모두 고르시오.', box: [
        '(a) I wish I could fly.', '(b) I wish she is my sister.', '(c) I hope it snows tomorrow.', '(d) I wish I had more time.', '(e) I wish I can go there.'],
        a: '(a), (c), (d)', why: '(b) is → were (e) can → could' },
      { q: '다음 중 밑줄 친 부분에 대한 설명으로 옳은 것을 모두 고르시오.', box: [
        '(a) I wish I __had__ a dog. → 과거에 개가 없었던 것을 아쉬워한다.',
        '(b) I wish I __were__ taller. → 주어가 I라도 were를 쓸 수 있다.',
        '(c) I __wish__ I could swim. → I’m sorry that I can’t swim과 뜻이 같다.',
        '(d) I __hope__ you pass the test. → 실현 가능한 일을 바라는 것이다.',
        '(e) He talks __as if__ he were rich. → 실제로 그는 부자이다.'], a: '(b), (c), (d)', why: '(a) 현재 개가 없음 (e) 실제로는 부자가 아님' },
      { q: '다음 대화의 밑줄 친 ⓐ~ⓔ 중 어법상 어색한 것을 모두 골라 기호를 쓰고 바르게 고치시오.', fix: true, label: '기호 / 고친 것', box: [
        'A: I wish I ⓐ __had__ a robot.', 'B: Why?', 'A: If I had one, it ⓑ __will__ do my homework.', 'B: Ha-ha! I wish I ⓒ __can__ go back in time.',
        'A: Where would you go?', 'B: I ⓓ __would__ visit the Joseon dynasty. I ⓔ __hope__ I could meet King Sejong.'],
        a: 'ⓑ will → would, ⓒ can → could, ⓔ hope → wish', why: 'ⓑ 가정법 주절 would ⓒ I wish + could ⓔ could(현실과 반대) → wish' },
      { q: '다음 중 I’m sorry that으로 바르게 바꾼 것을 모두 고르시오.', box: [
        '(a) I wish I knew the answer. → I’m sorry that I don’t know the answer.', '(b) I wish he were here. → I’m sorry that he was not here.',
        '(c) I wish I could ride a horse. → I’m sorry that I can’t ride a horse.', '(d) I wish we had a car. → I’m sorry that we have a car.',
        '(e) I wish it weren’t so cold. → I’m sorry that it is so cold.'], a: '(a), (c), (e)', why: '(b) is not (d) don’t have' },
      { q: '빈칸에 were가 들어갈 수 있는 것을 모두 고르시오.', box: [
        '(a) I hope she ______ OK.', '(b) I wish I ______ a bird.', '(c) I’m sorry that he ______ not here.',
        '(d) He acts as if he ______ my boss.', '(e) If I ______ you, I would say sorry.'], a: '(b), (d), (e)', why: '(a) is (c) is — hope · I’m sorry that 뒤는 직설법' }] },
    { level: 'Advanced · 객관식', type: 'mcq', free: true, instr: '알맞은 답을 고르시오.', items: [
      { q: '다음 문장과 의미가 같은 것은? — I’m sorry that I don’t have a smartphone.', opts: [
        'I wish I have a smartphone.', 'I wish I didn’t have a smartphone.', 'I hope I had a smartphone.', 'I wish I had a smartphone.', 'I wish I will have a smartphone.'], a: '④', why: '현재 부정 → I wish + 과거 긍정' },
      { q: '빈칸에 들어갈 말로 알맞은 것은? — I wish I ________ speak English like a native speaker.', opts: ['could', 'can', 'will', 'am', 'have'], a: '①', why: 'I wish + could + 동사원형' },
      { q: '다음 중 어법상 틀린 문장의 개수는?', box: ['(a) I wish I were a cat.', '(b) I wish you are here.', '(c) She talks as if she knew him.', '(d) I hope I could win.', '(e) I wish I can sing well.'],
        opts: ['1개', '2개', '3개', '4개', '5개'], a: '③', why: '(b) were (d) hope → wish 또는 can (e) could' },
      { q: '(A)~(C)에 알맞은 말이 바르게 짝지어진 것은? — (A) I wish I ( am / were ) older. (B) I ( hope / wish ) you have a great trip. (C) I’m sorry that I ( can’t / couldn’t ) go. = I wish I could go.', opts: [
        'am – hope – can’t', 'were – wish – couldn’t', 'were – hope – can’t', 'am – wish – couldn’t', 'were – hope – couldn’t'], a: '③', why: 'were / 실현 가능 hope / 직설법 현재 can’t' },
      { q: '다음 우리말을 영어로 바르게 옮긴 것은? — ‘내가 그 노래 가사를 모두 안다면 좋을 텐데.’', opts: [
        'I wish I know all the lyrics of the song.', 'I hope I knew all the lyrics of the song.', 'I wish I will know all the lyrics of the song.',
        'I’m sorry that I know all the lyrics of the song.', 'I wish I knew all the lyrics of the song.'], a: '⑤', why: 'I wish + 과거형 knew' }] },
    { level: '전환 · 연결', type: 'write', instr: 'I wish 문장은 I’m sorry that으로, I’m sorry that 문장은 I wish로 바꾸어 쓰시오.', items: [
      { q: 'I’m sorry that I don’t have a bike.', a: 'I wish I had a bike.', why: '현재 부정 → 과거 긍정' },
      { q: 'I wish I were good at math.', a: 'I’m sorry that I am not good at math.', why: 'were → am not' },
      { q: 'I’m sorry that I can’t go to the festival.', a: 'I wish I could go to the festival.', why: 'can’t → could' },
      { q: 'I wish my father didn’t work on weekends.', a: 'I’m sorry that my father works on weekends.', why: 'didn’t work → works' },
      { q: 'I’m sorry that it is so hot today.', a: 'I wish it weren’t so hot today.', why: 'is → weren’t' },
      { q: 'I wish I could understand Chinese characters.', a: 'I’m sorry that I can’t understand Chinese characters.', why: 'could → can’t' },
      { q: 'I’m sorry that my best friend lives in Canada.', a: 'I wish my best friend didn’t live in Canada.', why: 'lives → didn’t live' },
      { q: 'I wish we had more time for lunch.', a: 'I’m sorry that we don’t have more time for lunch.', why: 'had → don’t have' },
      { q: 'I’m sorry that I am not tall enough to ride it.', a: 'I wish I were tall enough to ride it.', why: 'am not → were' },
      { q: 'He talks like a doctor, but in fact he isn’t a doctor. (as if를 사용하여 He talks로 시작)', a: 'He talks as if he were a doctor.', why: '실제와 반대 → as if + were' }] },
  ], m),

  // ---------------- Point 4 ----------------
  D.section('Point 4', '(심화) 단순 조건문 vs. 가정법 과거 · Without = If it were not for', 'point'),
  ...D.table(['구분', '형태', '뜻 / 예'], [
    ['단순 조건문', 'If + 주어 + **현재**, 주어 + **will / can** + 동사원형', '실제로 일어날 수 있는 일 — If it **rains** tomorrow, I **will** stay home.'],
    ['가정법 과거', 'If + 주어 + **과거(were)**, 주어 + **would / could** + 동사원형', '현재 사실의 반대 — If it **were** sunny now, I **would** go out.'],
    ['~이 없다면', '**Without** + 명사 = **If it were not for** + 명사 (= But for)', '**Without** water, we **couldn’t** live. = **If it were not for** water, we couldn’t live.']], [1700, 3900, 4038], m),
  ...D.trick('될 일은 will, 안 될 일은 would!', ['“될 일은 현재·will, 안 될 일은 과거·would!”', '“없으면 큰일 — Without = If it were not for!”']),
  ...D.examPoint([
    { q: 'If it (is / were) fine tomorrow, we will go hiking.', a: 'is', why: '주절 will — 단순 조건문, 미래라도 현재시제' },
    { q: 'If it were not for the Internet, our lives would be boring. = {{Without}} the Internet, our lives would be boring.', why: 'If it were not for = Without' }], m),
  ...D.caution(['tomorrow · next week가 있는 if절에 will을 쓴 오답 — 조건의 부사절은 현재시제로 미래를 나타낸다.',
    '가정법과 조건문을 반씩 섞은 문장(If I were you, I will …)을 고르게 하는 문항이 자주 나온다.',
    'If it were not for에서 is · was를 쓰거나 for를 빠뜨린 오답, Without 뒤에 절을 붙인 오답에 주의.'], m),
  ...D.drill(4, '단순 조건문 vs. 가정법 과거 · Without', [
    { level: 'Basic ①', type: 'choice', instr: '괄호 안에서 알맞은 것을 고르시오.', items: [
      { q: 'If it (rains / rained) tomorrow, I will stay at home.', a: 'rains', why: '주절 will — 조건문 현재시제' },
      { q: 'If I (am / were) you, I would see a doctor.', a: 'were', why: '주절 would — 가정법' },
      { q: 'If you hurry, you (would / will) catch the bus.', a: 'will', why: 'if절 현재 — 단순 조건문' },
      { q: 'If he were here now, he (would / will) know what to do.', a: 'would', why: 'if절 were — 가정법' },
      { q: 'If you (will finish / finish) your homework, you can watch TV.', a: 'finish', why: '조건절은 현재시제' },
      { q: '(With / Without) air, nothing could live on Earth.', a: 'Without', why: '공기가 없다면 — Without' },
      { q: 'If it (were / is) not for music, life would be boring.', a: 'were', why: 'If it were not for' },
      { q: 'If she (calls / called) me later, I’ll tell her the news.', a: 'calls', why: '주절 will — 조건문 현재' },
      { q: 'If I (have / had) a magic lamp, I would make three wishes.', a: 'had', why: '주절 would — 가정법 과거' },
      { q: '(Without / If) your advice, I couldn’t make the right choice.', a: 'Without', why: '뒤에 명사구 → Without' }] },
    { level: 'Basic ②', type: 'fill', instr: '<보기>에서 알맞은 말을 골라 빈칸에 쓰시오. (한 번씩만 사용)',
      bogi: ['will', 'had', 'for', 'snows', 'weren’t', 'finds', 'Without', 'would', 'leave', 'were'], items: [
      { q: 'If it [[snows]] tomorrow, we will make a snowman.', why: '조건문 — 3인칭 단수 현재' },
      { q: 'If I [[were]] the king, I would build more schools.', why: '가정법 be동사 were' },
      { q: '[[Without]] the sun, plants couldn’t grow.', why: '~이 없다면 + 명사' },
      { q: 'If it were not [[for]] my friends, I would feel lonely.', why: 'If it were not for' },
      { q: 'If you [[leave]] now, you’ll get there on time.', why: '조건문 — 주어 you 현재' },
      { q: 'If I were a bird, I [[would]] fly to you.', why: '가정법 주절 would' },
      { q: 'If it is sunny this weekend, we [[will]] go camping.', why: '조건문 주절 will' },
      { q: 'If it [[weren’t]] for the bridge, we couldn’t cross the river.', why: 'If it weren’t for = Without' },
      { q: 'If she [[had]] wings, she could fly to the moon.', why: '가정법 과거' },
      { q: 'If he [[finds]] his wallet, he will be happy.', why: '조건문 — 3인칭 단수 현재' }] },
    { level: 'Intermediate', type: 'write', instr: '어법상 틀린 부분을 찾아 바르게 고쳐 쓰시오. (우리말 뜻이 있으면 그 뜻에 맞출 것)', items: [
      { q: 'If it will rain tomorrow, we will stay home.', a: 'will rain → rains', why: '조건절은 현재시제' },
      { q: 'If it is not for the bus, I couldn’t get to school. (버스가 없다면 …)', a: 'is → were', why: 'If it were not for' },
      { q: 'If I were a fish, I will swim in the ocean. (내가 물고기라면 바다에서 헤엄칠 텐데.)', a: 'will → would', why: '가정법 주절 would' },
      { q: 'If you leave now, you would catch the train. (지금 떠나면 기차를 탈 거야.)', a: 'would → will', why: '일어날 수 있는 일 — 조건문' },
      { q: 'Without the Internet, we can’t find information easily. (인터넷이 없다면 쉽게 찾을 수 없을 텐데.)', a: 'can’t → couldn’t', why: 'Without + 가정법 주절' },
      { q: 'If she has a dog, she would take it everywhere. (그녀가 개가 있다면 어디든 데려갈 텐데.)', a: 'has → had', why: '가정법 if절 과거형' },
      { q: 'If it were not water, all living things would die.', a: 'were not → were not for', why: 'If it were not for + 명사' },
      { q: 'If I find your phone, I would call you. (네 폰을 찾으면 전화할게.)', a: 'would → will', why: '조건문 주절 will' },
      { q: 'If my brother come home early, we will have dinner together.', a: 'come → comes', why: '조건문 — 3인칭 단수 현재' },
      { q: 'If there is no gravity, we would float in the air. (중력이 없다면 우리는 공중에 뜰 텐데.)', a: 'is → were', why: '가정법 be동사 were' }] },
    { level: 'Advanced · 모두 고르기', type: 'multi', free: true, instr: '해당하는 것을 모두 골라 기호를 쓰시오.', items: [
      { q: '다음 중 실제로 일어날 가능성이 있는 일을 나타내는 문장을 모두 고르시오.', box: [
        '(a) If I were taller, I could play basketball.', '(b) If it snows tomorrow, we’ll go skiing.', '(c) If I had a million dollars, I would travel.',
        '(d) If you need a pen, I’ll lend you mine.', '(e) If he calls, tell him I’m out.'], a: '(b), (d), (e)', why: '(a)(c) 가정법 과거 — 현재 사실의 반대' },
      { q: '다음 중 밑줄 친 부분에 대한 설명으로 옳은 것을 모두 고르시오.', box: [
        '(a) __Without__ water, we couldn’t live. → If it were not for water로 바꿀 수 있다.',
        '(b) If it __rains__ tomorrow, … → 미래의 일이므로 will rain으로 고쳐야 한다.',
        '(c) If I __were__ rich, … → 지금 부자가 아니라는 뜻이다.',
        '(d) If it __were not for__ you, … → ‘네가 없다면’의 뜻이다.',
        '(e) If you __hurry__, you will be on time. → 현재 사실의 반대를 가정한다.'], a: '(a), (c), (d)', why: '(b) 조건절 현재시제 (e) 단순 조건문' },
      { q: '다음 글의 밑줄 친 ⓐ~ⓔ 중 어법상 어색한 것을 모두 골라 기호를 쓰고 바르게 고치시오.', fix: true, label: '기호 / 고친 것', box: [
        'My grandma always says, “If it ⓐ __is__ not for family, life ⓑ __would__ be lonely.” I agree. ⓒ __Without__ my family, I couldn’t be happy. If I ⓓ __visit__ her this weekend, I ⓔ __would__ bring her some flowers.'],
        a: 'ⓐ is → were, ⓔ would → will', why: 'ⓐ If it were not for ⓔ 이번 주말 방문 — 조건문 주절 will' },
      { q: '빈칸에 들어갈 수 있는 말을 모두 고르시오. — ________ your help, I couldn’t finish the work.', box: [
        '(a) Without', '(b) If it were not for', '(c) If it is not for', '(d) But for', '(e) With'], a: '(a), (b), (d)', why: '~이 없다면 = Without = If it were not for = But for' },
      { q: '다음 중 어법상 틀린 문장을 모두 고르시오.', box: [
        '(a) If it is sunny tomorrow, we’ll go out.', '(b) If I were you, I wouldn’t do that.', '(c) If she will come, I’ll be happy.',
        '(d) Without music, the world would be boring.', '(e) If it were not for trees, we can’t breathe.'], a: '(c), (e)', why: '(c) comes (e) couldn’t' }] },
    { level: 'Advanced · 객관식', type: 'mcq', free: true, instr: '알맞은 답을 고르시오.', items: [
      { q: '빈칸에 공통으로 알맞은 말은? — If I ________ you, I would say sorry. / If it ________ not for the map, we would get lost.', opts: ['am', 'were', 'is', 'will be', 'be'], a: '②', why: '가정법 be동사 were' },
      { q: '다음 중 어법상 옳은 문장은?', opts: [
        'If it will snow tomorrow, I’ll make a snowman.', 'If I were you, I will take the subway.', 'If it were not for your help, I can’t finish it.',
        'If it is not for the rain, we could play.', 'If he leaves now, he will catch the last bus.'], a: '⑤', why: '① snows ② would ③ couldn’t ④ were' },
      { q: '밑줄 친 부분과 바꿔 쓸 수 있는 것은? — __Without__ smartphones, our lives would be very different.', opts: [
        'If there are smartphones', 'With smartphones', 'If it were not for smartphones', 'If it is not for smartphones', 'Because of smartphones'], a: '③', why: 'Without = If it were not for' },
      { q: '(A)~(C)에 알맞은 말이 바르게 짝지어진 것은? — (A) If it ( is / were ) sunny tomorrow, we’ll go on a picnic. (B) If I ( am / were ) a cat, I would sleep all day. (C) ( Without / With ) the lotus flowers, the pond wouldn’t be so beautiful.', opts: [
        'is – were – Without', 'were – were – With', 'is – am – Without', 'were – am – With', 'is – were – With'], a: '①', why: '조건문 is / 가정법 were / ~이 없다면 Without' },
      { q: '다음 대화의 빈칸에 알맞은 것은? — A: What would you do if you won the lottery? B: I ________ a big house for my parents.', opts: ['will buy', 'buy', 'bought', 'would buy', 'have bought'], a: '④', why: '가정법 질문 → would + 동사원형' }] },
    { level: '전환 · 연결', type: 'write', instr: '밑줄 친 부분을 괄호 안의 말로 시작하여 같은 뜻이 되도록 바꾸어 쓰시오.', items: [
      { q: '__Without__ water, we couldn’t survive. (If)', a: 'If it were not for water', why: 'Without = If it were not for' },
      { q: '__If it were not for__ the bridge, we couldn’t cross the river. (Without)', a: 'Without the bridge', why: 'If it were not for = Without' },
      { q: '__Without__ my glasses, I couldn’t read this book. (If)', a: 'If it were not for my glasses', why: 'Without → If it were not for' },
      { q: '__If it were not for__ the sun, the Earth would be dark and cold. (Without)', a: 'Without the sun', why: '→ Without' },
      { q: '__Without__ your support, I would give up. (If)', a: 'If it were not for your support', why: '→ If it were not for' },
      { q: '__If it were not for__ smartphones, we would write more letters. (Without)', a: 'Without smartphones', why: '→ Without' },
      { q: '__Without__ Munjado, we couldn’t learn so much about Joseon values. (If)', a: 'If it were not for Munjado', why: '→ If it were not for' },
      { q: '__If it were not for__ homework, students would have more free time. (Without)', a: 'Without homework', why: '→ Without' },
      { q: '__Without__ friends, school life would be boring. (If)', a: 'If it were not for friends', why: '→ If it were not for' },
      { q: '__If it were not for__ the Internet, we couldn’t take online classes. (Without)', a: 'Without the Internet', why: '→ Without' }] },
  ], m),

  // ---------------- PERFECT CHECK ----------------
  D.section('PERFECT CHECK', '상위권 함정 체크'),
  ...D.drill(null, '', [{ level: '함정', type: 'choice', instr: '실수하기 쉬운 문장들이에요. 괄호 안에서 알맞은 것을 고르시오.', items: [
    { q: 'If Sally (was / were) here, she would help me.', a: 'were', why: '가정법 be동사는 원칙적으로 were' },
    { q: 'It would be wonderful if I (could / can) eat fresh fish. (본문)', a: 'could', why: '주절 would — if절 could' },
    { q: 'If I knew his number, I (would call / will call) him.', a: 'would call', why: 'if절 knew — 가정법 주절' },
    { q: 'If I had a ticket, I could enter. = As I don’t have a ticket, I (couldn’t / can’t) enter.', a: 'can’t', why: '직설법은 현재시제' },
    { q: 'I (wish / hope) I were a member of the soccer team.', a: 'wish', why: '과거형 were → wish' },
    { q: 'If it (rains / will rain) this afternoon, take an umbrella.', a: 'rains', why: '조건절 현재시제' },
    { q: 'If it were not (from / for) your help, I would be lost.', a: 'for', why: 'If it were not for' },
    { q: 'I’m sorry that I can’t swim. = I wish I (can / could) swim.', a: 'could', why: 'I wish + could' },
    { q: 'It was impossible (for / of) him to catch any fish. (본문)', a: 'for', why: 'to부정사 의미상 주어 복습 — impossible은 for' },
    { q: 'The man was so disappointed (as / that) he cried out to the sky. (본문)', a: 'that', why: 'so ~ that 복습 — 너무 ~해서 …하다' }] }], m),

  // ---------------- WRITE ----------------
  D.section('WRITE', '서술형 대비'),
  ...D.writeItem(1, 'Basic', '괄호 안의 단어를 알맞은 형태로 바꾸어 쓰시오.', ['If I (be) a bird, I would fly to my hometown.'], { a: 'were', why: '가정법 be동사 → 인칭 관계없이 were' }, m),
  ...D.writeItem(2, 'Basic', '괄호 안의 단어를 알맞은 형태로 바꾸어 쓰시오.', ['It would be wonderful if I (can) eat fresh fish. (본문)'], { a: 'could', why: '가정법 if절 — can의 과거형' }, m),
  ...D.writeItem(3, 'Intermediate', '가정법 과거를 사용하여 같은 뜻의 문장으로 바꾸시오. [문장 전환]', ['As I don’t have enough money, I can’t buy the new game.'],
    { a: 'If I had enough money, I could buy the new game.', why: '현재 → 과거, 부정 → 긍정' }, m),
  ...D.writeItem(4, 'Intermediate', 'As를 사용하여 같은 뜻의 직설법 문장으로 바꾸시오. [문장 전환]', ['If the river were not frozen, the man could catch fish.'],
    { a: 'As the river is frozen, the man can’t catch (any) fish.', why: '과거 → 현재, 긍정·부정 뒤집기 (본문 상황)' }, m),
  ...D.writeItem(5, 'Intermediate', 'I wish를 사용하여 같은 뜻의 문장으로 바꾸시오. [문장 전환]', ['I’m sorry that I can’t paint like Kim Hongdo.'],
    { a: 'I wish I could paint like Kim Hongdo.', why: 'can’t → could' }, m),
  ...D.writeItem(6, 'Intermediate', '두 문장을 If를 사용한 가정법 과거 한 문장으로 연결하시오. [두 문장 연결]', ['I am not a superhero. I can’t help people in danger.'],
    { a: 'If I were a superhero, I could help people in danger.', why: 'am not → were, can’t → could' }, m),
  ...D.writeItem(7, 'Advanced', '우리말과 같은 뜻이 되도록 <조건>에 맞게 영작하시오.', ['신선한 물고기를 먹을 수 있다면 정말 좋을 텐데.', '<조건> 가정법 과거를 사용할 것 · It으로 시작할 것 · wonderful, fresh fish를 사용할 것 · 총 10단어'],
    { a: 'It would be wonderful if I could eat fresh fish.', why: '본문 문장 · 10단어 (It/would/be/wonderful/if/I/could/eat/fresh/fish)' }, m),
  ...D.writeItem(8, 'Advanced', '<보기>의 단어를 배열하여 문장을 완성하시오. (필요하면 형태를 바꿀 것)', ['내가 조선 시대에 산다면, 문자도를 직접 그릴 수 있을 텐데.', '<보기> if / I / live / in the Joseon dynasty / I / could / draw / Munjado / myself'],
    { a: 'If I lived in the Joseon dynasty, I could draw Munjado myself.', why: 'live → lived (가정법 과거 if절)' }, m),
  ...D.writeItem(9, 'Advanced', '어법상 틀린 부분 2개를 찾아 바르게 고치고, 그 이유를 쓰시오.', ['If I am you, I will tell the truth to your parents.'],
    { a: '① am → were  ② will → would', why: '① 현재 사실의 반대(내가 너일 수 없음) → 가정법 be동사 were ② 가정법 주절 조동사 과거형', blanks: ['고친 것', '이유'] }, m),
  ...D.writeItem(10, 'Advanced', '어법상 틀린 부분 2개를 찾아 바르게 고치고, 그 이유를 쓰시오.', ['I wish I have a time machine. If I had one, I can visit King Sejong.'],
    { a: '① have → had  ② can → could', why: '① I wish + 과거형 ② 가정법 과거 주절 = could + 동사원형', blanks: ['고친 것', '이유'] }, m),

  // ---------------- MAP ----------------
  D.section('MAP', "DAVID'S MAP — 백지노트 테스트"),
  D.P([D.T('오늘 배운 내용을 떠올리며 빈칸을 채워 보세요. 책을 보지 않고!', { size: 18, color: '595959' })], { spacing: { after: 120 }, keepNext: true }),
  ...D.image(path.join(__dirname, 'map_G-가정법과거.png'), 620),
  ...D.table(['자가 체크 — 백지노트에 이 단어들이 들어갔나요?', '✔'], [
    ['If + 주어 + 과거동사, 주어 + would / could / might + 동사원형', ''], ['be동사는 인칭과 관계없이 were', ''], ['뜻: 현재 사실의 반대 ‘만약 ~라면, …할 텐데’', ''],
    ['직설법 전환: As + 현재시제 · 긍정 ↔ 부정 뒤집기', ''], ['could ↔ can’t / were ↔ am(is) not', ''], ['I wish + 과거(were / could) = I’m sorry that + 현재', ''],
    ['I hope(가능) vs. I wish(불가능)', ''], ['as if + 과거 — 마치 ~인 것처럼', ''], ['단순 조건문 If + 현재, will / 가정법 If + 과거, would', ''],
    ['Without = If it were not for (+ 명사) · 본문: It would be wonderful if I could eat fresh fish.', '']], [8838, 800], m),
  ...D.memo(['다음 시간 도입: “현실일까, 상상일까?” 조건문 vs. 가정법 판단 OX 10문항(3분)',
    '약한 반: Point 1·2만 진행, Point 3은 I wish 전환 5문항, Point 4는 Without ↔ If it were not for 전환만',
    '강한 반: 가정법 과거완료(If + had p.p., would have p.p.) 예고 — 직설법 과거 전환(As I didn’t …, I couldn’t …)과 비교',
    '공통 자료(동아윤8 · 능률김7 · 비상김8): 본문 문장만 각 교과서 문장으로 바꿔 끼워 WRITE 7·8번을 교체해 쓴다.'], m),
];
D.render(meta, build, process.argv[2] || '.').then(f => console.log(f.join('\n')));
