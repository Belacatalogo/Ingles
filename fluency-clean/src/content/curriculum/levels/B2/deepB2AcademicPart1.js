import { createGrammarLesson, createVocabularyLesson, createSpeakingLesson } from '../../../schemas/index.js';

const level = 'B2';
const status = 'ready';
const common = { level, status, estimatedMinutes: 65, tags: ['b2-7', 'academic', 'cohesion', 'deep-approved-target'] };

function task(instruction, note = '', expected = '') { return { instruction, note, expected }; }

export const B2_DEEP_ACADEMIC_PART1 = Object.freeze([

  // ─── GRAMMAR-019: Advanced cohesion — reference, substitution, ellipsis ──────
  createGrammarLesson({
    ...common,
    id: 'B2-GRAMMAR-019',
    order: 19,
    title: 'Advanced cohesion: reference chains, substitution and ellipsis in academic writing',
    objectives: [
      'Use reference chains (this, such, these, the former, the latter, the above-mentioned) to avoid repetition in formal texts.',
      'Use substitution (do so, the same, such) to replace earlier verb phrases or clauses.',
      'Recognise ellipsis in formal writing and speech.',
      'Produce cohesive academic paragraphs that read fluently and avoid unnecessary repetition.',
    ],
    teacherOpening: 'One of the things that makes academic writing feel difficult to read — but also sophisticated and efficient — is its system of cohesive reference. Instead of repeating "inequality" five times in a paragraph, an academic writer uses "this phenomenon", "the above-mentioned disparity", "such trends". These reference devices are not just stylistic; they signal logical connections between ideas. Learning them is essential for producing — and understanding — B2+ academic texts.',
    portugueseContrast: [task('Em Advanced cohesion: reference chains, substitution and ellipsis in academic writing, observe que a estrutura do inglês difere da ordem natural do português.'), task('Não traduza literalmente; identifique o padrão do inglês antes de produzir.')], 
    whyItMatters: 'Academic texts are dense because they pack information into reference chains. If you cannot follow these chains, you lose the thread of the argument. If you cannot produce them, your writing sounds repetitive and under-developed.',
    differenceFromA2: 'B1: "Inequality is a serious problem. Inequality affects many people. Inequality is getting worse." B2: "Inequality is a serious problem. This trend affects millions globally and, as the data shows, is deteriorating rather than improving."',
    grammarTable: {
      headers: ['Cohesion device', 'Examples', 'Function', 'Caution'],
      rows: [
        ['Demonstrative reference', 'this, these, that, those, this phenomenon, this development, these findings', 'Refers back to a noun, noun phrase or entire clause', 'Must be clear what "this" refers to — ambiguity is a common error.'],
        ['The + noun synonym', 'the trend, the phenomenon, the issue, the development, the pattern', 'Refers back by replacing the word with a synonym + "the"', 'Use a genuine synonym; avoid vague "the thing".'],
        ['The former / the latter', 'the former (= the first-mentioned), the latter (= the second-mentioned)', 'Refers to one of two previously mentioned items', 'Only use when exactly two items were mentioned. Very formal.'],
        ['Such + noun', 'such trends, such an approach, such measures', 'Summarises a category mentioned above', '"Such" is slightly more formal and specific than "these".'],
        ['The above-mentioned / aforementioned', 'the above-mentioned challenges, the aforementioned study', 'Explicitly references something said earlier', 'Very formal; best in reports and academic papers.'],
        ['Substitution: do so', 'Many countries pledged to reduce emissions. Several have already done so.', 'Replaces a verb phrase to avoid repetition', 'Do so replaces the action; do it replaces the object.'],
        ['Substitution: the same', 'The IMF recommended reform. The World Bank proposed the same.', 'Replaces a noun phrase or action', 'Very concise; useful in comparative contexts.'],
        ['Ellipsis', '"Some countries acted quickly; others [acted] slowly."', 'Omits a recoverable element for economy', 'Common in lists and contrasts; must be grammatically recoverable.'],
      ],
    },
    teacherExamples: [
      'Global displacement has reached record levels. This development reflects both conflict and climate-driven migration. Such trends are expected to intensify over the coming decades.',
      'Two proposals were put forward at the summit. The former focused on mitigation; the latter on adaptation funding.',
      'Reducing emissions requires structural economic reform. Many OECD countries have pledged to do so by 2050.',
      'The report identified three governance failures: inadequate funding, poor implementation, and a lack of accountability. The above-mentioned failures have undermined progress on every major target.',
      'Some nations adopted ambitious targets; others [adopted] more modest ones, citing economic constraints.',
    ],
    practiceExercises: [
      {
        type: 'cohesion-improvement',
        instruction: 'Rewrite each paragraph to improve cohesion. Replace repeated nouns with reference chains.',
        items: [
          'Poverty is a serious challenge in many regions. Poverty is caused by multiple factors. Poverty affects health, education and social mobility. Reducing poverty requires coordinated policy across multiple sectors.',
          'The treaty was signed in 2015. The treaty set targets for emissions reductions. Many countries have not met the targets set in the treaty. The targets in the treaty are now being revised.',
        ],
      },
      {
        type: 'reference-chain-analysis',
        instruction: 'Read the following paragraph and identify every cohesion device (reference, substitution or ellipsis). State what each one refers back to.',
        paragraph: 'Multilateral institutions face significant pressure. This pressure has intensified as major powers increasingly bypass such institutions in favour of bilateral arrangements. The former tend to be slower and more procedurally constrained; the latter offer greater speed and flexibility, though often at the cost of inclusivity. As more nations have opted to do so, the legitimacy of the multilateral system has eroded.',
      },
    ],
    lessonRecap: 'You practised advanced cohesion devices — demonstrative reference, the former/the latter, such + noun, the above-mentioned, substitution with do so and the same, and ellipsis — to produce fluent, non-repetitive academic prose.',
    nextLessonBridge: 'Next: complex clause structures used in academic writing — it-extraposition, nominal clauses as subjects and objects, and emphatic cleft patterns.',
  }),

  // ─── GRAMMAR-020: Complex clause structure in academic writing ────────────────
  createGrammarLesson({
    ...common,
    id: 'B2-GRAMMAR-020',
    order: 20,
    title: 'Complex clause structure: it-extraposition, nominal clauses and academic emphasis',
    objectives: [
      'Use it-extraposition structures (It is worth noting that, It remains unclear whether, It cannot be denied that) to introduce and evaluate claims.',
      'Use nominal clauses as subjects and objects of formal verbs (What concerns researchers is..., Whether X will succeed is unclear).',
      'Apply cleft emphasis in academic contexts (What the data reveals is..., It was the governance failure that...).',
      'Recognise these structures in academic texts and use them accurately in writing.',
    ],
    teacherOpening: 'Academic writing often places the key information at the end of a sentence — the position of most stress in English. It-extraposition (moving a that-clause or whether-clause to the end, starting the sentence with "It") is one of the main tools for achieving this. Nominal clause subjects (What is clear is...) are another. Both are rare in informal English and very common in academic writing — they are strong signals of B2+ register.',
    portugueseContrast: [task('Em Complex clause structure: it-extraposition, nominal clauses and academic emphasis, observe que a estrutura do inglês difere da ordem natural do português.'), task('Não traduza literalmente; identifique o padrão do inglês antes de produzir.')], 
    whyItMatters: 'These structures control where emphasis falls in a sentence. They allow the writer to introduce a topic with a commentary phrase (It is often argued that, It should be noted that) and to foreground the most important information. Without them, academic writing sounds flat.',
    differenceFromA2: 'B1: "Solving inequality is difficult." B2: "It is worth noting that the challenge of inequality resists simple technical solutions." B1: "We don\'t know if the policy will work." B2: "Whether the policy will achieve its intended outcomes remains, at this stage, unclear."',
    grammarTable: {
      headers: ['Structure', 'Formula', 'Register', 'Example'],
      rows: [
        ['It is/was + adjective + that-clause', 'It + be + adj + (that) + clause', 'Formal', 'It is widely acknowledged that current pledges are insufficient.'],
        ['It is + past participle + that-clause', 'It + be + pp (argued/reported/estimated) + that', 'Academic', 'It has been argued that multilateralism is in structural decline.'],
        ['It remains + adjective + whether/how', 'It + remains + adj + whether/how/why', 'Academic', 'It remains unclear whether the agreement will be implemented.'],
        ['It is worth + -ing', 'It is worth + gerund + (that/this)', 'Academic', 'It is worth noting that the two phenomena are not directly comparable.'],
        ['What + clause + is/are', 'What + subject + verb + is/are + noun/clause', 'Formal', 'What the data suggests is a gradual but accelerating trend.'],
        ['Whether + clause + is/remains', 'Whether + clause + is/are/remains + adj', 'Academic', 'Whether this represents a structural shift or a temporary fluctuation is debated.'],
        ['It-cleft for academic emphasis', 'It was + focus + that/who/which + rest', 'Formal', 'It was the failure of implementation, not the design of the policy, that undermined the initiative.'],
      ],
    },
    teacherExamples: [
      'It is often claimed that globalisation has reduced inequality globally while increasing it nationally.',
      'It remains to be seen whether the current diplomatic efforts will produce a binding agreement.',
      'What is striking about these figures is not the magnitude but the speed of the change.',
      'Whether climate-driven migration qualifies as "refugee" status under existing international law remains a contested legal question.',
      'It was the absence of enforcement mechanisms, not the ambition of the targets, that rendered the framework ineffective.',
      'It is worth emphasising that correlation does not imply causation, however strong the statistical relationship.',
    ],
    practiceExercises: [
      {
        type: 'transformation',
        instruction: 'Rewrite each sentence using the structure indicated.',
        items: [
          { original: 'We don\'t know if the new policy will work.', target: 'It remains...' },
          { original: 'The most surprising finding is that inequality rose despite economic growth.', target: 'What is most surprising...' },
          { original: 'The lack of political will, not the cost, is the main obstacle.', target: 'It is the lack of...' },
          { original: 'We should note that the two datasets are not directly comparable.', target: 'It is worth noting...' },
          { original: 'People have argued that the framework is unworkable.', target: 'It has been argued that...' },
        ],
      },
      {
        type: 'production',
        instruction: 'Write three sentences on a global issue topic using THREE different structures from the table above.',
      },
    ],
    lessonRecap: 'You practised complex clause structures — it-extraposition, nominal clauses as subjects (What the data shows is...), it-cleft emphasis, and whether/whether-clause subjects — for formal academic writing.',
    nextLessonBridge: 'In the final grammar lesson of B2.7 you will practise paraphrasing and reformulation — the metalanguage of academic clarification (that is to say, in other words, to put it differently).',
  }),

  // ─── GRAMMAR-021: Paraphrasing and reformulation language ────────────────────
  createGrammarLesson({
    ...common,
    id: 'B2-GRAMMAR-021',
    order: 21,
    title: 'Paraphrasing and reformulation: "in other words", "that is to say", "to put it differently"',
    objectives: [
      'Use reformulation phrases to clarify, restate or simplify a complex idea.',
      'Distinguish between paraphrasing (changing words to mean the same) and reformulation (explicitly signalling a restatement).',
      'Use put another way, that is to say, in other words, or rather, what I mean is, to be more precise in formal and semi-formal contexts.',
      'Practise paraphrasing academic passages without losing precision or changing meaning.',
    ],
    teacherOpening: 'Paraphrasing — expressing an idea in different words while keeping the meaning — is one of the most important academic skills. Whether you are avoiding plagiarism in an essay, summarising a source, or clarifying a complex idea in a spoken discussion, the ability to rephrase accurately is essential at B2+. Reformulation language (in other words, that is to say) lets you explicitly signal to the reader that you are restating something — a key tool for clarity in academic writing.',
    portugueseContrast: [task('Em Paraphrasing and reformulation: "in other words", "that is to say", "to put it differently", observe que a estrutura do inglês difere da ordem natural do português.'), task('Não traduza literalmente; identifique o padrão do inglês antes de produzir.')], 
    whyItMatters: 'Academic writing requires paraphrasing when using sources, defining terms, and making complex ideas accessible. In academic speaking, reformulation helps you clarify your point mid-argument without losing fluency. These are skills tested in every B2 and C1 exam.',
    differenceFromA2: 'B1: "I mean..." / "Like, it\'s when..." B2: "In other words..." / "To put it more precisely..." / "What this implies is..."',
    grammarTable: {
      headers: ['Phrase', 'Function', 'Register', 'Example'],
      rows: [
        ['in other words', 'Restate more clearly or simply', 'Formal/neutral', 'Correlation does not equal causation. In other words, two things can happen together without one causing the other.'],
        ['that is to say', 'More precise restatement, often technical', 'Formal', 'The policy applies to all OECD states — that is to say, approximately 38 countries.'],
        ['to put it differently / another way', 'Restate from a different angle', 'Formal/neutral', 'The costs are unevenly distributed. To put it differently, the poorest countries pay the highest price for a problem they did little to create.'],
        ['or rather', 'Correct or refine what you just said', 'Formal/neutral', 'The agreement was voluntary, or rather, it lacked any binding enforcement mechanism.'],
        ['to be more precise / more specifically', 'Add precision to a general statement', 'Academic', 'Growth has been uneven — to be more precise, gains have been concentrated in the top income quintile.'],
        ['what this means is', 'Draw out the implication of what was just said', 'Formal/neutral', 'Union membership has declined by 30 percentage points. What this means is that workers have significantly less collective bargaining power than in 1980.'],
        ['which is to say', 'Formal equivalent of "in other words" for a qualifying clause', 'Formal', 'The framework lacks enforcement, which is to say that compliance is essentially voluntary.'],
      ],
    },
    paraphrasingTechniques: {
      title: 'Paraphrasing techniques for academic writing',
      items: [
        { technique: 'Synonyms', example: 'Original: "Global inequality has increased." → Paraphrase: "The global wealth gap has widened."' },
        { technique: 'Change sentence structure', example: 'Original: "Failure to act will have severe consequences." → Paraphrase: "The consequences of inaction are likely to be severe."' },
        { technique: 'Nominalize', example: 'Original: "Countries failed to meet the targets." → Paraphrase: "The failure to meet the agreed targets..."' },
        { technique: 'Change voice', example: 'Original: "Researchers have documented this trend." → Paraphrase: "This trend has been extensively documented."' },
        { technique: 'Change perspective', example: 'Original: "Wealthy countries must pay more." → Paraphrase: "Greater financial contributions are required from high-income nations."' },
      ],
    },
    teacherExamples: [
      'The agreement lacks enforcement mechanisms — in other words, there is no penalty for non-compliance.',
      'The data shows a strong negative correlation between governance quality and poverty levels; to put it differently, countries with weaker institutions tend to have higher poverty rates.',
      'Progress has been made, or rather, incremental progress has been made in specific areas while broader structural challenges remain unaddressed.',
      'The study covered 47 countries — that is to say, all UN member states with a population over 10 million.',
      'The transition is technically and economically feasible. What this means is that the barriers are primarily political and institutional.',
    ],
    practiceExercises: [
      {
        type: 'paraphrase',
        instruction: 'Paraphrase each sentence using at least TWO different techniques. Do not change the meaning.',
        items: [
          'Many governments have failed to implement the policies they promised.',
          'Climate change affects poor countries more severely than rich ones.',
          'International cooperation has produced some results, but not enough.',
        ],
      },
      {
        type: 'reformulation-insertion',
        instruction: 'Add a reformulation sentence after each statement using a phrase from the grammar table.',
        items: [
          'The bottom 50% of the global population owns just 2% of total wealth.',
          'Achieving consensus requires all major emitters to make binding commitments.',
          'The policy is non-mandatory.',
        ],
      },
    ],
    lessonRecap: 'You practised paraphrasing techniques (synonyms, structure change, nominalization, voice change) and reformulation language (in other words, that is to say, to put it differently, or rather) for academic writing and speaking.',
    nextLessonBridge: 'Next: academic vocabulary for stance and hedging (appear to, tend to, seem to, is likely to) and advanced paragraph connectors — the final vocabulary sets before the B2.7 production tasks.',
  }),

  // ─── VOCABULARY-015: Academic stance and hedging verbs ───────────────────────
  createVocabularyLesson({
    ...common,
    id: 'B2-VOCABULARY-015',
    order: 15,
    title: 'Vocabulary: academic stance — hedging verbs, stance adverbs and epistemic language',
    objectives: [
      'Use hedging verbs (appear to, tend to, seem to, be likely to, be unlikely to) to qualify claims precisely.',
      'Use stance adverbs (arguably, reportedly, purportedly, ostensibly, presumably) in academic writing.',
      'Distinguish between degrees of certainty expressed by different hedging devices.',
      'Understand why hedging is a sign of intellectual rigour, not weakness.',
    ],
    teacherOpening: 'In academic writing, certainty is the enemy of credibility. Claiming something is absolutely true without qualification is a sign of poor academic thinking. The most respected academic writers hedge their claims — they say "this appears to", "the evidence tends to suggest", "it is likely that". This is not weakness or vagueness: it is intellectual honesty. It shows you understand the limits of evidence and the complexity of the world.',
    targetWords: [
      {
        word: 'appear to',
        partOfSpeech: 'verb phrase',
        definition: 'Seems to be the case based on available evidence; less certain than "is".',
        exampleSentences: [
          'Emissions appear to have peaked in several major economies.',
          'The policy appears to be having an effect, though the data is still preliminary.',
        ],
        certaintyLevel: 'Medium — suggests evidence but not conclusive proof',
      },
      {
        word: 'tend to',
        partOfSpeech: 'verb phrase',
        definition: 'Is generally or usually the case, with exceptions possible.',
        exampleSentences: [
          'Countries with weaker institutions tend to have higher inequality.',
          'Bilateral agreements tend to be reached faster than multilateral ones.',
        ],
        certaintyLevel: 'Medium — generalisation with acknowledged exceptions',
      },
      {
        word: 'seem to',
        partOfSpeech: 'verb phrase',
        definition: 'Appears to be the case from observation or impression, slightly more subjective than "appear to".',
        exampleSentences: [
          'The reform process seems to have stalled.',
          'Progress in this area seems, at best, incremental.',
        ],
        certaintyLevel: 'Medium — more subjective than "appear to"',
      },
      {
        word: 'is likely to / is unlikely to',
        partOfSpeech: 'verb phrase',
        definition: 'Has a high/low probability of occurring or being the case.',
        exampleSentences: [
          'The agreement is likely to be ratified by mid-year.',
          'A comprehensive multilateral solution is unlikely to emerge without significant reform of existing institutions.',
        ],
        certaintyLevel: 'Higher than "tend to" — closer to prediction',
      },
      {
        word: 'arguably',
        partOfSpeech: 'adverb',
        definition: 'It can be argued that; signals the writer is asserting a debatable interpretation as their view.',
        exampleSentences: [
          'This is, arguably, the most significant governance failure of the past decade.',
          'The evidence arguably suggests a structural rather than cyclical pattern.',
        ],
        note: '"Arguably" is not the same as "possibly". It signals intellectual claim, not uncertainty.',
      },
      {
        word: 'reportedly',
        partOfSpeech: 'adverb',
        definition: 'According to reports, without personal verification.',
        exampleSentences: [
          'The fund is reportedly running at less than a fifth of its required level.',
          'Several delegates reportedly walked out of the negotiations.',
        ],
      },
      {
        word: 'purportedly',
        partOfSpeech: 'adverb',
        definition: 'According to claims (often with a hint of scepticism about those claims).',
        exampleSentences: [
          'The measure purportedly reduces administrative burden, though critics dispute this.',
          'The data purportedly shows a strong correlation, but the methodology has been questioned.',
        ],
        note: '"Purportedly" carries more scepticism than "reportedly". Use when you want to signal doubt.',
      },
      {
        word: 'ostensibly',
        partOfSpeech: 'adverb',
        definition: 'Apparently or on the surface, often suggesting the reality may be different.',
        exampleSentences: [
          'The policy is ostensibly designed to reduce inequality, but critics argue it primarily benefits the wealthy.',
          'Ostensibly a trade agreement, the deal contained significant geopolitical provisions.',
        ],
        note: '"Ostensibly" almost always implies a gap between stated purpose and reality.',
      },
      {
        word: 'presumably',
        partOfSpeech: 'adverb',
        definition: 'Probably; based on reasonable assumption rather than direct evidence.',
        exampleSentences: [
          'Presumably, the decision reflects domestic political constraints.',
          'These estimates, presumably based on 2022 data, may not reflect more recent developments.',
        ],
      },
      {
        word: 'can be seen as',
        partOfSpeech: 'verb phrase',
        definition: 'Can be interpreted as; invites the reader to consider an interpretation.',
        exampleSentences: [
          'This development can be seen as evidence of a broader governance crisis.',
          'The failure of the negotiations can be seen as symptomatic of the wider decline in multilateralism.',
        ],
      },
    ],
    practiceExercises: [
      {
        type: 'hedging-spectrum',
        instruction: 'Rank these phrases from WEAKEST to STRONGEST certainty: (a) is likely to; (b) seem to; (c) arguably; (d) tend to; (e) is estimated to be; (f) ostensibly.',
        guidance: 'Think about what each phrase implies about the evidence and the writer\'s confidence.',
      },
      {
        type: 'production',
        instruction: 'Rewrite three of the following sentences to add appropriate hedging. Choose the hedging language that best matches the degree of certainty warranted.',
        items: [
          'Multilateral institutions are failing. (you are asserting a debatable interpretation)',
          'The policy reduces inequality. (the evidence is preliminary)',
          'The agreement will collapse. (you are making a probability assessment)',
          'The fund is underfunded. (you heard this but have not verified it)',
        ],
      },
    ],
    lessonRecap: 'You learned and practised academic stance language — hedging verbs (appear to, tend to, seem to, is likely to), stance adverbs (arguably, reportedly, purportedly, ostensibly, presumably) — and understood hedging as intellectual rigour, not vagueness.',
    nextLessonBridge: 'Final vocabulary lesson of B2.7: advanced paragraph connectors for addition, contrast, cause/effect and concession — the cohesive glue of formal argumentative writing.',
  }),

  // ─── VOCABULARY-016: Advanced paragraph connectors ───────────────────────────
  createVocabularyLesson({
    ...common,
    id: 'B2-VOCABULARY-016',
    order: 16,
    title: 'Vocabulary: advanced paragraph connectors — addition, contrast, cause/effect and concession',
    objectives: [
      'Use advanced connectors for addition (furthermore, moreover, in addition, what is more, not only...but also).',
      'Use contrast connectors with precision (however, nevertheless, conversely, by contrast, notwithstanding).',
      'Use cause/effect connectors (consequently, as a result, hence, thereby, accordingly).',
      'Use concession connectors (nonetheless, even so, that said, for all that, be that as it may) appropriately.',
      'Distinguish between connectors with similar meanings but different positions and register.',
    ],
    teacherOpening: 'Connectors do not just connect sentences — they signal the logical relationship between ideas. A B1 writer uses "but", "and", "so", "because". A B2 writer uses "nevertheless", "consequently", "notwithstanding", "thereby". The upgrade is not about using longer words; it is about precision: each connector in this lesson carries a specific logical relationship that "but" or "and" cannot express.',
    targetCategories: [
      {
        category: 'Addition',
        connectors: [
          { word: 'furthermore', note: 'Adds a point of equal or greater importance. Sentence-initial.' },
          { word: 'moreover', note: 'Stronger than "furthermore" — implies the added point strengthens the argument.' },
          { word: 'in addition', note: 'Neutral addition; can introduce a related but separate point.' },
          { word: 'what is more', note: 'Adds with a sense of escalation; more spoken register.' },
          { word: 'not only...but also', note: 'Emphasises a double point; formal; can trigger inversion: "Not only did X happen, but..."' },
        ],
        examples: [
          'The policy has failed to reduce emissions. Moreover, it has created perverse incentives that may actively hinder the transition.',
          'Not only have current pledges proved insufficient, but the implementation gap has also widened since 2015.',
        ],
      },
      {
        category: 'Contrast',
        connectors: [
          { word: 'however', note: 'The most neutral and widely used contrast connector; sentence-initial or mid-sentence after semicolon.' },
          { word: 'nevertheless', note: 'Stronger than "however" — the contrast persists despite what was said.' },
          { word: 'conversely', note: 'Introduces an opposite point — what is true in one case is reversed in the other.' },
          { word: 'by contrast', note: 'Compares two different things directly.' },
          { word: 'notwithstanding', note: 'Very formal; means "in spite of"; can precede a noun phrase or clause.' },
        ],
        examples: [
          'Absolute poverty has declined. Nevertheless, relative inequality within nations has grown substantially.',
          'Mitigation focuses on preventing future warming. Adaptation, by contrast, involves adjusting to changes already underway.',
          'Notwithstanding these limitations, the framework represents the most significant multilateral commitment to date.',
        ],
      },
      {
        category: 'Cause and effect',
        connectors: [
          { word: 'consequently', note: 'Formal result; slightly stronger than "therefore".' },
          { word: 'as a result', note: 'Neutral cause-effect; natural in formal writing.' },
          { word: 'hence', note: 'Very formal; more common in academic writing than speech.' },
          { word: 'thereby', note: 'Connects an action to its consequence within a single clause; formal.' },
          { word: 'accordingly', note: 'Used when a conclusion or action follows logically from what preceded it.' },
        ],
        examples: [
          'Trust between the Global North and South has eroded. Consequently, negotiations have become increasingly adversarial.',
          'The mechanism lacked enforcement, thereby rendering compliance effectively voluntary.',
          'The data clearly pointed to governance failure; accordingly, the report recommended structural reform.',
        ],
      },
      {
        category: 'Concession',
        connectors: [
          { word: 'nonetheless', note: 'Concedes a point but maintains the main argument; slightly more formal than "nevertheless".' },
          { word: 'even so', note: 'Informal-to-neutral; acknowledges a difficulty while maintaining the claim.' },
          { word: 'that said', note: 'Signals a qualification or concession; common in academic opinion writing.' },
          { word: 'for all that', note: 'Concedes a set of facts but insists the main conclusion holds; formal.' },
          { word: 'be that as it may', note: 'Very formal; grants the previous point but insists on moving forward; slightly archaic.' },
        ],
        examples: [
          'The costs of transition are significant. Nonetheless, the cost of inaction is estimated to be considerably higher.',
          'Progress on multilateral climate governance has been frustratingly slow. That said, the structural architecture for cooperation exists and can be built upon.',
          'The agreement has significant flaws. For all that, it remains the most ambitious binding commitment achieved to date.',
        ],
      },
    ],
    practiceExercises: [
      {
        type: 'connector-selection',
        instruction: 'Choose the most precise connector for each sentence. Justify your choice.',
        items: [
          'Renewable energy costs have fallen. _____, deployment in low-income countries remains slow. [however / conversely / thereby]',
          'The report identified governance failures. _____, it recommended five structural reforms. [accordingly / hence / furthermore]',
          'The pledges were ambitious. _____, the implementation has been inadequate. [that said / moreover / conversely]',
          'The policy failed to reduce inequality. _____, it appears to have deepened it in some regions. [moreover / nevertheless / hence]',
        ],
      },
      {
        type: 'paragraph-cohesion',
        instruction: 'Write a paragraph of 80–100 words on a global issue topic. Use at least four different connectors from this lesson — one from each category.',
      },
    ],
    recognitionPractice: [{ question: 'Advanced paragraph connectors — qual conector de adição é mais forte que furthermore?', options: ['moreover', 'in addition', 'what is more'], answer: 'moreover', explanation: 'Moreover indica que o ponto adicionado reforça o argumento — mais forte que furthermore.' }, { question: 'Advanced paragraph connectors — qual opção combina com "nevertheless"?', options: ['contrast connector', 'addition connector', 'cause/effect connector'], answer: 'contrast connector', explanation: 'Nevertheless é um conector de contraste, equivalente formal a "but/however" com mais ênfase.' }],
    lessonRecap: 'You learned and practised advanced paragraph connectors — addition (furthermore, moreover), contrast (nevertheless, conversely, notwithstanding), cause/effect (consequently, hence, thereby), concession (nonetheless, that said, for all that) — with guidance on precision, position and register.',
    nextLessonBridge: 'Now for the first production task: a 2-minute academic seminar contribution, using reference chains, complex clause structure, hedging and connectors in spoken academic English.',
  }),

  // ─── SPEAKING-009: Academic seminar contribution ──────────────────────────────
  createSpeakingLesson({
    ...common,
    id: 'B2-SPEAKING-009',
    order: 309,
    title: 'Speaking: Academic seminar contribution — cohesion, hedging and signposting',
    objectives: [
      'Deliver a structured 2-minute academic seminar contribution on a chosen topic.',
      'Use reference chains and cohesion devices naturally in speech.',
      'Apply hedging language (appear to, tend to, is likely to, arguably) appropriately.',
      'Use at least two advanced connectors (furthermore, nevertheless, consequently, that said) to organise the contribution.',
      'Demonstrate the signposting language typical of academic spoken discourse.',
    ],
    teacherOpening: 'In an academic seminar, you are expected not just to have an opinion but to present it with the clarity, precision and intellectual honesty of formal academic discourse. This means using cohesion devices so your points connect logically, hedging your claims appropriately, and signposting your structure so the listener can follow. Today\'s task replicates exactly this context.',
    modelPhrases: [
      'I would like to argue that the current evidence points in a somewhat different direction.',
      'Furthermore, the data appear to support the hypothesis that inequality has structural, not merely individual, causes.',
      'It should be noted that the findings tend to suggest, albeit cautiously, a correlation rather than a causation.',
      'Consequently, one might conclude that the policy implications are less straightforward than they first appear.',
      'That said, a more nuanced interpretation would acknowledge the limitations of the available data.',
      'In the light of these considerations, I would maintain that the issue warrants further investigation.',
    ],
    pronunciationFocus: {
      title: 'Pronunciation & shadowing',
      tips: [
        'Shadow: "Furthermore, the data appear to support the hypothesis that..." — stress FURthermore and hyPOThesis. Practise the hedged "appear to" as a quick unit.',
        '"Consequently, one might conclude that..." — stress CONsequently with clear falling intonation to signal a logical conclusion.',
        '"I would like to turn now to..." — practise the academic signposting pause after "now" before introducing the new topic.',
        '"The findings tend to suggest, albeit cautiously, that..." — practise embedding the hedge "albeit cautiously" with brief pauses on each side.',
      ],
    },
    warmUp: [
      task('Choose a topic from B2.6 or B2.7 (inequality, climate governance, multilateralism, media literacy, cultural identity). Spend 90 seconds organising your contribution into three parts: (1) opening claim, (2) evidence + analysis, (3) qualified conclusion.'),
    ],
    signpostingLanguage: {
      title: 'Signposting language for academic spoken contributions',
      items: [
        { stage: 'Opening', phrases: ['I would like to argue that...', 'My central claim is...', 'It is worth emphasising at the outset that...', 'I want to take as my starting point the observation that...'] },
        { stage: 'Adding a point', phrases: ['Furthermore, it should be noted that...', 'What is more, the evidence suggests...', 'In addition to this, there is a significant body of research showing...'] },
        { stage: 'Contrasting', phrases: ['Nevertheless, there is a counterargument worth considering.', 'That said, I think it is important to acknowledge that...', 'By contrast, when we look at the evidence from X...'] },
        { stage: 'Hedging', phrases: ['This appears to suggest that...', 'The evidence tends to indicate...', 'It would arguably be premature to conclude that...', 'Whether this is a structural or cyclical phenomenon remains, to some extent, unclear.'] },
        { stage: 'Concluding', phrases: ['On balance, I would argue that...', 'The implication of this analysis is...', 'What this suggests, taken together, is...', 'It is worth noting, in conclusion, that...'] },
      ],
    },
    guidedPractice: [
      task('Deliver a 2-minute academic seminar contribution on your chosen topic. Use the signposting language above and include: one reference chain (this phenomenon, such trends), one hedging expression, one advanced connector, and one it-extraposition or nominal clause structure.', 'Record yourself. Aim for academic register throughout — formal vocabulary, no contractions, precise claim.'),
    ],
    speakingChecklist: [
      'Clear academic claim stated at the outset.',
      'Evidence or reasoning provided in the middle section.',
      'At least one cohesion device (this, such trends, the former/latter, do so).',
      'At least one hedging expression (appears to, tend to, is likely to, arguably).',
      'At least one advanced connector (furthermore, nevertheless, consequently, that said).',
      'At least one it-extraposition or "What X shows is..." structure.',
      'Formal register maintained throughout — no contractions, academic vocabulary.',
      'Qualified, nuanced conclusion.',
    ],
    freeSpeaking: [
      { topic: 'Multilateral institutions are necessary but insufficient for addressing global challenges. Develop this claim in an academic seminar contribution of 2 minutes.' },
      { topic: 'The relationship between economic growth and inequality is more complex than either optimists or pessimists acknowledge. Argue this position academically.' },
    ],
    lessonRecap: 'You delivered a 2-minute academic seminar contribution using cohesion devices, hedging language, advanced connectors, signposting structures and academic register in a formal spoken context.',
    nextLessonBridge: 'In B2.7 Part 2: reading and listening to dense academic texts, a paraphrase/summary speaking task, and two writing tasks that bring together the full B2.7 toolkit.',
  }),

]);

export const B2_DEEP_ACADEMIC_PART1_BY_PILLAR = Object.freeze({
  grammar: B2_DEEP_ACADEMIC_PART1.filter(l => l.pillar === 'grammar'),
  vocabulary: B2_DEEP_ACADEMIC_PART1.filter(l => l.pillar === 'vocabulary'),
  speaking: B2_DEEP_ACADEMIC_PART1.filter(l => l.pillar === 'speaking'),
});
