# BLOCO SETTINGS-AI-KEYS-CLEANUP-1 — Limpeza de Chaves na Tela de Ajustes

Data: 2026-05-17

## Objetivo

Remover da tela de Ajustes a área "Chaves de aulas" (usada para geração de aulas por IA),
mantendo apenas as "Chaves gerais de IA" usadas para tutor, correção, speaking e revisão
adaptativa. A direção oficial do projeto é curso fixo premium — IA só tutora, não gera aulas.

---

## Por que "Chaves de aulas" foi removido

O sistema de geração de aulas por IA foi descontinuado como caminho principal. As aulas são
conteúdo fixo premium (A1→C2). A IA continua presente apenas como tutora/corretora:

- explica dúvidas durante a aula;
- corrige produções escritas e faladas;
- gera feedback adaptativo na revisão;
- avalia respostas de speaking/writing.

Manter uma área de "Chaves de aulas" (com Flash/free, Pro fallback, Key Pro paga, Groq, Cerebras,
DeepSeek) causava confusão: o usuário via opções para um recurso que não é mais usado no fluxo
principal.

---

## O que foi removido da UI

| Item removido | Componente | Motivo |
|---|---|---|
| Aba "Chaves de aulas" no sidebar | `SettingsScreen.jsx` | Renomeada para "Chaves gerais de IA" |
| Tabs "Chaves de aulas" / "IA geral" | `SettingsScreen.jsx` | Estrutura de abas removida |
| `LessonKeysPanel` (Flash/free, Pro fallback, Key Pro paga) | `LessonKeysPanel.jsx` | Removido da UI; arquivo mantido como legado |
| Providers externos (Groq, Cerebras, DeepSeek) | Via `LessonKeysPanel` | Removidos da UI |
| Texto "As chaves de aulas continuam isoladas abaixo" | `GeneralAiKeysPanel.jsx` | Substituído por texto correto |

---

## O que permanece funcionando

| Serviço | Keys usadas | Impacto da mudança |
|---|---|---|
| `aiTutorService.js` | `ai.gemini.generalKeys` | Sem impacto — usa só keys gerais |
| `studentAnswerAnalysisService.js` | `ai.gemini.generalKeys` | Sem impacto |
| `adaptiveReviewService.js` | `ai.gemini.generalKeys` | Sem impacto |
| `geminiTts.js` | generalKeys + lessonKeys (fallback) | Generalkeys continuam. lessonKeys ficam em localStorage se já existiam |
| `geminiAudioService.js` | generalKeys + lessonKeys (fallback) | Idem |

> Nota: `geminiTts.js` e `geminiAudioService.js` ainda buscam `lesson.gemini.flashKeys` e
> `lesson.gemini.proKey` internamente como fallback para áudio. Isso não quebra nada — se o
> usuário tiver essas keys salvas de antes, o áudio continua funcionando. Se não tiver, usa
> as keys gerais.

---

## Arquivos alterados

| Arquivo | Mudança |
|---|---|
| `src/screens/SettingsScreen.jsx` | Removeu import de `LessonKeysPanel`; renomeou grupo; removeu tab UI; simplificou Card |
| `src/components/settings/GeneralAiKeysPanel.jsx` | Atualizou subtitle, descrição e adicionou aviso de sincronização |
| `e2e/settings-ai-keys-mobile.spec.js` | Novo — 4 testes × 2 viewports = 8 instâncias |
| `.gitignore` | Adicionou `playwright-report/` e `test-results/` |

## Arquivos mantidos sem alteração (legado)

| Arquivo | Status |
|---|---|
| `src/components/settings/LessonKeysPanel.jsx` | Mantido — não é mais importado, mas o arquivo existe |
| `src/services/lessonKeys.js` | Mantido — usado internamente por `geminiTts.js` e `geminiAudioService.js` |
| `src/services/externalLessonProviders.js` | Mantido — legado |
| `src/services/modelPolicy.js` | Mantido — descreve modelos disponíveis |

---

## Textos atualizados na UI

**Sidebar (categoria):**
- Antes: "Chaves de aulas" / "aulas e IA geral separadas"
- Depois: "Chaves gerais de IA" / "tutor, correção, speaking e revisão"

**Card (título):**
- Antes: "IA separada por função"
- Depois: "Chaves gerais de IA"

**Painel (subtítulo):**
- Antes: "Speaking, Imersão e outras áreas inteligentes"
- Depois: "Correção, tutor, speaking, revisão adaptativa e recursos inteligentes"

**Painel (descrição):**
- Antes: "Use esta área para keys Gemini que poderão alimentar recursos de IA fora da geração de aulas. As chaves de aulas continuam isoladas abaixo."
- Depois: "Use estas keys para correção, tutor, speaking, revisão adaptativa e recursos inteligentes. As aulas principais continuam fixas e não são geradas por IA."

**Painel (aviso novo):**
- "As keys ficam salvas neste aparelho. A sincronização por conta será ativada em uma etapa futura."

---

## Onde as keys ficam salvas hoje

As keys são salvas localmente no `localStorage` do navegador/WebView do iPhone, com o prefixo
`fluency.clean.`:

| Key | Storage |
|---|---|
| Keys gerais de IA | `fluency.clean.ai.gemini.generalKeys` (máx. 5) |

O usuário pode adicionar até 5 keys. Cada key é validada no formato `AIza[20+chars]` antes
de ser salva. As keys são exibidas mascaradas na UI.

---

## Como será no futuro com login/Firebase

Quando o login real (Firebase Authentication) for ativado:
- as keys poderão ser associadas ao usuário autenticado;
- sincronização automática entre dispositivos se tornará possível;
- **este bloco não ativa nada disso** — apenas informa o usuário através do aviso na UI;
- nenhuma key é enviada para backend neste bloco.

---

## Testes Playwright

`e2e/settings-ai-keys-mobile.spec.js` — 4 testes × 2 viewports (iPhone SE + iPhone 13) = 8 instâncias:

1. Seção mostra "Chaves gerais de IA" ✅
2. "Chaves de aulas" não aparece na UI ✅
3. Rótulos removidos não aparecem (Flash/free, Pro fallback, Key Pro paga) ✅
4. Adicionar key fake altera contagem 0/5 → 1/5 e persiste na navegação ✅

**36/36 testes passando** (14 smoke + 6 flashcards + 8 masteryGate + 8 settings).

---

## Limitações / Pendências futuras

- `LessonKeysPanel.jsx` e `lessonKeys.js` permanecem no código como legado — podem ser removidos
  quando a dependência em `geminiTts.js` e `geminiAudioService.js` for resolvida ou quando
  esses serviços forem migrados para usar somente keys gerais.
- A sincronização de keys por conta/login não foi ativada — aguarda integração Firebase real.
- O teste de persistência usa navegação de aba (não reload completo), porque `addInitScript`
  do Playwright executa em cada carregamento de página.

---

## Confirmação

```
Branch: main
Sem branch nova.
Sem PR.
Sem merge.
Sem rebase.
Sem force push.
Não gerou aulas novas.
Não alterou conteúdo A1.
Não ativou Firebase/Azure/Gemini real.
Não quebrou AI Tutor, Speaking ou Revisão adaptativa.
Não removeu lessonKeys.js (serviço legado mantido).
Build: ✅ 2534 módulos, sem erros.
Playwright: ✅ 36/36.
```
