# Fluency Clean Rewrite — Handoff LAB

Branch atual de trabalho: `rewrite-fluency-clean-lab`

Branch estável protegida: `rewrite-fluency-clean`

## REGRA MÁXIMA

- Não mexer em `main` diretamente.
- Não mexer em `rewrite-fluency-clean` sem validação prévia na lab.
- Não mexer em `bundle.js`.
- Não criar bundle patch.
- Não usar DOM injection.
- Não usar HTML remendado.
- Não mexer no backend Azure privado.
- Manter tudo modular em `fluency-clean/src/`, `fluency-clean/public/` ou arquivos reais de configuração.

## ALERTA IMPORTANTE — BLOCO QUE FOI ESQUECIDO NA LISTA ANTERIOR

O bloco de continuação do sistema de trilha/vocabulário estava faltando na lista anterior. Ele deve ficar entre Reading/Speaking e a correção final da prática profunda.

### `BLOCO-VOCAB-TRAIL-CONTINUATION-LAB` — PENDENTE

Objetivo:
- Continuar o sistema de trilha de vocabulário que estava sendo desenvolvido na aba `Cartas`.
- Separar definitivamente dois fluxos:
  1. `Trilha de vocabulário`: percurso longo por bolhas/tópicos/níveis;
  2. `Flashcards da aula`: revisão adaptativa da aula atual, acessada pelo botão superior.

Escopo recomendado:
- Validar visual da aba Cartas no iPhone.
- Remover qualquer duplicação de `Flashcards da aula` dentro da lista da trilha.
- Manter apenas o botão superior `Flashcards da aula` ao lado de `Trilha de vocabulário`.
- Continuar construção da trilha:
  - bolhas por tópico;
  - desbloqueio progressivo;
  - níveis por bolha;
  - revisão espaçada;
  - progresso real;
  - integração com tarefas do dia.
- Melhorar a tela de estudo da bolha:
  - palavras novas;
  - tradução visual;
  - áudio;
  - exercícios de fixação;
  - conclusão da bolha;
  - registro no progresso.
- Garantir que a trilha não dependa da aula do dia.
- Garantir que os flashcards da aula não se misturem com a trilha.

Critérios:
- Não quebrar a aba `Aula`.
- Não quebrar a prática profunda.
- Não misturar cards da aula com cards da trilha.
- Não usar dados fictícios como se fossem progresso real.

Últimos ajustes relacionados:
- Botão superior `Flashcards da aula` passou a aparecer quando há vocabulário da aula.
- Botão duplicado dentro de `Tópicos por nível` foi removido por CSS.
- Ainda precisa validação no iPhone depois do deploy.

## ORDEM DEFINIDA PELO USUÁRIO PARA OS PRÓXIMOS CHATS/BLOCOS

1. `BLOCO-READING-COMPLETE-RENDER-REVIEW-LAB`
2. `BLOCO-SPEAKING-COMPLETE-RENDER-REVIEW-LAB`
3. `BLOCO-VOCAB-TRAIL-CONTINUATION-LAB`
4. `BLOCO-PRACTICE-DEEP-SYSTEM-CORRECTION-LAB` — aguardar o usuário mandar o modelo antes de iniciar

## BLOCOS PENDENTES POR ORDEM DE IMPORTÂNCIA

### 1. `HOTFIX-VALIDATION-UI-CARDS-PRACTICE-LAB`

Status: pendente de validação no iPhone.

Objetivo:
- Confirmar que os últimos hotfixes de UI realmente apareceram no Vercel preview.

Checklist:
- Botão duplicado `Flashcards da aula` dentro de `Tópicos por nível` deve sumir.
- Deve ficar apenas o botão superior ao lado de `Trilha de vocabulário`.
- Botão `Começar prática` deve estar visualmente aceitável e não quebrado.
- Número de exercícios da aula deve bater com a prática profunda.
- Minutos da tela Hoje e tela Aula devem bater ou ficar coerentes.

### 2. `BLOCO-READING-COMPLETE-RENDER-REVIEW-LAB`

Status: próximo bloco de desenvolvimento real.

Objetivo:
- Reestruturar Reading completamente, com padrão semelhante ao cuidado aplicado em Grammar e Listening.

Escopo:
- Revisar `ReadingLesson.jsx` e estilos relacionados.
- Criar estrutura mobile-first, limpa e premium.
- Separar texto principal, vocabulário em contexto, perguntas e evidência textual.
- Melhorar renderização de textos longos.
- Criar proteção contra perguntas genéricas.
- Garantir que Reading treine leitura real.
- Integrar corretamente com prática profunda sem vazar respostas.

### 3. `BLOCO-SPEAKING-COMPLETE-RENDER-REVIEW-LAB`

Status: deve vir imediatamente depois do Reading.

Objetivo:
- Revisar Speaking de ponta a ponta, mantendo backend Azure privado intocado.

Escopo:
- Melhorar UI do Speaking.
- Melhorar fluxo de fala/resposta.
- Garantir estado visual claro: ouvir, gravar, responder, repetir, concluir.
- Criar experiência segura para A1.
- Manter integração com Azure sem alterar backend.
- Evitar tela poluída e botões redundantes.

### 4. `BLOCO-VOCAB-TRAIL-CONTINUATION-LAB`

Status: pendente e agora recolocado na ordem correta.

Objetivo:
- Continuar a trilha de vocabulário/Cartas.
- Finalizar a separação entre trilha e flashcards da aula.
- Desenvolver progressão por bolhas, revisão espaçada e tarefas do dia.

### 5. `BLOCO-PRACTICE-DEEP-SYSTEM-CORRECTION-LAB`

Status: aguardar modelo do usuário.

Objetivo:
- Corrigir o sistema de prática profunda com base no modelo que o usuário vai enviar.

Base de referência:
- `PRACTICE_DEEP_STRUCTURE.md`

Escopo provável:
- Auditar `PracticePlanAdapter.js`.
- Garantir que cada tipo de aula tenha exercícios próprios:
  - Grammar: estrutura, correção, transformação, produção curta.
  - Listening: escuta, ditado, quem falou, compreensão auditiva, shadowing.
  - Reading: ideia principal, detalhes, evidência textual, vocabulário em contexto.
  - Speaking: repetição, resposta oral curta, mini diálogo, fluidez.
  - Writing: frase guiada, ordem de palavras, correção, reescrita.
- Remover exercícios genéricos demais.
- Impedir respostas vazadas.
- Adaptar dificuldade ao nível A1.

### 6. `BLOCO-PRACTICE-RENDER-SAFETY-GATE-LAB`

Status: depois da correção da prática profunda.

Objetivo:
- Criar trava de segurança antes de renderizar exercícios.

Escopo:
- Detectar resposta vazada no enunciado.
- Validar opções duplicadas ou inválidas.
- Rebaixar exercício avançado demais para A1.
- Converter exercício quebrado em fallback simples.
- Nunca deixar exercício quebrado travar a aula.

### 7. `BLOCO-LISTENING-FINAL-APPROVAL-LAB`

Status: Listening parece funcional, mas ainda precisa aprovação final do usuário.

Checklist:
- Player prepara e toca corretamente no iPhone.
- Cache IndexedDB funciona.
- Primeira escuta continua sem leitura.
- Diálogo multi-voz funciona.
- Pronúncia está aceitável com `pronunciationGuard.js`.
- UI não está poluída.

### 8. `BLOCO-TEMP-PREVIEW-CLEANUP-LAB`

Status: futuro, somente depois que Reading, Listening e Speaking estiverem aprovados.

Objetivo:
- Remover ou esconder o seletor temporário de teste:
  - `Aula real`
  - `Testar Listening`
  - `Testar Diálogo`
  - `Testar Reading`
  - `Abrir Speaking`

### 9. `BLOCO-LAB-PROMOTION-PREP-LAB`

Status: futuro.

Objetivo:
- Preparar promoção controlada da lab para branch estável, sem mexer direto na main.

## ESTADO ATUAL — UI CARDS / PRÁTICA / STATS

### `HOTFIX-PRACTICE-CTA-CARDS-SEPARATION-LAB` — PARCIALMENTE IMPLEMENTADO E EM VALIDAÇÃO

Motivação:
- Usuário apontou que:
  - botão `Começar prática` estava feio/bugado;
  - flashcards adaptativos da aula tinham sumido;
  - a aba Cartas não deveria misturar `Flashcards da aula` dentro da trilha;
  - minutos e quantidade de exercícios estavam inconsistentes.

O que foi feito:
- `lessonStats.js` passou a usar `PracticePlanAdapter` para contagem de exercícios.
- `LessonScreen.jsx` passou a usar `getLessonStats`.
- `TodayScreen.jsx` passou a tentar carregar aula completa via IndexedDB antes de calcular tempo/cards.
- `FlashcardsScreen.jsx` passou a carregar `getCurrentLessonFull()` para achar vocabulário real da aula.
- Adicionado fallback para gerar cards da aula a partir de termos importantes quando a aula não tiver vocabulário estruturado.
- Criado botão superior `Flashcards da aula` ao lado de `Trilha de vocabulário`.
- Removido por CSS o botão duplicado dentro de `Tópicos por nível`.

Pendente:
- Usuário validar no iPhone após deploy.

## ESTADO ANTERIOR — LISTENING

### `HOTFIX-LISTENING-CLEANER-BLIND-NOTE-LAB` — IMPLEMENTADO

- Estado inicial `message` mudou de texto fixo para string vazia.
- A mensagem `<small>` agora só aparece quando houver status real do áudio/player.
- Nota de primeira escuta foi encurtada para:
  - `Primeira escuta sem leitura. Abra o texto só depois de ouvir.`

### `BLOCO-TTS-PRONUNCIATION-GUARD-EXPANSION-LAB` — IMPLEMENTADO

- `pronunciationGuard.js` expandido com nomes brasileiros, frases A1/A2, palavras sensíveis, sons com `you`, contrações e spelling.

### `HOTFIX-LISTENING-CLEAN-PLAYER-INDEXEDDB-CACHE-LAB` — IMPLEMENTADO

- Separou preparo e reprodução do áudio para evitar bloqueio/autoplay no iPhone.
- Criou cache IndexedDB para áudios grandes.
- Removeu card poluído de controle por fala/trecho.

## ESTADO ANTERIOR — GRAMMAR

### `BLOCO-GRAMMAR-APPROVAL-LAB` — IMPLEMENTADO

Status:
- Grammar aprovada visualmente na branch `rewrite-fluency-clean-lab`.

## NÃO FAZER AGORA

- Não implementar Cirurgia 3 ainda.
- Não mexer no `deepGrammarPipeline.js`.
- Não relaxar o professor revisor.
- Não portar Pro para keys free.
- Não compactar conteúdo pedagógico.
- Não alterar política de chaves agora.
- Não mexer em `main`, `rewrite-fluency-clean`, `bundle.js` ou backend Azure privado.
- Não remover o preview temporário até o usuário aprovar ou pedir remoção.
- Não iniciar correção profunda da prática antes de o usuário mandar o modelo prometido.

## Como continuar em outro chat

"Continue a reconstrução do Fluency. Leia `REWRITE_HANDOFF.md` antes de qualquer alteração. A branch principal é `rewrite-fluency-clean-lab`. Não mexa em `main`, `rewrite-fluency-clean`, `bundle.js` ou backend Azure privado. O plano definido pelo usuário é: primeiro fazer `BLOCO-READING-COMPLETE-RENDER-REVIEW-LAB`, depois `BLOCO-SPEAKING-COMPLETE-RENDER-REVIEW-LAB`, depois `BLOCO-VOCAB-TRAIL-CONTINUATION-LAB`, e depois aguardar o usuário mandar um modelo para `BLOCO-PRACTICE-DEEP-SYSTEM-CORRECTION-LAB`. Antes de começar, validar se o hotfix de Cards removeu o botão duplicado de Flashcards da aula dentro de Tópicos por nível."
