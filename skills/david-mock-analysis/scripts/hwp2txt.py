#!/usr/bin/env python3
"""HWP(한글 5.x) 파일에서 본문 텍스트만 뽑는다.

사용법: python3 hwp2txt.py 입력.hwp [출력.txt]
- 필요 패키지: olefile (없으면 `pip install olefile`)
- 표·글상자 안 글자도 순서대로 나오지만 레이아웃(줄 위치)은 사라진다.
- 빈 줄은 지워서 출력한다.
"""
import struct
import sys
import zlib

try:
    import olefile
except ImportError:
    sys.exit("olefile이 필요합니다: pip install olefile")

HWPTAG_PARA_TEXT = 67
# 8칸(16바이트)짜리 인라인/확장 컨트롤 문자
WIDE_CTRL = {1, 2, 3, 4, 5, 6, 7, 8, 9, 11, 12, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23}


def para_text(rec):
    t = rec.decode("utf-16le", errors="ignore")
    out, j = [], 0
    while j < len(t):
        c = ord(t[j])
        if c >= 32:
            out.append(t[j])
            j += 1
        elif c in (10, 13):
            out.append("\n")
            j += 1
        elif c == 9:
            out.append("\t")
            j += 8
        elif c in WIDE_CTRL:
            j += 8
        else:
            j += 1
    return "".join(out)


def extract(path):
    f = olefile.OleFileIO(path)
    header = f.openstream("FileHeader").read()
    compressed = header[36] & 1
    if header[36] & 2:
        sys.exit("암호가 걸린 HWP는 읽을 수 없습니다.")
    sections = sorted(
        (s for s in f.listdir() if s[0] == "BodyText"),
        key=lambda s: int(s[1].replace("Section", "")),
    )
    paras = []
    for s in sections:
        data = f.openstream(s).read()
        if compressed:
            data = zlib.decompress(data, -15)
        i = 0
        while i + 4 <= len(data):
            h = struct.unpack_from("<I", data, i)[0]
            i += 4
            tag, size = h & 0x3FF, (h >> 20) & 0xFFF
            if size == 0xFFF:
                size = struct.unpack_from("<I", data, i)[0]
                i += 4
            if tag == HWPTAG_PARA_TEXT:
                paras.append(para_text(data[i:i + size]))
            i += size
    text = "\n".join(paras)
    return "\n".join(line for line in text.splitlines() if line.strip())


if __name__ == "__main__":
    if len(sys.argv) < 2:
        sys.exit(__doc__)
    txt = extract(sys.argv[1])
    if len(sys.argv) > 2:
        with open(sys.argv[2], "w", encoding="utf-8") as fp:
            fp.write(txt)
    else:
        print(txt)
