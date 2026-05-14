# BLOCO 13C — A1.5 Reviews and Checkpoints — Speaking/Writing Review

Branch: `rewrite-fluency-clean-lab`

## Objetivo

Continuar o pacote `A1.5 Reviews and checkpoints` com revisões profundas de Speaking e Writing antes dos checkpoints oficiais.

Este bloco cria revisão guiada, não conteúdo novo de tema.

## Arquivo criado

- `fluency-clean/src/content/curriculum/levels/A1/deepA1ReviewsSpeakingWriting.js`

## Arquivo alterado

- `fluency-clean/src/content/curriculum/staticLessonContent.js`

## Revisões criadas

### Speaking

- `A1-SPEAKING-017` — `Speaking Review A1`

Foco:

- fala em blocos curtos;
- apresentação pessoal;
- rotina;
- pedidos práticos;
- localização;
- casa/quarto;
- clima e sentimentos;
- gravação de 30 a 60 segundos;
- preparação para `Speaking A1 Checkpoint`.

Estratégia central:

1. frases curtas;
2. blocos seguros;
3. substituição guiada;
4. gravação;
5. autocorreção leve;
6. fala final de até 1 minuto.

### Writing

- `A1-WRITING-015` — `Writing Review A1`

Foco:

- escrita A1 em frases curtas;
- apresentação;
- rotina;
- casa/quarto;
- clima/roupa;
- motivo com `because`;
- revisão de pontuação, maiúsculas, plural, verbo e conectores;
- preparação para `Writing A1 Checkpoint`.

Estratégia central:

1. escrever frases simples;
2. organizar por tema;
3. conectar poucas ideias;
4. revisar pontuação;
5. revisar verbo/plural;
6. produzir versão final.

## Conexão no currículo

`staticLessonContent.js` agora importa:

```js
A1_DEEP_REVIEWS_SPEAKING_WRITING
A1_DEEP_REVIEWS_SPEAKING_WRITING_BY_PILLAR
```

E inclui o pacote em:

- `STATIC_READY_LESSONS`;
- `STATIC_READY_LESSONS_BY_LEVEL_AND_PILLAR`;
- `mergePillarLessons()`.

## Resultado esperado

Antes dos checkpoints oficiais de Speaking e Writing, o aluno terá revisões profundas guiadas.

Essas revisões devem aparecer no pacote `A1.5 Reviews and checkpoints`, respeitando:

- cronograma semanal;
- 1 aula por dia;
- ordem guiada;
- bloqueios de progressão.

## Commits

- `9e0d72dbd53bbb3c99ef150855954c0b2169e6c0` — cria revisões A1 Speaking/Writing.
- `61b541a1f158a481343c7b60e066a93982446a91` — conecta revisões A1 Speaking/Writing.

## Próximo bloco correto

`BLOCO 13D — A1.5 Reviews and checkpoints — Fechamento/ordem dos checkpoints`

Objetivo recomendado:

- checar a ordem de revisões antes dos checkpoints;
- garantir que checkpoints existentes continuam conectados;
- registrar fechamento do A1.5;
- preparar auditoria final leve do A1 antes de avançar para A2.
