# HOTFIX-QUALITY-DIRECTOR-REAL-STUDENT-REGRESSION-01 — Regressão real do aluno

Data: 2026-05-18  
Branch: `main`

## Motivo

O usuário encontrou manualmente três erros críticos que o Quality Director não sinalizou com precisão:

1. `[object Object]` aparecendo dentro da aula.
2. Stepper da aula permitindo tocar em etapas futuras e pular a página atual.
3. Aba Curso mostrando várias aulas como disponíveis, permitindo estudar fora da sequência guiada.

Isso mostrou uma falha de confiabilidade do Diretor: ele detectava muitos problemas técnicos/pedagógicos, mas não validava suficientemente a experiência real do aluno na tela.

## Objetivo

Transformar esses erros reais em regressões automáticas P0/P1 para que o sistema não dependa do aluno encontrar esse tipo de bug manualmente.

## Arquivos criados

- `fluency-clean/e2e/quality-director/real-student-regression.audit.spec.js`
- `fluency-clean/docs/HOTFIX-QUALITY-DIRECTOR-REAL-STUDENT-REGRESSION-01-CONCLUIDO.md`

## Arquivos alterados

- `fluency-clean/scripts/quality-director/select-suites.mjs`

## O que a nova suíte valida

### 1. Aula não pode vazar textos técnicos

Abre `A1-GRAMMAR-001`, percorre etapas iniciais e falha se aparecer:

```txt
[object Object]
undefined
null
NaN
```

Se aparecer, registra P0 porque é erro visível direto para o aluno.

### 2. Stepper não pode pular etapa futura

Abre aula real e valida que etapa futura no stepper está bloqueada:

- `disabled=true` ou `aria-disabled=true`;
- clicar não pode mudar a fase atual.

Se a fase mudar, registra P0.

### 3. Curso não pode mostrar múltiplas aulas disponíveis

Abre a aba Curso e conta:

- `.course-lesson-row.ready`;
- textos de estado como `Disponível` ou `Próxima`.

Se houver mais de uma aula liberada visualmente, registra P0.

## Integração no Quality Director

A suíte foi adicionada ao `FULL_SUITES`:

```txt
e2e/quality-director/real-student-regression.audit.spec.js
```

Também foi adicionada às rotas smart de:

- conteúdo/currículo;
- fluxo de aula;
- progresso/mastery;
- storage/infra;
- UI/CSS/screens;
- infra do Quality Director.

## Importante

Este hotfix é sobre a confiança do Quality Director, não apenas sobre o bug visual.

O objetivo é que qualquer erro equivalente ao que o usuário encontrou manualmente vire falha automática do Diretor.

## Próximo passo

Rodar novamente o workflow:

```txt
Actions → Fluency Quality Director → Run workflow → audit_mode: full
```

Depois verificar no relatório:

```txt
quality-director-real-student-regression
```

Se a correção estiver boa, essa suíte deve aparecer sem P0 para os três casos.

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
