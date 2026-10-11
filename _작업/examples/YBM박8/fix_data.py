# YBM박 8과 단어 데이터 정리 (examples/YBM박7/fix_data.py 기반, 경로만 이번 세트로 + 8과 개별 수정)
import json,re
d=json.load(open('yb8/voca/yb8_data_raw.json'))
T=open('src/yb8_wt.txt').read().split('\n')
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
SPACE_JOIN={'되는','표면에','새로운','감각이'}
def joinp(ls):
    out=''
    for s in ls:
        if not out: out=s
        elif s.startswith('*') and not re.search(r'[,;]$',out): out+=', '+s
        elif re.match('^'+POS,s) or s.startswith('(') or s.startswith('*'): out+=' '+s
        elif out.endswith('하다') and re.match('[가-힣]',s): out+=', '+s
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
json.dump(d,open('yb8/voca/yb8_data.json','w'),ensure_ascii=False,indent=1)
for f in fixed: print('POS',f)
print('names moved',names,'ex cut',cut)
# 4) 개별 수정 (8과)
d=json.load(open('yb8/voca/yb8_data.json'))
# (a) 해석이 고유명사·「 로 시작해 영어 예문 끝에 붙은 조각 → 해석 앞으로
MOVE={15:'Johnny',27:'Edvard',31:'「',32:'1800',52:'「'}
for x in d:
    t=MOVE.get(x['no'])
    if t and x.get('ex') and x['ex'][0].endswith(' '+t):
        x['ex'][0]=x['ex'][0][:-len(t)].strip()
        x['ex'][1]=t+('' if t in ('「','1800') else ' ')+x['ex'][1]
    if x['no']==18: x['ex'][0]=x['ex'][0].replace('Put on a warm clothes.','Put on warm clothes.')
    if x['no']==13: x['ex'][0]=x['ex'][0].replace('a Shakespeare’s play','Shakespeare’s play')
# (b) parse_wt 정규식이 줄바꿈 때문에 놓친 99번 숙어 추가
if not any(x['no']==99 for x in d):
    i=[k for k,x in enumerate(d) if x['no']==100][0]
    d.insert(i,{"no":99,"en":"be made up of","ko":"~로 구성되다","pos":"","extra":"","ee":None,"ex":None})
json.dump(d,open('yb8/voca/yb8_data.json','w'),ensure_ascii=False,indent=1)
print('items',len(d))
