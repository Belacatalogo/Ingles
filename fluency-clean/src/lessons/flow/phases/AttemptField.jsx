import { useMemo, useState } from 'react';
import { AlertTriangle, Check, Eye, RotateCcw } from 'lucide-react';
import { PhaseShell } from './PhaseShell.jsx';
import { clean, expectedOf, isCorrect, wordCount } from '../text/normalize.js';

const VAGUE_PATTERNS = [
  /^sim$/i,
  /^não$/i,
  /^yes$/i,
  /^no$/i,
  /^ok$/i,
  /^entendi$/i,
  /^não sei$/i,
  /^sei lá$/i,
  /^algo$/i,
  /^coisa/i,
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
  return clean(value).toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, '').replace(/[^a-z0-9\s]/gi, ' ').replace(/\s+/g, ' ');
}

function buildFeedback({ value, minWords, expected, requiredKeywords }) {
  const words = wordCount(value);
  const normalized = normalize(value);
  const missingKeywords = requiredKeywords.filter((keyword) => !normalized.includes(normalize(keyword)));
  const looksVague = words < Math.max(minWords + 1, 5) || VAGUE_PATTERNS.some((pattern) => pattern.test(clean(value)));

  if (expected && isCorrect(value, expected)) {
    return { status: 'ok', title: 'Resposta correta.', detail: 'Sua resposta bate com o modelo esperado.' };
  }

  if (missingKeywords.length) {
    return {
      status: 'warn',
      title: 'Tentativa registrada, mas falta detalhe importante.',
      detail: `Tente incluir: ${missingKeywords.slice(0, 4).join(', ')}.`,
    };
  }

  if (looksVague) {
    return {
      status: 'warn',
      title: 'Tentativa registrada, mas ficou vaga.',
      detail: 'Escreva uma resposta mais específica, citando exatamente o que você ouviu/leu ou produziu.',
    };
  }

  if (expected) {
    return {
      status: 'ok',
      title: 'Tentativa registrada.',
      detail: 'Compare sua resposta com o modelo esperado abaixo e ajuste mentalmente se necessário.',
    };
  }

  return {
    status: 'ok',
    title: 'Tentativa registrada.',
    detail: 'Boa. Você já pode avançar, mas revise se sua resposta ficou específica o bastante.',
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
  const enoughWords = wordCount(value) >= minWords;
  const feedback = buildFeedback({ value, minWords, expected, requiredKeywords });
  const matched = feedback.status === 'ok';

  function handleCheck() {
    if (!enoughWords) return;
    flow.markAttempt(phase.id, { value, matched, feedback });
  }
  function handleRetry() {
    setValue('');
    flow.setMessage?.('Tente novamente antes de avançar.');
  }

  const Field = multiline ? 'textarea' : 'input';
  const canRetry = attempted && feedback.status === 'warn';

  return (
    <PhaseShell
      eyebrow={eyebrow || 'Sua tentativa'}
      title={clean(item.title || item.prompt || item.question)}
      instruction={instruction || clean(item.instruction)}
      footnote={minWords > 1 ? `Escreva pelo menos ${minWords} palavras antes de conferir.` : null}
      feedback={attempted ? (
        <div className={feedback.status === 'ok' ? 'lesson-phase-feedback ok' : 'lesson-phase-feedback warn'}>
          <p>{feedback.status === 'ok' ? <Check size={14} /> : <AlertTriangle size={14} />} <b>{feedback.title}</b></p>
          {feedback.detail ? <p className="lesson-phase-feedback-detail">{feedback.detail}</p> : null}
          {expected ? <p className="lesson-phase-model-answer"><Eye size={14} /> Modelo: <b>{expected}</b></p> : null}
          {canRetry ? <button type="button" className="lesson-phase-link" onClick={handleRetry}><RotateCcw size={13} /> Melhorar resposta</button> : null}
        </div>
      ) : null}
    >
      <div className="lesson-phase-attempt-row">
        <Field
          className={multiline ? 'lesson-phase-textarea' : 'lesson-phase-input'}
          value={value}
          onChange={(event) => setValue(event.target.value)}
          placeholder={placeholder}
          rows={multiline ? 6 : undefined}
          disabled={attempted && feedback.status === 'ok'}
          autoComplete="off"
          autoCapitalize="off"
          autoCorrect="off"
          spellCheck={false}
        />
        {!attempted || canRetry ? <button type="button" className="lesson-phase-primary" onClick={handleCheck} disabled={!enoughWords}>Conferir</button> : null}
      </div>
    </PhaseShell>
  );
}
