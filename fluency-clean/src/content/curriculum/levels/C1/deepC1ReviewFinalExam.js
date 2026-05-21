import { createGrammarLesson, createVocabularyLesson, createReadingLesson, createListeningLesson, createSpeakingLesson, createWritingLesson } from '../../../schemas/index.js';

const level = 'C1';
const status = 'ready';
const common = { level, status, estimatedMinutes: 70, tags: ['c1-8', 'review', 'final-exam', 'checkpoint', 'deep-approved-target'] };

function task(instruction, note = '', expected = '') { return { instruction, note, expected }; }

// ─── CHECKPOINT LESSON (manual, not using factory) ───────────────────────────
const checkpoint = Object.freeze({
  id: 'C1-CHECKPOINT-001',
  schemaVersion: 'static-lesson-schema-v2-deep',
  level,
  status,
  pillar: 'checkpoint',
  order: 1,
  estimatedMinutes: 90,
  tags: ['c1-8', 'checkpoint', 'final-exam', 'gate'],
  title: 'C1 Checkpoint: Comprehensive Review and Level Gate',
  objectives: [
    'Demonstrate mastery of all C1 grammar structures (G001–G018).',
    'Show command of C1 vocabulary across all thematic areas (V001–V014).',
    'Perform at C1 level across all four skills: reading, listening, speaking, and writing.',
    'Complete the C1 gate assessment to unlock the C2 level.',
  ],
  description: 'This is the C1 level gate. It assesses mastery across all C1 blocks (C1.1–C1.8) and determines readiness to proceed to C2. The checkpoint is in three parts: a written grammar and vocabulary review, a reading and listening comprehension assessment, and a production task (speaking or writing). Completion of all three parts at 75% or above grants access to the C2 level.',
  sections: [
    {
      title: 'Part 1: Grammar and Vocabulary Review',
      description: 'Review of key structures from C1.1–C1.8. This section covers: inversion after negative adverbials, cleft sentences, advanced conditionals (including mixed and inverted), passive and causative constructions, subjunctive mood, discourse markers, and vocabulary from all C1 vocabulary units.',
      tasks: [
        task(
          'Complete the following using the correct C1 grammar structure:\n(a) "Not only _____ the results significant — they fundamentally altered the direction of the research." (inversion after negative adverbial)\n(b) "It _____ in 1947 that the concept was first formally articulated." (cleft sentence)\n(c) "The board insisted that the proposal _____ reviewed before any decision was made." (subjunctive)\n(d) "Had the data been available earlier, the team _____ a different approach." (inverted conditional perfect)\n(e) "We had the entire archive _____." (causative have)',
          'Each blank requires a specific C1 structure from C1.1–C1.7. Apply the correct form without support.',
          '(a) "were the results" (b) "was" (c) "be" (d) "would have taken" (e) "digitised"'
        ),
        task(
          'Use each of the following words precisely in a sentence that demonstrates you understand its meaning and collocations:\n(a) corroborate  (b) contiguous  (c) normative  (d) contingent  (e) intertextuality',
          'The sentences must demonstrate meaning, not just include the word. Wrong collocations or meaning will be visible.',
          'Evaluate: does each sentence correctly use the word with appropriate collocation? Is the register consistent? Is the word used in a context that unambiguously demonstrates its meaning?'
        ),
      ],
    },
    {
      title: 'Part 2: Reading and Listening Comprehension',
      description: 'Two unseen texts at C1 level — one written, one transcribed spoken. This assesses the ability to extract information, make inferences, and evaluate argumentation in authentic C1-level texts.',
      tasks: [
        task(
          'Read the following passage and answer the questions below:\n\n"The concept of \'epistemic injustice\' — developed by philosopher Miranda Fricker — identifies a specific form of wrong that occurs when someone is harmed in their capacity as a knower. The most discussed form, testimonial injustice, occurs when a speaker receives less credibility than they deserve due to prejudice about their social identity. Fricker\'s example: a Black man giving testimony in a legal context who is disbelieved not because his testimony is implausible but because of racial bias on the part of the listener. The harm here is double: the speaker is wronged materially (his testimony is dismissed), and also in their identity as someone capable of giving knowledge to others.\n\nA less-discussed form, hermeneutical injustice, occurs when a gap in collective interpretive resources disadvantages someone who is trying to make sense of their own experience. If the concepts required to understand and communicate an experience do not yet exist, the person having that experience is in an epistemically impoverished position — not through any individual\'s prejudice, but through a structural absence. Fricker\'s example: women experiencing sexual harassment before the concept \'sexual harassment\' existed had the experience but lacked the interpretive tools to name it and communicate it to others."\n\nQ1: What is the difference between testimonial injustice and hermeneutical injustice? Give one example of each from the passage.\nQ2: In what sense does testimonial injustice cause "double harm"? Explain both harms.\nQ3: Why does hermeneutical injustice not require individual prejudice to cause harm?',
          'Answer each question in 3–5 sentences, using your own words where possible.',
          'Q1: Testimonial injustice occurs when a speaker is given less credibility than they deserve because of prejudice about their identity (e.g., racial bias against a Black witness). Hermeneutical injustice occurs when the concepts needed to understand and communicate an experience are absent from the collective vocabulary (e.g., women lacking the concept "sexual harassment"). Q2: The double harm in testimonial injustice is material (the testimony is dismissed, so the speaker\'s claim is not heard) and identity-based (the speaker is wronged as a knower — as someone capable of contributing knowledge). Q3: Hermeneutical injustice is structural: the harm comes from the absence of interpretive resources in the shared vocabulary, not from any individual\'s deliberate bias. The person is disadvantaged by a collective gap, not by a specific prejudiced actor.'
        ),
        task(
          'Listen to the following spoken extract (teacher reads aloud) and answer the questions:\n\n[Teacher reads:] "There\'s a paradox at the heart of most discussions of critical thinking: we teach people to question assumptions, to identify fallacies, to demand evidence — and then we are surprised when these skills are deployed against the very institutions that taught them. A generation trained in the critical analysis of media, authority, and knowledge now applies those tools promiscuously, and the results are not always what their teachers intended. The capacity to see through manipulation can, without the right epistemic habits, become the capacity to see manipulation everywhere — including where it does not exist."\n\nQ1: What is the paradox the speaker identifies?\nQ2: What does the speaker mean by applying critical thinking "promiscuously"?\nQ3: What does the speaker suggest is the relationship between critical thinking skills and conspiracy thinking?',
          'Answer from memory and notes. Do not have the text read more than twice.',
          'Q1: The paradox is that teaching critical thinking — which is intended to empower people to question authority — can result in those skills being turned against the very institutions that taught them, producing results contrary to the teachers\' intentions. Q2: "Promiscuously" here means indiscriminately or without appropriate judgment — applying critical tools in contexts where they may not be warranted or may produce mistaken conclusions. Q3: Without the right epistemic habits (the speaker implies: calibration, proportionality, epistemic humility), the capacity to identify manipulation can become a tendency to see manipulation everywhere — including where it does not exist. This is the mechanism through which critical thinking skills can feed rather than prevent conspiracy thinking.'
        ),
      ],
    },
    {
      title: 'Part 3: Production (Writing or Speaking)',
      description: 'One extended production task. Students choose either a written essay or a spoken presentation/discussion. This assesses the integration of C1 grammar, vocabulary, and discourse skills in sustained production.',
      tasks: [
        task(
          'OPTION A (Writing): Write an argumentative essay (350–400 words) on the following prompt: "The ideal of \'authenticity\' has been so thoroughly absorbed by commercial culture that it has ceased to be a meaningful guide to living. Discuss." Your essay must include: a clear thesis, at least two developed argument paragraphs, one counter-argument and rebuttal paragraph, and a conclusion. Use at least four vocabulary items from C1-VOCABULARY-010 through C1-VOCABULARY-013.',
          'Apply all the academic writing skills from C1.6: sustained thesis, genuine engagement with counter-argument, multi-level clarity, appropriate hedging.',
          'Evaluate: Is the thesis specific and arguable? Are the argument paragraphs developed with evidence and explicit connection to the thesis? Is the counter-argument fairly stated and substantively addressed? Are C1 vocabulary items used accurately in context?'
        ),
        task(
          'OPTION B (Speaking): Give a 5–7 minute presentation on the following: "What do you consider the most important intellectual challenge facing your field, society, or generation — and why?" Then respond to 3–4 questions from your teacher. Use at least four vocabulary items from C1-VOCABULARY-010 through C1-VOCABULARY-013.',
          'Apply all C1 speaking skills: clear structure, specific evidence, counter-argument awareness, and precise vocabulary use. The questions will test your ability to think on your feet and maintain C1-level discourse under pressure.',
          'Evaluate: Is the position specific and developed? Are the vocabulary items used accurately? Does the student engage questions substantively rather than deflecting? Is the register consistently formal and precise throughout?'
        ),
      ],
    },
  ],
});

export const C1_DEEP_REVIEW_FINAL_EXAM = Object.freeze([

  // ─── GRAMMAR-018: C1 Grammar review and integration ──────────────────────────
  createGrammarLesson({
    ...common,
    id: 'C1-GRAMMAR-018',
    order: 18,
    title: 'Grammar review: Integrating C1 structures — inversion, cleft, conditionals, subjunctive, and discourse coherence',
    objectives: [
      'Review and integrate all major C1 grammar structures in sustained discourse.',
      'Identify the appropriate structure for a given communicative context.',
      'Self-diagnose remaining gaps in C1 grammar knowledge.',
      'Demonstrate command of C1-level sentence variety and syntactic complexity.',
    ],
    teacherOpening: 'This review lesson integrates the grammar taught across C1.1–C1.7. Rather than teaching new material, it provides a structured opportunity to revisit the most important structures, identify remaining gaps, and practise them in extended production. The goal is not coverage but genuine mastery of the structures that most distinguish C1 from B2.',
    grammarTable: {
      headers: ['Structure', 'Key marker', 'C1 requirement', 'Common error'],
      rows: [
        ['Negative inversion', 'Not only / Rarely / Seldom / Never / Only when', 'Auxiliary + subject inversion; formal register', 'Forgetting to invert, or using "not only...also" instead of "not only...but also"'],
        ['Cleft sentences (it-cleft)', '"It was/is [X] that [Y]"', 'Correct pronoun selection (who vs. that); correct verb tense', 'Using "which" instead of "who" for people; inverting the information structure incorrectly'],
        ['Cleft sentences (wh-cleft)', '"What [X] is [Y]" / "What surprised me was…"', 'Correct nominalization of the wh-clause', 'Using "The thing which" rather than "What"'],
        ['Advanced conditionals — mixed', 'Had [PP], [subject] would [now]…', 'Perfect in if-clause, present consequence in main clause', 'Using "would have" in the if-clause'],
        ['Inverted conditionals', '"Were I to… / Had she known… / Should this occur…"', 'Inversion replaces if; subjunctive were for all persons', 'Using "if" instead of inversion; using "was" instead of "were"'],
        ['Subjunctive', '"recommend/insist/suggest that [subject] [base form]"', 'Bare infinitive (not should + inf) after verbs of demand', 'Using "should + infinitive" after recommend/insist'],
        ['Discourse markers', 'Moreover / Admittedly / Hence / Tellingly / To some extent', 'Precise match between marker type and logical relationship', 'Over-using "however"; using "also" in formal writing'],
      ],
    },
    brazilianMistakes: [
      { mistake: '"Not only the results were significant, but the methodology was also innovative."', correction: '"Not only were the results significant, but the methodology was also innovative." — auxiliary before subject after not only.', explanation: 'The inversion is triggered by the negative adverbial at the start. The auxiliary verb (were) must precede the subject.' },
      { mistake: '"It is the quality which distinguishes the best academic writing."', correction: '"It is the quality that distinguishes the best academic writing." — use "that" not "which" in it-cleft constructions.', explanation: '"Which" is used in relative clauses but "that" is preferred in it-cleft constructions in standard formal English.' },
    ],
    controlledPractice: [
      task(
        'Rewrite each sentence using the structure indicated:\n(a) [Mixed conditional] The data was lost because the server wasn\'t backed up. As a result, we don\'t have the original results.\n(b) [It-cleft, emphasis on when] The decision to withdraw was made in 2019.\n(c) [Inverted subjunctive] If the review should produce any new evidence, the case will be reopened.\n(d) [Negative inversion] We rarely encounter such a clear example of epistemic injustice in everyday contexts.',
        'Focus on precision: exact form, not paraphrase.',
        '(a) "Had the server been backed up, we would now have the original results." (b) "It was in 2019 that the decision to withdraw was made." (c) "Should the review produce any new evidence, the case will be reopened." (d) "Rarely do we encounter such a clear example of epistemic injustice in everyday contexts."'
      ),
      task(
        'Identify the error in each sentence and correct it:\n(a) "Not only she passed the exam, but she also received a distinction."\n(b) "The committee recommended that the policy should be reviewed annually."\n(c) "If I would have read the report more carefully, I would have caught the error."\n(d) "It was the quality of the argument which impressed the panel most."',
        'Name the structure that is being attempted and identify the specific error.',
        '(a) Missing inversion: "Not only did she pass the exam…" (b) Redundant should: "…recommended that the policy be reviewed annually." (c) Would in the if-clause: "If I had read / Had I read the report more carefully…" (d) Which in it-cleft: "…the quality of the argument that impressed the panel most."'
      ),
    ],
    productionTasks: [
      task(
        'Write a paragraph (120–150 words) on a topic of your choice that demonstrates command of at least four C1 grammar structures. Label each structure you use in brackets.',
        'Do not force structures into sentences where they do not fit — choose a topic that naturally calls for the structures you want to practise (e.g., academic analysis benefits from cleft and inversion; recommendations call for subjunctive).',
        'Evaluate: are all four structures used correctly? Does the paragraph cohere as a piece of writing, or do the structures feel inserted? Is the register appropriate throughout?'
      ),
    ],
  }),

  // ─── VOCABULARY-014: C1 Vocabulary review ────────────────────────────────────
  createVocabularyLesson({
    ...common,
    id: 'C1-VOCABULARY-014',
    order: 14,
    title: 'Vocabulary review: Integrating C1 vocabulary — precision, collocations, and dangerous confusions',
    objectives: [
      'Review and consolidate vocabulary from all C1 vocabulary units (V001–V013).',
      'Identify and correct common dangerous confusions in C1 vocabulary.',
      'Demonstrate precision in word choice across formal, academic, and cultural registers.',
      'Self-diagnose remaining vocabulary gaps before the C1 gate assessment.',
    ],
    teacherOpening: 'This vocabulary review covers the most important words from C1.1–C1.7, with particular attention to dangerous confusions and collocation errors. The goal is not to repeat definitions but to use words precisely in context — which is how vocabulary mastery is actually demonstrated at C1 level.',
    words: [
      { word: 'corroborate vs. substantiate', definition: 'Both mean to support or confirm a claim, but with different implications. Corroborate: to confirm what someone else has claimed, typically through independent evidence. Substantiate: to provide sufficient evidence to establish the truth of a claim.', example: 'The second study corroborated the findings of the first (independent confirmation). The researcher failed to substantiate her central claim (the evidence was insufficient to establish it).', collocations: ['corroborate a finding', 'corroborating evidence', 'substantiate a claim', 'substantiate an allegation'] },
      { word: 'normative vs. normal', definition: 'Normative: relating to standards or norms — how things ought to be; prescriptive. Normal: typical or usual; descriptive. "The normative assumption is that…" (this is what ought to be). "The normal pattern is that…" (this is what usually happens).', example: 'The report makes both descriptive and normative claims: "most students arrive late" (descriptive) and "students should arrive on time" (normative).', collocations: ['normative claim', 'normative framework', 'normal distribution', 'what is normal'] },
      { word: 'contingent vs. conditional', definition: 'Contingent: dependent on circumstances; could have been otherwise; not necessary. Conditional: dependent on a specific condition being met. "The outcome was contingent on many factors" (it depended on a complex set of circumstances). "The offer is conditional on your acceptance" (it depends on one specific condition).', example: 'Historical events are contingent — they could have unfolded differently. The funding is conditional on the project meeting its milestones.', collocations: ['historically contingent', 'contingent on circumstances', 'conditional offer', 'conditional approval'] },
      { word: 'implication vs. inference', definition: 'Implication: what a statement suggests or entails — the speaker implies. Inference: what a listener/reader concludes — the reader infers. "The implication of this finding is X" (the finding suggests X). "My inference from this finding is X" (I conclude X).', example: 'The author\'s implication is that the current system is broken. My inference, however, is that this was not intentional.', collocations: ['the implication of this is', 'carry implications', 'draw an inference', 'a reasonable inference'] },
      { word: 'ambiguous vs. ambivalent', definition: 'Ambiguous: capable of being understood in more than one way (about meaning). Ambivalent: having mixed or conflicting feelings (about emotion/attitude).', example: 'The poem\'s final line is ambiguous (multiple valid interpretations). The reviewer was ambivalent about the ending (had mixed feelings).', collocations: ['deeply ambiguous', 'deliberately ambiguous', 'feel ambivalent about', 'profoundly ambivalent'] },
      { word: 'reductive vs. simplistic', definition: 'Both mean oversimplified, but reductive implies reduction to a single dimension or cause (used in intellectual criticism); simplistic implies naïve or unsophisticated treatment (more evaluative/dismissive).', example: 'The analysis was reductive — it explained a complex phenomenon in purely economic terms. The proposal was simplistic — it failed to account for obvious complications.', collocations: ['unduly reductive', 'a reductive account', 'a simplistic view', 'dangerously simplistic'] },
      { word: 'plausible vs. credible', definition: 'Plausible: seeming reasonable or likely; appearing to be true (can be used of theories, explanations, people). Credible: worthy of belief or confidence; believable (especially of people and sources). A plausible explanation seems reasonable. A credible witness deserves to be believed.', example: 'The hypothesis is plausible but requires further testing. The witness was considered credible by the jury.', collocations: ['a plausible explanation', 'eminently plausible', 'a credible source', 'highly credible'] },
      { word: 'contend vs. claim', definition: 'Both mean to assert, but contend implies arguing against opposition or in a context of debate (from Latin contendere, to struggle); claim is more neutral. "I contend that…" is stronger and more combative; "I claim that…" is neutral.', example: 'The author contends that the standard interpretation is wrong. The study claims to demonstrate a causal relationship.', collocations: ['contend that', 'contend with', 'a contested claim', 'claim responsibility'] },
    ],
    dangerousConfusions: [
      { pair: ['epistemic', 'epistemological'], explanation: '"Epistemic" is the adjective meaning relating to knowledge or knowing (epistemic status, epistemic humility, epistemic injustice). "Epistemological" means relating to the philosophical study of knowledge (epistemological assumptions, epistemological framework). Use "epistemic" for specific claims about knowledge; "epistemological" for the broader philosophical study. Many advanced learners use them interchangeably — they are not interchangeable.' },
      { pair: ['dialectic', 'dialogue'], explanation: '"Dialogue" simply means a conversation between two or more parties. "Dialectic" (from Hegel and Plato) means a structured tension between opposing positions (thesis and antithesis) that leads to a synthesis, or more broadly, a productive intellectual tension. "A dialogue between cultures" is neutral. "A dialectic between individual and society" implies a productive tension that generates something new.' },
    ],
  }),

  // ─── READING-008: Unseen text comprehension ───────────────────────────────────
  createReadingLesson({
    ...common,
    id: 'C1-READING-008',
    order: 8,
    title: 'Reading review: Unseen text — "The Attention Economy and the Crisis of Deliberation"',
    objectives: [
      'Demonstrate reading comprehension at C1 level with an unseen analytical text.',
      'Answer inference, vocabulary-in-context, text-structure, and critical evaluation questions.',
      'Identify argumentative moves and rhetorical strategies in academic prose.',
    ],
    teacherOpening: 'This is a review lesson: the text is unseen, and the questions assess reading comprehension across all the question types practised in C1.1–C1.7. Work through the questions carefully and use all the strategies developed across the course.',
    passage: `The Attention Economy and the Crisis of Deliberation

Democratic deliberation — the process by which citizens reason together about public matters — depends on two conditions that the digital attention economy systematically undermines: time and shared reality. The argument is straightforward, if uncomfortable: a political system that depends on deliberation is poorly served by an information environment that rewards speed, outrage, and novelty over depth, nuance, and verification.

The concept of the "attention economy" — the observation that human attention is a finite and therefore valuable resource that can be captured, packaged, and sold — was articulated by economists and cognitive scientists in the 1990s, but its implications for democracy have only become fully legible as the platforms built on this economic logic have matured. The essential insight is that platforms whose revenue depends on engagement have a structural incentive to maximise engagement regardless of the epistemic consequences. Content that generates strong emotional responses — fear, outrage, tribal solidarity — consistently outperforms content that is accurate, nuanced, or requires sustained attention.

The consequences for deliberation are multiple. First, the compression of public discourse: complex policy questions are reduced to slogans, positions, and counter-positions, because the platform architecture rewards brevity and emotional resonance over careful argument. Second, the fragmentation of shared reality: when individuals inhabit different algorithmic information environments, they encounter not different interpretations of shared facts but different facts, which makes the common ground required for deliberation progressively harder to establish. Third, the acceleration of political time: the pace at which public opinion is formed and reformed leaves insufficient space for the kind of reflection that deliberative democracy requires.

None of this is inevitable. The architecture of the attention economy is a design choice, and design choices can be unmade. But the political economy of the platforms — the interests that benefit from the current arrangement — makes reform structurally difficult. The question is whether the democratic systems that are most threatened by this development have the political will and institutional capacity to regulate it before the damage becomes irreversible.`,
    wordCount: 325,
    tasks: [
      task(
        'What are the two conditions for democratic deliberation that the author identifies in paragraph 1? Why does the author say the digital attention economy "systematically undermines" them?',
        'Re-read paragraph 1. The conditions are named. The "systematic" undermining is explained in the rest of the text.',
        'The two conditions are time and shared reality. The attention economy undermines time by rewarding speed and outrage over depth and verification — it does not give citizens the time needed for careful deliberation. It undermines shared reality by fragmenting the information environment (as explained in paragraph 3): different people encounter not different interpretations of shared facts but different facts entirely, which destroys the common ground that deliberation requires. The word "systematically" implies this is structural, not accidental — it is built into the incentive structure of the platforms.'
      ),
      task(
        'What is the "essential insight" of attention economy theory as described in paragraph 2? What is the specific claim about platform incentives?',
        'Re-read paragraph 2. The "essential insight" is stated explicitly. The claim about incentives follows from the economic logic.',
        'The essential insight is that platforms whose revenue depends on engagement have a structural incentive to maximise engagement regardless of the epistemic consequences. Human attention is finite and valuable; platforms sell access to it. Content that generates strong emotional responses (fear, outrage, tribal solidarity) consistently outperforms accurate, nuanced, or intellectually demanding content — and therefore platforms are incentivised to promote the former. The epistemic consequences (inaccuracy, superficiality, polarisation) are not incidental but follow directly from the economic structure.'
      ),
      task(
        'The author identifies three consequences for deliberation in paragraph 3. Summarise each in one sentence. Which consequence do you find most serious, and why?',
        'The three consequences are named and explained. For the second part, make a judgment and defend it — there is no single correct answer.',
        'First consequence: the compression of public discourse — complex policy questions are reduced to slogans and emotional positions because the platform architecture rewards brevity over careful argument. Second consequence: the fragmentation of shared reality — algorithmic environments deliver different "facts" to different people, not different interpretations of shared facts, which destroys the common ground that deliberation requires. Third consequence: the acceleration of political time — the pace of opinion formation leaves insufficient space for the reflection deliberative democracy requires. [The evaluation of which is most serious is the student\'s own judgment; any of the three can be defended with appropriate reasoning.]'
      ),
      task(
        'How does the author handle the objection that the situation is "inevitable"? What is their position on the possibility of reform, and how do they qualify it?',
        'Re-read paragraph 4. The author makes a claim about possibility and then immediately qualifies it with a structural obstacle.',
        'The author explicitly rejects inevitability: "None of this is inevitable." They argue that the attention economy\'s architecture is a design choice, and design choices can be unmade — implying reform is possible in principle. However, the author immediately qualifies this: the political economy of the platforms (the interests benefiting from the current arrangement) makes reform "structurally difficult." The closing question — whether democratic systems have the "political will and institutional capacity" to regulate before damage becomes irreversible — is framed as genuinely open. The author\'s position is cautious optimism qualified by structural pessimism.'
      ),
    ],
  }),

  // ─── LISTENING-008: Extended interview ───────────────────────────────────────
  createListeningLesson({
    ...common,
    id: 'C1-LISTENING-008',
    order: 108,
    title: 'Listening review: Interview — "Why Democracy Needs Difficulty"',
    objectives: [
      'Demonstrate listening comprehension at C1 level with an extended interview.',
      'Track and summarise a developing argument across a long spoken text.',
      'Answer inference, position-attribution, and critical evaluation questions at C1 level.',
    ],
    listeningPreparation: [
      task('Before listening: consider what it means to say that democracy requires difficulty. Think about the difference between removing barriers to participation (which increases access) and removing the experience of genuine disagreement (which may weaken deliberation).', 'This distinction is central to the speaker\'s argument; arriving with your own view sharpens critical listening.'),
      task('Prediction: predict one reason the speaker might argue that "comfortable" democracy is a problem and one concrete reform they might propose. Consider whether their argument applies equally to education, institutions, and technology.', 'Listen for how the speaker connects abstract principles to practical proposals.'),
      task('Key words to listen for: conceptual vocabulary (productive difficulty, deliberative process, epistemic, polarisation), reform language (citizens\' assemblies, civic education, platform reform, regulatory intervention), and argumentative structure cues (the deeper issue is, the distinction I\'d draw is, three things).', 'These signals help you track how the speaker builds a layered argument from diagnosis to proposal.'),
    ],
    teacherOpening: 'This is a review lesson. The interview is at C1 level and assesses all the listening skills developed across C1.1–C1.7. Listen carefully, take notes, and answer the questions as accurately as you can.',
    transcript: [
      { speaker: 'Interviewer', text: 'You\'ve argued in your recent book that we\'ve misdiagnosed the crisis of democracy. What\'s the misdiagnosis?' },
      { speaker: 'Dr Okafor', text: 'The dominant diagnosis is that democracy is in crisis because of polarisation, disinformation, or institutional failure. These are real problems, but I think they\'re symptoms rather than causes. The deeper issue is that we\'ve gradually redesigned democracy to be comfortable — to minimise the experience of being challenged, of encountering views you find wrong or offensive, of having to work through genuine disagreement. And in doing so, we\'ve removed the very conditions that make democratic self-governance possible.' },
      { speaker: 'Interviewer', text: 'What do you mean by that? Surely making democracy more accessible and less hostile is a good thing?' },
      { speaker: 'Dr Okafor', text: 'Up to a point, yes. But there\'s a difference between removing barriers to participation — which is genuinely important — and removing the productive difficulty of disagreement itself. Democracy is, at its core, a mechanism for making binding collective decisions in conditions of genuine disagreement. If you optimise it for comfort and consensus, you undermine the very friction that drives the deliberative process. You end up with something that looks like democracy — votes are cast, majorities are formed — but in which no genuine reasoning across difference is taking place.' },
      { speaker: 'Interviewer', text: 'You seem to be defending political discomfort. Is that right?' },
      { speaker: 'Dr Okafor', text: 'I\'m defending productive difficulty — which is different from discomfort as such. The distinction I\'d draw is between the discomfort that comes from encountering a genuinely different and well-reasoned position — which can change minds and build understanding — and the discomfort that comes from bad-faith argument, bad faith engagement, or simple hostility. The first is the engine of democratic deliberation; the second is corrosive. The problem with a lot of the "comfort-seeking" I\'m describing is that it can\'t make this distinction — it just removes difficulty wholesale, and in doing so it removes the productive kind along with the destructive kind.' },
      { speaker: 'Interviewer', text: 'What\'s the practical implication? What would you actually do differently?' },
      { speaker: 'Dr Okafor', text: 'Three things. First, institutional design: public deliberative processes should be designed to require genuine engagement with opposing views — not just to allow it. Citizens\' assemblies, for instance, don\'t just bring people together; they provide the information, facilitation, and time needed to reason together. Second, education: civic education needs to focus on the skills of productive disagreement — how to listen, how to argue in good faith, how to update your views when the evidence requires it. These are learnable skills, and we do almost nothing to teach them. Third — and this is the most contested — platform reform. The attention economy, as I\'ve described it, is structurally incompatible with deliberative democracy. Some form of regulatory intervention is necessary; the question is what form.' },
      { speaker: 'Interviewer', text: 'Critics of your position say you\'re romanticising deliberation — that it\'s a luxury of the educated and the privileged, and that for most people, political engagement is about power and interest, not reasoned argument.' },
      { speaker: 'Dr Okafor', text: 'That\'s a serious objection and I don\'t want to dismiss it. The historical record is clear that deliberation, as practiced, has often been a mechanism for excluding rather than including — for legitimising decisions already made by elites, not for producing genuinely democratic outcomes. My response is: that\'s an argument for making deliberation more inclusive and better designed, not for abandoning it as an ideal. Power and interest are always in the room. The question is whether reasoned argument also gets a seat. I think without it, power and interest always win — and the question of which power and which interest is settled by who shouts loudest.' },
    ],
    tasks: [
      task(
        'What is Dr Okafor\'s "misdiagnosis" argument? What does she see as the symptom, and what as the underlying cause?',
        'Listen to the first two turns. The distinction between symptom and cause is central.',
        'Dr Okafor argues that the dominant diagnosis of democracy\'s crisis (polarisation, disinformation, institutional failure) identifies symptoms rather than causes. The underlying cause, in her view, is that we have gradually redesigned democracy to minimise difficulty — to remove the productive friction of genuine disagreement. In doing so, we have removed the conditions that make democratic self-governance possible. The symptoms are real, but they are downstream of this structural design failure.'
      ),
      task(
        'What distinction does Dr Okafor draw between "productive difficulty" and "discomfort"? How does this distinction relate to her main argument?',
        'Listen to turn 5. She explicitly draws this distinction. Think about why it matters for her argument.',
        'Dr Okafor distinguishes between: (1) discomfort from encountering a genuinely different, well-reasoned position — which can change minds and build understanding (productive difficulty); and (2) discomfort from bad-faith argument or simple hostility (corrosive discomfort). The distinction is critical because the "comfort-seeking" tendency she identifies cannot make this distinction — it removes difficulty wholesale, eliminating the productive kind along with the destructive. Her argument is not against comfort but for the preservation of productive difficulty specifically.'
      ),
      task(
        'What are Dr Okafor\'s three practical recommendations? Summarise each in one sentence.',
        'Listen to turn 6. The three recommendations are explicitly numbered.',
        '(1) Institutional design: design public deliberative processes (such as citizens\' assemblies) to require genuine engagement with opposing views, providing the information, facilitation, and time needed for reasoning together. (2) Education: civic education should teach the skills of productive disagreement — listening, good-faith argument, and updating views on evidence. (3) Platform reform: the attention economy is structurally incompatible with deliberative democracy and requires regulatory intervention.'
      ),
      task(
        'What is the critic\'s objection in the final exchange? How does Dr Okafor respond, and does she concede anything?',
        'Listen to the final two turns. The critic\'s objection is serious; Dr Okafor\'s response involves both acknowledgement and rebuttal.',
        'The critic\'s objection: deliberation is a luxury of the educated and privileged; political engagement is really about power and interest, not reasoned argument. Dr Okafor\'s response: she concedes the historical accuracy of the objection — deliberation has often excluded rather than included, and has been used to legitimise decisions already made by elites. But she frames this as an argument for better-designed, more inclusive deliberation, not for abandoning it. Her rebuttal: without reasoned argument in the room, power and interest always win, and the outcome is determined by who shouts loudest — which is its own form of exclusion.'
      ),
    ],
  }),

  // ─── SPEAKING-008: Final review speaking task ─────────────────────────────────
  createSpeakingLesson({
    ...common,
    id: 'C1-SPEAKING-008',
    order: 8,
    title: 'Speaking review: Synthesis and reflection — what you have learned and why it matters',
    objectives: [
      'Demonstrate integrated C1 speaking skills in a sustained, reflective discussion.',
      'Articulate ideas about language learning, intellectual development, and C1-level discourse.',
      'Use the full range of C1 vocabulary and grammar structures in spontaneous speech.',
      'Reflect critically and specifically on your own development across the C1 course.',
    ],
    teacherOpening: 'This review lesson uses the conversation about your own learning as the vehicle for demonstrating C1-level speaking skills. Talking about language learning requires all the same skills as talking about any other complex topic — and it has the advantage of being something you know extremely well. The goal is sustained, precise, and intellectually engaged discourse.',
    prompt: 'A 10–12 minute conversation on the following questions. Answer each one in some depth — not just one or two sentences but a genuine reflection:\n\n1. What was the most intellectually challenging aspect of the C1 course for you, and why?\n2. Which skill — grammar, vocabulary, reading, listening, speaking, or writing — do you feel has developed most over C1, and which remains most difficult? Give specific examples.\n3. Is there a concept, idea, or text from the C1 course that has genuinely changed the way you think about something? What is it, and how has it changed your thinking?\n4. What do you think the relationship is between language and thought? Does learning English change what and how you think?',
    pronunciationFocus: {
      title: 'Pronunciation & shadowing',
      tips: [
        'Shadow: "The most intellectually challenging aspect was the counter-factual conditional." — stress intelLECtually, CHALlenging, and COUNter-factual. Practise the academic reflection register.',
        '"What I found most striking was how the concept of X changed the way I think about Y." — stress STRIK-ing and CHANGED. Practise the reflective cleft as a smooth chunk.',
        '"I would single out the distinction between..." — stress SINgle and disTINCtion. Use even academic intonation to signal careful analysis.',
        '"In retrospect, what I think has developed most is..." — stress RETrospect and deVELoped. Practise "in retrospect" /ɪn ˈret.rə.spekt/ as a quick opening chunk.',
      ],
    },
    tasks: [
      task(
        'Answer question 1 with specificity. Name the specific element — a grammar structure, a type of writing, a vocabulary area, a reading or listening skill — and explain precisely why it was challenging.',
        'Avoid vague answers ("Everything was hard"). Identify a specific challenge: "The counter-factual conditional was hard because Portuguese uses a different structure, and I kept putting \'would\' in the if-clause." Specific challenges allow specific discussion.',
        'Evaluate: Is the challenge specific and correctly identified? Does the student explain the source of the difficulty (L1 interference, conceptual gap, register challenge)?'
      ),
      task(
        'Answer question 2 with concrete examples from your own experience in the course. If writing has improved, say which type of writing and give a specific example of something you can now do that you couldn\'t before.',
        'Use hedged comparative language: "I feel more confident with… / I still find it difficult to… / The area where I\'ve progressed least is… because…"',
        'Evaluate: Are the claims about development specific and backed by concrete examples? Is the self-assessment balanced — not just praise or just criticism? Is the language of comparison and progress appropriately hedged?'
      ),
      task(
        'Answer question 3 honestly. If no specific text or idea has changed your thinking, say so and explain why — that is also a legitimate answer. If something has, describe the change with precision: what did you think before? What do you think now? What caused the change?',
        'Use the language of epistemic change: "Before this course, I assumed that… / Reading X made me realise that… / The idea of Y has reframed the way I think about Z."',
        'Evaluate: Is the answer honest and specific, or vague and complimentary ("everything was so interesting")? Does the student demonstrate that genuine cognitive change has occurred, or merely that they encountered new information?'
      ),
      task(
        'Answer question 4 by taking a position and defending it. This is a genuine philosophical question — there is no single correct answer, but some answers are better argued than others.',
        'Draw on ideas from the course if relevant: the relationship between epistemic vocabulary and epistemic capability; the way different languages frame the same experience differently; the way academic discourse shapes how we think about problems.',
        'Evaluate: Does the student take a position? Is it supported by reasoning and evidence (from their own experience or from the course)? Do they engage with the complexity of the question, or give a simplistic answer?'
      ),
    ],
    speakingChecklist: [
      'Each question answered with specificity — no vague generalisations.',
      'Self-assessment balanced — both strengths and remaining difficulties identified.',
      'At least one concrete example from the course cited to support a claim.',
      'Language of epistemic change used appropriately (before I assumed / now I realise).',
      'Position on language and thought defended with reasoning, not just asserted.',
      'Register sustained throughout the 10–12 minute discussion.',
      'Full range of C1 vocabulary and grammar deployed naturally in spontaneous speech.',
    ],
  }),

  // ─── WRITING-016: Final integrative essay ────────────────────────────────────
  createWritingLesson({
    ...common,
    id: 'C1-WRITING-016',
    order: 16,
    title: 'Writing review: Integrative essay — synthesising C1 skills in sustained academic production',
    objectives: [
      'Demonstrate integrated C1 writing skills in a sustained argumentative essay.',
      'Apply grammar, vocabulary, discourse structure, and genre conventions simultaneously.',
      'Produce writing at or above CEFR C1 standard without structured support.',
      'Reflect on and consolidate all the writing skills developed across C1.1–C1.8.',
    ],
    teacherOpening: 'This is a review lesson: the writing task is relatively unsupported, because the goal is to demonstrate what you can produce independently at C1 level. The scaffolding used in C1.6–C1.7 is not provided here — apply what you have learned. Think of this as a demonstration of mastery, not a learning exercise.',
    inputText: `Choose ONE of the following essay prompts. Write a full essay of 350–450 words.

(A) "The most serious threat to democratic governance in the twenty-first century is not the manipulation of elections but the erosion of the shared epistemic conditions on which democracy depends."

(B) "A culture that has elevated authenticity to its highest value has paradoxically made authentic experience impossible."

(C) "The purpose of university education is not to produce graduates with knowledge but to produce graduates with the capacity to interrogate knowledge."

No structural scaffold is provided. Apply the essay structure you have developed:
- Thesis paragraph with specific, arguable claim
- 2–3 developed argument paragraphs
- Counter-argument and rebuttal
- Conclusion that reflects the argument rather than restating the introduction

Language requirements:
- At least one C1 grammar structure (inversion, cleft, subjunctive, advanced conditional, or mixed conditional)
- At least four vocabulary items from C1 vocabulary units (V001–V014)
- At least three different types of discourse marker
- Consistent academic register throughout`,
    writingTask: 'Write the full essay (350–450 words) independently. No step-by-step scaffolding. Apply all C1 writing skills.',
    wordTarget: 400,
    tasks: [
      task(
        'Write the full essay. When complete, review it against the language requirements checklist: (1) at least one C1 grammar structure; (2) at least four C1 vocabulary items; (3) at least three different discourse marker types; (4) consistent academic register.',
        'Treat the review as a final check, not the primary focus while writing. Write the essay first; then verify the checklist.',
        'C1 grammar structures: inversion (not only…, rarely…), cleft (it was X that…, what matters is…), subjunctive (recommend that… be…), inverted conditional (had X been done…, were X to occur…), mixed conditional (had X happened, we would now…). Use naturally, not inserted artificially.'
      ),
      task(
        'After completing the essay, identify and annotate: (a) your thesis sentence; (b) the transition into the counter-argument paragraph; (c) one sentence where you used a C1 grammar structure; (d) one sentence where you used a C1 vocabulary word precisely.',
        'Annotation helps consolidate awareness of where C1 features are deployed. It also allows the teacher to give targeted feedback.',
        'Evaluate: Is the thesis specific and arguable? Does the counter-argument transition signal the move clearly? Is the C1 grammar structure correct? Is the vocabulary word used with appropriate collocation and in a context that demonstrates understanding?'
      ),
    ],
  }),

  checkpoint,
]);

export const C1_DEEP_REVIEW_FINAL_EXAM_BY_PILLAR = Object.freeze({
  grammar: Object.freeze([
    C1_DEEP_REVIEW_FINAL_EXAM.find(l => l.id === 'C1-GRAMMAR-018'),
  ]),
  vocabulary: Object.freeze([
    C1_DEEP_REVIEW_FINAL_EXAM.find(l => l.id === 'C1-VOCABULARY-014'),
  ]),
  reading: Object.freeze([
    C1_DEEP_REVIEW_FINAL_EXAM.find(l => l.id === 'C1-READING-008'),
  ]),
  listening: Object.freeze([
    C1_DEEP_REVIEW_FINAL_EXAM.find(l => l.id === 'C1-LISTENING-008'),
  ]),
  speaking: Object.freeze([
    C1_DEEP_REVIEW_FINAL_EXAM.find(l => l.id === 'C1-SPEAKING-008'),
  ]),
  writing: Object.freeze([
    C1_DEEP_REVIEW_FINAL_EXAM.find(l => l.id === 'C1-WRITING-016'),
  ]),
  checkpoint: Object.freeze([
    C1_DEEP_REVIEW_FINAL_EXAM.find(l => l.id === 'C1-CHECKPOINT-001'),
  ]),
});
