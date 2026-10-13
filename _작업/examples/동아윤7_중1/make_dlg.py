import json, os
HERE = os.path.dirname(os.path.abspath(__file__))
A = "’"
def q(s): return s.replace("'", A)

# 중1 동아(윤정미) 7과 Find Your Dream — COMMUNICATION(Watch and Talk) 대화 5개 + Wrap Up Listening and Speaking 대화 2개
#  A. Watch and Check 1~4 · C. Watch, Answer, and Talk (교과서 대화 전부)
#  Wrap Up 1·2는 교과서 단원 마무리 듣기 대본(완전한 대화) — 대화가 5개뿐이라 함께 실음 (Wrap Up 3은 독백 · [Talk] 예시 답안은 발표문이라 제외)
#  해석은 내용정리 인쇄 해석 그대로
dialogues = [
 {"id": "D1", "label": "Watch and Talk · A. Watch and Check 1", "lines": [
  ["G", "{What do you want to be} in the future, Minsu?", "앞으로 무엇이 되고 싶니, 민수야?"],
  ["B", "I {want to be} a {sports reporter}.", "나는 스포츠 기자가 되고 싶어."],
  ["G", "Oh, really? Do you watch {a lot of} sports games?", "오, 정말? 스포츠 경기를 많이 보니?"],
  ["B", "Yes, I do. I'm {interested in} {all kinds of} sports.", "응, 그래. 나는 모든 종류의 스포츠에 관심이 있어."]],
  "notes": [
  "장래 희망 묻기(Pick) What do you want to be in the future? : want + {to부정사}(to be) ‘~이 되고 싶다’ / in the future ‘{미래에, 장래에}’",
  "a lot of : ‘{많은}’ = many, lots of — 셀 수 있는 명사(sports games) 앞",
  "관심 말하기(Pick) I'm interested in ~ : in은 {전치사} → 뒤에 명사(구)·동명사 / all kinds of ~ ‘{모든 종류의} ~’"]},
 {"id": "D2", "label": "Watch and Talk · A. Watch and Check 2", "lines": [
  ["G", "David, {what are you making}?", "David, 무엇을 만들고 있니?"],
  ["B", "I'm making {pizza and pasta}.", "피자와 파스타를 만들고 있어."],
  ["G", "They {look delicious}. {Are you interested in} Italian food?", "맛있어 보인다. 너는 이탈리아 음식에 관심 있니?"],
  ["B", "Yes, I am. I {want to be} a {world-famous} chef {in the future}!", "응, 그래. 나는 앞으로 세계적으로 유명한 요리사가 되고 싶어!"]],
  "notes": [
  "What are you making? : 현재진행형 의문문 — 의문사 + {be동사} + 주어 + -ing? → I'm making ~.",
  "look + 형용사 : ‘~하게 보이다’ — look {delicious} (deliciously ✗) / They = pizza and pasta",
  "관심 묻기(Pick) Are you interested in ~? : 대답은 {be동사}로 → Yes, I am. / No, I'm not.",
  "world-famous : ‘{세계적으로 유명한}’ — 하이픈으로 연결된 형용사가 chef를 꾸밈"]},
 {"id": "D3", "label": "Watch and Talk · A. Watch and Check 3", "lines": [
  ["G", "{What's this music}, Hojin? It's {awesome}.", "이 음악 뭐야, 호진아? 굉장하다."],
  ["B", "I'm {writing a song} with this {computer program}.", "나는 이 컴퓨터 프로그램으로 노래를 만들고 있어."],
  ["G", "You're very good. {Do you want to be} a songwriter?", "정말 잘하는구나. 너는 작곡가가 되고 싶니?"],
  ["B", "Yes, I'm {really interested in} {writing} songs.", "응, 나는 노래를 만드는 것에 정말로 관심이 있어."]],
  "notes": [
  "awesome : ‘{엄청난, 굉장한}’ = amazing, stunning — It = this music",
  "with + 도구 : ‘~을 {가지고}, ~으로’ — with this computer program (컴퓨터 프로그램으로)",
  "장래 희망 묻기 Do you want to be ~? : ‘너는 ~이 되고 싶니?’ — songwriter ‘{작곡가}’(singer ✗)",
  "be interested in + {동명사} : in은 전치사 → write가 아니라 {writing} (to write ✗)"]},
 {"id": "D4", "label": "Watch and Talk · A. Watch and Check 4", "lines": [
  ["G", "{Are you interested in} {fashion}, Jacob?", "패션에 관심이 있니, Jacob?"],
  ["B", "Yes, I {love to make} {clothes}.", "응, 나는 옷 만드는 것을 매우 좋아해."],
  ["G", "Really? {That's so cool}!", "정말? 너무 멋있다!"],
  ["B", "Thanks. I {want to be} a {fashion designer}. I'll {make clothes for you} {someday}.", "고마워. 나는 패션 디자이너가 되고 싶어. 언젠가 너에게 옷을 만들어 줄게."]],
  "notes": [
  "관심 묻기 Are you interested in ~? : fashion ‘{패션}’ 분야에 관심이 있는지 묻는 말",
  "love + to부정사 : ‘~하는 것을 매우 좋아하다’ = love {making} clothes (동명사도 가능)",
  "That's so cool! : ‘너무 멋있다!’ = That's {great}! / That's fantastic! / That's wonderful!",
  "make A for B : ‘B에게 A를 만들어 주다’ = make {you} clothes / someday ‘{언젠가}’(미래 · will과 함께)"]},
 {"id": "D5", "label": "Watch and Talk · C. Watch, Answer, and Talk", "lines": [
  ["G", "Jiho, {why don't we} {try} this? We can {fly an airplane}!", "지호야, 우리 이거 한번 해 보는 게 어때? 우리는 비행기를 조종해 볼 수 있어!"],
  ["B", "Sure. It {looks like fun}!", "물론이야. 재미있어 보인다!"],
  ["G", "{Do you want to be} a {pilot} in the future?", "너는 앞으로 조종사가 되고 싶니?"],
  ["B", "Yes, I'm {interested in flying} airplanes. {How about you}, Lucy?", "응, 나는 비행기를 조종하는 것에 관심이 있어. 너는 어때, Lucy?"],
  ["G", "I'm {interested in making} airplanes, {not flying}. I {want to be} an {airplane engineer}.", "나는 비행기를 만드는 것에 관심이 있어, 조종하는 것 말고. 나는 비행기 엔지니어가 되고 싶어."],
  ["B", "{That sounds cool}!", "멋있다!"],
  ["G", "Thank you. I {want to make} an airplane {someday}!", "고마워. 나는 언젠가 비행기를 만들고 싶어!"],
  ["B", "{Let's fly} this airplane, {and then} we can {try making} an airplane, {too}.", "이 비행기를 조종해 보자, 그런 다음에 비행기를 만들어 볼 수도 있어."],
  ["G", "Good idea.", "좋은 생각이야."]],
  "notes": [
  "제안하기 Why don't we ~? : ‘우리 ~하는 게 어때?’ — 뒤에 {동사원형}(try) = How[What] about trying ~? / Let's try ~.",
  "It looks like + {명사} : ‘~처럼 보이다’ — like는 전치사 → fun(재미) / It = 비행기 조종해 보기",
  "장래 희망 묻기(Pick) Do you want to be ~? : a pilot ‘{조종사}’ — Lucy가 지호에게 묻는 말",
  "관심 말하기(Pick) I'm interested in + 동명사 : 지호 = {flying} airplanes(조종하기) / Lucy = making airplanes(만들기)",
  "How about you? : ‘너는 어때?’ = {What} about you? — 같은 질문을 상대에게 되묻기",
  "not flying = I'm {not} interested in flying airplanes.를 줄인 말 → Lucy는 조종에는 관심 없음",
  "That sounds + 형용사 : ‘~하게 들린다’ — sounds {cool} (coolly ✗)",
  "want + to부정사 : ‘~하고 싶다’ — want to make (want {making} ✗) / someday ‘언젠가’",
  "Let's + 동사원형 ‘~하자’ / and then ‘{그다음에}’ / try + 동명사 ‘(시험 삼아) 한번 ~해 보다’ / too ‘또한’(문장 끝)"]},
 {"id": "D6", "label": "Wrap Up · Listening and Speaking 1", "lines": [
  ["B", "{What are you doing}?", "뭐 하고 있니?"],
  ["G", "I'm {taking pictures of} birds.", "나는 새들 사진을 찍고 있는 중이야."],
  ["B", "{Are you interested in} {taking pictures}?", "너는 사진 찍는 것에 관심이 있니?"],
  ["G", "Yes, {a lot}. I {want to be} a {photographer}.", "응, 아주 많아. 나는 사진작가가 되고 싶어."]],
  "notes": [
  "What are you doing? : 현재진행형 의문문 → 대답도 현재진행형 I'm {taking} pictures ~",
  "Are you interested in + 동명사? : 관심 묻기 — taking pictures ‘{사진 찍기}’",
  "a lot : ‘{많이}’(부사) — Yes, (I'm interested in it) a lot. / photographer ‘{사진작가}’"]},
 {"id": "D7", "label": "Wrap Up · Listening and Speaking 2", "lines": [
  ["G", "This pizza is {so good}. {Did you make it}, Tom?", "이 피자 정말 맛있다. 네가 만든 거니, Tom?"],
  ["B", "Yes, I did. I'm {really interested in} {cooking}.", "응, 맞아. 나는 요리하는 것에 정말로 관심이 있어."],
  ["G", "So, {do you want to be} a {chef} in the future?", "그럼, 너는 앞으로 요리사가 되고 싶니?"],
  ["B", "Yes, {that's my dream}.", "응, 그게 내 꿈이야."]],
  "notes": [
  "Did you make it? : 과거 의문문 → Yes, I {did}. / it = {this pizza}",
  "I'm really interested in cooking : 관심 말하기 — cooking ‘{요리하기}’(동명사 · cook ✗)",
  "Do you want to be a chef ~? → Yes, that's my {dream}. ‘그게 내 꿈이야’(장래 희망 답하기)"]},
]

expressions = [
 ["관심 묻기", "What are you {interested} in?", "너는 무엇에 관심이 있니?"],
 ["관심 묻기", "{Are} you interested in ~?", "너는 ~에 관심이 있니?"],
 ["관심 묻기", "What are your {interests}?", "너의 관심사는 무엇이니?"],
 ["관심 답하기", "I'm {interested} in + 명사 / 동명사(-ing).", "나는 ~에 관심이 있어."],
 ["관심 답하기", "History {interests} me. / I {like} taking care of pets.", "역사가 나를 흥미롭게 해. / 나는 반려동물을 돌보는 것을 좋아해."],
 ["장래 희망 묻기", "What do you {want} to be in the future?", "너는 장래에 무엇이 되고 싶니?"],
 ["장래 희망 묻기", "What's your future {dream}? / What's your dream {job}?", "너의 장래 꿈[꿈의 직업]은 무엇이니?"],
 ["장래 희망 묻기", "What do you want to be when you {grow} up?", "너는 자라서 무엇이 되고 싶니?"],
 ["장래 희망 묻기", "Do you {want} to be a(n) ~?", "너는 ~이 되고 싶니?"],
 ["장래 희망 답하기", "I {want} to be a(n) ~.", "나는 ~이 되고 싶어."],
 ["제안하기", "{Why} don't we ~? / Let's ~.", "우리 ~하는 게 어때? / ~하자."],
]

stage3 = [
 ["D1", "Do you watch a lot of sports games?", "스포츠 경기를 많이 보니?"],
 ["D2", "Are you interested in Italian food?", "너는 이탈리아 음식에 관심 있니?"],
 ["D2", "Yes, I am. I want to be a world-famous chef in the future!", "응, 그래. 나는 앞으로 세계적으로 유명한 요리사가 되고 싶어!"],
 ["D3", "Yes, I'm really interested in writing songs.", "응, 나는 노래를 만드는 것에 정말로 관심이 있어."],
 ["D4", "Yes, I love to make clothes.", "응, 나는 옷 만드는 것을 매우 좋아해."],
 ["D5", "Why don't we try this?", "우리 이거 한번 해 보는 게 어때?"],
 ["D5", "Do you want to be a pilot in the future?", "너는 앞으로 조종사가 되고 싶니?"],
 ["D5", "Let's fly this airplane, and then we can try making an airplane, too.", "이 비행기를 조종해 보자, 그런 다음에 비행기를 만들어 볼 수도 있어."],
 ["D6", "Are you interested in taking pictures?", "너는 사진 찍는 것에 관심이 있니?"],
 ["D7", "So, do you want to be a chef in the future?", "그럼, 너는 앞으로 요리사가 되고 싶니?"],
]

stage4 = ["D5", "D2", "D4", "D1", "D7"]  # 3줄 대화 순열이 5가지뿐이라 CBA(역순) 정답이 나오지 않게 5개만

T, F = "T", "F"
stage5 = [
 # D1 (6)
 ["D1", "Minsu wants to be a sports reporter in the future.", T, "B 1: I want to be a sports reporter.", "바꿔 말하기"],
 ["D1", "The girl asks Minsu what he is doing now.", F, "G 1: What do you want to be in the future? (장래 희망을 물음)", "질문 바꾸기"],
 ["D1", "Minsu wants to be a sports player.", F, "B 1: a sports reporter", "직업 바꾸기(reporter → player)"],
 ["D1", "Minsu watches a lot of sports games.", T, "G 2 → B 2: Yes, I do.", "두 대사 종합"],
 ["D1", "Minsu is interested in only one kind of sport.", F, "B 2: all kinds of sports", "단정어(only)"],
 ["D1", "It is Minsu who asks about the future dream.", F, "G 1 (장래 희망을 묻는 사람은 소녀)", "화자 바꾸기"],
 # D2 (7)
 ["D2", "David is making pizza and pasta.", T, "B 1: I'm making pizza and pasta.", "바꿔 말하기"],
 ["D2", "David is cooking Korean food.", F, "B 1 + G 2: pizza and pasta · Italian food", "속성 바꾸기(Italian → Korean)"],
 ["D2", "The girl thinks the food looks delicious.", T, "G 2: They look delicious.", "지칭(They = pizza and pasta)"],
 ["D2", "David is not interested in Italian food.", F, "B 2: Yes, I am.", "부정 뒤집기"],
 ["D2", "David wants to be a world-famous chef in the future.", T, "B 2", "바꿔 말하기"],
 ["D2", "The girl asks David what he wants to be in the future.", F, "G 1·G 2: 만드는 것·이탈리아 음식만 물음 (장래 희망은 David가 스스로 말함)", "질문 바꾸기"],
 ["D2", "David answers the girl's question about Italian food with “Yes, I am.”", T, "B 2: Yes, I am.", "표현 의도"],
 # D3 (7)
 ["D3", "Hojin is listening to music on a computer.", F, "B 1: I'm writing a song (듣기 ✗ · 만들기)", "행동 바꾸기"],
 ["D3", "The girl thinks Hojin's music is awesome.", T, "G 1: It's awesome.", "바꿔 말하기"],
 ["D3", "Hojin is writing a song with a computer program.", T, "B 1", "바꿔 말하기"],
 ["D3", "Hojin is really interested in making computer programs.", F, "B 2: writing songs", "대상 바꾸기"],
 ["D3", "The girl asks Hojin if he wants to be a songwriter.", T, "G 2: Do you want to be a songwriter?", "바꿔 말하기"],
 ["D3", "Hojin wants to be a singer.", F, "G 2 → B 2: songwriter(작곡가)", "직업 바꾸기(songwriter → singer)"],
 ["D3", "The girl says Hojin is very good at writing songs.", T, "G 2: You're very good.", "바꿔 말하기"],
 # D4 (6)
 ["D4", "The girl asks Jacob if he is interested in fashion.", T, "G 1", "바꿔 말하기"],
 ["D4", "Jacob hates making clothes.", F, "B 1: I love to make clothes.", "반대 의미"],
 ["D4", "The girl reacts positively to Jacob's answer.", T, "G 2: Really? That's so cool!", "표현 의도"],
 ["D4", "Jacob wants to be a fashion model.", F, "B 2: a fashion designer", "직업 바꾸기(designer → model)"],
 ["D4", "Jacob will make his own clothes someday.", F, "B 2: I'll make clothes for you(소녀) someday.", "대상 바꾸기"],
 ["D4", "Jacob promises to make clothes for the girl in the future.", T, "B 2: I'll make clothes for you someday.", "바꿔 말하기(someday → in the future)"],
 # D5 (8)
 ["D5", "Lucy suggests flying an airplane, and Jiho agrees.", T, "G 1 → B 1: Sure.", "두 대사 종합"],
 ["D5", "Jiho thinks flying an airplane looks boring.", F, "B 1: It looks like fun!", "반대 의미"],
 ["D5", "Jiho is interested in making airplanes.", F, "B 2: flying airplanes (making은 Lucy)", "인물 바꾸기"],
 ["D5", "Lucy wants to be an airplane engineer in the future.", T, "G 3: I want to be an airplane engineer.", "바꿔 말하기"],
 ["D5", "Lucy is interested in flying airplanes as well as making them.", F, "G 3: making airplanes, not flying", "범위 넘기기(as well as)"],
 ["D5", "Jiho wants to be a pilot.", T, "G 2 → B 2: Yes", "두 대사 종합"],
 ["D5", "Jiho suggests making an airplane first and then flying it.", F, "B 4: Let's fly this airplane, and then we can try making ~", "순서 뒤집기"],
 ["D5", "Lucy likes Jiho's last suggestion.", T, "G 5: Good idea.", "표현 의도"],
 # D6 (6)
 ["D6", "The girl is taking pictures of birds.", T, "G 1: I'm taking pictures of birds.", "바꿔 말하기"],
 ["D6", "The boy is taking pictures of birds.", F, "G 1 (사진을 찍는 사람은 소녀)", "인물 바꾸기"],
 ["D6", "The girl is not very interested in taking pictures.", F, "G 2: Yes, a lot.", "반대 의미"],
 ["D6", "The girl wants to be a photographer.", T, "G 2", "바꿔 말하기"],
 ["D6", "The boy asks the girl what she wants to be in the future.", F, "B 2: Are you interested in taking pictures? (장래 희망은 소녀가 스스로 말함)", "질문 바꾸기"],
 ["D6", "The girl's future job is related to her interest.", T, "G 2: 사진에 관심(a lot) → 사진작가", "두 대사 종합"],
 # D7 (6)
 ["D7", "Tom made the pizza himself.", T, "G 1 → B 1: Yes, I did.", "두 대사 종합"],
 ["D7", "The girl made the pizza for Tom.", F, "G 1: Did you make it, Tom? (만든 사람은 Tom)", "인물 바꾸기"],
 ["D7", "The girl thinks the pizza is very good.", T, "G 1: This pizza is so good.", "바꿔 말하기(so → very)"],
 ["D7", "Tom is really interested in eating.", F, "B 1: cooking", "대상 바꾸기"],
 ["D7", "Tom wants to be a chef in the future.", T, "G 2 → B 2: Yes, that's my dream.", "두 대사 종합"],
 ["D7", "Tom doesn't have a dream for the future.", F, "B 2: that's my dream", "부정 뒤집기"],
]

stage5b = [
 {"d": "D1", "kind": "cannot", "q": "대화를 읽고 대답할 수 없는 질문을 모두 고르시오.", "opts": [
  ["What does Minsu want to be in the future?", True, "B 1: a sports reporter"],
  ["Which sport does Minsu like best?", False, "가장 좋아하는 종목 언급 없음 (all kinds of sports)"],
  ["Does Minsu watch a lot of sports games?", True, "B 2: Yes, I do."],
  ["How old is Minsu?", False, "나이 언급 없음"],
  ["What is Minsu interested in?", True, "B 2: all kinds of sports"]]},
 {"d": "D2", "kind": "true", "q": "대화의 내용과 일치하는 것을 모두 고르시오.", "opts": [
  ["David is making Italian food.", True, "B 1 + G 2: pizza and pasta · Italian food"],
  ["The girl doesn't like the look of the food.", False, "G 2: They look delicious."],
  ["David wants to be a chef.", True, "B 2: a world-famous chef"],
  ["David asks the girl about her future job.", False, "David는 질문하지 않음"],
  ["The girl asks David two questions.", True, "G 1 · G 2"]]},
 {"d": "D3", "kind": "count", "q": "대화의 내용과 일치하는 것의 개수는?", "opts": [
  ["Hojin is writing a song.", True, "B 1"],
  ["The girl thinks the music is awesome.", True, "G 1"],
  ["Hojin wants to be a singer.", False, "songwriter"],
  ["Hojin is using a computer program.", True, "B 1"],
  ["The girl is not interested in Hojin's music.", False, "G 1: What's this music? It's awesome."]]},
 {"d": "D4", "kind": "false", "q": "대화의 내용과 일치하지 않는 것을 모두 고르시오.", "opts": [
  ["Jacob loves to make clothes.", True, "B 1"],
  ["Jacob wants to be a fashion model.", False, "B 2: a fashion designer"],
  ["The girl reacts positively to Jacob's answer.", True, "G 2: That's so cool!"],
  ["Jacob is interested in fashion.", True, "G 1 → B 1: Yes"],
  ["Jacob already made clothes for the girl.", False, "B 2: I'll make ~ someday (미래)"]]},
 {"d": "D5", "kind": "can", "q": "대화를 읽고 대답할 수 있는 질문을 모두 고르시오.", "opts": [
  ["How old are Jiho and Lucy?", False, "나이 언급 없음"],
  ["What does Lucy want to be?", True, "G 3: an airplane engineer"],
  ["What is Jiho interested in?", True, "B 2: flying airplanes"],
  ["Where did Jiho learn to fly?", False, "언급 없음"],
  ["What will they do after flying the airplane?", True, "B 4: try making an airplane"]]},
 {"d": "D6", "kind": "cannot", "q": "대화를 읽고 대답할 수 없는 질문을 모두 고르시오.", "opts": [
  ["What is the girl doing?", True, "G 1: taking pictures of birds"],
  ["What does the girl want to be?", True, "G 2: a photographer"],
  ["How many birds are there?", False, "새의 수 언급 없음"],
  ["What is the boy interested in?", False, "소년의 관심사 언급 없음"],
  ["Is the girl interested in taking pictures?", True, "G 2: Yes, a lot."]]},
 {"d": "D7", "kind": "true", "q": "대화의 내용과 일치하는 것을 모두 고르시오.", "opts": [
  ["Tom made the pizza.", True, "B 1: Yes, I did."],
  ["The girl wants to be a chef.", False, "요리사가 꿈인 사람은 Tom"],
  ["Tom is interested in cooking.", True, "B 1"],
  ["Tom's dream is to be a chef.", True, "G 2 → B 2"],
  ["The girl thinks the pizza is bad.", False, "G 1: so good"]]},
]

stage6 = [
 {"d": "D1", "ans": "Which sport does Minsu play every day?", "trap": "범위 넘기기(직접 하는 운동)", "why": "스포츠 경기를 많이 본다는 것만 나오고 Minsu가 직접 하는 운동은 언급되지 않음",
  "ok": [["What does Minsu want to be in the future?", "A sports reporter.", "B 1"],
         ["Does Minsu watch a lot of sports games?", "Yes, he does.", "B 2"],
         ["What is Minsu interested in?", "All kinds of sports.", "B 2"],
         ["What does the girl ask Minsu first?", "What he wants to be in the future.", "G 1"]]},
 {"d": "D2", "ans": "Where did David learn to cook Italian food?", "trap": "장소 묻기(범위 넘기기)", "why": "David가 이탈리아 음식에 관심이 있다는 것만 나오고 요리를 어디서 배웠는지는 언급되지 않음",
  "ok": [["What is David making?", "Pizza and pasta.", "B 1"],
         ["How does the food look?", "It looks delicious.", "G 2"],
         ["Is David interested in Italian food?", "Yes, he is.", "B 2"],
         ["What does David want to be in the future?", "A world-famous chef.", "B 2"]]},
 {"d": "D3", "ans": "When did Hojin start writing songs?", "trap": "시점 묻기(범위 넘기기)", "why": "지금 노래를 만들고 있다는 것만 나오고 언제 처음 노래를 만들기 시작했는지는 언급되지 않음",
  "ok": [["What is Hojin doing?", "He is writing a song.", "B 1"],
         ["What is Hojin using to write a song?", "A computer program.", "B 1"],
         ["What does the girl think of the music?", "She thinks it's awesome.", "G 1"],
         ["What is Hojin really interested in?", "Writing songs.", "B 2"]]},
 {"d": "D4", "ans": "What kind of clothes does Jacob like to wear?", "trap": "속성 바꾸기(만들기 → 입기)", "why": "옷 만드는 것을 좋아한다는 것만 나오고 어떤 옷을 즐겨 입는지는 언급되지 않음",
  "ok": [["What does Jacob love to do?", "He loves to make clothes.", "B 1"],
         ["What does Jacob want to be?", "A fashion designer.", "B 2"],
         ["What will Jacob do for the girl someday?", "He will make clothes for her.", "B 2"],
         ["What does the girl ask Jacob?", "If he is interested in fashion.", "G 1"]]},
 {"d": "D5", "ans": "Who taught Jiho how to fly an airplane?", "trap": "인물 묻기(범위 넘기기)", "why": "지호가 비행기 조종에 관심이 있다는 것만 나오고 누가 가르쳐 주었는지는 언급되지 않음",
  "ok": [["What does Lucy suggest to Jiho?", "Trying this (flying an airplane).", "G 1"],
         ["What is Lucy interested in?", "Making airplanes.", "G 3"],
         ["What does Lucy want to be?", "An airplane engineer.", "G 3"],
         ["What will they do after flying the airplane?", "They will try making an airplane.", "B 4"]]},
 {"d": "D6", "ans": "Where is the girl taking pictures?", "trap": "장소 묻기(범위 넘기기)", "why": "새 사진을 찍고 있다는 것만 나오고 어디에서 찍고 있는지는 언급되지 않음",
  "ok": [["What is the girl doing?", "She is taking pictures of birds.", "G 1"],
         ["Is the girl interested in taking pictures?", "Yes, a lot.", "G 2"],
         ["What does the girl want to be?", "A photographer.", "G 2"],
         ["What does the boy ask the girl first?", "What she is doing.", "B 1"]]},
 {"d": "D7", "ans": "What did Tom put on the pizza?", "trap": "속성 바꾸기(재료)", "why": "Tom이 피자를 만들었다는 것만 나오고 어떤 재료를 올렸는지는 언급되지 않음",
  "ok": [["Who made the pizza?", "Tom did.", "B 1"],
         ["What does the girl think of the pizza?", "It is so good.", "G 1"],
         ["What is Tom really interested in?", "Cooking.", "B 1"],
         ["What is Tom's dream?", "To be a chef.", "B 2"]]},
]

# T/F 입력 순서: dialogue.js 5단계 배열이 2-2 교대(TTFFTT·FFTTFF)까지 피하도록 대화 안 문항 순서를 고정 시드(23)로 섞어 둠 (sim_tf.js로 검사)
import random
_r = random.Random(23); _new = []
for _d in dialogues:
    _its = [x for x in stage5 if x[0] == _d["id"]]; _r.shuffle(_its); _new += _its
stage5 = _new

def fix(o):
    if isinstance(o, str): return q(o)
    if isinstance(o, list): return [fix(x) for x in o]
    if isinstance(o, dict): return {k: fix(v) for k, v in o.items()}
    return o

out = fix({"dialogues": dialogues, "expressions": expressions, "stage3": stage3, "stage4": stage4,
           "stage5": stage5, "stage5b": stage5b, "stage6": stage6})
json.dump(out, open(os.path.join(HERE, "dy7m1_dlg.json"), "w"), ensure_ascii=False, indent=1)

anchors = fix({
 "D1-1": "in the future", "D1-2": "a lot of", "D1-3": "interested in",
 "D2-1": "what are you making?", "D2-2": "look delicious", "D2-3": "Are you interested in", "D2-4": "world-famous",
 "D3-1": "awesome", "D3-2": "with this computer program", "D3-3": "Do you want to be", "D3-4": "writing songs",
 "D4-1": "Are you interested in fashion", "D4-2": "love to make", "D4-3": "so cool", "D4-4": "make clothes for you",
 "D5-1": "why don't we", "D5-2": "looks like fun", "D5-3": "Do you want to be a pilot", "D5-4": "interested in flying",
 "D5-5": "How about you", "D5-6": "not flying", "D5-7": "That sounds cool", "D5-8": "want to make", "D5-9": "Let's fly",
 "D6-1": "What are you doing?", "D6-2": "taking pictures?", "D6-3": "a lot",
 "D7-1": "Did you make it", "D7-2": "interested in cooking", "D7-3": "that's my dream",
})
cfg = {"dlg": os.path.join(HERE, "dy7m1_dlg.json"), "lesson": "7", "outDir": "/mnt/user-data/outputs/m1_dy7/01. 대화/7과", "term": "2026 · 2학기 기말고사 대비",
 "schools": "구성·신릉·신촌·죽전중 1학년", "schoolsShort": "구성·신릉·신촌·죽전중 1학년", "book": "중1 동아(윤정미) Lesson 7  Find Your Dream",
 "pubShort": "동아윤", "lessonTitle": "Find Your Dream", "dlgLabel": "Watch and Talk", "s6answers": [3, 5, 1, 4, 2, 4, 1], "anchors": anchors}
json.dump(cfg, open(os.path.join(HERE, "dy7m1_dcfg.json"), "w"), ensure_ascii=False)
print(len(stage5), {d["id"]: sum(1 for x in stage5 if x[0] == d["id"]) for d in dialogues})
print("T ratio", sum(1 for x in stage5 if x[2] == T) / len(stage5))
