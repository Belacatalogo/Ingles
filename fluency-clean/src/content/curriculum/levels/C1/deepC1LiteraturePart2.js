import { createReadingLesson, createListeningLesson, createWritingLesson } from '../../../schemas/index.js';

const level = 'C1';
const status = 'ready';
const common = { level, status, estimatedMinutes: 70, tags: ['c1-4', 'literature', 'critical-reading', 'academic', 'deep-approved-target'] };

function task(instruction, note = '', expected = '') { return { instruction, note, expected }; }

export const C1_DEEP_LITERATURE_PART2 = Object.freeze([

  // ─── READING-004: Close Reading — The Weight of Things ───────────────────────
  createReadingLesson({
    ...common,
    id: 'C1-READING-004',
    order: 4,
    title: 'Reading: "The Weight of Things" — close reading of a literary passage',
    objectives: [
      'Read a literary passage closely, attending to lexical, syntactic, and tonal features.',
      'Identify and analyse figurative language, imagery, and structural choices.',
      'Answer close reading questions that require inference and interpretive argument.',
      'Distinguish between what the passage states and what it implies.',
    ],
    teacherOpening: 'Close reading is the foundational skill of literary critical analysis. It means reading slowly, attending to specific choices of word and syntax, and asking why those choices produce the effects they do. In this passage, nothing is accidental. Every detail — the length of the sentences, the choice of imagery, the tense shifts — is doing interpretive work. Read it twice: once for the sense, once for the craft.',
    passage: `The Weight of Things

She had not looked at the boxes in three years. They sat in the back of the room that had been his study, stacked with the particular silence of things that have outlasted their purpose. She knew what was in them — she had packed them herself, in the week after the funeral, working methodically, without tears, with the efficiency of someone completing a task that needed completing. That efficiency had frightened her at the time. She understood now that it was a form of tenderness: the only way she had found, in that first week, of staying close to what was already unreachable.

The room smelled of old paper and the particular kind of cold that accumulates in rooms that are not often entered. She stood at the threshold — she had not gone further in three years — and looked at the boxes as though they were capable of looking back. They were not, of course. But she had the sensation, not for the first time, that the objects were waiting: waiting with a patience she did not possess, waiting for some resolution she could not name.

She thought of all the things she had not done. The boxes had not been opened. The books still on the shelves had not been touched. The chair at his desk had been left at an angle, as though he had just stood up from it, and she had not moved it. She had been unable to decide whether to preserve everything or discard everything, and so she had done neither, and the room had become a kind of solution: a preservation that required nothing of her, that demanded no decisions, that asked only that she stay away.

She stepped back from the threshold and closed the door.`,
    wordCount: 295,
    tasks: [
      task(
        'The first paragraph describes the protagonist packing boxes "methodically, without tears, with the efficiency of someone completing a task that needed completing." She then says "That efficiency had frightened her." What is the significance of this self-observation? What does it reveal about her relationship to grief?',
        'Think about why efficiency would be frightening rather than reassuring. What does it suggest about the relationship between outward behaviour and inner experience?',
        'The efficiency is frightening because it dissociates outward function from inward experience — she is performing the actions of grief (packing, completing, ordering) without the emotional markers conventionally associated with it. This frightens her because it suggests either that she does not feel what she should feel, or that her feeling has taken an unrecognisable form. Her retrospective reinterpretation — "a form of tenderness" — is the text\'s first example of the protagonist\'s capacity to reframe behaviour as meaning: the efficiency was not callousness but a way of "staying close to what was already unreachable." The passage figures grief not as emotional display but as proximity management.'
      ),
      task(
        'The second paragraph describes the objects as "waiting." The narrator immediately qualifies this: "They were not, of course." What is the effect of this self-correction, and why does the text include it?',
        'The self-correction is a formal device: the narrator gives a reading, then withdraws it. Why? What does the "of course" do?',
        'The self-correction enacts the protagonist\'s self-awareness — she knows that animating the objects is a projection, not a literal description. The "of course" is dismissive and immediate, yet the sentence that follows ("But she had the sensation...") reinstates exactly the feeling that was just corrected. The effect is to create a gap between the rational correction (objects don\'t wait) and the phenomenological reality (she experiences them as waiting). The text is not saying the objects literally wait; it is saying that the protagonist\'s relation to them is governed by a sensation that her reason cannot fully correct. The formal device (assertion — correction — reinstatement) enacts the structure of grief: the mind knows what is true; the emotional experience exceeds what the mind knows.'
      ),
      task(
        'The chair at the desk "had been left at an angle, as though he had just stood up from it." Why does the protagonist preserve this detail? What does "as though" signal?',
        'Pay attention to the tense and the conditional phrasing. "As though he had just stood up" — what does this imply about the temporal relationship between his death and the present of the scene?',
        '"As though he had just stood up" creates a temporal illusion: the angled chair preserves the physical trace of an action that occurred years ago as though it were recent — as though he might return. "As though" signals that the protagonist knows this is not literally true (he cannot stand up; he is dead) but that the preserved detail sustains a conditional reality. The chair\'s preservation is the most concrete instance of the room\'s function: not to remember the dead but to maintain the physical conditions under which return would be possible, even though it is not. The present tense of the surrounding description ("had been left," "had not been moved") reinforces the stasis: these are not events but conditions, states that have persisted without resolution.'
      ),
      task(
        'The final paragraph describes the room as "a kind of solution: a preservation that required nothing of her, that demanded no decisions, that asked only that she stay away." What is the irony of this "solution"? How does the sentence structure reinforce the meaning?',
        'Think about what a "solution" normally implies. Then consider what this "solution" actually does. Look at the syntactic repetition in the sentence.',
        'The irony is that the "solution" to the problem of grief is no solution at all: it is a deferral that merely preserves the problem in suspended animation. A solution normally resolves a difficulty; this one avoids it permanently. The syntactic structure reinforces this: three parallel clauses ("required nothing of her," "demanded no decisions," "asked only that she stay away") accumulate to describe a situation defined by the absence of demands — which is, ultimately, the absence of engagement. The sentence thus formally enacts what it describes: it goes nowhere; it resolves nothing; it simply lists three ways of avoiding the situation. The protagonist\'s "solution" is the grammatical subject of a clause whose predicate is a catalogue of its own non-interventions.'
      ),
      task(
        'The final sentence is very short: "She stepped back from the threshold and closed the door." How does this sentence work in relation to the preceding paragraph? What does it enact formally?',
        'Consider: what has been described in the three paragraphs before this sentence? What does "the threshold" refer to symbolically as well as literally? What is the effect of the short, plain sentence after the longer, more complex previous paragraph?',
        'The three preceding paragraphs have built a picture of irresolution — the protagonist\'s inability to enter or to leave, to open or to discard, to decide. The final sentence resolves this irresolution — but in the direction of continuation rather than change: she closes the door rather than entering. "The threshold" is both literal (the doorway) and symbolic (the liminal position between engagement with the past and release from it). The short, plain sentence — syntactically simple after the complex, self-reflexive preceding paragraph — performs its content: the action is simple and final in form even though it is, in terms of the protagonist\'s situation, nothing more than a reiteration of the condition she has maintained for three years. The sentence is decisive in tone but achieves nothing new in the story — which is itself the point.'
      ),
    ],
  }),

  // ─── LISTENING-004: Literary Criticism Seminar ───────────────────────────────
  createListeningLesson({
    ...common,
    id: 'C1-LISTENING-004',
    order: 104,
    title: 'Listening: "Reading Against the Grain" — literary criticism seminar on close reading and interpretation',
    objectives: [
      'Follow a complex literary critical discussion with multiple interpretive positions.',
      'Identify the main interpretive claims and the textual evidence offered for them.',
      'Distinguish between descriptive and evaluative readings.',
      'Answer inference, summary, and critical evaluation questions at C1 level.',
    ],
    teacherOpening: 'This is a literature seminar. Four speakers — tutor Dr Okello, and students Mei, Sanjay, and Carlota — are discussing close reading and interpretation. Listen for the interpretive moves each speaker makes and how they use textual evidence.',
    transcript: [
      { speaker: 'Dr Okello', text: 'Today I want to focus on a question that comes up in almost every close reading session: the difference between what a text says and what it means. These aren\'t always the same thing, and some of the most interesting literary analysis happens precisely in the gap between them. Let me start with a concrete example. In our passage from this week, the protagonist stands at the threshold and doesn\'t enter. What does the text say? That she stands at the threshold. What does it mean? Who wants to start?' },
      { speaker: 'Mei', text: 'I read it as an inability to let go. She can\'t enter the room because entering it would mean doing something with the contents — opening the boxes, making decisions — and that would feel like a second loss. Keeping the room exactly as it is preserves something.' },
      { speaker: 'Sanjay', text: 'I had a slightly different reading. I think the threshold is doing more than marking an inability. It\'s a liminal space — she\'s literally and symbolically between states. She hasn\'t committed to grief in the sense of processing and moving on, but she hasn\'t refused grief either. The threshold is where you go when you can\'t be anywhere else.' },
      { speaker: 'Carlota', text: 'I want to push back on both of those readings a little. They both interpret the threshold as a psychological state — as expressing something about where the protagonist is emotionally. But what if we read it more formally? The threshold recurs three times in the passage: at the beginning, in the middle, and in the final sentence. Structurally, the passage begins and ends at the threshold. That\'s not just characterisation — it\'s formal organisation.' },
      { speaker: 'Dr Okello', text: 'Carlota is making an important distinction. The psychological reading and the formal reading aren\'t necessarily incompatible, but they produce different kinds of claims. A psychological reading says something about the character. A formal reading says something about the text — about how it\'s been made. Can you say more about what the formal repetition achieves?' },
      { speaker: 'Carlota', text: 'The passage begins with her arriving at the threshold and ends with her leaving it. Nothing has changed. The formal circularity — beginning and ending in the same place — enacts the protagonist\'s condition rather than merely describing it. She hasn\'t moved, and neither has the text. The form is the content.' },
      { speaker: 'Sanjay', text: 'That\'s a really compelling observation. But I\'m not sure the form enacts stasis without qualification. The final sentence — "She stepped back from the threshold and closed the door" — is syntactically very plain compared to the preceding paragraph. That shift in register seems significant. The previous paragraph is complex, recursive, self-qualifying. The final sentence just... ends. Closes. That contrast feels deliberate.' },
      { speaker: 'Mei', text: 'I noticed that too. The sentence does two things: it\'s formally decisive — it ends the passage cleanly — but in terms of plot, nothing is resolved. She\'s back where she started. So the formal decisiveness and the narrative inconclusiveness are in tension. Is that what you\'d call a dissonance?' },
      { speaker: 'Dr Okello', text: 'That\'s exactly the right term. And the question the dissonance raises is whether the text is endorsing her closure of the door — treating it as an action, a decision — or whether it is ironic about that closure, using the formally decisive sentence to undermine the sense that a decision has been made. What\'s your reading, Sanjay?' },
      { speaker: 'Sanjay', text: 'I think the irony is structural. The final sentence looks like resolution because of its syntactic simplicity, but the reader has been shown, in the preceding three paragraphs, that this action is not a resolution — it\'s a repetition. So the sentence performs resolution while the reader knows it isn\'t one. The gap between performance and knowledge is where the meaning lives.' },
      { speaker: 'Dr Okello', text: 'That\'s a strong close reading. Let me add one more layer. The sentence has two verbs: "stepped back" and "closed." Two actions. In terms of physical space, "stepped back" is a regression — a movement away from something — and "closed" is a termination. If we take those two verbs seriously as formal choices, what are they saying about the relationship between retreat and closure?' },
      { speaker: 'Carlota', text: 'That stepping back comes before closing. You have to retreat before you can close. The sequence matters. Closure isn\'t possible without prior withdrawal — which is maybe what the whole passage has been about: the impossibility of closing without first having the courage to step back, which she\'s been unable to do for three years and now, finally, can.' },
    ],
    tasks: [
      task(
        'What distinction does Dr Okello draw in turn 5 between a "psychological reading" and a "formal reading"? Which type of claim does each produce, and why does the tutor say they "aren\'t necessarily incompatible"?',
        'Focus on turns 4 and 5. What is the difference between saying something about the character versus something about the text?',
        'A psychological reading produces claims about the character — about their emotional state, motivation, or inner life. A formal reading produces claims about the text — about how it has been constructed, what formal choices the author has made, and what effects those choices produce. Dr Okello says they are not necessarily incompatible because a formal choice (the repetition of the threshold) can simultaneously characterise a psychological state and achieve a formal effect. The distinction is between levels of analysis, not between incompatible approaches.'
      ),
      task(
        'Carlota argues that "the form is the content." What does this mean, and what specific textual evidence does she offer to support it?',
        'Listen to turns 4 and 6. What is "formal circularity" and what does it "enact"?',
        '"The form is the content" means that the structure of the text — how it is organised — does not merely package a meaning but is itself the meaning. Carlota\'s evidence is the formal circularity: the passage begins and ends at the threshold. Since nothing has changed in the narrative (the protagonist arrives at the threshold, does not enter, leaves), the formal structure (circular, returning to the starting point) enacts the protagonist\'s condition of stasis rather than merely describing it. The text does not just say she is stuck; its form is itself stuck.'
      ),
      task(
        'Sanjay makes a claim about the "register shift" in the final sentence (turn 7). What is the shift, and what does he argue it signals?',
        'What was the register of the preceding paragraph? What is the register of the final sentence? What does the contrast between them produce?',
        'The preceding paragraph is "complex, recursive, self-qualifying" — syntactically elaborate and self-examining. The final sentence is syntactically plain: two verbs, no subordinate clauses, no qualification. Sanjay argues that this shift in register signals something significant about the relationship between the formal decisiveness of the sentence (it ends cleanly) and its narrative inconclusiveness (nothing is resolved).'
      ),
      task(
        'Sanjay\'s final interpretive claim is that "the gap between performance and knowledge is where the meaning lives." What does this mean, and what is the evidence he gives?',
        'Listen to turn 10. What is being "performed"? What does the "reader know"? How does this produce meaning?',
        'The final sentence performs resolution — syntactically, it looks decisive and final. But the reader knows (from the preceding three paragraphs) that closing the door is not a resolution but a repetition: she has been staying away from this room for three years, and closing the door is just another instance of that. The meaning is located in the gap between what the sentence appears to achieve (resolution) and what the reader understands it actually achieves (repetition, continuation). This is what Sanjay means by "structural irony" in turn 10.'
      ),
      task(
        'Dr Okello\'s final question draws attention to the two verbs in the last sentence: "stepped back" and "closed." Carlota offers an interpretation in the final turn. Do you find her reading compelling? Why or why not?',
        'Carlota argues that the sequence (step back, then close) is meaningful: closure requires prior withdrawal. Is this reading supported by the passage as a whole?',
        'Open-ended. A strong answer would: assess whether Carlota\'s reading is supported by the passage (does the rest of the text suggest that "stepping back" is an act of courage rather than avoidance?), note any counterarguments (one could argue that stepping back continues the avoidance rather than enabling closure), and come to a reasoned position using literary critical vocabulary.'
      ),
    ],
  }),

  // ─── WRITING-007: Literary critical paragraph ────────────────────────────────
  createWritingLesson({
    ...common,
    id: 'C1-WRITING-007',
    order: 7,
    title: 'Writing: The literary critical paragraph — close reading, integrated quotation, and interpretive argument',
    objectives: [
      'Write a literary critical body paragraph (200–250 words) with a clear interpretive claim.',
      'Integrate a quotation grammatically using at least one of the citation patterns from C1.4.',
      'Provide analytical commentary that advances interpretation beyond description.',
      'Use literary critical vocabulary from C1.4 (figure, enact, foreclose, ambiguity, register, voice).',
    ],
    teacherOpening: 'A literary critical paragraph makes an interpretive claim, supports it with textual evidence (usually a quotation), and then analyses the evidence in a way that both supports the claim and reveals something about the text that the claim alone does not show. The analysis must add — it cannot merely repeat the quotation or the claim in simpler words.',
    inputText: `Literary critical paragraph structure:

CLAIM (topic sentence): A specific, arguable interpretive claim about a text. Not: "The author uses imagery of light and darkness." Yes: "The systematic substitution of moral darkness for physical light throughout the novel\'s central section constructs a world in which illumination is not merely absent but structurally foreclosed."

EVIDENCE (integrated quotation): The quotation embedded grammatically in the analytical sentence, not introduced by a colon. Not: "The author writes: \'The darkness was everywhere.\'" Yes: "The claim reaches its most explicit articulation in the novel\'s third chapter, where the darkness is described as having \'swallowed even the possibility of light\' — a formulation that attributes agency to the darkness rather than merely to the conditions that produce it."

ANALYSIS (what the evidence shows): Analysis that goes beyond the quotation. Not: "This shows that the novel is dark." Yes: "The attribution of agency to the darkness — its capacity not just to obscure but to \'swallow\' — figures the condition as predatory rather than merely environmental, foregrounding the protagonist\'s relation to it as one of victimhood rather than navigation."

EXTENSION or LINK: A sentence that either extends the analysis to a pattern in the text, or connects the point to the broader argument. Not: "In conclusion, this shows that the novel deals with darkness." Yes: "This figuration of darkness as an active, consuming force recurs throughout the second half of the novel and is, I want to argue, inseparable from the text\'s broader claim about the impossibility of individual agency in conditions of systemic violence."`,
    writingTask: 'Write a literary critical body paragraph (200–250 words) about a text you know — a novel, poem, play, or film. Your paragraph must: (a) begin with a specific interpretive claim; (b) integrate a quotation using one of the citation patterns from C1.4 Grammar lesson; (c) add analytical commentary that goes beyond what the quotation states; (d) use at least two words from the C1.4 vocabulary lists (figure, enact, subvert, foreclose, recuperate, interrogate, ambiguity, register, voice, dissonance, lacuna, liminal).',
    wordTarget: 225,
    tasks: [
      task(
        'Write the topic sentence (the claim). It should be arguable and specific — it should name something the text does, and it should make a claim about what that doing achieves or reveals.',
        'Avoid: "The author uses a lot of symbolism." Include: what the symbolism does, and what that doing reveals about the text\'s meaning or formal design.',
        'Example: "The systematic displacement of the novel\'s most politically charged content onto the figure of the madwoman — a liminal character who speaks in metaphors that the other characters consistently misread — enacts the novel\'s central claim about the conditions under which politically inconvenient truths must circulate to survive."'
      ),
      task(
        'Identify the quotation you will use and draft the sentence in which it will be integrated. The quotation should be the most precise, most revealing piece of language the text provides for your claim — not the most dramatic or memorable.',
        'Choose the quotation that best supports the specific claim you are making, not the most famous one. Then decide which citation pattern you will use to integrate it.',
        'Ask yourself: does this quotation support the claim I made in my topic sentence? Is the language of the quotation itself evidence for the claim? Can I say something analytically interesting about the specific words, syntax, or imagery used?'
      ),
      task(
        'Write the analytical commentary. It must go beyond the quotation — it must say something about the language, syntax, or structure of the quotation that the reader could not have inferred from reading the quotation alone.',
        'Ask: what does the specific word choice / syntax / image / tense / tone do? What does the text figure, enact, subvert, or foreclose by making this choice?',
        'The analysis should be longer than the quotation. If your analysis merely paraphrases the quotation ("this shows that X"), you have not yet analysed it. Analysis answers the question "how does this quotation do what it does?" not just "what does it say?"'
      ),
      task(
        'Write the extension or link sentence. It should either (a) generalise from this instance to a pattern in the text, or (b) connect the point to your broader argument.',
        'Do not begin with "In conclusion." The extension should feel like a natural continuation of the analysis, moving outward from the specific instance to its significance.',
        'Example: "This displacement of political content onto an unreliable and marginalised speaker recurs at each of the novel\'s structural transitions and is, I would argue, the formal mechanism through which the text both makes and disavows its most radical claims — a recuperation that is the price of the novel\'s survival within the literary marketplace of its time."'
      ),
      task(
        'Review the complete paragraph. Check: Is the claim arguable and specific? Is the quotation integrated (not introduced by a colon)? Does the analysis add interpretation beyond description? Does the extension connect the point to a pattern or argument? Are at least two vocabulary words used?',
        'Read the paragraph aloud. Does it sound analytical, or descriptive? Does it tell you something about the text that you did not know from reading the quotation alone?',
        'Checklist: Arguable, specific claim ✓ | Quotation grammatically integrated ✓ | Analysis adds interpretation ✓ | Extension connects to pattern/argument ✓ | Two vocabulary words used ✓ | 200–250 words ✓'
      ),
    ],
  }),

  // ─── WRITING-008: Literary critical essay introduction ───────────────────────
  createWritingLesson({
    ...common,
    id: 'C1-WRITING-008',
    order: 8,
    title: 'Writing: The literary critical essay introduction — framing a reading, scoping a thesis',
    objectives: [
      'Write a literary critical essay introduction (150–200 words) that frames an interpretive question, establishes the text\'s significance, and states a specific thesis.',
      'Distinguish between a thesis about a text and a general claim about its topic.',
      'Signal the critical approach and scope of the argument.',
      'Use literary critical vocabulary in the introduction.',
    ],
    teacherOpening: 'A literary critical introduction does something specific: it frames a question about how a text works and why it matters. It does not summarise the text; it does not provide biographical context as a substitute for analysis; and it does not state the "topic" of the text (love, death, identity). It states the interpretive claim that the essay will develop and defends. The thesis of a literary critical essay is always a claim about the text — not a claim about the world that the text happens to be about.',
    inputText: `Literary critical introduction structure:

1. FRAMING THE INTERPRETIVE QUESTION (1–2 sentences): What question does the text raise, and why is it worth asking? Do not summarise the plot. Frame the analytical or interpretive problem.

2. THE TEXT'S SIGNIFICANCE (1–2 sentences): What is distinctive or problematic about this text? Why does it require the particular kind of analysis the essay will perform? (Not: "It is a famous novel." Yes: "Its refusal of stable point of view makes the assignment of moral responsibility structurally impossible, which is precisely what makes it ethically interesting.")

3. THE THESIS (1–2 sentences): A specific, arguable claim about how the text works and what it achieves or forecloses. The thesis should name the formal feature or interpretive crux that the essay will analyse. Use appropriate hedging.

4. SCOPE AND APPROACH (1 sentence): Specify the scope of the analysis (which aspects of the text, which theoretical lens if any, which passages primarily).

Example of a weak literary critical introduction:
"This essay will discuss Great Expectations by Charles Dickens. It is a very famous novel about a boy called Pip who grows up poor but becomes a gentleman. The themes are social class and identity. This essay will look at how Dickens presents these themes."

Example of a strong C1 literary critical introduction:
"Great Expectations stages its central argument — that the aspiration to gentility is inseparable from an act of self-falsification — through the figure of the orphan: a subject who has no origin to disown and must therefore construct a self-serving fiction of origin as the condition of social ascent. What makes this argument philosophically interesting is its refusal to locate the falsification in Pip\'s social ambition per se; instead, Dickens distributes the guilt of self-making across the entire social apparatus through which gentility is conferred and recognised. This essay argues that the figure of Magwitch — ostensibly the text\'s most socially abject character — functions as the structural site at which this distribution becomes visible: the point at which the novel\'s ideological work is most legible precisely because it is under the greatest pressure. The analysis focuses on the novel\'s third volume and draws primarily on the scenes of recognition and disclosure."`,
    writingTask: 'Write a literary critical introduction (150–200 words) for an essay on a literary text you know well. You may choose the essay question, but it must be a question about how the text works — a formal, structural, or interpretive question — not a question about its topic or its historical context. Your introduction must follow the four-part structure and include the thesis as a specific, arguable, appropriately hedged claim about the text.',
    wordTarget: 175,
    tasks: [
      task(
        'Write your essay question first. It must be about how the text works, not about what it is "about." Then write the framing sentences that introduce the interpretive problem without summarising the plot.',
        'Good essay question forms: "How does X construct / subvert / figure / foreclose Y?" or "To what extent does X\'s formal structure support / undermine its apparent thematic claim about Y?" Avoid: "What is the role of X in Y?"',
        'Example question: "To what extent does \'The Turn of the Screw\' structurally undermine the possibility of reading the governess as a reliable narrator?" Example framing: "The question of narrative reliability is not merely a feature of \'The Turn of the Screw\' — it is its central formal preoccupation. The text invites, sustains, and ultimately refuses to resolve a reading of the governess that can be made consistently in two incompatible ways."'
      ),
      task(
        'Write the text\'s significance sentences. Why does this text require the particular kind of analysis the essay will perform? What makes it analytically interesting or problematic?',
        'Think about what is unusual, difficult, or formally distinctive about the text. What question does it raise that a straightforward reading cannot answer?',
        'The significance should be analytical: "this text is interesting because of X formal feature" or "this text\'s treatment of Y makes Z assumption problematic." Not: "this text is important because it is canonical" or "this text explores universal themes."'
      ),
      task(
        'Write your thesis. It must be specific and arguable. It must be a claim about the text — about what it does, achieves, subverts, or forecloses — not a claim about the world. Use appropriate hedging.',
        'Test your thesis: could someone reasonably disagree with it on textual grounds? If not, it is too general or too obvious. If yes, it is arguable — and you need to support it.',
        'Example: "This essay argues that the text\'s systematic deployment of free indirect discourse — a technique that dissolves the boundary between narrator and character — serves not to produce empathy but to implicate the reader in the protagonist\'s failures of moral perception, foregrounding the reading experience itself as a site of ethical vulnerability."'
      ),
      task(
        'Write the scope sentence. Specify what the essay will analyse: which aspects, which passages, which theoretical lens if relevant. Make clear what the essay will not do.',
        'The scope sentence prevents readers from expecting something you won\'t deliver. It also demonstrates that you have made deliberate analytical choices.',
        'Example: "The analysis focuses primarily on the novel\'s use of interior monologue and close third-person narration and does not address the biographical or historical contexts of composition, which are well covered in existing scholarship."'
      ),
    ],
  }),

]);

export const C1_DEEP_LITERATURE_PART2_BY_PILLAR = Object.freeze({
  grammar: Object.freeze([]),
  vocabulary: Object.freeze([]),
  reading: Object.freeze(C1_DEEP_LITERATURE_PART2.filter(l => l.pillar === 'reading')),
  listening: Object.freeze(C1_DEEP_LITERATURE_PART2.filter(l => l.pillar === 'listening')),
  speaking: Object.freeze([]),
  writing: Object.freeze(C1_DEEP_LITERATURE_PART2.filter(l => l.pillar === 'writing')),
  checkpoint: Object.freeze([]),
});
