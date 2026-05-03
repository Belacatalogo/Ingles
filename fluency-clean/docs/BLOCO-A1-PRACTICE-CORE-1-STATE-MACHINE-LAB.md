# BLOCO-A1 — Practice Core 1 · State Machine formal

Data: 2026-05-03
Branch: `rewrite-fluency-clean-lab`

## Status

Implementado.

## Pré-requisitos

Nenhum. Este é o primeiro bloco da Fase A — fundação.

## Objetivo

Criar uma máquina de estado formal para a sessão de Prática Profunda, substituindo o controle implícito por transições explícitas e nomeadas.

A máquina garante que feedback nunca aparece antes da tentativa, que checagens tenham estado dedicado e que o salvamento ocorra em ponto único e previsível.

## Arquivos criados

- `fluency-clean/src/practice/core/PracticeStateMachine.js`
- `fluency-clean/docs/BLOCO-A1-PRACTICE-CORE-1-STATE-MACHINE-LAB.md`

## Arquivos alterados

- `fluency-clean/src/practice/core/index.js`
- `fluency-clean/src/practice/PracticeFullscreen.jsx`

## Estados oficiais

- `INIT`
- `READY`
- `PRESENTING`
- `ANSWERING`
- `CHECKING`
- `FEEDBACK`
- `TRANSITIONING`
- `SAVING`
- `DONE`
- `ABORTED`

## Eventos oficiais

- `PLAN_LOADED`
- `START`
- `USER_INTERACTED`
- `USER_SUBMITTED`
- `CHECK_DONE`
- `NEXT`
- `ALL_DONE`
- `SAVE_DONE`
- `ABORT`
- `RESET`

## Implementação

### `PracticeStateMachine.js`

Criado módulo com:

- `PRACTICE_STATES`
- `PRACTICE_EVENTS`
- tabela única de transições internas
- `getPracticeTransitionTarget(state, event)`
- `isPracticeState(state)`
- `isPracticeEvent(event)`
- `createPracticeStateMachine(initialContext)`
- `usePracticeStateMachine(initialContext)`

Transições inválidas não quebram a UI. Elas retornam `{ ok: false, reason: 'invalid_transition' }` e registram warning no console.

### `PracticeFullscreen.jsx`

A fase da sessão saiu das flags soltas e passou a ser controlada pela máquina:

- abertura da prática: `INIT → READY`
- começar: `READY → PRESENTING`
- primeira interação: `PRESENTING → ANSWERING`
- confirmar resposta: `ANSWERING → CHECKING`
- avaliação concluída: `CHECKING → FEEDBACK`
- próximo exercício: `FEEDBACK → TRANSITIONING → PRESENTING`
- final da lista: `FEEDBACK → SAVING → DONE`
- fechamento antes do final: `ABORT`

O estado `CHECKING` existe mesmo para validação síncrona, com delay curto apenas para manter a fase previsível e impedir feedback instantâneo fora da máquina.

## Compatibilidade preservada

- `PracticeSessionState.js` não foi alterado.
- O builder de itens não foi alterado.
- O avaliador de respostas não foi alterado.
- A UI visual existente da Prática Profunda foi preservada.
- Áudio, fala, word bank, texto e escolha continuam usando os componentes existentes.

## Regras garantidas neste bloco

- Feedback só é passado aos componentes filhos quando `state === FEEDBACK`.
- Durante `CHECKING`, o botão fica como `Conferindo...` e não envia novamente.
- Ao concluir todos os exercícios, `onComplete` roda no estado `SAVING` e depois a tela final aparece em `DONE`.
- Fechamento antes do fim dispara `ABORT` quando a transição é válida.

## Critérios de aceitação

- [x] Arquivo `PracticeStateMachine.js` criado com estados, eventos, transições, máquina e hook.
- [x] `index.js` do core exporta os novos símbolos.
- [x] `PracticeFullscreen.jsx` consome a máquina.
- [x] Feedback fica condicionado ao estado `FEEDBACK`.
- [x] Transições inválidas não quebram a UI.
- [x] `CHECKING` existe antes de `FEEDBACK`.
- [x] `SAVING` centraliza a finalização da prática.

## O que NÃO foi feito

- Não foi adicionada validação de resposta dentro da máquina.
- Não foi acoplado Firebase à máquina.
- Não foram adicionadas libs externas.
- Não foi alterado `PracticeSessionState.js`.
- Não foi mexido em `bundle.js`.
- Não foi mexido em `main`, `rewrite-fluency-clean` ou backend Azure privado.

## Checklist iPhone

- Abrir uma aula e iniciar a Prática Profunda.
- Confirmar que a tela "Começar prática" aparece.
- Apertar começar e confirmar que o primeiro exercício aparece.
- Tocar em uma opção e confirmar que não aparece feedback antes da checagem.
- Confirmar resposta e ver o estado visual `Conferindo...` antes do feedback.
- Apertar continuar e validar o próximo exercício.
- Concluir todos os exercícios e verificar a tela final.
- Fechar a prática no meio e confirmar que a UI não quebra.

## Próximo bloco recomendado

`BLOCO-A2-PRACTICE-CORE-2-LEAK-DETECTOR-LAB`.
