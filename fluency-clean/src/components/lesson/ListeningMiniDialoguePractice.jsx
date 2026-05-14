import { useEffect, useMemo, useState } from 'react';
import { CheckCircle2, Mic, Save, Square } from 'lucide-react';
import { Card } from '../ui/Card.jsx';

function clean(value) {
  return String(value ?? '').trim();
}

function getPrompt(lesson) {
  const production = Array.isArray(lesson?.oralProduction) ? lesson.oralProduction[0] : null;
  if (typeof production === 'string') return production;
  if (production && typeof production === 'object') {
    return clean(production.prompt || production.task || production.instruction || production.text || production.title);
  }
  return 'Crie um mini diálogo usando as frases da aula: Hi, my name is... / Hello... / How are you? / I am good, thanks.';
}

function storageKey(lesson) {
  return `fluency:listening-mini-dialogue:${lesson?.id || lesson?.title || 'lesson'}`;
}

function getSpeechRecognition() {
  if (typeof window === 'undefined') return null;
  return window.SpeechRecognition || window.webkitSpeechRecognition || null;
}

export function ListeningMiniDialoguePractice({ lesson }) {
  const prompt = useMemo(() => getPrompt(lesson), [lesson]);
  const key = useMemo(() => storageKey(lesson), [lesson]);
  const [answer, setAnswer] = useState('');
  const [status, setStatus] = useState('');
  const [listening, setListening] = useState(false);
  const [recognition, setRecognition] = useState(null);

  useEffect(() => {
    try {
      const saved = window.localStorage.getItem(key);
      if (saved) setAnswer(saved);
    } catch {
      // ignore local storage failures
    }
  }, [key]);

  if (lesson?.pillar !== 'listening' && lesson?.type !== 'listening') return null;

  function saveAnswer(nextAnswer = answer) {
    try {
      window.localStorage.setItem(key, nextAnswer);
      setStatus('Tentativa salva. Você pode voltar e melhorar depois.');
    } catch {
      setStatus('Não foi possível salvar agora, mas sua resposta continua na tela.');
    }
  }

  function startSpeaking() {
    const SpeechRecognition = getSpeechRecognition();
    if (!SpeechRecognition) {
      setStatus('Microfone por fala não disponível neste navegador. Escreva sua resposta no campo abaixo.');
      return;
    }
    const instance = new SpeechRecognition();
    instance.lang = 'en-US';
    instance.interimResults = true;
    instance.continuous = false;
    instance.onstart = () => {
      setListening(true);
      setStatus('Ouvindo... fale seu mini diálogo em inglês.');
    };
    instance.onresult = (event) => {
      const transcript = Array.from(event.results).map((result) => result[0]?.transcript || '').join(' ').trim();
      if (transcript) setAnswer(transcript);
    };
    instance.onerror = () => {
      setListening(false);
      setStatus('Não consegui captar sua fala agora. Você pode escrever a resposta.');
    };
    instance.onend = () => {
      setListening(false);
      setStatus('Fala captada. Revise e salve sua tentativa.');
    };
    setRecognition(instance);
    instance.start();
  }

  function stopSpeaking() {
    recognition?.stop?.();
    setListening(false);
    setStatus('Gravação encerrada. Revise e salve sua tentativa.');
  }

  return (
    <Card eyebrow="Mini diálogo" title="Fale ou escreva sua resposta">
      <p>Agora produza algo seu. Você pode falar usando o microfone ou escrever no campo abaixo.</p>
      <article className="static-production-card">
        <span>Modelo da tarefa</span>
        <strong>{prompt}</strong>
        <small>Use seu nome real ou fictício. Faça de 3 a 5 linhas simples.</small>
      </article>
      <textarea
        className="listening-mini-dialogue-input"
        value={answer}
        onChange={(event) => setAnswer(event.target.value)}
        placeholder={'Exemplo:\nAna: Hi, my name is Ana.\nLuis: Hello, Ana. My name is Luis.\nAna: How are you?\nLuis: I am fine, thanks.'}
      />
      <div className="answer-actions">
        {!listening ? (
          <button type="button" className="primary-button" onClick={startSpeaking}>
            <Mic size={16} /> Falar resposta
          </button>
        ) : (
          <button type="button" className="secondary-button" onClick={stopSpeaking}>
            <Square size={16} /> Parar fala
          </button>
        )}
        <button type="button" className="secondary-button" onClick={() => saveAnswer()}>
          <Save size={16} /> Salvar tentativa
        </button>
      </div>
      {status ? <p className="generator-message completion-message"><CheckCircle2 size={14} /> {status}</p> : null}
    </Card>
  );
}
