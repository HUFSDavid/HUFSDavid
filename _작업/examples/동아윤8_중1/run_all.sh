#!/bin/bash
# 중1 동아윤 8과 35파일 재생성 (/tmp/david_w8 기준)
set -e
cd "$(dirname "$0")/../.."
SRC="src/(2022개정)2025년_중1_동아(윤정미)_8과_[03]WORD TEST.txt"
(cd examples/동아윤8_중1 && python3 parse_wt_m1.py "../../$SRC" dy8m1_data_raw.json >/dev/null && python3 fix_data.py && python3 make_dlg.py)
node lib/voca.js examples/동아윤8_중1/dy8m1_cfg.json
node lib/dialogue.js examples/동아윤8_중1/dy8m1_dcfg.json
mkdir -p "out/m1_dy8/03. 본문/8과" && node lib/reading.js examples/동아윤8_중1/dy8m1_rcfg.json
examples/동아윤8_중1/run_grammar.sh "$(pwd)/out/m1_dy8/02. 문법/8과"
