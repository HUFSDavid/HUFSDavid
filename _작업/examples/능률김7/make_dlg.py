import json, os
HERE = os.path.dirname(os.path.abspath(__file__))
A = "’"
def q(s): return s.replace("'", A)

# 능률김 7과 Future Changes through Technology — Listen & Talk 1·2 + Presentation Time
dialogues = [
 {"id": "D1", "label": "Listen & Talk 1 · A. Get Ready", "lines": [
  ["G", "Hey, have you {heard of} a {smart umbrella}?", "있잖아, 스마트 우산에 대해 들어 본 적 있니?"],
  ["B", "No, I {haven't}. {Could you explain} {what it is}?", "아니, 들어 본 적 없어. 그게 뭔지 설명해 주겠니?"],
  ["G", "Sure. It's an umbrella {that gives you} the {weather forecast} for the day. If it {is going to rain}, the umbrella {makes a sound}.", "물론이지. 그것은 그날의 일기 예보를 제공하는 우산이야. 만약 비가 올 예정이면, 우산에서 소리가 나."],
  ["B", "That's very {convenient}.", "그거 참 편리하네."]],
  "notes": [
  "Have you heard of ~? : 현재완료로 {경험}을 묻는 말 — of 대신 about도 가능 / 답: Yes, I have. · No, I {haven't}.",
  "Could you explain ~? : 설명 {요청}하기 ‘~을 설명해 줄 수 있니?’ (Can you ~?보다 정중)",
  "간접의문문 : explain의 목적어 — {의문사 + 주어 + 동사} 어순 (what is it ✗ → what it is)",
  "주격 관계대명사 that : 선행사 an umbrella를 꾸미는 절을 이끎 = {which} / gives you the weather forecast ‘일기 예보를 주다’",
  "조건의 접속사 If : ‘만약 ~라면’ — it은 날씨를 나타내는 {비인칭} 주어 / be going to ‘~할 예정이다’"]},
 {"id": "D2", "label": "Listen & Talk 1 · B. Listen and Circle", "lines": [
  ["G", "Look at these. They are the new {inventions of the month}!", "이것들을 봐. 이달의 새로운 발명품들이야!"],
  ["B", "They all {look great}. What is the invention {on the first page}?", "모두 굉장해 보인다. 첫 번째 쪽에 있는 발명품은 뭐지?"],
  ["G", "It's a new {smart refrigerator}. It {senses the items} inside it and {suggests recipes}.", "그건 새로 나온 스마트 냉장고야. 그 냉장고는 냉장고 내부의 물건들을 감지하고 요리법을 제안해."],
  ["B", "That {sounds helpful}.", "그거 유용하겠다."],
  ["G", "It does. {What do you think of} this flying camera? I want to buy it.", "맞아. 이 비행 카메라에 대해서는 어떻게 생각해? 나는 이걸 사고 싶어."],
  ["B", "A flying camera? {Could you explain how it works}?", "비행 카메라? 그게 어떻게 작동하는지 설명해 주겠니?"],
  ["G", "Of course. This machine flies to a {destination} that we {have already set}. {While it's flying}, it can take pictures from {500 meters above} the location.", "물론이지. 이 기기는 우리가 미리 설정해 둔 목적지로 날아가. 비행하는 동안 이 기기는 그 지점의 500미터 상공으로부터 사진을 찍을 수 있어."],
  ["B", "That {sounds awesome}. What do you want to {take pictures of}?", "그거 정말 멋지다. 너는 무엇의 사진을 찍고 싶니?"],
  ["G", "I want to take pictures of {flying birds}!", "나는 날고 있는 새들의 사진을 찍고 싶어!"]],
  "notes": [
  "감각동사 + 형용사 : look·sound 뒤에는 {형용사} 보어 (look greatly ✗ / sound helpfully ✗)",
  "병렬구조 : It(= the smart refrigerator) {senses} ~ and {suggests} ~ — 단수 주어에 맞춘 동사 두 개",
  "What do you think of ~? : 상대의 {의견}을 묻는 말 ‘~을 어떻게 생각하니?’ (How do you think of ~? ✗)",
  "Could you explain how it works? : 설명 요청하기 — 목적어는 간접의문문 {how it works} (how does it work ✗)",
  "목적격 관계대명사 that : 선행사 a destination을 꾸밈 = which, {생략} 가능 / have already set ‘이미 설정해 두었다’(현재완료)",
  "접속사 While : ‘~하는 {동안}’ — it’s flying(진행형)과 함께 동시 동작",
  "take pictures of ~ : ‘~의 {사진을 찍다}’ — 의문문에서는 of가 문장 끝에 남음(What ~ of?)"]},
 {"id": "D3", "label": "Listen & Talk 1 · C. Listen and Speak", "lines": [
  ["B", "{What are you watching}?", "무엇을 보고 있니?"],
  ["G", "It's a show about a man {who lost one of his arms} in an accident. {Surprisingly}, he can {play the drums} very well.", "이건 사고로 한쪽 팔을 잃은 한 남자에 관한 프로야. 놀랍게도 그는 드럼을 매우 잘 칠 수 있어."],
  ["B", "How can he play the drums {with only one arm}?", "그 사람은 어떻게 한쪽 팔만으로 드럼을 칠 수 있는 거지?"],
  ["G", "Actually he {uses two arms}. One is a robot arm {controlled by his brain}.", "사실 그는 두 팔을 사용해. 한쪽 팔은 그의 뇌가 제어하는 로봇 팔이야."],
  ["B", "That's awesome. {Could you explain in more detail}?", "그거 굉장하다. 좀 더 자세히 설명해 주겠니?"],
  ["G", "Sure. First, he thinks {what he wants to do} with his arm. Then those thoughts {are turned into} {electronic signals}. The signals travel {from his brain to his robot arm} and move it.", "물론이지. 먼저, 그는 자신의 팔로 하고 싶은 것을 생각해. 그런 다음 그 생각들이 전자 신호로 바뀌지. 그 신호는 그의 뇌에서 로봇 팔로 이동해서 그 팔을 움직여."],
  ["B", "That's amazing! I think this technology can {help many people}.", "놀랍다! 이 기술은 많은 사람에게 도움을 줄 수 있을 것 같아."]],
  "notes": [
  "주격 관계대명사 who : 사람 선행사 a man을 꾸밈 = {that} / one of + {복수명사}(arms) ‘~ 중 하나’",
  "과거분사 수식 : controlled by his brain이 a robot arm을 뒤에서 꾸밈 — 앞에 {which[that] is} 생략, ‘뇌에 의해 제어되는’",
  "Could you explain in more detail? : 더 {자세한} 설명을 요청하는 말 — in detail ‘자세히’",
  "관계대명사 what : thinks의 목적어 — ‘그가 팔로 하고 싶은 {것}’ = the thing that",
  "be turned into ~ : ‘~으로 {바뀌다}’ (turn A into B의 수동태)",
  "병렬구조 : The signals {travel} ~ and {move} it — 복수 주어에 맞춘 동사 두 개 / it = his robot arm"]},
 {"id": "D4", "label": "Listen & Talk 1 · D. Talk Together", "lines": [
  ["A", "The {space balloon} is an {interesting invention}.", "우주 풍선은 흥미로운 발명품이야."],
  ["B", "I {haven't heard of it before}. {Could you explain what it is}?", "나는 이전에 그것에 대해 들어 본 적이 없어. 그게 뭔지 설명해 주겠니?"],
  ["A", "Yes. It is a balloon {that can take you} {near space}.", "응. 그것은 너를 우주 가까이로 데려다 줄 수 있는 풍선이야."],
  ["B", "{That's cool}.", "그거 멋진데."]],
  "notes": [
  "현재완료(경험) 부정 : haven’t heard of ~ before ‘전에 ~에 대해 들어 본 적이 {없다}’",
  "Could you explain what it is? : 설명 요청하기 — 처음 듣는 대상의 {정체}를 묻는 말 = Can you tell me more about it?",
  "주격 관계대명사 that : a balloon을 꾸밈 / take A near B ‘A를 B {가까이로} 데려가다’",
  "That’s cool. : 설명을 듣고 {긍정적} 반응 보이기"]},
 {"id": "D5", "label": "Listen & Talk 2 · A. Get Ready", "lines": [
  ["G", "{You know what}? Scientists {are working on} a project {to send people to Mars}.", "그거 알아? 과학자들이 화성으로 사람들을 보내는 프로젝트에 착수 중이래."],
  ["B", "{It is likely that} we'll {live in outer space} in the {near future}.", "우리가 가까운 미래에 외계에서 살게 될 가능성이 있겠구나."]],
  "notes": [
  "You know what? : 말을 꺼내기 전 상대의 {주의}를 끄는 표현 ‘그거 알아?’",
  "work on ~ : ‘~에 {착수하다}, 공을 들이다’ — 현재진행형으로 지금 진행 중인 일",
  "to부정사의 형용사적 용법 : to send가 a project를 {뒤에서} 꾸밈 / send A to B ‘A를 B로 보내다’",
  "It is likely that ~ : 가능성 정도 표현하기 ‘~할 {가능성이 있다}’ — that 뒤에는 완전한 절",
  "in the near future : ‘{가까운} 미래에’"]},
 {"id": "D6", "label": "Listen & Talk 2 · B. Listen and Choose", "lines": [
  ["M", "As climate change is going to {make farming harder}, {there may not be} enough resources for the {increasing number of people} on Earth.", "기후 변화가 농업을 더 어렵게 만들 것이기 때문에, 지구상의 증가하는 인구 수를 위한 자원이 충분하지 않게 될지도 모른다."],
  ["M", "For this reason, {it is likely that} we will have to change {how we get our food}.", "이러한 이유로, 우리는 식량을 얻는 방법을 바꿔야 할 가능성이 있다."],
  ["M", "For example, we won't {kill animals for food}. Instead, meat {will be grown} in a lab {using animal cells}. This will {require less land}, water, and other resources.", "예를 들어, 우리는 식량을 얻기 위해 동물을 죽이지 않게 될 것이다. 그 대신에, 동물 세포를 이용하여 실험실에서 고기가 배양될 것이다. 이는 보다 적은 토지와 물, 그리고 다른 자원을 필요로 할 것이다."],
  ["M", "Also, bugs {such as ants} will become {part of our daily meals}. You might not want to eat them, but they are actually {very rich in nutrients}!", "또한, 개미와 같은 곤충이 우리 끼니의 일부가 될 것이다. 여러분은 먹고 싶지 않을지도 모르지만, 사실 곤충은 영양분이 매우 풍부하다!"]],
  "notes": [
  "접속사 As : ‘~하기 {때문에}’(이유) — 뒤에 주어 + 동사",
  "make + 목적어 + 형용사 : ‘~을 …하게 만들다’ — 목적격보어 자리에 {형용사}(harder) (hardly ✗)",
  "there + be + 주어 : may not과 함께 ‘~이 {없을지도} 모른다’ / the increasing number of ~ ‘증가하는 ~의 수’",
  "it is likely that ~ : 가능성 정도 표현하기 ‘~할 가능성이 있다’ = we are {likely to} have to change ~",
  "관계부사 how : ‘~하는 {방법}’ — the way와 how는 함께 쓰지 않음 (the way how ✗)",
  "조동사 + 수동태 : will be grown ‘{배양될} 것이다’ — 주어 meat가 기르는 대상",
  "분사구문 : using animal cells ‘동물 세포를 {이용하여}’",
  "such as ~ : ‘~와 {같은}’ — 앞 명사(bugs)의 예시",
  "be rich in ~ : ‘~이 {풍부하다}’ — them·they = bugs"]},
 {"id": "D7", "label": "Listen & Talk 2 · C. Listen and Speak", "lines": [
  ["G", "I had to {wait in line} at the store {for almost twenty minutes}.", "나는 매장에서 거의 20분 동안을 줄 서서 기다려야 했어."],
  ["B", "{That's too bad}. Maybe in the future we'll {never have to} wait in line.", "그것 참 유감이네. 어쩌면 미래에는 줄을 서서 기다릴 필요가 전혀 없을지도 몰라."],
  ["G", "{What do you mean}?", "그게 무슨 말이야?"],
  ["B", "I read about a store {without cashiers}. You take {what you want to buy} and just {walk out}.", "계산원이 없는 매장에 관한 글을 읽었거든. 너는 사고 싶은 것을 가지고 그냥 걸어 나가면 돼."],
  ["G", "That's it? How do you {pay for} it?", "그게 다야? 지불은 어떻게 해?"],
  ["B", "There are {cameras and sensors} in the store. They {keep track of} the items you choose and {send the information} to an app on your smartphone.", "매장 내에 카메라와 감지기가 있어. 그것들이 네가 고르는 물건들을 계속 추적하고 그 정보를 네 스마트폰에 있는 앱으로 보내."],
  ["G", "Then the app pays for them {when you leave the store}?", "그러면 매장을 나갈 때 앱이 그 물건 값을 지불하고?"],
  ["B", "Exactly. {It's likely that} these kinds of stores will be {more common} in the future.", "바로 그거야. 미래에는 이런 종류의 매장을 더 흔히 볼 수 있을 것 같아."]],
  "notes": [
  "wait in line : ‘줄을 서서 {기다리다}’ / had to ‘~해야 했다’(must의 과거)",
  "for + 기간 : ‘~ {동안}’ — almost ‘거의’",
  "never have to ~ : ‘~할 필요가 전혀 {없다}’ — have to의 부정 = don’t need to",
  "What do you mean? : 상대의 말을 이해하지 못했을 때 {설명}을 요청하는 말 = Could you explain that?",
  "관계대명사 what : take의 목적어 — ‘네가 사고 싶은 {것}’",
  "병렬구조 : You {take} ~ and just {walk} out — 주어 You에 이어지는 동사 두 개",
  "There are + {복수명사} : ‘~이 있다’ — cameras and sensors가 주어",
  "keep track of ~ : ‘~을 계속 {추적하다}[파악하다]’ — They keep ~ and send ~ 병렬 / They = cameras and sensors",
  "목적격 관계대명사 생략 : the items (that) you choose ‘네가 {고르는} 물건들’",
  "It’s likely that ~ : 가능성 정도 표현하기 = These kinds of stores are {likely to} be more common ~"]},
 {"id": "D8", "label": "Listen & Talk 2 · D. Talk Together", "lines": [
  ["A", "How will {our lives change} in the future?", "미래에 우리의 생활은 어떻게 바뀔까?"],
  ["B", "I think that restaurants will {change a lot}.", "나는 식당에 많은 변화가 있을 거라고 생각해."],
  ["A", "{How do you think} they will change?", "그것이 어떻게 바뀔 거라고 생각하는데?"],
  ["B", "{It is likely that} there will be {3D printed food} in restaurants.", "3D 프린터로 출력된 음식들이 식당에 있을 것 같아."]],
  "notes": [
  "How will ~ change? : 미래의 {변화}를 묻는 말 — lives는 life의 복수형",
  "I think (that) ~ : 자신의 {의견} 말하기 — that은 생략 가능",
  "How do you think + 주어 + 동사? : think가 있는 간접의문문은 의문사를 문장 {맨 앞}에 (Do you think how ~? ✗) / they = restaurants",
  "It is likely that ~ : 가능성 정도 표현하기 ‘~일 {것 같다}’",
  "과거분사 수식 : 3D printed food ‘3D 프린터로 {출력된} 음식’"]},
 {"id": "D9", "label": "Presentation Time · Step 1", "lines": [
  ["A", "{Could you explain} {what this painting shows}?", "이 그림이 무엇을 나타내는지 설명해 주겠니?"],
  ["B", "I think it shows {a machine helping people clean} their houses.", "내 생각에 그것은 사람들이 집을 청소하는 것을 도와주는 기계를 나타내는 것 같아."]],
  "notes": [
  "Could you explain + 간접의문문 : what this painting shows — {의문사 + 주어 + 동사} 어순",
  "현재분사 수식 : helping ~이 a machine을 뒤에서 꾸밈 ‘~을 {도와주는} 기계’",
  "help + 목적어 + 동사원형[to부정사] : help people {clean} ‘사람들이 청소하는 것을 돕다’"]},
 {"id": "D10", "label": "Presentation Time · Step 3 (발표 예시)", "lines": [
  ["S", "{What do you think} this painting shows? I think it shows a machine {helping people clean} their houses.", "여러분은 이 그림이 무엇을 나타낸다고 생각하나요? 제 생각에 이 그림은 사람들이 집을 청소하는 것을 도와주는 기계를 나타내는 것 같습니다."],
  ["S", "The machine {looks similar to} today's robot vacuum cleaners, but they have {some differences}.", "그 기계는 오늘날의 로봇 진공청소기와 비슷해 보이지만, 둘은 몇 가지 차이점이 있습니다."],
  ["S", "For example, {unlike} today's robot vacuum cleaners, the machine in the painting {is controlled by a human}.", "예를 들어, 오늘날의 로봇 진공청소기와는 다르게 그림 속의 기계는 사람이 조종합니다."]],
  "notes": [
  "What do you think + 주어 + 동사? : think 의문문 속 간접의문문 — 의문사 what이 {맨 앞}으로",
  "현재분사 + help + 목적어 + 동사원형 : a machine helping people {clean} ~",
  "look similar to ~ : ‘~와 {비슷해} 보이다’ — they = 그림 속 기계와 오늘날의 로봇 청소기",
  "unlike ~ : ‘~와 {달리}’(전치사) ↔ like ‘~처럼’",
  "수동태 : is controlled by a human ‘사람에 의해 {조종된다}’ = A human controls the machine."]},
]

expressions = [
 ["설명 요청하기", "Could you {explain} what it is[how it works]?", "그게 무엇인지[어떻게 작동하는지] 설명해 주겠니?"],
 ["설명 요청하기", "Could you explain {in more detail}?", "좀 더 자세히 설명해 주겠니?"],
 ["설명 요청하기", "Can you {tell me more} about it?", "그것에 대해 더 말해 줄 수 있니?"],
 ["설명 요청하기", "{What do you mean} (by that)? / What does that {mean}?", "그게 무슨 말이야? / 그게 무슨 뜻이야?"],
 ["설명 요청하기", "I'd like to {know} what it means.", "그게 무슨 의미인지 알고 싶어."],
 ["가능성 정도 표현하기", "It is {likely} that + 주어 + 동사 ~.", "~할 가능성이 있다[~일 것 같다]."],
 ["가능성 정도 표현하기", "주어 + be {likely to} + 동사원형 ~.", "~할 가능성이 있다. (It is likely that ~과 같은 뜻)"],
 ["가능성 정도 표현하기", "It is {possible} that ~. / {Maybe} ~.", "~하는 것은 가능하다. / 아마도 ~."],
 ["가능성 정도 표현하기", "It is {unlikely} that ~.", "~할 가능성이 낮다. (보충)"],
 ["경험 묻기", "Have you {heard of} ~? — No, I {haven't}.", "~에 대해 들어 본 적 있니? — 아니, 들어 본 적 없어."],
 ["주의 끌기", "{You know what}?", "그거 알아?"],
 ["의견 묻기", "{What do you think of} ~?", "~에 대해 어떻게 생각하니?"],
]

stage3 = [
 ["D1", "It's an umbrella that gives you the weather forecast for the day.", "그것은 그날의 일기 예보를 제공하는 우산이야."],
 ["D2", "It senses the items inside it and suggests recipes.", "그 냉장고는 냉장고 내부의 물건들을 감지하고 요리법을 제안해."],
 ["D2", "This machine flies to a destination that we have already set.", "이 기기는 우리가 미리 설정해 둔 목적지로 날아가."],
 ["D3", "One is a robot arm controlled by his brain.", "한쪽 팔은 그의 뇌가 제어하는 로봇 팔이야."],
 ["D3", "Then those thoughts are turned into electronic signals.", "그런 다음 그 생각들이 전자 신호로 바뀌지."],
 ["D5", "Scientists are working on a project to send people to Mars.", "과학자들이 화성으로 사람들을 보내는 프로젝트에 착수 중이래."],
 ["D6", "For this reason, it is likely that we will have to change how we get our food.", "이러한 이유로, 우리는 식량을 얻는 방법을 바꿔야 할 가능성이 있다."],
 ["D6", "Instead, meat will be grown in a lab using animal cells.", "그 대신에, 동물 세포를 이용하여 실험실에서 고기가 배양될 것이다."],
 ["D7", "You take what you want to buy and just walk out.", "너는 사고 싶은 것을 가지고 그냥 걸어 나가면 돼."],
 ["D7", "It's likely that these kinds of stores will be more common in the future.", "미래에는 이런 종류의 매장을 더 흔히 볼 수 있을 것 같아."],
]

stage4 = ["D2", "D3", "D7", "D8"]

T, F = "T", "F"
stage5 = [
 # D1 (7)
 ["D1", "The boy has heard about smart umbrellas before.", F, "B 1: No, I haven't.", "반대 의미(경험 유무)"],
 ["D1", "The girl explains what a smart umbrella is because the boy asks her to.", T, "B 1 Could you explain what it is? → G 2 Sure. It's ~", "두 대사 종합"],
 ["D1", "A smart umbrella tells its user the weather forecast for the whole week.", F, "G 2: the weather forecast for the day", "범위 바꾸기(하루 ↔ 일주일)"],
 ["D1", "The umbrella gives a sound signal if rain is expected.", T, "G 2: If it is going to rain, the umbrella makes a sound.", "바꿔 말하기"],
 ["D1", "The umbrella opens by itself when it starts to rain.", F, "G 2: makes a sound (스스로 펴진다는 말 없음)", "범위 넘기기"],
 ["D1", "It is the girl who says the umbrella is very convenient.", F, "B 2: That's very convenient. (소년의 말)", "화자 바꾸기"],
 ["D1", "The boy thinks the smart umbrella would be useful.", T, "B 2: That's very convenient.", "바꿔 말하기(convenient → useful)"],
 # D2 (8)
 ["D2", "The two people are looking at the inventions of the year.", F, "G 1: the new inventions of the month", "시간 바꾸기(month ↔ year)"],
 ["D2", "The smart refrigerator can recommend recipes based on the items inside it.", T, "G 2: It senses the items inside it and suggests recipes.", "바꿔 말하기(suggest → recommend)"],
 ["D2", "The girl agrees with the boy that the refrigerator is helpful.", T, "B 2 That sounds helpful. → G 3 It does.", "지칭(It does = 유용하다)"],
 ["D2", "The boy wants to buy the flying camera.", F, "G 3: I want to buy it. (사고 싶은 사람은 소녀)", "화자 바꾸기"],
 ["D2", "The flying camera goes to a place that has been set in advance.", T, "G 4: flies to a destination that we have already set", "바꿔 말하기(능동 → 수동)"],
 ["D2", "The flying camera can take pictures only after it lands.", F, "G 4: While it's flying, it can take pictures", "시점 바꾸기 + 단정어(only)"],
 ["D2", "The flying camera takes pictures from 50 meters above the location.", F, "G 4: from 500 meters above the location", "숫자 바꾸기"],
 ["D2", "The boy asks how the camera works, and the girl explains it.", T, "B 3 Could you explain how it works? → G 4 설명", "두 대사 종합"],
 # D3 (7)
 ["D3", "The man on the show was born with only one arm.", F, "G 1: lost one of his arms in an accident", "원인 바꾸기"],
 ["D3", "Even though he lost an arm, the man is good at playing the drums.", T, "G 1: lost one of his arms ~ he can play the drums very well", "바꿔 말하기 + 두 문장 종합"],
 ["D3", "The man plays the drums with only one arm.", F, "G 2: Actually he uses two arms.", "부분 일치(B 2의 질문 ↔ G 2의 답)"],
 ["D3", "The man's thoughts are changed into electronic signals before the arm moves.", T, "G 3: those thoughts are turned into electronic signals ~ and move it", "순서·절차"],
 ["D3", "The signals travel from the robot arm to the man's brain.", F, "G 3: from his brain to his robot arm", "방향 뒤집기"],
 ["D3", "The boy believes this technology could be helpful to many people.", T, "B 4: I think this technology can help many people.", "바꿔 말하기"],
 ["D3", "It is the boy who is watching the show about the drummer.", F, "B 1: What are you watching? (프로를 보는 사람은 소녀)", "화자 바꾸기"],
 # D4 (6)
 ["D4", "B has known about the space balloon for a long time.", F, "B 1: I haven't heard of it before.", "반대 의미"],
 ["D4", "A finds the space balloon an interesting invention.", T, "A 1: The space balloon is an interesting invention.", "바꿔 말하기"],
 ["D4", "The space balloon can carry people all the way to the moon.", F, "A 2: take you near space", "과장"],
 ["D4", "B wants to know what the space balloon is.", T, "B 1: Could you explain what it is?", "표현 의도"],
 ["D4", "A asks B to explain the space balloon.", F, "B 1 (설명을 요청한 사람은 B)", "화자 바꾸기"],
 ["D4", "After hearing A's explanation, B thinks the space balloon is cool.", T, "A 2 설명 → B 2: That's cool.", "두 대사 종합"],
 # D5 (6)
 ["D5", "Scientists have already sent people to Mars.", F, "G 1: are working on a project to send people to Mars", "시제 바꾸기(진행 중 ↔ 완료)"],
 ["D5", "The girl tells the boy about a project scientists are doing now.", T, "G 1: Scientists are working on a project ~", "바꿔 말하기"],
 ["D5", "The boy thinks it is impossible for people to live in outer space soon.", F, "B 1: It is likely that we'll live in outer space in the near future.", "반대 의미"],
 ["D5", "The boy believes people may live in space before long.", T, "B 1: in the near future", "바꿔 말하기(near future = before long)"],
 ["D5", "It is the boy who first talks about the Mars project.", F, "G 1: You know what? Scientists ~ (먼저 꺼낸 사람은 소녀)", "화자 바꾸기"],
 ["D5", "Hearing about the project, the boy expects humans to live in space in the near future.", T, "G 1 프로젝트 → B 1 It is likely that ~", "두 대사 종합"],
 # D6 (8)
 ["D6", "Climate change is likely to make farming easier.", F, "M 1: make farming harder", "반대 의미"],
 ["D6", "There may not be enough resources because the population on Earth is growing.", T, "M 1: enough resources for the increasing number of people", "원인·결과(바꿔 말하기)"],
 ["D6", "The speaker says we will keep getting our food in the same way.", F, "M 2: we will have to change how we get our food", "반대 의미"],
 ["D6", "Instead of killing animals, we will grow meat in a lab with animal cells.", T, "M 3: we won't kill animals ~ Instead, meat will be grown in a lab using animal cells.", "두 문장 종합"],
 ["D6", "Growing meat in a lab will need more land and water.", F, "M 3: This will require less land, water, ~", "비교 뒤집기(less ↔ more)"],
 ["D6", "The speaker admits that some people may not want to eat bugs.", T, "M 4: You might not want to eat them", "표현 의도"],
 ["D6", "Bugs like ants have very few nutrients.", F, "M 4: they are actually very rich in nutrients", "반대 의미"],
 ["D6", "Lab-grown meat is the reason farming is becoming harder.", F, "M 1: As climate change ~ (농업이 어려워지는 원인은 기후 변화)", "원인·결과 뒤집기"],
 # D7 (8)
 ["D7", "The girl waited in line at the store for more than half an hour.", F, "G 1: for almost twenty minutes", "숫자 바꾸기"],
 ["D7", "The boy feels sorry about the girl's long wait.", T, "B 1: That's too bad.", "표현 의도"],
 ["D7", "The boy has visited a store without cashiers.", F, "B 2: I read about a store without cashiers. (읽었을 뿐)", "부분 일치(read ↔ visited)"],
 ["D7", "In the store the boy describes, customers don't need to stand in line to pay.", T, "B 1 never have to wait in line + B 2 take ~ and just walk out", "두 대사 종합"],
 ["D7", "Cashiers keep track of the items customers choose.", F, "B 3: cameras and sensors ~ keep track of the items", "주체 바꾸기"],
 ["D7", "Information about the chosen items is sent to an app on the customer's smartphone.", T, "B 3: send the information to an app on your smartphone", "바꿔 말하기(능동 → 수동)"],
 ["D7", "Customers pay with the app before they choose their items.", F, "G 4: the app pays for them when you leave the store", "순서 뒤집기"],
 ["D7", "The boy expects stores without cashiers to become more common.", T, "B 4: It's likely that these kinds of stores will be more common", "지칭(these kinds of stores) + 바꿔 말하기"],
 # D8 (6)
 ["D8", "A wants to know how our lives will change in the future.", T, "A 1: How will our lives change in the future?", "표현 의도"],
 ["D8", "B thinks restaurants will hardly change in the future.", F, "B 1: restaurants will change a lot", "반대 의미"],
 ["D8", "B says there will probably be 3D printed food in restaurants.", T, "B 2: It is likely that there will be 3D printed food", "바꿔 말하기(likely = probably)"],
 ["D8", "B is sure that every restaurant will serve only 3D printed food.", F, "B 2: It is likely ~ (가능성일 뿐, every·only 언급 없음)", "단정어·과장"],
 ["D8", "A thinks that restaurants will change a lot.", F, "B 1 (식당이 많이 바뀐다고 생각하는 사람은 B)", "화자 바꾸기"],
 ["D8", "A asks in what way B thinks restaurants will change.", T, "A 2: How do you think they will change? (they = restaurants)", "지칭"],
 # D9 (6)
 ["D9", "A asks B to explain what the painting shows.", T, "A 1: Could you explain what this painting shows?", "표현 의도"],
 ["D9", "According to B, the machine in the painting helps people with housework.", T, "B 1: a machine helping people clean their houses", "바꿔 말하기"],
 ["D9", "B painted the picture of the machine.", F, "A 1·B 1 (그린 사람 언급 없음)", "범위 넘기기"],
 ["D9", "B is completely sure about what the painting shows.", F, "B 1: I think ~ (자기 생각·추측)", "단정어(completely sure)"],
 ["D9", "It is A who explains the painting.", F, "B 1 (설명하는 사람은 B)", "화자 바꾸기"],
 ["D9", "B gives an opinion about the painting after A asks a question.", T, "A 1 질문 → B 1 I think ~", "두 대사 종합"],
 # D10 (6)
 ["D10", "In the speaker's opinion, the painting shows a cleaning machine for homes.", T, "S 1: I think it shows a machine helping people clean their houses.", "바꿔 말하기"],
 ["D10", "The machine in the painting looks completely different from today's robot vacuum cleaners.", F, "S 2: looks similar to today's robot vacuum cleaners", "반대 의미"],
 ["D10", "The speaker says the two machines have no differences at all.", F, "S 2: they have some differences", "반대 의미 + 단정어"],
 ["D10", "Unlike the machine in the painting, today's robot vacuum cleaners are controlled by humans.", F, "S 3: the machine in the painting is controlled by a human", "주체 바꾸기"],
 ["D10", "A person operates the machine in the painting.", T, "S 3: is controlled by a human", "바꿔 말하기(수동 → 능동)"],
 ["D10", "The speaker gives an example to show a difference between the two machines.", T, "S 2 some differences → S 3 For example, unlike ~", "두 문장 종합"],
]

stage5b = [
 {"d": "D1", "kind": "false", "q": "대화의 내용과 일치하지 않는 것을 모두 고르시오.", "opts": [
  ["The girl asks the boy if he knows about a smart umbrella.", True, "G 1"],
  ["The boy already knew what a smart umbrella was.", False, "B 1: No, I haven't."],
  ["The umbrella gives the weather forecast for the day.", True, "G 2"],
  ["The umbrella makes a sound when it is sunny.", False, "G 2: If it is going to rain"],
  ["The boy finds the umbrella convenient.", True, "B 2"]]},
 {"d": "D2", "kind": "cannot", "q": "대화를 읽고 대답할 수 없는 질문을 모두 고르시오.", "opts": [
  ["How much does the flying camera cost?", False, "가격 언급 없음"],
  ["What does the smart refrigerator suggest?", True, "recipes"],
  ["Where did the girl first see the flying camera?", False, "장소 언급 없음"],
  ["From how high can the flying camera take pictures?", True, "500 meters above the location"],
  ["How long can the flying camera stay in the air?", False, "비행 시간 언급 없음"]]},
 {"d": "D3", "kind": "count", "q": "대화의 내용과 일치하는 것의 개수는?", "opts": [
  ["The man lost an arm in an accident.", True, "G 1"],
  ["The man plays the drums with one arm.", False, "G 2: he uses two arms"],
  ["The robot arm is moved by signals from the man's brain.", True, "G 3"],
  ["The boy doesn't believe the girl's story.", False, "B 3·B 4: awesome, amazing"],
  ["The boy asks for more details about how the arm works.", True, "B 3"]]},
 {"d": "D4", "kind": "can", "q": "대화를 읽고 대답할 수 있는 질문을 모두 고르시오.", "opts": [
  ["Who invented the space balloon?", False, "발명가 언급 없음"],
  ["How much does a ride on the space balloon cost?", False, "가격 언급 없음"],
  ["How long does it take to reach near space?", False, "시간 언급 없음"],
  ["Where can the space balloon take people?", True, "near space"],
  ["How many people can ride the space balloon?", False, "인원 언급 없음"]]},
 {"d": "D5", "kind": "true", "q": "대화의 내용과 일치하는 것을 모두 고르시오.", "opts": [
  ["Scientists are working on a Mars project now.", True, "G 1"],
  ["People are already living on Mars.", False, "G 1: a project to send people"],
  ["The boy doesn't believe people will live in space.", False, "B 1: It is likely ~"],
  ["The girl gets the boy's attention before sharing the news.", True, "G 1: You know what?"],
  ["The project is to send robots to Mars.", False, "G 1: to send people"]]},
 {"d": "D6", "kind": "false", "q": "글의 내용과 일치하지 않는 것을 모두 고르시오.", "opts": [
  ["Climate change will make farming easier.", False, "M 1: harder"],
  ["The number of people on Earth will decrease.", False, "M 1: the increasing number of people"],
  ["Meat may be grown in a lab with animal cells.", True, "M 3"],
  ["Lab-grown meat will require more resources.", False, "M 3: less land, water, and other resources"],
  ["Bugs have few nutrients.", False, "M 4: very rich in nutrients"]]},
 {"d": "D7", "kind": "cannot", "q": "대화를 읽고 대답할 수 없는 질문을 모두 고르시오.", "opts": [
  ["How long did the girl wait in line?", True, "almost twenty minutes"],
  ["What did the girl buy at the store?", False, "산 물건 언급 없음"],
  ["What keeps track of the items customers choose?", True, "cameras and sensors"],
  ["When does the app pay for the items?", True, "when you leave the store"],
  ["Where did the boy read about the store?", False, "읽은 곳 언급 없음"]]},
 {"d": "D8", "kind": "count", "q": "대화의 내용과 일치하는 것의 개수는?", "opts": [
  ["B thinks restaurants will change a lot.", True, "B 1"],
  ["A explains how restaurants will change.", False, "설명하는 사람은 B"],
  ["B is certain that all food will be 3D printed.", False, "B 2: It is likely ~ in restaurants"],
  ["B thinks there will likely be 3D printed food in restaurants.", True, "B 2"],
  ["A and B are eating at a restaurant now.", False, "언급 없음"]]},
 {"d": "D9", "kind": "can", "q": "대화를 읽고 대답할 수 있는 질문을 모두 고르시오.", "opts": [
  ["What does A want B to explain?", True, "what this painting shows"],
  ["Who painted the picture?", False, "화가 언급 없음"],
  ["What does B think the machine helps people do?", True, "clean their houses"],
  ["What does the painting show, according to B?", True, "a machine helping people clean their houses"],
  ["When was the painting made?", False, "시기 언급 없음"]]},
 {"d": "D10", "kind": "true", "q": "글의 내용과 일치하는 것을 모두 고르시오.", "opts": [
  ["The machine in the painting looks nothing like today's robot vacuum cleaners.", False, "S 2: looks similar to"],
  ["The speaker compares the machine with today's robot vacuum cleaners.", True, "S 2·S 3"],
  ["The speaker thinks the machine helps people clean their houses.", True, "S 1"],
  ["Today's robot vacuum cleaners are controlled by humans.", False, "S 3: 사람이 조종하는 것은 그림 속 기계"],
  ["A human controls the machine in the painting.", True, "S 3"]]},
]

stage6 = [
 {"d": "D1", "ans": "Where did the girl learn about the smart umbrella?", "trap": "범위 넘기기(정보 출처)", "why": "스마트 우산이 무엇인지는 나오지만 소녀가 어디서 알게 되었는지는 언급되지 않음",
  "ok": [["Did the boy know about the smart umbrella before?", "No, he didn't.", "B 1"],
         ["What does the smart umbrella tell its user?", "The weather forecast for the day.", "G 2"],
         ["What happens when rain is expected?", "The umbrella makes a sound.", "G 2"],
         ["What does the boy think of the umbrella after the girl's explanation?", "He thinks it's very convenient.", "G 2 + B 2"]]},
 {"d": "D2", "ans": "Why does the girl want to take pictures of flying birds?", "trap": "이유↔결과 바꾸기", "why": "날고 있는 새를 찍고 싶다는 것은 나오지만 그 이유는 언급되지 않음",
  "ok": [["What can the smart refrigerator do?", "It senses the items inside it and suggests recipes.", "G 2"],
         ["Which invention does the girl want to buy?", "The flying camera.", "G 3"],
         ["Where does the flying camera fly to?", "To a destination that has already been set.", "G 4"],
         ["How does the boy feel about the camera after hearing how it works?", "He thinks it sounds awesome.", "G 4 + B 4"]]},
 {"d": "D3", "ans": "When did the man lose one of his arms?", "trap": "속성 바꾸기(원인 → 시점)", "why": "사고로 팔을 잃었다는 것은 나오지만 언제 잃었는지는 언급되지 않음",
  "ok": [["How did the man lose one of his arms?", "In an accident.", "G 1"],
         ["What instrument can the man play well?", "The drums.", "G 1"],
         ["What controls the man's robot arm?", "His brain.", "G 2"],
         ["What are the man's thoughts turned into?", "Electronic signals.", "G 3"]]},
 {"d": "D4", "ans": "Who invented the space balloon?", "trap": "범위 넘기기(발명가)", "why": "우주 풍선이 무엇인지는 나오지만 누가 발명했는지는 언급되지 않음",
  "ok": [["What does A think of the space balloon?", "It's an interesting invention.", "A 1"],
         ["Had B heard of the space balloon before?", "No, he hadn't.", "B 1"],
         ["What can the space balloon do?", "It can take people near space.", "A 2"],
         ["How does B react to A's explanation?", "B thinks it's cool.", "A 2 + B 2"]]},
 {"d": "D5", "ans": "When will scientists send people to Mars?", "trap": "시제 바꾸기(진행 중 → 실행 시점)", "why": "화성에 사람을 보내는 프로젝트를 진행 중이라는 것은 나오지만 언제 보낼지는 언급되지 않음",
  "ok": [["What are scientists working on?", "A project to send people to Mars.", "G 1"],
         ["Where does the boy think we'll live in the near future?", "In outer space.", "B 1"],
         ["Who tells the other person about the project?", "The girl.", "G 1"],
         ["Why does the boy think people will live in space soon?", "Because scientists are working on a project to send people to Mars.", "G 1 + B 1"]]},
 {"d": "D6", "ans": "How many people will live on Earth in the future?", "trap": "속성 바꾸기(증가 → 정확한 수)", "why": "인구가 늘어난다는 것은 나오지만 구체적인 인구 수는 언급되지 않음",
  "ok": [["Why is farming going to become harder?", "Because of climate change.", "M 1"],
         ["What will be used to grow meat in a lab?", "Animal cells.", "M 3"],
         ["Why is growing meat in a lab helpful?", "It will require less land, water, and other resources.", "M 3"],
         ["Why are bugs worth eating even if we don't want to?", "Because they are very rich in nutrients.", "M 4"]]},
 {"d": "D7", "ans": "Why did the girl have to wait so long at the store?", "trap": "이유↔결과 바꾸기", "why": "거의 20분 줄을 서서 기다렸다는 것은 나오지만 왜 오래 기다려야 했는지는 언급되지 않음",
  "ok": [["How long did the girl wait in line?", "For almost twenty minutes.", "G 1"],
         ["What did the boy read about?", "A store without cashiers.", "B 2"],
         ["What do the cameras and sensors in the store do?", "They keep track of the items you choose and send the information to an app.", "B 3"],
         ["When does the app pay for the items?", "When you leave the store.", "G 4 + B 4"]]},
 {"d": "D8", "ans": "How does A think restaurants will change?", "trap": "화자 바꾸기(B → A)", "why": "B의 생각(3D 프린터 음식)은 나오지만 A가 어떻게 생각하는지는 언급되지 않음",
  "ok": [["What does A want to know first?", "How our lives will change in the future.", "A 1"],
         ["What place does B think will change a lot?", "Restaurants.", "B 1"],
         ["What does 'they' refer to in A's second question?", "Restaurants.", "B 1 + A 2"],
         ["What does B expect to see in restaurants?", "3D printed food.", "B 2"]]},
 {"d": "D9", "ans": "When was the painting made?", "trap": "속성 바꾸기(내용 → 제작 시기)", "why": "그림이 무엇을 나타내는지는 나오지만 언제 그려졌는지는 언급되지 않음",
  "ok": [["What does A ask B to do?", "To explain what the painting shows.", "A 1"],
         ["What does B think the painting shows?", "A machine helping people clean their houses.", "B 1"],
         ["What does the machine in the painting help people do?", "Clean their houses.", "B 1"],
         ["Is B completely sure about the painting?", "No, B only says what B thinks.", "B 1 (I think)"]]},
 {"d": "D10", "ans": "Why did the artist draw the cleaning machine?", "trap": "이유↔결과 바꾸기", "why": "그림 속 기계가 무엇이고 어떻게 다른지는 나오지만 화가가 왜 그렸는지는 언급되지 않음",
  "ok": [["What does the speaker think the painting shows?", "A machine helping people clean their houses.", "S 1"],
         ["What does the machine look similar to?", "Today's robot vacuum cleaners.", "S 2"],
         ["Are the machine and today's robot vacuum cleaners exactly the same?", "No, they have some differences.", "S 2"],
         ["Who controls the machine in the painting?", "A human.", "S 3"]]},
]

def fix(o):
    if isinstance(o, str): return q(o)
    if isinstance(o, list): return [fix(x) for x in o]
    if isinstance(o, dict): return {k: fix(v) for k, v in o.items()}
    return o

out = fix({"dialogues": dialogues, "expressions": expressions, "stage3": stage3, "stage4": stage4,
           "stage5": stage5, "stage5b": stage5b, "stage6": stage6})
json.dump(out, open(os.path.join(HERE, "nk7_dlg.json"), "w"), ensure_ascii=False, indent=1)

anchors = fix({
 "D1-1": "heard of", "D1-2": "Could you explain", "D1-3": "what it is", "D1-4": "an umbrella that", "D1-5": "If",
 "D2-1": ["look great", "sounds helpful", "sounds awesome"], "D2-2": "suggests recipes", "D2-3": "What do you think of",
 "D2-4": "how it works", "D2-5": "destination that", "D2-6": "While", "D2-7": ["want to take pictures of", "I want to take pictures of"],
 "D3-1": "a man who", "D3-2": "controlled by his brain", "D3-3": "in more detail", "D3-4": "what he wants to do",
 "D3-5": "are turned into", "D3-6": "and move it",
 "D4-1": "heard of it before", "D4-2": "what it is", "D4-3": "a balloon that", "D4-4": "That's cool",
 "D5-1": "You know what?", "D5-2": "are working on", "D5-3": "to send", "D5-4": "It is likely that", "D5-5": "near future",
 "D6-1": "As", "D6-2": "make farming harder", "D6-3": "there may not be", "D6-4": "it is likely that", "D6-5": "how we get our food",
 "D6-6": "will be grown", "D6-7": "using animal cells", "D6-8": "such as", "D6-9": "rich in nutrients",
 "D7-1": "wait in line", "D7-2": "almost twenty minutes", "D7-3": "never have to", "D7-4": "What do you mean?",
 "D7-5": "what you want to buy", "D7-6": "just walk out", "D7-7": "There are", "D7-8": "keep track of", "D7-9": "the items you choose",
 "D7-10": "It's likely that",
 "D8-1": "How will our lives change", "D8-2": "I think that", "D8-3": "How do you think", "D8-4": "It is likely that", "D8-5": "3D printed food",
 "D9-1": "what this painting shows", "D9-2": "a machine helping", "D9-3": "people clean",
 "D10-1": "What do you think this painting shows?", "D10-2": "helping people clean", "D10-3": "looks similar to", "D10-4": "unlike",
 "D10-5": "is controlled by a human",
})
cfg = {"dlg": "nk7/nk7_dlg.json", "lesson": "7", "outDir": "out/능률김/7과/01. 대화", "term": "2026 · 2학기 기말고사 대비",
 "schools": "대지중 · 어정중 3학년", "schoolsShort": "대지·어정중 3학년", "book": "중3 NE능률(김성곤) Lesson 7  Future Changes through Technology",
 "pubShort": "능률김", "lessonTitle": "Future Changes through Technology", "s6answers": [4, 1, 5, 2, 3, 1, 4, 2, 5, 3], "anchors": anchors}
json.dump(cfg, open(os.path.join(HERE, "nk7_dcfg.json"), "w"), ensure_ascii=False)
print(len(stage5), {d["id"]: sum(1 for x in stage5 if x[0] == d["id"]) for d in dialogues})
print("T ratio", sum(1 for x in stage5 if x[2] == T) / len(stage5))
