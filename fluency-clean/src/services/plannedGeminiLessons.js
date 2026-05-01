import { diagnostics } from './diagnostics.js';
import { generateLessonDraft } from './geminiLessons.js';
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
    buildPlanPromptText(plan),
    '',
    'PEDIDO ORIGINAL DO CRONOGRAMA:',
    prompt,
    '',
    'A geração deve obedecer ao plano pedagógico acima antes de criar estrutura, texto, vocabulário, exercícios e produção.',
  ].join('\n');

  const result = await generateLessonDraft({
    ...options,
    prompt: plannedPrompt,
    previousLesson,
    forceVariation,
    forcedType,
  });

  if (result?.status === 'success' && result.lesson) {
    return {
      ...result,
      lesson: {
        ...result.lesson,
        lessonPlan: plan,
        planSeed,
        planContract: plan.contract,
      },
    };
  }

  return result;
}
