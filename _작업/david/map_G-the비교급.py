from PIL import Image, ImageDraw, ImageFont
import sys
import os; FD = os.path.join(os.path.dirname(os.path.abspath(__file__)), 'fonts') + '/'
def f(w, s): return ImageFont.truetype(FD + f'Pretendard-{w}.otf', s)
INK, CORAL, BG, GREY = (17,17,17), (224,65,58), (245,247,251), (110,110,110)
W, H = 1400, 930
im = Image.new('RGB', (W, H), BG); d = ImageDraw.Draw(im)
d.text((40, 28), 'the + 비교급, the + 비교급 — ~할수록 더 …하다', font=f('Bold', 40), fill=INK)
d.line((40, 88, W-40, 88), fill=CORAL, width=4)
# 문장 구조 4칸
tl = [('The + 비교급', 'The ______', (255,235,233), CORAL),
      ('주어 + 동사', 'your apology is,', (255,255,255), INK),
      ('the + 비교급', 'the ______', (255,235,233), CORAL),
      ('주어 + 동사', 'it will be received.', (255,255,255), INK)]
bws = [285, 315, 285, 336]; gap = 33; x = 40
for j, (a, b, fill, oc) in enumerate(tl):
    bw = bws[j]
    d.rounded_rectangle((x, 115, x+bw, 245), 20, fill=fill, outline=oc, width=3 if oc == CORAL else 2)
    d.text((x+bw/2, 158), a, font=f('Bold', 28), fill=oc if oc == CORAL else GREY, anchor='mm')
    d.text((x+bw/2, 210), b, font=f('SemiBold', 30), fill=INK if oc == INK else CORAL, anchor='mm')
    if j < 3:
        ax = x + bw + 4
        d.line((ax, 180, ax+gap-12, 180), fill=GREY, width=4)
        d.polygon([(ax+gap-14, 170), (ax+gap-2, 180), (ax+gap-14, 190)], fill=GREY)
    x += bw + gap
d.text((40, 272), '원래 문장: your apology is ______ → 비교급 덩어리를 the와 함께 맨 앞으로!', font=f('SemiBold', 30), fill=INK)
rows = [('어순 · 품사', '비교급 덩어리 + 주어 + 동사  (The more your apology is sincere ✗ · more sincerely ✗)'),
        ('비교급 형태', '-er · more + 원급  ·  good → ______  ·  bad → ______  ·  little → ______'),
        ('명사 동반', 'The more ______ you have, the healthier you will be.'),
        ('생략형', 'The sooner, the ______.   ·   The more, the ______.'),
        ('As 전환', '______ your apology is more sincere, it will be received better.'),
        ('오답', 'you get better ✗  ·  the more better ✗  ·  the 빠뜨림 ✗  ·  very more ✗')]
for j, (k, v) in enumerate(rows):
    y = 330 + j*98
    d.rounded_rectangle((40, y, 290, y+80), 16, fill=(255,235,233), outline=CORAL, width=3)
    d.text((165, y+40), k, font=f('Bold', 28), fill=CORAL, anchor='mm')
    d.rounded_rectangle((310, y, W-40, y+80), 16, fill=(255,255,255), outline=INK, width=2)
    d.text((335, y+40), v, font=f('SemiBold', 27), fill=INK, anchor='lm')
im.save(sys.argv[1])
