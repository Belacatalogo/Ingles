# PLANO DE CORREÇÃO — Auditoria Playwright Sistema Fluency

**Data:** 2026-05-17  
**Branch de origem:** main  
**Documento base:** `AUDITORIA-COMPLETA-PLAYWRIGHT-SISTEMA.md`

---

## VISÃO GERAL

Este plano organiza as correções em 6 blocos, em ordem de prioridade. Cada bloco pode ser executado independentemente, mas devem ser feitos nesta sequência para evitar regressões.

**Estado atual:** Auditoria concluída. NADA foi corrigido ainda.  
**Próximo passo:** BLOCO-AUDIT-FIX-01 (P0/P1 críticos).

---

## BLOCO-AUDIT-FIX-01 — Corrigir Problemas P0 e P1 Críticos

**Objetivo:** Restaurar integridade do sistema de progresso, mastery e interação básica. Estes problemas comprometem a validade de todos os dados do aluno.

**Problemas que resolve:**
- PROB-001 (P0): Bug de cálculo de score no masteryStore — score cresce artificialmente
- PROB-002 (P0): Overlay de diagnóstico não fecha — usuário fica preso
- PROB-003 (P1): Settings toggles não persistem no localStorage
- PROB-006 (P1): Azure Speech SDK race condition no cache de token
- PROB-007 (P1): SpeakingScreen MIN_RECOGNIZED_WORDS = 2 rejeita respostas A1 válidas

**Arquivos prováveis:**
```
src/services/masteryStore.js          # PROB-001: linha 156-157
src/styles/lab-polish.css             # PROB-002: z-index do backdrop
src/screens/SettingsScreen.jsx        # PROB-003: persistência toggles
src/services/azurePronunciation.js    # PROB-006: promise deduplication
src/screens/SpeakingScreen.jsx        # PROB-007: MIN_RECOGNIZED_WORDS
```

**Correção PROB-001 detalhada:**
```javascript
// ANTES (bugado):
const totalAttempts = previous.attempts * 100 + result.score;
const score = Math.round(totalAttempts / attempts);

// DEPOIS (correto):
const totalScore = previous.score * previous.attempts + result.score;
const score = Math.round(totalScore / attempts);
```

**Correção PROB-002 detalhada:**
```css
/* Adicionar ao .diagnostic-backdrop: */
.diagnostic-backdrop {
  z-index: -1;  /* garante que fica atrás do sheet */
}
/* OU no .diagnostic-sheet: */
.diagnostic-sheet {
  pointer-events: auto;
}
.diagnostic-overlay {
  pointer-events: none;
}
```
E no JSX, usar `force: true` ou dispatch de click diretamente no backdrop.

**Correção PROB-003 detalhada:**
```javascript
// Em SettingsScreen.jsx — usar storage existente:
const [dailyReminder, setDailyReminder] = useState(
  () => storage.getBool('fluency.clean.settings.dailyReminder') ?? false
);
function toggleDailyReminder(val) {
  setDailyReminder(val);
  storage.setBool('fluency.clean.settings.dailyReminder', val);
}
```

**Risco:** Médio para PROB-001 (altera scores salvos) — discutir se aplica retroativamente.

**Validação necessária:**
- Verificar que score calculado após correção é correto para todos os cenários da simulação
- Verificar que overlay fecha em todos os viewports
- Verificar que toggles persistem após reload
- Rodar suite completa de 54 testes existentes (não devem regredir)

**Precisa autorização antes:** Sim para PROB-001 (decisão sobre dados históricos)

---

## BLOCO-AUDIT-FIX-02 — Corrigir Avaliação de Respostas

**Objetivo:** Garantir que exercícios avaliam respostas de forma justa e precisa.

**Problemas que resolve:**
- PROB-008 (P1): Regex de fallback de flashcards ignora aspas duplas
- PROB-030 (P2): Alternativas de múltipla escolha não testam confusões reais de brasileiros
- PROB-007 (P1 — continuação): Avaliação de Speaking por nível

**Arquivos prováveis:**
```
src/screens/FlashcardsScreen.jsx               # PROB-008: regex linha 25-29
src/content/curriculum/levels/A1/             # PROB-030: exercícios de múltipla escolha
src/content/curriculum/levels/A2/             # PROB-030: exercícios de múltipla escolha
src/services/masteryStore.js                   # Função de avaliação de texto
src/services/progressStore.js                  # normalizeAnswerValue (don't → don t bug)
```

**Correção PROB-008 detalhada:**
```javascript
// Incluir aspas duplas e tipográficas:
/'([^']{2,32})'|`([^`]{2,32})`|"([^"]{2,32})"|"([^"]{2,32})"/g
```

**Diretrizes para PROB-030:**
- Identificar confusões reais de brasileiros por tópico
- Ex: Grammar A1 — "he/she vs it", "is vs am vs are"
- Ex: Vocabulary A1 — "good night vs good evening vs goodnight"
- Alternativas devem ser plausíveis para quem está aprendendo, não absurdas

**Risco:** Médio para conteúdo (precisa revisão pedagógica das alternativas)

**Validação necessária:**
- Teste manual de cada tipo de exercício
- Verificar que resposta correta não aparece obviamente destacada
- Verificar que respostas erradas são opções plausíveis

**Precisa autorização antes:** Sim para mudanças no conteúdo das aulas

---

## BLOCO-AUDIT-FIX-03 — Corrigir Renderização, UX e Mobile

**Objetivo:** Melhorar experiência de uso em todos os viewports e fluxos de navegação.

**Problemas que resolve:**
- PROB-009 (P2): Settings — grupo padrão errado (mostra lessonKeys antes de account)
- PROB-010 (P2): Speaking — ternário morto `mode === 'immersion' ? 4 : 4`
- PROB-011 (P2): Curso — mensagem de status nunca limpa
- PROB-012 (P2): Curso — slice hardcoded de 30 lições
- PROB-014 (P2): Speaking — pronunciationByLevel incompleto
- PROB-015 (P2): Hoje — nível hardcoded "A1 → A2"
- PROB-018 (P2): Progresso — heatmap sem responsividade mobile
- PROB-019 (P3): Avatar hardcoded "F"
- PROB-020 (P3): Status "gerenciado pelo login" hardcoded
- PROB-021 (P3): Speaking scene undefined
- PROB-023 (P3): Botão diagnóstico 34px
- PROB-024 (P3): Título fallback "Aula"

**Arquivos prováveis:**
```
src/screens/SettingsScreen.jsx       # PROB-009, PROB-019, PROB-020
src/screens/SpeakingScreen.jsx       # PROB-010, PROB-014, PROB-021
src/screens/CourseScreen.jsx         # PROB-011, PROB-012
src/screens/TodayScreen.jsx          # PROB-015
src/screens/ProgressScreen.jsx       # PROB-018
src/screens/LessonScreen.jsx         # PROB-024
src/styles/lab-polish.css            # PROB-023
```

**Risco:** Baixo na maioria — são ajustes UI sem lógica complexa

**Validação necessária:**
- Testes visuais em iPhone 13 e iPhone SE
- Verificar que ajuste de grupo default em Ajustes não afeta sub-grupos
- Verificar que remoção do slice não quebra performance (lazy loading pode ser necessário)

**Precisa autorização antes:** Não

---

## BLOCO-AUDIT-FIX-04 — Corrigir Conteúdo Genérico e Exercícios Ruins

**Objetivo:** Elevar qualidade pedagógica das aulas existentes.

**Problemas que resolve:**
- PROB-025 (P2): A1 Reading L1 — dois parágrafos sem conexão
- PROB-026 (P2): Listening não é verdadeira compreensão auditiva
- PROB-027 (P2): Speaking sem scaffolding antes de free speaking
- PROB-028 (P2): Writing — modelo curto, checklist superficial
- PROB-029 (P2): A2 Reading — textos genéricos
- PROB-031 (P2): A2 Writing — modelo formal para tarefa informal
- PROB-032 (P2): A2 Listening — diálogos artificiais

**Arquivos prováveis:**
```
src/content/curriculum/levels/A1/deepReadingFoundations.js
src/content/curriculum/levels/A1/deepListeningFoundations.js
src/content/curriculum/levels/A1/deepSpeakingFoundations.js
src/content/curriculum/levels/A1/deepWritingFoundations.js
src/content/curriculum/levels/A2/deepA2Bridge.js
src/content/curriculum/levels/A2/deepA2PastStories.js
```

**Diretrizes gerais:**
1. **Reading:** Textos devem ter personagens, contexto real, narrativa coesa
2. **Listening:** Adicionar instruções claras de pré-listening; indicar que áudio é TTS e limitações
3. **Speaking:** Sempre fornecer modelo completo de resposta antes de free speaking
4. **Writing:** Processo explícito: modelo → rascunho → checklist com coesão → versão final
5. **Exercícios:** Alternativas devem testar confusões reais, não respostas óbvias

**Risco:** Alto — alteração de conteúdo de aulas que alunos podem já ter feito

**Validação necessária:**
- Revisão pedagógica humana de cada correção
- Teste de pelo menos 3 aulas por pilar após mudança
- Verificar que conteúdo alterado não quebra exercícios que dependem do texto

**Precisa autorização antes:** Sim — mudanças em conteúdo requerem aprovação

---

## BLOCO-AUDIT-FIX-05 — Corrigir Progresso, Mastery e Checkpoints

**Objetivo:** Garantir que o sistema de avanço de nível reflete aprendizado real.

**Problemas que resolve:**
- PROB-004 (P1): Mastery review obrigatório mas não bloqueia
- PROB-013 (P2): Pesos de certificação inconsistentes com framework oficial
- PROB-016 (P2): Critério mínimo de 75% muito frouxo
- PROB-017 (P2): Estado `done` dos flashcards persiste indevidamente
- PROB-022 (P3): Timezone local vs UTC

**Arquivos prováveis:**
```
src/content/curriculum/levelMasteryFramework.js   # PROB-004, PROB-016
src/screens/ProgressScreen.jsx                     # PROB-013
src/screens/FlashcardsScreen.jsx                   # PROB-017
src/services/progressStore.js                      # PROB-022
src/services/masteryStore.js                       # PROB-022
```

**Decisões necessárias antes:**
- PROB-004: Confirmar que bloquear avanço sem review é o comportamento desejado (impacta fluxo)
- PROB-016: Confirmar novo limiar (80% recomendado vs 75% atual)
- PROB-013: Alinhar pesos de ProgressScreen com levelMasteryFramework (qual é a fonte de verdade?)

**Risco:** Alto — mudanças nos critérios de gate afetam todos os alunos

**Validação necessária:**
- Simular múltiplos cenários de avanço de nível com novos critérios
- Verificar que alunos atuais com progresso não são bloqueados retroativamente
- Testar toda a suite e2e após mudanças

**Precisa autorização antes:** Sim — todas as mudanças neste bloco precisam de decisão

---

## BLOCO-AUDIT-FIX-06 — Limpeza Técnica e Prevenção

**Objetivo:** Melhorar manutenibilidade, prevenir bugs futuros e endereçar itens de segurança.

**Problemas que resolve:**
- PROB-005 (P1): API keys em localStorage → discutir sessionStorage ou proxy
- PROB-033 (P2): Firebase credentials em localStorage
- PROB-034 (P2): Azure SDK sem SRI
- Dead code e inconsistências menores

**Ações planejadas:**
1. Mover API keys para sessionStorage (limpa ao fechar browser)
2. Centralizar função `safeAverage(a, b, fallback=0)` para prevenir NaN em cálculos
3. Adicionar testes e2e para os fluxos corrigidos nos blocos anteriores
4. Remover referências a serviços legados que ainda aparecem no fluxo principal
5. Documentar localStorageDkeys usadas (inventário gerado na auditoria):
   ```
   fluency.clean.access.session
   fluency.clean.diagnostics.logs
   fluency.clean.lesson.current
   fluency.clean.mastery.skillProfile.v1
   fluency.clean.word.of.the.day
   fluency.practiceMasteryTags.lastDecayDate.v1
   fluency.practiceMasteryTags.v1
   ```

**Arquivos prováveis:**
```
src/services/aiKeys.js
src/services/externalLessonProviders.js
src/services/azurePronunciation.js
src/services/firebase.js
src/components/auth/AccessGate.jsx
e2e/*.spec.js  (novos testes para bugs corrigidos)
```

**Risco:** Médio para mudanças de sessionStorage (usuários precisarão reinserir chaves)

**Validação necessária:**
- Verificar que mudança de localStorage para sessionStorage não quebra fluxo de aula
- Testar que keys expiram corretamente ao fechar/abrir o browser
- Suite completa de e2e

**Precisa autorização antes:** Sim — decisão sobre onde guardar API keys dos usuários

---

## SEQUÊNCIA RECOMENDADA

```
BLOCO-AUDIT-FIX-01 → obrigatório antes de B1, resolve P0/P1 críticos
     ↓ (aguardar decisão sobre dados históricos do masteryStore)
BLOCO-AUDIT-FIX-02 → avaliação de respostas
     ↓
BLOCO-AUDIT-FIX-03 → UX e mobile (pode ser feito em paralelo com FIX-02)
     ↓
BLOCO-AUDIT-FIX-04 → conteúdo pedagógico (aguardar autorização)
     ↓
BLOCO-AUDIT-FIX-05 → progresso/mastery (aguardar decisões)
     ↓
BLOCO-AUDIT-FIX-06 → limpeza técnica (pode ser feito quando conveniente)
```

---

## DECISÕES NECESSÁRIAS DO USUÁRIO

Antes de executar os blocos, o usuário precisa responder:

1. **PROB-001 (P0 — URGENTE):** O bug de score do masteryStore deve ser corrigido retroativamente (re-calculando scores existentes) ou apenas para novas tentativas?

2. **PROB-004 (P1):** Confirmar que revisão de Speaking/Writing deve bloquear efetivamente o avanço de nível (não apenas mostrar aviso)?

3. **PROB-005 (P1):** API keys dos usuários devem ir para sessionStorage (limpa ao fechar) ou para um proxy backend (mais seguro)?

4. **PROB-013/016 (P2):** Confirmar novo limiar de mastery: 80% mínimo por pilar, ou manter 75%?

5. **PROB-025-032 (P2 pedagógico):** Autorizar reescrita de partes das aulas A1 e A2 para corrigir qualidade pedagógica?

---

## ESTADO ATUAL DOS TESTES

```
Suite existente:  54/54 passando ✅
Suite de auditoria: 108/110 passando (2 falhas = evidências de bug P0 PROB-002)
```

O script de auditoria está em `e2e/audit-completa.spec.js` e pode ser re-executado a qualquer momento para re-verificar os problemas identificados.
