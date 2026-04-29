import { diagnostics } from './diagnostics.js';

let unlocked = false;
let audioContext = null;

export function isAudioUnlocked() {
  return unlocked;
}

export async function unlockAudioForIOS() {
  if (unlocked) {
    diagnostics.log('Áudio iOS já estava liberado.', 'info');
    return { ok: true, alreadyUnlocked: true };
  }

  try {
    const AudioContextClass = window.AudioContext || window.webkitAudioContext;

    if (AudioContextClass) {
      audioContext = audioContext || new AudioContextClass();
      if (audioContext.state === 'suspended') {
        await audioContext.resume();
      }

      const buffer = audioContext.createBuffer(1, 1, 22050);
      const source = audioContext.createBufferSource();
      source.buffer = buffer;
      source.connect(audioContext.destination);
      source.start(0);
    }

    const audio = document.createElement('audio');
    audio.setAttribute('playsinline', 'true');
    audio.muted = true;
    audio.src = 'data:audio/mp3;base64,//uQZAAAAAAAAAAAAAAAAAAAAAAAWGluZwAAAA8AAAACAAACcQCA';
    await audio.play().catch(() => {});
    audio.pause();

    unlocked = true;
    diagnostics.log('Áudio liberado para iOS.', 'info');
    return { ok: true, alreadyUnlocked: false };
  } catch (error) {
    diagnostics.log(`Falha ao liberar áudio no iOS: ${error?.message || error}`, 'error');
    return { ok: false, error: error?.message || String(error) };
  }
}

export function getAudioContext() {
  return audioContext;
}
