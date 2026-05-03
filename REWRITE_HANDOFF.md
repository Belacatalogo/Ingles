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

- Reading é uma aula completa dentro da própria aba.
- A Prática Profunda é complemento posterior, não substitui os exercícios internos da Reading.
- Ordem oficial: objetivo, pré-leitura, texto principal, ideia geral, vocabulário em contexto, compreensão/evidência, produção curta e conclusão.
- Em `LessonScreen.jsx`, a Prática Profunda aparece depois da aula quando `lesson.type === 'reading'`.
- Criada documentação em `fluency-clean/docs/BLOCO-READING-1-ESTRUTURA-PEDAGOGICA-FIXA-LAB.md`.

### `BLOCO-READING-2 — Política por nível A1→C1` — IMPLEMENTADO

- Criado `fluency-clean/src/reading/readingLevelPolicy.js`.
- Definidos níveis A1, A2, B1, B2 e C1.
- Definidas habilidades oficiais: `main_idea`, `detail`, `vocabulary_context`, `sequence`, `evidence`, `inference`, `author_purpose`, `fact_opinion`, `tone`, `implication`, `critical_response`.
- A produção curta usa internamente a instrução definida pela política do nível.
- Criada documentação em `fluency-clean/docs/BLOCO-READING-2-POLITICA-POR-NIVEL-A1-C1-LAB.md`.

### `HOTFIX-READING-2 — Remover poluição técnica da aula` — IMPLEMENTADO

- Removido o card visual `Plano do nível`.
- Mantida a política por nível funcionando internamente.
- Compactado o card lateral de segurança para `Aula segura`.

### `BLOCO-READING-3 — Contrato JSON próprio de Reading` — IMPLEMENTADO

- Criado `fluency-clean/src/reading/readingJsonContract.js`.
- Campos próprios: `readingText`, `textGenre`, `readingPurpose`, `preReading`, `vocabulary`, `readingQuestions`, `evidenceTasks`, `postReadingPrompts`, `tips`.
- Compatibilidade com aulas antigas que usam `listeningText`/`transcript`.
- Criadas funções `normalizeReadingLessonContract`, `buildReadingJsonContractInstruction` e `assertReadingContract`.
- `ReadingLesson.jsx` normaliza a aula usando `normalizeReadingLessonContract` antes de renderizar.
- O contrato permanece interno e não aparece como card na aula.
- Criada documentação em `fluency-clean/docs/BLOCO-READING-3-CONTRATO-JSON-PROPRIO-LAB.md`.

### `BLOCO-READING-4 — Geração da aula Reading por habilidade` — IMPLEMENTADO

- `lessonJsonContract.js` importa `buildReadingJsonContractInstruction`.
- Quando `lessonType === 'reading'`, o prompt geral usa o contrato próprio de Reading.
- O prompt pede `readingText`, `textGenre`, `readingPurpose`, `preReading`, `readingQuestions`, `evidenceTasks` e `postReadingPrompts`.
- Compatibilidade: `readingText` preenche `listeningText`, `readingQuestions` converte para `exercises`, `postReadingPrompts` converte para `prompts`.
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
- O bloco usa `evidenceTasks` quando a IA fornecer; se não houver, cria tarefas simples a partir das evidências das perguntas.
- Adicionado estado `exerciseDrafts` para respostas digitadas nos exercícios internos.
- `completeLesson` recebe `multipleChoice: selectedAnswers` e `internalExercises: exerciseDrafts`.
- Criada documentação em `fluency-clean/docs/BLOCO-READING-6-EXERCICIOS-INTERNOS-LAB.md`.

### `HOTFIX-READING-6 — Não revelar gabarito dos exercícios internos` — IMPLEMENTADO

- Em `reading-complete-render-review.css`, o gabarito dos exercícios internos deixou de aparecer imediatamente.
- Em verdadeiro/falso, resposta/evidência ficam ocultas por padrão e aparece uma orientação curta para pensar primeiro.
- Em exercícios digitados, apoio/modelo/evidência ficam ocultos por padrão e aparecem após interação/foco/digitação.
- Não foi adicionado card técnico.

### `BLOCO-READING-7 — Evidência textual inteligente` — IMPLEMENTAÇÃO INICIAL SEGURA

- Aplicada a parte visual segura em `reading-complete-render-review.css`.
- Feedback de evidência agora fica como cartão de prova mais claro, com borda/fundo discreto e orientação curta.
- Adicionados estilos preparados para parágrafos-alvo:
  - `p:target`;
  - `.reading-evidence-target`.
- Quando o próximo hotfix funcional marcar o parágrafo correto, ele poderá exibir selo `Trecho de prova`.
- Nenhum card técnico foi adicionado.
- Stepper e exercícios internos permanecem preservados.
- Criada documentação em `fluency-clean/docs/BLOCO-READING-7-EVIDENCIA-TEXTUAL-INTELIGENTE-LAB.md`.

Pendente para fechar 100% o bloco:
- `HOTFIX-READING-7-ANCHOR-EVIDENCE-LAB`.
- Alterar `ReadingLesson.jsx` para marcar cada parágrafo com `id` estável.
- Descobrir qual parágrafo contém a evidência.
- Adicionar botão `Ir ao trecho` ou equivalente dentro do feedback/evidência.
- Destacar temporariamente o parágrafo correto usando estado React, sem DOM injection.

### `BLOCO-READING-8 — Quality gate Reading` — IMPLEMENTADO

- Criado `fluency-clean/src/reading/readingQualityGate.js`.
- Exporta `applyReadingQualityGate(rawLesson)` e `assertReadingQualityGate(gatedLesson)`.
- Quality gate verifica/normaliza:
  - `readingText` vazio ou curto demais;
  - perguntas sem enunciado;
  - perguntas sem resposta;
  - resposta vazada no enunciado;
  - alternativas duplicadas;
  - resposta correta ausente nas opções;
  - evidência ausente;
  - evidência que não aparece no texto;
  - ausência de pré-leitura;
  - ausência de produção pós-leitura.
- Quality gate cria reparos seguros quando possível:
  - remove perguntas quebradas;
  - adiciona resposta correta às opções se faltar;
  - infere evidência pelo texto quando possível;
  - cria `evidenceTasks` a partir das perguntas;
  - cria pré-leitura padrão;
  - cria produção curta padrão.
- `readingJsonContract.js` agora importa `applyReadingQualityGate`.
- `normalizeReadingLessonContract(rawLesson)` agora retorna `applyReadingQualityGate(buildNormalizedReadingLesson(rawLesson))`.
- Não foi mexido no render aprovado de `ReadingLesson.jsx`.
- Não foi adicionado card técnico de quality gate na aula.
- Criada documentação em `fluency-clean/docs/BLOCO-READING-8-QUALITY-GATE-LAB.md`.

Pendente validar no iPhone:
- Usar `Testar Reading`.
- Confirmar que a aula ainda abre.
- Confirmar que texto, perguntas, evidências, exercícios internos, stepper e conclusão continuam funcionando.
- Confirmar que não apareceu card técnico de quality gate.

## ESTADO ATUAL — GRAMMAR

### `BLOCO-GRAMMAR-STEPPER-REAL-LAB` — IMPLEMENTADO

- Portado o padrão de stepper real aprovado na Reading para `GrammarLesson.jsx`.
- Adaptação feita para aula séria de gramática, sem gamificar.
- Criado `grammarFlowSteps` com 7 etapas: começar, regra, exemplos, prática, correção, produção e concluir.
- Criado estado `activeStep` e componente `GrammarStepper`.
- Cada etapa tem `id` e scroll suave.
- Mantido render seguro atual de Grammar: `normalizeSections`, `collectProfessorExamples`, `SectionContent`, `ExampleCard`.
- Adicionadas seções próprias: exemplos com padrão, prática guiada, correção/transformação e conclusão.
- Criado CSS compartilhado em `fluency-clean/src/styles/lesson-type-stepper-real.css`.
- Importado CSS em `main.jsx`.
- Criada documentação em `fluency-clean/docs/BLOCO-GRAMMAR-STEPPER-REAL-LAB.md`.

Pendente validar no iPhone:
- Abrir aula Grammar real.
- Confirmar stepper com 7 etapas, scroll horizontal, exemplos em cards, prática/correção/produção, salvar e concluir.

## ESTADO ATUAL — LISTENING

### `BLOCO-LISTENING-STEPPER-REAL-LAB` — IMPLEMENTADO

- Portado o padrão de stepper real para `ListeningLessonClean.jsx`.
- Adaptação feita para aula de escuta, preservando primeira escuta sem leitura.
- Criado `listeningFlowSteps` com 8 etapas: preparar, 1ª escuta, compreensão, texto, vocabulário, shadowing, produção e concluir.
- Criado estado `activeStep` e componente `ListeningStepper`.
- Cada etapa aponta para parte real da aula.
- Clicar na etapa abre a seção correspondente quando necessário.
- Ao iniciar áudio, etapa ativa vira `1ª escuta`; ao concluir, vira `Concluir`.
- Mantido sistema existente: áudio natural, fallback, diálogo multi-voz, transcrição controlada e shadowing real.
- Criada documentação em `fluency-clean/docs/BLOCO-LISTENING-STEPPER-REAL-LAB.md`.

Pendente validar no iPhone:
- Usar `Testar Listening`.
- Confirmar stepper com 8 etapas, scroll horizontal, primeira escuta sem leitura, transcrição fechada no início, áudio, diálogo, vocabulário, shadowing e conclusão.

## ALERTA IMPORTANTE — VOCAB/TRILHA

### `BLOCO-VOCAB-TRAIL-CONTINUATION-LAB` — PENDENTE

Objetivo:
- Continuar o sistema de trilha de vocabulário que estava sendo desenvolvido na aba `Cartas`.
- Separar definitivamente `Trilha de vocabulário` de `Flashcards da aula`.

## ORDEM DEFINIDA PELO USUÁRIO PARA OS PRÓXIMOS CHATS/BLOCOS

Próximos blocos:
1. Validar Reading no iPhone depois do quality gate.
2. Validar `BLOCO-GRAMMAR-STEPPER-REAL-LAB` no iPhone.
3. Validar `BLOCO-LISTENING-STEPPER-REAL-LAB` no iPhone.
4. Fazer `HOTFIX-READING-7-ANCHOR-EVIDENCE-LAB` somente quando for possível alterar `ReadingLesson.jsx` completo com segurança.
5. Depois seguir para `BLOCO-SPEAKING-COMPLETE-RENDER-REVIEW-LAB`.

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

"Continue a reconstrução do Fluency. Leia `REWRITE_HANDOFF.md` antes de qualquer alteração. A branch principal é `rewrite-fluency-clean-lab`. Não mexa em `main`, `rewrite-fluency-clean`, `bundle.js` ou backend Azure privado. O último bloco implementado foi `BLOCO-READING-8 — Quality gate Reading`. Validar Reading, Grammar stepper e Listening stepper no iPhone. Depois seguir para `BLOCO-SPEAKING-COMPLETE-RENDER-REVIEW-LAB`, ou voltar ao `HOTFIX-READING-7-ANCHOR-EVIDENCE-LAB` apenas se for possível alterar `ReadingLesson.jsx` completo com segurança."
