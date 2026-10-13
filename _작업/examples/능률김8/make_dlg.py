import json, os
HERE = os.path.dirname(os.path.abspath(__file__))
A = "’"
def q(s): return s.replace("'", A)

# NE능률(김성곤) 8과 Which Is the Best Way? — Read On 단원(Listen & Talk 없음)
# 대화 파트 = 단원 안의 대화 형식 지문 4개: Before You Read B(e.g.) · After You Read B(내신기출 EXTRA READING 출제) · Project Work 1 Scene 2(e.g.) · Scene 5(추가 예시 답안)
# D1 마지막 줄 'Because ...'는 교과서에 비어 있음 → 예시 답안(자체 제작)으로 채움
# 제외: Before You Read A(낱말 예문) · After You Read A(듣기 스크립트, 본문 대사 반복) · C(요약 빈칸) · Project Work 2·3(대화 아님)
dialogues = [
 {"id": "D1", "label": "Before You Read · B (e.g.)", "lines": [
  ["A", "What will {happen to} the five men?", "다섯 남자에게 무슨 일이 일어날까?"],
  ["B", "{I think that} they will {get lost} in the forest.", "내 생각엔 그들이 숲에서 길을 잃게 될 것 같아."],
  ["A", "{Why do you think so}?", "왜 그렇게 생각해?"],
  ["B", "Because the forest in the picture {looks} very {thick}.", "왜냐하면 그림 속의 숲이 매우 울창해 보이기 때문이야. (예시 답안)"]],
  "notes": [
  "happen to + 사람 : ‘~에게 (어떤 일이) {일어나다}’ — What will happen to ~? = 앞으로 일어날 일을 {추측}해 보라는 질문",
  "I think that + 주어 + 동사 : 의견·추측 말하기 — that은 {생략} 가능 / 미래의 일이므로 {will} get lost",
  "get lost : ‘{길을 잃다}’ = become lost(본문 they became lost in a thick forest) — get + 형용사(과거분사) ‘~하게 되다’",
  "Why do you think so? : 상대 의견의 {이유}를 묻는 말 — so = they will get lost in the forest / 대답은 {Because} + 주어 + 동사",
  "look + 형용사 : ‘~해 {보이다}’ (looks thickly ✗) — 교과서는 ‘Because ...’로 비워 둔 칸 → 예시 답안(자체 제작) · thick ‘(나무가) 울창한’"]},
 {"id": "D2", "label": "After You Read · B (내신기출 EXTRA READING)", "lines": [
  ["Teacher", "{What did you think of} the story?", "이 이야기에 대해 어떻게 생각했나요?"],
  ["Jiho", "It was {interesting}. {At first}, I thought {only} the fifth man was really wise. But all five men were {actually} wise.", "흥미로웠어요. 처음엔, 전 다섯 번째 남자만 정말 지혜롭다고 생각했어요. 하지만 사실은 다섯 남자 모두 지혜로웠어요."],
  ["Mina", "Right. They all found {their own paths}. We can't say {who is the wisest} because each man {created} his own future.", "맞아요. 그들은 모두 자기만의 길을 찾았어요. 우리는 누가 가장 지혜로운지 말할 수 없는데 그 이유는 각 남자가 자신만의 미래를 만들었기 때문이에요."],
  ["Dongwoo", "Yes. It was especially {moving} that they tried to {learn from} each other. {That's how} they found the quickest way to their {destination}.", "그래요. 그들이 서로에게서 배우려고 노력하는 것이 특히 감동적이었어요. 그런 식으로 그들은 목적지에 가는 가장 빠른 길을 찾았어요."],
  ["Euna", "Like them, we have to create our own paths. {To do that}, we need to {listen to ourselves}, {make a decision}, and {act on} it.", "그들처럼, 우리는 우리만의 길을 만들어 가야 해요. 그렇게 하기 위해 우리는 우리 자신의 목소리를 듣고, 결정하고, 그 결정에 따라 행동해야 해요."]],
  "notes": [
  "What did you think of ~? : ‘~에 대해 어떻게 생각했나요?’ — 의견을 묻는 말 = How did you {like} ~?",
  "At first ~ But … : ‘{처음에는} ~라고 생각했지만 (사실은) …’ — only the fifth man → all five men (지호의 생각이 바뀜)",
  "We can't say who is the wisest : 간접의문문 — 의문사 who가 {주어}라서 who + 동사 / the wisest = wise의 {최상급}",
  "It was especially moving that ~ : It = {가주어}, that절 = 진주어 / moving ‘{감동적인}’(moved ✗ — 감동받은) ※ 서로에게서 배웠다는 내용은 본문에 없음 → 본문을 잘못 이해한 학생 = {Dongwoo}",
  "That's how + 주어 + 동사 : ‘그런 식으로[그렇게 해서] ~했다’(방법) — That's {why} ~(그래서 ~하다 · 결과)와 구별 (기출 변형)",
  "To do that : to부정사의 {부사적} 용법(목적) ‘그렇게 하기 위해’ — that = create our own paths (기출 98번: He hurried down to tell the others.와 쓰임이 같음)",
  "need to A, B, and C : 동사원형 3개 {병렬} — listen to ourselves(재귀대명사 · us ✗) · make a decision · act on it (기출 99번 13단어 영작)"]},
 {"id": "D3", "label": "Project Work 1 · 영어 연극하기 Scene 2 (e.g.)", "lines": [
  ["Storyteller", "{After thinking} {for a while}, they {started telling} the others {what their decisions were}.", "잠시 동안 생각하고 나서, 그들은 다른 사람들에게 자신의 결정이 무엇인지 말하기 시작했어요."],
  ["Actor 1", "I {strongly} feel that we should {go left}.", "저는 우리가 왼쪽으로 가야 한다는 생각이 강하게 드는군요."],
  ["Actor 2", "We should go right, {because} right also means “{correct}.”", "우리는 오른쪽으로 가야 합니다. 왜냐하면 ‘오른쪽’은 또한 ‘옳은’을 의미하기 때문이죠."]],
  "notes": [
  "After + {동명사} : 전치사 After 뒤에는 명사·동명사 — After thinking = After they {thought}",
  "for a while : ‘{잠시 동안}’ (본문 After thinking for a while, the first man said ~)",
  "start + -ing / to부정사 : ‘~하기 시작하다’ — started telling = started {to tell}",
  "tell + 간접목적어(the others) + 직접목적어(what their decisions were) : 간접의문문 = 의문사 + {주어} + 동사 (what were their decisions ✗)",
  "I strongly feel that ~ : ‘~라는 생각이 {강하게} 든다’ — 강한 의견 말하기(that 생략 가능)",
  "because + 주어 + 동사 : 이유 (because of ✗ — 뒤에 절) / right = ‘오른쪽’ + ‘{옳은}’(= correct) 두 가지 뜻"]},
 {"id": "D4", "label": "Project Work 1 · 영어 연극하기 Scene 5 (추가 예시)", "lines": [
  ["Storyteller", "The man {who went to the right} met {a group of thieves}. {While} he was with them, he {showed them great kindness}.", "오른쪽으로 간 남자는 한 무리의 도둑을 만났어요. 그는 그들과 함께 있는 동안 그들에게 큰 친절을 베풀었죠."],
  ["Actor 1", "Oh, he is really kind. {I'm so moved}. And he is very wise, {isn't he}?", "오, 그는 정말 친절해. 난 정말 감동받았어. 그리고 그는 정말 지혜로워, 그렇지 않니?"],
  ["Actor 2", "Hey, {why don't we} ask him {to teach} us?", "얘들아, 우리 그에게 우리를 가르쳐 달라고 부탁해 보는 게 어때?"],
  ["Actor 3", "{That's a good idea}. He will teach us {what we need to know} in life.", "좋은 생각이야. 그는 우리가 삶에서 알아야 할 것을 가르쳐 줄 거야."],
  ["Actor 1", "That's true. We need to {learn from} him. Let's go and talk to him!", "맞아. 우리는 그에게서 배워야 해. 가서 그에게 이야기해 보자!"],
  ["Storyteller", "The thieves went to the wise man and learned from his {wisdom}. {In the end}, they all became wise men.", "도둑들은 그 지혜로운 남자에게 가서 그의 지혜로부터 교훈을 얻었어요. 마침내 그들은 모두 지혜로운 사람이 되었답니다."]],
  "notes": [
  "주격 관계대명사 {who} : The man who went to the right(주어) + met(동사) — who = {that} (본문 문단 그대로)",
  "While + 주어 + 동사 : ‘~하는 {동안}’ (During ✗ — During 뒤에는 명사)",
  "show + 간접목적어(them) + 직접목적어(great kindness) = show great kindness {to} them",
  "I'm so moved : ‘나는 정말 {감동받았어}’ — 감정을 느끼는 사람이 주어 → 과거분사 moved (moving ✗)",
  "부가의문문 isn't he? : 긍정문(he is) → {부정} 부가의문문 + 대명사 주어 he",
  "Why don't we + 동사원형 ~? : ‘우리 ~하는 게 어때?’(제안하기) = {Let's} ~ / How about -ing ~?",
  "ask + 목적어 + {to부정사} : ‘~에게 …해 달라고 부탁하다’ (ask him teach ✗)",
  "관계대명사 what : ‘~하는 {것}’(= the thing which[that]) — what we need to know가 teach의 직접목적어",
  "In the end : ‘{결국}, 마침내’ / learn from ~ : ‘~에게서 배우다’ → 도둑들도 지혜로운 사람이 됨(본문 Later, they also became wise men.)"]},
]

expressions = [
 ["추측·의견 말하기", "{I think that} ~. / I strongly feel that ~.", "내 생각엔 ~인 것 같아. / ~라는 생각이 강하게 들어."],
 ["이유 묻기", "{Why} do you think so?", "왜 그렇게 생각해?"],
 ["이유 말하기", "{Because} + 주어 + 동사 ~.", "왜냐하면 ~이기 때문이야."],
 ["의견 묻기", "What did you {think} of ~? / How did you like ~?", "~에 대해 어떻게 생각했니?"],
 ["평가하기", "It was {interesting}. / It was especially moving that ~.", "흥미로웠어. / ~이 특히 감동적이었어."],
 ["동의하기", "{Right}. / Yes. / That's true.", "맞아. / 그래. / 맞는 말이야."],
 ["제안하기", "{Why} don't we ~? / Let's ~.", "우리 ~하는 게 어때? / ~하자."],
 ["제안에 답하기", "That's a good {idea}.", "좋은 생각이야."],
 ["감정 표현하기", "I'm so {moved}.", "정말 감동받았어."],
 ["확인하기(부가의문문)", "He is very wise, {isn't} he?", "그는 정말 지혜로워, 그렇지 않니?"],
]

stage3 = [
 ["D1", "I think that they will get lost in the forest.", "내 생각엔 그들이 숲에서 길을 잃게 될 것 같아."],
 ["D2", "We can't say who is the wisest because each man created his own future.", "우리는 누가 가장 지혜로운지 말할 수 없는데 그 이유는 각 남자가 자신만의 미래를 만들었기 때문이에요."],
 ["D2", "It was especially moving that they tried to learn from each other.", "그들이 서로에게서 배우려고 노력하는 것이 특히 감동적이었어요."],
 ["D2", "To do that, we need to listen to ourselves, make a decision, and act on it.", "그렇게 하기 위해 우리는 우리 자신의 목소리를 듣고, 결정하고, 그 결정에 따라 행동해야 해요."],
 ["D3", "After thinking for a while, they started telling the others what their decisions were.", "잠시 동안 생각하고 나서, 그들은 다른 사람들에게 자신의 결정이 무엇인지 말하기 시작했어요."],
 ["D4", "While he was with them, he showed them great kindness.", "그는 그들과 함께 있는 동안 그들에게 큰 친절을 베풀었죠."],
 ["D4", "Why don't we ask him to teach us?", "우리 그에게 우리를 가르쳐 달라고 부탁해 보는 게 어때?"],
 ["D4", "He will teach us what we need to know in life.", "그는 우리가 삶에서 알아야 할 것을 가르쳐 줄 거야."],
]

stage4 = ["D4", "D2", "D1"]

T, F = "T", "F"
stage5 = [
 # D1 (7)
 ["D1", "A asks B to guess what will happen to the five men.", T, "A 1: What will happen to the five men?", "표현 의도(추측 묻기)"],
 ["D1", "B is sure that the five men will find the way out of the forest.", F, "B 1: I think that they will get lost in the forest.", "반대 의미 + 확신 정도"],
 ["D1", "B thinks the five men will get lost in the forest.", T, "B 1", "바꿔 말하기"],
 ["D1", "It is B who asks for the reason for the other's guess.", F, "A 2: Why do you think so? (이유를 묻는 사람은 A)", "화자 바꾸기"],
 ["D1", "B's reason is based on how the forest looks in the picture.", T, "B 2: Because the forest in the picture looks very thick.", "바꿔 말하기"],
 ["D1", "B says that the five men got lost before they met.", F, "B 1: they will get lost (앞으로 일어날 일 추측)", "시제 바꾸기"],
 ["D1", "According to B, the forest in the picture doesn't have many trees.", F, "B 2: looks very thick (울창한)", "반대 의미(thick ↔ 나무가 적은)"],
 # D2 (8)
 ["D2", "The teacher asks the students for their opinions about the story.", T, "Teacher: What did you think of the story?", "표현 의도(의견 묻기)"],
 ["D2", "Jiho thought all five men were wise from the beginning.", F, "Jiho: At first, I thought only the fifth man was really wise.", "시점 바꾸기(At first)"],
 ["D2", "Jiho changed his mind about which men were wise.", T, "Jiho: At first ~ But all five men were actually wise.", "두 문장 종합"],
 ["D2", "Mina says the fifth man is the wisest of the five.", F, "Mina: We can't say who is the wisest", "단정 바꾸기"],
 ["D2", "According to Mina, each man created his own future.", T, "Mina: each man created his own future", "바꿔 말하기"],
 ["D2", "Dongwoo understood the story correctly.", F, "Dongwoo: they tried to learn from each other — 본문에 없는 내용(잘못 이해한 학생)", "본문 대조(오해한 학생 · 교과서 정답)"],
 ["D2", "Euna thinks we need to listen to ourselves to create our own paths.", T, "Euna: To do that, we need to listen to ourselves", "바꿔 말하기(To do that = to create our own paths)"],
 ["D2", "Euna says we should follow other people's decisions.", F, "Euna: listen to ourselves, make a decision, and act on it", "반대 의미"],
 # D3 (6)
 ["D3", "The men thought for a while before telling their decisions.", T, "Storyteller: After thinking for a while, they started telling ~", "순서"],
 ["D3", "The men told the others their decisions first and then thought about them.", F, "Storyteller: After thinking for a while ~", "순서 뒤집기"],
 ["D3", "Actor 1 strongly feels that they should go left.", T, "Actor 1: I strongly feel that we should go left.", "바꿔 말하기"],
 ["D3", "Actor 2 agrees with Actor 1 about going left.", F, "Actor 2: We should go right", "반대 의미"],
 ["D3", "Actor 2 chooses the right because the word “right” also means “correct.”", T, "Actor 2: because right also means “correct.”", "이유"],
 ["D3", "Actor 1 explains why they should go left.", F, "Actor 1: 의견만 말하고 이유는 없음", "범위 넘기기"],
 # D4 (8)
 ["D4", "The man who went to the right met a group of thieves.", T, "Storyteller 1", "바꿔 말하기"],
 ["D4", "The thieves showed the man great kindness.", F, "Storyteller 1: he showed them great kindness (친절을 베푼 사람은 남자)", "주체 바꾸기"],
 ["D4", "Actor 1 is moved by the man's kindness.", T, "Actor 1: Oh, he is really kind. I'm so moved.", "바꿔 말하기"],
 ["D4", "Actor 2 suggests that they should teach the man.", F, "Actor 2: why don't we ask him to teach us? (가르쳐 달라고 부탁)", "주체 바꾸기(teach ↔ be taught)"],
 ["D4", "Actor 3 agrees with Actor 2's suggestion.", T, "Actor 3: That's a good idea.", "표현 의도(동의)"],
 ["D4", "Actor 3 thinks the man will teach them how to steal.", F, "Actor 3: what we need to know in life", "속성 바꾸기"],
 ["D4", "Actor 1 wants to go and talk to the man.", T, "Actor 1: Let's go and talk to him!", "바꿔 말하기"],
 ["D4", "Only some of the thieves became wise men in the end.", F, "Storyteller 2: they all became wise men", "단정어(only some ↔ all)"],
]

stage5b = [
 {"d": "D1", "kind": "cannot", "q": "대화를 읽고 대답할 수 없는 질문을 모두 고르시오.", "opts": [
  ["What does B think will happen to the five men?", True, "B 1: they will get lost in the forest"],
  ["How many men are there in the story?", True, "A 1: the five men"],
  ["Where did the five men meet?", False, "만난 장소 언급 없음 [범위 넘기기]"],
  ["Why does B think so?", True, "B 2: the forest looks very thick"],
  ["Who will find the way out of the forest first?", False, "언급 없음 [범위 넘기기]"]]},
 {"d": "D2", "kind": "false", "q": "대화의 내용과 일치하지 않는 것을 모두 고르시오.", "opts": [
  ["At first, Jiho thought only the fifth man was wise.", True, "Jiho"],
  ["Mina can tell who is the wisest of the five men.", False, "Mina: We can't say who is the wisest"],
  ["Dongwoo found something in the story moving.", True, "Dongwoo: It was especially moving"],
  ["Euna says we have to create our own paths.", True, "Euna"],
  ["The teacher tells the students that the story is boring.", False, "선생님은 의견을 묻기만 함"]]},
 {"d": "D3", "kind": "can", "q": "대화를 읽고 대답할 수 있는 질문을 모두 고르시오.", "opts": [
  ["What did the men do before telling their decisions?", True, "thought for a while"],
  ["Which way did the storyteller choose?", False, "언급 없음 [인물 바꾸기]"],
  ["Which way does Actor 1 want to go?", True, "left"],
  ["What else does “right” mean according to Actor 2?", True, "correct"],
  ["Exactly how many minutes did the men think?", False, "for a while — 정확한 시간 없음 [숫자 넘기기]"]]},
 {"d": "D4", "kind": "true", "q": "대화의 내용과 일치하는 것을 모두 고르시오.", "opts": [
  ["Actor 1 thinks the man is kind and wise.", True, "Actor 1"],
  ["Actor 2 wants to teach the man.", False, "Actor 2: ask him to teach us (가르쳐 달라고 부탁)"],
  ["Actor 3 agrees with Actor 2's idea.", True, "Actor 3: That's a good idea."],
  ["The thieves decided not to talk to the man.", False, "Actor 1: Let's go and talk to him!"],
  ["All the thieves became wise men in the end.", True, "Storyteller 2"]]},
]

stage6 = [
 {"d": "D1", "ans": "What do the five men decide to do in the forest?", "trap": "범위 넘기기(결정 내용)", "why": "다섯 남자에게 일어날 일을 추측할 뿐 숲에서 무엇을 결정하는지는 대화에 나오지 않음",
  "ok": [["What does A ask B first?", "What will happen to the five men.", "1"],
         ["What does B think will happen to the five men?", "They will get lost in the forest.", "2"],
         ["What does A want to know after B's guess?", "Why B thinks so.", "3"],
         ["Why does B think so?", "Because the forest in the picture looks very thick.", "4"]]},
 {"d": "D2", "ans": "Which man does Euna think is the wisest?", "trap": "인물 바꾸기 + 범위 넘기기", "why": "Euna는 우리도 자신만의 길을 만들어야 한다고만 말함 — 누가 가장 지혜로운지는 말할 수 없다고 한 사람은 Mina",
  "ok": [["What did Jiho think at first?", "Only the fifth man was really wise.", "2"],
         ["Why can't Mina say who is the wisest?", "Because each man created his own future.", "3"],
         ["What did Dongwoo find especially moving?", "That they tried to learn from each other.", "4"],
         ["What do we need to do to create our own paths, according to Euna?", "Listen to ourselves, make a decision, and act on it.", "5"]]},
 {"d": "D3", "ans": "Which way does the third man want to go?", "trap": "인물 넘기기", "why": "Scene 2에는 왼쪽(Actor 1)·오른쪽(Actor 2) 두 사람의 결정만 나옴 — 세 번째 남자는 등장하지 않음",
  "ok": [["How long did the men think before telling their decisions?", "For a while.", "1"],
         ["What did the men start to tell the others?", "What their decisions were.", "1"],
         ["Which way does Actor 1 feel they should go?", "Left.", "2"],
         ["Why does Actor 2 want to go right?", "Because right also means “correct.”", "3"]]},
 {"d": "D4", "ans": "How many thieves were in the group?", "trap": "숫자 넘기기", "why": "a group of thieves(한 무리의 도둑)라고만 나오고 몇 명인지는 언급되지 않음",
  "ok": [["What did the man show the thieves?", "Great kindness.", "1"],
         ["How does Actor 1 feel about the man's kindness?", "He is so moved.", "2"],
         ["What does Actor 2 suggest?", "Asking the man to teach them.", "3"],
         ["What did the thieves become in the end?", "Wise men.", "6"]]},
]

def fix(o):
    if isinstance(o, str): return q(o)
    if isinstance(o, list): return [fix(x) for x in o]
    if isinstance(o, dict): return {k: fix(v) for k, v in o.items()}
    return o

out = fix({"dialogues": dialogues, "expressions": expressions, "stage3": stage3, "stage4": stage4,
           "stage5": stage5, "stage5b": stage5b, "stage6": stage6})
json.dump(out, open(os.path.join(HERE, "nk8_dlg.json"), "w"), ensure_ascii=False, indent=1)

anchors = fix({
 "D1-1": "happen to", "D1-2": "I think that", "D1-3": "get lost", "D1-4": "Why do you think so?", "D1-5": "looks very thick",
 "D2-1": "What did you think of", "D2-2": "At first", "D2-3": "who is the wisest", "D2-4": "especially moving", "D2-5": "That's how",
 "D2-6": "To do that", "D2-7": "act on it",
 "D3-1": "After thinking", "D3-2": "for a while", "D3-3": "started telling", "D3-4": "what their decisions were", "D3-5": "strongly feel", "D3-6": "because right",
 "D4-1": "who went to the right", "D4-2": "While he was", "D4-3": "showed them great kindness", "D4-4": "I'm so moved", "D4-5": "isn't he",
 "D4-6": "why don't we", "D4-7": "to teach", "D4-8": "what we need to know", "D4-9": "In the end",
})
cfg = {"dlg": "nk8/dlg/nk8_dlg.json", "lesson": "8", "outDir": "out/능률김/8과/01. 대화", "term": "2026 · 2학기 기말고사 대비",
 "schools": "대지중 · 어정중 3학년", "schoolsShort": "대지·어정중 3학년", "book": "중3 NE능률(김성곤) Lesson 8  Which Is the Best Way?",
 "pubShort": "능률김", "lessonTitle": "Which Is the Best Way?", "dlgLabel": "Read On 대화 지문", "s6answers": [3, 5, 1, 4], "anchors": anchors}
json.dump(cfg, open(os.path.join(HERE, "nk8_dcfg.json"), "w"), ensure_ascii=False)
print(len(stage5), {d["id"]: sum(1 for x in stage5 if x[0] == d["id"]) for d in dialogues})
print("T ratio", sum(1 for x in stage5 if x[2] == T) / len(stage5))
