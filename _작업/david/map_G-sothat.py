from PIL import Image, ImageDraw, ImageFont
import sys
import os; FD = os.path.join(os.path.dirname(os.path.abspath(__file__)), 'fonts') + '/'
def f(w, s): return ImageFont.truetype(FD + f'Pretendard-{w}.otf', s)
INK, CORAL, BG, GREY = (17,17,17), (224,65,58), (245,247,251), (110,110,110)
W, H = 1400, 930
im = Image.new('RGB', (W, H), BG); d = ImageDraw.Draw(im)
d.text((40, 28), 'so that — ~하도록, ~하기 위해서 (목적)', font=f('Bold', 40), fill=INK)
d.line((40, 88, W-40, 88), fill=CORAL, width=4)
# 문장 구조 4칸
tl = [('주절', 'It navigates roads', (255,255,255), INK),
      ('목적 접속사', '______ ______', (255,235,233), CORAL),
      ('주어 (생략 ✗)', 'you', (255,255,255), INK),
      ('조동사 + 동사원형', '______ relax', (255,235,233), CORAL)]
bws = [320, 280, 280, 341]; gap = 33; x = 40
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
d.text((40, 272), '본문: They clear routes so that people can ______ to safety.', font=f('SemiBold', 30), fill=INK)
rows = [('시제 일치', '주절 현재 · 미래 · 명령 → can / will  ·  주절 과거 → ______ / would'),
        ('같은 뜻', 'so that = in ______ that (뒤에 주어 + 동사)'),
        ('주어 같으면', 'to V = in order to V = so ______ to V  (I saved money to buy a car.)'),
        ('주어 다르면', 'in order ______ + 목적격 + to V  (for the baby to sleep)'),
        ('부정', 'so that ~ wouldn’t → in order ______ to = so as not to'),
        ('결과 구별', 'so + 형용사/부사 + that = 매우 ~해서  ·  too ~ to = 너무 ~해서 …할 수 ______')]
for j, (k, v) in enumerate(rows):
    y = 330 + j*98
    d.rounded_rectangle((40, y, 270, y+80), 16, fill=(255,235,233), outline=CORAL, width=3)
    d.text((155, y+40), k, font=f('Bold', 28), fill=CORAL, anchor='mm')
    d.rounded_rectangle((290, y, W-40, y+80), 16, fill=(255,255,255), outline=INK, width=2)
    d.text((315, y+40), v, font=f('SemiBold', 27), fill=INK, anchor='lm')
im.save(sys.argv[1])
