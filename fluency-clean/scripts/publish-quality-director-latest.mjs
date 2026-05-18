import fs from 'node:fs';
import path from 'node:path';
import {
  buildExecutiveSummary,
  executiveSummaryToMarkdown,
  executiveSummaryToNotionText,
} from './quality-director/executiveReportBuilder.mjs';

const root = process.cwd();
const auditDir = path.join(root, 'audit-results');
const outputDir = path.join(root, 'docs', 'quality-director', 'latest');

function safeReadJson(filePath) {
  try {
    return JSON.parse(fs.readFileSync(filePath, 'utf8'));
  } catch {
    return null;
  }
}

function readReports() {
  if (!fs.existsSync(auditDir)) return [];
  return fs.readdirSync(auditDir)
    .filter((file) => file.endsWith('.json'))
    .map((file) => safeReadJson(path.join(auditDir, file)))
    .filter(Boolean);
}

fs.mkdirSync(outputDir, { recursive: true });
const reports = readReports();
const summary = buildExecutiveSummary(reports);
const markdown = executiveSummaryToMarkdown(summary);
const notionText = executiveSummaryToNotionText(summary);

fs.writeFileSync(path.join(outputDir, 'quality-director-latest.json'), JSON.stringify(summary, null, 2));
fs.writeFileSync(path.join(outputDir, 'quality-director-latest.md'), markdown);
fs.writeFileSync(path.join(outputDir, 'quality-director-latest-notion-summary.txt'), notionText);

const githubStepSummary = process.env.GITHUB_STEP_SUMMARY;
if (githubStepSummary) {
  fs.appendFileSync(githubStepSummary, `\n${markdown}\n`);
}

console.log(`Published Quality Director executive latest report with ${summary.reports} reports and ${summary.issues} issues.`);
console.log(notionText);
