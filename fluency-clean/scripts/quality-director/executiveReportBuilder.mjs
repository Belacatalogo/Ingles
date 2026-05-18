const AREA_RULES = [
  { key: 'navigation', label: 'Navegação e estabilidade', patterns: [/navigation|navega|aba|scroll|runtime/i] },
  { key: 'studentJourney', label: 'Jornada real do aluno', patterns: [/student-journey|jornada|fase|lesson flow|continuar|concluir/i] },
  { key: 'exercises', label: 'Exercícios e alternativas', patterns: [/exercise-quality|exercício|alternativa|distrator|feedback|resposta correta/i] },
  { key: 'lessons', label: 'Aulas e pedagogia', patterns: [/lesson-quality|pillar-quality|aula|pilar|grammar|vocabulary|reading|listening|speaking|writing/i] },
  { key: 'visualMobile', label: 'Visual e mobile', patterns: [/visual-mobile|screenshot|bottom nav|viewport|overflow|card|mobile/i] },
  { key: 'progressMastery', label: 'Progresso, XP e mastery', patterns: [/progress-mastery|progress|mastery|xp|streak|gate|weak/i] },
  { key: 'emptySecurity', label: 'Estados vazios e segurança visual', patterns: [/empty-states|security|token|secret|api key|localStorage|json inválido|stack trace/i] },
  { key: 'curriculum', label: 'Currículo e CEFR', patterns: [/curriculum|cefr|pré-requisito|prereq|readyLessonCount|nível/i] },
  { key: 'a11yPerformance', label: 'Acessibilidade e performance', patterns: [/a11y|performance|acessibilidade|foco|botão sem nome|DOMContentLoaded|FCP/i] },
];

const AREA_ORDER = AREA_RULES.map((item) => item.key);
const VIEWPORT_PROJECTS = new Set(['iphone 13', 'iphone se', 'iphone 14', 'iphone 15', 'mobile chromium']);

function severityRank(severity) {
  return { P0: 0, P1: 1, P2: 2, P3: 3 }[severity] ?? 4;
}

function issueIdentity(issue) {
  return [
    issue.report || '',
    issue.area || '',
    issue.title || '',
    String(issue.evidence || '').replace(/iphone\s?(13|se|14|15)|viewport=\{[^}]+\}|box=\{[^}]+\}/gi, '').slice(0, 260),
  ].join('::').toLowerCase().replace(/\s+/g, ' ').trim();
}

function dedupeIssues(issues) {
  const byId = new Map();
  issues.forEach((issue) => {
    const id = issueIdentity(issue);
    const current = byId.get(id);
    if (!current || severityRank(issue.severity) < severityRank(current.severity)) {
      byId.set(id, { ...issue, occurrences: 1, projects: [issue.projectName].filter(Boolean) });
    } else {
      current.occurrences = (current.occurrences || 1) + 1;
      if (issue.projectName && !current.projects.includes(issue.projectName)) current.projects.push(issue.projectName);
    }
  });
  return [...byId.values()];
}

function scorePenalty(issue) {
  const occurrences = Math.max(1, issue.occurrences || 1);
  const duplicatePenalty = Math.min(3, Math.log2(occurrences));
  if (issue.severity === 'P0') return 18 + duplicatePenalty;
  if (issue.severity === 'P1') return 5 + duplicatePenalty;
  if (issue.severity === 'P2') return 1.2 + duplicatePenalty * 0.4;
  return 0.4;
}

function scoreFromIssues(issues) {
  return Math.max(0, Math.round(100 - issues.reduce((sum, issue) => sum + scorePenalty(issue), 0)));
}

function classifyArea(issue) {
  const haystack = `${issue.report || ''} ${issue.area || ''} ${issue.title || ''} ${issue.evidence || ''}`;
  const match = AREA_RULES.find((rule) => rule.patterns.some((pattern) => pattern.test(haystack)));
  return match?.key || 'other';
}

function areaLabel(key) {
  if (key === 'other') return 'Outros';
  return AREA_RULES.find((item) => item.key === key)?.label || key;
}

function groupBy(items, getKey) {
  return items.reduce((groups, item) => {
    const key = getKey(item);
    groups[key] = groups[key] || [];
    groups[key].push(item);
    return groups;
  }, {});
}

function countSeverity(issues, severity) {
  return issues.filter((issue) => issue.severity === severity).length;
}

function statusFromScore(score, issues = []) {
  if (issues.some((issue) => issue.severity === 'P0')) return 'Crítico';
  if (issues.some((issue) => issue.severity === 'P1')) return 'Revisar antes de confiar';
  if (score >= 90) return 'Saudável';
  if (score >= 75) return 'Bom com ajustes';
  return 'Precisa revisão';
}

function recommendationFromIssue(issue) {
  const title = issue.title || 'problema';
  const area = issue.area || 'área não identificada';
  const rec = issue.recommendation || 'Investigar evidência e corrigir a causa raiz.';
  return {
    severity: issue.severity || 'P3',
    area,
    title,
    recommendation: rec,
    report: issue.report || '',
    fileHint: issue.fileHint || '',
    occurrences: issue.occurrences || 1,
    projects: issue.projects || [],
  };
}

function buildActionPlan(issues) {
  const sorted = [...issues].sort((a, b) => severityRank(a.severity) - severityRank(b.severity));
  const p0 = sorted.filter((issue) => issue.severity === 'P0').slice(0, 8).map(recommendationFromIssue);
  const p1 = sorted.filter((issue) => issue.severity === 'P1').slice(0, 12).map(recommendationFromIssue);
  const p2 = sorted.filter((issue) => issue.severity === 'P2').slice(0, 12).map(recommendationFromIssue);

  if (p0.length) {
    return {
      headline: 'Corrigir P0 confirmados antes de continuar evolução visual/pedagógica.',
      immediate: p0,
      next: p1,
      later: p2,
    };
  }

  if (p1.length) {
    return {
      headline: 'Corrigir P1 antes de considerar o sistema confiável para estudo contínuo.',
      immediate: p1,
      next: p2,
      later: sorted.filter((issue) => issue.severity === 'P3').slice(0, 8).map(recommendationFromIssue),
    };
  }

  return {
    headline: 'Sem P0/P1 no relatório atual. Foco em P2/P3 e evolução do próximo bloco.',
    immediate: p2,
    next: sorted.filter((issue) => issue.severity === 'P3').slice(0, 8).map(recommendationFromIssue),
    later: [],
  };
}

function compactReport(report) {
  const rawIssues = report.issues || [];
  const issues = dedupeIssues(rawIssues.map((issue) => ({ ...issue, report: report.name, projectName: report.projectName })));
  return {
    name: report.name,
    projectName: report.projectName,
    score: scoreFromIssues(issues),
    checks: report.checks?.length || report.summary?.checks || 0,
    issues: issues.length,
    rawIssues: rawIssues.length,
    p0: countSeverity(issues, 'P0'),
    p1: countSeverity(issues, 'P1'),
    p2: countSeverity(issues, 'P2'),
    p3: countSeverity(issues, 'P3'),
  };
}

function isViewportProject(projectName = '') {
  return VIEWPORT_PROJECTS.has(String(projectName).toLowerCase());
}

export function buildExecutiveSummary(reports) {
  const rawIssues = reports.flatMap((report) => (report.issues || []).map((issue) => ({
    report: report.name,
    projectName: report.projectName,
    ...issue,
    areaKey: classifyArea({ report: report.name, projectName: report.projectName, ...issue }),
  })));
  const issues = dedupeIssues(rawIssues);
  const checks = reports.flatMap((report) => (report.checks || []).map((check) => ({ report: report.name, ...check })));
  const issuesByArea = groupBy(issues, (issue) => issue.areaKey || 'other');
  const areas = [...AREA_ORDER, 'other']
    .filter((key) => issuesByArea[key]?.length || key !== 'other')
    .map((key) => {
      const areaIssues = issuesByArea[key] || [];
      return {
        key,
        label: areaLabel(key),
        score: scoreFromIssues(areaIssues),
        status: statusFromScore(scoreFromIssues(areaIssues), areaIssues),
        issues: areaIssues.length,
        p0: countSeverity(areaIssues, 'P0'),
        p1: countSeverity(areaIssues, 'P1'),
        p2: countSeverity(areaIssues, 'P2'),
        p3: countSeverity(areaIssues, 'P3'),
      };
    });

  const sortedIssues = [...issues].sort((a, b) => severityRank(a.severity) - severityRank(b.severity));
  const score = scoreFromIssues(issues);

  return {
    generatedAt: new Date().toISOString(),
    status: statusFromScore(score, issues),
    score,
    reports: reports.length,
    checks: checks.length,
    issues: issues.length,
    rawIssues: rawIssues.length,
    dedupedIssues: issues.length,
    duplicateReduction: Math.max(0, rawIssues.length - issues.length),
    p0: countSeverity(issues, 'P0'),
    p1: countSeverity(issues, 'P1'),
    p2: countSeverity(issues, 'P2'),
    p3: countSeverity(issues, 'P3'),
    areas,
    reportSummaries: reports.map(compactReport),
    topIssues: sortedIssues.slice(0, 40),
    actionPlan: buildActionPlan(sortedIssues),
    meta: {
      scoring: 'Deduplicated issue scoring v2: P0=18+, P1=5+, P2=1.2+, P3=0.4. Viewport duplicates are grouped.',
      viewportReports: reports.filter((report) => isViewportProject(report.projectName)).length,
    },
    reportsRaw: reports,
  };
}

function mdEscape(value) {
  return String(value ?? '').replace(/\|/g, '\\|').replace(/\n/g, ' ');
}

function issueLine(issue, index) {
  return `${index + 1}. **${issue.severity || 'P3'} · ${issue.area || 'App'} — ${issue.title || 'Problema'}**\n` +
    `   - Área executiva: ${areaLabel(issue.areaKey || 'other')}\n` +
    `   - Relatório: ${issue.report || 'n/a'} / ${(issue.projects || [issue.projectName]).filter(Boolean).join(', ') || 'n/a'}\n` +
    `   - Ocorrências agrupadas: ${issue.occurrences || 1}\n` +
    `   - Impacto: ${issue.impact || 'Pode afetar a qualidade percebida pelo aluno.'}\n` +
    `${issue.evidence ? `   - Evidência: ${issue.evidence}\n` : ''}` +
    `${issue.fileHint ? `   - Arquivo provável: ${issue.fileHint}\n` : ''}` +
    `${issue.recommendation ? `   - Recomendação: ${issue.recommendation}\n` : ''}`;
}

function actionLine(item, index) {
  return `${index + 1}. **${item.severity} · ${item.area} — ${item.title}**\n` +
    `${item.fileHint ? `   - Arquivo provável: ${item.fileHint}\n` : ''}` +
    `${item.occurrences > 1 ? `   - Ocorrências agrupadas: ${item.occurrences}\n` : ''}` +
    `   - Ação: ${item.recommendation}`;
}

export function executiveSummaryToMarkdown(summary) {
  const areasTable = summary.areas.length
    ? [
        '| Área | Nota | Status | P0 | P1 | P2 | P3 |',
        '|---|---:|---|---:|---:|---:|---:|',
        ...summary.areas.map((area) => `| ${mdEscape(area.label)} | ${area.score} | ${mdEscape(area.status)} | ${area.p0} | ${area.p1} | ${area.p2} | ${area.p3} |`),
      ].join('\n')
    : 'Nenhuma área com problema encontrada.';

  const reportsTable = summary.reportSummaries.length
    ? [
        '| Relatório | Projeto | Nota | Checks | Issues únicas | Issues brutas | P0 | P1 | P2 | P3 |',
        '|---|---|---:|---:|---:|---:|---:|---:|---:|---:|',
        ...summary.reportSummaries.map((report) => `| ${mdEscape(report.name)} | ${mdEscape(report.projectName)} | ${report.score ?? '-'} | ${report.checks} | ${report.issues} | ${report.rawIssues} | ${report.p0} | ${report.p1} | ${report.p2} | ${report.p3} |`),
      ].join('\n')
    : 'Nenhum relatório encontrado.';

  const topIssues = summary.topIssues.length
    ? summary.topIssues.map(issueLine).join('\n')
    : 'Nenhum problema encontrado nos relatórios atuais.';

  const immediate = summary.actionPlan.immediate.length
    ? summary.actionPlan.immediate.map(actionLine).join('\n')
    : 'Nenhuma ação imediata obrigatória.';

  const next = summary.actionPlan.next.length
    ? summary.actionPlan.next.map(actionLine).join('\n')
    : 'Nenhuma próxima ação listada.';

  return `# Fluency Quality Director — Relatório Executivo Latest\n\n` +
    `Gerado em: ${summary.generatedAt}\n\n` +
    `## Veredito\n\n` +
    `**Status:** ${summary.status}\n\n` +
    `**Nota geral:** ${summary.score}/100\n\n` +
    `## Resumo geral\n\n` +
    `- Relatórios consolidados: ${summary.reports}\n` +
    `- Checks executados: ${summary.checks}\n` +
    `- Problemas únicos: ${summary.issues}\n` +
    `- Problemas brutos antes de deduplicar: ${summary.rawIssues}\n` +
    `- Duplicatas agrupadas: ${summary.duplicateReduction}\n` +
    `- P0: ${summary.p0}\n` +
    `- P1: ${summary.p1}\n` +
    `- P2: ${summary.p2}\n` +
    `- P3: ${summary.p3}\n\n` +
    `## Notas por área\n\n${areasTable}\n\n` +
    `## Relatórios consolidados\n\n${reportsTable}\n\n` +
    `## Plano de ação\n\n` +
    `**Direção:** ${summary.actionPlan.headline}\n\n` +
    `### Ações imediatas\n\n${immediate}\n\n` +
    `### Próximas ações\n\n${next}\n\n` +
    `## Principais problemas\n\n${topIssues}\n\n` +
    `## Como usar este relatório\n\n` +
    `1. Corrigir P0 confirmados antes de qualquer evolução nova.\n` +
    `2. Corrigir P1 antes de confiar o uso contínuo ao aluno.\n` +
    `3. Transformar grupos de P2 em blocos de polimento.\n` +
    `4. Registrar correções no Notion e rodar novamente o Quality Director.\n`;
}

export function executiveSummaryToNotionText(summary) {
  return [
    `Status: ${summary.status}`,
    `Nota geral: ${summary.score}/100`,
    `Relatórios: ${summary.reports}`,
    `Checks: ${summary.checks}`,
    `Issues únicas: ${summary.issues} (brutas=${summary.rawIssues}, agrupadas=${summary.duplicateReduction})`,
    `Severidade: P0=${summary.p0}, P1=${summary.p1}, P2=${summary.p2}, P3=${summary.p3}`,
    `Direção: ${summary.actionPlan.headline}`,
    `Top issues: ${summary.topIssues.slice(0, 5).map((issue) => `${issue.severity} ${issue.area} — ${issue.title}`).join(' | ') || 'nenhuma'}`,
  ].join('\n');
}
