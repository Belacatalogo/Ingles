import { diagnostics } from './diagnostics.js';
import { playGeminiTtsAudio } from './geminiTts.js';
import { speakText, stopSpeech } from './tts.js';

function isIOSLike() {
  const ua = navigator.userAgent || '';
  return /iPad|iPhone|iPod/.test(ua) || (navigator.platform === 'MacIntel' && navigator.maxTouchPoints > 1);
}

export async function playLearningAudio({
  text,
  label = 'áudio',
  voiceName = 'Kore',
  style = 'Natural, clear English teacher voice. Moderate pace and easy pronunciation.',
  preferNatural = true,
  allowBrowserFallback = true,
} = {}) {
  const cleanText = String(text ?? '').trim();
  diagnostics.log(`Botão Ouvir acionado: ${label}.`, 'info');

  if (!cleanText) {
    diagnostics.log(`Áudio ignorado em ${label}: texto vazio.`, 'error');
    return { ok: false, source: 'none', error: 'Texto vazio para reproduzir.' };
  }

  stopSpeech();

  if (isIOSLike() && allowBrowserFallback) {
    diagnostics.log(`iOS detectado: usando TTS do navegador primeiro para preservar o gesto do toque: ${label}.`, 'info');
    const fallback = await speakText(cleanText, { rate: 0.88, pitch: 1, lang: 'en-US' });
    if (fallback.ok) {
      return { ok: true, source: 'browser-ios', error: null };
    }
    diagnostics.log(`TTS iOS falhou em ${label}: ${fallback.error || 'erro desconhecido'}`, 'error');
    return {
      ok: false,
      source: 'browser-ios-error',
      error: fallback.error || 'O Safari bloqueou o áudio. Toque novamente em Ouvir dentro da aula.',
    };
  }

  if (preferNatural) {
    diagnostics.log(`Tentando áudio natural Gemini primeiro: ${label}.`, 'info');
    const natural = await playGeminiTtsAudio({ text: cleanText, voiceName, style, allowBrowserFallback });

    if (natural.ok && (natural.source === 'gemini' || natural.source === 'cache')) {
      diagnostics.log(`Áudio natural Gemini iniciado: ${label}.`, 'info');
      return natural;
    }

    if (natural.ok && natural.source === 'browser-fallback') {
      diagnostics.log(`Gemini não tocou em ${label}; fallback do navegador foi usado como último recurso.`, 'error');
      return natural;
    }

    diagnostics.log(`Gemini TTS falhou em ${label}: ${natural.error || 'erro desconhecido'}`, 'error');

    if (!allowBrowserFallback) {
      return {
        ok: false,
        source: 'gemini-error',
        error: natural.error || 'Áudio natural Gemini não pôde ser reproduzido.',
      };
    }
  }

  diagnostics.log(`Usando TTS do navegador como fallback final: ${label}.`, 'info');
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
