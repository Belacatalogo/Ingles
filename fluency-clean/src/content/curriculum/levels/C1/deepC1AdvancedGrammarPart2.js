import { createReadingLesson, createListeningLesson, createWritingLesson } from '../../../schemas/index.js';

const level = 'C1';
const status = 'ready';
const common = { level, status, estimatedMinutes: 70, tags: ['c1-2', 'advanced-grammar', 'academic', 'deep-approved-target'] };

function task(instruction, note = '', expected = '') { return { instruction, note, expected }; }

export const C1_DEEP_ADVANCED_GRAMMAR_PART2 = Object.freeze([

  // ─── READING-002: The Grammar of Argument ────────────────────────────────────
  createReadingLesson({
    ...common,
    id: 'C1-READING-002',
    order: 2,
    title: 'Reading: "The Grammar of Argument" — cleft structures and passive voice in academic prose',
    objectives: [
      'Identify and analyse cleft structures (it-clefts, Wh-pseudoclefts, reversed pseudoclefts) in authentic academic text.',
      'Recognise how passive voice and causative constructions create academic distance.',
      'Infer the rhetorical function of advanced verb patterns in constructing an argument.',
      'Answer inference, vocabulary-in-context, and text-organisation questions at C1 level.',
    ],
    teacherOpening: 'This passage is written in the style of academic linguistics. It uses every advanced structure from C1.2 deliberately — this is not accidental. As you read, notice how the author constructs emphasis and manages information flow through grammar choices rather than lexical choices.',
    passage: `The Grammar of Argument: How Syntax Constructs Persuasion

It is a commonplace observation that rhetoric depends on word choice. What is less commonly acknowledged is that syntax itself carries persuasive force — that the arrangement of clauses, the selection of voice, and the positioning of new information within a sentence are decisions as consequential as the choice between "freedom" and "liberty." This essay argues that C1-level academic writers need to develop syntactic awareness alongside lexical awareness if their arguments are to carry conviction.

Consider the function of cleft sentences. What distinguishes a skilled academic writer from a competent one is not vocabulary range but information management. The it-cleft ("It was the systemic failure of oversight, not the individual actors, that produced the outcome") places the focused element — a noun phrase, a contrast, a specific attribution — in the most prominent syntactic position. The Wh-pseudocleft ("What the evidence ultimately shows is not correlation but a well-documented causal mechanism") takes this further: it establishes a gap ("what the evidence shows") and then fills it, creating an expectation that the clause satisfies. Readers experience this as logical rigour even when the argument is contested.

Passive voice has been systematically misrepresented by prescriptive writing guides. What has been obscured by the prohibition on passives is the productive role that the passive plays in academic prose. The agentless passive ("It has been suggested that...," "These results were obtained under controlled conditions...") serves two distinct functions: it removes the agent when the agent is unknown, unimportant, or strategically better kept in the background; and it shifts the theme position — the grammatical subject — to the entity about which new information is predicated. Having been misled by simplistic advice, many writers avoid passives entirely, thereby losing a major resource for information packaging.

Causative constructions represent a further resource. To have something done and to get something done differ not only in register but in the degree of agency they imply. "The committee had the report reviewed by three independent specialists" suggests institutional procedure; "the committee got the report reviewed" suggests effort or persistence. These differences, though subtle, accumulate across a text. Having the report reviewed carries an implicit claim about the nature of the institution; getting it reviewed carries an implicit claim about the difficulty of doing so.

What all of these structures share is that they allow a writer to make choices that are legible to other expert readers as markers of argumentative sophistication. The syntax is the argument — not a container for it.`,
    wordCount: 390,
    tasks: [
      task(
        'Paragraph 1 contains two contrasting claims about rhetoric. Identify the main contrast and explain what the author argues is undervalued.',
        'Re-read the first paragraph carefully. What two elements of language are contrasted? What is the author\'s position?',
        'The contrast is between word choice (lexis) and syntax (sentence structure/grammar). The author argues that syntax — cleft structures, voice choices, information positioning — carries persuasive force that is undervalued compared to lexical choices.'
      ),
      task(
        'In paragraph 2, the author uses two different cleft structures as examples. Identify each type and explain what rhetorical function the author says each serves.',
        'Find the quoted examples in paragraph 2. What does the author say each one achieves for the reader?',
        'The it-cleft ("It was the systemic failure of oversight...") places the focused element in the most prominent syntactic position. The Wh-pseudocleft ("What the evidence ultimately shows...") creates an expectation that is then satisfied, producing an experience of logical rigour in the reader.'
      ),
      task(
        'The author writes that passive voice "has been systematically misrepresented." What does this phrase itself demonstrate about the argument? What grammatical structure does the author use here, and why?',
        'Notice that the author is discussing passive voice while using it. What effect does this create?',
        'The phrase uses an agentless passive ("has been systematically misrepresented"), which enacts the very point being argued — that the passive is a resource for removing the agent. Here the "prescriptive writing guides" are kept in the background, placing the focus on what was done to passive voice (misrepresentation) rather than on who did it.'
      ),
      task(
        'In paragraph 4, what specific difference in meaning does the author identify between "to have something done" and "to get something done"? Use the examples from the text in your answer.',
        'Focus on the causative examples in paragraph 4. What does each imply about agency and difficulty?',
        '"Have something done" implies institutional procedure and control: "The committee had the report reviewed" suggests a routine, authorised process. "Get something done" implies effort, persistence, or difficulty: "the committee got the report reviewed" suggests that achieving the review required some work. The difference is subtle but the author argues it accumulates across a text.'
      ),
      task(
        'The final sentence states "The syntax is the argument — not a container for it." In your own words, explain what this distinction means and how the passage as a whole supports it.',
        'Think about the difference between saying syntax "expresses" argument and saying syntax "is" argument. What does the passage demonstrate?',
        'The sentence argues that grammatical choices do not merely express a pre-formed argument in a neutral way — they constitute and shape the argument itself. The passage supports this by showing how cleft structures produce rhetorical effects (emphasis, expectation, logical rigour), how passive voice positions information to serve argumentative ends, and how causative constructions carry implicit claims about agency and institutional character. The syntax is doing argumentative work, not just packaging it.'
      ),
      task(
        'Vocabulary in context: what does "predicated" mean in the phrase "the entity about which new information is predicated" (paragraph 3)? How does this differ from its everyday meaning?',
        'The word has a technical linguistic sense here. Consider the context: the grammatical subject is the "entity" — what does "predicated" mean in grammar?',
        'In linguistics, "to predicate" means to assert something about a subject — the predicate is the part of the sentence that says something about the grammatical subject. Here, the passive shifts the theme position so that the entity under discussion becomes the grammatical subject, making it the thing about which new information is stated. The everyday sense ("predicated on" = based on) is different; the author is using the technical grammatical sense.'
      ),
    ],
  }),

  // ─── LISTENING-002: The Architecture of Academic Prose ───────────────────────
  createListeningLesson({
    ...common,
    id: 'C1-LISTENING-002',
    order: 102,
    title: 'Listening: "The Architecture of Academic Prose" — tutorial on C1 grammar in academic writing',
    objectives: [
      'Follow an extended academic tutorial on advanced grammar at natural speed with technical vocabulary.',
      'Identify the main claims and supporting examples from a multi-speaker academic discussion.',
      'Distinguish between the tutor\'s explanations and the students\' examples or questions.',
      'Answer inference and summary tasks at C1 level.',
    ],
    listeningPreparation: [
      task('Before listening: consider how grammar choices in academic writing do more than convey information — they position claims, manage reader expectations, and construct authority. Activate your awareness of passive voice, cleft structures, and causatives as argumentative tools.', 'This frame helps you listen for why a structure is used, not just what it means.'),
      task('Prediction: predict one way the passive voice might serve an argumentative purpose beyond formality, and one way a cleft structure might manage what the reader expects.', 'Compare your predictions with the examples the speakers discuss.'),
      task('Key words to listen for: epistemic markers (it has been argued, the data suggest), cleft/pseudocleft cues (what is particularly interesting is, it is X that), causative constructions (have something done, get something built), and evaluative stance language (precisely, notice, the point is).', 'These signals help you track how the speakers connect grammar to argumentation.'),
    ],
    teacherOpening: 'This is a tutorial from a university writing course. The tutor, Dr Mensah, is discussing with three postgraduate students — Yuki, Rodrigo, and Fatima — how grammar choices construct academic argument. Listen for the specific examples each speaker uses.',
    transcript: [
      { speaker: 'Dr Mensah', text: 'So let\'s start with the question I posed at the end of last week\'s session: why does academic writing feel different from other formal writing? Not just harder — different in kind.' },
      { speaker: 'Yuki', text: 'I think it\'s the impersonality. It avoids "I" and uses a lot of passive constructions. Like "it has been argued" instead of "I argue."' },
      { speaker: 'Dr Mensah', text: 'That\'s part of it. But notice — you just described a grammatical choice as if it were a stylistic preference. What if it were actually a claim? What if "it has been argued" is doing something different from "scholars argue" — not just sounding more formal, but making a different epistemic claim?' },
      { speaker: 'Rodrigo', text: 'Epistemic as in... about knowledge? About certainty?' },
      { speaker: 'Dr Mensah', text: 'Exactly. "It has been argued" depersonalises the claim — it puts it in the domain of accumulated scholarship rather than individual assertion. That\'s not just humble; it\'s a claim about the status of the idea. Contrast it with "Bourdieu argues" or "the data suggest." Each positions the claim differently in relation to evidence and authority.' },
      { speaker: 'Fatima', text: 'So the passive isn\'t just about avoiding the author — it\'s about how you position the claim within a field of knowledge?' },
      { speaker: 'Dr Mensah', text: 'Precisely. And this is what I mean by saying that the syntax is the argument. Now — cleft structures. What has anyone noticed about how academic writers use these?' },
      { speaker: 'Yuki', text: 'I\'ve seen "what is particularly interesting is..." a lot. Is that a Wh-pseudocleft?' },
      { speaker: 'Dr Mensah', text: 'It is. And notice what it\'s doing: it\'s fronting the author\'s evaluative stance — "what is particularly interesting" — before the actual claim. It manages reader expectation. You know that something is coming that the author has judged to be interesting, so you read the second half of the clause with heightened attention.' },
      { speaker: 'Rodrigo', text: 'But can it become a crutch? I\'ve read papers where every other sentence starts with "What X shows is..."' },
      { speaker: 'Dr Mensah', text: 'Absolutely — and that\'s a real problem. What marks sophisticated academic writing is not the frequency of these structures but their precision. Each one should be doing work that a plain sentence cannot do as efficiently. Overuse flattens their effect.' },
      { speaker: 'Fatima', text: 'I have a question about the causative. I wrote "The research team had the samples tested" in my draft and my supervisor changed it to "The samples were tested." Were they wrong to do that?' },
      { speaker: 'Dr Mensah', text: 'Not wrong — but it depends what you want to convey. "The research team had the samples tested" retains the agent, foregrounds the team\'s role in commissioning the analysis, and uses the causative to suggest deliberate, controlled procedure. The simple passive removes all of that. If the team\'s role is important to your argument — perhaps to establish methodological rigour — then the causative is the better choice.' },
      { speaker: 'Yuki', text: 'So the question to ask is always: what information needs to be in the sentence, and where does it need to be positioned?' },
      { speaker: 'Dr Mensah', text: 'That is exactly the question. And it\'s what separates a writer who has learned rules from a writer who has developed judgment. Rules tell you what is permissible; judgment tells you what is purposeful. What we\'re building here is judgment.' },
    ],
    tasks: [
      task(
        'What is Dr Mensah\'s central claim about the relationship between grammar and academic argument? Summarise it in one or two sentences.',
        'Listen for the key phrase Dr Mensah uses in turn 7 and the explanation given in the final turn.',
        'Dr Mensah argues that grammar choices in academic writing are not merely stylistic preferences but epistemic claims — they position ideas in relation to evidence, authority, and knowledge. The syntax is the argument, not just its packaging, and developing judgment about grammar choices is what distinguishes a sophisticated academic writer.'
      ),
      task(
        'Dr Mensah makes a distinction between "it has been argued," "Bourdieu argues," and "the data suggest." What specific difference does the tutor identify between these three forms?',
        'Focus on turns 4-6. What does Dr Mensah say each construction claims about the status of the idea?',
        '"It has been argued" depersonalises the claim and positions it as part of accumulated scholarship — a claim about the field\'s shared knowledge. "Bourdieu argues" attributes the claim to a specific authority. "The data suggest" positions the claim as evidence-based inference. Each makes a different epistemic claim about the source and status of the idea.'
      ),
      task(
        'What does Dr Mensah say is the problem with overusing Wh-pseudocleft structures like "What X shows is..."? What criterion does the tutor give for using them well?',
        'Listen to turns 11-12. What does Rodrigo raise, and how does Dr Mensah respond?',
        'Overuse flattens the effect of pseudocleft structures — they become a crutch rather than a precision tool. The criterion is that each structure should be doing work that a plain sentence cannot do as efficiently. Sophistication lies in precision of use, not frequency.'
      ),
      task(
        'Fatima asks whether her supervisor was wrong to change "The research team had the samples tested" to "The samples were tested." What is Dr Mensah\'s answer, and what principle does it rest on?',
        'Listen to turn 13. What does the causative add that the simple passive removes?',
        'Dr Mensah says the supervisor was not wrong but that it depends on what the writer wants to convey. The causative retains the agent, foregrounds the team\'s deliberate role in commissioning the analysis, and implies controlled, purposeful procedure. If that information is argumentatively important — for example, to establish methodological rigour — the causative is the better choice. The principle is: the grammar choice should serve the argument, not follow a rule.'
      ),
      task(
        'Yuki summarises the key question in the final exchange. What is the question, and how does Dr Mensah characterise its significance?',
        'Listen carefully to the last two turns.',
        'Yuki\'s question is: "What information needs to be in the sentence, and where does it need to be positioned?" Dr Mensah says this is exactly the right question and marks the difference between a writer who knows rules (what is permissible) and a writer who has developed judgment (what is purposeful). What the course is building is judgment.'
      ),
    ],
  }),

  // ─── WRITING-003: C1 Essay Body Paragraph ────────────────────────────────────
  createWritingLesson({
    ...common,
    id: 'C1-WRITING-003',
    order: 3,
    title: 'Writing: The C1 essay body paragraph — cleft structures, academic passives and complex verb patterns',
    objectives: [
      'Write a fully developed C1 body paragraph using the PEEL structure (Point–Evidence–Explanation–Link).',
      'Integrate at least one cleft structure to manage information focus.',
      'Use at least one academic passive or causative construction to position a claim.',
      'Demonstrate coherent argument flow with C1 cohesive devices.',
    ],
    teacherOpening: 'A C1 body paragraph is not just longer than a B2 paragraph — it is more architecturally sophisticated. At C1, every sentence makes an argumentative contribution: the topic sentence stakes a claim, the evidence is precisely introduced, the explanation analyses rather than paraphrases, and the link both closes the point and gestures forward. The grammar of the paragraph is part of its architecture.',
    inputText: `PEEL body paragraph structure at C1:

POINT: A topic sentence that makes a precise, arguable claim. Not: "Climate change is a serious problem." Yes: "What has consistently impeded effective climate governance is not the absence of scientific consensus but the absence of institutional incentives to act on it."

EVIDENCE: Precisely introduced evidence. Not: "A study shows this." Yes: "This dynamic has been documented across multiple multilateral frameworks, from the Kyoto Protocol to the Paris Agreement, where states have been found to consistently prioritise short-term economic interests over binding long-term commitments."

EXPLANATION: Analysis that explains what the evidence shows and why it matters. Not: "This shows that climate governance is hard." Yes: "What the pattern suggests is not that cooperation is impossible but that the architecture of current agreements has been designed in ways that make defection individually rational. Having been structured around voluntary commitments rather than enforceable obligations, these frameworks systematically privilege exit over accountability."

LINK: A sentence that closes the point and connects to the broader argument. Not: "Therefore, this is an important issue." Yes: "It is therefore not the scientific or technological constraints on climate action that this essay will examine, but the governance structures that have allowed those constraints to persist."`,
    writingTask: 'Write a PEEL body paragraph (200–250 words) for the following essay question: "To what extent does the structure of international institutions prevent effective responses to global crises?" Your paragraph should argue ONE specific point. You must use at least one cleft structure (any type), at least one academic passive or causative, and cohesive devices appropriate to C1 level.',
    wordTarget: 225,
    tasks: [
      task(
        'Before writing, identify the specific claim your paragraph will make. Write your topic sentence first — it should be a precise, arguable claim using a cleft or fronted structure.',
        'Do not start with "Firstly" or "It is widely known that..." Make the claim directly and precisely.',
        'Example: "What prevents institutions such as the UN Security Council from responding effectively to crises is not a lack of mandate but a voting structure that has been designed to reflect the geopolitical settlement of 1945 rather than present realities."'
      ),
      task(
        'Write the evidence sentence. Introduce your evidence with precise, academic framing — avoid "a study shows" or "researchers found." Use passive constructions where appropriate to position the evidence.',
        'You can cite a real framework, treaty, case study, or widely known institutional failure. You don\'t need footnotes — just precise framing.',
        'Example: "The limitations of this arrangement have been demonstrated repeatedly in cases where a permanent member\'s strategic interests have been found to conflict with the proposed collective response, from the Syrian civil war to the Rohingya crisis."'
      ),
      task(
        'Write the explanation sentences (2–3 sentences). Use at least one cleft structure to manage information focus. Explain why the evidence supports your claim — analyse, do not paraphrase.',
        'Your explanation should answer the question: "What does this evidence reveal about why the institution fails?"',
        'Example: "What this reveals is not merely a procedural flaw but a structural one: having been established before the era of global interdependence and transnational crisis, these institutions were not designed to manage problems that cross the boundaries of state sovereignty. The consequence is that the very states most capable of driving collective action have been given the greatest tools for obstructing it."'
      ),
      task(
        'Write your link sentence. It should close the point made in this paragraph and connect it to the broader argument of the essay.',
        'Avoid "In conclusion, this paragraph has shown..." Instead, signal the argument\'s direction.',
        'Example: "It is therefore the reform of decision-making architecture — rather than the expansion of institutional mandate — that emerges as the most tractable path toward more effective multilateral responses."'
      ),
      task(
        'Review your paragraph: identify the cleft structure(s) you used, the academic passive or causative, and at least two cohesive devices. Mark them in your draft.',
        'Count: do you have a topic sentence, evidence, explanation, and link? Is the paragraph 200–250 words?',
        'Checklist: cleft (it-cleft / Wh-pseudocleft / reversed pseudocleft / nominal cleft) ✓ | academic passive or causative ✓ | cohesive devices (connectors, reference, lexical chains) ✓ | 200–250 words ✓ | PEEL structure ✓'
      ),
    ],
  }),

  // ─── WRITING-004: C1 Two-Body-Paragraph Essay Section ────────────────────────
  createWritingLesson({
    ...common,
    id: 'C1-WRITING-004',
    order: 4,
    title: 'Writing: Extended C1 essay section — two developed body paragraphs with advanced grammar integration',
    objectives: [
      'Write two consecutive body paragraphs that build a coherent two-part argument.',
      'Use advanced cleft structures, passives, causatives, and complex verb patterns across the section.',
      'Manage inter-paragraph cohesion with appropriate connectors and lexical chains.',
      'Sustain C1 register and argumentative precision across 400–450 words.',
    ],
    teacherOpening: 'A single strong body paragraph is a unit of argument. Two paragraphs working together are a section of argument — they must be sequenced (one leads to the other), connected (lexical and grammatical cohesion spans the gap), and progressing (the second paragraph does not merely repeat the first at greater length). This is the level at which C1 academic writing operates.',
    inputText: `Principles for a two-paragraph academic section:

SEQUENCING: The two paragraphs should make related but distinct claims. The most common patterns are:
  — Claim + Counterpoint: first paragraph makes the main claim; second paragraph addresses the strongest objection or concedes a limitation.
  — Cause + Effect: first paragraph establishes a cause; second paragraph examines its consequences.
  — General + Specific: first paragraph makes a theoretical claim; second paragraph grounds it in a specific case.

INTER-PARAGRAPH COHESION: The opening of paragraph 2 should signal its relationship to paragraph 1:
  — Contrastive: "Yet this account leaves unaddressed the question of...", "What this analysis does not capture, however, is...", "Having established the structural dimensions of the problem, it is necessary to consider..."
  — Additive: "This dynamic is further complicated by...", "A second, related argument can be made for...", "What compounds the difficulty described above is..."
  — Elaborative: "The implications of this argument extend beyond...", "What the preceding analysis suggests is that..."

GRAMMAR ACROSS THE SECTION: Cleft structures, passives, and complex verb patterns should be distributed across both paragraphs, not concentrated in one. A section in which all the advanced grammar appears in the first paragraph and the second is written in plain style lacks the coherence of register that C1 writing requires.`,
    writingTask: 'Write a two-paragraph essay section (400–450 words total) responding to the question: "Is the internet a democratising force or a tool of concentrated power?" Choose ONE of the sequencing patterns above (Claim + Counterpoint is recommended). Paragraph 1 should develop one position; Paragraph 2 should either present the counterpoint, develop the consequences, or elaborate the theoretical claim with a specific case. You must use at least two different cleft structures across the section, at least one academic passive and one causative construction, and deliberate inter-paragraph cohesion.',
    wordTarget: 425,
    tasks: [
      task(
        'Plan before writing. Write two topic sentences — one for each paragraph. They should make distinct but related claims, and together they should sketch a two-part argument.',
        'Read the sequencing patterns in the input text. Which pattern fits your argument best? Write the two topic sentences. Do they sound like the same argument or two stages of one argument?',
        'Example pair (Claim + Counterpoint): P1 TS: "What has made the internet appear democratising is its capacity to reduce the cost of producing and distributing information to near zero, thereby dismantling the gatekeeping function previously held by a small number of media institutions." P2 TS: "Yet what this account obscures is that the infrastructure of the internet — the platforms, the algorithms, and the data architecture — has itself become a new and more concentrated form of gatekeeping."'
      ),
      task(
        'Write paragraph 1 (approximately 200 words). Use at least one cleft structure and at least one academic passive. Ensure the PEEL structure is intact.',
        'Aim for a paragraph that is architecturally complete: topic sentence, evidence/example, explanation, link/transition.',
        'Check: Is the claim arguable and precise? Is the evidence framed academically (not "a study says")? Does the explanation analyse rather than summarise? Does the end of the paragraph move toward paragraph 2?'
      ),
      task(
        'Write the opening sentence of paragraph 2. It must signal the inter-paragraph relationship explicitly using one of the cohesion patterns from the input text.',
        'Do not begin with "Secondly" or "Also." Use a sentence that both closes the transition from paragraph 1 and stakes the new claim.',
        'Example: "Yet what the preceding account fails to register is that the apparent democratisation of information access has been accompanied by an unprecedented concentration of the power to shape what information is seen, shared, and amplified."'
      ),
      task(
        'Complete paragraph 2 (approximately 200 words). Use at least one different cleft structure from paragraph 1, and at least one causative construction. Ensure the explanation in this paragraph deepens or complicates the argument — it should not simply repeat the claims of paragraph 1 with different examples.',
        'The second paragraph should advance the argument, not just continue it.',
        'Check: Does paragraph 2 make a distinct point? Does the cleft structure differ from the one used in paragraph 1? Is the causative doing argumentative work (not just adding variety)?'
      ),
      task(
        'Review the complete section. Check: (a) Do the two paragraphs form a coherent two-part argument? (b) Is the inter-paragraph cohesion explicit and appropriate? (c) Are the advanced grammar structures distributed across both paragraphs? (d) Is the register consistently C1 throughout?',
        'Read the section aloud if possible. Does it feel like a unified section or two separate paragraphs that happen to be adjacent?',
        'Checklist: Two distinct but related claims ✓ | Inter-paragraph cohesion sentence ✓ | Two different cleft structures ✓ | Academic passive ✓ | Causative ✓ | 400–450 words ✓ | C1 register throughout ✓'
      ),
    ],
  }),

]);

export const C1_DEEP_ADVANCED_GRAMMAR_PART2_BY_PILLAR = Object.freeze({
  grammar: Object.freeze([]),
  vocabulary: Object.freeze([]),
  reading: Object.freeze(C1_DEEP_ADVANCED_GRAMMAR_PART2.filter(l => l.pillar === 'reading')),
  listening: Object.freeze(C1_DEEP_ADVANCED_GRAMMAR_PART2.filter(l => l.pillar === 'listening')),
  speaking: Object.freeze([]),
  writing: Object.freeze(C1_DEEP_ADVANCED_GRAMMAR_PART2.filter(l => l.pillar === 'writing')),
  checkpoint: Object.freeze([]),
});
