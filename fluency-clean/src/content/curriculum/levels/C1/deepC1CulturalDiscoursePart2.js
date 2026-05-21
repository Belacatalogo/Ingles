import { createSpeakingLesson, createWritingLesson } from '../../../schemas/index.js';

const level = 'C1';
const status = 'ready';
const common = { level, status, estimatedMinutes: 70, tags: ['c1-7', 'cultural-discourse', 'intellectual', 'philosophy', 'deep-approved-target'] };

function task(instruction, note = '', expected = '') { return { instruction, note, expected }; }

export const C1_DEEP_CULTURAL_DISCOURSE_PART2 = Object.freeze([

  // ─── SPEAKING-007: Intellectual debate ───────────────────────────────────────
  createSpeakingLesson({
    ...common,
    id: 'C1-SPEAKING-007',
    order: 7,
    title: 'Speaking: The intellectual debate — taking and defending a position on a cultural or philosophical question',
    objectives: [
      'Articulate and defend a position on a contested cultural or philosophical question.',
      'Use the vocabulary of intellectual discourse fluently in speech (axiom, paradigm, contingent, normative, etc.).',
      'Perform the concession-rebuttal move confidently under real-time pressure.',
      'Engage with an interlocutor\'s position precisely and fairly.',
    ],
    teacherOpening: 'Intellectual discourse is not just about having ideas — it is about the ability to express, develop, and defend them in conversation. This lesson practises the spoken version of academic argument: clear position-taking, precise use of vocabulary, genuine engagement with opposing views, and the ability to think on your feet. The goal is not to win but to demonstrate rigorous, good-faith engagement.',
    prompt: 'Choose ONE of the following positions to defend in an 8–10 minute discussion with your teacher:\n\n(A) "The distinction between high and popular culture was always a class marker rather than an aesthetic judgment."\n(B) "Authenticity, as a cultural value, has been so thoroughly commodified that it has ceased to be meaningful."\n(C) "Democratic societies need shared cultural reference points — but the question of who defines the shared culture is always a political question."\n\nYour teacher will defend a different position or challenge yours.',
    pronunciationFocus: {
      title: 'Pronunciation & shadowing',
      tips: [
        'Shadow: "The distinction between high and popular culture was always a class marker rather than an aesthetic judgment." — stress CLASS, MARK-er, and aesTHETic. Practise "rather than" as a quick linking phrase.',
        '"Authenticity, as a cultural value, has been so thoroughly commodified that..." — stress auTHENticity and comMODified. Practise embedding "as a cultural value" with brief pauses.',
        '"The question of who defines the shared culture is always a political question." — stress DEFINES and poLITical. Use falling intonation on the final "question" to close the claim.',
        '"I would take issue with the premise that..." — stress PREMise. Practise this intellectual challenge phrase with confident but non-aggressive intonation.',
      ],
    },
    tasks: [
      task(
        'State your position clearly at the outset, in 2–3 sentences. Explain what you mean by the key terms you are using.',
        'Avoid vague openings. Define your terms: if you use "authenticity," "class marker," or "shared culture," explain what you mean by them before you argue with them.',
        'Evaluate: Is the position specific enough to be debated? Are the key terms defined? Is the register consistently formal without being stilted?'
      ),
      task(
        'Develop your position using at least two distinct lines of argument. For each, state the claim and provide evidence or an example.',
        'Lines of argument should be distinct — different reasons for the same conclusion, not the same reason stated twice. Connect each back to your thesis explicitly.',
        'Evaluate: Are the two lines of argument genuinely distinct? Is the evidence specific (historical example, concrete case) rather than general assertion? Is the connection between evidence and thesis explicit?'
      ),
      task(
        'When your teacher challenges your position, engage with the challenge precisely. Identify what the challenge is claiming and respond to its strongest version.',
        'Do not deflect by restating your own position. Engage with the substance of the challenge. It is legitimate to concede a point partially while maintaining the core thesis.',
        'Evaluate: Does the student identify the precise content of the challenge? Do they engage the strongest version of it? Do they concede where appropriate? Do they maintain the thesis where appropriate?'
      ),
      task(
        'Use at least four vocabulary words from C1-VOCABULARY-012 or C1-VOCABULARY-013 in the course of the discussion. Use them accurately in context.',
        'Words should emerge naturally from the argument, not be inserted artificially. If you use "normative," use it correctly (about standards/values, not about what is typical).',
        'Evaluate: Are the vocabulary words used accurately and in appropriate context? Do they strengthen the argument or merely decorate it?'
      ),
      task(
        'Close the discussion with a synthesis: what has emerged from the exchange? What do you maintain and what, if anything, have you revised?',
        'A good intellectual discussion should leave both participants with a clearer view than when they started — even if neither has "won." The closing should reflect genuine engagement, not a restatement of the opening position.',
        'Evaluate: Does the closing reflect what actually happened in the discussion? Does it acknowledge any genuine movement in the student\'s position? Is it intellectually honest?'
      ),
    ],
  }),

  // ─── WRITING-014: Cultural commentary ────────────────────────────────────────
  createWritingLesson({
    ...common,
    id: 'C1-WRITING-014',
    order: 14,
    title: 'Writing: The cultural commentary — analysing a contemporary phenomenon with intellectual depth',
    objectives: [
      'Write a sustained cultural commentary (300–350 words) on a contemporary phenomenon.',
      'Use abstract vocabulary and intellectual framing while keeping argument grounded in concrete examples.',
      'Deploy irony, juxtaposition, and other rhetorical devices in formal analytical prose.',
      'Distinguish between description, analysis, and evaluation in cultural writing.',
    ],
    teacherOpening: 'Cultural commentary is a genre that sits between journalism and academic writing: it engages with specific contemporary phenomena but analyses them with conceptual rigour. The best cultural commentary moves fluidly between the concrete and the abstract, using individual examples to illuminate broad patterns. Think of the passage "The Spectacle of Authenticity" as a model.',
    inputText: `Cultural commentary structure:

HOOK (1–2 sentences): Begin with a specific, concrete observation — an image, a trend, a paradox. This should be vivid and particular, not a general statement.

ANALYTICAL FRAME (2–3 sentences): Name the broader phenomenon your specific example illustrates. Introduce the conceptual vocabulary you will use to analyse it.

DEVELOPMENT (4–5 sentences): Develop the analysis. Move between the specific and the abstract. Introduce further examples if they add to the argument rather than repeating it. Use at least one rhetorical move: juxtaposition, irony, concession, or a "what appears to be X is actually Y" reversal.

IMPLICATION / QUESTION (2–3 sentences): What does the analysis suggest? What question does it open up that cannot be simply answered? Cultural commentary earns its weight by raising questions that illuminate rather than by providing easy answers.

Topic options (choose ONE):
(A) The phenomenon of "digital detoxes" — brief periods without social media, marketed as wellness practices.
(B) The rise of "slow" culture — slow food, slow travel, slow fashion — as a response to the acceleration of modern life.
(C) The simultaneous celebration and commodification of "local" and "independent" culture in cities undergoing gentrification.`,
    writingTask: 'Write a cultural commentary (300–350 words) on your chosen topic. Your commentary must: begin with a specific concrete example or image; name and frame the broader phenomenon; use at least one of the vocabulary words from C1-VOCABULARY-012 or C1-VOCABULARY-013; employ at least one rhetorical move (irony, juxtaposition, reversal, concession); and end with a question or implication that opens rather than closes the analysis.',
    wordTarget: 325,
    tasks: [
      task(
        'Write your hook: one or two sentences that begin with something specific, vivid, and concrete. Avoid abstract openings ("In today\'s society…").',
        'The hook should make the reader want to read on. It can be a paradox, an arresting image, or a surprising juxtaposition. The best hooks contain the seed of the analysis in compressed form.',
        'Example (Topic A): "The digital detox retreat costs £800 for the weekend and requires advance booking through a website. The irony appears to have escaped its organisers."'
      ),
      task(
        'Write your analytical frame. Name the broader phenomenon and introduce the conceptual vocabulary that will organise your analysis.',
        'This transition from the specific to the abstract should feel natural. You are explaining what your hook is an example of. Use your vocabulary: normative, hegemony, contingent, spectacle, commodification, axiom, paradigm.',
        'Example: "This is the central paradox of the contemporary wellness industry: it offers, as a consumer product, an escape from the consumer logic that produces the condition it promises to remedy. The commodification of non-commodified experience is not incidental to the product; it is the product."'
      ),
      task(
        'Write your development section. Move between specific and abstract. Use at least one rhetorical move: irony, juxtaposition, reversal ("what appears to be X is actually Y"), or concession.',
        'Juxtaposition: place two contrasting examples side by side to create argumentative force through contrast. Reversal: a "what seems like X is really Y" move that reframes what the reader thought they understood. Irony: note the gap between what something claims to be and what it is.',
        'Evaluate: does the analysis advance beyond the hook? Are specific examples used to illuminate abstract claims, or merely listed? Is the rhetorical move identified and executed clearly?'
      ),
      task(
        'Write your closing implication or question. This should be open-ended: it raises something that the analysis illuminates but does not resolve.',
        'Avoid false resolutions ("In conclusion, we need to find a balance"). The best cultural commentary ends with a question that is better than the question with which it began — more precise, more uncomfortable, more illuminating.',
        'Example: "The question is not whether the digital detox is effective as a wellness practice — for some, it may well be. The question is what it means that our primary mechanism for recovering from the effects of digital capitalism is to purchase a break from it. What would a non-commodified form of rest even look like? And would we recognise it if we encountered it?"'
      ),
    ],
  }),

  // ─── WRITING-015: Philosophical argument paragraph ────────────────────────────
  createWritingLesson({
    ...common,
    id: 'C1-WRITING-015',
    order: 15,
    title: 'Writing: The philosophical argument — precision, abstraction, and intellectual rigour in formal writing',
    objectives: [
      'Write a precise philosophical argument paragraph (250–300 words) on an abstract topic.',
      'Use the subjunctive, counter-factual structures, and discourse markers fluently.',
      'Maintain the distinction between descriptive and normative claims throughout.',
      'Apply the vocabulary of intellectual discourse with accuracy and precision.',
    ],
    teacherOpening: 'Philosophical writing requires a specific combination of qualities: precision (every claim means exactly what it says), abstraction (moving beyond individual cases to general principles), and intellectual honesty (acknowledging what follows from your premises, even when inconvenient). This lesson practises the philosophical paragraph — a unit of argument that does all three things simultaneously.',
    inputText: `What makes a philosophical argument paragraph different from other analytical writing?

1. PRECISION: Every term is used with a specific, consistent meaning. If you use "authentic," you have defined it. If you use "normative," you mean what philosophers mean by it (about values and standards), not "normal."

2. LOGICAL STRUCTURE: The paragraph moves from premises to conclusion through clearly marked inferential steps. The logical relationship between claims is made explicit.

3. COUNTER-FACTUAL AWARENESS: Philosophical writing acknowledges what would have to be true for the argument to fail. This is not weakness — it is intellectual rigour.

4. NORMATIVE CLARITY: The paragraph distinguishes between describing how things are and arguing for how they should be. Mixing these without marking the shift is a philosophical error.

5. HEDGING: Claims are made with appropriate epistemic modesty. "This suggests that" is more intellectually honest than "This proves that" in most philosophical contexts.

Prompt: Write a philosophical argument paragraph (250–300 words) defending or challenging ONE of the following claims:
(A) "A belief can be justified even if it turns out to be false."
(B) "The fact that a value is widely shared does not make it correct."
(C) "Free will and moral responsibility are compatible, even if human behaviour is causally determined."`,
    writingTask: 'Write a philosophical argument paragraph (250–300 words) on your chosen prompt. Your paragraph must: define any key terms you use; move from premises to conclusion through marked inferential steps; acknowledge at least one potential objection and respond to it; maintain the distinction between descriptive and normative claims; and use at least one counter-factual or subjunctive structure.',
    wordTarget: 275,
    tasks: [
      task(
        'Open by defining the key terms of your chosen claim. Before you argue, clarify what you mean by the central concept(s).',
        'If you choose (A), define "justified" and "false" as you will use them. If (B), define "widely shared" and "correct." If (C), define "free will," "moral responsibility," and "causal determination" — even briefly. Undefined terms lead to arguments at cross-purposes.',
        'Example (Claim A): "By \'justified\' I mean epistemically warranted — supported by the evidence available to the believer at the time of forming the belief. By \'false\' I mean not corresponding to the actual state of affairs. The claim is that these two properties are logically independent of one another."'
      ),
      task(
        'State your main premise and develop the argument toward a conclusion. Use explicit inferential markers: "It follows that… / This entails that… / If this is correct, then… / One can therefore conclude…"',
        'Make the logical structure visible. Do not assume the reader will make the inferential steps themselves — mark each step explicitly. This is what distinguishes philosophical writing from rhetorical writing.',
        'Evaluate: Is each inferential step marked? Is the conclusion actually supported by the premises, or is there a gap? Is the argument valid even if one doubts one of the premises?'
      ),
      task(
        'Introduce and respond to the strongest objection to your argument. Use a counter-factual or subjunctive structure in the response.',
        'The objection should be stated fairly — do not attack a weakened version of the opposing view. The response should engage the substance of the objection using a subjunctive or counter-factual structure: "Were this objection to hold, it would follow that… However…"',
        'Evaluate: Is the objection the strongest available, or a convenient weak version? Does the response engage the substance rather than deflecting? Is the subjunctive/counter-factual structure used correctly?'
      ),
      task(
        'Close by marking the epistemic status of your conclusion. What have you established? What remains open? What would it take to disprove your conclusion?',
        'Philosophical conclusions are rarely final. "This suggests that… / It remains open whether… / The argument here does not establish X, but it does establish Y." Precision about what you have and have not shown is a mark of philosophical maturity.',
        'Evaluate: Is the conclusion appropriately hedged — neither overclaiming nor underclaiming? Does the paragraph acknowledge what would have to be true for the argument to fail? Is the epistemic status of the conclusion clearly marked?'
      ),
    ],
  }),

]);

export const C1_DEEP_CULTURAL_DISCOURSE_PART2_BY_PILLAR = Object.freeze({
  grammar: Object.freeze([]),
  vocabulary: Object.freeze([]),
  reading: Object.freeze([]),
  listening: Object.freeze([]),
  speaking: Object.freeze([
    C1_DEEP_CULTURAL_DISCOURSE_PART2.find(l => l.id === 'C1-SPEAKING-007'),
  ]),
  writing: Object.freeze([
    C1_DEEP_CULTURAL_DISCOURSE_PART2.find(l => l.id === 'C1-WRITING-014'),
    C1_DEEP_CULTURAL_DISCOURSE_PART2.find(l => l.id === 'C1-WRITING-015'),
  ]),
  checkpoint: Object.freeze([]),
});
