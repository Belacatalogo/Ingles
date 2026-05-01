import { useEffect, useMemo, useRef, useState } from 'react';
import { BookOpen, CheckCircle2, ChevronDown, ChevronRight, ChevronUp, Headphones, ListChecks, MessageSquareText, Mic, Pause, Play, Repeat2, RotateCcw, Save, Volume2, XCircle } from 'lucide-react';
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

function normalizeForCheck(value) {
  return cleanText(value).toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, '').replace(/[^a-z0-9\s-]/g, ' ').replace(/\s+/g, ' ').trim();
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
    const explanation = cleanText(item.explanation || item.feedback || 'Compare sua resposta com o áudio e a transcrição.');
    return { question, answer, options, explanation };
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

function makeDistractors(answer, vocabulary) {
  const base = ['A', 'B', 'C', 'D', 'True', 'False', 'book', 'cat', 'apple', 'name', 'letter', 'spell'];
  const words = vocabulary.map((item) => item.word).filter(Boolean);
  const pool = [...words, ...base].filter((item) => normalizeForCheck(item) !== normalizeForCheck(answer));
  return [...new Set(pool)].slice(0, 3);
}

function buildQuizItems(questions, vocabulary, transcript, shadowingLines) {
  const items = [];
  const firstQuestionWithOptions = questions.find((item) => item.options?.length >= 2);
  if (firstQuestionWithOptions) {
    items.push({ ...firstQuestionWithOptions, type: 'choice', title: 'Escolha a resposta correta', instruction: 'Toque na alternativa que combina com o áudio.' });
  } else if (questions[0]) {
    const answer = questions[0].answer || 'A';
    items.push({ ...questions[0], type: 'choice', title: 'Escolha a resposta correta', instruction: 'Toque na melhor resposta.', options: [answer, ...makeDistractors(answer, vocabulary)].slice(0, 4) });
  }

  const vocab = vocabulary.find((item) => item.word && item.meaning) || vocabulary[0];
  if (vocab) {
    items.push({ type: 'choice', title: 'Vocabulário rápido', instruction: `Qual é o significado de “${vocab.word}”?`, question: `Escolha a tradução correta de “${vocab.word}”.`, answer: vocab.meaning, options: [vocab.meaning, 'pergunta', 'letra', 'ouvir'].filter(Boolean) });
  }

  const trueFalseQuestion = questions.find((item) => /true|false/i.test(item.question) || item.options?.some((option) => /true|false/i.test(option))) || questions[1];
  if (trueFalseQuestion) {
    const tfAnswer = /false/i.test(trueFalseQuestion.answer) ? 'False' : (/true/i.test(trueFalseQuestion.answer) ? 'True' : 'True');
    items.push({ ...trueFalseQuestion, type: 'truefalse', title: 'Certo ou errado?', instruction: 'Decida se a frase combina com o áudio.', question: trueFalseQuestion.question, answer: tfAnswer, options: ['True', 'False'] });
  }

  const correctionSource = transcript.find((line) => /spell|name|letter|alphabet|sound/i.test(line)) || transcript[0];
  if (correctionSource) {
    const correct = cleanText(correctionSource.split('. ')[0]).replace(/\.$/, '');
    const wrong = correct.replace(/Ana/i, 'Anna').replace(/A-N-A/i, 'A-M-A').replace(/apple/i, 'aple');
    items.push({ type: 'correct', title: 'Corrija a frase', instruction: 'Leia a frase e escreva a forma correta.', question: wrong === correct ? `${correct} (corrija se necessário)` : wrong, answer: correct, options: [] });
  }

  const writeQuestion = questions.find((item) => !item.options?.length && item.answer) || questions[2];
  if (writeQuestion) {
    items.push({ ...writeQuestion, type: 'write', title: 'Escreva a resposta', instruction: 'Digite uma resposta curta em inglês.' });
  }

  const speakLine = shadowingLines.find((line) => line.length <= 90) || shadowingLines[0] || 'My name is Ana.';
  items.push({ type: 'speak', title: 'Fale em voz alta', instruction: 'Toque no microfone e repita a frase. Se o Safari bloquear, digite o que você falou.', question: speakLine, answer: speakLine, options: [] });

  return items.filter(Boolean).slice(0, 8);
}

function isAnswerCorrect(item, value) {
  const user = normalizeForCheck(value);
  const expected = normalizeForCheck(item.answer);
  if (!user || !expected) return false;
  if (item.type === 'choice' || item.type === 'truefalse') return user === expected;
  if (item.type === 'correct') return user === expected || user.includes(expected.slice(0, Math.min(18, expected.length)));
  const expectedTokens = expected.split(' ').filter((token) => token.length > 2);
  const hits = expectedTokens.filter((token) => user.includes(token)).length;
  return user === expected || hits >= Math.max(1, Math.ceil(expectedTokens.length * 0.45));
}

function getSpeechRecognition() {
  return window.SpeechRecognition || window.webkitSpeechRecognition || null;
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
  const [quizIndex, setQuizIndex] = useState(0);
  const [quizInput, setQuizInput] = useState('');
  const [quizFeedback, setQuizFeedback] = useState(null);
  const [quizResults, setQuizResults] = useState([]);
  const [speakingState, setSpeakingState] = useState('idle');
  const [savedAt, setSavedAt] = useState('');
  const [completedAt, setCompletedAt] = useState('');
  const [shadowingIndex, setShadowingIndex] = useState(0);
  const [openSections, setOpenSections] = useState({ guide: true, concept: true, vocab: false, transcript: false, practice: true, answer: false, shadowing: true });
  const refs = { guide: useRef(null), concept: useRef(null), practice: useRef(null), shadowing: useRef(null) };

  const transcript = useMemo(() => splitTranscript(lesson?.listeningText), [lesson?.listeningText]);
  const questions = useMemo(() => normalizeQuestions(lesson), [lesson]);
  const prompts = useMemo(() => normalizePrompts(lesson), [lesson]);
  const sections = useMemo(() => normalizeSections(lesson), [lesson]);
  const vocabulary = useMemo(() => normalizeVocabulary(lesson), [lesson]);
  const shadowingLines = useMemo(() => normalizeShadowingLines(transcript, prompts), [transcript, prompts]);
  const quizItems = useMemo(() => buildQuizItems(questions, vocabulary, transcript, shadowingLines), [questions, vocabulary, transcript, shadowingLines]);
  const audioText = transcript.join(' ');
  const currentShadowingLine = shadowingLines[shadowingIndex] || shadowingLines[0] || prompts[0];
  const currentQuiz = quizItems[quizIndex];
  const quizDone = quizItems.length > 0 && quizIndex >= quizItems.length;
  const correctCount = quizResults.filter((item) => item.correct).length;

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

  function submitQuiz(value = quizInput) {
    if (!currentQuiz || quizFeedback) return;
    const finalValue = cleanText(value);
    if (!finalValue) {
      setQuizFeedback({ correct: false, empty: true, message: 'Responda antes de conferir.' });
      return;
    }
    const correct = isAnswerCorrect(currentQuiz, finalValue);
    const feedback = {
      correct,
      answer: finalValue,
      expected: currentQuiz.answer,
      message: correct ? 'Muito bem! Resposta correta.' : 'Quase. Veja a resposta correta e siga para a próxima.',
    };
    setQuizFeedback(feedback);
    setQuizResults((current) => [...current, { index: quizIndex, type: currentQuiz.type, correct, answer: finalValue, expected: currentQuiz.answer }]);
    setQuestionAnswers((current) => ({ ...current, [quizIndex]: finalValue }));
    diagnostics.log(`Quiz Listening: questão ${quizIndex + 1}/${quizItems.length} ${correct ? 'correta' : 'incorreta'}.`, correct ? 'success' : 'warn');
  }

  function nextQuiz() {
    setQuizInput('');
    setQuizFeedback(null);
    setQuizIndex((current) => Math.min(current + 1, quizItems.length));
  }

  function restartQuiz() {
    setQuizIndex(0);
    setQuizInput('');
    setQuizFeedback(null);
    setQuizResults([]);
  }

  function selectOption(option) {
    setQuizInput(option);
    submitQuiz(option);
  }

  function startSpeakingQuiz() {
    if (!currentQuiz) return;
    const SpeechRecognition = getSpeechRecognition();
    if (!SpeechRecognition) {
      setSpeakingState('unsupported');
      setQuizFeedback({ correct: false, empty: true, message: 'Reconhecimento de voz indisponível no Safari. Digite o que você falou.' });
      return;
    }
    try {
      const recognition = new SpeechRecognition();
      recognition.lang = 'en-US';
      recognition.interimResults = false;
      recognition.maxAlternatives = 1;
      setSpeakingState('listening');
      setQuizFeedback(null);
      recognition.onresult = (event) => {
        const text = event.results?.[0]?.[0]?.transcript || '';
        setSpeakingState('idle');
        setQuizInput(text);
        submitQuiz(text);
      };
      recognition.onerror = () => {
        setSpeakingState('unsupported');
        setQuizFeedback({ correct: false, empty: true, message: 'Não consegui ouvir. Digite o que você falou ou tente novamente.' });
      };
      recognition.onend = () => setSpeakingState((current) => current === 'listening' ? 'idle' : current);
      recognition.start();
    } catch {
      setSpeakingState('unsupported');
      setQuizFeedback({ correct: false, empty: true, message: 'Microfone indisponível aqui. Digite o que você falou.' });
    }
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
    saveLessonDraft({ lesson: { ...lesson, id: questionDraftKey(lesson), title: `${lesson?.title || 'Listening'} · respostas` }, answer: JSON.stringify({ quizResults, questionAnswers }) });
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
    const result = completeLesson({ lesson, answers: { summary: answer, quizResults, comprehensionAnswers: questionAnswers, shadowing: { currentPhrase: currentShadowingLine, totalPhrases: shadowingLines.length }, updatedAt: new Date().toISOString() }, writtenAnswer: answer });
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
        <CollapsibleSection id="lesson-practice" title="Prática guiada" icon={ListChecks} summary={quizDone ? `${correctCount}/${quizItems.length} corretas` : `questão ${Math.min(quizIndex + 1, quizItems.length)}/${quizItems.length}`} open={openSections.practice} onToggle={() => toggleSection('practice')}>
          <div className="fluency-quiz-card">
            <div className="fluency-quiz-progress"><span style={{ width: `${quizItems.length ? ((Math.min(quizIndex, quizItems.length) + (quizFeedback ? 1 : 0)) / quizItems.length) * 100 : 0}%` }} /></div>
            {quizDone ? (
              <div className="fluency-quiz-finish">
                <CheckCircle2 size={34} />
                <h3>Prática concluída</h3>
                <p>Você acertou {correctCount} de {quizItems.length}. Revise os erros e finalize a aula quando estiver pronto.</p>
                <button type="button" onClick={restartQuiz}><RotateCcw size={16} /> Refazer prática</button>
              </div>
            ) : currentQuiz ? (
              <>
                <header className="fluency-quiz-header">
                  <span>{currentQuiz.title}</span>
                  <b>{quizIndex + 1}/{quizItems.length}</b>
                </header>
                <p className="fluency-quiz-instruction">{currentQuiz.instruction}</p>
                <h3>{currentQuiz.question}</h3>

                {(currentQuiz.type === 'choice' || currentQuiz.type === 'truefalse') ? (
                  <div className="fluency-quiz-options">
                    {currentQuiz.options.map((option) => {
                      const selected = normalizeForCheck(quizInput) === normalizeForCheck(option);
                      const right = quizFeedback && normalizeForCheck(option) === normalizeForCheck(currentQuiz.answer);
                      const wrong = quizFeedback && selected && !right;
                      return <button type="button" key={option} className={right ? 'right' : wrong ? 'wrong' : selected ? 'selected' : ''} onClick={() => selectOption(option)} disabled={Boolean(quizFeedback)}>{option}</button>;
                    })}
                  </div>
                ) : currentQuiz.type === 'speak' ? (
                  <div className="fluency-quiz-speaking">
                    <button type="button" onClick={startSpeakingQuiz} disabled={speakingState === 'listening' || Boolean(quizFeedback)}><Mic size={20} /> {speakingState === 'listening' ? 'Ouvindo...' : 'Falar agora'}</button>
                    <input value={quizInput} onChange={(event) => setQuizInput(event.target.value)} placeholder="Ou digite o que você falou..." disabled={Boolean(quizFeedback)} />
                  </div>
                ) : (
                  <textarea value={quizInput} onChange={(event) => setQuizInput(event.target.value)} placeholder={currentQuiz.type === 'correct' ? 'Escreva a frase corrigida...' : 'Digite sua resposta...'} disabled={Boolean(quizFeedback)} />
                )}

                {quizFeedback ? (
                  <div className={`fluency-quiz-feedback ${quizFeedback.correct ? 'right' : 'wrong'}`}>
                    {quizFeedback.correct ? <CheckCircle2 size={19} /> : <XCircle size={19} />}
                    <div>
                      <strong>{quizFeedback.message}</strong>
                      {!quizFeedback.correct && !quizFeedback.empty ? <small>Resposta esperada: {currentQuiz.answer}</small> : null}
                    </div>
                  </div>
                ) : null}

                <footer className="fluency-quiz-actions">
                  {!quizFeedback ? <button type="button" onClick={() => submitQuiz()}>{currentQuiz.type === 'choice' || currentQuiz.type === 'truefalse' ? 'Conferir' : 'Responder'}</button> : <button type="button" onClick={nextQuiz}>Continuar <ChevronRight size={16} /></button>}
                </footer>
              </>
            ) : null}
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
