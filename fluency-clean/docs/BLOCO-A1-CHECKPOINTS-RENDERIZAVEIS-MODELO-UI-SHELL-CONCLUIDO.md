# BLOCO — Checkpoints reais renderizáveis A1 — modelo e UI shell

Branch: `rewrite-fluency-clean-lab`

## Status

Concluído como primeira shell visual renderizável dos checkpoints do A1.

## Documentos lidos antes do bloco

- `fluency-clean/docs/MASTER-CONTINUIDADE-BLOCOS-CURSO-ATE-C1-C2.md`
- `fluency-clean/docs/REGRAS-UX-LIMPA-E-ECONOMIA-DE-DEPLOYS.md`
- `fluency-clean/docs/BLOCO-VALIDACAO-VISUAL-PROVA-A1-IPHONE-CONCLUIDO.md`

## Objetivo

Transformar os checkpoints já definidos no A1 em uma primeira tela visual, sem ainda criar fluxo de respostas, scoring ou salvamento.

## Arquivos criados

`fluency-clean/src/content/curriculum/levels/A1/a1CheckpointModel.js`

`fluency-clean/src/components/course/A1CheckpointShell.jsx`

## Arquivos alterados

`fluency-clean/src/screens/CourseScreen.jsx`

`fluency-clean/src/styles/a1-mastery-gate.css`

## O que foi implementado

### 1. Modelo renderizável

Criado `a1CheckpointModel.js`, que transforma `A1_CHECKPOINTS` em itens seguros para UI:

- id;
- título humano;
- unidade de desbloqueio;
- meta de aprovação;
- objetivo;
- pilares;
- tarefas;
- indicação de revisão quando necessário.

### 2. Shell visual dos checkpoints

Criado `A1CheckpointShell.jsx`.

A tela mostra:

- título `Checkpoints do A1`;
- explicação curta;
- meta do checkpoint ativo;
- abas para alternar entre checkpoints;
- unidade que libera o checkpoint;
- objetivo do checkpoint;
- cards por pilar;
- tarefas de cada pilar;
- aviso de que a tela de respostas entra no próximo bloco.

### 3. Conexão no CourseScreen

A shell aparece apenas no nível A1, posicionada entre:

1. painel de critérios do A1;
2. prova final do A1.

### 4. CSS mobile-first

Os estilos foram adicionados ao CSS existente do A1:

`fluency-clean/src/styles/a1-mastery-gate.css`

A estrutura usa:

- cards em coluna no mobile;
- abas horizontais com rolagem;
- cores separadas para checkpoints;
- textos humanos;
- botões desativados quando ainda não há fluxo de respostas.

## UX limpa

A UI não mostra:

- IDs internos;
- nomes de arquivo;
- hashes;
- storage;
- payload;
- schema;
- detalhes técnicos.

## O que este bloco não fez

Ainda falta:

- tela real de respostas dos checkpoints;
- scoring;
- salvamento local;
- conexão automática com os critérios do A1;
- bloqueio/desbloqueio por progresso real da unidade;
- revisão real de Speaking/Writing dentro dos checkpoints.

## Próximo bloco recomendado

## Checkpoints A1 — fluxo objetivo inicial

Objetivo:

- permitir abrir um checkpoint;
- renderizar perguntas simples para Grammar, Vocabulary, Reading e Listening;
- salvar respostas em estado local;
- calcular resultado objetivo;
- ainda não conectar ao A1 Gate.

Depois:

## Checkpoints A1 — salvamento local e conexão com critérios

Objetivo:

- salvar resultado do checkpoint;
- atualizar média dos checkpoints no A1 Gate;
- manter Speaking/Writing pendentes de revisão.

## Prompt de continuidade

```txt
Continue na branch rewrite-fluency-clean-lab.
Antes de qualquer alteração, leia:
1. REWRITE_HANDOFF.md
2. fluency-clean/docs/MASTER-CONTINUIDADE-BLOCOS-CURSO-ATE-C1-C2.md
3. fluency-clean/docs/REGRAS-UX-LIMPA-E-ECONOMIA-DE-DEPLOYS.md
4. fluency-clean/docs/BLOCO-A1-CHECKPOINTS-RENDERIZAVEIS-MODELO-UI-SHELL-CONCLUIDO.md

Próximo bloco: Checkpoints A1 — fluxo objetivo inicial.
Manter UX limpa, sem termos técnicos na tela do aluno.
Economizar commits/deploys.
Não criar bloco gigante.
Não mexer em main, rewrite-fluency-clean, bundle.js, backend Azure privado, Firebase/Azure produção.
Não usar DOM injection nem bundle patch.
```
