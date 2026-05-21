import { createReadingLesson, createListeningLesson, createWritingLesson } from '../../../schemas/index.js';

const level = 'B2';
const status = 'ready';
const common = { level, status, estimatedMinutes: 75, tags: ['b2-8', 'checkpoint', 'exit-assessment', 'b2-gate', 'deep-approved-target'] };

function task(instruction, note = '', expected = '') { return { instruction, note, expected }; }

export const B2_DEEP_CHECKPOINTS_PART2 = Object.freeze([

  // ─── READING-014: B2 Exit Reading Assessment ─────────────────────────────────
  createReadingLesson({
    ...common,
    id: 'B2-READING-014',
    order: 114,
    title: 'B2 Exit Reading Assessment: "The Future of Work" — extended comprehension',
    objectives: [
      'Demonstrate full B2 reading comprehension on an unseen 480-word text.',
      'Answer comprehension, inference, vocabulary-in-context and language analysis questions.',
      'Show command of all B2 reading skills: gist, detail, inference, critical evaluation.',
      'Complete this assessment independently without revisiting B2 lessons.',
    ],
    readingStrategy: [
      task('Before reading: preview title and subtitle, then predict whether the text will present automation as mostly opportunity, mostly risk, or a governance dilemma.', 'Write a hypothesis before reading to guide your attention.'),
      task('First read (gist): read the full text once and identify the overall thesis in one sentence.', 'Focus on the author\'s line of argument, not every statistic.'),
      task('Second read (scanning/detail): scan each paragraph and match one core claim to one concrete example or data point.', 'This builds accuracy for detail and inference questions under assessment pressure.'),
      task('Evidence task: for each answer, cite the exact phrase or sentence that supports your interpretation.', 'Assessment-quality responses are evidence-based, not impression-based.'),
    ],
    readingText: {
      title: 'The Future of Work',
      subtitle: 'Automation, inequality and the governance of technological change',
      body: `Few questions in contemporary economics have generated more debate — or more disagreement — than the likely impact of automation and artificial intelligence on employment. The optimists point to historical precedent: every previous wave of technological disruption, from mechanisation to computerisation, is reported to have created more jobs than it destroyed, even when the transition was painful for those displaced. The pessimists argue that the current wave is categorically different: where earlier technologies replaced physical labour or routine cognitive tasks, advanced AI is beginning to encroach on non-routine, high-skill activities that were previously thought to be immune.

The empirical picture is mixed. Across OECD economies, employment rates have remained high even as automation has accelerated — a finding that appears, on the surface, to support the optimist case. However, this aggregate stability conceals significant distributional shifts. Research conducted by economists David Autor and Daron Acemoglu suggests that technological change has tended to hollow out middle-income employment — displacing routine jobs in both manufacturing and services — while generating growth at the extremes: high-skill, high-wage roles on one side, and low-skill, precarious service work on the other. The result is a labour market that is, arguably, more polarised than at any point in the past half-century.

The governance implications are substantial. If automation does produce sustained displacement without adequate compensating job creation, then the existing architecture of welfare states — designed for an era of full employment and stable careers — is likely to be insufficient. Several proposals have been advanced: universal basic income, robot taxes, enhanced retraining programmes, shorter working weeks. Each has a logic; each also has significant drawbacks. What remains unclear is whether any of these mechanisms is politically viable at the scale required.

There is also a geopolitical dimension that is often overlooked in the domestic framing. Advanced automation is estimated to confer significant competitive advantages on economies that adopt it earliest. This creates pressure for rapid adoption even where the social costs are poorly understood. For lower-income countries that have historically relied on labour-cost advantages to industrialise, the acceleration of automation in wealthy economies threatens to close the window of development that opened for East Asia in the 1980s and 1990s.

What this suggests, ultimately, is that the future of work is not a technical question with a technical answer. It is a governance question: about how societies choose to distribute the gains and costs of technological change, and about who bears the risk when transitions are disruptive. Whether the political systems of democratic societies can respond at the speed and scale required is, perhaps, the central institutional challenge of the coming decade.`,
      wordCount: 390,
    },
    comprehensionQuestions: [
      {
        question: 'In your own words, explain the difference between the "optimist" and "pessimist" positions in paragraph 1.',
        type: 'detail',
        marks: 4,
      },
      {
        question: 'What does the phrase "aggregate stability" (paragraph 2) mean? What does the author say it conceals?',
        type: 'vocabulary-and-inference',
        marks: 3,
      },
      {
        question: 'Explain in your own words what "hollowing out" of middle-income employment means according to the Autor/Acemoglu research.',
        type: 'inference',
        marks: 3,
      },
      {
        question: 'What specific threat does automation in wealthy economies pose to lower-income countries, according to paragraph 4?',
        type: 'detail',
        marks: 3,
      },
      {
        question: 'The author says the future of work is "not a technical question with a technical answer." What do they mean? Do you agree?',
        type: 'critical-analysis',
        marks: 4,
      },
      {
        question: 'Identify one passive reporting structure and one nominalization in the text. Write the full sentence for each and explain their function.',
        type: 'language-analysis',
        marks: 4,
      },
    ],
    grammarFocus: {
      title: 'B2 structures in the exit text — for post-reading analysis',
      items: [
        { example: 'every previous wave of technological disruption... is reported to have created more jobs than it destroyed', note: 'Passive reporting structure: "is reported to have + pp".' },
        { example: 'were previously thought to be immune', note: 'Passive reporting structure in past tense: "were thought to be".' },
        { example: 'the existing architecture of welfare states — designed for an era of full employment — is likely to be insufficient', note: '-ed participle clause (past participle) + likelihood hedge (is likely to).' },
        { example: 'What remains unclear is whether any of these mechanisms is politically viable at the scale required', note: 'Nominal clause subject (What remains unclear is...) — B2.7 structure.' },
        { example: 'What this suggests, ultimately, is that the future of work is not a technical question', note: 'Nominal clause subject for academic emphasis.' },
        { example: 'The acceleration of automation in wealthy economies threatens to close the window', note: 'Nominalization: accelerate → the acceleration of.' },
      ],
    },
    discussionTasks: [
      task('What do you think is the most convincing argument in this text? Is it the optimist, the pessimist, or the governance position?'),
      task('Do you think automation will affect your field of work? What skills do you think will be most valuable in the future economy?'),
    ],
    lessonRecap: 'You completed the B2 Exit Reading Assessment — a 390-word unseen academic text with comprehension, inference, vocabulary and language analysis questions at full B2 level.',
    nextLessonBridge: 'Next: the B2 Exit Listening Assessment — a panel discussion on a new unseen topic, testing your full B2 listening range.',
  }),

  // ─── LISTENING-008: B2 Exit Listening Assessment ─────────────────────────────
  createListeningLesson({
    ...common,
    id: 'B2-LISTENING-008',
    order: 208,
    title: 'B2 Exit Listening Assessment: "The Wellbeing Economy" — panel discussion',
    objectives: [
      'Complete a full B2 exit listening assessment on an unseen topic.',
      'Demonstrate command of all B2 listening skills: main ideas, detail, inference, speaker attitude.',
      'Follow a four-speaker panel at natural speed and identify positions, evidence and agreement/disagreement.',
      'Complete this assessment independently without revisiting B2 lessons.',
    ],
    teacherOpening: 'The following panel discussion addresses a topic you have not studied directly: the "wellbeing economy" — the idea that GDP growth is a poor measure of national prosperity, and that economic policy should focus instead on wellbeing indicators. The host, Dr Chen, is joined by Professor Isabel Rivera (economist), Thomas Andersen (policy adviser) and Dr Priya Nair (public health researcher). Approach this as an unseen assessment: use your B2 listening skills without preparation.',
    audioMetadata: {
      format: 'four-speaker panel discussion',
      duration: 'approx. 5 minutes',
      accents: ['British (Dr Chen)', 'Spanish-English (Prof. Rivera)', 'Danish-English (Thomas)', 'Indian-British (Dr Nair)'],
      speed: 'natural — designed as an unseen B2 exit assessment',
    },
    transcript: [
      { speaker: 'DR CHEN', turn: 1, text: "Welcome to today's programme. The question before us: is GDP the right measure of national success? And if not, what would it look like to measure what actually matters? I'm joined by Professor Isabel Rivera, Thomas Andersen and Dr Priya Nair. Isabel, you've argued for a long time that GDP is a fundamentally flawed instrument. Make your case." },
      { speaker: 'PROF. RIVERA', turn: 2, text: "GDP measures the volume of economic activity in an economy — nothing more, nothing less. It doesn't distinguish between activity that generates wellbeing and activity that destroys it. Cleaning up an oil spill increases GDP. So does treating preventable illness, building prisons, and responding to natural disasters. A society could, in theory, become dramatically worse off by every meaningful measure of human welfare and still show GDP growth. That is not a minor technical flaw. It is a fundamental mismatch between what we measure and what we care about." },
      { speaker: 'DR CHEN', turn: 3, text: "Thomas, you've worked inside government. Is this critique fair, or is it somewhat idealistic?" },
      { speaker: 'THOMAS', turn: 4, text: "The critique is fair in principle. The question is what replaces GDP, and whether any alternative measure can command the same political consensus. GDP has the advantage of being simple, comparable across countries, and resistant to manipulation. Wellbeing indices — and there are now dozens of them — tend to be more complex, more contested, and more vulnerable to the political choices embedded in their construction. Governments have found it difficult to make decisions based on them, partly because they are harder to explain to the public, and partly because different stakeholders weight different components differently." },
      { speaker: 'DR NAIR', turn: 5, text: "I want to push back slightly on Thomas's framing. The difficulty of measuring wellbeing is not a reason to keep measuring the wrong thing more easily. What the health data shows — consistently, across dozens of countries — is that above a certain income threshold, additional GDP growth is reported to have negligible effects on population health outcomes. Life expectancy, mental health, social trust: these appear to plateau well before a country reaches the income levels of, say, Scandinavia. What that suggests is that we are optimising for something that, beyond a certain point, doesn't do much for what we actually value." },
      { speaker: 'PROF. RIVERA', turn: 6, text: "And the empirical evidence on inequality is relevant here. Countries that grow their GDP rapidly while also increasing inequality — and there are many such cases in recent history — tend to see deteriorating wellbeing outcomes even as aggregate income rises. So GDP doesn't just fail to capture wellbeing directly: it can actively mislead, by suggesting progress where there is, in practice, regression for large parts of the population." },
      { speaker: 'THOMAS', turn: 7, text: "I accept that. I think the more defensible argument for GDP is not that it measures what matters — it's that it is a necessary condition for things that matter. Adequate healthcare requires public revenue. Public revenue requires economic activity. So while GDP growth is not sufficient for wellbeing, it is broadly speaking a prerequisite. The question is how to supplement it, not how to replace it." },
      { speaker: 'DR NAIR', turn: 8, text: "That's a more nuanced position than you started with. I think most wellbeing economists would broadly agree: it's not about replacing GDP as one input among many, but about ensuring it's not treated as the destination rather than a tool. What governments in Scotland, New Zealand, Iceland and Wales have done with their Wellbeing Economy Governments initiative is arguably the most promising institutional response: embedding wellbeing frameworks into budget processes, alongside GDP metrics, so that trade-offs between them are made explicitly rather than by default." },
      { speaker: 'DR CHEN', turn: 9, text: "Let me put a direct question: is any major economy likely to formally de-prioritise GDP growth in the next decade?" },
      { speaker: 'PROF. RIVERA', turn: 10, text: "Unlikely, in my view. The political economy works against it. Governments are elected on promises of economic growth; they are punished at the ballot box for recessions. Until that changes — and it may, generationally — GDP will remain the dominant metric, notwithstanding the growing body of evidence against its adequacy." },
      { speaker: 'THOMAS', turn: 11, text: "Agreed. But the indirect route may be more viable: embedding wellbeing metrics into specific policy areas — health, education, environmental protection — without requiring a wholesale replacement of GDP as the overarching metric. Incremental change within existing institutional frameworks is, historically, how durable governance reforms tend to happen." },
      { speaker: 'DR NAIR', turn: 12, text: "For what it's worth, I think the pandemic changed something. Governments made explicit decisions to prioritise health and social resilience over economic output — and most of them were broadly supported for doing so. It remains to be seen whether that shift in priorities leaves a permanent institutional mark. But it demonstrated that the alternative is politically imaginable. And that matters." },
      { speaker: 'DR CHEN', turn: 13, text: "Isabel, Thomas, Priya — thank you. A debate with real substance, and no easy answers. We'll leave it there." },
    ],
    listeningTasks: [
      {
        stage: 'FIRST LISTEN — overview',
        tasks: [
          task('What is the main criticism of GDP made by Professor Rivera?'),
          task('What is Thomas\'s main defence of GDP, and how does his position change during the discussion?'),
          task('What does Dr Nair say about the relationship between GDP and health outcomes above a certain income threshold?'),
        ],
      },
      {
        stage: 'SECOND LISTEN — detail and inference',
        tasks: [
          task('What specific examples does Professor Rivera use in turn 2 to show that GDP is a flawed measure? Name at least two.'),
          task('What does Thomas say in turn 7 that represents a shift from his earlier position? What does he now agree with?'),
          task('What is the "Wellbeing Economy Governments initiative" mentioned by Dr Nair? Which countries are involved?'),
          task('Find one example in the transcript of a passive reporting structure (is reported to, is believed to, appears to). Write the full sentence.'),
          task('"Notwithstanding the growing body of evidence against its adequacy" (turn 10) — what does "notwithstanding" signal here? What is the implication?'),
        ],
      },
      {
        stage: 'LANGUAGE AND STANCE',
        tasks: [
          task('How does Dr Nair use hedging language ("appears to plateau", "arguably") to present claims without overclaiming?'),
          task('Thomas says "Agreed. But the indirect route may be more viable." What grammatical structure is "may be more viable" using, and what does it signal about his certainty?'),
        ],
      },
    ],
    discussionPrompts: [
      'Which speaker do you find most convincing? Why?',
      'Dr Nair argues that the pandemic demonstrated that prioritising health over GDP is "politically imaginable." Do you think this shift is permanent?',
      'Thomas suggests that GDP is a "necessary condition" for wellbeing, even if not sufficient. Do you agree?',
    ],
    lessonRecap: 'You completed the B2 Exit Listening Assessment — a 13-turn unseen panel discussion on the wellbeing economy, demonstrating full B2 listening comprehension, detail extraction, inference and language analysis.',
    nextLessonBridge: 'Now for the final two tasks of the B2 Gate: a production writing assessment and the B2 capstone certification paragraph.',
  }),

  // ─── WRITING-012: B2 Exit Writing Task ───────────────────────────────────────
  createWritingLesson({
    ...common,
    id: 'B2-WRITING-012',
    order: 412,
    title: 'B2 Exit Writing Task: Formal discursive paragraph on an unseen topic',
    objectives: [
      'Write a 160–190 word formal discursive paragraph on an unseen topic at full B2 level.',
      'Demonstrate command of the full B2 writing toolkit without prompts or scaffolding.',
      'Apply grammar, vocabulary, cohesion and argument structure independently.',
      'This is an unseen task — no examples, no models, no sentence starters.',
    ],
    teacherOpening: 'This is the B2 Exit Writing Task. There are no models, no scaffolding, no checklists guiding you through the structures — only the topic and the word count. You are demonstrating that you can produce formal B2 written English independently. This is what the B2 Gate tests.',
    writingTasks: [
      {
        task: 'Write a formal discursive paragraph of 160–190 words on ONE of the following topics. You will be assessed on: argumentation, grammar accuracy and range, vocabulary precision, cohesion, register and qualification. No notes, no previous lesson reference.',
        options: [
          'Measuring national prosperity by GDP growth alone is insufficient and potentially misleading. Discuss.',
          'The most significant driver of global inequality is not poverty, but the concentration of wealth at the top. Argue and qualify.',
          'Technological change creates as many problems as it solves. Is this a fair assessment? Argue a nuanced position.',
        ],
      },
    ],
    writingChecklist: [
      'Between 160 and 190 words.',
      'Formal academic register throughout.',
      'Clear argumentative structure: claim, evidence/reasoning, counterargument, conclusion.',
      'Range of B2 grammar structures (assessed by self-review or teacher).',
      'Precise B2 vocabulary from multiple modules.',
      'Advanced paragraph connectors.',
      'Qualification language.',
      'Cohesion devices (reference, connectors).',
      'No contractions, no informal vocabulary.',
    ],
    lessonRecap: 'You completed the B2 Exit Writing Task — an independent, unseen 160–190 word formal discursive paragraph at full B2 level.',
    nextLessonBridge: 'Final lesson of B2 and the entire B2 curriculum: the B2 Gate Certification Paragraph — your formal declaration of B2 readiness and your bridge to C1.',
  }),

  // ─── WRITING-013: B2 Gate Certification ──────────────────────────────────────
  createWritingLesson({
    ...common,
    id: 'B2-WRITING-013',
    order: 413,
    title: 'B2 Gate: Certification paragraph — bridge to C1',
    objectives: [
      'Write a 150–180 word reflective academic paragraph summarising your B2 learning journey.',
      'Demonstrate awareness of the transition from B2 to C1.',
      'Apply the full B2 toolkit one final time in a personally meaningful production task.',
      'Confirm readiness to progress to C1: Advanced English.',
    ],
    teacherOpening: 'The B2 Gate is not an examination — it is a declaration. By completing B2.1 through B2.8, you have covered all the core grammar, vocabulary, reading, listening, speaking and writing competencies associated with CEFR B2: Upper Intermediate. You can: argue and qualify complex positions in formal written and spoken English; read dense academic and journalistic texts; follow natural multi-speaker discussions at full speed; write formal analytical, discursive and argumentative paragraphs at near-professional level. C1 — Advanced — will take everything you have built here and push it further: towards near-native fluency, C1 reading in fully academic texts, and production that approaches the level expected in university education and professional international contexts.',
    writingModel: {
      title: 'Model: B2 Gate Certification Paragraph',
      text: `The transition from B1 to B2 is, arguably, the most significant shift in the English language learning journey — not in terms of vocabulary load or grammar complexity alone, but in terms of register: the capacity to think and communicate in the formal, qualified, evidence-based language of academic and professional discourse. Over the course of B2, I have developed the ability to construct and sustain formal arguments, to use passive reporting structures and nominalization with the confidence of a writer who has internalised — not merely memorised — these tools. What strikes me as the most important lesson of B2 is not any single grammar structure, but the insight that good formal writing is not a matter of using difficult words: it is a matter of precision, qualification and intellectual honesty. As I move into C1, the challenge is to consolidate what I have learned at a level where it no longer requires conscious effort, and to begin pushing towards the fluency, density and rhetorical range that characterise near-native academic and professional English.`,
      wordCount: 167,
    },
    writingTasks: [
      {
        task: 'Write your own B2 Gate Certification Paragraph of 150–180 words. Reflect on your B2 learning: what you found most challenging, what you are most confident about, and what you intend to focus on in C1. Use formal register and the B2 structures and vocabulary you feel most confident with.',
        note: 'This is the only task in the B2 curriculum that is genuinely personal. There is no wrong answer — but there is a wrong register. Write in the B2 formal academic voice you have spent this module building.',
      },
    ],
    writingChecklist: [
      'Between 150 and 180 words.',
      'Formal academic register (no contractions, no informal vocabulary).',
      'At least three B2 grammar structures used naturally.',
      'At least four B2 vocabulary items from across the modules.',
      'Qualification language present (arguably, tend to, appear to, on balance).',
      'Advanced paragraph connectors used.',
      'Personal reflection is genuine and specific — not generic.',
    ],
    lessonRecap: 'You completed the B2 Gate Certification Paragraph — a reflective formal production task confirming B2 completion and readiness for C1.',
    nextLessonBridge: 'B2 is complete. You have covered 83 lessons across B2.1–B2.8: grammar, vocabulary, reading, listening, speaking and writing at full B2 CEFR level. Your next level is C1 — Advanced English — where the focus shifts to near-native fluency, complex inference, academic essay writing, and the register of international professional and academic discourse.',
  }),

]);

export const B2_DEEP_CHECKPOINTS_PART2_BY_PILLAR = Object.freeze({
  reading: B2_DEEP_CHECKPOINTS_PART2.filter(l => l.pillar === 'reading'),
  listening: B2_DEEP_CHECKPOINTS_PART2.filter(l => l.pillar === 'listening'),
  writing: B2_DEEP_CHECKPOINTS_PART2.filter(l => l.pillar === 'writing'),
});
