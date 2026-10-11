import json,re,sys
d=json.load(open('bs8/bs8_data_raw.json'))
T=open('src/04_WORDTEST.txt').read().split('\n')
# 1) Word List 원문에서 품사·뜻 다시 읽기
wl={};cur=None;started=False
for ln in T:
    s=ln.strip()
    if s=='Word List': started=True; continue
    if not started: continue
    if re.match(r'^(=== p|- \d+ -|l \d단계|개정 중3|비상\(김진완\)|\d+$|단어·숙어장)',s) or 'WORD TEST' in s: continue
    if s.startswith('Ÿ '):
        cur=s[2:].strip(); wl[cur]=[]; continue
    if cur is None: continue
    if re.match(r'^(1단계|2단계|영영|예문|Phrases)',s): cur=None; continue
    wl[cur].append(s)
def joinp(ls):
    out=''
    for s in ls:
        if not out: out=s
        elif re.match(r'^(n|v|a|adv|prep|conj|pron|int)\.',s) or s.startswith('('): out+=' '+s
        elif out.endswith(',') or out.endswith(';') or out.endswith(')'): out+=' '+s
        else: out+=s   # 단어 중간에서 줄바꿈 (생각/하다)
    return out
fixed=[]
for x in d:
    if x['pos'].strip() and x['en'] in wl and wl[x['en']]:
        full=joinp(wl[x['en']])
        main=re.sub(r'\s*\(\w+ [–-] .*\)$','',full).strip()
        main=re.sub(r'Phrase List.*$','',main).strip().replace('덮는얇은','덮는 얇은').replace('2.54센티미터','2.54 센티미터')
        if main!=x['pos'].strip() and len(main)>len(x['pos'].strip()):
            fixed.append((x['en'],x['pos'],main)); x['pos']=main
            ko=re.sub(r'\b(n|v|a|adv|prep|conj|pron|int)\.\s*','',main)
            ko=re.sub(r'\s+',' ',ko).strip().replace(' ,',',')
            # 품사 경계 공백 → 쉼표
            parts=re.split(r'\s(?=(?:n|v|a|adv|prep|conj|pron|int)\.)',main)
            ko=', '.join(re.sub(r'^(n|v|a|adv|prep|conj|pron|int)\.\s*','',p).strip().rstrip(',') for p in parts)
            x['ko']=ko
# 2) 예문 해석 칸 정리
names=0
for x in d:
    ex=x.get('ex')
    if not ex or len(ex)<2: continue
    ko=ex[1]
    ko=re.split(r'\s*예문\s',ko)[0]
    ko=re.sub(r'\s*Phrases in Use.*$','',ko).strip()
    en=ex[0].strip()
    m=re.search(r'\s([A-Z][A-Za-z’\']*)$',en)
    if m and re.match(r'^[은는이가을를의와과도에]',ko) and not re.search(r'[.?!]$',en):
        en=en[:m.start()].strip(); ko=m.group(1)+ko; names+=1
    x['ex']=[en,ko]+ex[2:]
# 3) 영영 정의 오염
for x in d:
    ee=x.get('ee')
    if ee:
        ee['defs']=[df for df in ee['defs'] if df[0].strip() and not re.search(r'SYN|OPP',df[0])]
        for df in ee['defs']:
            df[0]=df[0].replace('​','').strip(); df[1]=re.sub(r'\s*(SYN|OPP)\b.*$','',df[1].replace('​','')).strip()
json.dump(d,open('bs8/bs8_data.json','w'),ensure_ascii=False,indent=1)
for f in fixed: print('POS',f)
print('names moved',names)
