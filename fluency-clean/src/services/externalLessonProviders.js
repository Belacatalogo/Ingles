import { diagnostics } from './diagnostics.js';
import { normalizeLesson } from './lessonTypes.js';
import { storage } from './storage.js';
import { maskApiKey } from './geminiLessons.js';
import { MODEL_POLICY_VERSION, getExternalProviderPolicy } from './modelPolicy.js';

const FORCE_EXTERNAL_NEXT_STORAGE = 'lesson.external.forceNext';
const FORCE_EXTERNAL_PROVIDER_STORAGE = 'lesson.external.forceProvider';
const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

function text(value) { return String(value ?? '').trim(); }
function readRawLocalStorage(name) { try { return text(window.localStorage.getItem(name) || ''); } catch { return ''; } }
function writeRawLocalStorage(name, value) { try { if (!value) window.localStorage.removeItem(name); else window.localStorage.setItem(name, value); } catch {} }
function readLocalText(name) { const appValue = text(storage.getText(name, '')); return appValue || readRawLocalStorage(name); }
function saveLocalText(name, value) { const normalized = text(value); if (!normalized) { storage.remove(name); writeRawLocalStorage(name, ''); return ''; } storage.setText(name, normalized); writeRawLocalStorage(name, normalized); return normalized; }
function clearLocalText(name) { storage.remove(name); writeRawLocalStorage(name, ''); }
function normalizeForcedProvider(value) { const provider = text(value).toLowerCase(); return provider === 'groq' || provider === 'cerebras' ? provider : ''; }

function stripCodeFence(value) { return text(value).replace(/^```(?:json)?\s*/i, '').replace(/```$/i, '').trim(); }
function sliceBalancedJsonObject(value) {
  const raw = stripCodeFence(value);
  const start = raw.indexOf('{');
  if (start < 0) return raw;
  let depth = 0; let inString = false; let escaped = false;
  for (let index = start; index < raw.length; index += 1) {
    const char = raw[index];
    if (escaped) { escaped = false; continue; }
    if (char === '\\') { escaped = true; continue; }
    if (char === '"') { inString = !inString; continue; }
    if (inString) continue;
    if (char === '{') depth += 1;
    if (char === '}') { depth -= 1; if (depth === 0) return raw.slice(start, index + 1); }
  }
  return raw.slice(start);
}
function repairJsonText(value) {
  let raw = sliceBalancedJsonObject(value)
    .replace(/[\u201C\u201D]/g, '"')
    .replace(/[\u2018\u2019]/g, "'")
    .replace(/,\s*([}\]])/g, '$1')
    .replace(/\n\s*\n/g, '\n');
  const openBraces = (raw.match(/{/g) || []).length;
  const closeBraces = (raw.match(/}/g) || []).length;
  const openBrackets = (raw.match(/\[/g) || []).length;
  const closeBrackets = (raw.match(/\]/g) || []).length;
  if (closeBrackets < openBrackets) raw += ']'.repeat(openBrackets - closeBrackets);
  if (closeBraces < openBraces) raw += '}'.repeat(openBraces - closeBraces);
  return raw;
}
function jsonFromText(value) {
  const raw = repairJsonText(value);
  try { return JSON.parse(raw); } catch {
    const repaired = raw.replace(/\}\s*\{/g, '},{').replace(/"\s*\n\s*"/g, '" "').replace(/([\[{,])\s*([A-Za-z0-9_]+)\s*:/g, '$1"$2":');
    try { return JSON.parse(repaired); } catch (secondError) { throw new Error(`JSON Parse error: ${secondError?.message || secondError}. Preview: ${raw.slice(0, 220)}`); }
  }
}

function providersFromLocalStorage(targetProvider = '') {
  const policy = getExternalProviderPolicy();
  const forced = normalizeForcedProvider(targetProvider);
  const groqSecret = readLocalText(policy.groq.keyStorage);
  const cerebrasSecret = readLocalText(policy.cerebras.keyStorage);
  const providers = [
    groqSecret ? { id: 'groq', label: 'Groq', secret: groqSecret, masked: maskApiKey(groqSecret), url: 'https://api.groq.com/openai/v1/chat/completions', model: readLocalText(policy.groq.modelStorage) || policy.groq.defaultModel } : null,
    cerebrasSecret ? { id: 'cerebras', label: 'Cerebras', secret: cerebrasSecret, masked: maskApiKey(cerebrasSecret), url: 'https://api.cerebras.ai/v1/chat/completions', model: readLocalText(policy.cerebras.modelStorage) || policy.cerebras.defaultModel } : null,
  ].filter(Boolean);
  return forced ? providers.filter((provider) => provider.id === forced) : providers;
}

function buildPrompt({ prompt = '', forcedType = '', level = 'A1', forceVariation = false } = {}) {
  const grammar = /grammar|gram[aá]tica|to be|to have|present simple|verb/i.test(`${prompt} ${forcedType}`);
  if (grammar) {
    return [
      'Responda somente com JSON valido, sem markdown e sem texto fora do JSON.',
      'Gere SOMENTE O ESQUELETO de uma aula Grammar do Fluency. A profundidade será gerada depois por sections 1B.',
      'Não escreva conteúdo longo agora. Não tente completar a aula inteira agora.',
      `Nivel esperado: ${level || 'A1'}.`,
      'Campos obrigatórios: type, level, title, intro, objective, focus, sections, tips, listeningText, vocabulary, exercises, prompts.',
      'type deve ser "grammar".',
      'sections deve ter EXATAMENTE 7 objetos, cada um com title e content.',
      'Cada section.content deve ser uma frase curta descrevendo o objetivo daquela seção, não uma explicação completa.',
      'Use estes títulos ou equivalentes: visão geral, quando usar, forma afirmativa to be, forma afirmativa to have, forma negativa, perguntas, erros comuns e produção.',
      'vocabulary pode ter 8 itens curtos. exercises pode ter 8 itens simples. prompts pode ter 4 itens.',
      forceVariation ? 'Modo substituicao ativo: criar versão diferente sem copiar aula anterior.' : '',
      'Pedido original:',
      String(prompt || 'Gerar aula Grammar A1 completa.'),
    ].filter(Boolean).join('\n');
  }
  return [
    'Responda somente com JSON valido, sem markdown e sem texto fora do JSON.',
    'Gere uma aula completa do Fluency para estudante brasileiro de ingles.',
    forcedType ? `Tipo travado: ${forcedType}.` : 'Inferir tipo sem mudar o objetivo.',
    `Nivel esperado: ${level || 'A1'}.`,
    'Campos obrigatorios: type, level, title, intro, objective, focus, sections, tips, listeningText, vocabulary, exercises, prompts.',
    'sections: 5 a 8 itens com title e content.',
    'vocabulary: 10 a 14 itens com word, meaning e example.',
    'exercises: 12 a 18 itens com question, options, answer e explanation.',
    'prompts: 4 a 6 comandos de producao propria.',
    'Pedido original:', prompt || 'Gerar aula A1 completa.',
  ].filter(Boolean).join('\n');
}

function retryAfterFromResponse(response, fallbackSeconds = 8) {
  const raw = response?.headers?.get?.('retry-after') || '';
  const parsed = Number(raw);
  return Number.isFinite(parsed) && parsed > 0 ? Math.min(Math.max(parsed, 2), 30) : fallbackSeconds;
}
async function callProviderOnce(provider, prompt, fetcher, strictJson = true, maxTokens = 8192) {
  const headers = { 'content-type': 'application/json', Authorization: ['Bearer', provider.secret].join(' ') };
  const body = {
    model: provider.model,
    messages: [{ role: 'system', content: 'Voce gera apenas JSON valido. O primeiro caractere deve ser { e o ultimo deve ser }.' }, { role: 'user', content: prompt }],
    temperature: 0.16,
    max_completion_tokens: maxTokens,
  };
  if (strictJson) body.response_format = { type: 'json_object' };
  const response = await fetcher(provider.url, { method: 'POST', headers, body: JSON.stringify(body) });
  if (!response?.ok) {
    const errorText = await response?.text?.().catch(() => '') || '';
    const error = new Error(`HTTP ${response?.status || 0} ${errorText.slice(0, 260)}`);
    error.status = response?.status || 0;
    error.retryAfterSeconds = retryAfterFromResponse(response);
    throw error;
  }
  const data = await response.json();
  const content = text(data?.choices?.[0]?.message?.content || data?.choices?.[0]?.text || '');
  if (!content) throw new Error(`${provider.label} retornou conteudo vazio.`);
  return jsonFromText(content);
}
async function callProvider(provider, prompt, fetcher, strictJson = true, maxTokens = 8192) {
  const maxAttempts = provider.id === 'groq' ? 2 : 2;
  let lastError = null;
  for (let attempt = 1; attempt <= maxAttempts; attempt += 1) {
    try { return await callProviderOnce(provider, prompt, fetcher, strictJson, maxTokens); }
    catch (error) {
      lastError = error;
      if (Number(error?.status || 0) === 429 && attempt < maxAttempts) {
        const waitSeconds = Number(error.retryAfterSeconds || 10) + attempt;
        diagnostics.log(`${provider.label} atingiu rate limit. Aguardando ${waitSeconds}s e retomando a mesma chamada (${attempt + 1}/${maxAttempts}).`, 'warn');
        await sleep(waitSeconds * 1000);
        continue;
      }
      if (/Load failed|NetworkError|Failed to fetch/i.test(String(error?.message || error)) && attempt < maxAttempts) {
        diagnostics.log(`${provider.label} teve falha de rede. Aguardando 4s e tentando novamente (${attempt + 1}/${maxAttempts}).`, 'warn');
        await sleep(4000);
        continue;
      }
      throw error;
    }
  }
  throw lastError || new Error(`${provider.label} falhou.`);
}
async function callProviderWithFallback(provider, prompt, fetcher, maxTokens = 8192) {
  try { return await callProvider(provider, prompt, fetcher, true, maxTokens); }
  catch (error) {
    if (Number(error?.status || 0) === 400 || /response_format|json_object|max_completion_tokens|JSON Parse error/i.test(String(error?.message || error))) {
      diagnostics.log(`${provider.label} rejeitou JSON mode ou devolveu JSON quebrado. Tentando chamada simples mais curta.`, 'warn');
      return callProvider(provider, prompt, fetcher, false, Math.min(maxTokens, 4200));
    }
    throw error;
  }
}

function ensureGrammarSkeleton(rawLesson, provider) {
  const lesson = normalizeLesson(rawLesson);
  const isGrammar = String(lesson.type || '').toLowerCase() === 'grammar' || /grammar|to be|to have|present simple|verb/i.test(lesson.title || '');
  if (!isGrammar) return lesson;
  const fallbackSections = [
    'Visão geral: to be e to have',
    'Quando usar to be e quando usar to have',
    'Forma afirmativa com to be',
    'Forma afirmativa com to have',
    'Forma negativa',
    'Perguntas com to be e to have',
    'Erros comuns e produção própria',
  ].map((title) => ({ title, content: `Objetivo desta seção: ${title}.` }));
  const sections = Array.isArray(lesson.sections) && lesson.sections.length >= 3 ? lesson.sections : fallbackSections;
  if (!Array.isArray(lesson.sections) || lesson.sections.length < 3) {
    diagnostics.log(`${provider.label} gerou esqueleto sem sections suficientes. Aplicando esqueleto Grammar local para permitir 1B puro.`, 'warn');
  }
  return { ...lesson, type: 'grammar', sections: sections.slice(0, 7) };
}
function withMeta(rawLesson, provider) {
  const lesson = ensureGrammarSkeleton(rawLesson, provider);
  return { ...lesson, providerFallback: { enabled: true, provider: provider.id, model: provider.model, policy: MODEL_POLICY_VERSION, generatedAt: new Date().toISOString() }, planContract: `external-provider-${provider.id}-fallback-v1` };
}

export function getExternalLessonProviderStatus() {
  const policy = getExternalProviderPolicy();
  const groqKey = readLocalText(policy.groq.keyStorage);
  const cerebrasKey = readLocalText(policy.cerebras.keyStorage);
  const groqModel = readLocalText(policy.groq.modelStorage) || policy.groq.defaultModel;
  const cerebrasModel = readLocalText(policy.cerebras.modelStorage) || policy.cerebras.defaultModel;
  const forceExternalNext = Boolean(storage.get(FORCE_EXTERNAL_NEXT_STORAGE, false)) || readRawLocalStorage(FORCE_EXTERNAL_NEXT_STORAGE) === 'true';
  const forceProvider = normalizeForcedProvider(readLocalText(FORCE_EXTERNAL_PROVIDER_STORAGE));
  const providers = providersFromLocalStorage(forceProvider);
  return { enabled: providersFromLocalStorage().length > 0, forceExternalNext, forceProvider, groq: { configured: Boolean(groqKey), masked: maskApiKey(groqKey), model: groqModel, defaultModel: policy.groq.defaultModel }, cerebras: { configured: Boolean(cerebrasKey), masked: maskApiKey(cerebrasKey), model: cerebrasModel, defaultModel: policy.cerebras.defaultModel }, providers: providers.map((provider) => ({ id: provider.id, label: provider.label, model: provider.model, masked: provider.masked })) };
}
export function setForceExternalLessonProviderNext(value, provider = '') { const enabled = Boolean(value); const forcedProvider = normalizeForcedProvider(provider); storage.set(FORCE_EXTERNAL_NEXT_STORAGE, enabled); writeRawLocalStorage(FORCE_EXTERNAL_NEXT_STORAGE, enabled ? 'true' : ''); saveLocalText(FORCE_EXTERNAL_PROVIDER_STORAGE, enabled ? forcedProvider : ''); diagnostics.log(`Modo teste fallback externo ${enabled ? `ativado para a próxima geração${forcedProvider ? ` usando ${forcedProvider}` : ''}` : 'desativado'}.`, enabled ? 'warn' : 'info'); return getExternalLessonProviderStatus(); }
export function shouldForceExternalLessonProviderOnce() { const status = getExternalLessonProviderStatus(); if (status.forceExternalNext) setForceExternalLessonProviderNext(false); return status.forceExternalNext ? status.forceProvider || 'external' : ''; }
export function saveExternalLessonProviderKey(provider, keyValue, modelValue = '') { const policy = getExternalProviderPolicy(); const providerId = String(provider || '').toLowerCase(); const current = policy[providerId]; if (!current) return getExternalLessonProviderStatus(); const savedKey = saveLocalText(current.keyStorage, keyValue); if (modelValue) saveLocalText(current.modelStorage, modelValue); diagnostics.log(`${providerId} fallback de aulas ${savedKey ? `salvo: ${maskApiKey(savedKey)}` : 'removido ou vazio'}.`, savedKey ? 'info' : 'warn'); return getExternalLessonProviderStatus(); }
export function saveExternalLessonProviderModel(provider, modelValue) { const policy = getExternalProviderPolicy(); const providerId = String(provider || '').toLowerCase(); const current = policy[providerId]; if (!current) return getExternalLessonProviderStatus(); const savedModel = saveLocalText(current.modelStorage, modelValue || current.defaultModel); diagnostics.log(`${providerId} fallback de aulas usando modelo ${savedModel || current.defaultModel}.`, 'info'); return getExternalLessonProviderStatus(); }
export function clearExternalLessonProvider(provider) { const policy = getExternalProviderPolicy(); const providerId = String(provider || '').toLowerCase(); const current = policy[providerId]; if (!current) return getExternalLessonProviderStatus(); clearLocalText(current.keyStorage); diagnostics.log(`${providerId} fallback de aulas removido.`, 'info'); return getExternalLessonProviderStatus(); }

export async function generateExternalLessonDraft({ prompt = '', forcedType = '', level = 'A1', fetcher = fetch, forceVariation = false, reason = '', targetProvider = '' } = {}) {
  const providers = providersFromLocalStorage(targetProvider);
  const forced = normalizeForcedProvider(targetProvider);
  if (!providers.length) { const msg = forced ? `Nenhuma chave configurada para ${forced}.` : 'Nenhuma chave externa configurada.'; diagnostics.log(`Fallback externo indisponivel: ${msg}`, 'info'); return { status: 'missing-keys', lesson: null, error: msg }; }
  const externalPrompt = buildPrompt({ prompt, forcedType, level, forceVariation });
  diagnostics.setPhase('fallback externo de aula', 'generating');
  diagnostics.log(`Fallback externo ativado${reason ? `: ${reason}` : ''}. Provedores: ${providers.map((provider) => `${provider.label}/${provider.model}`).join(' -> ')}.`, 'warn');
  let lastError = null;
  for (const provider of providers) {
    try {
      diagnostics.log(`Tentando ${provider.label} com modelo ${provider.model} e chave ${provider.masked}.`, 'info');
      const lesson = await callProviderWithFallback(provider, externalPrompt, fetcher, /grammar|gram[aá]tica|to be|to have|present simple|verb/i.test(`${prompt} ${forcedType}`) ? 2600 : 5200);
      diagnostics.log(`${provider.label} gerou aula para validacao local.`, 'success');
      return { status: 'success', lesson: withMeta(lesson, provider), provider: provider.id, model: provider.model };
    } catch (error) { lastError = error; diagnostics.log(`${provider.label} falhou: ${error?.message || error}`, 'warn'); }
  }
  return { status: 'error', lesson: null, error: lastError?.message || 'Falha nos provedores externos.' };
}

export async function generateExternalGrammarSection({ prompt = '', targetProvider = '', fetcher = fetch } = {}) {
  const providers = providersFromLocalStorage(targetProvider);
  const forced = normalizeForcedProvider(targetProvider);
  if (!forced) return { status: 'not-forced', section: null, error: 'Nenhum provedor externo específico solicitado.' };
  if (!providers.length) return { status: 'missing-keys', section: null, error: `Nenhuma chave configurada para ${forced}.` };
  let lastError = null;
  for (const provider of providers) {
    try {
      diagnostics.log(`Grammar 1B externo: tentando ${provider.label}/${provider.model} com chave ${provider.masked}.`, 'info');
      const sectionPrompt = [prompt, '', 'LEMBRETE FINAL: retorne um único objeto JSON simples: {"title":"...","content":"..."}. Não use arrays. Não use markdown. Feche o JSON.'].join('\n');
      const section = await callProviderWithFallback(provider, sectionPrompt, fetcher, provider.id === 'cerebras' ? 2200 : 3000);
      return { status: 'success', section, provider: provider.id, model: provider.model };
    } catch (error) { lastError = error; diagnostics.log(`Grammar 1B externo falhou em ${provider.label}: ${error?.message || error}`, 'warn'); }
  }
  return { status: 'error', section: null, error: lastError?.message || `Falha ao gerar section com ${forced}.` };
}
