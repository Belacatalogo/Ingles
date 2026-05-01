import {
  Award,
  BookOpenCheck,
  Brain,
  CheckCircle2,
  ChevronRight,
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
import { CURRICULUM_LEVELS, getCurriculumLessons, getCurriculumProgress, getCurriculumSummary } from '../services/curriculumPlan.js';
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

function buildSkillScores(completions) {
  const counts = completions.reduce((acc, item) => {
    const type = String(item.type || '').toLowerCase();
    acc[type] = (acc[type] || 0) + 1;
    return acc;
  }, {});

  return skillConfig.map((skill) => {
    const count = counts[skill.key] || 0;
    const score = count ? Math.min(100, count * 20) : 0;
    return { ...skill, score, count };
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

function getCurriculumLevelRows(curriculumProgress) {
  const completed = new Set(curriculumProgress.completedIds || []);
  const allLessons = getCurriculumLessons();
  const nextLesson = getCurriculumSummary().nextLesson;
  const currentLevel = nextLesson?.level || 'A1';
  const currentLevelIndex = cefrLevels.indexOf(currentLevel);

  return CURRICULUM_LEVELS.map((level, index) => {
    const lessons = allLessons.filter((lesson) => lesson.level === level.level);
    const done = lessons.filter((lesson) => completed.has(lesson.id)).length;
    const total = lessons.length || 1;
    const percent = Math.round((done / total) * 100);
    const locked = index > currentLevelIndex;
    const current = level.level === currentLevel;
    const completeEnough = percent >= Math.round(level.requiredCompletion * 100);

    return {
      ...level,
      done,
      total,
      percent,
      locked,
      current,
      completeEnough,
    };
  });
}

function getUpcomingLessons(curriculumProgress, limit = 5) {
  const completed = new Set(curriculumProgress.completedIds || []);
  return getCurriculumLessons().filter((lesson) => !completed.has(lesson.id)).slice(0, limit);
}

export function ProgressScreen() {
  const [range, setRange] = useState('30d');
  const progress = useMemo(() => getProgressSummary(), []);
  const week = useMemo(() => getCurrentWeekStats(), []);
  const completions = useMemo(() => getLessonCompletions(), []);
  const curriculum = useMemo(() => getCurriculumSummary(), []);
  const curriculumProgress = useMemo(() => getCurriculumProgress(), []);
  const curriculumLevels = useMemo(() => getCurriculumLevelRows(curriculumProgress), [curriculumProgress]);
  const upcomingLessons = useMemo(() => getUpcomingLessons(curriculumProgress), [curriculumProgress]);
  const recentCompletions = completions.slice(0, 4);
  const skillScores = useMemo(() => buildSkillScores(completions), [completions]);
  const activity = useMemo(() => buildActivity(completions), [completions]);
  const wordsRegistered = completions.reduce((total, item) => total + String(item.writtenAnswer || '').trim().split(/\s+/).filter(Boolean).length, 0);
  const speakingSessions = completions.filter((item) => String(item.type || '').toLowerCase() === 'speaking').length;
  const nextLesson = curriculum.nextLesson;
  const currentLevelData = curriculumLevels.find((item) => item.current) || curriculumLevels[0];
  const lessonsToUnlock = Math.max(0, Math.ceil((currentLevelData?.total || 1) * (currentLevelData?.requiredCompletion || 0.92)) - (currentLevelData?.done || 0));

  return (
    <section className="progress-screen" aria-label="Progresso do Fluency">
      <div className="progress-header-row">
        <div>
          <p className="progress-eyebrow">Progresso</p>
          <h1>Sua jornada</h1>
          <p>Do A1 ao C2, com cronograma, pré-requisitos, revisão e geração guiada.</p>
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
        <span>Nível do cronograma</span>
        <strong>{curriculum.currentLevel}</strong>
        <p>
          {curriculum.completedInLevel}/{curriculum.levelTotal} aulas do nível · {curriculum.levelProgress}% concluído
        </p>

        <div className="progress-cefr-road" aria-label="Mapa CEFR de A1 a C2">
          {cefrLevels.map((level, index) => {
            const row = curriculumLevels.find((item) => item.level === level);
            const reached = !row?.locked;
            const current = row?.current;
            return (
              <div className="progress-cefr-step" key={level}>
                <div className={`progress-cefr-node ${reached ? 'reached' : ''} ${current ? 'current' : ''}`}>
                  {level}
                </div>
                {index < cefrLevels.length - 1 ? (
                  <i className={row?.completeEnough ? 'filled' : ''} />
                ) : null}
              </div>
            );
          })}
        </div>
      </section>

      <section className="progress-section-card curriculum-card">
        <div className="progress-section-title">
          <span>Trilha obrigatória</span>
          <small>{curriculum.completedTotal}/{curriculum.totalLessons} aulas</small>
        </div>

        <div className="curriculum-next-lesson">
          <div>
            <Route size={18} />
          </div>
          <article>
            <span>Próxima aula</span>
            <strong>{nextLesson?.title || 'Cronograma concluído'}</strong>
            <p>{nextLesson ? `${nextLesson.level} · ${nextLesson.type} · ${nextLesson.unitTitle}` : 'Todas as aulas planejadas foram concluídas.'}</p>
          </article>
        </div>

        <div className="curriculum-level-list">
          {curriculumLevels.map((level) => (
            <article className={`curriculum-level-row ${level.current ? 'current' : ''} ${level.locked ? 'locked' : ''}`} key={level.level}>
              <div>
                {level.locked ? <Lock size={15} /> : level.completeEnough ? <ShieldCheck size={15} /> : <Target size={15} />}
              </div>
              <section>
                <header>
                  <strong>{level.level} · {level.title}</strong>
                  <span>{level.done}/{level.total}</span>
                </header>
                <i><b style={{ width: `${level.percent}%` }} /></i>
                <p>
                  {level.locked
                    ? 'Bloqueado até consolidar o nível anterior.'
                    : level.current
                      ? `${lessonsToUnlock} aulas/revisões até liberar o próximo nível.`
                      : 'Nível consolidado ou já percorrido.'}
                </p>
              </section>
            </article>
          ))}
        </div>
      </section>

      <section className="progress-section-card curriculum-card">
        <div className="progress-section-title">
          <span>Próximas aulas</span>
          <small>sem atropelar conteúdo</small>
        </div>
        <div className="curriculum-upcoming-list">
          {upcomingLessons.map((lesson, index) => (
            <article className={index === 0 ? 'active' : ''} key={lesson.id}>
              <b>{index + 1}</b>
              <div>
                <strong>{lesson.title}</strong>
                <span>{lesson.level} · {lesson.type} · {lesson.unitTitle}</span>
              </div>
              {index === 0 ? <ChevronRight size={18} /> : <Lock size={15} />}
            </article>
          ))}
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
          <strong>{speakingSessions}</strong>
          <small>sessões registradas</small>
        </article>
      </div>

      <PracticeProgressSummary />

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
          <small>baseado em aulas concluídas</small>
        </div>
        <div className="progress-skill-list">
          {skillScores.map((skill) => (
            <div className={`progress-skill-row ${skill.tone}`} key={skill.key}>
              <div>
                <span>{skill.label}</span>
                <strong>{skill.count ? `${skill.score}/100` : 'sem dados'}</strong>
              </div>
              <div className="progress-skill-bar"><i style={{ width: `${skill.score}%` }} /></div>
            </div>
          ))}
        </div>
      </section>

      <section className="progress-section-card">
        <div className="progress-section-title">
          <span>Conquistas recentes</span>
          <small>baseadas no histórico</small>
        </div>
        <div className="progress-achievements-grid">
          {[
            { label: `${progress.streakDays || 0} dias`, icon: Flame, tone: 'amber', locked: !progress.streakDays },
            { label: `${wordsRegistered} palavras`, icon: Brain, tone: 'violet', locked: wordsRegistered === 0 },
            { label: `${speakingSessions} speaking`, icon: Mic, tone: 'teal', locked: speakingSessions === 0 },
            { label: `${progress.completedLessons || 0} aulas`, icon: BookOpenCheck, tone: 'blue', locked: !progress.completedLessons },
            { label: curriculum.currentLevel, icon: Target, tone: 'green', locked: false },
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

      <section className="progress-footer-focus">
        <div><Trophy size={18} /> Próximo marco</div>
        <strong>{lessonsToUnlock} aulas/revisões para liberar o próximo nível</strong>
        <p>O cronograma escolhe a próxima aula em ordem, respeitando pré-requisitos e consolidação de nível.</p>
        <small><Zap size={13} /> progresso seguro para testes no Vercel</small>
      </section>
    </section>
  );
}
