import { diagnostics } from './diagnostics.js';
import { unlockAudioForIOS } from './audioUnlock.js';

export function getAvailableVoices() {
  if (!('speechSynthesis' in window)) return [];
  return window.speechSynthesis.getVoices();
}

function waitForVoices(timeoutMs = 700) {
  if (!('speechSynthesis' in window)) return Promise.resolve([]);
  const current = window.speechSynthesis.getVoices();
  if (current.length) return Promise.resolve(current);

  return new Promise((resolve) => {
    let finished = false;
    const finish = () => {
      if (finished) return;
      finished = true;
      window.speechSynthesis.onvoiceschanged = null;
      resolve(window.speechSynthesis.getVoices());
    };

    window.speechSynthesis.onvoiceschanged = finish;
    setTimeout(finish, timeoutMs);
  });
}

async function pickEnglishVoice() {
  const voices = await waitForVoices();
  return (
    voices.find((voice) => /en-US/i.test(voice.lang) && /samantha|ava|allison|nicky|susan|alex/i.test(voice.name)) ||
    voices.find((voice) => /en-US/i.test(voice.lang)) ||
    voices.find((voice) => /^en/i.test(voice.lang)) ||
    voices[0] ||
    null
  );
}

export async function speakText(text, { rate = 0.9, pitch = 1, lang = 'en-US', waitUntilEnded = false } = {}) {
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
  const voice = await pickEnglishVoice();

  return new Promise((resolve) => {
    let settled = false;
    const finish = (result) => {
      if (settled) return;
      settled = true;
      resolve(result);
    };

    window.speechSynthesis.cancel();

    const utterance = new SpeechSynthesisUtterance(content);
    utterance.lang = voice?.lang || lang;
    utterance.rate = rate;
    utterance.pitch = pitch;
    utterance.voice = voice;

    utterance.onstart = () => {
      diagnostics.log('TTS iniciado.', 'info', { lang: utterance.lang, rate });
      if (!waitUntilEnded) finish({ ok: true, started: true });
    };
    utterance.onend = () => {
      diagnostics.log('TTS finalizado.', 'info');
      finish({ ok: true });
    };
    utterance.onerror = (event) => {
      const error = event?.error || 'Erro desconhecido no TTS.';
      if (error === 'interrupted' || error === 'canceled') {
        diagnostics.log(`TTS interrompido: ${error}`, 'info');
        finish({ ok: true, interrupted: true });
        return;
      }
      diagnostics.log(`Erro no TTS: ${error}`, 'error');
      finish({ ok: false, error });
    };

    window.speechSynthesis.speak(utterance);

    setTimeout(() => {
      if (settled) return;
      if (window.speechSynthesis.speaking || window.speechSynthesis.pending) return;
      diagnostics.log('TTS não iniciou após o toque. A plataforma/navegador pode ter bloqueado a voz.', 'warn');
      finish({ ok: false, error: 'A plataforma/navegador bloqueou o áudio. Toque novamente em Ouvir.' });
    }, 1200);
  });
}

export function stopSpeech() {
  if ('speechSynthesis' in window) {
    window.speechSynthesis.cancel();
    diagnostics.log('TTS interrompido.', 'info');
  }
}
