import { diagnostics } from './diagnostics.js';
import { playGeminiTtsAudio, stopGeminiTtsAudio } from './geminiTts.js';
import { speakText, stopSpeech } from './tts.js';

const LONG_TEXT_THRESHOLD = 360;
const MAX_SEGMENT_CHARS = 260;
let playbackToken = 0;
let segmentQueueRunning = false;

function cleanAudioText(value) {
  return String(value ?? '').replace(/\s+/g, ' ').trim();
}

function splitIntoSentences(text) {
  return cleanAudioText(text).split(/(?<=[.!?])\s+/).map((item) => item.trim()).filter(Boolean);
}

export function segmentLearningAudioText(text, maxChars = MAX_SEGMENT_CHARS) {
  const cleanText = cleanAudioText(text);
  if (!cleanText) return [];
  const sentences = splitIntoSentences(cleanText);
  if (!sentences.length) return [cleanText.slice(0, maxChars)];

  const segments = [];
  let current = '';

  for (const sentence of sentences) {
    if (sentence.length > maxChars) {
      if (current) {
        segments.push(current.trim());
        current = '';
      }
      const words = sentence.split(/\s+/).filter(Boolean);
      let chunk = '';
      for (const word of words) {
        const next = chunk ? `${chunk} ${word}` : word;
        if (next.length > maxChars && chunk) {
          segments.push(chunk.trim());
          chunk = word;
        } else {
          chunk = next;
        }
      }
      if (chunk) segments.push(chunk.trim());
      continue;
    }

    const next = current ? `${current} ${sentence}` : sentence;
    if (next.length > maxChars && current) {
      segments.push(current.trim());
      current = sentence;
    } else {
      current = next;
    }
  }

  if (current) segments.push(current.trim());
  return segments.filter(Boolean);
}

async function playBrowserFallback(cleanText) {
  const fallback = await speakText(cleanText, { rate: 0.88, pitch: 1, lang: 'en-US' });
  return {
    ok: Boolean(fallback.ok),
    source: fallback.ok ? 'browser-fallback' : 'browser-fallback-error',
    error: fallback.error || null,
  };
}

async function playSingleLearningAudio({ cleanText, label, voiceName, style, preferNatural, allowBrowserFallback, waitUntilEnded = false }) {
  if (preferNatural) {
    diagnostics.log(`Tentando áudio natural Gemini primeiro: ${label}.`, 'info');
    const natural = await playGeminiTtsAudio({ text: cleanText, voiceName, style, allowBrowserFallback: false, waitUntilEnded });

    if (natural.ok && (natural.source === 'gemini' || natural.source === 'cache')) {
      diagnostics.log(`Áudio natural Gemini iniciado: ${label}.`, 'info');
      return natural;
    }

    diagnostics.log(`Gemini TTS falhou em ${label}: ${natural.error || 'erro desconhecido'}`, 'warn');

    if (!allowBrowserFallback) {
      return { ok: false, source: 'gemini-error', error: natural.error || 'Áudio natural Gemini não pôde ser reproduzido.' };
    }
  }

  diagnostics.log(`Usando TTS do navegador como fallback final: ${label}.`, 'info');
  return playBrowserFallback(cleanText);
}

async function playSegmentedLearningAudio({ segments, label, voiceName, style, preferNatural, allowBrowserFallback }) {
  const token = playbackToken;
  segmentQueueRunning = true;
  diagnostics.log(`Áudio longo segmentado: ${segments.length} trecho(s) para ${label}.`, 'info');

  let lastResult = { ok: false, source: 'none', error: 'Nenhum trecho reproduzido.' };
  let usedFallback = false;
  let usedCache = false;

  for (let index = 0; index < segments.length; index += 1) {
    if (token !== playbackToken) return { ok: false, source: 'stopped', error: 'Áudio interrompido.' };
    const segmentLabel = `${label} · trecho ${index + 1}/${segments.length}`;
    diagnostics.setPhase(`tocando áudio ${index + 1}/${segments.length}`, 'tts');
    diagnostics.log(`Preparando ${segmentLabel}.`, 'info');

    lastResult = await playSingleLearningAudio({
      cleanText: segments[index],
      label: segmentLabel,
      voiceName,
      style,
      preferNatural,
      allowBrowserFallback,
      waitUntilEnded: true,
    });

    if (lastResult.source === 'browser-fallback') usedFallback = true;
    if (lastResult.source === 'cache') usedCache = true;

    if (!lastResult.ok) {
      segmentQueueRunning = false;
      return lastResult;
    }

    if (token !== playbackToken) return { ok: false, source: 'stopped', error: 'Áudio interrompido.' };
    await new Promise((resolve) => setTimeout(resolve, 220));
  }

  segmentQueueRunning = false;
  diagnostics.log(`Fila de áudio concluída: ${label}.`, 'success');
  return {
    ok: true,
    source: usedFallback ? 'segmented-browser-fallback' : usedCache ? 'segmented-cache' : 'segmented-gemini',
    error: null,
    segments: segments.length,
  };
}

export async function playLearningAudio({
  text,
  label = 'áudio',
  voiceName = 'Kore',
  style = 'Natural, clear English teacher voice. Moderate pace and easy pronunciation.',
  preferNatural = true,
  allowBrowserFallback = true,
  segmentLongText = true,
} = {}) {
  const cleanText = cleanAudioText(text);
  diagnostics.log(`Botão Ouvir acionado: ${label}.`, 'info');

  if (!cleanText) {
    diagnostics.log(`Áudio ignorado em ${label}: texto vazio.`, 'error');
    return { ok: false, source: 'none', error: 'Texto vazio para reproduzir.' };
  }

  stopLearningAudio();
  playbackToken += 1;

  const shouldSegment = segmentLongText && cleanText.length > LONG_TEXT_THRESHOLD;
  if (shouldSegment) {
    const segments = segmentLearningAudioText(cleanText);
    if (segments.length > 1) return playSegmentedLearningAudio({ segments, label, voiceName, style, preferNatural, allowBrowserFallback });
  }

  return playSingleLearningAudio({ cleanText, label, voiceName, style, preferNatural, allowBrowserFallback });
}

export function stopLearningAudio() {
  playbackToken += 1;
  segmentQueueRunning = false;
  stopSpeech();
  stopGeminiTtsAudio();
  diagnostics.log('Áudio interrompido pelo usuário.', 'info');
}

export function isLearningAudioQueueRunning() {
  return segmentQueueRunning;
}
