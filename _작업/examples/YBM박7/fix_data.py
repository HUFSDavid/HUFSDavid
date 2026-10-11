# YBM박 7과 단어 데이터 정리 (examples/비상김8/fix_data.py 기반, 경로·머리글 패턴만 이번 세트로)
import json,re
d=json.load(open('ybm7/voca/yb7_data_raw.json'))
T=open('src/04_WORDTEST.txt').read().split('\n')
POS=r'(?:n|v|a|adv|prep|conj|pron|int)\.'
# 1) Word List 원문에서 품사·뜻 다시 읽기
wl={};cur=None;started=False
for ln in T:
    s=ln.strip()
    if s=='Word List': started=True; continue
    if not started: continue
    if s=='Phrase List': break
    if re.match(r'^(=== p|- \d+ -|l \d단계|개정 중3|YBM\(박준언\)|\d+$|단어·숙어장)',s) or 'WORD TEST' in s: continue
    if s.startswith('Ÿ '):
        cur=s[2:].strip(); wl[cur]=[]; continue
    if cur is None: continue
    wl[cur].append(s)
# 줄바꿈이 낱말 중간에서 일어난 경우(붙임)와 낱말 사이(띄움) 구별 — 원본 확인 후 수동 지정
SPACE_JOIN={'컴퓨터','~라고','유감스럽게','(특정한 방식으로) 행동'}
def joinp(ls):
    out=''
    for s in ls:
        if not out: out=s
        elif re.match('^'+POS,s) or s.startswith('(') or s.startswith('*'): out+=' '+s
        elif out.endswith(',') or out.endswith(';') or out.endswith(')') or out.endswith(']'): out+=' '+s
        elif any(out.endswith(w) for w in SPACE_JOIN): out+=' '+s
        else: out+=s
    return out
fixed=[]
for x in d:
    if x['pos'].strip() and x['en'] in wl and wl[x['en']]:
        full=joinp(wl[x['en']])
        conj=re.search(r'\s*(\(\w+ [–-] .*\))$',full)
        main=re.sub(r'\s*\(\w+ [–-] .*\)$','',full).strip()
        main=main.replace('(특정한 방식으로) 행동 하다','(특정한 방식으로) 행동하다')
        if main!=x['pos'].strip():
            fixed.append((x['en'],x['pos'],main)); x['pos']=main
            parts=re.split(r'\s(?='+POS+')',main)
            x['ko']=', '.join(re.sub('^'+POS+r'\s*','',p).strip().rstrip(',') for p in parts)
            x['extra']=conj.group(1) if conj else ''
            if x.get('ee'): x['ee']['ko_head']=re.sub('^'+POS+r'\s*','',parts[0]).strip().rstrip(',')
# 2) 예문 해석 칸 정리
names=0; cut=0
for x in d:
    ex=x.get('ex')
    if not ex or len(ex)<2: continue
    ko=ex[1]; k0=ko
    ko=re.split(r'\s*예문\s',ko)[0]
    ko=re.sub(r'\s*Phrases in Use.*$','',ko).strip()
    if ko!=k0: cut+=1
    en=ex[0].strip()
    m=re.search(r'\s([A-Z][A-Za-z’\']*)$',en)
    if m and re.match(r'^[은는이가을를의와과도에]',ko) and not re.search(r'[.?!]$',en):
        en=en[:m.start()].strip(); ko=m.group(1)+ko; names+=1
    x['ex']=[en,ko]+ex[2:]
# 3) 영영 정의 오염 · SYN/OPP 분리
for x in d:
    ee=x.get('ee')
    if ee:
        ee['defs']=[df for df in ee['defs'] if len(re.findall(r'[A-Za-z]',df[0]))>=3 and not re.search(r'SYN|OPP',df[0])]
        for df in ee['defs']:
            df[0]=df[0].replace('​','').strip(); df[1]=re.sub(r'\s*(SYN|OPP)\b.*$','',df[1].replace('​','')).strip()
        s=ee.get('syn','')
        if 'OPP' in s:
            a,b=s.split('OPP',1); ee['syn']=a.strip(); ee['opp']=(ee.get('opp','')+' '+b).strip()
        ee['syn']=re.sub(r'^SYN\s*','',ee['syn']).strip()
        if not ee['defs']: x['ee']=None
json.dump(d,open('ybm7/voca/yb7_data.json','w'),ensure_ascii=False,indent=1)
for f in fixed: print('POS',f)
print('names moved',names,'ex cut',cut)
# 4) 개별 수정
for x in d:
    x['ko']=x['ko'].replace('(소리))','(소리)')
    if x.get('ex'): x['ex'][0]=x['ex'][0].replace('I‘d','I’d')
json.dump(d,open('ybm7/voca/yb7_data.json','w'),ensure_ascii=False,indent=1)
