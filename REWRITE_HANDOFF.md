# Fluency Clean — Handoff Oficial

Última atualização: 2026-05-17 (BLOCO-AUDIT-FIX-06)

## Branch oficial atual

A partir desta data, a branch oficial de trabalho é:

```txt
main
```

A branch `claude/improve-english-system-hu6gz` foi promovida para `main` e não deve mais ser usada como branch principal de continuação.

Backup da main antiga:

```txt
backup-main-before-improve-english-system-2026-05-16
```

Branches antigas/históricas:

```txt
rewrite-fluency-clean-lab
rewrite-fluency-clean
claude/improve-english-system-hu6gz
claude/improve-english-system-hu6gz-IuOMv
lab
```

Essas branches podem existir no GitHub como histórico, mas não devem ser usadas para novos blocos sem autorização explícita do usuário.

---

## REGRA MÁXIMA DE BRANCH — ATUALIZADA

- Trabalhar sempre na `main`.
- Não criar branch nova sem autorização explícita.
- Não voltar para `lab`.
- Não voltar para `rewrite-fluency-clean-lab`.
- Não voltar para `rewrite-fluency-clean`.
- Não voltar para `claude/improve-english-system-hu6gz`.
- Não usar branch sufixada automática.
- Não abrir PR para o fluxo normal.
- Não fazer merge.
- Não fazer rebase.
- Não fazer force push sem autorização explícita.
- Não mexer no backup da main antiga.

Antes de qualquer alteração, confirmar:

```bash
git branch --show-current
```

Resultado esperado:

```txt
main
```

Se não estiver na `main`, parar e trocar para `main` antes de editar.

---

## Regras técnicas obrigatórias

- Não mexer em `bundle.js`.
- Não criar bundle patch.
- Não usar DOM injection.
- Não usar HTML gigante/remendado.
- Não criar gambiarra em arquivo único.
- Manter tudo modular em `fluency-clean/src/`, `fluency-clean/public/`, `fluency-clean/docs/` ou arquivos reais de configuração.
- Não mexer no backend Azure privado sem autorização explícita.
- Não mexer no Firebase/Azure de produção sem autorização explícita.
- Não ativar Firebase real, Gemini real, Cloudinary real ou escrita remota sem autorização explícita.
- Não colocar secrets/credenciais no frontend.
- Não compactar conteúdo pedagógico apenas para caber na UI.
- Não mostrar gabarito, transcript, modelo ou resposta esperada antes da tentativa quando a etapa exigir descoberta.

---

## Nova direção oficial — curso fixo premium + IA auxiliar

Decisão estratégica aprovada pelo usuário:

- O Fluency não deve depender de IA para gerar a aula principal em tempo real.
- A aula principal deve vir de conteúdo fixo, curado, completo, validado e renderizado de forma previsível.
- A arquitetura oficial é: curso fixo premium A1 → C2 + prática profunda derivada da aula fixa + IA apenas como tutora/corretora/revisora adaptativa.
- IA pode corrigir Writing, avaliar Speaking, explicar dúvidas, gerar reforço pequeno baseado na aula atual e montar revisão adaptativa.
- IA não deve inventar a aula-base nem substituir o currículo fixo.

Fluxo oficial:

```txt
Curso fixo premium
↓
Curriculum Engine escolhe a próxima aula
↓
Renderizador estável por pilar
↓
Exercícios internos da aula
↓
Prática Profunda complementar derivada da aula fixa
↓
IA Tutor apenas para correção, dúvida, reforço e revisão adaptativa
↓
Mastery Gate libera ou bloqueia avanço
```

Fluxo antigo a aposentar:

```txt
IA gera aula completa do zero
↓
Parser tenta entender JSON
↓
Pipeline tenta corrigir
↓
Professor revisor tenta aprovar
↓
Aula salva
↓
Renderização quebra ou fica inconsistente
```

---

## ✅ BLOCO-AUDIT-FIX-01 — Correção de P0/P1 críticos da auditoria (2026-05-17)

Executado após auditoria Playwright completa (30 problemas catalogados).

**Corrigido:**
- PROB-001 (P0): Bug de cálculo de score no `masteryStore.js` — fórmula `previous.attempts * 100` substituída por média ponderada correta
- PROB-002 (P0): Overlay de diagnóstico não fechava no mobile — CSS reestruturado com grid-template-rows, botão X agora 44×44px
- PROB-003 (P1): Settings toggles (autoplay, modo compacto, lembrete diário) não persistiam — agora salvos em `fluency.clean.settings.preferences`
- PROB-006 (P1): Azure Speech SDK race condition no cache de token — deduplicação via `tokenFetchPromise`
- PROB-007 (P1): `MIN_RECOGNIZED_WORDS = 2` rejeitava respostas de 1 palavra em A1 — agora level-aware (`MIN_WORDS_BY_LEVEL`)

**Testes:** 164/164 passando (2 falhas anteriores corrigidas).

**Pendentes (resolvidos no FIX-02):**
- PROB-004 (P1): ✅ Resolvido — botões de confirmação de revisão no gate panel
- PROB-005 (P1): ✅ Resolvido — keys movidas para sessionStorage

---

## ✅ BLOCO-AUDIT-FIX-02 — Gate e Segurança de Keys (2026-05-17)

**Corrigido:**
- PROB-004 (P1): Mastery gate nunca tinha como ser desbloqueado — `markA1ProductiveSkillReviewed` nunca era chamado. Adicionados botões "Confirmar revisão Speaking/Writing" no `A1MasteryGatePanel`. Mensagem de bloqueio no `CourseScreen` agora específica sobre qual revisão está pendente.
- PROB-005 (P1): Keys de API (Gemini, Groq, Cerebras, DeepSeek) estavam em `localStorage` de forma permanente. Migradas para `sessionStorage` (limpas ao fechar o browser). Migração automática de valores existentes. UI avisa que keys são somente da sessão.

**Testes:** 164/164 passando.

---

## ✅ BLOCO-AUDIT-FIX-03 — UX, Mobile e Telas de Aula (2026-05-17)

**Corrigido:**
- PROB-009 (P2): SettingsScreen abria no grupo `'lessonKeys'` por padrão — corrigido para `'account'` (mais relevante ao abrir configurações).
- PROB-011 (P2): Mensagens de status do CourseScreen não desapareciam — adicionado `showMessage()` com auto-clear em 5 segundos via `useRef`/`setTimeout`.
- PROB-012 (P2): `buildLevelLessons()` limitava a lista a 30 aulas via `.slice(0, 30)` — limite removido, todas as aulas do nível são exibidas.
- PROB-015 (P2): TodayScreen exibia `A1 → A2` fixo — substituído por nível dinâmico via `getStaticCourseState().currentLevel` e cálculo CEFR.
- PROB-018 (P2): Heatmap de atividade em telas ≤430px tinha 15 colunas (células ~17px) — corrigido para 10 colunas em `@media (max-width: 430px)`.
- PROB-019 (P2): Avatar no SettingsScreen era letra "F" fixa — substituído por inicial do `displayName` do usuário.
- PROB-008 (P2): Regex de fallback no FlashcardsScreen não capturava aspas duplas — adicionado suporte a `"..."` e `"..."`.
- BONUS: ProgressScreen exibia "ERROS: -0" quando penalidade era zero — corrigido para "0".
- Teste E2E `settings-ai-keys-mobile.spec.js` atualizado para navegar até `'lessonKeys'` antes de verificar contagem (ajuste necessário após mudança do default group).
- Arquivo temporário `fix03-investigate.spec.js` (criado durante investigação) removido do diretório `e2e/`.

**Testes:** 164/164 passando.

---

## ✅ BLOCO-AUDIT-FIX-04 — Qualidade de Aulas e Exercícios (2026-05-17)

**Corrigido:**
- PROB-025: A1-READING-001 mainText sem conexão narrativa — texto reescrito com conector ("I have a friend in my class. His name is Luis.")
- PROB-026: A1 Listening sem predição ativa — listeningPreparation expandido com tarefa de predição, pergunta de situação e nota sobre áudio TTS
- PROB-027: A1 Speaking freeSpeaking sem modelo completo — nota com sequência obrigatória e exemplo preenchido adicionados a A1-SPEAKING-001 e 002
- PROB-028: A1 Writing checklist superficial — checklist expandido de 6 para 8 itens incluindo verificação de conteúdo; revisionChecklist expandido para cobrir completude
- PROB-029: A2 Reading texto genérico — A2-READING-001 reescrito com personagem Marco e detalhes concretos (coffee shop, Dona Lúcia, ônibus)
- PROB-030: Distractors absurdos em múltipla escolha — A1-READING-001 e 002 com distractors plausíveis e semanticamente coerentes
- PROB-031: Já estava correto — nenhuma intervenção necessária
- PROB-032: A2 Listening diálogos artificiais — A2-LISTENING-001 com detalhes naturais (avó cozinhou, filme em inglês difícil); A2-LISTENING-003 com complicação realista (quarto não pronto, espera no lobby)
- Correções técnicas de sintaxe: normalização de aspas curvas Unicode em deepReadingFoundations.js; apostrofes dentro de strings corrigidos para aspas duplas em deepReadingFoundations.js e deepA2Bridge.js

**Build:** ✅ `npx vite build` — 2533 módulos sem erros  
**Testes:** Playwright sem browser executável no ambiente remoto (infraestrutura pré-existente); nenhuma lógica de componente alterada

**Próximos blocos disponíveis:**
- BLOCO-AUDIT-FIX-05 — Progresso, mastery e checkpoints (próximo)
- Retomar criação de B1 (após aprovação)

---

## ✅ BLOCO-AUDIT-FIX-05 — Progresso, Mastery, Checkpoints e Final Exam (2026-05-17)

**Corrigido:**
- BUG CRÍTICO: `updateA1LessonCompletion` nunca era chamada → o A1 Gate sempre mostrava 0% de aulas concluídas. Criada `refreshA1LessonCompletionPercent()` em `a1MasteryGateService.js`; chamada em `StaticCompletionGate.jsx` e `LessonFlowShell.jsx` após conclusão de aula A1
- PROB-013: `vocabulary` ausente do `skillConfig` em `ProgressScreen.jsx` → adicionado pilar Vocabulary (tom indigo); pilares reordenados na sequência pedagógica
- PROB-022: `masteryStore.todayKey` usava UTC (`toISOString()`) enquanto `progressStore.localDateKey` usava hora local → corrigido `todayKey` para usar `.getFullYear()/.getMonth()/.getDate()` (hora local)

**Verificado e OK (não regressões):**
- PROB-001: Score mastery correto (corrigido no FIX-01)
- PROB-004: Gate bloqueia corretamente quando speaking/writing não revisados
- PROB-017: Estado `done` dos flashcards tem botão "Revisar novamente" — comportamento intencional
- XP sem duplicação, streak correto, persistência verificada
- Checkpoint e Final Exam conectados ao gate

**Pendências documentadas (decisão necessária):**
- PROB-016: Elevar limiar mínimo de 75% para 80%? (impacta todos os alunos)

**Build:** ✅ `npx vite build` — 2533 módulos sem erros  
**Sistema seguro para iniciar B1:** Sim — gate funciona, bloqueios reais, sem bypass

**Próximos blocos disponíveis:**
- BLOCO-AUDIT-FIX-06 — Limpeza técnica e segurança (sessionStorage/API keys, SRI)
- Retomar criação de B1 (após aprovação explícita)

---

## ✅ BLOCO-AUDIT-FIX-06 — Limpeza técnica e prevenção de regressões (2026-05-17)

**Auditado:**
- Console logs: todos os `console.warn` são operacionais legítimos — nenhum log de debug encontrado
- `LessonQualityPanel.jsx`: orphan confirmado (exportado mas nunca importado) — documentado, não deletado
- Gerador de aulas legado (AI): corretamente gateado por `SHOW_LEGACY_AI_LESSON_GENERATOR = false` em `staticCurriculumFlags.js` — nenhuma ação necessária
- Imports: nenhum import órfão crítico nos arquivos da cadeia principal
- E2E: 6 spec files organizados, sem arquivos temporários
- Progresso: estado pós-FIX-01…05 verificado — XP, streak, mastery, gate, persistência todos corretos

**B1 confirmado:**
- `advancedMaps.js` contém skeleton de B1 (B1_GRAMMAR_MAP, B1_VOCABULARY_MAP etc.) — planos de aula, sem conteúdo real
- Não há `/src/content/curriculum/levels/B1/` com aulas profundas
- Próximo bloco B1 documentado: `BLOCO-B1-GRAMMAR-001` — quando autorizado pelo usuário

**Documentação atualizada:**
- `MASTER-CONTINUIDADE-BLOCOS-CURSO-ATE-C1-C2.md` corrigido: branch `rewrite-fluency-clean-lab` → `main`; status atualizado; prompt fixo corrigido

**Build:** ✅ `npx vite build` — 2533 módulos sem erros  
**Sistema pronto para B1:** Sim (aguardar autorização explícita)  
**Pendência aberta:** PROB-016 (limiar mínimo 75% vs 80% nos gates) — decisão do usuário

---

## Estado atual importante

### Branch/main

- A antiga branch `claude/improve-english-system-hu6gz` foi usada como base final.
- A `main` agora deve conter o estado do sistema de aulas profundas, renderização por pilar, áudio Gemini corrigido e melhorias de fluxo.
- Qualquer continuação deve acontecer diretamente na `main`.

### Sistema de aulas

- `CourseScreen` abre a aula diária por `staticCourseLauncher.js`.
- A aula é salva em `lesson.current`.
- `LessonScreen.jsx` recupera a aula via `getCurrentLesson()` / `getCurrentLessonFull()`.
- O renderizador é escolhido por `FLOW_BY_PILLAR[pillar]`.
- Renderizadores oficiais:
  - `GrammarLessonFlow`
  - `VocabularyLessonFlow`
  - `ReadingLessonFlowV2`
  - `ListeningLessonFlow`
  - `SpeakingLessonFlow`
  - `WritingLessonFlow`

### Correções importantes já feitas

- `fallback-reading` removido do usuário final.
- Sem aula salva, `LessonScreen` mostra estado vazio claro.
- `flowErrors` das aulas alimentam revisão.
- `lessonFlowScore.js` centraliza scoring.
- `completeLesson()` salva XP, streak, lessonId, pillar, flowScore e flowErrors.
- `reviewFromErrors.js` lê erros vindos de `lessonCompletions.flowErrors`.
- `ChecklistField` não deve passar silenciosamente com lista vazia.
- `SpeakField` não deve marcar tentativa com uma única letra.
- `AudioListenField` e shadowing receberam melhorias de áudio.
- `staticLessonDisplayNormalizer.js` foi estendido para mais pilares.
- `lessonFlashcards.js` filtra melhor cards ruins/instruções em português.
- `lesson-flow.css` recebeu ajustes de safe-area para iPhone.

### Áudio Gemini

Correção aplicada:

- `geminiTts.js` agora usa chaves gerais de IA + chaves Flash de aulas + chave Pro de aulas.
- `geminiAudioService.js` tenta múltiplos modelos TTS.
- O navegador deve ser fallback final, não padrão.

Funções cobertas:

- Palavra do dia.
- Citação do dia.
- Ouvir palavra/frase em Cartas.
- Listening.
- Shadowing.
- Speaking model phrases.
- Botões “Ouvir Gemini” nas aulas profundas/estáticas.

---

## ✅ BLOCO REVIEW-POLISH-1 — Revisão adaptativa mais útil e clara (2026-05-17)

Polish da revisão adaptativa pós-aula: erros reais referenciados nos treinos, prompt IA melhorado, UI com seções estruturadas.

Arquivos alterados:
- `src/services/adaptiveReview/localAdaptiveReview.js` — `buildTargetedDrills` referencia exercício real do erro; 3 drills por grupo
- `src/services/aiTutorPolicy.js` — `formatErrorsForPrompt` formata erros como bullet legível; `adaptiveReviewLines` com estrutura Diagnóstico/Erros/Treino/Próxima aula
- `src/lessons/flow/phases/LessonCompletionCard.jsx` — `AdaptiveReviewPanel` reconstruído com seções "Foco principal", "Erros encontrados", "Treino rápido" / "Análise" (Gemini), badge Híbrido
- `src/lessons/flow/lesson-flow.css` — estilos `.lesson-review-panel`, `.lesson-review-section`, `.lesson-review-error-list`, `.lesson-review-drill-list`, `.lesson-review-ai-text`, ajustes 430px
- `src/lessons/flow/lesson-phase.css` — badge `.lesson-phase-ai-badge.hybrid`

Build: ✅ 2533 módulos, sem erros.

Documento completo: `fluency-clean/docs/BLOCO-REVIEW-POLISH-1-CONCLUIDO.md`

---

## ✅ BLOCO FLASHCARDS-QUALITY-1 — Qualidade dos Flashcards por Pilar + Playwright (2026-05-17)

Filtros de qualidade no extrator de flashcards e testes Playwright e2e com mock de aula.

Arquivos alterados:
- `src/services/lessonFlashcards.js` — `GENERIC_BACKS` Set, `hasUsefulContent()`, `isTooLongFront` com `opts.longFront`, `makeCard` rejeita verso genérico, `hasLessonFlashcards` exige ≥ 2 cards
- `e2e/flashcards.spec.js` — 3 testes: hero da aula injetada, botão flashcards, modo de estudo

Principais melhorias:
- Nenhum card gerado com verso genérico placeholder
- Speaking/Listening: `longFront: true` permite frases completas (≤ 70 chars / 12 palavras)
- `hasLessonFlashcards` requer ≥ 2 cards de qualidade (era > 0)
- Testes e2e cobrem iPhone 13 e iPhone SE — 20/20 passando

Build: ✅ 2533 módulos, sem erros.
Testes: ✅ 20/20 (14 smoke + 6 flashcards).

Documento completo: `fluency-clean/docs/BLOCO-FLASHCARDS-QUALITY-1-CONCLUIDO.md`

---

## ✅ BLOCO MASTERY-AUDIT-1 + MASTERY-GATE-1 — Auditoria e gate controlado (2026-05-17)

Auditoria completa do sistema de progresso/domínio + gate de recomendação automática por pilar.

Arquivos alterados/criados:
- `src/services/masteryGate.js` — +3 funções: `getMasteryGateStatus`, `canAdvanceToNextLevel`, `getNextRecommendedAction`
- `src/components/course/MasteryRecommendationPanel.jsx` — painel automático de domínio por pilar (novo)
- `src/screens/CourseScreen.jsx` — import + render do painel de recomendação
- `src/styles/course-screen.css` — CSS do painel de domínio
- `e2e/masteryGate.spec.js` — 4 testes e2e com mastery data injetada

Auditoria documentada em:
- `fluency-clean/docs/BLOCO-MASTERY-AUDIT-1-CONCLUIDO.md`

Gate documentado em:
- `fluency-clean/docs/BLOCO-MASTERY-GATE-1-CONCLUIDO.md`

Principais achados da auditoria:
- Duas métricas de domínio: `masteryStore.js` (score histórico) e `evaluateStaticLevelGate()` (completion+prática)
- Gate A1→A2 é manual (checkpoints + prova) — gate automático é apenas recomendação
- `evaluateStaticLessonGate()` existe mas não é enforced em `completeLesson()`
- Sistema estático e sistema IA são paralelos — sem colisão

Gate implementado:
- Modo recomendação (não bloqueio) para todos os níveis
- `MasteryRecommendationPanel` apenas aparece quando há dados (≥1 pillar com attempts > 0)
- Não bloqueia navegação nem botões principais
- 5 estados: `ready | needs_review | needs_more_lessons | needs_more_data | blocked_no_progress`

Build: ✅ 2533 módulos, sem erros.
Playwright: ✅ 28/28 (14 smoke + 6 flashcards + 8 masteryGate).

Confirmação:
```
Branch: main.
Sem branch nova.
Sem PR.
Sem merge.
Sem rebase.
Sem force push.
Não gerou aulas novas.
Não alterou conteúdo A1.
Não ativou Firebase/Azure/Gemini.
Gate inicial é recomendação/controlado.
```

---

## ✅ HOTFIX-MASTERY-NULL — Crash no CourseScreen: null guard em normalizeProfile (2026-05-17)

Crash iPhone ao clicar em aba "Curso": `null is not an object (evaluating 'e.recentErrors')`.

Causa: `storage.get()` retorna JS `null` quando localStorage armazena a string `"null"`. O parâmetro
default `= {}` em JavaScript não se aplica a `null` explícito — `null.recentErrors` lançava TypeError.

Arquivos alterados:
- `src/services/masteryStore.js` — `normalizeProfile`: retorna `emptyProfile()` se `value` não for objeto plain
- `src/services/a1MasteryGateService.js` — `normalizeState`: sanitiza `raw` para `{}` se vier nulo/inválido

Build: ✅ 2534 módulos, sem erros.
Playwright (aba Curso): ✅ 8/8.

---

## ✅ BLOCO SETTINGS-AI-KEYS-CLEANUP-1 — Limpeza de Chaves na Tela de Ajustes (2026-05-17)

Regra oficial: IA não gera aulas principais. Curso é fixo premium. "Chaves de aulas" foi removido
da UI; apenas "Chaves gerais de IA" (tutor, correção, speaking, revisão adaptativa) permanece.

Arquivos alterados:
- `src/screens/SettingsScreen.jsx` — removeu `LessonKeysPanel`, renomeou grupo, simplificou Card
- `src/components/settings/GeneralAiKeysPanel.jsx` — textos atualizados; aviso de sincronização futura adicionado
- `e2e/settings-ai-keys-mobile.spec.js` — 4 testes × 2 viewports = 8 instâncias (novo)
- `.gitignore` — adicionou `playwright-report/` e `test-results/`

O que permanece como legado (não ativo na UI):
- `src/components/settings/LessonKeysPanel.jsx` — arquivo mantido
- `src/services/lessonKeys.js` — usado internamente por `geminiTts.js` e `geminiAudioService.js`
- `src/services/externalLessonProviders.js` — legado

Build: ✅ 2534 módulos, sem erros.
Playwright: ✅ 36/36 (14 smoke + 6 flashcards + 8 masteryGate + 8 settings).

Confirmação:
```
Branch: main.
Sem branch nova.
Sem PR.
Não gerou aulas novas.
Não alterou conteúdo A1.
Não ativou Firebase/Azure/Gemini.
Não quebrou AI Tutor, Speaking ou Revisão adaptativa.
lessonKeys.js mantido como legado (não removido).
```

Documento completo: `fluency-clean/docs/BLOCO-SETTINGS-AI-KEYS-CLEANUP-1-CONCLUIDO.md`

---

## ✅ BLOCO FIGMA-UI-PREMIUM-POLISH-1 — Polimento visual premium app-wide (2026-05-17)

CSS-only polish em todas as abas. Novos tokens globais, melhor glass effect nos cards,
glow nos botões primários, navegação mais vibrante, mobile 430px otimizado.

Arquivos alterados:
- `src/styles/index.css` — adicionou 10 tokens ao `:root` (--amber, --teal, --pink, --indigo, --r-*, --shadow-*)
- `src/styles/screens.css` — adicionou import do `premium-polish.css`
- `src/styles/premium-polish.css` — novo (22 blocos de polish + @media 430px)
- `e2e/ui-premium-polish-mobile.spec.js` — 9 testes × 2 viewports = 18 instâncias (novo)

Melhorias principais:
- Cards: gradiente de fundo + inner top highlight
- Botão primário: sombra glow + inner shimmer
- Nav ativa: gradiente azul-violeta mais vibrante
- Progress bars: gradiente azul → violeta
- Eyebrow: `#7eb8ff` (mais contraste)
- Mobile 430px: cards 17px padding, botões 50px, h2 adaptativo

Build: ✅ 2534 módulos, sem erros.
Playwright: ✅ 54/54 (14 smoke + 6 flashcards + 8 masteryGate + 8 settings + 18 polish).

Confirmação:
```
Branch: main.
Sem branch nova.
Sem PR.
Não alterou lógica.
Não gerou aulas novas.
Não ativou Firebase/Azure/Gemini.
Apenas CSS.
```

Documento completo: `fluency-clean/docs/BLOCO-FIGMA-UI-PREMIUM-POLISH-1-CONCLUIDO.md`

---

## ✅ BLOCO FIGMA-POLISH-SAFE-1 — Tokens Figma-inspired aplicados (2026-05-17)

CSS-only. Figma MCP não disponível — tokens aplicados diretamente do prompt do usuário.

Tokens atualizados em `src/styles/index.css` `:root`:
- `--bg`: `#060d1f` → `#050913`
- `--panel`: `rgba(15,23,42,0.74)` → `rgba(12,20,40,0.84)`
- `--line`: `rgba(148,163,184,0.18)` → `rgba(34,48,79,0.85)` (stroke navy)
- `--muted`: `#9fb0c8` → `#A4AFCA`
- `--text`: `#e8eff8` → `#F5F7FF`
- `--blue`: `#5b9cf6` → `#68A8FF`
- `--violet`: `#a78bfa` → `#A27BFF`
- `--green`: `#34d399` → `#62DFA5`
- `--amber`: `#fbbf24` → `#F7C66B`
- Glows reduzidos: `--shadow-btn` e `--shadow-glow`

Body gradient: base atualizada para `#050913`; glows reduzidos de .22 → .14.
Input/textarea focus ring: rgba atualizada para novo azul (104,168,255).
`premium-polish.css`: todos os rgba do azul e violeta atualizados; glows reduzidos.

Build: ✅ 2533 módulos, sem erros.
Playwright: ✅ 54/54.

Confirmação:
```
Branch: main. Sem branch nova. Sem PR.
Não alterou lógica. Não gerou aulas novas.
Não ativou Firebase/Azure/Gemini. Apenas CSS.
```

Documento completo: `fluency-clean/docs/BLOCO-FIGMA-POLISH-SAFE-1-CONCLUIDO.md`

---

## ✅ BLOCO COMPLETION-UX-1 — Tela de conclusão, progresso e prática extra (2026-05-17)

Melhoria da experiência pós-conclusão de aula.

Arquivos alterados:
- `src/lessons/flow/LessonFlowShell.jsx` — captura `completionMeta` de `completeLesson()` e passa ao card
- `src/lessons/flow/phases/LessonCompletionCard.jsx` — confirmação "Progresso salvo", badge XP, CTA "Ir ao Curso"
- `src/screens/LessonScreen.jsx` — `isLessonCompleted` controla PracticeMount (locked/unlocked)
- `src/lessons/flow/lesson-flow.css` — estilos `.lesson-completion-saved` e `.lesson-completion-xp`
- `src/styles/lesson-polish.css` — estilos `.lesson-practice-pending-note` e `.lesson-practice-unlocked`

Arquivo criado:
- `docs/BLOCO-COMPLETION-UX-1-CONCLUIDO.md`

Comportamento novo:
- Card de conclusão mostra confirmação verde "Progresso salvo" + badge "+25 XP" na primeira vez
- Card mostra "Aula já concluída anteriormente" em revisitas (sem XP extra)
- CTA "Ir ao Curso" aparece quando não há erros
- PracticeMount bloqueada (banner discreto) até conclusão; liberada com título em verde após conclusão
- `PracticeLauncher` não renderizado antes da conclusão da aula

Build: ✅ 2533 módulos, sem erros.

Confirmação:
```
Branch: main
Sem branch nova.
Sem PR.
Sem merge.
Sem rebase.
Sem force push.
Sem alteração em completeLesson/progressStore internamente.
Sem alteração em Azure/Gemini/Firebase/secrets.
Sem reescrita de PracticeLauncher.
```

Próxima pendência: REVIEW-POLISH-1

---

## ✅ BLOCO FLOW-STABILITY-1 — Stepper bloqueado + persistência mid-lesson (2026-05-17)

Melhoria de estabilidade do fluxo de fases da aula.

Arquivos alterados:
- `src/lessons/flow/lessonFlowProgress.js` — nova função `canAccessPhaseIndex`
- `src/lessons/flow/useLessonFlowState.js` — `goTo` corrigido; `canGoToIndex` exposto
- `src/lessons/flow/LessonPhaseStepper.jsx` — acesso por fase com `canGoToIndex`; ícone Lock; `aria-disabled`
- `src/lessons/flow/LessonFlowShell.jsx` — passa `canGoToIndex` ao stepper

Arquivo criado:
- `docs/BLOCO-FLOW-STABILITY-1-STEPPER-DRAFT-CONCLUIDO.md`

Comportamento novo:
- Não é mais possível pular fase obrigatória intermediária via stepper ou `goTo`
- Voltar para etapas já visitadas: sempre permitido
- Fases bloqueadas: ícone de cadeado + `aria-disabled` + mensagem no footer ao clicar
- Persistência mid-lesson: draft já funcionava (24h TTL); confirmado correto
- `completed` não é resetado por navegação (já correto desde hotfix)
- Draft limpo somente após conclusão confirmada (já correto desde hotfix)

Build: ✅ 2533 módulos, sem erros.

Confirmação:
```
Branch: main
Sem branch nova.
Sem PR.
Sem merge.
Sem rebase.
Sem force push.
Sem alteração em progressStore/completeLesson.
Sem alteração em Azure/Gemini/Firebase/secrets.
Sem alteração em IA Tutor, adaptiveReview ou mastery.
```

Próxima pendência: COMPLETION-UX-1

---

## ✅ BLOCO UX-POLISH-1 — iPhone Lesson Flow Polish (2026-05-17)

Polimento visual e mobile da aba Aula para iPhone (~390–430px). Foco exclusivo em CSS.

Arquivos alterados:
- `src/lessons/flow/lesson-flow.css` — bloco `@media (max-width: 430px)` adicionado
- `src/lessons/flow/lesson-phase.css` — cores de contraste corrigidas; 430px expandido
- `src/styles/lesson-polish.css` — bloco 430px para hero da aula
- `src/styles/deep-lesson-mobile.css` — separador visual do PracticeMount

Arquivo criado:
- `docs/BLOCO-UX-POLISH-1-IPHONE-LESSON-FLOW-CONCLUIDO.md`

Principais melhorias:
- Hero compacto no iPhone (padding 14px, h1 ≤ 26px, generation-proof menor)
- FocusHeader com h1 reduzido (`clamp(24px, 7vw, 30px)`)
- Stepper com padding lateral — chips não cortados lateralmente
- PhaseCard h2 ≤ 26px; padding 13px
- Contraste melhorado: word-count, speak-hint e footnote de `#4–5a5a7a` → `#6275a0`
- CompletionCard mais compacto (ícone 54px, stats 22px, padding 20px 16px)
- ActionFooter: botões 46px, hint 12px
- PracticeMount com separação visual e safe-area inferior

Build: ✅ 2533 módulos, sem erros.

Confirmação:
```
Branch: main
Sem branch nova.
Sem PR.
Sem merge.
Sem rebase.
Sem force push.
Sem alteração em progressStore/completeLesson.
Sem alteração em Azure/Gemini/Firebase/secrets.
Sem alteração em lógica de fases, ordem ou mastery.
```

Próximas pendências:
- FLOW-STABILITY-1 — bloqueio de navegação para fase futura obrigatória
- COMPLETION-UX-1 — desbloqueio/bloqueio visual de PracticeMount pós-conclusão
- ~~REVIEW-POLISH-1~~ ✅ concluído
- ~~FLASHCARDS-QUALITY-1~~ ✅ concluído
- MASTERY-GATE-1 — integração real do mastery gate A1→A2

---

## Pendências principais

1. **LessonPhaseStepper**
   - Fases obrigatórias futuras ainda podem ser clicáveis se o aluno tentar pular.
   - Regra desejada: pode voltar, mas não pode avançar para fase obrigatória futura sem concluir obrigatórias anteriores.

2. **Persistência mid-lesson**
   - Refresh ainda pode reiniciar progresso local da aula.
   - Salvar `activeIndex` e `attempts` por `lessonId` no localStorage.

3. **Mastery Gate real**
   - Verificar integração real A1 → A2.
   - Evitar avanço sem domínio mínimo por pilar.

4. **TAG_RULES / revisão inteligente**
   - Ampliar `reviewFromErrors.js` para cobrir mais erros de speaking, vocabulary e writing.

5. **Speaking/Writing com IA Tutor — parcialmente concluído**
   - Writing: IA Tutor integrado em `AttemptField` (multiline) — BLOCO IA-2 concluído.
   - Speaking (aulas guiadas): IA Tutor integrado em `SpeakField` — BLOCO IA-3 concluído.
   - Speaking (tela livre): `SpeakingScreen.jsx` ainda sem IA Tutor — pendência BLOCO IA-3B.
   - Não ativar chamadas reais sem autorização.

6. **Flashcards da aula**
   - Melhorar cards de grammar, writing, speaking e listening sem gerar cards genéricos/lixo.

7. **iPhone polish**
   - Garantir que textarea/input focado não fique escondido pelo footer/menu inferior.
   - Garantir que player de áudio, botões e tabs tenham área confortável.

---

## Como continuar em outro chat

Use este prompt base:

```txt
Continue o trabalho no repositório Belacatalogo/Ingles.

Branch obrigatória atual:
main

Antes de qualquer alteração, leia REWRITE_HANDOFF.md.

Regras obrigatórias:
- trabalhar diretamente na main;
- não criar branch;
- não abrir PR;
- não fazer merge;
- não fazer rebase;
- não fazer force push;
- não voltar para lab, rewrite-fluency-clean-lab ou claude/improve-english-system-hu6gz;
- não mexer no backup backup-main-before-improve-english-system-2026-05-16;
- não usar DOM injection;
- não criar bundle patch;
- não fazer HTML gigante/remendado;
- manter tudo modular;
- não ativar Firebase/Azure/Gemini real sem autorização explícita;
- não colocar secrets no frontend.

Foco atual:
curso fixo premium A1 → C2, renderização profunda por pilar, prática profunda complementar derivada da aula fixa, IA apenas como tutora/corretora/revisora adaptativa.
```

---

## Checklist obrigatório ao finalizar qualquer bloco

Ao final de qualquer bloco, atualizar este handoff com:

- o que foi feito;
- arquivos alterados;
- build/check executados;
- pendências;
- confirmação de que permaneceu na `main`;
- confirmação de que não criou branch, PR, merge, rebase ou force push.

Confirmação esperada:

```txt
Branch: main
Sem branch nova.
Sem PR.
Sem merge.
Sem rebase.
Sem force push.
Backup da main antiga preservado.
```

---

## ✅ BLOCO IA-2 — Writing AI integração completa (2026-05-17)

Commit: `6662a06`

Integração completa do IA Tutor na escrita das aulas profundas:

- Prop `lesson` adicionada ao pipeline `LessonFlowShell → LessonPhaseCard → Body → AttemptField`.
- Todos os 5 pilares com `AttemptBody`/`DraftBody` atualizados para repassar `lesson`.
- `extractCorrectedText()` adicionado ao `studentAnswerAnalysisService.js` — extrai versão corrigida do texto livre da IA via regex.
- UI do painel de análise melhorada:
  - Badge source (Local cinza / Gemini violeta).
  - Card `correctedText` (verde) quando disponível.
  - Lista `issues` (âmbar) em bullets.
  - `nextDrill` com ícone Lightbulb.
  - Botão "Nova análise".

Arquivos alterados:
- `src/lessons/flow/LessonFlowShell.jsx`
- `src/lessons/flow/LessonPhaseCard.jsx`
- `src/lessons/flow/grammar/GrammarLessonFlow.jsx`
- `src/lessons/flow/vocabulary/VocabularyLessonFlow.jsx`
- `src/lessons/flow/reading/ReadingLessonFlowV2.jsx`
- `src/lessons/flow/listening/ListeningLessonFlow.jsx`
- `src/lessons/flow/writing/WritingLessonFlow.jsx`
- `src/services/studentAnswerAnalysis/studentAnswerAnalysisService.js`
- `src/lessons/flow/phases/AttemptField.jsx`
- `src/lessons/flow/lesson-phase.css`

Build: ✅ 2528 módulos, sem erros.

---

## ✅ BLOCO IA-3 — Speaking AI Tutor em SpeakField (2026-05-17)

Commit: `57e0a3e`

IA Tutor conectado ao `SpeakField` das aulas guiadas de Speaking:

- `evaluateSpeakingWithTutor()` adicionado a `aiTutorService.js`.
- Camada de IA para `pillar: 'speaking'` adicionada a `studentAnswerAnalysisService.js`.
- Prop `lesson` repassada via `SpeakingLessonFlow.SpeakBody → SpeakField`.
- Botão "Analisar com IA" em `SpeakField` após tentativa registrada.
- Painel de análise: badge Local/Gemini, score, feedbackPt, issues, nextDrill, "Nova análise".
- Fallback local garantido quando Gemini falha ou não há chave.
- Nenhum bloqueio de avanço — análise é opcional.

Limitações conhecidas:
- `azureResult` não está disponível em `SpeakField` (SpeakExercise não o expõe). Quando o aluno usa voz, `studentText` chega vazio à IA.
- `SpeakingScreen.jsx` (tela de prática livre) não foi alterado — pendência IA-3B.

Arquivos alterados:
- `src/services/aiTutorService.js`
- `src/services/studentAnswerAnalysis/studentAnswerAnalysisService.js`
- `src/lessons/flow/speaking/SpeakingLessonFlow.jsx`
- `src/lessons/flow/phases/SpeakField.jsx`

Documento completo: `fluency-clean/docs/BLOCO-IA-3-SPEAKING-AI-TUTOR-CONCLUIDO.md`

Build: ✅ 2528 módulos, sem erros.

---

## ✅ BLOCO IA-3B — SpeakingScreen híbrido Azure + IA Tutor (2026-05-17)

IA Tutor conectada à tela `SpeakingScreen.jsx` de forma híbrida com Azure.

Arquivos alterados:
- `src/services/aiTutorPolicy.js` — `buildAiTutorContext` e `buildAiTutorPrompt` aceitam `referenceText`, `prompt`, `mode`, `azureScores`; prompt de speaking enriquecido com scores Azure
- `src/services/aiTutorService.js` — `askAiTutor` e `evaluateSpeakingWithTutor` repassam todos os novos parâmetros; variável local renomeada de `prompt` para `tutorPrompt`
- `src/services/studentAnswerAnalysis/studentAnswerAnalysisService.js` — extração de `azureScores` de `azureResult`; `source: 'hybrid'` quando Azure + Gemini
- `src/screens/SpeakingScreen.jsx` — novo componente `SpeakingAiPanel`; 4 novos estados; integração não-bloqueante em `appendFreeSpeechAnalysis` e `handlePronunciationRecord.onAutoStop`; painel inserido em conversa, pronúncia e imersão

Comportamento:
- Azure continua inalterado para transcrição e análise de pronúncia.
- Após Azure, `analyzeStudentAnswer` dispara em background com `azureResult` + `recognizedText`.
- Gemini recebe azureScores, palavras fracas, frase de referência e prompt.
- Fallback local garantido quando Gemini falha ou não há chave.
- Gravação, histórico e conclusão de sessão não bloqueados.
- Badge mostra: Híbrido (Azure+Gemini), Gemini, ou Local.

Build: ✅ 2528 módulos, sem erros.
Documento completo: `fluency-clean/docs/BLOCO-IA-3B-SPEAKINGSCREEN-HYBRID-CONCLUIDO.md`

---

## ✅ BLOCO IA-4 — Reading/Listening AI feedback em respostas abertas (2026-05-17)

IA Tutor conectado às fases de resposta aberta de Reading e Listening.

Descoberta-chave: o botão "Analisar com IA" já existia (implementado em IA-2 via `AttemptField` multiline), mas roteava como `pillar: 'writing'` (hardcoded) e o serviço não tinha camada de IA para reading/listening.

Correções aplicadas:
- `pillar` estava hardcoded como `'writing'` em `handleAiAnalyze` — corrigido para usar a prop `pillar`.
- Prop `pillar = 'writing'` adicionada a `AttemptField` (default preserva todos os callers existentes).
- Campo `prompt` (pergunta da questão) agora enviado para `analyzeStudentAnswer`.
- Camadas de IA para `pillar: 'reading'` e `pillar: 'listening'` adicionadas ao serviço.
- `evaluateReadingWithTutor` usa `lesson.mainText` como base de avaliação.
- `evaluateListeningWithTutor` usa `lesson.transcript` como base de avaliação.
- Transcript não exposto antes da tentativa — botão só aparece após `attempted === true`.
- Fallback local garantido quando Gemini falha ou não há chave.

Arquivos alterados:
- `src/services/aiTutorPolicy.js` — 2 novas actions (`evaluateReadingAnswer`, `evaluateListeningAnswer`), labels e blocos de prompt
- `src/services/aiTutorService.js` — `evaluateReadingWithTutor()`, `evaluateListeningWithTutor()`
- `src/services/studentAnswerAnalysis/studentAnswerAnalysisService.js` — camadas de IA para reading e listening, import atualizado
- `src/lessons/flow/phases/AttemptField.jsx` — prop `pillar`, `handleAiAnalyze` corrigido, `prompt` enviado
- `src/lessons/flow/reading/ReadingLessonFlowV2.jsx` — `pillar="reading"` em `AttemptBody`
- `src/lessons/flow/listening/ListeningLessonFlow.jsx` — `pillar="listening"` em `AttemptBody`
- `fluency-clean/docs/BLOCO-IA-4-READING-LISTENING-AI-CONCLUIDO.md` — documentação completa

Build: ✅ 2528 módulos, sem erros.
Documento completo: `fluency-clean/docs/BLOCO-IA-4-READING-LISTENING-AI-CONCLUIDO.md`

Confirmação:
```
Branch: main
Sem branch nova.
Sem PR.
Sem merge.
Sem rebase.
Sem force push.
Transcript não exposto antes da tentativa.
Gabarito não revelado antes da tentativa.
Fallback local garantido.
```

---

## HOTFIX — Conclusão de aula pós IA-5/IA-6 (2026-05-17)

Bug: No iPhone, após concluir a aula, a UI parecia voltar ao começo e não registrar a conclusão.
Causa 1: `goTo()` chamava `setCompleted(false)` — clicar no stepper após conclusão resetava o card de conclusão.
Causa 2: `LessonCompletionCard` era renderizado abaixo da última fase, fora da viewport no mobile.
Causa 3: `WritingLessonFlow` tinha fase passiva "Preparação para feedback" como última etapa.

Fixes:
- `useLessonFlowState.js`: `goTo` não reseta mais `completed`; nova função `restart()` explícita; `percent = 100` quando completed
- `LessonFlowShell.jsx`: exibição exclusiva (completion card substitui stepper+fase); scroll automático ao completar; `stableLessonId`; logging em handleComplete
- `WritingLessonFlow.jsx`: `writing-feedback-prep` removido do flow

Arquivos: `useLessonFlowState.js`, `LessonFlowShell.jsx`, `WritingLessonFlow.jsx`
Documento: `fluency-clean/docs/HOTFIX-IA-5-6-LESSON-COMPLETION-FEEDBACK-FLOW.md`
Build: ✅ 2533 módulos, sem erros.

---

## ✅ BLOCO IA-5 — Revisão adaptativa real com erros do aluno (2026-05-17)

Serviço modular de revisão adaptativa baseado em erros reais das aulas.

Arquivos criados:
- `src/services/adaptiveReview/adaptiveReviewTypes.js` — constantes ADAPTIVE_REVIEW_STATUS, ADAPTIVE_REVIEW_SOURCE, ADAPTIVE_REVIEW_STORAGE_KEY
- `src/services/adaptiveReview/localAdaptiveReview.js` — `buildLocalAdaptiveReview()`: fallback local por pillar (grammar/writing/reading/listening/speaking/vocabulary)
- `src/services/adaptiveReview/adaptiveReviewService.js` — `buildAdaptiveReview()`: orquestra local + cache + Gemini
- `src/services/adaptiveReview/index.js` — re-exports

Arquivos alterados:
- `src/services/aiTutorPolicy.js` — prompt block para `adaptiveReview` action (estruturado, max 250 palavras, 3 micro-exercícios)
- `src/services/aiTutorService.js` — `buildAdaptiveReviewWithTutor({ lesson, errors, level, fetcher })`
- `src/lessons/flow/phases/LessonCompletionCard.jsx` — componente interno `AdaptiveReviewPanel` com botão "Revisão adaptativa da aula"
- `src/lessons/flow/lesson-flow.css` — `.lesson-completion-adaptive` e `.lesson-completion-adaptive-btn`

Comportamento:
- Botão "Revisão adaptativa da aula" aparece ao final de toda aula no LessonCompletionCard.
- `flowErrors` extraídos de `extractFlowErrors(phases, attempts, lesson)` — erros reais da sessão.
- Local: agrupa por pillar, cria microDrills de banco fixo, retorna imediatamente.
- IA: usa `adaptiveReview` action com erros serializados como contexto — max 250 palavras.
- Cache: `fluency.clean.adaptive-reviews:v1` por `lessonId-data`.
- Sem bloqueio de conclusão de aula. Sem secrets expostos. Fallback local garantido.

Build: ✅ 2533 módulos, sem erros.
Documento completo: `fluency-clean/docs/BLOCO-IA-5-ADAPTIVE-REVIEW-CONCLUIDO.md`

---

## ✅ BLOCO IA-6 — UI unificada de feedback de IA (2026-05-17)

Componente único `StudentAnswerFeedbackCard` substitui painel duplicado em 3 locais.

Arquivo criado:
- `src/components/ai/StudentAnswerFeedbackCard.jsx` — props: `result`, `loading`, `title`, `onRetry`, `compact`

Props suportadas no result:
- `status`, `source`, `score`, `feedbackPt`, `correctedText`, `issues`, `strengths`, `nextDrill`

Locais substituídos:
- `src/lessons/flow/phases/AttemptField.jsx` — inline `aiAnalysisNode` substituído
- `src/lessons/flow/phases/SpeakField.jsx` — inline `aiAnalysisNode` substituído; imports `Lightbulb`/`RotateCcw` removidos
- `src/screens/SpeakingScreen.jsx` — `SpeakingAiPanel` reduzido a 1-line wrapper de `StudentAnswerFeedbackCard`

CSS: reutiliza `lesson-phase.css` existente. Nenhum arquivo CSS novo criado.
Badge automático: `Local` / `Gemini` / `Híbrido` baseado em `result.source`.

Build: ✅ 2533 módulos, sem erros.
Documento completo: `fluency-clean/docs/BLOCO-IA-6-STUDENT-FEEDBACK-UI-CONCLUIDO.md`

---

## Blocos IA — estado final

- `BLOCO IA-1` — ✅ Student Answer Analysis Service
- `BLOCO IA-2` — ✅ Writing integração completa
- `BLOCO IA-3` — ✅ Speaking AI Tutor em SpeakField
- `BLOCO IA-3B` — ✅ SpeakingScreen híbrido Azure + IA Tutor
- `BLOCO IA-4` — ✅ Reading/Listening respostas abertas
- `BLOCO IA-5` — ✅ Revisão adaptativa real com flowErrors (concluído — 2026-05-17)
- `BLOCO IA-6` — ✅ StudentAnswerFeedbackCard componente unificado (concluído — 2026-05-17)

Pendências reais restantes (não são blocos de IA):
- Melhorar qualidade dos prompts de revisão adaptativa com mais contexto de nível.
- Conectar Firebase real futuramente com autorização explícita.
- Melhorar analytics/mastery gate A1→A2.
- Testar UX real em iPhone (safe-area, textarea oculto).
- Ampliar TAG_RULES em reviewFromErrors.js para cobrir erros de speaking e writing.

---

## ✅ BLOCO IA-1 — Student Answer Analysis Service (2026-05-17)

Camada central de análise de respostas do aluno implementada em:

```
src/services/studentAnswerAnalysis/
  studentAnswerAnalysisTypes.js   — constantes e contrato de saída
  localAnswerRubrics.js           — avaliadores locais por pilar
  studentAnswerAnalysisService.js — função principal analyzeStudentAnswer()
  index.js                        — re-exports
```

Regras respeitadas:
- Fallback local garantido mesmo sem chave de IA.
- IA (Gemini) é camada opcional via `allowAi: true`.
- Não substitui o curso fixo.
- Não gera aula.
- Usa `correctWritingWithTutor()` do `aiTutorService.js` quando allowAi=true.
- Resposta do serviço sempre segue o contrato `AnalysisResult`.

Integração mínima: botão **"Analisar com IA"** adicionado em `AttemptField.jsx` somente para campos `multiline` (writing), após tentativa registrada.

Blocos de IA subsequentes:
- `BLOCO IA-2` — ✅ Writing integração completa (concluído — commit 6662a06)
- `BLOCO IA-3` — ✅ Speaking híbrido em SpeakField (concluído — commit 57e0a3e)
- `BLOCO IA-3B` — ✅ SpeakingScreen híbrido Azure + IA Tutor (concluído)
- `BLOCO IA-4` — ✅ Reading/Listening respostas abertas (concluído)
- `BLOCO IA-5` — ✅ Revisão adaptativa real com flowErrors (concluído)
- `BLOCO IA-6` — ✅ StudentAnswerFeedbackCard componente unificado (concluído)

Documento completo: `fluency-clean/docs/BLOCO-IA-1-STUDENT-ANSWER-ANALYSIS-CONCLUIDO.md`
Plano original: `fluency-clean/docs/PLANO-IA-ANALISE-RESPOSTAS-UTIL-LAB.md`

---

## HOTFIX CRÍTICO — Persistência de conclusão de aula (2026-05-17)

Bug: iPhone mostra "Aula concluída!" com 100%, mas ao sair e voltar o progresso não está salvo.

Causas:
1. `registerReadingVocabularyMistakes` e `recordLessonMastery` eram chamados **antes** de `storage.set()` em `completeLesson()`. Se qualquer um lançasse exceção, o save principal nunca executava.
2. Em `useLessonFlowState.next()`, `setCompleted(true)` e `clearDraft()` disparavam **antes** de `onComplete()` ser chamado — a UI mostrava conclusão mesmo quando o save falhava em seguida.
3. `stableLessonId` no shell e `getCompletionId` no progressStore geravam IDs diferentes para aulas sem `id` direto — `isLessonCompleted` não encontrava o dado salvo.

Fixes:
- `progressStore.js`: `getCompletionId` unificado com fallback de 5 campos; helpers em try/catch isolados; `storage.set` executa **primeiro**; operações secundárias isoladas; retorna `{ ..., saved, verified }`.
- `useLessonFlowState.js`: `next()` passa `onSaveSuccess` e `onSaveError` para o shell em vez de chamar `setCompleted`/`clearDraft` diretamente.
- `LessonFlowShell.jsx`: `handleComplete` desestrutura `onSaveSuccess`/`onSaveError`; verifica `result.saved`; chama `onSaveError` se save falhou (card de conclusão NÃO aparece); `stableLessonId` sincronizado com `getCompletionId`.

Arquivos alterados:
- `src/services/progressStore.js`
- `src/lessons/flow/useLessonFlowState.js`
- `src/lessons/flow/LessonFlowShell.jsx`

Documento: `fluency-clean/docs/HOTFIX-LESSON-COMPLETION-PERSISTENCE.md`
Build: ✅ 2533 módulos, sem erros.

Confirmação:
```
Branch: main
Sem branch nova.
Sem PR.
Sem merge.
Sem rebase.
Sem force push.
Conclusão de aula sempre persistida antes de mostrar card de conclusão.
Falha de storage visível para o aluno (mensagem de erro no footer).
```

---

## ✅ BLOCO 20A — B1.0 Plano e Arquitetura do B1 Profundo (2026-05-17)

Arquitetura completa do currículo B1 criada antes de qualquer aula.

Arquivos criados:
- `fluency-clean/src/content/curriculum/b1Map.js` — mapa completo do B1 com 8 pacotes e 6 pilares
- `fluency-clean/src/content/curriculum/levels/B1/` — diretório criado para aulas profundas
- `fluency-clean/docs/BLOCO-20A-B1-0-PLANO-ARQUITETURA-CONCLUIDO.md`

Estrutura B1:
- 8 pacotes: bridge, pastExperiences, opinions, problems, workStudy, travel, media, reviewsCheckpoints
- Grammar: 26 | Vocabulary: 22 | Reading: 20 | Listening: 18 | Speaking: 19 | Writing: 18
- **Total planejado: 123 aulas**
- B1 NÃO conectado como ready ainda — apenas mapa arquitetural

Próximo bloco obrigatório:
- BLOCO 20B — B1.1 Bridge from A2 — Parte 1 (4-6 primeiras aulas profundas)

Confirmação:
```
Branch: main
Sem branch nova.
Sem PR.
Sem merge.
Sem rebase.
Sem force push.
Não conectou B1 como ready.
Não criou aulas completas.
Apenas arquitetura e mapa.
```

---

## ✅ BLOCO 20B — B1.1 Bridge from A2 — Parte 1 (2026-05-17)

Primeiras 5 aulas profundas do B1 criadas e conectadas ao currículo.

Arquivo criado:
- `fluency-clean/src/content/curriculum/levels/B1/deepB1BridgePart1.js`

Arquivo alterado:
- `fluency-clean/src/content/curriculum/staticLessonContent.js`

Aulas criadas:
- `B1-GRAMMAR-001` — A2 repair and B1 fluency bridge (because, so, but, although — resposta conectada)
- `B1-VOCABULARY-001` — Life events and milestones (verbos específicos, preposições, erros comuns)
- `B1-READING-001` — A personal letter: bridging A2 and B1 (texto 250 palavras, evidência, inferência)
- `B1-LISTENING-001` — A longer weekend conversation (15+ linhas, sequência, shadowing, dictation)
- `B1-SPEAKING-001` — Talk about a past experience with more detail (modelo A2→B1, gravação 60-90s)

B1 conectado como READY: 5 aulas em `STATIC_READY_LESSONS_BY_LEVEL.B1`.

Build: ✅ 2533+ módulos, sem erros.

Próximo bloco obrigatório:
- BLOCO 20C — Validar B1.1 Bridge from A2 — Parte 1

Confirmação:
```
Branch: main
Sem branch nova.
Sem PR.
Sem merge.
Sem rebase.
Sem force push.
5 aulas B1 criadas com padrão profundo premium.
B1 conectado ao currículo com mergeB1PillarLessons.
```

---

## ✅ BLOCO 20C — Validação B1.1 Bridge Parte 1 (2026-05-17)

Validação pedagógica e estrutural aprovada.

Resultado: ✅ APROVADO — todos os checks passaram
- IDs únicos, level B1, status ready, pillar válido
- teacherOpening, whyItMatters, lessonRecap, nextLessonBridge em todas
- Grammar: grammarTable, commonBrazilianMistakes, productionTasks
- Vocabulary: 17 palavras, 5 chunks
- Reading: texto 250+ palavras, 5 perguntas com evidência + inferência
- Listening: transcript 15+ linhas, comprehension, shadowing, dictation
- Speaking: modelo A2→B1, substitutionDrills, recordingTask

Documento: `fluency-clean/docs/BLOCO-20C-VALIDACAO-B1-1-BRIDGE-PARTE-1-CONCLUIDO.md`

Próximo bloco:
- BLOCO 20D — B1.1 Bridge from A2 — Parte 2 (4-6 aulas: Grammar-002, Vocabulary-002, Writing-001, +)

---

## ✅ BLOCO 20D — B1.1 Bridge Parte 2 (2026-05-17)

4 novas aulas profundas criadas. B1 agora tem 9 aulas no currículo.

Arquivo criado:
- `fluency-clean/src/content/curriculum/levels/B1/deepB1BridgePart2.js`

Aulas:
- `B1-GRAMMAR-002` — Relative clauses + comment clauses ("which was", "which I found")
- `B1-VOCABULARY-002` — Feelings, attitudes and reactions (16 adjetivos B1 + compostos)
- `B1-VOCABULARY-003` — Discourse chunks (14 expresões: Having said that, On the other hand...)
- `B1-WRITING-001` — Parágrafo conectado 80-100 palavras (modelo + breakdown + rascunho + revisão)

Build: ✅ 2533+ módulos.

Próximo: BLOCO 20E — Validação B1.1 Parte 2

---

## ✅ BLOCO 20E — Validação B1.1 Bridge Parte 2 (2026-05-17)

✅ APROVADO. B1.1 completo com 9 aulas profundas premium.

| Pilar | Aulas |
|---|---|
| Grammar | 2 |
| Vocabulary | 3 |
| Reading | 1 |
| Listening | 1 |
| Speaking | 1 |
| Writing | 1 |
| **Total** | **9** |

Próximo: BLOCO 21A — B1.2 Past experiences and storytelling — Parte 1

---

## ✅ BLOCO 21A — B1.2 Past Experiences — Parte 1 (2026-05-17)

Arquivo criado: `fluency-clean/src/content/curriculum/levels/B1/deepB1PastExperiencesPart1.js`
Arquivo alterado: `fluency-clean/src/content/curriculum/staticLessonContent.js`

Aulas criadas:
- `B1-GRAMMAR-003` — Past Continuous (was/were+-ing, background, when/while)
- `B1-GRAMMAR-004` — Past Simple vs Past Continuous (timeline, interrupted action)
- `B1-READING-002` — A longer personal experience story (~400 palavras, "The day I got lost in Tokyo")
- `B1-SPEAKING-002` — Tell a story with sequence and background (90-120s recording)

Total B1 após este bloco: **13 aulas**
Build: ✅ 2536 módulos, sem erros.

Confirmação:
```
Branch: main. Sem branch nova. Sem PR. Sem merge. Sem rebase. Sem force push.
```

Documento: `fluency-clean/docs/BLOCO-21A-B1-2-PAST-EXPERIENCES-PARTE-1-CONCLUIDO.md`

Próximo: BLOCO 21B — Validação B1.2 Past Experiences Parte 1

---

## ✅ BLOCO 21B — Validação B1.2 Past Experiences Parte 1 (2026-05-17)

✅ APROVADO. 4 lições: B1-GRAMMAR-003, B1-GRAMMAR-004, B1-READING-002, B1-SPEAKING-002.

Fix: Speaking-002 usava campos fora do schema. Remapeado para modelPhrases, guidedSpeaking, recordingTasks, speakingChecklist, freeSpeaking, speakingSituation.

Build: ✅ 2536 módulos. Total B1: 13 aulas.

Documento: `fluency-clean/docs/BLOCO-21B-VALIDACAO-B1-2-PAST-EXPERIENCES-PARTE-1-CONCLUIDO.md`

Próximo: BLOCO 21C — B1.2 Past Experiences Parte 2 (Vocabulary-004, Vocabulary-005, Listening-002, Writing-002)

---

## ✅ BLOCO 21C — B1.2 Past Experiences Parte 2 (2026-05-17)

Arquivo criado: `fluency-clean/src/content/curriculum/levels/B1/deepB1PastExperiencesPart2.js`
Arquivo alterado: `fluency-clean/src/content/curriculum/staticLessonContent.js`

Aulas criadas:
- `B1-VOCABULARY-004` — Narrative vocabulary (at first, gradually, it turned out, believe it or not, 16 words)
- `B1-VOCABULARY-005` — Talking about the past: used to, would, back then (14 words)
- `B1-LISTENING-002` — Personal story: Maya's confidence journey in London (276w transcript, 5 q, 3 shadowing)
- `B1-WRITING-002` — Short personal narrative 120-150 words (model, breakdown, checklist)

Fix: campos não-schema remapeados para dangerousConfusions, miniDialogues, shadowing, vocabulary, oralProduction.

Total B1 após este bloco: **17 aulas**. Build: ✅ 2537+ módulos.

Confirmação:
```
Branch: main. Sem branch nova. Sem PR. Sem merge. Sem rebase. Sem force push.
Audit FIX-01 a FIX-06 preservados (merge automático limpo).
```

Documento: `fluency-clean/docs/BLOCO-21C-B1-2-PAST-EXPERIENCES-PARTE-2-CONCLUIDO.md`

---

## ✅ BLOCO 21D — Validação B1.2 Past Experiences Parte 2 (2026-05-17)

✅ APROVADO. 4 lições: B1-VOCABULARY-004, B1-VOCABULARY-005, B1-LISTENING-002, B1-WRITING-002.

Total B1: **17 aulas**. Build: ✅ 2537+ módulos.

Documento: `fluency-clean/docs/BLOCO-21D-VALIDACAO-B1-2-PAST-EXPERIENCES-PARTE-2-CONCLUIDO.md`

Próximo: BLOCO 22A — B1.3 Opinions and Discussion — Parte 1

---

## ✅ BLOCO 22A — B1.3 Opinions Part 1 (2026-05-17)

Arquivo criado: `fluency-clean/src/content/curriculum/levels/B1/deepB1OpinionsPart1.js`
Arquivo alterado: `fluency-clean/src/content/curriculum/staticLessonContent.js`

Aulas criadas:
- `B1-GRAMMAR-005` — First Conditional (if + present simple / will)
- `B1-GRAMMAR-006` — Zero vs First Conditional (facts vs possibilities)
- `B1-GRAMMAR-007` — Expressing opinions phrases (I think, I believe, In my view, grades)
- `B1-VOCABULARY-006` — Opinion/discussion vocabulary (16 words, debate chunks)
- `B1-SPEAKING-003` — Express and defend an opinion (90-120s recording)

Total B1: **22 aulas**. Build: ✅ 2537+ módulos.

Documento: `fluency-clean/docs/BLOCO-22A-B1-3-OPINIONS-PARTE-1-CONCLUIDO.md`

## ✅ BLOCO 22B — Validação B1.3 Opinions Part 1 (2026-05-17)

✅ APROVADO. 5 lições: Grammar-005, 006, 007, Vocabulary-006, Speaking-003.

Próximo: BLOCO 22C — B1.3 Opinions Part 2 (Linkers, Reading, Listening, Writing)

## ✅ BLOCO 22C — B1.3 Opinions Part 2 (2026-05-17)

✅ APROVADO. 4 lições: Grammar-008, Reading-003, Listening-003, Writing-003. Build verde.

Arquivo: `fluency-clean/src/content/curriculum/levels/B1/deepB1OpinionsPart2.js`

B1 agora tem 26 aulas: grammar(8), vocabulary(6), reading(3), listening(3), speaking(3), writing(3).

## ✅ BLOCO 22D — Validação B1.3 Opinions Part 2 (2026-05-17)

✅ APROVADO. Sem duplicatas. Build verde. 4 aulas profundas confirmadas.

Próximo: BLOCO 23A — B1.4 Problems, Advice and Decisions — Parte 1
- B1-GRAMMAR-009: Second Conditional
- B1-GRAMMAR-010: Modal verbs for advice (should, ought to, had better)
- B1-VOCABULARY-007: Problem and solution vocabulary
- B1-SPEAKING-004: Describe a problem and ask for advice
- B1-WRITING-004: Give written advice

## ✅ BLOCO 23A — B1.4 Problems Part 1 (2026-05-17)

✅ APROVADO. 5 lições: Grammar-009, Grammar-010, Vocabulary-007, Speaking-004, Writing-004. Build verde.

Arquivo: `fluency-clean/src/content/curriculum/levels/B1/deepB1ProblemsPart1.js`

B1 agora tem 31 aulas: grammar(10), vocabulary(7), reading(3), listening(3), speaking(4), writing(4).

## ✅ BLOCO 23B — Validação B1.4 Problems Part 1 (2026-05-17)

✅ APROVADO. Sem duplicatas. Build verde. 5 aulas profundas confirmadas.

Próximo: BLOCO 23C — B1.4 Problems, Advice and Decisions — Parte 2
- B1-GRAMMAR-011: Third Conditional (unreal past)
- B1-READING-004: A dilemma/problem text
- B1-LISTENING-004: A problem-solving conversation
- B1-VOCABULARY-008: Decision-making vocabulary

## ✅ BLOCO 23C — B1.4 Problems Part 2 (2026-05-17)

✅ APROVADO. 4 lições: Grammar-011, Reading-004, Listening-004, Vocabulary-008. Build verde.

Arquivo: `fluency-clean/src/content/curriculum/levels/B1/deepB1ProblemsPart2.js`

B1 agora tem 35 aulas: grammar(11), vocabulary(8), reading(4), listening(4), speaking(4), writing(4).

## ✅ BLOCO 23D — Validação B1.4 Problems Part 2 (2026-05-17)

✅ APROVADO. Sem duplicatas. Build verde. 4 aulas profundas confirmadas.

Próximo: BLOCO 24A — B1.5 Work and Study — Parte 1
- B1-GRAMMAR-012: Passive voice (present and past simple)
- B1-GRAMMAR-013: Reported speech (statements)
- B1-VOCABULARY-009: Work and professional vocabulary
- B1-SPEAKING-005: Describe your job or studies
- B1-WRITING-005: Write a professional email

## ✅ BLOCO 24A — B1.5 Work and Study Part 1 (2026-05-17)

✅ APROVADO. 5 lições: Grammar-012, Grammar-013, Vocabulary-009, Speaking-005, Writing-005. Build verde.

Arquivo: `fluency-clean/src/content/curriculum/levels/B1/deepB1WorkStudyPart1.js`

B1 agora tem 40 aulas: grammar(13), vocabulary(9), reading(4), listening(4), speaking(5), writing(5).

## ✅ BLOCO 24B — Validação B1.5 Work and Study Part 1 (2026-05-17)

✅ APROVADO. Sem duplicatas. Build verde. 5 aulas profundas confirmadas.

Próximo: BLOCO 24C — B1.5 Work and Study — Parte 2
- B1-GRAMMAR-014: Reported speech (questions and requests)
- B1-READING-005: A work or study article
- B1-LISTENING-005: A work-related conversation
- B1-VOCABULARY-010: Study and academic vocabulary

## ✅ BLOCO 24C — B1.5 Work and Study Part 2 (2026-05-17)

✅ APROVADO. 4 lições: Grammar-014, Reading-005, Listening-005, Vocabulary-010. Build verde.

Arquivo: `fluency-clean/src/content/curriculum/levels/B1/deepB1WorkStudyPart2.js`

B1 agora tem 44 aulas: grammar(14), vocabulary(10), reading(5), listening(5), speaking(5), writing(5).

## ✅ BLOCO 24D — Validação B1.5 Work and Study Part 2 (2026-05-17)

✅ APROVADO. Sem duplicatas. Build verde. 4 aulas profundas confirmadas.

Próximo: BLOCO 25A — B1.6 Travel and Culture — Parte 1
- B1-GRAMMAR-015: Comparatives and superlatives (review + advanced)
- B1-GRAMMAR-016: Future continuous and future perfect
- B1-VOCABULARY-011: Travel and transport vocabulary
- B1-SPEAKING-006: Describe a trip or travel experience
- B1-WRITING-006: Write a travel blog post or email about a trip

## ✅ BLOCO 25A — B1.6 Travel and Culture Part 1 (2026-05-17)

✅ APROVADO. 5 lições profundas criadas e conectadas ao currículo.

Arquivo: `fluency-clean/src/content/curriculum/levels/B1/deepB1TravelCulturePart1.js`

Aulas:
- `B1-GRAMMAR-015` — Comparatives and superlatives: review and advanced use (double comparatives, as...as, fewer/less)
- `B1-GRAMMAR-016` — Future continuous and future perfect (will be + -ing / will have + pp, by the time)
- `B1-VOCABULARY-011` — Travel and transport vocabulary (12 palavras, 6 chunks, 3 dangerousConfusions, mini-diálogo)
- `B1-SPEAKING-006` — Describe a trip or travel experience (narrativa B1 real, 12 modelPhrases, 3 guidedSpeaking, recordingTask 90-120s)
- `B1-WRITING-006` — Write a travel blog post (modelo "Three Days in Porto", double comparative, past continuous, 8 revisionChecklist)

B1 agora tem **49 aulas**: grammar(16), vocabulary(11), reading(5), listening(5), speaking(6), writing(6).

Build: ✅ 2544 módulos, sem erros.

Documento: `fluency-clean/docs/BLOCO-25A-B1-6-TRAVEL-CULTURE-PARTE-1-CONCLUIDO.md`

Próximo: BLOCO 25B — Validação B1.6 Travel and Culture Part 1
Após validação: BLOCO 25C — B1.6 Travel and Culture Part 2
- B1-READING-006: A travel or cultural article (~400 palavras)
- B1-LISTENING-006: A travel conversation or podcast excerpt
- B1-VOCABULARY-012: Cultural differences and social customs

## ✅ BLOCO 25B — Validação B1.6 Travel and Culture Part 1 (2026-05-17)

✅ APROVADO. 5 lições: Grammar-015, Grammar-016, Vocabulary-011, Speaking-006, Writing-006.

IDs únicos confirmados. level=B1, status=ready, pillar correto em todas.
Schema behavior verificado: idêntico aos blocos anteriores.
Build: ✅ 2544 módulos. Total B1: 49 aulas.

Próximo: BLOCO 25C — B1.6 Travel and Culture Part 2
- B1-READING-006: A travel or cultural article (~400 palavras)
- B1-LISTENING-006: A travel conversation or podcast excerpt
- B1-VOCABULARY-012: Cultural differences and social customs vocabulary

## ✅ BLOCO 25C — B1.6 Travel and Culture Part 2 (2026-05-17)

✅ APROVADO. 3 lições profundas criadas e conectadas.

Arquivo: `fluency-clean/src/content/curriculum/levels/B1/deepB1TravelCulturePart2.js`

Aulas:
- `B1-READING-006` — The case for slow travel (artigo de opinião, 6 parágrafos, 5 comprehensionQ, guidedSummary)
- `B1-LISTENING-006` — A trip to Marrakech (13 turnos, future perfect / past continuous em uso real, 3 shadowing)
- `B1-VOCABULARY-012` — Cultural differences and social customs (12 palavras, 6 chunks, etiquette/taboo/cause offence)

B1 agora tem **52 aulas**: grammar(16), vocabulary(12), reading(6), listening(6), speaking(6), writing(6).

Build: ✅ 2554 módulos, sem erros.

Documento: `fluency-clean/docs/BLOCO-25C-B1-6-TRAVEL-CULTURE-PARTE-2-CONCLUIDO.md`

Próximo: BLOCO 25D — Validação B1.6 Travel and Culture Part 2
