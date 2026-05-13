# BLOCO — A1 Mastery Gate UI

Branch: `rewrite-fluency-clean-lab`

## Status

Concluído como primeira conexão visual do A1 Mastery Gate na interface do curso.

## Objetivo

Mostrar na UI do curso/progresso:

- status do A1;
- pronto/não pronto para A1 Final Exam;
- A2 bloqueado/liberado;
- progresso das aulas A1;
- média dos checkpoints;
- nota final ponderada;
- pilares fracos;
- status de revisão Speaking/Writing;
- pendências antes de liberar A2.

## Arquivos criados

### Componente

`fluency-clean/src/components/course/A1MasteryGatePanel.jsx`

Função:

- lê `getA1MasteryGateSummary()`;
- exibe status do gate;
- mostra progresso e pendências;
- exibe pilares e scores;
- exibe Speaking/Writing revisado ou pendente;
- informa se A2 está bloqueado ou liberado.

### CSS modular

`fluency-clean/src/styles/a1-mastery-gate.css`

Função:

- estiliza o painel;
- layout mobile-first;
- grid responsivo;
- estados locked/ready/unlocked;
- sem DOM injection.

## Arquivos alterados

### `fluency-clean/src/screens/CourseScreen.jsx`

Alteração:

- importado `A1MasteryGatePanel`;
- painel renderizado somente quando `activeLevel === 'A1'`;
- posicionado abaixo do hero do curso.

### `fluency-clean/src/main.jsx`

Alteração:

- importado `./styles/a1-mastery-gate.css`.

## O que a UI já mostra

O painel mostra:

- `A1 Mastery Gate`;
- `A1 em progresso`, `Pronto para A1 Final Exam` ou `A2 liberado`;
- aulas A1 concluídas;
- média dos checkpoints;
- nota final ponderada;
- se pode fazer o A1 Final Exam;
- se A2 está bloqueado;
- score por pilar;
- revisão de Speaking;
- revisão de Writing;
- lista de pendências.

## Importante

Este bloco criou a UI do painel.

Ainda não implementa automaticamente:

- botões reais para lançar o A1 Final Exam;
- tela real do A1 Final Exam;
- formulário de lançamento de notas;
- bloqueio funcional de clique no A2;
- cálculo automático de 100% das aulas A1 a partir do progresso real.

Esses pontos devem ser feitos em blocos seguintes.

## Próximo bloco recomendado

## BLOCO — Validar A1 Mastery Gate UI

Critérios:

- abrir CourseScreen no preview;
- verificar se o painel não causa erro de renderização;
- verificar mobile iPhone;
- verificar se o painel aparece só no A1;
- verificar se A2 não mostra painel A1;
- confirmar que CSS não quebra course screen;
- depois conectar bloqueio funcional de A2.

## Prompt de continuidade

```txt
Continue na branch rewrite-fluency-clean-lab.
Leia REWRITE_HANDOFF.md, fluency-clean/docs/BLOCO-A1-MASTERY-GATE-PROGRESS-SERVICE-CONCLUIDO.md e fluency-clean/docs/BLOCO-A1-MASTERY-GATE-UI-CONCLUIDO.md.
Foi criada a UI do A1 Mastery Gate no CourseScreen. Próximo bloco recomendado: validar visual/renderização da UI e depois conectar bloqueio funcional de A2 e lançamento real do A1 Final Exam.
Não mexa em main, rewrite-fluency-clean, bundle.js, backend Azure privado, Firebase/Azure produção, speakingFlow.js, SpeakingStepper.jsx ou SpeakingScreen.jsx.
Não use DOM injection nem bundle patch.
```
