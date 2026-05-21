import { createGrammarLesson, createVocabularyLesson, createSpeakingLesson } from '../../../schemas/index.js';

const level = 'B2';
const status = 'ready';
const common = { level, status, estimatedMinutes: 65, tags: ['b2-6', 'global-issues', 'academic', 'deep-approved-target'] };

function task(instruction, note = '', expected = '') { return { instruction, note, expected }; }

export const B2_DEEP_GLOBAL_ISSUES_PART1 = Object.freeze([

  // ─── GRAMMAR-016: Passive with reporting verbs ───────────────────────────────
  createGrammarLesson({
    ...common,
    id: 'B2-GRAMMAR-016',
    order: 16,
    title: 'Passive reporting structures: "is said to", "is believed to", "is reported to"',
    objectives: [
      'Use passive reporting structures (is said to, is believed to, is thought to, is reported to, is estimated to) to attribute claims without a named source.',
      'Distinguish between "It is said that..." and "...is said to..." — two equally valid forms.',
      'Recognise these structures as essential in academic and journalistic writing.',
      'Produce sentences using passive reporting structures in global issues discourse.',
    ],
    teacherOpening: 'Passive reporting structures are one of the defining features of formal written English at B2 level. Instead of saying "People think inequality is rising" or "Researchers say migration has increased", formal English says: "Inequality is thought to be rising" or "Migration is reported to have increased." These forms let writers attribute claims without specifying the source — vital in academic writing, journalism and official reports.',
    whyItMatters: 'In academic writing, policy documents and journalism, passive reporting structures allow the writer to maintain formal distance, present claims as widely held, and avoid personally endorsing them. They are essential for B2 formal writing tasks on global issues.',
    differenceFromA2: 'A1/A2: "People say that poverty is increasing." B1: "It is said that poverty is increasing." B2: "Poverty is said to be increasing" / "Poverty is estimated to have increased by 12% since 2010."',
    grammarTable: {
      headers: ['Structure', 'Formula', 'Meaning', 'Example'],
      rows: [
        ['is/are said to + inf', 'Subject + is/are said to + base inf', 'General claim', 'Inequality is said to be the defining challenge of our era.'],
        ['is/are believed to + inf', 'Subject + is/are believed to + base inf', 'Widely held belief', 'The policy is believed to have failed due to poor implementation.'],
        ['is/are thought to + inf', 'Subject + is/are thought to + base inf', 'Expert opinion', 'Climate change is thought to be accelerating faster than predicted.'],
        ['is/are reported to + inf', 'Subject + is/are reported to + base inf', 'News/media claim', 'Displacement is reported to have reached record levels this year.'],
        ['is/are estimated to + inf', 'Subject + is/are estimated to + base inf', 'Statistical estimate', 'Global emissions are estimated to have risen by 1.5% last year.'],
        ['It is said/believed/thought that...', 'Impersonal it + passive + that-clause', 'Alternative form', 'It is widely believed that multilateral action is now essential.'],
      ],
    },
    perfectInfinitive: {
      title: 'Present vs perfect infinitive',
      explanation: 'Use "to be + -ing" for something happening now; "to have + pp" for something that already happened.',
      examples: [
        { present: 'Emissions are thought to be rising. (now)', perfect: 'Emissions are thought to have risen by 15%. (past fact)' },
        { present: 'The situation is reported to be deteriorating. (ongoing)', perfect: 'The agreement is reported to have collapsed. (completed)' },
      ],
    },
    teacherExamples: [
      'The programme is believed to have helped over two million families.',
      'It is estimated that one in five children globally lives in poverty.',
      'Food insecurity is reported to be worsening across the Sahel region.',
      'The treaty is thought to be the most significant since 1997.',
      'It is widely said that economic growth alone cannot solve inequality.',
    ],
    practiceExercises: [
      {
        type: 'transformation',
        instruction: 'Rewrite each sentence using a passive reporting structure. Use the verb in brackets.',
        items: [
          { original: 'People believe that the agreement will be signed next month.', verb: 'believe', hint: 'The agreement is believed to...' },
          { original: 'Reports suggest that displacement has reached 110 million people.', verb: 'report', hint: 'Displacement is reported to...' },
          { original: 'Experts think that this policy has not worked.', verb: 'think', hint: 'This policy is thought to...' },
          { original: 'Data suggests that emissions increased by 2% last year.', verb: 'estimate', hint: 'Emissions are estimated to...' },
          { original: 'People say that multilateral institutions are losing credibility.', verb: 'say', hint: 'Multilateral institutions are said to...' },
        ],
      },
      {
        type: 'production',
        instruction: 'Write three sentences about global issues (climate, inequality, migration — your choice) using different passive reporting structures.',
      },
    ],
    lessonRecap: 'You practised passive reporting structures (is said to, is believed to, is thought to, is reported to, is estimated to) — essential for formal writing on global issues.',
    nextLessonBridge: 'In the next grammar lesson you will learn nominalization — converting verbs and adjectives into nouns to create the dense, formal style typical of academic writing and policy documents.',
  }),

  // ─── GRAMMAR-017: Nominalization ─────────────────────────────────────────────
  createGrammarLesson({
    ...common,
    id: 'B2-GRAMMAR-017',
    order: 17,
    title: 'Nominalization: converting verbs and adjectives into formal noun phrases',
    objectives: [
      'Convert verbs and adjectives into their nominal (noun) forms to create formal academic style.',
      'Recognise common nominalization patterns (-tion, -ment, -ity, -ance, -al, -ness).',
      'Use noun phrases with of/in/of the to replace verb-heavy clauses.',
      'Understand why nominalization is a marker of B2+ academic and formal writing.',
    ],
    teacherOpening: 'Compare: "Governments need to act quickly to reduce emissions" vs "The urgent need for action on emission reduction is now evident." The second sentence sounds more academic, more authoritative — not because it uses harder words, but because it uses nominalization: turning verbs like "act" and "reduce" into nouns like "action" and "reduction". This is the single most important stylistic shift between B1 and B2 formal writing.',
    whyItMatters: 'Nominalization appears in every academic text, newspaper editorial and policy document. It allows writers to pack more information into fewer clauses, create logical connections between ideas using of/in/on phrases, and achieve the dense, authoritative tone that formal writing requires.',
    differenceFromA2: 'B1: "Living standards have improved because governments spent more on healthcare." B2: "The improvement in living standards reflects increased government investment in healthcare."',
    grammarTable: {
      headers: ['Verb/Adjective', 'Nominalized form', 'Suffix/change', 'Example in sentence'],
      rows: [
        ['develop', 'development', '-ment', 'The development of renewable energy is accelerating.'],
        ['reduce', 'reduction', '-tion', 'A significant reduction in carbon emissions is required.'],
        ['fail', 'failure', '-ure', 'The failure of international negotiations is deeply concerning.'],
        ['increase', 'increase (n.)', 'same form', 'The increase in global temperatures has been documented.'],
        ['decline', 'decline (n.)', 'same form', 'A steady decline in biodiversity has been recorded.'],
        ['migrate', 'migration', '-tion', 'Climate-driven migration is expected to intensify.'],
        ['govern', 'governance', '-ance', 'Effective global governance remains elusive.'],
        ['fragile', 'fragility', '-ity', 'The fragility of democratic institutions is a concern.'],
        ['sustain', 'sustainability', '-ability', 'Sustainability must be at the core of policy decisions.'],
        ['polarise', 'polarisation', '-ation', 'The polarisation of public opinion has deepened.'],
        ['displace', 'displacement', '-ment', 'Displacement caused by conflict has reached record levels.'],
        ['equal', 'inequality', 'in + -ity', 'Economic inequality continues to widen globally.'],
      ],
    },
    whenToUse: [
      'In academic and formal writing to pack information into noun phrases.',
      'To make abstract ideas the subject of a sentence: "The failure of X suggests..."',
      'To create logical connectors: "This development leads to...", "The consequence of X is..."',
    ],
    teacherExamples: [
      'The acceleration of climate change has outpaced many predictions. (accelerate → acceleration)',
      'A reduction in inequality requires structural reform, not just aid. (reduce → reduction)',
      'The displacement of communities by conflict demands an urgent multilateral response.',
      'The fragility of global supply chains was exposed by the 2020 pandemic.',
      'Increased polarisation of political discourse has made consensus harder to achieve.',
    ],
    practiceExercises: [
      {
        type: 'transformation',
        instruction: 'Rewrite each sentence using nominalization to create a more formal style.',
        items: [
          { original: 'Governments need to cooperate to deal with climate change.', hint: 'International cooperation... / the need for...' },
          { original: 'Living standards declined in many countries during the pandemic.', hint: 'A decline in living standards...' },
          { original: 'Institutions failed to respond fast enough to the crisis.', hint: 'The failure of institutions to...' },
          { original: 'The economy developed unevenly across regions.', hint: 'Uneven economic development...' },
          { original: 'More people are migrating because of climate change.', hint: 'Climate-driven migration is...' },
        ],
      },
      {
        type: 'production',
        instruction: 'Write two formal sentences on a global issue of your choice, using nominalization at least once each.',
      },
    ],
    lessonRecap: 'You practised nominalization — converting verbs and adjectives into noun phrases to achieve the dense, formal academic style required at B2+ level.',
    nextLessonBridge: 'In the final grammar lesson of B2.6 you will learn advanced comparisons and quantifiers for interpreting data: proportionally, significantly, marginally, the more...the more, up to X times as.',
  }),

  // ─── GRAMMAR-018: Advanced comparisons and quantifiers for data ──────────────
  createGrammarLesson({
    ...common,
    id: 'B2-GRAMMAR-018',
    order: 18,
    title: 'Advanced comparisons and quantifiers: interpreting data at B2 level',
    objectives: [
      'Use proportional comparisons (the more...the more, proportionally, accordingly).',
      'Use precise quantifiers for data interpretation (significantly, considerably, marginally, at least, up to, as much as, more than twice as, nearly three times as).',
      'Express rates of change using formal language (a X% increase/decline in, rose by X, fell from X to Y).',
      'Combine data language with nominalization and passive reporting structures.',
    ],
    teacherOpening: 'When writing about global issues, you will almost always need to refer to data: statistics, trends, percentages, comparisons. B2 writers don\'t just say "it went up a lot" — they say "emissions rose significantly" or "inequality has increased by nearly 30% over two decades." This lesson gives you the precise language for interpreting graphs, statistics and research findings.',
    whyItMatters: 'Data interpretation is required in B2 academic writing, journalism and formal reports. The language in this lesson appears in every newspaper, policy paper and academic article dealing with global issues.',
    differenceFromA2: 'B1: "Poverty is higher in country A than country B." B2: "Poverty rates in country A are significantly higher than those in country B, with the disparity having more than doubled over the past two decades."',
    grammarTable: {
      headers: ['Function', 'Language', 'Example'],
      rows: [
        ['Proportional increase', 'the + comparative, the + comparative', 'The more countries industrialise, the greater the pressure on natural resources.'],
        ['Large difference', 'significantly/considerably + comparative', 'Living standards are considerably higher in urban than rural areas.'],
        ['Small difference', 'marginally/slightly + comparative', 'Emissions fell marginally last year, though not enough to meet targets.'],
        ['Multiplied quantity', 'more than twice/three times as + adj + as', 'The cost of inaction is estimated to be more than three times as high as the cost of intervention.'],
        ['Maximum range', 'up to X times as + adj + as', 'Food prices in conflict zones can be up to five times as high as in stable regions.'],
        ['Minimum threshold', 'at least X times as + adj + as', 'The wealthiest 1% owns at least three times as much as the bottom 50%.'],
        ['Percentage change', 'rose/fell/increased/declined by X%', 'Global displacement increased by 19% between 2021 and 2023.'],
        ['From-to change', 'rose from X to Y / fell from X to Y', 'The number of people affected fell from 2.1 billion to 1.9 billion.'],
        ['Approximately', 'nearly/almost/roughly/approximately', 'Approximately 700 million people still live in extreme poverty.'],
        ['Rate of change', 'at a rate of X per year / annually', 'Sea levels are rising at a rate of 3.7mm per year.'],
      ],
    },
    teacherExamples: [
      'The greater the delay in addressing emissions, the more severe the projected consequences.',
      'Maternal mortality rates in low-income countries are significantly higher than those in high-income countries, a disparity that has narrowed marginally in recent decades.',
      'Global food insecurity is estimated to affect up to 828 million people — roughly one in ten.',
      'Between 2000 and 2020, extreme poverty fell from approximately 28% to 9% globally, a reduction described as the most significant in modern history.',
      'The poorest 10% of the world\'s population is said to contribute less than 3% of total carbon emissions, while the richest 10% accounts for nearly half.',
    ],
    practiceExercises: [
      {
        type: 'data-interpretation',
        instruction: 'Write one formal sentence interpreting each data point below, using the language from the grammar table.',
        items: [
          'In 2023, sea ice coverage in the Arctic was 15% below the 1981–2010 average.',
          'The number of international migrants globally: 281 million in 2020, up from 153 million in 1990.',
          'The top 1% of earners captured 38% of global wealth growth between 1995 and 2021.',
          'Renewable energy costs fell by 89% between 2010 and 2022.',
        ],
      },
      {
        type: 'proportional-comparison',
        instruction: 'Complete each sentence with the most appropriate language from the table.',
        items: [
          'The _____ countries delay climate action, the _____ the economic cost of adaptation.',
          'Urban air pollution levels are _____ higher in the developing world than in OECD countries.',
          'The rate of deforestation has declined _____ — not enough to reverse the overall trend.',
        ],
      },
    ],
    lessonRecap: 'You practised advanced comparison and quantifier language for data interpretation — proportional comparisons, precise quantifiers (significantly, marginally, up to X times), percentage and from-to changes.',
    nextLessonBridge: 'Next: the B2.6 vocabulary sets — global issues terminology and the academic argument language you need to discuss these topics with nuance and precision.',
  }),

  // ─── VOCABULARY-013: Global issues ───────────────────────────────────────────
  createVocabularyLesson({
    ...common,
    id: 'B2-VOCABULARY-013',
    order: 13,
    title: 'Vocabulary: global issues — climate, inequality, migration and governance',
    objectives: [
      'Learn and use 12 key vocabulary items for global issues discourse.',
      'Understand each item in context and practise producing it in formal sentences.',
      'Distinguish between related concepts (e.g. refugee vs migrant, governance vs government).',
    ],
    teacherOpening: 'Discussing global issues at B2 level means knowing the specific vocabulary that appears in news articles, policy papers, academic writing and international debates. The 12 words in this lesson are not just "topic vocabulary" — each one carries precise meaning that distinguishes B2 from B1.',
    targetWords: [
      {
        word: 'governance',
        partOfSpeech: 'noun',
        definition: 'The system and processes by which an organisation, state or international body is controlled and regulated.',
        exampleSentences: [
          'Effective global governance of AI development requires multilateral cooperation.',
          'Weak governance has been identified as a key factor in the region\'s instability.',
        ],
        collocations: ['global governance', 'democratic governance', 'governance framework', 'failure of governance'],
        notToConfuse: 'governance (systems/processes) ≠ government (a specific political body)',
      },
      {
        word: 'multilateralism',
        partOfSpeech: 'noun',
        definition: 'International cooperation involving three or more countries working together to address shared problems.',
        exampleSentences: [
          'Climate change cannot be solved without a renewed commitment to multilateralism.',
          'Critics argue that multilateralism is weakening as major powers pursue bilateral agreements instead.',
        ],
        collocations: ['commitment to multilateralism', 'decline of multilateralism', 'multilateral institution'],
      },
      {
        word: 'displacement',
        partOfSpeech: 'noun',
        definition: 'The forced movement of people from their homes, typically due to conflict, persecution or environmental disaster.',
        exampleSentences: [
          'Climate-driven displacement is projected to affect hundreds of millions by 2050.',
          'Internal displacement — within a country\'s own borders — is often less visible than cross-border migration.',
        ],
        collocations: ['forced displacement', 'climate displacement', 'displacement crisis', 'internally displaced people'],
        notToConfuse: 'displacement (forced) ≠ migration (may be voluntary)',
      },
      {
        word: 'sustainability',
        partOfSpeech: 'noun',
        definition: 'The capacity to meet present needs without compromising the ability of future generations to meet theirs.',
        exampleSentences: [
          'The sustainability of current consumption patterns is increasingly questioned by scientists.',
          'Sustainability has moved from a niche concern to a central principle of economic planning.',
        ],
        collocations: ['environmental sustainability', 'long-term sustainability', 'sustainable development', 'sustainability framework'],
      },
      {
        word: 'polarisation',
        partOfSpeech: 'noun',
        definition: 'The division of society or opinion into two opposite extremes, with little common ground between them.',
        exampleSentences: [
          'Political polarisation has made consensus on climate policy increasingly difficult.',
          'The polarisation of global opinion on migration has been amplified by social media.',
        ],
        collocations: ['political polarisation', 'social polarisation', 'deepen/increase polarisation', 'ideological polarisation'],
      },
      {
        word: 'inequality',
        partOfSpeech: 'noun',
        definition: 'The unequal distribution of resources, opportunities or outcomes between individuals or groups.',
        exampleSentences: [
          'Economic inequality between nations has narrowed, even as inequality within nations has grown.',
          'Gender inequality remains one of the most persistent barriers to sustainable development.',
        ],
        collocations: ['income/wealth inequality', 'structural inequality', 'growing/rising inequality', 'address/tackle inequality'],
      },
      {
        word: 'sanction',
        partOfSpeech: 'noun/verb',
        definition: 'A penalty or coercive measure imposed on a country or entity by other states or international bodies to compel a change in behaviour.',
        exampleSentences: [
          'The international community imposed sweeping economic sanctions following the invasion.',
          'Whether sanctions can effectively change state behaviour remains a subject of debate.',
        ],
        collocations: ['impose sanctions', 'lift sanctions', 'economic/trade sanctions', 'targeted sanctions'],
      },
      {
        word: 'accountability',
        partOfSpeech: 'noun',
        definition: 'The obligation to accept responsibility for one\'s actions and to be answerable to others for decisions made.',
        exampleSentences: [
          'International accountability mechanisms for human rights violations remain weak.',
          'Without accountability, pledges made at climate summits are likely to remain unfulfilled.',
        ],
        collocations: ['democratic accountability', 'lack of accountability', 'accountability mechanism', 'hold to account'],
      },
      {
        word: 'mitigation',
        partOfSpeech: 'noun',
        definition: 'Action taken to reduce the severity, impact or likelihood of a harmful event or trend.',
        exampleSentences: [
          'Climate mitigation refers to reducing greenhouse gas emissions; adaptation refers to adjusting to changes already underway.',
          'Risk mitigation strategies must be central to any long-term development plan.',
        ],
        collocations: ['climate mitigation', 'risk mitigation', 'mitigation strategy/measures', 'mitigation vs adaptation'],
      },
      {
        word: 'refugee',
        partOfSpeech: 'noun',
        definition: 'A person who has been forced to flee their country due to war, persecution or natural disaster and has crossed an international border.',
        exampleSentences: [
          'Under international law, a refugee has the right to claim asylum in the country they reach.',
          'The distinction between refugees and economic migrants has become increasingly contested.',
        ],
        collocations: ['refugee crisis', 'refugee camp', 'climate refugee', 'refugee rights', 'asylum seeker'],
        notToConfuse: 'refugee (crosses border, legal protection under international law) ≠ migrant (broader category, may move voluntarily)',
      },
      {
        word: 'diplomacy',
        partOfSpeech: 'noun',
        definition: 'The conduct of relations between states and international organisations through negotiation, dialogue and agreement.',
        exampleSentences: [
          'Climate diplomacy has become one of the most urgent branches of international relations.',
          'The collapse of diplomatic channels between the two countries has increased the risk of conflict.',
        ],
        collocations: ['international diplomacy', 'climate/vaccine diplomacy', 'diplomatic channels', 'failure of diplomacy'],
      },
      {
        word: 'austerity',
        partOfSpeech: 'noun',
        definition: 'A policy of reducing government spending, often in response to debt or economic crisis, typically with consequences for public services.',
        exampleSentences: [
          'Austerity measures implemented after the 2008 financial crisis deepened inequality in several countries.',
          'Critics argue that austerity disproportionately affects the most vulnerable members of society.',
        ],
        collocations: ['austerity measures', 'austerity politics', 'impose/implement austerity', 'austerity vs stimulus'],
      },
    ],
    practiceExercises: [
      {
        type: 'gap-fill',
        instruction: 'Complete each sentence with the correct word from the vocabulary list.',
        items: [
          'The _____ of political debate has made it harder to form the broad coalitions needed for climate action.',
          'Under international law, a _____ is entitled to protection from return to a country where they face persecution.',
          'The _____ of multilateral institutions has been questioned as powerful states pursue bilateral deals.',
          'Climate _____ strategies focus on cutting emissions; _____ strategies focus on adjusting to changes already happening.',
          'Economic _____ measures, while reducing government debt, have been linked to increased social _____.',
        ],
      },
      {
        type: 'collocation-practice',
        instruction: 'Write one sentence using each collocation: (1) hold to account; (2) climate displacement; (3) impose sanctions; (4) multilateral institution.',
      },
    ],
    lessonRecap: 'You learned 12 key global issues vocabulary items — governance, multilateralism, displacement, sustainability, polarisation, inequality, sanction, accountability, mitigation, refugee, diplomacy, austerity — with collocations and usage distinctions.',
    nextLessonBridge: 'Next: the academic argument vocabulary you need to construct, challenge and qualify complex arguments on global issues.',
  }),

  // ─── VOCABULARY-014: Academic argument language ───────────────────────────────
  createVocabularyLesson({
    ...common,
    id: 'B2-VOCABULARY-014',
    order: 14,
    title: 'Vocabulary: academic argument — premise, inference, nuance, empirical, rebut',
    objectives: [
      'Use 10 key academic argument vocabulary items with precision.',
      'Distinguish correlation from causation and anecdotal from empirical evidence.',
      'Apply these terms to construct, qualify and challenge arguments on global issues.',
    ],
    teacherOpening: 'Writing and speaking about global issues at B2 level means not just having opinions, but knowing how to structure them. Academic argument vocabulary gives you the metalanguage of reasoning: the words you need to talk about evidence, claims, logic and counter-arguments. These words appear constantly in university lectures, policy papers, quality journalism and international debate.',
    targetWords: [
      {
        word: 'premise',
        partOfSpeech: 'noun',
        definition: 'A statement or assumption on which an argument is based.',
        exampleSentences: [
          'The premise that economic growth inevitably reduces inequality has been challenged by recent data.',
          'This entire policy rests on a flawed premise: that people respond rationally to economic incentives alone.',
        ],
        collocations: ['false/flawed premise', 'on the premise that', 'underlying premise', 'challenge a premise'],
      },
      {
        word: 'inference',
        partOfSpeech: 'noun',
        definition: 'A conclusion reached by reasoning from evidence, without being explicitly stated.',
        exampleSentences: [
          'The inference from this data is that inequality has worsened, not improved.',
          'We cannot draw firm inferences from anecdotal accounts alone.',
        ],
        collocations: ['draw an inference', 'logical inference', 'inference from data', 'unwarranted inference'],
      },
      {
        word: 'implication',
        partOfSpeech: 'noun',
        definition: 'Something that is suggested or indicated by something else, even if not stated directly; also, a likely consequence.',
        exampleSentences: [
          'The implication of these findings is that current climate targets are insufficient.',
          'The policy has serious implications for the rights of marginalised communities.',
        ],
        collocations: ['wider/broader implications', 'implication of X', 'carry implications', 'by implication'],
      },
      {
        word: 'nuance',
        partOfSpeech: 'noun/verb',
        definition: 'A subtle distinction or variation in meaning, character or expression that prevents oversimplification.',
        exampleSentences: [
          'The debate lacks nuance: not all migration is driven by the same causes.',
          'A nuanced analysis recognises that inequality can fall between countries while rising within them.',
        ],
        collocations: ['lack nuance', 'a nuanced view/position', 'nuanced analysis', 'miss the nuance'],
      },
      {
        word: 'empirical',
        partOfSpeech: 'adjective',
        definition: 'Based on observation and measurement rather than theory or assumption.',
        exampleSentences: [
          'The claim is not supported by empirical evidence; it relies on theoretical modelling alone.',
          'Empirical research consistently shows a link between early childhood nutrition and long-term outcomes.',
        ],
        collocations: ['empirical evidence', 'empirical research', 'empirical data', 'empirically supported'],
        notToConfuse: 'empirical (based on data/observation) ≠ anecdotal (based on individual stories or examples)',
      },
      {
        word: 'anecdotal',
        partOfSpeech: 'adjective',
        definition: 'Based on personal accounts or individual examples rather than systematic data.',
        exampleSentences: [
          'While there is anecdotal evidence of success, no systematic evaluation has been conducted.',
          'Policy cannot be built on anecdotal reports — we need large-scale empirical research.',
        ],
        collocations: ['anecdotal evidence', 'purely anecdotal', 'anecdotal account', 'move beyond the anecdotal'],
      },
      {
        word: 'correlation',
        partOfSpeech: 'noun',
        definition: 'A statistical relationship between two variables — a change in one is associated with a change in the other.',
        exampleSentences: [
          'There is a clear correlation between levels of education and economic productivity.',
          'It is important to note that correlation does not imply causation.',
        ],
        collocations: ['strong/weak correlation', 'positive/negative correlation', 'correlation vs causation', 'correlation coefficient'],
        notToConfuse: 'correlation (association between two variables) ≠ causation (one variable directly causes the other)',
      },
      {
        word: 'rebut',
        partOfSpeech: 'verb',
        definition: 'To argue against or disprove a claim or position with evidence or reasoning.',
        exampleSentences: [
          'The report effectively rebuts the argument that austerity is the only path to fiscal stability.',
          'Critics have yet to rebut the core finding that emissions reductions and economic growth are compatible.',
        ],
        collocations: ['rebut an argument/claim/accusation', 'difficult to rebut', 'effectively rebutted'],
        relatedForms: 'rebuttal (noun): a counter-argument or piece of evidence that disproves a claim',
      },
      {
        word: 'counterargument',
        partOfSpeech: 'noun',
        definition: 'An argument made in opposition to another argument, presenting an alternative view or evidence.',
        exampleSentences: [
          'The most powerful counterargument to this position is that market mechanisms alone have never solved large-scale coordination problems.',
          'A good academic essay acknowledges and addresses the strongest counterargument to its thesis.',
        ],
        collocations: ['present/offer/address a counterargument', 'strongest counterargument', 'anticipate counterarguments'],
      },
      {
        word: 'consensus',
        partOfSpeech: 'noun',
        definition: 'General agreement among a group of people, especially experts or stakeholders, on a particular matter.',
        exampleSentences: [
          'There is near-universal scientific consensus that human activity is the primary driver of climate change.',
          'Political consensus on immigration policy has proved extremely difficult to achieve.',
        ],
        collocations: ['scientific/political/international consensus', 'near-consensus', 'build/achieve consensus', 'challenge the consensus'],
      },
    ],
    practiceExercises: [
      {
        type: 'definition-matching',
        instruction: 'Match each concept to the correct example.',
        items: [
          { concept: 'anecdotal evidence', example: '"My neighbour told me the new policy helped her family, so it must be working."' },
          { concept: 'empirical evidence', example: '"A study of 50,000 households found a 12% reduction in poverty."' },
          { concept: 'correlation, not causation', example: '"Countries with more chocolate consumption win more Nobel prizes" — but this doesn\'t mean chocolate causes success.' },
          { concept: 'false premise', example: '"People only migrate for economic reasons — therefore stopping migration requires improving economic conditions."' },
        ],
      },
      {
        type: 'production',
        instruction: 'Write one paragraph of 80–100 words on a global issue of your choice. Include at least FOUR of the following words: empirical, correlation, premise, counterargument, consensus, nuance, implication.',
      },
    ],
    lessonRecap: 'You learned 10 academic argument vocabulary items — premise, inference, implication, nuance, empirical, anecdotal, correlation, rebut, counterargument, consensus — with the ability to distinguish related concepts and use them precisely.',
    nextLessonBridge: 'Next: a 2-minute speaking task where you argue a position on a global issue, using data language, passive reporting structures, and academic argument vocabulary together.',
  }),

  // ─── SPEAKING-008: Argue a position on a global issue ────────────────────────
  createSpeakingLesson({
    ...common,
    id: 'B2-SPEAKING-008',
    order: 308,
    title: 'Speaking: Arguing a position on a global issue with data and evidence',
    objectives: [
      'Deliver a structured 2-minute argument on a global issues topic.',
      'Use data language naturally (is estimated to, rose by X, significantly higher).',
      'Incorporate at least one piece of evidence or data point.',
      'Use academic argument vocabulary (premise, consensus, counterargument, empirical) in speech.',
      'Maintain a nuanced position — claim, support, concession, restate.',
    ],
    teacherOpening: 'The global issues you read and listen to in this module involve complex, contested debates. At B2 level, you are expected not just to have an opinion, but to build a case: cite evidence, acknowledge counter-arguments, and maintain a nuanced position. Today\'s task puts all of B2.6\'s grammar and vocabulary into spoken production.',
    pronunciationFocus: {
      title: 'Pronunciation & shadowing',
      tips: [
        'Shadow: "The evidence is estimated to demonstrate a significantly higher correlation than previously assumed." Chunk: "the EVidence / is EStimated to demonstrate / a sigNIFicantly HIGHer correLA tion / than PREViously asSUMED."',
        '"The premise of this argument rests on..." — stress PREMise and RESTS. Practise the academic falling intonation of a confident claim.',
        '"Rose by approximately X per cent" — practise linking "rose-by" and stressing the number for emphasis.',
        '"There is a growing consensus that..." — link "growing-consensus" smoothly. Stress conSENsus.',
      ],
    },
    warmUp: [
      task('Look at the three topics below and choose one. Spend 90 seconds gathering your thoughts — main claim, one piece of evidence (real or plausible), one counter-argument, your conclusion.', 'You do NOT need real statistics; plausible estimates are fine for spoken practice.'),
    ],
    guidedPractice: [
      {
        title: 'Argument structure for global issues',
        steps: [
          { step: 'FRAMING (15 sec)', prompt: 'Set the stakes. "This is perhaps the most pressing..." / "There is now a near-consensus that..." / "The premise of this debate is..."' },
          { step: 'CLAIM (15 sec)', prompt: 'Your position. "I would argue that..." / "The evidence suggests that..." / "It is widely believed that..."' },
          { step: 'EVIDENCE (30 sec)', prompt: 'Data, research, example. "Emissions are estimated to have risen by X..." / "It is reported that..." / "Empirical research consistently shows..."' },
          { step: 'COUNTERARGUMENT + REBUTTAL (25 sec)', prompt: '"The strongest counterargument is..." + "However, this overlooks..." / "This can be rebutted by..."' },
          { step: 'NUANCED CONCLUSION (15 sec)', prompt: '"On balance..." / "The implication of this is..." / "A nuanced reading of the evidence suggests..."' },
        ],
      },
      task('Record your 2-minute argument on one of the following topics.', 'Topics: (1) International sanctions are an effective tool of diplomacy; (2) Climate change disproportionately affects those who contributed least to causing it; (3) Economic inequality within countries is a greater threat to stability than inequality between countries.'),
    ],
    speakingChecklist: [
      'Clear claim stated within the first 30 seconds.',
      'Evidence or data referenced (real or plausible — the point is the language, not the exact figure).',
      'Passive reporting structure used (is estimated to, is said to, is reported to...).',
      'Counterargument identified and rebutted.',
      'Nuanced or qualified conclusion.',
      'At least one item of academic argument vocabulary (consensus, empirical, premise, implication, nuance, etc.).',
      'Fluent delivery — no long pauses, natural pace.',
    ],
    freeSpeaking: [
      { topic: 'Is multilateralism in decline? Argue a position with evidence in 2 minutes.' },
      { topic: 'Who bears the greater responsibility for global inequality — rich countries or the institutions of global governance? Argue your view.' },
    ],
    lessonRecap: 'You delivered a structured 2-minute argument on a global issue using data language, passive reporting structures, academic argument vocabulary and a nuanced Position → Evidence → Counterargument → Conclusion structure.',
    nextLessonBridge: 'In B2.6 Part 2 you will read and listen to complex texts on global issues, then write formal analytical paragraphs interpreting data and constructing arguments with all the tools you have developed in this module.',
  }),

]);

export const B2_DEEP_GLOBAL_ISSUES_PART1_BY_PILLAR = Object.freeze({
  grammar: B2_DEEP_GLOBAL_ISSUES_PART1.filter(l => l.pillar === 'grammar'),
  vocabulary: B2_DEEP_GLOBAL_ISSUES_PART1.filter(l => l.pillar === 'vocabulary'),
  speaking: B2_DEEP_GLOBAL_ISSUES_PART1.filter(l => l.pillar === 'speaking'),
});
