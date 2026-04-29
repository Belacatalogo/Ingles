import { diagnostics } from './diagnostics.js';
import { getLessonFlashKeys, getLessonProKey } from './lessonKeys.js';
import { maskApiKey, normalizeLessonKeys } from './geminiLessons.js';
import { storage } from './storage.js';
import { speakText } from './tts.js';
import { unlockAudioForIOS } from './audioUnlock.js';

const CACHE_PREFIX = 'tts.gemini.cache.';
const TTS_MODELS = [
  'gemini-2.5-flash-preview-tts',
  'gemini-2.5-flash-tts',
  'gemini-2.5-pro-preview-tts',
];

const DEFAULT_VOICE = 'Kore';
const DEFAULT_SAMPLE_RATE = 24000;
let currentAudio = null;

function hashText(value) {
  const text = String(value ?? '');
  let hash = 0;
  for (let index = 0; index < text.length; index += 1) {
    hash = ((hash << 5) - hash + text.charCodeAt(index)) | 0;
  }
  return Math.abs(hash).toString(36);
}

function cacheKey({ text, voiceName, style }) {
  return `${CACHE_PREFIX}${hashText(`${voiceName}|${style}|${text}`)}`;
}

function base64ToUint8Array(base64) {
  const binary = atob(base64);
  const bytes = new Uint8Array(binary.length);
  for (let index = 0; index < binary.length; index += 1) {
    bytes[index] = binary.charCodeAt(index);
  }
  return bytes;
}

function pcmToWavBlob(pcmBytes, sampleRate = DEFAULT_SAMPLE_RATE) {
  const pcm = pcmBytes instanceof Uint8Array ? pcmBytes : new Uint8Array(pcmBytes);
  const buffer = new ArrayBuffer(44 + pcm.length);
  const view = new DataView(buffer);

  function writeString(offset, value) {
    for (let index = 0; index < value.length; index += 1) {
      view.setUint8(offset + index, value.charCodeAt(index));
    }
  }

  writeString(0, 'RIFF');
  view.setUint32(4, 36 + pcm.length, true);
  writeString(8, 'WAVE');
  writeString(12, 'fmt ');
  view.setUint32(16, 16, true);
  view.setUint16(20, 1, true);
  view.setUint16(22, 1, true);
  view.setUint32(24, sampleRate, true);
  view.setUint32(28, sampleRate * 2, true);
  view.setUint16(32, 2, true);
  view.setUint16(34, 16, true);
  writeString(36, 'data');
  view.setUint32(40, pcm.length, true);

  new Uint8Array(buffer, 44).set(pcm);
  return new Blob([buffer], { type: 'audio/wav' });
}

function extractInlineAudio(data) {
  const parts = data?.candidates?.[0]?.content?.parts || [];
  const audioPart = parts.find((part) => part?.inlineData?.data || part?.inline_data?.data);
  const inline = audioPart?.inlineData || audioPart?.inline_data;
  if (!inline?.data) return null;
  return {
    base64: inline.data,
    mimeType: inline.mimeType || inline.mime_type || 'audio/pcm',
  };
}

function buildTtsPrompt(text, style) {
  const cleanText = String(text ?? '').trim();
  const cleanStyle = String(style ?? 'Natural, clear, friendly American English teacher voice. Moderate pace, excellent pronunciation, easy for Brazilian students to understand.').trim();
  return `Read the following English learning text aloud. Style: ${cleanStyle}\n\nText:\n${cleanText}`;
}

function buildAttempts({ flashKeys, proKey }) {
  const flash = normalizeLessonKeys(flashKeys);
  const proKeyValue = normalizeLessonKeys([proKey])[0] || '';
  const attempts = [];

  for (const key of flash) {
    for (const model of TTS_MODELS.filter((model) => model.includes('flash'))) {
      attempts.push({ key, model, masked: maskApiKey(key), paid: false });
    }
  }

  if (proKeyValue) {
    for (const model of TTS_MODELS) {
      attempts.push({ key: proKeyValue, model, masked: maskApiKey(proKeyValue), paid: true });
    }
  }

  return attempts;
}

async function callGeminiTts({ text, key, model, voiceName, style, fetcher }) {
  const url = `https://generativelanguage.googleapis.com/v1beta/models/${encodeURIComponent(model)}:generateContent?key=${encodeURIComponent(key)}`;
  const body = {
    contents: [{ role: 'user', parts: [{ text: buildTtsPrompt(text, style) }] }],
    generationConfig: {
      responseModalities: ['AUDIO'],
      speechConfig: {
        voiceConfig: {
          prebuiltVoiceConfig: {
            voiceName,
          },
        },
      },
    },
  };

  const response = await fetcher(url, {
    method: 'POST',
    headers: { 'content-type': 'application/json' },
    body: JSON.stringify(body),
  });

  if (!response.ok) {
    const errorText = await response.text().catch(() => '');
    throw new Error(`HTTP ${response.status} ${errorText.slice(0, 160)}`);
  }

  const data = await response.json();
  const inline = extractInlineAudio(data);
  if (!inline) throw new Error('Gemini TTS não retornou áudio inline.');

  return inline;
}

export async function generateGeminiTtsAudio({
  text,
  voiceName = DEFAULT_VOICE,
  style = '',
  fetcher = fetch,
  useCache = true,
} = {}) {
  const cleanText = String(text ?? '').trim();
  diagnostics.log('Botão de áudio acionado: preparando Gemini TTS.', 'info');

  if (!cleanText) return { ok: false, audioUrl: '', source: 'none', error: 'Texto vazio.' };

  await unlockAudioForIOS();

  const key = cacheKey({ text: cleanText, voiceName, style });
  if (useCache) {
    const cached = storage.get(key, null);
    if (cached?.base64) {
      const blob = pcmToWavBlob(base64ToUint8Array(cached.base64));
      diagnostics.log('Áudio Gemini TTS carregado do cache.', 'info');
      return { ok: true, audioUrl: URL.createObjectURL(blob), source: 'cache', error: null };
    }
  }

  const attempts = buildAttempts({ flashKeys: getLessonFlashKeys(), proKey: getLessonProKey() });
  diagnostics.log(`Gemini TTS: ${attempts.length} tentativa(s) preparada(s).`, 'info');

  if (!attempts.length) {
    diagnostics.log('Gemini TTS sem keys de aula. Usando TTS do navegador como fallback.', 'info');
    await speakText(cleanText);
    return { ok: true, audioUrl: '', source: 'browser-fallback', error: null };
  }

  let lastError = null;
  diagnostics.setPhase('gerando áudio Gemini TTS', 'tts');

  for (let index = 0; index < attempts.length; index += 1) {
    const attempt = attempts[index];
    diagnostics.log(`Gemini TTS tentativa ${index + 1}/${attempts.length}: ${attempt.model} com ${attempt.masked}`, 'info');

    try {
      const inline = await callGeminiTts({
        text: cleanText,
        key: attempt.key,
        model: attempt.model,
        voiceName,
        style,
        fetcher,
      });

      storage.set(key, { base64: inline.base64, mimeType: inline.mimeType, savedAt: new Date().toISOString() });
      const blob = pcmToWavBlob(base64ToUint8Array(inline.base64));
      diagnostics.log(`Áudio Gemini TTS gerado com ${attempt.model}.`, 'info');
      return { ok: true, audioUrl: URL.createObjectURL(blob), source: 'gemini', error: null };
    } catch (error) {
      lastError = error;
      diagnostics.log(`Falha Gemini TTS: ${error?.message || error}`, attempt.paid ? 'error' : 'info');
    }
  }

  diagnostics.log('Gemini TTS falhou em todas as tentativas. Usando TTS do navegador como fallback.', 'error');
  await speakText(cleanText);
  return { ok: true, audioUrl: '', source: 'browser-fallback', error: lastError?.message || null };
}

export async function playGeminiTtsAudio(options = {}) {
  const result = await generateGeminiTtsAudio(options);
  if (!result.ok) return result;

  if (result.audioUrl) {
    try {
      if (currentAudio) {
        currentAudio.pause();
        currentAudio.src = '';
      }

      currentAudio = new Audio(result.audioUrl);
      currentAudio.playsInline = true;
      currentAudio.preload = 'auto';

      await currentAudio.play();
      diagnostics.log('Reprodução do áudio Gemini iniciada.', 'info');
    } catch (error) {
      diagnostics.log(`Safari bloqueou/erro ao tocar áudio Gemini: ${error?.message || error}. Usando fallback.`, 'error');
      await speakText(options.text);
      return { ...result, source: 'browser-fallback', error: error?.message || String(error) };
    }
  }

  return result;
}
