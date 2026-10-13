from PIL import Image, ImageDraw, ImageFont
import sys
import os; FD = os.path.join(os.path.dirname(os.path.abspath(__file__)), 'fonts') + '/'
def f(w, s): return ImageFont.truetype(FD + f'Pretendard-{w}.otf', s)
INK, CORAL, BG, GREY = (17,17,17), (224,65,58), (245,247,251), (110,110,110)
W, H = 1400, 1030
im = Image.new('RGB', (W, H), BG); d = ImageDraw.Draw(im)
d.text((40, 28), '간접화법 — 남의 말을 ‘내 입장’으로 전하기', font=f('Bold', 40), fill=INK)
d.line((40, 88, W-40, 88), fill=CORAL, width=4)
# 공통 3단계
tl = [('① 전달동사', 'say to → ______', (255,235,233), CORAL),
      ('② 인칭 · 시제', 'I → she · am → ______', (255,255,255), INK),
      ('③ 부사', 'now → ______ · this → that', (255,255,255), INK)]
bw, gap = 400, 60; x = 40
for j, (a, b, fill, oc) in enumerate(tl):
    d.rounded_rectangle((x, 115, x+bw, 245), 20, fill=fill, outline=oc, width=3 if oc == CORAL else 2)
    d.text((x+bw/2, 158), a, font=f('Bold', 30), fill=oc, anchor='mm')
    d.text((x+bw/2, 210), b, font=f('SemiBold', 27), fill=INK if oc == INK else CORAL, anchor='mm')
    if j < 2:
        ax = x + bw + 8
        d.line((ax, 180, ax+gap-16, 180), fill=GREY, width=4)
        d.polygon([(ax+gap-16, 170), (ax+gap-4, 180), (ax+gap-16, 190)], fill=GREY)
    x += bw + gap
d.text((40, 272), '본문: Garcia-Fuller said she ______ teaching her students how to tell fake news …', font=f('SemiBold', 30), fill=INK)
rows = [('평서문', 'She said to me, “I like you.” → She ______ me (that) she liked me.'),
        ('의문사 O', 'He said to me, “Where do you live?” → He asked me where ______ ______.'),
        ('의문사 X', 'He said to me, “Are you OK?” → He asked me ______ / whether I was OK.'),
        ('명령문', 'Mom said to me, “Don’t run.” → Mom told me ______ ______ run.'),
        ('시제 일치', 'will → ______ · can → could · 과거 · 현재완료 → ______ + p.p.'),
        ('부사', 'here → ______ · tomorrow → the ______ day · ago → ______'),
        ('예외', '진리 · 습관 · 전달동사 현재 → ______ 그대로 (The sun rises in the east.)')]
for j, (k, v) in enumerate(rows):
    y = 330 + j*98
    d.rounded_rectangle((40, y, 270, y+80), 16, fill=(255,235,233), outline=CORAL, width=3)
    d.text((155, y+40), k, font=f('Bold', 28), fill=CORAL, anchor='mm')
    d.rounded_rectangle((290, y, W-40, y+80), 16, fill=(255,255,255), outline=INK, width=2)
    d.text((315, y+40), v, font=f('SemiBold', 27), fill=INK, anchor='lm')
im.save(sys.argv[1])
