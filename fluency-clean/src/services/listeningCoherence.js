function clean(value) {
  return String(value ?? '').trim();
}

function ensureArray(value) {
  return Array.isArray(value) ? value : [];
}

function normalize(value) {
  return clean(value)
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/[^a-z0-9\s'-]/g, ' ')
    .replace(/\s+/g, ' ')
    .trim();
}

const STOPWORDS = new Set([
  'the','a','an','and','or','to','of','in','on','at','for','from','with','is','are','am','was','were','be','been','being','do','does','did','can','could','would','should','will','shall','may','might','must','have','has','had','i','you','he','she','it','we','they','my','your','his','her','their','our','me','him','them','this','that','these','those','what','where','when','who','why','how','which','yes','no','please','thank','thanks','hello','hi',
  'qual','quais','quem','onde','quando','como','por','para','com','sem','uma','um','o','a','os','as','de','da','do','das','dos','em','na','no','nas','nos','e','ou','que','se','sua','seu','dele','dela','nome','primeiro','ultimo','principal','motivo','visita','texto','aula','pergunta','resposta'
]);

function tokenize(value) {
  return normalize(value).split(' ').filter((token) => token.length >= 3 && !STOPWORDS.has(token));
}

function transcriptText(lesson) {
  return normalize([lesson?.listeningText, lesson?.transcript, lesson?.dialogue, lesson?.script].filter(Boolean).join(' '));
}

function hasSpeakerLabels(text) {
  return /(^|\n)\s*[A-Z][A-Za-zÀ-ÿ .'-]{1,24}\s*:/m.test(clean(text));
}

function looksLikeDialogue(text) {
  const raw = clean(text);
  const lines = raw.split(/\n+/).map((line) => line.trim()).filter(Boolean);
  if (hasSpeakerLabels(raw)) return true;
  const questionCount = (raw.match(/\?/g) || []).length;
  const shortTurns = lines.filter((line) => line.length <= 90).length;
  const dialogSignals = /\b(hello|hi|yes|no|please|thank you|can i|can you|what is|where is|my name|your name|and your|welcome)\b/i.test(raw);
  return questionCount >= 2 && shortTurns >= 4 && dialogSignals;
}

function unsupportedVocabulary(lesson, text) {
  return ensureArray(lesson?.vocabulary).filter((item) => {
    const word = normalize(item?.word || item?.term);
    if (!word || word.length < 3) return false;
    const parts = word.split(' ').filter(Boolean);
    return !parts.some((part) => part.length >= 3 && text.includes(part));
  }).map((item) => item.word || item.term).filter(Boolean);
}

function unsupportedExercise(exercise, text) {
  const tokens = tokenize([exercise?.question, exercise?.answer, ensureArray(exercise?.options).join(' ')].join(' '));
  const important = tokens.filter((token) => !/^(answer|correct|option|choose|escolha|marque)$/.test(token));
  if (!important.length) return false;
  const hitCount = important.filter((token) => text.includes(token)).length;
  const hasSpecificNameOrThing = important.some((token) => /^[a-z]+$/.test(token) && !STOPWORDS.has(token));
  if (!hasSpecificNameOrThing) return false;
  return hitCount === 0;
}

function unsupportedExercises(lesson, text) {
  return ensureArray(lesson?.exercises).filter((exercise) => unsupportedExercise(exercise, text)).map((exercise) => exercise.question || exercise.prompt || 'Questão sem suporte no texto').slice(0, 6);
}

export function validateListeningCoherence(lesson) {
  const type = normalize(lesson?.type);
  if (type !== 'listening') {
    return { approved: true, issues: [], unsupportedVocabulary: [], unsupportedExercises: [], needsSpeakerLabels: false, score: 100 };
  }

  const text = transcriptText(lesson);
  const rawTranscript = clean(lesson?.listeningText || lesson?.transcript || lesson?.dialogue || lesson?.script);
  const issues = [];
  if (text.split(' ').filter(Boolean).length < 80) issues.push('A transcrição de Listening está curta ou incompleta demais para sustentar vocabulário e questões.');

  const badVocab = unsupportedVocabulary(lesson, text);
  if (badVocab.length) issues.push(`Vocabulário fora da transcrição: ${badVocab.slice(0, 6).join(', ')}.`);

  const badExercises = unsupportedExercises(lesson, text);
  if (badExercises.length) issues.push(`Questões cobram informação que não aparece claramente na transcrição: ${badExercises.slice(0, 3).join(' | ')}.`);

  const needsSpeakerLabels = looksLikeDialogue(rawTranscript) && !hasSpeakerLabels(rawTranscript);
  if (needsSpeakerLabels) issues.push('Diálogo detectado sem nome de quem está falando em cada fala.');

  const penalty = badVocab.length * 6 + badExercises.length * 14 + (needsSpeakerLabels ? 18 : 0) + (text.split(' ').length < 80 ? 20 : 0);
  const score = Math.max(0, Math.min(100, Math.round(100 - penalty)));

  return {
    approved: issues.length === 0,
    issues,
    unsupportedVocabulary: badVocab,
    unsupportedExercises: badExercises,
    needsSpeakerLabels,
    score,
    checkedAt: new Date().toISOString(),
    version: 'listening-coherence-v1',
  };
}

function firstSentence(text) {
  return clean(text).split(/(?<=[.!?])\s+/).find(Boolean) || clean(text);
}

export function repairListeningCoherence(lesson) {
  const text = transcriptText(lesson);
  const rawTranscript = clean(lesson?.listeningText || '');
  const badVocab = new Set(unsupportedVocabulary(lesson, text).map((item) => normalize(item)));
  const vocabulary = ensureArray(lesson?.vocabulary).filter((item) => !badVocab.has(normalize(item?.word || item?.term)));
  const exercises = ensureArray(lesson?.exercises).filter((exercise) => !unsupportedExercise(exercise, text));

  let listeningText = rawTranscript;
  if (looksLikeDialogue(rawTranscript) && !hasSpeakerLabels(rawTranscript)) {
    const lines = rawTranscript.split(/(?<=[.!?])\s+/).map((line) => clean(line)).filter(Boolean);
    listeningText = lines.map((line, index) => `${index % 2 === 0 ? 'Librarian' : 'Student'}: ${line}`).join('\n');
  }

  return {
    ...lesson,
    listeningText,
    vocabulary: vocabulary.length >= 6 ? vocabulary : ensureArray(lesson?.vocabulary),
    exercises: exercises.length >= 6 ? exercises : ensureArray(lesson?.exercises).map((exercise) => ({
      ...exercise,
      explanation: clean(exercise?.explanation) || `Use a transcrição: “${firstSentence(rawTranscript)}”.`,
    })),
    quality: {
      ...(lesson?.quality && typeof lesson.quality === 'object' ? lesson.quality : {}),
      listeningCoherenceRepaired: true,
    },
  };
}
