import { diagnostics } from './diagnostics.js';
import { unlockAudioForIOS } from './audioUnlock.js';

export function getAvailableVoices() {
  if (!('speechSynthesis' in window)) return [];
  return window.speechSynthesis.getVoices();
}

function pickEnglishVoice() {
  const voices = getAvailableVoices();
  return (
    voices.find((voice) => /en-US/i.test(voice.lang)) ||
    voices.find((voice) => /^en/i.test(voice.lang)) ||
    voices[0] ||
    null
  );
}

export async function speakText(text, { rate = 0.92, pitch = 1, lang = 'en-US' } = {}) {
  const content = String(text ?? '').trim();

  if (!content) {
    diagnostics.log('TTS ignorado: texto vazio.', 'error');
    return { ok: false, error: 'Texto vazio.' };
  }

  if (!('speechSynthesis' in window) || typeof SpeechSynthesisUtterance === 'undefined') {
    diagnostics.log('TTS indisponível neste navegador.', 'error');
    return { ok: false, error: 'TTS indisponível.' };
  }

  await unlockAudioForIOS();

  return new Promise((resolve) => {
    window.speechSynthesis.cancel();

    const utterance = new SpeechSynthesisUtterance(content);
    utterance.lang = lang;
    utterance.rate = rate;
    utterance.pitch = pitch;
    utterance.voice = pickEnglishVoice();

    utterance.onstart = () => diagnostics.log('TTS iniciado.', 'info', { lang, rate });
    utterance.onend = () => {
      diagnostics.log('TTS finalizado.', 'info');
      resolve({ ok: true });
    };
    utterance.onerror = (event) => {
      const error = event?.error || 'Erro desconhecido no TTS.';
      diagnostics.log(`Erro no TTS: ${error}`, 'error');
      resolve({ ok: false, error });
    };

    window.speechSynthesis.speak(utterance);
  });
}

export function stopSpeech() {
  if ('speechSynthesis' in window) {
    window.speechSynthesis.cancel();
    diagnostics.log('TTS interrompido.', 'info');
  }
}
