import { CURRICULUM_LEVELS, getCurriculumLessons, getCurriculumProgress, getCurriculumSummary } from './curriculumPlan.js';
import { getLessonCompletions, getPracticeSummary } from './progressStore.js';
import { getSpeakingHistorySummary } from './speakingHistory.js';
import { getErrorBankSummary } from './errorBank.js';

const SKILLS = ['reading', 'listening', 'writing', 'speaking', 'grammar'];

function safeArray(value) { return Array.isArray(value) ? value : []; }
function clamp(value, min = 0, max = 100) { return Math.max(min, Math.min(max, Math.round(Number(value || 0)))); }
function pct(done, total) { return total ? clamp((done / total) * 100) : 0; }

function getLevelLessons(level) {
  return getCurriculumLessons().filter((lesson) => lesson.level === level);
}

function getCompletedLevelLessons(level) {
  const completedIds = new Set(getCurriculumProgress().completedIds || []);
  return getLevelLessons(level).filter((lesson) => completedIds.has(lesson.id));
}

function getRequiredCompletion(level) {
  const row = CURRICULUM_LEVELS.find((item) => item.level === level);
  return Number(row?.requiredCompletion || 0.92);
}

function buildSkillCoverage(level, completedLessons, speakingSummary) {
  const levelLessons = getLevelLessons(level);
  return SKILLS.map((skill) => {
    if (skill === 'speaking') {
      const sessions = speakingSummary.totalSessions || 0;
      const average = speakingSummary.averageScore || 0;
      const score = sessions ? clamp(Math.min(100, average * 0.75 + Math.min(25, sessions * 4))) : 0;
      return {
        key: skill,
        label: 'Speaking',
        done: sessions,
        total: Math.max(3, Math.ceil(levelLessons.length * 0.04)),
        score,
        passed: sessions >= 3 && average >= 70,
        detail: sessions ? `${sessions} sessão(ões), média ${average}/100` : 'sem speaking real suficiente',
      };
    }
    const total = Math.max(1, levelLessons.filter((lesson) => lesson.type === skill).length);
    const done = completedLessons.filter((lesson) => lesson.type === skill).length;
    const score = pct(done, total);
    return {
      key: skill,
      label: skill.charAt(0).toUpperCase() + skill.slice(1),
      done,
      total,
      score,
      passed: score >= 70 || done >= Math.min(total, 3),
      detail: `${done}/${total} aulas do tipo`,
    };
  });
}

function buildCheckpointCoverage(level, completedLessons) {
  const levelLessons = getLevelLessons(level);
  const checkpointTypes = [
    { key: 'final-review', label: 'Revisão final' },
    { key: 'final-production', label: 'Produção final' },
    { key: 'level-assessment', label: 'Simulados' },
    { key: 'mastery-lock', label: 'Correção final' },
  ];
  return checkpointTypes.map((checkpoint) => {
    const total = levelLessons.filter((lesson) => lesson.checkpoint === checkpoint.key).length;
    const done = completedLessons.filter((lesson) => lesson.checkpoint === checkpoint.key).length;
    const optional = total === 0;
    return {
      ...checkpoint,
      done,
      total,
      score: optional ? 100 : pct(done, total),
      passed: optional || done >= total,
      detail: optional ? 'não exigido neste nível' : `${done}/${total} concluído(s)`,
    };
  });
}

function getLevelCompletions(level) {
  return getLessonCompletions().filter((item) => item.level === level);
}

function getStudyReadyCount(level) {
  return getLevelCompletions(level).filter((item) => item.studyReady || item.studyReadiness !== 'do-not-study').length;
}

function buildCertificationStatus({ completionScore, skillScore, checkpointScore, errorPenalty, speakingScore, requiredCompletion }) {
  const score = clamp(completionScore * 0.35 + skillScore * 0.22 + checkpointScore * 0.2 + speakingScore * 0.13 + (100 - errorPenalty) * 0.1);
  if (completionScore >= requiredCompletion * 100 && skillScore >= 80 && checkpointScore >= 90 && errorPenalty <= 10 && speakingScore >= 70) {
    return { status: 'certified', label: 'Certificado', score };
  }
  if (completionScore >= requiredCompletion * 100 && skillScore >= 70 && checkpointScore >= 75 && errorPenalty <= 20 && speakingScore >= 55) {
    return { status: 'ready', label: 'Pronto para certificação', score };
  }
  if (completionScore >= 65 || score >= 62) return { status: 'almost', label: 'Quase pronto', score };
  return { status: 'in-progress', label: 'Em andamento', score };
}

export function getLevelCertificationSummary(levelInput = '') {
  const curriculum = getCurriculumSummary();
  const level = levelInput || curriculum.currentLevel || 'A1';
  const levelLessons = getLevelLessons(level);
  const completedLessons = getCompletedLevelLessons(level);
  const requiredCompletion = getRequiredCompletion(level);
  const completionScore = pct(completedLessons.length, levelLessons.length);
  const skills = buildSkillCoverage(level, completedLessons, getSpeakingHistorySummary({ limit: 4 }));
  const checkpoints = buildCheckpointCoverage(level, completedLessons);
  const skillScore = Math.round(skills.reduce((sum, item) => sum + item.score, 0) / skills.length);
  const checkpointScore = Math.round(checkpoints.reduce((sum, item) => sum + item.score, 0) / checkpoints.length);
  const speaking = skills.find((item) => item.key === 'speaking');
  const speakingScore = speaking?.score || 0;
  const errorBank = getErrorBankSummary({ limit: 12 });
  const errorPenalty = clamp(errorBank.highPriority * 8 + errorBank.dueToday * 3 + Math.max(0, errorBank.uniqueErrors - 12), 0, 40);
  const status = buildCertificationStatus({ completionScore, skillScore, checkpointScore, errorPenalty, speakingScore, requiredCompletion });
  const studyReadyCount = getStudyReadyCount(level);
  const blockers = [];

  if (completionScore < requiredCompletion * 100) blockers.push(`concluir ${Math.ceil(requiredCompletion * levelLessons.length) - completedLessons.length} aula(s)/revisão(ões) do ${level}.`);
  if (skillScore < 70) blockers.push('equilibrar melhor as habilidades principais.');
  if (checkpointScore < 75) blockers.push('concluir revisão final, produção final ou simulados do nível.');
  if (speakingScore < 55) blockers.push('fazer mais Speaking real antes de certificar.');
  if (errorBank.highPriority > 0) blockers.push('reduzir erros de alta prioridade no banco de erros.');

  return {
    level,
    title: CURRICULUM_LEVELS.find((item) => item.level === level)?.title || level,
    status: status.status,
    label: status.label,
    score: status.score,
    completionScore,
    completed: completedLessons.length,
    total: levelLessons.length,
    requiredCompletion: Math.round(requiredCompletion * 100),
    skillScore,
    checkpointScore,
    speakingScore,
    errorPenalty,
    studyReadyCount,
    skills,
    checkpoints,
    blockers,
    nextAction: blockers[0] || 'fazer mini prova/certificação final para consolidar o nível.',
    errorBank: {
      uniqueErrors: errorBank.uniqueErrors,
      highPriority: errorBank.highPriority,
      dueToday: errorBank.dueToday,
    },
    checkedAt: new Date().toISOString(),
    version: 'level-certification-v1',
  };
}

export function getAllLevelCertificationSummaries() {
  return CURRICULUM_LEVELS.map((item) => getLevelCertificationSummary(item.level));
}
