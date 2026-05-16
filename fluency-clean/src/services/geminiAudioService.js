import { getGeneralAiKeys } from './aiKeys.js';
import { getLessonFlashKeys, getLessonProKey } from './lessonKeys.js';

const GEMINI_TTS_MODELS = [
  'gemini-2.5-flash-preview-tts',
  'gemini-2.5-flash-tts',
  'gemini-2.5-pro-preview-tts',
];
const DEFAULT_VOICE = 'Kore';
const SPEAKER_VOICES = ['Kore', 'Puck', 'Zephyr', 'Charon', 'Leda', 'Orus', 'Aoede', 'Fenrir'];

function clean(value) {
  return String(value ?? '').trim();
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

function buildSpeechConfig(speakers = []) {
  if (speakers.length >= 2) {
    return {
      multiSpeakerVoiceConfig: {
        speakerVoiceConfigs: speakers.map((speaker, index) => ({
          speaker,
          voiceConfig: {
            prebuiltVoiceConfig: { voiceName: SPEAKER_VOICES[index % SPEAKER_VOICES.length] },
          },
        })),
      },
    };
  }
  return { voiceConfig: { prebuiltVoiceConfig: { voiceName: DEFAULT_VOICE } } };
}

function buildPrompt({ text, speakers = [], style = 'listening' }) {
  if (speakers.length >= 2) {
    return `Read this English listening dialogue naturally, clearly, and a little slowly for an A1 student. Use a different voice for each speaker. Keep the exact speaker turns and do not add explanations. Speakers: ${speakers.join(', ')}. Dialogue:\n${text}`;
  }
  if (style === 'shadowing') {
    return `Read this English phrase naturally and clearly for shadowing practice. Speak slowly enough for an A1 student to repeat. Do not add explanations. Phrase: ${text}`;
  }
  return `Read this English learning audio naturally, clearly, and a little slowly for an A1 student. Do not add explanations. Text: ${text}`;
}

function uniqueKeys(...groups) {
  const seen = new Set();
  return groups.flat().filter((key) => {
    const cleanKey = clean(key);
    if (!cleanKey || seen.has(cleanKey)) return false;
    seen.add(cleanKey);
    return true;
  });
}

function getAllGeminiKeys() {
  return uniqueKeys(getGeneralAiKeys(), getLessonFlashKeys(), [getLessonProKey()]);
}

async function requestGeminiAudio({ key, model, body }) {
  const response = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/${model}:generateContent`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json', 'x-goog-api-key': key },
    body,
  });
  const payload = await response.json().catch(() => ({}));
  if (!response.ok) throw new Error(payload?.error?.message || `Não foi possível gerar o áudio natural agora. HTTP ${response.status}`);
  const audio = findAudioPart(payload);
  if (!audio) throw new Error(`O Gemini não retornou áudio para este texto usando ${model}.`);
  return audio;
}

export async function generateGeminiAudioBlob({ text, speakers = [], style = 'listening' }) {
  const keys = getAllGeminiKeys();
  if (!keys.length) throw new Error('Adicione uma key Gemini em Ajustes > IA geral ou Ajustes > Chaves de aulas para usar o áudio natural.');
  const cleanText = clean(text);
  if (!cleanText) throw new Error('Texto de áudio vazio.');

  const body = JSON.stringify({
    contents: [{ role: 'user', parts: [{ text: buildPrompt({ text: cleanText, speakers, style }) }] }],
    generationConfig: {
      responseModalities: ['AUDIO'],
      speechConfig: buildSpeechConfig(speakers),
    },
  });

  let lastError = null;
  for (const key of keys) {
    for (const model of GEMINI_TTS_MODELS) {
      try {
        const audio = await requestGeminiAudio({ key, model, body });
        return audioToBlob(audio.data, audio.mimeType);
      } catch (err) {
        lastError = err;
      }
    }
  }
  throw lastError || new Error('Não foi possível gerar o áudio com nenhuma key disponível.');
}
