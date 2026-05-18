import fs from 'node:fs';
import { execSync } from 'node:child_process';

const EXPLORATORY_STUDENT_AUDIT = 'e2e/quality-director/exploratory-student-audit.spec.js';
const REAL_STUDENT_REGRESSION = 'e2e/quality-director/real-student-regression.audit.spec.js';

const FULL_SUITES = [
  'e2e/quality-director/navigation.audit.spec.js',
  EXPLORATORY_STUDENT_AUDIT,
  'e2e/quality-director/lesson-quality.audit.spec.js',
  'e2e/quality-director/student-journey.audit.spec.js',
  REAL_STUDENT_REGRESSION,
  'e2e/quality-director/exercise-quality.audit.spec.js',
  'e2e/quality-director/pillar-quality.audit.spec.js',
  'e2e/quality-director/visual-mobile.audit.spec.js',
  'e2e/quality-director/progress-mastery.audit.spec.js',
  'e2e/quality-director/empty-states-security.audit.spec.js',
  'e2e/quality-director/curriculum-consistency.audit.spec.js',
  'e2e/quality-director/a11y-performance.audit.spec.js',
];

const ALWAYS_SMOKE = [
  'e2e/quality-director/navigation.audit.spec.js',
  EXPLORATORY_STUDENT_AUDIT,
];

const ROUTES = [
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
      'e2e/quality-director/lesson-quality.audit.spec.js',
      'e2e/quality-director/exercise-quality.audit.spec.js',
      'e2e/quality-director/pillar-quality.audit.spec.js',
      'e2e/quality-director/curriculum-consistency.audit.spec.js',
      'e2e/quality-director/student-journey.audit.spec.js',
      REAL_STUDENT_REGRESSION,
    ],
    reason: 'Mudança em conteúdo/currículo: audita exploratório, aulas, exercícios, pilares, CEFR, jornada e regressão real do aluno.',
  },
  {
    label: 'lesson-flow',
    match: [/^fluency-clean\/src\/lessons\/flow\//, /^fluency-clean\/src\/screens\/LessonScreen\.jsx$/],
    suites: [
      EXPLORATORY_STUDENT_AUDIT,
      'e2e/quality-director/student-journey.audit.spec.js',
      REAL_STUDENT_REGRESSION,
      'e2e/quality-director/exercise-quality.audit.spec.js',
      'e2e/quality-director/visual-mobile.audit.spec.js',
      'e2e/quality-director/a11y-performance.audit.spec.js',
    ],
    reason: 'Mudança no fluxo de aula: audita exploratório, jornada, regressão real, exercícios, visual e acessibilidade.',
  },
  {
    label: 'progress-mastery',
    match: [/^fluency-clean\/src\/services\/(progressStore|masteryStore|masteryGate|lessonProgression|staticLessonProgress|curriculumPlan)\.js$/],
    suites: [
      EXPLORATORY_STUDENT_AUDIT,
      'e2e/quality-director/progress-mastery.audit.spec.js',
      'e2e/quality-director/student-journey.audit.spec.js',
      REAL_STUDENT_REGRESSION,
    ],
    reason: 'Mudança em progresso/mastery/gates: audita exploratório, persistência, jornada e regressão real.',
  },
  {
    label: 'storage-empty-states',
    match: [/^fluency-clean\/src\/services\/(storage|diagnostics|firebase|auth).*\.js$/],
    suites: [
      EXPLORATORY_STUDENT_AUDIT,
      'e2e/quality-director/empty-states-security.audit.spec.js',
      'e2e/quality-director/navigation.audit.spec.js',
      REAL_STUDENT_REGRESSION,
    ],
    reason: 'Mudança em storage/infra cliente: audita exploratório, estados vazios, navegação e regressão real.',
  },
  {
    label: 'styles-ui',
    match: [/^fluency-clean\/src\/styles\//, /^fluency-clean\/src\/.*\.css$/, /^fluency-clean\/src\/components\/layout\//, /^fluency-clean\/src\/components\//, /^fluency-clean\/src\/screens\//],
    suites: [
      'e2e/quality-director/navigation.audit.spec.js',
      EXPLORATORY_STUDENT_AUDIT,
      REAL_STUDENT_REGRESSION,
      'e2e/quality-director/visual-mobile.audit.spec.js',
      'e2e/quality-director/a11y-performance.audit.spec.js',
      'e2e/quality-director/empty-states-security.audit.spec.js',
    ],
    reason: 'Mudança visual/UI: audita navegação, exploratório, regressão real, visual mobile, acessibilidade e estados vazios.',
  },
  {
    label: 'package-config',
    match: [/^fluency-clean\/package\.json$/, /^fluency-clean\/playwright\.config\.js$/, /^fluency-clean\/vite\.config\./],
    suites: FULL_SUITES,
    reason: 'Mudança em config/package: roda auditoria completa.',
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

function getChangedFiles() {
  const manual = process.env.QUALITY_DIRECTOR_CHANGED_FILES;
  if (manual) return manual.split(/\n|,/).map((item) => item.trim()).filter(Boolean);
  const fromEvent = readGithubEventFiles();
  if (fromEvent.length) return fromEvent;
  return readGitDiffFiles();
}

function unique(items) {
  return [...new Set(items.filter(Boolean))];
}

function routeChangedFiles(files, mode) {
  if (mode === 'full' || process.env.GITHUB_EVENT_NAME === 'workflow_dispatch') {
    return {
      mode: 'full',
      files,
      suites: FULL_SUITES,
      matchedRoutes: ['manual-full-audit'],
      reasons: ['Execução manual ou modo full: roda auditoria completa.'],
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

const mode = process.argv.includes('--full') ? 'full' : 'smart';
const files = getChangedFiles();
const selection = routeChangedFiles(files, mode);
const outputDir = 'audit-results';
fs.mkdirSync(outputDir, { recursive: true });
fs.writeFileSync(`${outputDir}/quality-director-suite-selection.json`, JSON.stringify(selection, null, 2));
fs.writeFileSync(`${outputDir}/quality-director-suite-selection.txt`, [
  `mode=${selection.mode}`,
  `suites=${selection.suites.join(' ')}`,
  `routes=${selection.matchedRoutes.join(', ')}`,
  'reasons:',
  ...selection.reasons.map((reason) => `- ${reason}`),
  'files:',
  ...selection.files.map((file) => `- ${file}`),
].join('\n'));

if (process.env.GITHUB_OUTPUT) {
  fs.appendFileSync(process.env.GITHUB_OUTPUT, `suites=${selection.suites.join(' ')}\n`);
  fs.appendFileSync(process.env.GITHUB_OUTPUT, `mode=${selection.mode}\n`);
}

console.log(selection.suites.join(' '));