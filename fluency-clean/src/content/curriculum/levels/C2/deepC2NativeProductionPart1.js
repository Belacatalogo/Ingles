import { createGrammarLesson, createVocabularyLesson, createReadingLesson, createListeningLesson } from '../../../schemas/index.js';

const level = 'C2';
const status = 'ready';
const common = { level, status, estimatedMinutes: 75, tags: ['c2-4', 'near-native', 'production', 'mastery', 'deep-approved-target'] };

function task(instruction, note = '', expected = '') { return { instruction, note, expected }; }

export const C2_DEEP_NATIVE_PRODUCTION_PART1 = Object.freeze([

  // ─── GRAMMAR-007: Idiomatic and lexical collocations at C2 ───────────────────
  createGrammarLesson({
    ...common,
    id: 'C2-GRAMMAR-007',
    order: 7,
    title: 'Grammar: Collocation and idiomatic precision — the last frontier of near-native fluency',
    objectives: [
      'Understand why collocation is the defining feature of near-native rather than merely advanced L2 English.',
      'Identify and use strong collocations in formal and academic registers.',
      'Avoid the non-idiomatic constructions that persist in even very advanced L2 output.',
      'Develop the habit of thinking in collocations rather than words.',
    ],
    teacherOpening: 'Grammar rules can be learned. Vocabulary can be memorised. But collocation — the way words prefer to go together — can only be internalised through sustained exposure to large amounts of authentic text. At C2, the gap between native and near-native production is almost entirely a collocation gap: "make a decision" not "take a decision"; "raise a question" not "lift a question"; "heavy rain" not "strong rain." This lesson catalogues the most important collocation distinctions for academic and formal registers.',
    grammarTable: {
      headers: ['Verb', 'Strong collocations in academic/formal English', 'Common L2 errors', 'Notes'],
      rows: [
        ['make', 'make an argument, make a distinction, make a claim, make a contribution, make an assumption, make progress, make a point', '"do an argument" / "create a distinction" / "produce a claim"', '"Make" + abstract noun is overwhelmingly preferred in academic English for productive/creative acts'],
        ['draw', 'draw a conclusion, draw a distinction, draw an analogy, draw attention to, draw on (sources/evidence)', '"arrive at a conclusion" (also correct but less common) / "make an analogy" (acceptable but weaker)', '"Draw" collocates strongly with mental/intellectual products'],
        ['raise', 'raise a question, raise concerns, raise an objection, raise the issue of, raise awareness', '"lift a question" / "bring up a question" (spoken OK but not academic writing)', '"Raise" + abstract noun is standard for introducing issues; "lift" does not collocate with these nouns'],
        ['hold', 'hold a view, hold the position that, hold X accountable, hold true, hold that (believe)', '"have a view" (less precise) / "take a position" (acceptable alternative)', '"Hold" + view/position is the academic standard for sustained belief'],
        ['pose', 'pose a challenge, pose a threat, pose a question, pose a problem', '"present a challenge" (acceptable) / "create a problem" (different nuance)', '"Pose" implies the challenge is directed at someone; used when the challenge requires a response'],
        ['bear', 'bear in mind, bear witness to, bear the burden of, bear scrutiny, bear a resemblance', '"keep in mind" (informal OK) / "have in mind" (different meaning)', '"Bear" in formal collocations cannot be replaced with "carry" without changing register'],
        ['lend', 'lend credibility to, lend support to, lend weight to, lend itself to (be suitable for)', '"give credibility" (acceptable) / "provide support" (more neutral)', '"Lend" implies the support is contingent — it can be withdrawn — which adds precision'],
      ],
    },
    brazilianMistakes: [
      { mistake: '"The study does a contribution to the literature."', correction: '"The study makes a contribution to the literature." — "make" is the only natural verb here.', explanation: '"Make a contribution" is a fixed collocation. "Do" collocates with activities and processes, not intellectual products. This is one of the most common collocational errors in Brazilian-influenced academic English.' },
      { mistake: '"These results give weight to the hypothesis."', correction: '"These results lend weight to the hypothesis." — "lend" is strongly preferred for this abstract collocation.', explanation: '"Lend weight to" implies the results add credibility provisionally — a nuance "give weight to" does not carry as clearly. In academic writing, "lend" is the natural choice for credibility/weight/support collocations.' },
      { mistake: '"The author takes a conclusion that X is true."', correction: '"The author draws the conclusion that X is true." or "The author concludes that X is true."', explanation: '"Draw a conclusion" is the fixed academic collocation; "take a conclusion" is not idiomatic in English. This is direct interference from Portuguese "tirar uma conclusão."' },
    ],
    controlledPractice: [
      task(
        'Fill in the correct verb in each collocation:\n(a) The findings _____ weight to the theory that X causes Y.\n(b) The author _____ a distinction between two types of evidence that previous scholars had conflated.\n(c) This methodology _____ a significant challenge to researchers working with limited datasets.\n(d) The research _____ attention to a gap in the existing literature.',
        'Choose from: lend, draw, pose, draws — think about which verb collocates most naturally.',
        '(a) lend (b) draws (c) poses (d) draws'
      ),
      task(
        'Identify and correct the collocation error in each sentence:\n(a) "The paper does an important contribution to debates about democracy."\n(b) "We must take this finding in mind when interpreting the results."\n(c) "The argument barely holds examination."',
        'Name the collocation error (wrong verb or wrong preposition) before correcting.',
        '(a) "does" → "makes" (make a contribution) (b) "take" → "bear / keep" (bear in mind) (c) "holds examination" → "bears scrutiny" (bear scrutiny)'
      ),
    ],
    productionTasks: [
      task(
        'Write a 120-word analytical paragraph using at least 6 strong collocations from the table. Underline each collocation. The topic: evaluate the contribution of a real or imaginary study to a field of your choice.',
        'The collocations should arise naturally from the content — do not force them in. Choose a topic and a study (real or invented) that creates opportunities for the collocations you want to practise.',
        'Evaluate: are all 6 collocations used correctly (right verb, right preposition, right context)? Do any feel forced or unnatural? Does the paragraph cohere as analytical prose?'
      ),
    ],
  }),

  // ─── GRAMMAR-008: Hedging and boosting in academic prose ─────────────────────
  createGrammarLesson({
    ...common,
    id: 'C2-GRAMMAR-008',
    order: 8,
    title: 'Grammar: The calibration of certainty — hedging, boosting, and epistemic precision at C2',
    objectives: [
      'Use the full spectrum of hedging and boosting devices with precision at C2 level.',
      'Distinguish between grammatical hedges (modal verbs), lexical hedges (stance adverbs), and clausal hedges (it appears that…).',
      'Understand when to boost rather than hedge — when certainty is warranted and how to signal it.',
      'Achieve the epistemic balance that characterises expert academic prose: precise neither about more nor less than the evidence supports.',
    ],
    teacherOpening: 'Epistemic calibration — saying no more and no less than you know — is one of the most demanding skills in academic writing. This lesson catalogues the full system of English hedging and boosting devices and focuses on the precision of calibration: not "hedge everything" or "state everything confidently," but match the linguistic form to the evidential situation with precision.',
    grammarTable: {
      headers: ['Device type', 'Examples', 'Epistemic force', 'Register'],
      rows: [
        ['Modal verb hedges', 'may, might, could (epistemic); would (hypothetical); should (predictive)', '"The effect may be attributable to…" = possible / "The effect could be…" = possible from available evidence', 'Universal in academic writing; calibrate may vs. might by degree of probability'],
        ['Lexical stance adverbs (boosters)', 'clearly, obviously, certainly, undoubtedly, unquestionably, demonstrably', '"The evidence clearly demonstrates…" — use only when the evidence is beyond reasonable dispute', 'Risk of over-use; mark certainty only when warranted; native readers notice overclaiming'],
        ['Lexical stance adverbs (hedges)', 'apparently, seemingly, arguably, purportedly, ostensibly, presumably, arguably', '"The results are arguably the strongest yet produced in this field." — hedges a strong claim', 'Formal; note: "arguably" is used to present a strong claim one is making, not to apologise for it'],
        ['Clausal hedges', '"It appears / seems / would appear that…" / "Evidence suggests / indicates / points to…" / "It is worth noting that…"', 'Impersonalise and hedge simultaneously; standard in academic findings sections', 'Academic standard; "appears" is slightly more hedged than "seems"'],
        ['Attribution hedges', '"According to X / As X argues / X suggests that…" — report without endorsing', 'Distance the writer from the claim; the epistemic status belongs to the source, not the writer', 'Essential in literature reviews; verb choice signals writer\'s endorsement level'],
        ['Scope limitation', '"In this context / within this sample / under these conditions / to the extent that…"', 'Limit the domain of application; prevent over-generalisation', 'Important in methods and findings sections; often omitted by L2 writers'],
        ['Boosters (strong certainty)', '"The evidence demonstrates / establishes / shows / proves…" — use only with strong warrant', '"Demonstrates" is stronger than "suggests"; "proves" is very strong and appropriate only in deductive contexts', 'Native writers use boosters carefully; overclaiming is a serious credibility risk'],
      ],
    },
    brazilianMistakes: [
      { mistake: '"This proves that the hypothesis is correct."', correction: '"The evidence supports / is consistent with / provides strong support for the hypothesis." — "proves" is appropriate only in mathematics and formal logic.', explanation: 'Empirical science cannot "prove" a hypothesis in the strict sense — it can only support or fail to refute it. Using "proves" in an empirical context is a serious epistemic error that native academic readers will notice.' },
      { mistake: '"Obviously, social media causes depression."', correction: '"The evidence suggests an association between heavy social media use and depressive symptoms — a relationship that is consistent with a causal account, though the causal pathway remains contested."', explanation: '"Obviously" as a booster implies that any reasonable person would agree — which is false for contested empirical claims. Boosters are only appropriate for claims that are genuinely beyond dispute.' },
    ],
    controlledPractice: [
      task(
        'Rate the strength of each hedge and explain the difference:\n(a) "The results may indicate that X is a factor."\n(b) "The results suggest that X is a factor."\n(c) "The results demonstrate that X is a factor."\n(d) "The results prove that X is a factor."',
        'Rank from most hedged to most certain. What additional information would each level require to be appropriate?',
        'Ranking: (a) may indicate — most hedged (possibility only, limited evidence); (b) suggest — moderately hedged (evidence points in this direction but is not conclusive); (c) demonstrate — lightly hedged/near-booster (strong evidence required, causation not necessarily established); (d) prove — strongest (appropriate only in mathematics/formal logic, almost never appropriate in empirical science). Each step requires stronger and more consistent evidence to be used appropriately.'
      ),
      task(
        'Rewrite the following passage to calibrate the stance markers appropriately. The original is uniformly overcertain:\n"Social media obviously causes political polarisation. This is clearly demonstrated by the evidence. All studies confirm that people who use social media are more polarised. The solution is obviously platform regulation."',
        'Replace boosters with appropriate hedges. Distinguish between what is well-established and what is speculative.',
        '"The evidence suggests an association between social media use and political polarisation, though the causal relationship remains contested — some studies indicate that polarisation preceded the rise of social media. While a majority of studies in this area are consistent with the hypothesis that social media amplifies pre-existing divisions, the mechanism and the magnitude of the effect are not settled. Regulatory intervention has been proposed as a potential response; whether it would be effective is an empirical question that current evidence does not resolve."'
      ),
    ],
    productionTasks: [
      task(
        'Write an 80-word paragraph arguing for a position on a contested empirical or policy question. Use at least four different types of epistemic device (two hedges, one booster for a well-supported claim, one scope limitation). Label each.',
        'The booster should be reserved for the claim you are most confident about; the hedges should match the actual degree of uncertainty in the evidence.',
        'Evaluate: is each device calibrated correctly to the specific claim it qualifies? Is the overall epistemic picture accurate? Would a specialist in the area find the level of confidence expressed appropriate?'
      ),
    ],
  }),

  // ─── VOCABULARY-007: Nuance in evaluation and critique ───────────────────────
  createVocabularyLesson({
    ...common,
    id: 'C2-VOCABULARY-007',
    order: 7,
    title: 'Vocabulary: Precision in evaluation — the fine distinctions of intellectual assessment at C2',
    objectives: [
      'Use evaluative vocabulary that distinguishes between different kinds of strength and weakness.',
      'Apply appropriate evaluative vocabulary to different types of intellectual work (argument, methodology, evidence, conclusion).',
      'Avoid the reductive binary (good/bad, strong/weak) that marks C1 rather than C2 evaluation.',
    ],
    teacherOpening: 'Intellectual evaluation at C2 is not binary — not simply "strong" or "weak," "right" or "wrong." The best evaluation is calibrated: it names the specific type of strength or weakness, the specific dimension on which the evaluation is made, and the implications for the overall assessment. This vocabulary lesson provides the words for that fine-grained evaluation.',
    words: [
      { word: 'incisive', definition: 'Intelligently analytical and clear-thinking; cutting directly to the point with sharpness.', example: 'The reviewer\'s analysis is incisive: in two paragraphs it dismantles an argument that the original took twenty pages to develop, by identifying the single unexamined premise on which the entire structure rests.', collocations: ['an incisive analysis', 'incisive criticism', 'an incisive mind', 'an incisive observation'] },
      { word: 'specious', definition: 'Superficially plausible or true but actually wrong or misleading; deceptively attractive.', example: 'The argument is specious: it sounds compelling because it uses familiar empirical vocabulary, but the inference from the data to the conclusion involves a logical step that the evidence does not support.', collocations: ['a specious argument', 'specious reasoning', 'a specious claim', 'superficially plausible but ultimately specious'] },
      { word: 'germane', definition: 'Relevant to a subject under consideration; pertinent.', example: 'The historical context the author provides is genuinely germane to the argument — it is not merely background but a constitutive element of the explanation being offered.', collocations: ['germane to the argument', 'directly germane', 'not germane to', 'highly germane'] },
      { word: 'unassailable', definition: 'Unable to be attacked or questioned; not open to doubt.', example: 'The only genuinely unassailable claim in the paper is the methodological description — everything else, including the interpretation, is subject to legitimate challenge.', collocations: ['an unassailable position', 'logically unassailable', 'an unassailable conclusion', 'not entirely unassailable'] },
      { word: 'tendentious', definition: 'Review from C1-VOCABULARY-002; at C2, used with greater precision about the specific way the tendentiousness operates.', example: 'The selection of evidence is tendentious in a specific way: contrary findings are not rebutted but simply omitted, which is more misleading than selective interpretation because it prevents the reader from making an informed assessment.', collocations: ['tendentious in a specific way', 'tendentious selection', 'tendentious framing', 'tendentiously presented'] },
      { word: 'circumspect', definition: 'Wary and unwilling to take risks; cautious; careful to consider all circumstances and possible consequences.', example: 'The author is commendably circumspect in drawing conclusions from the preliminary data, acknowledging the limitations of the design and calling for replication before any policy implications are drawn.', collocations: ['commendably circumspect', 'appropriately circumspect', 'circumspect in drawing conclusions', 'a circumspect approach'] },
      { word: 'sanguine', definition: 'Optimistic, especially in a difficult situation; in older usage, ruddy-complexioned.', example: 'The reviewers are more sanguine about the prospects for reform than the evidence justifies: the structural obstacles they identify in section 2 appear, on their own account, to be insuperable.', collocations: ['unduly sanguine', 'more sanguine than warranted', 'sanguine about prospects', 'a sanguine assessment'] },
      { word: 'perspicacious', definition: 'Having a ready insight into and understanding of things; mentally sharp; keenly perceptive.', example: 'The perspicacious reader will note that the author\'s treatment of the third case — the most complex — is significantly shorter than the first two, which raises a question about whether the framework fully accommodates it.', collocations: ['a perspicacious reader', 'perspicacious observation', 'a perspicacious analysis', 'unusually perspicacious'] },
      { word: 'cogent', definition: '(Of an argument or case) clear, logical, and convincing.', example: 'The argument is cogent in its structure but depends on an empirical assumption — the uniformity of the effect across contexts — that the data do not fully support.', collocations: ['a cogent argument', 'cogent reasoning', 'cogently argued', 'a cogent case for'] },
      { word: 'nugatory', definition: 'Of no value or importance; useless.', example: 'The theoretical framework the paper proposes is not wrong — it is nugatory: it describes a process that is already fully captured by existing models without adding any explanatory or predictive power.', collocations: ['a nugatory contribution', 'practically nugatory', 'render nugatory', 'nugatory distinction'] },
    ],
    dangerousConfusions: [
      { pair: ['specious', 'spurious'], explanation: '"Specious" means appearing plausible but being actually wrong or misleading — the deception is in the appearance of validity. "Spurious" means false or lacking real basis — not necessarily deceptively attractive. "A specious argument" looks convincing; "a spurious argument" simply lacks foundation. Both can apply to the same argument, but "specious" emphasises the deception while "spurious" emphasises the lack of genuine basis.' },
      { pair: ['cogent', 'compelling'], explanation: '"Cogent" specifically describes the logical quality of an argument — it is structured, clear, and logically valid. "Compelling" describes the persuasive force of an argument on the reader — it is convincing, possibly for non-logical reasons (emotional, rhetorical). A cogent argument is logically well-formed; a compelling argument moves the reader. An argument can be cogent without being compelling (if the reader resists the conclusion) and compelling without being cogent (if it works through rhetoric rather than logic).' },
    ],
  }),

  // ─── VOCABULARY-008: Sophisticated hedging vocabulary ────────────────────────
  createVocabularyLesson({
    ...common,
    id: 'C2-VOCABULARY-008',
    order: 8,
    title: 'Vocabulary: Sophisticated hedging — epistemic vocabulary beyond modal verbs',
    objectives: [
      'Use a lexically rich range of hedging words beyond "may," "might," and "could."',
      'Distinguish between hedges that express possibility, probability, source uncertainty, and scope limitation.',
      'Apply hedging vocabulary in the appropriate syntactic contexts.',
    ],
    teacherOpening: 'Modal verbs are the most-taught hedging devices, but at C2 the full system of hedging vocabulary goes far beyond them. Native academic writers hedge with a rich set of lexical items — adverbs, verbs, adjectives, and clauses — that carry more nuanced epistemic meanings than a modal verb alone can convey. This lesson focuses on that rich lexical system.',
    words: [
      { word: 'tentatively', definition: 'In a hesitant or exploratory way; as a first step or provisional approach.', example: 'We tentatively propose that the mechanism involves a feedback loop, while acknowledging that the evidence is insufficient to establish this with confidence.', collocations: ['tentatively propose', 'tentatively conclude', 'tentatively identified as', 'put forward tentatively'] },
      { word: 'ostensibly', definition: 'Review from C2-VOCABULARY-003; at mastery level, note: can function as a hedge when the stated reason is presented as potentially misleading.', example: 'The intervention is ostensibly designed to improve air quality; its primary function, however, appears to be regulatory compliance.', collocations: ['ostensibly designed to', 'ostensibly motivated by', 'what is ostensibly X'] },
      { word: 'purportedly', definition: 'As is claimed, especially when the claim is doubted; allegedly.', example: 'The technique, purportedly capable of detecting deception at 90% accuracy, has not been independently replicated.', collocations: ['purportedly effective', 'purportedly demonstrated', 'purportedly capable of', 'a purportedly revolutionary method'] },
      { word: 'contingent on', definition: 'Dependent on or conditioned by something; not certain until specified conditions are met.', example: 'The conclusion is contingent on the assumption that the sample is representative of the population — an assumption that requires further investigation.', collocations: ['contingent on', 'contingent upon verification', 'remains contingent on', 'the conclusion is contingent'] },
      { word: 'to the extent that', definition: 'Used to limit the scope of a claim; insofar as.', example: 'The results are robust, to the extent that the methodology permits any conclusion about robustness — a caveat that the authors themselves acknowledge.', collocations: ['to the extent that', 'insofar as', 'to the degree that', 'to the extent permitted by'] },
      { word: 'notwithstanding', definition: 'In spite of; nevertheless — often used to introduce a concession while maintaining the main argument.', example: 'Notwithstanding the limitations of the data, the overall pattern is consistent with the proposed model.', collocations: ['notwithstanding this', 'notwithstanding the limitations', 'notwithstanding the above', 'notwithstanding these concerns'] },
      { word: 'plausibly', definition: 'In a way that seems reasonable or probable; credibly.', example: 'The variation in outcomes could plausibly be explained by pre-existing differences in the sample rather than by the intervention itself.', collocations: ['could plausibly be attributed to', 'plausibly explained by', 'not implausibly', 'most plausibly'] },
      { word: 'on balance', definition: 'Taking everything into consideration; when all factors are weighed.', example: 'On balance, the evidence points toward a causal relationship, even if the mechanism is not yet fully understood.', collocations: ['on balance', 'on balance, the evidence suggests', 'taken on balance'] },
      { word: 'qualify', definition: 'To make (a statement or assertion) less absolute; to add reservations to.', example: 'This conclusion should be qualified: it applies only to the conditions under which the experiment was conducted, not to the broader population from which the sample was drawn.', collocations: ['qualify a conclusion', 'an important qualification', 'heavily qualified', 'qualified support for'] },
    ],
    dangerousConfusions: [
      { pair: ['purportedly', 'reportedly'], explanation: '"Reportedly" means according to reports — the information comes from somewhere, and you are passing it on without necessarily verifying it. "Purportedly" specifically signals doubt about the claim — you are saying "allegedly, but I question this." "Reportedly, the study found X" (you heard this, you are reporting it). "Purportedly effective, the drug has not been independently replicated" (the effectiveness claim is questionable). Purportedly is always slightly sceptical; reportedly is more neutral.' },
      { pair: ['notwithstanding', 'nevertheless'], explanation: 'Both signal continuation of an argument despite a concession. "Nevertheless" is adverbial and introduces the main clause after a concession: "The data are limited; nevertheless, the pattern is clear." "Notwithstanding" is prepositional or conjunctional and takes a noun phrase or clause: "Notwithstanding the data limitations, the pattern is clear." The difference is syntactic. "Notwithstanding" is more formal and more flexible in sentence position.' },
    ],
  }),

  // ─── READING-004: Dense policy analysis text ──────────────────────────────────
  createReadingLesson({
    ...common,
    id: 'C2-READING-004',
    order: 4,
    title: 'Reading: "The Limits of Evidence-Based Policy" — a critique of the evidence-based movement',
    objectives: [
      'Read a dense policy analysis text at C2 level and identify its central argument and rhetorical strategy.',
      'Evaluate the strength of the argument, including its implicit premises and unstated assumptions.',
      'Engage critically with a text that challenges a widely held policy consensus.',
      'Answer comprehension, inference, and critical evaluation questions at C2 level.',
    ],
    teacherOpening: 'This passage engages critically with the "evidence-based policy" movement — the claim that policy should be determined by rigorous empirical evidence, especially randomised controlled trials. The author is a sympathiser but a critical one. At C2, reading this text means reconstructing its argument, identifying its rhetorical strategy, and evaluating both independently.',
    passage: `The Limits of Evidence-Based Policy

The evidence-based policy movement has done real good. By insisting that interventions be evaluated against counterfactuals — that we ask not "did the programme have any effect?" but "did it have a greater effect than doing nothing, or than an alternative?" — it has corrected a genuine bias in policy-making toward programmes that feel effective rather than ones that are. The discipline of the randomised controlled trial has been salutary.

But the movement has also generated a characteristic pathology: the tendency to treat the measurability of outcomes as a criterion for the importance of outcomes. If you cannot randomise it and measure it, it becomes, within this framework, epistemically suspect. This leads, in practice, to a systematic bias in favour of interventions with measurable short-term outcomes over those with diffuse, long-term, or structural effects. Early childhood nutrition programmes generate measurable results within a funding cycle; changes to the incentive structures of financial institutions do not.

There is also a deeper problem with the evidential model. Randomised controlled trials establish causal relationships in the experimental conditions under which they were conducted. Generalising from those conditions to the messy, complex, heterogeneous environments in which policy actually operates is a fraught exercise — one that the evidence-based literature has sometimes been slow to acknowledge. An intervention that works in a particular cultural and institutional context may fail, or even cause harm, when transplanted. The external validity problem is not a technical correction to be made at the margins; it is a fundamental limitation on what trials can tell us.

None of this is an argument against evidence. It is an argument for a more sophisticated relationship to evidence: one that takes seriously the difference between what can be measured and what matters; that acknowledges the irreducibly interpretive dimension of applying evidence to complex social systems; and that resists the temptation to treat the absence of RCT evidence as equivalent to evidence of absence.`,
    wordCount: 330,
    tasks: [
      task(
        'What is the author\'s relationship to the evidence-based policy movement? How does the author signal this in the opening paragraph?',
        'Re-read paragraph 1. The author is not simply critical or simply supportive. How does the opening framing position the author?',
        'The author is a sympathiser and critical insider — not an opponent of the evidence-based movement. The opening paragraph explicitly acknowledges the movement\'s genuine contribution: it has corrected a real bias in favour of programmes that "feel effective" rather than ones that demonstrably are. The author establishes credibility with supporters of the movement before introducing the critique. This is a strategic choice: a critic who acknowledges genuine value is harder to dismiss than one who opposes it wholesale. The phrase "has done real good" is unhedged — a deliberate booster to signal genuine endorsement before the critique begins.'
      ),
      task(
        'What is the "characteristic pathology" the author identifies in paragraph 2? What specific bias does it produce, and what example is given?',
        'Re-read paragraph 2. The pathology concerns the relationship between measurability and importance. What follows from treating these as equivalent?',
        'The pathology is treating the measurability of outcomes as a criterion for their importance. This produces a systematic bias in favour of interventions with measurable short-term outcomes over those with diffuse, long-term, or structural effects. The example: early childhood nutrition programmes produce measurable results within a funding cycle; changes to the incentive structures of financial institutions do not. The implication is that evidence-based policy frameworks, as currently implemented, tend to select for interventions that fit the measurement instrument rather than for the most important interventions.'
      ),
      task(
        'What is the "external validity problem" described in paragraph 3? Why does the author say it is "fundamental" rather than "a technical correction at the margins"?',
        'Re-read paragraph 3. The distinction between internal and external validity is central to the argument.',
        'Internal validity (which RCTs establish well): the intervention caused the observed effect in this experimental context. External validity: the relationship holds when the intervention is applied in different contexts — different cultures, institutional environments, populations. The author argues that generalising from tightly controlled experimental conditions to complex, heterogeneous policy environments is "fraught" and that the evidence-based literature has been slow to acknowledge this. It is "fundamental" rather than marginal because the problem goes to the core of what trials can tell us about real-world policy implementation — not a fine-tuning issue but a deep epistemic limitation.'
      ),
      task(
        'What is the author\'s overall conclusion, and what three-part alternative framework do they propose in the final paragraph?',
        'Re-read the final paragraph. The author explicitly says "None of this is an argument against evidence." What is the positive alternative they are advocating?',
        'The author\'s conclusion: not opposition to evidence, but a more sophisticated relationship with it. The three-part alternative framework: (1) take seriously the difference between what can be measured and what matters — reject the equation of measurability with importance; (2) acknowledge the irreducibly interpretive dimension of applying evidence to complex social systems — evidence requires interpretation, not just application; (3) resist treating absence of RCT evidence as equivalent to evidence of absence — "we don\'t have an RCT" is not the same as "this doesn\'t work." The overall move is from "evidence-based policy" to "evidence-informed, critically aware policy."'
      ),
    ],
  }),

  // ─── LISTENING-004: Policy analysis podcast ──────────────────────────────────
  createListeningLesson({
    ...common,
    id: 'C2-LISTENING-004',
    order: 104,
    title: 'Listening: "The Data We Choose to See" — a policy analyst on measurement, politics, and the construction of evidence',
    objectives: [
      'Follow a sophisticated policy-focused interview at C2 level.',
      'Track an argument that develops through a series of specific examples rather than abstract claims.',
      'Understand how a speaker builds intellectual credibility through acknowledgement of complexity.',
      'Answer comprehension, inference, and critical evaluation questions at C2 level.',
    ],
    listeningPreparation: [
      task('Before listening: consider how evidence is used in political decision-making. Think about the difference between evidence informing policy and evidence determining policy, and why this distinction matters.', 'This frame helps you evaluate the speaker\'s examples and detect implicit assumptions about the relationship between knowledge and power.'),
      task('Prediction: predict one structural reason why robust evidence might fail to influence policy (e.g., political economy, institutional inertia) and one way the interpretation of evidence might be shaped by non-neutral factors (e.g., framing, metrics).', 'Listen for how the speaker moves between abstract principles and concrete policy examples.'),
      task('Key words to listen for: policy vocabulary (political economy, coalition, framing, institutional inertia, Goodhart\'s Law), register-management cues (that\'s not cynicism, the alternative to X is not Y), and epistemic stance markers (genuinely robust, not contested, the question is whether).', 'These signals help you track how the speaker builds credibility through acknowledgement of complexity rather than simplification.'),
    ],
    teacherOpening: 'This interview is with a senior policy analyst who advises governments on social policy. The conversation concerns how evidence is used in policy-making and the ways in which political and institutional pressures shape what counts as evidence. It is a real-world application of the themes in C2-READING-004. Listen for both the content and the register — the speaker is very sophisticated about navigating between academic rigour and the practical constraints of policy work.',
    transcript: [
      { speaker: 'Interviewer', text: 'You\'ve spent twenty years working at the interface between research evidence and government policy. What\'s the most important thing you\'ve learned about how policy is actually made?' },
      { speaker: 'Dr Patel', text: 'That evidence is never simply "applied" — it\'s always interpreted within a set of prior assumptions, institutional constraints, and political pressures. The best evidence in the world will not determine a policy outcome if the political conditions aren\'t aligned. That\'s not cynicism; it\'s just how democratic systems work. The question is whether you can make the interpretation and the prior assumptions more explicit, and better-founded, than they often are.' },
      { speaker: 'Interviewer', text: 'Can you give an example of a case where the evidence was clear but the political conditions prevented it from being acted on?' },
      { speaker: 'Dr Patel', text: 'Housing policy is the obvious one. We have robust evidence — genuinely robust — that increasing housing supply in high-demand urban areas reduces housing costs. This is not contested in the economics literature. But the political economy of housing supply is dominated by homeowners, who benefit from restricted supply, and by local planning authorities that respond to homeowner pressure. So you get a situation where the evidence points clearly in one direction, and policy moves in the other. The evidence doesn\'t determine the policy; it informs one actor in a political negotiation in which other actors are not primarily motivated by evidence.' },
      { speaker: 'Interviewer', text: 'That\'s frustrating. Is there anything that can be done?' },
      { speaker: 'Dr Patel', text: 'Yes, but it\'s slower work than researchers usually want. The evidence has to be accompanied by a political strategy — understanding who has the most to gain from a different policy, how to build a coalition, how to shift the terms of the debate. That\'s not the job researchers are trained for, and it makes many of them uncomfortable. But without it, you produce excellent reports that sit on shelves.' },
      { speaker: 'Interviewer', text: 'You mentioned that evidence is always interpreted. Can you say more about what shapes the interpretation?' },
      { speaker: 'Dr Patel', text: 'Three things, mainly. First, the framing — what counts as a problem in the first place. The same mortality rate can be framed as a "public health crisis" or as "broadly within historical norms," and the framing determines which evidence is sought and how it\'s weighted. Second, the metrics — what gets measured. Governments measure what they can measure, and policy eventually comes to be oriented around the measures rather than the underlying realities they were supposed to represent. This is Goodhart\'s Law: when a measure becomes a target, it ceases to be a good measure. Third, what I call "institutional inertia" — the tendency of existing programmes to generate their own evidence base, since the people who run a programme are usually the ones who evaluate it, and unconscious bias produces optimistic evaluations.' },
      { speaker: 'Interviewer', text: 'That sounds quite pessimistic. Is evidence in policy a lost cause?' },
      { speaker: 'Dr Patel', text: 'Absolutely not. The alternative to imperfect evidence is not good judgment — it\'s bad evidence, or no evidence, or pure ideology. The work is to improve the quality of the evidence, the rigor of the evaluation, and the sophistication of how evidence is interpreted and communicated. That\'s a programme that never ends, but it\'s worth doing.' },
    ],
    tasks: [
      task(
        'What is Dr Patel\'s key claim about the relationship between evidence and policy? How does she distinguish this claim from cynicism?',
        'Listen to turn 2. She makes a careful distinction. What is the difference between cynicism about evidence and her own position?',
        'Dr Patel\'s claim: evidence is never simply "applied" — it is always interpreted within prior assumptions, institutional constraints, and political pressures. Even the best evidence will not determine a policy outcome if the political conditions are not aligned. She distinguishes this from cynicism by framing it as simply how democratic systems work — not a corruption of the process, but a structural feature of it. The constructive implication she draws: the task is to make the interpretation and prior assumptions more explicit and better-founded, not to abandon evidence.'
      ),
      task(
        'In the housing policy example, what is the specific mechanism by which good evidence fails to produce good policy? Who are the actors and what motivates them?',
        'Listen to turn 4. The argument involves multiple actors with different motivations. Identify each.',
        'The mechanism: housing supply restrictions raise housing costs. The evidence that increasing supply reduces costs is robust and uncontested in economics. But the political actors dominant in housing policy are homeowners (who benefit from restricted supply as it increases asset values) and local planning authorities (who respond to homeowner pressure). The evidence informs one actor (potentially the government or reform advocates) in a multi-actor political negotiation in which other actors are primarily motivated by self-interest rather than evidence. The evidence doesn\'t determine policy; it informs one party to a political contest in which evidence is not the primary currency.'
      ),
      task(
        'What are the three factors Dr Patel identifies as shaping the interpretation of evidence? Summarise each in one sentence.',
        'Listen to turn 7. The three factors are explicitly named and explained.',
        '(1) Framing — what counts as a problem in the first place. The same mortality rate can be framed as crisis or normalcy; the framing determines which evidence is sought and how it is weighted. (2) Metrics — what gets measured. Governments measure what they can, and policy comes to be oriented around the measures rather than the underlying realities, generating Goodhart\'s Law effects (when a measure becomes a target, it ceases to be a good measure). (3) Institutional inertia — programmes generate their own evidence base because the people who run them also evaluate them, producing optimistic evaluations through unconscious bias.'
      ),
      task(
        'How does Dr Patel avoid a pessimistic conclusion in the final turn? What is the alternative to imperfect evidence that she implicitly rejects?',
        'Listen to turn 8. The argument is about the alternative to evidence, not the value of evidence per se.',
        'Dr Patel explicitly rejects pessimism: evidence in policy is not a lost cause. The key move is identifying the alternative: the alternative to imperfect evidence is not good judgment — it is bad evidence, no evidence, or pure ideology. This is an argument by elimination: since the alternatives are worse, improving the quality and sophistication of evidence use remains worthwhile even if it cannot be done perfectly. The programme is one of continuous improvement, not of achieving a perfect state.'
      ),
    ],
  }),

]);

export const C2_DEEP_NATIVE_PRODUCTION_PART1_BY_PILLAR = Object.freeze({
  grammar: Object.freeze([
    C2_DEEP_NATIVE_PRODUCTION_PART1.find(l => l.id === 'C2-GRAMMAR-007'),
    C2_DEEP_NATIVE_PRODUCTION_PART1.find(l => l.id === 'C2-GRAMMAR-008'),
  ]),
  vocabulary: Object.freeze([
    C2_DEEP_NATIVE_PRODUCTION_PART1.find(l => l.id === 'C2-VOCABULARY-007'),
    C2_DEEP_NATIVE_PRODUCTION_PART1.find(l => l.id === 'C2-VOCABULARY-008'),
  ]),
  reading: Object.freeze([
    C2_DEEP_NATIVE_PRODUCTION_PART1.find(l => l.id === 'C2-READING-004'),
  ]),
  listening: Object.freeze([
    C2_DEEP_NATIVE_PRODUCTION_PART1.find(l => l.id === 'C2-LISTENING-004'),
  ]),
  speaking: Object.freeze([]),
  writing: Object.freeze([]),
  checkpoint: Object.freeze([]),
});
