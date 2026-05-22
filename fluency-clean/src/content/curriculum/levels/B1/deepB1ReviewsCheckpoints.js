import {
  createGrammarLesson,
  createVocabularyLesson,
  createSpeakingLesson,
  createWritingLesson,
} from '../../../schemas/lessonFactories.js';

const B1_GRAMMAR_019 = createGrammarLesson({
  id: 'B1-GRAMMAR-019',
  level: 'B1',
  order: 19,
  title: 'Mixed conditionals: past conditions with present results',
  estimatedMinutes: 45,
  status: 'ready',
  tags: ['b1-8', 'reviews', 'grammar', 'conditionals', 'mixed', 'deep-approved-target'],
  prerequisites: ['B1-GRAMMAR-005', 'B1-GRAMMAR-006', 'B1-GRAMMAR-009', 'B1-GRAMMAR-011'],
  objectives: [
    'Form mixed conditionals combining a past unreal condition with a present result',
    'Form mixed conditionals combining a present unreal condition with a past result',
    'Distinguish mixed conditionals from pure 2nd and 3rd conditionals',
    'Use mixed conditionals to reflect on past decisions and their ongoing consequences',
  ],
  grammarGoal:
    'Use mixed conditionals to link an unreal past condition to a present result, or an unreal present condition to a past result.',
  grammarTable: {
    headers: ['Type', 'Condition clause', 'Result clause', 'Meaning'],
    rows: [
      ['Mixed (past→present)', 'If + past perfect', 'would + base verb (now)', 'Unreal past action affects present'],
      ['Mixed (present→past)', 'If + past simple / were', 'would have + past participle', 'Unreal present state explains past outcome'],
      ['2nd conditional (reminder)', 'If + past simple', 'would + base verb', 'Unreal present/future'],
      ['3rd conditional (reminder)', 'If + past perfect', 'would have + past participle', 'Unreal past'],
    ],
  },
  whenToUse: [
    'When a past action has consequences you still feel now: "If I had saved money then, I would be comfortable now."',
    'When a present characteristic explains a past result: "If I were better organised, I would have finished on time."',
    'When reflecting on life choices and their ongoing impact: career, relationships, habits.',
    'In formal writing or storytelling to show how one timeline influences another.',
  ],
  whenNotToUse: [
    'Do not use "would" in the if-clause: NOT "If I would have known". Use "If I had known".',
    'Do not mix tenses randomly. Choose mixed conditional only when there is a genuine cross-time link.',
    'For purely hypothetical present situations, use 2nd conditional. For purely unreal past, use 3rd conditional.',
  ],
  teacherExamples: [
    {
      context: 'Career regret — past decision still affecting present life',
      example: 'If I had studied computer science at university, I would be earning more money now.',
      breakdown: 'Past condition (didn\'t study CS) → present result (not earning more now)',
    },
    {
      context: 'Present trait explaining a past failure',
      example: 'If I were more patient, I would have handled that conversation better.',
      breakdown: 'Present unreal state (not patient) → past result (handled it badly)',
    },
    {
      context: 'Health habit reflecting on past',
      example: 'If I had started exercising years ago, I would feel much stronger today.',
      breakdown: 'Past inaction → present physical state',
    },
    {
      context: 'Language learning',
      example: 'If I had practised English every day as a child, I would speak it fluently now.',
      breakdown: 'Classic mixed: past habit → present ability',
    },
    {
      context: 'Present personality → past outcome',
      example: 'If she were less shy, she would have applied for that job last year.',
      breakdown: 'Present unreal trait → past action she didn\'t take',
    },
    {
      context: 'Technology / media context',
      example: 'If I weren\'t so addicted to scrolling, I would have finished the project by now.',
      breakdown: 'Present habit (still happening) → past incomplete task',
    },
  ],
  commonBrazilianMistakes: [
    {
      mistake: 'If I would have studied more, I would be better now.',
      correction: 'If I had studied more, I would be better now.',
      explanation: '"Would" never goes in the if-clause. The past condition uses "had + past participle".',
    },
    {
      mistake: 'If I was more confident, I would have gotten the job.',
      correction: 'If I were more confident, I would have gotten the job.',
      explanation: 'In formal B1 grammar, use "were" (not "was") for all persons in hypothetical conditions.',
    },
    {
      mistake: 'If I had known her, I would have meet her yesterday.',
      correction: 'If I had known her, I would have met her yesterday.',
      explanation: '"Would have" requires the past participle — "met", not the base form "meet".',
    },
    {
      mistake: 'If I didn\'t come here, I wouldn\'t have met you.',
      correction: 'If I hadn\'t come here, I wouldn\'t have met you. (pure 3rd conditional)',
      explanation: 'Both clauses are about the past, so this is a pure 3rd conditional, not mixed.',
    },
  ],
  controlledPractice: [
    {
      instruction: 'Complete the mixed conditional sentence.',
      items: [
        {
          prompt: 'If I ___ (study) harder at school, I ___ (have) more opportunities now.',
          answer: 'had studied / would have',
        },
        {
          prompt: 'If she ___ (be) more organised, she ___ (finish) the report on time last week.',
          answer: 'were / would have finished',
        },
        {
          prompt: 'We ___ (know) the answer if they ___ (explain) the rules properly at the start.',
          answer: 'would know / had explained',
        },
        {
          prompt: 'If he ___ (not waste) so much time online, he ___ (be) much further ahead now.',
          answer: 'hadn\'t wasted / would be',
        },
      ],
    },
    {
      instruction: 'Identify: 2nd conditional, 3rd conditional, or mixed conditional?',
      items: [
        { sentence: 'If I were taller, I would be a basketball player.', answer: '2nd conditional' },
        { sentence: 'If I had listened to my teacher, I would speak English better now.', answer: 'Mixed (past→present)' },
        { sentence: 'If I had left earlier, I would have caught the train.', answer: '3rd conditional' },
        { sentence: 'If she were more ambitious, she would have applied for the promotion.', answer: 'Mixed (present→past)' },
      ],
    },
    {
      instruction: 'Correct the error in each sentence.',
      items: [
        {
          wrong: 'If I would have saved money, I would travel the world now.',
          correct: 'If I had saved money, I would travel the world now.',
        },
        {
          wrong: 'If she was braver, she would have spoken up in the meeting.',
          correct: 'If she were braver, she would have spoken up in the meeting.',
        },
        {
          wrong: 'If he had worked harder, he would have a promotion last year.',
          correct: 'If he had worked harder, he would have had a promotion last year. (3rd conditional — both past)',
        },
      ],
    },
    {
      instruction: 'Write two mixed conditionals about your own life. One should be past→present, one present→past.',
      example1: 'If I had moved to an English-speaking country, I would be fluent by now. (past→present)',
      example2: 'If I were more disciplined, I would have finished this course months ago. (present→past)',
    },
  ],
  errorCorrectionPractice: [
    {
      instruction: 'Find and explain the error.',
      sentences: [
        'If I would have been there, everything would be different now.',
        'If I was more creative, I would have got a better grade on that project.',
        'If she had been honest, people would trusted her more today.',
      ],
      answers: [
        '"Would have been" → "had been" in the if-clause.',
        '"Was" → "were" (hypothetical "were" in formal grammar).',
        '"Would trusted" → "would trust" — "would" + bare infinitive, not past tense.',
      ],
    },
  ],
  translationPractice: [
    {
      portuguese: 'Se eu tivesse aprendido inglês mais cedo, eu falaria muito melhor agora.',
      english: 'If I had learnt English earlier, I would speak much better now.',
      note: 'Past condition (didn\'t learn early) → present result (don\'t speak as well now).',
    },
    {
      portuguese: 'Se ela fosse mais paciente, teria ouvido a explicação até o final.',
      english: 'If she were more patient, she would have listened to the explanation to the end.',
      note: 'Present trait (impatient) → past result (didn\'t listen).',
    },
    {
      portuguese: 'Não teria tomado aquela decisão errada se eu soubesse o que sei hoje.',
      english: 'I wouldn\'t have made that wrong decision if I had known what I know today.',
      note: 'Reversed order — result clause first. Still a valid mixed conditional.',
    },
  ],
  productionTasks: [
    {
      title: 'Life reflection: three mixed conditionals',
      instruction:
        'Think of three decisions or situations in your past that still affect your present life. Write one mixed conditional sentence for each, explaining the past condition and its present consequence. Then write one more using the present→past form.',
      examples: [
        'If I had chosen a different university course, I would be working in a completely different field now.',
        'If I were more tech-savvy, I would have set up my own website years ago.',
      ],
      minimumOutput: '4 mixed conditional sentences, at least 1 of each type',
    },
    {
      title: 'Group discussion prompt',
      instruction:
        'Discuss with your teacher or partner: "If you had grown up in an English-speaking country, how would your life be different today?" Use at least 3 mixed conditionals in your response.',
    },
  ],
  teacherOpening:
    'Today we combine the two conditional types you already know — second and third — to talk about how past choices affect your present, and how present traits explain past outcomes.',
  whyItMatters:
    'Mixed conditionals are a mark of B1+ fluency. They let you reflect on life with nuance — not just "what if?" but "what if then, and what would that mean now?"',
  nextLessonBridge:
    'Next: Present Perfect Continuous — to describe ongoing processes that started in the past and are still relevant now. A natural partner to conditional reflection.',
});

const B1_GRAMMAR_020 = createGrammarLesson({
  id: 'B1-GRAMMAR-020',
  level: 'B1',
  order: 20,
  title: 'Present Perfect Continuous: ongoing actions and recent completion',
  estimatedMinutes: 40,
  status: 'ready',
  tags: ['b1-8', 'reviews', 'grammar', 'present-perfect-continuous', 'deep-approved-target'],
  prerequisites: ['B1-GRAMMAR-001', 'B1-GRAMMAR-003'],
  objectives: [
    'Form the Present Perfect Continuous correctly: have/has been + -ing',
    'Use it to describe ongoing actions that started in the past and continue now',
    'Use it to explain current visible results of a recent activity',
    'Distinguish Present Perfect Continuous from Present Perfect Simple',
  ],
  grammarGoal:
    'Use the Present Perfect Continuous to emphasise the duration or ongoing process of an activity that connects the past to the present.',
  grammarTable: {
    headers: ['Subject', 'Auxiliary', 'Form', 'Example'],
    rows: [
      ['I / you / we / they', 'have been', '+ verb-ing', 'I have been studying for 3 hours.'],
      ['he / she / it', 'has been', '+ verb-ing', 'She has been working here since 2020.'],
      ['Negative', 'have/has not been', '+ verb-ing', 'He hasn\'t been sleeping well lately.'],
      ['Question', 'Have/Has + subject', '+ been + -ing?', 'How long have you been learning English?'],
    ],
  },
  whenToUse: [
    'To describe an activity that started in the past and is STILL happening now: "I\'ve been living here for five years."',
    'To explain a current physical or visible state caused by a recent activity: "She looks tired — she\'s been running."',
    'To talk about how long something has been going on (with "for" or "since"): "They\'ve been arguing since this morning."',
    'To describe repeated or habitual actions up to now: "He\'s been calling me every day this week."',
  ],
  whenNotToUse: [
    'Do NOT use with stative verbs (know, like, believe, understand, own, want): NOT "I\'ve been knowing her". Use "I\'ve known her for years."',
    'When the focus is on a completed result or number of completed actions, use Present Perfect Simple: "I\'ve read three books" (not "I\'ve been reading three books").',
    'When the action is permanent or a state, not a process: "He\'s been a doctor since 2010" — awkward. Use "He\'s been a doctor for 15 years" with caution. Better: "He has worked as a doctor since 2010."',
  ],
  teacherExamples: [
    {
      context: 'Duration — English learning',
      example: 'I\'ve been studying English for three years.',
      contrast: 'I\'ve studied English. (simple fact, no duration focus)',
    },
    {
      context: 'Explaining a visible current state',
      example: 'You look exhausted. Have you been working all night?',
      note: 'The tiredness NOW is the result of the past/recent activity.',
    },
    {
      context: 'Recent activity — traces visible now',
      example: 'She\'s been crying — her eyes are red.',
      note: 'The crying has probably just stopped, but the evidence remains.',
    },
    {
      context: 'Ongoing process at time of speaking',
      example: 'We\'ve been waiting for the bus for 40 minutes.',
      note: 'The waiting is still happening now.',
    },
    {
      context: 'Media/technology context',
      example: 'I\'ve been scrolling through social media for an hour — I need to stop.',
      note: 'Duration + ongoing, connects to media unit vocabulary.',
    },
    {
      context: 'Work context (reviews connection)',
      example: 'She\'s been preparing for the interview all week.',
      note: 'Preparation is ongoing — not yet complete.',
    },
  ],
  commonBrazilianMistakes: [
    {
      mistake: 'I am studying English since five years.',
      correction: 'I have been studying English for five years.',
      explanation:
        'Portuguese uses "estou estudando há 5 anos" (present continuous) but English requires the Perfect Continuous to express duration linking past to present. "Since" + specific start point; "for" + duration.',
    },
    {
      mistake: 'I\'ve been knowing her for a long time.',
      correction: 'I\'ve known her for a long time.',
      explanation: '"Know" is a stative verb — it cannot be used in continuous tenses. Use Present Perfect Simple instead.',
    },
    {
      mistake: 'He has been reading two articles this morning.',
      correction: 'He has read two articles this morning. (number = completed result → Simple)',
      explanation:
        'When you specify a completed number of items, use Simple. Continuous = focus on process/duration, not quantity.',
    },
    {
      mistake: 'She has been finished the report.',
      correction: 'She has finished the report.',
      explanation:
        'Do not use continuous with "finish", "arrive", "start" when describing a completed event. These are point actions — use Simple.',
    },
  ],
  controlledPractice: [
    {
      instruction: 'Choose: Present Perfect Simple or Continuous? Justify your choice.',
      items: [
        {
          options: ['I have read / I have been reading'],
          context: '___ this book for a week and I\'m only halfway through.',
          answer: 'I have been reading — ongoing process, halfway through',
        },
        {
          options: ['She has sent / She has been sending'],
          context: '___ five emails this morning. She\'s very efficient.',
          answer: 'She has sent — completed quantity (five)',
        },
        {
          options: ['They have lived / They have been living'],
          context: '___ in Canada since 2018.',
          answer: 'Both possible — "have lived" = simple fact; "have been living" = emphasises ongoing process',
        },
        {
          options: ['I have known / I have been knowing'],
          context: '___ him for years.',
          answer: 'I have known — stative verb "know" cannot be continuous',
        },
      ],
    },
    {
      instruction: 'Complete with the correct form of the verb in brackets.',
      items: [
        { prompt: 'How long ___ you ___ (learn) English?', answer: 'have you been learning' },
        { prompt: 'She ___ (not sleep) well since her job interview.', answer: 'hasn\'t been sleeping' },
        { prompt: 'I ___ (wait) for your reply all afternoon!', answer: '\'ve been waiting' },
        { prompt: 'They ___ (plan) the trip for months — it\'s finally here!', answer: 'have been planning' },
      ],
    },
    {
      instruction: 'Write questions using the cues.',
      items: [
        { cue: 'you / study / how long', answer: 'How long have you been studying?' },
        { cue: 'she / work / on the project / all week', answer: 'Has she been working on the project all week?' },
        { cue: 'they / wait / for the results', answer: 'Have they been waiting for the results?' },
      ],
    },
  ],
  errorCorrectionPractice: [
    {
      instruction: 'Find the error and write the correction.',
      sentences: [
        'I am living here since I was born.',
        'He has been believed in this cause for many years.',
        'We have been just finished the course.',
      ],
      answers: [
        '"Am living since" → "have been living since" — duration + present relevance needs Perfect Continuous.',
        '"Believed" is stative → "He has believed in this cause for many years."',
        '"Have been just finished" → "have just finished" — point completion = Simple.',
      ],
    },
  ],
  translationPractice: [
    {
      portuguese: 'Estou estudando inglês há dois anos.',
      english: 'I have been studying English for two years.',
      note: 'Portuguese present continuous = English Present Perfect Continuous when duration is given.',
    },
    {
      portuguese: 'Ela está com os olhos vermelhos. Ela estava chorando.',
      english: 'Her eyes are red. She has been crying.',
      note: 'Current evidence of recent past activity — PPC explains the present state.',
    },
    {
      portuguese: 'Faz quanto tempo que vocês estão aprendendo juntos?',
      english: 'How long have you been learning together?',
      note: '"Faz quanto tempo" = "how long have... been -ing".',
    },
  ],
  productionTasks: [
    {
      title: 'My English learning journey',
      instruction:
        'Write 5–8 sentences about your English learning experience using Present Perfect Continuous. Include: how long you\'ve been studying, what you\'ve been doing to improve, what you\'ve been finding difficult or easy, and what you\'ve been noticing about your progress lately.',
      structureTips: [
        'I\'ve been studying English for ___.',
        'This year, I\'ve been focusing on ___.',
        'I\'ve been finding ___ particularly ___.',
        'Lately, I\'ve been noticing that ___.',
      ],
    },
    {
      title: 'What explains the evidence? (partner activity)',
      instruction:
        'Look at each situation. Write a sentence with Present Perfect Continuous explaining the visible clue.',
      situations: [
        'Your friend is covered in paint. → She has been painting the living room.',
        'Your colleague looks exhausted and has dark circles. → ___',
        'There are cooking smells throughout the house. → ___',
        'The student has ink on their fingers and notes everywhere. → ___',
      ],
    },
  ],
  teacherOpening:
    'Today we look at a tense that connects the past to the present through process — not just what happened, but how long it has been happening and what evidence we can see now.',
  whyItMatters:
    'This tense is how English speakers describe ongoing activities and explain current situations. It is essential for fluent conversation about studies, work, habits, and personal experiences.',
  nextLessonBridge:
    'Next: B1 vocabulary review — bringing together key words and chunks from all seven units to prepare for B1 checkpoint tasks.',
});

const B1_VOCABULARY_015 = createVocabularyLesson({
  id: 'B1-VOCABULARY-015',
  level: 'B1',
  order: 15,
  title: 'B1 vocabulary review: key themes across all units',
  estimatedMinutes: 40,
  status: 'ready',
  tags: ['b1-8', 'reviews', 'vocabulary', 'consolidation', 'deep-approved-target'],
  prerequisites: [
    'B1-VOCABULARY-001', 'B1-VOCABULARY-002', 'B1-VOCABULARY-003', 'B1-VOCABULARY-004',
    'B1-VOCABULARY-005', 'B1-VOCABULARY-006', 'B1-VOCABULARY-007', 'B1-VOCABULARY-008',
    'B1-VOCABULARY-009', 'B1-VOCABULARY-010', 'B1-VOCABULARY-011', 'B1-VOCABULARY-012',
    'B1-VOCABULARY-013', 'B1-VOCABULARY-014',
  ],
  objectives: [
    'Recall and actively use key vocabulary from all seven B1 units',
    'Use high-frequency B1 collocations and chunks in sentence-level production',
    'Distinguish between near-synonyms that are often confused',
    'Apply vocabulary from different topics in integrated speaking and writing tasks',
  ],
  topicContext:
    'This lesson brings together the most important vocabulary from all seven B1 units — from the A2→B1 bridge through to media, technology and society. You will review, recycle and integrate key words and chunks.',
  essentialWords: [
    {
      word: 'overcome',
      definition: 'to successfully deal with a difficulty or obstacle',
      example: 'She has been working hard to overcome her fear of public speaking.',
      unit: 'B1.4 Problems and decisions',
    },
    {
      word: 'perspective',
      definition: 'a particular way of thinking about or viewing something',
      example: 'Travelling gave me a completely different perspective on life.',
      unit: 'B1.6 Travel and culture',
    },
    {
      word: 'contribute',
      definition: 'to give something (time, money, ideas) to help achieve a result',
      example: 'Everyone can contribute to solving environmental problems in small ways.',
      unit: 'B1.8 Reviews — integrative',
    },
    {
      word: 'relevant',
      definition: 'closely connected or appropriate to what is being discussed',
      example: 'Make sure your examples are relevant to the topic in the exam.',
      unit: 'B1.5 Work and study',
    },
    {
      word: 'assumption',
      definition: 'something accepted as true without proof',
      example: 'Don\'t make assumptions about what people think — ask them.',
      unit: 'B1.3 Opinions',
    },
    {
      word: 'consequence',
      definition: 'a result or effect of an action',
      example: 'If I had known the consequences, I would have decided differently.',
      unit: 'B1.4 / conditionals integration',
    },
    {
      word: 'efficient',
      definition: 'doing something well with minimum waste of time or effort',
      example: 'Remote workers have been finding ways to be more efficient at home.',
      unit: 'B1.5 Work and study',
    },
    {
      word: 'broadcast',
      definition: 'to send out a programme on television or radio; to widely share',
      example: 'The news was broadcast live across all major channels.',
      unit: 'B1.7 Media and technology',
    },
    {
      word: 'solidarity',
      definition: 'unity and support among a group of people with common interests',
      example: 'The community showed great solidarity after the flood.',
      unit: 'B1.8 / B1.7 Society',
    },
    {
      word: 'ambiguous',
      definition: 'having more than one possible meaning; unclear',
      example: 'The headline was ambiguous — it could mean two different things.',
      unit: 'B1.7 Media',
    },
    {
      word: 'adjust',
      definition: 'to change slightly to make something fit better',
      example: 'It took her a few weeks to adjust to working night shifts.',
      unit: 'B1.6 Travel / B1.5 Work',
    },
    {
      word: 'worthwhile',
      definition: 'worth the time, effort or money spent',
      example: 'Learning a new language is challenging, but completely worthwhile.',
      unit: 'B1.8 Reviews — integrative',
    },
  ],
  chunks: [
    {
      chunk: 'make progress (in/with)',
      example: 'I\'ve been making steady progress with my English pronunciation.',
      connection: 'Links B1.5 Work/Study with Present Perfect Continuous (Grammar-020)',
    },
    {
      chunk: 'take something for granted',
      example: 'People often take clean water for granted until there\'s a shortage.',
      connection: 'Opinion and society (B1.3, B1.7)',
    },
    {
      chunk: 'come to terms with',
      example: 'It took him a long time to come to terms with the change.',
      connection: 'Problems and decisions (B1.4)',
    },
    {
      chunk: 'keep an open mind',
      example: 'When travelling, it\'s important to keep an open mind about cultural differences.',
      connection: 'Travel and culture (B1.6)',
    },
    {
      chunk: 'on the one hand… on the other hand',
      example: 'On the one hand, technology saves time; on the other hand, it can be addictive.',
      connection: 'Opinion structure (B1.3), Media (B1.7)',
    },
    {
      chunk: 'have a positive / negative impact on',
      example: 'Social media has had a significant impact on how news spreads.',
      connection: 'Media, Society — links B1.7 and B1.8',
    },
  ],
  dangerousConfusions: [
    {
      pair: ['affect (verb)', 'effect (noun)'],
      explanation:
        '"Affect" is the verb: "Social media affects people\'s mental health." "Effect" is the noun: "The effect of social media on mental health is widely studied." Common error: "Social media has a big affect on us" — should be "effect".',
      memoryTip: 'RAVEN: Remember Affect Verb Effect Noun.',
    },
    {
      pair: ['despite', 'in spite of', 'although'],
      explanation:
        '"Despite/in spite of" are followed by a noun or -ing: "Despite the difficulty, she continued." "Although" is followed by a full clause: "Although it was difficult, she continued." Common error: "Despite she was tired, she continued." — no "she" after despite.',
      memoryTip: 'Despite/in spite of = noun/gerund. Although = clause (subject + verb).',
    },
    {
      pair: ['raise', 'rise'],
      explanation:
        '"Raise" is transitive — it needs an object: "raise awareness, raise money, raise a child." "Rise" is intransitive — no object: "Temperatures rise. Prices have risen." Common error: "The temperature raised dramatically" → should be "rose".',
      memoryTip: 'Rise = no object. Raise = needs an object.',
    },
  ],
  miniDialogues: [
    {
      title: 'Integrative review dialogue — reflecting on B1 themes',
      dialogue: [
        { speaker: 'Ana', line: 'I\'ve been thinking about our conversation on media bias. I can\'t stop wondering — how do we know what\'s actually true anymore?' },
        { speaker: 'Tom', line: 'That\'s a really relevant question. I think we need to keep an open mind and double-check sources. The effect of misinformation is enormous.' },
        { speaker: 'Ana', line: 'Exactly. On the one hand, the internet has made information accessible. On the other hand, it has given a platform to assumptions and fake news.' },
        { speaker: 'Tom', line: 'If schools had taught media literacy earlier, people would be much better at spotting bias now.' },
        { speaker: 'Ana', line: 'That\'s a mixed conditional! You\'ve been studying hard.' },
        { speaker: 'Tom', line: 'Ha! I have. Despite the difficulty, I think it\'s been completely worthwhile.' },
        { speaker: 'Ana', line: 'Agreed. Overcoming the grammar challenges has had a positive impact on my confidence.' },
      ],
      note: 'Dialogue integrates vocabulary from units 3, 7, 8 and grammar from lessons 017, 019, 020.',
    },
  ],
  recognitionPractice: [
    { question: 'B1 vocabulary review — qual vocabulário desta aula significa "superar dificuldade"?', options: ['overcome', 'ambiguous', 'solidarity'], answer: 'overcome', explanation: 'overcome = superar uma dificuldade ou obstáculo; vocabulário chave nesta revisão B1.' },
    {
      instruction: 'Match each word to its definition.',
      items: [
        { word: 'overcome', options: ['to make worse', 'to succeed despite difficulty', 'to ignore completely'], answer: 'to succeed despite difficulty' },
        { word: 'ambiguous', options: ['very clear', 'having two possible meanings', 'well-structured'], answer: 'having two possible meanings' },
        { word: 'solidarity', options: ['isolation', 'community support', 'competition'], answer: 'community support' },
      ],
    },
    {
      instruction: 'Complete each sentence with the correct chunk from this lesson.',
      items: [
        { prompt: 'Learning to accept criticism is difficult, but if you ___ an open mind, it becomes much easier.', answer: 'keep' },
        { prompt: 'It took her years to ___ terms with losing her job.', answer: 'come to' },
        { prompt: 'Don\'t ___ your health for granted — it can change quickly.', answer: 'take' },
      ],
    },
  ],
  usagePractice: [
    {
      instruction: 'Rewrite using the word in brackets, keeping the same meaning.',
      items: [
        { original: 'Even though she was nervous, she gave a brilliant presentation.', rewrite: '(Despite)', answer: 'Despite her nervousness, she gave a brilliant presentation.' },
        { original: 'The research caused a significant change in public opinion.', rewrite: '(impact)', answer: 'The research had a significant impact on public opinion.' },
        { original: 'Prices went up because of inflation.', rewrite: '(rise)', answer: 'Prices rose because of inflation.' },
      ],
    },
  ],
  productionTasks: [
    {
      title: 'Write a B1 review paragraph',
      instruction:
        'Write a paragraph (100–130 words) about ONE of the following topics, using at least 5 words or chunks from this lesson. Topics: (1) Has social media had a positive or negative effect on society? (2) What is the most worthwhile thing you have learnt from this B1 course? (3) Describe a challenge you have had to overcome and what the consequences were.',
      minimumVocabulary: 5,
      minimumWords: 100,
    },
    {
      title: 'Error correction challenge',
      instruction: 'Find and correct the vocabulary or grammar error in each sentence.',
      items: [
        { wrong: 'Despite she worked hard, she didn\'t pass.', correct: 'Despite working hard, she didn\'t pass.' },
        { wrong: 'The new policy had a big affect on workers\' conditions.', correct: 'The new policy had a big effect on workers\' conditions.' },
        { wrong: 'Temperature raised by 2 degrees last year.', correct: 'Temperature rose by 2 degrees last year.' },
      ],
    },
  ],
});

const B1_SPEAKING_008 = createSpeakingLesson({
  id: 'B1-SPEAKING-008',
  level: 'B1',
  order: 8,
  title: 'B1 speaking checkpoint: structured response on a complex topic',
  estimatedMinutes: 45,
  status: 'ready',
  tags: ['b1-8', 'reviews', 'speaking', 'checkpoint', 'deep-approved-target'],
  prerequisites: [
    'B1-SPEAKING-001', 'B1-SPEAKING-002', 'B1-SPEAKING-003',
    'B1-SPEAKING-004', 'B1-SPEAKING-005', 'B1-SPEAKING-006', 'B1-SPEAKING-007',
  ],
  objectives: [
    'Produce a fluent 2-minute structured spoken response integrating B1 language',
    'Use discourse markers, opinion phrases, concession phrases and modal language at B1 level',
    'Self-assess spoken output against B1 CEFR criteria',
    'Reflect on personal B1 speaking progress using Present Perfect Continuous',
  ],
  speakingSituation:
    'B1 speaking checkpoint. You will deliver a structured 2-minute response on a complex topic, demonstrating your ability to argue, concede, use examples, and conclude — all at B1 fluency level.',
  modelPhrases: [
    { phrase: 'To my mind, the most important factor is…', use: 'Introducing main opinion (B1.3)' },
    { phrase: 'I can see both sides of this issue.', use: 'Acknowledging complexity (B1.3, B1.7)' },
    { phrase: 'On the one hand… On the other hand…', use: 'Balanced argument structure (B1.3)' },
    { phrase: 'If I had grown up in a different environment, I might think differently.', use: 'Mixed conditional reflection (B1.8 Grammar-019)' },
    { phrase: 'I\'ve been thinking about this a lot recently, and…', use: 'Present Perfect Continuous opener (Grammar-020)' },
    { phrase: 'That said, I still believe that…', use: 'Concession + restatement (B1.3, B1.7)' },
    { phrase: 'Although it\'s true that…, we also need to consider…', use: 'Linker + expansion (B1.3 Grammar-008)' },
    { phrase: 'The evidence suggests that…', use: 'Academic B1 opener — links to reading (B1.7)' },
    { phrase: 'In my experience…', use: 'Personal evidence (B1.2, B1.6)' },
    { phrase: 'Overall, I would argue that…', use: 'Conclusion phrase (B1.3, B1.7)' },
    { phrase: 'It might be that… / It could be that…', use: 'Modal speculation (B1.7 Grammar-017)' },
    { phrase: 'Despite the challenges, it\'s been completely worthwhile.', use: 'Despite + vocabulary review (B1.8)' },
  ],
  pronunciationFocus: {
    title: 'Pronunciation & shadowing',
    tips: [
      'Shadow: "To my mind, the most important factor is..." — chunk: "to MY mind / the most imPORtant FACtor / IS..." Stress MY, imPORtant and FACtor.',
      '"I can see both sides of this issue." — link "both-sides" smoothly. Practise the balanced intonation that signals genuine openness.',
      '"Although it\'s true that..., we also need to consider..." — pause at the comma. Stress TRUE and conSIDer to mark the two halves.',
      '"Overall, I would argue that..." — use confident falling intonation on "argue" to signal your final position is coming.',
    ],
  },
  guidedSpeaking: [
    {
      stage: 'Preparation (2 minutes)',
      instruction:
        'Choose ONE of the three checkpoint topics below. In 2 minutes, plan your response using the structure: (1) State your position clearly, (2) Give two reasons with examples, (3) Acknowledge the opposing view, (4) Conclude with your final position. Write brief notes — do not write full sentences.',
      topics: [
        'Topic A: "Technology has made us more connected, but less happy." Do you agree?',
        'Topic B: "Travel is the best way to learn about the world." To what extent do you agree?',
        'Topic C: "Everyone has a responsibility to help their community." How far do you agree?',
      ],
    },
    {
      stage: 'Delivery (2 minutes)',
      instruction:
        'Deliver your spoken response using your notes. Aim for 2 minutes. Use at least 4 model phrases from this lesson. Try to include one mixed conditional and one Present Perfect Continuous sentence.',
      selfMonitor: [
        'Am I using discourse markers (on the one hand, that said, although)?',
        'Am I giving examples — not just opinions?',
        'Am I avoiding long pauses — using fillers if needed ("that\'s a good point", "let me think")?',
        'Am I ending with a clear conclusion?',
      ],
    },
    {
      stage: 'Reflection (5 minutes)',
      instruction:
        'After recording or delivering, reflect: What went well? What would you improve? Use Present Perfect Continuous: "I\'ve been working on X" and mixed conditionals: "If I had practised more, I would sound more natural now."',
    },
  ],
  modelAnswer: {
    topic: 'Topic A — Technology and happiness',
    response:
      'To my mind, the relationship between technology and happiness is far more complex than the statement suggests. On the one hand, I can see that constant connectivity has created a culture of comparison — people have been spending hours comparing their lives to carefully curated versions of others\' lives online. That said, I\'ve also seen technology bring genuine connection: video calls with family abroad, online communities for people who would otherwise feel isolated.\n\nAlthough it\'s true that excessive screen time may be linked to anxiety, the evidence suggests the problem isn\'t technology itself — it\'s how we use it. If schools had taught digital literacy from a young age, young people would be navigating these tools much more wisely now.\n\nOverall, I would argue that technology is a tool, and like all tools, its impact depends on how it\'s used. The answer isn\'t to reject it, but to use it with intention.',
    wordCount: 165,
    b1Markers: [
      'Mixed conditional: "If schools had taught… would be navigating now"',
      'Present Perfect Continuous: "people have been spending"',
      'Discourse markers: on the one hand, that said, although',
      'Opinion phrases: to my mind, I would argue',
      'Concession structure: although it\'s true that… the evidence suggests',
      'B1.7 vocabulary: connectivity, curated, screen time',
    ],
  },
  recordingTasks: [
    {
      task: 'Record your 2-minute checkpoint response.',
      instructions: [
        'Choose one of the three topics.',
        'Prepare for 2 minutes (notes only — no full script).',
        'Record your response aiming for 1.5–2 minutes.',
        'Listen back and mark the self-assessment checklist.',
      ],
    },
  ],
  speakingChecklist: [
    'I stated my position clearly at the start.',
    'I gave at least two reasons with examples.',
    'I used at least one discourse marker (on the one hand / that said / although).',
    'I acknowledged the opposing view.',
    'I concluded with a clear final position.',
    'I used at least one mixed conditional or Present Perfect Continuous.',
    'I spoke for at least 1 minute 30 seconds without reading from a script.',
  ],
  teacherOpening:
    'Today is your B1 speaking checkpoint. This is a chance to show everything you\'ve learnt — your grammar, vocabulary, opinion phrases, and discourse structure — in one integrated spoken task.',
  whyItMatters:
    'Being able to express a structured, nuanced opinion on a complex topic is the defining skill of a B1 speaker. This checkpoint is your opportunity to demonstrate that ability.',
  nextLessonBridge:
    'Next: B1 writing checkpoint — applying the same structured argument to a written text of 180–200 words.',
});

const B1_WRITING_008 = createWritingLesson({
  id: 'B1-WRITING-008',
  level: 'B1',
  order: 8,
  title: 'B1 writing checkpoint: integrated opinion essay',
  estimatedMinutes: 50,
  status: 'ready',
  tags: ['b1-8', 'reviews', 'writing', 'checkpoint', 'opinion', 'deep-approved-target'],
  prerequisites: [
    'B1-WRITING-001', 'B1-WRITING-002', 'B1-WRITING-003',
    'B1-WRITING-004', 'B1-WRITING-005', 'B1-WRITING-006', 'B1-WRITING-007',
  ],
  objectives: [
    'Write a 180–200 word structured opinion essay integrating B1 grammar and vocabulary',
    'Use paragraph organisation: introduction, main argument, concession, conclusion',
    'Apply B1 discourse markers, hedging language and cohesion devices accurately',
    'Self-assess written output against B1 CEFR criteria using a revision checklist',
  ],
  modelText: `Is technology making our lives better or worse?

Technology has transformed modern life in ways that were unimaginable a generation ago. To my mind, the overall impact has been positive — but only when used with intention.

On the one hand, technology has connected people across continents, made education more accessible, and allowed individuals to raise awareness about important causes. I have been noticing, for example, that many people use social media not just for entertainment, but to campaign for social change and build communities.

That said, there are real concerns. If we had been more careful about how social media was designed, we would not be dealing with the mental health consequences we see today. Algorithms that prioritise engagement over accuracy have contributed to the spread of misinformation and echo chambers.

Despite these challenges, I believe the solution is not to reject technology, but to use it more consciously. On balance, I would argue that the effect of technology on our lives depends far more on our choices than on the technology itself.`,
  modelTextBreakdown: [
    {
      element: 'Introduction — context + thesis',
      text: '"Technology has transformed… but only when used with intention."',
      note: 'One sentence of context + clear qualified opinion. Avoids absolute claims.',
    },
    {
      element: 'Main argument paragraph — positive side',
      text: '"On the one hand, technology has connected people…"',
      note: 'Three supporting points + one specific example with Present Perfect Continuous.',
    },
    {
      element: 'Concession paragraph — negative side',
      text: '"That said, there are real concerns."',
      note: '"That said" signals concession. Mixed conditional adds reflection on past design choices.',
    },
    {
      element: 'Conclusion — qualified final position',
      text: '"On balance, I would argue that…"',
      note: '"On balance" = hedged final judgement. Ends with general principle, not absolute claim.',
    },
    {
      element: 'B1 grammar integration',
      text: 'Mixed conditional ("If we had been more careful… we would not be dealing")',
      note: 'Past condition with present result — integrated naturally, not forced.',
    },
    {
      element: 'Present Perfect Continuous',
      text: '"I have been noticing that…"',
      note: 'Used naturally to introduce personal observation — connects to Grammar-020.',
    },
    {
      element: 'Discourse markers',
      text: '"On the one hand… That said… Despite… On balance"',
      note: 'Four different markers — variety is key at B1+.',
    },
    {
      element: 'B1 vocabulary integration',
      text: '"raise awareness, misinformation, echo chambers, algorithms, contribute"',
      note: 'Vocabulary from units 7 and 8 used accurately in context.',
    },
  ],
  grammarForWriting: [
    'Mixed conditional for reflection: "If we had + past participle, we would not be + -ing now"',
    'Present Perfect Continuous for observation: "I have been noticing that…"',
    'Passive voice for objectivity: "was designed", "were unimaginable"',
    'Hedging language: "to my mind", "I believe", "I would argue", "on balance"',
    'Linkers of contrast and concession: "on the one hand", "that said", "despite"',
  ],
  usefulSentences: [
    'Technology has transformed modern life in ways that…',
    'To my mind, the overall impact has been [positive/negative] — but only when…',
    'On the one hand, [X] has enabled people to…',
    'I have been noticing that more and more people…',
    'That said, there are real concerns about…',
    'If we had been more careful about [X], we would not be dealing with [Y] today.',
    'Despite [noun/gerund], I believe that…',
    'On balance, I would argue that [qualified position].',
  ],
  commonWritingMistakes: [
    {
      mistake: 'Writing in lists or bullet points',
      correction: 'Use full sentences with linkers: "Not only has technology connected people, but it has also democratised access to information."',
    },
    {
      mistake: 'Making absolute claims ("Technology is always bad / always good")',
      correction: 'Qualify your claims: "Technology can be harmful when...", "In many cases...", "For most people..."',
    },
    {
      mistake: 'Forgetting to address the other side',
      correction: 'Every B1 opinion essay must acknowledge the opposing view: "That said...", "It is true that..."',
    },
    {
      mistake: 'Empty conclusion ("In conclusion, these are my opinions about technology")',
      correction: '"On balance, I would argue that the effect of technology on our lives depends far more on our choices than on technology itself."',
    },
  ],
  writingBlocks: [
    {
      block: 'Paragraph 1: Introduction',
      structure: '[Context sentence + Qualified thesis]',
      example: 'Technology has [changed/shaped/transformed] modern life by [verb phrase]. To my mind, the overall impact has been [positive/negative] — but [qualifier].',
    },
    {
      block: 'Paragraph 2: Main argument',
      structure: '[Topic sentence + 2-3 supporting points + example]',
      example: 'On the one hand, technology has [point 1], [point 2], and [point 3]. For instance, [specific example].',
    },
    {
      block: 'Paragraph 3: Concession',
      structure: '[Concession marker + opposing point + evidence or example]',
      example: 'That said, there are real concerns about [issue]. If [past condition], [people/we] would [present result] today.',
    },
    {
      block: 'Paragraph 4: Conclusion',
      structure: '[Despite/Although + restatement of challenge + final qualified position]',
      example: 'Despite [noun phrase], I believe the solution is [not X, but Y]. On balance, I would argue that [general principle].',
    },
  ],
  revisionChecklist: [
    'My essay has an introduction, two body paragraphs and a conclusion.',
    'My introduction states a qualified opinion — not an absolute claim.',
    'I used at least three different discourse markers.',
    'I acknowledged the opposing view in the concession paragraph.',
    'My conclusion gives a final qualified position — not a simple summary.',
    'I used at least one mixed conditional sentence.',
    'I used at least one Present Perfect Continuous sentence.',
    'I avoided bullet points and used full paragraphs throughout.',
    'I checked subject-verb agreement and article use.',
    'My essay is between 180 and 220 words.',
  ],
  draftTask: {
    instruction:
      'Write your B1 checkpoint essay (180–220 words). Choose ONE topic: (A) "Social media has had more negative effects than positive ones. Discuss."; (B) "Travel broadens the mind — but it also has a cost. To what extent do you agree?"; (C) "Technology will solve society\'s biggest problems. How far do you agree?" Plan your four paragraphs before writing. Use the model text and sentence starters as guides — do not copy them.',
  },
  revisionTask: {
    instruction: 'After writing your draft, use the revision checklist above. Correct at least two things before submitting your final version.',
  },
  finalVersionTask: {
    instruction: 'Submit your final version. Compare it with the model text. Identify: (1) two things you did well, (2) one language point to practise before the B1 completion checkpoint.',
  },
  teacherOpening:
    'This is your B1 writing checkpoint. Everything you have been learning about opinion structure, grammar, vocabulary and cohesion comes together today in one integrated 200-word essay.',
  whyItMatters:
    'Writing a structured, nuanced opinion is one of the key competencies that marks the difference between B1 and A2. Passing this checkpoint means you are ready for B1 completion.',
  nextLessonBridge:
    'Next: B1.8 Part 2 — reading and listening checkpoints completing your B1 review unit.',
});

export const B1_DEEP_REVIEWS_CHECKPOINTS = Object.freeze([
  B1_GRAMMAR_019,
  B1_GRAMMAR_020,
  B1_VOCABULARY_015,
  B1_SPEAKING_008,
  B1_WRITING_008,
]);

export const B1_DEEP_REVIEWS_CHECKPOINTS_BY_PILLAR = Object.freeze({
  grammar: Object.freeze([B1_GRAMMAR_019, B1_GRAMMAR_020]),
  vocabulary: Object.freeze([B1_VOCABULARY_015]),
  reading: Object.freeze([]),
  listening: Object.freeze([]),
  speaking: Object.freeze([B1_SPEAKING_008]),
  writing: Object.freeze([B1_WRITING_008]),
  checkpoint: Object.freeze([]),
});
