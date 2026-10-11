from PIL import Image, ImageDraw, ImageFont
import sys
import os; FD = os.path.join(os.path.dirname(os.path.abspath(__file__)), 'fonts') + '/'
def f(w, s): return ImageFont.truetype(FD + f'Pretendard-{w}.otf', s)
INK, CORAL, BG, GREY = (17,17,17), (224,65,58), (245,247,251), (110,110,110)
W, H = 1400, 930
im = Image.new('RGB', (W, H), BG); d = ImageDraw.Draw(im)
d.text((40, 28), 'with + 명사 + 분사 — ~한 채로, ~하면서 (부대상황)', font=f('Bold', 40), fill=INK)
d.line((40, 88, W-40, 88), fill=CORAL, width=4)
# 문장 구조 4칸
tl = [('주절', 'Wormholes may contain ...', (255,255,255), INK),
      ('부대상황', '______', (255,235,233), CORAL),
      ('명사 (판단 기준)', 'a throat', (255,255,255), INK),
      ('명사의 상태', '______ the two', (255,235,233), CORAL)]
bws = [380, 230, 280, 331]; gap = 33; x = 40
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
d.text((40, 272), '본문: Take the paper and fold it with the dots ______ up.', font=f('SemiBold', 30), fill=INK)
rows = [('능동', '명사가 직접 ~함 → ______분사 (-ing)  ·  with tears falling down her cheeks'),
        ('수동', '명사가 ~됨 → ______분사 (p.p.)  ·  with his arms folded / her legs ______'),
        ('형용사 · 부사', 'with her mouth ______  ·  with your shoes ______  ·  with the lights off'),
        ('전치사구', 'with a book ______ her hand  ·  with my hands in my pockets'),
        ('분사구문 비교', 'She sat, ______ her legs. = She sat with her legs crossed.'),
        ('오답', 'with eyes closing ✗  ·  by the TV turned on ✗  ·  with his eyes shined ✗')]
for j, (k, v) in enumerate(rows):
    y = 330 + j*98
    d.rounded_rectangle((40, y, 290, y+80), 16, fill=(255,235,233), outline=CORAL, width=3)
    d.text((165, y+40), k, font=f('Bold', 28), fill=CORAL, anchor='mm')
    d.rounded_rectangle((310, y, W-40, y+80), 16, fill=(255,255,255), outline=INK, width=2)
    d.text((335, y+40), v, font=f('SemiBold', 27), fill=INK, anchor='lm')
im.save(sys.argv[1])
