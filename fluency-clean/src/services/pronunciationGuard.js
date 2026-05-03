const PRONUNCIATION_RULES = [
  // Nomes brasileiros e nomes comuns que o TTS pode tentar ler com som estranho.
  {
    id: 'joao',
    pattern: /\bJoão\b/gi,
    ttsText: 'Joao',
    guide: 'João/Joao = zhoh-OW, two syllables. Do not pronounce it like "juau".',
  },
  {
    id: 'jose',
    pattern: /\bJosé\b/gi,
    ttsText: 'Jose',
    guide: 'José/Jose = zho-ZEH. Do not pronounce it as English "Joe-see".',
  },
  {
    id: 'ana',
    pattern: /\bAna\b/g,
    ttsText: 'Ana',
    guide: 'Ana = AH-nah, simple two syllables.',
  },
  {
    id: 'maria',
    pattern: /\bMaria\b/g,
    ttsText: 'Maria',
    guide: 'Maria = mah-REE-ah, natural Brazilian/Latin name pronunciation.',
  },
  {
    id: 'paulo',
    pattern: /\bPaulo\b/g,
    ttsText: 'Paulo',
    guide: 'Paulo = POW-loh, not English "Paul".',
  },
  {
    id: 'pedro',
    pattern: /\bPedro\b/g,
    ttsText: 'Pedro',
    guide: 'Pedro = PEH-droh, clear two syllables.',
  },
  {
    id: 'lucas',
    pattern: /\bLucas\b/g,
    ttsText: 'Lucas',
    guide: 'Lucas = LOO-kas, clear and simple.',
  },
  {
    id: 'beatriz',
    pattern: /\bBeatriz\b/g,
    ttsText: 'Beatriz',
    guide: 'Beatriz = beh-ah-TREEZ, natural Latin pronunciation.',
  },
  {
    id: 'luiz-luis',
    pattern: /\b(Luiz|Luis|Luís)\b/g,
    ttsText: 'Luis',
    guide: 'Luis/Luiz = loo-EES, not English "Lewis".',
  },
  {
    id: 'vitor-victor',
    pattern: /\b(Vitor|Victor)\b/g,
    ttsText: 'Vitor',
    guide: 'Vitor/Victor = VEE-tor in Brazilian Portuguese context.',
  },

  // Frases muito comuns em Listening A1/A2.
  {
    id: 'how-are-you',
    pattern: /\bhow are you\b/gi,
    ttsText: 'how are you',
    guide: 'how are you = HOW ar yoo, clear and natural.',
  },
  {
    id: 'where-are-you-from',
    pattern: /\bwhere are you from\b/gi,
    ttsText: 'where are you from',
    guide: 'where are you from = WAIR ar yoo frum, clear connected speech.',
  },
  {
    id: 'what-do-you-do',
    pattern: /\bwhat do you do\b/gi,
    ttsText: 'what do you do',
    guide: 'what do you do = WUT doo yoo doo, keep both "do" sounds clear.',
  },
  {
    id: 'nice-to-meet-you',
    pattern: /\bnice to meet you\b/gi,
    ttsText: 'nice to meet you',
    guide: 'nice to meet you = NYSE tuh MEET yoo, natural and friendly.',
  },
  {
    id: 'see-you-tomorrow',
    pattern: /\bsee you tomorrow\b/gi,
    ttsText: 'see you tomorrow',
    guide: 'see you tomorrow = SEE yoo tuh-MOR-oh, do not rush "tomorrow".',
  },

  // Palavras A1/A2 sensíveis ou frequentes.
  {
    id: 'today',
    pattern: /\btoday\b/gi,
    ttsText: 'today',
    guide: 'today = tuh-DAY. Stress the second syllable. Do not say "drei".',
  },
  {
    id: 'tomorrow',
    pattern: /\btomorrow\b/gi,
    ttsText: 'tomorrow',
    guide: 'tomorrow = tuh-MOR-oh. Stress the middle syllable.',
  },
  {
    id: 'morning',
    pattern: /\bmorning\b/gi,
    ttsText: 'morning',
    guide: 'morning = MOR-ning, clear first syllable.',
  },
  {
    id: 'evening',
    pattern: /\bevening\b/gi,
    ttsText: 'evening',
    guide: 'evening = EEV-ning, not "eventing".',
  },
  {
    id: 'breakfast',
    pattern: /\bbreakfast\b/gi,
    ttsText: 'breakfast',
    guide: 'breakfast = BREK-fuhst, not "break fast" as two separate words.',
  },
  {
    id: 'comfortable',
    pattern: /\bcomfortable\b/gi,
    ttsText: 'comfortable',
    guide: 'comfortable = KUHM-fter-bul or KUHM-fuh-ter-bul, natural English pronunciation.',
  },
  {
    id: 'vegetable',
    pattern: /\bvegetable\b/gi,
    ttsText: 'vegetable',
    guide: 'vegetable = VEJ-tuh-bul, not "ve-ge-table".',
  },
  {
    id: 'chocolate',
    pattern: /\bchocolate\b/gi,
    ttsText: 'chocolate',
    guide: 'chocolate = CHAWK-lit, natural two-syllable pronunciation.',
  },
  {
    id: 'favorite',
    pattern: /\bfavo(u)?rite\b/gi,
    ttsText: 'favorite',
    guide: 'favorite = FAY-vrit, natural English pronunciation.',
  },
  {
    id: 'pronunciation',
    pattern: /\bpronunciation\b/gi,
    ttsText: 'pronunciation',
    guide: 'pronunciation = proh-nun-see-AY-shun. Do not say "pronounciation".',
  },
  {
    id: 'language',
    pattern: /\blanguage\b/gi,
    ttsText: 'language',
    guide: 'language = LANG-gwij, not "lan-goo-age".',
  },
  {
    id: 'english',
    pattern: /\bEnglish\b/g,
    ttsText: 'English',
    guide: 'English = ING-glish, clear first syllable.',
  },
  {
    id: 'brazil',
    pattern: /\bBrazil\b/g,
    ttsText: 'Brazil',
    guide: 'Brazil = bruh-ZIL, stress the second syllable.',
  },
  {
    id: 'brazilian',
    pattern: /\bBrazilian\b/g,
    ttsText: 'Brazilian',
    guide: 'Brazilian = bruh-ZIL-yun, natural English pronunciation.',
  },

  // Pronomes/sons que apareceram ruins no teste.
  {
    id: 'you',
    pattern: /\byou\b/gi,
    ttsText: 'you',
    guide: 'you = yoo, not "iu".',
  },
  {
    id: 'your',
    pattern: /\byour\b/gi,
    ttsText: 'your',
    guide: 'your = yor or yoor, clear Y sound.',
  },
  {
    id: 'yours',
    pattern: /\byours\b/gi,
    ttsText: 'yours',
    guide: 'yours = yorz, clear Y sound.',
  },

  // Contrações comuns em aula básica.
  {
    id: 'i-am-contraction',
    pattern: /\bI['’]m\b/g,
    ttsText: "I'm",
    guide: "I'm = aym, natural contraction of I am.",
  },
  {
    id: 'you-are-contraction',
    pattern: /\byou['’]re\b/gi,
    ttsText: "you're",
    guide: "you're = yor or yoor, natural contraction of you are.",
  },
  {
    id: 'dont',
    pattern: /\bdon['’]t\b/gi,
    ttsText: "don't",
    guide: "don't = dohnt, clear long O sound.",
  },
  {
    id: 'doesnt',
    pattern: /\bdoesn['’]t\b/gi,
    ttsText: "doesn't",
    guide: "doesn't = DUZ-unt, not " + '"dooz-ent"' + '.',
  },
  {
    id: 'cant',
    pattern: /\bcan['’]t\b/gi,
    ttsText: "can't",
    guide: "can't = kant in American English, clear final T.",
  },

  // Letras para spelling/listening.
  {
    id: 'letter-a',
    pattern: /\bletter A\b/gi,
    ttsText: 'letter A',
    guide: 'letter A = letter AY. When spelling, pronounce A as AY.',
  },
  {
    id: 'spell-name',
    pattern: /\bspell my name\b/gi,
    ttsText: 'spell my name',
    guide: 'spell my name = spell my NAYM, clear for listening practice.',
  },
];

function resetPattern(rule) {
  if (rule?.pattern) rule.pattern.lastIndex = 0;
}

function uniqueRulesForText(text) {
  const source = String(text ?? '');
  return PRONUNCIATION_RULES.filter((rule) => {
    resetPattern(rule);
    return rule.pattern.test(source);
  });
}

export function normalizeTtsTextForPronunciation(text) {
  let output = String(text ?? '');
  for (const rule of PRONUNCIATION_RULES) {
    resetPattern(rule);
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

export function getPronunciationGuardStats(text) {
  const rules = uniqueRulesForText(text);
  return {
    active: rules.length > 0,
    count: rules.length,
    rules: rules.map((rule) => rule.id),
  };
}

export { PRONUNCIATION_RULES };
