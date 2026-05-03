# BLOCO-READING-4 — Geração da aula Reading por habilidade

Data: 2026-05-03
Branch: `rewrite-fluency-clean-lab`

## Status

Implementado na branch LAB.

## Objetivo

Conectar o contrato próprio de Reading ao fluxo de geração por IA, para que novas aulas Reading sejam solicitadas por habilidade e com evidência textual.

Importante: este bloco não adiciona cards técnicos na aula. A mudança é interna no motor de geração/normalização.

## Arquivos alterados

- `fluency-clean/src/services/lessonJsonContract.js`
- `fluency-clean/src/services/lessonTypes.js`
- `fluency-clean/docs/BLOCO-READING-4-GERACAO-POR-HABILIDADE-LAB.md`

## O que foi feito

### 1. Conexão do contrato Reading ao prompt geral

Em `lessonJsonContract.js`:

- Importado `buildReadingJsonContractInstruction` de `../reading/readingJsonContract.js`.
- Quando `lessonType === 'reading'`, `buildJsonContractInstruction` passa a usar o contrato próprio de Reading.
- O prompt de Reading agora pede explicitamente:
  - `readingText`;
  - `textGenre`;
  - `readingPurpose`;
  - `preReading`;
  - `readingQuestions`;
  - `evidenceTasks`;
  - `postReadingPrompts`.

### 2. Compatibilidade com o motor atual

O motor atual ainda trabalha por blocos antigos:
- `mainContent` espera `listeningText`;
- `exercises` espera `exercises`;
- `production` espera `prompts`.

Para não quebrar nada:
- o bloco `mainContent` agora aceita `readingText` e preenche `listeningText` com o mesmo texto quando necessário;
- o bloco `exercises` aceita `readingQuestions` e converte para `exercises` compatível;
- o bloco `production` aceita `postReadingPrompts` e converte para `prompts` compatível.

### 3. Preferência por perguntas de Reading com habilidade/evidência

Se a IA gerar `readingQuestions`, elas passam a ser a fonte principal para os exercícios internos da aba Reading.

Cada item preserva:
- `skill`;
- `questionLanguage`;
- `question`;
- `options`;
- `answer`;
- `evidence`;
- `explanation`;
- `difficulty`.

Isso evita que perguntas melhores por habilidade sejam substituídas por exercícios genéricos.

### 4. Normalizador preserva campos novos

Em `lessonTypes.js`:

- `normalizeLesson` agora preserva:
  - `readingText`;
  - `textGenre`;
  - `readingPurpose`;
  - `preReading`;
  - `readingQuestions`;
  - `evidenceTasks`;
  - `postReadingPrompts`.
- `listeningText` continua existindo como fallback para compatibilidade.
- `readingText` também usa fallback de `listeningText` quando a aula é antiga.
- `normalizeExercises` agora preserva:
  - `skill`;
  - `evidence`;
  - `questionLanguage`;
  - `difficulty`.

## Resultado esperado

A próxima aula Reading gerada por IA deve vir mais próxima deste formato:

```json
{
  "type": "reading",
  "readingText": "...",
  "preReading": [
    { "type": "strategy", "text": "..." }
  ],
  "readingQuestions": [
    {
      "skill": "main_idea",
      "questionLanguage": "pt-BR",
      "question": "...",
      "options": ["...", "...", "..."],
      "answer": "...",
      "evidence": "trecho exato do texto",
      "explanation": "..."
    }
  ],
  "postReadingPrompts": [
    { "instruction": "..." }
  ]
}
```

## O que não foi feito neste bloco

- Não foi feita a reconstrução visual por etapas ainda.
- Não foi criado o quality gate específico de Reading ainda.
- Não foi removida a compatibilidade com `listeningText`.
- Não foi mexido em `bundle.js`.
- Não foi mexido em `main`.
- Não foi mexido em `rewrite-fluency-clean`.
- Não foi mexido no backend Azure privado.

## Observação técnica

Por segurança, o motor ainda mantém campos compatíveis com o fluxo antigo. A migração completa para somente `readingText`, sem `listeningText`, deve acontecer depois que o quality gate e os testes de geração estiverem aprovados.

## Próximo bloco recomendado

`BLOCO-READING-5 — Render por etapas`

Objetivo:
- Transformar a aba Reading em uma experiência guiada por etapas reais:
  1. Começar leitura;
  2. Pré-leitura;
  3. Ler texto;
  4. Ideia geral;
  5. Vocabulário;
  6. Compreensão;
  7. Produção curta;
  8. Concluir.

## Checklist para teste no iPhone

Teste principal deste bloco:
- gerar uma nova aula Reading real com IA;
- abrir a aula gerada;
- confirmar que a aula não quebrou;
- confirmar que o texto principal aparece;
- confirmar que perguntas continuam aparecendo;
- confirmar que algumas perguntas mostram rótulos como `Ideia geral`, `Detalhe`, `Vocabulário`, `Inferência` ou similares;
- confirmar que, ao responder, aparece evidência textual quando disponível;
- confirmar que não apareceu nenhum card técnico de contrato/política;
- confirmar que a Prática Profunda continua abaixo como complemento.
