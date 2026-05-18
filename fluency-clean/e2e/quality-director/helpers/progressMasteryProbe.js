export async function runProgressMasteryProbe(page, lesson) {
  return page.evaluate(async (payload) => {
    const progressModule = await import('/src/services/progressStore.js');
    const masteryModule = await import('/src/services/masteryStore.js');
    const gateModule = await import('/src/services/masteryGate.js');

    const keys = [
      'fluency.clean.progress.summary',
      'fluency.clean.progress.lessonCompletions',
      'fluency.clean.mastery.skillProfile.v1',
      'fluency.clean.progress.practiceSessions',
      'fluency.clean.progress.lessonDrafts',
      'fluency.clean.curriculum.plan.v1',
      'fluency.clean.static.lesson.progress.v1',
    ];

    keys.forEach((key) => window.localStorage.removeItem(key));

    const lesson = payload.lesson;
    const first = progressModule.completeLesson({
      lesson,
      answers: { multipleChoice: { 0: 'Ana' } },
      writtenAnswer: 'Ana is from Brazil. She is a student in an online English class.',
      flowResults: [{ status: 'ok', title: 'Evidence question' }],
      preComputedScore: { totalAttempt: 2, correct: 2, score: 100 },
    });

    const afterFirstProgress = progressModule.getProgressSummary();
    const afterFirstCompletions = progressModule.getLessonCompletions();
    const afterFirstMastery = masteryModule.getMasteryProfile();
    const completedAfterFirst = progressModule.isLessonCompleted(lesson);

    const second = progressModule.completeLesson({
      lesson,
      answers: { multipleChoice: { 0: 'Ana' } },
      writtenAnswer: 'Ana is from Brazil. She is a student in an online English class.',
      flowResults: [{ status: 'ok', title: 'Evidence question' }],
      preComputedScore: { totalAttempt: 2, correct: 2, score: 100 },
    });

    const afterSecondProgress = progressModule.getProgressSummary();
    const afterSecondCompletions = progressModule.getLessonCompletions();
    const afterSecondMastery = masteryModule.getMasteryProfile();
    const completedAfterSecond = progressModule.isLessonCompleted(lesson);

    const weakLesson = { ...lesson, id: `${lesson.id}-weak-probe`, title: `${lesson.title} Weak Probe` };
    const weak = progressModule.completeLesson({
      lesson: weakLesson,
      answers: { multipleChoice: { 0: 'wrong answer' } },
      writtenAnswer: 'short',
      flowResults: [{ status: 'warn', title: 'Evidence question failed' }],
      preComputedScore: { totalAttempt: 4, correct: 1, score: 25 },
      richFlowErrors: [{
        phaseId: 'probe-phase',
        title: 'Evidence question failed',
        pillar: lesson.pillar || lesson.type || 'reading',
        level: lesson.level || 'A1',
        lessonId: weakLesson.id,
        lessonTitle: weakLesson.title,
        value: 'wrong answer',
        prompt: 'What is her name?',
        expected: 'Ana',
        status: 'warn',
      }],
    });

    const afterWeakMastery = masteryModule.getMasteryProfile();
    const weakPillars = masteryModule.getWeakPillars(85);
    const gateNoProgress = gateModule.getMasteryGateStatus('A2', { completedIds: new Set() });
    const gateA1 = gateModule.getMasteryGateStatus('A1');

    window.localStorage.setItem('fluency.clean.progress.summary', 'null');
    window.localStorage.setItem('fluency.clean.progress.lessonCompletions', 'null');
    window.localStorage.setItem('fluency.clean.mastery.skillProfile.v1', 'null');

    const normalizedNullProgress = progressModule.getProgressSummary();
    const normalizedNullCompletions = progressModule.getLessonCompletions();
    const normalizedNullMastery = masteryModule.getMasteryProfile();

    return {
      first,
      second,
      weak,
      afterFirstProgress,
      afterFirstCompletions,
      afterFirstMastery,
      completedAfterFirst,
      afterSecondProgress,
      afterSecondCompletions,
      afterSecondMastery,
      completedAfterSecond,
      afterWeakMastery,
      weakPillars,
      gateNoProgress,
      gateA1,
      normalizedNullProgress,
      normalizedNullCompletions,
      normalizedNullMastery,
    };
  }, { lesson });
}
