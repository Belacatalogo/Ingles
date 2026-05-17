import { createReadingLesson, createListeningLesson, createWritingLesson } from '../../../schemas/index.js';

const level = 'C1';
const status = 'ready';
const common = { level, status, estimatedMinutes: 75, tags: ['c1-1', 'bridge', 'advanced', 'deep-approved-target'] };

function task(instruction, note = '', expected = '') { return { instruction, note, expected }; }

export const C1_DEEP_BRIDGE_PART2 = Object.freeze([

  // ─── READING-001: C1 authentic academic text ─────────────────────────────────
  createReadingLesson({
    ...common,
    id: 'C1-READING-001',
    order: 1,
    title: 'Reading: "The Epistemic Crisis" — C1 authentic academic text on knowledge and democracy',
    objectives: [
      'Read a 450-word C1-level authentic academic text with full comprehension.',
      'Identify complex argument structure: thesis, counter-thesis, synthesis and implication.',
      'Recognise and interpret C1 vocabulary and collocations in context.',
      'Practise critical reading — evaluating the strength and limitations of the author\'s argument.',
    ],
    readingText: {
      title: 'The Epistemic Crisis',
      subtitle: 'How the fragmentation of shared knowledge threatens democratic governance',
      body: `Democracy rests on a foundational premise that is increasingly called into question: that citizens share a sufficient common ground of knowledge and fact to deliberate meaningfully about collective decisions. This premise is predicated on institutions — free press, public education, scientific expertise — that were never perfect but were, hitherto, strong enough to sustain a broadly shared account of reality. Those institutions are under severe pressure, and the consequences for democratic governance may prove to be more profound than is commonly supposed.

The phenomenon has been variously described as a "post-truth" crisis, an "infodemic", or an epistemological collapse. Each framing captures something real but none is fully adequate. "Post-truth" suggests a loss of respect for truth that is primarily a cultural or moral failure. "Infodemic" suggests that the problem is primarily one of information volume. Both framings obscure what is arguably the more fundamental issue: a structural shift in the architecture of information production and distribution that has, since the mid-2010s, given rise to information ecosystems in which individuals can, and increasingly do, construct entirely self-consistent but mutually incompatible accounts of shared events.

Notwithstanding the substantial literature on media fragmentation, the specifically epistemic dimension of this shift — its implications for collective knowledge, not just individual belief — has received less attention than it merits. Democratic deliberation requires not merely that citizens hold views, but that they are in a position to update those views in response to shared evidence. Where the information environment is structured so as to insulate individuals from disconfirming information, this condition cannot be met. The result is not a society of people who disagree: it is a society of people who inhabit incommensurable epistemic worlds. Such a society faces grave difficulties in reaching the kind of legitimate, informed consensus on which democratic authority ultimately rests.

The counterargument most frequently advanced is that epistemic pluralism is a feature, not a bug: that a diverse information ecosystem is healthier than one dominated by a small number of authoritative voices. This argument has merit insofar as it applies to the diversity of legitimate perspectives on contested normative questions. It runs counter to a reasonable epistemology, however, when applied to factual matters: the diversity of perspectives on whether a vaccine is safe, or whether an election was conducted fairly, is not a sign of intellectual health. It is a sign of epistemic dysfunction.

What this suggests is that the challenge is not simply to improve information quality — a task that is, in any case, extraordinarily difficult to pursue without precipitating legitimate concerns about censorship and authority. The deeper challenge is institutional: to design information environments that are commensurate with the epistemic demands of democratic governance, and to do so in a way that bears out the commitment to freedom of expression on which those environments must be predicated.`,
      wordCount: 420,
    },
    comprehensionQuestions: [
      {
        question: 'What is the "foundational premise" of democracy that the author says is under threat? Explain in your own words.',
        type: 'detail',
      },
      {
        question: 'The author says "post-truth" and "infodemic" both "capture something real but none is fully adequate." What is the author\'s own preferred framing, and what does it add?',
        type: 'analysis',
      },
      {
        question: 'What does "incommensurable epistemic worlds" mean? Use the context of the passage to help you.',
        type: 'vocabulary-inference',
      },
      {
        question: 'What is the counterargument the author addresses in paragraph 4? How does the author respond to it?',
        type: 'argument-analysis',
      },
      {
        question: 'In the final paragraph, what does the author identify as the "deeper challenge"? What qualification do they add to their proposed solution?',
        type: 'critical-reading',
      },
      {
        question: 'Identify FIVE C1 vocabulary items or collocations from C1.1 that appear in this text. Write each one and its function.',
        type: 'language-focus',
        guidance: 'Look for: predicated on, hitherto, give rise to, notwithstanding, insofar as, run counter to, commensurate, precipitate, bear out.',
      },
    ],
    grammarFocus: {
      title: 'C1 structures in the text',
      items: [
        { example: 'This premise is predicated on institutions — free press, public education, scientific expertise — that were never perfect', note: 'C1 vocabulary (predicated on) + non-defining relative clause + parenthetical list.' },
        { example: 'have, since the mid-2010s, given rise to information ecosystems', note: 'Parenthetical time adverbial inside a present perfect construction — dense academic style.' },
        { example: 'Notwithstanding the substantial literature on media fragmentation', note: 'Fronted notwithstanding for concession — C1 connector.' },
        { example: 'It runs counter to a reasonable epistemology, however, when applied to factual matters', note: 'C1 collocation (runs counter to) + reduced conditional/participial insertion (when applied).' },
        { example: 'to design information environments that are commensurate with the epistemic demands', note: 'C1 vocabulary (commensurate with) in an infinitive of purpose clause.' },
      ],
    },
    discussionTasks: [
      task('The author argues that epistemic pluralism is healthy for "normative questions" but not for factual ones. Can you think of a real example where this distinction is genuinely difficult to maintain?'),
      task('The author says improving information quality risks "precipitating legitimate concerns about censorship." Do you think that concern is more or less serious than the epistemic crisis it is meant to prevent?'),
      task('Is the problem described in this article primarily a technological problem, a political problem, or a cultural problem?'),
    ],
    lessonRecap: 'You read a 420-word C1 academic text on democratic epistemology and practised recognising argument structure, C1 vocabulary in context, and critical analysis of complex multi-layered reasoning.',
    nextLessonBridge: 'Next: a C1 listening task — an extended academic interview on a related theme, practising the full range of C1 listening skills at natural speed.',
  }),

  // ─── LISTENING-001: C1 extended academic interview ───────────────────────────
  createListeningLesson({
    ...common,
    id: 'C1-LISTENING-001',
    order: 101,
    title: 'Listening: "The Attention Economy" — C1 academic interview with Dr Chioma Okafor',
    objectives: [
      'Follow a 14-turn extended academic interview at full C1 natural speed.',
      'Track the development of a single complex argument over multiple turns.',
      'Identify C1 hedging language, qualifications, reformulations and stance markers.',
      'Critically evaluate the interviewee\'s argument and identify its strongest and weakest points.',
    ],
    teacherOpening: 'You are going to listen to an interview with Dr Chioma Okafor, a researcher in media psychology and digital governance at a UK university. The interviewer, James, asks her about the concept of the "attention economy" — the idea that digital platforms compete for users\' attention and monetise it. The interview is an extended academic register — natural speed, dense vocabulary, long turns.',
    audioMetadata: {
      format: 'two-speaker academic interview (interviewer + academic)',
      duration: 'approx. 6 minutes',
      accents: ['Nigerian-British (Dr Okafor)', 'Scottish-English (James)'],
      speed: 'natural C1 — dense, fast in places, with parenthetical insertions and self-corrections',
    },
    transcript: [
      { speaker: 'JAMES', turn: 1, text: "Dr Okafor, you\'ve described the attention economy as potentially the most significant governance challenge of the 21st century. That\'s a strong claim, given the other candidates for that title. What justifies it?" },
      { speaker: 'DR OKAFOR', turn: 2, text: "I\'d want to defend that claim carefully rather than walk it back — I think it\'s defensible, albeit with some qualifications. Here\'s the core argument. Virtually every other governance challenge we face — climate, inequality, migration, political polarisation — has an information and attention dimension. Whether societies can act on climate change is not primarily a technical question; it is, in significant part, a question of whether the information environments in which citizens live are structured in ways that allow collective deliberation to happen. The attention economy, by optimising for engagement rather than understanding, gives rise to exactly the conditions under which that deliberation becomes most difficult. So it\'s not that attention is more important than climate — it\'s that attention governance is, insofar as I can tell, a precondition for effective governance of almost everything else." },
      { speaker: 'JAMES', turn: 3, text: "That\'s an interesting structural argument. But it runs counter to what most people would say, which is that the attention economy is a problem of individual wellbeing — mental health, addiction, time use — rather than a governance crisis." },
      { speaker: 'DR OKAFOR', turn: 4, text: "The individual wellbeing framing is real — I wouldn\'t want to cast doubt on it. But I think it\'s actually a symptom of a deeper structural problem. The reason attention platforms affect individual wellbeing is that they have been designed to do exactly that — to trigger, in as consistent and repeatable a way as possible, the neurological responses that produce engagement. This is not an accident or a side effect; it\'s the business model. And that design decision has been made, hitherto, largely outside any democratic governance framework. When you have a system that has been deliberately engineered to shape human cognition and behaviour at scale, and that system operates without meaningful accountability, you have, I would argue, a governance failure — not just a wellbeing problem." },
      { speaker: 'JAMES', turn: 5, text: "Some would take issue with the word \'deliberately\'. Aren\'t these just companies optimising for a metric — user engagement — that happens to have these effects?" },
      { speaker: 'DR OKAFOR', turn: 6, text: "That\'s a fair challenge. I\'d accept that \'deliberately\' is a strong word if applied to the harm outcomes specifically. But it\'s accurate if applied to the design of engagement maximisation — those are deliberate engineering choices. The disconnect is between the intent — engagement — and the downstream effects — polarisation, addiction, erosion of shared epistemic ground. The question I\'d put back to the \'optimising for a metric\' defence is: at what point does knowledge of the downstream effects, combined with the decision to continue the practice, become sufficient to call the harm deliberate? That threshold has, I think, been crossed." },
      { speaker: 'JAMES', turn: 7, text: "Let\'s bring to bear the governance dimension more directly. What would effective regulation look like?" },
      { speaker: 'DR OKAFOR', turn: 8, text: "Three things, I think, though I want to be careful not to make these sound more settled than they are. First, transparency: platforms should be required to disclose algorithmic design choices and their known effects — not just to regulators, but publicly. Second, fiduciary standards: the relationship between a platform and its users should be characterised as something closer to a duty of care — a legal obligation not to deploy design features that are known to cause harm. Third, structural separation: the business model that ties revenue directly to engagement maximisation should be called into question. Whether the right mechanism is a tax on engagement metrics, a prohibition on certain design patterns, or something else — I don\'t think the answer is obvious, but the question has to be on the table." },
      { speaker: 'JAMES', turn: 9, text: "Critics would say that any of those three could precipitate significant unintended consequences — chilling effects on free speech, barriers to entry that entrench incumbents, misaligned incentives." },
      { speaker: 'DR OKAFOR', turn: 10, text: "Those concerns are germane and I take them seriously. The chilling effects argument is the one I find most compelling — the line between designing for engagement and designing for expression is genuinely difficult to draw, and getting it wrong in the regulatory direction could do real damage. That\'s why I\'d argue for transparency first: it doesn\'t require the state to make judgements about content; it simply brings to bear public and competitive scrutiny on design practices. The entrenchment risk is real, but it tends to hold true in regulatory contexts that favour compliance infrastructure — it\'s addressable through proportionate regulation. The deeper concern is: is any of this politically viable? I\'m cautiously sceptical." },
      { speaker: 'JAMES', turn: 11, text: "Why sceptical?" },
      { speaker: 'DR OKAFOR', turn: 12, text: "Because the political economy works against it. The platforms have made inroads into the funding and attention infrastructure of the very political systems that would need to regulate them. Politicians need these platforms to reach voters. Regulators are, in many jurisdictions, underfunded and outmatched. The asymmetry of resources and expertise between the regulated and the regulator is significant, and it has been been growing. Were meaningful regulation to emerge, I think it would most likely come from the EU — which has already shown it\'s willing to act — rather than from the US or the major economies of Asia." },
      { speaker: 'JAMES', turn: 13, text: "Any grounds for optimism?" },
      { speaker: 'DR OKAFOR', turn: 14, text: "Some. The Digital Services Act in Europe is a genuine advance — it\'s predicated on the principle that platforms bear responsibility for the systems they design, not just the content they host. Whether it bears out in enforcement is another question — the track record of digital regulation in Europe has been mixed, notwithstanding the strong legislative intent. And there\'s a generational dimension: the populations that grew up with these systems as a given are, evidence suggests, beginning to draw on a more sceptical and nuanced relationship with them than their predecessors did. That\'s slow, but it may be real. I\'d describe my position as: cautiously hopeful, contingent on institutional developments I can\'t predict." },
    ],
    listeningTasks: [
      {
        stage: 'FIRST LISTEN — main argument',
        tasks: [
          task('State Dr Okafor\'s core structural argument in two sentences.'),
          task('What three governance proposals does she make in turn 8?'),
          task('Why is she sceptical about whether her proposals are politically viable?'),
        ],
      },
      {
        stage: 'SECOND LISTEN — language and stance',
        tasks: [
          task('Dr Okafor says "I\'d want to defend that claim carefully rather than walk it back." What does "walk it back" mean? What does this phrase tell us about her rhetorical style?'),
          task('Find three examples of hedging language in the transcript (e.g. "I think", "arguably", "tends to", "I\'d accept"). How do they shape the register?'),
          task('In turn 6, Dr Okafor concedes that "deliberately" is a strong word, then partially recovers the claim. Trace the argument structure of that turn.'),
          task('How does Dr Okafor end the interview (turn 14)? What combination of stance markers does she use, and what is the effect?'),
        ],
      },
      {
        stage: 'C1 VOCABULARY IN CONTEXT',
        tasks: [
          task('Identify instances of the following C1 collocations in the transcript: (1) give rise to; (2) cast doubt on; (3) run counter to; (4) call into question; (5) bring to bear; (6) take issue with; (7) make inroads into; (8) predicated on; (9) precipitate; (10) contingent on; (11) germane; (12) bear out.', 'Not all of them appear. Note the exact sentence for each one you find.'),
        ],
      },
    ],
    discussionPrompts: [
      'Dr Okafor argues that attention governance is a "precondition for effective governance of almost everything else." Do you find this argument compelling? What would challenge it?',
      'She says the EU\'s Digital Services Act is "predicated on the principle that platforms bear responsibility for the systems they design, not just the content they host." Do you think this is the right principle? What are its limits?',
      'Do you think younger generations are developing a more sceptical relationship with social media, as Dr Okafor suggests? What evidence would you look for?',
    ],
    lessonRecap: 'You listened to a 14-turn C1 academic interview on the attention economy and practised tracking a complex multi-turn argument, identifying hedging and stance, and locating C1 collocations in natural spoken C1 discourse.',
    nextLessonBridge: 'Now the two writing tasks of C1.1: a formal analytical paragraph at C1 level, and an essay introduction — the first in the C1 extended writing sequence.',
  }),

  // ─── WRITING-001: C1 formal analytical paragraph ─────────────────────────────
  createWritingLesson({
    ...common,
    id: 'C1-WRITING-001',
    order: 1,
    title: 'Writing: C1 formal analytical paragraph — density, C1 vocabulary and advanced structure',
    objectives: [
      'Write a 160–200 word C1 formal analytical paragraph, more dense and rhetorically precise than B2.',
      'Use at least three C1 grammar structures (subjunctive, inversion, complex aspect).',
      'Use at least four C1 vocabulary items and/or collocations from C1.1.',
      'Demonstrate the difference between B2 and C1 writing in density, precision and register.',
    ],
    teacherOpening: 'The distinction between B2 and C1 writing is not primarily about length, topic or grammar rules — it is about density and precision. A C1 paragraph contains more information per sentence, uses vocabulary more precisely, and deploys grammar structures for rhetorical effect rather than just to meet requirements. The model below illustrates this: read it carefully before writing your own.',
    writingModel: {
      title: 'Model C1 paragraph: The attention economy and democratic governance',
      text: `The claim that the attention economy represents primarily a problem of individual wellbeing, rather than a governance crisis, runs counter to the structural analysis that the evidence increasingly demands. Hitherto, regulatory responses have been predicated on a relatively narrow framing: the harm is to individuals, and the remedy is consumer protection. Were this framing adequate, it might be sufficient to require disclosure and introduce fiduciary standards of care. What it fails to capture, however, is the specifically political dimension of the problem: information ecosystems designed to maximise engagement tend, not coincidentally, to give rise to precisely the epistemic fragmentation that undermines the shared knowledge base on which democratic deliberation is predicated. Insofar as the deliberative foundations of democratic governance are eroded — and there is now substantial evidence that they have been — the challenge is not merely one of individual harm but of institutional failure. Never before have the conditions for collective self-governance been so directly implicated in the design choices of a small number of private corporations. That this remains, to a significant extent, a hitherto underregulated domain is, notwithstanding the progress represented by the EU\'s Digital Services Act, a matter of considerable governance concern.`,
      wordCount: 188,
    },
    writingAnnotations: [
      { highlight: 'runs counter to the structural analysis that the evidence increasingly demands', label: 'C1 collocation (runs counter to) + complex relative clause.' },
      { highlight: 'Hitherto, regulatory responses have been predicated on', label: 'C1 vocabulary: hitherto (fronted for emphasis) + predicated on.' },
      { highlight: 'Were this framing adequate, it might be sufficient to require', label: 'C1 inverted conditional: "Were X to be..." for hypothetical — formal.' },
      { highlight: 'tend, not coincidentally, to give rise to precisely the epistemic fragmentation', label: 'C1 collocation (give rise to) + parenthetical "not coincidentally" for rhetorical emphasis.' },
      { highlight: 'Never before have the conditions for collective self-governance been so directly implicated', label: 'C1 inversion (Never before) for dramatic rhetorical emphasis.' },
      { highlight: 'notwithstanding the progress represented by the EU\'s Digital Services Act', label: 'C1 connector notwithstanding + reduced passive participial clause.' },
    ],
    writingTasks: [
      {
        task: 'Write a C1 formal analytical paragraph of 160–200 words on ONE of the following topics.',
        options: [
          'The epistemic crisis described in the C1.1 reading text is, at its core, a governance failure rather than a technological problem.',
          'The argument that greater regulatory oversight of digital platforms risks precipitating censorship is compelling only insofar as it is applied to content moderation; it runs counter to sound governance reasoning when applied to algorithmic design.',
          'Notwithstanding the claims made on behalf of epistemic pluralism, the fragmentation of shared knowledge poses an existential threat to democratic governance that cannot be addressed by information-supply-side interventions alone.',
        ],
      },
    ],
    writingChecklist: [
      'Between 160 and 200 words.',
      'C1 formal register — dense, precise, no informal language.',
      'At least three C1 grammar structures (subjunctive, inversion, were to, complex aspect).',
      'At least four C1 vocabulary items or collocations from C1.1 (see vocabulary list).',
      'Clear argumentative structure: claim → evidence/reasoning → qualification → conclusion.',
      'Advanced cohesion devices throughout.',
      'No redundancy — every sentence earns its place.',
    ],
    lessonRecap: 'You wrote a 160–200 word C1 formal analytical paragraph with dense C1 grammar, vocabulary and rhetorical precision.',
    nextLessonBridge: 'Final lesson of C1.1: an essay introduction — the first step in C1-level extended writing, introducing thesis statement, roadmap structure and formal academic essay register.',
  }),

  // ─── WRITING-002: C1 essay introduction ──────────────────────────────────────
  createWritingLesson({
    ...common,
    id: 'C1-WRITING-002',
    order: 2,
    title: 'Writing: C1 essay introduction — thesis statement, roadmap and academic essay register',
    objectives: [
      'Write a 120–160 word academic essay introduction at C1 level.',
      'Construct a clear thesis statement that signals the essay\'s argument, not just its topic.',
      'Include a brief roadmap — a signpost of how the argument will be developed.',
      'Achieve the register, density and precision of a C1 academic essay opening.',
    ],
    teacherOpening: 'The essay introduction is the gateway to C1 extended writing. Unlike a paragraph (which argues one point), an essay introduction has three jobs: (1) establish the context and stakes of the question; (2) state the thesis — your specific claim and argument, not just the topic; (3) signal the roadmap — briefly indicate how the argument will be developed. At C1, all three must be present and must be precise. Vague thesis statements ("This essay will discuss...") are B1. Clear argumentative thesis statements are C1.',
    writingModel: {
      title: 'Model C1 essay introduction: "Is the attention economy a governance crisis?"',
      text: `The characterisation of the attention economy as primarily a problem of individual wellbeing — of addiction, distraction and mental health — has, hitherto, dominated both public discourse and regulatory response. This framing, while not without merit, runs counter to the structural analysis that an adequate account of the problem requires. The central argument of this essay is that the attention economy constitutes a governance crisis of the first order: not merely because it harms individuals, but because the information ecosystems it has given rise to are incompatible with the epistemic conditions on which democratic deliberation is predicated. To sustain this claim, the essay will first examine the structural mechanisms by which engagement-optimising platforms tend to produce epistemic fragmentation; it will then consider the counterargument that epistemic pluralism is a democratic virtue; and it will conclude by outlining the governance framework that the evidence suggests is commensurate with the scale of the challenge.`,
      wordCount: 147,
    },
    writingAnnotations: [
      { highlight: 'This framing, while not without merit, runs counter to the structural analysis', label: 'Concession-before-claim structure; C1 collocation runs counter to.' },
      { highlight: 'The central argument of this essay is that', label: 'Clear thesis statement — states the argument, not just the topic.' },
      { highlight: 'the information ecosystems it has given rise to', label: 'C1 collocation (give rise to) with postponed relative clause.' },
      { highlight: 'the essay will first examine... it will then consider... and it will conclude by', label: 'Roadmap structure — three-part signposting of argument development.' },
      { highlight: 'commensurate with the scale of the challenge', label: 'C1 vocabulary (commensurate with) in the conclusion of the roadmap.' },
    ],
    essayStructureGuide: {
      title: 'C1 essay introduction: three-part structure',
      parts: [
        { part: 'Context and stakes (30–40 words)', function: 'Establish the question and explain why it matters. Do NOT begin with a truism ("Since the beginning of time..."). Dive in with a specific, intelligent observation.', example: '"The characterisation of X as primarily Y has dominated both discourse and policy response."' },
        { part: 'Thesis statement (40–50 words)', function: 'Your specific claim — what you will argue. Not "This essay discusses X" but "This essay argues that X is the case because of Y, with the consequence that Z."', example: '"The central argument of this essay is that X constitutes not merely Y but Z."' },
        { part: 'Roadmap (30–40 words)', function: 'Signal the structure: first... then... finally/conclude. Use formal signposting verbs: examine, consider, assess, argue, conclude, demonstrate.', example: '"The essay will first examine A; it will then consider B; it will conclude by outlining C."' },
      ],
    },
    writingTasks: [
      {
        task: 'Write a C1 essay introduction of 120–160 words for ONE of the following essay titles.',
        options: [
          '"The fragmentation of shared knowledge is a more serious threat to democracy than the rise of authoritarianism." Discuss.',
          '"Effective regulation of digital platforms requires a fundamental reconceptualisation of what a platform is." To what extent do you agree?',
          '"Only by redesigning the business model of social media can meaningful progress be made on the epistemic dimensions of the governance crisis." Assess this claim.',
        ],
      },
    ],
    writingChecklist: [
      'Between 120 and 160 words.',
      'C1 formal academic register — dense, precise.',
      'All three components present: context/stakes, clear thesis statement, roadmap.',
      'Thesis statement is a specific argument, not a statement of topic.',
      'Roadmap uses at least two signposting verbs in parallel structure.',
      'At least two C1 vocabulary items or collocations.',
      'No "This essay will discuss" — the thesis must make a claim.',
    ],
    lessonRecap: 'You wrote a C1 essay introduction — establishing context, making a clear thesis statement, and signposting the roadmap — the foundation for all C1 extended writing tasks.',
    nextLessonBridge: 'C1.1 is complete. You have been introduced to the core C1 grammar structures (subjunctive, advanced inversion, complex aspect), C1 vocabulary register and collocations, C1 reading and listening at authentic academic level, and C1 essay introduction writing. C1.2 continues with advanced grammar for complex argument and near-native register.',
  }),

]);

export const C1_DEEP_BRIDGE_PART2_BY_PILLAR = Object.freeze({
  reading: C1_DEEP_BRIDGE_PART2.filter(l => l.pillar === 'reading'),
  listening: C1_DEEP_BRIDGE_PART2.filter(l => l.pillar === 'listening'),
  writing: C1_DEEP_BRIDGE_PART2.filter(l => l.pillar === 'writing'),
});
