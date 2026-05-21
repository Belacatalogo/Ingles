import { createReadingLesson, createListeningLesson, createSpeakingLesson, createWritingLesson } from '../../../schemas/index.js';

const level = 'B2';
const status = 'ready';
const common = { level, status, estimatedMinutes: 65, tags: ['b2-5', 'culture', 'media', 'society', 'deep-approved-target'] };

function task(instruction, note = '', expected = '') { return { instruction, note, expected }; }

export const B2_DEEP_CULTURE_MEDIA_PART2 = Object.freeze([

  // ─── READING-006: Media analysis article ─────────────────────────────────────
  createReadingLesson({
    ...common,
    id: 'B2-READING-006',
    order: 106,
    title: 'Reading: "Who Controls the Narrative?" — media literacy article',
    objectives: [
      'Analyse how language choices in journalism construct a particular point of view.',
      'Identify participle clauses and relative clauses used to compress information.',
      'Evaluate the author\'s implicit argument and distinguish facts from opinion.',
      'Practise inference and critical reading at B2+ level.',
    ],
    readingStrategy: [
      task('Before reading: look at the title and predict who might control a news narrative — journalists, editors, owners, algorithms or readers. Write one hypothesis before you start.', 'Prediction helps you read for argument, not just information.'),
      task('First read (gist): read the article quickly and identify the author\'s central claim about media literacy in one sentence.', 'Do not stop for every example yet; trace the overall line of argument first.'),
      task('Second read (scanning/detail): find the two contrasting headlines, then mark how each framing changes the emotional effect of the same event.', 'This trains you to connect language choice with point of view.'),
      task('Evidence task: choose one sentence that shows the author is not simply anti-media. Copy it before answering the inference questions.', 'Your answer must be grounded in textual evidence, especially the concession about investigative journalism.'),
    ],
    readingText: {
      title: 'Who Controls the Narrative?',
      subtitle: 'A media literacy perspective',
      body: `Every news story is, at its core, a choice. Editors decide which events are reported, which voices are heard, and — crucially — which framing shapes the reader's understanding. The term "narrative control" refers to this process by which information is selected, ordered and presented in a way that serves particular interests. Recognising this is not about cynicism; it is about media literacy.

Consider a recent example. When a major tech company announced a restructuring resulting in ten thousand job losses, headlines varied dramatically. One outlet ran: "Tech Giant Streamlines Operations for Future Growth." Another chose: "Ten Thousand Workers Lose Jobs as Tech Giant Cuts Costs." Both statements describe the same event. Yet the emotional and ideological implications are entirely different. The first emphasises progress; the second, human cost.

This divergence is not accidental. Often rooted in the commercial and political interests of media owners, editorial bias shapes everything from the choice of headline to the order of paragraphs. A study published by the Reuters Institute for the Study of Journalism found that stories featuring conflict and threat receive significantly higher engagement than those presenting nuanced analysis. Media organisations, dependent on advertising revenue tied to audience size, are therefore incentivised to amplify drama.

The rise of social media has intensified this dynamic. Platforms driven by algorithmic engagement reward content that provokes strong emotional reactions — outrage, fear, tribalism. Having spent years optimising for clicks rather than accuracy, many news feeds now function as echo chambers: spaces where users encounter only views confirming their existing beliefs. Research conducted at MIT found that false information spreads six times faster on Twitter (now X) than true information.

However, dismissing all media as inherently unreliable would itself be a form of distortion. Investigative journalism, frequently underfunded and under pressure, continues to expose corruption, hold institutions accountable, and give voice to marginalised communities. The challenge is not to abandon journalism, but to approach it critically — to ask not only what is being said, but what is being left unsaid, and why.

Media literacy, once considered a niche academic concern, is now recognised by educators and governments as a fundamental skill. Introduced into school curricula across several European countries, media literacy programmes teach students to identify bias, verify sources, distinguish advertising from editorial content, and evaluate the credibility of online information. The goal is not to breed distrust, but to cultivate informed, critical citizens capable of navigating an increasingly complex information landscape.`,
      wordCount: 390,
    },
    comprehensionQuestions: [
      {
        question: 'According to the article, what does "narrative control" mean?',
        type: 'open',
        guidance: 'Find the definition in paragraph 1.',
      },
      {
        question: 'Why do the two headlines in paragraph 2 produce different impressions, even though they describe the same event?',
        type: 'open',
        guidance: 'Think about word choice and framing.',
      },
      {
        question: 'What economic incentive does the article identify as a driver of sensationalist journalism?',
        type: 'open',
        guidance: 'Look at paragraph 3.',
      },
      {
        question: 'What is the author\'s position on journalism overall? Is it entirely negative?',
        type: 'inference',
        guidance: 'The author is nuanced — find the concession in paragraph 5.',
      },
      {
        question: 'Identify one participle clause in the article and explain its function.',
        type: 'language-focus',
        guidance: 'Look for -ing, -ed or "having + pp" at the start of a clause.',
      },
    ],
    grammarFocus: {
      title: 'Participle clauses in the text',
      items: [
        { example: 'Rooted in the commercial and political interests of media owners, editorial bias shapes everything…', note: '-ed participle clause (passive meaning, causal) = "Because it is rooted in..."' },
        { example: 'Having spent years optimising for clicks rather than accuracy, many news feeds…', note: '"Having + pp" = after having spent years... (action precedes main verb)' },
        { example: 'Introduced into school curricula across several European countries, media literacy programmes…', note: '-ed participle clause (passive) = "After they were introduced into..."' },
        { example: 'Frequently underfunded and under pressure, investigative journalism continues…', note: '-ed/adjective participle clause = concessive or causal meaning' },
      ],
    },
    discussionTasks: [
      task('Do you think the media in your country generally reports fairly? Give one example to support your view.'),
      task('The article says media literacy should be taught in schools. Do you agree? Why/why not?'),
      task('Can you think of a time when you noticed bias in a news story? What made you notice it?'),
    ],
    lessonRecap: 'You read a 390-word media literacy article and practised identifying bias, authorial position and participle clauses in authentic argumentative writing.',
    nextLessonBridge: 'Next, you will read a cultural commentary article that focuses on identity, representation and the politics of cultural appropriation.',
  }),

  // ─── READING-007: Cultural commentary ────────────────────────────────────────
  createReadingLesson({
    ...common,
    id: 'B2-READING-007',
    order: 107,
    title: 'Reading: "Whose Story Is It?" — identity, representation and cultural appropriation',
    objectives: [
      'Read and understand a complex cultural commentary at B2 level.',
      'Distinguish between the concepts of cultural exchange, cultural appreciation and cultural appropriation.',
      'Identify and interpret non-defining relative clauses used to add information.',
      'Evaluate different perspectives on a culturally sensitive issue.',
    ],
    readingStrategy: [
      task('Before reading: define the three ideas in your own words — cultural exchange, appreciation and appropriation. Do not worry if your definitions change after reading.', 'This gives you a purpose: test your initial definitions against the article.'),
      task('First read (gist): decide whether the writer treats the issue as simple or complex. Write the phrase or sentence that first signals this.', 'Gist here means identifying the author\'s stance, not collecting details.'),
      task('Second read (scanning/detail): underline the paragraph that explains power and context, then list the example used to illustrate asymmetry.', 'Scanning helps you find the evidence behind the abstract concept.'),
      task('Evidence task: before answering the questions, copy the three diagnostic questions the article uses to separate exchange from appropriation.', 'These questions are the evidence key for the detail and inference items.'),
    ],
    readingText: {
      title: 'Whose Story Is It?',
      subtitle: 'Representation, identity and the limits of cultural borrowing',
      body: `The debate around cultural appropriation — the adoption of elements from one culture by members of another, often more dominant, group — has grown increasingly prominent in recent years. Critics argue that when dominant cultures adopt aesthetic or spiritual elements from marginalised groups without acknowledgement or credit, they perpetuate historical patterns of exploitation. Supporters of a more liberal view contend that cultural exchange, which has always driven human creativity, cannot and should not be policed. The truth, as is often the case, is more complex than either extreme suggests.

At the centre of this debate is the question of context and power. A person from a historically colonised community wearing traditional dress is an act of cultural continuity. A member of the colonising culture wearing the same garment as a fashion accessory, without any understanding of its significance, may reproduce a dynamic of extraction — taking what is useful or visually appealing while discarding the history and suffering attached to it. This asymmetry, which many people dismiss as oversensitivity, is precisely what makes the conversation necessary.

Representation in media and the arts adds another layer. When characters from minority backgrounds, whose stories are rooted in specific cultural experiences, are played by actors who do not share those experiences, questions arise about authenticity and opportunity. The counterargument — that acting, by definition, involves portraying experiences other than your own — is not without merit. Yet at a time when actors from underrepresented communities report persistent barriers to employment, the decision to cast outside those communities warrants scrutiny.

Cultural exchange, by contrast, involves mutual respect, acknowledgement and benefit. When a Western musician studies under a master of Indian classical music, crediting their influences and contributing to the living tradition, this is enrichment, not appropriation. The distinction lies not in the act of borrowing itself, but in the relationship: Is there consent? Is there credit? Is there care?

These are not abstract philosophical questions. They shape what stories get told, whose voices are amplified, and who benefits economically from cultural production. Media literacy in the 21st century means engaging with these questions — not to arrive at rigid rules, but to develop the sensitivity and critical awareness that a diverse, interconnected world demands.`,
      wordCount: 360,
    },
    comprehensionQuestions: [
      {
        question: 'In your own words, explain the difference the article draws between "cultural appropriation" and "cultural exchange".',
        type: 'open',
      },
      {
        question: 'What does the author mean by "asymmetry of power" in paragraph 2?',
        type: 'inference',
      },
      {
        question: 'The article presents two sides on representation in the arts. Summarise each side in one sentence.',
        type: 'open',
      },
      {
        question: 'What three questions does the author suggest in paragraph 4 to distinguish exchange from appropriation?',
        type: 'detail',
      },
      {
        question: 'Find two non-defining relative clauses in the text. What information do they add?',
        type: 'language-focus',
        guidance: 'Non-defining relative clauses use commas and add extra, non-essential information.',
      },
    ],
    grammarFocus: {
      title: 'Non-defining relative clauses in the text',
      items: [
        { example: 'the adoption of elements from one culture by members of another, often more dominant, group — has grown more prominent', note: 'Non-defining relative clause gives definition; commas indicate it is supplementary.' },
        { example: 'This asymmetry, which many people dismiss as oversensitivity, is precisely what makes the conversation necessary.', note: '"which" non-defining clause adds the author\'s ironic comment on common dismissal.' },
        { example: 'characters from minority backgrounds, whose stories are rooted in specific cultural experiences, are played by actors…', note: '"whose" non-defining clause specifies which characters are being discussed.' },
      ],
    },
    discussionTasks: [
      task('Can you think of an example from your own culture where borrowing from another culture sparked debate? What happened?'),
      task('Do you think the three questions the author asks (consent, credit, care) are enough to distinguish appreciation from appropriation?'),
      task('Is media literacy about learning rules or developing judgment? What is the difference?'),
    ],
    lessonRecap: 'You read a nuanced 360-word cultural commentary and practised identifying non-defining relative clauses and evaluating complex multi-perspective arguments.',
    nextLessonBridge: 'In the next lesson you will listen to a radio discussion on social media, identity and representation — practising the listening skills needed to follow rapid, natural multi-speaker debate.',
  }),

  // ─── LISTENING-005: Radio/podcast discussion on social media and identity ─────
  createListeningLesson({
    ...common,
    id: 'B2-LISTENING-005',
    order: 205,
    title: 'Listening: "The Identity Feed" — radio discussion on social media and self-representation',
    objectives: [
      'Follow a fast-paced multi-speaker discussion on social media and identity.',
      'Identify main arguments, concessions and examples used by each speaker.',
      'Infer attitude and degree of certainty from tone, hedging and discourse markers.',
      'Extract specific information to complete a speaker-viewpoint table.',
    ],
    teacherOpening: 'You are about to listen to a radio discussion programme called "The Identity Feed." The host, Rosa, is joined by three guests: Kwame, a digital sociologist; Fatima, a content creator with a large online following; and Tom, a journalist covering technology. The discussion focuses on how social media shapes — and distorts — how we present ourselves to the world.',
    audioMetadata: {
      format: 'multi-speaker radio discussion',
      duration: '5 minutes (approx.)',
      accents: ['British RP (Rosa, Tom)', 'Ghanaian-British (Kwame)', 'British-Pakistani (Fatima)'],
      speed: 'natural — fast in places, overlapping in turns 11–12',
    },
    transcript: [
      { speaker: 'ROSA', turn: 1, text: "Good morning and welcome to The Identity Feed. Today we're asking a deceptively simple question: when we go online, are we showing our real selves, or are we performing a version of ourselves designed for an audience? I'm joined by Kwame, Fatima and Tom. Kwame, let's start with you — as a sociologist, what does the research tell us?" },
      { speaker: 'KWAME', turn: 2, text: "Well Rosa, the research is quite consistent on this. Erving Goffman's concept of 'impression management' — developed long before the internet, incidentally — describes how we all perform different versions of ourselves in different social contexts. Social media has amplified this enormously. Platforms reward consistency, attractiveness and relatability. The result is what I'd call a 'curated self' — a highlight reel rather than a full documentary." },
      { speaker: 'ROSA', turn: 3, text: "Fatima, you are, in a sense, a professional curator. You have half a million followers. Does that feel like a performance to you?" },
      { speaker: 'FATIMA', turn: 4, text: "I think 'performance' has negative connotations that I'd push back on slightly. Yes, I choose what to share. But so does everyone — in a job interview, at a family dinner, meeting a friend's parents. Curation isn't necessarily deception. What concerns me more is the pressure, particularly on young women, to maintain an impossibly polished image. I've had to consciously work against that in my own content." },
      { speaker: 'TOM', turn: 5, text: "I think there's a distinction worth making here between individual curation, which Fatima is describing, and systemic distortion. Algorithms don't just amplify what we share — they amplify certain types of content. Emotionally charged, polarising, identity-affirming content performs better. So it's not just that we're performing — the performance is being shaped by an invisible director." },
      { speaker: 'KWAME', turn: 6, text: "Exactly. And the implications for cultural identity are significant. If algorithms consistently reward particular aesthetics — which often reflect dominant cultural norms — then minority cultures are effectively penalised for existing on their own terms. That's not hypothetical; it's documented. Black creators, for instance, have repeatedly reported that their content receives less organic reach than equivalent content from white creators." },
      { speaker: 'ROSA', turn: 7, text: "That's a serious charge. Fatima, as someone who occupies multiple identities online — South Asian, British, Muslim, content creator — how do you navigate that?" },
      { speaker: 'FATIMA', turn: 8, text: "Carefully. And sometimes with frustration. There are elements of my cultural and religious identity that I am very deliberate about sharing — not because I'm hiding them, but because I know the platform will contextualise them in ways I can't fully control. That's the part people don't talk about enough: you're not just performing for your audience, you're performing within a system that has its own agenda." },
      { speaker: 'TOM', turn: 9, text: "Which brings us back to media literacy, frankly. I think the conversation has moved on from 'is this content real?' to something harder: 'what is this system doing to all of us collectively?' Social media didn't invent identity anxiety. But it has given it an infrastructure." },
      { speaker: 'ROSA', turn: 10, text: "Kwame, final thought — is there a way out of this, or are we just going to have to learn to live with it?" },
      { speaker: 'KWAME', turn: 11, text: "Both, I'd argue. We need platform regulation — transparency about how algorithms work, accountability for discriminatory amplification patterns. But we also need individual and collective media literacy. Understanding that your feed is not a mirror — it's a funhouse mirror — is the beginning of a more honest relationship with the technology we use." },
      { speaker: 'FATIMA', turn: 12, text: "And I'd add: follow people who challenge your default settings. Not just to be 'balanced' in some abstract sense, but because the best thing social media can do — when it works — is expose you to lives and perspectives genuinely different from your own." },
      { speaker: 'ROSA', turn: 13, text: "Kwame, Fatima, Tom — thank you. After the break: is digital detox a privilege, or is it something everyone can access? We'll be right back." },
    ],
    listeningTasks: [
      {
        stage: 'BEFORE YOU LISTEN',
        tasks: [
          task('Look at the question in the introduction: "Are we showing our real selves, or performing a version of ourselves?" What do YOU think before listening?', 'Note your view in one sentence.'),
        ],
      },
      {
        stage: 'FIRST LISTEN — main ideas',
        tasks: [
          task('Who introduces the concept of "impression management"? Who is it attributed to?'),
          task('Match each speaker to their main concern: (a) algorithmic bias against minority content; (b) pressure on women to be "polished"; (c) the system shaping the performance.', '', 'Kwame → (a); Fatima → (b); Tom → (c)'),
        ],
      },
      {
        stage: 'SECOND LISTEN — detail and inference',
        tasks: [
          task('What does Fatima say she has "consciously worked against" in her own content?'),
          task('Kwame says algorithms reward content that is "emotionally charged, polarising, identity-affirming." According to Tom, who says this?', 'Listen carefully — who says what.'),
          task('What does Kwame mean by calling a social media feed a "funhouse mirror" rather than a mirror?'),
          task('Fatima uses the word "carefully" when asked how she navigates her multiple identities. What does this single-word answer imply about her experience?', 'Inference — think about tone and what follows.'),
        ],
      },
      {
        stage: 'LANGUAGE FOCUS',
        tasks: [
          task('Find two examples where a speaker uses hedging language (e.g. "I\'d argue", "arguably", "to some extent"). What effect does this have?'),
          task('Tom says "Social media didn\'t invent identity anxiety. But it has given it an infrastructure." What grammatical contrast is he using, and why is it effective?'),
        ],
      },
    ],
    discussionPrompts: [
      'Do you think you present a "curated self" online? How is it different from your offline self?',
      'Kwame calls for platform regulation. Do you think that is realistic? What problems might it cause?',
      'Fatima says the best thing social media can do is "expose you to lives and perspectives different from your own." Do you agree this actually happens?',
    ],
    lessonRecap: 'You listened to a 13-turn radio discussion and practised following rapid multi-speaker debate on social media, identity and algorithmic bias — with tasks on main ideas, detail, inference and language.',
    nextLessonBridge: 'Next: a B2 speaking task where you deliver a structured 2-minute position on a media or culture topic, using participle clauses, relative clauses and qualification language naturally.',
  }),

  // ─── SPEAKING-007: Structured position on culture/media ──────────────────────
  createSpeakingLesson({
    ...common,
    id: 'B2-SPEAKING-007',
    order: 307,
    title: 'Speaking: "My Take" — delivering a structured position on culture or media',
    objectives: [
      'Deliver a 2-minute structured spoken position on a culture or media topic.',
      'Use participle clauses, relative clauses and qualification language naturally in speech.',
      'Demonstrate concession-and-response structure in spoken argument.',
      'Show awareness of multiple perspectives while maintaining a clear personal stance.',
    ],
    teacherOpening: 'The topics in this lesson come directly from what you have read and listened to in B2.5: media bias, cultural identity, social media and representation. A B2 speaker can hold a position, qualify it, concede a counter-argument and return to their view — all in two minutes. Today you practise exactly that structure.',
    pronunciationFocus: {
      title: 'Pronunciation & shadowing',
      tips: [
        'Shadow: "Having said that, I would still maintain that the benefits outweigh the drawbacks." Stress mainTAIN and OUTweigh. Practise "having said that" as one smooth chunk.',
        '"The question of whether X constitutes Y is..." — stress CONstitutes with even syllable weight. Pause after "whether" to frame the embedded question clearly.',
        '"One might argue that..." — use this hedge with confident intonation; stress ARgue, not "might".',
        '"I would push back on the assumption that..." — practise the strategic pause after "push back" before delivering the target of the challenge.',
      ],
    },
    warmUp: [
      task('Think about one of the following three topics. Spend 60 seconds forming a view before you speak: (1) Is social media harmful to cultural identity? (2) Should journalists be required to disclose their sources of funding? (3) Does media literacy make people more cynical or more informed?'),
    ],
    guidedPractice: [
      {
        title: 'Structure: Position → Evidence → Concession → Restate',
        steps: [
          { step: 'POSITION (15 sec)', prompt: 'State your view clearly. "I would argue that..." / "It seems to me that..." / "In my view, the evidence suggests..."' },
          { step: 'EVIDENCE (30 sec)', prompt: 'Support with an example, fact or reasoning. "For instance, research has shown..." / "A clear case of this is..." / "Having read several accounts of this, I think..."' },
          { step: 'CONCESSION (20 sec)', prompt: 'Acknowledge the opposing view honestly. "That said, I recognise that..." / "Granted, there are situations where..." / "While it is true that..., I still believe..."' },
          { step: 'RESTATE (15 sec)', prompt: 'Bring back your position, perhaps more nuanced. "Nevertheless, the overall picture is one of..." / "On balance, I would maintain that..."' },
        ],
      },
      task('Choose your topic and speak for 2 minutes using the structure above. Record yourself.', 'Focus on using qualification language and at least one participle or relative clause.'),
    ],
    speakingChecklist: [
      'Clear position stated in the first 15 seconds.',
      'Evidence or example used to support the position.',
      'Genuine concession of the opposing view.',
      'Position restated at the end — possibly more nuanced.',
      'Qualification language used (arguably, to a certain extent, tend to).',
      'At least one participle or relative clause used naturally.',
      'Fluent and confident delivery — no long silences.',
    ],
    freeSpeaking: [
      { topic: 'Is cultural appropriation always harmful, or does it depend on context? Give your structured view in 2 minutes.' },
      { topic: 'Social media has made ordinary people into media producers. Is this a positive development? Structure your answer.' },
    ],
    lessonRecap: 'You delivered a structured 2-minute spoken position using the Position → Evidence → Concession → Restate framework, incorporating B2.5 grammar and vocabulary naturally.',
    nextLessonBridge: 'In the next lesson you will write a formal analytical paragraph on a media topic — applying participle clauses and qualifying language in written B2 production.',
  }),

  // ─── WRITING-006: Analytical paragraph on a media topic ──────────────────────
  createWritingLesson({
    ...common,
    id: 'B2-WRITING-006',
    order: 406,
    title: 'Writing: Analytical paragraph — media bias and narrative control',
    objectives: [
      'Write a formal analytical paragraph of 130–170 words on media bias.',
      'Use a participle clause at the opening to set context or cause.',
      'Incorporate at least one non-defining relative clause to add information.',
      'Apply qualification language (arguably, tend to, to a certain extent) appropriately.',
      'Maintain formal register throughout.',
    ],
    teacherOpening: 'An analytical paragraph at B2 level does three things: it makes a claim, supports it with evidence or reasoning, and qualifies or concedes where needed. The grammar structures you have practised in B2.5 — participle clauses, relative clauses, qualification language — are precisely the tools a formal analytical writer uses. Today you combine them.',
    writingModel: {
      title: 'Model paragraph: Media bias and the algorithm',
      text: `Driven by the need to maximise advertising revenue, mainstream news platforms increasingly favour content that provokes strong emotional reactions over content that offers nuanced analysis. This tendency, which researchers at the Reuters Institute have documented across multiple national contexts, arguably distorts public understanding of complex issues. A reader regularly exposed to sensationalised framing will tend to develop an oversimplified view of events — one that serves the platform's commercial interests rather than the public's informational needs. That said, it would be an overstatement to suggest that all mainstream journalism is unreliable. Investigative reporting, though underfunded in many markets, continues to perform a vital accountability function. On balance, the challenge is not to abandon mainstream media but to approach it with the critical awareness that the digital information landscape now demands.`,
      wordCount: 145,
    },
    grammarAnnotations: [
      { highlight: 'Driven by the need to maximise advertising revenue', label: 'Past participle clause — sets causal context at the opening.' },
      { highlight: 'which researchers at the Reuters Institute have documented across multiple national contexts', label: 'Non-defining relative clause — adds supporting evidence without a new sentence.' },
      { highlight: 'arguably distorts', label: 'Qualification adverb — hedges the claim appropriately.' },
      { highlight: 'will tend to develop', label: 'Qualification phrase — avoids absolute claim.' },
      { highlight: 'That said, it would be an overstatement to suggest', label: 'Concession structure — acknowledges counter-position before restating main view.' },
      { highlight: 'though underfunded in many markets', label: 'Non-defining participial insertion — adds nuance without a full clause.' },
    ],
    writingTasks: [
      {
        task: 'Write an analytical paragraph of 130–170 words on ONE of the following topics. Follow the structure: claim → evidence/reasoning → qualification/concession → restate.',
        options: [
          'Social media algorithms reinforce cultural stereotypes rather than promoting diversity.',
          'Media literacy is now as important as reading and writing in a modern education.',
          'Cultural representation in film and television has improved significantly, but not enough.',
        ],
      },
    ],
    writingChecklist: [
      'Between 130 and 170 words.',
      'Formal register — no contractions, no informal vocabulary.',
      'Opening participle clause (-ing, -ed or having + pp).',
      'At least one non-defining relative clause (with commas).',
      'Qualification language used at least once.',
      'Concession expressed before the conclusion.',
      'Clear analytical structure: claim → support → qualification → conclusion.',
    ],
    lessonRecap: 'You wrote a 130–170 word formal analytical paragraph using participle clauses, non-defining relative clauses and qualification language in a coherent argumentative structure.',
    nextLessonBridge: 'Final lesson of B2.5: a writing task on cultural identity that brings together everything from this module — grammar, vocabulary, and analytical writing at B2 level.',
  }),

  // ─── WRITING-007: Cultural identity analytical paragraph ─────────────────────
  createWritingLesson({
    ...common,
    id: 'B2-WRITING-007',
    order: 407,
    title: 'Writing: Analytical paragraph — cultural identity and representation',
    objectives: [
      'Write a 140–180 word formal paragraph on cultural identity or representation.',
      'Apply all B2.5 grammar: participle clauses, reported speech structure, relative clauses.',
      'Use B2.5 vocabulary (bias, heritage, identity, representation, diaspora, echo chamber).',
      'Demonstrate a nuanced, qualified analytical voice in formal writing.',
    ],
    teacherOpening: 'This is the capstone writing task for B2.5. You are expected to bring together everything from the module: participle clauses for concise formal openings, non-defining relative clauses for adding evidence, qualification language for intellectual honesty, and the B2.5 vocabulary set for precision. The topic is cultural identity and representation — issues you have read and spoken about throughout this module.',
    writingModel: {
      title: 'Model paragraph: Representation and cultural identity in media',
      text: `Rooted in decades of underrepresentation, the demand for authentic cultural portrayal in mainstream media has intensified considerably in recent years. Campaigns such as #OscarsSoWhite, which drew global attention to the systematic exclusion of non-white talent from major award ceremonies, helped shift the conversation from aspiration to accountability. Studies suggest that audiences from minority backgrounds tend to engage more deeply with stories in which they recognise their own experiences — a finding that challenges the long-held assumption that "universal" storytelling must default to dominant cultural perspectives. That said, representation alone does not guarantee quality or authenticity; having cast a diverse ensemble, a production still needs the cultural knowledge and creative leadership to portray those identities with depth. On balance, progress has been made, but the structural changes required — in commissioning, in leadership, in funding — remain incomplete. The question is no longer whether representation matters, but how quickly the industry is willing to act on what it already knows.`,
      wordCount: 165,
    },
    grammarAnnotations: [
      { highlight: 'Rooted in decades of underrepresentation', label: 'Past participle clause — causal, sets historical context at the opening.' },
      { highlight: 'which drew global attention to the systematic exclusion of non-white talent from major award ceremonies', label: 'Non-defining relative clause — adds factual context about the campaign.' },
      { highlight: 'tend to engage', label: 'Qualification — avoids absolute claim about audience behaviour.' },
      { highlight: 'having cast a diverse ensemble', label: '"Having + pp" participle clause — concedes a positive step before the counter-point.' },
      { highlight: 'On balance, progress has been made, but', label: 'Concession-and-restate structure — acknowledges progress while maintaining critical position.' },
    ],
    writingTasks: [
      {
        task: 'Write an analytical paragraph of 140–180 words on ONE of the following. Use at least: one participle clause opening, one non-defining relative clause, one piece of qualification language, and one concession structure.',
        options: [
          'Cultural heritage is more likely to be preserved when communities control their own narratives.',
          'The concept of a "national identity" is increasingly difficult to define in a globalised world.',
          'Diaspora communities face particular challenges in maintaining cultural identity across generations.',
        ],
      },
    ],
    writingChecklist: [
      'Between 140 and 180 words.',
      'Formal register throughout.',
      'Participle clause at the opening (-ed, -ing or having + pp).',
      'At least one non-defining relative clause with commas.',
      'Qualification language (arguably, tend to, to a certain extent, on balance, etc.).',
      'Concession before the conclusion (that said, while it is true that, granted, etc.).',
      'At least two vocabulary items from B2.5 (bias, heritage, representation, diaspora, echo chamber, etc.).',
      'Clear analytical structure throughout.',
    ],
    lessonRecap: 'You wrote a 140–180 word capstone analytical paragraph bringing together all B2.5 structures and vocabulary in formal written production.',
    nextLessonBridge: 'B2.5 is complete. You are now ready for B2.6 — Global Issues: academic vocabulary for global problems, complex argument, data interpretation and global discourse at full B2 level.',
  }),

]);

export const B2_DEEP_CULTURE_MEDIA_PART2_BY_PILLAR = Object.freeze({
  reading: B2_DEEP_CULTURE_MEDIA_PART2.filter(l => l.pillar === 'reading'),
  listening: B2_DEEP_CULTURE_MEDIA_PART2.filter(l => l.pillar === 'listening'),
  speaking: B2_DEEP_CULTURE_MEDIA_PART2.filter(l => l.pillar === 'speaking'),
  writing: B2_DEEP_CULTURE_MEDIA_PART2.filter(l => l.pillar === 'writing'),
});