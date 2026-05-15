# BLOCO-LESSON-UI-02B — Reading Study Experience LAB

Data: 2026-05-15
Branch: `rewrite-fluency-clean-lab`

## Status

Implementado.

## Objetivo

Aprimorar o Reading para ir além de uma mudança visual. O foco deste bloco foi criar sensação real de estudo: preparação, leitura ativa, tentativa, segunda leitura, evidência, vocabulário por contexto, produção, revisão e gate.

## Regra obrigatória — não resumir conteúdo premium

As novas UIs podem organizar, dividir, revelar em etapas e guiar o estudo, mas não podem cortar, resumir, compactar ou esconder definitivamente os conteúdos profundos criados para as aulas premium.

A UI deve adaptar o layout ao conteúdo, não adaptar o conteúdo ao layout.

Proibido:

- limitar listas profundas com `slice` só para a tela ficar menor;
- mostrar apenas os primeiros objetivos;
- mostrar apenas algumas perguntas quando a aula tem mais;
- remover vocabulário/contexto/produção/recap para caber no card;
- transformar aula profunda em resumo visual;
- descartar tarefas extras de produção.

Permitido:

- separar conteúdo em fases;
- usar rolagem interna controlada quando houver conteúdo grande;
- usar cards expansíveis no futuro;
- mostrar conteúdo em blocos progressivos;
- exigir tentativas antes de avançar.

## Problema resolvido

O bloco anterior (`BLOCO-LESSON-UI-02`) aplicou o visual premium glass inspirado no Lovable e separou Reading em etapas básicas.

Este bloco aprofunda a pedagogia da aula para evitar que o aluno apenas clique em cards bonitos.

## Nova ordem pedagógica do Reading

1. `overview` — missão da aula
2. `prepare` — preparação antes de ler
3. `text` — leitura limpa sem perguntas
4. `comprehension` — primeira compreensão de memória
5. `focus` — segunda leitura com foco
6. `evidence` — resposta com evidência textual
7. `context` — vocabulário pelo contexto
8. `summary` — resumo e produção conectada
9. `recap` — revisão final do caminho estudado
10. `mastery` — Mastery Gate visual

## Arquivos alterados

- `fluency-clean/src/lessons/flow/reading/ReadingLessonFlow.jsx`
- `fluency-clean/src/lessons/flow/reading/reading-lesson-flow.css`

## O que mudou no componente

### Novas etapas

Foram adicionadas:

- `PrepareStage`
- `FocusStage`
- `ContextStage`
- `RecapStage`

### Novos elementos de estudo

- `CoachNote`
- `readingMission`
- `focus-*`
- `contextInsight`
- `finalReflection`
- checklist pedagógico expandido

### Preservação de conteúdo profundo

Foram removidos limites agressivos que poderiam resumir a aula:

- objetivos não são mais limitados a 4;
- preparação não é mais limitada a 5 itens;
- compreensão não é mais limitada a 3 perguntas;
- segunda leitura não é mais limitada a 4 tarefas;
- evidências não são mais limitadas a 4 questões;
- vocabulário/contexto não é mais limitado a 6 itens;
- produção não é mais limitada a 4 tarefas;
- recap não é mais limitado a 5 itens.

Quando houver tarefas extras de produção, elas são renderizadas como `Tarefa extra da aula profunda`.

### Gate expandido

O Mastery Gate agora avalia:

- missão de leitura definida;
- texto lido sem perguntas;
- compreensão de memória tentada;
- segunda leitura com foco feita;
- evidência registrada;
- vocabulário conectado ao contexto;
- resumo feito;
- produção conectada feita;
- revisão final registrada.

## Campos de aula usados

A UI continua adaptada para aulas Reading profundas e tenta aproveitar:

- `readingPurpose`
- `teacherOpening`
- `intro`
- `objectives`
- `readingStrategy`
- `preReading`
- `preReadingTasks`
- `beforeReading`
- `preReadingVocabulary`
- `vocabulary`
- `keyVocabulary`
- `contextVocabularyTasks`
- `vocabularyInContext`
- `mainText`
- `firstReadTask`
- `firstReadTasks`
- `comprehensionQuestions`
- `secondReadTasks`
- `readingFocusTasks`
- `detailQuestions`
- `evidenceQuestions`
- `guidedSummary`
- `connectedProduction`
- `productionTask`
- `productionTasks`
- `lessonRecap`

## Regras pedagógicas agora reforçadas

- Antes de ler, o aluno define uma missão de leitura.
- A leitura principal fica isolada.
- Perguntas continuam fora da tela de texto.
- A primeira compreensão é feita de memória.
- A segunda leitura volta ao texto com foco.
- Evidência textual é obrigatória.
- Vocabulário é estudado pelo contexto, não como lista solta.
- Produção vem depois da leitura e da evidência.
- Revisão final obriga o aluno a perceber o caminho de estudo.
- Gate visual fica mais exigente.
- Conteúdo profundo é preservado, mesmo que gere mais rolagem dentro de uma fase.

## CSS novo/adaptado

Foram adicionados estilos para:

- coach notes;
- caminho de estudo;
- preparação de leitura;
- texto mini para segunda leitura;
- vocabulário contextual;
- recap pedagógico;
- stepper com mais etapas em mobile.

## O que não foi feito

- Não alterei Listening.
- Não alterei Speaking.
- Não alterei Writing.
- Não alterei Grammar.
- Não alterei Vocabulary.
- Não mexi em Azure/Firebase/backend.
- Não mexi em `bundle.js`.
- Não usei DOM injection.
- Não conectei novas dependências do Lovable.

## Próximo passo recomendado

Testar Reading no app/preview.

Depois de aprovado, seguir para:

`BLOCO-LESSON-UI-03-LISTENING-FLOW-LAB`

Mas antes de codar Listening, gerar um super prompt específico para Lovable com foco em:

- áudio primeiro;
- transcript bloqueado;
- primeira escuta sem texto;
- segunda escuta com foco;
- dictation;
- compreensão auditiva;
- shadowing;
- transcript liberado depois;
- produção oral curta;
- gate específico de Listening.

## Pendência

Build/check ainda precisa ser executado em ambiente local ou Vercel.
