# 중1 동아(윤정미) 7과 [03]WORD TEST (HWP → hwp2txt 텍스트) → voca.js용 data json
# 중3 PDF용 lib/parse_wt.py + build_data.py 대신 쓰는 이 세트 전용 파서 (출력 형식은 같음: {no,en,ko,pos,extra,ee,ex})
#  1) 교과서 어휘 목록 (CONVERSATION│대화문 / READING│본문): word<TAB>POS. 뜻 · 불규칙 변화는 다음 줄 (a-b-c)
#     · 구(phrase)는 뜻이 다음 줄로 넘어가거나 탭 없이 이어짐 · 'sound n. 소리;' 처럼 뜻이 다음 줄(v. ~)로 이어짐
#  2) 필수단어 예문: 머리 줄 + 'English sentence. 한국어 해석.' 한 줄
#  3) 필수단어 영영풀이: 머리 줄 + 'english definition 한국어 풀이' 한 줄
#  4) 유의어/반의어: 표 형태가 줄마다 흩어져 있어 원문을 보고 아래 SYNOPP에 옮겨 적음
#  중복: 'a lot of'(대화문·본문 두 번) → 하나로 · 'sound'(대화문 v. ~처럼 들리다 / 본문 n. 소리; v. ~하게 들리다) → 대화문 자리 하나로 합침
import json, re, sys

src, dst = sys.argv[1], sys.argv[2]
s = open(src, encoding='utf-8').read().replace('\r', '')
POSRE = r'(?:n|v|a|adv|prep|pron|conj|int)\.'
HAN = re.compile(r'[가-힣]')

def split_head(line):
    """머리 줄 → (en, meaning or None)"""
    line = line.rstrip()
    if '\t' in line:
        en, rest = line.split('\t', 1)
        return en.strip(), rest.strip() or None
    m = re.match(r'^(.*?)\s+(' + POSRE + r'.*)$', line)
    if m and not HAN.search(m.group(1)):
        return m.group(1).strip(), m.group(2).strip()
    m = re.match(r'^(.*?)\s+(~?\s*[가-힣].*)$', line)
    if m:
        return m.group(1).strip(), m.group(2).strip()
    return line.strip(), None

def clean_en(en):
    return re.sub(r'\s*~$', '', en.strip()).strip()

# ---------- 1. 어휘 목록 ----------
a = s.index('교과서 어휘 목록'); b = s.index('필수단어 예문')
lines = [l for l in s[a:b].split('\n')[1:]]
items = []
i = 0
while i < len(lines):
    l = lines[i].strip()
    i += 1
    if not l or '│' in l:
        continue
    en, mean = split_head(lines[i - 1])
    if mean is None:  # 뜻이 다음 줄
        while i < len(lines) and not lines[i].strip(): i += 1
        mean = lines[i].strip(); i += 1
    extra = ''
    # 이어지는 줄: 불규칙 변화 (a-b-c) / 품사 뜻 계속 (v. ~)
    while i < len(lines):
        nx = lines[i].strip()
        if re.match(r'^\([a-z]+-[a-z]+-[a-z]+\)$', nx):
            extra = '(' + ' – '.join(nx[1:-1].split('-')) + ')'; i += 1; continue
        if mean.endswith(';') and re.match(POSRE, nx):
            mean = mean[:-1] + ' ' + nx; i += 1; continue
        break
    items.append({'en': clean_en(en), 'mean': re.sub(r'\s+', ' ', mean).strip(), 'extra': extra})

# 중복 정리
seen = {}; out = []
for it in items:
    k = it['en']
    if k in seen:
        if k == 'sound':  # 대화문 sound(v. ~처럼 들리다) 자리에 본문 뜻(n. 소리) 합침
            seen[k]['mean'] = 'v. ~처럼[~하게] 들리다 n. 소리'
        continue
    seen[k] = it; out.append(it)
items = out

def pos_ko(mean):
    if re.match(POSRE, mean):
        ko = re.sub(r'\s*' + POSRE + r'\s*', ', ', mean).strip(', ').strip()
        ko = re.sub(r',\s*,', ',', ko)
        return mean, ko
    return '', mean

# ---------- 2. 예문 ----------
c = s.index('필수단어 영영풀이')
ex = {}
el = [l.strip() for l in s[b:c].split('\n')]
for j, l in enumerate(el):
    if not l or j + 1 >= len(el): continue
    nx = el[j + 1]
    if HAN.search(nx) and re.match(r'^[A-Z]', nx) and not re.match(r'^[A-Z][a-z]* ?(' + POSRE + ')', nx):
        en, _ = split_head(l)
        # 영어 문장 끝(. ? !) 뒤 첫 한글 시작 위치에서 나눔
        m = re.match(r'^(.*?[.?!])\s+(\S*[가-힣].*)$', nx)
        if m and en and not HAN.search(en[:1]):
            ex.setdefault(clean_en(en), [m.group(1).strip(), m.group(2).strip()])

# ---------- 3. 영영풀이 ----------
d = s.index('다의어&유의어/반의어')
ee = {}
dl = [l.strip() for l in s[c:d].split('\n')]
for j, l in enumerate(dl):
    if not l or j + 1 >= len(dl) or '│' in l: continue
    en = clean_en(split_head(l)[0])
    if en not in seen: continue  # 머리 줄 = 어휘 목록에 있는 단어
    m = re.match(r'^([a-z][^가-힣]*?)\s+([가-힣~].*)$', dl[j + 1])
    if m: ee.setdefault(en, [m.group(1).strip(), m.group(2).strip()])

# ---------- 4. 유의어 / 반의어 (원문 표 → 수동 옮김) ----------
SYNOPP = {
    'create': ('make', ''), 'find': ('discover', ''), 'beach': ('seaside, seashore', ''), 'place': ('site, location', ''),
    'easy': ('', 'difficult'), 'be in charge of': ('be responsible for', ''), 'take care of': ('look after', ''),
    'for a long time': ('', 'for a moment'), 'sometimes': ('occasionally', ''), 'signal': ('sign', ''),
    'calm': ('', 'excite'), 'wrangler': ('trainer', ''), 'film': ('movie', ''), 'begin': ('start', 'end, finish'),
    'delete': ('erase', ''), 'carefully': ('', 'carelessly'), 'real': ('', 'fake'),
}

data = []
for n, it in enumerate(items, 1):
    pos, ko = pos_ko(it['mean'])
    e = ee.get(it['en'])
    so = SYNOPP.get(it['en'], ('', ''))
    data.append({'no': n, 'en': it['en'], 'ko': ko, 'pos': pos, 'extra': it['extra'],
                 'ee': {'defs': [e], 'syn': so[0], 'opp': so[1], 'ko_head': ko} if e else None,
                 'ex': ex.get(it['en'])})
json.dump(data, open(dst, 'w', encoding='utf-8'), ensure_ascii=False, indent=1)
print(len(data), 'ee', sum(1 for x in data if x['ee']), 'ex', sum(1 for x in data if x['ex']))
miss_ee = [k for k in ee if k not in seen]; miss_ex = [k for k in ex if k not in seen]
print('ee not in list:', miss_ee, ' ex not in list:', miss_ex)
for x in data:
    print(x['no'], x['en'], '|', x['pos'] or '(phr) ' + x['ko'], '|', x['extra'], '|', (x['ee']['defs'][0][0][:40] if x['ee'] else '-'), '|', ('ex' if x['ex'] else '-'))
