import { useEffect, useMemo, useState } from 'react';
import { Award, ChevronRight, Headphones, Info, Mic, Play, RefreshCw, Sparkles, Square, Volume2 } from 'lucide-react';
import { analyzePronunciation } from '../services/azurePronunciation.js';
import { playLearningAudio, stopLearningAudio } from '../services/audioPlayback.js';
import { getCurrentLesson } from '../services/lessonStore.js';
import { getSpeakingSessions, recordSpeakingSession } from '../services/progressStore.js';
import { startRecording, stopRecording } from '../services/recorder.js';

const MIN_RECORDING_MS = 2800;
const MIN_RECOGNIZED_WORDS = 2;

const levelConversations = {
  A1: {
    title: 'Apresentação e rotina simples',
    label: 'A1 · conversa guiada',
    description: 'Use frases simples e completas. A análise usa um modelo A1 para evitar cortes e confusão no Azure.',
    prompts: [
      { question: 'Hi! What is your name?', model: 'My name is Luis.' },
      { question: 'Where are you from?', model: 'I am from Brazil.' },
      { question: 'What do you do every morning?', model: 'I study English every morning.' },
      { question: 'What food do you like?', model: 'I like rice and beans.' },
      { question: 'Tell me one thing about your family.', model: 'My family is small.' },
    ],
  },
  A2: {
    title: 'Rotina, passado simples e planos',
    label: 'A2 · conversa guiada',
    description: 'Responda com frases curtas sobre rotina, passado e planos simples.',
    prompts: [
      { question: 'What did you do yesterday?', model: 'I studied English yesterday.' },
      { question: 'What are you going to do tomorrow?', model: 'I am going to study tomorrow.' },
      { question: 'Tell me about your city.', model: 'My city is small and quiet.' },
      { question: 'What do you usually study?', model: 'I usually study English at night.' },
      { question: 'What should a student do every day?', model: 'A student should practice every day.' },
    ],
  },
  B1: {
    title: 'Experiências e opinião simples',
    label: 'B1 · conversa intermediária',
    description: 'Use experiências, opiniões e justificativas curtas.',
    prompts: [
      { question: 'Tell me about your weekend.', model: 'I stayed home and studied English.' },
      { question: 'What have you learned recently?', model: 'I have learned new English words recently.' },
      { question: 'Why is English important for you?', model: 'English is important because it helps me study and work.' },
      { question: 'Describe a challenge you had.', model: 'I had a challenge with pronunciation.' },
      { question: 'Give one more detail about your answer.', model: 'I want to improve a little every day.' },
    ],
  },
};

const pronunciationByLevel = {
  A1: [
    { text: 'My name is Luis.', ipa: '/maɪ neɪm ɪz luˈis/' },
    { text: 'I am from Brazil.', ipa: '/aɪ æm frəm brəˈzɪl/' },
    { text: 'I study English every day.', ipa: '/aɪ ˈstʌdi ˈɪŋɡlɪʃ ˈevri deɪ/' },
    { text: 'This is my notebook.', ipa: '/ðɪs ɪz maɪ ˈnoʊtbʊk/' },
  ],
  A2: [
    { text: 'I went to the market yesterday.', ipa: '/aɪ went tə ðə ˈmɑːrkɪt ˈjestərdeɪ/' },
    { text: 'I am going to study tonight.', ipa: '/aɪ æm ˈɡoʊɪŋ tə ˈstʌdi təˈnaɪt/' },
  ],
  B1: [
    { text: 'I have already finished my homework.', ipa: '/aɪ hæv ɔːlˈredi ˈfɪnɪʃt maɪ ˈhoʊmwɜːrk/' },
    { text: 'We practiced English before dinner.', ipa: '/wi ˈpræktɪst ˈɪŋɡlɪʃ bɪˈfɔːr ˈdɪnər/' },
  ],
};

const immersionScenes = [
  { label: 'Café', title: 'Pedindo um café', level: 'A1 · viagem', line: 'Can I have a coffee, please?', tip: 'Use “Can I have...” para pedir algo de forma simples.' },
  { label: 'Hotel', title: 'Check-in simples', level: 'A1 · viagem', line: 'My name is Luis. I have a reservation.', tip: 'Duas frases curtas funcionam bem no A1.' },
  { label: 'Rua', title: 'Pedindo informação', level: 'A1 · sobrevivência', line: 'Excuse me, where is the bus stop?', tip: 'Comece com “Excuse me” para soar educado.' },
];

function todayKey(date = new Date()) { return date.toISOString().slice(0, 10); }
function getLessonId(lesson) { return lesson?.id || `${lesson?.type || 'lesson'}-${lesson?.title || 'untitled'}`; }
function getLevel(lesson) { return String(lesson?.level || 'A1').toUpperCase().slice(0, 2); }
function scoreClass(score) { if (score == null) return 'warn'; if (score >= 85) return 'good'; if (score >= 70) return 'warn'; return 'bad'; }
function getScore(result) { return result?.pronunciationScore ?? result?.accuracyScore ?? null; }
function getWordScore(word) { return word?.accuracyScore ?? word?.score ?? null; }
function countWords(text) { return String(text || '').trim().split(/\s+/).filter(Boolean).length; }
function getAnalyzedWords(result, fallbackText = '') {
  if (Array.isArray(result?.words) && result.words.length) return result.words.map((word) => ({ word: word.word, score: getWordScore(word), status: word.status, errorType: word.errorType }));
  return fallbackText.split(/\s+/).filter(Boolean).map((word) => ({ word: word.replace(/[“”".,!?]/g, ''), score: null, status: 'unknown', errorType: 'Unknown' }));
}
function getFocusWord(result, fallbackText = '') {
  if (!result) return null;
  const words = getAnalyzedWords(result, fallbackText);
  return words.filter((word) => word.score != null).sort((a, b) => a.score - b.score)[0] || words.find((word) => word.status !== 'correct') || null;
}
function buildWordTip(word) {
  if (!word?.word) return 'Grave novamente para eu apontar exatamente o ponto de melhoria.';
  const scoreText = word.score != null ? ` O Azure deu ${word.score}/100 para essa palavra.` : '';
  if (word.errorType === 'Omission') return `O Azure entendeu que você pulou “${word.word}”. Tente falar essa palavra com clareza.${scoreText}`;
  if (word.errorType && word.errorType !== 'None') return `O ponto mais fraco foi “${word.word}”. Repita devagar e depois fale a frase completa.${scoreText}`;
  if (word.score != null && word.score < 85) return `“${word.word}” pode soar mais natural. Trabalhe ritmo, vogal principal e terminação.${scoreText}`;
  return `Sua pronúncia de “${word.word}” ficou boa. Continue buscando ritmo natural.`;
}
function buildConversationReply(score, nextPrompt) {
  const intro = score == null ? 'Good. ' : score >= 85 ? 'Great answer! ' : score >= 70 ? 'Good job. ' : 'I understood part of it. ';
  return nextPrompt ? `${intro}${nextPrompt.question}` : `${intro}Speaking session complete.`;
}
function findTodaySpeakingSession(lesson, level) {
  const today = todayKey();
  const lessonId = getLessonId(lesson);
  return getSpeakingSessions().find((item) => item.lessonId === lessonId && item.level === level && String(item.completedAt || '').slice(0, 10) === today) || null;
}
function modelHint(prompt) { return `Modelo: “${prompt.model}”`; }

export function SpeakingScreen() {
  const currentLesson = getCurrentLesson();
  const level = getLevel(currentLesson);
  const conversation = levelConversations[level] || levelConversations.A1;
  const pronunciationPrompts = pronunciationByLevel[level] || pronunciationByLevel.A1;
  const restoredSession = useMemo(() => findTodaySpeakingSession(currentLesson, level), [currentLesson?.id, currentLesson?.title, level]);
  const [mode, setMode] = useState('conversation');
  const [activeScene, setActiveScene] = useState(0);
  const [pronunciationIndex, setPronunciationIndex] = useState(0);
  const [promptIndex, setPromptIndex] = useState(0);
  const [recording, setRecording] = useState(false);
  const [recordingStartedAt, setRecordingStartedAt] = useState(0);
  const [analyzing, setAnalyzing] = useState(false);
  const [result, setResult] = useState(null);
  const [message, setMessage] = useState(restoredSession ? 'Conversação já concluída hoje.' : 'Toque para responder em inglês.');
  const [attempts, setAttempts] = useState([]);
  const [sessionStart, setSessionStart] = useState(null);
  const [sessionRecord, setSessionRecord] = useState(restoredSession);
  const [chatMessages, setChatMessages] = useState(() => [
    { who: 'ai', text: conversation.prompts[0].question },
    { who: 'ai', text: `${modelHint(conversation.prompts[0])} Fale a frase completa e só depois toque para parar.` },
  ]);
  const scene = immersionScenes[activeScene];
  const pronunciationPrompt = pronunciationPrompts[pronunciationIndex % pronunciationPrompts.length];
  const pronunciationText = pronunciationPrompt.text;
  const currentConversationPrompt = conversation.prompts[promptIndex] || conversation.prompts[0];
  const pronunciationScore = getScore(result);
  const analyzedWords = useMemo(() => getAnalyzedWords(result, pronunciationText), [result, pronunciationText]);
  const focusWord = useMemo(() => getFocusWord(result, pronunciationText), [result, pronunciationText]);
  const sessionDone = Boolean(sessionRecord);
  const spokenCount = sessionRecord?.spokenCount || attempts.length;
  const averageScore = sessionRecord?.averageScore || (attempts.length ? Math.round(attempts.reduce((sum, item) => sum + Number(item.score || 0), 0) / attempts.length) : 0);

  useEffect(() => {
    setChatMessages([{ who: 'ai', text: conversation.prompts[0].question }, { who: 'ai', text: `${modelHint(conversation.prompts[0])} Fale a frase completa e só depois toque para parar.` }]);
    setPromptIndex(0);
    if (restoredSession) { setSessionRecord(restoredSession); setMessage('Conversação já concluída hoje.'); }
  }, [conversation.title, restoredSession?.id]);

  async function handleSpeak(text = pronunciationText) {
    setMessage('Preparando áudio...');
    const response = await playLearningAudio({ text, label: `Speaking · ${mode}`, voiceName: 'Kore', style: 'Natural English conversation model. Clear, friendly and easy to repeat.' });
    setMessage(response.ok ? 'Áudio iniciado.' : response.error || 'Erro ao reproduzir áudio.');
  }

  async function handleNextPronunciation() {
    if (recording || analyzing) return;
    const nextIndex = (pronunciationIndex + 1) % pronunciationPrompts.length;
    setPronunciationIndex(nextIndex);
    setResult(null);
    setMessage('Próxima frase carregada.');
    await handleSpeak(pronunciationPrompts[nextIndex].text);
  }

  function completeSpeaking(nextAttempts, durationMs) {
    const avg = nextAttempts.length ? Math.round(nextAttempts.reduce((sum, item) => sum + Number(item.score || 0), 0) / nextAttempts.length) : 0;
    const record = recordSpeakingSession({ lesson: currentLesson, level, scenario: conversation.title, mode: 'conversation', spokenCount: nextAttempts.length, durationMs, averageScore: avg, attempts: nextAttempts });
    setSessionRecord(record);
    setMessage('Conversação concluída e registrada para Hoje.');
  }

  function appendConversationAnalysis(analysisResult, referenceText) {
    const score = getScore(analysisResult);
    const recognizedText = analysisResult?.recognizedText || '';
    if (countWords(recognizedText) < MIN_RECOGNIZED_WORDS) {
      setMessage('O Azure ouviu só um pedaço da frase. Grave de novo, fale a frase completa e espere um instante antes de parar.');
      setChatMessages((current) => [...current, { who: 'ai', text: `Ouvi muito pouco: “${recognizedText || 'áudio curto'}”. Tente de novo: ${modelHint(currentConversationPrompt)}` }]);
      return;
    }
    const focus = getFocusWord(analysisResult, referenceText);
    const nextIndex = Math.min(promptIndex + 1, conversation.prompts.length - 1);
    const nextPrompt = conversation.prompts[nextIndex];
    const nextAttempts = [...attempts, { referenceText, spokenText: recognizedText, score, focusWord: focus?.word || '', createdAt: new Date().toISOString() }];
    const start = sessionStart || Date.now();
    const durationMs = Date.now() - start;
    setAttempts(nextAttempts);
    setPromptIndex(nextIndex);
    setChatMessages((current) => [
      ...current,
      { who: 'you', text: recognizedText, score, errors: focus ? [{ word: focus.word, note: buildWordTip(focus) }] : [] },
      { who: 'ai', text: nextAttempts.length >= 5 ? buildConversationReply(score, null) : `${buildConversationReply(score, nextPrompt)} ${modelHint(nextPrompt)}` },
    ]);
    if (nextAttempts.length >= 5 || durationMs >= 180000) completeSpeaking(nextAttempts, durationMs);
  }

  async function handleRecordToggle(referenceText = pronunciationText) {
    if (sessionDone && mode === 'conversation') { setMessage('Conversação já concluída hoje. Toque em “Nova sessão” para praticar de novo.'); return; }
    if (!recording) {
      const started = await startRecording();
      if (!started.ok) { setMessage(started.error || 'Não foi possível iniciar gravação.'); return; }
      if (!sessionStart) setSessionStart(Date.now());
      setRecordingStartedAt(started.startedAt || Date.now());
      setResult(null);
      setRecording(true);
      setMessage('Gravando… fale a frase completa. Depois espere um instante e toque para parar.');
      return;
    }
    const elapsed = Date.now() - recordingStartedAt;
    if (elapsed < MIN_RECORDING_MS) {
      setMessage('Continue falando. O app só analisa depois de pelo menos 3 segundos para evitar áudio cortado.');
      return;
    }
    setRecording(false);
    setAnalyzing(true);
    setMessage('Finalizando gravação...');
    const stopped = await stopRecording();
    if (!stopped.ok) { setAnalyzing(false); setMessage(stopped.error || 'Erro ao parar gravação.'); return; }
    setMessage('Enviando para análise Azure...');
    const analyzed = await analyzePronunciation({ audioBlob: stopped.audioBlob, referenceText });
    setAnalyzing(false);
    if (analyzed.status !== 'success') { setMessage(analyzed.error || 'Não foi possível analisar a pronúncia.'); return; }
    setResult(analyzed.result);
    if (mode === 'conversation') appendConversationAnalysis(analyzed.result, referenceText);
    else setMessage('Análise concluída.');
  }

  function startNewSpeakingSession() {
    setSessionRecord(null); setAttempts([]); setPromptIndex(0); setSessionStart(null); setResult(null);
    setChatMessages([{ who: 'ai', text: conversation.prompts[0].question }, { who: 'ai', text: `${modelHint(conversation.prompts[0])} Fale a frase completa e só depois toque para parar.` }]);
    setMessage('Nova sessão iniciada.');
  }

  return (
    <section className="speaking-reference-screen">
      <header className="speaking-reference-header">
        <div><h1>Speaking</h1><p>{mode === 'immersion' ? 'Imersão guiada por cenário' : 'Conversa guiada por IA'}</p></div>
        <div className="speaking-mode-switch" role="tablist" aria-label="Modo de speaking">
          <button type="button" className={mode === 'conversation' ? 'active' : ''} onClick={() => setMode('conversation')}>Conversa</button>
          <button type="button" className={mode === 'pronunciation' ? 'active' : ''} onClick={() => setMode('pronunciation')}>Pronúncia</button>
          <button type="button" className={mode === 'immersion' ? 'active' : ''} onClick={() => setMode('immersion')}>Imersão</button>
        </div>
      </header>

      {mode === 'conversation' ? <>
        <section className="speaking-scenario-card"><div className="speaking-chip-row"><span className="speaking-chip teal"><Sparkles size={11} /> Cenário</span><span className="speaking-chip">{conversation.label}</span></div><strong>{conversation.title}</strong><p>{conversation.description}</p></section>
        {sessionDone ? <section className="speaking-session-complete"><Award size={22} /><span>Conversação concluída hoje</span><strong>{spokenCount} fala(s) registradas</strong><p>Média Azure: {averageScore || 0}/100. Hoje agora pode contar Conversação como tarefa real.</p><button type="button" onClick={startNewSpeakingSession}>Nova sessão</button></section> : null}
        <section className="speaking-chat-list" aria-label="Conversa guiada">{chatMessages.map((item, index) => <article className={`speaking-chat-row ${item.who}`} key={`${item.who}-${index}-${item.text}`}><div className="speaking-chat-bubble-wrap">{item.who === 'ai' ? <div className="speaking-ai-label"><span>F</span> Fluency</div> : null}<div className="speaking-chat-bubble">{item.text}</div>{item.who === 'ai' ? <button className="speaking-listen-link" type="button" onClick={() => handleSpeak(item.text)}><Volume2 size={11} /> Ouvir</button> : null}{item.score !== undefined && item.score !== null ? <div className="speaking-chat-feedback"><div><strong>Pronúncia: {item.score}%</strong><span>{item.errors?.length || 0} dica</span></div>{(item.errors || []).map((error) => <p key={error.word}><b>{error.word}</b> · {error.note}</p>)}</div> : null}</div></article>)}</section>
        <section className="speaking-mic-card"><button className={recording ? 'speaking-main-mic recording' : 'speaking-main-mic'} type="button" onClick={() => handleRecordToggle(currentConversationPrompt.model)} disabled={analyzing} aria-label={recording ? 'Parar gravação' : 'Começar gravação'}>{recording ? <Square size={30} /> : <Mic size={32} />}</button><strong>{recording ? 'Falando…' : analyzing ? 'Analisando…' : sessionDone ? 'Sessão concluída' : 'Toque para responder'}</strong>{recording ? <div className="speaking-wave"><span /><span /><span /><span /><span /></div> : null}<p>{sessionDone ? 'Use Nova sessão para praticar mais.' : `${attempts.length}/5 respostas para concluir`}</p><small>{message}</small></section>
      </> : null}

      {mode === 'pronunciation' ? <><section className="speaking-pronunciation-hero"><p>Repita a frase</p><h2>“{pronunciationText}”</h2><code>{pronunciationPrompt.ipa}</code><button className="speaking-small-button" type="button" onClick={() => handleSpeak(pronunciationText)}><Volume2 size={13} /> Ouvir modelo</button></section><section className="speaking-score-panel"><div className="speaking-score-header"><div><span>Sua tentativa</span><strong><b>{pronunciationScore ?? '—'}</b><em>/ 100</em></strong></div><button className="speaking-small-button ghost" type="button" onClick={stopLearningAudio}><Play size={12} /> Parar voz</button></div><div className="speaking-word-score-row">{analyzedWords.map((item) => <span className={scoreClass(item.score)} key={`${pronunciationText}-${item.word}-${item.score ?? 'pending'}`}>{item.word}</span>)}</div><div className="speaking-pronunciation-tip"><div><Info size={13} /><strong>{focusWord ? `Foco em “${focusWord.word}”` : 'Foco da próxima tentativa'}</strong></div><p>{focusWord ? buildWordTip(focusWord) : 'Grave sua frase para receber um foco real baseado na análise do Azure.'}</p></div></section><div className="speaking-pronunciation-actions"><button className="speaking-action-secondary" type="button" onClick={() => handleRecordToggle(pronunciationText)} disabled={analyzing}><RefreshCw size={14} /> {recording ? 'Parar e analisar' : 'Tentar de novo'}</button><button className="speaking-action-primary" type="button" onClick={handleNextPronunciation} disabled={recording || analyzing}>Próxima <ChevronRight size={14} /></button></div><p className="speaking-status-line">{message}</p></> : null}
      {mode === 'immersion' ? <><section className="speaking-immersion-hero"><div className="speaking-chip-row"><span className="speaking-chip teal"><Headphones size={11} /> Imersão</span></div><strong>Treine inglês como se estivesse lá</strong><p>Escolha um cenário A1, escute a frase natural e responda falando em inglês.</p></section><section className="speaking-immersion-scenes" aria-label="Cenários de imersão">{immersionScenes.map((item, index) => <button className={`speaking-immersion-scene ${activeScene === index ? 'active' : ''}`} key={item.title} type="button" onClick={() => setActiveScene(index)}><span>{item.label}</span><div><strong>{item.title}</strong><small>{item.level}</small></div></button>)}</section><section className="speaking-immersion-card"><div className="speaking-immersion-card-top"><span>{scene.level}</span><button type="button" onClick={() => handleSpeak(scene.line)}><Volume2 size={13} /> Ouvir</button></div><h2>“{scene.line}”</h2><p>{scene.tip}</p></section><section className="speaking-mic-card immersion"><button className={recording ? 'speaking-main-mic recording' : 'speaking-main-mic'} type="button" onClick={() => handleRecordToggle(scene.line)} disabled={analyzing} aria-label={recording ? 'Parar gravação' : 'Começar gravação'}>{recording ? <Square size={30} /> : <Mic size={32} />}</button><strong>{recording ? 'Gravando resposta…' : analyzing ? 'Analisando…' : 'Responder no cenário'}</strong>{recording ? <div className="speaking-wave"><span /><span /><span /><span /><span /></div> : null}<p>Fale como se estivesse na situação real.</p><small>{message}</small></section></> : null}
    </section>
  );
}
