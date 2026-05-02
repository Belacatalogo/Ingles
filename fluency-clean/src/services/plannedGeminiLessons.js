import { diagnostics } from './diagnostics.js';
import { generateLessonDraft } from './geminiLessons.js';
import { generateExternalLessonDraft, shouldForceExternalLessonProviderOnce } from './externalLessonProviders.js';
import { enrichGrammarSectionsSequentially } from './grammarSectionGenerator.js';
import { summarizeModelPolicyForDiagnostics } from './modelPolicy.js';
import { buildPedagogicalPlan, buildPlanPromptText, summarizePlanForDiagnostics } from './lessonPlan.js';
import { inferLessonTypeFromText, normalizeLessonType } from './lessonTypes.js';

function makePlanSeed() {
  return `${Date.now().toString(36)}-${Math.random().toString(36).slice(2, 8)}`;
}

function resolvePlanType({ prompt = '', forcedType = '' } = {}) {
  const normalized = normalizeLessonType(forcedType);
  if (normalized && normalized !== 'default') return normalized;
  return inferLessonTypeFromText(prompt);
}

async function attachPlanToResult(result, plan, planSeed, options = {}) {
  if (result?.status !== 'success' || !result.lesson) return result;
  let lesson = result.lesson;

  if (String(lesson.type || '').toLowerCase() === 'grammar') {
    const sectionResult = await enrichGrammarSectionsSequentially({
      lesson,
      keys: options.keys,
      proKey: options.proKey,
      fetcher: options.fetcher,
    });
    lesson = sectionResult.lesson;
    if (sectionResult.applied) {
      diagnostics.log('Cirurgia 2 Grammar concluída: sections profundas geradas sequencialmente antes do revisor.', 'success');
    } else {
      diagnostics.log(`Cirurgia 2 Grammar não precisou rodar: ${sectionResult.reason}.`, 'info');
    }
  }

  const previousContract = lesson.planContract || '';
  return {
    ...result,
    lesson: {
      ...lesson,
      lessonPlan: plan,
      planSeed,
      planContract: previousContract ? `${plan.contract}+${previousContract}` : plan.contract,
    },
  };
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
  diagnostics.log(summarizeModelPolicyForDiagnostics(lessonType), 'info');

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

  const forceExternalTarget = shouldForceExternalLessonProviderOnce();
  if (forceExternalTarget) {
    const targetLabel = forceExternalTarget === 'external' ? 'Groq/Cerebras' : forceExternalTarget;
    diagnostics.log(`Modo teste ativo: pulando Gemini e chamando fallback externo ${targetLabel}.`, 'warn');
    const forcedExternalResult = await generateExternalLessonDraft({
      ...options,
      prompt: plannedPrompt,
      forcedType,
      level,
      previousLesson,
      forceVariation,
      reason: `modo teste forçado pelo usuário${forceExternalTarget !== 'external' ? ` (${forceExternalTarget})` : ''}`,
      targetProvider: forceExternalTarget === 'external' ? '' : forceExternalTarget,
    });
    if (forcedExternalResult?.status === 'success' && forcedExternalResult.lesson) {
      return attachPlanToResult(forcedExternalResult, plan, planSeed, options);
    }
    diagnostics.log('Fallback externo forçado falhou. Voltando ao Gemini para não travar a geração.', 'warn', forcedExternalResult);
  }

  const result = await generateLessonDraft({
    ...options,
    prompt: plannedPrompt,
    previousLesson,
    forceVariation,
    forcedType,
  });

  if (result?.status === 'success' && result.lesson) {
    return attachPlanToResult(result, plan, planSeed, options);
  }

  diagnostics.log('Gemini não concluiu a aula. Tentando fallback externo Groq/Cerebras antes de devolver erro.', 'warn', result);
  const externalResult = await generateExternalLessonDraft({
    ...options,
    prompt: plannedPrompt,
    forcedType,
    level,
    previousLesson,
    forceVariation,
    reason: result?.error || result?.status || 'falha no Gemini',
  });

  if (externalResult?.status === 'success' && externalResult.lesson) {
    return attachPlanToResult(externalResult, plan, planSeed, options);
  }

  return result;
}
