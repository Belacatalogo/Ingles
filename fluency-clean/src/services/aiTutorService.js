import { diagnostics } from './diagnostics.js';
import { getGeneralAiKeys } from './aiKeys.js';
import { maskApiKey } from './geminiLessons.js';
import {
  AI_TUTOR_ALLOWED_ACTIONS,
  assertAiTutorActionAllowed,
  buildAiTutorContext,
  buildAiTutorPrompt,
} from './aiTutorPolicy.js';

const GEMINI_TUTOR_MODELS = ['gemini-2.5-flash', 'gemini-2.5-flash-lite'];

function clean(value) { return String(value ?? '').trim(); }
function extractTextFromGemini(data) {
  const parts = data?.candidates?.[0]?.content?.parts;
  if (!Array.isArray(parts)) return '';
  return parts.map((part) => part?.text ?? '').join('\n').trim();
}
function fallbackTutorResponse({ action, studentInput }) {
  if (action === AI_TUTOR_ALLOWED_ACTIONS.correctWriting) {
    return 'Não consegui chamar a IA Tutor agora, mas sua escrita foi salva. Revise: letra maiúscula no começo, ponto final, ordem sujeito + verbo + complemento e uso correto de am/is/are.';
  }
  if (action === AI_TUTOR_ALLOWED_ACTIONS.evaluateSpeaking) {
    return 'Não consegui chamar a IA Tutor agora. Treine falando devagar, separando as palavras e repetindo o modelo da aula antes da fala livre.';
  }
  if (studentInput) return 'Não consegui chamar a IA Tutor agora. Volte ao trecho da aula relacionado à sua dúvida e compare com os exemplos do professor.';
  return 'IA Tutor indisponível no momento. Continue pela aula fixa e pela Prática Profunda; elas não dependem da IA.';
}
async function callGeminiTutor({ key, model, prompt, fetcher }) {
  const url = `https://generativelanguage.googleapis.com/v1beta/models/${encodeURIComponent(model)}:generateContent?key=${encodeURIComponent(key)}`;
  const response = await fetcher(url, {
    method: 'POST',
    headers: { 'content-type': 'application/json' },
    body: JSON.stringify({
      contents: [{ role: 'user', parts: [{ text: prompt }] }],
      generationConfig: { temperature: 0.22, maxOutputTokens: 900 },
    }),
  });
  if (!response?.ok) {
    const body = await response?.text?.().catch(() => '') || '';
    throw new Error(`HTTP ${response?.status || 'unknown'} ${body.slice(0, 160)}`);
  }
  return extractTextFromGemini(await response.json());
}

export async function askAiTutor({ lesson, action, studentInput = '', errors = [], referenceText = '', prompt = '', mode = '', azureScores = null, fetcher = fetch } = {}) {
  assertAiTutorActionAllowed(action);
  const context = buildAiTutorContext({ lesson, action, studentInput, errors, referenceText, prompt, mode, azureScores });
  const tutorPrompt = buildAiTutorPrompt(context);
  const keys = getGeneralAiKeys();

  if (!keys.length) {
    return {
      status: 'missing-keys',
      text: fallbackTutorResponse({ action, studentInput }),
      context,
    };
  }

  let lastError = null;
  for (const key of keys) {
    for (const model of GEMINI_TUTOR_MODELS) {
      try {
        diagnostics.log(`IA Tutor: tentando ${model} com key ${maskApiKey(key)} para ${context.actionLabel}.`, 'info');
        const text = clean(await callGeminiTutor({ key, model, prompt: tutorPrompt, fetcher }));
        if (text) {
          return { status: 'success', text, model, context };
        }
      } catch (error) {
        lastError = error;
        diagnostics.log(`IA Tutor falhou em ${model}: ${error?.message || error}`, 'warn');
      }
    }
  }

  return {
    status: 'error',
    text: fallbackTutorResponse({ action, studentInput }),
    error: lastError?.message || String(lastError || 'Falha na IA Tutor.'),
    context,
  };
}

export async function correctWritingWithTutor({ lesson, text, fetcher = fetch } = {}) {
  return askAiTutor({ lesson, action: AI_TUTOR_ALLOWED_ACTIONS.correctWriting, studentInput: text, fetcher });
}

export async function explainLessonDoubtWithTutor({ lesson, question, fetcher = fetch } = {}) {
  return askAiTutor({ lesson, action: AI_TUTOR_ALLOWED_ACTIONS.explainCurrentLesson, studentInput: question, fetcher });
}

export async function buildSmallReinforcementWithTutor({ lesson, request = '', fetcher = fetch } = {}) {
  return askAiTutor({ lesson, action: AI_TUTOR_ALLOWED_ACTIONS.smallReinforcement, studentInput: request, fetcher });
}

export async function evaluateSpeakingWithTutor({ lesson, spokenText = '', referenceText = '', prompt = '', mode = '', azureScores = null, fetcher = fetch } = {}) {
  return askAiTutor({ lesson, action: AI_TUTOR_ALLOWED_ACTIONS.evaluateSpeaking, studentInput: spokenText, referenceText, prompt, mode, azureScores, fetcher });
}

export async function evaluateReadingWithTutor({ lesson, studentText = '', prompt = '', referenceText = '', expectedAnswer = '', fetcher = fetch } = {}) {
  const sourceText = referenceText
    || clean(lesson?.mainText || lesson?.text || lesson?.readingText || lesson?.article?.text || '');
  return askAiTutor({
    lesson,
    action: AI_TUTOR_ALLOWED_ACTIONS.evaluateReadingAnswer,
    studentInput: studentText,
    prompt,
    referenceText: sourceText.slice(0, 2000),
    fetcher,
  });
}

export async function evaluateListeningWithTutor({ lesson, studentText = '', prompt = '', referenceText = '', expectedAnswer = '', fetcher = fetch } = {}) {
  const sourceTranscript = referenceText
    || clean(lesson?.transcript || lesson?.audioScript || lesson?.script || '');
  return askAiTutor({
    lesson,
    action: AI_TUTOR_ALLOWED_ACTIONS.evaluateListeningAnswer,
    studentInput: studentText,
    prompt,
    referenceText: sourceTranscript.slice(0, 2000),
    fetcher,
  });
}
