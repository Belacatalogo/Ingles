# BLOCO — A1 Mastery Gate Progress Service

Branch: `rewrite-fluency-clean-lab`

## Status

Concluído como camada de serviço local para conectar o A1 Mastery Gate ao progresso.

## Objetivo

Criar uma camada técnica que permita ao app saber:

- se o aluno está pronto para fazer o A1 Final Exam;
- se A2 está bloqueado ou liberado;
- quais checkpoints ainda faltam;
- quais pilares estão abaixo da nota mínima;
- se Speaking e Writing ainda precisam de revisão;
- quais ações o aluno precisa fazer antes de avançar.

## Arquivo criado

`fluency-clean/src/services/a1MasteryGateService.js`

## Integrações usadas

O serviço usa:

- `A1_CHECKPOINTS`
- `A1_FINAL_EXAM`
- `evaluateA1FinalGate(...)`
- `getA1FinalExamReadiness(...)`
- `LEVEL_MASTERY_PILLARS`
- `LEVEL_PASSING_RULES`

Arquivos base:

- `fluency-clean/src/content/curriculum/levels/A1/a1MasteryAssessments.js`
- `fluency-clean/src/content/curriculum/levelMasteryFramework.js`

## Persistência

Persistência local via localStorage:

```txt
fluency:a1-mastery-gate:v1
```

Nenhum Firebase, backend, Azure ou escrita remota foi ativado.

## Funções criadas

### `getA1MasteryGateState()`

Lê o estado local do A1 Mastery Gate.

### `saveA1MasteryGateState(nextState)`

Salva estado local normalizado.

### `updateA1LessonCompletion(lessonCompletionPercent)`

Atualiza porcentagem de conclusão das aulas A1.

### `recordA1CheckpointScore(checkpointId, score)`

Registra nota de checkpoint A1.

### `recordA1FinalExamPillarScore(pillar, score)`

Registra nota da prova final por pilar.

### `markA1ProductiveSkillReviewed(skill, reviewed)`

Marca Speaking ou Writing como revisado.

### `getA1MasteryGateSummary()`

Retorna resumo completo:

- `level`
- `nextLevel`
- `finalExam`
- `checkpoints`
- `state`
- `readiness`
- `gate`
- `locked`
- `canTakeFinalExam`
- `canUnlockA2`
- `weakPillars`
- `missingCheckpoints`
- `requiredActions`
- `statusLabel`

### `resetA1MasteryGateState()`

Limpa o estado local do gate A1.

## Regras mantidas

A2 só é liberado se:

- 100% das aulas A1 estiverem concluídas;
- média dos checkpoints for pelo menos 80%;
- A1 Final Exam tiver nota geral ponderada pelo menos 80%;
- todos os pilares forem pelo menos 75%;
- Speaking for pelo menos 75%;
- Writing for pelo menos 75%;
- Speaking estiver revisado;
- Writing estiver revisado.

## Limitação deste bloco

Este bloco criou o serviço e a lógica local.

A UI ainda precisa ser conectada em um próximo bloco para exibir:

- card de status do A1;
- botão/estado do A1 Final Exam;
- bloqueio visual de A2;
- lista de pendências;
- pilares fracos;
- status de revisão Speaking/Writing.

## Próximo bloco recomendado

## BLOCO — A1 Mastery Gate UI

Objetivo:

Conectar `a1MasteryGateService.js` à interface do curso/progresso, sem DOM injection e sem alterar backend.

Possíveis pontos:

- `CourseScreen.jsx`
- tela de progresso;
- mapa do curso;
- painel final do A1.

## Prompt de continuidade

```txt
Continue na branch rewrite-fluency-clean-lab.
Leia REWRITE_HANDOFF.md, fluency-clean/docs/BLOCO-A1-CHECKPOINTS-FINAL-EXAM-FRAMEWORK-CONCLUIDO.md e fluency-clean/docs/BLOCO-A1-MASTERY-GATE-PROGRESS-SERVICE-CONCLUIDO.md.
Foi criado o serviço local a1MasteryGateService.js. Próximo bloco recomendado: A1 Mastery Gate UI, conectando o status de pronto/não pronto para A1 Final Exam e bloqueio de A2 à interface do curso/progresso.
Não mexa em main, rewrite-fluency-clean, bundle.js, backend Azure privado, Firebase/Azure produção, speakingFlow.js, SpeakingStepper.jsx ou SpeakingScreen.jsx.
Não use DOM injection nem bundle patch.
```
