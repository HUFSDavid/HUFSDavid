# choice (A / B) 문항의 정답 위치를 패턴 없는 배열로 맞춤 — 가장 적게 바꾸는 배열을 골라 괄호 속 두 선택지 순서만 뒤집음
import re, sys, itertools, json, subprocess
js = sys.argv[1]
bad = lambda s: re.search(r'AAA|BBB|ABAB|BABA|AABBAA|BBAABB', s)
out = subprocess.run(['node', 'examples/동아윤7_중1/check_grammar.js', js], capture_output=True, text=True).stdout
src = open(js).read()
# choice 블록 단위로 q 목록 추출
blocks = re.findall(r"type: 'choice'.*?items: \[(.*?)\] \}", src, re.S)
for blk in blocks:
    qs = re.findall(r"\{ q: '(.*?)', a: '(.*?)'", blk)
    cur = ''
    for q, a in qs:
        m = re.search(r'\(([^()]*?) / ([^()]*?)\)', q)
        cur += 'A' if m.group(1).strip() == a else 'B'
    if not bad(cur): continue
    n = len(cur); best = None
    for bits in itertools.product('AB', repeat=n):
        s = ''.join(bits)
        if bad(s) or abs(s.count('A') - n / 2) > 1: continue
        d = sum(x != y for x, y in zip(s, cur))
        if best is None or d < best[0]: best = (d, s)
    tgt = best[1]
    for (q, a), c, t in zip(qs, cur, tgt):
        if c != t:
            m = re.search(r'\(([^()]*?) / ([^()]*?)\)', q)
            q2 = q[:m.start()] + f'({m.group(2)} / {m.group(1)})' + q[m.end():]
            src = src.replace("{ q: '" + q + "'", "{ q: '" + q2 + "'", 1)
    print(cur, '->', tgt)
open(js, 'w').write(src)
