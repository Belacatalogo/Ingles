import { useMemo, useState } from 'react';
import { CheckCircle2, ClipboardCheck, Lock, PlayCircle, ShieldCheck, Target } from 'lucide-react';
import { getA1CheckpointShellItems } from '../../content/curriculum/levels/A1/a1CheckpointModel.js';
import { getA1CheckpointAttempts, saveAndSyncA1CheckpointAttempt } from '../../services/a1CheckpointAttemptService.js';

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

export function A1CheckpointShell({ onCheckpointSaved }) {
  const checkpoints = useMemo(() => getA1CheckpointShellItems(), []);
  const previousAttempts = useMemo(() => getA1CheckpointAttempts(), []);
  const restoredAnswers = useMemo(() => Object.fromEntries(Object.entries(previousAttempts).map(([checkpointId, attempt]) => [checkpointId, attempt.answers || {}])), [previousAttempts]);
  const firstCheckpointId = checkpoints[0]?.id || '';
  const [activeId, setActiveId] = useState(firstCheckpointId);
  const [activePillarId, setActivePillarId] = useState('grammar');
  const [answers, setAnswers] = useState(restoredAnswers);
  const [result, setResult] = useState(previousAttempts[firstCheckpointId]?.scoring || null);
  const [saveMessage, setSaveMessage] = useState(Object.keys(previousAttempts).length ? 'Tentativa anterior recuperada.' : '');
  const active = checkpoints.find((checkpoint) => checkpoint.id === activeId) || checkpoints[0];
  const activePillar = active?.pillars.find((pillar) => pillar.id === activePillarId) || active?.pillars.find((pillar) => objectivePillars.includes(pillar.id));

  if (!active) return null;

  function changeCheckpoint(checkpointId) {
    setActiveId(checkpointId);
    setActivePillarId('grammar');
    setResult(previousAttempts[checkpointId]?.scoring || null);
    setSaveMessage('');
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
    setSaveMessage('');
  }

  function saveCheckpoint() {
    const attempt = saveAndSyncA1CheckpointAttempt(active.id, answers[active.id] || {});
    setResult(attempt.scoring);
    setSaveMessage('Checkpoint salvo e enviado para os critérios do A1.');
    onCheckpointSaved?.(attempt.scoring);
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

      {saveMessage ? <p className="a1-final-save-message">{saveMessage}</p> : null}

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
          <p>Responda as perguntas abaixo e salve para atualizar os critérios do A1.</p>
          <div className="a1-final-question-list">
            {activePillar.questions.map((question, index) => (
              <label key={question.id} className="a1-final-question-card">
                {question.prompt ? <span>{index + 1}. {question.prompt}</span> : null}
                <QuestionField question={question} value={answers[active.id]?.[question.id]} onChange={(value) => updateAnswer(question.id, value)} />
              </label>
            ))}
          </div>
          <div className="answer-actions">
            <button type="button" className="primary-button" onClick={saveCheckpoint}>
              <PlayCircle size={16} /> Salvar checkpoint
            </button>
          </div>
        </div>
      ) : null}

      {result ? (
        <div className="a1-final-result-card">
          <strong>Resultado do checkpoint</strong>
          <p>Resultado objetivo: {result.percent}% ({result.correct}/{result.total}).</p>
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
