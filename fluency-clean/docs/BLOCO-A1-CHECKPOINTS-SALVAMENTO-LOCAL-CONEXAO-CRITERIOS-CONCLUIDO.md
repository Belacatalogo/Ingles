# BLOCO — Checkpoints A1 — salvamento local e conexão com critérios

Branch: `rewrite-fluency-clean-lab`

## Status

Concluído como primeira persistência local e conexão dos checkpoints A1 ao painel de critérios.

## Documentos lidos antes do bloco

- `fluency-clean/docs/MASTER-CONTINUIDADE-BLOCOS-CURSO-ATE-C1-C2.md`
- `fluency-clean/docs/REGRAS-UX-LIMPA-E-ECONOMIA-DE-DEPLOYS.md`
- `fluency-clean/docs/BLOCO-A1-CHECKPOINTS-FLUXO-OBJETIVO-INICIAL-CONCLUIDO.md`

## Objetivo

Salvar respostas e resultado dos checkpoints A1 no aparelho, recuperar tentativa anterior e atualizar os critérios do A1.

## Arquivo criado

`fluency-clean/src/services/a1CheckpointAttemptService.js`

Funções criadas:

- `getA1CheckpointAttempts()`
- `getA1CheckpointAttempt(checkpointId)`
- `saveAndSyncA1CheckpointAttempt(checkpointId, answers)`
- `clearA1CheckpointAttempts()`

## Arquivos alterados

`fluency-clean/src/components/course/A1CheckpointShell.jsx`

`fluency-clean/src/screens/CourseScreen.jsx`

## O que foi implementado

### 1. Salvamento local dos checkpoints

Ao clicar em:

```txt
Salvar checkpoint
```

O sistema salva localmente:

- checkpoint respondido;
- respostas;
- resultado calculado;
- data do salvamento.

### 2. Recuperação de tentativa anterior

Quando a tela dos checkpoints abre, tentativas anteriores são recuperadas.

A UI mostra:

```txt
Tentativa anterior recuperada.
```

### 3. Conexão com critérios do A1

O serviço registra a nota do checkpoint usando:

`recordA1CheckpointScore(checkpointId, scoring.percent)`

Assim, a média dos checkpoints passa a entrar nos critérios do A1.

### 4. Atualização reativa no CourseScreen

`A1CheckpointShell` agora recebe:

`onCheckpointSaved`

Quando um checkpoint é salvo, o `CourseScreen` atualiza o painel de critérios do A1 e mostra:

```txt
Checkpoint salvo. Os critérios do A1 foram atualizados.
```

## UX limpa

A tela não mostra:

- nomes técnicos de storage;
- payload;
- schema;
- IDs internos;
- hashes;
- nomes de arquivos.

## O que este bloco não fez

Ainda falta:

- revisão de Speaking/Writing dentro dos checkpoints;
- bloquear/desbloquear checkpoint por progresso real da unidade;
- validação visual real no iPhone depois do salvamento;
- integração de checkpoints dos próximos módulos A1.

## Próximo bloco recomendado

## Voltar para aulas — BLOCO 11A A1.3 Daily Routine profundo

Objetivo:

- voltar a expandir o conteúdo principal do curso;
- criar unidade A1.3 Daily Routine com 6 pilares:
  - Grammar;
  - Vocabulary;
  - Reading;
  - Listening;
  - Speaking;
  - Writing.

Escopo sugerido:

- Grammar: simple present básico com I/you/we/they;
- Vocabulary: daily actions, time markers, routine chunks;
- Reading: rotina diária curta;
- Listening: diálogo curto sobre rotina;
- Speaking: falar sobre o próprio dia;
- Writing: escrever rotina curta.

## Prompt de continuidade

```txt
Continue na branch rewrite-fluency-clean-lab.
Antes de qualquer alteração, leia:
1. REWRITE_HANDOFF.md
2. fluency-clean/docs/MASTER-CONTINUIDADE-BLOCOS-CURSO-ATE-C1-C2.md
3. fluency-clean/docs/REGRAS-UX-LIMPA-E-ECONOMIA-DE-DEPLOYS.md
4. fluency-clean/docs/BLOCO-A1-CHECKPOINTS-SALVAMENTO-LOCAL-CONEXAO-CRITERIOS-CONCLUIDO.md

Próximo bloco: Voltar para aulas — BLOCO 11A A1.3 Daily Routine profundo.
Manter UX limpa, sem termos técnicos na tela do aluno.
Economizar commits/deploys.
Criar conteúdo profundo modular, sem bloco gigante.
Não mexer em main, rewrite-fluency-clean, bundle.js, backend Azure privado, Firebase/Azure produção.
Não usar DOM injection nem bundle patch.
```
