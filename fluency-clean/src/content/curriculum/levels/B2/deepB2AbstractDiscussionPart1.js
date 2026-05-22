import { createGrammarLesson, createVocabularyLesson, createReadingLesson, createListeningLesson, createSpeakingLesson, createWritingLesson } from '../../../schemas/index.js';

const level = 'B2';
const status = 'ready';
const common = { level, status, estimatedMinutes: 65, tags: ['b2-3', 'abstract-discussion', 'argumentation', 'hedging', 'deep-approved-target'] };

function task(instruction, note = '', expected = '') { return { instruction, note, expected }; }

export const B2_DEEP_ABSTRACT_DISCUSSION_PART1 = Object.freeze([

  // ─── GRAMMAR-007: Mixed conditionals ─────────────────────────────────────────
  createGrammarLesson({
    ...common,
    id: 'B2-GRAMMAR-007',
    order: 7,
    title: 'Mixed conditionals: past cause with present consequence',
    objectives: [
      'Formar mixed conditionals: If + past perfect (hypothesis about past) → would + base verb (present).',
      'Formar mixed conditionals reversos: If + past simple (present state) → would have + pp (past).',
      'Distinguir mixed conditionals de 2nd e 3rd conditionals.',
      'Usar mixed conditionals para análise, arrependimento e raciocínio hipotético B2.',
    ],
    teacherOpening: 'What if a decision made in the past is still affecting the present? Mixed conditionals connect a hypothetical past to a present consequence — or a hypothetical present state to a past consequence. They require accurate control of tense and express sophisticated "what if" reasoning.',
    portugueseContrast: [task('Em Mixed conditionals: past cause with present consequence, observe que a estrutura do inglês difere da ordem natural do português.'), task('Não traduza literalmente; identifique o padrão do inglês antes de produzir.')], 
    whyItMatters: 'In professional analysis, academic writing and mature conversation, mixed conditionals let you discuss causation across time: "If the team had communicated better [past], we wouldn\'t be in this situation now [present]." This is the language of strategic reflection and post-mortem thinking.',
    differenceFromA2: '2nd conditional: "If I had more time now, I would help." (hypothetical present) 3rd conditional: "If I had known, I would have helped." (hypothetical past, past consequence) Mixed: "If I had studied harder then [past], I would be in a better position now [present]."',
    grammarTable: {
      headers: ['Tipo', 'If-clause', 'Main clause', 'Exemplo'],
      rows: [
        ['Mixed type 1 (past → present)', 'If + past perfect', 'would + base verb', 'If we had hired more staff, the team wouldn\'t be overwhelmed now.'],
        ['Mixed type 2 (present → past)', 'If + simple past (hypothetical state)', 'would have + pp', 'If I were more patient, I would have handled that situation better.'],
        ['3rd conditional (past → past)', 'If + past perfect', 'would have + pp', 'If we had had more data, we would have made a better decision.'],
        ['2nd conditional (present → present)', 'If + simple past', 'would + base verb', 'If I had more experience, I would approach it differently.'],
      ],
    },
    whenToUse: [
      'Mixed type 1: a past action (or lack of action) has a present consequence — "If we had prepared better, we wouldn\'t be struggling now."',
      'Mixed type 2: a permanent present characteristic determines a past outcome — "If I were more decisive, I would have acted sooner."',
      'Both forms: analysis, reflection, post-mortems, persuasive argument.',
    ],
    teacherExamples: [
      'If the company had invested in cybersecurity earlier, it wouldn\'t be facing this crisis now.',
      'If I were a native speaker, I would have handled that negotiation very differently.',
      'If she had finished her PhD, she would now have far more options.',
      'If our supply chain were more diversified, we would have weathered that disruption without difficulty.',
    ],
    commonBrazilianMistakes: [
      { wrong: 'If we would have planned better, we wouldn\'t have this problem.', right: 'If we had planned better, we wouldn\'t have this problem (now).', note: 'O "would" nunca vai na cláusula "if" — use past perfect: "If we had...".' },
      { wrong: 'If I was more organised, I would have submitted on time.', right: 'If I were more organised, I would have submitted on time.', note: 'Para present hypothetical state em "if" clause, use "were" (not "was") in formal English.' },
    ],
    controlledPractice: [
      task('Identify the type (mixed type 1, mixed type 2, or other) and complete:', ''),
      task('"If the team ___ (communicate) better last year, we ___ (not be) in this situation." → had communicated / wouldn\'t be (mixed type 1)'),
      task('"If I ___ (be) more decisive, I ___ (handle) that differently at the time." → were / would have handled (mixed type 2)'),
    ],
    productionTasks: [
      task('Write 3 mixed conditional sentences about decisions or situations you know — one type 1, one type 2, one 3rd conditional.'),
      task('Write a short reflection (60-70 words) using mixed conditionals about a decision that still affects you today.'),
    ],
    lessonRecap: [
      'Mixed type 1: If + past perfect → would (now) — past cause, present result',
      'Mixed type 2: If + simple past (hypothetical state) → would have + pp — present cause, past result',
      'Never use "would" in the If-clause',
      'Formal English: "were" not "was" for present hypothetical',
    ],
    nextLessonBridge: 'Mixed conditionals require concession — acknowledging the "other side" of a hypothesis. Next lesson: concession structures (although, despite, whereas, for all that).',
  }),

  // ─── GRAMMAR-008: Concession structures ──────────────────────────────────────
  createGrammarLesson({
    ...common,
    id: 'B2-GRAMMAR-008',
    order: 8,
    title: 'Concession: although, despite, whereas, for all that',
    objectives: [
      'Usar "although / even though" + cláusula completa para concessão.',
      'Usar "despite / in spite of" + noun phrase ou gerund (NOT clause).',
      'Usar "whereas / while" para contraste paralelo entre dois elementos.',
      'Usar "for all that / that said / that being said" para concessão formal falada/escrita.',
      'Distinguir as formas gramaticais e registros de cada estrutura.',
    ],
    teacherOpening: 'Every B2 argument has concession — acknowledging the other side without giving up your position. Knowing the full range of concessive structures allows you to be precise and nuanced: "although" for full clauses, "despite" for noun phrases, "whereas" for parallel contrast. Each has its rhythm and register.',
    portugueseContrast: [task('Em Concession: although, despite, whereas, for all that, observe que a estrutura do inglês difere da ordem natural do português.'), task('Não traduza literalmente; identifique o padrão do inglês antes de produzir.')], 
    whyItMatters: 'Arguments without concession sound one-sided and unconvincing. Arguments with clumsy concession sound confused. Mastering concession structures is what makes a B2 argument read as sophisticated rather than defensive.',
    grammarTable: {
      headers: ['Estrutura', 'Padrão gramatical', 'Registro', 'Exemplo'],
      rows: [
        ['although / even though', '+ complete clause (subject + verb)', 'Neutro / formal', 'Although the project was late, the results were excellent.'],
        ['despite / in spite of', '+ noun phrase OR + -ing', 'Neutro / formal', 'Despite the delays, the project was ultimately successful.'],
        ['whereas / while', '+ clause: parallel contrast of two things', 'Formal/academic', 'Online courses offer flexibility, whereas face-to-face classes build social skills.'],
        ['for all that', '+ clause: concede but maintain position', 'Formal / literary', 'The plan had flaws. For all that, it was the best option available.'],
        ['that said / that being said', 'Used to introduce a concession after a strong statement', 'Spoken/written formal', 'The data is encouraging. That said, it is too early to draw firm conclusions.'],
        ['in spite of the fact that', '+ full clause (more formal than "although")', 'Formal/written', 'In spite of the fact that funds were limited, the project succeeded.'],
      ],
    },
    whenToUse: [
      '"Although/even though": any situation with a full concessive clause — most common and versatile.',
      '"Despite/in spite of": concise concession with a noun phrase — preferred in formal writing.',
      '"Whereas/while": contrasting two parallel ideas — academic essays, reports, presentations.',
      '"That said/that being said": spoken formal — to pivot after a strong statement.',
    ],
    whenNotToUse: [
      '"Despite that + verb" is wrong: "Despite we worked hard" → "Despite working hard" or "Although we worked hard".',
      '"Whereas" for temporal meaning (NOT "while I was waiting" = temporal — "whereas" is purely contrastive).',
    ],
    teacherExamples: [
      'Although the initial feedback was mixed, the final product exceeded expectations.',
      'Despite considerable resistance from stakeholders, the project was approved.',
      'Online shopping offers convenience, whereas traditional retail provides a tactile experience.',
      'The system had well-documented limitations. That said, it was the most reliable option we had.',
      'In spite of the fact that resources were constrained, the team delivered on time.',
    ],
    commonBrazilianMistakes: [
      { wrong: 'Despite we worked hard, the project failed.', right: 'Despite working hard, the project failed. / Although we worked hard, the project failed.', note: '"Despite" + gerund or noun phrase — NOT "despite" + subject + verb.' },
      { wrong: 'Even though the good results, she was not satisfied.', right: 'Even though the results were good, she was not satisfied.', note: '"Even though" needs a full clause: subject + verb.' },
    ],
    controlledPractice: [
      task('Combine using the correct concession structure:', ''),
      task('"The team worked well. The results were poor." → Although / Despite'),
      task('"Urban schools improved. Rural schools declined." → whereas'),
      task('"The budget was limited. The event was a success." → In spite of / despite'),
    ],
    productionTasks: [
      task('Write 4 sentences about a situation with two contrasting elements. Use: although, despite, whereas, that said.'),
    ],
    lessonRecap: [
      'although / even though + full clause',
      'despite / in spite of + noun/gerund (NOT + clause)',
      'whereas / while = parallel contrast',
      'that said / that being said = pivot after strong statement',
      '"Despite that..." is ALWAYS wrong — use "despite + noun/gerund"',
    ],
    nextLessonBridge: 'Concession connects to one more B2 grammar priority: advanced passive structures — how formal English handles agency without naming it.',
  }),

  // ─── GRAMMAR-009: Advanced passive voice ─────────────────────────────────────
  createGrammarLesson({
    ...common,
    id: 'B2-GRAMMAR-009',
    order: 9,
    title: 'Advanced passive voice: continuous, perfect, and modal passive',
    objectives: [
      'Formar a voz passiva contínua: is/are being done; was/were being done.',
      'Formar a voz passiva perfeita: has/have been done; had been done.',
      'Formar a voz passiva modal: should/must/will/can + be + pp.',
      'Reconhecer e usar passiva em textos formais, relatórios, emails e análise acadêmica.',
    ],
    teacherOpening: 'At B2, passive voice goes beyond "is made" and "was built." Professional and academic English requires passive continuous ("is being reviewed"), passive perfect ("has been submitted") and modal passive ("must be considered", "should be addressed"). These signal that you can operate in formal written registers.',
    portugueseContrast: [task('Em Advanced passive voice: continuous, perfect, and modal passive, observe que a estrutura do inglês difere da ordem natural do português.'), task('Não traduza literalmente; identifique o padrão do inglês antes de produzir.')], 
    whyItMatters: 'In professional reports, academic papers, formal correspondence and policy documents, these passive forms are the standard. "The budget is being reviewed" is standard; "someone is reviewing the budget" sounds odd in formal English. Mastering these forms is essential for professional communication.',
    grammarTable: {
      headers: ['Forma passiva', 'Estrutura', 'Uso', 'Exemplo'],
      rows: [
        ['Present continuous passive', 'is/are + being + pp', 'Ação em andamento agora', 'The system is being upgraded as we speak.'],
        ['Past continuous passive', 'was/were + being + pp', 'Ação em andamento no passado', 'When the error occurred, the data was being transferred.'],
        ['Present perfect passive', 'has/have + been + pp', 'Ação concluída com relevância presente', 'The report has been submitted to the board.'],
        ['Past perfect passive', 'had + been + pp', 'Ação concluída antes de ponto passado', 'By the time we arrived, the decision had already been taken.'],
        ['Modal passive (present)', 'modal + be + pp', 'Obrigação/possibilidade sobre ação', 'All claims should be verified before publication.'],
        ['Modal passive (past)', 'modal + have been + pp', 'Obrigação/possibilidade passada', 'The issue should have been flagged earlier.'],
      ],
    },
    whenToUse: [
      'Present continuous passive: ação que está acontecendo agora sem identificar o agente — relatórios de status.',
      'Present perfect passive: resultado relevante ao presente — confirmações, atualizações.',
      'Modal passive: recomendações, obrigações e possibilidades formais.',
      'Quando o agente é desconhecido, óbvio ou irrelevante em contexto formal.',
    ],
    teacherExamples: [
      'The new regulations are currently being implemented across all departments.',
      'Three alternative approaches have been evaluated and only one has been approved.',
      'By the time the audit was completed, several irregularities had already been identified.',
      'This matter must be addressed before the end of the quarter.',
      'The evidence should have been presented at the initial review.',
    ],
    commonBrazilianMistakes: [
      { wrong: 'The report is being submitted now by my colleague.', right: 'The report is being submitted by my colleague.', note: '"Now" is redundant with present continuous — and the passive is correct; just unnecessary redundancy.' },
      { wrong: 'The project has submitted last week.', right: 'The project was submitted last week. / The report has been submitted.', note: 'Past time marker (last week) → past simple passive, not present perfect passive.' },
      { wrong: 'All documents should reviewed.', right: 'All documents should be reviewed.', note: 'Modal passive: modal + be + pp — the "be" cannot be omitted.' },
    ],
    controlledPractice: [
      task('Transform using the passive form indicated:', ''),
      task('"They are currently reviewing the proposal." → present continuous passive'),
      task('"Someone has already approved the budget." → present perfect passive'),
      task('"We should address this issue immediately." → modal passive'),
      task('"By the time I arrived, they had decided everything." → past perfect passive'),
    ],
    productionTasks: [
      task('Write a short status update (60-80 words) for a project using 4 different passive forms: present continuous, present perfect, past perfect, and modal passive.'),
    ],
    lessonRecap: [
      'Present continuous passive: is/are being + pp',
      'Present perfect passive: has/have been + pp',
      'Past perfect passive: had been + pp',
      'Modal passive: modal + be + pp (present) / modal + have been + pp (past)',
    ],
    nextLessonBridge: 'Grammar toolbox complete for B2.3. Now vocabulary: qualification language — how to hedge, qualify and argue with precision.',
  }),

  // ─── VOCABULARY-007: Qualification language ──────────────────────────────────
  createVocabularyLesson({
    ...common,
    id: 'B2-VOCABULARY-007',
    order: 7,
    title: 'Qualification language: tend to, appear to, somewhat, arguably',
    objectives: [
      'Usar "tend to", "appear to", "somewhat" e "arguably" para qualificar afirmações B2.',
      'Distinguir afirmações absolutas de afirmações qualificadas — e quando usar cada uma.',
      'Identificar e corrigir generalizações excessivas substituindo por linguagem qualificada.',
      'Integrar qualification language em fala e escrita académica/profissional.',
    ],
    topicContext: 'At B2, strong claims need qualification. Qualification language signals that you are thinking carefully — not making unsupported generalisations. It is the difference between "people prefer X" (claim) and "people tend to prefer X under these conditions" (qualified claim).',
    essentialWords: [
      { word: 'arguably', phonetics: '/ˈɑːɡjuəbli/', definition: 'it could be argued that this is true — but it is open to debate', example: 'Arguably, the most significant barrier to progress is a lack of clear communication.' },
      { word: 'tend to', phonetics: '', definition: 'be likely to do something in most cases', example: 'Organisations tend to underestimate the time required for cultural change.' },
      { word: 'appear to', phonetics: '', definition: 'seem to be the case based on available evidence', example: 'The results appear to suggest a link between workload and burnout.' },
      { word: 'somewhat', phonetics: '/ˈsʌmwɒt/', definition: 'to a degree — more than a little but less than completely', example: 'The results were somewhat disappointing given the investment made.' },
      { word: 'to a certain extent', phonetics: '', definition: 'partially true, but with limitations', example: 'To a certain extent, the policy has achieved its objectives.' },
      { word: 'broadly speaking', phonetics: '', definition: 'in general, without considering all details', example: 'Broadly speaking, the research supports this conclusion.' },
      { word: 'on the whole', phonetics: '', definition: 'in general, considering everything', example: 'On the whole, the project was well managed.' },
    ],
    chunks: [
      'arguably + [strongest form of claim] ("Arguably, this is the most important factor.")',
      'tend to + base verb ("tend to underestimate / tend to overlook")',
      'appear to + verb ("appear to suggest / appear to indicate")',
      'somewhat + adjective ("somewhat misleading / somewhat optimistic")',
      'to a certain extent, + qualified claim',
    ],
    dangerousConfusions: [
      { pair: ['arguably', 'obviously'], note: '"Arguably" signals the claim is strong but debatable — it invites critical engagement. "Obviously" closes down debate. In academic and professional writing, "arguably" is usually preferable to "obviously."' },
      { pair: ['tend to', 'always'], note: '"Always" is an absolute claim — rare in academic/professional writing. "Tend to" hedges appropriately: "People tend to overestimate short-term impact" is more credible than "people always overestimate."' },
    ],
    miniDialogues: [
      { context: 'Academic presentation feedback', lines: [
        { speaker: 'Supervisor', text: 'Your claim that "automation always reduces employment" is too strong.' },
        { speaker: 'Student', text: 'You are right — I should say "automation tends to displace certain categories of employment, arguably those involving routine tasks."' },
      ]},
    ],
    usagePractice: [
      task('Soften these overly strong claims using qualification language:', ''),
      task('"All managers ignore feedback." → Managers tend to / broadly speaking'),
      task('"This clearly proves the hypothesis." → arguably / appear to suggest'),
      task('"It was a complete failure." → somewhat / to a certain extent'),
    ],
    productionTasks: [
      task('Write 4 qualified claims about a topic you know (work, study, technology, society). Each sentence must use a different qualification marker from this lesson.'),
    ],
  }),

  // ─── VOCABULARY-008: Abstract verbs B2 ───────────────────────────────────────
  createVocabularyLesson({
    ...common,
    id: 'B2-VOCABULARY-008',
    order: 8,
    title: 'Abstract verbs B2: acknowledge, challenge, constitute, undermine',
    objectives: [
      'Usar "acknowledge", "challenge", "constitute" e "undermine" em argumentação e análise.',
      'Entender como verbos abstractos descrevem relações entre ideias, afirmações e evidências.',
      'Substituir "say" e "think" por verbos abstractos B2 mais precisos em contexto formal.',
      'Produzir análise de uma decisão ou situação usando pelo menos 4 verbos abstractos B2.',
    ],
    topicContext: 'Abstract verbs operate at the level of ideas and arguments, not physical actions. At B2, these verbs allow you to describe how claims, evidence and positions interact — essential for academic writing, analysis and debate.',
    essentialWords: [
      { word: 'acknowledge', phonetics: '/əkˈnɒlɪdʒ/', definition: 'accept the truth or existence of something', example: 'We must acknowledge the limitations of this study.' },
      { word: 'challenge', phonetics: '/ˈtʃælɪndʒ/', definition: 'question or dispute the validity of something', example: 'Several experts have challenged the assumptions behind the report.' },
      { word: 'constitute', phonetics: '/ˈkɒnstɪtjuːt/', definition: 'be the equivalent of; make up or form', example: 'This data constitutes strong evidence in favour of the hypothesis.' },
      { word: 'undermine', phonetics: '/ˌʌndəˈmaɪn/', definition: 'weaken or damage something gradually', example: 'The new findings undermine the credibility of the earlier research.' },
      { word: 'reinforce', phonetics: '/ˌriːɪnˈfɔːs/', definition: 'strengthen or support something further', example: 'These results reinforce the argument for longer-term investment.' },
      { word: 'attribute', phonetics: '/əˈtrɪbjuːt/', definition: 'regard something as caused by or belonging to', example: 'The researchers attributed the improvement to changes in methodology.' },
      { word: 'distinguish', phonetics: '/dɪˈstɪŋɡwɪʃ/', definition: 'recognise or show a difference between two things', example: 'It is important to distinguish between correlation and causation.' },
    ],
    chunks: [
      'challenge the assumption / claim / validity that',
      'constitute + noun ("constitute a significant risk / a breach of protocol")',
      'undermine the argument / the credibility / the position',
      'reinforce the view / evidence / conclusion that',
      'attribute X to Y ("attribute the success to better communication")',
    ],
    dangerousConfusions: [
      { pair: ['challenge', 'criticise'], note: '"Challenge" questions the validity, truth or assumption — it is analytical. "Criticise" evaluates negatively. You can "challenge a claim" analytically without emotionally "criticising" someone.' },
      { pair: ['constitute', 'consist of'], note: '"Constitute" = be equivalent to or form. "Consist of" = be made up of parts. "This constitutes a breach" = it IS a breach. "The team consists of five members" = it is made up of five.' },
    ],
    miniDialogues: [
      { context: 'Academic seminar', lines: [
        { speaker: 'Student A', text: 'The correlation between the variables reinforces the hypothesis.' },
        { speaker: 'Student B', text: 'I would challenge that. Correlation doesn\'t constitute evidence of causation. We need to acknowledge the limitations before we can attribute the outcome to a single variable.' },
      ]},
    ],
    usagePractice: [
      task('Complete with the correct abstract verb:', ''),
      task('"The new evidence ___ the original findings." (weakens) → undermines'),
      task('"This ___ a serious risk to the organisation." (equals) → constitutes'),
      task('"We should ___ the difference between intent and impact." (show difference) → distinguish'),
      task('"The results ___ the view that remote work increases productivity." (supports further) → reinforce'),
    ],
    productionTasks: [
      task('Write a short analytical paragraph (60-80 words) about a claim, study or argument. Use at least 4 abstract verbs from this lesson.'),
    ],
  }),

  // ─── READING-003: The Price of Progress ──────────────────────────────────────
  createReadingLesson({
    ...common,
    id: 'B2-READING-003',
    order: 3,
    title: 'The Price of Progress — An argumentative article on technology and society',
    objectives: [
      'Identificar posição do autor, evidências e concessões em artigo argumentativo sobre tecnologia.',
      'Reconhecer linguagem de qualificação e verbos abstractos B2 em texto autêntico.',
      'Responder perguntas de análise crítica com evidência textual.',
      'Avaliar a força do argumento do autor e identificar possíveis lacunas ou contra-argumentos.',
    ],
    readingPurpose: 'Read an argumentative article for the author\'s position, concession strategy, use of evidence, and discourse structure. At B2, reading for argument architecture is as important as reading for content.',
    preReadingVocabulary: [
      { word: 'automation', definition: 'use of technology to perform tasks with minimal human involvement' },
      { word: 'displacement', definition: 'being moved out of a position, especially employment' },
      { word: 'accountability', definition: 'responsibility for one\'s actions and the obligation to report on them' },
      { word: 'proponents', definition: 'people who argue in favour of something' },
      { word: 'equilibrium', definition: 'a state of balance between opposing forces' },
    ],
    mainText: `The Price of Progress: Technology, Employment and the Question of Accountability

Every technological revolution has generated both opportunity and disruption. The current wave — driven by artificial intelligence, automation and algorithmic decision-making — is no different. Proponents argue that technology creates more jobs than it destroys, pointing to historical precedent and current data showing net employment gains in technology-adjacent sectors. Critics contend, with some justification, that this time may be different: the pace and scope of displacement, they argue, is outstripping the economy\'s ability to absorb it.

Both perspectives contain elements of truth. What the debate tends to undermine is a more important question: not whether jobs are created or destroyed in aggregate, but who bears the cost of disruption and who captures the benefit.

The evidence is reasonably clear on this point. Automation has historically displaced workers in routine, manual and administrative roles — disproportionately women, lower-income workers and those with lower formal qualifications. The gains, meanwhile, have tended to accumulate at the top: higher productivity has, in many economies, reinforced inequality rather than reducing it. To acknowledge this is not to argue against technological progress. It is, however, to challenge the assumption that growth is automatically equitable.

What is required, arguably, is not a decision between progress and protection, but a policy framework that distinguishes between the two. Retraining programmes, portable benefit systems and progressive taxation of automation dividends constitute not radical alternatives to growth, but its responsible accompaniment. Notwithstanding the political difficulty of such measures, the evidence suggests they are both economically viable and, from an ethical perspective, necessary.

The price of progress, in other words, should not be paid disproportionately by those who have the least ability to absorb it. That said, the solution lies not in slowing the inevitable, but in ensuring its benefits are more equitably distributed.`,
    firstReadTask: task('Read and answer: What is the author\'s main argument? What does the author concede to the opposing side?'),
    evidenceQuestions: [
      task('What is the author\'s answer to the question of who bears the cost of disruption?', '', 'Routine/manual/admin workers — disproportionately women, lower-income and lower-qualification workers.'),
      task('What does the author say the gains from automation have tended to do?', '', 'Accumulate at the top — reinforcing inequality rather than reducing it.'),
      task('What three policy approaches does the author recommend?', '', 'Retraining programmes, portable benefit systems, and progressive taxation of automation dividends.'),
      task('Find the cleft sentence in paragraph 2 and explain its function.', '', '"What the debate tends to undermine is a more important question..." — shifts focus from what is usually debated to what the author considers the real issue.'),
      task('How does the author use the word "acknowledge" and "challenge" in paragraph 3? What does this reveal about their strategy?', '', '"To acknowledge this is not to argue against technological progress." Concedes a point without giving up the argument. "Challenge the assumption" — questions the premise that growth is automatically equitable.'),
    ],
    contextVocabularyTasks: [
      task('What does "outstripping" mean in context (paragraph 1)?', '', 'Growing faster than, exceeding — "outstripping the economy\'s ability to absorb it".'),
      task('Find a word in paragraph 4 meaning "ethical consideration alongside economic benefit".', '', '"responsible accompaniment"'),
    ],
    guidedSummary: task('Write a 4-sentence summary: main claim, the evidence given, what the author concedes, and the conclusion.', 'Use: argues that / the evidence suggests / acknowledges / constitutes'),
    connectedProduction: task('Do you agree with the author\'s analysis? Write 80-100 words using: acknowledge, arguably, constitute, whereas, and at least one advanced passive.'),
  }),

  // ─── LISTENING-003: Panel discussion — housing crisis ─────────────────────────
  createListeningLesson({
    ...common,
    id: 'B2-LISTENING-003',
    order: 3,
    title: 'Panel discussion: the housing crisis in cities — three perspectives',
    objectives: [
      'Identificar posição, argumento e ponto de concessão de cada participante em painel de discussão.',
      'Distinguir perspectivas diferentes sobre um mesmo problema (crise habitacional).',
      'Reconhecer como falantes usam qualification language em debate real.',
      'Sintetizar as três perspectivas em resposta escrita ou oral de 80-100 palavras.',
    ],
    listeningPreparation: [
      'You will hear a panel with three speakers: HOST (Priya), DR CHEN (economist), SARA (urban planner), and JAMES (housing advocate).',
      'Topic: why housing in major cities has become unaffordable, and what should be done.',
      'Before listening: What do you think are the main causes of the housing crisis?',
      'Key vocabulary: supply, demand, zoning, speculation, affordability, displacement.',
    ],
    keyWordsToHear: ['constitute', 'undermine', 'whereas', 'arguably', 'acknowledge', 'challenge', 'despite', 'tend to'],
    transcript: `HOST (Priya): Welcome to Policy Matters. Housing affordability is arguably one of the most significant social crises of our time in major cities. I\'m joined by three guests with different perspectives. Dr Chen, you tend to favour market solutions. Sara, you advocate for planning reform. And James, you represent communities most affected by displacement. Dr Chen, let\'s start with you.

DR CHEN: Thank you. The evidence clearly demonstrates that the primary driver is a supply shortage. Cities have consistently failed to build enough housing to meet demand. Whereas planning regulations may have once protected communities, they now constitute the main barrier to affordability. I acknowledge that market solutions alone are insufficient — but the data suggests that restricting supply has reinforced the problem, not solved it.

SARA: I\'d challenge that framing. The assumption that supply alone drives affordability tends to undermine the complexity of what\'s happening. We have built housing — but it has consistently failed to meet the needs of lower and middle-income residents. What we need is not just more units, but the right units in the right places at the right price. That being said, I acknowledge that planning reform is part of the solution.

JAMES: What strikes me in this debate is what is being left out. We are discussing economics and planning, but the people most affected — working families, essential workers, long-term residents — are being displaced from the communities they helped build. Arguably, that constitutes a human rights issue, not merely a market inefficiency. Despite the complexity, the fundamental question should be: housing for whom?

HOST: Dr Chen, does that challenge your position?

DR CHEN: To a certain extent, yes. I would not dispute that the current situation reinforces inequality. Somewhat reluctantly, I concede that tax policies — particularly around property speculation — have undermined the case for purely market-based solutions. A more nuanced framework is needed.

HOST: Sara, final thought?

SARA: Despite our differences, all three of us appear to acknowledge that the status quo is failing. What remains is the political will to act. The evidence — from Vienna, Singapore, and Amsterdam — demonstrates that mixed models work. They just require sustained commitment.`,
    firstListenTasks: [
      task('What is Dr Chen\'s main argument?'),
      task('What does Sara challenge in Dr Chen\'s argument?'),
    ],
    listeningComprehension: [
      task('What does James say is being "left out" of the debate?', '', 'The human impact on working families and long-term residents being displaced.'),
      task('What concession does Dr Chen make by the end?', '', 'Concedes that tax policies on property speculation have undermined purely market-based solutions.'),
      task('What evidence does Sara cite for mixed models working?', '', 'Vienna, Singapore, and Amsterdam.'),
      task('Find TWO qualification markers used by the speakers.', '', '"arguably", "tend to", "somewhat", "to a certain extent", "appear to" — any two.'),
      task('Which of the three speakers uses an abstract verb from the B2 vocabulary lesson? Give the example.', '', 'All three — "constitute", "undermine", "challenge", "reinforce", "acknowledge" etc.'),
    ],
    shadowing: [
      'Whereas planning regulations may have once protected communities, they now constitute the main barrier to affordability.',
      'The assumption that supply alone drives affordability tends to undermine the complexity of what\'s happening.',
      'Despite our differences, all three of us appear to acknowledge that the status quo is failing.',
    ],
    oralProduction: task('Record 90 seconds: Which speaker\'s position do you find most compelling? Why? Use qualification language, at least one abstract verb and one concession structure.'),
  }),

  // ─── SPEAKING-003: Defend a nuanced position ─────────────────────────────────
  createSpeakingLesson({
    ...common,
    id: 'B2-SPEAKING-003',
    order: 3,
    title: 'Defend a nuanced position: acknowledge both sides, hold your ground',
    objectives: [
      'Defender posição nuançada reconhecendo o lado oposto sem abandonar a posição original.',
      'Usar "I would argue", "arguably", "the evidence suggests" e "one cannot deny" em fala.',
      'Responder a contra-argumento usando concession + rebuttal estruturado.',
      'Gravar discussão estruturada de 2-3 minutos sobre tema controverso.',
    ],
    speakingSituation: 'You are in a seminar, interview or debate. You need to defend a nuanced position on a complex issue — not simply agreeing or disagreeing, but acknowledging the complexity while maintaining your argument.',
    modelPhrases: [
      'From my perspective, the most important factor is...',
      'Arguably, the evidence suggests that...',
      'I acknowledge that there are valid arguments on the other side; nevertheless...',
      'To a certain extent, I would concede that... However...',
      'What tends to be overlooked in this debate is...',
      'Despite the complexity, the fundamental question remains...',
      'I would challenge the assumption that...',
      'The evidence, broadly speaking, supports the view that...',
      'That being said, I maintain that...',
      'What the data appears to demonstrate is...',
    ],
    pronunciationFocus: {
      title: 'Pronunciation & shadowing',
      tips: [
        'Shadow: "I acknowledge that there are valid arguments on the other side; nevertheless..." — pause at the semicolon and stress NEVerthe-LESS to signal the turn.',
        '"Arguably, the evidence suggests that..." — stress ARGuably with falling intonation, then rise on "suggests" to build anticipation.',
        '"What tends to be overlooked in this debate is..." — link "tends-to-be" as one rhythmic unit. Stress overLOOKED.',
        '"Despite the complexity, the fundamental question remains..." — practise strategic pausing after "complexity" before delivering the main claim.',
      ],
    },
    guidedSpeaking: [
      { prompt: 'Is remote work better or worse for productivity? Give a nuanced answer — not simply yes or no.', structure: 'Position (qualified) → Evidence → Concede opposing view → Maintain position with qualification', minWords: 100 },
      { prompt: 'Should social media platforms be regulated by governments? Defend your view, acknowledging both sides.', structure: 'Open with nuance → argue main point → use concession + "that being said" → conclusion with qualification', minWords: 100 },
    ],
    recordingTasks: [
      { prompt: 'Choose a controversial topic you know well. Record a 2-minute defence of a nuanced position. Must include: a qualification marker, a concession structure, at least one abstract verb (acknowledge / challenge / constitute / undermine), and a mixed or advanced conditional.', duration: '2 minutes', checklist: [
        'Nuanced position stated (not simply yes/no)',
        'Qualification marker used (arguably / tend to / to a certain extent)',
        'Opposing view acknowledged',
        'Position maintained after concession ("nevertheless / that being said")',
        'At least one abstract verb used',
        'Evidence or example given',
        'Conclusion restates nuanced position',
      ]},
    ],
    speakingChecklist: [
      'Nuanced opening — not a simple yes/no.',
      'At least one qualification marker used naturally.',
      'Opposing view acknowledged without abandoning position.',
      'At least one abstract verb (acknowledge / challenge / constitute / undermine).',
      'Evidence or example provided.',
      'Conclusion is clear but qualified.',
    ],
    freeSpeaking: [
      { topic: 'Is it possible to balance economic growth with environmental sustainability? Give your nuanced view in 2 minutes.' },
      { topic: 'Does formal education still prepare people effectively for the modern world? Defend a nuanced position.' },
    ],
  }),

  // ─── WRITING-003: Discursive paragraph with concession ────────────────────────
  createWritingLesson({
    ...common,
    id: 'B2-WRITING-003',
    order: 3,
    title: 'Write a discursive paragraph: concession, qualification and abstract verbs',
    objectives: [
      'Escrever parágrafo discursivo com concessão, qualificação e verbos abstractos B2.',
      'Estruturar: claim → concession (albeit, nevertheless) → qualification (arguably, tend to) → conclusion.',
      'Usar verbos abstractos (acknowledge, constitute, undermine) em vez de "say" ou "think".',
      'Produzir parágrafo final de 90-110 palavras com todos os elementos estruturais.',
    ],
    modelText: `The question of whether artificial intelligence constitutes a threat to employment is one that tends to generate more heat than light. Proponents of automation argue, with some justification, that technology has historically created more jobs than it destroys. That being said, it would be somewhat misleading to apply historical precedent without qualification. Whereas previous technological revolutions displaced primarily physical labour, AI appears to challenge cognitive roles — a distinction that arguably undermines the reassurance offered by historical comparisons. To acknowledge this is not to reject technological progress; it is, however, to challenge the assumption that the benefits will be equitably distributed. What the evidence suggests, broadly speaking, is that proactive policy intervention — not passive optimism — constitutes the most responsible approach.`,
    modelTextBreakdown: [
      { label: 'Opening with abstract verb', quote: 'The question of whether AI constitutes a threat', note: '"Constitute" elevates "is" — signals analytical precision from the start.' },
      { label: 'Qualified concession', quote: 'argue, with some justification, that', note: '"With some justification" hedges the concession — acknowledges without fully endorsing.' },
      { label: 'Pivot', quote: 'That being said, it would be somewhat misleading', note: 'Formal spoken pivot "that being said" + "somewhat" qualification.' },
      { label: 'Parallel contrast + advanced passive', quote: 'Whereas previous revolutions displaced..., AI appears to challenge', note: '"Whereas" for parallel contrast. "Appears to" for hedged claim.' },
      { label: 'Wh-cleft conclusion', quote: 'What the evidence suggests, broadly speaking, is that', note: 'Wh-cleft + "broadly speaking" — qualified, hedged, formal conclusion.' },
    ],
    writingBlocks: [
      { block: 'Opening claim', instruction: 'Start with the topic and a clear (but not absolute) claim. Use an abstract verb (constitute / tend to / appear to challenge).' },
      { block: 'Concede + qualify', instruction: 'Acknowledge the opposing argument: "Proponents argue, with some justification, that..." Then qualify with "That being said / somewhat / to a certain extent."' },
      { block: 'Counter-argument', instruction: 'Use "Whereas" or "Despite" to pivot to the main argument.' },
      { block: 'Acknowledgement without concession', instruction: '"To acknowledge this is not to argue against X; it is, however, to challenge Y."' },
      { block: 'Qualified conclusion', instruction: 'Wh-cleft or formal connective: "What the evidence suggests, broadly speaking, is that..."' },
    ],
    grammarForWriting: [
      'Abstract verbs: constitute, challenge, undermine, acknowledge, reinforce.',
      'Qualification: tend to, appear to, arguably, somewhat, broadly speaking.',
      'Concession: that being said / whereas / despite / notwithstanding.',
      'Wh-cleft conclusion: "What [evidence/data/the situation] suggests is that..."',
    ],
    revisionChecklist: [
      'Opening uses abstract verb (not just "is" or "has").',
      'At least one qualified concession (with some justification / to a certain extent).',
      'Pivot word used after concession (that being said / nevertheless / however).',
      'Qualification marker used at least once (arguably / tend to / appear to).',
      'At least one abstract verb used analytically.',
      'Wh-cleft or formal connective in conclusion.',
      'No informal vocabulary or contracted forms.',
      'Length: 120-150 words.',
    ],
    finalVersionTask: task('Write a discursive paragraph (120-150 words) on one of the following topics:', 'Options: (1) Does social media damage mental health? (2) Should university education be free? (3) Is globalisation beneficial or harmful? Use: constitute, acknowledge, tend to, arguably, that being said, and a Wh-cleft conclusion.'),
  }),

]);

export const B2_DEEP_ABSTRACT_DISCUSSION_PART1_BY_PILLAR = Object.freeze({
  grammar: B2_DEEP_ABSTRACT_DISCUSSION_PART1.filter(l => l.pillar === 'grammar'),
  vocabulary: B2_DEEP_ABSTRACT_DISCUSSION_PART1.filter(l => l.pillar === 'vocabulary'),
  reading: B2_DEEP_ABSTRACT_DISCUSSION_PART1.filter(l => l.pillar === 'reading'),
  listening: B2_DEEP_ABSTRACT_DISCUSSION_PART1.filter(l => l.pillar === 'listening'),
  speaking: B2_DEEP_ABSTRACT_DISCUSSION_PART1.filter(l => l.pillar === 'speaking'),
  writing: B2_DEEP_ABSTRACT_DISCUSSION_PART1.filter(l => l.pillar === 'writing'),
});
