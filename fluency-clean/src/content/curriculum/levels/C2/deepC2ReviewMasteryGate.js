import { createGrammarLesson, createVocabularyLesson, createReadingLesson, createListeningLesson, createSpeakingLesson, createWritingLesson } from '../../../schemas/index.js';

const level = 'C2';
const status = 'ready';
const common = { level, status, estimatedMinutes: 75, tags: ['c2-5', 'review', 'mastery-gate', 'checkpoint', 'deep-approved-target'] };

function task(instruction, note = '', expected = '') { return { instruction, note, expected }; }

// ─── C2 CHECKPOINT (manual, not using factory) ───────────────────────────────
const c2checkpoint = Object.freeze({
  id: 'C2-CHECKPOINT-001',
  schemaVersion: 'static-lesson-schema-v2-deep',
  level,
  status,
  pillar: 'checkpoint',
  order: 1,
  estimatedMinutes: 120,
  tags: ['c2-5', 'checkpoint', 'mastery-gate', 'final'],
  title: 'C2 Mastery Gate: Comprehensive Review and Certification Assessment',
  objectives: [
    'Demonstrate mastery of all C2 grammar and vocabulary features (G001–G009, V001–V009).',
    'Perform at genuine C2 level across all four skills: reading, listening, speaking, and writing.',
    'Produce extended, unsupported writing and speaking at or above CEFR C2 standard.',
    'Complete the C2 mastery gate to certify proficiency at the highest CEFR level.',
  ],
  description: 'This is the C2 mastery gate. It certifies proficiency across all C2 blocks (C2.1–C2.5) at the CEFR C2 standard — the highest level on the Common European Framework of Reference. The assessment is in three parts: a language review section (grammar and vocabulary in context), an integrated skills section (reading + listening synthesis), and an extended production task (essay or presentation). A score of 80% or above on all three parts certifies C2 mastery.',
  sections: [
    {
      title: 'Part 1: Language in Use (Grammar and Vocabulary)',
      description: 'This section tests command of all C2 grammar and vocabulary features in context, without multiple-choice support. All tasks are open production.',
      tasks: [
        task(
          'Demonstrate command of the following in a single 200-word analytical paragraph. The paragraph must contain: at least one ellipsis or substitution device; at least one nominalised construction; at least one fronted element for rhetorical effect; one hedged claim with a clausal hedge ("it appears that…" / "evidence suggests…"); one boosted claim with appropriate evidential warrant.\n\nTopic: Write a paragraph analysing the limitations of evidence-based policy.',
          'Apply all C2 grammar skills simultaneously in unsupported production. This is a synthesis of C2-GRAMMAR-001 through C2-GRAMMAR-008.',
          'Evaluate against: (1) ellipsis/substitution used correctly and naturally; (2) nominalisation increases lexical density without becoming opaque; (3) fronted element creates genuine rhetorical effect; (4) hedged claim uses clausal hedge (not just modal); (5) boosted claim is appropriate to a well-supported point; (6) consistent high academic register throughout.'
        ),
        task(
          'Use each of the following words precisely in a sentence that demonstrates meaning, collocation, and register:\n(a) apposite  (b) tendentious  (c) parsimonious (academic sense)  (d) specious  (e) cogent\n(f) notwithstanding  (g) circumspect  (h) lacuna',
          'Each sentence must demonstrate understanding of the word\'s meaning and its distinction from near-synonyms. Incorrect collocations or wrong register will be evident.',
          'Evaluate: does each sentence use the word correctly, in an appropriate collocation, at the right register level? Does the sentence make clear the student understands the word\'s meaning and its distinction from near-synonyms?'
        ),
      ],
    },
    {
      title: 'Part 2: Integrated Skills (Reading + Listening Synthesis)',
      description: 'This section presents a short unseen reading passage and a short spoken text (teacher reads aloud). The student must integrate information from both sources to answer synthesis questions.',
      tasks: [
        task(
          '[Teacher reads the reading passage aloud once, then reads the spoken extract aloud twice.]\n\nREADING: "The philosopher Harry Frankfurt\'s distinction between lying and bullshitting has become widely cited: the liar knows the truth and deliberately asserts its contrary; the bullshitter, by contrast, is indifferent to whether what they say is true or false — they are concerned only with the effect of their words. Frankfurt argues that bullshitting is, in a sense, more dangerous than lying, because it represents a more complete disconnection from the concern for truth that underpins honest communication."\n\nSPOKEN: "The Frankfurt distinction is useful, but it needs updating for the digital context. What we see on social media is neither pure lying nor pure bullshitting — it\'s something closer to performed sincerity: people assert things not because they believe them or want to mislead, but because assertion is a social act that signals group membership. Whether it\'s true is, for many participants, genuinely beside the point — but not because they\'re indifferent to truth in the abstract; because the statement\'s function is tribal, not epistemic."\n\nQ1: What is Frankfurt\'s distinction between lying and bullshitting? Why does he consider bullshitting more dangerous?\nQ2: How does the speaker modify or update Frankfurt\'s distinction for the digital context? What term do they use for the phenomenon they identify?\nQ3: In what way is the speaker\'s concept of "performed sincerity" both similar to and different from Frankfurt\'s concept of "bullshitting"?',
          'Integrate information from both sources. Answer Q3 by identifying both the overlap and the divergence between the two concepts.',
          'Q1: Frankfurt\'s distinction: the liar knows the truth and asserts its opposite (intentional deception). The bullshitter is indifferent to truth — concerned only with effect, not accuracy. Bullshitting is more dangerous because it represents a complete disconnection from the concern for truth that underlies honest communication; lying at least acknowledges truth as the standard it violates. Q2: The speaker introduces "performed sincerity" — assertion motivated not by belief or deception but by the social/tribal function of assertion (signalling group membership). Q3: Similarity: both bullshitting and performed sincerity involve statements made without primary concern for their truth. Divergence: Frankfurt\'s bullshitter is indifferent to truth; the speaker\'s social media participant is not indifferent to truth in the abstract but makes statements whose primary function is tribal rather than epistemic — a more specific social diagnosis of why truth becomes irrelevant, rather than a general indifference.'
        ),
      ],
    },
    {
      title: 'Part 3: Extended Production',
      description: 'One extended production task chosen by the student. This is unsupported, unsupported, assessed against the C2 standard.',
      tasks: [
        task(
          'OPTION A (Essay, 450–500 words): Write a synthesis essay using ideas from at least three C2 course texts to argue a position on the following:\n\n"The pursuit of objectivity in intellectual inquiry is not merely impossible — it is incoherent as an ideal. What we should seek instead is transparent subjectivity: explicit acknowledgement of the perspective from which one speaks, combined with rigorous commitment to evidence and logical consistency."\n\nApply: clear thesis, 2–3 developed argument paragraphs, counter-argument and rebuttal, conclusion that advances the argument. Use at least 5 C2 vocabulary items and 2 C2 grammar structures.',
          'This is the final C2 writing assessment. No scaffold, no step-by-step support. Apply everything you have learned.',
          'C2 writing standard: the essay should be indistinguishable in quality from strong academic writing by a native speaker. Assess against: (1) thesis specificity and arguability; (2) argument development (evidence + explicit reasoning); (3) counter-argument engagement; (4) conclusion quality; (5) C2 vocabulary use (5+ items, accurate and natural); (6) C2 grammar structures (2+ visible); (7) register consistency; (8) synthesis quality (multiple sources used together, not in sequence).'
        ),
        task(
          'OPTION B (Presentation + Q&A, 12–15 minutes): Present your own position on the following question and defend it in a Q&A:\n\n"At C2 level, what is the relationship between language mastery and intellectual mastery? Is achieving C2-level English a primarily linguistic achievement, or does it require intellectual development that goes beyond language?"\n\nDraw on your own learning experience and on any ideas from the C2 course. Your teacher will ask 4–5 challenging questions.',
          'This is the final C2 speaking assessment. No notes. Full C2 register expected throughout.',
          'C2 speaking standard: assess against: (1) sustained intellectual argument (not just information delivery); (2) use of C2 vocabulary in context (5+ items); (3) use of C2 grammar structures; (4) Q&A engagement (challenges addressed substantively, not deflected); (5) epistemic honesty (uncertainty acknowledged, position revised where warranted); (6) register consistency and fluency (near-native).'
        ),
      ],
    },
  ],
});

export const C2_DEEP_REVIEW_MASTERY_GATE = Object.freeze([

  // ─── GRAMMAR-009: C2 Grammar review and integration ──────────────────────────
  createGrammarLesson({
    ...common,
    id: 'C2-GRAMMAR-009',
    order: 9,
    title: 'Grammar review: Integrating all C2 grammar features — a final synthesis',
    objectives: [
      'Review and integrate all C2 grammar features in extended unsupported production.',
      'Demonstrate the ability to deploy C2 grammar structures naturally and simultaneously.',
      'Self-identify remaining gaps and set priorities for further development.',
    ],
    teacherOpening: 'This review lesson integrates all the grammar features developed across C2.1–C2.4: ellipsis and substitution, nominalisation, fronting, epistemic stance, conditionals, relative clauses, and collocation. The goal is not to revisit definitions but to demonstrate that these features are now available simultaneously in unsupported production — the mark of genuine C2 grammar mastery.',
    grammarTable: {
      headers: ['Feature', 'Mastery marker', 'Key diagnostic', 'Still at C1 if…'],
      rows: [
        ['Ellipsis / substitution', 'Cohesive text that avoids all redundant repetition', 'Can the student write three connected sentences without repeating any noun phrase unnecessarily?', 'Full NPs are repeated where substitution or ellipsis would be natural'],
        ['Nominalisation', 'Lexical density appropriate to register', 'Does the student nominalise habitually in academic writing without prompting?', 'Verb-based subordinate clauses where nominalisation is expected in academic prose'],
        ['Fronting / information structure', 'Given before new; marked themes for rhetorical effect', 'Is the student controlling theme position deliberately?', 'New information consistently at sentence start; no fronted adjuncts in formal writing'],
        ['Epistemic stance', 'Precisely calibrated hedges and boosters', 'Does the hedge match the evidential situation, or is everything either hedged or boosted uniformly?', 'Uniform hedging ("it may suggest") or uniform boosting ("this clearly proves")'],
        ['Collocation', 'Idiomatic and natural verb-noun combinations', 'Does the student produce "make a distinction" or "draw a distinction" — not "create a distinction"?', 'Non-idiomatic but grammatically correct collocations ("do a contribution")'],
        ['Conditional precision', 'Right conditional type for right evidential situation', 'Does the student use mixed conditionals when appropriate, or default to Type 2?', 'Type 2 used for all hypotheticals, including those requiring mixed or Type 3'],
        ['Register consistency', 'No lapses from academic to informal within a passage', 'Can the student maintain C2 register across 300 words without any B2-level forms appearing?', 'Occasional "so" (formal writing), "also" (sentence-initial), or "this shows that" (C1 level)'],
      ],
    },
    brazilianMistakes: [
      { mistake: '"This proves that the theory is correct."', correction: '"The evidence strongly supports the theory." or "This is consistent with and provides strong support for the theory."', explanation: 'At C2, "proves" in empirical contexts is a diagnostic of C1-level epistemic calibration. C2 writers use "demonstrates," "establishes," or (when appropriate) more hedged forms. Reserve "proves" for mathematics and formal logic.' },
      { mistake: 'Stacking nominalisations without clarity: "The implementation of the realisation of the inadequate consideration of the diversification of resources."', correction: 'Nominalise strategically, not universally. "The failure to adequately consider resource diversification in the implementation phase" — one nominalisation, not four.', explanation: 'Over-nominalisation is itself a diagnostic of insecurity in C2 writing — it signals a mechanical application of a rule rather than a sophisticated command of register. C2 nominalisation is purposeful, not reflexive.' },
    ],
    controlledPractice: [
      task(
        'Write a 150-word paragraph that contains ALL of the following simultaneously:\n(a) VP ellipsis (avoid repeating a verb phrase)\n(b) A nominalised construction\n(c) A fronted adverbial that sets the scene\n(d) A hedged claim with "appear to" or "evidence suggests"\n(e) A strong collocation (draw/make/pose/lend + abstract noun)\n(f) A discourse marker that is not "however" or "therefore"\n\nChoose any analytical topic. Annotate each feature with a letter label.',
        'The goal is simultaneity — all six features must appear naturally within a single coherent paragraph, not as a list of disconnected sentences.',
        'Evaluate: are all six features present and correctly used? Does the paragraph cohere as a piece of analytical prose, or do the features feel inserted? Is the register consistently C2 academic throughout?'
      ),
    ],
    productionTasks: [
      task(
        'Write a 200-word analytical paragraph on a topic of genuine intellectual interest to you. Do not plan which C2 features to use — write the best paragraph you can, then annotate afterwards to identify which C2 features appeared naturally.',
        'This is a diagnostic task: the presence of C2 features without planning indicates genuine internalisation. If you find, on review, that the paragraph lacks C2 features, identify which features are missing and why.',
        'Evaluate: how many C2 features appeared without planning? Which features are absent? Does the absence pattern suggest areas for further development? Is the paragraph intellectually substantive — not just a language exercise?'
      ),
    ],
  }),

  // ─── VOCABULARY-009: C2 Vocabulary review ────────────────────────────────────
  createVocabularyLesson({
    ...common,
    id: 'C2-VOCABULARY-009',
    order: 9,
    title: 'Vocabulary review: Consolidating C2 vocabulary — precision, collocation, and dangerous confusions',
    objectives: [
      'Review and consolidate vocabulary from all C2 vocabulary units (V001–V008).',
      'Demonstrate precision in the most important dangerous confusions at C2 level.',
      'Self-assess remaining vocabulary gaps before the C2 mastery gate.',
    ],
    teacherOpening: 'This vocabulary review focuses on the most diagnostic distinctions — the ones that most clearly separate C2 from C1 vocabulary use. The goal is not to relearn definitions but to demonstrate the precision of use that characterises mastery.',
    words: [
      { word: 'assert vs. contend vs. maintain (C2 precision)', definition: 'Assert: claim confidently, without argument. Contend: argue against opposition, in a context of debate. Maintain: continue to hold a position under challenge — to persist. At C2, the choice between these should be driven by the specific argumentative context.', example: 'She asserts the primacy of economic factors without engaging the counter-evidence. He contends — against the prevailing view — that the methodology is flawed. She maintains her original position despite the objections raised in the Q&A.', collocations: ['assert without qualification', 'vigorously contend', 'continue to maintain', 'maintain in the face of opposition'] },
      { word: 'specious vs. spurious vs. fallacious', definition: 'Specious: apparently plausible but actually wrong or misleading. Spurious: false or lacking genuine basis. Fallacious: based on a mistaken belief or logically unsound.', example: 'A specious argument sounds convincing. A spurious correlation has no real basis. A fallacious argument has a specific logical error.', collocations: ['a specious argument', 'a spurious correlation', 'a fallacious inference', 'specious but persuasive', 'demonstrably spurious'] },
      { word: 'cogent vs. compelling vs. persuasive', definition: 'Cogent: logically structured and clear. Compelling: forcefully convincing, possibly for non-logical reasons. Persuasive: effectively influencing belief or action. An argument can be cogent without being compelling (if the reader resists the conclusion on other grounds) and compelling without being cogent (if it works rhetorically).', example: 'The argument is cogent in structure but depends on an empirical assumption. The rhetoric is compelling even if the logic is thin. A persuasive essay moves the reader to agree or act.', collocations: ['cogent reasoning', 'a compelling case', 'powerfully persuasive', 'cogently argued'] },
      { word: 'parsimonious vs. reductive', definition: 'Parsimonious (academic/positive): economical in explanation, using fewest necessary assumptions. Reductive (negative): oversimplifying by reducing complex phenomena to a single dimension.', example: 'The model is parsimonious — three variables explain most of the variance. The analysis is reductive — it collapses a multi-dimensional phenomenon into one.', collocations: ['a parsimonious explanation', 'elegantly parsimonious', 'reductive but tractable', 'dangerously reductive'] },
      { word: 'ostensibly vs. apparently vs. purportedly', definition: 'Apparently: reported appearance, neutral. Ostensibly: suggests a gap between stated and real reasons. Purportedly: specifically sceptical — the claim is made but doubted.', example: 'Apparently the policy succeeded (neutral report). Ostensibly it succeeded, but the underlying problems remain (sceptical). The technique, purportedly effective, has not been replicated (questioning the claim).', collocations: ['ostensibly designed to', 'apparently successful', 'purportedly capable of', 'what appears to be'] },
      { word: 'lacuna vs. gap vs. limitation', definition: 'Lacuna: a specific absence in a body of knowledge or argument — what is missing, not merely what is small. Gap: a more general term for absence. Limitation: a constraint on what can be concluded or done.', example: 'The most significant lacuna in the literature is longitudinal data. The gap between theory and practice is well-documented. The study\'s main limitation is the small sample.', collocations: ['a significant lacuna', 'a lacuna in the literature', 'fill a gap', 'acknowledge a limitation'] },
      { word: 'beg the question (correct use)', definition: 'To assume in the premises what needs to be proved — circular reasoning. NOT "raise the question." At C2, use correctly.', example: 'The argument begs the question: it assumes that markets are self-correcting, which is precisely what needs to be demonstrated.', collocations: ['beg the question', 'a question-begging argument', 'this begs the question of whether', 'circular and question-begging'] },
      { word: 'circumspect vs. cautious vs. tentative', definition: 'Circumspect: wary and careful to consider all circumstances — about manner. Cautious: avoiding risk — about behaviour. Tentative: provisional or uncertain — about conclusions.', example: 'Be circumspect in making claims without evidence (careful in how you proceed). Be cautious about generalising from a small sample (avoid risky inferences). The conclusion is tentative pending further data (provisional).', collocations: ['commendably circumspect', 'cautious about', 'tentatively concluded', 'appropriately circumspect'] },
    ],
    dangerousConfusions: [
      { pair: ['beg the question (philosophical)', 'raise/prompt the question'], explanation: 'Final review: "beg the question" = circular reasoning, assuming in the premise what you are trying to prove. "Raise/prompt the question" = cause us to ask a question. These are completely different. At C2, confusing them is a diagnostic error — it signals that the student has learned the phrase but not its correct meaning. This is one of the most commonly misused phrases in academic English even among native speakers, which makes correct usage a genuine marker of C2 mastery.' },
      { pair: ['specious', 'speculative'], explanation: '"Specious" means superficially plausible but actually wrong or misleading. "Speculative" means based on conjecture rather than established knowledge — uncertain, exploratory. "A specious argument" is misleadingly persuasive. "A speculative claim" is tentative, not yet verified. A speculative claim is not dishonest — it is simply uncertain. A specious argument is misleading. Do not confuse the dishonesty/deception implication of "specious" with the uncertainty implication of "speculative."' },
    ],
  }),

  // ─── READING-005: Unseen C2 passage ──────────────────────────────────────────
  createReadingLesson({
    ...common,
    id: 'C2-READING-005',
    order: 5,
    title: 'Reading review: Unseen C2 text — "On the Virtue of Not Knowing"',
    objectives: [
      'Demonstrate reading comprehension at C2 level with a fully unseen text.',
      'Answer comprehension, inference, vocabulary-in-context, and critical evaluation questions.',
      'Identify the text\'s argumentative structure, including unstated premises and rhetorical strategies.',
    ],
    teacherOpening: 'This is the final review reading at C2 level. The text is fully unseen, and the questions assess all the reading skills developed across C2.1–C2.4. Work carefully — at C2, the difference between good and excellent performance is precision rather than breadth.',
    passage: `On the Virtue of Not Knowing

The culture of expertise has a characteristic pathology: the expert who has mastered a field develops, alongside genuine knowledge, a set of confident opinions about matters outside that field — opinions that carry the same air of authority as the expertise from which they are borrowed, but none of the evidential basis. The physicist who pronounces on economic policy, the economist who opines on pandemic management, the epidemiologist who prescribes political strategy: in each case, the expertise is real but the transfer is illegitimate. What is lacking is not intelligence but intellectual humility — the disposition to recognise the limits of one's knowledge and to resist the temptation to extrapolate beyond them.

This is not, it should be emphasised, an argument for the suppression of expert opinion on public matters. The physicist who has studied climate science for thirty years has earned the right to be heard on climate change, regardless of their formal disciplinary affiliation. The point is different: it concerns the relationship between one's standing and one's knowledge — specifically, the danger of allowing standing to substitute for knowledge. The authority that expertise confers in one domain is not portable to adjacent or distant domains, however confident it may feel from the inside.

There is, however, a harder problem. Even within their domain, experts are frequently wrong — not because they are incompetent but because expertise is, by its nature, concerned with the frontier of knowledge, where uncertainty is highest. The history of science is partly a history of confident expert consensus being overturned: by new evidence, by new methods, by perspectives excluded from the consensus. The lesson is not that experts should not be trusted but that expert confidence should be calibrated: high within well-replicated, well-understood domains; considerably more tentative at the frontier.

The virtue I am advocating — intellectual humility — is not the same as intellectual timidity. The humble intellectual still takes positions, still defends them, still insists when the evidence supports insistence. What they resist is the illegitimate projection of authority beyond its evidential basis — either outside one's field, or inside it at a level of certainty the evidence does not support.`,
    wordCount: 335,
    tasks: [
      task(
        'What is the "characteristic pathology of the culture of expertise" identified in paragraph 1? Give two specific examples from the text.',
        'Re-read paragraph 1. The pathology concerns the relationship between genuine expertise and confident opinion outside that expertise.',
        'The pathology: experts develop, alongside genuine knowledge, confident opinions on matters outside their field — opinions that carry the authority of their expertise but lack its evidential basis. Examples: the physicist pronouncing on economic policy; the economist opining on pandemic management; the epidemiologist prescribing political strategy. In each case, the expertise is real in the home domain but the transfer to another domain is described as "illegitimate."'
      ),
      task(
        'The author says they are not arguing "for the suppression of expert opinion on public matters" (paragraph 2). What is the precise distinction they are drawing between acceptable and unacceptable expert pronouncement?',
        'Re-read paragraph 2. The author distinguishes between two things that might look similar but are different.',
        'The acceptable: a physicist who has studied climate science for thirty years has earned the right to be heard on climate change, regardless of formal disciplinary affiliation — expertise follows knowledge, not title. The unacceptable: allowing standing (disciplinary reputation, authority in one domain) to substitute for knowledge in another domain. The distinction is between earned, knowledge-based authority in a specific area (legitimate) and borrowed authority from one domain applied to another (illegitimate). The physicist\'s authority on climate comes from studying climate, not from being a physicist.'
      ),
      task(
        'What is the "harder problem" introduced in paragraph 3? How does the author resolve the apparent tension between "experts are frequently wrong" and "experts should be trusted"?',
        'Re-read paragraph 3. The resolution involves calibration — a concept developed elsewhere in the C2 course.',
        'The harder problem: even within their domain, experts are frequently wrong — not from incompetence but because expertise operates at the frontier of knowledge, where uncertainty is highest. The history of science includes overturned consensuses. This appears to undermine the authority of expertise. The resolution: not "experts should not be trusted" but "expert confidence should be calibrated" — high within well-replicated, well-understood domains; considerably more tentative at the frontier. Calibration (matching the level of confidence to the quality of the evidence) preserves the value of expertise while acknowledging its limitations.'
      ),
      task(
        'In the final paragraph, the author distinguishes "intellectual humility" from "intellectual timidity." What is the distinction, and why does the author think it is important to make it?',
        'Re-read the final paragraph. The distinction is about what intellectual humility does and does not require.',
        'Intellectual humility does require: recognising the limits of one\'s knowledge; resisting extrapolation beyond evidential basis; calibrating confidence to evidence. It does not require: refusing to take positions; refusing to defend positions; refusing to insist when evidence warrants insistence. Intellectual timidity — the failure to take or defend positions — would be the opposite error: false modesty that undermines intellectual engagement. The distinction is important because the author wants to advocate for intellectual humility without appearing to advocate for a general weakening of intellectual confidence. The humble intellectual is still intellectually active — just epistemically honest.'
      ),
    ],
  }),

  // ─── LISTENING-005: Unscripted intellectual conversation ─────────────────────
  createListeningLesson({
    ...common,
    id: 'C2-LISTENING-005',
    order: 105,
    title: 'Listening review: Unscripted discussion — "What We Owe the Dead: Historical Judgement and Moral Certainty"',
    objectives: [
      'Demonstrate listening comprehension at C2 level with a complex, fast-moving discussion.',
      'Track the development of a subtle argument across multiple speakers without simplification.',
      'Identify moments of agreement, partial agreement, and genuine disagreement with precision.',
      'Answer comprehension, inference, and critical evaluation questions at C2 level.',
    ],
    listeningPreparation: [
      task('Before listening: consider whether it is fair to judge historical figures by contemporary moral standards. Think about the difference between judging an institution as wrong and judging an individual as morally culpable for participating in it.', 'This distinction is central to the discussion; arriving with a clear position helps you track where speakers agree and diverge.'),
      task('Prediction: predict one argument for contextualising historical judgement (e.g., moral frameworks were different) and one argument against (e.g., dissenting voices existed at the time). Consider whether the function of historical judgement — blame vs understanding moral progress — changes which argument is stronger.', 'Listen for how one speaker reframes the debate from culpability to capacity.'),
      task('Key words to listen for: philosophical framing (anachronistic, morally culpable, epistemically corrupting, moral self-congratulation), discourse markers signalling reframing (I want to complicate the framing, that\'s a useful reframe, the more interesting question is), and concession language (that\'s a fair refinement, I\'m largely with X on that).', 'These cues help you reconstruct precise distinctions rather than general positions.'),
    ],
    teacherOpening: 'This final review discussion is between three academics on the contested question of how we should judge historical figures. It is unscripted in register — fast-paced, with overlapping and partial statements. Listen carefully and take notes. The questions require you to reconstruct precise distinctions, not just general positions.',
    transcript: [
      { speaker: 'Moderator', text: 'The question of judging historical figures by contemporary moral standards is contested. James, you\'ve argued that historical judgement must be contextualised — that we can\'t simply project our values onto the past.' },
      { speaker: 'James', text: 'That\'s right. The anachronistic moralist judges Nelson, or Jefferson, or countless others by standards that were simply not available to them in their historical moment. It\'s not that we can\'t recognise that enslaving people was wrong; of course it was. But holding a historical figure personally culpable for failing to transcend the moral framework of their age seems to me to be both unfair and historically illiterate.' },
      { speaker: 'Priya', text: 'But the "they couldn\'t have known better" argument gets complicated when you look at the historical record. There were people in Jefferson\'s time who thought slavery was wrong — not just in theory but as a matter of active opposition. The abolitionists existed. The question is why Jefferson, who clearly had access to the argument and the capacity to engage with it, didn\'t act on it. That\'s not anachronism; it\'s judging him by standards that were available to him.' },
      { speaker: 'James', text: 'That\'s a fair refinement. I\'d distinguish between judging the institution as wrong — which we can do, and which the abolitionists did at the time — and judging the individual as morally culpable for failing to reach the right conclusion against the full weight of social, economic, and psychological pressure. Those are different assessments.' },
      { speaker: 'Elena', text: 'I want to complicate the framing. The debate between James and Priya assumes that the question is whether historical figures are culpable. But maybe the more interesting question is what the function of historical judgement is. If the function is to assess individual moral responsibility, then the contextualisation argument has real force. But if the function is to understand how moral progress happens — to identify what made some people capable of moral insight when others weren\'t — then the interesting question isn\'t culpability but capacity.' },
      { speaker: 'Priya', text: 'That\'s a useful reframe. If we\'re asking about capacity — what made the abolitionists capable of the insight that their contemporaries lacked — then the question becomes less about blame and more about the social and epistemological conditions for moral progress.' },
      { speaker: 'James', text: 'I\'m largely with Elena on that. The question I\'d still want to press is whether "historical judgement" in the sense of publicly assigning praise and blame to long-dead people is a useful or honest intellectual exercise — or whether it\'s primarily a form of moral positioning that says more about us than about them.' },
      { speaker: 'Elena', text: 'I think that\'s the honest worry. Historical judgement often functions as what you might call moral self-congratulation: we judge the past to celebrate our own enlightenment. If that\'s all it is, then it\'s not just useless — it\'s epistemically corrupting, because it encourages the belief that we have arrived at correct moral views, rather than that we are, like all previous generations, located within a moral framework we cannot fully see.' },
    ],
    tasks: [
      task(
        'What is James\'s initial position and how does Priya refine it? What distinction does James accept in response?',
        'Listen to turns 2, 3, and 4. The refinement is subtle — Priya is not simply disagreeing but pointing to a case that tests James\'s general claim.',
        'James\'s initial position: judging historical figures by standards not available to them is both unfair and historically illiterate. We can recognise that slavery was wrong without holding individuals personally culpable for failing to transcend their moral framework. Priya\'s refinement: the abolitionists existed in Jefferson\'s time — slavery\'s wrongness was available as an argument. Judging Jefferson by standards available to him is not anachronism. James accepts this distinction: judging the institution as wrong (which contemporaries also did) is different from judging the individual as culpable for failing to act against the full social, economic, and psychological pressure of their context.'
      ),
      task(
        'What is Elena\'s reframe of the debate in turn 5? How does this shift the question from culpability to something else?',
        'Listen to turn 5. Elena explicitly says she wants to "complicate the framing."',
        'Elena\'s reframe: the debate assumes the function of historical judgement is to assess individual moral responsibility (culpability). She proposes an alternative function: understanding how moral progress happens — identifying what made some people capable of moral insight when others weren\'t. This shifts the question from "was this person culpable?" to "what conditions made moral insight possible or impossible?" — from blame to capacity. This reframe is accepted by Priya in turn 6 as more interesting than the culpability question.'
      ),
      task(
        'What concern does James raise in turn 7? How does Elena develop this concern in turn 8?',
        'Listen to turns 7 and 8. James raises a skeptical concern about the function of historical judgement; Elena names and extends it.',
        'James\'s concern: publicly assigning praise and blame to long-dead people may not be a useful or honest intellectual exercise — it may be primarily a form of moral positioning that says more about us than about them. Elena develops this as "moral self-congratulation": we judge the past to celebrate our own enlightenment. She adds a stronger claim — this is not just useless but "epistemically corrupting," because it encourages the belief that we have arrived at correct moral views, rather than recognising that we too are located within a moral framework we cannot fully see from the inside. This extends James\'s skepticism from a pragmatic concern to an epistemic one.'
      ),
      task(
        'At the end of the discussion, is there an agreed conclusion? What is the consensus, and what remains unresolved?',
        'Listen to the full discussion. The participants converge on some points and diverge on others.',
        'Emergent consensus: historical judgement oriented toward moral self-congratulation is both useless and epistemically corrupting. The reframe toward "capacity" (what conditions enable moral insight) is more intellectually productive than the culpability debate. All three accept that we ourselves are located within a moral framework we cannot fully see. Remaining unresolved: James\'s skepticism about whether any form of public historical judgement is a useful intellectual exercise — Elena\'s extension of this into epistemic corruption is more radical than James\'s initial concern, and it is not clear whether James fully endorses it. The question of whether historical judgement can be rescued from moral self-congratulation — whether there is a form of it that is genuinely illuminating — is not resolved.'
      ),
    ],
  }),

  // ─── SPEAKING-005: Final mastery speaking ────────────────────────────────────
  createSpeakingLesson({
    ...common,
    id: 'C2-SPEAKING-005',
    order: 5,
    title: 'Speaking review: The C2 mastery conversation — sustained intellectual engagement on an unseen topic',
    objectives: [
      'Demonstrate C2 speaking mastery in an extended, unscripted intellectual discussion.',
      'Engage with an unseen topic at C2 level without preparation time.',
      'Deploy all C2 vocabulary and grammar features naturally in spontaneous speech.',
      'Demonstrate the epistemic humility and precision that characterise C2 intellectual discourse.',
    ],
    teacherOpening: 'This is the final speaking lesson. There is no preparation time. Your teacher will introduce a topic — one you have not seen before — and you will engage with it in a 15-minute discussion. The goal is to demonstrate that C2 mastery means not just knowing the right words and structures but being able to think in English at the highest level.',
    prompt: 'Your teacher will choose one of the following unseen topics and introduce it at the start of the session:\n\n(A) "Intellectual humility — the virtue described in C2-READING-005 — seems in tension with intellectual confidence. Is it possible to have both? Should we want to?"\n(B) "The discussion in C2-LISTENING-005 suggests that historical judgement might be epistemically corrupting. If so, what follows for how we teach history?"\n(C) "A machine that could write C2-level English but had no genuine understanding of what it was writing — would it be more or less sophisticated than a human who could write C2-level English but could not explain why any of it was right? What does your answer reveal about what C2 mastery actually is?"',
    tasks: [
      task(
        'Engage with the topic immediately — do not ask for preparation time. The ability to engage immediately with an unseen intellectual question is one of the marks of C2 mastery.',
        'If you are uncertain about your position, say so explicitly and think through the question aloud. "This is a question I haven\'t thought about before; let me think through it…" is an acceptable opening at C2. What is not acceptable is vague or evasive responses that avoid the substance of the question.',
        'Evaluate: does the student engage the substance of the question, or do they skirt it? Do they identify the central tension or problem in the question? Do they take a position, even tentatively, or defer engagement indefinitely?'
      ),
      task(
        'As the discussion develops, demonstrate one or more of the following: (a) genuine revision of your initial position in response to a challenge; (b) recognition of a complexity you had not anticipated; (c) use of C2 vocabulary from any unit in a context that demonstrates genuine understanding.',
        'Genuine intellectual engagement at C2 involves being changed by a good argument — not just defending the position you started with. If your position has not moved at all by the end of 15 minutes, ask yourself whether you were genuinely engaging or defending.',
        'Evaluate: has the student\'s position moved — or have they been defending their opening statement for 15 minutes? Have they used C2 vocabulary naturally (not inserted artificially)? Is there evidence of genuine intellectual work — thinking, not performing?'
      ),
      task(
        'In the final 2 minutes, synthesise what has emerged in the discussion. What do you now think that you did not think at the start? What question has the discussion opened that was not visible at the beginning?',
        'The best closure is not "I still think X" but "The discussion has made me see that the question is more complicated than I initially thought — specifically because…" This demonstrates genuine intellectual engagement rather than defended positions.',
        'Evaluate: does the closing reflect the actual discussion? Is there evidence of genuine movement, insight, or complication that the student has been honest about? Is the closing intellectually honest — not claiming resolution where there is none?'
      ),
    ],
  }),

  // ─── WRITING-007: Final review writing task ───────────────────────────────────
  createWritingLesson({
    ...common,
    id: 'C2-WRITING-007',
    order: 7,
    title: 'Writing review: Unseen prompt — demonstrating C2 writing mastery without support',
    objectives: [
      'Demonstrate C2 writing mastery in response to an unseen prompt without scaffold or preparation.',
      'Apply all C2 grammar, vocabulary, and genre knowledge simultaneously in extended production.',
      'Produce writing that would be indistinguishable from high-quality native-speaker academic prose.',
    ],
    teacherOpening: 'This is the final writing lesson. The prompt is unseen, there is no scaffold, and the standard is C2. Everything you have developed across the course — the grammar, the vocabulary, the genre knowledge, the epistemic precision — should now be available to you simultaneously, without planning or conscious deployment. If it is not, this review will help you identify where the remaining gaps are.',
    inputText: `Choose ONE of the following prompts. You have 45 minutes (simulated). Write 400–500 words.

(A) "The most important intellectual virtue is not the capacity for independent thought but the capacity for collaborative thought — the ability to think better in conversation than alone. Discuss."

(B) "Evidence-based approaches to policy are necessary but not sufficient. The gap between evidence and action is always bridged by values — and the choice of values is always political, never purely technical." Discuss.

(C) "At C2 level, the learner of a foreign language faces a paradox: the closer they come to native-speaker proficiency, the less visible their achievement becomes — because the mark of mastery is the absence of visible effort." Discuss.

No structural scaffold. Apply everything you know. The quality requirement:
- The essay should be indistinguishable from strong native-speaker academic writing
- Every sentence should advance the argument
- No sentence should be there only to show that you know a grammar structure
- The vocabulary should be chosen for precision, not impressiveness
- The register should be consistent throughout — never dipping below C2 academic
- The conclusion should add something, not merely summarise`,
    writingTask: 'Write the full essay (400–500 words) independently, to time. When complete, review your essay against the quality requirements above. Identify one sentence that you are genuinely satisfied with and one you would revise. Write the revised version.',
    wordTarget: 450,
    tasks: [
      task(
        'Write the essay. Do not plan in the margins — think on the page. The first paragraph should contain a specific, arguable thesis, not a broad topic statement.',
        'At C2, the first sentence of the essay should tell the reader something specific. "This essay will argue that…" is acceptable. "The relationship between evidence and policy has been widely discussed" is not — it is a topic statement, not a thesis.',
        'Evaluate against C2 standard: specificity of thesis, quality of reasoning, epistemic precision, register consistency, vocabulary precision, conclusion quality.'
      ),
      task(
        'Self-review: identify your best sentence and your weakest sentence. Write an improved version of the weakest sentence.',
        'Be honest in the self-review. The weakest sentence may be a cliché ("In conclusion, it is clear that…"), a vague generalisation ("Many people believe that…"), or a structure that was inserted artificially rather than arising from the argument.',
        'Evaluate: is the identification honest? Does the revised sentence actually improve on the original? Is the improvement principled — does the student know why the revision is better?'
      ),
    ],
  }),

  // ─── WRITING-008: Reflective language learning essay ─────────────────────────
  createWritingLesson({
    ...common,
    id: 'C2-WRITING-008',
    order: 8,
    title: 'Writing: A reflective essay on language learning — what C2 mastery actually means',
    objectives: [
      'Write a reflective essay (350–400 words) on the experience and meaning of C2-level language mastery.',
      'Apply all C2 writing skills in a personal-but-formal register.',
      'Synthesise the intellectual and linguistic development that C2 represents.',
      'Close the course with a piece of writing that demonstrates genuine reflection, not performed conclusion.',
    ],
    teacherOpening: 'This final writing lesson is different from all the others: it asks you to write about yourself and your experience, not about an external topic. At C2, the personal essay in English is a challenge precisely because the informal register of personal writing meets the formal precision of C2 — and getting the balance right is one of the last stylistic frontiers. This is a piece of writing to be proud of.',
    inputText: `The C2 reflective essay — what it is and what it is not:

NOT a summary of what you have learned (a list of grammar structures and vocabulary is not a reflection)
NOT a celebration ("This course was amazing and I learned so much")
NOT a complaint ("The course was too hard")

IS a genuine intellectual reflection on what language mastery means — with specific examples from your own learning
IS honest about what remains difficult and what has become genuinely easier
IS written in a personal-but-formal register — more intimate than academic writing, more precise than informal conversation

Useful structures for a reflective essay:
- Before/now contrast: "Before this course, I used to… Now I find myself…"
- Specific example: "The moment I knew something had changed was when…"
- Genuine uncertainty: "I still struggle with… and I'm not sure whether this represents a gap in my knowledge or a genuine limitation in my exposure to authentic language"
- Connection to the broader: "What I understand better now is that language mastery is not just about grammar and vocabulary — it is about…"`,
    writingTask: 'Write a reflective essay (350–400 words) on what C2-level English mastery means to you — what you have actually learned, what still challenges you, and what you now understand about language and thought that you did not understand before. This essay will not be assessed against a checklist — it will be read as a piece of writing.',
    wordTarget: 375,
    tasks: [
      task(
        'Write the essay. Be honest. The most impressive reflective essays are not the ones that describe perfect achievement but the ones that describe genuine insight — including insight into remaining gaps and challenges.',
        'Avoid: "I have learned so much in this course." Be specific: "The moment I understood that English academic writing requires nominalisation not as decoration but as a structural convention that creates a specific kind of impersonality — that was when the register shift became intuitive rather than effortful."',
        'Evaluate: is the reflection genuine — does it describe real intellectual and linguistic development? Is there at least one specific moment, realisation, or change that is described precisely? Is the register appropriately personal-but-formal — neither bureaucratic nor casual?'
      ),
      task(
        'Read your essay back as if reading it for the first time. Find one sentence that says something you genuinely believe — something you could not have written at B2 level. Read it aloud.',
        'This exercise is about identifying authentic intellectual content in your own writing — which is the goal of the whole course.',
        'Evaluate: is the identified sentence genuinely C2 in both content and expression? Does it say something specific that reflects real learning, or is it a generalisation that could have been written at B2? If you cannot find such a sentence, that is important information — and worth writing about.'
      ),
    ],
  }),

  c2checkpoint,

]);

export const C2_DEEP_REVIEW_MASTERY_GATE_BY_PILLAR = Object.freeze({
  grammar: Object.freeze([
    C2_DEEP_REVIEW_MASTERY_GATE.find(l => l.id === 'C2-GRAMMAR-009'),
  ]),
  vocabulary: Object.freeze([
    C2_DEEP_REVIEW_MASTERY_GATE.find(l => l.id === 'C2-VOCABULARY-009'),
  ]),
  reading: Object.freeze([
    C2_DEEP_REVIEW_MASTERY_GATE.find(l => l.id === 'C2-READING-005'),
  ]),
  listening: Object.freeze([
    C2_DEEP_REVIEW_MASTERY_GATE.find(l => l.id === 'C2-LISTENING-005'),
  ]),
  speaking: Object.freeze([
    C2_DEEP_REVIEW_MASTERY_GATE.find(l => l.id === 'C2-SPEAKING-005'),
  ]),
  writing: Object.freeze([
    C2_DEEP_REVIEW_MASTERY_GATE.find(l => l.id === 'C2-WRITING-007'),
    C2_DEEP_REVIEW_MASTERY_GATE.find(l => l.id === 'C2-WRITING-008'),
  ]),
  checkpoint: Object.freeze([
    C2_DEEP_REVIEW_MASTERY_GATE.find(l => l.id === 'C2-CHECKPOINT-001'),
  ]),
});
