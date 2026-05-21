import { createSpeakingLesson, createWritingLesson } from '../../../schemas/index.js';

const level = 'C2';
const status = 'ready';
const common = { level, status, estimatedMinutes: 75, tags: ['c2-4', 'near-native', 'production', 'mastery', 'deep-approved-target'] };

function task(instruction, note = '', expected = '') { return { instruction, note, expected }; }

export const C2_DEEP_NATIVE_PRODUCTION_PART2 = Object.freeze([

  // ─── SPEAKING-004: Extended monologue and academic narrative ─────────────────
  createSpeakingLesson({
    ...common,
    id: 'C2-SPEAKING-004',
    order: 4,
    title: 'Speaking: The extended monologue — delivering complex information with clarity and authority',
    objectives: [
      'Deliver an extended monologue (8–10 minutes) on a complex topic without notes.',
      'Structure spoken information with the clarity of expert academic discourse.',
      'Use intonation, pacing, and cohesive devices to guide the listener through complex argument.',
      'Manage the tension between detail and structure at C2 level.',
    ],
    teacherOpening: 'The extended monologue — sustained solo speech on a complex topic — is one of the most demanding speaking tasks at C2. Unlike a seminar discussion, it offers no external structure; you must create the structure and maintain it across 8–10 minutes. Unlike a prepared presentation, it should feel natural and responsive to the listener, not scripted. This lesson practises the skills of expert spoken exposition.',
    prompt: 'Choose ONE topic for an 8–10 minute extended explanation with no notes:\n\n(A) Explain the evidence-based policy debate as you understand it from C2-READING-004 and C2-LISTENING-004, then offer your own evaluation of the argument from Dr Patel\'s final turn: is evidence in policy a lost cause?\n(B) Explain the problem of under-determination in science (from C2-LISTENING-003) as if to a highly intelligent non-specialist. Then explain what you find most and least persuasive about the scientific realist response to it.\n(C) Explain what you now understand by "register" in English — what it is, why it matters, and how your understanding of register has changed over the course of your English learning.',
    pronunciationFocus: {
      title: 'Pronunciation & shadowing',
      tips: [
        'Shadow: "What I want to explain today is why this debate matters — and why the answer is less obvious than it first appears." — stress MATters and OBvious. Practise the "less X than Y" academic comparison.',
        '"The tension between detail and structure is what distinguishes expert explanation from mere information delivery." — stress TENsion, disTINguishes, and deLIVery. Chunk into three breath groups.',
        '"Let me pause here to make sure the central distinction is clear." — stress PAUSE and disTINCtion. Practise the self-monitoring move with confident intonation.',
        '"To return to the thread I was developing..." — stress reTURN and deVELoping. Practise the discourse repair move smoothly, without hesitation markers.',
      ],
    },
    tasks: [
      task(
        'Open your monologue with an orientation: tell the listener what you are going to explain and why it is worth understanding. Within 60 seconds, the listener should know exactly what the next 9 minutes will cover.',
        'The orientation is not the same as a table of contents ("First I will explain X, then Y, then Z"). It should create intellectual motivation: make the listener want to understand this topic. Frame the question, not the answer.',
        'Evaluate: does the orientation create genuine engagement? Is the scope clear — does the listener know what will and will not be covered? Is the framing intellectually motivating?'
      ),
      task(
        'Develop the explanation in 3–4 clearly separated chunks. Signal the transition between chunks explicitly: "With that foundation, I want to turn to…" / "The second dimension of the problem concerns…" / "This brings me to the most contested part of the argument…"',
        'The listener cannot pause or re-read. Each chunk must be self-contained enough that if the listener missed the previous one, they can still follow from the current one. Use examples to make abstract claims concrete.',
        'Evaluate: are the chunks distinct and logically sequential? Are the transitions explicit enough to follow in real time? Is the ratio of abstract claim to concrete example appropriate for a non-specialist audience?'
      ),
      task(
        'At some point in the monologue, introduce and address a complication or objection. This demonstrates that you are not merely presenting information but thinking through it.',
        '"One might object that…" / "The picture is more complex than I\'ve suggested, because…" / "This raises a difficult question about…" — and then address the complication rather than abandoning it.',
        'Evaluate: is the complication genuine — does it actually complicate the account? Or is it a token acknowledgement? Does the student address the complication substantively?'
      ),
      task(
        'Close with a synthesis, not a summary. The closing should add something to what was said — an implication, a question, a reframing — rather than merely recapping.',
        '"What this suggests, at the broadest level, is…" / "The question that remains, and that the argument doesn\'t fully resolve, is…" / "If I had to summarise the take-away in one sentence, it would be…"',
        'Evaluate: does the closing advance beyond the body of the monologue? Does it reflect genuine synthesis rather than repetition? Is it proportionate in length?'
      ),
    ],
  }),

  // ─── WRITING-005: Complex data commentary ────────────────────────────────────
  createWritingLesson({
    ...common,
    id: 'C2-WRITING-005',
    order: 5,
    title: 'Writing: Data commentary at C2 — reporting, interpreting, and critically evaluating quantitative findings',
    objectives: [
      'Write a sophisticated data commentary (300–350 words) that moves fluently between description, interpretation, and critical evaluation.',
      'Use the full range of hedging and boosting devices calibrated precisely to the evidential situation.',
      'Distinguish between what the data show directly and what they suggest or imply.',
      'Apply the critique from C2-READING-004 to a real data commentary task.',
    ],
    teacherOpening: 'Data commentary is one of the most common genres in academic and professional writing, and one of the most frequently done poorly. The characteristic weakness of student data commentary is over-description (reporting what the data show without interpreting them) and over-interpretation (drawing conclusions the data don\'t support). At C2, the goal is a commentary that moves confidently between description, interpretation, and critical evaluation — always matching the linguistic form to the evidential situation.',
    inputText: `Data commentary structure at C2:

DESCRIBE (2–3 sentences): What do the data show? Report the key features — patterns, trends, outliers, comparisons — in precise language. Use appropriate hedging for anything that involves interpretation even at the descriptive level.

INTERPRET (3–4 sentences): What do the data suggest or indicate? Move beyond what is directly shown to what it implies. Use appropriate hedging: "suggest," "indicate," "is consistent with," "provides some evidence for." Distinguish between correlation and causation.

EVALUATE (2–3 sentences): What are the limitations of these data? What alternative interpretations exist? What would additional evidence help to establish? This is the critical dimension that transforms data commentary from reporting to analysis.

IMPLICATION (1–2 sentences): What follows from the data and their interpretation for the research question or policy debate? Be specific about what the data can and cannot contribute.

Practice data (invent specific numbers within the pattern described):
A longitudinal study (5 years, n = 1,200) found that adults who reported reading at least 30 minutes per day scored 23% higher on cognitive flexibility assessments, 17% higher on empathy measures, and were 34% less likely to report symptoms of clinical depression. The correlation remained significant when controlling for income, education, and prior mental health history. However, the study cannot establish the direction of causation: it is equally plausible that cognitively flexible, empathetic, mentally healthy adults are more likely to read than that reading produces these outcomes.`,
    writingTask: 'Write a data commentary (300–350 words) on the practice data above. Apply all four parts of the structure. Include at least: two hedged interpretive claims, one booster for a well-supported descriptive claim, one specific limitation, and one implication for policy or future research.',
    wordTarget: 325,
    tasks: [
      task(
        'Write the descriptive section. Report the key findings with precise numbers and appropriate epistemic language. What do the data directly show?',
        'Description should be precise: cite the specific figures rather than generalising ("higher" without saying how much higher). The distinction between a 23% and a 34% difference matters — report it. Even description requires some hedging when the measure itself is contested ("cognitive flexibility as operationalised in this study").',
        'Example: "A five-year longitudinal study tracking 1,200 adults found that those who reported reading at least 30 minutes daily scored 23% higher on cognitive flexibility assessments and 17% higher on measures of empathy than non-readers. Most strikingly, regular readers were 34% less likely to report symptoms of clinical depression. These correlations remained statistically significant after controlling for income, education, and prior mental health history, suggesting that the relationship is not merely an artefact of socioeconomic confounding."'
      ),
      task(
        'Write the interpretive section. What do these data suggest? Move beyond description while maintaining appropriate hedging. Explicitly address the causation question.',
        'The data support an association; they do not establish causation. This is crucial and must be reflected in the language. "The data demonstrate that reading causes cognitive improvement" would be a serious overclaim. "The data are consistent with the hypothesis that reading improves cognitive flexibility" is appropriate.',
        'Evaluate: is the move from description to interpretation clearly marked? Are the hedging devices calibrated to the degree of evidential support? Does the student address the direction-of-causality problem from the study design?'
      ),
      task(
        'Write the evaluative section. What are the limitations of these data? What alternative interpretations exist?',
        'Go beyond the limitation named in the study (causation direction). Consider: self-report bias in reading time; the operationalisation of cognitive flexibility and empathy; the representativeness of the sample; the cultural/contextual specificity of the findings. Not all of these need to be mentioned, but at least two specific and substantive limitations should be identified.',
        'Evaluate: are the limitations specific and substantive — not generic ("the sample is limited") but identifying the particular way the limitation affects the interpretation? Is at least one alternative interpretation offered and taken seriously?'
      ),
      task(
        'Write the implication section. What does this study contribute to the research question or policy debate? Be precise about what it can and cannot contribute.',
        'The implication should be specific: not "more research is needed" (this is always true) but "these data would be strengthened by a randomised controlled trial comparing reading to an alternative leisure activity matched for time investment." Or: "the findings have implications for public library funding, provided the causation question is resolved."',
        'Evaluate: is the implication specific and actionable? Does it reflect what the data actually support — not more and not less? Does it connect the research to a real policy or research question?'
      ),
    ],
  }),

  // ─── WRITING-006: Synthesis essay ────────────────────────────────────────────
  createWritingLesson({
    ...common,
    id: 'C2-WRITING-006',
    order: 6,
    title: 'Writing: The synthesis essay — integrating multiple sources into a coherent argument at C2',
    objectives: [
      'Write a synthesis essay (400–450 words) that integrates ideas from multiple sources into an original argument.',
      'Distinguish between summarising, paraphrasing, and synthesising as different writing operations.',
      'Use source integration techniques at C2 level: accurate attribution, selective quotation, and original argument.',
      'Produce an essay that goes beyond describing what sources say to using them in service of an argument.',
    ],
    teacherOpening: 'Synthesis — using multiple sources in service of an original argument rather than summarising each source in sequence — is one of the highest-level academic writing skills. Many students describe what each source says, then describe what the next one says, without developing their own argument. At C2, the expectation is that sources are tools for making a case, not the case itself.',
    inputText: `Synthesis vs. summary vs. paraphrase:

PARAPHRASE: Restate a single source\'s point in your own words. Lowest-level use of a source.

SUMMARY: Condense a source\'s argument. Still a single-source operation.

SYNTHESIS: Use ideas from multiple sources together in service of your own argument. The argument is yours; the sources are evidence for it.

How to synthesise:
1. Identify the pattern across sources: agreement, disagreement, partial overlap, complementary dimensions of the same problem.
2. Name the pattern explicitly: "Both X and Y argue that… / While X emphasises A, Y focuses on B / X\'s argument is complicated by Y\'s finding that…"
3. Use the pattern to advance your own argument: the pattern becomes evidence for a claim that you are making.

Common failure mode: the "sources take turns" essay, where paragraph 1 summarises Source A, paragraph 2 summarises Source B, paragraph 3 summarises Source C, and the conclusion says "in conclusion, there are many perspectives on this issue."

Prompt: Using ideas from at least THREE of the following texts from the C2 course, write a synthesis essay (400–450 words) arguing for a position on the following question:

"Can we ever be truly objective in our analysis of complex social phenomena — and does it matter if we cannot?"

Available sources:
- C2-READING-001: The novel as a cognitive instrument (particularity vs. abstraction)
- C2-READING-002: Popper\'s paradox (evidential conditions for political decisions)
- C2-READING-003: Power and definitional authority (Foucauldian discourse analysis)
- C2-READING-004: Evidence-based policy and its limits (measurability vs. importance)
- C2-LISTENING-001: Sapir-Whorf and language shaping thought
- C2-LISTENING-003: Under-determination in science (evidence underdetermines theory)`,
    writingTask: 'Write the synthesis essay (400–450 words). Your essay must: advance a clear position in the opening paragraph; use ideas from at least three sources in service of that position (not in sequence but integrated); include at least one counter-argument and rebuttal; and close with a conclusion that adds something to the argument.',
    wordTarget: 425,
    tasks: [
      task(
        'Before writing, identify the pattern across your chosen sources. Write a one-paragraph planning note: what does each source contribute, and what pattern do they form that supports your thesis?',
        'Example: "Source A (C2-READING-003) argues that definitional power is political. Source B (C2-READING-004) shows that evidence-based frameworks privilege measurable outcomes. Source C (C2-LISTENING-003) shows that evidence underdetermines theory. Pattern: all three show that what counts as valid analysis is shaped by non-neutral factors — power, measurement norms, prior theory. This supports a thesis that objective analysis is impossible not because analysts are biased but because the framework of analysis is always already value-laden."',
        'Evaluate: are the three sources genuinely connected by a pattern, or is the "pattern" forced? Does the pattern actually support the thesis, or is it tangential?'
      ),
      task(
        'Write the essay. In the body paragraphs, use sources together rather than in sequence. The test: can you write a sentence that cites two different sources in support of the same claim?',
        'Example of synthesis (not summary): "The under-determination of theory by evidence (Listening 003) and the tendency of measurement frameworks to shape what counts as an outcome (Reading 004) both point to the same underlying problem: that the choice of evidential standard is itself a normative decision, not a neutral technical one." This sentence uses two sources together in service of a single point.',
        'Evaluate: are sources used together, or do they take turns? Is the argument the student\'s own — developed through the sources — or is it simply a series of descriptions of what sources say? Is the thesis defended, not just stated?'
      ),
      task(
        'After completing, review: does the essay go beyond what the sources say? Is there a claim in the essay that is genuinely yours — not found in any single source but arising from the synthesis?',
        'The highest mark of a synthesis essay is an insight that could only be reached by reading all the sources together. If every point in the essay is just a summary of one source, it is not a synthesis.',
        'Evaluate: identify the most original claim in the essay — the one most clearly the student\'s own. Is it supported by the pattern across sources? Would it have been possible to make this claim from a single source? If yes, the synthesis has not yet been achieved.'
      ),
    ],
  }),

]);

export const C2_DEEP_NATIVE_PRODUCTION_PART2_BY_PILLAR = Object.freeze({
  grammar: Object.freeze([]),
  vocabulary: Object.freeze([]),
  reading: Object.freeze([]),
  listening: Object.freeze([]),
  speaking: Object.freeze([
    C2_DEEP_NATIVE_PRODUCTION_PART2.find(l => l.id === 'C2-SPEAKING-004'),
  ]),
  writing: Object.freeze([
    C2_DEEP_NATIVE_PRODUCTION_PART2.find(l => l.id === 'C2-WRITING-005'),
    C2_DEEP_NATIVE_PRODUCTION_PART2.find(l => l.id === 'C2-WRITING-006'),
  ]),
  checkpoint: Object.freeze([]),
});
