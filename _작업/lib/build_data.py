import json,re,sys
def build(j):
    d=json.load(open(j))
    words=[it['en'] for it in d['items']]
    pos={}
    for pl in d['poslist']:
        s=pl[0]; m=re.match(r'(.+?)\s+((?:n|v|a|adv|conj|prep|pron|int)\..*)$',s)
        if m: pos.setdefault(m.group(1).strip(),(m.group(2).strip(),' '.join(pl[1:])))
        else: pos.setdefault(s.strip(),('',' '.join(pl[1:])))
    ee={}
    for head,v in d['ee'].items():
        defs=[x for x in v['defs'] if not re.match(r'\d+\.',x[0])]
        syn,opp=v['syn'],v['opp']
        for x in [x for x in defs if re.match(r'(SYN|OPP)\s',x[0])]:
            t=re.sub(r'^(SYN|OPP)\s+','',x[0]).strip()
            if x[0].startswith('SYN'): syn=syn or t
            else: opp=opp or t
        defs=[x for x in defs if not re.match(r'(SYN|OPP)\s',x[0])]  # v1.1: 정의 칸에 섞인 SYN/OPP 줄 분리
        if not defs: continue
        w=max([w for w in words if head==w or head.startswith(w+' ')],key=len,default=None)
        if w and w not in ee: ee[w]={'defs':defs,'syn':syn,'opp':opp,'ko_head':head[len(w):].strip()}
    out=[]
    for it in d['items']:
        w=it['en']; p=pos.get(w,('',''))
        ex=d['ex'].get(w)
        out.append({'no':it['no'],'en':w,'ko':it['ko'],'pos':p[0],'extra':p[1],'ee':ee.get(w),'ex':ex})
    return out
if __name__=='__main__':
    o=build(sys.argv[1]); json.dump(o,open(sys.argv[2],'w'),ensure_ascii=False,indent=1)
    print(len(o),'ee',sum(1 for x in o if x['ee']),'ex',sum(1 for x in o if x['ex']))
    for x in o: print(x['no'],x['en'],'|',x['pos'][:40],'|',(x['ee']['defs'][0][0] if x['ee'] else '-'),'|',('ex' if x['ex'] else '-'))
