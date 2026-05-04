const STORAGE_KEY = 'fluency.practiceTelemetry.v1';
const MAX_SESSIONS = 200;

function safeJsonParse(value, fallback) {
  try {
    return value ? JSON.parse(value) : fallback;
  } catch {
    return fallback;
  }
}

function readState() {
  if (typeof window === 'undefined') return { sessions: [] };
  return safeJsonParse(window.localStorage.getItem(STORAGE_KEY), { sessions: [] });
}

function writeState(state) {
  if (typeof window === 'undefined') return;
  try {
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
  } catch {
    // Telemetria local nunca deve quebrar a prática do aluno.
  }
}

function safeSkill(value) {
  const skill = String(value || 'unknown').trim().toLowerCase();
  if (['grammar', 'listening', 'speaking', 'reading', 'writing', 'vocabulary', 'mixed'].includes(skill)) return skill;
  return 'unknown';
}

function safeLevel(value) {
  const level = String(value || 'A1').trim().toUpperCase();
  if (/^(A1|A2|B1|B2|C1|C2)$/.test(level)) return level;
  if (level.startsWith('C')) return 'C1';
  if (level.startsWith('B2')) return 'B2';
  if (level.startsWith('B')) return 'B1';
  if (level.startsWith('A2')) return 'A2';
  return 'A1';
}

function toNumber(value, fallback = 0) {
  const n = Number(value);
  return Number.isFinite(n) ? n : fallback;
}

export function recordPracticeSession({
  skill,
  level,
  questionCount,
  correctCount,
  incorrectCount,
  purityReport,
  leakDiscardCount,
  purityBelowThreshold,
  durationMs,
  masteryTagsUpdated,
} = {}) {
  const safeQuestionCount = Math.max(0, toNumber(questionCount));
  const safeCorrectCount = Math.max(0, toNumber(correctCount));
  const safeIncorrectCount = Math.max(0, toNumber(incorrectCount));
  const state = readState();
  const sessions = Array.isArray(state.sessions) ? [...state.sessions] : [];

  sessions.push({
    ts: Date.now(),
    skill: safeSkill(skill),
    level: safeLevel(level),
    questionCount: safeQuestionCount,
    correctCount: safeCorrectCount,
    incorrectCount: safeIncorrectCount,
    accuracy: safeQuestionCount > 0 ? Math.round((safeCorrectCount / safeQuestionCount) * 100) : 0,
    durationMs: Math.max(0, toNumber(durationMs)),
    purityOk: Number(purityReport?.bannedRemoved || 0) === 0 && !Boolean(purityBelowThreshold),
    leakDiscardCount: Math.max(0, toNumber(leakDiscardCount)),
    masteryTagsUpdated: Array.isArray(masteryTagsUpdated) ? masteryTagsUpdated.length : Math.max(0, toNumber(masteryTagsUpdated)),
  });

  if (sessions.length > MAX_SESSIONS) {
    sessions.splice(0, sessions.length - MAX_SESSIONS);
  }

  writeState({ sessions });
}

export function getPracticeTelemetrySummary() {
  const sessions = Array.isArray(readState().sessions) ? readState().sessions : [];
  if (!sessions.length) return { totalSessions: 0 };

  const bySkill = {};
  for (const session of sessions) {
    const skill = safeSkill(session.skill);
    if (!bySkill[skill]) {
      bySkill[skill] = {
        count: 0,
        totalAccuracy: 0,
        purityFails: 0,
        leakDiscards: 0,
      };
    }
    bySkill[skill].count += 1;
    bySkill[skill].totalAccuracy += toNumber(session.accuracy);
    if (!session.purityOk) bySkill[skill].purityFails += 1;
    bySkill[skill].leakDiscards += toNumber(session.leakDiscardCount);
  }

  for (const skill of Object.keys(bySkill)) {
    bySkill[skill].averageAccuracy = Math.round(bySkill[skill].totalAccuracy / Math.max(1, bySkill[skill].count));
    bySkill[skill].accuracyMedia = bySkill[skill].averageAccuracy;
    delete bySkill[skill].totalAccuracy;
  }

  const last7 = sessions.slice(-7);
  return {
    totalSessions: sessions.length,
    bySkill,
    last7DaysAccuracy: last7.length
      ? Math.round(last7.reduce((sum, session) => sum + toNumber(session.accuracy), 0) / last7.length)
      : 0,
  };
}

export function clearPracticeTelemetry() {
  writeState({ sessions: [] });
}
