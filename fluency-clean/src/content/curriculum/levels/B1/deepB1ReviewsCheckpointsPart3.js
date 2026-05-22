import {
  createGrammarLesson,
  createVocabularyLesson,
  createSpeakingLesson,
  createWritingLesson,
} from '../../../schemas/lessonFactories.js';

const B1_GRAMMAR_021 = createGrammarLesson({
  id: 'B1-GRAMMAR-021',
  level: 'B1',
  order: 21,
  title: 'Relative clauses: defining and non-defining',
  estimatedMinutes: 45,
  status: 'ready',
  tags: ['b1-8', 'reviews', 'grammar', 'relative-clauses', 'deep-approved-target'],
  prerequisites: ['B1-GRAMMAR-001', 'B1-GRAMMAR-002'],
  objectives: [
    'Form defining relative clauses using who, which, that, where, whose',
    'Form non-defining relative clauses using commas and who/which (not that)',
    'Know when "that" can replace "who" or "which" in defining clauses',
    'Identify whether a relative clause is essential (defining) or extra information (non-defining)',
  ],
  grammarGoal:
    'Use relative clauses to add information about a noun — either to identify it precisely (defining) or to give extra, non-essential information about it (non-defining).',
  grammarTable: {
    headers: ['Pronoun', 'Refers to', 'Defining', 'Non-defining', 'Notes'],
    rows: [
      ['who', 'people', '✓ ("The woman who called")', '✓ ("My mother, who is a doctor,")', '"that" can replace in defining'],
      ['which', 'things', '✓ ("The book which I read")', '✓ ("My laptop, which cost £800,")', '"that" can replace in defining'],
      ['that', 'people or things', '✓ ("The man that I met")', '✗ — NOT used in non-defining', 'only in defining clauses'],
      ['where', 'places', '✓ ("The city where I grew up")', '✓ ("London, where I was born,")', '—'],
      ['whose', 'possession (people/things)', '✓ ("The student whose work was best")', '✓ ("Ana, whose father is a teacher,")', '—'],
    ],
  },
  whenToUse: [
    'Use a DEFINING relative clause to identify which specific person or thing you mean: "The film that won the Oscar was brilliant." Without the clause, we don\'t know which film.',
    'Use a NON-DEFINING relative clause to add extra information about someone already identified: "My best friend, who lives in London, visited last week." The comma tells you it\'s optional information.',
    'Use "whose" to show possession in both types: "The student whose essay was best got a prize." (defining) / "Ana, whose mother is a doctor, wants to study medicine." (non-defining)',
    'Use "where" for places in both types: "The school where I studied" / "Madrid, where I spent a summer,"',
  ],
  whenNotToUse: [
    'Do NOT use "that" in non-defining clauses: NOT "My laptop, that cost £800, broke." Use "which".',
    'Do NOT omit the comma in non-defining clauses: "My sister, who is a nurse," NOT "My sister who is a nurse" (without commas it sounds like you have multiple sisters and are specifying which one).',
    'Do NOT use "what" as a relative pronoun: NOT "The book what I bought". Use "that" or "which".',
    'Avoid double subjects: NOT "The man who he called me." Remove the pronoun after the relative: "The man who called me."',
  ],
  teacherExamples: [
    {
      type: 'defining',
      example: 'The podcast that you recommended was really interesting.',
      note: '"That" is used — we are identifying which podcast. If removed, we lose the meaning.',
    },
    {
      type: 'defining',
      example: 'I need to speak to the person who is responsible for bookings.',
      note: '"Who" refers to a person. "That" would also be acceptable here.',
    },
    {
      type: 'non-defining',
      example: 'My teacher, who has been teaching for twenty years, is retiring next month.',
      note: 'Commas used — "who has been teaching for twenty years" is extra information. "That" is NOT possible here.',
    },
    {
      type: 'non-defining',
      example: 'The Eiffel Tower, which was built in 1889, receives millions of visitors each year.',
      note: '"Which" (not "that") in non-defining. The tower is already identified by its name.',
    },
    {
      type: 'whose (defining)',
      example: 'She\'s the colleague whose project won the award.',
      note: '"Whose" = belonging to the colleague.',
    },
    {
      type: 'where (non-defining)',
      example: 'I visited Lisbon, where my grandmother was born.',
      note: '"Where" = in which / at which — for places.',
    },
  ],
  commonBrazilianMistakes: [
    {
      mistake: 'The man what I saw was tall.',
      correction: 'The man who / that I saw was tall.',
      explanation: '"What" is NOT a relative pronoun in English. Use "who" for people, "which/that" for things.',
    },
    {
      mistake: 'My father, that is a doctor, works at the hospital.',
      correction: 'My father, who is a doctor, works at the hospital.',
      explanation: '"That" cannot be used in non-defining relative clauses (those with commas). Use "who" for people.',
    },
    {
      mistake: 'The book which I bought it was very expensive.',
      correction: 'The book which I bought was very expensive.',
      explanation: 'Do not repeat the object as a pronoun after the relative pronoun. "I bought it" → "which I bought" — no "it".',
    },
    {
      mistake: 'She is the student whose her work is always brilliant.',
      correction: 'She is the student whose work is always brilliant.',
      explanation: '"Whose" already shows possession — do not add another possessive pronoun after it.',
    },
  ],
  controlledPractice: [
    {
      instruction: 'Join the two sentences using a relative clause (defining or non-defining). Add commas where necessary.',
      items: [
        {
          sentences: ['The woman called yesterday. She is my new manager.'],
          answer: 'The woman who called yesterday is my new manager. (defining)',
        },
        {
          sentences: ['My sister lives in Berlin. She is studying architecture.'],
          answer: 'My sister, who lives in Berlin, is studying architecture. (non-defining — only one sister)',
        },
        {
          sentences: ['The report was published last week. It caused a lot of controversy.'],
          answer: 'The report that / which was published last week caused a lot of controversy. (defining)',
        },
        {
          sentences: ['Shakespeare was born in Stratford-upon-Avon. He wrote Romeo and Juliet.'],
          answer: 'Shakespeare, who was born in Stratford-upon-Avon, wrote Romeo and Juliet. (non-defining)',
        },
      ],
    },
    {
      instruction: 'Choose the correct relative pronoun.',
      items: [
        { sentence: 'The city ___ I was born is quite small.', options: ['who / which / where / whose'], answer: 'where' },
        { sentence: 'The student ___ essay won first prize is called Maya.', options: ['who / which / whose / where'], answer: 'whose' },
        { sentence: 'She is the person ___ helped me most.', options: ['who / which / whose / that (both possible)'], answer: 'who / that' },
        { sentence: 'This is the laptop ___ I\'ve been using for five years.', options: ['who / which / that (both possible) / whose'], answer: 'which / that' },
      ],
    },
    {
      instruction: 'Add or remove commas to make each sentence correct.',
      items: [
        { original: 'The teacher who marked my essay gave me very useful feedback.', note: 'Could be defining (one of several teachers) — no commas needed if defining.', answer: 'Correct as is — defining: identifying which teacher.' },
        { original: 'My brother who is 30 years old just got married.', note: 'Likely non-defining — most people have only one brother of that description.', answer: 'My brother, who is 30 years old, just got married.' },
        { original: 'English which is spoken all over the world is an important language.', note: 'Non-defining — "English" is already fully identified.', answer: 'English, which is spoken all over the world, is an important language.' },
      ],
    },
  ],
  errorCorrectionPractice: [
    {
      instruction: 'Find and correct the error in each sentence.',
      sentences: [
        'The book what you recommended is out of stock.',
        'My mother, that is a very good cook, makes the best food.',
        'The woman whose her son won the competition is very proud.',
        'I know a restaurant where serves excellent food.',
      ],
      answers: [
        '"What" → "that" or "which" — "what" is not a relative pronoun.',
        '"That" → "who" in non-defining clause.',
        '"Whose her" → "whose" — no possessive pronoun after "whose".',
        'Wrong verb placement: "where" describes a place, but then a verb follows. → "a restaurant that / which serves..." or "a restaurant where you can get excellent food."',
      ],
    },
  ],
  translationPractice: [
    {
      portuguese: 'O livro que eu comprei ontem é muito interessante.',
      english: 'The book that / which I bought yesterday is very interesting.',
      note: 'Defining — identifying which book. "That" or "which" both acceptable.',
    },
    {
      portuguese: 'Meu professor, que trabalha aqui há dez anos, vai se aposentar.',
      english: 'My teacher, who has been working here for ten years, is going to retire.',
      note: 'Non-defining — extra information. Note PPC in English (Grammar-020 integration).',
    },
    {
      portuguese: 'Ela é a aluna cuja redação ganhou o prêmio.',
      english: 'She is the student whose essay won the prize.',
      note: '"Cujo/cuja" = whose.',
    },
  ],
  productionTasks: [
    {
      title: 'Describe someone important to you',
      instruction:
        'Write 6–8 sentences about an important person in your life (friend, family member, colleague). Use at least: 2 defining relative clauses, 2 non-defining relative clauses with commas, and 1 "whose" or "where" clause.',
      example: 'My mentor, who has been working in education for over 20 years, is the person that inspired me most. She lives in a city where I used to study. Her methods, which are based on positive psychology, have had a significant impact on me.',
    },
    {
      title: 'Relative clause transformation',
      instruction: 'Take three sentences from your B1 writing checkpoint (B1-WRITING-008) or B1 speaking checkpoint (B1-SPEAKING-008). Expand each one by adding a relative clause — either defining or non-defining. Explain your choice.',
    },
  ],
  teacherOpening:
    'Today we look at one of the most important structures for achieving B1 fluency: relative clauses. They allow you to pack more information into a sentence and express complex ideas clearly.',
  portugueseContrast: [task('Em Relative clauses: defining and non-defining, observe que a estrutura do inglês difere da ordem natural do português.'), task('Não traduza literalmente; identifique o padrão do inglês antes de produzir.')],
  whyItMatters:
    'Relative clauses are a marker of B1+ grammar range. Without them, your sentences tend to be short and disconnected. With them, you can express nuanced, complex ideas in a single, well-structured sentence.',
  nextLessonBridge:
    'Next: Question tags and indirect questions — two structures that are essential for natural, polite English conversation.',
});

const B1_GRAMMAR_022 = createGrammarLesson({
  id: 'B1-GRAMMAR-022',
  level: 'B1',
  order: 22,
  title: 'Question tags and indirect questions',
  estimatedMinutes: 40,
  status: 'ready',
  tags: ['b1-8', 'reviews', 'grammar', 'question-tags', 'indirect-questions', 'deep-approved-target'],
  prerequisites: ['B1-GRAMMAR-001', 'B1-GRAMMAR-002'],
  objectives: [
    'Form question tags correctly (positive statement → negative tag, and vice versa)',
    'Use question tags with the correct auxiliary verb',
    'Form indirect questions using introductory phrases',
    'Use question tags and indirect questions to sound natural and polite in conversation',
  ],
  grammarGoal:
    'Use question tags to seek confirmation or show social engagement, and indirect questions to ask politely in formal or unfamiliar contexts.',
  grammarTable: {
    headers: ['Statement type', 'Statement', 'Tag', 'Rule'],
    rows: [
      ['Positive → negative tag', 'You\'re from Brazil,', 'aren\'t you?', 'Auxiliary + not + pronoun'],
      ['Negative → positive tag', 'She hasn\'t called,', 'has she?', 'Auxiliary (positive) + pronoun'],
      ['Present simple', 'He works late,', 'doesn\'t he?', 'Use "do/does" if no auxiliary in statement'],
      ['Past simple', 'They went home,', 'didn\'t they?', 'Use "did" — not the main verb'],
      ['Present perfect', 'You\'ve lived here for years,', 'haven\'t you?', 'Auxiliary from statement = "have"'],
      ['Modal verb', 'She can drive,', 'can\'t she?', 'Modal in tag matches modal in statement'],
      ['Be careful: "I am"', 'I\'m late,', 'aren\'t I?', '"am I not?" → contracted to "aren\'t I?"'],
    ],
  },
  whenToUse: [
    'Use question tags when you want to CHECK information you think is true: "You\'ve met her before, haven\'t you?"',
    'Use them to INVITE agreement in conversation (falling intonation): "That was a great film, wasn\'t it?"',
    'Use them to SOFTEN a request or express mild surprise (rising intonation): "You wouldn\'t mind helping me, would you?"',
    'Use INDIRECT QUESTIONS to ask politely — especially with strangers, in formal situations, or when you want to sound less direct: "Could you tell me where the bathroom is?" instead of "Where is the bathroom?"',
  ],
  whenNotToUse: [
    'Do NOT use the same form as the statement: NOT "You are tired, are you?" (this sounds like a challenging question). Positive → negative, negative → positive.',
    'Do NOT repeat the subject noun in the tag: NOT "Maria is late, isn\'t Maria?" Use the pronoun: "isn\'t she?"',
    'In indirect questions, do NOT use question word order after the introductory phrase: NOT "Could you tell me where is the station?" Use statement order: "Could you tell me where the station is?"',
  ],
  teacherExamples: [
    {
      context: 'Social conversation — confirming shared experience',
      example: 'That presentation was a bit long, wasn\'t it?',
      note: 'Falling intonation = inviting agreement.',
    },
    {
      context: 'Checking information',
      example: 'You haven\'t sent the email yet, have you?',
      note: 'Negative statement → positive tag.',
    },
    {
      context: 'Polite request with tag',
      example: 'You wouldn\'t have a pen I could borrow, would you?',
      note: 'This sounds very polite — less direct than "Do you have a pen?"',
    },
    {
      context: 'Indirect question — asking for information politely',
      example: 'Excuse me, could you tell me how much the course costs?',
      note: 'Statement word order after indirect opener: "how much the course costs" (not "how much does the course cost").',
    },
    {
      context: 'Indirect question — asking for location',
      example: 'Do you know where the nearest ATM is?',
      note: '"Where the ATM is" — not "where is the ATM" after "Do you know".',
    },
    {
      context: 'Indirect embedded in a longer question',
      example: 'I was wondering whether you could explain how the system works.',
      note: '"Whether" is used when the direct question would be a yes/no question.',
    },
  ],
  commonBrazilianMistakes: [
    {
      mistake: 'She likes music, isn\'t it?',
      correction: 'She likes music, doesn\'t she?',
      explanation: 'The tag must use the same auxiliary as the statement. "She likes" has no auxiliary → use "do/does". Subject is "she" → "doesn\'t she?"',
    },
    {
      mistake: 'Could you tell me where is the restaurant?',
      correction: 'Could you tell me where the restaurant is?',
      explanation: 'After an indirect question opener ("Could you tell me…"), use statement word order, not question word order.',
    },
    {
      mistake: 'I am not wrong, am I not?',
      correction: 'I\'m not wrong, am I?',
      explanation: 'Negative statement → positive tag. "Am I not?" is technically correct but unnatural. Positive statement "I am" → "aren\'t I?" (not "am I not?")',
    },
    {
      mistake: 'Do you know where does she live?',
      correction: 'Do you know where she lives?',
      explanation: 'After "Do you know", use statement word order: "where she lives" — not "where does she live".',
    },
  ],
  controlledPractice: [
    {
      instruction: 'Add the correct question tag.',
      items: [
        { sentence: 'You speak Portuguese,', answer: 'don\'t you?' },
        { sentence: 'She hasn\'t finished yet,', answer: 'has she?' },
        { sentence: 'They were at the meeting,', answer: 'weren\'t they?' },
        { sentence: 'He can\'t come tomorrow,', answer: 'can he?' },
        { sentence: 'I\'m next on the list,', answer: 'aren\'t I?' },
        { sentence: 'You\'ve been waiting for a long time,', answer: 'haven\'t you?' },
      ],
    },
    {
      instruction: 'Rewrite as an indirect question using the prompt given.',
      items: [
        { direct: 'Where is the bus stop?', opener: 'Could you tell me…', answer: 'Could you tell me where the bus stop is?' },
        { direct: 'How long does the course last?', opener: 'Do you know…', answer: 'Do you know how long the course lasts?' },
        { direct: 'Is there a bank nearby?', opener: 'I was wondering…', answer: 'I was wondering whether / if there is a bank nearby.' },
        { direct: 'What time does the library close?', opener: 'Can you tell me…', answer: 'Can you tell me what time the library closes?' },
      ],
    },
  ],
  errorCorrectionPractice: [
    {
      instruction: 'Find and correct the error.',
      sentences: [
        'He works here, isn\'t it?',
        'Do you know where does the nearest supermarket is?',
        'You\'re coming to the party, are you?',
        'Could you tell me what time is it?',
      ],
      answers: [
        '"Isn\'t it?" → "doesn\'t he?" — must match the subject and auxiliary of the statement.',
        '"Where does… is" — double error. → "Do you know where the nearest supermarket is?"',
        'Positive statement → negative tag: "aren\'t you?"',
        'Statement word order in indirect question: "what time it is" (not "what time is it").',
      ],
    },
  ],
  translationPractice: [
    {
      portuguese: 'Você já esteve aqui antes, não é?',
      english: 'You\'ve been here before, haven\'t you?',
      note: 'Present perfect → "have" in tag → "haven\'t you?"',
    },
    {
      portuguese: 'Você poderia me dizer onde fica o banheiro?',
      english: 'Could you tell me where the bathroom is?',
      note: 'Indirect question — statement word order after the opener.',
    },
    {
      portuguese: 'Não sei se ela vai aparecer ou não.',
      english: 'I don\'t know whether she\'s going to come or not.',
      note: '"Se" = "whether" / "if" in indirect speech.',
    },
  ],
  productionTasks: [
    {
      title: 'Conversation practice: question tags',
      instruction:
        'Write or say 6 conversational exchanges using question tags. Include at least: 2 tags with falling intonation (seeking agreement), 2 tags with rising intonation (genuine question), 1 negative statement + positive tag, 1 with a modal verb.',
    },
    {
      title: 'Polite enquiry roleplay',
      instruction:
        'Imagine you are a new student at a language school. Write 5 questions you would ask using indirect question forms. Use at least 3 different introductory phrases: "Could you tell me...", "Do you know...", "I was wondering...".',
      example: 'Could you tell me when the next lesson starts? / Do you know where I can find the reading list?',
    },
  ],
  teacherOpening:
    'Today we look at two structures that are essential for sounding natural in English conversation: question tags — which show engagement and seek confirmation — and indirect questions, which make requests sound polite and appropriate.',
  portugueseContrast: [task('Em Question tags and indirect questions, observe que a estrutura do inglês difere da ordem natural do português.'), task('Não traduza literalmente; identifique o padrão do inglês antes de produzir.')],
  whyItMatters:
    'Question tags are everywhere in natural spoken English. Without them, conversations can feel abrupt. Indirect questions are essential in professional and formal contexts. Both are tested at B1 level.',
  nextLessonBridge:
    'Next: B1 word-building — understanding how prefixes and suffixes let you expand vocabulary rapidly by recognising patterns across word families.',
});

const B1_VOCABULARY_017 = createVocabularyLesson({
  id: 'B1-VOCABULARY-017',
  level: 'B1',
  order: 17,
  title: 'Word-building: prefixes, suffixes and word families',
  estimatedMinutes: 40,
  status: 'ready',
  tags: ['b1-8', 'reviews', 'vocabulary', 'word-building', 'prefixes', 'suffixes', 'deep-approved-target'],
  prerequisites: ['B1-VOCABULARY-015', 'B1-VOCABULARY-016'],
  objectives: [
    'Identify and use common English prefixes (un-, dis-, re-, over-, mis-, pre-) to modify meaning',
    'Identify and use common suffixes (-ful, -less, -ness, -tion/-sion, -ment, -er/-or) to form new words',
    'Use word family knowledge to build vocabulary rapidly (e.g. act → action → active → actively)',
    'Avoid common errors in word formation that are typical for Portuguese speakers',
  ],
  topicContext:
    'Word-building is a powerful B1 strategy: once you know a root word, understanding prefixes and suffixes lets you recognise and use entire word families. This dramatically expands your vocabulary with minimal memorisation effort.',
  essentialWords: [
    {
      word: 'un- (prefix)',
      definition: 'NOT / OPPOSITE of: unhappy, uncomfortable, uncertain, unfair, unreliable',
      example: 'The results were unclear — we needed more evidence.',
      family: 'clear → unclear; happy → unhappy; comfortable → uncomfortable',
    },
    {
      word: 'dis- (prefix)',
      definition: 'NOT / opposite: disagree, disappear, disconnect, disadvantage, dishonest',
      example: 'I completely disagree with the government\'s approach to this issue.',
      family: 'agree → disagree; appear → disappear; honest → dishonest',
    },
    {
      word: 're- (prefix)',
      definition: 'AGAIN or BACK: redo, rewrite, rethink, reconsider, return, rebuild',
      example: 'After the feedback, she rewrote the essay completely.',
      family: 'write → rewrite; consider → reconsider; build → rebuild',
    },
    {
      word: 'over- (prefix)',
      definition: 'TOO MUCH: overwork, overwhelm, overestimate, overreact, overlook',
      example: 'I think we\'ve been overestimating how much time this will take.',
      family: 'work → overwork; estimate → overestimate; react → overreact',
    },
    {
      word: 'mis- (prefix)',
      definition: 'WRONGLY / BADLY: misunderstand, misuse, mislead, misinformation, mistake',
      example: 'I think you misunderstood what I was trying to say.',
      family: 'understand → misunderstand; use → misuse; lead → mislead',
    },
    {
      word: '-ful (suffix)',
      definition: 'HAVING a quality: careful, useful, hopeful, powerful, meaningful, grateful',
      example: 'Be careful when you respond — the tone matters.',
      family: 'care → careful; use → useful; hope → hopeful; meaning → meaningful',
    },
    {
      word: '-less (suffix)',
      definition: 'WITHOUT a quality: careless, useless, hopeless, helpless, meaningless',
      example: 'His argument was completely meaningless — there was no evidence.',
      family: 'Often the opposite of -ful: careful → careless; useful → useless',
    },
    {
      word: '-ness (suffix)',
      definition: 'STATE or QUALITY (noun): happiness, sadness, awareness, darkness, kindness',
      example: 'Raising awareness is one of the most important roles of journalism.',
      family: 'happy → happiness; aware → awareness; kind → kindness',
    },
    {
      word: '-tion / -sion (suffix)',
      definition: 'ACTION or STATE (noun): education, organisation, communication, decision, expression',
      example: 'The organisation has been campaigning for equality for years.',
      family: 'educate → education; organise → organisation; communicate → communication',
    },
    {
      word: '-ment (suffix)',
      definition: 'ACTION, RESULT or STATE (noun): development, achievement, improvement, agreement, employment',
      example: 'There has been a significant improvement in test scores this year.',
      family: 'develop → development; achieve → achievement; improve → improvement',
    },
    {
      word: '-er / -or (suffix)',
      definition: 'PERSON WHO DOES something: teacher, worker, director, creator, editor',
      example: 'She became a content creator after leaving her corporate job.',
      family: 'teach → teacher; direct → director; edit → editor; create → creator',
    },
    {
      word: 'pre- (prefix)',
      definition: 'BEFORE: prepare, preview, predict, prehistoric, prevent',
      example: 'If we had prepared better, we would have avoided that situation.',
      family: 'view → preview; pare/prepare: pre- + "pare" (to get ready); dict → predict',
    },
  ],
  chunks: [
    {
      chunk: 'make an improvement (in/to)',
      example: 'She has been making steady improvements to her pronunciation.',
      wordBuilding: 'improve → improvement → to make an improvement',
    },
    {
      chunk: 'reach an agreement',
      example: 'After a long discussion, both sides finally reached an agreement.',
      wordBuilding: 'agree → agreement → to reach an agreement',
    },
    {
      chunk: 'lack of awareness',
      example: 'The problem is partly due to a lack of public awareness.',
      wordBuilding: 'aware → awareness → lack of awareness',
    },
    {
      chunk: 'lead to a misunderstanding',
      example: 'The ambiguous message led to a complete misunderstanding.',
      wordBuilding: 'mis- + understand → misunderstand → misunderstanding',
    },
    {
      chunk: 'be an achievement',
      example: 'Finishing this course is a real achievement — be proud of yourself.',
      wordBuilding: 'achieve → achievement → be an achievement',
    },
    {
      chunk: 'raise awareness of',
      example: 'The campaign is trying to raise awareness of mental health issues.',
      wordBuilding: 'Reviewed from B1-VOCABULARY-014 — now with word-building context',
    },
  ],
  dangerousConfusions: [
    {
      pair: ['sensible', 'sensitive'],
      explanation:
        '"Sensible" means reasonable and practical: "That\'s a sensible decision." It does NOT mean "easily affected by emotions". "Sensitive" means easily affected by emotions or physical stimuli: "She\'s very sensitive about her family." Common Brazilian error: "Ela é muito sensível" = "She is very sensitive" — NOT "She is very sensible."',
      memoryTip: 'Sensible = reasonable (a sensible plan). Sensitive = emotionally affected (a sensitive topic).',
    },
    {
      pair: ['-tion words: vary vs variation', 'Verb to noun trap'],
      explanation:
        'Many students write "the developement" instead of "the development", or "informations" (uncountable!). Common errors: "informations" → "information" (always singular); "advices" → "advice" (uncountable); "knowledges" → "knowledge" (uncountable); "I made a travel" → "I took a trip / I travelled".',
      memoryTip: 'Information, advice, knowledge = uncountable — no plural "s".',
    },
    {
      pair: ['overwork (verb) vs. overworked (adjective)'],
      explanation:
        '"To overwork" = to work too much (verb). "Overworked" = a state: "I feel overworked." Similarly: overwhelm (verb) vs. overwhelmed (adjective). "I was completely overwhelmed" — not "I was completely overwhelm."',
      memoryTip: 'State adjectives from verbs often need -ed ending: overwhelmed, overworked, frustrated, satisfied.',
    },
  ],
  miniDialogues: [
    {
      title: 'Using word-building in real conversation',
      dialogue: [
        { speaker: 'Carla', line: 'I\'ve been feeling completely overwhelmed lately. I think I\'ve been overworking myself.' },
        { speaker: 'Dan', line: 'I\'ve noticed that. You\'ve been so careless about taking breaks — which isn\'t like you at all.' },
        { speaker: 'Carla', line: 'I know. I think there\'s been a complete misunderstanding between me and my manager about what\'s expected.' },
        { speaker: 'Dan', line: 'That\'s really unhelpful. Have you tried to reconsider your workload with her?' },
        { speaker: 'Carla', line: 'I haven\'t been brave enough. But I think the development of better communication is essential.' },
        { speaker: 'Dan', line: 'Completely. And look — finishing this B1 course is a real achievement. You should feel hopeful, not hopeless.' },
      ],
      note: 'Contains: overwhelmed, overworking, careless, misunderstanding, unhelpful, reconsider, development, achievement, hopeful, hopeless.',
    },
  ],
  recognitionPractice: [
    {
      instruction: 'Complete each word with the correct prefix (un-, dis-, re-, over-, mis-) or suffix (-ful, -less, -ness, -tion, -ment).',
      items: [
        { prompt: 'The instructions were very ___clear.', answer: 'unclear' },
        { prompt: 'She had to ___write the report after the feedback.', answer: 'rewrite' },
        { prompt: 'He showed great kind___  towards the students.', answer: 'kindness' },
        { prompt: 'There was a long discuss___  about the new policy.', answer: 'discussion' },
        { prompt: 'That was a very ___less comment — it didn\'t help at all.', answer: 'careless / helpless / meaningless (context-dependent)' },
      ],
    },
    {
      instruction: 'Build the word family. Write the verb, noun, and adjective for each root.',
      items: [
        { root: 'develop', verb: 'develop', noun: 'development', adjective: 'developed / developing' },
        { root: 'communicate', verb: 'communicate', noun: 'communication', adjective: 'communicative' },
        { root: 'achieve', verb: 'achieve', noun: 'achievement', adjective: '—' },
        { root: 'organise', verb: 'organise', noun: 'organisation', adjective: 'organised' },
      ],
    },
  ],
  usagePractice: [
    {
      instruction: 'Correct the word-building error in each sentence.',
      items: [
        { wrong: 'She gave me some very usefull advices about the interview.', correct: 'She gave me some very useful advice about the interview. (useful + advice is uncountable)' },
        { wrong: 'There has been a big developement in renewable energy.', correct: 'There has been a big development in renewable energy.' },
        { wrong: 'I was completely misunderstanded by my team.', correct: 'I was completely misunderstood by my team.' },
        { wrong: 'The lack of informations is a serious problem.', correct: 'The lack of information is a serious problem.' },
      ],
    },
  ],
  productionTasks: [
    {
      title: 'Word-building paragraph',
      instruction:
        'Write a paragraph (80–100 words) about a challenge you have faced in learning English. Use at least 6 words that you have built using the prefixes or suffixes from this lesson. Circle the prefix/suffix in each word.',
      example: 'Learning English has been both challenging and rewarding. At first, I was overwhelmed by the grammar rules and misunderstood many cultural references. However, with careful practice and the development of better study habits, I have made real improvements. My teacher\'s kindness and encouragement has been extremely helpful. I feel hopeful about reaching B2.',
      minimumPrefixSuffix: 6,
    },
    {
      title: 'Rapid fire word families',
      instruction: 'Your teacher says a word. You have 10 seconds to give at least two other words in the same family. Example: "happy" → "unhappy, happiness, happily". Practise with: develop, organise, communicate, care, agree, use.',
    },
  ],
});

const B1_SPEAKING_009 = createSpeakingLesson({
  id: 'B1-SPEAKING-009',
  level: 'B1',
  order: 9,
  title: 'B1 completion speaking: narrate an experience and discuss its significance',
  estimatedMinutes: 40,
  status: 'ready',
  tags: ['b1-8', 'reviews', 'speaking', 'completion', 'narrative', 'deep-approved-target'],
  prerequisites: ['B1-SPEAKING-008'],
  objectives: [
    'Narrate a personal experience fluently at B1 level using past tenses accurately',
    'Discuss the significance of the experience using opinion phrases and discourse markers',
    'Integrate B1 grammar (past continuous, perfect, mixed conditionals, relative clauses) in spoken production',
    'Self-assess against the B1 CEFR speaking criteria for interaction and fluency',
  ],
  speakingSituation:
    'B1 completion speaking task. You will narrate a significant personal experience in 2–3 minutes, then discuss what you learnt from it and how it changed you — integrating grammar and vocabulary from across the B1 course.',
  modelPhrases: [
    { phrase: 'It happened when I was…', use: 'Setting the scene — past continuous or time expression' },
    { phrase: 'I still remember the moment when…', use: 'Highlight a defining moment with relative clause' },
    { phrase: 'What made it particularly significant was the fact that…', use: 'Emphasis + relative clause structure' },
    { phrase: 'Looking back, I realise that…', use: 'Reflection opener' },
    { phrase: 'If I hadn\'t [done that], I would never have [discovered / learnt]…', use: '3rd conditional reflection' },
    { phrase: 'That experience, which changed my perspective completely, taught me…', use: 'Non-defining relative clause in narrative' },
    { phrase: 'What I\'ve come to understand is that…', use: 'Present perfect + that-clause for insight' },
    { phrase: 'I had been feeling / doing / trying for a long time when…', use: 'Past perfect continuous — background to a turning point' },
    { phrase: 'I wouldn\'t be who I am today if…', use: 'Mixed conditional for identity reflection' },
    { phrase: 'It was the kind of experience that…', use: 'Defining relative clause for emphasis' },
  ],
  pronunciationFocus: {
    title: 'Pronunciation & shadowing',
    tips: [
      'Shadow: "I still remember the moment when..." — stress reMEMber and MOMent. Practise the nostalgic opening with slightly slower pacing.',
      '"If I hadn\'t done that, I would never have discovered..." — chunk: "if I HADn\'t DONE that / I would NEVer have disCOVered..." Stress HADn\'t and NEVer.',
      '"Looking back, I realise that..." — pause after "back" to signal the reflective shift. Stress reALise.',
      '"I wouldn\'t be who I am today if..." — link "wouldn\'t-be" smoothly. Stress TODAY and the condition that follows "if".',
    ],
  },
  guidedSpeaking: [
    {
      stage: 'Choose your experience (1 minute)',
      instruction:
        'Think of a real experience that was significant to you — it changed how you think, what you believe, or who you are. It could be a trip, a relationship, a mistake, a success, or a moment of realisation. Write 5 key words (not sentences) to help you remember the key moments.',
      prompts: [
        'A time when you failed at something and learnt from it',
        'A journey or trip that changed your perspective',
        'A person who influenced you significantly',
        'A moment when you had to make a difficult decision',
        'An experience with a different culture or language',
      ],
    },
    {
      stage: 'Structure your response (structure, not script)',
      structure: [
        { part: 'Setting the scene (20–30 seconds)', tip: 'When and where? Who was there? What was happening (past continuous)?' },
        { part: 'What happened (40–50 seconds)', tip: 'Sequence of events using past simple. Include one moment of conflict, surprise or decision.' },
        { part: 'What you felt or thought (20–30 seconds)', tip: 'Emotions, reactions, what you were thinking. Use adverbs: "surprisingly", "suddenly", "unexpectedly".' },
        { part: 'What you learnt (30–40 seconds)', tip: 'Use "looking back", "what I realise now is", mixed conditional. Connect to your current self.' },
      ],
    },
    {
      stage: 'Deliver (2–3 minutes)',
      selfMonitor: [
        'Am I using past continuous to set the scene (what was happening when…)?',
        'Am I using at least one relative clause to add detail?',
        'Am I reflecting with a conditional or "looking back" phrase?',
        'Am I speaking for at least 2 minutes without reading?',
      ],
    },
  ],
  modelAnswer: {
    topic: 'A significant experience: moving abroad',
    response:
      'I\'d like to talk about the time I moved abroad for the first time — it was about five years ago, and I was working in a company that had an international office. I still remember the moment when I landed and realised that nobody around me was speaking my language. I had been preparing for months, but nothing had quite prepared me for that feeling.\n\nWhat made it particularly significant was the fact that I had to rely completely on English — not for lessons or exercises, but for actual daily life. Buying food, making friends, asking for help when things went wrong.\n\nLooking back, I realise that experience, which was difficult at the time, was the most transformative thing I\'ve done for my English. If I hadn\'t taken that opportunity, I would never have discovered how capable I actually am. I wouldn\'t be speaking to you with this level of confidence today.\n\nWhat I\'ve come to understand is that the best way to learn a language is not to study it, but to live in it — even temporarily.',
    wordCount: 180,
    b1Markers: [
      'Non-defining relative clause: "that experience, which was difficult at the time"',
      'Defining relative clause: "a company that had an international office"',
      '3rd conditional: "If I hadn\'t taken that opportunity, I would never have discovered"',
      'Mixed conditional: "I wouldn\'t be speaking to you with this level of confidence today"',
      'Past perfect continuous: "I had been preparing for months"',
      'Reflection opener: "Looking back, I realise that"',
    ],
  },
  recordingTasks: [
    {
      task: 'B1 completion speaking — narrate your experience.',
      instructions: [
        'Choose one significant experience.',
        'Take 1 minute to plan (5 key words only — no script).',
        'Record for 2–3 minutes.',
        'After recording, listen back and note: Which B1 grammar structures did you use? Which did you miss?',
        'Try once more — aiming to include at least 2 structures you missed in the first attempt.',
      ],
    },
  ],
  speakingChecklist: [
    'I set the scene using past continuous or a time expression.',
    'I told the story with a clear sequence of events.',
    'I used at least one relative clause (defining or non-defining).',
    'I reflected using "looking back" or a conditional.',
    'I spoke for 2+ minutes without reading.',
    'My conclusion connected the past experience to who I am today.',
  ],
  teacherOpening:
    'Today you give your B1 completion speaking performance. Everything you\'ve been learning — past tenses, conditionals, relative clauses, opinion phrases — comes together in a single piece of spoken English about a real experience from your life.',
  whyItMatters:
    'Narrating a personal experience fluently and connecting it to broader reflection is a clear B1 competency marker. It shows you can produce sustained, structured English speech — not just answer short questions.',
  nextLessonBridge:
    'Next: B1 completion writing — a formal letter or email showing B1 register awareness and task fulfilment.',
});

const B1_WRITING_009 = createWritingLesson({
  id: 'B1-WRITING-009',
  level: 'B1',
  order: 9,
  title: 'B1 completion writing: formal letter or email',
  estimatedMinutes: 50,
  status: 'ready',
  tags: ['b1-8', 'reviews', 'writing', 'completion', 'formal', 'letter', 'email', 'deep-approved-target'],
  prerequisites: ['B1-WRITING-008'],
  objectives: [
    'Write a formal letter or email at B1 level (150–180 words) with appropriate register',
    'Use correct formal letter conventions: salutation, paragraphing, closing',
    'Apply B1 formal vocabulary (from Vocabulary-016 and 017) in a structured, task-focused text',
    'Fulfil a communicative purpose: making a request, complaining politely, or making an application',
  ],
  modelText: `Dear Sir or Madam,

I am writing to enquire about the Advanced English Language Course advertised on your website. I would be grateful if you could provide further information regarding the course content and assessment methods.

I have been studying English for three years and have recently completed a B1 programme. I am particularly interested in developing my formal writing skills and academic vocabulary, as I intend to apply for a postgraduate programme at an English-speaking university next year.

Could you tell me whether the course includes preparation for internationally recognised examinations? I would also like to know whether accommodation can be arranged for students who travel from abroad.

I look forward to hearing from you. Please do not hesitate to contact me if you need any further information.

Yours faithfully,
[Your name]`,
  modelTextBreakdown: [
    {
      element: 'Opening salutation',
      text: '"Dear Sir or Madam,"',
      note: 'Use when you don\'t know the recipient\'s name. "Dear Mr/Ms [surname]" if you know it. Never "Dear [first name]" in formal letters.',
    },
    {
      element: 'Reason for writing — first paragraph',
      text: '"I am writing to enquire about…"',
      note: 'State purpose immediately. "Enquire" (formal) not "ask". "I would be grateful if you could" = polite request formula.',
    },
    {
      element: 'Background — second paragraph',
      text: '"I have been studying English for three years…"',
      note: 'Present Perfect Continuous (Grammar-020) used naturally. Provides relevant context without being informal.',
    },
    {
      element: 'Specific questions — third paragraph',
      text: '"Could you tell me whether…" / "I would also like to know whether…"',
      note: 'Indirect questions (Grammar-022) — polite, formal. "Whether" for yes/no indirect questions.',
    },
    {
      element: 'Closing — forward reference',
      text: '"I look forward to hearing from you."',
      note: '"Look forward to + -ing" — formal closing phrase. Always followed by gerund.',
    },
    {
      element: 'Formal farewell',
      text: '"Yours faithfully" (when you used Dear Sir/Madam) OR "Yours sincerely" (when you know the name).',
      note: 'Key rule: unknown name → faithfully. Known name → sincerely.',
    },
    {
      element: 'Register consistency',
      text: 'No contractions (I am, not I\'m), formal vocabulary throughout',
      note: '"Enquire", "regarding", "intend", "accommodation", "internationally recognised" — all formal B1+ vocabulary.',
    },
    {
      element: 'Indirect questions integrated',
      text: '"Could you tell me whether the course includes…" / "I would also like to know whether accommodation…"',
      note: 'Grammar-022 applied in authentic formal context.',
    },
  ],
  grammarForWriting: [
    'Indirect questions for polite requests: "Could you tell me whether…" / "I would like to know if…"',
    'Present Perfect Continuous for background: "I have been studying English for three years."',
    'Relative clauses to add detail efficiently: "students who travel from abroad"',
    '"I would be grateful if you could…" — formal conditional request',
    '"I am writing to + infinitive" — standard formal letter opener',
    '"I look forward to + -ing" — formal future reference',
  ],
  usefulSentences: [
    'I am writing to enquire about / apply for / complain about / request information regarding…',
    'I would be grateful if you could provide further information about…',
    'Could you tell me whether / when / how / what…?',
    'I have been [studying/working/waiting] for [time period].',
    'I would also like to know if it is possible to…',
    'Please do not hesitate to contact me if you require any further information.',
    'I look forward to hearing from you at your earliest convenience.',
    'Yours faithfully / Yours sincerely,',
  ],
  commonWritingMistakes: [
    {
      mistake: 'Using "Dear [first name]" in a formal letter',
      correction: '"Dear Mr Smith," (if you know the surname) or "Dear Sir or Madam," (if unknown). Never "Dear John," to a stranger.',
    },
    {
      mistake: 'Mixing "Yours faithfully" and "Yours sincerely" randomly',
      correction: '"Yours faithfully" = used with "Dear Sir/Madam" (name unknown). "Yours sincerely" = used with "Dear Mr/Ms [Name]" (name known).',
    },
    {
      mistake: 'Direct questions instead of indirect: "What is the cost of the course?"',
      correction: '"Could you tell me what the cost of the course is?" — indirect questions sound more polite and formal in letters.',
    },
    {
      mistake: 'Using contractions in a formal letter: "I\'m writing to enquire…"',
      correction: '"I am writing to enquire…" — no contractions in formal written English.',
    },
  ],
  writingBlocks: [
    {
      block: 'Paragraph 1: Opening + purpose',
      structure: '"Dear [salutation], I am writing to [enquire about / apply for / complain about] [topic]."',
    },
    {
      block: 'Paragraph 2: Background / context',
      structure: '"I have been [context]. I am particularly interested in [reason] because [purpose]."',
    },
    {
      block: 'Paragraph 3: Specific questions or requests',
      structure: '"Could you tell me whether [X]? I would also like to know [Y]."',
    },
    {
      block: 'Paragraph 4: Closing',
      structure: '"I look forward to hearing from you. Please do not hesitate to contact me if [condition]. Yours faithfully/sincerely, [Name]"',
    },
  ],
  revisionChecklist: [
    'I used the correct salutation (Dear Sir/Madam or Dear Mr/Ms [Surname]).',
    'My opening sentence states the purpose clearly.',
    'I provided relevant background in paragraph 2.',
    'I asked at least two specific questions using indirect question form.',
    'I used no contractions.',
    'I used at least two formal vocabulary items (enquire, regarding, accommodation, intend, etc.).',
    'I closed with "I look forward to hearing from you."',
    'I used the correct farewell (faithfully vs sincerely).',
    'My letter is 150–180 words.',
    'I checked all spelling and grammar.',
  ],
  draftTask: {
    instruction:
      'Write a formal letter or email (150–180 words). Choose ONE situation: (A) Enquire about an English language course or university programme. (B) Apply for a work experience placement or internship at an English-speaking company. (C) Write a polite complaint to a hotel or travel company about a problem with your booking. Use the model text as a guide for format and register. Use at least two indirect questions and one Present Perfect Continuous sentence.',
  },
  revisionTask: {
    instruction: 'After writing your draft, use the revision checklist above. Check especially: register consistency (no contractions), correct farewell, and indirect question form.',
  },
  finalVersionTask: {
    instruction: 'Write your final version. Compare it with the model text. List: (1) three things you did well, (2) one language area to continue practising at B2. You have now completed the B1 writing curriculum.',
  },
  teacherOpening:
    'Today you write your final B1 task — a formal letter or email. This tests a completely different skill from the opinion essay: register, conventions, indirect questions, and professional communication. Congratulations on reaching this point in your B1 course.',
  whyItMatters:
    'Formal letters and emails are a real-world B1 competency tested in international examinations (Cambridge B1 Preliminary, IELTS Academic Task 1). This is the kind of writing that opens professional and academic doors.',
  nextLessonBridge:
    'You have now completed all B1 lessons. The final step is your B1 self-assessment and planning for B2.',
});

export const B1_DEEP_REVIEWS_CHECKPOINTS_PART3 = Object.freeze([
  B1_GRAMMAR_021,
  B1_GRAMMAR_022,
  B1_VOCABULARY_017,
  B1_SPEAKING_009,
  B1_WRITING_009,
]);

export const B1_DEEP_REVIEWS_CHECKPOINTS_PART3_BY_PILLAR = Object.freeze({
  grammar: Object.freeze([B1_GRAMMAR_021, B1_GRAMMAR_022]),
  vocabulary: Object.freeze([B1_VOCABULARY_017]),
  reading: Object.freeze([]),
  listening: Object.freeze([]),
  speaking: Object.freeze([B1_SPEAKING_009]),
  writing: Object.freeze([B1_WRITING_009]),
  checkpoint: Object.freeze([]),
});
