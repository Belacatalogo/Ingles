# BLOCO — Prova final do A1 — fluxo objetivo inicial

Branch: `rewrite-fluency-clean-lab`

## Status

Concluído como primeiro fluxo local das partes objetivas da prova final do A1.

## Documentos lidos antes do bloco

- `fluency-clean/docs/MASTER-CONTINUIDADE-BLOCOS-CURSO-ATE-C1-C2.md`
- `fluency-clean/docs/REGRAS-UX-LIMPA-E-ECONOMIA-DE-DEPLOYS.md`
- `fluency-clean/docs/BLOCO-A1-FINAL-EXAM-UI-SHELL-CONCLUIDO.md`

## Objetivo

Criar um fluxo simples para responder Grammar, Vocabulary, Reading e Listening dentro da shell da prova final do A1.

## Arquivos alterados

`fluency-clean/src/components/course/A1FinalExamShell.jsx`

`fluency-clean/src/styles/a1-mastery-gate.css`

## O que foi implementado

### 1. Estado local de respostas

A shell agora mantém respostas locais por seção objetiva.

### 2. Abas objetivas

Foram adicionadas abas para:

- Grammar;
- Vocabulary;
- Reading;
- Listening.

### 3. Renderização de perguntas

A UI renderiza:

- múltipla escolha;
- campos de resposta curta.

### 4. Texto de Reading

Quando a seção tem texto, ele aparece em destaque antes das perguntas.

### 5. Listening temporário

Listening mostra um aviso humano:

```txt
Nesta primeira versão, a escuta ainda usa perguntas do roteiro. O áudio real será ligado em outro bloco.
```

### 6. Resultado objetivo

Botão criado:

```txt
Ver resultado objetivo
```

Ele usa:

`scoreA1FinalExamObjectiveAnswers(...)`

E mostra a porcentagem de:

- Grammar;
- Vocabulary;
- Reading;
- Listening.

### 7. Speaking/Writing preservados

Speaking e Writing aparecem como seções da prova, mas ainda não têm fluxo real.

Eles continuam marcados como revisão necessária.

## UX limpa

A interface não mostra:

- payload;
- scoring interno;
- schema;
- storage;
- ids técnicos;
- hashes;
- nomes de arquivos.

## O que este bloco não fez

Ainda falta:

- salvar resultado local;
- conectar resultado objetivo ao A1 Gate;
- player real de áudio;
- gravação real de Speaking;
- editor real de Writing;
- revisão de Speaking/Writing;
- fluxo final de submissão.

## Próximo bloco recomendado

## Prova final do A1 — salvar resultado objetivo local

Objetivo:

- persistir respostas objetivas localmente;
- persistir resultado objetivo localmente;
- permitir recuperar tentativa anterior;
- preparar integração futura com o A1 Gate;
- não fazer Speaking/Writing ainda.

## Prompt de continuidade

```txt
Continue na branch rewrite-fluency-clean-lab.
Antes de qualquer alteração, leia:
1. REWRITE_HANDOFF.md
2. fluency-clean/docs/MASTER-CONTINUIDADE-BLOCOS-CURSO-ATE-C1-C2.md
3. fluency-clean/docs/REGRAS-UX-LIMPA-E-ECONOMIA-DE-DEPLOYS.md
4. fluency-clean/docs/BLOCO-A1-FINAL-EXAM-FLUXO-OBJETIVO-INICIAL-CONCLUIDO.md

Próximo bloco: Prova final do A1 — salvar resultado objetivo local.
Manter UX limpa, sem termos técnicos na tela do aluno.
Economizar commits/deploys.
Não criar bloco gigante: apenas persistência local das partes objetivas.
Não mexer em main, rewrite-fluency-clean, bundle.js, backend Azure privado, Firebase/Azure produção, speakingFlow.js, SpeakingStepper.jsx ou SpeakingScreen.jsx.
Não usar DOM injection nem bundle patch.
```
