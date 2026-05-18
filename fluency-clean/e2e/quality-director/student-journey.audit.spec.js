import { test, expect } from '@playwright/test';
import { findStaticLesson } from '../../src/content/curriculum/index.js';
import { AuditReporter } from './helpers/auditReporter.js';
import {
  advanceOrReport,
  getCurrentPhaseTitle,
  getPageText,
  openSeededLesson,
  satisfyCurrentPhase,
  seedCurrentLesson,
} from './helpers/lessonFlowDriver.js';

const JOURNEY_LESSON_IDS = [
  'A1-READING-001',
  'A1-VOCABULARY-001',
  'A1-GRAMMAR-001',
];

test.describe.configure({ mode: 'serial' });

let reporter;

test.beforeEach(async ({ page }, testInfo) => {
  reporter = reporter || new AuditReporter({
    name: 'quality-director-student-journey',
    projectName: testInfo.project.name,
  });

  page.on('console', (message) => {
    if (['error', 'warning'].includes(message.type())) {
      reporter.addConsoleIssue(message.text(), message.location()?.url || '');
    }
  });

  page.on('pageerror', (error) => {
    reporter.addIssue({
      severity: 'P0',
      area: 'Runtime',
      title: 'Erro JavaScript não tratado durante jornada do aluno',
      impact: 'Pode quebrar a aula enquanto o aluno estuda.',
      evidence: error.message,
      recommendation: 'Corrigir a exceção antes de avançar no polimento pedagógico.',
    });
  });
});

test.afterAll(() => {
  reporter?.write();
});

for (const lessonId of JOURNEY_LESSON_IDS) {
  test(`Quality Director 02: jornada inicial de aula como aluno — ${lessonId}`, async ({ page }) => {
    const lesson = findStaticLesson(lessonId);
    if (!lesson || lesson.status !== 'ready') {
      reporter.addIssue({
        severity: 'P1',
        area: `Aula ${lessonId}`,
        title: 'Aula de jornada não encontrada como ready',
        impact: 'O auditor não conseguiu abrir uma aula planejada para simular o aluno.',
        recommendation: 'Escolher uma aula ready existente ou corrigir o mapa do currículo.',
      });
      return;
    }

    await seedCurrentLesson(page, lesson);
    await openSeededLesson(page);

    await expect(page.locator('.lesson-flow-shell')).toBeVisible({ timeout: 10_000 });
    reporter.addCheck({
      area: `Aula ${lessonId}`,
      title: 'Aula abriu no fluxo guiado',
    });

    const seenPhases = new Set();
    const maxSteps = 10;

    for (let step = 0; step < maxSteps; step += 1) {
      const pageText = await getPageText(page);
      if (/progresso salvo|aula já concluída|aula concluída|revisão adaptativa/i.test(pageText)) {
        reporter.addCheck({
          area: `Aula ${lessonId}`,
          title: 'Jornada chegou ao estado de conclusão ou revisão pós-aula',
        });
        break;
      }

      const phaseTitle = await getCurrentPhaseTitle(page);
      if (!phaseTitle) {
        reporter.addIssue({
          severity: 'P0',
          area: `Aula ${lessonId}`,
          title: 'Fase atual sem título renderizado',
          impact: 'O aluno pode ver uma tela de aula incompleta ou quebrada.',
          recommendation: 'Verificar LessonPhaseCard e a construção das fases do pilar.',
        });
        break;
      }

      seenPhases.add(phaseTitle);
      await satisfyCurrentPhase(page, reporter, `Aula ${lessonId}`);
      const advanced = await advanceOrReport(page, reporter, `Aula ${lessonId} · ${phaseTitle}`);
      if (!advanced) break;
    }

    if (seenPhases.size < 3) {
      reporter.addIssue({
        severity: 'P1',
        area: `Aula ${lessonId}`,
        title: 'Jornada percorreu poucas fases',
        impact: 'O fluxo pode estar travando cedo ou com fases insuficientes para uma aula profunda.',
        evidence: `${seenPhases.size} fases vistas: ${Array.from(seenPhases).join(' → ')}`,
        recommendation: 'Revisar se o pilar está montando fases suficientes e se o avanço não trava prematuramente.',
      });
    } else {
      reporter.addCheck({
        area: `Aula ${lessonId}`,
        title: `Jornada percorreu ${seenPhases.size} fases sem travamento fatal`,
      });
    }
  });
}
