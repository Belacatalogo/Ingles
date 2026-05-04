import { getSpeakingLevelPolicy, normalizeSpeakingLevel } from '../../../speaking/speakingLevelPolicy.js';
import { pullSrsReviewItems, SRS_ITEM_TYPES } from '../../../services/practiceSrsExtended.js';
import { PRACTICE_PHASES, QUESTION_TYPES } from '../PracticeTypes.js';
import { createQuestion, makeWordOptions } from './builderUtils.js';

function clean(value) {
  return String(value ?? '').replace(/\s+/g, ' ').trim();
}

function getSpeakingLesson(context) {
  return context.lesson || context.raw || {};
}

function getLevelLimits(level) {
  if (level === 'A1') return { pronunciation: 3, model: 4, audioPrep: 2, dialogue: 0, prompts: 1 };
  if (level === 'A2') return { pronunciation: 3, model: 4, audioPrep: 2, dialogue: 1, prompts: 1 };
  if (level === 'B1') return { pronunciation: 2, model: 3, audioPrep: 0, dialogue: 2, prompts: 2 };
  return { pronunciation: 2, model: 2, audioPrep: 0, dialogue: 3, prompts: 2 };
}

function withSpeakingAzure(base, policy) {
  return {
    ...base,
    azureMinPassScore: policy.azureMinPassScore,
    azureSkipOnFail: policy.azureSkipOnFail,
  };
}

function dedupeSpeakingQuestions(questions) {
  const seen = new Set();
  return questions.filter((question) => {
    if (!question) return false;
    if (question.type === QUESTION_TYPES.SPEAK_RESPONSE && typeof question.azureMinPassScore !== 'number') return false;
    if ([QUESTION_TYPES.DICTATION, QUESTION_TYPES.WRITE_SHORT, QUESTION_TYPES.CORRECTION].includes(question.type)) return false;
    const key = `${question.phase}:${question.type}:${question.prompt}:${question.answer}:${question.audioText}`.toLowerCase();
    if (seen.has(key)) return false;
    seen.add(key);
    return true;
  });
}

export function buildSpeakingPractice(context) {
  const level = normalizeSpeakingLevel(context.level || 'A1');
  const policy = getSpeakingLevelPolicy(level);
  const lesson = getSpeakingLesson(context);
  const limits = getLevelLimits(level);
  const questions = [];

  // 1. SRS REVIEW — palavras de pronúncia fracas.
  const srsReviews = pullSrsReviewItems({ skill: 'speaking', level: context.level, limit: 2 })
    .filter((seed) => seed?.srsItem?.type === SRS_ITEM_TYPES.PRONUNCIATION_WORD);

  for (const seed of srsReviews) {
    const label = clean(seed.srsItem.label || seed.srsItem.content || '');
    if (!label) continue;
    questions.push(createQuestion(withSpeakingAzure({
      skill: 'speaking',
      phase: PRACTICE_PHASES.WARMUP,
      type: QUESTION_TYPES.SPEAK_RESPONSE,
      title: 'Revisão · pronúncia frágil',
      prompt: label,
      answer: label,
      audioText: label,
      pronunciationWord: label,
      speakingSkillTag: 'pronunciation_drill',
      isReview: true,
      source: `srs-review:${seed.srsItem.key}`,
    }, policy)));
  }

  // 2. PRONUNCIATION DRILL — itens de pronúncia da aula.
  for (const item of (Array.isArray(lesson.pronunciationItems) ? lesson.pronunciationItems : []).slice(0, limits.pronunciation)) {
    const word = clean(item?.word);
    if (!word) continue;
    questions.push(createQuestion(withSpeakingAzure({
      skill: 'speaking',
      phase: PRACTICE_PHASES.WARMUP,
      type: QUESTION_TYPES.SPEAK_RESPONSE,
      title: 'Pronúncia',
      prompt: word,
      answer: word,
      audioText: word,
      pronunciationWord: word,
      phonetic: clean(item?.phonetic),
      speakingSkillTag: 'pronunciation_drill',
      source: 'speaking-pronunciation',
    }, policy)));
  }

  // 3. MODEL UTTERANCES — repetição dos modelos.
  for (const model of (Array.isArray(lesson.modelUtterances) ? lesson.modelUtterances : []).slice(0, limits.model)) {
    const english = clean(model?.english);
    if (!english) continue;
    questions.push(createQuestion(withSpeakingAzure({
      skill: 'speaking',
      phase: PRACTICE_PHASES.SPEAKING,
      type: QUESTION_TYPES.SPEAK_RESPONSE,
      title: 'Repita o modelo',
      prompt: english,
      answer: english,
      audioText: english,
      speakingSkillTag: clean(model?.speakingSkill || 'repeat_mimic'),
      scaffoldingHint: clean(model?.portuguese || model?.pronunciationFocus || ''),
      source: 'speaking-model',
    }, policy)));
  }

  // 4. AUDIO CHOICE — preparação auditiva para A1/A2.
  if (limits.audioPrep > 0) {
    for (const item of (context.vocabulary || []).slice(0, limits.audioPrep)) {
      const word = clean(item?.word);
      if (!word) continue;
      questions.push(createQuestion({
        skill: 'speaking',
        phase: PRACTICE_PHASES.WARMUP,
        type: QUESTION_TYPES.AUDIO_CHOICE,
        title: 'O que você ouviu?',
        prompt: 'Ouça e escolha:',
        audioText: word,
        answer: word,
        options: makeWordOptions(word, context),
        listeningSkillTag: 'speaking_audio_prep',
        source: 'speaking-audio-prep',
      }));
    }
  }

  // 5. GUIDED DIALOGUE — perguntas de conversação guiada.
  const studentTurns = (Array.isArray(lesson.guidedDialogue) ? lesson.guidedDialogue : [])
    .filter((turn) => turn?.role === 'student');
  for (const turn of studentTurns.slice(0, limits.dialogue)) {
    const cue = clean(turn?.cue || turn?.text);
    if (!cue) continue;
    questions.push(createQuestion(withSpeakingAzure({
      skill: 'speaking',
      phase: PRACTICE_PHASES.SPEAKING,
      type: QUESTION_TYPES.SPEAK_RESPONSE,
      title: 'Sua vez de falar',
      prompt: cue,
      answer: '',
      answerKind: 'free_text',
      audioText: cue,
      speakingSkillTag: 'guided_conversation',
      scaffoldingHint: clean(turn?.hint || ''),
      source: 'speaking-dialogue',
    }, policy)));
  }

  // 6. SPEAKING PROMPTS — resposta livre.
  for (const sp of (Array.isArray(lesson.speakingPrompts) ? lesson.speakingPrompts : []).slice(0, limits.prompts)) {
    const prompt = clean(sp?.prompt);
    if (!prompt) continue;
    questions.push(createQuestion(withSpeakingAzure({
      skill: 'speaking',
      phase: PRACTICE_PHASES.SPEAKING,
      type: QUESTION_TYPES.SPEAK_RESPONSE,
      title: 'Fale sobre isso',
      prompt,
      answer: '',
      answerKind: 'free_text',
      audioText: prompt,
      speakingSkillTag: clean(sp?.speakingSkill || 'short_answer'),
      scaffoldingHint: clean(sp?.scaffoldingHint || ''),
      source: 'speaking-prompt',
    }, policy)));
  }

  // 7. PRODUCTION — fala livre final.
  const productionInstruction = clean(lesson.productionTask?.instruction || policy.productionInstruction);
  questions.push(createQuestion(withSpeakingAzure({
    skill: 'speaking',
    phase: PRACTICE_PHASES.SPEAKING,
    type: QUESTION_TYPES.SPEAK_RESPONSE,
    title: 'Produção final',
    prompt: productionInstruction,
    answer: '',
    answerKind: 'free_text',
    audioText: productionInstruction,
    speakingSkillTag: level === 'A1' ? 'short_answer' : 'extended_response',
    scaffoldingHint: `${policy.productionMinWords || ''}–${policy.productionMaxWords || ''} palavras`.replace(/^–|–$/g, ''),
    source: 'speaking-production',
  }, policy)));

  return dedupeSpeakingQuestions(questions);
}
