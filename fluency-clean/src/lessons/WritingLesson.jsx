import { useState } from 'react';
import { CheckCircle2, Lightbulb, MessageSquareText, PencilLine, Sparkles, Target } from 'lucide-react';
import { completeLesson, getLessonDraft, saveLessonDraft } from '../services/progressStore.js';

const prompts = [
  'Write one sentence about your morning.',
  'Write one sentence about something you usually study.',
  'Write one sentence about your goal for tomorrow.',
];

export function WritingLesson({ lesson }) {
  const [answer, setAnswer] = useState(() => getLessonDraft(lesson?.id || lesson?.title || 'writing'));
  const [message, setMessage] = useState('Escreva com frases simples. Clareza é mais importante que complexidade.');

  function handleSave() {
    saveLessonDraft({ lesson, answer });
    setMessage('Rascunho salvo.');
  }

  function handleComplete() {
    const result = completeLesson({ lesson, writtenAnswer: answer });
    setMessage(result.alreadyCompleted ? 'Aula já estava concluída. Progresso mantido.' : '+25 XP. Writing concluída e progresso salvo.');
  }

  return (
    <article className="pillar-lesson writing-lesson-v1">
      <section className="pillar-card writing-brief-card">
        <div className="pillar-card-title"><PencilLine size={17} /> Escrita guiada</div>
        <h2>{lesson?.title || 'Writing — My simple routine'}</h2>
        <p>Construa frases curtas e corretas antes de tentar escrever textos longos.</p>
        <div className="writing-goal-row">
          <span><Target size={14} /> 3 frases</span>
          <span><Sparkles size={14} /> A1 claro</span>
        </div>
      </section>

      <section className="pillar-card">
        <div className="pillar-card-title"><Lightbulb size={17} /> Roteiro</div>
        <div className="writing-prompt-list">
          {prompts.map((prompt, index) => (
            <div key={prompt}><b>{index + 1}</b><span>{prompt}</span></div>
          ))}
        </div>
      </section>

      <section className="pillar-card writing-editor-card">
        <div className="pillar-card-title"><MessageSquareText size={17} /> Sua resposta</div>
        <textarea
          value={answer}
          onChange={(event) => setAnswer(event.target.value)}
          placeholder="Example: I usually study English in the morning..."
          autoCapitalize="sentences"
          autoCorrect="on"
          spellCheck="true"
        />
        <p>{message}</p>
        <div className="writing-actions">
          <button type="button" onClick={handleSave}><PencilLine size={16} /> Salvar</button>
          <button type="button" onClick={handleComplete}><CheckCircle2 size={16} /> Concluir Writing</button>
        </div>
      </section>
    </article>
  );
}
