# BLOCO-AUDIT-FIX-04 — Qualidade de Aulas e Exercícios

**Data:** 2026-05-17  
**Branch:** main  
**Commit:** fix: BLOCO-AUDIT-FIX-04 - melhorar qualidade de aulas e exercícios  
**Build:** ✅ `npx vite build` — 2533 módulos, sem erros  

---

## Problemas corrigidos

### PROB-025 — A1 Reading L1: dois parágrafos sem conexão narrativa

**Arquivo:** `src/content/curriculum/levels/A1/deepReadingFoundations.js`  
**Aula:** A1-READING-001

**Antes:** Texto com frases soltas sem ligação ("I am a student. Luis is my friend. He is from Brazil too.")  
**Depois:** Texto coeso com conector narrativo ("I have a friend in my class. His name is Luis. He is from Brazil too... We are students, and we are ready to study English together.")

---

### PROB-026 — A1 Listening: sem tarefa de predição, TTS-only sem aviso

**Arquivo:** `src/content/curriculum/levels/A1/deepListeningFoundations.js`  
**Aulas:** A1-LISTENING-001, A1-LISTENING-002

**Antes:** `listeningPreparation` com 4 itens mecânicos (feche o transcript, prepare palavras) sem ativação cognitiva prévia.  
**Depois:** 5 itens incluindo:
- Tarefa de predição ativa antes de ouvir ("quais palavras você espera ouvir num cumprimento?")
- Pergunta de situação na 1ª escuta ("qual é a situação?")
- Pergunta de detalhe na 2ª escuta ("quantas pessoas falam? Você consegue identificar um nome?")
- Nota explícita sobre áudio TTS e variação do inglês real falado

---

### PROB-027 — A1 Speaking: free speaking sem scaffolding nem modelo completo

**Arquivo:** `src/content/curriculum/levels/A1/deepSpeakingFoundations.js`  
**Aulas:** A1-SPEAKING-001, A1-SPEAKING-002

**Antes:** `freeSpeaking` com nota genérica ("Use apenas frases treinadas nesta aula.") sem estrutura explícita nem modelo.  
**Depois:** Nota com sequência obrigatória + exemplo completo preenchido:
- A1-SPEAKING-001: `greeting → pergunta → resposta → despedida` / modelo: "Hi! How are you? I am good, thanks. See you later!"
- A1-SPEAKING-002: `greeting → nome → idade → país/cidade → papel` / modelo: "Hi! My name is Luis. I am 20 years old. I am from Brazil. My city is Santa Maria. I am a student. Nice to meet you."

---

### PROB-028 — A1 Writing: checklist superficial (só mecânica)

**Arquivo:** `src/content/curriculum/levels/A1/deepWritingFoundations.js`  
**Aula:** A1-WRITING-001

**Antes:** 6 itens mecânicos (tem greeting? Usei My name is? Ponto final? Maiúsculas?) sem verificação de conteúdo.  
**Depois:** 8 itens incluindo:
- Distinguir `I am` vs `I have` para idade
- Cada frase carrega uma informação diferente?
- Meu texto tem pelo menos 5 frases completas?
- `revisionChecklist` expandido para cobrir completude de conteúdo (nome, idade, país, cidade, papel)

---

### PROB-029 — A2 Reading: textos genéricos sem personagens nem narrativa real

**Arquivo:** `src/content/curriculum/levels/A2/deepA2Bridge.js`  
**Aula:** A2-READING-001

**Antes:** Texto genérico em 1ª pessoa anônima ("Yesterday was a busy day. First, I worked in the morning.")  
**Depois:** Texto com personagem nomeado e detalhes concretos ("Yesterday was a busy day for Marco. He woke up early and worked at the coffee shop in the morning. Then he had lunch with his mother, Dona Lúcia, at her house."). Questões, resumo guiado e vocabulário contextual atualizados para referenciar Marco.

---

### PROB-030 — Distractors de múltipla escolha não testam confusões reais

**Arquivo:** `src/content/curriculum/levels/A1/deepReadingFoundations.js`  
**Aulas:** A1-READING-001, A1-READING-002

**Antes:** Distractors absurdos: nome da cidade como opção de resposta para pergunta de nome ("Recife" como distractor de "What is her name?"), "online" como distractor de idade, "Brazil only" com phrasing estranho.  
**Depois:** Distractors plausíveis e semanticamente coerentes:
- A1-READING-001: `['Ana','Luis','Carla']`, `['19','20','18']`, `['Brazil','Canada','Argentina']`, `['Recife','São Paulo','Curitiba']`
- A1-READING-002: `['Bruno','Luis','Carla']`, `['21','19','20']`, `['small','big','medium']`, `['Recife','Curitiba','São Paulo']`

---

### PROB-031 — A2 Writing: modelo formal quando deveria ser informal

**Status:** Já estava correto no código atual. Não foi necessária intervenção.

---

### PROB-032 — A2 Listening: diálogos artificiais e roteirizados demais

**Arquivos:** `src/content/curriculum/levels/A2/deepA2Bridge.js`, `src/content/curriculum/levels/A2/deepA2PastStories.js`  
**Aulas:** A2-LISTENING-001, A2-LISTENING-003

**A2-LISTENING-001 (Weekend Conversation):**
- Antes: Conversa perfeitamente ordenada ("Did you study English? Yes, I studied on Sunday morning.")
- Depois: Tom natural com detalhes reais ("We had a big lunch — my grandmother cooked everything.", "It was in English, which was a bit difficult!")

**A2-LISTENING-003 (Hotel Check-in):**
- Antes: Check-in sem intercorrência (quarto pronto, tudo liso)
- Depois: Complicação realista — quarto não está pronto, hóspede espera no lobby 15 minutos. `firstListenTasks` e `secondListenTasks` atualizados para incluir verificação da intercorrência. `transcript` atualizado para coincidir.

---

## Correções técnicas de sintaxe

- `deepReadingFoundations.js`: Normalização de aspas curvas Unicode (U+2018/U+2019) → apostrofe reta (U+0027) em todo o arquivo (resolveu erro de build do Vite/Rollup)
- `deepReadingFoundations.js`: Corrigidos `'Carla's family.'`, `q('What is her mother's name?'`, `q('What is her father's name?'`, `task('Complete: Carla's family...'` → todos convertidos para aspas duplas onde havia apostrofe dentro de string com aspas simples
- `deepA2Bridge.js`: Corrigidos `'Marco's busy day'` e `q('When was Marco's busy day?'` → aspas duplas

---

## Arquivos modificados

| Arquivo | Problemas resolvidos |
|---|---|
| `src/content/curriculum/levels/A1/deepReadingFoundations.js` | PROB-025, PROB-030 + correções de sintaxe |
| `src/content/curriculum/levels/A1/deepListeningFoundations.js` | PROB-026 |
| `src/content/curriculum/levels/A1/deepSpeakingFoundations.js` | PROB-027 |
| `src/content/curriculum/levels/A1/deepWritingFoundations.js` | PROB-028 |
| `src/content/curriculum/levels/A2/deepA2Bridge.js` | PROB-029, PROB-032 + correções de sintaxe |
| `src/content/curriculum/levels/A2/deepA2PastStories.js` | PROB-032 |

---

## Estado dos testes

- **Build Vite:** ✅ 2533 módulos, sem erros de parse JS
- **Playwright:** Executável do browser não disponível no ambiente remoto (infraestrutura) — mesmo comportamento pré-FIX-04; os testes eram 164/164 antes e nenhuma lógica de componente foi alterada, apenas dados de conteúdo curricular
