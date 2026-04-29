import { diagnostics } from './diagnostics.js';

export const AZURE_PRONUNCIATION_STATUS = {
  idle: 'idle',
  recording: 'recording',
  analyzing: 'analyzing',
  success: 'success',
  error: 'error',
};

function getDefaultEndpoint() {
  return import.meta.env.VITE_AZURE_PRONUNCIATION_ENDPOINT || '';
}

function normalizeAzureResult(data) {
  return {
    accuracyScore: data?.accuracyScore ?? data?.accuracy ?? data?.AccuracyScore ?? null,
    fluencyScore: data?.fluencyScore ?? data?.fluency ?? data?.FluencyScore ?? null,
    completenessScore: data?.completenessScore ?? data?.CompletenessScore ?? null,
    pronunciationScore: data?.pronunciationScore ?? data?.PronunciationScore ?? null,
    words: data?.words ?? data?.Words ?? [],
    raw: data,
  };
}

export async function analyzePronunciation({ audioBlob, referenceText, endpoint = getDefaultEndpoint(), fetcher = fetch } = {}) {
  diagnostics.setPhase('preparando análise de pronúncia', AZURE_PRONUNCIATION_STATUS.analyzing);

  if (!endpoint) {
    diagnostics.log('Endpoint Azure não configurado no frontend limpo.', 'error');
    return {
      status: AZURE_PRONUNCIATION_STATUS.error,
      result: null,
      error: 'Endpoint Azure não configurado.',
    };
  }

  if (!audioBlob) {
    diagnostics.log('Nenhum áudio recebido para análise de pronúncia.', 'error');
    return {
      status: AZURE_PRONUNCIATION_STATUS.error,
      result: null,
      error: 'Nenhum áudio recebido.',
    };
  }

  try {
    diagnostics.setPhase('analisando pronúncia', AZURE_PRONUNCIATION_STATUS.analyzing);
    diagnostics.log('Enviando áudio para backend Azure existente.', 'info', {
      endpoint,
      referencePreview: String(referenceText ?? '').slice(0, 120),
      audioSize: audioBlob.size,
    });

    const form = new FormData();
    form.append('audio', audioBlob, 'speech.webm');
    form.append('referenceText', String(referenceText ?? ''));

    const response = await fetcher(endpoint, {
      method: 'POST',
      body: form,
    });

    if (!response.ok) {
      const text = await response.text().catch(() => '');
      throw new Error(`HTTP ${response.status} ${text.slice(0, 180)}`);
    }

    const data = await response.json();
    const result = normalizeAzureResult(data);

    diagnostics.setPhase('pronúncia analisada', AZURE_PRONUNCIATION_STATUS.success);
    diagnostics.log('Análise Azure concluída.', 'info', {
      pronunciationScore: result.pronunciationScore,
      accuracyScore: result.accuracyScore,
    });

    return {
      status: AZURE_PRONUNCIATION_STATUS.success,
      result,
      error: null,
    };
  } catch (error) {
    diagnostics.setPhase('erro na análise de pronúncia', AZURE_PRONUNCIATION_STATUS.error);
    diagnostics.log(`Erro Azure Pronunciation: ${error?.message || error}`, 'error');

    return {
      status: AZURE_PRONUNCIATION_STATUS.error,
      result: null,
      error: error?.message || String(error),
    };
  }
}
