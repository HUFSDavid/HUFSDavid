---
name: "david-grammar-bible"
description: "'[문법 파트] 내신문법 만들어줘', 'Grammar Bible OO 단원 리뉴얼해줘' 요청 시 DAVID GRAMMAR BIBLE 형식의 문법 자료(본 자료 + 재시험 B세트, 각각 학생용·교사용 Word 4파일)를 만든다. 중1·중2·중3·고등 통합본으로 정규 수업과 학교 내신을 함께 커버하며, Point마다 학년 배지·DAVID'S TIP·DAVID'S PICK을 넣는다."
---

# DAVID GRAMMAR BIBLE — 문법 자료 제작 (정규 수업 + 내신 통합본)

사용자는 JLS 정상어학원 영어 선생님 David. "관계대명사 내신문법 만들어줘", "I. 비교 단원 리뉴얼해줘"처럼 요청하면 이 스킬대로 **4개 파일**을 만든다. 응답은 한국어로 한다.

| 파일 | 내용 |
|---|---|
| `DAVID_{코드}_{항목}_학생용.docx` | 본 자료, 정답 없음 |
| `DAVID_{코드}_{항목}_교사용.docx` | 본 자료 + 빨간 정답·근거·지도 팁·출제 주의·보강 메모 |
| `DAVID_{코드}_{항목}_재시험B_학생용.docx` | 재시험 B세트 |
| `DAVID_{코드}_{항목}_재시험B_교사용.docx` | 재시험 B세트 정답 |

- 두 버전은 같은 코드에서 mode 인자만 바꿔 만든다(`D.render` 또는 직접 조립).
- 본문에는 '학생용', '교사용'이라는 말을 쓰지 않는다. 구분은 파일명, 정답 표시, 표지 오른쪽 아래 상자로만 한다.

## 0. 시작 전 확인

- 코드(예: H-31)가 요청에 없으면 한 번 묻는다. 답이 없으면 `G-{항목}`으로 진행하고 알린다.
- 학년·교과서를 알려주면 Advanced와 WRITE 일부를 그 교과서 본문 문장으로 만든다.
- 항목이 너무 크면(예: "관계사 전체") Point 구성을 먼저 보여주고 진행한다.
- **리뉴얼 요청**이면 기존 Grammar Bible 단원 docx와 참고 교재(예: 중학영문법 3800제 1·2·3학년 해당 챕터)를 모두 읽는다. 둘 중 하나가 없으면 요청한다.

## 1. 작업 환경 준비 (세션마다 최초 1회)

1. **제작 키트 내려받기.** Artifact 도구 `action: "read"`로 받는다.
   - url: `https://claude.ai/artifact/VmuqD6EwZk6wVAfhGGKS6y`
   - paths: `["david_base.js", "coverlib.js", "make_map.py", "DAVID_logo_mono.png", "DAVID_logo_full.png"]`
   - 배치: `david/david_base.js`, `david/make_map.py`, `david/scripts/coverlib.js`, `david/assets/` (로고 + david-cover 스킬의 `david.png`, `jls.png`)
   - 키트를 못 받으면 사용자에게 알리고, DAVID 로고가 든 기존 docx나 로고 파일을 첨부해 달라고 한다.
2. **폰트 설치.**

```bash
mkdir -p ~/.fonts && cd ~/.fonts
[ -d pre ] || (curl -sSL -o pre.zip https://github.com/orioncactus/pretendard/releases/download/v1.3.9/Pretendard-1.3.9.zip && unzip -o -q pre.zip 'public/static/*.otf' -d pre && rm pre.zip)
[ -s Montserrat.ttf ] || curl -sSL -o Montserrat.ttf "https://raw.githubusercontent.com/google/fonts/main/ofl/montserrat/Montserrat%5Bwght%5D.ttf"
[ -s NanumPen.ttf ] || curl -sSL -o NanumPen.ttf "https://raw.githubusercontent.com/google/fonts/main/ofl/nanumpenscript/NanumPenScript-Regular.ttf"
fc-cache -f >/dev/null
```

   - 받은 파일 크기가 1KB 미만이면 실패한 것이다. 다시 받는다.
3. `docx`(npm)는 보통 설치되어 있다. `require('docx')`가 실패할 때만 `npm install docx`.
4. 코드를 고쳐 개선했다면 사용자에게 알리고 키트 아티팩트에 다시 게시하자고 제안한다(같은 url로 publish).

## 2. 브랜딩 (필수)

- 시리즈 DAVID GRAMMAR BIBLE, 슬로건 PRACTICE MAKES PERFECT
- 모든 파일 맨 앞에 David 공통 표지(david-cover 스킬, `makeCover`). 머리말에는 모노 로고(`david_base.js`).
- 색: 잉크 블랙 111111, 포인트 코랄 E0413A, 정답 빨강 C00000
- 폰트: 본문 Pretendard, 영문 제목 Montserrat, DAVID'S TIP 본문은 Nanum Pen
- 섹션 이름: FLOW / Point n / PRACTICE n / PERFECT CHECK / WRITE / MAP(DAVID'S MAP) / MEMO
- **학년 배지:** 모든 Point 제목 옆에 중1 · 중2 · 중3 · 고등 배지 (`D.gradeSection(label, title, ['중1','중2'])`).
  - 그 내용을 처음 배우는 학년부터 붙인다. 중학 교재에 없고 고등 내신 · 수능에 나오는 내용은 고등.
  - 본문의 "(심화)" 표기는 쓰지 않고 "(고등)"으로 쓴다.
- **DAVID'S TIP:** 외워야 하는 것(구별 기준, 동사 목록, 관용표현, 예외)은 스토리 · 두문자 · 말장난 · 구호로 암기법을 만든다(`D.davidTip(title, lines)`).
  - "DAVID'S TRICK"이라는 이름은 쓰지 않는다.
  - 문서 전체 4~6개(단원 2개 묶음이면 단원당 4~6개), 짧고 억지스럽지 않게.
- **DAVID'S PICK:** 4장 참고. Point마다 1개.
- 도식 PNG는 PIL + Pretendard로 만든다(`make_map.py` 참고). 학생용은 빈칸, 교사용은 빨간 정답이 든 두 장을 만든다.

## 3. 본 자료 구성 (순서 고정)

0. **표지** → **차례** (No · 항목 · 핵심 포인트) + **학년별 학습 범위표** (Point × 중1 · 중2 · 중3 · 고등, ● 핵심 출제 ○ 복습 · 확장 ◆ 고등 대비)
1. **제목 블록** (`meta`)
   - `series: D.SERIES.G`, `code`, `title`, `category`(예 `H. 형용사 · 부사  |  No.31`), `rightText`
   - `question`: 오늘의 질문. 학생이 "왜?"를 느끼는 대비 문장 한 쌍
2. **FLOW: Teaching Flow 5 STEP** (`D.step`)
   - 우리말로 먼저 생각하기 → 이전 단원 복습 → 문제 제기 → 규칙 발견 → 결론(🔑)
   - 빈칸은 `{{정답}}`. 이어서 오늘의 핵심 3문장(`D.infoBox`)과 지도 팁(`D.tip`)
3. **Point 1 … n** (`D.gradeSection('Point n', 제목, 학년)`)
   - 항목을 누락 없이 나눈다(보통 6~10개).
   - 설명 표(`D.table`, 열 너비 합 9638) + 필요하면 비교 박스(`D.infoBox`)
   - 암기할 것이 있으면 `D.davidTip`
   - `D.examPoint`: 출제포인트 대표 예제 2개
   - `D.pick`: DAVID'S PICK (4장)
   - `D.caution`: 출제 주의(교사용에만)
   - 형태 변화 등 쓰기 연습이 필요하면 형태 쓰기 표(학생 빈칸 / 교사 빨간 정답)
   - **PRACTICE n** (`D.drill`): 단계별 **정확히 10문항**, 번호는 세트 안에서 이어진다.

| 단계 | type | 유형 |
|---|---|---|
| Basic ① | `choice` | 괄호 양자택일 |
| Basic ② | `fill` | `bogi`: <보기> 단어 10개(한 번씩) + 문장 속 `[[정답]]` 빈칸 |
| Intermediate | `write` | 어법상 틀린 부분 찾아 고치기 (`a: '틀린 것 → 고친 것'`) |
| Advanced · 모두 고르기 | `multi` | 5문항, `free: true`. 정답 2~3개 |
| Advanced · 객관식 | `mcq` | 5문항, `free: true`. 하나 고르기만 |
| 전환 · 연결 | `write`, `long: true` | 전환 · 연결이 가능한 Point에는 반드시 10문항 추가 |

   - multi 중 1개 이상은 **문법 용어 판단**(밑줄 + → 설명), 1개 이상은 대화문 · 글 속 ⓐ~ⓔ(`fix: true`).
   - mcq에는 학교 시험형을 섞는다: 도표 · 메뉴판 일치, 대화 빈칸, 틀린 개수, (A)(B)(C) 짝, 배열 n번째 단어, 쓰임 구별, 의미가 다른 것.
4. **PERFECT CHECK** 상위권 함정 체크 20문항(`choice`, `free: true`). 이전 단원 문법을 섞은 문항 2개 이상.
5. **WRITE** 서술형 10문항 (`D.writeItem`): Basic 2 / Intermediate 4(전환 · 연결) / Advanced 2(조건 영작 · 배열) / Advanced 2(틀린 부분 2개 + 이유)
6. **MAP** DAVID'S MAP 백지노트 테스트: 안내문 + 도식(학생 빈칸 / 교사 정답) + 자가 체크 표
7. **MEMO** 보강 메모 (`D.memo`, 교사용에만)

## 4. DAVID'S PICK — 학교 시험 출제 포인트 + 문제 유형

- 위치: 각 Point의 출제포인트 예제 바로 다음, 출제 주의 앞. 학생 · 교사 파일 모두에 들어간다(정답 없음).
- 코드: `D.pick(rows, m)` — `rows = [[출제 포인트, 시험 유형, 빈출, 연습 문항], ...]`
- **출제 포인트:** 학생이 틀리는 판단 기준을 한 줄로. 맞는 형태와 틀린 형태를 함께 쓴다. 예) `older vs elder (than 앞은 older)`
- **시험 유형:** 아래에서 1~3개
  괄호 고르기 · <보기> 빈칸 · 공통 빈칸 · 빈칸에 들어갈 수 없는 것 · 오류 수정 · 틀린/옳은 것 모두 · 틀린 개수 · (A)(B)(C) 짝 · 쓰임 구별 · 의미 같은 것/다른 것 · 대화 빈칸 · 글 속 ⓐ~ⓔ · 도표 · 메뉴판 · 그래프 일치 · 배열 · n번째 단어 · 우리말 영작 · 조건 영작(단어 수) · 서술형 문장 전환 · 두 문장 연결 · 오류 2개 + 이유
- **빈출:** ★★★ 거의 매 시험 / ★★ 자주 / ★ 상위권 · 변별
- **연습 문항:** 그 포인트를 연습하는 PRACTICE 번호 (예: `3, 10, 26, 39` / `41~50`)
- Point당 3~5줄, 빈출 높은 순서. 참고 자료(기출, 교재 대비문제)에 실제로 나온 유형을 우선한다.
- 표에 적은 포인트마다 해당 유형 문항이 PRACTICE에 최소 1개 있어야 한다. 없으면 문항을 추가한다.
- 고등 배지 Point는 수능 어법 유형도 적는다.

## 5. 리뉴얼 모드 (기존 단원 + 참고 교재 반영)

- 기존 docx의 설명 · 예문 · 표는 빠짐없이 살리고, 오타와 서식만 정리한다.
- 참고 교재(예: 3800제 1·2·3학년)의 개념 항목과 중간 · 기말 대비문제를 모두 읽고, 기존 자료에 없는 개념 · 예외 · 출제 유형을 Point에 추가한다. 새 개념이 크면 Point를 새로 만든다.
- 참고 교재의 문제는 그대로 옮기지 않는다. 같은 출제 포인트로 문장을 새로 쓴다. 단어 형태 변화 목록처럼 단어만 있는 목록은 써도 된다.
- 학년 배지는 참고 교재에서 그 내용이 처음 나오는 학년을 기준으로 정한다.

## 6. 표기 규칙 — 출처 금지 · 사람이 쓴 자료처럼

**출처 표기 금지 (학생용 · 교사용 공통, 표지 포함)**
- 참고 교재 이름(중학영문법 3800제 등), 출판사, "OO 반영", "OO 기준", "PRACTICE n 유형", "신규", "(3800제 2학년)" 같은 출처 · 제작 과정 표기를 문서 어디에도 쓰지 않는다.
- 표지 정보표에는 구성 · 학년 범위 · 대상처럼 수업에 필요한 것만 쓴다.
- 출처와 반영 내역은 작업이 끝난 뒤 사용자에게 채팅으로만 보고한다.

**AI 티 내지 않기**
- 선생님이 직접 쓴 수업 자료처럼 쓴다. 설명은 짧은 명사형 · 개조식("~한다", "~이다", "→ 형용사")으로 통일하고, 학생에게 말을 거는 문장은 안내문 한두 곳에만 둔다.
- 쓰지 않는 표현: "~해 보세요!"를 남발하는 말투, "완벽 정리", "핵심 꿀팁", "놓치지 마세요", 과장 수식어, 같은 말을 되풀이하는 요약 문장.
- 긴 줄표(—)는 제목 구분에만 쓴다. 설명문 안에서는 쉼표나 괄호, 화살표(→)로 바꾼다.
- 이모지는 정해진 자리(✏️ PRACTICE, 💡 DAVID'S TIP, 📌 DAVID'S PICK, ⚠ 주의 박스, 🔑 결론)에만 쓴다. 본문 문장에는 넣지 않는다.
- 예문은 학생 생활에 맞는 자연스러운 문장으로 쓰고, 같은 문장 틀을 반복하지 않는다. 이름 · 장소 · 상황을 바꾼다.
- 정답 근거(교사용)는 판단 기준만 한 줄로 쓴다(예 `현재완료 + 최근에 = lately`).

## 7. 재시험 B세트 (따로 파일)

- `meta.retest = { set: 'B', total: N, pass: Math.ceil(N * 0.8) }`. 이름 · 날짜 · 점수 · 통과 기준 칸이 자동으로 들어간다.
- 본 자료와 **같은 포인트, 다른 문장**. 문항 수: Point 수 × 2 (최소 10, 최대 20), 모든 Point에서 1문항 이상.
- `D.drill(null, '', [...])` 한 세트: `choice` → `fill`(<보기>) → `write`(오류 수정) → `multi` 1~2문항. 모든 단계 `free: true`, level 이름 A, B, C, D. 10분 분량.

## 8. 문항 품질 기준

- Basic: 교과서 예문 수준의 자연스러운 문장, 12단어 이내
- Intermediate 이상: 학교 기출처럼 함정을 넣는다(이중부정, 수일치, 선행사 판단, 시제 짝, 형태가 같은 품사, 전치사 유무 등). 오답 선지는 학생이 실제로 쓰는 오류로 만든다.
- 정답 유일성: `choice`와 `fill`은 정답이 하나만 가능해야 한다. 판단이 갈리면 우리말 힌트나 첫 글자 힌트를 준다.
- 모든 문항에 `why`(근거)를 한 줄로 쓴다.
- 애매한 용법이나 영미 차이가 있는 문장은 쓰지 않는다.

## 9. 코드 작성법

- `david/build_{코드}.js`, `david/retest_{코드}.js`, `david/picks_{코드}.js`를 만든다. 도식은 `map_{코드}.py`.
- 실행: `cd david/out && node ../build_{코드}.js . && node ../retest_{코드}.js .`

**인라인 마크업** (`D.rich`)

| 표기 | 결과 |
|---|---|
| `**굵게**` | 굵게 |
| `~~강조~~` | 코랄 강조 |
| `__밑줄__` | 밑줄 |
| `{{정답}}` | 학생: 빈 괄호 / 교사: 빨간 정답 |
| `[[정답]]` | 학생: 밑줄 빈칸 / 교사: 빨간 밑줄 정답 |

- 문항 문장 안에 `______` 같은 밑줄 빈칸을 직접 쓰지 않는다(`__밑줄__` 마크업과 충돌). 빈칸은 `[[ ]]`로 쓴다.

**Point 견본**

```js
D.gradeSection('Point 1', '형용사와 형태가 같은 부사', ['중1', '중2']),
...D.table(['단어', '형용사 / 부사', '-ly 부사'], [['hard', '어려운 / 열심히', '**hardly** 거의 ~않다']], [1800, 3900, 3938], m),
...D.davidTip('ly를 달면 딴사람 된다!', ['하들리 · 레이틀리 · 하일리 · 니얼리', '"ly 달면 딴사람!"']),
...D.examPoint([{ q: 'He studied (hard / hardly) for the test.', a: 'hard', why: '열심히 — 긍정' }], m),
...D.pick([['hard vs hardly (뜻 반대)', '괄호 고르기 · 오류 수정', '★★★', '1, 4, 21'],
           ['hardly + not 이중부정 ✕', '틀린 개수 · 대화문 ⓐ~ⓔ', '★★', '25, 32']], m),
...D.caution(['hardly never / not 이중부정 오답 선지로 자주 출제'], m),
...D.drill(1, '형용사와 형태가 같은 부사', [ /* 단계별 10문항 */ ], m),
```

## 10. 검증 (전달 전 필수)

1. 생성할 때 `[DAVID] ... 문항 수` 경고가 없어야 한다.
2. `soffice --headless --convert-to pdf` 후 `pdftoppm -r 70 -png`로 모든 쪽을 직접 본다(표 잘림, 제목만 쪽 끝에 남음, 폰트, 로고).
3. `pandoc -t plain`으로 텍스트를 뽑아 확인한다.
   - 학생용: '근거', '지도 팁', '출제 주의', '보강 메모' 0개
   - 모든 파일: 'TRICK' 0개, 참고 교재 이름 · '반영' · '기준' · '신규' 같은 출처 표기 0개
   - 본문(표지 제외)에 '학생용', '교사용' 0개
4. 정답을 한 번 더 푼다. multi 정답 기호, 개수 문항의 개수, 조건 영작의 단어 수, n번째 단어를 직접 센다.
5. DAVID'S PICK의 연습 문항 번호가 실제 PRACTICE 번호와 맞는지 확인한다.
6. 4개 파일을 전달하고, Point 구성 · 학년 범위 · 참고 교재에서 추가한 내용을 채팅으로 짧게 알린다.
