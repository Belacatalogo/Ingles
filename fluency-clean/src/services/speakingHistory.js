import { getSpeakingSessions } from './progressStore.js';

function safeArray(value) { return Array.isArray(value) ? value : []; }
function clamp(value, min = 0, max = 100) { return Math.max(min, Math.min(max, Number(value || 0))); }
function dateKey(value) { return String(value || '').slice(0, 10); }
function todayKey(date = new Date()) { return date.toISOString().slice(0, 10); }
function normalizeWord(value) { return String(value || '').trim().toLowerCase().replace(/[“”"'.,!?;:()]/g, ''); }

function getScore(session) {
  const average = Number(session?.averageScore || 0);
  if (average) return clamp(average);
  const attempts = safeArray(session?.attempts).filter((item) => item?.score != null);
  if (!attempts.length) return 0;
  return Math.round(attempts.reduce((sum, item) => sum + Number(item.score || 0), 0) / attempts.length);
}

function flattenAttempts(sessions) {
  return sessions.flatMap((session) => safeArray(session.attempts).map((attempt) => ({ ...attempt, sessionId: session.id, level: session.level, mode: session.mode, completedAt: session.completedAt, scenario: session.scenario || session.title })));
}

function buildWeakWords(attempts, limit = 8) {
  const map = new Map();
  for (const attempt of attempts) {
    const words = [
      ...safeArray(attempt.weakestWords),
      ...safeArray(attempt.errors).map((item) => ({ word: item.word, score: item.score ?? null, note: item.note })),
      attempt.focusWord ? { word: attempt.focusWord, score: attempt.score ?? null } : null,
    ].filter(Boolean);
    for (const item of words) {
      const key = normalizeWord(item.word);
      if (!key || key.length < 2) continue;
      const previous = map.get(key) || { word: item.word, count: 0, lowestScore: 100, lastSeen: '' };
      const score = item.score == null ? previous.lowestScore : Number(item.score || 0);
      map.set(key, {
        word: item.word,
        count: previous.count + 1,
        lowestScore: Math.min(previous.lowestScore, score || previous.lowestScore),
        lastSeen: attempt.completedAt || previous.lastSeen,
      });
    }
  }
  return Array.from(map.values()).sort((a, b) => b.count - a.count || a.lowestScore - b.lowestScore).slice(0, limit);
}

function buildTrend(sessions) {
  const scored = sessions.map((session) => ({ date: dateKey(session.completedAt), score: getScore(session) })).filter((item) => item.score > 0).reverse();
  if (scored.length < 2) return { direction: 'stable', label: 'sem tendência ainda', delta: 0 };
  const first = scored.slice(0, Math.min(3, scored.length));
  const last = scored.slice(-Math.min(3, scored.length));
  const firstAvg = Math.round(first.reduce((sum, item) => sum + item.score, 0) / first.length);
  const lastAvg = Math.round(last.reduce((sum, item) => sum + item.score, 0) / last.length);
  const delta = lastAvg - firstAvg;
  if (delta >= 5) return { direction: 'up', label: `melhorou ${delta} pontos`, delta };
  if (delta <= -5) return { direction: 'down', label: `caiu ${Math.abs(delta)} pontos`, delta };
  return { direction: 'stable', label: 'estável', delta };
}

export function getSpeakingHistorySummary({ limit = 6 } = {}) {
  const sessions = getSpeakingSessions();
  const today = todayKey();
  const attempts = flattenAttempts(sessions);
  const scoredSessions = sessions.filter((session) => getScore(session) > 0);
  const avg = scoredSessions.length ? Math.round(scoredSessions.reduce((sum, item) => sum + getScore(item), 0) / scoredSessions.length) : 0;
  const totalSpoken = sessions.reduce((sum, session) => sum + Number(session.spokenCount || safeArray(session.attempts).length || 0), 0);
  const totalDurationMs = sessions.reduce((sum, session) => sum + Number(session.durationMs || 0), 0);
  const todaySessions = sessions.filter((session) => dateKey(session.completedAt) === today);
  const byMode = sessions.reduce((acc, session) => {
    const key = session.mode || 'speaking';
    acc[key] = (acc[key] || 0) + 1;
    return acc;
  }, {});
  const lastSession = sessions[0] || null;

  return {
    totalSessions: sessions.length,
    todaySessions: todaySessions.length,
    totalSpoken,
    averageScore: avg,
    totalDurationMs,
    minutes: Math.round(totalDurationMs / 60000),
    weakWords: buildWeakWords(attempts),
    recentSessions: sessions.slice(0, limit),
    lastSession,
    byMode,
    trend: buildTrend(sessions),
    hasData: sessions.length > 0,
  };
}
