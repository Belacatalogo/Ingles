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
const VALID_DEVICES = ['iPhone 13', 'iPhone SE'];

const mode = (process.env.SMART_MODE || 'smart').trim();
const suiteInput = (process.env.SMART_SUITE || 'auto').trim();
const deviceInput = (process.env.SMART_DEVICE || 'all').trim();
const trace = (process.env.SMART_TRACE || 'off').trim();
const video = (process.env.SMART_VIDEO || 'off').trim();
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

const selection = resolveSelection();
const projects = resolveProjects();

const args = ['playwright', 'test', ...selection.suites];
projects.forEach((p) => args.push(`--project=${p}`));
if (trace && trace !== 'off') args.push(`--trace=${trace}`);

const childEnv = { ...process.env };
if (video && video !== 'off') childEnv.PW_VIDEO = video;
if (trace && trace !== 'off') childEnv.PW_TRACE = trace;

const commandStr = `npx ${args.join(' ')}`;

const planLines = [
  '──────────────────────────────────────────────',
  ' Playwright Smart Quality Debug — plano',
  '──────────────────────────────────────────────',
  `modo:     ${selection.mode}`,
  `suite in: ${suiteInput}`,
  `device:   ${projects.join(', ')}`,
  `trace:    ${trace}   video: ${video}`,
  '',
  `suites (${selection.suites.length}):`,
  ...selection.suites.map((s) => `  - ${s}`),
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
    `- **Trace:** \`${trace}\` · **Video:** \`${video}\``,
    `- **Resultado:** ${status} (exit ${code})`,
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
