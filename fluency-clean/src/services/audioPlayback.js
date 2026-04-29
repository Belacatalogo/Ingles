import { diagnostics } from './diagnostics.js';
import { playGeminiTtsAudio } from './geminiTts.js';
import { speakText, stopSpeech } from './tts.js';

function isIOSLike() {
  if (typeof navigator === 'undefined') return false;
  const platform = navigator.platform || '';
  const ua = navigator.userAgent || '';
  return /iPhone|iPad|iPod/i.test(platform) || (/Macintosh/i.test(ua) && navigator.maxTouchPoints > 1);
}

export async function playLearningAudio({
  text,
  label = 'áudio',
  voiceName = 'Kore',
  style = 'Natural, clear English teacher voice. Moderate pace and easy pronunciation.',
  preferNatural = true,
} = {}) {
  const cleanText = String(text ?? '').trim();
  diagnostics.log(`Botão Ouvir acionado: ${label}.`, 'info');

  if (!cleanText) {
    diagnostics.log(`Áudio ignorado em ${label}: texto vazio.`, 'error');
    return { ok: false, source: 'none', error: 'Texto vazio para reproduzir.' };
  }

  stopSpeech();

  const ios = isIOSLike();

  if (ios) {
    diagnostics.log(`iOS detectado em ${label}. Usando TTS do navegador primeiro para evitar bloqueio do Safari.`, 'info');
    const browserResult = await speakText(cleanText, { rate: 0.9, pitch: 1, lang: 'en-US' });
    return {
      ok: Boolean(browserResult.ok),
      source: 'browser-ios',
      error: browserResult.error || null,
    };
  }

  if (preferNatural) {
    const natural = await playGeminiTtsAudio({ text: cleanText, voiceName, style });
    if (natural.ok) return natural;
    diagnostics.log(`Gemini TTS falhou em ${label}. Tentando fallback do navegador.`, 'error');
  }

  const fallback = await speakText(cleanText, { rate: 0.9, pitch: 1, lang: 'en-US' });
  return {
    ok: Boolean(fallback.ok),
    source: 'browser-fallback',
    error: fallback.error || null,
  };
}

export function stopLearningAudio() {
  stopSpeech();
  diagnostics.log('Áudio interrompido pelo usuário.', 'info');
}
