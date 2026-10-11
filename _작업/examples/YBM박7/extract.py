import pymupdf as fitz, re, sys, unicodedata
# 세로 워터마크 줄 제거: 왼쪽 여백 x<16의 한 글자 줄 (①~⑳·숫자·영문 1~2글자는 유지)
keep = re.compile(r'^([①-⑳]|[0-9]{1,2}|[A-Za-z]{1,2})$')
def extract(pdf, out):
    doc = fitz.open(pdf); res = []
    for pno, page in enumerate(doc, 1):
        res.append(f"=== p{pno} ===")
        for b in page.get_text("dict")["blocks"]:
            for l in b.get("lines", []):
                t = "".join(s["text"] for s in l["spans"]).strip()
                if not t: continue
                core = re.sub(r'[。、.,]', '', unicodedata.normalize("NFC", t))
                if (l["bbox"][0] < 16 or l["bbox"][0] > page.rect.width - 16) and len(core) <= 1 and not keep.match(core): continue
                res.append(t)
    open(out, "w").write("\n".join(res))
    print(out, len(doc), "pages")
for a in sys.argv[1:]:
    src, dst = a.split("=")
    extract(src, dst)
