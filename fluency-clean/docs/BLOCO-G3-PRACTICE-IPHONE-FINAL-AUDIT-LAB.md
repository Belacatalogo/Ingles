# BLOCO-G3 — Practice iPhone Final Audit LAB

Data: 2026-05-04
Branch: `rewrite-fluency-clean-lab`

## Status

Implementado tecnicamente.

A aprovação final ainda depende do smoke test manual no iPhone após deploy do preview da branch lab.

## Objetivo

Auditoria final da Prática Profunda no iPhone, com ajustes seguros de CSS/JSX para:

- safe area;
- teclado iOS;
- inputs sem zoom automático;
- touch target mínimo;
- overflow/scroll;
- reduced motion;
- foco visível;
- VoiceOver básico;
- preservação da lógica da prática.

## Arquivos alterados

- `fluency-clean/src/styles/practice-a11y.css`
- `fluency-clean/src/practice/components/TextExercise.jsx`
- `fluency-clean/src/practice/components/SpeakExercise.jsx`
- `fluency-clean/src/practice/components/SummaryClozeExercise.jsx`
- `fluency-clean/src/practice/components/NewContextExercise.jsx`

## O que foi confirmado antes de finalizar

- `practice-a11y.css` já estava importado em `fluency-clean/src/main.jsx`.
- `TextExercise.jsx` já usava `practice-text-input`, `font-size` protegido por CSS, `autoComplete="off"`, `autoCapitalize="off"`, `autoCorrect="off"`, `spellCheck={false}` e `inputMode="text"`.
- `SpeakExercise.jsx` já preservava o botão de fala e o input alternativo sem alterar o motor de gravação.
- `SummaryClozeExercise.jsx` já usava inputs inline com `type="text"`, autocomplete desligado, capitalização desligada e label por lacuna.
- `NewContextExercise.jsx` ainda precisava de reforço seguro de acessibilidade.

## Ajustes aplicados

### CSS de acessibilidade/iPhone

Em `practice-a11y.css`:

- mantido `scroll-padding-bottom` em `html, body` para reduzir risco de teclado cobrir campos;
- mantido safe area em `.practice-fullscreen`, `.practice-topbar`, `.practice-feedback`, `.practice-question`, `.practice-intro` e `.practice-done`;
- reforçado `overflow-wrap`, `word-break`, `min-width: 0` e `max-width: 100%` para New Context e Summary Cloze;
- mantido touch target mínimo de 44px para botões críticos;
- mantido botão de fala com mínimo de 56px;
- mantida proteção de input contra zoom automático no iOS com `font-size: max(1rem, 16px)`;
- mantido foco visível com `:focus-visible`;
- mantido `prefers-reduced-motion: reduce` para reduzir animações;
- mantidas transições curtas em 180ms.

### NewContextExercise

Em `NewContextExercise.jsx`:

- adicionado `role="radiogroup"` nas opções;
- adicionado `role="radio"` em cada opção;
- adicionado `aria-checked` para VoiceOver saber qual alternativa está selecionada;
- adicionado `aria-disabled` nos botões quando existe feedback;
- marcado o rótulo visual A/B/C como `aria-hidden="true"` para reduzir ruído de leitura;
- adicionado `aria-disabled` no botão Confirmar.

Não foi alterado:

- cálculo de resposta correta/incorreta;
- seleção de alternativa;
- chamada `onSelect(selected)`;
- estrutura pedagógica da questão.

## Escopo preservado

Não foi mexido em:

- `main`;
- `rewrite-fluency-clean`;
- `bundle.js`;
- backend Azure privado;
- Firebase;
- Azure;
- sistema de gravação;
- `speakingFlow.js`;
- `SpeakingStepper.jsx`;
- `SpeakingScreen.jsx`.

Não foi usado:

- DOM injection;
- bundle patch;
- HTML remendado;
- gambiarra fora de `fluency-clean/src/`, `fluency-clean/public/` ou arquivos reais de configuração.

## Checklist técnico concluído

- [x] Safe area reforçada.
- [x] Teclado iOS considerado com `scroll-padding-bottom` e padding inferior.
- [x] Inputs com fonte mínima de 16px via CSS.
- [x] Touch target mínimo de 44px nos botões principais.
- [x] Botão de fala com mínimo de 56px.
- [x] Overflow/word-break reforçado para telas estreitas.
- [x] Reduced motion respeitado.
- [x] Foco visível reforçado.
- [x] VoiceOver básico reforçado em New Context.
- [x] Lógica da prática preservada.

## Smoke test manual pendente no iPhone

Executar no preview da branch `rewrite-fluency-clean-lab`:

1. Abrir aula Grammar A1 e iniciar Prática Profunda.
2. Testar múltipla escolha, correction, word bank e resposta curta.
3. Abrir teclado em resposta curta e confirmar se o campo e o botão continuam acessíveis.
4. Concluir prática e verificar MasteryRecap sem overflow em largura 375px.
5. Abrir aula Listening B1 e testar áudio, escolha, ditado e shadowing.
6. Abrir aula Speaking A2 e confirmar que o fluxo aprovado de Speaking continua intacto.
7. Abrir Reading B1 com `summary_cloze` e confirmar inputs inline.
8. Abrir Reading B1 com `new_context` e confirmar blockquote, seleção, foco e botão Confirmar.
9. Confirmar ausência de crash no fluxo normal.
10. Confirmar ausência de resposta vazada visível antes do feedback.

## Resultado

O BLOCO-G3 ficou tecnicamente encerrado no código e documentado. A liberação final depende apenas da validação manual no iPhone depois do deploy do preview.
