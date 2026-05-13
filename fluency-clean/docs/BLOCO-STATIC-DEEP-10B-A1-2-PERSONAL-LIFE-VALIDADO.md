# BLOCO-STATIC-DEEP-10B — Validação A1.2 Personal life

Branch: `rewrite-fluency-clean-lab`

## Status

Concluído como validação inicial da unidade temática `A1.2 Personal life`.

## Escopo validado

Arquivo principal:

`fluency-clean/src/content/curriculum/levels/A1/deepPersonalLife.js`

Aulas validadas:

1. `A1-PERSONAL-GRAMMAR-001` — My, your, his, her + simple be statements
2. `A1-PERSONAL-VOCABULARY-001` — Personal life words
3. `A1-PERSONAL-READING-001` — A personal life profile
4. `A1-PERSONAL-LISTENING-001` — Personal information exchange
5. `A1-PERSONAL-SPEAKING-001` — Talk about yourself and someone else
6. `A1-PERSONAL-WRITING-001` — Write a short personal life paragraph

Arquivo de integração:

`fluency-clean/src/content/curriculum/staticLessonContent.js`

## Critérios do BLOCO 10B

Validar:

- estrutura dos 6 pilares;
- ausência de conteúdo genérico;
- Reading com evidência textual;
- Listening sem virar Reading disfarçado;
- Speaking sem fala livre sem preparação;
- Writing com modelo, rascunho, checklist e versão final;
- conexão no currículo;
- compatibilidade com flashcards da aula.

## Resultado por pilar

### 1. Grammar

Status: aprovado como pacote inicial.

A aula `A1-PERSONAL-GRAMMAR-001` trabalha:

- `my`
- `your`
- `his`
- `her`
- simple be statements

Contém:

- explicação contextual;
- contraste com português;
- mental model;
- formation guide;
- when to use;
- grammar table;
- teacher examples;
- common Brazilian mistakes;
- controlled practice;
- guided practice;
- production tasks;
- checklist final.

Critério validado: Grammar não ficou tabela solta; está ligada a vida pessoal e frases reais.

### 2. Vocabulary

Status: aprovado como pacote inicial.

A aula `A1-PERSONAL-VOCABULARY-001` trabalha vocabulário de vida pessoal:

- `age`
- `address`
- `email address`
- `phone number`
- `job`
- `class`
- `free time`
- `favorite`
- `hobby`
- `profile`

Contém:

- essential words;
- chunks;
- dangerous confusions;
- collocations;
- mini dialogue;
- recognition practice;
- usage practice;
- production tasks.

Critério validado: Vocabulary não é lista solta; os itens aparecem em chunks reutilizáveis.

### 3. Reading

Status: aprovado como pacote inicial.

A aula `A1-PERSONAL-READING-001` contém:

- reading purpose;
- pre-reading vocabulary;
- reading strategy;
- main text;
- first read task;
- second read tasks;
- evidence questions;
- context vocabulary tasks;
- guided summary;
- connected production.

Evidências textuais verificadas:

- `I am 20 years old.`
- `I live in Santa Maria.`
- `My English class is online.`
- `My phone number is 550329.`
- `My favorite hobby is photo editing.`

Critério validado: Reading continua exigindo evidência textual e não vira pergunta solta.

### 4. Listening

Status: aprovado como pacote inicial.

A aula `A1-PERSONAL-LISTENING-001` contém:

- listening preparation;
- keywords to hear;
- audio script;
- first listen tasks sem transcript;
- second listen tasks;
- transcript posterior;
- vocabulary;
- shadowing;
- dictation;
- pronunciation chunks;
- listening comprehension;
- oral production.

Critério validado: Listening não virou Reading disfarçado; há fluxo explícito de escuta antes do transcript.

### 5. Speaking

Status: aprovado como pacote inicial.

A aula `A1-PERSONAL-SPEAKING-001` contém:

- speaking situation;
- model phrases;
- pronunciation chunks;
- repeat after me;
- substitution drills;
- question-answer drills;
- build your answer;
- recording tasks;
- speaking checklist;
- free speaking curta.

Critério validado: Speaking não pede fala livre antes de preparar modelo, repetição, drills e checklist.

### 6. Writing

Status: aprovado como pacote inicial.

A aula `A1-PERSONAL-WRITING-001` contém:

- model text;
- model text breakdown;
- writing blocks;
- grammar for writing;
- useful sentences;
- guided substitution;
- common writing mistakes;
- checklist;
- revision checklist;
- draft task;
- revision task;
- final version task;
- feedback preparation.

Critério validado: Writing mantém processo completo — modelo antes do rascunho, checklist antes da versão final.

## Conteúdo genérico

Status: aprovado na busca textual inicial.

Busca realizada por frases suspeitas:

- `Modelo A1 para comparar`
- `Variação simples`
- `Exemplo A1`
- `Escolha a alternativa correta`
- `A1-PERSONAL`

Resultado: nenhum resultado encontrado para frases genéricas suspeitas.

## Integração com currículo

Status: aprovado conceitualmente.

`staticLessonContent.js` foi atualizado para importar:

- `A1_DEEP_PERSONAL_LIFE`
- `A1_DEEP_PERSONAL_LIFE_BY_PILLAR`

E conectar a unidade:

- em `STATIC_READY_LESSONS`;
- em `STATIC_READY_LESSONS_BY_LEVEL_AND_PILLAR`;
- dentro dos pilares grammar, vocabulary, reading, listening, speaking e writing.

As aulas usam `order: 21`, ficando depois das Foundations no mapa dos pilares.

## Flashcards

Status: aprovado conceitualmente.

A unidade possui campos compatíveis com o extrator corrigido de flashcards:

- `essentialWords`
- `chunks`
- `preReadingVocabulary`
- `keyWordsToHear`
- `modelPhrases`
- `usefulSentences`
- `miniDialogues`
- `grammarTable`
- `teacherExamples`
- `commonBrazilianMistakes`

O fallback ruim por título da aula já foi removido no BLOCO 9A, reduzindo risco de cards genéricos.

## Pontos que ainda dependem de teste visual no iPhone

- conferir se a ordem das aulas A1.2 aparece corretamente no mapa;
- abrir cada pilar e verificar renderização mobile;
- confirmar que a barra inferior não cobre checklist, transcript, produção ou versão final;
- testar flashcards reais da unidade;
- confirmar progresso após abrir e concluir aula.

## Estado final do BLOCO 10B

A unidade `A1.2 Personal life` está validada como pacote inicial profundo e conectada.

Ela está liberada para ser seguida pelo próximo tema A1, desde que o usuário faça teste visual no preview para verificar UX mobile.

## Próximo bloco recomendado

## BLOCO 11A — A1.3 Daily routine profundo

Tema sugerido:

`A1.3 Daily routine`

Pilares sugeridos:

- Grammar: simple present with I/you/we/they basic affirmative
- Vocabulary: daily actions and time markers
- Reading: simple daily routine profile
- Listening: short routine dialogue
- Speaking: talk about your day
- Writing: write a short daily routine paragraph

## Prompt de continuidade

```txt
Continue na branch rewrite-fluency-clean-lab.
Leia REWRITE_HANDOFF.md, fluency-clean/docs/ROADMAP-STATIC-DEEP-LESSONS-FOCO.md, fluency-clean/docs/BLOCO-STATIC-DEEP-10A-A1-2-PERSONAL-LIFE-CONCLUIDO.md e fluency-clean/docs/BLOCO-STATIC-DEEP-10B-A1-2-PERSONAL-LIFE-VALIDADO.md.
A unidade A1.2 Personal life foi criada, conectada e validada como pacote inicial profundo. Próximo bloco recomendado: BLOCO 11A — A1.3 Daily routine profundo.
Não mexa em main, rewrite-fluency-clean, bundle.js, backend Azure privado, Firebase/Azure produção, speakingFlow.js, SpeakingStepper.jsx ou SpeakingScreen.jsx.
Não use DOM injection nem bundle patch.
Manter todos os pilares e o padrão premium. Não avançar rápido demais sem validar o próximo bloco depois.
```
