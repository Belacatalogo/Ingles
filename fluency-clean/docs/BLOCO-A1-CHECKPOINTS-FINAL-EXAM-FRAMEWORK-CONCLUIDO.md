# BLOCO — A1 Checkpoints e Final Exam Framework

Branch: `rewrite-fluency-clean-lab`

## Status

Concluído como estrutura oficial de avaliação A1.

## Objetivo

Criar uma estrutura que impeça o aluno de avançar de A1 para A2 apenas por assistir aulas.

O avanço A1 → A2 passa a depender de:

1. 100% das aulas A1 concluídas;
2. checkpoints intermediários;
3. média mínima de 80% nos checkpoints;
4. A1 Final Exam;
5. mínimo de 75% por pilar;
6. mínimo de 75% em Speaking;
7. mínimo de 75% em Writing;
8. revisão obrigatória de Speaking e Writing por IA/professor;
9. nota final ponderada mínima de 80%.

## Arquivo criado

`fluency-clean/src/content/curriculum/levels/A1/a1MasteryAssessments.js`

## Estruturas criadas

### `A1_CHECKPOINTS`

Checkpoints iniciais:

1. `A1-CHECKPOINT-FOUNDATIONS`
2. `A1-CHECKPOINT-PERSONAL-LIFE`

Cada checkpoint possui critérios para:

- grammar;
- vocabulary;
- reading;
- listening;
- speaking;
- writing.

Speaking e Writing são marcados com `requiresReview: true` quando exigem avaliação produtiva.

### `A1_FINAL_EXAM`

Prova final do A1 com os 6 pilares:

- Grammar
- Vocabulary
- Reading
- Listening
- Speaking
- Writing

A prova usa os pesos definidos em:

`fluency-clean/src/content/curriculum/levelMasteryFramework.js`

Pesos:

```js
grammar: 15
vocabulary: 15
reading: 15
listening: 20
speaking: 20
writing: 15
```

## Funções criadas

### `getA1Checkpoint(checkpointId)`

Retorna checkpoint específico.

### `getA1CheckpointAverage(scores)`

Calcula média dos checkpoints A1.

### `evaluateA1FinalGate(payload)`

Avalia se o aluno pode liberar A2 usando `evaluateLevelAdvancement(...)`.

### `getA1FinalExamReadiness(payload)`

Confere se o aluno está pronto para fazer o A1 Final Exam.

## Critérios do A1 Final Exam

### Grammar

Formato: teste gramatical contextual.

Tarefas:

- completar frases com pronomes, possessivos e verb to be;
- corrigir erros comuns de brasileiros;
- escolher formas corretas em contexto.

### Vocabulary

Formato: vocabulário em contexto.

Tarefas:

- usar palavras/chunks de identidade, família, cidade, país, rotina, contato e hobbies;
- resolver confusões perigosas como city/country, Brazil/Brazilian, address/email address, parents/relatives.

### Reading

Formato: textos curtos com evidência.

Tarefas:

- ler perfil pessoal e rotina simples;
- responder ideia geral, detalhes e vocabulário pelo contexto;
- selecionar evidência textual.

### Listening

Formato: áudio curto e claro, primeira tentativa sem transcript.

Tarefas:

- identificar situação geral;
- capturar nomes, números, cidade, e-mail, hobby ou rotina;
- dictation curta.

### Speaking

Formato: gravação oral + revisão IA/professor.

Tarefas:

- gravar apresentação de 45–60 segundos;
- responder follow-ups simples;
- soletrar nome e dizer telefone/cidade.

Rubrica:

- clarity: 25
- grammarControl: 25
- vocabularyUse: 20
- taskCompletion: 20
- pronunciationIntelligibility: 10

### Writing

Formato: produção escrita curta + revisão IA/professor.

Tarefas:

- escrever perfil pessoal curto;
- escrever parágrafo sobre família ou rotina;
- revisar com checklist antes de enviar versão final.

Rubrica:

- grammarControl: 25
- vocabularyUse: 20
- organization: 20
- taskCompletion: 20
- mechanics: 15

## Regras para próximos blocos A1

Cada nova unidade A1 deve adicionar ou alimentar checkpoints.

Antes de liberar A2, precisa existir:

- checkpoints suficientes para todas as unidades A1;
- A1 Final Exam com itens reais;
- interface/serviço para avaliar o gate;
- bloqueio de A2 quando `evaluateA1FinalGate(...).canAdvance === false`.

## Próximo bloco recomendado

## BLOCO — Conectar A1 Mastery Gate ao currículo/progresso

Objetivo:

Conectar `a1MasteryAssessments.js` ao fluxo de progresso do app, para o sistema conseguir exibir:

- pronto/não pronto para A1 Final Exam;
- pendências antes de liberar A2;
- resultado do gate;
- pilares abaixo da nota mínima.

## Prompt de continuidade

```txt
Continue na branch rewrite-fluency-clean-lab.
Leia REWRITE_HANDOFF.md, fluency-clean/docs/BLOCO-LEVEL-MASTERY-CEFR-GATES-CONCLUIDO.md e fluency-clean/docs/BLOCO-A1-CHECKPOINTS-FINAL-EXAM-FRAMEWORK-CONCLUIDO.md.
Foi criado o A1 Checkpoints e Final Exam Framework. Próximo bloco recomendado: conectar A1 Mastery Gate ao currículo/progresso para bloquear A2 até o aluno cumprir aulas, checkpoints, final exam, Speaking e Writing revisados.
Não mexa em main, rewrite-fluency-clean, bundle.js, backend Azure privado, Firebase/Azure produção, speakingFlow.js, SpeakingStepper.jsx ou SpeakingScreen.jsx.
Não use DOM injection nem bundle patch.
```
