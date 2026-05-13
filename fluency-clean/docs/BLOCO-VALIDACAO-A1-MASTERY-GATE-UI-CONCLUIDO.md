# BLOCO — Validar A1 Mastery Gate UI no CourseScreen

Branch: `rewrite-fluency-clean-lab`

## Status

Concluído como limpeza inicial de UX do painel de critérios do A1 dentro do CourseScreen.

## Documentos lidos antes do bloco

- `fluency-clean/docs/MASTER-CONTINUIDADE-BLOCOS-CURSO-ATE-C1-C2.md`
- `fluency-clean/docs/REGRAS-UX-LIMPA-E-ECONOMIA-DE-DEPLOYS.md`
- `fluency-clean/docs/BLOCO-VALIDACAO-VISUAL-HOME-POS-SYNC-CONCLUIDO.md`

## Objetivo

Revisar o painel do A1 no mapa do curso para remover linguagem técnica e deixar a tela mais clara para o aluno.

## Arquivo alterado

`fluency-clean/src/components/course/A1MasteryGatePanel.jsx`

## Ajustes feitos

### 1. Título técnico removido

Antes:

- `A1 Mastery Gate`

Agora:

- `Critérios para liberar o A2`

### 2. Texto explicativo humanizado

Antes o painel falava em gate/mastery.

Agora explica:

```txt
Você só avança quando mostra domínio real do A1, não apenas por assistir aulas.
```

### 3. Termos técnicos trocados

Antes:

- `Média dos checkpoints`
- `Nota final ponderada`
- `A1 Final Exam`
- `Pendências antes de liberar A2`
- `sem revisão`

Agora:

- `Média das avaliações`
- `Resultado da prova final`
- `prova final do A1`
- `O que falta para liberar o A2`
- `aguardando revisão`

### 4. Pendências traduzidas para linguagem de aluno

Foi criada a função `humanAction(...)` para transformar mensagens internas em frases mais claras, como:

- `Concluir todas as aulas do A1.`
- `Atingir média mínima de 80% nas avaliações do A1.`
- `Tirar 80% ou mais na prova final do A1.`
- `Speaking precisa ser revisado.`
- `Writing precisa ser revisado.`

## Resultado esperado

No CourseScreen, o painel do A1 deve mostrar:

- critérios claros para liberar o A2;
- progresso das aulas;
- média das avaliações;
- resultado da prova final;
- áreas com nota baixa;
- status de Speaking/Writing;
- lista simples do que falta.

Sem termos técnicos como `gate`, `payload`, `checkpointAveragePercent`, schema, storage ou hash.

## Economia de deploys

Resultado:

- 1 commit de código;
- 1 commit de documentação.

A ferramenta atual trabalha por arquivo, então a documentação ficou em um commit separado.

## Próximo bloco recomendado

## Bloqueio funcional do A2

Objetivo:

- impedir seleção real do nível A2 enquanto os critérios do A1 não forem cumpridos;
- mostrar mensagem humana explicando o que falta;
- liberar A2 apenas quando `canUnlockA2` estiver verdadeiro;
- manter a UI limpa e sem informações técnicas.

## Prompt de continuidade

```txt
Continue na branch rewrite-fluency-clean-lab.
Antes de qualquer alteração, leia:
1. REWRITE_HANDOFF.md
2. fluency-clean/docs/MASTER-CONTINUIDADE-BLOCOS-CURSO-ATE-C1-C2.md
3. fluency-clean/docs/REGRAS-UX-LIMPA-E-ECONOMIA-DE-DEPLOYS.md
4. fluency-clean/docs/BLOCO-VALIDACAO-A1-MASTERY-GATE-UI-CONCLUIDO.md

Próximo bloco: Bloqueio funcional do A2.
Manter UX limpa, sem termos técnicos na tela do aluno.
Economizar commits/deploys.
Não mexer em main, rewrite-fluency-clean, bundle.js, backend Azure privado, Firebase/Azure produção, speakingFlow.js, SpeakingStepper.jsx ou SpeakingScreen.jsx.
Não usar DOM injection nem bundle patch.
```
