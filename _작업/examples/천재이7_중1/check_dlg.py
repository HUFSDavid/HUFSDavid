# 대화 _report.json 정답 패턴 검사 (TF 교대·2-2 교대·4연속, s6 패턴, 고난도 답, missAnchor)
import json, re, sys
R = json.load(open(sys.argv[1], encoding="utf-8"))
bad = []
tf = R["tf"]
if re.search(r"TFTF|FTFT", tf): bad.append("TF 1-1 교대")
if re.search(r"TTTT|FFFF", tf): bad.append("TF 4연속")
if re.search(r"TTFFTT|FFTTFF", tf): bad.append("TF 2-2 교대")
s6 = R["s6"]
for i in range(len(s6) - 2):
    a, b, c = s6[i:i + 3]
    if a == b == c: bad.append("s6 같은 번호 3연속")
    if b - a == 1 and c - b == 1: bad.append("s6 ①②③ 순차")
    if a - b == 1 and b - c == 1: bad.append("s6 역순 3연속")
if s6 == list(range(1, len(s6) + 1)): bad.append("s6 문항순=정답순")
for i in range(len(s6) - 3):
    if len(set(s6[i:i + 4])) == 1: bad.append("s6 같은 답 4연속")
hard = R["hard"]
for i in range(len(hard) - 2):
    if hard[i] == hard[i + 1] == hard[i + 2]: bad.append("고난도 같은 답 3연속")
if R.get("missAnchor"): bad.append("missAnchor " + str(R["missAnchor"]))
print("tf", tf, "s6", s6, "hard", hard, "s4", R.get("s4ans"))
print("OK" if not bad else "BAD: " + ", ".join(sorted(set(bad))))
