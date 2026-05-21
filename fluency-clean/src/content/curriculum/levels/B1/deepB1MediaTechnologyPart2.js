import { createVocabularyLesson, createReadingLesson, createListeningLesson } from '../../../schemas/index.js';

const level = 'B1';
const status = 'ready';
const common = { level, status, estimatedMinutes: 60, tags: ['b1-7', 'media', 'technology', 'society', 'deep-approved-target'] };

function task(instruction, note = '', expected = '') { return { instruction, note, expected }; }
function q(question, answer, evidence = '', why = '') { return { question, answer, evidence, why }; }

export const B1_DEEP_MEDIA_TECHNOLOGY_PART2 = Object.freeze([

  // ─── READING-007: A technology and society article ────────────────────────────
  createReadingLesson({
    ...common,
    id: 'B1-READING-007',
    order: 7,
    readingStrategy: [
      task('Antes de ler: o título é "The attention economy". Preveja: o texto vai falar de dinheiro, redes sociais, foco? Anote sua hipótese.', 'Predição pelo título.'),
      task('Primeira leitura (gist): leia rápido e identifique a ideia central — como a atenção virou um recurso disputado.', 'Gist da ideia central.'),
      task('Segunda leitura (scan): localize como as empresas capturam atenção e as consequências apontadas; marque conectores de causa/efeito (because, as a result, therefore).', 'Scanning por causa e efeito.'),
      task('Evidência: antes de responder, copie a frase exata do texto que sustenta sua resposta.', 'Evidência textual.'),
    ],
    title: 'Reading: The attention economy',
    objectives: [
      'Ler um artigo sobre o impacto da tecnologia na atenção humana com compreensão de argumento.',
      'Identificar o problema central, as causas e as evidências apresentadas pelo autor.',
      'Inferir o significado de expressões de mídia crítica em contexto.',
      'Praticar leitura crítica com perguntas de evidência e inferência.',
    ],
    preReading: {
      question: 'How often do you check your phone during the day? Do you think you are able to concentrate for long periods without checking notifications?',
      vocabularyPreview: ['attention span', 'distraction', 'monetise', 'notify', 'engagement'],
    },
    mainText: `The attention economy: who is really in control?

Every time you pick up your phone and find yourself scrolling without a clear reason, you are participating in what economists and psychologists now call the "attention economy". The idea is straightforward: your attention is a finite resource, and technology companies compete aggressively to capture and monetise it.

The numbers are striking. Studies suggest that the average person checks their phone somewhere between 80 and 150 times a day. Notification systems are not designed to help you — they are designed to interrupt you at the moment most likely to pull you back to the platform. Research on variable reward schedules — the same mechanism that makes gambling addictive — suggests that this is deliberate. Every time you check your phone and find something new, your brain receives a small hit of dopamine. This trains you to keep checking.

What makes the attention economy particularly insidious is that it is largely invisible. When you sit down to watch a series on a streaming platform, you might feel you are making a free choice. But the autoplay feature that starts the next episode in three seconds is not neutral — it is an architectural decision designed to reduce your autonomy without you noticing.

Critics of this analysis argue that individuals bear some responsibility for their own attention habits. Technology, they say, is a tool — and tools do not have agency. If people spend too much time scrolling, the problem lies with personal discipline, not with platform design.

This is a reasonable position, but it underestimates the scale of the engineering effort directed at reducing that discipline. Hundreds of engineers, psychologists and data scientists are employed to optimise these platforms for maximum engagement. Expecting individual willpower to compete with that level of institutional investment seems unrealistic.

The solution, most experts agree, is not to blame the individual but to regulate the industry. Treating excessive screen time as a failure of personal responsibility is like treating a gambling addiction as a lack of willpower — it ignores the systems specifically designed to exploit human psychology.`,
    vocabulary: [
      task(
        'No primeiro parágrafo, o autor descreve a atenção como "a finite resource". O que significa "finite" neste contexto?',
        'Inferência de contexto — oposto de infinito.',
        '"Finite" = limitado, com fim. Sua atenção diária é finita — você só tem X horas de foco disponível. Empresas de tecnologia competem por essa quantidade limitada de atenção.'
      ),
      task(
        'O que significa "variable reward schedule" no segundo parágrafo, e por que o autor o compara com jogo de azar?',
        'Inferência de função + comparação com gambling.',
        '"Variable reward schedule" = sistema de recompensa variável — você recebe recompensa (nova mensagem, like, notícia) de forma imprevisível. A comparação com jogo de azar é feita porque a imprevisibilidade do prêmio é o que torna o comportamento viciante: você nunca sabe se desta vez vai ter algo novo.'
      ),
      task(
        'O autor usa "insidious" para descrever a economia de atenção no terceiro parágrafo. O que esta palavra sugere sobre o tom do autor?',
        'Inferência de tom e connotação lexical.',
        '"Insidious" = algo perigoso que age de forma gradual e disfarçada, difícil de perceber. O uso revela que o autor considera a economia de atenção não apenas problemática, mas ativamente manipuladora — um julgamento moral, não apenas descritivo.'
      ),
    ],
    comprehensionQuestions: [
      q(
        'What is the "attention economy", according to the first paragraph?',
        'The idea that human attention is a finite resource and technology companies compete aggressively to capture and monetise it.',
        'Your attention is a finite resource, and technology companies compete aggressively to capture and monetise it.',
        'The definition is the core premise of the whole article — the student must identify it precisely.'
      ),
      q(
        'According to the second paragraph, what is the purpose of notification systems?',
        'They are designed to interrupt users at the moment most likely to pull them back to the platform — not to help users.',
        'Notification systems are not designed to help you — they are designed to interrupt you at the moment most likely to pull you back to the platform.',
        'The key contrast: "not designed to help you" vs "designed to interrupt you". The motive is platform engagement, not user benefit.'
      ),
      q(
        'What example does the author use in paragraph three to show that user autonomy is reduced "without you noticing"?',
        'The autoplay feature that starts the next episode in three seconds — presented as a neutral feature but actually an architectural decision designed to reduce autonomy.',
        'The autoplay feature that starts the next episode in three seconds is not neutral — it is an architectural decision designed to reduce your autonomy without you noticing.',
        'The example of autoplay is used to make the abstract concept ("invisible manipulation") concrete and recognisable.'
      ),
      q(
        'What counter-argument does the author present in paragraph four? How does the author respond to it?',
        'Counter: individuals bear responsibility for their own attention habits — technology is a tool without agency. Response: this underestimates the scale of engineering effort directed at reducing personal discipline.',
        'Critics argue individuals bear some responsibility... This is a reasonable position, but it underestimates the scale of the engineering effort directed at reducing that discipline.',
        'The author uses concession ("This is a reasonable position") then rebuttal ("but it underestimates...") — standard academic argumentation.'
      ),
      q(
        'What solution does the author propose, and what comparison do they use in the final paragraph?',
        'Industry regulation — not individual blame. Comparison: treating excessive screen time as personal failure is like treating gambling addiction as lack of willpower.',
        'The solution... is not to blame the individual but to regulate the industry. Treating excessive screen time as a failure of personal responsibility is like treating a gambling addiction as a lack of willpower.',
        'The gambling comparison returns from paragraph two, creating structural coherence. The solution (regulation) is contrasted with the individual-blame approach.'
      ),
    ],
    guidedSummary: {
      instruction: 'Escreva um resumo de 4-5 frases. Inclua: (1) o que é a economia de atenção, (2) como as plataformas capturam atenção, (3) o argumento contra (responsabilidade individual), (4) a resposta do autor, (5) a solução proposta.',
      modelAnswer: 'The article explains that human attention is a finite resource that technology companies actively compete to capture and monetise, which the author calls the "attention economy". Platforms use notification systems and variable reward schedules — similar to gambling mechanics — to keep users returning repeatedly. Some critics argue that individuals are responsible for managing their own attention, and that technology is a neutral tool. However, the author responds that this ignores the enormous engineering effort specifically designed to reduce personal willpower. The proposed solution is industry regulation rather than individual responsibility, since blaming the individual ignores the systems deliberately built to exploit human psychology.',
    },
    productionTask: task(
      'Escreva 3-4 frases respondendo: "Do you agree that the solution to excessive screen time should be industry regulation rather than individual responsibility? Why?" Use evidências ou argumentos do texto para apoiar a sua posição.',
      'Use: I agree/disagree with the author\'s claim that... / The argument about... is convincing because... / However, one could argue...',
      'I largely agree with the author\'s argument that regulation is more effective than individual responsibility. The comparison with gambling addiction is particularly convincing — when systems are specifically engineered to exploit psychology, individual willpower cannot realistically compete. However, I think both approaches are necessary: individuals should develop media literacy, while regulators address the structural incentives that prioritise engagement over user well-being.'
    ),
  }),

  // ─── LISTENING-007: A podcast-style discussion about technology ───────────────
  createListeningLesson({
    ...common,
    id: 'B1-LISTENING-007',
    order: 7,
    title: 'Listening: Should we use less technology?',
    objectives: [
      'Compreender uma discussão informal sobre tecnologia com posições opostas.',
      'Identificar modais de deduction e gerúndio/infinitivo em uso natural.',
      'Reconhecer linguagem de concessão e contra-argumento.',
      'Praticar shadowing de estruturas de debate e opinião.',
    ],
    transcript: [
      'Host: Welcome back. Today we\'re asking: should we be using less technology? I\'ve got two guests with opposite views. Nadia, you think we need a digital detox. Why?',
      'Nadia: Well, I think we\'ve created a situation where most people are constantly connected without ever questioning whether that\'s good for them. The research on attention spans must be alarming to anyone who works in education. Children are finding it harder and harder to concentrate.',
      'Host: And Marcus, you disagree?',
      'Marcus: I do. I think the problem is being overstated. People have always complained about new technologies disrupting attention — the printing press, the telephone, television. Every generation thinks the latest invention must be uniquely dangerous.',
      'Nadia: That\'s a fair point. But I\'d argue this is different. We\'re not just talking about distraction — we\'re talking about systems specifically designed to exploit psychological vulnerabilities.',
      'Marcus: Which is why I think regulation is the answer, not asking people to stop using technology. I avoid taking my phone to bed, I\'ve stopped using certain apps — but that\'s my choice. Telling people to use less technology feels paternalistic.',
      'Nadia: I agree with that actually. I\'m not suggesting people should give up technology — that\'s not realistic. What I\'m saying is that we need to become more intentional about using it. The difference between scrolling for three hours without realising it and choosing to watch one documentary is enormous.',
      'Marcus: True. And that might be worth teaching in schools — media literacy, digital awareness, how algorithms work.',
      'Nadia: Absolutely. It\'s not about using less technology, it\'s about using it more consciously. The companies behind these platforms must be aware of the effects they\'re having. The question is whether they\'re willing to change.',
      'Marcus: That\'s where I\'m less optimistic. Their business model depends on engagement. Expecting them to voluntarily reduce the thing they profit from seems unlikely.',
      'Host: So both of you agree that regulation might be the answer?',
      'Nadia: More or less. Regulation combined with education. One without the other probably won\'t work.',
      'Marcus: Agreed. Though I\'d add that the most important thing is individual awareness. Even if regulation takes years, people can start making conscious choices right now.',
    ],
    comprehensionQuestions: [
      q(
        'What research does Nadia mention to support her concern about technology?',
        'Research on attention spans — suggesting that children are finding it harder to concentrate.',
        'The research on attention spans must be alarming to anyone who works in education. Children are finding it harder and harder to concentrate.',
        '"Must be alarming" = modal of deduction based on evidence. Nadia uses the research as support, not proof.'
      ),
      q(
        'What is Marcus\'s main counter-argument in his first response?',
        'That the problem is being overstated — every generation has complained about new technology being uniquely dangerous, from the printing press to television.',
        'People have always complained about new technologies disrupting attention — the printing press, the telephone, television. Every generation thinks the latest invention must be uniquely dangerous.',
        'This is a historical relativism argument: what seems new and dangerous probably isn\'t — it\'s just the latest version of an old concern.'
      ),
      q(
        'What distinction does Nadia make in her third speaking turn?',
        'She distinguishes between distraction (general) and systems specifically designed to exploit psychological vulnerabilities — arguing this situation is qualitatively different from past technology.',
        'We\'re not just talking about distraction — we\'re talking about systems specifically designed to exploit psychological vulnerabilities.',
        '"Not just... but... specifically designed" — Nadia concedes Marcus\'s point partially then redirects with a stronger claim.'
      ),
      q(
        'By the end of the conversation, what do both Nadia and Marcus agree on?',
        'That regulation combined with education is likely the best solution — though Marcus adds that individual awareness is also important and can start immediately.',
        'Regulation combined with education. One without the other probably won\'t work. / The most important thing is individual awareness. Even if regulation takes years, people can start making conscious choices right now.',
        'The debate ends in partial agreement — both positions converge on a nuanced solution rather than a simple binary.'
      ),
      q(
        'Why is Marcus sceptical about companies voluntarily reducing engagement?',
        'Because their business model depends on engagement — and expecting them to voluntarily reduce what they profit from seems unlikely.',
        'Their business model depends on engagement. Expecting them to voluntarily reduce the thing they profit from seems unlikely.',
        'This uses modal speculation: "seems unlikely" = low probability based on reasoning. Marcus uses deduction here, not just opinion.'
      ),
    ],
    vocabulary: [
      task(
        'Marcus says the problem is "being overstated". What does this mean?',
        'Inferência de contexto — Marcus usa para contrariar Nadia.',
        '"Being overstated" = sendo exagerado / descrito como maior ou mais sério do que realmente é. Marcus acredita que o impacto negativo da tecnologia está sendo apresentado de forma mais grave do que os dados justificam.'
      ),
      task(
        'Nadia uses the word "paternalistic" (Marcus\'s word). What does this suggest?',
        'Inferência de connotação — Marcus usa para criticar a proposta de "usar menos tecnologia".',
        '"Paternalistic" = tratar adultos como crianças que precisam de orientação — presumir que sabemos o que é melhor para os outros. Marcus usa para criticar a ideia de dizer às pessoas que usem menos tecnologia, sugerindo que viola a autonomia individual.'
      ),
      task(
        'What does "media literacy" mean in Marcus\'s suggestion about schools?',
        'Inferência de contexto de educação + tema de mídia.',
        '"Media literacy" = a capacidade de analisar, avaliar e criar conteúdo de mídia de forma crítica. Inclui entender como algoritmos funcionam, identificar bias, reconhecer clickbait e desinformação.'
      ),
    ],
    shadowing: [
      task(
        'I think we\'ve created a situation where most people are constantly connected without ever questioning whether that\'s good for them.',
        '"Constantly connected" com ênfase em "constantly". "Without ever questioning" = flow natural com pausa leve. Entonação cai em "for them".',
      ),
      task(
        'We\'re not just talking about distraction — we\'re talking about systems specifically designed to exploit psychological vulnerabilities.',
        'Contraste entre "not just" e "specifically designed". Pausa natural após o travessão. Ênfase em "specifically designed to exploit".',
      ),
      task(
        'The most important thing is individual awareness. Even if regulation takes years, people can start making conscious choices right now.',
        '"Even if" com pausa antes. "Start making" = gerúndio após modal. "Right now" com ênfase final para fazer o argumento soar urgente.',
      ),
    ],
    oralProduction: task(
      'Grave uma resposta de 60-90 segundos para: "Do you think people today use too much technology? What could be done about it?" Use pelo menos 3 estruturas desta unidade: must/might/could be, gerúndio/infinitivo, linguagem de opinião (to my mind, that said, on balance).',
      'Estruture: posição → evidência/exemplo → concessão → solução.',
      'To my mind, most people do use technology excessively — but I\'d argue the problem isn\'t technology itself, it\'s the design of platforms that prioritise engagement over well-being. That said, I can see both sides: technology has made communication and learning more accessible than ever. On balance, I think the solution must involve both regulation and education. Simply telling people to use less technology seems unrealistic. What might actually work is teaching people how algorithms work so they can make more conscious choices about what they consume.'
    ),
  }),

  // ─── VOCABULARY-014: Society and community vocabulary ─────────────────────────
  createVocabularyLesson({
    ...common,
    id: 'B1-VOCABULARY-014',
    order: 14,
    title: 'Society and community vocabulary',
    objectives: [
      'Usar vocabulário preciso para descrever questões sociais, cidadania e comunidade.',
      'Reconhecer e usar expressões de mudança social: raise awareness, campaign for, bring about change.',
      'Distinguir termos de debate social: inequality, poverty, integration, diversity, privilege.',
      'Falar sobre responsabilidades individuais e coletivas em sociedade.',
    ],
    teacherOpening: 'Falar sobre sociedade em inglês B1 vai muito além de "people should be nicer". Esta aula cobre o vocabulário necessário para discutir desigualdade, comunidade, mudança social e responsabilidade com precisão e maturidade. São termos que aparecem constantemente em notícias, debates e conversas sobre o mundo atual.',
    essentialWords: [
      { word: 'inequality', definition: 'desigualdade — diferença de recursos, oportunidades ou direitos', example: 'Economic inequality has increased significantly in many countries over the last 30 years.', brazilianNote: '"Inequality" (substantivo) / "unequal" (adjetivo). Em inglês, muito frequente em discussões sobre saúde, educação e renda. Collocações: "income inequality", "racial inequality", "gender inequality".' },
      { word: 'diversity', definition: 'diversidade — variedade de pessoas, perspectivas e experiências', example: 'The company has made diversity and inclusion a core part of its hiring strategy.', brazilianNote: '"Diversity" = diversidade em sentido amplo. "Diversity and inclusion" é uma expressão muito usada no mundo corporativo e educacional. "Diverse" = adjetivo: "a diverse team".' },
      { word: 'community', definition: 'comunidade — grupo de pessoas que compartilham algo (lugar, interesse, identidade)', example: 'The local community organised a fundraiser to support the new youth centre.', brazilianNote: '"Community" pode ser uma comunidade geográfica (neighborhood) ou de interesse (online community). "The community" = a comunidade local, sem artigo quando é genérico: "community support", "community values".' },
      { word: 'campaign (for)', definition: 'fazer campanha (por) / defender uma causa ativamente', example: 'She has been campaigning for better public transport for over ten years.', brazilianNote: '"Campaign for" = fazer campanha em favor de algo. "Campaign against" = fazer campanha contra. "Campaign" pode ser verbo ou substantivo: "a campaign", "to run a campaign".' },
      { word: 'raise awareness', definition: 'aumentar a conscientização sobre um problema ou causa', example: 'The documentary helped raise awareness of food waste on a national scale.', brazilianNote: 'Expressão fixa: SEMPRE "raise awareness". Nunca "create awareness" ou "increase awareness". Seguida de "of" + problema: "raise awareness of climate change".' },
      { word: 'volunteer', definition: 'voluntariar-se / voluntário', example: 'I volunteer at a local food bank every Saturday morning.', brazilianNote: '"Volunteer" pode ser verbo ou substantivo. "Volunteer work" = trabalho voluntário. "A volunteer organisation" = organização de voluntários. Muito comum em inglês para descrever engajamento comunitário.' },
      { word: 'integrate', definition: 'integrar / tornar-se parte de uma comunidade', example: 'The city has struggled to integrate new arrivals into the existing community.', brazilianNote: '"Integrate" / "integration" (substantivo). Frequente em discussões sobre imigração, educação e diversidade. "Integration" = o processo. "Integrated" (adjetivo): "a well-integrated neighbourhood".' },
      { word: 'privilege', definition: 'privilégio — vantagem não ganha, baseada em identidade ou circunstância', example: 'Recognising one\'s own privilege is the first step towards understanding inequality.', brazilianNote: '"Privilege" em inglês moderno tem significado social expandido além de "luxury". "Privileged" = adjetivo. Em contextos de justiça social, "privilege" refere-se especificamente a vantagens sistêmicas.' },
      { word: 'affordable', definition: 'acessível financeiramente', example: 'Affordable housing is one of the most pressing challenges in major cities.', brazilianNote: '"Affordable" = que a maioria das pessoas pode pagar. Collocações frequentes: "affordable housing", "affordable healthcare", "affordable education". Não confundir com "accessible" (que pode ser físico ou financeiro).' },
      { word: 'stereotype', definition: 'estereótipo — ideia generalizada e simplificada sobre um grupo', example: 'Media representations often reinforce stereotypes rather than challenging them.', brazilianNote: '"Stereotype" como substantivo e "to stereotype" como verbo: "The film stereotypes women in the workplace." Collocações: "challenge a stereotype", "reinforce a stereotype", "break a stereotype".' },
      { word: 'participation', definition: 'participação — envolvimento ativo numa comunidade, processo ou decisão', example: 'Civic participation — voting, campaigning, protesting — is essential in a healthy democracy.', brazilianNote: '"Participation" = "participação". "Participate in" = participar de. "Civic participation" = participação cívica. Muito usado em discussões sobre democracia e comunidade.' },
      { word: 'prejudice', definition: 'preconceito — opinião formada sem evidência ou baseada em grupo', example: 'Prejudice against certain groups is still a significant social problem in many countries.', brazilianNote: '"Prejudice" (substantivo) / "prejudiced" (adjetivo) / "prejudicial" (afeta negativamente). "Prejudice against" = preconceito contra. Diferente de "discrimination" (ação) — prejudice é a atitude, discrimination é o comportamento resultante.' },
    ],
    chunks: [
      { chunk: 'make a difference', meaning: 'fazer diferença / ter impacto real', example: 'Even small actions can make a difference if enough people take them.' },
      { chunk: 'bring about change', meaning: 'provocar/gerar mudança', example: 'Grassroots movements have historically brought about significant social change.' },
      { chunk: 'take action (on)', meaning: 'agir / tomar providências sobre', example: 'Governments need to take action on housing inequality before it gets worse.' },
      { chunk: 'stand up for', meaning: 'defender / apoiar (uma pessoa ou causa)', example: 'She stood up for her colleagues when their working conditions were unfair.' },
      { chunk: 'address (an issue)', meaning: 'abordar / lidar com um problema', example: 'The new policy aims to address income inequality in urban areas.' },
      { chunk: 'be part of the solution', meaning: 'fazer parte da solução', example: 'Individual choices matter — everyone can be part of the solution.' },
    ],
    dangerousConfusions: [
      task(
        'Qual a diferença entre "prejudice" e "discrimination"? Use cada um numa frase sobre tecnologia ou sociedade.',
        '"Prejudice" = a atitude / opinião preconceituosa. "Discrimination" = a ação que resulta do preconceito.',
        'Prejudice against certain groups in tech is well-documented — studies show hiring bias against women and minorities. / Discrimination occurs when those prejudices affect actual hiring, pay, and promotion decisions.'
      ),
      task(
        'Corrija se necessário: "We need to create awareness about social inequality."',
        'Collocação errada.',
        '"Create awareness" não é o padrão. A expressão fixa é "raise awareness": "We need to raise awareness about social inequality."'
      ),
      task(
        'Qual a diferença entre "affordable" e "accessible"? Pode sempre usar um pelo outro?',
        'Diferença de significado: preço vs. acesso físico/disponibilidade.',
        '"Affordable" = que a maioria das pessoas pode pagar financeiramente. "Accessible" = disponível/utilizável (pode ser físico: "accessible to wheelchair users", ou figurativo: "accessible language"). "Affordable healthcare" = saúde que a maioria pode pagar. "Accessible healthcare" = saúde disponível para todos, independente de localização ou condição física. Não são sempre intercambiáveis.'
      ),
    ],
    miniDialogues: [
      {
        title: 'Discussing social issues',
        lines: [
          'Priya: Did you watch that documentary about food banks last night?',
          'Leo: I did. It really raised my awareness of how many people struggle with basic affordability, even when they\'re working full time.',
          'Priya: I know. It\'s hard to watch without feeling like you should do something. I\'ve been thinking of volunteering somewhere.',
          'Leo: Me too. I think even small contributions can make a difference. The issue is that people often feel like individual action is pointless — as if only governments can bring about real change.',
          'Priya: There\'s some truth to that. But I also think stereotypes and prejudice play a role in making it easier for people to ignore poverty. If we stop seeing inequality as an abstract problem and start seeing the real people involved, maybe more people would take action.',
          'Leo: I agree. Campaigns that raise awareness through personal stories are often far more effective than statistics.',
        ],
        focus: 'raise awareness, affordability, volunteer, make a difference, bring about change, take action, stereotypes, prejudice, inequality — in natural social discussion.',
      },
    ],
    productionTasks: [
      task(
        'Descreva um problema social que você considera importante (desigualdade, pobreza, habitação, discriminação, participação cívica). Escreva 3-4 frases usando pelo menos 4 palavras ou expressões desta aula.',
        'Seja específico sobre o problema e inclua uma causa possível ou solução.',
        'One of the most pressing social issues in Brazil is housing inequality. Millions of people cannot afford homes in cities, partly because of decades of prejudice in urban planning that excluded lower-income communities from central areas. Campaigns that raise awareness of this issue are important, but without government action to address affordability, individual efforts will only make a small difference. More civic participation and community-led movements are needed to bring about real change.'
      ),
      task(
        'Pense em algo que você faz (ou poderia fazer) na sua vida que "makes a difference" — por menor que seja. Descreva em 3-4 frases. Use: volunteer, community, participate, stand up for, be part of the solution.',
        'Pode ser algo muito pequeno — o ponto é usar o vocabulário de forma natural e reflexiva.',
        'I don\'t volunteer regularly, but I try to be part of the solution in small ways — shopping locally to support the community, donating to food banks occasionally, and standing up for colleagues when I notice unfair treatment at work. I believe participation doesn\'t have to mean grand gestures — even choosing to engage with local elections makes a small difference. The important thing is not to assume that only large organisations can address social problems.'
      ),
    ],
  }),

]);

export const B1_DEEP_MEDIA_TECHNOLOGY_PART2_BY_PILLAR = Object.freeze({
  grammar: Object.freeze([]),
  vocabulary: Object.freeze(B1_DEEP_MEDIA_TECHNOLOGY_PART2.filter(l => l.type === 'vocabulary')),
  reading: Object.freeze(B1_DEEP_MEDIA_TECHNOLOGY_PART2.filter(l => l.type === 'reading')),
  listening: Object.freeze(B1_DEEP_MEDIA_TECHNOLOGY_PART2.filter(l => l.type === 'listening')),
  speaking: Object.freeze([]),
  writing: Object.freeze([]),
  checkpoint: Object.freeze([]),
});
