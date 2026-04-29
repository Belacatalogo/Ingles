import { Award, BookOpenCheck, Flame, TrendingUp } from 'lucide-react';
import { useMemo } from 'react';
import { LessonKeysPanel } from '../components/settings/LessonKeysPanel.jsx';
import { Card } from '../components/ui/Card.jsx';
import { StatCard } from '../components/ui/StatCard.jsx';
import { SectionHeader } from '../components/ui/SectionHeader.jsx';
import { getCurrentWeekStats, getLessonCompletions, getProgressSummary } from '../services/progressStore.js';

export function ProgressScreen() {
  const progress = useMemo(() => getProgressSummary(), []);
  const week = useMemo(() => getCurrentWeekStats(), []);
  const completions = useMemo(() => getLessonCompletions(), []);
  const recentCompletions = completions.slice(0, 5);

  return (
    <section className="screen-stack">
      <SectionHeader
        eyebrow="Progresso"
        title="Evolução visível e organizada"
        description="Acompanhe XP, streak, histórico de aulas e chaves exclusivas para geração de aulas."
      />

      <div className="stats-grid">
        <StatCard label="XP total" value={String(progress.xp)} hint="salvo localmente" icon={Award} />
        <StatCard label="Aulas" value={`${week.completed}/5`} hint="semana atual" icon={BookOpenCheck} />
        <StatCard label="Streak" value={`${progress.streakDays} dias`} hint={progress.lastStudyDate || 'sem registro'} icon={Flame} />
      </div>

      <LessonKeysPanel />

      <Card eyebrow="Mapa CEFR" title="A1 → C2">
        <div className="level-track">
          {['A1', 'A2', 'B1', 'B2', 'C1', 'C2'].map((level, index) => (
            <div className={index === 0 ? 'level-node active' : 'level-node'} key={level}>
              <span>{level}</span>
            </div>
          ))}
        </div>
        <div className="progress-line"><span style={{ width: `${Math.min(8 + progress.completedLessons * 2, 100)}%` }} /></div>
      </Card>

      <Card eyebrow="Histórico" title="Aulas concluídas">
        {recentCompletions.length ? (
          <div className="completion-list">
            {recentCompletions.map((item) => (
              <article className="completion-row" key={`${item.lessonId}-${item.completedAt}`}>
                <div>
                  <strong>{item.title}</strong>
                  <span>{item.type} · {item.level}</span>
                </div>
                <b>+{item.xp || 0} XP</b>
              </article>
            ))}
          </div>
        ) : (
          <div className="empty-state compact">
            <TrendingUp size={22} />
            <p>Conclua uma aula para registrar XP, streak e histórico.</p>
          </div>
        )}
      </Card>
    </section>
  );
}
