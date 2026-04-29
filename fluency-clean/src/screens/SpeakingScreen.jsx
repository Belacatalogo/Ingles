import { useState } from 'react';
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
const pronunciationText = 'I have already finished my homework.';

const messages = [
  { who: 'ai', text: conversationPrompt },
  {
    who: 'you',
    text: 'I went to the beach with my friends and we had lunch.',
    score: 84,
    errors: [{ word: 'had', note: "Considere 'we ate lunch' — mais natural." }],
  },
  { who: 'ai', text: 'Sounds nice! Was the weather good?' },
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

const wordScores = [
  { word: 'I', score: 100 },
  { word: 'have', score: 95 },
  { word: 'already', score: 78 },
  { word: 'finished', score: 62 },
  { word: 'my', score: 100 },
  { word: 'homework', score: 88 },
];

function scoreClass(score) {
  if (score >= 85) return 'good';
  if (score >= 70) return 'warn';
  return 'bad';
}

export function SpeakingScreen() {
  const [mode, setMode] = useState('conversation');
  const [activeScene, setActiveScene] = useState(0);
  const [recording, setRecording] = useState(false);
  const [analyzing, setAnalyzing] = useState(false);
  const [result, setResult] = useState(null);
  const [message, setMessage] = useState('Toque para responder em inglês.');
  const scene = immersionScenes[activeScene];

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
    setMessage('Análise concluída.');
  }

  const pronunciationScore = result?.pronunciationScore ?? result?.accuracyScore ?? 87;

  return (
    <section className="speaking-reference-screen">
      <header className="speaking-reference-header">
        <div>
          <h1>Speaking</h1>
          <p>{mode === 'immersion' ? 'Imersão guiada por cenário' : 'Conversa guiada por IA'}</p>
        </div>
        <div className="speaking-mode-switch" role="tablist" aria-label="Modo de speaking">
          <button
            type="button"
            className={mode === 'conversation' ? 'active' : ''}
            onClick={() => setMode('conversation')}
          >
            Conversa
          </button>
          <button
            type="button"
            className={mode === 'pronunciation' ? 'active' : ''}
            onClick={() => setMode('pronunciation')}
          >
            Pronúncia
          </button>
          <button
            type="button"
            className={mode === 'immersion' ? 'active' : ''}
            onClick={() => setMode('immersion')}
          >
            Imersão
          </button>
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
            {messages.map((item, index) => (
              <article className={`speaking-chat-row ${item.who}`} key={`${item.who}-${index}`}>
                <div className="speaking-chat-bubble-wrap">
                  {item.who === 'ai' ? (
                    <div className="speaking-ai-label">
                      <span>F</span>
                      Fluency
                    </div>
                  ) : null}

                  <div className="speaking-chat-bubble">
                    {item.text}
                  </div>

                  {item.who === 'ai' ? (
                    <button className="speaking-listen-link" type="button" onClick={() => handleSpeak(item.text)}>
                      <Volume2 size={11} /> Ouvir
                    </button>
                  ) : null}

                  {item.score !== undefined ? (
                    <div className="speaking-chat-feedback">
                      <div>
                        <strong>Pronúncia: {item.score}%</strong>
                        <span>1 dica</span>
                      </div>
                      {item.errors.map((error) => (
                        <p key={error.word}><b>{error.word}</b> · {error.note}</p>
                      ))}
                    </div>
                  ) : null}
                </div>
              </article>
            ))}
          </section>

          <section className="speaking-mic-card">
            <button
              className={recording ? 'speaking-main-mic recording' : 'speaking-main-mic'}
              type="button"
              onClick={() => handleRecordToggle(conversationPrompt)}
              disabled={analyzing}
              aria-label={recording ? 'Parar gravação' : 'Começar gravação'}
            >
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
            <code>/aɪ hæv ɔːlˈredi ˈfɪnɪʃt maɪ ˈhoʊmwɜːrk/</code>
            <button className="speaking-small-button" type="button" onClick={() => handleSpeak(pronunciationText)}>
              <Volume2 size={13} /> Ouvir modelo
            </button>
          </section>

          <section className="speaking-score-panel">
            <div className="speaking-score-header">
              <div>
                <span>Sua tentativa</span>
                <strong>
                  <b>{pronunciationScore}</b>
                  <em>/ 100</em>
                </strong>
              </div>
              <button className="speaking-small-button ghost" type="button" onClick={stopLearningAudio}>
                <Play size={12} /> Parar voz
              </button>
            </div>

            <div className="speaking-word-score-row">
              {wordScores.map((item) => (
                <span className={scoreClass(item.score)} key={item.word}>{item.word}</span>
              ))}
            </div>

            <div className="speaking-pronunciation-tip">
              <div>
                <Info size={13} />
                <strong>Foco em “finished”</strong>
              </div>
              <p>O <b>-ed</b> aqui soa como <b>/t/</b>, não /id/. Pronuncie “finisht”.</p>
            </div>
          </section>

          <div className="speaking-pronunciation-actions">
            <button className="speaking-action-secondary" type="button" onClick={() => handleRecordToggle(pronunciationText)} disabled={analyzing}>
              <RefreshCw size={14} /> {recording ? 'Parar e analisar' : 'Tentar de novo'}
            </button>
            <button className="speaking-action-primary" type="button" onClick={() => handleSpeak('She has already called her teacher.')}>
              Próxima <ChevronRight size={14} />
            </button>
          </div>

          <p className="speaking-status-line">{message}</p>
        </>
      ) : null}

      {mode === 'immersion' ? (
        <>
          <section className="speaking-immersion-hero">
            <div className="speaking-chip-row">
              <span className="speaking-chip teal"><Headphones size={11} /> Imersão</span>
            </div>
            <strong>Treine inglês como se estivesse lá</strong>
            <p>Escolha um cenário, escute a frase natural e responda falando em inglês.</p>
          </section>

          <section className="speaking-immersion-scenes" aria-label="Cenários de imersão">
            {immersionScenes.map((item, index) => (
              <button
                className={`speaking-immersion-scene ${activeScene === index ? 'active' : ''}`}
                key={item.title}
                type="button"
                onClick={() => setActiveScene(index)}
              >
                <span>{item.label}</span>
                <div>
                  <strong>{item.title}</strong>
                  <small>{item.level}</small>
                </div>
              </button>
            ))}
          </section>

          <section className="speaking-immersion-card">
            <div className="speaking-immersion-card-top">
              <span>{scene.level}</span>
              <button type="button" onClick={() => handleSpeak(scene.line)}>
                <Volume2 size={13} /> Ouvir
              </button>
            </div>
            <h2>“{scene.line}”</h2>
            <p>{scene.tip}</p>
          </section>

          <section className="speaking-mic-card immersion">
            <button
              className={recording ? 'speaking-main-mic recording' : 'speaking-main-mic'}
              type="button"
              onClick={() => handleRecordToggle(scene.line)}
              disabled={analyzing}
              aria-label={recording ? 'Parar gravação' : 'Começar gravação'}
            >
              {recording ? <Square size={30} /> : <Mic size={32} />}
            </button>
            <strong>{recording ? 'Gravando resposta…' : analyzing ? 'Analisando…' : 'Responder no cenário'}</strong>
            {recording ? <div className="speaking-wave"><span /><span /><span /><span /><span /></div> : null}
            <p>Fale como se estivesse na situação real.</p>
            <small>{message}</small>
          </section>
        </>
      ) : null}
    </section>
  );
}
