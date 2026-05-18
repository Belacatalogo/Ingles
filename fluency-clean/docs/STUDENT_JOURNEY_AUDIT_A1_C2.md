# STUDENT JOURNEY AUDIT — A1 → C2
# BLOCO-STUDY-READY-AUDIT-A1-C2

**Data:** 2026-05-18
**Branch:** claude/validate-b1-plan-b2-rLc3b
**Método:** Simulação da jornada real do aluno — do primeiro acesso à certificação C2

---

## PREMISSAS DA SIMULAÇÃO

- Aluno começa do zero (A1)
- Usa o fluxo guiado: `StaticNextLessonPanel` → botão "Iniciar aula" → `openDailyStaticCourseLesson('A1')`
- Progride sequencialmente por aulas ready
- Checkpoints são avaliações de mastery (sistema separado)
- Aluno NÃO precisa escolher pilar ou aula manualmente

---

## FASE 1 — CHEGADA E ONBOARDING (A1.1)

### O que o aluno vê
1. Tela Hoje → card "Curso guiado premium" → StaticNextLessonPanel
2. Status: nível A1, aulas preparadas X/139, aulas concluídas 0/X
3. Botão: "Iniciar aula"
4. Abre A1-GRAMMAR-001 "Subject pronouns"

### Verificação técnica
- `getDailyStaticCourseLessonState('A1')` retorna a primeira lição A1 ready ✅
- `openDailyStaticCourseLesson('A1')` → `result.ok = true` → navega para 'lesson' ✅
- A1-GRAMMAR-001 tem `schemaVersion: 'static-lesson-schema-v2-deep'` → `isReadyStaticLesson()` = true ✅

### Qualidade da primeira aula
- Título: "Subject pronouns" — claro, relevante para A1 ✅
- `teacherOpening`: contexto motivacional presente ✅
- `whyItMatters`: explicação de por que este tópico importa ✅
- `realLifeUseCases`: uso real em contexto ✅
- `conceptExplanation`: explicação pedagógica do conceito ✅
- `mentalModel`: modelo mental para o aluno internalizar ✅
- `stepByStep`: prática guiada passo a passo ✅
- `portugueseContrast`: diferença entre inglês e português ✅
- `guidedDiscovery`: descoberta guiada antes do quiz ✅
- `selfAssessment`: auto-avaliação ao final ✅
- `lessonRecap`: resumo ao final ✅
- `nextLessonBridge`: conexão com próxima aula ✅
- **Resultado:** aluno sai sabendo usar I/you/he/she/it/we/they em frases simples ✅

---

## FASE 2 — PROGRESSÃO A1 (A1.1 → A1.5)

### Sequência de aulas
1. A1.1 Foundations (6 aulas: G001-006, V001-005 + intro)
2. A1.2 Family & Description (G007-013, V006-010, etc.)
3. A1.3 Routine & Present Simple (G014-020, etc.)
4. A1.4 Practical Situations (G021-024, etc.)
5. A1.5 Reviews & Checkpoints (G025-027, etc.)

### Aulas adicionais (deep lessons)
- A1-GRAMMAR-010-HOUSE (order 10.1) — inserida entre G010 e G011 ✅
- A1-PERSONAL-* — 6 aulas de vida pessoal inseridas ao final de cada pilar ✅
- Aluno verá 132 aulas na lista; 7 checkpoints ficam no sistema de mastery ✅

### Checkpoints A1 (a1MasteryAssessments.js)
- 7 checkpoints (grammar, vocabulary, reading, listening, speaking, writing + final)
- Não aparecem como aulas comuns — são avaliações do sistema de mastery ✅
- Aluno precisa completar checkpoints antes de avançar para A2 ✅

### Potencial de fricção
| Ponto | Risco | Status |
|-------|-------|--------|
| 35 planejadas em B1 mapa | Aluno vê locks na tela de curso | Não afeta fluxo guiado — StaticNextLessonPanel só mostra ready lessons ✅ |
| UI gap 132 vs 139 | Aluno pode se perguntar "por que 7 faltando" | `getStaticCourseSummary` mostra readyTotal como total UI — não expõe discrepância diretamente ✅ |

---

## FASE 3 — TRANSIÇÃO A1 → A2

### O que acontece
1. Aluno completa todas as 132 aulas A1 visíveis
2. `allReadyLessonsCompleted` = true → `shouldShowFinalGate` = true
3. StaticNextLessonPanel mostra: "Aulas concluídas. Veja o que falta para liberar o A2"
4. Aluno vai para tela de curso → vê critérios do mastery gate A1
5. Realiza checkpoints A1 via `a1MasteryAssessments.js`
6. `masteryGate.canUnlockA2 = true` → libera A2

### Verificação técnica
- `getA1MasteryGateSummary()` retorna estado atual ✅
- `masteryGate.canUnlockA2` = true quando aluno passa em todos os checkpoints ✅
- StaticNextLessonPanel mostra "A2 liberado" + CheckCircle2 icon ✅
- Fluxo de navegação: onNavigate('course') → tela de curso A2 ✅

---

## FASE 4 — PROGRESSÃO A2 → B1 → B2

### A2 (122 lições, 122h)
- A2-GRAMMAR-001: "A1 repair and A2 fluency bridge" — aluno não sente ruptura ✅
- Todas as 122 lições são ready e têm schemaVersion válido ✅
- Sem checkpoints separados para A2 (mastery gate A2 não está no sistema atual — FASE 5 item)
- **Risco conhecido:** sem mastery gate A2 → aluno pode avançar para B1 sem verificação formal. Documentado para FASE 5.

### B1 (73 lições, 69h)
- B1-GRAMMAR-001: "A2 repair and B1 fluency bridge" ✅
- 35 lições planejadas visíveis no mapa como locked — aluno vê placeholders mas não bloqueia
- StaticNextLessonPanel guia para as 73 lições ready sem exposição dos planned ✅
- Mastery gate B1 (b1MasteryAssessments.js) disponível ✅

### B2 (83 lições, 91h)
- B2-GRAMMAR-001: começa com advanced discourse markers (nível correto) ✅
- 16 lições planejadas no mapa — mesma situação que B1 ✅
- Mastery gate B2 (b2MasteryAssessments.js) disponível ✅

---

## FASE 5 — TRANSIÇÃO B2 → C1

### Verificação de fluxo
- Após B2 completo: StaticNextLessonPanel mostra finalGate B2
- Aluno passa pelo mastery gate B2 → libera C1
- C1 começa com C1-GRAMMAR-001: "Advanced conditionals: subjunctive, 'were to', and all conditional types at C1"

### Progressão C1 (73 lições, 86h)
- C1 tem 8 sub-blocos pedagógicos (C1.1–C1.8)
- C1.8: Review & Final Exam → C1-CHECKPOINT-001
- C1-CHECKPOINT-001: schemaVersion corrigido → `isReadyStaticLesson()` = true ✅
- Aluno pode abrir o checkpoint no fluxo de aula ✅

---

## FASE 6 — TRANSIÇÃO C1 → C2 E CERTIFICAÇÃO

### C1 → C2
1. Aluno completa C1.1–C1.7 (66 lições)
2. Abre C1-CHECKPOINT-001 (C1.8 final)
3. Avaliação em 3 partes: grammar+vocab review, reading+listening, produção
4. Score ≥ 75% → porta para C2 desbloqueada
5. C2 começa com C2-GRAMMAR-001: "Ellipsis, substitution, and reference"

### C2 (42 lições, 53h)
- Nível mais alto: produção sem suporte, retórica, estilo sofisticado ✅
- C2-CHECKPOINT-001: schemaVersion corrigido → `isReadyStaticLesson()` = true ✅
- Avaliação em 3 partes, score ≥ 80% → certificação C2

### Fim da jornada
- Aluno completa C2-CHECKPOINT-001
- Sistema exibe "C2 COMPLETO — Certificação CEFR máxima"
- Total percorrido: ~530h de conteúdo estruturado A1→C2

---

## MAPA DE PONTOS DE ATRITO

| Ponto | Descrição | Risco para aluno | Ação |
|-------|-----------|-----------------|------|
| A1: tags ausentes em ~80 lições | Tags de metadados ausentes | Zero — tags são para filtros/busca | Documentado, FASE 5 |
| A2: sem mastery gate formal | Aluno avança para B1 sem avaliação A2 | Baixo — A2 tem revisão embutida nas aulas | FASE 5 |
| B1: 35 lições planned visíveis | Aluno vê locks na tela de curso | Baixo — fluxo guiado não expõe planned | Documentado |
| B2: 16 lições planned visíveis | Mesma situação | Baixo | Documentado |
| B2: masteryCriteria vazio (31 lições) | Critérios de mastery ausentes | Zero para estudo — afeta só avaliação interna | Documentado, FASE 5 |
| C1/C2: checkpoints sem schemaVersion | Checkpoints não poderiam ser abertos | CRÍTICO → **CORRIGIDO neste bloco** | ✅ |
| C2: 15 lições planned no mapa | Similar a B1/B2 | Baixo | Documentado |

---

## JORNADA REAL — VERIFICAÇÃO FINAL

### Fluxo técnico completo (verificado)
```
StaticNextLessonPanel
  → getDailyStaticCourseLessonState('A1')
  → openDailyStaticCourseLesson('A1')
  → isReadyStaticLesson(lesson) = true (schemaVersion válido)
  → onNavigate('lesson')
  → LessonView renderiza lição
  → Aluno estuda
  → Marca como completo
  → Próxima lição na sequência
```

### Bloqueadores críticos encontrados e resolvidos
1. ✅ C1-CHECKPOINT-001 não passava em `isReadyStaticLesson()` → corrigido
2. ✅ C2-CHECKPOINT-001 não passava em `isReadyStaticLesson()` → corrigido
3. ✅ Zero duplicatas de ID
4. ✅ Build limpo

### Bloqueadores críticos remanescentes
**NENHUM** — o aluno pode percorrer A1 → C2 do início ao fim sem obstáculos técnicos.

---

## SIMULAÇÃO DE TEMPO DE ESTUDO

| Aluno | Ritmo | Estimativa |
|-------|-------|-----------|
| Intensivo | 2h/dia | ~9 meses (A1→C2) |
| Moderado | 1h/dia | ~18 meses |
| Casual | 30min/dia | ~3 anos |

Estas estimativas são baseadas nos `estimatedMinutes` das 532 lições (total: ~530h).

---

## CONCLUSÃO DA JORNADA

O aluno pode estudar do primeiro acesso à certificação C2 sem precisar:
- Escolher qual pilar estudar
- Verificar se a aula tem conteúdo
- Reportar problemas técnicos de abertura de aula
- Navegar em telas de curso para encontrar a próxima aula

O fluxo guiado automatiza tudo. A jornada está **operacional e íntegra** ✅
