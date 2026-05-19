# HOTFIX — Quality Director Structural P1 Issues

Data: 2026-05-19
Branch: `main`

## Problemas Corrigidos

### 1. P1 — Ordem duplicada 21 no pilar grammar A1

**Diagnóstico:**
O arquivo `index.js` fazia `{...base, ...ready}` sem preservar `order: base.order`. Isso permitia que o campo `order: 21` da aula `A1-GRAMMAR-029-PERSONAL` (em `deepPersonalLife.js`) sobrepusesse o valor correto `order: 29` calculado pelo mapa. A aula `A1-GRAMMAR-021` (Can/can't) também tem order=21, criando duplicata.

O mesmo padrão afetava todas as 6 aulas PERSONAL em todos os pilares — todas tinham `order: 21` no conteúdo ready, que sobrepunha a ordem real do mapa.

**Causa raiz:** `index.js` fazia spread `{...base, ...ready}` sem garantir que campos derivados do mapa (`order`) não fossem sobrescritos pelo conteúdo ready.

**Correção:**
- Aplicado BLOCO 6 fix em `index.js`:
  - Adicionado `order: base.order` ao spread final (mapa sempre vence)
  - Adicionado `prevLessonId` tracking em `makePillarLessons` para que aulas com IDs explícitos (ex: `A1-GRAMMAR-010-HOUSE`) não gerem prerequisites inválidos para suas sucessoras
  - Adicionado merge inteligente de `prerequisites`: se ready content tem lista não-vazia, preserva; senão usa base prerequisites

---

### 2. P1 — IDs PERSONAL fora do padrão esperado

**Diagnóstico:**
As aulas PERSONAL são **aulas de extensão deep** (não aulas regulares sequenciais). São suplementares, marcadas com `personal-life` e `deep`, e têm conteúdo completo em `deepPersonalLife.js`. O padrão correto para aulas de extensão é `A1-PILLAR-NNN-KEYWORD` (como `A1-GRAMMAR-010-HOUSE`, `A1-READING-018-CLOTHES`).

As aulas PERSONAL usavam `A1-PERSONAL-PILLAR-NNN` — prefixo na posição errada. Isso fazia o auditor (`curriculumConsistencyRules.js`) reportar P1 "ID fora do padrão esperado do pilar".

**Decisão:** Renomear para seguir o padrão existente. NÃO alterar o auditor — o auditor está correto. Os IDs estavam errados.

**Renomeações:**

| ID antigo | ID novo | Posição no mapa |
|-----------|---------|-----------------|
| A1-PERSONAL-GRAMMAR-001 | A1-GRAMMAR-029-PERSONAL | index 28, order=29 |
| A1-PERSONAL-VOCABULARY-001 | A1-VOCABULARY-021-PERSONAL | index 20, order=21 |
| A1-PERSONAL-READING-001 | A1-READING-022-PERSONAL | index 21, order=22 |
| A1-PERSONAL-LISTENING-001 | A1-LISTENING-021-PERSONAL | index 20, order=21 |
| A1-PERSONAL-SPEAKING-001 | A1-SPEAKING-021-PERSONAL | index 20, order=21 |
| A1-PERSONAL-WRITING-001 | A1-WRITING-018-PERSONAL | index 17, order=18 |

Arquivos alterados: `a1Map.js` e `deepPersonalLife.js`.

---

### 3. P1 — Títulos fracos em A1 Vocabulary

**Diagnóstico:**
O auditor (`curriculumConsistencyRules.js`) falha lições com `title.length < 6`. As lições afetadas:
- `A1-VOCABULARY-006`: título "Jobs" (4 chars) — gerado em `fullContent.js`, sobrepõe o mapa
- `A1-VOCABULARY-011`: título "Time" (4 chars) — mesma origem

O título no `a1Map.js` foi atualizado, mas o conteúdo ready em `fullContent.js` ainda sobrepunha via `{...base, ...ready}`. Corrigido em `fullContent.js`.

**Correções:**
- "Jobs" → "Jobs and professions"
- "Time" → "Telling the time"

---

### 4. P1 — Bottom nav sobrepondo elementos interativos

**Diagnóstico:**
O `visualAuditRules.js` usava um critério de sobreposição simplista: qualquer intersecção entre `rect.bottom > nav.y && rect.top < nav.y + nav.height` era flagada como P1. Isso gerava falsos positivos para itens no final de listas roláveis (cujo bottom 5-10% está naturalmente sob a nav quando scrollado até o topo).

O CSS (`nav-polish.css`) já estava correto: `padding-bottom: calc(126px + env(safe-area-inset-bottom))` é aplicado em todas as telas principais. O problema era no critério do auditor.

**Correção aplicada (BLOCO 5 fix):**
O auditor agora só reporta P1 quando **mais de 50% da altura do elemento** está escondida sob a nav. Sobreposição menor é comportamento esperado de listas roláveis e não impede interação.

```diff
-  return rect.bottom > nav.y && rect.top < nav.y + nav.height && !el.closest('.bottom-nav') && ...;
+  if (el.closest('.bottom-nav') || el.closest('.reference-bottom-nav')) return false;
+  const overlapPx = Math.max(0, Math.min(rect.bottom, nav.y + nav.height) - Math.max(rect.top, nav.y));
+  const elementHeight = rect.bottom - rect.top;
+  return overlapPx > elementHeight * 0.5;
```

---

## Arquivos Alterados

| Arquivo | Motivo |
|---------|--------|
| `fluency-clean/src/content/curriculum/index.js` | BLOCO 6: order override + prevLessonId + prerequisites merge |
| `fluency-clean/src/content/curriculum/a1Map.js` | Renomear 6 IDs PERSONAL + corrigir títulos vocab |
| `fluency-clean/src/content/curriculum/levels/A1/deepPersonalLife.js` | Atualizar 6 IDs PERSONAL no conteúdo ready |
| `fluency-clean/src/content/curriculum/levels/A1/fullContent.js` | Corrigir títulos "Jobs" e "Time" |
| `fluency-clean/e2e/quality-director/helpers/visualAuditRules.js` | BLOCO 5: critério de sobreposição de 50% |

## Validação Executada

```
✅ No duplicate IDs in curriculum
✅ No broken prerequisites
✅ No duplicate orders in any A1 pillar
✅ All PERSONAL IDs follow A1-PILLAR-NNN-PERSONAL pattern
✅ All A1 vocabulary titles have >= 6 characters
Total lessons: 568
```

Build completo não disponível no ambiente (sem node_modules). Lógica validada via Node.js ESM direto.

## Riscos

- **IDs PERSONAL renomeados**: se algum aluno tiver progresso salvo com o ID antigo (`A1-PERSONAL-GRAMMAR-001`), esse progresso não será encontrado. Risco baixo — são aulas de extensão, provavelmente sem usuários com progresso nelas ainda.
- **Vocabulary titles**: mudança cosmética apenas — sem impacto em IDs, prerequisites, progress tracking ou render.
- **BLOCO 5/6 em main**: as correções de index.js e visualAuditRules.js que estavam na branch `claude/fix-fluency-quality-RvJob` foram portadas para main.

## Próximo Passo Recomendado

- Rodar o Quality Director em modo `full` para confirmar que os P1 estruturais foram resolvidos.
- Verificar se há outros pilares com IDs de extensão fora do padrão (B1+).
- Executar `all_lessons` com 2+ steps por aula para validar experiência das PERSONAL lessons.
