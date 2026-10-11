from PIL import Image, ImageDraw, ImageFont
import sys
import os; FD = os.path.join(os.path.dirname(os.path.abspath(__file__)), 'fonts') + '/'
def f(w, s): return ImageFont.truetype(FD + f'Pretendard-{w}.otf', s)
INK, CORAL, BG, GREY = (17,17,17), (224,65,58), (245,247,251), (110,110,110)
W, H = 1400, 930
im = Image.new('RGB', (W, H), BG); d = ImageDraw.Draw(im)
d.text((40, 28), 'to부정사의 의미상 주어 — 누가 하는 거야?', font=f('Bold', 40), fill=INK)
d.line((40, 88, W-40, 88), fill=CORAL, width=4)
# 공식 4칸
parts = [('It', '______ 주어'), ('is + 형용사', '판단 / 성격'), ('for · of + ______', '의미상 주어'), ('to + 동사원형', '______ 주어')]
ws = [220, 330, 430, 320]; x = 40
for (a, b), w in zip(parts, ws):
    d.rounded_rectangle((x, 115, x+w, 245), 20, fill=(255,255,255), outline=INK, width=2)
    d.text((x+w/2, 160), a, font=f('Bold', 32), fill=INK, anchor='mm')
    d.text((x+w/2, 212), b, font=f('Medium', 26), fill=GREY, anchor='mm')
    x += w + 20
d.text((40, 270), '본문: It was impossible ______ to catch any fish.', font=f('SemiBold', 30), fill=INK)
rows = [('for', '판단 형용사: easy · hard · ______ · necessary · impossible'),
        ('of', '성격 형용사: kind · nice · ______ · foolish · careless · rude'),
        ('생략', '문장 주어·목적어와 ______ 때 / ______일 때  (같·모 생략)'),
        ('too', 'too heavy for me to lift (끝에 ______ ✗) = so heavy that I can’t lift it'),
        ('enough', '형용사 + ______ + for 목 + to V  →  easy enough for kids to read'),
        ('that절', 'It is necessary that you ______ wear = It is necessary for you to wear')]
for j, (k, v) in enumerate(rows):
    y = 330 + j*98
    d.rounded_rectangle((40, y, 250, y+80), 16, fill=(255,235,233), outline=CORAL, width=3)
    d.text((145, y+40), k, font=f('Bold', 30), fill=CORAL, anchor='mm')
    d.rounded_rectangle((270, y, W-40, y+80), 16, fill=(255,255,255), outline=INK, width=2)
    d.text((295, y+40), v, font=f('SemiBold', 28), fill=INK, anchor='lm')
im.save(sys.argv[1])
