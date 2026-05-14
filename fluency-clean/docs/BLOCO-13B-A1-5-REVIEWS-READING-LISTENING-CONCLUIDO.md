# BLOCO 13B — A1.5 Reviews and Checkpoints — Reading/Listening Review

Branch: `rewrite-fluency-clean-lab`

## Objetivo

Continuar o pacote `A1.5 Reviews and checkpoints` com revisões profundas de Reading e Listening antes dos checkpoints oficiais.

Este bloco cria revisão guiada, não conteúdo novo de tema.

## Arquivo criado

- `fluency-clean/src/content/curriculum/levels/A1/deepA1ReviewsReadingListening.js`

## Arquivo alterado

- `fluency-clean/src/content/curriculum/staticLessonContent.js`

## Revisões criadas

### Reading

- `A1-READING-019` — `Reading Review A1`

Foco:

- ideia geral;
- detalhes;
- evidência textual;
- vocabulário pelo contexto;
- perguntas com `where`, `when`, `why`, `what`;
- preparação para `Reading A1 Checkpoint`.

Estratégia central:

1. ler para assunto geral;
2. localizar palavras-chave;
3. voltar ao texto;
4. copiar evidência;
5. responder curto e claro.

### Listening

- `A1-LISTENING-017` — `Listening Review A1`

Foco:

- escuta em camadas;
- gist/listening geral;
- nomes;
- país;
- rotina;
- horários;
- lugares;
- dictation;
- shadowing;
- preparação para `Listening A1 Checkpoint`.

Estratégia central:

1. primeira escuta: assunto geral;
2. segunda escuta: dados-chave;
3. terceira etapa: detalhes;
4. transcript;
5. dictation;
6. shadowing.

## Conexão no currículo

`staticLessonContent.js` agora importa:

```js
A1_DEEP_REVIEWS_READING_LISTENING
A1_DEEP_REVIEWS_READING_LISTENING_BY_PILLAR
```

E inclui o pacote em:

- `STATIC_READY_LESSONS`;
- `STATIC_READY_LESSONS_BY_LEVEL_AND_PILLAR`;
- `mergePillarLessons()`.

## Resultado esperado

Antes dos checkpoints oficiais de Reading e Listening, o aluno terá revisões profundas guiadas.

Essas revisões devem aparecer no pacote `A1.5 Reviews and checkpoints`, respeitando:

- cronograma semanal;
- 1 aula por dia;
- ordem guiada;
- bloqueios de progressão.

## Commits

- `c21a737ddfd161ace1104ea041cfd3a47551d43d` — cria revisões A1 Reading/Listening.
- `505899b03a528677cd46b3c4d6b1a8896a5b28d3` — conecta revisões A1 Reading/Listening.

## Próximo bloco correto

`BLOCO 13C — A1.5 Reviews and checkpoints — Speaking/Writing Review`

Objetivo recomendado:

- criar revisão profunda de Speaking A1;
- criar revisão profunda de Writing A1;
- preparar checkpoints de fala e escrita;
- manter revisão guiada, sem conteúdo técnico na tela do aluno.
