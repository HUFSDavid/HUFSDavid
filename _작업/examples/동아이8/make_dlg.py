import json
A = "’"
def q(s): return s.replace("'", A)

dialogues = [
 {"id": "D1", "label": "Listen and Speak 1 A", "lines": [
  ["G", "Mike, why were you {late for class}?", "Mike, 너 왜 수업에 늦었니?"],
  ["B", "I had a bad {stomachache}.", "난 배가 많이 아팠어."],
  ["G", "Oh, no! Are you okay now?", "오, 저런! 지금은 괜찮니?"],
  ["B", "Yeah. I {should have eaten less} last night.", "응. 나는 어젯밤에 덜 먹었어야 했어."]],
  "notes": [
  "I should have + 과거분사 : 후회 표현하기 — ‘나는 ~했어야 했다’, 어젯밤에 덜 먹었어야 했는데 실제로는 {많이 먹었다}는 의미"]},
 {"id": "D2", "label": "Listen and Speak 1 B", "lines": [
  ["G", "Jiho, {what's up}? You {look tired}.", "지호야, 무슨 일이니? 너 피곤해 보여."],
  ["B", "Yeah. I {stayed up late} last night.", "응. 나는 어젯밤에 늦게까지 깨어 있었어."],
  ["G", "Did you play computer games again?", "너는 또 컴퓨터 게임을 했니?"],
  ["B", "No, not this time. I {had to finish} my history project.", "아니, 이번엔 아니야. 나는 역사 과제를 끝내야 했어."],
  ["G", "Is it {due} today?", "그 과제가 오늘까지니?"],
  ["B", "Yeah. I {shouldn't have put it off} until the last moment.", "응. 나는 마지막 순간까지 미루지 말았어야 했어."],
  ["G", "Hmm, I understand. I often have {the same problem}.", "음, 이해해. 나도 종종 같은 문제를 겪어."],
  ["B", "Really? Well, let's {try to change} our bad habits.", "정말? 음, 우리의 나쁜 습관을 바꾸도록 노력하자."]],
  "notes": [
  "What's up? : ‘무슨 일이야?’ — 걱정이나 고민이 있어 보이는 상대에게 원인을 묻는 표현 = What's the matter? / What's the problem? / What's {wrong}?",
  "look + 형용사(tired) : ‘~처럼 {보이다}’",
  "had to + 동사원형 : ‘~{해야만 했다}’",
  "due : ‘~하기로 되어 있는, 예정된’ — 어떤 일의 {마감 기한}을 나타낼 때 사용",
  "I shouldn't have + 과거분사 : 후회 표현하기 — ‘나는 ~{하지 말았어야} 했다’ / put off ‘미루다’는 목적어가 대명사(it)이면 동사와 부사 사이 (put {it off} ○, put off it ✗), it = history project",
  "until : 전치사 ‘~{때까지}’",
  "try + to부정사 : ‘~하려고 {노력하다}’"]},
 {"id": "D3", "label": "Listen and Speak 1 C (e.g.)", "lines": [
  ["A", "{What's wrong}?", "무슨 일 있니?"],
  ["B", "I {got caught in the rain}.", "나는 비를 맞았어."],
  ["A", "Oh, I'm {sorry to hear that}.", "오, 그 말을 들어서 유감이구나."],
  ["B", "I {should have taken} an umbrella.", "나는 우산을 가져왔어야 했어."]],
  "notes": [
  "What's wrong? : 걱정이 있어 보이는 상대에게 {무슨 일}인지 묻는 표현 = What's up? / What's the matter?",
  "get caught in the rain : ‘{비를 맞다}’ — got은 get의 과거형",
  "I'm sorry to hear that. : 상대의 좋지 않은 소식에 {유감}·위로를 나타내는 말",
  "주어 + should have + 과거분사 : 후회 표현하기 — ‘~했어야 했는데 (하지 {못했다})’ = I ought to have + 과거분사 / I (really) regret (that) ~"]},
 {"id": "D4", "label": "Listen and Speak 2 A", "lines": [
  ["G", "Jinsu, {what are you going to do} during the vacation?", "진수야, 너는 방학 동안 무엇을 할 거니?"],
  ["B", "{I'm going to} read lots of books. What about you?", "나는 책을 많이 읽을 거야. 너는?"],
  ["G", "{I'm planning to} visit my grandparents in Busan.", "나는 부산에 계신 조부모님을 찾아뵐 계획이야."],
  ["B", "Sounds great. {I hope you have} a wonderful vacation.", "좋겠다. 멋진 방학을 보내길 바라."]],
  "notes": [
  "What are you going to do? : 상대에게 무엇을 할 {계획}인지 묻는 표현 = What are you planning to do? — 대답은 I'm going to ~ / I'm planning to ~",
  "I hope you ~. : 기원하는 말 하기 — 상대방에게 기원하는 말을 할 때 쓰는 표현, ‘나는 네가 ~하길 {바라}’"]},
 {"id": "D5", "label": "Listen and Speak 2 B", "lines": [
  ["G", "Jaemin, are you {ready for} the singing contest?", "재민아, 노래 경연 대회에 나갈 준비는 됐니?"],
  ["B", "Well, {I'm thinking of giving up}, Tina.", "음, 나는 포기할까 생각 중이야, Tina."],
  ["G", "Why? I thought you really wanted to {take part in} the contest.", "왜? 나는 네가 그 대회에 정말로 참가하고 싶어 한다고 생각했어."],
  ["B", "I don't think I'm a good singer.", "나는 내가 노래를 잘하는 것 같지 않아."],
  ["G", "Come on. You're {the best singer I know}.", "그건 아니야. 너는 내가 아는 노래를 가장 잘하는 사람이야."],
  ["B", "Do you really think so?", "정말로 그렇게 생각하니?"],
  ["G", "Of course. You have a really {nice voice}.", "물론이지. 너는 정말 멋진 목소리를 가졌어."],
  ["B", "Thank you for saying so. I'll {do my best}.", "그렇게 말해 줘서 고마워. 최선을 다해 볼게."],
  ["G", "{I hope you win} the contest.", "네가 대회에서 우승하길 바라."]],
  "notes": [
  "be ready for : ‘~에 준비가 되다’ — for는 전치사이므로 뒤에 명사[구]나 {동명사}[구]",
  "I'm thinking of ~ : ‘나는 ~할까 생각 중이야’ = I'm considering ~ / I'm going[planning] to ~ — of는 전치사이므로 {동명사}(giving), give up ‘포기하다’",
  "take part in : ‘~에 참가하다’ = {participate in}",
  "목적격 관계대명사 생략 : 선행사 the best singer를 수식하는 절(I know) 앞에 목적격 관계대명사 {that}이 생략됨",
  "do one's best : ‘{최선을 다하다}’",
  "I hope you ~. : 기원하는 말 하기 — ‘나는 네가 ~하길 바라’, I hope 다음에 접속사 {that}이 생략됨"]},
 {"id": "D6", "label": "Listen and Speak 2 C (e.g.)", "lines": [
  ["A", "What are you going to do tomorrow?", "너는 내일 무엇을 할 거니?"],
  ["B", "I'm going to {sing in the school festival}.", "나는 학교 축제에서 노래를 부를 거야."],
  ["A", "Great! {I hope you move} the audience.", "멋지구나! 나는 네가 관중을 감동시키길 바라."],
  ["B", "Thanks. {I hope so}, too.", "고마워. 나도 그러길 바라."]],
  "notes": [
  "What are you going to do ~? : 상대에게 {계획}을 묻는 표현 — 대답은 I'm going to + 동사원형",
  "I hope you ~. : 기원하는 말 하기 — ‘나는 네가 ~하기를 기원한다’ = I'd like you to ~ / I really {want} you to ~",
  "move : ‘(마음을) {감동시키다}’ — move the audience ‘관중을 감동시키다’",
  "I hope so. : 상대의 기원에 ‘나도 {그러길 바라}’라고 답하는 말 (바라지 않을 때는 I hope not.)"]},
 {"id": "D7", "label": "Real Life Talk", "lines": [
  ["Minho", "Linda, what are you reading?", "Linda, 너는 무엇을 읽고 있니?"],
  ["Linda", "I'm reading {graduation messages} from my classmates.", "난 학급 친구들에게 받은 졸업 메시지를 읽고 있어."],
  ["Minho", "Oh, it {looks like} they had {a lot to say} to you.", "오, 친구들이 너에게 할 말이 많았던 것 같구나."],
  ["Linda", "Many of them wrote that they like my {smile}.", "그들 중 많은 친구들이 나의 미소를 좋아한다고 써 줬어."],
  ["Minho", "That's nice. What else?", "멋지네. 그 외에는?"],
  ["Linda", "Some of them said I didn't {hang out} enough with them.", "그들 중 몇몇은 내가 그들과 충분히 어울리지 않았다고 말했어."],
  ["Minho", "That's not your {fault}. You were always busy.", "그건 네 잘못이 아니야. 너는 항상 바빴잖아."],
  ["Linda", "Yeah, but {I should have spent} more time with my classmates.", "응, 하지만 나는 학급 친구들과 더 많은 시간을 보냈어야 했어."],
  ["Minho", "You still have time after graduation.", "졸업 후에도 여전히 시간이 있어."],
  ["Linda", "You're right.", "네 말이 맞아."],
  ["Minho", "{I hope you keep in touch with} your classmates after graduation.", "네가 졸업 후에도 학급 친구들과 계속 연락하기를 바라."],
  ["Linda", "Thanks. I hope so, too.", "고마워. 나도 그러길 바라."]],
  "notes": [
  "look like : ‘~처럼 {보이다}’ — 뒤에 절(they had ~)이 이어짐",
  "to부정사의 형용사적 용법 : to say가 앞의 명사 a lot을 수식 — ‘{할 말이 많은}’",
  "접속사 that : 동사 wrote의 목적어 자리에 쓰여 {명사절}을 이끄는 접속사, 생략 가능",
  "hang out with : ‘~와 {어울리다}’",
  "I should have + 과거분사 : 후회 표현하기 — 친구들과 더 많은 시간을 {보내지 못한} 것에 대한 후회",
  "I hope you ~. : 기원하는 말 하기 — ‘나는 네가 ~하길 바라’ / keep in touch with ‘~와 {연락하고 지내다}’",
  "I hope so. : ‘나도 그러길 바라’ — 기대와 바람을 나타내는 표현, 바라지 않을 때는 {I hope not}."]},
 {"id": "D8", "label": "Your Turn Step 2 (e.g.)", "lines": [
  ["A", "I can't believe we're {graduating soon}.", "우리가 곧 졸업한다니 믿을 수가 없어."],
  ["B", "Yeah. Is there anything {you regret} about your middle school life?", "그래. 너는 중학교 생활에서 후회하는 것이 있니?"],
  ["A", "Yes, I {should have taken part in} many school events.", "응. 나는 많은 학교 행사에 참여했어야 했어."],
  ["B", "Well, you have a {second chance} in high school.", "음, 너는 고등학교에서 다시 한 번 기회가 있어."],
  ["A", "I guess you're right.", "네 말이 맞는 것 같아."],
  ["B", "{I hope you take part in} many school events in high school.", "네가 고등학교에서 많은 학교 행사에 참여하길 바라."]],
  "notes": [
  "I can't believe ~ : ‘~라니 {믿을 수가 없다}’ — we're graduating은 가까운 미래의 정해진 일을 나타내는 현재진행형",
  "anything (that) you regret : 목적격 관계대명사 {that} 생략 — you regret가 anything을 수식",
  "should have + 과거분사 : 후회 표현하기 — 많은 학교 행사에 참여했어야 했는데 {참여하지 못했다}는 의미",
  "I hope you ~. : 기원하는 말 하기 — take part in = {participate in} ‘~에 참가하다’"]},
]

expressions = [
 ["후회 표현하기", "I {should have} + 과거분사.", "나는 ~했어야 했어. (하지 못했다)"],
 ["후회 표현하기", "I {shouldn't have} + 과거분사.", "나는 ~하지 말았어야 했어. (했다)"],
 ["후회 표현하기", "I {ought to} have + 과거분사.", "나는 ~했어야 했는데."],
 ["후회 표현하기", "I'm {sorry} (that) ~. / I (really) {regret} (that) ~.", "나는 ~해서 유감이야. / 나는 (정말로) ~을 후회해."],
 ["후회 표현하기", "I {had to} ~, but I didn't.", "나는 ~했어야 했지만, 안 했어."],
 ["기원하는 말 하기", "I {hope} (that) you ~.", "나는 네가 ~하길 바라."],
 ["기원하는 말 하기", "I'd {like} you to ~. / I really want you to ~.", "네가 ~했으면 좋겠어. / 나는 정말로 네가 ~하길 원해."],
 ["기원하는 말 하기", "What I really want is {for} you to ~.", "내가 너에게 정말로 원하는 것은 ~이야."],
 ["기원에 답하기", "I hope {so}, too. ↔ I hope not.", "나도 그러길 바라. ↔ 그렇지 않길 바라."],
 ["문제 묻기", "{What's wrong}? = What's up? / What's the matter?", "무슨 일 있니?"],
 ["계획 묻고 말하기", "What are you {going to} do? — I'm planning to ~ / I'm thinking of + -ing.", "너는 무엇을 할 거니? — 나는 ~할 계획이야 / ~할까 생각 중이야."],
]

stage3 = [
 ["D1", "I should have eaten less last night.", "나는 어젯밤에 덜 먹었어야 했어."],
 ["D2", "I shouldn't have put it off until the last moment.", "나는 마지막 순간까지 미루지 말았어야 했어."],
 ["D4", "I hope you have a wonderful vacation.", "나는 네가 멋진 방학을 보내길 바라."],
 ["D5", "I thought you really wanted to take part in the contest.", "나는 네가 그 대회에 정말로 참가하고 싶어 한다고 생각했어."],
 ["D5", "I don't think I'm a good singer.", "나는 내가 노래를 잘하는 것 같지 않아."],
 ["D7", "I should have spent more time with my classmates.", "나는 학급 친구들과 더 많은 시간을 보냈어야 했어."],
 ["D7", "I hope you keep in touch with your classmates after graduation.", "네가 졸업 후에도 학급 친구들과 계속 연락하기를 바라."],
 ["D8", "Is there anything you regret about your middle school life?", "너는 중학교 생활에서 후회하는 것이 있니?"],
]

stage4 = ["D2", "D4", "D5", "D7", "D8"]

T, F = "T", "F"
stage5 = [
 # D1 (7)
 ["D1", "Mike was late for class because he had a bad headache.", F, "B 1: I had a bad stomachache.", "세부 정보 바꾸기(headache ↔ stomachache)"],
 ["D1", "The girl asks Mike why he was late for class.", T, "G 1: Mike, why were you late for class?", "간접의문문으로 바꾸기"],
 ["D1", "Mike ate less last night, but he still got a stomachache.", F, "B 2: I should have eaten less (실제로는 많이 먹음)", "should have vs did"],
 ["D1", "Mike regrets eating too much last night.", T, "B 2: I should have eaten less last night.", "표현 의도(후회)"],
 ["D1", "Mike still has a bad stomachache now.", F, "G 2 Are you okay now? → B 2 Yeah.", "시제 바꾸기(과거 ↔ 현재)"],
 ["D1", "It is the girl who had a bad stomachache.", F, "B 1: I had a bad stomachache. (아팠던 사람은 Mike)", "화자 바꾸기"],
 ["D1", "Mike says that he is okay now.", T, "G 2 → B 2: Yeah.", "바꿔 말하기"],
 # D2 (8)
 ["D2", "Jiho looks tired because he stayed up late last night.", T, "G 1 You look tired. → B 1 I stayed up late last night.", "두 대사 종합"],
 ["D2", "Jiho stayed up late because he played computer games again.", F, "B 2: No, not this time. I had to finish my history project.", "이유 바꾸기"],
 ["D2", "Jiho's history project is due tomorrow.", F, "G 3 Is it due today? → B 3 Yeah.", "시간 바꾸기(today ↔ tomorrow)"],
 ["D2", "Jiho regrets that he finished his project too early.", F, "B 3: I shouldn't have put it off until the last moment. (미룬 것을 후회)", "반대 의미"],
 ["D2", "Jiho thinks he should have started his project earlier.", T, "B 3: shouldn't have put it off (미루지 말았어야 = 일찍 했어야)", "바꿔 말하기"],
 ["D2", "The girl often has the same problem as Jiho.", T, "G 4: I often have the same problem.", "그대로"],
 ["D2", "Jiho suggests that they try to change their bad habits.", T, "B 4: let's try to change our bad habits", "표현 의도(제안)"],
 ["D2", "Jiho put off his science project until the last moment.", F, "B 2: my history project", "부분만 맞음(과목 바꾸기)"],
 # D3 (6)
 ["D3", "B got caught in the snow.", F, "B 1: I got caught in the rain.", "세부 정보 바꾸기"],
 ["D3", "A asks B what is wrong.", T, "A 1: What's wrong?", "간접의문문으로 바꾸기"],
 ["D3", "A is sorry to hear about what happened to B.", T, "A 2: Oh, I'm sorry to hear that.", "표현 의도(유감)"],
 ["D3", "B took an umbrella but still got caught in the rain.", F, "B 2: I should have taken an umbrella. (가져오지 않음)", "should have vs did"],
 ["D3", "B regrets not taking an umbrella.", T, "B 2: I should have taken an umbrella.", "표현 의도(후회)"],
 ["D3", "It is A who got caught in the rain.", F, "B 1: I got caught in the rain. (비를 맞은 사람은 B)", "화자 바꾸기"],
 # D4 (8)
 ["D4", "Jinsu is going to read lots of books during the vacation.", T, "B 1: I'm going to read lots of books.", "그대로"],
 ["D4", "Jinsu is planning to visit his grandparents in Busan.", F, "G 2: I'm planning to visit my grandparents ~ (부산에 가는 사람은 소녀)", "화자 바꾸기"],
 ["D4", "The girl's grandparents live in Busan.", T, "G 2: my grandparents in Busan", "바꿔 말하기"],
 ["D4", "The girl asks Jinsu about his vacation plans first.", T, "G 1: Jinsu, what are you going to do during the vacation?", "순서 확인"],
 ["D4", "The girl is going to read lots of books with her grandparents.", F, "책 읽기는 Jinsu(B 1), 조부모님 방문은 소녀(G 2)", "부분만 맞음(두 계획 섞기)"],
 ["D4", "Jinsu hopes the girl has a wonderful vacation.", T, "B 2: I hope you have a wonderful vacation.", "표현 의도(기원)"],
 ["D4", "The girl wishes Jinsu a wonderful vacation.", F, "B 2: I hope you ~ (기원한 사람은 Jinsu)", "화자 바꾸기"],
 ["D4", "They are talking about their plans for the weekend.", F, "G 1: during the vacation", "시간 바꾸기"],
 # D5 (8)
 ["D5", "Jaemin is thinking of giving up the singing contest.", T, "B 1: I'm thinking of giving up", "그대로"],
 ["D5", "Jaemin doesn't think he is a good singer.", T, "B 2: I don't think I'm a good singer.", "바꿔 말하기"],
 ["D5", "Tina thinks Jaemin is the best singer she knows.", T, "G 3: You're the best singer I know.", "바꿔 말하기"],
 ["D5", "Jaemin decided not to drop out of the contest.", T, "B 4: I'll do my best. (포기하지 않기로 함, drop out = give up)", "바꿔 말하기(drop out)"],
 ["D5", "Jaemin decides to give up because he doesn't have a nice voice.", F, "B 4: I'll do my best. (포기하지 않음)", "결정 뒤집기 + 이유 꾸미기"],
 ["D5", "In the end, Jaemin says he will do his best in the contest.", T, "B 4: Thank you for saying so. I'll do my best.", "결과 확인"],
 ["D5", "Jaemin hopes Tina wins the singing contest.", F, "G 5: I hope you win the contest. (기원한 사람은 Tina)", "화자 바꾸기"],
 ["D5", "Jaemin has already won the singing contest.", F, "G 5: I hope you win ~ (아직 대회 전)", "시제 바꾸기(기원 vs 결과)"],
 # D6 (7)
 ["D6", "B is going to sing in the school festival tomorrow.", T, "A 1 tomorrow → B 1 I'm going to sing in the school festival.", "두 대사 종합"],
 ["D6", "A is going to sing in the school festival.", F, "B 1: I'm going to sing ~ (노래하는 사람은 B)", "화자 바꾸기"],
 ["D6", "A hopes B moves the audience.", T, "A 2: I hope you move the audience.", "표현 의도(기원)"],
 ["D6", "B answers A's wish by saying, \"I hope not.\"", F, "B 2: Thanks. I hope so, too. (≠ I hope not.)", "반대 의미(I hope so ↔ I hope not)"],
 ["D6", "B is going to play soccer in the school festival.", F, "B 1: sing in the school festival", "세부 정보 바꾸기"],
 ["D6", "B sang in the school festival yesterday.", F, "A 1: tomorrow (앞으로의 계획)", "시간·시제 바꾸기"],
 ["D6", "B thanks A for the kind words.", T, "B 2: Thanks.", "바꿔 말하기"],
 # D7 (8)
 ["D7", "Many of Linda's classmates wrote that they like her smile.", T, "Linda 2: Many of them wrote that they like my smile.", "그대로"],
 ["D7", "All of Linda's classmates said she didn't hang out enough with them.", F, "Linda 3: Some of them said ~", "수량 바꾸기(Some ↔ All)"],
 ["D7", "Minho thinks it is Linda's fault that she didn't hang out enough with her classmates.", F, "Minho 4: That's not your fault.", "반대 의미"],
 ["D7", "Linda spent a lot of time with her classmates, so she has nothing to regret.", F, "Linda 4: I should have spent more time ~ (충분히 보내지 못함)", "should have vs did"],
 ["D7", "Linda regrets not spending more time with her classmates.", T, "Linda 4: I should have spent more time with my classmates.", "표현 의도(후회)"],
 ["D7", "According to Minho, Linda was always busy.", T, "Minho 4: You were always busy.", "화자 확인"],
 ["D7", "Minho says Linda didn't hang out with her classmates because she was lazy.", F, "Minho 4: You were always busy. (게을러서가 아님)", "이유 바꾸기"],
 ["D7", "Minho hopes Linda keeps in touch with her classmates after graduation.", T, "Minho 6: I hope you keep in touch with your classmates after graduation.", "표현 의도(기원)"],
 # D8 (7)
 ["D8", "A and B are going to graduate soon.", T, "A 1: I can't believe we're graduating soon.", "바꿔 말하기(현재진행형 = 가까운 미래)"],
 ["D8", "B regrets not taking part in many school events.", F, "A 2: I should have taken part in ~ (후회하는 사람은 A)", "화자 바꾸기"],
 ["D8", "A took part in many school events in middle school.", F, "A 2: I should have taken part in many school events. (참여하지 못함)", "should have vs did"],
 ["D8", "B says A will have another chance in high school.", T, "B 2: you have a second chance in high school", "바꿔 말하기(second ↔ another)"],
 ["D8", "A doesn't agree with what B says about high school.", F, "A 3: I guess you're right.", "반대 의미"],
 ["D8", "B hopes A takes part in many school events in high school.", T, "B 3: I hope you take part in many school events in high school.", "표현 의도(기원)"],
 ["D8", "A asks B if there is anything B regrets about middle school life.", F, "B 1: Is there anything you regret ~? (질문한 사람은 B)", "화자 바꾸기"],
]

stage5b = [
 {"d": "D1", "kind": "true", "q": "대화의 내용과 일치하는 것을 모두 고르시오.", "opts": [
  ["Mike ate too little last night.", False, "should have eaten less — 너무 많이 먹음"],
  ["Mike was late for class.", True, "G 1"],
  ["The girl was also late for class.", False, "언급 없음 — 늦은 사람은 Mike"],
  ["Mike had a bad stomachache.", True, "B 1"],
  ["Mike is okay now.", True, "G 2 → B 2 Yeah."]]},
 {"d": "D2", "kind": "cannot", "q": "대화를 읽고 대답할 수 없는 질문을 모두 고르시오.", "opts": [
  ["Why does Jiho look tired?", True, "어젯밤 늦게까지 깨어 있었음"],
  ["What subject is Jiho's project for?", True, "역사(history)"],
  ["What time did Jiho go to bed last night?", False, "늦게 잤다는 것만 — 시각 언급 없음"],
  ["When is the project due?", True, "오늘(today)"],
  ["What computer game does Jiho usually play?", False, "게임 이름 언급 없음"]]},
 {"d": "D3", "kind": "can", "q": "대화를 읽고 대답할 수 있는 질문을 모두 고르시오.", "opts": [
  ["What happened to B?", True, "비를 맞음"],
  ["Where did B leave the umbrella?", False, "우산을 어디에 두었는지 언급 없음"],
  ["How long did B stay in the rain?", False, "언급 없음"],
  ["What does B regret?", True, "우산을 가져오지 않은 것"],
  ["How does A feel about B's news?", True, "유감(sorry to hear that)"]]},
 {"d": "D4", "kind": "false", "q": "대화의 내용과 일치하지 않는 것을 모두 고르시오.", "opts": [
  ["Jinsu is going to read lots of books.", True, "B 1"],
  ["Jinsu's grandparents live in Busan.", False, "부산의 조부모님은 소녀의 조부모님"],
  ["The girl is planning to visit Busan.", True, "G 2"],
  ["Jinsu is going to travel to Busan with the girl.", False, "언급 없음 — Jinsu는 책 읽기"],
  ["Jinsu wishes the girl a wonderful vacation.", True, "B 2"]]},
 {"d": "D5", "kind": "cannot", "q": "대화를 읽고 대답할 수 없는 질문을 모두 고르시오.", "opts": [
  ["What song will Jaemin sing in the contest?", False, "곡명 언급 없음"],
  ["What is Jaemin thinking of doing?", True, "포기하기(giving up)"],
  ["What does Tina think of Jaemin's voice?", True, "정말 멋진 목소리"],
  ["Where will the singing contest be held?", False, "장소 언급 없음"],
  ["What does Tina hope?", True, "Jaemin이 우승하길"]]},
 {"d": "D6", "kind": "true", "q": "대화의 내용과 일치하는 것을 모두 고르시오.", "opts": [
  ["B is going to sing in the school festival.", True, "B 1"],
  ["A is going to sing with B.", False, "언급 없음"],
  ["A hopes B moves the audience.", True, "A 2"],
  ["B doesn't want to move the audience.", False, "I hope so, too."],
  ["B will sing in front of an audience tomorrow.", True, "A 1 tomorrow + B 1 + A 2 the audience"]]},
 {"d": "D7", "kind": "false", "q": "대화의 내용과 일치하지 않는 것을 모두 고르시오.", "opts": [
  ["Many of Linda's classmates like her smile.", True, "Linda 2"],
  ["Linda regrets not spending more time with her classmates.", True, "Linda 4"],
  ["Minho is reading graduation messages from his classmates.", False, "읽는 사람은 Linda (화자 바꾸기)"],
  ["Minho thinks it is Linda's fault.", False, "Minho 4: That's not your fault."],
  ["Minho hopes Linda keeps in touch with her classmates.", True, "Minho 6"]]},
 {"d": "D8", "kind": "cannot", "q": "대화를 읽고 대답할 수 없는 질문을 모두 고르시오.", "opts": [
  ["What does A regret about middle school life?", True, "학교 행사에 많이 참여하지 않은 것"],
  ["Which high school is A going to go to?", False, "학교 이름 언급 없음"],
  ["How many school events did B take part in?", False, "B의 참여 언급 없음"],
  ["Where does A have a second chance?", True, "고등학교"],
  ["When exactly is the graduation ceremony?", False, "soon(곧)만 나옴 — 날짜 언급 없음"]]},
]

stage6 = [
 {"d": "D1", "ans": "What did Mike eat last night?", "trap": "세부 정보 꾸미기(음식)", "why": "어젯밤에 덜 먹었어야 했다는 후회만 나오고 무엇을 먹었는지는 언급되지 않음",
  "ok": [["Why was Mike late for class?", "He had a bad stomachache.", "B 1"],
         ["How is Mike now?", "He is okay now.", "B 2"],
         ["What does Mike regret?", "Eating too much last night.", "B 2"],
         ["Who asks Mike why he was late?", "The girl.", "G 1"]]},
 {"d": "D2", "ans": "How long did it take Jiho to finish his project?", "trap": "범위 넘기기(시간)", "why": "늦게까지 깨어 있었다는 것만 나오고 과제를 끝내는 데 걸린 시간은 언급되지 않음",
  "ok": [["Why does Jiho look tired?", "He stayed up late last night.", "B 1"],
         ["What did Jiho have to finish?", "His history project.", "B 2"],
         ["When is the project due?", "Today.", "G 3 + B 3"],
         ["What does Jiho suggest?", "Trying to change their bad habits.", "B 4"]]},
 {"d": "D3", "ans": "Where did B get caught in the rain?", "trap": "세부 정보 꾸미기(장소)", "why": "비를 맞았다는 것만 나오고 어디에서 비를 맞았는지는 언급되지 않음",
  "ok": [["What does A ask B first?", "What's wrong.", "A 1"],
         ["What happened to B?", "B got caught in the rain.", "B 1"],
         ["How does A feel?", "A is sorry to hear that.", "A 2"],
         ["What does B regret?", "Not taking an umbrella.", "B 2"]]},
 {"d": "D4", "ans": "How long will the girl stay in Busan?", "trap": "범위 넘기기(기간)", "why": "부산의 조부모님을 찾아뵐 계획만 나오고 머무를 기간은 언급되지 않음",
  "ok": [["What is Jinsu going to do during the vacation?", "Read lots of books.", "B 1"],
         ["Who is the girl planning to visit?", "Her grandparents.", "G 2"],
         ["Where do the girl's grandparents live?", "In Busan.", "G 2"],
         ["What does Jinsu hope?", "That the girl has a wonderful vacation.", "B 2"]]},
 {"d": "D5", "ans": "What song is Jaemin going to sing in the contest?", "trap": "세부 정보 꾸미기(곡명)", "why": "노래 경연 대회에 나간다는 것만 나오고 부를 노래는 언급되지 않음",
  "ok": [["What is Jaemin thinking of doing?", "Giving up (the singing contest).", "B 1"],
         ["Why is Jaemin thinking of giving up?", "He doesn't think he's a good singer.", "B 2"],
         ["What does Tina think of Jaemin's voice?", "It's really nice.", "G 4"],
         ["What does Tina hope?", "That Jaemin wins the contest.", "G 5"]]},
 {"d": "D6", "ans": "What time does the school festival start?", "trap": "세부 정보 꾸미기(시각)", "why": "내일 학교 축제에서 노래한다는 것만 나오고 축제 시작 시각은 언급되지 않음",
  "ok": [["What does A ask B?", "What B is going to do tomorrow.", "A 1"],
         ["What is B going to do tomorrow?", "Sing in the school festival.", "B 1"],
         ["What does A hope?", "That B moves the audience.", "A 2"],
         ["How does B respond to A's wish?", "B says thanks and hopes so, too.", "B 2"]]},
 {"d": "D7", "ans": "Why was Linda always busy?", "trap": "이유 범위 넘기기", "why": "Linda가 항상 바빴다는 사실만 나오고 왜 바빴는지는 언급되지 않음",
  "ok": [["What is Linda reading?", "Graduation messages from her classmates.", "Linda 1"],
         ["What did many of her classmates write?", "That they like her smile.", "Linda 2"],
         ["What does Linda regret?", "Not spending more time with her classmates.", "Linda 4"],
         ["What does Minho hope?", "That Linda keeps in touch with her classmates after graduation.", "Minho 6"]]},
 {"d": "D8", "ans": "What school events did A take part in?", "trap": "후회 내용 비틀기(should have ↔ did)", "why": "A는 학교 행사에 많이 참여하지 못한 것을 후회할 뿐, 어떤 행사에 참여했는지는 언급되지 않음",
  "ok": [["What can't A believe?", "That they're graduating soon.", "A 1"],
         ["What does A regret about middle school life?", "Not taking part in many school events.", "A 2"],
         ["Where does A have a second chance?", "In high school.", "B 2"],
         ["What does B hope?", "That A takes part in many school events in high school.", "B 3"]]},
]

def fix(o):
    if isinstance(o, str): return q(o)
    if isinstance(o, list): return [fix(x) for x in o]
    if isinstance(o, dict): return {k: fix(v) for k, v in o.items()}
    return o

out = fix({"dialogues": dialogues, "expressions": expressions, "stage3": stage3, "stage4": stage4,
           "stage5": stage5, "stage5b": stage5b, "stage6": stage6})
json.dump(out, open("dl8_dlg.json", "w"), ensure_ascii=False, indent=1)

anchors = fix({
 "D1-1": "should have eaten",
 "D2-1": "what's up?", "D2-2": "You look", "D2-3": "had to", "D2-4": "due", "D2-5": "put it off", "D2-6": "until", "D2-7": "try to",
 "D3-1": "What's wrong?", "D3-2": "caught in the rain", "D3-3": "sorry to hear that", "D3-4": "should have taken",
 "D4-1": ["what are you going to do", "I'm going to", "I'm planning to"], "D4-2": "I hope you",
 "D5-1": "ready for", "D5-2": "I'm thinking of", "D5-3": "take part in", "D5-4": "the best singer", "D5-5": "do my best", "D5-6": "I hope you",
 "D6-1": "What are you going to do", "D6-2": "I hope you", "D6-3": "move", "D6-4": "I hope so",
 "D7-1": "looks like", "D7-2": "a lot to say", "D7-3": "wrote that", "D7-4": "enough with", "D7-5": "should have spent", "D7-6": "I hope you", "D7-7": "I hope so",
 "D8-1": "I can't believe", "D8-2": "you regret", "D8-3": "should have taken part in", "D8-4": "I hope you",
})
cfg = {"dlg": "dl8_dlg.json", "lesson": "8", "outDir": "out/동아이/8과/01. 대화", "term": "2026 · 2학기 기말고사 대비",
 "schools": "대덕중 · 언동중 3학년", "schoolsShort": "대덕·언동중 3학년", "book": "중3 동아(이병민) Lesson 8  Up to You",
 "pubShort": "동아이", "lessonTitle": "Up to You", "s6answers": [2, 5, 3, 1, 4, 1, 5, 3], "anchors": anchors}
json.dump(cfg, open("dl8_dcfg.json", "w"), ensure_ascii=False)
print(len(stage5), {d["id"]: sum(1 for x in stage5 if x[0] == d["id"]) for d in dialogues})
