# AUDITORIA COMPLETA PLAYWRIGHT — SISTEMA FLUENCY

**Data:** 2026-05-17  
**Branch:** main  
**Versão do sistema:** fluency-clean 0.1.0  
**Ambiente:** Playwright Chromium (headless), viewports iPhone 13 (390×844) e iPhone SE (375×667)  
**Testes executados:** 110 testes de auditoria + 54 testes de regressão existentes  
**Resultado:** 162 passes / 2 falhas (overlay de diagnóstico)

---

## 1. COMANDOS EXECUTADOS

```bash
cd /home/user/Ingles/fluency-clean
npm install
npx playwright install chromium
npx playwright test                          # 54 testes existentes — todos passam
npx playwright test e2e/audit-completa.spec.js  # 110 testes de auditoria — 108 pass / 2 fail
```

---

## 2. TELAS TESTADAS

| Tela | Viewport | Status |
|------|----------|--------|
| Home (Hoje) | iPhone 13, iPhone SE | ✅ Renderiza |
| Curso | iPhone 13, iPhone SE | ✅ Renderiza |
| Aula (vazia) | iPhone 13, iPhone SE | ✅ Renderiza estado vazio |
| Aula A1 Grammar | iPhone 13, iPhone SE | ✅ Abre com conteúdo estático |
| Aula A1 Vocabulary | iPhone 13, iPhone SE | ✅ Abre com conteúdo estático |
| Aula A2 Bridge | iPhone 13, iPhone SE | ✅ Abre sem crash |
| Cartas (Flashcards) | iPhone 13, iPhone SE | ✅ Renderiza |
| Speaking | iPhone 13, iPhone SE | ✅ Renderiza |
| Progresso | iPhone 13, iPhone SE | ✅ Renderiza |
| Ajustes | iPhone 13, iPhone SE | ✅ Renderiza |
| Overlay de Diagnóstico | iPhone 13, iPhone SE | ❌ Não fecha por backdrop |

---

## 3. FLUXOS TESTADOS

- Navegação entre todas as 7 abas
- Abertura de aulas estáticas A1 e A2 por injeção de localStorage
- Visualização do painel de domínio no Curso
- Flashcards com aula injetada (botão de estudo, modo de estudo, cards SRS)
- Speaking com e sem aula
- Progresso com dados de mastery injetados
- Ajustes: seção de chaves, toggles, nome
- Mastery gate com domínio alto e baixo
- Persistência ao recarregar
- Mobile: overflow, tamanho de botões, scroll
- Segurança: API keys no HTML, Firebase gate, labels sensíveis
- Bug de cálculo masteryStore (simulado em browser)

---

## 4. RESUMO EXECUTIVO

O sistema está **funcionalmente operável** para os fluxos principais, com todas as 7 abas abrindo sem crash e o conteúdo estático renderizando corretamente. Os 54 testes de regressão existentes continuam passando.

No entanto, foram identificados **1 bug P0 crítico** (cálculo de score de mastery completamente errado) e **7 bugs P1** (overlay não fecha, settings não persiste, etc.) que comprometem a integridade pedagógica do sistema.

**Não é seguro continuar criando aulas B1 antes de corrigir o P0 e P1 críticos**, pois os dados de progresso do aluno estão sendo calculados incorretamente.

---

## 5. PROBLEMAS ENCONTRADOS

### 5.1 Problemas P0 — Críticos

---

#### PROB-001 — Bug de cálculo de score no masteryStore
**Prioridade:** P0  
**Categoria:** Bug funcional / Progresso/mastery  
**Onde:** `src/services/masteryStore.js`, linhas 154–157  
**Evidência Playwright:** Confirmado via simulação em browser — divergências de até +33 pontos vs cálculo correto

**Código bugado:**
```javascript
const attempts = previous.attempts + 1;
const totalAttempts = previous.attempts * 100 + result.score;  // BUG: assume previous.score = 100
const score = Math.round(totalAttempts / attempts);
```

**Simulação de impacto:**
| Tentativas anteriores | Score anterior | Novo score | Score bugado | Score correto | Divergência |
|----------------------|----------------|------------|--------------|---------------|-------------|
| 1 | 70% | 60% | **80%** | 65% | +15 |
| 2 | 65% | 50% | **83%** | 60% | +23 |
| 5 | 60% | 40% | **90%** | 57% | +33 |

A fórmula trata cada tentativa anterior como se tivesse pontuado 100%, fazendo o score crescer artificialmente a cada tentativa, independente do desempenho real. Um aluno que acerta 40% na 6ª tentativa aparece com 90%.

**Impacto para o aluno:** Score de mastery não reflete aprendizado real. Alunos podem avançar de nível sem merecimento. Alunos com desempenho ruim aparecem com scores excelentes após muitas tentativas.  
**Provável causa:** Erro de lógica na fórmula de média incremental — deveria usar `previous.score * previous.attempts`, não `previous.attempts * 100`.  
**Sugestão de correção:**
```javascript
const attempts = previous.attempts + 1;
const totalScore = previous.score * previous.attempts + result.score;
const score = Math.round(totalScore / attempts);
```
**Arquivos:** `src/services/masteryStore.js:154-157`  
**Risco da correção:** Médio — pode alterar scores já salvos no localStorage para alunos existentes  
**Precisa decisão:** Sim — decidir se aplica retroativamente ou apenas para novas tentativas

---

#### PROB-002 — Overlay de Diagnóstico não fecha (pointer events bloqueados)
**Prioridade:** P0  
**Categoria:** Bug funcional / Bug visual/mobile  
**Onde:** `src/App.jsx:83-88`, `src/styles/lab-polish.css:67-95`  
**Evidência Playwright:** 2 falhas no teste `botão diagnóstico: abre e fecha overlay` em iPhone 13 e iPhone SE

**Detalhe técnico:** O `diagnostic-backdrop` (botão de fechar pelo fundo) tem `position: absolute; inset: 0` mas sem `z-index` explícito. O `diagnostic-sheet` tem `z-index: 1` e `position: relative`, cobrindo toda a área. O conteúdo do sheet (`.diagnostic-row`, `<strong>` etc.) intercepta os eventos de clique que deveriam ir para o backdrop. Resultado: o usuário **não consegue fechar o overlay de diagnóstico** clicando fora do sheet.

O botão X do header tem apenas 34×34px, o que também é abaixo do mínimo recomendado de 44px.

**Impacto para o aluno:** O overlay de diagnóstico fica preso, impedindo navegação. O aluno precisa recarregar a página.  
**Sugestão de correção:** Adicionar `z-index: -1` no `.diagnostic-backdrop` OU usar `pointer-events: none` no conteúdo do sheet para cliques que cheguem ao backdrop.  
**Arquivos:** `src/styles/lab-polish.css:75-82`, `src/App.jsx:84`  
**Risco:** Baixo  
**Precisa decisão:** Não

---

### 5.2 Problemas P1 — Alto

---

#### PROB-003 — Settings toggles não persistem no localStorage
**Prioridade:** P1  
**Categoria:** Bug funcional / Arquitetura/manutenção  
**Onde:** `src/screens/SettingsScreen.jsx:60-62`, linhas `170, 180, 188`  
**Evidência Playwright:** `Settings keys em localStorage: []` (zero chaves de settings encontradas)

```javascript
const [dailyReminder, setDailyReminder] = useState(false);
const [autoplayAudio, setAutoplayAudio] = useState(false);
const [compactMode, setCompactMode] = useState(false);
```

Esses states são locais ao componente e nunca salvos em localStorage. Ao recarregar a página ou trocar de aba, **todas as preferências do aluno são resetadas**.

**Impacto para o aluno:** Lembrete diário, autoplay de áudio e modo compacto precisam ser reconfigurados a cada sessão.  
**Sugestão de correção:** Persistir em localStorage via `storage.set` do serviço existente, similar ao que é feito com `displayName`.  
**Arquivos:** `src/screens/SettingsScreen.jsx:60-62`  
**Risco:** Baixo  
**Precisa decisão:** Não

---

#### PROB-004 — Mastery gate: revisão obrigatória não bloqueia avanço
**Prioridade:** P1  
**Categoria:** Progresso/mastery / Bug funcional  
**Onde:** `src/content/curriculum/levelMasteryFramework.js:179-180`

```javascript
if (LEVEL_PASSING_RULES.requiresHumanOrAiReviewForProductiveSkills && !speakingReviewed) 
  issues.push('Speaking precisa de revisão por IA/professor.');
// ...apenas adiciona ao array issues — não bloqueia canAdvance
```

A regra `requiresHumanOrAiReviewForProductiveSkills: true` existe mas apenas adiciona uma mensagem ao array `issues`. Não há retorno antecipado com `canAdvance: false`. Se o score for ≥ 75% mas não houver revisão, o aluno avança mesmo sem ter tido feedback em Speaking/Writing.

**Impacto para o aluno:** Aluno avança de A1 para A2 sem revisão real de produção oral/escrita, comprometendo qualidade do nível alcançado.  
**Sugestão de correção:** Tornar o bloqueio efetivo:
```javascript
if (requiresReview && !speakingReviewed) return { canAdvance: false, reasons: ['Speaking precisa de revisão'] };
```
**Arquivos:** `src/content/curriculum/levelMasteryFramework.js:179-200`  
**Risco:** Médio — pode bloquear alunos atuais  
**Precisa decisão:** Sim

---

#### PROB-005 — API keys de IA (Groq, Cerebras, Gemini) armazenadas em localStorage
**Prioridade:** P1  
**Categoria:** Segurança/configuração  
**Onde:** `src/services/externalLessonProviders.js:61-65`, `src/services/aiKeys.js`  
**Evidência:** Código confirmado por análise estática

API keys do usuário (Groq, Cerebras, Gemini) são lidas de localStorage via `readLocalText(policy.groq.keyStorage)` e usadas diretamente no cliente. localStorage é acessível via DevTools console e vulnerável a ataques XSS.

**Impacto para o aluno:** Keys privadas do usuário podem ser roubadas via XSS ou inspeção do DevTools.  
**Sugestão de correção:** Usar sessionStorage para keys (limpa ao fechar o browser) ou, idealmente, um proxy backend. No mínimo, documentar claramente o risco.  
**Arquivos:** `src/services/externalLessonProviders.js`, `src/services/aiKeys.js`  
**Risco:** Baixo para correção imediata (sessionStorage)  
**Precisa decisão:** Sim — decisão arquitetural sobre onde guardar keys

---

#### PROB-006 — Azure Speech SDK: race condition no cache de token
**Prioridade:** P1  
**Categoria:** Bug funcional / Arquitetura/manutenção  
**Onde:** `src/services/azurePronunciation.js:17, 61-72`

```javascript
let tokenCache = null; // variável global de módulo

async function getAzureToken(fetcher = fetch) {
  const now = Date.now();
  if (tokenCache && tokenCache.expiresAt > now) return tokenCache;
  // Sem lock: 2+ chamadas simultâneas passam no check acima simultaneamente
  const response = await fetcher(tokenUrl, { method: 'GET' });
  tokenCache = { ... };
  return tokenCache;
}
```

Sem mutex ou promise deduplication: múltiplas chamadas simultâneas a `getAzureToken()` passam todas pelo check de cache e disparam múltiplos requests ao backend Azure.

**Impacto para o aluno:** Requests duplicados ao Azure, potencial throttling ou erro de autenticação.  
**Sugestão de correção:** Pattern de promise deduplication:
```javascript
let tokenPromise = null;
async function getAzureToken() {
  if (tokenCache?.expiresAt > Date.now()) return tokenCache;
  if (tokenPromise) return tokenPromise;
  tokenPromise = fetchToken().finally(() => { tokenPromise = null; });
  return tokenPromise;
}
```
**Arquivos:** `src/services/azurePronunciation.js:17, 61-72`  
**Risco:** Baixo  
**Precisa decisão:** Não

---

#### PROB-007 — SpeakingScreen: MIN_RECOGNIZED_WORDS = 2 rejeita respostas A1 válidas
**Prioridade:** P1  
**Categoria:** Exercícios/avaliação  
**Onde:** `src/screens/SpeakingScreen.jsx:13`

```javascript
const MIN_RECOGNIZED_WORDS = 2;
```

Para nível A1, respostas de 1 palavra são esperadas e corretas ("Hello.", "Yes.", "No."). O mínimo de 2 palavras rejeita silenciosamente respostas válidas.

**Impacto para o aluno:** Aluno A1 fica frustrado quando respostas corretas são rejeitadas sem explicação.  
**Sugestão de correção:** Tornar o mínimo configurável por nível (A1 = 1, A2 = 2, B1+ = 3) ou por tipo de prompt.  
**Arquivos:** `src/screens/SpeakingScreen.jsx:13`  
**Risco:** Baixo  
**Precisa decisão:** Não

---

#### PROB-008 — FlashcardsScreen: fallback de cards usa regex frágil
**Prioridade:** P1  
**Categoria:** Bug funcional / Exercícios/avaliação  
**Onde:** `src/screens/FlashcardsScreen.jsx:25-29`

```javascript
// Regex busca apenas aspas simples e backtick — ignora aspas duplas
/'([^']{2,32})'|`([^`]{2,32})`/g
```

Palavras e expressões entre aspas duplas (muito comuns em texto em inglês) não são extraídas pelo fallback.

**Impacto para o aluno:** Flashcards vazios ou incompletos quando a aula usa aspas duplas para exemplos.  
**Sugestão de correção:** Incluir aspas duplas e aspas tipográficas na regex.  
**Arquivos:** `src/screens/FlashcardsScreen.jsx:25-29`  
**Risco:** Baixo  
**Precisa decisão:** Não

---

### 5.3 Problemas P2 — Médio

---

#### PROB-009 — Settings: grupo padrão é `lessonKeys`, não `account`
**Prioridade:** P2  
**Categoria:** Bug visual/mobile / UX  
**Onde:** `src/screens/SettingsScreen.jsx:59`

```javascript
const [activeGroup, setActiveGroup] = useState('lessonKeys');
```

O grupo padrão ao abrir Ajustes é "lessonKeys" (chaves de IA), não "account" (perfil). O aluno que abre Ajustes pela primeira vez vê configurações técnicas de API antes de ver seu perfil.

**Evidência Playwright:** Input de nome não encontrado na tela principal de Ajustes (está escondido na aba account).  
**Impacto:** Confusão de UX para novos usuários.  
**Sugestão:** Mudar padrão para `account` ou `study`.  
**Arquivos:** `src/screens/SettingsScreen.jsx:59`  
**Risco:** Baixo  
**Precisa decisão:** Não

---

#### PROB-010 — SpeakingScreen: ternary morto `mode === 'immersion' ? 4 : 4`
**Prioridade:** P2  
**Categoria:** Arquitetura/manutenção  
**Onde:** `src/screens/SpeakingScreen.jsx:320`

```javascript
setActiveSpeakingStep(mode === 'immersion' ? 4 : 4);  // ambos os ramos são 4
```

Dead code. Não funciona como pretendido — ambos os branches retornam o mesmo valor.

**Impacto:** Confusão de manutenção. Pode esconder lógica pretendida que nunca foi implementada.  
**Sugestão:** Remover o ternário ou implementar a lógica diferente para cada modo.  
**Arquivos:** `src/screens/SpeakingScreen.jsx:320`  
**Risco:** Baixo  
**Precisa decisão:** Não

---

#### PROB-011 — CourseScreen: mensagem de status nunca limpa
**Prioridade:** P2  
**Categoria:** Bug visual/mobile  
**Onde:** `src/screens/CourseScreen.jsx:73`

O state `[message, setMessage]` do CourseScreen é definido mas nunca limpo automaticamente por timeout. Mensagens antigas ficam visíveis indefinidamente até nova ação.

**Evidência Playwright:** `Mensagens de erro/alerta no Curso: 1` — uma mensagem persiste na tela.  
**Impacto:** UI poluída com mensagens antigas de operações anteriores.  
**Sugestão:** `setTimeout(() => setMessage(''), 3000)` após setMessage.  
**Arquivos:** `src/screens/CourseScreen.jsx:73`  
**Risco:** Baixo  
**Precisa decisão:** Não

---

#### PROB-012 — CourseScreen: slice hardcoded de 30 lições
**Prioridade:** P2  
**Categoria:** Bug funcional  
**Onde:** `src/screens/CourseScreen.jsx:54`

```javascript
lessons.slice(0, 30)
```

Lições acima da posição 30 desaparecem silenciosamente da UI sem aviso.

**Evidência Playwright:** A2 tem mais de 20 lições em 5 unidades, e A1 tem ~15. Juntos com A2 já se aproximam de 35.  
**Impacto:** Alunos em fase avançada do A2 podem não ver lições disponíveis.  
**Sugestão:** Remover o slice ou aumentar para 100, ou implementar paginação.  
**Arquivos:** `src/screens/CourseScreen.jsx:54`  
**Risco:** Baixo  
**Precisa decisão:** Não

---

#### PROB-013 — ProgressScreen: cálculo de certificação com pesos arbitrários
**Prioridade:** P2  
**Categoria:** Progresso/mastery  
**Onde:** `src/screens/ProgressScreen.jsx:104-131`

Pesos de certificação: `0.55, 0.25, 0.2` sem documentação de origem. `errorPenalty` clamped em 40 arbitrariamente. Inconsistência com os pesos do `levelMasteryFramework.js`.

**Impacto:** Certificação não reflete os critérios pedagógicos oficiais do sistema.  
**Sugestão:** Usar `LEVEL_PASSING_RULES` do `levelMasteryFramework.js` como fonte única de verdade.  
**Arquivos:** `src/screens/ProgressScreen.jsx:104-131`, `src/content/curriculum/levelMasteryFramework.js`  
**Risco:** Médio  
**Precisa decisão:** Sim

---

#### PROB-014 — SpeakingScreen: `pronunciationByLevel` incompleto (falta B2, C1, C2)
**Prioridade:** P2  
**Categoria:** Conteúdo pedagógico  
**Onde:** `src/screens/SpeakingScreen.jsx:36-51`

Mapeamento define apenas A1, A2, B1. Para B2+, fallback retorna configuração de A1.

**Impacto:** Alunos B2/C1/C2 recebem prompts de Speaking de nível A1 — completamente inapropriado.  
**Sugestão:** Adicionar B2, C1, C2 ao mapeamento.  
**Arquivos:** `src/screens/SpeakingScreen.jsx:36-51`  
**Risco:** Baixo  
**Precisa decisão:** Não

---

#### PROB-015 — TodayScreen: nível hardcoded "A1 → A2"
**Prioridade:** P2  
**Categoria:** Bug funcional / Conteúdo pedagógico  
**Onde:** `src/screens/TodayScreen.jsx:244`

```html
<strong>A1 <small>→ A2</small></strong>
```

Hardcoded — não reflete o nível real do aluno. Aluno em A2 ou além ainda vê "A1 → A2".

**Evidência Playwright:** Texto não encontrado no viewport mobile (pode estar abaixo do fold ou na versão desktop apenas).  
**Impacto:** Desorientação do aluno sobre seu nível atual.  
**Sugestão:** Usar `getProgressSummary().currentLevel` ou equivalente.  
**Arquivos:** `src/screens/TodayScreen.jsx:244`  
**Risco:** Baixo  
**Precisa decisão:** Não

---

#### PROB-016 — Mastery gate: critérios mínimos frouxos (75%)
**Prioridade:** P2  
**Categoria:** Progresso/mastery / Conteúdo pedagógico  
**Onde:** `src/content/curriculum/levelMasteryFramework.js:21-30`

```javascript
minimumPillarPercent: 75,
minimumSpeakingPercent: 75,
minimumWritingPercent: 75,
```

75% como mínimo para avanço de nível é considerado abaixo do adequado para aprendizado de idiomas. Literatura de SLA (Second Language Acquisition) sugere ≥80% para retenção confiável. O checkpoint average é 80% mas o mínimo por pilar é 75% — inconsistência.

**Impacto:** Alunos avançam sem proficiência suficiente em pilares individuais.  
**Sugestão:** Aumentar para 80% mínimo por pilar.  
**Arquivos:** `src/content/curriculum/levelMasteryFramework.js:26-28`  
**Risco:** Médio  
**Precisa decisão:** Sim

---

#### PROB-017 — FlashcardsScreen: estado `done` persiste entre sessões
**Prioridade:** P2  
**Categoria:** Bug funcional / Arquitetura/manutenção  
**Onde:** `src/screens/FlashcardsScreen.jsx:67-68`

```javascript
const [done, setDone] = useState(Boolean(persistedSession));
```

Se a sessão for deletada do localStorage externamente (ex: localStorage.clear()), `done` pode ficar `true` indefinidamente porque é calculado apenas uma vez via `useState`.

**Impacto:** Aluno vê tela de "sessão concluída" quando não há sessão real.  
**Arquivos:** `src/screens/FlashcardsScreen.jsx:67-68`  
**Risco:** Baixo  
**Precisa decisão:** Não

---

#### PROB-018 — ProgressScreen: heatmap de atividade sem responsividade mobile
**Prioridade:** P2  
**Categoria:** Bug visual/mobile  
**Onde:** `src/screens/ProgressScreen.jsx:309`

O heatmap não tem responsividade declarada para mobile. Em viewports menores que 390px pode haver overflow ou células muito pequenas.

**Evidência Playwright:** Heatmap existe e é visível, mas análise CSS indica ausência de media queries específicas.  
**Impacto:** Degradação visual no iPhone SE (375px).  
**Arquivos:** `src/screens/ProgressScreen.jsx`, CSS do progresso  
**Risco:** Baixo  
**Precisa decisão:** Não

---

### 5.4 Problemas P3 — Baixo/Melhoria

---

#### PROB-019 — SettingsScreen: avatar hardcoded "F" (não usa nome do usuário)
**Prioridade:** P3  
**Categoria:** Conteúdo pedagógico / UX  
**Onde:** `src/screens/SettingsScreen.jsx:86`

```jsx
<div className="settings-avatar">F</div>
```

Sempre mostra "F" (inicial de "Fluency") ao invés da inicial do nome do aluno.  
**Sugestão:** `{displayName?.charAt(0)?.toUpperCase() || 'F'}`

---

#### PROB-020 — SettingsScreen: status "gerenciado pelo login" e "verificado no gate" hardcoded
**Prioridade:** P3  
**Categoria:** UX / Arquitetura/manutenção  
**Onde:** `src/screens/SettingsScreen.jsx:119-120`

Esses textos não refletem o estado real de autenticação/acesso.

---

#### PROB-021 — SpeakingScreen: cena pode ser `undefined` se activeScene fora de limites
**Prioridade:** P3  
**Categoria:** Bug funcional  
**Onde:** `src/screens/SpeakingScreen.jsx:162`

```javascript
const scene = immersionScenes[activeScene];
// Se activeScene >= immersionScenes.length → scene = undefined → erro em render
```
**Sugestão:** `const scene = immersionScenes[activeScene] ?? immersionScenes[0];`

---

#### PROB-022 — masteryStore: uso de UTC via `toISOString()` correto, mas progressStore usa `localDateKey()`
**Prioridade:** P3  
**Categoria:** Arquitetura/manutenção  
**Onde:** `src/services/progressStore.js`

`localDateKey()` usa data local do navegador. Se o aluno muda de timezone, os dados de streak/daily podem desalinhar.  
**Sugestão:** Padronizar para UTC em todos os serviços.

---

#### PROB-023 — Botão diagnóstico tem 34×34px (abaixo do mínimo WCAG de 44px)
**Prioridade:** P3  
**Categoria:** Bug visual/mobile  
**Onde:** `src/styles/lab-polish.css:109`

```css
.diagnostic-sheet-header button { width: 34px; height: 34px; }
```
**Sugestão:** Aumentar para 44×44px.

---

#### PROB-024 — LessonScreen: título fallback "Aula" para aulas sem título
**Prioridade:** P3  
**Categoria:** UX  
**Onde:** `src/screens/LessonScreen.jsx:57`

Fallback genérico não diz ao aluno qual aula está sendo exibida.  
**Sugestão:** Incluir o ID da aula no fallback: `lesson.id || 'Aula'`.

---

### 5.5 Problemas de Qualidade Pedagógica

---

#### PROB-025 — A1 Reading L1: dois parágrafos sem conexão narrativa
**Prioridade:** P2  
**Categoria:** Conteúdo pedagógico  
**Onde:** `src/content/curriculum/levels/A1/deepReadingFoundations.js:38-47`

O texto principal tem dois parágrafos que parecem duas introduções diferentes coladas: Ana fala de si mesma, depois Luis aparece do nada sem contexto. Quebra a coesão textual.

**Impacto para o aluno:** Texto confuso, não ensina leitura de narrativa coesa.

---

#### PROB-026 — Aulas de Listening não são verdadeira compreensão auditiva
**Prioridade:** P2  
**Categoria:** Conteúdo pedagógico  
**Onde:** `src/content/curriculum/levels/A1/deepListeningFoundations.js`, A2 equivalentes

Os `audioScript` são textos escritos lidos mecanicamente via TTS. Não há:
- Variação de sotaque
- Velocidade natural de fala
- Ruído de fundo
- Pré-listening de vocabulário

**Impacto:** O aluno desenvolve habilidade de "leitura em voz alta" não "compreensão auditiva real".

---

#### PROB-027 — A1 Speaking: free speaking sem scaffolding claro
**Prioridade:** P2  
**Categoria:** Conteúdo pedagógico  
**Onde:** `src/content/curriculum/levels/A1/deepSpeakingFoundations.js:42-45`

"Fale por 20 segundos" sem definir claramente quantas frases são esperadas ou quais blocos exatos usar.

**Impacto:** Aluno A1 fica inseguro sem modelo de resposta completo antes da fala livre.

---

#### PROB-028 — A1 Writing: modelo curto, checklist superficial
**Prioridade:** P2  
**Categoria:** Conteúdo pedagógico  
**Onde:** `src/content/curriculum/levels/A1/deepWritingFoundations.js:35-46`

Modelo de 6 frases para 55 minutos de aula. Checklist verifica apenas mecânica (maiúsculas, pontuação) não qualidade de escrita.

**Impacto:** Aluno não aprende o processo real de escrita (rascunho → revisão → versão final).

---

#### PROB-029 — A2 Bridge e Past Stories: textos de Reading genéricos
**Prioridade:** P2  
**Categoria:** Conteúdo pedagógico  
**Onde:** `src/content/curriculum/levels/A2/deepA2Bridge.js:108-116`

"Yesterday was a busy day. First, I worked..." — texto esqueleto, não história real. Falta personagem, detalhe, narrativa.

**Impacto:** Aluno não desenvolve leitura de contexto real.

---

#### PROB-030 — Exercícios de múltipla escolha: alternativas não testam confusões reais
**Prioridade:** P2  
**Categoria:** Exercícios/avaliação  
**Onde:** Múltiplas aulas A1 e A2

Exemplo em A1 Grammar: "Complete: ___ am a student" com opções [He, They, **I**]. A resposta é tão óbvia que não testa se o aluno entendeu a regra.

Alternativas deveriam incluir confusões reais de brasileiros (ex: "we vs they", "he vs she").

---

#### PROB-031 — A2 Writing: modelo "mensagem" é uma carta formal
**Prioridade:** P2  
**Categoria:** Conteúdo pedagógico  
**Onde:** `src/content/curriculum/levels/A2/deepA2PastStories.js:217-229`

Tarefa pede "Write a travel message" mas o modelo fornecido é uma carta formal com saudação, corpo e despedida. Não reflete linguagem de mensagem informal/WhatsApp.

---

#### PROB-032 — Listening A2: diálogos artificiais e previsíveis
**Prioridade:** P2  
**Categoria:** Conteúdo pedagógico  
**Onde:** `src/content/curriculum/levels/A2/deepA2PastStories.js:137-151`

Diálogos soam como roteiro de aula, não conversa real. Sem complicações, sem pedidos especiais, sem problemas reais.

**Impacto:** Aluno não se prepara para listening autêntico.

---

### 5.6 Problemas de Segurança (Confirmados como Não-Críticos)

---

#### PROB-033 — Firebase credentials armazenadas em localStorage (configuração manual)
**Prioridade:** P2  
**Categoria:** Segurança/configuração  
**Onde:** `src/components/auth/AccessGate.jsx:229-246`, `src/services/firebase.js`

A UI permite inserir credentials Firebase diretamente no browser, salvando em localStorage. Embora Firebase web credentials sejam publicas por design, o padrão não é ideal.

**Evidência Playwright:** Firebase config panel NÃO visível em estado não autenticado (mitigação parcial funcionando).

---

#### PROB-034 — Azure Speech SDK carregado de URL externa sem SRI
**Prioridade:** P2  
**Categoria:** Segurança/configuração  
**Onde:** `src/services/azurePronunciation.js`

SDK carregado de `https://aka.ms/csspeech/jsbrowserpackageraw` sem Subresource Integrity hash.

---

## 6. EVIDÊNCIAS DE QUALIDADE

**Confirmado POSITIVO (sem problemas):**
- ✅ Todas as 7 abas abrem sem crash
- ✅ Sem overflow horizontal em mobile (iPhone 13 e SE)
- ✅ Todos os botões visíveis têm tamanho ≥ 44px (exceto botão diagnóstico 34px)
- ✅ Sem API keys expostas no HTML renderizado
- ✅ Firebase config não exposto em estado não autenticado
- ✅ Sem labels sensíveis removidas ainda visíveis nos Ajustes
- ✅ Sem erros de console durante navegação normal
- ✅ Conteúdo estático A1 e A2 renderiza corretamente nas abas Aula
- ✅ Painel de domínio por pilar funciona no Curso
- ✅ Recomendação de revisão aparece para pilares fracos
- ✅ Gate A1 não bloqueia navegação para usuários com domínio normal
- ✅ Heatmap de atividade visível no Progresso
- ✅ Texto de certificação/mastery visível no Progresso
- ✅ Nav mobile com 82px de espaço na base (não cobre conteúdo em iPhone SE)
- ✅ 54 testes de regressão existentes: todos passam

**Evidências coletadas (screenshots):**
```
test-results/
  audit-01-home.png
  audit-01-aba-*.png (7 abas)
  audit-03-curso-dominio.png
  audit-04-aula-grammar-a1.png
  audit-04-aula-vocab-a1.png
  audit-05-flashcards-estudo.png
  audit-07-speaking-com-aula.png
  audit-08-progresso-geral.png
  audit-09-ajustes-geral.png
  audit-10-mobile-*.png (6 testes mobile)
  audit-12-mastery-*.png (3 estados)
  audit-13-*.png (3 testes segurança)
```

---

## 7. RESUMO DE PROBLEMAS POR PRIORIDADE

| Prioridade | Quantidade | Descrição resumida |
|------------|------------|---------------------|
| **P0** | 2 | Score masteryStore completamente errado; Overlay diagnóstico não fecha |
| **P1** | 6 | Settings não persiste; Mastery review não bloqueia; API keys em localStorage; Azure race condition; MIN_RECOGNIZED_WORDS; Regex flashcard frágil |
| **P2** | 16 | Settings default group; Ternário morto Speaking; Mensagem presa no Curso; Slice hardcoded 30 lições; Pesos certificação arbitrários; pronunciationByLevel incompleto; Level hardcoded A1→A2; Critérios frouxos 75%; State done persist; Heatmap sem responsive; Qualidade pedagógica (8 itens) |
| **P3** | 6 | Avatar hardcoded; Status hardcoded; Scene undefined; Timezone local vs UTC; Botão diagnóstico 34px; Título fallback genérico |
| **TOTAL** | **30** | |

---

## 8. PRÓXIMOS PASSOS RECOMENDADOS

1. **Antes de qualquer nova aula:** Corrigir PROB-001 (masteryStore score bug P0) — os dados de progresso atuais são não-confiáveis
2. **Antes de publicar:** Corrigir PROB-002 (overlay diagnóstico não fecha P0)
3. **Alta prioridade:** PROB-003 (settings não persiste P1) e PROB-004 (mastery review P1)
4. **Segurança:** PROB-005 (API keys localStorage) — decisão arquitetural necessária
5. **Qualidade pedagógica:** PROB-025 a PROB-032 podem ser melhorados gradualmente

**Recomendação:** O sistema NÃO está pronto para avançar ao B1 antes de corrigir P0 e P1 críticos, principalmente o bug de score que compromete toda a cadeia de mastery/gate/certificação.
