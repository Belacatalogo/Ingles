# BLOCO-QUALITY-DIRECTOR-11 — Regressão inteligente por área alterada

Data: 2026-05-18  
Branch: `main`

## Objetivo

Adicionar ao Fluency Quality Director uma camada de seleção inteligente de suítes para que o CI não precise rodar sempre tudo em cada push automático.

A auditoria completa continua disponível manualmente. Em push na `main`, o workflow escolhe suítes com base nos arquivos alterados.

## Arquivos criados

- `fluency-clean/scripts/quality-director/select-suites.mjs`
- `fluency-clean/docs/BLOCO-QUALITY-DIRECTOR-11-CONCLUIDO.md`

## Arquivos alterados

- `fluency-clean/package.json`
- `.github/workflows/quality-director.yml`

## Como funciona

### Execução manual

O workflow agora possui input:

```txt
audit_mode: full | smart
```

Padrão:

```txt
full
```

Se rodar manualmente em `full`, ele executa todas as suítes do Quality Director.

### Push automático na main

Em push, o script:

```bash
node scripts/quality-director/select-suites.mjs
```

lê os arquivos alterados pelo evento do GitHub ou pelo git diff e seleciona suítes específicas.

## Suítes completas conhecidas

```txt
e2e/quality-director/navigation.audit.spec.js
e2e/quality-director/lesson-quality.audit.spec.js
e2e/quality-director/student-journey.audit.spec.js
e2e/quality-director/exercise-quality.audit.spec.js
e2e/quality-director/pillar-quality.audit.spec.js
e2e/quality-director/visual-mobile.audit.spec.js
e2e/quality-director/progress-mastery.audit.spec.js
e2e/quality-director/empty-states-security.audit.spec.js
e2e/quality-director/curriculum-consistency.audit.spec.js
e2e/quality-director/a11y-performance.audit.spec.js
```

## Regras de roteamento

### Mudanças na infra do Quality Director

Arquivos:

```txt
fluency-clean/e2e/quality-director/**
fluency-clean/scripts/quality-director/**
fluency-clean/scripts/publish-quality-director-latest.mjs
.github/workflows/quality-director.yml
```

Roda auditoria completa.

### Conteúdo/currículo

Arquivos:

```txt
fluency-clean/src/content/curriculum/**
```

Roda:

- lesson-quality;
- exercise-quality;
- pillar-quality;
- curriculum-consistency;
- student-journey.

### Fluxo de aula

Arquivos:

```txt
fluency-clean/src/lessons/flow/**
fluency-clean/src/screens/LessonScreen.jsx
```

Roda:

- student-journey;
- exercise-quality;
- visual-mobile;
- a11y-performance.

### Progresso/mastery/gates

Arquivos:

```txt
progressStore.js
masteryStore.js
masteryGate.js
lessonProgression.js
staticLessonProgress.js
curriculumPlan.js
```

Roda:

- progress-mastery;
- student-journey.

### Storage/infra cliente

Arquivos:

```txt
storage.js
diagnostics.js
firebase*.js
auth*.js
```

Roda:

- empty-states-security;
- navigation.

### UI/CSS/componentes/screens

Arquivos:

```txt
fluency-clean/src/styles/**
fluency-clean/src/**/*.css
fluency-clean/src/components/**
fluency-clean/src/screens/**
```

Roda:

- navigation;
- visual-mobile;
- a11y-performance;
- empty-states-security.

### Config/package

Arquivos:

```txt
package.json
playwright.config.js
vite.config.*
```

Roda auditoria completa.

## Smoke sempre incluído

Em modo smart, `navigation.audit.spec.js` é sempre incluído como smoke básico.

## Saída de seleção

O script gera:

```txt
audit-results/quality-director-suite-selection.json
audit-results/quality-director-suite-selection.txt
```

O workflow mostra no log:

```txt
Mode
Suites
Routes
Reasons
Files
```

## Script adicionado

No `package.json`:

```bash
npm run test:quality-director:smart
```

Esse script executa o seletor e imprime as suítes escolhidas.

## Workflow atualizado

O step antigo:

```bash
npm run test:quality-director
```

foi trocado por:

```bash
node scripts/quality-director/select-suites.mjs
npx playwright test ${{ steps.select_suites.outputs.suites }}
```

Manual `full` usa:

```bash
node scripts/quality-director/select-suites.mjs --full
```

## Benefícios

- CI mais rápido em mudanças pequenas.
- Full audit continua disponível manualmente.
- Relatório mostra por que cada suíte foi escolhida.
- Menos necessidade de rodar tudo sempre.
- Mantém cobertura mínima com smoke de navegação.

## Importante

Este bloco altera apenas a estratégia de execução dos testes. Não altera o app, aulas, UI, Firebase, Azure, Gemini ou backend.

## Confirmações

```txt
Branch: main.
Sem branch nova.
Sem PR.
Sem merge.
Sem rebase.
Sem force push.
Sem bundle patch.
Sem DOM injection.
Sem ativar Firebase/Azure/Gemini/Cloudinary real.
Sem alterar conteúdo pedagógico das aulas.
Sem mexer no backend privado.
```

## Próximo passo recomendado

Rodar o workflow manualmente em modo `full` após concluir os blocos principais para validar o Quality Director completo e gerar o relatório executivo latest.
