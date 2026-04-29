import { diagnostics } from './diagnostics.js';

export const AZURE_PRONUNCIATION_STATUS = {
  idle: 'idle',
  recording: 'recording',
  analyzing: 'analyzing',
  success: 'success',
  error: 'error',
};

export async function analyzePronunciation({ audioBlob, referenceText, endpoint, fetcher = fetch } = {}) {
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

  diagnostics.log('Cliente Azure preparado. Chamada real será conectada preservando o backend privado existente.', 'info', {
    endpoint,
    referencePreview: String(referenceText ?? '').slice(0, 120),
  });

  // A chamada real será ligada no bloco de áudio/Azure.
  // O backend privado não deve ser alterado; este cliente apenas preservará o contrato já existente.
  void fetcher;

  return {
    status: AZURE_PRONUNCIATION_STATUS.idle,
    result: null,
    error: null,
  };
}
