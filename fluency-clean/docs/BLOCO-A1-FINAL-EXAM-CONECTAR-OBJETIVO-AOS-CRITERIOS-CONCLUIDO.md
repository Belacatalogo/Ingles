# BLOCO — Prova final do A1 — conectar resultado objetivo aos critérios do A1

Branch: `rewrite-fluency-clean-lab`

## Status

Concluído como conexão inicial entre o resultado objetivo da prova final do A1 e os critérios de liberação do A2.

## Documentos lidos antes do bloco

- `fluency-clean/docs/MASTER-CONTINUIDADE-BLOCOS-CURSO-ATE-C1-C2.md`
- `fluency-clean/docs/REGRAS-UX-LIMPA-E-ECONOMIA-DE-DEPLOYS.md`
- `fluency-clean/docs/BLOCO-A1-FINAL-EXAM-SALVAR-RESULTADO-OBJETIVO-CONCLUIDO.md`

## Objetivo

Registrar Grammar, Vocabulary, Reading e Listening no serviço dos critérios do A1 depois que o aluno salvar o resultado objetivo da prova.

## Arquivos alterados

`fluency-clean/src/services/a1FinalExamAttemptService.js`

`fluency-clean/src/components/course/A1FinalExamShell.jsx`

## O que foi implementado

### 1. Sincronização com os critérios do A1

O serviço da tentativa da prova agora importa:

`recordA1FinalExamPillarScore(...)`

E registra os resultados objetivos nos pilares:

- Grammar;
- Vocabulary;
- Reading;
- Listening.

### 2. Nova função de sincronização

Criada:

`syncA1FinalExamObjectiveScoresToGate(scoring)`

Ela envia as notas objetivas para o serviço dos critérios do A1.

### 3. Nova função de salvar e sincronizar

Criada:

`saveAndSyncA1FinalExamObjectiveAttempt(objectiveAnswers)`

Ela:

1. salva a tentativa local;
2. calcula o resultado;
3. registra Grammar, Vocabulary, Reading e Listening nos critérios do A1.

### 4. UI atualizada

Na shell da prova:

Antes:

`Salvar e ver resultado`

Agora:

`Salvar e atualizar critérios`

Mensagem após salvar:

`Resultado salvo e enviado para os critérios do A1.`

Resultado mostra:

`Grammar, Vocabulary, Reading e Listening já entram nos critérios do A1. Speaking e Writing ainda precisam de revisão.`

## O que continua pendente

Este bloco não libera A2 sozinho.

Ainda faltam:

- Speaking real;
- Writing real;
- revisão de Speaking;
- revisão de Writing;
- integração visual reativa imediata do painel A1 após salvar;
- player real de Listening;
- validação visual no iPhone.

## UX limpa

A tela não mostra:

- nomes de storage;
- payload;
- schema;
- hash;
- nome de arquivo;
- detalhes técnicos do serviço.

## Observação técnica

A conexão atual usa o serviço local já existente de critérios do A1. Como o painel do A1 lê esse mesmo serviço, os valores ficam disponíveis para a próxima renderização do painel.

## Próximo bloco recomendado

## Prova final do A1 — atualização visual reativa dos critérios

Objetivo:

- ao salvar resultado objetivo, atualizar o painel de critérios do A1 sem precisar sair e voltar da tela;
- manter a mensagem humana;
- não mexer ainda em Speaking/Writing real;
- garantir que A2 continue bloqueado enquanto Speaking/Writing não forem revisados.

Depois disso:

## Prova final do A1 — Speaking/Writing placeholders reais

Objetivo:

- criar campos simples de submissão para Speaking/Writing;
- ainda sem gravação real;
- permitir marcar como aguardando revisão.

## Prompt de continuidade

```txt
Continue na branch rewrite-fluency-clean-lab.
Antes de qualquer alteração, leia:
1. REWRITE_HANDOFF.md
2. fluency-clean/docs/MASTER-CONTINUIDADE-BLOCOS-CURSO-ATE-C1-C2.md
3. fluency-clean/docs/REGRAS-UX-LIMPA-E-ECONOMIA-DE-DEPLOYS.md
4. fluency-clean/docs/BLOCO-A1-FINAL-EXAM-CONECTAR-OBJETIVO-AOS-CRITERIOS-CONCLUIDO.md

Próximo bloco: Prova final do A1 — atualização visual reativa dos critérios.
Manter UX limpa, sem termos técnicos na tela do aluno.
Economizar commits/deploys.
Não criar bloco gigante.
Não mexer em main, rewrite-fluency-clean, bundle.js, backend Azure privado, Firebase/Azure produção, speakingFlow.js, SpeakingStepper.jsx ou SpeakingScreen.jsx.
Não usar DOM injection nem bundle patch.
```
