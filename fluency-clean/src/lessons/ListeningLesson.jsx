import { useMemo, useState } from 'react';
import { CheckCircle2, Eye, Headphones, ListChecks, MessageSquareText, Pause, Play, Repeat2, RotateCcw, Save, Volume2 } from 'lucide-react';
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
  const sentences = clean.split(/(?<=[.!?])\s+/).map((item) => item.trim()).filter(Boolean);
  return sentences.length ? sentences.slice(0, 12) : fallbackTranscript;
}

function answerFromKey(answerKey, question, index) {
  if (!answerKey) return '';
  if (Array.isArray(answerKey)) {
    const match = answerKey[index];
    if (typeof match === 'string') return match;
    return match?.answer || match?.expectedAnswer || match?.correctAnswer || '';
  }
  if (typeof answerKey === 'object') {
    const keys = [index, String(index), index + 1, String(index + 1), question, cleanText(question).toLowerCase()];
    for (const key of keys) {
      const match = answerKey[key];
      if (typeof match === 'string') return match;
      if (match?.answer || match?.expectedAnswer || match?.correctAnswer) return match.answer || match.expectedAnswer || match.correctAnswer;
    }
  }
  return '';
}

function normalizeQuestions(lesson) {
  const exercises = Array.isArray(lesson?.exercises) ? lesson.exercises : [];
  if (!exercises.length) return fallbackQuestions;
  return exercises.map((item, index) => {
    const question = cleanText(item.question || item.prompt || item.instruction || `Question ${index + 1}`);
    const answer = cleanText(item.answer || item.expectedAnswer || item.correctAnswer || item.solution || answerFromKey(lesson?.answerKey, question, index) || '');
    return { question, answer };
  }).filter((item) => item.question);
}

function normalizePrompts(lesson) {
  const prompts = Array.isArray(lesson?.prompts) ? lesson.prompts : [];
  if (prompts.length) return prompts.map(cleanText).filter(Boolean);
  return ['Repeat the last sentence three times.', 'Answer one question out loud.', 'Say one similar sentence about your routine.'];
}

function normalizeShadowingLines(transcript, prompts) {
  const lines = transcript
    .flatMap((line) => cleanText(line).split(/(?<=[.!?])\s+/))
    .map((line) => line.trim())
    .filter((line) => line.length >= 10)
    .slice(0, 8);
  return lines.length ? lines : prompts.map(cleanText).filter(Boolean).slice(0, 5);
}

function questionDraftKey(lesson) {
  return `${lesson?.id || lesson?.title || 'listening'}::questions`;
}

function writtenDraftKey(lesson) {
  return lesson?.id || lesson?.title || 'listening';
}

function safeJsonParse(value) {
  try {
    const parsed = JSON.parse(value || '{}');
    return parsed && typeof parsed === 'object' ? parsed : {};
  } catch {
    return {};
  }
}

export function ListeningLesson({ lesson }) {
  const [message, setMessage] = useState('Ouça o áudio antes de abrir a transcrição.');
  const [audioState, setAudioState] = useState('idle');
  const [answer, setAnswer] = useState(() => getLessonDraft(writtenDraftKey(lesson)));
  const [questionAnswers, setQuestionAnswers] = useState(() => safeJsonParse(getLessonDraft(questionDraftKey(lesson))));
  const [revealedAnswers, setRevealedAnswers] = useState({});
  const [savedAt, setSavedAt] = useState('');
  const [completedAt, setCompletedAt] = useState('');
  const [shadowingIndex, setShadowingIndex] = useState(0);

  const transcript = useMemo(() => splitTranscript(lesson?.listeningText), [lesson?.listeningText]);
  const questions = useMemo(() => normalizeQuestions(lesson), [lesson]);
  const prompts = useMemo(() => normalizePrompts(lesson), [lesson]);
  const shadowingLines = useMemo(() => normalizeShadowingLines(transcript, prompts), [transcript, prompts]);
  const audioText = transcript.join(' ');
  const currentShadowingLine = shadowingLines[shadowingIndex] || shadowingLines[0] || prompts[0];

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
    setMessage(result.ok ? (result.source === 'browser-ios' ? 'Áudio iniciado pelo TTS do iPhone.' : 'Áudio iniciado.') : (result.error || 'Não foi possível reproduzir áudio.'));
  }

  async function handleShadowingListen() {
    const text = cleanText(currentShadowingLine);
    if (!text) {
      setMessage('Nenhuma frase de shadowing disponível nesta aula.');
      return;
    }
    diagnostics.log(`Shadowing iniciado: frase ${shadowingIndex + 1}/${shadowingLines.length}.`, 'info');
    setAudioState('loading');
    setMessage('Preparando frase de shadowing...');
    const result = await playLearningAudio({
      text,
      label: `Shadowing · frase ${shadowingIndex + 1}`,
      voiceName: 'Kore',
      style: 'Clear pronunciation model for English shadowing practice.',
    });
    setAudioState('idle');
    setMessage(result.ok ? 'Ouça, pause e repita tentando copiar ritmo e pronúncia.' : (result.error || 'Não foi possível reproduzir a frase de shadowing.'));
  }

  function handleStop() {
    stopLearningAudio();
    setMessage('Áudio interrompido.');
  }

  function updateQuestionAnswer(index, value) {
    setQuestionAnswers((current) => ({ ...current, [index]: value }));
  }

  function revealAnswer(index) {
    setRevealedAnswers((current) => ({ ...current, [index]: true }));
  }

  function nextShadowingLine() {
    setShadowingIndex((current) => {
      const nextIndex = shadowingLines.length ? (current + 1) % shadowingLines.length : 0;
      diagnostics.log(`Shadowing: próxima frase ${nextIndex + 1}/${shadowingLines.length || 1}.`, 'info');
      return nextIndex;
    });
    setMessage('Frase de shadowing atualizada. Toque em "Ouvir frase" e repita em voz alta.');
  }

  function saveDrafts() {
    saveLessonDraft({ lesson, answer });
    saveLessonDraft({
      lesson: { ...lesson, id: questionDraftKey(lesson), title: `${lesson?.title || 'Listening'} · respostas` },
      answer: JSON.stringify(questionAnswers),
    });
    const time = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    setSavedAt(time);
    diagnostics.log(`Listening: rascunho salvo para ${lesson?.title || 'aula atual'}.`, 'success');
    return time;
  }

  function handleSave() {
    const time = saveDrafts();
    setMessage(`Rascunho salvo às ${time}.`);
  }

  function handleComplete() {
    saveDrafts();
    const result = completeLesson({
      lesson,
      answers: {
        summary: answer,
        comprehensionAnswers: questionAnswers,
        shadowing: { currentPhrase: currentShadowingLine, totalPhrases: shadowingLines.length },
        updatedAt: new Date().toISOString(),
      },
      writtenAnswer: answer,
    });
    const time = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    setCompletedAt(time);
    setMessage(result.alreadyCompleted ? 'Listening já estava concluída. Progresso mantido.' : '+25 XP. Listening concluída e progresso salvo.');
    diagnostics.log(result.alreadyCompleted ? 'Listening já estava concluída; progresso mantido.' : 'Listening concluída com progresso real salvo.', 'success');
  }

  return (
    <article className="pillar-lesson listening-lesson-v1">
      <section className="pillar-card listening-audio-card">
        <div className="pillar-card-title"><Headphones size={17} /> Escuta guiada</div>
        <h2>{lesson?.title || 'Listening — A morning routine'}</h2>
        <p>{cleanText(lesson?.intro || 'Ouça primeiro sem ler. Depois use a transcrição para confirmar detalhes e repetir em voz alta.')}</p>
        <div className="listening-player">
          <button type="button" onClick={handleListen} disabled={audioState === 'loading'} aria-label="Ouvir áudio da aula"><Play size={20} /></button>
          <div><span /><span /><span /><span /><span /><span /></div>
          <button type="button" onClick={handleStop} aria-label="Parar áudio"><Pause size={18} /></button>
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
        <p className="lesson-helper-text">Responda primeiro. A resposta esperada só aparece quando você tocar em "Ver resposta".</p>
        <div className="listening-question-list">
          {questions.map((item, index) => {
            const currentAnswer = questionAnswers[index] || '';
            const canReveal = Boolean(revealedAnswers[index]);
            return (
              <label key={`${item.question}-${index}`}>
                <span>{index + 1}. {item.question}</span>
                <input
                  value={currentAnswer}
                  onChange={(event) => updateQuestionAnswer(index, event.target.value)}
                  placeholder="Write a short answer..."
                  autoCapitalize="sentences"
                  autoCorrect="on"
                  spellCheck="true"
                />
                {item.answer ? (
                  canReveal ? <small>Resposta esperada: {item.answer}</small> : (
                    <button type="button" className="inline-lesson-action" onClick={() => revealAnswer(index)}>
                      <Eye size={14} /> Ver resposta
                    </button>
                  )
                ) : null}
              </label>
            );
          })}
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
          <button type="button" onClick={handleSave}><Save size={16} /> Salvar rascunho</button>
          <button type="button" onClick={handleComplete}><CheckCircle2 size={16} /> Concluir Listening</button>
        </div>
        {savedAt ? <small>Rascunho salvo às {savedAt}.</small> : null}
        {completedAt ? <small>Listening concluída às {completedAt}.</small> : null}
      </section>

      <section className="pillar-card pillar-finish-card">
        <div>
          <div className="pillar-card-title"><Repeat2 size={17} /> Shadowing real</div>
          <p>{currentShadowingLine}</p>
          <small>Frase {shadowingIndex + 1} de {shadowingLines.length || 1}. Repita tentando copiar ritmo, pausas e pronúncia.</small>
        </div>
        <div className="writing-actions">
          <button type="button" onClick={handleShadowingListen}><Volume2 size={16} /> Ouvir frase</button>
          <button type="button" onClick={nextShadowingLine}><RotateCcw size={16} /> Próxima frase</button>
        </div>
      </section>
    </article>
  );
}
