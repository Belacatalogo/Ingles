import { diagnostics } from './diagnostics.js';
import { normalizeLesson } from './lessonTypes.js';
import { storage } from './storage.js';
import { maskApiKey } from './geminiLessons.js';
import { MODEL_POLICY_VERSION, getExternalProviderPolicy } from './modelPolicy.js';

const FORCE_EXTERNAL_NEXT_STORAGE = 'lesson.external.forceNext';
const FORCE_EXTERNAL_PROVIDER_STORAGE = 'lesson.external.forceProvider';

function text(value) {
  return String(value ?? '').trim();
}

function readRawLocalStorage(name) {
  try {
    return text(window.localStorage.getItem(name) || '');
  } catch {
    return '';
  }
}

function writeRawLocalStorage(name, value) {
  try {
    if (!value) window.localStorage.removeItem(name);
    else window.localStorage.setItem(name, value);
  } catch {
    // localStorage raw is only a compatibility mirror. App storage remains primary.
  }
}

function readLocalText(name) {
  const appValue = text(storage.getText(name, ''));
  if (appValue) return appValue;
  return readRawLocalStorage(name);
}

function saveLocalText(name, value) {
  const normalized = text(value);
  if (!normalized) {
    storage.remove(name);
    writeRawLocalStorage(name, '');
    return '';
  }
  storage.setText(name, normalized);
  writeRawLocalStorage(name, normalized);
  return normalized;
}

function clearLocalText(name) {
  storage.remove(name);
  writeRawLocalStorage(name, '');
}

function normalizeForcedProvider(value) {
  const provider = text(value).toLowerCase();
  return provider === 'groq' || provider === 'cerebras' ? provider : '';
}

function jsonFromText(value) {
  const raw = text(value).replace(/^```(?:json)?\s*/i, '').replace(/```$/i, '').trim();
  const start = raw.indexOf('{');
  const end = raw.lastIndexOf('}');
  const sliced = start >= 0 && end > start ? raw.slice(start, end + 1) : raw;
  return JSON.parse(sliced.replace(/,\s*([}\]])/g, '$1'));
}

function providersFromLocalStorage(targetProvider = '') {
  const policy = getExternalProviderPolicy();
  const forced = normalizeForcedProvider(targetProvider);
  const groqSecret = readLocalText(policy.groq.keyStorage);
  const cerebrasSecret = readLocalText(policy.cerebras.keyStorage);
  const providers = [
    groqSecret ? {
      id: 'groq',
      label: 'Groq',
      secret: groqSecret,
      masked: maskApiKey(groqSecret),
      url: 'https://api.groq.com/openai/v1/chat/completions',
      model: readLocalText(policy.groq.modelStorage) || policy.groq.defaultModel,
    } : null,
    cerebrasSecret ? {
      id: 'cerebras',
      label: 'Cerebras',
      secret: cerebrasSecret,
      masked: maskApiKey(cerebrasSecret),
      url: 'https://api.cerebras.ai/v1/chat/completions',
      model: readLocalText(policy.cerebras.modelStorage) || policy.cerebras.defaultModel,
    } : null,
  ].filter(Boolean);
  return forced ? providers.filter((provider) => provider.id === forced) : providers;
}

function buildPrompt({ prompt = '', forcedType = '', level = 'A1', forceVariation = false } = {}) {
  return [
    'Responda somente com JSON valido, sem markdown e sem texto fora do JSON.',
    'Gere uma aula completa do Fluency para estudante brasileiro de ingles.',
    forcedType ? `Tipo travado: ${forcedType}.` : 'Inferir tipo sem mudar o objetivo.',
    `Nivel esperado: ${level || 'A1'}.`,
    'Campos obrigatorios: type, level, title, intro, objective, focus, sections, tips, listeningText, vocabulary, exercises, prompts.',
    'sections: 7 a 10 itens com title e content.',
    'vocabulary: 12 a 18 itens com word, meaning e example.',
    'exercises: 16 a 22 itens com question, options, answer e explanation.',
    'prompts: 5 a 8 comandos de producao propria.',
    'A aula deve ser longa, clara, profunda, organizada e nao pode revelar respostas antes da pratica.',
    'Para grammar, incluir analogia, regra em camadas, afirmativa, negativa, perguntas, certo vs errado, microdialogo, erros comuns, checagem mental e producao propria.',
    forceVariation ? 'Modo substituicao ativo: criar versao diferente sem copiar aula anterior.' : '',
    'Pedido original:',
    String(prompt || 'Gerar aula A1 completa.'),
  ].filter(Boolean).join('\n');
}

async function callProvider(provider, prompt, fetcher, strictJson = true, maxTokens = 8192) {
  const headers = { 'content-type': 'application/json' };
  headers.Authorization = ['Bearer', provider.secret].join(' ');
  const body = {
    model: provider.model,
    messages: [
      { role: 'system', content: 'Voce gera apenas JSON valido.' },
      { role: 'user', content: prompt },
    ],
    temperature: 0.25,
    max_completion_tokens: maxTokens,
  };
  if (strictJson) body.response_format = { type: 'json_object' };
  const response = await fetcher(provider.url, { method: 'POST', headers, body: JSON.stringify(body) });
  if (!response?.ok) {
    const errorText = await response?.text?.().catch(() => '') || '';
    const error = new Error(`HTTP ${response?.status || 0} ${errorText.slice(0, 180)}`);
    error.status = response?.status || 0;
    throw error;
  }
  const data = await response.json();
  const content = text(data?.choices?.[0]?.message?.content || data?.choices?.[0]?.text || '');
  if (!content) throw new Error(`${provider.label} retornou conteudo vazio.`);
  return jsonFromText(content);
}

async function callProviderWithFallback(provider, prompt, fetcher, maxTokens = 8192) {
  try {
    return await callProvider(provider, prompt, fetcher, true, maxTokens);
  } catch (error) {
    if (Number(error?.status || 0) === 400 || /response_format|json_object|max_completion_tokens/i.test(String(error?.message || error))) {
      diagnostics.log(`${provider.label} rejeitou JSON mode. Tentando chamada simples.`, 'warn');
      return callProvider(provider, prompt, fetcher, false, maxTokens);
    }
    throw error;
  }
}

function withMeta(rawLesson, provider) {
  const lesson = normalizeLesson(rawLesson);
  return {
    ...lesson,
    providerFallback: {
      enabled: true,
      provider: provider.id,
      model: provider.model,
      policy: MODEL_POLICY_VERSION,
      generatedAt: new Date().toISOString(),
    },
    planContract: `external-provider-${provider.id}-fallback-v1`,
  };
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
  return {
    enabled: providersFromLocalStorage().length > 0,
    forceExternalNext,
    forceProvider,
    groq: {
      configured: Boolean(groqKey),
      masked: maskApiKey(groqKey),
      model: groqModel,
      defaultModel: policy.groq.defaultModel,
    },
    cerebras: {
      configured: Boolean(cerebrasKey),
      masked: maskApiKey(cerebrasKey),
      model: cerebrasModel,
      defaultModel: policy.cerebras.defaultModel,
    },
    providers: providers.map((provider) => ({ id: provider.id, label: provider.label, model: provider.model, masked: provider.masked })),
  };
}

export function setForceExternalLessonProviderNext(value, provider = '') {
  const enabled = Boolean(value);
  const forcedProvider = normalizeForcedProvider(provider);
  storage.set(FORCE_EXTERNAL_NEXT_STORAGE, enabled);
  writeRawLocalStorage(FORCE_EXTERNAL_NEXT_STORAGE, enabled ? 'true' : '');
  saveLocalText(FORCE_EXTERNAL_PROVIDER_STORAGE, enabled ? forcedProvider : '');
  diagnostics.log(`Modo teste fallback externo ${enabled ? `ativado para a próxima geração${forcedProvider ? ` usando ${forcedProvider}` : ''}` : 'desativado'}.`, enabled ? 'warn' : 'info');
  return getExternalLessonProviderStatus();
}

export function shouldForceExternalLessonProviderOnce() {
  const status = getExternalLessonProviderStatus();
  if (status.forceExternalNext) setForceExternalLessonProviderNext(false);
  return status.forceExternalNext ? status.forceProvider || 'external' : '';
}

export function saveExternalLessonProviderKey(provider, keyValue, modelValue = '') {
  const policy = getExternalProviderPolicy();
  const providerId = String(provider || '').toLowerCase();
  const current = policy[providerId];
  if (!current) return getExternalLessonProviderStatus();
  const savedKey = saveLocalText(current.keyStorage, keyValue);
  if (modelValue) saveLocalText(current.modelStorage, modelValue);
  diagnostics.log(`${providerId} fallback de aulas ${savedKey ? `salvo: ${maskApiKey(savedKey)}` : 'removido ou vazio'}.`, savedKey ? 'info' : 'warn');
  return getExternalLessonProviderStatus();
}

export function saveExternalLessonProviderModel(provider, modelValue) {
  const policy = getExternalProviderPolicy();
  const providerId = String(provider || '').toLowerCase();
  const current = policy[providerId];
  if (!current) return getExternalLessonProviderStatus();
  const savedModel = saveLocalText(current.modelStorage, modelValue || current.defaultModel);
  diagnostics.log(`${providerId} fallback de aulas usando modelo ${savedModel || current.defaultModel}.`, 'info');
  return getExternalLessonProviderStatus();
}

export function clearExternalLessonProvider(provider) {
  const policy = getExternalProviderPolicy();
  const providerId = String(provider || '').toLowerCase();
  const current = policy[providerId];
  if (!current) return getExternalLessonProviderStatus();
  clearLocalText(current.keyStorage);
  diagnostics.log(`${providerId} fallback de aulas removido.`, 'info');
  return getExternalLessonProviderStatus();
}

export async function generateExternalLessonDraft({ prompt = '', forcedType = '', level = 'A1', fetcher = fetch, forceVariation = false, reason = '', targetProvider = '' } = {}) {
  const providers = providersFromLocalStorage(targetProvider);
  const forced = normalizeForcedProvider(targetProvider);
  if (!providers.length) {
    const msg = forced ? `Nenhuma chave configurada para ${forced}.` : 'Nenhuma chave externa configurada.';
    diagnostics.log(`Fallback externo indisponivel: ${msg}`, 'info');
    return { status: 'missing-keys', lesson: null, error: msg };
  }
  const externalPrompt = buildPrompt({ prompt, forcedType, level, forceVariation });
  diagnostics.setPhase('fallback externo de aula', 'generating');
  diagnostics.log(`Fallback externo ativado${reason ? `: ${reason}` : ''}. Provedores: ${providers.map((provider) => `${provider.label}/${provider.model}`).join(' -> ')}.`, 'warn');
  let lastError = null;
  for (const provider of providers) {
    try {
      diagnostics.log(`Tentando ${provider.label} com modelo ${provider.model} e chave ${provider.masked}.`, 'info');
      const lesson = await callProviderWithFallback(provider, externalPrompt, fetcher);
      diagnostics.log(`${provider.label} gerou aula para validacao local.`, 'success');
      return { status: 'success', lesson: withMeta(lesson, provider), provider: provider.id, model: provider.model };
    } catch (error) {
      lastError = error;
      diagnostics.log(`${provider.label} falhou: ${error?.message || error}`, 'warn');
    }
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
      const section = await callProviderWithFallback(provider, prompt, fetcher, 4200);
      return { status: 'success', section, provider: provider.id, model: provider.model };
    } catch (error) {
      lastError = error;
      diagnostics.log(`Grammar 1B externo falhou em ${provider.label}: ${error?.message || error}`, 'warn');
    }
  }

  return { status: 'error', section: null, error: lastError?.message || `Falha ao gerar section com ${forced}.` };
}
