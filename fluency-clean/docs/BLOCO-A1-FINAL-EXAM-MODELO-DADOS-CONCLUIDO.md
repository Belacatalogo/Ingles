# BLOCO — Prova final do A1 — modelo de dados

Branch: `rewrite-fluency-clean-lab`

## Status

Concluído como primeira base real da prova final do A1.

## Documentos lidos antes do bloco

- `fluency-clean/docs/MASTER-CONTINUIDADE-BLOCOS-CURSO-ATE-C1-C2.md`
- `fluency-clean/docs/REGRAS-UX-LIMPA-E-ECONOMIA-DE-DEPLOYS.md`
- `fluency-clean/docs/BLOCO-VALIDACAO-VISUAL-BLOQUEIO-A2-CONCLUIDO.md`

## Objetivo

Criar a estrutura real da prova final do A1 sem construir uma UI gigante no mesmo bloco.

## Arquivo criado

`fluency-clean/src/content/curriculum/levels/A1/a1FinalExamModel.js`

## Estruturas criadas

### `A1_FINAL_EXAM_VERSION`

Versão do modelo da prova:

```js
'a1-final-exam-v1'
```

### `A1_FINAL_EXAM_SECTIONS`

Seções reais da prova final:

1. Grammar
2. Vocabulary
3. Reading
4. Listening
5. Speaking
6. Writing

Cada seção possui:

- `id`
- `title`
- `studentTitle`
- `weight`
- `minimumScore`
- `instructions`
- questões ou prompt/rubrica

### `A1_FINAL_EXAM_MODEL`

Modelo consolidado da prova final do A1, com:

- id;
- versão;
- nível;
- título humano;
- descrição para aluno;
- estimativa de tempo;
- regras de aprovação;
- seções.

## Questões criadas

### Grammar

5 questões objetivas cobrindo:

- `I am from Brazil.`
- idade com `I am ... years old`;
- `She is my sister`;
- possessivo `His name`;
- correção de `He name is Pedro`.

### Vocabulary

5 questões objetivas cobrindo:

- city;
- email address;
- favorite sport;
- Brazilian;
- free time.

### Reading

Texto curto sobre Ana, idade, cidade, irmão, tempo livre e inglês.

5 questões objetivas.

### Listening

Modelo com transcript para professor/sistema:

- nome;
- cidade;
- país;
- telefone;
- tempo livre.

5 questões objetivas.

### Speaking

Prompt de gravação de 45–60 segundos.

Rubrica:

- clarity: 25
- grammarControl: 25
- vocabularyUse: 20
- taskCompletion: 20
- pronunciationIntelligibility: 10

### Writing

Prompt de 8 a 10 frases simples.

Rubrica:

- grammarControl: 25
- vocabularyUse: 20
- organization: 20
- taskCompletion: 20
- mechanics: 15

## Funções criadas

### `scoreA1FinalExamObjectiveSection(sectionId, answers)`

Corrige uma seção objetiva.

### `scoreA1FinalExamObjectiveAnswers(answersBySection)`

Corrige Grammar, Vocabulary, Reading e Listening.

Speaking e Writing ficam marcados como exigindo revisão.

### `buildA1FinalExamSubmission(payload)`

Cria um payload local de submissão da prova, com:

- examId;
- version;
- level;
- submittedAt;
- objectiveAnswers;
- speaking;
- writing;
- scoring.

### `getA1FinalExamSection(sectionId)`

Retorna uma seção específica.

### `getA1FinalExamStudentSections()`

Retorna um resumo seguro para a UI.

### `isA1FinalExamSectionId(sectionId)`

Valida se um id pertence aos pilares do curso.

## O que este bloco não fez

Este bloco não criou ainda:

- tela da prova;
- formulário de respostas;
- player/áudio real de Listening;
- gravação real de Speaking;
- editor de Writing;
- salvamento local do resultado;
- conexão automática com o A1 Gate.

Esses itens devem ser feitos em blocos pequenos.

## Próximo bloco recomendado

## Prova final do A1 — UI shell

Objetivo:

Criar uma tela simples para a prova final do A1, usando o modelo de dados já criado, sem ainda fazer correção completa ou salvamento definitivo.

Deve mostrar:

- título da prova;
- descrição;
- seções;
- instruções;
- status de revisão para Speaking/Writing;
- botão para iniciar/abrir primeira seção.

Não fazer ainda:

- fluxo gigante completo;
- gravação real;
- correção de Speaking/Writing;
- integração final com Gate.

## Prompt de continuidade

```txt
Continue na branch rewrite-fluency-clean-lab.
Antes de qualquer alteração, leia:
1. REWRITE_HANDOFF.md
2. fluency-clean/docs/MASTER-CONTINUIDADE-BLOCOS-CURSO-ATE-C1-C2.md
3. fluency-clean/docs/REGRAS-UX-LIMPA-E-ECONOMIA-DE-DEPLOYS.md
4. fluency-clean/docs/BLOCO-A1-FINAL-EXAM-MODELO-DADOS-CONCLUIDO.md

Próximo bloco: Prova final do A1 — UI shell.
Manter UX limpa, sem termos técnicos na tela do aluno.
Economizar commits/deploys.
Não criar bloco gigante: apenas shell visual inicial da prova.
Não mexer em main, rewrite-fluency-clean, bundle.js, backend Azure privado, Firebase/Azure produção, speakingFlow.js, SpeakingStepper.jsx ou SpeakingScreen.jsx.
Não usar DOM injection nem bundle patch.
```
