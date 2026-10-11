from PIL import Image, ImageDraw, ImageFont
import sys
import os; FD = os.path.join(os.path.dirname(os.path.abspath(__file__)), 'fonts') + '/'
def f(w, s): return ImageFont.truetype(FD + f'Pretendard-{w}.otf', s)
INK, CORAL, BG, GREY = (17,17,17), (224,65,58), (245,247,251), (110,110,110)
W, H = 1400, 900
im = Image.new('RGB', (W, H), BG); d = ImageDraw.Draw(im)
d.text((40, 28), '분사구문 — 부사절을 줄이는 3단계', font=f('Bold', 40), fill=INK)
d.line((40, 88, W-40, 88), fill=CORAL, width=4)
steps = [('① ______ 지우기', 'When'), ('② 같은 ______ 지우기', 'I'), ('③ 동사 → ______', 'walked → walking')]
for i,(a,b) in enumerate(steps):
    x = 40 + i*450
    d.rounded_rectangle((x,120,x+420,250), 20, fill=(255,255,255), outline=INK, width=2)
    d.text((x+210,165), a, font=f('Bold',32), fill=INK, anchor='mm')
    d.text((x+210,215), b, font=f('Medium',26), fill=GREY, anchor='mm')
d.text((40, 285), '의미 6가지:  ____ · ____ · ____ · ____ · 동시동작 · 연속동작', font=f('SemiBold', 32), fill=INK)
rows = [('부정', 'Not / Never + 분사  (위치: 분사 ______)'),
        ('수동', '(Being) + ______  →  Seen from the sky, …'),
        ('완료', '______ + p.p.  =  주절보다 먼저'),
        ('주어 다름', '주어 ______  →  It being rainy, …'),
        ('with', 'with + 명사 + -ing(______) / p.p.(______)')]
for j,(k,v) in enumerate(rows):
    y = 350 + j*105
    d.rounded_rectangle((40,y,300,y+85), 16, fill=(255,235,233), outline=CORAL, width=3)
    d.text((170,y+42), k, font=f('Bold',30), fill=CORAL, anchor='mm')
    d.rounded_rectangle((320,y,W-40,y+85), 16, fill=(255,255,255), outline=INK, width=2)
    d.text((345,y+42), v, font=f('SemiBold',29), fill=INK, anchor='lm')
im.save(sys.argv[1])
