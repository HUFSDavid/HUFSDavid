# DAVID'S MAP — 수여동사(4형식 ↔ 3형식) 백지노트 (빈칸 도식 · 암기법은 넣지 않음)
from PIL import Image, ImageDraw, ImageFont
import sys
import os; FD = os.path.join(os.path.dirname(os.path.abspath(__file__)), 'fonts') + '/'
def f(w, s): return ImageFont.truetype(FD + f'Pretendard-{w}.otf', s)
INK, CORAL, BG, GREY = (17,17,17), (224,65,58), (245,247,251), (110,110,110)
W, H = 1400, 1030
im = Image.new('RGB', (W, H), BG); d = ImageDraw.Draw(im)
d.text((40, 28), '수여동사 — ~에게 …을 (해) 주다', font=f('Bold', 40), fill=INK)
d.line((40, 88, W-40, 88), fill=CORAL, width=4)
tl = [('주어', 'People', (255,255,255), INK),
      ('수여동사', 'didn’t give', (255,255,255), INK),
      ('간접목적어 (~에게)', '______', (255,235,233), CORAL),
      ('직접목적어 (…을)', 'many likes', (255,235,233), CORAL)]
bws = [230, 260, 330, 348]; gap = 33; x = 40
for j, (a, b, fill, oc) in enumerate(tl):
    bw = bws[j]
    d.rounded_rectangle((x, 115, x+bw, 245), 20, fill=fill, outline=oc, width=3 if oc == CORAL else 2)
    d.text((x+bw/2, 158), a, font=f('Bold', 27), fill=oc if oc == CORAL else GREY, anchor='mm')
    d.text((x+bw/2, 210), b, font=f('SemiBold', 30), fill=INK if oc == INK else CORAL, anchor='mm')
    if j < 3:
        ax = x + bw + 4
        d.line((ax, 180, ax+gap-12, 180), fill=GREY, width=4)
        d.polygon([(ax+gap-14, 170), (ax+gap-2, 180), (ax+gap-14, 190)], fill=GREY)
    x += bw + gap
d.text((40, 272), '3형식: 주어 + 동사 + ______목적어 + 전치사 + ______목적어  →  didn’t give many likes ___ her', font=f('SemiBold', 29), fill=INK)
rows = [('to', 'give · send · ______ · tell · teach · bring · write · sell · lend · pass'),
        ('for', 'make · ______ · cook · get   (Mom bought a bike ___ me.)'),
        ('of', '______ (a question · a favor)   Some students asked a question ___ him.'),
        ('대명사 목적어', 'She sent him it ✗  →  She sent ______ him.  (it · them이면 ___형식만)'),
        ('전치사 ✗', '4형식 간접목적어 앞에는 전치사 ✗: The teacher wrote ______ Christmas cards.'),
        ('형식 구별', '목적어 1개 = ___형식  ·  목적어 2개 = ___형식  ·  to her는 ______목적어 ✗'),
        ('본문', 'At first, people didn’t give ______ many likes.  = … many likes ______ her.'),
        ('', 'Ted made cookies ___ Ms. Brown.  ·  Sumi sent text messages ___ Jiho.')]
for j, (k, v) in enumerate(rows):
    y = 330 + j*86
    if k:
        h = 70 if rows[j+1:j+2] and rows[j+1][0] else 156
        d.rounded_rectangle((40, y, 290, y+h), 16, fill=(255,235,233), outline=CORAL, width=3)
        d.text((165, y+h/2), k, font=f('Bold', 28), fill=CORAL, anchor='mm')
    d.rounded_rectangle((310, y, W-40, y+70), 16, fill=(255,255,255), outline=INK, width=2)
    d.text((335, y+35), v, font=f('SemiBold', 26), fill=INK, anchor='lm')
im.save(sys.argv[1])
