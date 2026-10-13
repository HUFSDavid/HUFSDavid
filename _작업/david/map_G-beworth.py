from PIL import Image, ImageDraw, ImageFont
import sys
import os; FD = os.path.join(os.path.dirname(os.path.abspath(__file__)), 'fonts') + '/'
def f(w, s): return ImageFont.truetype(FD + f'Pretendard-{w}.otf', s)
INK, CORAL, BG, GREY = (17,17,17), (224,65,58), (245,247,251), (110,110,110)
W, H = 1400, 1030
im = Image.new('RGB', (W, H), BG); d = ImageDraw.Draw(im)
d.text((40, 28), 'be worth -ing — ~할 가치가 있다', font=f('Bold', 40), fill=INK)
d.line((40, 88, W-40, 88), fill=CORAL, width=4)
# 문장 구조 4칸
tl = [('주어', 'Pop art', (255,255,255), INK),
      ('be동사', 'is', (255,255,255), INK),
      ('가치 표현', 'worth', (255,235,233), CORAL),
      ('동명사(-ing) + 전치사', '______ attention ______.', (255,235,233), CORAL)]
bws = [250, 220, 250, 448]; gap = 33; x = 40
for j, (a, b, fill, oc) in enumerate(tl):
    bw = bws[j]
    d.rounded_rectangle((x, 115, x+bw, 245), 20, fill=fill, outline=oc, width=3 if oc == CORAL else 2)
    d.text((x+bw/2, 158), a, font=f('Bold', 28), fill=oc if oc == CORAL else GREY, anchor='mm')
    d.text((x+bw/2, 210), b, font=f('SemiBold', 30), fill=INK if oc == INK else CORAL, anchor='mm')
    if j < 3:
        ax = x + bw + 4
        d.line((ax, 180, ax+gap-12, 180), fill=GREY, width=4)
        d.polygon([(ax+gap-14, 170), (ax+gap-2, 180), (ax+gap-14, 190)], fill=GREY)
    x += bw + gap
d.text((40, 272), '주어(Pop art) = 동명사의 의미상 ______ → 목적어 자리는 비우고 전치사는 남긴다', font=f('SemiBold', 30), fill=INK)
rows = [('뜻 · 형태', '~할 ______가 있다  ·  worth + ______ (to부정사 ✗ · 동사원형 ✗ · p.p. ✗)'),
        ('worth + 명사', 'This painting is worth $100.  ·  The museum is worth a ______.'),
        ('be동사 · 시제', 'worth는 동사가 아니다 → be 필수  ·  The movie ______ worth watching.'),
        ('능동형', 'The book is worth ______. (being read ✗ · reading it ✗)'),
        ('It 전환', 'It is worth listening to his songs. = It is ______ to listen to his songs.'),
        ('worthy', 'His bravery is worthy ______ praise.  (worth of ✗)'),
        ('동명사 관용', 'busy ______ · feel like ______ · look forward to ______ · cannot help ______'),
        ('', 'spend + 시간 + ______ · have difficulty ______ · be used to ______')]
for j, (k, v) in enumerate(rows):
    y = 330 + j*86
    if k:
        h = 70 if rows[j+1:j+2] and rows[j+1][0] else 156
        d.rounded_rectangle((40, y, 290, y+h), 16, fill=(255,235,233), outline=CORAL, width=3)
        d.text((165, y+h/2), k, font=f('Bold', 28), fill=CORAL, anchor='mm')
    d.rounded_rectangle((310, y, W-40, y+70), 16, fill=(255,255,255), outline=INK, width=2)
    d.text((335, y+35), v, font=f('SemiBold', 27), fill=INK, anchor='lm')
im.save(sys.argv[1])
