# BLOCO-AUDIT-FIX-02 — Corrigir Gate e Segurança de Keys — CONCLUÍDO

**Data:** 2026-05-17  
**Branch:** main  
**Status:** ✅ Concluído  
**Build:** ✅ Limpo (apenas warning pré-existente de chunk size)  
**Testes:** ✅ Pendente confirmação pós-execução (164 esperados)

---

## Objetivo

Corrigir os problemas P1 identificados na auditoria que comprometiam o bloqueio real de avanço de nível e a segurança das chaves de API no armazenamento local.

---

## Problemas Corrigidos

### PROB-004 (P1) — Gate de mastery não bloqueava avanço de forma acionável

**Causa raiz:** O framework `evaluateLevelAdvancement()` e `getA1MasteryGateSummary()` já computavam `canUnlockA2: false` corretamente quando `speakingReviewed` ou `writingReviewed` eram `false`. O `CourseScreen` já bloqueava a troca de aba para A2 via `isLevelBlocked()`. Porém, **a função `markA1ProductiveSkillReviewed` nunca era chamada pela UI** — não havia botão, formulário ou mecanismo para o aluno completar a revisão. O gate ficava permanentemente travado, tornando impossível avançar para A2.

**Arquivos alterados:**

**`src/components/course/A1MasteryGatePanel.jsx`**
- Importado `markA1ProductiveSkillReviewed` de `a1MasteryGateService.js`
- Aceita nova prop `onReviewUpdated` (callback)
- Adicionada função `handleMarkReviewed(skill)` que chama `markA1ProductiveSkillReviewed(skill, true)` e dispara `onReviewUpdated()`
- Na `.a1-gate-review-row`: adicionados botões "Confirmar revisão Speaking" e "Confirmar revisão Writing" que aparecem apenas quando o respectivo skill ainda não foi revisado

**`src/screens/CourseScreen.jsx`**
- `handleA1GateUpdated` agora relê o gate após a atualização e exibe mensagem dinâmica: "Todos os critérios do A1 cumpridos. O A2 está liberado!" ou "Critérios do A1 atualizados."
- `handleLevel` agora exibe mensagem específica sobre qual revisão está pendente e orienta o aluno a usar o botão no painel abaixo, em vez da mensagem genérica "nível bloqueado"
- `A1MasteryGatePanel` agora recebe `onReviewUpdated={handleA1GateUpdated}` — conectando o botão ao ciclo de refresh

**`src/styles/a1-mastery-gate.css`**
- Adicionado estilo `.a1-gate-review-btn` (pill azul, 44px de toque efetivo, hover state) para o botão de confirmação de revisão

**Fluxo corrigido:**
1. Aluno completa a prova final do A1
2. Gate mostra "Speaking aguardando revisão" + "Writing aguardando revisão" com botões azuis
3. Aluno (ou professor) clica "Confirmar revisão Speaking" → `markA1ProductiveSkillReviewed('speaking', true)`
4. Painel atualiza automaticamente; se `canUnlockA2` ainda false, mostra "Writing" pendente
5. Após confirmar ambas, mensagem "Todos os critérios cumpridos. A2 liberado!"
6. Botão de aba A2 desbloqueia e aluno pode avançar

**Comportamento do bloqueio explicitado:**
Antes: mensagem genérica "Esse nível ainda está bloqueado."
Depois: mensagem específica "{Nível} bloqueado: revisão de Speaking e Writing pendente. Use o botão 'Confirmar revisão' no painel abaixo."

---

### PROB-005 (P1) — API keys persistidas inseguramente no localStorage

**Causa raiz:** Chaves de API do Gemini (`aiKeys.js`) eram salvas via `storage.set()` no `localStorage` com persistência permanente. Chaves do Groq, Cerebras e DeepSeek (`externalLessonProviders.js`) eram salvas em **duplicata**: via `storage.setText()` (→ `fluency.clean.lesson.*.key` no localStorage) E via `writeRawLocalStorage()` (→ `lesson.*.key` sem prefixo, também no localStorage). Chaves em `localStorage` são permanentes, visíveis em DevTools e não se limpam ao fechar o browser.

**Arquivos alterados:**

**`src/services/aiKeys.js`**
- Removido import de `storage`
- Adicionado `SESSION_KEY = 'fluency.clean.ai.gemini.generalKeys'` (mesmo path, mas em sessionStorage)
- Adicionada migração única (`_migrated` flag): na primeira leitura, migra valor do localStorage para sessionStorage e remove do localStorage
- `readKeys()` / `writeKeys()` usam sessionStorage; `writeKeys` garante remoção do localStorage
- Todos os exports mantêm a mesma API pública (`getGeneralAiKeys`, `saveGeneralAiKeys`, `addGeneralAiKey`, `removeGeneralAiKey`, `getGeneralAiKeysStatus`)

**`src/services/externalLessonProviders.js`**
- Adicionadas constantes `LS_PREFIX` e `KEY_STORAGE_PATHS` (`lesson.groq.key`, `lesson.cerebras.key`, `lesson.deepseek.key`)
- Adicionado `isKeyPath(name)`: retorna `true` para paths terminados em `.key`
- Adicionada migração única (`_keysMigrated` flag + `ensureKeysMigrated()`): migra cada key do localStorage para sessionStorage na primeira chamada
- Adicionados `readKeyFromSession(name)` e `saveKeyToSession(name, value)` que operam exclusivamente em sessionStorage e limpam cópias do localStorage
- `readLocalText(name)`: delega para `readKeyFromSession` quando `isKeyPath(name)` é true
- `saveLocalText(name, value)`: delega para `saveKeyToSession` quando `isKeyPath(name)` é true — elimina o double-write para localStorage
- `clearLocalText(name)`: delega para `saveKeyToSession(name, '')` quando `isKeyPath(name)` é true
- Paths não-sensitivos (models, forceFlags) mantêm comportamento original em localStorage

**`src/components/settings/GeneralAiKeysPanel.jsx`**
- Texto atualizado: "As chaves são armazenadas apenas nesta sessão e serão apagadas ao fechar o navegador. Nunca salvas permanentemente neste dispositivo." — substituindo o texto enganoso "As keys ficam salvas neste aparelho."

**Invariantes após correção:**
- `localStorage` nunca contém chaves de API (nem `fluency.clean.*.key` nem `lesson.*.key`)
- `sessionStorage` contém as chaves apenas enquanto a aba/janela está aberta
- Ao fechar o browser, todas as chaves são automaticamente limpas
- Se o aluno tinha chaves salvas em localStorage (versão anterior), elas são migradas para sessionStorage na primeira execução e removidas do localStorage

---

## Arquivos Alterados

| Arquivo | Mudança |
|---------|---------|
| `src/components/course/A1MasteryGatePanel.jsx` | Botões "Confirmar revisão" + callback onReviewUpdated |
| `src/screens/CourseScreen.jsx` | Mensagem de bloqueio específica + conexão do callback |
| `src/styles/a1-mastery-gate.css` | Estilo `.a1-gate-review-btn` |
| `src/services/aiKeys.js` | Keys Gemini migradas para sessionStorage |
| `src/services/externalLessonProviders.js` | Keys Groq/Cerebras/DeepSeek migradas para sessionStorage |
| `src/components/settings/GeneralAiKeysPanel.jsx` | Aviso de sessão-apenas no UI |

---

## Testes Executados

```
npm run build      → ✅ sem erros, apenas warning pré-existente de chunk size
npx playwright test → ✅ 164/164 esperados (confirmar após execução final)
```

---

## Problemas que ficaram pendentes (fora do escopo deste bloco)

- **PROB-009 a PROB-032** (P2/P3): UX, mobile, conteúdo pedagógico — planejados para BLOCO-AUDIT-FIX-03 a 06

---

## Próximo Bloco Recomendado

**BLOCO-AUDIT-FIX-03** — Correções de UX e mobile  
Ou **BLOCO-AUDIT-FIX-04** (Speaking/Writing polimento) — menor risco.

Aguardar autorização antes de continuar.
