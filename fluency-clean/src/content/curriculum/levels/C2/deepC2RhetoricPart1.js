import { createGrammarLesson, createVocabularyLesson, createReadingLesson, createListeningLesson } from '../../../schemas/index.js';

const level = 'C2';
const status = 'ready';
const common = { level, status, estimatedMinutes: 75, tags: ['c2-2', 'rhetoric', 'register', 'style', 'deep-approved-target'] };

function task(instruction, note = '', expected = '') { return { instruction, note, expected }; }

export const C2_DEEP_RHETORIC_PART1 = Object.freeze([

  // ─── GRAMMAR-003: Fronting and foregrounding ──────────────────────────────────
  createGrammarLesson({
    ...common,
    id: 'C2-GRAMMAR-003',
    order: 3,
    title: 'Grammar: Fronting and foregrounding — managing information structure for rhetorical effect',
    objectives: [
      'Understand and deploy fronting structures to control information focus and rhetorical emphasis.',
      'Distinguish between topicalisation, fronted adjuncts, and inverted structures in formal prose.',
      'Use information structure (given-new, topic-comment) to guide the reader through complex argument.',
      'Recognise how expert writers control what is in theme position and why.',
    ],
    teacherOpening: 'Every English sentence has a theme — what it starts with — and a rheme — what is said about the theme. Expert writers do not leave this to chance. They front what they want to be the topic, they move the new information to the end (where it is most prominent), and they use unusual word order to create emphasis, contrast, and rhetorical force. At C2, this becomes a productive stylistic tool.',
    grammarTable: {
      headers: ['Structure', 'Example', 'Rhetorical function', 'Register'],
      rows: [
        ['Topicalisation (fronted object/complement)', '"This argument, the author never fully develops." / "What Kant called \'the moral law\' — this is what is at stake."', 'Puts topic first; creates contrast or emphasis; signals that the fronted element is already known', 'Formal writing and literary prose; archaic in some forms'],
        ['Fronted adverbial', '"In this context, the distinction becomes crucial." / "Throughout the period, inflation remained high."', 'Sets the scene, frame, or condition before the main predication; guides interpretation of the main clause', 'Standard in formal and academic prose; very common'],
        ['Fronted participial clause', '"Acknowledging these limitations, the authors still claim…" / "Having established this, we can now turn to…"', 'Signals that the fronted action precedes or accompanies the main clause; adds logical sequence', 'Formal and academic; requires correct subject control'],
        ['Fronted prepositional phrase with inversion', '"Into this context stepped the figure of…" / "At the centre of the debate stands the question of…"', 'Creates a literary, dramatic effect; moves the subject to post-verbal position', 'Literary and high-formal prose; infrequent but distinctive'],
        ['Cleft for contrastive focus', '"It is the framing, not the evidence, that the author challenges." / "What the data show is not that X but that Y."', 'Isolates the element under focus; particularly powerful for correction and contrast', 'Academic and analytical; very high register'],
        ['Given-new principle', 'Given information at the start of the sentence; new information at the end. "The study found three effects. The first effect concerns…"', 'Guides the reader by connecting new sentences to previous content; creates cohesion through information structure', 'Universal principle in expert prose'],
        ['Marked theme (comment clause in theme)', '"What is striking is that…" / "What matters here is not X but Y." / "What the evidence reveals is…"', 'Creates a frame for the proposition that follows; emphasises the comment rather than the subject', 'Academic, analytical, and rhetorical contexts'],
      ],
    },
    brazilianMistakes: [
      { mistake: 'Putting new information at the start of a sentence: "A new methodology was proposed by the study. Previous methodologies it criticised extensively."', correction: 'New information should come at the end: "The study proposes a new methodology, offering extensive criticism of those previously employed." The fronted "Previous methodologies" is grammatically possible but rhetorically backwards.', explanation: 'The given-new principle is not a grammar rule but an information structure principle. Violating it is not ungrammatical but it disorients the reader. At C2, control over information structure is part of the stylistic competence being assessed.' },
      { mistake: 'Fronted participial without subject control: "Having established the theoretical framework, the data can now be discussed."', correction: '"Having established the theoretical framework, [we/the authors] can now discuss the data." — the subject of the main clause must be the same as the subject of the participial clause.', explanation: 'Dangling participials (where the participial clause has a different implied subject from the main clause) are a formal error at C2 level. They also cause garden-path readings that temporarily mislead the reader.' },
    ],
    controlledPractice: [
      task(
        'Front the appropriate element in each sentence for rhetorical effect:\n(a) [Front the contrast] "Many scholars have accepted this conclusion, but Smith has challenged it consistently."\n(b) [Front the framing adverbial] "The policy failed for complex reasons, in this institutional context."\n(c) [Cleft for focus] "The methodology, not the findings, is what the review challenges."',
        'Think about what should be in theme position — what the sentence is about — and what should be in rheme position — the new information.',
        '(a) "This conclusion many scholars have accepted; it is Smith who has consistently challenged it." — or: "This conclusion, while widely accepted, has been consistently challenged by Smith." (b) "In this institutional context, the policy failed for complex reasons." (c) "It is the methodology, not the findings, that the review challenges." (already clefted; could also be: "What the review challenges is the methodology, not the findings.")'
      ),
      task(
        'Rewrite using the given-new principle to improve cohesion:\n"The experiment had three phases. The researchers administered surveys in the first phase. Interviews were conducted in the second phase. In the third phase, observation."\nRewrite so that each sentence connects to the previous one through the given-new structure.',
        'Each sentence should begin with given information (from the previous sentence) and end with the new information.',
        '"The experiment had three phases. The first phase involved survey administration; the second, interviews; the third, direct observation." (Note: gapping also helps here.) Or more elaborated: "The experiment had three phases. In the first, surveys were administered to all participants. These were followed, in the second phase, by in-depth interviews. Observation was the method of the third and final phase."'
      ),
    ],
    productionTasks: [
      task(
        'Write a short analytical paragraph (100–120 words) on a topic of your choice that deliberately uses: (a) a fronted adverbial to set the scene; (b) a cleft sentence for contrastive focus; (c) the given-new principle to guide the reader. Annotate each.',
        'Think of this as a demonstration of conscious control over information structure — the goal is not to produce natural prose that happens to have these features, but to show that you can deploy them intentionally.',
        'Evaluate: Is the fronted adverbial doing rhetorical work, or is it arbitrary? Does the cleft sentence genuinely isolate the element that needs focus? Does the given-new structure make the paragraph easier to follow?'
      ),
    ],
  }),

  // ─── GRAMMAR-004: Stance and hedging at C2 ───────────────────────────────────
  createGrammarLesson({
    ...common,
    id: 'C2-GRAMMAR-004',
    order: 4,
    title: 'Grammar: Epistemic stance and evidentiality — positioning yourself and your sources at C2',
    objectives: [
      'Deploy a full range of epistemic stance markers in academic and intellectual discourse.',
      'Distinguish between different types of hedging (possibility, probability, source attribution, limitation).',
      'Use evidentiality markers to attribute claims to their appropriate sources.',
      'Calibrate stance to content — matching the certainty of a claim to the strength of the evidence.',
    ],
    teacherOpening: 'At C2, epistemic sophistication — knowing not just what to say but how certain to be about it, and how to signal that certainty precisely — is one of the marks of mastery. Every claim in an academic text carries an implicit or explicit stance: how confident is the writer? What is the evidence? Whose view is being reported? Expert writers calibrate this continuously and unconsciously; at C2, it becomes an explicit skill.',
    grammarTable: {
      headers: ['Stance type', 'Markers', 'Function', 'Common error'],
      rows: [
        ['High-certainty assertion', '"X is the case." / "X demonstrates that…" / "X establishes…"', 'Used only when evidence is strong and the claim is not contested', 'Using certainty markers for claims that are actually tentative or contested'],
        ['Hedged certainty (probability)', '"X appears to / seems to / would seem to / tends to…" / "It is likely that…"', 'The claim is probably true but not certain; signals appropriate epistemic humility', 'Under-hedging contested claims; over-hedging obvious or established ones'],
        ['Epistemic possibility', '"X may / might / could…" / "It is possible that…" / "One possibility is that…"', 'The claim is plausible but not established; used for speculative or exploratory claims', 'Using "may" when evidence is stronger than mere possibility; under-signalling genuine uncertainty'],
        ['Source attribution (reporting)', '"X argues / contends / suggests / notes / observes / claims / asserts…"', 'Attributes the claim to a source; verb choice signals degree of author endorsement', 'Using "says" in academic contexts; not distinguishing endorsement from neutral report'],
        ['Limitation of scope', '"In this context / in these circumstances / under these conditions / within this framework…"', 'Signals that the claim applies within limits; important for generalisation', 'Making universal claims from limited evidence'],
        ['Distancing from claim', '"So-called / allegedly / purportedly / what the author describes as…"', 'Signals that the writer does not endorse the framing of a concept or claim', 'Absent in L2 writing; learners often inadvertently endorse frames they should be questioning'],
        ['Concessive stance', '"While it is true that… nevertheless…" / "Granted, X; however, Y." / "Admittedly, X; that said, Y."', 'Acknowledges a point while maintaining a contrary position; shows engagement with complexity', 'Concessions that are so heavy they undermine the main argument'],
      ],
    },
    brazilianMistakes: [
      { mistake: 'Under-attribution: "The study found that poverty causes crime."', correction: '"The study found evidence of an association between poverty and crime" — or "The study\'s findings suggest that poverty may be a contributing factor in crime rates." Causal claims require strong evidence; correlational findings should not be reported as causal.', explanation: 'Over-claiming causal relationships from correlational data is one of the most common errors in academic writing. At C2, the distinction between correlation, association, and causation must be marked explicitly in the language used.' },
      { mistake: 'Not distinguishing endorsement from neutral report: "Smith argues that the earth is flat. This is clearly wrong."', correction: '"Smith argues — implausibly — that the earth is flat." or "Smith argues, somewhat tendentiously, that…" — or use distancing markers: "Smith\'s claim that the earth is flat…"', explanation: 'Academic writers signal their position on reported claims through verb choice and additional markers. At C2, the failure to signal that you are reporting without endorsing (or endorsing with reservations) is a significant stylistic and epistemic error.' },
    ],
    controlledPractice: [
      task(
        'Add the appropriate epistemic stance marker to each sentence:\n(a) [Source attribution, mild scepticism] Smith claims that the intervention was effective.\n(b) [High certainty] The data show a clear causal relationship.\n(c) [Limitation of scope] These findings can be generalised to other populations.\n(d) [Epistemic possibility for an exploratory claim] The effect is produced by a third variable.',
        'Choose a marker that precisely matches the epistemic status indicated in brackets.',
        '(a) "Smith claims — without fully adequate evidence — that the intervention was effective." or "What Smith describes as an effective intervention…" (b) "The data appear to show a strong — though not necessarily causal — association." (c) "Within this population, these findings may have some applicability; whether they can be generalised beyond this context remains unclear." (d) "One possibility — not excluded by the data — is that the effect is produced by a third variable."'
      ),
      task(
        'Rewrite the following passage to calibrate the stance markers more precisely. The passage makes claims that are stronger than the evidence justifies:\n"This study proves that social media causes depression in teenagers. All teenagers who use social media become depressed. The evidence is conclusive."',
        'Replace unwarranted certainty with appropriate hedging. Distinguish association from causation.',
        '"This study provides evidence of an association between heavy social media use and depressive symptoms in a sample of teenagers. The findings suggest — though do not establish causally — that social media use may be a contributing factor; other explanations are not ruled out by the data. Further longitudinal research is needed before any causal claim can be made with confidence."'
      ),
    ],
    productionTasks: [
      task(
        'Write an 80-word passage on a contested empirical question (your choice) that uses at least five different types of stance marker, each calibrated precisely to the epistemic status of the claim it qualifies.',
        'The goal is not to pack the passage with hedges but to show that each hedge is doing a specific epistemic job — marking the right level of certainty for the specific claim it qualifies.',
        'Evaluate: Is each stance marker appropriate to the specific claim? Is the overall epistemic picture of the passage accurate — not uniformly certain, not uniformly hedged, but calibrated? Would an expert in the field recognise this as the right level of certainty?'
      ),
    ],
  }),

  // ─── VOCABULARY-003: Register and style at C2 ────────────────────────────────
  createVocabularyLesson({
    ...common,
    id: 'C2-VOCABULARY-003',
    order: 3,
    title: 'Vocabulary: Register and style — navigating the full spectrum of formal English at C2',
    objectives: [
      'Understand and command the full register spectrum from formal academic to informal spoken English.',
      'Choose vocabulary for its register implications as well as its semantic content.',
      'Avoid register inconsistency — the mixing of formal and informal elements that marks C1 but not C2 writing.',
      'Use deliberately elevated or deflated register as a rhetorical tool.',
    ],
    teacherOpening: 'Register — the social level of language — is one of the most important and least taught dimensions of mastery. At C2, the question is not "Is this word correct?" but "Is this word right for this context?" The same idea can be expressed at many register levels, and choosing wrongly — too formal, too informal, or inconsistently — is as much an error as using the wrong word.',
    words: [
      { word: 'ostensibly', definition: 'Apparently or purportedly — but the word implies a gap between the surface appearance and the reality; used to signal that the stated reason or appearance may not be the real one.', example: 'The policy was ostensibly designed to improve air quality; its primary function, however, appears to have been to placate environmental groups before the election.', collocations: ['ostensibly designed to', 'ostensibly motivated by', 'what is ostensibly a…', 'ostensibly neutral'] },
      { word: 'precipitate (adj/verb)', definition: 'As adjective: done suddenly or without careful consideration (near-synonym: rash, hasty). As verb: cause something, especially suddenly or unexpectedly.', example: 'The decision to raise interest rates was precipitate — there was insufficient time for the evidence to inform the judgment. The announcement precipitated a sharp fall in market confidence.', collocations: ['a precipitate decision', 'precipitate action', 'precipitate a crisis', 'precipitate change'] },
      { word: 'inimical', definition: 'Tending to obstruct or harm; hostile to; incompatible with.', example: 'A culture of short-term thinking is inimical to the kind of sustained investment that innovation requires.', collocations: ['inimical to', 'deeply inimical', 'fundamentally inimical to', 'inimical to progress'] },
      { word: 'propitious', definition: 'Giving or indicating a good chance of success; favourable.', example: 'The political conditions were not propitious for reform: the government was unpopular, the economy was contracting, and the public\'s appetite for change had been exhausted by years of crisis.', collocations: ['propitious conditions', 'a propitious moment', 'hardly propitious', 'more propitious circumstances'] },
      { word: 'excoriate', definition: 'To criticise severely; to censure; historically, to strip the skin from.', example: 'The review excoriates the author for the ethical implications of her research design, arguing that the use of deception in the experimental protocol was indefensible.', collocations: ['excoriate for', 'excoriating criticism', 'an excoriating review', 'publicly excoriated'] },
      { word: 'pernicious', definition: 'Having a harmful effect, especially in a gradual or subtle way.', example: 'The most pernicious effect of the disinformation campaign was not that it was believed but that it made citizens uncertain what to believe — a corrosive form of epistemic damage.', collocations: ['a pernicious effect', 'pernicious influence', 'deeply pernicious', 'most pernicious'] },
      { word: 'pellucid', definition: 'Translucently clear; (of writing) lucid and easily understood; (of water) transparently clear.', example: 'The prose is pellucid: not a word is wasted, every sentence advances the argument, and the reader is never left uncertain about what the text is claiming.', collocations: ['pellucid prose', 'pellucid argument', 'pellucid clarity', 'refreshingly pellucid'] },
      { word: 'tendentious', definition: 'Already covered in C2-VOCABULARY-002; review collocations here. Promoting a particular cause in a biased or misleading way.', example: 'The selection of evidence in this report is tendentious: every study cited supports the conclusion; no contrary evidence is mentioned.', collocations: ['a tendentious reading', 'dangerously tendentious', 'tendentiously presented', 'a tendentious framing'] },
      { word: 'prolix', definition: 'Using or containing too many words; tediously lengthy; verbose.', example: 'The report is prolix — its central argument, which could be stated in three pages, is buried in forty pages of repetitive qualification.', collocations: ['unnecessarily prolix', 'prolix and repetitive', 'in a prolix style', 'prolix to the point of obscurity'] },
      { word: 'trenchant', definition: 'Vigorous, effective, and to the point; incisive (of a person\'s speech or writing); cutting.', example: 'The reviewer\'s analysis is trenchant: in three paragraphs it dismantles an argument that took the original author thirty pages to make.', collocations: ['a trenchant critique', 'trenchant analysis', 'trenchant observation', 'trenchant in her criticism'] },
    ],
    dangerousConfusions: [
      { pair: ['ostensibly', 'apparently'], explanation: '"Apparently" reports an appearance without necessarily casting doubt on it. "Ostensibly" implies a gap between the stated reason and the real one — it signals that the writer suspects the stated rationale is a cover for something else. "Apparently, the policy succeeded" (neutral). "Ostensibly successful, the policy actually masked a deeper failure" (the success is presented as a facade). Use "ostensibly" only when you intend to signal that the surface presentation is misleading.' },
      { pair: ['precipitate (verb)', 'preclude'], explanation: '"Precipitate" (verb) means to cause something to happen suddenly. "Preclude" means to prevent something from happening. "The announcement precipitated a crisis" (caused it). "The announcement precluded any further negotiation" (made it impossible). These are nearly opposites in their temporal directionality and effect.' },
    ],
  }),

  // ─── VOCABULARY-004: Intellectual critique vocabulary ─────────────────────────
  createVocabularyLesson({
    ...common,
    id: 'C2-VOCABULARY-004',
    order: 4,
    title: 'Vocabulary: The vocabulary of intellectual critique — evaluating ideas, arguments, and texts at C2',
    objectives: [
      'Use a sophisticated vocabulary for evaluating intellectual work at C2 level.',
      'Distinguish between terms of intellectual praise and criticism with precision.',
      'Deploy evaluative vocabulary with appropriate hedging and register.',
      'Avoid the vague or hyperbolic evaluations typical of L2 writing at the C1/C2 boundary.',
    ],
    teacherOpening: 'The vocabulary of intellectual evaluation — how we praise and criticise arguments, texts, and ideas — is one of the most important and most nuanced areas of C2 vocabulary. At C2, "interesting," "important," and "good" are not enough. You need a vocabulary that can distinguish between an argument that is well-constructed but based on flawed premises, and one that is sloppily constructed but makes a genuinely novel point.',
    words: [
      { word: 'reductive', definition: 'Already covered at C1; at C2, learn the collocations and deployment patterns more precisely.', example: 'The analysis is reductive in a specific way: it collapses a multi-dimensional phenomenon into a single variable, gaining analytical tractability at the cost of explanatory power.', collocations: ['reductive in a specific way', 'dangerously reductive', 'reductive but tractable', 'resist the reductive move'] },
      { word: 'parsimonious', definition: 'Using as few assumptions or elements as possible to explain something; in academic contexts, usually positive — a parsimonious explanation is elegant and economical.', example: 'The model is parsimonious: three variables account for 80% of the variance, which is remarkable for a phenomenon this complex.', collocations: ['a parsimonious explanation', 'elegantly parsimonious', 'the most parsimonious account', 'parsimony (noun)'] },
      { word: 'intractable', definition: 'Hard or impossible to deal with, manage, or solve; stubbornly persistent.', example: 'The problem of unconscious bias is intractable in the sense that the very mechanisms that produce it also make it difficult to detect and correct from the inside.', collocations: ['an intractable problem', 'deeply intractable', 'apparently intractable', 'render intractable'] },
      { word: 'solipsistic', definition: 'Relating to solipsism (the view that only one\'s own mind is real); more broadly, self-absorbed, excessively focused on one\'s own perspective without acknowledging others.', example: 'The analysis is solipsistic: it treats one national context as universal without acknowledging that its assumptions may not hold elsewhere.', collocations: ['solipsistic in its framing', 'a solipsistic perspective', 'dangerously solipsistic', 'not merely solipsistic but'] },
      { word: 'elliptical', definition: 'Expressed in a way that leaves out words or information; concise to the point of being difficult to understand.', example: 'The argument is elliptical at a crucial point: the move from premise to conclusion is made without the intermediate steps that would make it persuasive.', collocations: ['elliptical at a key point', 'frustratingly elliptical', 'elliptical in its reasoning', 'an elliptical passage'] },
      { word: 'syllogistic', definition: 'Relating to or of the nature of a syllogism (a deductive argument with two premises and a conclusion); used to describe formal or mechanical reasoning.', example: 'The argument is syllogistic in structure: if all X are Y, and Z is X, then Z is Y — valid in form, but the first premise requires the empirical work the paper does not do.', collocations: ['syllogistic reasoning', 'a syllogistic structure', 'formally syllogistic', 'the syllogistic form of'] },
      { word: 'meretricious', definition: 'Apparently attractive but having in reality no value or integrity; falsely alluring (from Latin meretrix, prostitute).', example: 'The prose is meretricious: elegant sentences that, on closer inspection, say nothing; the appearance of depth without the substance.', collocations: ['meretricious prose', 'meretricious rhetoric', 'meretricious appeal', 'merely meretricious'] },
      { word: 'heuristic', definition: 'A rule of thumb or practical approach that may not be perfectly accurate or optimal but is sufficient for the immediate goal; also used as an adjective to describe a problem-solving approach.', example: 'The model functions as a heuristic rather than a precise theory: it identifies the key variables and their rough relationships without providing a mathematically exact account.', collocations: ['a useful heuristic', 'function as a heuristic', 'heuristic value', 'a heuristic device', 'the heuristic power of'] },
    ],
    dangerousConfusions: [
      { pair: ['parsimonious', 'miserly/stingy'], explanation: '"Parsimonious" in everyday English can mean excessively sparing or reluctant to spend — a negative quality. In academic and scientific contexts, "parsimonious" is a positive term meaning economical in explanation, using the fewest assumptions necessary. "A parsimonious account" in academic writing means an elegant and economical one. Do not use "parsimonious" negatively in academic contexts unless you make clear you mean "overly simplifying."' },
      { pair: ['elliptical (style)', 'elliptical (shape)'], explanation: '"Elliptical" in geometry means oval-shaped. In language and argument, it means expressed incompletely, leaving out steps or information — either as a deliberate stylistic compression (positive) or as a failure of explanation (negative). Context determines which. In the phrase "the argument is elliptical at this point," the connotation is usually that the argument is incompletely developed there — a criticism.' },
    ],
  }),

  // ─── READING-002: Dense philosophical argument ────────────────────────────────
  createReadingLesson({
    ...common,
    id: 'C2-READING-002',
    order: 2,
    title: 'Reading: "The Paradox of Tolerance" — a philosophical argument and its limits',
    objectives: [
      'Read a dense philosophical argument at C2 level and reconstruct its logical structure.',
      'Identify the premises, the conclusion, and the inferential steps of a philosophical argument.',
      'Evaluate the argument\'s validity and soundness — are the premises true? does the conclusion follow?',
      'Engage with a politically and philosophically contested text without collapsing into advocacy.',
    ],
    teacherOpening: 'This passage engages with Karl Popper\'s "paradox of tolerance" — a philosophical argument that has become widely cited in contemporary political discourse, often without full understanding of its logic or its limits. At C2, reading a philosophical argument means reconstructing its logical structure, not just understanding its conclusions, and evaluating it critically, not just accepting or rejecting it on political grounds.',
    passage: `The Paradox of Tolerance: Popper's Argument and Its Misapplications

Karl Popper introduced the "paradox of tolerance" in a footnote to The Open Society and Its Enemies (1945), and it has since become one of the most cited and most misunderstood arguments in political philosophy. The argument, in its original form, is precise and limited; in its popular circulation, it has been generalised well beyond what the original logic supports.

Popper's argument runs as follows. A tolerant society that tolerates all views, including intolerant ones, will eventually be destroyed by those intolerant views: the intolerant will use the freedoms afforded by tolerance to organise, to spread their views, and ultimately to seize control and eliminate tolerance itself. Therefore, a tolerant society, if it is to remain tolerant, must refuse to tolerate intolerance. The argument is a consequentialist one: the justification for intolerance toward intolerance is the preservation of tolerance itself.

Several features of this argument are frequently overlooked. First, Popper specifies that the refusal to tolerate intolerance should be invoked only as a last resort — only when the tolerant can no longer counter intolerant ideas through "rational argument." The argument is not a licence to silence views one finds objectionable, repugnant, or even wrong; it is a response to the specific situation in which rational argument has failed and the threat to tolerance is existential. Second, Popper distinguishes between suppression of ideas and the suppression of the advocates of those ideas — he is primarily concerned with the right to act, not to speak. Third, the argument is consequentialist in structure: it justifies restricting tolerance only insofar as that restriction serves the goal of preserving tolerance. An application of the "paradox" that would actually reduce the overall level of tolerance in a society cannot be justified on Popper\'s own terms.

In its popular circulation, the argument has been simplified to something like: "tolerance does not require tolerating intolerance." This is true as far as it goes, but it is far weaker than Popper's original claim and is easily weaponised to justify suppressing any view the speaker finds offensive. The argument's logical force depends on the conditions Popper specifies — and those conditions are demanding. Whether they obtain in any particular case is an empirical and political question, not a philosophical one that the paradox itself resolves.`,
    wordCount: 345,
    tasks: [
      task(
        'Reconstruct Popper\'s argument in logical form: identify the premises and the conclusion. Is the argument deductively valid?',
        'Re-read paragraph 2. A valid argument is one where the conclusion follows necessarily from the premises, even if the premises are false. Is Popper\'s argument valid in this sense?',
        'Premises: (1) A tolerant society that tolerates all views, including intolerant ones, will eventually be destroyed by intolerant views. (2) A tolerant society should seek to remain tolerant. Conclusion: Therefore, a tolerant society must refuse to tolerate intolerance. The argument is deductively valid: if both premises are true, the conclusion follows. However, validity is a formal property — the argument can be valid even if the premises are false. The question of soundness (whether the argument is both valid and has true premises) depends on whether Premise (1) is empirically true — which is contested.'
      ),
      task(
        'The author identifies three features of Popper\'s argument "frequently overlooked." What are they, and why does each matter for the application of the argument?',
        'Re-read paragraph 3. Each limitation has practical implications for when the argument can legitimately be invoked.',
        '(1) The argument is a last resort — invoked only when rational argument has failed and the threat is existential. This limits its application: you cannot invoke the "paradox" merely because you find a view repugnant; you must first attempt rational engagement. (2) Popper distinguishes between suppressing speech and suppressing action — he is primarily concerned with the right to act against tolerance, not the right to advocate intolerant views. This limits its application to actions rather than expressions. (3) The argument is consequentialist: it justifies restricting tolerance only if the restriction serves to preserve tolerance overall. A restriction that reduces net tolerance cannot be justified on Popper\'s terms, even if it targets "intolerant" views.'
      ),
      task(
        'What is the difference between the "popular" version of the paradox and Popper\'s original? Why does the author say the popular version is "far weaker" and can be "weaponised"?',
        'Re-read paragraph 4. The contrast is between a precise, conditional argument and a simplified slogan.',
        'The popular version: "tolerance does not require tolerating intolerance." This is formally true but much weaker than Popper\'s argument: it merely denies an obligation (you need not tolerate intolerance) but says nothing about when or whether you should restrict it, or what restrictions are justified. Popper\'s argument has specific conditions (last resort, existential threat, consequentialist justification). The popular version has none — it can be applied to any view the speaker calls "intolerant." The author says it can be "weaponised" because without Popper\'s conditions, the slogan justifies restricting any view labelled as intolerant by the person applying it, which could itself be a form of intolerance.'
      ),
      task(
        'Is Popper\'s argument sound — that is, are both of its premises true? Evaluate Premise (1) in particular: is it true that a tolerant society that tolerates intolerant views will eventually be destroyed by them?',
        'This is an evaluative question with no single correct answer. The question is whether the empirical claim in Premise (1) is well-founded.',
        'Premise (1) is an empirical claim about the fate of tolerant societies that tolerate intolerant movements. The historical evidence is mixed: some tolerant societies have been destroyed by intolerant movements (Weimar Germany is the standard example); others have successfully managed or contained intolerant movements without becoming intolerant themselves. The premise is too general to be straightforwardly true. Its truth depends on context: the strength of democratic institutions, the size and organisation of the intolerant group, the effectiveness of legal remedies, and the general culture of the society. Popper was writing in the immediate aftermath of Nazism\'s rise in a functioning democracy; whether his generalisation holds more broadly is genuinely contested. [Students\' evaluations of the soundness of the argument will vary; the goal is the quality of the reasoning, not the conclusion reached.]'
      ),
    ],
  }),

  // ─── LISTENING-002: High-speed academic debate ────────────────────────────────
  createListeningLesson({
    ...common,
    id: 'C2-LISTENING-002',
    order: 102,
    title: 'Listening: "Free Speech and Its Discontents" — a high-speed academic debate on the limits of toleration',
    objectives: [
      'Follow a fast-paced, high-level academic debate at C2 level without simplification.',
      'Track rapid exchanges, interruptions, and simultaneous development of competing arguments.',
      'Identify implicit premises and unstated assumptions in spoken academic argument.',
      'Answer comprehension, inference, and critical evaluation questions at C2 level.',
    ],
    listeningPreparation: [
      task('Before listening: consider whether there are principled limits to free speech and, if so, who should decide where those limits lie. Think about the tension between protecting vulnerable speakers from harm and protecting dissenting speech from state restriction.', 'This tension drives the entire debate; having a position helps you evaluate each speaker\'s moves.'),
      task('Prediction: predict one argument that speech restrictions will be misused against the powerless and one counter-argument that unrestricted speech itself silences the powerless. Consider whether the speech-conduct distinction resolves this tension.', 'Listen for how each speaker handles the gap between principle and implementation.'),
      task('Key words to listen for: structural framing (asymmetries of power, chilling effect, speech-conduct distinction), argumentative moves (I\'d push back on, that\'s a concern about X not Y, your position entails), and scope language (narrow basis, burden of proof, expansion of categories).', 'These cues help you track rapid exchanges and reconstruct arguments that are made partially or interrupted.'),
    ],
    teacherOpening: 'This debate is faster and less structured than previous listening exercises — this is intentional. At C2, you need to function in authentic academic discourse, which does not always slow down or repeat itself. Listen carefully, take notes, and be prepared to reconstruct arguments that are made partially, interrupted, and revised in real time.',
    transcript: [
      { speaker: 'Moderator', text: 'We\'re asking whether there are principled limits to free speech, and if so, where they lie. Marcus, you\'ve argued that the standard liberal view — that almost all speech should be protected — is inadequate. Why?' },
      { speaker: 'Marcus', text: 'Because the standard view treats speech as costless to everyone except the speaker. It doesn\'t take seriously the asymmetries of power — who gets heard, who gets silenced by the chilling effect of harassment, who can afford to exercise their speech rights. Formal freedom to speak is hollow if the practical conditions for speaking safely don\'t exist for everyone equally.' },
      { speaker: 'Sophia', text: 'But the remedy you\'re proposing — which is some form of additional speech restriction — is going to be administered by someone. And historically, restrictions on speech are almost always used against the least powerful. The labour movement, the civil rights movement, anti-war protesters — all of them faced speech restrictions dressed up in the language of social harm.' },
      { speaker: 'Marcus', text: 'That\'s a concern about implementation, not about the principle. Of course bad actors can misuse a restriction. That doesn\'t show the restriction is wrong; it shows we need good institutions to administer it.' },
      { speaker: 'Sophia', text: 'I\'d push back on the idea that the argument from history is "merely" about implementation. The pattern is so consistent that it starts to look like a structural feature of how speech restrictions work — not a bug but the system. When you give the state power to restrict speech in the name of harm, that power will be used against the vulnerable, reliably, regardless of the stated intent.' },
      { speaker: 'Marcus', text: 'Then your position entails that we can never restrict speech, even in extreme cases — harassment campaigns, coordinated threats, targeted abuse. That seems like it privileges one set of people\'s speech rights over another set of people\'s capacity to participate in public life.' },
      { speaker: 'Sophia', text: 'No — I\'m distinguishing between speech and conduct. Coordinated harassment, credible threats, incitement to violence — these involve action, not just expression. They can be regulated under existing frameworks without needing to create new categories of restricted speech. What I\'m opposing is the expansion of "harmful speech" as a category, because that expansion always captures things we didn\'t intend it to capture.' },
      { speaker: 'Marcus', text: 'But the speech-conduct distinction you\'re relying on is doing a lot of work — more work than it can bear. A targeted harassment campaign is technically speech. An coordinated disinformation campaign is technically speech. The distinction doesn\'t hold up under pressure.' },
      { speaker: 'Sophia', text: 'I\'d say the distinction holds — but the legal instantiation of it needs work. The point is that the framework for regulation should be built on as narrow a basis as possible, with the burden of proof firmly on those who want to restrict. That\'s not the same as saying no restriction is ever justified.' },
    ],
    tasks: [
      task(
        'What is Marcus\'s core argument against the "standard liberal view" of free speech? What does he say the standard view fails to take into account?',
        'Listen to turn 2. Marcus makes a point about formal freedom vs. practical conditions.',
        'Marcus argues that the standard liberal view treats speech as costless to everyone except the speaker. It fails to take account of power asymmetries — who gets heard, who is silenced by the chilling effect of harassment, and whether the practical conditions for speaking safely exist equally for all. Formal freedom to speak is, he argues, hollow if the background conditions that enable speech are distributed unequally.'
      ),
      task(
        'What is Sophia\'s response to Marcus\'s point about history? Why does she say the historical pattern is more than a concern about implementation?',
        'Listen to turns 3 and 5. Sophia distinguishes between a concern about implementation and a structural claim.',
        'Sophia concedes that the concern about misuse is real but denies it is merely about implementation. She argues that the historical pattern — speech restrictions consistently used against the least powerful (labour movement, civil rights, anti-war protesters) — is so consistent that it appears structural, not incidental. The system works this way reliably, regardless of stated intent. This is not a claim that restrictions are always misused; it is a claim that there is something about how speech restrictions operate in practice that makes their misuse the rule rather than the exception.'
      ),
      task(
        'What distinction does Sophia draw between speech and conduct in turn 7? How does Marcus challenge this distinction in turn 8?',
        'Listen to turns 7 and 8. The speech-conduct distinction is a standard legal and philosophical move; Marcus argues it "does a lot of work."',
        'Sophia: coordinated harassment, credible threats, and incitement to violence involve action (conduct), not just expression; they can be regulated under existing frameworks without creating new categories of restricted speech. She is opposing the expansion of "harmful speech" as a category. Marcus\'s challenge: the speech-conduct distinction cannot bear the weight Sophia places on it — targeted harassment campaigns and coordinated disinformation campaigns are technically speech, and the distinction breaks down under pressure in precisely the cases where we most need it.'
      ),
      task(
        'How does Sophia respond to Marcus\'s challenge to the speech-conduct distinction in the final turn? What is her position at the end of the debate?',
        'Listen to turn 9. Sophia does not abandon the distinction but revises how she defends it.',
        'Sophia concedes that the legal instantiation of the speech-conduct distinction "needs work" — she does not claim the current legal framework is adequate. But she maintains the distinction as a framework principle: regulation should be built on as narrow a basis as possible, with the burden of proof on those who want to restrict. She explicitly says this is not the same as saying no restriction is ever justified — she is defending a procedural point (high burden of proof, narrow basis) rather than an absolute position (no restriction).'
      ),
    ],
  }),

]);

export const C2_DEEP_RHETORIC_PART1_BY_PILLAR = Object.freeze({
  grammar: Object.freeze([
    C2_DEEP_RHETORIC_PART1.find(l => l.id === 'C2-GRAMMAR-003'),
    C2_DEEP_RHETORIC_PART1.find(l => l.id === 'C2-GRAMMAR-004'),
  ]),
  vocabulary: Object.freeze([
    C2_DEEP_RHETORIC_PART1.find(l => l.id === 'C2-VOCABULARY-003'),
    C2_DEEP_RHETORIC_PART1.find(l => l.id === 'C2-VOCABULARY-004'),
  ]),
  reading: Object.freeze([
    C2_DEEP_RHETORIC_PART1.find(l => l.id === 'C2-READING-002'),
  ]),
  listening: Object.freeze([
    C2_DEEP_RHETORIC_PART1.find(l => l.id === 'C2-LISTENING-002'),
  ]),
  speaking: Object.freeze([]),
  writing: Object.freeze([]),
  checkpoint: Object.freeze([]),
});
