import { emptyResult, ANALYSIS_STATUS, CEFR_FIT, ANALYSIS_SOURCE } from './studentAnswerAnalysisTypes.js';

function clean(v) { return String(v ?? '').trim(); }
function wc(text) { return clean(text).split(/\s+/).filter(Boolean).length; }
function norm(text) {
  return clean(text).toLowerCase()
    .normalize('NFD').replace(/[̀-ͯ]/g, '')
    .replace(/[^a-z0-9\s]/gi, ' ')
    .replace(/\s+/g, ' ');
}

export function evaluateWritingLocally({ studentText = '', expectedAnswer = '', level = 'A1', skill = '' } = {}) {
  const text = clean(studentText);
  const words = wc(text);
  const issues = [];
  const strengths = [];

  if (!text) {
    return {
      ...emptyResult({ pillar: 'writing', skill, level }),
      feedbackPt: 'Nenhum texto escrito. Escreva sua resposta antes de analisar.',
      issues: ['Texto vazio.'],
    };
  }

  if (/^[A-Z]/.test(text)) strengths.push('Começa com letra maiúscula.');
  else issues.push('Comece a frase com letra maiúscula.');

  if (/[.!?]$/.test(text)) strengths.push('Pontuação final presente.');
  else issues.push('Termine com pontuação (. ! ?).');

  if (words < 3) {
    issues.push('Resposta muito curta. Escreva pelo menos uma frase completa.');
  } else if (words >= 8) {
    strengths.push('Boa extensão de texto.');
  }

  if (/\b(i|you|he|she|we|they|it|the|a|an|my|your|his|her|our|their)\b/i.test(text)) {
    strengths.push('Sujeito presente.');
  } else {
    issues.push('Verifique se a frase tem sujeito (I, you, he, she, we...).');
  }

  if (/\b(am|is|are|was|were|have|has|do|does|can|will|would|go|like|want|need|work|live|study|eat|drink)\b/i.test(text)) {
    strengths.push('Verbo identificado.');
  } else {
    issues.push('Parece faltar um verbo. Use am, is, are ou outro verbo básico.');
  }

  // Flagrant agreement errors
  if (/\bi are\b/i.test(text)) issues.push('Use "I am", não "I are".');
  if (/\b(he|she|it) are\b/i.test(text)) issues.push('Use "he/she/it is", não "he/she/it are".');
  if (/\b(we|they|you) is\b/i.test(text)) issues.push('Use "we/they/you are", não "is".');

  let score = null;
  let cefrFit = CEFR_FIT.ok;

  if (expectedAnswer) {
    const normExp = norm(expectedAnswer);
    const normStu = norm(text);
    const expWords = normExp.split(' ').filter((w) => w.length > 2);
    const overlap = expWords.filter((w) => normStu.includes(w)).length;
    const total = expWords.length || 1;
    score = Math.round((overlap / total) * 100);
    if (score < 30) cefrFit = CEFR_FIT.tooHard;
  }

  const baseScore = issues.length === 0 ? 85 : issues.length === 1 ? 72 : issues.length === 2 ? 58 : 42;
  if (score === null) score = baseScore;

  const feedbackParts = [];
  if (strengths.length) feedbackParts.push(`Pontos positivos: ${strengths.join(' ')}`);
  if (issues.length) feedbackParts.push(`Atenção: ${issues.join(' ')}`);
  else feedbackParts.push('Boa tentativa! Continue.');

  return {
    ...emptyResult({ pillar: 'writing', skill, level }),
    status: issues.length === 0 ? ANALYSIS_STATUS.success : ANALYSIS_STATUS.fallback,
    score,
    cefrFit,
    feedbackPt: feedbackParts.join('\n'),
    strengths,
    issues,
    nextDrill: issues.length
      ? 'Corrija os pontos acima e releia antes de avançar.'
      : 'Boa. Avance para a próxima etapa.',
    source: ANALYSIS_SOURCE.local,
  };
}

export function evaluateSpeakingLocally({ studentText = '', azureResult = null, level = 'A1', skill = '' } = {}) {
  const base = emptyResult({ pillar: 'speaking', skill, level });

  if (azureResult) {
    const accuracy = azureResult.accuracyScore ?? 0;
    const fluency = azureResult.fluencyScore ?? 0;
    const completeness = azureResult.completenessScore ?? 0;
    const pronunciation = azureResult.pronunciationScore ?? 0;
    const divisor = [accuracy, fluency, completeness, pronunciation].filter((s) => s > 0).length || 1;
    const score = Math.round((accuracy + fluency + completeness + pronunciation) / divisor);

    const weakWords = Array.isArray(azureResult.words)
      ? azureResult.words.filter((w) => (w.accuracyScore ?? 100) < 60).map((w) => w.word).slice(0, 3)
      : [];

    const issues = [];
    const strengths = [];

    if (pronunciation >= 75) strengths.push('Boa pronúncia geral.');
    else issues.push(`Pronúncia precisa de prática (score: ${Math.round(pronunciation)}).`);

    if (fluency >= 70) strengths.push('Fluência adequada.');
    else issues.push('Fale de forma mais contínua, sem pausas longas.');

    if (weakWords.length) issues.push(`Palavras para praticar mais: ${weakWords.join(', ')}.`);

    return {
      ...base,
      status: ANALYSIS_STATUS.success,
      score,
      feedbackPt: [`Score: ${score}/100.`, ...strengths, ...issues].join(' '),
      strengths,
      issues,
      nextDrill: weakWords.length
        ? `Pratique devagar: ${weakWords.join(', ')}.`
        : 'Tente repetir a frase mais rápido.',
      source: ANALYSIS_SOURCE.azure,
    };
  }

  const text = clean(studentText);
  if (!text) {
    return {
      ...base,
      feedbackPt: 'Nenhuma fala registrada. Use o microfone ou escreva o que falou como fallback.',
      issues: ['Sem fala registrada.'],
    };
  }

  const words = wc(text);
  return {
    ...base,
    score: words >= 5 ? 60 : 40,
    feedbackPt: words >= 5
      ? 'Resposta registrada. Para feedback real de pronúncia, use o microfone com Azure Speech.'
      : 'Resposta muito curta. Tente falar pelo menos uma frase completa.',
    issues: words < 5 ? ['Resposta muito curta.'] : [],
    nextDrill: 'Repita a frase em voz alta 3 vezes antes de avançar.',
    source: ANALYSIS_SOURCE.local,
  };
}

export function evaluateGenericLocally({ studentText = '', expectedAnswer = '', pillar = 'grammar', skill = '', level = 'A1' } = {}) {
  const base = emptyResult({ pillar, skill, level });
  const text = clean(studentText);

  if (!text) {
    return { ...base, feedbackPt: 'Nenhuma resposta registrada.', issues: ['Campo vazio.'] };
  }

  if (expectedAnswer) {
    const normExp = norm(expectedAnswer);
    const normStu = norm(text);
    const matches = normStu === normExp || normStu.includes(normExp) || normExp.includes(normStu);

    if (matches) {
      return {
        ...base,
        status: ANALYSIS_STATUS.success,
        score: 90,
        cefrFit: CEFR_FIT.ok,
        feedbackPt: 'Resposta correta!',
        strengths: ['Corresponde ao modelo esperado.'],
        nextDrill: 'Boa. Avance.',
        source: ANALYSIS_SOURCE.local,
      };
    }
    return {
      ...base,
      status: ANALYSIS_STATUS.fallback,
      score: 40,
      feedbackPt: `Resposta registrada. Modelo esperado: "${expectedAnswer}". Compare e ajuste mentalmente.`,
      issues: ['Resposta difere do modelo.'],
      nextDrill: `Revise: ${expectedAnswer}`,
      source: ANALYSIS_SOURCE.local,
    };
  }

  return {
    ...base,
    status: ANALYSIS_STATUS.fallback,
    score: 65,
    feedbackPt: 'Tentativa registrada. Compare com o conteúdo da aula antes de avançar.',
    strengths: ['Resposta enviada.'],
    nextDrill: 'Continue pela aula.',
    source: ANALYSIS_SOURCE.local,
  };
}
