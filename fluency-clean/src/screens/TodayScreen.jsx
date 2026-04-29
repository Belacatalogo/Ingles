import { BookOpen, Brain, CheckCircle2, ChevronRight, Flame, LineChart, Mic, PencilLine, Quote, Sparkles, Zap } from 'lucide-react';
import { LessonGeneratorPanel } from '../components/lesson/LessonGeneratorPanel.jsx';
import { getProgressSummary } from '../services/progressStore.js';

const tasks = [
  { id: 'lesson', label: 'Aula de hoje', status: 'Reading gerada pela IA', time: '~12 min', icon: BookOpen, target: 'lesson' },
  { id: 'cards', label: 'Revisar flashcards', status: 'Cartas vencendo hoje', time: '~5 min', icon: Brain, target: 'cards' },
  { id: 'speaking', label: 'Conversação', status: 'Speaking guiado com IA', time: '~8 min', icon: Mic, target: 'speaking' },
  { id: 'diary', label: 'Diário em inglês', status: '3 frases sobre seu dia', time: '~3 min', icon: PencilLine, target: 'lesson', done: true },
];

export function TodayScreen({ onLessonGenerated, onNavigate }) {
  const progress = getProgressSummary();
  const completed = Math.min(progress.completedLessons || 0, 4);
  const percent = Math.max(0, Math.min(100, Math.round((completed / 4) * 100)));

  return (
    <section className="screen-stack reference-today-screen">
      <section className="today-progress-hero">
        <div>
          <p>Bom dia, Luis</p>
          <h1>{completed || 0} de 4 tarefas</h1>
          <span>{completed >= 4 ? 'Dia completo. Excelente consistência.' : 'Continue para fechar sua rotina de inglês.'}</span>
          <button className="primary-button reference-continue-button" type="button" onClick={() => onNavigate?.('lesson')}>
            <Zap size={18} /> Continuar agora
          </button>
        </div>
        <div className="progress-ring" style={{ '--progress': `${percent}%` }}>
          <strong>{percent}%</strong>
        </div>
      </section>

      <div className="today-mini-grid">
        <article className="reference-mini-card">
          <span>Ofensiva</span>
          <strong>{progress.streakDays || 0} <small>dias</small></strong>
          <div className="streak-boxes" aria-hidden="true">
            {Array.from({ length: 7 }).map((_, index) => <i className={index < Math.min(progress.streakDays || 0, 7) ? 'active' : ''} key={index} />)}
          </div>
        </article>
        <article className="reference-mini-card">
          <span>Nível</span>
          <strong>A1 <small>→ A2</small></strong>
          <div className="level-progress"><i style={{ width: `${Math.min(12 + (progress.xp || 0), 100)}%` }} /></div>
          <p>{Math.min(12 + (progress.xp || 0), 100)}% até o próximo nível</p>
        </article>
      </div>

      <section className="reference-section-title">
        <h2>Tarefas do dia</h2>
        <button type="button">Personalizar</button>
      </section>

      <div className="reference-task-list">
        {tasks.map((task) => {
          const Icon = task.icon;
          return (
            <button className="reference-task-row" type="button" key={task.id} onClick={() => onNavigate?.(task.target)}>
              <span className={`reference-task-icon ${task.id}`}><Icon size={21} /></span>
              <span className="reference-task-copy">
                <strong>{task.label}</strong>
                <small>{task.status}</small>
              </span>
              <span className="reference-task-time">{task.time}</span>
              {task.done ? <CheckCircle2 className="task-done" size={24} /> : <ChevronRight size={19} />}
            </button>
          );
        })}
      </div>

      <section className="reference-week-card">
        <div>
          <span>Esta semana</span>
          <strong>Foco da semana</strong>
          <p>Speaking sexta + revisão sábado</p>
        </div>
        <b>40 min/dia</b>
        <div className="week-bars">
          {['Seg', 'Ter', 'Qua', 'Qui', 'Sex'].map((day, index) => (
            <div key={day}>
              <i style={{ height: `${52 + index * 6}%` }} />
              <span>{day}</span>
              <small>{index === 4 ? 'Speak' : 'Aula'}</small>
            </div>
          ))}
        </div>
      </section>

      <section className="reference-quote-card">
        <p><Quote size={18} /> “The best way to predict the future is to invent it.”</p>
        <span>“A melhor forma de prever o futuro é inventá-lo.”</span>
        <footer>
          <small>— Alan Kay</small>
          <button type="button"><Sparkles size={17} /> Ouvir</button>
        </footer>
      </section>

      <details className="reference-generator-details">
        <summary><Sparkles size={17} /> Gerar nova aula por IA</summary>
        <LessonGeneratorPanel onGenerated={onLessonGenerated} />
      </details>
    </section>
  );
}
