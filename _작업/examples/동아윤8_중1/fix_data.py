# dy8m1_data_raw.json → dy8m1_data.json : 원본에 없는 예문을 교과서 대화·본문 문장으로 채우고, 합친 work의 영영 ko_head 정리
import json
d = json.load(open('dy8m1_data_raw.json', encoding='utf-8'))
EX = {  # 교과서 원문(대화문·본문) + 내용정리 인쇄 해석
 'actor': ["But look at these actors. They are all famous.", "하지만 이 배우들을 봐. 그들은 다 유명하잖아."],
 'difficult': ["A History of Black Holes? I think it’ll be difficult.", "‘블랙홀의 역사’? 어려울 것 같아."],
 'little': ["There was a little girl with golden hair in a small town.", "작은 마을에 금발의 어린 소녀가 있었다."],
 'funny': ["I know! I should post funny pictures.", "알았다! 웃긴 사진들을 올려야겠어."],
 'a lot of': ["Now, her posts were getting a lot of likes.", "이제, 그녀의 게시물은 많은 ‘좋아요’를 받고 있었다."],
 'find': ["She was taking a walk in the forest and found a cottage.", "그녀는 숲에서 산책을 하다가 한 오두막집을 발견했다."],
 'answer': ["She knocked on the door, but there was no answer.", "그녀는 문을 두드렸지만, 아무 대답이 없었다."],
 'dark': ["It was getting dark, and it started to rain.", "날이 어두워지고 있었고, 비가 내리기 시작했다."],
 'with a smile': ["She ate the smallest one and took selfies with a smile.", "그녀는 가장 작은 그릇의 수프를 먹었고 미소를 지으며 셀피를 찍었다."],
 'someone': ["“Someone ate my soup and broke my chair!” cried Baby Bear.", "“누군가 내 수프를 먹고 내 의자를 부서뜨렸어요!”라고 아기곰이 외쳤다."],
 'end': ["I’ll clean your house every day until the end of the summer.", "여름이 끝날 때까지 매일 여러분 집을 청소할게요."],
 'before': ["From now on, I’ll think twice before I press POST.", "이제부터 ‘게시’를 누르기 전에 다시 생각할게요."],
}
for x in d:
    if x['en'] in EX and not x['ex']:
        x['ex'] = EX[x['en']]
    if x['en'] == 'work' and x['ee']:
        x['ee']['ko_head'] = '작동하다'
assert all(x['ex'] for x in d), [x['en'] for x in d if not x['ex']]
json.dump(d, open('dy8m1_data.json', 'w', encoding='utf-8'), ensure_ascii=False, indent=1)
print(len(d), 'ee', sum(1 for x in d if x['ee']))
