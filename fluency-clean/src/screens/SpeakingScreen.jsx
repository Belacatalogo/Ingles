import { useEffect, useMemo, useState } from 'react';
import { Award, ChevronRight, Headphones, Info, Mic, Play, RefreshCw, Sparkles, Volume2 } from 'lucide-react';
import { analyzePronunciation, recognizeSpeech } from '../services/azurePronunciation.js';
import { playLearningAudio, stopLearningAudio } from '../services/audioPlayback.js';
import { getCurrentLesson } from '../services/lessonStore.js';
import { getSpeakingSessions, recordSpeakingSession } from '../services/progressStore.js';
import { startRecording } from '../services/recorder.js';

const MIN_RECOGNIZED_WORDS = 2;

const levelConversations = {
  A1: {
    title: 'Apresentação e rotina simples',
    label: 'A1 · conversa livre',
    description: 'Responda do seu jeito. Toque no microfone, fale e pare naturalmente: a gravação encerra sozinha quando detectar silêncio.',
    prompts: ['Hi! What is your name?', 'Where are you from?', 'What do you do every morning?', 'What food do you like?', 'Tell me one thing about your family.'],
  },
  A2: {
    title: 'Rotina, passado simples e planos',
    label: 'A2 · conversa livre',
    description: 'Responda livremente com frases curtas sobre rotina, passado e planos simples.',
    prompts: ['What did you do yesterday?', 'What are you going to do tomorrow?', 'Tell me about your city.', 'What do you usually study?', 'What should a student do every day?'],
  },
  B1: {
    title: 'Experiências e opinião simples',
    label: 'B1 · conversa livre',
    description: 'Use experiências, opiniões e justificativas curtas.',
    prompts: ['Tell me about your weekend.', 'What have you learned recently?', 'Why is English important for you?', 'Describe a challenge you had.', 'Give one more detail about your answer.'],
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
function buildConversationReply(spokenText, nextPrompt) {
  const intro = countWords(spokenText) >= 5 ? 'Great, I understood you. ' : 'Good, I understood. ';
  return nextPrompt ? `${intro}${nextPrompt}` : `${intro}Speaking session complete.`;
}
function buildPronunciationFeedback(pronunciationResult, recognizedText) {
  const score = getScore(pronunciationResult);
  const focus = getFocusWord(pronunciationResult, recognizedText);
  const words = getAnalyzedWords(pronunciationResult, recognizedText)
    .filter((word) => word.score != null)
    .sort((a, b) => a.score - b.score)
    .slice(0, 3);
  const errors = focus ? [{ word: focus.word, note: buildWordTip(focus) }] : [];
  return { score, focusWord: focus?.word || '', errors, words };
}
function findTodaySpeakingSession(lesson, level) {
  const today = todayKey();
  const lessonId = getLessonId(lesson);
  return getSpeakingSessions().find((item) => item.lessonId === lessonId && item.level === level && String(item.completedAt || '').slice(0, 10) === today) || null;
}

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
  const [analyzing, setAnalyzing] = useState(false);
  const [result, setResult] = useState(null);
  const [message, setMessage] = useState(restoredSession ? 'Conversação já concluída hoje.' : 'Toque para responder em inglês.');
  const [attempts, setAttempts] = useState([]);
  const [sessionStart, setSessionStart] = useState(null);
  const [sessionRecord, setSessionRecord] = useState(restoredSession);
  const [chatMessages, setChatMessages] = useState(() => [
    { who: 'ai', text: conversation.prompts[0] },
    { who: 'ai', text: 'Fale livremente. Quando você parar de falar, eu paro a gravação e analiso automaticamente.' },
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
    setChatMessages([{ who: 'ai', text: conversation.prompts[0] }, { who: 'ai', text: 'Fale livremente. Quando você parar de falar, eu paro a gravação e analiso automaticamente.' }]);
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
    const scored = nextAttempts.filter((item) => item.score != null);
    const avg = scored.length ? Math.round(scored.reduce((sum, item) => sum + Number(item.score || 0), 0) / scored.length) : 0;
    const record = recordSpeakingSession({ lesson: currentLesson, level, scenario: conversation.title, mode: 'conversation', spokenCount: nextAttempts.length, durationMs, averageScore: avg, attempts: nextAttempts });
    setSessionRecord(record);
    setMessage('Conversação concluída e registrada para Hoje.');
  }

  function appendFreeSpeechAnalysis(recognizedText, pronunciationResult = null) {
    if (countWords(recognizedText) < MIN_RECOGNIZED_WORDS) {
      setMessage('Ouvi só um pedaço da frase. Tente de novo falando de forma natural até terminar.');
      setChatMessages((current) => [...current, { who: 'ai', text: `Ouvi muito pouco: “${recognizedText || 'áudio curto'}”. Toque no microfone e responda de novo do seu jeito.` }]);
      return;
    }
    const feedback = buildPronunciationFeedback(pronunciationResult, recognizedText);
    const nextIndex = Math.min(promptIndex + 1, conversation.prompts.length - 1);
    const nextPrompt = conversation.prompts[nextIndex];
    const score = feedback.score ?? Math.min(100, Math.max(60, countWords(recognizedText) * 10));
    const nextAttempts = [...attempts, {
      referenceText: currentConversationPrompt,
      spokenText: recognizedText,
      score,
      focusWord: feedback.focusWord,
      errors: feedback.errors,
      weakestWords: feedback.words,
      createdAt: new Date().toISOString(),
    }];
    const start = sessionStart || Date.now();
    const durationMs = Date.now() - start;
    setAttempts(nextAttempts);
    setPromptIndex(nextIndex);
    setChatMessages((current) => [
      ...current,
      { who: 'you', text: recognizedText, score, errors: feedback.errors, weakestWords: feedback.words },
      { who: 'ai', text: nextAttempts.length >= 5 ? buildConversationReply(recognizedText, null) : buildConversationReply(recognizedText, nextPrompt) },
    ]);
    if (nextAttempts.length >= 5 || durationMs >= 180000) completeSpeaking(nextAttempts, durationMs);
  }

  async function analyzeFreeSpeech(stopped) {
    setRecording(false);
    setAnalyzing(true);
    setMessage('Silêncio detectado. Transcrevendo sua fala...');
    if (!stopped.ok) { setAnalyzing(false); setMessage(stopped.error || 'Erro ao finalizar gravação.'); return; }
    const transcribed = await recognizeSpeech({ audioBlob: stopped.audioBlob });
    if (transcribed.status !== 'success') { setAnalyzing(false); setMessage(transcribed.error || 'Não foi possível transcrever sua fala.'); return; }
    const recognizedText = transcribed.result?.recognizedText || '';
    if (countWords(recognizedText) < MIN_RECOGNIZED_WORDS) {
      setAnalyzing(false);
      appendFreeSpeechAnalysis(recognizedText, null);
      return;
    }
    setMessage('Transcrição feita. Avaliando sua pronúncia...');
    const pronunciation = await analyzePronunciation({ audioBlob: stopped.audioBlob, referenceText: recognizedText });
    setAnalyzing(false);
    appendFreeSpeechAnalysis(recognizedText, pronunciation.status === 'success' ? pronunciation.result : null);
    setMessage(pronunciation.status === 'success' ? 'Análise de pronúncia concluída.' : 'Transcrição concluída. Feedback de pronúncia indisponível nesta tentativa.');
  }

  async function handleConversationRecord() {
    if (sessionDone) { setMessage('Conversação já concluída hoje. Toque em “Nova sessão” para praticar de novo.'); return; }
    if (recording || analyzing) return;
    const started = await startRecording({ onAutoStop: analyzeFreeSpeech, minDurationMs: 1200, silenceMs: 1700, maxDurationMs: 18000 });
    if (!started.ok) { setMessage(started.error || 'Não foi possível iniciar gravação.'); return; }
    if (!sessionStart) setSessionStart(Date.now());
    setResult(null);
    setRecording(true);
    setMessage('Gravando… fale livremente. Vou parar sozinho quando você terminar.');
  }

  async function handlePronunciationRecord(referenceText = pronunciationText) {
    if (recording || analyzing) return;
    const started = await startRecording({
      minDurationMs: 900,
      silenceMs: 1400,
      maxDurationMs: 12000,
      onAutoStop: async (stopped) => {
        setRecording(false);
        setAnalyzing(true);
        setMessage('Silêncio detectado. Analisando pronúncia...');
        if (!stopped.ok) { setAnalyzing(false); setMessage(stopped.error || 'Erro ao finalizar gravação.'); return; }
        const analyzed = await analyzePronunciation({ audioBlob: stopped.audioBlob, referenceText });
        setAnalyzing(false);
        if (analyzed.status !== 'success') { setMessage(analyzed.error || 'Não foi possível analisar a pronúncia.'); return; }
        setResult(analyzed.result);
        setMessage('Análise concluída.');
      },
    });
    if (!started.ok) { setMessage(started.error || 'Não foi possível iniciar gravação.'); return; }
    setResult(null);
    setRecording(true);
    setMessage('Gravando… fale a frase. Vou analisar quando você parar.');
  }

  function startNewSpeakingSession() {
    setSessionRecord(null); setAttempts([]); setPromptIndex(0); setSessionStart(null); setResult(null);
    setChatMessages([{ who: 'ai', text: conversation.prompts[0] }, { who: 'ai', text: 'Fale livremente. Quando você parar de falar, eu paro a gravação e analiso automaticamente.' }]);
    setMessage('Nova sessão iniciada.');
  }

  return (
    <section className="speaking-reference-screen">
      <header className="speaking-reference-header">
        <div><h1>Speaking</h1><p>{mode === 'immersion' ? 'Imersão guiada por cenário' : 'Conversa guiada por IA'}</p></div>
        <div className="speaking-mode-switch" role="tablist" aria-label="Modo de speaking"><button type="button" className={mode === 'conversation' ? 'active' : ''} onClick={() => setMode('conversation')}>Conversa</button><button type="button" className={mode === 'pronunciation' ? 'active' : ''} onClick={() => setMode('pronunciation')}>Pronúncia</button><button type="button" className={mode === 'immersion' ? 'active' : ''} onClick={() => setMode('immersion')}>Imersão</button></div>
      </header>
      {mode === 'conversation' ? <><section className="speaking-scenario-card"><div className="speaking-chip-row"><span className="speaking-chip teal"><Sparkles size={11} /> Cenário</span><span className="speaking-chip">{conversation.label}</span></div><strong>{conversation.title}</strong><p>{conversation.description}</p></section>{sessionDone ? <section className="speaking-session-complete"><Award size={22} /><span>Conversação concluída hoje</span><strong>{spokenCount} fala(s) registradas</strong><p>Média de pronúncia: {averageScore || 0}/100. Hoje agora pode contar Conversação como tarefa real.</p><button type="button" onClick={startNewSpeakingSession}>Nova sessão</button></section> : null}<section className="speaking-chat-list" aria-label="Conversa guiada">{chatMessages.map((item, index) => <article className={`speaking-chat-row ${item.who}`} key={`${item.who}-${index}-${item.text}`}><div className="speaking-chat-bubble-wrap">{item.who === 'ai' ? <div className="speaking-ai-label"><span>F</span> Fluency</div> : null}<div className="speaking-chat-bubble">{item.text}</div>{item.who === 'ai' ? <button className="speaking-listen-link" type="button" onClick={() => handleSpeak(item.text)}><Volume2 size={11} /> Ouvir</button> : null}{item.score !== undefined && item.score !== null ? <div className="speaking-chat-feedback"><div><strong>Pronúncia: {item.score}%</strong><span>{item.errors?.length || 0} dica</span></div>{(item.errors || []).map((error) => <p key={`${error.word}-${error.note}`}><b>{error.word}</b> · {error.note}</p>)}{item.weakestWords?.length ? <small>Palavras para revisar: {item.weakestWords.map((word) => `${word.word} (${word.score})`).join(', ')}</small> : null}</div> : null}</div></article>)}</section><section className="speaking-mic-card"><button className={recording ? 'speaking-main-mic recording' : 'speaking-main-mic'} type="button" onClick={handleConversationRecord} disabled={analyzing || recording} aria-label="Começar gravação automática"><Mic size={32} /></button><strong>{recording ? 'Ouvindo…' : analyzing ? 'Analisando…' : sessionDone ? 'Sessão concluída' : 'Toque e fale livremente'}</strong>{recording ? <div className="speaking-wave"><span /><span /><span /><span /><span /></div> : null}<p>{sessionDone ? 'Use Nova sessão para praticar mais.' : `${attempts.length}/5 respostas para concluir`}</p><small>{message}</small></section></> : null}
      {mode === 'pronunciation' ? <><section className="speaking-pronunciation-hero"><p>Repita a frase</p><h2>“{pronunciationText}”</h2><code>{pronunciationPrompt.ipa}</code><button className="speaking-small-button" type="button" onClick={() => handleSpeak(pronunciationText)}><Volume2 size={13} /> Ouvir modelo</button></section><section className="speaking-score-panel"><div className="speaking-score-header"><div><span>Sua tentativa</span><strong><b>{pronunciationScore ?? '—'}</b><em>/ 100</em></strong></div><button className="speaking-small-button ghost" type="button" onClick={stopLearningAudio}><Play size={12} /> Parar voz</button></div><div className="speaking-word-score-row">{analyzedWords.map((item) => <span className={scoreClass(item.score)} key={`${pronunciationText}-${item.word}-${item.score ?? 'pending'}`}>{item.word}</span>)}</div><div className="speaking-pronunciation-tip"><div><Info size={13} /><strong>{focusWord ? `Foco em “${focusWord.word}”` : 'Foco da próxima tentativa'}</strong></div><p>{focusWord ? buildWordTip(focusWord) : 'Grave sua frase para receber um foco real baseado na análise do Azure.'}</p></div></section><div className="speaking-pronunciation-actions"><button className="speaking-action-secondary" type="button" onClick={() => handlePronunciationRecord(pronunciationText)} disabled={recording || analyzing}><RefreshCw size={14} /> Tentar de novo</button><button className="speaking-action-primary" type="button" onClick={handleNextPronunciation} disabled={recording || analyzing}>Próxima <ChevronRight size={14} /></button></div><p className="speaking-status-line">{message}</p></> : null}
      {mode === 'immersion' ? <><section className="speaking-immersion-hero"><div className="speaking-chip-row"><span className="speaking-chip teal"><Headphones size={11} /> Imersão</span></div><strong>Treine inglês como se estivesse lá</strong><p>Escolha um cenário A1, escute a frase natural e responda falando em inglês.</p></section><section className="speaking-immersion-scenes" aria-label="Cenários de imersão">{immersionScenes.map((item, index) => <button className={`speaking-immersion-scene ${activeScene === index ? 'active' : ''}`} key={item.title} type="button" onClick={() => setActiveScene(index)}><span>{item.label}</span><div><strong>{item.title}</strong><small>{item.level}</small></div></button>)}</section><section className="speaking-immersion-card"><div className="speaking-immersion-card-top"><span>{scene.level}</span><button type="button" onClick={() => handleSpeak(scene.line)}><Volume2 size={13} /> Ouvir</button></div><h2>“{scene.line}”</h2><p>{scene.tip}</p></section><section className="speaking-mic-card immersion"><button className={recording ? 'speaking-main-mic recording' : 'speaking-main-mic'} type="button" onClick={() => handlePronunciationRecord(scene.line)} disabled={recording || analyzing} aria-label="Começar gravação automática"><Mic size={32} /></button><strong>{recording ? 'Ouvindo…' : analyzing ? 'Analisando…' : 'Responder no cenário'}</strong>{recording ? <div className="speaking-wave"><span /><span /><span /><span /><span /></div> : null}<p>Fale como se estivesse na situação real.</p><small>{message}</small></section></> : null}
    </section>
  );
}
