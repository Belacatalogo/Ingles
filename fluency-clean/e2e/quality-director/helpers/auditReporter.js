import fs from 'node:fs';
import path from 'node:path';

const ROOT_DIR = process.cwd();
const AUDIT_DIR = path.join(ROOT_DIR, 'audit-results');

function ensureAuditDir() {
  fs.mkdirSync(AUDIT_DIR, { recursive: true });
}

function severityRank(severity) {
  return { P0: 0, P1: 1, P2: 2, P3: 3 }[severity] ?? 4;
}

function groupBySeverity(issues) {
  return issues.reduce((groups, issue) => {
    const key = issue.severity || 'P3';
    groups[key] = groups[key] || [];
    groups[key].push(issue);
    return groups;
  }, {});
}

function scoreFromIssues(issues) {
  const penalty = issues.reduce((sum, issue) => {
    if (issue.severity === 'P0') return sum + 24;
    if (issue.severity === 'P1') return sum + 12;
    if (issue.severity === 'P2') return sum + 6;
    return sum + 2;
  }, 0);

  return Math.max(0, 100 - penalty);
}

function markdownIssue(issue, index) {
  const evidence = issue.evidence ? `\n   - Evidência: ${issue.evidence}` : '';
  const recommendation = issue.recommendation ? `\n   - Recomendação: ${issue.recommendation}` : '';
  const fileHint = issue.fileHint ? `\n   - Arquivo provável: ${issue.fileHint}` : '';
  return `${index + 1}. **${issue.area || 'App'} — ${issue.title}**\n   - Severidade: ${issue.severity || 'P3'}\n   - Impacto: ${issue.impact || 'Pode reduzir a confiança do aluno.'}${evidence}${fileHint}${recommendation}`;
}

export class AuditReporter {
  constructor({ name, projectName }) {
    this.name = name;
    this.projectName = projectName;
    this.startedAt = new Date().toISOString();
    this.checks = [];
    this.issues = [];
  }

  addCheck(check) {
    this.checks.push({
      status: 'passed',
      at: new Date().toISOString(),
      ...check,
    });
  }

  addIssue(issue) {
    this.issues.push({
      severity: 'P2',
      at: new Date().toISOString(),
      ...issue,
    });
  }

  addConsoleIssue(message, location = '') {
    this.addIssue({
      severity: /error|exception|failed/i.test(message) ? 'P1' : 'P2',
      area: 'Console',
      title: 'Mensagem suspeita no console',
      impact: 'Pode indicar erro silencioso ou comportamento quebrado durante o estudo.',
      evidence: `${message}${location ? ` (${location})` : ''}`,
      recommendation: 'Investigar a origem do console durante a tela auditada.',
    });
  }

  write() {
    ensureAuditDir();

    const finishedAt = new Date().toISOString();
    const sortedIssues = [...this.issues].sort((a, b) => severityRank(a.severity) - severityRank(b.severity));
    const score = scoreFromIssues(sortedIssues);
    const payload = {
      name: this.name,
      projectName: this.projectName,
      startedAt: this.startedAt,
      finishedAt,
      score,
      summary: {
        checks: this.checks.length,
        issues: sortedIssues.length,
        p0: sortedIssues.filter((issue) => issue.severity === 'P0').length,
        p1: sortedIssues.filter((issue) => issue.severity === 'P1').length,
        p2: sortedIssues.filter((issue) => issue.severity === 'P2').length,
        p3: sortedIssues.filter((issue) => issue.severity === 'P3').length,
      },
      checks: this.checks,
      issues: sortedIssues,
    };

    const safeProjectName = (this.projectName || 'default').replace(/[^a-z0-9_-]+/gi, '-').toLowerCase();
    const baseName = `${this.name}-${safeProjectName}`;
    fs.writeFileSync(path.join(AUDIT_DIR, `${baseName}.json`), JSON.stringify(payload, null, 2));
    fs.writeFileSync(path.join(AUDIT_DIR, `${baseName}.md`), this.toMarkdown(payload));
    return payload;
  }

  toMarkdown(payload) {
    const groups = groupBySeverity(payload.issues);
    const issueSections = ['P0', 'P1', 'P2', 'P3']
      .map((severity) => {
        const issues = groups[severity] || [];
        if (!issues.length) return `## ${severity}\n\nNenhum problema encontrado.`;
        return `## ${severity}\n\n${issues.map(markdownIssue).join('\n\n')}`;
      })
      .join('\n\n');

    const checks = payload.checks
      .map((check) => `- ${check.area || 'App'}: ${check.title || check.name || 'check'} — ${check.status || 'passed'}`)
      .join('\n');

    return `# ${payload.name} — ${payload.projectName}\n\n` +
      `Gerado em: ${payload.finishedAt}\n\n` +
      `Nota inicial: **${payload.score}/100**\n\n` +
      `## Resumo\n\n` +
      `- Checks executados: ${payload.summary.checks}\n` +
      `- Problemas encontrados: ${payload.summary.issues}\n` +
      `- P0: ${payload.summary.p0}\n` +
      `- P1: ${payload.summary.p1}\n` +
      `- P2: ${payload.summary.p2}\n` +
      `- P3: ${payload.summary.p3}\n\n` +
      `## Checks executados\n\n${checks || 'Nenhum check registrado.'}\n\n` +
      `${issueSections}\n\n` +
      `## Próximo passo recomendado\n\n` +
      `Corrigir primeiro qualquer P0/P1. Depois revisar P2 que cause sensação de app amador, exercício genérico ou texto técnico para o aluno.\n`;
  }
}
