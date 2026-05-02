export const MODEL_POLICY_VERSION = 'model-policy-stable-flash-v1';

export const LESSON_MODEL_POLICY = {
  flashModels: ['gemini-2.5-flash', 'gemini-2.5-flash-lite'],
  proModels: ['gemini-2.5-pro'],
  grammar: {
    primaryKeyGroup: 'lesson-free-keys',
    primaryModels: ['gemini-2.5-flash', 'gemini-2.5-flash-lite'],
    optionalFallbackKeyGroup: 'lesson-pro-key',
    optionalFallbackModels: ['gemini-2.5-pro'],
    allowProOnFreeKeys: false,
    blockOnProUnavailable: false,
    contract: 'grammar-stable-flash-policy-v1',
  },
  default: {
    primaryKeyGroup: 'lesson-free-keys',
    primaryModels: ['gemini-2.5-flash', 'gemini-2.5-flash-lite'],
    optionalFallbackKeyGroup: 'lesson-pro-key',
    optionalFallbackModels: ['gemini-2.5-pro'],
    allowProOnFreeKeys: false,
    blockOnProUnavailable: false,
    contract: 'lesson-stable-flash-policy-v1',
  },
};

export function getLessonModelPolicy(lessonType = 'default') {
  const key = String(lessonType || 'default').toLowerCase();
  return LESSON_MODEL_POLICY[key] || LESSON_MODEL_POLICY.default;
}

export function summarizeModelPolicyForDiagnostics(lessonType = 'default') {
  const policy = getLessonModelPolicy(lessonType);
  const primary = policy.primaryModels.join(' / ');
  const fallback = policy.optionalFallbackModels.join(' / ');
  return `Política de modelos ${MODEL_POLICY_VERSION}: keys free usam ${primary}; key Pro paga usa ${fallback} apenas como fallback opcional; Pro em keys free está desativado.`;
}
