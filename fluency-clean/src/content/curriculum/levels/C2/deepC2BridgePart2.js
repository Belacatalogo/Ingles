import { createSpeakingLesson, createWritingLesson } from '../../../schemas/index.js';

const level = 'C2';
const status = 'ready';
const common = { level, status, estimatedMinutes: 75, tags: ['c2-1', 'bridge', 'mastery', 'deep-approved-target'] };

function task(instruction, note = '', expected = '') { return { instruction, note, expected }; }

export const C2_DEEP_BRIDGE_PART2 = Object.freeze([

  // ─── SPEAKING-001: Sustained intellectual discourse ───────────────────────────
  createSpeakingLesson({
    ...common,
    id: 'C2-SPEAKING-001',
    order: 1,
    title: 'Speaking: Sustained intellectual discourse — navigating complexity, ambiguity, and genuine uncertainty',
    objectives: [
      'Speak at C2 level on complex intellectual topics without significant hesitation or recourse to simplification.',
      'Navigate genuine conceptual uncertainty in real time — expressing what you do and do not know with precision.',
      'Use the full range of C2 vocabulary and grammar structures spontaneously.',
      'Manage the social and intellectual demands of high-level academic conversation simultaneously.',
    ],
    teacherOpening: 'At C2, the speaking challenge is not producing correct structures — it is sustaining genuine intellectual discourse over time. This means thinking in English rather than translating, expressing nuance rather than approximating it, and managing uncertainty with precision rather than vagueness. This lesson practises the kind of sustained intellectual conversation that defines C2 speaking mastery.',
    prompt: 'A 15–20 minute discussion on one of the following questions. Choose the one you find most genuinely interesting — the quality of intellectual engagement matters more than the topic:\n\n(A) Does the language you speak shape the way you think — and does your answer to this question change after engaging with the evidence from the C2-LISTENING-001 discussion?\n(B) The author of C2-READING-001 argues that reading novels develops the capacity for perspective-taking. Is this claim convincing? What evidence would you want in order to accept or reject it?\n(C) At C2 level, does further grammatical study improve your English, or has language learning become primarily a matter of exposure, use, and attention to style?',
    tasks: [
      task(
        'Open the discussion by positioning yourself on the question. Within the first 2 minutes, make clear what you think, why you think it, and where you feel genuinely uncertain.',
        'Genuine intellectual discourse requires intellectual honesty — about what you know, what you believe, and what you are unsure of. "I think X, but I am genuinely uncertain whether Y" is more impressive at C2 than a confident position that turns out to be oversimplified.',
        'Evaluate: Does the student take a clear position? Do they distinguish between what they believe, what they know, and what they are uncertain about? Is the opening substantive — does it give enough content to make a 15-minute discussion possible?'
      ),
      task(
        'Develop the discussion by introducing evidence, examples, or arguments that complicate your initial position. Be willing to revise as you speak.',
        'C2 discourse is not a prepared speech — it is thinking aloud with precision. If you find, mid-discussion, that an argument you were making doesn\'t hold, say so explicitly: "Actually, that argument may not work, because…"',
        'Evaluate: Does the student introduce genuinely new content as the discussion develops — not just restate the opening position? Are they responsive to their own thinking, noticing when an argument fails? Is the vocabulary precise throughout?'
      ),
      task(
        'Engage with a challenge from your teacher. When challenged, identify precisely what aspect of your position is being questioned, and respond to that aspect specifically rather than restating the whole argument.',
        'The most common weakness in high-level L2 speaking: restating the main thesis when a specific aspect of it has been challenged. Identify the specific point under challenge and respond to it.',
        'Evaluate: Does the student hear the challenge correctly — or do they defend against a different objection? Do they concede when appropriate, maintain when warranted, and distinguish the two? Is the register consistent under pressure?'
      ),
      task(
        'Use at least four vocabulary items from C2-VOCABULARY-001 or C2-VOCABULARY-002 in the course of the discussion — not inserted artificially but arising naturally from the argument.',
        'If you find yourself wanting to use one of these words but uncertain whether it is right, say so: "I want to use the word \'apposite\' here, and I think it is right because…" This kind of metalinguistic reflection is itself a mark of C2 sophistication.',
        'Evaluate: Are the vocabulary items used correctly and in appropriate context? Do they strengthen the argument? Is the metalinguistic awareness, where evident, itself an asset?'
      ),
      task(
        'Close the discussion with a synthesis that reflects what emerged — not what you planned to say at the start.',
        'If the discussion moved in a different direction than you expected, close with a reflection on why it moved there and what that suggests about the question. "I expected to argue X, but the discussion made me realise that the more interesting question is Y" is an intellectually honest and impressive closing.',
        'Evaluate: Does the closing reflect the actual discussion? Has the student moved from their opening position — or stayed in the same place? Is the closing an honest reflection of the intellectual work done, or a scripted conclusion?'
      ),
    ],
  }),

  // ─── WRITING-001: Extended literary-critical essay ────────────────────────────
  createWritingLesson({
    ...common,
    id: 'C2-WRITING-001',
    order: 1,
    title: 'Writing: The extended analytical essay — argument, style, and intellectual register at C2',
    objectives: [
      'Write a sustained analytical essay (450–500 words) that demonstrates genuine C2-level intellectual and linguistic register.',
      'Apply ellipsis, substitution, nominalisation, and advanced discourse markers in unsupported production.',
      'Produce an essay that would be indistinguishable in quality from strong native-speaker academic writing.',
      'Develop a position through evidence and argument rather than through assertion.',
    ],
    teacherOpening: 'At C2, the writing standard is not "correct with some impressive structures" — it is "indistinguishable from strong academic writing by a native speaker of the relevant register." This is a high bar, and it is approached rather than arrived at. The goal of this lesson is to produce your best current writing and to develop the habit of comparing it honestly against the standard.',
    inputText: `No structural scaffold is provided. Apply everything you know.

Choose ONE essay prompt:

(A) "The capacity for narrative — the ability to tell stories and to think in stories — is not merely a leisure activity. It is a cognitive and moral necessity." Discuss.

(B) "The languages we speak do not determine what we can think, but they shape what we tend to think. The difference is more significant than it appears." Discuss.

(C) "The most important virtue in intellectual life is not intelligence or knowledge but epistemic humility — the willingness to acknowledge the limits of one's understanding." Do you agree?

Essay requirements (400–500 words):
- Thesis paragraph with specific, arguable claim
- 2–3 developed argument paragraphs with evidence and explicit reasoning
- Counter-argument and rebuttal paragraph
- Conclusion that adds something to the argument rather than merely summarising it

Language requirements (no scaffolding — apply independently):
- At least two C2 grammar structures (ellipsis/substitution, nominalisation, or C1 structures applied at C2 density)
- At least five vocabulary items from C2-VOCABULARY-001 or C2-VOCABULARY-002
- At least four different types of discourse marker
- Consistent high academic register throughout`,
    writingTask: 'Write the full essay (400–500 words) independently. When complete, annotate: circle the five vocabulary items and label them; underline two grammar structures and name them; mark the counter-argument paragraph with [CA].',
    wordTarget: 450,
    tasks: [
      task(
        'Write the complete essay without step-by-step support. Treat this as a demonstration of your current C2 writing capacity.',
        'The absence of scaffold is intentional: C2 writing is not supported writing. Apply what you know. If you are uncertain about a word or structure, mark it with a ? and review it after.',
        'Evaluate: Does the thesis advance a specific, arguable claim? Are the argument paragraphs developed with evidence and explicit reasoning — not just assertion? Does the counter-argument engage the best version of the objection? Does the conclusion add something rather than merely summarise?'
      ),
      task(
        'After completing the essay, conduct a self-review against the language requirements checklist. For each requirement, confirm it is present — or note that it is missing.',
        'Self-review is a C2 metacognitive skill. The goal is not just to produce correct text but to develop the ability to assess your own text against a target standard.',
        'Checklist: (1) two C2 grammar structures — are they used correctly and naturally? (2) five C2 vocabulary items — are they used accurately in context? (3) four discourse marker types — are they precise matches to the logical relationship? (4) consistent academic register — are there any lapses?'
      ),
      task(
        'Identify one sentence in your essay that you are satisfied with — that achieves something at the level of style as well as correctness — and one sentence that you think could be improved. For the second sentence, write an improved version.',
        'Learning to evaluate your own prose with precision is as important as producing it. Identifying what works and what doesn\'t requires the same metalinguistic awareness that underpins C2 mastery.',
        'Evaluate: Is the identified "good" sentence genuinely strong — not just correct? Is the identified "weak" sentence correctly diagnosed? Does the improved version actually improve on the original?'
      ),
    ],
  }),

  // ─── WRITING-002: The academic abstract ──────────────────────────────────────
  createWritingLesson({
    ...common,
    id: 'C2-WRITING-002',
    order: 2,
    title: 'Writing: The academic abstract — compression, precision, and the art of saying everything in 150 words',
    objectives: [
      'Write a formal academic abstract (150 words) that accurately and precisely summarises a research argument.',
      'Apply maximum compression techniques: nominalisation, ellipsis, and lexical density.',
      'Reproduce the genre conventions of the academic abstract at C2 level.',
      'Distinguish between the abstract and the introduction as genres with different functions.',
    ],
    teacherOpening: 'The academic abstract is one of the most demanding genres in English: 150 words to convey background, method, findings, and significance — in impersonal, formal, hedged prose that is simultaneously precise and compressed. Every word earns its place. This is the genre that most rewards the grammar skills developed in C2.1: nominalisation, ellipsis, and substitution are not optional here — they are necessary.',
    inputText: `Abstract genre conventions:

BACKGROUND (1–2 sentences): What is the question or problem? Why does it matter? Use nominalisation: "The question of X remains contested" rather than "Researchers have not agreed about X."

METHOD / APPROACH (1–2 sentences): How was it investigated? Passive and impersonal constructions are standard: "This paper examines / analyses / investigates / argues."

FINDINGS (2–3 sentences): What was found? Use hedged language where appropriate. Distinguish primary from secondary findings.

SIGNIFICANCE (1–2 sentences): What do the findings contribute? Why do they matter for the field?

Abstract checklist:
- Under 150 words
- No first-person plural ("we found") in formal abstracts — use passive or impersonal
- No citations in the abstract
- No undefined abbreviations
- No information that is not in the paper
- Nominalisation throughout to increase lexical density

Practice text: Write an abstract for an imaginary paper that investigates the relationship between social media use and epistemic fragmentation in democratic societies. You may invent specific findings.`,
    writingTask: 'Write a formal academic abstract (140–160 words) for the imaginary paper described above. Apply maximum compression. When complete, count the words and check the genre checklist.',
    wordTarget: 150,
    tasks: [
      task(
        'Write the background sentences: name the problem (epistemic fragmentation in democratic societies) and contextualise it in 2 sentences. Use nominalisations.',
        'Avoid: "Recently, researchers have become interested in…" Use: "The relationship between X and Y has received increasing scholarly attention, driven by concerns about…"',
        'Example: "The relationship between social media use and epistemic fragmentation in democratic societies has attracted significant scholarly attention in recent years, driven by concerns about the long-term consequences of algorithmically mediated information environments for deliberative politics."'
      ),
      task(
        'Write the method/approach sentences. This paper "investigates" something — state what and how in 1–2 sentences using impersonal constructions and nominalisations.',
        'Use: "This paper examines / analyses / investigates / argues through." Avoid: "In this paper, we look at…"',
        'Example: "This paper investigates the mechanisms through which social media architectures promote epistemic fragmentation, drawing on a synthesis of empirical research from political science, cognitive psychology, and communication studies."'
      ),
      task(
        'Write the findings. Invent 2–3 specific, hedged findings. Use a range of reporting constructions: "the analysis suggests / findings indicate / evidence points to."',
        'Specific findings (even invented) are more convincing than vague ones. "The analysis suggests that algorithmic curation is associated with a 40% reduction in exposure to cross-partisan content" is more abstract-appropriate than "social media makes people see less diverse content."',
        'Example: "The analysis suggests that algorithmic curation systematically reduces exposure to cross-partisan information, with evidence of a corresponding reduction in epistemic overlap between ideological communities. This fragmentation effect appears to be independent of users\' self-reported preferences, suggesting a structural rather than purely demand-driven dynamic."'
      ),
      task(
        'Write the significance sentences. Why does this paper matter for the field or for policy? 1–2 sentences maximum.',
        'Avoid vague significance claims ("this will help society"). Name the specific contribution: a new mechanism, a new synthesis, a challenge to an existing framework, implications for a specific policy area.',
        'Example: "These findings have implications for the design of platform regulation, suggesting that interventions targeting algorithmic architecture may be more effective than those targeting individual behaviour. The paper contributes a structural account of epistemic fragmentation to a literature that has been predominantly individualist in its framing."'
      ),
    ],
  }),

]);

export const C2_DEEP_BRIDGE_PART2_BY_PILLAR = Object.freeze({
  grammar: Object.freeze([]),
  vocabulary: Object.freeze([]),
  reading: Object.freeze([]),
  listening: Object.freeze([]),
  speaking: Object.freeze([
    C2_DEEP_BRIDGE_PART2.find(l => l.id === 'C2-SPEAKING-001'),
  ]),
  writing: Object.freeze([
    C2_DEEP_BRIDGE_PART2.find(l => l.id === 'C2-WRITING-001'),
    C2_DEEP_BRIDGE_PART2.find(l => l.id === 'C2-WRITING-002'),
  ]),
  checkpoint: Object.freeze([]),
});
