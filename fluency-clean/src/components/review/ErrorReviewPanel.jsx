import { useMemo, useState } from 'react';
import { AlertTriangle, BookOpenCheck, ChevronRight, RefreshCw, ShieldCheck, Target } from 'lucide-react';
import { Card } from '../ui/Card.jsx';
import { getReviewPlanFromErrors } from '../../services/reviewFromErrors.js';
import { openStaticReviewLessonById } from '../../services/staticCourseLauncher.js';

function safeArray(value) { return Array.isArray(value) ? value : []; }

export function ErrorReviewPanel({ onNavigate, compact = false }) {
  const [revision, setRevision] = useState(0);
  const [message, setMessage] = useState('');
  const plan = useMemo(() => getReviewPlanFromErrors({ limit: compact ? 12 : 40 }), [revision, compact]);
  const groups = safeArray(plan.groups).slice(0, compact ? 3 : 8);

  function openReviewLesson(group) {
    const lessonId = group?.reviewLessonIds?.[0] || '';
    if (!lessonId) { setMessage('Nenhuma aula de revisão encontrada para esse erro.'); return; }
    const result = openStaticReviewLessonById(lessonId);
    if (!result.ok) { setMessage(result.reason || 'A aula de revisão ainda não está pronta.'); return; }
    setMessage(`Revisão aberta: ${result.lesson?.title || lessonId}`);
    onNavigate?.('lesson');
  }

  return (
    <section className="error-review-panel-wrap">
      <Card eyebrow="Revisão inteligente" title="Revisão baseada nos seus erros">
        <div className="error-review-summary">
          <Target size={18} />
          <p>{plan.message}</p>
          <button type="button" className="secondary-button" onClick={() => setRevision((value) => value + 1)}><RefreshCw size={15} /> Atualizar</button>
        </div>

        {groups.length ? (
          <div className="error-review-list">
            {groups.map((group) => (
              <article className="error-review-card" key={group.tag}>
                <div className="error-review-card-head">
                  <span><AlertTriangle size={16} /> {group.count} erro(s)</span>
                  <strong>{group.reason}</strong>
                </div>
                {group.prompts?.length ? <p>Exemplo: {group.prompts[0]}</p> : null}
                <div className="error-review-lessons">
                  {safeArray(group.reviewLessons).slice(0, 3).map((lesson) => <small key={lesson.id}><BookOpenCheck size={13} /> {lesson.title}</small>)}
                </div>
                <button type="button" onClick={() => openReviewLesson(group)}>
                  Abrir revisão <ChevronRight size={16} />
                </button>
              </article>
            ))}
          </div>
        ) : (
          <div className="error-review-empty">
            <ShieldCheck size={20} />
            <p>Sem erros suficientes ainda. Faça a Prática Profunda para o sistema montar revisões reais.</p>
          </div>
        )}
        {message ? <p className="generator-message completion-message">{message}</p> : null}
      </Card>
    </section>
  );
}
