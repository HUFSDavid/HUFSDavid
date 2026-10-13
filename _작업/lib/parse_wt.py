import subprocess,re,json,sys
H=re.compile(r'[가-힣]')
import pymupdf
_D={}
def raw(f,a,b):
    d=_D.setdefault(f,pymupdf.open(f))
    return ''.join(d[p-1].get_text('text') for p in range(a,b+1))
def npages(f):
    o=subprocess.run(['pdfinfo',f],capture_output=True,text=True).stdout
    return int(re.search(r'Pages:\s+(\d+)',o).group(1))
def clean(t):
    t=re.sub(r'^.*(개정 중3 WORD TEST|동아\(|NE능률|YBM|비상|천재|^\d+$|^- \d+ -$).*$','',t,flags=re.M)
    return t
def split_ko(s):
    m=H.search(s)
    if not m: return s.strip(),''
    # back up to include leading punctuation like '(' 
    i=m.start()
    return s[:i].strip(), s[i:].strip()
def join(lines):
    out=''
    for l in lines:
        if not l.strip(): continue
        l=l.lstrip()
        if out and re.match(r'[A-Za-z,.]',out[-1]) and re.match(r'[A-Za-z]',l[0]) : out+=' '
        out+=l
    return re.sub(r'\s+',' ',out).strip()
def parse(f):
    n=npages(f)
    pg={p:raw(f,p,p) for p in range(1,n+1)}
    def find(pat,start=1):
        for p in range(start,n+1):
            if re.search(pat,pg[p]): return p
    p_t1=find(r'Test 1'); p_t2=find(r'Test 2',p_t1); p_s2=find(r'2단계',p_t2); p_t3=find(r'Test 3',p_s2)
    p_s3=find(r'3단계',p_t3); p_vt=find(r'Vocabulary Test 1',p_s3) or n
    # Test1/Test2
    t1=''.join(pg[p] for p in range(p_t1,p_t2)); t2=''.join(pg[p] for p in range(p_t2,p_s2))
    en=dict((int(a),b.strip()) for a,b in re.findall(r'(\d+)\.\s+(.+?)\1\)',t1))
    ko=dict((int(a),b.strip()) for a,b in re.findall(r'(\d+)\.\s+(.+?)\1\)',t2))
    # word list with POS
    wl=''.join(clean(pg[p]) for p in range(1,p_t1))
    poslist=[]
    cur=None
    for l in wl.splitlines():
        l=l.strip()
        if l.startswith('Ÿ'):
            cur=[l[1:].strip()]; poslist.append(cur)
        elif cur and len(cur)==1 and re.match(r'(n|v|a|adv|conj|prep|pron|int)\.',l): cur[0]+=' '+l
        elif cur and l.startswith('(') : cur.append(l)
    # 예문
    ex={}
    s2=clean(''.join(pg[p] for p in range(p_s2,p_t3)))
    for blk in re.split(r'\n\s*Ÿ ',s2)[1:]:
        lines=blk.split('\n'); head=lines[0]
        body=join(lines[1:])
        m=re.search(r'예문\s+(.*)',body)
        if not m: continue
        e,k=split_ko(m.group(1))
        # head: "word pos. meaning"
        hm=re.match(r'(.+?)\s+((?:n|v|a|adv|conj|prep|pron|int)\.\s.*)$',head.strip())
        w=hm.group(1).strip() if hm else head.split(' ')[0]
        ex.setdefault(w,(e,k))
    # 영영
    ee={}
    s3=clean(''.join(pg[p] for p in range(p_s3,p_vt)))
    s3=re.split(r'\n\s*다의어\s*\n',s3)[0]
    for blk in re.split(r'\n\s*Ÿ ',s3)[1:]:
        lines=blk.split('\n'); head=lines[0].strip()
        syn=re.search(r'SYN\s+(.*?)(?:\s+OPP|$)',head); opp=re.search(r'OPP\s+(.*)$',head)
        headw=re.split(r'\s+(?:SYN|OPP)\s',head)[0]
        body=join(lines[1:])
        defs=[split_ko(d) for d in re.split(r'영영\s+',body) if d.strip()]
        if headw in ee: continue
        ee[headw]={'defs':defs,'syn':syn.group(1).strip() if syn else '','opp':opp.group(1).strip() if opp else ''}
    items=[]
    for i in sorted(en):
        items.append({'no':i,'en':en[i],'ko':ko.get(i,'')})
    return {'items':items,'poslist':poslist,'ex':ex,'ee':ee,'pages':[p_t1,p_t2,p_s2,p_t3,p_s3,p_vt]}
if __name__=='__main__':
    d=parse(sys.argv[1]); json.dump(d,open(sys.argv[2],'w'),ensure_ascii=False,indent=1)
    print(len(d['items']),len(d['ex']),len(d['ee']),d['pages'])
