import { createReadingLesson, createListeningLesson, createWritingLesson } from '../../../schemas/index.js';

const level = 'B2';
const status = 'ready';
const common = { level, status, estimatedMinutes: 65, tags: ['b2-6', 'global-issues', 'academic', 'deep-approved-target'] };

function task(instruction, note = '', expected = '') { return { instruction, note, expected }; }

export const B2_DEEP_GLOBAL_ISSUES_PART2 = Object.freeze([

  // ─── READING-008: Data-rich article on global inequality ─────────────────────
  createReadingLesson({
    ...common,
    id: 'B2-READING-008',
    order: 108,
    title: 'Reading: "The Inequality Paradox" — a data-driven article on global wealth and poverty',
    objectives: [
      'Read a 420-word data-rich article on global inequality with full B2 comprehension.',
      'Identify and interpret statistics, trends and proportional comparisons in context.',
      'Recognise passive reporting structures and nominalization in academic prose.',
      'Evaluate the author\'s argument and distinguish evidence from interpretation.',
    ],
    readingStrategy: [
      task('Before reading: predict the paradox in the title. How could global poverty decline while inequality still becomes more serious? Write one possible explanation before you read.', 'This gives you a hypothesis to test against the data.'),
      task('First read (gist): read quickly and identify the main contrast the article builds: global-level progress versus within-country inequality.', 'Focus on the argument shape before analysing the numbers.'),
      task('Second read (scanning/detail): locate every statistic in the text and label what each one proves, qualifies or complicates.', 'B2 data reading requires connecting numbers to claims, not memorising figures.'),
      task('Evidence task: before answering, copy the sentence that links inequality to social mobility, trust, polarisation or long-run growth.', 'Use this sentence as textual evidence for the analysis question about implications.'),
    ],
    readingText: {
      title: 'The Inequality Paradox',
      subtitle: 'How global poverty has declined as inequality within nations has surged',
      body: `The story of global inequality over the past three decades is, paradoxically, one of both remarkable progress and deepening division. At the global level, the reduction in extreme poverty has been substantial. The share of the world's population living on less than $2.15 per day fell from approximately 36% in 1990 to under 9% by 2020 — a decline that is estimated to represent nearly one billion people lifted out of extreme poverty in a single generation. This achievement, largely attributed to rapid economic development in China and, to a lesser extent, India, is widely regarded as one of the most significant improvements in human welfare in modern history.

Yet the aggregate figures conceal a more troubling picture. While inequality between nations has narrowed considerably, inequality within nations has grown — in many cases, dramatically. The share of national income captured by the top 1% of earners is reported to have increased in the majority of advanced economies since 1980. In the United States, the richest 1% now hold nearly 38% of total national wealth, a figure that is roughly three times as high as their share in the early 1970s.

The mechanisms behind this intra-national divergence are complex. Globalisation, believed to have depressed wages for low-skilled workers in wealthy countries while creating enormous returns for capital owners, is frequently cited as a primary driver. Technological change, thought to disproportionately benefit high-skilled workers, is another. The erosion of labour protections and the decline of collective bargaining — estimated to have reduced union membership in OECD countries by nearly 30 percentage points since 1980 — have further concentrated income at the top.

The implications are significant. High levels of domestic inequality are associated with reduced social mobility, weakened public trust, and, in the political sphere, increased polarisation. Research conducted at the IMF and the OECD has consistently found a negative correlation between inequality and long-run economic growth — a finding that rebuts the premise that inequality is a necessary cost of a dynamic economy.

What is perhaps most striking is the contrast in policy responses. On climate change, governments are at least nominally committed to multilateral action. On inequality, no comparable governance framework exists. The result is that while the challenge is empirically well-documented and its implications broadly understood, the political consensus required to address it remains elusive. The development of such consensus may be the defining governance challenge of the coming decades.`,
      wordCount: 355,
    },
    comprehensionQuestions: [
      {
        question: 'According to paragraph 1, what is the "remarkable progress" in global inequality over the past 30 years?',
        type: 'detail',
      },
      {
        question: 'What does "the aggregate figures conceal" (paragraph 2)? What is being hidden?',
        type: 'inference',
        guidance: 'Think about what "aggregate" means — total/overall — and what the following sentence reveals.',
      },
      {
        question: 'Identify THREE factors cited in paragraph 3 as drivers of inequality within nations.',
        type: 'detail',
      },
      {
        question: 'What does the IMF/OECD research finding "rebut"? What premise does it challenge?',
        type: 'language-focus',
        guidance: 'Use the vocabulary from B2.6 — what is the premise being rebutted?',
      },
      {
        question: 'How does the author use the contrast with climate change in the final paragraph to make their argument?',
        type: 'analysis',
        guidance: 'Think about what the comparison implies about political will and governance.',
      },
    ],
    grammarFocus: {
      title: 'Passive reporting structures and nominalization in the text',
      items: [
        { example: 'a decline that is estimated to represent nearly one billion people lifted out of extreme poverty', note: 'Passive reporting structure (is estimated to) for statistical claim without specifying who estimated it.' },
        { example: 'largely attributed to rapid economic development in China', note: 'Past participle clause (passive) — "which is largely attributed to..."' },
        { example: 'Globalisation, believed to have depressed wages for low-skilled workers...', note: 'Passive reporting structure within a non-defining construction.' },
        { example: 'The erosion of labour protections and the decline of collective bargaining', note: 'Nominalization: erode → erosion; decline (verb) → the decline (noun).' },
        { example: 'a finding that rebuts the premise that inequality is a necessary cost of a dynamic economy', note: 'Demonstrates academic argument vocabulary (rebut, premise) in context.' },
      ],
    },
    discussionTasks: [
      task('Do you find the author\'s argument convincing? What is the strongest point they make?'),
      task('The article claims there is no "governance framework" for inequality comparable to climate change. Do you think this is accurate? What would such a framework need to look like?'),
      task('Is reducing inequality within a country more or less important than reducing inequality between countries? Discuss.'),
    ],
    lessonRecap: 'You read a 355-word data-driven article on global inequality and practised identifying passive reporting structures, nominalization and academic argument vocabulary in authentic formal prose.',
    nextLessonBridge: 'Next, you will read an opinion editorial on global governance, focusing on inference, authorial stance and the use of concession in formal argumentative writing.',
  }),

  // ─── READING-009: Opinion editorial on global governance ─────────────────────
  createReadingLesson({
    ...common,
    id: 'B2-READING-009',
    order: 109,
    title: 'Reading: "The Limits of Global Governance" — opinion editorial',
    objectives: [
      'Read a 330-word opinion editorial on global governance at B2 level.',
      'Identify the author\'s argument structure: claim, evidence, concession, restate.',
      'Distinguish between facts and opinions in a persuasive text.',
      'Recognise and evaluate hedging, qualification and qualification language in formal opinion writing.',
    ],
    readingStrategy: [
      task('Before reading: list two global problems that individual countries cannot solve alone. Predict why global institutions might struggle with them.', 'This prepares you to evaluate the article\'s governance argument.'),
      task('First read (gist): identify the author\'s overall position: has multilateralism failed, or is the argument more qualified?', 'Look for the concession that prevents a simple yes/no reading.'),
      task('Second read (scanning/detail): mark the examples of institutional strain in paragraph 2 and the examples of multilateral success in paragraph 3.', 'Scanning the contrast helps you see how the editorial balances criticism and concession.'),
      task('Evidence task: copy one phrase that reveals authorial stance rather than neutral reporting, then explain what attitude it signals.', 'Use this as evidence for the critical-reading question about fact versus opinion.'),
    ],
    readingText: {
      title: 'The Limits of Global Governance',
      subtitle: 'Why multilateral institutions are struggling — and what, if anything, can be done',
      body: `The institutions of global governance — the United Nations, the World Trade Organisation, the International Monetary Fund — were designed for a world that no longer exists. Established in the aftermath of the Second World War, they reflected the priorities of their founders: preventing another catastrophic conflict, stabilising the international economy, and providing a forum for dialogue between sovereign states. Whether they were ever fully fit for purpose is debatable. What is harder to dispute is that they are now under unprecedented strain.

The reasons are structural. The UN Security Council's permanent membership still reflects the power distribution of 1945. The IMF's voting structure is widely thought to underrepresent the interests of the Global South, despite reforms introduced in 2010. The WTO's dispute resolution mechanism is reported to have ground to a near-halt as the United States blocked the appointment of new judges. And new challenges — climate change, pandemic preparedness, AI regulation — have emerged for which no adequate multilateral framework exists.

That said, it would be too easy to conclude that multilateralism has failed. It has not. The Montreal Protocol, which successfully coordinated global action on the ozone layer, is estimated to have prevented 280 billion tonnes of carbon equivalent emissions. The Sustainable Development Goals, for all their limitations, provide a common language and accountability framework for 193 member states. Incremental progress, unphotogenic and slow, continues.

The real challenge is not whether global governance is working, but whether it can evolve fast enough. The premise that sovereign states will voluntarily cede authority to supranational institutions is becoming harder to sustain as nationalism rises. Yet the premise that individual states can address planetary problems alone is empirically untenable. This tension, arguably the defining contradiction of 21st-century politics, has no clean resolution. What it demands, above all, is a clear-eyed assessment of what global governance can realistically achieve — and a willingness to invest in making it work better, even when perfect is not on offer.`,
      wordCount: 310,
    },
    comprehensionQuestions: [
      {
        question: 'According to the author, what were global institutions designed for, and why is this a problem now?',
        type: 'detail',
      },
      {
        question: 'The author presents a concession in paragraph 3. What is the concession, and what evidence does the author use to support it?',
        type: 'analysis',
        guidance: '"That said, it would be too easy to conclude..." — identify the structure.',
      },
      {
        question: 'What does the author mean by calling progress "unphotogenic and slow"?',
        type: 'inference',
      },
      {
        question: 'In paragraph 4, the author identifies a "tension" or "defining contradiction." In your own words, what is it?',
        type: 'analysis',
      },
      {
        question: 'Is this text primarily factual reporting, opinion, or a mixture? Identify TWO phrases that reveal the author\'s perspective.',
        type: 'critical-reading',
      },
    ],
    grammarFocus: {
      title: 'Qualification and concession language in the editorial',
      items: [
        { example: 'Whether they were ever fully fit for purpose is debatable.', note: 'Qualification — the author doesn\'t fully commit; signals honest uncertainty.' },
        { example: 'is widely thought to underrepresent', note: 'Passive reporting structure — "widely thought to" hedges the claim.' },
        { example: 'That said, it would be too easy to conclude that multilateralism has failed.', note: 'Concession structure — the author grants a possible view before opposing it.' },
        { example: 'for all their limitations', note: 'Concession insertion — acknowledges weakness without abandoning the main point.' },
        { example: 'arguably the defining contradiction of 21st-century politics', note: '"Arguably" — qualification adverb; marks this as the author\'s interpretation, not a fact.' },
      ],
    },
    discussionTasks: [
      task('Do you agree that multilateral institutions are "under unprecedented strain"? What examples can you think of?'),
      task('The author argues that neither full multilateralism nor full national sovereignty can work. Do you see a third path?'),
      task('Compare the two texts you have read (inequality and governance). Which argument do you find more convincing, and why?'),
    ],
    lessonRecap: 'You read a 310-word opinion editorial on global governance and practised identifying argument structure, authorial stance, and qualification language in formal persuasive writing.',
    nextLessonBridge: 'Next: a 14-turn listening exercise — a panel discussion on climate policy featuring four speakers with different perspectives. This is full B2 natural-speed listening.',
  }),

  // ─── LISTENING-006: Panel discussion on climate change policy ────────────────
  createListeningLesson({
    ...common,
    id: 'B2-LISTENING-006',
    order: 206,
    title: 'Listening: "The Climate Summit" — panel discussion on climate policy and global governance',
    objectives: [
      'Follow a fast-paced 14-turn panel discussion on climate policy among four speakers.',
      'Identify each speaker\'s position and the evidence or reasoning they use.',
      'Recognise passive reporting structures, nominalization and qualification language in natural speech.',
      'Evaluate competing arguments and identify points of agreement and disagreement.',
    ],
    teacherOpening: 'The following panel discussion was recorded at a public policy forum. The moderator, Sofia, is joined by four guests: Dr Yuki Tanaka, a climate scientist; James Okonkwo, a climate economist; Carla Vásquez, a policy adviser for a middle-income country; and Edward Marsh, a journalist covering energy and politics. They are discussing the question: "Are the current commitments under international climate agreements sufficient — and if not, what is holding us back?"',
    audioMetadata: {
      format: 'four-speaker panel discussion with moderator',
      duration: 'approx. 6 minutes',
      accents: ['American English (Sofia)', 'Japanese-English (Dr Tanaka)', 'Nigerian-British English (James)', 'Colombian-English (Carla)', 'British RP (Edward)'],
      speed: 'natural — fast with minor overlaps in turns 9–10',
    },
    transcript: [
      { speaker: 'SOFIA', turn: 1, text: "Welcome to today's panel. The question on the table is one of the most consequential of our time: are the commitments made under international climate agreements sufficient to limit warming to 1.5 degrees, and if they are not, what is blocking progress? Dr Tanaka, you have spent your career on this — where do we stand scientifically?" },
      { speaker: 'DR TANAKA', turn: 2, text: "The scientific picture is stark. Current national pledges — so-called Nationally Determined Contributions — are estimated to put us on track for approximately 2.7 degrees of warming by the end of the century. There is near-consensus in the scientific community that even 2 degrees would have catastrophic consequences for many parts of the world. We are, in other words, significantly off course." },
      { speaker: 'SOFIA', turn: 3, text: "James, you look at the economics. Is the problem fundamentally one of political will, or of cost?" },
      { speaker: 'JAMES', turn: 4, text: "It's increasingly clear that cost is not the main barrier. Renewable energy is reported to have become cheaper than new fossil fuel power in nearly every major economy. The economic case for the transition is no longer seriously in dispute. What remains contested is how to distribute the costs — who bears the burden of early transition, and how do we compensate workers in fossil fuel industries and lower-income countries who are asked to sacrifice the development pathway that wealthy nations benefited from for over a century?" },
      { speaker: 'CARLA', turn: 5, text: "This is precisely the issue from where I sit. My country has contributed less than 0.5% of cumulative global emissions. We are already experiencing the consequences of climate change: more intense droughts, disrupted rainfall patterns, increased displacement. And yet we are expected to adopt the same mitigation targets as countries that industrialised on coal and oil for generations. The premise of equal responsibility is, frankly, indefensible." },
      { speaker: 'EDWARD', turn: 6, text: "I take Carla's point, but I think the counterargument is worth putting. Some of the largest current emitters are not the historical industrialised economies — China, India, Brazil are all now major contributors. Framing this purely as a North-South issue may obscure the complexity. The question is not just about historical responsibility but about where emissions are coming from today and where they will come from tomorrow." },
      { speaker: 'CARLA', turn: 7, text: "That's a fair point about current emissions. But even current per-capita figures show a huge disparity — a citizen of the United States is thought to emit, on average, roughly twelve times as much CO2 as a citizen of Nigeria. The structural inequality in who is causing climate change and who is most vulnerable to it is empirically documented, and it has major implications for how we design fair governance frameworks." },
      { speaker: 'DR TANAKA', turn: 8, text: "Both things can be true simultaneously. Historical responsibility matters for questions of climate finance and adaptation funding. But the physics doesn't distinguish between historical and current emissions. The atmosphere is warming regardless of who is technically to blame. This is why mitigation requires all major emitters to act, while the governance question of how to share the burden justly is a separate, though equally important, conversation." },
      { speaker: 'JAMES', turn: 9, text: "The failure of multilateral institutions to resolve this has been a significant obstacle. The Green Climate Fund, established to help developing countries transition, is reported to be chronically underfunded — current commitments are estimated to cover less than a fifth of what is required. Trust between the Global North and South has deteriorated." },
      { speaker: 'EDWARD', turn: 10, text: "And yet — and I don't want to be the optimist in the room, but the evidence is there — the pace of transition in energy is genuinely accelerating. Solar deployment is growing at a rate that would have been considered implausible a decade ago. The question is whether it is fast enough, and whether the political structures needed to manage the transition fairly will emerge in time." },
      { speaker: 'SOFIA', turn: 11, text: "Carla, do you see grounds for optimism?" },
      { speaker: 'CARLA', turn: 12, text: "Cautious, qualified optimism — perhaps. The Loss and Damage fund agreed at COP27 was a breakthrough in recognising that climate-vulnerable countries deserve compensation, not just mitigation support. But the details remain contested and the funding unresolved. Whether it represents a genuine shift in the governance framework or a diplomatic gesture will depend on what happens next." },
      { speaker: 'DR TANAKA', turn: 13, text: "The implication of the science is clear: we have perhaps a decade to make decisions that will shape the trajectory of the planet for centuries. Whether the political system is capable of responding at that speed and scale is, I think, the question of our time. And I say that not to be dramatic, but because it is what the data shows." },
      { speaker: 'SOFIA', turn: 14, text: "Dr Tanaka, James, Carla, Edward — a sobering, necessary conversation. Thank you. After the break: what role can individuals and cities play when national governments fall short? Stay with us." },
    ],
    listeningTasks: [
      {
        stage: 'BEFORE YOU LISTEN',
        tasks: [
          task('In one sentence, write down your own position: "Are international climate commitments sufficient?" Note your answer before you listen.'),
        ],
      },
      {
        stage: 'FIRST LISTEN — overview',
        tasks: [
          task('Match each speaker to their main concern: (a) the science is clear — we are off course; (b) the cost barrier has been solved, the distribution question has not; (c) equal responsibility is unjust for countries with minimal emissions; (d) framing this as North-South misses the complexity of current emissions.', '', 'Dr Tanaka→(a); James→(b); Carla→(c); Edward→(d)'),
          task('Who expresses the most optimistic view? What specific evidence do they cite?'),
        ],
      },
      {
        stage: 'SECOND LISTEN — detail and language',
        tasks: [
          task('What percentage of cumulative global emissions does Carla\'s country account for?'),
          task('What does James say about the cost of renewable energy?'),
          task('Dr Tanaka says "both things can be true simultaneously." What two things is he referring to?'),
          task('Find one example in the transcript where a speaker uses a passive reporting structure (is estimated to, is reported to, is thought to). Write the full sentence.'),
          task('Edward says "I don\'t want to be the optimist in the room, but..." What function does this phrase serve? Is it hedging, conceding, or something else?'),
        ],
      },
      {
        stage: 'CRITICAL THINKING',
        tasks: [
          task('After listening, has your view changed from what you noted before listening? Why or why not?'),
          task('Which speaker do you think makes the strongest argument? What makes it effective — evidence, structure, language, or something else?'),
        ],
      },
    ],
    discussionPrompts: [
      'The panel seems to agree that cost is no longer the main barrier to climate action. If that\'s true, what is the real barrier?',
      'Dr Tanaka separates the scientific question ("what must be done") from the governance question ("who bears the burden"). Is that distinction helpful or does it risk delay?',
      'Do you think the "Loss and Damage" fund represents a genuine governance breakthrough? What would make it meaningful rather than symbolic?',
    ],
    lessonRecap: 'You listened to a 14-turn panel discussion on climate policy and practised identifying speaker positions, extracting detail, recognising passive reporting structures in natural speech, and evaluating competing arguments.',
    nextLessonBridge: 'You are now ready for the writing lessons of B2.6 — formal paragraphs interpreting data and constructing arguments, using all the structures and vocabulary you have practised in this module.',
  }),

  // ─── WRITING-008: Data interpretation analytical paragraph ───────────────────
  createWritingLesson({
    ...common,
    id: 'B2-WRITING-008',
    order: 408,
    title: 'Writing: Analytical paragraph — interpreting data on a global issue',
    objectives: [
      'Write a 130–170 word formal paragraph interpreting data on a global issue.',
      'Use passive reporting structures (is estimated to, is reported to) to introduce data.',
      'Apply nominalization to create a formal, academic tone.',
      'Interpret the data — not just describe it — by connecting it to a broader argument.',
    ],
    teacherOpening: 'At B2 level, you are expected not just to report statistics but to interpret them — to say what they mean, what they imply, and what their limitations are. This is the difference between data presentation and data analysis. Today\'s task practises exactly that, using the grammar structures from B2.6: passive reporting, nominalization, advanced quantifiers, and academic vocabulary.',
    writingModel: {
      title: 'Model paragraph: Interpreting renewable energy cost data',
      text: `The decline in the cost of renewable energy over the past decade is estimated to represent one of the most significant shifts in the global energy economy in living memory. The cost of solar power is reported to have fallen by approximately 89% between 2010 and 2022 — a reduction that has transformed the economic case for the clean energy transition from aspiration to near-certainty. This development has significant implications for the debate on climate mitigation: the premise that decarbonisation requires economic sacrifice has been substantially rebutted. That said, cost reduction alone cannot account for the pace of transition required. The distribution of costs and benefits across income groups and countries remains deeply unequal, and the governance frameworks needed to ensure a just transition are, by most assessments, insufficiently developed. The data is encouraging; the implication is that the barriers to action are now primarily political, not economic.`,
      wordCount: 151,
    },
    grammarAnnotations: [
      { highlight: 'The decline in the cost of renewable energy', label: 'Nominalization: "costs declined" → "the decline in the cost of".' },
      { highlight: 'is estimated to represent one of the most significant shifts', label: 'Passive reporting structure for the statistical claim.' },
      { highlight: 'is reported to have fallen by approximately 89%', label: 'Passive reporting with perfect infinitive — past completed event.' },
      { highlight: 'the premise that decarbonisation requires economic sacrifice has been substantially rebutted', label: 'Academic argument vocabulary: premise + rebut; passive perfect.' },
      { highlight: 'That said, cost reduction alone cannot account for', label: 'Concession structure — pivots from positive finding to remaining challenge.' },
      { highlight: 'The data is encouraging; the implication is that', label: 'Short conclusion using academic argument vocabulary (implication).' },
    ],
    writingTasks: [
      {
        task: 'Write an analytical paragraph of 130–170 words interpreting ONE of the following data sets. Do NOT just describe the numbers — explain what they mean and what they imply.',
        options: [
          'Global displacement: 110 million forcibly displaced people worldwide in 2023, compared to 59 million in 2014. Half are children. 70% remain within their own countries as internally displaced persons.',
          'Global wealth distribution: the top 1% owns 38% of all global wealth; the bottom 50% owns 2%. In 1995, the top 1% owned 28%. The gap has widened in every decade since.',
          'Education and inequality: every additional year of schooling is associated with approximately a 9% increase in lifetime earnings. Yet in low-income countries, 57% of children reach age 10 unable to read a simple text.',
        ],
      },
    ],
    writingChecklist: [
      'Between 130 and 170 words.',
      'Formal register — no contractions.',
      'At least one passive reporting structure (is estimated to, is reported to, is thought to, is believed to).',
      'At least one example of nominalization (e.g. the rise in..., the failure of..., the development of...).',
      'Data is interpreted — what does it mean? What are the implications?',
      'Concession or qualification present.',
      'Academic argument vocabulary used (at least one: implication, premise, consensus, empirical, etc.).',
    ],
    lessonRecap: 'You wrote a 130–170 word formal paragraph interpreting global data using passive reporting structures, nominalization, qualification and academic argument vocabulary.',
    nextLessonBridge: 'Final lesson of B2.6: a capstone argumentative paragraph on a global governance topic, bringing together everything from B2.6 and demonstrating full B2 formal written production.',
  }),

  // ─── WRITING-009: Capstone argumentative paragraph on global governance ───────
  createWritingLesson({
    ...common,
    id: 'B2-WRITING-009',
    order: 409,
    title: 'Writing: Capstone argumentative paragraph — global issues at full B2 level',
    objectives: [
      'Write a 150–190 word formal argumentative paragraph on a global issues topic.',
      'Demonstrate command of all B2.6 grammar: passive reporting structures, nominalization, advanced comparisons.',
      'Use B2.6 vocabulary: at least three items from global issues (V013) and argument language (V014).',
      'Produce a fully developed argument: claim → evidence → counterargument → nuanced conclusion.',
    ],
    teacherOpening: 'This is the capstone writing task for B2.6. You are writing a full formal argumentative paragraph — the kind expected in a university essay, a policy brief, or a high-quality op-ed. The standard is high: every sentence should be precise, every claim supported or qualified, and every key structural element present. This is full B2 formal written production.',
    writingModel: {
      title: 'Model paragraph: The governance gap on global inequality',
      text: `The persistence of extreme inequality both within and between nations represents, arguably, one of the most significant failures of global governance in the post-war era. While the reduction in absolute poverty is estimated to have benefited nearly one billion people since 1990, the distribution of that progress has been deeply unequal: gains have been concentrated in East Asia, while large parts of sub-Saharan Africa and South Asia remain significantly below pre-crisis trajectories. The premise that rising tides lift all boats — that economic growth naturally reduces inequality over time — has been substantially rebutted by empirical research demonstrating that, without active redistribution and structural reform, growth tends to widen rather than narrow the gap between those at the top and those at the bottom. The counterargument — that inequality is a necessary incentive structure for innovation and growth — has merit in narrow circumstances, but it does not account for the scale or persistence of the disparities we observe. On balance, the implication of the evidence is that a stronger global governance framework for inequality is not merely desirable, but necessary if the gains of globalisation are to be sustained and broadly shared.`,
      wordCount: 194,
    },
    grammarAnnotations: [
      { highlight: 'represents, arguably, one of the most significant failures of global governance', label: 'Qualification adverb (arguably) hedges the strong claim appropriately.' },
      { highlight: 'the reduction in absolute poverty is estimated to have benefited nearly one billion people', label: 'Nominalization (the reduction in) + passive reporting structure (is estimated to have).' },
      { highlight: 'the distribution of that progress has been deeply unequal', label: 'Nominalization: distribute → the distribution of. Intensifier: deeply.' },
      { highlight: 'The premise that rising tides lift all boats ... has been substantially rebutted by empirical research', label: 'Academic argument vocabulary: premise + rebutted + empirical.' },
      { highlight: 'growth tends to widen rather than narrow the gap', label: 'Qualification (tends to) + comparison structure (widen rather than narrow).' },
      { highlight: 'The counterargument ... has merit in narrow circumstances, but it does not account for', label: 'Full counterargument structure — acknowledged but qualified and rebutted.' },
      { highlight: 'the implication of the evidence is that a stronger global governance framework is not merely desirable, but necessary', label: 'Academic vocabulary (implication) in conclusion + emphatic "not merely X but Y" structure.' },
    ],
    writingTasks: [
      {
        task: 'Write a formal argumentative paragraph of 150–190 words on ONE of the following topics. Follow the model structure: claim → evidence/data → counterargument + rebuttal → nuanced conclusion.',
        options: [
          'International sanctions have proved to be a blunt and unreliable instrument of global governance.',
          'The burden of climate mitigation is distributed unjustly across nations, and current multilateral frameworks do not adequately address this.',
          'Multilateral institutions need fundamental reform, not incremental adjustment, to meet the challenges of the 21st century.',
        ],
      },
    ],
    writingChecklist: [
      'Between 150 and 190 words.',
      'Formal register throughout.',
      'Clear argumentative claim in the first 2 sentences.',
      'Evidence or data used (can be the statistics referenced in this module).',
      'At least one passive reporting structure (is estimated to, is said to, is reported to, etc.).',
      'At least one nominalization.',
      'At least one qualification or hedging expression.',
      'Counterargument acknowledged and rebutted.',
      'At least three vocabulary items from V013 (global issues) or V014 (academic argument).',
      'Nuanced conclusion using implication, on balance, or equivalent.',
    ],
    lessonRecap: 'You wrote a 150–190 word capstone argumentative paragraph demonstrating full B2 formal written production — passive reporting, nominalization, qualification, academic argument vocabulary, counterargument structure.',
    nextLessonBridge: 'B2.6 is complete. You are now ready for B2.7 — Academic Proficiency: advanced cohesion and reference, complex clause structure, paraphrasing and summarising at B2+ level, and academic register across reading, listening, speaking and writing.',
  }),

]);

export const B2_DEEP_GLOBAL_ISSUES_PART2_BY_PILLAR = Object.freeze({
  reading: B2_DEEP_GLOBAL_ISSUES_PART2.filter(l => l.pillar === 'reading'),
  listening: B2_DEEP_GLOBAL_ISSUES_PART2.filter(l => l.pillar === 'listening'),
  writing: B2_DEEP_GLOBAL_ISSUES_PART2.filter(l => l.pillar === 'writing'),
});