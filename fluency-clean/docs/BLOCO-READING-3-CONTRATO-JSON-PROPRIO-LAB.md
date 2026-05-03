# BLOCO-READING-3 — Contrato JSON próprio de Reading

Data: 2026-05-03
Branch: `rewrite-fluency-clean-lab`

## Status

Implementado na branch LAB.

## Objetivo

Criar um contrato interno próprio para Reading, separando Reading de Listening e preparando os próximos blocos de geração IA por habilidade.

Importante: o contrato é interno e não deve aparecer como card técnico na aula.

## Arquivos alterados

- `fluency-clean/src/reading/readingJsonContract.js`
- `fluency-clean/src/lessons/ReadingLesson.jsx`
- `fluency-clean/docs/BLOCO-READING-3-CONTRATO-JSON-PROPRIO-LAB.md`

## Novo módulo criado

### `fluency-clean/src/reading/readingJsonContract.js`

Criado com:
- `READING_JSON_CONTRACT_VERSION`
- `READING_TEXT_GENRES`
- `READING_JSON_CONTRACT`
- `normalizeReadingLessonContract(rawLesson)`
- `getReadingRequiredKeys()`
- `assertReadingContract(data)`
- `buildReadingJsonContractInstruction({ level })`

## Campos próprios definidos para Reading

- `readingText`
- `textGenre`
- `readingPurpose`
- `preReading`
- `vocabulary`
- `readingQuestions`
- `evidenceTasks`
- `postReadingPrompts`
- `tips`

## Compatibilidade com aulas antigas

O contrato normaliza aulas antigas usando fallback para:
- `reading_text`
- `mainText`
- `main_text`
- `text`
- `story`
- `article`
- `passage`
- `listeningText`
- `transcript`

Isso mantém aulas antigas funcionando enquanto a geração nova ainda não foi alterada.

## Integração feita no render

Em `ReadingLesson.jsx`:
- Importado `normalizeReadingLessonContract`.
- A aula agora cria `readingContract` com `useMemo`.
- `levelPolicy` passa a usar `readingContract.level`.
- Texto, pré-leitura, vocabulário, perguntas, introdução, objetivo e dicas passam a ser normalizados a partir de `readingContract`.
- O visual não recebeu card novo de contrato.
- O card discreto `Aula segura` permanece compacto.

## Regras novas para a próxima geração IA

O contrato instrui que:
- novas aulas Reading devem usar `readingText`, não `listeningText`;
- `readingText` deve ser texto de leitura, não transcrição de áudio;
- cada pergunta deve depender do texto;
- cada pergunta de compreensão deve ter evidência textual;
- a resposta não pode aparecer dentro da pergunta;
- as alternativas não podem ser duplicadas;
- perguntas genéricas devem ser evitadas;
- a Prática Profunda é complemento posterior, não substitui os exercícios da Reading.

## O que não foi feito neste bloco

- Não foi alterado profundamente o blueprint do Gemini ainda.
- Não foi alterado o contrato geral `lessonJsonContract.js` ainda.
- Não foi criado quality gate de Reading ainda.
- Não foi mexido em `bundle.js`.
- Não foi mexido em `main`.
- Não foi mexido em `rewrite-fluency-clean`.
- Não foi mexido no backend Azure privado.

## Próximo bloco recomendado

`BLOCO-READING-4 — Geração da aula Reading por habilidade`

Objetivo:
- Conectar `buildReadingJsonContractInstruction` ao fluxo de geração de Reading.
- Fazer a IA gerar `readingText`, `preReading`, `readingQuestions`, `evidenceTasks` e `postReadingPrompts`.
- Usar `readingLevelPolicy.js` para respeitar A1→C1.

## Checklist para teste no iPhone

- Abrir `Testar Reading`.
- Confirmar que a aula continua visualmente igual/limpa.
- Confirmar que não apareceu nenhum card de contrato JSON.
- Confirmar que o texto principal aparece.
- Confirmar que a pré-leitura aparece.
- Confirmar que as perguntas aparecem.
- Confirmar que a produção curta aparece.
- Confirmar que o card `Aula segura` continua discreto.
- Confirmar que a Prática Profunda continua abaixo como complemento.
