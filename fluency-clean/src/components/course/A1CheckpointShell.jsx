import { useMemo, useState } from 'react';
import { CheckCircle2, ClipboardCheck, Lock, PlayCircle, ShieldCheck, Target } from 'lucide-react';
import { getA1CheckpointShellItems, scoreA1CheckpointObjectiveAnswers } from '../../content/curriculum/levels/A1/a1CheckpointModel.js';

const objectivePillars = ['grammar', 'vocabulary', 'reading', 'listening'];

function QuestionField({ question, value, onChange }) {
  if (question.type === 'reading-text' || question.type === 'listening-note') {
    return <blockquote>{question.text}</blockquote>;
  }
  if (question.type === 'multiple-choice') {
    return (
      <div className="a1-final-question-options">
        {question.options.map((option) => (
          <button key={`${question.id}-${option}`} type="button" className={value === option ? 'selected' : ''} onClick={() => onChange(option)}>
            {option}
          </button>
        ))}
      </div>
    );
  }
  return <input className="a1-final-answer-input" value={value || ''} onChange={(event) => onChange(event.target.value)} placeholder="Digite sua resposta" />;
}

export function A1CheckpointShell() {
  const checkpoints = useMemo(() => getA1CheckpointShellItems(), []);
  const [activeId, setActiveId] = useState(checkpoints[0]?.id || '');
  const [activePillarId, setActivePillarId] = useState('grammar');
  const [answers, setAnswers] = useState({});
  const [result, setResult] = useState(null);
  const active = checkpoints.find((checkpoint) => checkpoint.id === activeId) || checkpoints[0];
  const activePillar = active?.pillars.find((pillar) => pillar.id === activePillarId) || active?.pillars.find((pillar) => objectivePillars.includes(pillar.id));

  if (!active) return null;

  function changeCheckpoint(checkpointId) {
    setActiveId(checkpointId);
    setActivePillarId('grammar');
    setResult(null);
  }

  function updateAnswer(questionId, value) {
    setAnswers((current) => ({
      ...current,
      [active.id]: {
        ...(current[active.id] || {}),
        [questionId]: value,
      },
    }));
    setResult(null);
  }

  function calculateResult() {
    setResult(scoreA1CheckpointObjectiveAnswers(active.id, answers[active.id] || {}));
  }

  return (
    <section className="a1-checkpoint-shell-card">
      <header>
        <div className="a1-gate-title">
          <span><ClipboardCheck size={18} /></span>
          <div>
            <strong>Checkpoints do A1</strong>
            <small>Pequenas avaliações para confirmar se você está pronto para continuar.</small>
          </div>
        </div>
        <em><ShieldCheck size={14} /> Meta: {active.passingScore}%</em>
      </header>

      <div className="a1-checkpoint-tabs">
        {checkpoints.map((checkpoint) => (
          <button key={checkpoint.id} type="button" className={checkpoint.id === active.id ? 'active' : ''} onClick={() => changeCheckpoint(checkpoint.id)}>
            {checkpoint.title}
          </button>
        ))}
      </div>

      <div className="a1-checkpoint-active-card">
        <div>
          <strong>{active.title}</strong>
          <small>Libera depois de: {active.unlockAfterUnit}</small>
        </div>
        <p>{active.purpose}</p>
      </div>

      <div className="a1-checkpoint-pillar-list">
        {active.pillars.map((pillar) => (
          <article key={pillar.id}>
            <div>
              <Target size={16} />
              <strong>{pillar.title}</strong>
              {pillar.requiresReview ? <span><Lock size={13} /> Precisa revisão</span> : <span><CheckCircle2 size={13} /> Correção objetiva</span>}
            </div>
            <p>{pillar.target}</p>
            <ul>
              {pillar.tasks.map((task) => <li key={task}>{task}</li>)}
            </ul>
            {objectivePillars.includes(pillar.id) ? <button type="button" onClick={() => setActivePillarId(pillar.id)}>Responder {pillar.title}</button> : null}
          </article>
        ))}
      </div>

      {activePillar ? (
        <div className="a1-checkpoint-question-card">
          <h3>{activePillar.title}</h3>
          <p>Responda as perguntas abaixo. O salvamento definitivo entra no próximo bloco.</p>
          <div className="a1-final-question-list">
            {activePillar.questions.map((question, index) => (
              <label key={question.id} className="a1-final-question-card">
                {question.prompt ? <span>{index + 1}. {question.prompt}</span> : null}
                <QuestionField question={question} value={answers[active.id]?.[question.id]} onChange={(value) => updateAnswer(question.id, value)} />
              </label>
            ))}
          </div>
          <div className="answer-actions">
            <button type="button" className="primary-button" onClick={calculateResult}>
              <PlayCircle size={16} /> Ver resultado deste checkpoint
            </button>
          </div>
        </div>
      ) : null}

      {result ? (
        <div className="a1-final-result-card">
          <strong>Resultado do checkpoint</strong>
          <p>Resultado objetivo: {result.percent}% ({result.correct}/{result.total}). O salvamento entra no próximo bloco.</p>
          <div>
            {Object.entries(result.pillarScores).map(([pillarId, score]) => (
              <span key={pillarId}>{active.pillars.find((pillar) => pillar.id === pillarId)?.title}: <b>{score}%</b></span>
            ))}
          </div>
        </div>
      ) : null}
    </section>
  );
}
