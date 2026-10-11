from PIL import Image, ImageDraw, ImageFont
import sys
import os; FD = os.path.join(os.path.dirname(os.path.abspath(__file__)), 'fonts') + '/'
def f(w, s): return ImageFont.truetype(FD + f'Pretendard-{w}.otf', s)
INK, CORAL, BG, GREY = (17,17,17), (224,65,58), (245,247,251), (110,110,110)
PINK, WHITE, BLUE = (255,235,233), (255,255,255), (60,110,190)
W, H = 1400, 1060
im = Image.new('RGB', (W, H), BG); d = ImageDraw.Draw(im)
d.text((40, 28), '부정대명사 — 마지막 남은 것(들)에는 the!', font=f('Bold', 40), fill=INK)
d.line((40, 88, W-40, 88), fill=CORAL, width=4)

def shape(kind, cx, cy, r, col):
    if kind == 'o':
        d.ellipse((cx-r, cy-r, cx+r, cy+r), outline=col, width=4)
    elif kind == 't':
        d.polygon([(cx, cy-r), (cx-r, cy+r*0.8), (cx+r, cy+r*0.8)], outline=col, width=4)
    elif kind == 's':
        import math
        pts = []
        for k in range(10):
            rr = r if k % 2 == 0 else r*0.45
            a = -math.pi/2 + k*math.pi/5
            pts.append((cx + rr*math.cos(a), cy + rr*math.sin(a)))
        d.polygon(pts, outline=col, width=4)

# 4칸: 정해진 둘 / 정해진 셋 / 막연한 다수 / 정해진 다수
cards = [('정해진 둘', [('o', 'one', INK), ('t', '______', CORAL)], 'one ~, the other'),
         ('정해진 셋', [('o', 'one', INK), ('t', '______', CORAL), ('s', 'the other', INK)], ''),
         ('막연한 다수', [('o', 'some', INK), ('t', '______', CORAL)], 'many people …'),
         ('정해진 다수', [('o', 'some', INK), ('t', '______', CORAL)], 'five books …')]
bw, gap = 315, 20; x = 40
for title, items, foot in cards:
    d.rounded_rectangle((x, 112, x+bw, 372), 20, fill=WHITE, outline=INK, width=2)
    d.rounded_rectangle((x, 112, x+bw, 166), 20, fill=PINK, outline=CORAL, width=3)
    d.text((x+bw/2, 139), title, font=f('Bold', 29), fill=CORAL, anchor='mm')
    n = len(items); step = bw / n
    for k, (kind, lab, col) in enumerate(items):
        cx = x + step*k + step/2
        if title == '막연한 다수' or title == '정해진 다수':
            for dx in (-30, 0, 30):
                shape(kind, cx+dx, 222 + (0 if dx == 0 else 10), 14, col)
        else:
            shape(kind, cx, 225, 26, col)
        d.text((cx, 285), lab, font=f('SemiBold', 23 if n == 3 else 27), fill=col, anchor='mm')
    if title == '정해진 다수':
        d.text((x+bw/2, 335), '나머지 전부 → the ______', font=f('Medium', 23), fill=GREY, anchor='mm')
    elif title == '막연한 다수':
        d.text((x+bw/2, 335), '전체 수를 셀 수 없음', font=f('Medium', 23), fill=GREY, anchor='mm')
    elif title == '정해진 셋':
        d.text((x+bw/2, 335), '마지막 하나 → the other', font=f('Medium', 23), fill=GREY, anchor='mm')
    else:
        d.text((x+bw/2, 335), '남은 하나에도 the!', font=f('Medium', 23), fill=GREY, anchor='mm')
    x += bw + gap

rows = [('수 일치', 'the other · another · one → ______동사 / the others · others → 복수동사'),
        ('형용사', 'another + ______명사 (another way) / other + 복수명사 (19 other warriors)'),
        ('others', '= other ______ (다른 사람들) — Be kind to others. / Make Peace with Others'),
        ('one vs it', 'one = a + 명사 (같은 종류 아무거나) / it = ______ + 명사 (바로 그것)'),
        ('본문 ①', 'Some gave Corky angry looks, and ______ shouted at him.'),
        ('본문 ②', 'Corky and ______ began fighting. / “I need to try ______ way.”'),
        ('교과서', 'A: What are the birds doing? B: One is flying, and ______ is sitting on the tree.')]
for j, (k, v) in enumerate(rows):
    y = 400 + j*92
    d.rounded_rectangle((40, y, 250, y+76), 16, fill=PINK, outline=CORAL, width=3)
    d.text((145, y+38), k, font=f('Bold', 27), fill=CORAL, anchor='mm')
    d.rounded_rectangle((270, y, W-40, y+76), 16, fill=WHITE, outline=INK, width=2)
    d.text((292, y+38), v, font=f('SemiBold', 26), fill=INK, anchor='lm')
im.save(sys.argv[1])
