# DAVID'S MAP — 감각동사 + 형용사 백지노트 (빈칸 도식 · 암기법은 넣지 않음)
from PIL import Image, ImageDraw, ImageFont
import sys
import os; FD = os.path.join(os.path.dirname(os.path.abspath(__file__)), 'fonts') + '/'
def f(w, s): return ImageFont.truetype(FD + f'Pretendard-{w}.otf', s)
INK, CORAL, BG, GREY = (17,17,17), (224,65,58), (245,247,251), (110,110,110)
W, H = 1400, 1030
im = Image.new('RGB', (W, H), BG); d = ImageDraw.Draw(im)
d.text((40, 28), '감각동사 — look · smell · taste · sound · feel + ______', font=f('Bold', 40), fill=INK)
d.line((40, 88, W-40, 88), fill=CORAL, width=4)
tl = [('주어', 'The soup', (255,255,255), INK),
      ('감각동사', 'smells', (255,255,255), INK),
      ('보어 (______사)', '______', (255,235,233), CORAL),
      ('부사', 'deliciously ✗', (255,235,233), CORAL)]
bws = [230, 260, 330, 348]; gap = 33; x = 40
for j, (a, b, fill, oc) in enumerate(tl):
    bw = bws[j]
    d.rounded_rectangle((x, 115, x+bw, 245), 20, fill=fill, outline=oc, width=3 if oc == CORAL else 2)
    d.text((x+bw/2, 158), a, font=f('Bold', 27), fill=oc if oc == CORAL else GREY, anchor='mm')
    d.text((x+bw/2, 210), b, font=f('SemiBold', 30), fill=INK if oc == INK else CORAL, anchor='mm')
    if j < 2:
        ax = x + bw + 4
        d.line((ax, 180, ax+gap-12, 180), fill=GREY, width=4)
        d.polygon([(ax+gap-14, 170), (ax+gap-2, 180), (ax+gap-14, 190)], fill=GREY)
    x += bw + gap
d.text((40, 272), 'be동사로 바꿔 보기: The soup smells delicious.  =  The soup ___ delicious.  (주어 = 상태)', font=f('SemiBold', 29), fill=INK)
rows = [('다섯 감각', 'look ~하게 보이다 · ______ ~한 냄새가 나다 · taste ~한 맛이 나다 · ______ · feel'),
        ('본문', 'Do you feel ______ now?   ·   It will taste ______!  (good의 비교급)'),
        ('부사 ✗', 'These oranges taste sour (______ ✗)   ·   The cookies smelled good (______ ✗)'),
        ('-ly 형용사', 'friendly · ______ · lonely → -ly여도 ______사:  She looks lovely. ○'),
        ('일반동사', 'smile ______ · sing beautifully · taste the soup ______ (맛보다)'),
        ('and 연결', 'It looked pretty and ______.   They tasted sweetly(✗ → ______) and fruity.'),
        ('like + 명사', 'Hotteok looks ______ pancakes.   That sounds like a good ______.'),
        ('like ✗', 'The room smells like strange ✗  →  The room smells ______.')]
for j, (k, v) in enumerate(rows):
    y = 330 + j*86
    d.rounded_rectangle((40, y, 290, y+70), 16, fill=(255,235,233), outline=CORAL, width=3)
    d.text((165, y+35), k, font=f('Bold', 28), fill=CORAL, anchor='mm')
    d.rounded_rectangle((310, y, W-40, y+70), 16, fill=(255,255,255), outline=INK, width=2)
    d.text((335, y+35), v, font=f('SemiBold', 26), fill=INK, anchor='lm')
im.save(sys.argv[1])
