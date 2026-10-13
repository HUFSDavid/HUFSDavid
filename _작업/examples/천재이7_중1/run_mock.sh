#!/bin/bash
# 천재이 7과 실전 모의고사 1·2회(2단 편집) 4파일 생성 (/tmp/david_w 기준)
set -e
cd "$(dirname "$0")/../.."
mkdir -p "out/m1_cji7/04. 실전모의고사/7과"
node examples/천재이7_중1/build_mock.js examples/천재이7_중1/cji7m1_mcfg.json
