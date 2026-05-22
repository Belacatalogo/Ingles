import { createGrammarLesson, createVocabularyLesson, createSpeakingLesson } from '../../../schemas/index.js';

const level = 'B2';
const status = 'ready';
const common = { level, status, estimatedMinutes: 65, tags: ['b2-4', 'professional', 'workplace', 'communication', 'deep-approved-target'] };

function task(instruction, note = '', expected = '') { return { instruction, note, expected }; }

export const B2_DEEP_PROFESSIONAL_PART1 = Object.freeze([

  // ─── GRAMMAR-010: Polite requests and indirect questions ──────────────────────
  createGrammarLesson({
    ...common,
    id: 'B2-GRAMMAR-010',
    order: 10,
    title: 'Polite requests and indirect questions in professional English',
    objectives: [
      'Usar "Would it be possible to..." e "Could you..." para pedidos formais.',
      'Usar "I was wondering if/whether..." para pedidos indiretos suavizados.',
      'Transformar perguntas diretas em perguntas indiretas para comunicação profissional.',
      'Usar "I would appreciate it if..." e "Would you mind..." para solicitações delicadas.',
      'Distinguir o nível de formalidade de cada estrutura.',
    ],
    teacherOpening: 'In professional contexts, how you ask for something is as important as what you ask. "Send me the report" is direct and can sound rude. "Could you send me the report when you get a chance?" is standard. "I was wondering whether it would be possible to receive the report by end of day?" is formal and shows careful consideration. At B2, you need all three registers.',
    portugueseContrast: [task('Em Polite requests and indirect questions in professional English, observe que a estrutura do inglês difere da ordem natural do português.'), task('Não traduza literalmente; identifique o padrão do inglês antes de produzir.')], 
    whyItMatters: 'Professional relationships depend on tone. An email that is too direct can damage a working relationship. Being able to calibrate formality — especially in writing — is a key B2 competency that directly affects your professional effectiveness.',
    differenceFromA2: 'A2: "Can you send the report?" B1: "Could you please send the report?" B2: "I was wondering whether it would be possible to receive the report by the end of the week. I appreciate that you are managing several priorities at the moment."',
    grammarTable: {
      headers: ['Estrutura', 'Uso', 'Formalidade', 'Exemplo'],
      rows: [
        ['Could you + base verb?', 'Pedido padrão educado', 'Neutro/formal', 'Could you share the updated figures before Thursday?'],
        ['Would it be possible to + base verb?', 'Pedido formal/polido', 'Formal', 'Would it be possible to reschedule the meeting?'],
        ['I was wondering if/whether + clause', 'Pedido indireto e suavizado', 'Formal/semiformal', 'I was wondering whether you had a chance to review my proposal.'],
        ['I would appreciate it if + past simple', 'Pedido delicado com pressão implícita', 'Formal/escrito', 'I would appreciate it if you could respond by Friday.'],
        ['Would you mind + -ing?', 'Pedido informal-formal, spoken', 'Semiformal', 'Would you mind sending me the updated schedule?'],
        ['Indirect question: Could you tell me + clause?', 'Pergunta indireta', 'Formal', 'Could you tell me when the project is expected to conclude?'],
        ['I would like to know + clause', 'Pergunta indireta escrita', 'Formal/written', 'I would like to know whether the budget has been approved.'],
      ],
    },
    whenToUse: [
      '"Could you...": standard for most professional requests — safe in emails and meetings.',
      '"Would it be possible to...": when the request may be difficult — shows you acknowledge the other person\'s constraints.',
      '"I was wondering if/whether...": softens a request significantly — ideal when asking a superior or external contact.',
      '"I would appreciate it if...": written formal emails — also slightly pressures while remaining polite.',
    ],
    whenNotToUse: [
      'Avoid "Can you?" in formal written communication — use "Could you?" instead.',
      '"Would you mind" + past tense is wrong: "Would you mind sent me..." → "Would you mind sending me..."',
      'Indirect questions follow statement word order: "Could you tell me where is the report?" → "Could you tell me where the report is?"',
    ],
    teacherExamples: [
      'Would it be possible to receive the final draft by next Monday?',
      'I was wondering whether you had had a chance to consider the proposal I sent last week.',
      'Could you let me know if the meeting time has been confirmed?',
      'I would appreciate it if you could review the attached document before our call.',
      'Would you mind copying the finance team on your next update?',
      'I would like to know whether the contract has been signed by all parties.',
    ],
    commonBrazilianMistakes: [
      { wrong: 'I was wondering if you can send me the report.', right: 'I was wondering if you could send me the report.', note: 'After "I was wondering if", use "could" (not "can") to maintain consistent register.' },
      { wrong: 'Could you tell me where is the meeting room?', right: 'Could you tell me where the meeting room is?', note: 'Indirect questions use statement word order — no inversion after "could you tell me".' },
      { wrong: 'Would you mind to check the document?', right: 'Would you mind checking the document?', note: '"Would you mind" is followed by a gerund (-ing), not to-infinitive.' },
    ],
    controlledPractice: [
      task('Make these requests more formal/polite:', ''),
      task('"Send me the file." → Could you / Would it be possible to'),
      task('"Have you read my email?" → I was wondering whether'),
      task('"When is the deadline?" (indirect question) → Could you tell me / I would like to know'),
      task('"Reply before Friday." → I would appreciate it if you could'),
    ],
    productionTasks: [
      task('Write 4 professional requests (2 for an email, 2 for spoken use in a meeting) using different structures from this lesson.'),
      task('Transform this direct email into a polite professional one:', 'Original: "Send me the budget. I need it today. Also tell me when the meeting is." → Transform all requests.'),
    ],
    lessonRecap: [
      'Could you...? → standard polite request',
      'Would it be possible to...? → formal, acknowledges difficulty',
      'I was wondering if/whether... → indirect, softened, formal',
      'I would appreciate it if... → written, slightly pressuring but polite',
      'Indirect questions: statement word order after "could you tell me / I would like to know"',
    ],
    nextLessonBridge: 'Polite requests in place. Next: formal conditionals used in professional writing — "Should you require", "Were you to consider", "Had you informed us earlier".',
  }),

  // ─── GRAMMAR-011: Formal conditionals for professional writing ────────────────
  createGrammarLesson({
    ...common,
    id: 'B2-GRAMMAR-011',
    order: 11,
    title: 'Formal conditionals: Should you require, Were you to, Had we known',
    objectives: [
      'Usar "Should you + base verb" como substituto formal de "If you..." no presente/futuro.',
      'Usar "Were you/they to + base verb" para hipóteses formais.',
      'Usar "Had + subject + pp..." para 3rd conditional formal sem "if".',
      'Reconhecer essas formas em contratos, emails formais e documentos legais/profissionais.',
    ],
    teacherOpening: 'In formal professional and legal English, conditionals often appear without the word "if". Instead of "If you need assistance," a formal email might read: "Should you require assistance, please do not hesitate to contact us." This is not just a stylistic choice — it signals a specific register that is expected in formal correspondence, contracts and business communication.',
    portugueseContrast: [task('Em Formal conditionals: Should you require, Were you to, Had we known, observe que a estrutura do inglês difere da ordem natural do português.'), task('Não traduza literalmente; identifique o padrão do inglês antes de produzir.')], 
    whyItMatters: 'These forms appear constantly in formal professional documents, contracts, official correspondence and business English at C1 level. At B2, recognising and producing them marks you as a sophisticated communicator in professional contexts.',
    differenceFromA2: 'B1: "If you have any questions, contact me." B2: "Should you have any queries, please do not hesitate to contact our office." The difference is register — formal professional English omits "if" and uses inversion.',
    grammarTable: {
      headers: ['Condicional informal', 'Forma formal (inversion)', 'Contexto típico'],
      rows: [
        ['If you need help', 'Should you need / require assistance', 'Emails, documentos de suporte, contratos'],
        ['If you want to proceed', 'Should you wish to proceed', 'Propostas, cotações, acordos'],
        ['If you decided to implement this', 'Were you to implement this', 'Análise de opção, relatórios de recomendação'],
        ['If the company changed its policy', 'Were the company to change its policy', 'Análise hipotética em contexto corporativo'],
        ['If we had known earlier', 'Had we known earlier, we would have...', 'Post-mortem, relatórios de análise'],
        ['If you had contacted us', 'Had you contacted us, we could have...', 'Comunicações formais, defesa de posição'],
      ],
    },
    whenToUse: [
      '"Should you...": formal emails, contracts, proposals — polite, anticipating a need.',
      '"Were you/they to...": formal reports, analysis documents, board presentations — hypothetical scenarios.',
      '"Had + subject + pp...": formal post-mortems, legal correspondence, response to complaints.',
    ],
    whenNotToUse: [
      'Do not use in casual email or spoken communication — too formal, will sound odd.',
      'Do not mix with informal contractions: "Should you\'ve needed..." is wrong.',
    ],
    teacherExamples: [
      'Should you require any further information, please do not hesitate to contact our team.',
      'Should you wish to proceed with the proposal, please sign and return the attached form.',
      'Were the board to approve the restructuring, significant cost savings would be realised.',
      'Were you to implement this strategy, it would be essential to consult all stakeholders.',
      'Had we been informed of the issue earlier, we would have been in a position to address it promptly.',
      'Had the data been verified, the error would not have occurred.',
    ],
    commonBrazilianMistakes: [
      { wrong: 'Should you will need any help, contact us.', right: 'Should you need any help, contact us.', note: '"Should you" + base verb (no auxiliary "will") — the inversion replaces "if" but the verb stays base form.' },
      { wrong: 'Were you to consider this, you would have made a better choice.', right: 'Were you to consider this, you would make a better choice.', note: '"Were you to" + present consequence → "would" (not "would have"). Reserve "would have" for "Had you...".' },
    ],
    controlledPractice: [
      task('Rewrite using formal conditional inversion:', ''),
      task('"If you need more information, email us." → Should you ___'),
      task('"If you decided to proceed, we would begin immediately." → Were you to ___'),
      task('"If we had received the report earlier, we would have adjusted our approach." → Had we ___'),
      task('"If you wish to cancel, please notify us 48 hours in advance." → Should you ___'),
    ],
    productionTasks: [
      task('Write 3 formal professional sentences using one "Should you", one "Were you to", and one "Had we/you...".',
        'Context: a professional email, a proposal, or a formal complaint response.'),
    ],
    lessonRecap: [
      'Should you + base verb = If you... (formal present/future)',
      'Were you/they to + base verb = If you/they... (formal hypothetical)',
      'Had + subject + pp = If + subject + had + pp (formal 3rd conditional)',
      'Used in: formal emails, contracts, proposals, post-mortems',
      'Never use "will" after "Should you": "Should you need" NOT "Should you will need"',
    ],
    nextLessonBridge: 'One more grammar structure for professional English: gerunds vs infinitives in formal recommendations — "We recommend implementing...", "I suggest reconsidering...".',
  }),

  // ─── GRAMMAR-012: Gerunds vs infinitives in professional contexts ─────────────
  createGrammarLesson({
    ...common,
    id: 'B2-GRAMMAR-012',
    order: 12,
    title: 'Gerunds vs infinitives in professional English: recommend, suggest, consider',
    objectives: [
      'Usar gerúndio após "recommend", "suggest", "consider", "avoid", "risk" em contexto formal.',
      'Usar infinitivo após "propose", "decide", "agree", "tend", "fail", "aim", "seek".',
      'Distinguir os verbos que aceitam ambas as formas (com mudança de significado: "stop", "remember", "try").',
      'Aplicar corretamente no contexto de emails, relatórios e reuniões profissionais.',
    ],
    teacherOpening: 'Professional English requires precise verb patterns. "We recommend to implement" is wrong — "We recommend implementing" is correct. "We have decided implementing" is wrong — "We have decided to implement" is correct. These patterns matter in professional writing and reports: errors here signal uncertainty in formal English.',
    portugueseContrast: [task('Em Gerunds vs infinitives in professional English: recommend, suggest, consider, observe que a estrutura do inglês difere da ordem natural do português.'), task('Não traduza literalmente; identifique o padrão do inglês antes de produzir.')], 
    whyItMatters: 'In business writing, the wrong pattern looks careless. "The committee recommends to review" is a clear error visible to any native speaker. Getting these right marks you as a precise, professional communicator.',
    grammarTable: {
      headers: ['Verbo', 'Padrão', 'Exemplo profissional'],
      rows: [
        ['recommend', '+ -ing (NOT to + base)', 'We recommend reviewing the data before finalising the report.'],
        ['suggest', '+ -ing OR + that + clause', 'I suggest reconsidering the timeline. / I suggest (that) we reconsider.'],
        ['consider', '+ -ing', 'The board is considering restructuring the department.'],
        ['avoid', '+ -ing', 'Please avoid using informal language in client communications.'],
        ['risk', '+ -ing', 'We risk losing the contract if we delay further.'],
        ['propose', '+ -ing OR + to + base', 'The team proposed implementing a new system.'],
        ['decide', '+ to + base', 'The committee has decided to postpone the launch.'],
        ['agree', '+ to + base', 'Both parties have agreed to extend the deadline.'],
        ['fail', '+ to + base', 'The team failed to deliver on time.'],
        ['aim / seek', '+ to + base', 'We aim to resolve this within 48 hours.'],
      ],
    },
    whenToUse: [
      '"Recommend/suggest/consider/avoid" + gerund: recommendations in reports, emails and presentations.',
      '"Decide/agree/fail/aim/seek" + infinitive: decisions and commitments in minutes, emails, reports.',
      '"Stop + -ing" (cease activity) vs "stop + to do" (pause to perform): "Stop delaying" vs "Stop to consider the implications."',
    ],
    teacherExamples: [
      'The report recommends increasing the budget allocation for the next quarter.',
      'I suggest reviewing the proposal before submitting it to the board.',
      'The team has decided to delay the rollout by three weeks.',
      'We propose restructuring the team to improve efficiency.',
      'Both parties have agreed to revisit the terms at the end of Q2.',
      'The audit identified several risks, including failing to maintain adequate records.',
    ],
    commonBrazilianMistakes: [
      { wrong: 'We recommend to review the data.', right: 'We recommend reviewing the data.', note: '"Recommend" + gerund — NOT "recommend to + base verb".' },
      { wrong: 'The manager suggested to extend the deadline.', right: 'The manager suggested extending the deadline. / The manager suggested that we extend the deadline.', note: '"Suggest" + gerund OR "suggest that + clause" — NOT "suggest + to + infinitive".' },
      { wrong: 'We have decided implementing the new system.', right: 'We have decided to implement the new system.', note: '"Decide" + to-infinitive — NOT "decide + gerund".' },
    ],
    controlledPractice: [
      task('Complete with the correct form (gerund or infinitive):', ''),
      task('"The consultant recommends ___ (reduce) headcount." → reducing'),
      task('"The board has decided ___ (delay) the announcement." → to delay'),
      task('"I suggest ___ (schedule) a follow-up call." → scheduling'),
      task('"We risk ___ (lose) the client if we don\'t respond." → losing'),
      task('"Both parties agreed ___ (review) the contract." → to review'),
    ],
    productionTasks: [
      task('Write a short paragraph (60-80 words) summarising the recommendations of a fictional meeting. Use: recommend, suggest, decide, agree, and avoid.'),
    ],
    lessonRecap: [
      'recommend / suggest / consider / avoid / risk → + -ing',
      'decide / agree / fail / aim / seek → + to-infinitive',
      '"Recommend to do" is ALWAYS wrong — it must be "recommend doing"',
      '"Suggest to do" is ALWAYS wrong — it must be "suggest doing" or "suggest that we do"',
    ],
    nextLessonBridge: 'Grammar set for B2.4 complete. Now vocabulary — meetings, negotiations and professional email phrases.',
  }),

  // ─── VOCABULARY-009: Meetings and negotiations ────────────────────────────────
  createVocabularyLesson({
    ...common,
    id: 'B2-VOCABULARY-009',
    order: 9,
    title: 'Meetings and negotiations: agenda, action points, facilitate, defer',
    objectives: [
      'Usar vocabulário de reuniões profissionais: agenda, action points, facilitate, defer, escalate.',
      'Usar frases funcionais para conduzir e participar em reuniões B2.',
      'Distinguir "defer" (adiar decisão) de "postpone" (adiar evento) e "table" (colocar em agenda).',
      'Produzir contribuição de reunião estruturada (60-80 palavras) com vocabulário profissional.',
    ],
    topicContext: 'Professional meetings and negotiations have their own vocabulary. At B2, you need not just the words but the functional phrases that allow you to lead, participate, interrupt, clarify and close meetings effectively.',
    essentialWords: [
      { word: 'agenda', phonetics: '/əˈdʒendə/', definition: 'list of items to be discussed in a meeting', example: 'Could you circulate the agenda before tomorrow\'s meeting?' },
      { word: 'action point', phonetics: '', definition: 'a specific task assigned during or after a meeting', example: 'Let\'s confirm the action points before we close.' },
      { word: 'defer', phonetics: '/dɪˈfɜː/', definition: 'postpone to a later time', example: 'I suggest we defer this item to the next meeting.' },
      { word: 'facilitate', phonetics: '/fəˈsɪlɪteɪt/', definition: 'make something easier; chair or guide a process', example: 'She facilitated the discussion very effectively.' },
      { word: 'consensus', phonetics: '/kənˈsensəs/', definition: 'general agreement among a group', example: 'Do we have consensus on the proposed timeline?' },
      { word: 'clarify', phonetics: '/ˈklærɪfaɪ/', definition: 'make something less confusing; ask for clearer information', example: 'Could you clarify what you mean by "significant change"?' },
      { word: 'adjourn', phonetics: '/əˈdʒɜːn/', definition: 'formally close or pause a meeting', example: 'I suggest we adjourn and reconvene on Thursday.' },
      { word: 'stakeholder', phonetics: '/ˈsteɪkhəʊldə/', definition: 'a person or group with an interest in a decision or project', example: 'All key stakeholders should be consulted before a final decision is taken.' },
    ],
    chunks: [
      'Let\'s move on to the next item on the agenda.',
      'Can we defer this to [date / next meeting]?',
      'Do we have consensus on this point?',
      'Could you clarify what you mean by...?',
      'I\'d like to propose that we...',
      'Let\'s confirm the action points.',
      'I\'d like to come back to that point if I may.',
      'To summarise what we\'ve agreed so far...',
    ],
    dangerousConfusions: [
      { pair: ['agenda', 'minutes'], note: '"Agenda" = the list of items BEFORE the meeting. "Minutes" = the written record of what was DISCUSSED and decided DURING the meeting. Confusing these is a common professional error.' },
      { pair: ['defer', 'delay'], note: '"Defer" implies a deliberate, agreed postponement — formal and intentional. "Delay" is more general and often implies something undesirable. "We have decided to defer this item" (planned). "The project was delayed" (problem).' },
    ],
    miniDialogues: [
      { context: 'Project meeting', lines: [
        { speaker: 'Chair', text: 'The second item on the agenda is the Q3 budget. I\'d like to propose that we defer this to next week, as the finance team hasn\'t confirmed the figures yet.' },
        { speaker: 'Team member', text: 'Could I ask for clarification — do we have consensus on the Q2 figures at least?' },
        { speaker: 'Chair', text: 'Yes, those are confirmed. Let\'s add that to the action points and move on.' },
      ]},
    ],
    recognitionPractice: [
      task('Match each phrase to its function:', ''),
      task('"Let\'s move on to the next item." → Transition in a meeting'),
      task('"Could you clarify what you mean by...?" → Request for clarification'),
      task('"I suggest we defer this." → Postpone an item'),
      task('"Do we have consensus?" → Check agreement'),
    ],
    usagePractice: [
      task('Match these meeting situations to the correct phrase from the chunks list:', ''),
      task('You want to return to a point raised earlier. → "I\'d like to come back to that point if I may."'),
      task('You want to end the meeting formally. → "I suggest we adjourn."'),
      task('You want to check everyone agrees. → "Do we have consensus on this?"'),
    ],
    productionTasks: [
      task('Write a short meeting summary (60-80 words) including: two agenda items, action points for each, and at least two vocabulary items from this lesson.'),
    ],
    recognitionPractice: [{ question: 'Meetings and negotiations: agenda, action points, facilitate, defer — qual vocabulário desta aula significa "list of items to be discussed in a meeting"?', options: ['agenda', 'action point', 'defer'], answer: 'agenda', explanation: 'agenda = list of items to be discussed in a meeting; vocabulário trabalhado nesta aula.' }, { question: 'Meetings and negotiations: agenda, action points, facilitate, defer — qual opção combina com "agenda"?', options: ['list of items to be discussed in a meeting', 'a specific task assigned during or after a meeting', 'postpone to a later time'], answer: 'list of items to be discussed in a meeting', explanation: 'agenda significa list of items to be discussed in a meeting no contexto desta aula.' }],
  }),

  // ─── VOCABULARY-010: Professional email phrases ────────────────────────────────
  createVocabularyLesson({
    ...common,
    id: 'B2-VOCABULARY-010',
    order: 10,
    title: 'Professional email phrases: register, openings, closings and transitions',
    objectives: [
      'Usar aberturas, fechamentos e frases de transição em emails profissionais B2.',
      'Distinguir registo formal, semi-formal e informal em email — e quando usar cada um.',
      'Evitar erros comuns de registo (Dear Sir/Madam em contexto semi-formal, etc.).',
      'Redigir email profissional de 70-100 palavras com abertura, corpo, fecho e assinatura corretos.',
    ],
    topicContext: 'Professional emails in English follow specific conventions. At B2, you need to command both formal and semi-formal registers — and know which phrases belong to which. This includes openings, closings, reference phrases, apology phrases, and call-to-action phrases.',
    essentialWords: [
      { word: 'further to', phonetics: '', definition: 'following on from (formal reference)', example: 'Further to our conversation this morning, I am writing to confirm the details.' },
      { word: 'pursuant to', phonetics: '/pəˈsuːənt/', definition: 'following a rule or agreement (formal/legal)', example: 'Pursuant to your request, I have attached the relevant documentation.' },
      { word: 'I trust', phonetics: '', definition: 'I believe/hope (formal tone)', example: 'I trust this meets your requirements.' },
      { word: 'I look forward to', phonetics: '', definition: 'standard formal closing anticipating future contact', example: 'I look forward to hearing from you at your earliest convenience.' },
      { word: 'Please find attached', phonetics: '', definition: 'standard phrase when attaching files to an email', example: 'Please find attached the report requested.' },
      { word: 'I would be grateful if', phonetics: '', definition: 'polite request in formal emails', example: 'I would be grateful if you could confirm receipt of this email.' },
    ],
    chunks: [
      'Opening: "I am writing to [inform you / enquire about / follow up on]..."',
      'Reference: "Further to our meeting on [date], / With reference to your email of [date],"',
      'Attachment: "Please find attached [the report / the invoice / the draft]."',
      'Request: "I would be grateful if you could / I would appreciate your assistance with..."',
      'Apology: "I apologise for any inconvenience this may have caused."',
      'Closing (formal): "I look forward to hearing from you. / Please do not hesitate to contact me."',
      'Closing (semi-formal): "Looking forward to your response. / Thanks in advance."',
      'Sign-off (formal): "Yours sincerely / Yours faithfully / Kind regards / Best regards"',
    ],
    dangerousConfusions: [
      { pair: ['Yours sincerely', 'Yours faithfully'], note: '"Yours sincerely" = when you know the recipient\'s name ("Dear Mr Johnson"). "Yours faithfully" = when you DON\'T know the name ("Dear Sir/Madam"). This is a classic error in formal English.' },
      { pair: ['Further to', 'In addition to'], note: '"Further to" refers to a previous communication or event: "Further to our call..." "In addition to" adds information: "In addition to the report, I have attached..."' },
    ],
    miniDialogues: [
      { context: 'Formal email comparison', lines: [
        { speaker: 'Informal version', text: 'Hi, here is the report you asked for. Let me know if you need anything else. Thanks.' },
        { speaker: 'Formal version', text: 'Dear Ms Carvalho, Further to your request, please find attached the report. Should you require any further information, please do not hesitate to contact me. I look forward to hearing from you. Kind regards, Lucas Andrade.' },
      ]},
    ],
    usagePractice: [
      task('Rewrite this informal email in a formal register:', '', ''),
      task('"Hi, I got your email. I can\'t make the meeting on Thursday. Can we do Friday instead? Let me know. Thanks."'),
    ],
    productionTasks: [
      task('Write a professional email (80-100 words) responding to a client who reported a problem with a delivery. Include: a formal opening with reference, an apology, what action is being taken, a request for confirmation, and a formal closing.'),
    ],
    recognitionPractice: [{ question: 'Professional email phrases: register, openings, closings and transitions — qual vocabulário desta aula significa "following on from (formal reference)"?', options: ['further to', 'pursuant to', 'I trust'], answer: 'further to', explanation: 'further to = following on from (formal reference); vocabulário trabalhado nesta aula.' }, { question: 'Professional email phrases: register, openings, closings and transitions — qual opção combina com "further to"?', options: ['following on from (formal reference)', 'following a rule or agreement (formal/legal)', 'I believe/hope (formal tone)'], answer: 'following on from (formal reference)', explanation: 'further to significa following on from (formal reference) no contexto desta aula.' }],
  }),

  // ─── SPEAKING-004: Lead and participate in a business meeting ─────────────────
  createSpeakingLesson({
    ...common,
    id: 'B2-SPEAKING-004',
    order: 4,
    title: 'Lead and participate in a business meeting: chairing, clarifying, summarising',
    objectives: [
      'Conduzir e participar em reunião de negócios usando linguagem de chairing e facilitation.',
      'Usar frases de clarificação (Could you elaborate on...? What do you mean by...?) em contexto real.',
      'Resumir pontos de discussão e definir acções (action points) oralmente.',
      'Praticar role-play de reunião com chairing, interruções profissionais e encerramento.',
    ],
    speakingSituation: 'You are participating in or leading a team meeting in English. Topics include: project updates, decisions, action points and next steps. You need to facilitate the discussion, interrupt politely, clarify, and summarise.',
    modelPhrases: [
      'Right, let\'s get started. The first item on the agenda is...',
      'Could we keep to the agenda for now and come back to that?',
      'I\'d like to propose that we...',
      'Can I just come in here? / Can I add something at this point?',
      'Could you clarify what you mean by that?',
      'If I understand you correctly, you are suggesting that...',
      'Let\'s see if we have consensus on this before moving on.',
      'To summarise what we have agreed so far...',
      'Let\'s confirm the action points before we close.',
      'I suggest we defer this item to the next meeting.',
      'Should you have any questions after the meeting, please feel free to contact me.',
    ],
    pronunciationFocus: {
      title: 'Pronunciation & shadowing',
      tips: [
        'Shadow: "Could we keep to the agenda for now and come back to that?" — practise the polite falling intonation that signals a directive, not a question.',
        '"If I understand you correctly, you are suggesting that..." — link "understand-you-correctly" smoothly. Stress corRECTly and sugGESTing.',
        '"To summarise what we have agreed so far..." — stress SUMmarise and aGREED. Use a clear pause after "far" to signal the summary is about to begin.',
        '"Should you have any questions..." — practise the formal inverted conditional with stress on SHOULD at the opening.',
      ],
    },
    guidedSpeaking: [
      { prompt: 'You are chairing a team meeting. Open the meeting, introduce the agenda, and handle the first item: "Should we extend the project deadline?"', structure: 'Open meeting → introduce agenda → lead discussion → politely interrupt when needed → summarise and assign action point', minWords: 80 },
      { prompt: 'You are a participant. A colleague has just proposed a decision you disagree with. Politely challenge their proposal, ask for clarification, and suggest an alternative.', structure: 'Polite interruption → clarifying question → challenge with "I would argue that..." → propose alternative', minWords: 80 },
    ],
    substitutionDrills: [
      { base: 'Let\'s move on to [the budget discussion].', substitutions: ['item 3', 'the risk assessment', 'the next point'] },
      { base: 'Could you clarify what you mean by [significant change]?', substitutions: ['risk', 'the delay', 'immediate action'] },
    ],
    recordingTasks: [
      { prompt: 'Record a 2-minute simulation of chairing or participating in a brief meeting. Include: opening, at least one clarification request, a polite challenge or proposal, and a summary of action points. Use grammar structures from this B2.4 block (formal conditional, polite request, gerund recommendation).', duration: '2 minutes', checklist: [
        'Clear meeting structure (open → agenda → discussion → summary)',
        'At least one polite request or indirect question',
        'At least one formal conditional (Should you / Were you to)',
        'At least one recommendation with gerund (recommend/suggest + -ing)',
        'Clarification request used',
        'Summary and action point stated',
      ]},
    ],
    speakingChecklist: [
      'Meeting has a clear structure.',
      'At least one polite/indirect request used.',
      'Clarification request used naturally.',
      'Action points summarised at the end.',
      'Formal register maintained throughout.',
    ],
    freeSpeaking: [
      { topic: 'Simulate a brief meeting (3 minutes) where you propose a change to a process you know well — and handle pushback from a colleague.' },
      { topic: 'Chair a short team catch-up. Go through 3 agenda items: (1) project status, (2) budget update, (3) next steps.' },
    ],
  }),

]);

export const B2_DEEP_PROFESSIONAL_PART1_BY_PILLAR = Object.freeze({
  grammar: B2_DEEP_PROFESSIONAL_PART1.filter(l => l.pillar === 'grammar'),
  vocabulary: B2_DEEP_PROFESSIONAL_PART1.filter(l => l.pillar === 'vocabulary'),
  speaking: B2_DEEP_PROFESSIONAL_PART1.filter(l => l.pillar === 'speaking'),
});
