import { diagnostics } from './diagnostics.js';
import { maskApiKey, normalizeLessonKeys } from './geminiLessons.js';
import { generateExternalGrammarSection } from './externalLessonProviders.js';

export const GRAMMAR_SECTION_CONTRACT = 'grammar-section-sequential-v1';

const SECTION_EXAMPLE = {
  title: 'Forma afirmativa com to be',
  content: 'Agora vamos olhar para a forma afirmativa como um professor olharia com você, passo por passo. Em português, dizemos eu sou, ela é e nós somos, mas em inglês não basta traduzir palavra por palavra. O inglês usa uma forma fixa do verbo to be para cada pessoa: I am, you are, he is, she is, it is, we are e they are. Esse contraste com o português é importante porque muitos alunos brasileiros tentam dizer I is ou she are quando pensam apenas no significado. O erro típico A1 brasileiro é escolher o verbo pelo som da frase em português, não pelo sujeito em inglês. Veja: I am a student está correto porque I combina com am. She is my friend está correto porque she combina com is. They are at home está correto porque they combina com are. A frase I is happy está errada porque I nunca combina com is. Pense assim: primeiro identifique o sujeito, depois escolha a forma do verbo, e só depois complete a ideia. Essa ordem evita chute e cria domínio real.',
};

const SECTION_MODELS = ['gemini-2.5-flash', 'gemini-2.5-flash-lite'];
const MIN_SECTION_WORDS = 180;
const EXTERNAL_SECTION_TARGET_MIN = 220;
const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

function text(value) {
  return String(value ?? '').trim();
}

function countWords(value) {
  return text(value).split(/\s+/).filter(Boolean).length;
}

function normalizeExternalProvider(value) {
  const provider = text(value).toLowerCase();
  return provider === 'groq' || provider === 'cerebras' ? provider : '';
}

function extractTextFromGemini(data) {
  const parts = data?.candidates?.[0]?.content?.parts;
  if (!Array.isArray(parts)) return '';
  return parts.map((part) => part?.text ?? '').join('\n').trim();
}

function extractJsonObjectText(value) {
  const clean = text(value).replace(/^```(?:json)?\s*/i, '').replace(/```$/i, '').trim();
  const start = clean.indexOf('{');
  const end = clean.lastIndexOf('}');
  return start >= 0 && end > start ? clean.slice(start, end + 1) : clean;
}

function parseSectionJson(value) {
  const jsonText = extractJsonObjectText(value);
  try {
    return JSON.parse(jsonText);
  } catch (firstError) {
    const repaired = jsonText.replace(/,\s*([}\]])/g, '$1').replace(/\\'/g, "'");
    try {
      return JSON.parse(repaired);
    } catch (secondError) {
      throw new Error(`Section JSON inválido: ${secondError?.message || secondError}. Preview: ${jsonText.slice(0, 160)}`);
    }
  }
}

function normalizeGeneratedSection(parsed) {
  const title = text(parsed?.title);
  const content = text(parsed?.content);
  if (!title || !content) throw new Error('Section veio sem title/content.');
  if (countWords(content) < MIN_SECTION_WORDS) throw new Error(`Section curta demais: ${countWords(content)}/${MIN_SECTION_WORDS} palavras.`);
  if (!/portugu[eê]s|no Brasil|brasileir|traduz|contraste/i.test(content)) throw new Error('Section sem contraste explícito com português brasileiro.');
  if (!/erro|errado|confus|típico|tipico/i.test(content)) throw new Error('Section sem erro típico A1 brasileiro.');
  return { title, content, sectionContract: GRAMMAR_SECTION_CONTRACT, wordCount: countWords(content) };
}

function isGrammarLesson(lesson) {
  return String(lesson?.type || '').toLowerCase() === 'grammar';
}

function hasDeepEnoughSections(lesson) {
  const sections = Array.isArray(lesson?.sections) ? lesson.sections : [];
  if (!sections.length) return false;
  return sections.every((section) => countWords(section?.content) >= MIN_SECTION_WORDS && /portugu[eê]s|no Brasil|brasileir|traduz|contraste/i.test(section?.content || '') && /erro|errado|confus|típico|tipico/i.test(section?.content || ''));
}

function buildAttempts({ keys = [], proKey = '' } = {}) {
  const lessonKeys = normalizeLessonKeys(keys);
  const paidKey = normalizeLessonKeys([proKey])[0] || '';
  const attempts = [];
  for (const key of lessonKeys) {
    for (const model of SECTION_MODELS) attempts.push({ key, model, paid: false, masked: maskApiKey(key) });
  }
  if (paidKey) attempts.push({ key: paidKey, model: 'gemini-2.5-pro', paid: true, masked: maskApiKey(paidKey) });
  return attempts;
}

function buildPreviousContext(previousSections, compact = false) {
  if (!Array.isArray(previousSections) || !previousSections.length) return '';
  const limit = compact ? 160 : 900;
  return previousSections.map((item, itemIndex) => `${itemIndex + 1}. ${item.title}: ${String(item.content || '').slice(0, limit)}`).join('\n\n');
}

function buildSectionPrompt({ lesson, section, index, previousSections, compactExternal = false, expansionOf = null }) {
  const previous = buildPreviousContext(previousSections, compactExternal);
  const example = compactExternal
    ? { title: SECTION_EXAMPLE.title, content: SECTION_EXAMPLE.content.slice(0, 620) }
    : SECTION_EXAMPLE;
  return [
    'Você é um professor particular de inglês do Fluency escrevendo UMA seção de uma aula Grammar profunda.',
    'Retorne SOMENTE JSON válido com as chaves title e content.',
    'Não use markdown, não use listas numeradas longas, não escreva fora do JSON.',
    expansionOf ? 'A tentativa anterior ficou curta. Reescreva a mesma seção com mais profundidade real, sem enrolação, aumentando exemplos e explicações.' : '',
    '',
    'CONTRATO DA SECTION:',
    `- content deve ter no mínimo ${MIN_SECTION_WORDS} palavras reais. Para provedor externo, mire entre 240 e 280 palavras e nunca pare perto do mínimo.`,
    '- content deve ensinar com progressão didática real: ideia central, explicação, exemplos, motivo dos exemplos, erro típico e mini-checagem.',
    '- incluir pelo menos 1 contraste explícito com português brasileiro.',
    '- incluir pelo menos 1 erro típico de aluno brasileiro A1 e explicar por que está errado.',
    '- incluir exemplos inéditos, contextualizados e explicar por que estão corretos.',
    '- manter inglês A1 nos exemplos e explicação principal em português claro.',
    '- não revele respostas dos exercícios.',
    '',
    'EXEMPLO DE QUALIDADE ESPERADA:',
    JSON.stringify(example, null, 2),
    '',
    'AULA:',
    JSON.stringify({ title: lesson.title, level: lesson.level, objective: lesson.objective, focus: lesson.focus, intro: compactExternal ? String(lesson.intro || '').slice(0, 220) : lesson.intro }, null, 2),
    '',
    previous ? 'SEÇÕES ANTERIORES PARA CONTEXTO E PROGRESSÃO:' : '',
    previous,
    '',
    expansionOf ? 'VERSÃO CURTA ANTERIOR QUE DEVE SER EXPANDIDA:' : '',
    expansionOf ? JSON.stringify(expansionOf, null, 2) : '',
    '',
    `SEÇÃO ${index + 1} A REESCREVER:`,
    JSON.stringify({ title: section?.title || `Parte ${index + 1}`, currentContent: section?.content || '' }, null, 2),
  ].filter(Boolean).join('\n');
}

async function callGeminiSection({ attempt, prompt, fetcher }) {
  const url = `https://generativelanguage.googleapis.com/v1beta/models/${encodeURIComponent(attempt.model)}:generateContent?key=${encodeURIComponent(attempt.key)}`;
  const body = {
    contents: [{ role: 'user', parts: [{ text: prompt }] }],
    generationConfig: { temperature: 0.22, maxOutputTokens: attempt.paid ? 4200 : 3400, responseMimeType: 'application/json' },
  };
  const response = await fetcher(url, { method: 'POST', headers: { 'content-type': 'application/json' }, body: JSON.stringify(body) });
  if (!response?.ok) {
    const errorText = await response?.text?.().catch(() => '') || '';
    throw new Error(`HTTP ${response?.status || 0} ${errorText.slice(0, 160)}`);
  }
  const data = await response.json();
  return normalizeGeneratedSection(parseSectionJson(extractTextFromGemini(data)));
}

async function expandExternalSection({ lesson, section, index, previousSections, fetcher, externalProvider, originalSection }) {
  diagnostics.log(`Section ${index + 1} veio curta em ${externalProvider}: ${countWords(originalSection?.content)}/${EXTERNAL_SECTION_TARGET_MIN}. Pedindo expansão preventiva ao mesmo provedor.`, 'warn');
  await sleep(externalProvider === 'groq' ? 9500 : 2600);
  const expansionPrompt = buildSectionPrompt({ lesson, section, index, previousSections, compactExternal: true, expansionOf: originalSection });
  const expanded = await generateExternalGrammarSection({ prompt: expansionPrompt, targetProvider: externalProvider, fetcher });
  if (expanded?.status === 'success' && expanded.section) return expanded;
  throw new Error(expanded?.error || `Section ${index + 1} continuou curta em ${externalProvider}.`);
}

async function generateOneExternalSection({ lesson, section, index, previousSections, fetcher, externalProvider }) {
  const pause = externalProvider === 'groq' ? 9000 : 2200;
  if (index > 0) {
    diagnostics.log(`Aguardando ${Math.round(pause / 1000)}s antes da próxima section ${externalProvider} para reduzir limite/JSON quebrado.`, 'info');
    await sleep(pause);
  }

  const prompt = buildSectionPrompt({ lesson, section, index, previousSections, compactExternal: true });
  diagnostics.log(`Grammar 1B section ${index + 1}: usando provedor externo puro ${externalProvider}.`, 'warn');
  const result = await generateExternalGrammarSection({ prompt, targetProvider: externalProvider, fetcher });
  if (result?.status !== 'success' || !result.section) {
    throw new Error(result?.error || `Falha ao gerar section ${index + 1} com ${externalProvider}.`);
  }

  let candidate = result;
  const firstWords = countWords(candidate.section?.content);
  if (firstWords > 0 && firstWords < EXTERNAL_SECTION_TARGET_MIN) {
    candidate = await expandExternalSection({ lesson, section, index, previousSections, fetcher, externalProvider, originalSection: candidate.section });
  }

  try {
    const normalized = normalizeGeneratedSection(candidate.section);
    return { ...normalized, sectionProvider: candidate.provider, sectionModel: candidate.model };
  } catch (error) {
    const words = countWords(candidate.section?.content);
    if (words > 0 && words < MIN_SECTION_WORDS && candidate === result) {
      const expanded = await expandExternalSection({ lesson, section, index, previousSections, fetcher, externalProvider, originalSection: candidate.section });
      const normalizedExpanded = normalizeGeneratedSection(expanded.section);
      return { ...normalizedExpanded, sectionProvider: expanded.provider, sectionModel: expanded.model };
    }
    throw error;
  }
}

async function generateOneGeminiSection({ lesson, section, index, previousSections, attempts, fetcher }) {
  const prompt = buildSectionPrompt({ lesson, section, index, previousSections });
  let lastError = null;
  for (const attempt of attempts) {
    try {
      diagnostics.log(`Grammar 1B section ${index + 1}: tentando ${attempt.model} com key ${attempt.masked}.`, 'info');
      return await callGeminiSection({ attempt, prompt, fetcher });
    } catch (error) {
      lastError = error;
      diagnostics.log(`Grammar 1B section ${index + 1} falhou em ${attempt.model}: ${error?.message || error}`, 'warn');
    }
  }
  throw lastError || new Error(`Falha ao gerar section ${index + 1}.`);
}

export async function enrichGrammarSectionsSequentially({ lesson, keys = [], proKey = '', fetcher = fetch, externalProvider = '' } = {}) {
  if (!isGrammarLesson(lesson)) return { lesson, applied: false, reason: 'not-grammar' };
  if (hasDeepEnoughSections(lesson)) return { lesson, applied: false, reason: 'already-deep' };
  const forcedExternalProvider = normalizeExternalProvider(externalProvider);
  const attempts = forcedExternalProvider ? [] : buildAttempts({ keys, proKey });
  if (!forcedExternalProvider && !attempts.length) return { lesson, applied: false, reason: 'missing-keys' };

  const sections = Array.isArray(lesson.sections) ? lesson.sections : [];
  if (!sections.length) return { lesson, applied: false, reason: 'missing-sections' };

  diagnostics.setPhase('grammar bloco 1B por seção', 'generating');
  diagnostics.log(`Cirurgia 2 Grammar ativa: reescrevendo ${sections.length} section(s) uma por uma com mínimo de ${MIN_SECTION_WORDS} palavras${forcedExternalProvider ? ` usando ${forcedExternalProvider} em todo o 1B` : ''}.`, 'warn');

  const enriched = [];
  for (let index = 0; index < sections.length; index += 1) {
    const newSection = forcedExternalProvider
      ? await generateOneExternalSection({ lesson, section: sections[index], index, previousSections: enriched, fetcher, externalProvider: forcedExternalProvider })
      : await generateOneGeminiSection({ lesson, section: sections[index], index, previousSections: enriched, attempts, fetcher });
    enriched.push(newSection);
    diagnostics.log(`Grammar section ${index + 1} aprovada: ${newSection.wordCount} palavras${newSection.sectionProvider ? ` · ${newSection.sectionProvider}/${newSection.sectionModel}` : ''}.`, 'success');
  }

  return {
    lesson: {
      ...lesson,
      sections: enriched,
      grammarSectionContract: forcedExternalProvider ? `${GRAMMAR_SECTION_CONTRACT}-${forcedExternalProvider}` : GRAMMAR_SECTION_CONTRACT,
      planContract: lesson.planContract ? `${lesson.planContract}+${GRAMMAR_SECTION_CONTRACT}${forcedExternalProvider ? `-${forcedExternalProvider}` : ''}` : `${GRAMMAR_SECTION_CONTRACT}${forcedExternalProvider ? `-${forcedExternalProvider}` : ''}`,
    },
    applied: true,
    reason: forcedExternalProvider ? `sections-enriched-${forcedExternalProvider}` : 'sections-enriched',
  };
}
