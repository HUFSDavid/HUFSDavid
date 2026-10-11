const D = require('./david_base');
const path = require('path');
const COVER = JSON.parse(process.env.COVER || '{}');
const meta = { series: D.SERIES.G, code: 'G-whose', title: '소유격 관계대명사 whose', category: 'G. 관계대명사  |  소유격 whose',
  rightText: 'G  소유격 관계대명사 whose', prefix: process.env.PREFIX || '', cover: COVER.title ? COVER : undefined,
  question: 'I met a girl ~~who~~ likes music. / I met a girl ~~whose~~ name is Alicia. — 둘 다 ‘~한 소녀’인데 왜 하나는 who, 하나는 whose일까?' };

const build = (m) => [
  D.section('FLOW', 'Teaching Flow — 처음 배우는 사람도 따라오는 5단계'),
  ...D.step(1, '우리말로 먼저 생각하기 — ‘누구의 것이야?’', [
    '‘가장 좋아하는 먹이가 조개인 이 작은 물고기’ → 그 먹이는 누구의 것? {{이 작은 물고기}}의 먹이 — 꾸밈받는 명사와 뒤의 명사가 ‘~의’ 관계!',
    '우리말은 ‘~인’ 한마디면 끝. 영어는 두 명사의 소유 관계를 이어 주는 연결어가 따로 필요하다.'], m),
  ...D.step(2, '이전 단원 복습 — 주격 · 목적격 관계대명사', [
    'I have a friend. + He lives in Paris. → I have a friend {{who}} lives in Paris. (주격 — 뒤에 동사)',
    'This is the book. + I bought it. → This is the book {{which}} I bought. (목적격 — 생략 가능)'], m),
  ...D.step(3, '문제 제기 — he, it이 아니라 his, its라면?', [
    'This small fish uses a tool to open them. + **Its** favorite food is clams.',
    '대명사가 아니라 소유격 **Its**를 이어 붙이려면 무엇을 써야 할까?'], m),
  ...D.step(4, '규칙 발견 — 접속사 + 소유격 = whose', [
    '소유격(his, her, its, their) 자리에 {{whose}} → This small fish **whose favorite food** is clams uses a tool to open them. (본문)',
    'whose 바로 뒤에는 반드시 {{명사}} — 관사(a, the)나 소유격(its, his) 없이!'], m),
  ...D.step(5, '결론 🔑', [
    '소유격 관계대명사 whose = {{접속사 + 소유격}}. 선행사는 사람 · 사물 · 동물 {{모두}} 가능 / 뒤에 「명사 + 동사」 / {{생략}} 불가 / 사물 · 동물이면 of which도 가능'], m),
  ...D.infoBox('오늘의 핵심 3문장', [
    '① This small fish {{whose}} favorite food is clams uses a tool to open them. (본문)',
    '② The man {{whose}} painting is in the museum is my uncle. (교과서)',
    '③ I met a girl {{whose}} name is the same as mine. (교과서)'], m),
  ...D.tip(['본문 문장을 두 문장으로 쪼개게 한 뒤(This small fish uses a tool … / Its favorite food is clams.) Its가 whose로 바뀌는 과정을 칠판에 화살표로 보여 준다.',
    'Point 2 도입은 “관계사 뒤를 가려 봐!” 활동 — 뒤에 동사만 남으면 who, 명사 + 동사면 whose (5분).'], m),

  // ---------------- Point 1 ----------------
  D.section('Point 1', '선행사 + whose + 명사 + 동사 — 형태와 의미 · 두 문장 연결', 'point'),
  ...D.table(['구성', '역할 · 설명', '예'], [
    ['선행사', '사람 · 사물 · 동물 모두 가능', '**This small fish** whose favorite food is clams uses a tool to open them. (본문)'],
    ['whose', '접속사 + 소유격(his · her · its · their · 명사’s)을 대신한다 — 생략 불가', 'I met a girl. + **Her** name is the same as mine. → I met a girl **whose** name is the same as mine. (교과서)'],
    ['whose + 명사', '‘(선행사)의 ~가’ — 관사 · 소유격 없이 명사가 바로 온다', 'The man **whose painting** is in the museum is my uncle. (교과서)'],
    ['동사 수 일치', '관계사절 동사는 whose 뒤 명사에, 문장 전체 동사는 선행사에 맞춘다', 'This small fish whose favorite food **is** clams **uses** a tool to open them. (본문)']], [1700, 3900, 4038], m),
  ...D.infoBox('두 문장 연결 3단계', [
    '① 두 문장에서 같은 대상 찾기: a girl = **Her** (소유격)',
    '② 소유격 Her를 {{whose}}로 바꾸고, 「whose + 명사」 덩어리를 선행사 바로 뒤로 옮긴다',
    '③ 해석: ‘이름이 나와 같은 소녀’ — whose절이 선행사를 뒤에서 꾸민다 → I met a girl whose name is the same as mine.'], m),
  ...D.trick('후즈 뒤엔 명사 먼저!', ['“whose = 그의 · 그녀의 · 그것의 — 소유격 세트!”', '“후즈 뒤엔 명사 먼저 — whose the ✗, whose its ✗”']),
  ...D.examPoint([
    { q: 'This small fish {{whose}} favorite food is clams uses a tool to open them. (본문)', why: 'Its favorite food → whose favorite food' },
    { q: 'The man whose painting is in the museum {{is}} my uncle. (are ✗)', why: '문장 동사는 선행사 The man(단수)에 수 일치' }], m),
  ...D.caution(['whose 뒤에 the / its / his를 다시 쓴 선지(whose the roof, whose its color)가 가장 흔한 오답이다.',
    '선행사가 사물 · 동물이면 which를 써야 한다고 착각한 선지(a dog which tail ✗)가 짝으로 나온다.',
    '본문 문장의 uses를 use로 바꾼 수 일치 문항 — 주어는 This small fish(단수), 사이의 whose절에 속지 않게 한다.'], m),
  ...D.drill(1, '선행사 + whose + 명사 + 동사', [
    { level: 'Basic ①', type: 'choice', instr: '괄호 안에서 알맞은 것을 고르시오.', items: [
      { q: 'I met a girl (who / whose) name is the same as mine.', a: 'whose', why: '뒤에 명사 name + 동사 (교과서)' },
      { q: 'This small fish (which / whose) favorite food is clams uses a tool to open them.', a: 'whose', why: 'Its favorite food → whose (본문)' },
      { q: 'I have a friend (whose / his) father is a famous actor.', a: 'whose', why: '두 문장 연결 → 접속사 역할 whose' },
      { q: 'Look at the house whose (the roof / roof) is red.', a: 'roof', why: 'whose 뒤 관사 ✗' },
      { q: 'The man whose painting is in the museum (is / are) my uncle.', a: 'is', why: '문장 동사 — 선행사 The man' },
      { q: 'I saw a dog (whose / which) tail is very short.', a: 'whose', why: '사물 · 동물도 whose (기출)' },
      { q: 'I have a friend whose parents (is / are) teachers.', a: 'are', why: '절 동사 — parents(복수)' },
      { q: 'Rapunzel is a beautiful princess (whose / who) hair is very long.', a: 'whose', why: '뒤에 명사 hair + 동사 (교과서)' },
      { q: 'Charlotte is a wise spider whose best friend (is / are) Wilbur.', a: 'is', why: '절 동사 — best friend(단수) (교과서)' },
      { q: 'This small fish whose favorite food is clams (use / uses) a tool to open them.', a: 'uses', why: '주어 This small fish(단수) (본문 기출)' }] },
    { level: 'Basic ②', type: 'fill', instr: '<보기>에서 알맞은 말을 골라 빈칸에 쓰시오. (한 번씩만 사용)',
      bogi: ['are', 'painting', 'whose', 'roof', 'uses', 'name', 'is', 'hair', 'favorite', 'body'], items: [
      { q: 'Look at the girl. Her hair is red. → Look at the girl whose [[hair]] is red.', why: 'Her hair → whose hair' },
      { q: 'I know a girl. Her name is Cindy. → I know a girl whose [[name]] is Cindy.', why: 'Her name → whose name' },
      { q: 'I live in a small house. Its roof is white. → I live in a small house whose [[roof]] is white.', why: 'Its roof → whose roof' },
      { q: 'Shrek is a friendly monster whose [[body]] is green.', why: '교과서 Practice — 그의 몸은 녹색' },
      { q: 'I have a friend [[whose]] father is a famous actor.', why: '교과서 Sentence Master' },
      { q: 'This small fish whose [[favorite]] food is clams uses a tool to open them.', why: '본문 — 가장 좋아하는 먹이' },
      { q: 'The tuskfish, a small fish whose favorite food is clams, [[uses]] a tool to open them.', why: '본문 변형 기출 — 주어 The tuskfish(단수)' },
      { q: 'There is a house whose windows [[are]] very big.', why: '절 동사 — windows(복수) (교과서 Grammar✚)' },
      { q: 'The man whose [[painting]] is in the museum is my uncle.', why: '교과서 — 미술관에 있는 그림' },
      { q: 'My favorite sea animal is the beluga whale whose body [[is]] white all over.', why: '교과서 Writing — body(단수)' }] },
    { level: 'Intermediate', type: 'write', instr: '어법상 틀린 부분을 찾아 바르게 고쳐 쓰시오.', items: [
      { q: 'I met a girl who name is the same as mine.', a: 'who → whose', why: '뒤에 명사 name + 동사 → 소유격' },
      { q: 'I saw a dog which tail is very short.', a: 'which → whose', why: '기출 — 동물 선행사도 whose' },
      { q: 'I live in a small house whose the door is painted white.', a: 'whose the door → whose door', why: 'whose 뒤 관사 ✗' },
      { q: 'I have a cap whose its color is blue.', a: 'whose its color → whose color', why: 'whose가 이미 소유격 — its 중복 ✗' },
      { q: 'This small fish whose favorite food is clams use a tool to open them.', a: 'use → uses', why: '본문 — 주어 This small fish(단수)' },
      { q: 'I know a girl her name is Sunny.', a: 'her → whose', why: '접속사 없이 두 절 ✗ → whose' },
      { q: 'The boy whose dog are very big is Tom.', a: 'are → is', why: '절 동사 — dog(단수)' },
      { q: 'I have a friend whose parents is from Paraguay.', a: 'is → are', why: '절 동사 — parents(복수)' },
      { q: 'This is a book its subject is English.', a: 'its → whose', why: '접속사 + 소유격 = whose' },
      { q: 'I have a house whose roof of the house is red.', a: 'roof of the house → roof', why: '기출 — whose가 of the house를 대신함 (중복 ✗)' }] },
    { level: 'Advanced · 모두 고르기', type: 'multi', free: true, instr: '해당하는 것을 모두 골라 기호를 쓰시오.', items: [
      { q: '다음 중 어법상 옳은 문장을 모두 고르시오.', box: [
        '(a) I know a boy whose favorite subject is music.', '(b) I have a cap whose color is blue.', '(c) The man whose painting is in the museum are my uncle.',
        '(d) Look at the girl whose the hair is red.', '(e) I have a cat whose fur is white and soft.'], a: '(a), (b), (e)', why: '(c) are → is (d) whose hair' },
      { q: '두 문장을 한 문장으로 바르게 연결한 것을 모두 고르시오.', box: [
        '(a) I met a girl. Her name is the same as mine. → I met a girl whose name is the same as mine.',
        '(b) I have a house. The roof of the house is red. → I have a house whose roof of the house is red.',
        '(c) Tom is the boy. He likes to play basketball. → Tom is the boy whose likes to play basketball.',
        '(d) The man is my uncle. His painting is in the museum. → The man whose painting is in the museum is my uncle.',
        '(e) Look at the dog. Its ears are very big. → Look at the dog whose ears are very big.'], a: '(a), (d), (e)', why: '(b) whose roof is red (c) He → 주격 who' },
      { q: '다음 중 밑줄 친 부분에 대한 설명으로 옳은 것을 모두 고르시오.', box: [
        '(a) This small fish __whose__ favorite food is clams uses a tool. → 접속사와 소유격 Its를 대신한다.',
        '(b) The man __whose__ painting is in the museum is my uncle. → 선행사가 사람이므로 who로 바꿔 쓸 수 있다.',
        '(c) I met a girl whose name __is__ the same as mine. → is는 name에 수를 일치시켰다.',
        '(d) I have a book __whose__ cover is red. → 선행사가 사물이므로 whose를 쓸 수 없다.',
        '(e) I know a boy __whose__ dog is very big. → ‘그 소년의 개’라는 소유 관계를 나타낸다.'], a: '(a), (c), (e)', why: '(b) who ✗ — 소유격 자리 (d) 사물도 whose 가능' },
      { q: '다음 글(본문 변형)의 밑줄 친 ⓐ~ⓔ 중 어법상 어색한 것을 모두 골라 기호를 쓰고 바르게 고치시오.', fix: true, label: '기호 / 고친 것', box: [
        'If you think fish are not smart, take a look at the tuskfish. This small fish ⓐ __whose favorite food__ is clams ⓑ __use__ a tool to open them. The tuskfish blows on the sand until a clam appears. The clam, ⓒ __whose shell__ is closed tightly, is hard to eat. The giant trevally is another smart fish ⓓ __whose favorite food are__ birds. The beluga whale is a sea animal ⓔ __which body__ is white all over.'],
        a: 'ⓑ use → uses, ⓓ are → is, ⓔ which → whose', why: 'ⓑ 주어 This small fish(단수) ⓓ 절 동사 — favorite food(단수) ⓔ 소유격 whose' },
      { q: '빈칸에 whose가 들어갈 수 있는 것을 모두 고르시오.', box: [
        '(a) The bicycle ______ I bought yesterday is nice.', '(b) I know a boy ______ mother grows bananas.', '(c) She knows a boy ______ is good at singing.',
        '(d) Do you like the house ______ windows are very large?', '(e) I have a son ______ name is Kevin.'], a: '(b), (d), (e)', why: '(a) 목적격 which(that) (c) 주격 who(that)' }] },
    { level: 'Advanced · 객관식', type: 'mcq', free: true, instr: '알맞은 답을 고르시오.', items: [
      { q: '다음 두 문장을 같은 의미의 한 문장으로 알맞게 바꾼 것은? — I have a cap. / Its color is blue.', opts: [
        'I have a cap who color is blue.', 'I have a cap that color is blue.', 'I have a cap whose its color is blue.',
        'I have a cap whose color is blue.', 'I have a cap which color is blue.'], a: '④', why: '소유격 whose + 명사 (기출)' },
      { q: '다음 빈칸에 공통으로 들어갈 말로 알맞은 것은?', box: [
        '• I have a watch ______ price is 9,000 won.', '• I met a person ______ name is the same as mine.'],
        opts: ['whose', 'who', 'that', 'whom', 'which'], a: '①', why: '사물 · 사람 선행사 모두 소유격 whose (기출)' },
      { q: '다음 중 어법상 어색한 것은?', opts: [
        'The boy whose hair is red is Mark.', 'I saw a dog which tail is very short.', 'She met a man whose name is Homin.',
        'I like the girl whose hobby is taking pictures.', 'I know the man whose boat is parked offshore.'], a: '②', why: '② which → whose (기출)' },
      { q: '우리말과 같은 뜻이 되도록 <보기>의 단어를 배열할 때, 4번째로 오는 것은? — 지갑을 도둑맞은 그 남자는 경찰에 전화했다.', box: [
        '<보기>  the man / the police / whose / called / was stolen / wallet'],
        opts: ['the man', 'the police', 'whose', 'called', 'was stolen'], a: '⑤', why: 'The man whose wallet was stolen called the police. (기출)' },
      { q: '(A)~(C)에 알맞은 말이 바르게 짝지어진 것은? — If you think fish are not smart, (A) (take / taking) a look at the tuskfish. This small fish (B) (which / whose) favorite food is clams uses a tool to open them. Clams usually hide under the sand, so they cannot be easily (C) (discovered / discovering).', opts: [
        'take – which – discovered', 'taking – whose – discovered', 'take – whose – discovered', 'take – whose – discovering', 'taking – which – discovering'], a: '③', why: '명령문 동사원형 / 소유격 whose / 조동사 수동태 be p.p. (본문 기출)' }] },
    { level: '전환 · 연결', type: 'write', instr: '두 문장을 관계대명사 whose를 사용하여 한 문장으로 연결하시오.', items: [
      { q: 'This small fish uses a tool to open them. Its favorite food is clams.', a: 'This small fish whose favorite food is clams uses a tool to open them.', why: '본문 문장 — 주어 바로 뒤에 whose절' },
      { q: 'The man is my uncle. His painting is in the museum.', a: 'The man whose painting is in the museum is my uncle.', why: '교과서 문장' },
      { q: 'Charlotte is a wise spider. Her best friend is Wilbur.', a: 'Charlotte is a wise spider whose best friend is Wilbur.', why: '교과서 Practice' },
      { q: 'Pinocchio is a cute doll. His wish is to become a boy.', a: 'Pinocchio is a cute doll whose wish is to become a boy.', why: '교과서 Practice' },
      { q: 'There are many animals. Their lives are in great danger.', a: 'There are many animals whose lives are in great danger.', why: 'Their → whose' },
      { q: 'The mountain is Kilimanjaro. Its top is covered with snow.', a: 'The mountain whose top is covered with snow is Kilimanjaro.', why: '주어 뒤에 whose절 삽입' },
      { q: 'Go and help the woman. Her car has broken down.', a: 'Go and help the woman whose car has broken down.', why: 'Her → whose' },
      { q: 'The boy is Mark. The boy’s hair is red.', a: 'The boy whose hair is red is Mark.', why: '명사’s도 whose로 바꾼다 (교과서 In Context)' },
      { q: 'I like the beluga whale. Its body is white all over.', a: 'I like the beluga whale whose body is white all over.', why: '교과서 Writing 소재' },
      { q: 'An octopus is a sea animal. Its blood is blue.', a: 'An octopus is a sea animal whose blood is blue.', why: '교과서 Think and Write 소재' }] },
  ], m),

  // ---------------- Point 2 ----------------
  D.section('Point 2', 'whose vs who · which · that — 관계사 뒤를 보고 격 고르기', 'point'),
  ...D.table(['관계사 뒤', '격', '예'], [
    ['동사가 바로 온다 (주어가 빠짐)', '주격 who / which / that', 'She knows a boy **who** is good at singing. / Shrek is a monster **who** is always friendly.'],
    ['주어 + 동사 (목적어가 빠짐)', '목적격 who(m) / which / that — 생략 가능', 'Mina is the girl **who(m)** I met yesterday. / I like the book **which** Jane gave to me.'],
    ['관사 없는 명사 + 동사 (빠진 것 없는 완전한 절)', '소유격 **whose** — 생략 불가', 'I met a man **whose** wife is an English teacher.']], [3000, 2700, 3938], m),
  ...D.infoBox('격 판단 2초 테스트 — 빈칸에 he/she/his/her를 넣어 보기', [
    '… a girl ___ name is Alicia. → **her** name is Alicia (소유격이 자연스럽다) → {{whose}}',
    '… a girl ___ likes music. → **she** likes music (주어가 필요하다) → 주격 {{who}}',
    'that은 주격 · 목적격만 — 소유격 that은 {{없다}} (a cap that color is blue ✗)'], m),
  ...D.trick('명사 붙으면 후즈!', ['“뒤에 동사면 who, 명사 + 동사면 whose — 명사 붙으면 후즈!”', '“that은 소유 못 해 — 댓(that)은 빈손!”']),
  ...D.examPoint([
    { q: 'I met a man {{whose}} wife is an English teacher. (who ✗)', why: '뒤에 관사 없는 명사 wife + is → 소유격' },
    { q: 'Shrek is a monster {{who(that)}} is always friendly. (whose ✗)', why: '뒤에 바로 동사 → 주격' }], m),
  ...D.caution(['‘빈칸에 들어갈 말이 나머지 넷과 다른 것’ — 대부분 whose이고 하나만 주격 who인 형태로 자주 나온다.',
    'whose 뒤에 명사 없이 동사가 온 선지(the boy whose likes ✗ / a teacher whose was ✗)를 옳다고 고르는 실수가 많다.',
    '선행사가 사람이면 무조건 who라고 생각하는 함정 — 뒤에 명사가 붙어 있으면 whose.'], m),
  ...D.drill(2, 'whose vs who · which · that', [
    { level: 'Basic ①', type: 'choice', instr: '괄호 안에서 알맞은 것을 고르시오.', items: [
      { q: 'Is there anyone (who / whose) can drive a stick shift?', a: 'who', why: '뒤에 동사 can drive → 주격' },
      { q: 'Do you know anyone (who / whose) hobby is raising plants?', a: 'whose', why: '뒤에 명사 hobby + is' },
      { q: 'The woman (whose / whom) I saw in the park was feeding pigeons.', a: 'whom', why: 'saw의 목적어 → 목적격' },
      { q: 'I met a man (whose / who) wife is an English teacher.', a: 'whose', why: '뒤에 명사 wife + is' },
      { q: 'The girl (that / whose) is riding a bike is Judy.', a: 'that', why: '뒤에 동사 is → 주격' },
      { q: 'I like the book (whose / which) Jane gave to me.', a: 'which', why: 'gave의 목적어 → 목적격' },
      { q: 'He has a car (that / whose) windows are all broken.', a: 'whose', why: '소유격 that ✗' },
      { q: 'That is the boy (whom / whose) I want to invite.', a: 'whom', why: 'invite의 목적어 → 목적격' },
      { q: 'Kate is an American girl (who / whose) mother is Korean.', a: 'whose', why: '뒤에 명사 mother + is' },
      { q: 'He painted a mother (whose / who) is looking at her child.', a: 'who', why: '뒤에 동사 is looking → 주격' }] },
    { level: 'Basic ②', type: 'fill', instr: '<보기>에서 알맞은 말을 골라 빈칸에 쓰시오. (한 번씩만 사용)',
      bogi: ['saved', 'whom', 'is', 'whose', 'club', 'who', 'name', 'which', 'are', 'likes'], items: [
      { q: 'Do you know the man [[whose]] suit looks fashionable?', why: '뒤에 명사 suit + 동사 → 소유격' },
      { q: 'Tom is the boy who [[likes]] to play basketball.', why: '주격 who + 동사 (기출 변형)' },
      { q: 'BTS is a popular idol group whose fan [[club]] is called ARMY.', why: '기출 — whose fan club' },
      { q: 'Shrek is a monster [[who]] is always friendly.', why: '뒤에 동사 → 주격 (기출)' },
      { q: 'That is the woman whose life you [[saved]].', why: '기출 — 당신이 구한 생명' },
      { q: 'I watched a movie [[which]] got great reviews.', why: '사물 + 주격' },
      { q: 'The boy whose dog [[is]] very big is Tom.', why: '절 동사 — dog(단수) (기출)' },
      { q: 'Do you have anyone [[whom]] you can depend on?', why: 'depend on의 목적어 → 목적격 (기출)' },
      { q: 'I know a girl whose [[name]] is the same as mine.', why: '교과서 — whose + 명사' },
      { q: 'Harry Potter is an unusual boy whose parents [[are]] magicians.', why: '절 동사 — parents(복수) (기출)' }] },
    { level: 'Intermediate', type: 'write', instr: '어법상 틀린 부분을 찾아 바르게 고쳐 쓰시오.', items: [
      { q: 'I met someone whom mother looked very friendly.', a: 'whom → whose', why: '뒤에 명사 mother + 동사' },
      { q: 'Tom is the boy whose likes to play basketball.', a: 'whose → who(that)', why: '기출 — 뒤에 바로 동사 → 주격' },
      { q: 'They have a daughter that hair is dark brown.', a: 'that → whose', why: '소유격 that ✗' },
      { q: 'I just saw the man whose we saw on TV.', a: 'whose → who(m)(that)', why: 'saw의 목적어 → 목적격' },
      { q: 'I once had a teacher whose was sometimes like a friend.', a: 'whose → who(that)', why: '뒤에 바로 동사 was → 주격' },
      { q: 'Harry Potter is a young magician which magic is very powerful.', a: 'which → whose', why: '뒤에 명사 magic + 동사' },
      { q: 'I like the book whose Jane gave to me.', a: 'whose → which(that)', why: 'gave의 목적어 → 목적격' },
      { q: 'This language school is only for students who mother tongue is not English.', a: 'who → whose', why: '뒤에 명사 mother tongue + 동사' },
      { q: 'Kate is a girl who eyes are blue.', a: 'who → whose', why: '뒤에 명사 eyes + 동사' },
      { q: 'I have to buy a present for my mother, who birthday is next week.', a: 'who → whose', why: '계속적 용법도 소유격은 whose' }] },
    { level: 'Advanced · 모두 고르기', type: 'multi', free: true, instr: '해당하는 것을 모두 골라 기호를 쓰시오.', items: [
      { q: '빈칸에 whose가 들어갈 수 없는 것을 모두 고르시오.', box: [
        '(a) I know a woman ______ son is a pilot.', '(b) The man ______ lives next door is very kind.', '(c) Look at the cat ______ tail is very long.',
        '(d) The cake ______ Mom made was sweet.', '(e) I have an uncle ______ job is to fly planes.'], a: '(b), (d)', why: '(b) 주격 who(that) (d) 목적격 which(that)' },
      { q: '다음 중 어법상 옳은 문장을 모두 고르시오.', box: [
        '(a) I like the girl who dream is becoming a doctor.', '(b) He was a great inventor who made the world better.', '(c) Rapunzel is a beautiful princess whose hair is very long.',
        '(d) I met an old man whose hair was white.', '(e) Jim was a great baseball player whose was born without a right hand.'], a: '(b), (c), (d)', why: '(a) who → whose (e) whose → who (기출)' },
      { q: '다음 중 밑줄 친 관계대명사가 어법상 옳은 것을 모두 고르시오.', box: [
        '(a) That is the reporter __whose__ article I read.', '(b) The girls __whose__ we met are Chinese.', '(c) He is the boy __whose__ received the gold medal.',
        '(d) Do you have anyone __who__ you can depend on?', '(e) The man __who__ wallet was stolen called the police.'], a: '(a), (d)', why: '(b) 목적격 who(m) (c) 주격 who (e) 소유격 whose (기출 변형)' },
      { q: '다음 대화의 밑줄 친 ⓐ~ⓔ 중 어법상 어색한 것을 모두 골라 기호를 쓰고 바르게 고치시오.', fix: true, label: '기호 / 고친 것', box: [
        'A: Who are these people in the picture?',
        'B: The boy ⓐ __whose hair is red__ is Mark. And the girl ⓑ __whose dog is very big__ is Ann.',
        'A: Is Ann the girl ⓒ __whose lives__ next door to you?',
        'B: Yes. And the boy ⓓ __who backpack is blue__ is Jinsu. He is a friend ⓔ __who I met__ at camp.'],
        a: 'ⓒ whose lives → who(that) lives, ⓓ who backpack → whose backpack', why: 'ⓒ 뒤에 동사 → 주격 ⓓ 뒤에 명사 + 동사 → 소유격 (교과서 In Context 소재)' },
      { q: '두 문장을 한 문장으로 바르게 연결한 것을 모두 고르시오.', box: [
        '(a) I have a friend. He lives in Paris. → I have a friend whose lives in Paris.',
        '(b) Look at the dog. Its ears are very big. → Look at the dog which ears are very big.',
        '(c) She is a famous singer. Her house is in front of my house. → She is a famous singer whose house is in front of my house.',
        '(d) This is the book. I bought it yesterday. → This is the book which I bought yesterday.',
        '(e) I know a boy. His mother is a nurse. → I know a boy that mother is a nurse.'], a: '(c), (d)', why: '(a) who lives (b) whose ears (e) whose mother' }] },
    { level: 'Advanced · 객관식', type: 'mcq', free: true, instr: '알맞은 답을 고르시오.', items: [
      { q: '다음 중 빈칸에 들어갈 말이 나머지 넷과 다른 것은?', opts: [
        'The boy ______ dog is very big is Tom.', 'Shrek is a monster ______ is always friendly.', 'I have a friend ______ hobby is playing baseball.',
        'BTS is an idol group ______ fan club is called ARMY.', 'Jane, ______ favorite subject is math, hates English.'], a: '②', why: '② 주격 who / 나머지 whose (기출)' },
      { q: '다음 중 어법상 알맞은 문장은?', opts: [
        'Look at the cute dog which ears are very big.', 'Rapunzel is a beautiful princess who hair is very long.', 'The man which painting is in the museum is my uncle.',
        'The vase which you broke it was my favorite.', 'What is the name of the boy who we met in the library?'], a: '⑤', why: '① ② ③ whose ④ it 삭제 (기출)' },
      { q: '다음 중 빈칸에 들어갈 말이 나머지 넷과 다른 하나는?', opts: [
        'I saw a dog ______ tail is very short.', 'I lived in a house ______ roof was red.', 'I know a boy ______ favorite subject is music.',
        'I will wait here ______ the contest is over.', 'I have a young sister, ______ name is Anna.'], a: '④', why: '④ 시간 접속사 until / 나머지 whose (기출 — 같은 과 문법 혼합)' },
      { q: '다음 밑줄 친 부분이 어법상 어색한 것은?', opts: [
        'My sister met a boy __who__ hobby is swimming.', 'He visited the temple __which__ was built in 1800.', 'I still remember the first song __that__ we played.',
        'The boy __who__ was pulling your hair must be your son.', 'Son Heung-min, __who__ is a Korean soccer player, is my role model.'], a: '①', why: '① who → whose (기출)' },
      { q: '(A)~(C)에 알맞은 말이 바르게 짝지어진 것은? — (A) I know a girl (who / whose) can speak English well. (B) He has a car (which / whose) windows are all broken. (C) That’s the man (who / whose) I spoke to the other day.', opts: [
        'who – which – who', 'whose – whose – who', 'who – whose – whose', 'whose – which – whose', 'who – whose – who'], a: '⑤', why: '주격 / 소유격 / 목적격(to의 목적어)' }] },
    { level: '전환 · 연결', type: 'write', instr: '두 문장을 알맞은 관계대명사(who / which / whose)를 사용하여 한 문장으로 연결하시오.', items: [
      { q: 'I have a friend. Her family is from Paraguay.', a: 'I have a friend whose family is from Paraguay.', why: 'Her → whose' },
      { q: 'I have a friend. She is from Paraguay.', a: 'I have a friend who is from Paraguay.', why: 'She → 주격 who' },
      { q: 'He is a famous baseball player. His position is pitcher.', a: 'He is a famous baseball player whose position is pitcher.', why: 'His → whose' },
      { q: 'This is the smartphone. I bought it yesterday.', a: 'This is the smartphone which I bought yesterday.', why: 'it → 목적격 which (생략 가능)' },
      { q: 'Do you know the man? His suit looks fashionable.', a: 'Do you know the man whose suit looks fashionable?', why: '의문문 끝에 whose절' },
      { q: 'The girl is Bora. She is wearing a yellow dress.', a: 'The girl who is wearing a yellow dress is Bora.', why: 'She → 주격 who' },
      { q: 'The girl is Bora. Her dress is yellow.', a: 'The girl whose dress is yellow is Bora.', why: 'Her → whose (교과서 In Context)' },
      { q: 'Humpback whales are huge animals. They stand on their tails while they sleep.', a: 'Humpback whales are huge animals which stand on their tails while they sleep.', why: 'They → 주격 which(that) (본문 소재)' },
      { q: 'The giant trevally is a fish. It can catch a flying bird.', a: 'The giant trevally is a fish which can catch a flying bird.', why: 'It → 주격 which(that) (본문 소재)' },
      { q: 'Remy is a little chef. His dishes are really delicious.', a: 'Remy is a little chef whose dishes are really delicious.', why: 'His → whose' }] },
  ], m),

  // ---------------- Point 3 ----------------
  D.section('Point 3', '(심화) of which · whose + 명사가 목적어 · 계속적 용법 · 의문사 whose 구별', 'point'),
  ...D.table(['형태', '설명', '예'], [
    ['of which + the + 명사', '선행사가 사물 · 동물일 때 whose 대신 — 명사 앞에 the', 'I live in the house **of which the roof** is red. = I live in the house **whose roof** is red.'],
    ['the + 명사 + of which', '명사를 앞으로 보낸 어순도 가능', 'I found a book **the title of which** is Harry Potter.'],
    ['whose + 명사 = 목적어', 'whose + 명사 뒤에 「주어 + 동사」 — 동사의 목적어가 빠진 자리', 'That is the reporter **whose article** I read. / That is the woman **whose life** you saved.'],
    ['계속적 용법 , whose', '콤마 뒤에서 보충 설명 — that ✗', 'Jane, **whose** favorite subject is math, hates English.'],
    ['의문사 whose', '‘누구의’ — 앞에 선행사 없음 (의문문 · 간접의문문)', '**Whose** pencils are these? / I wonder **whose** idea it is.']], [2300, 2900, 4438], m),
  ...D.infoBox('관계대명사 whose vs 의문사 whose', [
    '앞에 꾸밈받는 명사(선행사)가 있다 → 관계대명사 : The boy **whose** hair is red is Mark.',
    '앞에 선행사가 없고 ‘누구의’로 해석된다 → {{의문사}} : I wonder **whose** idea it is. (간접의문문)',
    'of which는 사람 선행사에 ✗ · of which 뒤 명사에는 {{the}} · of which its ✗'], m),
  ...D.trick('오브위치엔 더(the)!', ['“of which 뒤엔 더(the) 붙여 — 오브위치엔 더!”', '“앞에 명사 있으면 관계사, 없으면 ‘누구의’ — 누구냐 넌!”']),
  ...D.examPoint([
    { q: 'I’m looking for a cap of which {{the}} color is blue. (its ✗)', why: 'of which + the + 명사 (기출)' },
    { q: 'That is the woman {{whose}} life you saved.', why: 'whose life = saved의 목적어 (기출)' }], m),
  ...D.caution(['of which 뒤에 its를 쓰거나 the를 뺀 선지(of which its color ✗ / of which roof ✗)가 단골 오답이다.',
    '‘본문 whose와 쓰임이 같은 / 다른 것’ — 의문사 whose(I wonder whose ~ / Whose ~ is it?)를 섞어 낸다.',
    '사람 선행사에 of which를 쓴 선지(Her brother of which the hair ✗), 계속적 용법에 that을 쓴 선지(My father, that major ✗) 주의.'], m),
  ...D.drill(3, 'of which · whose + 명사(목적어) · 계속적 용법 · 의문사 whose', [
    { level: 'Basic ①', type: 'choice', instr: '괄호 안에서 알맞은 것을 고르시오.', items: [
      { q: 'I need a table (of which / whose) legs are very long.', a: 'whose', why: '명사 앞에 the 없음 → whose' },
      { q: 'I live in the house (of which / whose) the roof is red.', a: 'of which', why: 'the roof → of which' },
      { q: 'Look at the book (of which / which) the cover is black.', a: 'of which', why: 'of which + the + 명사' },
      { q: 'I’m looking for a cap of which (the / its) color is blue.', a: 'the', why: 'of which its ✗ (기출)' },
      { q: 'I watched a movie (of which / which) got great reviews.', a: 'which', why: '뒤에 동사 → 주격' },
      { q: '(Who / Whose) pencils are these?', a: 'Whose', why: '의문사 ‘누구의’ + 명사 (기출)' },
      { q: 'My father, (that / whose) major is math, teaches at a high school.', a: 'whose', why: '계속적 용법 that ✗ / 소유격' },
      { q: 'That is the reporter (whose / who) article I read.', a: 'whose', why: 'whose article = read의 목적어' },
      { q: 'He lent me the book (of which / which) I wanted to read.', a: 'which', why: 'read의 목적어 → 목적격' },
      { q: 'I found a book the title of (whose / which) is Harry Potter.', a: 'which', why: 'the title of which' }] },
    { level: 'Basic ②', type: 'fill', instr: '<보기>에서 알맞은 말을 골라 빈칸에 쓰시오. (한 번씩만 사용)',
      bogi: ['shut', 'idea', 'of', 'whose', 'the', 'article', 'which', 'were', 'windows', 'life'], items: [
      { q: 'He is living in the house [[of]] which the walls are made of glass.', why: '교과서 Grammar✚' },
      { q: 'Look at the picture the colors of [[which]] are only black and white.', why: 'the colors of which' },
      { q: 'This is the table of which [[the]] legs were all broken.', why: 'of which + the + 명사' },
      { q: 'I saw a car the windows of which [[were]] all broken.', why: '절 동사 — windows(복수) · 과거' },
      { q: 'That is the woman whose [[life]] you saved.', why: 'whose life = saved의 목적어 (기출)' },
      { q: 'That is the reporter whose [[article]] I read.', why: 'whose article = read의 목적어 (기출)' },
      { q: 'I wonder whose [[idea]] it is.', why: '의문사 whose + 명사 (간접의문문, 기출)' },
      { q: 'Jane, [[whose]] favorite subject is math, hates English.', why: '계속적 용법 소유격 (기출)' },
      { q: 'There is a house whose [[windows]] are very big.', why: '교과서 Grammar✚' },
      { q: 'This house, whose windows are [[shut]], is for sale.', why: '창문이 닫혀 있는 — 계속적 용법' }] },
    { level: 'Intermediate', type: 'write', instr: '어법상 틀린 부분을 찾아 바르게 고쳐 쓰시오.', items: [
      { q: 'I’m looking for a cap of which its color is blue.', a: 'its → the', why: '기출 — of which + the + 명사' },
      { q: 'Her brother of which the hair is too long is ten.', a: 'of which the hair → whose hair', why: '사람 선행사 → of which ✗' },
      { q: 'My best friend Tom was the one of which bag was bigger than his body.', a: 'of which → whose', why: '사람 선행사 · 관사 없는 명사 → whose' },
      { q: 'He lent me the book of which I wanted to read.', a: 'of which → which(that)', why: 'read의 목적어 → 목적격' },
      { q: 'I live in the house of which roof is red.', a: 'of which roof → of which the roof (whose roof)', why: 'of which 뒤 명사에는 the' },
      { q: 'That is the reporter who article I read.', a: 'who → whose', why: '뒤에 명사 article + 주어 + 동사' },
      { q: 'My father, that major is math, is teaching at a high school.', a: 'that → whose', why: '계속적 용법 that ✗ · 소유격' },
      { q: 'Who pencils are these?', a: 'Who → Whose', why: '의문사 ‘누구의’ + 명사' },
      { q: 'That’s the book of which I recommended reading in class.', a: 'of which → which(that)', why: 'reading의 목적어 → 목적격' },
      { q: 'This is the bakery whose the bread I like the most.', a: 'whose the bread → whose bread', why: 'whose 뒤 관사 ✗' }] },
    { level: 'Advanced · 모두 고르기', type: 'multi', free: true, instr: '해당하는 것을 모두 골라 기호를 쓰시오.', items: [
      { q: '밑줄 친 whose가 다음 문장의 whose와 쓰임이 같은 것을 모두 고르시오. — This small fish whose favorite food is clams uses a tool to open them. (본문)', box: [
        '(a) Could you tell me __whose__ that was?', '(b) My son __whose__ major was English is a teacher.', '(c) __Whose__ pizza was the most delicious one?',
        '(d) Harry Potter is an unusual boy __whose__ parents are magicians.', '(e) The cat __whose__ name is Leo is sitting on the sofa.'], a: '(b), (d), (e)', why: '(a)(c) 의문사 ‘누구의’ (기출)' },
      { q: '다음 중 어법상 옳은 문장을 모두 고르시오.', box: [
        '(a) I live in the house of which the roof is red.', '(b) I have a picture of which the price is very high.', '(c) That is the woman whose life you saved.',
        '(d) My uncle, that job is cooking, runs a restaurant.', '(e) I found a book the title of whose is Harry Potter.'], a: '(a), (b), (c)', why: '(d) that → whose (e) of whose → of which' },
      { q: '두 문장의 뜻이 같은 것을 모두 고르시오.', box: [
        '(a) I need a table whose legs are long. = I need a table of which the legs are long.',
        '(b) I met a girl whose name is Alicia. = I met a girl of which the name is Alicia.',
        '(c) I saw a car whose windows were broken. = I saw a car the windows of which were broken.',
        '(d) I saw a girl whose name was Alicia. = I saw a girl and her name was Alicia.',
        '(e) I know whose bag this is. = I know the bag whose this is.'], a: '(a), (c), (d)', why: '(b) 사람 선행사 → of which ✗ (e) 의문사 ↔ 관계사 바꿔 쓰기 ✗' },
      { q: '다음 글의 밑줄 친 ⓐ~ⓔ 중 어법상 어색한 것을 모두 골라 기호를 쓰고 바르게 고치시오.', fix: true, label: '기호 / 고친 것', box: [
        'Mr. Kim is a scientist ⓐ __whose job__ is to study sea animals. He showed us a photo ⓑ __the colors of which__ were amazing. It was a photo of an octopus ⓒ __of which its blood__ is blue. Then he asked, “ⓓ __Who__ camera took this photo?” Mina, ⓔ __whose__ hobby is taking pictures, answered, “Yours!”'],
        a: 'ⓒ of which its blood → whose blood (of which the blood), ⓓ Who → Whose', why: 'ⓒ of which + the + 명사 ⓓ 의문사 ‘누구의’ + 명사' },
      { q: '빈칸에 of which가 들어갈 수 있는 것을 모두 고르시오.', box: [
        '(a) I live in the house ______ the walls are made of glass.', '(b) I know a girl ______ the name is Cindy.', '(c) Look at the book ______ the cover is black.',
        '(d) I watched a movie ______ got great reviews.', '(e) Find a house ______ the front door is broken.'], a: '(a), (c), (e)', why: '(b) 사람 선행사 ✗ (d) 주격 which(that)' }] },
    { level: 'Advanced · 객관식', type: 'mcq', free: true, instr: '알맞은 답을 고르시오.', items: [
      { q: '다음 빈칸에 공통으로 들어갈 말로 알맞은 것은?', box: [
        '• ______ pencils are these?', '• That is the woman ______ life you saved.'],
        opts: ['who', 'whose', 'whom', 'which', 'that'], a: '②', why: '의문사 whose / 관계대명사 whose (기출)' },
      { q: '다음 중 밑줄 친 whose의 쓰임이 나머지 넷과 다른 것은?', opts: [
        'The boy __whose__ T-shirt is red is Ben.', 'I met a girl __whose__ age is the same as mine.', 'He bought a smartphone __whose__ color is blue.',
        'I’m wondering __whose__ house that is.', 'The cat __whose__ name is Leo is sitting on the sofa.'], a: '④', why: '④ 의문사 ‘누구의’ / 나머지 관계대명사 (기출)' },
      { q: '다음 중 어법상 옳은 문장은?', opts: [
        'Pinocchio is a cute doll which wish is to become a boy.', 'I’m looking for a cap of which its color is blue.', 'I have a picture of which the price is very high.',
        'I like the girl that hobby is playing the piano.', 'I know a boy of which the name is Jack.'], a: '③', why: '① ④ whose ② its → the ⑤ 사람 → whose (기출)' },
      { q: '<보기>의 단어를 배열하여 본문 문장을 완성할 때, 6번째로 오는 단어는? (문장 첫 단어 포함)', box: [
        '가장 좋아하는 먹이가 조개인 이 작은 물고기는 도구를 사용한다.', '<보기>  favorite / this / fish / whose / is / small / a / uses / tool / food / clams'],
        opts: ['food', 'whose', 'small', 'clams', 'tool'], a: '①', why: 'This small fish whose favorite food is clams uses a tool. → 6번째 food (기출)' },
      { q: '(A)~(C)에 알맞은 말이 바르게 짝지어진 것은? — (A) I live in the house (of which / whose) the roof is green. (B) Jane, (that / whose) favorite subject is math, hates English. (C) I wonder (whose / which) idea it is.', opts: [
        'whose – that – which', 'of which – that – whose', 'whose – whose – which', 'of which – whose – which', 'of which – whose – whose'], a: '⑤', why: 'the roof → of which / 계속적 that ✗ / 의문사 whose + 명사' }] },
    { level: '전환 · 연결', type: 'write', instr: '두 문장을 whose 또는 of which를 사용하여 한 문장으로 연결하시오. (괄호 지시가 있으면 따를 것)', items: [
      { q: 'I live in a small house. Its roof is white. (of which)', a: 'I live in a small house of which the roof is white.', why: 'of which + the + 명사' },
      { q: 'That is the reporter. I read his article.', a: 'That is the reporter whose article I read.', why: 'whose article = read의 목적어 → 앞으로' },
      { q: 'Look at the girl. I borrowed her umbrella yesterday.', a: 'Look at the girl whose umbrella I borrowed yesterday.', why: 'whose umbrella = borrowed의 목적어' },
      { q: 'The boy is angry at us. We kicked over the boy’s bike.', a: 'The boy whose bike we kicked over is angry at us.', why: 'the boy’s bike → whose bike, 주어 뒤에 삽입' },
      { q: 'I apologized to the man. I broke his computer.', a: 'I apologized to the man whose computer I broke.', why: 'whose computer = broke의 목적어' },
      { q: 'My sister wants to buy the table. Its legs are very strong. (of which)', a: 'My sister wants to buy the table of which the legs are very strong.', why: 'of which + the legs' },
      { q: 'The girl was upset. I took her book by mistake.', a: 'The girl whose book I took by mistake was upset.', why: '주어 뒤에 whose절 삽입' },
      { q: 'Jane hates English. Her favorite subject is math. (계속적 용법)', a: 'Jane, whose favorite subject is math, hates English.', why: '콤마 + whose (that ✗)' },
      { q: 'This house is for sale. Its windows are shut. (계속적 용법)', a: 'This house, whose windows are shut, is for sale.', why: '콤마 + whose' },
      { q: 'I found a book. The title of the book is Harry Potter. (the title of which)', a: 'I found a book the title of which is Harry Potter.', why: 'the title of the book → the title of which' }] },
  ], m),

  // ---------------- PERFECT CHECK ----------------
  D.section('PERFECT CHECK', '상위권 함정 체크'),
  ...D.drill(null, '', [{ level: '함정', type: 'choice', instr: '실수하기 쉬운 문장들이에요. 괄호 안에서 알맞은 것을 고르시오.', items: [
    { q: 'This small fish (whose / which) favorite food is clams uses a tool to open them.', a: 'whose', why: '본문 — 동물 선행사도 whose' },
    { q: 'This small fish whose favorite food is clams (use / uses) a tool to open them.', a: 'uses', why: '본문 — 주어 This small fish(단수)' },
    { q: 'I have a cap whose (its color / color) is blue.', a: 'color', why: 'whose its ✗' },
    { q: 'Tom is the boy (who / whose) likes to play basketball.', a: 'who', why: '뒤에 바로 동사 → 주격 (기출)' },
    { q: 'I live in the house of which (the roof / roof) is red.', a: 'the roof', why: 'of which + the + 명사' },
    { q: 'Humpback whales stand on their tails (while / during) they sleep.', a: 'while', why: '본문 — 뒤에 절 → 접속사 while (같은 과 문법 혼합)' },
    { q: 'The tuskfish blows on the sand until a clam (will appear / appears).', a: 'appears', why: '본문 — 시간 부사절은 현재가 미래 대신 (같은 과 문법 혼합)' },
    { q: 'That is the woman (who / whose) life you saved.', a: 'whose', why: 'whose life = saved의 목적어 (기출)' },
    { q: 'My father, (whose / that) major is math, teaches at a high school.', a: 'whose', why: '계속적 용법 that ✗' },
    { q: 'I wonder (where is the bus stop / where the bus stop is).', a: 'where the bus stop is', why: '간접의문문 의문사 + 주어 + 동사 (같은 과 의사소통)' }] }], m),

  // ---------------- WRITE ----------------
  D.section('WRITE', '서술형 대비'),
  ...D.writeItem(1, 'Basic', '빈칸에 알맞은 관계대명사를 쓰시오.', ['I met a girl ______ name is the same as mine. (교과서)'], { a: 'whose', why: '뒤에 명사 name + 동사 → 소유격' }, m),
  ...D.writeItem(2, 'Basic', '괄호 안의 동사를 알맞은 형태로 바꾸어 쓰시오.', ['This small fish whose favorite food is clams (use) a tool to open them. (본문)'], { a: 'uses', why: '주어 This small fish(단수) · 현재 → uses (기출)' }, m),
  ...D.writeItem(3, 'Intermediate', '두 문장을 관계대명사 whose를 사용하여 한 문장으로 연결하시오. [두 문장 연결]', ['Shrek is a friendly monster. His body is green.'],
    { a: 'Shrek is a friendly monster whose body is green.', why: 'His → whose (교과서 Practice)' }, m),
  ...D.writeItem(4, 'Intermediate', '두 문장을 관계대명사 whose를 사용하여 한 문장으로 연결하시오. (The boy로 시작할 것) [두 문장 연결]', ['The boy is Jinsu. His backpack is blue.'],
    { a: 'The boy whose backpack is blue is Jinsu.', why: '주어 The boy 바로 뒤에 whose절 (교과서 In Context)' }, m),
  ...D.writeItem(5, 'Intermediate', '같은 뜻이 되도록 of which를 사용하여 문장을 바꾸어 쓰시오. [문장 전환]', ['There is a house whose windows are very big. (교과서)'],
    { a: 'There is a house of which the windows are very big.', why: 'of which + the + 명사' }, m),
  ...D.writeItem(6, 'Intermediate', '두 문장을 관계대명사 whose를 사용하여 한 문장으로 연결하시오. [두 문장 연결]', ['That is the woman. You saved her life.'],
    { a: 'That is the woman whose life you saved.', why: 'whose life = saved의 목적어 → whose 바로 뒤로 (기출)' }, m),
  ...D.writeItem(7, 'Advanced', '우리말과 같은 뜻이 되도록 <조건>에 맞게 영작하시오.', ['가장 좋아하는 먹이가 조개인 이 작은 물고기는 조개를 열기 위해 도구를 사용한다.', '<조건> 소유격 관계대명사를 사용할 것 · favorite, clams, tool을 사용할 것 · them으로 끝낼 것 · 총 14단어'],
    { a: 'This small fish whose favorite food is clams uses a tool to open them.', why: '본문 문장 · 14단어 (This/small/fish/whose/favorite/food/is/clams/uses/a/tool/to/open/them)' }, m),
  ...D.writeItem(8, 'Advanced', '<보기>의 단어를 배열하여 문장을 완성하시오. (필요하면 형태를 바꿀 것)', ['내가 가장 좋아하는 바다 동물은 몸이 온통 하얀 벨루가 고래이다.', '<보기> my favorite sea animal / be / the beluga whale / whose / body / be / white all over'],
    { a: 'My favorite sea animal is the beluga whale whose body is white all over.', why: 'be → is (두 번) · 교과서 Writing 문장' }, m),
  ...D.writeItem(9, 'Advanced', '어법상 틀린 부분 2개를 찾아 바르게 고치고, 그 이유를 쓰시오.', ['I have a friend who father is a famous actor. He lives in a house whose the roof is blue.'],
    { a: '① who → whose  ② whose the roof → whose roof', why: '① 뒤에 명사 father + 동사 → 소유격 whose ② whose 뒤에는 관사 없이 명사가 온다', blanks: ['고친 것', '이유'] }, m),
  ...D.writeItem(10, 'Advanced', '어법상 틀린 부분 2개를 찾아 바르게 고치고, 그 이유를 쓰시오.', ['An octopus is a sea animal which blood is blue. Jane, that favorite animal is the octopus, wants to see one.'],
    { a: '① which → whose  ② that → whose', why: '① 뒤에 명사 blood + 동사 → 소유격 whose ② 계속적 용법에는 that을 쓸 수 없고, 뒤에 명사 favorite animal → whose', blanks: ['고친 것', '이유'] }, m),

  // ---------------- MAP ----------------
  D.section('MAP', "DAVID'S MAP — 백지노트 테스트"),
  D.P([D.T('오늘 배운 내용을 떠올리며 빈칸을 채워 보세요. 책을 보지 않고!', { size: 18, color: '595959' })], { spacing: { after: 120 }, keepNext: true }),
  ...D.image(path.join(__dirname, 'map_G-whose.png'), 620),
  ...D.table(['자가 체크 — 백지노트에 이 단어들이 들어갔나요?', '✔'], [
    ['whose = 접속사 + 소유격(his · her · its · their)', ''], ['선행사: 사람 · 사물 · 동물 모두 가능 / 생략 불가', ''], ['whose 뒤엔 관사 없는 명사 (whose the ✗ / whose its ✗)', ''],
    ['수 일치: 절 동사는 whose 뒤 명사 / 문장 동사는 선행사', ''], ['뒤에 동사 → 주격 / 주어 + 동사 → 목적격 / 명사 + 동사 → whose', ''],
    ['소유격 that은 없다 — “댓(that)은 빈손!”', ''], ['of which + the + 명사 (사물 · 동물만, of which its ✗)', ''],
    ['whose + 명사가 목적어: the woman whose life you saved', ''], ['관계대명사 whose(선행사 ○) vs 의문사 whose(누구의)', ''],
    ['본문: This small fish whose favorite food is clams uses a tool to open them.', '']], [8838, 800], m),
  ...D.memo(['다음 시간 도입: “관계사 뒤를 가려 봐!” who / which / whose 10초 판단 퀴즈 10문항', '약한 반: Point 1·2 확실히 → Point 3은 of which the와 의문사 whose 구별만 집중',
    '같은 과 시간 접속사(while · until)와 섞어 본문 문장 3개(This small fish whose … / Humpback whales … while they sleep. / … until a clam appears.) 통째 암기 확인'], m),
];
D.render(meta, build, process.argv[2] || '.').then(f => console.log(f.join('\n')));
