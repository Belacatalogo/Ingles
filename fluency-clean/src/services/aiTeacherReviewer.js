import { buildReviewerPromptForType, AI_REVIEWER_SYSTEM_PROMPT, AI_REVIEWER_VERSION } from './aiReviewerPrompts.js';
import { getLessonModelPolicy } from './modelPolicy.js';
import { maskApiKey, normalizeLessonKeys } from './geminiLessons.js';

export const AI_REVIEW_APPROVAL_SCORE = 78;
export const AI_REVIEW_MAX_RETRIES = 1;

function clean(value) {
  return String(value ?? '').trim();
}

function ensureArray(value) {
  return Array.isArray(value) ? value : [];
}

function clampScore(value) {
  const score = Number(value || 0);
  if (!Number.isFinite(score)) return 0;
  return Math.max(0, Math.min(100, Math.round(score)));
}

function safeJsonParse(text) {
  try {
    const source = clean(text);
    const start = source.indexOf('{');
    const end = source.lastIndexOf('}');
    if (start >= 0 && end > start) return JSON.parse(source.slice(start, end + 1));
  } catch {
    // fallback handled by caller
  }
  return null;
}

function extractGeminiText(data) {
  const parts = data?.candidates?.[0]?.content?.parts;
  if (!Array.isArray(parts)) return '';
  return parts.map((part) => part?.text ?? '').join('\n').trim();
}

function normalizeApiKeys(apiKeys) {
  if (Array.isArray(apiKeys) || typeof apiKeys === 'string') {
    return normalizeLessonKeys(apiKeys);
  }
  const free = normalizeLessonKeys(apiKeys?.free || apiKeys?.keys || []);
  return free;
}

function buildFallbackReview(reason) {
  return {
    approved: true,
    score: 75,
    strengths: [],
    issues: [`Review automático indisponível: ${reason}`],
    criticalIssues: [],
    suggestedFix: '',
    reviewerNotes: 'Revisão de IA falhou — usando aprovação automática de fallback.',
    reviewerVersion: AI_REVIEWER_VERSION,
    source: 'fallback',
    reviewedAt: new Date().toISOString(),
  };
}

async function callGeminiForReview(prompt, apiKey, { model = 'gemini-2.5-flash', fetcher = fetch } = {}) {
  const url = `https://generativelanguage.googleapis.com/v1beta/models/${encodeURIComponent(model)}:generateContent?key=${encodeURIComponent(apiKey)}`;
  const body = {
    systemInstruction: { parts: [{ text: AI_REVIEWER_SYSTEM_PROMPT }] },
    contents: [{ role: 'user', parts: [{ text: prompt }] }],
    generationConfig: { temperature: 0.2, maxOutputTokens: 1200, responseMimeType: 'application/json' },
  };

  const response = await fetcher(url, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(body),
  });

  if (!response || typeof response.ok === 'undefined') throw new Error('Gemini review retornou resposta vazia.');
  if (!response.ok) throw new Error(`Gemini review HTTP ${response.status}`);
  return response.json();
}

function buildLessonSummary(lesson) {
  return {
    type: lesson?.type,
    level: lesson?.level,
    title: lesson?.title,
    objective: lesson?.objective,
    focus: lesson?.focus,
    sections: ensureArray(lesson?.sections).slice(0, 4),
    vocabulary: ensureArray(lesson?.vocabulary).slice(0, 8),
    exercises: ensureArray(lesson?.exercises).slice(0, 6),
    prompts: ensureArray(lesson?.prompts).slice(0, 4),
    listeningText: lesson?.listeningText ? String(lesson.listeningText).slice(0, 400) : undefined,
  };
}

export async function reviewLessonWithAI(lesson, { type, level, apiKeys, fetcher = fetch } = {}) {
  const lessonType = clean(type || lesson?.type || 'reading');
  const lessonLevel = clean(level || lesson?.level || 'A1');
  const policy = getLessonModelPolicy(lessonType);
  const flashModel = policy.primaryModels?.find((model) => model === 'gemini-2.5-flash') || 'gemini-2.5-flash';
  const freeKeys = normalizeApiKeys(apiKeys).filter(Boolean);

  if (!freeKeys.length) {
    console.warn('[AI Reviewer] Sem chave disponível — pulando review.');
    return buildFallbackReview('sem chave API');
  }

  const apiKey = freeKeys[0];
  const prompt = buildReviewerPromptForType(buildLessonSummary(lesson), lessonType, lessonLevel);

  try {
    const data = await callGeminiForReview(prompt, apiKey, { model: flashModel, fetcher });
    const text = extractGeminiText(data);
    const parsed = safeJsonParse(text);

    if (!parsed || typeof parsed.approved !== 'boolean') {
      console.warn('[AI Reviewer] Resposta inválida do revisor:', text.slice(0, 200));
      return buildFallbackReview('resposta inválida do revisor');
    }

    const score = clampScore(parsed.score);
    const criticalIssues = ensureArray(parsed.criticalIssues).map(clean).filter(Boolean).slice(0, 4);
    return {
      approved: parsed.approved === true && score >= AI_REVIEW_APPROVAL_SCORE && criticalIssues.length === 0,
      score,
      strengths: ensureArray(parsed.strengths).map(clean).filter(Boolean).slice(0, 3),
      issues: ensureArray(parsed.issues).map(clean).filter(Boolean).slice(0, 6),
      criticalIssues,
      suggestedFix: clean(parsed.suggestedFix || ''),
      reviewerNotes: clean(parsed.reviewerNotes || ''),
      reviewerVersion: AI_REVIEWER_VERSION,
      source: `gemini:${flashModel}`,
      reviewedKey: maskApiKey(apiKey),
      reviewedAt: new Date().toISOString(),
    };
  } catch (error) {
    console.warn('[AI Reviewer] Erro na chamada:', error?.message || error);
    return buildFallbackReview(error?.message || 'erro desconhecido');
  }
}

export function shouldRegenerateLesson(aiReview) {
  if (!aiReview || aiReview.source === 'fallback') return { shouldRegenerate: false, reason: 'fallback' };
  if (ensureArray(aiReview.criticalIssues).length > 0) {
    return { shouldRegenerate: true, reason: aiReview.criticalIssues[0] };
  }
  if (Number(aiReview.score || 0) < AI_REVIEW_APPROVAL_SCORE) {
    return { shouldRegenerate: true, reason: aiReview.suggestedFix || 'score abaixo do mínimo' };
  }
  if (aiReview.approved === false) {
    return { shouldRegenerate: true, reason: aiReview.suggestedFix || 'reprovado pelo professor revisor IA' };
  }
  return { shouldRegenerate: false, reason: '' };
}

export function mergeReviews(mechanicalReview, aiReview) {
  if (!aiReview || aiReview.source === 'fallback') {
    return {
      ...mechanicalReview,
      aiReview,
      reviewer: `${mechanicalReview?.reviewer || 'teacher-reviewer-v1'}+${AI_REVIEWER_VERSION}`,
    };
  }

  const mechanicalScore = Number(mechanicalReview?.finalScore || 0);
  const aiScore = Number(aiReview?.score || 0);
  const mergedScore = clampScore(mechanicalScore * 0.4 + aiScore * 0.6);

  const allIssues = [
    ...ensureArray(mechanicalReview?.issues),
    ...ensureArray(aiReview?.issues).map((issue) => `[IA] ${issue}`),
    ...ensureArray(aiReview?.criticalIssues).map((issue) => `[CRÍTICO] ${issue}`),
  ];

  const approved =
    mergedScore >= AI_REVIEW_APPROVAL_SCORE &&
    ensureArray(aiReview?.criticalIssues).length === 0 &&
    (mechanicalReview?.approved !== false || mergedScore >= 85);

  return {
    ...mechanicalReview,
    finalScore: mergedScore,
    approved,
    issues: allIssues,
    aiReview,
    mergedAt: new Date().toISOString(),
    reviewer: `${mechanicalReview?.reviewer || 'teacher-reviewer-v1'}+${AI_REVIEWER_VERSION}`,
  };
}
