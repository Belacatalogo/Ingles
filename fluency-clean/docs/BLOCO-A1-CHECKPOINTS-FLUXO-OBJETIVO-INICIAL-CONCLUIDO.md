# BLOCO — Checkpoints A1 — fluxo objetivo inicial

Branch: `rewrite-fluency-clean-lab`

## Status

Concluído como primeiro fluxo objetivo local dos checkpoints do A1.

## Documentos lidos antes do bloco

- `fluency-clean/docs/MASTER-CONTINUIDADE-BLOCOS-CURSO-ATE-C1-C2.md`
- `fluency-clean/docs/REGRAS-UX-LIMPA-E-ECONOMIA-DE-DEPLOYS.md`
- `fluency-clean/docs/BLOCO-A1-CHECKPOINTS-RENDERIZAVEIS-MODELO-UI-SHELL-CONCLUIDO.md`

## Objetivo

Permitir que o aluno responda perguntas simples de Grammar, Vocabulary, Reading e Listening dentro dos checkpoints do A1.

## Arquivos alterados

`fluency-clean/src/content/curriculum/levels/A1/a1CheckpointModel.js`

`fluency-clean/src/components/course/A1CheckpointShell.jsx`

`fluency-clean/src/styles/a1-mastery-gate.css`

## O que foi implementado

### 1. Perguntas objetivas no modelo

Foram adicionadas perguntas simples para:

- Foundations;
- Personal life.

Cada checkpoint recebeu perguntas para:

- Grammar;
- Vocabulary;
- Reading;
- Listening.

### 2. Tipos de pergunta

A primeira versão suporta:

- múltipla escolha;
- resposta curta;
- texto de leitura;
- nota/orientação de escuta.

### 3. Resultado objetivo local

Foi criada a função:

`scoreA1CheckpointObjectiveAnswers(checkpointId, answers)`

Ela retorna:

- porcentagem geral;
- acertos;
- total de perguntas;
- porcentagem por pilar objetivo.

### 4. UI respondível

`A1CheckpointShell.jsx` agora permite:

- escolher checkpoint;
- escolher pilar objetivo;
- responder perguntas;
- calcular resultado do checkpoint.

### 5. Sem salvamento ainda

O resultado fica apenas em estado local da tela.

O salvamento definitivo entra no próximo bloco.

## UX limpa

A tela não mostra:

- IDs internos;
- storage;
- payload;
- schema;
- hashes;
- nomes de arquivos.

## O que este bloco não fez

Ainda falta:

- salvar respostas no aparelho;
- recuperar tentativa anterior;
- conectar média dos checkpoints ao painel de critérios do A1;
- revisão de Speaking/Writing dentro dos checkpoints;
- bloquear/desbloquear checkpoints por progresso real.

## Próximo bloco recomendado

## Checkpoints A1 — salvamento local e conexão com critérios

Objetivo:

- salvar respostas e resultado do checkpoint localmente;
- recuperar tentativa anterior;
- registrar nota do checkpoint no A1 Gate;
- atualizar o painel de critérios do A1;
- manter Speaking/Writing dos checkpoints para um bloco posterior.

Depois disso:

## Voltar para aulas — BLOCO 11A A1.3 Daily Routine profundo

Objetivo:

- criar nova unidade profunda A1.3 com 6 pilares;
- voltar a expandir conteúdo principal do curso.

## Prompt de continuidade

```txt
Continue na branch rewrite-fluency-clean-lab.
Antes de qualquer alteração, leia:
1. REWRITE_HANDOFF.md
2. fluency-clean/docs/MASTER-CONTINUIDADE-BLOCOS-CURSO-ATE-C1-C2.md
3. fluency-clean/docs/REGRAS-UX-LIMPA-E-ECONOMIA-DE-DEPLOYS.md
4. fluency-clean/docs/BLOCO-A1-CHECKPOINTS-FLUXO-OBJETIVO-INICIAL-CONCLUIDO.md

Próximo bloco: Checkpoints A1 — salvamento local e conexão com critérios.
Manter UX limpa, sem termos técnicos na tela do aluno.
Economizar commits/deploys.
Não criar bloco gigante.
Depois desse bloco, voltar para aulas com BLOCO 11A A1.3 Daily Routine profundo.
Não mexer em main, rewrite-fluency-clean, bundle.js, backend Azure privado, Firebase/Azure produção.
Não usar DOM injection nem bundle patch.
```
