# DAVID'S MAP — 비인칭 주어 it 백지노트 (빈칸 도식 · 암기법은 넣지 않음)
from PIL import Image, ImageDraw, ImageFont
import sys
import os; FD = os.path.join(os.path.dirname(os.path.abspath(__file__)), 'fonts') + '/'
def f(w, s): return ImageFont.truetype(FD + f'Pretendard-{w}.otf', s)
INK, CORAL, BG, GREY = (17,17,17), (224,65,58), (245,247,251), (110,110,110)
W, H = 1400, 1030
im = Image.new('RGB', (W, H), BG); d = ImageDraw.Draw(im)
d.text((40, 28), '비인칭 주어 it — 뜻 없이 주어 자리를 채운다', font=f('Bold', 40), fill=INK)
d.line((40, 88, W-40, 88), fill=CORAL, width=4)
# 본문 문장 상자
tl = [('주어 (해석 ✗)', '______', (255,235,233), CORAL), ('동사', 'was getting', (255,255,255), INK), ('보어', '______', (255,255,255), INK),
      ('', ', and', (245,247,251), BG), ('주어', '______', (255,235,233), CORAL), ('동사', 'started to rain.', (255,255,255), INK)]
bws = [230, 230, 170, 90, 170, 260]; gap = 22; x = 40
for j, (a, b, fill, oc) in enumerate(tl):
    bw = bws[j]
    if oc != BG:
        d.rounded_rectangle((x, 115, x+bw, 245), 20, fill=fill, outline=oc, width=3 if oc == CORAL else 2)
        d.text((x+bw/2, 158), a, font=f('Bold', 26), fill=oc if oc == CORAL else GREY, anchor='mm')
        d.text((x+bw/2, 210), b, font=f('SemiBold', 29), fill=INK if oc == INK else CORAL, anchor='mm')
    else:
        d.text((x+bw/2, 205), b, font=f('SemiBold', 29), fill=INK, anchor='mm')
    x += bw + gap
d.text((40, 272), '날씨 · 시간 · 거리처럼 주어로 세울 물건이 없을 때 → 주어 자리에 ______ (this · that ✗)', font=f('SemiBold', 29), fill=INK)
rows = [('시간 · 날짜', 'What time is it? → ______ 10 o’clock.  ·  It’s December ______.'),
        ('요일 · 계절', 'What ______ is it today? → It’s Monday.  ·  It’s ______ now.'),
        ('날씨', 'It is ______(형용사)  ·  It ______ a lot.(동사)  ·  It is ______(진행형)'),
        ('거리', 'How ______ is it to the station? → It’s 2 km ______ the station.'),
        ('명암 · 시간', 'It was getting ______.(본문)  ·  It ______ about one hour.(걸리다)'),
        ('구별', 'It broke. → It = ______ (대명사)  ·  ‘그것’을 넣어 말이 되면 ______'),
        ('it vs one', 'She ate the smallest ______.  ·  I need to get a new ______.'),
        ('형태', 'start + ______ = start + ______  ·  get + ______ = ~해지다')]
for j, (k, v) in enumerate(rows):
    y = 330 + j*86
    if k:
        h = 70 if (j == len(rows) - 1 or rows[j+1][0]) else 156
        d.rounded_rectangle((40, y, 290, y+h), 16, fill=(255,235,233), outline=CORAL, width=3)
        d.text((165, y+h/2), k, font=f('Bold', 28), fill=CORAL, anchor='mm')
    d.rounded_rectangle((310, y, W-40, y+70), 16, fill=(255,255,255), outline=INK, width=2)
    d.text((335, y+35), v, font=f('SemiBold', 26), fill=INK, anchor='lm')
im.save(sys.argv[1])
