# BLOCO-READING-8 — Quality gate Reading

Data: 2026-05-03
Branch: `rewrite-fluency-clean-lab`

## Status

Implementado na branch LAB.

## Objetivo

Criar uma trava pedagógica interna para Reading, protegendo a aula antes do render/uso sem adicionar card técnico na tela.

## Arquivos alterados

- `fluency-clean/src/reading/readingQualityGate.js`
- `fluency-clean/src/reading/readingJsonContract.js`
- `fluency-clean/docs/BLOCO-READING-8-QUALITY-GATE-LAB.md`

## Novo módulo

Criado:

`fluency-clean/src/reading/readingQualityGate.js`

Exporta:

- `applyReadingQualityGate(rawLesson)`
- `assertReadingQualityGate(gatedLesson)`

## O que o quality gate verifica

### 1. Texto principal

- Normaliza `readingText`.
- Aceita fallback de `listeningText`/`transcript` apenas por compatibilidade.
- Marca aviso se o texto estiver vazio ou curto demais.

### 2. Perguntas

Cada pergunta passa por validação:

- enunciado obrigatório;
- resposta obrigatória;
- alternativas duplicadas removidas;
- alternativas insuficientes removem a questão;
- resposta vazada dentro da pergunta remove a questão;
- resposta correta é adicionada às opções se a IA esquecer;
- evidência é inferida do texto quando possível;
- evidência inconsistente é substituída por trecho encontrado, quando possível.

### 3. Evidência textual

- Confere se a evidência aparece no `readingText`.
- Tenta inferir evidência a partir da resposta e dos parágrafos.
- Cria `evidenceTasks` automaticamente quando a IA não fornecer.

### 4. Pré-leitura

- Normaliza `preReading`.
- Cria pré-leitura padrão se faltar.

### 5. Produção pós-leitura

- Normaliza `postReadingPrompts`.
- Cria produção curta padrão se faltar.

### 6. Vocabulário

- Normaliza `vocabulary`.
- Mantém vocabulário estruturado.
- Registra aviso quando palavra não aparece no texto.

## Integração feita

Em `readingJsonContract.js`:

- Importado `applyReadingQualityGate`.
- Criada função interna `buildNormalizedReadingLesson(rawLesson)`.
- `normalizeReadingLessonContract(rawLesson)` agora retorna:

```js
applyReadingQualityGate(buildNormalizedReadingLesson(rawLesson))
```

Isso faz toda aula Reading normalizada passar pelo quality gate antes do render.

## Resultado esperado

A Reading fica mais segura contra:

- texto vazio;
- texto curto demais;
- pergunta sem resposta;
- pergunta com resposta vazada;
- alternativas duplicadas;
- alternativa correta ausente;
- evidência faltando;
- evidência que não existe no texto;
- ausência de pré-leitura;
- ausência de produção final.

## O que não foi feito

- Não foi mexido no render aprovado de `ReadingLesson.jsx`.
- Não foi criada âncora funcional `Ir ao trecho` ainda.
- Não foi adicionado card técnico na tela.
- Não foi mexido em `bundle.js`.
- Não foi mexido em `main`.
- Não foi mexido em `rewrite-fluency-clean`.
- Não foi mexido no backend Azure privado.

## Observação importante

O `HOTFIX-READING-7-ANCHOR-EVIDENCE-LAB` ficou pendente porque exige alteração segura no `ReadingLesson.jsx`. Como a ferramenta estava retornando o arquivo truncado, a decisão correta foi não sobrescrever o componente aprovado.

## Próximo bloco recomendado

Validar no iPhone:

- Reading via `Testar Reading`;
- Grammar stepper;
- Listening stepper.

Depois, seguir para:

- `BLOCO-SPEAKING-COMPLETE-RENDER-REVIEW-LAB`

Ou voltar ao anchor evidence quando for possível alterar `ReadingLesson.jsx` com segurança.

## Checklist para teste no iPhone

Usar `Testar Reading`.

Validar:

- aula Reading ainda abre normalmente;
- texto principal aparece;
- perguntas aparecem;
- alternativas continuam funcionando;
- evidência continua aparecendo após resposta;
- exercícios internos continuam funcionando;
- stepper continua funcionando;
- Prática Profunda continua abaixo;
- não apareceu card técnico de quality gate.
