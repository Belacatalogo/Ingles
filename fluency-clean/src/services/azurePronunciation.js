import { diagnostics } from './diagnostics.js';

export const AZURE_PRONUNCIATION_STATUS = {
  idle: 'idle',
  recording: 'recording',
  analyzing: 'analyzing',
  success: 'success',
  error: 'error',
};

const SDK_URL = 'https://aka.ms/csspeech/jsbrowserpackageraw';
const DEFAULT_TOKEN_URL = 'https://fluency-azure-token.onrender.com/token';
const TOKEN_TTL_MS = 9 * 60 * 1000;

let sdkPromise = null;
let tokenCache = null;

function getTokenUrl() {
  return import.meta.env.VITE_AZURE_TOKEN_URL || import.meta.env.VITE_AZURE_PRONUNCIATION_ENDPOINT || DEFAULT_TOKEN_URL;
}

function round(value) {
  if (value == null || Number.isNaN(Number(value))) return null;
  return Math.round(Number(value));
}

function loadAzureSDK() {
  if (window.SpeechSDK) return Promise.resolve(window.SpeechSDK);
  if (sdkPromise) return sdkPromise;

  sdkPromise = new Promise((resolve, reject) => {
    const script = document.createElement('script');
    script.src = SDK_URL;
    script.async = true;
    script.onload = () => {
      if (window.SpeechSDK) resolve(window.SpeechSDK);
      else reject(new Error('Azure SpeechSDK não foi exposto no window.'));
    };
    script.onerror = () => reject(new Error('Falha ao carregar Azure Speech SDK.'));
    document.head.appendChild(script);
  });

  return sdkPromise;
}

async function getAzureToken(fetcher = fetch) {
  const now = Date.now();
  if (tokenCache && tokenCache.expiresAt > now) {
    diagnostics.log('Azure token reutilizado do cache.', 'info');
    return tokenCache;
  }

  const tokenUrl = getTokenUrl();
  const response = await fetcher(tokenUrl, { method: 'GET' });
  if (!response.ok) {
    throw new Error(`Token HTTP ${response.status}`);
  }

  const data = await response.json();
  if (!data?.token || !data?.region) {
    throw new Error('Resposta de token Azure inválida.');
  }

  tokenCache = {
    token: data.token,
    region: data.region,
    keyIndex: data.keyIndex || data.activeKeyIndex || 1,
    resourceCount: data.resourceCount || 1,
    expiresAt: now + TOKEN_TTL_MS,
    raw: data,
  };

  diagnostics.log(`Azure token recebido: key ${tokenCache.keyIndex}/${tokenCache.resourceCount}.`, 'info');
  return tokenCache;
}

async function decodeAudioBlobToPCM16k(audioBlob) {
  const arrayBuffer = await audioBlob.arrayBuffer();
  const AudioContextClass = window.AudioContext || window.webkitAudioContext;
  const OfflineAudioContextClass = window.OfflineAudioContext || window.webkitOfflineAudioContext;

  if (!AudioContextClass || !OfflineAudioContextClass) {
    throw new Error('AudioContext indisponível para decodificar áudio.');
  }

  const context = new AudioContextClass();
  let decoded;
  try {
    decoded = await context.decodeAudioData(arrayBuffer.slice(0));
  } finally {
    try { await context.close?.(); } catch (_) {}
  }

  if (!decoded || decoded.duration < 0.2) {
    throw new Error('Áudio muito curto ou vazio.');
  }

  const targetRate = 16000;
  const targetLength = Math.max(1, Math.ceil(decoded.duration * targetRate));
  const offline = new OfflineAudioContextClass(1, targetLength, targetRate);

  let sourceBuffer = decoded;
  if (decoded.numberOfChannels > 1) {
    sourceBuffer = offline.createBuffer(1, decoded.length, decoded.sampleRate);
    const mono = sourceBuffer.getChannelData(0);
    for (let channel = 0; channel < decoded.numberOfChannels; channel += 1) {
      const data = decoded.getChannelData(channel);
      for (let index = 0; index < data.length; index += 1) {
        mono[index] += data[index] / decoded.numberOfChannels;
      }
    }
  }

  const source = offline.createBufferSource();
  source.buffer = sourceBuffer;
  source.connect(offline.destination);
  source.start(0);

  const rendered = await offline.startRendering();
  const samples = rendered.getChannelData(0);
  const pcm16 = new Int16Array(samples.length);

  for (let index = 0; index < samples.length; index += 1) {
    let sample = samples[index];
    if (sample > 1) sample = 1;
    if (sample < -1) sample = -1;
    pcm16[index] = sample < 0 ? Math.round(sample * 0x8000) : Math.round(sample * 0x7fff);
  }

  return pcm16;
}

function mapAzureWord(word) {
  const assessment = word?.PronunciationAssessment || {};
  const accuracy = round(assessment.AccuracyScore);
  const errorType = assessment.ErrorType || 'None';

  let status = 'correct';
  if (errorType === 'Omission') status = 'missing';
  else if (errorType !== 'None') status = accuracy != null && accuracy >= 60 ? 'medium' : 'wrong';
  else if (accuracy != null && accuracy < 60) status = 'wrong';
  else if (accuracy != null && accuracy < 80) status = 'medium';

  return {
    word: word?.Word || '',
    status,
    accuracyScore: accuracy,
    errorType,
    phonemes: (word?.Phonemes || []).map((phoneme) => ({
      phoneme: phoneme.Phoneme,
      score: round(phoneme?.PronunciationAssessment?.AccuracyScore),
    })),
  };
}

function normalizeAzureJson(json) {
  const best = json?.NBest?.[0];
  if (!best) throw new Error('Azure não retornou NBest.');

  const assessment = best.PronunciationAssessment || {};
  return {
    accuracyScore: round(assessment.AccuracyScore),
    fluencyScore: round(assessment.FluencyScore),
    completenessScore: round(assessment.CompletenessScore),
    pronunciationScore: round(assessment.PronScore),
    words: (best.Words || []).map(mapAzureWord),
    raw: json,
  };
}

function recognizeOnce(recognizer, SDK) {
  return new Promise((resolve, reject) => {
    recognizer.recognizeOnceAsync(
      (result) => {
        if (result.reason === SDK.ResultReason.Canceled) {
          const details = SDK.CancellationDetails.fromResult(result);
          reject(new Error(`Azure cancelou: ${details.reason} / ${details.errorDetails || ''}`));
          return;
        }

        if (result.reason !== SDK.ResultReason.RecognizedSpeech) {
          reject(new Error(`Azure não reconheceu fala: reason=${result.reason}`));
          return;
        }

        resolve(result);
      },
      (error) => reject(new Error(error?.message || String(error)))
    );
  });
}

export async function analyzePronunciation({ audioBlob, referenceText, fetcher = fetch } = {}) {
  diagnostics.setPhase('preparando análise de pronúncia', AZURE_PRONUNCIATION_STATUS.analyzing);

  if (!audioBlob) {
    diagnostics.log('Nenhum áudio recebido para análise de pronúncia.', 'error');
    return { status: AZURE_PRONUNCIATION_STATUS.error, result: null, error: 'Nenhum áudio recebido.' };
  }

  if (!referenceText) {
    diagnostics.log('Texto de referência ausente para análise Azure.', 'error');
    return { status: AZURE_PRONUNCIATION_STATUS.error, result: null, error: 'Texto de referência ausente.' };
  }

  let recognizer = null;

  try {
    diagnostics.setPhase('carregando Azure SDK', AZURE_PRONUNCIATION_STATUS.analyzing);
    const SDK = await loadAzureSDK();

    diagnostics.setPhase('obtendo token Azure', AZURE_PRONUNCIATION_STATUS.analyzing);
    const tokenInfo = await getAzureToken(fetcher);

    diagnostics.setPhase('decodificando áudio', AZURE_PRONUNCIATION_STATUS.analyzing);
    const pcm16 = await decodeAudioBlobToPCM16k(audioBlob);

    const speechConfig = SDK.SpeechConfig.fromAuthorizationToken(tokenInfo.token, tokenInfo.region);
    speechConfig.speechRecognitionLanguage = 'en-US';

    const pronunciationConfig = new SDK.PronunciationAssessmentConfig(
      String(referenceText),
      SDK.PronunciationAssessmentGradingSystem.HundredMark,
      SDK.PronunciationAssessmentGranularity.Phoneme,
      true
    );

    const format = SDK.AudioStreamFormat.getWaveFormatPCM(16000, 16, 1);
    const pushStream = SDK.AudioInputStream.createPushStream(format);
    pushStream.write(pcm16.buffer.slice(0));
    pushStream.close();

    const audioConfig = SDK.AudioConfig.fromStreamInput(pushStream);
    recognizer = new SDK.SpeechRecognizer(speechConfig, audioConfig);
    pronunciationConfig.applyTo(recognizer);

    diagnostics.setPhase('analisando pronúncia', AZURE_PRONUNCIATION_STATUS.analyzing);
    const result = await recognizeOnce(recognizer, SDK);
    const raw = result.properties.getProperty(SDK.PropertyId.SpeechServiceResponse_JsonResult);
    const normalized = normalizeAzureJson(JSON.parse(raw));

    diagnostics.setPhase('pronúncia analisada', AZURE_PRONUNCIATION_STATUS.success);
    diagnostics.log('Análise Azure concluída.', 'info', {
      pronunciationScore: normalized.pronunciationScore,
      accuracyScore: normalized.accuracyScore,
    });

    return { status: AZURE_PRONUNCIATION_STATUS.success, result: normalized, error: null };
  } catch (error) {
    diagnostics.setPhase('erro na análise de pronúncia', AZURE_PRONUNCIATION_STATUS.error);
    diagnostics.log(`Erro Azure Pronunciation: ${error?.message || error}`, 'error');
    return { status: AZURE_PRONUNCIATION_STATUS.error, result: null, error: error?.message || String(error) };
  } finally {
    try { recognizer?.close?.(); } catch (_) {}
  }
}
