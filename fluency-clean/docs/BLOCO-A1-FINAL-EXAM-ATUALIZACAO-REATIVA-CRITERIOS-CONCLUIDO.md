# BLOCO — Prova final do A1 — atualização visual reativa dos critérios

Branch: `rewrite-fluency-clean-lab`

## Status

Concluído como atualização visual reativa inicial dos critérios do A1 após salvar a parte objetiva da prova final.

## Documentos lidos antes do bloco

- `fluency-clean/docs/MASTER-CONTINUIDADE-BLOCOS-CURSO-ATE-C1-C2.md`
- `fluency-clean/docs/REGRAS-UX-LIMPA-E-ECONOMIA-DE-DEPLOYS.md`
- `fluency-clean/docs/BLOCO-A1-FINAL-EXAM-CONECTAR-OBJETIVO-AOS-CRITERIOS-CONCLUIDO.md`

## Objetivo

Atualizar o painel de critérios do A1 imediatamente depois que Grammar, Vocabulary, Reading e Listening forem salvos na prova final.

## Arquivos alterados

`fluency-clean/src/screens/CourseScreen.jsx`

`fluency-clean/src/components/course/A1FinalExamShell.jsx`

## O que foi implementado

### 1. Chave de atualização no CourseScreen

Foi criado um estado interno:

`a1RefreshKey`

Ele força o painel do A1 a recalcular os critérios depois que a prova objetiva salva as notas.

### 2. Função de atualização humana

Foi criada a função:

`handleA1GateUpdated()`

Ela:

- atualiza a chave de renderização;
- mostra mensagem humana para o aluno:

```txt
Critérios do A1 atualizados. Speaking e Writing ainda precisam de revisão.
```

### 3. Painel do A1 reativo

O painel de critérios agora recebe uma `key` baseada em `a1RefreshKey`.

Assim, após salvar a prova objetiva, o painel é recriado e lê os novos valores salvos no serviço do A1.

### 4. Shell da prova notifica o CourseScreen

`A1FinalExamShell` agora aceita:

`onObjectiveScoresSaved`

Depois de salvar e sincronizar o resultado objetivo, ela chama essa função.

## Resultado esperado

Quando o aluno clicar em:

```txt
Salvar e atualizar critérios
```

O sistema deve:

1. salvar o resultado objetivo;
2. registrar Grammar, Vocabulary, Reading e Listening;
3. atualizar o painel de critérios do A1 na mesma tela;
4. manter A2 bloqueado se Speaking/Writing ainda não tiverem revisão.

## UX limpa

Nenhum detalhe técnico foi adicionado à tela do aluno.

A mensagem exibida é:

```txt
Critérios do A1 atualizados. Speaking e Writing ainda precisam de revisão.
```

## O que este bloco não fez

Ainda falta:

- Speaking real;
- Writing real;
- revisão de Speaking/Writing;
- validação visual no iPhone;
- player real para Listening;
- submissão final completa da prova.

## Próximo bloco recomendado

## Prova final do A1 — Speaking/Writing placeholders reais

Objetivo:

- criar campos simples e reais para Speaking/Writing dentro da prova;
- Speaking: campo de orientação/placeholder de gravação futura, sem mexer no sistema de speaking atual;
- Writing: campo de texto curto;
- salvar localmente essas respostas como aguardando revisão;
- não marcar Speaking/Writing como revisados ainda;
- manter A2 bloqueado.

## Prompt de continuidade

```txt
Continue na branch rewrite-fluency-clean-lab.
Antes de qualquer alteração, leia:
1. REWRITE_HANDOFF.md
2. fluency-clean/docs/MASTER-CONTINUIDADE-BLOCOS-CURSO-ATE-C1-C2.md
3. fluency-clean/docs/REGRAS-UX-LIMPA-E-ECONOMIA-DE-DEPLOYS.md
4. fluency-clean/docs/BLOCO-A1-FINAL-EXAM-ATUALIZACAO-REATIVA-CRITERIOS-CONCLUIDO.md

Próximo bloco: Prova final do A1 — Speaking/Writing placeholders reais.
Manter UX limpa, sem termos técnicos na tela do aluno.
Economizar commits/deploys.
Não mexer no sistema real de Speaking ainda: não alterar speakingFlow.js, SpeakingStepper.jsx ou SpeakingScreen.jsx.
Não criar bloco gigante.
Não mexer em main, rewrite-fluency-clean, bundle.js, backend Azure privado, Firebase/Azure produção.
Não usar DOM injection nem bundle patch.
```
