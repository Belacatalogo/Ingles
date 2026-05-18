import { createReadingLesson, createListeningLesson, createWritingLesson } from '../../../schemas/index.js';

const level = 'B2';
const status = 'ready';
const common = { level, status, estimatedMinutes: 65, tags: ['b2-1', 'bridge', 'precision', 'argument', 'deep-approved-target'] };

function task(instruction, note = '', expected = '') { return { instruction, note, expected }; }

export const B2_DEEP_BRIDGE_PART2 = Object.freeze([

  // ─── READING-001: Should Cities Ban Private Cars? ─────────────────────────────
  createReadingLesson({
    ...common,
    id: 'B2-READING-001',
    order: 1,
    title: 'Should cities ban private cars? An opinion article',
    objectives: [
      'Identificar argumento principal, evidências, concessões e posição do autor em artigo de opinião.',
      'Ler para análise argumentativa — como o argumento é construído, não só o que diz.',
      'Reconhecer estrutura argumentativa: claim → evidence → concession → rebuttal → conclusion.',
      'Identificar e analisar recursos discursivos B2 em texto autêntico (cleft, inversion, discourse markers).',
      'Produzir resposta escrita de 80-100 palavras usando nevertheless, albeit e perspectiva pessoal.',
    ],
    readingPurpose: 'Read a formal opinion article for main argument, supporting evidence, concession structure and the author\'s stance. At B2, you read for how arguments are built, not just what they say.',
    preReadingVocabulary: [
      { word: 'congestion', definition: 'excessive traffic causing delays' },
      { word: 'pedestrianise', definition: 'convert a road into a pedestrian-only zone' },
      { word: 'emission', definition: 'gas or pollutant released into the atmosphere' },
      { word: 'infrastructure', definition: 'basic systems (roads, transport, buildings) supporting a city' },
      { word: 'viable', definition: 'capable of working or being used successfully' },
    ],
    readingStrategy: [
      'First read: identify the author\'s main claim and where it appears.',
      'Second read: identify the structure — claim, evidence, concession, rebuttal, conclusion.',
      'Look for discourse markers that signal argument turns: nevertheless, albeit, in contrast, not only.',
    ],
    mainText: `The Case for Car-Free City Centres

The suggestion that cities should ban private cars from their centres is no longer the preserve of radical environmentalists. It has become a mainstream policy debate in dozens of cities worldwide — and for good reason.

The environmental argument is, by now, well established. Private vehicles account for a disproportionate share of urban carbon emissions and particulate pollution. In major European cities, transport accounts for roughly a quarter of total greenhouse gas output, with private cars representing the largest single contributor. The evidence, in other words, is not ambiguous: reducing car use reduces pollution.

What is less often discussed, however, is the economic case. Car-free streets, it turns out, are frequently more profitable than car-dominated ones. Studies from Oslo, New York and Barcelona consistently demonstrate that pedestrianised streets generate significantly higher retail turnover per square metre than streets with heavy traffic. It was not the loss of parking spaces that damaged trade — it was the assumption that it would.

Nevertheless, the opposition to car bans is understandable, albeit often overstated. For residents of city suburbs or rural areas without access to adequate public transport, the car is not a luxury — it is a lifeline. Any viable policy must therefore be accompanied by investment in affordable, frequent and accessible alternatives.

Not only does this require financial commitment from governments, but it also demands a fundamental shift in urban planning philosophy. The city of the future should be designed for people, not vehicles. Several cities have already demonstrated that this is achievable: Oslo reported zero pedestrian fatalities in 2019 following its car reduction programme. Madrid\'s central zone saw air quality improve by 25% within two years of restricting access.

What the evidence ultimately demonstrates is that the question is not whether cities should reduce private car use, but how quickly and equitably they can do so.`,
    firstReadTask: task('Read and answer: What is the author\'s main argument? What is the main concession made to opponents?'),
    evidenceQuestions: [
      task('What evidence does the author give for the economic argument?', 'Find specific cities and data.', 'Studies from Oslo, New York and Barcelona; pedestrianised streets generate higher retail turnover.'),
      task('What does the author acknowledge as a limitation of car bans?', '', 'People in suburbs/rural areas depend on cars; public transport investment is needed.'),
      task('How does the author use Oslo and Madrid as evidence?', '', 'Oslo: zero pedestrian fatalities in 2019. Madrid: 25% air quality improvement.'),
      task('Find the cleft sentence in the article and explain what element is being emphasised.', '', '"It was not the loss of parking spaces that damaged trade — it was the assumption that it would."'),
    ],
    contextVocabularyTasks: [
      task('Find the word that means "disputing an argument or claim" in paragraph 4.', '', 'overstated'),
      task('What does "the preserve of" mean in context (paragraph 1)?', '', 'something belonging exclusively to a group — "the preserve of radical environmentalists" = only they held this view before.'),
    ],
    guidedSummary: task('Write a 3-sentence summary: main claim, main evidence, and main concession.', 'Use: argues that / demonstrates / nevertheless'),
    connectedProduction: task('Do you agree that cities should restrict private cars? Write 80-100 words using: nevertheless, albeit, the evidence demonstrates, from my perspective.'),
  }),

  // ─── LISTENING-001: Is remote work really working? ────────────────────────────
  createListeningLesson({
    ...common,
    id: 'B2-LISTENING-001',
    order: 1,
    title: 'Is remote work really working? — A podcast debate',
    objectives: [
      'Identificar posição, argumento central e concessões de cada falante em debate de podcast.',
      'Reconhecer marcadores discursivos B2 em fala natural (nevertheless, albeit, not only...but also).',
      'Distinguir onde um falante concede um ponto vs onde mantém a sua posição.',
      'Responder perguntas de inferência e detalhe após escuta sem transcript.',
      'Praticar shadowing com frases de alta densidade informacional em inglês formal.',
    ],
    listeningPreparation: [
      'You will hear a podcast with three speakers: HOST (Maya), ADAM (pro-office), and JOANNA (pro-remote).',
      'Before listening: What do you think are the strongest arguments FOR and AGAINST remote work?',
      'Key vocabulary to listen for: productivity, isolation, collaboration, flexibility, boundaries, micromanagement.',
    ],
    keyWordsToHear: ['contends', 'demonstrates', 'acknowledge', 'nevertheless', 'significant', 'implication'],
    transcript: `HOST (Maya): Welcome back to WorkSmart. Today we are debating one of the biggest questions in modern work culture: is remote work actually working? I have two guests with very different perspectives. Adam, you argue that the return to office is necessary. Joanna, you contend that remote work is the future. Adam, start us off.

ADAM: Thank you, Maya. Look, I acknowledge that remote work has clear advantages for individual flexibility. Nevertheless, the data I have seen demonstrates that collaborative innovation suffers significantly when teams are not physically co-located. Not only does this affect daily problem-solving, but it also has long-term implications for organisational culture and mentoring.

HOST: Joanna, your response?

JOANNA: I would argue that Adam is making an assumption that office presence equals collaboration. The evidence from companies like Spotify, GitLab and Dropbox — all fully remote or hybrid — actually demonstrates the opposite. It was not the office that built their culture; it was intentional communication practices.

ADAM: That is a fair point, albeit a selective one. Those are tech companies with high-skilled workforces and significant investment in digital infrastructure. The implication that this model works for all sectors is, I contend, unproven.

HOST: So you both acknowledge sector and role matter. What about wellbeing, Joanna?

JOANNA: This is where I feel the evidence is clearest. Remote workers report, on average, significantly lower commute stress and better work-life balance. The tendency to conflate office presence with productivity is, I would argue, a cultural bias rather than a data-driven conclusion.

ADAM: I partially concede that point. What concerns me, nevertheless, is the consequence for early-career workers. The implications for mentoring and professional socialisation are, in my view, significant and largely underestimated.

HOST: A nuanced debate. The evidence suggests neither approach is universally superior. What both of you seem to agree on is that intention and investment matter more than location. Thanks to Adam and Joanna.`,
    firstListenTasks: [
      task('What is Adam\'s main concern about remote work?'),
      task('What is Joanna\'s main argument in favour of remote work?'),
    ],
    listeningComprehension: [
      task('What companies does Joanna cite as evidence? Why does Adam challenge this example?', '', 'Spotify, GitLab, Dropbox. Adam says they are tech companies — selective evidence, not applicable to all sectors.'),
      task('What does Adam partially concede?', '', 'That remote work reduces commute stress and improves work-life balance.'),
      task('What does Adam say is the implication for early-career workers?', '', 'Mentoring and professional socialisation suffer — underestimated consequence.'),
      task('Find TWO discourse markers from B2 Grammar lessons used in the podcast.', 'Listen for: nevertheless, albeit, not only...but also, implication', ''),
    ],
    shadowing: [
      'Nevertheless, the data I have seen demonstrates that collaborative innovation suffers significantly when teams are not physically co-located.',
      'The tendency to conflate office presence with productivity is, I would argue, a cultural bias rather than a data-driven conclusion.',
      'It was not the office that built their culture; it was intentional communication practices.',
    ],
    oralProduction: task('Record 60-90 seconds: Do you agree with Adam, Joanna, or neither? Use at least two of the lesson\'s discourse markers in your response.'),
  }),

  // ─── WRITING-001: Formal opinion paragraph ────────────────────────────────────
  createWritingLesson({
    ...common,
    id: 'B2-WRITING-001',
    order: 1,
    title: 'Write a formal opinion paragraph with hedging and evidence',
    objectives: [
      'Escrever parágrafo de opinião formal com hedging (tend to, appear to, it is argued that).',
      'Usar marcadores discursivos B2 (nevertheless, albeit, in contrast) na escrita.',
      'Estruturar parágrafo com position → evidence → concession → restatement.',
      'Aplicar registo formal e consistente: sem contrações, com vocabulary B2.',
      'Produzir versão final de 80-100 palavras após revisão com checklist.',
    ],
    modelText: `The increasing reliance on digital communication tools has significantly altered workplace dynamics. From one perspective, platforms such as video conferencing software and collaborative project management systems have made remote collaboration more efficient than many initially assumed. The evidence demonstrates that teams spread across multiple time zones can, with the right tools, maintain both productivity and cohesion. Nevertheless, it would be overly optimistic to ignore the challenges. Not all tasks are suited to asynchronous communication, and the absence of informal interaction can, over time, erode team trust. What is required, therefore, is not a blanket endorsement of digital communication, but a nuanced approach that matches the tool to the task.`,
    modelTextBreakdown: [
      { label: 'Opening sentence', quote: 'The increasing reliance on...', note: 'Introduces topic with formal noun phrase — no "I think" or "In my opinion" at the start.' },
      { label: 'Perspective + evidence', quote: 'From one perspective...The evidence demonstrates...', note: '"From one perspective" signals this is one side. "The evidence demonstrates" anchors the claim.' },
      { label: 'Concession', quote: 'Nevertheless, it would be overly optimistic to ignore...', note: '"Nevertheless" + hedging "it would be overly optimistic" — acknowledges limits without ceding ground.' },
      { label: 'Cleft for conclusion', quote: 'What is required, therefore, is not... but a nuanced approach...', note: 'Wh-cleft used to reframe the conclusion. "Not X but Y" structure creates argumentative precision.' },
    ],
    writingBlocks: [
      { block: 'Topic sentence', instruction: 'State the topic clearly using a formal noun phrase. Avoid "I think" or "In my opinion" in the opening sentence.' },
      { block: 'Position + evidence', instruction: 'Signal your perspective ("From my perspective / The evidence demonstrates / I would argue that...") and provide a specific example or data point.' },
      { block: 'Concession', instruction: 'Use "Nevertheless / However / That said" + acknowledge a limitation or counter-argument without abandoning your position.' },
      { block: 'Conclusion + cleft or inversion', instruction: 'Restate your conclusion using a cleft ("What the evidence suggests is...") or a formal connective ("All things considered...").' },
    ],
    grammarForWriting: [
      'Hedging: "it would be overly optimistic to..." / "it is difficult to argue that..." / "one cannot ignore..."',
      'Evidence: "The evidence demonstrates / suggests / indicates that..."',
      'Concession: "Nevertheless, / That said, / This notwithstanding,"',
      'Wh-cleft conclusion: "What is required is..." / "What the data suggests is..."',
    ],
    usefulSentences: [
      'The evidence clearly demonstrates that [claim].',
      'From a [professional / practical / ethical] perspective, [argument].',
      'Nevertheless, it would be inaccurate to suggest that [concession].',
      'What the available evidence ultimately indicates is that [conclusion].',
    ],
    revisionChecklist: [
      'Topic sentence introduces the topic without "I think" or "In my opinion".',
      'Position clearly stated and supported with evidence or example.',
      'At least one advanced discourse marker used (nevertheless, albeit, notwithstanding, in contrast).',
      'A concession is acknowledged without abandoning the main argument.',
      'A cleft or formal connective used in the conclusion.',
      'No contracted forms (it\'s → it is, can\'t → cannot).',
      'No informal vocabulary (big → significant, get → obtain, need → require).',
      'Paragraph is 100-130 words.',
    ],
    finalVersionTask: task('Write a formal opinion paragraph (100-130 words) on one of these topics:', 'Topics: (1) The impact of social media on public discourse. (2) Whether universities should make attendance compulsory. (3) Whether working from home reduces career progression. Use the model structure.'),
  }),

]);

export const B2_DEEP_BRIDGE_PART2_BY_PILLAR = Object.freeze({
  reading: B2_DEEP_BRIDGE_PART2.filter(l => l.pillar === 'reading'),
  listening: B2_DEEP_BRIDGE_PART2.filter(l => l.pillar === 'listening'),
  writing: B2_DEEP_BRIDGE_PART2.filter(l => l.pillar === 'writing'),
});
