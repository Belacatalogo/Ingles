# BLOCO-QUALITY-DIRECTOR-12 — Exploratory Student Audit

Data: 2026-05-18  
Branch: `main`

## Motivo

O usuário apontou corretamente que testes de regressão baseados apenas nos erros já vistos não são suficientes.

O objetivo do Quality Director não pode ser apenas impedir repetição de bugs conhecidos. Ele precisa procurar erros desconhecidos antes do aluno encontrar.

## Objetivo

Adicionar uma camada exploratória de experiência real do aluno baseada em invariantes gerais.

Invariantes são regras que devem ser verdadeiras em qualquer tela, aula, clique ou estado do sistema.

Exemplos:

- nunca mostrar `[object Object]`, `undefined`, `null`, `NaN`;
- nunca mostrar stack trace ou nomes internos;
- nunca deixar aluno sem ação principal em uma aula;
- nunca permitir pular etapa futura;
- nunca mostrar mais de uma aula liberada no Curso;
- nunca renderizar tela quase vazia sem explicação;
- nunca deixar botão interativo fora da tela;
- nunca deixar elementos interativos sem propósito/nome.

## Arquivos criados

- `fluency-clean/e2e/quality-director/helpers/studentExperienceInvariants.js`
- `fluency-clean/e2e/quality-director/exploratory-student-audit.spec.js`
- `fluency-clean/docs/BLOCO-QUALITY-DIRECTOR-12-EXPLORATORY-STUDENT-AUDIT-CONCLUIDO.md`

## Arquivos alterados

- `fluency-clean/scripts/quality-director/select-suites.mjs`

## O que o explorador faz

### 1. Varredura exploratória de abas

Percorre abas principais:

```txt
Hoje
Curso
Aula
Cartas
Speaking
Progresso
Ajustes
```

Em cada aba:

- espera a navegação principal;
- aplica invariantes gerais;
- clica nos primeiros botões seguros visíveis;
- aplica invariantes novamente após cada ação.

Ele evita ações destrutivas por texto:

```txt
excluir
apagar
reset
sair
deletar
```

### 2. Varredura exploratória de aulas reais

Pega uma amostra de aulas `ready` por pilar e nível.

Abre aulas reais pelo fluxo normal e percorre as primeiras etapas.

A cada etapa:

- aplica invariantes gerais;
- tenta satisfazer a fase;
- tenta avançar com Continuar/Concluir;
- registra anomalias.

## Invariantes implementados

### Texto técnico cru

Falha se aparecer:

```txt
[object Object]
undefined
null
NaN
SyntaxError
JSON parse
Unexpected token
stack trace
runtime error
lesson.current
progress.summary
mastery.skillProfile
localStorage
indexedDB
api key
secret
token
lorem ipsum
todo:
coming soon
```

### Becos sem saída

Detecta mensagens como:

```txt
não foi possível continuar
erro ao renderizar
algo deu errado
falha ao carregar
tente novamente mais tarde
```

E verifica se existe ação de recuperação.

### Sanidade de layout

Detecta:

- tela quase sem texto;
- overflow horizontal;
- botões fora da tela;
- muitos botões pequenos.

### Sanidade do fluxo da aula

Detecta:

- aula sem ação principal visível;
- stepper com etapa futura clicável.

### Sanidade do Curso

Detecta:

- mais de uma aula liberada no Curso;
- múltiplos estados `Disponível` ou `Próxima`.

### Elementos interativos

Detecta:

- botões, links ou campos visíveis sem nome/propósito.

## Integração no Quality Director

A suíte foi adicionada ao full audit:

```txt
e2e/quality-director/exploratory-student-audit.spec.js
```

Também foi adicionada ao smoke sempre executado no modo smart:

```txt
ALWAYS_SMOKE = navigation + exploratory-student-audit
```

E entra em rotas smart de:

- currículo;
- fluxo de aula;
- progresso/mastery;
- storage;
- UI/CSS;
- infra do Quality Director.

## Diferença para regressão real do aluno

`real-student-regression.audit.spec.js` cobre erros conhecidos e específicos.

`exploratory-student-audit.spec.js` procura erros desconhecidos usando regras gerais de experiência.

As duas suítes são complementares.

## Limitações honestas

Este bloco aumenta muito a cobertura preventiva, mas não promete que nenhum erro jamais passará.

O que ele faz é reduzir drasticamente a chance de o aluno encontrar erros visíveis básicos durante estudo normal.

Para aumentar ainda mais a confiança, próximos passos possíveis:

- aumentar amostragem de aulas por nível;
- adicionar crawler com limite de cliques por tela;
- adicionar screenshots por anomalia;
- executar em mais viewports;
- adicionar análise de conteúdo semântico por aula;
- adicionar contratos de schema por pilar;
- rodar nightly full audit automaticamente.

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
