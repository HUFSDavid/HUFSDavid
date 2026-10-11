# 공통 안내 (YBM박 7과 · 죽전중)
- 작업 폴더: /tmp/david_w (lib/ scripts/ assets/ david/ examples/ src/ node_modules 준비됨, docx@9 설치됨, LibreOffice `soffice`, pymupdf 있음, Malgun Gothic→NanumGothic 매핑됨).
- 원본 텍스트(세로 워터마크 제거됨): src/01_내용정리.txt(대화·본문·해석·구문해설·Grammar), src/02_본문7단계.txt, src/03_READINGCHECK.txt, src/07_TF.txt, src/기출.txt(내신기출 80문항), src/04_WORDTEST.txt. pdf 줄 단위 추출이라 한글 해석·문장부호가 여러 줄로 쪼개져 있음 → 원문 PDF가 필요하면 /tmp/david_src/01.pdf 등(01,02,03,04,07,gichul)을 pymupdf로 직접 봐도 됨.
- 공통 값: term "2026 · 2학기 기말고사 대비", schools "죽전중 3학년", schoolsShort "죽전중 3학년", pubShort "YBM박", lesson "7", book "중3 YBM(박준언) Lesson 7  How to Get Along with People", lessonTitle "How to Get Along with People".
- 형식 기준: 최신 예시 세트 examples/비상김8, examples/비상김7 (같은 구조로 내용만 바꿔 작성). README는 /home/user/prog/_작업/_도구문서/README.md가 아닌 경우 /tmp/david_w/ybm7/README_도구.md 참고. lib/*.js, david/david_base.js, scripts/coverlib.js는 수정하지 말 것(꼭 필요하면 보고).
- 검수 기준: 표지 정확히 1쪽(모든 파일 맨 앞), missAnchor 0, 정답 패턴 금지(TFTF 교대·같은 답 4연속·①②③ 순차·같은 번호 3연속·문항순=정답순), T/F는 대화당 5~8개·본문 15개 이상·함정 유형 포함·★'모두 고르시오' 대화·본문마다 1개 이상. 만든 docx는 soffice --headless --convert-to pdf로 바꿔 1쪽이 표지인지, U+FFFD(깨진 글자) 0인지, 쪽수를 확인하고, 핵심 쪽 1~2개는 pymupdf로 PNG 렌더해 Read로 직접 본다(PNG·PDF는 검수 뒤 지워도 됨 — out/ 폴더에 PDF/PNG를 남기지 말 것).
- 다른 에이전트와 파일이 겹치지 않게 맡은 파일·폴더만 쓴다. git 작업·드라이브 업로드는 하지 말 것(메인이 함).
- 결과 보고는 짧게: "만든 파일 목록 + 검수 결과 + 원본과 다르게 처리한 점"만.
