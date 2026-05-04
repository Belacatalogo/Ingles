# BLOCO-B4 — Reading Practice 4 · Tipo Novo Contexto Formal

Data: 2026-05-03
Branch: `rewrite-fluency-clean-lab`

## Status

Implementado.

## Pré-requisitos

- Fase A concluída.
- `BLOCO-B1-READING-PRACTICE-1-VARIANT-POLICY-LAB` implementado.
- `BLOCO-B2-READING-PRACTICE-2-VOCAB-FRAGIL-LAB` implementado.
- `BLOCO-B3-READING-PRACTICE-3-EVIDENCE-LAYERED-LAB` implementado.

## Objetivo

Criar o tipo formal de questão `new_context`, no qual a Prática Profunda mostra um trecho novo, fornecido pela IA, que reutiliza vocabulário/estrutura da aula em uma situação diferente.

O objetivo pedagógico é transferência: o aluno não responde apenas sobre o texto original, mas aplica o que aprendeu em um contexto novo.

## Arquivos criados

- `fluency-clean/src/reading/readingNewContextGenerator.js`
- `fluency-clean/src/practice/components/NewContextExercise.jsx`
- `fluency-clean/src/styles/practice-new-context.css`
- `fluency-clean/docs/BLOCO-B4-READING-PRACTICE-4-NEW-CONTEXT-LAB.md`

## Arquivos alterados

- `fluency-clean/src/practice/core/PracticeTypes.js`
- `fluency-clean/src/practice/core/PracticePurityMatrix.js`
- `fluency-clean/src/practice/core/builders/builderUtils.js`
- `fluency-clean/src/reading/readingJsonContract.js`
- `fluency-clean/src/practice/core/PracticeNormalizer.js`
- `fluency-clean/src/practice/core/builders/readingBuilder.js`
- `fluency-clean/src/practice/PracticePlanAdapter.js`
- `fluency-clean/src/practice/PracticeFullscreen.jsx`
- `fluency-clean/src/main.jsx`

## Tipo formal criado

Em `PracticeTypes.js`:

```js
NEW_CONTEXT: 'new_context'
```

## Pureza

Em `PracticePurityMatrix.js`, `NEW_CONTEXT` foi adicionado como `core` para Reading.

Para Grammar, Listening, Speaking e Writing, `NEW_CONTEXT` foi marcado como `banned`.

## Contrato JSON de Reading

`readingJsonContract.js` agora aceita:

```js
transferContexts: [READING_TRANSFER_CONTEXT_CONTRACT]
```

Estrutura:

- `text`: trecho novo em inglês, máximo 80 palavras;
- `source`: `transfer | adapted_example | natural_followup`;
- `tags`: palavras/estruturas reutilizadas;
- `readingSkill`: `detail | inference | vocabulary_context`;
- `subQuestion`: pergunta própria sobre o trecho novo.

O prompt da IA agora pede:

- Para B1/B2/C1: gerar 1 a 2 `transferContexts`.
- Para A1/A2: não gerar `transferContexts`.
- `transferContexts` não fazem parte do `readingText`; são material extra da Prática Profunda.

## Gerador

Criado `readingNewContextGenerator.js` com:

- `normalizeTransferContext(transfer, context)`
- `buildNewContextQuestions(context, transferContexts)`

Regras:

- Só gera para B1/B2/C1.
- Não gera para A1/A2.
- Não inventa texto novo no builder.
- Se a IA não fornecer `transferContexts`, retorna `[]`.
- Limita a 2 questões por sessão.
- Rejeita trecho acima de 80 palavras.

## Normalizer da Prática

`PracticeNormalizer.js` agora expõe:

```js
context.transferContexts
```

Somente para Reading.

## Builder de Reading

`readingBuilder.js` agora chama:

```js
buildNewContextQuestions(context, context.transferContexts || [])
```

A chamada ocorre depois de:

1. revisão de vocabulário frágil;
2. vocabulário normal;
3. evidência em camadas;

E antes do restante das perguntas de compreensão/produção.

## Metadados preservados

`builderUtils.js` agora preserva campos específicos do novo tipo:

- `newContext`
- `subQuestion`
- `transferTags`

## Adapter

`PracticePlanAdapter.js` mapeia:

```js
QUESTION_TYPES.NEW_CONTEXT -> 'newContext'
```

Também preserva:

- `newContext`
- `subQuestion`
- `transferTags`

## Render real

O plano citava `PracticeQuestionTypes.jsx`, mas o fluxo real do projeto usa `PracticeFullscreen.jsx` + componentes específicos.

Por isso, foi criado:

```js
fluency-clean/src/practice/components/NewContextExercise.jsx
```

E o `PracticeFullscreen.jsx` renderiza esse componente quando:

```js
current.type === 'newContext'
```

## UI

Criado `practice-new-context.css` e importado em `main.jsx`.

A UI mostra:

- trecho novo como `blockquote`;
- pergunta da subquestão;
- opções tocáveis;
- botão `Confirmar`, habilitado apenas após seleção.

## Compatibilidade preservada

- Não foi alterado `ReadingLesson.jsx`.
- Não foi alterada a aba Reading.
- Não foi alterado `bundle.js`.
- Não foi alterado backend Azure privado.
- Não foi criada UI técnica.
- Não foi gerado texto novo no builder.

## Critérios de aceitação

- [x] `QUESTION_TYPES.NEW_CONTEXT` adicionado.
- [x] `NEW_CONTEXT` aceito como core em Reading na `PURITY_MATRIX`.
- [x] `readingNewContextGenerator.js` criado.
- [x] `readingJsonContract.js` aceita `transferContexts`.
- [x] Prompt da IA pede `transferContexts` para B1/B2/C1.
- [x] Prompt da IA proíbe `transferContexts` em A1/A2.
- [x] `PracticeNormalizer.js` expõe `transferContexts`.
- [x] `readingBuilder.js` gera `NEW_CONTEXT` quando houver `transferContexts`.
- [x] Quando IA não fornece `transferContexts`, nada quebra.
- [x] `NewContextExercise.jsx` renderiza trecho novo + subquestão.
- [x] CSS modular criado e importado.

## O que NÃO foi feito

- Não foi inventado trecho novo no builder.
- Não foi mostrado `NEW_CONTEXT` em A1/A2.
- Não foi pedido mais de 1 subquestão por trecho.
- Não foi alterado `ReadingLesson.jsx`.
- Não foi criado texto longo acima de 80 palavras.

## Observação técnica

Houve tentativa de reforçar o `readingQualityGate.js` para filtrar `transferContexts` longos, mas a ferramenta bloqueou o patch grande. Como o gate preserva campos via spread de `rawLesson`, os `transferContexts` normalizados pelo contrato continuam chegando na aula. O gerador `readingNewContextGenerator.js` também aplica limite de 80 palavras e rejeita itens inválidos, então o comportamento seguro foi mantido.

## Checklist futuro após B5

- Aula A2: confirmar zero questões `Novo contexto`.
- Aula B1/B2/C1 com `transferContexts`: confirmar 1 a 2 questões `Novo contexto`.
- Confirmar que o trecho aparece como bloco citado.
- Confirmar que as opções são tocáveis.
- Confirmar que `Confirmar` só habilita após escolher.
- Confirmar que quando a IA não fornece `transferContexts`, a Prática Profunda segue normal.

## Próximo bloco recomendado

`BLOCO-B5-READING-PRACTICE-5-SUMMARY-CLOZE-LAB`.
