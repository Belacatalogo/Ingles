# BLOCO-H4 — CSS Consolidation · Consolidar hotfixes em arquivos organizados

Data: 2026-05-04
Branch: `rewrite-fluency-clean-lab`

## Status

Implementado parcialmente em stage seguro.

## Objetivo

Reduzir os imports diretos de CSS no bootstrap para 5 arquivos temáticos, preparando a consolidação final dos hotfixes e estilos antigos sem alterar aparência.

## Decisão de segurança

O bloco original pede deletar fisicamente os arquivos antigos após mover todo o conteúdo. Isso é alto risco visual sem smoke test no iPhone, porque a cascata CSS pode mudar em telas como Lesson, Practice, Flashcards e Speaking.

Nesta execução foi feito o stage seguro:

- `main.jsx` importa apenas 5 arquivos CSS temáticos;
- todos os CSS antigos continuam existindo e são carregados internamente via `@import` nos agregadores;
- nenhum conteúdo CSS antigo foi editado;
- nenhum arquivo antigo foi deletado;
- a remoção física fica pendente para depois de aprovação visual no iPhone.

## Arquivos criados

- `fluency-clean/src/styles/base.css`
- `fluency-clean/src/styles/practice.css`
- `fluency-clean/src/styles/flashcards.css`
- `fluency-clean/src/styles/screens.css`
- `fluency-clean/docs/BLOCO-H4-CSS-CONSOLIDATION-LAB.md`

Observação: `fluency-clean/src/styles/lessons.css` já existia, então foi mantido como agregador/arquivo temático de aulas.

## Arquivos alterados

- `fluency-clean/src/main.jsx`
- `fluency-clean/src/styles/base.css`
- `fluency-clean/src/styles/practice.css`
- `fluency-clean/src/styles/flashcards.css`
- `fluency-clean/src/styles/screens.css`
- `REWRITE_HANDOFF.md`

## Novo bootstrap CSS

`main.jsx` agora importa somente:

```js
import './styles/base.css';
import './styles/lessons.css';
import './styles/practice.css';
import './styles/flashcards.css';
import './styles/screens.css';
```

## Mapeamento aplicado

### `base.css`

- `index.css`
- `access.css`

### `lessons.css`

Arquivo já existente mantido como núcleo de aulas.

### `practice.css`

- `choice-polish.css`
- `speaking-session.css`
- `speaking-history.css`
- `speaking-stepper-real.css`
- `practice-fullscreen.css`
- `practice-new-context.css`
- `practice-summary-cloze.css`
- `practice-mastery-recap.css`
- `practice-lives-hotfix.css`
- `practice-a11y.css`

### `flashcards.css`

- `flashcards-polish.css`
- `flashcards-session.css`
- `flashcards-new-words-hotfix.css`

### `screens.css`

- `reference.css`
- `lab-polish.css`
- `today-polish.css`
- `nav-polish.css`
- `lesson-polish.css`
- `error-bank.css`
- `level-certification.css`
- `progress-polish.css`
- `settings-polish.css`
- `listening-ux-hotfix.css`
- `lesson-preview-lab.css`
- `grammar-examples-hotfix.css`
- `hotfix-ui-consistency.css`
- `reading-complete-render-review.css`
- `reading-internal-answer-leak-hotfix.css`
- `lesson-type-stepper-real.css`

## O que NÃO foi feito

- Não deletei os arquivos CSS antigos.
- Não movi regras manualmente para evitar erro de cascata sem teste visual.
- Não alterei nenhuma regra CSS.
- Não renomeei classes.
- Não mexi em `bundle.js`.
- Não mexi em `main`.
- Não mexi em `rewrite-fluency-clean`.
- Não mexi no backend Azure privado.
- Não mexi em Firebase/Azure de produção.
- Não mexi no sistema de gravação, `speakingFlow.js`, `SpeakingStepper.jsx` ou `SpeakingScreen.jsx`.

## Critérios de aceitação

- [x] `main.jsx` importa apenas 5 arquivos CSS.
- [x] 5 arquivos temáticos existem.
- [x] CSS antigos seguem rastreáveis por comentário `/* de: arquivo.css */`.
- [x] Nenhuma regra CSS foi alterada manualmente.
- [x] Stage seguro preserva os arquivos antigos como fontes internas.
- [ ] Arquivos antigos removidos fisicamente.
- [ ] Smoke test visual no iPhone.
- [ ] Consolidação final por cópia real de conteúdo, se o smoke test aprovar.

## Checklist iPhone pendente

- Abrir Today.
- Abrir Lesson.
- Abrir Practice.
- Abrir Flashcards.
- Abrir Progress.
- Abrir Speaking e conferir tela de gravação.
- Abrir Grammar e conferir stepper.
- Abrir Listening e conferir UX de áudio.

## Próximo passo recomendado

Após aprovação visual no iPhone:

1. copiar fisicamente o conteúdo dos arquivos antigos para os 5 arquivos temáticos;
2. manter comentários `/* de: nome-original.css */`;
3. deletar arquivos antigos;
4. manter `main.jsx` com os mesmos 5 imports.
