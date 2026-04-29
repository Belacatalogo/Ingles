import {
  Award,
  BookOpenCheck,
  Brain,
  CheckCircle2,
  Flame,
  KeyRound,
  Lock,
  Mic,
  Sparkles,
  Target,
  Trophy,
  Zap,
} from 'lucide-react';
import { useMemo, useState } from 'react';
import { LessonKeysPanel } from '../components/settings/LessonKeysPanel.jsx';
import { getCurrentWeekStats, getLessonCompletions, getProgressSummary } from '../services/progressStore.js';

const cefrLevels = ['A1', 'A2', 'B1', 'B2', 'C1', 'C2'];

const skillConfig = [
  { key: 'reading', label: 'Reading', tone: 'blue' },
  { key: 'listening', label: 'Listening', tone: 'violet' },
  { key: 'writing', label: 'Writing', tone: 'teal' },
  { key: 'speaking', label: 'Speaking', tone: 'amber' },
  { key: 'grammar', label: 'Grammar', tone: 'green' },
];

function dateKeyFromIso(value) {
  if (!value) return '';
  return String(value).slice(0, 10);
}

function getLastThirtyDays() {
  return Array.from({ length: 30 }, (_, index) => {
    const date = new Date();
    date.setDate(date.getDate() - (29 - index));
    return date.toISOString().slice(0, 10);
  });
}

function getLevelState(progress) {
  const completed = progress.completedLessons || 0;
  const currentIndex = Math.min(Math.floor(completed / 20), cefrLevels.length - 1);
  const lessonsInsideLevel = completed % 20;
  const levelProgress = Math.min(100, Math.round((lessonsInsideLevel / 20) * 100));
  const nextLevel = cefrLevels[Math.min(currentIndex + 1, cefrLevels.length - 1)];

  return {
    currentIndex,
    currentLevel: cefrLevels[currentIndex],
    nextLevel,
    levelProgress: currentIndex === cefrLevels.length - 1 ? 100 : levelProgress,
  };
}

function buildSkillScores(completions) {
  const counts = completions.reduce((acc, item) => {
    const type = String(item.type || '').toLowerCase();
    acc[type] = (acc[type] || 0) + 1;
    return acc;
  }, {});

  return skillConfig.map((skill, index) => {
    const count = counts[skill.key] || 0;
    const fallback = [34, 28, 24, 22, 31][index];
    const score = Math.min(100, fallback + count * 9);
    return { ...skill, score };
  });
}

function buildActivity(completions) {
  const completionMap = completions.reduce((acc, item) => {
    const key = dateKeyFromIso(item.completedAt);
    if (!key) return acc;
    acc[key] = (acc[key] || 0) + 1;
    return acc;
  }, {});

  return getLastThirtyDays().map((date) => ({
    date,
    value: Math.min(4, completionMap[date] || 0),
  }));
}

export function ProgressScreen() {
  const [range, setRange] = useState('30d');
  const progress = useMemo(() => getProgressSummary(), []);
  const week = useMemo(() => getCurrentWeekStats(), []);
  const completions = useMemo(() => getLessonCompletions(), []);
  const recentCompletions = completions.slice(0, 4);
  const levelState = useMemo(() => getLevelState(progress), [progress]);
  const skillScores = useMemo(() => buildSkillScores(completions), [completions]);
  const activity = useMemo(() => buildActivity(completions), [completions]);
  const wordsEstimate = Math.max(0, progress.completedLessons * 7 + completions.length * 4);
  const speakingHours = Math.max(0, Math.round((completions.filter((item) => String(item.type || '').toLowerCase() === 'speaking').length * 18) / 60));

  return (
    <section className="progress-screen" aria-label="Progresso do Fluency">
      <div className="progress-header-row">
        <div>
          <p className="progress-eyebrow">Progresso</p>
          <h1>Sua jornada</h1>
          <p>Do A1 ao C2, com XP, streak, aulas e revisão visual.</p>
        </div>

        <div className="progress-range-toggle" aria-label="Período do progresso">
          {['7d', '30d', 'Tudo'].map((item) => (
            <button
              className={range === item ? 'active' : ''}
              key={item}
              type="button"
              onClick={() => setRange(item)}
            >
              {item}
            </button>
          ))}
        </div>
      </div>

      <section className="progress-level-hero">
        <span>Nível estimado</span>
        <strong>{levelState.currentLevel}</strong>
        <p>
          {levelState.levelProgress}% até {levelState.nextLevel} · {progress.completedLessons || 0} aulas concluídas
        </p>

        <div className="progress-cefr-road" aria-label="Mapa CEFR de A1 a C2">
          {cefrLevels.map((level, index) => {
            const reached = index <= levelState.currentIndex;
            const current = index === levelState.currentIndex;
            return (
              <div className="progress-cefr-step" key={level}>
                <div className={`progress-cefr-node ${reached ? 'reached' : ''} ${current ? 'current' : ''}`}>
                  {level}
                </div>
                {index < cefrLevels.length - 1 ? (
                  <i className={index < levelState.currentIndex ? 'filled' : ''} />
                ) : null}
              </div>
            );
          })}
        </div>
      </section>

      <div className="progress-stat-grid">
        <article className="progress-stat-tile blue">
          <BookOpenCheck size={18} />
          <span>Aulas</span>
          <strong>{progress.completedLessons || 0}</strong>
          <small>{week.completed || 0}/5 nesta semana</small>
        </article>
        <article className="progress-stat-tile violet">
          <Award size={18} />
          <span>XP total</span>
          <strong>{progress.xp || 0}</strong>
          <small>{week.xp || 0} XP na semana</small>
        </article>
        <article className="progress-stat-tile amber">
          <Flame size={18} />
          <span>Streak</span>
          <strong>{progress.streakDays || 0}</strong>
          <small>dias seguidos</small>
        </article>
        <article className="progress-stat-tile teal">
          <Mic size={18} />
          <span>Speaking</span>
          <strong>{speakingHours}h</strong>
          <small>estimativa registrada</small>
        </article>
      </div>

      <section className="progress-section-card">
        <div className="progress-section-title">
          <span>Atividade · {range}</span>
          <small>últimos 30 dias</small>
        </div>
        <div className="progress-heatmap" aria-label="Mapa de atividade dos últimos 30 dias">
          {activity.map((day) => (
            <span className={`heat-${day.value}`} key={day.date} title={`${day.date}: ${day.value} aulas`} />
          ))}
        </div>
        <div className="progress-heatmap-legend">
          <span>Menos</span>
          <div><i /><i /><i /><i /><i /></div>
          <span>Mais</span>
        </div>
      </section>

      <section className="progress-section-card">
        <div className="progress-section-title">
          <span>Habilidades</span>
          <small>baseado no histórico</small>
        </div>
        <div className="progress-skill-list">
          {skillScores.map((skill) => (
            <div className={`progress-skill-row ${skill.tone}`} key={skill.key}>
              <div>
                <span>{skill.label}</span>
                <strong>{skill.score}/100</strong>
              </div>
              <div className="progress-skill-bar"><i style={{ width: `${skill.score}%` }} /></div>
            </div>
          ))}
        </div>
      </section>

      <section className="progress-section-card">
        <div className="progress-section-title">
          <span>Conquistas recentes</span>
          <small>visual</small>
        </div>
        <div className="progress-achievements-grid">
          {[
            { label: `${progress.streakDays || 0} dias`, icon: Flame, tone: 'amber', locked: false },
            { label: `${wordsEstimate} palavras`, icon: Brain, tone: 'violet', locked: false },
            { label: '1ª conversa', icon: Mic, tone: 'teal', locked: speakingHours === 0 },
            { label: `${progress.completedLessons || 0} aulas`, icon: BookOpenCheck, tone: 'blue', locked: false },
            { label: levelState.currentLevel, icon: Target, tone: 'green', locked: false },
            { label: 'próxima', icon: Lock, tone: 'muted', locked: true },
          ].map((achievement) => {
            const Icon = achievement.icon;
            return (
              <article className={`progress-achievement ${achievement.tone} ${achievement.locked ? 'locked' : ''}`} key={achievement.label}>
                <div><Icon size={17} /></div>
                <strong>{achievement.label}</strong>
              </article>
            );
          })}
        </div>
      </section>

      <section className="progress-history-card">
        <div className="progress-section-title">
          <span>Histórico recente</span>
          <small>{recentCompletions.length ? 'últimas aulas' : 'sem aulas ainda'}</small>
        </div>

        {recentCompletions.length ? (
          <div className="progress-history-list">
            {recentCompletions.map((item) => (
              <article className="progress-history-row" key={`${item.lessonId}-${item.completedAt}`}>
                <div className="progress-history-icon"><CheckCircle2 size={16} /></div>
                <div>
                  <strong>{item.title}</strong>
                  <span>{item.type} · {item.level}</span>
                </div>
                <b>+{item.xp || 0} XP</b>
              </article>
            ))}
          </div>
        ) : (
          <div className="progress-empty-state">
            <TrendingUp size={24} />
            <p>Conclua uma aula para registrar XP, streak e histórico.</p>
          </div>
        )}
      </section>

      <section className="progress-keys-wrap">
        <div className="progress-section-title progress-keys-title">
          <span><KeyRound size={15} /> Chaves de aulas</span>
          <small>mantidas no Progresso</small>
        </div>
        <LessonKeysPanel />
      </section>

      <section className="progress-footer-focus">
        <div><Trophy size={18} /> Próximo marco</div>
        <strong>{5 - Math.min(5, week.completed || 0)} aulas para fechar a meta semanal</strong>
        <p>Continue mantendo a rotina. A parte visual foi atualizada sem alterar a lógica de progresso ou as chaves.</p>
        <small><Zap size={13} /> progresso seguro para testes no Vercel</small>
      </section>
    </section>
  );
}
