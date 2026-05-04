# BLOCO-G2 — Practice A11y Audit

Data: 2026-05-04
Branch: `rewrite-fluency-clean-lab`

## Status

Implementado.

## Objetivo

Aplicar auditoria/correções de acessibilidade na Prática Profunda:

- VoiceOver/TalkBack;
- ARIA;
- Dynamic Type no iPhone;
- touch targets mínimos;
- foco visível;
- feedback sem depender só de cor;
- respeito a `prefers-reduced-motion`.

## Arquivos criados

- `fluency-clean/src/styles/practice-a11y.css`
- `fluency-clean/docs/BLOCO-G2-PRACTICE-A11Y-AUDIT-LAB.md`

## Arquivos alterados

- `fluency-clean/src/practice/components/ChoiceGrid.jsx`
- `fluency-clean/src/practice/components/PracticeHeader.jsx`
- `fluency-clean/src/practice/components/PracticeFeedback.jsx`
- `fluency-clean/src/practice/components/AudioPrompt.jsx`
- `fluency-clean/src/practice/components/TextExercise.jsx`
- `fluency-clean/src/practice/components/SpeakExercise.jsx`
- `fluency-clean/src/practice/components/WordBankExercise.jsx`
- `fluency-clean/src/main.jsx`

## Correções aplicadas

### ChoiceGrid

- Adicionado `role="group"`.
- Botões agora têm:
  - `aria-label` descritivo;
  - `aria-pressed`;
  - `aria-disabled`;
  - classe `practice-option-btn`;
  - texto com classe `practice-option-text`.

### PracticeHeader

- Barra de progresso agora tem:
  - `role="progressbar"`;
  - `aria-valuenow`;
  - `aria-valuemin`;
  - `aria-valuemax`;
  - `aria-label` com `Questão X de Y`.
- Contador usa `aria-live="polite"`.
- Vidas usam `role="status"`.

### PracticeFeedback

- Feedback agora tem:
  - `role="alert"`;
  - `aria-live="assertive"`;
  - `aria-atomic="true"`.
- Mensagem inclui estado textual:
  - `Correto!`
  - `Quase correto.`
  - `Incorreto.`
- Botão confirmar recebeu `practice-confirm-btn` e `aria-disabled`.
- Botões de continuar/retry/dica receberam `practice-next-btn`.

### AudioPrompt

- Botão recebeu:
  - `aria-label="Ouvir novamente"`;
  - `aria-disabled`;
  - classe `practice-audio-btn`.

### TextExercise

- Textarea recebeu:
  - `aria-label`;
  - `aria-disabled`.

### SpeakExercise

- Botão de fala recebeu:
  - `aria-label`;
  - `aria-disabled`.
- Input recebeu:
  - `aria-label`;
  - `aria-disabled`.

### WordBankExercise

- Adicionado `role="group"`.
- Linha de resposta e palavras disponíveis receberam labels.
- Botões têm:
  - labels para adicionar/remover palavra;
  - `aria-disabled`.

### CSS

Criado `practice-a11y.css` com:

- touch targets mínimos de 44px;
- padding mínimo em opções;
- focus ring visível com `:focus-visible`;
- `overflow-wrap: break-word`;
- fontes em `rem` nos elementos auditados;
- input/textarea com `font-size: 1rem` para evitar zoom iOS;
- disabled com opacity 0.48;
- feedback com `✓` e `✗` além de cor;
- `prefers-reduced-motion`.

Importado em `main.jsx`:

```js
import './styles/practice-a11y.css';
```

## O que NÃO foi feito

- Não foi alterado layout funcional.
- Não foi removida animação globalmente.
- Não foi adicionado card técnico na UI.
- Não foi mexido em Firebase.
- Não foi mexido em backend Azure privado.
- Não foi mexido em `bundle.js`.
- Não foi mexido em `main` ou `rewrite-fluency-clean`.

## Critérios de aceitação cobertos por código

- [x] Botões de opção têm `aria-label` e `aria-pressed`.
- [x] Barra de progresso tem `role="progressbar"` e valores ARIA.
- [x] Feedback tem `role="alert"`.
- [x] Inputs têm `aria-label`.
- [x] Áudio tem `aria-label`.
- [x] Confirmar desabilitado tem `aria-disabled="true"`.
- [x] Touch targets mínimos de 44px.
- [x] Focus ring visível.
- [x] Feedback correto/incorreto não depende só de cor.
- [x] `prefers-reduced-motion` respeitado.

## Pendente de validação manual

- Lighthouse Accessibility score ≥ 90.
- VoiceOver no iPhone lendo “Questão X de Y”.
- VoiceOver lendo feedback automaticamente.
- Conferir contraste AA visualmente no preview.

## Próximo bloco recomendado

`BLOCO-G3-PRACTICE-IPHONE-FINAL-AUDIT-LAB`.
