import { createGrammarLesson, createVocabularyLesson, createSpeakingLesson } from '../../../schemas/index.js';

const level = 'B2';
const status = 'ready';
const common = { level, status, estimatedMinutes: 65, tags: ['b2-1', 'bridge', 'precision', 'discourse', 'deep-approved-target'] };

function task(instruction, note = '', expected = '') { return { instruction, note, expected }; }

export const B2_DEEP_BRIDGE_PART1 = Object.freeze([

  // ─── GRAMMAR-001: Advanced discourse markers ──────────────────────────────────
  createGrammarLesson({
    ...common,
    id: 'B2-GRAMMAR-001',
    order: 1,
    title: 'Advanced discourse markers: nevertheless, albeit, notwithstanding',
    objectives: [
      'Usar "nevertheless" e "nonetheless" para contrastar com ideia anterior (= even so).',
      'Usar "albeit" para adicionar restrição suave em inglês formal (= although).',
      'Usar "notwithstanding" como conectivo formal de concessão (= despite / in spite of).',
      'Usar "in contrast", "by contrast" e "on the contrary" para contraposição precisa.',
      'Distinguir quando esses marcadores são mais naturais que "but" ou "however".',
    ],
    teacherOpening: 'At B2, your arguments need connective tissue. "But" and "however" are fine — but a B2 speaker also knows when to use "nevertheless" to acknowledge an opposing point without conceding it, or "albeit" to add a quiet qualification. These markers signal fluency and precision.',
    portugueseContrast: [task('Em Advanced discourse markers: nevertheless, albeit, notwithstanding, observe que a estrutura do inglês difere da ordem natural do português.'), task('Não traduza literalmente; identifique o padrão do inglês antes de produzir.')], 
    whyItMatters: 'In professional writing, academic essays, presentations and debates, these markers allow you to build complex arguments without losing the reader. "The project was expensive; nevertheless, it delivered strong results" reads very differently from "but it delivered results."',
    differenceFromA2: 'A2/B1: "The report was late, but it was good." B2: "The report was submitted after the deadline; nevertheless, the quality of the analysis was exceptional." B2 adds precision, register and argumentative nuance.',
    grammarTable: {
      headers: ['Marcador', 'Função', 'Posição', 'Exemplo B2'],
      rows: [
        ['nevertheless / nonetheless', 'Contraste forte — even so', 'Início de frase ou após ponto-e-vírgula', 'The cost was high; nevertheless, the board approved the plan.'],
        ['albeit', 'Concessão suave — although (informal qualifier)', 'Antes de adj/adv/cláusula reduzida', 'It was a successful project, albeit a costly one.'],
        ['notwithstanding', 'Concessão formal — despite', 'Antes de noun phrase ou no início', 'Notwithstanding the delays, the report was well received.'],
        ['in contrast / by contrast', 'Contraposição de dois elementos', 'Início de frase comparando dois lados', 'Company A grew 20%. By contrast, Company B lost market share.'],
        ['on the contrary', 'Correção de suposição errada', 'Início de frase quando negando expectativa', 'He did not fail. On the contrary, he performed exceptionally well.'],
      ],
    },
    whenToUse: [
      '"Nevertheless/nonetheless": quando você concede um ponto adversário mas mantém sua posição — "The data is limited; nevertheless, the trend is clear."',
      '"Albeit": qualificação concisa em inglês escrito e formal falado — "She accepted the offer, albeit reluctantly."',
      '"Notwithstanding": documentos, relatórios, textos jurídicos e acadêmicos — "Notwithstanding the risks, the decision was taken."',
      '"In contrast / by contrast": quando você alinha dois lados de uma comparação — sempre seguido de vírgula.',
      '"On the contrary": somente quando você está corrigindo uma suposição ERRADA — não use como simples contraste.',
    ],
    whenNotToUse: [
      'Não use "on the contrary" como simples contraste — "I like coffee. On the contrary, I like tea." está errado. Use "by contrast" ou "on the other hand".',
      'Não use "albeit" em inglês spoken casual — soa excessivamente formal.',
      'Não confunda "nevertheless" (concessão + contraste) com "therefore" (consequência).',
    ],
    teacherExamples: [
      'The proposal was controversial; nevertheless, it passed with a majority vote.',
      'It was an expensive solution, albeit the most efficient one available.',
      'Notwithstanding the initial resistance, the team adapted quickly to the new system.',
      'The northern region saw a 15% increase. By contrast, the southern region declined.',
      'I am not suggesting we abandon the project. On the contrary, I believe we should double our investment.',
    ],
    commonBrazilianMistakes: [
      { wrong: 'I like the plan. On the contrary, I think it needs adjustment.', right: 'I like the plan. However, I think it needs adjustment.', note: '"On the contrary" é para corrigir suposição errada — não para adicionar contraste simples.' },
      { wrong: 'The results are positive nevertheless the costs are high.', right: 'The results are positive; nevertheless, the costs are high.', note: '"Nevertheless" precisa de ponto-e-vírgula ou ponto antes.' },
      { wrong: 'Albeit the report was incomplete, we proceeded.', right: 'The report was incomplete; nevertheless, we proceeded. / We proceeded, albeit with an incomplete report.', note: '"Albeit" precede adjetivo/cláusula reduzida — não uma cláusula completa com sujeito próprio.' },
    ],
    controlledPractice: [
      task('Complete with nevertheless, albeit, notwithstanding, in contrast or on the contrary.', '', ''),
      task('"The product launch was delayed. ___, sales targets were met." → nevertheless'),
      task('"She agreed, ___ hesitantly." → albeit'),
      task('"___ the budget cuts, the research continued." → Notwithstanding'),
      task('"Urban schools improved significantly. ___, rural schools showed little change." → By contrast'),
      task('"Did the team fail?" "___! They exceeded every target." → On the contrary'),
    ],
    productionTasks: [
      task('Write 3 sentences about a decision or situation — use a different advanced discourse marker in each one.', 'Tente: nevertheless, albeit, notwithstanding'),
      task('Write a short paragraph (50-60 words) comparing two approaches to a problem. Use "by contrast" and "nevertheless".'),
    ],
    lessonRecap: [
      'nevertheless/nonetheless = even so — contraste forte',
      'albeit = although (qualificação suave, antes de adj/adv)',
      'notwithstanding = despite (formal, antes de noun phrase)',
      'in contrast / by contrast = comparar dois lados',
      'on the contrary = corrigir suposição errada (NOT simple contrast)',
    ],
    nextLessonBridge: 'Now that you can link ideas with precision, the next lesson adds another B2 tool: inversion for emphasis — Never have I seen... / Rarely does...',
  }),

  // ─── GRAMMAR-002: Inversion for emphasis ──────────────────────────────────────
  createGrammarLesson({
    ...common,
    id: 'B2-GRAMMAR-002',
    order: 2,
    title: 'Inversion for emphasis: Never have I, Rarely does, Not only...but also',
    objectives: [
      'Usar inversão com advérbios negativos para ênfase: Never have I, Rarely does, Seldom did.',
      'Usar "Not only...but also" com inversão correta na primeira cláusula.',
      'Usar "Hardly/Scarcely/No sooner...than/when" para sequência enfática.',
      'Reconhecer inversão em textos formais, discursos e escrita acadêmica.',
      'Distinguir quando usar inversão (ênfase formal/retórica) vs estrutura normal.',
    ],
    teacherOpening: 'Inversion is one of the most powerful tools in B2+ English. Instead of "I have never seen such commitment," you say "Never have I seen such commitment." The effect is immediate — it commands attention, adds weight and signals advanced proficiency. You will encounter it in speeches, editorials, formal reports and literary writing.',
    portugueseContrast: [task('Em Inversion for emphasis: Never have I, Rarely does, Not only...but also, observe que a estrutura do inglês difere da ordem natural do português.'), task('Não traduza literalmente; identifique o padrão do inglês antes de produzir.')], 
    whyItMatters: 'Inversion turns a flat statement into a forceful one. A single structural shift transforms "I have rarely worked with a more talented team" into "Rarely have I worked with a more talented team." In presentations, interviews and persuasive writing, this makes a significant difference.',
    differenceFromA2: 'B1: "I have never experienced anything like this." B2: "Never have I experienced anything like this." B2 adds rhetorical force and signals sophisticated control of word order.',
    grammarTable: {
      headers: ['Adverbial', 'Inversão', 'Exemplo'],
      rows: [
        ['Never', 'Never + aux + subject + verb', 'Never have I seen such dedication.'],
        ['Rarely / Seldom', 'Rarely/Seldom + aux + subject + verb', 'Rarely does the committee agree unanimously.'],
        ['Not only...but also', 'Not only + aux + subject + verb + ... but also', 'Not only did she finish on time, but she also exceeded targets.'],
        ['Hardly...when', 'Hardly + aux + subject + verb + when + clause', 'Hardly had we started when the system crashed.'],
        ['No sooner...than', 'No sooner + aux + subject + verb + than + clause', 'No sooner had the meeting ended than new problems emerged.'],
        ['Little', 'Little + aux + subject + verb', 'Little did we know the impact it would have.'],
      ],
    },
    whenToUse: [
      'Escrita formal e argumentativa: relatórios, ensaios, apresentações.',
      'Para enfatizar extremidade ou raridade de uma situação.',
      '"Not only...but also" em qualquer argumento onde você quer adicionar impacto cumulativo.',
      '"Little did we know / Little did they realise" para narrativas onde algo importante era desconhecido.',
    ],
    whenNotToUse: [
      'Em conversação casual — soa afetado. Reserve para escrita ou discurso público.',
      'Não misture inversão com sujeito na posição normal: "Never I have seen" está errado.',
      'Não use inversão sem o auxiliar correto no tempo verbal certo.',
    ],
    teacherExamples: [
      'Never have I encountered a more complex situation in my professional life.',
      'Rarely does a single decision have such far-reaching consequences.',
      'Not only did the campaign fail to meet its targets, but it also damaged brand reputation.',
      'Hardly had the CEO announced the restructuring when rumours began to spread.',
      'No sooner had the new system launched than three critical bugs were discovered.',
      'Little did the team realise how much the regulation would change their workflow.',
    ],
    commonBrazilianMistakes: [
      { wrong: 'Never I have seen such a problem.', right: 'Never have I seen such a problem.', note: 'Com inversão, o auxiliar vem ANTES do sujeito.' },
      { wrong: 'Not only she failed the test but also her colleague.', right: 'Not only did she fail the test, but her colleague also did.', note: 'Na cláusula após "not only", use inversão: did + subject + base verb.' },
      { wrong: 'Rarely the manager comes to these events.', right: 'Rarely does the manager come to these events.', note: 'Inversão exige auxiliar — "does" para presente simples.' },
    ],
    controlledPractice: [
      task('Rewrite using inversion for emphasis:', ''),
      task('"I have never witnessed such poor planning." → Never ___'),
      task('"She not only finished early but also helped others." → Not only ___'),
      task('"We had barely started when the electricity went out." → Hardly ___'),
      task('"They rarely take such bold decisions." → Rarely ___'),
    ],
    productionTasks: [
      task('Write 3 sentences about your professional/academic life using inversion: Never have I..., Rarely have I..., Not only did I...'),
      task('Write a short persuasive paragraph (50-60 words) about a decision or achievement. Use at least one inversion for emphasis.'),
    ],
    lessonRecap: [
      'Inversão com advérbios negativos: Never/Rarely/Seldom/Little + aux + subject + verb',
      'Not only + aux + subject + verb..., but also: atenção ao auxiliar',
      'Hardly/Scarcely + aux + subject + verb + when/before',
      'No sooner + aux + subject + verb + than',
      'Uso: ênfase em escrita/discurso formal — NÃO em conversa casual',
    ],
    nextLessonBridge: 'You can now emphasise with inversion. Next: cleft sentences — It was the team that..., What we need is..., All I want is...',
  }),

  // ─── GRAMMAR-003: Cleft sentences ────────────────────────────────────────────
  createGrammarLesson({
    ...common,
    id: 'B2-GRAMMAR-003',
    order: 3,
    title: 'Cleft sentences: It was... that / What I need is / All I want is',
    objectives: [
      'Usar "It-cleft" para colocar foco em sujeito, objeto, tempo ou lugar.',
      'Usar "Wh-cleft" (What I need is...) para focar no predicado.',
      'Usar "All-cleft" (All I want is...) para enfatizar singularidade ou exclusividade.',
      'Reconhecer "clefts" em textos formais, discursos e argumentos.',
      'Produzir clefts naturais em escrita e fala B2.',
    ],
    teacherOpening: 'Cleft sentences allow you to emphasise any element of a sentence by "splitting" it. "The team caused the delay" is neutral. "It was the team that caused the delay" focuses the blame. "What caused the delay was poor planning" focuses the cause. "All we needed was more time" simplifies the problem. These are essential B2 precision tools.',
    portugueseContrast: [task('Em Cleft sentences: It was... that / What I need is / All I want is, observe que a estrutura do inglês difere da ordem natural do português.'), task('Não traduza literalmente; identifique o padrão do inglês antes de produzir.')], 
    whyItMatters: 'In arguments, presentations and written analysis, the ability to shift focus within a sentence is critical. Clefts let you guide the reader\'s attention without changing the facts.',
    differenceFromA2: 'B1: "The team was responsible for the problem." B2: "It was the team\'s decision that created the problem." / "What really concerned us was the lack of communication." The shift gives precision and argumentative power.',
    grammarTable: {
      headers: ['Tipo', 'Estrutura', 'Foco em', 'Exemplo'],
      rows: [
        ['It-cleft', 'It + be + focused element + that/who + rest', 'Sujeito, objeto, tempo, lugar', 'It was the lack of data that led to the wrong decision.'],
        ['Wh-cleft', 'What + clause + be + focused element', 'Predicado / o que importa', 'What the report lacked was a clear conclusion.'],
        ['All-cleft', 'All + clause + be + focused element', 'Unicidade / simplicidade', 'All we need is a consistent strategy.'],
        ['Reversed Wh-cleft', 'Focused element + be + what + clause', 'Inversão do Wh-cleft', 'A consistent strategy is what we need most.'],
      ],
    },
    whenToUse: [
      '"It-cleft": quando você quer isolar quem, o quê, quando ou onde causou algo — argumento, responsabilidade, análise de causa.',
      '"Wh-cleft": quando você quer focar no que está faltando, no que importa ou no que surpreende — "What the data shows is..."',
      '"All-cleft": quando você quer simplificar ou minimizar um problema — "All we need is a clear plan."',
    ],
    whenNotToUse: [
      'Não use clefts em toda frase — diminui o impacto. Reserve para momentos de ênfase real.',
      'Não confunda "It was" (cleft) com "It was" (simples passado de be): "It was cold" ≠ "It was the cold that caused the problem."',
    ],
    teacherExamples: [
      'It was the miscommunication between teams that caused the project to fail.',
      'What surprised everyone was the speed of the recovery.',
      'All the client wanted was a clear timeline and honest updates.',
      'It was not the cost that worried us — it was the risk.',
      'What we are proposing is a gradual, evidence-based approach.',
    ],
    commonBrazilianMistakes: [
      { wrong: 'It was the team who caused the delay of the project.', right: 'It was the team that caused the project delay.', note: 'Para referências a coisas/ideias, use "that" não "who" após It-cleft.' },
      { wrong: 'What we need it is more time.', right: 'What we need is more time.', note: 'Após "what + clause + be", não repita o pronome "it".' },
      { wrong: 'All what I want is to finish this.', right: 'All I want is to finish this.', note: '"All I want" — não use "what" aqui.' },
    ],
    controlledPractice: [
      task('Rewrite to create a cleft sentence with focus on the underlined element:', ''),
      task('"[Poor communication] caused the failure." → It was ___'),
      task('"The report [lacked a clear recommendation]." → What the report lacked was ___'),
      task('"[A longer deadline] would solve the problem." → All we need is ___'),
      task('"[The CEO\'s announcement] changed everything." → It was ___'),
    ],
    productionTasks: [
      task('Write 3 sentences about a work or study situation — use one It-cleft, one Wh-cleft and one All-cleft.'),
      task('Write a short paragraph (60-70 words) arguing a point about your field. Use at least one cleft sentence.'),
    ],
    lessonRecap: [
      'It-cleft: It was + element + that/who + rest → focus on who/what/when/where',
      'Wh-cleft: What + clause + is/was + element → focus on what matters',
      'All-cleft: All + clause + is/was + element → minimise/simplify',
      'Reversed Wh-cleft: Element + is + what + clause',
      'Uso estratégico: não use em toda frase — apenas onde o foco muda o argumento',
    ],
    nextLessonBridge: 'With grammar precision tools in place, you are ready to upgrade your vocabulary. Next: academic discourse verbs — argue, demonstrate, evaluate, imply and how to use them like a B2 speaker.',
  }),

  // ─── VOCABULARY-001: Academic discourse verbs ────────────────────────────────
  createVocabularyLesson({
    ...common,
    id: 'B2-VOCABULARY-001',
    order: 1,
    title: 'Academic discourse verbs: argue, demonstrate, evaluate, imply',
    objectives: [
      'Usar "argue", "demonstrate", "evaluate" e "imply" em contextos académicos e profissionais.',
      'Distinguir "argue" (tomar posição) de "discuss" (explorar múltiplos ângulos).',
      'Diferenciar "imply" (falante sugere) de "infer" (ouvinte conclui).',
      'Usar "refute" (provar errado com evidência) vs "deny" (rejeitar sem evidência).',
      'Produzir 3 frases usando verbos de discurso académico em contexto real.',
    ],
    topicContext: 'These verbs are the building blocks of academic and professional argumentation. They allow you to summarise other people\'s positions, build your own case and signal your analytical stance.',
    essentialWords: [
      { word: 'argue', phonetics: '/ˈɑːɡjuː/', definition: 'put forward a reasoned case or claim', example: 'The author argues that automation benefits workers in the long run.' },
      { word: 'demonstrate', phonetics: '/ˈdemənstreɪt/', definition: 'show clearly with evidence or example', example: 'The data demonstrates a strong correlation between diet and productivity.' },
      { word: 'evaluate', phonetics: '/ɪˈvæljueɪt/', definition: 'assess carefully and reach a conclusion', example: 'The report evaluates three possible strategies and recommends the second.' },
      { word: 'imply', phonetics: '/ɪmˈplaɪ/', definition: 'suggest something without stating it directly', example: 'The tone of the email implies he is not fully committed.' },
      { word: 'contend', phonetics: '/kənˈtend/', definition: 'maintain firmly that something is true', example: 'She contends that the current approach is unsustainable.' },
      { word: 'refute', phonetics: '/rɪˈfjuːt/', definition: 'prove a claim wrong', example: 'The new evidence refutes the earlier assumption.' },
      { word: 'assert', phonetics: '/əˈsɜːt/', definition: 'state confidently and firmly', example: 'He asserts that the decision was justified.' },
      { word: 'highlight', phonetics: '/ˈhaɪlaɪt/', definition: 'draw attention to something important', example: 'The survey highlights a significant gap in services.' },
      { word: 'acknowledge', phonetics: '/əkˈnɒlɪdʒ/', definition: 'accept the truth or existence of something', example: 'The CEO acknowledged that mistakes were made.' },
      { word: 'challenge', phonetics: '/ˈtʃælɪndʒ/', definition: 'question or dispute something', example: 'Several experts challenged the report\'s methodology.' },
    ],
    chunks: [
      'argue that + clause ("The study argues that...")',
      'demonstrate that + clause / demonstrate + noun ("The results demonstrate the need for...")',
      'evaluate the impact / effectiveness / results of',
      'imply that + clause ("This implies that further action is needed.")',
      'acknowledge + noun / acknowledge that ("We must acknowledge the limitations.")',
    ],
    dangerousConfusions: [
      { pair: ['argue', 'discuss'], note: '"Argue" = take a position and defend it. "Discuss" = explore both/multiple sides. "The essay argues X" means it takes a stance. "The essay discusses X" means it examines the topic from various angles.' },
      { pair: ['imply', 'infer'], note: '"Imply" = the speaker/writer suggests. "Infer" = the reader/listener concludes. "She implied he was wrong" (she suggested it). "I inferred from her tone that she was upset" (I concluded it).' },
      { pair: ['refute', 'deny'], note: '"Refute" requires EVIDENCE — you prove something wrong. "Deny" just says it is not true. "Refute the claim" = disprove it. "Deny the claim" = reject it without necessarily proving anything.' },
    ],
    miniDialogues: [
      { context: 'Academic presentation feedback', lines: [
        { speaker: 'Reviewer', text: 'You need to demonstrate your claim with data, not just assert it.' },
        { speaker: 'Presenter', text: 'You are right. I\'ll add the statistical analysis to support the argument.' },
      ]},
      { context: 'Workplace discussion', lines: [
        { speaker: 'Colleague A', text: 'The results imply that we need to revise our pricing strategy.' },
        { speaker: 'Colleague B', text: 'I\'d argue the issue is more about perception than price, actually.' },
      ]},
    ],
    recognitionPractice: [
      task('Choose the correct verb: argue / demonstrate / evaluate / imply / refute', ''),
      task('"The statistics ___ a clear decline in user engagement." → demonstrate'),
      task('"She ___ that the policy had failed, citing three specific examples." → argued'),
      task('"The new data effectively ___ the original hypothesis." → refutes'),
      task('"His hesitation seemed to ___ he was not confident in the decision." → imply'),
    ],
    usagePractice: [
      task('Write a sentence for each: argue, demonstrate, evaluate, imply, acknowledge.', 'Use the context of a project, study, or article you know.'),
    ],
    productionTasks: [
      task('Write 3 sentences summarising the main point of a recent article, documentary or class using these verbs.', 'Use at least 3 different verbs from the lesson.'),
    ],
  }),

  // ─── VOCABULARY-002: Abstract nouns B2 ───────────────────────────────────────
  createVocabularyLesson({
    ...common,
    id: 'B2-VOCABULARY-002',
    order: 2,
    title: 'Abstract nouns B2: implication, consequence, assumption, evidence',
    objectives: [
      'Usar "implication", "consequence", "assumption" e "evidence" em argumentação B2.',
      'Distinguir "consequence" (resultado que acontece) de "implication" (significado/efeito sugerido).',
      'Distinguir "evidence" (suporta uma afirmação) de "proof" (definitivo).',
      'Usar "correlation", "tendency" e "perspective" em análises formais.',
      'Produzir análise de 50-60 palavras com pelo menos 3 substantivos abstractos B2.',
    ],
    topicContext: 'Abstract nouns are the nouns of analysis, argument and formal communication. At B2, you need not just the words themselves but also how to use them in collocations and argument structures.',
    essentialWords: [
      { word: 'implication', phonetics: '/ˌɪmplɪˈkeɪʃn/', definition: 'a likely consequence or suggested meaning', example: 'The implications of this decision are significant for the whole team.' },
      { word: 'consequence', phonetics: '/ˈkɒnsɪkwəns/', definition: 'a result or effect, often negative', example: 'The company failed to consider the long-term consequences of the restructuring.' },
      { word: 'assumption', phonetics: '/əˈsʌmpʃn/', definition: 'something taken for granted without proof', example: 'The plan was based on several questionable assumptions.' },
      { word: 'evidence', phonetics: '/ˈevɪdəns/', definition: 'facts or information supporting a claim', example: 'There is clear evidence that engagement has declined.' },
      { word: 'correlation', phonetics: '/ˌkɒrəˈleɪʃn/', definition: 'a connection or relationship between two things', example: 'Researchers found a strong correlation between sleep and performance.' },
      { word: 'tendency', phonetics: '/ˈtendənsi/', definition: 'an inclination to do or think in a certain way', example: 'There is a tendency to underestimate the complexity of the task.' },
      { word: 'perspective', phonetics: '/pəˈspektɪv/', definition: 'a particular way of viewing something', example: 'From an environmental perspective, the proposal raises serious concerns.' },
      { word: 'implication', phonetics: '/ˌɪmplɪˈkeɪʃn/', definition: 'a suggested consequence or meaning', example: 'What are the implications of this research for public policy?' },
    ],
    chunks: [
      'the implications of + noun ("the implications of this policy")',
      'have serious / significant / far-reaching consequences',
      'challenge / question an assumption',
      'clear / strong / compelling evidence that + clause',
      'a strong / weak / positive / negative correlation between X and Y',
      'from a [professional / ethical / practical] perspective',
    ],
    dangerousConfusions: [
      { pair: ['consequence', 'implication'], note: '"Consequence" is a result that has happened or will happen (cause → effect). "Implication" is a possible meaning, effect or indirect suggestion. A decision has consequences. An argument has implications.' },
      { pair: ['assumption', 'hypothesis'], note: '"Assumption" is taken for granted, often unexamined. "Hypothesis" is a testable claim made deliberately. Assumptions are revealed; hypotheses are tested.' },
      { pair: ['evidence', 'proof'], note: '"Evidence" supports a claim but may not be conclusive. "Proof" is definitive. In academic/professional contexts, prefer "evidence" unless something is 100% certain.' },
    ],
    miniDialogues: [
      { context: 'Research review meeting', lines: [
        { speaker: 'Lead researcher', text: 'The key assumption here is that users prefer simplicity. We need evidence to support that.' },
        { speaker: 'Analyst', text: 'The survey data actually provides strong evidence — 78% rated simplicity as their top priority.' },
      ]},
    ],
    recognitionPractice: [
      task('Fill in: implication, consequence, assumption, evidence, correlation, tendency', ''),
      task('"There is a ___ between high stress and reduced creativity." → correlation'),
      task('"The team made a serious ___ that the deadline was flexible." → assumption'),
      task('"The ___ of failing to act now could be irreversible." → consequences (plural)'),
      task('"From a financial ___, the merger makes perfect sense." → perspective'),
    ],
    productionTasks: [
      task('Write a paragraph (50-60 words) analysing a decision or situation. Use at least 3 abstract nouns from this lesson.'),
    ],
  }),

  // ─── VOCABULARY-003: Formal synonyms and register shifters ───────────────────
  createVocabularyLesson({
    ...common,
    id: 'B2-VOCABULARY-003',
    order: 3,
    title: 'Formal synonyms: obtain, require, significant, sufficient and register',
    objectives: [
      'Usar "obtain", "require", "significant", "sufficient", "commence" e "ensure" em inglês formal.',
      'Distinguir "significant" (importa para uma conclusão) de "considerable" (quantidade grande).',
      'Distinguir "sufficient" (bastante em quantidade) de "satisfactory" (aceitável em qualidade).',
      'Transformar frases casuais em inglês formal usando os sinónimos aprendidos.',
      'Escrever email profissional curto de 50-70 palavras em registo formal.',
    ],
    topicContext: 'B2 English requires you to shift between informal and formal registers. This lesson maps common casual words to their formal equivalents — essential for professional emails, reports and academic writing.',
    essentialWords: [
      { word: 'obtain', phonetics: '/əbˈteɪn/', definition: 'get or acquire (formal)', example: 'Participants can obtain a copy of the report from the website.' },
      { word: 'require', phonetics: '/rɪˈkwaɪə/', definition: 'need (formal/neutral)', example: 'This role requires at least five years of experience.' },
      { word: 'significant', phonetics: '/sɪɡˈnɪfɪkənt/', definition: 'important, notable or large (formal)', example: 'There has been a significant improvement in productivity.' },
      { word: 'sufficient', phonetics: '/səˈfɪʃnt/', definition: 'enough (formal/neutral)', example: 'The evidence is not sufficient to draw firm conclusions.' },
      { word: 'commence', phonetics: '/kəˈmens/', definition: 'begin (formal)', example: 'The conference will commence at 9 a.m.' },
      { word: 'conclude', phonetics: '/kənˈkluːd/', definition: 'finish or reach a final decision (formal)', example: 'The board concluded that the merger was the best option.' },
      { word: 'ensure', phonetics: '/ɪnˈʃʊə/', definition: 'make certain (formal)', example: 'Please ensure all documents are submitted by Friday.' },
      { word: 'indicate', phonetics: '/ˈɪndɪkeɪt/', definition: 'show or suggest (formal)', example: 'The data indicates a positive trend.' },
    ],
    chunks: [
      'a significant increase / improvement / decrease in',
      'sufficient time / resources / evidence to + verb',
      'require + noun / require + subject + to + infinitive',
      'ensure (that) + clause ("Please ensure that all sections are complete.")',
      'indicate that + clause ("The results indicate that...")',
    ],
    dangerousConfusions: [
      { pair: ['sufficient', 'satisfactory'], note: '"Sufficient" = enough in quantity. "Satisfactory" = acceptable in quality. "Sufficient evidence" = enough of it. "Satisfactory performance" = meets the required standard.' },
      { pair: ['significant', 'considerable'], note: 'Both mean large/important but "significant" often implies it matters for a conclusion. "Considerable" tends to emphasise size/amount. "A significant difference" is meaningful. "A considerable amount" is a large amount.' },
    ],
    miniDialogues: [
      { context: 'Email register shift', lines: [
        { speaker: 'Informal', text: 'Hey, can you get the report to me before Thursday? It\'s pretty important.' },
        { speaker: 'Formal', text: 'Please ensure the report is submitted by Thursday. This matter requires prompt attention.' },
      ]},
    ],
    recognitionPractice: [
      task('Replace the casual word with a formal equivalent:', ''),
      task('"We need to get approval before we start." → obtain / require / commence'),
      task('"There\'s been a big change in how people work." → significant'),
      task('"We have enough data to proceed." → sufficient'),
    ],
    usagePractice: [
      task('Rewrite these casual sentences in a professional/formal register:', ''),
      task('"We need everyone to show up on time." → formal'),
      task('"There are some big problems with the current plan." → formal'),
      task('"We got the results we needed." → formal'),
    ],
    productionTasks: [
      task('Write a short formal email (50-70 words) to a colleague about a project update. Use at least 4 formal words from this lesson.'),
    ],
  }),

  // ─── SPEAKING-001: Structured opinion with B2 discourse markers ───────────────
  createSpeakingLesson({
    ...common,
    id: 'B2-SPEAKING-001',
    order: 1,
    title: 'Give a structured opinion: B2 discourse markers in action',
    objectives: [
      'Apresentar opinião estruturada com position → evidence → concession → conclusion.',
      'Usar "nevertheless", "albeit", "in contrast" e "not only...but also" em fala espontânea.',
      'Reconhecer e responder ao ponto de vista oposto sem perder a posição original.',
      'Gravar opinião estruturada de 2 minutos com marcadores discursivos B2.',
      'Usar pelo menos uma estrutura cleft ou inversion em produção oral.',
    ],
    speakingSituation: 'You are presenting your view on a complex topic — technology, work, society or education — in a professional or academic context. You need to be clear, structured and nuanced, using B2 discourse markers to link ideas.',
    modelPhrases: [
      'From my perspective, the most important factor is...',
      'I would argue that the benefits outweigh the drawbacks, albeit not unconditionally.',
      'The evidence clearly demonstrates that...',
      'Nevertheless, one cannot ignore the fact that...',
      'Not only does this affect individuals, but it also has implications for...',
      'What concerns me most is the long-term consequence of...',
      'To be fair, there are those who contend that...',
      'It was this pattern of behaviour that ultimately led to...',
      'In contrast to what many assume, the data suggests...',
      'All things considered, I would conclude that...',
    ],
    pronunciationFocus: {
      title: 'Pronunciation & shadowing',
      tips: [
        'Shadow: "Nevertheless, one cannot ignore the fact that..." — stress NEVerthe-LESS and igNORE. Practise linking "cannot-ignore" as one unit.',
        '"Not only does this affect individuals, but it also..." — use rising intonation on "individuals" and falling on "also" to signal the two-part contrast.',
        '"Albeit" — pronounce /ɔːlˈbiːɪt/ (three syllables). Practise: "albeit not unconditionally" as one chunk.',
        '"All things considered" — say it as a single rhythmic unit with stress on THINGS and conSIDered.',
      ],
    },
    guidedSpeaking: [
      { prompt: 'What is your view on remote work becoming permanent?', structure: 'Open with position → evidence/example → concession (nevertheless/albeit) → conclusion', minWords: 80 },
      { prompt: 'Do you think social media does more harm than good? Defend your position.', structure: 'State stance → use "not only...but also" → use "in contrast" to acknowledge other side → "nevertheless" to hold position', minWords: 80 },
    ],
    substitutionDrills: [
      { base: 'From my perspective, [the issue] is more complex than it appears.', substitutions: ['the situation', 'the debate', 'this problem'] },
      { base: 'The evidence demonstrates that [remote work] increases productivity.', substitutions: ['regular feedback', 'collaborative tools', 'flexible hours'] },
    ],
    recordingTasks: [
      { prompt: 'Choose a topic you know well (education, environment, technology, work). Record a 2-minute structured opinion. Use: nevertheless, albeit, in contrast, not only...but also, and at least one cleft or inversion.', duration: '2 minutes', checklist: [
        'Clear opening position stated',
        'At least one B2 discourse marker used',
        'Evidence or example given',
        'Opposite view acknowledged',
        'Conclusion restates position',
        'Cleft or inversion attempted',
      ]},
      { prompt: 'React to this statement: "Technology is making people less capable, not more." Agree, disagree or partially agree — but defend your view with arguments.', duration: '90 seconds' },
    ],
    speakingChecklist: [
      'I stated my position clearly at the start.',
      'I used at least one advanced discourse marker (nevertheless, albeit, notwithstanding, in contrast).',
      'I acknowledged the opposite view without losing my stance.',
      'I used evidence or a specific example.',
      'I used at least one cleft (It was... that / What... is) or inversion (Never have I...).',
      'My conclusion came back to my original position.',
      'I avoided filler words ("um", "like", "you know").',
    ],
    freeSpeaking: [
      { topic: 'Is artificial intelligence a threat or an opportunity? Give your structured opinion in 2 minutes.' },
      { topic: 'Think of a decision made by your company, school or government that you disagreed with. Explain why, using the language from this lesson.' },
    ],
  }),

]);

export const B2_DEEP_BRIDGE_PART1_BY_PILLAR = Object.freeze({
  grammar: B2_DEEP_BRIDGE_PART1.filter(l => l.pillar === 'grammar'),
  vocabulary: B2_DEEP_BRIDGE_PART1.filter(l => l.pillar === 'vocabulary'),
  speaking: B2_DEEP_BRIDGE_PART1.filter(l => l.pillar === 'speaking'),
});
