# BLOCO 12E — A1.4 Practical Situations — Parte 5

Branch: `rewrite-fluency-clean-lab`

## Objetivo

Fechar o pacote profundo `A1.4 Practical situations` com situações práticas de ajuda, repetição, instruções finais, verbos comuns e object pronouns.

Tema da Parte 5:

- object pronouns;
- common verbs;
- pedir ajuda;
- pedir repetição;
- abrir/fechar;
- mostrar/dar/escrever;
- `Can you...?`;
- mini diálogos de sobrevivência em aula/situação prática.

## Arquivo criado

- `fluency-clean/src/content/curriculum/levels/A1/deepPracticalSituationsHelp.js`

## Arquivo alterado

- `fluency-clean/src/content/curriculum/staticLessonContent.js`

## Aulas criadas

### Grammar

- `A1-GRAMMAR-023` — `Object pronouns`

Foco:

- me;
- you;
- him;
- her;
- it;
- us;
- them;
- `Help me.`;
- `Call him.`;
- `Ask her.`;
- `Give it to me.`

### Vocabulary

- `A1-VOCABULARY-019` — `Common verbs`

Foco:

- open;
- close;
- help;
- call;
- give;
- show;
- ask;
- take;
- bring;
- repeat;
- write;
- read;
- listen;
- look;
- wait;
- come;
- go;
- stop.

### Reading

- `A1-READING-015` — `Reading for routine actions`

Foco:

- ler instruções simples;
- identificar verbos de ação;
- reconhecer object pronouns;
- responder com evidência textual.

### Listening

- `A1-LISTENING-013-HELP` — `Asking for help`

Foco:

- ouvir pedido de ajuda;
- identificar `Can you help me?`;
- reconhecer `repeat it`, `show me`, `write it`;
- shadowing e dictation.

### Speaking

- `A1-SPEAKING-009-HELP` — `Ask simple questions — help and repetition`

Foco:

- `I don’t understand.`;
- `Can you help me, please?`;
- `Can you repeat it?`;
- `Can you write it?`;
- mini diálogo de ajuda.

### Writing

- `A1-WRITING-012-HELP` — `Write questions and answers — help requests`

Foco:

- perguntas com `Can you...?`;
- respostas curtas;
- `me/it/her/them`;
- pontuação em perguntas e respostas.

## Conexão no currículo

`staticLessonContent.js` agora importa:

```js
A1_DEEP_PRACTICAL_SITUATIONS_HELP
A1_DEEP_PRACTICAL_SITUATIONS_HELP_BY_PILLAR
```

E inclui esse pacote em:

- `STATIC_READY_LESSONS`
- `STATIC_READY_LESSONS_BY_LEVEL_AND_PILLAR`

## Observações de ID

Foram usados alguns IDs com sufixo para evitar conflito com aulas anteriores enquanto o conteúdo é consolidado:

- `A1-LISTENING-013-HELP`
- `A1-SPEAKING-009-HELP`
- `A1-WRITING-012-HELP`

## Resultado esperado

A1.4 agora possui blocos profundos para:

1. food and ordering;
2. places and directions;
3. house and furniture;
4. clothes, weather and feelings;
5. help, common verbs and object pronouns.

## Commits

- `769e7bebbdd2d98e43389810bf99c1d700664956` — cria A1.4 Practical Situations parte 5.
- `e7de1fb9e4bd3268fa737ce567c1f080435ec05b` — conecta A1.4 Practical Situations parte 5.

## Próximo bloco correto

`BLOCO 12F — Fechamento/Auditoria leve do A1.4`

Objetivo recomendado:

- validar se todos os pacotes A1.4 estão conectados;
- não fazer auditoria pesada;
- checar se não há erro óbvio de import;
- preparar transição para `A1.5 Reviews and checkpoints`.
