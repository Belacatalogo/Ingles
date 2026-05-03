# BLOCO-READING-2 — Política por nível A1→C1

Data: 2026-05-03
Branch: `rewrite-fluency-clean-lab`

## Status

Implementado na branch LAB.

## Objetivo

Criar uma política formal para que a aba Reading saiba como deve se comportar conforme o nível do aluno sobe de A1 até C1.

Este bloco prepara a base para os próximos blocos de contrato JSON e geração IA. Ele ainda não altera profundamente o blueprint do Gemini.

## Arquivos alterados

- `fluency-clean/src/reading/readingLevelPolicy.js`
- `fluency-clean/src/lessons/ReadingLesson.jsx`
- `fluency-clean/src/styles/reading-complete-render-review.css`
- `fluency-clean/docs/BLOCO-READING-2-POLITICA-POR-NIVEL-A1-C1-LAB.md`

## Novo módulo criado

### `fluency-clean/src/reading/readingLevelPolicy.js`

Criado com:
- `READING_LEVEL_POLICIES`
- `READING_SKILLS`
- `READING_LEVEL_POLICY_VERSION`
- `normalizeReadingLevel(level)`
- `getReadingLevelPolicy(level)`
- `getReadingPolicySummary(level)`
- `buildReadingPolicyPrompt(level)`

## Níveis definidos

### A1
- Leitura guiada inicial.
- Texto ideal: 60 a 150 palavras.
- Perguntas majoritariamente em português.
- Inglês em texto, opções curtas e frases-alvo.
- Habilidades: ideia geral, detalhe, vocabulário em contexto e evidência.
- Produção: 1 a 3 frases simples.

### A2
- Leitura funcional básica.
- Texto ideal: 120 a 260 palavras.
- Perguntas misturadas em português e inglês simples.
- Habilidades: ideia geral, detalhe, vocabulário, sequência, evidência e inferência simples.
- Produção: 3 a 5 frases simples.

### B1
- Leitura independente inicial.
- Texto ideal: 250 a 450 palavras.
- Perguntas principalmente em inglês simples.
- Habilidades: ideia geral, detalhes, vocabulário, sequência, evidência, inferência e intenção do autor.
- Produção: resumo curto em 3 a 5 frases.

### B2
- Leitura analítica.
- Texto ideal: 450 a 750 palavras.
- Perguntas em inglês.
- Habilidades: inferência, argumento, fato/opinião, tom e intenção do autor.
- Produção: resposta crítica curta.

### C1
- Leitura avançada e nuance.
- Texto ideal: 700 a 1100 palavras.
- Perguntas em inglês avançado.
- Habilidades: nuance, tom, implicação, viés, crítica e análise do autor.
- Produção: análise crítica.

## Integração feita no render

Em `ReadingLesson.jsx`:
- A aula agora obtém `levelPolicy` com `getReadingLevelPolicy(lesson.level)`.
- O eyebrow usa o nível normalizado da política.
- Foi adicionado card visual `Plano do nível`.
- O card mostra:
  - nível pedagógico;
  - objetivo do aluno;
  - tamanho ideal do texto;
  - idioma das perguntas;
  - produção esperada.
- A produção curta usa a instrução definida pela política do nível.
- O card `Render seguro` agora mostra o nível normalizado.
- A estratégia lateral usa o tom pedagógico definido pela política.

## Estilos adicionados

Em `reading-complete-render-review.css`:
- `.reading-level-policy-card`
- `.reading-policy-grid`
- estilos mobile-first para o card de política.

## O que não foi feito neste bloco

- Não foi alterado profundamente o blueprint do Gemini.
- Não foi criado contrato JSON próprio de Reading ainda.
- Não foi criado quality gate de Reading ainda.
- Não foi mexido em `bundle.js`.
- Não foi mexido em `main`.
- Não foi mexido em `rewrite-fluency-clean`.
- Não foi mexido no backend Azure privado.

## Próximo bloco recomendado

`BLOCO-READING-3 — Contrato JSON próprio de Reading`

Objetivo:
- Criar contrato próprio de Reading com `readingText`, `textGenre`, `preReading`, `readingQuestions`, `evidenceTasks` e `postReadingPrompts`.
- Manter compatibilidade com aulas antigas que usam `listeningText`.
- Preparar o gerador para parar de tratar Reading como Listening.

## Checklist para teste no iPhone

- Abrir `Testar Reading`.
- Confirmar que o card `Plano do nível` aparece.
- Confirmar que mostra `A1 · Leitura guiada inicial` na aula preview atual.
- Confirmar que o texto ideal aparece como 60–150 palavras para A1.
- Confirmar que as perguntas aparecem como majoritariamente português para A1.
- Confirmar que a produção curta usa a instrução do nível.
- Confirmar que nada quebrou no fluxo oficial da Reading.
