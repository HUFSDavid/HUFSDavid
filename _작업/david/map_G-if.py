from PIL import Image, ImageDraw, ImageFont
import sys
import os; FD = os.path.join(os.path.dirname(os.path.abspath(__file__)), 'fonts') + '/'
def f(w, s): return ImageFont.truetype(FD + f'Pretendard-{w}.otf', s)
INK, CORAL, BG, GREY = (17,17,17), (224,65,58), (245,247,251), (110,110,110)
W, H = 1400, 960
im = Image.new('RGB', (W, H), BG); d = ImageDraw.Draw(im)
d.text((40, 28), 'if — ‘~인지’일까, ‘~라면’일까?', font=f('Bold', 40), fill=INK)
d.line((40, 88, W-40, 88), fill=CORAL, width=4)
# 두 갈래 박스
boxes = [('명사절 if = ~______ (아닌지)', ['know · ask · wonder · check의 목적어', 'whether로 바꾸기 ○', '미래 → ______ 그대로'], (255,235,233), CORAL),
         ('부사절 if = 만약 ~______', ['문장 전체를 꾸미는 조건', 'whether로 바꾸기 ✗', '미래 → ______ 시제로'], (255,255,255), INK)]
bw = (W - 80 - 40) // 2; x = 40
for (t, lines, fill, oc) in boxes:
    d.rounded_rectangle((x, 112, x+bw, 330), 20, fill=fill, outline=oc, width=3 if oc == CORAL else 2)
    d.text((x+bw/2, 152), t, font=f('Bold', 32), fill=oc, anchor='mm')
    for j, l in enumerate(lines):
        d.text((x+40, 205 + j*42), '• ' + l, font=f('SemiBold', 27), fill=INK)
    x += bw + 40
rows = [('어순', 'I wonder if ______ ______ my ball.  (if will he ✗ · if does she ✗)'),
        ('whether만', '주어 · 보어 · ______ 뒤 · to부정사 앞 · or not 바로 앞'),
        ('or not', 'whether or not ○  /  if or not ______  /  if ~ or not (절 끝) ○'),
        ('시제', 'I wonder if it ______ tomorrow.  ↔  If it ______ tomorrow, we’ll stay.'),
        ('양보', '______ you like it or not, I’m going to buy it. (~이든 아니든)'),
        ('본문', 'You also have to check ______ they are based on facts.')]
for j, (k, v) in enumerate(rows):
    y = 360 + j*96
    d.rounded_rectangle((40, y, 270, y+78), 16, fill=(255,235,233), outline=CORAL, width=3)
    d.text((155, y+39), k, font=f('Bold', 28), fill=CORAL, anchor='mm')
    d.rounded_rectangle((290, y, W-40, y+78), 16, fill=(255,255,255), outline=INK, width=2)
    d.text((315, y+39), v, font=f('SemiBold', 27), fill=INK, anchor='lm')
im.save(sys.argv[1])
