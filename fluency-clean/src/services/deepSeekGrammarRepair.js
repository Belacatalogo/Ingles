import { diagnostics } from './diagnostics.js';
import { maskApiKey } from './geminiLessons.js';
import { EXTERNAL_PROVIDER_POLICY } from './modelPolicy.js';
import { storage } from './storage.js';

function clean(value) {
  return String(value ?? '').replace(/\*\*(.*?)\*\*/g, '$1').replace(/\s+([,.!?;:])/g, '$1').trim();
}
function ensureArray(value) { return Array.isArray(value) ? value : []; }
function readRawLocalStorage(name) { try { return clean(window.localStorage.getItem(name) || ''); } catch { return ''; } }
function readLocalText(name) { return clean(storage.getText(name, '')) || readRawLocalStorage(name); }
function stripFences(value) { return clean(value).replace(/^```(?:json)?\s*/i, '').replace(/```$/i, '').trim(); }

function extractBalancedJson(value) {
  const text = stripFences(value);
  const start = text.indexOf('{');
  if (start < 0) return text;
  let depth = 0; let inString = false; let escaped = false;
  for (let index = start; index < text.length; index += 1) {
    const char = text[index];
    if (escaped) { escaped = false; continue; }
    if (char === '\\') { escaped = true; continue; }
    if (char === '"') { inString = !inString; continue; }
    if (inString) continue;
    if (char === '{') depth += 1;
    if (char === '}') { depth -= 1; if (depth === 0) return text.slice(start, index + 1); }
  }
  return text.slice(start);
}
function parseJson(value) {
  const raw = extractBalancedJson(value).replace(/,\s*([}\]])/g, '$1');
  try { return JSON.parse(raw); }
  catch (error) { throw new Error(`DeepSeek Grammar Repair JSON inválido: ${error?.message || error}. Preview: ${raw.slice(0, 180)}`); }
}

function summarizeLesson(lesson) {
  return {
    title: clean(lesson?.title), level: clean(lesson?.level || 'A1'), focus: clean(lesson?.focus || lesson?.topic), objective: clean(lesson?.objective),
    sections: ensureArray(lesson?.sections).map((section) => ({ title: clean(section?.title), content: clean(section?.content).slice(0, 1200) })).slice(0, 9),
    vocabulary: ensureArray(lesson?.vocabulary).slice(0, 14),
    exercises: ensureArray(lesson?.exercises).map((item) => ({ question: clean(item?.question), options: ensureArray(item?.options).slice(0, 4), answer: clean(item?.answer), explanation: clean(item?.explanation) })).slice(0, 22),
    prompts: ensureArray(lesson?.prompts).slice(0, 8),
  };
}

function buildPrompt(lesson) {
  return [
    'Você é o DeepSeek Grammar Repair do Fluency. Responda somente JSON válido.',
    'Repare uma aula de GRAMMAR para aluno brasileiro A1 sem mudar o tema central.',
    'A aula deve parecer professor particular: explicação em português, exemplos simples em inglês, tradução quando ajudar, uso real e prática guiada.',
    'Obrigatório nas seções: visão geral, quando usar, forma afirmativa, forma negativa, perguntas, erros comuns, exemplos em contexto, microdiálogo e produção guiada.',
    'Cada section.content deve ter explicação em português e 3 a 5 exemplos A1 em inglês com nota/tradução curta quando ajudar.',
    'Crie EXATAMENTE 20 exercícios em português para A1 com options, answer e explanationPt. answer deve ser exatamente uma das options.',
    'Não devolva menos de 18 exercícios. Se precisar, crie variações simples: reconhecer forma, completar lacuna, corrigir erro, transformar frase, tradução curta e mini contexto.',
    'Misture escolha correta, completar lacuna, corrigir erro, transformar frase e tradução curta controlada.',
    'Crie 6 a 7 prompts de produção própria em português com inglês simples.',
    'Formato: {"sections":[{"title":"...","content":"..."}],"exercises":[{"question":"...","options":["..."],"answer":"...","explanationPt":"..."}],"prompts":["..."]}',
    'Aula atual:', JSON.stringify(summarizeLesson(lesson)),
  ].join('\n');
}

function normalizeSections(sections) {
  return ensureArray(sections).map((section, index) => ({
    title: clean(section?.title || `Parte ${index + 1}`),
    content: clean(section?.content || section?.text || section?.body),
    examples: ensureArray(section?.examples),
  })).filter((section) => section.title && section.content).slice(0, 10);
}
function normalizeExercises(exercises) {
  return ensureArray(exercises).map((item, index) => ({
    question: clean(item?.question || item?.questionPt || item?.prompt || `Questão ${index + 1}`),
    options: ensureArray(item?.options).map(clean).filter(Boolean).slice(0, 4),
    answer: clean(item?.answer || item?.correctAnswer),
    explanation: clean(item?.explanationPt || item?.explanation || item?.feedback),
    skill: clean(item?.skill || 'grammar'), source: 'deepseek-grammar-repair-v1',
  })).filter((item) => item.question && item.options.length >= 2 && item.answer && item.options.some((option) => option.toLowerCase() === item.answer.toLowerCase())).slice(0, 22);
}
function normalizePrompts(prompts) { return ensureArray(prompts).map((item) => clean(item?.instruction || item?.prompt || item)).filter(Boolean).slice(0, 8); }
function validateRepair(data) {
  const sections = normalizeSections(data?.sections);
  const exercises = normalizeExercises(data?.exercises || data?.questions);
  const prompts = normalizePrompts(data?.prompts || data?.productionPrompts);
  const sectionText = sections.map((section) => `${section.title} ${section.content}`).join(' ').toLowerCase();
  const hits = [/quando usar|uso real|use quando/, /afirmativa|forma positiva/, /negativa|forma negativa/, /pergunta|interrogativa/, /erro comum|erros comuns/, /exemplo|microdiálogo|dialogo|diálogo/, /produção|produzir|escreva/].filter((pattern) => pattern.test(sectionText)).length;
  return { sections, exercises, prompts, approved: sections.length >= 7 && exercises.length >= 18 && prompts.length >= 5 && hits >= 5 };
}
async function callDeepSeek({ prompt, key, model, fetcher }) {
  const response = await fetcher('https://api.deepseek.com/chat/completions', {
    method: 'POST', headers: { 'content-type': 'application/json', Authorization: `Bearer ${key}` },
    body: JSON.stringify({ model, messages: [{ role: 'system', content: 'Você responde apenas JSON válido. A palavra json é obrigatória neste modo. Não use markdown.' }, { role: 'user', content: prompt }], temperature: 0.14, max_tokens: 9000, response_format: { type: 'json_object' } }),
  });
  if (!response?.ok) { const message = await response?.text?.().catch(() => '') || ''; throw new Error(`DeepSeek HTTP ${response?.status || 0} ${message.slice(0, 220)}`); }
  const data = await response.json();
  const content = clean(data?.choices?.[0]?.message?.content || '');
  if (!content) throw new Error('DeepSeek retornou conteúdo vazio no reparo de Grammar.');
  return parseJson(content);
}

export async function repairGrammarWithDeepSeek(lesson, { fetcher = fetch } = {}) {
  if (String(lesson?.type || '').toLowerCase() !== 'grammar') return { applied: false, lesson, reason: 'not-grammar' };
  const policy = EXTERNAL_PROVIDER_POLICY.deepseek;
  const key = readLocalText(policy.keyStorage);
  const model = readLocalText(policy.modelStorage) || policy.defaultModel;
  if (!key) return { applied: false, lesson, reason: 'deepseek-not-configured' };
  diagnostics.setPhase('DeepSeek reparando Grammar', 'generating');
  diagnostics.log(`DeepSeek Grammar Repair ativado com ${model} e key ${maskApiKey(key)}.`, 'warn');
  const data = await callDeepSeek({ prompt: buildPrompt(lesson), key, model, fetcher });
  const validated = validateRepair(data);
  if (!validated.approved) {
    diagnostics.log(`DeepSeek Grammar Repair não aprovou estrutura completa: ${validated.sections.length} seções, ${validated.exercises.length}/18 exercícios, ${validated.prompts.length}/5 prompts.`, 'warn', data);
    return { applied: false, lesson, reason: 'insufficient-valid-grammar-repair', raw: data };
  }
  const repairedLesson = {
    ...lesson, sections: validated.sections, exercises: validated.exercises, prompts: validated.prompts,
    grammarRepair: { provider: 'deepseek', model, appliedAt: new Date().toISOString(), sections: validated.sections.length, exercises: validated.exercises.length, prompts: validated.prompts.length, contract: 'deepseek-grammar-repair-v2-full-count' },
    planContract: `${lesson?.planContract || 'lesson-contract-v1'}+deepseek-grammar-repair-v2-full-count`,
  };
  diagnostics.log(`DeepSeek Grammar Repair aprovado: ${validated.sections.length} seções e ${validated.exercises.length} exercícios.`, 'success', repairedLesson.grammarRepair);
  return { applied: true, lesson: repairedLesson };
}
