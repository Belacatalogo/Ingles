import { createGrammarLesson, createVocabularyLesson, createSpeakingLesson } from '../../../schemas/index.js';

const level = 'B2';
const status = 'ready';
const common = { level, status, estimatedMinutes: 70, tags: ['b2-8', 'checkpoint', 'review', 'b2-gate', 'deep-approved-target'] };

function task(instruction, note = '', expected = '') { return { instruction, note, expected }; }

export const B2_DEEP_CHECKPOINTS_PART1 = Object.freeze([

  // ─── GRAMMAR-022: B2 Grammar Consolidation ───────────────────────────────────
  createGrammarLesson({
    ...common,
    id: 'B2-GRAMMAR-022',
    order: 22,
    title: 'B2 Grammar Consolidation: review of all 21 B2 grammar structures',
    objectives: [
      'Review and consolidate all 21 B2 grammar structures from B2.1–B2.7.',
      'Identify and produce each structure in varied contexts.',
      'Diagnose remaining gaps to focus final study before the B2 Gate.',
      'Demonstrate command of the full B2 grammar range in an integrated task.',
    ],
    teacherOpening: 'This lesson is your grammar checkpoint before the B2 Gate. It covers every grammar structure introduced in B2.1 through B2.7. Work through the review table and the exercises. Where a structure feels uncertain, note the original lesson and return to it. This is not a test — it is a map of what you know and what you still need to consolidate.',
    whyItMatters: 'B2 grammar is not a collection of isolated rules. It is a system: the structures interact and reinforce each other. Consolidation means seeing the system, not just the parts.',
    differenceFromA2: 'B2 grammar distinguishes itself from B1 by complexity of embedding, by the density of clausal structures, and by the use of grammar for rhetorical effect — emphasis, hedging, formality, concession — not just to convey information.',
    grammarTable: {
      headers: ['Module', 'Structure', 'Key example', 'Self-assessment'],
      rows: [
        ['B2.1', 'Advanced discourse markers', 'Nevertheless, the evidence suggests...', ''],
        ['B2.1', 'Inversion for emphasis', 'Not only did emissions rise, but they also accelerated.', ''],
        ['B2.1', 'Cleft sentences', 'It was the governance failure that undermined the framework.', ''],
        ['B2.2', 'Past perfect & past perfect continuous', 'She had been working on the report for three years when...', ''],
        ['B2.2', 'Reporting verbs B2', 'She insisted that the data had been misrepresented.', ''],
        ['B2.2', 'Past modals', 'The policy could have been more effective had it been implemented earlier.', ''],
        ['B2.3', 'Mixed conditionals', 'If we had acted sooner, the situation would be very different now.', ''],
        ['B2.3', 'Concession structures', 'Despite the progress made, significant challenges remain.', ''],
        ['B2.3', 'Advanced passive', 'The agreement is believed to have been signed under political pressure.', ''],
        ['B2.4', 'Polite requests & indirect questions', 'I was wondering whether you would be able to attend.', ''],
        ['B2.4', 'Formal conditionals (inversion)', 'Should you require further information, please do not hesitate...', ''],
        ['B2.4', 'Gerunds vs infinitives (professional)', 'I recommend reviewing the figures before committing to a timeline.', ''],
        ['B2.5', 'Participle clauses', 'Having reviewed all the options, the committee decided to proceed.', ''],
        ['B2.5', 'Reported speech (questions/commands)', 'She asked whether the report had been finalised.', ''],
        ['B2.5', 'Relative clauses (defining/non-defining)', 'The study, which was published last year, challenges that assumption.', ''],
        ['B2.6', 'Passive reporting structures', 'Inequality is estimated to have grown by 30% over two decades.', ''],
        ['B2.6', 'Nominalization', 'The failure of governance mechanisms to adapt has been well-documented.', ''],
        ['B2.6', 'Advanced comparisons & quantifiers', 'Sea levels are rising at a rate nearly three times as fast as in 1990.', ''],
        ['B2.7', 'Reference chains & cohesion devices', 'This development, such trends, do so, the latter', ''],
        ['B2.7', 'Complex clause structure (it-extraposition)', 'It remains unclear whether the policy will achieve its stated goals.', ''],
        ['B2.7', 'Paraphrasing & reformulation', 'In other words, what this implies is, to put it differently', ''],
      ],
    },
    consolidationExercises: [
      {
        type: 'identification-in-context',
        instruction: 'Read the paragraph below. Identify and name the B2 grammar structure used in each underlined section.',
        paragraph: 'Having attended multiple summits without producing binding commitments [1], the international community has been widely criticised [2] for its failure to act. Not only have targets been missed, but implementation rates have also declined [3]. It remains unclear [4] whether the next round of negotiations will produce a different outcome. That said [5], it would be premature to conclude that multilateral diplomacy has failed entirely.',
        structures: [
          '[1] — B2.5: Participle clause with "having + pp"',
          '[2] — B2.3: Advanced passive',
          '[3] — B2.1: Inversion with "not only...but also"',
          '[4] — B2.7: It-extraposition (it remains unclear whether)',
          '[5] — B2.7 / B2.3: Concession connector',
        ],
      },
      {
        type: 'integrated-production',
        instruction: 'Write a paragraph of 120–150 words on a topic of your choice from B2. Include at least FIVE different B2 grammar structures from the review table. Mark each one with its module number in brackets after the sentence.',
      },
      {
        type: 'error-correction',
        instruction: 'Each sentence contains a grammar error. Identify and correct it.',
        items: [
          { error: 'Not only emissions rose, but climate effects accelerated.', correction: 'Not only did emissions rise, but climate effects also accelerated. [Inversion after negative adverb — auxiliary required]' },
          { error: 'It was the lack of funds the project failed.', correction: 'It was the lack of funds that the project failed. [Cleft structure requires "that"]' },
          { error: 'I recommend to review the strategy before proceeding.', correction: 'I recommend reviewing the strategy... [recommend + gerund, not infinitive]' },
          { error: 'Being announced last year, scientists believe the policy is ineffective.', correction: 'Announced last year, the policy is believed to be ineffective. [Participle clause — subject must match; also passive reporting structure for formal tone]' },
          { error: 'Should you will require assistance, please contact us.', correction: 'Should you require assistance... [Formal conditional inversion — no "will" after "should"]' },
        ],
      },
    ],
    selfAssessmentGuide: {
      title: 'B2 Grammar self-assessment',
      scale: [
        { level: 'Confident', description: 'I can identify, use and explain this structure without error in formal contexts.' },
        { level: 'Functional', description: 'I use this correctly most of the time but still make occasional errors.' },
        { level: 'Developing', description: 'I recognise this but make frequent errors in production.' },
        { level: 'Needs review', description: 'I am not confident with this structure — I need to return to the original lesson.' },
      ],
    },
    lessonRecap: 'You reviewed and self-assessed all 21 B2 grammar structures from B2.1–B2.7, practised identification, production and error correction.',
    nextLessonBridge: 'Next: the B2 Vocabulary Consolidation — reviewing all 16 vocabulary sets from B2.1–B2.7 in an integrated task.',
  }),

  // ─── VOCABULARY-017: B2 Vocabulary Consolidation ─────────────────────────────
  createVocabularyLesson({
    ...common,
    id: 'B2-VOCABULARY-017',
    order: 17,
    title: 'B2 Vocabulary Consolidation: review of all 16 vocabulary sets from B2.1–B2.7',
    objectives: [
      'Review and consolidate all 16 vocabulary sets from B2.1–B2.7.',
      'Demonstrate accurate usage of key vocabulary in context.',
      'Identify and correct misuse of vocabulary items.',
      'Perform an integrated vocabulary task using items from multiple modules.',
    ],
    teacherOpening: 'In B2.1 through B2.7 you covered 16 vocabulary sets across academic discourse, narratives, professional English, culture, media, global issues and academic argument. This consolidation lesson brings them all together. The goal is not to memorise every item — it is to demonstrate that you can activate the vocabulary you know accurately and appropriately in context.',
    targetWords: [
      {
        word: 'B2.1 Academic discourse verbs',
        partOfSpeech: 'review',
        definition: 'argue, demonstrate, evaluate, imply, contend, refute, assert, highlight, acknowledge, challenge',
        exampleSentences: ['The author contends that multilateralism is weakening.', 'Critics challenge the assumption that growth reduces inequality.'],
        collocations: ['contend that / refute a claim / assert a position / evaluate evidence'],
      },
      {
        word: 'B2.1–2 Abstract nouns & narrative vocabulary',
        partOfSpeech: 'review',
        definition: 'implication, consequence, assumption, evidence, correlation, tendency, perspective; unfold, emerge, escalate, culminate',
        exampleSentences: ['The situation escalated rapidly.', 'The implication of this finding is significant.'],
        collocations: ['evidence of / implication for / tendency to / culminate in'],
      },
      {
        word: 'B2.3 Qualification language',
        partOfSpeech: 'review',
        definition: 'arguably, tend to, appear to, somewhat, to a certain extent, broadly speaking, on the whole',
        exampleSentences: ['Broadly speaking, the framework has failed to deliver on its targets.', 'The situation has improved somewhat, but unevenly.'],
        collocations: ['arguably the most / tend to + verb / to a certain extent / broadly speaking'],
      },
      {
        word: 'B2.4 Professional / meetings',
        partOfSpeech: 'review',
        definition: 'agenda, action point, defer, facilitate, consensus, clarify, adjourn, stakeholder; Further to, Pursuant to, I trust, Yours sincerely',
        exampleSentences: ['The meeting was adjourned without consensus.', 'Further to our conversation, I am writing to confirm...'],
        collocations: ['agenda item / action point / defer a decision / facilitate discussion'],
      },
      {
        word: 'B2.5 Media and culture',
        partOfSpeech: 'review',
        definition: 'bias, agenda, algorithm, echo chamber, misinformation, gatekeeping, viral; heritage, identity, representation, assimilation, diaspora, appropriation',
        exampleSentences: ['Echo chambers reinforce existing biases rather than challenging them.', 'Questions of cultural representation are central to the debate.'],
        collocations: ['editorial bias / cultural identity / diaspora communities / echo chamber effect'],
      },
      {
        word: 'B2.6 Global issues',
        partOfSpeech: 'review',
        definition: 'governance, multilateralism, displacement, sustainability, polarisation, inequality, sanction, accountability, mitigation, refugee, diplomacy, austerity',
        exampleSentences: ['The polarisation of public opinion has deepened in recent years.', 'Climate mitigation requires structural economic reform.'],
        collocations: ['global governance / forced displacement / climate mitigation / impose sanctions / hold to account'],
      },
      {
        word: 'B2.6 Academic argument',
        partOfSpeech: 'review',
        definition: 'premise, inference, implication, nuance, empirical, anecdotal, correlation, rebut, counterargument, consensus',
        exampleSentences: ['The premise that economic growth reduces inequality has been rebutted empirically.', 'There is near-consensus among scientists on this point.'],
        collocations: ['false premise / empirical evidence / draw an inference / rebut an argument / scientific consensus'],
      },
      {
        word: 'B2.7 Academic register',
        partOfSpeech: 'review',
        definition: 'appear to, tend to, ostensibly, purportedly, arguably, presumably; furthermore, nevertheless, consequently, notwithstanding, that said',
        exampleSentences: ['The policy ostensibly reduces costs, but critics dispute this.', 'Furthermore, the evidence suggests...'],
        collocations: ['ostensibly designed / arguably the most / consequently... / notwithstanding these challenges'],
      },
    ],
    practiceExercises: [
      {
        type: 'categorised-retrieval',
        instruction: 'Without looking at the vocabulary above, write three vocabulary items for EACH of the following categories: (1) academic argument; (2) global issues; (3) professional/meetings; (4) media and culture. Then check.',
      },
      {
        type: 'integrated-cloze',
        instruction: 'Complete the paragraph with vocabulary from B2.1–B2.7. Choose from the words in brackets.',
        paragraph: 'The _____ [premise / algorithm / agenda] that economic growth automatically reduces _____ [mitigation / inequality / inference] has been _____ [escalated / rebutted / adjourned] by _____ [anecdotal / empirical / ostensibly] research. _____ [Furthermore / Consequently / Broadly speaking], the evidence _____ [tends to / defer / unfold] suggest that without active redistribution, growth _____ [culminates / tends / implies] to widen the gap between rich and poor. This has significant _____ [sanctions / implications / displacements] for global _____ [consensus / governance / diaspora] frameworks.',
        answers: 'premise / inequality / rebutted / empirical / Furthermore / tends to / tends / implications / governance',
      },
      {
        type: 'register-matching',
        instruction: 'Match each informal phrase to its B2 formal equivalent.',
        items: [
          { informal: 'people think the economy will get worse', formal: 'The economic outlook is widely believed to be deteriorating.' },
          { informal: 'the main idea behind this is...', formal: 'The underlying premise is...' },
          { informal: 'yes, but there\'s another side to this', formal: 'That said, it is worth acknowledging that...' },
          { informal: 'it seems like the policy isn\'t working', formal: 'The policy appears to be failing to achieve its stated objectives.' },
          { informal: 'so, this means that...', formal: 'The implication of this is that...' },
        ],
      },
    ],
    lessonRecap: 'You reviewed and consolidated all 16 B2 vocabulary sets — academic discourse verbs, abstract nouns, narrative vocabulary, professional phrases, media/culture, global issues, academic argument, and academic register — in integrated retrieval, cloze and register tasks.',
    nextLessonBridge: 'Next: the B2 Speaking Checkpoint — a 3-minute extended monologue that tests your full B2 spoken range across grammar, vocabulary, cohesion, hedging and argumentation.',
  }),

  // ─── SPEAKING-011: B2 Speaking Checkpoint ────────────────────────────────────
  createSpeakingLesson({
    ...common,
    id: 'B2-SPEAKING-011',
    order: 311,
    title: 'Speaking Checkpoint: Extended B2 monologue — 3 minutes on a free choice B2 topic',
    objectives: [
      'Deliver a fluent, coherent 3-minute spoken monologue on a B2-level topic.',
      'Demonstrate the full range of B2 spoken production: argumentation, qualification, evidence, concession, conclusion.',
      'Use a minimum of five B2 grammar structures naturally in sustained speech.',
      'Use a minimum of six B2 vocabulary items from different modules.',
      'Achieve a register appropriate to the topic (formal or semi-formal).',
    ],
    teacherOpening: 'This is your B2 Speaking Checkpoint. Three minutes is longer than you have practised in any previous lesson — and that is the point. Sustaining academic and formal spoken English for three minutes requires not just knowing the structures, but having internalised them well enough to deploy them under the pressure of continuous speech. This task prepares you for the B2 Gate speaking assessment.',
    pronunciationFocus: {
      title: 'Pronunciation & shadowing',
      tips: [
        'Shadow: "All things considered, I would argue that the benefits, albeit significant, do not outweigh the risks." Practise chunking this long sentence into four breath groups.',
        '"Were one to examine the evidence more closely..." — practise the formal subjunctive with stress on WERE and EXamine.',
        '"Notwithstanding the obvious objections..." — pronounce: /ˌnɒt.wɪθˈstæn.dɪŋ/. Stress STAND. Practise the chunk before a pause.',
        '"In summation, the argument I have been developing is..." — stress SUMmation and deVELoping. Use confident falling intonation to signal the close.',
      ],
    },
    warmUp: [
      task('Choose any topic from B2.1–B2.7. Spend 2 minutes planning your monologue. Map it into four sections: framing → main argument → evidence + counterargument → qualified conclusion. Note specific grammar structures and vocabulary you intend to use.'),
    ],
    topicOptions: [
      'Is global inequality the defining challenge of the 21st century, or are there more pressing threats? Argue and qualify.',
      'How has social media changed the relationship between individuals and their cultural identity? Discuss with nuance.',
      'Do multilateral institutions like the UN have a viable future, or do they need to be fundamentally redesigned? Argue a position.',
      'Is academic writing too divorced from accessible public communication? What is lost or gained by formal register?',
      'Describe a significant personal or professional challenge you faced. Use the narrative structures from B2.2.',
      'Free choice — any topic from B2.1–B2.7 of sufficient complexity for a 3-minute B2 monologue.',
    ],
    guidedPractice: [
      task('Deliver a 3-minute monologue on your chosen topic. Record yourself. Do NOT stop if you make an error — continue fluently. The goal is sustained production.', 'Aim for: no silence longer than 3 seconds; no code-switching to Portuguese; no reading from a script.'),
    ],
    speakingChecklist: [
      'Duration: 2 minutes 45 seconds to 3 minutes 15 seconds.',
      'Clear structure: framing → argument → evidence/counterargument → conclusion.',
      'At least 5 different B2 grammar structures (mark in your notes before speaking).',
      'At least 6 B2 vocabulary items from at least 3 different modules.',
      'Hedging language used (appear to, tend to, arguably, on balance, to a certain extent).',
      'At least one advanced connector (furthermore, nevertheless, consequently, that said).',
      'At least one it-extraposition or nominal clause subject structure.',
      'Fluent delivery — no long pauses, no script-reading.',
      'Formal or semi-formal register appropriate to the topic.',
    ],
    freeSpeaking: [
      { topic: 'After recording, listen back. Identify: (1) the strongest moment; (2) the weakest moment; (3) one grammar structure you intended to use but did not. Use this for final preparation before the B2 Gate.' },
    ],
    lessonRecap: 'You delivered a 3-minute extended B2 monologue demonstrating the full range of B2 spoken production: grammar, vocabulary, argumentation, cohesion, hedging and formal register.',
    nextLessonBridge: 'In B2.8 Part 2: the B2 Exit Assessment — reading comprehension test, listening test, and two writing tasks that together constitute the B2 Gate.',
  }),

]);

export const B2_DEEP_CHECKPOINTS_PART1_BY_PILLAR = Object.freeze({
  grammar: B2_DEEP_CHECKPOINTS_PART1.filter(l => l.pillar === 'grammar'),
  vocabulary: B2_DEEP_CHECKPOINTS_PART1.filter(l => l.pillar === 'vocabulary'),
  speaking: B2_DEEP_CHECKPOINTS_PART1.filter(l => l.pillar === 'speaking'),
});
