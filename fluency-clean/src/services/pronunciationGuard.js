const PRONUNCIATION_RULES = [
  {
    id: 'joao',
    pattern: /\bJoão\b/gi,
    ttsText: 'Joao',
    guide: 'João/Joao = zhoh-OW, two syllables. Do not pronounce it like "juau".',
  },
  {
    id: 'today',
    pattern: /\btoday\b/gi,
    ttsText: 'today',
    guide: 'today = tuh-DAY. Stress the second syllable. Do not say "drei".',
  },
  {
    id: 'you',
    pattern: /\byou\b/gi,
    ttsText: 'you',
    guide: 'you = yoo, not "iu".',
  },
  {
    id: 'how-are-you',
    pattern: /\bhow are you\b/gi,
    ttsText: 'how are you',
    guide: 'how are you = HOW ar yoo, clear and natural.',
  },
];

function uniqueRulesForText(text) {
  const source = String(text ?? '');
  return PRONUNCIATION_RULES.filter((rule) => {
    rule.pattern.lastIndex = 0;
    return rule.pattern.test(source);
  });
}

export function normalizeTtsTextForPronunciation(text) {
  let output = String(text ?? '');
  for (const rule of PRONUNCIATION_RULES) {
    output = output.replace(rule.pattern, (match) => {
      if (/^[A-ZÁÀÂÃÉÊÍÓÔÕÚÇ]/.test(match) && rule.ttsText) {
        return rule.ttsText.charAt(0).toUpperCase() + rule.ttsText.slice(1);
      }
      return rule.ttsText || match;
    });
  }
  return output;
}

export function buildPronunciationGuide(text) {
  const rules = uniqueRulesForText(text);
  if (!rules.length) return '';
  return rules.map((rule) => `- ${rule.guide}`).join('\n');
}

export function buildPronunciationStyle(style, text) {
  const guide = buildPronunciationGuide(text);
  const baseStyle = String(style || 'Natural, clear, friendly American English teacher voice. Moderate pace, excellent pronunciation, easy for Brazilian students to understand.').trim();
  if (!guide) return baseStyle;
  return `${baseStyle}\nPronunciation guard:\n${guide}\nIf a pronunciation guide conflicts with a guessed pronunciation, follow the guide.`;
}
