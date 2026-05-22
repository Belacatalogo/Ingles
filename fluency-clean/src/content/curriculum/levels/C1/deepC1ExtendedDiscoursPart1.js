import { createGrammarLesson, createVocabularyLesson, createSpeakingLesson } from '../../../schemas/index.js';

const level = 'C1';
const status = 'ready';
const common = { level, status, estimatedMinutes: 70, tags: ['c1-3', 'extended-discourse', 'academic', 'deep-approved-target'] };

function task(instruction, note = '', expected = '') { return { instruction, note, expected }; }

export const C1_DEEP_EXTENDED_DISCOURSE_PART1 = Object.freeze([

  // ─── GRAMMAR-007: Advanced discourse markers ─────────────────────────────────
  createGrammarLesson({
    ...common,
    id: 'C1-GRAMMAR-007',
    order: 7,
    title: 'Advanced discourse markers: signposting, concession, and qualification at C1',
    objectives: [
      'Use sophisticated additive, contrastive, and causal discourse markers beyond B2 level.',
      'Distinguish between concession markers that yield (admittedly, granted, to be sure) and those that pivot (nevertheless, even so, that said).',
      'Use qualification and hedging markers to calibrate the strength of a claim.',
      'Recognise how discourse markers differ in formality and rhetorical function.',
      'Avoid overuse of simple connectors (however, therefore, moreover) at C1 level.',
    ],
    teacherOpening: 'At B2, you learned to connect ideas with however, therefore, moreover, and although. At C1, the repertoire expands — and becomes more precise. The difference is not merely vocabulary; it is control of argument. A writer who writes "However, there are counterarguments" is connecting ideas. A writer who writes "That said, the objection carries force only if one accepts the premise that..." is managing an argument. This lesson builds the tools for the second kind of writing.',
    whyItMatters: 'Discourse markers are the connective tissue of academic argument. At C1, using a limited set (however, therefore) signals a competent but not sophisticated writer. The ability to choose between "notwithstanding," "that said," "be that as it may," "even granting that," and "nevertheless" — each of which signals a subtly different concession — is what produces the precision that examiners and readers associate with C1+ writing.',
    differenceFromA2: 'B2: "There are many benefits to this policy. However, there are also drawbacks." C1: "The policy yields measurable short-term benefits; that said, the distributional consequences — who bears the costs and who captures the gains — remain insufficiently addressed in the current literature."',
    grammarTable: {
      headers: ['Function', 'B2 marker', 'C1 alternatives', 'Register note'],
      rows: [
        ['Contrast/concession', 'however', 'that said / be that as it may / even so / for all that / notwithstanding this', 'Most are formal; "that said" works in academic and semi-formal prose'],
        ['Full concession', 'although', 'admittedly / granted / to be sure / it must be acknowledged that / one cannot deny that', 'These yield the point before pivoting — strategic concession'],
        ['Causal', 'therefore / so', 'consequently / it follows that / the implication is / as a corollary / hence', '"Hence" is very formal; "it follows that" is clearest in academic writing'],
        ['Addition', 'moreover / also', 'furthermore / what is more / over and above this / compounding this / a further dimension is', '"Over and above this" suggests surplus beyond what was expected'],
        ['Qualification', 'but', 'with the caveat that / subject to / barring / provided that / on the assumption that', 'Qualify the scope of a claim rather than simply contradict it'],
        ['Clarification', 'in other words', 'put differently / to be more precise / or rather / to sharpen the point / what this amounts to is', '"Or rather" signals a self-correction; "to be more precise" narrows the previous claim'],
        ['Exemplification', 'for example', 'to take a concrete case / this can be illustrated by / a paradigmatic instance is / most strikingly', 'Select the marker that also frames how typical the example is'],
      ],
    },
    commonErrors: [
      { wrong: 'However, many scholars disagree.', right: 'That said, a significant body of scholarship has questioned this claim — most notably those working within the institutionalist tradition.', explanation: '"However" is not wrong but is generic. The C1 version specifies what kind of disagreement and names the tradition, adding argumentative precision.' },
      { wrong: 'Moreover, the data shows other things too.', right: 'What compounds the difficulty is that the dataset, having been collected under conditions that no longer obtain, may not be transferable to the current policy context.', explanation: 'Rather than signalling "I have more to say," the C1 version specifies why the additional point matters and what it adds.' },
      { wrong: 'In other words, the policy failed.', right: 'To be more precise: the policy failed not in conception but in implementation — the gap between design and delivery was where accountability broke down.', explanation: '"To be more precise" signals that what follows is a narrowing or sharpening of the previous claim, not merely a repetition in simpler words.' },
    ],
    examples: [
      { sentence: 'Admittedly, the model rests on a number of simplifying assumptions; that said, its predictive validity across the seven cases examined here is striking.', explanation: '"Admittedly" makes a full concession; "that said" pivots to the counter-claim. The combination is a signature of sophisticated academic argumentation.' },
      { sentence: 'The policy has achieved its stated targets; notwithstanding this, the broader social costs have been borne disproportionately by the communities it was ostensibly designed to protect.', explanation: '"Notwithstanding this" is more formal than "however" and signals a significant qualification rather than mere contrast.' },
      { sentence: 'To sharpen the point: what is at stake here is not efficiency but legitimacy.', explanation: '"To sharpen the point" signals that a more precise or more pointed version of the previous claim is coming — a reframing, not a repetition.' },
    ],
    tasks: [
      task(
        'Rewrite the following using a more precise C1 discourse marker: "The government introduced the policy to reduce inequality. However, many people were still poor."',
        'Choose a marker that captures the logical relationship: the policy had a stated aim, but the outcome did not match it. What kind of concession or contrast is this?',
        'Example: "The government introduced the policy with the explicit aim of reducing inequality; notwithstanding this, the distributional outcomes over the following decade suggest that the structural drivers of poverty were not addressed by the measures adopted."'
      ),
      task(
        'Use a qualification marker (with the caveat that / subject to / provided that) to complete this sentence: "The findings are generalisable to similar contexts ___________."',
        'Think about what condition would limit or qualify the claim that the findings are generalisable.',
        'Example: "The findings are generalisable to similar contexts, with the caveat that the cultural and institutional conditions that obtained in the case studied may not be replicated in every setting." Or: "...subject to the assumption that the structural incentives facing decision-makers are comparable."'
      ),
      task(
        'Write a two-sentence academic claim using "admittedly" and "that said" to structure a concession-and-pivot argument on the topic of renewable energy.',
        'Your first sentence should make a concession (acknowledge something true about a counter-position). Your second sentence should pivot to your own position.',
        'Example: "Admittedly, the transition to renewable energy infrastructure carries substantial upfront costs that fall disproportionately on lower-income states. That said, the long-run fiscal and environmental costs of continued fossil fuel dependence considerably exceed those of the transition."'
      ),
      task(
        'Choose the most precise discourse marker from the bracket and explain your choice: [therefore / it follows that / as a corollary / consequently] — "The dataset was collected in a single jurisdiction; ___________, cross-national comparisons based on these figures should be treated with caution."',
        'Think about the logical relationship: the limitation of a single jurisdiction produces a constraint on what can be done with the data. Which marker best captures this kind of logical inference?',
        '"It follows that" is the most appropriate: it signals a logical inference drawn from the premise just stated. "Consequently" is also acceptable but slightly more causal (suggesting a result rather than an inference). "As a corollary" is precise but very formal and implies a secondary conclusion derived from a mathematical-style argument.'
      ),
    ],
  }),

  // ─── GRAMMAR-008: Hedging and stance in academic English ─────────────────────
  createGrammarLesson({
    ...common,
    id: 'C1-GRAMMAR-008',
    order: 8,
    title: 'Hedging and stance: calibrating certainty and commitment in academic writing',
    objectives: [
      'Use hedging structures to qualify claims by certainty, source, or scope.',
      'Distinguish between strong hedges (it is possible that / may) and weak hedges (it seems likely that / would appear to).',
      'Express authorial stance through epistemic, evaluative, and affective markers.',
      'Recognise and produce the interplay between hedging and boosting in academic prose.',
      'Avoid under-hedging (overconfident claims) and over-hedging (evasive or uncommitted writing).',
    ],
    teacherOpening: 'Hedging does not mean being vague or avoiding commitment. It means calibrating the degree of certainty you are expressing to the degree of certainty the evidence warrants. A scientist who says "The results suggest that X may be implicated in Y" is not being evasive; they are being precise. A student who writes "It is a well-known fact that X causes Y" may be overconfident, or simply wrong. C1 academic writing requires the ability to use hedges strategically: to protect a claim from refutation, to acknowledge limits, and to signal intellectual humility without abandoning an argument.',
    whyItMatters: 'Hedging is one of the most prominent features of academic English. Studies of academic corpora show that the vast majority of empirical claims are hedged. Students who do not hedge risk sounding unscholarly or making claims they cannot defend. Students who over-hedge produce writing that feels evasive or uncommitted.',
    differenceFromA2: 'B2: "This policy causes inequality." / "It might cause inequality." C1: "The available evidence suggests that this policy may contribute to widening inequality, particularly in urban contexts where labour market conditions are most volatile, though it is important to note that the causal mechanism remains contested."',
    grammarTable: {
      headers: ['Hedging type', 'Weak (very uncertain)', 'Moderate', 'Strong (fairly certain)'],
      rows: [
        ['Modal hedges', 'might / could', 'may / would appear to', 'should / is likely to'],
        ['Epistemic verbs', 'it is conceivable that', 'it seems / it appears / the evidence suggests', 'it is clear that / it is evident that'],
        ['Approximators', 'roughly / approximately', 'around / in the region of', 'close to / nearly'],
        ['Scope limiters', 'in some cases', 'in many contexts / under certain conditions', 'in most circumstances'],
        ['Source attribution', 'it has been claimed that', 'according to / X argues that', 'X demonstrates / X shows'],
        ['Self-positioning', 'one might argue', 'I would contend / this paper argues', 'this essay will demonstrate'],
      ],
    },
    commonErrors: [
      { wrong: 'Globalisation destroys local culture.', right: 'Globalisation would appear to exert considerable pressure on local cultural practices, though the extent and reversibility of this pressure remain subjects of ongoing scholarly debate.', explanation: 'The original makes an unqualified causal claim. The C1 version hedges the causal language ("would appear to exert pressure" rather than "destroys"), qualifies scope ("considerable" not "all"), and acknowledges the contested nature of the claim.' },
      { wrong: 'It might possibly perhaps be the case that there could be some effects.', right: 'The available evidence tentatively suggests that the policy may have had some measurable effect on outcomes in the short term.', explanation: 'Multiple hedges (might, possibly, perhaps, could) produce evasion rather than precision. A single, well-chosen hedge with a clear claim is more authoritative than piled-up qualifiers.' },
      { wrong: 'Researchers proved that the treatment works.', right: 'The trial results provide strong evidence that the treatment is effective under the specific conditions tested, though replication across diverse populations remains to be established.', explanation: '"Proved" is almost never appropriate in empirical science. The C1 version uses "provide strong evidence" (a booster combined with appropriate qualification) and notes the limits of the current data.' },
    ],
    examples: [
      { sentence: 'The data would appear to support the conclusion that early intervention is more cost-effective than remediation, though this finding is sensitive to a number of contested methodological assumptions.', explanation: '"Would appear to" is a moderate hedge; "sensitive to" is a precise qualification that names what could weaken the finding without abandoning it.' },
      { sentence: 'It seems reasonable to conclude that the mechanism operates differently across institutional contexts, though a definitive account awaits further comparative research.', explanation: '"It seems reasonable to conclude" is an evaluative stance marker — it positions the author as judging the conclusion to be warranted, while acknowledging its provisional character.' },
      { sentence: 'This paper argues — tentatively, in light of the limitations acknowledged above — that the regulatory framework has failed not because of design flaws but because of a structural mismatch between its assumptions and the market it seeks to govern.', explanation: 'The parenthetical "tentatively, in light of the limitations acknowledged above" is a sophisticated device: it hedges the entire claim without distributing hedges across every sentence.' },
    ],
    tasks: [
      task(
        'Add appropriate hedging to the following sentence without making it evasive: "Social media causes depression in teenagers."',
        'Think about: what is actually known (association, not necessarily causation)? What limits the claim (not all teenagers, some platforms more than others)? Choose one or two hedges, not six.',
        'Example: "The available evidence suggests a significant association between heavy social media use and elevated rates of depressive symptoms among adolescents, particularly in relation to platforms centred on social comparison, though the direction of causality remains actively debated."'
      ),
      task(
        'Rewrite this over-hedged sentence to make it clearer and more authoritative while retaining appropriate caution: "It might perhaps be possible that in some circumstances the policy could potentially have some minor effects on certain outcomes."',
        'Identify the actual claim buried in this sentence. Then express it once with a single, calibrated hedge.',
        'Example: "The policy may produce modest effects on outcomes in specific contexts, though the evidence base remains limited." Or: "The evidence tentatively suggests that the policy can influence certain outcomes, particularly in constrained institutional settings."'
      ),
      task(
        'Write a hedged claim for the following research finding: A study of 500 firms found that firms that invested in staff training saw 12% higher productivity on average over three years.',
        'Consider: sample size limitations, causality vs correlation, generalisability. Use no more than two hedging devices.',
        'Example: "The data suggest that investment in staff training is associated with productivity gains of around 12% over a three-year period, though the causal mechanism and the generalisability of this finding beyond the sampled firms require further investigation."'
      ),
      task(
        'Add a stance marker (this paper argues / the evidence suggests / it seems clear that / one is led to conclude) to the following and explain why you chose it: "___________ the existing regulatory framework is not fit for purpose in the context of AI-generated content."',
        'Consider how confident you want to sound and whether the claim is about evidence or about your own analytical position.',
        'Example: "This paper argues that the existing regulatory framework is not fit for purpose in the context of AI-generated content." (Stance marker signals this is the essay\'s own analytical position, making it appropriate for an argumentative essay.) Or: "The evidence reviewed here suggests that..." (more appropriate if the claim rests on empirical findings reviewed in the paper.)'
      ),
    ],
  }),

  // ─── GRAMMAR-009: Cohesion at text level — reference, substitution, ellipsis ─
  createGrammarLesson({
    ...common,
    id: 'C1-GRAMMAR-009',
    order: 9,
    title: 'Text-level cohesion: reference chains, substitution, ellipsis and lexical cohesion',
    objectives: [
      'Maintain and track reference chains across multiple sentences using pronoun, demonstrative, and nominal reference.',
      'Use substitution (so, do so, such) and ellipsis to avoid repetition without sacrificing clarity.',
      'Build lexical cohesion through synonymy, hyponymy, and general nouns (phenomenon, process, development).',
      'Identify and correct cohesion failures (dangling reference, ambiguous pronouns, broken lexical chains).',
      'Control the density of cohesive devices to achieve the register appropriate to academic writing.',
    ],
    teacherOpening: 'Cohesion is what makes a text — as opposed to a collection of sentences. At B2, cohesion typically means using "however," "therefore," and "it" correctly. At C1, cohesion operates at a higher level: across paragraphs, through complex reference chains, through patterns of lexical repetition and variation, and through the strategic deployment of general nouns (phenomenon, process, mechanism, dynamic) that allow the writer to package a complex idea into a single noun phrase that can then be moved around the argument.',
    whyItMatters: 'Cohesion failures — broken reference chains, ambiguous pronouns, unexplained demonstratives — are among the most common problems in C1+ writing. They produce a text that seems locally clear but is globally confusing. At C1, you need to be able to track what "this," "the former," "such an approach," and "this phenomenon" refer to, and to use these devices deliberately.',
    differenceFromA2: 'B2: "The government introduced the policy. The policy had some effects. These effects were mixed." C1: "The government\'s introduction of the policy produced effects that were, on balance, mixed — a pattern that, as the following section demonstrates, is characteristic of top-down reform in contexts of low institutional capacity."',
    grammarTable: {
      headers: ['Cohesive device', 'Type', 'Example', 'Risk if misused'],
      rows: [
        ['it / they / this / these', 'Pronoun reference', '"The reform was introduced in 2019. It was immediately controversial."', 'Ambiguous reference if multiple nouns precede the pronoun'],
        ['the former / the latter', 'Demonstrative reference', '"Two approaches have been proposed: top-down and bottom-up. The former tends to be faster; the latter, more durable."', 'Only use when exactly two antecedents are clearly established'],
        ['such (a)', 'Near-reference', '"The committee recommended a complete redesign. Such a recommendation was unprecedented."', 'Must be clear what noun "such a" refers back to'],
        ['this + noun', 'Encapsulating nominal', '"The reform was slow and contested. This delay had significant political consequences."', '"This delay" encapsulates "slow and contested" — very powerful but only works if the nominal is accurate'],
        ['do so', 'Verbal substitution', '"The committee was asked to review the evidence and did so within six weeks."', 'Only use when the verb phrase is clearly recoverable'],
        ['general nouns', 'Lexical cohesion', '"process / mechanism / dynamic / tendency / phenomenon / pattern / development"', 'Over-use produces vague writing; use when the noun genuinely packages the previous idea'],
      ],
    },
    commonErrors: [
      { wrong: 'The government introduced the reform. They were surprised by the reaction. This caused problems.', right: 'The government introduced the reform and was surprised by the strength of the public reaction. This response — more organised and sustained than officials had anticipated — created significant political difficulties for the administration.', explanation: '"They" is ambiguous (the government or the public?). "This caused problems" is vague. The revision uses "this response" to encapsulate and name what "this" refers to, eliminating ambiguity and adding information.' },
      { wrong: 'There are two theories. The former suggests that markets are efficient. The latter argues otherwise.', right: 'Two competing theories have been proposed. The efficient market hypothesis holds that prices fully reflect available information; the behavioural finance approach contests this, arguing that cognitive biases produce systematic departures from efficiency.', explanation: 'The original is syntactically correct but thin. Naming the theories and providing content transforms the cohesive device from a crutch into a precision tool.' },
      { wrong: 'Many scholars have studied this. They all found different things.', right: 'The phenomenon has attracted sustained scholarly attention, with studies arriving at divergent — and sometimes incompatible — conclusions.', explanation: '"This" lacks a clear referent. "They all found different things" is both vague and informal. The revision uses "the phenomenon" (encapsulating general noun) and "divergent conclusions" (precise lexical choice).' },
    ],
    examples: [
      { sentence: 'The commission\'s report identified three structural failures. The first — inadequate oversight — had been flagged in earlier reviews; the second and third, by contrast, were novel findings that the existing literature had not anticipated.', explanation: 'Ordinal reference (the first, the second and third) tracks multiple items; "by contrast" signals the pivot; "that the existing literature had not anticipated" is a relative clause that adds argumentative information to the cohesive device.' },
      { sentence: 'Governments have been urged to act; most have done so, though the scale and pace of their responses have varied considerably.', explanation: '"Done so" is verbal substitution for "acted"; "their responses" continues the reference chain to "governments."' },
      { sentence: 'The assumption that economic growth necessarily reduces inequality is not well supported by the evidence. This assumption — which underpins much of the mainstream policy discourse — warrants critical re-examination.', explanation: '"This assumption" is an encapsulating demonstrative nominal that picks up and labels the claim made in the previous sentence, allowing it to be moved into subject position in the next sentence.' },
    ],
    tasks: [
      task(
        'Fix the cohesion failure in this passage: "There are two main approaches to the problem. One involves regulation. The other involves market incentives. This has been tried in several countries. They had different results."',
        'Identify each cohesion failure: what does "This" refer to? What does "They" refer to? Rewrite using precise reference chains and at least one encapsulating general noun.',
        'Example: "Two main approaches to the problem have been proposed: direct regulation and market-based incentives. The latter approach has been adopted in several countries, with results that have varied considerably depending on the institutional context in which it was implemented."'
      ),
      task(
        'Use the encapsulating nominal device ("this + noun") to connect these two sentences: "The treaty required all signatories to reduce emissions by 40% within a decade. Many economists argued this was unrealistic."',
        'Think about what noun best encapsulates the treaty requirement. "This target"? "This obligation"? "This commitment"? Choose the one that adds the most argumentative information.',
        'Example: "The treaty required all signatories to reduce emissions by 40% within a decade. This target — ambitious by any historical standard — was immediately contested by economists who argued that the timeframe was incompatible with the structural requirements of energy-intensive economies."'
      ),
      task(
        'Complete the following using a general noun (process / mechanism / tendency / pattern / dynamic) to encapsulate the previous sentence: "Firms that grow rapidly often experience a period of internal disorganisation before their management structures catch up with their scale. This ___________ has been documented across multiple sectors and is not specific to any one industry."',
        'Choose the noun that best characterises what is being described: a recurring phenomenon with a predictable shape.',
        '"This pattern" or "This dynamic" both work well. "Pattern" emphasises the recurring, predictable nature of the phenomenon; "dynamic" emphasises the interplay of forces (growth outpacing management) that drives it. Either is defensible; the choice depends on what the writer wants to emphasise.'
      ),
      task(
        'Write three sentences that build a reference chain. Start with: "The organisation\'s governance structure has been criticised on several grounds." Then add two more sentences using at least two different cohesion devices (pronoun, demonstrative nominal, general noun, substitution).',
        'Each sentence should advance the argument, not just repeat the previous one. The cohesive devices should make the reference chain clear and the argument flow naturally.',
        'Example: "The organisation\'s governance structure has been criticised on several grounds. The most persistent of these concerns the lack of independent oversight, which has been identified in three successive external reviews as the primary driver of the accountability failures documented in this report. This structural deficit — rather than any failure of individual leadership — is the central focus of the reforms proposed in the following section."'
      ),
    ],
  }),

  // ─── VOCABULARY-005: Advanced discourse vocabulary ───────────────────────────
  createVocabularyLesson({
    ...common,
    id: 'C1-VOCABULARY-005',
    order: 5,
    title: 'Vocabulary: advanced discourse and text-organisation vocabulary at C1',
    objectives: [
      'Use precise vocabulary for describing, framing, and positioning arguments.',
      'Distinguish between verbs of reporting/stating that carry different epistemic weight.',
      'Build a repertoire of nominalised discourse markers (premise, contention, caveat, inference, implication).',
      'Use evaluative adjectives/adverbs appropriate to C1 academic argument.',
    ],
    teacherOpening: 'There is a specific lexical register for managing academic discourse — for saying what kind of thing you are saying, what kind of claim your opponent is making, what kind of relationship holds between two ideas. Words like "contend," "premise," "inference," "caveat," "implication," and "stipulate" are the vocabulary of argument itself. Mastering them allows you to talk about your argument as you are making it, which is a signature feature of C1+ academic writing.',
    words: [
      { word: 'contend', partOfSpeech: 'verb', definition: 'to assert as a position in a debate or argument, with the implication that the claim is contestable', example: 'This essay contends that the current framework is structurally inadequate, not merely in need of incremental adjustment.', collocations: ['this paper contends that', 'I would contend that', 'scholars contend that'] },
      { word: 'premise', partOfSpeech: 'noun', definition: 'an assumption or starting point on which an argument depends; a foundational claim', example: 'The entire argument rests on the premise that rational actors will respond to price signals — a premise that behavioural economics has significantly complicated.', collocations: ['rest on the premise', 'underlying premise', 'the premise that', 'question the premise', 'shared premise'] },
      { word: 'inference', partOfSpeech: 'noun', definition: 'a conclusion drawn from evidence through reasoning, rather than directly observed', example: 'The inference that higher wages reduce productivity is not supported by the data reviewed here.', collocations: ['draw an inference', 'the inference that', 'warrant the inference', 'unwarranted inference', 'causal inference'] },
      { word: 'implication', partOfSpeech: 'noun', definition: 'a conclusion or consequence that follows from an argument or evidence, even if not stated explicitly', example: 'The implication of this finding is that the policy intervention, however well-designed, cannot succeed without prior reform of the institutional context.', collocations: ['the implication is that', 'policy implications', 'the broader implications', 'carry implications for', 'implication of this argument'] },
      { word: 'caveat', partOfSpeech: 'noun', definition: 'a qualification or warning that limits the scope of a claim', example: 'These findings should be interpreted with an important caveat: the sample was drawn exclusively from high-income urban settings.', collocations: ['with the caveat that', 'important caveat', 'enter a caveat', 'caveat here is', 'significant caveat'] },
      { word: 'stipulate', partOfSpeech: 'verb', definition: 'to specify a term, condition, or definition as a basis for an argument; to fix a meaning for the purposes of discussion', example: 'For the purposes of this analysis, I stipulate that "effectiveness" refers to measurable outcomes within a five-year window, rather than longer-term structural change.', collocations: ['stipulate that', 'stipulate a definition', 'as stipulated', 'the framework stipulates'] },
      { word: 'untenable', partOfSpeech: 'adjective', definition: 'of a position or argument: unable to be maintained or defended in the face of evidence or counter-argument', example: 'The claim that market forces alone can address climate change is, in light of the evidence, untenable.', collocations: ['position is untenable', 'render untenable', 'increasingly untenable', 'logically untenable'] },
      { word: 'compelling', partOfSpeech: 'adjective', definition: 'of an argument or evidence: persuasive because of its force, clarity, or explanatory power', example: 'The most compelling evidence for this position comes not from experimental studies but from the systematic comparison of natural policy experiments across OECD countries.', collocations: ['compelling evidence', 'compelling argument', 'less than compelling', 'makes a compelling case'] },
      { word: 'ostensibly', partOfSpeech: 'adverb', definition: 'apparently or seemingly, but with the suggestion that the reality may differ from the appearance', example: 'The policy was ostensibly designed to protect consumers; in practice, its primary beneficiaries appear to have been incumbent firms.', collocations: ['ostensibly designed to', 'ostensibly intended to', 'ostensibly aimed at', 'ostensibly neutral'] },
      { word: 'notwithstanding', partOfSpeech: 'preposition/adverb', definition: 'in spite of; used to introduce a concession or qualification', example: 'Notwithstanding the methodological limitations acknowledged above, the findings are sufficiently robust to support the main contention of this paper.', collocations: ['notwithstanding this', 'notwithstanding the limitations', 'notwithstanding the evidence to the contrary'] },
      { word: 'lend weight to', partOfSpeech: 'phrase', definition: 'to provide support for or increase the credibility of a claim', example: 'The cross-national data lend considerable weight to the argument that institutional design, rather than cultural factors, is the primary determinant of governance quality.', collocations: ['lend weight to the argument', 'lend considerable weight', 'lends weight to this view'] },
      { word: 'disavow', partOfSpeech: 'verb', definition: 'to deny responsibility for or association with; to repudiate', example: 'The authors disavow any interpretation of their findings as supporting the strong version of the efficiency hypothesis.', collocations: ['disavow any claim', 'disavow responsibility', 'disavow the interpretation'] },
    ],
    tasks: [
      task(
        'Use "contend," "premise," and "inference" in three separate sentences arguing that social media companies should be more heavily regulated. Each word must be used correctly and in a distinct argumentative function.',
        'Think about the different roles: "contend" = state your position; "premise" = name an assumption; "inference" = name a conclusion drawn from evidence.',
        'Examples: "This essay contends that existing self-regulatory frameworks have failed to produce meaningful accountability." / "The argument rests on the premise that information asymmetry between platforms and users is not self-correcting under market conditions." / "The inference that current levels of digital advertising revenue are incompatible with user privacy is well supported by the documented business models of the major platforms."'
      ),
      task(
        'Complete these sentences with the most appropriate word from the vocabulary list: (a) "The position that economic growth always benefits the poor is, on the evidence presented here, ___________." (b) "These results should be read with an important ___________: they apply only to contexts in which the baseline level of institutional trust is high." (c) "The policy was ___________ aimed at reducing carbon emissions; its primary effect was to shift production to jurisdictions with weaker environmental regulations."',
        'Choose: untenable / caveat / ostensibly. Match each word to its correct context.',
        '(a) untenable — the argument cannot be maintained in the face of the evidence. (b) caveat — a qualification limiting the scope of the findings. (c) ostensibly — apparently intended for one purpose, but with a different actual effect.'
      ),
      task(
        'Rewrite the following using vocabulary from this lesson: "The argument depends on the idea that people always act rationally. But this might not be true. So the conclusion might be wrong."',
        'The original is correct but very thin. Use "premise," "untenable," and "inference" (or similar) to write a more precise version.',
        'Example: "The argument rests on the premise that agents act as fully rational utility-maximisers — an assumption that decades of behavioural research have rendered, if not wholly untenable, then at least in need of substantial qualification. The inference that market mechanisms will therefore produce optimal outcomes must be treated with considerable scepticism."'
      ),
    ],
  }),

  // ─── VOCABULARY-006: Advanced verbs of reporting and attribution ──────────────
  createVocabularyLesson({
    ...common,
    id: 'C1-VOCABULARY-006',
    order: 6,
    title: 'Vocabulary: advanced verbs of reporting, attribution, and stance in academic writing',
    objectives: [
      'Use verbs of reporting that carry precise epistemic weight (concede, dispute, posit, invoke, subscribe to).',
      'Distinguish between neutral attribution ("X notes"), positive stance ("X demonstrates"), and sceptical attribution ("X claims," "X purports to show").',
      'Build collocational fluency with verbs used in academic citation and argument.',
      'Avoid overuse of "says," "thinks," and "believes" at C1 level.',
    ],
    teacherOpening: 'Every time you cite a source or attribute a view to a scholar, you are also making a claim about how credible or authoritative that view is. "X says Y" is neutral. "X demonstrates Y" implies that X has proved it. "X claims Y" implies you are not sure you agree. "X concedes Y" implies that Y is a point against X\'s main position. Choosing the right reporting verb is not just a vocabulary question — it is an argumentative decision.',
    words: [
      { word: 'posit', partOfSpeech: 'verb', definition: 'to put forward or assume as a basis for argument, especially a theoretical or hypothetical claim', example: 'Rawls posits a hypothetical "original position" from which rational agents, ignorant of their social circumstances, would choose principles of justice.', collocations: ['posit a theory', 'posit that', 'as posited by'] },
      { word: 'concede', partOfSpeech: 'verb', definition: 'to acknowledge a point made by an opponent, typically reluctantly and as part of a larger disagreement', example: 'Even the most committed advocates of the policy concede that its distributional effects have been unequal.', collocations: ['concede that', 'concede the point', 'concede a limitation'] },
      { word: 'dispute', partOfSpeech: 'verb', definition: 'to challenge or contest the validity of a claim, interpretation, or finding', example: 'Several scholars have disputed the causal mechanism proposed by the original study, arguing that the observed correlation is an artefact of the sampling method.', collocations: ['dispute the claim', 'dispute the finding', 'hotly disputed', 'widely disputed'] },
      { word: 'invoke', partOfSpeech: 'verb', definition: 'to call upon an argument, principle, authority, or concept in support of a position', example: 'Critics of the policy invoke principles of distributive justice to argue that its costs are borne disproportionately by those least able to bear them.', collocations: ['invoke an argument', 'invoke a principle', 'invoke authority', 'invoke the concept of'] },
      { word: 'subscribe to', partOfSpeech: 'phrase', definition: 'to accept or endorse a theory, view, or set of beliefs', example: 'Not all members of the discipline subscribe to the view that methodological individualism is a necessary foundation for social theory.', collocations: ['subscribe to the view', 'subscribe to the theory', 'subscribe to the position'] },
      { word: 'acknowledge', partOfSpeech: 'verb', definition: 'to recognise or admit the existence or truth of something, especially something that complicates one\'s argument', example: 'The authors acknowledge that the study\'s reliance on self-reported data may have introduced systematic bias.', collocations: ['acknowledge that', 'acknowledge the limitation', 'it must be acknowledged that'] },
      { word: 'overstate', partOfSpeech: 'verb', definition: 'to exaggerate the strength, scope, or significance of a claim', example: 'It would be a mistake to overstate the extent to which this finding challenges the prevailing consensus; it complicates rather than refutes it.', collocations: ['overstate the case', 'overstate the significance', 'it would be an overstatement to'] },
      { word: 'underpin', partOfSpeech: 'verb', definition: 'to provide the foundational support or rationale for a claim, theory, or approach', example: 'The theoretical framework that underpins this analysis draws on both institutional economics and political sociology.', collocations: ['underpin the argument', 'underpin the theory', 'the assumptions that underpin'] },
      { word: 'purport to', partOfSpeech: 'phrase', definition: 'to claim or appear to do or be something, with an implication that the claim may be false or unverified', example: 'Several studies purport to demonstrate a causal link, but the methodological weaknesses identified in the literature review cast doubt on this claim.', collocations: ['purport to show', 'purport to demonstrate', 'purport to be'] },
      { word: 'corroborate', partOfSpeech: 'verb', definition: 'to confirm or give support to a statement or theory', example: 'The findings of the 2022 replication study corroborate the original authors\' conclusions and substantially strengthen the evidential basis for the proposed mechanism.', collocations: ['corroborate the finding', 'corroborate the claim', 'independently corroborated', 'corroborate the view'] },
    ],
    tasks: [
      task(
        'Rewrite these sentences using a more precise reporting verb: (a) "Marx says that capitalism produces inequality." (b) "The study thinks the drug is effective." (c) "Some critics say the theory is wrong."',
        'Choose verbs that carry appropriate epistemic weight. (a) Is this a neutral description of Marx\'s argument? (b) What does a study do — does it "think"? (c) Are the critics arguing against it, or just noting a different view?',
        '(a) "Marx argues / contends that capitalism structurally produces and reproduces inequality as a systemic feature, not a correctable aberration." (b) "The study suggests / finds / provides evidence that the drug is effective under the conditions tested." (c) "Several critics dispute the theory\'s core assumptions, arguing that..." or "Some scholars have questioned / contested the theory..."'
      ),
      task(
        'Use "concede," "invoke," and "dispute" in a short paragraph (50–70 words) about a policy debate you know something about.',
        'The paragraph should use each word correctly: one to make a strategic concession, one to bring in a principle or argument, and one to contest a claim.',
        'Example: "Proponents of a universal basic income concede that the fiscal costs of full implementation are substantial. They invoke principles of economic security and labour market flexibility to argue that these costs are justified. Critics, however, dispute the empirical basis for the claim that UBI would reduce work incentives, citing evidence from pilot schemes in Finland and Kenya."'
      ),
      task(
        'Complete the sentence with an appropriate verb and explain why: "The authors ___________ that the study has limitations but argue that these do not materially affect the main conclusions."',
        'Which verb signals an acknowledgment that is somewhat reluctant or strategic? The authors are admitting something while defending their position.',
        '"Acknowledge" is most precise: it is neutral but signals a deliberate admission. "Concede" would also work and carries a slightly more defensive tone. "Accept" is possible but weaker. "Admit" is slightly informal for academic writing.'
      ),
    ],
  }),

  // ─── SPEAKING-003: Extended academic presentation and position defence ─────────
  createSpeakingLesson({
    ...common,
    id: 'C1-SPEAKING-003',
    order: 3,
    title: 'Speaking: extended academic position — signposting, hedging, and concession in oral argument',
    objectives: [
      'Deliver a structured 3–4 minute position statement using C1.3 discourse features.',
      'Use spoken signposting (I want to turn to... / The second point I wish to make... / Let me now address the objection...) to manage listener comprehension.',
      'Integrate hedging into spoken academic argument without sounding evasive.',
      'Make and recover from a strategic concession in real-time oral argument.',
    ],
    teacherOpening: 'Academic speaking at C1 is not the same as academic writing spoken aloud. Oral discourse requires different signposting (since listeners cannot see paragraph breaks), more explicit marking of argument structure, and the ability to acknowledge counter-arguments while maintaining momentum. The C1 speaking task in this lesson asks you to use the discourse tools from C1.3 in a live spoken context.',
    modelPhrases: [
      'What I would contend is that the production of knowledge and the institutional capacity to deploy it are distinct questions.',
      'The first point concerns governance; the second, which I think is equally important, concerns knowledge production.',
      'Let me now turn to the objection I anticipated — namely, that universities have in fact shaped the most significant developments of this century.',
      'The caveat I would enter is that "ill-equipped" should be understood as a claim about governance, not about the quality of knowledge produced.',
      'That said, I should note that this is not a new tension — it is one that has been recognised for decades.',
      'To sum up: the claim is broadly, though not unconditionally, supported.',
    ],
    pronunciationFocus: {
      title: 'Pronunciation & shadowing',
      tips: [
        'Shadow: "What I would contend is that the production of knowledge and the institutional capacity to deploy it are distinct questions." — chunk into four breath groups and stress conTEND, proDUCtion, caPAcity, and disTINCT.',
        '"I want to turn now to the objection I anticipated." — practise the signposting pause after "now" and stress obJECtion and anTIcipated.',
        '"That said, I should note that this is not a new tension..." — reduce "that said" to a quick chunk; stress NEW and TENsion.',
        '"The caveat I would enter is that..." — stress CAveat and ENter. Use confident falling intonation to signal precision, not hesitation.',
      ],
    },
    dialogueTurns: [
      { speaker: 'Tutor', text: 'Today we\'re practising the kind of spoken argument you\'d give in a seminar or a conference presentation. I want you to take a position on the following statement: "Academic institutions are ill-equipped to address the challenges of the twenty-first century." You have three to four minutes. Structure your argument explicitly — I\'ll be listening for how you signal transitions, handle uncertainty, and respond to counter-arguments. Ready?' },
      { speaker: 'Student (model)', text: 'Thank you. I want to argue that the statement is partially correct — but that "ill-equipped" overstates the case. I\'ll make three points and then address what I take to be the strongest objection.' },
      { speaker: 'Student (model)', text: 'The first point concerns governance. Academic institutions are, in many respects, structurally poorly adapted to fast-moving challenges. Their governance structures — senate-based, consensus-driven, and resistant to rapid change — were designed for an era of slower-paced scholarly production. What this means in practice is that the timescales on which these institutions operate are frequently misaligned with the timescales on which twenty-first century challenges unfold.' },
      { speaker: 'Student (model)', text: 'The second point, which I think is equally important, concerns knowledge production. There is, I would contend, a persistent structural tension between the depth of specialisation that academic institutions cultivate and the cross-disciplinary integration that problems like climate change or pandemic preparedness require. That said, I should note that this is not a new tension — it is one that has been recognised within universities for decades, and there are genuine, if partial, efforts to address it.' },
      { speaker: 'Student (model)', text: 'Let me now turn to the objection I anticipated. One might argue that the entire history of twenty-first century challenges — from genomics to computational social science — has in fact been shaped by academic research. This is a compelling point and I concede it fully. What I would dispute, however, is the inference that because universities have produced knowledge relevant to these challenges, they are therefore well-equipped to address them institutionally. The production of knowledge and the institutional capacity to deploy it are, I would argue, distinct questions.' },
      { speaker: 'Student (model)', text: 'To sum up: the claim that academic institutions are ill-equipped is broadly, though not unconditionally, supported. The caveat I would enter is that "ill-equipped" should be understood as a claim about governance and deployment capacity, not about the quality or relevance of the knowledge produced.' },
      { speaker: 'Tutor', text: 'That was a strong argument. Let me push back on one point. You drew a distinction between knowledge production and institutional deployment capacity. But isn\'t that distinction itself somewhat untenable? Most knowledge becomes deployable precisely because it\'s embedded in institutional structures — labs, funding bodies, regulatory agencies that emerged from or are deeply connected to universities.' },
      { speaker: 'Student (model)', text: 'That\'s a fair challenge and I think it partially undermines my distinction, which I may have drawn too sharply. What I would want to retain, though — and this is the crux of the argument — is that the pace of institutional adaptation is the variable that matters most. Even granting that knowledge production and institutional embedding are closely linked, the question is whether existing institutions can adapt fast enough. On that narrower question, I\'d maintain that the evidence suggests they cannot, at least not without significant governance reform.' },
    ],
    tasks: [
      task(
        'Prepare a 3–4 minute spoken position on ONE of the following topics: (a) "The internet has done more harm than good for public discourse." (b) "Economic growth is incompatible with meaningful environmental sustainability." (c) "Universities should be primarily vocational rather than intellectual institutions." Plan three points, identify the strongest objection, and prepare a concession-and-pivot.',
        'Write bullet points only — do not write a script. Your spoken argument should sound natural and organised, not read. Plan: three points, one objection, one concession-and-pivot.',
        'Your spoken argument should include: an opening that signals structure ("I want to make three points..."), explicit transitions between points ("Let me turn to the second point..."), at least one hedging phrase ("I would contend that / the evidence tentatively suggests"), a concession ("This is a compelling objection and I concede that..."), a pivot ("What I would dispute, however, is..."), and a closing that restates your position precisely.'
      ),
      task(
        'Practise the concession-and-pivot move. Complete this spoken sequence: "One might argue that [state the strongest objection to your position]. [Concession phrase]. [Pivot phrase]. [Explain why the objection does not defeat your argument]."',
        'Use "I concede / admittedly / that said / what I would dispute, however / even granting that" to structure your response.',
        'Example: "One might argue that universities have in fact adapted rapidly — the explosion of online learning, interdisciplinary institutes, and industry partnerships over the last two decades demonstrates this. That is a compelling point and I concede that the pace of change has accelerated. What I would dispute, however, is whether these changes have touched the governance core of academic institutions — the structures that determine how resources are allocated, how knowledge is evaluated, and how quickly decisions can be made. On that question, the evidence suggests that adaptation has been peripheral rather than structural."'
      ),
      task(
        'Listen to the model student\'s argument and identify: (a) one hedging phrase, (b) one discourse marker that signals a transition, (c) the concession phrase, and (d) the pivot phrase.',
        'Re-read the model turns carefully. The markers will be explicit and deliberate.',
        '(a) Hedging: "I would contend" / "I should note" / "I would argue." (b) Transition: "Let me now turn to the objection I anticipated." (c) Concession: "This is a compelling point and I concede it fully." (d) Pivot: "What I would dispute, however, is the inference that..."'
      ),
    ],
    speakingChecklist: [
      'Position stated clearly and specifically in the opening.',
      'At least three distinct points, each signposted with explicit transitions.',
      'At least one hedging phrase used accurately (I would contend / tentatively / the evidence suggests).',
      'Concession-and-pivot performed smoothly — concession is genuine, pivot is substantive.',
      'Counter-argument addressed directly, not deflected.',
      'Formal register maintained throughout — no slips into informal vocabulary.',
      'Closing restates position with qualification, not mere repetition.',
    ],
  }),

]);

export const C1_DEEP_EXTENDED_DISCOURSE_PART1_BY_PILLAR = Object.freeze({
  grammar: Object.freeze(C1_DEEP_EXTENDED_DISCOURSE_PART1.filter(l => l.pillar === 'grammar')),
  vocabulary: Object.freeze(C1_DEEP_EXTENDED_DISCOURSE_PART1.filter(l => l.pillar === 'vocabulary')),
  reading: Object.freeze([]),
  listening: Object.freeze([]),
  speaking: Object.freeze(C1_DEEP_EXTENDED_DISCOURSE_PART1.filter(l => l.pillar === 'speaking')),
  writing: Object.freeze([]),
  checkpoint: Object.freeze([]),
});
