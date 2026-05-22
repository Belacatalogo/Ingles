import { createGrammarLesson, createVocabularyLesson, createReadingLesson, createListeningLesson, createSpeakingLesson, createWritingLesson } from '../../../schemas/index.js';

const level = 'B2';
const status = 'ready';
const common = { level, status, estimatedMinutes: 65, tags: ['b2-2', 'narratives', 'past-tenses', 'reporting', 'deep-approved-target'] };

function task(instruction, note = '', expected = '') { return { instruction, note, expected }; }

export const B2_DEEP_NARRATIVES_PART1 = Object.freeze([

  // ─── GRAMMAR-004: Past perfect and past perfect continuous ────────────────────
  createGrammarLesson({
    ...common,
    id: 'B2-GRAMMAR-004',
    order: 4,
    title: 'Past perfect and past perfect continuous: narrative depth',
    objectives: [
      'Usar o past perfect (had done) para indicar que uma ação ocorreu antes de outra no passado.',
      'Usar o past perfect continuous (had been doing) para indicar duração antes de um ponto no passado.',
      'Distinguir past simple (sequential past) de past perfect (past before past).',
      'Aplicar ambas as formas em narrativa, análise e contextos profissionais.',
    ],
    teacherOpening: 'At B2, telling a story or explaining a situation means layering time. "When I arrived, the meeting started" (two events in order) is not the same as "When I arrived, the meeting had already started" (the meeting was over or in progress before I arrived). This distinction — the past perfect — is what gives your narrative precision and credibility.',
    portugueseContrast: [task('Em Past perfect and past perfect continuous: narrative depth, observe que a estrutura do inglês difere da ordem natural do português.'), task('Não traduza literalmente; identifique o padrão do inglês antes de produzir.')], 
    whyItMatters: 'In professional contexts — project post-mortems, incident reports, interviews — the ability to correctly sequence events in the past signals analytical precision. "We realised that the data had been corrupted months earlier" is very different from "we realised the data was corrupted."',
    differenceFromA2: 'B1: "She left before I arrived." (past simple sequence) B2: "By the time I arrived, she had already left and had been waiting for over an hour before giving up." (past perfect + past perfect continuous for duration)',
    grammarTable: {
      headers: ['Tempo', 'Estrutura', 'Quando usar', 'Exemplo'],
      rows: [
        ['Past perfect', 'had + past participle', 'Ação anterior a outro ponto no passado', 'By the time the report was published, the situation had changed completely.'],
        ['Past perfect continuous', 'had been + -ing', 'Duração/processo antes de ponto no passado', 'She had been working on the proposal for three weeks when the project was cancelled.'],
        ['Past simple (sequential)', 'V-ed / irregular', 'Eventos em sequência clara', 'He finished the report and sent it.'],
        ['Contrast PP vs PPC', 'had done vs had been doing', 'PP = completed; PPC = ongoing/duration', '"I had written the email" (done). "I had been writing it for an hour" (in process).'],
      ],
    },
    whenToUse: [
      '"Had done": ação claramente completada antes de outro ponto no passado.',
      '"Had been doing": processo ou estado que durou até um ponto no passado.',
      'Com "by the time", "before", "when", "already", "just", "never" — sinalizadores clássicos do past perfect.',
    ],
    whenNotToUse: [
      'Não use past perfect para todos os eventos do passado — use somente quando a anterioridade importa.',
      'Se a sequência já está clara por "first... then...", o past simple é suficiente.',
    ],
    teacherExamples: [
      'When the auditors arrived, the finance team had already prepared all the documents.',
      'She realised she had made a critical error in the first draft.',
      'By the time the new manager joined, three colleagues had resigned.',
      'He had been leading the project for six months when the funding was cut.',
      'They had been negotiating for weeks before reaching an agreement.',
    ],
    commonBrazilianMistakes: [
      { wrong: 'When I arrived, they already left.', right: 'When I arrived, they had already left.', note: '"Already" com ação anterior no passado → past perfect.' },
      { wrong: 'She was working on the report for hours when the power went out.', right: 'She had been working on the report for hours when the power went out.', note: 'Duração antes de interrupção no passado → past perfect continuous.' },
      { wrong: 'I realised that I forgot to attach the file.', right: 'I realised that I had forgotten to attach the file.', note: 'Realização de algo que ocorreu antes → past perfect.' },
    ],
    controlledPractice: [
      task('Rewrite using past perfect or past perfect continuous:', ''),
      task('"The meeting ended before she arrived." → By the time ___'),
      task('"They worked on the project for a year. Then it was cancelled." → They had been working ___'),
      task('"He saw the email. Then he called her." → After he had seen ___'),
    ],
    productionTasks: [
      task('Write 3 sentences about a project, event or situation from your past. Use: (1) past perfect to show sequence, (2) past perfect continuous for duration, (3) "by the time" + past perfect.'),
      task('Write a short paragraph (60-80 words) narrating what had already happened when something changed. Use both PP and PPC.'),
    ],
    lessonRecap: [
      'Past perfect: had + pp → action completed before another past moment',
      'Past perfect continuous: had been + -ing → ongoing process before a past point',
      'Key signals: already, by the time, before, when, just, never',
      'Do NOT use PP/PPC for every past event — only when sequence matters',
    ],
    nextLessonBridge: 'Now you can sequence the past with depth. Next: reporting verbs — "claimed", "insisted", "acknowledged" — to summarise what others said with precision.',
  }),

  // ─── GRAMMAR-005: Reporting verbs B2 ─────────────────────────────────────────
  createGrammarLesson({
    ...common,
    id: 'B2-GRAMMAR-005',
    order: 5,
    title: 'Reporting verbs B2: claimed, alleged, acknowledged, insisted',
    objectives: [
      'Usar reporting verbs além de "said" e "told" para transmitir atitude e stance.',
      'Distinguir o padrão gramatical de cada verbo: + that / + to do / + -ing / + object + to do.',
      'Reconhecer a diferença de stance entre claimed, alleged, insisted, conceded, acknowledged.',
      'Usar backshift corretamente com reporting verbs no passado.',
    ],
    teacherOpening: 'When you summarise what someone said, the verb you choose reveals your interpretation. "He said he was innocent" is neutral. "He claimed he was innocent" implies scepticism. "He admitted he was guilty" implies the fact was damaging. Reporting verbs are how analytical writers interpret — not just report.',
    portugueseContrast: [task('Em Reporting verbs B2: claimed, alleged, acknowledged, insisted, observe que a estrutura do inglês difere da ordem natural do português.'), task('Não traduza literalmente; identifique o padrão do inglês antes de produzir.')], 
    whyItMatters: 'In journalism, academic writing, workplace summaries and discussions, reporting verbs shape meaning. Choosing the right verb signals your analytical stance and controls the reader\'s interpretation.',
    grammarTable: {
      headers: ['Verbo', 'Stance implícita', 'Padrão', 'Exemplo'],
      rows: [
        ['claimed', 'Scepticism — may not be true', 'claimed (that) + clause', 'He claimed that the figures were accurate.'],
        ['alleged', 'Formal scepticism / accusation unproven', 'alleged (that) + clause', 'The report alleged that funds had been misused.'],
        ['acknowledged', 'Acceptance of a (possibly inconvenient) fact', 'acknowledged (that) / acknowledged + -ing', 'She acknowledged that mistakes had been made.'],
        ['insisted', 'Strong, sometimes stubborn, claim', 'insisted (that) / insisted on + -ing', 'He insisted that the data was reliable.'],
        ['conceded', 'Admitting a point reluctantly', 'conceded (that)', 'She conceded that the original plan was flawed.'],
        ['emphasised', 'Highlighting importance deliberately', 'emphasised (that) / emphasised + noun', 'The manager emphasised that deadlines were non-negotiable.'],
        ['warned', 'Alert to risk or consequence', 'warned (that) / warned + object + to do', 'Experts warned that the situation could deteriorate.'],
      ],
    },
    whenToUse: [
      '"Claimed/alleged": when you want to signal the claim is not verified — journalism, legal contexts, academic hedging.',
      '"Acknowledged/conceded": when someone accepts something uncomfortable or unfavourable — strong analytical signal.',
      '"Insisted/maintained": when someone holds a position firmly — often implies others disagree.',
      '"Emphasised": when the speaker wants the listener to pay particular attention to something.',
    ],
    teacherExamples: [
      'The witness claimed she had not been present at the time of the incident.',
      'The manager acknowledged that the project had gone significantly over budget.',
      'The company insisted its products were safe despite growing evidence to the contrary.',
      'The report alleged that internal protocols had been bypassed on multiple occasions.',
      'She conceded that the initial estimate had been unrealistically optimistic.',
      'The expert warned that inaction could lead to irreversible consequences.',
    ],
    commonBrazilianMistakes: [
      { wrong: 'He insisted to go ahead with the plan.', right: 'He insisted on going ahead with the plan.', note: '"Insist on" + gerund OR "insist that" + clause — NOT "insist + to + infinitive".' },
      { wrong: 'She acknowledged to make mistakes.', right: 'She acknowledged making mistakes. / She acknowledged that she had made mistakes.', note: '"Acknowledge" + gerund OR "acknowledge that" — NOT "acknowledge + to + infinitive".' },
      { wrong: 'The report claimed about financial irregularities.', right: 'The report claimed there were financial irregularities. / The report alleged financial irregularities.', note: '"Claim that" + clause or "allege" + noun — no preposition "about" after claim.' },
    ],
    controlledPractice: [
      task('Replace "said" with a more precise reporting verb:', ''),
      task('"She said she hadn\'t been involved." (implying scepticism) → claimed/alleged'),
      task('"He said the deadlines were non-negotiable." (firmly) → insisted / emphasised'),
      task('"The team said they had made errors in the analysis." (accepting it) → acknowledged / conceded'),
      task('"Experts said the situation could worsen." (as a risk) → warned'),
    ],
    productionTasks: [
      task('Write a short summary (60-70 words) of a real or imagined meeting or news story. Use at least 4 different reporting verbs to convey different stances.'),
    ],
    lessonRecap: [
      'claimed/alleged: sceptical — fact not confirmed',
      'acknowledged/conceded: accepting an uncomfortable truth',
      'insisted/maintained: holding a position firmly',
      'emphasised: deliberate highlighting',
      'warned: drawing attention to risk',
      'Patterns: + that / + on + -ing / + object + to do',
    ],
    nextLessonBridge: 'You can now report with precision. Next: past modals for reflection and regret — must have, could have, should have, might have.',
  }),

  // ─── GRAMMAR-006: Past modals for reflection and speculation ─────────────────
  createGrammarLesson({
    ...common,
    id: 'B2-GRAMMAR-006',
    order: 6,
    title: 'Past modals: must have, could have, should have, might have',
    objectives: [
      'Usar "must have" para dedução segura sobre o passado.',
      'Usar "could have / might have" para especulação sobre possibilidade no passado.',
      'Usar "should have / ought to have" para crítica ou conselho retrospectivo.',
      'Usar "would have" em condicionais e especulação sobre o que teria acontecido.',
    ],
    teacherOpening: 'Past modals let you reason about the past — deduce what happened, regret what didn\'t, or speculate about what might have been. These forms appear constantly in analysis, post-mortems, interviews and any time you reflect on past events with nuance.',
    portugueseContrast: [task('Em Past modals: must have, could have, should have, might have, observe que a estrutura do inglês difere da ordem natural do português.'), task('Não traduza literalmente; identifique o padrão do inglês antes de produzir.')], 
    whyItMatters: 'In professional and academic contexts, past modals signal that you are not just reporting facts but thinking critically. "The project failed" is a fact. "The project should have had clearer milestones" is analysis. "It might have succeeded with better communication" is reflection.',
    grammarTable: {
      headers: ['Modal passado', 'Significado', 'Exemplo'],
      rows: [
        ['must have + pp', 'Dedução segura sobre o passado', 'She must have worked all night — the report is perfect.'],
        ['could have + pp', 'Possibilidade no passado (não realizada)', 'He could have warned us earlier but chose not to.'],
        ['might have + pp', 'Possibilidade incerta no passado', 'The error might have occurred during the data transfer.'],
        ['should have + pp', 'Crítica ou conselho retrospectivo (não foi feito)', 'We should have tested the system before the launch.'],
        ['ought to have + pp', 'Obrigação não cumprida (mais formal)', 'The team ought to have been consulted at an earlier stage.'],
        ['would have + pp', 'Consequência hipotética no passado', 'With more time, the results would have been very different.'],
        ['needn\'t have + pp', 'Fez mas era desnecessário', 'You needn\'t have sent a formal report — an email would have sufficed.'],
      ],
    },
    whenToUse: [
      '"Must have": quando você tem forte evidência para uma conclusão sobre o passado.',
      '"Could/might have": quando você especula sobre possibilidades passadas — sem certeza.',
      '"Should have": critique, conselho retrospectivo — "you made a mistake by not doing X".',
      '"Would have": para third conditional ou especulação sobre resultado alternativo.',
    ],
    teacherExamples: [
      'The system must have crashed during the night — all the data is gone.',
      'She could have told us about the conflict earlier.',
      'We should have allocated more time for testing.',
      'The miscommunication might have been avoided with a clear briefing.',
      'With proper planning, the project would have been completed on schedule.',
      'You needn\'t have prepared a full report — we only needed a summary.',
    ],
    commonBrazilianMistakes: [
      { wrong: 'We should have to review the plan.', right: 'We should have reviewed the plan.', note: '"Should have" + past participle — NOT "should have to" + base verb.' },
      { wrong: 'She must have forgot the meeting.', right: 'She must have forgotten the meeting.', note: '"Must have" + past participle, not past simple.' },
      { wrong: 'He could have knew about the issue.', right: 'He could have known about the issue.', note: 'Same — "could have" + past participle.' },
    ],
    controlledPractice: [
      task('Choose the best past modal:', ''),
      task('"The data is missing — the backup ___ failed." (strong deduction) → must have'),
      task('"The team ___ avoided the error if they had checked twice." (missed possibility) → could have'),
      task('"We ___ sent the report earlier." (regret) → should have'),
      task('"With more resources, the outcome ___ been different." (hypothesis) → would have'),
    ],
    productionTasks: [
      task('Think of a project, event or decision from your life that did not go as planned. Write 4-5 sentences using must have, could have, should have, might have, would have.'),
    ],
    lessonRecap: [
      'must have + pp: strong past deduction',
      'could/might have + pp: past possibility (not realised)',
      'should have + pp: retrospective criticism/advice',
      'would have + pp: hypothetical past outcome',
      'needn\'t have + pp: did it but it was unnecessary',
    ],
    nextLessonBridge: 'Your grammar toolkit is growing. Now let\'s build your narrative vocabulary — the verbs, chunks and adjectives that bring a story to life at B2.',
  }),

  // ─── VOCABULARY-004: Narrative verbs ─────────────────────────────────────────
  createVocabularyLesson({
    ...common,
    id: 'B2-VOCABULARY-004',
    order: 4,
    title: 'Narrative verbs: unfold, emerge, escalate, deteriorate, trigger',
    objectives: [
      'Usar "unfold", "emerge", "escalate", "deteriorate" e "trigger" para narrar eventos com nuance.',
      'Distinguir verbos de processo (unfold/escalate) de verbos de causa (trigger/provoke).',
      'Usar estes verbos em contexto de narrativa pessoal e profissional.',
      'Substituir "happen" e "start" por verbos narrativos mais precisos.',
    ],
    topicContext: 'At B2, narratives need verbs that carry implicit meaning about how events developed — not just "happen" or "start" but words that signal momentum, direction and cause.',
    essentialWords: [
      { word: 'unfold', phonetics: '/ʌnˈfəʊld/', definition: 'develop or become known gradually', example: 'Events unfolded rapidly after the announcement.' },
      { word: 'emerge', phonetics: '/ɪˈmɜːdʒ/', definition: 'come to light or come out from something', example: 'Details of the fraud began to emerge during the investigation.' },
      { word: 'escalate', phonetics: '/ˈeskəleɪt/', definition: 'increase rapidly or become more serious', example: 'What began as a minor complaint escalated into a full dispute.' },
      { word: 'deteriorate', phonetics: '/dɪˈtɪəriəreɪt/', definition: 'become worse over time', example: 'Relations between the two departments had been deteriorating for months.' },
      { word: 'trigger', phonetics: '/ˈtrɪɡə/', definition: 'cause something to start or happen', example: 'The audit findings triggered a complete review of company procedures.' },
      { word: 'culminate', phonetics: '/ˈkʌlmɪneɪt/', definition: 'reach a final result or high point', example: 'Years of tension culminated in a formal grievance.' },
      { word: 'ensue', phonetics: '/ɪnˈsjuː/', definition: 'happen afterwards as a result', example: 'A heated debate ensued.' },
      { word: 'shift', phonetics: '/ʃɪft/', definition: 'move or change in direction/focus', example: 'The focus of the investigation shifted from finance to operations.' },
    ],
    chunks: [
      'events unfolded (rapidly / unexpectedly / as predicted)',
      'trigger a response / trigger a crisis / trigger a review',
      'escalate into + noun ("escalate into a full-scale conflict")',
      'culminate in + noun ("culminated in his resignation")',
      'the situation began to deteriorate / deteriorate rapidly',
    ],
    dangerousConfusions: [
      { pair: ['emerge', 'appear'], note: '"Emerge" implies gradual coming to light — often from a hidden state. "Appear" is simply to become visible or to seem. "The truth emerged over weeks" (gradual). "A solution appeared" (became visible/available).' },
      { pair: ['trigger', 'cause'], note: '"Trigger" often implies a precipitating event — the final thing that sets off a chain reaction. "Cause" is more general. "The announcement triggered protests" = it was the specific spark. "Poverty causes suffering" = ongoing cause.' },
    ],
    miniDialogues: [
      { context: 'Post-mortem report', lines: [
        { speaker: 'Analyst', text: 'The crisis escalated because warning signs had been ignored for months.' },
        { speaker: 'Director', text: 'Yes, by the time the problems emerged publicly, the situation had already deteriorated beyond easy repair.' },
      ]},
    ],
    recognitionPractice: [
      task('Fill in: unfold, emerge, escalate, deteriorate, trigger, culminate', ''),
      task('"The situation ___ into a full corporate scandal." → escalated'),
      task('"The truth began to ___ after the whistleblower came forward." → emerge'),
      task('"The project delays ___ in a formal board inquiry." → culminated'),
      task('"The error ___ a complete audit of the system." → triggered'),
    ],
    productionTasks: [
      task('Write a short narrative paragraph (50-60 words) describing a situation that developed negatively. Use at least 3 narrative verbs from this lesson.'),
    ],
  }),

  // ─── VOCABULARY-005: Storytelling chunks ─────────────────────────────────────
  createVocabularyLesson({
    ...common,
    id: 'B2-VOCABULARY-005',
    order: 5,
    title: 'Storytelling chunks: it turned out, as it happened, looking back',
    objectives: [
      'Usar "it turned out", "as it happened" e "looking back" para sinalizar perspectiva temporal.',
      'Usar chunks de retrospectiva para organizar narrativa pessoal ou profissional.',
      'Distinguir chunks de revelação ("it turned out") de chunks de reflexão ("in hindsight").',
      'Produzir narrativa de 60-80 palavras com pelo menos 3 storytelling chunks.',
    ],
    topicContext: 'Fluent B2 storytelling uses chunks that signal perspective, time shift and reflection. These phrases act as narrative signposts — they guide the listener and signal when the speaker is reflecting, revealing or shifting.',
    essentialWords: [
      { word: 'it turned out (that)', phonetics: '', definition: 'the actual result was unexpected', example: 'It turned out that the data had been incorrectly entered from the start.' },
      { word: 'as it happened', phonetics: '', definition: 'as things actually occurred (often coincidental or ironic)', example: 'As it happened, the person we needed to speak to was already in the building.' },
      { word: 'looking back', phonetics: '', definition: 'reflecting on the past from a current perspective', example: 'Looking back, we should have been more cautious about the assumptions we were making.' },
      { word: 'at that point', phonetics: '', definition: 'at that specific moment in the past', example: 'At that point, we had no idea how significant the decision would be.' },
      { word: 'what struck me', phonetics: '', definition: 'what I found most surprising or notable', example: 'What struck me most was how quickly the team adapted to the change.' },
      { word: 'before long', phonetics: '', definition: 'after a short time', example: 'Before long, it became clear that the original plan was unworkable.' },
      { word: 'in the end', phonetics: '', definition: 'as the final result, after everything', example: 'In the end, we decided to postpone the launch by three months.' },
    ],
    chunks: [
      'it turned out that + clause (surprise revelation)',
      'looking back, + reflection ("Looking back, we should have...")',
      'what struck me was + noun/clause',
      'at that point + past/past perfect clause',
      'in the end, + conclusion ("In the end, the decision proved correct.")',
    ],
    miniDialogues: [
      { context: 'Professional interview', lines: [
        { speaker: 'Interviewer', text: 'How did the project unfold?' },
        { speaker: 'Candidate', text: 'At that point, we thought we had everything under control. It turned out the data we were using had a significant flaw. Looking back, we should have run a full audit much earlier. In the end, though, we delivered the project only two weeks late — which, given the circumstances, I consider a success.' },
      ]},
    ],
    recognitionPractice: [
      task('Complete with the appropriate chunk:', ''),
      task('"I thought the meeting would be brief. ___, it lasted three hours." → As it happened'),
      task('"___, I wish we had consulted the team before making the decision." → Looking back'),
      task('"We had no idea what was coming. ___, it was the beginning of a long crisis." → At that point'),
      task('"___ was how calm everyone remained under pressure." → What struck me'),
    ],
    productionTasks: [
      task('Tell a short professional or personal story (4-5 sentences) using at least 3 storytelling chunks.'),
    ],
  }),

  // ─── VOCABULARY-006: Adjectives and adverbs for narrative impact ──────────────
  createVocabularyLesson({
    ...common,
    id: 'B2-VOCABULARY-006',
    order: 6,
    title: 'Adjectives and adverbs for narrative impact: devastating, ironic, inevitably',
    objectives: [
      'Usar adjectivos avaliativos (devastating, ironic, subtle) para colorir narrativas B2.',
      'Usar advérbios de avaliação (inevitably, understandably, remarkably) para expressar perspectiva.',
      'Distinguir adjectivos que descrevem factos de adjectivos que expressam interpretação.',
      'Integrar linguagem avaliativa em produção narrativa oral e escrita.',
    ],
    topicContext: 'Strong narratives use adjectives and adverbs that evaluate and colour events — not just describing what happened, but signalling the speaker\'s interpretation. These are the evaluative tools of B2 storytelling.',
    essentialWords: [
      { word: 'devastating', phonetics: '/ˈdevəsteɪtɪŋ/', definition: 'causing severe shock, damage or grief', example: 'The announcement had a devastating effect on the team\'s morale.' },
      { word: 'ironic', phonetics: '/aɪˈrɒnɪk/', definition: 'happening in a way that is the opposite of expected, often amusing', example: 'It was ironic that the company\'s biggest rival ended up as their main supplier.' },
      { word: 'subtle', phonetics: '/ˈsʌtl/', definition: 'not immediately obvious; delicate', example: 'There were subtle signs of dysfunction long before the crisis became public.' },
      { word: 'inevitable', phonetics: '/ɪnˈevɪtəbl/', definition: 'certain to happen and unable to be avoided', example: 'In hindsight, the collapse seemed inevitable.' },
      { word: 'abrupt', phonetics: '/əˈbrʌpt/', definition: 'sudden and unexpected', example: 'His abrupt resignation left the team without clear leadership.' },
      { word: 'ironically', phonetics: '/aɪˈrɒnɪkli/', definition: 'in a way that is the opposite of what was expected', example: 'Ironically, the budget cuts led to greater innovation.' },
      { word: 'inevitably', phonetics: '/ɪnˈevɪtəbli/', definition: 'as a certain or predictable outcome', example: 'Inevitably, the failure to communicate led to missed deadlines.' },
      { word: 'remarkably', phonetics: '/rɪˈmɑːkəbli/', definition: 'in a way that is surprisingly notable', example: 'Remarkably, the team managed to finish ahead of schedule.' },
    ],
    chunks: [
      'have a devastating effect / impact on',
      'the irony is that + clause',
      'subtle signs / indicators / differences',
      'in hindsight, it seemed inevitable',
      'an abrupt end / change / departure',
    ],
    miniDialogues: [
      { context: 'Recounting a business experience', lines: [
        { speaker: 'Speaker A', text: 'What happened with that partnership?' },
        { speaker: 'Speaker B', text: 'Looking back, the warning signs were subtle — nothing dramatic. But the breakdown was abrupt and devastating for both sides. Ironically, the very thing that had made us partners ended up being the source of the conflict.' },
      ]},
    ],
    productionTasks: [
      task('Write 3 sentences about a past event — one using an adjective from this lesson, one using an adverb, and one using a narrative chunk like "the irony is that" or "in hindsight".'),
    ],
  }),

  // ─── READING-002: A Photograph Found in a Drawer ─────────────────────────────
  createReadingLesson({
    ...common,
    id: 'B2-READING-002',
    order: 2,
    title: 'A Photograph Found in a Drawer — A narrative text for inference',
    objectives: [
      'Fazer inferências sobre atitude, motivação e significado implícito em texto narrativo.',
      'Identificar técnicas narrativas: perspective shift, implicit tension, ambiguity.',
      'Responder perguntas de inferência com evidência textual específica.',
      'Identificar linguagem avaliativa e storytelling chunks em contexto.',
      'Produzir resposta pessoal de 50-70 palavras conectando tema do texto a experiência própria.',
    ],
    readingPurpose: 'Read a narrative text for inference, attitude, implicit meaning and narrative technique. At B2, reading includes understanding what is NOT stated explicitly.',
    preReadingVocabulary: [
      { word: 'faded', definition: 'having lost colour or brightness over time' },
      { word: 'reluctance', definition: 'unwillingness or hesitation' },
      { word: 'reconcile', definition: 'make consistent two conflicting ideas; restore a relationship' },
      { word: 'estranged', definition: 'having become distant or separated from a relationship' },
      { word: 'candid', definition: 'truthful and straightforward, sometimes uncomfortably so' },
    ],
    mainText: `The photograph had been in the drawer for eleven years. Elena knew it was there. She had never quite been able to throw it away, but she had never been able to look at it, either.

On the day she finally did, she had been looking for a passport that she needed for a trip — something routine and practical, with no connection to the past. She found it beneath a layer of old bank statements and two birthday cards she could not remember keeping.

It was smaller than she remembered. Faded, too. The three of them stood outside a white building in what looked like late summer — the light was long and golden. Her brother was grinning at the camera with the slightly self-conscious expression he had always worn when he felt observed. Her mother stood between them, one hand on each of their shoulders, and her expression was the one Elena had almost forgotten: open, unguarded, the expression she had worn before the arguments, before the estrangement, before the long years of cautious and unsatisfying phone calls.

It turned out to be harder to look at than she had expected. Not because of sadness, exactly — though there was sadness — but because of how young they all looked, and because of the particular quality of light, which seemed to suggest that the people in the photograph had no idea what was coming.

She had been staring at it for perhaps ten minutes when her phone rang. It was her brother.

"I found an old photo," she said, without meaning to.

"Of what?" he asked.

She told him. There was a silence — not uncomfortable, but careful.

"I think I know the one," he said at last. "Mum looks happy in it."

"She does," said Elena.

Another silence.

"Should we call her?" he asked.

Elena looked at the photograph again — the golden light, the white building, her mother's unguarded expression.

"Yes," she said. "I think we should."`,
    firstReadTask: task('Read and answer: What does Elena find, and what does this trigger? What is her emotional response?'),
    evidenceQuestions: [
      task('What inference can you draw about Elena\'s relationship with her mother, based on the description of the phone calls?', '', 'The calls are "cautious and unsatisfying" — implies tension, distance or unresolved conflict.'),
      task('What does the phrase "had no idea what was coming" imply about the characters\' futures?', '', 'Things got worse after the photo was taken — the future brought conflict or difficulty.'),
      task('Find the sentence that uses past perfect continuous and explain its effect in the narrative.', '', '"She had been staring at it for perhaps ten minutes when her phone rang." — shows duration that was interrupted, creates a contemplative mood before the interruption.'),
      task('What does the brothers\'s comment "Mum looks happy in it" reveal about the current relationship with their mother?', '', 'Implies she is not happy now — or at least not in the same open way. The comment is bittersweet.'),
    ],
    contextVocabularyTasks: [
      task('Find an adjective in paragraph 3 that means "not hiding anything" or "open".', '', 'unguarded'),
      task('What does "estrangement" mean in context?', '', 'A period of distance or separation from someone you were once close to.'),
    ],
    guidedSummary: task('Write a 3-sentence summary of the text: what happens, what Elena feels, and what the ending suggests.'),
    connectedProduction: task('Write a short paragraph (70-90 words) from Elena\'s perspective. What do you think she is thinking when she says "Yes, I think we should"? Use past modals (must have / should have) and narrative chunks (looking back / what struck me).'),
  }),

  // ─── LISTENING-002: A Turning Point interview ─────────────────────────────────
  createListeningLesson({
    ...common,
    id: 'B2-LISTENING-002',
    order: 2,
    title: 'A Turning Point — Interview about a personal or professional shift',
    objectives: [
      'Identificar turning point, causa e consequência numa entrevista sobre experiência pessoal/profissional.',
      'Reconhecer past perfect, verbos narrativos e chunks de retrospectiva em fala natural.',
      'Responder perguntas de detalhe e inferência após escuta sem transcript.',
      'Praticar shadowing com frases narrativas de alta densidade informacional.',
    ],
    listeningPreparation: [
      'You will hear a podcast interview with Marcus, who describes a turning point in his career.',
      'Key vocabulary: realised, acknowledged, culminated, shifted, inevitably, reporting verbs.',
      'Before listening: What kinds of events cause major professional or personal turning points?',
    ],
    keyWordsToHear: ['had been working', 'must have known', 'claimed', 'acknowledged', 'turning point', 'inevitably', 'what struck me'],
    transcript: `HOST: Welcome back. Today I\'m speaking with Marcus, a project manager turned entrepreneur. Marcus, you\'ve described 2019 as your turning point. What happened?

MARCUS: Well, to give you some context — I had been working at the same consultancy for eight years. I had been promoted twice, managed increasingly large teams. By most measures, I was doing well. But something had been shifting, gradually, for about two years before I made the decision to leave.

HOST: What were the early signs?

MARCUS: They were subtle, honestly. I realised I had been doing the work competently but not enthusiastically. A colleague once claimed I seemed "somewhere else" in meetings — and looking back, he was right. I should have acknowledged that earlier, but I insisted I was fine.

HOST: What actually triggered the change?

MARCUS: There was a project — a big one. It culminated in a major client presentation that I had been preparing for months. And we nailed it. The client was delighted. And immediately afterwards, I felt... nothing. That was what struck me. I thought: if this doesn\'t make me feel something, what will? That was the moment things deteriorated — not the situation, but my tolerance for ignoring the situation.

HOST: That must have been a difficult realisation.

MARCUS: It was, inevitably. I had built a lot of my identity around the role. What I couldn\'t acknowledge at the time was that I had been staying not because I wanted to, but because leaving felt uncertain. Eventually, I left. It turned out to be the best decision of my professional life.

HOST: What would you say to someone facing a similar moment?

MARCUS: I\'d say: the warning signs are always there before they become undeniable. You should have acted on them earlier. Not because of regret — but because inevitably, if you ignore the subtle signals, the decision gets made for you, and often not on your terms.`,
    firstListenTasks: [
      task('What was Marcus\'s main turning point?'),
      task('What was the moment that made him realise he needed to change?'),
    ],
    listeningComprehension: [
      task('What does Marcus say he should have acknowledged earlier?', '', 'That he was not enthusiastic about the work — his colleague had been right.'),
      task('What is ironic about the project that triggered his change?', '', 'The project was a success — "they nailed it" — yet he felt nothing. The success triggered his realisation.'),
      task('Find two examples of past modals in the interview. What do they communicate?', '', '"Should have acknowledged" (retrospective advice/regret). "Must have known" (strong deduction). Shows critical self-reflection.'),
      task('Find three narrative chunks (storytelling language) used by Marcus.', '', '"Looking back", "it turned out", "what struck me"'),
    ],
    shadowing: [
      'Looking back, he was right. I should have acknowledged that earlier, but I insisted I was fine.',
      'What I couldn\'t acknowledge at the time was that I had been staying not because I wanted to, but because leaving felt uncertain.',
      'The warning signs are always there before they become undeniable.',
    ],
    oralProduction: task('Describe a turning point or significant change in your own life or career. Use: had been + -ing, narrative chunks (looking back / what struck me / it turned out), and at least one past modal (should have / could have / must have).', 'Record 90 seconds.'),
  }),

  // ─── SPEAKING-002: Narrative speaking ────────────────────────────────────────
  createSpeakingLesson({
    ...common,
    id: 'B2-SPEAKING-002',
    order: 2,
    title: 'Tell a complex personal narrative: past perfect, reporting verbs, and reflection',
    objectives: [
      'Contar narrativa pessoal complexa com past perfect, verbos de reporte e reflexão.',
      'Estruturar narrativa: context → complication → resolution → reflection.',
      'Usar storytelling chunks (it turned out, looking back, inevitably) em fala espontânea.',
      'Gravar narrativa de 2 minutos com past perfect e reporting verbs em contexto natural.',
    ],
    speakingSituation: 'You are in a job interview, a networking event or a presentation. Someone asks you to describe a significant challenge, failure, success or turning point. You need to tell the story with depth — not just what happened, but what it meant.',
    modelPhrases: [
      'At the time, I had been working on the project for [X period].',
      'What I didn\'t realise was that the situation had been deteriorating for weeks.',
      'It turned out that the assumption we had been working with was flawed.',
      'My manager claimed the timeline was achievable, but looking back, I should have challenged that.',
      'The turning point came when... / What triggered the change was...',
      'What struck me most was...',
      'In the end, I concluded that...',
      'Had I known then what I know now, I would have handled it very differently.',
      'The experience must have shaped my approach, because since then I have always...',
    ],
    pronunciationFocus: {
      title: 'Pronunciation & shadowing',
      tips: [
        'Shadow: "What I didn\'t realise was that the situation had been deteriorating for weeks." Chunk: "what I DIDn\'t reaLISE / was that the situAtion / had been deTERiorating / for WEEKS."',
        '"It turned out that..." — link "turned-out-that" smoothly: /tɜːnd.aʊt.ðət/. Keep "that" weak.',
        '"Had I known then what I know now..." — practise the inverted conditional with stress on KNOWN and NOW.',
        '"Looking back, I should have..." — pause after "back" and stress SHOULD to mark the reflective shift.',
      ],
    },
    guidedSpeaking: [
      { prompt: 'Describe a professional or academic challenge that you faced and eventually resolved.', structure: 'Context (had been... for months) → What happened → Turning point → What struck me → Reflection (looking back / should have)', minWords: 100 },
      { prompt: 'Describe a time when something you expected to go one way turned out very differently.', structure: 'Setup → It turned out that... → past perfect for context → reflection → conclusion (in the end)', minWords: 100 },
    ],
    substitutionDrills: [
      { base: 'By the time [the project ended], I had been [working on it] for [six months].', substitutions: ['the meeting finished / preparing / three hours', 'the course ended / studying the topic / a year', 'the review came / waiting for feedback / two weeks'] },
    ],
    recordingTasks: [
      { prompt: 'Record a 2-minute narrative about a real challenge, failure or turning point in your life. Use: past perfect + past perfect continuous + narrative chunks + at least one reporting verb + at least one past modal for reflection.', duration: '2 minutes', checklist: [
        'Clear narrative arc: beginning, development, turning point, reflection',
        'Past perfect used for background context',
        'At least one past perfect continuous for duration',
        'At least one narrative chunk (looking back / it turned out / what struck me)',
        'At least one reporting verb (claimed / acknowledged / insisted / warned)',
        'At least one past modal for reflection (should have / could have / must have)',
      ]},
    ],
    speakingChecklist: [
      'Clear narrative arc with distinct phases.',
      'Past perfect used at least once for prior context.',
      'Past perfect continuous used for duration/process.',
      'At least one narrative chunk used naturally.',
      'At least one reporting verb to represent someone else\'s perspective.',
      'Reflection with past modal (should have / could have).',
      'Natural delivery — not reading, telling.',
    ],
    freeSpeaking: [
      { topic: 'Describe a decision you made that had unexpected consequences. Reflect on what you should have done differently.' },
      { topic: 'Tell the story of how you ended up in your current role or course. Use narrative verbs and chunks from this unit.' },
    ],
  }),

  // ─── WRITING-002: Narrative paragraph ────────────────────────────────────────
  createWritingLesson({
    ...common,
    id: 'B2-WRITING-002',
    order: 2,
    title: 'Write a narrative paragraph with depth: past perfect, reporting verbs, reflection',
    objectives: [
      'Escrever parágrafo narrativo com past perfect e past perfect continuous para profundidade temporal.',
      'Usar reporting verbs (claimed, acknowledged, insisted) para reportar falas e pensamentos.',
      'Incluir reflexão avaliativa ao final da narrativa (in hindsight, what it taught me).',
      'Produzir parágrafo final de 100-120 palavras após rascunho e revisão.',
    ],
    modelText: `The project had been progressing well for several months when the first signs of trouble emerged. I had been managing a team of six, and at the time I genuinely believed we were on track. Looking back, I should have noticed that two key team members had been quietly struggling with the scope. It turned out that they had been managing an additional workload that nobody had been informed about. When the issue finally surfaced, it had already affected the entire timeline. The experience was, in hindsight, inevitable — subtle signals had been there for weeks. What it taught me was that regular one-to-one conversations matter not just for progress updates, but for understanding what is actually happening beneath the surface.`,
    modelTextBreakdown: [
      { label: 'Past perfect continuous for context', quote: 'The project had been progressing... I had been managing', note: 'Sets the background — ongoing actions before the turning point.' },
      { label: 'Storytelling chunk', quote: 'Looking back', note: 'Signals retrospective reflection — narrator has moved beyond the event.' },
      { label: 'Past perfect for revelation', quote: 'It turned out that they had been managing', note: '"It turned out" + past perfect continuous — double layer of past.' },
      { label: 'Evaluative adverb', quote: 'was, in hindsight, inevitable', note: '"In hindsight" + evaluative adjective — narrative reflection and lesson.' },
      { label: 'Wh-cleft conclusion', quote: 'What it taught me was that...', note: 'Wh-cleft to foreground the lesson — narrative closes with insight.' },
    ],
    writingBlocks: [
      { block: 'Context', instruction: 'Use past perfect continuous to establish what had been happening before the turning point.' },
      { block: 'Signs or trigger', instruction: 'Describe what emerged or what triggered the change. Use narrative verbs (emerge, unfold, trigger, escalate).' },
      { block: 'Revelation', instruction: 'Use "it turned out that" + past perfect for a reveal.' },
      { block: 'Reflection', instruction: 'Use "looking back / in hindsight / what struck me" + past modal for lesson or regret.' },
      { block: 'Conclusion/lesson', instruction: 'Use a Wh-cleft or formal connective to close with insight.' },
    ],
    grammarForWriting: [
      'Past perfect continuous: "had been + -ing" for background duration.',
      '"It turned out that" + past perfect for unexpected reveal.',
      'Evaluative adverbs: "inevitably", "ironically", "remarkably", "in hindsight".',
      'Wh-cleft for conclusion: "What the experience showed me was..."',
    ],
    revisionChecklist: [
      'Past perfect continuous used for background duration.',
      'At least one narrative verb (emerge, escalate, trigger, unfold).',
      '"It turned out" used naturally.',
      'Reflection section uses "looking back" or "in hindsight".',
      'Past modal used for retrospective evaluation (should have / could have).',
      'Wh-cleft or formal connective used in conclusion.',
      'Paragraph length: 130-170 words.',
      'No informal vocabulary or contracted forms.',
    ],
    finalVersionTask: task('Write a narrative paragraph (130-170 words) about a professional or personal experience that did not go as planned. Use the model structure. Topic options:', 'Options: (1) A project that went wrong. (2) A decision that led to unexpected results. (3) A change that was harder than expected.'),
  }),

]);

export const B2_DEEP_NARRATIVES_PART1_BY_PILLAR = Object.freeze({
  grammar: B2_DEEP_NARRATIVES_PART1.filter(l => l.pillar === 'grammar'),
  vocabulary: B2_DEEP_NARRATIVES_PART1.filter(l => l.pillar === 'vocabulary'),
  reading: B2_DEEP_NARRATIVES_PART1.filter(l => l.pillar === 'reading'),
  listening: B2_DEEP_NARRATIVES_PART1.filter(l => l.pillar === 'listening'),
  speaking: B2_DEEP_NARRATIVES_PART1.filter(l => l.pillar === 'speaking'),
  writing: B2_DEEP_NARRATIVES_PART1.filter(l => l.pillar === 'writing'),
});
