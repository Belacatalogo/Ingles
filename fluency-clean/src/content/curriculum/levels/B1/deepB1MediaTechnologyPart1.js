import { createGrammarLesson, createVocabularyLesson, createSpeakingLesson, createWritingLesson } from '../../../schemas/index.js';

const level = 'B1';
const status = 'ready';
const common = { level, status, estimatedMinutes: 60, tags: ['b1-7', 'media', 'technology', 'society', 'deep-approved-target'] };

function task(instruction, note = '', expected = '') { return { instruction, note, expected }; }

export const B1_DEEP_MEDIA_TECHNOLOGY_PART1 = Object.freeze([

  // ─── GRAMMAR-017: Modal verbs for deduction and speculation ───────────────────
  createGrammarLesson({
    ...common,
    id: 'B1-GRAMMAR-017',
    order: 17,
    title: 'Modal verbs: deduction and speculation',
    objectives: [
      'Usar "must be" para deduções lógicas com alta certeza no presente.',
      'Usar "can\'t be" para deduções negativas com alta certeza.',
      'Usar "might be", "could be", "may be" para possibilidades incertas.',
      'Distinguir graus de certeza entre must, might/could, can\'t.',
      'Aplicar essas estruturas em contexto de mídia, notícias e tecnologia.',
    ],
    teacherOpening: 'Quando você assiste às notícias, lê sobre tecnologia ou discute comportamentos na internet, você o tempo todo especula sobre causas, motivos e situações. "That story must be fake news." / "That algorithm could be influencing what we see." / "He can\'t be serious." Estas estruturas fazem parte do inglês B1 fluente e são essenciais para discussões críticas e jornalísticas.',
    portugueseContrast: [task('Em Modal verbs: deduction and speculation, observe que a estrutura do inglês difere da ordem natural do português.'), task('Não traduza literalmente; identifique o padrão do inglês antes de produzir.')], 
    whyItMatters: 'No cotidiano com falantes nativos, a especulação é constante — inferência de situação, julgamento de probabilidade, análise de notícias. Sem estas formas, você é forçado a usar "I think... probably" repetidamente. Com elas, você expressa nuance real.',
    differenceFromA2: 'No A2: "I think he is tired." / "Maybe it is true." No B1: "He must be exhausted — he\'s been working for twelve hours." / "That can\'t be right — the figures don\'t add up." / "The article might be exaggerating the impact." A diferença é certeza gradual e raciocínio explícito.',
    grammarTable: {
      headers: ['Modal', 'Certeza', 'Estrutura', 'Exemplo (media/tech)'],
      rows: [
        ['must be', 'Alta certeza positiva', 'must + base verb', 'That story must be misleading — it lacks sources.'],
        ['can\'t be', 'Alta certeza negativa', 'can\'t + base verb', 'That photo can\'t be real — it\'s clearly edited.'],
        ['couldn\'t be', 'Alta certeza neg. (alternativa)', 'couldn\'t + base verb', 'The company couldn\'t be unaware of the data breach.'],
        ['might be', 'Possibilidade incerta', 'might + base verb', 'The algorithm might be tracking your location.'],
        ['could be', 'Possibilidade incerta (alternativa)', 'could + base verb', 'The spike in traffic could be a bot attack.'],
        ['may be', 'Possibilidade formal', 'may + base verb', 'The new policy may be affecting user engagement.'],
      ],
    },
    whenToUse: [
      '"Must be" quando você tem evidência que torna a conclusão quase certa: "Their shares dropped 40%. That must be a major crisis."',
      '"Can\'t be" quando a evidência torna algo logicamente impossível: "He started the company at 22. He can\'t be very experienced."',
      '"Might/could/may be" quando há possibilidade real mas incerteza genuína: "This data might be out of date."',
      'Em análise de mídia e tecnologia: avaliar fontes, especular sobre causas, analisar impactos.',
    ],
    whenNotToUse: [
      'Não use "must be" para ordens ou obrigações neste contexto — aqui é sempre dedução: "You must be quiet" (ordem) vs "He must be busy" (dedução).',
      'Não confunda "may be" (dois palavras, modal + be) com "maybe" (uma palavra, advérbio): "Maybe it\'s true" vs "It may be true."',
      'Para deduções sobre o PASSADO, use: "must have been", "can\'t have been", "might have been" — não "must be" se o momento passou.',
    ],
    teacherExamples: [
      'That account must be fake — it was created yesterday and already has 50,000 followers.',
      'This can\'t be the whole story. There must be more context we\'re not seeing.',
      'The app could be collecting data without users knowing.',
      'The article might be biased — look at who funded the research.',
      'With that many views in one day, the video must be going viral.',
      'That statistic can\'t be accurate. The sample size is too small.',
    ],
    commonBrazilianMistakes: [
      {
        wrong: 'That story must to be fake.',
        right: 'That story must be fake.',
        explanation: 'Modais nunca são seguidos de "to" — "must be", nunca "must to be". Regra geral: modal + base verb (sem "to").',
      },
      {
        wrong: 'Maybe the article is exaggerating. / The article maybe is exaggerating.',
        right: 'The article might be exaggerating. / Maybe the article is exaggerating.',
        explanation: '"Maybe" como advérbio vem no início da frase ou antes do sujeito. "Might/could/may be" é a forma modal — integrado ao predicado verbal.',
      },
      {
        wrong: 'He can\'t to know about the hack.',
        right: 'He can\'t know about the hack. / He can\'t be aware of the hack.',
        explanation: '"Can\'t" como modal de dedução: can\'t + base verb, sem "to". "Can\'t know" = não pode saber (dedução). "Can\'t be aware" = não pode estar ciente.',
      },
      {
        wrong: 'That must be true because I see it on social media.',
        right: 'That might be true — but I\'d verify it before sharing.',
        explanation: 'Erro de lógica, não de gramática. Um B1 crítico usa "might be" (incerto) para informações de redes sociais, não "must be" (quase certo) — demonstra pensamento crítico com a mídia.',
      },
    ],
    controlledPractice: [
      task(
        'Escolha o modal correto: "Look at these numbers. The company ___ (must/can\'t) be in serious trouble — revenue dropped 60%."',
        '"Must be" quando a evidência apoia fortemente a conclusão.',
        'must be'
      ),
      task(
        'Complete com o grau correto de certeza: "I\'m not sure, but the new update ___ be causing the crashes." (incerto)',
        'Possibilidade incerta → might/could/may.',
        'might be / could be / may be'
      ),
      task(
        'Reescreva com "can\'t be": "I\'m certain that this image is not authentic."',
        '"Can\'t be" para certeza negativa dedutiva.',
        'This image can\'t be authentic.'
      ),
      task(
        'Especule sobre: você vê um artigo com 5 erros factuais graves. O que pode dizer sobre o jornalista?',
        'Use must/can\'t/might em frase natural.',
        'The journalist can\'t have checked the facts carefully. / This must be poorly researched. / The editor might not have reviewed it.'
      ),
    ],
    errorCorrectionPractice: [
      task(
        'Corrija: "The app maybe is recording conversations. That must to be illegal."',
        'Dois erros: posição de "maybe" e "must to be".',
        'The app might be recording conversations. That must be illegal.'
      ),
      task(
        'Corrija: "She can\'t know the answer — she wasn\'t in the meeting."',
        'Verificar se está certo ou precisa de "can\'t have known".',
        'Correto para uma conclusão no presente: "She can\'t know the answer." Se o meeting já aconteceu e você fala retroativamente: "She can\'t have known." Ambos são aceitáveis dependendo do foco temporal.'
      ),
    ],
    translationPractice: [
      task(
        'Traduza: "Esse algoritmo deve estar coletando nossos dados sem permissão."',
        '"Must be" + gerúndio para ação em progresso.',
        'This algorithm must be collecting our data without permission.'
      ),
      task(
        'Traduza: "Essa notícia não pode ser verdade — não há nenhuma fonte."',
        '"Can\'t be" para certeza negativa.',
        'This news can\'t be true — there are no sources.'
      ),
      task(
        'Traduza: "O hack pode ter afetado milhões de usuários — ainda não sabemos."',
        '"Might/could" para possibilidade incerta.',
        'The hack might have affected millions of users — we don\'t know yet.'
      ),
    ],
    productionTasks: [
      task(
        'Você vê uma notícia viral com estas características: (1) sem nome de autor, (2) data do artigo de 2019, (3) 3 milhões de compartilhamentos em 1 hora. Escreva 3-4 frases especulando sobre a credibilidade usando must/can\'t/might/could.',
        'Combine evidência com modal correto. Exercite pensamento crítico em inglês.',
        'With no author name, this article can\'t be from a reliable source. The date must be wrong, or the story is being recycled from years ago. A million shares in one hour — the engagement might be artificially boosted. This could be a disinformation campaign targeting current events.'
      ),
      task(
        'Pense num produto tecnológico que você usa (app, rede social, plataforma). Escreva 3 frases especulando sobre como ele funciona ou coleta dados. Use must/might/could.',
        'Especulação técnica e crítica em inglês natural.',
        'The app must be using my location data to personalise the ads I see. It could be sharing that information with third-party advertisers. The algorithm might be designed to keep me scrolling as long as possible.'
      ),
    ],
  }),

  // ─── GRAMMAR-018: Gerunds and infinitives ────────────────────────────────────
  createGrammarLesson({
    ...common,
    id: 'B1-GRAMMAR-018',
    order: 18,
    title: 'Gerunds and infinitives: key uses at B1',
    objectives: [
      'Usar gerúndio após certas preposições e expressões fixas.',
      'Usar infinitivo após expressões de intenção, decisão e propósito.',
      'Reconhecer verbos que aceitam gerúndio, infinitivo ou ambos (com mudança de sentido).',
      'Aplicar gerúndio como sujeito da frase.',
      'Evitar os erros mais comuns de brasileiros ao escolher entre -ing e to + infinitivo.',
    ],
    teacherOpening: 'Gerúndio e infinitivo são dois dos pontos mais problemáticos para brasileiros em inglês B1. "I enjoy to read" (errado). "I\'m interested to learn" (errado). "It\'s no use to try" (errado). Esta aula é cirúrgica: sem regras vagas, sem listas de centenas de verbos. Foco nos padrões mais frequentes e nos erros mais comuns.',
    portugueseContrast: [task('Em Gerunds and infinitives: key uses at B1, observe que a estrutura do inglês difere da ordem natural do português.'), task('Não traduza literalmente; identifique o padrão do inglês antes de produzir.')], 
    whyItMatters: 'Em conversas sobre tecnologia, mídia e sociedade — e em qualquer nível de inglês — você usa gerúndio e infinitivo constantemente: "stop using", "decide to switch", "avoid sharing", "worth checking". Sem esse domínio, você trava em cada frase.',
    differenceFromA2: 'No A2: "I like watch TV." / "I want go online." (erros comuns). No B1: "I enjoy watching documentaries." / "She decided to stop scrolling before bed." / "It\'s worth reading the privacy policy." A diferença é a eliminação de erros e o uso natural em contexto complexo.',
    grammarTable: {
      headers: ['Padrão', 'Estrutura', 'Exemplo (media/tech)'],
      rows: [
        ['Após preposição', 'preposition + -ing', 'I\'m tired of scrolling. / Without reading the terms, you can\'t know.'],
        ['Após expressões fixas', 'it\'s worth / no use / busy + -ing', 'It\'s worth checking the source. / It\'s no use complaining.'],
        ['Como sujeito', '-ing + verb phrase', 'Sharing personal data online carries risks.'],
        ['Verbo + gerúndio', 'enjoy/avoid/suggest + -ing', 'He enjoys creating content. / Avoid clicking suspicious links.'],
        ['Verbo + infinitivo', 'want/decide/plan/need + to + inf', 'She decided to delete the app. / I plan to reduce screen time.'],
        ['Verb + obj + infinitivo', 'tell/want/ask + obj + to + inf', 'He told me to read the article. / They asked us to subscribe.'],
        ['Stop + gerúndio vs infinitivo', 'stop -ing ≠ stop to', 'I stopped using social media. / I stopped to check my phone. (diferente!)'],
        ['Remember + gerúndio vs infinitivo', 'remember -ing ≠ remember to', 'I remember reading about it. / Remember to update your password.'],
      ],
    },
    whenToUse: [
      'Gerúndio: após preposição (tired of, interested in, good at, without).',
      'Gerúndio: após verbos como enjoy, avoid, suggest, consider, finish, keep, mind, miss, practise.',
      'Infinitivo: após want, decide, plan, need, hope, intend, manage, refuse, agree, offer.',
      'Infinitivo: após "would like", "would prefer", "would love".',
    ],
    whenNotToUse: [
      'Não use infinitivo após preposição: "I\'m interested IN learning" (não "to learn" após "in").',
      '"Stop + -ing" = deixar de fazer. "Stop + to do" = parar para fazer outra coisa. Completamente diferentes.',
      '"Remember + -ing" = lembrar que fez algo. "Remember + to do" = não esquecer de fazer.',
      '"Try + -ing" = experimentar fazendo. "Try + to do" = tentar fazer (com dificuldade).',
    ],
    teacherExamples: [
      'Many people enjoy watching short videos, but few consider reading long articles.',
      'The company decided to change its privacy policy after the data breach.',
      'I\'m getting better at ignoring clickbait headlines.',
      'She stopped using that social network after her account was hacked.',
      'It\'s worth reading the full article before sharing it.',
      'They asked users to update their security settings immediately.',
    ],
    commonBrazilianMistakes: [
      {
        wrong: 'I enjoy to watch documentaries.',
        right: 'I enjoy watching documentaries.',
        explanation: '"Enjoy" sempre vai com gerúndio (-ing), nunca com infinitivo. Outros verbos da mesma família: avoid, consider, finish, keep, miss, practise, suggest.',
      },
      {
        wrong: 'I\'m interested to learn more about AI.',
        right: 'I\'m interested in learning more about AI.',
        explanation: '"Interested" é seguido de "in" (preposição) — e preposição + gerúndio. "Interested IN + -ing". Nunca "interested to".',
      },
      {
        wrong: 'She stopped to use social media for a month.',
        right: 'She stopped using social media for a month.',
        explanation: '"Stopped to use" significa que ela parou (o que estava fazendo) PARA usar redes sociais. "Stopped using" = deixou de usar. Sentidos opostos!',
      },
      {
        wrong: 'It\'s no use to try to change the algorithm.',
        right: 'It\'s no use trying to change the algorithm.',
        explanation: '"It\'s no use + -ing" — expressão fixa com gerúndio. Outras expressões iguais: "It\'s worth + -ing", "It\'s not worth + -ing", "be busy + -ing", "there\'s no point in + -ing".',
      },
    ],
    controlledPractice: [
      task(
        'Complete corretamente: "She is thinking of ___ (switch) to a different platform."',
        '"Think of" = preposição "of" → gerúndio.',
        'switching'
      ),
      task(
        'Complete: "Most people avoid ___ (read) the full privacy policy."',
        '"Avoid" = verbo que vai com gerúndio.',
        'reading'
      ),
      task(
        'Complete: "He decided ___ (delete) his social media accounts."',
        '"Decide" = verbo que vai com infinitivo.',
        'to delete'
      ),
      task(
        'Explique a diferença: "I stopped to check the news." vs "I stopped checking the news."',
        'Dois significados completamente diferentes.',
        '"I stopped to check the news" = parei o que estava fazendo PARA checar as notícias. / "I stopped checking the news" = deixei de checar as notícias (parei o hábito).'
      ),
    ],
    errorCorrectionPractice: [
      task(
        'Corrija: "It\'s worth to read the full article before to share it."',
        'Dois erros: "worth" + "before" exigem gerúndio.',
        'It\'s worth reading the full article before sharing it.'
      ),
      task(
        'Corrija: "I\'m really good at to identify fake news."',
        '"Good at" = preposição "at" + gerúndio.',
        'I\'m really good at identifying fake news.'
      ),
    ],
    translationPractice: [
      task(
        'Traduza: "Ela evita compartilhar informações pessoais em redes sociais."',
        '"Avoid" + gerúndio.',
        'She avoids sharing personal information on social media.'
      ),
      task(
        'Traduza: "Ele decidiu parar de assistir às notícias toda manhã."',
        '"Decided to stop" + gerúndio.',
        'He decided to stop watching the news every morning.'
      ),
      task(
        'Traduza: "Vale a pena verificar a fonte antes de acreditar em qualquer coisa que você lê online."',
        '"It\'s worth + -ing". "Before + -ing". "Anything" + relativa.',
        'It\'s worth checking the source before believing anything you read online.'
      ),
    ],
    productionTasks: [
      task(
        'Descreva seus hábitos de consumo de mídia em 4-5 frases usando pelo menos 5 estruturas diferentes desta aula: gerúndio como sujeito, enjoy/avoid + -ing, decide/plan + to inf, preposição + -ing, it\'s worth + -ing.',
        'Foque em comportamentos reais ou típicos: redes sociais, streaming, notícias, podcasts.',
        'Watching short videos has become the main way I consume information. I enjoy following news podcasts because I can listen while commuting. I\'ve decided to stop scrolling before bed, as it was affecting my sleep. I\'m not very good at avoiding clickbait, but I\'m getting better at questioning sources. It\'s definitely worth spending a few minutes checking whether a story is real before sharing it.'
      ),
    ],
  }),

  // ─── VOCABULARY-013: Media and technology vocabulary ─────────────────────────
  createVocabularyLesson({
    ...common,
    id: 'B1-VOCABULARY-013',
    order: 13,
    title: 'Media and technology vocabulary',
    objectives: [
      'Usar vocabulário preciso para descrever plataformas, conteúdo digital e hábitos de mídia.',
      'Reconhecer e usar phrasal verbs de tecnologia: scroll through, log in, sign up, switch off.',
      'Distinguir termos de mídia crítica: source, bias, clickbait, misinformation, viral.',
      'Descrever o impacto da tecnologia e mídia na sociedade com vocabulário real.',
    ],
    teacherOpening: 'A mídia e a tecnologia geraram vocabulário completamente novo nos últimos 20 anos — e muito dele ainda não tem equivalente exato em português. Esta aula cobre os termos mais frequentes e relevantes para discutir plataformas, conteúdo digital, hábitos e o impacto da tecnologia na sociedade.',
    essentialWords: [
      { word: 'algorithm', definition: 'algoritmo — sistema automático que filtra e seleciona conteúdo', example: 'The algorithm decides which posts appear at the top of your feed.', brazilianNote: '"Algorithm" (inglês) = "algoritmo" (PT). O conceito é o mesmo, mas a pronúncia difere: /ˈælɡərɪðəm/. Em inglês cotidiano, muito usado: "the algorithm pushed this video to me".' },
      { word: 'clickbait', definition: 'conteúdo projetado para atrair cliques com títulos enganosos', example: 'The headline was pure clickbait — the article said almost nothing.', brazilianNote: '"Clickbait" não tem uma única tradução fixada em português. É usado mesmo no Brasil: "título clickbait". No inglês, pode ser adjetivo ou substantivo.' },
      { word: 'misinformation', definition: 'desinformação / informação falsa ou imprecisa (sem intenção obrigatória)', example: 'Misinformation about health topics spreads quickly on social media.', brazilianNote: '"Misinformation" (sem intenção de enganar) vs "disinformation" (com intenção deliberada). Muitos usam "misinformation" para os dois, mas a distinção é crescentemente importante.' },
      { word: 'go viral', definition: 'viralizar / atingir audiência massiva rapidamente', example: 'The video went viral overnight and got 30 million views.', brazilianNote: '"Go viral" = expressão fixa. "Viral" pode ser adjetivo: "a viral video". Em inglês britânico, também se ouve "it went viral online".' },
      { word: 'scroll (through)', definition: 'rolar a tela / navegar passando por conteúdo', example: 'She spent two hours scrolling through her feed without realising it.', brazilianNote: '"Scroll" é verbo muito usado: "scroll up/down", "scroll through". O substantivo existe também: "endless scroll" = design sem fim de página (dark pattern).' },
      { word: 'stream / streaming', definition: 'transmitir / assistir em tempo real online', example: 'More people stream content than watch traditional TV now.', brazilianNote: '"Stream" (verbo) = transmitir ou assistir em streaming. "Streaming" (substantivo/adj) = o serviço ou o modelo. "Streamer" = criador que transmite ao vivo.' },
      { word: 'content creator', definition: 'criador de conteúdo / pessoa que produz conteúdo digital', example: 'She started as a content creator and now has a team of twenty people.', brazilianNote: '"Content creator" é o termo padrão em inglês para "criador de conteúdo" ou "influenciador" (embora "influencer" seja diferente — influencer tem foco em influenciar decisões de compra).' },
      { word: 'bias', definition: 'viés / tendência parcial ou preconceito', example: 'This newspaper has a clear political bias — it only presents one side.', brazilianNote: '"Bias" (substantivo) / "biased" (adjetivo): "The coverage was heavily biased." Em inglês, muito usado em media literacy e discussões sobre jornalismo.' },
      { word: 'subscription', definition: 'assinatura digital', example: 'I pay for three streaming subscriptions and rarely use two of them.', brazilianNote: '"Subscription" = assinatura de serviço digital. "Subscribe to" = assinar. "Unsubscribe" = cancelar. Não confundir com "follow" (redes sociais) que é gratuito.' },
      { word: 'privacy settings', definition: 'configurações de privacidade', example: 'Check your privacy settings before sharing your location with an app.', brazilianNote: '"Privacy settings" = configurações de privacidade em apps e plataformas. "Data privacy" = privacidade de dados. Muito relevante em discussões sobre tecnologia e regulação.' },
      { word: 'echo chamber', definition: 'câmara de eco / ambiente onde pessoas só encontram ideias que confirmam suas crenças', example: 'Social media algorithms create echo chambers that reinforce existing opinions.', brazilianNote: '"Echo chamber" é expressão muito usada em inglês para descrever o fenômeno das bolhas digitais. Conecta-se a "confirmation bias" (viés de confirmação) e "filter bubble".' },
      { word: 'screen time', definition: 'tempo de tela / horas gastas em frente a dispositivos', example: 'I reduced my screen time from six hours to two by turning off notifications.', brazilianNote: '"Screen time" = "tempo de tela". É tanto o tempo físico gasto em dispositivos quanto uma feature em smartphones que monitora esse uso.' },
    ],
    chunks: [
      { chunk: 'go viral', meaning: 'viralizar', example: 'The campaign went viral after a celebrity shared it.' },
      { chunk: 'keep up with', meaning: 'manter-se atualizado com', example: 'It\'s almost impossible to keep up with all the news these days.' },
      { chunk: 'switch off / log off', meaning: 'desligar / desconectar', example: 'I try to switch off completely at weekends — no phone, no news.' },
      { chunk: 'be constantly connected', meaning: 'estar constantemente conectado', example: 'Being constantly connected to social media is exhausting.' },
      { chunk: 'raise awareness (of)', meaning: 'aumentar a conscientização sobre', example: 'The campaign helped raise awareness of online privacy issues.' },
      { chunk: 'double-check the source', meaning: 'verificar a fonte duplamente', example: 'Before sharing anything, always double-check the source.' },
    ],
    dangerousConfusions: [
      task(
        'Qual a diferença entre "misinformation" e "disinformation"? Use cada um numa frase.',
        '"Misinformation" = informação falsa (pode ser sem intenção). "Disinformation" = informação falsa distribuída DELIBERADAMENTE para enganar.',
        'Misinformation spreads when people share articles without checking the facts. / The government was accused of spreading disinformation during the election campaign.'
      ),
      task(
        'Qual a diferença entre "follow someone" e "subscribe to someone" nas redes sociais?',
        'Contexto e plataforma fazem diferença.',
        '"Follow" = seguir gratuitamente (Instagram, Twitter/X, TikTok). "Subscribe" = pode ser seguir (YouTube) ou pagar por conteúdo premium (Patreon, Substack). No YouTube, "subscribe" = seguir gratuitamente o canal.'
      ),
      task(
        'Corrija se necessário: "I saw a viral video today. It had too much click-bait."',
        '"Clickbait" como substantivo não conta — "too much clickbait" seria melhor; "a lot of clickbait". Mas o maior problema é o uso.',
        '"I saw a viral video today" — correto. "It was complete clickbait" / "The title was pure clickbait" são mais naturais do que "had too much click-bait".'
      ),
    ],
    miniDialogues: [
      {
        title: 'Talking about media habits',
        lines: [
          'Jamie: Have you seen that video that went viral yesterday? Something about a new AI tool.',
          'Sam: I think so — was it the one with the clickbait title about "AI replacing all jobs"?',
          'Jamie: Exactly. I almost shared it, but then I double-checked the source and it turned out to be completely misleading.',
          'Sam: That\'s the algorithm for you. It rewards engagement, not accuracy.',
          'Jamie: I know. I\'m trying to keep up with tech news, but it\'s becoming harder to avoid misinformation.',
          'Sam: Same. I started subscribing to a couple of newsletters instead of scrolling through social media. Much better.',
          'Jamie: Good idea. And at least newsletters have an editor — there\'s some bias, but it\'s more transparent than a random feed.',
        ],
        focus: 'go viral, clickbait, double-check the source, misleading, algorithm, keep up with, misinformation, subscribing, scrolling, bias — all in natural tech conversation.',
      },
    ],
    productionTasks: [
      task(
        'Descreva os seus hábitos de consumo de mídia em 3-4 frases usando pelo menos 5 palavras desta aula: streaming, scroll, content, algorithm, screen time, subscription, bias, go viral.',
        'Seja honesto ou use uma versão idealizada. Foco em uso natural.',
        'I try to limit my screen time to about two hours a day, but the algorithm makes it hard to stop scrolling. I have two streaming subscriptions that I use regularly for series and documentaries. For news, I prefer to read articles from sources I trust rather than relying on whatever content goes viral on my feed. I\'m aware that every outlet has some degree of bias, so I try to read different perspectives.'
      ),
      task(
        'Um amigo te pergunta como evitar misinformation online. Dê 3-4 conselhos usando: double-check the source, avoid, it\'s worth, consider, stop + gerúndio, be careful about.',
        'Conselhos práticos e linguagem de instrução educada.',
        'First, always double-check the source before sharing anything — look for the original article and check who wrote it. Avoid scrolling too quickly, because clickbait headlines are designed to make you react without reading. It\'s worth following a range of news sources with different perspectives instead of relying on one feed. Finally, consider stopping to read comments on controversial stories, as they often spread more misinformation than the article itself.'
      ),
    ],
  }),

  // ─── SPEAKING-007: Give an opinion about technology or media ─────────────────
  createSpeakingLesson({
    ...common,
    id: 'B1-SPEAKING-007',
    order: 7,
    title: 'Give an opinion about technology or media',
    objectives: [
      'Estruturar e defender uma opinião sobre tecnologia ou mídia em 90-120 segundos.',
      'Usar language de opinião com nuance: "I strongly believe", "To my mind", "I can see both sides".',
      'Responder a contra-argumentos com "However", "That said", "Even so".',
      'Usar modal verbs de deduction e gerúndio/infinitivo desta unidade em contexto real.',
    ],
    teacherOpening: 'Discussões sobre tecnologia e mídia são onipresentes — no trabalho, em conversas sociais, em entrevistas. Um B1 precisa ir além de "I think social media is bad" — precisa estruturar o argumento, reconhecer o outro lado, e defender a posição com exemplos concretos. Esta aula treina esse fluxo.',
    speakingSituation: {
      context: 'A friend or colleague asks: "Do you think social media does more harm than good?" You have 90-120 seconds to give a structured opinion.',
      modelResponse: 'That\'s a question I find genuinely difficult to answer, because I can see both sides. On one hand, social media has made it much easier to stay connected with people, share information, and raise awareness of important issues. Movements that might never have gained momentum before can now go viral overnight — and that can drive real change. On the other hand, the downsides are becoming harder to ignore. Algorithms are designed to keep you scrolling, not to give you balanced information. Echo chambers reinforce existing opinions rather than challenging them. And the misinformation problem is significant — false stories spread far faster than corrections. To my mind, social media isn\'t inherently harmful, but the way most platforms are currently designed does more harm than good. The problem isn\'t the technology itself — it\'s the business model behind it.',
      responseLength: '~160 words — structured opinion with both sides, personal stance, use of B1 media vocabulary and linkers.',
    },
    modelPhrases: [
      'I strongly believe that...',
      'To my mind, the main issue is...',
      'I can see both sides of this argument.',
      'On one hand... On the other hand...',
      'The way I see it,...',
      'That said, / Even so, / Having said that,...',
      'The problem isn\'t X itself — it\'s...',
      'It\'s hard to ignore the fact that...',
      'To be honest,...',
      'What worries me most is...',
      'I\'d argue that...',
      'It\'s not as simple as saying...',
    ],
    substitutionDrills: [
      {
        base: 'I can see both sides of [this argument].',
        substitutions: [
          'the debate around screen time',
          'the discussion about AI and jobs',
          'the question of social media and mental health',
          'the issue of streaming replacing cinema',
        ],
      },
      {
        base: 'The problem isn\'t [social media] itself — it\'s [the way it\'s designed].',
        substitutions: [
          'technology / how we use it',
          'AI / the lack of regulation',
          'streaming / the sheer amount of content available',
          'social media algorithms / their prioritisation of engagement over accuracy',
        ],
      },
    ],
    pronunciationFocus: {
      title: 'Pronunciation & shadowing',
      tips: [
        'Shadow: "I can see both sides of this argument." Chunk the phrase naturally: "I can see BOTH sides / of THIS argument." Stress BOTH and THIS.',
        '"The problem isn\'t X itself — it\'s..." — pause briefly at the dash and stress "IT\'S" to signal the real cause is coming.',
        '"It\'s hard to ignore the fact that..." — link "hard-to-ignore" as a single unit. Stress HARD and igNORE.',
        '"What worries me most is..." — rising intonation on "most" to build anticipation for the main concern.',
      ],
    },
    guidedSpeaking: [
      {
        prompt: 'Dê a sua posição sobre tecnologia ou mídia em 1-2 frases. Seja honesto — não precisa ser "politicamente correto".',
        support: 'I strongly believe that... / To my mind,... / The way I see it,...',
        timeLimit: '20 seconds',
      },
      {
        prompt: 'Apresente UMA evidência que apoia a sua posição. Depois, reconheça um contra-argumento com "That said" ou "On the other hand".',
        support: 'For example,... / That said, I acknowledge that... / On the other hand,...',
        timeLimit: '40 seconds',
      },
      {
        prompt: 'Conclua com uma reflexão mais nuançada — não apenas repita sua posição inicial. O que deveria mudar?',
        support: 'The real issue is... / What needs to change is... / I\'d argue that...',
        timeLimit: '30 seconds',
      },
    ],
    speakingChecklist: [
      'Dei uma posição clara (não apenas "it depends") no início?',
      'Apresentei pelo menos uma evidência ou exemplo concreto?',
      'Reconheci o lado oposto com "that said" ou "on the other hand"?',
      'Usei pelo menos um modal de deduction (must/might/could)?',
      'Terminei com uma conclusão ou reflexão — não apenas repetindo o início?',
      'Minha resposta durou 90 segundos ou mais?',
    ],
    recordingTasks: [
      {
        instruction: 'Escolha UMA das perguntas abaixo e grave uma resposta de 90-120 segundos: (A) "Do you think AI will eventually replace human journalists?" (B) "Should there be more regulation of social media platforms?" (C) "Is screen time addiction as serious as other addictions?" Estrutura obrigatória: posição → evidência → contra-argumento → conclusão.',
        minSeconds: 90,
        maxSeconds: 120,
        focus: 'Estrutura argumentativa, vocabulário de mídia/tech, modais de deduction, gerúndio/infinitivo em uso natural.',
      },
    ],
    freeSpeaking: [
      'Has technology made your life better or more stressful overall? Give specific examples.',
      'Do you think the way social media platforms are designed is ethical? What would you change?',
      'Should children under 13 be allowed on social media? What are the main arguments for and against?',
    ],
  }),

  // ─── WRITING-007: Write an opinion paragraph about technology ─────────────────
  createWritingLesson({
    ...common,
    id: 'B1-WRITING-007',
    order: 7,
    title: 'Write an opinion paragraph about technology',
    objectives: [
      'Escrever um parágrafo de opinião estruturado: topic sentence → evidence → concession → conclusion.',
      'Usar language de opinião formal: "In my view", "There is little doubt that", "One must consider".',
      'Equilibrar posição pessoal com reconhecimento do lado oposto.',
      'Incorporar vocabulário de mídia/tecnologia desta unidade naturalmente.',
      'Evitar os erros estruturais mais comuns de brasileiros em textos argumentativos.',
    ],
    teacherOpening: 'Um parágrafo de opinião bem escrito não é uma lista de "I think... I think... I think...". É uma estrutura com posição clara, evidência específica, reconhecimento do lado oposto e conclusão que avança o argumento. Esta aula ensina a estrutura padrão com modelo detalhado e critérios concretos.',
    modelText: `Is social media doing more harm than good?

In my view, the design of most social media platforms is fundamentally at odds with users' well-being. The core problem is not the technology itself, but the business model driving it: platforms profit from engagement, which means keeping users scrolling as long as possible, regardless of what they are consuming. Algorithms prioritise content that triggers strong emotional responses — outrage, fear, envy — because this generates more interaction. As a result, misinformation and divisive content tend to spread far more rapidly than nuanced, factual reporting.

It is true that social media has genuine benefits — it enables people to stay connected across distances, raise awareness of important causes, and organise communities around shared values. That said, these benefits could arguably be achieved through better-designed platforms, without the manipulative mechanics that currently dominate the industry.

On balance, I would argue that the current form of social media does more harm than good — not because connection is harmful, but because the incentives shaping these platforms are misaligned with users' long-term interests.`,
    modelTextBreakdown: [
      { note: 'Título: pergunta retórica — enquadra o debate sem revelar a posição antecipadamente.' },
      { note: '"In my view" — abre com posição clara e pessoal, sem ser agressivo.' },
      { note: '"The core problem is not X, but Y" — estrutura de redirecionamento. Não nega X, identifica o que importa realmente.' },
      { note: '"Algorithms prioritise content that triggers... because this generates..." — causalidade explícita com "because" + consequência em "As a result".' },
      { note: '"It is true that..." — concessão formal. Reconhece o lado oposto antes de contrargumentar.' },
      { note: '"That said, these benefits could arguably be achieved through..." — "That said" + modal epistêmico "could arguably" = linguagem acadêmica nuançada.' },
      { note: '"On balance, I would argue that..." — encerramento com "On balance" (conclusão ponderada) + "would argue" (condicional educado para posição forte).' },
      { note: '"not because X is harmful, but because Y is misaligned" — conclusão que qualifica a posição inicial — mais sofisticado do que simplesmente repetir.' },
    ],
    commonWritingMistakes: [
      {
        wrong: 'I think social media is bad. It has many disadvantages. First, it wastes time. Second, it spreads fake news. Third, it causes depression. In conclusion, social media is very bad.',
        right: 'In my view, the main risk of social media is not the technology itself, but the way platforms are designed to maximise engagement over well-being. As a result, users are exposed to more misinformation and divisive content than they realise.',
        explanation: 'Evite listas de "first, second, third" em parágrafos de opinião. Conecte ideias com causalidade e evidência. "As a result", "which means", "because" criam argumentos, não apenas listas.',
      },
      {
        wrong: 'In conclusion, I think technology is both good and bad.',
        right: 'On balance, while technology has undeniable benefits, the way it is currently designed prioritises profit over people — a problem that regulation, not avoidance, must address.',
        explanation: '"Both good and bad" é uma conclusão nula — não avança o argumento. Uma boa conclusão qualifica a posição, propõe algo, ou identifica o problema real.',
      },
      {
        wrong: 'Technology is making us more lonely. Studies show that social media users are more depressed.',
        right: 'Research suggests a correlation between heavy social media use and increased anxiety — though causality is difficult to establish.',
        explanation: 'Afirmações absolutas sobre estudos exigem qualificação. "Research suggests", "studies indicate", "there is evidence that" — com "though", "however" para sinalizar limitações.',
      },
      {
        wrong: 'Social media is very dangerous for young people and should be banned immediately.',
        right: 'Given the evidence on adolescent mental health, stronger regulation of social media — particularly for under-16s — seems both necessary and overdue.',
        explanation: '"Should be banned immediately" soa extremo sem evidência. "Seems both necessary and overdue" + "stronger regulation" é mais persuasivo porque é mais específico e calibrado.',
      },
    ],
    revisionChecklist: [
      'O parágrafo começa com uma posição clara (topic sentence)?',
      'Há pelo menos uma evidência específica ou mecanismo explicativo?',
      'Há uma concessão ("It is true that", "While X is true, Y...")?',
      'A conclusão avança o argumento — não apenas repete a posição inicial?',
      'Usei pelo menos um item de vocabulário desta unidade (algoritmo, misinformation, bias, screen time...)?',
      'Evitei listas (first... second... third...) e usei conectores causais?',
      'O tom é assertivo mas não extremo?',
      'O parágrafo tem 100-150 palavras?',
    ],
    draftTask: task(
      'Escreva um parágrafo de opinião de 100-150 palavras sobre UMA destas questões: (A) "Should there be a minimum age for social media?" (B) "Is artificial intelligence a threat or an opportunity?" (C) "Do people watch too much TV/video content today?" Estrutura: topic sentence → evidência/mecanismo → concessão → conclusão.',
      'Não escreva uma lista. Conecte ideias com causalidade. Use pelo menos 1 item de vocabulário desta unidade e 1 modal de deduction.',
      'Topic sentence com posição clara → 2-3 frases de evidência conectadas → "It is true that / While X is true..." → conclusão que qualifica ou avança a posição.'
    ),
    revisionTask: task(
      'Releia o rascunho e aplique o checklist: (1) tem topic sentence clara? (2) tem concessão? (3) conclusão avança o argumento? (4) há listas a eliminar? (5) o vocabulário desta unidade está sendo usado?',
      'Substitua listas por frases conectadas. Adicione concessão se não houver. Torne a conclusão mais específica.',
      'Versão revisada com: topic sentence, evidência conectada (não lista), concessão, conclusão qualificada.'
    ),
    finalVersionTask: task(
      'Escreva a versão final limpa de 100-150 palavras. Aplique o checklist completo antes de finalizar.',
      'Tom assertivo mas não extremo. Posição clara mas com nuance. Vocabulário específico da unidade.',
      'Parágrafo final com estrutura completa, vocabulário de mídia/tech, pelo menos um modal de deduction, concessão presente, conclusão que avança — não repete — o argumento.'
    ),
  }),

]);

export const B1_DEEP_MEDIA_TECHNOLOGY_PART1_BY_PILLAR = Object.freeze({
  grammar: Object.freeze(B1_DEEP_MEDIA_TECHNOLOGY_PART1.filter(l => l.type === 'grammar')),
  vocabulary: Object.freeze(B1_DEEP_MEDIA_TECHNOLOGY_PART1.filter(l => l.type === 'vocabulary')),
  reading: Object.freeze([]),
  listening: Object.freeze([]),
  speaking: Object.freeze(B1_DEEP_MEDIA_TECHNOLOGY_PART1.filter(l => l.type === 'speaking')),
  writing: Object.freeze(B1_DEEP_MEDIA_TECHNOLOGY_PART1.filter(l => l.type === 'writing')),
  checkpoint: Object.freeze([]),
});
