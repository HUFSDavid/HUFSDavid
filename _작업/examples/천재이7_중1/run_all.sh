#!/bin/bash
# 중1 천재이 7과 35파일 재생성 (/tmp/david_w 기준)
set -e
cd "$(dirname "$0")/../.."
SRC="src/(2022개정)2025년_중1_천재(이상기)_7과_[03]WORD TEST.txt"
(cd examples/천재이7_중1 && python3 parse_wt_m1.py "../../$SRC" cji7m1_data_raw.json >/dev/null && python3 fix_data.py)
mkdir -p "out/m1_cji7/00. 단어/7과" "out/m1_cji7/01. 대화/7과" "out/m1_cji7/03. 본문/7과"
node lib/voca.js examples/천재이7_중1/cji7m1_cfg.json && rm -f "out/m1_cji7/00. 단어/7과/_report.json"
node lib/dialogue.js examples/천재이7_중1/cji7m1_dcfg.json && rm -f "out/m1_cji7/01. 대화/7과/"*.json
node lib/reading.js examples/천재이7_중1/cji7m1_rcfg.json
examples/천재이7_중1/run_감각동사.sh "$(pwd)/out/m1_cji7/02. 문법/7과"
examples/천재이7_중1/run_비교급.sh "$(pwd)/out/m1_cji7/02. 문법/7과"
