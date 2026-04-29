import { useMemo, useState } from 'react';
import { CheckCircle2, Headphones, ListChecks, MessageSquareText, Pause, Play, Repeat2, Volume2 } from 'lucide-react';
import { playLearningAudio, stopLearningAudio } from '../services/audioPlayback.js';
import { diagnostics } from '../services/diagnostics.js';
import { completeLesson, getLessonDraft, saveLessonDraft } from '../services/progressStore.js';

const fallbackTranscript = [
  'Hi, I am Ana. Every morning, I make coffee and open my English notebook.',
  'First, I listen to a short conversation. Then, I write three new words.',
  'At night, I repeat the sentences out loud to practice pronunciation.',
];

const fallbackQuestions = [
  { question: 'What does Ana open in the morning?', answer: 'Her English notebook.' },
  { question: 'How many new words does she write?', answer: 'Three new words.' },
  { question: 'When does she repeat the sentences?', answer: 'At night.' },
];

function cleanText(value) {
  return String(value ?? '')
    .replace(/\*\*(.*?)\*\*/g, '$1')
    .replace(/^\s*[-*]\s+/gm, '')
    .replace(/\n{3,}/g, '\n\n')
    .trim();
}

function splitTranscript(value) {
  const clean = cleanText(value);
  if (!clean) return fallbackTranscript;
  const paragraphs = clean.split(/\n\s*\n+/).map((item) => item.trim()).filter(Boolean);
  if (paragraphs.length > 1) return paragraphs;
  return clean.split(/(?<=[.!?])\s+/).map((item) => item.trim()).filter(Boolean).slice(0, 12);
}

function normalizeQuestions(lesson) {
  const exercises = Array.isArray(lesson?.exercises) ? lesson.exercises : [];
  if (!exercises.length) return fallbackQuestions;
  return exercises.map((item, index) => ({
    question: cleanText(item.question || item.prompt || `Question ${index + 1}`),
    answer: cleanText(item.answer || ''),
  }));
}

function normalizePrompts(lesson) {
  const prompts = Array.isArray(lesson?.prompts) ? lesson.prompts : [];
  if (prompts.length) return prompts.map(cleanText).filter(Boolean);
  return ['Repeat the last sentence three times.', 'Answer one question out loud.', 'Say one similar sentence about your routine.'];
}

export function ListeningLesson({ lesson }) {
  const [message, setMessage] = useState('Ouça o áudio antes de abrir a transcrição.');
  const [audioState, setAudioState] = useState('idle');
  const [answer, setAnswer] = useState(() => getLessonDraft(lesson?.id || lesson?.title || 'listening'));
  const transcript = useMemo(() => splitTranscript(lesson?.listeningText), [lesson?.listeningText]);
  const questions = useMemo(() => normalizeQuestions(lesson), [lesson]);
  const prompts = useMemo(() => normalizePrompts(lesson), [lesson]);
  const audioText = transcript.join(' ');

  async function handleListen() {
    diagnostics.log('Clique recebido no botão Ouvir da aula Listening.', 'info');
    setAudioState('loading');
    setMessage('Preparando áudio...');

    const result = await playLearningAudio({
      text: audioText,
      label: 'Listening · transcrição',
      voiceName: 'Kore',
      style: 'Natural teacher voice, clear A1 listening practice.',
    });

    setAudioState('idle');
    if (result.ok) setMessage(result.source === 'browser-ios' ? 'Áudio iniciado pelo TTS do iPhone.' : 'Áudio iniciado.');
    else setMessage(result.error || 'Não foi possível reproduzir áudio.');
  }

  function handleStop() {
    stopLearningAudio();
    setMessage('Áudio interrompido.');
  }

  function handleSave() {
    saveLessonDraft({ lesson, answer });
    setMessage('Rascunho salvo.');
  }

  function handleComplete() {
    const result = completeLesson({ lesson, writtenAnswer: answer });
    setMessage(result.alreadyCompleted ? 'Aula já estava concluída. Progresso mantido.' : '+25 XP. Listening concluída e progresso salvo.');
  }

  return (
    <article className="pillar-lesson listening-lesson-v1">
      <section className="pillar-card listening-audio-card">
        <div className="pillar-card-title"><Headphones size={17} /> Escuta guiada</div>
        <h2>{lesson?.title || 'Listening — A morning routine'}</h2>
        <p>{cleanText(lesson?.intro || 'Ouça primeiro sem ler. Depois use a transcrição para confirmar detalhes e repetir em voz alta.')}</p>
        <div className="listening-player">
          <button type="button" onClick={handleListen} disabled={audioState === 'loading'}><Play size={20} /></button>
          <div><span /><span /><span /><span /><span /><span /></div>
          <button type="button" onClick={handleStop}><Pause size={18} /></button>
        </div>
        <small>{message}</small>
      </section>

      <section className="pillar-card">
        <div className="pillar-card-title"><Volume2 size={17} /> Transcrição</div>
        <div className="transcript-box">
          {transcript.map((line, index) => <p key={`${line}-${index}`}><b>{index + 1}</b>{line}</p>)}
        </div>
      </section>

      <section className="pillar-card">
        <div className="pillar-card-title"><ListChecks size={17} /> Compreensão</div>
        <div className="listening-question-list">
          {questions.map((item, index) => (
            <label key={`${item.question}-${index}`}>
              <span>{index + 1}. {item.question}</span>
              <input placeholder="Write a short answer..." />
              {item.answer ? <small>Resposta esperada: {item.answer}</small> : null}
            </label>
          ))}
        </div>
      </section>

      <section className="pillar-card">
        <div className="pillar-card-title"><MessageSquareText size={17} /> Sua resposta</div>
        <textarea
          value={answer}
          onChange={(event) => setAnswer(event.target.value)}
          placeholder="Write what you understood from the audio..."
          autoCapitalize="sentences"
          autoCorrect="on"
          spellCheck="true"
        />
        <div className="writing-actions">
          <button type="button" onClick={handleSave}>Salvar</button>
          <button type="button" onClick={handleComplete}><CheckCircle2 size={16} /> Concluir Listening</button>
        </div>
      </section>

      <section className="pillar-card pillar-finish-card">
        <div>
          <div className="pillar-card-title"><Repeat2 size={17} /> Shadowing</div>
          <p>{prompts[0]}</p>
        </div>
        <button type="button" onClick={handleComplete}><CheckCircle2 size={16} /> Concluir</button>
      </section>
    </article>
  );
}
