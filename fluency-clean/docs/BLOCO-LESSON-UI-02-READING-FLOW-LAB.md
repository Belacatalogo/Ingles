# BLOCO-LESSON-UI-02 — Reading Flow LAB

Data: 2026-05-14
Branch: `rewrite-fluency-clean-lab`

## Status

Implementado em primeira versão.

## Origem visual

Este bloco usa como referência o protótipo aprovado criado no Lovable e enviado em:

- `fluency-prototype.zip`

O protótipo do Lovable serviu como direção visual/UX, não como cópia literal de arquitetura.

## Decisão principal

A nova UI premium foi aplicada somente ao pilar `Reading` em aulas estáticas.

Os demais pilares continuam usando os renderers antigos até terem seus próprios protótipos aprovados no Lovable.

## Arquivos criados

- `fluency-clean/src/lessons/flow/reading/ReadingLessonFlow.jsx`
- `fluency-clean/src/lessons/flow/reading/reading-lesson-flow.css`

## Arquivo alterado

- `fluency-clean/src/screens/LessonScreen.jsx`

## Como foi conectado

Em `LessonScreen.jsx`, aulas estáticas de Reading agora usam:

```jsx
<ReadingLessonFlow lesson={lesson} />
```

A condição é limitada:

```js
isStaticLesson(lesson) && isReading
```

Listening, Speaking, Writing, Grammar e Vocabulary não foram alterados neste bloco.

## O que a nova UI entrega

A experiência Reading agora segue fluxo guiado, inspirado no protótipo Lovable:

1. Overview / missão da aula
2. Texto principal isolado
3. Primeira compreensão de memória
4. Evidência textual
5. Resumo e produção conectada
6. Mastery Gate

## Adaptação para aulas profundas

A UI não fica presa ao exemplo simples do Lovable.

Ela lê campos reais das aulas estáticas profundas:

- `title`
- `level`
- `estimatedMinutes`
- `teacherOpening`
- `intro`
- `readingPurpose`
- `objectives`
- `preReadingVocabulary`
- `vocabulary`
- `keyVocabulary`
- `contextVocabularyTasks`
- `mainText`
- `firstReadTask`
- `comprehensionQuestions`
- `evidenceQuestions`
- `secondReadTasks`
- `guidedSummary`
- `connectedProduction`
- `productionTask`
- `productionTasks`

## Regras pedagógicas preservadas

- O texto principal fica isolado.
- Perguntas não aparecem junto com o texto principal.
- A primeira compreensão exige tentativa antes de avançar.
- A evidência exige resposta + trecho do texto.
- Resumo e produção são obrigatórios antes do gate visual.
- Gabarito/modelo só aparece depois de tentativa quando disponível.
- A Prática Profunda permanece complementar, abaixo da aula principal.

## Regras técnicas preservadas

- Não mexeu em `main`.
- Não mexeu em `rewrite-fluency-clean`.
- Não mexeu em `bundle.js`.
- Não usou DOM injection.
- Não criou bundle patch.
- Não mexeu em Azure/Firebase/backend.
- Não mexeu em speakingFlow/SpeakingStepper/SpeakingScreen.
- Não copiou dependências do Lovable.
- Não importou Tailwind/shadcn do Lovable.
- Não colocou backend ou autenticação.

## Observação importante

O protótipo Lovable foi feito apenas para Reading de propósito. A partir desta decisão, cada novo pilar deverá ter seu próprio prompt/protótipo no Lovable antes de implementação:

1. Reading — implementado neste bloco.
2. Listening — próximo pilar recomendado.
3. Speaking.
4. Writing.
5. Grammar.
6. Vocabulary.

## Próximo bloco recomendado

`BLOCO-LESSON-UI-03-LISTENING-FLOW-LAB`

Antes de implementar, gerar um super prompt específico de Listening para o Lovable com:

- áudio primeiro;
- transcript bloqueado;
- primeira escuta sem texto;
- segunda escuta com foco;
- dictation;
- compreensão auditiva;
- shadowing;
- transcript liberado no momento certo;
- produção oral curta;
- gate de Listening.

## Pendência de validação

Build/check ainda precisa ser rodado em ambiente com o repositório instalado.

Com o conector GitHub, a implementação foi feita por arquivos e commits, mas sem execução local de `npm run build`.
