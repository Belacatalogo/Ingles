import { diagnostics } from './diagnostics.js';
import { maskApiKey } from './geminiLessons.js';
import { EXTERNAL_PROVIDER_POLICY } from './modelPolicy.js';
import { storage } from './storage.js';

function clean(value) {
  return String(value ?? '').replace(/\*\*(.*?)\*\*/g, '$1').replace(/\s+([,.!?;:])/g, '$1').trim();
}

function ensureArray(value) {
  return Array.isArray(value) ? value : [];
}

function readRawLocalStorage(name) {
  try { return clean(window.localStorage.getItem(name) || ''); } catch { return ''; }
}

function readLocalText(name) {
  return clean(storage.getText(name, '')) || readRawLocalStorage(name);
}

function stripFences(value) {
  return clean(value).replace(/^```(?:json)?\s*/i, '').replace(/```$/i, '').trim();
}

function extractBalancedJson(value) {
  const text = stripFences(value);
  const start = text.indexOf('{');
  if (start < 0) return text;
  let depth = 0;
  let inString = false;
  let escaped = false;
  for (let index = start; index < text.length; index += 1) {
    const char = text[index];
    if (escaped) { escaped = false; continue; }
    if (char === '\\') { escaped = true; continue; }
    if (char === '"') { inString = !inString; continue; }
    if (inString) continue;
    if (char === '{') depth += 1;
    if (char === '}') {
      depth -= 1;
      if (depth === 0) return text.slice(start, index + 1);
    }
  }
  return text.slice(start);
}

function parseJson(value) {
  const raw = extractBalancedJson(value).replace(/,\s*([}\]])/g, '$1');
  try { return JSON.parse(raw); }
  catch (error) { throw new Error(`DeepSeek Reading Repair JSON inválido: ${error?.message || error}. Preview: ${raw.slice(0, 180)}`); }
}

function getMainText(lesson) {
  return clean(lesson?.readingText || lesson?.reading_text || lesson?.mainText || lesson?.main_text || lesson?.text || lesson?.story || lesson?.article || lesson?.passage || lesson?.listeningText || lesson?.transcript || lesson?.raw?.readingText || lesson?.raw?.mainText || lesson?.raw?.text || lesson?.raw?.passage || lesson?.raw?.listeningText || '');
}

function summarizeExistingQuestions(lesson) {
  const source = ensureArray(lesson?.readingQuestions).length ? lesson.readingQuestions : ensureArray(lesson?.exercises);
  return source.slice(0, 8).map((item) => ({
    question: clean(item?.question || item?.prompt),
    options: ensureArray(item?.options).map(clean).filter(Boolean).slice(0, 4),
    answer: clean(item?.answer || item?.correctAnswer),
    evidence: clean(item?.evidence || item?.quote || item?.explanation),
  })).filter((item) => item.question || item.answer || item.options.length);
}

function buildPrompt({ lesson, text }) {
  const existing = summarizeExistingQuestions(lesson);
  return [
    'Você é o DeepSeek Reading Exercise Repair do Fluency. Responda somente JSON válido.',
    'Tarefa: criar exercícios de Reading para um aluno brasileiro A1 usando SOMENTE o texto principal fornecido.',
    'Não invente informação. Cada resposta correta precisa ser provada por uma frase literal ou quase literal do texto.',
    'As perguntas devem ser em português claro. Nunca use perguntas genéricas como "Qual alternativa responde corretamente ao texto?".',
    'As alternativas devem ser curtas. Podem ser em inglês quando forem trechos/frases do texto.',
    'Crie 8 questões: 1 ideia geral, 4 detalhes, 1 vocabulário/contexto, 1 sequência ou inferência simples, 1 revisão final.',
    'Cada item deve ter: skill, questionPt, options, answer, evidence, explanationPt.',
    'answer deve ser exatamente igual a uma das options.',
    'evidence deve conter uma frase curta retirada do texto que prove a resposta.',
    'explanationPt deve explicar em português por que a alternativa correta faz sentido.',
    'Formato JSON obrigatório:',
    '{"readingQuestions":[{"skill":"detail","questionPt":"Quem se apresenta no texto?","options":["Ana","Ben","Maria"],"answer":"Ana","evidence":"My name is Ana.","explanationPt":"A frase do texto mostra que a pessoa diz que se chama Ana."}]}',
    '',
    'Texto principal:',
    text,
    '',
    existing.length ? `Exercícios ruins/atuais para corrigir, se úteis: ${JSON.stringify(existing).slice(0, 2500)}` : '',
  ].filter(Boolean).join('\n');
}

function normalizeQuestion(item, index) {
  const options = ensureArray(item?.options).map(clean).filter(Boolean).slice(0, 4);
  const answer = clean(item?.answer || item?.correctAnswer);
  const questionPt = clean(item?.questionPt || item?.question_pt || item?.question);
  const evidence = clean(item?.evidence || item?.quote);
  const explanationPt = clean(item?.explanationPt || item?.explanation_pt || item?.explanation);
  return {
    skill: clean(item?.skill || (index === 0 ? 'main_idea' : 'detail')),
    question: questionPt,
    questionPt,
    options,
    answer,
    evidence,
    explanation: explanationPt,
    explanationPt,
    source: 'deepseek-reading-repair-v1',
  };
}

function validateQuestions(questions, text) {
  const normalizedText = clean(text).toLowerCase();
  return ensureArray(questions)
    .map(normalizeQuestion)
    .filter((item) => item.questionPt && item.options.length >= 3 && item.answer && item.options.some((option) => option.toLowerCase() === item.answer.toLowerCase()))
    .filter((item) => !/qual alternativa responde corretamente|qual informação aparece no texto|o que .* faz no texto/i.test(item.questionPt))
    .filter((item) => {
      const evidence = clean(item.evidence).toLowerCase();
      if (!evidence) return false;
      if (normalizedText.includes(evidence)) return true;
      const words = evidence.split(/\s+/).filter((word) => word.length > 2);
      return words.length >= 3 && words.filter((word) => normalizedText.includes(word)).length >= Math.ceil(words.length * 0.65);
    })
    .slice(0, 8);
}

async function callDeepSeek({ prompt, key, model, fetcher }) {
  const response = await fetcher('https://api.deepseek.com/chat/completions', {
    method: 'POST',
    headers: { 'content-type': 'application/json', Authorization: `Bearer ${key}` },
    body: JSON.stringify({
      model,
      messages: [
        { role: 'system', content: 'Você responde apenas JSON válido. A palavra json é obrigatória neste modo. Não use markdown.' },
        { role: 'user', content: prompt },
      ],
      temperature: 0.12,
      max_tokens: 4200,
      response_format: { type: 'json_object' },
    }),
  });
  if (!response?.ok) {
    const message = await response?.text?.().catch(() => '') || '';
    throw new Error(`DeepSeek HTTP ${response?.status || 0} ${message.slice(0, 220)}`);
  }
  const data = await response.json();
  const content = clean(data?.choices?.[0]?.message?.content || '');
  if (!content) throw new Error('DeepSeek retornou conteúdo vazio no reparo de Reading.');
  return parseJson(content);
}

export function getDeepSeekReadingRepairStatus() {
  const policy = EXTERNAL_PROVIDER_POLICY.deepseek;
  const key = readLocalText(policy.keyStorage);
  const model = readLocalText(policy.modelStorage) || policy.defaultModel;
  return { configured: Boolean(key), masked: maskApiKey(key), model, defaultModel: policy.defaultModel };
}

export async function repairReadingExercisesWithDeepSeek(lesson, { fetcher = fetch } = {}) {
  const text = getMainText(lesson);
  if (String(lesson?.type || '').toLowerCase() !== 'reading') return { applied: false, lesson, reason: 'not-reading' };
  if (text.split(/\s+/).filter(Boolean).length < 40) return { applied: false, lesson, reason: 'reading-text-too-short' };

  const status = getDeepSeekReadingRepairStatus();
  if (!status.configured) return { applied: false, lesson, reason: 'deepseek-not-configured' };

  diagnostics.setPhase('DeepSeek reparando exercícios Reading', 'generating');
  diagnostics.log(`DeepSeek Reading Repair ativado com ${status.model} e key ${status.masked}.`, 'warn');

  const policy = EXTERNAL_PROVIDER_POLICY.deepseek;
  const key = readLocalText(policy.keyStorage);
  const model = status.model;
  const prompt = buildPrompt({ lesson, text });
  const data = await callDeepSeek({ prompt, key, model, fetcher });
  const questions = validateQuestions(data?.readingQuestions || data?.questions || data?.exercises, text);

  if (questions.length < 5) {
    diagnostics.log(`DeepSeek Reading Repair devolveu poucas questões válidas (${questions.length}). Mantendo aula original.`, 'warn', data);
    return { applied: false, lesson, reason: 'insufficient-valid-questions', raw: data };
  }

  const repairedLesson = {
    ...lesson,
    readingQuestions: questions,
    exercises: questions,
    readingExerciseRepair: {
      provider: 'deepseek',
      model,
      appliedAt: new Date().toISOString(),
      validQuestions: questions.length,
      contract: 'deepseek-reading-exercise-repair-v1',
    },
    planContract: `${lesson?.planContract || 'lesson-contract-v1'}+deepseek-reading-exercise-repair-v1`,
  };

  diagnostics.log(`DeepSeek Reading Repair aprovado: ${questions.length} questões coerentes com evidência textual.`, 'success', repairedLesson.readingExerciseRepair);
  return { applied: true, lesson: repairedLesson, questions };
}
