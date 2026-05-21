// Runner do "Playwright Smart Quality Debug".
// Resolve suites + device a partir de inputs (smart/manual), monta o comando
// Playwright, imprime um plano claro, executa e propaga o exit code.
//
// Inputs via env (espelham os inputs do workflow):
//   SMART_MODE     = smart | manual            (default: smart)
//   SMART_SUITE    = auto | all | quality-director | <suite>   (default: auto)
//   SMART_DEVICE   = all | "iPhone 13" | "iPhone SE"           (default: all)
//   SMART_TRACE    = off | on | retain-on-failure              (default: off)
//   SMART_VIDEO    = off | on | retain-on-failure              (default: off)
//   SMART_WORKERS  = número de workers Playwright (opcional)
//   SMART_DRY_RUN  = "1" para apenas imprimir o plano (não roda)
//   QUALITY_DIRECTOR_CHANGED_FILES = lista (vírgula/linha) para override smart
//
// Uso local:
//   node scripts/quality-director/run-smart-playwright.mjs
//   SMART_MODE=manual SMART_SUITE=pillar-quality SMART_DEVICE="iPhone 13" \
//     node scripts/quality-director/run-smart-playwright.mjs
import fs from 'node:fs';
import { spawnSync } from 'node:child_process';
import { FULL_SUITES, SUITE_MAP, getChangedFiles, routeChangedFiles } from './changed-files-to-suites.mjs';

const QD_DIR = 'e2e/quality-director';
const A11Y_PERFORMANCE_SUITE = `${QD_DIR}/a11y-performance.audit.spec.js`;
const VALID_DEVICES = ['iPhone 13', 'iPhone SE'];
const VALID_TRACE_MODES = new Set(['off', 'on', 'on-first-retry', 'on-all-retries', 'retain-on-failure', 'retain-on-first-failure', 'retain-on-failure-and-retries']);
const VALID_VIDEO_MODES = new Set(['off', 'on', 'retain-on-failure', 'on-first-retry']);

function normalizeBooleanLikeMode(value, fallback = 'off') {
  const raw = String(value ?? fallback).trim();
  if (!raw) return fallback;
  const lowered = raw.toLowerCase();
  if (lowered === 'false' || lowered === '0' || lowered === 'no') return 'off';
  if (lowered === 'true' || lowered === '1' || lowered === 'yes') return 'on';
  return raw;
}

function normalizeTraceMode(value) {
  const normalized = normalizeBooleanLikeMode(value, 'off');
  if (VALID_TRACE_MODES.has(normalized)) return normalized;
  console.warn(`[smart-debug] SMART_TRACE inválido: "${value}". Usando "off".`);
  return 'off';
}

function normalizeVideoMode(value) {
  const normalized = normalizeBooleanLikeMode(value, 'off');
  if (VALID_VIDEO_MODES.has(normalized)) return normalized;
  console.warn(`[smart-debug] SMART_VIDEO inválido: "${value}". Usando "off".`);
  return 'off';
}

const mode = (process.env.SMART_MODE || 'smart').trim();
const suiteInput = (process.env.SMART_SUITE || 'auto').trim();
const deviceInput = (process.env.SMART_DEVICE || 'all').trim();
const trace = normalizeTraceMode(process.env.SMART_TRACE);
const video = normalizeVideoMode(process.env.SMART_VIDEO);
const rawTrace = String(process.env.SMART_TRACE ?? 'off').trim() || 'off';
const rawVideo = String(process.env.SMART_VIDEO ?? 'off').trim() || 'off';
const workersInput = (process.env.SMART_WORKERS || '').trim();
const dryRun = process.env.SMART_DRY_RUN === '1';

function resolveSelection() {
  // Smart: roteia por arquivos alterados.
  if (mode === 'smart' || suiteInput === 'auto') {
    const files = getChangedFiles();
    const selection = routeChangedFiles(files, 'smart');
    return {
      mode: 'smart',
      suites: selection.suites,
      files: selection.files,
      routes: selection.matchedRoutes,
      reasons: selection.reasons,
    };
  }
  // Manual.
  if (suiteInput === 'all') {
    return { mode: 'manual', suites: [QD_DIR], files: [], routes: ['manual-all'], reasons: ['Manual: roda toda a pasta e2e/quality-director.'] };
  }
  if (suiteInput === 'quality-director') {
    return { mode: 'manual', suites: FULL_SUITES, files: [], routes: ['manual-quality-director'], reasons: ['Manual: roda o conjunto completo do Quality Director.'] };
  }
  const mapped = SUITE_MAP[suiteInput];
  if (!mapped) {
    const known = ['auto', 'all', 'quality-director', ...Object.keys(SUITE_MAP)].join(', ');
    console.error(`[smart-debug] Suite desconhecida: "${suiteInput}". Válidas: ${known}`);
    process.exit(2);
  }
  return { mode: 'manual', suites: mapped, files: [], routes: [`manual-${suiteInput}`], reasons: [`Manual: roda a suite ${suiteInput}.`] };
}

function resolveProjects() {
  if (!deviceInput || deviceInput === 'all') return VALID_DEVICES.slice();
  if (!VALID_DEVICES.includes(deviceInput)) {
    console.error(`[smart-debug] Device desconhecido: "${deviceInput}". Válidos: all, ${VALID_DEVICES.join(', ')}`);
    process.exit(2);
  }
  return [deviceInput];
}

function selectionIncludesA11yPerformance(selection) {
  return selection.suites.some((suite) => suite === QD_DIR || suite === A11Y_PERFORMANCE_SUITE || suite.endsWith('/a11y-performance.audit.spec.js'));
}

function resolveWorkers({ hasA11yPerformance }) {
  if (workersInput) return workersInput;
  // A suíte a11y-performance mede tempo, navega por todas as abas e coleta sinais
  // técnicos. Em execuções amplas do Smart Debug, muita concorrência pode gerar
  // timeout/flakiness de CI. Limitar workers não mascara falha real: só reduz
  // contenção de CPU enquanto mantém a suíte obrigatória e com exit code real.
  return hasA11yPerformance ? '2' : '';
}

function labelNormalizedMode({ raw, normalized }) {
  return raw === normalized ? normalized : `${normalized} (input: ${raw})`;
}

const selection = resolveSelection();
const projects = resolveProjects();
const hasA11yPerformance = selectionIncludesA11yPerformance(selection);
const effectiveTrace = hasA11yPerformance && trace === 'off' ? 'retain-on-failure' : trace;
const workers = resolveWorkers({ hasA11yPerformance });

const args = ['playwright', 'test', ...selection.suites];
projects.forEach((p) => args.push(`--project=${p}`));
if (workers) args.push(`--workers=${workers}`);
if (effectiveTrace && effectiveTrace !== 'off') args.push(`--trace=${effectiveTrace}`);

const childEnv = { ...process.env };
if (video && video !== 'off') childEnv.PW_VIDEO = video;
if (effectiveTrace && effectiveTrace !== 'off') childEnv.PW_TRACE = effectiveTrace;

const commandStr = `npx ${args.join(' ')}`;
const normalizedTraceLabel = labelNormalizedMode({ raw: rawTrace, normalized: trace });
const normalizedVideoLabel = labelNormalizedMode({ raw: rawVideo, normalized: video });
const traceLabel = effectiveTrace === trace ? normalizedTraceLabel : `${effectiveTrace} (input normalizado: ${normalizedTraceLabel})`;
const stabilizationLines = hasA11yPerformance
  ? [
      '',
      'estabilização:',
      '  - a11y-performance detectada: workers limitados para reduzir contenção no CI',
      effectiveTrace !== trace ? '  - trace retain-on-failure ativado automaticamente para diagnóstico' : '  - trace mantido conforme input',
    ]
  : [];

const planLines = [
  '──────────────────────────────────────────────',
  ' Playwright Smart Quality Debug — plano',
  '──────────────────────────────────────────────',
  `modo:     ${selection.mode}`,
  `suite in: ${suiteInput}`,
  `device:   ${projects.join(', ')}`,
  `trace:    ${traceLabel}   video: ${normalizedVideoLabel}`,
  `workers:  ${workers || 'default'}`,
  '',
  `suites (${selection.suites.length}):`,
  ...selection.suites.map((s) => `  - ${s}`),
  ...stabilizationLines,
];
if (selection.files?.length) {
  planLines.push('', `arquivos alterados detectados (${selection.files.length}):`, ...selection.files.map((f) => `  - ${f}`));
}
if (selection.routes?.length) planLines.push('', `rotas: ${selection.routes.join(', ')}`);
if (selection.reasons?.length) planLines.push('motivos:', ...selection.reasons.map((r) => `  - ${r}`));
planLines.push('', `comando: ${commandStr}`, '──────────────────────────────────────────────');
const plan = planLines.join('\n');
console.log(plan);

// Persiste o plano para artifact/inspeção.
try {
  fs.mkdirSync('audit-results', { recursive: true });
  fs.writeFileSync('audit-results/smart-debug-plan.txt', plan);
} catch { /* non-fatal */ }

function writeStepSummary(status, code) {
  if (!process.env.GITHUB_STEP_SUMMARY) return;
  const md = [
    '## Playwright Smart Quality Debug',
    '',
    `- **Modo:** \`${selection.mode}\` (input suite: \`${suiteInput}\`)`,
    `- **Devices:** ${projects.map((p) => `\`${p}\``).join(', ')}`,
    `- **Trace:** \`${traceLabel}\` · **Video:** \`${normalizedVideoLabel}\``,
    `- **Workers:** \`${workers || 'default'}\``,
    `- **Resultado:** ${status} (exit ${code})`,
    ...(hasA11yPerformance ? ['', '### Estabilização a11y-performance', '- Workers limitados quando a suíte sensível está incluída.', '- Trace `retain-on-failure` é ativado automaticamente se o input estiver `off`/`false`.'] : []),
    '',
    '### Suites executadas',
    ...selection.suites.map((s) => `- \`${s}\``),
    '',
    ...(selection.files?.length ? ['### Arquivos detectados', ...selection.files.map((f) => `- \`${f}\``), ''] : []),
    ...(selection.reasons?.length ? ['### Motivos', ...selection.reasons.map((r) => `- ${r}`), ''] : []),
    '### Comando',
    '```',
    commandStr,
    '```',
    '',
    '### Artifacts',
    '- `fluency-clean/playwright-report/` (relatório HTML)',
    '- `fluency-clean/test-results/` (screenshots, traces, vídeos)',
    '- `fluency-clean/audit-results/` (JSON/MD por suite + plano)',
    '- `fluency-clean/docs/quality-director/` (relatório latest, se publicado)',
  ].join('\n');
  fs.appendFileSync(process.env.GITHUB_STEP_SUMMARY, `${md}\n`);
}

if (dryRun) {
  console.log('[smart-debug] SMART_DRY_RUN=1 — plano impresso, execução pulada.');
  writeStepSummary('dry-run', 0);
  process.exit(0);
}

const result = spawnSync('npx', args, { stdio: 'inherit', env: childEnv });
const code = result.status == null ? 1 : result.status;
writeStepSummary(code === 0 ? 'PASSOU ✅' : 'FALHOU ❌', code);
process.exit(code);
