from PIL import Image, ImageDraw, ImageFont
import sys
import os; FD = os.path.join(os.path.dirname(os.path.abspath(__file__)), 'fonts') + '/'
def f(w, s): return ImageFont.truetype(FD + f'Pretendard-{w}.otf', s)
INK, CORAL, BG, GREY = (17,17,17), (224,65,58), (245,247,251), (110,110,110)
W, H = 1400, 960
im = Image.new('RGB', (W, H), BG); d = ImageDraw.Draw(im)
d.text((40, 28), '시간 접속사 — 언제? 뒤에는 주어 + 동사!', font=f('Bold', 40), fill=INK)
d.line((40, 88, W-40, 88), fill=CORAL, width=4)
# 공식 2칸
d.rounded_rectangle((40,115,660,230), 20, fill=(255,255,255), outline=INK, width=2)
d.text((350,152), '접속사 while + 주어 + ______', font=f('Bold',32), fill=INK, anchor='mm')
d.text((350,200), 'Humpback whales stand on their tails while they sleep.', font=f('Medium',20), fill=GREY, anchor='mm')
d.rounded_rectangle((740,115,W-40,230), 20, fill=(255,235,233), outline=CORAL, width=3)
d.text(((740+W-40)/2,152), '전치사 during + ______ / for + 기간', font=f('Bold',32), fill=CORAL, anchor='mm')
d.text(((740+W-40)/2,200), 'during the play  /  for three days', font=f('Medium',24), fill=CORAL, anchor='mm')
# 접속사 칩 (2열)
rows = [('when', '~할 때'), ('while', '~하는 ______'), ('before', '~하기 전에'), ('after', '~한 ______'),
        ('until', '~할 때까지 (계속)'), ('since', '~ ______ (현재완료와)'), ('as soon as', '~______'), ('as', '~할 때 → as 자료')]
for j, (k, v) in enumerate(rows):
    col, row = j % 2, j // 2
    x0 = 40 + col * 670; y = 260 + row * 100
    d.rounded_rectangle((x0, y, x0+230, y+80), 16, fill=INK)
    d.text((x0+115, y+40), k, font=f('Bold', 30), fill=(255,255,255), anchor='mm')
    d.rounded_rectangle((x0+245, y, x0+650, y+80), 16, fill=(255,255,255), outline=INK, width=2)
    d.text((x0+270, y+40), v, font=f('SemiBold', 28), fill=INK, anchor='lm')
# 규칙 박스
rules = [('시제', '시간·조건 부사절: 미래라도 ______ 시제  →  We will wait until Peter ______.'),
         ('예외', 'I wonder when he ______ come back.  (명사절 = 언제 ~할지)'),
         ('구별', 'until(계속) vs ______(기한)  /  Since they are not fish = ~ ______')]
for j, (k, v) in enumerate(rules):
    y = 680 + j * 92
    d.rounded_rectangle((40, y, 230, y+76), 16, fill=(255,235,233), outline=CORAL, width=3)
    d.text((135, y+38), k, font=f('Bold', 30), fill=CORAL, anchor='mm')
    d.rounded_rectangle((250, y, W-40, y+76), 16, fill=(255,255,255), outline=INK, width=2)
    d.text((275, y+38), v, font=f('SemiBold', 27), fill=INK, anchor='lm')
im.save(sys.argv[1])
