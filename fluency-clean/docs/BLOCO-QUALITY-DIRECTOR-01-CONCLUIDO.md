# BLOCO-QUALITY-DIRECTOR-01 — Base do Fluency Quality Director

Data: 2026-05-18  
Branch: `main`

## Objetivo

Criar a primeira base permanente do **Fluency Quality Director**, um auditor automático para reduzir o risco de o aluno encontrar telas quebradas, textos técnicos, exercícios genéricos ou comportamentos estranhos durante o uso real do sistema.

Este bloco não substitui o Playwright: ele usa o Playwright como motor de navegação e adiciona uma camada de diagnóstico, severidade e relatório.

## Escopo implementado

### 1. Auditor de navegação global

Criado:

- `e2e/quality-director/navigation.audit.spec.js`
- `e2e/quality-director/helpers/appMap.js`
- `e2e/quality-director/helpers/uiAudit.js`
- `e2e/quality-director/helpers/auditReporter.js`

O auditor:

- desbloqueia o app em modo e2e com sessão local;
- abre o app;
- navega pelas abas principais:
  - Hoje
  - Curso
  - Aula
  - Cartas
  - Speaking
  - Progresso
  - Ajustes
- verifica se a aba abriu;
- procura textos esperados por área;
- procura textos proibidos/técnicos visíveis ao aluno;
- captura mensagens suspeitas no console;
- captura `pageerror` como P0;
- valida que troca de aba após rolagem volta ao topo.

### 2. Auditor inicial de qualidade pedagógica

Criado:

- `e2e/quality-director/lesson-quality.audit.spec.js`
- `e2e/quality-director/helpers/lessonAuditRules.js`

O auditor importa o currículo fixo via:

```js
getStaticLessons(level)
```

e analisa aulas `ready` com heurísticas iniciais:

- aula inválida/ausente;
- título ausente ou fraco;
- pilar/tipo indefinido;
- conteúdo curto demais;
- placeholders ou textos genéricos;
- alternativas duplicadas;
- alternativas curtas demais;
- distratores absurdos/fáceis demais;
- Reading sem indício de evidência textual.

### 3. Relatórios próprios

Criado `AuditReporter`, que gera saída em:

```txt
audit-results/
```

Formato gerado por projeto/viewport:

```txt
quality-director-navigation-iphone-13.md
quality-director-navigation-iphone-13.json
quality-director-lesson-quality-iphone-13.md
quality-director-lesson-quality-iphone-13.json
```

O relatório inclui:

- nota inicial 0–100;
- quantidade de checks;
- quantidade de problemas;
- severidade P0/P1/P2/P3;
- impacto;
- evidência;
- recomendação;
- arquivo provável quando aplicável.

### 4. Script dedicado

Atualizado:

- `package.json`

Novo script:

```bash
npm run test:quality-director
```

Executa:

```bash
playwright test e2e/quality-director
```

### 5. GitHub Actions

Criado:

- `.github/workflows/quality-director.yml`

O workflow roda em:

- `workflow_dispatch` manual;
- push na `main` quando houver alteração em `src`, quality-director, config Playwright ou package files.

Pipeline:

```txt
checkout
setup node 20
npm ci
npx playwright install --with-deps chromium
npm run build
npm run test:quality-director
upload artifacts
```

Artifacts enviados:

```txt
fluency-clean/audit-results/
fluency-clean/playwright-report/
fluency-clean/test-results/
```

## Severidades

- `P0`: quebra grave, crash, tela inutilizável ou risco sensível.
- `P1`: afeta diretamente o estudo ou confiança do aluno.
- `P2`: problema de qualidade, clareza, UX ou aparência profissional.
- `P3`: polimento/recomendação.

## Arquivos alterados/criados

Criados:

- `fluency-clean/e2e/quality-director/helpers/appMap.js`
- `fluency-clean/e2e/quality-director/helpers/auditReporter.js`
- `fluency-clean/e2e/quality-director/helpers/uiAudit.js`
- `fluency-clean/e2e/quality-director/helpers/lessonAuditRules.js`
- `fluency-clean/e2e/quality-director/navigation.audit.spec.js`
- `fluency-clean/e2e/quality-director/lesson-quality.audit.spec.js`
- `.github/workflows/quality-director.yml`
- `fluency-clean/docs/BLOCO-QUALITY-DIRECTOR-01-CONCLUIDO.md`

Alterado:

- `fluency-clean/package.json`

Corrigido:

- Workflow inicialmente criado dentro de `fluency-clean/.github/workflows/`; removido e recriado corretamente na raiz `.github/workflows/`.

## Como rodar localmente

Dentro de `fluency-clean`:

```bash
npm ci
npx playwright install --with-deps chromium
npm run test:quality-director
```

## Como rodar pelo GitHub

GitHub → Actions → **Fluency Quality Director** → Run workflow.

Depois baixar o artifact:

```txt
quality-director-results
```

## Limitações deste primeiro bloco

Este é o alicerce do Diretor de Qualidade, não a versão final.

Ainda faltam próximos blocos:

1. Auditor visual com screenshots por aba e comparação de layout.
2. Auditor interativo profundo de exercícios dentro das fases da aula.
3. Auditor de linguagem/copy mais avançado.
4. Auditor específico por pilar: Grammar, Vocabulary, Reading, Listening, Speaking, Writing.
5. Integração automática do relatório final com Notion.
6. Relatório executivo consolidado único, juntando todos os projetos/viewport.

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
Sem alteração em Firebase/Azure/Gemini/Cloudinary.
Sem alteração em conteúdo pedagógico de aula.
Sem alteração em backend.
```

## Próximo bloco recomendado

```txt
BLOCO-QUALITY-DIRECTOR-02 — Auditor interativo de exercícios e telas de aula
```

Objetivo do próximo bloco:

- abrir uma aula real;
- passar por fases;
- clicar em opções;
- verificar se resposta/feedback aparecem no momento certo;
- detectar gabarito/transcript/modelo aparecendo antes da tentativa;
- detectar aluno preso sem botão de continuar;
- tirar screenshots das fases críticas.
