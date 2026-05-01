function clean(value) {
  return String(value ?? '').trim();
}

function ensureArray(value) {
  return Array.isArray(value) ? value : [];
}

function normalizeOption(value) {
  if (typeof value === 'string' || typeof value === 'number') return clean(value);
  if (!value || typeof value !== 'object') return '';
  return clean(value.text ?? value.label ?? value.option ?? value.value ?? value.answer ?? value.content ?? '');
}

function normalizeExercise(item, index = 0) {
  const options = ensureArray(item?.options || item?.choices || item?.alternatives).map(normalizeOption).filter(Boolean);
  return {
    question: clean(item?.question || item?.prompt || item?.instruction || `Questão ${index + 1}`),
    options,
    answer: clean(item?.answer || item?.expectedAnswer || item?.correctAnswer || item?.solution || options[0] || ''),
    explanation: clean(item?.explanation || item?.feedback || 'Revise o conteúdo da aula para confirmar a resposta.'),
    skill: clean(item?.skill || item?.type || ''),
    source: clean(item?.source || 'gemini'),
    difficulty: clean(item?.difficulty || ''),
  };
}

function dedupeExercises(exercises) {
  const seen = new Set();
  return exercises.filter((exercise) => {
    const key = clean(exercise.question).toLowerCase().replace(/\s+/g, ' ');
    if (!key || seen.has(key)) return false;
    seen.add(key);
    return true;
  });
}

function getLevelBand(level = 'A1') {
  const normalized = clean(level).toUpperCase();
  if (normalized === 'A1') return 'beginner';
  if (normalized === 'A2') return 'elementary';
  if (normalized.startsWith('B')) return 'intermediate';
  return 'advanced';
}

function splitSentences(text) {
  return clean(text)
    .replace(/\s+/g, ' ')
    .split(/(?<=[.!?])\s+/)
    .map((sentence) => sentence.trim())
    .filter((sentence) => sentence.length >= 8 && sentence.length <= 120);
}

function pickShortSentence(sentences, fallback = 'My name is Leo.') {
  return sentences.find((sentence) => sentence.split(/\s+/).length <= 6) || sentences[0] || fallback;
}

function wordStartsWith(word, letter) {
  return clean(word).toLowerCase().startsWith(clean(letter).toLowerCase());
}

function firstLetter(word) {
  const match = clean(word).match(/[A-Za-z]/);
  return match ? match[0].toUpperCase() : 'A';
}

function getVocabularyWords(lesson) {
  return ensureArray(lesson?.vocabulary)
    .map((item) => ({ word: clean(item?.word || item?.term), meaning: clean(item?.meaning || item?.translation || item?.definition), example: clean(item?.example || item?.sentence) }))
    .filter((item) => item.word);
}

function getTopicWords(lesson) {
  const vocab = getVocabularyWords(lesson);
  const fromVocab = vocab.map((item) => item.word).filter((word) => /^[A-Za-z]{2,12}$/.test(word));
  const transcriptWords = clean(lesson?.listeningText)
    .split(/[^A-Za-z]+/)
    .filter((word) => word.length >= 3 && word.length <= 9);
  return Array.from(new Set([...fromVocab, ...transcriptWords])).slice(0, 24);
}

function makeOptions(correct, distractors = []) {
  const normalizedCorrect = clean(correct);
  const unique = [normalizedCorrect, ...distractors.map(clean).filter(Boolean)]
    .filter((item, index, array) => item && array.findIndex((candidate) => candidate.toLowerCase() === item.toLowerCase()) === index)
    .slice(0, 4);
  while (unique.length < 3) unique.push(['Yes', 'No', 'Maybe', 'I don\'t know'][unique.length] || `Option ${unique.length + 1}`);
  return unique;
}

function exercise(question, options, answer, explanation, extra = {}) {
  return {
    question: clean(question),
    options: ensureArray(options).map(clean).filter(Boolean),
    answer: clean(answer),
    explanation: clean(explanation),
    source: 'autofill-adaptive',
    difficulty: extra.difficulty || 'easy',
    skill: extra.skill || '',
    inputMode: extra.inputMode || undefined,
    audioPrompt: extra.audioPrompt || undefined,
  };
}

function spelling(word) {
  return clean(word).toUpperCase().split('').join('-');
}

function buildListeningExercises({ lesson, targetCount, levelBand }) {
  const transcript = clean(lesson?.listeningText);
  const sentences = splitSentences(transcript);
  const vocab = getVocabularyWords(lesson);
  const words = getTopicWords(lesson);
  const first = words[0] || 'map';
  const second = words.find((word) => firstLetter(word) !== firstLetter(first)) || 'pen';
  const third = words.find((word) => ![first.toLowerCase(), second.toLowerCase()].includes(word.toLowerCase())) || 'sun';
  const shortSentence = pickShortSentence(sentences, 'My name is Leo.');
  const veryShort = levelBand === 'beginner' ? shortSentence.split(/\s+/).slice(0, 4).join(' ') : shortSentence;
  const firstVocab = vocab[0] || { word: first, meaning: 'palavra da aula', example: `${first} is in the audio.` };

  const bank = [
    exercise('Qual é o assunto principal do áudio?', makeOptions('nomes, letras e sons iniciais', ['rotina de trabalho', 'comida e restaurantes', 'viagem longa']), 'nomes, letras e sons iniciais', 'Essa pergunta treina escuta global: entender a ideia principal antes dos detalhes.', { skill: 'listening_global' }),
    exercise(`Qual é a primeira letra de “${first}”?`, makeOptions(firstLetter(first), ['A', 'B', 'S', 'T'].filter((letter) => letter !== firstLetter(first))), firstLetter(first), `A palavra “${first}” começa com ${firstLetter(first)}.`, { skill: 'initial_sound' }),
    exercise(`Qual palavra começa com ${firstLetter(second)}?`, makeOptions(second, [first, third, 'name']), second, `“${second}” começa com a letra ${firstLetter(second)}.`, { skill: 'initial_sound' }),
    exercise(`O que significa “${firstVocab.word}”?`, makeOptions(firstVocab.meaning || 'palavra da aula', ['frase', 'pergunta', 'resposta']), firstVocab.meaning || 'palavra da aula', 'Essa questão revisa vocabulário do áudio com significado em português.', { skill: 'vocabulary' }),
    exercise(`Ouça e digite as letras de “${first}”.`, [], spelling(first), `O objetivo é produzir o spelling, não apenas reconhecer a alternativa pronta.`, { skill: 'spelling_write', inputMode: 'write', audioPrompt: spelling(first) }),
    exercise(`Ouça e escreva a palavra curta.`, [], first, `Ditado curto é adequado para A1: primeiro palavras, depois frases maiores.`, { skill: 'listen_write_word', inputMode: 'listen_write', audioPrompt: first }),
    exercise(`Corrija o spelling: ${spelling(first).replace(/[A-Z]$/, 'X')}`, [], spelling(first), `Compare letra por letra e corrija apenas o final.`, { skill: 'correct_mistake', inputMode: 'write' }),
    exercise(`Digite o que você ouviu: “${veryShort}”`, [], veryShort, 'No começo do A1, o ditado deve ser curto para treinar sem frustração.', { skill: 'listen_write_sentence', inputMode: 'listen_write', audioPrompt: veryShort }),
    exercise('Fale seu nome e soletre em inglês.', [], 'Resposta oral pessoal.', 'Essa prática aplica o objetivo da aula ao seu nome real.', { skill: 'speaking_transfer', inputMode: 'speak' }),
    exercise(`Verdadeiro ou falso: “${first}” começa com ${firstLetter(first)}.`, ['Verdadeiro', 'Falso'], 'Verdadeiro', 'A afirmação confere a primeira letra da palavra.', { skill: 'true_false' }),
  ];

  return bank.slice(0, targetCount);
}

function buildGrammarExercises({ lesson, targetCount, levelBand }) {
  const title = clean(lesson?.title || lesson?.focus || 'a estrutura da aula');
  const sentences = splitSentences(ensureArray(lesson?.sections).map((section) => `${section?.title || ''}. ${section?.content || ''}`).join(' '));
  const baseSentence = pickShortSentence(sentences, 'I am a student.');
  const bank = [
    exercise('Escolha a frase correta.', ['I am a student.', 'I is a student.', 'I be a student.'], 'I am a student.', 'Com “I”, usamos “am”.', { skill: 'form_choice' }),
    exercise('Complete: She ___ a teacher.', ['is', 'am', 'are'], 'is', 'Com “she”, usamos “is”.', { skill: 'fill_blank' }),
    exercise('Corrija a frase: He are happy.', [], 'He is happy.', 'Com “he”, usamos “is”, não “are”.', { skill: 'correct_mistake', inputMode: 'write' }),
    exercise('Transforme em pergunta: You are ready.', [], 'Are you ready?', 'Em perguntas com “to be”, o verbo vem antes do sujeito.', { skill: 'transform', inputMode: 'write' }),
    exercise(`Explique em português quando usar o ponto da aula: ${title}.`, [], 'Resposta pessoal com a regra da aula.', 'Explicar a regra ajuda a confirmar que você entendeu, não só decorou.', { skill: 'explain_rule', inputMode: 'write' }),
    exercise(`Crie uma frase curta parecida com: ${baseSentence}`, [], baseSentence, 'Produção curta fixa o uso real da estrutura.', { skill: 'production', inputMode: 'write' }),
  ];
  while (bank.length < targetCount) {
    const number = bank.length + 1;
    bank.push(exercise(`Prática ${number}: complete uma frase usando a regra estudada.`, [], 'Resposta pessoal correta usando a regra.', 'Essa questão reforça a regra com produção ativa.', { skill: 'production', inputMode: 'write', difficulty: levelBand === 'beginner' ? 'easy' : 'medium' }));
  }
  return bank.slice(0, targetCount);
}

function buildReadingExercises({ lesson, targetCount, levelBand }) {
  const text = clean(lesson?.listeningText) || ensureArray(lesson?.sections).map((section) => section?.content).join(' ');
  const sentences = splitSentences(text);
  const firstSentence = pickShortSentence(sentences, 'Ana studies English every day.');
  const vocab = getVocabularyWords(lesson);
  const firstVocab = vocab[0] || { word: 'study', meaning: 'estudar' };
  const bank = [
    exercise('Qual é a melhor ideia principal do texto?', makeOptions('entender o assunto geral do texto', ['decorar palavras sem contexto', 'traduzir palavra por palavra', 'ignorar os detalhes']), 'entender o assunto geral do texto', 'A primeira leitura deve buscar a ideia principal.', { skill: 'main_idea' }),
    exercise(`No contexto da aula, o que significa “${firstVocab.word}”?`, makeOptions(firstVocab.meaning || 'palavra do texto', ['pergunta', 'resposta', 'erro']), firstVocab.meaning || 'palavra do texto', 'Vocabulário deve ser entendido dentro do texto.', { skill: 'vocabulary_context' }),
    exercise('Copie uma frase curta do texto.', [], firstSentence, 'Copiar uma frase curta ajuda a perceber ordem das palavras.', { skill: 'copy_sentence', inputMode: 'write' }),
    exercise('Escreva em português o que você entendeu do texto.', [], 'Resposta pessoal sobre a ideia principal.', 'Essa questão verifica compreensão real, não memorização.', { skill: 'summary_pt', inputMode: 'write' }),
  ];
  while (bank.length < targetCount) {
    const sentence = sentences[bank.length % Math.max(sentences.length, 1)] || firstSentence;
    bank.push(exercise(`O que esta frase comunica? “${sentence}”`, [], 'Resposta pessoal coerente com a frase.', 'Volte ao trecho e explique a ideia com suas palavras.', { skill: 'detail', inputMode: levelBand === 'beginner' ? 'write' : 'write' }));
  }
  return bank.slice(0, targetCount);
}

function buildWritingExercises({ lesson, targetCount, levelBand }) {
  const vocab = getVocabularyWords(lesson).slice(0, 6);
  const word = vocab[0]?.word || 'name';
  const bank = [
    exercise(`Escreva uma frase curta usando “${word}”.`, [], `I use ${word}.`, 'No A1, comece com frases curtas e claras.', { skill: 'sentence_writing', inputMode: 'write' }),
    exercise('Escolha a frase com melhor pontuação.', ['My name is Leo.', 'my name is Leo', 'My name is leo'], 'My name is Leo.', 'Frases em inglês começam com maiúscula e terminam com ponto.', { skill: 'punctuation' }),
    exercise('Corrija a frase: i am a student', [], 'I am a student.', 'Use I maiúsculo e ponto final.', { skill: 'correct_mistake', inputMode: 'write' }),
    exercise('Escreva uma resposta curta sobre você.', [], 'My name is ...', 'Produção pessoal aumenta retenção.', { skill: 'personal_response', inputMode: 'write' }),
  ];
  while (bank.length < targetCount) {
    bank.push(exercise('Escreva uma frase simples usando uma palavra da aula.', [], 'Resposta pessoal em inglês simples.', 'O foco é escrever pouco, mas com clareza.', { skill: 'production', inputMode: 'write', difficulty: levelBand === 'beginner' ? 'easy' : 'medium' }));
  }
  return bank.slice(0, targetCount);
}

function buildSpeakingExercises({ lesson, targetCount }) {
  const sentences = splitSentences(clean(lesson?.listeningText) || ensureArray(lesson?.sections).map((section) => section?.content).join(' '));
  const shortSentence = pickShortSentence(sentences, 'My name is Leo.');
  const bank = [
    exercise(`Repita em voz alta: ${shortSentence}`, [], shortSentence, 'Copie ritmo e pronúncia antes de criar frases próprias.', { skill: 'repeat', inputMode: 'speak' }),
    exercise('Responda em voz alta: What is your name?', [], 'My name is ...', 'Resposta oral curta e útil para A1.', { skill: 'personal_answer', inputMode: 'speak' }),
    exercise('Escolha a melhor resposta para “Hello!”', ['Hi!', 'Book.', 'Green.'], 'Hi!', 'Cumprimentos básicos exigem resposta curta e natural.', { skill: 'conversation_choice' }),
    exercise('Fale uma frase usando uma palavra da aula.', [], 'Resposta oral pessoal.', 'Usar a palavra em fala própria ajuda a fixar.', { skill: 'production', inputMode: 'speak' }),
  ];
  while (bank.length < targetCount) bank.push(exercise('Grave uma resposta curta sobre o tema da aula.', [], 'Resposta oral pessoal.', 'Prática oral curta reduz medo de falar.', { skill: 'speaking_production', inputMode: 'speak' }));
  return bank.slice(0, targetCount);
}

export function buildAdaptiveExercises({ lesson, lessonType = '', minCount = 10, level = '', existingExercises = [] } = {}) {
  const type = clean(lessonType || lesson?.type || 'reading').toLowerCase();
  const resolvedLevel = clean(level || lesson?.level || 'A1');
  const levelBand = getLevelBand(resolvedLevel);
  const normalizedExisting = dedupeExercises(ensureArray(existingExercises.length ? existingExercises : lesson?.exercises).map(normalizeExercise));
  const missing = Math.max(0, Number(minCount || 0) - normalizedExisting.length);
  if (!missing) {
    return {
      exercises: normalizedExisting,
      added: 0,
      target: minCount,
      levelBand,
      type,
    };
  }

  const context = { lesson, targetCount: missing, levelBand };
  let additions = [];
  if (type === 'listening') additions = buildListeningExercises(context);
  else if (type === 'grammar') additions = buildGrammarExercises(context);
  else if (type === 'writing') additions = buildWritingExercises(context);
  else if (type === 'speaking') additions = buildSpeakingExercises(context);
  else additions = buildReadingExercises(context);

  const merged = dedupeExercises([...normalizedExisting, ...additions]).slice(0, Math.max(minCount, normalizedExisting.length));
  return {
    exercises: merged,
    added: Math.max(0, merged.length - normalizedExisting.length),
    target: minCount,
    levelBand,
    type,
  };
}

export function sanitizeExerciseBlock({ data, lesson, lessonType, minCount, level } = {}) {
  const rawExercises = ensureArray(data?.exercises).map(normalizeExercise).filter((item) => item.question && item.answer);
  const fixed = rawExercises.map((item) => {
    const options = ensureArray(item.options).filter(Boolean);
    if (options.length && !options.some((option) => option.toLowerCase() === item.answer.toLowerCase())) {
      return { ...item, options: makeOptions(item.answer, options).slice(0, Math.max(3, options.length)) };
    }
    return item;
  });
  const result = buildAdaptiveExercises({ lesson: { ...lesson, exercises: fixed }, lessonType, minCount, level, existingExercises: fixed });
  return {
    exercises: result.exercises,
    added: result.added,
    target: result.target,
    levelBand: result.levelBand,
    type: result.type,
  };
}
