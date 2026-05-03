# BLOCO-LISTENING-STEPPER-REAL-LAB

Data: 2026-05-03
Branch: `rewrite-fluency-clean-lab`

## Status

Implementado na branch LAB.

## Objetivo

Portar o padrão de stepper real aprovado na Reading para Listening, respeitando a natureza de uma aula de escuta.

A Listening deve proteger a primeira escuta sem leitura, manter controles de áudio limpos e só abrir transcrição quando o aluno decidir conferir.

## Arquivos alterados

- `fluency-clean/src/lessons/ListeningLessonClean.jsx`
- `fluency-clean/src/styles/lesson-type-stepper-real.css`
- `fluency-clean/src/main.jsx`
- `fluency-clean/docs/BLOCO-LISTENING-STEPPER-REAL-LAB.md`

## Etapas adicionadas

A Listening agora possui stepper real com 8 etapas:

1. Preparar
2. 1ª escuta
3. Compreensão
4. Texto
5. Vocabulário
6. Shadowing
7. Produção
8. Concluir

## O que foi feito

### 1. Stepper próprio da Listening

- Criado `listeningFlowSteps`.
- Criado estado `activeStep`.
- Criado componente `ListeningStepper`.
- Cada etapa aponta para uma parte real da aula.
- Clicar em uma etapa abre a seção correspondente quando necessário.

### 2. Primeira escuta preservada

- A transcrição continua fechada por padrão.
- O botão principal de áudio permanece no topo.
- Ao iniciar áudio, a etapa ativa vira `1ª escuta`.

### 3. Fluxo adaptado à escuta

A aula agora guia o aluno por:

- preparação;
- escuta sem leitura;
- compreensão auditiva;
- abertura da transcrição;
- vocabulário;
- shadowing;
- produção curta;
- conclusão.

### 4. Diálogo multi-voz preservado

O sistema existente foi mantido:

- `parseDialogueTurns`;
- `prepareMultiSpeakerDialogue`;
- `playPreparedMultiSpeakerDialogue`;
- `stopMultiSpeakerAudio`;
- cache/áudio natural/fallback.

### 5. Shadowing preservado

- O bloco de shadowing continua usando frase atual.
- Botão `Ouvir frase` atualiza a etapa ativa para Shadowing.

## O que não foi feito

- Não foi mexido em `bundle.js`.
- Não foi mexido em `main`.
- Não foi mexido em `rewrite-fluency-clean`.
- Não foi mexido no backend Azure privado.
- Não foi alterado o motor de áudio.
- Não foi removida a transcrição controlada.

## Checklist de teste no iPhone

Validar com `Testar Listening`:

- o stepper aparece com 8 etapas;
- o stepper rola horizontalmente no iPhone;
- clicar nas etapas leva para as seções corretas;
- primeira escuta continua sem leitura;
- transcrição continua fechada no início;
- botão de áudio principal continua funcionando;
- se for diálogo, preparação e reprodução continuam funcionando;
- vocabulário abre corretamente;
- shadowing continua funcionando;
- textarea de resumo abre teclado;
- salvar rascunho funciona;
- concluir Listening funciona;
- não apareceu card técnico de contrato/política.
