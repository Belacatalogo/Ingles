# SRS Tags Coverage Expansion Report — FASE 5.4B

**Data:** 2026-05-18  
**Branch:** main  
**Status:** CONCLUÍDO ✅

---

## O que foi implementado

### Problema

A2→C2 usavam tags genéricas de ficheiro via `const common` spread:

```js
// Exemplo — deepA2Bridge.js (todos os 6 lessons do arquivo partilham as mesmas tags)
const common = { level, status, estimatedMinutes: 60, tags: ['a2-1', 'bridge', 'survival-expansion', 'deep-approved-target'] };
```

`extractPillarFromTags(tags)` verifica `tags[1]` contra pillars conhecidos (grammar/vocabulary/etc.). Como `tags[1] = 'bridge'` não é um pilar, o SRS criava itens inúteis: `bridge`, `survival-expansion`, `deep-approved-target`.

### Solução: Tag Maps Externos

Criada a diretoria `src/content/curriculum/srsTagMaps/` com mapas externos de tags pedagógicas por lesson ID. O `lessonSrsAdvanced.js` foi modificado para usar esses mapas como fallback quando `lesson.tags[1]` não é um pilar conhecido.

**Zero ficheiros de lição modificados** — os 75 arquivos de lição A2→C2 permanecem intactos.

---

## Tag Schema

```
[level, pillar, unit-theme, specific-concept, communicative-function, difficulty-band]
```

| Posição | Exemplos |
|---------|---------|
| 0 — level | `a2`, `b1`, `b2`, `c1`, `c2` |
| 1 — pillar | `grammar`, `vocabulary`, `reading`, `listening`, `speaking`, `writing`, `checkpoint` |
| 2 — unit-theme | `past-simple`, `comparatives`, `opinions`, `professional-email` |
| 3 — specific-concept | `regular-verbs-affirmative`, `modal-verbs-for-advice`, `c1-argument-vocabulary` |
| 4 — communicative-function | `narrating-past`, `giving-nuanced-advice`, `sustained-argumentation` |
| 5 — difficulty-band | `a2-foundation`, `a2-core`, `b1-core`, `b1-advanced`, `b2-advanced`, `c1-advanced`, `c2-mastery`, `*-assessment` |

---

## Cobertura

### Lições principais (532 no currículo)

| Nível | Lições no currículo | Mecanismo | Cobertura |
|-------|--------------------:|-----------|-----------|
| A1 (não-checkpoint) | 132               | `lesson.tags` directo (FASE 5.3) | 100% ✅ |
| A1 checkpoints     | 7 + 2 exames       | `assessmentTags.js` | 100% ✅ |
| A2    | 122                 | `a2Tags.js` | 100% ✅ |
| B1    | 73                  | `b1Tags.js` | 100% ✅ |
| B2    | 83                  | `b2Tags.js` | 100% ✅ |
| C1    | 73                  | `c1Tags.js` | 100% ✅ |
| C2    | 42                  | `c2Tags.js` | 100% ✅ |
| **Total currículo** | **532**     |           | **100% ✅** |

### Lições extra-currículo (mastery gates A2/B1/B2 — além das 532)

| ID | Título | Ficheiro |
|----|--------|---------|
| A2-CHECKPOINT-NARRATIVE | A2 Checkpoint — Narrative & Daily Life | `assessmentTags.js` |
| A2-CHECKPOINT-COMMUNICATION | A2 Checkpoint — Comparisons & Communication | `assessmentTags.js` |
| A2-FINAL-EXAM | A2 Final Exam — Ready for B1 Gate | `assessmentTags.js` |
| B1-CHECKPOINT-MID | B1 Checkpoint — Mid-course | `assessmentTags.js` |
| B1-CHECKPOINT-FINAL | B1 Checkpoint — Final | `assessmentTags.js` |
| B1-FINAL-EXAM | B1 Final Exam — Ready for B2 Gate | `assessmentTags.js` |
| B2-CHECKPOINT-MID | B2 Checkpoint — Mid-course | `assessmentTags.js` |
| B2-CHECKPOINT-FINAL | B2 Checkpoint — Final | `assessmentTags.js` |
| B2-FINAL-EXAM | B2 Final Exam — Ready for C1 Gate | `assessmentTags.js` |

**Nota:** Estas 9 lições estão em ficheiros de mastery gate (a2/b1/b2MasteryAssessments.js) e não são contadas nas 532, mas são completadas pelos alunos. Têm agora entradas no tag map.

---

## Ficheiros criados

| Ficheiro | Conteúdo |
|---------|---------|
| `src/content/curriculum/srsTagMaps/a2Tags.js` | 122 lesson tags A2 |
| `src/content/curriculum/srsTagMaps/b1Tags.js` | 73 lesson tags B1 |
| `src/content/curriculum/srsTagMaps/b2Tags.js` | 83 lesson tags B2 |
| `src/content/curriculum/srsTagMaps/c1Tags.js` | 73 lesson tags C1 |
| `src/content/curriculum/srsTagMaps/c2Tags.js` | 42 lesson tags C2 |
| `src/content/curriculum/srsTagMaps/assessmentTags.js` | 20 checkpoint + exam entries (A1 checkpoints + A2/B1/B2 mastery gates) |
| `src/content/curriculum/srsTagMaps/index.js` | Exports `getSrsTagsForLesson` + `hasPedagogicalTags` |
| `docs/SRS_TAGS_COVERAGE_EXPANSION_REPORT.md` | Este documento |

## Ficheiros modificados

| Ficheiro | Mudança |
|---------|---------|
| `src/services/lessonSrsAdvanced.js` | Import de `getSrsTagsForLesson` e `hasPedagogicalTags`; lógica de fallback em `registerLessonTagsInSrs` |
| `docs/AUTO_RESUME_NEXT_BLOCK.md` | FASE 5.4B marcada como concluída |

---

## Como funciona o fallback

```js
// Em registerLessonTagsInSrs({ lesson, flowErrors, flowScore }):

const rawTags = Array.isArray(lesson?.tags) ? lesson.tags : [];
// Se lesson.tags[1] não é pilar conhecido (ex: 'bridge'), usa o tag map externo
const tags = hasPedagogicalTags(rawTags) ? rawTags : (getSrsTagsForLesson(lessonId) || rawTags);
const effectivePillar = extractPillarFromTags(tags) || basePillar;
```

`hasPedagogicalTags(['a2-1', 'bridge', ...])` → `false` → usa tag map  
`hasPedagogicalTags(['a2', 'grammar', ...])` → `true` → usa tags originais (A1 mantém comportamento actual)

---

## Como testar

```js
import { getSrsTagsForLesson, hasPedagogicalTags } from './srsTagMaps/index.js';

// Tags genéricas de ficheiro — retorna false
hasPedagogicalTags(['a2-1', 'bridge', 'survival-expansion']);  // → false

// Tags pedagógicas (A1) — retorna true
hasPedagogicalTags(['a2', 'grammar', 'past-simple', 'regular-verbs']);  // → true

// Lookup por ID
getSrsTagsForLesson('A2-GRAMMAR-001');
// → ['a2', 'grammar', 'sentence-structure', 'auxiliaries-do-does', 'question-formation', 'a2-foundation']

getSrsTagsForLesson('C2-CHECKPOINT-001');
// → ['c2', 'checkpoint', 'mastery-gate', 'c2-mastery-gate', 'c2-final-assessment', 'c2-assessment']

getSrsTagsForLesson('ID-INEXISTENTE');  // → []  (nunca throws)
```

---

## Estado pós-execução

| Métrica | Antes (FASE 5.4) | Depois (FASE 5.4B + validação) |
|---------|------------------|-------------------------------|
| Lições com tags SRS úteis | 139 (A1 only) | 532/532 + 9 mastery gates |
| Tag maps externos | 0 | 7 ficheiros + index |
| Ficheiros de lição modificados | 0 | 0 (zero) |
| Build | ✅ | ✅ |
| Cobertura SRS (currículo principal) | 26% | 100% |
| Cobertura SRS (incl. mastery gates) | ~23% | 100% |
| IDs sem cobertura | ~393 | 0 |

### Resumo de tag map entries

| Ficheiro | Entradas |
|---------|---------|
| a2Tags.js | 122 |
| b1Tags.js | 73 |
| b2Tags.js | 83 |
| c1Tags.js | 73 |
| c2Tags.js | 42 |
| assessmentTags.js | 20 (11 A1 + 9 extra mastery) |
| **Total** | **413** |

---

## Próximo passo

**FASE 5.5 — Gamification:** XP por revisão SRS, badges, streaks — aguardar autorização explícita.
