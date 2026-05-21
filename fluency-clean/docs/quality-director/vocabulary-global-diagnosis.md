# Diagnóstico GLOBAL — P1 de Vocabulary (Bloco 24D)

> Documento de diagnóstico. Cobre todos os P1 de Vocabulary em A1–C2.
> A causa raiz é **dupla**: parte é falso positivo do auditor, parte é
> **bug de factory** que descarta o conteúdo da fonte.

## 1. Baseline oficial de referência

`fluency-clean/docs/quality-director/latest/quality-director-latest.md`,
gerado em `2026-05-21T09:46:27.669Z`:

- **P0: 0**
- **P1: 298**
- **P2: 1040**
- exercise-quality P1: **0**
- pillar-quality P1: **297**
- lesson-quality P1: **0**

## 2. Total de P1 Vocabulary por nível

95 aulas Vocabulary ready. **92 P1** de Vocabulary no pillar-quality:

| Nível | P1 |
|---|---|
| A1 | 16 |
| A2 | 0 |
| B1 | 14 |
| B2 | 22 |
| C1 | 22 |
| C2 | 18 |
| **Total** | **92** |

## 3. Total por tipo de falha

| Título | Ocorrências |
|---|---|
| Vocabulary sem contexto real de uso | 59 |
| Vocabulary com poucas palavras úteis | 33 |

## 4. Fontes reais das aulas Vocabulary

Carregamento: `getStaticLessons(level)` → `lesson()` mescla `mapItem` +
`findStaticReadyLesson(id)`; o conteúdo ready vem das fontes deep/full via
`createVocabularyLesson` (lessonFactories.js:160). Não há duplicação relevante;
`mergeUniqueLessons` mantém a primeira ocorrência.

Existem **três schemas de autor diferentes** para Vocabulary:

| Schema | Campos do autor | Níveis/arquivos | Factory preserva? |
|---|---|---|---|
| A (reconhecido) | `essentialWords`, `lexicalSets`, `examples`, `chunks`, `miniDialogues`, `realLifeUseCases`, `topicContext`, `recognitionPractice`, `usagePractice`, `productionTasks` | A1, A2, B1, B2-001..012 (deep* files) | **SIM** |
| B (descartado) | `targetWords`, `practiceExercises`, word-level `exampleSentences` | B2-013+ e C1 (deepB2GlobalIssuesPart1, deepB2AcademicPart1, deepB2CheckpointsPart1, deepC1BridgePart1, deepC1AdvancedGrammarPart1) | **NÃO** |
| C (descartado) | `words: [{word,definition,example,collocations}]` | C2 (deepC2BridgePart1/Part2 etc.) | **NÃO** |

`createVocabularyLesson` lê apenas `essentialWords/examples/lexicalSets/chunks/
miniDialogues/recognitionPractice/usagePractice/productionTasks/topicContext/...`.
Não lê `targetWords`, `words`, nem `practiceExercises`. Para os schemas B e C, o
resultado final tem `essentialWords:[]`, `examples:[]`, etc., e ainda recebe um
`recognitionPractice` de **fallback genérico** (`createFallbackVocabularyPractice`)
com conteúdo placeholder ("hello = olá") — visível inclusive em aulas C2 de
precisão. **O conteúdo rico do autor é perdido.**

### Classificação dos 92 P1

| Classe | Lições | P1 | Causa |
|---|---|---|---|
| **Falso positivo do auditor** | 34 (A1:8, B1:14, B2:12) | 42 | conteúdo real entregue, mas em campos que o auditor ignora |
| **Bug de factory (conteúdo perdido)** | 25 (B2:5, C1:11, C2:9) | 50 | fonte tem `targetWords`/`words`/`practiceExercises`, descartados pela factory → aula final vazia |

Falsos positivos do auditor:
`A1-VOCABULARY-006..011, 017, 018`; `B1-VOCABULARY-004..017`;
`B2-VOCABULARY-001..012`.

Bug de factory (aula entregue vazia):
`B2-VOCABULARY-013..017`; `C1-VOCABULARY-001..011`; `C2-VOCABULARY-001..009`.

## 5. Tabela de amostras (antes/depois da factory)

| lesson id | nível | arquivo fonte | volume antes | volume depois | contexto antes | contexto depois | causa | correção |
|---|---|---|---|---|---|---|---|---|
| A1-VOCABULARY-006 | A1 | deep A1 vocab | lexicalSets 2×10 | lexicalSets 2×10 (preservado) | examples 12 `{text,translation}` | examples 12 (preservado) | auditor ignora lexicalSets/examples | auditor |
| A1-VOCABULARY-011 | A1 | deep A1 vocab | lexicalSets 2×10 | preservado | examples 12 | preservado | auditor | auditor |
| B1-VOCABULARY-004 | B1 | deepB1* | essentialWords 16 | preservado | miniDialogues 1 + essentialWords[].example | preservado | auditor ignora miniDialogues/word.example | auditor |
| B2-VOCABULARY-001 | B2 | deepB2AcademicPart1 | essentialWords 10 | preservado | topicContext 188 + miniDialogues 2 | preservado | auditor ignora topicContext/miniDialogues | auditor |
| B2-VOCABULARY-013 | B2 | deepB2GlobalIssuesPart1 | `targetWords` (rico) | **essentialWords [] (perdido)** | word.exampleSentences | **[] (perdido)** | factory descarta targetWords/practiceExercises | factory |
| C1-VOCABULARY-001 | C1 | deepC1BridgePart1 | `targetWords` 12 (word/def/exampleSentences/collocations) | **[] (perdido)** | word.exampleSentences + practiceExercises | **[] (perdido)** | factory descarta targetWords | factory |
| C2-VOCABULARY-001 | C2 | deepC2BridgePart1 | `words` 8 (word/def/example/collocations) | **[] (perdido)** | word.example | **[] (perdido)** | factory descarta `words` | factory |

## 6. Diagnóstico

| Hipótese | Veredito |
|---|---|
| Auditor falso positivo | **SIM** para 34 aulas (A1/B1/B2-001..012): conteúdo entregue em `lexicalSets`/`examples`/`miniDialogues`/`topicContext`/`essentialWords[].example`, não reconhecido. |
| Factory descarta campos | **SIM** para 25 aulas (B2-013+/C1/C2): `targetWords`/`words`/`practiceExercises` ignorados por `createVocabularyLesson`. |
| Conteúdo realmente fraco | **NÃO.** As 25 "vazias" têm conteúdo rico na fonte; o problema é a factory, não a autoria. |
| Import/duplicação | **NÃO.** Merge correto, sem versão rasa sobrescrevendo premium. |
| Schema antigo não reconhecido | **SIM**, nas duas frentes (auditor + factory). |

## 7. Plano de correção global recomendado

Duas correções independentes e seguras:

### Correção 1 — Auditor (`pillarQualityRules.js`, `auditVocabulary`)
- **Volume:** contar também `lexicalSets[].items/words/entries` e `chunks` reais,
  além de `essentialWords/vocabulary/keyVocabulary/preReadingVocabulary` (min 5).
- **Contexto:** aceitar também `examples` com frase (≥3), `miniDialogues` reais,
  `essentialWords[].example` (≥3), `topicContext` substancial (≥60), além dos
  campos atuais.
- **Aditivo e conservador:** mantém os checks atuais como caminho de aceitação
  (nunca aumenta P1). Não aceita lista vazia, label ou só tema/título.
- **Importante — NÃO mascara o bug de factory:** o auditor reconhece apenas
  campos *entregues* (pós-factory). As 25 aulas do bug de factory continuam com
  todos esses campos vazios → **permanecem P1** até a factory ser corrigida.
- Efeito esperado: limpa 42 P1 (pillar-quality 297 → ~255).
- Risco: baixo. Espelha o fix de Grammar já aprovado (`9c47982`).

### Correção 2 — Factory (`lessonFactories.js`, `createVocabularyLesson`)
- Mapear `targetWords` e `words` → `essentialWords`
  (`{word, meaning/definition, example/exampleSentences, note, collocations}`),
  preservando os campos equivalentes da fonte sem sobrescrever `essentialWords`
  já existente.
- Mapear `practiceExercises` → `usagePractice`/`productionTasks` conforme `type`.
- Promover `word.exampleSentences`/`word.example` a contexto utilizável.
- **Não criar fallback raso.** O fallback genérico atual
  (`createFallbackVocabularyPractice` "hello = olá") deveria só atuar quando não
  há nenhuma prática real — após o mapeamento, as aulas B/C terão prática real.
- Efeito esperado: restaura conteúdo real nas 25 aulas → resolve 50 P1 **e**
  corrige a experiência do aluno (aulas hoje entregues vazias).
- Risco: médio. **Altera conteúdo entregue** ao aluno (não só auditoria).
  Afeta 25 aulas em 3 schemas. Requer validação cuidadosa e, idealmente,
  autorização explícita antes de mexer na factory.

### Sequência recomendada
1. Aplicar **Correção 1** (auditor) — segura, sem mudar conteúdo, limpa 42 P1.
2. Apresentar **Correção 2** (factory) para autorização, por alterar conteúdo
   entregue em escala (25 aulas).

### Validação necessária (ambas)
- pillar-quality P1 cai de 297; exercise-quality P1 = 0; lesson-quality P1 = 0;
  P0 = 0; "Resposta correta não aparece" = 0; sem regressão de Grammar/Writing;
  P1 geral não sobe. Rodar iPhone 13 + iPhone SE.
