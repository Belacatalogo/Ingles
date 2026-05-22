import {
  createReadingLesson,
  createListeningLesson,
  createVocabularyLesson,
} from '../../../schemas/lessonFactories.js';

const B1_READING_008 = createReadingLesson({
  id: 'B1-READING-008',
  level: 'B1',
  order: 8,
  title: 'Reading checkpoint: Can we learn to be happier?',
  estimatedMinutes: 45,
  status: 'ready',
  tags: ['b1-8', 'reviews', 'reading', 'checkpoint', 'wellbeing', 'psychology', 'deep-approved-target'],
  prerequisites: [
    'B1-READING-001', 'B1-READING-002', 'B1-READING-003',
    'B1-READING-004', 'B1-READING-005', 'B1-READING-006', 'B1-READING-007',
  ],
  objectives: [
    'Read a structured article at B1 level with confidence and accuracy',
    'Identify the writer\'s viewpoint and distinguish fact from opinion',
    'Infer meaning of unfamiliar vocabulary from context',
    'Produce a written response integrating ideas from the text with personal experience',
  ],
  preReading: [
    {
      question: 'What makes you feel genuinely happy? List three things. Are they things you do, things you have, or things you experience?',
    },
    {
      question: 'Do you think happiness is something you are born with, or something you can practise and develop? Why?',
    },
    {
      question: 'Look at the title "Can we learn to be happier?" — what answer do you expect the article to give? What evidence might it use?',
    },
  ],
  mainText: `Can we learn to be happier?

For most of human history, happiness was considered a matter of luck — you either had it or you didn't. In recent decades, however, psychologists and neuroscientists have begun to challenge that assumption. Research now suggests that roughly 50 per cent of our happiness is determined by our genetics, 10 per cent by our circumstances (income, health, living situation), and a surprising 40 per cent by our daily habits and the way we think. That final 40 per cent is where the opportunity lies.

One of the most well-supported findings in positive psychology is that practising gratitude consistently has a measurable effect on wellbeing. Studies have shown that people who have been writing down three things they are grateful for each evening — even for just two weeks — report significantly lower levels of anxiety and higher levels of life satisfaction compared to control groups. The effect is not simply a matter of thinking positively; it appears to restructure the way the brain weighs negative experiences against positive ones.

Social connection is another key contributor to happiness. Despite the fact that many people have been spending more time connected online, researchers consistently find that the quality of in-person relationships — not the quantity of digital contacts — is the strongest predictor of long-term happiness. Psychologist Robert Waldinger, who led a 75-year Harvard study on adult development, concluded that "the people who were most satisfied in their relationships at age 50 were the healthiest at age 80."

Perhaps the most counterintuitive finding, however, is that the pursuit of happiness itself can undermine it. Cultures that place a high value on personal happiness as a goal — that see it as something to be achieved and maintained — tend to report higher levels of loneliness and dissatisfaction. In contrast, people who focus on meaning, contribution and connection tend to report greater wellbeing, even if they describe themselves as "not particularly happy" in any given moment.

So, can we learn to be happier? The evidence suggests yes — but perhaps the most effective strategy is not to chase happiness directly. Instead, building habits of gratitude, investing in deep relationships, and seeking meaning in what we do may be the most reliable path to a life that feels genuinely worthwhile.`,
  vocabularyInContext: [
    {
      word: 'counterintuitive',
      sentence: 'Perhaps the most counterintuitive finding, however, is that the pursuit of happiness itself can undermine it.',
      question: 'Based on the context, what does "counterintuitive" mean? What clues in the sentence or paragraph helped you?',
      answer: 'Something that goes against what you would naturally expect to be true. Clue: the sentence says the "pursuit of happiness" — which you\'d expect to bring happiness — can actually undermine it.',
    },
    {
      word: 'undermine',
      sentence: '...the pursuit of happiness itself can undermine it.',
      question: 'What does "undermine" mean in this context? What is being weakened?',
      answer: 'To slowly weaken or damage something. Here: the pursuit of happiness can weaken or destroy the happiness itself.',
    },
    {
      word: 'predictor',
      sentence: '...the quality of in-person relationships...is the strongest predictor of long-term happiness.',
      question: 'What does "predictor" tell us about the relationship between in-person relationships and happiness?',
      answer: 'Something that strongly indicates or forecasts what will happen. The quality of in-person relationships best forecasts whether someone will be happy long-term.',
    },
  ],
  comprehensionQuestions: [
    {
      question: 'According to the article, what percentage of happiness can be influenced by our daily habits?',
      evidence: 'Quote the exact figure and find the sentence that supports it.',
      answer: '40 per cent. "a surprising 40 per cent by our daily habits and the way we think."',
    },
    {
      question: 'What specific practice does the article mention as having a measurable effect on wellbeing? How long was the study?',
      evidence: 'Find two details from paragraph 2.',
      answer: 'Writing down three things to be grateful for each evening, for at least two weeks.',
    },
    {
      question: 'According to Robert Waldinger\'s Harvard study, what is the relationship between relationships and health?',
      evidence: 'Use a direct quote.',
      answer: '"The people who were most satisfied in their relationships at age 50 were the healthiest at age 80."',
    },
    {
      question: 'What does the writer say about cultures that value personal happiness as a goal?',
      evidence: 'What surprising outcome does the writer describe?',
      answer: 'They tend to report higher levels of loneliness and dissatisfaction — the opposite of what you\'d expect.',
    },
    {
      question: 'What three things does the writer suggest can lead to a "genuinely worthwhile" life?',
      evidence: 'Find the answer in the final paragraph.',
      answer: 'Habits of gratitude, investing in deep relationships, and seeking meaning in what we do.',
    },
  ],
  guidedSummary: {
    instruction: 'Complete the four-part summary of the article using 1–2 sentences for each part.',
    parts: [
      { label: 'The central claim', prompt: 'What is the writer\'s main argument about happiness?' },
      { label: 'Evidence 1', prompt: 'What does research on gratitude practice show?' },
      { label: 'Evidence 2', prompt: 'What does the Harvard study say about relationships?' },
      { label: 'Conclusion', prompt: 'What is the writer\'s final recommendation?' },
    ],
    modelAnswer:
      'The writer argues that happiness is not fixed by genetics alone — 40 per cent is influenced by daily habits and thinking patterns. Research shows that writing down three things to be grateful for each evening measurably reduces anxiety and improves life satisfaction. A 75-year Harvard study found that people with high-quality relationships at 50 were the healthiest at 80. The writer concludes that rather than pursuing happiness directly, building gratitude habits, investing in relationships, and finding meaning are the most reliable paths to a worthwhile life.',
  },
  productionTask: {
    instruction:
      'Write a response of 150–180 words to the following question: "Which idea from the article do you find most convincing, and why? Connect it to your own experience or observations." You must: (1) Identify and explain the idea, (2) Evaluate it using your own experience, (3) Use at least one Present Perfect Continuous sentence ("I have been noticing / I have been finding"), (4) Use at least one discourse marker from B1 units (although, that said, despite, on the one hand).',
    minimumWords: 150,
    requiredStructures: [
      'Identification of an idea from the text',
      'Personal evaluation with experience',
      'Present Perfect Continuous',
      'At least one B1 discourse marker',
    ],
  },
  readingPurpose:
    'Read to understand the writer\'s argument about what makes people happy, evaluate the evidence they use, and apply the ideas to your own experience.',
});

const B1_LISTENING_008 = createListeningLesson({
  id: 'B1-LISTENING-008',
  level: 'B1',
  order: 8,
  title: 'Listening checkpoint: A conversation about life goals and fulfilment',
  estimatedMinutes: 45,
  status: 'ready',
  tags: ['b1-8', 'reviews', 'listening', 'checkpoint', 'goals', 'wellbeing', 'deep-approved-target'],
  prerequisites: [
    'B1-LISTENING-001', 'B1-LISTENING-002', 'B1-LISTENING-003',
    'B1-LISTENING-004', 'B1-LISTENING-005', 'B1-LISTENING-006', 'B1-LISTENING-007',
  ],
  objectives: [
    'Follow a natural conversation between two speakers at B1 speaking pace',
    'Identify speaker opinions, attitudes and levels of certainty',
    'Understand key vocabulary in context without prior preparation',
    'Produce a structured spoken or written response building on the listening input',
  ],
  listeningPreparation: [
    {
      question: 'Think about your own life goals. Are they more about achievement (career, money, status) or experience (relationships, travel, personal growth)? Why?',
    },
    {
      question: 'What does "fulfilment" mean to you? Is it different from "happiness"? How?',
    },
  ],
  keyWordsToHear: [
    'fulfilment', 'milestone', 'compare yourself', 'sense of purpose', 'meaningful',
    'competitive', 'stepping back', 'perspective', 'come to terms with', 'overwhelmed',
  ],
  transcript: [
    'HOST: Welcome back. Today I\'m speaking with two people who\'ve been reflecting on what it really means to live a fulfilling life. Elena, you\'re 34, you have a successful career in finance — but you told me recently that you\'ve been questioning whether success is the same thing as fulfilment. Tell me more.',
    'ELENA: Right. So I\'ve been working in this field for ten years, and from the outside, I\'ve reached all the milestones — promotion, good salary, flat in the city. But there\'s this persistent feeling that something is missing. I think I\'ve been chasing goals without stopping to ask whether they\'re actually my goals.',
    'HOST: Interesting. Marcus, you left a corporate career five years ago to become a secondary school teacher. You\'ve been through a very different journey. What have you learnt about fulfilment?',
    'MARCUS: Well, the honest answer is that if I hadn\'t made that leap, I would still be successful on paper but empty inside. The first year of teaching was honestly the hardest thing I\'ve ever done. I hadn\'t been prepared for how emotionally demanding it would be.',
    'HOST: Elena, does Marcus\'s experience resonate with you?',
    'ELENA: It does, actually. I can see how the thing we\'re told will make us happy — status, money — can become a trap. That said, I\'m not ready to throw everything away. I think the question is whether you can find meaning within your current path, rather than assuming you need to escape.',
    'MARCUS: That\'s a fair point. I\'d argue that the two things — achievement and meaning — don\'t have to be opposites. But I do think most of us have been conditioned since childhood to measure our worth by external markers. And that takes a long time to unlearn.',
    'HOST: Elena, how have you been dealing with that feeling of something missing?',
    'ELENA: Honestly? I\'ve been trying to step back and look at the bigger picture. I\'ve been volunteering one evening a week at a community library — just reading to kids. It sounds small, but that one hour does more for my sense of purpose than a full week of spreadsheets.',
    'MARCUS: That\'s exactly it. Research suggests — and this connects to what we were saying about the reading earlier — that contribution and connection consistently predict wellbeing more reliably than income or status. You can\'t buy a sense of purpose.',
    'HOST: So where does that leave us? Can we actually learn to redefine what success means to us?',
    'ELENA: I think it requires stepping back regularly. Not just when you\'re burnt out — but as a habit. Asking: am I moving towards something I actually value, or just away from things I fear?',
    'MARCUS: And being willing to come to terms with the fact that your path might look different from your peers\'. That\'s probably the hardest part. We live in a very competitive, comparative culture.',
    'HOST: A really honest conversation. Thank you both. One final question — if you could give one piece of advice to someone just starting out, what would it be?',
    'ELENA: Don\'t confuse the map with the territory. The goals society gives you are a map — they\'re not the destination.',
    'MARCUS: And if I had understood earlier that comparison is the thief of joy, I would have wasted a lot less energy on other people\'s timelines.',
  ],
  comprehensionQuestions: [
    {
      question: 'What does Elena say she feels despite reaching her career milestones?',
      type: 'detail',
      answer: 'She feels like something is missing — she\'s been chasing goals without asking if they\'re actually her goals.',
    },
    {
      question: 'Why does Marcus say his first year of teaching was hard?',
      type: 'detail',
      answer: 'He hadn\'t been prepared for how emotionally demanding it would be.',
    },
    {
      question: 'How are Elena and Marcus\'s views on achievement and meaning different? How are they similar?',
      type: 'comparison',
      answer: 'Marcus took a radical step (career change); Elena wants to find meaning within her current path. Both agree that achievement and meaning don\'t have to be opposites, and that external markers of success can become a trap.',
    },
    {
      question: 'What has Elena started doing that gives her a sense of purpose?',
      type: 'detail',
      answer: 'Volunteering one evening a week at a community library, reading to children.',
    },
    {
      question: 'What does Marcus mean by "comparison is the thief of joy"? How does this connect to the article you read earlier?',
      type: 'inference and connection',
      answer: 'Comparing yourself to others destroys your own happiness. This connects to the reading\'s point about cultures that prioritise personal happiness as a goal — and the pursuit of status — tending to report higher loneliness. Both suggest external comparison and goal-chasing undermine wellbeing.',
    },
  ],
  vocabularyTasks: [
    {
      instruction: 'Match each phrase from the conversation to its meaning.',
      items: [
        { phrase: 'come to terms with', options: ['to celebrate', 'to accept something difficult', 'to argue against'], answer: 'to accept something difficult' },
        { phrase: 'step back', options: ['to quit your job', 'to gain distance and perspective', 'to move physically backwards'], answer: 'to gain distance and perspective' },
        { phrase: 'a sense of purpose', options: ['a feeling of ambition', 'a clear feeling that what you do matters', 'a competitive spirit'], answer: 'a clear feeling that what you do matters' },
      ],
    },
    {
      instruction: 'Find examples of mixed conditionals in the conversation. Write them out and identify: (a) the past condition, (b) the present or past result.',
      items: [
        {
          example: 'If I hadn\'t made that leap, I would still be successful on paper but empty inside.',
          condition: 'Past — didn\'t leave the corporate job',
          result: 'Present — would still be empty inside (ongoing state)',
          type: 'Past condition → present result (mixed)',
        },
        {
          example: 'If I had understood earlier that comparison is the thief of joy, I would have wasted a lot less energy.',
          condition: 'Past — didn\'t understand early enough',
          result: 'Past — wasted energy (already happened)',
          type: 'Pure 3rd conditional — both past',
        },
      ],
    },
    {
      instruction: 'Find three examples of Present Perfect Continuous in the conversation. What is the function of each one?',
      items: [
        { example: 'I\'ve been reflecting on what it really means to live a fulfilling life.', function: 'Ongoing process up to now' },
        { example: 'I\'ve been chasing goals without stopping to ask…', function: 'Habitual past action, still relevant' },
        { example: 'I\'ve been trying to step back and look at the bigger picture.', function: 'Ongoing recent effort' },
      ],
    },
  ],
  shadowingTasks: [
    {
      instruction: 'Shadow Elena\'s first turn. Focus on the natural rhythm of speech — notice how "I\'ve reached all the milestones" is chunked: "I\'ve reached / all the milestones / promotion / good salary / flat in the city." Pause slightly between each chunk.',
      target: 'So I\'ve been working in this field for ten years, and from the outside, I\'ve reached all the milestones — promotion, good salary, flat in the city. But there\'s this persistent feeling that something is missing.',
    },
    {
      instruction: 'Shadow Marcus\'s mixed conditional. Pay attention to the stress pattern: "if I HADn\'t made that LEAP, I would STILL be successful on PAPER but EMPTY inside." The stress falls on the key content words.',
      target: 'If I hadn\'t made that leap, I would still be successful on paper but empty inside.',
    },
    {
      instruction: 'Shadow Elena\'s final piece of advice. Notice the metaphor "the map with the territory" and how she uses a pause before "they\'re not the destination."',
      target: 'Don\'t confuse the map with the territory. The goals society gives you are a map — they\'re not the destination.',
    },
  ],
  oralProduction: {
    instruction:
      'Record or deliver a 90–120 second response to the following: "Which speaker — Elena or Marcus — do you find more convincing, and why? What has their conversation made you think about your own goals?" Your response must include: (1) Your view on which speaker makes the stronger argument, (2) A personal reflection using Present Perfect Continuous ("I\'ve been thinking / noticing / finding"), (3) At least one mixed conditional, (4) One B1 discourse marker or opinion phrase.',
    minimumTime: '90 seconds',
    requiredFeatures: [
      'Stated preference + justification',
      'Present Perfect Continuous for personal reflection',
      'Mixed conditional',
      'B1 discourse marker or opinion phrase',
    ],
  },
  listeningPreparation: [
    {
      question: 'Think about your own life goals. Are they more about achievement (career, money, status) or experience (relationships, travel, personal growth)? Why?',
    },
    {
      question: 'What does "fulfilment" mean to you? Is it different from "happiness"? How?',
    },
  ],
});

const B1_VOCABULARY_016 = createVocabularyLesson({
  id: 'B1-VOCABULARY-016',
  level: 'B1',
  order: 16,
  title: 'Academic and formal vocabulary for B1 completion',
  estimatedMinutes: 40,
  status: 'ready',
  tags: ['b1-8', 'reviews', 'vocabulary', 'academic', 'formal', 'deep-approved-target'],
  prerequisites: ['B1-VOCABULARY-015'],
  objectives: [
    'Use formal and academic vocabulary accurately at B1 level',
    'Distinguish formal from informal register in spoken and written production',
    'Apply academic vocabulary in both written argument and spoken discussion',
    'Prepare for B2 academic and professional language with strong B1 foundations',
  ],
  topicContext:
    'At B1 level, you begin to use language that is appropriate for academic writing, formal discussion, and professional communication. This lesson introduces 12 high-value formal and academic words that appear frequently in B1+ reading, listening and writing tasks.',
  essentialWords: [
    {
      word: 'significant',
      definition: 'important and worthy of notice; having a noticeable effect',
      example: 'There has been a significant increase in remote working since 2020.',
      register: 'formal/academic — prefer over "big" or "important" in written work',
      collocation: 'significant improvement, significant difference, significant impact',
    },
    {
      word: 'evidence',
      definition: 'facts or information that help prove something is true',
      example: 'The evidence suggests that daily exercise improves mood and concentration.',
      register: 'academic — replaces "proof" in most academic contexts',
      collocation: 'strong evidence, growing evidence, evidence suggests, based on the evidence',
    },
    {
      word: 'impact',
      definition: 'the strong effect or influence something has on someone or something',
      example: 'Climate change has had a devastating impact on coastal communities.',
      register: 'formal — replaces "effect" when the effect is strong',
      collocation: 'have an impact on, significant impact, long-term impact, measure the impact',
    },
    {
      word: 'approach',
      definition: 'a way of thinking about or dealing with something',
      example: 'A more balanced approach to work and rest leads to better long-term results.',
      register: 'neutral/academic — useful in discussion and writing',
      collocation: 'take an approach, a different approach, the best approach, approach to',
    },
    {
      word: 'factor',
      definition: 'one of the elements that contributes to a result',
      example: 'Motivation is a key factor in language learning success.',
      register: 'academic/formal — replaces "reason" or "thing" in formal writing',
      collocation: 'key factor, contributing factor, main factor, factor in',
    },
    {
      word: 'indicate',
      definition: 'to show, suggest or point to something',
      example: 'Research indicates that sleep quality affects cognitive performance.',
      register: 'academic — more objective than "show" in formal contexts',
      collocation: 'research/evidence/data indicates, the results indicate, indicate that',
    },
    {
      word: 'establish',
      definition: 'to set up or prove the existence of something firmly',
      example: 'It has been established that regular exercise benefits mental health.',
      register: 'formal/academic — used in passive for objective tone',
      collocation: 'establish a fact, establish a link, it has been established that',
    },
    {
      word: 'whereas',
      definition: 'used to introduce a contrast between two ideas',
      example: 'Whereas some studies found a positive link, others found no effect at all.',
      register: 'formal — replaces "but" or "while" in formal writing',
      collocation: 'whereas + subject + verb (full clause each side)',
    },
    {
      word: 'nevertheless',
      definition: 'in spite of what has just been said; however, despite that',
      example: 'The data was incomplete. Nevertheless, the researchers drew cautious conclusions.',
      register: 'formal — stronger/more academic than "but" or "however" when sentence-initial',
      collocation: 'Nevertheless, + sentence (at the start of a new sentence)',
    },
    {
      word: 'argue',
      definition: 'to give reasons or evidence for a viewpoint',
      example: 'In her article, she argues that technology has widened social inequality.',
      register: 'academic — neutral, objective — replaces "think/believe" in formal contexts',
      collocation: 'argue that, one could argue, it could be argued that, I would argue',
    },
    {
      word: 'consistent',
      definition: 'always the same; in agreement with something',
      example: 'The results were consistent across all three studies.',
      register: 'academic/formal',
      collocation: 'consistent results, consistent with, remain consistent, consistent approach',
    },
    {
      word: 'sufficient',
      definition: 'enough for what is needed',
      example: 'There is sufficient evidence to support the claim.',
      register: 'formal — replaces "enough" in written academic contexts',
      collocation: 'sufficient evidence, sufficient time, sufficient reason',
    },
  ],
  chunks: [
    {
      chunk: 'it could be argued that',
      example: 'It could be argued that the benefits of technology outweigh the risks.',
      use: 'Introducing a view without fully committing — hedging in academic writing',
    },
    {
      chunk: 'based on the evidence',
      example: 'Based on the evidence, a more structured approach seems preferable.',
      use: 'Grounding a conclusion in data rather than personal opinion',
    },
    {
      chunk: 'in contrast to',
      example: 'In contrast to earlier studies, this research found no significant difference.',
      use: 'Formal comparison — replaces "but" in academic writing',
    },
    {
      chunk: 'to a certain extent',
      example: 'To a certain extent, the approach has been successful.',
      use: 'Hedging — qualifying a claim to avoid absolutism. Key at B1+.',
    },
    {
      chunk: 'there is growing evidence that',
      example: 'There is growing evidence that screen time affects children\'s sleep patterns.',
      use: 'Academic opener for an evidence-based claim',
    },
    {
      chunk: 'plays a key role in',
      example: 'Motivation plays a key role in language learning.',
      use: 'Formal collocation for expressing importance',
    },
  ],
  dangerousConfusions: [
    {
      pair: ['significant (adjective)', 'significantly (adverb)'],
      explanation:
        '"Significant" modifies nouns: "a significant improvement." "Significantly" modifies verbs and adjectives: "Scores improved significantly." Common error: "Results were significant improved" — should be "significantly improved".',
      memoryTip: 'Noun → significant. Verb/adjective → significantly.',
    },
    {
      pair: ['whereas', 'while'],
      explanation:
        'Both introduce contrast. "Whereas" is more formal and strongly contrastive. "While" can also mean "at the same time" (temporal), which creates ambiguity. In academic writing, prefer "whereas" for contrast. Example: "Whereas urban areas benefit, rural areas are left behind."',
      memoryTip: 'Whereas = strong formal contrast. While = contrast OR time (ambiguous).',
    },
    {
      pair: ['argue', 'discuss'],
      explanation:
        '"Argue" means to present a clear position with reasons. "Discuss" means to explore multiple sides without necessarily taking one. "I argue that X is better" = I take a position. "I discuss the advantages and disadvantages" = balanced exploration. Many students write "I will discuss that X is better" — should be "I will argue that".',
      memoryTip: 'Argue = take a side. Discuss = explore both sides.',
    },
  ],
  miniDialogues: [
    {
      title: 'Using academic language in discussion',
      dialogue: [
        { speaker: 'Priya', line: 'I\'ve been reading about the link between exercise and mental health. There\'s growing evidence that even 20 minutes a day has a significant impact on mood.' },
        { speaker: 'Leo', line: 'That\'s consistent with what I\'ve seen too. It could be argued that the approach most people take — going to the gym intensively for a few weeks then stopping — is less effective than daily moderate exercise.' },
        { speaker: 'Priya', line: 'Whereas some people argue that intense exercise is better, the evidence indicates that consistency is the key factor.' },
        { speaker: 'Leo', line: 'Right. Based on the evidence, I would argue that establishing a daily habit plays a key role in long-term wellbeing — more so than the intensity of any one session.' },
        { speaker: 'Priya', line: 'Nevertheless, it\'s important to acknowledge that different approaches work for different people. To a certain extent, it depends on individual factors like lifestyle and personality.' },
        { speaker: 'Leo', line: 'Absolutely. Sufficient evidence exists to recommend daily movement — but not to prescribe a single method for everyone.' },
      ],
      note: 'All 12 academic words and at least 4 chunks appear naturally in this dialogue.',
    },
  ],
  recognitionPractice: [
    {
      instruction: 'Replace the underlined informal word with a more formal/academic alternative from this lesson.',
      items: [
        { original: 'There was a big difference between the two groups.', target: 'big', answer: 'significant' },
        { original: 'The data shows that sleep is important for concentration.', target: 'shows', answer: 'indicates' },
        { original: 'Some people think technology creates inequality, but others disagree.', target: 'but', answer: 'whereas' },
        { original: 'She proved that there is a link between diet and cognitive performance.', target: 'proved', answer: 'established' },
      ],
    },
    {
      instruction: 'Fill in the blank with the correct word: significant/significantly, argue/discuss, whereas/while.',
      items: [
        { prompt: 'Test scores improved ___ after the intervention.', answer: 'significantly' },
        { prompt: 'In her essay, she ___ that digital literacy should be taught in primary school.', answer: 'argues' },
        { prompt: '___ urban areas saw clear improvements, rural areas showed little change.', answer: 'Whereas' },
      ],
    },
  ],
  usagePractice: [
    {
      instruction: 'Upgrade these informal sentences to formal/academic style using vocabulary from this lesson.',
      items: [
        {
          informal: 'I think social media is bad for young people because of a lot of reasons.',
          formal: 'I would argue that social media has a negative impact on young people due to several key factors.',
        },
        {
          informal: 'There\'s a lot of proof that exercise helps your mood.',
          formal: 'There is growing evidence that regular exercise has a significant effect on mood.',
        },
        {
          informal: 'Some people say money is important, but others think experiences matter more.',
          formal: 'Whereas some argue that financial security is the key factor in wellbeing, others maintain that meaningful experiences play a more significant role.',
        },
      ],
    },
  ],
  productionTasks: [
    {
      title: 'Academic writing upgrade',
      instruction:
        'Take your B1 writing checkpoint essay (B1-WRITING-008) and revise it to incorporate at least 6 words or phrases from this lesson. You should replace informal language with formal equivalents and add at least one new hedging phrase. Write a note explaining what you changed and why.',
      minimumChanges: 6,
    },
    {
      title: 'Formal spoken discussion',
      instruction:
        'Discuss with your teacher: "What is the most important factor in learning a language successfully?" Use at least 4 academic words from this lesson in your response. Try to use "it could be argued that", "based on the evidence" and "to a certain extent" naturally.',
      targetPhrases: ['it could be argued that', 'based on the evidence', 'to a certain extent', 'plays a key role in'],
    },
  ],
    recognitionPractice: [{ question: 'Academic and formal vocabulary for B1 completion — qual vocabulário desta aula significa "important and worthy of notice; having a noticeable effect"?', options: ['significant', 'evidence', 'impact'], answer: 'significant', explanation: 'significant = important and worthy of notice; having a noticeable effect; vocabulário trabalhado nesta aula.' }, { question: 'Academic and formal vocabulary for B1 completion — qual opção combina com "significant"?', options: ['important and worthy of notice; having a noticeable effect', 'facts or information that help prove something is true', 'the strong effect or influence something has on someone or something'], answer: 'important and worthy of notice; having a noticeable effect', explanation: 'significant significa important and worthy of notice; having a noticeable effect no contexto desta aula.' }],
});

export const B1_DEEP_REVIEWS_CHECKPOINTS_PART2 = Object.freeze([
  B1_READING_008,
  B1_LISTENING_008,
  B1_VOCABULARY_016,
]);

export const B1_DEEP_REVIEWS_CHECKPOINTS_PART2_BY_PILLAR = Object.freeze({
  grammar: Object.freeze([]),
  vocabulary: Object.freeze([B1_VOCABULARY_016]),
  reading: Object.freeze([B1_READING_008]),
  listening: Object.freeze([B1_LISTENING_008]),
  speaking: Object.freeze([]),
  writing: Object.freeze([]),
  checkpoint: Object.freeze([]),
});
