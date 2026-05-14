# BLOCO 20B — Reading completo

Branch: `rewrite-fluency-clean-lab`

## Objetivo

Corrigir a experiência das aulas de Reading antes de avançar para novos conteúdos.

Problema reportado pelo usuário:

- a aula de Reading fazia perguntas sem permitir resposta em alguns pontos;
- o modelo esperado aparecia antes da tentativa;
- o texto principal podia aparecer tarde demais;
- a produção final parecia um card passivo e não uma atividade real.

## Arquivo alterado

- `fluency-clean/src/lessons/static/StaticLessonRenderer.jsx`

## Correções aplicadas

### 1. Texto principal antes das perguntas

O render de Reading profundo foi reorganizado.

Nova ordem principal:

1. Hero da aula;
2. Core flow;
3. Objetivo de leitura;
4. Vocabulário antes do texto;
5. Estratégia de leitura;
6. **Texto principal**;
7. Primeira leitura com campo de resposta;
8. Segunda leitura com campo de resposta;
9. Perguntas com evidência;
10. Vocabulário pelo contexto;
11. Resumo e produção com campo de resposta;
12. Revisão final;
13. Conclusão.

### 2. Primeira leitura agora é interativa

Antes:

- `firstReadTask` era exibido como card passivo.

Agora:

- `firstReadTask` passa por `AttemptList`;
- o aluno precisa escrever resposta;
- o modelo só aparece depois da tentativa, se existir.

### 3. Segunda leitura agora é interativa

Antes:

- `secondReadTasks` apareciam como cards sem campo.

Agora:

- `secondReadTasks` passam por `AttemptList`;
- cada item tem textarea;
- instrução incentiva voltar ao texto e responder com evidência.

### 4. Resumo e produção agora são interativos

Antes:

- `DeepProduction` mostrava `Modelo esperado` direto quando existia `expected`.

Agora:

- `DeepProduction` usa `AttemptList`;
- o aluno escreve antes;
- modelo de comparação só aparece após tentativa.

### 5. Modelo esperado escondido até tentativa

Criado helper:

- `expectedOf(item)`

Ele reconhece:

- `expected`;
- `answer`;
- `expectedAnswer`;
- `correctAnswer`.

Esses campos não aparecem diretamente no card. Eles só aparecem no feedback após resposta.

### 6. Render de texto mais seguro

A função `textOf` foi ajustada para priorizar:

1. `instruction`;
2. `question`;
3. `text`;
4. `content`;
5. `chunk`;
6. `word`;
7. `title`;
8. `label`;
9. `prompt`.

Isso reduz risco de renderizar campos ruins ou objetos crus.

### 7. Reading legado também melhorado

`StaticReadingLesson` também foi ajustado:

- texto principal continua antes das perguntas;
- evidência textual vira `AttemptList`;
- resposta curta e produção viram `AttemptList`.

## Componentes/Helpers adicionados ou ajustados

### `AttemptList`

Novo componente interno para atividades abertas.

Função:

- mostrar instrução;
- abrir textarea;
- registrar tentativa;
- só depois mostrar modelo esperado, quando existir.

### `expectedOf`

Helper para centralizar a leitura de gabaritos/modelos sem renderizar antes da tentativa.

## Escopo intencional do bloco

Este bloco focou Reading e produção aberta. Speaking, Writing e Listening ainda serão refinados em blocos próprios, embora `DeepProduction` já tenha ficado mais seguro globalmente.

## Riscos/observações

- O arquivo `StaticLessonRenderer.jsx` continua concentrando muitos renders. Isso será melhorado gradualmente nos blocos seguintes.
- A mudança de `DeepProduction` melhora segurança em todos os pilares, mas Speaking/Writing ainda precisam de componentes específicos nos próximos blocos.

## Status

Concluído.

## Próximo bloco

`BLOCO 20C — Speaking completo`

Foco:

- aula de Speaking precisa exigir fala real;
- usar botão/fallback de fala;
- gravação guiada e fala livre não devem ser cards passivos.

## Commit

- `bf6774e325534c583add68169d0de965ee86eded` — reorganiza Reading e esconde modelos antes da tentativa.
