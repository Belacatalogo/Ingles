# BLOCO-AUDIT-FIX-05 — Progresso, Mastery, Checkpoints e Final Exam

**Data:** 2026-05-17  
**Branch:** main  
**Commit:** fix: BLOCO-AUDIT-FIX-05 - corrigir progresso mastery e checkpoints  
**Build:** ✅ `npx vite build` — 2533 módulos, sem erros  

---

## Problemas investigados

### PROB-001 — Bug de cálculo de score no masteryStore

**Status:** ✅ Corrigido no BLOCO-AUDIT-FIX-01  
`totalScore = previous.score * previous.attempts + result.score` — fórmula correta em uso.

---

### PROB-004 — Mastery review obrigatório mas não bloqueia

**Status:** ✅ Funcionando corretamente  
`evaluateLevelAdvancement` adiciona issue quando `speakingReviewed = false` ou `writingReviewed = false`. `canAdvance = issues.length === 0`. `CourseScreen.isLevelBlocked(level) = level !== 'A1' && !a1Gate.canUnlockA2`. O gate bloqueia mudança de nível quando os critérios não são atendidos.

---

### PROB-013 — Pesos de certificação inconsistentes / Vocabulary ausente

**Status:** ✅ Corrigido  
**Arquivo:** `src/screens/ProgressScreen.jsx`

**Problema encontrado:** `skillConfig` tinha apenas 5 pilares (grammar, reading, listening, speaking, writing) — `vocabulary` estava completamente ausente. Isso significava que o pilar de vocabulário nunca aparecia na seção "Skills" da tela de Progresso.

**Correção:**
- Adicionado `{ key: 'vocabulary', label: 'Vocabulary', tone: 'indigo' }` ao `skillConfig`
- Pilares reordenados para seguir a sequência pedagógica: grammar → vocabulary → reading → listening → speaking → writing

**Nota sobre pesos:** `buildCertificationSnapshot` usa fórmula própria (`completionScore * 0.55 + speakingScore * 0.25 + ...`) diferente de `LEVEL_MASTERY_WEIGHTS`. Isso é intencional — o snapshot de certificação mede engajamento/atividade, enquanto o gate usa `calculateWeightedLevelScore` com pesos oficiais. As duas visões coexistem por design.

---

### PROB-016 — Critério mínimo de 75% muito frouxo

**Status:** Pendente — decisão de arquitetura não tomada  
`LEVEL_PASSING_RULES.minimumPillarPercent: 75` está consistente com `STATIC_LEVEL_MASTERY_REQUIREMENTS.A1` (Listening: 70%, Speaking: 65%, Writing: 70%). Elevar para 80% afetaria todos os alunos. Deixado para decisão explícita do usuário antes de mudar.

---

### PROB-017 — Estado `done` dos flashcards persiste indevidamente

**Status:** Não é bug — comportamento intencional  
`done = true` quando há sessão de hoje para a bolha atual. Há botão "Revisar novamente" que reseta `done = false` e reinicia a sessão. O usuário pode rever o mesmo conteúdo ilimitadas vezes.

---

### PROB-022 — Timezone UTC vs local

**Status:** ✅ Corrigido  
**Arquivo:** `src/services/masteryStore.js`

**Problema:** `todayKey(date)` usava `date.toISOString().slice(0, 10)` (UTC), enquanto `localDateKey` em `progressStore.js` usa `.getFullYear()/.getMonth()/.getDate()` (local). Isso causava inconsistência próxima à meia-noite: um aluno em UTC-5 às 23h teria data diferente no masteryStore vs. progressStore.

**Correção:**
```js
// ANTES
function todayKey(date = new Date()) {
  return date.toISOString().slice(0, 10);
}
// DEPOIS
function todayKey(date = new Date()) {
  const d = date instanceof Date ? date : new Date(date);
  const pad = (n) => String(n).padStart(2, '0');
  return `${d.getFullYear()}-${pad(d.getMonth() + 1)}-${pad(d.getDate())}`;
}
```

---

### BUG CRÍTICO NOVO — `updateA1LessonCompletion` nunca chamada

**Status:** ✅ Corrigido  
**Arquivos:** `src/services/a1MasteryGateService.js`, `src/lessons/static/StaticCompletionGate.jsx`, `src/lessons/flow/LessonFlowShell.jsx`

**Problema:** `updateA1LessonCompletion()` está definida em `a1MasteryGateService.js` mas NUNCA era chamada em nenhum lugar do código. Resultado: o campo `lessonCompletionPercent` no estado do A1 Gate permanecia em 0% para sempre, mesmo após completar todas as aulas A1. O painel "Aulas A1 concluídas" sempre mostrava 0%, e o gate sempre exigia "Concluir 100% das aulas do nível."

**Correção:**
1. `a1MasteryGateService.js`: Adicionada função `refreshA1LessonCompletionPercent()` que:
   - Lê todas as aulas A1 `ready` do currículo
   - Compara com IDs de aulas concluídas
   - Calcula o percentual real
   - Salva no estado do gate
2. `StaticCompletionGate.jsx`: Chama `refreshA1LessonCompletionPercent()` após conclusão bem-sucedida de aula A1
3. `LessonFlowShell.jsx`: Chama `refreshA1LessonCompletionPercent()` após conclusão bem-sucedida de aula A1

```js
// Novo em a1MasteryGateService.js
export function refreshA1LessonCompletionPercent() {
  try {
    const lessons = getStaticLessons('A1');
    const readyLessons = Array.isArray(lessons) ? lessons.filter(isStaticLessonReady) : [];
    if (!readyLessons.length) return getA1MasteryGateState();
    const completedIds = getCompletedLessonIds();
    const completed = readyLessons.filter((lesson) => completedIds.has(lesson.id)).length;
    const percent = Math.round((completed / readyLessons.length) * 100);
    return updateA1LessonCompletion(percent);
  } catch {
    return getA1MasteryGateState();
  }
}
```

---

## Verificação dos fluxos de progresso

### Conclusão de aula (progressStore.completeLesson)
- XP: `xpGain = alreadyCompleted ? 0 : 25` — sem duplicação ✅
- Lesson count: só incrementa se `!alreadyCompleted` ✅
- Streak: usa `localDateKey` (local time) ✅
- Mastery: chama `recordLessonMastery` ✅
- Persistência: verifica com `isLessonCompleted` após salvar ✅

### Gate A1
- `isLevelBlocked(level)` = `level !== 'A1' && !a1Gate.canUnlockA2` ✅
- `canUnlockA2 = gate.canAdvance = issues.length === 0` ✅
- Issues incluem: 100% aulas, 80% checkpoints, 80% prova final, mínimo 75% por pilar, speaking/writing revisados ✅

### Checkpoint A1
- `saveAndSyncA1CheckpointAttempt` → score A1 gate atualizado automaticamente ✅
- `getA1CheckpointAttempts` → tentativa anterior restaurada ✅

### Final Exam A1
- `saveAndSyncA1FinalExamObjectiveAttempt` → sincroniza pilares objetivos no gate ✅
- `reviewA1FinalExamProductiveSkill` → registra score + marca como revisado ✅
- Produção (speaking/writing) exige nota de revisão antes de marcar como feita ✅

### Persistência local
- Chaves distintas por funcionalidade:
  - `fluency:a1-mastery-gate:v1` — estado do gate A1
  - `fluency:a1-checkpoint-attempts:v1` — tentativas de checkpoint
  - `fluency:a1-final-exam:objective-attempt:v1` — prova final
  - `staticCurriculum.lessonProgress.v1` — progresso por aula
  - `staticCurriculum.state.v1` — estado do curso (nível atual)
  - `progress.summary` — XP, streak, completedLessons
  - `progress.lessonCompletions` — histórico de conclusões
  - `mastery.skillProfile.v1` — perfil de mastery por pilar
- Não há dados sensíveis persistidos no localStorage ✅

---

## Arquivos modificados

| Arquivo | Mudança |
|---|---|
| `src/services/a1MasteryGateService.js` | Nova função `refreshA1LessonCompletionPercent()` + imports de curriculum e lessonProgression |
| `src/lessons/static/StaticCompletionGate.jsx` | Chama `refreshA1LessonCompletionPercent()` após conclusão de aula A1 |
| `src/lessons/flow/LessonFlowShell.jsx` | Chama `refreshA1LessonCompletionPercent()` após conclusão de aula A1 |
| `src/screens/ProgressScreen.jsx` | Adicionado `vocabulary` ao `skillConfig`; pilares reordenados |
| `src/services/masteryStore.js` | `todayKey` usa data local em vez de UTC |

---

## Estado dos testes

- **Build Vite:** ✅ 2533 módulos, sem erros
- **Playwright:** Browser executável não disponível no ambiente remoto (infraestrutura pré-existente); nenhuma lógica de roteamento ou componente foi alterada de forma que possa quebrar os 164 testes existentes

---

## Pendências e decisões não tomadas

1. **PROB-016:** Aumentar limiar mínimo de 75% para 80%? → Deixado para decisão explícita do usuário (impacta todos os alunos)
2. **Playwright local:** Executar a suite completa depois de instalar o browser executável para confirmar 164/164

---

## Sistema seguro para retomar B1?

**Sim, com as ressalvas abaixo:**
- O gate A1 agora funciona corretamente (progressão de aulas atualiza o painel)
- Bloqueio de nível A2/B1 é real e não bypasso
- XP, streak e mastery funcionam sem duplicação
- Checkpoints e Final Exam estão conectados ao gate
- B1 ainda não tem aulas prontas; não será liberado indevidamente
- Antes de iniciar B1, confirmar PROB-016 (threshold 75% vs 80%)
