from PIL import Image, ImageDraw, ImageFont
import sys
import os; FD = os.path.join(os.path.dirname(os.path.abspath(__file__)), 'fonts') + '/'
def f(w, s): return ImageFont.truetype(FD + f'Pretendard-{w}.otf', s)
INK, CORAL, BG, GREY = (17,17,17), (224,65,58), (245,247,251), (110,110,110)
W, H = 1400, 930
im = Image.new('RGB', (W, H), BG); d = ImageDraw.Draw(im)
d.text((40, 28), '소유격 관계대명사 whose — 누구의 것이야?', font=f('Bold', 40), fill=INK)
d.line((40, 88, W-40, 88), fill=CORAL, width=4)
# 공식 4칸
parts = [('선행사', '사람 · 사물 · ______'), ('whose', '접속사 + ______'), ('+ 명사', '관사 · 소유격 ✗'), ('+ 동사 ~', '명사에 수 일치')]
ws = [320, 320, 300, 300]; x = 40
for (a, b), w in zip(parts, ws):
    d.rounded_rectangle((x, 115, x+w, 245), 20, fill=(255,255,255), outline=INK, width=2)
    d.text((x+w/2, 160), a, font=f('Bold', 32), fill=INK, anchor='mm')
    d.text((x+w/2, 212), b, font=f('Medium', 26), fill=GREY, anchor='mm')
    x += w + 20
d.text((40, 270), '본문: This small fish ______ favorite food is clams uses a tool to open them.', font=f('SemiBold', 30), fill=INK)
rows = [('연결', 'I met a girl. + Her name is Alicia. → a girl ______ name is Alicia'),
        ('격 구별', '뒤에 동사 → ______ / 주어+동사 → 목적격 / 명사+동사 → whose'),
        ('that', '소유격 that은 ______  (a cap that color is blue ✗)'),
        ('of which', 'the house of which ______ roof is red  (사물 · 동물만)'),
        ('목적어', 'That is the woman whose life you ______.  (whose + 명사 = 목적어)'),
        ('의문사', '선행사 없음 → ‘______의’ :  I wonder whose idea it is.')]
for j, (k, v) in enumerate(rows):
    y = 330 + j*98
    d.rounded_rectangle((40, y, 250, y+80), 16, fill=(255,235,233), outline=CORAL, width=3)
    d.text((145, y+40), k, font=f('Bold', 30), fill=CORAL, anchor='mm')
    d.rounded_rectangle((270, y, W-40, y+80), 16, fill=(255,255,255), outline=INK, width=2)
    d.text((295, y+40), v, font=f('SemiBold', 28), fill=INK, anchor='lm')
im.save(sys.argv[1])
