import { test } from '@playwright/test';
import { getStaticLessons } from '../../src/content/curriculum/index.js';
import { AuditReporter } from './helpers/auditReporter.js';
import { auditLessonExercisesDeep, collectLessonExerciseStats } from './helpers/exerciseQualityRules.js';

test.describe.configure({ mode: 'serial' });

let reporter;

test.beforeAll(({ browserName }, testInfo) => {
  reporter = new AuditReporter({
    name: 'quality-director-exercise-quality',
    projectName: testInfo?.project?.name || browserName || 'node',
  });
});

test.afterAll(() => {
  reporter?.write();
});

test('Quality Director 03: audita exercícios ready contra padrões genéricos e ambíguos', async () => {
  const lessons = ['A1', 'A2', 'B1', 'B2', 'C1', 'C2']
    .flatMap((level) => getStaticLessons(level))
    .filter((lesson) => lesson.status === 'ready');

  if (!lessons.length) {
    reporter.addIssue({
      severity: 'P0',
      area: 'Currículo',
      title: 'Nenhuma aula ready encontrada para auditar exercícios',
      impact: 'O Quality Director não conseguiu validar prática ativa no curso fixo.',
      recommendation: 'Verificar mapas do currículo e staticLessonContent.js.',
    });
    return;
  }

  const stats = [];

  for (const lesson of lessons) {
    const lessonStats = collectLessonExerciseStats(lesson);
    stats.push(lessonStats);

    const issues = auditLessonExercisesDeep(lesson);
    issues.forEach((issue) => reporter.addIssue(issue));

    reporter.addCheck({
      area: `Aula ${lesson.id}`,
      title: `Exercícios auditados: ${lessonStats.exerciseCount} total, ${lessonStats.choiceCount} múltipla escolha, ${lessonStats.openAnswerCount} abertas`,
    });
  }

  const totalExercises = stats.reduce((sum, item) => sum + item.exerciseCount, 0);
  const totalChoice = stats.reduce((sum, item) => sum + item.choiceCount, 0);
  const totalOpen = stats.reduce((sum, item) => sum + item.openAnswerCount, 0);

  reporter.addCheck({
    area: 'Currículo',
    title: `Resumo de exercícios: ${totalExercises} exercícios, ${totalChoice} múltipla escolha, ${totalOpen} respostas abertas`,
  });
});
