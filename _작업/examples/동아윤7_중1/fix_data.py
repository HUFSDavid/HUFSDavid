# dy7m1_data_raw.json → dy7m1_data.json : WORD TEST 원문 오탈자만 고침 (내용은 그대로)
import json, sys, os
H = os.path.dirname(os.path.abspath(__file__))
d = json.load(open(os.path.join(H, 'dy7m1_data_raw.json')))
for x in d:
    if x['en'] == 'pilot' and x['ex']:  # 원문 '비행기 에서' (안 누락)
        x['ex'][1] = '조종사는 비행기 안에서 창문을 살펴본다.'
    if x['ee']:
        x['ee']['defs'] = [[a.strip(), b.strip()] for a, b in x['ee']['defs']]
json.dump(d, open(os.path.join(H, 'dy7m1_data.json'), 'w'), ensure_ascii=False, indent=1)
print(len(d), sum(1 for x in d if x['ee']))
