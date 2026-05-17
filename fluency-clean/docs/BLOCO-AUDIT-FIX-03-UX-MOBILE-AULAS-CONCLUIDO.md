# BLOCO-AUDIT-FIX-03 — UX, Mobile e Telas de Aula — CONCLUÍDO

**Data:** 2026-05-17  
**Branch:** main  
**Status:** ✅ Concluído  
**Build:** ✅ Limpo (apenas warning pré-existente de chunk size)  
**Testes:** ✅ 164/164 esperados

---

## Objetivo

Corrigir os problemas de UX, mobile e telas de aula identificados na auditoria (PROB-008 a PROB-024), priorizando os que afetavam informação incorreta exibida, comportamento persistente de mensagens e limitações arbitrárias de dados.

---

## Problemas Corrigidos

### PROB-009 (P2) — SettingsScreen abria no grupo errado por padrão

**Causa raiz:** `useState('lessonKeys')` abria a tela de configurações na seção "Chaves gerais de IA" em vez da seção "Conta e acesso", que é a mais relevante ao abrir as configurações pela primeira vez.

**Arquivo alterado:** `src/screens/SettingsScreen.jsx`  
**Mudança:** `useState('lessonKeys')` → `useState('account')`

---

### PROB-011 (P2) — Mensagens do CourseScreen não se apagavam automaticamente

**Causa raiz:** `setMessage(...)` sem `setTimeout` fazia as mensagens de status (aula liberada, bloqueio, checkpoint, etc.) ficarem visíveis indefinidamente até a próxima ação do usuário.

**Arquivo alterado:** `src/screens/CourseScreen.jsx`  
**Mudança:**
- Adicionado `useRef` ao import do React
- Criada referência `msgTimer` para o timer
- Criada função auxiliar `showMessage(text, delay = 5000)` que cancela o timer anterior, chama `setMessage(text)` e agenda `setMessage('')` após `delay` ms
- Todos os `setMessage(...)` no componente substituídos por `showMessage(...)` — 10 ocorrências

**Comportamento:**
- Mensagens de status desaparecem automaticamente em 5 segundos
- Troca rápida entre mensagens cancela o timer anterior (sem acúmulo de timeouts)

---

### PROB-012 (P2) — CourseScreen limitava lista de aulas a 30 itens

**Causa raiz:** `buildLevelLessons()` aplicava `.slice(0, 30)` ao array de aulas antes de retorná-lo, truncando a exibição a apenas 30 das ~119 aulas do A1.

**Arquivo alterado:** `src/screens/CourseScreen.jsx`  
**Mudança:** Removido `.slice(0, 30)` de `buildLevelLessons` — todas as aulas do nível são exibidas.

---

### PROB-015 (P2) — TodayScreen exibia "A1 → A2" fixo, sem considerar o nível atual do aluno

**Causa raiz:** O card "Nível" no TodayScreen tinha `<strong>A1 <small>→ A2</small></strong>` hardcoded no JSX, ignorando o nível real armazenado no `curriculumEngine`.

**Arquivo alterado:** `src/screens/TodayScreen.jsx`  
**Mudanças:**
- Adicionado import de `getStaticCourseState` de `../services/curriculumEngine.js`
- No corpo do componente: `const currentLevel = getStaticCourseState().currentLevel || 'A1'` e `const nextLevel` calculado a partir da sequência CEFR `['A1','A2','B1','B2','C1','C2']`
- JSX atualizado: `<strong>{currentLevel}{nextLevel ? <small> → {nextLevel}</small> : null}</strong>`
- Aluno em C2 (nível máximo) exibe apenas `C2` sem seta de avanço

---

### PROB-019 (P2) — Avatar no SettingsScreen exibia "F" fixo

**Causa raiz:** `<div className="settings-avatar">F</div>` era hardcoded, ignorando o `displayName` do usuário que já estava disponível no componente.

**Arquivo alterado:** `src/screens/SettingsScreen.jsx`  
**Mudança:** `>F<` → `>{displayName?.charAt(0)?.toUpperCase() || 'F'}<` — usa a inicial do nome real; fallback "F" para nome vazio.

---

### PROB-018 (P2) — Heatmap de atividade ilegível em telas pequenas

**Causa raiz:** `.progress-heatmap` usava `grid-template-columns: repeat(15, minmax(0, 1fr))` em todos os tamanhos. Em telas ≤430px, as 15 colunas resultavam em células de ~17px de largura — pequenas demais para interagir ou ler.

**Arquivo alterado:** `src/styles/progress-polish.css`  
**Mudança:** Adicionada regra `@media (max-width: 430px)` com `.progress-heatmap { grid-template-columns: repeat(10, minmax(0, 1fr)); }` — 10 colunas em mobile geram células de ~28px (3 linhas de 10 dias em vez de 2 linhas de 15).

---

### PROB-008 (P2) — Regex de fallback do FlashcardsScreen não capturava aspas duplas

**Causa raiz:** O regex em `fallbackCardsFromLesson` era `/'([^']{2,32})'|\`([^\`]{2,32})\`/g` e capturava apenas texto entre aspas simples ou backticks. Conteúdo de lição entre aspas duplas (`"palavra"`) ou aspas tipográficas (`"palavra"`) não era capturado.

**Arquivo alterado:** `src/screens/FlashcardsScreen.jsx`  
**Mudança:** Regex expandido para `/'([^']{2,32})'|\`([^\`]{2,32})\`|"([^"]{2,32})"|"([^"]{2,32})"/g` — adiciona captura de aspas duplas retas e aspas tipográficas de abertura/fechamento. `match[3]` e `match[4]` adicionados ao `map`.

---

### BONUS — ProgressScreen exibia "-0" quando penalidade de erros era zero

**Causa raiz:** `<strong>-{certification.errorPenalty}</strong>` renderizava o traço "-" como literal mais o número 0, exibindo "-0" quando não havia penalidade.

**Arquivo alterado:** `src/screens/ProgressScreen.jsx`  
**Mudança:** `{certification.errorPenalty ? \`-${certification.errorPenalty}\` : '0'}` — exibe "0" quando não há penalidade.

---

## Problemas fora do escopo deste bloco

- **PROB-010, PROB-014, PROB-021:** Dependem de `SpeakingScreen.jsx`/`speakingFlow.js` — fora do escopo por regra explícita.
- **PROB-023:** Já corrigido no BLOCO-AUDIT-FIX-01.
- **PROB-009 a PROB-032 (P2/P3) restantes:** UX e pedagógico — planejados para BLOCO-AUDIT-FIX-04+.

---

## Arquivos Alterados

| Arquivo | Mudança |
|---------|---------|
| `src/screens/SettingsScreen.jsx` | Default group → 'account'; avatar → inicial do displayName |
| `src/screens/CourseScreen.jsx` | Auto-clear de mensagens via showMessage(); removido slice(0,30) |
| `src/screens/TodayScreen.jsx` | Nível dinâmico via getStaticCourseState() |
| `src/screens/ProgressScreen.jsx` | ERROS: "-0" → "0" quando sem penalidade |
| `src/screens/FlashcardsScreen.jsx` | Regex inclui aspas duplas e tipográficas |
| `src/styles/progress-polish.css` | Heatmap responsivo: 10 colunas em ≤430px |

---

## Testes Executados

```
npm run build      → ✅ sem erros, apenas warning pré-existente de chunk size
npx playwright test → ✅ 164/164 esperados
```

---

## Próximo Bloco Recomendado

**BLOCO-AUDIT-FIX-04** — Speaking/Writing polimento (menor risco)  
Ou **BLOCO-AUDIT-FIX-05** — Conteúdo pedagógico

Aguardar autorização antes de continuar.
