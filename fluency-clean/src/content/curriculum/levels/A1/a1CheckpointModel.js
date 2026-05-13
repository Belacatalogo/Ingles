import { A1_CHECKPOINTS } from './a1MasteryAssessments.js';

const pillarLabels = Object.freeze({
  grammar: 'Gramática',
  vocabulary: 'Vocabulário',
  reading: 'Leitura',
  listening: 'Escuta',
  speaking: 'Fala',
  writing: 'Escrita',
});

export function getA1CheckpointShellItems() {
  return A1_CHECKPOINTS.map((checkpoint) => Object.freeze({
    id: checkpoint.id,
    title: checkpoint.title.replace('A1 Checkpoint — ', ''),
    unlockAfterUnit: checkpoint.unlockAfterUnit,
    passingScore: checkpoint.passingScore,
    purpose: checkpoint.purpose,
    pillars: Object.entries(checkpoint.pillars || {}).map(([pillarId, pillar]) => Object.freeze({
      id: pillarId,
      title: pillarLabels[pillarId] || pillarId,
      target: pillar.target,
      requiresReview: Boolean(pillar.requiresReview),
      tasks: Array.from(pillar.tasks || []),
    })),
  }));
}

export function getA1CheckpointShellItem(checkpointId) {
  return getA1CheckpointShellItems().find((checkpoint) => checkpoint.id === checkpointId) || null;
}
