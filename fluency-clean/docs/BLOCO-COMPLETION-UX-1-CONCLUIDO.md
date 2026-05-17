# BLOCO COMPLETION-UX-1 — Tela de conclusão, progresso e prática extra (Concluído)

Data: 2026-05-17

---

## Objetivo

Melhorar a experiência pós-conclusão de aula:
- confirmação visual de que o progresso foi salvo;
- exibir XP ganho no card de conclusão;
- distinguir primeira conclusão de revisita;
- adicionar CTA "Ir ao Curso" quando não há erros;
- PracticeMount visualmente bloqueada até conclusão, liberada depois.

---

## O que foi auditado antes das mudanças

| Item | Estado encontrado |
|---|---|
| `completeLesson()` retorno | Já retornava `{ completion.xp, alreadyCompleted, saved, verified }` |
| `LessonFlowShell` | Não repassava `xp`/`alreadyCompleted` ao `LessonCompletionCard` |
| `LessonCompletionCard` | Não sabia se era primeira conclusão nem quantos XP foram ganhos |
| `PracticeMount` | Sempre visível, independente do estado da aula |
| `isLessonCompleted` | Já existia em `progressStore.js` e era confiável |

---

## Arquivos alterados

| Arquivo | O que mudou |
|---|---|
| `src/lessons/flow/LessonFlowShell.jsx` | `useState` adicionado; `completionMeta` capturado de `completeLesson()` e passado ao card |
| `src/lessons/flow/phases/LessonCompletionCard.jsx` | Nova prop `completionMeta`; confirmação de save; badge XP; CTA "Ir ao Curso" |
| `src/screens/LessonScreen.jsx` | Import `isLessonCompleted`; `lessonCompleted` computado e passado ao `PracticeMount`; estados locked/unlocked |
| `src/lessons/flow/lesson-flow.css` | Estilos `.lesson-completion-saved` e `.lesson-completion-xp`; ajustes 430px |
| `src/styles/lesson-polish.css` | Estilos `.lesson-practice-pending-note` e `.lesson-practice-unlocked` |

---

## Comportamento novo

### Card de conclusão

- **Primeira conclusão:** mostra "Progresso salvo" com ícone verde + badge "+25 XP" em violeta
- **Revisita:** mostra "Aula já concluída anteriormente" sem badge XP (XP = 0 na segunda vez)
- **CTA "Ir ao Curso":** aparece quando não há erros para revisar (boa performance)
- **"Revisar erros":** mantido quando há pontos fracos (`hasErrors`)
- **Flashcards:** mantido quando disponíveis

### PracticeMount

- **Antes de concluir:** banner discreto "Conclua a aula principal para acessar a prática extra." — `PracticeLauncher` não é renderizado
- **Após concluir:** card "Prática extra" liberado com `PracticeLauncher` completo; título em verde para indicar que está disponível
- A mudança é reativa: `fluency:lesson-updated` dispara refresh e `isLessonCompleted` retorna `true`

---

## O que NÃO foi alterado

- Lógica interna de `completeLesson` — apenas lida dados já retornados
- `PracticeLauncher.jsx` — intocado
- `progressStore.js` — apenas importado `isLessonCompleted` (já existia)
- Firebase, Azure, Gemini, Cloudinary
- `adaptiveReview`, `studentAnswerAnalysis`, mastery
- Lógica de fases, stepper ou conclusão
- Hotfix de persistência anterior (`onSaveSuccess`/`onSaveError`)

---

## Fluxo de dados

```
completeLesson() → result { completion.xp, alreadyCompleted }
     ↓
LessonFlowShell: setCompletionMeta({ xp, alreadyCompleted })
     ↓
LessonCompletionCard: completionMeta.xp → badge "+25 XP"
                      completionMeta.alreadyCompleted → "Já concluída"

fluency:lesson-updated → LessonScreen re-render
     ↓
isLessonCompleted(lesson) → true
     ↓
PracticeMount: mostra PracticeLauncher liberado
```

---

## Validação

```bash
cd fluency-clean && npm run build
# ✅ 2533 módulos, sem erros
```

Verificação mental:
- ✅ Primeira conclusão: badge "+25 XP" em violeta, texto "Progresso salvo" em verde
- ✅ Segunda conclusão: "Aula já concluída anteriormente", sem XP
- ✅ PracticeMount bloqueada antes de concluir; liberada depois
- ✅ CTA "Ir ao Curso" aparece quando score ≥ 80 ou sem erros
- ✅ `completionMeta` nula antes da conclusão → seção de save não renderiza
- ✅ `PracticeLauncher` não é renderizado antes da conclusão

---

## Pendências futuras

- **REVIEW-POLISH-1**: polish da revisão adaptativa no CompletionCard
- **FLASHCARDS-QUALITY-1**: qualidade de flashcards por pilar
- **MASTERY-GATE-1**: integração real do mastery gate A1→A2
