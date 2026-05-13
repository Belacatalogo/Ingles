# BLOCO — Level Mastery CEFR Gates

Branch: `rewrite-fluency-clean-lab`

## Status

Concluído como regra oficial de progressão do curso.

## Decisão pedagógica

O aluno **não avança de nível apenas por assistir aulas**.

Para avançar:

- A1 → A2
- A2 → B1
- B1 → B2
- B2 → C1
- C1 → C2

é obrigatório concluir:

1. 100% das aulas do nível;
2. checkpoints intermediários;
3. prova final prática do nível;
4. revisão de Speaking;
5. revisão de Writing;
6. nota mínima por pilar;
7. nota final ponderada mínima.

## Arquivo criado

`fluency-clean/src/content/curriculum/levelMasteryFramework.js`

## Regras globais

```js
lessonCompletionPercent: 100
checkpointAveragePercent: 80
finalExamOverallPercent: 80
minimumPillarPercent: 75
minimumSpeakingPercent: 75
minimumWritingPercent: 75
requiresHumanOrAiReviewForProductiveSkills: true
canAdvanceByLessonsOnly: false
```

## Pesos por pilar

```js
grammar: 15
vocabulary: 15
reading: 15
listening: 20
speaking: 20
writing: 15
```

Listening e Speaking recebem peso maior porque indicam comunicação real e não apenas reconhecimento passivo.

## Funções criadas

### `getLevelMasteryFramework(level)`

Retorna critérios do nível.

### `getNextLevel(level)`

Retorna o próximo nível liberável.

### `calculateWeightedLevelScore(pillarScores)`

Calcula nota ponderada da prova final.

### `evaluateLevelAdvancement(payload)`

Retorna:

- `canAdvance`
- `overall`
- `issues`
- `nextAction`

## Critérios por nível

### A1

O aluno só pode ir para A2 se conseguir:

- apresentar-se;
- falar família, rotina e preferências simples;
- entender textos curtos A1 com evidência;
- entender áudios curtos sem transcript na primeira escuta;
- escrever apresentações e parágrafos curtos;
- passar no A1 Final Exam.

### A2

O aluno só pode ir para B1 se conseguir:

- interagir em situações cotidianas;
- falar de rotina, compras, localização, tempo e planos simples;
- entender mensagens/instruções curtas;
- escrever mensagens e parágrafos funcionais;
- passar no A2 Final Exam.

### B1

O aluno só pode ir para B2 se conseguir:

- narrar experiências;
- explicar opiniões simples;
- entender textos claros sobre temas familiares;
- manter conversas com justificativas;
- escrever textos organizados;
- passar no B1 Final Exam.

### B2

O aluno só pode ir para C1 se conseguir:

- discutir temas concretos e abstratos;
- defender opiniões;
- entender conteúdo autêntico moderadamente complexo;
- escrever textos argumentativos/profissionais;
- passar no B2 Final Exam.

### C1

O aluno só pode ir para C2 se conseguir:

- compreender linguagem implícita e textos longos;
- compreender fala natural extensa;
- expressar ideias complexas com fluência;
- escrever textos formais bem estruturados;
- sintetizar informações;
- passar no C1 Final Exam.

### C2

O nível C2 é final. O aluno precisa demonstrar:

- precisão alta;
- naturalidade;
- nuance;
- controle de registro;
- síntese de múltiplas fontes;
- produção sofisticada;
- C2 Final Exam.

## Regra para próximos blocos

Todos os próximos blocos de curso devem respeitar esta lógica:

- criar aulas por pilar;
- criar checkpoints por unidade/bloco;
- criar revisão acumulativa;
- criar final exam por nível;
- só liberar próximo nível quando `evaluateLevelAdvancement(...).canAdvance === true`.

## Próximo bloco recomendado

## BLOCO — A1 Checkpoints e Final Exam Framework

Objetivo:

Criar a estrutura específica de checkpoints e prova final do A1, conectada ao `levelMasteryFramework.js`.

Isso deve vir antes ou em paralelo à continuação das unidades A1.3+.

## Prompt de continuidade

```txt
Continue na branch rewrite-fluency-clean-lab.
Leia REWRITE_HANDOFF.md, fluency-clean/docs/BLOCO-LEVEL-MASTERY-CEFR-GATES-CONCLUIDO.md e os últimos handoffs do curso.
Foi criada a regra oficial: nenhum aluno avança de nível apenas por assistir aulas. Próximo bloco recomendado: criar A1 Checkpoints e Final Exam Framework conectado ao levelMasteryFramework.js.
Não mexa em main, rewrite-fluency-clean, bundle.js, backend Azure privado, Firebase/Azure produção, speakingFlow.js, SpeakingStepper.jsx ou SpeakingScreen.jsx.
Não use DOM injection nem bundle patch.
```
