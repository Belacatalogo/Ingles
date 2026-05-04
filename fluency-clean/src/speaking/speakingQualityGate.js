import { getSpeakingLevelPolicy, normalizeSpeakingLevel } from './speakingLevelPolicy.js';

export const SPEAKING_QUALITY_GATE_VERSION = 'speaking-quality-gate-v1';

function clean(v) {
  return String(v ?? '').trim();
}

function ensureArray(v) {
  return Array.isArray(v) ? v : [];
}

const OBVIOUS_ANSWER_PATTERNS = [
  /resposta:/i,
  /answer:/i,
  /student says:/i,
  /aluno diz:/i,
  /you should say:/i,
];

function hasObviousAnswer(value) {
  return OBVIOUS_ANSWER_PATTERNS.some((pattern) => pattern.test(clean(value)));
}

function normalizeDialogueTurn(turn, issues, repairs) {
  const next = { ...turn };
  if (!['teacher', 'student'].includes(next.role)) {
    next.role = 'teacher';
    repairs.push('role de turno normalizado para teacher');
  }

  if (next.role === 'student') {
    if (hasObviousAnswer(next.text) || hasObviousAnswer(next.cue)) {
      issues.push('student turn com resposta revelada — descartado');
      return null;
    }

    if (clean(next.text)) {
      next.cue = clean(next.cue || next.text || 'Responda com suas próprias palavras.');
      next.text = '';
      repairs.push('student turn sanitizado: text removido e cue preservado');
    }

    if (!clean(next.cue)) {
      issues.push('student turn sem cue');
      return null;
    }

    return next;
  }

  if (!clean(next.text)) {
    issues.push('turno sem texto');
    return null;
  }

  return next;
}

export function applyGateSpeaking(rawLesson) {
  if (!rawLesson) return rawLesson;

  const lesson = { ...rawLesson };
  const level = normalizeSpeakingLevel(lesson.level);
  const policy = getSpeakingLevelPolicy(level);
  const issues = [];
  const repairs = [];

  const cleanModels = ensureArray(lesson.modelUtterances).filter((model) => {
    if (!clean(model?.english)) {
      issues.push('modelUtterance sem english');
      return false;
    }
    return true;
  });
  lesson.modelUtterances = cleanModels;

  const cleanDialogue = [];
  for (const turn of ensureArray(lesson.guidedDialogue)) {
    const normalizedTurn = normalizeDialogueTurn(turn, issues, repairs);
    if (normalizedTurn) cleanDialogue.push(normalizedTurn);
  }
  lesson.guidedDialogue = cleanDialogue;

  lesson.pronunciationItems = ensureArray(lesson.pronunciationItems).filter((item) => {
    if (!clean(item?.word) || clean(item.word).length < 2) {
      issues.push('pronunciationItem com palavra inválida');
      return false;
    }
    return true;
  });

  lesson.speakingPrompts = ensureArray(lesson.speakingPrompts).filter((prompt) => {
    if (!clean(prompt?.prompt)) {
      issues.push('speakingPrompt vazio');
      return false;
    }
    if (hasObviousAnswer(prompt.prompt) || hasObviousAnswer(prompt.scaffoldingHint)) {
      issues.push('speakingPrompt com resposta revelada');
      return false;
    }
    return true;
  });

  if (lesson.productionTask) {
    const prod = { ...lesson.productionTask };
    if (Number(prod.maxWords) > policy.productionMaxWords) {
      prod.maxWords = policy.productionMaxWords;
      repairs.push('productionTask.maxWords limitado ao nível');
    }
    if (Number(prod.minWords) < policy.productionMinWords) {
      prod.minWords = policy.productionMinWords;
      repairs.push('productionTask.minWords ajustado ao nível');
    }
    if (!clean(prod.instruction)) {
      prod.instruction = policy.productionInstruction;
      repairs.push('productionTask.instruction preenchido pela policy');
    }
    lesson.productionTask = prod;
  }

  return {
    ...lesson,
    level,
    qualityGate: {
      version: SPEAKING_QUALITY_GATE_VERSION,
      issues,
      repairs,
      passed: issues.length === 0,
    },
  };
}

export function assertSpeakingQualityGate(gated) {
  if (!gated?.qualityGate) throw new Error('Quality gate de Speaking não aplicado.');
  if (!ensureArray(gated.speakingPrompts).length && !ensureArray(gated.modelUtterances).length) {
    throw new Error('Speaking sem prompts e sem modelos após gate.');
  }
  return true;
}
