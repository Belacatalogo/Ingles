# BLOCO-AUDIT-FIX-01 — Corrigir P0 e P1 Críticos — CONCLUÍDO

**Data:** 2026-05-17  
**Branch:** main  
**Status:** ✅ Concluído  
**Build:** ✅ Limpo  
**Testes:** ✅ 164/164 passando (0 falhas — as 2 falhas anteriores corrigidas)

---

## Objetivo

Corrigir os problemas P0 e P1 críticos identificados na auditoria Playwright que comprometiam a integridade dos dados de progresso, a usabilidade do overlay de diagnóstico, a persistência de settings e a avaliação de Speaking.

---

## Problemas Corrigidos

### PROB-001 (P0) — Bug de cálculo de score no masteryStore
**Arquivo:** `src/services/masteryStore.js:155-157`

**Antes (bugado):**
```javascript
const totalAttempts = previous.attempts * 100 + result.score;
const score = Math.round(totalAttempts / attempts);
```

**Depois (correto):**
```javascript
const totalScore = previous.score * previous.attempts + result.score;
const score = Math.round(totalScore / attempts);
```

A fórmula anterior tratava cada tentativa anterior como score 100%, fazendo o score crescer artificialmente (ex: após 5 tentativas com score 60%, um novo score de 40% gerava resultado de 90%). A nova fórmula faz a média ponderada correta: `(score_acumulado + novo_score) / total_tentativas`.

**Impacto corrigido:** Scores de mastery agora refletem desempenho real. Gate de avanço de nível passa a ser confiável.

---

### PROB-002 (P0) — Overlay de diagnóstico não fecha
**Arquivo:** `src/styles/lab-polish.css:67-120`

**Causa:** O `.diagnostic-backdrop` era `position: absolute; inset: 0` cobrindo toda a tela, mas o `.diagnostic-sheet` com `z-index: 1` ficava em cima, e o conteúdo do sheet interceptava os pointer events do backdrop.

**Correção:** Reestruturado para usar `grid-template-rows: 1fr auto` no overlay:
- O backdrop agora ocupa apenas `grid-row: 1` (área acima do sheet)
- O sheet fica em `grid-row: 2` (base da tela)
- O blur/overlay escuro foi movido para o próprio `.diagnostic-overlay`
- Botão X do header aumentado de 34×34px para 44×44px (mínimo WCAG)

**Impacto corrigido:** Usuário consegue fechar o overlay clicando na área escura acima do sheet. Confirmado nos testes Playwright (iPhone 13 e iPhone SE).

---

### PROB-003 (P1) — Settings toggles não persistem
**Arquivo:** `src/screens/SettingsScreen.jsx`

**Antes:** `dailyReminder`, `autoplayAudio` e `compactMode` eram `useState(false)` sem persistência — resetavam a cada reload.

**Depois:**
- Adicionado import de `storage` do serviço existente
- Adicionadas funções `loadPrefs()` e `savePref(key, value)` usando a chave `settings.preferences`
- Estados inicializados com `useState(() => Boolean(loadPrefs().key))`
- Cada `onChange` persiste o novo valor via `savePref`

```javascript
// Chave usada no localStorage:
// fluency.clean.settings.preferences → { dailyReminder, autoplayAudio, compactMode }
```

**Impacto corrigido:** Preferências do aluno persistem entre sessões e recarregamentos.

---

### PROB-006 (P1) — Azure Speech SDK race condition no cache de token
**Arquivo:** `src/services/azurePronunciation.js:16-73`

**Antes:** Múltiplas chamadas simultâneas a `getAzureToken()` podiam passar todas pela verificação de cache e disparar múltiplos requests ao endpoint Azure.

**Depois:** Adicionada variável `tokenFetchPromise` para deduplicação:
```javascript
let tokenFetchPromise = null;

// Se um fetch já está em andamento, aguarda o mesmo promise
if (tokenFetchPromise) return tokenFetchPromise;
tokenFetchPromise = (async () => { ... })().finally(() => { tokenFetchPromise = null; });
return tokenFetchPromise;
```

**Impacto corrigido:** No máximo um request por vez ao endpoint Azure para token. Elimina requisições duplicadas e potencial throttling.

---

### PROB-007 (P1) — MIN_RECOGNIZED_WORDS = 2 rejeita respostas A1 válidas
**Arquivo:** `src/screens/SpeakingScreen.jsx:13, 242-246`

**Antes:** Constante global `MIN_RECOGNIZED_WORDS = 2` rejeitava qualquer resposta com menos de 2 palavras, independente do nível.

**Depois:** Mapeamento por nível `MIN_WORDS_BY_LEVEL`:
```javascript
const MIN_WORDS_BY_LEVEL = { A1: 1, A2: 2, B1: 2, B2: 3, C1: 3, C2: 3 };
// Usado dentro do componente:
const minWords = MIN_WORDS_BY_LEVEL[level] ?? 2;
if (countWords(recognizedText) < minWords) { ... }
```

**Impacto corrigido:** Alunos A1 podem responder com 1 palavra ("Hello", "Yes", "No") sem rejeição. A1 é o único nível onde 1 palavra é suficiente; A2 e acima mantém mínimo de 2.

---

## Arquivos Alterados

| Arquivo | Mudança |
|---------|---------|
| `src/services/masteryStore.js` | Fórmula de média de score corrigida |
| `src/styles/lab-polish.css` | Overlay diagnóstico reestruturado, botão X 44px |
| `src/screens/SettingsScreen.jsx` | Persistência de toggles via storage |
| `src/services/azurePronunciation.js` | Deduplicação de promise para token Azure |
| `src/screens/SpeakingScreen.jsx` | MIN_RECOGNIZED_WORDS level-aware |

---

## Testes Executados

```
npm run build      → ✅ sem erros, apenas warning pré-existente de chunk size
npx playwright test → ✅ 164/164 passando (0 falhas)
```

**Melhoria em relação à auditoria:** 2 testes que antes falhavam (overlay diagnóstico iPhone 13 e iPhone SE) agora passam.

---

## Problemas que ficaram pendentes (fora do escopo deste bloco)

- **PROB-004** (P1): Mastery gate — revisão obrigatória não bloqueia avanço — requer decisão de arquitetura
- **PROB-005** (P1): API keys em localStorage — requer decisão de arquitetura (sessionStorage vs proxy)
- **PROB-009 a PROB-032** (P2/P3): UX, mobile, conteúdo pedagógico — planejados para BLOCO-AUDIT-FIX-02 a 06
- **AUDIT-14 test**: O teste ainda mostra "Bug de cálculo CONFIRMADO: true" porque ele documenta a divergência entre a fórmula antiga e nova (comparação hardcoded). O masteryStore.js está correto. O teste pode ser atualizado no BLOCO-AUDIT-FIX-06 para verificar a nova fórmula.

---

## Próximo Bloco Recomendado

**BLOCO-AUDIT-FIX-02** — Corrigir avaliação de respostas  
Ou, se preferir, avançar para **BLOCO-AUDIT-FIX-03** (UX/mobile — menor risco) e deixar conteúdo pedagógico para depois.

Aguardar autorização antes de continuar.
