const D = require('./david_base');
const path = require('path');
const COVER = JSON.parse(process.env.COVER || '{}');
const meta = { series: D.SERIES.G, code: 'G-과거완료', title: '과거완료', category: 'G. 시제  |  과거완료 had p.p.',
  rightText: 'G  과거완료 had p.p.', prefix: process.env.PREFIX || '', cover: COVER.title ? COVER : undefined,
  question: 'Nobel ~~read~~ the article. / The article said Nobel ~~had died~~ in France. — 둘 다 지나간 일인데 왜 하나는 read, 하나는 had died일까?' };

const build = (m) => [
  D.section('FLOW', 'Teaching Flow — 처음 배우는 사람도 따라오는 5단계'),
  ...D.step(1, '우리말로 먼저 생각하기 — ‘그보다 더 전에’', [
    '‘내가 극장에 도착했을 때, 연극은 이미 끝나 있었다.’ — 도착한 것도, 끝난 것도 지난 일. 그런데 연극이 끝난 일이 {{더 먼저}}다.',
    '우리말은 ‘~해 있었다, ~했었다’로 느낌만 주지만, 영어는 동사 모양 {{had + p.p.}}로 ‘더 이전’을 분명히 표시한다.'], m),
  ...D.step(2, '이전 단원 복습 — 현재완료 have p.p.', [
    'I {{have lived}} here for ten years. — 과거부터 {{지금}}까지 이어지는 일 (완료 · 경험 · 계속 · 결과)',
    'have p.p.의 기준은 언제나 ‘지금’. 그렇다면 기준이 ‘과거의 한 시점’이라면?'], m),
  ...D.step(3, '문제 제기 — 둘 다 과거인데, 무엇이 먼저?', [
    'Nobel **read** the article. + (기사 내용) Nobel **died** in France from a heart attack.',
    '기사를 읽은 것도, 기사 속 죽음도 모두 과거. 어느 쪽이 먼저인지 어떻게 보여 줄까?'], m),
  ...D.step(4, '규칙 발견 — 먼저 일어난 일에 had + p.p.', [
    'The article **said** Alfred Nobel {{had died}} in France from a heart attack. (본문)',
    '기사가 말한 시점(과거)보다 죽은 일이 더 먼저 → 대과거 = {{had + p.p.}} / 나중 일(said)은 그냥 과거시제'], m),
  ...D.step(5, '결론 🔑', [
    '과거완료 = {{had + p.p.}} / 과거의 기준 시점보다 {{먼저}} 일어난 일(대과거) / 현재완료처럼 완료 · 경험 · 계속 · {{결과}} / 나중 일은 그냥 {{과거시제}}'], m),
  ...D.infoBox('오늘의 핵심 3문장', [
    '① The article said Alfred Nobel {{had died}} in France from a heart attack. (본문)',
    '② It said that he {{had become}} rich from the deaths of others. (본문)',
    '③ They {{had finished}} the pizza before their friends arrived. (교과서)'], m),
  ...D.tip(['칠판에 타임라인(대과거 → 과거 → 현재)을 그리고, 본문 문장의 두 사건(said / had died)에 ①②를 붙이게 한다. 먼저 일어난 ①에만 had가 붙는다.',
    '같은 과 문법 분사구문과 함께 출제되므로 PERFECT CHECK에 분사구문 2문항을 섞어 두었다. 과거완료 진행(had been -ing)은 Point 2에서 형태만 간단히 소개한다.'], m),

  // ---------------- Point 1 ----------------
  D.section('Point 1', 'had + p.p. — 형태와 대과거 · said / knew / found that + had p.p.', 'point'),
  ...D.table(['구성', '역할 · 설명', '예'], [
    ['had + p.p.', '주어의 인칭 · 수와 상관없이 항상 had (has ✗) — p.p.는 과거분사', 'The article said Alfred Nobel **had died** in France from a heart attack. (본문)'],
    ['대과거', '과거에 일어난 두 일 중 더 먼저 일어난 일', 'They **had finished** the pizza before their friends arrived. (교과서)'],
    ['said · knew · found · realized + (that) had p.p.', '전달 · 인식한 시점(과거)보다 앞선 일 — 간접화법의 시제 일치', 'It said that he **had become** rich from the deaths of others. (본문)'],
    ['관계사절 속 had p.p.', '문장 동사(과거)보다 앞선 일을 관계사절에서 표시', 'The person who **had actually died** was his brother, Ludvig. (본문)'],
    ['부정 · 의문', 'had not(hadn’t) + p.p. / Had + 주어 + p.p. ~?', 'I **hadn’t seen** her in years. / **Had** you **met** her before?']], [2300, 3300, 4038], m),
  ...D.infoBox('타임라인 3단계 — 두 사건에 번호 붙이기', [
    '① 문장 속 두 사건 찾기: 기사가 말했다(said) / Nobel이 죽었다(die)',
    '② 더 먼저 일어난 일에 ① 표시: 죽은 일 → {{had died}}',
    '③ 나중 일 ②는 과거시제 그대로: said · read · found · arrived → The article said Alfred Nobel had died in France.'], m),
  ...D.trick('먼저 간 쪽이 had!', ['“두 과거 중 먼저 일어난 쪽에만 had — 형님은 had!”', '“had 뒤엔 p.p. — had became ✗, had become ○”']),
  ...D.examPoint([
    { q: 'It said Nobel {{had died}} in France from a heart attack. (has died ✗)', why: '기사가 말한 시점(과거)보다 먼저 → had p.p. (본문 기출)' },
    { q: 'It said that he had {{become}} rich from the deaths of others. (became ✗)', why: 'had + 과거분사 become (본문 기출)' }], m),
  ...D.caution(['had 뒤에 과거형을 쓴 선지(had became · had began · had ran · had woke)가 가장 흔한 형태 오답이다.',
    '기준이 과거인데 현재완료를 쓴 선지(When we got there, the game has already started ✗)가 짝으로 나온다.',
    '‘먼저 일어난 일’을 과거로 둔 선지 — She had lost the bag that her father bought for her. ✗ (아빠가 산 일이 먼저 → had bought) (기출)'], m),
  ...D.drill(1, 'had + p.p. — 형태와 대과거', [
    { level: 'Basic ①', type: 'choice', instr: '괄호 안에서 알맞은 것을 고르시오.', items: [
      { q: 'The article said Nobel (has died / had died) in France from a heart attack.', a: 'had died', why: '기사가 말한 시점보다 먼저 (본문)' },
      { q: 'It said that he had (became / become) rich from the deaths of others.', a: 'become', why: 'had + 과거분사 (본문)' },
      { q: 'The person who had actually (died / dead) was his brother, Ludvig.', a: 'died', why: 'had + 과거분사 died (본문)' },
      { q: 'I knew who he was. I (had seen / have seen) him before.', a: 'had seen', why: '안 시점(과거)보다 먼저 본 일' },
      { q: 'When we got there, the game (has already started / had already started).', a: 'had already started', why: '기준 시점이 과거 → had p.p. (기출)' },
      { q: 'They (have finished / had finished) the pizza before their friends arrived.', a: 'had finished', why: '친구들이 도착하기 전 (교과서)' },
      { q: 'When Tom opened the door, Jina (had / has) already finished her homework.', a: 'had', why: '문을 연 시점(과거)보다 먼저 (교과서)' },
      { q: 'Sarah couldn’t work because she (had had / has had) a surgery last week.', a: 'had had', why: 'had + p.p.(had) — 수술이 먼저' },
      { q: 'She lost the ring that I (had given / have given) to her on her birthday.', a: 'had given', why: '반지를 준 일이 잃어버린 일보다 먼저' },
      { q: 'I realized that I (have left / had left) my key at home.', a: 'had left', why: '깨달은 시점보다 먼저 (기출)' }] },
    { level: 'Basic ②', type: 'fill', instr: '<보기>에서 알맞은 말을 골라 빈칸에 쓰시오. (한 번씩만 사용)',
      bogi: ['lost', 'become', 'hadn’t', 'arrived', 'died', 'realized', 'had', 'eaten', 'stolen', 'left'], items: [
      { q: 'The article said Alfred Nobel had [[died]] in France from a heart attack.', why: '본문 — had + p.p.' },
      { q: 'It said that he had [[become]] rich from the deaths of others.', why: '본문 — become의 p.p.는 become' },
      { q: 'When David arrived at the station, the train had already [[left]].', why: '교과서 In Context — leave-left-left' },
      { q: 'They had finished the pizza before their friends [[arrived]].', why: '교과서 — 나중 일은 과거시제' },
      { q: 'When Tom opened the door, Kate had already [[eaten]] an apple.', why: '교과서 Practice — eat-ate-eaten' },
      { q: 'The person who [[had]] actually died was his brother, Ludvig.', why: '본문 — 신문 보도보다 먼저 죽은 일' },
      { q: 'I didn’t recognize Susan at first. I [[hadn’t]] seen her in years.', why: '과거완료 부정 had not + p.p.' },
      { q: 'She found that someone had [[stolen]] her diamond ring.', why: '기출 — steal-stole-stolen' },
      { q: 'Jimmy had to borrow some money because he had [[lost]] his bag.', why: '기출 — 가방을 잃은 일이 먼저' },
      { q: 'I [[realized]] that I had left my key at home.', why: '기출 — 나중 일(깨달음)은 과거시제' }] },
    { level: 'Intermediate', type: 'write', instr: '어법상 틀린 부분을 찾아 바르게 고쳐 쓰시오.', items: [
      { q: 'The article said Nobel has died in France from a heart attack.', a: 'has died → had died', why: '본문 — 기준 시점이 과거(said)' },
      { q: 'It said that he had became rich from the deaths of others.', a: 'had became → had become', why: '본문 기출 — had + 과거분사' },
      { q: 'When I got to the store, it has already closed.', a: 'has → had', why: '기출 — 도착한 시점(과거)보다 먼저' },
      { q: 'She lost the ring that I have given to her on her birthday.', a: 'have given → had given', why: '준 일이 잃어버린 일보다 먼저' },
      { q: 'When we arrived at school, the ceremony has started.', a: 'has started → had started', why: '기준 시점이 과거' },
      { q: 'I knew who he was. I have seen him before.', a: 'have seen → had seen', why: '안 시점(과거)보다 먼저 본 일' },
      { q: 'When Judy arrived at the theater, the movie had already begin.', a: 'begin → begun', why: 'begin-began-begun' },
      { q: 'The person who had actually die was his brother, Ludvig.', a: 'die → died', why: '본문 — had + 과거분사' },
      { q: 'Mike didn’t want to see the movie because he already sees it.', a: 'already sees → had already seen', why: '보고 싶지 않았던 시점보다 먼저 본 일' },
      { q: 'I found out that she loses her bag.', a: 'loses → had lost', why: '알게 된 시점보다 먼저 잃어버린 일' }] },
    { level: 'Advanced · 모두 고르기', type: 'multi', free: true, instr: '해당하는 것을 모두 골라 기호를 쓰시오.', items: [
      { q: '다음 중 어법상 옳은 문장을 모두 고르시오.', box: [
        '(a) When I got home, everybody had already gone to bed.', '(b) They had finished the pizza before their friends arrived.', '(c) It said that he had became rich from the deaths of others.',
        '(d) I realized that I had left my key at home.', '(e) When we got there, the game has already started.'], a: '(a), (b), (d)', why: '(c) had become (e) has → had' },
      { q: '밑줄 친 had p.p.가 ‘더 먼저 일어난 일’을 바르게 나타낸 것을 모두 고르시오.', box: [
        '(a) The article said Nobel __had died__ in France from a heart attack.', '(b) I __had gone__ to school after I took a shower.', '(c) Ali was upset because Lasid __had lied__ to him.',
        '(d) When the police arrived, the thieves __had already run__ away.', '(e) After I watched TV, I __had gone__ to bed.'], a: '(a), (c), (d)', why: '(b)(e) 학교에 간 일 · 잠자리에 든 일이 나중 → went (기출 변형)' },
      { q: '문장 속 두 사건의 순서를 바르게 설명한 것을 모두 고르시오.', box: [
        '(a) When I got home, the show had already ended. → 쇼가 끝난 일이 먼저다.',
        '(b) I remembered I had left my textbooks in Grandma’s car. → 기억해 낸 일이 먼저다.',
        '(c) The rabbits had less to eat because the deer had eaten their food. → 사슴이 먹이를 먹은 일이 먼저다.',
        '(d) The person who had actually died was his brother, Ludvig. → 형이 죽은 일은 신문 보도보다 나중이다.',
        '(e) Everyone was surprised at what Gansong had done. → 간송이 한 일이 먼저다.'], a: '(a), (c), (e)', why: '(b) 교과서를 두고 온 일이 먼저 (d) 형이 죽은 일이 먼저 (본문)' },
      { q: '다음 글(본문 변형)의 밑줄 친 ⓐ~ⓔ 중 어법상 어색한 것을 모두 골라 기호를 쓰고 바르게 고치시오.', fix: true, label: '기호 / 고친 것', box: [
        'It was just a normal morning. While Alfred Nobel ⓐ __was drinking__ his coffee, a headline caught his eye. The article was about his own death! It said Nobel ⓑ __has died__ in France from a heart attack. It also said that he ⓒ __had become__ rich from the deaths of others. In fact, the person who ⓓ __had actually died__ was his brother, Ludvig. After he read the article, Nobel ⓔ __had decided__ to change people’s opinions about him.'],
        a: 'ⓑ has died → had died, ⓔ had decided → decided', why: 'ⓑ 기사가 말한 시점(과거)보다 먼저 ⓔ 기사를 읽은 뒤의 일(나중 일) → 과거시제' },
      { q: '빈칸에 had가 들어갈 수 있는 것을 모두 고르시오.', box: [
        '(a) She ______ just finished her homework, so she can go out now.', '(b) When I woke up, the rain ______ stopped.', '(c) I ______ never seen snow before I moved to Canada.',
        '(d) Look! It ______ stopped raining.', '(e) The bus ______ already left when I got to the stop.'], a: '(b), (c), (e)', why: '(a)(d) 기준이 지금(now · Look!) → has' }] },
    { level: 'Advanced · 객관식', type: 'mcq', free: true, instr: '알맞은 답을 고르시오.', items: [
      { q: '다음 우리말과 같은 뜻이 되도록 빈칸에 들어갈 말로 알맞은 것은? — 우리가 그곳에 도착했을 때, 경기는 이미 시작했었다. → When we got there, the game ______.', opts: [
        'already starts', 'has already started', 'already starting', 'had already started', 'have already started'], a: '④', why: '도착한 시점(과거)보다 먼저 → had p.p. (기출)' },
      { q: '빈칸 (A), (B)에 들어갈 말이 바르게 짝지어진 것은?', box: [
        '• They (A) ______ the pizza before their friends arrived.', '• When I (B) ______ this morning, the rain had already stopped.'],
        opts: ['have finished – woke up', 'had finished – woke up', 'had finished – woken up', 'finished – had woke up', 'finish – had woken up'], a: '②', why: '(A) 먼저 일어난 일 had finished (B) 나중 일은 과거시제 woke up (기출)' },
      { q: '다음 중 과거완료 시제의 쓰임이 어색한 문장은?', opts: [
        'When I got to the store, it had already closed.', 'My brother had already eaten pizza when I came back home.', 'We knew about Tony because we had met him before.',
        'There had been a cute cat in my house before I was born.', 'She had lost the bag that her father bought for her.'], a: '⑤', why: '⑤ 아빠가 산 일이 먼저 → She lost the bag that her father had bought for her. (기출)' },
      { q: '본문의 빈칸에 들어갈 말로 알맞은 것은? — The article was about his own death! It said Nobel ______ in France from a heart attack.', opts: [
        'had died', 'die', 'is dying', 'had dyed', 'has been dead'], a: '①', why: '기사가 말한 시점보다 먼저 죽은 일 → had died (dyed는 ‘염색했다’) (본문 기출)' },
      { q: '우리말을 영작할 때 빈칸에 알맞은 것은? — 기사에는 그가 다른 사람들의 죽음으로 인해 부유해졌다고 쓰여 있었다. → It said that ______.', opts: [
        'he become rich from the deaths of others', 'he becomes rich from the deaths of others', 'he had become rich from the deaths of others',
        'he has became rich from the deaths of others', 'he had became rich from the deaths of others'], a: '③', why: 'had + 과거분사 become (본문 기출)' }] },
    { level: '전환 · 연결', type: 'write', instr: '먼저 일어난 일을 과거완료로 바꾸어, 괄호 안의 말을 사용하여 한 문장으로 연결하시오.', items: [
      { q: 'The article said something. Nobel died in France from a heart attack. (that)', a: 'The article said (that) Nobel had died in France from a heart attack.', why: '본문 — 죽은 일이 먼저' },
      { q: 'It said something. He became rich from the deaths of others. (that)', a: 'It said that he had become rich from the deaths of others.', why: '본문 — 부유해진 일이 먼저' },
      { q: 'David arrived at the station. The train already left. (when)', a: 'When David arrived at the station, the train had already left.', why: '교과서 In Context' },
      { q: 'I woke up this morning. The rain stopped. (when)', a: 'When I woke up this morning, the rain had stopped.', why: '교과서 · 기출 서술형' },
      { q: 'I arrived at the theater. The play already ended. (when)', a: 'When I arrived at the theater, the play had already ended.', why: '교과서 In Context' },
      { q: 'Juwon said, “My mom was sick.” (간접화법)', a: 'Juwon said (that) his mom had been sick.', why: '직접화법의 과거 → 간접화법에서 had p.p.' },
      { q: 'I realized something. I left my key at home. (that)', a: 'I realized that I had left my key at home.', why: '기출 — 두고 온 일이 먼저' },
      { q: 'The police arrived. The thieves already ran away. (when)', a: 'When the police arrived, the thieves had already run away.', why: 'run-ran-run (had ran ✗)' },
      { q: 'He said, “I lost my key.” (간접화법)', a: 'He said (that) he had lost his key.', why: '말한 시점보다 먼저 잃어버린 일 · I → he, my → his' },
      { q: 'Ali was upset. Lasid lied to him. (because)', a: 'Ali was upset because Lasid had lied to him.', why: '거짓말한 일이 먼저' }] },
  ], m),

  // ---------------- Point 2 ----------------
  D.section('Point 2', '과거완료의 4가지 용법 — 완료 · 경험 · 계속 · 결과 (+ 과거완료 진행)', 'point'),
  ...D.table(['용법', '의미 · 단서', '예'], [
    ['완료', '(과거 시점까지) 막 / 이미 ~했었다 — just, already, yet', 'When I got to the airport, the plane **had already left**. / I **had just finished** breakfast when he woke up. (교과서)'],
    ['경험', '(과거 시점까지) ~한 적이 있었다 — never, ever, before, once', 'She **had never visited** Busan before we took her there. (교과서 Grammar✚)'],
    ['계속', '(과거 시점까지) 계속 ~해 왔었다 — for + 기간, since + 시작점, until', 'When I came back, he **had been** ill in bed for three days. (교과서 Grammar✚)'],
    ['결과', '~해 버려서 (과거 시점에) …인 상태였다', 'He **had lost** his wallet, so he couldn’t pay the taxi driver.'],
    ['(참고) 과거완료 진행', 'had been + -ing — 과거 시점까지 계속 진행 중이던 동작 (형태만 알아 두기)', 'I **had been reading** in bed for half an hour when my mom came in.']], [2000, 3400, 4238], m),
  ...D.infoBox('용법은 현재완료와 같다 — 기준만 ‘과거’로', [
    '현재완료 have p.p. 기준 = {{지금}} / 과거완료 had p.p. 기준 = {{과거의 한 시점}}',
    'already · just → 완료 / never · ever · before → {{경험}} / for · since → 계속 / ‘~해 버려서 …했다’ → 결과',
    'had been to(~에 가 본 적이 있었다 · 경험) vs had gone to(가 버리고 없었다 · 결과) / 과거완료 진행 = had been + {{-ing}}'], m),
  ...D.trick('완경계결 — 기준만 과거!', ['“완경계결은 현재완료 복붙 — 기준이 지금이면 have, 과거면 had!”', '“가 봤으면 been, 가 버렸으면 gone”']),
  ...D.examPoint([
    { q: 'The thought {{had never}} even crossed her mind until she read that star. (외부지문)', why: '경험 — 그 별을 읽기 전까지 한 번도 (기출)' },
    { q: 'When I came back, he had been ill in bed {{for}} three days. (since ✗)', why: '계속 — for + 기간 (교과서 Grammar✚)' }], m),
  ...D.caution(['already가 없는 결과 용법(He had lost his key, so he couldn’t open the locker.)을 완료로 고르는 실수가 많다.',
    'for(기간) / since(시작점) 짝을 바꾼 선지, had been to(경험) / had gone to(결과)를 바꾼 선지가 함께 나온다.',
    '과거완료 진행 had been -ing는 교과서 범위 밖 — had been reading ○ / had being reading ✗ 형태만 확인시킨다.'], m),
  ...D.drill(2, '과거완료의 용법 · 함께 쓰는 부사', [
    { level: 'Basic ①', type: 'choice', instr: '괄호 안에서 알맞은 것을 고르시오.', items: [
      { q: 'When I got to the airport, the plane had (already / yet) left.', a: 'already', why: '완료 — 긍정문 already' },
      { q: 'I had never (saw / seen) a beautiful beach before I went to Hawaii.', a: 'seen', why: '경험 — had + 과거분사' },
      { q: 'I had lived in Gimhae (since / for) 10 years until I moved to Busan.', a: 'for', why: '계속 — for + 기간' },
      { q: 'I was really hungry because I hadn’t eaten anything (since / for) breakfast.', a: 'since', why: '계속 — since + 시작점' },
      { q: 'I was very excited since I had never (been / gone) to Dokdo before.', a: 'been', why: '경험 — had been to (had gone to = 가 버렸다)' },
      { q: 'He couldn’t open the locker because he had (losing / lost) his key.', a: 'lost', why: '결과 — had + 과거분사' },
      { q: 'I had been (reading / read) in bed for half an hour when my mom came in.', a: 'reading', why: '과거완료 진행 had been + -ing' },
      { q: 'She had never visited Paris (since / until) last month.', a: 'until', why: '지난달까지 한 번도 — until + 과거 시점' },
      { q: 'It was the best film that I (have / had) ever seen.', a: 'had', why: '경험 — 기준 시점이 과거(was)' },
      { q: 'He found that the bus had just left. — 여기서 had just left의 용법은 (완료 / 결과)이다.', a: '완료', why: 'just — 막 떠났다 (완료)' }] },
    { level: 'Basic ②', type: 'fill', instr: '<보기>에서 알맞은 말을 골라 빈칸에 쓰시오. (한 번씩만 사용)',
      bogi: ['since', 'ever', 'just', 'never', 'yet', 'for', 'before', 'been', 'already', 'until'], items: [
      { q: 'When I got to the station, the train had [[already]] left.', why: '완료 — 이미 떠났다' },
      { q: 'The thought had [[never]] even crossed her mind until she read that star.', why: '외부지문 기출 — 경험' },
      { q: 'When I came back, he had been ill in bed [[for]] three days.', why: '교과서 Grammar✚ — 계속, for + 기간' },
      { q: 'I was really hungry this evening as I hadn’t eaten anything [[since]] breakfast.', why: '계속 — since + 시작점' },
      { q: 'I had [[just]] finished breakfast when he woke up.', why: '교과서 Grammar✚ — 완료, 막' },
      { q: 'Elsa had never tasted octopus [[until]] she visited Korea.', why: '경험 — ~할 때까지 한 번도' },
      { q: 'When I visited my grandmother, she had [[been]] ill for five days.', why: '기출 — 계속, had been' },
      { q: 'The invitation hadn’t arrived [[yet]] when he went home.', why: '완료 — 부정문 yet' },
      { q: 'She had never visited Busan [[before]] we took her there.', why: '교과서 Grammar✚ — 경험' },
      { q: 'It was the most beautiful beach I had [[ever]] seen.', why: '경험 — 최상급 + had ever p.p.' }] },
    { level: 'Intermediate', type: 'write', instr: '어법상 틀린 부분을 찾아 바르게 고쳐 쓰시오.', items: [
      { q: 'I had never saw a beautiful beach before I went to Hawaii.', a: 'saw → seen', why: 'had + 과거분사' },
      { q: 'When I came back, he had been ill in bed since three days.', a: 'since → for', why: '기간(three days) → for' },
      { q: 'I had lived in Gimhae for 10 years until I move to Busan.', a: 'move → moved', why: '기준 시점(나중 일) → 과거시제' },
      { q: 'He has lost his wallet, so he couldn’t pay the taxi driver.', a: 'has → had', why: '결과 — 기준 시점이 과거(couldn’t)' },
      { q: 'Until last month, she has never eaten Chinese food.', a: 'has → had', why: '경험 — 기준 last month(과거)' },
      { q: 'I had been read in bed for half an hour when my mom came in.', a: 'read → reading', why: '과거완료 진행 had been + -ing' },
      { q: 'My sister was very excited because she had never gone to Jeju Island before.', a: 'gone → been', why: '경험 had been to (had gone to = 가 버렸다)' },
      { q: 'I just have bought the flight tickets when it started to snow heavily.', a: 'just have bought → had just bought', why: '완료 — 기준 시점 과거 · just는 had 뒤' },
      { q: 'It was the best film that I have ever seen.', a: 'have → had', why: '경험 — 기준 시점이 과거(was)' },
      { q: 'The thought had never even cross her mind until she read that star.', a: 'cross → crossed', why: '외부지문 — had + 과거분사' }] },
    { level: 'Advanced · 모두 고르기', type: 'multi', free: true, instr: '해당하는 것을 모두 골라 기호를 쓰시오.', items: [
      { q: '밑줄 친 과거완료의 용법이 ‘경험’인 것을 모두 고르시오.', box: [
        '(a) When I got to the airport, the plane __had already left__.', '(b) She __had never visited__ Busan before we took her there.', '(c) He __had lost__ his key, so he couldn’t open the locker.',
        '(d) Until last month, she __had never eaten__ Chinese food.', '(e) I __had never seen__ a beautiful beach before I went to Hawaii.'], a: '(b), (d), (e)', why: '(a) 완료 (c) 결과' },
      { q: '두 문장의 과거완료 용법이 서로 같은 것을 모두 고르시오.', box: [
        '(a) I had just finished breakfast when he woke up. / When I arrived, the movie had already started.',
        '(b) I had lived there for three years until I went to France. / He had been ill in bed for three days.',
        '(c) He had lost his wallet, so he couldn’t pay. / She had never visited Busan before.',
        '(d) Until last month, she had never eaten Chinese food. / When Jason got home, the thief had already broken the window.',
        '(e) The thought had never crossed her mind until she read that star. / I had never seen snow before I moved to Canada.'], a: '(a), (b), (e)', why: '(a) 완료 · 완료 (b) 계속 · 계속 (c) 결과 · 경험 (d) 경험 · 완료 (e) 경험 · 경험' },
      { q: '다음 중 어법상 옳은 문장을 모두 고르시오.', box: [
        '(a) I had never went to Jeju Island before.', '(b) It was the best film that I have ever seen.', '(c) He had stayed up late until his family returned.',
        '(d) I had never seen snow before I move to Canada.', '(e) When I visited her, she had been ill for five days.'], a: '(c), (e)', why: '(a) went → been (b) have → had (d) move → moved (기출)' },
      { q: '다음 글(외부지문 변형)의 밑줄 친 ⓐ~ⓔ 중 어법상 어색한 것을 모두 골라 기호를 쓰고 바르게 고치시오.', fix: true, label: '기호 / 고친 것', box: [
        'One of my students, Lucy, ⓐ __showed__ slow progress during the year. After I gave out the stars, she approached me. She ⓑ __was crying__. No one ⓒ __has ever told__ her that she was smart. The thought ⓓ __had never even crossed__ her mind until she ⓔ __reads__ that star.'],
        a: 'ⓒ has ever told → had ever told, ⓔ reads → read', why: 'ⓒ 기준 시점이 과거 → 경험의 과거완료 ⓔ until 뒤 기준 시점(과거) → 과거시제' },
      { q: '빈칸에 had been이 들어갈 수 있는 것을 모두 고르시오.', box: [
        '(a) When I came back, he ______ ill in bed for three days.', '(b) Look! The window ______ broken by someone.', '(c) I ______ to Dokdo twice before I turned ten.',
        '(d) I ______ reading in bed for half an hour when my mom came in.', '(e) She ______ ill since last Friday, so she is still at home.'], a: '(a), (c), (d)', why: '(b) 기준 지금(Look!) → has been (e) 지금도(is still) → has been' }] },
    { level: 'Advanced · 객관식', type: 'mcq', free: true, instr: '알맞은 답을 고르시오.', items: [
      { q: '밑줄 친 부분의 용법이 <보기>와 같은 것은?', box: ['<보기>  When I arrived at the theater, the movie __had already started__.'], opts: [
        'I __had never seen__ a koala before I went to Australia.', 'He __had lost__ his key, so he couldn’t open the locker.', 'I __had lived__ there for three years until I went to France.',
        'She __had never eaten__ Chinese food until last month.', 'I __had just finished__ breakfast when he woke up.'], a: '⑤', why: '<보기> · ⑤ 완료 / ①④ 경험 ② 결과 ③ 계속' },
      { q: '다음 중 밑줄 친 과거완료의 용법이 나머지 넷과 다른 것은?', opts: [
        'She __had never visited__ Busan before we took her there.', 'I __had never seen__ a beautiful beach before I went to Hawaii.', 'Yuna __had lived__ in Seoul for ten years before she moved to Incheon.',
        'I __had been__ to Dokdo twice before I turned ten.', 'The thought __had never crossed__ her mind until she read that star.'], a: '③', why: '③ 계속 / 나머지 경험' },
      { q: '빈칸에 들어갈 말로 알맞은 것은? — I was really hungry because I hadn’t eaten anything ______ breakfast.', opts: [
        'since', 'for', 'during', 'until', 'by'], a: '①', why: '계속 — since + 시작점(breakfast)' },
      { q: '우리말을 영어로 바르게 옮긴 것은? — 내가 돌아왔을 때, 그는 3일 동안 병상에 누워 있었다.', opts: [
        'When I came back, he has been ill in bed for three days.', 'When I came back, he had been ill in bed since three days.', 'When I had come back, he was ill in bed for three days.',
        'When I came back, he had been ill in bed for three days.', 'When I came back, he had being ill in bed for three days.'], a: '④', why: '계속 — had been + for + 기간 (교과서 Grammar✚)' },
      { q: '(A)~(C)에 알맞은 말이 바르게 짝지어진 것은? — (A) I had never (saw / seen) snow before I moved to Canada. (B) When I came back, he had been ill (for / since) three days. (C) It was the best film that I (have / had) ever seen.', opts: [
        'saw – for – have', 'seen – for – had', 'seen – since – had', 'saw – since – had', 'seen – for – have'], a: '②', why: 'had + p.p. / for + 기간 / 기준 과거 → had' }] },
    { level: '전환 · 연결', type: 'write', instr: '괄호 안의 말을 사용하여 과거완료 문장으로 바꾸어 쓰시오.', items: [
      { q: 'I went to Hawaii. I never saw a beautiful beach before that. (never, before)', a: 'I had never seen a beautiful beach before I went to Hawaii.', why: '경험' },
      { q: 'I came back. He was ill in bed for three days before that. (when, for)', a: 'When I came back, he had been ill in bed for three days.', why: '계속 (교과서 Grammar✚)' },
      { q: 'He lost his key. So he couldn’t open the locker. (so)', a: 'He had lost his key, so he couldn’t open the locker.', why: '결과' },
      { q: 'Yuna lived in Seoul for ten years. Then she moved to Incheon. (before)', a: 'Yuna had lived in Seoul for ten years before she moved to Incheon.', why: '계속' },
      { q: 'He woke up. I just finished breakfast at that moment. (just, when)', a: 'I had just finished breakfast when he woke up.', why: '완료 (교과서 Grammar✚)' },
      { q: 'Lucy read that star. The thought never even crossed her mind before that. (until)', a: 'The thought had never even crossed her mind until Lucy read that star.', why: '경험 (외부지문 기출)' },
      { q: 'Elsa visited Korea. She never tasted octopus before that. (until)', a: 'Elsa had never tasted octopus until she visited Korea.', why: '경험' },
      { q: 'I got to the airport. The plane already left. (when, already)', a: 'When I got to the airport, the plane had already left.', why: '완료' },
      { q: 'I was hungry. I didn’t eat anything after breakfast. (because, since)', a: 'I was hungry because I hadn’t eaten anything since breakfast.', why: '계속 — 부정 hadn’t + p.p.' },
      { q: 'My mom came in. I was reading in bed for half an hour before that. (과거완료 진행)', a: 'I had been reading in bed for half an hour when my mom came in.', why: 'had been + -ing' }] },
  ], m),

  // ---------------- Point 3 ----------------
  D.section('Point 3', '(심화) 과거 vs 과거완료 vs 현재완료 — before / after · by the time · 나중 일에 had ✗', 'point'),
  ...D.table(['구분', '설명', '예'], [
    ['현재완료 vs 과거완료', '기준이 지금이면 have p.p., 과거의 한 시점이면 had p.p.', 'I **have lived** here for ten years. / I **had lived** in Gimhae for 10 years until I moved to Busan.'],
    ['before · after', '접속사가 순서를 분명히 알려 주면 먼저 일어난 일도 과거시제로 쓸 수 있다', 'They **had finished** the pizza before their friends arrived. = They **finished** the pizza before their friends arrived.'],
    ['순서대로 · 거의 동시', '일어난 순서대로 말하거나 거의 동시에 일어나면 과거시제', 'He left right after the show ended. / When I called her a liar, she yelled at me. (교과서 Grammar✚)'],
    ['by the time + 과거', '‘~할 무렵에는 이미’ — 주절은 had p.p.', '**By the time** the firefighters arrived, the fire **had already reached** the roof.'],
    ['ago · yesterday · last ~', '분명한 과거 시점 표현 → 현재완료 ✗, 과거시제', 'My dog **died** two weeks ago. (has died ✗)'],
    ['나중 일에 had ✗', 'had p.p.는 항상 더 먼저 일어난 쪽에만', 'The train **had left** when David **arrived**. (The train left when David had arrived ✗)']], [2300, 3300, 4038], m),
  ...D.infoBox('시간 순서 판단 — 타임라인에 ①②를 적어 보자', [
    '먼저 일어난 일 ① → {{had p.p.}} / 나중 일 ② → {{과거시제}}',
    'before · after가 순서를 알려 주면 ①도 과거시제 가능 — 단, 나중 일 ②를 had p.p.로 쓰면 ✗ (I had played baseball after I ate dinner ✗)',
    'by the time + {{과거시제}}, 주절 had p.p. (By the time he gets ✗ → got) / 간접화법: He said, “I am tired.” → he {{was}} tired (현재 → 과거, had ✗)'], m),
  ...D.trick('먼저 일 had, 나중 일 과거!', ['“먼저 간 일 had, 나중 일은 그냥 과거!”', '“ago 보이면 have 금지 — 어고(ago)엔 과거!”']),
  ...D.examPoint([
    { q: 'Jimmy had to borrow some money because he {{had lost}} his bag.', why: '돈을 빌린 일보다 가방을 잃어버린 일이 먼저 (기출)' },
    { q: 'I went to bed after I {{had watched}} TV. (= watched)', why: 'after가 순서를 알려 줌 → 과거시제도 가능 (기출)' }], m),
  ...D.caution(['after / before 문장에서 나중 일을 had p.p.로 바꾼 선지(I had played baseball after I ate dinner ✗ / I had gone to school after I took a shower ✗)가 기출 단골이다.',
    'when 문장에서 had의 위치를 바꾼 선지(The train left when David had arrived ✗) — 먼저 떠난 쪽이 had.',
    'had p.p. 형태 오류(had began · had ran · had woke)와 현재완료 혼동(has already started when ~), ago + 현재완료가 함께 나온다.'], m),
  ...D.drill(3, '과거 vs 과거완료 vs 현재완료', [
    { level: 'Basic ①', type: 'choice', instr: '괄호 안에서 알맞은 것을 고르시오.', items: [
      { q: 'I (had gone / went) to bed after I had watched TV.', a: 'went', why: '나중 일 → 과거시제 (기출)' },
      { q: 'The train (has left / had left) when David arrived at the station.', a: 'had left', why: '먼저 떠난 쪽이 had' },
      { q: 'My dog (died / has died) two weeks ago.', a: 'died', why: 'ago → 과거시제' },
      { q: 'When I called her a liar, she (had yelled / yelled) at me.', a: 'yelled', why: '거의 동시 → 과거시제 (교과서 Grammar✚)' },
      { q: 'By the time the firefighters arrived, the fire (has / had) already reached the roof.', a: 'had', why: 'by the time + 과거 → 주절 had p.p.' },
      { q: 'I (have lived / had lived) in this town since I was born.', a: 'have lived', why: '기준 지금 → 현재완료' },
      { q: 'By the time he (got / gets) to the party, everyone had already begun dancing.', a: 'got', why: 'by the time + 과거시제' },
      { q: 'I (have eaten / had eaten) all the ice cream before my sister opened the fridge.', a: 'had eaten', why: '먼저 일어난 일 · 기준 과거' },
      { q: 'When I came back home, I found that someone (had stolen / has stolen) my ring.', a: 'had stolen', why: '발견한 시점보다 먼저 (기출)' },
      { q: 'I missed the last bus, so I (got / had gotten) home at about 11 o’clock.', a: 'got', why: '일어난 순서대로 나열 → 과거시제' }] },
    { level: 'Basic ②', type: 'fill', instr: '<보기>에서 알맞은 말을 골라 빈칸에 쓰시오. (한 번씩만 사용)',
      bogi: ['ago', 'when', 'begun', 'had', 'moved', 'after', 'by', 'have', 'got', 'ended'], items: [
      { q: 'Jimmy had to borrow some money because he [[had]] lost his bag.', why: '기출 — 먼저 잃어버린 일' },
      { q: 'I missed the last bus, so I only [[got]] home at about 11 o’clock.', why: '순서대로 나열 → 과거시제' },
      { q: 'My dog died two weeks [[ago]], and I was very sad.', why: 'ago — 과거시제와 함께' },
      { q: 'The thieves had already run away [[by]] the time the police arrived.', why: 'by the time + 과거, 주절 had p.p.' },
      { q: 'He left right [[after]] the show ended.', why: '교과서 Grammar✚ — after로 순서가 분명 → 과거시제' },
      { q: 'When I arrived at the theater, the play had already [[ended]].', why: '교과서 In Context' },
      { q: 'We [[have]] lived in this town since 2015.', why: '기준 지금 → 현재완료' },
      { q: 'Katie arrived at the theater at 5 o’clock, and the play had already [[begun]].', why: '기출 변형 — begin-began-begun' },
      { q: 'The train had already left [[when]] I arrived at the station.', why: '교과서 Quiz Maker' },
      { q: 'Cathy often went fishing before she [[moved]] to Seoul.', why: 'before로 순서가 분명 → 과거시제' }] },
    { level: 'Intermediate', type: 'write', instr: '어법상 틀린 부분을 찾아 바르게 고쳐 쓰시오.', items: [
      { q: 'I had played baseball after I ate dinner.', a: 'had played → played', why: '기출 — 야구는 저녁 식사 후(나중 일)' },
      { q: 'After I watched my favorite TV show, I had gone to bed.', a: 'had gone → went', why: '기출 — 잠자리에 든 일이 나중' },
      { q: 'I have already finished my homework when he came in.', a: 'have → had', why: '기준 시점이 과거(came in)' },
      { q: 'My dog has died two weeks ago.', a: 'has died → died', why: 'ago → 과거시제' },
      { q: 'By the time he gets to the party, everyone had already begun dancing.', a: 'gets → got', why: 'by the time + 과거시제' },
      { q: 'When I arrived there, the meeting had already began.', a: 'began → begun', why: '기출 — had + 과거분사' },
      { q: 'The roads were wet and slippery because it has rained during the night.', a: 'has rained → had rained', why: '기출 — 젖어 있던 시점보다 먼저 비가 옴' },
      { q: 'Daniel had arrested after he had escaped from prison.', a: 'had arrested → was arrested', why: '체포된 일은 나중 · 수동 → was arrested' },
      { q: 'Before he had lost his bag, he had already lost his umbrella.', a: 'had lost (his bag) → lost', why: '가방을 잃은 일이 나중 → 과거시제' },
      { q: 'The train left when David had arrived at the station.', a: 'left → had left, had arrived → arrived', why: '기출 — 기차가 먼저 떠났다' }] },
    { level: 'Advanced · 모두 고르기', type: 'multi', free: true, instr: '해당하는 것을 모두 골라 기호를 쓰시오.', items: [
      { q: '다음 밑줄 친 부분의 쓰임이 어법상 알맞은 것을 모두 고르시오.', box: [
        '(a) I went to bed after I __had watched__ TV.', '(b) I realized that I __had left__ my key at home.', '(c) I __had played__ baseball after I ate dinner.',
        '(d) When I returned home, my dog __had eaten__ all my cookies.', '(e) I study English and __had read__ a book every night.'], a: '(a), (b), (d)', why: '(c) 나중 일 → played (e) 매일 밤의 습관 → read (기출)' },
      { q: '다음 대화의 밑줄 친 ⓐ~ⓕ 중 어법상 알맞은 것을 모두 고르시오.', box: [
        'A: Where is his hometown? — B: He was born in Busan and he still lives there. ⓐ __He has lived there for 15 years.__',
        'A: Did you enjoy the play? — B: No. ⓑ __When I arrived at the theater, the play had already ended.__',
        'A: Why did Jimmy borrow money? — B: ⓒ __He had borrowed money because he lost his wallet.__',
        'A: Why are you so upset? — B: ⓓ __The scarf was already sold to someone when I had got to the store.__',
        'A: How was your grandmother? — B: Not good. ⓔ __She had been ill for five days when I visited her.__',
        'A: What did the newspaper report? — B: ⓕ __It said that the accident had happened at the corner of the school.__'], a: 'ⓐ, ⓑ, ⓔ, ⓕ', why: 'ⓒ He borrowed money because he had lost his wallet. ⓓ had already been sold … when I got to the store (기출)' },
      { q: '두 문장의 의미가 같은 것을 모두 고르시오.', box: [
        '(a) When I arrived, the bus had left. = When I arrived, the bus left.',
        '(b) They had finished the pizza before their friends arrived. = They finished the pizza before their friends arrived.',
        '(c) I had lost my wallet, so I couldn’t pay. = I couldn’t pay because I had lost my wallet.',
        '(d) I have lived here for 10 years. = I had lived here for 10 years.',
        '(e) He said, “I lost my key.” = He said that he had lost his key.'], a: '(b), (c), (e)', why: '(a) had left = 이미 떠났다 / left = 도착하자 떠났다 (d) 기준 지금 ↔ 기준 과거' },
      { q: '다음 글(본문 변형)의 밑줄 친 ⓐ~ⓔ 중 어법상 어색한 것을 모두 골라 기호를 쓰고 바르게 고치시오.', fix: true, label: '기호 / 고친 것', box: [
        'In 1888, a French newspaper mistakenly reported Alfred Nobel’s death. The person who ⓐ __had actually died__ was his brother, Ludvig. By the time Nobel read the article, many people ⓑ __have already read__ it. After he read it, Nobel ⓒ __had decided__ to do something for the world. In 1895, he ⓓ __decided__ to use his money to create the Nobel Prize. By the time the first prizes were given out in 1901, Nobel ⓔ __had already died__.'],
        a: 'ⓑ have already read → had already read, ⓒ had decided → decided', why: 'ⓑ by the time + 과거 → 주절 had p.p. ⓒ 기사를 읽은 뒤의 일(나중 일) → 과거시제' },
      { q: '밑줄 친 had p.p.를 과거시제로 바꾸어도 의미가 통하는 것을 모두 고르시오.', box: [
        '(a) They __had finished__ the pizza before their friends arrived.', '(b) When I arrived at the station, the train __had left__.', '(c) I went to bed after I __had watched__ TV.',
        '(d) When I got home, everybody __had already gone__ to bed.', '(e) Cathy __had often gone__ fishing before she moved to Seoul.'], a: '(a), (c), (e)', why: 'before · after가 순서를 알려 줌 / (b)(d) when 문장은 과거로 바꾸면 ‘~하자 …했다’로 의미가 달라짐' }] },
    { level: 'Advanced · 객관식', type: 'mcq', free: true, instr: '알맞은 답을 고르시오.', items: [
      { q: '다음 중 어법상 알맞은 것은?', opts: [
        'The train left when David had arrived at the station.', 'After I watched my favorite TV show, I had gone to bed.', 'When I arrived there, the meeting had already began.',
        'Jimmy had to borrow some money because he had lost his bag.', 'The roads were wet and slippery because it has rained during the night.'], a: '④', why: '① had left – arrived ② went ③ begun ⑤ had rained (기출)' },
      { q: '다음 중 어법상 알맞은 것은?', opts: [
        'He had stayed up late until his family returned.', 'When I had woke up, the rain already stops.', 'I had gone to school after I took a shower quickly.',
        'Katie arrived at the theater at 5 o’clock, and the play had already began.', 'When she came back home, she found that someone has stolen the diamond ring.'], a: '①', why: '② woke up – had already stopped ③ went ④ begun ⑤ had stolen (기출)' },
      { q: '괄호 안의 동사를 알맞은 형태로 바꾼 것이 바르게 짝지어진 것은? — By the time the police (A) (arrive), the thieves (B) (already, run) away.', opts: [
        'arrived – had already ran', 'arrive – had already run', 'arrived – have already run', 'arrives – had already run', 'arrived – had already run'], a: '⑤', why: 'by the time + 과거 / had + 과거분사 run' },
      { q: '우리말과 같은 뜻이 되도록 빈칸에 알맞은 것은? — 내가 오늘 아침에 일어났을 때, 비가 그쳐 있었다. → When I woke up this morning, ______.', opts: [
        'the rain has stopped', 'the rain stops', 'the rain had stopped', 'the rain had stop', 'the rain was stopping'], a: '③', why: '일어난 시점보다 먼저 → had p.p. (교과서 · 기출 서술형)' },
      { q: '(A)~(C)에 알맞은 말이 바르게 짝지어진 것은? — (A) I went to bed after I (had watched / have watched) TV. (B) My dog (died / has died) two weeks ago. (C) By the time he (got / gets) to the party, everyone had begun dancing.', opts: [
        'have watched – died – got', 'had watched – died – got', 'had watched – has died – got', 'have watched – has died – gets', 'had watched – died – gets'], a: '②', why: '기준 과거 / ago → 과거 / by the time + 과거' }] },
    { level: '전환 · 연결', type: 'write', instr: '괄호 안의 지시대로 문장을 바꾸어 쓰시오.', items: [
      { q: 'I missed the last bus, so I only got home at about 11 o’clock. (because, 과거완료)', a: 'I only got home at about 11 o’clock because I had missed the last bus.', why: '먼저 일어난 일 → had p.p.' },
      { q: 'Cathy had often gone fishing before she moved to Seoul. (과거시제로)', a: 'Cathy often went fishing before she moved to Seoul.', why: 'before가 순서를 알려 줌' },
      { q: 'The firefighters arrived. The fire already reached the roof. (by the time)', a: 'By the time the firefighters arrived, the fire had already reached the roof.', why: 'by the time + 과거, 주절 had p.p.' },
      { q: 'The concert began. We already found our seats. (by the time)', a: 'By the time the concert began, we had already found our seats.', why: 'find-found-found' },
      { q: 'He said, “I have finished my homework.” (간접화법)', a: 'He said (that) he had finished his homework.', why: '현재완료 → 간접화법에서 과거완료' },
      { q: 'She said, “I am tired.” (간접화법)', a: 'She said (that) she was tired.', why: '현재 → 과거 (had ✗)' },
      { q: 'I ate dinner. Then I played baseball. (after)', a: 'I played baseball after I ate(had eaten) dinner.', why: '나중 일 played — had ✗' },
      { q: 'Nobel died in 1896. The first Nobel Prizes were given out in 1901. (by the time)', a: 'By the time the first Nobel Prizes were given out in 1901, Nobel had already died.', why: '본문 배경 — 시상보다 먼저 사망' },
      { q: 'I went out. The rain already stopped. (before)', a: 'The rain had already stopped before I went out.', why: '먼저 그친 비 → had p.p.' },
      { q: 'My sister came home. We already finished dinner. (when)', a: 'When my sister came home, we had already finished dinner.', why: '먼저 끝낸 저녁 → had p.p.' }] },
  ], m),

  // ---------------- PERFECT CHECK ----------------
  D.section('PERFECT CHECK', '상위권 함정 체크'),
  ...D.drill(null, '', [{ level: '함정', type: 'choice', instr: '실수하기 쉬운 문장들이에요. 괄호 안에서 알맞은 것을 고르시오.', items: [
    { q: 'The article said Nobel (had died / has died) in France from a heart attack.', a: 'had died', why: '본문 — 기준 시점 said(과거)' },
    { q: 'It said that he had (become / became) rich from the deaths of others.', a: 'become', why: '본문 — had + 과거분사' },
    { q: 'The person who had actually died (had been / was) his brother, Ludvig.', a: 'was', why: '본문 — 문장 동사는 기준 시점(과거)' },
    { q: 'Reading the article, he (had dropped / dropped) his cup in surprise.', a: 'dropped', why: '본문 — 읽으며 동시에 일어난 일 (같은 과 분사구문)' },
    { q: 'I (had played / played) baseball after I had eaten dinner.', a: 'played', why: '나중 일에 had ✗ (기출)' },
    { q: 'My dog (died / has died) two weeks ago.', a: 'died', why: 'ago → 과거시제' },
    { q: 'By the time he (gets / got) to the party, everyone had already begun dancing.', a: 'got', why: 'by the time + 과거시제' },
    { q: 'The thought had never even (crossed / cross) her mind until she read that star.', a: 'crossed', why: '외부지문 — had + 과거분사' },
    { q: 'I was excited because I had never (gone / been) to Dokdo before.', a: 'been', why: '경험 had been to' },
    { q: '(Caught / Catching) his breath, Nobel kept reading.', a: 'Catching', why: '본문 — 능동 분사구문 (같은 과 분사구문)' }] }], m),

  // ---------------- WRITE ----------------
  D.section('WRITE', '서술형 대비'),
  ...D.writeItem(1, 'Basic', '괄호 안의 동사를 알맞은 형태로 바꾸어 쓰시오.', ['The article said Alfred Nobel (die) in France from a heart attack. (본문)'], { a: 'had died', why: '기사가 말한 시점(과거)보다 먼저 → had + p.p.' }, m),
  ...D.writeItem(2, 'Basic', '괄호 안의 단어를 사용하여 빈칸에 알맞은 말을 쓰시오. (2단어)', ['When I woke up this morning, the rain ______________ . (stop) (교과서)'], { a: 'had stopped', why: '일어난 시점보다 먼저 그친 비 (기출)' }, m),
  ...D.writeItem(3, 'Intermediate', '두 문장을 when과 과거완료를 사용하여 한 문장으로 연결하시오. [두 문장 연결]', ['Tom opened the door. Jina already finished her homework.'],
    { a: 'When Tom opened the door, Jina had already finished her homework.', why: '교과서 Practice — 먼저 끝낸 숙제 → had p.p.' }, m),
  ...D.writeItem(4, 'Intermediate', '직접화법을 간접화법으로 바꾸어 쓰시오. [문장 전환]', ['Minho said, “I lost my wallet on the bus.”'],
    { a: 'Minho said (that) he had lost his wallet on the bus.', why: '말한 시점보다 먼저 → had lost · I → he, my → his' }, m),
  ...D.writeItem(5, 'Intermediate', '두 문장을 by the time을 사용하여 한 문장으로 연결하시오. [두 문장 연결]', ['The doctor arrived. The patient already woke up.'],
    { a: 'By the time the doctor arrived, the patient had already woken up.', why: 'by the time + 과거, 주절 had p.p. · wake-woke-woken' }, m),
  ...D.writeItem(6, 'Intermediate', '두 문장을 because를 사용하여 한 문장으로 연결하시오. (먼저 일어난 일은 과거완료로) [두 문장 연결]', ['Sarah couldn’t work. She had a surgery last week.'],
    { a: 'Sarah couldn’t work because she had had a surgery last week.', why: '먼저 받은 수술 → had + p.p.(had)' }, m),
  ...D.writeItem(7, 'Advanced', '우리말과 같은 뜻이 되도록 <조건>에 맞게 영작하시오.', ['기사에는 그가 다른 사람들의 죽음으로 인해 부유해졌다고 쓰여 있었다.', '<조건> It said that으로 시작할 것 · 과거완료를 사용할 것 · rich, deaths, others를 사용할 것 · 총 12단어'],
    { a: 'It said that he had become rich from the deaths of others.', why: '본문 문장 · 12단어 (It/said/that/he/had/become/rich/from/the/deaths/of/others)' }, m),
  ...D.writeItem(8, 'Advanced', '<보기>의 단어를 배열하여 문장을 완성하시오. (필요하면 형태를 바꿀 것)', ['실제로 죽은 사람은 그의 형 Ludvig였다.', '<보기> the person / who / actually / die / be / his brother, Ludvig'],
    { a: 'The person who had actually died was his brother, Ludvig.', why: 'die → had died (신문 보도보다 먼저) · be → was (본문)' }, m),
  ...D.writeItem(9, 'Advanced', '어법상 틀린 부분 2개를 찾아 바르게 고치고, 그 이유를 쓰시오.', ['When I arrived at the theater, the play has already ended. I was upset because I had forget to check the time.'],
    { a: '① has → had  ② forget → forgotten', why: '① 기준 시점이 과거(arrived)이므로 과거완료 ② had 뒤에는 과거분사 forgotten', blanks: ['고친 것', '이유'] }, m),
  ...D.writeItem(10, 'Advanced', '어법상 틀린 부분 2개를 찾아 바르게 고치고, 그 이유를 쓰시오.', ['I had played soccer after I finished my homework. By the time I get home, my mom had already cooked dinner.'],
    { a: '① had played → played  ② get → got', why: '① 축구는 숙제 후의 일(나중 일)이므로 과거시제 ② by the time 절은 과거시제, 주절이 had p.p.', blanks: ['고친 것', '이유'] }, m),

  // ---------------- MAP ----------------
  D.section('MAP', "DAVID'S MAP — 백지노트 테스트"),
  D.P([D.T('오늘 배운 내용을 떠올리며 빈칸을 채워 보세요. 책을 보지 않고!', { size: 18, color: '595959' })], { spacing: { after: 120 }, keepNext: true }),
  ...D.image(path.join(__dirname, 'map_G-과거완료.png'), 620),
  ...D.table(['자가 체크 — 백지노트에 이 단어들이 들어갔나요?', '✔'], [
    ['과거완료 = had + p.p. (주어와 상관없이 항상 had)', ''], ['대과거: 두 과거 중 먼저 일어난 일 → had p.p. / 나중 일 → 과거시제', ''],
    ['said · knew · found · realized (that) + had p.p. (간접화법)', ''], ['용법: 완료(already · just) · 경험(never · before) · 계속(for · since) · 결과', ''],
    ['현재완료(기준 지금) vs 과거완료(기준 과거) · had been to vs had gone to', ''], ['before · after로 순서가 분명하면 과거시제로 대신 가능', ''],
    ['나중 일에 had ✗ — I had played baseball after I ate dinner ✗', ''], ['by the time + 과거시제, 주절 had p.p.', ''],
    ['ago와 현재완료 ✗ · had p.p. 형태(had become · had begun · had run)', ''],
    ['본문: The article said Alfred Nobel had died in France from a heart attack.', '']], [8838, 800], m),
  ...D.memo(['다음 시간 도입: 타임라인 10초 퀴즈 — 두 사건에 ①② 번호 붙이기 10문항', '약한 반: Point 1·2 확실히 → Point 3은 ‘나중 일에 had ✗’와 by the time만 집중',
    '같은 과 분사구문과 섞어 본문 문장 3개(Reading the article … / It said Nobel had died … / The person who had actually died …) 통째 암기 확인', '과거완료 진행(had been -ing)은 형태 확인만 — 시험 범위 확인 후 필요하면 보강'], m),
];
D.render(meta, build, process.argv[2] || '.').then(f => console.log(f.join('\n')));
