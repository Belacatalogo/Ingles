# BLOCO — Prova final do A1 — UI shell

Branch: `rewrite-fluency-clean-lab`

## Status

Concluído como primeira interface visual da prova final do A1.

## Documentos lidos antes do bloco

- `fluency-clean/docs/MASTER-CONTINUIDADE-BLOCOS-CURSO-ATE-C1-C2.md`
- `fluency-clean/docs/REGRAS-UX-LIMPA-E-ECONOMIA-DE-DEPLOYS.md`
- `fluency-clean/docs/BLOCO-A1-FINAL-EXAM-MODELO-DADOS-CONCLUIDO.md`

## Objetivo

Criar uma shell visual simples para a prova final do A1, sem construir ainda o fluxo completo de respostas, gravação, correção e salvamento.

## Arquivos criados/alterados

### Criado

`fluency-clean/src/components/course/A1FinalExamShell.jsx`

### Alterados

`fluency-clean/src/screens/CourseScreen.jsx`

`fluency-clean/src/styles/a1-mastery-gate.css`

## O que a UI mostra

A shell mostra:

- título da prova final do A1;
- descrição simples para o aluno;
- tempo estimado;
- aviso se a prova está liberada ou bloqueada;
- seções da prova:
  - Gramática em uso;
  - Vocabulário em contexto;
  - Leitura curta;
  - Escuta curta;
  - Fala guiada;
  - Escrita curta;
- instruções de cada seção;
- meta mínima ou aviso de revisão para Speaking/Writing;
- botão `Iniciar prova final do A1` ou `Prova ainda bloqueada`.

## Integrações

A shell usa:

- `A1_FINAL_EXAM_MODEL`
- `getA1FinalExamStudentSections()`
- `getA1MasteryGateSummary()`

Ela aparece no `CourseScreen` apenas quando o nível ativo é A1.

## UX limpa

A interface evita termos técnicos como:

- modelo de dados;
- payload;
- scoring;
- gate interno;
- schema;
- storage;
- versão técnica.

## O que este bloco não fez

Ainda não criou:

- fluxo de perguntas clicáveis;
- respostas do aluno;
- player real de listening;
- gravação real de speaking;
- editor real de writing;
- correção objetiva em tela;
- salvamento local da submissão;
- conexão automática do resultado com os critérios do A1.

## Próximo bloco recomendado

## Prova final do A1 — fluxo objetivo inicial

Objetivo:

Criar o primeiro fluxo simples para Grammar, Vocabulary, Reading e Listening:

- seleção de seção;
- renderização de perguntas objetivas;
- escolha/resposta curta;
- estado local de respostas;
- botão de calcular resultado objetivo;
- ainda sem Speaking/Writing real.

## Prompt de continuidade

```txt
Continue na branch rewrite-fluency-clean-lab.
Antes de qualquer alteração, leia:
1. REWRITE_HANDOFF.md
2. fluency-clean/docs/MASTER-CONTINUIDADE-BLOCOS-CURSO-ATE-C1-C2.md
3. fluency-clean/docs/REGRAS-UX-LIMPA-E-ECONOMIA-DE-DEPLOYS.md
4. fluency-clean/docs/BLOCO-A1-FINAL-EXAM-UI-SHELL-CONCLUIDO.md

Próximo bloco: Prova final do A1 — fluxo objetivo inicial.
Manter UX limpa, sem termos técnicos na tela do aluno.
Economizar commits/deploys.
Não criar bloco gigante: apenas Grammar, Vocabulary, Reading e Listening com respostas objetivas locais.
Não mexer em main, rewrite-fluency-clean, bundle.js, backend Azure privado, Firebase/Azure produção, speakingFlow.js, SpeakingStepper.jsx ou SpeakingScreen.jsx.
Não usar DOM injection nem bundle patch.
```
