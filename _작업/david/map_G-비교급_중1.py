# DAVID'S MAP — 비교급(-er than / more ~ than) + 원급 비교(as ~ as) 백지노트 (빈칸 도식 · 암기법은 넣지 않음)
from PIL import Image, ImageDraw, ImageFont
import sys
import os; FD = os.path.join(os.path.dirname(os.path.abspath(__file__)), 'fonts') + '/'
def f(w, s): return ImageFont.truetype(FD + f'Pretendard-{w}.otf', s)
INK, CORAL, BG, GREY = (17,17,17), (224,65,58), (245,247,251), (110,110,110)
W, H = 1400, 1116
im = Image.new('RGB', (W, H), BG); d = ImageDraw.Draw(im)
d.text((40, 28), '비교급 · 원급 비교 — ~보다 더 …한 / ~만큼 …한', font=f('Bold', 40), fill=INK)
d.line((40, 88, W-40, 88), fill=CORAL, width=4)
tl = [('주어 + 동사', 'I’m', (255,255,255), INK),
      ('형용사 · 부사의 비교급', '______', (255,235,233), CORAL),
      ('~보다', '______', (255,235,233), CORAL),
      ('비교 대상', 'an olive.', (255,255,255), INK)]
bws = [230, 380, 250, 308]; gap = 33; x = 40
for j, (a, b, fill, oc) in enumerate(tl):
    bw = bws[j]
    d.rounded_rectangle((x, 115, x+bw, 245), 20, fill=fill, outline=oc, width=3 if oc == CORAL else 2)
    d.text((x+bw/2, 158), a, font=f('Bold', 27), fill=oc if oc == CORAL else GREY, anchor='mm')
    d.text((x+bw/2, 210), b, font=f('SemiBold', 30), fill=INK if oc == INK else CORAL, anchor='mm')
    if j < 3:
        ax = x + bw + 4
        d.line((ax, 180, ax+gap-12, 180), fill=GREY, width=4)
        d.polygon([(ax+gap-14, 170), (ax+gap-2, 180), (ax+gap-14, 190)], fill=GREY)
    x += bw + gap
d.text((40, 272), '본문: I’m bigger than an olive, but I’m ______ than an avocado.  ·  a ______ ______ omelet', font=f('SemiBold', 29), fill=INK)
rows = [('+ er', 'tall → ______  ·  small → ______  ·  fast → ______  ·  sweet → ______'),
        ('+ r', '-e로 끝남: large → ______  ·  nice → ______  ·  safe → ______'),
        ('y → i + er', '자음 + y: happy → ______  ·  easy → ______  ·  early → ______'),
        ('자음 한 번 더', '단모음 + 단자음: big → ______  ·  hot → ______  ·  thin → ______'),
        ('more + 원급', '3음절 이상 · -ful · -ous · -ive · -ly 부사: delicious → ______ ______'),
        ('불규칙', 'good / well → ______  ·  bad → ______  ·  many / much → ______  ·  little → ______'),
        ('강조 (훨씬)', '______ · even · far · a lot + 비교급   (______ bigger ✗)'),
        ('주의', 'more bigger ✗  ·  heavier than you ✗ → than ______(네 것)  ·  It will taste ______!'),
        ('as ~ as (~만큼)', '______ + 원급 + as  ·  An olive isn’t as big as an egg. = An egg is ______ than an olive.')]
for j, (k, v) in enumerate(rows):
    y = 330 + j*86
    d.rounded_rectangle((40, y, 290, y+70), 16, fill=(255,235,233), outline=CORAL, width=3)
    d.text((165, y+35), k, font=f('Bold', 28), fill=CORAL, anchor='mm')
    d.rounded_rectangle((310, y, W-40, y+70), 16, fill=(255,255,255), outline=INK, width=2)
    d.text((335, y+35), v, font=f('SemiBold', 26), fill=INK, anchor='lm')
im.save(sys.argv[1])
