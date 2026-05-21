# BLOCO-VOCAB-TRAIL-AUDIT-ADAPT — Auditoria e adaptação do plano Vocab Trail à main

Gerado em: 2026-05-21
Branch: `main`
Escopo confirmado pelo usuário: **somente a aba `Trilha de vocabulário` dentro de Cartas**.

## Regra de segurança deste bloco

Este bloco não implementa mudanças pesadas. Ele compara o plano Vocab Trail Superior do Notion/ZIP com o estado real da `main` e define a sequência segura.

Fora do escopo deste bloco:

- Reading.
- Aulas/conteúdo curricular.
- `lessonFactories`.
- `pillarQualityRules` pedagógico.
- `Flashcards da aula` como produto separado.
- CSS global perigoso.
- DOM injection.
- `bundle.js`.
- Serviços reais externos.

## Separação obrigatória dentro da aba Cartas

A tela `Cartas` tem duas experiências diferentes:

1. **Trilha de vocabulário** — escopo deste plano.
2. **Flashcards da aula** — deve permanecer intacto neste ciclo.

O Vocab Trail Superior deve evoluir somente a experiência 1.

Qualquer alteração futura deve preservar a entrada atual de `Flashcards da aula`, inclusive o fluxo `stage === 'lessonCards'` e o componente `LessonAdaptiveCards`.

## Estado atual encontrado na main

### `src/screens/FlashcardsScreen.jsx`

A tela já contém uma arquitetura dividida por estágios:

- `map`: tela principal da aba Cartas.
- `lessonCards`: flashcards adaptativos da aula atual.
- `intro`: introdução de palavras da bolha.
- `practice`: prática da bolha.
- `done`: conclusão da sessão.

Itens já presentes na trilha:

- Cabeçalho com progresso geral: bolhas concluídas e banco planejado.
- Tab visual `Trilha de vocabulário`.
- Card de revisão espaçada com `dueToday`, fracos e domínio médio.
- Seleção de tópicos por nível.
- Desbloqueio progressivo por deck.
- Mapa de bolhas com estado ativo, bloqueado e concluído.
- Introdução de palavras antes da prática.
- Prática por bolha com atividades geradas por `vocabularyPractice.js`.
- Registro de sessão via `recordFlashcardSession`.
- Atualização de SRS via `updateVocabularySrsFromReviewLog`.
- Conclusão de nível da bolha via `completeVocabularyBubbleLevel`.
- Áudio via `playLearningAudio`.

Ponto de atenção: `FlashcardsScreen.jsx` mistura a trilha e os flashcards da aula no mesmo arquivo. Isso funciona, mas futuras mudanças devem ser pequenas ou modularizadas para não quebrar a segunda experiência.

### `src/services/vocabularyPractice.js`

Atividades já existentes:

- `intro` — frase modelo.
- `choice` — reconhecimento de significado.
- `choice/complete` — completar frase com palavra.
- `listen` — ouvir e escolher.
- `build` — montar frase.

Pontos positivos:

- Usa shuffle estável.
- Tem checagens contra vazamento óbvio de resposta.
- Usa frase exemplo como base para produção.
- Escala quantidade por nível da bolha.

Lacunas contra o plano Vocab Trail Superior:

- Ainda não há tipos explícitos `phrase_translate`, `phrase_gap`, `pair`, `type_word` e `translate_sentence`.
- A produção livre ainda é limitada; `build` é word-bank, não digitação livre.
- A frase já existe, mas ainda pode ser mais protagonista na ordem pedagógica.

### `src/services/vocabularyPath.js`

Já existe:

- `BUBBLE_SIZE = 6`.
- 3 níveis por bolha via `LEVEL_CARD_STEPS`.
- Desbloqueio progressivo por deck/bolha.
- Conclusão por nível da bolha.
- Retenção de 2 cards anteriores para reforço contextual.

Lacunas:

- Não há injeção dinâmica real de palavras fracas dentro das próximas bolhas.
- Não há sessão própria de revisão urgente na trilha.
- O mapa é funcional, mas ainda não é uma trilha visual premium com estrelas/zigzag avançado/gamificação.

### `src/services/vocabularySrs.js`

Já existe:

- Estado local em `fluency.vocabularySrs.v1`.
- Status: `weak`, `learning`, `review`, `strong`, `mastered`.
- `dueDate`, `attempts`, `correct`, `wrong`, `streak`, `lapses`, `mastery`.
- `getVocabularySrsSummary()` para card de revisão.
- `hasVocabularyReviewDueToday()`.

Lacunas:

- O SRS ainda resume e registra, mas não governa fortemente o caminho.
- `dueItems` e `weakItems` ainda não são usados como sessão própria da trilha.
- Não há algoritmo de injeção controlada por prioridade dentro de `getBubbleCardsForLevel`.

### `src/services/vocabularyDecks.js`

Já existe:

- Decks base A1/A1-A2.
- Import de expansões fixas A1-A2, B1-B2 e C1-C2.
- `getTotalVocabularyBankCount()`.
- Target `VOCABULARY_BANK_TARGET = 7500`.
- `getVocabularyBankAudit()` usando `vocabularyCurriculumAudit.js`.

Estado visual observado pelo usuário:

- Tela mostra `864/7500 palavras planejadas`.
- Tela mostra `0/144 bolhas`.

Isso confirma que o banco já está parcialmente expandido, mas ainda longe da meta planejada de 7500.

### `src/services/vocabularyCurriculumAudit.js`

Já existe auditoria curricular para:

- palavra/tradução/frase/chunk ausente;
- exemplo sem capitalização/pontuação;
- exemplo curto/longo por nível;
- exemplo sem conter a palavra alvo;
- chunk curto ou ausente da frase;
- duplicatas excessivas;
- distribuição por nível/tópico.

Esse arquivo pode apoiar o bloco futuro de expansão/auditoria de decks sem mexer em conteúdo de aulas.

### CSS da aba Cartas

Arquivo temático consolidado:

- `src/styles/flashcards.css`

Ele importa:

- `flashcards-polish.css`;
- `flashcards-session.css`;
- `flashcards-new-words-hotfix.css`.

A estrutura respeita o H4/CSS consolidation: não há necessidade de novo import direto em `main.jsx` para próximos ajustes visuais da trilha.

## Checklist do plano Vocab Trail Superior

### Concluído ou já existente

- Trilha base de vocabulário.
- Bolhas e progressão por deck.
- Níveis 1–3 por bolha.
- SRS local inicial.
- Card de revisão espaçada na tela da trilha.
- Flashcards da aula integrados, mas separados do escopo da trilha.
- Áudio integrado.
- Introdução de palavras antes da prática.
- Atividade `build`.
- Expansões A1-A2, B1-B2 e C1-C2 importadas.
- Auditoria curricular de vocabulário disponível.

### Parcial

- Frase como protagonista: existe em `intro`, `complete`, `listen` e `build`, mas pode ficar mais forte.
- Mapa visual: existe, mas ainda não tem polish premium/estrelas/game feeling completo.
- SRS adaptativo: registra e resume, mas ainda não injeta dinamicamente palavras fracas na trilha.
- Revisão espaçada: existe como card/resumo, mas não como sessão própria.
- Expansão A1-C2: existe parcialmente; banco visto na UI está em 864/7500.

### Pendente

- `phrase_translate`: frase PT→EN com word bank.
- `phrase_gap`: lacuna dentro de frase inteira.
- `pair`: pares palavra/frase/sentido.
- `type_word`: digitação livre.
- `translate_sentence`: produção/tradução de frase.
- Injeção dinâmica de palavras fracas nas bolhas seguintes.
- Sessão própria de revisão urgente.
- Reaparecimento controlado de palavras fracas por nível.
- Intro uma palavra por vez com opção `Já sei esta`.
- Zigzag visual premium com estrelas.
- XP/vidas/game over pedagógico específicos da trilha.
- Sons nativos via Web Audio API.
- Confetti/celebração sem biblioteca externa.
- Auditoria final da aba Cartas/Vocabulário.

## Sequência segura recomendada

### 1. BLOCO-VOCAB-SENTENCE-FIRST-EXERCISES

Objetivo: adicionar novos tipos de exercício **somente na trilha**.

Arquivos prováveis:

- `src/services/vocabularyPractice.js`.
- `src/screens/FlashcardsScreen.jsx`, somente no render de `ActivityCard` se necessário.

Regras:

- Não tocar em `LessonAdaptiveCards`.
- Não alterar `lessonCards`.
- Não alterar conteúdo de aulas.
- Manter `intro`, `choice`, `listen` e `build` funcionando.
- Adicionar tipos novos de forma compatível com `scoreVocabularyPractice`.

Ordem pedagógica sugerida:

1. `intro` — ver frase modelo.
2. `phrase_gap` — completar lacuna em frase.
3. `choice` — reconhecer sentido.
4. `pair` — associar palavra/frase/tradução.
5. `phrase_translate` — montar frase PT→EN com banco.
6. `type_word` — digitar palavra/chunk.
7. `translate_sentence` — produção final simples.

### 2. BLOCO-VOCAB-SRS-REVIEW-SESSION

Objetivo: transformar `dueItems`/`weakItems` em sessão própria de revisão urgente dentro da trilha.

Arquivos prováveis:

- `src/services/vocabularySrs.js`.
- `src/services/vocabularyPractice.js`.
- `src/screens/FlashcardsScreen.jsx`, apenas no escopo de `Trilha de vocabulário`.

Regras:

- O card “Revisão espaçada” deve abrir uma sessão de revisão da trilha.
- Não misturar com `Flashcards da aula`.
- Não resetar progresso de bolhas.

### 3. BLOCO-VOCAB-SRS-WEAK-INJECTION

Objetivo: injetar palavras fracas nas próximas bolhas com limite e sem bagunçar progressão.

Arquivos prováveis:

- `src/services/vocabularyPath.js`.
- `src/services/vocabularySrs.js`.

Regras:

- Manter `BUBBLE_SIZE` previsível.
- Injetar poucos itens fracos por sessão.
- Não bloquear avanço por excesso de revisão.
- Registrar no log da sessão.

### 4. BLOCO-VOCAB-TRAIL-UX-POLISH

Objetivo: melhorar a experiência visual premium da trilha.

Arquivos prováveis:

- `src/screens/FlashcardsScreen.jsx`.
- `src/styles/flashcards-polish.css` ou novo CSS temático importado por `flashcards.css`.

Regras:

- Não importar CSS direto no `main.jsx`.
- Preservar H4/CSS consolidation.
- Garantir iPhone 13/SE.

### 5. BLOCO-VOCAB-EXPANSION-AUDIT-A1-C2

Objetivo: auditar e expandir decks até a meta planejada.

Arquivos prováveis:

- `src/data/vocabulary/fixedExpansionA1A2.js`.
- `src/data/vocabulary/fixedExpansionB1B2.js`.
- `src/data/vocabulary/fixedExpansionC1C2.js`.
- `src/services/vocabularyCurriculumAudit.js`, se necessário.

Regras:

- Não mexer em aulas.
- Usar auditoria curricular de vocabulário.
- Evitar duplicações graves.

### 6. BLOCO-VOCAB-FINAL-AUDIT

Objetivo: auditar a aba Cartas/Vocabulário depois dos blocos principais.

Deve validar:

- Trilha funciona no iPhone 13.
- Flashcards da aula continuam intactos.
- Sem regressão de navegação.
- Sem CSS global perigoso.
- Sem vazamento de resposta nos exercícios.
- SRS salva e retorna corretamente.

## Decisão operacional deste bloco

O próximo bloco de implementação deve ser:

`BLOCO-VOCAB-SENTENCE-FIRST-EXERCISES — Frase como protagonista na aba Cartas`

Mas a implementação deve ser restrita à **Trilha de vocabulário**, não aos Flashcards da aula.

## Resultado

Auditoria concluída. O plano Vocab Trail Superior é compatível com a `main`, mas deve ser aplicado em blocos pequenos e modulares.

O estado atual já tem uma base forte, então o risco principal não é falta de estrutura; é mexer demais em `FlashcardsScreen.jsx` e quebrar a segunda função da aba Cartas. Por isso, qualquer implementação deve preservar explicitamente a separação:

- Trilha de vocabulário: evoluir.
- Flashcards da aula: preservar.
