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

Objetivo:
- Fazer novas aulas Reading serem pedidas ao Gemini com contrato próprio, habilidades de leitura e evidência textual.

O que foi feito:
- `lessonJsonContract.js` agora importa `buildReadingJsonContractInstruction`.
- Quando `lessonType === 'reading'`, o prompt geral usa o contrato próprio de Reading.
- O prompt de Reading agora pede:
  - `readingText`;
  - `textGenre`;
  - `readingPurpose`;
  - `preReading`;
  - `readingQuestions`;
  - `evidenceTasks`;
  - `postReadingPrompts`.
- Mantida compatibilidade com o motor atual:
  - `readingText` preenche `listeningText` quando necessário;
  - `readingQuestions` converte para `exercises`;
  - `postReadingPrompts` converte para `prompts`.
- Se a IA gerar `readingQuestions`, elas passam a ser a fonte principal dos exercícios internos da Reading, preservando `skill`, `evidence`, `questionLanguage` e `difficulty`.
- `lessonTypes.js` agora preserva campos novos de Reading:
  - `readingText`;
  - `textGenre`;
  - `readingPurpose`;
  - `preReading`;
  - `readingQuestions`;
  - `evidenceTasks`;
  - `postReadingPrompts`.
- Criada documentação em `fluency-clean/docs/BLOCO-READING-4-GERACAO-POR-HABILIDADE-LAB.md`.

Pendente validar no iPhone:
- Gerar uma nova aula Reading real por IA.
- Confirmar que a aula não quebrou.
- Confirmar que aparecem perguntas com rótulos de habilidade.
- Confirmar que aparece evidência textual quando disponível.
- Confirmar que não apareceu card técnico de contrato/política.
- Confirmar que a Prática Profunda continua abaixo como complemento.

### Próximo bloco recomendado

`BLOCO-READING-5 — Render por etapas`

Objetivo:
- Transformar a aba Reading em uma experiência guiada por etapas reais:
  1. Começar leitura;
  2. Pré-leitura;
  3. Ler texto;
  4. Ideia geral;
  5. Vocabulário;
  6. Compreensão;
  7. Produção curta;
  8. Concluir.

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
- Continuar construção da trilha com bolhas por tópico, desbloqueio progressivo, níveis por bolha, revisão espaçada, progresso real e integração com tarefas do dia.
- Melhorar a tela de estudo da bolha com palavras novas, tradução visual, áudio, exercícios de fixação, conclusão da bolha e registro no progresso.
- Garantir que a trilha não dependa da aula do dia.
- Garantir que os flashcards da aula não se misturem com a trilha.

## ORDEM DEFINIDA PELO USUÁRIO PARA OS PRÓXIMOS CHATS/BLOCOS

Plano atual de Reading em andamento:
1. `BLOCO-READING-5 — Render por etapas`
2. `BLOCO-READING-6 — Exercícios internos da aba Reading`
3. `BLOCO-READING-7 — Evidência textual inteligente`
4. `BLOCO-READING-8 — Quality gate Reading`

Depois retomar a ordem macro:
- `BLOCO-SPEAKING-COMPLETE-RENDER-REVIEW-LAB`
- `BLOCO-VOCAB-TRAIL-CONTINUATION-LAB`
- `BLOCO-PRACTICE-DEEP-SYSTEM-CORRECTION-LAB` — aguardar o usuário mandar o modelo antes de iniciar

## BLOCOS PENDENTES POR ORDEM DE IMPORTÂNCIA

### 1. `HOTFIX-VALIDATION-UI-CARDS-PRACTICE-LAB`

Status: pendente de validação no iPhone.

### 2. `BLOCO-SPEAKING-COMPLETE-RENDER-REVIEW-LAB`

Status: deve vir depois da sequência atual de Reading, ou quando o usuário mandar avançar.

### 3. `BLOCO-VOCAB-TRAIL-CONTINUATION-LAB`

Status: pendente e agora recolocado na ordem correta.

### 4. `BLOCO-PRACTICE-DEEP-SYSTEM-CORRECTION-LAB`

Status: aguardar modelo do usuário.

### 5. `BLOCO-PRACTICE-RENDER-SAFETY-GATE-LAB`

Status: depois da correção da prática profunda.

### 6. `BLOCO-LISTENING-FINAL-APPROVAL-LAB`

Status: Listening parece funcional, mas ainda precisa aprovação final do usuário.

### 7. `BLOCO-TEMP-PREVIEW-CLEANUP-LAB`

Status: futuro, somente depois que Reading, Listening e Speaking estiverem aprovados.

### 8. `BLOCO-LAB-PROMOTION-PREP-LAB`

Status: futuro.

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

"Continue a reconstrução do Fluency. Leia `REWRITE_HANDOFF.md` antes de qualquer alteração. A branch principal é `rewrite-fluency-clean-lab`. Não mexa em `main`, `rewrite-fluency-clean`, `bundle.js` ou backend Azure privado. Reading agora está sendo reconstruída como aula completa dentro da própria aba. A Prática Profunda em Reading é complemento posterior, não substitui a aula. O último bloco implementado foi `BLOCO-READING-4 — Geração da aula Reading por habilidade`. O próximo bloco recomendado é `BLOCO-READING-5 — Render por etapas`."
