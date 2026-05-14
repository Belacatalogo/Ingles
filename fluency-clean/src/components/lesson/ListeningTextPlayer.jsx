import { useMemo, useRef, useState } from 'react';
import { Headphones, PauseCircle, PlayCircle } from 'lucide-react';
import { getGeneralAiKeys } from '../../services/aiKeys.js';
import { Card } from '../ui/Card.jsx';

const GEMINI_TTS_MODEL = 'gemini-2.5-flash-preview-tts';
const GEMINI_TTS_VOICE = 'Kore';

function clean(value) {
  return String(value ?? '').trim();
}

function getListeningText(lesson) {
  return clean(lesson?.audioText || lesson?.transcript || lesson?.audioScript || lesson?.mainText || '');
}

function base64ToBytes(base64) {
  const binary = window.atob(base64);
  const bytes = new Uint8Array(binary.length);
  for (let index = 0; index < binary.length; index += 1) bytes[index] = binary.charCodeAt(index);
  return bytes;
}

function parseSampleRate(mimeType = '') {
  const match = String(mimeType).match(/rate=(\d+)/i);
  return match ? Number(match[1]) : 24000;
}

function pcmToWavBlob(base64, mimeType = '') {
  const pcm = base64ToBytes(base64);
  const sampleRate = parseSampleRate(mimeType);
  const header = new ArrayBuffer(44);
  const view = new DataView(header);
  const write = (offset, value) => [...value].forEach((char, index) => view.setUint8(offset + index, char.charCodeAt(0)));
  write(0, 'RIFF');
  view.setUint32(4, 36 + pcm.length, true);
  write(8, 'WAVE');
  write(12, 'fmt ');
  view.setUint32(16, 16, true);
  view.setUint16(20, 1, true);
  view.setUint16(22, 1, true);
  view.setUint32(24, sampleRate, true);
  view.setUint32(28, sampleRate * 2, true);
  view.setUint16(32, 2, true);
  view.setUint16(34, 16, true);
  write(36, 'data');
  view.setUint32(40, pcm.length, true);
  return new Blob([header, pcm], { type: 'audio/wav' });
}

function audioToBlob(base64, mimeType = 'audio/wav') {
  if (String(mimeType).toLowerCase().includes('l16') || String(mimeType).toLowerCase().includes('pcm')) {
    return pcmToWavBlob(base64, mimeType);
  }
  return new Blob([base64ToBytes(base64)], { type: mimeType });
}

function findAudioPart(payload) {
  const parts = payload?.candidates?.[0]?.content?.parts || [];
  const part = parts.find((item) => item?.inlineData?.data || item?.inline_data?.data);
  const inline = part?.inlineData || part?.inline_data || null;
  if (!inline?.data) return null;
  return {
    data: inline.data,
    mimeType: inline.mimeType || inline.mime_type || 'audio/wav',
  };
}

async function generateGeminiAudio(text) {
  const [key] = getGeneralAiKeys();
  if (!key) throw new Error('Adicione uma key em Ajustes > Chaves de aulas > IA geral.');

  const response = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/${GEMINI_TTS_MODEL}:generateContent`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json', 'x-goog-api-key': key },
    body: JSON.stringify({
      contents: [{
        role: 'user',
        parts: [{ text: `Read this English listening lesson naturally, clearly, and a little slowly for an A1 student. Do not add explanations. Text: ${text}` }],
      }],
      generationConfig: {
        responseModalities: ['AUDIO'],
        speechConfig: {
          voiceConfig: { prebuiltVoiceConfig: { voiceName: GEMINI_TTS_VOICE } },
        },
      },
    }),
  });

  const payload = await response.json().catch(() => ({}));
  if (!response.ok) throw new Error(payload?.error?.message || 'Não foi possível gerar o áudio natural agora.');
  const audio = findAudioPart(payload);
  if (!audio) throw new Error('O Gemini não retornou áudio para este texto.');
  return audioToBlob(audio.data, audio.mimeType);
}

export function ListeningTextPlayer({ lesson }) {
  const [status, setStatus] = useState('');
  const [loading, setLoading] = useState(false);
  const audioRef = useRef(null);
  const text = useMemo(() => getListeningText(lesson), [lesson]);

  function stopAudio() {
    if (audioRef.current) {
      audioRef.current.pause();
      audioRef.current.currentTime = 0;
    }
    setStatus('Áudio parado.');
  }

  async function playAudio() {
    if (!text) {
      setStatus('Esta aula ainda não tem texto de áudio cadastrado.');
      return;
    }
    setLoading(true);
    setStatus('Preparando áudio natural...');
    try {
      const blob = await generateGeminiAudio(text);
      const url = URL.createObjectURL(blob);
      if (audioRef.current) audioRef.current.pause();
      const audio = new Audio(url);
      audioRef.current = audio;
      audio.onended = () => setStatus('Escuta concluída.');
      audio.onerror = () => setStatus('Não foi possível tocar o áudio natural agora.');
      await audio.play();
      setStatus('Ouvindo áudio natural.');
    } catch (error) {
      setStatus(error?.message || 'Áudio natural ainda não configurado.');
    } finally {
      setLoading(false);
    }
  }

  if (lesson?.pillar !== 'listening' && lesson?.type !== 'listening') return null;

  return (
    <Card eyebrow="Listening" title="Ouça o texto da aula">
      <p>Toque em ouvir antes de abrir o transcript. Depois escute de novo acompanhando o texto.</p>
      <div className="answer-actions">
        <button type="button" className="primary-button" onClick={playAudio} disabled={loading}>
          <PlayCircle size={16} /> {loading ? 'Preparando...' : 'Ouvir áudio natural'}
        </button>
        <button type="button" className="secondary-button" onClick={stopAudio}>
          <PauseCircle size={16} /> Parar áudio
        </button>
      </div>
      {status ? <p className="generator-message completion-message"><Headphones size={14} /> {status}</p> : null}
      {!text ? <p className="static-lesson-muted">Esta aula ainda não tem texto de áudio cadastrado.</p> : null}
    </Card>
  );
}
