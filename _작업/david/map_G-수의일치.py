from PIL import Image, ImageDraw, ImageFont
import sys
import os; FD = os.path.join(os.path.dirname(os.path.abspath(__file__)), 'fonts') + '/'
def f(w, s): return ImageFont.truetype(FD + f'Pretendard-{w}.otf', s)
INK, CORAL, BG, GREY = (17,17,17), (224,65,58), (245,247,251), (110,110,110)
W, H = 1400, 930
im = Image.new('RGB', (W, H), BG); d = ImageDraw.Draw(im)
d.text((40, 28), '수의 일치 — 동사는 ‘진짜 주어’를 따라간다', font=f('Bold', 40), fill=INK)
d.line((40, 88, W-40, 88), fill=CORAL, width=4)
# 문장 구조 4칸 (본문 문장)
tl = [('부분 표현', 'more than half of', (255,255,255), INK),
      ('of 뒤 명사 = 기준', '______ ______', (255,235,233), CORAL),
      ('수식어구 (괄호)', 'on his soccer team', (255,255,255), INK),
      ('동사', '______ them', (255,235,233), CORAL)]
bws = [320, 280, 320, 301]; gap = 33; x = 40
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
d.text((40, 272), '본문: Most of her money ______ spent on buying the new items.', font=f('SemiBold', 30), fill=INK)
rows = [('부분 표현', 'half · most · all · some · 분수 · percent of + 명사 → of ______ 명사에 일치'),
        ('항상 단수', 'each · every · one of + 명사  /  the ______ of + 복수명사 (~의 수)'),
        ('항상 복수', 'a number of + 복수명사 (= many, 많은) → ______ 동사'),
        ('명사구 주어', '동명사 · to부정사 · 명사절 → 단수: Purchasing a new item often ______'),
        ('수식어구', 'the difference (of the two prices) ______ bigger — 괄호 밖이 주어'),
        ('관계대명사', 'a wagon that ______ people  ·  new pants that go — 선행사에 일치')]
for j, (k, v) in enumerate(rows):
    y = 330 + j*98
    d.rounded_rectangle((40, y, 270, y+80), 16, fill=(255,235,233), outline=CORAL, width=3)
    d.text((155, y+40), k, font=f('Bold', 28), fill=CORAL, anchor='mm')
    d.rounded_rectangle((290, y, W-40, y+80), 16, fill=(255,255,255), outline=INK, width=2)
    d.text((315, y+40), v, font=f('SemiBold', 27), fill=INK, anchor='lm')
    r = d.textbbox((315, y+40), v, font=f('SemiBold', 27), anchor='lm')[2]
    if r > W-55: print('OVERFLOW row', j, r, file=sys.stderr)
im.save(sys.argv[1])
