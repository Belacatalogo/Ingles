import { BookOpen, Brain, CheckCircle2, ChevronRight, Flame, LineChart, Mic, PencilLine, Quote, Sparkles, Target, Volume2, Zap } from 'lucide-react';
import { LessonGeneratorPanel } from '../components/lesson/LessonGeneratorPanel.jsx';
import { getProgressSummary } from '../services/progressStore.js';

const tasks = [
  { id: 'lesson', label: 'Aula de hoje', status: 'Reading gerada pela IA', time: '~12 min', icon: BookOpen, target: 'lesson', color: 'blue' },
  { id: 'cards', label: 'Revisar flashcards', status: 'Cartas vencendo hoje', time: '~5 min', icon: Brain, target: 'cards', color: 'violet' },
  { id: 'speaking', label: 'Conversação', status: 'Speaking guiado com IA', time: '~8 min', icon: Mic, target: 'speaking', color: 'teal' },
  { id: 'diary', label: 'Diário em inglês', status: '3 frases sobre seu dia', time: '~3 min', icon: PencilLine, target: 'lesson', color: 'amber', done: true },
];

const weekDays = [
  { day: 'Seg', value: 80, label: 'Aula' },
  { day: 'Ter', value: 60, label: 'Aula' },
  { day: 'Qua', value: 90, label: 'Aula', active: true },
  { day: 'Qui', value: 75, label: 'Aula' },
  { day: 'Sex', value: 30, label: 'Speak' },
];

function getGreeting() {
  const hour = new Date().getHours();
  if (hour < 12) return 'Bom dia';
  if (hour < 18) return 'Boa tarde';
  return 'Boa noite';
}

export function TodayScreen({ onLessonGenerated, onNavigate }) {
  const progress = getProgressSummary();
  const completed = Math.min(progress.completedLessons || 0, 4);
  const percent = Math.max(0, Math.min(100, Math.round((completed / 4) * 100)));
  const streak = progress.streakDays || 0;
  const levelPercent = Math.min(12 + (progress.xp || 0), 100);

  return (
    <section className="today-reference-screen">
      <section className="today-hero-card">
        <div className="today-hero-copy">
          <span>{getGreeting()}, Luis</span>
          <h1><b>{completed || 0} de 4</b> tarefas</h1>
          <p>{completed >= 4 ? 'Dia completo. Excelente consistência.' : 'Continue para fechar sua rotina de inglês.'}</p>
        </div>

        <div className="today-ring" style={{ '--today-progress': `${percent}%` }}>
          <strong>{percent}%</strong>
        </div>

        <div className="today-hero-actions">
          <button className="today-primary-action" type="button" onClick={() => onNavigate?.(completed >= 3 ? 'speaking' : 'lesson')}>
            <Zap size={16} /> Continuar agora
          </button>
          <button className="today-secondary-action" type="button" onClick={() => onNavigate?.('progress')} aria-label="Ver progresso">
            <LineChart size={16} />
          </button>
        </div>
      </section>

      <div className="today-summary-grid">
        <article className="today-summary-card">
          <div className="today-card-heading">
            <span>Ofensiva</span>
            <Flame size={15} />
          </div>
          <strong>{streak} <small>dias</small></strong>
          <div className="today-streak-days" aria-hidden="true">
            {['S', 'T', 'Q', 'Q', 'S', 'S', 'D'].map((day, index) => (
              <div key={`${day}-${index}`}>
                <i className={index < Math.min(streak, 7) ? 'active' : ''} />
                <span>{day}</span>
              </div>
            ))}
          </div>
        </article>

        <article className="today-summary-card">
          <div className="today-card-heading">
            <span>Nível</span>
            <Target size={15} />
          </div>
          <strong>A1 <small>→ A2</small></strong>
          <div className="today-level-track"><i style={{ width: `${levelPercent}%` }} /></div>
          <p>{levelPercent}% até o próximo nível</p>
        </article>
      </div>

      <section className="today-section-head">
        <h2>Tarefas do dia</h2>
        <button type="button" onClick={() => onNavigate?.('settings')}>Personalizar</button>
      </section>

      <div className="today-task-list">
        {tasks.map((task) => {
          const Icon = task.icon;
          return (
            <button className="today-task-card" type="button" key={task.id} onClick={() => onNavigate?.(task.target)}>
              <span className={`today-task-icon ${task.color}`}><Icon size={23} /></span>
              <span className="today-task-copy">
                <strong>{task.label}</strong>
                <small>{task.status}</small>
                <em>{task.time}</em>
              </span>
              {task.done ? <CheckCircle2 className="today-task-done" size={24} /> : <ChevronRight className="today-task-arrow" size={20} />}
            </button>
          );
        })}
      </div>

      <section className="today-week-card">
        <span>Esta semana</span>
        <strong>Foco da semana</strong>
        <p>Speaking sexta + revisão sábado</p>
        <b>40 min/dia</b>
        <div className="today-week-bars">
          {weekDays.map((item) => (
            <div key={item.day}>
              <div className="today-week-bar"><i className={item.active ? 'active' : ''} style={{ height: `${item.value}%` }} /></div>
              <strong>{item.day}</strong>
              <small>{item.label}</small>
            </div>
          ))}
        </div>
      </section>

      <section className="today-quote-card">
        <Quote size={18} />
        <p>“The best way to predict the future is to invent it.”</p>
        <span>“A melhor forma de prever o futuro é inventá-lo.”</span>
        <footer>
          <small>— Alan Kay</small>
          <button type="button"><Volume2 size={15} /> Ouvir</button>
        </footer>
      </section>

      <details className="today-generator-details">
        <summary><Sparkles size={17} /> Gerar nova aula por IA</summary>
        <LessonGeneratorPanel onGenerated={onLessonGenerated} />
      </details>
    </section>
  );
}
