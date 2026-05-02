import { diagnostics } from './diagnostics.js';
import { generateGeminiTtsAudio } from './geminiTts.js';
import { playLearningAudio, stopLearningAudio } from './audioPlayback.js';
import { getCachedAudio, makeAudioCacheId, setCachedAudio } from './audioCache.js';

const SPEAKER_VOICES = ['Kore', 'Puck', 'Charon', 'Fenrir', 'Aoede', 'Leda'];
const MERGED_DIALOGUE_CACHE_MODEL = 'multi-speaker-merged-dialogue-v1';
const DEFAULT_SAMPLE_RATE = 24000;
let dialogueAudio = null;
const mergedAudioUrlMemory = new Map();

function clean(value) {
  return String(value ?? '').replace(/\s+/g, ' ').trim();
}

function speakerKey(value) {
  return clean(value).toLowerCase().replace(/[^a-z0-9áàâãéêíóôúçñ]+/gi, '-');
}

function splitSentences(text) {
  return clean(text).split(/(?<=[.!?])\s+/).map((item) => item.trim()).filter(Boolean);
}

function uint8ArrayToBase64(bytes) {
  let binary = '';
  const chunkSize = 0x8000;
  for (let index = 0; index < bytes.length; index += chunkSize) {
    binary += String.fromCharCode(...bytes.subarray(index, index + chunkSize));
  }
  return btoa(binary);
}

function base64ToUint8Array(base64) {
  const binary = atob(base64);
  const bytes = new Uint8Array(binary.length);
  for (let index = 0; index < binary.length; index += 1) bytes[index] = binary.charCodeAt(index);
  return bytes;
}

function makeDialogueCacheId({ parsed, style }) {
  const voiceMap = parsed.turns.map((turn) => `${turn.speaker}:${turn.voiceName}:${turn.text}`).join('|');
  return makeAudioCacheId({ text: voiceMap, voiceName: 'multi-speaker', style, model: MERGED_DIALOGUE_CACHE_MODEL });
}

export function parseDialogueTurns(text) {
  const raw = String(text ?? '').replace(/\r\n/g, '\n').trim();
  if (!raw) return { isDialogue: false, speakers: [], turns: [], plainText: '' };

  const lines = raw.split(/\n+/).map((line) => line.trim()).filter(Boolean);
  const turns = [];
  let dialogueLike = 0;

  lines.forEach((line) => {
    const match = line.match(/^([A-Za-zÀ-ÿ][A-Za-zÀ-ÿ0-9 ._-]{1,28})\s*:\s*(.+)$/);
    if (match) {
      dialogueLike += 1;
      turns.push({ speaker: clean(match[1]), text: clean(match[2]) });
      return;
    }

    if (turns.length) {
      turns[turns.length - 1].text = clean(`${turns[turns.length - 1].text} ${line}`);
    }
  });

  const speakers = [...new Set(turns.map((turn) => turn.speaker).filter(Boolean))];
  const isDialogue = turns.length >= 2 && speakers.length >= 2 && dialogueLike >= 2;

  if (!isDialogue) {
    return { isDialogue: false, speakers: [], turns: splitSentences(raw).map((text, index) => ({ speaker: '', text, index })), plainText: raw };
  }

  return {
    isDialogue: true,
    speakers,
    turns: turns.map((turn, index) => ({ ...turn, index, voiceName: getSpeakerVoice(turn.speaker, speakers) })),
    plainText: turns.map((turn) => `${turn.speaker}: ${turn.text}`).join('\n'),
  };
}

export function getSpeakerVoice(speaker, speakers = []) {
  const index = Math.max(0, speakers.findIndex((item) => speakerKey(item) === speakerKey(speaker)));
  return SPEAKER_VOICES[index % SPEAKER_VOICES.length];
}

function wavBlobFromPcm(pcmBytes, sampleRate = DEFAULT_SAMPLE_RATE) {
  const pcm = pcmBytes instanceof Uint8Array ? pcmBytes : new Uint8Array(pcmBytes);
  const buffer = new ArrayBuffer(44 + pcm.length);
  const view = new DataView(buffer);
  const write = (offset, value) => {
    for (let index = 0; index < value.length; index += 1) view.setUint8(offset + index, value.charCodeAt(index));
  };
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
  new Uint8Array(buffer, 44).set(pcm);
  return new Blob([buffer], { type: 'audio/wav' });
}

function makeAudioUrlFromPcm(pcmBytes, sampleRate = DEFAULT_SAMPLE_RATE) {
  return URL.createObjectURL(wavBlobFromPcm(pcmBytes, sampleRate));
}

async function audioUrlToPcmBytes(audioUrl) {
  const response = await fetch(audioUrl);
  const arrayBuffer = await response.arrayBuffer();
  const bytes = new Uint8Array(arrayBuffer);
  if (bytes.length <= 44) return new Uint8Array();
  return bytes.slice(44);
}

async function buildMergedPcmBytes(generated) {
  const chunks = [];
  for (const item of generated) {
    if (!item?.audioUrl) return new Uint8Array();
    const pcm = await audioUrlToPcmBytes(item.audioUrl);
    if (pcm.length) chunks.push(pcm);
  }
  if (!chunks.length) return new Uint8Array();
  const total = chunks.reduce((sum, chunk) => sum + chunk.length, 0);
  const merged = new Uint8Array(total);
  let offset = 0;
  chunks.forEach((chunk) => {
    merged.set(chunk, offset);
    offset += chunk.length;
  });
  return merged;
}

function getMergedDialogueUrlFromCache(cacheId) {
  if (mergedAudioUrlMemory.has(cacheId)) {
    diagnostics.log('Áudio final multi-voz carregado do cache em memória.', 'info');
    return mergedAudioUrlMemory.get(cacheId);
  }

  const cached = getCachedAudio(cacheId);
  if (!cached?.base64) return '';
  const pcm = base64ToUint8Array(cached.base64);
  const audioUrl = makeAudioUrlFromPcm(pcm, cached.sampleRate || DEFAULT_SAMPLE_RATE);
  mergedAudioUrlMemory.set(cacheId, audioUrl);
  diagnostics.log('Áudio final multi-voz carregado do cache local.', 'success');
  return audioUrl;
}

function saveMergedDialogueCache(cacheId, pcmBytes, textPreview) {
  if (!cacheId || !pcmBytes?.length) return false;
  const saved = setCachedAudio(cacheId, {
    base64: uint8ArrayToBase64(pcmBytes),
    mimeType: 'audio/pcm',
    sampleRate: DEFAULT_SAMPLE_RATE,
    textPreview,
  });
  if (saved) diagnostics.log('Áudio final multi-voz salvo no cache local.', 'success');
  return saved;
}

function playAudioUrl(audioUrl) {
  return new Promise((resolve) => {
    if (dialogueAudio) {
      dialogueAudio.pause();
      dialogueAudio.src = '';
    }
    dialogueAudio = new Audio(audioUrl);
    dialogueAudio.playsInline = true;
    dialogueAudio.preload = 'auto';
    dialogueAudio.onended = () => resolve({ ok: true });
    dialogueAudio.onerror = () => resolve({ ok: false, error: 'Falha ao tocar áudio de diálogo.' });
    dialogueAudio.play().then(() => {
      diagnostics.log('Áudio de diálogo iniciado como arquivo único.', 'success');
    }).catch((error) => resolve({ ok: false, error: error?.message || String(error) }));
  });
}

export function stopMultiSpeakerAudio() {
  if (dialogueAudio) {
    dialogueAudio.pause();
    dialogueAudio.currentTime = 0;
    dialogueAudio.src = '';
    dialogueAudio = null;
  }
}

export async function playMultiSpeakerDialogue({ text, label = 'Listening diálogo', style = '' } = {}) {
  const parsed = parseDialogueTurns(text);
  if (!parsed.isDialogue) {
    return playLearningAudio({ text, label, voiceName: 'Kore', style, preferNatural: true, allowBrowserFallback: true, segmentLongText: true });
  }

  stopLearningAudio();
  stopMultiSpeakerAudio();
  diagnostics.setPhase('preparando diálogo multi-voz', 'tts');
  diagnostics.log(`Diálogo detectado: ${parsed.speakers.length} personagem(ns), ${parsed.turns.length} fala(s).`, 'info');

  const cacheId = makeDialogueCacheId({ parsed, style });
  const cachedAudioUrl = getMergedDialogueUrlFromCache(cacheId);
  if (cachedAudioUrl) {
    const playResult = await playAudioUrl(cachedAudioUrl);
    if (!playResult.ok) return { ok: false, source: 'multi-speaker-merged-cache-playback-error', error: playResult.error };
    return { ok: true, source: 'multi-speaker-merged-cache', speakers: parsed.speakers.length, turns: parsed.turns.length, cacheId };
  }

  const generated = [];
  for (const turn of parsed.turns) {
    const voiceName = turn.voiceName || getSpeakerVoice(turn.speaker, parsed.speakers);
    diagnostics.log(`Gerando voz de ${turn.speaker} com ${voiceName}.`, 'info');
    const result = await generateGeminiTtsAudio({
      text: turn.text,
      voiceName,
      style: style || `Dialogue voice for ${turn.speaker}. Natural conversational English, clear pronunciation, human rhythm.`,
      useCache: true,
      allowBrowserFallback: false,
    });
    if (!result.ok || !result.audioUrl) {
      diagnostics.log(`Falha ao preparar diálogo como áudio único. Fallback sequencial: ${result.error || 'sem áudio'}`, 'warn');
      return playSequentialDialogueFallback(parsed, label, style);
    }
    generated.push({ ...result, speaker: turn.speaker, voiceName });
  }

  const mergedPcm = await buildMergedPcmBytes(generated);
  if (!mergedPcm.length) return playSequentialDialogueFallback(parsed, label, style);

  saveMergedDialogueCache(cacheId, mergedPcm, parsed.plainText);
  const audioUrl = makeAudioUrlFromPcm(mergedPcm);
  mergedAudioUrlMemory.set(cacheId, audioUrl);
  const playResult = await playAudioUrl(audioUrl);
  if (!playResult.ok) return { ok: false, source: 'dialogue-playback-error', error: playResult.error };
  return { ok: true, source: 'multi-speaker-merged-gemini', speakers: parsed.speakers.length, turns: parsed.turns.length, cacheId };
}

async function playSequentialDialogueFallback(parsed, label, style) {
  for (const turn of parsed.turns) {
    const voiceName = turn.voiceName || getSpeakerVoice(turn.speaker, parsed.speakers);
    const result = await playLearningAudio({
      text: turn.text,
      label: `${label} · ${turn.speaker}`,
      voiceName,
      style: style || `Dialogue voice for ${turn.speaker}. Natural conversational English, clear pronunciation.`,
      preferNatural: true,
      allowBrowserFallback: true,
      segmentLongText: false,
    });
    if (!result.ok) return result;
  }
  return { ok: true, source: 'multi-speaker-sequential', speakers: parsed.speakers.length, turns: parsed.turns.length };
}
