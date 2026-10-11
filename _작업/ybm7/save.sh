#!/bin/bash
# /tmp/david_w → 브랜치 _작업/ (node_modules, 원본 pdf·txt(src/), 생성 PNG 제외 — 로고 PNG는 유지) 후 커밋·push
set -e
W=/tmp/david_w; R=/home/user/prog
rm -rf $R/_작업; mkdir -p $R/_작업
(cd $W && tar cf - --exclude=./node_modules --exclude=./src --exclude='*.pdf' --exclude='*.png' . ) | (cd $R/_작업 && tar xf -)
(cd $W && tar cf - assets david/assets david/fonts 2>/dev/null) | (cd $R/_작업 && tar xf -)
cd $R && git add -A _작업 && git commit -q -m "$1

Co-Authored-By: Claude Opus 5.5 <noreply@anthropic.com>
Claude-Session: https://claude.ai/code/session_018dqnkK3jpz5NBKzRbiDuC3" && for i in 2 4 8 16; do git push -q -u origin claude/confident-ride-o2mmd5 2>&1 && break || sleep $i; done
git log --oneline -1
