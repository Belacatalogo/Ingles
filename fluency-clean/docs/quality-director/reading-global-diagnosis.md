# Diagnóstico GLOBAL — P1 de Reading (Bloco 25D)

> Documento de diagnóstico. Cobre todos os P1 de Reading em A1–C2.
> Causa raiz: **falso positivo do auditor** (`auditReading`). A factory
> `createReadingLesson` preserva os campos; o auditor é que não reconhece os
> schemas reais. Há ainda um pequeno conjunto de aulas com **gap real de
> estratégia** (sem mascaramento).

## 1. Baseline oficial de referência

`fluency-clean/docs/quality-director/latest/quality-director-latest.md`,
gerado em `2026-05-21T10:16:21.272Z`:

- **P0: 0**
- **P1: 207**
- **P2: 1025**
- exercise-quality P1: **0**
- pillar-quality P1: **206**
- lesson-quality P1: **0**

## 2. Total de P1 Reading por nível

75 aulas Reading ready. **76 P1** de Reading no pillar-quality:

| Nível | P1 |
|---|---|
| A1 | 12 |
| A2 | 0 |
| B1 | 8 |
| B2 | 15 |
| C1 | 26 |
| C2 | 15 |
| **Total** | **76** |

## 3. Total por tipo de falha

| Título | Ocorrências |
|---|---|
| Reading sem estratégia de leitura clara | 43 |
| Reading com texto principal curto demais | 13 |
| Reading com poucas perguntas de compreensão/evidência | 12 |
| Reading sem linguagem de evidência textual | 8 |

## 4. Fontes reais das aulas Reading

Carregamento idêntico aos outros pilares: `getStaticLessons(level)` →
`createReadingLesson` (lessonFactories.js:237). Sem duplicação relevante; merge
mantém a primeira ocorrência. **A factory preserva** `mainText`, `passage`,
`readingText`, `tasks`, `preReading`, `firstReadTask`, `secondReadTasks`,
`readingPurpose`, `readingStrategy`, `guidedBeforeQuiz`, `evidenceQuestions`,
`comprehensionQuestions`, `evidenceTasks`, `guidedSummary`, `discussionTasks`.
Nenhuma fonte de Reading usa `inputText`/`mainPassage` (a factory tem o campo
`inputText` mas nenhuma aula o usa) → **a factory não descarta conteúdo**.

Existem **três schemas de autor** para Reading:

| Schema | Texto | Estratégia | Perguntas | Níveis |
|---|---|---|---|---|
| A (A1) | `mainText` (176–336) | `preReading` | `evidenceQuestions`+`comprehensionQuestions` | A1 |
| B (A2/B1/B2) | `mainText` (348–2987) | `readingStrategy`/`guidedBeforeQuiz` (A2) ou `firstReadTask`/`readingPurpose`/`secondReadTasks` (B1/B2) — às vezes ausente | `evidenceQuestions`/`comprehensionQuestions` | A2, B1, B2 |
| C (C1/C2) | `passage` (2160–3482) | `tasks` analíticos `{instruction,note,expected}` | `tasks` | C1, C2 |

## 5. Diagnóstico do auditor (`auditReading`)

```
texto:      clean(mainText || text || readingText) < 180  → P1   (ignora passage/inputText)
estratégia: requireField(readingStrategy, strategy, guidedBeforeQuiz)  → P1   (ignora preReading, firstReadTask, readingPurpose, secondReadTasks, tasks)
perguntas:  requireMinimumList(evidenceQuestions, comprehensionQuestions, questions) < 3  → P1   (ignora tasks, secondReadTasks, evidenceTasks)
evidência:  regex /evidence|evidência|texto|frase|prova/ em clean(lesson)  → P1   (não reconhece evidenceTasks/tasks.expected estruturais)
```

### Classificação dos 76 P1 (verificado por script)

| Classe | Lições | P1 | Causa |
|---|---|---|---|
| **Falso positivo do auditor** | ~49 | ~62 | texto em `passage`, perguntas em `tasks`, estratégia em `preReading`/`firstReadTask`/`readingPurpose`/`secondReadTasks`/`tasks` — todos entregues mas ignorados |
| **Gap real de estratégia** | 13 | 13 | aula vai do texto direto às perguntas, sem `preReading`/`firstReadTask`/`tasks` analíticos (B1-003..007, B2-006..011/014, C1-001) |
| **Texto realmente curto** | 1 | 1 | A1-READING-018 (176 chars < 180) |

## 6. Tabela de amostras (antes/depois da factory — sempre iguais)

| lesson id | nível | texto (auditor vê / real) | estratégia | perguntas | causa | correção |
|---|---|---|---|---|---|---|
| A1-READING-004 | A1 | 336 / 336 (`mainText`) | `preReading`(3) ignorado | evidence+comp 12 | auditor ignora `preReading` | auditor |
| A1-READING-018 | A1 | 176 / 176 (`mainText`) | `preReading`(3) | 12 | texto genuinamente curto (176<180) | conteúdo (borderline) |
| B1-READING-001 | B1 | 1047 / 1047 | `firstReadTask` ignorado | 10 | auditor ignora `firstReadTask` | auditor |
| B1-READING-003 | B1 | 1461 / 1461 | (nenhuma) | 10 | sem scaffold de estratégia | gap real |
| B2-READING-002 | B2 | 1839 / 1839 | `firstReadTask`+`readingPurpose` ignorados | evidence 4 | auditor ignora campos | auditor |
| B2-READING-006 | B2 | 0 / 2804 (`mainText`=2804, mas sem strat) | (nenhuma) | 10 | sem scaffold de estratégia | gap real |
| C1-READING-002 | C1 | **0** / 2804 (`passage`) | `tasks`(6) ignorados | `tasks`(6) ignorados | auditor ignora `passage`+`tasks` | auditor |
| C2-READING-001 | C2 | **0** / 2700 (`passage`) | `tasks`(4) | `tasks`(4) | auditor ignora `passage`+`tasks` | auditor |

## 7. Diagnóstico

| Hipótese | Veredito |
|---|---|
| Auditor falso positivo | **SIM** (causa principal). Ignora `passage`/`inputText` (texto), `tasks`/`secondReadTasks`/`evidenceTasks` (perguntas), `preReading`/`firstReadTask`/`readingPurpose`/`secondReadTasks`/`tasks` (estratégia), evidência estrutural. |
| Factory descarta campos | **NÃO.** `createReadingLesson` preserva tudo; nenhuma fonte usa campo descartado. |
| Conteúdo realmente fraco | **PARCIAL e pequeno.** 13 aulas sem scaffold de estratégia + 1 com texto curto (A1-018). Não são vazias — têm texto e perguntas — mas faltam orientação de leitura. |
| Import/duplicação | **NÃO.** |
| Schema antigo/variante não reconhecido | **SIM**, nos três schemas. |

## 8. Plano de correção global recomendado

### Correção única — Auditor (`pillarQualityRules.js`, `auditReading`)
Aditivo e conservador (mantém critérios atuais; nunca aumenta P1):

- **Texto principal:** medir o maior comprimento entre `mainText`, `text`,
  `readingText.body/text`, `passage`, `mainPassage`, `inputText` (limiar 180).
  → corrige C1/C2 "texto curto" (texto real em `passage`).
- **Estratégia:** reconhecer `readingStrategy`/`strategy`/`guidedBeforeQuiz`/
  `preReading`/`beforeReading`/`skimmingTask`/`scanningTask`/`gistTask`/
  `detailTask` + `firstReadTask`/`readingPurpose` substantivos + `secondReadTasks`
  + `tasks` analíticos (≥2 com instrução ≥40 chars). → corrige A1, B1-001/002/008,
  B2-002..005, C1/C2.
- **Perguntas:** contar também `tasks`/`secondReadTasks`/`evidenceTasks`/
  `openQuestions`/`inferenceQuestions` (min 3). → corrige C1/C2.
- **Evidência:** reconhecer estruturalmente `evidenceQuestions`/`evidenceTasks`/
  `tasks[].expected|note` além do regex. → corrige B2/C1.
- **NÃO aceitar** `title`/`topic` como texto, nem objetivo genérico como
  estratégia, nem `guidedSummary`/`comprehensionQuestions` puros como estratégia
  (evita conflar comprehension com orientação de leitura).

**Efeito esperado:** Reading P1 76 → 14 (pillar-quality 206 → ~144).

**Não mascara:** as 14 restantes (A1-018 texto curto; B1-003..007, B2-006..011/014,
C1-001 sem scaffold de estratégia) **permanecem P1** — são gap real de conteúdo,
não falso positivo. Devem ser tratadas num bloco separado (adicionar
`firstReadTask`/estratégia), com autorização — **não** editar aula por aula agora.

**Arquivos a alterar:** somente `e2e/quality-director/helpers/pillarQualityRules.js`.
Sem tocar factory, conteúdo, Grammar/Writing/Vocabulary, exercise-quality.

**Risco:** baixo. Espelha os fixes aprovados de Grammar/Vocabulary (reconhecer
evidência estrutural real). Validar pillar/exercise/lesson nos 2 viewports.
