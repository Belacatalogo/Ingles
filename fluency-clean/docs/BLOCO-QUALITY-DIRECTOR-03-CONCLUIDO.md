# BLOCO-QUALITY-DIRECTOR-03 — Auditor profundo anti-genérico de exercícios

Data: 2026-05-18  
Branch: `main`

## Objetivo

Adicionar ao Fluency Quality Director uma auditoria mais forte dos exercícios do curso fixo, para impedir que o aluno encontre alternativas absurdas, duplicadas, genéricas, ambíguas, sem resposta correta ou com feedback inútil.

Este bloco foca na qualidade pedagógica dos exercícios antes da experiência do aluno real.

## Arquivos criados

- `fluency-clean/e2e/quality-director/helpers/exerciseQualityRules.js`
- `fluency-clean/e2e/quality-director/exercise-quality.audit.spec.js`
- `fluency-clean/docs/BLOCO-QUALITY-DIRECTOR-03-CONCLUIDO.md`

## O que o auditor detecta

### P0

- Resposta correta não aparece nas alternativas.
- Nenhuma aula `ready` encontrada para auditoria de exercícios.

### P1

- Alternativas duplicadas.
- Alternativas genéricas ou placeholders: `Option A`, `Correct answer`, `Wrong answer`, etc.
- Distratores absurdos ou fáceis demais: `banana`, `car`, `blue`, `pizza`, etc.
- Mais de uma alternativa parece correta.
- Exercício com alternativas mas sem resposta esperada clara.
- Pergunta que parece entregar a resposta.
- Aula ready sem exercício detectável.

### P2

- Pergunta curta demais.
- Feedback genérico demais.
- Tamanho de alternativas muito desigual.
- Pergunta com baixa conexão lexical com o conteúdo da aula.

## Como funciona

A suíte `exercise-quality.audit.spec.js` importa o currículo fixo:

```js
getStaticLessons(level)
```

Percorre todos os níveis:

```txt
A1, A2, B1, B2, C1, C2
```

Filtra aulas `status === 'ready'` e aplica `auditLessonExercisesDeep(lesson)`.

O helper `exerciseQualityRules.js` coleta objetos com cara de exercício dentro da aula usando campos como:

```txt
question, prompt, instruction, title
answer, expected, expectedAnswer, correct, answerKey, correctOption, modelAnswer
options, choices, alternatives, answers
explanation, feedback, hint, tip, why, rationale
```

Depois avalia cada exercício.

## Métricas registradas no relatório

Para cada aula, o auditor registra:

- total de exercícios detectados;
- exercícios de múltipla escolha;
- exercícios abertos com resposta esperada;
- problemas encontrados por severidade.

Também adiciona um resumo global do currículo.

## Importante

Este bloco **não altera aulas**. Ele apenas detecta problemas.

Correções pedagógicas devem vir em blocos separados após leitura do relatório, para evitar alteração grande e descontrolada do conteúdo.

## Limitações atuais

A análise é heurística. Ela ainda não entende semântica profunda como um professor humano em todos os casos. Porém já captura muitos sinais fortes de exercício amador:

- opção absurda;
- opção duplicada;
- resposta ausente;
- placeholder;
- gabarito vazando;
- feedback genérico;
- pergunta fora do tema.

Blocos futuros podem melhorar com regras por pilar e CEFR.

## Confirmações

```txt
Branch: main.
Sem branch nova.
Sem PR.
Sem merge.
Sem rebase.
Sem force push.
Sem bundle patch.
Sem DOM injection.
Sem ativar Firebase/Azure/Gemini/Cloudinary real.
Sem alterar conteúdo pedagógico das aulas.
Sem mexer no backend privado.
```

## Próximo bloco recomendado

```txt
BLOCO-QUALITY-DIRECTOR-04 — Auditor por pilar pedagógico
```

Objetivo: criar regras específicas para Grammar, Vocabulary, Reading, Listening, Speaking, Writing e Checkpoint/Review.
