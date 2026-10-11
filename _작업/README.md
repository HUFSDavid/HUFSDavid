# David 내신 세트 생성 도구 (v1.3.2 · 2026-10-11 · 기준 샘플: 동아윤 7과)

새 채팅에서 이 폴더(`_도구.zip`)를 작업 공간에 풀어서 그대로 쓴다. 스킬(david-voca-5step / david-dialogue / david-grammar-bible / david-reading / david-cover)의 규칙이 우선이고, 이 폴더는 그 규칙을 구현한 생성기다.

## 준비
```
mkdir -p ~/w && cd ~/w && unzip -o <staged>/_도구.zip -d . && mv _도구/* . 
npm i docx@9 ; pip install pymupdf --break-system-packages
```
LibreOffice로 PDF 렌더 → 표지 1쪽·로고·빈칸 확인.

## 폴더
- `lib/common.js` 공통 헬퍼(색·글꼴·여백·머리글/바닥글·testHead·rng/shuffle·saveMulti·**annotated(해설 번호 위첨자)**)
- `scripts/coverlib.js` **표지 v2** (흐름 배치, 바깥 프레임 표·exact 줄간격 없음 → 구글 드라이브 미리보기에서도 1쪽). 스킬 폴더의 구버전 대신 이것을 쓴다.
- `assets/` DAVID·JLS 로고
- `lib/parse_wt.py` exam4u `[04]WORD TEST` PDF → json (pymupdf)
- `lib/build_data.py` → 단어 항목 {no,en,ko,pos,extra,ee,ex}
- `lib/voca.js` 단어 5스텝 (암기지 + 1~5단계 문제/답지 A형, 11파일)
- `lib/dialogue.js` 대화 (학습지 교사/학생 + 6단계 문제/답지, 14파일)
- `lib/reading.js` 본문 자료집 (학생용·교사용 2파일)
- `david/` 문법 GRAMMAR BIBLE 키트 (david_base.js + 항목별 build_G-*.js / retest_G-*.js, 각 4파일)
- `examples/동아윤7/` 실제 설정·데이터 예시 (새 세트는 이 형식을 복사해 내용만 바꿔 작성) · `examples/동아윤8/`, `examples/동아이7/`, `examples/동아이8/`, `examples/천재정7/`, `examples/천재정8/`, `examples/능률김7/`, `examples/비상김7/`, `examples/비상김8/`도 같은 형식 (`examples/능률김8/`은 능률김8과_결과.zip 안 _도구.zip에만 있음)

## 변경 이력
- (v1.3.2 그대로, 2026-10-11, 비상김8): lib·david_base.js 변경 없음. 단어: `parse_wt.py`가 WORD TEST Word List에서 두 줄로 나뉜 품사·뜻을 잘라 25개가 잘림(back·wish·head·punch는 뜻 칸이 빔) → `examples/비상김8/fix_data.py`로 Word List 원문을 다시 붙이고 예문 해석 칸('예문 …'·'Phrases in Use')·영어 이름 위치·영영 'SYN' 조각을 한 번에 정리(새 세트도 build_data.py 다음에 돌려 볼 것, 원본은 *_data_raw.json). 가정법 과거는 공통 스크립트를 COVER·PREFIX만 바꿔 재실행. 새 문법 `build/retest/map_G-with분사`(문서 제목 'with + 명사 + 분사', 파일명 `L8_DAVID_G-with분사_with분사_*`, 빈칸 2개 문장 U+200B 처리 포함).
- (v1.3.2, 2026-10-10, 비상김7): lib·david_base.js 변경 없음(아래 dlgLabel 복원 제외). 드라이브에서 찾은 최신 _도구.zip에 v1.3.1의 `dialogue.js` dlgLabel이 빠져 있어 다시 넣음(`subtitle: cfg.lessonTitle + "  ·  " + (cfg.dlgLabel || "Listen & Talk")`). 7과는 Listen & Talk가 있어 dlgLabel 미사용. 단어 데이터 정리: `build_data.py` 예문 해석 칸의 두 번째 예문('…예문 …')·'Phrases in Use' 삭제(back·last·discount·purchase·anchor·moment), `parse_wt.py` split_ko가 첫 한글에서 자르기 때문에 해석이 영어 이름으로 시작하는 예문(‘Julia는 …’)은 이름이 영어 예문 끝에 붙고 해석이 ‘는 …’으로 시작함 → 20개 고침(새 세트도 확인할 것), 두 줄로 나뉜 뜻(release·above)은 WORD TEST에서 직접 채움, 정의 앞 U+200B 제거. 접속사 as는 공통 스크립트를 COVER·PREFIX만 바꿔 재실행. 새 문법 `build/retest/map_G-수의일치`(빈칸 2개 문장 U+200B 처리 포함).
- (v1.3.1, 2026-10-10, 능률김8): `dialogue.js` 표지 부제 뒤 'Listen & Talk'를 설정값 `dlgLabel`로 바꿀 수 있게 함(없으면 기존대로 'Listen & Talk'). 8과는 Read On 단원이라 Listen & Talk가 없어 대화 파트를 단원 안의 대화 형식 지문 4개(Before You Read B · After You Read B · Project Work 1 Scene 2·5)로 만들고 `dlgLabel: "Read On 대화 지문"`. `build_data.py`가 예문 해석 칸에 붙여 넣은 두 번째 예문('…예문 Make sure…')·'Phrases in Use'는 nk8_data.json에서 직접 지움(right·take·each·realize). 5단계 mut는 쉼표가 붙은 낱말(agreement, up, 등)을 피함 — 답지에 'agreement,→disagreement,'처럼 쉼표까지 표시되기 때문. 목표 문법 없음 → 문법 파트 생략(27개).
- (v1.3 그대로, 2026-10-10, 능률김7): lib·david_base.js 변경 없음. 가정법 과거는 공통 스크립트를 COVER·PREFIX만 바꿔 재실행. 새 문법 `build/retest/map_G-sothat`(문서 제목 'so that', 파일명은 스크립트 안에서 `sothat`으로 바꿔 저장 · 빈칸 2개 문장은 스크립트 안에서 U+200B 자동 삽입). WORD TEST의 중복 단어(sensor 2번)는 하나로 줄임.
- (v1.3 그대로, 2026-10-10, 천재정8): lib·david_base.js 변경 없음. 새 문법 `build/retest/map_G-부정대명사`, `build/retest/map_G-5형식to부정사`(문서 제목은 '5형식 + to부정사', 파일명은 스크립트 안에서 `5형식to부정사`로 바꿔 저장). 메모: david_base.js에서 한 문장에 빈칸 `______`이 두 개면 `__밑줄__` 서식으로 잘못 읽혀 사이 글자에 밑줄이 생김 → 부정대명사 스크립트는 빈칸 밑줄 사이에 U+200B를 넣어 피함(다른 문법 파일도 빈칸 2개 문장 주의). 이 세트는 클라우드(Linux) 세션에서 생성 — 렌더 확인은 NanumGothic 대체 글꼴 기준.
- v1.3 (2026-10-10, 천재정7): `dialogue.js` 5단계 T/F 섞기를 대화별로 나눠 진행(대화마다 최대 3000번 섞고 앞 3개 답과 이어 봐서 패턴 없으면 확정) — 문항이 100개 넘을 때 전체 재섞기가 끝나지 않던 문제. `reading.js` 어법 PART 1 [ ] 정답 위치 조건 강화(앞뒤앞뒤 4연속 교대·4칸 블록 반복·3칸 블록 3회 반복 금지). 두 변경 모두 시드가 달라져 이전 세트를 다시 돌리면 순서가 바뀔 수 있음. 새 문법 `build/retest/map_G-간접화법`, `build/retest/map_G-if`(파일명 괄호 피하려고 렌더 후 `L{과}_DAVID_G-if_if_인지아닌지_*`로 이름 변경).
- v1.2 (2026-10-10, 동아이8): `dialogue.js` 4단계 순서배열 정답 기호를 A~P까지 확장(11줄 넘는 대화에서 빈 기호 나오던 문제), 정답 순서에 연속 3글자(F-G-H 등)가 생기면 다시 섞기. 새 문법 `build/retest/map_G-과거완료`.
- v1.1 (2026-10-09, 동아이7): `build_data.py` 영영 정의 칸에 섞여 들어온 `SYN …`/`OPP …` 줄을 정의에서 빼고 syn/opp로 옮김(1번 정의가 'SYN marvel'이 되던 문제). `dialogue.js` anchors 값에 배열 허용(`"D5-3": ["I heard that","The Internet says"]` → 같은 해설 번호를 여러 곳에), 화자 칸 너비를 이름 길이에 맞춰 자동 확장(Suji/Tony 등). 새 문법 `build/retest/map_G-whose`, `build/retest/map_G-시간접속사`.

## 세트 1개 만드는 순서
1. **원본**: `중3\_원본\exam4you_중3_7·8과\<출판사>\<N과>` 를 스테이징(device_stage_files) (WORD TEST, 내용정리/본문, 대화 자료)
2. **단어**: `python3 lib/parse_wt.py WT.pdf wt.json && python3 lib/build_data.py wt.json data.json`
   → 5단계 변형 `mut.json`(핵심반대·유사철자·문법 섞기, 예시 dy7_mut.json) 작성 → cfg(json) 작성 → `node lib/voca.js cfg.json`
3. **대화**: 대화문·해석·해설(notes)·핵심표현·단계별 문항을 `dlg.json`으로 작성(예시 dy7_dlg.json) → `node lib/dialogue.js dcfg.json`
   - `s6answers` 정답 번호는 패턴 없이. 위첨자 위치가 어색하면 `anchors`에 "D{대화}-{해설번호}": "앵커 문구" 추가
4. **본문**: 문단 데이터 `read.js`(en에 {핵심어구}, ko, notes, star) + 시험 `read_tests.js` 작성 → `node lib/reading.js rcfg.json`
   - 위첨자 위치 조정은 `anchors` "P{문단}-{해설번호}"
5. **문법**: 항목마다 `david/build_G-<항목>.js`, `retest_G-<항목>.js` 작성(예시 분사구문·접속사as) →
   ```
   cd david && COVER='{"term":"2026 · 2학기 기말고사 대비","unitNo":"08","part":"<학교> 3학년  ·  문법","title":"문법","subtitle":"<항목> (공통 · <공유 출판사>)","info":[["학교","…"],["범위","…"],["구성","…"]]}' PREFIX="L8_" node build_G-<항목>.js "<출력>"
   ```
   먼저 `python3 map_G-<항목>.py map_G-<항목>.png`로 MAP 이미지 생성(글꼴은 david/fonts), 출력 폴더는 미리 `mkdir -p`.
   공통 문법은 한 번 만들고 해당하는 모든 학교/출판사 폴더에 복사.
6. **저장(구글드라이브만)**: `G:\내 드라이브\0. JLS수업\★내신\중3\<출판사약칭>\00 공통자료\{00. 단어, 01. 대화, 02. 문법, 03. 본문}\<N과>` 에 device_commit_files로 바로 저장(폴더가 없으면 자동 생성). 기존 하위 폴더는 건드리지 않는다. G: 는 device_bash에서 마운트가 안 되므로 읽기는 device_stage_files, 쓰기는 device_commit_files만 쓴다.
 - 클라우드(Linux) 세션: G:가 없으므로 Google Drive 커넥터로 원본·도구를 내려받고(큰 파일은 tool-results에 저장됨 → base64 디코드), 결과는 G: 폴더 구조대로 zip으로 묶어 첨부로 전달. 텍스트 파일(진행표·README)만 커넥터로 드라이브에 직접 올릴 수 있음(덮어쓰기 불가 → 이전 파일은 이름을 바꿔 보관). 작은 바이너리(xlsx 등)는 응답 본문에만 오고 파일로 저장되지 않으므로 업로드현황 xlsx는 openpyxl로 같은 구조(요약·파일 목록 시트)를 새로 만든다.

## 공통 규칙 메모
- 정답 패턴 금지(OXOX·순차·문항순=정답순·같은 번호 3연속)
- 해설 ①②③이 있으면 원문(대화문, 본문 TEXT·문단별 분석)에 같은 번호를 작은 위첨자(코랄 #E8664F)로 단다 (`K.annotated`)
- 표지: 모든 파일 맨 앞 1쪽, 문법 edition은 'GRAMMAR'
- 파일명: 단어 `A_L{과}_기본단어_*`, 대화 `A_L{과}_대화_*`, 본문 `A_L{과}_본문_자료집(학생용|교사용)`, 문법 `L{과}_DAVID_G-*`

## 남은 세트 (타겟 문법)
| 세트 | 학교 | 문법 |
|---|---|---|
| 천재정 7 | 구성 | 간접화법, if(~인지) (완료) |
| 천재정 8 | 구성 | 부정대명사, 5형식+to부정사 (완료) |
| 능률김 7 | 대지·어정 | 가정법 과거, so that (완료) |
| 능률김 8 | 대지·어정 | (목표 문법 없음) (완료) |
| 비상김 7 | 동백 | 접속사 as(공통), 수의 일치 (완료) |
| 비상김 8 | 동백 | 가정법 과거(공통·완료), with+명사+분사 (완료) |
| YBM박 7 | 죽전 | 관계부사 how, the+비교급 |
| YBM박 8 | 죽전 | 분사구문(공통·완료), be worth -ing |
가정법 과거는 동아윤8·능률김7·비상김8 공통 → 처음 만들 때 공통으로 만들고 각 폴더에 복사.
