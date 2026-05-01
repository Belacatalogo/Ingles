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
