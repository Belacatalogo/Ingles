export const SPEAKING_FLOW_VERSION = 'speaking-flow-v1';

export const SPEAKING_MODE_LABELS = {
  conversation: 'Conversa',
  pronunciation: 'Pronúncia',
  immersion: 'Imersão',
};

export const speakingFlows = {
  conversation: [
    { id: 'speaking-mode', label: 'Modo', target: 'speaking-mode-switch' },
    { id: 'speaking-history', label: 'Histórico', target: 'speaking-history-area' },
    { id: 'speaking-scenario', label: 'Cenário', target: 'speaking-scenario-area' },
    { id: 'speaking-chat', label: 'Conversa', target: 'speaking-chat-area' },
    { id: 'speaking-record', label: 'Gravar', target: 'speaking-record-area' },
    { id: 'speaking-finish', label: 'Concluir', target: 'speaking-finish-area' },
  ],
  pronunciation: [
    { id: 'speaking-mode', label: 'Modo', target: 'speaking-mode-switch' },
    { id: 'speaking-history', label: 'Histórico', target: 'speaking-history-area' },
    { id: 'speaking-model', label: 'Modelo', target: 'speaking-pronunciation-model-area' },
    { id: 'speaking-score', label: 'Pontuação', target: 'speaking-score-area' },
    { id: 'speaking-repeat', label: 'Repetir', target: 'speaking-pronunciation-actions-area' },
    { id: 'speaking-finish', label: 'Avançar', target: 'speaking-pronunciation-actions-area' },
  ],
  immersion: [
    { id: 'speaking-mode', label: 'Modo', target: 'speaking-mode-switch' },
    { id: 'speaking-history', label: 'Histórico', target: 'speaking-history-area' },
    { id: 'speaking-scene', label: 'Cenário', target: 'speaking-immersion-scenes-area' },
    { id: 'speaking-model', label: 'Frase', target: 'speaking-immersion-model-area' },
    { id: 'speaking-record', label: 'Responder', target: 'speaking-record-area' },
    { id: 'speaking-finish', label: 'Registrar', target: 'speaking-record-area' },
  ],
};

export function getSpeakingFlow(mode = 'conversation') {
  return speakingFlows[mode] || speakingFlows.conversation;
}
