import { test, expect } from '@playwright/test';
import { getStaticLessons } from '../../src/content/curriculum/index.js';
import { AuditReporter } from './helpers/auditReporter.js';
import { auditLessonExercisesDeep, collectLessonExerciseStats } from './helpers/exerciseQualityRules.js';
import { auditLessonByPillar } from './helpers/pillarQualityRules.js';
import { auditCefrCoherence } from './helpers/curriculumConsistencyRules.js';
import { openSeededLesson, seedCurrentLesson, satisfyCurrentPhase } from './helpers/lessonFlowDriver.js';
import { runStudentExperienceInvariants } from './helpers/studentExperienceInvariants.js';

const LEVELS = ['A1', 'A2', 'B1', 'B2', 'C1', 'C2'];
const MAX_STEPS_PER_LESSON = Number(process.env.QUALITY_DIRECTOR_ALL_LESSONS_STEPS || 1);
const LEVEL_FILTER = process.env.QUALITY_DIRECTOR_LEVEL || '';
const PILLAR_FILTER = process.env.QUALITY_DIRECTOR_PILLAR || '';

function getAllReadyLessons() {
  return LEVELS
    .filter((level) => !LEVEL_FILTER || level === LEVEL_FILTER)
    .flatMap((level) => getStaticLessons(level))
    .filter((lesson) => lesson.status === 'ready')
    .filter((lesson) => !PILLAR_FILTER || lesson.pillar === PILLAR_FILTER || lesson.type === PILLAR_FILTER);
}

let reporter;
const lessons = getAllReadyLessons();

test.describe.configure({ mode: 'parallel' });

test.beforeEach(async ({ page }, testInfo) => {
  test.setTimeout(45000);
  reporter = reporter || new AuditReporter({
    name: 'quality-director-all-lessons-deep',
    projectName: testInfo.project.name,
  });

  page.on('console', (message) => {
    if (message.type() === 'error') {
      reporter.addIssue({
        severity: 'P1',
        area: 'Todas as aulas · console',
        title: 'Console error durante auditoria profunda de aula',
        impact: 'Erro silencioso pode indicar bug real em aula específica.',
        evidence: message.text(),
        recommendation: 'Investigar e corrigir console errors antes de considerar a aula validada.',
      });
    }
  });

  page.on('pageerror', (error) => {
    reporter.addIssue({
      severity: 'P0',
      area: 'Todas as aulas · runtime',
      title: 'Erro JavaScript não tratado durante auditoria profunda de aula',
      impact: 'Uma aula pode quebrar durante estudo real.',
      evidence: error.message,
      recommendation: 'Corrigir exceção antes de liberar a aula para estudo.',
    });
  });
});

test.afterAll(() => reporter?.write());

test('All Lessons Deep Audit: valida contratos pedagógicos de todas as aulas ready', async () => {
  if (!lessons.length) {
    reporter.addIssue({
      severity: 'P0',
      area: 'Todas as aulas',
      title: 'Nenhuma aula ready encontrada para auditoria completa',
      impact: 'Não é possível validar o curso premium sem aulas ready.',
      recommendation: 'Verificar filtros e currículo.',
    });
    return;
  }

  for (const lesson of lessons) {
    auditLessonExercisesDeep(lesson).forEach((issue) => reporter.addIssue(issue));
    auditLessonByPillar(lesson).forEach((issue) => reporter.addIssue(issue));
    auditCefrCoherence(lesson).forEach((issue) => reporter.addIssue(issue));
    const stats = collectLessonExerciseStats(lesson);
    reporter.addCheck({
      area: `Todas as aulas · ${lesson.id}`,
      title: `Contratos auditados: ${stats.exerciseCount} exercícios, ${stats.choiceCount} múltipla escolha, ${stats.openAnswerCount} abertas`,
    });
  }

  reporter.addCheck({
    area: 'Todas as aulas',
    title: `${lessons.length} aulas ready tiveram contratos pedagógicos auditados`,
  });
});

for (const lesson of lessons) {
  test(`All Lessons Deep Audit: abre ${lesson.id} e valida experiência inicial`, async ({ page }, testInfo) => {
    await seedCurrentLesson(page, lesson);
    await openSeededLesson(page);
    await expect(page.locator('.lesson-reference-screen, .lesson-flow-shell').first()).toBeVisible({ timeout: 10000 });

    const flowShell = page.locator('.lesson-flow-shell');
    if (!(await flowShell.isVisible().catch(() => false))) {
      reporter.addIssue({
        severity: 'P1',
        area: `Todas as aulas · ${lesson.id}`,
        title: 'Aula abriu em tela de referência, não no fluxo profundo',
        impact: 'O auditor não conseguiu validar etapas internas desta aula.',
        recommendation: 'Verificar se a aula ready deve abrir diretamente no fluxo ou se precisa de botão Iniciar/Abrir aula.',
      });
      reporter.addCheck({
        area: `Todas as aulas · ${lesson.id}`,
        title: 'Aula renderizou tela válida, mas sem fluxo profundo visível inicialmente',
      });
      return;
    }

    for (let step = 0; step < MAX_STEPS_PER_LESSON; step += 1) {
      await runStudentExperienceInvariants({
        page,
        reporter,
        area: `${testInfo.project.name} · Todas as aulas · ${lesson.id} · etapa ${step + 1}`,
      });
      await satisfyCurrentPhase(page, reporter, `Todas as aulas · ${lesson.id}`, lesson);
      const continueButton = page.getByRole('button', { name: /continuar|concluir aula/i }).last();
      if (!(await continueButton.isVisible().catch(() => false))) break;
      await continueButton.click().catch(() => null);
      await page.waitForTimeout(30);
    }

    reporter.addCheck({
      area: `Todas as aulas · ${lesson.id}`,
      title: `Experiência inicial validada por ${MAX_STEPS_PER_LESSON} etapa(s)`,
    });
  });
}
