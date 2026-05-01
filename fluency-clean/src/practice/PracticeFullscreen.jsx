import { useMemo, useState } from 'react';
import { CheckCircle2, ChevronRight, Headphones, Mic, RotateCcw, Volume2, X, XCircle } from 'lucide-react';
import { playLearningAudio } from '../services/audioPlayback.js';
import { buildPracticeItems, evaluatePracticeAnswer, normalizeForPractice } from './PracticeEngine.js';

function getSpeechRecognition() {
  return window.SpeechRecognition || window.webkitSpeechRecognition || null;
}

function clean(value) {
  return String(value ?? '').trim();
}

function ChoiceGrid({ item, value, feedback, onSelect }) {
  return (
    <div className="practice-choice-grid">
      {item.options.map((option) => {
        const selected = normalizeForPractice(value) === normalizeForPractice(option);
        const right = feedback && normalizeForPractice(option) === normalizeForPractice(item.answer);
        const wrong = feedback && selected && !right;
        return (
          <button type="button" key={option} onClick={() => onSelect(option)} disabled={Boolean(feedback)} className={right ? 'right' : wrong ? 'wrong' : selected ? 'selected' : ''}>
            {option}
          </button>
        );
      })}
    </div>
  );
}

function WordBank({ item, selectedWords, feedback, onChange }) {
  const selectedKeys = selectedWords.map((word, index) => `${word}-${index}`);
  function add(word) {
    if (feedback) return;
    onChange([...selectedWords, word]);
  }
  function remove(index) {
    if (feedback) return;
    onChange(selectedWords.filter((_, itemIndex) => itemIndex !== index));
  }
  return (
    <div className="practice-wordbank">
      <div className="practice-answer-line">
        {selectedWords.length ? selectedWords.map((word, index) => <button key={`${word}-${index}`} type="button" onClick={() => remove(index)}>{word}</button>) : <span>Monte a frase aqui</span>}
      </div>
      <div className="practice-word-options">
        {item.words.map((word, index) => {
          const used = selectedKeys.includes(`${word}-${index}`) || selectedWords.filter((itemWord) => itemWord === word).length >= item.words.filter((itemWord) => itemWord === word).slice(0, index + 1).length;
          return <button type="button" key={`${word}-${index}`} onClick={() => add(word)} disabled={Boolean(feedback) || used} className={used ? 'used' : ''}>{word}</button>;
        })}
      </div>
    </div>
  );
}

export function PracticeFullscreen({ lesson, open, onClose, onComplete }) {
  const items = useMemo(() => buildPracticeItems(lesson, { min: 14, max: 36 }), [lesson]);
  const [index, setIndex] = useState(0);
  const [value, setValue] = useState('');
  const [wordBankValue, setWordBankValue] = useState([]);
  const [feedback, setFeedback] = useState(null);
  const [results, setResults] = useState([]);
  const [hintVisible, setHintVisible] = useState(false);
  const [listening, setListening] = useState(false);
  const current = items[index];
  const done = open && items.length > 0 && index >= items.length;
  const correctCount = results.filter((result) => result.correct).length;
  const progress = items.length ? Math.round((Math.min(index, items.length) / items.length) * 100) : 0;

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
      setFeedback({ ...evaluation, near: true, message: 'Quase certo. Tente de novo.' });
      return;
    }
    setFeedback({ ...evaluation, message: evaluation.correct ? 'Isso mesmo!' : 'Resposta correta:' });
    setResults((currentResults) => [...currentResults, { id: current.id, type: current.type, correct: evaluation.correct, answer: finalValue, expected: current.answer }]);
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
      setFeedback({ correct: false, empty: true, message: 'Digite o que você falou.' });
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
      recognition.onerror = () => setFeedback({ correct: false, empty: true, message: 'Digite o que você falou.' });
      recognition.start();
    } catch {
      setFeedback({ correct: false, empty: true, message: 'Digite o que você falou.' });
    }
  }

  function restart() {
    setIndex(0);
    setValue('');
    setWordBankValue([]);
    setFeedback(null);
    setResults([]);
    setHintVisible(false);
  }

  function finish() {
    onComplete?.({ total: items.length, correct: correctCount, results });
    onClose?.();
  }

  return (
    <div className="practice-fullscreen" role="dialog" aria-modal="true">
      <header className="practice-topbar">
        <button type="button" className="practice-close" onClick={onClose} aria-label="Fechar prática"><X size={34} /></button>
        <div className="practice-progress"><span style={{ width: `${done ? 100 : progress}%` }} /></div>
        <strong>{done ? `${correctCount}/${items.length}` : `${index + 1}/${items.length}`}</strong>
      </header>

      {done ? (
        <main className="practice-done">
          <CheckCircle2 size={56} />
          <h1>Prática concluída</h1>
          <p>Você acertou {correctCount} de {items.length}. Continue revisando até ficar natural.</p>
          <button type="button" onClick={restart}><RotateCcw size={18} /> Refazer prática</button>
          <button type="button" className="primary" onClick={finish}>Voltar para aula</button>
        </main>
      ) : current ? (
        <main className="practice-question">
          <p className="practice-kind">{current.title}</p>
          <h1>{current.prompt}</h1>

          {(current.type === 'listenChoice' || current.type === 'dictation') ? (
            <button type="button" className="practice-audio-big" onClick={() => playAudio(current.audioText || current.answer)} disabled={listening}>
              <Volume2 size={56} />
            </button>
          ) : null}

          {(current.type === 'choice' || current.type === 'listenChoice' || current.type === 'fillBlank') ? (
            <ChoiceGrid item={current} value={value} feedback={feedback} onSelect={selectOption} />
          ) : null}

          {current.type === 'dictation' || current.type === 'correction' ? (
            <textarea className="practice-textarea" value={value} onChange={(event) => setValue(event.target.value)} placeholder="Digite sua resposta..." disabled={Boolean(feedback && !feedback.retryable)} />
          ) : null}

          {current.type === 'wordBank' ? (
            <WordBank item={current} selectedWords={wordBankValue} feedback={feedback} onChange={setWordBankValue} />
          ) : null}

          {current.type === 'speak' ? (
            <div className="practice-speak-box">
              <button type="button" onClick={speak} disabled={Boolean(feedback && !feedback.retryable)}><Mic size={28} /> Falar agora</button>
              <input value={value} onChange={(event) => setValue(event.target.value)} placeholder="Ou digite o que falou..." disabled={Boolean(feedback && !feedback.retryable)} />
            </div>
          ) : null}
        </main>
      ) : null}

      {!done && current ? (
        <footer className={`practice-feedback ${feedback ? feedback.correct ? 'right' : feedback.near ? 'near' : 'wrong' : ''}`}>
          {feedback ? (
            <div className="practice-feedback-text">
              {feedback.correct ? <CheckCircle2 size={24} /> : <XCircle size={24} />}
              <div>
                <strong>{feedback.message}</strong>
                {!feedback.correct && !feedback.near ? <span>{current.answer}</span> : null}
                {feedback.near && hintVisible && feedback.hintWord ? <span>Dica: confira “{feedback.hintWord}”.</span> : null}
              </div>
            </div>
          ) : null}
          <div className="practice-footer-actions">
            {feedback?.near ? <button type="button" className="secondary" onClick={() => setHintVisible(true)}>Ver dica</button> : null}
            {feedback?.near ? <button type="button" onClick={retry}><RotateCcw size={16} /> Tentar de novo</button> : feedback ? <button type="button" onClick={continueNext}>Continuar <ChevronRight size={16} /></button> : <button type="button" disabled={!clean(current.type === 'wordBank' ? wordBankValue.join(' ') : value) && !['choice', 'listenChoice', 'fillBlank'].includes(current.type)} onClick={() => submit()}>Verificar</button>}
          </div>
        </footer>
      ) : null}
    </div>
  );
}
