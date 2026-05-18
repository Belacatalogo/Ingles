import { test } from '@playwright/test';
import { getStaticLessons } from '../../src/content/curriculum/index.js';
import { AuditReporter } from './helpers/auditReporter.js';
import { auditLessonObject } from './helpers/lessonAuditRules.js';

test.describe.configure({ mode: 'serial' });

let reporter;

test.beforeAll(({ browserName }, testInfo) => {
  reporter = new AuditReporter({
    name: 'quality-director-lesson-quality',
    projectName: testInfo?.project?.name || browserName || 'node',
  });
});

test.afterAll(() => {
  reporter?.write();
});

test('Quality Director 01: audita estrutura pedagógica inicial das aulas ready', async () => {
  const lessons = ['A1', 'A2', 'B1', 'B2', 'C1', 'C2']
    .flatMap((level) => getStaticLessons(level))
    .filter((lesson) => lesson.status === 'ready');

  if (!lessons.length) {
    reporter.addIssue({
      severity: 'P0',
      area: 'Currículo',
      title: 'Nenhuma aula ready encontrada',
      impact: 'O curso fixo não teria conteúdo renderizável para o aluno.',
      recommendation: 'Verificar staticLessonContent.js e mapas do currículo.',
    });
    return;
  }

  for (const lesson of lessons) {
    const issues = auditLessonObject(lesson);
    issues.forEach((issue) => reporter.addIssue(issue));
    reporter.addCheck({
      area: `Aula ${lesson.id}`,
      title: `Auditoria heurística de conteúdo executada (${lesson.pillar || lesson.type || 'sem pilar'})`,
    });
  }
});
