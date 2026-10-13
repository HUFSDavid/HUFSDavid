from PIL import Image, ImageDraw, ImageFont
import sys
import os; FD = os.path.join(os.path.dirname(os.path.abspath(__file__)), 'fonts') + '/'
def f(w, s): return ImageFont.truetype(FD + f'Pretendard-{w}.otf', s)
# 중1 동아윤 7과 — 시간 접속사 when · before · after 백지노트 MAP (암기법·구호는 넣지 않음: David's Tip은 본문 TRICK 박스에만)
INK, CORAL, BG, GREY = (17,17,17), (224,65,58), (245,247,251), (110,110,110)
W, H = 1400, 1030
im = Image.new('RGB', (W, H), BG); d = ImageDraw.Draw(im)
d.text((40, 28), '시간 접속사 when · before · after — 시간을 나타내는 부사절', font=f('Bold', 40), fill=INK)
d.line((40, 88, W-40, 88), fill=CORAL, width=4)
tl = [('주절', 'Max gets too excited', (255,255,255), INK),
      ('접속사', 'when / before / after', (255,235,233), CORAL),
      ('주어 + 동사', 'a lot of people ______ around', (255,235,233), CORAL)]
bws = [390, 360, 470]; gap = 40; x = 40
for j, (a, b, fill, oc) in enumerate(tl):
    bw = bws[j]
    d.rounded_rectangle((x, 115, x+bw, 245), 20, fill=fill, outline=oc, width=3 if oc == CORAL else 2)
    d.text((x+bw/2, 158), a, font=f('Bold', 28), fill=oc if oc == CORAL else GREY, anchor='mm')
    d.text((x+bw/2, 210), b, font=f('SemiBold', 28), fill=INK if oc == INK else CORAL, anchor='mm')
    if j < 2:
        ax = x + bw + 6
        d.line((ax, 180, ax+gap-14, 180), fill=GREY, width=4)
        d.polygon([(ax+gap-16, 170), (ax+gap-4, 180), (ax+gap-16, 190)], fill=GREY)
    x += bw + gap
d.text((40, 272), '접속사 뒤에는 반드시 ______ + ______ / 부사절이 주절 앞이면 끝에 ______', font=f('SemiBold', 30), fill=INK)
rows = [('when', '‘~할 ______’  ·  의문사 when ‘______?’과 구별 (When does the bus leave?)'),
        ('before', '‘~하기 ______’ — before 뒤에는 ______에 일어날 일'),
        ('after', '‘~한 ______’ — after 뒤에는 ______ 일어난 일'),
        ('바꿔 쓰기', 'He takes a walk after he has dinner. = He has dinner ______ he takes a walk.'),
        ('전치사', 'before · after + 명사 · ______  →  After ______ the room, I walked my dog.'),
        ('시제', '시간 부사절 속 미래 = ______시제 (will ✗)  ·  주절은 will 가능  ·  과거 이야기는 둘 다 ______'),
        ('오답', 'when ___ has free time  ·  after he ______ a shower  ·  when it ______ dark'),
        ('본문', 'My work begins ______ the shooting is over.  /  when recording ~ ______ not easy')]
for j, (k, v) in enumerate(rows):
    y = 330 + j*86
    if k:
        h = 70 if (j + 1 >= len(rows) or rows[j+1][0]) else 156
        d.rounded_rectangle((40, y, 290, y+h), 16, fill=(255,235,233), outline=CORAL, width=3)
        d.text((165, y+h/2), k, font=f('Bold', 28), fill=CORAL, anchor='mm')
    d.rounded_rectangle((310, y, W-40, y+70), 16, fill=(255,255,255), outline=INK, width=2)
    d.text((335, y+35), v, font=f('SemiBold', 26), fill=INK, anchor='lm')
im.save(sys.argv[1])
