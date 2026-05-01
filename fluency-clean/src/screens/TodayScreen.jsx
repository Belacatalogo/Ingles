import { BookOpen, Brain, ChevronRight, Flame, LineChart, Mic, Quote, Sparkles, Target, Volume2, Zap } from 'lucide-react';
import { LessonGeneratorPanel } from '../components/lesson/LessonGeneratorPanel.jsx';
import { getCurrentLesson } from '../services/lessonStore.js';
import { getLessonStats } from '../services/lessonStats.js';
import { getLessonCompletions, getProgressSummary, hasFlashcardSessionToday, hasSpeakingSessionToday } from '../services/progressStore.js';

const baseTasks = [
  { id: 'lesson', label: 'Aula de hoje', status: 'Aula guiada pela IA', icon: BookOpen, target: 'lesson', color: 'blue' },
  { id: 'cards', label: 'Revisar flashcards', status: 'Aguardando cards reais', icon: Brain, target: 'cards', color: 'violet' },
  { id: 'speaking', label: 'Conversação', status: 'Speaking guiado com IA', time: '~8 min', icon: Mic, target: 'speaking', color: 'teal' },
];

function getGreeting() { const hour = new Date().getHours(); if (hour < 12) return 'Bom dia'; if (hour < 18) return 'Boa tarde'; return 'Boa noite'; }
function getLessonTypeStatus(lesson) { const labels = { reading: 'Reading gerada pela IA', grammar: 'Grammar gerada pela IA', listening: 'Listening gerada pela IA', writing: 'Writing gerada pela IA' }; return labels[lesson?.type] || 'Aula guiada pela IA'; }
function getWeekDaysFromCompletions(completions) {
  const labels = ['Dom', 'Seg', 'Ter', 'Qua', 'Qui', 'Sex', 'Sáb'];
  const today = new Date();
  const start = new Date(today);
  start.setDate(today.getDate() - 4);
  return Array.from({ length: 5 }, (_, index) => {
    const date = new Date(start);
    date.setDate(start.getDate() + index);
    const key = date.toISOString().slice(0, 10);
    const count = completions.filter((item) => String(item.completedAt || '').slice(0, 10) === key).length;
    return { day: labels[date.getDay()], value: Math.min(100, count * 50), label: count ? `${count} aula${count > 1 ? 's' : ''}` : 'sem registro', active: key === today.toISOString().slice(0, 10) };
  });
}
function getTodayLessonCompleted(completions) { const today = new Date().toISOString().slice(0, 10); return completions.some((item) => String(item.completedAt || '').slice(0, 10) === today); }

export function TodayScreen({ onLessonGenerated, onNavigate }) {
  const progress = getProgressSummary();
  const currentLesson = getCurrentLesson();
  const lessonStats = getLessonStats(currentLesson);
  const completions = getLessonCompletions();
  const weekDays = getWeekDaysFromCompletions(completions);
  const lessonDoneToday = getTodayLessonCompleted(completions);
  const cardsDoneToday = hasFlashcardSessionToday();
  const speakingDoneToday = hasSpeakingSessionToday();
  const completed = [lessonDoneToday, cardsDoneToday, speakingDoneToday].filter(Boolean).length;
  const totalTasks = baseTasks.length;
  const percent = Math.max(0, Math.min(100, Math.round((completed / totalTasks) * 100)));
  const streak = progress.streakDays || 0;
  const levelPercent = Math.min(Math.max(progress.xp || 0, 0), 100);
  const cardsAvailable = Array.isArray(currentLesson?.vocabulary) ? currentLesson.vocabulary.length : 0;
  const tasks = baseTasks.map((task) => {
    if (task.id === 'lesson') return { ...task, status: lessonDoneToday ? 'Aula concluída hoje' : currentLesson ? getLessonTypeStatus(currentLesson) : 'Nenhuma aula gerada ainda', time: currentLesson ? `~${lessonStats.minutes} min` : '' };
    if (task.id === 'cards') return { ...task, status: cardsDoneToday ? 'Sessão real concluída hoje' : cardsAvailable ? `${cardsAvailable} cards da aula atual` : 'Nenhum card real disponível ainda', time: cardsDoneToday ? 'feito' : cardsAvailable ? '~5 min' : '' };
    if (task.id === 'speaking') return { ...task, status: speakingDoneToday ? 'Conversação real concluída hoje' : 'Speaking A1 com Azure', time: speakingDoneToday ? 'feito' : '~5 falas' };
    return task;
  });

  return (
    <section className="today-reference-screen">
      <section className="today-hero-card">
        <div className="today-hero-copy"><span>{getGreeting()}, Luis</span><h1><b>{completed || 0} de {totalTasks}</b> tarefas</h1><p>{completed >= totalTasks ? 'Dia completo. Excelente consistência.' : 'Continue para fechar sua rotina de inglês.'}</p></div>
        <div className="today-ring" style={{ '--today-progress': `${percent}%` }}><strong>{percent}%</strong></div>
        <div className="today-hero-actions"><button className="today-primary-action" type="button" onClick={() => onNavigate?.(completed >= 2 ? 'speaking' : 'lesson')}><Zap size={16} /> Continuar agora</button><button className="today-secondary-action" type="button" onClick={() => onNavigate?.('progress')} aria-label="Ver progresso"><LineChart size={16} /></button></div>
      </section>
      <div className="today-summary-grid">
        <article className="today-summary-card"><div className="today-card-heading"><span>Ofensiva</span><Flame size={15} /></div><strong>{streak} <small>dias</small></strong><div className="today-streak-days" aria-hidden="true">{['S', 'T', 'Q', 'Q', 'S', 'S', 'D'].map((day, index) => <div key={`${day}-${index}`}><i className={index < Math.min(streak, 7) ? 'active' : ''} /><span>{day}</span></div>)}</div></article>
        <article className="today-summary-card"><div className="today-card-heading"><span>Nível</span><Target size={15} /></div><strong>A1 <small>→ A2</small></strong><div className="today-level-track"><i style={{ width: `${levelPercent}%` }} /></div><p>{levelPercent}% registrado em XP real</p></article>
      </div>
      <section className="today-section-head"><h2>Tarefas do dia</h2><button type="button" onClick={() => onNavigate?.('settings')}>Personalizar</button></section>
      <div className="today-task-list">{tasks.map((task) => { const Icon = task.icon; return <button className="today-task-card" type="button" key={task.id} onClick={() => onNavigate?.(task.target)}><span className={`today-task-icon ${task.color}`}><Icon size={23} /></span><span className="today-task-copy"><strong>{task.label}</strong><small>{task.status}</small>{task.time ? <em>{task.time}</em> : null}</span><ChevronRight className="today-task-arrow" size={20} /></button>; })}</div>
      <section className="today-week-card"><span>Esta semana</span><strong>Atividade real</strong><p>{completions.length ? 'Baseado nas aulas concluídas.' : 'Sem aulas concluídas ainda.'}</p><b>{completions.length} registro(s)</b><div className="today-week-bars">{weekDays.map((item) => <div key={item.day}><div className="today-week-bar"><i className={item.active ? 'active' : ''} style={{ height: `${item.value}%` }} /></div><strong>{item.day}</strong><small>{item.label}</small></div>)}</div></section>
      <section className="today-quote-card"><Quote size={18} /><p>“The best way to predict the future is to invent it.”</p><span>“A melhor forma de prever o futuro é inventá-lo.”</span><footer><small>— Alan Kay</small><button type="button"><Volume2 size={15} /> Ouvir</button></footer></section>
      <details className="today-generator-details"><summary><Sparkles size={17} /> Gerar nova aula por IA</summary><LessonGeneratorPanel onGenerated={onLessonGenerated} /></details>
    </section>
  );
}
