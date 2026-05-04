import { useEffect, useMemo, useState } from 'react';
import { playLearningAudio } from '../services/audioPlayback.js';
import { buildPracticeItems, evaluatePracticeAnswer, normalizeForPractice } from './PracticePlanAdapter.js';
import { AudioPrompt } from './components/AudioPrompt.jsx';
import { ChoiceGrid } from './components/ChoiceGrid.jsx';
import { NewContextExercise } from './components/NewContextExercise.jsx';
import { PracticeDone } from './components/PracticeDone.jsx';
import { PracticeFeedback } from './components/PracticeFeedback.jsx';
import { PracticeHeader, LivesBar } from './components/PracticeHeader.jsx';
import { PracticeIntro } from './components/PracticeIntro.jsx';
import { SpeakExercise } from './components/SpeakExercise.jsx';
import { TextExercise } from './components/TextExercise.jsx';
import { WordBankExercise } from './components/WordBankExercise.jsx';
import { PRACTICE_EVENTS, PRACTICE_STATES, usePracticeStateMachine } from './core/PracticeStateMachine.js';

const STARTING_LIVES = 5;
const CHECKING_DELAY_MS = 80;
const TRANSITION_DELAY_MS = 140;

function getSpeechRecognition() {
  return window.SpeechRecognition || window.webkitSpeechRecognition || null;
}

function clean(value) {
  return String(value ?? '').trim();
}

function getPracticeSkillLabel(lesson) {
  const type = String(lesson?.type || '').toLowerCase();
  if (type.includes('listening')) return 'Escuta ativa';
  if (type.includes('speaking')) return 'Fala guiada';
  if (type.includes('reading')) return 'Leitura profunda';
  if (type.includes('grammar')) return 'Gramática prática';
  if (type.includes('writing')) return 'Escrita guiada';
  return 'Prática guiada';
}

function getQuestionActionLabel(type) {
  if (type === 'dictation') return 'Conferir escrita';
  if (type === 'wordBank') return 'Conferir frase';
  if (type === 'speak') return 'Conferir fala';
  if (type === 'write') return 'Conferir resposta';
  if (type === 'newContext') return 'Confirmar';
  return 'Verificar';
}

function canSubmitQuestion(current, value, wordBankValue) {
  if (!current) return false;
  if (['choice', 'listenChoice', 'fillBlank'].includes(current.type)) return true;
  if (current.type === 'wordBank') return Boolean(clean(wordBankValue.join(' ')));
  if (current.type === 'newContext') return false;
  return Boolean(clean(value));
}

function buildStablePracticeItems(lesson) {
  return buildPracticeItems(lesson, { min: 14, max: 36 }).map((item, index) => ({
    ...item,
    sessionOrder: index + 1,
  }));
}

function isPracticeActive(state) {
  return [
    PRACTICE_STATES.PRESENTING,
    PRACTICE_STATES.ANSWERING,
    PRACTICE_STATES.CHECKING,
    PRACTICE_STATES.FEEDBACK,
    PRACTICE_STATES.TRANSITIONING,
    PRACTICE_STATES.SAVING,
  ].includes(state);
}

function mergeTouchedMasteryTags(previousTags, nextTags) {
  const byTag = new Map();
  [...previousTags, ...(Array.isArray(nextTags) ? nextTags : [])].forEach((tag) => {
    if (tag?.tag) byTag.set(tag.tag, tag);
  });
  return Array.from(byTag.values())
    .sort((left, right) => Number(left.mastery || 0) - Number(right.mastery || 0))
    .slice(0, 6);
}

export function PracticeFullscreen({ lesson, open, onClose, onComplete }) {
  const { state, dispatch, can, reset } = usePracticeStateMachine();
  const [sessionItems, setSessionItems] = useState([]);
  const [index, setIndex] = useState(0);
  const [value, setValue] = useState('');
  const [wordBankValue, setWordBankValue] = useState([]);
  const [feedback, setFeedback] = useState(null);
  const [results, setResults] = useState([]);
  const [hintVisible, setHintVisible] = useState(false);
  const [listening, setListening] = useState(false);
  const [lives, setLives] = useState(STARTING_LIVES);
  const [reviewMode, setReviewMode] = useState(false);
  const [touchedMasteryTags, setTouchedMasteryTags] = useState([]);
  const lessonKey = `${lesson?.id || lesson?.title || 'lesson'}-${lesson?.generationMeta?.id || ''}`;

  useEffect(() => {
    if (!open) return;

    const nextItems = buildStablePracticeItems(lesson);
    setSessionItems(nextItems);
    setIndex(0);
    setValue('');
    setWordBankValue([]);
    setFeedback(null);
    setResults([]);
    setHintVisible(false);
    setLives(STARTING_LIVES);
    setReviewMode(false);
    setTouchedMasteryTags([]);
    reset({ lessonKey, lessonId: lesson?.id || null, total: nextItems.length });
    dispatch(PRACTICE_EVENTS.PLAN_LOADED, { lessonKey, lessonId: lesson?.id || null, total: nextItems.length });
  }, [open, lessonKey, lesson, reset, dispatch]);

  const items = sessionItems;
  const current = items[index];
  const started = isPracticeActive(state) || state === PRACTICE_STATES.DONE;
  const done = state === PRACTICE_STATES.DONE;
  const checking = state === PRACTICE_STATES.CHECKING;
  const visibleFeedback = state === PRACTICE_STATES.FEEDBACK ? feedback : null;
  const correctCount = results.filter((result) => result.correct).length;
  const mistakeCount = results.filter((result) => !result.correct).length;
  const progress = items.length ? Math.round((Math.min(index, items.length) / items.length) * 100) : 0;
  const skillLabel = useMemo(() => getPracticeSkillLabel(lesson), [lessonKey, lesson]);

  useEffect(() => {
    if (!open || state !== PRACTICE_STATES.SAVING) return;
    onComplete?.({ total: items.length, correct: correctCount, mistakes: mistakeCount, lives, reviewMode, results, touchedMasteryTags });
    dispatch(PRACTICE_EVENTS.SAVE_DONE, { savedAt: Date.now() });
  }, [open, state, items.length, correctCount, mistakeCount, lives, reviewMode, results, touchedMasteryTags, onComplete, dispatch]);

  if (!open) return null;

  async function playAudio(text) {
    if (!text) return;
    setListening(true);
    await playLearningAudio({
      text,
      label: 'Prática fullscreen',
      voiceName: 'Kore',
      style: 'Natural clear A1 English practice voice. Human rhythm, not robotic.',
      preferNatural: true,
      allowBrowserFallback: true,
    });
    setListening(false);
  }

  function commitEvaluation(evaluation, finalValue) {
    if (evaluation.retryable) {
      setFeedback({ ...evaluation, near: true, message: 'Quase certo. Ajuste só um detalhe.', lifeLost: false });
      dispatch(PRACTICE_EVENTS.CHECK_DONE, { answer: finalValue, retryable: true });
      return;
    }

    const lifeLost = evaluation.loseLife ?? !evaluation.correct;
    let nextLives = lives;
    if (lifeLost) {
      nextLives = Math.max(0, lives - 1);
      setLives(nextLives);
      if (nextLives <= 0) setReviewMode(true);
    }

    setTouchedMasteryTags((previous) => mergeTouchedMasteryTags(previous, evaluation.touchedMasteryTags));
    setFeedback({
      ...evaluation,
      lifeLost,
      message: evaluation.correct ? 'Muito bem!' : nextLives <= 0 ? 'Sem vidas. Agora é revisão.' : 'Vamos revisar.',
    });
    setResults((currentResults) => [...currentResults, {
      id: current.id,
      type: current.type,
      correct: evaluation.correct,
      answer: finalValue,
      expected: evaluation.expected || current.answer,
      lifeLost,
      sourceEngine: current.sourceEngine,
    }]);
    dispatch(PRACTICE_EVENTS.CHECK_DONE, { answer: finalValue, correct: evaluation.correct, lifeLost });
  }

  function submit(nextValue = value) {
    if (!current || !can(PRACTICE_EVENTS.USER_SUBMITTED)) return;
    const finalValue = current.type === 'wordBank' ? wordBankValue.join(' ') : nextValue;
    const evaluation = evaluatePracticeAnswer(current, finalValue);
    if (evaluation.empty) return;

    const submitted = dispatch(PRACTICE_EVENTS.USER_SUBMITTED, { answer: finalValue, questionId: current.id });
    if (!submitted.ok) return;

    window.setTimeout(() => {
      commitEvaluation(evaluation, finalValue);
    }, CHECKING_DELAY_MS);
  }

  function continueNext() {
    if (state !== PRACTICE_STATES.FEEDBACK) return;

    if (index + 1 >= items.length) {
      dispatch(PRACTICE_EVENTS.ALL_DONE, { completedAt: Date.now() });
      return;
    }

    const moved = dispatch(PRACTICE_EVENTS.NEXT, { fromIndex: index, toIndex: index + 1 });
    if (!moved.ok) return;

    window.setTimeout(() => {
      setIndex((currentIndex) => currentIndex + 1);
      setValue('');
      setWordBankValue([]);
      setFeedback(null);
      setHintVisible(false);
      dispatch(PRACTICE_EVENTS.PLAN_LOADED, { currentIndex: index + 1 });
    }, TRANSITION_DELAY_MS);
  }

  function retry() {
    if (state !== PRACTICE_STATES.FEEDBACK || !feedback?.near) return;
    setFeedback(null);
    setHintVisible(false);
    dispatch(PRACTICE_EVENTS.NEXT, { retry: true, currentIndex: index });
    window.setTimeout(() => {
      dispatch(PRACTICE_EVENTS.PLAN_LOADED, { currentIndex: index });
    }, TRANSITION_DELAY_MS);
  }

  function markInteracted(payload = {}) {
    if (state === PRACTICE_STATES.PRESENTING && can(PRACTICE_EVENTS.USER_INTERACTED)) {
      dispatch(PRACTICE_EVENTS.USER_INTERACTED, payload);
    }
  }

  function selectOption(option) {
    setValue(option);
    markInteracted({ interaction: 'choice', questionId: current?.id });
    window.setTimeout(() => submit(option), 0);
  }

  function changeText(nextValue) {
    setValue(nextValue);
    markInteracted({ interaction: 'text', questionId: current?.id });
  }

  function changeWordBank(nextValue) {
    setWordBankValue(nextValue);
    markInteracted({ interaction: 'word_bank', questionId: current?.id });
  }

  function speak() {
    markInteracted({ interaction: 'speech', questionId: current?.id });
    const SpeechRecognition = getSpeechRecognition();
    if (!SpeechRecognition) {
      setFeedback({ correct: false, empty: true, message: 'Digite o que você falou.', lifeLost: false });
      dispatch(PRACTICE_EVENTS.USER_SUBMITTED, { fallback: 'text_input_required' });
      dispatch(PRACTICE_EVENTS.CHECK_DONE, { fallback: 'text_input_required' });
      return;
    }
    try {
      const recognition = new SpeechRecognition();
      recognition.lang = 'en-US';
      recognition.interimResults = false;
      recognition.maxAlternatives = 1;
      recognition.onresult = (event) => {
        const transcript = event.results?.[0]?.[0]?.transcript || '';
        setValue(transcript);
        submit(transcript);
      };
      recognition.onerror = () => {
        setFeedback({ correct: false, empty: true, message: 'Digite o que você falou.', lifeLost: false });
        if (state === PRACTICE_STATES.ANSWERING) {
          dispatch(PRACTICE_EVENTS.USER_SUBMITTED, { fallback: 'speech_error' });
          dispatch(PRACTICE_EVENTS.CHECK_DONE, { fallback: 'speech_error' });
        }
      };
      recognition.start();
    } catch {
      setFeedback({ correct: false, empty: true, message: 'Digite o que você falou.', lifeLost: false });
      if (state === PRACTICE_STATES.ANSWERING) {
        dispatch(PRACTICE_EVENTS.USER_SUBMITTED, { fallback: 'speech_unavailable' });
        dispatch(PRACTICE_EVENTS.CHECK_DONE, { fallback: 'speech_unavailable' });
      }
    }
  }

  function startPractice() {
    dispatch(PRACTICE_EVENTS.START, { startedAt: Date.now() });
  }

  function restart() {
    const nextItems = buildStablePracticeItems(lesson);
    setSessionItems(nextItems);
    setIndex(0);
    setValue('');
    setWordBankValue([]);
    setFeedback(null);
    setResults([]);
    setHintVisible(false);
    setLives(STARTING_LIVES);
    setReviewMode(false);
    setTouchedMasteryTags([]);
    reset({ lessonKey, lessonId: lesson?.id || null, total: nextItems.length });
    dispatch(PRACTICE_EVENTS.PLAN_LOADED, { lessonKey, lessonId: lesson?.id || null, total: nextItems.length });
  }

  function closePractice() {
    if (state !== PRACTICE_STATES.DONE && state !== PRACTICE_STATES.ABORTED && can(PRACTICE_EVENTS.ABORT)) {
      dispatch(PRACTICE_EVENTS.ABORT, { abortedAt: Date.now(), partialResults: results, currentIndex: index });
    }
    onClose?.();
  }

  function finish() {
    onClose?.();
  }

  const canSubmit = state === PRACTICE_STATES.ANSWERING && canSubmitQuestion(current, value, wordBankValue) && !checking;

  return (
    <div className="practice-fullscreen" role="dialog" aria-modal="true">
      <div className="practice-ambient practice-ambient-one" />
      <div className="practice-ambient practice-ambient-two" />

      <PracticeHeader
        done={done}
        started={started}
        progress={progress}
        index={index}
        total={items.length}
        correctCount={correctCount}
        onClose={closePractice}
      />

      {started && !done ? <LivesBar lives={lives} reviewMode={reviewMode} /> : null}

      {state === PRACTICE_STATES.READY ? (
        <PracticeIntro
          skillLabel={skillLabel}
          total={items.length}
          level={lesson?.level}
          startingLives={STARTING_LIVES}
          onStart={startPractice}
        />
      ) : done ? (
        <PracticeDone
          reviewMode={reviewMode}
          correctCount={correctCount}
          total={items.length}
          lives={lives}
          touchedMasteryTags={touchedMasteryTags}
          onRestart={restart}
          onFinish={finish}
        />
      ) : current && isPracticeActive(state) ? (
        <main className="practice-question">
          <div className="practice-question-card">
            <p className="practice-kind">{reviewMode ? 'Modo revisão' : current.title}</p>
            <h1>{current.prompt}</h1>
          </div>

          {(current.type === 'listenChoice' || current.type === 'dictation') ? (
            <AudioPrompt listening={listening} onPlay={() => playAudio(current.audioText || current.answer)} />
          ) : null}

          {(current.type === 'choice' || current.type === 'listenChoice' || current.type === 'fillBlank') ? (
            <ChoiceGrid item={current} value={value} feedback={visibleFeedback} normalize={normalizeForPractice} onSelect={selectOption} />
          ) : null}

          {current.type === 'newContext' ? (
            <NewContextExercise item={current} feedback={visibleFeedback} normalize={normalizeForPractice} onSelect={selectOption} />
          ) : null}

          {current.type === 'dictation' || current.type === 'correction' || current.type === 'write' ? (
            <TextExercise value={value} feedback={visibleFeedback} onChange={changeText} />
          ) : null}

          {current.type === 'wordBank' ? (
            <WordBankExercise item={current} selectedWords={wordBankValue} feedback={visibleFeedback} onChange={changeWordBank} />
          ) : null}

          {current.type === 'speak' ? (
            <SpeakExercise value={value} feedback={visibleFeedback} onSpeak={speak} onChange={changeText} />
          ) : null}
        </main>
      ) : null}

      {started && !done && current ? (
        <PracticeFeedback
          feedback={visibleFeedback}
          current={current}
          lives={lives}
          hintVisible={hintVisible}
          onShowHint={() => setHintVisible(true)}
          onRetry={retry}
          onContinue={continueNext}
          onSubmit={() => submit()}
          actionLabel={checking ? 'Conferindo...' : getQuestionActionLabel(current.type)}
          canSubmit={canSubmit}
        />
      ) : null}
    </div>
  );
}
