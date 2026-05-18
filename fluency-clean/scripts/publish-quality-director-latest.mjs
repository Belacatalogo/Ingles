import fs from 'node:fs';
import path from 'node:path';

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

function severityRank(severity) {
  return { P0: 0, P1: 1, P2: 2, P3: 3 }[severity] ?? 4;
}

function scorePenalty(issue) {
  if (issue.severity === 'P0') return 24;
  if (issue.severity === 'P1') return 12;
  if (issue.severity === 'P2') return 6;
  return 2;
}

function buildSummary(reports) {
  const issues = reports.flatMap((report) => (report.issues || []).map((issue) => ({
    report: report.name,
    projectName: report.projectName,
    ...issue,
  })));
  const checks = reports.flatMap((report) => report.checks || []);
  const penalty = issues.reduce((sum, issue) => sum + scorePenalty(issue), 0);
  return {
    generatedAt: new Date().toISOString(),
    reports: reports.length,
    score: Math.max(0, 100 - penalty),
    checks: checks.length,
    issues: issues.length,
    p0: issues.filter((issue) => issue.severity === 'P0').length,
    p1: issues.filter((issue) => issue.severity === 'P1').length,
    p2: issues.filter((issue) => issue.severity === 'P2').length,
    p3: issues.filter((issue) => issue.severity === 'P3').length,
    topIssues: issues.sort((a, b) => severityRank(a.severity) - severityRank(b.severity)).slice(0, 30),
    reportsRaw: reports,
  };
}

function issueLine(issue, index) {
  return `${index + 1}. **${issue.severity || 'P3'} · ${issue.area || 'App'} — ${issue.title || 'Problema'}**\n` +
    `   - Relatório: ${issue.report || 'n/a'} / ${issue.projectName || 'n/a'}\n` +
    `   - Impacto: ${issue.impact || 'Pode afetar a qualidade percebida pelo aluno.'}\n` +
    `${issue.evidence ? `   - Evidência: ${issue.evidence}\n` : ''}` +
    `${issue.fileHint ? `   - Arquivo provável: ${issue.fileHint}\n` : ''}` +
    `${issue.recommendation ? `   - Recomendação: ${issue.recommendation}\n` : ''}`;
}

function toMarkdown(summary) {
  const topIssues = summary.topIssues.length
    ? summary.topIssues.map(issueLine).join('\n')
    : 'Nenhum problema encontrado nos relatórios atuais.';

  return `# Fluency Quality Director — Latest Report\n\n` +
    `Gerado em: ${summary.generatedAt}\n\n` +
    `## Nota geral\n\n` +
    `**${summary.score}/100**\n\n` +
    `## Resumo\n\n` +
    `- Relatórios consolidados: ${summary.reports}\n` +
    `- Checks executados: ${summary.checks}\n` +
    `- Problemas encontrados: ${summary.issues}\n` +
    `- P0: ${summary.p0}\n` +
    `- P1: ${summary.p1}\n` +
    `- P2: ${summary.p2}\n` +
    `- P3: ${summary.p3}\n\n` +
    `## Principais problemas\n\n${topIssues}\n\n` +
    `## Próximo passo recomendado\n\n` +
    `Corrigir primeiro P0/P1. Se não houver P0/P1, continuar a evolução do próximo bloco do Quality Director no Notion.\n`;
}

fs.mkdirSync(outputDir, { recursive: true });
const reports = readReports();
const summary = buildSummary(reports);
fs.writeFileSync(path.join(outputDir, 'quality-director-latest.json'), JSON.stringify(summary, null, 2));
fs.writeFileSync(path.join(outputDir, 'quality-director-latest.md'), toMarkdown(summary));

const githubStepSummary = process.env.GITHUB_STEP_SUMMARY;
if (githubStepSummary) {
  fs.appendFileSync(githubStepSummary, `\n${toMarkdown(summary)}\n`);
}

console.log(`Published Quality Director latest report with ${summary.reports} reports and ${summary.issues} issues.`);
