import { test } from '@playwright/test';
import { getStaticCurriculum, getStaticLessons } from '../../src/content/curriculum/index.js';
import { AuditReporter } from './helpers/auditReporter.js';
import {
  auditCefrCoherence,
  auditCurriculumConsistency,
  summarizeCurriculum,
} from './helpers/curriculumConsistencyRules.js';

test.describe.configure({ mode: 'serial' });

let reporter;

test.beforeAll(({ browserName }, testInfo) => {
  reporter = new AuditReporter({
    name: 'quality-director-curriculum-consistency',
    projectName: testInfo?.project?.name || browserName || 'node',
  });
});

test.afterAll(() => {
  reporter?.write();
});

test('Quality Director 08: audita consistência do currículo e sinais CEFR', async () => {
  const curriculum = getStaticCurriculum();
  const summary = summarizeCurriculum(curriculum);

  summary.forEach((item) => {
    reporter.addCheck({
      area: `Currículo ${item.level}`,
      title: `Mapeado: ${item.mapped}; ready: ${item.ready}; planejado: ${item.planned}; pilares=${JSON.stringify(item.pillars)}`,
    });
  });

  const consistencyIssues = auditCurriculumConsistency(curriculum);
  consistencyIssues.forEach((issue) => reporter.addIssue(issue));

  const lessons = ['A1', 'A2', 'B1', 'B2', 'C1', 'C2'].flatMap((level) => getStaticLessons(level));
  lessons.forEach((lesson) => {
    auditCefrCoherence(lesson).forEach((issue) => reporter.addIssue(issue));
  });

  reporter.addCheck({
    area: 'Currículo global',
    title: `Auditoria CEFR/currículo executada em ${lessons.length} aulas mapeadas`,
  });
});
