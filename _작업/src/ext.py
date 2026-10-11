import pymupdf as fitz,sys
for f in sys.argv[1:]:
    d=fitz.open(f); out=[]
    for i,p in enumerate(d):
        W=p.rect.width; out.append(f"=== p{i+1}")
        for b in p.get_text("dict")["blocks"]:
            for l in b.get("lines",[]):
                x0,y0,x1,y1=l["bbox"]
                if abs(l["dir"][0])<0.5: continue
                if (x1<16 or x0>W-16) and (x1-x0)<14: continue  # margin watermark
                t="".join(s["text"] for s in l["spans"]).rstrip()
                if t.strip(): out.append(t)
    open(f[:-4]+".txt","w").write("\n".join(out)); print(f,len(d))
