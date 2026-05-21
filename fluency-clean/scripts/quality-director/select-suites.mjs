import fs from 'node:fs';
import { getChangedFiles, routeChangedFiles } from './changed-files-to-suites.mjs';

// Roteamento agora vive em changed-files-to-suites.mjs (compartilhado com
// run-smart-playwright.mjs). Este script mantém a mesma CLI e os mesmos
// outputs usados pelo workflow Quality Director.
const argMode = process.argv.includes('--all-lessons') ? 'all_lessons' : process.argv.includes('--full') ? 'full' : 'smart';
const mode = process.env.QUALITY_DIRECTOR_MODE || argMode;
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
