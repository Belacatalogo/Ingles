import { createGrammarLesson, createVocabularyLesson, createSpeakingLesson } from '../../../schemas/index.js';

const level = 'B2';
const status = 'ready';
const common = { level, status, estimatedMinutes: 65, tags: ['b2-5', 'culture', 'media', 'society', 'deep-approved-target'] };

function task(instruction, note = '', expected = '') { return { instruction, note, expected }; }

export const B2_DEEP_CULTURE_MEDIA_PART1 = Object.freeze([

  // ─── GRAMMAR-013: Participle clauses ─────────────────────────────────────────
  createGrammarLesson({
    ...common,
    id: 'B2-GRAMMAR-013',
    order: 13,
    title: 'Participle clauses: reducing clauses with -ing, -ed and having done',
    objectives: [
      'Usar cláusulas com particípio presente (-ing) para substituir cláusulas de tempo, causa e condição.',
      'Usar cláusulas com particípio passado (-ed/-pp) para substituir cláusulas passivas.',
      'Usar "having + pp" para indicar ação anterior ao verbo principal.',
      'Reconhecer e produzir cláusulas participiais em escrita formal e jornalística.',
    ],
    teacherOpening: 'Participle clauses are what separate B2 academic/formal English from B1. Instead of "Because it was released last year, the film quickly became controversial", a B2 writer would say "Released last year, the film quickly became controversial." This makes your writing more concise, varied and sophisticated.',
    whyItMatters: 'Participle clauses appear constantly in news articles, academic writing, formal reports and literary texts. Recognising and producing them is essential for B2 reading comprehension and formal writing tasks.',
    differenceFromA2: 'B1: "Because the report was submitted on time, the client was satisfied." B2: "Submitted on time, the report satisfied the client." B2: "Having submitted the report, the team moved on to the next phase."',
    grammarTable: {
      headers: ['Tipo', 'Estrutura', 'Replaces', 'Exemplo'],
      rows: [
        ['Present participle (-ing)', 'Verb-ing + rest of clause', 'Temporal/causal clause', 'Walking into the room, she immediately noticed the tension.'],
        ['Present participle (simultaneous)', '-ing clause', 'while + subject + verb', 'Speaking to journalists, the minister denied any wrongdoing.'],
        ['Past participle (-ed/-pp)', 'Past participle + rest', 'Passive relative or adverbial', 'Designed for efficiency, the system reduced errors by 40%.'],
        ['Having + pp', 'Having + pp + rest of clause', 'after + subject + had + pp', 'Having reviewed all the options, the board decided to proceed.'],
        ['Not + -ing / Not + -ed', 'Negative form', 'Negative causal/temporal clause', 'Not knowing the answer, she asked for more time.'],
      ],
    },
    whenToUse: [
      'When the subject of both clauses is the SAME: "Arriving early, she set up the room." (She arrived = She set up).',
      '"Having + pp": when the participle action clearly happened BEFORE the main verb.',
      'Past participle clause: when the implied meaning is passive — "Built in 1920, the bridge is still in use."',
    ],
    whenNotToUse: [
      'Never use a participle clause when the subjects are DIFFERENT: "Walking into the room, the lights went out" is wrong (lights don\'t walk). → "As she walked into the room, the lights went out."',
      'Avoid in casual speech — these forms belong to formal written English.',
    ],
    teacherExamples: [
      'Launched in 2018, the app quickly gained over ten million users.',
      'Having identified the root cause, the team proposed three solutions.',
      'Covering the conflict from multiple angles, the journalist won an international award.',
      'Written in accessible language, the report reached a wide audience.',
      'Not having received a response, she decided to escalate the matter.',
    ],
    commonBrazilianMistakes: [
      { wrong: 'Being opened in 2020, the restaurant became very popular.', right: 'Opened in 2020, the restaurant became very popular.', note: 'For passive meaning, use past participle directly — not "being + pp" in this construction.' },
      { wrong: 'Having been leaving early, he missed the announcement.', right: 'Having left early, he missed the announcement.', note: '"Having + pp" — not "having been + -ing" for this type of participle clause.' },
    ],
    controlledPractice: [
      task('Reduce to a participle clause:', ''),
      task('"Because she had read the report, she came prepared." → Having read ___'),
      task('"After it was founded in 1999, the company grew rapidly." → Founded in 1999, ___'),
      task('"While he was speaking to the press, he made a key admission." → Speaking to the press, ___'),
      task('"Because she didn\'t understand the question, she asked for clarification." → Not understanding ___'),
    ],
    productionTasks: [
      task('Write 4 sentences about a news event, project or personal experience using: (1) present participle, (2) past participle, (3) having + pp, (4) not + -ing.'),
    ],
    lessonRecap: [
      '-ing clause: simultaneous or causal action (same subject required)',
      '-ed/-pp clause: passive meaning (built, written, launched)',
      'having + pp: action completed before main verb',
      'Danger: subjects must match — no dangling participles',
    ],
    nextLessonBridge: 'Participle clauses make your writing concise. Next: reported speech for questions and commands — essential for recounting what was said in meetings, interviews and documents.',
  }),

  // ─── GRAMMAR-014: Reported speech — questions and commands ────────────────────
  createGrammarLesson({
    ...common,
    id: 'B2-GRAMMAR-014',
    order: 14,
    title: 'Reported speech: questions, commands and requests',
    objectives: [
      'Relatar perguntas diretas em discurso indireto com mudança de word order e backshift.',
      'Relatar perguntas yes/no usando "whether" e "if".',
      'Relatar comandos e pedidos com "told + object + to" e "asked + object + to".',
      'Usar backshift corretamente (present → past, past → past perfect, will → would).',
    ],
    teacherOpening: 'At B2, reporting what people said is not just about statements — it also includes questions, commands, and requests. "She asked where the report was." "He told us to submit it by Friday." "They wanted to know whether we had enough data." These forms are essential in professional, journalistic and academic contexts.',
    whyItMatters: 'In meeting summaries, news reports, academic citations and professional emails, reported speech for questions and commands is unavoidable. Getting the word order right — especially in reported questions — is a key B2 accuracy marker.',
    grammarTable: {
      headers: ['Tipo', 'Direto', 'Indireto (Reported)'],
      rows: [
        ['Reported question (Wh-)', '"Where is the report?" she asked.', 'She asked where the report was.'],
        ['Reported question (Yes/No)', '"Did you finish it?" he asked.', 'He asked whether/if I had finished it.'],
        ['Reported command', '"Submit it by Friday," she told us.', 'She told us to submit it by Friday.'],
        ['Reported request', '"Could you check the figures?" he asked.', 'He asked me to check the figures.'],
        ['Reported negative command', '"Don\'t send it yet," the manager said.', 'The manager told us not to send it yet.'],
        ['Reported suggestion', '"Why don\'t you ask the team?" he suggested.', 'He suggested asking the team. / He suggested that we ask the team.'],
      ],
    },
    whenToUse: [
      'Reported questions use statement word order — no inversion: "She asked where it WAS" (NOT "where was it").',
      '"Whether" is more formal than "if" for reported yes/no questions.',
      'Reported commands: tell + object + to + base verb.',
      'Reported requests: ask + object + to + base verb (positive) / ask + object + not to + base verb (negative).',
    ],
    teacherExamples: [
      'The journalist asked the minister whether he had been informed in advance.',
      'The chair asked us to keep our contributions brief.',
      'The manager told the team not to share the figures externally.',
      'She asked where the quarterly data had been stored.',
      'The client wanted to know when the revised proposal would be ready.',
      'He suggested reviewing the methodology before submitting the report.',
    ],
    commonBrazilianMistakes: [
      { wrong: 'She asked where was the report.', right: 'She asked where the report was.', note: 'Reported questions use statement word order — no inversion.' },
      { wrong: 'He told me submit the file.', right: 'He told me to submit the file.', note: '"Tell" + object + to + base verb — the "to" is obligatory.' },
      { wrong: 'The manager said us to be quiet.', right: 'The manager told us to be quiet.', note: '"Say" does not take an object. "Tell" takes an object: told us, told me, told the team.' },
    ],
    controlledPractice: [
      task('Report these sentences:', ''),
      task('"When does the project end?" the client asked. → The client asked when ___'),
      task('"Did you receive the invoice?" she asked. → She asked whether I ___'),
      task('"Don\'t forget to CC the finance team," he told us. → He told us ___'),
      task('"Could you review this before Thursday?" she asked me. → She asked me ___'),
    ],
    productionTasks: [
      task('Write a short paragraph (60-80 words) summarising what was said in a fictional meeting. Use: asked (whether/where/what), told (us/me) to, suggested + -ing, wanted to know.'),
    ],
    lessonRecap: [
      'Reported questions: statement word order — no inversion',
      'Yes/no questions: whether (formal) or if',
      'Commands: tell + object + to + base verb',
      'Requests: ask + object + to + base verb',
      'Backshift: present → past, past → past perfect, will → would',
    ],
    nextLessonBridge: 'Reported speech complete. Next: relative clauses (defining vs non-defining) — essential for academic writing and precise description.',
  }),

  // ─── GRAMMAR-015: Relative clauses ────────────────────────────────────────────
  createGrammarLesson({
    ...common,
    id: 'B2-GRAMMAR-015',
    order: 15,
    title: 'Relative clauses: defining, non-defining and reduced forms',
    objectives: [
      'Distinguir defining relative clauses (sem vírgulas) de non-defining (com vírgulas).',
      'Usar who, which, that, where, when, whose corretamente em ambos os tipos.',
      'Omitir o pronome relativo em defining clauses quando é objeto.',
      'Usar "which" para referir ao sentido de toda uma cláusula anterior (non-defining).',
      'Reduzir relative clauses usando particípios (-ing, -ed).',
    ],
    teacherOpening: 'Relative clauses are the grammar of precision. "The report which was submitted on time won the award" (defining — only that report). "The report, which was submitted on time, won the award" (non-defining — extra info). The comma changes everything. At B2, mastery of both types — including reduced forms — is essential.',
    whyItMatters: 'Academic, journalistic and professional texts use relative clauses constantly. The distinction between defining and non-defining affects meaning. Reduced relative clauses make writing more elegant and concise.',
    grammarTable: {
      headers: ['Tipo', 'Regra', 'Exemplo'],
      rows: [
        ['Defining (no commas)', 'Identifies WHICH one — essential info. Can use that/who/which.', 'The candidate who scored highest was offered the position.'],
        ['Non-defining (with commas)', 'Adds extra info — could be removed. Use who/which (not that).', 'The CEO, who had been in the role for twenty years, announced her retirement.'],
        ['Omitting relative pronoun', 'Possible when pronoun is object in defining clause.', 'The report (that) the team submitted was excellent. → The report the team submitted...'],
        ['"Which" for whole clause', 'Non-defining "which" can refer to entire preceding clause.', 'He arrived late, which surprised everyone.'],
        ['Reduced: -ing', 'Replace defining clause with -ing participle.', 'The company producing the most data won the contract. (= that produces)'],
        ['Reduced: -ed', 'Replace defining passive clause with past participle.', 'The documents submitted yesterday need signatures. (= that were submitted)'],
      ],
    },
    whenToUse: [
      'Defining: to identify which person/thing you mean — no commas, can use "that".',
      'Non-defining: to add information about something already identified — MUST use commas, cannot use "that".',
      'Reduced relative clauses: in formal writing to make sentences more concise.',
    ],
    teacherExamples: [
      'The algorithm that monitors social media traffic has been updated.',
      'The algorithm, which monitors social media traffic, has been updated this quarter.',
      'The journalist whose article went viral was interviewed on national television.',
      'Media companies operating in the digital space face increasing regulatory pressure.',
      'The data collected over two years supports the original hypothesis.',
    ],
    commonBrazilianMistakes: [
      { wrong: 'The researcher, that published the study, is from Brazil.', right: 'The researcher, who published the study, is from Brazil.', note: 'Non-defining clause (commas) → cannot use "that" — must use "who" for people.' },
      { wrong: 'The report which the team submitted it was excellent.', right: 'The report which the team submitted was excellent.', note: 'Do not repeat the pronoun "it" — the relative pronoun replaces it.' },
    ],
    controlledPractice: [
      task('Add or remove commas and choose the correct relative pronoun:', ''),
      task('"The platform which launched in 2015 now has 500 million users." (extra info) → add commas + use "which"'),
      task('"The executive who leaked the information was dismissed." (identifying which exec) → no change — defining'),
      task('"He received a promotion which surprised everyone." (referring to whole clause) → comma + which ✓'),
    ],
    productionTasks: [
      task('Write 4 sentences about a media or technology topic: (1) defining clause, (2) non-defining clause, (3) reduced -ing clause, (4) reduced -ed clause.'),
    ],
    lessonRecap: [
      'Defining: no commas, who/which/that, identifies which one',
      'Non-defining: commas, who/which (NOT that), adds extra info',
      '"which" for whole clause: "He left early, which was unexpected"',
      'Reduced: -ing (active), -ed (passive) replace defining clauses',
    ],
    nextLessonBridge: 'Grammar complete for B2.5. Now let\'s build vocabulary for Culture, Media and Society.',
  }),

  // ─── VOCABULARY-011: Media and society ────────────────────────────────────────
  createVocabularyLesson({
    ...common,
    id: 'B2-VOCABULARY-011',
    order: 11,
    title: 'Media and society: bias, agenda, algorithm, representation, viral',
    topicContext: 'Discussing media, technology and society at B2 requires specific vocabulary that allows you to analyse, evaluate and argue about how information is produced, distributed and consumed.',
    essentialWords: [
      { word: 'bias', phonetics: '/ˈbaɪəs/', definition: 'an inclination towards a particular perspective or opinion, often unfairly', example: 'Every news outlet has some degree of editorial bias.' },
      { word: 'agenda', phonetics: '/əˈdʒendə/', definition: 'a set of underlying goals or priorities influencing action', example: 'Critics argued the campaign had a political agenda.' },
      { word: 'algorithm', phonetics: '/ˈælɡərɪðəm/', definition: 'a set of rules a computer follows to perform tasks or make decisions', example: 'Social media algorithms tend to promote content that generates strong reactions.' },
      { word: 'echo chamber', phonetics: '', definition: 'an environment where people encounter only views that confirm their own', example: 'Social media can create echo chambers that reinforce existing beliefs.' },
      { word: 'misinformation', phonetics: '/ˌmɪsɪnfəˈmeɪʃn/', definition: 'false or inaccurate information, spread unintentionally or deliberately', example: 'The rapid spread of misinformation during elections is a growing concern.' },
      { word: 'clickbait', phonetics: '/ˈklɪkbeɪt/', definition: 'online content designed to attract clicks through misleading or sensational headlines', example: 'The headline was pure clickbait — the article said nothing new.' },
      { word: 'gatekeeping', phonetics: '', definition: 'the activity of controlling which information reaches the public', example: 'Traditional media relied on editors for gatekeeping; social media removed this filter.' },
      { word: 'viral', phonetics: '/ˈvaɪrəl/', definition: 'spreading rapidly and widely through digital sharing', example: 'The video went viral within hours, reaching millions of users.' },
    ],
    chunks: [
      'go viral (quickly spread online)',
      'media bias / editorial bias',
      'a hidden / political / commercial agenda',
      'reinforce / create / live in an echo chamber',
      'combat / spread / verify misinformation',
      'curated by an algorithm ("content curated by algorithms")',
    ],
    dangerousConfusions: [
      { pair: ['misinformation', 'disinformation'], note: '"Misinformation" is false information spread without intent to deceive. "Disinformation" is false information spread deliberately to deceive. The difference is intent — important for media analysis.' },
      { pair: ['bias', 'prejudice'], note: '"Bias" implies an unfair tendency in perspective or representation — often systemic. "Prejudice" implies a personal, often irrational negative attitude towards a group. Media has "bias". Individuals have "prejudice".' },
    ],
    miniDialogues: [
      { context: 'Media literacy seminar', lines: [
        { speaker: 'Student', text: 'But don\'t all news platforms have some kind of agenda?' },
        { speaker: 'Lecturer', text: 'To a certain extent, yes. What matters is transparency about bias and the difference between reporting facts and editorialising. An echo chamber becomes dangerous when you stop encountering any challenge to your beliefs.' },
      ]},
    ],
    usagePractice: [
      task('Use each word in a sentence about current media or technology:', ''),
      task('algorithm: ___', 'Focus on social media or content recommendations.'),
      task('echo chamber: ___', 'Focus on how people\'s beliefs can be reinforced.'),
      task('misinformation: ___', 'Focus on the impact of false content online.'),
    ],
    productionTasks: [
      task('Write a short analytical paragraph (60-80 words) about the impact of social media algorithms on public opinion. Use at least 4 words from this lesson.'),
    ],
  }),

  // ─── VOCABULARY-012: Cultural language ────────────────────────────────────────
  createVocabularyLesson({
    ...common,
    id: 'B2-VOCABULARY-012',
    order: 12,
    title: 'Cultural language: heritage, identity, representation, assimilation',
    topicContext: 'Discussing culture, identity and diversity requires precise vocabulary. At B2, you need to be able to talk about cultural dynamics — not just describe, but analyse and evaluate.',
    essentialWords: [
      { word: 'heritage', phonetics: '/ˈherɪtɪdʒ/', definition: 'traditions, culture and history passed down from earlier generations', example: 'The festival celebrates the region\'s musical heritage.' },
      { word: 'identity', phonetics: '/aɪˈdentɪti/', definition: 'the characteristics and qualities that define who someone is (personal, cultural, national)', example: 'Cultural identity is shaped by language, customs and shared memory.' },
      { word: 'representation', phonetics: '/ˌreprɪzenˈteɪʃn/', definition: 'the way a group of people or type of person is portrayed in media or culture', example: 'There has been growing debate about the representation of minority groups in mainstream cinema.' },
      { word: 'assimilation', phonetics: '/əˌsɪmɪˈleɪʃn/', definition: 'the process by which a minority group adopts the culture of a larger group', example: 'The tension between assimilation and cultural preservation is a central theme in immigrant communities.' },
      { word: 'stereotype', phonetics: '/ˈsteriəˌtaɪp/', definition: 'a widely held, oversimplified image of a particular group', example: 'The film challenged cultural stereotypes rather than reinforcing them.' },
      { word: 'appropriation', phonetics: '/əˌprəʊpriˈeɪʃn/', definition: 'the adoption of elements from another culture, often controversially', example: 'The fashion industry has been criticised for cultural appropriation.' },
      { word: 'diaspora', phonetics: '/daɪˈæspərə/', definition: 'a population that has spread from its original homeland', example: 'The Brazilian diaspora has contributed significantly to cultural exchange in Europe.' },
    ],
    chunks: [
      'cultural heritage / national heritage',
      'a sense of identity / cultural identity',
      'challenge / reinforce a stereotype',
      'the representation of [women / minorities / etc.] in [media / film / advertising]',
      'the tension between [assimilation] and [cultural preservation]',
    ],
    dangerousConfusions: [
      { pair: ['assimilation', 'integration'], note: '"Assimilation" implies adopting the majority culture to the point of losing distinctive cultural identity. "Integration" implies participating in a new society while maintaining aspects of one\'s own culture. Integration is generally viewed as more positive and balanced.' },
    ],
    miniDialogues: [
      { context: 'Culture and media lecture', lines: [
        { speaker: 'Lecturer', text: 'How does representation in media affect cultural identity?' },
        { speaker: 'Student', text: 'When groups are consistently misrepresented or underrepresented, it can reinforce stereotypes and undermine people\'s sense of belonging. On the other hand, authentic representation can strengthen community identity and challenge existing assumptions.' },
      ]},
    ],
    productionTasks: [
      task('Write a short paragraph (60-80 words) analysing the importance of cultural representation in media. Use: representation, stereotype, identity, and at least one other word from this lesson.'),
    ],
  }),

  // ─── SPEAKING-006: Discuss a current affairs or media topic ──────────────────
  createSpeakingLesson({
    ...common,
    id: 'B2-SPEAKING-006',
    order: 6,
    title: 'Discuss a current affairs or media topic: opinion, evidence, nuance',
    speakingSituation: 'You are in a seminar, podcast-style discussion or interview. The topic is media, culture or society. You need to give a nuanced, evidence-based opinion while responding to different perspectives.',
    modelPhrases: [
      'The issue of [media bias] is arguably more complex than it appears on the surface.',
      'There is strong evidence to suggest that algorithms tend to reinforce existing beliefs.',
      'I would challenge the assumption that all representation in media is equal.',
      'Whereas traditional media had editorial gatekeepers, social media has largely removed that filter.',
      'To a certain extent, the spread of misinformation constitutes a systemic failure.',
      'What strikes me about this debate is the tension between freedom of expression and accountability.',
      'Launching into this topic without acknowledging the complexity would be somewhat misleading.',
      'Having reviewed the evidence, I would argue that the problem lies not in the technology itself but in how it is deployed.',
    ],
    guidedSpeaking: [
      { prompt: 'Is social media a tool for democratic participation or a threat to it? Give a nuanced 2-minute argument.', structure: 'Open with nuanced position → evidence for one side → "whereas" pivot to other side → qualification → your position', minWords: 120 },
      { prompt: 'Discuss the importance — or overstatement — of cultural representation in media and entertainment.', structure: 'Acknowledge the debate → give your view with evidence → challenge a counterpoint → conclusion', minWords: 100 },
    ],
    recordingTasks: [
      { prompt: 'Choose a media or society topic you feel strongly about. Record a 2-minute structured opinion using: at least one participle clause, one relative clause, one reporting verb (contends / argues), one qualification marker, and one concession structure.', duration: '2 minutes', checklist: [
        'Nuanced position stated clearly',
        'At least one participle clause used',
        'At least one non-defining or defining relative clause',
        'Reporting verb used to cite a perspective',
        'Qualification marker used (arguably / tend to / appear to)',
        'Concession acknowledged without losing position',
        'Conclusion restates your view',
      ]},
    ],
    speakingChecklist: [
      'Clear position on a complex topic.',
      'Evidence or example provided.',
      'At least one grammar structure from B2.5 used naturally (participle or relative clause).',
      'At least one media/culture vocabulary item used.',
      'Qualification and concession both present.',
      'Confident, fluent delivery.',
    ],
    freeSpeaking: [
      { topic: 'Is the traditional news media still relevant in the age of social media? Give your view in 2 minutes.' },
      { topic: 'How does cultural identity affect the way people consume and interpret media? Discuss with nuance.' },
    ],
  }),

]);

export const B2_DEEP_CULTURE_MEDIA_PART1_BY_PILLAR = Object.freeze({
  grammar: B2_DEEP_CULTURE_MEDIA_PART1.filter(l => l.pillar === 'grammar'),
  vocabulary: B2_DEEP_CULTURE_MEDIA_PART1.filter(l => l.pillar === 'vocabulary'),
  speaking: B2_DEEP_CULTURE_MEDIA_PART1.filter(l => l.pillar === 'speaking'),
});
