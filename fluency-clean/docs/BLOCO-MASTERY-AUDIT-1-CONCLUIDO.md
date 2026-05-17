# BLOCO MASTERY-AUDIT-1 — Auditoria do Sistema de Progresso e Domínio

Data: 2026-05-17

## Arquivos auditados

| Arquivo | Papel |
|---|---|
| `src/services/progressStore.js` | Salva completions, XP, streak, prática, flashcards, speaking |
| `src/services/masteryStore.js` | Perfil de domínio por pilar (atualizado automaticamente em cada conclusão) |
| `src/services/curriculumPlan.js` | Estrutura do currículo A1–C2 (sistema legado de geração IA) |
| `src/services/lessonProgression.js` | Pré-requisitos e lock de aulas estáticas |
| `src/services/masteryGate.js` | Gate por lição e por nível — critérios de avanço |
| `src/services/a1MasteryGateService.js` | Gate A1 específico: checkpoints + prova final (scores manuais) |
| `src/services/staticCourseLauncher.js` | Abertura controlada de aulas estáticas (1 por dia, por pilar) |
| `src/services/curriculumEngine.js` | Resumo do curso, próxima aula, avaliação do gate por nível |
| `src/screens/CourseScreen.jsx` | UI do curso: níveis, lições, gate A1, painel de domínio |
| `src/services/curriculumPracticeAdapter.js` | Contexto curricular para prática e geração |

---

## Como o progresso funciona hoje

### 1. Conclusão de aula
- Chamada: `completeLesson({ lesson, answers, writtenAnswer, flowResults, preComputedScore, richFlowErrors })`
- Salva: `progress.lessonCompletions` (array com masteryScore, flowErrors, xp, level, pillar)
- Salva: `progress.summary` (xp total, completedLessons, streakDays, lastStudyDate, weekly)
- Trigger: `markCurriculumLessonComplete()` (adiciona ID em `curriculum.progress.v1`)
- Trigger: `recordLessonMastery()` (atualiza `mastery.skillProfile.v1`)

### 2. XP e streak
- XP: +25 por aula única concluída. Re-conclusão = 0 XP.
- Streak: +1 se dia seguido ao último estudo; reseta para 1 se houve intervalo.
- Semanal: `progress.summary.weekly[YYYY-Wxx]` com `{ completed, xp }`.

### 3. Mastery por pilar
- Storage key: `fluency.clean.mastery.skillProfile.v1`
- Atualizado automaticamente em `completeLesson()` via `recordLessonMastery()`
- Estrutura: `{ pillars: { grammar: { attempts, correct, score, weakCount, weakTopics }, ... }, recentErrors }`
- `score`: média ponderada histórica de todos os scores de aulas daquele pilar
- `weakTopics`: títulos de fases com erro acumulados (máx 12)

### 4. Próxima aula
- **Sistema estático atual (usado em produção):**
  - `getDailyStaticCourseLessonState(level)` → pilar do dia (Seg=Grammar, Ter=Vocabulary, Qua=Reading, Qui=Listening, Sex=Speaking, Sáb=Writing)
  - Busca próxima lição do pilar não concluída e sem pré-requisito bloqueado
  - Uma aula por dia (verificado em `getDailyStudyLockReason`)
- **Sistema legado (curriculumPlan.js):** Usado para geração de aulas IA. `getNextCurriculumLesson()` varre o currículo sequencialmente e respeita pré-requisitos e `LEVEL_REQUIREMENTS` (A1: 98% conclusão).

### 5. Liberação A1 → A2
- Controlada por `a1MasteryGateService.js` + `A1MasteryGatePanel` na CourseScreen
- Requer: **scores manuais de checkpoints** + **prova final** inseridos pelo usuário
- Resultado: `getA1MasteryGateSummary().canUnlockA2`
- `CourseScreen.isLevelBlocked(level)` → `level !== 'A1' && !a1Gate.canUnlockA2`
- Todos os outros níveis ficam bloqueados enquanto A2 não estiver liberado

### 6. Gate por nível (estático, automático)
- `masteryGate.js` — `evaluateStaticLevelGate(level)`:
  - Calcula completion% + averageMastery por pilar usando completions e practice sessions
  - Compara com `STATIC_LEVEL_MASTERY_REQUIREMENTS` (A1: grammar 75%, vocabulary 80%, etc.)
  - **Não** bloqueia nada sozinho — apenas retorna dados para UI
- Integrado via `curriculumEngine.getStaticCourseSummary()` → `summary.gate`
- CourseScreen usa `summary.gate.missing` para non-A1 levels

### 7. Bloqueio real vs progresso visual
- **Bloqueio real:** pré-requisito de lição (lição anterior não concluída) → `getLessonLockReason()`
- **Bloqueio real:** gate A1 manual (checkpoints + prova) → `a1MasteryGateService`
- **Visual apenas:** `evaluateStaticLevelGate()` mostra missing mas não bloqueia UI
- **Visual apenas:** mastery score de pilar não bloqueia aula individual

---

## Riscos encontrados

1. **`evaluateStaticLessonGate()` não é enforced:** Existe em `masteryGate.js` mas não é chamado durante `completeLesson()`. O aluno pode concluir sem fazer prática ou produção.

2. **Gate A1 é manual:** Exige que o aluno insira scores de checkpoint e prova final. Não calcula automaticamente a partir de lições concluídas. Isso é seguro mas limita o feedback automático.

3. **Mastery por pilar (`masteryStore.js`) não aparece na UI do curso:** Os scores são calculados mas não eram exibidos em CourseScreen. O aluno não sabia em quais pilares estava fraco.

4. **`getMasteryGateStatus()` e `getNextRecommendedAction()` não existiam:** Nenhuma função nomeada para status consolidado ou recomendação de próxima ação.

5. **`canAdvanceFromLevel()` existia mas nunca era chamado para bloquear:** A CourseScreen usa `a1MasteryGateService.canUnlockA2`, não `canAdvanceFromLevel()`.

6. **Dois sistemas paralelos:** `curriculumPlan.js` (para IA) vs sistema estático (`lessonProgression.js`, `masteryGate.js`, `a1MasteryGateService.js`). Não há colisão mas pode gerar confusão no futuro.

---

## O que foi mudado (→ MASTERY-GATE-1)

- Adicionados `getMasteryGateStatus()`, `canAdvanceToNextLevel()`, `getNextRecommendedAction()` em `masteryGate.js`
- Criado `MasteryRecommendationPanel.jsx` — painel automático de domínio por pilar
- Integrado em `CourseScreen.jsx` como recomendação não-bloqueante
- CSS adicionado em `course-screen.css`

## O que NÃO foi tocado

- Lógica de `completeLesson`, `progressStore`, `adaptiveReview`, `mastery`
- Conteúdo das aulas A1 (nenhuma aula criada, modificada ou removida)
- Gate manual A1 (`A1MasteryGatePanel`, `a1MasteryGateService.js`, checkpoints, prova final)
- Firebase, Azure, Gemini, Cloudinary
- Ordem do currículo
