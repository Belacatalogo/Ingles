# BLOCO-STATIC-DEEP-01 — Schema pedagógico profundo

Branch: `rewrite-fluency-clean-lab`

## Status

Concluído tecnicamente.

## Objetivo

Criar a base estrutural para que as aulas fixas deixem de ser cards rasos e passem a suportar aulas completas, guiadas e pedagógicas por pilar.

Este bloco não reescreve ainda todas as aulas nem muda a UI final. Ele prepara o schema, factories e validação para os próximos blocos.

## Arquivos alterados

- `fluency-clean/src/content/schemas/lessonSchema.js`
- `fluency-clean/src/content/schemas/lessonFactories.js`
- `fluency-clean/src/content/schemas/lessonValidators.js`

## Mudanças principais

### 1. Schema v2 profundo

Criado o novo schema:

```js
static-lesson-schema-v2-deep
```

O schema antigo `static-lesson-schema-v1` continua compatível temporariamente.

### 2. Campos globais profundos

As aulas agora suportam campos pedagógicos globais:

- `teacherOpening`
- `whyItMatters`
- `realLifeUseCases`
- `conceptExplanation`
- `mentalModel`
- `stepByStep`
- `portugueseContrast`
- `guidedDiscovery`
- `guidedBeforeQuiz`
- `selfAssessment`
- `lessonRecap`
- `nextLessonBridge`

Esses campos serão usados para transformar a aula em sequência didática real.

### 3. Campos profundos por pilar

Foram adicionados campos específicos para:

- Grammar
- Vocabulary
- Reading
- Listening
- Speaking
- Writing
- Checkpoint

Exemplo Grammar:

- `grammarGoal`
- `formationGuide`
- `whenToUse`
- `whenNotToUse`
- `grammarTable`
- `teacherExamples`
- `commonBrazilianMistakes`
- `controlledPractice`
- `errorCorrectionPractice`
- `translationPractice`

Exemplo Reading:

- `readingPurpose`
- `preReadingVocabulary`
- `readingStrategy`
- `firstReadTask`
- `secondReadTasks`
- `evidenceQuestions`
- `contextVocabularyTasks`
- `guidedSummary`
- `connectedProduction`

### 4. Factories compatíveis

`lessonFactories.js` agora cria aulas com os campos v2, mas mantém compatibilidade com campos antigos.

Exemplos:

- `teacherExamples` também preenche/convive com `professorExamples`.
- `commonBrazilianMistakes` convive com `commonMistakes`.
- `evidenceQuestions` pode reaproveitar `comprehensionQuestions` quando necessário.
- `listeningComprehension` pode reaproveitar `comprehensionQuestions`.
- `revisionChecklist` pode reaproveitar `checklist`.

### 5. Validator profundo

`lessonValidators.js` agora tem:

```js
validateDeepStaticLesson(lesson)
```

E o relatório normal agora também retorna:

```js
deepApproved
```

Uma aula pode estar aprovada no legado, mas ainda não estar aprovada no padrão profundo.

## Critério novo

Aula `ready` no futuro não deve ser considerada boa só por passar no validator antigo.

O alvo agora é:

```js
deepApproved: true
```

## Importante

Este bloco não transforma ainda a experiência visual da aula.

O próximo bloco obrigatório é:

## BLOCO 2 — Refazer renderizadores para aula de verdade

Objetivo:

Alterar `StaticLessonRenderer.jsx` para usar os novos campos profundos e mostrar a aula como uma sequência:

1. Aprender
2. Entender
3. Ver exemplos comentados
4. Praticar junto
5. Tentar sozinho
6. Produzir
7. Revisar

## Próximo prompt recomendado

```txt
Continue na branch rewrite-fluency-clean-lab.
Leia REWRITE_HANDOFF.md, fluency-clean/docs/BLOCO-STATIC-DEEP-LESSON-QUALITY-REWRITE-LAB.md e fluency-clean/docs/BLOCO-STATIC-DEEP-01-SCHEMA-PEDAGOGICO-CONCLUIDO.md.
Execute o BLOCO 2: refazer os renderizadores para aula de verdade, usando o schema v2 profundo, sem quebrar compatibilidade com aulas antigas.
Não mexa em main, rewrite-fluency-clean, bundle.js, backend Azure privado, Firebase/Azure produção, speakingFlow.js, SpeakingStepper.jsx ou SpeakingScreen.jsx.
Não use DOM injection nem bundle patch.
```
