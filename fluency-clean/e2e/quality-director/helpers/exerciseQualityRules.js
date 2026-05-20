const OPTION_KEYS = ['options', 'choices', 'alternatives', 'answers'];
const ANSWER_KEYS = ['answer', 'expected', 'expectedAnswer', 'correct', 'answerKey', 'correctOption', 'correctChoice', 'modelAnswer', 'sampleAnswer'];
const QUESTION_KEYS = ['question', 'prompt', 'instruction', 'title'];
const FEEDBACK_KEYS = ['explanation', 'feedback', 'hint', 'tip', 'why', 'rationale', 'note'];

const GENERIC_OPTION_PATTERNS = [/^option\s*[a-d]?$/i, /^choice\s*[a-d]?$/i, /^answer\s*[a-d]?$/i, /^correct answer$/i, /^wrong answer$/i, /^n\/a$/i];
const ABSURD_DISTRACTORS = new Set(['banana', 'pizza', 'car', 'blue', 'red', 'green', 'dog', 'cat', 'table', 'chair', 'computer', 'house', 'water', 'book', 'phone', 'apple', 'orange', 'football', 'music', 'coffee']);
const GENERIC_FEEDBACK_PATTERNS = [/^good$/i, /^ok$/i, /^correct$/i, /^incorrect$/i, /^try again$/i, /^resposta correta$/i, /^resposta incorreta$/i, /^boa$/i, /^muito bem$/i, /^tente novamente$/i];

const STOPWORDS = new Set([
  'the', 'a', 'an', 'and', 'or', 'to', 'of', 'in', 'on', 'at', 'for', 'with', 'from', 'by', 'as', 'than',
  'is', 'are', 'am', 'was', 'were', 'be', 'been', 'being', 'do', 'does', 'did', 'have', 'has', 'had',
  'i', 'you', 'he', 'she', 'it', 'we', 'they', 'his', 'her', 'their', 'my', 'your', 'our', 'everyone',
  'what', 'where', 'who', 'when', 'why', 'how', 'which', 'choose', 'correct', 'answer', 'resposta', 'correta', 'qual',
  'because', 'if', 'then', 'so', 'very', 'more', 'most', 'only', 'just', 'again', 'tomorrow', 'first',
  'o', 'a', 'os', 'as', 'de', 'do', 'da', 'em', 'para', 'com', 'um', 'uma', 'e', 'ou', 'que', 'como', 'onde', 'quem',
]);

const GRAMMAR_PRONOUNS = new Set(['i', 'you', 'he', 'she', 'it', 'we', 'they']);
const GRAMMAR_BE_FORMS = new Set(['am', 'is', 'are', 'was', 'were', 'be', 'been', 'being']);
const GRAMMAR_DETERMINERS = new Set(['a', 'an', 'the', 'my', 'your', 'his', 'her', 'our', 'their']);
const GRAMMAR_DEMONSTRATIVES = new Set(['this', 'that', 'these', 'those', 'there']);
const GRAMMAR_AUXILIARIES = new Set(['do', 'does', 'did', 'can', 'could', 'will', 'would', 'should']);
const RESPONSE_PREFIXES = new Set(['yes', 'no']);
const NEGATION_WORDS = new Set(['not', 'no', 'never']);
const STRUCTURAL_WORDS = new Set([...GRAMMAR_BE_FORMS, ...GRAMMAR_DETERMINERS, ...GRAMMAR_DEMONSTRATIVES, ...GRAMMAR_AUXILIARIES, ...NEGATION_WORDS, 'have', 'has', 'can']);
const COMPREHENSION_PATH_PATTERNS = [/evidenceQuestions/i, /readingComprehension/i, /listeningComprehension/i, /comprehensionQuestions/i, /listeningQuestions/i, /readingQuestions/i];

const SYNONYMS = new Map([
  ['comfortable', 'comfort'], ['comfy', 'comfort'], ['working', 'work'], ['works', 'work'], ['worked', 'work'],
  ['restarted', 'restart'], ['checked', 'check'], ['checking', 'check'], ['updating', 'update'], ['updated', 'update'],
  ['bottles', 'bottle'], ['prices', 'price'], ['shoes', 'shoe'], ['leaking', 'leak'], ['ids', 'id'],
]);

// "one" fica de fora de propósito: é polissêmico (artigo/pronome —
// "one day", "the red one") e gerava falso conflito numérico em resumos
// concisos. O bug-alvo (19/20/21 years old) usa dígitos, não palavras.
const NUMBER_WORDS = new Map([
  ['zero', 0], ['two', 2], ['three', 3], ['four', 4], ['five', 5], ['six', 6], ['seven', 7],
  ['eight', 8], ['nine', 9], ['ten', 10], ['eleven', 11], ['twelve', 12], ['thirteen', 13], ['fourteen', 14],
  ['fifteen', 15], ['sixteen', 16], ['seventeen', 17], ['eighteen', 18], ['nineteen', 19], ['twenty', 20],
  ['thirty', 30], ['forty', 40], ['fifty', 50], ['sixty', 60], ['seventy', 70], ['eighty', 80],
  ['ninety', 90], ['hundred', 100],
]);

function clean(value) {
  if (value === null || value === undefined) return '';
  if (typeof value === 'string' || typeof value === 'number') return String(value).trim().replace(/\s+/g, ' ');
  if (Array.isArray(value)) return value.map(clean).filter(Boolean).join(' ');
  if (typeof value === 'object') return clean(value.label || value.text || value.value || value.answer || value.title || value.question || value.prompt || '');
  return '';
}

function normalize(value) {
  return clean(value).toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, '').replace(/[^a-z0-9\s]/gi, ' ').replace(/\s+/g, ' ').trim();
}

function rawWords(value) { return normalize(value).split(/\s+/).filter(Boolean); }
function stripResponsePrefix(tokens) { return tokens.length > 1 && RESPONSE_PREFIXES.has(tokens[0]) ? tokens.slice(1) : tokens; }

function stem(word) {
  const direct = SYNONYMS.get(word);
  if (direct) return direct;
  if (word.length > 5 && word.endsWith('ing')) return word.slice(0, -3);
  if (word.length > 4 && word.endsWith('ed')) return word.slice(0, -2);
  if (word.length > 4 && word.endsWith('es')) return word.slice(0, -2);
  if (word.length > 3 && word.endsWith('s')) return word.slice(0, -1);
  return word;
}

function words(value) { return rawWords(value).map(stem).filter((word) => word && !STOPWORDS.has(word) && word.length > 1); }

function firstValue(object, keys) {
  for (const key of keys) if (object && object[key] !== undefined && object[key] !== null && clean(object[key])) return object[key];
  return '';
}

function getOptions(object = {}) { for (const key of OPTION_KEYS) if (Array.isArray(object[key])) return object[key].map(clean).filter(Boolean); return []; }
function getQuestion(object = {}) { return clean(firstValue(object, QUESTION_KEYS)); }
function getAnswer(object = {}) { return clean(firstValue(object, ANSWER_KEYS)); }
function getFeedback(object = {}) { return clean(firstValue(object, FEEDBACK_KEYS)); }

function isExerciseLike(object = {}) {
  if (!object || typeof object !== 'object' || Array.isArray(object)) return false;
  const question = getQuestion(object);
  const answer = getAnswer(object);
  const options = getOptions(object);
  return Boolean(question && (answer || options.length >= 2 || /pergunta|question|quiz|exercise|exerc/i.test(question)));
}

function collectExerciseObjects(value, result = [], path = 'lesson') {
  if (!value || typeof value !== 'object') return result;
  if (Array.isArray(value)) { value.forEach((item, index) => collectExerciseObjects(item, result, `${path}[${index}]`)); return result; }
  if (isExerciseLike(value)) result.push({ path, item: value });
  Object.entries(value).forEach(([key, child]) => { if (child && typeof child === 'object') collectExerciseObjects(child, result, `${path}.${key}`); });
  return result;
}

function addIssue(issues, issue) { issues.push({ severity: 'P2', ...issue }); }
function tokenSet(value) { return new Set(words(value)); }

function lexicalOverlap(a, b) {
  const aWords = tokenSet(a);
  const bWords = tokenSet(b);
  if (!aWords.size || !bWords.size) return 0;
  let hits = 0;
  aWords.forEach((word) => { if (bWords.has(word)) hits += 1; });
  return hits / Math.min(aWords.size, bWords.size);
}

function setFrom(tokens, vocabulary) { return new Set(tokens.filter((token) => vocabulary.has(token))); }
function sameSet(a, b) { if (a.size !== b.size) return false; for (const item of a) if (!b.has(item)) return false; return true; }
function sameSequence(a, b) { return a.length === b.length && a.every((item, index) => item === b[index]); }
function startsWithGrammarFrame(tokens) {
  const stripped = stripResponsePrefix(tokens);
  return GRAMMAR_PRONOUNS.has(stripped[0]) || GRAMMAR_BE_FORMS.has(stripped[0]) || GRAMMAR_AUXILIARIES.has(stripped[0]) || GRAMMAR_DETERMINERS.has(stripped[0]) || GRAMMAR_DEMONSTRATIVES.has(stripped[0]);
}
function endsAsQuestion(value) { return /\?\s*$/.test(clean(value)); }
function isComprehensionPath(path = '') { return COMPREHENSION_PATH_PATTERNS.some((pattern) => pattern.test(path)); }
function splitSentences(value) { return clean(value).split(/[.!?]+/).map((part) => part.trim()).filter(Boolean); }
function contentWithoutBe(tokens) { return tokens.filter((token) => !GRAMMAR_BE_FORMS.has(token)); }

function numericValues(value) {
  const result = [];
  for (const token of rawWords(value)) {
    if (/^\d+$/.test(token)) result.push(Number(token));
    else if (NUMBER_WORDS.has(token)) result.push(NUMBER_WORDS.get(token));
  }
  return result.sort((a, b) => a - b);
}

// Numbers carry the answer in comprehension items (idade, horário, quantidade).
// "19 years old" e "20 years old" compartilham "years old" mas NÃO são equivalentes.
// Só bloqueia quando ambos os lados têm número e os conjuntos divergem;
// respostas sem número e matches exatos não são afetados.
function hasNumericConflict(option, answer) {
  const optionNums = numericValues(option);
  const answerNums = numericValues(answer);
  if (!optionNums.length || !answerNums.length) return false;
  return !sameSequence(optionNums, answerNums);
}

function hasNegationMismatch(option, answer) {
  const optionRaw = rawWords(option);
  const answerRaw = rawWords(answer);
  const optionNegation = setFrom(optionRaw, NEGATION_WORDS);
  const answerNegation = setFrom(answerRaw, NEGATION_WORDS);
  if (!optionNegation.size && !answerNegation.size) return false;
  return !sameSet(optionNegation, answerNegation);
}

function hasBeAgreementMismatch(option, answer) {
  const optionRaw = stripResponsePrefix(rawWords(option));
  const answerRaw = stripResponsePrefix(rawWords(answer));
  if (!optionRaw.length || !answerRaw.length || optionRaw.length > 9 || answerRaw.length > 9) return false;
  const optionBe = setFrom(optionRaw, GRAMMAR_BE_FORMS);
  const answerBe = setFrom(answerRaw, GRAMMAR_BE_FORMS);
  if (!optionBe.size || !answerBe.size) return false;
  if (sameSet(optionBe, answerBe)) return false;
  return sameSequence(contentWithoutBe(optionRaw), contentWithoutBe(answerRaw));
}

function isShortGrammarStructureSensitive(option, answer) {
  const optionRaw = rawWords(option);
  const answerRaw = rawWords(answer);
  const optionCore = stripResponsePrefix(optionRaw);
  const answerCore = stripResponsePrefix(answerRaw);
  if (!optionRaw.length || !answerRaw.length || answerRaw.length > 8 || optionRaw.length > 9) return false;
  if (endsAsQuestion(option) || endsAsQuestion(answer)) return true;
  if (startsWithGrammarFrame(answerRaw) || startsWithGrammarFrame(optionRaw)) return true;
  if (hasBeAgreementMismatch(option, answer)) return true;
  if (answerCore.length <= 4 && (answerCore.some((token) => NEGATION_WORDS.has(token)) || optionCore.some((token) => NEGATION_WORDS.has(token)))) return true;
  return false;
}

function sameTokenBag(a, b) {
  if (a.length !== b.length) return false;
  const counts = new Map();
  a.forEach((token) => counts.set(token, (counts.get(token) || 0) + 1));
  for (const token of b) {
    const next = (counts.get(token) || 0) - 1;
    if (next < 0) return false;
    if (next === 0) counts.delete(token); else counts.set(token, next);
  }
  return counts.size === 0;
}

function hasShortOrderMismatch(option, answer) {
  const optionRaw = stripResponsePrefix(rawWords(option));
  const answerRaw = stripResponsePrefix(rawWords(answer));
  if (!optionRaw.length || !answerRaw.length || optionRaw.length > 9 || answerRaw.length > 9) return false;
  return sameTokenBag(optionRaw, answerRaw) && !sameSequence(optionRaw, answerRaw);
}

function hasGrammarCoreMismatch(option, answer) {
  const optionRaw = rawWords(option);
  const answerRaw = rawWords(answer);
  if (!isShortGrammarStructureSensitive(option, answer)) return false;
  if (hasNegationMismatch(option, answer)) return true;
  if (hasBeAgreementMismatch(option, answer)) return true;
  if (endsAsQuestion(option) !== endsAsQuestion(answer)) return true;

  const optionPronouns = setFrom(optionRaw, GRAMMAR_PRONOUNS);
  const answerPronouns = setFrom(answerRaw, GRAMMAR_PRONOUNS);
  const optionBeForms = setFrom(optionRaw, GRAMMAR_BE_FORMS);
  const answerBeForms = setFrom(answerRaw, GRAMMAR_BE_FORMS);
  const optionDeterminers = setFrom(optionRaw, GRAMMAR_DETERMINERS);
  const answerDeterminers = setFrom(answerRaw, GRAMMAR_DETERMINERS);
  const optionDemonstratives = setFrom(optionRaw, GRAMMAR_DEMONSTRATIVES);
  const answerDemonstratives = setFrom(answerRaw, GRAMMAR_DEMONSTRATIVES);
  const optionAuxiliaries = setFrom(optionRaw, GRAMMAR_AUXILIARIES);
  const answerAuxiliaries = setFrom(answerRaw, GRAMMAR_AUXILIARIES);

  if (!sameSet(optionPronouns, answerPronouns)) return true;
  if (!sameSet(optionBeForms, answerBeForms)) return true;
  if (!sameSet(optionAuxiliaries, answerAuxiliaries)) return true;
  if (!sameSet(optionDemonstratives, answerDemonstratives)) return true;
  if (answerRaw.length <= 8 && !sameSet(optionDeterminers, answerDeterminers)) return true;
  if (hasShortOrderMismatch(option, answer)) return true;
  if (startsWithGrammarFrame(answerRaw) && optionRaw[0] !== answerRaw[0]) return true;
  return false;
}

function hasCompoundGrammarMismatch(option, answer) {
  const optionSentences = splitSentences(option);
  const answerSentences = splitSentences(answer);
  if (optionSentences.length < 2 && answerSentences.length < 2) return false;
  if (optionSentences.length !== answerSentences.length) return true;

  return answerSentences.some((answerSentence, index) => {
    const optionSentence = optionSentences[index] || '';
    if (normalize(optionSentence) === normalize(answerSentence)) return false;
    if (hasBeAgreementMismatch(optionSentence, answerSentence)) return true;
    if (isShortGrammarStructureSensitive(optionSentence, answerSentence)) return true;
    if (hasGrammarCoreMismatch(optionSentence, answerSentence)) return true;

    const optionRaw = rawWords(optionSentence);
    const answerRaw = rawWords(answerSentence);
    const optionPronouns = setFrom(optionRaw, GRAMMAR_PRONOUNS);
    const answerPronouns = setFrom(answerRaw, GRAMMAR_PRONOUNS);
    const optionBeForms = setFrom(optionRaw, GRAMMAR_BE_FORMS);
    const answerBeForms = setFrom(answerRaw, GRAMMAR_BE_FORMS);
    const optionAuxiliaries = setFrom(optionRaw, GRAMMAR_AUXILIARIES);
    const answerAuxiliaries = setFrom(answerRaw, GRAMMAR_AUXILIARIES);

    if (!sameSet(optionPronouns, answerPronouns)) return true;
    if (!sameSet(optionBeForms, answerBeForms)) return true;
    if (!sameSet(optionAuxiliaries, answerAuxiliaries)) return true;
    if (sameTokenBag(optionRaw, answerRaw) && !sameSequence(optionRaw, answerRaw)) return true;
    return false;
  });
}

function isConciseContentSummary(option, answer, matched, reverseCoverage) {
  const optionRaw = rawWords(option);
  const answerRaw = rawWords(answer);
  const optionTokens = tokenSet(option);
  const optionPronouns = setFrom(optionRaw, GRAMMAR_PRONOUNS);
  if (!optionTokens.size || optionTokens.size > 8) return false;
  if (optionRaw.length >= answerRaw.length) return false;
  if (optionPronouns.size) return false;
  if (reverseCoverage < 0.99) return false;
  return matched >= Math.min(2, optionTokens.size);
}

function isComprehensionConciseMatch(option, answer) {
  const optionNorm = normalize(option);
  const answerNorm = normalize(answer);
  if (!optionNorm || !answerNorm) return false;
  if (optionNorm === answerNorm) return true;
  if (answerNorm.includes(optionNorm) && optionNorm.length >= 2) return true;

  const answerTokens = tokenSet(answer);
  const optionTokens = tokenSet(option);
  if (!answerTokens.size || !optionTokens.size) return false;
  let matched = 0;
  answerTokens.forEach((word) => { if (optionTokens.has(word)) matched += 1; });
  const reverseCoverage = matched / optionTokens.size;
  return isConciseContentSummary(option, answer, matched, reverseCoverage);
}

function optionMatchesAnswer(option, answer, context = {}) {
  const optionNorm = normalize(option);
  const answerNorm = normalize(answer);
  if (!optionNorm || !answerNorm) return false;
  if (optionNorm === answerNorm) return true;
  if (hasNumericConflict(option, answer)) return false;

  const comprehensionPath = isComprehensionPath(context.path);
  if (comprehensionPath && isComprehensionConciseMatch(option, answer)) return true;
  if (!comprehensionPath && hasNegationMismatch(option, answer)) return false;
  if (!comprehensionPath && hasBeAgreementMismatch(option, answer)) return false;
  if (!comprehensionPath && hasCompoundGrammarMismatch(option, answer)) return false;
  if (!comprehensionPath && hasShortOrderMismatch(option, answer)) return false;

  const grammarSensitiveShortAnswer = !comprehensionPath && isShortGrammarStructureSensitive(option, answer);
  if (grammarSensitiveShortAnswer) return false;

  const answerTokens = tokenSet(answer);
  const optionTokens = tokenSet(option);
  if (!answerTokens.size || !optionTokens.size) return false;

  let matched = 0;
  answerTokens.forEach((word) => { if (optionTokens.has(word)) matched += 1; });
  const coverage = matched / answerTokens.size;
  const reverseCoverage = matched / optionTokens.size;

  if (!comprehensionPath && hasGrammarCoreMismatch(option, answer)) return false;
  if (comprehensionPath && isConciseContentSummary(option, answer, matched, reverseCoverage)) return true;

  if (comprehensionPath && optionNorm.length > 3 && answerNorm.length > 3 && (optionNorm.includes(answerNorm) || answerNorm.includes(optionNorm))) return true;
  if (!comprehensionPath && optionNorm.length > 10 && answerNorm.length > 10 && answerTokens.size >= 3 && optionTokens.size >= 3 && (optionNorm.includes(answerNorm) || answerNorm.includes(optionNorm))) return true;

  if (comprehensionPath) {
    const optionIsConciseSummary = optionTokens.size <= 8 && reverseCoverage >= 0.99 && matched >= Math.min(2, optionTokens.size);
    if (optionIsConciseSummary) return true;
  }
  if (matched >= 2 && coverage >= 0.72 && reverseCoverage >= 0.45) return true;
  if (matched >= 2 && coverage >= 0.6 && reverseCoverage >= 0.6) return true;
  return false;
}

function escapeRegExp(value) { return value.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'); }

// Vazamento real = a resposta aparece como palavra(s) inteira(s) no enunciado.
// includes() cru marcava falso positivo por substring parcial
// (ex.: "reserva" dentro de "reservation").
function hasAnswerLeak(question, answer) {
  const questionNorm = normalize(question);
  const answerNorm = normalize(answer);
  if (!questionNorm || !answerNorm || answerNorm.length < 4) return false;
  return new RegExp(`\\b${escapeRegExp(answerNorm)}\\b`).test(questionNorm);
}

// Em reading/listening A1, perguntas binárias ("big or small?") e perguntas
// sobre uma fala citada ('Who says "my name is Luis"?') naturalmente contêm
// a resposta sem entregá-la. Só relaxa no caminho de comprehension; grammar/
// quiz continua estrito.
function isBinaryChoiceQuestion(question, answer) {
  if (!endsAsQuestion(question)) return false;
  const answerNorm = normalize(answer);
  if (!answerNorm || rawWords(answer).length > 4) return false;
  if (!/(^|\s)(or|ou)(\s|$)/.test(normalize(question))) return false;
  return normalize(question).includes(answerNorm);
}
function isQuotedStimulusLeak(question, answer) {
  const answerNorm = normalize(answer);
  if (!answerNorm) return false;
  const withoutQuotes = clean(question).replace(/[“"'«»‘’]([^“”"'«»‘’]*)[”"'«»‘’]/g, ' ');
  // A resposta só aparecia dentro da fala citada (estímulo), não no enunciado.
  return normalize(question).includes(answerNorm) && !normalize(withoutQuotes).includes(answerNorm);
}
function isSafeComprehensionLeak(question, answer) {
  return isBinaryChoiceQuestion(question, answer) || isQuotedStimulusLeak(question, answer);
}

function isStructuralGrammarDrill({ path, question, answer, options }) {
  const answerWords = rawWords(answer);
  const optionWords = options.flatMap(rawWords);
  const allOptionsShort = options.length >= 3 && options.every((option) => rawWords(option).length <= 2);
  const asksForStructure = /palavra estrutural|complete.*palavra|lacuna|estrutura|padr[aã]o|structural|grammar|transformationpractice/i.test(`${path} ${question}`);
  return allOptionsShort && asksForStructure && answerWords.some((word) => STRUCTURAL_WORDS.has(word)) && optionWords.some((word) => STRUCTURAL_WORDS.has(word));
}

const LESSON_DOMAIN_FIELDS = ['title', 'theme', 'topicContext', 'conceptExplanation', 'teacherOpening', 'mentalModel', 'realLifeUseCases', 'objectives', 'lessonRecap', 'mainText', 'readingPurpose', 'transcript', 'audioScript', 'listeningScript', 'keyWordsToHear', 'preReadingVocabulary', 'essentialWords', 'chunks', 'vocabulary', 'examples', 'miniDialogues', 'collocations', 'lexicalSets'];

function collectStrings(value, acc = []) {
  if (value === null || value === undefined) return acc;
  if (typeof value === 'string' || typeof value === 'number') { acc.push(String(value)); return acc; }
  if (Array.isArray(value)) { value.forEach((entry) => collectStrings(entry, acc)); return acc; }
  if (typeof value === 'object') { Object.values(value).forEach((entry) => collectStrings(entry, acc)); return acc; }
  return acc;
}

// Tokens do domínio real da aula (sem incluir as opções do próprio item,
// para não validar um distrator usando ele mesmo).
function lessonDomainTokens(lesson, item) {
  const parts = [];
  if (lesson && typeof lesson === 'object') LESSON_DOMAIN_FIELDS.forEach((field) => collectStrings(lesson[field], parts));
  if (item) { parts.push(getQuestion(item), getAnswer(item)); collectStrings(item.evidence, parts); collectStrings(item.explanation, parts); }
  return tokenSet(parts.join(' '));
}

function isOnTopicText(value, domainTokens) {
  const tokens = words(value);
  return tokens.length > 0 && tokens.every((token) => domainTokens.has(token));
}

function auditOptionGroup({ issues, area, path, question, answer, options, domainTokens = new Set() }) {
  const normalizedOptions = options.map(normalize);
  if (new Set(normalizedOptions).size !== normalizedOptions.length) addIssue(issues, { severity: 'P1', area, title: 'Alternativas duplicadas', impact: 'O aluno pode perceber exercício mal revisado ou ter menos alternativas reais.', evidence: `${path}: ${options.join(' | ')}`, recommendation: 'Garantir opções únicas e semanticamente distintas.' });

  const genericOptions = options.filter((option) => GENERIC_OPTION_PATTERNS.some((pattern) => pattern.test(option)));
  if (genericOptions.length) addIssue(issues, { severity: 'P1', area, title: 'Alternativas genéricas ou placeholder', impact: 'O exercício parece incompleto ou gerado sem curadoria.', evidence: `${path}: ${genericOptions.join(' | ')}`, recommendation: 'Substituir placeholders por alternativas reais, contextualizadas e plausíveis.' });

  const absurd = options.filter((option) => ABSURD_DISTRACTORS.has(normalize(option)));
  if (absurd.length >= 2) {
    const structuralGrammarDrill = isStructuralGrammarDrill({ path, question, answer, options });
    // Palavra "absurda" deixa de ser absurda quando a própria aula a ensina/
    // menciona e a resposta correta também é do tema (ex.: coffee/tea/water
    // numa aula "Food and drinks"/"Ordering food"). Só rebaixa para P2 quando
    // a resposta é on-topic E todas as opções sinalizadas estão no domínio
    // real da aula; distrator fora do tema continua P1.
    const contextuallyCoherent = isOnTopicText(answer, domainTokens) && absurd.every((option) => isOnTopicText(option, domainTokens));
    const downgrade = structuralGrammarDrill || contextuallyCoherent;
    addIssue(issues, {
      severity: downgrade ? 'P2' : 'P1',
      area,
      title: structuralGrammarDrill ? 'Distratores fracos em exercício estrutural' : (contextuallyCoherent ? 'Distratores simples, mas dentro do tema' : 'Distratores absurdos ou fáceis demais'),
      impact: downgrade ? 'O aluno ainda pratica o conteúdo da aula; os distratores poderiam ser mais desafiadores.' : 'O aluno pode acertar por eliminação sem entender a aula.',
      evidence: `${path}: ${options.join(' | ')}`,
      recommendation: downgrade ? 'Opcional: usar distratores mais próximos do nível CEFR; não bloqueia o fluxo.' : 'Trocar por distratores próximos do tema e do nível CEFR.',
    });
  }

  if (answer) {
    const matching = options.filter((option) => optionMatchesAnswer(option, answer, { path, question }));
    if (matching.length === 0) addIssue(issues, { severity: 'P0', area, title: 'Resposta correta não aparece nas alternativas', impact: 'O aluno pode ser penalizado mesmo escolhendo a melhor opção disponível.', evidence: `${path}: resposta=${answer}; opções=${options.join(' | ')}`, recommendation: 'Adicionar a resposta correta entre as opções ou revisar o answerKey.' });
    if (matching.length > 1) addIssue(issues, { severity: 'P1', area, title: 'Mais de uma alternativa parece correta', impact: 'O exercício fica ambíguo e pode frustrar o aluno.', evidence: `${path}: resposta=${answer}; matches=${matching.join(' | ')}`, recommendation: 'Deixar apenas uma resposta claramente correta ou reformular a pergunta.' });
  }

  const optionLengths = options.map((option) => option.length).filter(Boolean);
  const max = Math.max(...optionLengths);
  const min = Math.min(...optionLengths);
  if (options.length >= 3 && min > 0 && max / min >= 5) addIssue(issues, { severity: 'P2', area, title: 'Tamanho das alternativas muito desigual', impact: 'A resposta pode ficar óbvia pelo tamanho, não pelo conhecimento.', evidence: `${path}: ${options.join(' | ')}`, recommendation: 'Equilibrar comprimento e nível de detalhe das alternativas.' });

  if (question && answer && hasAnswerLeak(question, answer) && !(isComprehensionPath(path) && isSafeComprehensionLeak(question, answer))) addIssue(issues, { severity: 'P1', area, title: 'Pergunta parece entregar a resposta', impact: 'O aluno não precisa raciocinar para responder.', evidence: `${path}: pergunta=${question}; resposta=${answer}`, recommendation: 'Reformular a pergunta para não conter a resposta literal.' });
}

function auditExerciseObject({ lesson, item, path }) {
  const issues = [];
  const lessonId = lesson?.id || 'unknown-lesson';
  const area = `Exercício · ${lessonId}`;
  const question = getQuestion(item);
  const answer = getAnswer(item);
  const options = getOptions(item);
  const feedback = getFeedback(item);
  const lessonContext = clean([lesson?.title, lesson?.objective, lesson?.teacherOpening, lesson?.conceptExplanation, lesson?.mainText, lesson?.readingPurpose, lesson?.listeningScript, lesson?.lessonRecap]);

  if (question.length < 8) addIssue(issues, { severity: 'P2', area, title: 'Pergunta curta demais', impact: 'Pode indicar exercício raso ou sem contexto suficiente.', evidence: `${path}: ${question || 'sem pergunta'}`, recommendation: 'Escrever enunciado claro, específico e conectado à aula.' });
  if (!answer && options.length >= 2) addIssue(issues, { severity: 'P1', area, title: 'Exercício com alternativas mas sem resposta esperada clara', impact: 'O sistema pode não avaliar corretamente o aluno.', evidence: `${path}: ${question}`, recommendation: 'Adicionar `answer`, `expected`, `correct` ou campo equivalente.' });
  if (options.length) auditOptionGroup({ issues, area, path, question, answer, options, domainTokens: lessonDomainTokens(lesson, item) });
  if (feedback && (feedback.length < 12 || GENERIC_FEEDBACK_PATTERNS.some((pattern) => pattern.test(feedback)))) addIssue(issues, { severity: 'P2', area, title: 'Feedback genérico demais', impact: 'O aluno não entende por que errou ou acertou.', evidence: `${path}: ${feedback}`, recommendation: 'Explicar a regra, evidência textual ou raciocínio da resposta.' });
  if (lessonContext && question && lexicalOverlap(question, lessonContext) === 0 && options.length >= 2) addIssue(issues, { severity: 'P2', area, title: 'Pergunta com baixa conexão lexical com a aula', impact: 'Pode ser um exercício fora do tema ou genérico demais.', evidence: `${path}: ${question}`, recommendation: 'Verificar se o exercício cobra algo realmente ensinado nesta aula.' });
  return issues;
}

// Speaking é prática ativa mesmo sem options/answer: repetir, substituir,
// responder, montar resposta, gravar, falar. Campos só reflexivos
// (speakingChecklist) NÃO contam como prática principal.
const SPEAKING_ACTION_FIELDS = ['repeatAfterMe', 'substitutionDrills', 'questionAnswerDrills', 'buildYourAnswer', 'guidedSpeaking', 'recordingTasks', 'freeSpeaking', 'modelPhrases', 'pronunciationChunks'];
const SPEAKING_TEXT_KEYS = ['instruction', 'prompt', 'text', 'sentence', 'phrase', 'model', 'question', 'title'];

function speakingItemHasText(item) {
  if (typeof item === 'string' || typeof item === 'number') return clean(item).length >= 3;
  if (!item || typeof item !== 'object' || Array.isArray(item)) return false;
  return SPEAKING_TEXT_KEYS.some((key) => clean(item[key]).length >= 3);
}

function hasActiveSpeakingPractice(lesson) {
  if (!lesson || (lesson.pillar !== 'speaking' && lesson.type !== 'speaking')) return false;
  return SPEAKING_ACTION_FIELDS.some((field) => Array.isArray(lesson[field]) && lesson[field].some(speakingItemHasText));
}

// Writing é prática ativa quando o aluno escreve/revisa/transforma/substitui:
// draftTask, revisionTask, finalVersionTask, guidedSubstitution. modelText,
// modelTextBreakdown, usefulSentences e checklists (exemplo/explicação/
// reflexivo) NÃO contam sozinhos como prática principal.
const WRITING_ACTION_FIELDS = ['draftTask', 'revisionTask', 'finalVersionTask', 'guidedSubstitution'];

function hasActiveWritingPractice(lesson) {
  if (!lesson || (lesson.pillar !== 'writing' && lesson.type !== 'writing')) return false;
  return WRITING_ACTION_FIELDS.some((field) => {
    const value = lesson[field];
    return Array.isArray(value) ? value.some(speakingItemHasText) : speakingItemHasText(value);
  });
}

// Bloco 7A — prática aberta/avançada já presente no objeto final (pós-7B).
// Conta SÓ como existência de prática (gate "Nenhum exercício detectado");
// não entra em collectExerciseObjects para não disparar auditoria de MCQ
// (que geraria P0 "Resposta correta não aparece" para itens abertos sem
// answer/options). Critério estrito: title/objective sozinhos NÃO contam.
const ACTIVE_PRACTICE_KEYS = ['instruction', 'prompt', 'task', 'question', 'sentence', 'phrase', 'text'];

function isActivePracticeText(item) {
  if (typeof item === 'string' || typeof item === 'number') return clean(item).length >= 8;
  if (!item || typeof item !== 'object' || Array.isArray(item)) return false;
  return ACTIVE_PRACTICE_KEYS.some((key) => clean(item[key]).length >= 3);
}

// Reading/Listening: pergunta aberta com orientação clara (não MCQ).
function isOpenComprehensionItem(item) {
  if (!item || typeof item !== 'object' || Array.isArray(item)) return false;
  const question = clean(item.question || item.prompt);
  if (question.length < 8) return false;
  // Se já tem answer/options ≥2, é MCQ clássico — não é open.
  if (clean(item.answer).length >= 1) return false;
  if (Array.isArray(item.options) && item.options.length >= 2) return false;
  if (String(item.type || '').toLowerCase() === 'open') return true;
  if (clean(item.guidance).length >= 3) return true;
  if (clean(item.expected).length >= 3) return true;
  if (clean(item.rubric).length >= 3) return true;
  if (typeof item.minWords === 'number' && item.minWords > 0) return true;
  return false;
}
// Tipos de comprehension não-MCQ adicionais (detail/inference/analysis)
// só contam quando há contexto textual suficiente no nível da aula —
// passage/mainText/inputText reais. Item solto não conta.
const OPEN_COMPREHENSION_TYPES = new Set(['detail', 'inference', 'analysis']);
function lessonHasTextualContext(lesson) {
  return [lesson?.passage, lesson?.mainText, lesson?.inputText, lesson?.transcript, lesson?.audioScript]
    .some((v) => typeof v === 'string' && v.trim().length >= 200);
}
function isTypedOpenComprehensionItem(item) {
  if (!item || typeof item !== 'object' || Array.isArray(item)) return false;
  const question = clean(item.question || item.prompt);
  if (question.length < 8) return false;
  if (clean(item.answer).length >= 1) return false;
  if (Array.isArray(item.options) && item.options.length >= 2) return false;
  return OPEN_COMPREHENSION_TYPES.has(String(item.type || '').toLowerCase());
}
function hasOpenComprehensionPractice(lesson) {
  if (!lesson) return false;
  const pillar = lesson.pillar || lesson.type;
  if (pillar !== 'reading' && pillar !== 'listening') return false;
  const fields = ['comprehensionQuestions', 'evidenceQuestions'];
  if (fields.some((field) => Array.isArray(lesson[field]) && lesson[field].some(isOpenComprehensionItem))) return true;
  if (!lessonHasTextualContext(lesson)) return false;
  return fields.some((field) => Array.isArray(lesson[field]) && lesson[field].some(isTypedOpenComprehensionItem));
}

// Writing avançado: writingTasks[].task = instrução de produção real
// (escrever/transformar/produzir). writingModel/grammarAnnotations/
// writingChecklist passivos NÃO contam.
function isWritingTaskItem(item) {
  if (typeof item === 'string') return item.trim().length >= 8;
  if (!item || typeof item !== 'object' || Array.isArray(item)) return false;
  return ['task', 'instruction', 'prompt'].some((key) => clean(item[key]).length >= 8);
}
function hasAdvancedWritingPractice(lesson) {
  if (!lesson || (lesson.pillar !== 'writing' && lesson.type !== 'writing')) return false;
  return Array.isArray(lesson.writingTasks) && lesson.writingTasks.some(isWritingTaskItem);
}

// Speaking avançado: warmUp ativo + guidedPractice com steps/tasks reais.
// Bloco {title, steps:[...]} só conta se steps tiver texto ativo; título
// sozinho não basta. speakingChecklist permanece excluído (reflexivo).
function hasActiveStepsArray(value) {
  return Array.isArray(value) && value.some(isActivePracticeText);
}
function isGuidedPracticeBlock(item) {
  if (typeof item === 'string') return item.trim().length >= 8;
  if (!item || typeof item !== 'object' || Array.isArray(item)) return false;
  if (hasActiveStepsArray(item.steps)) return true;
  if (hasActiveStepsArray(item.tasks)) return true;
  return isActivePracticeText(item);
}
function hasAdvancedSpeakingPractice(lesson) {
  if (!lesson || (lesson.pillar !== 'speaking' && lesson.type !== 'speaking')) return false;
  if (Array.isArray(lesson.warmUp) && lesson.warmUp.some(isActivePracticeText)) return true;
  if (Array.isArray(lesson.guidedPractice) && lesson.guidedPractice.some(isGuidedPracticeBlock)) return true;
  return false;
}

// Listening staged: listeningTasks: [{stage, tasks:[...]}] — só conta se
// alguma stage tiver tasks com texto ativo. audioMetadata/transcript não
// contam.
function isStagedListeningItem(item) {
  if (!item || typeof item !== 'object' || Array.isArray(item)) return false;
  if (hasActiveStepsArray(item.tasks)) return true;
  return false;
}
function hasStagedListeningPractice(lesson) {
  if (!lesson || (lesson.pillar !== 'listening' && lesson.type !== 'listening')) return false;
  return Array.isArray(lesson.listeningTasks) && lesson.listeningTasks.some(isStagedListeningItem);
}

function hasAnyAdvancedActivePractice(lesson) {
  return hasOpenComprehensionPractice(lesson)
    || hasAdvancedWritingPractice(lesson)
    || hasAdvancedSpeakingPractice(lesson)
    || hasStagedListeningPractice(lesson);
}

export function auditLessonExercisesDeep(lesson) {
  const exercises = collectExerciseObjects(lesson);
  const issues = [];
  if (!exercises.length) {
    if (hasActiveSpeakingPractice(lesson) || hasActiveWritingPractice(lesson) || hasAnyAdvancedActivePractice(lesson)) return issues;
    addIssue(issues, { severity: 'P1', area: `Aula ${lesson?.id || 'unknown-lesson'}`, title: 'Nenhum exercício detectado na aula ready', impact: 'A aula pode ensinar sem exigir prática ativa do aluno.', recommendation: 'Adicionar exercícios, tarefas de tentativa ou perguntas avaliáveis.' });
    return issues;
  }
  exercises.forEach(({ item, path }) => issues.push(...auditExerciseObject({ lesson, item, path })));
  return issues;
}

export function collectLessonExerciseStats(lesson) {
  const exercises = collectExerciseObjects(lesson);
  return { lessonId: lesson?.id || '', exerciseCount: exercises.length, choiceCount: exercises.filter(({ item }) => getOptions(item).length >= 2).length, openAnswerCount: exercises.filter(({ item }) => !getOptions(item).length && getAnswer(item)).length };
}
