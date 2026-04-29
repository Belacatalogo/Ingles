import { diagnostics } from './diagnostics.js';

let activeRecorder = null;
let activeStream = null;
let chunks = [];

export function isRecording() {
  return Boolean(activeRecorder && activeRecorder.state === 'recording');
}

export async function startRecording() {
  if (!navigator.mediaDevices?.getUserMedia) {
    diagnostics.log('Gravação indisponível: navegador sem getUserMedia.', 'error');
    return { ok: false, error: 'Microfone indisponível neste navegador.' };
  }

  if (isRecording()) {
    return { ok: true, alreadyRecording: true };
  }

  try {
    activeStream = await navigator.mediaDevices.getUserMedia({ audio: true });
    chunks = [];

    const mimeType = MediaRecorder.isTypeSupported?.('audio/webm') ? 'audio/webm' : '';
    activeRecorder = new MediaRecorder(activeStream, mimeType ? { mimeType } : undefined);

    activeRecorder.ondataavailable = (event) => {
      if (event.data?.size) chunks.push(event.data);
    };

    activeRecorder.start();
    diagnostics.setPhase('gravando áudio', 'recording');
    diagnostics.log('Gravação iniciada.', 'info');

    return { ok: true };
  } catch (error) {
    diagnostics.log(`Erro ao iniciar gravação: ${error?.message || error}`, 'error');
    return { ok: false, error: error?.message || String(error) };
  }
}

export function stopRecording() {
  return new Promise((resolve) => {
    if (!activeRecorder || activeRecorder.state === 'inactive') {
      resolve({ ok: false, error: 'Nenhuma gravação ativa.' });
      return;
    }

    activeRecorder.onstop = () => {
      const blob = new Blob(chunks, { type: activeRecorder.mimeType || 'audio/webm' });
      chunks = [];

      activeStream?.getTracks?.().forEach((track) => track.stop());
      activeStream = null;
      activeRecorder = null;

      diagnostics.setPhase('gravação finalizada', 'idle');
      diagnostics.log(`Gravação finalizada: ${Math.round(blob.size / 1024)} KB.`, 'info');
      resolve({ ok: true, audioBlob: blob });
    };

    activeRecorder.stop();
  });
}

export function cancelRecording() {
  try {
    if (activeRecorder && activeRecorder.state !== 'inactive') {
      activeRecorder.stop();
    }
    activeStream?.getTracks?.().forEach((track) => track.stop());
  } finally {
    activeRecorder = null;
    activeStream = null;
    chunks = [];
    diagnostics.log('Gravação cancelada.', 'info');
  }
}
