import { useState } from 'react';
import { CheckCircle2, Headphones, ListChecks, MessageSquareText, Pause, Play, Repeat2, Volume2 } from 'lucide-react';
import { playGeminiTtsAudio } from '../services/geminiTts.js';

const transcript = [
  'Hi, I am Ana. Every morning, I make coffee and open my English notebook.',
  'First, I listen to a short conversation. Then, I write three new words.',
  'At night, I repeat the sentences out loud to practice pronunciation.',
];

const questions = [
  'What does Ana open in the morning?',
  'How many new words does she write?',
  'When does she repeat the sentences?',
];

export function ListeningLesson({ lesson }) {
  const [message, setMessage] = useState('Ouça o áudio antes de abrir a transcrição.');

  async function handleListen() {
    setMessage('Preparando áudio natural...');
    const result = await playGeminiTtsAudio({
      text: transcript.join(' '),
      voiceName: 'Kore',
      style: 'Natural teacher voice, clear A1 listening practice.',
    });
    setMessage(result.source === 'gemini' ? 'Áudio natural reproduzido.' : result.error || 'Áudio reproduzido com fallback.');
  }

  return (
    <article className="pillar-lesson listening-lesson-v1">
      <section className="pillar-card listening-audio-card">
        <div className="pillar-card-title"><Headphones size={17} /> Escuta guiada</div>
        <h2>{lesson?.title || 'Listening — A morning routine'}</h2>
        <p>Ouça primeiro sem ler. Depois use a transcrição para confirmar detalhes e repetir em voz alta.</p>
        <div className="listening-player">
          <button type="button" onClick={handleListen}><Play size={20} /></button>
          <div><span /><span /><span /><span /><span /><span /></div>
          <button type="button"><Pause size={18} /></button>
        </div>
        <small>{message}</small>
      </section>

      <section className="pillar-card">
        <div className="pillar-card-title"><Volume2 size={17} /> Transcrição</div>
        <div className="transcript-box">
          {transcript.map((line, index) => <p key={line}><b>{index + 1}</b>{line}</p>)}
        </div>
      </section>

      <section className="pillar-card">
        <div className="pillar-card-title"><ListChecks size={17} /> Compreensão</div>
        <div className="listening-question-list">
          {questions.map((question, index) => (
            <label key={question}>
              <span>{index + 1}. {question}</span>
              <input placeholder="Write a short answer..." />
            </label>
          ))}
        </div>
      </section>

      <section className="pillar-card pillar-finish-card">
        <div>
          <div className="pillar-card-title"><Repeat2 size={17} /> Shadowing</div>
          <p>Repita a última frase três vezes tentando copiar o ritmo do áudio.</p>
        </div>
        <button type="button"><CheckCircle2 size={16} /> Concluir Listening</button>
      </section>
    </article>
  );
}
