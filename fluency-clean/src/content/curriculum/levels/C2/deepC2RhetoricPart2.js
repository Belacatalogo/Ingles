import { createSpeakingLesson, createWritingLesson } from '../../../schemas/index.js';

const level = 'C2';
const status = 'ready';
const common = { level, status, estimatedMinutes: 75, tags: ['c2-2', 'rhetoric', 'register', 'style', 'deep-approved-target'] };

function task(instruction, note = '', expected = '') { return { instruction, note, expected }; }

export const C2_DEEP_RHETORIC_PART2 = Object.freeze([

  // ─── SPEAKING-002: Formal academic presentation ───────────────────────────────
  createSpeakingLesson({
    ...common,
    id: 'C2-SPEAKING-002',
    order: 2,
    title: 'Speaking: The formal academic presentation — structure, delivery, and Q&A at C2',
    objectives: [
      'Deliver a structured academic presentation at C2 level (10–12 minutes).',
      'Manage the information structure of a spoken argument for maximum clarity and impact.',
      'Deploy fronting, cleft sentences, and stance markers fluently in prepared spoken discourse.',
      'Handle a Q&A session at C2 level — engaging challenging questions with precision and intellectual honesty.',
    ],
    teacherOpening: 'The academic presentation is a distinctive genre: more structured than a seminar discussion, more interactive than a written essay. At C2, the expectation is not just correct content but mastery of the genre — a clear opening that orients the audience, a body that moves through an argument rather than delivering information, and a Q&A that engages rather than deflects. The grammar and vocabulary of this course should now be appearing naturally, not inserted.',
    prompt: 'Prepare and deliver a 10–12 minute presentation on ONE of the following:\n\n(A) Critically evaluate Popper\'s "paradox of tolerance" argument. Does it succeed on its own terms? Does its popular application faithfully reflect the original argument?\n(B) What is the relationship between language and register, and why does register matter for intellectual credibility? Use examples from your own language learning.\n(C) Evaluate the claim from C2-READING-001 that the novel performs a unique cognitive function. Is this claim well-founded? What would it take to confirm or disconfirm it?',
    pronunciationFocus: {
      title: 'Pronunciation & shadowing',
      tips: [
        'Shadow: "What Popper\'s paradox reveals is not a logical contradiction but a political dilemma." — stress PARAdox, reLOGical, and diLEMma. Practise the "not X but Y" contrast with clear intonation shift.',
        '"The popular application of this argument does not faithfully reflect the original." — stress FAITHfully and oRIGinal. Practise the adverb + verb collocation as a single unit.',
        '"I want to begin by distinguishing between the strong and weak versions of this claim." — stress disTINguishing, STRONG, and WEAK. Pause after "between" to frame the contrast.',
        '"Let me now address the question that I anticipate is most likely to be raised." — stress ANticipate and RAISED. Practise the self-aware signposting of a C2 presentation.',
      ],
    },
    tasks: [
      task(
        'Open your presentation with a hook and a signpost. The hook should make the audience want to listen; the signpost should tell them clearly what you will argue and how you will structure the argument.',
        'Academic presentations should not begin with "Today I will talk about X." They should begin with something that makes the question feel urgent or interesting, then give a clear preview of the argument. The opening should orient the audience, not just announce the topic.',
        'Evaluate: Does the hook create genuine engagement — is there a specific question, paradox, or problem that makes the listener want to follow? Is the signpost specific enough that the audience knows what they are about to hear?'
      ),
      task(
        'Develop your argument through 3–4 clearly signposted points. For each point, state the claim, support it with evidence or reasoning, and connect it back to the central argument.',
        'Signal transitions explicitly and in advance: "I\'ll now turn to the second point, which concerns…" "Having established X, I want to argue that Y follows from it." At C2, the audience should never be uncertain where they are in the argument.',
        'Evaluate: Are the points distinct and logically sequential? Does each point advance the argument rather than merely add to it? Are the transitions explicit and informative?'
      ),
      task(
        'Anticipate and address the most serious objection to your argument within the presentation — before the Q&A.',
        'Addressing objections in the body of a presentation (rather than waiting to be challenged) demonstrates intellectual confidence and rigour. State the objection fairly, then respond to it. This is the spoken version of the counter-argument paragraph.',
        'Evaluate: Is the objection the strongest available — or a convenient weak version? Does the response engage the substance? Does it maintain the argument rather than abandoning it?'
      ),
      task(
        'Manage the Q&A at C2 level. When a question is complex, paraphrase it before answering. When you are uncertain, say so. When a question challenges a central claim, engage the challenge directly rather than deflecting.',
        'Paraphrasing before answering serves two functions: it confirms you have understood the question correctly, and it gives you time to think. "If I understand your question correctly, you are asking whether…" is a legitimate C2 strategy, not a evasion.',
        'Evaluate: Does the student listen to the full question before responding? Do they engage the substance of challenges? Is the register consistent throughout the Q&A as well as the presentation? Do they distinguish between what they know and what they are uncertain about?'
      ),
    ],
    speakingChecklist: [
      'Opening hook created genuine engagement — not just "Today I will talk about...".',
      'Argument developed through 3–4 clearly signposted, logically sequential points.',
      'Counter-argument addressed within the presentation, not deferred to Q&A.',
      'Fronting, cleft sentences, and stance markers deployed fluently.',
      'Q&A responses engaged challenges directly — paraphrased before answering where appropriate.',
      'Distinction made between what is known and what is genuinely uncertain.',
      'C2 register maintained seamlessly across both presentation and Q&A.',
    ],
  }),

  // ─── WRITING-003: The op-ed / intellectual essay ──────────────────────────────
  createWritingLesson({
    ...common,
    id: 'C2-WRITING-003',
    order: 3,
    title: 'Writing: The intellectual op-ed — argument for a general educated audience at C2',
    objectives: [
      'Write a persuasive intellectual essay (400–450 words) for a general educated audience.',
      'Balance academic rigour with accessibility — argue with precision without jargon.',
      'Deploy rhetorical moves (fronting, concession, irony, analogy) in persuasive prose.',
      'Distinguish between writing for specialists and writing for an educated general audience.',
    ],
    teacherOpening: 'The intellectual op-ed is distinct from the academic essay: it aims to persuade a general educated audience, not a disciplinary specialist. This requires different choices: less jargon, more concrete examples, more narrative, and a different relationship to the reader (addressing them as equals rather than as students). At C2, the challenge is to maintain the rigour of academic argument while speaking to a broader readership.',
    inputText: `Op-ed conventions for an educated general audience:

REGISTER: Formal but not technical. Avoid discipline-specific jargon unless you define it. Prefer Anglo-Saxon vocabulary over Latinate where both are available — "begin" over "commence," "use" over "utilise" — but do not sacrifice precision.

OPENING: Hook immediately — a concrete case, a paradox, a striking statistic, or a question the reader has likely encountered. Do not begin with abstract generalisations.

ARGUMENT: Clear and sequential. The reader cannot re-read sentences in a lecture theatre — each sentence must be understood on first reading. Use shorter sentences where complex content requires it.

EXAMPLES: Concrete and recognisable to your audience. Abstract arguments need to be grounded in specific cases. Do not rely on academic citations — use examples that a non-specialist will recognise.

CONCESSION: Acknowledge the strongest objection to your position, briefly but fairly. The reader will have thought of it; pretending it doesn\'t exist makes the argument seem naive.

CONCLUSION: Do not summarise — advance. End with something that stays with the reader. A good op-ed conclusion changes the question rather than answering it.

Prompt: Write an op-ed (400–450 words) on ONE of the following:
(A) "Why the language you speak might — just might — shape how you see the world." (Based on the Sapir-Whorf discussion from C2-LISTENING-001.)
(B) "Popper\'s paradox is not what you think it is." (An accessible explanation of the argument from C2-READING-002.)
(C) "The novel knows things science doesn\'t." (Based on the claim from C2-READING-001.)`,
    writingTask: 'Write the op-ed (400–450 words) on your chosen prompt. Aim for prose that an educated non-specialist would find engaging and persuasive. When complete, review: is every sentence understandable on first reading? Is there at least one concrete example? Is the strongest objection acknowledged?',
    wordTarget: 425,
    tasks: [
      task(
        'Write an opening that hooks immediately. No abstract generalisations ("Throughout history, language has fascinated scholars"). Begin with a specific moment, case, or paradox.',
        'A good hook creates a felt need for the argument that follows. The reader should want to know more after the first sentence. Try: a surprising fact, a familiar experience that the piece will reframe, or a question the reader has never quite articulated.',
        'Example (Prompt A): "Somewhere in the Russian-speaking world, there is a native Russian speaker who sees sky blue and cornflower blue as two entirely different colours — because Russian has separate words for them. Whether this means they perceive the colours differently, or merely describe them differently, is the question that has divided linguists for decades. The answer, it turns out, matters more than it might seem."'
      ),
      task(
        'Develop your core argument in 2–3 paragraphs. For a general audience, each paragraph should make one clear claim and illustrate it with a concrete example.',
        'Avoid: "In this regard, it can be said that…" / "Research has shown that…" without specifying what research. A general audience needs specific examples (a person, a study with a memorable finding, a case that makes the abstract concrete) rather than vague references to scholarship.',
        'Evaluate: Is each paragraph\'s claim stated clearly at or near the start? Is there a concrete example that makes the abstract claim visible? Is the language accessible without being condescending?'
      ),
      task(
        'Acknowledge the strongest objection in 3–4 sentences. State it fairly, then respond briefly.',
        'For a general audience, the concession should come across as intellectually honest, not as a weakness. "It is fair to say that…" or "The obvious objection is…" signals confidence. The response should be brief — one or two sentences — because you have limited space.',
        'Evaluate: Is the concession the real strongest objection — or a convenient weaker version? Is the response brief enough (1–2 sentences) not to derail the argument? Does the paragraph end with the argument, not the concession?'
      ),
      task(
        'Write a closing paragraph that advances rather than summarises. The last sentence should leave the reader with something to think about.',
        'Avoid: "In conclusion, I have argued that…" / "To sum up…" These are closings for academic essays, not for pieces written to be read and thought about. End with a question, a reframing, an implication, or a image that crystallises the piece\'s central insight.',
        'Evaluate: Does the closing add something — a new angle, a broader implication, a question — or merely repeat what has been said? Is the final sentence genuinely memorable? Would a reader want to discuss this piece after finishing it?'
      ),
    ],
  }),

  // ─── WRITING-004: Formal correspondence at C2 ────────────────────────────────
  createWritingLesson({
    ...common,
    id: 'C2-WRITING-004',
    order: 4,
    title: 'Writing: Formal correspondence at C2 — precision, register, and strategic communication',
    objectives: [
      'Write formal professional correspondence at C2 level — precise, well-structured, and strategically effective.',
      'Apply register distinctions accurately — distinguishing very formal, formal, and formal-but-warm registers.',
      'Use stance and epistemic markers to convey appropriate degrees of certainty and flexibility.',
      'Achieve communicative goals while maintaining the professional relationship.',
    ],
    teacherOpening: 'Formal correspondence at C2 is about strategic communication as much as grammar. A letter or email at this level is not just correct — it achieves its goal without damaging the relationship, conveys the right degree of certainty and flexibility, and is written in a register precisely calibrated to the relationship and context. This lesson practises three different scenarios, each requiring different register calibration.',
    inputText: `Formal correspondence register spectrum:

VERY FORMAL (legal, institutional, high-stakes professional): Long sentences, full nominalisation, passive voice, no contractions, formal salutation and closing, careful hedging of any claims.

FORMAL (standard professional): Nominalisation, some shorter sentences, minimal contractions (none in first paragraph), professional but not impersonal, hedging of uncertain claims.

FORMAL-BUT-WARM (long-standing professional relationship, senior professional to peer): Some shorter sentences, careful but not excessive nominalisation, light personal acknowledgement, slight informality at opening/closing without compromising professionalism.

Register errors at C2:
- Inappropriate contraction in very formal contexts ("I'm writing to inform you" in a legal letter)
- Over-hedging ("I was wondering if it might perhaps be possible to consider whether...")
- Under-hedging in uncertain contexts ("I will arrange this" when you are not sure you can)
- Wrong salutation for register ("Hi Professor Chen" in an academic funding letter)
- Inappropriate phatic elements in very formal contexts ("I hope you are well" in a formal legal notice)`,
    writingTask: 'Write ONE of the following (250–300 words). Choose the scenario that presents the greatest challenge:\n\n(A) [Very formal] Write a formal letter on behalf of a research institution to a funding body, requesting an extension to a project deadline by three months. The institution has encountered unexpected difficulties; the project will be completed with the extension. The tone must be professional and respectful without being obsequious.\n\n(B) [Formal] Write a professional email to a journal editor, withdrawing a paper from consideration because it has been accepted elsewhere. The withdrawal must be clear, apologetic without being excessive, and leave the professional relationship intact.\n\n(C) [Formal-but-warm] Write to a senior colleague who has offered to write a recommendation letter. Express genuine gratitude, provide the information they need, and ask the specific questions you need answered — all without being either servile or presumptuous.',
    wordTarget: 275,
    tasks: [
      task(
        'Identify the appropriate register for your chosen scenario and write the opening of the correspondence. Include the salutation and the first paragraph.',
        'The opening must: use the correct salutation for the register; establish the purpose of the correspondence within the first 2–3 sentences; set the register for the whole letter without being either too warm (A/B) or too cold (C).',
        'Example (Scenario A): "Dear Dr. [Name] / Dear [Title and name of funding body],\n\nI write on behalf of [Institution] to request a formal extension to the deadline for [Project Name], currently scheduled for [date]. In view of the circumstances outlined below, we believe a three-month extension — to [new date] — would enable the project to be completed to the standard the funding body would expect.\n\nDuring [period], the research team encountered [specific difficulty] that was not foreseeable at the time of the project\'s design..."'
      ),
      task(
        'Write the body of the correspondence. State your case clearly, with appropriate hedging and precision. Do not over-apologise (A/B) or under-explain (C).',
        'Calibrate: in scenario A, you need to explain the difficulty factually without appearing incompetent; in B, you need to apologise genuinely without being excessive; in C, you need to make requests of a senior colleague without being presumptuous.',
        'Evaluate: Is the core purpose of the correspondence achieved? Is the hedging appropriate to the level of certainty you actually have? Does the register remain consistent throughout the body?'
      ),
      task(
        'Write the closing paragraph and sign-off. The closing must be proportionate — neither under-closing (abrupt) nor over-closing (sycophantic).',
        'A/B: "I would be grateful for your consideration of this request. Please do not hesitate to contact me should you require any further information." C: "I very much appreciate your willingness to support this application, and I look forward to hearing from you at your convenience."',
        'Evaluate: Is the sign-off appropriate to the register? Is the closing paragraph too short (appearing abrupt) or too long (appearing desperate)? Is the salutation matched by the appropriate closing ("Yours faithfully" with "Dear Sir/Madam"; "Yours sincerely" with a named addressee; "Best regards" / "Kind regards" in formal-warm)?'
      ),
    ],
  }),

]);

export const C2_DEEP_RHETORIC_PART2_BY_PILLAR = Object.freeze({
  grammar: Object.freeze([]),
  vocabulary: Object.freeze([]),
  reading: Object.freeze([]),
  listening: Object.freeze([]),
  speaking: Object.freeze([
    C2_DEEP_RHETORIC_PART2.find(l => l.id === 'C2-SPEAKING-002'),
  ]),
  writing: Object.freeze([
    C2_DEEP_RHETORIC_PART2.find(l => l.id === 'C2-WRITING-003'),
    C2_DEEP_RHETORIC_PART2.find(l => l.id === 'C2-WRITING-004'),
  ]),
  checkpoint: Object.freeze([]),
});
