# BLOCO-H3 — Curriculum Practice Bridge · Currículo informa a Prática Profunda

Data: 2026-05-04
Branch: `rewrite-fluency-clean-lab`

## Status

Implementado tecnicamente.

## Objetivo

Criar uma ponte entre a aula/unidade curricular atual e a Prática Profunda, para que os builders recebam `context.curriculum` e possam priorizar exercícios ligados ao tópico exato da aula.

Exemplo: se a aula atual é Present Simple com rotina, a prática de Grammar prioriza frases e vocabulário como rotina, café da manhã, escola, trabalho, etc., sem excluir outros itens úteis do nível.

## Arquivos criados

- `fluency-clean/src/services/curriculumPracticeAdapter.js`
- `fluency-clean/docs/BLOCO-H3-CURRICULUM-PRACTICE-BRIDGE-LAB.md`

## Arquivos alterados

- `fluency-clean/src/practice/core/PracticeNormalizer.js`
- `fluency-clean/src/practice/PracticeLauncher.jsx`
- `fluency-clean/src/practice/core/builders/grammarBuilder.js`
- `fluency-clean/src/screens/LessonScreen.jsx`
- `fluency-clean/src/services/index.js`
- `REWRITE_HANDOFF.md`

## Implementação

### `curriculumPracticeAdapter.js`

Criado módulo com:

- `extractTopicKeywords(lesson)`
- `recordCurrentCurriculumUnit({ unitId, lessonId, lessonType, level, title, topicKeywords })`
- `recordLessonAsCurrentCurriculumUnit(lesson)`
- `getCurrentCurriculumUnit()`
- `buildCurriculumContextForBuilder(curriculumUnit)`
- `getCurrentCurriculumContextForBuilder()`

Comportamento:

- usa storage local, sem Firebase;
- expira a unidade após 12 horas;
- deduplica e limita keywords a 10;
- aceita aula gerada, preview ou aula com `curriculumUnit` explícito;
- se não houver unidade explícita, usa `lesson.curriculumUnit`, `lesson.unit`, `lesson.curriculum`, `lesson.unitId`, `lesson.curriculumUnitId`, `lesson.id`, `lesson.generationMeta.id` ou `lesson.title` como fallback seguro;
- `isTopicRelevant(word)` faz comparação flexível por inclusão entre palavra/frase e keywords.

### `PracticeNormalizer.js`

`normalizeLessonForPractice` agora lê a unidade curricular atual e inclui:

```js
curriculum: buildCurriculumContextForBuilder(getCurrentCurriculumUnit())
```

Se não houver unidade válida ou se expirou, `context.curriculum` vira `{}` e os builders continuam funcionando normalmente.

### `PracticeLauncher.jsx`

Antes de abrir a Prática Profunda, chama:

```js
recordLessonAsCurrentCurriculumUnit(lesson)
```

Isso garante que o storage curricular não seja perdido antes da normalização da prática.

### `LessonScreen.jsx`

Ao montar/alterar a aula visível, chama:

```js
recordLessonAsCurrentCurriculumUnit(lesson)
```

Isso registra a aula atual como unidade curricular local quando o aluno abre a tela de aula.

### `grammarBuilder.js`

Adicionado `prioritizeCurriculumSentences(sentences, context)`.

O builder de Grammar agora reordena as frases assim:

1. frases relevantes ao tópico curricular;
2. demais frases da aula/nível.

Importante: não força exclusividade. Se não houver frase relevante, a prática continua usando o fluxo antigo.

### `services/index.js`

Exports adicionados:

- `extractTopicKeywords`
- `recordCurrentCurriculumUnit`
- `recordLessonAsCurrentCurriculumUnit`
- `getCurrentCurriculumUnit`
- `buildCurriculumContextForBuilder`
- `getCurrentCurriculumContextForBuilder`

## Critérios de aceitação

- [x] `curriculumPracticeAdapter.js` criado com exports principais.
- [x] `LessonScreen.jsx` registra unidade/aula atual ao montar/alterar.
- [x] `PracticeLauncher.jsx` registra unidade/aula antes de iniciar prática.
- [x] `PracticeNormalizer.js` popula `context.curriculum`.
- [x] Builder de Grammar usa `context.curriculum.isTopicRelevant` para priorizar frases do tópico.
- [x] Após 12h, `getCurrentCurriculumUnit()` retorna `null`.
- [x] Aluno sem contexto curricular recebe `{}` e os builders funcionam normalmente.

## O que NÃO foi feito

- Não forcei os builders a usar apenas vocabulário do tópico.
- Não persisti nada no Firebase.
- Não alterei backend Azure privado.
- Não mexi em `bundle.js`.
- Não mexi em `main`.
- Não mexi em `rewrite-fluency-clean`.
- Não mexi no sistema de gravação, `speakingFlow.js`, `SpeakingStepper.jsx` ou `SpeakingScreen.jsx`.

## Checklist iPhone pendente

- Abrir aula Grammar/Present Simple com rotina.
- Iniciar Prática Profunda.
- Confirmar que exercícios priorizam frases/vocabulário do tópico da aula.
- Confirmar que a prática continua funcionando se não houver unidade curricular explícita.
- Simular expiração de 13h e confirmar que `getCurrentCurriculumUnit()` retorna `null`.

## Próximo bloco recomendado

`BLOCO-H4-CSS-CONSOLIDATION-LAB`.
