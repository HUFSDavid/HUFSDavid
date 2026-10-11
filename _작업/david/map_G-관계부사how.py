from PIL import Image, ImageDraw, ImageFont
import sys
import os; FD = os.path.join(os.path.dirname(os.path.abspath(__file__)), 'fonts') + '/'
def f(w, s): return ImageFont.truetype(FD + f'Pretendard-{w}.otf', s)
INK, CORAL, BG, GREY = (17,17,17), (224,65,58), (245,247,251), (110,110,110)
W, H = 1400, 930
im = Image.new('RGB', (W, H), BG); d = ImageDraw.Draw(im)
d.text((40, 28), '관계부사 how — ~하는 방식(방법) = the way', font=f('Bold', 40), fill=INK)
d.line((40, 88, W-40, 88), fill=CORAL, width=4)
# 문장 구조 4칸
tl = [('주절', "June didn't like", (255,255,255), INK),
      ('선행사 포함', '______', (255,235,233), CORAL),
      ('주어 + 동사', 'Mike had acted', (255,255,255), INK),
      ('뒤 문장', '______한 문장', (255,235,233), CORAL)]
bws = [350, 260, 320, 291]; gap = 33; x = 40
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
d.text((40, 272), "본문: Sunmin's sister disliked ______ Sunmin had treated her.", font=f('SemiBold', 30), fill=INK)
rows = [('how · the way', '둘 중 하나만 — the way ______ ✗  ·  the way that  ·  the way ______ which'),
        ('관계부사 4형제', 'the day ______  ·  the place ______  ·  the reason ______  ·  the way (how)'),
        ('전치사 + which', 'when = on which  ·  where = in which  ·  why = ______ which  ·  how = in which'),
        ('대명사 vs 부사', '뒤가 불완전 → which · that  /  뒤가 ______ → where · when · why · how'),
        ('의문사 how', 'how ______ have you known him?  ·  how to + 동사원형  ·  the way to ~ = 길'),
        ('오답', 'the way how ✗  ·  in where ✗  ·  How happened the accident ✗  ·  where … at ✗')]
for j, (k, v) in enumerate(rows):
    y = 330 + j*98
    d.rounded_rectangle((40, y, 290, y+80), 16, fill=(255,235,233), outline=CORAL, width=3)
    d.text((165, y+40), k, font=f('Bold', 28), fill=CORAL, anchor='mm')
    d.rounded_rectangle((310, y, W-40, y+80), 16, fill=(255,255,255), outline=INK, width=2)
    d.text((335, y+40), v, font=f('SemiBold', 27), fill=INK, anchor='lm')
im.save(sys.argv[1])
