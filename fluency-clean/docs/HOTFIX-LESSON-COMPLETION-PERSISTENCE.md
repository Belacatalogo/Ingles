# HOTFIX — Persistência de conclusão de aula

Data: 2026-05-17
Branch: main

---

## Bug reportado (iPhone)

A tela mostra "Aula concluída!" com 100% e o `LessonCompletionCard` aparece, mas ao sair e voltar o progresso não está registrado — o aluno precisa refazer a aula inteira.

---

## Causa raiz (auditoria)

### Problema 1 — Helpers que lançam exceção bloqueiam o `storage.set` principal

Em `progressStore.completeLesson()`:

```js
// ANTES: helpers chamados ANTES de storage.set — se lançarem, nada é salvo
const fragileVocabulary = registerReadingVocabularyMistakes({ lesson, answers }); // pode throw
const masteryProfile = recordLessonMastery({ ... });                              // pode throw
// ...se qualquer um lançar, as linhas abaixo nunca executam:
storage.set(LESSON_COMPLETIONS_KEY, nextCompletions);  // ← NUNCA CHEGA
storage.set(PROGRESS_KEY, nextProgress);                // ← NUNCA CHEGA
```

O `handleComplete` em `LessonFlowShell` capturava a exceção com `catch {}` mas o dado já estava perdido.

### Problema 2 — UI mostrava conclusão antes de confirmar o save

Em `useLessonFlowState.next()`:

```js
// ANTES: ordem errada
setCompleted(true);            // ← UI mostra card de conclusão imediatamente
clearDraft(lessonId);          // ← draft apagado
options.onComplete?.(...)      // ← só aqui chama completeLesson
```

Se `completeLesson` falhava silenciosamente (capturado pelo catch), a UI já havia exibido o card de conclusão — o aluno achava que tudo estava salvo.

### Problema 3 — `lessonId` divergia entre shell e progressStore

`stableLessonId` no shell incluía `generationMeta?.id` e level no fallback; `getCompletionId` no progressStore não. Uma aula sem `id` direto poderia gerar IDs diferentes nas duas partes do sistema, fazendo `isLessonCompleted` retornar `false` mesmo após salvar.

---

## Solução

### `src/services/progressStore.js`

1. **`getCompletionId` mais robusto** — inclui `lessonId`, `generationMeta?.id`, `curriculumId`, `raw?.curriculumId`:
```js
function getCompletionId(lesson) {
  return lesson?.id
    || lesson?.lessonId
    || lesson?.generationMeta?.id
    || lesson?.curriculumId
    || lesson?.raw?.curriculumId
    || `${lesson?.level || 'A1'}-${lesson?.type || lesson?.pillar || 'lesson'}-${lesson?.title || 'untitled'}`;
}
```

2. **Helpers isolados com try/catch** — falha nos helpers não bloqueia o save principal:
```js
let fragileVocabulary = [];
try { fragileVocabulary = registerReadingVocabularyMistakes(...); } catch (e) { console.warn(...); }

let masteryProfile = null;
try { masteryProfile = recordLessonMastery(...); } catch (e) { console.warn(...); }
```

3. **Save principal executado primeiro**, antes de qualquer operação secundária.

4. **Operações secundárias isoladas**:
```js
try { saveLessonDraft(...); } catch (e) { console.warn(...); }
if (!alreadyCompleted && ...) {
  try { markCurriculumLessonComplete(lesson); } catch (e) { console.warn(...); }
}
```

5. **Retorno enriquecido**: `{ completion, progress, alreadyCompleted, saved, verified }`
   - `saved`: resultado combinado de ambos os `storage.set()` (true/false)
   - `verified`: resultado de `isLessonCompleted(lesson)` após o save — confirma que a leitura bate com a escrita

### `src/lessons/flow/useLessonFlowState.js`

**Inversão de ordem** — `setCompleted` e `clearDraft` só executam após o shell confirmar o save:

```js
// DEPOIS: shell decide quando marcar como concluída
options.onComplete?.({
  phases: phaseList,
  attempts,
  onSaveSuccess: () => {
    setCompleted(true);
    clearDraft(lessonId);
  },
  onSaveError: (errorMsg) => {
    setMessage(errorMsg || 'Não foi possível registrar o progresso. Tente concluir novamente.');
  },
});
```

### `src/lessons/flow/LessonFlowShell.jsx`

1. **`stableLessonId` unificado** com `getCompletionId` de progressStore — mesmas prioridades e mesmo padrão de fallback.

2. **`handleComplete` verifica resultado do save**:
```js
const result = completeLesson({ ... });
if (!result.saved) {
  onSaveError?.('Não foi possível salvar o progresso...');
  return;  // NÃO chama onSaveSuccess → card de conclusão não aparece
}
// ...
onSaveSuccess?.();  // → setCompleted(true) + clearDraft
```

3. **Erro visível para o aluno** — se o save falha, `setMessage` exibe a mensagem de erro no footer da aula em vez de mostrar um card de conclusão falso.

---

## Arquivos alterados

- `src/services/progressStore.js` — `getCompletionId` robusto; helpers isolados; save antes das secundárias; retorna `saved` + `verified`
- `src/lessons/flow/useLessonFlowState.js` — `next()` usa callbacks `onSaveSuccess`/`onSaveError`
- `src/lessons/flow/LessonFlowShell.jsx` — `handleComplete` verifica `result.saved`; `stableLessonId` unificado

---

## Build executado

```bash
cd fluency-clean && npm run build
# ✅ 2533 módulos, sem erros.
```

---

## Garantias

- Se `storage.set` falha (localStorage cheio ou privado): aluno vê mensagem de erro, não card de conclusão
- Se helper (`recordLessonMastery`, `registerReadingVocabularyMistakes`) lança exceção: save principal acontece normalmente
- Se `markCurriculumLessonComplete` falha: save principal já foi confirmado
- `lessonId` é gerado com a mesma lógica em shell e progressStore — `isLessonCompleted` sempre encontra o dado salvo

---

## Confirmação

```
Branch: main
Sem branch nova.
Sem PR.
Sem merge.
Sem rebase.
Sem force push.
Conclusão da aula sempre persistida antes de exibir o card.
Revisão adaptativa preservada.
```
