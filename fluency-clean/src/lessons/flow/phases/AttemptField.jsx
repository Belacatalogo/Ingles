import { useMemo, useState } from 'react';
import { AlertTriangle, Check, Eye, RotateCcw } from 'lucide-react';
import { PhaseShell } from './PhaseShell.jsx';
import { clean, expectedOf, isCorrect, wordCount } from '../text/normalize.js';

const VAGUE_PATTERNS = [
  /^sim$/i, /^não$/i, /^yes$/i, /^no$/i, /^ok$/i,
  /^entendi$/i, /^não sei$/i, /^sei lá$/i, /^algo$/i, /^coisa/i,
  /\b(coisas?|algo|pessoas?|algu[eé]m)\b/i,
];

function getModelAnswer(item = {}) {
  return expectedOf(item)
    || clean(item.modelAnswer)
    || clean(item.sampleAnswer)
    || clean(item.suggestedAnswer)
    || clean(item.referenceAnswer)
    || clean(item.feedback)
    || clean(item.explanation);
}

function getRequiredKeywords(item = {}) {
  const raw = item.requiredKeywords || item.keywords || item.expectedKeywords || [];
  if (Array.isArray(raw)) return raw.map(clean).filter(Boolean);
  if (typeof raw === 'string') return raw.split(/[,;|]/).map(clean).filter(Boolean);
  return [];
}

function normalize(value = '') {
  return clean(value).toLowerCase()
    .normalize('NFD').replace(/[̀-ͯ]/g, '')
    .replace(/[^a-z0-9\s]/gi, ' ').replace(/\s+/g, ' ');
}

function buildFeedback({ value, minWords, expected, requiredKeywords }) {
  const words = wordCount(value);
  const normalized = normalize(value);
  const missingKeywords = requiredKeywords.filter((kw) => !normalized.includes(normalize(kw)));
  const looksVague = words < Math.max(minWords + 1, 5)
    || VAGUE_PATTERNS.some((p) => p.test(clean(value)));

  if (expected && isCorrect(value, expected)) {
    return { status: 'ok', title: 'Resposta correta!', detail: 'Sua resposta bate com o modelo esperado.' };
  }
  if (missingKeywords.length) {
    return {
      status: 'warn',
      title: 'Tentativa registrada — falta um detalhe.',
      detail: `Tente incluir: ${missingKeywords.slice(0, 4).join(', ')}.`,
    };
  }
  if (looksVague) {
    return {
      status: 'warn',
      title: 'Tentativa registrada — ficou vaga.',
      detail: 'Escreva uma resposta mais específica, citando o que você ouviu, leu ou produziu.',
    };
  }
  if (expected) {
    return {
      status: 'ok',
      title: 'Tentativa registrada.',
      detail: 'Compare com o modelo abaixo e ajuste mentalmente se necessário.',
    };
  }
  return {
    status: 'ok',
    title: 'Tentativa registrada.',
    detail: 'Boa. Avance ou melhore sua resposta se quiser.',
  };
}

export function AttemptField({
  phase, flow, item = {}, multiline = false, minWords = 1,
  placeholder = 'Sua resposta...', instruction, eyebrow,
}) {
  const [value, setValue] = useState('');
  const expected = getModelAnswer(item);
  const requiredKeywords = useMemo(() => getRequiredKeywords(item), [item]);
  const attempted = Boolean(flow?.attempts?.[phase.id]);
  const words = wordCount(value);
  const enoughWords = words >= minWords;
  const feedback = buildFeedback({ value, minWords, expected, requiredKeywords });
  const matched = feedback.status === 'ok';
  const canRetry = attempted && feedback.status === 'warn';

  function handleCheck() {
    if (!enoughWords) return;
    flow.markAttempt(phase.id, { value, matched, feedback });
  }

  function handleRetry() {
    setValue('');
    flow.setMessage?.('Tente novamente antes de avançar.');
  }

  const Field = multiline ? 'textarea' : 'input';
  const isLocked = attempted && feedback.status === 'ok';

  const feedbackNode = attempted ? (
    <div className={feedback.status === 'ok' ? 'lesson-phase-feedback ok' : 'lesson-phase-feedback warn'}>
      <p>
        {feedback.status === 'ok' ? <Check size={14} /> : <AlertTriangle size={14} />}
        {' '}<b>{feedback.title}</b>
      </p>
      {feedback.detail ? <p className="lesson-phase-feedback-detail">{feedback.detail}</p> : null}
      {expected ? (
        <p className="lesson-phase-model-answer">
          <Eye size={13} /> Modelo: <b>{expected}</b>
        </p>
      ) : null}
      {canRetry ? (
        <button type="button" className="lesson-phase-link" onClick={handleRetry}>
          <RotateCcw size={13} /> Melhorar resposta
        </button>
      ) : null}
    </div>
  ) : null;

  return (
    <PhaseShell
      eyebrow={eyebrow || 'Sua tentativa'}
      title={clean(item.title || item.prompt || item.question)}
      instruction={instruction || clean(item.instruction)}
      feedback={feedbackNode}
    >
      <div className="lesson-phase-attempt-row">
        <Field
          className={multiline ? 'lesson-phase-textarea' : 'lesson-phase-input'}
          value={value}
          onChange={(e) => setValue(e.target.value)}
          placeholder={placeholder}
          rows={multiline ? 5 : undefined}
          disabled={isLocked}
          autoComplete="off"
          autoCapitalize="off"
          autoCorrect="off"
          spellCheck={false}
        />
        {multiline && minWords > 1 ? (
          <span className={`lesson-phase-word-count${enoughWords ? ' ok' : ''}`}>
            {words} / {minWords} palavras
          </span>
        ) : null}
        {!isLocked ? (
          <button
            type="button"
            className="lesson-phase-primary"
            onClick={handleCheck}
            disabled={!enoughWords}
          >
            <Check size={15} /> Conferir
          </button>
        ) : null}
      </div>
    </PhaseShell>
  );
}
