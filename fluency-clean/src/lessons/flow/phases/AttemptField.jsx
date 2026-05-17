import { useEffect, useMemo, useState } from 'react';
import { AlertTriangle, Check, Eye, Lightbulb, RotateCcw, Sparkles } from 'lucide-react';
import { PhaseShell } from './PhaseShell.jsx';
import { clean, expectedOf, isCorrect, wordCount } from '../text/normalize.js';
import { analyzeStudentAnswer } from '../../../services/studentAnswerAnalysis/index.js';

const VAGUE_PATTERNS = [
  /^sim$/i, /^não$/i, /^yes$/i, /^no$/i, /^ok$/i,
  /^entendi$/i, /^não sei$/i, /^sei lá$/i, /^algo$/i, /^coisa/i,
  /\b(coisas?|algo|pessoas?|algu[eé]m)\b/i,
];

const KEYWORD_ALIASES = {
  brazil: ['brazil', 'brasil'],
  brasil: ['brasil', 'brazil'],
};

function getModelAnswer(item = {}) {
  return expectedOf(item)
    || clean(item.modelAnswer)
    || clean(item.sampleAnswer)
    || clean(item.suggestedAnswer)
    || clean(item.referenceAnswer);
}

function getHint(item = {}) {
  return clean(item.hint || item.tip || item.explanation || item.note || item.feedback || item.why || '');
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

function getKeywordAlternatives(keyword = '') {
  const normalized = normalize(keyword);
  return KEYWORD_ALIASES[normalized] || [keyword];
}

function containsKeyword(value = '', keyword = '') {
  const normalizedValue = normalize(value);
  return getKeywordAlternatives(keyword).some((option) => {
    const normalizedOption = normalize(option);
    return normalizedOption && normalizedValue.includes(normalizedOption);
  });
}

function isGuidedSubstitution(item = {}) {
  const instruction = normalize(`${item.instruction || ''} ${item.prompt || ''} ${item.question || ''} ${item.title || ''}`);
  return /\b(troque|substitua|mude|replace|change)\b/.test(instruction);
}

function buildFeedback({ value, minWords, expected, requiredKeywords, item }) {
  const words = wordCount(value);
  const guidedSubstitution = isGuidedSubstitution(item);
  const missingKeywords = guidedSubstitution ? [] : requiredKeywords.filter((kw) => !containsKeyword(value, kw));
  const looksVague = !guidedSubstitution && (
    words < Math.max(minWords + 1, 5)
    || VAGUE_PATTERNS.some((p) => p.test(clean(value)))
  );

  if (expected && isCorrect(value, expected)) {
    return { status: 'ok', title: 'Resposta correta!', detail: 'Sua resposta bate com o modelo esperado.' };
  }
  if (missingKeywords.length) {
    return {
      status: 'warn',
      title: 'Resposta registrada — falta um elemento.',
      detail: `Tente incluir: ${missingKeywords.slice(0, 4).join(', ')}.`,
    };
  }
  if (looksVague) {
    return {
      status: 'warn',
      title: 'Resposta registrada — ficou vaga.',
      detail: 'Escreva com mais especificidade. Cite o que você leu, ouviu ou aprendeu.',
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

function getAttemptValue(attempt) {
  return attempt && typeof attempt === 'object' ? String(attempt.value || '') : '';
}

export function AttemptField({
  phase, flow, item = {}, multiline = false, minWords = 1,
  placeholder = 'Sua resposta...', instruction, eyebrow, lesson = null, pillar = 'writing',
}) {
  const currentAttempt = flow?.attempts?.[phase.id];
  const [value, setValue] = useState(() => getAttemptValue(currentAttempt));
  const [aiAnalysis, setAiAnalysis] = useState(null);
  const [aiLoading, setAiLoading] = useState(false);
  const expected = getModelAnswer(item);
  const hint = getHint(item);
  const requiredKeywords = useMemo(() => getRequiredKeywords(item), [item]);
  const attempted = Boolean(currentAttempt);
  const words = wordCount(value);
  const enoughWords = words >= minWords;
  const liveFeedback = buildFeedback({ value, minWords, expected, requiredKeywords, item });
  const feedback = attempted && currentAttempt && typeof currentAttempt === 'object' && currentAttempt.feedback
    ? currentAttempt.feedback
    : liveFeedback;
  const matched = liveFeedback.status === 'ok';
  const canRetry = attempted && feedback.status === 'warn';

  useEffect(() => {
    setValue(getAttemptValue(currentAttempt));
  }, [phase.id, currentAttempt]);

  function handleCheck() {
    if (!enoughWords) return;
    flow.markAttempt(phase.id, { value, matched, feedback: liveFeedback });
  }

  function handleRetry() {
    setValue('');
    setAiAnalysis(null);
    flow.setMessage?.('Tente novamente antes de avançar.');
  }

  async function handleAiAnalyze() {
    if (aiLoading || !value.trim()) return;
    setAiLoading(true);
    setAiAnalysis(null);
    try {
      const result = await analyzeStudentAnswer({
        lesson,
        pillar,
        skill: clean(item.title || item.prompt || item.question || pillar),
        studentText: value,
        prompt: clean(item.prompt || item.question || item.title || ''),
        expectedAnswer: expected,
        allowAi: true,
      });
      setAiAnalysis(result);
    } catch {
      setAiAnalysis({ feedbackPt: 'Não foi possível analisar agora. Continue pela aula.', score: null, source: 'local' });
    } finally {
      setAiLoading(false);
    }
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
      {hint && feedback.status === 'warn' ? (
        <p className="lesson-phase-feedback-hint">
          <Lightbulb size={13} /> {hint}
        </p>
      ) : null}
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

  const isGemini = aiAnalysis?.source === 'gemini';
  const aiAnalysisNode = multiline && attempted ? (
    <div className="lesson-phase-ai-analysis">
      {!aiAnalysis ? (
        <button type="button" className="lesson-phase-link" onClick={handleAiAnalyze} disabled={aiLoading}>
          <Sparkles size={13} /> {aiLoading ? 'Analisando...' : 'Analisar com IA'}
        </button>
      ) : (
        <div className={`lesson-phase-ai-result${isGemini ? ' gemini' : ''}`}>
          <div className="lesson-phase-ai-result-header">
            <Sparkles size={13} />
            <span>IA Tutor</span>
            <span className={`lesson-phase-ai-badge${isGemini ? ' gemini' : ''}`}>
              {isGemini ? 'Gemini' : 'Local'}
            </span>
            {aiAnalysis.score !== null ? (
              <span className="lesson-phase-ai-score">{aiAnalysis.score}/100</span>
            ) : null}
          </div>
          <p className="lesson-phase-ai-feedback">{aiAnalysis.feedbackPt}</p>
          {aiAnalysis.correctedText ? (
            <div className="lesson-phase-ai-corrected">
              <span>Versão sugerida</span>
              <p>{aiAnalysis.correctedText}</p>
            </div>
          ) : null}
          {aiAnalysis.issues?.length ? (
            <ul className="lesson-phase-ai-list">
              {aiAnalysis.issues.map((issue, index) => <li key={index}>{issue}</li>)}
            </ul>
          ) : null}
          {aiAnalysis.nextDrill ? (
            <p className="lesson-phase-ai-drill">
              <Lightbulb size={12} /> {aiAnalysis.nextDrill}
            </p>
          ) : null}
          <button type="button" className="lesson-phase-link" onClick={() => setAiAnalysis(null)}>
            <RotateCcw size={11} /> Nova análise
          </button>
        </div>
      )}
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
      {aiAnalysisNode}
    </PhaseShell>
  );
}
