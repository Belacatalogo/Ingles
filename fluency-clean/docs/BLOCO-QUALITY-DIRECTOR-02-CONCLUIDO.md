# BLOCO-QUALITY-DIRECTOR-02 — Jornada real do aluno + exercícios

Data: 2026-05-18  
Branch: `main`

## Objetivo

Expandir o Fluency Quality Director para começar a agir como um aluno real dentro das aulas, não apenas como um auditor de abas.

Este bloco adiciona uma jornada inicial de aula que:

- injeta uma aula fixa `ready` como aula atual;
- abre a aba Aula;
- verifica se o fluxo guiado carregou;
- passa por fases reais;
- interage com escolhas e campos de escrita;
- confere se há feedback depois da tentativa;
- detecta vazamento de resposta/modelo/transcript/gabarito antes da tentativa;
- detecta textos técnicos durante a jornada;
- detecta ausência de botão Continuar/Concluir;
- detecta bloqueio indevido após tentativa;
- registra problemas P0/P1/P2 no relatório.

## Também resolvido neste bloco

O usuário não quer baixar zip manualmente toda vez. Por isso o workflow agora também gera um relatório consolidado `latest` dentro do próprio repositório.

Depois de uma execução manual, o workflow tenta commitar:

```txt
fluency-clean/docs/quality-director/latest/quality-director-latest.md
fluency-clean/docs/quality-director/latest/quality-director-latest.json
```

Assim, nos próximos ciclos, o ChatGPT consegue ler o relatório direto pelo GitHub sem o usuário precisar enviar artifact zip.

## Arquivos criados

- `fluency-clean/e2e/quality-director/helpers/lessonFlowDriver.js`
- `fluency-clean/e2e/quality-director/student-journey.audit.spec.js`
- `fluency-clean/scripts/publish-quality-director-latest.mjs`
- `fluency-clean/docs/BLOCO-QUALITY-DIRECTOR-02-CONCLUIDO.md`

## Arquivos alterados

- `fluency-clean/package.json`
- `.github/workflows/quality-director.yml`

## O que o auditor de jornada faz

A suíte `student-journey.audit.spec.js` usa uma lista inicial de aulas fixas:

```js
A1-READING-001
A1-VOCABULARY-001
A1-GRAMMAR-001
```

Para cada aula:

1. busca a aula com `findStaticLesson(lessonId)`;
2. salva a aula no `localStorage` como `fluency.clean.lesson.current`;
3. desbloqueia a sessão e2e;
4. abre o app;
5. navega para a aba `Aula`;
6. valida `.lesson-flow-shell`;
7. percorre até 10 passos/fases;
8. tenta responder opções `.lesson-phase-choice`;
9. tenta preencher `.lesson-phase-input` ou `.lesson-phase-textarea`;
10. clica em `Conferir` quando existe;
11. valida feedback;
12. clica em `Continuar` ou `Concluir aula`;
13. detecta travamentos, vazamentos e bloqueios indevidos.

## Problemas detectáveis agora

### P0

- erro JavaScript não tratado durante aula;
- fase sem título renderizado;
- botão Continuar/Concluir ausente;
- aluno potencialmente preso sem ação principal.

### P1

- resposta/modelo/transcript/gabarito antes da tentativa;
- tentativa feita mas avanço continua bloqueado;
- interação sem feedback visível;
- jornada percorre poucas fases;
- texto técnico vazando durante a aula.

### P2

- problemas de qualidade que não travam, mas prejudicam a sensação profissional.

## Relatório latest

Criado script:

```bash
npm run quality-director:publish-latest
```

Esse script lê todos os JSONs em:

```txt
audit-results/
```

E gera:

```txt
fluency-clean/docs/quality-director/latest/quality-director-latest.md
fluency-clean/docs/quality-director/latest/quality-director-latest.json
```

Também escreve o resumo no `GITHUB_STEP_SUMMARY` para aparecer dentro da própria execução do Actions.

## Workflow atualizado

`.github/workflows/quality-director.yml` agora:

- tem `permissions: contents: write`;
- adiciona `FORCE_JAVASCRIPT_ACTIONS_TO_NODE24: true` para reduzir warning futuro de Node 20;
- roda `npm run quality-director:publish-latest` após os testes;
- quando a execução é manual (`workflow_dispatch`), tenta commitar o relatório latest no repositório;
- continua enviando artifacts.

Para evitar loop infinito, o commit automático do relatório só acontece quando:

```txt
github.event_name != 'push'
```

## Limitações atuais

Este bloco ainda é uma jornada inicial, não a versão final do auditor profundo.

Próximos refinamentos:

- melhorar respostas simuladas por pilar;
- expandir aulas testadas por nível e pilar;
- capturar screenshots por fase crítica;
- criar detector estrutural de transcript/modelo mais preciso por tipo de fase;
- cruzar resultado com qualidade pedagógica do exercício;
- auditar conclusão/XP em profundidade no bloco de Progresso/Mastery.

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

## Próximo bloco recomendado

```txt
BLOCO-QUALITY-DIRECTOR-03 — Auditor profundo anti-genérico de exercícios
```

Objetivo: evoluir as regras de qualidade dos exercícios para detectar respostas corretas ausentes, múltiplas respostas corretas, opções absurdas, opções muito óbvias, feedback genérico e perguntas sem relação com a aula.
