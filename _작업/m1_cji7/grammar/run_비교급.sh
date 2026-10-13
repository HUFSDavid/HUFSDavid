#!/bin/bash
# 중1 천재(이상기) 7과 Tasty World — 공통 문법 '비교급' 4파일 (본 자료 + 재시험 B, 각 학생용·교사용) — MAP PNG 먼저 생성
set -e
OUT="${1:-/tmp/david_w/out/m1_cji7/02. 문법/7과}"; mkdir -p "$OUT"
cd "$(dirname "$0")/../../david"
python3 map_G-비교급_중1.py map_G-비교급_중1.png
export COVER='{"term":"2026 · 2학기 기말고사 대비","unitNo":"07","part":"초당중 1학년  ·  문법","title":"문법","subtitle":"비교급 (공통 · 천재이)","info":[["학교","초당중 1학년"],["범위","중1 천재(이상기) Lesson 7  Tasty World"],["구성","본 자료(학생용·교사용) · 재시험 B(학생용·교사용)"]]}'
PREFIX="L7_" node build_G-비교급_중1.js "$OUT"
PREFIX="L7_" node retest_G-비교급_중1.js "$OUT"
