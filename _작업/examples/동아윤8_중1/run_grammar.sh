#!/bin/bash
# 중1 동아윤 8과 문법 4+4파일 생성 (david/ 에서 실행) — 출력 폴더는 인자 1
OUT="${1:-/tmp/david_w8/out/m1_dy8/02. 문법/8과}"; mkdir -p "$OUT"
cd "$(dirname "$0")/../../david"
python3 map_G-수여동사_중1.py map_G-수여동사_중1.png
python3 map_G-비인칭it_중1.py map_G-비인칭it_중1.png
C1='{"term":"2026 · 2학기 기말고사 대비","unitNo":"08","part":"구성·신릉·신촌·죽전중 1학년  ·  문법","title":"문법","subtitle":"수여동사 — 4형식 ↔ 3형식 (to · for · of)","info":[["학교","구성·신릉·신촌·죽전중 1학년"],["범위","중1 동아(윤정미) Lesson 8  Be Smart Online"],["구성","본 자료(학생용·교사용) · 재시험 B(학생용·교사용)"]]}'
C2='{"term":"2026 · 2학기 기말고사 대비","unitNo":"08","part":"구성·신릉·신촌·죽전중 1학년  ·  문법","title":"문법","subtitle":"비인칭 주어 it (시간 · 날짜 · 날씨 · 거리 · 명암)","info":[["학교","구성·신릉·신촌·죽전중 1학년"],["범위","중1 동아(윤정미) Lesson 8  Be Smart Online"],["구성","본 자료(학생용·교사용) · 재시험 B(학생용·교사용)"]]}'
COVER="$C1" PREFIX="L8_" node build_G-수여동사_중1.js "$OUT"
COVER="$C1" PREFIX="L8_" node retest_G-수여동사_중1.js "$OUT"
COVER="$C2" PREFIX="L8_" node build_G-비인칭it_중1.js "$OUT"
COVER="$C2" PREFIX="L8_" node retest_G-비인칭it_중1.js "$OUT"
