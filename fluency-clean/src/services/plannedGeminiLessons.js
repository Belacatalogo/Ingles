import { diagnostics } from './diagnostics.js';
import { generateLessonDraft, maskApiKey } from './geminiLessons.js';
import { buildPedagogicalPlan, buildPlanPromptText, summarizePlanForDiagnostics } from './lessonPlan.js';
import { inferLessonTypeFromText, normalizeLessonType } from './lessonTypes.js';

const GRAMMAR_MODEL_TEST_CONTRACT = 'grammar-model-test-gemini-2.5-pro-free-key';
const GRAMMAR_MODEL_TEST_FALLBACK_CONTRACT = 'grammar-model-test-fallback-current';

function makePlanSeed() {
  return `${Date.now().toString(36)}-${Math.random().toString(36).slice(2, 8)}`;
}

function resolvePlanType({ prompt = '', forcedType = '' } = {}) {
  const normalized = normalizeLessonType(forcedType);
  if (normalized && normalized !== 'default') return normalized;
  return inferLessonTypeFromText(prompt);
}

function appendPlanContract(baseContract = '', extraContract = '') {
  const base = String(baseContract || 'planned-lesson-v1');
  const extra = String(extraContract || '').trim();
  if (!extra) return base;
  return base.includes(extra) ? base : `${base}+${extra}`;
}

function attachPlan(result, { plan, planSeed, planContract }) {
  if (result?.status === 'success' && result.lesson) {
    return {
      ...result,
      lesson: {
        ...result.lesson,
        lessonPlan: plan,
        planSeed,
        planContract,
      },
    };
  }
  return result;
}

const JSON_OUTPUT_GUARD = [
  'GUARDA DE FORMATO JSON OBRIGATÓRIA:',
  'A resposta de cada bloco deve começar diretamente com { e terminar com }.',
  'Nunca retorne JSON como string escapada.',
  'Nunca comece com {\\"type\\" ou {\\"exercises\\".',
  'Nunca coloque barra invertida antes de aspas de chaves JSON.',
  'Forma correta: {"type":"listening","level":"A1"}',
  'Forma proibida: {\\"type\\":\\"listening\\",\\"level\\":\\"A1"}',
  'Não coloque markdown, texto explicativo, comentários ou aspas envolvendo o objeto JSON.',
  'Se a API pedir application/json, devolva objeto JSON real, não texto serializado dentro de texto.',
].join('\n');

const LISTENING_SOURCE_OF_TRUTH_GUARD = [
  'REGRA CRÍTICA PARA AULAS LISTENING:',
  'A transcrição/listeningText é a fonte única de verdade da aula.',
  'Primeiro crie uma transcrição completa e coerente; depois vocabulário e questões devem sair somente dessa transcrição.',
  'A transcrição precisa ter começo, meio e fechamento claro. Não entregue diálogo cortado no meio.',
  'Para mini-história ou diálogo, inclua: abertura da situação, troca principal de informações e fechamento/resolução.',
  'Exemplo de fechamento: Thank you. / You are welcome. / Here is the book. / Great, that helps.',
  'Nunca faça pergunta sobre informação que não aparece literalmente ou claramente na transcrição.',
  'Nunca inclua vocabulário principal que não aparece na transcrição.',
  'Se o texto for diálogo entre duas ou mais pessoas, cada fala deve começar com o nome/papel do falante seguido de dois pontos.',
  'Exemplo correto: Librarian: Hello, Clara. How can I help you?',
  'Exemplo correto: Clara: I am looking for a book about local history.',
  'Se houver autor, livro, número, sobrenome ou qualquer detalhe cobrado nos exercícios, esse detalhe precisa aparecer no listeningText.',
  'Se não aparece no listeningText, não pode aparecer no vocabulário nem nas questões.',
].join('\n');

async function tryGrammarProWithFreeKeys({ options, plannedPrompt, previousLesson, forceVariation, forcedType, freeKeys = [] }) {
  for (let index = 0; index < freeKeys.length; index += 1) {
    const key = freeKeys[index];
    const attemptLabel = `${index + 1}/${freeKeys.length}`;
    diagnostics.setPhase('MODEL-TEST-GRAMMAR-PRO-FREE ativo', 'generating');
    diagnostics.log(`MODEL-TEST-GRAMMAR-PRO-FREE ATIVO: tentativa ${attemptLabel} usando gemini-2.5-pro com key free/de aula ${maskApiKey(key)}.`, 'info');

    const result = await generateLessonDraft({
      ...options,
      prompt: plannedPrompt,
      previousLesson,
      forceVariation,
      forcedType,
      keys: [],
      proKey: key,
    });

    if (result?.status === 'success' && result.lesson) {
      diagnostics.log(`MODEL-TEST-GRAMMAR-PRO-FREE: Grammar gerada com gemini-2.5-pro usando key free/de aula ${maskApiKey(key)}.`, 'success');
      return result;
    }

    diagnostics.log(`MODEL-TEST-GRAMMAR-PRO-FREE: gemini-2.5-pro falhou nesta key free/de aula ${maskApiKey(key)}. Motivo: ${result?.error || 'sem detalhe'}`, 'warn', result);
  }

  return null;
}

export async function generatePlannedLessonDraft(options = {}) {
  const {
    prompt = '',
    previousLesson = null,
    forceVariation = false,
    forcedType = '',
    level = 'A1',
  } = options;

  const lessonType = resolvePlanType({ prompt, forcedType });
  const planSeed = makePlanSeed();
  const plan = buildPedagogicalPlan({
    prompt,
    lessonType,
    level,
    seed: planSeed,
    previousLesson,
    forceVariation,
  });

  diagnostics.setPhase('planejando aula antes da geração', 'generating');
  diagnostics.log(`Plano pedagógico criado: ${summarizePlanForDiagnostics(plan)}.`, 'info', plan);

  const plannedPrompt = [
    JSON_OUTPUT_GUARD,
    '',
    lessonType === 'listening' ? LISTENING_SOURCE_OF_TRUTH_GUARD : '',
    '',
    buildPlanPromptText(plan),
    '',
    'PEDIDO ORIGINAL DO CRONOGRAMA:',
    prompt,
    '',
    'A geração deve obedecer ao plano pedagógico acima antes de criar estrutura, texto, vocabulário, exercícios e produção.',
    'Antes de responder cada bloco, confira mentalmente se o primeiro caractere da resposta será { e não texto escapado.',
  ].join('\n');

  const freeKeys = Array.isArray(options.keys) ? options.keys.filter(Boolean) : [];
  const isGrammar = lessonType === 'grammar';

  if (isGrammar && freeKeys.length) {
    diagnostics.setPhase('MODEL-TEST-GRAMMAR-PRO-FREE ativo', 'generating');
    diagnostics.log('MODEL-TEST-GRAMMAR-PRO-FREE ATIVO: Grammar vai tentar gemini-2.5-pro nas keys free/de aula antes do Flash.', 'info');

    const proFreeResult = await tryGrammarProWithFreeKeys({
      options,
      plannedPrompt,
      previousLesson,
      forceVariation,
      forcedType,
      freeKeys,
    });

    if (proFreeResult?.status === 'success' && proFreeResult.lesson) {
      return attachPlan(proFreeResult, {
        plan,
        planSeed,
        planContract: appendPlanContract(plan.contract, GRAMMAR_MODEL_TEST_CONTRACT),
      });
    }

    diagnostics.setPhase('MODEL-TEST-GRAMMAR-PRO-FREE fallback', 'generating');
    diagnostics.log('MODEL-TEST-GRAMMAR-PRO-FREE: nenhuma key free/de aula conseguiu gerar com gemini-2.5-pro. Voltando ao modelo atual Flash/free.', 'warn');

    const fallbackResult = await generateLessonDraft({
      ...options,
      prompt: plannedPrompt,
      previousLesson,
      forceVariation,
      forcedType,
      proKey: '',
    });

    return attachPlan(fallbackResult, {
      plan,
      planSeed,
      planContract: appendPlanContract(plan.contract, GRAMMAR_MODEL_TEST_FALLBACK_CONTRACT),
    });
  }

  if (isGrammar && !freeKeys.length) {
    diagnostics.log('MODEL-TEST-GRAMMAR-PRO-FREE ATIVO, mas nenhuma key free/de aula foi encontrada. Mantendo modelo atual.', 'warn');
  }

  const result = await generateLessonDraft({
    ...options,
    prompt: plannedPrompt,
    previousLesson,
    forceVariation,
    forcedType,
  });

  return attachPlan(result, {
    plan,
    planSeed,
    planContract: plan.contract,
  });
}
