"""DAVID'S MAP 도식 PNG 생성 (Pretendard) — 공통 틀 견본용 미니 도식"""
from PIL import Image, ImageDraw, ImageFont
import sys

import os; FD = os.path.join(os.path.dirname(os.path.abspath(__file__)), 'fonts') + '/'
def f(w, s): return ImageFont.truetype(FD + f'Pretendard-{w}.otf', s)

INK, CORAL, BG = (17, 17, 17), (224, 65, 58), (245, 247, 251)
W, H = 1400, 620
im = Image.new('RGB', (W, H), BG)
d = ImageDraw.Draw(im)
d.text((40, 30), '부사 — 명사 빼고 다 꾸민다', font=f('Bold', 40), fill=INK)
d.line((40, 90, W - 40, 90), fill=CORAL, width=4)

boxes = [('동사', 'run fast', (200, 230, 200)), ('형용사', 'very kind', (255, 214, 210)),
         ('다른 부사', 'really well', (220, 214, 245)), ('문장 전체', 'Luckily, ...', (206, 226, 250))]
bw, gap = 300, 26
for i, (h, ex, col) in enumerate(boxes):
    x = 40 + i * (bw + gap)
    d.rounded_rectangle((x, 130, x + bw, 290), 22, fill=col, outline=INK, width=2)
    d.text((x + bw / 2, 180), h, font=f('Bold', 34), fill=INK, anchor='mm')
    d.text((x + bw / 2, 245), ex, font=f('Medium', 28), fill=(70, 70, 70), anchor='mm')

pairs = [('hard 열심히', 'hardly 거의 ~않다'), ('late 늦게', 'lately 최근에')]
for j, (a, b) in enumerate(pairs):
    y = 350 + j * 120
    d.rounded_rectangle((40, y, 620, y + 90), 18, fill=(255, 255, 255), outline=INK, width=2)
    d.text((330, y + 45), a, font=f('SemiBold', 32), fill=INK, anchor='mm')
    d.text((700, y + 45), '→ -ly →', font=f('Bold', 30), fill=CORAL, anchor='mm')
    d.rounded_rectangle((780, y, W - 40, y + 90), 18, fill=(255, 235, 233), outline=CORAL, width=3)
    d.text(((780 + W - 40) / 2, y + 45), b, font=f('SemiBold', 32), fill=CORAL, anchor='mm')

im.save(sys.argv[1] if len(sys.argv) > 1 else 'map.png')
