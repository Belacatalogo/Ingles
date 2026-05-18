# SRS Advanced Integration Report — FASE 5.4

**Data:** 2026-05-18  
**Branch:** main  
**Commit:** (gerado ao final desta fase)

---

## O que foi implementado

### Novo serviço: `src/services/lessonSrsAdvanced.js`

Camada modular de SRS no nível de aula, operando 100% offline via localStorage.

**Storage key:** `fluency.clean.lessonSrsAdvanced.v1`

**Tipos de item SRS:**
| Tipo | Descrição | Fonte |
|------|-----------|-------|
| `lesson_concept_tag` | Conceito/tag da lição | `lesson.tags[]` |
| `error_concept` | Conceito com erro registrado | `flowErrors[]` (status: warn/missed) |
| `lesson_objective` | Objetivo de aprendizado | `lesson.objectives[]` |

**Status e intervalos (idênticos ao sistema existente):**
| Status | Intervalo | Condição |
|--------|-----------|---------|
| WEAK | 1 dia | Erro detectado |
| LEARNING | 2 dias | Conceito novo, sem erro |
| REVIEW | 4 dias | 1 acerto consecutivo |
| STRONG | 8 dias | 2 acertos consecutivos |
| MASTERED | 16 dias | 3+ acertos consecutivos |

**Funções exportadas:**

| Função | Descrição |
|--------|-----------|
| `registerLessonTagsInSrs({ lesson, flowErrors, flowScore })` | Registra tags/conceitos ao concluir uma aula |
| `getDueReviewItems({ pillar, level, limit })` | Retorna itens SRS vencidos (dueDate ≤ hoje) |
| `scheduleReviewItem({ type, content, label, level, pillar, dueDate })` | Agenda item manualmente no SRS |
| `recordReviewResult({ key, correct })` | Registra resultado de revisão avulsa |
| `getPostLessonReview({ lesson, flowErrors, limit })` | Revisão pós-aula baseada no conteúdo recém-estudado |
| `getDailyAdaptiveReview({ pillar, level, limit })` | Revisão diária combinando SRS de aula + prática |
| `getWeakConcepts({ pillar, limit })` | Conceitos fracos agrupados por pilar |
| `getReviewStats()` | Estatísticas consolidadas de todos os sistemas SRS |

---

## Arquivos alterados

| Arquivo | Mudança |
|---------|---------|
| `src/services/lessonSrsAdvanced.js` | **CRIADO** — serviço principal da FASE 5.4 |
| `src/services/progressStore.js` | Adicionado import + call `registerLessonTagsInSrs()` em `completeLesson()` |
| `docs/SRS_ADVANCED_INTEGRATION_REPORT.md` | **CRIADO** — este documento |
| `docs/AUTO_RESUME_NEXT_BLOCK.md` | Atualizado — FASE 5.4 marcada como concluída |

---

## Como o SRS decide prioridade

### 1. Ao concluir uma aula (`registerLessonTagsInSrs`)

- Cada tag em `lesson.tags[]` (exceto o índice 0, que é o nível) gera um item SRS.
- Se algum `flowError` (status = 'warn' ou 'missed') tem o mesmo pilar da tag → item nasce com status `WEAK` (revisão em 1 dia).
- Se não há erro associado → status `LEARNING` (revisão em 2 dias).
- Cada flowError gera também um item `ERROR_CONCEPT` sempre com status `WEAK`.
- Objetivos em `lesson.objectives[]` geram itens `LESSON_OBJECTIVE` com status baseado na presença de erros.

### 2. Ordenação de fila (`getDueReviewItems`, `getDailyAdaptiveReview`)

1. Status `WEAK` sempre primeiro (maior urgência pedagógica)
2. Em caso de empate: `dueDate` mais antiga primeiro (mais atrasado)
3. Empate final: `mastery` mais baixo primeiro (mais frágil)

### 3. Fórmula de mastery (mesma do sistema existente)

```
mastery = clamp((correctCount / attempts) * 55 + min(45, streak * 12) - lapses * 8, 0, 100)
```

- 55% pela taxa de acertos histórica
- Até 45% pelo streak atual de acertos consecutivos
- Penalidade de 8 pts por cada lapso (erro após estar MASTERED)

### 4. Prioridade de erros no pós-aula (`getPostLessonReview`)

- Filtra itens com `meta.lessonId === lesson.id` registrados nessa sessão
- Retorna apenas WEAK e LEARNING (não REVIEW/STRONG/MASTERED)
- Ordena WEAK antes de LEARNING, depois mastery ascendente

---

## Como testar

### Teste 1 — Registro de tags ao concluir aula

```js
import { registerLessonTagsInSrs, getDueReviewItems } from './lessonSrsAdvanced.js';

registerLessonTagsInSrs({
  lesson: {
    id: 'A1-GRAMMAR-001',
    title: 'Subject Pronouns',
    level: 'A1',
    tags: ['a1', 'grammar', 'subject-pronouns', 'i-you-he-she-it'],
    objectives: ['Use subject pronouns correctly in sentences'],
  },
  flowErrors: [],
  flowScore: 100,
});

const due = getDueReviewItems({ limit: 10 });
// Espera: 3 itens (grammar, subject-pronouns, i-you-he-she-it) com status LEARNING
```

### Teste 2 — Erros criam itens WEAK

```js
registerLessonTagsInSrs({
  lesson: { id: 'A1-GRAMMAR-003', level: 'A1', tags: ['a1', 'grammar', 'verb-to-be'], objectives: [] },
  flowErrors: [{ status: 'warn', pillar: 'grammar', phaseId: 'phase-01', title: 'Verb to be', prompt: 'She ___ my friend', expected: 'is', value: 'are' }],
  flowScore: 60,
});

const weak = getDueReviewItems({ limit: 5 });
// Espera: itens com status WEAK (revisão em 1 dia)
```

### Teste 3 — Revisão diária combinada

```js
import { getDailyAdaptiveReview } from './lessonSrsAdvanced.js';
const review = getDailyAdaptiveReview({ limit: 20 });
// Retorna: { items, hasReview, total, message }
// Combina lessonSrsAdvanced + practiceSrsExtended
```

### Teste 4 — Stats consolidadas

```js
import { getReviewStats } from './lessonSrsAdvanced.js';
const stats = getReviewStats();
// Retorna: { lessonSrs, practiceSrs, vocabularySrs, combined, generatedAt }
```

### Teste 5 — Robustez com localStorage vazio

```js
// Sem nenhum dado salvo:
getDueReviewItems()          // → []
getPostLessonReview({})      // → { items: [], hasReview: false, message: '...' }
getDailyAdaptiveReview()     // → { items: [], hasReview: false, total: 0, message: '...' }
getWeakConcepts()            // → { items: [], byPillar: {}, total: 0, hasConcepts: false }
getReviewStats()             // → objeto válido com tudo zero
```

---

## Limitações atuais

1. **Tags apenas do A1:** Somente o A1 tem `lesson.tags[]` preenchidas (139/139). Para A2→C2, os tags ainda não existem — `registerLessonTagsInSrs` registrará itens vazios para esses níveis (sem crash, mas sem dados pedagógicos úteis).

2. **Sem UI dedicada:** Esta fase é exclusivamente de camada de serviço. Nenhuma tela de revisão SRS foi criada. Os dados ficam disponíveis no localStorage e podem ser lidos por componentes futuros.

3. **Sem SM-2 completo:** O algoritmo usa intervalos fixos (1/2/4/8/16 dias) em vez do algoritmo SuperMemo-2 completo com fator de facilidade variável. Adequado para o volume atual.

4. **Sem integração visual pós-aula:** O `getPostLessonReview()` retorna dados estruturados, mas nenhum componente de UI os exibe ainda. A tela de conclusão de aula (`LessonCompletionCard`) não foi modificada.

5. **Decay não implementado:** Diferente do `PracticeMasteryTags.js`, o `lessonSrsAdvanced.js` não aplica decay diário automático nos itens não revisados. Os itens permanecem no último status até ser revisados.

---

## Próximos passos para FASE 5.5 — Gamification

1. **XP por revisão SRS:** ao chamar `recordReviewResult()` com sucesso, conceder XP extra (ex: +5 XP por item revisado).
2. **Badge "Revisor Consistente":** quando o aluno revisar itens SRS por 7 dias seguidos.
3. **Streak de revisão separado do streak de aulas:** `getReviewStats().combined.dueToday === 0` pode indicar dia de "revisão perfeita".
4. **ProgressScreen:** adicionar seção de estatísticas SRS usando `getReviewStats()`.
5. **TodayScreen:** mostrar badge/indicador quando `getDailyAdaptiveReview().hasReview === true`.
6. **UI de revisão pós-aula:** consumir `getPostLessonReview()` no `LessonCompletionCard`.
7. **Tags para A2→C2:** após adicionar tags nos outros níveis, o SRS automaticamente começa a rastrear conceitos desses níveis.
