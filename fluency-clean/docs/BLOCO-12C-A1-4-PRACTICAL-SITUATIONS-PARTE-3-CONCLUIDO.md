# BLOCO 12C — A1.4 Practical Situations — Parte 3

Branch: `rewrite-fluency-clean-lab`

## Direção

O usuário pediu para parar a auditoria e voltar à geração de aulas profundas.

Este bloco continua o pacote correto:

- `A1.4 Practical situations`

Tema da Parte 3:

- casa;
- cômodos;
- móveis;
- descrição de quarto/casa;
- `there is / there are` aplicado;
- listening de quarto;
- speaking de descrição de quarto;
- writing sobre casa.

## Arquivo criado

- `fluency-clean/src/content/curriculum/levels/A1/deepPracticalSituationsHouse.js`

## Arquivo alterado

- `fluency-clean/src/content/curriculum/staticLessonContent.js`

## Aulas criadas

### Grammar

- `A1-GRAMMAR-010-HOUSE` — `There is / there are — house description`

Foco:

- aplicar `there is / there are` em casa/quarto;
- singular/plural;
- perguntas `Is there...?` / `Are there...?`;
- evitar erro brasileiro de usar `have/has` para existência em lugar.

### Vocabulary

- `A1-VOCABULARY-015` — `House and furniture`

Foco:

- house;
- apartment;
- room;
- bedroom;
- living room;
- kitchen;
- bathroom;
- bed;
- sofa;
- table;
- chair;
- desk;
- door/window/lamp/wardrobe/mirror.

### Reading

- `A1-READING-010` — `A description of a house`

Foco:

- leitura curta de descrição de apartamento;
- localizar cômodos e móveis;
- responder com evidência textual;
- identificar `there is / there are`.

### Listening

- `A1-LISTENING-012` — `Short conversations about a room`

Foco:

- ouvir descrição de quarto;
- identificar bed, desk, lamp, TV;
- reconhecer `there is / there isn’t`;
- shadowing e dictation.

### Speaking

- `A1-SPEAKING-015` — `Describe your room`

Foco:

- falar sobre o próprio quarto;
- usar tamanho, objetos, localização e opinião;
- gravar descrição curta de 30 segundos.

### Writing

- `A1-WRITING-010` — `Write about your house`

Foco:

- escrever descrição curta de casa/quarto;
- usar `there is / there are`;
- revisar plural, pontuação e organização.

## Conexão no currículo

`staticLessonContent.js` agora importa:

```js
A1_DEEP_PRACTICAL_SITUATIONS_HOUSE
A1_DEEP_PRACTICAL_SITUATIONS_HOUSE_BY_PILLAR
```

E inclui esse pacote em:

- `STATIC_READY_LESSONS`
- `STATIC_READY_LESSONS_BY_LEVEL_AND_PILLAR`

## Observação técnica

A aula de Grammar foi criada como aplicação prática de `There is / there are` com ID:

- `A1-GRAMMAR-010-HOUSE`

Isso evita sobrescrever o conteúdo anterior de `There is / there are`, mas mantém o foco do pacote A1.4.

## Commits

- `cc7d8a07dff60157eb544a73b25a5b622bcefb55` — cria A1.4 Practical Situations parte 3.
- `fccf150bf4b686fb0cb2ba547cfd83f3f82ef3e1` — conecta A1.4 Practical Situations parte 3.

## Próximo bloco correto

`BLOCO 12D — A1.4 Practical Situations — Parte 4`

Tema recomendado:

- clothes;
- weather;
- feelings;
- falar o que vestir/como está o clima/como se sente;
- listening curto de clima e sentimentos;
- speaking e writing com frases práticas.
