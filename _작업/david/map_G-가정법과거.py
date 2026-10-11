from PIL import Image, ImageDraw, ImageFont
import sys
import os; FD = os.path.join(os.path.dirname(os.path.abspath(__file__)), 'fonts') + '/'
def f(w, s): return ImageFont.truetype(FD + f'Pretendard-{w}.otf', s)
INK, CORAL, BG, GREY = (17,17,17), (224,65,58), (245,247,251), (110,110,110)
W, H = 1400, 900
im = Image.new('RGB', (W, H), BG); d = ImageDraw.Draw(im)
d.text((40, 28), '가정법 과거 — 모양은 과거, 뜻은 현재의 반대', font=f('Bold', 40), fill=INK)
d.line((40, 88, W-40, 88), fill=CORAL, width=4)
d.rounded_rectangle((40,120,660,250), 20, fill=(255,255,255), outline=INK, width=2)
d.text((350,160), 'If + 주어 + ______', font=f('Bold',34), fill=INK, anchor='mm')
d.text((350,212), 'be동사 → 인칭 관계없이 ______', font=f('Medium',27), fill=GREY, anchor='mm')
d.text((700,185), ',', font=f('Bold',44), fill=INK, anchor='mm')
d.rounded_rectangle((740,120,W-40,250), 20, fill=(255,235,233), outline=CORAL, width=3)
d.text(((740+W-40)/2,160), '주어 + ______ / could / might', font=f('Bold',32), fill=CORAL, anchor='mm')
d.text(((740+W-40)/2,212), '+ ______  ‘~라면 …할 텐데’', font=f('Medium',27), fill=CORAL, anchor='mm')
rows = [('직설법 전환', 'If + 과거  ↔  As + ______시제 · 긍정 ↔ ______ 뒤집기'),
        ('I wish', 'I wish + 과거(were/could)  =  I’m sorry that + ______'),
        ('as if', '마치 ~인 것처럼  →  as if + 주어 + ______'),
        ('조건 vs 가정', 'If + 현재, ______ (가능)  /  If + 과거, would (불가능)'),
        ('Without', 'Without + 명사  =  If it were not ______ + 명사')]
for j,(k,v) in enumerate(rows):
    y = 285 + j*120
    d.rounded_rectangle((40,y,330,y+100), 16, fill=INK)
    d.text((185,y+50), k, font=f('Bold',30), fill=(255,255,255), anchor='mm')
    d.rounded_rectangle((350,y,W-40,y+100), 16, fill=(255,255,255), outline=INK, width=2)
    d.text((375,y+50), v, font=f('SemiBold',29), fill=INK, anchor='lm')
im.save(sys.argv[1])
