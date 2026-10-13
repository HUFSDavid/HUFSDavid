# cji7m1_data_raw.json → cji7m1_data.json : 잘린 품사·뜻 정리, 원본에 없는 예문을 교과서 대화·본문 문장으로 채움
import json
d = json.load(open('cji7m1_data_raw.json', encoding='utf-8'))
EX = {  # 교과서 원문(대화문·본문) + [01]내용정리 해석 / be ready to·salad는 WORD TEST 예문
 'be ready to': ["I am ready to go home now.", "나는 이제 집에 갈 준비가 되었다."],
 'salad': ["Do you want some salad, too?", "샐러드도 좀 드시겠어요?"],
 'barbecue': ["Then would you like bulgogi? It’s Korean beef barbecue.", "그러면 불고기를 드시겠어요? 그것은 한국식 소고기 바비큐예요."],
 'big': ["I’m bigger than an olive, but I’m smaller than an avocado.", "저는 올리브보다 더 크지만, 아보카도보다 더 작아요."],
 'small': ["I’m bigger than an olive, but I’m smaller than an avocado.", "저는 올리브보다 더 크지만, 아보카도보다 더 작아요."],
 'need': ["You need eggs and potatoes for this omelet.", "여러분은 이 오믈렛을 위해 달걀과 감자가 필요합니다."],
 'Malaysia': ["In Malaysia, people wrap chicken fried rice with a thin omelet.", "말레이시아에서 사람들은 닭고기 볶음밥을 얇은 오믈렛으로 감쌉니다."],
 'Indonesia': ["It is also popular in Indonesia and Singapore.", "그것은 인도네시아와 싱가포르에서도 인기가 있습니다."],
 'Singapore': ["It is also popular in Indonesia and Singapore.", "그것은 인도네시아와 싱가포르에서도 인기가 있습니다."],
 'hungry': ["Do you feel hungry now? How about trying an omelet?", "여러분은 지금 배가 고프다고 느끼나요? 오믈렛을 먹어 보는 건 어떤가요?"],
}
for x in d:
    if x['en'] == 'be ready+to':
        x.update(en='be ready to', ko='~할 준비가 되다', pos='[구] ~할 준비가 되다')
    if x['en'] == 'beat':
        x['ko'] = '(달걀, 크림 등을) 휘젓다'; x['pos'] = 'v. (달걀, 크림 등을) 휘젓다'
    if x['en'] == 'delicious':
        x['ko'] = '아주 맛있는'; x['pos'] = 'a. 아주 맛있는'; x['extra'] = '(delicious-more delicious-most delicious)'
    if x['ee']:
        x['ee']['ko_head'] = x['ko'] if x['en'] in ('beat', 'delicious') else x['ee']['ko_head']
    if not x['ex']:
        x['ex'] = EX[x['en']]
assert all(x['ex'] for x in d), [x['en'] for x in d if not x['ex']]
json.dump(d, open('cji7m1_data.json', 'w', encoding='utf-8'), ensure_ascii=False, indent=1)
print(len(d), 'ee', sum(1 for x in d if x['ee']))
