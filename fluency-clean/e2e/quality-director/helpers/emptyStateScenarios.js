export const EMPTY_STATE_SCENARIOS = [
  {
    id: 'fresh-install',
    label: 'Instalação limpa sem dados',
    setup: () => {
      Object.keys(window.localStorage)
        .filter((key) => key.startsWith('fluency.clean.'))
        .forEach((key) => window.localStorage.removeItem(key));
    },
  },
  {
    id: 'null-core-state',
    label: 'Estados principais como null',
    setup: () => {
      Object.keys(window.localStorage)
        .filter((key) => key.startsWith('fluency.clean.'))
        .forEach((key) => window.localStorage.removeItem(key));
      window.localStorage.setItem('fluency.clean.lesson.current', 'null');
      window.localStorage.setItem('fluency.clean.progress.summary', 'null');
      window.localStorage.setItem('fluency.clean.progress.lessonCompletions', 'null');
      window.localStorage.setItem('fluency.clean.mastery.skillProfile.v1', 'null');
    },
  },
  {
    id: 'corrupted-json-core-state',
    label: 'Estados principais com JSON inválido',
    setup: () => {
      Object.keys(window.localStorage)
        .filter((key) => key.startsWith('fluency.clean.'))
        .forEach((key) => window.localStorage.removeItem(key));
      window.localStorage.setItem('fluency.clean.lesson.current', '{broken-json');
      window.localStorage.setItem('fluency.clean.progress.summary', '{broken-json');
      window.localStorage.setItem('fluency.clean.progress.lessonCompletions', '{broken-json');
      window.localStorage.setItem('fluency.clean.mastery.skillProfile.v1', '{broken-json');
      window.localStorage.setItem('fluency.clean.settings', '{broken-json');
    },
  },
  {
    id: 'empty-lesson-with-settings',
    label: 'Sem aula atual mas com configurações básicas',
    setup: () => {
      Object.keys(window.localStorage)
        .filter((key) => key.startsWith('fluency.clean.'))
        .forEach((key) => window.localStorage.removeItem(key));
      window.localStorage.setItem('fluency.clean.settings', JSON.stringify({ theme: 'dark', dailyGoalMinutes: 20 }));
      window.localStorage.setItem('fluency.clean.lesson.current', JSON.stringify(null));
      window.localStorage.setItem('fluency.clean.progress.summary', JSON.stringify({ xp: 0, completedLessons: 0, streakDays: 0, weekly: {} }));
    },
  },
];

export const SECURITY_VISUAL_PATTERNS = [
  { pattern: /AIza[0-9A-Za-z_-]{20,}/, label: 'Possível Firebase/API key exposta' },
  { pattern: /sk-[0-9A-Za-z_-]{20,}/, label: 'Possível secret key exposta' },
  { pattern: /Bearer\s+[0-9A-Za-z._-]{20,}/i, label: 'Possível bearer token exposto' },
  { pattern: /api[_ -]?key\s*[:=]/i, label: 'Texto de API key exposto' },
  { pattern: /secret\s*[:=]/i, label: 'Texto de secret exposto' },
  { pattern: /token\s*[:=]/i, label: 'Texto de token exposto' },
  { pattern: /stack trace|at\s+[A-Za-z0-9_$]+\s*\(|uncaught|runtime error/i, label: 'Stack trace ou erro runtime exposto' },
  { pattern: /firebase error|auth\/|firestore|indexeddb/i, label: 'Erro técnico Firebase/IndexedDB exposto' },
  { pattern: /json parse|syntaxerror|unexpected token/i, label: 'Erro técnico de parser exposto' },
  { pattern: /lesson\.current|progress\.summary|mastery\.skillProfile|localStorage/i, label: 'Chave interna de storage exposta' },
];

export async function applyEmptyStateScenario(page, scenarioId) {
  const scenario = EMPTY_STATE_SCENARIOS.find((item) => item.id === scenarioId);
  if (!scenario) throw new Error(`Unknown empty-state scenario: ${scenarioId}`);
  await page.addInitScript(({ id }) => {
    const scenarios = {
      'fresh-install': () => {
        Object.keys(window.localStorage).filter((key) => key.startsWith('fluency.clean.')).forEach((key) => window.localStorage.removeItem(key));
      },
      'null-core-state': () => {
        Object.keys(window.localStorage).filter((key) => key.startsWith('fluency.clean.')).forEach((key) => window.localStorage.removeItem(key));
        window.localStorage.setItem('fluency.clean.lesson.current', 'null');
        window.localStorage.setItem('fluency.clean.progress.summary', 'null');
        window.localStorage.setItem('fluency.clean.progress.lessonCompletions', 'null');
        window.localStorage.setItem('fluency.clean.mastery.skillProfile.v1', 'null');
      },
      'corrupted-json-core-state': () => {
        Object.keys(window.localStorage).filter((key) => key.startsWith('fluency.clean.')).forEach((key) => window.localStorage.removeItem(key));
        window.localStorage.setItem('fluency.clean.lesson.current', '{broken-json');
        window.localStorage.setItem('fluency.clean.progress.summary', '{broken-json');
        window.localStorage.setItem('fluency.clean.progress.lessonCompletions', '{broken-json');
        window.localStorage.setItem('fluency.clean.mastery.skillProfile.v1', '{broken-json');
        window.localStorage.setItem('fluency.clean.settings', '{broken-json');
      },
      'empty-lesson-with-settings': () => {
        Object.keys(window.localStorage).filter((key) => key.startsWith('fluency.clean.')).forEach((key) => window.localStorage.removeItem(key));
        window.localStorage.setItem('fluency.clean.settings', JSON.stringify({ theme: 'dark', dailyGoalMinutes: 20 }));
        window.localStorage.setItem('fluency.clean.lesson.current', JSON.stringify(null));
        window.localStorage.setItem('fluency.clean.progress.summary', JSON.stringify({ xp: 0, completedLessons: 0, streakDays: 0, weekly: {} }));
      },
    };
    window.localStorage.setItem('fluency.clean.access.session', JSON.stringify({ unlocked: true, method: 'quality-director-empty-state', at: new Date().toISOString() }));
    scenarios[id]?.();
    window.localStorage.setItem('fluency.clean.access.session', JSON.stringify({ unlocked: true, method: 'quality-director-empty-state', at: new Date().toISOString() }));
  }, { id: scenarioId });
}

export function auditSecurityVisualText({ text, reporter, area }) {
  SECURITY_VISUAL_PATTERNS.forEach((rule) => {
    if (rule.pattern.test(text)) {
      reporter.addIssue({
        severity: /key|secret|token|Bearer/i.test(rule.label) ? 'P0' : 'P1',
        area,
        title: 'Texto técnico/sensível apareceu para o aluno',
        impact: 'Pode assustar o aluno, reduzir confiança ou expor informação sensível.',
        evidence: rule.label,
        recommendation: 'Substituir por mensagem amigável e esconder detalhes técnicos em diagnostics internos.',
      });
    }
  });
}
