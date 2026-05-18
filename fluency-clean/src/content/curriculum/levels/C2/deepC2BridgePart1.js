import { createGrammarLesson, createVocabularyLesson, createReadingLesson, createListeningLesson } from '../../../schemas/index.js';

const level = 'C2';
const status = 'ready';
const common = { level, status, estimatedMinutes: 75, tags: ['c2-1', 'bridge', 'mastery', 'deep-approved-target'] };

function task(instruction, note = '', expected = '') { return { instruction, note, expected }; }

export const C2_DEEP_BRIDGE_PART1 = Object.freeze([

  // ─── GRAMMAR-001: Ellipsis, substitution, and reference at mastery level ──────
  createGrammarLesson({
    ...common,
    id: 'C2-GRAMMAR-001',
    order: 1,
    title: 'Grammar: Ellipsis, substitution, and reference — cohesion without redundancy at C2 level',
    objectives: [
      'Deploy ellipsis, substitution, and reference fluently to create cohesive, non-redundant prose.',
      'Understand how English creates cohesion through what it leaves out as much as what it includes.',
      'Distinguish between acceptable and unacceptable ellipsis in formal and literary registers.',
      'Avoid the over-specification typical of advanced L2 learners still translating from L1.',
    ],
    teacherOpening: 'At C1, you achieved fluency with complex structures. At C2, the challenge is different: producing English that feels natural to a native reader — writing that coheres effortlessly, that does not over-specify, that uses ellipsis where ellipsis is expected and substitution where repetition would be clumsy. This is the grammar of expert prose, and it is learned by attention to what expert writers do not write as much as what they do.',
    grammarTable: {
      headers: ['Cohesion device', 'Mechanism', 'Example', 'What L2 learners typically write instead'],
      rows: [
        ['VP ellipsis', 'Omit the verb phrase after an auxiliary when the VP is recoverable', '"She argues that the theory holds, and so do I." / "He had left before she arrived, as had the others."', '"...and I also argue the same." / "...as the others had also done."'],
        ['Gapping', 'Omit repeated verbs in coordinated clauses', '"Some researchers focus on syntax, others on semantics."', '"Some researchers focus on syntax, and other researchers focus on semantics."'],
        ['Substitution (nominal)', 'Replace a noun phrase with "one(s)" or "that of"', '"The results of this study are stronger than those of the previous one." / "The approach here differs from the one used in Smith (2019)."', '"...than the results of the previous study." / "...from the approach used in Smith (2019)."'],
        ['Substitution (clausal)', 'Replace a clause with "so" or "not"', '"Will the argument hold? I believe so." / "Has the error been corrected? I hope so."', '"I believe it will hold." / "I hope it has been corrected."'],
        ['Reference (demonstrative)', 'Use "this" and "these" to refer back to entire propositions or chunks of text', '"This suggests that… / These findings indicate… / The above analysis shows…"', '"It suggests that…" (less precise) / repeating the noun phrase in full'],
        ['Comparative reference', 'Use "the former/latter," "the first/second," "respectively"', '"The study had two limitations: sampling bias and measurement error. The former is acknowledged…"', '"The first limitation, sampling bias, is acknowledged…" (acceptable but less elegant at C2)'],
        ['Zero article + ellipsis (journalistic/literary)', 'Omit articles and auxiliaries for compression (literary, journalistic, formal register)', '"A remarkable finding — and one that has significant implications."', '"This is a remarkable finding, and it is one that has significant implications." (grammatically fine but stylistically less compressed)'],
      ],
    },
    brazilianMistakes: [
      { mistake: '"Many researchers studied this topic, and other researchers also studied this topic from different perspectives."', correction: '"Many researchers studied this topic; others approached it from different perspectives." (gapping + nominal substitution)', explanation: 'Repeating the full noun phrase and verb is a sign of over-specification. English expert prose uses gapping and substitution where the referent is recoverable. This is not merely stylistic — it is a cohesion convention that native readers notice when violated.' },
      { mistake: '"The methodology of this study is more rigorous than the methodology of the previous study."', correction: '"The methodology of this study is more rigorous than that of the previous one."', explanation: '"That of" replaces the repeated noun phrase; "one" substitutes for "study." Double substitution produces the most elegant form. Many advanced L2 learners know this but revert to full specification under production pressure.' },
      { mistake: '"It is my belief that the argument is correct. It is my opinion that further research is needed."', correction: '"I believe the argument holds. Further research is, I think, needed." — or compress further: "The argument holds; further research is needed."', explanation: 'Over-reliance on factive constructions ("it is my X that") is a very common advanced L2 pattern. Native writers achieve the same effect with simpler constructions or by letting the argument speak for itself without foregrounding the speaker\'s epistemic state.' },
    ],
    controlledPractice: [
      task(
        'Rewrite each sentence to eliminate redundancy using ellipsis or substitution:\n(a) "Some scholars emphasise the economic factors; other scholars emphasise the cultural factors."\n(b) "The results of this experiment are more reliable than the results of the earlier experiment."\n(c) "She argued that the policy had failed, and he believed that the policy had also failed."',
        'Apply gapping, nominal substitution, and VP ellipsis respectively.',
        '(a) "Some scholars emphasise the economic factors; others, the cultural." (b) "The results of this experiment are more reliable than those of the earlier one." (c) "She argued that the policy had failed, and he believed so too." — or "…and he believed it had as well."'
      ),
      task(
        'Identify and name the cohesion device used in each sentence:\n(a) "Will the findings replicate? One hopes so."\n(b) "The study has two strengths and two weaknesses. The former concern methodology; the latter, scope."\n(c) "The author makes two arguments. The first is compelling; the second less so."',
        'Name: ellipsis, substitution (clausal/nominal), reference (comparative/demonstrative).',
        '(a) Clausal substitution (so). (b) Comparative reference (the former/latter) + VP ellipsis (less so = is less [compelling]). (c) Comparative reference (the first/second) + VP ellipsis (less so).'
      ),
    ],
    productionTasks: [
      task(
        'Write a 150-word analytical paragraph using at least four different cohesion devices. Choose any academic topic. Underline each device and label it.',
        'Do not force devices in — choose a topic that naturally generates the kind of reference and substitution that academic writing requires.',
        'Evaluate: are the devices used correctly and naturally? Does the paragraph cohere without being redundant? Would a native academic reader find it natural?'
      ),
    ],
  }),

  // ─── GRAMMAR-002: Nominalisation and register ─────────────────────────────────
  createGrammarLesson({
    ...common,
    id: 'C2-GRAMMAR-002',
    order: 2,
    title: 'Grammar: Nominalisation and lexical density — the grammar of expert academic prose',
    objectives: [
      'Understand and deploy nominalisation to increase lexical density in academic writing.',
      'Distinguish between heavy nominalisation (academic/formal) and verb-based prose (narrative/informal).',
      'Reverse nominalisations accurately to produce clearer prose when appropriate.',
      'Recognise when nominalisation obscures meaning and when it increases precision.',
    ],
    teacherOpening: 'Nominalisation — converting verbs and adjectives into nouns — is the defining grammatical feature of academic and bureaucratic prose. It increases lexical density, allows complex ideas to be packaged as noun phrases that can then be modified, and creates the impersonal, authoritative register of expert writing. At C2, you must both produce nominalisations fluently and know when not to — because over-nominalisation is the hallmark of bureaucratic opacity, not intellectual depth.',
    grammarTable: {
      headers: ['Base form', 'Nominalised form', 'Nominalised in context', 'Register effect'],
      rows: [
        ['to investigate', 'investigation (n)', '"The investigation of this phenomenon…" rather than "Investigating this phenomenon…"', 'Academic, formal; the noun allows modification: "a systematic investigation", "an investigation into the causes"'],
        ['to analyse', 'analysis (n)', '"The analysis revealed…" rather than "When we analysed…"', 'Academic; removes the agent, creates impersonality'],
        ['to fail (v)', 'failure (n)', '"The failure of the intervention to…" rather than "The intervention failed to…"', 'More abstract; allows the failure itself to be the subject'],
        ['complex (adj)', 'complexity (n)', '"The complexity of the relationship between X and Y" rather than "X and Y are related in complex ways"', 'Allows complex modification of the noun phrase'],
        ['to reduce', 'reduction (n)', '"A reduction in emissions was observed" rather than "Emissions were reduced"', 'Impersonal; foregrounds the quantity, not the action'],
        ['to implement', 'implementation (n)', '"The implementation of the policy…" rather than "When the policy was implemented…"', 'Formal; allows "implementation" to be the subject of further predicates'],
        ['to distribute', 'distribution (n)', '"The distribution of resources across regions…" rather than "How resources are distributed across regions…"', 'Increases information density; typical of expert prose'],
      ],
    },
    brazilianMistakes: [
      { mistake: 'Over-nominalisation: "The implementation of the utilisation of the methodology in the realisation of the objectives was insufficient."', correction: '"The methodology was not used effectively enough to achieve the objectives." — or even better, diagnose what specifically failed.', explanation: 'Stacking nominalisations ("implementation of the utilisation of") is a bureaucratic deformation of academic style. The goal is to increase density where needed, not to convert every verb into a noun. Excessive nominalisation obscures meaning and signals insecurity rather than expertise.' },
      { mistake: 'Failing to nominalise when academic register requires it: "Because the researchers analysed the data carefully, they found that the results were significant."', correction: '"Careful analysis of the data revealed significant results." (nominalisations: analysis; conversion of clause to noun phrase via post-modification)', explanation: 'Verb-based subordinate clauses (because…, when…) are appropriate in narrative prose but signal B2-level register in academic contexts. Nominalisation compresses the same information and increases the lexical density expected in C2 academic writing.' },
    ],
    controlledPractice: [
      task(
        'Nominalise each sentence to produce a more academically dense formulation:\n(a) "When X varies, Y also changes."\n(b) "The researchers failed to control for the confounding variables, which undermined the results."\n(c) "It is difficult to apply this theory in real-world contexts."',
        'Convert verbs and adjectives to their nominal forms. You may need to restructure the sentence entirely.',
        '(a) "Variation in X produces corresponding change in Y." / "Variation in X is associated with change in Y." (b) "Failure to control for confounding variables undermined the validity of the results." (c) "The application of this theory in real-world contexts poses significant challenges." / "Real-world application of this theory is not straightforward."'
      ),
      task(
        'Reverse the nominalisation in each sentence to produce clearer prose (appropriate for a recommendation or executive summary):\n(a) "An investigation into the implementation of the recommendations was conducted."\n(b) "Insufficient consideration was given to the diversification of the funding sources."\n(c) "The finalisation of the selection process is dependent on the completion of the review."',
        'Verb-based prose is often clearer and more direct — important for recommendations and lay audiences.',
        '(a) "We investigated how the recommendations were being implemented." (b) "The team did not sufficiently consider diversifying the funding sources." (c) "We can finalise the selection process only after the review is complete."'
      ),
    ],
    productionTasks: [
      task(
        'Write two versions of the same paragraph (100 words each): one highly nominalised (academic/formal), one verb-based (clear/direct). Then write one sentence explaining which is appropriate for which context.',
        'Choose any topic where the same information would be appropriate in both academic writing and an executive summary. The contrast should be stark.',
        'Evaluate: does the nominalised version genuinely increase lexical density without becoming bureaucratic opacity? Does the verb-based version sacrifice precision for clarity? Is the context judgment reasonable?'
      ),
    ],
  }),

  // ─── VOCABULARY-001: Precision and nuance — near-synonyms at C2 ──────────────
  createVocabularyLesson({
    ...common,
    id: 'C2-VOCABULARY-001',
    order: 1,
    title: 'Vocabulary: Precision and near-synonyms — navigating the fine distinctions that define C2 mastery',
    objectives: [
      'Distinguish between near-synonyms with the precision of a native academic writer.',
      'Understand the connotative, syntactic, and register differences between closely related words.',
      'Use these distinctions productively in writing and speaking.',
      'Develop the habit of asking not "what does this word mean?" but "when would I use this rather than that?"',
    ],
    teacherOpening: 'At C2, vocabulary mastery is not about knowing more words — it is about knowing more precisely when each word is right and when it is wrong. The words in this lesson are all high-frequency in academic and intellectual discourse, and all have near-synonyms that learners often confuse. The goal is not definition but discrimination.',
    words: [
      { word: 'allude vs. refer', definition: 'To refer: to mention explicitly and directly. To allude: to mention indirectly, without naming explicitly. "She referred to the study" (named it). "She alluded to the controversy" (suggested it without naming it). The distinction is directness of reference.', example: 'The author refers explicitly to Foucault\'s work on power; elsewhere, she alludes to the Frankfurt School without naming it directly.', collocations: ['refer to', 'allude to', 'a direct reference', 'an oblique allusion', 'without referring explicitly'] },
      { word: 'assert vs. contend vs. maintain', definition: 'Assert: claim as true, often confidently or without giving reasons. Contend: argue against opposition or in a context of debate. Maintain: continue to hold a position in the face of challenge — to persist in a claim already made.', example: 'She asserts the primacy of economic factors (confident claim, no reasons given here). She contends that the standard interpretation is wrong (arguing against a position). She maintains this view despite the counter-evidence (persisting under challenge).', collocations: ['assert without qualification', 'contend that', 'maintain a position', 'vigorously contend', 'continue to maintain'] },
      { word: 'elucidate vs. clarify vs. explain', definition: 'Explain: make intelligible. Clarify: remove confusion or ambiguity. Elucidate: shed light on something complex or obscure — typically used when the original is already partially understood but not fully. Elucidate is slightly more formal and implies more work on the part of the explicator.', example: 'The second paragraph attempts to elucidate the relationship between the two variables; the third clarifies a potential misreading of the data.', collocations: ['elucidate the relationship', 'clarify a point', 'explain the mechanism', 'further elucidate', 'clarify any ambiguity'] },
      { word: 'tentative vs. provisional vs. preliminary', definition: 'Tentative: uncertain, hesitant — the claim may be wrong and the speaker knows it. Provisional: accepted for now but subject to revision — more confident than tentative. Preliminary: at an early stage — implies that the work is not finished and firmer conclusions will follow.', example: 'These are preliminary findings from an ongoing study; the interpretation remains tentative until the full data are available. The provisional conclusion is that the effect is real.', collocations: ['tentative conclusion', 'provisional acceptance', 'preliminary data', 'at this tentative stage', 'a provisional framework'] },
      { word: 'pervasive vs. prevalent vs. ubiquitous', definition: 'Prevalent: commonly found or existing in a population at a particular time. Pervasive: spreading through and affecting every part — implies thoroughgoing presence. Ubiquitous: seemingly everywhere at once — often used with a mildly ironic tone.', example: 'Misuse of statistics is prevalent in social science research; the problem is pervasive — it affects not just reporting but research design itself. The smartphone is now ubiquitous.', collocations: ['prevalent among', 'pervasive in', 'increasingly pervasive', 'ubiquitous in modern life'] },
      { word: 'refute vs. rebut vs. counter', definition: 'To counter: oppose an argument with another. To rebut: argue against, presenting evidence that weakens the opposing position. To refute: demonstrate conclusively that an argument is wrong (note: often misused to mean "rebut"). Refute implies success; rebut implies a response without necessarily succeeding.', example: 'The researcher\'s paper attempts to refute the hypothesis; the replication data may or may not succeed in doing so. The author rebuts the criticism but does not refute it — the underlying concern remains.', collocations: ['attempt to refute', 'successfully refute', 'rebut the objection', 'counter the argument', 'a pointed rebuttal'] },
      { word: 'seminal vs. foundational vs. influential', definition: 'Influential: having a significant effect on others. Foundational: forming the base on which something else is built. Seminal: like a seed — generating later work or thought; originating something significant. Seminal has a stronger implication of priority and productivity; not all foundational works are seminal.', example: 'Kuhn\'s Structure of Scientific Revolutions is both foundational and seminal: it established the vocabulary (foundational) that generated decades of subsequent research (seminal). Smith\'s paper is influential without being seminal.', collocations: ['a seminal work', 'seminal research', 'a foundational text', 'highly influential', 'foundational assumptions'] },
      { word: 'nascent vs. emergent vs. incipient', definition: 'Nascent: just beginning to develop — positive or neutral, implies potential. Incipient: beginning to appear, often used of something potentially problematic. Emergent: coming into being — used of patterns, phenomena, properties that arise from complex systems.', example: 'There is a nascent consensus in the field (just forming, potentially significant). The data suggest incipient signs of systemic failure (beginning to appear, potentially bad). Emergent properties in complex systems cannot be predicted from the components alone.', collocations: ['a nascent consensus', 'incipient signs of', 'emergent properties', 'nascent democracy', 'incipient crisis'] },
    ],
    dangerousConfusions: [
      { pair: ['refute', 'rebut'], explanation: '"Refute" implies successful disproof — to refute an argument is to show conclusively that it is wrong. "Rebut" means to argue against, without necessarily succeeding. Many educated native speakers misuse "refute" to mean "rebut" (they say "he refuted the accusation" when they mean "he denied/countered it"). At C2, use "refute" only when the refutation is conclusive; use "rebut" or "counter" for responses that contest without definitively disproving.' },
      { pair: ['allude', 'elude'], explanation: '"Allude to" means to refer to indirectly. "Elude" means to escape from or avoid (a person, thing, or idea). "The answer eludes me" (I cannot grasp it). "The author alludes to a problem without naming it" (refers to it indirectly). These look and sound similar but are completely different in meaning and syntactic behaviour.' },
    ],
  }),

  // ─── VOCABULARY-002: Discourse vocabulary at C2 ───────────────────────────────
  createVocabularyLesson({
    ...common,
    id: 'C2-VOCABULARY-002',
    order: 2,
    title: 'Vocabulary: The meta-vocabulary of intellectual discourse — describing argument, method, and knowledge at C2',
    objectives: [
      'Acquire and use the meta-vocabulary of sophisticated intellectual discourse at C2 level.',
      'Use these words to describe, analyse, and critique arguments across disciplines.',
      'Distinguish between descriptive and evaluative uses of this vocabulary.',
    ],
    teacherOpening: 'The vocabulary in this lesson describes the moves and properties of intellectual argument itself — how to characterise what others are doing, what counts as a good or bad argument, and how knowledge claims relate to evidence. These words appear constantly in academic reviews, philosophical texts, and intellectual journalism at the highest level.',
    words: [
      { word: 'tendentious', definition: 'Promoting a particular cause or point of view in a biased or misleading way; presenting an argument with a hidden agenda that distorts the evidence or framing.', example: 'The review is tendentious: it selects only evidence that supports the author\'s preferred conclusion and dismisses contradictory data without adequate justification.', collocations: ['a tendentious reading', 'tendentious framing', 'a tendentious account', 'dangerously tendentious'] },
      { word: 'beg the question', definition: 'To assume the conclusion of an argument in one of its premises (circular reasoning). Often misused to mean "raise the question" — at C2, use it correctly.', example: 'The argument begs the question: it assumes that consciousness requires a physical substrate, which is precisely what needs to be demonstrated.', collocations: ['beg the question', 'this begs the question of whether', 'a question-begging argument', 'circular and question-begging'] },
      { word: 'equivocate', definition: 'To use language in an ambiguous way to avoid committing to a position; to speak or write with deliberate vagueness to mislead or avoid responsibility.', example: 'The minister equivocated throughout the interview: every question about policy was answered with a statement about values, leaving no one clearer about the intended course of action.', collocations: ['equivocate on', 'without equivocating', 'a tendency to equivocate', 'equivocal language'] },
      { word: 'tautology', definition: 'A statement that is necessarily true because it says the same thing twice in different words; also: an argument whose conclusion merely repeats its premise.', example: '"A war is a violent armed conflict" is a tautology — the definition adds nothing to the concept. The argument is similarly tautological: it concludes that democracy is the best system by defining democracy as the best system of governance.', collocations: ['a mere tautology', 'a tautological definition', 'verging on tautology', 'analytically tautologous'] },
      { word: 'spurious', definition: 'False or fake; apparently correct or logical but actually without foundation; not genuine.', example: 'The correlation between the two variables is spurious — it is produced by a third variable (confounding factor) that influences both, not by a causal relationship between them.', collocations: ['a spurious correlation', 'spurious reasoning', 'a spurious claim', 'demonstrate that X is spurious'] },
      { word: 'apposite', definition: 'Apt and appropriate to a particular situation or subject; well-chosen for the purpose at hand.', example: 'The comparison with Hobbes is apposite: both the Leviathan and the contemporary surveillance state represent answers to the problem of collective action through the concentration of power.', collocations: ['an apposite comparison', 'apposite examples', 'particularly apposite', 'an apposite quotation'] },
      { word: 'caveat', definition: 'A qualification or limitation to a general claim; a warning that a claim applies only in certain conditions.', example: 'The findings are broadly robust, with one important caveat: the sample was drawn entirely from one cultural context, which limits the generalisability of the conclusions.', collocations: ['an important caveat', 'with the caveat that', 'enter a caveat', 'a significant caveat'] },
      { word: 'lacuna', definition: 'A gap or missing part; in intellectual discourse, an absence in the literature or argument that has not yet been addressed.', example: 'The most significant lacuna in the existing scholarship is the absence of longitudinal data — all current studies are cross-sectional, which prevents any causal inference.', collocations: ['a significant lacuna', 'a lacuna in the literature', 'fill a lacuna', 'identify a lacuna'] },
      { word: 'non sequitur', definition: 'A conclusion or statement that does not logically follow from the previous argument; a logical leap.', example: 'The argument moves from "human beings are social animals" to "therefore, capitalism is the most natural economic system" — a non sequitur that requires several additional premises to hold.', collocations: ['a non sequitur', 'this is a non sequitur', 'the argument involves a non sequitur', 'a logical non sequitur'] },
    ],
    dangerousConfusions: [
      { pair: ['beg the question (circular reasoning)', 'raise the question'], explanation: '"Beg the question" is a specific logical fallacy: assuming in the premises what you are supposed to be proving. It does NOT mean "raise the question" or "prompt the question." Using "this begs the question of why…" to mean "this raises the question of why…" is a very common error, even among educated native speakers. At C2, use "beg the question" only for circular reasoning; use "raise the question" or "prompt the question" when you mean "cause us to ask."' },
      { pair: ['tautology', 'pleonasm'], explanation: 'A tautology says the same thing twice in a way that produces a necessarily true but uninformative statement. A pleonasm is merely redundant word use that could be cut (e.g., "free gift," "past history"). A tautology is a logical/rhetorical error; a pleonasm is a stylistic one. In academic writing, both are to be avoided, but for different reasons.' },
    ],
  }),

  // ─── READING-001: Complex literary-critical essay ─────────────────────────────
  createReadingLesson({
    ...common,
    id: 'C2-READING-001',
    order: 1,
    title: 'Reading: "The Novel as a Machine for Thinking" — a literary-critical essay on the epistemology of fiction',
    objectives: [
      'Read a demanding literary-critical essay at C2 level and reconstruct its central argument.',
      'Identify the text\'s argumentative structure, including implicit premises and rhetorical moves.',
      'Engage critically with the argument — identifying strengths, weaknesses, and unstated assumptions.',
      'Answer comprehension, inference, vocabulary-in-context, and critical evaluation questions at C2 level.',
    ],
    teacherOpening: 'This passage is in the tradition of literary-critical essay writing — dense, allusive, and making demands on the reader that academic writing does not always make explicit. The author argues that the novel has cognitive functions that other forms of knowledge cannot perform. Read carefully for the argument, not just the information.',
    passage: `The Novel as a Machine for Thinking

The novel, at its best, is a machine for thinking that no other form of knowledge can replicate. This is a strong claim, and it requires defence. The defence begins with a simple observation: knowledge, in most of its institutionalised forms — scientific, philosophical, historical — requires the abstraction of its object. To know something in the scientific sense is, in part, to remove it from the particularities of individual experience and describe it in terms that hold across cases. The novel refuses this move. It insists on the particular, the individual, the embodied, the temporal. And in doing so, it makes available a kind of understanding that the abstracting disciplines systematically exclude.

Consider how we come to understand, in the deepest sense, what it is like to be someone else. The philosophical tradition has long struggled with this problem — the "problem of other minds" — and its solutions have been mostly theoretical: we infer, by analogy, that others have inner lives like our own. The novel does something different. It does not ask you to infer what it is like; it places you inside another consciousness and makes you live there for two hundred pages. The understanding produced is not inferential but something closer to direct acquaintance. Whether this constitutes genuine knowledge in the philosophical sense is contested; but whatever it is, it is not nothing.

This cognitive function of the novel has implications for its relationship to ethics. If the novel genuinely expands our capacity for empathy — our ability to inhabit perspectives radically different from our own — then the reading of serious fiction is not merely a leisure activity but a moral and civic one. The claim is not that novels make us good in any simple sense; the evidence for that is weak. The claim is the more modest one that they exercise and develop a capacity — the capacity for perspective-taking — that is necessary for moral life and democratic deliberation, even if it is not sufficient for either.

There is an objection to this argument that needs to be confronted. If the novel exercises our capacity for empathy by placing us inside another consciousness, it presumably matters a great deal which consciousnesses the canon presents as worthy of such placement. A tradition that overwhelmingly places readers inside white, Western, male, bourgeois consciousness is not exercising empathy in a neutral way; it is shaping the imagination to find those consciousnesses natural and sympathetic, and to find others alien or invisible. The history of the novel as an institution is not separable from the politics of whose inner life counts.`,
    wordCount: 370,
    tasks: [
      task(
        'What is the author\'s central claim? What specifically distinguishes the novel\'s epistemological mode from that of science, philosophy, and history?',
        'Re-read paragraph 1. The contrast is between abstraction (the mode of institutionalised knowledge) and particularity (the novel\'s insistence). What follows from this distinction?',
        'The central claim is that the novel is a cognitive instrument that no other form of knowledge can replicate. The distinguishing feature is the novel\'s insistence on the particular, individual, embodied, and temporal dimensions of experience — dimensions that scientific, philosophical, and historical knowledge systematically exclude through abstraction. To know something scientifically is to remove it from individual particularities and describe it in general terms; the novel refuses this, and this refusal is what makes a distinctive form of understanding available.'
      ),
      task(
        'How does the author describe the novel\'s approach to the "problem of other minds"? What does the author claim about the kind of understanding produced, and how does the author hedge this claim?',
        'Re-read paragraph 2. Distinguish between what the author asserts directly and what they qualify or leave open.',
        'The philosophical tradition approaches the problem of other minds inferentially — we conclude, by analogy, that others have inner lives like ours. The novel, the author argues, does something different: it places the reader inside another consciousness rather than asking them to infer what it is like. The understanding produced is "not inferential but something closer to direct acquaintance." The author hedges this claim carefully: "whether this constitutes genuine knowledge in the philosophical sense is contested" — the author does not assert that it is knowledge, only that "it is not nothing," a formulation that acknowledges the contested status while refusing to dismiss the experience as epistemically worthless.'
      ),
      task(
        'What is the author\'s claim about the relationship between novel-reading and ethics/democracy? How does the author distinguish the "strong" claim they do NOT make from the "modest" claim they DO make?',
        'Re-read paragraph 3. The author explicitly marks the distinction between a strong claim (novels make us good) and a modest one. What is the modest claim, and why is the author making it rather than the strong version?',
        'The strong claim would be: reading novels makes us morally better people. The author rejects this: "the evidence for that is weak." The modest claim is that novels exercise and develop the capacity for perspective-taking — inhabiting radically different viewpoints — which is necessary (but not sufficient) for moral life and democratic deliberation. The distinction between "necessary" and "sufficient" is doing important work: the author is not claiming novels make us good, only that they develop a capacity without which moral and democratic life would be impoverished. The modest claim requires less empirical support and is more defensible.'
      ),
      task(
        'What is the objection raised in the final paragraph? How does the author frame it, and what is the implication for the argument of paragraphs 1–3?',
        'Re-read paragraph 4. The objection concerns the politics of the canon. How does this challenge — rather than refute — the main argument?',
        'The objection is that the novel\'s capacity for empathy-exercise depends on which consciousnesses the canon centres. A tradition that overwhelmingly centres white, Western, male, bourgeois consciousness does not exercise empathy neutrally: it trains readers to find those consciousnesses natural and sympathetic, and to find others alien or invisible. This does not refute the main argument (the novel\'s cognitive function remains), but it complicates it significantly: the value of novel-reading is not separable from the politics of which novels are read and which inner lives are treated as worthy of the reader\'s imaginative occupation. The author is honest that "the history of the novel as an institution is not separable from the politics of whose inner life counts."'
      ),
    ],
  }),

  // ─── LISTENING-001: Extended academic lecture discussion ──────────────────────
  createListeningLesson({
    ...common,
    id: 'C2-LISTENING-001',
    order: 101,
    title: 'Listening: "Language and Thought" — an academic discussion on the Sapir-Whorf hypothesis and its limits',
    objectives: [
      'Follow a complex academic discussion at C2 level and track a developing multi-speaker argument.',
      'Distinguish between empirical claims, theoretical positions, and methodological concerns.',
      'Understand how academic speakers signal hedging, qualification, and disagreement in formal spoken discourse.',
      'Answer comprehension, inference, and critical evaluation questions at C2 level.',
    ],
    teacherOpening: 'This is a graduate seminar discussion on the Sapir-Whorf hypothesis — the claim, in various forms, that the language you speak shapes the way you think. The three participants hold different positions and use sophisticated academic language to develop and challenge them. Listen for the specific claims each person makes and the evidence or arguments they use.',
    transcript: [
      { speaker: 'Prof. Yamada', text: 'The Sapir-Whorf hypothesis has had a difficult century. The strong version — that language determines thought, that you cannot think in concepts your language doesn\'t have — was essentially abandoned by the 1970s. But I want to make a case for a weak version that I think is still defensible and importantly underappreciated.' },
      { speaker: 'Daniel', text: 'Can I ask what you mean by "weak"? Because there\'s a spectrum here — from "language has no influence on thought" to "language determines thought," and there\'s a lot of space in between.' },
      { speaker: 'Prof. Yamada', text: 'Exactly. What I\'m calling the weak version is the claim that the habitual grammatical and lexical categories of a language make certain distinctions more salient — more readily available in cognition — without making other distinctions unavailable. So speakers of a language with grammatical gender do not think about objects differently from speakers of a gender-neutral language; but the distinction may be more cognitively salient to them in certain contexts.' },
      { speaker: 'Inge', text: 'The evidence for even that weak claim is contested, isn\'t it? The research by Boroditsky and colleagues on spatial cognition and colour discrimination — some of it holds up under replication, but some of it doesn\'t. The effect sizes are generally small, and the interpretation of what "cognitively salient" even means is not agreed upon.' },
      { speaker: 'Prof. Yamada', text: 'That\'s a fair point. But I\'d distinguish between the strength of the evidence and the plausibility of the theoretical claim. The evidence is mixed, as you say — that\'s partly a consequence of methodological heterogeneity across studies. But the theoretical claim is not implausible: we know that attention is selective, and habitual linguistic categories could plausibly bias attention toward certain distinctions. The burden of proof is on those who say language has zero effect, not on those who say it has some effect.' },
      { speaker: 'Daniel', text: 'I\'m not sure I accept that distribution of burden. "Language might have some effect" is such a weak claim that it\'s almost unfalsifiable. If you set the bar there, you can\'t be wrong. The interesting question is whether the effect is large enough to matter for anything significant — communication, reasoning, social cognition — and on that, I think the evidence is genuinely disappointing.' },
      { speaker: 'Inge', text: 'I think there\'s also a conceptual problem lurking here. When we say "language shapes thought," we need to be clear about what kind of influence we\'re talking about. Are we talking about online, real-time cognitive processes? Or offline dispositions — the way people tend to describe or remember things when they\'re not under real-time pressure? Because those are very different things and the evidence for them is different.' },
      { speaker: 'Prof. Yamada', text: 'That\'s a distinction I should have made at the outset. The online/offline distinction maps roughly onto the difference between performance and competence — what you can do in real time versus what your underlying system represents. The more cautious claim, and the one I think the evidence best supports, is the offline one: habitual linguistic categories bias the encoding of experience in memory and the default framing of problems, rather than altering real-time cognitive processing. Whether that\'s "interesting enough" is a judgment call.' },
    ],
    tasks: [
      task(
        'What distinction does Prof. Yamada draw between the "strong" and "weak" versions of the Sapir-Whorf hypothesis? What specifically does the "weak" version claim?',
        'Listen to turns 1 and 3. The strong version was "essentially abandoned"; the weak version is more cautious.',
        'The strong version: language determines thought — you cannot think in concepts your language lacks. This was abandoned by the 1970s. The weak version: the habitual grammatical and lexical categories of a language make certain distinctions more cognitively salient — more readily available — without making other distinctions unavailable. It is a claim about salience and ease of access, not impossibility.'
      ),
      task(
        'What is Inge\'s challenge to the weak version? What distinction does she introduce in turn 7, and why does Prof. Yamada acknowledge it as important?',
        'Listen to turns 4 and 7. Inge raises two challenges: one about evidence, one about conceptual clarity. What is the conceptual challenge?',
        'Inge\'s evidential challenge (turn 4): the evidence for even the weak version is contested — effect sizes are small and replication is inconsistent. Inge\'s conceptual challenge (turn 7): the phrase "language shapes thought" is ambiguous between two very different types of influence — online (real-time cognitive processing) and offline (how people encode, remember, and frame things when not under real-time pressure). These are different claims with different evidence. Prof. Yamada acknowledges this distinction is important and revises the claim accordingly: the offline version (biasing memory encoding and problem framing) has more evidential support than the online version.'
      ),
      task(
        'What is Daniel\'s objection about the burden of proof (turn 6)? What is his concern about unfalsifiability?',
        'Listen to turn 6. Daniel challenges Prof. Yamada\'s claim about where the burden of proof lies.',
        'Daniel\'s objection: Prof. Yamada places the burden of proof on those who claim language has zero effect. But "language might have some effect" is so weak a claim that it is almost unfalsifiable — if you set the bar that low, you cannot be wrong. He argues the interesting question is whether the effect is large enough to matter for significant cognitive tasks (reasoning, social cognition, communication) — and on that question, the evidence is disappointing. The methodological concern is that unfalsifiable claims are not genuinely scientific claims.'
      ),
      task(
        'By the end of the discussion, how has Prof. Yamada\'s position shifted from how she stated it at the beginning? What is the most cautious version of the claim she ends up defending?',
        'Compare turn 1 with turn 8. What has been added, qualified, or revised?',
        'Prof. Yamada begins with "a weak version that is still defensible" — stated without specifying online vs. offline. By the end, she has been pushed (by Inge\'s distinction) to the more cautious offline claim: habitual linguistic categories bias the encoding of experience in memory and the default framing of problems — rather than altering real-time cognitive processing. This is a significant narrowing: it is explicitly about offline dispositions, not real-time cognition. Whether this version "matters" she leaves as "a judgment call" — she does not claim it is important, only that it is evidentially defensible. The overall trajectory is from a general weak claim to a very specific and carefully bounded one.'
      ),
    ],
  }),

]);

export const C2_DEEP_BRIDGE_PART1_BY_PILLAR = Object.freeze({
  grammar: Object.freeze([
    C2_DEEP_BRIDGE_PART1.find(l => l.id === 'C2-GRAMMAR-001'),
    C2_DEEP_BRIDGE_PART1.find(l => l.id === 'C2-GRAMMAR-002'),
  ]),
  vocabulary: Object.freeze([
    C2_DEEP_BRIDGE_PART1.find(l => l.id === 'C2-VOCABULARY-001'),
    C2_DEEP_BRIDGE_PART1.find(l => l.id === 'C2-VOCABULARY-002'),
  ]),
  reading: Object.freeze([
    C2_DEEP_BRIDGE_PART1.find(l => l.id === 'C2-READING-001'),
  ]),
  listening: Object.freeze([
    C2_DEEP_BRIDGE_PART1.find(l => l.id === 'C2-LISTENING-001'),
  ]),
  speaking: Object.freeze([]),
  writing: Object.freeze([]),
  checkpoint: Object.freeze([]),
});
