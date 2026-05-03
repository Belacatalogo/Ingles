# BLOCO-A2 — Practice Core 2 · Detector de Resposta Vazada Estendido

Data: 2026-05-03
Branch: `rewrite-fluency-clean-lab`

## Status

Implementado.

## Pré-requisitos

- `BLOCO-A1-PRACTICE-CORE-1-STATE-MACHINE-LAB` implementado.

## Objetivo

Criar uma camada dedicada de detecção de resposta vazada para a Prática Profunda, coexistindo com o `PracticeQualityGate.js` atual.

O foco deste bloco é impedir que questões cheguem ao render quando a resposta aparece de forma direta ou sutil no enunciado, nas opções ou na transcrição de Listening.

## Arquivos criados

- `fluency-clean/src/practice/core/PracticeLeakDetector.js`
- `fluency-clean/docs/BLOCO-A2-PRACTICE-CORE-2-LEAK-DETECTOR-LAB.md`

## Arquivos alterados

- `fluency-clean/src/practice/core/index.js`
- `fluency-clean/src/practice/core/PracticeBuilder.js`

## Sistema de risco

Criado `LEAK_RISK`:

- `CLEAN: 0` — sem vazamento detectado.
- `MILD: 1` — vazamento leve, tenta sanitizar e revalidar.
- `MEDIUM: 2` — vazamento médio, tenta rebaixar para questão de vocabulário mantendo o skill.
- `SEVERE: 3` — vazamento severo, descarta.

## Verificações implementadas

`detectAnswerLeak(question)` verifica:

1. `leak_literal_in_prompt` — resposta literal aparece no enunciado.
2. `leak_stem_in_prompt` — radical/stem da resposta aparece no enunciado.
3. `leak_translation_in_prompt` — variante de `acceptedAnswers` aparece no enunciado.
4. `leak_obvious_marker_in_options` — opção marcada como correta por texto/símbolo.
5. `leak_transcript_in_listening` — 3+ palavras consecutivas do áudio aparecem no enunciado em Listening.
6. `leak_explanation_in_prompt` — explicação aparece antes dentro do enunciado.

## Funções criadas

- `detectAnswerLeak(question)`
- `sanitizeQuestion(question, leak)`
- `downgradeQuestion(question, context)`
- `applyLeakDetector(questions, context)`
- Auxiliares exportáveis/testáveis:
  - `containsLiteralAnswer`
  - `containsStemAnswer`
  - `stemWord`
  - `containsTranslationLeak`
  - `hasObviousCorrectMarker`
  - `isListeningType`
  - `hasTranscriptInPrompt`

## Integração no pipeline

Em `PracticeBuilder.js`, o fluxo passou a ser:

1. `builder(context)` gera candidatos.
2. `filterPracticeQuestions(candidates, limits)` valida estrutura.
3. `applyLeakDetector(structurallyValid, context)` filtra vazamento.
4. `orderByPhase(leakResult.accepted, phasePlan)` ordena por fase.
5. `chooseQuestionCount(...)` define quantidade final.

## Quality metadata

O plano agora registra internamente:

- `leakSanitized`
- `leakDowngraded`
- `leakDiscarded`
- `leakSanitizedItems`
- `leakDowngradedItems`
- `leakDiscardedItems`

Quando houver ação do detector, o console registra resumo interno via:

`[PracticeBuilder] Leak detector summary`

Nada disso aparece na UI da aula.

## Compatibilidade preservada

- `PracticeQualityGate.js` não foi substituído.
- `PracticeAnswerChecker.js` não foi alterado.
- `PracticeStateMachine.js` não foi alterado.
- Componentes visuais da Prática Profunda não foram alterados.
- `bundle.js` não foi alterado.
- Backend Azure privado não foi alterado.

## Critérios de aceitação

- [x] `PracticeLeakDetector.js` criado.
- [x] `LEAK_RISK` criado.
- [x] Detector possui funções de detecção, sanitização, rebaixamento e aplicação no pipeline.
- [x] `index.js` exporta o detector.
- [x] `PracticeBuilder.js` chama o detector entre quality gate estrutural e ordenação por fase.
- [x] Plano registra `leakSanitized`, `leakDowngraded` e `leakDiscarded`.
- [x] Dados técnicos ficam internos, sem poluir a UI.

## O que NÃO foi feito

- Não foi criada UI para mostrar vazamentos.
- Não foi substituído o quality gate estrutural.
- Não foi alterada a matriz de pureza por skill; isso fica para o bloco A3.
- Não foi feita mudança em `main`, `rewrite-fluency-clean`, `bundle.js` ou backend Azure privado.

## Checklist futuro de validação após bloco 5

- Abrir uma aula gerada pela IA.
- Iniciar a Prática Profunda.
- Confirmar que a resposta não aparece no enunciado.
- Confirmar que Listening não mostra a frase do áudio no prompt.
- Confirmar que opções não vêm marcadas com “correta”, “✓” ou similares.
- Aceitar que a quantidade final de questões pode cair quando o detector descartar vazamentos.

## Próximo bloco recomendado

`BLOCO-A3-PRACTICE-CORE-3-PURITY-MATRIX-LAB`.
