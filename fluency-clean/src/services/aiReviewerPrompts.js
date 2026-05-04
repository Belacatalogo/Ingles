export const AI_REVIEWER_VERSION = 'ai-reviewer-v1';

export const AI_REVIEWER_SYSTEM_PROMPT = `
Você é um professor de inglês experiente, especialista em ensino para brasileiros adultos.
Você vai receber uma aula gerada por IA e deve revisá-la com olhar crítico e pedagógico real.
Não avalie a forma (quantidade de palavras, campos). Avalie se a aula ensinaria de verdade.
Retorne APENAS JSON válido. Sem markdown. Sem texto antes ou depois.
`.trim();

export const AI_REVIEWER_OUTPUT_CONTRACT = `
Retorne exatamente este JSON:
{
  "approved": true | false,
  "score": 0-100,
  "strengths": ["ponto forte 1", "ponto forte 2"],
  "issues": ["problema 1", "problema 2"],
  "criticalIssues": ["problema bloqueante se houver"],
  "suggestedFix": "o que regenerar ou corrigir em 1 frase",
  "reviewerNotes": "observação opcional do professor"
}

- approved: true apenas se score >= 78 e criticalIssues vazio.
- score: 0-100 avaliando qualidade pedagógica real.
- strengths: máximo 3 itens.
- issues: problemas que reduzem a qualidade mas não bloqueiam.
- criticalIssues: problemas que tornam a aula inadequada para o aluno.
- suggestedFix: instrução curta para a IA que vai regenerar.
- reviewerNotes: observação livre do professor (pode ser vazio "").
`.trim();

export function buildGrammarReviewerPrompt(lesson, level) {
  return `
Você está revisando uma aula de Grammar nível ${level} para brasileiros.

AULA GERADA:
${JSON.stringify(lesson, null, 2)}

CRITÉRIOS DE REVISÃO — avalie cada um:

1. CORREÇÃO GRAMATICAL: A regra explicada está correta? Os exemplos de afirmativa, negativa e pergunta estão corretos? Os erros típicos são reais erros de brasileiros (não inventados)?

2. PROGRESSÃO DIDÁTICA: A aula vai do reconhecimento à produção? Tem uma ordem lógica: entender → ver forma → praticar → produzir?

3. EXEMPLOS NATURAIS: As frases de exemplo soam naturais em inglês? Não são traduções literais do português?

4. EXERCÍCIOS: Os exercícios realmente treinam a estrutura ensinada? Há variedade (reconhecimento, transformação, correção, produção)? As respostas estão vazadas no enunciado?

5. PRODUÇÃO FINAL: O aluno consegue fazer a produção com o que foi ensinado? Não é difícil demais para o nível ${level}?

6. ERROS TÍPICOS BR: Os erros comuns listados são reais para brasileiros? Ex: "He work" → "He works", "more bigger", "I goed"?

${AI_REVIEWER_OUTPUT_CONTRACT}
`.trim();
}

export function buildListeningReviewerPrompt(lesson, level) {
  return `
Você está revisando uma aula de Listening nível ${level} para brasileiros.

AULA GERADA:
${JSON.stringify(lesson, null, 2)}

CRITÉRIOS DE REVISÃO — avalie cada um:

1. NATURALIDADE DA TRANSCRIÇÃO: O texto/diálogo soa natural em inglês? Tem pausas, hesitações leves, linguagem real? Não é formal demais ou robótico?

2. DEPENDÊNCIA DO ÁUDIO: As perguntas de compreensão dependem de ter ouvido o áudio? Ou poderiam ser respondidas sem ouvir (texto visível, senso comum)?

3. PROGRESSÃO DE ESCUTA: Há progressão: escuta global → detalhes → vocabulário → shadowing? Não começa pedindo detalhes antes da ideia geral?

4. DITADO PROPORCIONAL: Para ${level}, os ditados são adequados em tamanho? A1: máximo 4 palavras. B1: até 10 palavras.

5. SHADOWING VIÁVEL: As frases de shadowing são curtas (3–7 palavras) e têm ritmo natural?

6. VOCABULÁRIO AUDITIVO: O vocabulário listado é realmente do áudio e útil para entender o contexto?

${AI_REVIEWER_OUTPUT_CONTRACT}
`.trim();
}

export function buildReadingReviewerPrompt(lesson, level) {
  return `
Você está revisando uma aula de Reading nível ${level} para brasileiros.

AULA GERADA:
${JSON.stringify(lesson, null, 2)}

CRITÉRIOS DE REVISÃO — avalie cada um:

1. ADEQUAÇÃO DO TEXTO: O texto em inglês é adequado ao nível ${level}? Vocabulário, tamanho de frases e complexidade batem com o nível?

2. EVIDÊNCIA REAL: As perguntas de compreensão têm resposta no texto? Ou pedem inferências impossíveis ou conhecimento externo?

3. PROGRESSÃO DE LEITURA: Há progressão: ideia geral → detalhes → vocabulário → inferência? Não começa pedindo inferência antes do básico?

4. VOCABULÁRIO EM CONTEXTO: O vocabulário listado aparece no texto e é ensinado com exemplo natural?

5. PRÉ-LEITURA: Há ativação de conhecimento prévio antes do texto? O aluno é preparado para ler?

6. PRODUÇÃO FINAL: A produção pedida é viável com o vocabulário e estrutura ensinados na aula?

${AI_REVIEWER_OUTPUT_CONTRACT}
`.trim();
}

export function buildWritingReviewerPrompt(lesson, level) {
  return `
Você está revisando uma aula de Writing nível ${level} para brasileiros.

AULA GERADA:
${JSON.stringify(lesson, null, 2)}

CRITÉRIOS DE REVISÃO — avalie cada um:

1. MODELO ANTES DA PRODUÇÃO: A aula mostra um modelo de texto/frase antes de pedir que o aluno escreva? O aluno tem âncora para imitar?

2. ESTRUTURA CLARA: A estrutura do que escrever está clara? O aluno sabe onde começar, o que incluir e como terminar?

3. FRASES ÚTEIS: A aula ensina frases prontas e conectores úteis para o tipo de escrita pedido?

4. PROGRESSÃO: Vai do guiado ao livre? Começa completando/montando antes de pedir escrita livre?

5. VIABILIDADE: A produção final é viável para ${level}? Não é longa demais ou pede estruturas não ensinadas?

6. CHECKLIST DE REVISÃO: O aluno tem algum critério para revisar o que escreveu antes de concluir?

${AI_REVIEWER_OUTPUT_CONTRACT}
`.trim();
}

export function buildSpeakingReviewerPrompt(lesson, level) {
  return `
Você está revisando uma aula de Speaking nível ${level} para brasileiros.

AULA GERADA:
${JSON.stringify(lesson, null, 2)}

CRITÉRIOS DE REVISÃO — avalie cada um:

1. MODELO ANTES DA FALA: Há modelo de fala para o aluno ouvir e imitar antes de gravar? Não pede produção sem modelo.

2. NATURALIDADE DAS FRASES: As frases modelo soam naturais em inglês falado? Não são traduções literais do português?

3. PROGRESSÃO: Vai de repetir → responder curto → produzir? Não começa pedindo fala longa para A1/A2?

4. PRONÚNCIA: Há foco em pronúncia de sons difíceis para brasileiros (th, v/b, -ed, linking)?

5. FRASES VIÁVEIS: As frases pedidas são viáveis para ${level}? A1 deve falar no máximo 1–2 frases simples.

6. DIÁLOGO GUIADO: Se tem diálogo, o aluno tem cue claro do que responder? A resposta do aluno não está escrita (vaza)?

${AI_REVIEWER_OUTPUT_CONTRACT}
`.trim();
}

export function buildReviewerPromptForType(lesson, type, level) {
  switch (String(type || '').toLowerCase()) {
    case 'grammar':
      return buildGrammarReviewerPrompt(lesson, level);
    case 'listening':
      return buildListeningReviewerPrompt(lesson, level);
    case 'reading':
      return buildReadingReviewerPrompt(lesson, level);
    case 'writing':
      return buildWritingReviewerPrompt(lesson, level);
    case 'speaking':
      return buildSpeakingReviewerPrompt(lesson, level);
    default:
      return buildReadingReviewerPrompt(lesson, level);
  }
}
