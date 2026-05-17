# BLOCO FLOW-STABILITY-1 — Stepper bloqueado + persistência mid-lesson (Concluído)

Data: 2026-05-17

---

## Objetivo

Melhorar a estabilidade do fluxo de fases da aula:
- impedir pular etapas obrigatórias futuras via stepper;
- permitir voltar para etapas já visitadas livremente;
- manter progresso da aula em caso de troca de aba ou reload;
- não quebrar conclusão nem hotfix de persistência anterior.

---

## Auditoria do estado antes deste bloco

| Componente | Estado encontrado |
|---|---|
| Draft (localStorage) | ✅ Já funcionava: 24h TTL, keyed por lessonId, salva activeIndex + attempts |
| `completed` não reseta | ✅ Já corrigido no hotfix IA-5-6 |
| `onSaveSuccess`/`onSaveError` | ✅ Já existia no hotfix LESSON-COMPLETION-PERSISTENCE |
| `lessonId` estável | ✅ 5 fallbacks em `stableLessonId` |
| **Bug real encontrado** | `goTo` só verificava fase *atual* (`!canAdvance`) — permitia saltar sobre fases obrigatórias intermediárias se a fase corrente estava completa |
| **Stepper visual** | Usava único boolean `canGoForward` — bloqueava/desbloqueava TODAS as fases futuras juntas |

---

## Regra central de navegação implementada

Nova função `canAccessPhaseIndex` em `lessonFlowProgress.js`:

```
Pode ir para targetIndex se:
  - aula concluída: sim (modo revisão)
  - target <= activeIndex: sim (voltar é sempre permitido)
  - target > activeIndex: somente se todos os índices de
    activeIndex até target-1 satisfazem canAdvanceFromPhase()
    (nenhuma fase obrigatória intermediária em aberto)
```

Exemplos práticos:
- Fase 1 concluída, fase 2 obrigatória pendente → pode ir para 1, não pode pular para 3
- Fases 1, 2, 3 concluídas → pode ir diretamente para 4 (próxima)
- Fase 5 livre (sem `requiresAttempt`) → não bloqueia passagem
- Aula concluída → pode navegar livremente por todas as fases

---

## Arquivos alterados

| Arquivo | O que mudou |
|---|---|
| `src/lessons/flow/lessonFlowProgress.js` | Adicionada função `canAccessPhaseIndex` |
| `src/lessons/flow/useLessonFlowState.js` | `goTo` usa `canAccessPhaseIndex`; novo `canGoToIndex` exposto no return |
| `src/lessons/flow/LessonPhaseStepper.jsx` | Usa `canGoToIndex` por fase; ícone `Lock` para bloqueadas; `aria-disabled` correto |
| `src/lessons/flow/LessonFlowShell.jsx` | Passa `canGoToIndex` ao stepper em vez de `canGoForward` |

---

## Como a persistência mid-lesson funciona

O `lessonFlowDraftStore.js` já estava correto. Resumo do fluxo:

1. Aluno abre a aula → `loadDraft(lessonId)` restaura `activeIndex` e `attempts` do localStorage
2. Aluno avança ou responde → `saveDraft(lessonId, { activeIndex, attempts })` salva
3. Aluno troca de aba → ao voltar, o estado está preservado no localStorage
4. Aluno conclui a aula → draft limpo **somente** após `onSaveSuccess` (save confirmado no progressStore)
5. Aula diferente → lessonId diferente → draft diferente → sem mistura

A chave no localStorage é `fluency:lesson-flow-draft:{lessonId}` com TTL de 24h.

---

## UX de bloqueio

Quando o aluno tenta avançar para uma fase bloqueada:
- Stepper: botão aparece com ícone de cadeado (`Lock`), opacidade reduzida, `cursor: not-allowed`, `aria-disabled`
- Clicar em botão bloqueado ainda chama `goTo` que exibe mensagem no footer
- Mensagem padrão: "Conclua as etapas anteriores antes de avançar."
- Mensagem customizável por fase via `phase.blockedMessage`

---

## O que NÃO foi alterado

- `lessonFlowDraftStore.js` — já estava correto
- `progressStore.js` / `completeLesson` — não tocados
- `LessonCompletionCard.jsx` — não tocado
- `LessonActionFooter.jsx` — não tocado
- `LessonPhaseCard.jsx` — não tocado
- Lógica de IA, Azure, Gemini, Firebase
- `adaptiveReview`, `studentAnswerAnalysis`, mastery
- Conteúdo pedagógico, ordem das fases
- Visual (CSS) polido no UX-POLISH-1

---

## Verificação por código

- ✅ `canAccessPhaseIndex(target=5, active=2, phases, attempts)` com fase 3 obrigatória em aberto → retorna `false`
- ✅ `canAccessPhaseIndex(target=1, active=3, ...)` → retorna `true` (voltar)
- ✅ `canAccessPhaseIndex(target=3, active=2, ...)` com todas completadas → retorna `true`
- ✅ `goTo(index)` usa `canAccessPhaseIndex` → impossível saltar por código também
- ✅ Stepper com `canGoToIndex(i)` por botão → feedback visual correto por fase
- ✅ `restart()` ainda reseta completed para navegação de revisão
- ✅ Draft salvo a cada `goTo` e `markAttempt`

## Validação

```bash
cd fluency-clean && npm run build
# ✅ 2533 módulos, sem erros
```

---

## Pendências futuras

- **COMPLETION-UX-1**: desbloqueio/bloqueio visual do PracticeMount pós-conclusão
- **REVIEW-POLISH-1**: polish da revisão adaptativa no CompletionCard
- **FLASHCARDS-QUALITY-1**: qualidade de flashcards por pilar
- **MASTERY-GATE-1**: integração real do mastery gate A1→A2
