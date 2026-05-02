const fallbackSections = [
  {
    title: 'Regra principal',
    content: 'Use simple present para falar sobre rotina, fatos e hábitos. Com he, she e it, o verbo normalmente muda: She studies. He works.',
  },
  {
    title: 'Exemplos seguros',
    content: 'Exemplos do professor: 1. I work every day. Eu trabalho todos os dias. 2. She studies English. Ela estuda inglês. 3. They live here. Eles moram aqui.',
  },
  {
    title: 'Erro comum',
    content: 'Não use do/does em frases afirmativas simples: diga “She studies English”, não “She does studies English”.',
  },
];

const fallbackTips = [
  'Leia a regra principal primeiro.',
  'Observe os exemplos em inglês antes de praticar.',
  'Faça a Prática Profunda para testar se você realmente entendeu.',
];

const connectorBreaks = [
  'Já',
  'Outro exemplo',
  'Outro lado',
  'Outro',
  'Veja',
  'Assim',
  'Portanto',
  'Além disso',
  'Na prática',
  'Observe',
  'Agora',
  'No entanto',
  'Diferente disso',
];

const exampleHeaderPattern = /\b(Exemplos? do professor|Exemplos? guiados|Exemplos? práticos|Exemplos?)\s*:?\s*/i;
const englishStarterPattern = /^(?:I|You|He|She|It|We|They|This|That|The|A|An|My|Your|His|Her|Our|Their|There|Am|Is|Are|Do|Does|Did|Can|Could|Will|Would|Should|Have|Has|Had)\b/;
const englishFunctionWords = /\b(?:am|are|is|was|were|have|has|had|do|does|did|can|could|will|would|should|must|not|very|from|here|there|today|every|with|for|to|in|on|at|the|a|an|my|your|his|her|our|their|student|doctor|teacher|happy|sad|ready|kind|book|car|table|home|class|Brazil|English)\b/i;
const portugueseSignals = /\b(?:eu|ele|ela|n[oó]s|voc[eê]|voc[eê]s|eles|elas|estou|est[aá]|estamos|feliz|m[eé]dica|m[eé]dico|profiss[aã]o|estado|descreve|indicar|posse|pertence|algu[eé]m|carro|livro|mesa|exemplo|correto|pois|porque|verbo|frase|regra|aluno|brasileiro|portugu[eê]s|ingl[eê]s|pessoa|pessoas|outro|lado|no entanto|diferente|amigo|amigos|novo|nova|gentil|todos|todas|aqui)\b/i;
const translationStarterPattern = /^(?:Eu|Ele|Ela|Nós|Nos|Eles|Elas|Você|Vocês|O|A|Os|As|Meu|Minha|Seu|Sua|Isso|Este|Esta|Esse|Essa)\b/;
const bareBePattern = /^(?:I am|You are|He is|She is|It is|We are|They are|I'm|You're|He's|She's|It's|We're|They're)$/i;
const exampleOverflowPattern = /(?:^|\s)(?=(?:Já|Outro exemplo|Outro lado|Outro|No entanto|Diferente disso|O verbo|Esse uso)\b)/i;
const secondaryExamplePattern = /\s+(?=(?:e|ou)\s+["'“”]?(?:I|You|He|She|It|We|They|This|That|The|A|An|My|Your|His|Her|Our|Their)\b)/i;

export function normalizeVisualSpacing(value) {
  const connectorPatternText = connectorBreaks.join('|');

  return String(value ?? '')
    .replace(/\*\*(.*?)\*\*/g, '$1')
    .replace(/\r\n/g, '\n')
    .replace(/^\s*[-*]\s+/gm, '')
    .replace(/([.!?])(?=[A-ZÁÉÍÓÚÂÊÔÃÕÇ])/g, '$1 ')
    .replace(/\)(?=(Já|Outro exemplo|Outro lado|Outro|Veja|Assim|Portanto|Além disso|Na prática|Observe|Agora|No entanto|Diferente disso)\b)/g, ') ')
    .replace(/([,;:])(?=\S)/g, '$1 ')
    .replace(new RegExp(`\\s*([.!?])\\s*(?=(${connectorPatternText})\\b)`, 'gi'), '$1\n\n')
    .replace(new RegExp(`\\s+(?=(${connectorPatternText})\\b)`, 'gi'), '\n\n')
    .replace(/\n{3,}/g, '\n\n')
    .replace(/[ \t]{2,}/g, ' ')
    .trim();
}

export function cleanText(value) {
  return normalizeVisualSpacing(value);
}

function stripQuotes(value) {
  return cleanText(value).replace(/^["'“”]+|["'“”]+$/g, '').trim();
}

export function splitParagraphs(text) {
  const clean = cleanText(text);
  if (!clean) return [];

  const hardBreaks = clean
    .split(/\n{2,}/g)
    .map((part) => part.trim())
    .filter(Boolean);

  const source = hardBreaks.length ? hardBreaks : [clean];
  return source.flatMap((paragraph) => {
    if (paragraph.length <= 230) return [paragraph];
    return paragraph
      .split(/(?<=[.!?])\s+(?=(?:Já|Outro|Veja|Assim|Portanto|Além disso|Na prática|Observe|Agora|No entanto|Diferente disso)\b)/g)
      .map((part) => part.trim())
      .filter(Boolean);
  });
}

export function splitNumberedList(text) {
  const clean = cleanText(text);
  const matches = [...clean.matchAll(/(?:^|\s)(\d+[.)]\s+)/g)];
  if (matches.length < 2) return null;

  const firstIndex = matches[0].index || 0;
  const intro = clean.slice(0, firstIndex).trim();
  const items = [];

  matches.forEach((match, index) => {
    const start = (match.index || 0) + match[0].length;
    const end = index + 1 < matches.length ? matches[index + 1].index : clean.length;
    const item = clean.slice(start, end).trim();
    if (item) items.push(item);
  });

  return items.length >= 2 ? { intro, items } : null;
}

export function splitByExampleHeader(text) {
  const clean = cleanText(text);
  const match = clean.match(exampleHeaderPattern);
  if (!match || typeof match.index !== 'number') return null;

  return {
    before: clean.slice(0, match.index).replace(/\bPor exemplo\s*:?\s*$/i, '').replace(/\bPor\s*$/i, '').trim(),
    after: clean.slice(match.index + match[0].length).trim(),
  };
}

function splitExampleCandidates(text) {
  const clean = cleanText(text);
  if (!clean) return [];

  const numbered = splitNumberedList(clean);
  if (numbered?.items?.length) return numbered.items;

  const labeled = clean
    .split(/\n{2,}|(?=\bExemplo\s+\d+\b\s*:?)|(?=\bExample\s+\d+\b\s*:?)|(?=\s+[•-]\s+)/gi)
    .map((item) => item.replace(/^\s*(?:Exemplo|Example)\s+\d+\s*:?\s*/i, '').replace(/^\s*[•-]\s*/, '').trim())
    .filter(Boolean);

  if (labeled.length > 1) return labeled;
  return clean.split(/\n+/g).map((item) => item.trim()).filter(Boolean);
}

function looksLikeCompleteEnglish(text) {
  const value = stripQuotes(text).replace(/[.!?]+$/, '').trim();
  if (!value || bareBePattern.test(value)) return false;
  if (!englishStarterPattern.test(value)) return false;
  if (/[áàâãéêíóôõúç]/i.test(value) || portugueseSignals.test(value)) return false;

  const words = value.split(/\s+/).filter(Boolean);
  return words.length >= 3 && words.length <= 18 && englishFunctionWords.test(value);
}

function looksLikePortugueseTranslation(text) {
  const value = stripQuotes(text).replace(/^\((.*)\)$/g, '$1').trim();
  if (!value || looksLikeCompleteEnglish(value)) return false;
  if (/^(correto|pois|porque|aqui|cada|o erro|lembre-se|para perguntar|descreve|mostra|indica)\b/i.test(value)) return false;
  return /[áàâãéêíóôõúç]/i.test(value) || translationStarterPattern.test(value);
}

function findEnglishLead(text) {
  const clean = cleanText(text).replace(/^[,.;:\s]+/, '').trim();
  if (!clean) return null;

  const firstLine = clean.split(/\n+/)[0].trim();
  if (looksLikeCompleteEnglish(firstLine)) {
    return {
      english: stripQuotes(firstLine),
      rest: clean.slice(firstLine.length).trim(),
    };
  }

  const parenthetical = clean.match(/^([A-Z][A-Za-z0-9'\s,.!?-]{4,120}?)\s*\(([^)]{2,140})\)\s*(.*)$/);
  if (parenthetical && looksLikeCompleteEnglish(parenthetical[1])) {
    return {
      english: stripQuotes(parenthetical[1]),
      translation: cleanText(parenthetical[2]),
      rest: cleanText(parenthetical[3]),
    };
  }

  const quotedLead = clean.match(/^["'“”]([^"'“”]{4,120})["'“”]\s*(.*)$/);
  if (quotedLead && looksLikeCompleteEnglish(quotedLead[1])) {
    return {
      english: stripQuotes(quotedLead[1]),
      rest: cleanText(quotedLead[2]),
    };
  }

  const sentenceLead = clean.match(/^([A-Z][A-Za-z0-9'\s-]{4,100}[.!?])\s+(.*)$/);
  if (sentenceLead && looksLikeCompleteEnglish(sentenceLead[1])) {
    return {
      english: stripQuotes(sentenceLead[1]),
      rest: cleanText(sentenceLead[2]),
    };
  }

  return null;
}

function splitExampleOverflow(explanation) {
  const clean = cleanText(explanation);
  if (!clean) return { explanation: '', overflow: '' };

  const match = clean.match(exampleOverflowPattern);
  if (!match || typeof match.index !== 'number') {
    return { explanation: clean, overflow: '' };
  }

  return {
    explanation: clean.slice(0, match.index).trim(),
    overflow: clean.slice(match.index).trim(),
  };
}

function splitSecondaryExampleOverflow(translationCandidate) {
  const clean = cleanText(translationCandidate);
  if (!clean) return { translation: '', overflow: '' };

  const match = clean.match(secondaryExamplePattern);
  if (!match || typeof match.index !== 'number') {
    return { translation: clean, overflow: '' };
  }

  return {
    translation: clean.slice(0, match.index).trim(),
    overflow: clean.slice(match.index).replace(/^(e|ou)\s+/i, '').trim(),
  };
}

function extractTranslation(rest) {
  const clean = cleanText(rest).replace(/^[,.;:\s]+/, '').trim();
  if (!clean) return { translation: '', explanation: '' };

  const explicit = clean.match(/^(?:significa|quer dizer|traduzindo|em portugu[eê]s)\s*["'“”]?(.+?)["'“”]?\s*(?:\.|$)(.*)$/i);
  if (explicit && looksLikePortugueseTranslation(explicit[1])) {
    const safeTranslation = splitSecondaryExampleOverflow(explicit[1]);
    return {
      translation: cleanText(safeTranslation.translation),
      explanation: cleanText([safeTranslation.overflow, explicit[2]].filter(Boolean).join(' ')),
    };
  }

  const sentenceParts = clean.split(/(?<=[.!?])\s+/).map((part) => part.trim()).filter(Boolean);
  if (sentenceParts.length && looksLikePortugueseTranslation(sentenceParts[0])) {
    const safeTranslation = splitSecondaryExampleOverflow(sentenceParts[0]);
    return {
      translation: stripQuotes(safeTranslation.translation),
      explanation: cleanText([safeTranslation.overflow, ...sentenceParts.slice(1)].filter(Boolean).join(' ')),
    };
  }

  return { translation: '', explanation: clean };
}

function parseExampleCard(rawExample) {
  const original = cleanText(rawExample).replace(/^[,.;:\s]+/, '').replace(/^\s*(?:Exemplo|Example)\s+\d+\s*:?\s*/i, '').trim();
  const englishLead = findEnglishLead(original);

  if (!englishLead) {
    return { original, english: '', translation: '', explanation: original, overflow: '', blocked: true };
  }

  const translationResult = englishLead.translation
    ? { translation: englishLead.translation, explanation: englishLead.rest }
    : extractTranslation(englishLead.rest);
  const safeExplanation = splitExampleOverflow(translationResult.explanation);

  return {
    original,
    english: englishLead.english,
    translation: translationResult.translation,
    explanation: safeExplanation.explanation,
    overflow: safeExplanation.overflow,
    blocked: false,
  };
}

export function collectProfessorExamples(content) {
  const headerSplit = splitByExampleHeader(content);
  if (!headerSplit) {
    return {
      explanation: splitParagraphs(content),
      examples: [],
      afterExamples: [],
      blockedCards: 0,
    };
  }

  const explanation = splitParagraphs(headerSplit.before);
  const candidates = splitExampleCandidates(headerSplit.after);
  const examples = [];
  const afterExamples = [];
  let blockedCards = 0;

  candidates.forEach((candidate) => {
    const parsed = parseExampleCard(candidate);
    if (parsed.english) {
      examples.push(parsed);
      if (parsed.overflow) {
        afterExamples.push(...splitParagraphs(parsed.overflow));
      }
    } else {
      blockedCards += 1;
      afterExamples.push(...splitParagraphs(parsed.explanation));
    }
  });

  return {
    explanation,
    examples,
    afterExamples,
    blockedCards,
  };
}

export function normalizeSections(lesson) {
  const sections = Array.isArray(lesson?.sections) ? lesson.sections : [];
  const normalized = sections.map((section, index) => ({
    title: cleanText(section?.title || section?.heading || `Parte ${index + 1}`),
    content: cleanText(section?.content || section?.text || section?.body || section?.explanation || ''),
  })).filter((section) => section.title || section.content);

  return normalized.length ? normalized : fallbackSections;
}

export function normalizeTips(lesson) {
  const tips = Array.isArray(lesson?.tips) ? lesson.tips : [];
  const cleanTips = tips.map((tip) => cleanText(typeof tip === 'string' ? tip : tip?.text || tip?.tip || '')).filter(Boolean);
  return cleanTips.length ? cleanTips : fallbackTips;
}

export function buildGrammarRenderReport(sections) {
  const report = {
    ok: true,
    sections: sections.length,
    examples: 0,
    blockedCards: 0,
    textPreserved: true,
  };

  sections.forEach((section) => {
    const parsed = collectProfessorExamples(section.content || '');
    report.examples += parsed.examples.length;
    report.blockedCards += parsed.blockedCards || 0;
  });

  return report;
}
