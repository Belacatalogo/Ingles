import {
  createGrammarLesson,
  createVocabularyLesson,
  createReadingLesson,
  createListeningLesson,
  createSpeakingLesson,
  createWritingLesson,
} from '../../../schemas/index.js';

const level = 'C1';
const status = 'ready';
const common = {
  level,
  status,
  estimatedMinutes: 70,
  tags: ['c1-6', 'academic-writing', 'essays', 'critical-review', 'deep-approved-target'],
};

function task(instruction, note = '', expected = '') {
  return { instruction, note, expected };
}

// ─── GRAMMAR-014: Sentence variety and syntactic complexity in academic prose ─

const grammar014 = createGrammarLesson({
  ...common,
  id: 'C1-GRAMMAR-014',
  order: 14,
  title: 'Sentence variety and syntactic complexity in academic writing',
  objectives: [
    'Control sentence length and complexity for academic register.',
    'Use fronted participial phrases, absolute constructions, and appositives precisely.',
    'Vary sentence openings systematically to produce cohesive academic prose.',
    'Identify and correct the five most common syntactic weaknesses in C1 academic writing.',
  ],
  teacherOpening: `Academic prose at C1+ is not just about correct sentences — it is about the orchestration of sentence types, lengths, and openings to produce a text that moves forward with authority and clarity. A paragraph of ten sentences that all begin "The/This/There" signals a writer who has not yet achieved C1 control. This lesson addresses the syntactic tools that distinguish C1 academic writing from competent B2 writing.`,
  whyItMatters: `Sentence variety is one of the clearest markers of academic register. Examiners and academic readers note its presence or absence immediately. The tools here — fronted participials, appositives, absolute constructions — appear throughout published academic English and are invisible in the sense that they do not draw attention to themselves: they simply make the writing read well.`,
  grammarTable: {
    headers: ['Structure', 'Example', 'Function', 'Common in'],
    rows: [
      [
        'Fronted participial phrase',
        'Examining the data closely, we find several anomalies that require explanation.',
        'Shows that two actions share the same subject; adds logical connection',
        'Academic essays, analytical writing',
      ],
      [
        'Fronted past participial',
        'Developed in the 1970s, this model has since been extensively tested.',
        'Signals that the background action preceded the main clause',
        'Reports, literature reviews',
      ],
      [
        'Appositive',
        'The author, a leading expert in cognitive science, disputes the consensus view.',
        'Adds information about a noun without a new sentence; signals precision',
        'Academic essays, critical writing',
      ],
      [
        'Absolute construction',
        'The data gathered, the researchers turned their attention to analysis.',
        'Indicates a condition or circumstance accompanying the main clause; formal',
        'Formal academic and literary prose',
      ],
      [
        'Fronted adverbial + inversion',
        'Not only does the study confirm earlier findings, it extends them significantly.',
        'Emphatic; signals contrast or extension of argument',
        'Academic argument, critical writing',
      ],
      [
        'Delayed subject with "it"',
        'It is the implications of the finding, not the finding itself, that matter most.',
        'Foregrounds the important element; controls reader focus',
        'Academic argument, formal commentary',
      ],
    ],
  },
  whenToUse: [
    'Use fronted participials to show that two actions share a subject and have a logical connection (temporal, causal, or concessive).',
    'Use appositives to add identity or explanatory information without creating a new sentence — keeps the prose dense and economical.',
    'Use absolute constructions sparingly: they are marked features of formal prose, and overuse makes writing seem artificial.',
    'Vary your sentence openings: aim for no more than two consecutive sentences beginning with the same word or structure.',
  ],
  whenNotToUse: [
    'Dangling participials: the participial subject must match the main clause subject. "Examining the data, several errors were found" is wrong — "several errors" did not examine the data.',
    'Do not use absolute constructions in informal writing or professional emails — they sound archaic outside formal academic contexts.',
    'Do not front participials with passive meaning unless the context makes the subject crystal clear.',
  ],
  teacherExamples: [
    'Drawing on three decades of research, the authors construct a compelling case for reform.',
    'The model, first proposed by Chomsky in 1957, remains influential despite its critics.',
    'Having established the theoretical framework, the paper turns to empirical evidence.',
    'The analysis complete, a clearer picture began to emerge.',
    'Not only does this finding challenge the prevailing view, it raises fundamental questions about methodology.',
    'It is the quality of the argument, not its length, that determines its persuasive force.',
  ],
  commonBrazilianMistakes: [
    {
      wrong: 'Analyzing the results, it was found that the hypothesis was incorrect.',
      right: 'Analyzing the results, the researchers found that the hypothesis was incorrect.',
      note: 'Dangling participial: "it was found" cannot analyze anything. The subject of the main clause must match the subject of the participial phrase.',
    },
    {
      wrong: 'The study, it was conducted over five years, produced significant results.',
      right: 'The study, conducted over five years, produced significant results.',
      note: 'Appositives do not use a separate subject. Remove "it was" and let the past participle work directly.',
    },
    {
      wrong: 'Beginning his argument, the first point he makes is about poverty.',
      right: 'Beginning his argument, the author focuses first on poverty.',
      note: 'Participial subject must be the same as the main clause subject. "Beginning his argument" must be followed by a main clause where HE begins it.',
    },
  ],
  controlledPractice: [
    task(
      'Rewrite each pair of sentences using the indicated structure.',
      '',
      ''
    ),
    task(
      '"The researchers collected the data. They then submitted it for analysis." → Use a fronted past participial.',
      '',
      'Having collected the data, the researchers submitted it for analysis.'
    ),
    task(
      '"Smith is a professor at Oxford. She published her findings in 2019." → Use an appositive.',
      '',
      'Smith, a professor at Oxford, published her findings in 2019.'
    ),
    task(
      '"The preliminary phase was complete. The team moved to implementation." → Use an absolute construction.',
      '',
      'The preliminary phase complete, the team moved to implementation.'
    ),
    task(
      'Identify the dangling participial and rewrite correctly: "Examining the historical record, the conclusion must be that policy failed."',
      '',
      'Examining the historical record, we must conclude that policy failed. (Or: An examination of the historical record leads to the conclusion that policy failed.)'
    ),
  ],
  productionTasks: [
    task(
      'Write a paragraph of 6-8 sentences on a topic of your choice. Requirements: at least one fronted participial phrase, one appositive, one sentence beginning with "Not only" or "It is...that", and no two consecutive sentences beginning with the same word.',
      'Focus on variety and precision. Check each sentence opening before moving on.',
      ''
    ),
    task(
      'Take a paragraph you have written previously and revise it systematically: identify every sentence opening, check for consecutive repetition, and introduce at least two new syntactic structures from this lesson.',
      '',
      ''
    ),
  ],
  lessonRecap: [
    'Fronted participial phrases must share their subject with the main clause.',
    'Appositives add information compactly — no extra subject needed.',
    'Absolute constructions are formal and should be used sparingly.',
    'Sentence variety is measured by opening variety — track it actively.',
    'The delayed subject ("It is...that") is a precision tool, not decoration.',
  ],
  nextLessonBridge: 'Syntactic variety in place. Next: argument structure in academic essays — how to organise a complex position across multiple paragraphs with signposting, anticipation, and concession.',
});

// ─── GRAMMAR-015: Argument architecture in academic essays ────────────────────

const grammar015 = createGrammarLesson({
  ...common,
  id: 'C1-GRAMMAR-015',
  order: 15,
  title: 'Argument architecture: organising complex positions across multiple paragraphs',
  objectives: [
    'Structure a multi-paragraph academic argument with a clear thesis, development, and conclusion.',
    'Use anticipation, concession, and rebuttal at the paragraph level.',
    'Deploy metacommentary to guide the reader through an extended argument.',
    'Distinguish between the grammar of position-holding and position-modifying language.',
  ],
  teacherOpening: `At C1, you are not writing single paragraphs — you are constructing extended arguments. The challenge is to maintain the thread of your position across several moves: asserting, qualifying, anticipating objections, conceding partially, rebutting, and synthesising. Each of these moves has a grammar, and deploying them with precision is what distinguishes C1 from B2 academic writing.`,
  whyItMatters: `Argument architecture is what separates a series of related observations from a genuine academic argument. Without it, a writer may have excellent ideas but fail to persuade — because the reader cannot follow the reasoning, does not know when to agree or resist, and does not see how the parts connect to a conclusion. Controlling this architecture is a C1 skill that is explicitly tested in Cambridge and IELTS exams.`,
  grammarTable: {
    headers: ['Move', 'Function', 'Key language'],
    rows: [
      [
        'Thesis statement',
        'States the central claim of the essay',
        'This essay argues that... / The central contention of this paper is that... / I shall argue that...',
      ],
      [
        'Signposting',
        'Tells the reader what is coming; creates expectation and coherence',
        'The following section will... / This paper proceeds as follows... / Having established X, I turn to...',
      ],
      [
        'Anticipation',
        'Raises an objection before the opponent does; shows awareness',
        'It might be objected that... / A sceptic might argue... / One could counter that...',
      ],
      [
        'Concession',
        'Admits a point while maintaining the overall position',
        'Admittedly... / It is true that... / While X is certainly the case... / Granted...',
      ],
      [
        'Rebuttal',
        'Counters the conceded point or anticipated objection',
        'Nevertheless... / However, this view overlooks... / The problem with this objection is...',
      ],
      [
        'Metacommentary',
        'Steps outside the argument to comment on its structure or progress',
        'The significance of this point will become clear... / This distinction is crucial for what follows... / Before proceeding, it is worth noting...',
      ],
      [
        'Synthesis / conclusion',
        'Draws together the argument; does not merely repeat',
        'What emerges from this analysis is... / Taken together, these findings suggest... / The argument developed above points toward...',
      ],
    ],
  },
  whenToUse: [
    'Use the anticipation-concession-rebuttal sequence when you know there is a strong objection to your position. Raising it yourself shows intellectual confidence.',
    'Use metacommentary sparingly but deliberately: it guides the reader and creates the sense of a writer in control of their material.',
    'Vary the position of your thesis: an introduction-level thesis is conventional; some C1 essays defer the full thesis until after a scene-setting opening.',
    'Reserve synthesis language for the conclusion: do not use "This suggests..." as a transition inside a body paragraph if it sounds like you are concluding too early.',
  ],
  teacherExamples: [
    'This essay argues that the decline of reading for pleasure is not primarily a consequence of digital technology but of institutional failure in early education.',
    'It might be objected that the evidence base for this claim is thin. This is, to some extent, a valid concern — the longitudinal studies available are few and their methodologies vary. Nevertheless, the convergence of findings across different contexts lends the claim a degree of robustness that purely quantity-based critiques fail to undermine.',
    'The significance of this distinction — between correlation and causation — will become clear when we examine the policy implications in Section 4.',
    'Having established the conceptual framework, I turn now to the empirical record.',
    'What emerges from this analysis is not a simple verdict but a more nuanced picture: the policy succeeded in some respects while failing in others that the designers did not anticipate.',
  ],
  commonBrazilianMistakes: [
    {
      wrong: 'In conclusion, I think that my essay showed that technology is good and bad.',
      right: 'What this analysis ultimately suggests is that the effects of technology on reading are context-dependent: positive where institutional support is strong, negative where it is absent.',
      note: 'Conclusions must synthesise, not merely summarise. Avoid "I think" in academic writing and avoid restating what you said rather than what it means.',
    },
    {
      wrong: 'Some people say this is wrong but I disagree because it is not true.',
      right: 'It might be argued that this interpretation is unsupported. However, a close reading of the evidence reveals that this objection rests on a misunderstanding of what the data actually show.',
      note: 'Anticipation and rebuttal require academic formulation: name the objection precisely, concede what is valid, then rebut with evidence or argument.',
    },
    {
      wrong: 'In the next paragraph I will talk about another problem.',
      right: 'The following section examines a related but distinct dimension of the problem.',
      note: "Avoid 'I will talk about' in academic writing. Use nominalisation and formal signposting instead.",
    },
  ],
  controlledPractice: [
    task(
      'Identify which argumentative move each sentence performs.',
      'Moves: thesis, signposting, anticipation, concession, rebuttal, metacommentary, synthesis.',
      ''
    ),
    task(
      '"This essay contends that economic growth and environmental sustainability are not fundamentally incompatible."',
      '',
      'Thesis statement.'
    ),
    task(
      '"It is true that short-term growth often requires resource extraction. However, the argument from inevitability ignores the evidence from economies that have decoupled growth from carbon emissions."',
      '',
      'Concession ("It is true that") followed by rebuttal ("However... ignores the evidence").'
    ),
    task(
      '"Before turning to the empirical record, it is worth establishing the conceptual distinction that will organise this analysis."',
      '',
      'Metacommentary + signposting.'
    ),
    task(
      'Write an anticipation-concession-rebuttal sequence (3 sentences) on the topic: "Universities should focus on employability, not intellectual development."',
      'Begin: "It might be argued that..."',
      ''
    ),
  ],
  productionTasks: [
    task(
      'Write a 200-250 word argumentative section on one of the following topics. Your writing must include: a clear stated position, at least one anticipation-concession-rebuttal sequence, one use of metacommentary, and a synthesis sentence at the end.',
      'Topics: (a) Is artificial intelligence a threat to academic integrity? (b) Should academic study be evaluated through essays or practical projects? (c) Is specialisation in education more valuable than breadth?',
      ''
    ),
    task(
      'Analyse this weak paragraph and rewrite it at C1 level, adding argument architecture: "Social media is very popular. Many young people use it. It can be good or bad. Some say it is bad for mental health. Others say it is good for communication. I think it depends on how you use it."',
      'Add a clear position, one anticipation, one rebuttal, and a synthesis sentence. Aim for 120-150 words.',
      ''
    ),
  ],
  lessonRecap: [
    'Academic argument has a grammar of moves: thesis, anticipation, concession, rebuttal, synthesis.',
    'Raise objections yourself — intellectual confidence, not weakness.',
    'Metacommentary guides the reader without interrupting the argument.',
    'Synthesis does not repeat — it draws conclusions and points to implications.',
    'Signposting is structural glue: use it deliberately at the start of paragraphs and sections.',
  ],
  nextLessonBridge: 'Grammar of argument in place. Next: the vocabulary of academic discourse — how to name ideas, handle evidence, and register epistemic stance with precision.',
});

// ─── VOCABULARY-010: Academic vocabulary for argument and evidence ─────────────

const vocabulary010 = createVocabularyLesson({
  ...common,
  id: 'C1-VOCABULARY-010',
  order: 10,
  title: 'Vocabulary: academic discourse for handling evidence, argument, and stance',
  objectives: [
    'Use precise verbs for handling evidence and claims in academic writing.',
    'Distinguish between verbs of reporting, evaluating, and contesting in academic prose.',
    'Deploy stance vocabulary to calibrate the writer\'s commitment to a claim.',
    'Avoid the most common C1 vocabulary errors in academic register.',
  ],
  teacherOpening: `The vocabulary of academic argument is not about sounding clever — it is about being precise. When you write "Smith says that...", you give no information about whether Smith is asserting, speculating, proving, conceding, or questioning. When you write "Smith demonstrates that..." or "Smith contends that...", you tell the reader exactly what kind of claim is being made. This precision is what makes academic prose functional.`,
  words: [
    {
      word: 'contend',
      partOfSpeech: 'verb',
      definition: 'assert or argue a position, especially in the face of disagreement or difficulty',
      registerNote: 'formal academic',
      exampleSentences: [
        'The author contends that the standard interpretation misreads the historical evidence.',
        'Critics contend that the policy was implemented without adequate public consultation.',
      ],
      collocations: ['contend that + clause', 'contend with + noun (= deal with)', 'widely/strongly contended'],
    },
    {
      word: 'substantiate',
      partOfSpeech: 'verb',
      definition: 'provide evidence to prove or support a claim; make it concrete and credible',
      registerNote: 'formal academic and professional',
      exampleSentences: [
        'The study fails to substantiate the claim that the intervention was effective.',
        'These figures substantiate what qualitative researchers have long suspected.',
      ],
      collocations: ['substantiate a claim/finding/argument', 'fail to substantiate', 'substantiated by evidence'],
    },
    {
      word: 'corroborate',
      partOfSpeech: 'verb',
      definition: 'confirm or give support to a statement or theory by providing additional evidence',
      registerNote: 'formal; stronger than "support" — implies independent confirmation',
      exampleSentences: [
        'These results corroborate the findings of the original study conducted in 2018.',
        'The witness corroborated the account given by the defendant.',
      ],
      collocations: ['corroborate findings/evidence/claims', 'independently corroborated', 'corroborating evidence'],
    },
    {
      word: 'extrapolate',
      partOfSpeech: 'verb',
      definition: 'extend conclusions from known data to unknown or future situations; draw inferences beyond the data',
      registerNote: 'academic and scientific',
      exampleSentences: [
        'It is tempting to extrapolate from these results to the wider population, but caution is warranted.',
        'The authors extrapolate from laboratory conditions to real-world contexts — a step that requires justification.',
      ],
      collocations: ['extrapolate from + data/findings', 'extrapolate to + context', 'cautiously/boldly extrapolate'],
    },
    {
      word: 'conflate',
      partOfSpeech: 'verb',
      definition: 'treat two distinct concepts as if they were the same; wrongly merge',
      registerNote: 'academic criticism; marks an intellectual error',
      exampleSentences: [
        'The author conflates correlation with causation, a common error in this type of study.',
        'It is important not to conflate economic inequality with poverty — they are related but distinct.',
      ],
      collocations: ['conflate X with Y', 'risk conflating', 'the tendency to conflate'],
    },
    {
      word: 'nuance',
      partOfSpeech: 'noun / verb',
      definition: 'a subtle distinction or shade of meaning; to introduce subtlety into an argument or interpretation',
      registerNote: 'widely used in academic and critical discourse',
      exampleSentences: [
        'The debate lacks the nuance required to do justice to the complexity of the issue.',
        'This reading nuances the standard interpretation by attending to the text\'s ambiguities.',
      ],
      collocations: ['nuance a claim/reading/argument', 'lack of nuance', 'important nuance', 'add nuance to'],
    },
    {
      word: 'underpin',
      partOfSpeech: 'verb',
      definition: 'provide the foundation, basis, or support for something',
      registerNote: 'academic and policy writing',
      exampleSentences: [
        'The theoretical assumptions that underpin the model have not been adequately examined.',
        'A commitment to equity underpins the entire framework of the report.',
      ],
      collocations: ['underpin a theory/framework/argument', 'underpinned by + noun', 'the assumptions that underpin'],
    },
    {
      word: 'untenable',
      partOfSpeech: 'adjective',
      definition: 'impossible to maintain or defend against criticism or challenge',
      registerNote: 'formal academic argument',
      exampleSentences: [
        'In the light of this evidence, the original hypothesis becomes untenable.',
        'The position that economic growth is always environmentally neutral is increasingly untenable.',
      ],
      collocations: ['an untenable position/view/claim', 'render something untenable', 'ultimately/clearly untenable'],
    },
    {
      word: 'problematic',
      partOfSpeech: 'adjective',
      definition: 'constituting or presenting a problem; causing difficulties or controversy',
      registerNote: 'very common in academic discourse; use precisely — not as a vague intensifier',
      exampleSentences: [
        'The assumption that economic efficiency is morally neutral is deeply problematic.',
        'This approach is methodologically problematic because it introduces selection bias.',
      ],
      collocations: ['deeply/methodologically/politically problematic', 'render something problematic', 'what is problematic about X is'],
    },
    {
      word: 'interrogate',
      partOfSpeech: 'verb',
      definition: 'examine or question critically and in depth (not just "question")',
      registerNote: 'academic critical discourse; signals deep analytical engagement',
      exampleSentences: [
        'The paper interrogates the assumption that economic models are ideologically neutral.',
        'We must interrogate the conditions under which this apparent consensus emerged.',
      ],
      collocations: ['interrogate an assumption/claim/text', 'interrogate the relationship between'],
    },
    {
      word: 'dichotomy',
      partOfSpeech: 'noun',
      definition: 'a division into two contrasting parts or groups, especially when this division is seen as too simple',
      registerNote: 'academic and critical analysis',
      exampleSentences: [
        'The false dichotomy between freedom and security obscures the actual policy options available.',
        'This study challenges the traditional dichotomy between quantitative and qualitative methods.',
      ],
      collocations: ['a false/traditional/apparent dichotomy', 'challenge a dichotomy', 'the dichotomy between X and Y'],
    },
    {
      word: 'invoke',
      partOfSpeech: 'verb',
      definition: 'cite or appeal to an authority, argument, law, or concept in support of a position',
      registerNote: 'academic and formal argument',
      exampleSentences: [
        'The author invokes Foucault to support a reading that most scholars would find strained.',
        'Courts have invoked this precedent on several occasions without fully examining its implications.',
      ],
      collocations: ['invoke an authority/precedent/concept', 'frequently invoked', 'invoke in support of'],
    },
  ],
  dangerousConfusions: [
    {
      wordPair: ['corroborate', 'substantiate'],
      explanation:
        'Both mean "support with evidence," but corroborate specifically implies independent confirmation from a separate source. Substantiate means to make a claim concrete and credible — it does not require an independent source. Use corroborate when you have independent evidence from another study or source; use substantiate when providing evidence to back up a claim in general.',
      examples: [
        'The findings of Study B corroborate those of Study A. (independent confirmation)',
        'The authors substantiate their claim with three years of longitudinal data. (evidence provided)',
      ],
    },
    {
      wordPair: ['contend', 'claim'],
      explanation:
        '"Claim" is neutral to slightly sceptical — it presents something as the speaker\'s assertion without endorsing it. "Contend" is more active: it implies arguing for a position, often against opposition. In academic writing, "the author claims" can suggest you are questioning their reliability, while "the author contends" is neutral-to-respectful.',
      examples: [
        'The author claims the data supports his view. (slight scepticism implied)',
        'The author contends that the evidence points to a structural explanation. (neutral; active argument)',
      ],
    },
  ],
  productionExercises: [
    task(
      'Replace the underlined word with a more precise academic alternative from this lesson. Explain why your choice is more accurate.',
      '',
      ''
    ),
    task(
      '"The study supports the earlier findings." → Use corroborate or substantiate.',
      '',
      'The study corroborates the earlier findings (if from an independent source) OR The study substantiates the earlier findings (if it provides further evidence for the same claim).'
    ),
    task(
      '"This is a difficult idea." → Use a more precise academic adjective from this lesson.',
      '',
      '"This idea is methodologically problematic" or "This conceptual distinction is untenable in the light of the evidence" — depending on context.'
    ),
    task(
      'Write 3 sentences using contend, interrogate, and dichotomy correctly in an academic context. Sentence topic: the relationship between education and employment.',
      '',
      ''
    ),
  ],
});

// ─── VOCABULARY-011: Evaluative and hedging language in academic argument ─────

const vocabulary011 = createVocabularyLesson({
  ...common,
  id: 'C1-VOCABULARY-011',
  order: 11,
  title: 'Vocabulary: evaluative and epistemic precision in academic discourse',
  objectives: [
    'Use evaluative language to assess claims, methods, and findings with precision.',
    'Calibrate epistemic stance — the degree of certainty attributed to claims.',
    'Distinguish between language that endorses, qualifies, and distances.',
    'Recognise and produce the grammar of evaluative academic prose.',
  ],
  teacherOpening: `Academic writing rarely asserts that something is simply true or false. It calibrates: the evidence suggests, the argument implies, it is plausible that, it remains to be seen whether. This calibration is not weakness — it is intellectual honesty, and it is central to academic credibility. In this lesson, you acquire the precise vocabulary of epistemic stance.`,
  words: [
    {
      word: 'plausible',
      partOfSpeech: 'adjective',
      definition: 'seeming reasonable or probable, but not proven; believable on the basis of available evidence',
      exampleSentences: [
        'This is a plausible explanation, though it requires further testing.',
        'The most plausible interpretation of the data is that demand responded to price signals.',
      ],
      collocations: ['a plausible explanation/interpretation/account', 'highly plausible', 'seem/appear plausible'],
    },
    {
      word: 'tenuous',
      partOfSpeech: 'adjective',
      definition: 'thin, weak, or lacking substance; said of a connection, argument, or claim that has very little evidence',
      exampleSentences: [
        'The link between the two variables appears tenuous at best.',
        'The argument rests on a rather tenuous analogy between biological and social systems.',
      ],
      collocations: ['a tenuous connection/link/argument', 'appear tenuous', 'at best tenuous'],
    },
    {
      word: 'compelling',
      partOfSpeech: 'adjective',
      definition: 'convincing and powerful; evoking strong interest or attention; difficult to resist or deny',
      exampleSentences: [
        'The case for intervention rests on compelling humanitarian grounds.',
        'This is perhaps the most compelling evidence yet gathered in support of the theory.',
      ],
      collocations: ['a compelling argument/case/case/evidence', 'most compelling', 'find something compelling'],
    },
    {
      word: 'contentious',
      partOfSpeech: 'adjective',
      definition: 'causing or likely to cause argument; not agreed upon; disputed',
      exampleSentences: [
        'Whether the policy actually reduced inequality remains contentious.',
        'This is a contentious area, and the evidence is genuinely mixed.',
      ],
      collocations: ['a contentious issue/claim/point', 'remain contentious', 'deeply contentious'],
    },
    {
      word: 'speculative',
      partOfSpeech: 'adjective',
      definition: 'based on conjecture rather than proven fact; not fully supported by evidence',
      exampleSentences: [
        'At this stage, any causal explanation must remain somewhat speculative.',
        'The conclusions in the final section are speculative — the data does not warrant such strong claims.',
      ],
      collocations: ['somewhat/largely/highly speculative', 'remain speculative', 'a speculative interpretation'],
    },
    {
      word: 'warrant',
      partOfSpeech: 'verb / noun',
      definition: 'justify or merit (a response, action, or conclusion); also: the logical basis for an inference',
      exampleSentences: [
        'The evidence does not warrant such a strong conclusion.',
        'The complexity of the issue warrants a more careful analysis than the author provides.',
      ],
      collocations: ['warrant a conclusion/interpretation/further analysis', 'not warrant', 'the warrant for a claim'],
    },
    {
      word: 'tentative',
      partOfSpeech: 'adjective',
      definition: 'not fully worked out; hesitant or provisional; subject to revision',
      exampleSentences: [
        'These findings are tentative and should be treated with appropriate caution.',
        'A tentative conclusion would be that the intervention had a modest positive effect.',
      ],
      collocations: ['tentative conclusions/findings/evidence', 'remain tentative', 'at this stage tentative'],
    },
    {
      word: 'fruitful',
      partOfSpeech: 'adjective',
      definition: 'producing good results; productive; useful for generating ideas or outcomes',
      exampleSentences: [
        'A more fruitful approach might be to examine the institutional rather than the individual level.',
        'The comparison between these two cases proves fruitful for understanding the mechanisms at work.',
      ],
      collocations: ['a fruitful comparison/approach/line of inquiry', 'prove fruitful', 'more/particularly fruitful'],
    },
    {
      word: 'merit',
      partOfSpeech: 'verb / noun',
      definition: 'deserve or be worthy of (attention, consideration); also: the intrinsic worth of something',
      exampleSentences: [
        'This objection merits serious consideration, even if it does not ultimately persuade.',
        'The proposal has genuine merit, though its implementation is complex.',
      ],
      collocations: ['merit consideration/attention/discussion', 'on its (own) merits', 'have/lack merit'],
    },
    {
      word: 'misleading',
      partOfSpeech: 'adjective',
      definition: 'giving a wrong impression; likely to cause someone to have a false understanding',
      exampleSentences: [
        'The summary in the abstract is somewhat misleading: it implies certainty where the data allows only probability.',
        'The use of averages is misleading when the distribution is highly skewed.',
      ],
      collocations: ['potentially/somewhat/deeply misleading', 'a misleading impression', 'dangerously misleading'],
    },
  ],
  dangerousConfusions: [
    {
      wordPair: ['plausible', 'credible'],
      explanation:
        '"Plausible" refers to whether an explanation or theory seems likely given the evidence — it is about fit with the facts. "Credible" refers to whether a source, witness, or person can be believed — it is about trustworthiness. A study can be credible (conducted by reliable researchers) but offer a less plausible interpretation of the data. A theory can be plausible (fits the evidence) but come from a less credible source.',
      examples: [
        'The most plausible explanation for the decline is increased competition. (fits the evidence)',
        'The witness was considered credible by the court. (trustworthy)',
      ],
    },
    {
      wordPair: ['contentious', 'controversial'],
      explanation:
        'Both describe something that provokes disagreement, but "contentious" tends to emphasise that the issue is actively disputed in a specific context (academic, legal, political), while "controversial" implies that it provokes strong public reaction or moral disagreement. "Contentious" is the more academic register; "controversial" is more general.',
      examples: [
        'The dating of the manuscript remains contentious among specialists. (academic dispute)',
        'The policy was controversial among the general public. (broad public reaction)',
      ],
    },
  ],
  productionExercises: [
    task(
      'Rewrite this sentence with a more evaluatively precise vocabulary, specifying your epistemic stance: "Some researchers think that social media is bad for teenagers."',
      'Choose a stance: endorsing, qualifying, distancing, or disputing. Reflect it in your word choices.',
      'Possible answers: "There is a growing body of research suggesting that social media use correlates with reduced wellbeing in adolescents, though the causal picture remains contentious." / "The claim that social media is uniformly harmful to teenagers is more speculative than its proponents acknowledge: the evidence is mixed and the mechanisms poorly understood."'
    ),
    task(
      'Write an evaluative sentence for each stance: (a) you find the evidence compelling; (b) you find the argument plausible but tentative; (c) you find the conclusion misleading or unwarranted.',
      'Topic: a study claiming that four-day working weeks increase productivity by 20%.',
      ''
    ),
  ],
});

// ─── EXPORTS ─────────────────────────────────────────────────────────────────

export const C1_DEEP_ACADEMIC_WRITING_PART1 = Object.freeze([
  grammar014,
  grammar015,
  vocabulary010,
  vocabulary011,
]);

export const C1_DEEP_ACADEMIC_WRITING_PART1_BY_PILLAR = Object.freeze({
  grammar: Object.freeze([grammar014, grammar015]),
  vocabulary: Object.freeze([vocabulary010, vocabulary011]),
  reading: Object.freeze([]),
  listening: Object.freeze([]),
  speaking: Object.freeze([]),
  writing: Object.freeze([]),
  checkpoint: Object.freeze([]),
});
