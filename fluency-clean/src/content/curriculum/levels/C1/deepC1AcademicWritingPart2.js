import { createReadingLesson, createListeningLesson, createSpeakingLesson, createWritingLesson } from '../../../schemas/index.js';

const level = 'C1';
const status = 'ready';
const common = { level, status, estimatedMinutes: 70, tags: ['c1-6', 'academic-writing', 'essays', 'critical-reviews', 'deep-approved-target'] };

function task(instruction, note = '', expected = '') { return { instruction, note, expected }; }

export const C1_DEEP_ACADEMIC_WRITING_PART2 = Object.freeze([

  // ─── READING-006: Academic Critical Review ───────────────────────────────────
  createReadingLesson({
    ...common,
    id: 'C1-READING-006',
    order: 6,
    title: 'Reading: "The Limits of Objectivity" — a critical review of methodology in social science research',
    objectives: [
      'Read a dense academic critical review at C1 level and identify its argumentative moves.',
      'Distinguish between the source text being reviewed and the reviewer\'s position.',
      'Answer inference, text-structure, and critical evaluation questions at C1 level.',
    ],
    teacherOpening: 'This passage is written in the genre of the academic critical review — a text that engages with another scholar\'s work, summarises its argument, identifies its methodology, and evaluates its strengths and weaknesses. Notice how the reviewer uses hedged language to signal evaluation and how they distinguish between what the author claims and what the reviewer believes.',
    passage: `The Limits of Objectivity: A Critical Review of Hartley's "Neutrality and Method in the Social Sciences"

Marcus Hartley's Neutrality and Method in the Social Sciences represents an ambitious attempt to recover a defensible concept of objectivity for social-science research in the post-positivist era. Hartley's central claim is that methodological transparency — the explicit documentation of research design decisions, sampling criteria, and analytical assumptions — can function as a procedural substitute for the classical positivist ideal of observer-independence. It is a sophisticated argument, and in many respects a compelling one; but it rests on a distinction that this reviewer finds ultimately difficult to sustain.

Hartley proceeds by distinguishing between "substantive objectivity" (freedom from value commitments in the framing of research questions) and "procedural objectivity" (consistency, transparency, and reproducibility in the execution of a given methodology). He argues, plausibly enough, that the first is unattainable in the social sciences: researchers cannot choose research questions that are value-neutral, because the identification of what counts as a significant social phenomenon is itself a value-laden act. Where Hartley's argument becomes most interesting — and most contestable — is in his claim that procedural objectivity, rigorously pursued, can compensate for the absence of substantive objectivity. If the research design is fully transparent, the argument runs, then readers can evaluate the value commitments embedded in the design and adjust their interpretation of the findings accordingly.

The problem with this position, from the perspective of this reviewer, is that it assumes a level of methodological literacy on the part of readers that the social-science literature cannot generally presuppose. Procedural transparency is only as effective as the reader's capacity to interrogate it. A highly technical discussion of sampling strategy is transparent to the statistician but opaque to the policy-maker — and it is often policy-makers who constitute the most consequential audience for social-science research. Hartley's model, in effect, relocates the problem of objectivity from the researcher to the reader, without fully confronting the implications of doing so.

This is not to say that the project fails. Hartley's documentation of the range of methodological choices available to the social scientist, and his careful analysis of the value implications of each, constitute a genuinely useful contribution. His chapter on the treatment of outliers in qualitative research is particularly strong. But the overarching theoretical claim — that procedural transparency is a satisfactory substitute for substantive objectivity — remains, in this reviewer's assessment, not fully established.`,
    wordCount: 355,
    tasks: [
      task(
        'What is Hartley\'s central claim, as summarised in the first paragraph? How does the reviewer signal both agreement and disagreement in paragraph 1?',
        'Re-read paragraph 1. Look for the evaluative adjectives and the phrase that signals the reviewer\'s reservation. How does the reviewer balance acknowledgement with critique?',
        'Hartley\'s central claim is that methodological transparency can serve as a procedural substitute for classical positivist observer-independence. The reviewer signals agreement through positive adjectives ("sophisticated," "compelling") and simultaneous reservation through a contrastive structure: "but it rests on a distinction that this reviewer finds ultimately difficult to sustain." The word "ultimately" softens the criticism while affirming it. The reviewer is performing the academic convention of crediting the work before challenging it — a move that signals engagement rather than dismissal.'
      ),
      task(
        'What distinction does Hartley draw between "substantive objectivity" and "procedural objectivity"? Explain both terms in your own words.',
        'Re-read paragraph 2. The distinction is introduced clearly. Make sure you distinguish between what the terms mean and Hartley\'s claim about each.',
        'Substantive objectivity means freedom from value commitments in the framing of research questions — choosing to study something neutral. Procedural objectivity means consistency, transparency, and reproducibility in the execution of research once a topic is chosen. Hartley concedes that substantive objectivity is unattainable in the social sciences (because choosing what counts as significant is itself value-laden) but argues that procedural objectivity, rigorously pursued, can compensate — because transparent design allows readers to identify and adjust for embedded value commitments.'
      ),
      task(
        'What is the reviewer\'s specific objection to Hartley\'s argument? How does the reviewer describe the problem in terms of the "relocation" of an issue?',
        'Re-read paragraph 3. The reviewer uses the phrase "relocates the problem" — what does this mean precisely?',
        'The reviewer\'s objection is that procedural transparency only works if readers have sufficient methodological literacy to interrogate it. Highly technical transparency may be meaningful to specialists but opaque to policy-makers — who are often the most consequential audience for social science research. The reviewer says Hartley\'s model "relocates the problem of objectivity from the researcher to the reader" — meaning that instead of solving the problem of value-laden research, it shifts the burden of identifying and correcting for those values onto readers who may lack the tools to do so. The problem is not eliminated; it is displaced.'
      ),
      task(
        'Does the reviewer conclude that Hartley\'s book fails? What specific aspect does the reviewer praise, and what remains unestablished in their view?',
        'Re-read paragraph 4. The reviewer uses a two-part structure: what the project achieves vs. what the overarching claim fails to prove.',
        'The reviewer does not conclude that the project fails overall. They praise the documentation of methodological choices available to social scientists and the analysis of their value implications — describing these as "a genuinely useful contribution." The chapter on outliers in qualitative research is specifically commended. However, the "overarching theoretical claim" — that procedural transparency is a satisfactory substitute for substantive objectivity — remains "not fully established" in the reviewer\'s assessment. The book is valuable for what it documents, but falls short of proving its most ambitious theoretical argument.'
      ),
      task(
        'Identify THREE examples of hedged language in the text that signal the reviewer is expressing an opinion rather than a fact. Explain how each hedge functions.',
        'Look for phrases like "in this reviewer\'s assessment," "from the perspective of," or evaluative qualifiers. Think about why a reviewer would choose hedged rather than direct language.',
        'Examples include: (1) "this reviewer finds ultimately difficult to sustain" — "finds" frames the objection as a personal judgment; "ultimately" softens while affirming it; (2) "from the perspective of this reviewer" — explicitly marks the following claim as one viewpoint; (3) "in this reviewer\'s assessment, not fully established" — the formal third-person self-reference distances the judgment from mere opinion while still acknowledging its subjective nature. Academic reviewing uses these hedges to signal the author\'s awareness that their evaluation is not the only possible one — maintaining the professional conventions of scholarly discourse.'
      ),
    ],
  }),

  // ─── LISTENING-006: Academic seminar discussion ───────────────────────────────
  createListeningLesson({
    ...common,
    id: 'C1-LISTENING-006',
    order: 106,
    title: 'Listening: "What Makes a Good Essay?" — a postgraduate seminar on academic argumentation',
    objectives: [
      'Follow a complex academic seminar discussion at C1 level and track multiple positions.',
      'Identify how participants frame disagreement respectfully in academic discourse.',
      'Distinguish between different views on essay structure and argumentation.',
      'Answer inference, position-tracking, and evaluative questions at C1 level.',
    ],
    teacherOpening: 'This is a postgraduate seminar discussion in which a professor and three students explore what distinguishes a strong academic essay from a weak one. Listen for the different positions each participant takes and the specific criteria they use. Notice the language of academic disagreement and how participants manage the social dimension of scholarly debate.',
    transcript: [
      { speaker: 'Prof. Chen', text: 'Let\'s start with a simple question that turns out to be quite complicated: what makes a good essay? Not a technically competent essay — one that has a clear structure and correct references — but a genuinely strong piece of academic writing. What\'s the difference?' },
      { speaker: 'Amara', text: 'I think the difference is in the quality of the argument. A technically competent essay can have a structure — introduction, three main points, conclusion — but if those three points don\'t add up to a sustained argument, it\'s just an organised list. A strong essay has a through-line: every paragraph advances a single developing position.' },
      { speaker: 'Prof. Chen', text: 'That\'s a useful way of putting it. What do others think? Is "a developing position" the right way to characterise it, or would you frame it differently?' },
      { speaker: 'Finn', text: 'I\'d want to add something about the handling of counter-evidence. The essays I find most impressive are the ones where the writer engages seriously with the objections to their position — not to dismiss them, but to genuinely grapple with them. An essay that only marshals evidence in one direction starts to feel like advocacy rather than scholarship.' },
      { speaker: 'Amara', text: 'I think that\'s true, but I\'d distinguish between engaging with counter-evidence and merely acknowledging it. You can have a paragraph that says "some scholars argue X; however, this paper argues Y" — that\'s not genuine engagement. Genuine engagement means explaining why X is wrong, or why Y is better supported, or why the apparent tension between X and Y dissolves under a different framing.' },
      { speaker: 'Lena', text: 'Can I push back on the framing slightly? Both of you are talking as if the goal of an essay is to win an argument — to arrive at a position and defend it against all objections. But in some fields, the most important academic essays are the ones that open up a problem rather than close it down. They show that something we thought we understood is actually more complicated. That doesn\'t fit your "developing position" model.' },
      { speaker: 'Finn', text: 'I think that\'s a fair challenge, but I\'d say that even a "problem-opening" essay has a position — it\'s just that the position is "this is more complex than it looks." Showing that a problem is genuinely complex is itself an argumentative claim. It requires evidence and reasoning. So I\'m not sure the "opening up" versus "closing down" distinction is as clean as you\'re suggesting.' },
      { speaker: 'Prof. Chen', text: 'Let me offer another dimension: what about the quality of the prose? Is good writing — in the sense of elegant, well-crafted sentences — part of what makes an essay academically strong, or is it a separate virtue, a kind of bonus?' },
      { speaker: 'Lena', text: 'I think it\'s intrinsic, not a bonus. Vague writing almost always reflects vague thinking. When you can\'t express something clearly, it usually means you don\'t understand it clearly enough yet. The discipline of making your reasoning visible on the page forces you to find the gaps in your own argument. In that sense, writing is thinking, not just the reporting of thinking.' },
      { speaker: 'Amara', text: 'I agree, but with a caveat: there\'s a kind of prose that\'s elegant at the sentence level but actually obscures the argument at the level of the whole text. Some of the most beautifully written essays are very hard to follow because the local elegance comes at the cost of the through-line. So clarity at every level — sentence, paragraph, and whole text — is what matters, not just stylistic grace.' },
      { speaker: 'Prof. Chen', text: 'A nice synthesis. So: a developing position, genuine engagement with counter-evidence, and multi-level clarity. Are those three things sufficient, or is something still missing?' },
      { speaker: 'Finn', text: 'I\'d add: a genuine contribution. Even if an essay does all three things well, if it\'s just restating what\'s already been said, it\'s not a strong academic essay — it\'s a competent summary. The genuinely strong essay says something that wasn\'t obvious before you read it.' },
    ],
    tasks: [
      task(
        'What criterion does Amara introduce in turn 2? What is the distinction she draws between a "technically competent" essay and a "genuinely strong" one?',
        'Listen to Amara\'s first turn. The key term she introduces is the "through-line." What does this mean?',
        'Amara argues that a technically competent essay can have structure (introduction, three points, conclusion) without having a genuine argument — because the three points may not add up to a sustained developing position, making the essay an "organised list." The distinguishing feature of a strong essay is a "through-line": every paragraph advances a single developing position. The criterion is not structure per se, but the progressive development of a unified argument across the text.'
      ),
      task(
        'Lena challenges the framework established by Amara and Finn in turn 6. What is her challenge? How does Finn respond in turn 7?',
        'Listen to turns 6 and 7. Lena uses the phrase "opening up versus closing down." What does this mean, and how does Finn address it?',
        'Lena challenges the assumption that essays are primarily argument-winning exercises. She argues that in some fields, the strongest essays are those that open up a problem — showing it is more complex than assumed — rather than arriving at a settled position. This doesn\'t fit the "developing position" model. Finn responds by arguing that even a "problem-opening" essay has a position: "this is more complex than it looks" is itself an argumentative claim requiring evidence and reasoning. He suggests the distinction between "opening up" and "closing down" is not as clean as Lena implies — both require the same core argumentative structure.'
      ),
      task(
        'What is Lena\'s view on the relationship between prose quality and academic strength (turn 9)? How does Amara qualify this view in turn 10?',
        'Listen to turns 9 and 10. Lena argues that writing is thinking, not just reporting. Amara agrees but adds a caveat. What is the caveat?',
        'Lena argues that good prose is intrinsic to academic quality, not a bonus, because vague writing reflects vague thinking. The discipline of making reasoning visible forces writers to identify gaps in their argument — "writing is thinking." Amara agrees with this but adds the caveat that elegance at the sentence level can actually obscure the argument at the whole-text level. Some beautifully written essays are hard to follow because local stylistic grace comes at the cost of the through-line. The relevant criterion is multi-level clarity (sentence, paragraph, and whole text), not stylistic elegance alone.'
      ),
      task(
        'At the end of the seminar, Prof. Chen offers a synthesis of three criteria. What are they? What does Finn add as a fourth criterion in the final turn, and why does he consider it necessary?',
        'Listen to the final two turns. Prof. Chen\'s synthesis is presented as a question. What is the fourth criterion Finn introduces, and why is it needed?',
        'Prof. Chen\'s synthesis: (1) a developing position, (2) genuine engagement with counter-evidence, (3) multi-level clarity. Finn adds (4) a genuine contribution — the essay must say something that wasn\'t obvious before you read it. He considers this necessary because an essay could, in principle, satisfy all three existing criteria while still being a competent summary of existing scholarship rather than an original contribution. Without the criterion of genuine contribution, the model does not distinguish between a strong academic essay and a well-structured literature review.'
      ),
    ],
  }),

  // ─── SPEAKING-006: Academic argument presentation ────────────────────────────
  createSpeakingLesson({
    ...common,
    id: 'C1-SPEAKING-006',
    order: 6,
    title: 'Speaking: Presenting and defending an academic argument — structure, evidence, and counter-argument',
    objectives: [
      'Present a structured academic argument clearly and confidently at C1 level.',
      'Use formal academic spoken register appropriate to seminar and presentation contexts.',
      'Respond to challenges and counter-arguments without becoming defensive.',
      'Use hedging, signposting, and concession language fluently in speech.',
    ],
    teacherOpening: 'In academic contexts, you need to be able to speak as well as write about complex ideas. This lesson practises the genre of the academic presentation and seminar contribution — contexts in which you must present a position, support it with evidence, and defend it under challenge. The goal is not to "win" the argument but to demonstrate rigorous thinking and good academic discourse habits.',
    prompt: 'Choose ONE of the following positions and prepare to defend it in a 3–4 minute spoken presentation, followed by questions from your teacher:\n\n(A) "Objectivity in academic research is an ideal that should be explicitly abandoned, not defended or rehabilitated."\n(B) "The essay format is poorly suited to disciplines where knowledge is primarily quantitative."\n(C) "Academic writing that is difficult to read is rarely difficult because of the complexity of its ideas."',
    tasks: [
      task(
        'Open your presentation by stating your position clearly and explaining why the question is worth examining. Aim for 30–40 seconds of opening.',
        'Avoid starting with "I think" immediately. Use an academic framing: "The question of X has…", "This presentation argues that…", "There is a temptation to assume… but…"',
        'Evaluate: Is the position clear and specific? Does the opening explain why the issue matters? Is the register formal and academic without being stilted? Is there a through-line signalled from the start?'
      ),
      task(
        'Develop your argument in 2–3 main points. For each point, state the claim, give a concrete example or piece of evidence, and explain the connection between the evidence and the claim.',
        'Signal your structure explicitly: "My first point concerns… / Turning now to… / The third and perhaps most important dimension is…" This is standard academic spoken practice.',
        'Evaluate: Are the points distinct from one another? Does the evidence actually support the claim, or is the connection assumed? Is the structure signposted clearly enough to follow in real time?'
      ),
      task(
        'Anticipate one strong objection to your position and respond to it before you are challenged. Use the academic concession-rebuttal move.',
        'Model: "A natural objection to this position is… [state the objection fairly]. However, / Nevertheless, / This objection, while not without force, ultimately…" Do not dismiss the objection — engage it.',
        'Evaluate: Is the objection stated fairly and clearly? Does the response engage the substance of the objection rather than deflecting? Is the concession-rebuttal move performed smoothly, without undermining the main argument?'
      ),
      task(
        'Respond to a challenge from your teacher. Your teacher will pose one of the following: (a) "Can you give a more specific example?" (b) "How would you respond to someone who argues [opposing position]?" (c) "Isn\'t your argument based on an assumption that may not hold in all cases?" Respond without preparation time.',
        'Listen carefully before responding. It is acceptable to say "That\'s a useful challenge — let me think about it for a moment" before answering. The goal is engagement, not speed.',
        'Evaluate: Did the student listen to the full challenge before responding? Did they engage the substance of the challenge? Did they maintain their position where appropriate, or concede where appropriate? Was the language register consistent?'
      ),
      task(
        'Close your presentation with a brief summary and a forward-looking statement. What is the take-away? What remains open or unresolved?',
        'Academic conclusions are not final verdicts — they acknowledge what has been established and what requires further investigation. "This presentation has argued… however, the question of X remains open…"',
        'Evaluate: Does the conclusion accurately summarise what was argued (not what was intended)? Does it acknowledge genuine complexity? Is it proportionate to the length and depth of the presentation?'
      ),
    ],
  }),

  // ─── WRITING-011: Argumentative essay ────────────────────────────────────────
  createWritingLesson({
    ...common,
    id: 'C1-WRITING-011',
    order: 11,
    title: 'Writing: The argumentative essay — sustained position, counter-argument, and synthesis',
    objectives: [
      'Write a sustained argumentative essay (350–400 words) with a clear thesis, developed argument, and conclusion.',
      'Integrate a counter-argument using academic concession-rebuttal structure.',
      'Use appropriate academic register, hedging, and signposting throughout.',
      'Distinguish between claim, evidence, and inference in academic argumentation.',
    ],
    teacherOpening: 'The argumentative essay is one of the most fundamental genres in academic writing. At C1 level, the expectation is not just a series of points but a sustained, developing argument that takes the reader somewhere — a position reached through reasoning, not merely asserted. This lesson builds the full essay in structured stages.',
    inputText: `Essay structure for academic argumentation:

THESIS (1 paragraph): A specific, arguable claim — not a statement of fact and not a question. The thesis should be narrow enough to be developed in detail and strong enough to require argument.

ARGUMENT (2–3 paragraphs): Each paragraph develops one dimension of the thesis. Each paragraph should: state a sub-claim, provide evidence or reasoning, and explain the connection between the evidence and the sub-claim. End each paragraph by connecting back to the thesis.

COUNTER-ARGUMENT AND REBUTTAL (1 paragraph): State the strongest objection to your thesis fairly and fully. Then respond — either by showing that the objection doesn't apply to your specific claim, or that the evidence for it is weaker than it appears, or by conceding a partial point while maintaining the core thesis.

CONCLUSION (1 paragraph): Restate the thesis in new language. Summarise the path of the argument. Acknowledge what remains open or unresolved.

Prompt: Choose ONE:
(A) "Social media has fundamentally changed what it means to be a 'public intellectual' — and not for the better."
(B) "University education should focus on developing transferable skills rather than discipline-specific knowledge."
(C) "The distinction between 'high' and 'popular' culture is no longer meaningful in the twenty-first century."`,
    writingTask: 'Write a full argumentative essay (350–400 words) on your chosen prompt. Your essay must include: a clear thesis in the opening paragraph; at least two developed argument paragraphs with evidence or reasoning; one counter-argument and rebuttal paragraph; and a conclusion that does not merely repeat the introduction.',
    wordTarget: 375,
    tasks: [
      task(
        'Write your thesis paragraph. State your position clearly and specifically. Explain why this question matters and preview the structure of your argument.',
        'Avoid: vague theses ("social media has changed society"), questions as thesis statements ("Is social media good or bad?"), and restating the prompt without taking a position. Your thesis must be arguable — someone could reasonably disagree with it.',
        'Example (Prompt A): "The public intellectual, as traditionally understood, was defined by depth of expertise, sustained argument, and distance from immediate popularity. Social media has not merely changed the platform on which public intellectuals operate — it has restructured the incentive system that shapes what they say and how they say it, rewarding provocation over nuance in ways that are systematically damaging to the quality of public discourse."'
      ),
      task(
        'Write your first argument paragraph. State a sub-claim that supports your thesis. Provide specific evidence or reasoning. Explain the connection between the evidence and your thesis — do not assume the reader will make the connection.',
        'The connection is the most commonly missing element in student essays. After presenting evidence, explicitly explain why it supports your specific thesis claim. Use transitions: "This suggests that… / What this reveals is… / The implication for the argument above is…"',
        'Evaluate: Is the sub-claim clearly stated at the start of the paragraph? Is the evidence specific (names, examples, data) rather than vague ("many studies have shown")? Is the connection between evidence and thesis explicitly drawn? Does the paragraph end in a way that connects back to the thesis?'
      ),
      task(
        'Write your second argument paragraph. This should develop a different dimension of the thesis — not a repetition of the first point with different examples.',
        'Check: does this paragraph advance the argument or merely reinforce it? Advancing means taking the reader to a new place — a second reason, a deeper layer, a different type of evidence.',
        'Evaluate: Is this paragraph genuinely distinct from the first? Does it add to the argument or repeat it? Does it maintain formal register throughout?'
      ),
      task(
        'Write your counter-argument and rebuttal paragraph. State the strongest objection to your thesis — make it as strong as possible. Then respond to it without simply dismissing it.',
        'The counter-argument paragraph is not an opportunity to knock down a weak version of the objection. State the best version. The rebuttal should either show that the objection doesn\'t apply to your specific claim, concede a partial point while maintaining the core thesis, or show that the evidence for the objection is weaker than it appears.',
        'Example opening: "It might be objected that social media has in fact democratised access to public discourse, allowing voices previously excluded by institutional gatekeepers to reach large audiences — a genuine expansion of intellectual participation. This is not without force. Nevertheless, the democratisation of participation does not automatically produce the democratisation of quality: the same mechanisms that remove barriers to entry also remove the editorial, peer-review, and reputational filters that previously distinguished informed argument from uninformed opinion."'
      ),
      task(
        'Write your conclusion. Restate your thesis in new language — do not copy the opening paragraph. Summarise the path of the argument. Acknowledge what remains unresolved or what further investigation would be needed.',
        'Avoid: starting with "In conclusion, I have shown that…" (too formulaic), repeating the introduction almost word for word, or introducing a new argument in the conclusion.',
        'Evaluate: Does the conclusion reflect the argument that was actually made, or the argument that was intended? Does it acknowledge genuine complexity? Is it proportionate — brief but complete?'
      ),
    ],
  }),

  // ─── WRITING-012: Academic report ─────────────────────────────────────────────
  createWritingLesson({
    ...common,
    id: 'C1-WRITING-012',
    order: 12,
    title: 'Writing: The academic report — research summary, analysis, and evidence-based recommendations',
    objectives: [
      'Write a structured academic report (300–350 words) presenting research findings with appropriate hedging and attribution.',
      'Distinguish between established findings and tentative inferences in academic reporting.',
      'Use formal section structure (background, findings, analysis, recommendations) in academic register.',
      'Apply modal and conditional structures for evidence-calibrated claims.',
    ],
    teacherOpening: 'The academic report differs from the essay: it presents findings (what was found) rather than arguments (why something is true). But at C1 level, a strong report still requires analytical thinking — interpreting findings, identifying patterns, and making evidence-calibrated recommendations. This lesson builds the academic report in stages.',
    inputText: `Academic report structure:

EXECUTIVE SUMMARY / BACKGROUND (3–4 sentences): What is the report about? What prompted it? What period or scope does it cover? This section uses formal impersonal register and past tense.

FINDINGS (4–5 sentences): What did the investigation find? Present each finding with appropriate hedging and attribution. Distinguish between what the data directly shows and what it suggests. Use: "The data indicates / The review found / It was observed that / These findings suggest / It would appear that."

ANALYSIS (3–4 sentences): What patterns or connections exist across the findings? What do the findings mean for the question the report was addressing? This is where interpretation occurs.

RECOMMENDATIONS (3–4 sentences): What specific actions do the findings support? Use conditional and modal structures. Be specific: name the action, responsible party (if relevant), and timeframe where possible.

Scenario: You have conducted a review of reading habits among undergraduate students at a university. Your data shows: (1) 68% of students read assigned texts in the 24 hours before a class rather than in advance; (2) 43% report not completing the full assigned reading before seminars; (3) students who complete readings in advance score 15% higher on end-of-semester assessments; (4) 71% of students say they would read in advance if texts were shorter or had clear reading guides; (5) faculty report that seminar quality has declined over the past three years.`,
    writingTask: 'Write a formal academic report (300–350 words) based on the scenario above. Use the four-part structure. Your report must include: at least two hedged findings; at least one analytical claim that connects findings; at least two specific recommendations with modal structures.',
    wordTarget: 325,
    tasks: [
      task(
        'Write the Background section. Introduce the report, its purpose, and its scope in formal impersonal register. Avoid first-person constructions.',
        'Use: "This report presents the findings of… / The present review was initiated following… / This document summarises the outcomes of…" Present the context in 3–4 sentences.',
        'Example: "This report presents the findings of a review of undergraduate reading practices conducted during the current academic year. The review was initiated in response to faculty concerns about declining seminar quality and was designed to identify the reading patterns of students and the factors influencing them. Data was collected through a survey administered to 240 students across four faculties, supplemented by semi-structured interviews with twelve members of academic staff."'
      ),
      task(
        'Write the Findings section. Present each key finding with appropriate hedging. Use a range of reporting verbs and structures. Distinguish between findings directly shown by data and findings that are suggested or inferred.',
        'Data that is directly measured (68% of students) can be reported without hedging: "The survey found that 68% of students… / Data indicates that…" Findings that involve interpretation need hedging: "It would appear that… / The evidence suggests…"',
        'Check: have you distinguished between what was directly measured and what is inferred? Have you used a variety of reporting structures rather than repeating "the survey found" every sentence?'
      ),
      task(
        'Write the Analysis section. Identify patterns across the findings and interpret their significance for the question the report was addressing. This section should move from "what was found" to "what it means."',
        'The analysis is not a list of findings — it synthesises them. Look for connections: what do the findings about reading timing, completion rates, and assessment scores suggest together? What structural or systemic issues do they point to?',
        'Example connection: "Taken together, the findings suggest that late reading is not primarily a motivational issue but a structural one: students are willing to read in advance if conditions support it, but the current design of assigned reading does not provide sufficient scaffolding. This interpretation is supported by the finding that 71% of students identified text length and the absence of reading guides as the principal barriers."'
      ),
      task(
        'Write the Recommendations section. Each recommendation should be specific, actionable, and calibrated to the evidence. Use modal and conditional structures.',
        'Avoid vague recommendations ("improve the reading experience"). Each recommendation should name: (1) a specific action, (2) who is responsible or implicated, (3) a rationale connecting to the findings, and (4) a timeframe where possible.',
        'Example: "The review recommends the following actions: first, that faculties review the length and design of assigned readings, with particular attention to the provision of reading guides that identify key sections and questions — a low-cost intervention supported by the finding that 71% of students identified this as a barrier; second, that the relationship between advance reading and assessment performance be communicated directly to students at induction, drawing on the 15% advantage identified in the data; third, that a follow-up review be conducted at the end of the following academic year to assess whether the interventions have had a measurable effect on seminar quality."'
      ),
    ],
  }),

  // ─── WRITING-013: Critical review ────────────────────────────────────────────
  createWritingLesson({
    ...common,
    id: 'C1-WRITING-013',
    order: 13,
    title: 'Writing: The critical review — evaluating a text\'s argument, methodology, and contribution',
    objectives: [
      'Write a structured critical review (300–350 words) of an academic or non-fiction text.',
      'Distinguish between summarising a text\'s argument and evaluating it.',
      'Use the conventions of academic evaluation: hedged praise, specific critique, fair summary.',
      'Apply the evaluative vocabulary of academic discourse (compelling, tenuous, well-founded, unsubstantiated).',
    ],
    teacherOpening: 'The critical review is a sophisticated genre that requires two simultaneous skills: accurately representing someone else\'s argument (summary) and evaluating it from a scholarly perspective (critique). Many students do one but not the other — they summarise without evaluating, or evaluate without fairly representing the argument. At C1, both are required at the same time.',
    inputText: `Critical review structure:

INTRODUCTION (2–3 sentences): Name the text, its author, its context (where published, when), and its stated purpose. Give an overall evaluative orientation — positive, negative, or mixed — without yet explaining it.

SUMMARY OF ARGUMENT (3–4 sentences): Present the text's main claim and the key steps of its argument in your own words. This must be fair — represent the argument as its author would recognise it, not as a weakened version.

EVALUATION — STRENGTHS (2–3 sentences): What does the text do well? Be specific: name the particular quality (evidence quality, conceptual clarity, methodological rigour, originality of claim) and explain why it is a strength.

EVALUATION — WEAKNESSES (3–4 sentences): What are the text's limitations? Be specific and fair. Distinguish between what the text does not do and what it does badly — a text that doesn't address X may simply be outside its scope; a text that addresses X badly has a genuine weakness.

CONCLUSION (2 sentences): Overall assessment. Is the text a valuable contribution? For what audience? What does it leave open?

Text to review: The passage "The Limits of Objectivity" from C1-READING-006 in this lesson block.`,
    writingTask: 'Write a critical review (300–350 words) of "The Limits of Objectivity" from C1-READING-006. Your review must: accurately summarise both Hartley\'s position (as described by the reviewer) and the reviewer\'s evaluation of it; identify at least one specific strength of the review article; identify at least one specific weakness or limitation; and conclude with an overall assessment of the text\'s contribution.',
    wordTarget: 325,
    tasks: [
      task(
        'Write the introduction to your critical review. Name the text (the review article), its subject (Hartley\'s book), and give an overall evaluative orientation in 2–3 sentences.',
        '"The Limits of Objectivity" is a review article published in an academic journal (you can invent the journal name and year). Your opening evaluative orientation should be your overall judgment — this prepares the reader for the evaluation that follows.',
        'Example: "\'The Limits of Objectivity,\' published in the Journal of Social Inquiry (2024), presents a detailed critical engagement with Marcus Hartley\'s Neutrality and Method in the Social Sciences. The review is, on balance, a careful and largely persuasive piece of critical scholarship, though it is more successful as a work of close reading than as a systematic theoretical challenge to Hartley\'s core argument."'
      ),
      task(
        'Write the summary of argument section. Summarise both what Hartley argues (as described by the reviewer) and what the reviewer argues about Hartley. These must be clearly distinguished.',
        'Use attribution markers to distinguish: "Hartley argues that… / The reviewer, by contrast, contends that… / According to the review…" The summary must be fair to both parties — Hartley\'s argument should be represented as the reviewer represents it, and the reviewer\'s position should be accurately captured.',
        'Check: is it clear throughout who holds which position — Hartley or the reviewer? Is Hartley\'s argument represented in its strongest form (procedural transparency as a substitute for substantive objectivity)? Is the reviewer\'s central objection clearly captured (the methodological literacy problem)?'
      ),
      task(
        'Write the strengths section. Identify at least one specific thing the review article does particularly well. Explain precisely why it is a strength — do not just say it is "interesting" or "well-written."',
        'Specific strengths to consider: the clarity of the conceptual distinction between substantive and procedural objectivity; the specific counter-example about the statistician vs. the policy-maker; the balance between critique and credit in the final paragraph; the precision of the hedging language used throughout.',
        'Example: "One of the review\'s notable strengths is the precision of its counter-example: rather than arguing in the abstract that procedural transparency has limits, the reviewer identifies a specific and concrete instantiation — the contrast between the statistician reader and the policy-maker reader. This grounds the theoretical objection in a practical scenario that makes its force immediately apparent."'
      ),
      task(
        'Write the weaknesses section. Identify at least one specific limitation of the review article. Be fair: distinguish between genuine weaknesses and matters that are simply outside the article\'s scope.',
        'Consider: does the reviewer fully develop an alternative to Hartley\'s model, or only critique it? Does the reviewer\'s own objection face any difficulties? Is the review article\'s scope clearly defined? Is there evidence for the claim about policy-makers\' methodological literacy?',
        'Example: "A potential weakness is that the reviewer\'s central objection — that procedural transparency assumes a level of methodological literacy that readers may not possess — is itself asserted rather than demonstrated. The reviewer does not cite evidence for the claim that policy-makers typically lack the capacity to interrogate social-science methodology, which would have strengthened the critique considerably. Whether this constitutes a flaw in the argument or merely a limitation of the review\'s length is debatable."'
      ),
      task(
        'Write the conclusion. Offer an overall assessment: is this text a valuable contribution? For whom? What does it leave open?',
        'A critical review conclusion should be specific and calibrated — not "this is a great text" but "this text is valuable for X because Y, though readers seeking Z will need to look elsewhere."',
        'Example: "Overall, \'The Limits of Objectivity\' represents a useful contribution to debates about methodology in the social sciences, particularly for readers coming to the field with some philosophical background. The distinction it draws between substantive and procedural objectivity is analytically productive and the close reading of Hartley is careful and fair. The review is less satisfying as a systematic theoretical intervention: it successfully destabilises Hartley\'s claim without fully replacing it. Future work in this area would benefit from the reviewer developing the positive alternative that this article implies but does not deliver."'
      ),
    ],
  }),

]);

export const C1_DEEP_ACADEMIC_WRITING_PART2_BY_PILLAR = Object.freeze({
  grammar: Object.freeze([]),
  vocabulary: Object.freeze([]),
  reading: Object.freeze([
    C1_DEEP_ACADEMIC_WRITING_PART2.find(l => l.id === 'C1-READING-006'),
  ]),
  listening: Object.freeze([
    C1_DEEP_ACADEMIC_WRITING_PART2.find(l => l.id === 'C1-LISTENING-006'),
  ]),
  speaking: Object.freeze([
    C1_DEEP_ACADEMIC_WRITING_PART2.find(l => l.id === 'C1-SPEAKING-006'),
  ]),
  writing: Object.freeze([
    C1_DEEP_ACADEMIC_WRITING_PART2.find(l => l.id === 'C1-WRITING-011'),
    C1_DEEP_ACADEMIC_WRITING_PART2.find(l => l.id === 'C1-WRITING-012'),
    C1_DEEP_ACADEMIC_WRITING_PART2.find(l => l.id === 'C1-WRITING-013'),
  ]),
  checkpoint: Object.freeze([]),
});
