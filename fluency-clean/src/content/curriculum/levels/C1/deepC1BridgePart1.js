import { createGrammarLesson, createVocabularyLesson, createSpeakingLesson } from '../../../schemas/index.js';

const level = 'C1';
const status = 'ready';
const common = { level, status, estimatedMinutes: 70, tags: ['c1-1', 'bridge', 'advanced', 'deep-approved-target'] };

function task(instruction, note = '', expected = '') { return { instruction, note, expected }; }

export const C1_DEEP_BRIDGE_PART1 = Object.freeze([

  // ─── GRAMMAR-001: Advanced conditionals and subjunctive ──────────────────────
  createGrammarLesson({
    ...common,
    id: 'C1-GRAMMAR-001',
    order: 1,
    title: 'Advanced conditionals: subjunctive, "were to", and all conditional types at C1',
    objectives: [
      'Use the subjunctive mood in formal recommendations and requirements (It is essential that he be..., I suggest you come...).',
      'Use "were to" + infinitive for hypothetical future conditionals (If this were to happen...).',
      'Produce all five conditional types fluently: zero, first, second, third and mixed.',
      'Understand the discourse function of conditional structures in academic and formal argument.',
    ],
    teacherOpening: 'At B2 you mastered mixed conditionals. At C1, the shift is not about learning new types — it is about fluency, precision and range. C1 users deploy all conditional structures without effort, choose between them for rhetorical effect, and use formal patterns (the subjunctive, "were to") that are vanishingly rare in spoken informal English but common in formal writing and professional speech.',
    portugueseContrast: [task('Em Advanced conditionals: subjunctive, "were to", and all conditional types at C1, observe que a estrutura do inglês difere da ordem natural do português.'), task('Não traduza literalmente; identifique o padrão do inglês antes de produzir.')], 
    whyItMatters: 'Advanced conditionals appear in formal recommendations, hypothetical argument, academic hedging and policy writing. The subjunctive, in particular, is a marker of formal register: it appears in academic journals, legal documents, professional correspondence and political speech.',
    differenceFromA2: 'B2: "If we had acted sooner, the situation would be different." C1: "Were we to act decisively now, there remains a narrow window for meaningful intervention — a window that is, however, closing rapidly."',
    grammarTable: {
      headers: ['Structure', 'Formula', 'Use', 'Example'],
      rows: [
        ['Subjunctive in recommendations', 'It is + adj + that + subject + base form (no "s")', 'Formal requirement/recommendation', 'It is essential that every participant submit their report by Friday.'],
        ['Subjunctive in suggestions', 'suggest/recommend/propose/insist + that + subject + base form', 'Formal suggestion', 'The committee recommends that the framework be reviewed annually.'],
        ['Were to + infinitive', 'If + subject + were to + base infinitive', 'Hypothetical future (formal)', 'If this policy were to be implemented, the consequences could be severe.'],
        ['Were + subject + to', 'Inverted: Were + subject + to + infinitive (no "if")', 'Very formal hypothetical', 'Were the government to adopt this approach, it would represent a significant departure.'],
        ['Should + subject + verb', 'Inverted: Should + subject + base form (no "if")', 'Formal condition (open future)', 'Should you encounter any difficulties, please do not hesitate to contact us.'],
        ['Had + subject + pp (inverted)', 'Inverted: Had + subject + pp (no "if")', 'Formal third conditional', 'Had the warnings been heeded, the crisis might have been averted.'],
        ['Zero conditional (general)', 'If + present simple + present simple', 'General truth, scientific law', 'If temperatures rise above 1.5°C, feedback loops accelerate significantly.'],
        ['Mixed conditional (past → present)', 'If + past perfect + would + infinitive', 'Past cause, present result', 'If the treaty had been ratified, the situation would be very different now.'],
      ],
    },
    subjunctiveFocus: {
      title: 'The B2→C1 shift: using the subjunctive',
      note: 'The English subjunctive is the base form of a verb — it has NO -s in the third person singular: "It is vital that he be informed" (not "is"). "It is recommended that the committee meet" (not "meets"). It is ONLY used in formal writing and speech after verbs of recommendation, requirement, suggestion, proposal, command — and in fixed phrases (as it were, come what may, if need be, lest, be that as it may).',
      examples: [
        { formal: 'It is essential that the data be independently verified.', informal: 'The data must be independently verified.' },
        { formal: 'I suggest that the committee revisit this decision.', informal: 'I think the committee should look at this again.' },
        { formal: 'The protocol requires that all signatories report annually.', informal: 'All signatories need to report every year.' },
        { formal: 'Were the budget to be cut, the consequences would be significant.', informal: 'If they cut the budget, there will be serious consequences.' },
      ],
    },
    teacherExamples: [
      'It is imperative that the findings be presented to the board before any decision is made.',
      'Were the proposed legislation to be enacted in its current form, significant constitutional questions would arise.',
      'Had the initial risk assessment been conducted more rigorously, several of the identified failures might have been anticipated.',
      'Should further evidence emerge, the committee has the authority to reconvene.',
      'The protocol stipulates that all submitted data be anonymised prior to analysis.',
    ],
    practiceExercises: [
      {
        type: 'transformation',
        instruction: 'Rewrite each sentence in the more formal register indicated.',
        items: [
          { original: 'If they decide to proceed, there will be significant risks.', target: 'Were to (formal hypothetical)', hint: 'Were they to decide...' },
          { original: 'I think they should reconsider the timeline.', target: 'Subjunctive recommendation', hint: 'I recommend that the timeline be reconsidered.' },
          { original: 'If we hadn\'t missed the deadline, we would have got the contract.', target: 'Had-inversion', hint: 'Had we not missed the deadline...' },
          { original: 'If you need anything else, let me know.', target: 'Should-inversion', hint: 'Should you require anything further...' },
        ],
      },
      {
        type: 'production',
        instruction: 'Write THREE sentences on a topic of your choice using: (1) the subjunctive in a formal recommendation; (2) "were to" for a hypothetical; (3) had-inversion for a counterfactual.',
      },
    ],
    lessonRecap: 'You reviewed and deepened all conditional types, focusing on the C1 formal patterns: the subjunctive (It is essential that X be), "were to" hypotheticals, and inverted conditionals (Were X to..., Had X..., Should X...).',
    nextLessonBridge: 'Next: advanced inversion for fronted adverbials — the full C1 range of negative and restrictive inversions that go beyond the B2 "Not only...but also" pattern.',
  }),

  // ─── GRAMMAR-002: Advanced inversion — fronted adverbials ────────────────────
  createGrammarLesson({
    ...common,
    id: 'C1-GRAMMAR-002',
    order: 2,
    title: 'Advanced inversion: fronted adverbials and negative/restrictive structures at C1',
    objectives: [
      'Use negative adverbial inversion structures (Under no circumstances, On no account, In no way, At no point, Seldom, Rarely, Never have I).',
      'Use restrictive inversion structures (Only if, Only when, Only after, Only by, Only then).',
      'Use fronted prepositional phrases for dramatic or emphatic effect in formal writing.',
      'Distinguish between structures that require inversion and those that do not.',
    ],
    teacherOpening: 'B2 introduced "Not only...but also" and "Rarely does". C1 extends this to the full range of negative and restrictive fronting — a key feature of formal academic, journalistic and literary English. These structures do more than show off grammar: they place emphasis at the beginning of the sentence, creating rhetorical contrast and weight.',
    portugueseContrast: [task('Em Advanced inversion: fronted adverbials and negative/restrictive structures at C1, observe que a estrutura do inglês difere da ordem natural do português.'), task('Não traduza literalmente; identifique o padrão do inglês antes de produzir.')], 
    whyItMatters: 'Negative and restrictive inversion is common in academic and literary English, quality journalism and political speech. At C1 level, you should be able to produce these naturally as a rhetorical choice, not just as a grammar exercise.',
    differenceFromA2: 'B2: "I have never seen such a clear example of policy failure." C1: "Never in my professional experience have I encountered so unambiguous an example of systemic governance failure."',
    grammarTable: {
      headers: ['Fronted expression', 'Inversion structure', 'Register', 'Example'],
      rows: [
        ['Never', 'Never + have/has/had + subject + pp', 'Formal/literary', 'Never has the scientific consensus been so clear, nor the political response so inadequate.'],
        ['Rarely/Seldom', 'Rarely/Seldom + aux + subject', 'Formal', 'Seldom does a single policy failure so comprehensively expose the weaknesses of an entire governance system.'],
        ['Under no circumstances', 'Under no circumstances + aux + subject', 'Formal/legal', 'Under no circumstances should personal data be shared without explicit consent.'],
        ['On no account', 'On no account + aux + subject', 'Formal', 'On no account are participants permitted to share their login credentials.'],
        ['In no way', 'In no way + aux + subject', 'Formal/emphatic', 'In no way does this finding contradict the conclusions of the earlier study.'],
        ['At no point', 'At no point + did/was + subject', 'Formal/legal', 'At no point did the committee deviate from the established protocol.'],
        ['Not until', 'Not until + clause + aux + subject', 'Formal', 'Not until the full data set was analysed did the pattern become apparent.'],
        ['Only if', 'Only if + clause + aux + subject', 'Formal', 'Only if governments adopt binding targets will meaningful progress be achieved.'],
        ['Only when', 'Only when + clause + aux + subject', 'Formal', 'Only when the underlying governance failures are addressed will the symptoms improve.'],
        ['Only after', 'Only after + clause + aux + subject', 'Formal', 'Only after extensive consultation was the policy introduced.'],
        ['Only by', 'Only by + -ing + can/will + subject', 'Formal', 'Only by fundamentally rethinking the incentive structure can lasting reform be achieved.'],
        ['So + adjective', 'So + adj + be/was + subject + that', 'Formal/literary', 'So severe were the governance failures that recovery took more than a decade.'],
        ['Such + noun', 'Such + be/was + noun + that', 'Formal', 'Such was the scale of the crisis that conventional policy responses proved insufficient.'],
      ],
    },
    teacherExamples: [
      'Never before has the gap between scientific consensus and political action been so starkly apparent.',
      'Only by reforming the institutional architecture of global governance can we hope to address challenges of this magnitude.',
      'Under no circumstances should the findings of this investigation be disclosed before the formal review is complete.',
      'So complex were the interactions between the variables that no single model could adequately capture them.',
      'Not until the final quarter did the true scale of the financial exposure become apparent.',
    ],
    practiceExercises: [
      {
        type: 'transformation',
        instruction: 'Rewrite each sentence using a fronted inversion structure for emphasis.',
        items: [
          { original: 'I have rarely seen such a comprehensive analysis of the problem.', hint: 'Rarely have I seen...' },
          { original: 'The results were so unexpected that the entire team was surprised.', hint: 'So unexpected were...' },
          { original: 'Progress will only happen if all major powers cooperate.', hint: 'Only if all major powers...' },
          { original: 'You should not, under any circumstances, share these findings publicly.', hint: 'Under no circumstances should...' },
          { original: 'The policy did not succeed until all stakeholders were engaged.', hint: 'Not until all stakeholders...' },
        ],
      },
      {
        type: 'production',
        instruction: 'Write a formal paragraph of 80–100 words on a global issue. Include at least TWO different inversion structures for rhetorical effect.',
      },
    ],
    lessonRecap: 'You practised the full C1 range of negative and restrictive inversion (Under no circumstances, Only if/when/by, Not until, So + adj, Such + noun) as tools of formal rhetorical emphasis.',
    nextLessonBridge: 'Next: complex verb aspect at C1 — the subtle distinctions between simple, continuous and perfect forms that B2 users often collapse, but C1 users deploy with precision.',
  }),

  // ─── GRAMMAR-003: Complex verb aspect at C1 ──────────────────────────────────
  createGrammarLesson({
    ...common,
    id: 'C1-GRAMMAR-003',
    order: 3,
    title: 'Complex verb aspect at C1: perfect continuous, stative verbs and aspect for perspective',
    objectives: [
      'Use perfect continuous forms to describe long-term processes up to the present (has been deteriorating for decades).',
      'Understand when C1 writers use stative verbs in continuous for special semantic effect.',
      'Choose between simple and continuous aspect to express completion vs ongoing process, and perspective difference.',
      'Use aspect choices to hedge claims or express tentativeness in formal writing.',
    ],
    teacherOpening: 'At B1-B2, aspect is mainly about timelines: simple for completed facts, continuous for ongoing actions. At C1, aspect becomes a rhetorical tool. "The economy has declined" vs "The economy has been declining" — both are grammatically correct, but they say different things: the first emphasises a result; the second emphasises a process. C1 writers make these choices deliberately.',
    portugueseContrast: [task('Em Complex verb aspect at C1: perfect continuous, stative verbs and aspect for perspective, observe que a estrutura do inglês difere da ordem natural do português.'), task('Não traduza literalmente; identifique o padrão do inglês antes de produzir.')], 
    whyItMatters: 'In academic and formal writing, the choice between simple and continuous aspect shapes how a claim is presented — as a settled fact or an ongoing trend, as complete or still in progress. Understanding this allows you to read formal English with greater precision and write it with greater effect.',
    differenceFromA2: 'B2: "Living standards have fallen." C1: "Living standards have been falling steadily for the past two decades — a trend that, if unaddressed, appears likely to intensify." The continuous framing emphasises the process and opens space for the qualification that follows.',
    grammarTable: {
      headers: ['Form', 'Meaning/use', 'C1 effect', 'Example'],
      rows: [
        ['Present perfect simple', 'Completed action with present relevance', 'Emphasises result/completion', 'Global temperatures have risen by 1.2°C. [completed measurement]'],
        ['Present perfect continuous', 'Ongoing process up to now', 'Emphasises process, duration, ongoing nature', 'Global temperatures have been rising at an accelerating rate. [ongoing trend]'],
        ['Past perfect continuous', 'Ongoing process before a past moment', 'Sets up context for a past event', 'The situation had been deteriorating for months before the crisis became publicly apparent.'],
        ['Continuous for tentativeness', 'Continuous with "seem/appear/suggest"', 'Softer, more hedged claim', 'The evidence has been suggesting that current targets are insufficient. [more tentative than "suggests"]'],
        ['Stative + continuous (special effect)', 'Usually stative verbs in continuous for special meaning', 'Signals change or temporary state', '"I\'m finding this increasingly difficult" (not just finding — it\'s changing/temporary)'],
        ['Future perfect continuous', 'Process completed by a future point', 'Academic projection', 'By 2050, sea levels will have been rising for a century.'],
        ['Habitual/background vs foreground', 'Simple for habitual or background; continuous for foreground', 'Narrative effect', 'He was working on the report [background] when the announcement came [foreground].'],
      ],
    },
    teacherExamples: [
      'Inequality has been widening within OECD economies since the 1980s, a trend that conventional policy responses have consistently failed to reverse.',
      'The committee had been reviewing the proposal for six months before the decision was finally taken.',
      'The technology appears to have been underperforming against its stated benchmarks for at least two years.',
      'What is striking is not that the model has failed, but that it has been failing in exactly the way critics predicted.',
      'I\'ve been thinking about the counterargument — it\'s actually more compelling than I initially assumed.',
    ],
    practiceExercises: [
      {
        type: 'aspect-distinction',
        instruction: 'Choose the better form and explain the difference in meaning.',
        items: [
          { a: 'Displacement has increased.', b: 'Displacement has been increasing.' },
          { a: 'She wrote the report.', b: 'She has been writing the report.' },
          { a: 'The policy deteriorated before the review.', b: 'The policy had been deteriorating before the review.' },
        ],
      },
      {
        type: 'production',
        instruction: 'Write three sentences about a global trend using: (1) present perfect continuous; (2) past perfect continuous; (3) present perfect simple. Explain why you chose each aspect.',
      },
    ],
    lessonRecap: 'You deepened your understanding of verb aspect at C1 — distinguishing result (simple) from process (continuous), using perfect continuous for ongoing trends, and understanding the rhetorical implications of aspect choice in formal writing.',
    nextLessonBridge: 'Next: C1 vocabulary — advanced register, Latinate alternatives, and the C1 collocations and chunks that mark the shift from competent B2 to genuinely advanced C1 production.',
  }),

  // ─── VOCABULARY-001: Advanced register and Latinate vocabulary ───────────────
  createVocabularyLesson({
    ...common,
    id: 'C1-VOCABULARY-001',
    order: 1,
    title: 'Vocabulary: advanced register — Latinate alternatives, academic precision, formal connectors',
    objectives: [
      'Use 12 high-register Latinate and formal vocabulary items with precision.',
      'Recognise when formal register requires a Latin-derived alternative to a common word.',
      'Understand insofar as, hitherto, albeit, notwithstanding, inasmuch as in academic use.',
      'Apply these items in formal written and spoken production.',
    ],
    teacherOpening: 'C1 vocabulary is not about knowing more words — it is about having access to a wider register range and knowing which word fits which context. At C1, you read documents where "begin" is "commence", "show" is "demonstrate", "about" is "pertaining to", "despite" is "notwithstanding". You need to understand AND produce these forms, and to do so without sounding stilted or affected.',
    targetWords: [
      {
        word: 'albeit',
        partOfSpeech: 'conjunction',
        definition: 'Although; even though — used to introduce a concession in a formal, condensed way.',
        exampleSentences: [
          'The framework represents progress, albeit modest progress.',
          'The policy has produced results, albeit at considerable cost to the most vulnerable.',
        ],
        collocations: ['albeit modest / albeit limited / albeit slowly / albeit imperfectly'],
        note: '"Albeit" is used to concede a qualification mid-sentence — more elegant than a new clause.',
      },
      {
        word: 'insofar as',
        partOfSpeech: 'conjunction',
        definition: 'To the extent that; in the degree that.',
        exampleSentences: [
          'The policy is sound insofar as it addresses the structural causes of inequality.',
          'The argument is compelling insofar as it rests on empirical evidence, but weaker where it relies on assumption.',
        ],
        collocations: ['insofar as it relates to / insofar as is practicable / insofar as can be determined'],
      },
      {
        word: 'hitherto',
        partOfSpeech: 'adverb',
        definition: 'Until now; up to this point in time — formal and slightly literary.',
        exampleSentences: [
          'This represents a hitherto underexplored dimension of the governance debate.',
          'Hitherto, the relationship between the two organisations had been largely cooperative.',
        ],
        collocations: ['hitherto overlooked / hitherto unknown / hitherto resistant to'],
      },
      {
        word: 'notwithstanding',
        partOfSpeech: 'preposition/adverb',
        definition: 'Despite; in spite of (used before a noun or clause, or at the end of a clause).',
        exampleSentences: [
          'Notwithstanding these limitations, the study represents the most comprehensive analysis available.',
          'The agreement was reached, the significant differences in national interest notwithstanding.',
        ],
        collocations: ['notwithstanding these challenges / notwithstanding the evidence / this notwithstanding'],
      },
      {
        word: 'inasmuch as',
        partOfSpeech: 'conjunction',
        definition: 'To the extent that; in so far as — highly formal, common in legal and academic writing.',
        exampleSentences: [
          'The claim is defensible inasmuch as it is based on the available evidence.',
          'The institution bears responsibility inasmuch as it failed to act on the early warnings.',
        ],
        collocations: ['inasmuch as this is the case / inasmuch as it relates to / inasmuch as can be determined'],
      },
      {
        word: 'propound',
        partOfSpeech: 'verb',
        definition: 'To put forward or propose (a theory, idea or argument) for consideration.',
        exampleSentences: [
          'The economist propounded a theory of structural inequality that challenged mainstream assumptions.',
          'Several competing frameworks have been propounded, none of which has achieved consensus.',
        ],
        collocations: ['propound a theory / propound a view / propound an argument'],
        register: 'Formal academic — slightly elevated even within C1 writing.',
      },
      {
        word: 'espouse',
        partOfSpeech: 'verb',
        definition: 'To adopt, support or embrace (a cause, belief or policy).',
        exampleSentences: [
          'The organisation has long espoused a multilateral approach to climate governance.',
          'The values espoused in the founding charter are increasingly at odds with institutional practice.',
        ],
        collocations: ['espouse a cause / espouse a position / espouse values / espoused by'],
      },
      {
        word: 'commensurate',
        partOfSpeech: 'adjective',
        definition: 'Corresponding in size, extent or degree; proportionate.',
        exampleSentences: [
          'The resources allocated to the project were not commensurate with its stated ambitions.',
          'A salary commensurate with experience and qualifications will be offered.',
        ],
        collocations: ['commensurate with / commensurate response / commensurate funding'],
      },
      {
        word: 'precipitate',
        partOfSpeech: 'verb/adjective',
        definition: '(v) To cause something to happen suddenly or prematurely; (adj) done suddenly without adequate consideration.',
        exampleSentences: [
          'The announcement precipitated a sharp fall in investor confidence.',
          'A precipitate withdrawal from the negotiations would undermine years of diplomatic effort.',
        ],
        collocations: ['precipitate a crisis / precipitate action / precipitate decision'],
      },
      {
        word: 'predicated on',
        partOfSpeech: 'adjective phrase',
        definition: 'Based on or founded on a particular assumption or condition.',
        exampleSentences: [
          'The entire strategy is predicated on the assumption that market mechanisms will deliver the required outcomes.',
          'This argument is predicated on an empirically questionable premise.',
        ],
        collocations: ['predicated on the assumption that / predicated on a flawed premise / entirely predicated on'],
      },
      {
        word: 'contingent on',
        partOfSpeech: 'adjective phrase',
        definition: 'Dependent on something uncertain or conditional.',
        exampleSentences: [
          'The success of the initiative is contingent on sustained political commitment.',
          'Progress is contingent on resolving the underlying governance disputes.',
        ],
        collocations: ['contingent on cooperation / contingent on X happening / entirely contingent'],
      },
      {
        word: 'germane',
        partOfSpeech: 'adjective',
        definition: 'Relevant and appropriate to the matter in hand.',
        exampleSentences: [
          'Several points were raised that were not strictly germane to the question under consideration.',
          'The distinction is germane: it changes the conclusions that can legitimately be drawn.',
        ],
        collocations: ['germane to the issue / directly germane / not entirely germane'],
      },
    ],
    practiceExercises: [
      {
        type: 'register-rewrite',
        instruction: 'Rewrite each sentence replacing the underlined word(s) with a C1 formal equivalent from the vocabulary list.',
        items: [
          { informal: 'The results, though not perfect, represent real progress.', target: 'albeit' },
          { informal: 'Everything depends on whether the parties can agree.', target: 'contingent on' },
          { informal: 'The policy is based on the idea that markets are self-correcting.', target: 'predicated on' },
          { informal: 'Despite these problems, the agreement holds.', target: 'notwithstanding' },
          { informal: 'Up until now, this has been an unexplored area.', target: 'hitherto' },
        ],
      },
      {
        type: 'production',
        instruction: 'Write three formal sentences — one on each of the following topics — using at least one C1 vocabulary item per sentence: (1) climate governance; (2) economic inequality; (3) academic research methodology.',
      },
    ],
    lessonRecap: 'You learned 12 C1 advanced register vocabulary items — albeit, insofar as, hitherto, notwithstanding, inasmuch as, propound, espouse, commensurate, precipitate, predicated on, contingent on, germane — and practised producing them in formal written contexts.',
    nextLessonBridge: 'Next: C1 collocations and chunks — the high-frequency multi-word expressions that mark fluent C1 production across academic, professional and argumentative discourse.',
  }),

  // ─── VOCABULARY-002: C1 collocations and argumentative chunks ────────────────
  createVocabularyLesson({
    ...common,
    id: 'C1-VOCABULARY-002',
    order: 2,
    title: 'Vocabulary: C1 collocations and argumentative chunks',
    objectives: [
      'Learn and use 12 high-frequency C1 multi-word expressions for argument and analysis.',
      'Distinguish between collocations with similar meanings (cast doubt on vs call into question vs challenge).',
      'Use verb-noun collocations that are markers of C1 academic register.',
      'Produce these expressions naturally in spoken and written argumentative discourse.',
    ],
    teacherOpening: 'At C1, vocabulary knowledge is collocational, not just definitional. It is not enough to know that "doubt" means uncertainty — you need to know that you "cast doubt on" a claim, "raise doubts about" a hypothesis, and "entertain doubts about" a conclusion. These are not interchangeable: each combination has its own register and connotation. The 12 chunks in this lesson are among the most useful for C1 academic and argumentative production.',
    targetWords: [
      {
        word: 'cast doubt on',
        partOfSpeech: 'verb phrase',
        definition: 'To make something seem less certain or reliable.',
        exampleSentences: [
          'The new data cast serious doubt on the assumptions underpinning the original study.',
          'These findings cast doubt on the claim that inequality is an inevitable consequence of growth.',
        ],
        collocations: ['cast doubt on a claim / cast serious/considerable doubt / cast doubt on the validity of'],
        notToConfuse: 'cast doubt on (introduce uncertainty) vs call into question (challenge the entire premise)',
      },
      {
        word: 'call into question',
        partOfSpeech: 'verb phrase',
        definition: 'To challenge or raise doubts about something fundamental.',
        exampleSentences: [
          'These results call into question the fundamental assumption that market mechanisms can deliver equitable outcomes.',
          'The evidence calls the entire framework into question.',
        ],
        collocations: ['call into question the validity / call the entire approach into question / seriously call into question'],
      },
      {
        word: 'give rise to',
        partOfSpeech: 'verb phrase',
        definition: 'To cause or produce something (typically a problem, concern or phenomenon).',
        exampleSentences: [
          'The uneven distribution of gains from globalisation gave rise to the political backlash that followed.',
          'Rapid technological change gives rise to governance challenges that existing institutions were not designed to address.',
        ],
        collocations: ['give rise to concerns / give rise to a new phenomenon / give rise to questions about'],
      },
      {
        word: 'shed light on',
        partOfSpeech: 'verb phrase',
        definition: 'To clarify or help explain something previously obscure.',
        exampleSentences: [
          'This study sheds considerable light on the mechanisms by which inequality affects social mobility.',
          'The newly released documents shed light on the internal deliberations that preceded the decision.',
        ],
        collocations: ['shed light on the causes of / shed considerable/new light on / shed some light on'],
      },
      {
        word: 'run counter to',
        partOfSpeech: 'verb phrase',
        definition: 'To be contrary to or in conflict with.',
        exampleSentences: [
          'This finding runs counter to the prevailing consensus and deserves careful scrutiny.',
          'The policy runs counter to the stated objectives of the framework it is supposed to support.',
        ],
        collocations: ['run counter to expectations / run directly counter to / run counter to the evidence'],
      },
      {
        word: 'bear out',
        partOfSpeech: 'verb phrase',
        definition: 'To confirm or support (a claim or theory).',
        exampleSentences: [
          'The subsequent data bore out the hypothesis that structural reform was necessary.',
          'Whether the optimistic projections are borne out in practice remains to be seen.',
        ],
        collocations: ['bear out the claim / borne out by the evidence / fully bear out'],
      },
      {
        word: 'draw on',
        partOfSpeech: 'verb phrase',
        definition: 'To use (experience, knowledge, resources) as a source.',
        exampleSentences: [
          'The analysis draws on research from multiple disciplines to construct a more complete picture.',
          'The author draws heavily on archival material that has not previously been examined.',
        ],
        collocations: ['draw on research / draw on experience / draw on a range of sources'],
      },
      {
        word: 'bring to bear',
        partOfSpeech: 'verb phrase',
        definition: 'To apply force, pressure, influence or knowledge to a situation.',
        exampleSentences: [
          'The analysis brings to bear the full range of economic, social and political evidence.',
          'Significant diplomatic pressure was brought to bear on the parties during the negotiations.',
        ],
        collocations: ['bring to bear on / bring considerable pressure to bear / bring expertise to bear'],
      },
      {
        word: 'make inroads into',
        partOfSpeech: 'verb phrase',
        definition: 'To begin to have a significant effect on or gain ground in (often a difficult area).',
        exampleSentences: [
          'The initiative has made significant inroads into reducing child mortality rates.',
          'Progress in making inroads into structural inequality has been frustratingly slow.',
        ],
        collocations: ['make inroads into poverty / significant inroads / make inroads into the problem'],
      },
      {
        word: 'hold true',
        partOfSpeech: 'verb phrase',
        definition: 'To remain valid or applicable.',
        exampleSentences: [
          'This principle holds true across a wide range of economic contexts.',
          'Whether the findings hold true outside the specific conditions of the study is an open question.',
        ],
        collocations: ['hold true for / generally holds true / hold true in all contexts'],
      },
      {
        word: 'take issue with',
        partOfSpeech: 'verb phrase',
        definition: 'To disagree with or challenge (a claim, position or statement).',
        exampleSentences: [
          'I take issue with the author\'s characterisation of this as a "technical" rather than a political problem.',
          'Several reviewers have taken issue with the methodology employed in the study.',
        ],
        collocations: ['take issue with the claim that / strongly take issue with / take issue with the framing'],
      },
      {
        word: 'stand in contrast to',
        partOfSpeech: 'verb phrase',
        definition: 'To be noticeably different from; to form a contrast with.',
        exampleSentences: [
          'This approach stands in stark contrast to the neoliberal consensus that dominated policy thinking for three decades.',
          'The rhetoric stands in sharp contrast to the institutional realities on the ground.',
        ],
        collocations: ['stand in (stark/sharp) contrast to / stand in notable contrast to'],
      },
    ],
    practiceExercises: [
      {
        type: 'collocation-completion',
        instruction: 'Complete each sentence with the correct collocation from the vocabulary list.',
        items: [
          'The new evidence _____ doubt on the widely accepted theory that inequality inevitably declines with economic growth.',
          'This approach _____ directly _____ the established consensus, which makes it both provocative and important.',
          'The study _____ on decades of longitudinal data to construct an unusually robust analysis.',
          'Whether the optimistic projections will _____ _____ in practice depends, crucially, on political will.',
          'I _____ _____ _____ the suggestion that this is a purely technical problem with a purely technical solution.',
        ],
      },
      {
        type: 'production',
        instruction: 'Write a formal paragraph of 100–130 words on any topic from C1 or B2. Use at least FOUR different collocations from this lesson.',
      },
    ],
    lessonRecap: 'You learned 12 C1 argumentative collocations and chunks — cast doubt on, call into question, give rise to, shed light on, run counter to, bear out, draw on, bring to bear, make inroads into, hold true, take issue with, stand in contrast to.',
    nextLessonBridge: 'Now for the C1 Bridge Speaking task — a 3-minute extended argument using all the C1 grammar and vocabulary introduced in this module.',
  }),

  // ─── SPEAKING-001: C1 Extended argument ──────────────────────────────────────
  createSpeakingLesson({
    ...common,
    id: 'C1-SPEAKING-001',
    order: 1,
    title: 'Speaking: C1 extended argument — 3 minutes with advanced grammar and collocations',
    objectives: [
      'Deliver a fluent, well-structured 3-minute argument on a C1-level topic.',
      'Use at least two C1 grammar structures (subjunctive, inversion, complex aspect, "were to") naturally in speech.',
      'Incorporate at least four C1 vocabulary items or collocations from C1.1.',
      'Maintain formal register and demonstrate C1 rhetorical organisation throughout.',
    ],
    teacherOpening: 'The key difference between B2 and C1 speaking is not what you know — it is the degree to which what you know has become automatic. A B2 speaker thinks about structures; a C1 speaker thinks about ideas, and the structures come. Today\'s task pushes you toward that C1 fluency: you have three minutes to argue a position using C1 grammar and vocabulary, but the focus is on the argument — not on displaying individual structures.',
    modelPhrases: [
      'Were multilateral institutions to be dissolved today, the resulting governance vacuum would be difficult to fill.',
      'Not only does this undermine the principle of universality, but it also calls into question the legitimacy of existing frameworks.',
      'The qualification I would enter is that effectiveness and legitimacy are not always aligned.',
      'Hitherto, the most effective reforms have come from within existing institutions rather than from revolutionary alternatives.',
      'It is precisely because the stakes are so high that a nuanced rather than a binary position is required.',
      'On balance, I would argue that reform rather than replacement offers the more viable path forward.',
    ],
    pronunciationFocus: {
      title: 'Pronunciation & shadowing',
      tips: [
        'Shadow: "Were multilateral institutions to be dissolved today, what would be lost?" — practise the formal subjunctive opening: stress WERE and disSO LVED. Keep "to be" weak.',
        '"Hitherto, the most effective changes..." — pronounce hitherto /ˌhɪð.əˈtuː/ (stress on final syllable). Pause after to signal the temporal scope.',
        '"Not only does this undermine X, but it also calls into question Y." — rising intonation on "X" and falling on "Y" to mark the two-part structure.',
        '"The qualification I would enter is that..." — stress QUALification and ENter. Practise the academic register pause before the qualification itself.',
      ],
    },
    warmUp: [
      task('Choose a topic that you know well and feel strongly about. Spend 2 minutes planning a 3-minute argument. Do not write a script — write three to five anchor words or phrases per section: position / evidence / counterargument / conclusion.'),
    ],
    topicOptions: [
      'Were multilateral institutions to be dissolved today, what would be lost — and what might replace them? Argue a position.',
      'The principle of universality in the SDG framework is both its greatest strength and its greatest weakness. Is this a fair assessment?',
      'Only by fundamentally restructuring global economic governance can meaningful progress on inequality be achieved. Argue and qualify.',
      'The rise of AI gives rise to governance challenges that existing institutions are not equipped to address. What should be done?',
      'Hitherto, the most effective changes in governance have come not from international bodies but from below. Discuss.',
      'Free choice — any topic where you can argue a nuanced C1-level position for three minutes.',
    ],
    guidedPractice: [
      task('Deliver your 3-minute argument. Use the following as a guide — not a script: (1) Opening: frame the issue with precision — one or two sentences that establish stakes and your position. (2) Development: two or three substantive points, each supported by reasoning or evidence. (3) Counterargument: acknowledge the most serious objection and respond to it. (4) Conclusion: a qualified, nuanced restatement that moves the argument forward rather than simply repeating the opening.', 'Record yourself. Target: 2 minutes 50 seconds to 3 minutes 15 seconds. No reading from notes.'),
    ],
    speakingChecklist: [
      'Duration: between 2:45 and 3:15.',
      'Clear, precise framing in the opening.',
      'At least two C1 grammar structures used naturally (subjunctive, inversion, "were to", advanced aspect).',
      'At least four C1 vocabulary items or collocations from C1.1.',
      'Counterargument genuinely acknowledged and substantively addressed.',
      'Qualified conclusion — not a repetition of the opening.',
      'Formal register maintained — no contractions, no informal vocabulary.',
      'Fluent delivery — no long pauses, no script-reading.',
    ],
    freeSpeaking: [
      { topic: 'After recording, listen to yourself. Identify: (1) the strongest moment in your argument; (2) one sentence where B2 structures came out instead of C1; (3) one collocation you tried to use — how well did it land? This self-assessment is the most important part of the task.' },
    ],
    lessonRecap: 'You delivered a 3-minute C1 argument using subjunctive/inversion/advanced aspect and C1 collocations, developing the fluency that distinguishes C1 from B2.',
    nextLessonBridge: 'In C1.1 Part 2: reading, listening and writing at full C1 level — authentic texts, extended listening, and a C1 essay introduction as the first extended writing task.',
  }),

]);

export const C1_DEEP_BRIDGE_PART1_BY_PILLAR = Object.freeze({
  grammar: C1_DEEP_BRIDGE_PART1.filter(l => l.pillar === 'grammar'),
  vocabulary: C1_DEEP_BRIDGE_PART1.filter(l => l.pillar === 'vocabulary'),
  speaking: C1_DEEP_BRIDGE_PART1.filter(l => l.pillar === 'speaking'),
});
