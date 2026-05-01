import { useMemo, useState } from 'react';
import { CheckCircle2, ChevronRight, Headphones, Mic, RotateCcw, Sparkles, Volume2, X, XCircle } from 'lucide-react';
import { playLearningAudio } from '../services/audioPlayback.js';
import { buildPracticeItems, evaluatePracticeAnswer, normalizeForPractice } from './PracticeEngine.js';

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

function ChoiceGrid({ item, value, feedback, onSelect }) {
  return (
    <div className="practice-choice-grid">
      {item.options.map((option, index) => {
        const selected = normalizeForPractice(value) === normalizeForPractice(option);
        const right = feedback && normalizeForPractice(option) === normalizeForPractice(item.answer);
        const wrong = feedback && selected && !right;
        return (
          <button type="button" key={option} onClick={() => onSelect(option)} disabled={Boolean(feedback)} className={right ? 'right' : wrong ? 'wrong' : selected ? 'selected' : ''}>
            <span>{String.fromCharCode(65 + index)}</span>
            <b>{option}</b>
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
        {selectedWords.length ? selectedWords.map((word, index) => <button key={`${word}-${index}`} type="button" onClick={() => remove(index)}>{word}</button>) : <span>Toque nas palavras para montar a frase</span>}
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
  const [started, setStarted] = useState(false);
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
      setFeedback({ ...evaluation, near: true, message: 'Quase certo. Ajuste só um detalhe.' });
      return;
    }
    setFeedback({ ...evaluation, message: evaluation.correct ? 'Muito bem!' : 'Vamos revisar.' });
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
    setStarted(false);
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
      <div className="practice-ambient practice-ambient-one" />
      <div className="practice-ambient practice-ambient-two" />

      <header className="practice-topbar">
        <button type="button" className="practice-close" onClick={onClose} aria-label="Fechar prática"><X size={26} /></button>
        <div className="practice-progress"><span style={{ width: `${done ? 100 : started ? progress : 0}%` }} /></div>
        <strong>{done ? `${correctCount}/${items.length}` : started ? `${index + 1}/${items.length}` : `${items.length}`}</strong>
      </header>

      {!started && !done ? (
        <main className="practice-intro">
          <div className="practice-intro-orb"><Sparkles size={34} /></div>
          <p className="practice-kind">{skillLabel}</p>
          <h1>Prática da aula</h1>
          <p>Treine o conteúdo em etapas curtas, com correção imediata e exercícios variados.</p>
          <div className="practice-intro-stats">
            <span><Headphones size={15} /> {items.length} exercícios</span>
            <span>8–12 min</span>
            <span>nível {lesson?.level || 'A1'}</span>
          </div>
          <button type="button" className="practice-start-button" onClick={() => setStarted(true)}>Começar prática</button>
        </main>
      ) : done ? (
        <main className="practice-done">
          <div className="practice-done-medal"><CheckCircle2 size={52} /></div>
          <p className="practice-kind">Sessão finalizada</p>
          <h1>Prática concluída</h1>
          <p>Você acertou {correctCount} de {items.length}. Continue revisando até ficar natural.</p>
          <button type="button" onClick={restart}><RotateCcw size={18} /> Refazer prática</button>
          <button type="button" className="primary" onClick={finish}>Voltar para aula</button>
        </main>
      ) : current ? (
        <main className="practice-question">
          <div className="practice-question-card">
            <p className="practice-kind">{current.title}</p>
            <h1>{current.prompt}</h1>
          </div>

          {(current.type === 'listenChoice' || current.type === 'dictation') ? (
            <button type="button" className="practice-audio-big" onClick={() => playAudio(current.audioText || current.answer)} disabled={listening}>
              <Volume2 size={48} />
              <span>{listening ? 'Tocando...' : 'Ouvir'}</span>
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

      {started && !done && current ? (
        <footer className={`practice-feedback ${feedback ? feedback.correct ? 'right' : feedback.near ? 'near' : 'wrong' : ''}`}>
          {feedback ? (
            <div className="practice-feedback-text">
              {feedback.correct ? <CheckCircle2 size={24} /> : <XCircle size={24} />}
              <div>
                <strong>{feedback.message}</strong>
                {!feedback.correct && !feedback.near ? <span>Resposta: {current.answer}</span> : null}
                {feedback.near && hintVisible && feedback.hintWord ? <span>Dica: confira “{feedback.hintWord}”.</span> : null}
              </div>
            </div>
          ) : <div className="practice-feedback-placeholder">Respire, responda com calma e siga no seu ritmo.</div>}
          <div className="practice-footer-actions">
            {feedback?.near ? <button type="button" className="secondary" onClick={() => setHintVisible(true)}>Ver dica</button> : null}
            {feedback?.near ? <button type="button" onClick={retry}><RotateCcw size={16} /> Tentar de novo</button> : feedback ? <button type="button" onClick={continueNext}>Continuar <ChevronRight size={16} /></button> : <button type="button" disabled={!clean(current.type === 'wordBank' ? wordBankValue.join(' ') : value) && !['choice', 'listenChoice', 'fillBlank'].includes(current.type)} onClick={() => submit()}>{getQuestionActionLabel(current.type)}</button>}
          </div>
        </footer>
      ) : null}
    </div>
  );
}
