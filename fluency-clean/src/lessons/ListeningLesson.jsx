import { useEffect, useMemo, useRef, useState } from 'react';
import { BookOpen, CheckCircle2, ChevronDown, ChevronUp, Eye, Headphones, ListChecks, MessageSquareText, Pause, Play, Repeat2, RotateCcw, Save, Volume2 } from 'lucide-react';
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
    const options = Array.isArray(item.options || item.choices || item.alternatives) ? (item.options || item.choices || item.alternatives).map(cleanText).filter(Boolean) : [];
    return { question, answer, options };
  }).filter((item) => item.question);
}

function normalizePrompts(lesson) {
  const prompts = Array.isArray(lesson?.prompts) ? lesson.prompts : [];
  if (prompts.length) return prompts.map(cleanText).filter(Boolean);
  return ['Repeat the last sentence three times.', 'Answer one question out loud.', 'Say one similar sentence about your routine.'];
}

function normalizeSections(lesson) {
  const sections = Array.isArray(lesson?.sections) ? lesson.sections : [];
  return sections.map((section, index) => ({
    title: cleanText(section?.title || section?.heading || `Parte ${index + 1}`),
    content: cleanText(section?.content || section?.text || section?.body || section?.explanation),
    examples: Array.isArray(section?.examples) ? section.examples.map(cleanText).filter(Boolean) : [],
  })).filter((section) => section.title || section.content);
}

function normalizeVocabulary(lesson) {
  const vocabulary = Array.isArray(lesson?.vocabulary) ? lesson.vocabulary : [];
  return vocabulary.map((item) => ({
    word: cleanText(item?.word || item?.term),
    meaning: cleanText(item?.meaning || item?.translation || item?.definition),
    example: cleanText(item?.example || item?.sentence),
  })).filter((item) => item.word || item.meaning || item.example);
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

function CollapsibleSection({ id, title, icon, summary, open, onToggle, children }) {
  const Icon = icon;
  return (
    <section className={`pillar-card lesson-collapsible-card ${open ? 'is-open' : 'is-closed'}`} id={id}>
      <button className="lesson-collapsible-head" type="button" onClick={onToggle} aria-expanded={open}>
        <span><Icon size={17} /> {title}</span>
        <small>{summary}</small>
        {open ? <ChevronUp size={18} /> : <ChevronDown size={18} />}
      </button>
      {open ? <div className="lesson-collapsible-body">{children}</div> : null}
    </section>
  );
}

export function ListeningLesson({ lesson }) {
  const [message, setMessage] = useState('Ouça o áudio natural antes de abrir a transcrição.');
  const [audioState, setAudioState] = useState('idle');
  const [answer, setAnswer] = useState(() => getLessonDraft(writtenDraftKey(lesson)));
  const [questionAnswers, setQuestionAnswers] = useState(() => safeJsonParse(getLessonDraft(questionDraftKey(lesson))));
  const [revealedAnswers, setRevealedAnswers] = useState({});
  const [savedAt, setSavedAt] = useState('');
  const [completedAt, setCompletedAt] = useState('');
  const [shadowingIndex, setShadowingIndex] = useState(0);
  const [openSections, setOpenSections] = useState({ guide: true, concept: true, vocab: false, transcript: false, practice: false, answer: false, shadowing: true });
  const refs = { guide: useRef(null), concept: useRef(null), practice: useRef(null), shadowing: useRef(null) };

  const transcript = useMemo(() => splitTranscript(lesson?.listeningText), [lesson?.listeningText]);
  const questions = useMemo(() => normalizeQuestions(lesson), [lesson]);
  const prompts = useMemo(() => normalizePrompts(lesson), [lesson]);
  const sections = useMemo(() => normalizeSections(lesson), [lesson]);
  const vocabulary = useMemo(() => normalizeVocabulary(lesson), [lesson]);
  const shadowingLines = useMemo(() => normalizeShadowingLines(transcript, prompts), [transcript, prompts]);
  const audioText = transcript.join(' ');
  const currentShadowingLine = shadowingLines[shadowingIndex] || shadowingLines[0] || prompts[0];

  useEffect(() => {
    function handleJump(event) {
      const target = event?.detail?.section;
      const map = { warmup: 'guide', core: 'concept', practice: 'practice', speak: 'shadowing', review: 'answer' };
      const id = map[target] || 'guide';
      setOpenSections((current) => ({ ...current, [id]: true }));
      requestAnimationFrame(() => {
        const refKey = id === 'answer' ? 'practice' : id;
        refs[refKey]?.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
      });
    }
    window.addEventListener('fluency:lesson-jump', handleJump);
    return () => window.removeEventListener('fluency:lesson-jump', handleJump);
  }, []);

  function toggleSection(id) {
    setOpenSections((current) => ({ ...current, [id]: !current[id] }));
  }

  async function handleListen() {
    diagnostics.log('Clique recebido no botão Ouvir da aula Listening.', 'info');
    setAudioState('loading');
    setMessage('Preparando áudio natural Gemini...');
    const result = await playLearningAudio({
      text: audioText,
      label: 'Listening · transcrição',
      voiceName: 'Kore',
      style: 'Natural, warm teacher voice for A1 English listening practice. Clear pronunciation, human rhythm, not robotic.',
      preferNatural: true,
      allowBrowserFallback: true,
    });
    setAudioState('idle');
    setMessage(result.ok ? (result.source === 'browser-fallback' ? 'Gemini falhou; áudio do navegador iniciado.' : 'Áudio natural iniciado.') : (result.error || 'Não foi possível reproduzir áudio.'));
  }

  async function handleShadowingListen() {
    const text = cleanText(currentShadowingLine);
    if (!text) {
      setMessage('Nenhuma frase de shadowing disponível nesta aula.');
      return;
    }
    diagnostics.log(`Shadowing iniciado: frase ${shadowingIndex + 1}/${shadowingLines.length}.`, 'info');
    setAudioState('loading');
    setMessage('Preparando áudio natural para shadowing...');
    const result = await playLearningAudio({
      text,
      label: `Shadowing · frase ${shadowingIndex + 1}`,
      voiceName: 'Kore',
      style: 'Natural pronunciation model for English shadowing practice. Clear, slow enough to repeat, human rhythm.',
      preferNatural: true,
      allowBrowserFallback: true,
    });
    setAudioState('idle');
    setMessage(result.ok ? (result.source === 'browser-fallback' ? 'Fallback do navegador iniciado para shadowing.' : 'Áudio natural de shadowing iniciado.') : (result.error || 'Não foi possível reproduzir a frase de shadowing.'));
  }

  function handleStop() {
    stopLearningAudio();
    setAudioState('idle');
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
    saveLessonDraft({ lesson: { ...lesson, id: questionDraftKey(lesson), title: `${lesson?.title || 'Listening'} · respostas` }, answer: JSON.stringify(questionAnswers) });
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
    const result = completeLesson({ lesson, answers: { summary: answer, comprehensionAnswers: questionAnswers, shadowing: { currentPhrase: currentShadowingLine, totalPhrases: shadowingLines.length }, updatedAt: new Date().toISOString() }, writtenAnswer: answer });
    const time = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    setCompletedAt(time);
    setMessage(result.alreadyCompleted ? 'Listening já estava concluída. Progresso mantido.' : '+25 XP. Listening concluída e progresso salvo.');
    diagnostics.log(result.alreadyCompleted ? 'Listening já estava concluída; progresso mantido.' : 'Listening concluída com progresso real salvo.', 'success');
  }

  return (
    <article className="pillar-lesson listening-lesson-v1 listening-light-layout">
      <div ref={refs.guide}>
        <section className="pillar-card listening-audio-card listening-focus-card" id="lesson-guide">
          <div className="pillar-card-title"><Headphones size={17} /> Escuta guiada</div>
          <h2>{lesson?.title || 'Listening — A morning routine'}</h2>
          <p>{cleanText(lesson?.objective || 'Ouça primeiro sem ler. Depois use a transcrição para confirmar detalhes e repetir em voz alta.')}</p>
          <div className="listening-player">
            <button type="button" onClick={handleListen} disabled={audioState === 'loading'} aria-label="Ouvir áudio natural da aula"><Play size={20} /></button>
            <div><span /><span /><span /><span /><span /><span /></div>
            <button type="button" onClick={handleStop} aria-label="Parar áudio"><Pause size={18} /></button>
          </div>
          <small>{message}</small>
        </section>
      </div>

      {sections.length ? (
        <div ref={refs.concept}>
          <CollapsibleSection id="lesson-concept" title="Conceito e explicação" icon={BookOpen} summary={`${sections.length} passos curtos`} open={openSections.concept} onToggle={() => toggleSection('concept')}>
            <div className="lesson-section-stack compact">
              {sections.map((section, index) => (
                <article className="lesson-content-block" key={`${section.title}-${index}`}>
                  <small>Passo {index + 1}</small>
                  <h3>{section.title}</h3>
                  {section.content ? <p>{section.content}</p> : null}
                  {section.examples.length ? <ul>{section.examples.map((example) => <li key={example}>{example}</li>)}</ul> : null}
                </article>
              ))}
            </div>
          </CollapsibleSection>
        </div>
      ) : null}

      {vocabulary.length ? (
        <CollapsibleSection id="lesson-vocab" title="Vocabulário da aula" icon={BookOpen} summary={`${vocabulary.length} palavras-chave`} open={openSections.vocab} onToggle={() => toggleSection('vocab')}>
          <div className="lesson-vocabulary-grid compact">
            {vocabulary.map((item, index) => (
              <article className="lesson-vocab-card" key={`${item.word}-${index}`}>
                <strong>{item.word || item.meaning}</strong>
                {item.meaning ? <span>{item.meaning}</span> : null}
                {item.example ? <p>{item.example}</p> : null}
              </article>
            ))}
          </div>
        </CollapsibleSection>
      ) : null}

      <CollapsibleSection id="lesson-transcript" title="Transcrição" icon={Volume2} summary={`${transcript.length} trechos`} open={openSections.transcript} onToggle={() => toggleSection('transcript')}>
        <div className="transcript-box compact">
          {transcript.map((line, index) => <p key={`${line}-${index}`}><b>{index + 1}</b>{line}</p>)}
        </div>
      </CollapsibleSection>

      <div ref={refs.practice}>
        <CollapsibleSection id="lesson-practice" title="Compreensão" icon={ListChecks} summary={`${questions.length} exercícios`} open={openSections.practice} onToggle={() => toggleSection('practice')}>
          <p className="lesson-helper-text">Responda primeiro. A resposta esperada só aparece quando você tocar em “Ver resposta”.</p>
          <div className="listening-question-list">
            {questions.map((item, index) => {
              const currentAnswer = questionAnswers[index] || '';
              const canReveal = Boolean(revealedAnswers[index]);
              return (
                <label key={`${item.question}-${index}`}>
                  <span>{index + 1}. {item.question}</span>
                  {item.options?.length ? <div className="lesson-options-row">{item.options.map((option) => <button type="button" key={option} onClick={() => updateQuestionAnswer(index, option)} className={currentAnswer === option ? 'selected' : ''}>{option}</button>)}</div> : null}
                  <input value={currentAnswer} onChange={(event) => updateQuestionAnswer(index, event.target.value)} placeholder="Write a short answer..." autoCapitalize="sentences" autoCorrect="on" spellCheck="true" />
                  {item.answer ? (canReveal ? <small>Resposta esperada: {item.answer}</small> : <button type="button" className="inline-lesson-action" onClick={() => revealAnswer(index)}><Eye size={14} /> Ver resposta</button>) : null}
                </label>
              );
            })}
          </div>
        </CollapsibleSection>
      </div>

      <CollapsibleSection id="lesson-answer" title="Sua resposta" icon={MessageSquareText} summary={answer ? 'rascunho em andamento' : 'opcional'} open={openSections.answer} onToggle={() => toggleSection('answer')}>
        <textarea value={answer} onChange={(event) => setAnswer(event.target.value)} placeholder="Write what you understood from the audio..." autoCapitalize="sentences" autoCorrect="on" spellCheck="true" />
        <div className="writing-actions">
          <button type="button" onClick={handleSave}><Save size={16} /> Salvar rascunho</button>
          <button type="button" onClick={handleComplete}><CheckCircle2 size={16} /> Concluir Listening</button>
        </div>
        {savedAt ? <small>Rascunho salvo às {savedAt}.</small> : null}
        {completedAt ? <small>Listening concluída às {completedAt}.</small> : null}
      </CollapsibleSection>

      <div ref={refs.shadowing}>
        <CollapsibleSection id="lesson-shadowing" title="Shadowing real" icon={Repeat2} summary={`frase ${shadowingIndex + 1}/${shadowingLines.length || 1}`} open={openSections.shadowing} onToggle={() => toggleSection('shadowing')}>
          <div className="pillar-finish-card compact-shadowing">
            <div>
              <p>{currentShadowingLine}</p>
              <small>Repita tentando copiar ritmo, pausas e pronúncia.</small>
            </div>
            <div className="writing-actions">
              <button type="button" onClick={handleShadowingListen}><Volume2 size={16} /> Ouvir frase</button>
              <button type="button" onClick={nextShadowingLine}><RotateCcw size={16} /> Próxima frase</button>
            </div>
          </div>
        </CollapsibleSection>
      </div>
    </article>
  );
}
