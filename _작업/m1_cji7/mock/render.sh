#!/bin/bash
# 실전 모의고사 생성 → PDF(/tmp/david_w/out/_pdf_mock) → 쪽수·U+FFFD 검사
set -e
cd /tmp/david_w
node m1_cji7/mock/build_mock.js m1_cji7/mock/cji7m1_mcfg.json
mkdir -p out/_pdf_mock
timeout 300 soffice -env:UserInstallation=file:///tmp/lo_mock --headless --convert-to pdf --outdir out/_pdf_mock "out/m1_cji7/04. 실전모의고사/7과/"*.docx >/dev/null 2>&1
python3 - <<'PY'
import pymupdf as fitz, glob, json
res={}
for f in sorted(glob.glob('/tmp/david_w/out/_pdf_mock/*.pdf')):
    d=fitz.open(f); t=''.join(p.get_text() for p in d)
    cover1 = '실전 모의고사' in d[0].get_text() and '천재이 7' in d[1].get_text()[:40]
    res[f.split('/')[-1]]={'pages':d.page_count,'fffd':t.count('�'),'cover1page':cover1}
    print(f.split('/')[-1], res[f.split('/')[-1]])
    tag='s' if '문제지' in f else 't'; n='1' if '1회' in f else '2'
    for i in range(d.page_count): d[i].get_pixmap(dpi=90).save(f'/tmp/david_w/out/_pdf_mock/{tag}{n}_{i+1}.png')
json.dump(res, open('/tmp/david_w/m1_cji7/mock/cji7m1_mock_pdfcheck.json','w'), ensure_ascii=False, indent=1)
PY
