#!/bin/bash
# /tmp/david_w → 저장소 _작업/ (node_modules·원본 pdf/txt·생성 PNG 제외, 로고 PNG 유지) 후 commit·push
set -e
R=/home/user/HUFSDavid
rm -rf $R/_작업 && mkdir -p $R/_작업
cd /tmp/david_w
tar --exclude=./node_modules --exclude=./src --exclude='*.pdf' --exclude='*.png' --exclude=./pdf -cf - . | (cd $R/_작업 && tar xf -)
tar -cf - assets david/assets | (cd $R/_작업 && tar xf -)
cd $R && git add -A _작업 && git commit -qm "$1" && for i in 2 4 8 16; do git push -q -u origin claude/confident-ride-o2mmd5 && break || sleep $i; done
echo pushed
