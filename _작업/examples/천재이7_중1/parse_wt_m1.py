# 중1 exam4u [03]WORD TEST (HWP → 텍스트, /tmp/m1/hwp2txt.py) 파서
# 중3 PDF용 lib/parse_wt.py 대신 쓴다. 출력은 lib/build_data.py 결과와 같은 모양:
#   [{no, en, ko, pos, extra, ee:{defs:[[en,ko]],syn,opp,ko_head}|null, ex:[en,ko]|null}]
# 구간: '교과서 어휘 목록'(CONVERSATION│대화문 / READING│본문) → '필수단어 예문' → '필수단어 영영풀이' → '다의어&유의어/반의어' → TEST
# 줄 형식: 단어<TAB>품사. 뜻  /  두 줄로 나뉜 뜻(~처럼, n. 게시물 …)은 앞 항목에 잇고, '(find-found-found)' 줄은 extra(불규칙 변화)
# usage: python3 parse_wt_m1.py WT.txt out.json
import json, re, sys

HANGUL = re.compile(r'[가-힣]')
POSRE = re.compile(r'^(n|v|a|adv|prep|conj|pron|aux|int)\.\s')
HEAD_SKIP = {'WORD TEST', '8', '중1', '2022 개정│동아(윤정미)', '2022 개정│동아(윤정미) ', 'CONVERSATION│대화문', 'READING│본문'}

def clean(s):
    return re.sub(r'\s+', ' ', s.replace(' ', ' ')).strip()

def split_word(line):
    """'word<TAB>meaning' 또는 'phrase 한글뜻' → (word, meaning)"""
    if '\t' in line:
        w, m = line.split('\t', 1)
        return clean(w), clean(m)
    m = POSRE.search(line)
    h = HANGUL.search(line)
    # 첫 한글(또는 '(' 로 시작하는 뜻) 앞에서 자르기
    idx = h.start() if h else len(line)
    k = line.rfind('(', 0, idx)
    if k > 0 and line[k - 1] == ' ':
        idx = k
    return clean(line[:idx]), clean(line[idx:])

def is_cont(line):
    s = line.strip()
    if not s:
        return False
    return not re.match(r'[A-Za-z]', s) or bool(POSRE.match(s))

def sections(lines):
    idx = {}
    for i, l in enumerate(lines):
        t = l.strip()
        for key in ('교과서 어휘 목록', '필수단어 예문', '필수단어 영영풀이', '다의어&유의어/반의어', 'TEST1'):
            if t == key and key not in idx:
                idx[key] = i
    return idx

def body(lines, a, b):
    out = []
    for l in lines[a + 1:b]:
        if clean(l) in HEAD_SKIP or not clean(l):
            continue
        out.append(l.rstrip('\n'))
    return out

def parse_list(blk):
    items = []
    for l in blk:
        s = l.strip()
        if s.startswith('(') and items:          # 불규칙 변화 (find-found-found)
            items[-1]['extra'] = clean(s)
            continue
        if is_cont(l) and items:                  # 줄바꿈된 뜻
            prev = items[-1]
            sep = '' if prev['mean'].endswith((',', ';')) is False and not prev['mean'] else ' '
            prev['mean'] = clean(prev['mean'] + ' ' + s) if prev['mean'] else clean(s)
            continue
        w, m = split_word(l)
        items.append({'en': w, 'mean': m, 'extra': ''})
    return items

def pos_ko(mean):
    """'v. 게시하다; n. 게시물' → ko '게시하다; 게시물'"""
    return clean(re.sub(r'(^|;\s*|\s)(n|v|a|adv|prep|conj|pron|aux|int)\.\s', r'\1', mean)).strip('; ').replace(' ;', ';')

def parse_pairs(blk, heads):
    """머리 줄(단어 TAB 뜻) 다음에 영어+한글 줄들 → {word: [[en, ko], ...]}"""
    out, cur = {}, None
    for l in blk:
        s = l.strip()
        hd = max([x for x in heads if s.startswith(x) and re.match(r'\s+([^A-Za-z]|(n|v|a|adv|prep|conj|pron|aux|int)\.\s)', s[len(x):] + ' ')], key=len, default=None)
        if hd and (len(s) - len(hd) < 60 and not re.match(r'[A-Za-z]', s[len(hd):].strip()[:1] or 'x') or POSRE.match(s[len(hd):].strip())):
            cur = hd; out.setdefault(cur, []); continue
        if POSRE.match(s):
            continue  # 머리 줄의 두 번째 품사 줄(n. 게시물 …)
        if cur is None:
            continue
        h = HANGUL.search(s)
        if not h or not re.match(r'[A-Za-z“"‘\'(]', s):
            continue  # 뜻 줄바꿈 조각(n. 게시물 …) 등
        en, ko = s[:h.start()].rstrip(), s[h.start():].strip()
        # 해석이 따옴표로 시작하면(“왜 안 돼?” …) 영어 끝에 붙은 여는 따옴표를 옮김
        mq = re.search(r'([“‘"\'「]+)$', en)
        if mq:
            en, ko = en[:mq.start()].rstrip(), mq.group(1) + ko
        out[cur].append([en, ko])
    return out

def main(src, dst):
    lines = open(src, encoding='utf-8').read().split('\n')
    sec = sections(lines)
    wl = parse_list(body(lines, sec['교과서 어휘 목록'], sec['필수단어 예문']))
    heads = {x['en'] for x in wl}
    ex = parse_pairs(body(lines, sec['필수단어 예문'], sec['필수단어 영영풀이']), heads)
    ee = parse_pairs(body(lines, sec['필수단어 영영풀이'], sec['다의어&유의어/반의어']), heads)
    # 유의어/반의어
    syn, opp = {}, {}
    rel = body(lines, sec['다의어&유의어/반의어'], sec['TEST1'])
    k = next(i for i, l in enumerate(rel) if '2│유의어/반의어' in l)
    rel = rel[k + 1:]
    for i, l in enumerate(rel):
        t = l.strip()
        if t in ('유의어', '반의어') and i > 0:
            w, m = split_word(rel[i - 1])
            m2 = re.split(r'\s{2,}', rel[i - 1].split('\t')[-1].strip())
            other = clean(m2[-1]) if len(m2) > 1 else ''
            other = re.sub(r'\s*[가-힣].*$', '', other).strip()
            (syn if t == '유의어' else opp)[w] = other
    # 중복(work: 대화문 '작동하다' + 본문 '일하다') → 하나로 합침
    merged, seen = [], {}
    for x in wl:
        if x['en'] in seen:
            y = seen[x['en']]
            if x['mean'] not in y['mean']:
                y['mean'] = y['mean'] + '; ' + re.sub(r'^(n|v|a|adv|prep)\.\s', '', x['mean'])
            continue
        seen[x['en']] = x; merged.append(x)
    out = []
    for i, x in enumerate(merged, 1):
        w, mean = x['en'], x['mean']
        isphr = not POSRE.match(mean)
        e = ee.get(w)
        exs = ex.get(w)
        out.append({'no': i, 'en': w, 'ko': pos_ko(mean) if not isphr else mean, 'pos': '' if isphr else mean,
                    'extra': x['extra'],
                    'ee': {'defs': [e[0]], 'syn': syn.get(w, ''), 'opp': opp.get(w, ''), 'ko_head': pos_ko(mean)} if e else None,
                    'ex': exs[0] if exs else None})
    json.dump(out, open(dst, 'w', encoding='utf-8'), ensure_ascii=False, indent=1)
    print(len(out), 'ee', sum(1 for x in out if x['ee']), 'ex', sum(1 for x in out if x['ex']))
    for x in out:
        print(x['no'], x['en'], '|', x['pos'] or ('[구] ' + x['ko']), '|', x['extra'], '|', (x['ee']['defs'][0][0][:40] if x['ee'] else '-'), '|', (x['ex'][0][:30] + ' // ' + x['ex'][1][:15] if x['ex'] else '-'))

if __name__ == '__main__':
    main(sys.argv[1], sys.argv[2])
