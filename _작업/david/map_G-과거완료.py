from PIL import Image, ImageDraw, ImageFont
import sys
import os; FD = os.path.join(os.path.dirname(os.path.abspath(__file__)), 'fonts') + '/'
def f(w, s): return ImageFont.truetype(FD + f'Pretendard-{w}.otf', s)
INK, CORAL, BG, GREY = (17,17,17), (224,65,58), (245,247,251), (110,110,110)
W, H = 1400, 930
im = Image.new('RGB', (W, H), BG); d = ImageDraw.Draw(im)
d.text((40, 28), '과거완료 had p.p. — 과거보다 더 먼저!', font=f('Bold', 40), fill=INK)
d.line((40, 88, W-40, 88), fill=CORAL, width=4)
# 타임라인 3칸
tl = [('대과거 (먼저 일어난 일)', 'had + ______', (255,235,233), CORAL),
      ('과거 (기준 시점)', 'said · arrived · found', (255,255,255), INK),
      ('현재 (지금)', '______ + p.p. (현재완료)', (255,255,255), INK)]
bw, gap = 400, 60; x = 40
for j, (a, b, fill, oc) in enumerate(tl):
    d.rounded_rectangle((x, 115, x+bw, 245), 20, fill=fill, outline=oc, width=3 if oc == CORAL else 2)
    d.text((x+bw/2, 158), a, font=f('Bold', 30), fill=oc, anchor='mm')
    d.text((x+bw/2, 210), b, font=f('SemiBold', 28), fill=INK if oc == INK else CORAL, anchor='mm')
    if j < 2:
        ax = x + bw + 8
        d.line((ax, 180, ax+gap-16, 180), fill=GREY, width=4)
        d.polygon([(ax+gap-16, 170), (ax+gap-4, 180), (ax+gap-16, 190)], fill=GREY)
    x += bw + gap
d.text((40, 272), '본문: The article said Alfred Nobel ______ in France from a heart attack.', font=f('SemiBold', 30), fill=INK)
rows = [('용법', '완료 already · 경험 ______ · 계속 for / since · 결과 (~해 버려서)'),
        ('간접화법', 'He said, “I lost my key.” → He said (that) he ______ his key.'),
        ('before/after', '순서가 분명하면 ______ 시제로 대신 가능'),
        ('나중 일', 'I had played baseball after I ate dinner. ✗ → 나중 일은 ______'),
        ('by the time', 'By the time the police ______, the thieves had already run away.'),
        ('진행', '과거완료 진행: had been + ______  (I had been reading …)')]
for j, (k, v) in enumerate(rows):
    y = 330 + j*98
    d.rounded_rectangle((40, y, 270, y+80), 16, fill=(255,235,233), outline=CORAL, width=3)
    d.text((155, y+40), k, font=f('Bold', 28), fill=CORAL, anchor='mm')
    d.rounded_rectangle((290, y, W-40, y+80), 16, fill=(255,255,255), outline=INK, width=2)
    d.text((315, y+40), v, font=f('SemiBold', 27), fill=INK, anchor='lm')
im.save(sys.argv[1])
