# A1 Count Discrepancy Investigation: 119 vs 139
# BLOCO-A1-COUNT-AND-COMPLETION-FIX

**Data:** 2026-05-18
**Branch:** main
**Status:** RESOLVIDO ✅

---

## RESUMO EXECUTIVO

| Sistema | Contagem A1 | Origem |
|---------|------------:|--------|
| UI visual (`getStaticLessons('A1')`) | 119 → **132** (corrigido) | `curriculum/index.js` → `a1Map.js` → PILLAR_MAPS |
| Registry oficial (`STATIC_READY_LESSONS`) | 139 | `staticLessonContent.js` |
| Diferença residual (esperada) | **7** | Checkpoints A1 (sistema de mastery, não lista de aulas) |

**Antes da correção:** UI=119, staticContent=139, gap=20  
**Após a correção:** UI=132, staticContent=139, gap=7 (7 checkpoints — correto)

---

## FASE 1 — INVESTIGAÇÃO DA DIFERENÇA

### Raiz do problema

O sistema tem **dois mecanismos paralelos** para contar aulas A1:

**Sistema 1 — `a1Map.js` (UI principal)**
- `A1_PILLAR_MAPS` define 6 pilares com listas de itens
- `curriculum/index.js` → `makePillarLessons()` → `lesson()` gera IDs sequenciais (A1-GRAMMAR-001, A1-GRAMMAR-002...)
- `findStaticReadyLesson(id)` enriquece com dados do staticContent se o ID bater exatamente
- `getStaticLessons('A1')` = o que o usuário VÊ na UI

**Sistema 2 — `staticLessonContent.js` (source of truth pedagógico)**
- Importa todos os arquivos `deepA1*.js`
- `mergeUniqueLessons()` deduplica e ordena
- `STATIC_READY_LESSONS_BY_LEVEL['A1']` = 139 lições

### Os 20 itens ausentes do mapa

| Categoria | Quantidade | IDs | Motivo original |
|-----------|----------:|-----|-----------------|
| Checkpoints pillar | 7 | A1-CHECKPOINT-GRAMMAR, -VOCABULARY, -READING, -LISTENING, -SPEAKING, -WRITING, -FINAL | Correto: checkpoints ficam no sistema de mastery (a1MasteryAssessments.js), não na lista de aulas |
| Aulas profundas pessoais (A1.2) | 6 | A1-PERSONAL-GRAMMAR-001, -VOCABULARY-001, -READING-001, -LISTENING-001, -SPEAKING-001, -WRITING-001 | Adicionadas ao staticContent pelo bloco deepA1PersonalLife mas nunca registradas em a1Map |
| Aulas profundas temáticas (A1.4) | 7 | A1-GRAMMAR-010-HOUSE, A1-READING-018-CLOTHES, A1-LISTENING-012-WEATHER, -013-HELP, A1-SPEAKING-009-HELP, -016-WEATHER, A1-WRITING-012-HELP | IDs com sufixo não-padrão (ex: -HOUSE, -WEATHER, -HELP) — invisíveis para o gerador de IDs sequenciais |

### Por que esses itens eram invisíveis na UI

O `lesson()` em `curriculum/index.js` gerava ID `A1-GRAMMAR-028` e chamava `findStaticReadyLesson('A1-GRAMMAR-028')`. O staticContent tinha `A1-GRAMMAR-010-HOUSE` — IDs diferentes, nunca casavam.

---

## FASE 2 — CORREÇÃO APLICADA

### Mudanças mínimas e não-destrutivas

**1. `curriculum/index.js` (1 linha alterada)**
```js
// Antes:
const id = `${level}-${pillar.toUpperCase()}-${String(order).padStart(3, '0')}`;
// Depois:
const id = mapItem.id || `${level}-${pillar.toUpperCase()}-${String(order).padStart(3, '0')}`;
```
Mapas que não especificam `id` continuam usando IDs sequenciais — 100% backward-compatible.

**2. `a1Map.js` (13 novas entradas)**
- `item()` extendido para aceitar parâmetro `id` opcional
- 2 novas entradas em A1_GRAMMAR_MAP (appendadas após Grammar Checkpoint)
- A1_VOCABULARY_MAP convertida para array spread + 1 nova entrada
- A1_READING_MAP convertida para array spread + 2 novas entradas
- A1_LISTENING_MAP convertida para array spread + 3 novas entradas
- A1_SPEAKING_MAP convertida para array spread + 3 novas entradas
- A1_WRITING_MAP convertida para array spread + 2 novas entradas

### IDs existentes preservados

Nenhum ID sequencial existente foi alterado. A1-GRAMMAR-001 a A1-GRAMMAR-027 continuam intactos. Zero risco de quebrar progresso de usuários.

### Por que os checkpoints (7) não foram adicionados ao mapa

Os checkpoints A1 (`A1-CHECKPOINT-GRAMMAR` etc.) são objetos de lesson no staticContent MAS são controlados pelo sistema de mastery (`a1MasteryAssessments.js` e `checkpoints.js`), não pela lista de aulas navegável. Adicioná-los ao mapa criaria confusão (aluno veria checkpoint como aula normal). O gap de 7 é **intencional e correto**.

---

## FASE 3 — VALIDAÇÃO

### Contagens pós-correção

| Pillar | a1Map (UI) | staticContent | Diferença |
|--------|----------:|------------:|----------:|
| grammar | 29 | 29 | 0 ✅ |
| vocabulary | 21 | 21 | 0 ✅ |
| reading | 22 | 22 | 0 ✅ |
| listening | 21 | 21 | 0 ✅ |
| speaking | 21 | 21 | 0 ✅ |
| writing | 18 | 18 | 0 ✅ |
| checkpoint | 0 | 7 | 7 (esperado) |
| **TOTAL** | **132** | **139** | **7 (checkpoints)** |

- `getStaticLessons('A1')` = 132 ✅
- `getA1TotalLessonCount()` = 132 ✅
- Todos os 13 novos lessons: `status=ready` ✅
- Ordens corretas: 10.1, 9.1, 12.1, 18.1, 13.1, 16.1, 21 ✅
- Build Vite: ✅ limpo
- Duplicatas: 0 ✅

---

## LISTA DOS 132 LESSONS VISÍVEIS (por pillar)

### Grammar (29)
A1-GRAMMAR-001 a 027 (sequencial) + A1-GRAMMAR-010-HOUSE (order 10.1) + A1-PERSONAL-GRAMMAR-001 (order 21)

### Vocabulary (21)
A1-VOCABULARY-001 a 020 (sequencial) + A1-PERSONAL-VOCABULARY-001 (order 21)

### Reading (22)
A1-READING-001 a 020 (sequencial) + A1-READING-018-CLOTHES (order 18.1) + A1-PERSONAL-READING-001 (order 21)

### Listening (21)
A1-LISTENING-001 a 018 (sequencial) + A1-LISTENING-012-WEATHER (order 12.1) + A1-LISTENING-013-HELP (order 13.1) + A1-PERSONAL-LISTENING-001 (order 21)

### Speaking (21)
A1-SPEAKING-001 a 018 (sequencial) + A1-SPEAKING-009-HELP (order 9.1) + A1-SPEAKING-016-WEATHER (order 16.1) + A1-PERSONAL-SPEAKING-001 (order 21)

### Writing (18)
A1-WRITING-001 a 016 (sequencial) + A1-WRITING-012-HELP (order 12.1) + A1-PERSONAL-WRITING-001 (order 21)

---

## ARQUIVOS ALTERADOS

| Arquivo | Tipo de mudança |
|---------|----------------|
| `fluency-clean/src/content/curriculum/a1Map.js` | Extendido: item() com id opcional + 13 novas entradas |
| `fluency-clean/src/content/curriculum/index.js` | 1 linha: `mapItem.id ||` antes do ID sequencial |

---

## PRÓXIMO PASSO

Com A1 coerente (UI=132, staticContent=132 regulares + 7 checkpoints), prosseguir para:
**Auditoria Study Ready A1→C2** (conforme definido no Notion)
