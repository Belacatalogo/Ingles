import {
  AlertTriangle,
  Award,
  BookOpenCheck,
  Brain,
  CheckCircle2,
  Flame,
  Lock,
  Mic,
  Route,
  ShieldCheck,
  Target,
  TrendingUp,
  Trophy,
  Zap,
} from 'lucide-react';
import { useMemo, useState } from 'react';
import { PracticeProgressSummary } from '../components/progress/PracticeProgressSummary.jsx';
import { CURRICULUM_LEVELS, CURRICULUM_PILLARS, getStaticLessons } from '../content/curriculum/index.js';
import { getNextStaticLesson, getStaticCourseSummary } from '../services/curriculumEngine.js';
import { getCompletedLessonIds, isStaticLessonReady } from '../services/lessonProgression.js';
import { getCurrentWeekStats, getLessonCompletions, getProgressSummary } from '../services/progressStore.js';
import { getSpeakingHistorySummary } from '../services/speakingHistory.js';
import { getErrorBankSummary } from '../services/errorBank.js';

const cefrLevels = ['A1', 'A2', 'B1', 'B2', 'C1', 'C2'];
const skillConfig = [
  { key: 'grammar', label: 'Grammar', tone: 'green' },
  { key: 'vocabulary', label: 'Vocabulary', tone: 'indigo' },
  { key: 'reading', label: 'Reading', tone: 'blue' },
  { key: 'listening', label: 'Listening', tone: 'violet' },
  { key: 'speaking', label: 'Speaking', tone: 'amber' },
  { key: 'writing', label: 'Writing', tone: 'teal' },
];

function safeArray(value) { return Array.isArray(value) ? value : []; }
function safeObject(value) { return value && typeof value === 'object' && !Array.isArray(value) ? value : {}; }
function safeNumber(value) { return Number.isFinite(Number(value)) ? Number(value) : 0; }
function clamp(value, min = 0, max = 100) { return Math.max(min, Math.min(max, Math.round(safeNumber(value)))); }
function dateKeyFromIso(value) { return value ? String(value).slice(0, 10) : ''; }
function getLastThirtyDays() {
  return Array.from({ length: 30 }, (_, index) => {
    const date = new Date();
    date.setDate(date.getDate() - (29 - index));
    return date.toISOString().slice(0, 10);
  });
}
function pillarLabel(value) {
  const labels = { grammar: 'Grammar', vocabulary: 'Vocabulary', reading: 'Reading', listening: 'Listening', speaking: 'Speaking', writing: 'Writing' };
  return labels[value] || value || 'Aula';
}
function categoryLabel(value) {
  const labels = { grammar: 'Gramática', vocabulary: 'Vocabulário', pronunciation: 'Pronúncia', listening: 'Listening', reading: 'Reading', writing: 'Writing', practice: 'Prática' };
  return labels[value] || value || 'Erro';
}
function severityLabel(value) {
  if (value === 'high') return 'alta prioridade';
  if (value === 'medium') return 'revisar em breve';
  return 'monitorar';
}
function buildActivity(completions) {
  const completionMap = safeArray(completions).reduce((acc, item) => {
    const key = dateKeyFromIso(item?.completedAt);
    if (!key) return acc;
    acc[key] = (acc[key] || 0) + 1;
    return acc;
  }, {});
  return getLastThirtyDays().map((date) => ({ date, value: Math.min(4, completionMap[date] || 0) }));
}
function buildSkillScores(completions, speakingSummary) {
  const counts = safeArray(completions).reduce((acc, item) => {
    const type = String(item?.type || '').toLowerCase();
    if (type) acc[type] = (acc[type] || 0) + 1;
    return acc;
  }, {});

  return skillConfig.map((skill) => {
    if (skill.key === 'speaking') {
      const count = safeNumber(speakingSummary?.totalSessions);
      const average = safeNumber(speakingSummary?.averageScore);
      const score = count ? clamp(average * 0.8 + Math.min(20, count * 2)) : 0;
      return { ...skill, score, count };
    }
    const count = counts[skill.key] || 0;
    return { ...skill, score: count ? Math.min(100, count * 20) : 0, count };
  });
}
function getStaticLevelRows() {
  const completedIds = getCompletedLessonIds();
  return CURRICULUM_LEVELS.map((level) => {
    const lessons = safeArray(getStaticLessons(level));
    const readyLessons = lessons.filter(isStaticLessonReady);
    const completed = readyLessons.filter((lesson) => completedIds?.has?.(lesson.id)).length;
    const total = readyLessons.length;
    return {
      level,
      ready: total,
      completed,
      percent: total ? Math.round((completed / total) * 100) : 0,
      locked: level !== 'A1' && total === 0,
      current: level === 'A1',
    };
  });
}
function buildCertificationSnapshot(summary, speakingSummary, errorSummary) {
  const completionScore = clamp(summary?.readyPercent || 0);
  const speakingScore = clamp((safeNumber(speakingSummary?.averageScore) || 0) * 0.75 + Math.min(25, safeNumber(speakingSummary?.totalSessions) * 4));
  const errorPenalty = clamp(safeNumber(errorSummary?.highPriority) * 8 + safeNumber(errorSummary?.dueToday) * 3, 0, 40);
  const score = clamp(completionScore * 0.55 + speakingScore * 0.25 + (100 - errorPenalty) * 0.2);
  const readyTotal = safeNumber(summary?.readyTotal);
  const readyCompleted = safeNumber(summary?.readyCompleted);
  const blockers = [];
  if (readyTotal && readyCompleted < readyTotal) blockers.push(`concluir ${readyTotal - readyCompleted} aula(s) pronta(s) do A1.`);
  if (speakingScore < 55) blockers.push('fazer mais Speaking real antes de certificar.');
  if (safeNumber(errorSummary?.highPriority) > 0) blockers.push('reduzir erros de alta prioridade no banco de erros.');
  const status = score >= 85 && blockers.length === 0 ? 'certified' : score >= 70 ? 'ready' : score >= 55 ? 'almost' : 'progressing';
  const label = status === 'certified' ? 'Certificado' : status === 'ready' ? 'Pronto para certificação' : status === 'almost' ? 'Quase pronto' : 'Em andamento';
  return {
    level: summary?.level || 'A1',
    label,
    status,
    score,
    completed: readyCompleted,
    total: readyTotal,
    completionScore,
    speakingScore,
    errorPenalty,
    blockers,
    nextAction: blockers[0] || 'fazer mini prova/certificação final para consolidar o nível.',
    version: 'static-progress-safe-v1',
  };
}
function certificationTone(status) {
  if (status === 'certified') return 'certified';
  if (status === 'ready') return 'ready';
  if (status === 'almost') return 'almost';
  return 'progressing';
}

function CertificationCard({ certification }) {
  return (
    <section className={`progress-section-card level-cert-card ${certificationTone(certification.status)}`}>
      <div className="progress-section-title">
        <span>Certificação por nível</span>
        <small>{certification.version}</small>
      </div>
      <div className="level-cert-hero">
        <div>
          <span>{certification.level} · curso fixo premium</span>
          <strong>{certification.label}</strong>
          <p>{certification.completed}/{certification.total} aulas prontas · nota {certification.score}/100</p>
        </div>
        <b>{certification.score}</b>
      </div>
      <div className="level-cert-metrics">
        <article><span>Curso</span><strong>{certification.completionScore}%</strong></article>
        <article><span>Speaking</span><strong>{certification.speakingScore}%</strong></article>
        <article><span>Erros</span><strong>{certification.errorPenalty ? `-${certification.errorPenalty}` : '0'}</strong></article>
        <article><span>Prontas</span><strong>{certification.total}</strong></article>
      </div>
      {certification.blockers.length ? (
        <div className="level-cert-blockers">
          <span><AlertTriangle size={14} /> Para certificar</span>
          <p>{certification.blockers.slice(0, 3).join(' ')}</p>
        </div>
      ) : (
        <div className="level-cert-ok"><ShieldCheck size={14} /> Dados suficientes para consolidar ou certificar este nível.</div>
      )}
      <small className="level-cert-next">Próxima ação: {certification.nextAction}</small>
    </section>
  );
}

function ErrorBankCard({ summary }) {
  const topErrors = safeArray(summary?.topErrors);
  return (
    <section className="progress-section-card error-bank-card">
      <div className="progress-section-title">
        <span>Banco de erros real</span>
        <small>{summary?.hasData ? `${summary.uniqueErrors} pontos fracos` : 'sem erros registrados'}</small>
      </div>
      {summary?.hasData ? (
        <>
          <div className="speaking-real-metrics">
            <article><span>Erros</span><strong>{summary.totalErrors || 0}</strong></article>
            <article><span>Alta</span><strong>{summary.highPriority || 0}</strong></article>
            <article><span>Hoje</span><strong>{summary.dueToday || 0}</strong></article>
          </div>
          <div className="error-bank-list">
            {topErrors.slice(0, 5).map((item) => (
              <article key={item.id || item.title} className={`error-bank-row ${item.severity || 'low'}`}>
                <AlertTriangle size={15} />
                <div>
                  <strong>{item.title || 'Erro registrado'}</strong>
                  <span>{categoryLabel(item.category)} · {severityLabel(item.severity)} · {item.count || 1}x</span>
                  {item.examples?.[0]?.note ? <p>{item.examples[0].note}</p> : null}
                </div>
              </article>
            ))}
          </div>
        </>
      ) : (
        <div className="progress-empty-state">
          <AlertTriangle size={24} />
          <p>Erros reais vão aparecer aqui quando você errar na prática profunda, pronúncia, imersão ou produção escrita.</p>
        </div>
      )}
    </section>
  );
}

export function ProgressScreen() {
  const [range, setRange] = useState('30d');
  const progress = useMemo(() => safeObject(getProgressSummary()), []);
  const week = useMemo(() => safeObject(getCurrentWeekStats()), []);
  const completions = useMemo(() => safeArray(getLessonCompletions()).filter((item) => item && typeof item === 'object'), []);
  const curriculum = useMemo(() => safeObject(getStaticCourseSummary('A1')), []);
  const next = useMemo(() => safeObject(getNextStaticLesson('A1')), []);
  const levelRows = useMemo(() => getStaticLevelRows(), []);
  const speakingSummary = useMemo(() => safeObject(getSpeakingHistorySummary({ limit: 4 })), []);
  const errorSummary = useMemo(() => safeObject(getErrorBankSummary({ limit: 8 })), []);
  const certification = useMemo(() => buildCertificationSnapshot(curriculum, speakingSummary, errorSummary), [curriculum, speakingSummary, errorSummary]);
  const activity = useMemo(() => buildActivity(completions), [completions]);
  const skillScores = useMemo(() => buildSkillScores(completions, speakingSummary), [completions, speakingSummary]);
  const recentCompletions = completions.slice(0, 4);
  const wordsRegistered = completions.reduce((total, item) => total + String(item.writtenAnswer || '').trim().split(/\s+/).filter(Boolean).length, 0);
  const speakingSessions = safeNumber(speakingSummary.totalSessions);
  const nextLesson = next.lesson || null;

  return (
    <section className="progress-screen" aria-label="Progresso do Fluency">
      <div className="progress-header-row">
        <div>
          <p className="progress-eyebrow">Progresso</p>
          <h1>Sua jornada</h1>
          <p>Do A1 ao C2, com progresso seguro baseado no curso fixo e dados reais.</p>
        </div>
        <div className="progress-range-toggle" aria-label="Período do progresso">
          {['7d', '30d', 'Tudo'].map((item) => (
            <button className={range === item ? 'active' : ''} key={item} type="button" onClick={() => setRange(item)}>{item}</button>
          ))}
        </div>
      </div>

      <section className="progress-level-hero">
        <span>Nível do curso fixo</span>
        <strong>{curriculum.level || 'A1'}</strong>
        <p>{curriculum.readyCompleted || 0}/{curriculum.readyTotal || 0} aulas prontas concluídas · mapa total {curriculum.total || 0}</p>
        <div className="progress-cefr-road" aria-label="Mapa CEFR de A1 a C2">
          {cefrLevels.map((level, index) => {
            const row = levelRows.find((item) => item.level === level) || { locked: true, current: false, percent: 0 };
            return (
              <div className="progress-cefr-step" key={level}>
                <div className={`progress-cefr-node ${!row.locked ? 'reached' : ''} ${row.current ? 'current' : ''}`}>{level}</div>
                {index < cefrLevels.length - 1 ? <i className={row.percent >= 100 ? 'filled' : ''} /> : null}
              </div>
            );
          })}
        </div>
      </section>

      <CertificationCard certification={certification} />

      <section className="progress-section-card curriculum-card">
        <div className="progress-section-title"><span>Trilha obrigatória</span><small>{curriculum.readyCompleted || 0}/{curriculum.readyTotal || 0} prontas</small></div>
        <div className="curriculum-next-lesson">
          <div><Route size={18} /></div>
          <article>
            <span>Próxima aula</span>
            <strong>{nextLesson?.title || 'Aguardando próxima aula pronta'}</strong>
            <p>{nextLesson ? `${nextLesson.level} · ${pillarLabel(nextLesson.pillar)} · ${nextLesson.packageId || 'curso fixo'}` : 'As próximas aulas ainda estão planejadas ou já foram concluídas.'}</p>
            {next.lockReason ? <small>{next.lockReason}</small> : null}
          </article>
        </div>
        <div className="curriculum-upcoming-list">
          {levelRows.map((row) => (
            <article className={row.current ? 'active' : ''} key={row.level}>
              <b>{row.level}</b>
              <div><strong>{row.ready ? `${row.completed}/${row.ready} aulas prontas` : 'planejado'}</strong><span>{row.percent}% concluído</span></div>
              {row.ready ? <CheckCircle2 size={18} /> : <Lock size={15} />}
            </article>
          ))}
        </div>
      </section>

      <div className="progress-stat-grid">
        <article className="progress-stat-tile blue"><BookOpenCheck size={18} /><span>Aulas</span><strong>{progress.completedLessons || 0}</strong><small>{week.completed || 0}/5 nesta semana</small></article>
        <article className="progress-stat-tile violet"><Award size={18} /><span>XP total</span><strong>{progress.xp || 0}</strong><small>{week.xp || 0} XP na semana</small></article>
        <article className="progress-stat-tile amber"><Flame size={18} /><span>Streak</span><strong>{progress.streakDays || 0}</strong><small>dias seguidos</small></article>
        <article className="progress-stat-tile teal"><Mic size={18} /><span>Speaking</span><strong>{speakingSessions}</strong><small>média {speakingSummary.averageScore || 0}/100</small></article>
      </div>

      {speakingSummary.hasData ? (
        <section className="progress-section-card speaking-real-history-card">
          <div className="progress-section-title"><span>Speaking real</span><small>{speakingSummary.trend?.label || 'histórico real'}</small></div>
          <div className="speaking-real-metrics">
            <article><span>Falas</span><strong>{speakingSummary.totalSpoken || 0}</strong></article>
            <article><span>Minutos</span><strong>{speakingSummary.minutes || 0}</strong></article>
            <article><span>Hoje</span><strong>{speakingSummary.todaySessions || 0}</strong></article>
          </div>
          {safeArray(speakingSummary.weakWords).length ? <p>Palavras para revisar: {speakingSummary.weakWords.slice(0, 6).map((item) => item.word).join(', ')}</p> : <p>Nenhuma palavra fraca acumulada ainda.</p>}
        </section>
      ) : null}

      <ErrorBankCard summary={errorSummary} />
      <PracticeProgressSummary />

      <section className="progress-section-card">
        <div className="progress-section-title"><span>Atividade · {range}</span><small>últimos 30 dias</small></div>
        <div className="progress-heatmap" aria-label="Mapa de atividade dos últimos 30 dias">
          {activity.map((day) => <span className={`heat-${day.value}`} key={day.date} title={`${day.date}: ${day.value} aulas`} />)}
        </div>
        <div className="progress-heatmap-legend"><span>Menos</span><div><i /><i /><i /><i /><i /></div><span>Mais</span></div>
      </section>

      <section className="progress-section-card">
        <div className="progress-section-title"><span>Habilidades</span><small>baseado em aulas e dados reais</small></div>
        <div className="progress-skill-list">
          {skillScores.map((skill) => (
            <div className={`progress-skill-row ${skill.tone}`} key={skill.key}>
              <div><span>{skill.label}</span><strong>{skill.count ? `${skill.score}/100` : 'sem dados'}</strong></div>
              <div className="progress-skill-bar"><i style={{ width: `${skill.score}%` }} /></div>
            </div>
          ))}
        </div>
      </section>

      <section className="progress-section-card">
        <div className="progress-section-title"><span>Conquistas recentes</span><small>baseadas no histórico</small></div>
        <div className="progress-achievements-grid">
          {[
            { label: `${progress.streakDays || 0} dias`, icon: Flame, tone: 'amber', locked: !progress.streakDays },
            { label: `${wordsRegistered} palavras`, icon: Brain, tone: 'violet', locked: wordsRegistered === 0 },
            { label: `${speakingSessions} speaking`, icon: Mic, tone: 'teal', locked: speakingSessions === 0 },
            { label: `${errorSummary.uniqueErrors || 0} erros`, icon: AlertTriangle, tone: 'amber', locked: !errorSummary.uniqueErrors },
            { label: certification.label, icon: ShieldCheck, tone: 'green', locked: certification.status === 'progressing' },
            { label: 'próxima', icon: Lock, tone: 'muted', locked: true },
          ].map((achievement) => {
            const Icon = achievement.icon;
            return <article className={`progress-achievement ${achievement.tone} ${achievement.locked ? 'locked' : ''}`} key={achievement.label}><div><Icon size={17} /></div><strong>{achievement.label}</strong></article>;
          })}
        </div>
      </section>

      <section className="progress-history-card">
        <div className="progress-section-title"><span>Histórico recente</span><small>{recentCompletions.length ? 'últimas aulas' : 'sem aulas ainda'}</small></div>
        {recentCompletions.length ? (
          <div className="progress-history-list">
            {recentCompletions.map((item, index) => (
              <article className="progress-history-row" key={`${item.lessonId || item.title || index}-${item.completedAt || index}`}>
                <div className="progress-history-icon"><CheckCircle2 size={16} /></div>
                <div><strong>{item.title || 'Aula concluída'}</strong><span>{item.type || 'lesson'} · {item.level || 'A1'}</span></div>
                <b>+{item.xp || 0} XP</b>
              </article>
            ))}
          </div>
        ) : <div className="progress-empty-state"><TrendingUp size={24} /><p>Conclua uma aula para registrar XP, streak e histórico.</p></div>}
      </section>

      <section className="progress-footer-focus">
        <div><Trophy size={18} /> Próximo marco</div>
        <strong>{certification.nextAction}</strong>
        <p>O cronograma mostra apenas aulas fixas prontas; aulas planejadas não entram mais como conteúdo vazio.</p>
        <small><Zap size={13} /> progresso seguro para testes no Vercel</small>
      </section>
    </section>
  );
}
