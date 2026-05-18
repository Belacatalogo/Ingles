# BLOCO-QUALITY-DIRECTOR-07 — Estados vazios, erros e segurança visual

Data: 2026-05-18  
Branch: `main`

## Objetivo

Adicionar ao Fluency Quality Director auditoria de estados vazios, estados corrompidos e segurança visual, para evitar que o aluno veja tela branca, crash, stack trace, chaves internas, tokens, nomes de localStorage ou mensagens técnicas.

Esse bloco simula cenários comuns de app novo, app sem aula atual e localStorage inválido.

## Arquivos criados

- `fluency-clean/e2e/quality-director/helpers/emptyStateScenarios.js`
- `fluency-clean/e2e/quality-director/empty-states-security.audit.spec.js`
- `fluency-clean/docs/BLOCO-QUALITY-DIRECTOR-07-CONCLUIDO.md`

## Cenários implementados

### 1. Instalação limpa sem dados

Remove todas as chaves `fluency.clean.*` do localStorage e abre o app como aluno novo.

### 2. Estados principais como null

Força:

```txt
fluency.clean.lesson.current = null
fluency.clean.progress.summary = null
fluency.clean.progress.lessonCompletions = null
fluency.clean.mastery.skillProfile.v1 = null
```

### 3. Estados principais com JSON inválido

Força valores quebrados:

```txt
{broken-json
```

em chaves principais de aula, progresso, mastery e settings.

### 4. Sem aula atual mas com configurações básicas

Simula aluno com settings salvas, progresso inicial e nenhuma aula atual.

## O que a suíte faz

Para cada cenário:

1. aplica o estado no `localStorage` antes do app carregar;
2. abre o app;
3. confirma navegação principal;
4. percorre todas as abas:
   - Hoje
   - Curso
   - Aula
   - Cartas
   - Speaking
   - Progresso
   - Ajustes
5. captura texto da tela;
6. procura valores crus como `undefined`, `null`, `NaN`, `[object Object]`;
7. procura textos sensíveis/técnicos;
8. valida orientação clara em Aba Aula e Cartas;
9. executa auditoria visual/mobile com screenshot;
10. registra problemas por severidade.

## Padrões sensíveis/técnicos detectados

- possível Firebase/API key;
- possível secret key;
- possível bearer token;
- `apiKey:` / `secret:` / `token:`;
- stack trace;
- runtime error;
- Firebase/Auth/Firestore/IndexedDB error;
- JSON parse / SyntaxError / unexpected token;
- nomes internos como `lesson.current`, `progress.summary`, `mastery.skillProfile`, `localStorage`.

## Problemas detectáveis

### P0

- tela sem texto;
- erro JS não tratado;
- possível chave/token/secret exposto;
- storage null quebrando tela.

### P1

- console error em estado vazio/corrompido;
- parser/runtime/firebase/indexeddb exposto;
- valor cru `undefined/null/NaN/[object Object]` na UI.

### P2

- Aba Aula sem orientação clara quando não há aula atual;
- Aba Cartas sem estado vazio claro;
- problemas visuais/mobile encontrados pela auditoria visual.

## Saída gerada quando rodar

Relatórios:

```txt
audit-results/quality-director-empty-states-security-*.md
audit-results/quality-director-empty-states-security-*.json
```

Screenshots:

```txt
audit-results/screenshots/
```

## Importante

Este bloco apenas detecta problemas. Ele não muda UI nem corrige textos.

As correções devem ser feitas depois da leitura do relatório, em blocos controlados.

## Limitações atuais

- A detecção de chaves/tokens é heurística.
- Pode haver falso positivo se algum texto didático mencionar termos como `token` ou `API` de forma legítima.
- Ainda não testa permissões reais de microfone, áudio ou falha de rede.

Blocos futuros podem expandir para:

- modo offline;
- bloqueio de microfone;
- falha de áudio;
- ausência de IndexedDB;
- erro simulado de Firebase/Azure/Gemini com mensagem amigável.

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
BLOCO-QUALITY-DIRECTOR-08 — Auditor CEFR e consistência do currículo
```

Objetivo: validar coerência entre nível CEFR, mapas do currículo, aulas ready, títulos, pilares, pré-requisitos, checkpoints e renderizadores.
