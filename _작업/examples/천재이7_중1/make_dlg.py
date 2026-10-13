import json, os
HERE = os.path.dirname(os.path.abspath(__file__))
A = "’"
def q(s): return s.replace("'", A)

# 중1 천재(이상기) 7과 Tasty World — COMMUNICATION: A. Listen and Check 1~3 + C. Watch and Do + Wrap Up 1(듣기 대본)
# 제외: 의사소통 기능 e.g. 두 줄 예시(A: Are you ready to order? / B: Yes, I'd like ~ 등), Dialogue Practice 표현 점검 문장,
#       Wrap Up 2(Q: Are you ready to order? / You: ____ 답 쓰기 — 대화 아님), Wrap Up 3~7(본문·문법)
# 해석은 [01]내용정리 플러스 해석 그대로 (Wrap Up 1은 해석이 없어 새로 씀)
# 해설 번호: C. Watch and Do는 [01] Expressions 1~6 순서 유지 + 원문 표시(↳‘다양한’, ↳bulgogi)를 대사 순서대로 끼움, 해설 문장은 새로 씀
dialogues = [
 {"id": "D1", "label": "Communication · A. Listen and Check 1", "lines": [
  ["M", "Hello, {are you ready to order}?", "안녕하세요, 주문하시겠어요?"],
  ["G", "Yes, {I'd like} the {pizza}.", "네, 저는 피자를 주세요."],
  ["M", "{Do you want} some {salad}, {too}?", "샐러드도 좀 드시겠어요?"],
  ["G", "{No, thank you}.", "아니요, 괜찮습니다."]],
  "notes": [
  "be ready + to부정사 : ‘~할 준비가 되다’ — Are you ready to order? = ‘{주문하시겠어요}?’ (주문받기)",
  "I’d like + 음식 : ‘저는 ~을 주세요’(주문하기) — I’d = I {would} (I want보다 공손)",
  "Do you want + 음식? : ‘~을 드시겠어요?’(음식 {권하기}) — too = ‘~{도}’(문장 끝)",
  "No, thank you. : ‘아니요, {괜찮습니다}.’ — 권유 거절 (받아들일 때는 Yes, {please}.)"]},
 {"id": "D2", "label": "Communication · A. Listen and Check 2", "lines": [
  ["W", "Hello, {may I take your order}?", "안녕하세요, 주문하시겠어요?"],
  ["B", "Yes, {I'd like} some {curry}.", "네, 저는 카레를 좀 주세요."],
  ["W", "{Do you want} {chicken} curry {or} {beef} curry?", "닭고기 카레와 소고기 카레 중 어떤 것을 원하시나요?"],
  ["B", "{Chicken curry}, {please}.", "닭고기 카레 주세요."]],
  "notes": [
  "May I take your order? : ‘주문하시겠어요?’(주문받기) — take one’s order = ~의 {주문을 받다} (= Are you {ready} to order?)",
  "I’d like some curry : 주문하기 — some = ‘약간의, 좀’ / I’d like + {음식}",
  "A or B? : ‘A 아니면 B?’ — or = ‘{아니면, 혹은}’ → 둘 중 {하나}를 골라 답함",
  "음식, please. : ‘~ 주세요’ — 짧게 주문하기 (= I’d {like} chicken curry.)"]},
 {"id": "D3", "label": "Communication · A. Listen and Check 3", "lines": [
  ["W", "Hello, {are you ready to order}?", "안녕하세요, 주문하시겠어요?"],
  ["B", "Yes, {I'd like} the {carrot cake}.", "네, 저는 당근케이크를 주세요."],
  ["W", "{Do you want} {something to drink}, {too}?", "마실 것도 원하시나요?"],
  ["B", "{Orange juice}, {please}.", "오렌지주스 주세요."]],
  "notes": [
  "Are you ready to order? : 주문받기 — be ready to + {동사원형} ‘~할 준비가 되다’",
  "I’d like the carrot cake : 주문하기 — I’d like + 음식 (= I’ll {have} the carrot cake.)",
  "something to drink : ‘{마실 것}’ — to부정사의 {형용사적} 용법(something 수식)",
  "Orange juice, please. : 음료, please. ‘~ 주세요’ — 마실 것으로 {오렌지주스}를 주문"]},
 {"id": "D4", "label": "Communication · C. Watch and Do", "lines": [
  ["Server", "Hello, {are you ready to order}?", "안녕하세요, 주문하시겠어요?"],
  ["Minji", "Well, {I'd like} bibimbap. {How about you}, Alex?", "음, 저는 비빔밥을 주세요. 너는 어때, Alex?"],
  ["Alex", "Um, I {can't decide}. {What is} bibimbap?", "음, 난 결정을 못 하겠어. 비빔밥이 뭐야?"],
  ["Minji", "Bibimbap is a {rice dish} with {various vegetables}.", "비빔밥은 다양한 채소가 들어간 밥 요리야."],
  ["Alex", "Well, I {don't like} vegetables.", "글쎄, 난 채소를 좋아하지 않아."],
  ["Server", "Then {would you like} bulgogi? It's Korean {beef} barbecue.", "그럼 불고기를 드시겠어요? 그것은 한국식 소고기 바비큐예요."],
  ["Alex", "Oh, is it {spicy}?", "오, 그것은 매콤한가요?"],
  ["Server", "No, it's {not spicy}.", "아뇨, 그것은 매콤하지 않습니다."],
  ["Alex", "Okay, I'll {try it}!", "그래요, 그걸 먹어 볼게요!"],
  ["Minji", "{Do you want} some {gimbap}, {too}?", "김밥도 좀 먹을래?"],
  ["Alex", "{No, thanks}. {Just} bulgogi for me.", "아니, 괜찮아. 난 불고기면 돼."],
  ["Server", "So, one bibimbap {and} one bulgogi, {right}?", "그러면, 비빔밥 하나랑 불고기 하나, 맞으시죠?"],
  ["Minji", "Right. Thank you.", "맞아요. 감사합니다."]],
  "notes": [
  "Are you ready to order? : 직원이 손님의 주문을 받는 표현 (= Can/May I {take your order}? / Would you like to {order}?)",
  "I’d like + 음식 : ‘저는 ~을 주세요’ — I would like의 줄임말, I want보다 {공손한} 주문 표현",
  "How about you? : ‘{너는 어때}?’ — 상대의 의견·상황 묻기 (= {What} about you?)",
  "with various vegetables : various = ‘{다양한}’ → 뒤에 {복수}명사 vegetables",
  "Would you like + 음식? : ‘~을 드시겠어요?’ — 정중하게 음식 {권하기} (= Do you want + 음식?)",
  "I’ll try it : it = {bulgogi} / try = ‘(음식을) {먹어 보다}’",
  "Do you want + 음식? : ‘~을 먹을래?’ — 더 공손하게는 {Would you like} + 음식?",
  "No, thanks. : 권유 거절 ‘아니, {괜찮아}.’ (수락은 Yes, {please}.) / Just bulgogi for me. = 난 불고기{만} 먹을게"]},
 {"id": "D5", "label": "Wrap Up 1 · Listening", "lines": [
  ["M", "Hello, {are you ready to order}?", "안녕하세요, 주문하시겠어요?"],
  ["G", "Yes, {I'd like} a {sandwich}.", "네, 저는 샌드위치를 주세요."],
  ["M", "{Do you want} some {dessert}?", "디저트를 좀 드시겠어요?"],
  ["G", "{No, thank you}.", "아니요, 괜찮습니다."]],
  "notes": [
  "Are you ready to order? : 주문받기 ‘주문하시겠어요?’ (= May I {take} your order?)",
  "I’d like a sandwich : 주문하기 — sandwich는 셀 수 있는 명사 단수 → 앞에 {a}",
  "Do you want some dessert? : 음식 권하기 — 권유하는 의문문에서는 any가 아니라 {some}",
  "No, thank you. : 권유 거절 — 소녀는 디저트 없이 {샌드위치}만 주문함"]},
]
expressions = [
 ["주문받기", "Are you {ready} to order?", "주문하시겠어요? (주문할 준비가 되셨나요?)"],
 ["주문받기", "May[Can] I {take} your order?", "주문하시겠어요? (주문 받아 드릴까요?)"],
 ["주문받기", "Would you like to {order}?", "주문하시겠어요?"],
 ["주문하기", "I’d {like} + 음식.", "저는 ~을 주세요."],
 ["주문하기", "I’d like to {have} + 음식.", "저는 ~을 먹고 싶어요."],
 ["주문하기", "I’ll {have} + 음식.", "저는 ~으로 할게요."],
 ["주문하기", "음식, {please}.", "~ 주세요."],
 ["주문하기", "{Can} I have[get] + 음식?", "~로 해도 될까요?"],
 ["음식 권하기", "Do you {want} + 음식?", "~을 드시겠어요? / ~ 먹을래?"],
 ["음식 권하기", "{Would} you like + 음식?", "~을 드시겠어요? (더 공손)"],
 ["음식 권하기", "Why don’t you {try} + 음식?", "~을 드셔 보시는 게 어때요?"],
 ["음식 권하기", "{How} about (trying) + 음식?", "~은 어떠세요?"],
 ["수락하기", "Yes, {please}.", "네, 주세요."],
 ["거절하기", "No, {thank} you. / No, thanks.", "아니요, 괜찮습니다."],
 ["거절하기", "No, I’m {good}.", "아니요, 저는 괜찮아요."],
]
stage3 = [
 ["D1", "Do you want some salad, too?", "샐러드도 좀 드시겠어요?"],
 ["D2", "Hello, may I take your order?", "안녕하세요, 주문하시겠어요?"],
 ["D2", "Do you want chicken curry or beef curry?", "닭고기 카레와 소고기 카레 중 어떤 것을 원하시나요?"],
 ["D3", "Yes, I'd like the carrot cake.", "네, 저는 당근케이크를 주세요."],
 ["D3", "Do you want something to drink, too?", "마실 것도 원하시나요?"],
 ["D4", "Bibimbap is a rice dish with various vegetables.", "비빔밥은 다양한 채소가 들어간 밥 요리야."],
 ["D4", "Then would you like bulgogi?", "그럼 불고기를 드시겠어요?"],
 ["D4", "It's Korean beef barbecue.", "그것은 한국식 소고기 바비큐예요."],
 ["D4", "Do you want some gimbap, too?", "김밥도 좀 먹을래?"],
 ["D4", "So, one bibimbap and one bulgogi, right?", "그러면, 비빔밥 하나랑 불고기 하나, 맞으시죠?"],
 ["D5", "Hello, are you ready to order?", "안녕하세요, 주문하시겠어요?"],
 ["D5", "Do you want some dessert?", "디저트를 좀 드시겠어요?"],
]
stage4 = ["D4", "D2", "D5", "D3", "D1"]
# [대화, 문장, T/F, 근거, 함정]
stage5 = [
 ["D1", "The man asks the girl if she is ready to order.", "T", "M 1: Hello, are you ready to order?", "바꿔 말하기"],
 ["D1", "The girl orders the pizza.", "T", "G 1: Yes, I'd like the pizza.", ""],
 ["D1", "The girl wants to order some salad, too.", "F", "G 2: No, thank you.", "의도 바꾸기"],
 ["D1", "The man offers the girl some salad.", "T", "M 2: Do you want some salad, too?", "표현 해석(Do you want ~? = 권하기)"],
 ["D1", "The girl orders a pizza and a salad.", "F", "G 2: No, thank you. (피자만 주문)", "범위 더하기"],
 ["D1", "The girl says, “Yes, please.” to the man's offer.", "F", "G 2: No, thank you.", "수락 ↔ 거절"],
 ["D2", "The woman takes the boy's order.", "T", "W 1: may I take your order?", "바꿔 말하기"],
 ["D2", "The boy wants to eat some curry.", "T", "B 1: I'd like some curry.", "표현 해석(I'd like = 주문하기)"],
 ["D2", "The boy is ordering beef curry.", "F", "B 2: Chicken curry, please.", "선택 바꾸기(chicken ↔ beef)"],
 ["D2", "The woman gives the boy two choices of curry.", "T", "W 2: chicken curry or beef curry?", "바꿔 말하기"],
 ["D2", "The boy asks the woman which curry is better.", "F", "W 2 (어떤 카레를 원하는지 물은 사람은 여자)", "인물 바꾸기"],
 ["D2", "The boy orders chicken curry and a drink.", "F", "B 2: Chicken curry, please. (음료 언급 없음)", "범위 더하기"],
 ["D3", "The boy orders the carrot cake.", "T", "B 1: Yes, I'd like the carrot cake.", ""],
 ["D3", "The woman asks the boy if he wants something to eat, too.", "F", "W 2: Do you want something to drink, too?", "낱말 바꾸기(drink ↔ eat)"],
 ["D3", "The boy doesn't want anything to drink.", "F", "B 2: Orange juice, please.", "부정 더하기"],
 ["D3", "The boy orders orange juice.", "T", "B 2: Orange juice, please.", ""],
 ["D3", "The boy will have carrot cake and lemon juice.", "F", "B 2: Orange juice, please.", "세부 바꾸기(orange ↔ lemon)"],
 ["D3", "The woman offers the boy a drink.", "T", "W 2: Do you want something to drink, too?", "바꿔 말하기"],
 ["D4", "Minji wants to order bibimbap.", "T", "Minji 1: I'd like bibimbap.", ""],
 ["D4", "Alex decides what to order right away.", "F", "Alex 1: Um, I can't decide.", "부정 빼기"],
 ["D4", "Minji explains bibimbap to Alex.", "T", "Minji 2: Bibimbap is a rice dish with various vegetables.", "바꿔 말하기"],
 ["D4", "Alex likes vegetables very much.", "F", "Alex 2: I don't like vegetables.", "반대"],
 ["D4", "The server suggests bulgogi to Alex.", "T", "Server 2: Then would you like bulgogi?", "표현 해석(Would you like ~? = 권하기)"],
 ["D4", "The server says bulgogi is very spicy.", "F", "Server 3: No, it's not spicy.", "반대(spicy ↔ not spicy)"],
 ["D4", "Alex doesn't want any gimbap.", "T", "Alex 5: No, thanks. Just bulgogi for me.", "표현 해석(No, thanks = 거절)"],
 ["D4", "The final order is one bibimbap and one gimbap.", "F", "Server 4: one bibimbap and one bulgogi", "음식 바꾸기(bulgogi ↔ gimbap)"],
 ["D5", "The man asks the girl if she is ready to order.", "T", "M 1: Hello, are you ready to order?", "바꿔 말하기"],
 ["D5", "The girl orders a sandwich.", "T", "G 1: Yes, I'd like a sandwich.", ""],
 ["D5", "The girl orders a hamburger.", "F", "G 1: I'd like a sandwich.", "세부 바꾸기"],
 ["D5", "The man offers the girl some dessert.", "T", "M 2: Do you want some dessert?", "표현 해석(권하기)"],
 ["D5", "The girl wants some dessert after the sandwich.", "F", "G 2: No, thank you.", "의도 바꾸기"],
 ["D5", "The girl orders a sandwich and some dessert.", "F", "G 2: No, thank you. (샌드위치만)", "범위 더하기"],
]
# ★고난도 (대화마다 1개) — kind: true / false / cannot / count
stage5b = [
 {"d": "D1", "kind": "cannot", "q": "대화를 읽고 대답할 수 없는 질문을 모두 고르시오.", "opts": [
  ["What does the girl order?", True, "G 1: the pizza"],
  ["How much is the pizza?", False, "가격 언급 없음"],
  ["Does the girl want some salad?", True, "G 2: No, thank you."],
  ["What size is the pizza?", False, "크기 언급 없음"],
  ["Who asks the girl about her order?", True, "M 1: the man"]]},
 {"d": "D2", "kind": "count", "q": "대화의 내용과 일치하는 것의 개수는?", "opts": [
  ["The boy is ready to order.", True, "B 1: Yes, I'd like some curry."],
  ["The boy wants some soup.", False, "B 1: some curry"],
  ["The woman gives the boy two choices of curry.", True, "W 2: chicken curry or beef curry"],
  ["The boy chooses beef curry.", False, "B 2: Chicken curry, please."],
  ["The boy says “please” when he orders the curry.", True, "B 2: Chicken curry, please."]]},
 {"d": "D3", "kind": "false", "q": "대화의 내용과 일치하지 않는 것을 모두 고르시오.", "opts": [
  ["The woman takes a girl's order.", False, "주문하는 사람은 소년(B)"],
  ["The boy orders the carrot cake.", True, "B 1"],
  ["The boy orders a drink first.", False, "B 1: 케이크를 먼저 주문 → B 2: 음료"],
  ["The woman asks the boy about a drink.", True, "W 2: something to drink"],
  ["The boy wants some apple juice.", False, "B 2: Orange juice, please."]]},
 {"d": "D4", "kind": "true", "q": "대화의 내용과 일치하는 것을 모두 고르시오.", "opts": [
  ["Minji can't decide what to order.", False, "Alex 1: I can't decide. (결정 못 한 사람은 Alex)"],
  ["Bibimbap is a rice dish with various vegetables.", True, "Minji 2"],
  ["Alex doesn't want bibimbap because he doesn't like vegetables.", True, "Alex 2"],
  ["The server says bulgogi is spicy.", False, "Server 3: No, it's not spicy."],
  ["Alex says no to Minji's offer of gimbap.", True, "Alex 5: No, thanks."]]},
 {"d": "D5", "kind": "cannot", "q": "대화를 읽고 대답할 수 없는 질문을 모두 고르시오.", "opts": [
  ["What kind of dessert does the man recommend?", False, "디저트 종류 언급 없음"],
  ["What does the girl order?", True, "G 1: a sandwich"],
  ["Does the girl want some dessert?", True, "G 2: No, thank you."],
  ["How long does the girl wait for her sandwich?", False, "기다린 시간 언급 없음"],
  ["Who takes the girl's order?", True, "M 1: the man"]]},
]
stage6 = [
 {"d": "D1", "ans": "What does the girl want to drink?", "trap": "다른 대화(3번 음료 주문)와 섞기", "why": "피자와 샐러드 이야기만 나오고 음료는 언급되지 않음",
  "ok": [["What does the man ask first?", "If she is ready to order.", 1], ["What does the girl order?", "The pizza.", 2],
         ["What does the man offer the girl?", "Some salad.", 3], ["Does the girl want some salad?", "No, she doesn't.", 4]]},
 {"d": "D2", "ans": "How spicy is the chicken curry?", "trap": "세부 묻기(범위 넘기기)", "why": "카레가 얼마나 매운지는 언급되지 않음",
  "ok": [["Who takes the boy's order?", "The woman.", 1], ["What does the boy want to eat?", "Some curry.", 2],
         ["What two kinds of curry are there?", "Chicken curry and beef curry.", 3], ["Which curry does the boy choose?", "Chicken curry.", 4]]},
 {"d": "D3", "ans": "Why does the boy order orange juice?", "trap": "이유 묻기(범위 넘기기)", "why": "오렌지주스를 고른 이유는 언급되지 않음",
  "ok": [["Is the boy ready to order?", "Yes, he is.", 2], ["What does the boy order first?", "The carrot cake.", 2],
         ["What does the woman ask the boy?", "If he wants something to drink.", 3], ["What drink does the boy order?", "Orange juice.", 4]]},
 {"d": "D4", "ans": "How much is the bulgogi?", "trap": "가격 묻기(숫자 넘기기)", "why": "주문표 그림에는 가격이 있지만 대화에는 가격이 나오지 않음",
  "ok": [["What does Minji want to order?", "Bibimbap.", 2], ["What is bibimbap?", "A rice dish with various vegetables.", 4],
         ["Why doesn't Alex want bibimbap?", "Because he doesn't like vegetables.", 5], ["What is bulgogi?", "Korean beef barbecue.", 6]]},
 {"d": "D4", "ans": "What vegetables are in bibimbap?", "trap": "세부 묻기(범위 넘기기)", "why": "various vegetables(다양한 채소)만 나오고 어떤 채소인지는 언급되지 않음",
  "ok": [["Who can't decide what to order?", "Alex.", 3], ["Who suggests bulgogi to Alex?", "The server.", 6],
         ["Is bulgogi spicy?", "No, it isn't.", 8], ["What does Alex decide to try?", "Bulgogi.", 9]]},
 {"d": "D4", "ans": "Who will pay for the meal?", "trap": "인물 묻기(범위 넘기기)", "why": "누가 계산할지는 언급되지 않음",
  "ok": [["What does the server ask first?", "If they are ready to order.", 1], ["What does Minji offer Alex?", "Some gimbap.", 10],
         ["Does Alex want some gimbap?", "No, he doesn't.", 11], ["What is the final order?", "One bibimbap and one bulgogi.", 12]]},
 {"d": "D5", "ans": "What kind of sandwich does the girl order?", "trap": "세부 묻기(범위 넘기기)", "why": "a sandwich만 나오고 어떤 샌드위치인지는 언급되지 않음",
  "ok": [["Who takes the girl's order?", "The man.", 1], ["What does the girl order?", "A sandwich.", 2],
         ["What does the man offer the girl?", "Some dessert.", 3], ["Does the girl want some dessert?", "No, she doesn't.", 4]]},
]

# 입력 순서 회전: dialogue.js 5단계 섞기 결과가 반복 패턴이 되지 않도록 (check_dlg.py로 검사)
ROT = {"D1": 0, "D2": 0, "D3": 0, "D4": 0, "D5": 0}
_rot = os.environ.get("ROT")
if _rot: ROT = json.loads(_rot)
_g = {}
for x in stage5: _g.setdefault(x[0], []).append(x)
stage5 = [y for k, v in _g.items() for y in (v[ROT[k] % len(v):] + v[:ROT[k] % len(v)])]

def deepq(v):
    if isinstance(v, str): return q(v)
    if isinstance(v, list): return [deepq(x) for x in v]
    if isinstance(v, dict): return {k: deepq(x) for k, x in v.items()}
    return v
for d in dialogues:
    d["lines"] = [[s, q(e), k] for s, e, k in d["lines"]]
    d["notes"] = [q(n) for n in d["notes"]]
out = {"dialogues": dialogues, "expressions": deepq(expressions), "stage3": deepq(stage3), "stage4": stage4,
       "stage5": deepq(stage5), "stage5b": deepq(stage5b), "stage6": deepq(stage6)}
json.dump(out, open(os.path.join(HERE, "cji7m1_dlg.json"), "w", encoding="utf-8"), ensure_ascii=False, indent=1)
from collections import Counter
print("TF per dialogue", Counter(x[0] for x in stage5), "total", len(stage5), "T", sum(x[2] == "T" for x in stage5))
