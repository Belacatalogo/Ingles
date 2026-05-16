import { useState } from 'react';
import { Check, Lightbulb, X } from 'lucide-react';
import { PhaseShell } from './PhaseShell.jsx';
import { clean, expectedOf, normalizeAnswer } from '../text/normalize.js';

function getOptions(item = {}) {
  if (Array.isArray(item.options)) return item.options;
  if (Array.isArray(item.choices)) return item.choices;
  if (Array.isArray(item.alternatives)) return item.alternatives;
  return [];
}
function getCorrect(item = {}) {
  return expectedOf(item) || item.correct || item.answerKey || item.correctOption || item.correctChoice || '';
}
function getExplanation(item = {}) {
  return clean(item.explanation || item.hint || item.tip || item.note || item.why || item.rationale || '');
}

export function ChoiceField({ phase, flow, item = {}, eyebrow, instruction }) {
  const options = getOptions(item);
  const correctRaw = getCorrect(item);
  const correct = normalizeAnswer(correctRaw);
  const explanation = getExplanation(item);
  const [picked, setPicked] = useState('');
  const attempted = Boolean(flow?.attempts?.[phase.id]);

  function labelOf(option) {
    if (typeof option === 'string') return option;
    return clean(option?.label || option?.text || option?.value || option?.answer);
  }
  function valueOf(option) {
    if (typeof option === 'string') return option;
    return clean(option?.value || option?.label || option?.text || option?.answer);
  }
  function handlePick(option) {
    if (attempted) return;
    const v = valueOf(option);
    setPicked(v);
    const matched = correct ? normalizeAnswer(v) === correct || normalizeAnswer(labelOf(option)) === correct : true;
    flow.markAttempt(phase.id, { value: v, matched });
  }

  const isCorrectPick = attempted && correct && (normalizeAnswer(picked) === correct);
  const feedbackNode = attempted ? (
    <div className={isCorrectPick ? 'lesson-phase-feedback ok' : 'lesson-phase-feedback warn'}>
      {isCorrectPick
        ? <p><Check size={14} /> <b>Resposta correta!</b></p>
        : <p><X size={14} /> <b>A resposta esperada era: {correctRaw}</b></p>}
      {explanation ? (
        <p className={isCorrectPick ? 'lesson-phase-feedback-detail' : 'lesson-phase-feedback-hint'}>
          <Lightbulb size={13} /> {explanation}
        </p>
      ) : null}
    </div>
  ) : null;

  return (
    <PhaseShell
      eyebrow={eyebrow || 'Escolha uma resposta'}
      title={clean(item.question || item.prompt || item.title)}
      instruction={instruction || clean(item.instruction)}
      feedback={feedbackNode}
    >
      <ul className="lesson-phase-choice-list">
        {options.map((option, index) => {
          const v = valueOf(option);
          const isPicked = picked === v;
          const isCorrectOpt = attempted && correct && (normalizeAnswer(v) === correct || normalizeAnswer(labelOf(option)) === correct);
          const isWrong = attempted && isPicked && !isCorrectOpt;
          const cls = isCorrectOpt ? 'correct' : isWrong ? 'wrong' : isPicked ? 'picked' : '';
          return (
            <li key={`${phase.id}-opt-${index}`}>
              <button type="button" className={`lesson-phase-choice ${cls}`} onClick={() => handlePick(option)} disabled={attempted}>
                <span className="lesson-phase-choice-bullet">{String.fromCharCode(65 + index)}</span>
                <span>{labelOf(option)}</span>
              </button>
            </li>
          );
        })}
      </ul>
    </PhaseShell>
  );
}
