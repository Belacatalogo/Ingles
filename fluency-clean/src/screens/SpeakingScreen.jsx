import { useMemo, useState } from 'react';
import {
  ChevronRight,
  Headphones,
  Info,
  Mic,
  Play,
  RefreshCw,
  Sparkles,
  Square,
  Volume2,
} from 'lucide-react';
import { analyzePronunciation } from '../services/azurePronunciation.js';
import { playLearningAudio, stopLearningAudio } from '../services/audioPlayback.js';
import { startRecording, stopRecording } from '../services/recorder.js';

const conversationPrompt = 'Hi! Tell me about your weekend. What did you do?';

const pronunciationPrompts = [
  {
    text: 'I have already finished my homework.',
    ipa: '/aɪ hæv ɔːlˈredi ˈfɪnɪʃt maɪ ˈhoʊmwɜːrk/',
  },
  {
    text: 'She has already called her teacher.',
    ipa: '/ʃi hæz ɔːlˈredi kɔːld hɜːr ˈtiːtʃər/',
  },
  {
    text: 'We practiced English before dinner.',
    ipa: '/wi ˈpræktɪst ˈɪŋɡlɪʃ bɪˈfɔːr ˈdɪnər/',
  },
  {
    text: 'They watched a movie last night.',
    ipa: '/ðeɪ wɑːtʃt ə ˈmuːvi læst naɪt/',
  },
];

const initialMessages = [
  { who: 'ai', text: conversationPrompt },
  { who: 'ai', text: 'Answer in English. I will analyze your pronunciation and then continue the conversation.' },
];

const immersionScenes = [
  {
    label: 'Café',
    title: 'Pedindo um café em Londres',
    level: 'A1 · viagem',
    line: 'Could I have a coffee and a sandwich, please?',
    tip: 'Use “Could I have...” para pedir algo com educação.',
  },
  {
    label: 'Hotel',
    title: 'Check-in na recepção',
    level: 'A1 · viagem',
    line: 'I have a reservation under the name Luis.',
    tip: '“Under the name...” é natural para reserva em hotel/restaurante.',
  },
  {
    label: 'Rua',
    title: 'Pedindo informação',
    level: 'A1 · sobrevivência',
    line: 'Excuse me, where is the nearest subway station?',
    tip: 'Comece com “Excuse me” para soar educado antes de perguntar.',
  },
];

function scoreClass(score) {
  if (score == null) return 'warn';
  if (score >= 85) return 'good';
  if (score >= 70) return 'warn';
  return 'bad';
}

function getScore(result) {
  return result?.pronunciationScore ?? result?.accuracyScore ?? null;
}

function getWordScore(word) {
  return word?.accuracyScore ?? word?.score ?? null;
}

function getAnalyzedWords(result, fallbackText = '') {
  if (Array.isArray(result?.words) && result.words.length) {
    return result.words.map((word) => ({
      word: word.word,
      score: getWordScore(word),
      status: word.status,
      errorType: word.errorType,
    }));
  }

  return fallbackText.split(/\s+/).filter(Boolean).map((word) => ({
    word: word.replace(/[“”".,!?]/g, ''),
    score: null,
    status: 'unknown',
    errorType: 'Unknown',
  }));
}

function getFocusWord(result, fallbackText = '') {
  if (!result) return null;
  const words = getAnalyzedWords(result, fallbackText);
  return words
    .filter((word) => word.score != null)
    .sort((a, b) => a.score - b.score)[0] || words.find((word) => word.status !== 'correct') || null;
}

function buildWordTip(word) {
  if (!word?.word) return 'Grave novamente para eu apontar exatamente o ponto de melhoria.';
  const scoreText = word.score != null ? ` O Azure deu ${word.score}/100 para essa palavra.` : '';

  if (word.errorType === 'Omission') {
    return `O Azure entendeu que você pulou “${word.word}”. Tente falar essa palavra com clareza dentro da frase.${scoreText}`;
  }

  if (word.errorType && word.errorType !== 'None') {
    return `O ponto mais fraco foi “${word.word}”. Repita devagar, separe os sons e depois fale a frase completa em ritmo natural.${scoreText}`;
  }

  if (word.score != null && word.score < 70) {
    return `O ponto mais fraco foi “${word.word}”. Compare com o modelo, repita só essa palavra 3 vezes e depois grave a frase inteira.${scoreText}`;
  }

  if (word.score != null && word.score < 85) {
    return `“${word.word}” ficou compreensível, mas pode soar mais natural. Trabalhe ritmo, vogal principal e terminação.${scoreText}`;
  }

  return `Sua pronúncia de “${word.word}” ficou boa. Continue buscando ritmo natural na frase inteira.${scoreText}`;
}

function buildConversationReply(score) {
  if (score == null) return 'Good. I heard your answer. Try again with a little more clarity.';
  if (score >= 85) return 'Great answer! Your pronunciation was clear. Now tell me one more detail about it.';
  if (score >= 70) return 'Good job. I understood you, but let’s polish a few sounds and try again.';
  return 'I understood part of it. Speak a little slower and focus on the highlighted word.';
}

export function SpeakingScreen() {
  const [mode, setMode] = useState('conversation');
  const [activeScene, setActiveScene] = useState(0);
  const [pronunciationIndex, setPronunciationIndex] = useState(0);
  const [recording, setRecording] = useState(false);
  const [analyzing, setAnalyzing] = useState(false);
  const [result, setResult] = useState(null);
  const [message, setMessage] = useState('Toque para responder em inglês.');
  const [chatMessages, setChatMessages] = useState(initialMessages);
  const scene = immersionScenes[activeScene];
  const pronunciationPrompt = pronunciationPrompts[pronunciationIndex % pronunciationPrompts.length];
  const pronunciationText = pronunciationPrompt.text;

  const pronunciationScore = getScore(result);
  const analyzedWords = useMemo(() => getAnalyzedWords(result, pronunciationText), [result, pronunciationText]);
  const focusWord = useMemo(() => getFocusWord(result, pronunciationText), [result, pronunciationText]);

  async function handleSpeak(text = pronunciationText) {
    setMessage('Preparando áudio...');
    const response = await playLearningAudio({
      text,
      label: `Speaking · ${mode}`,
      voiceName: 'Kore',
      style: 'Natural English conversation model. Clear, friendly and easy to repeat.',
    });
    setMessage(response.ok ? 'Áudio iniciado.' : response.error || 'Erro ao reproduzir áudio.');
  }

  async function handleNextPronunciation() {
    if (recording || analyzing) return;
    const nextIndex = (pronunciationIndex + 1) % pronunciationPrompts.length;
    const nextPrompt = pronunciationPrompts[nextIndex];
    setPronunciationIndex(nextIndex);
    setResult(null);
    setMessage('Próxima frase carregada.');
    await handleSpeak(nextPrompt.text);
  }

  function appendConversationAnalysis(analysisResult, referenceText) {
    const score = getScore(analysisResult);
    const focus = getFocusWord(analysisResult, referenceText);
    const spokenText = analysisResult?.recognizedText || referenceText || 'Resposta gravada';

    setChatMessages((current) => [
      ...current,
      {
        who: 'you',
        text: spokenText,
        score,
        errors: focus ? [{ word: focus.word, note: buildWordTip(focus) }] : [],
      },
      { who: 'ai', text: buildConversationReply(score) },
    ]);
  }

  async function handleRecordToggle(referenceText = pronunciationText) {
    if (!recording) {
      const started = await startRecording();
      if (!started.ok) {
        setMessage(started.error || 'Não foi possível iniciar gravação.');
        return;
      }
      setResult(null);
      setRecording(true);
      setMessage('Falando… grave sua resposta com calma.');
      return;
    }

    setRecording(false);
    setAnalyzing(true);
    setMessage('Finalizando gravação...');

    const stopped = await stopRecording();
    if (!stopped.ok) {
      setAnalyzing(false);
      setMessage(stopped.error || 'Erro ao parar gravação.');
      return;
    }

    setMessage('Enviando para análise Azure...');
    const analyzed = await analyzePronunciation({
      audioBlob: stopped.audioBlob,
      referenceText,
    });

    setAnalyzing(false);

    if (analyzed.status !== 'success') {
      setMessage(analyzed.error || 'Não foi possível analisar a pronúncia.');
      return;
    }

    setResult(analyzed.result);
    if (mode === 'conversation') appendConversationAnalysis(analyzed.result, referenceText);
    setMessage('Análise concluída.');
  }

  return (
    <section className="speaking-reference-screen">
      <header className="speaking-reference-header">
        <div>
          <h1>Speaking</h1>
          <p>{mode === 'immersion' ? 'Imersão guiada por cenário' : 'Conversa guiada por IA'}</p>
        </div>
        <div className="speaking-mode-switch" role="tablist" aria-label="Modo de speaking">
          <button type="button" className={mode === 'conversation' ? 'active' : ''} onClick={() => setMode('conversation')}>Conversa</button>
          <button type="button" className={mode === 'pronunciation' ? 'active' : ''} onClick={() => setMode('pronunciation')}>Pronúncia</button>
          <button type="button" className={mode === 'immersion' ? 'active' : ''} onClick={() => setMode('immersion')}>Imersão</button>
        </div>
      </header>

      {mode === 'conversation' ? (
        <>
          <section className="speaking-scenario-card">
            <div className="speaking-chip-row">
              <span className="speaking-chip teal"><Sparkles size={11} /> Cenário</span>
              <span className="speaking-chip">Casual · B1</span>
            </div>
            <strong>Falando do fim de semana</strong>
            <p>Pratique past simple e past continuous em uma conversa do dia a dia.</p>
          </section>

          <section className="speaking-chat-list" aria-label="Conversa guiada">
            {chatMessages.map((item, index) => (
              <article className={`speaking-chat-row ${item.who}`} key={`${item.who}-${index}-${item.text}`}>
                <div className="speaking-chat-bubble-wrap">
                  {item.who === 'ai' ? <div className="speaking-ai-label"><span>F</span>Fluency</div> : null}
                  <div className="speaking-chat-bubble">{item.text}</div>
                  {item.who === 'ai' ? (
                    <button className="speaking-listen-link" type="button" onClick={() => handleSpeak(item.text)}>
                      <Volume2 size={11} /> Ouvir
                    </button>
                  ) : null}
                  {item.score !== undefined && item.score !== null ? (
                    <div className="speaking-chat-feedback">
                      <div><strong>Pronúncia: {item.score}%</strong><span>{item.errors?.length || 0} dica</span></div>
                      {(item.errors || []).map((error) => <p key={error.word}><b>{error.word}</b> · {error.note}</p>)}
                    </div>
                  ) : null}
                </div>
              </article>
            ))}
          </section>

          <section className="speaking-mic-card">
            <button className={recording ? 'speaking-main-mic recording' : 'speaking-main-mic'} type="button" onClick={() => handleRecordToggle(conversationPrompt)} disabled={analyzing} aria-label={recording ? 'Parar gravação' : 'Começar gravação'}>
              {recording ? <Square size={30} /> : <Mic size={32} />}
            </button>
            <strong>{recording ? 'Falando…' : analyzing ? 'Analisando…' : 'Toque para responder'}</strong>
            {recording ? <div className="speaking-wave"><span /><span /><span /><span /><span /></div> : null}
            <p>{recording ? 'Fale claramente em inglês' : 'Em inglês — toque para falar'}</p>
            <small>{message}</small>
          </section>
        </>
      ) : null}

      {mode === 'pronunciation' ? (
        <>
          <section className="speaking-pronunciation-hero">
            <p>Repita a frase</p>
            <h2>“{pronunciationText}”</h2>
            <code>{pronunciationPrompt.ipa}</code>
            <button className="speaking-small-button" type="button" onClick={() => handleSpeak(pronunciationText)}>
              <Volume2 size={13} /> Ouvir modelo
            </button>
          </section>

          <section className="speaking-score-panel">
            <div className="speaking-score-header">
              <div><span>Sua tentativa</span><strong><b>{pronunciationScore ?? '—'}</b><em>/ 100</em></strong></div>
              <button className="speaking-small-button ghost" type="button" onClick={stopLearningAudio}><Play size={12} /> Parar voz</button>
            </div>
            <div className="speaking-word-score-row">
              {analyzedWords.map((item) => <span className={scoreClass(item.score)} key={`${pronunciationText}-${item.word}-${item.score ?? 'pending'}`}>{item.word}</span>)}
            </div>
            <div className="speaking-pronunciation-tip">
              <div><Info size={13} /><strong>{focusWord ? `Foco em “${focusWord.word}”` : 'Foco da próxima tentativa'}</strong></div>
              <p>{focusWord ? buildWordTip(focusWord) : 'Grave sua frase para receber um foco real baseado na análise do Azure.'}</p>
            </div>
          </section>

          <div className="speaking-pronunciation-actions">
            <button className="speaking-action-secondary" type="button" onClick={() => handleRecordToggle(pronunciationText)} disabled={analyzing}>
              <RefreshCw size={14} /> {recording ? 'Parar e analisar' : 'Tentar de novo'}
            </button>
            <button className="speaking-action-primary" type="button" onClick={handleNextPronunciation} disabled={recording || analyzing}>
              Próxima <ChevronRight size={14} />
            </button>
          </div>
          <p className="speaking-status-line">{message}</p>
        </>
      ) : null}

      {mode === 'immersion' ? (
        <>
          <section className="speaking-immersion-hero">
            <div className="speaking-chip-row"><span className="speaking-chip teal"><Headphones size={11} /> Imersão</span></div>
            <strong>Treine inglês como se estivesse lá</strong>
            <p>Escolha um cenário, escute a frase natural e responda falando em inglês.</p>
          </section>
          <section className="speaking-immersion-scenes" aria-label="Cenários de imersão">
            {immersionScenes.map((item, index) => (
              <button className={`speaking-immersion-scene ${activeScene === index ? 'active' : ''}`} key={item.title} type="button" onClick={() => setActiveScene(index)}>
                <span>{item.label}</span><div><strong>{item.title}</strong><small>{item.level}</small></div>
              </button>
            ))}
          </section>
          <section className="speaking-immersion-card">
            <div className="speaking-immersion-card-top"><span>{scene.level}</span><button type="button" onClick={() => handleSpeak(scene.line)}><Volume2 size={13} /> Ouvir</button></div>
            <h2>“{scene.line}”</h2><p>{scene.tip}</p>
          </section>
          <section className="speaking-mic-card immersion">
            <button className={recording ? 'speaking-main-mic recording' : 'speaking-main-mic'} type="button" onClick={() => handleRecordToggle(scene.line)} disabled={analyzing} aria-label={recording ? 'Parar gravação' : 'Começar gravação'}>
              {recording ? <Square size={30} /> : <Mic size={32} />}
            </button>
            <strong>{recording ? 'Gravando resposta…' : analyzing ? 'Analisando…' : 'Responder no cenário'}</strong>
            {recording ? <div className="speaking-wave"><span /><span /><span /><span /><span /></div> : null}
            <p>Fale como se estivesse na situação real.</p><small>{message}</small>
          </section>
        </>
      ) : null}
    </section>
  );
}
