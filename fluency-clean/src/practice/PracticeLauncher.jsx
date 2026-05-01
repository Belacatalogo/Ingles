import { useMemo, useState } from 'react';
import { CheckCircle2, Dumbbell, PlayCircle } from 'lucide-react';
import { buildPracticeItems } from './PracticeEngine.js';
import { PracticeFullscreen } from './PracticeFullscreen.jsx';

export function PracticeLauncher({ lesson, onComplete }) {
  const [open, setOpen] = useState(false);
  const [summary, setSummary] = useState(null);
  const items = useMemo(() => buildPracticeItems(lesson, { min: 14, max: 36 }), [lesson]);

  function handleComplete(result) {
    setSummary(result);
    onComplete?.(result);
  }

  return (
    <section className="pillar-card practice-launcher-card" id="lesson-practice">
      <div className="pillar-card-title"><Dumbbell size={17} /> Prática profunda</div>
      <h2>Treine o conteúdo da aula</h2>
      <p>Exercícios em tela cheia, uma pergunta por vez, com escuta, escrita, fala, montagem de frases e correção imediata.</p>
      <div className="practice-launcher-meta">
        <span>{items.length} exercícios</span>
        {summary ? <span><CheckCircle2 size={14} /> {summary.correct}/{summary.total} acertos</span> : <span>qualidade filtrada</span>}
      </div>
      <button type="button" className="primary-action" onClick={() => setOpen(true)}>
        <PlayCircle size={18} /> Começar prática
      </button>
      <PracticeFullscreen lesson={lesson} open={open} onClose={() => setOpen(false)} onComplete={handleComplete} />
    </section>
  );
}
