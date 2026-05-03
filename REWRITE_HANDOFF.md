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

## DIRETRIZ DE UI — NÃO POLUIR A AULA

- Regras internas, contrato JSON, política pedagógica, diagnóstico técnico e detalhes de implementação não devem aparecer como cards grandes dentro da aula.
- A aula deve mostrar apenas o que ajuda o aluno a estudar.
- Informações técnicas devem ficar no código, handoff, docs ou diagnóstico apropriado.
- Quando for necessário mostrar segurança/estado, usar texto curto e discreto.

## DIRETRIZ DE UI APROVADA — STEPPER REAL

- O stepper real da Reading foi aprovado visualmente pelo usuário.
- O padrão foi portado para Grammar e Listening.
- A adaptação deve respeitar a natureza de cada aula.
- Grammar não deve virar jogo; deve ser sério, claro e guiado.
- Listening deve manter primeira escuta sem leitura e controles de áudio limpos.

## ESTADO ATUAL — READING

### `BLOCO-READING-COMPLETE-RENDER-REVIEW-LAB` — IMPLEMENTADO

- Reestruturou o render de Reading em `ReadingLesson.jsx`.
- Adicionou texto principal dividido, vocabulário em contexto, perguntas com evidência textual, produção curta e render seguro.
- Criou estilos modulares em `fluency-clean/src/styles/reading-complete-render-review.css`.
- Importou o estilo em `main.jsx`.
- Criou documentação em `fluency-clean/docs/BLOCO-READING-COMPLETE-RENDER-REVIEW-LAB.md`.

### `BLOCO-READING-1 — Estrutura pedagógica fixa da aba Reading` — IMPLEMENTADO

- Reading agora deve ser uma aula completa dentro da própria aba.
- A Prática Profunda é complemento posterior, não substitui os exercícios internos da Reading.
- Adicionada ordem oficial da aula Reading: objetivo, pré-leitura, texto principal, ideia geral, vocabulário em contexto, compreensão/evidência, produção curta e conclusão.
- Em `LessonScreen.jsx`, a Prática Profunda aparece depois da aula quando `lesson.type === 'reading'`.
- Criada documentação em `fluency-clean/docs/BLOCO-READING-1-ESTRUTURA-PEDAGOGICA-FIXA-LAB.md`.

### `BLOCO-READING-2 — Política por nível A1→C1` — IMPLEMENTADO

- Criado `fluency-clean/src/reading/readingLevelPolicy.js`.
- Definidos níveis A1, A2, B1, B2 e C1.
- Definidas habilidades oficiais de Reading: `main_idea`, `detail`, `vocabulary_context`, `sequence`, `evidence`, `inference`, `author_purpose`, `fact_opinion`, `tone`, `implication`, `critical_response`.
- Cada nível agora tem objetivo, faixa ideal de palavras, idioma das perguntas, suporte linguístico, tipos de texto, habilidades, mistura mínima de perguntas, produção final e tom da aula.
- A produção curta usa internamente a instrução definida pela política do nível.
- Criada documentação em `fluency-clean/docs/BLOCO-READING-2-POLITICA-POR-NIVEL-A1-C1-LAB.md`.

### `HOTFIX-READING-2 — Remover poluição técnica da aula` — IMPLEMENTADO

- Removido o card visual `Plano do nível`.
- Mantida a política por nível funcionando internamente.
- Compactado o card lateral de segurança para `Aula segura`.
- Removidos estilos não usados.

### `BLOCO-READING-3 — Contrato JSON próprio de Reading` — IMPLEMENTADO

- Criado `fluency-clean/src/reading/readingJsonContract.js`.
- Criados campos próprios de Reading: `readingText`, `textGenre`, `readingPurpose`, `preReading`, `vocabulary`, `readingQuestions`, `evidenceTasks`, `postReadingPrompts`, `tips`.
- Criada compatibilidade com aulas antigas que usam `listeningText`/`transcript`.
- Criadas funções `normalizeReadingLessonContract`, `buildReadingJsonContractInstruction` e `assertReadingContract`.
- `ReadingLesson.jsx` normaliza a aula usando `normalizeReadingLessonContract` antes de renderizar.
- O contrato permanece interno e não aparece como card na aula.
- Criada documentação em `fluency-clean/docs/BLOCO-READING-3-CONTRATO-JSON-PROPRIO-LAB.md`.

### `BLOCO-READING-4 — Geração da aula Reading por habilidade` — IMPLEMENTADO

- `lessonJsonContract.js` importa `buildReadingJsonContractInstruction`.
- Quando `lessonType === 'reading'`, o prompt geral usa o contrato próprio de Reading.
- O prompt de Reading pede `readingText`, `textGenre`, `readingPurpose`, `preReading`, `readingQuestions`, `evidenceTasks` e `postReadingPrompts`.
- Mantida compatibilidade com o motor atual: `readingText` preenche `listeningText`, `readingQuestions` converte para `exercises`, `postReadingPrompts` converte para `prompts`.
- Se a IA gerar `readingQuestions`, elas viram fonte principal dos exercícios internos da Reading, preservando `skill`, `evidence`, `questionLanguage` e `difficulty`.
- `lessonTypes.js` preserva campos novos de Reading.
- Criada documentação em `fluency-clean/docs/BLOCO-READING-4-GERACAO-POR-HABILIDADE-LAB.md`.

### `BLOCO-READING-5 — Render por etapas` — IMPLEMENTADO

- `ReadingLesson.jsx` recebeu estado `activeStep`.
- Criado stepper da Reading com 8 etapas: começar, pré-leitura, texto, ideia geral, vocabulário, compreensão, produção e concluir.
- Cada etapa tem `id` próprio.
- Clicar numa etapa faz scroll suave até o bloco correspondente.
- Botões de avanço foram adicionados.
- O conteúdo continua visível; o stepper guia a leitura, mas não trava a aula.
- Ao concluir a aula, a etapa ativa vira `Concluir`.
- `reading-complete-render-review.css` recebeu estilos do stepper sticky, scroll horizontal no iPhone e destaque discreto.
- Criada documentação em `fluency-clean/docs/BLOCO-READING-5-RENDER-POR-ETAPAS-LAB.md`.

### `BLOCO-READING-6 — Exercícios internos da aba Reading` — IMPLEMENTADO

- Em `ReadingLesson.jsx`, adicionado bloco compacto `Exercícios de leitura` dentro de `Compreensão com evidência textual`.
- O bloco pode renderizar verdadeiro/falso, copiar evidência e resposta curta.
- Criadas funções internas `normalizeEvidenceTasks`, `buildTrueFalseTasks` e `buildShortAnswerTasks`.
- Criado componente `InternalReadingExercises`.
- O bloco usa `evidenceTasks` quando a IA fornecer.
- Quando não houver `evidenceTasks`, cria tarefas simples a partir das evidências das perguntas.
- Adicionado estado `exerciseDrafts` para respostas digitadas nos exercícios internos.
- `completeLesson` recebe `multipleChoice: selectedAnswers` e `internalExercises: exerciseDrafts`.
- Estilos adicionados em `reading-complete-render-review.css` para manter os exercícios compactos e mobile-first.
- Criada documentação em `fluency-clean/docs/BLOCO-READING-6-EXERCICIOS-INTERNOS-LAB.md`.

### `HOTFIX-READING-6 — Não revelar gabarito dos exercícios internos` — IMPLEMENTADO

- Em `reading-complete-render-review.css`, o gabarito dos exercícios internos deixou de aparecer imediatamente.
- Em verdadeiro/falso, resposta/evidência ficam ocultas por padrão e aparece uma orientação curta para pensar primeiro.
- Em exercícios digitados, apoio/modelo/evidência ficam ocultos por padrão e aparecem após interação/foco/digitação.
- Não foi adicionado card técnico.

### Próximo bloco Reading recomendado

`BLOCO-READING-7 — Evidência textual inteligente`

Objetivo:
- Melhorar o uso da evidência textual.
- Destacar/ancorar evidências no texto quando possível.
- Fazer botão para ir ao trecho do texto que prova a resposta.
- Manter tudo limpo e sem poluir a aula.

## ESTADO ATUAL — GRAMMAR

### `BLOCO-GRAMMAR-STEPPER-REAL-LAB` — IMPLEMENTADO

- Portado o padrão de stepper real aprovado na Reading para `GrammarLesson.jsx`.
- Adaptação feita para aula séria de gramática, sem gamificar.
- Criado `grammarFlowSteps` com 7 etapas:
  1. Começar
  2. Regra
  3. Exemplos
  4. Prática
  5. Correção
  6. Produção
  7. Concluir
- Criado estado `activeStep`.
- Criado componente `GrammarStepper`.
- Cada etapa tem `id` e scroll suave.
- Mantido render seguro atual de Grammar:
  - `normalizeSections`;
  - `collectProfessorExamples`;
  - `SectionContent`;
  - `ExampleCard`.
- Adicionadas seções próprias:
  - exemplos com padrão;
  - prática guiada;
  - correção e transformação;
  - conclusão.
- Criado CSS compartilhado em `fluency-clean/src/styles/lesson-type-stepper-real.css`.
- Importado CSS em `main.jsx`.
- Criada documentação em `fluency-clean/docs/BLOCO-GRAMMAR-STEPPER-REAL-LAB.md`.

Pendente validar no iPhone:
- Abrir aula Grammar real.
- Confirmar stepper com 7 etapas.
- Confirmar scroll horizontal no iPhone.
- Confirmar que a aula continua séria.
- Confirmar que exemplos continuam em cards.
- Confirmar prática guiada/correção/produção.
- Confirmar salvar e concluir.

## ESTADO ATUAL — LISTENING

### `BLOCO-LISTENING-STEPPER-REAL-LAB` — IMPLEMENTADO

- Portado o padrão de stepper real para `ListeningLessonClean.jsx`.
- Adaptação feita para aula de escuta, preservando primeira escuta sem leitura.
- Criado `listeningFlowSteps` com 8 etapas:
  1. Preparar
  2. 1ª escuta
  3. Compreensão
  4. Texto
  5. Vocabulário
  6. Shadowing
  7. Produção
  8. Concluir
- Criado estado `activeStep`.
- Criado componente `ListeningStepper`.
- Cada etapa aponta para parte real da aula.
- Clicar na etapa abre a seção correspondente quando necessário.
- Ao iniciar áudio, etapa ativa vira `1ª escuta`.
- Ao concluir, etapa ativa vira `Concluir`.
- Mantido sistema existente:
  - áudio natural;
  - fallback;
  - diálogo multi-voz;
  - transcrição controlada;
  - shadowing real.
- Criada documentação em `fluency-clean/docs/BLOCO-LISTENING-STEPPER-REAL-LAB.md`.

Pendente validar no iPhone:
- Usar `Testar Listening`.
- Confirmar stepper com 8 etapas.
- Confirmar scroll horizontal no iPhone.
- Confirmar que primeira escuta continua sem leitura.
- Confirmar que transcrição continua fechada no início.
- Confirmar áudio, diálogo, vocabulário, shadowing e conclusão.

## ALERTA IMPORTANTE — BLOCO QUE FOI ESQUECIDO NA LISTA ANTERIOR

O bloco de continuação do sistema de trilha/vocabulário estava faltando na lista anterior. Ele deve ficar entre Reading/Speaking e a correção final da prática profunda.

### `BLOCO-VOCAB-TRAIL-CONTINUATION-LAB` — PENDENTE

Objetivo:
- Continuar o sistema de trilha de vocabulário que estava sendo desenvolvido na aba `Cartas`.
- Separar definitivamente dois fluxos:
  1. `Trilha de vocabulário`: percurso longo por bolhas/tópicos/níveis;
  2. `Flashcards da aula`: revisão adaptativa da aula atual, acessada pelo botão superior.

## ORDEM DEFINIDA PELO USUÁRIO PARA OS PRÓXIMOS CHATS/BLOCOS

Próximos blocos:
1. Validar `BLOCO-GRAMMAR-STEPPER-REAL-LAB` no iPhone.
2. Validar `BLOCO-LISTENING-STEPPER-REAL-LAB` no iPhone.
3. Retomar Reading:
   - `BLOCO-READING-7 — Evidência textual inteligente`
   - `BLOCO-READING-8 — Quality gate Reading`

Depois retomar a ordem macro:
- `BLOCO-SPEAKING-COMPLETE-RENDER-REVIEW-LAB`
- `BLOCO-VOCAB-TRAIL-CONTINUATION-LAB`
- `BLOCO-PRACTICE-DEEP-SYSTEM-CORRECTION-LAB` — aguardar o usuário mandar o modelo antes de iniciar

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

"Continue a reconstrução do Fluency. Leia `REWRITE_HANDOFF.md` antes de qualquer alteração. A branch principal é `rewrite-fluency-clean-lab`. Não mexa em `main`, `rewrite-fluency-clean`, `bundle.js` ou backend Azure privado. Os últimos blocos implementados foram `BLOCO-GRAMMAR-STEPPER-REAL-LAB` e `BLOCO-LISTENING-STEPPER-REAL-LAB`. Validar no iPhone e depois retomar `BLOCO-READING-7 — Evidência textual inteligente`."
