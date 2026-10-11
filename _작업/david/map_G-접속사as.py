from PIL import Image, ImageDraw, ImageFont
import sys
import os; FD = os.path.join(os.path.dirname(os.path.abspath(__file__)), 'fonts') + '/'
def f(w, s): return ImageFont.truetype(FD + f'Pretendard-{w}.otf', s)
INK, CORAL, BG, GREY = (17,17,17), (224,65,58), (245,247,251), (110,110,110)
W, H = 1400, 820
im = Image.new('RGB', (W, H), BG); d = ImageDraw.Draw(im)
d.text((40, 28), 'as — 뒤를 보면 품사가, 앞뒤를 보면 뜻이 보인다', font=f('Bold', 38), fill=INK)
d.line((40, 88, W-40, 88), fill=CORAL, width=4)
d.rounded_rectangle((40,120,660,230), 20, fill=(255,255,255), outline=INK, width=2)
d.text((350,155), 'as + 주어 + 동사', font=f('Bold',34), fill=INK, anchor='mm')
d.text((350,200), '→ ______ (접속사 / 전치사)', font=f('Medium',28), fill=GREY, anchor='mm')
d.rounded_rectangle((740,120,W-40,230), 20, fill=(255,235,233), outline=CORAL, width=3)
d.text(((740+W-40)/2,155), 'as + 명사', font=f('Bold',34), fill=CORAL, anchor='mm')
d.text(((740+W-40)/2,200), '→ 전치사 ‘______’', font=f('Medium',28), fill=CORAL, anchor='mm')
rows=[('시간·동시','~할 때 · ~하면서','= ______ / while'),('비례','~함에 따라 · ~할수록','grow·get·develop + ______'),
      ('이유','~ 때문에','= because / ______'),('양태','~하듯이 · ~대로','just as · as I ______ you')]
for j,(a,b,c) in enumerate(rows):
    y=270+j*125
    d.rounded_rectangle((40,y,330,y+100),16,fill=(17,17,17))
    d.text((185,y+50),a,font=f('Bold',32),fill=(255,255,255),anchor='mm')
    d.rounded_rectangle((350,y,800,y+100),16,fill=(255,255,255),outline=INK,width=2)
    d.text((575,y+50),b,font=f('SemiBold',30),fill=INK,anchor='mm')
    d.rounded_rectangle((820,y,W-40,y+100),16,fill=(255,255,255),outline=CORAL,width=2)
    d.text(((820+W-40)/2,y+50),c,font=f('SemiBold',28),fill=CORAL,anchor='mm')
im.save(sys.argv[1])
