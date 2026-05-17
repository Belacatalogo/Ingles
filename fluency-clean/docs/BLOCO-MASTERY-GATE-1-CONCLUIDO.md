# BLOCO MASTERY-GATE-1 — Gate Controlado de Domínio

Data: 2026-05-17

## Objetivo

Implementar camada controlada de gate de domínio — recomendação automática baseada
em mastery por pilar, sem bloquear o usuário de testar o app. Preparar A1→A2 sem
mexer nas aulas A1 existentes.

---

## Arquivos criados/alterados

| Arquivo | Mudança |
|---|---|
| `src/services/masteryGate.js` | +3 funções novas |
| `src/components/course/MasteryRecommendationPanel.jsx` | Novo componente |
| `src/screens/CourseScreen.jsx` | Import + render do painel |
| `src/styles/course-screen.css` | +90 linhas CSS |
| `e2e/masteryGate.spec.js` | 4 testes e2e novos |

---

## Funções adicionadas em `masteryGate.js`

### `getMasteryGateStatus(level, options)`

Retorna `{ status, label, message, weakPillars, recommendation }`.

Estados possíveis:
| Status | Quando |
|---|---|
| `ready` | gate.passed = true (todos pilares atingem % mínimo) |
| `needs_review` | Pilares com completion ≥ 30% mas domínio abaixo do mínimo |
| `needs_more_lessons` | Algum pilar com completion < 30% |
| `needs_more_data` | Sem completions no nível, ou domínio = 0 em todos os pilares fracos |
| `blocked_no_progress` | (reservado para uso futuro) |

Fontes de dados:
- `evaluateStaticLevelGate()` — completion % + prática por pilar
- `getLessonCompletions()` — para verificar se há dados do nível

### `canAdvanceToNextLevel(level, options)`
Retorna `true` quando `getMasteryGateStatus().status === 'ready'`.

### `getNextRecommendedAction({ level, ...options })`
Retorna string de recomendação. Ex: `"Antes do próximo nível, revise: reading, writing."`.

---

## `MasteryRecommendationPanel.jsx`

Painel automático, sem input manual, não-bloqueante.

Fontes:
- `getMasteryProfile()` — pillar scores históricos (da `masteryStore.js`, atualizado em cada conclusão)
- `getMasteryGateStatus()` — status e recomendação

Comportamento:
- **Não renderiza** quando nenhum pilar tem `attempts > 0` (novo usuário sem dados)
- Mostra pilares em ordem crescente de score (mais fracos primeiro)
- Pilares com score < 70% ficam destacados em amarelo
- Badge: `Pronto para avançar` / `Revisão recomendada` / `Bom domínio`
- Não bloqueia nenhum botão; apenas informa

UI elementos:
- Header: ícone + "Domínio por pilar — A1" + badge de status
- Pillar rows: nome | barra de progresso | score%
- Advice: texto de recomendação com ícone

---

## Critérios do gate

Configurados em `STATIC_LEVEL_MASTERY_REQUIREMENTS` (A1):
| Pilar | Mínimo |
|---|---|
| grammar | 75% |
| vocabulary | 80% |
| reading | 75% |
| listening | 70% |
| speaking | 65% |
| writing | 70% |

Modo padrão: **recomendação, não bloqueio duro.**

Bloqueio duro existente (não alterado):
- Gate A1 manual (`a1MasteryGateService.js`) — exige checkpoints + prova final
- Pré-requisito de lição (`getLessonLockReason()`) — lição anterior não concluída

---

## Onde aparece na UI

`CourseScreen.jsx`, seção 4, entre o progresso do curso e o painel `A1MasteryGatePanel`.
Aparece para **qualquer nível** (A1, A2, B1, etc.) quando há dados de domínio.
Não aparece para novo usuário sem nenhuma conclusão.

---

## Como usa dados reais

| Fonte | Dado usado |
|---|---|
| `masteryStore.getMasteryProfile()` | score e attempts por pilar (atualizado em cada conclusão) |
| `progressStore.getLessonCompletions()` | para verificar completions do nível |
| `masteryGate.evaluateStaticLevelGate()` | % completion e averageMastery por pilar |
| `lessonProgression.getCompletedLessonIds()` | IDs de lições concluídas |

---

## Testes Playwright

`e2e/masteryGate.spec.js` — 4 testes × 2 viewports = 8 instâncias:

1. Curso renderiza sem crash com dados de domínio
2. Painel "Domínio por pilar" aparece quando há dados
3. Pilares fracos são destacados (badge "Revisão recomendada")
4. Navegação principal não é bloqueada pelo gate

**28/28 tests passing** (14 smoke + 6 flashcards + 8 masteryGate).

---

## Limitações / Pendências futuras

- Gate A1 manual (checkpoints + prova) continua sendo o critério oficial para A1→A2. O painel de domínio é complementar.
- `evaluateStaticLessonGate()` (por lição) ainda não é enforced em `completeLesson()`.
- `canAdvanceToNextLevel()` não é chamado para bloquear nada — disponível para uso futuro.
- Speaking sessions e flashcard sessions ainda não alimentam diretamente o `masteryStore.js`.

---

## Confirmação

```
Branch: main
Sem branch nova.
Sem PR.
Sem merge.
Sem rebase.
Sem force push.
Não gerou aulas novas.
Não alterou conteúdo A1.
Não ativou Firebase/Azure/Gemini.
Gate inicial é recomendação/controlado.
Build: ✅ 2533 módulos, sem erros.
Playwright: ✅ 28/28.
```
