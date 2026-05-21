import { createReadingLesson, createListeningLesson, createSpeakingLesson, createWritingLesson } from '../../../schemas/index.js';

const level = 'B2';
const status = 'ready';
const common = { level, status, estimatedMinutes: 65, tags: ['b2-7', 'academic', 'cohesion', 'deep-approved-target'] };

function task(instruction, note = '', expected = '') { return { instruction, note, expected }; }

export const B2_DEEP_ACADEMIC_PART2 = Object.freeze([

  // ─── READING-010: Academic text extract ──────────────────────────────────────
  createReadingLesson({
    ...common,
    id: 'B2-READING-010',
    order: 110,
    title: 'Reading: "Development and Its Discontents" — dense academic text extract',
    objectives: [
      'Read a 380-word dense academic text extract with full B2 comprehension.',
      'Identify and follow complex reference chains throughout the passage.',
      'Recognise it-extraposition, nominal clause subjects and complex clause structures.',
      'Practise tracing the author\'s argument through multiple layers of qualification and concession.',
    ],
    readingStrategy: [
      task('Before reading: from the title and subtitle, predict two possible criticisms of the SDG framework the author may develop.', 'Use your prediction to notice whether the criticism is conceptual, practical or political.'),
      task('First read (gist): read without stopping and decide whether the author presents the framework as mostly successful, mostly flawed, or structurally mixed.', 'Capture the overall stance in one sentence before analysing details.'),
      task('Second read (scanning/detail): scan each paragraph to locate one key claim and one qualifier (for example "at least nominally", "at best", "depending on one\'s perspective").', 'This helps you track nuance and avoid oversimplified interpretation.'),
      task('Evidence task: choose two short quotations that justify your interpretation of the author\'s position, then use them in your answers.', 'Anchor inference in textual evidence rather than opinion.'),
    ],
    readingText: {
      title: 'Development and Its Discontents',
      subtitle: 'A critical assessment of the Sustainable Development Goals framework',
      body: `The Sustainable Development Goals, adopted by the United Nations in 2015, represent what is arguably the most ambitious multilateral framework for human development ever agreed upon. Encompassing seventeen goals and 169 targets, the framework purports to address poverty, inequality, climate change, education, health and governance within a single, integrated agenda. Whether such an agenda can realistically be operationalised — that is to say, converted from aspirational language into measurable policy change — remains one of the central debates in development studies.

The framework's most significant innovation lies not in its targets per se, but in its universality. Unlike the preceding Millennium Development Goals, which were addressed primarily to developing nations, the SDGs apply, at least nominally, to all member states. This shift appears to reflect an acknowledgement that development challenges are not the exclusive concern of the Global South but are structural features of a global economic system that produces winners and losers regardless of national income levels.

That said, it would be premature to overstate the framework's coherence. It remains unclear how trade-offs between competing goals are to be managed. What happens when the imperative to grow economically conflicts with the imperative to protect ecosystems? It is worth noting that the SDG framework does not provide a hierarchy of goals, nor does it specify which trade-offs are acceptable. This ambiguity can be seen as a deliberate political compromise — the price of achieving consensus — or as a fundamental conceptual flaw, depending on one's perspective.

Empirical assessments of progress have tended to be mixed, at best. For all that the SDGs have succeeded in creating a common language of development and a shared accountability framework, the evidence of structural change is, purportedly, limited. What the data consistently shows is that progress has been fastest on measurable, technocratic targets — reducing child mortality, expanding school enrolment — and slowest on structural ones: redistribution, governance reform, the reduction of systemic inequality. The implication is not that the framework has failed, but that its ambition may have been deployed, in part, to substitute for the harder political work of addressing root causes.`,
      wordCount: 310,
    },
    comprehensionQuestions: [
      {
        question: 'What is "the framework\'s most significant innovation" according to paragraph 2? Explain in your own words.',
        type: 'detail',
      },
      {
        question: 'The author says the SDG framework\'s ambiguity "can be seen as" a deliberate compromise OR a fundamental flaw. Which interpretation does the author appear to favour? Cite evidence.',
        type: 'inference',
      },
      {
        question: 'What does "per se" mean in "not in its targets per se"? What is the author\'s point?',
        type: 'vocabulary-in-context',
      },
      {
        question: 'In the final paragraph, what does "the data consistently shows" — and what does the author say is the implication?',
        type: 'analysis',
      },
      {
        question: 'Identify four cohesion devices in the text and state what each one refers back to.',
        type: 'language-focus',
        guidance: 'Look for: this, such, the framework, the former, these, it-extraposition, nominal clause subjects.',
      },
    ],
    grammarFocus: {
      title: 'B2.7 structures in the text',
      items: [
        { example: 'Whether such an agenda can realistically be operationalised — that is to say, converted from aspirational language into measurable policy change — remains one of the central debates', note: 'Nominal clause subject (Whether...) + reformulation (that is to say).' },
        { example: 'It remains unclear how trade-offs between competing goals are to be managed.', note: 'It-extraposition (It remains unclear how...).' },
        { example: 'It is worth noting that the SDG framework does not provide a hierarchy of goals', note: 'It is worth noting that + formal observation.' },
        { example: 'This ambiguity can be seen as a deliberate political compromise', note: 'can be seen as — stance phrase inviting the reader to consider an interpretation.' },
        { example: 'For all that the SDGs have succeeded in creating a common language...', note: 'Concession connector (For all that) — grants positive before the counter.' },
        { example: 'What the data consistently shows is that progress has been fastest on measurable targets', note: 'Nominal clause as subject (What the data shows is...) for academic emphasis.' },
      ],
    },
    discussionTasks: [
      task('Do you think setting universal goals is more effective than focusing on specific countries? What are the risks of each approach?'),
      task('The author suggests the SDG framework may have substituted "ambition" for "harder political work." Do you think this is a fair critique?'),
      task('Which of the SDGs do you think is most likely to be achieved by 2030? Which is least likely?'),
    ],
    lessonRecap: 'You read a 310-word dense academic text and practised tracing complex reference chains, identifying B2.7 grammar structures, and evaluating a multi-layered academic argument.',
    nextLessonBridge: 'Next: an academic lecture extract — listening for signposting, hedging and complex argument structure in a natural academic spoken register.',
  }),

  // ─── READING-011: Extended academic reading — argument and evidence ───────────
  createReadingLesson({
    ...common,
    id: 'B2-READING-011',
    order: 111,
    title: 'Reading: "A Taxonomy of Climate Scepticism" — extended academic reading for inference',
    objectives: [
      'Read a 360-word academic argument text requiring inference at full B2 level.',
      'Identify the author\'s taxonomy — a classification system — and evaluate its logic.',
      'Practise inference: distinguishing what is stated from what is implied.',
      'Recognise and produce paraphrases of key arguments from the text.',
    ],
    readingStrategy: [
      task('Before reading: predict what categories of climate scepticism you expect to find, and which one you think is most common in public debate.', 'Prediction prepares you to compare your assumptions with the author\'s taxonomy.'),
      task('First read (gist): read quickly and identify the central purpose of the taxonomy in one sentence.', 'Focus on why the categories matter, not on memorising every example yet.'),
      task('Second read (scanning/detail): scan for the label and defining feature of each of the four categories, then note one contrast between category 1 and category 4.', 'Build a precise category map before answering inference questions.'),
      task('Evidence task: copy one sentence that signals the author\'s stance toward policy scepticism and one sentence that signals stance toward manufactured scepticism.', 'Use those sentences to support your interpretation of tone and argument.'),
    ],
    readingText: {
      title: 'A Taxonomy of Climate Scepticism',
      subtitle: 'Why the debate is more complex than it appears',
      body: `The term "climate sceptic" is routinely deployed as if it referred to a single, homogeneous position. In practice, it encompasses at least four distinct categories of dissent, which it is worth distinguishing if the public debate is to be conducted productively.

The first category might be termed evidential scepticism: a genuine, good-faith dispute about the reliability of specific data sets, modelling assumptions or attributional studies. Such scepticism is not only legitimate but necessary — it is, in essence, the normal practice of science. The problem arises when what is essentially a methodological debate is misrepresented as doubt about the fundamental direction of change.

The second category is policy scepticism. Here, the science is accepted in broad terms, but the proposed policy responses are challenged — on grounds of economic feasibility, distributional justice, or geopolitical practicality. This is arguably the most intellectually serious form of climate scepticism, as it engages with real trade-offs rather than dismissing the problem. The strongest counterarguments to climate policy — that decarbonisation requires sacrifices borne disproportionately by the poor, or that unilateral action creates competitive disadvantages — are not scientifically illiterate; they are politically and economically substantive.

The third category is ideological scepticism: resistance to climate action rooted not in specific empirical disputes but in broader distrust of state regulation, international governance or scientific expertise. This form tends to be the most resistant to evidence, since the objection is not primarily factual but structural.

The fourth and most well-documented category might be called manufactured scepticism: the deliberate creation and amplification of doubt by actors with material interests in the continuation of fossil fuel use. It is estimated that oil companies have spent billions of dollars funding think tanks and media campaigns purportedly offering "balanced" perspectives on settled science.

The practical implication of this taxonomy is straightforward: conflating these four categories — treating all dissent as equivalent — serves the interests of the fourth category by lending it the intellectual credibility of the first.`,
      wordCount: 325,
    },
    comprehensionQuestions: [
      {
        question: 'In your own words, explain the difference between "evidential scepticism" and "manufactured scepticism".',
        type: 'detail',
      },
      {
        question: 'Why does the author say "policy scepticism" is "arguably the most intellectually serious" form? Do you agree?',
        type: 'inference-and-opinion',
      },
      {
        question: 'What is the "practical implication" the author states in the final paragraph? Paraphrase it in your own words.',
        type: 'paraphrase',
      },
      {
        question: 'The author says evidential scepticism is "legitimate but necessary." What does the word "necessary" imply here?',
        type: 'inference',
      },
      {
        question: 'Find the sentence using "purportedly" in paragraph 5. What does this word choice suggest about the author\'s attitude to these campaigns?',
        type: 'vocabulary-and-stance',
      },
    ],
    paraphrasingTask: {
      instruction: 'Paraphrase the following passage from the text in your own words (60–80 words). Do not change the meaning. Use at least two different techniques: synonyms, structure change, nominalization.',
      original: 'The practical implication of this taxonomy is straightforward: conflating these four categories — treating all dissent as equivalent — serves the interests of the fourth category by lending it the intellectual credibility of the first.',
    },
    discussionTasks: [
      task('Which of the four categories of scepticism do you think is most common in public debate in your country? Why?'),
      task('Is it possible to take a "policy sceptic" position on climate change without providing indirect support to "manufactured sceptics"? How?'),
    ],
    lessonRecap: 'You read a 325-word academic taxonomy argument and practised inference, vocabulary-in-stance analysis, and paraphrasing a complex academic passage.',
    nextLessonBridge: 'Next: an academic lecture extract — a 13-turn listening task with signposting, hedging and complex argument structure in natural academic spoken English.',
  }),

  // ─── LISTENING-007: Academic lecture extract ─────────────────────────────────
  createListeningLesson({
    ...common,
    id: 'B2-LISTENING-007',
    order: 207,
    title: 'Listening: Academic lecture — "The Politics of Evidence" — signposting, hedging and argument',
    objectives: [
      'Follow a 13-turn academic lecture extract at natural B2+ speed.',
      'Identify signposting language (firstly, moving on, to summarise, it is worth noting).',
      'Recognise hedging language (appears to, tends to, it remains unclear whether) in spoken context.',
      'Extract the lecturer\'s main argument, sub-arguments and qualifications.',
      'Practise note-taking in an academic listening context.',
    ],
    teacherOpening: 'What follows is an extract from a university lecture on evidence-based policymaking, delivered by Professor Amara Diallo. The lecture addresses how governments use — and sometimes misuse — evidence when making policy decisions. This is a single-speaker academic lecture, unlike the panel discussions you have practised. It requires tracking one person\'s argument through qualifications, examples and digressions.',
    audioMetadata: {
      format: 'single-speaker academic lecture extract',
      duration: 'approx. 5 minutes',
      accent: 'West African-British English (Professor Diallo)',
      speed: 'measured academic pace — not fast, but dense',
    },
    transcript: [
      { speaker: 'PROF. DIALLO', turn: 1, text: "Thank you. What I want to do today is explore a question that is, arguably, at the heart of contemporary governance: how do governments use evidence to make decisions? And — what is perhaps more important — how do they fail to?" },
      { speaker: 'PROF. DIALLO', turn: 2, text: "Let me begin with a conceptual distinction that will structure everything that follows. I want to distinguish between what I'll call evidence-informed policymaking and evidence-based policymaking. These terms are used interchangeably in the literature, but they are not the same thing, and conflating them has consequences. Evidence-informed policymaking means that evidence is one input among many — alongside political context, values, feasibility and public opinion. Evidence-based policymaking, at least in its strong form, implies that policy follows evidence directly, without mediation. The former is a realistic description of how governance actually works; the latter is, for the most part, a fiction — a useful fiction, perhaps, but a fiction nonetheless." },
      { speaker: 'PROF. DIALLO', turn: 3, text: "Now, why does this distinction matter? Because when we hold governments to an evidence-based standard that no government actually meets, we tend to either excuse policy failures by pointing to evidence gaps, or dismiss good evidence-informed decisions by saying they weren't purely evidence-driven enough. Both errors appear to be common in public discourse." },
      { speaker: 'PROF. DIALLO', turn: 4, text: "Moving on to the first major point: what does the evidence on evidence use actually show? I'm drawing here on a substantial body of comparative research — particularly the work of Carol Weiss at Harvard, whose career was spent examining exactly how policy organisations use research. Her central finding, which has been replicated many times, is that evidence tends to be used less often to make decisions than to validate decisions already made. She called this 'enlightenment use' — evidence seeps into policymaking culture gradually, indirectly, and in ways that are difficult to trace. It does not, in the main, arrive and produce policy by morning." },
      { speaker: 'PROF. DIALLO', turn: 5, text: "This is worth pausing on. What it suggests is that the relationship between evidence and policy is not linear. There is no clean pipeline from research to decision. What there is, instead, is a complex, contested, politically mediated process in which evidence competes with interests, ideology and institutional inertia. To put it differently: evidence rarely wins arguments on its own. It wins arguments in combination with the right political moment, the right messenger, and the right institutional incentives." },
      { speaker: 'PROF. DIALLO', turn: 6, text: "It is worth noting, at this point, that this is not a counsel of despair. The fact that evidence doesn't operate as a simple cause-and-effect mechanism does not mean it doesn't matter. Conversely, good evidence in a politically receptive environment can and does produce significant policy change. The challenge is understanding what makes an environment politically receptive — and this is, I would argue, a governance question as much as an evidence question." },
      { speaker: 'PROF. DIALLO', turn: 7, text: "Let me turn to a second, related point: the problem of evidence quality. Not all evidence is equal, and the academic hierarchy of evidence — with randomised controlled trials at the top and expert opinion at the bottom — does not translate neatly into policy contexts. A randomised controlled trial conducted in one context is unlikely to produce the same results when implemented in a different institutional, cultural or economic setting. This is what researchers call the 'external validity problem.' The evidence that tends to travel best across contexts is, arguably, the most abstract — general principles, structural conditions, order-of-magnitude effects — not the specific findings of individual studies." },
      { speaker: 'PROF. DIALLO', turn: 8, text: "Consequently, there is a tension at the heart of evidence-based governance between the demand for precision — specific, measurable, locally relevant data — and the need for generalisability — findings that apply across different settings. Neither pole is fully achievable. That said, the literature does suggest some practical principles. It tends to show, for instance, that building institutional capacity for evidence use — creating systems for collecting, synthesising and communicating evidence within government — is more likely to produce durable improvements in decision quality than any single study or evaluation." },
      { speaker: 'PROF. DIALLO', turn: 9, text: "I want to briefly flag a third issue before I summarise: the politics of who gets to produce evidence, and whose evidence counts. It is estimated that approximately 80% of published social science research comes from researchers based in high-income countries — yet it is increasingly deployed to inform policy in low- and middle-income ones. Whether such research is adequately attentive to local context is, in many cases, unclear. The implication is that governance quality in much of the world may be shaped by evidence that was not designed with those contexts in mind." },
      { speaker: 'PROF. DIALLO', turn: 10, text: "This is not merely an academic observation — it has direct consequences. Policies ostensibly designed for one context, implemented in another, often produce unexpected results. Furthermore, when those results are negative, the failure tends to be attributed to implementation rather than to the underlying evidence — which reinforces the status of the original research and thereby perpetuates the cycle." },
      { speaker: 'PROF. DIALLO', turn: 11, text: "Let me now draw these threads together. What I have argued is: firstly, that the distinction between evidence-informed and evidence-based policymaking is conceptually important and practically consequential. Secondly, that evidence tends to operate indirectly and cumulatively, not as a direct cause of policy decisions. Thirdly, that the quality and applicability of evidence are context-dependent in ways that current systems often fail to account for. And fourthly, that the politics of evidence production introduce structural biases that are not adequately addressed by calling for more rigour." },
      { speaker: 'PROF. DIALLO', turn: 12, text: "What this suggests, taken together, is not that evidence is unimportant — quite the contrary — but that improving governance through evidence requires more than producing better research. It requires institutional reform, epistemic diversity in research systems, and a more honest account of the political conditions under which evidence actually influences decisions." },
      { speaker: 'PROF. DIALLO', turn: 13, text: "I'll stop there and open it up. I'd particularly welcome pushback on the claim that evidence-based policymaking is a 'fiction' — I've stated it somewhat provocatively, and I think it merits scrutiny." },
    ],
    listeningTasks: [
      {
        stage: 'BEFORE YOU LISTEN',
        tasks: [
          task('What does "evidence-based policymaking" mean? Write your definition before listening.'),
        ],
      },
      {
        stage: 'FIRST LISTEN — note-taking',
        tasks: [
          task('Take notes on the FOUR main points in the lecture. Listen especially for signposting language (Moving on, Let me turn to, I want to briefly flag, Let me draw these together).', 'You will need your notes for the speaking task that follows.'),
        ],
      },
      {
        stage: 'SECOND LISTEN — detail and language',
        tasks: [
          task('What distinction does the professor draw between "evidence-informed" and "evidence-based" policymaking?'),
          task('Who is Carol Weiss, and what is her central finding about how evidence is used?'),
          task('What is the "external validity problem"?'),
          task('Find THREE examples of hedging language used by the professor. Write the full sentence for each.'),
          task('What does "ostensibly" mean in turn 10? What does its use imply?'),
        ],
      },
      {
        stage: 'CRITICAL THINKING',
        tasks: [
          task('The professor calls evidence-based policymaking a "useful fiction." Do you agree that this framing is fair? What might a critic of this position say?'),
          task('Point 3 in the lecture raises the issue of who produces evidence. Do you think this is an important governance problem, or is it a secondary concern?'),
        ],
      },
    ],
    discussionPrompts: [
      'The professor argues that evidence wins arguments "in combination with the right political moment, the right messenger, and the right institutional incentives." Can you think of a real-world example of this?',
      'What practical steps could a government take to become better at using evidence in policy decisions?',
    ],
    lessonRecap: 'You listened to a 13-turn academic lecture and practised tracking a single speaker\'s multi-point argument through qualifications, examples and signposting — extracting main points, identifying hedging and analysing stance.',
    nextLessonBridge: 'Next: a speaking task where you paraphrase and summarise the lecture\'s argument in 90 seconds — practising the academic speaking skill of concise oral summary.',
  }),

  // ─── SPEAKING-010: Paraphrase and summarise ────────────────────────────────────
  createSpeakingLesson({
    ...common,
    id: 'B2-SPEAKING-010',
    order: 310,
    title: 'Speaking: Paraphrase and summarise — oral academic summary in 90 seconds',
    objectives: [
      'Summarise the main argument of an academic text or lecture in 90 seconds.',
      'Use paraphrasing techniques to restate ideas without quoting verbatim.',
      'Apply reformulation language (in other words, that is to say, what this means is) in spoken academic English.',
      'Demonstrate the ability to distinguish main points from examples and qualifications.',
    ],
    teacherOpening: 'Summarising — selecting what is most important and restating it concisely — is one of the hardest academic skills. In spoken academic contexts, you are often asked to summarise what a text said, what a speaker argued, or what a study found. The ability to do this accurately, concisely and in your own words distinguishes a B2 academic speaker from a B1 one.',
    pronunciationFocus: {
      title: 'Pronunciation & shadowing',
      tips: [
        'Shadow: "In other words, what the author is suggesting is that..." — stress OTHER and sugGESTing. Practise the reformulation pause after "in other words".',
        '"That is to say..." — say it as one chunk: /ðæt.ɪz.tə.seɪ/. Brief pause after, then the paraphrase.',
        '"The speaker\'s central argument was, broadly speaking, that..." — practise embedding "broadly speaking" with minimal pauses to maintain fluency.',
        '"To put it another way..." — stress aNOTHer to signal the reformulation. Falling intonation on "way".',
      ],
    },
    warmUp: [
      task('Look at your notes from the academic lecture (B2-LISTENING-007). Identify the FOUR main points. Write a one-sentence version of each — not a quote, your own words.'),
    ],
    guidedPractice: [
      {
        title: 'Structure for an oral academic summary',
        steps: [
          { step: 'Opening (10 sec)', prompt: 'Identify the source and main topic: "The lecture examines / argues / explores..." / "Professor Diallo\'s central claim is..."' },
          { step: 'Main argument (30 sec)', prompt: 'Paraphrase the key point: "In essence, the argument is that..." / "What the lecture suggests is that..." / "To put it differently..."' },
          { step: 'Supporting points (30 sec)', prompt: 'Two or three key supporting claims: "Furthermore, the lecture distinguishes... / points out that..." / "It is also argued that..."' },
          { step: 'Qualification or limitation (20 sec)', prompt: '"That said, the lecture does not claim... / acknowledges that..." / "What remains unclear is..."' },
        ],
      },
      task('Deliver a 90-second oral summary of the academic lecture (B2-LISTENING-007). Use at least one reformulation phrase, one hedging expression, and one advanced connector.', 'Do NOT read from your notes — glance at them as prompts only. The goal is fluent academic speech, not recitation.'),
    ],
    speakingChecklist: [
      'Summary completed in 90 seconds (±15 seconds).',
      'The source/topic is identified in the opening.',
      'The main argument is paraphrased — not quoted verbatim.',
      'At least two supporting points included.',
      'Reformulation language used (in other words / that is to say / what this means).',
      'At least one hedging expression used.',
      'At least one advanced connector used.',
      'Fluent delivery — notes used as prompts, not read aloud.',
    ],
    freeSpeaking: [
      { topic: 'Summarise the argument of one of the reading texts in B2.7 (R010 or R011) in 90 seconds, using paraphrase and reformulation language.' },
      { topic: 'Choose any text or lecture from B2.6 and summarise its main argument in 90 seconds in academic spoken English.' },
    ],
    lessonRecap: 'You practised oral academic summary — selecting main points, paraphrasing accurately, and delivering a concise 90-second spoken summary using reformulation language, hedging and advanced connectors.',
    nextLessonBridge: 'Now for the two capstone writing tasks of B2.7: an academic summary paragraph and a full-length argumentative paragraph demonstrating all B2.7 features.',
  }),

  // ─── WRITING-010: Academic summary paragraph ─────────────────────────────────
  createWritingLesson({
    ...common,
    id: 'B2-WRITING-010',
    order: 410,
    title: 'Writing: Academic summary paragraph — paraphrase and summarise a complex text',
    objectives: [
      'Write a 130–160 word academic summary paragraph of a complex text.',
      'Use paraphrasing techniques (synonyms, structure change, nominalization, voice change) accurately.',
      'Apply reformulation language (in other words, that is to say, what this means is) in written summary.',
      'Use reporting verbs (argues, contends, distinguishes, acknowledges, suggests) to attribute the author\'s claims.',
    ],
    teacherOpening: 'Summarising a text in formal writing requires three things: selection (choosing the most important points), compression (saying more with fewer words), and paraphrase (expressing those points in your own language). At B2 level, your summary should read as a coherent paragraph in its own right — not a list of points, not direct quotation, but a logically structured paraphrase of the source\'s main argument.',
    writingModel: {
      title: 'Model summary paragraph: "A Taxonomy of Climate Scepticism" (R011)',
      text: `In "A Taxonomy of Climate Scepticism," the author argues that the term "climate sceptic" is routinely — and misleadingly — treated as if it described a single position. The article distinguishes four distinct categories: what it terms evidential scepticism, which the author regards as a legitimate scientific practice; policy scepticism, characterised as the most intellectually serious form, since it engages with genuine distributional and political trade-offs; ideological scepticism, rooted in broader distrust of regulation and expertise; and manufactured scepticism, the deliberate amplification of doubt by actors with commercial interests in fossil fuel continuation. The central implication, as the author presents it, is that conflating these four categories serves the interests of the last — by lending manufactured doubt the intellectual credibility that belongs to genuine scientific debate. What this suggests, in other words, is that how we categorise dissent shapes who benefits from it.`,
      wordCount: 145,
    },
    writingAnnotations: [
      { highlight: 'the author argues that', label: 'Reporting verb to attribute the claim (not "it says").' },
      { highlight: 'what it terms evidential scepticism', label: 'Paraphrase using "what it terms" to introduce the author\'s label without quoting verbatim.' },
      { highlight: 'characterised as the most intellectually serious form', label: 'Passive + paraphrase — avoids direct quote while attributing the evaluation.' },
      { highlight: 'The central implication, as the author presents it', label: 'Attribution phrase distances writer from the claim (you are summarising, not endorsing).' },
      { highlight: 'What this suggests, in other words, is that', label: 'Reformulation language (in other words) + nominal clause subject for academic emphasis.' },
    ],
    writingTasks: [
      {
        task: 'Write a 130–160 word academic summary paragraph of ONE of the following texts from B2.7.',
        options: [
          '"Development and Its Discontents" (B2-READING-010): summarise the author\'s critique of the SDG framework.',
          'The academic lecture "The Politics of Evidence" (B2-LISTENING-007): summarise Professor Diallo\'s main argument and four key points.',
        ],
      },
    ],
    writingChecklist: [
      'Between 130 and 160 words.',
      'Formal academic register throughout.',
      'The source and author/speaker identified at the opening.',
      'Main argument accurately paraphrased (no direct quotation).',
      'At least two reporting verbs (argues, suggests, distinguishes, contends, acknowledges, points out).',
      'At least one paraphrasing technique (synonym substitution, structure change, nominalization or voice change).',
      'At least one reformulation phrase (in other words, that is to say, what this means is).',
      'Logical structure — main point → supporting points → conclusion/implication.',
    ],
    lessonRecap: 'You wrote a 130–160 word formal academic summary paragraph using paraphrasing techniques, reporting verbs and reformulation language to accurately and concisely represent a complex source text.',
    nextLessonBridge: 'Final lesson of B2.7 — and of the core B2 production sequence: a capstone argumentative paragraph that demonstrates full command of all B2.7 features in original academic writing.',
  }),

  // ─── WRITING-011: Capstone argumentative paragraph ───────────────────────────
  createWritingLesson({
    ...common,
    id: 'B2-WRITING-011',
    order: 411,
    title: 'Writing: Capstone argumentative paragraph — full B2.7 academic production',
    objectives: [
      'Write a 170–200 word formal argumentative paragraph demonstrating full B2.7 academic production.',
      'Apply cohesion devices (reference chains, advanced connectors) throughout.',
      'Use it-extraposition, nominal clause subjects and paraphrasing in original writing.',
      'Deploy hedging language, academic stance adverbs and academic argument vocabulary with precision.',
    ],
    teacherOpening: 'This is the capstone writing task for B2.7 — and arguably the most demanding writing task of the entire B2 curriculum. You are writing a fully original academic paragraph at the level expected in a university undergraduate essay or high-quality policy brief. Every feature you have practised in B2.7 should be present: cohesion devices, complex clause structure, hedging, reformulation and argument structure. This is what B2 academic written production looks like.',
    writingModel: {
      title: 'Model paragraph: The relationship between evidence and policy',
      text: `The claim that policy should be "evidence-based" is, arguably, more aspirational than descriptive. What the comparative literature tends to show is that evidence rarely determines policy decisions directly; rather, it appears to seep into policymaking culture gradually and indirectly, shaping the language and framing of debate without necessarily altering the direction of specific decisions. This phenomenon — which Carol Weiss termed "enlightenment use" — is not merely a theoretical observation; it has significant practical implications for how governance reformers should prioritise their efforts. It remains unclear, for instance, whether investing in producing more rigorous research is more likely to improve policy outcomes than investing in the institutional capacity to use existing evidence well. The counterargument — that better evidence eventually produces better decisions, however slowly — has merit, and it would be premature to dismiss it. Nevertheless, the weight of empirical research suggests that institutional design, rather than research quality per se, is the more binding constraint on evidence-informed governance. What is needed, in other words, is not simply more evidence, but more robust systems for translating evidence into action.`,
      wordCount: 193,
    },
    writingAnnotations: [
      { highlight: 'is, arguably, more aspirational than descriptive', label: 'Hedging stance adverb (arguably) + qualification.' },
      { highlight: 'What the comparative literature tends to show is that', label: 'Nominal clause subject + hedging verb (tends to) + academic emphasis structure.' },
      { highlight: 'This phenomenon — which Carol Weiss termed "enlightenment use"', label: 'Cohesion (This phenomenon) + non-defining relative clause adding scholarly reference.' },
      { highlight: 'It remains unclear, for instance, whether', label: 'It-extraposition for embedded whether-clause — uncertainty expressed academically.' },
      { highlight: 'The counterargument ... has merit, and it would be premature to dismiss it.', label: 'Full counterargument acknowledgement before rebuttal.' },
      { highlight: 'Nevertheless, the weight of empirical research suggests', label: 'Advanced contrast connector (Nevertheless) + hedging (suggests, not "shows").' },
      { highlight: 'research quality per se', label: 'Academic Latin phrase from reading (per se = in itself); shows academic register.' },
      { highlight: 'What is needed, in other words, is not simply more evidence, but more robust systems', label: 'Nominal clause subject + reformulation (in other words) + emphatic "not X but Y".' },
    ],
    writingTasks: [
      {
        task: 'Write a 170–200 word formal argumentative paragraph on ONE of the following topics, using the model as a guide for structure, register and density of B2.7 features.',
        options: [
          'The SDG framework is an ambitious political achievement but a limited governance tool — explain and argue.',
          'The most significant barrier to climate action is institutional, not technological — argue and qualify.',
          'Evidence is most powerful in policy when it confirms what decision-makers already believe — assess this claim.',
        ],
      },
    ],
    writingChecklist: [
      'Between 170 and 200 words.',
      'Formal academic register throughout — no contractions, academic vocabulary.',
      'Clear argumentative claim in the opening.',
      'At least one nominal clause subject (What X shows is... / Whether X remains...).',
      'At least one it-extraposition structure (It remains unclear... / It is worth noting...).',
      'At least two advanced connectors from B2.7 V016 (furthermore, nevertheless, consequently, that said, etc.).',
      'At least two cohesion devices (this + noun, the above-mentioned, such, do so, etc.).',
      'At least one hedging expression (appears to, tends to, is likely to, arguably).',
      'Counterargument acknowledged and addressed.',
      'Nuanced, qualified conclusion using implication/on balance/what this suggests.',
      'Reformulation language used at least once (in other words, that is to say, or rather).',
    ],
    lessonRecap: 'You wrote a 170–200 word capstone academic argumentative paragraph demonstrating full B2.7 production: cohesion devices, complex clause structure, hedging, reformulation, academic connectors and argument organisation.',
    nextLessonBridge: 'B2.7 is complete. You are now ready for B2.8 — the final module before the B2 Gate: checkpoints, review tasks and the B2 exit assessment. After B2.8, the next level is C1.',
  }),

]);

export const B2_DEEP_ACADEMIC_PART2_BY_PILLAR = Object.freeze({
  reading: B2_DEEP_ACADEMIC_PART2.filter(l => l.pillar === 'reading'),
  listening: B2_DEEP_ACADEMIC_PART2.filter(l => l.pillar === 'listening'),
  speaking: B2_DEEP_ACADEMIC_PART2.filter(l => l.pillar === 'speaking'),
  writing: B2_DEEP_ACADEMIC_PART2.filter(l => l.pillar === 'writing'),
});
