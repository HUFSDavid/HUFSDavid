from PIL import Image, ImageDraw, ImageFont
import sys
import os; FD = os.path.join(os.path.dirname(os.path.abspath(__file__)), 'fonts') + '/'
def f(w, s): return ImageFont.truetype(FD + f'Pretendard-{w}.otf', s)
# 중1 동아윤 7과 — to부정사의 부사적 용법 백지노트 MAP (암기법·구호는 넣지 않음: David's Tip은 본문 TRICK 박스에만)
INK, CORAL, BG, GREY = (17,17,17), (224,65,58), (245,247,251), (110,110,110)
W, H = 1400, 1030
im = Image.new('RGB', (W, H), BG); d = ImageDraw.Draw(im)
d.text((40, 28), 'to부정사의 부사적 용법 — 목적 (~하기 위해)', font=f('Bold', 40), fill=INK)
d.line((40, 88, W-40, 88), fill=CORAL, width=4)
tl = [('완전한 문장', 'A lot of people are working hard', (255,255,255), INK),
      ('목적', 'to + ______', (255,235,233), CORAL),
      ('뜻', '~하기 ______', (255,235,233), CORAL)]
bws = [560, 330, 330]; gap = 40; x = 40
for j, (a, b, fill, oc) in enumerate(tl):
    bw = bws[j]
    d.rounded_rectangle((x, 115, x+bw, 245), 20, fill=fill, outline=oc, width=3 if oc == CORAL else 2)
    d.text((x+bw/2, 158), a, font=f('Bold', 28), fill=oc if oc == CORAL else GREY, anchor='mm')
    d.text((x+bw/2, 210), b, font=f('SemiBold', 28), fill=INK if oc == INK else CORAL, anchor='mm')
    if j < 2:
        ax = x + bw + 6
        d.line((ax, 180, ax+gap-14, 180), fill=GREY, width=4)
        d.polygon([(ax+gap-16, 170), (ax+gap-4, 180), (ax+gap-16, 190)], fill=GREY)
    x += bw + gap
d.text((40, 272), 'to부정사(구)를 빼도 문장이 ______하면 부사적 용법 / ‘~하는 것’이면 ______ 용법', font=f('SemiBold', 30), fill=INK)
rows = [('형태', 'to + ______ (to + -ing ✗ · to + 과거형 ✗ · for + 동사 ✗ · for to ✗)'),
        ('위치', '문장 뒤  /  문장 앞 + ______(,)  →  ______ their happy moments, I’m going to use drones.'),
        ('같은 뜻', 'in ______ to + 동사원형  =  so ______ to + 동사원형  =  to + 동사원형'),
        ('부정', '______ to + 동사원형 = ~하지 않기 위해  (to not ✗)'),
        ('부사적 4가지', '목적 · 감정의 ______(glad to) · ______(grew up to be) · 형용사 수식(fun to solve)'),
        ('명사적', 'want to · like to(목적어)  /  My job is to find(______)  /  To learn ~ is(주어)'),
        ('닮은꼴 to', 'to + 장소 = ______  ·  for + ______  ·  be going to + 동사원형 = ______'),
        ('본문', 'I use hand signals ______ him.  /  ______ a better story, I can change ~')]
for j, (k, v) in enumerate(rows):
    y = 330 + j*86
    if k:
        h = 70 if (j + 1 >= len(rows) or rows[j+1][0]) else 156
        d.rounded_rectangle((40, y, 290, y+h), 16, fill=(255,235,233), outline=CORAL, width=3)
        d.text((165, y+h/2), k, font=f('Bold', 28), fill=CORAL, anchor='mm')
    d.rounded_rectangle((310, y, W-40, y+70), 16, fill=(255,255,255), outline=INK, width=2)
    d.text((335, y+35), v, font=f('SemiBold', 26), fill=INK, anchor='lm')
im.save(sys.argv[1])
