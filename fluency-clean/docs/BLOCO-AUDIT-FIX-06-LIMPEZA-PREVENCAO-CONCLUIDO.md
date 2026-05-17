# BLOCO-AUDIT-FIX-06 — Limpeza técnica, prevenção de regressões e preparação para B1

**Data:** 2026-05-17  
**Branch:** main  
**Commit:** chore: BLOCO-AUDIT-FIX-06 - limpeza técnica e prevenção  
**Build:** ✅ `npx vite build` — 2533 módulos, sem erros  

---

## Escopo

Limpeza técnica segura, documentação de componentes legados/órfãos, prevenção de regressões, e preparação para retomar B1.

---

## 1. Auditoria de console.log / debug logs

**Status:** ✅ Nenhum log de debug encontrado

Todos os `console.warn` e `console.error` no código-fonte são logs operacionais legítimos:

| Arquivo | Tipo | Propósito |
|---|---|---|
| `LessonFlowShell.jsx` | `console.warn` | Falha de storage, verificação de save |
| `ErrorBoundary.jsx` | `console.error` | Captura de exceção no boundary |
| `resilientGeminiLessonDraft.js` | `console.warn` | Regeneração após review IA |
| `diagnostics.js` | `console.warn` | Falha de listener |
| `storage.js` | `console.warn` | Falha de localStorage |
| `progressStore.js` | `console.warn` | Falhas isoladas em helpers secundários |
| `lessonHistoryContext.js` | `console.warn` | Erro de leitura de histórico |
| `aiTeacherReviewer.js` | `console.warn` | Sem chave / resposta inválida / erro de chamada |
| `PracticeStateMachine.js` | `console.error/warn` | Listener error / transição inválida |
| `PracticeBuilder.js` | `console.warn` | Sessão com baixa pureza de core |

Nenhum `console.log` temporário ou de debug encontrado. **Nenhuma ação necessária.**

---

## 2. Auditoria de componentes órfãos

### LessonQualityPanel.jsx

**Status:** Componente órfão confirmado — exportado mas nunca importado

**Arquivo:** `src/components/lesson/LessonQualityPanel.jsx`

`LessonQualityPanel` é exportado mas não aparece em nenhum import de nenhum outro arquivo. Já `LessonGeneratorPanel.jsx` importa diretamente `validateLessonForQuality` de `lessonValidation.js` — sem passar por `LessonQualityPanel`.

**Decisão:** Não deletar (risco zero, zero runtime cost, pode ser útil futuramente como painel de auditoria de aulas). Documentado aqui como órfão para rastreabilidade.

---

## 3. Auditoria do gerador de aulas legado (AI Lesson Generator)

**Status:** ✅ Corretamente bloqueado via feature flag

O pipeline legado de geração de aulas por IA está completamente desativado na UI:

- `SHOW_LEGACY_AI_LESSON_GENERATOR = false` em `src/config/staticCurriculumFlags.js`
- `canShowLegacyAiLessonGenerator()` retorna `false`
- `TodayScreen.jsx` renderiza `null` para o bloco `<LessonGeneratorPanel>` quando a flag é false
- `LessonGeneratorPanel.jsx` só é instanciado dentro desse bloco gateado

**Serviços de AI legados (dormentes, não removidos):**
- `plannedGeminiLessonsWithDeepSeek.js`
- `resilientGeminiLessonDraft.js`
- `lessonValidation.js` (importado por `LessonGeneratorPanel`, que está gateado)
- `deepSeekGrammarRepair.js`, `deepSeekReadingRepair.js`

Esses serviços não executam em runtime quando a flag está desativada. **Nenhuma remoção necessária** — são safeguardados pelo feature flag.

---

## 4. Auditoria de imports não utilizados

Nenhum import órfão crítico encontrado nos arquivos principais da cadeia de aulas e progresso:

- `LessonFlowShell.jsx` — todos os imports usados
- `StaticCompletionGate.jsx` — todos os imports usados (inclui `refreshA1LessonCompletionPercent` adicionado no FIX-05)
- `progressStore.js` — todos os imports usados
- `a1MasteryGateService.js` — todos os imports usados

---

## 5. Auditoria do sistema de testes Playwright

**Status:** ✅ Organizado — sem arquivos temporários

6 spec files no diretório `e2e/`:

| Arquivo | Cobertura |
|---|---|
| `audit-completa.spec.js` | Auditoria completa integrada |
| `flashcards.spec.js` | Flashcards com aula injetada |
| `masteryGate.spec.js` | Gate de mastery com dados injetados |
| `settings-ai-keys-mobile.spec.js` | Settings AI keys em mobile |
| `smoke.spec.js` | Smoke tests básicos |
| `ui-premium-polish-mobile.spec.js` | Visual polish em mobile |

Arquivo temporário `fix03-investigate.spec.js` foi removido no FIX-03. Nenhum arquivo temporário presente agora.

**Playwright no ambiente remoto:** browser executável não disponível (infraestrutura pré-existente). Os 164 testes existentes não foram afetados por nenhuma mudança lógica neste ciclo de auditoria.

---

## 6. Validação de conteúdo — estado atual

### lessonValidation.js

- Validador robusto para aulas geradas por IA (score por critérios pedagógicos)
- Usado apenas por `LessonGeneratorPanel` (gateado)
- Não aplica a aulas fixas do currículo estático
- Nenhuma melhoria necessária para o fluxo estático atual

### Aulas estáticas A1/A2

- Qualidade das aulas verificada e corrigida nos AUDIT-FIX-03 e AUDIT-FIX-04
- Não há novos problemas de conteúdo identificados nesta auditoria

---

## 7. Proteção do progresso — verificação

Resumo do estado pós-FIX-01 a FIX-05:

| Componente | Estado |
|---|---|
| XP (25 por aula, sem duplicação) | ✅ Correto |
| Streak (hora local) | ✅ Correto |
| lessonCompletionPercent no Gate A1 | ✅ Corrigido no FIX-05 |
| masteryStore timezone (UTC→local) | ✅ Corrigido no FIX-05 |
| Pillar "vocabulary" na ProgressScreen | ✅ Corrigido no FIX-05 |
| Gate A1 bloqueia A2 sem critérios | ✅ Verificado no FIX-05 |
| Persistência de conclusão (save+verify) | ✅ Correto (hotfix anterior) |
| API keys em sessionStorage | ✅ Correto (FIX-02) |

---

## 8. Estado do B1

### Confirmação

- **Último commit com conteúdo B1:** nenhum. Não há `/src/content/curriculum/levels/B1/` com conteúdo real.
- **O que existe:** skeleton de lesson plans em `src/content/curriculum/advancedMaps.js` (B1_GRAMMAR_MAP, B1_VOCABULARY_MAP, B1_READING_MAP, B1_LISTENING_MAP, B1_SPEAKING_MAP, B1_WRITING_MAP, B1_PILLAR_MAPS, B1_EXIT_CRITERIA)
- **Conteúdo real:** inexistente. As maps são planos de aula (lista de títulos e pacotes), não arquivos de aula profunda.

### O que existe no B1_GRAMMAR_MAP (planos apenas, sem conteúdo)

24 aulas planejadas: A2 repair bridge → Past Simple → Present Perfect → Conditionals → Passive Voice → Reported Speech → Linkers → Reviews/Checkpoints.

### Próximo bloco B1 recomendado (quando autorizado)

**BLOCO-B1-GRAMMAR-001** — Criar a primeira aula profunda de Grammar B1:

- Arquivo: `src/content/curriculum/levels/B1/deepB1GrammarFoundations.js`
- Primeira aula: `B1-GRAMMAR-001` — "A2 repair and fluency bridge" (revisão de A2 como ponte para B1)
- Padrão: mesmo schema `static-lesson-schema-v2-deep` usado nas aulas A1/A2
- Conexão: registrar no `src/content/curriculum/index.js` ao lado de A1/A2

**Não iniciar B1 automaticamente.** Aguardar autorização explícita do usuário.

---

## 9. Atualização de documentação

### MASTER-CONTINUIDADE-BLOCOS-CURSO-ATE-C1-C2.md

**Atualizado:**
- Branch corrigida de `rewrite-fluency-clean-lab` → `main` (ao longo de todo o documento)
- Status atual atualizado para refletir série AUDIT-FIX-01…06 concluída
- Prompt fixo para próximos chats corrigido
- Faltam para A1 atualizados (removidos itens já concluídos nos blocos anteriores)
- Próximo bloco recomendado para B1 documentado

---

## Arquivos modificados

| Arquivo | Mudança |
|---|---|
| `fluency-clean/docs/MASTER-CONTINUIDADE-BLOCOS-CURSO-ATE-C1-C2.md` | Branch corrigida; status atualizado; prompt atualizado |
| `fluency-clean/docs/BLOCO-AUDIT-FIX-06-LIMPEZA-PREVENCAO-CONCLUIDO.md` | Este documento (novo) |

---

## Estado dos testes

- **Build Vite:** ✅ 2533 módulos, sem erros
- **Playwright:** Browser executável não disponível no ambiente remoto (pré-existente); nenhuma lógica de componente alterada

---

## Sistema pronto para B1?

**Sim, com as ressalvas abaixo:**

✅ Gate A1 funcional (progress tracking correto, bloqueio real)  
✅ XP, streak, mastery — sem bugs conhecidos  
✅ Persistência de conclusão confiável  
✅ Sistema de progresso auditado e limpo (FIX-01 a FIX-05)  
✅ Limpeza técnica concluída (este bloco)  
⚠️ PROB-016 (limiar 75% vs 80%) — decisão pendente do usuário antes de B1  
⚠️ A1 ainda incompleto (sem checkpoints renderizáveis, sem Final Exam UI, sem unidades A1.3+)  
⚠️ B1 não deve ser iniciado antes de autorização explícita  

**Próximo bloco correto:** aguardar instrução do usuário — retomar A1 (checkpoints/exam) ou iniciar B1.
