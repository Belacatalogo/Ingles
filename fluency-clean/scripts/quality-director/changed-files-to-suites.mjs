// Roteamento compartilhado: mapeia arquivos alterados -> suites do Quality
// Director, e nomes de suite -> caminhos de spec. Usado por:
// - select-suites.mjs (workflow Quality Director / modo smart legado)
// - run-smart-playwright.mjs (workflow Playwright Smart Quality Debug)
import fs from 'node:fs';
import { execSync } from 'node:child_process';

const QD = 'e2e/quality-director';

const ALL_LESSONS_DEEP_AUDIT = `${QD}/all-lessons-deep.audit.spec.js`;
const EXPLORATORY_STUDENT_AUDIT = `${QD}/exploratory-student-audit.spec.js`;
const REAL_STUDENT_REGRESSION = `${QD}/real-student-regression.audit.spec.js`;

export const FULL_SUITES = [
  `${QD}/navigation.audit.spec.js`,
  EXPLORATORY_STUDENT_AUDIT,
  `${QD}/lesson-quality.audit.spec.js`,
  `${QD}/student-journey.audit.spec.js`,
  REAL_STUDENT_REGRESSION,
  `${QD}/exercise-quality.audit.spec.js`,
  `${QD}/pillar-quality.audit.spec.js`,
  `${QD}/visual-mobile.audit.spec.js`,
  `${QD}/progress-mastery.audit.spec.js`,
  `${QD}/empty-states-security.audit.spec.js`,
  `${QD}/curriculum-consistency.audit.spec.js`,
  `${QD}/a11y-performance.audit.spec.js`,
];

export const ALL_LESSONS_SUITES = [ALL_LESSONS_DEEP_AUDIT];

export const ALWAYS_SMOKE = [
  `${QD}/navigation.audit.spec.js`,
  EXPLORATORY_STUDENT_AUDIT,
];

// Nome de suite (input do workflow manual) -> caminho(s) de spec.
// `auto` e `all` são tratados fora deste mapa (smart routing / pasta inteira).
export const SUITE_MAP = {
  'pillar-quality': [`${QD}/pillar-quality.audit.spec.js`],
  'exercise-quality': [`${QD}/exercise-quality.audit.spec.js`],
  'lesson-quality': [`${QD}/lesson-quality.audit.spec.js`],
  'visual-mobile': [`${QD}/visual-mobile.audit.spec.js`],
  navigation: [`${QD}/navigation.audit.spec.js`],
  'exploratory-student-audit': [EXPLORATORY_STUDENT_AUDIT],
  'student-journey': [`${QD}/student-journey.audit.spec.js`],
  'progress-mastery': [`${QD}/progress-mastery.audit.spec.js`],
  'empty-states-security': [`${QD}/empty-states-security.audit.spec.js`],
  'curriculum-consistency': [`${QD}/curriculum-consistency.audit.spec.js`],
  'a11y-performance': [`${QD}/a11y-performance.audit.spec.js`],
  'real-student-regression': [REAL_STUDENT_REGRESSION],
  'all-lessons-deep': [ALL_LESSONS_DEEP_AUDIT],
  'quality-director': FULL_SUITES,
};

export const ROUTES = [
  {
    label: 'quality-director-infra',
    match: [/^fluency-clean\/e2e\/quality-director\//, /^fluency-clean\/scripts\/quality-director\//, /^fluency-clean\/scripts\/publish-quality-director-latest\.mjs$/, /^\.github\/workflows\/quality-director\.yml$/],
    suites: FULL_SUITES,
    reason: 'Mudança na infra do Quality Director: roda auditoria completa.',
  },
  {
    label: 'curriculum-content',
    match: [/^fluency-clean\/src\/content\/curriculum\//],
    suites: [
      EXPLORATORY_STUDENT_AUDIT,
      `${QD}/lesson-quality.audit.spec.js`,
      `${QD}/exercise-quality.audit.spec.js`,
      `${QD}/pillar-quality.audit.spec.js`,
      `${QD}/curriculum-consistency.audit.spec.js`,
      `${QD}/student-journey.audit.spec.js`,
      REAL_STUDENT_REGRESSION,
    ],
    reason: 'Mudança em conteúdo/currículo: audita exploratório, aulas, exercícios, pilares, CEFR, jornada e regressão real do aluno.',
  },
  {
    label: 'content-schemas-factory',
    match: [/^fluency-clean\/src\/content\/schemas\//],
    suites: [
      `${QD}/pillar-quality.audit.spec.js`,
      `${QD}/lesson-quality.audit.spec.js`,
      `${QD}/exercise-quality.audit.spec.js`,
      `${QD}/curriculum-consistency.audit.spec.js`,
    ],
    reason: 'Mudança em schemas/factory de conteúdo: audita pilares, aulas, exercícios e CEFR.',
  },
  {
    label: 'lesson-flow',
    match: [/^fluency-clean\/src\/lessons\/flow\//, /^fluency-clean\/src\/screens\/LessonScreen\.jsx$/],
    suites: [
      EXPLORATORY_STUDENT_AUDIT,
      `${QD}/student-journey.audit.spec.js`,
      REAL_STUDENT_REGRESSION,
      `${QD}/exercise-quality.audit.spec.js`,
      `${QD}/visual-mobile.audit.spec.js`,
      `${QD}/a11y-performance.audit.spec.js`,
    ],
    reason: 'Mudança no fluxo de aula: audita exploratório, jornada, regressão real, exercícios, visual e acessibilidade.',
  },
  {
    label: 'progress-mastery',
    match: [/^fluency-clean\/src\/services\/(progressStore|masteryStore|masteryGate|lessonProgression|staticLessonProgress|curriculumPlan)\.js$/, /^fluency-clean\/src\/services\/.*(progress|mastery|xp|streak).*\.js$/i],
    suites: [
      EXPLORATORY_STUDENT_AUDIT,
      `${QD}/progress-mastery.audit.spec.js`,
      `${QD}/student-journey.audit.spec.js`,
      REAL_STUDENT_REGRESSION,
    ],
    reason: 'Mudança em progresso/mastery/gates: audita exploratório, persistência, jornada e regressão real.',
  },
  {
    label: 'storage-empty-states',
    match: [/^fluency-clean\/src\/services\/(storage|diagnostics|firebase|auth).*\.js$/],
    suites: [
      EXPLORATORY_STUDENT_AUDIT,
      `${QD}/empty-states-security.audit.spec.js`,
      `${QD}/navigation.audit.spec.js`,
      REAL_STUDENT_REGRESSION,
    ],
    reason: 'Mudança em storage/infra cliente: audita exploratório, estados vazios, navegação e regressão real.',
  },
  {
    label: 'styles-ui',
    match: [/^fluency-clean\/src\/styles\//, /^fluency-clean\/src\/.*\.css$/, /^fluency-clean\/src\/components\/layout\//, /^fluency-clean\/src\/components\//, /^fluency-clean\/src\/pages\//, /^fluency-clean\/src\/screens\//],
    suites: [
      `${QD}/navigation.audit.spec.js`,
      EXPLORATORY_STUDENT_AUDIT,
      REAL_STUDENT_REGRESSION,
      `${QD}/visual-mobile.audit.spec.js`,
      `${QD}/a11y-performance.audit.spec.js`,
      `${QD}/empty-states-security.audit.spec.js`,
    ],
    reason: 'Mudança visual/UI: audita navegação, exploratório, regressão real, visual mobile, acessibilidade e estados vazios.',
  },
  {
    label: 'package-config',
    match: [/^fluency-clean\/package\.json$/, /^fluency-clean\/playwright\.config\.js$/, /^fluency-clean\/vite\.config\./, /^\.github\/workflows\/playwright-smart-quality-debug\.yml$/],
    suites: FULL_SUITES,
    reason: 'Mudança em config/package/workflow de teste: roda auditoria completa.',
  },
];

function run(command) {
  return execSync(command, { encoding: 'utf8', stdio: ['ignore', 'pipe', 'ignore'] }).trim();
}

function readGithubEventFiles() {
  const eventPath = process.env.GITHUB_EVENT_PATH;
  if (!eventPath || !fs.existsSync(eventPath)) return [];
  try {
    const event = JSON.parse(fs.readFileSync(eventPath, 'utf8'));
    const commits = event.commits || [];
    const files = new Set();
    commits.forEach((commit) => {
      [...(commit.added || []), ...(commit.modified || []), ...(commit.removed || [])].forEach((file) => files.add(file));
    });
    return [...files];
  } catch {
    return [];
  }
}

function readGitDiffFiles() {
  try {
    const base = process.env.GITHUB_EVENT_BEFORE || 'HEAD~1';
    const head = process.env.GITHUB_SHA || 'HEAD';
    if (!base || /^0+$/.test(base)) return run(`git diff-tree --no-commit-id --name-only -r ${head}`).split('\n').filter(Boolean);
    return run(`git diff --name-only ${base} ${head}`).split('\n').filter(Boolean);
  } catch {
    return [];
  }
}

export function getChangedFiles() {
  const manual = process.env.QUALITY_DIRECTOR_CHANGED_FILES;
  if (manual) return manual.split(/\n|,/).map((item) => item.trim()).filter(Boolean);
  const fromEvent = readGithubEventFiles();
  if (fromEvent.length) return fromEvent;
  return readGitDiffFiles();
}

export function unique(items) {
  return [...new Set(items.filter(Boolean))];
}

export function routeChangedFiles(files, mode) {
  if (mode === 'all_lessons') {
    return {
      mode: 'all_lessons',
      files,
      suites: ALL_LESSONS_SUITES,
      matchedRoutes: ['manual-all-lessons-deep-audit'],
      reasons: ['Execução manual all_lessons: audita todas as aulas ready em modo profundo.'],
    };
  }

  if (mode === 'full' || process.env.GITHUB_EVENT_NAME === 'workflow_dispatch') {
    return {
      mode: 'full',
      files,
      suites: FULL_SUITES,
      matchedRoutes: ['manual-full-audit'],
      reasons: ['Execução manual ou modo full: roda auditoria completa padrão.'],
    };
  }

  const suites = new Set(ALWAYS_SMOKE);
  const matchedRoutes = [];
  const reasons = [];

  files.forEach((file) => {
    ROUTES.forEach((route) => {
      if (route.match.some((pattern) => pattern.test(file))) {
        matchedRoutes.push(route.label);
        reasons.push(`${file}: ${route.reason}`);
        route.suites.forEach((suite) => suites.add(suite));
      }
    });
  });

  if (!files.length) {
    FULL_SUITES.forEach((suite) => suites.add(suite));
    reasons.push('Nenhum arquivo alterado detectado: fallback para auditoria completa.');
    matchedRoutes.push('fallback-full');
  }

  if (matchedRoutes.length === 0) {
    reasons.push('Nenhuma rota específica encontrada: roda smoke + exploratório de experiência do aluno.');
    matchedRoutes.push('smoke-exploratory');
  }

  return {
    mode: 'smart',
    files,
    suites: unique([...suites]),
    matchedRoutes: unique(matchedRoutes),
    reasons: unique(reasons),
  };
}
