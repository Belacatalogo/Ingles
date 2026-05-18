import { test } from '@playwright/test';
import { getStaticLessons } from '../../src/content/curriculum/index.js';
import { AuditReporter } from './helpers/auditReporter.js';
import { auditLessonByPillar, getPillarAuditSummary } from './helpers/pillarQualityRules.js';

test.describe.configure({ mode: 'serial' });

let reporter;

test.beforeAll(({ browserName }, testInfo) => {
  reporter = new AuditReporter({
    name: 'quality-director-pillar-quality',
    projectName: testInfo?.project?.name || browserName || 'node',
  });
});

test.afterAll(() => {
  reporter?.write();
});

test('Quality Director 04: audita aulas ready com rubrica pedagógica por pilar', async () => {
  const lessons = ['A1', 'A2', 'B1', 'B2', 'C1', 'C2']
    .flatMap((level) => getStaticLessons(level))
    .filter((lesson) => lesson.status === 'ready');

  if (!lessons.length) {
    reporter.addIssue({
      severity: 'P0',
      area: 'Currículo',
      title: 'Nenhuma aula ready encontrada para auditoria por pilar',
      impact: 'O Quality Director não conseguiu avaliar a qualidade pedagógica do curso fixo.',
      recommendation: 'Verificar mapas do currículo e staticLessonContent.js.',
    });
    return;
  }

  const summary = getPillarAuditSummary(lessons);
  Object.entries(summary).forEach(([pillar, count]) => {
    reporter.addCheck({
      area: `Pilar ${pillar}`,
      title: `${count} aulas ready encontradas para auditoria pedagógica`,
    });
  });

  for (const lesson of lessons) {
    const issues = auditLessonByPillar(lesson);
    issues.forEach((issue) => reporter.addIssue(issue));

    reporter.addCheck({
      area: `Aula ${lesson.id}`,
      title: `Rubrica aplicada ao pilar ${lesson.pillar || lesson.type || 'unknown'}`,
    });
  }
});
