import { getListeningLevelPolicy, LISTENING_SKILLS } from './listeningLevelPolicy.js';

export const LISTENING_QUALITY_GATE_VERSION = 'listening-gate-v1';

function clean(value) {
  return String(value ?? '').replace(/\s+/g, ' ').trim();
}

function ensureArray(value) {
  return Array.isArray(value) ? value : [];
}

function normalize(value) {
  return clean(value)
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/[^a-z0-9\s']/g, ' ')
    .replace(/\s+/g, ' ')
    .trim();
}

function wordCount(value) {
  return clean(value).split(/\s+/).filter(Boolean).length;
}

function getTrigrams(text) {
  const words = normalize(text).split(/\s+/).filter((word) => word.length > 1);
  const trigrams = [];
  for (let index = 0; index <= words.length - 3; index += 1) {
    trigrams.push(words.slice(index, index + 3).join(' '));
  }
  return trigrams;
}

export function hasTranscriptLeak(questionText, listeningText) {
  const question = normalize(questionText);
  if (!question || !listeningText) return false;
  return getTrigrams(listeningText).some((trigram) => question.includes(trigram));
}

function evidenceExists(audioEvidence, listeningText) {
  const evidence = normalize(audioEvidence);
  const text = normalize(listeningText);
  if (!evidence || !text) return true;
  if (text.includes(evidence)) return true;
  const firstWords = evidence.split(/\s+/).slice(0, 4).join(' ');
  return firstWords.length >= 6 && text.includes(firstWords);
}

function deriveShadowingLines(listeningText, policy) {
  return clean(listeningText)
    .split(/[.!?]+/)
    .map(clean)
    .filter((sentence) => {
      const count = wordCount(sentence);
      return sentence.length > 3 && count >= 3 && count <= policy.shadowingMaxWords;
    })
    .slice(0, 3);
}

function makeDefaultGistQuestion(policy) {
  const pt = String(policy.instructionLanguage || '').startsWith('pt');
  return {
    skill: LISTENING_SKILLS.GIST,
    questionLanguage: policy.instructionLanguage,
    question: pt ? 'Qual é o assunto principal do áudio?' : 'What is the main topic of the audio?',
    options: [],
    answer: '',
    audioEvidence: '',
    explanation: '',
  };
}

function renameGenericSpeaker(speaker, index) {
  const name = clean(speaker?.name || speaker?.speaker || '');
  const fallbackNames = ['Alex', 'Jordan', 'Sam', 'Taylor'];
  if (/^speaker\s*\d+$/i.test(name)) {
    return {
      ...speaker,
      name: fallbackNames[index] || `Person ${index + 1}`,
    };
  }
  return speaker;
}

export function applyListeningQualityGate(rawLesson = {}) {
  if (!rawLesson || typeof rawLesson !== 'object') return rawLesson;

  let lesson = { ...rawLesson };
  const warnings = [];
  const policy = getListeningLevelPolicy(lesson.level || 'A1');
  const listeningText = clean(lesson.listeningText);

  if (!listeningText) {
    warnings.push('listeningText vazio.');
  }

  const cleanQuestions = ensureArray(lesson.listeningQuestions).filter((question) => {
    const leakedQuestion = hasTranscriptLeak(question?.question, listeningText);
    const leakedOptions = hasTranscriptLeak(ensureArray(question?.options).join(' '), listeningText);
    if (leakedQuestion || leakedOptions) {
      warnings.push(`Leak de transcrição na questão: "${clean(question?.question).slice(0, 40)}".`);
      return false;
    }
    return true;
  });
  lesson = { ...lesson, listeningQuestions: cleanQuestions };

  const cleanDictation = ensureArray(lesson.dictationItems).filter((item) => {
    const count = wordCount(item);
    if (count > policy.dictationMaxWords) {
      warnings.push(`Ditado longo demais (${count} palavras): "${clean(item).slice(0, 30)}".`);
      return false;
    }
    return clean(item);
  });
  lesson = { ...lesson, dictationItems: cleanDictation };

  const hasGist = ensureArray(lesson.listeningQuestions).some((question) => question?.skill === LISTENING_SKILLS.GIST);
  if (!hasGist && listeningText) {
    warnings.push('Sem questão de gist. Adicionando questão padrão.');
    lesson = {
      ...lesson,
      listeningQuestions: [makeDefaultGistQuestion(policy), ...ensureArray(lesson.listeningQuestions)],
    };
  }

  const shadowingLines = ensureArray(lesson.shadowingLines).map(clean).filter((line) => line.length > 3);
  if (shadowingLines.length < 2 && listeningText) {
    const derived = deriveShadowingLines(listeningText, policy);
    warnings.push('shadowingLines insuficiente. Derivando do texto.');
    lesson = { ...lesson, shadowingLines: derived };
  } else {
    lesson = { ...lesson, shadowingLines };
  }

  const verifiedQuestions = ensureArray(lesson.listeningQuestions).map((question) => {
    if (!question?.audioEvidence || !listeningText) return question;
    if (!evidenceExists(question.audioEvidence, listeningText)) {
      warnings.push(`audioEvidence não encontrada no texto: "${clean(question.audioEvidence).slice(0, 30)}".`);
      return { ...question, audioEvidence: '' };
    }
    return question;
  });
  lesson = { ...lesson, listeningQuestions: verifiedQuestions };

  const speakers = ensureArray(lesson.speakers).map((speaker, index) => renameGenericSpeaker(speaker, index));
  const renamedCount = speakers.filter((speaker, index) => speaker?.name !== ensureArray(lesson.speakers)[index]?.name).length;
  if (renamedCount > 0) warnings.push(`${renamedCount} speaker(s) genéricos renomeados.`);

  return {
    ...lesson,
    speakers,
    _qualityGate: {
      version: LISTENING_QUALITY_GATE_VERSION,
      warnings,
      warningCount: warnings.length,
      applied: true,
    },
  };
}

export function assertListeningQualityGate(lesson) {
  if (!lesson?._qualityGate?.applied) throw new Error('Listening gate não foi aplicado.');
  if (!clean(lesson.listeningText)) throw new Error('Listening gate: listeningText vazio após gate.');
  return true;
}
