#!/bin/bash
# 동아윤 중1 7과 문법 2개 (본 자료 + 재시험 B, 각 학생용·교사용) — MAP PNG 먼저 생성
set -e
cd "$(dirname "$0")/../../david"
OUT="${1:-/mnt/user-data/outputs/m1_dy7/02. 문법/7과}"; mkdir -p "$OUT"
python3 map_G-to부정사부사_중1.py map_G-to부정사부사_중1.png
python3 map_G-시간접속사_중1.py map_G-시간접속사_중1.png
INFO_S='["학교","구성·신릉·신촌·죽전중 1학년"]'; KO='["구성","본 자료(학생용·교사용) · 재시험 B(학생용·교사용)"]'
export COVER='{"term":"2026 · 2학기 기말고사 대비","unitNo":"07","part":"구성·신릉·신촌·죽전중 1학년  ·  문법","title":"문법","subtitle":"to부정사의 부사적 용법 (동아윤 · 중1)","info":['"$INFO_S"',["범위","중1 동아(윤정미) Lesson 7  Find Your Dream · Grammar Point 1"],'"$KO"']}'
PREFIX="L7_" node build_G-to부정사부사_중1.js "$OUT"; PREFIX="L7_" node retest_G-to부정사부사_중1.js "$OUT"
export COVER='{"term":"2026 · 2학기 기말고사 대비","unitNo":"07","part":"구성·신릉·신촌·죽전중 1학년  ·  문법","title":"문법","subtitle":"시간 접속사 when · before · after (동아윤 · 중1)","info":['"$INFO_S"',["범위","중1 동아(윤정미) Lesson 7  Find Your Dream · Grammar Point 2"],'"$KO"']}'
PREFIX="L7_" node build_G-시간접속사_중1.js "$OUT"; PREFIX="L7_" node retest_G-시간접속사_중1.js "$OUT"
