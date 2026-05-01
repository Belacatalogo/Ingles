import { diagnostics } from './diagnostics.js';

let activeRecorder = null;
let activeStream = null;
let activeAudioContext = null;
let activeAnalyser = null;
let activeAnimationFrame = null;
let activeAutoStop = null;
let chunks = [];
let stopping = false;

export function isRecording() {
  return Boolean(activeRecorder && activeRecorder.state === 'recording');
}

function cleanupVoiceDetection() {
  if (activeAnimationFrame) {
    cancelAnimationFrame(activeAnimationFrame);
    activeAnimationFrame = null;
  }
  try { activeAudioContext?.close?.(); } catch (_) {}
  activeAudioContext = null;
  activeAnalyser = null;
  activeAutoStop = null;
}

function chooseMimeType() {
  const candidates = ['audio/webm;codecs=opus', 'audio/webm', 'audio/mp4', 'audio/aac'];
  return candidates.find((type) => MediaRecorder.isTypeSupported?.(type)) || '';
}

function setupVoiceAutoStop(stream, options = {}) {
  const {
    minDurationMs = 1200,
    silenceMs = 1700,
    maxDurationMs = 18000,
    silenceThreshold = 0.018,
    onAutoStop,
  } = options;

  if (!onAutoStop) return;

  const AudioContextClass = window.AudioContext || window.webkitAudioContext;
  if (!AudioContextClass) {
    diagnostics.log('Detecção de silêncio indisponível: AudioContext ausente.', 'warn');
    return;
  }

  activeAudioContext = new AudioContextClass();
  const source = activeAudioContext.createMediaStreamSource(stream);
  activeAnalyser = activeAudioContext.createAnalyser();
  activeAnalyser.fftSize = 1024;
  source.connect(activeAnalyser);

  const data = new Uint8Array(activeAnalyser.fftSize);
  const startedAt = Date.now();
  let lastVoiceAt = Date.now();
  let voiceDetected = false;

  activeAutoStop = async () => {
    if (stopping || !isRecording()) return;
    stopping = true;
    diagnostics.log('Silêncio detectado. Parando gravação automaticamente.', 'info');
    const stopped = await stopRecording();
    onAutoStop(stopped);
  };

  function tick() {
    if (!activeAnalyser || !isRecording()) return;
    activeAnalyser.getByteTimeDomainData(data);
    let sum = 0;
    for (let index = 0; index < data.length; index += 1) {
      const centered = (data[index] - 128) / 128;
      sum += centered * centered;
    }
    const volume = Math.sqrt(sum / data.length);
    const now = Date.now();
    const elapsed = now - startedAt;

    if (volume > silenceThreshold) {
      voiceDetected = true;
      lastVoiceAt = now;
    }

    const silenceElapsed = now - lastVoiceAt;
    if ((voiceDetected && elapsed >= minDurationMs && silenceElapsed >= silenceMs) || elapsed >= maxDurationMs) {
      activeAutoStop?.();
      return;
    }

    activeAnimationFrame = requestAnimationFrame(tick);
  }

  activeAnimationFrame = requestAnimationFrame(tick);
}

export async function startRecording(options = {}) {
  if (!navigator.mediaDevices?.getUserMedia) {
    diagnostics.log('Gravação indisponível: navegador sem getUserMedia.', 'error');
    return { ok: false, error: 'Microfone indisponível neste navegador.' };
  }

  if (isRecording()) {
    return { ok: true, alreadyRecording: true };
  }

  try {
    stopping = false;
    activeStream = await navigator.mediaDevices.getUserMedia({
      audio: {
        echoCancellation: true,
        noiseSuppression: true,
        autoGainControl: true,
      },
    });
    chunks = [];

    const mimeType = chooseMimeType();
    activeRecorder = new MediaRecorder(activeStream, mimeType ? { mimeType } : undefined);

    activeRecorder.ondataavailable = (event) => {
      if (event.data?.size) chunks.push(event.data);
    };

    activeRecorder.start(250);
    setupVoiceAutoStop(activeStream, options);
    diagnostics.setPhase('gravando áudio', 'recording');
    diagnostics.log('Gravação iniciada com parada automática por silêncio.', 'info');

    return { ok: true, startedAt: Date.now() };
  } catch (error) {
    cleanupVoiceDetection();
    diagnostics.log(`Erro ao iniciar gravação: ${error?.message || error}`, 'error');
    return { ok: false, error: error?.message || String(error) };
  }
}

export function stopRecording() {
  return new Promise((resolve) => {
    if (!activeRecorder || activeRecorder.state === 'inactive') {
      cleanupVoiceDetection();
      resolve({ ok: false, error: 'Nenhuma gravação ativa.' });
      return;
    }

    const recorder = activeRecorder;
    const stream = activeStream;
    cleanupVoiceDetection();

    recorder.onstop = () => {
      const blob = new Blob(chunks, { type: recorder.mimeType || 'audio/webm' });
      chunks = [];

      stream?.getTracks?.().forEach((track) => track.stop());
      activeStream = null;
      activeRecorder = null;
      stopping = false;

      diagnostics.setPhase('gravação finalizada', 'idle');
      diagnostics.log(`Gravação finalizada: ${Math.round(blob.size / 1024)} KB.`, 'info');
      resolve({ ok: true, audioBlob: blob });
    };

    try { recorder.requestData?.(); } catch (_) {}
    setTimeout(() => {
      try {
        if (recorder.state !== 'inactive') recorder.stop();
      } catch (error) {
        stopping = false;
        diagnostics.log(`Erro ao parar gravação: ${error?.message || error}`, 'error');
        resolve({ ok: false, error: error?.message || String(error) });
      }
    }, 180);
  });
}

export function cancelRecording() {
  try {
    cleanupVoiceDetection();
    if (activeRecorder && activeRecorder.state !== 'inactive') {
      activeRecorder.stop();
    }
    activeStream?.getTracks?.().forEach((track) => track.stop());
  } finally {
    activeRecorder = null;
    activeStream = null;
    chunks = [];
    stopping = false;
    diagnostics.log('Gravação cancelada.', 'info');
  }
}
