const D = require('./david_base');
const path = require('path');
const fs = require('fs');
const COVER = JSON.parse(process.env.COVER || '{}');
const meta = { series: D.SERIES.G, code: 'G-if', title: 'if (~인지 아닌지)', category: 'G. 접속사  |  명사절 if · whether',
  rightText: 'G  if (~인지 아닌지)', prefix: process.env.PREFIX || '', cover: COVER.title ? COVER : undefined,
  question: '~~If~~ a story seems too good to be true, stop and think. / You also have to check ~~if~~ they are based on facts. — 같은 if인데 왜 하나는 ‘~라면’, 하나는 ‘~인지’일까?' };

const build = (m) => [
  D.section('FLOW', 'Teaching Flow — 처음 배우는 사람도 따라오는 5단계'),
  ...D.step(1, '우리말로 먼저 생각하기 — ‘~인지 (아닌지)’', [
    '‘그 이야기가 사실인지 확인해 봐.’ ‘그가 올지 궁금해.’ — 우리말은 동사 끝에 {{~인지}}를 붙여 질문을 문장 속에 넣는다.',
    '영어는 질문(Is it true? / Will he come?)을 문장 속에 넣을 때 앞에 {{if}}[whether] 하나를 붙이고, 순서를 주어 + 동사로 바꾼다.'], m),
  ...D.step(2, '이전 단원 복습 — 조건의 if와 간접의문문', [
    '{{If}} it is sunny tomorrow, we will go hiking. — ‘만약 ~라면’ (조건의 부사절, 미래도 {{현재시제}})',
    'I know where she lives. — 의문사가 있는 의문문은 「의문사 + 주어 + 동사」. 그렇다면 의문사가 {{없는}} 의문문(Is she home?)은?'], m),
  ...D.step(3, '문제 제기 — 의문사가 없는 질문은 무엇으로 연결할까?', [
    'You also have to check. + Are they based on facts? → 의문사가 없으니 where · what을 쓸 수 없다.',
    '게다가 본문에는 if가 두 번 나온다: **If** a story seems too good to be true … / check **if** they are based on facts. 둘은 같은 if일까?'], m),
  ...D.step(4, '규칙 발견 — if + 주어 + 동사 = ‘~인지’', [
    'You also have to check {{if they are}} based on facts. (본문) — check의 목적어가 되는 명사절',
    '이 if는 ‘만약 ~라면’이 아니라 ‘~인지 (아닌지)’ → {{whether}}로 바꿔 쓸 수 있다. 조건의 if는 whether로 바꿀 수 {{없다}}.'], m),
  ...D.step(5, '결론 🔑', [
    '명사절 if[whether] = {{~인지 (아닌지)}} / 어순 {{if + 주어 + 동사}} / 주어 · 전치사 뒤 · to부정사 앞 · or not 바로 앞은 {{whether}}만 / 명사절 if는 미래를 {{will}} 그대로, 조건 if는 현재시제'], m),
  ...D.infoBox('오늘의 핵심 3문장', [
    '① You also have to check {{if}} they are based on facts. (본문) — ~인지',
    '② I wonder if he {{will catch}} my ball. (교과서) — 명사절 속 미래는 will 그대로',
    '③ {{Whether}} you fail or succeed will depend on your thoughts. (기출) — 주어 자리는 whether만'], m),
  ...D.tip(['본문의 두 if(If a story seems … / check if they are …)를 먼저 해석시키고, ‘~라면’과 ‘~인지’로 나눠 동그라미 치게 한다. 이 구별이 단원 전체의 핵심이다.',
    '같은 과 문법 간접화법과 함께 출제되므로 PERFECT CHECK에 간접화법(의문문 전달 asked if) 2문항을 섞어 두었다.'], m),

  // ---------------- Point 1 ----------------
  D.section('Point 1', '명사절 if[whether] ‘~인지 (아닌지)’ — 어순 · 함께 쓰는 동사 · 간접의문문', 'point'),
  ...D.table(['구성', '역할 · 설명', '예'], [
    ['if[whether] + 주어 + 동사', '‘~인지 (아닌지)’ — 의문사가 없는 의문문을 문장 속에 넣는다 (명사절)', 'You also have to check **if they are based on facts**. (본문)'],
    ['함께 쓰는 동사', 'know · ask · wonder · check · see · tell · be not sure · want to know의 목적어', 'I wonder **if he will catch my ball**. (교과서)'],
    ['어순 (간접의문문)', '의문문 어순(동사 + 주어) ✗ → 평서문 어순(주어 + 동사)', 'Is Jack at home? → Do you know **if Jack is** at home? (if is Jack ✗)'],
    ['do · does · did 빼기', '조동사 do는 없애고 동사에 시제 · 수를 살린다', 'Does she like Jack? → I wonder if she **likes** Jack. (if does she like ✗)'],
    ['or not', '절 끝에 붙여 ‘~인지 아닌지’를 분명히', 'I don’t know if he is rich **or not**.'],
    ['의문사가 있으면?', '의문사가 있으면 의문사 그대로 / 없을 때만 if[whether]', 'Where does she live? → I know **where she lives**.']], [2300, 3300, 4038], m),
  ...D.infoBox('의문문 → if절 3단계', [
    '① 의문사가 있나? 없으면 {{if}}[whether]로 연결 (that ✗ · what ✗)',
    '② 순서를 {{주어 + 동사}}로: Will he catch my ball? → if he will catch my ball',
    '③ do · does · did는 빼고 동사에 시제 · 수 반영: Did he win? → if he {{won}} / 전달 동사가 과거(asked)면 시제 일치'], m),
  ...D.trick('의문사 없으면 if 콜!', ['“의문사 없으면 if 불러! 불렀으면 주 · 동 순서!”', '“if 뒤에 does · did가 보이면 바로 퇴장!”']),
  ...D.examPoint([
    { q: 'You also have to check {{if}} they are based on facts. (that ✗)', why: 'check의 목적어 · ‘~인지’ (본문 기출)' },
    { q: 'I wonder if {{he will like}} that food. (will he like ✗)', why: '간접의문문 어순 if + 주어 + 동사 (기출)' }], m),
  ...D.caution(['if 뒤를 의문문 어순으로 둔 선지(I wonder if will he like that food ✗ · Please check whether is the copy machine working ✗)가 가장 흔하다.',
    'if 자리에 that · what을 넣은 선지 — I want to know that the girl is from America or not ✗ / I asked (if / what) she could help me.',
    '간접화법과 섞여 asked me if I can → could(시제 일치), if I have eaten → had eaten으로 출제된다.'], m),
  ...D.drill(1, '명사절 if — 어순과 함께 쓰는 동사', [
    { level: 'Basic ①', type: 'choice', instr: '괄호 안에서 알맞은 것을 고르시오.', items: [
      { q: 'You also have to check (that / if) they are based on facts.', a: 'if', why: '‘~인지’ — check의 목적어 (본문)' },
      { q: 'I wonder if (he will catch / will he catch) my ball.', a: 'he will catch', why: 'if + 주어 + 동사 (교과서)' },
      { q: 'Do you know (what / if) Judy can play the guitar?', a: 'if', why: '뒤가 완전한 절 · 의문사 없음 → if' },
      { q: 'I’m not sure if she (like / likes) Jack.', a: 'likes', why: 'does 빼고 3인칭 단수 likes' },
      { q: 'Please check (if / what) the copy machine needs paper.', a: 'if', why: '‘~인지’ — 완전한 절' },
      { q: 'I want to know if (Amy’s new skirt suits / does Amy’s new skirt suit) her.', a: 'Amy’s new skirt suits', why: 'does 빼고 주어 + 동사' },
      { q: 'Let’s see if there (is / are) any seats left.', a: 'are', why: 'there are + 복수 seats' },
      { q: 'He asked me (if / where) I had any hobbies.', a: 'if', why: '의문사 없는 의문문(Do you have any hobbies?) 전달' },
      { q: 'Yesterday I asked Mina if she (was / is) hungry.', a: 'was', why: '전달 동사 asked(과거) → 시제 일치' },
      { q: 'Can you tell me if (is there / there is) a bank near here?', a: 'there is', why: '간접의문문 — there is 어순' }] },
    { level: 'Basic ②', type: 'fill', instr: '<보기>에서 알맞은 말을 골라 빈칸에 쓰시오. (한 번씩만 사용)',
      bogi: ['will', 'see', 'sure', 'if', 'has', 'asked', 'know', 'likes', 'wonder', 'was'], items: [
      { q: 'You also have to check [[if]] they are based on facts.', why: '본문 — ‘~인지’를 이끄는 접속사' },
      { q: '(궁금하다) I [[wonder]] if he will catch my ball.', why: '교과서 — wonder if ~' },
      { q: 'I’m not [[sure]] if there is a restaurant around here.', why: 'be not sure if ~' },
      { q: 'Mina [[asked]] me if I could help her with her homework.', why: '전달 동사 ask — 과거 asked (could와 시제 일치)' },
      { q: 'Will Tony win the game? → I wonder if Tony [[will]] win the game.', why: '명사절 속 미래 → will 그대로' },
      { q: 'Does she like Jack? → I wonder if she [[likes]] Jack.', why: 'does를 빼고 3인칭 단수 likes' },
      { q: 'Is the door locked? → Go and [[see]] if the door is locked.', why: 'see if ~ = ~인지 알아보다' },
      { q: 'Was everything okay? → He asks Juwon if everything [[was]] okay.', why: '의문문의 시제(과거) 그대로' },
      { q: 'Does Inho have any trouble? → He wonders if Inho [[has]] any trouble.', why: 'does를 빼고 has' },
      { q: 'Will my parents allow me to go there? → I don’t [[know]] if they will allow me.', why: 'don’t know if ~' }] },
    { level: 'Intermediate', type: 'write', instr: '어법상 틀린 부분을 찾아 바르게 고쳐 쓰시오.', items: [
      { q: 'You also have to check if are they based on facts.', a: 'are they → they are', why: '본문 — if + 주어 + 동사' },
      { q: 'I wonder if will he like that food.', a: 'will he like → he will like', why: '기출 — 간접의문문 어순' },
      { q: 'I wonder if does she have a brother.', a: 'does she have → she has', why: 'does를 빼고 주어 + 동사' },
      { q: 'Please check whether is the copy machine working.', a: 'is the copy machine → the copy machine is', why: '워크북 — 주어 + 동사' },
      { q: 'I want to know that the girl is from America or not.', a: 'that → if[whether]', why: '‘~인지 아닌지’ · or not → if[whether]' },
      { q: 'Do you know what Judy can play the guitar?', a: 'what → if[whether]', why: '뒤가 완전한 절 → 의문사 ✗' },
      { q: 'I’m not sure if she like coffee.', a: 'like → likes', why: '주어 she — 3인칭 단수' },
      { q: 'Last night Mom asked me if I am hungry.', a: 'am → was', why: 'asked(과거)와 시제 일치' },
      { q: 'He asked me if I have eaten breakfast.', a: 'have eaten → had eaten', why: '전달 시점보다 먼저 → 과거완료' },
      { q: 'Can you tell me if is there a bank near here?', a: 'is there → there is', why: '간접의문문 어순' }] },
    { level: 'Advanced · 모두 고르기', type: 'multi', free: true, instr: '해당하는 것을 모두 골라 기호를 쓰시오.', items: [
      { q: '다음 중 어법상 옳은 문장을 모두 고르시오.', box: [
        '(a) I wonder if he will catch my ball.', '(b) Do you know if is he married?', '(c) Let me check if she’s in the meeting now.',
        '(d) She asked me if I wanted to go to the concert.', '(e) I want to know if does he like me.'], a: '(a), (c), (d)', why: '(b) is he → he is (e) does he like → he likes' },
      { q: '다음 중 밑줄 친 부분에 대한 설명으로 옳은 것을 모두 고르시오.', box: [
        '(a) You also have to check __if__ they are based on facts. → ‘만약 ~라면’의 뜻이다.',
        '(b) I wonder __if she has a brother__. → wonder의 목적어 역할을 하는 명사절이다.',
        '(c) Do you know __if Jack is home__? → 의문문이므로 if is Jack home으로 써야 한다.',
        '(d) I don’t know __if__ they were invited. → whether로 바꿔 쓸 수 있다.',
        '(e) I’m not sure __if he knows her brother__. → if 뒤에 주어와 동사를 갖춘 완전한 절이 왔다.'], a: '(b), (d), (e)', why: '(a) ‘~인지’ (c) 간접의문문은 if + 주어 + 동사' },
      { q: '다음 대화의 밑줄 친 ⓐ~ⓔ 중 어법상 어색한 것을 모두 골라 기호를 쓰고 바르게 고치시오.', fix: true, label: '기호 / 고친 것', box: [
        'A: Do you know ⓐ __if Minji is coming__ to the party?', 'B: I’m not sure. I asked her ⓑ __if she could come__, but she didn’t answer.',
        'A: Let’s check ⓒ __if is she online__ now.', 'B: Good idea. I also wonder ⓓ __if does she have__ a gift for Jun.', 'A: I don’t know ⓔ __if she will bring__ one.'],
        a: 'ⓒ if is she → if she is, ⓓ if does she have → if she has', why: 'ⓒ 간접의문문 어순 ⓓ does를 빼고 주어 + 동사(has)' },
      { q: '의문문을 if절로 바르게 바꾼 것을 모두 고르시오.', box: [
        '(a) Did you finish the report? → Let me know if did you finish the report.',
        '(b) Is there a park around here? → Amy is wondering if there is a park around here.',
        '(c) Does the copy machine need paper? → Please check if the copy machine need paper.',
        '(d) Where does she live? → I know if she lives.',
        '(e) Can the paper cup be recycled? → Chris is not sure if the paper cup can be recycled.'], a: '(b), (e)', why: '(a) if you finished (c) needs (d) 의문사 → where she lives' },
      { q: '빈칸에 if가 들어갈 수 있는 것을 모두 고르시오.', box: [
        '(a) I wonder ______ he will catch my ball.', '(b) Do you know ______ she lives? (그녀가 어디 사는지)', '(c) She asked me ______ I had eaten breakfast.',
        '(d) I think ______ he is honest.', '(e) Please check ______ the door is locked.'], a: '(a), (c), (e)', why: '(b) where (d) that — 확실한 생각' }] },
    { level: 'Advanced · 객관식', type: 'mcq', free: true, instr: '알맞은 답을 고르시오.', items: [
      { q: '빈칸에 들어갈 말로 알맞은 것은? — Opinions are good to read, but you also have to check ______ they are based on facts.', opts: [
        'what', 'that', 'if', 'where', 'which'], a: '③', why: '‘~인지’ — 뒤가 완전한 절, 의문사 없음 (본문)' },
      { q: '우리말을 영어로 바르게 옮긴 것은? — 나는 그녀가 내 선물을 좋아할지 궁금하다.', opts: [
        'I wonder if will she like my present.', 'I wonder that she will like my present.', 'I wonder she will like if my present.',
        'I wonder if she will like my present.', 'I wonder if does she like my present.'], a: '④', why: 'if + 주어 + 동사 · 미래 will (교과서 Write)' },
      { q: '다음 문장을 바르게 바꾼 것은? — Can Jane join the tennis team? → I wonder ______.', opts: [
        'if Jane can join the tennis team', 'if can Jane join the tennis team', 'that Jane can join the tennis team',
        'what Jane can join the tennis team', 'if Jane joins can the tennis team'], a: '①', why: 'if + 주어 + 조동사 + 동사원형' },
      { q: '(A)~(C)에 알맞은 말이 바르게 짝지어진 것은? — (A) Do you know (if / what) he has a girlfriend? (B) I wonder if (is he / he is) in Seoul. (C) He asked me if I (am / was) hungry.', opts: [
        'what – he is – was', 'if – is he – was', 'if – he is – am', 'what – is he – am', 'if – he is – was'], a: '⑤', why: '의문사 없음 → if / 주어 + 동사 / asked → 시제 일치 was' },
      { q: '다음 중 어법상 틀린 문장의 개수는?', box: [
        '(a) I wonder if he will catch my ball.', '(b) Please check if the copy machine needs paper.', '(c) I don’t know if does she have a car.',
        '(d) He asked me if I am tired.', '(e) Do you know what he is a doctor?'], opts: ['1개', '2개', '3개', '4개', '5개'], a: '③', why: '(c) she has (d) was (e) what → if' }] },
    { level: '전환 · 연결', type: 'write', instr: '두 문장을 if를 사용하여 한 문장으로 연결하시오.', items: [
      { q: 'I wonder. + Will he catch my ball?', a: 'I wonder if he will catch my ball.', why: '교과서 — 주어 + 동사' },
      { q: 'You also have to check. + Are they based on facts?', a: 'You also have to check if they are based on facts.', why: '본문' },
      { q: 'I want to know. + Will it rain tomorrow?', a: 'I want to know if it will rain tomorrow.', why: '명사절 속 미래 → will' },
      { q: 'I’m not sure. + Is there a restaurant around here?', a: 'I’m not sure if there is a restaurant around here.', why: 'there is 어순' },
      { q: 'I wonder. + Does my girlfriend like me?', a: 'I wonder if my girlfriend likes me.', why: 'does 빼고 likes' },
      { q: 'Please check. + Does the copy machine need paper?', a: 'Please check if the copy machine needs paper.', why: 'does 빼고 needs' },
      { q: 'Let me know. + Did you finish the science report?', a: 'Let me know if you finished the science report.', why: 'did 빼고 과거형 finished' },
      { q: 'He doesn’t know. + “Do you have any trouble, Inho?”', a: 'He doesn’t know if Inho has any trouble.', why: 'you → Inho · has' },
      { q: 'Kevin is not sure. + “Can I pass the math exam?” (Kevin의 생각)', a: 'Kevin is not sure if he can pass the math exam.', why: 'I → he' },
      { q: 'He said to me, “Have you eaten breakfast?” (간접화법)', a: 'He asked me if[whether] I had eaten breakfast.', why: 'said to → asked · 현재완료 → 과거완료 (같은 과 간접화법)' }] },
  ], m),

  // ---------------- Point 2 ----------------
  D.section('Point 2', 'if vs whether — whether만 쓰는 자리 · that과의 구별', 'point'),
  ...D.table(['자리 · 형태', 'whether', 'if', '예'], [
    ['동사의 목적어', '○', '○', 'I don’t know **whether[if]** they were invited.'],
    ['주어 (문장 맨 앞)', '○', '✗', '**Whether** he will come is not important. (If ✗)'],
    ['보어 (be동사 뒤)', '○', '✗', 'The problem is **whether** they believe what I said. (기출)'],
    ['전치사 뒤', '○', '✗', 'It depends on **whether** you study hard. (on if ✗)'],
    ['to부정사 앞', '○', '✗', 'I can’t decide **whether to** buy a bicycle. (if to ✗)'],
    ['or not 바로 뒤', 'whether or not ○', 'if or not ✗', 'I have no idea **whether or not** they trust me.'],
    ['절 끝 or not', '○', '○', 'I wonder **if** she likes Jack **or not**.']], [2200, 1500, 1400, 4538], m),
  ...D.infoBox('that vs if[whether] — 확실한가, 궁금한가', [
    'that = ‘~라는 것’ (확실한 내용) : I think {{that}} the news is fake.',
    'if[whether] = ‘~인지 아닌지’ (불확실) : I wonder {{if}} the news is fake. (wonder that ✗)',
    'or not이 붙으면 반드시 {{if[whether]}} : I’m not sure that she likes coffee or not ✗ → if[whether]'], m),
  ...D.trick('주 · 보 · 전 · 투 · 오 = whether 전용석!', ['“주어 · 보어 · 전치사 뒤 · 투(to)부정사 앞 · 오어낫(or not) 앞 — 이프는 못 앉는 whether VIP석!”', '“궁금하면 if, 확실하면 that!”']),
  ...D.examPoint([
    { q: '{{Whether}} you fail or succeed will depend on your thoughts. (If ✗)', why: '주어 자리 → whether만 (기출)' },
    { q: 'I can’t decide {{whether}} to buy a bicycle. (if ✗)', why: 'to부정사 앞 → whether만 (워크북)' }], m),
  ...D.caution(['기출 단골: If you are rich or not doesn’t matter ✗ / I don’t know if or not you will like my present ✗ — 옳은 것 2개 고르기에 함께 나온다.',
    'ⓐⓑⓒ 빈칸 짝 문제 — 주어 자리 whether, to부정사 앞 whether, 목적어 if를 한 문항에 묶는다.',
    '‘It doesn’t matter if ~’처럼 가주어 it 뒤의 if는 실제로 쓰이므로 if 불가 문항으로 내지 않는다(애매한 문항 주의).'], m),
  ...D.drill(2, 'if vs whether · that', [
    { level: 'Basic ①', type: 'choice', instr: '괄호 안에서 알맞은 것을 고르시오.', items: [
      { q: '(If / Whether) he will come to the party is not important.', a: 'Whether', why: '주어 자리 → whether' },
      { q: 'I can’t decide (whether / if) to buy a bicycle.', a: 'whether', why: 'to부정사 앞 → whether' },
      { q: 'I have no idea (whether / if) or not they trust me.', a: 'whether', why: 'or not 바로 앞 → whether' },
      { q: 'It depends on (if / whether) you study hard.', a: 'whether', why: '전치사 뒤 → whether' },
      { q: 'I’m not sure (that / if) he likes the book or not.', a: 'if', why: '‘~인지 아닌지’ · or not' },
      { q: 'The problem is (that / whether) they believe what I said or not.', a: 'whether', why: '보어 · or not (기출)' },
      { q: 'I think (that / if) the photo is fake.', a: 'that', why: '확실한 생각 → that' },
      { q: 'Has she decided (if / whether) to go to school or stay home?', a: 'whether', why: '워크북 — whether + to부정사' },
      { q: 'I wonder (that / whether) the rumor is true or not.', a: 'whether', why: 'wonder that ✗ · ‘~인지’' },
      { q: 'Do you know (whether / if) or not Judy is at home?', a: 'whether', why: 'or not 바로 앞 → whether' }] },
    { level: 'Basic ②', type: 'fill', instr: '<보기>에서 알맞은 말을 골라 빈칸에 쓰시오. (한 번씩만 사용)',
      bogi: ['matter', 'or', 'that', 'whether', 'on', 'is', 'not', 'if', 'to', 'what'], items: [
      { q: 'The question is [[whether]] the photo is real or fake.', why: '보어 자리 → whether (if ✗)' },
      { q: 'I can’t decide whether [[to]] buy a new phone.', why: 'whether + to부정사' },
      { q: 'I have no idea whether [[or]] not they trust me.', why: 'whether or not' },
      { q: 'It all depends [[on]] whether you check the facts.', why: 'depend on + whether절' },
      { q: 'I don’t know if she will come or [[not]].', why: '절 끝 or not' },
      { q: 'I think [[that]] the news is fake.', why: '확실한 생각 → that' },
      { q: 'Do you know [[what]] the writer says?', why: 'says의 목적어가 빠진 불완전한 절 → what' },
      { q: 'I wonder whether this story [[is]] based on facts.', why: 'whether + 주어 + 동사' },
      { q: 'Whether he will come or not doesn’t [[matter]] to me.', why: 'Whether절 주어 + doesn’t matter' },
      { q: 'I asked him [[if]] he could speak Spanish.', why: '목적어 자리 — if 가능 (whether는 1번에서 사용)' }] },
    { level: 'Intermediate', type: 'write', instr: '어법상 틀린 부분을 찾아 바르게 고쳐 쓰시오.', items: [
      { q: 'If she will leave today or not doesn’t matter.', a: 'If → Whether', why: '워크북 — 주어 자리' },
      { q: 'Has she decided if to go to school or stay home?', a: 'if → whether', why: '워크북 — to부정사 앞' },
      { q: 'I wonder if or not the mail has arrived.', a: 'if or not → whether or not', why: '워크북 — if or not ✗' },
      { q: 'I’m not sure that she likes coffee or not.', a: 'that → if[whether]', why: '워크북 — ‘~인지 아닌지’' },
      { q: 'It depends on if you agree with me.', a: 'if → whether', why: '전치사 뒤' },
      { q: 'The problem is if they believe what I said.', a: 'if → whether', why: '보어 자리' },
      { q: 'I don’t know if to agree with you.', a: 'if → whether', why: 'to부정사 앞' },
      { q: 'I have no idea if or not they trust me.', a: 'if or not → whether or not', why: 'or not 바로 앞' },
      { q: 'We talked about if we should cancel the trip.', a: 'if → whether', why: '전치사 about 뒤' },
      { q: 'I wonder whether or not is Judy at home.', a: 'is Judy → Judy is', why: 'whether + 주어 + 동사' }] },
    { level: 'Advanced · 모두 고르기', type: 'multi', free: true, instr: '해당하는 것을 모두 골라 기호를 쓰시오.', items: [
      { q: '밑줄 친 whether를 if로 바꿔 쓸 수 있는 것을 모두 고르시오.', box: [
        '(a) I don’t know __whether__ they were invited.', '(b) __Whether__ you fail or succeed depends on your effort.', '(c) I can’t decide __whether__ to buy it.',
        '(d) She asked me __whether__ I could help her.', '(e) I have no idea __whether__ or not they trust me.'], a: '(a), (d)', why: '(b) 주어 (c) to부정사 앞 (e) or not 바로 앞' },
      { q: '다음 중 어법상 옳은 문장을 모두 고르시오.', box: [
        '(a) If you are rich or not doesn’t matter.', '(b) Tell me whether she will come to school.', '(c) I don’t know if or not you will like my present.',
        '(d) I’m not sure if she will come or not.', '(e) The problem is whether they believe what I said or not.'], a: '(b), (d), (e)', why: '(a) If → Whether (c) if or not → whether or not (기출)' },
      { q: '다음 중 밑줄 친 부분에 대한 설명으로 옳은 것을 모두 고르시오.', box: [
        '(a) __Whether he will come__ is not important. → 문장의 주어 역할을 하는 명사절이다.',
        '(b) I can’t decide __whether to buy__ a bike. → 뒤에 to부정사가 왔으므로 if로 바꿔도 된다.',
        '(c) It depends on __whether__ you study hard. → 전치사의 목적어 자리이므로 if로 바꿀 수 없다.',
        '(d) I wonder __if she likes Jack or not__. → or not이 if 바로 뒤에 오지 않았으므로 옳다.',
        '(e) I think __that__ the story is fake. → ‘~인지 아닌지’의 뜻이다.'], a: '(a), (c), (d)', why: '(b) to부정사 앞 → whether만 (e) that = ~라는 것' },
      { q: '다음 글(본문 변형)의 밑줄 친 ⓐ~ⓔ 중 어법상 어색한 것을 모두 골라 기호를 쓰고 바르게 고치시오.', fix: true, label: '기호 / 고친 것', box: [
        '“Opinions are good to read,” said McKenzie Campbell, “but you also have to check ⓐ __whether or not__ they are based on facts. ⓑ __If a story is true or not__ is not always clear, so it depends on ⓒ __if__ you look for evidence. Before you decide ⓓ __whether to__ share a story, ask yourself ⓔ __if__ it comes from a major newspaper or TV station.”'],
        a: 'ⓑ If → Whether, ⓒ if → whether', why: 'ⓑ 주어 자리 ⓒ 전치사 on 뒤 → whether만' },
      { q: '빈칸에 if와 whether가 모두 들어갈 수 있는 것을 모두 고르시오.', box: [
        '(a) ______ he will come or not is another matter.', '(b) I’m not sure ______ he knows her brother.', '(c) I don’t know ______ to agree.',
        '(d) We can’t predict ______ or not the plan will succeed.', '(e) Let me check ______ he is in the meeting now.'], a: '(b), (e)', why: '(a) 주어 (c) to부정사 앞 (d) or not 바로 앞 → whether만' }] },
    { level: 'Advanced · 객관식', type: 'mcq', free: true, instr: '알맞은 답을 고르시오.', items: [
      { q: '빈칸에 들어갈 말로 알맞은 것은? — ______ you fail or succeed will depend on your thoughts.', opts: [
        'When', 'What', 'If', 'That', 'Whether'], a: '⑤', why: '주어 자리 · ‘~인지 아닌지’ → Whether (기출)' },
      { q: '빈칸 ⓐ~ⓒ에 들어갈 말이 바르게 짝지어진 것은?', box: [
        '• ⓐ ______ he will come or not is not important.', '• I don’t know ⓑ ______ to go there.', '• I asked ⓒ ______ he could speak Spanish or not.'],
        opts: ['if – if – that', 'whether – whether – if', 'that – whether – whether', 'whether – that – if', 'if – whether – that'], a: '②', why: 'ⓐ 주어 ⓑ to부정사 앞 → whether / ⓒ 목적어 → if 가능 (기출 변형)' },
      { q: '다음 중 어법상 옳은 것은?', opts: [
        'If he will win the game is not clear.', 'I have no idea if or not he’s coming.', 'I’m not sure that she is at home or not.',
        'I don’t know whether to laugh or cry.', 'It depends on if it rains.'], a: '④', why: '① Whether ② whether or not ③ if[whether] ⑤ whether' },
      { q: '다음 중 빈칸에 if를 쓸 수 없는 것은?', opts: [
        '______ he is honest is the question.', 'Do you know ______ he is married?', 'I wonder ______ she has a brother.',
        'Let me check ______ the door is locked.', 'She asked me ______ I was hungry.'], a: '①', why: '① 주어 자리 → Whether' },
      { q: '다음 중 어법상 틀린 문장의 개수는?', box: [
        '(a) Whether it is true or not is not clear.', '(b) I can’t decide if to stay or go.', '(c) The question is whether we can trust him.',
        '(d) I wonder if or not she will call me.', '(e) I think if the story is fake.'], opts: ['1개', '2개', '3개', '4개', '5개'], a: '③', why: '(b) whether to (d) whether or not (e) that' }] },
    { level: '전환 · 연결', type: 'write', instr: '괄호 안의 지시대로 문장을 바꾸어 쓰시오.', items: [
      { q: 'I don’t know if they trust me or not. (whether or not)', a: 'I don’t know whether or not they trust me.', why: 'or not을 whether 바로 뒤로' },
      { q: 'It is not important whether he is rich or not. (Whether로 시작)', a: 'Whether he is rich or not is not important.', why: '주어 자리 → whether' },
      { q: 'I can’t decide whether I should buy a bike. (whether + to부정사)', a: 'I can’t decide whether to buy a bike.', why: 'whether I should = whether to' },
      { q: 'I don’t know whether I should agree. (whether + to부정사)', a: 'I don’t know whether to agree.', why: 'if to ✗' },
      { q: 'We can’t predict it. + Will the plan succeed? (whether or not)', a: 'We can’t predict whether or not the plan will succeed.', why: 'whether or not + 주어 + 동사' },
      { q: 'Is Jenny at home or not? + It is another matter. (Whether로 시작)', a: 'Whether Jenny is at home or not is another matter.', why: '주어 자리 → whether' },
      { q: 'Did you make a mistake? + It doesn’t matter. (It ~ whether)', a: 'It doesn’t matter whether you made a mistake.', why: '가주어 it · 진주어 whether절' },
      { q: 'Will he accept my advice? + I don’t know. (whether)', a: 'I don’t know whether he will accept my advice.', why: '목적어 · will 그대로' },
      { q: 'Do we go to the party or to the movie? + It makes no difference to me. (Whether로 시작)', a: 'Whether we go to the party or to the movie makes no difference to me.', why: '워크북 — whether A or B 주어' },
      { q: 'Will Tony win the game? + It is not clear. (Whether로 시작)', a: 'Whether Tony will win the game (or not) is not clear.', why: '워크북 — 주어 자리' }] },
  ], m),

  // ---------------- Point 3 ----------------
  D.section('Point 3', '(심화) 명사절 if ‘~인지’ vs 조건 부사절 if ‘~라면’ — 시제 · whether 양보', 'point'),
  ...D.table(['구분', '명사절 if (~인지)', '부사절 if (~라면)'], [
    ['뜻', '~인지 (아닌지)', '만약 ~라면 (조건)'],
    ['자리 · 역할', 'know · ask · wonder · check · see의 목적어', '주절 앞이나 뒤에서 문장 전체를 꾸밈'],
    ['미래의 일', '**will 그대로**: I wonder if he **will come** tomorrow.', '**현재시제**로: We will go swimming if the weather **is** nice tomorrow. (교과서)'],
    ['whether로 바꾸기', '○ (whether = ~인지)', '✗ (whether ~ or not = ~이든 아니든, 양보)'],
    ['판별법', 'if절을 빼면 동사의 목적어가 사라짐 (I wonder. ✗)', 'if절을 빼도 문장이 완전함 (We will go swimming. ○)'],
    ['본문', 'you also have to check **if** they are based on facts.', '**If** a story or a photo seems too good to be true, stop and think.']], [2000, 3800, 3838], m),
  ...D.infoBox('해석 · 자리 · 시제 — 세 번 확인', [
    '해석: ‘~인지’ → {{명사절}} / ‘~라면’ → 조건 부사절',
    '시제: I wonder if it {{will rain}} tomorrow. ↔ If it {{rains}} tomorrow, we will stay home.',
    '양보: {{Whether}} you like it or not, I’m going to buy it. (네가 좋아하든 아니든) — If ~ or not ✗'], m),
  ...D.trick('‘인지’는 will 살리고, ‘라면’은 will 뺀다!', ['“인지면 윌 살려! 라면엔 윌 빼!”', '“웨더 ~ or not, 콤마 찍으면 ‘~이든 아니든’!”']),
  ...D.examPoint([
    { q: 'I wonder if he {{will come}}. / We will go shopping if he {{comes}}.', why: '명사절 → will / 조건절 → 현재시제 (워크북)' },
    { q: '{{If}} a story seems too good to be true, stop and think. → 조건 / check if they are based on facts → 명사절', why: '본문의 두 if 구별 (기출)' }], m),
  ...D.caution(['‘밑줄 친 if의 쓰임이 나머지 넷과 다른 것’이 이 단원 최다 출제 — 조건 if 1개 + 명사절 if 4개, 또는 그 반대.',
    '본문 (A)if와 기능이 같은 것끼리 묶기(ⓐ~ⓔ) — 조건 if · 가정법 if · 명사절 if를 섞는다.',
    '시제 함정: If you will try your best ✗ / I wonder if it rains tomorrow ✗ — 두 방향을 모두 낸다.'], m),
  ...D.drill(3, '명사절 if vs 조건 if', [
    { level: 'Basic ①', type: 'choice', instr: '괄호 안에서 알맞은 것을 고르시오.', items: [
      { q: 'I wonder if he (comes / will come) to the party tomorrow.', a: 'will come', why: '명사절 → 미래는 will' },
      { q: 'We will go swimming if the weather (is / will be) nice tomorrow.', a: 'is', why: '조건절 → 현재시제 (교과서)' },
      { q: 'If it (will snow / snows) tomorrow, the game will be postponed.', a: 'snows', why: '조건절 → 현재시제' },
      { q: 'I don’t know if she (attends / will attend) the meeting next week.', a: 'will attend', why: '명사절 → will' },
      { q: '(Whether / If) you like it or not, I’m going to buy it.', a: 'Whether', why: '~이든 아니든 (양보) → Whether' },
      { q: 'You will know it if you (will take / take) the class.', a: 'take', why: '조건절 → 현재시제' },
      { q: 'Could you tell me if you (participate / will participate) in the show next month?', a: 'will participate', why: '명사절 → will' },
      { q: 'I’ll say hello to her if I (meet / will meet) her tomorrow.', a: 'meet', why: '조건절 → 현재시제' },
      { q: 'Nobody knows if it (will rain / rains) this weekend.', a: 'will rain', why: '명사절 → will' },
      { q: '(Whether / If) a story seems too good to be true, stop and think.', a: 'If', why: '조건(~라면) — or not 없는 whether 부사절 ✗ (본문)' }] },
    { level: 'Basic ②', type: 'fill', instr: '<보기>에서 알맞은 말을 골라 빈칸에 쓰시오. (한 번씩만 사용)',
      bogi: ['will be', 'comes', 'if', 'pass', 'will rain', 'is', 'whether', 'will come', 'rains', 'will pass'], items: [
      { q: 'If it [[rains]] tomorrow, we will stay home.', why: '조건절 → 현재시제' },
      { q: 'I don’t know if it [[will rain]] tomorrow.', why: '명사절 → will' },
      { q: 'We will go swimming if the weather [[is]] nice tomorrow.', why: '교과서 — 조건절' },
      { q: 'I wonder if the weather [[will be]] nice tomorrow.', why: '명사절 → will' },
      { q: 'I wonder if he [[will come]].', why: '워크북 — 명사절' },
      { q: 'We will go shopping if he [[comes]].', why: '워크북 — 조건절' },
      { q: 'I’ll be happy if I [[pass]] the exam.', why: '조건절 → 현재시제' },
      { q: 'Kevin isn’t sure if he [[will pass]] the math exam.', why: '명사절 → will' },
      { q: 'You have to do it, [[whether]] you like it or not.', why: '양보 ‘~이든 아니든’ → whether만' },
      { q: 'Let me check [[if]] she’s in the meeting now.', why: '명사절 — if 가능 (whether는 9번에서 사용)' }] },
    { level: 'Intermediate', type: 'write', instr: '어법상 틀린 부분을 찾아 바르게 고쳐 쓰시오.', items: [
      { q: 'If you will try your best, you will get good grades.', a: 'will try → try', why: '워크북 — 조건절 현재시제' },
      { q: 'I wonder if it rains tomorrow.', a: 'rains → will rain', why: '명사절 → will' },
      { q: 'We will go on a picnic if it will be sunny tomorrow.', a: 'will be → is', why: '조건절 → 현재시제' },
      { q: 'I’m not sure if the team wins the game tomorrow.', a: 'wins → will win', why: '명사절 → will (기출 변형)' },
      { q: 'If you will need help, call me anytime.', a: 'will need → need', why: '조건절 → 현재시제' },
      { q: 'If you like it or not, you have to do it.', a: 'If → Whether', why: '양보 ‘~이든 아니든’' },
      { q: 'Nobody knows if the plan succeeds next year.', a: 'succeeds → will succeed', why: '명사절 → will' },
      { q: 'The concert will be canceled if it will rain.', a: 'will rain → rains', why: '조건절 → 현재시제 (기출)' },
      { q: 'Could you give him this note if you will see him?', a: 'will see → see', why: '조건절 → 현재시제' },
      { q: 'I wonder if will they show us the fan dance.', a: 'will they show → they will show', why: '교과서 Write — 명사절 어순' }] },
    { level: 'Advanced · 모두 고르기', type: 'multi', free: true, instr: '해당하는 것을 모두 골라 기호를 쓰시오.', items: [
      { q: '★고난도 — 밑줄 친 if를 whether로 바꿀 수 없는 것을 모두 고르시오.', box: [
        '(a) The concert will be canceled __if__ it rains.', '(b) __If__ a story seems too good to be true, stop and think.', '(c) Let me check __if__ she’s in the meeting now.',
        '(d) He gets angry __if__ you disagree with him.', '(e) I wonder __if__ the reporter saw the scene herself.'], a: '(a), (b), (d)', why: '(a)(b)(d) 조건 ‘~라면’ / (c)(e) 명사절 ‘~인지’ (기출)' },
      { q: '★고난도 — 밑줄 친 if의 쓰임이 본문 “you also have to check __if__ they are based on facts”의 if와 같은 것을 모두 고르시오.', box: [
        '(a) __If__ you keep practicing, you will be able to write well.', '(b) The teacher asked __if__ anyone could answer that question.', '(c) I will give you what you want __if__ you help me.',
        '(d) I wonder __if__ the reporter saw the scene herself.', '(e) Go and see __if__ the door is locked.'], a: '(b), (d), (e)', why: '(a)(c) 조건 / (b)(d)(e) 목적어 명사절 (기출 76번 변형)' },
      { q: '다음 중 밑줄 친 부분에 대한 설명으로 옳은 것을 모두 고르시오.', box: [
        '(a) __If__ a story seems too good to be true, stop and think. → ‘~인지 아닌지’로 해석한다.',
        '(b) I wonder if he __will come__ tomorrow. → 명사절이므로 미래의 일을 will로 나타냈다.',
        '(c) We’ll go swimming if the weather __is__ nice tomorrow. → 조건 부사절이므로 미래의 일을 현재시제로 나타냈다.',
        '(d) Go and see __if__ the door is locked. → 조건의 부사절을 이끈다.',
        '(e) __Whether__ you like it or not, I’m going to buy it. → ‘~이든 아니든’의 뜻이므로 If로 바꿀 수 없다.'], a: '(b), (c), (e)', why: '(a) 조건 ‘~라면’ (d) see의 목적어 명사절 ‘~인지’' },
      { q: '다음 글의 밑줄 친 ⓐ~ⓔ 중 어법상 어색한 것을 모두 골라 기호를 쓰고 바르게 고치시오.', fix: true, label: '기호 / 고친 것', box: [
        'Before you share a story, ask yourself ⓐ __if it is true__. If the story ⓑ __will seem__ too good to be true, stop and think. Check ⓒ __if there is any evidence__. Nobody knows ⓓ __if the story spreads__ fast tomorrow, so be careful. ⓔ __Whether you like it or not__, fake news is everywhere.'],
        a: 'ⓑ will seem → seems, ⓓ spreads → will spread', why: 'ⓑ 조건절 → 현재시제 ⓓ knows의 목적어 명사절 → 미래는 will' },
      { q: '다음 중 어법상 옳은 문장을 모두 고르시오.', box: [
        '(a) I’ll be happy if I will pass the exam.', '(b) I’m not sure if the team will win the game.', '(c) If it will snow tomorrow, we’ll make a snowman.',
        '(d) Could you give him this note if you see him?', '(e) I wonder if it rains tomorrow.'], a: '(b), (d)', why: '(a) pass (c) snows (e) will rain' }] },
    { level: 'Advanced · 객관식', type: 'mcq', free: true, instr: '알맞은 답을 고르시오.', items: [
      { q: '다음 중 밑줄 친 if의 쓰임이 나머지 넷과 다른 것은?', opts: [
        'I’m going to check __if__ you are right.', 'Do you know __if__ he has a girlfriend?', 'I wonder __if__ you have anything cheaper.',
        'He will stay at home __if__ it rains.', 'I am not sure __if__ the team will win the game.'], a: '④', why: '④ 조건 ‘~라면’ / 나머지 명사절 (기출)' },
      { q: '본문 “__If__ a story or a photo seems too good to be true, stop and think.”의 If와 쓰임이 다른 것은?', opts: [
        'I’ll be happy __if__ I pass the exam.', 'I don’t know __if__ he will come to the party.', '__If__ we take the taxi, we won’t be late.',
        'I will do the dishes __if__ you cook.', '__If__ you’re late tomorrow, I will go there alone.'], a: '②', why: '② 명사절 ‘~인지’ / 나머지 조건 (기출 87번)' },
      { q: '(A)~(C)에 알맞은 말이 바르게 짝지어진 것은? — (A) I wonder if she (will come / comes) tomorrow. (B) If it (will rain / rains) tomorrow, I’ll stay home. (C) (If / Whether) you agree or not, we’ll start now.', opts: [
        'comes – rains – If', 'will come – will rain – Whether', 'comes – will rain – If', 'will come – rains – If', 'will come – rains – Whether'], a: '⑤', why: '명사절 will / 조건 현재 / 양보 Whether' },
      { q: '밑줄 친 부분의 우리말 해석으로 알맞은 것은? — I don’t know __if he will come__.', opts: [
        '그가 올지 (안 올지)', '그가 온다면', '그가 오더라도', '그가 왔기 때문에', '그가 오자마자'], a: '①', why: 'know의 목적어 명사절 ‘~인지’' },
      { q: '다음 중 어법상 틀린 문장의 개수는?', box: [
        '(a) If you hurry, you won’t miss the bus.', '(b) I wonder if she will like my gift.', '(c) If it will be cold, wear a coat.',
        '(d) Nobody knows if he wins the race tomorrow.', '(e) Whether you win or lose, enjoy the game.'], opts: ['1개', '2개', '3개', '4개', '5개'], a: '②', why: '(c) is (d) will win' }] },
    { level: '전환 · 연결', type: 'write', instr: '두 문장을 if 또는 whether를 사용하여 한 문장으로 연결하시오. (명사절 · 조건절의 시제에 주의)', items: [
      { q: 'I wonder. + Will it be sunny tomorrow?', a: 'I wonder if it will be sunny tomorrow.', why: '명사절 → will' },
      { q: 'It will be sunny tomorrow. → Then we will go hiking. (If로 시작)', a: 'If it is sunny tomorrow, we will go hiking.', why: '조건절 → 현재시제' },
      { q: 'I don’t know. + Will Tony come?', a: 'I don’t know if Tony will come.', why: '명사절 → will' },
      { q: 'Tony will come. → Then we will start the game. (if를 뒤에)', a: 'We will start the game if Tony comes.', why: '조건절 → 현재시제' },
      { q: 'You hurry. → Then you won’t miss the bus. (If로 시작)', a: 'If you hurry, you won’t miss the bus.', why: '조건' },
      { q: 'Nobody is sure. + Will the team win the game?', a: 'Nobody is sure if the team will win the game.', why: '명사절 → will' },
      { q: 'You like it, or you don’t. I’m going to buy it anyway. (Whether ~ or not)', a: 'Whether you like it or not, I’m going to buy it.', why: '양보 — If ✗' },
      { q: 'Check it. + Is this story based on facts?', a: 'Check if this story is based on facts.', why: '명사절 (본문 응용)' },
      { q: 'A story seems too good to be true. → Then stop and think. (If로 시작)', a: 'If a story seems too good to be true, stop and think.', why: '본문 — 조건' },
      { q: 'I’m not sure. + Will my parents allow me to go there?', a: 'I’m not sure if my parents will allow me to go there.', why: '워크북 — 명사절 → will' }] },
  ], m),

  // ---------------- PERFECT CHECK ----------------
  D.section('PERFECT CHECK', '상위권 함정 체크'),
  ...D.drill(null, '', [{ level: '함정', type: 'choice', instr: '실수하기 쉬운 문장들이에요. 괄호 안에서 알맞은 것을 고르시오.', items: [
    { q: 'Opinions are good to read, but you have to check (what / whether) they are based on facts.', a: 'whether', why: '본문 — 뒤가 완전한 절 · ‘~인지’' },
    { q: '(If / Whether) a story or a photo seems too good to be true, stop and think.', a: 'If', why: '본문 — 조건 ‘~라면’' },
    { q: 'I wonder if he (will catch / catches) my ball tomorrow.', a: 'will catch', why: '명사절 → will' },
    { q: 'If it (will rain / rains) tomorrow, the concert will be canceled.', a: 'rains', why: '조건절 → 현재시제' },
    { q: '(If / Whether) he will come or not is another matter.', a: 'Whether', why: '주어 자리' },
    { q: 'I don’t know (whether / if) to agree.', a: 'whether', why: 'to부정사 앞' },
    { q: 'He said to me, “Do you like her?” → He asked me whether I (like / liked) her.', a: 'liked', why: '간접화법 — 시제 일치 (같은 과 간접화법 · 기출)' },
    { q: 'The foreigner said to me, “Can you speak English?” → The foreigner (told / asked) me if I could speak English.', a: 'asked', why: '의문문 전달 → asked + if (같은 과 간접화법 · 기출)' },
    { q: 'Do you know if (he is / is he) married?', a: 'he is', why: '간접의문문 어순' },
    { q: 'I’m not sure (if / that) she will come or not.', a: 'if', why: 'or not → if[whether]' }] }], m),

  // ---------------- WRITE ----------------
  D.section('WRITE', '서술형 대비'),
  ...D.writeItem(1, 'Basic', '괄호 안의 단어를 배열하여 빈칸에 알맞은 말을 쓰시오.', ['I wonder ______________________ my present. (like, if, will, she)'], { a: 'if she will like', why: 'if + 주어 + 동사 · 명사절 속 미래는 will (교과서 Write)' }, m),
  ...D.writeItem(2, 'Basic', '괄호 안의 동사를 알맞은 형태로 바꾸어 쓰시오.', ['We will go swimming if the weather (be) nice tomorrow. (교과서)'], { a: 'is', why: '조건 부사절 → 미래도 현재시제' }, m),
  ...D.writeItem(3, 'Intermediate', '두 문장을 if를 사용하여 한 문장으로 연결하시오. [두 문장 연결]', ['You also have to check something. / Are they based on facts?'],
    { a: 'You also have to check if they are based on facts.', why: '본문 — if + 주어 + 동사' }, m),
  ...D.writeItem(4, 'Intermediate', '직접화법을 간접화법으로 바꾸어 쓰시오. [문장 전환]', ['Mina said to me, “Did you finish your homework?”'],
    { a: 'Mina asked me if[whether] I had finished my homework.', why: '의문사 없는 의문문 → asked + if · 과거 → 과거완료 · your → my' }, m),
  ...D.writeItem(5, 'Intermediate', '밑줄 친 부분을 문장의 주어로 하여 다시 쓰시오. [문장 전환]', ['It is not important __whether he is rich or not__.'],
    { a: 'Whether he is rich or not is not important.', why: '주어 자리 → whether만 (If ✗)' }, m),
  ...D.writeItem(6, 'Intermediate', '두 문장을 whether or not을 사용하여 한 문장으로 연결하시오. [두 문장 연결]', ['I’m not sure. / Will the team win the game?'],
    { a: 'I’m not sure whether or not the team will win the game.', why: 'whether or not + 주어 + 동사 · 명사절 → will (if or not ✗)' }, m),
  ...D.writeItem(7, 'Advanced', '우리말과 같은 뜻이 되도록 <조건>에 맞게 영작하시오.', ['나는 사람들이 내 의견에 동의할지 궁금하다.', '<조건> wonder, if, agree with, opinion을 사용할 것 · 미래시제를 사용할 것 · 총 9단어'],
    { a: 'I wonder if people will agree with my opinion.', why: '명사절 → will · 9단어 (I/wonder/if/people/will/agree/with/my/opinion)' }, m),
  ...D.writeItem(8, 'Advanced', '<보기>의 단어를 배열하여 문장을 완성하시오.', ['그가 올지 안 올지는 나에게 중요하지 않다.', '<보기> is / whether / come / not / he / important / or not / will / to me'],
    { a: 'Whether he will come or not is not important to me.', why: '주어 자리 whether절 + 단수 동사 is (워크북)' }, m),
  ...D.writeItem(9, 'Advanced', '어법상 틀린 부분 2개를 찾아 바르게 고치고, 그 이유를 쓰시오.', ['I wonder if will she like my present. If she will like it, I will be very happy.'],
    { a: '① will she like → she will like  ② will like → likes', why: '① 명사절은 if + 주어 + 동사 어순 ② 조건 부사절은 미래의 일도 현재시제', blanks: ['고친 것', '이유'] }, m),
  ...D.writeItem(10, 'Advanced', '어법상 틀린 부분 2개를 찾아 바르게 고치고, 그 이유를 쓰시오.', ['I can’t decide if to buy this bike. It depends on if I can save enough money.'],
    { a: '① if to → whether to  ② on if → on whether', why: '① to부정사 앞에는 whether만 ② 전치사 뒤에는 whether만', blanks: ['고친 것', '이유'] }, m),

  // ---------------- MAP ----------------
  D.section('MAP', "DAVID'S MAP — 백지노트 테스트"),
  D.P([D.T('오늘 배운 내용을 떠올리며 빈칸을 채워 보세요. 책을 보지 않고!', { size: 18, color: '595959' })], { spacing: { after: 120 }, keepNext: true }),
  ...D.image(path.join(__dirname, 'map_G-if.png'), 620),
  ...D.table(['자가 체크 — 백지노트에 이 단어들이 들어갔나요?', '✔'], [
    ['명사절 if[whether] = ~인지 (아닌지) — know · ask · wonder · check · see의 목적어', ''], ['어순: if + 주어 + 동사 (if will he ✗ · if does she ✗)', ''],
    ['의문사가 있으면 의문사, 없으면 if[whether] · 확실하면 that', ''], ['whether 전용석: 주어 · 보어 · 전치사 뒤 · to부정사 앞 · or not 바로 앞', ''],
    ['if ~ or not (절 끝) ○ / if or not ✗ / whether or not ○', ''], ['명사절 if → 미래는 will 그대로 (I wonder if it will rain)', ''],
    ['조건 if → 미래도 현재시제 (If it rains tomorrow, ~)', ''], ['조건 if는 whether로 바꿀 수 없다 · Whether ~ or not, = ~이든 아니든', ''],
    ['간접화법: He asked me if I liked her. (said to → asked · 시제 일치)', ''],
    ['본문: You also have to check if they are based on facts.', '']], [8838, 800], m),
  ...D.memo(['다음 시간 도입: if 10초 판별 퀴즈 — ‘~인지 / ~라면’ 10문항 (본문 두 if 포함)', '약한 반: Point 1 어순 + Point 3 쓰임 구별 집중 → Point 2는 ‘주어 · to부정사 앞 · or not 앞 = whether’만',
    '같은 과 간접화법(의문문 전달 asked if + 시제 일치)과 묶어 서술형 2문항 추가 연습', '본문 문장 2개(If a story … stop and think / check if they are based on facts) 통째 암기 확인'], m),
];
D.render(meta, build, process.argv[2] || '.').then(fs_ => {
  const out = fs_.map(f => { const g = f.replace('DAVID_G-if_if (~인지 아닌지)', 'DAVID_G-if_if_인지아닌지'); fs.renameSync(f, g); return g; });
  console.log(out.join('\n'));
});
