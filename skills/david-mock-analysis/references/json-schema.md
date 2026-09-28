# analysis.json 구조

`scripts/build_docx.js`가 읽는 입력 형식이다. 지문 여러 개를 `passages` 배열에 넣으면 한 책자(수업용 분석 자료 1파일)로 묶인다.
필드가 없으면 그 칸은 건너뛴다. 문자열 안에서 `**굵게**`, `==형광==`, `[[정답색]]` 표시를 쓸 수 있다.

```json
{
  "meta": {
    "title": "2026 9월 모평 지문분석",
    "short": "26_9월모평",
    "source": "2026학년도 9월 모의평가",
    "grade": "고3",
    "filename": "26_9월모평_18-24번_지문분석"
  },
  "passages": [
    {
      "number": "31",
      "type": "빈칸",
      "title_en": "Why Speaking in Public Feels So Stressful",
      "title_ko": "대중 앞 발표가 스트레스인 이유",
      "topic_en": "Our fear of public speaking comes from an evolutionary need to belong to a group.",
      "topic_ko": "대중 연설에 대한 두려움은 집단에 소속되어야 했던 진화적 필요에서 온다.",
      "summary": "한두 문장 한국어 요약",
      "flow": [
        {"range": "1~3", "stage": "도입", "text": "..."},
        {"range": "4~6", "stage": "전개", "text": "..."},
        {"range": "7~10", "stage": "결론", "text": "..."}
      ],
      "original": "원문 전체 (문단 구분은 \\n)",
      "sentences": [
        {
          "no": 1,
          "en": "What stresses you out more than anything?",
          "chunked": "What stresses you out / more than anything?",
          "structure": "What(S) stresses(V) you(O) out / more than anything",
          "literal": "무엇이 / 너를 스트레스로 지치게 하는가 / 다른 무엇보다 더",
          "ko": "무엇이 여러분에게 다른 무엇보다 스트레스를 주는가?",
          "tags": ["서술형 대비", "빈칸 추론", "문장 삽입", "주제문"],
          "points": [
            {"label": "①", "title": "구동사 목적어 위치", "text": "stress out처럼 '타동사+부사' 구동사의 목적어가 대명사면 반드시 동사와 부사 사이에 둔다."}
          ]
        }
      ],
      "vocab": [
        {
          "word": "exclude", "pos": "v", "meaning": "배제하다, 제외하다",
          "syn": ["leave out", "rule out", "bar"],
          "ant": ["include", "admit"],
          "deriv": ["exclusion n. 배제", "exclusive a. 배타적인, 독점적인"],
          "root": "ex(밖으로) + clud(닫다) → 밖에 두고 닫다"
        }
      ],
      "idioms": [
        {"phrase": "make it", "meaning": "살아남다, 해내다", "note": "You couldn't make it on your own."}
      ],
      "question": {
        "stem": "다음 빈칸에 들어갈 말로 가장 적절한 것은?",
        "note": "*starve: 굶주리다",
        "choices": ["Belonging", "Confidence", "Endurance", "Learning", "Competition"],
        "answer": 1
      },
      "solving": {
        "strategy": ["빈칸 문장부터 읽고 무엇을 찾아야 하는지 정한다", "..."],
        "evidence": [{"sent": [4, 8], "text": "집단에서 배제되지 않는 것이 생존에 결정적이었다"}],
        "explanation": "정답 해설 2~4문장",
        "wrong": [
          {"no": 2, "choice": "Confidence", "why": "발표 상황에서 떠올리기 쉬운 단어일 뿐 본문 근거가 없다"}
        ],
        "trap": "매력적 오답과 학생들이 자주 빠지는 함정 (선택)"
      },
      "naesin": {
        "likely_types": ["빈칸", "어법", "서술형", "문장 삽입", "주제"],
        "points": [
          {"sent": [4], "point": "가주어-진주어 not to be excluded", "how": "to부정사 부정어 위치를 어법 선지로"}
        ]
      },
      "grammar_plus": [
        {"title": "결과 부사절 so ~ that / such ~ that", "body": ["so+형/부+(that)+완전한 절", "such+(a/an)+형+명+(that)+완전한 절"], "examples": ["It was so cold that we stayed inside."]}
      ],
      "translation": "전체 해석 (없으면 sentences[].ko를 이어 붙임)"
    }
  ]
}
```

## 필드별 메모
- `sentences[].chunked`: 끊어읽기는 `/`로 의미 단위를 나눈다. 학생용 노트(--student)에도 그대로 나간다.
- `sentences[].structure`: 분석 자료에만 나가는 S/V/O/C 표시. 필요한 문장만 쓴다(쉬운 문장은 생략).
- `sentences[].tags`: `주제문`, `빈칸 추론`, `문장 삽입`, `서술형 대비`, `어법`, `어휘` 중 해당하는 것만.
- `naesin.likely_types`에 쓸 수 있는 값: 목적, 심경·분위기, 주장, 함축의미, 요지, 주제, 제목, 도표, 일치·불일치, 어법, 어휘, 빈칸, 무관한 문장, 순서, 문장 삽입, 요약, 지칭, 연결어, 서술형
- `question.answer`: 1~5 숫자. 문제가 없는 지문(외부 지문 등)이면 `question`·`solving`을 빼도 된다.
