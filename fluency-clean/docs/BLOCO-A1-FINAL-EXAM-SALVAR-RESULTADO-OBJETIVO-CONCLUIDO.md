# BLOCO — Prova final do A1 — salvar resultado objetivo local

Branch: `rewrite-fluency-clean-lab`

## Status

Concluído como persistência local inicial das partes objetivas da prova final do A1.

## Documentos lidos antes do bloco

- `fluency-clean/docs/MASTER-CONTINUIDADE-BLOCOS-CURSO-ATE-C1-C2.md`
- `fluency-clean/docs/REGRAS-UX-LIMPA-E-ECONOMIA-DE-DEPLOYS.md`
- `fluency-clean/docs/BLOCO-A1-FINAL-EXAM-FLUXO-OBJETIVO-INICIAL-CONCLUIDO.md`

## Objetivo

Salvar no aparelho as respostas e o resultado das partes objetivas da prova final do A1.

## Arquivo criado

`fluency-clean/src/services/a1FinalExamAttemptService.js`

Funções criadas:

- `getA1FinalExamObjectiveAttempt()`
- `saveA1FinalExamObjectiveAttempt(objectiveAnswers)`
- `clearA1FinalExamObjectiveAttempt()`

## Arquivos alterados

`fluency-clean/src/components/course/A1FinalExamShell.jsx`

`fluency-clean/src/styles/a1-mastery-gate.css`

## O que foi implementado

### 1. Salvamento local

Ao clicar em:

```txt
Salvar e ver resultado
```

O sistema salva localmente:

- respostas objetivas;
- resultado calculado;
- versão da prova;
- data do salvamento.

### 2. Recuperação de tentativa anterior

Quando a tela da prova abre, se existir uma tentativa local válida, ela é recuperada.

A UI mostra:

```txt
Tentativa anterior recuperada.
```

### 3. Mensagem de salvamento

Depois de salvar, a UI mostra:

```txt
Resultado salvo.
```

### 4. Resultado preservado

O resultado objetivo fica disponível para futura conexão com os critérios do A1.

## UX limpa

A tela não mostra:

- nome da chave local;
- nome técnico do storage;
- payload;
- versão técnica;
- schema;
- hash;
- nomes de arquivo.

## O que este bloco não fez

Ainda falta:

- conectar resultado objetivo ao painel de critérios do A1;
- registrar nota final por pilar no `a1MasteryGateService`;
- player real de Listening;
- Speaking real;
- Writing real;
- revisão de Speaking/Writing;
- submissão final completa da prova.

## Observação

A primeira tentativa de atualizar `A1FinalExamShell.jsx` foi bloqueada pela ferramenta de segurança. Foi feita uma versão mais limpa e objetiva, que foi aceita.

## Próximo bloco recomendado

## Prova final do A1 — conectar resultado objetivo aos critérios do A1

Objetivo:

- pegar resultado salvo de Grammar, Vocabulary, Reading e Listening;
- registrar esses pilares no serviço do A1;
- manter Speaking/Writing ainda pendentes;
- atualizar o painel de critérios do A1 automaticamente;
- não liberar A2 ainda sem Speaking/Writing revisados.

## Prompt de continuidade

```txt
Continue na branch rewrite-fluency-clean-lab.
Antes de qualquer alteração, leia:
1. REWRITE_HANDOFF.md
2. fluency-clean/docs/MASTER-CONTINUIDADE-BLOCOS-CURSO-ATE-C1-C2.md
3. fluency-clean/docs/REGRAS-UX-LIMPA-E-ECONOMIA-DE-DEPLOYS.md
4. fluency-clean/docs/BLOCO-A1-FINAL-EXAM-SALVAR-RESULTADO-OBJETIVO-CONCLUIDO.md

Próximo bloco: Prova final do A1 — conectar resultado objetivo aos critérios do A1.
Manter UX limpa, sem termos técnicos na tela do aluno.
Economizar commits/deploys.
Não criar bloco gigante: apenas conectar Grammar, Vocabulary, Reading e Listening ao serviço do A1.
Não mexer em main, rewrite-fluency-clean, bundle.js, backend Azure privado, Firebase/Azure produção, speakingFlow.js, SpeakingStepper.jsx ou SpeakingScreen.jsx.
Não usar DOM injection nem bundle patch.
```
