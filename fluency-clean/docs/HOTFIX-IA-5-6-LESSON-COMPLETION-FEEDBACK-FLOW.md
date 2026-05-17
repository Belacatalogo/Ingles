# HOTFIX — Conclusão de aula e fluxo de feedback pós IA-5/IA-6

Data: 2026-05-17
Branch: main

---

## Bugs reportados (iPhone)

1. Após concluir a aula, a UI volta para o começo da aula.
2. A aula não parece ter sido registrada como feita.
3. Existe uma etapa "Preparação para feedback" (Writing) sem ação prática.

---

## Causa exata (auditoria)

### Bug 1 — "Volta para o começo"

Em `useLessonFlowState.js`:
```js
function goTo(index) {
  // ...
  setCompleted(false);  // ← PROBLEMA: qualquer clique no stepper resetava o card de conclusão
  // ...
}
```

Ao completar a aula, `completed = true` e o `LessonCompletionCard` aparecia. Mas o `LessonPhaseStepper` permanecia visível — clicar em qualquer fase chamava `goTo()`, que resetava `completed = false`. O card de conclusão sumia e o usuário via a fase clicada como "começo da aula".

### Bug 2 — "Não parece registrar"

Em `LessonFlowShell.jsx`:
```jsx
// Antes: ambos mostrados ao mesmo tempo
{children ? children(flow) : <LessonPhaseCard ... />}
{flow.completed ? <LessonCompletionCard ... /> : null}
```

`LessonCompletionCard` era renderizado **abaixo** do `LessonPhaseCard` (a última fase). Em iPhone com aulas longas, o card de conclusão ficava fora da viewport. O aluno não via que a aula foi registrada e pensava que não havia funcionado.

Além disso, a função `handleComplete` tinha `catch {}` silencioso — qualquer erro em `completeLesson()` era engolido sem log.

### Bug 3 — "Preparação para feedback" passiva

Em `WritingLessonFlow.jsx`:
```js
const feedback = mergeLists(lesson.feedbackPreparation);
pushList(phases, 'writing-feedback-prep', 'Preparação para feedback', 'Feedback', feedback, ...);
```

Se `lesson.feedbackPreparation` tivesse itens, essa fase seria adicionada como **última etapa** do flow. Por ser uma lista passiva (sem ação do aluno, `requiresAttempt: false`), o botão "Concluir aula" ficava nela — uma etapa vazia de "preparação" sem instrução ativa.

Secundário: `lessonId` em `LessonFlowShell` podia ser `''` quando `lesson.id` não existia, fazendo com que o `lessonFlowDraftStore` ignorasse todas as operações de salvar/carregar rascunho.

---

## Solução

### `src/lessons/flow/useLessonFlowState.js`

1. **Removido `setCompleted(false)` de `goTo()`**: navegar entre fases não reseta mais o estado de conclusão.

2. **Adicionada função `restart()`**: única forma de reverter `completed = true`:
```js
function restart() {
  setCompleted(false);
  setActiveIndex(0);
  setMessage('');
}
```

3. **`percent` agora retorna 100 quando `completed = true`**:
```js
const percent = completed ? 100 : getLessonFlowPercent(safeIndex, phaseList);
```

### `src/lessons/flow/LessonFlowShell.jsx`

1. **Exibição exclusiva**: quando `flow.completed`, mostra **apenas** o `LessonCompletionCard` (stepper e fase ocultos). O card aparece imediatamente na viewport, não abaixo de todo o conteúdo.

```jsx
{flow.completed ? (
  <LessonCompletionCard ... onRestart={flow.restart} ... />
) : (
  <>
    <LessonPhaseStepper ... />
    <LessonPhaseCard ... />
  </>
)}
```

2. **Scroll automático ao completar**: novo `useEffect` rola para o topo do shell quando `completed` vira `true`, garantindo que o card de conclusão fique visível em iPhone.

3. **Scroll por fase atualizado**: o scroll agora usa `shellRef.current?.scrollIntoView(...)` em vez de `.querySelector('.lesson-flow-phase-card')` — mais robusto.

4. **`onRestart` usa `flow.restart()`** em vez de `flow.goTo(0)` — sem risco de caminhos que não resetam `completed`.

5. **`lessonId` estável**:
```js
function stableLessonId(lesson) {
  return lesson?.id
    || lesson?.generationMeta?.id
    || (lesson?.title ? `${lesson.type || 'lesson'}-${lesson.title}-${lesson.level || 'A1'}` : '')
    || '';
}
```

6. **Log de erro**: `catch (err)` agora faz `console.warn('[Fluency] handleComplete falhou:', err)` antes do fallback.

### `src/lessons/flow/writing/WritingLessonFlow.jsx`

Removida a chamada `pushList` para `writing-feedback-prep`. A revisão adaptativa agora está no `LessonCompletionCard` (BLOCO IA-5). A etapa passiva de "Preparação para feedback" não tem mais razão de existir no flow.

Ordem final no Writing:
```
Modelo → Partes → Blocos → Gramática → Substituições → Erros → Rascunho → Checklist → Versão final → [Conclusão com revisão adaptativa]
```

---

## Arquivos alterados

- `src/lessons/flow/useLessonFlowState.js` — `goTo` sem `setCompleted(false)`; `restart()` adicionado; `percent = 100` quando completed
- `src/lessons/flow/LessonFlowShell.jsx` — exibição exclusiva; scroll on complete; `onRestart` → `flow.restart`; `stableLessonId`; logging
- `src/lessons/flow/writing/WritingLessonFlow.jsx` — `writing-feedback-prep` removido; import `noteOf` removido

---

## Build executado

```bash
cd fluency-clean && npm run build
# ✅ 2533 módulos, sem erros.
```

---

## Pendências

- Testar UX real em iPhone físico para confirmar scroll-to-top funciona em todos os pilares.
- Considerar salvar `completed = true` no draft após conclusão para recarregar o card se o usuário fechar e reabrir a mesma aula (atualmente, retorna ao início da aula, mas `isLessonCompleted()` no progressStore já registra a conclusão).

---

## Confirmação

```
Branch: main
Sem branch nova.
Sem PR.
Sem merge.
Sem rebase.
Sem force push.
Conclusão da aula não bloqueada.
Revisão adaptativa preservada.
```
