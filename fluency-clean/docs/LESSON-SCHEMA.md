# Lesson Schema — Static Curriculum

## Base obrigatória

Toda aula fixa deve ter:

```js
{
  id: 'A1-GRAMMAR-001',
  level: 'A1',
  pillar: 'grammar',
  title: 'Subject Pronouns',
  order: 1,
  estimatedMinutes: 35,
  prerequisites: [],
  objectives: [],
  masteryCriteria: {},
}
```

## Grammar

Campos específicos:

```js
{
  pillar: 'grammar',
  explanationSections: [],
  professorExamples: [],
  commonMistakes: [],
  guidedPractice: [],
  transformationPractice: [],
  productionTasks: [],
  finalChecklist: [],
}
```

Qualidade mínima:

- 6 a 8 seções em aula principal.
- Seções principais com explicação em português.
- Exemplos A1/A2/B1 conforme nível.
- Tradução natural quando ajudar.
- Erros comuns de brasileiros.
- Exercícios internos de reconhecimento, lacuna, correção, transformação e produção.

## Vocabulary

Campos específicos:

```js
{
  pillar: 'vocabulary',
  theme: '',
  lexicalSets: [],
  pronunciationNotes: [],
  examples: [],
  recognitionPractice: [],
  usagePractice: [],
  productionTasks: [],
}
```

Qualidade mínima:

- Vocabulário agrupado por tema.
- Exemplos curtos e naturais.
- Produção com frases próprias.
- Revisão conectada ao SRS.

## Reading

Campos específicos:

```js
{
  pillar: 'reading',
  preReading: [],
  mainText: '',
  vocabulary: [],
  comprehensionQuestions: [],
  evidenceTasks: [],
  shortResponse: [],
  productionTask: [],
}
```

Qualidade mínima A1:

- Texto principal entre 120 e 220 palavras.
- Perguntas em português.
- Cada questão importante deve ter evidência textual.
- Não perguntar nada que não esteja no texto.

## Listening

Campos específicos:

```js
{
  pillar: 'listening',
  audioScript: '',
  firstListenTasks: [],
  secondListenTasks: [],
  transcript: '',
  vocabulary: [],
  shadowing: [],
  comprehensionQuestions: [],
}
```

Qualidade mínima A1:

- Transcrição de 100 a 220 palavras.
- Primeira escuta sem texto.
- Segunda escuta com foco.
- Shadowing com frases curtas.
- Perguntas alinhadas ao transcript.

## Speaking

Campos específicos:

```js
{
  pillar: 'speaking',
  modelPhrases: [],
  substitutionDrills: [],
  pronunciationFocus: [],
  guidedSpeaking: [],
  recordingTasks: [],
  freeSpeaking: [],
}
```

Qualidade mínima:

- Modelo claro.
- Substituição guiada.
- Perguntas e respostas.
- Tarefa de gravação.
- Checklist simples.

## Writing

Campos específicos:

```js
{
  pillar: 'writing',
  modelText: '',
  writingBlocks: [],
  guidedSubstitution: [],
  grammarForWriting: [],
  checklist: [],
  draftTask: [],
  revisionTask: [],
}
```

Qualidade mínima:

- Modelo principal.
- Blocos úteis.
- Substituição guiada.
- Checklist.
- Rascunho, revisão e versão final.

## Checkpoint

Campos específicos:

```js
{
  pillar: 'checkpoint',
  checkpointType: 'level' | 'pillar',
  targetPillars: [],
  tasks: [],
  passingCriteria: {},
  remediation: [],
}
```

## Validação futura

O bloco `BLOCO-STATIC-14-STATIC-CURRICULUM-VALIDATOR` deve validar:

- IDs únicos.
- Ordem e pré-requisitos.
- Campos obrigatórios por pilar.
- Quantidades mínimas.
- Respostas e evidências.
- Checkpoints completos.