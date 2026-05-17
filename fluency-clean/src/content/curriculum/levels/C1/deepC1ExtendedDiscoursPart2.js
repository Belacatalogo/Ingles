import { createReadingLesson, createListeningLesson, createWritingLesson } from '../../../schemas/index.js';

const level = 'C1';
const status = 'ready';
const common = { level, status, estimatedMinutes: 70, tags: ['c1-3', 'extended-discourse', 'academic', 'deep-approved-target'] };

function task(instruction, note = '', expected = '') { return { instruction, note, expected }; }

export const C1_DEEP_EXTENDED_DISCOURSE_PART2 = Object.freeze([

  // ─── READING-003: The Rhetoric of Uncertainty ────────────────────────────────
  createReadingLesson({
    ...common,
    id: 'C1-READING-003',
    order: 3,
    title: 'Reading: "The Rhetoric of Uncertainty" — hedging, stance, and argument structure in academic prose',
    objectives: [
      'Identify hedging devices, stance markers, and discourse connectors in an extended academic text.',
      'Analyse how the author builds and qualifies a complex argument across multiple paragraphs.',
      'Infer the author\'s position from the distribution of hedging and boosting language.',
      'Answer inference, vocabulary-in-context, and critical evaluation questions at C1 level.',
    ],
    teacherOpening: 'This passage is written as a piece of academic argument that discusses — and simultaneously enacts — the features of sophisticated academic discourse. Read it at two levels: what it says, and how it says it. The how is the lesson.',
    passage: `The Rhetoric of Uncertainty: Hedging, Argument, and Intellectual Honesty in Academic Writing

Academic writing, it is commonly observed, hedges. Phrases such as "the evidence suggests," "it would appear that," and "one might reasonably conclude" pervade scholarly prose to an extent that can bewilder students trained in more assertive genres. What is less commonly observed is that this hedging is not a deficiency — not a failure of confidence or a symptom of institutional timidity — but a sophisticated rhetorical practice that is constitutive of the epistemic norms of scholarly argument. To understand why, it is necessary to examine what hedging actually does.

At the most basic level, hedging protects claims from over-extension. A claim made without qualification — "globalisation reduces poverty" — is refutable by a single counter-example. A claim made with appropriate hedging — "the available evidence suggests that, in the majority of documented cases, trade liberalisation has been associated with reductions in extreme poverty, though the distributional effects within countries have been considerably more mixed" — is not. It is not weaker for being hedged; it is more precise. The hedged claim specifies the evidence base, the conditions of application, and the limits of the generalisation. It is, in a certain sense, a stronger claim because it is a more honest one.

Notwithstanding this, hedging can be abused. The most common form of abuse is what might be called epistemic evasion: the deployment of hedging language not to calibrate a claim but to avoid committing to one. "It might perhaps be the case that in some circumstances there could be some effects" is not a hedged claim — it is an absence of a claim wearing hedging's clothing. The distinction between legitimate hedging and epistemic evasion lies in whether the hedge is doing work: whether it is specifying a condition of application, acknowledging an evidence limitation, or calibrating the degree of certainty. If it is doing none of these things, it is evasion.

A further dimension of hedging concerns attribution. Academic writing distinguishes carefully between claims that are the author's own inference ("I would contend that"), claims attributed to the field's consensus ("it is widely accepted that"), claims attributed to contested scholarship ("X argues that"), and claims attributed to views the author disputes ("X purports to demonstrate, though the methodology has been widely questioned"). These distinctions — encoded in the choice of reporting verb — constitute a running commentary on the epistemic status of every claim in the text. They are not decorative; they are load-bearing.

The implication for the student writer is straightforward, if demanding. Hedging must be calibrated to the actual epistemic situation: to the strength of the evidence, the degree of consensus in the field, and the scope of the claim being made. Used well, hedging is not a form of caution — it is a form of precision. Used poorly, it is a form of evasion that both misleads readers and undermines the writer's credibility. The rhetoric of uncertainty, properly understood, is a rhetoric of intellectual honesty.`,
    wordCount: 420,
    tasks: [
      task(
        'The author argues that hedging "is not a deficiency" but "constitutive of the epistemic norms of scholarly argument." What does "constitutive" mean here, and what is the author\'s main claim in paragraph 1?',
        'Re-read paragraph 1. "Constitutive" is a strong philosophical word — it means not merely related to but actually part of, or forming the basis of, something.',
        '"Constitutive" means that hedging does not merely accompany the epistemic norms of academic argument — it is part of what those norms are; it helps to constitute or define them. The author\'s main claim in paragraph 1 is that academic hedging is a sophisticated rhetorical practice, not a weakness or timidity, and that understanding why requires examining what hedging actually does.'
      ),
      task(
        'In paragraph 2, the author contrasts an unhedged claim with a hedged one. The author says the hedged claim is "stronger." What argument does the author give for this claim, and do you agree?',
        'Focus on the sentence "It is not weaker for being hedged; it is more precise." What does the author mean by saying a more precise claim is stronger?',
        'The author\'s argument is that an unhedged claim like "globalisation reduces poverty" is refutable by a single counter-example, while the hedged version specifies evidence base, conditions, and limits. Strength, in this account, is not about confident assertion but about precision and defensibility. A claim that accurately specifies what it covers and what it does not is stronger because it cannot be defeated by the cases it has explicitly excluded. Whether one agrees depends on one\'s view of what makes an argument "strong" — the author is implicitly adopting a Popperian-style view that falsifiability and precision are virtues.'
      ),
      task(
        'What is "epistemic evasion" as described in paragraph 3? Give the author\'s example and explain the distinction the author draws between legitimate hedging and epistemic evasion.',
        'Re-read paragraph 3. The distinction is about whether the hedge is "doing work." What kinds of work can a hedge do?',
        'Epistemic evasion is the use of hedging language not to calibrate a claim but to avoid committing to one — using hedges as a substitute for a claim rather than as a qualification of one. The author\'s example is: "It might perhaps be the case that in some circumstances there could be some effects." The distinction is that legitimate hedging specifies a condition of application, acknowledges an evidence limitation, or calibrates the degree of certainty. If a hedge is doing none of these — if it is just reducing commitment without adding precision — it is evasion.'
      ),
      task(
        'Paragraph 4 identifies four types of attribution (own inference, field consensus, contested scholarship, disputed view). What grammatical/lexical device encodes these distinctions, and why does the author call them "load-bearing"?',
        'The author identifies the specific device. What is it? What does "load-bearing" mean in this context?',
        'The device is the reporting verb (e.g., "I would contend," "it is widely accepted that," "X argues that," "X purports to demonstrate"). "Load-bearing" means these choices carry argumentative weight — they constitute a continuous running commentary on the epistemic status of every claim in the text. They are not merely stylistic choices; they communicate how certain, how attributed, and how contested each claim is, which affects how readers assess the argument.'
      ),
      task(
        'The final paragraph begins with "The implication for the student writer is straightforward, if demanding." What is the implication, and why does the author add the qualification "if demanding"?',
        'Identify the two-part instruction the author gives, and consider what is "demanding" about it.',
        'The implication is that hedging must be calibrated to the actual epistemic situation — to the strength of the evidence, the degree of field consensus, and the scope of the claim. "If demanding" acknowledges that this is not a simple rule to follow: it requires the writer to have accurate knowledge of what the evidence actually shows, what the field genuinely agrees on, and how broadly their claim actually applies. This calibration requires both linguistic skill and deep subject-matter knowledge, which is why it is demanding.'
      ),
      task(
        'Vocabulary in context: what does "pervade" mean in "phrases such as \'the evidence suggests\' pervade scholarly prose" (paragraph 1)? And what does "calibrate" mean in paragraphs 3 and 5?',
        'Think about both words in their context. "Pervade" relates to distribution/presence; "calibrate" relates to precision and adjustment.',
        '"Pervade" means to spread through or permeate thoroughly — hedging phrases are found throughout scholarly writing, in large numbers, not just occasionally. "Calibrate" means to adjust or set with precision — to match the degree of hedging exactly to the actual level of certainty or limitation, neither over-hedging (evasion) nor under-hedging (overclaiming).'
      ),
    ],
  }),

  // ─── LISTENING-003: Research Methods Seminar — Hedging in Oral Argument ───────
  createListeningLesson({
    ...common,
    id: 'C1-LISTENING-003',
    order: 103,
    title: 'Listening: "The Language of Evidence" — doctoral seminar on hedging and attribution in oral argument',
    objectives: [
      'Follow an extended academic seminar with complex turns and multiple positions.',
      'Identify how speakers hedge, attribute, and qualify claims in spontaneous spoken academic discourse.',
      'Distinguish between different speakers\' positions and the degree of certainty they express.',
      'Answer inference, summary, and speaker-intention questions at C1 level.',
    ],
    teacherOpening: 'This is a doctoral research seminar. Four speakers — supervisor Dr Larsson, and doctoral researchers Ana, Jerome, and Priya — are discussing the use of hedging language in their own fields. Listen not only for what they say but for how they say it: the hedges, the discourse markers, and the moments when speakers concede or push back.',
    transcript: [
      { speaker: 'Dr Larsson', text: 'I want to start with a provocation. In the social sciences, we hedge constantly — "the evidence suggests," "it would appear that," "one might conclude." But I sometimes wonder whether we\'ve turned hedging into a kind of defensive ritual that protects us from being wrong rather than making us more accurate. Is there a point at which hedging becomes a form of intellectual bad faith?' },
      { speaker: 'Ana', text: 'I think that\'s a real risk, but I\'d push back on framing it as bad faith. In my area — migration studies — the data is often contested and the causal chains are genuinely unclear. When I write "the evidence suggests that X may be associated with Y," I\'m not being evasive. I\'m being honest about what I can and can\'t establish from the data I have.' },
      { speaker: 'Jerome', text: 'I\'d agree with Ana on that. But I think there\'s a distinction worth making between hedging that is calibrated to the evidence and hedging that\'s become almost reflexive — a stylistic habit. I\'ve read papers where every single sentence is hedged, including claims that are genuinely well-established. At some point, over-hedging starts to look like either insecurity or a failure to engage with the literature seriously.' },
      { speaker: 'Priya', text: 'Or it looks like someone who hasn\'t made up their mind what their argument is. I\'ve had that problem in my own work, where I hedged so much that my supervisor couldn\'t identify my actual position. The feedback was: "What do you actually think?" And that was useful, because I realised I had been using hedges to avoid committing to claims I wasn\'t sure I could defend.' },
      { speaker: 'Dr Larsson', text: 'That\'s exactly the distinction I\'m trying to draw. There\'s hedging that is epistemically honest — it calibrates the claim to the evidence — and there\'s hedging that is epistemically cowardly — it protects the writer from being challenged. The first is a virtue; the second is the opposite.' },
      { speaker: 'Ana', text: 'I accept that distinction. But I want to add a third category: hedging that is institutionally required. In my field, certain journals have strong norms about causal language. If you write "X causes Y" without a randomised controlled trial, reviewers will send it back regardless of how strong the observational evidence is. So some hedging isn\'t about the writer\'s confidence at all — it\'s about conforming to disciplinary norms.' },
      { speaker: 'Jerome', text: 'That\'s a really important point. And it complicates the bad-faith framing, because the same sentence — "the evidence suggests" — can be honest calibration in one context and institutional conformity in another. You can\'t read the epistemic status of the claim off the surface grammar alone.' },
      { speaker: 'Priya', text: 'This connects to something I\'ve been thinking about, which is reporting verbs. When I write "X argues that," I\'m being neutral. When I write "X demonstrates that," I\'m endorsing the claim. When I write "X claims that," there\'s an implicit scepticism. Those distinctions are really doing a lot of argumentative work, and I\'m not sure students — or even some researchers — are always aware of how much.' },
      { speaker: 'Dr Larsson', text: 'That\'s a central point. The choice of reporting verb is the writer\'s most explicit way of positioning themselves in relation to the literature. And the inability to use those verbs precisely — always defaulting to "says" or "thinks" — is one of the clearest signals of writing that hasn\'t yet reached the level where the author is genuinely arguing, as opposed to summarising.' },
      { speaker: 'Ana', text: 'So the test for a piece of academic writing might be: if you removed all the hedges and attribution markers, would the argument collapse? If it would, the hedges were load-bearing. If it wouldn\'t — if the argument works exactly the same way without them — then they were probably decorative.' },
      { speaker: 'Dr Larsson', text: 'I like that test. Let\'s call it the removal test. And I think it applies to spoken academic argument as much as to written. The seminar presentations I find most persuasive are the ones where the hedging is doing visible, traceable work — not papering over uncertainty, but naming it and managing it.' },
    ],
    tasks: [
      task(
        'Dr Larsson opens with a "provocation." What is the provocative claim, and how do the other speakers respond to it in the first four turns?',
        'Summarise the provocation and the positions of Ana, Jerome, and Priya in relation to it.',
        'Dr Larsson\'s provocation is that hedging may have become a "defensive ritual" — a way of protecting oneself from being wrong rather than of making claims more accurate. Ana accepts the risk but pushes back: in her field, hedging reflects genuine evidential uncertainty, not evasion. Jerome accepts Ana\'s point but adds that hedging can also become a stylistic reflex, applied even to well-established claims. Priya adds a personal experience: she used hedging to avoid committing to claims she wasn\'t sure she could defend, and her supervisor\'s feedback exposed this.'
      ),
      task(
        'Ana introduces a "third category" in turn 6. What is it, and how does Jerome say it complicates the "bad-faith framing"?',
        'Listen carefully to turns 6 and 7. What is the third category? What does Jerome\'s response add?',
        'Ana\'s third category is institutionally required hedging — hedging that conforms to disciplinary journal norms rather than expressing the writer\'s own level of certainty. Jerome says this complicates the bad-faith framing because the same phrase ("the evidence suggests") can be epistemically honest in one context (calibrating a genuinely uncertain claim) and institutionally conformist in another (required by journal norms regardless of the evidence). You cannot, Jerome concludes, read the epistemic status of a claim from its surface grammar alone.'
      ),
      task(
        'Priya\'s contribution in turn 8 focuses on reporting verbs. What distinction does she make, and what does Dr Larsson say is the significance of this distinction for writing quality?',
        'Focus on turns 8 and 9. What is the difference between "X argues," "X demonstrates," and "X claims"? What does Dr Larsson say about writers who default to "says" or "thinks"?',
        'Priya distinguishes: "X argues that" = neutral attribution; "X demonstrates that" = endorsement; "X claims that" = implicit scepticism. Dr Larsson says that the choice of reporting verb is the most explicit way a writer positions themselves in relation to the literature. Writers who default to "says" or "thinks" — without making these distinctions — are producing writing that is summarising rather than arguing: they are reporting what others say without positioning themselves in relation to it.'
      ),
      task(
        'Ana proposes what Dr Larsson calls "the removal test." What is the test, and how does Dr Larsson extend it to spoken academic argument?',
        'Listen carefully to the last two turns. What is the test, and what does "load-bearing" mean here?',
        'The removal test is: if you removed all the hedges and attribution markers from a text, would the argument collapse? If yes, the hedges were "load-bearing" — they were doing genuine argumentative work (specifying conditions, calibrating certainty, attributing claims). If no, they were decorative. Dr Larsson extends this to spoken academic argument: the seminar presentations he finds most persuasive are those where the hedging is doing "visible, traceable work" — naming and managing uncertainty rather than concealing it.'
      ),
      task(
        'Which speaker do you find most persuasive in this seminar, and why? Identify at least one specific argument or distinction they make that you find compelling.',
        'You are being asked to take a critical position on the seminar discussion. Use the vocabulary and discourse tools from C1.3 in your answer.',
        'Open-ended. A strong answer would: name a specific speaker, identify a specific argument, explain why it is compelling (using "compelling," "well-supported," "the distinction between X and Y is useful because..."), and acknowledge at least one limitation or complexity in that argument.'
      ),
    ],
  }),

  // ─── WRITING-005: C1 essay introduction ──────────────────────────────────────
  createWritingLesson({
    ...common,
    id: 'C1-WRITING-005',
    order: 5,
    title: 'Writing: The C1 essay introduction — argument framing, scope, and thesis statement',
    objectives: [
      'Write a fully developed C1 essay introduction (150–180 words) that frames the argument, establishes scope, and states a clear thesis.',
      'Use hedging and stance markers appropriately in the introduction.',
      'Signal the essay\'s structure using academic signposting.',
      'Distinguish between a thesis statement and a topic sentence.',
    ],
    teacherOpening: 'The introduction is the contract between the writer and the reader. It tells the reader what question is being answered, what position the essay takes, and what the essay will do. At C1, this contract must be precise: the question must be framed accurately, the thesis must be arguable and specific, and the scope must be clearly delimited. A vague introduction produces a vague essay.',
    inputText: `C1 essay introduction structure:

1. FRAMING (2–3 sentences): Introduce the topic and the question it raises. Do not start with "Since the dawn of time..." or "In today's world..." Start with the issue itself, framed precisely.

2. CONTEXTUALISATION (1–2 sentences): Briefly indicate why the question is significant or contested. What is at stake? What makes it non-trivial?

3. THESIS STATEMENT (1–2 sentences): State the essay's position clearly and specifically. Use an appropriate hedging level — confident but not overconfident. The thesis should be arguable (not a fact) and specific (not "this is a complex issue").

4. SCOPE/SIGNPOST (1–2 sentences): Indicate what the essay will and will not cover. This manages reader expectations and demonstrates that you have made deliberate choices about focus.

Example of a weak introduction:
"Climate change is a very important issue today. Many scientists have studied it. Some people think we should do something about it and others disagree. This essay will discuss both sides."

Example of a strong C1 introduction:
"The question of how far economic instruments — carbon pricing, green bonds, tradeable emission permits — can substitute for regulatory mandates in managing the transition to a low-carbon economy has become a central fault line in contemporary climate policy. Its significance lies not in the abstract but in the practical: the choice between these approaches has direct implications for who bears the costs of the transition and who captures the benefits. This essay argues that market-based instruments are necessary but not sufficient — that without a robust regulatory floor, they systematically favour firms with the greatest capacity to absorb adjustment costs, thereby widening, rather than narrowing, distributional inequality. The analysis focuses on the European experience, and does not address the distinct challenges facing lower-income economies, which raise separate questions of international equity."`,
    writingTask: 'Write a C1 essay introduction (150–180 words) for ONE of the following questions: (a) "To what extent has globalisation undermined the capacity of nation-states to govern their own economies?" (b) "Should access to higher education be considered a right or a privilege?" (c) "Is the \'digital economy\' a genuinely new economic paradigm, or a continuation of existing capitalist structures?" Your introduction must follow the four-part structure above and include at least one hedging device in the thesis statement.',
    wordTarget: 165,
    tasks: [
      task(
        'Write the framing sentences first (2–3 sentences). Do not start with "X is a very important issue." Start with the specific tension, question, or development that the essay addresses.',
        'Ask yourself: what is the specific point of disagreement or uncertainty that makes this question worth asking? Start there.',
        'Example (for question a): "The relationship between globalisation and state capacity has been one of the most contested questions in political economy over the past three decades. On one account, the liberalisation of capital flows, supply chains, and labour markets has fundamentally eroded the policy space available to national governments. On another, states have retained — and in some respects strengthened — their regulatory and fiscal authority in response to the pressures globalisation generates."'
      ),
      task(
        'Write the contextualisation sentence(s). What is at stake in this question? Why does it matter who is right?',
        'Think about: what decisions or policies depend on the answer to this question? Who is affected?',
        'Example: "The answer matters because it shapes the available repertoire of policy responses: if state capacity has been structurally eroded, domestic regulatory solutions are insufficient, and the case for multilateral or supranational governance becomes stronger; if it has not, the failure of national policy instruments reflects political choices rather than structural constraint."'
      ),
      task(
        'Write the thesis statement. It must be specific and arguable. Use a hedging device that calibrates your confidence appropriately.',
        'Avoid: "This essay will show that globalisation is complex." Include: a specific claim about the direction and limits of the argument.',
        'Example: "This essay argues that the evidence supports a partial erosion thesis: that globalisation has substantially constrained fiscal and monetary policy space, particularly in smaller open economies, while leaving regulatory capacity broadly intact — a distinction that much of the existing literature has insufficiently drawn."'
      ),
      task(
        'Write the scope/signpost sentences. Specify what the essay covers and what it explicitly does not cover.',
        'Scope sentences demonstrate that you have chosen your focus deliberately. They prevent the reader from expecting something you are not going to deliver.',
        'Example: "The analysis focuses on OECD member states and draws primarily on evidence from the post-2008 period. The distinct challenges facing emerging market economies, where the constraints of globalisation interact with weaker institutional capacity, are acknowledged but not addressed in detail here."'
      ),
      task(
        'Review your complete introduction. Check: Is the framing specific and precise? Does the contextualisation explain why the question matters? Is the thesis arguable (not a fact, not "there are two sides")? Is the hedging calibrated — confident but not overconfident? Is the scope explicitly delimited?',
        'Count the words. Are you between 150 and 180? Read the introduction aloud: does it sound like an argument, or like a description?',
        'Checklist: Specific framing ✓ | Stakes/significance explained ✓ | Arguable, hedged thesis ✓ | Scope delimited ✓ | 150–180 words ✓'
      ),
    ],
  }),

  // ─── WRITING-006: C1 essay conclusion ────────────────────────────────────────
  createWritingLesson({
    ...common,
    id: 'C1-WRITING-006',
    order: 6,
    title: 'Writing: The C1 essay conclusion — synthesis, implications, and the limits of the argument',
    objectives: [
      'Write a C1 essay conclusion (150–180 words) that synthesises the argument, acknowledges its limits, and identifies implications.',
      'Distinguish between a conclusion that summarises and one that synthesises.',
      'Use discourse vocabulary (contend, premise, implication, caveat) in the conclusion.',
      'End with a sentence that gestures toward significance without overreaching.',
    ],
    teacherOpening: 'A summary conclusion says "In this essay I have argued X, Y, and Z." A synthesis conclusion says "The argument as a whole reveals something about the underlying question that the separate points, taken individually, do not." C1 conclusions synthesise. They also acknowledge limits (what the argument does not establish) and identify implications (what follows if the argument is correct). A conclusion that merely summarises is a wasted opportunity.',
    inputText: `C1 essay conclusion structure:

1. RESTATEMENT OF THESIS (1–2 sentences): Restate the essay's main argument — not in the same words as the introduction, but with the benefit of the analysis carried out. The restatement should be more precise than the original thesis.

2. SYNTHESIS (2–3 sentences): What does the argument as a whole reveal? What is the relationship between the different points made? A synthesis is not a list of points; it is a claim about what those points, taken together, show.

3. ACKNOWLEDGED LIMITS (1–2 sentences): Specify what the argument does not establish, or what questions remain open. This is not weakness — it is precision. A claim that knows its limits is more credible than one that pretends to have established everything.

4. IMPLICATIONS (1–2 sentences): What follows if the argument is correct? What should be done, or thought differently, or investigated further?

Example of a weak conclusion:
"In conclusion, this essay has discussed the pros and cons of globalisation. It has shown that there are many effects. This is a complex issue and more research is needed."

Example of a strong C1 conclusion:
"This essay has argued that market-based climate instruments are necessary but not, by themselves, sufficient to drive an equitable low-carbon transition. Taken together, the analysis suggests that the distributional failures documented across European carbon trading schemes are not incidental — they are structural features of market mechanisms applied to problems characterised by asymmetric adjustment costs. This finding does not undermine the case for carbon pricing; it specifies the conditions under which carbon pricing can work equitably: namely, in combination with redistributive fiscal measures and a regulatory floor below which market solutions cannot substitute. The analysis is restricted to OECD contexts; whether the conclusions hold in lower-income economies with weaker institutional capacity remains an open and pressing question."`,
    writingTask: 'Write a C1 conclusion (150–180 words) for the same essay question you used in the Writing-005 introduction task. Your conclusion must follow the four-part structure and include at least two words from the C1.3 vocabulary lessons (premise / implication / caveat / contend / untenable / notwithstanding / corroborate / ostensibly / lend weight to).',
    wordTarget: 165,
    tasks: [
      task(
        'Write the restatement of thesis (1–2 sentences). Use different words from your introduction. The restatement should be more precise — you have now carried out the analysis, so you can state the conclusion more specifically.',
        'Compare with your introduction thesis. Can you be more specific now? Can you name the condition, the mechanism, or the limit that the analysis has established?',
        'Example: "This essay has argued that globalisation has produced a partial but structurally significant erosion of fiscal policy space in smaller open economies, while leaving regulatory capacity — contrary to the stronger versions of the convergence thesis — largely intact."'
      ),
      task(
        'Write the synthesis (2–3 sentences). What do the separate points of the argument show, taken together? The synthesis should name a pattern, a mechanism, or a relationship that was not visible in the introduction.',
        'Ask yourself: what is the underlying insight that all three (or two) body paragraphs are pointing toward? Express it directly.',
        'Example: "Taken together, these findings suggest that the dominant framing of the globalisation debate — as a binary between state retreat and state resilience — obscures a more nuanced picture in which different dimensions of state capacity have been affected differently. The implication is that neither the pessimists nor the optimists in this debate have correctly identified the mechanism; both have overstated their case by treating state capacity as a unitary variable."'
      ),
      task(
        'Write the acknowledged limits (1–2 sentences). Specify what the argument does not establish, or what it has not addressed.',
        'Use "with the caveat that" / "it should be noted that" / "notwithstanding" / "this argument does not address." Be specific — name a particular limitation.',
        'Example: "Notwithstanding the strength of the evidence reviewed here, the analysis does not establish whether the patterns observed are permanent features of the globalised economy or transitional adjustments that may be reversed as international regulatory frameworks develop."'
      ),
      task(
        'Write the implications sentence(s). What follows from the argument? What should change — in policy, in research, in how we think about the issue?',
        'Use "the implication is that" / "this suggests that" / "if this argument is correct, then." Avoid hollow calls to "do more research" — be specific about what and why.',
        'Example: "If the argument advanced here is correct, the policy priority should not be resisting globalisation but redesigning the domestic distributional mechanisms through which the gains and losses of trade liberalisation are allocated — a task that lies well within the regulatory capacity that states have retained."'
      ),
      task(
        'Review the complete conclusion. Check: Does the restatement advance beyond the introduction thesis? Does the synthesis make a new claim (not just list body paragraph points)? Are the limits specific? Is the implication concrete? Are 150–180 words maintained?',
        'Read introduction and conclusion together. Does the conclusion feel like the earned end of an argument, or just a summary?',
        'Checklist: Restatement more precise than introduction thesis ✓ | Synthesis names a new claim/insight ✓ | Limits specific and named ✓ | Implication concrete ✓ | C1.3 vocabulary used ✓ | 150–180 words ✓'
      ),
    ],
  }),

]);

export const C1_DEEP_EXTENDED_DISCOURSE_PART2_BY_PILLAR = Object.freeze({
  grammar: Object.freeze([]),
  vocabulary: Object.freeze([]),
  reading: Object.freeze(C1_DEEP_EXTENDED_DISCOURSE_PART2.filter(l => l.pillar === 'reading')),
  listening: Object.freeze(C1_DEEP_EXTENDED_DISCOURSE_PART2.filter(l => l.pillar === 'listening')),
  speaking: Object.freeze([]),
  writing: Object.freeze(C1_DEEP_EXTENDED_DISCOURSE_PART2.filter(l => l.pillar === 'writing')),
  checkpoint: Object.freeze([]),
});
