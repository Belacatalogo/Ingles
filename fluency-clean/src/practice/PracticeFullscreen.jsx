import { useMemo, useState } from 'react';
import { playLearningAudio } from '../services/audioPlayback.js';
import { buildPracticeItems, evaluatePracticeAnswer, normalizeForPractice } from './PracticeEngine.js';
import { AudioPrompt } from './components/AudioPrompt.jsx';
import { ChoiceGrid } from './components/ChoiceGrid.jsx';
import { PracticeDone } from './components/PracticeDone.jsx';
import { PracticeFeedback } from './components/PracticeFeedback.jsx';
import { PracticeHeader, LivesBar } from './components/PracticeHeader.jsx';
import { PracticeIntro } from './components/PracticeIntro.jsx';
import { SpeakExercise } from './components/SpeakExercise.jsx';
import { TextExercise } from './components/TextExercise.jsx';
import { WordBankExercise } from './components/WordBankExercise.jsx';

const STARTING_LIVES = 5;

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
  return 'Verificar';
}

function canSubmitQuestion(current, value, wordBankValue) {
  if (!current) return false;
  if (['choice', 'listenChoice', 'fillBlank'].includes(current.type)) return true;
  if (current.type === 'wordBank') return Boolean(clean(wordBankValue.join(' ')));
  return Boolean(clean(value));
}

export function PracticeFullscreen({ lesson, open, onClose, onComplete }) {
  const items = useMemo(() => buildPracticeItems(lesson, { min: 14, max: 36 }), [lesson]);
  const [started, setStarted] = useState(false);
  const [index, setIndex] = useState(0);
  const [value, setValue] = useState('');
  const [wordBankValue, setWordBankValue] = useState([]);
  const [feedback, setFeedback] = useState(null);
  const [results, setResults] = useState([]);
  const [hintVisible, setHintVisible] = useState(false);
  const [listening, setListening] = useState(false);
  const [lives, setLives] = useState(STARTING_LIVES);
  const [reviewMode, setReviewMode] = useState(false);
  const current = items[index];
  const done = open && items.length > 0 && index >= items.length;
  const correctCount = results.filter((result) => result.correct).length;
  const mistakeCount = results.filter((result) => !result.correct).length;
  const progress = items.length ? Math.round((Math.min(index, items.length) / items.length) * 100) : 0;
  const skillLabel = getPracticeSkillLabel(lesson);

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

  function submit(nextValue = value) {
    if (!current || feedback) return;
    const finalValue = current.type === 'wordBank' ? wordBankValue.join(' ') : nextValue;
    const evaluation = evaluatePracticeAnswer(current, finalValue);
    if (evaluation.empty) return;
    if (evaluation.retryable) {
      setFeedback({ ...evaluation, near: true, message: 'Quase certo. Ajuste só um detalhe.', lifeLost: false });
      return;
    }
    const lifeLost = !evaluation.correct;
    let nextLives = lives;
    if (lifeLost) {
      nextLives = Math.max(0, lives - 1);
      setLives(nextLives);
      if (nextLives <= 0) setReviewMode(true);
    }
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
      expected: current.answer,
      lifeLost,
    }]);
  }

  function continueNext() {
    setIndex((currentIndex) => currentIndex + 1);
    setValue('');
    setWordBankValue([]);
    setFeedback(null);
    setHintVisible(false);
  }

  function retry() {
    setFeedback(null);
    setHintVisible(false);
  }

  function selectOption(option) {
    setValue(option);
    submit(option);
  }

  function speak() {
    const SpeechRecognition = getSpeechRecognition();
    if (!SpeechRecognition) {
      setFeedback({ correct: false, empty: true, message: 'Digite o que você falou.', lifeLost: false });
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
      recognition.onerror = () => setFeedback({ correct: false, empty: true, message: 'Digite o que você falou.', lifeLost: false });
      recognition.start();
    } catch {
      setFeedback({ correct: false, empty: true, message: 'Digite o que você falou.', lifeLost: false });
    }
  }

  function restart() {
    setStarted(false);
    setIndex(0);
    setValue('');
    setWordBankValue([]);
    setFeedback(null);
    setResults([]);
    setHintVisible(false);
    setLives(STARTING_LIVES);
    setReviewMode(false);
  }

  function finish() {
    onComplete?.({ total: items.length, correct: correctCount, mistakes: mistakeCount, lives, reviewMode, results });
    onClose?.();
  }

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
        onClose={onClose}
      />

      {started && !done ? <LivesBar lives={lives} reviewMode={reviewMode} /> : null}

      {!started && !done ? (
        <PracticeIntro
          skillLabel={skillLabel}
          total={items.length}
          level={lesson?.level}
          startingLives={STARTING_LIVES}
          onStart={() => setStarted(true)}
        />
      ) : done ? (
        <PracticeDone
          reviewMode={reviewMode}
          correctCount={correctCount}
          total={items.length}
          lives={lives}
          onRestart={restart}
          onFinish={finish}
        />
      ) : current ? (
        <main className="practice-question">
          <div className="practice-question-card">
            <p className="practice-kind">{reviewMode ? 'Modo revisão' : current.title}</p>
            <h1>{current.prompt}</h1>
          </div>

          {(current.type === 'listenChoice' || current.type === 'dictation') ? (
            <AudioPrompt listening={listening} onPlay={() => playAudio(current.audioText || current.answer)} />
          ) : null}

          {(current.type === 'choice' || current.type === 'listenChoice' || current.type === 'fillBlank') ? (
            <ChoiceGrid item={current} value={value} feedback={feedback} normalize={normalizeForPractice} onSelect={selectOption} />
          ) : null}

          {current.type === 'dictation' || current.type === 'correction' ? (
            <TextExercise value={value} feedback={feedback} onChange={setValue} />
          ) : null}

          {current.type === 'wordBank' ? (
            <WordBankExercise item={current} selectedWords={wordBankValue} feedback={feedback} onChange={setWordBankValue} />
          ) : null}

          {current.type === 'speak' ? (
            <SpeakExercise value={value} feedback={feedback} onSpeak={speak} onChange={setValue} />
          ) : null}
        </main>
      ) : null}

      {started && !done && current ? (
        <PracticeFeedback
          feedback={feedback}
          current={current}
          lives={lives}
          hintVisible={hintVisible}
          onShowHint={() => setHintVisible(true)}
          onRetry={retry}
          onContinue={continueNext}
          onSubmit={() => submit()}
          actionLabel={getQuestionActionLabel(current.type)}
          canSubmit={canSubmitQuestion(current, value, wordBankValue)}
        />
      ) : null}
    </div>
  );
}
