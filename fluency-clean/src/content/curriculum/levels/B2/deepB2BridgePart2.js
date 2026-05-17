import { createReadingLesson, createListeningLesson, createWritingLesson } from '../../../schemas/index.js';

const level = 'B2';
const status = 'ready';
const common = { level, status, estimatedMinutes: 70, tags: ['b2-1', 'bridge', 'b1-to-b2', 'deep-approved-target'] };

function task(instruction, note = '', expected = '') { return { instruction, note, expected }; }
function vocab(word, meaning, example = '', note = '') { return { word, meaning, example, note }; }
function q(question, answer, evidence = '', explanation = '', options = []) { return { question, answer, evidence, explanation, options }; }

export const B2_DEEP_BRIDGE_PART2 = Object.freeze([

  // ─── READING ────────────────────────────────────────────────────────────────

  createReadingLesson({
    ...common,
    id: 'B2-READING-001',
    order: 1,
    title: 'Opinion article: Should cities ban private cars?',
    objectives: [
      'Ler e compreender um artigo de opinião de ~500 palavras com vocabulário B2.',
      'Identificar a posição do autor, os argumentos principais e as concessões.',
      'Inferir significado implícito e intenção argumentativa.',
      'Responder a perguntas de evidência e inferência com frases completas.',
      'Produzir uma resposta escrita breve baseada no texto.',
    ],
    readingPurpose: 'Você vai ler um artigo de opinião sobre política urbana. Preste atenção não apenas ao argumento principal, mas também a como o autor estrutura concessões, refutações e hedging — você vai usar essas mesmas estratégias nas suas produções B2.',
    preReadingVocabulary: [
      vocab('congestion', 'congestionamento de tráfego', 'Traffic congestion in major cities costs billions every year.', 'Diferente de "pollution" (poluição) — congestion é o bloqueio de trânsito'),
      vocab('pedestrianise', 'tornar uma área exclusiva para pedestres', 'Many European cities have pedestrianised their historic centres.', 'Verbo britânico; americano: "pedestrianize"'),
      vocab('commute', 'deslocamento diário para trabalho/escola', 'Her daily commute takes over an hour each way.', 'Substantivo e verbo: "commute to work"; "her commute"'),
      vocab('feasible', 'viável, praticável', 'A complete ban on cars may not be feasible in suburban areas.', '"Feasible" = can be done practically; stronger than "possible"'),
      vocab('infrastructure', 'infraestrutura', 'Without proper infrastructure, public transport cannot replace cars.', 'Incontável em inglês; "an infrastructure" está errado'),
      vocab('emission', 'emissão (de carbono, poluição)', 'Transport emissions account for nearly a quarter of global CO2.', 'Quase sempre plural: "emissions". "Emission" singular em contexto técnico'),
    ],
    readingStrategy: [
      task('Leia o título e o primeiro parágrafo. Qual é a posição do autor? Ele é a favor ou contra a proibição de carros?', 'Não leia o artigo inteiro ainda.'),
      task('Identifique as palavras de sinalização (discourse markers) à medida que lê: However, Nevertheless, Whilst, Albeit, Furthermore.'),
    ],
    mainText: `Should Cities Ban Private Cars?

The idea of banning private cars from city centres might once have sounded utopian. Today, however, it is a policy that an increasing number of European cities are actively pursuing — and for compelling reasons. Yet whilst the environmental and health benefits are significant, the practical challenges of such a transition are considerable and should not be dismissed.

The case for car-free city centres rests on a powerful body of evidence. Urban air pollution, much of it caused by vehicle emissions, is estimated to cause over 7 million premature deaths worldwide each year. In cities such as Oslo and Amsterdam, pedestrianisation schemes have led to measurable improvements in air quality, reduced noise levels and, perhaps most surprisingly, a boost to local economies. Retailers initially feared that removing cars would harm trade; the evidence suggests the opposite. When people walk, they tend to spend more time — and more money — in local businesses.

Furthermore, the social case for reclaiming urban space is compelling. Streets designed for cars leave little room for parks, cycle lanes, cafés or community spaces. Cities that have reduced car access, such as Pontevedra in Spain, report dramatic drops in road accidents and a stronger sense of community among residents. The quality of life, in short, improves significantly when urban space is no longer dominated by the private vehicle.

That said, a blanket ban on private cars is not without its problems. For many people — particularly those in outer suburbs, those with disabilities, or those whose work requires transporting goods or equipment — cars remain not a luxury but a necessity. Notwithstanding the environmental benefits, forcing a car-dependent population to abandon their vehicles overnight would cause genuine hardship. Any serious policy must account for this reality.

The answer, arguably, lies not in an overnight ban but in a carefully managed transition: expanding and improving public transport, investing in cycling infrastructure, introducing congestion charges and creating car-free zones gradually. Oslo has demonstrated that a phased approach can work. The city reduced private car journeys in its centre by 19% in just three years through a combination of better cycle lanes, improved tram services and targeted restrictions — not an outright ban.

In conclusion, the question is not whether cities should reduce their dependence on private cars — the evidence is overwhelming that they should — but how to do so fairly and effectively. The goal is not to punish drivers, but to create cities that work better for everyone. And on that, at least, most people can agree.`,
    vocabulary: [
      vocab('utopian', 'utópico, irrealista', 'The proposal seemed utopian, but it worked.', ''),
      vocab('compelling', 'convincente, persuasivo', 'The evidence is compelling.', '"compelling reasons/case/evidence" — colocação frequente'),
      vocab('pedestrianisation', 'pedestrianização', 'The pedestrianisation of the square transformed the area.', ''),
      vocab('blanket ban', 'proibição total/abrangente', 'A blanket ban on all vehicles would be unrealistic.', '"blanket" = que cobre tudo sem exceção'),
      vocab('phased approach', 'abordagem gradual/por fases', 'A phased approach is more practical than sudden change.', '"phased" = planejado em etapas'),
      vocab('outright', 'total, completo, sem condições', 'An outright ban would be very difficult to implement.', '"outright ban/victory/refusal" — colocações fixas'),
    ],
    comprehensionQuestions: [
      q('What is the author\'s main position on banning private cars from city centres?', 'The author supports reducing car dependence, but favours a gradual, managed transition rather than an outright ban.', 'Paragraph 5: "The answer, arguably, lies not in an overnight ban but in a carefully managed transition."', 'The author is balanced — not fully against cars, but strongly in favour of reducing them.'),
      q('According to paragraph 3, what happened to local businesses in areas that reduced car access?', 'Retailers initially feared losing trade, but evidence shows the opposite — people who walk spend more time and money locally.', 'Paragraph 2: "When people walk, they tend to spend more time — and more money — in local businesses."', 'This is a common argument used to oppose the anti-car view — the author refutes it.'),
      q('What example does the author use in paragraph 5 to argue for a phased approach?', 'Oslo reduced private car journeys in its centre by 19% in three years through a combination of better cycle lanes, improved tram services and targeted restrictions.', 'Paragraph 5: "Oslo has demonstrated that a phased approach can work."', 'The author uses a real example to make the argument credible.'),
    ],
    evidenceQuestions: [
      q('Find evidence in the text that car-free zones can benefit local economies. Quote directly.', '"When people walk, they tend to spend more time — and more money — in local businesses."', 'Paragraph 2', '"The evidence suggests the opposite" — note the hedging before the claim.'),
      q('The author acknowledges that banning cars would cause problems. Who would be most affected?', 'People in outer suburbs, those with disabilities, and those whose work requires transporting goods or equipment.', 'Paragraph 4: "For many people... cars remain not a luxury but a necessity."', 'This is an important concession — the author is not dismissing real-life limitations.'),
      q('What does "blanket ban" mean in context? Why does the author use this phrase?', '"Blanket ban" means a complete, across-the-board prohibition with no exceptions. The author uses it to signal that such an extreme measure is impractical.', 'Paragraph 4: "a blanket ban on private cars is not without its problems"', 'The word "blanket" implies criticism of oversimplification.'),
    ],
    shortResponse: [
      task('In your own words (40-60 words), summarise the author\'s conclusion about banning cars from cities.', 'Do not copy directly from the text. Use your own words.', 'The author concludes that cities should reduce their dependence on private cars, but through a gradual, fair transition — better public transport, cycling infrastructure and congestion charges — rather than an abrupt, total ban that would harm many people.'),
    ],
    guidedSummary: task(
      'Write a 2-sentence summary of the article using these stems: "The article argues that... Nevertheless, the author acknowledges that..."',
      'Use the discourse markers from this unit (nevertheless, albeit, notwithstanding) in your summary.',
      'The article argues that reducing private car use in city centres brings clear environmental, health and social benefits, as demonstrated by cities such as Oslo and Amsterdam. Nevertheless, the author acknowledges that an outright ban would cause hardship for many and that a phased approach — combining better public transport, cycle infrastructure and targeted restrictions — is the most practical path forward.',
    ),
    connectedProduction: task(
      'Write 80-100 words responding to this question: "Do you think your city should reduce private car use? Why or why not?" Use at least 2 discourse markers from this unit.',
      'Use: nevertheless, albeit, notwithstanding, in contrast, on balance.',
      'Think about: Who would be affected? What alternatives exist? What are the realistic steps?',
    ),
    firstReadTask: task('Read the article once quickly. Decide: Is the author (a) strongly for banning cars, (b) against banning cars, or (c) in favour of a balanced approach?', 'Skim — do not stop at every word.'),
    secondReadTasks: [
      task('Read again carefully. Find and underline all discourse markers (However, That said, Notwithstanding, Furthermore, Albeit, In conclusion, Arguably).'),
      task('For each paragraph, write one sentence summarising the main point.'),
    ],
    contextVocabularyTasks: [
      task('Find the word "compelling" in paragraph 1. What does it tell you about the evidence for banning cars?', '', '"Compelling" means the evidence is persuasive and hard to dismiss. It signals the author believes it strongly.'),
      task('Find "phased approach" in paragraph 5. What is the opposite of a phased approach?', '', 'An overnight/sudden/immediate ban — the opposite of gradual.'),
    ],
  }),

  // ─── LISTENING ──────────────────────────────────────────────────────────────

  createListeningLesson({
    ...common,
    id: 'B2-LISTENING-001',
    order: 1,
    title: 'Podcast excerpt: Is remote work really working?',
    objectives: [
      'Compreender fala natural com velocidade, redução e fillers reais.',
      'Identificar posições, argumentos e concessões em uma discussão informal entre especialistas.',
      'Inferir a opinião de cada falante sem que ele a expresse explicitamente.',
      'Reconhecer hedging language e marcadores de discurso na fala natural.',
      'Fazer shadowing de fragmentos com entonação e ritmo naturais.',
    ],
    listeningPreparation: [
      task('Antes de ouvir, responda: você trabalha/estudou de forma remota? O que foi bom? O que foi difícil?'),
      task('Predição: você vai ouvir dois profissionais discutindo trabalho remoto. Que argumentos você espera ouvir a favor e contra?'),
      task('Palavras-chave para reconhecer: remote work, productivity, isolation, collaboration, flexibility, trust, output.'),
    ],
    keyWordsToHear: [
      vocab('output', 'produção, resultado', '"Managers need to focus on output, not hours."', 'Output = resultado do trabalho, não o processo'),
      vocab('isolation', 'isolamento', '"One of the biggest drawbacks is social isolation."', 'Diferente de "solitude" (solidão escolhida)'),
      vocab('synchronous', 'síncrono (ao mesmo tempo)', '"We still need synchronous communication for complex decisions."', 'Antônimo: "asynchronous"'),
      vocab('presenteeism', 'presenteísmo (estar fisicamente mas improdutivo)', '"We\'ve replaced presenteeism with a new form of it online."', 'Importante conceito de gestão B2/C1'),
      vocab('drawback', 'desvantagem, ponto negativo', '"What are the main drawbacks of full remote?"', '"Drawback" = mais formal que "problem"; menos negativo que "flaw"'),
    ],
    transcript: `HOST (Priya): Welcome back to Work Forward. I\'m Priya, and today I have two guests who have very different views on remote work. Adam, you\'re a productivity consultant, and you\'ve been saying for a while now that the data on remote work is more complicated than people think. And then we have Joanna, who is the COO of a fully remote tech company. So Adam, let\'s start with you. What does the data actually say?

ADAM: Well, I think what gets lost in this conversation is the difference between individual productivity and collective productivity. So... if you ask someone working from home, "Are you getting more done?" they will often say yes. And they\'re not lying. But what they\'re measuring is their own output. What they\'re not measuring is what happens to the team as a whole. The spontaneous conversations, the accidental collaboration, the mentoring of junior employees — those things don\'t show up in any productivity metric.

PRIYA: Joanna, I imagine you\'d push back on that.

JOANNA: I would, yeah. I think Adam is describing a problem with office culture, not with remote work. The idea that you need to be in the same building for collaboration to happen — I\'d argue that\'s a very 20th-century assumption. Our teams collaborate constantly. We use asynchronous tools, we have structured check-ins, and our output — by any measurable standard — is higher than it was when we had an office.

ADAM: But that\'s a tech company, Joanna. You\'re working with people who are, by definition, comfortable with digital tools, who have home offices, who probably have fast internet and quiet spaces. What about the junior employee in a shared flat? What about the person who needs to see a mentor to learn? Remote work works incredibly well for some people and some industries, and it works terribly for others.

JOANNA: That\'s... that\'s actually a fair point. I\'ll concede that. Equity in remote work is a real issue. Not everyone has the same setup. But I\'d argue the solution isn\'t to go back to the office — it\'s to invest in making remote work accessible. Provide equipment, co-working space stipends, better broadband.

PRIYA: So you\'re both sort of agreeing, then, that it\'s not black and white?

ADAM: I suppose we are. My concern is that companies are treating remote work as a one-size-fits-all solution when it isn\'t. A hybrid model, done thoughtfully, probably gets you the best of both worlds. But "hybrid" is too often used as an excuse to do neither well.

JOANNA: On that, we\'re completely aligned. Hybrid that\'s just "come in on Wednesdays and Fridays for no clear reason" is worse than either extreme. If you\'re going to do hybrid, be intentional about it.

PRIYA: Alright, I\'ll give you both the last word — in one sentence, what\'s your take?

ADAM: Remote work has real benefits, albeit limited ones for certain roles and demographics, and companies need to stop pretending it\'s a universal solution.

JOANNA: Remote work, when done thoughtfully and equitably, is not just viable — it\'s better. The challenge is the "thoughtfully and equitably" part.`,
    firstListenTasks: [
      task('Ouça uma vez. Responda: Adam é mais a favor ou contra o trabalho remoto? E Joanna?', '', 'Adam: mais cético — aponta limitações e riscos para colaboração. Joanna: mais favorável — defende que funciona bem quando bem implementado.'),
      task('Qual ponto Joanna concede para Adam? Ela muda de posição completamente?', '', 'Ela concede que equidade é um problema real — nem todos têm setup adequado. Mas ela não muda de posição: propõe investir em acesso, não voltar ao escritório.'),
    ],
    secondListenTasks: [
      task('Identifique pelo menos 3 expressões de hedging/softening que Adam ou Joanna usam.', '', '"I\'d argue that...", "I suppose we are", "probably gets you...", "too often used as", "albeit limited ones"'),
      task('Adam usa "albeit" em sua frase final. Reescreva a frase em inglês mais simples, sem "albeit".', '', '"Remote work has real benefits, but they are limited for certain roles and demographics."'),
      task('Encontre 2 lugares onde um falante concede o argumento do outro. Anote o que foi dito.', '', '1. Joanna: "That\'s... that\'s actually a fair point. I\'ll concede that." (sobre equidade)\n2. Adam: "I suppose we are [agreeing]." (sobre não ser preto no branco)'),
    ],
    listeningComprehension: [
      q('What does Adam say is missing from individual productivity data?', 'The collective impact on the team — including spontaneous conversations, accidental collaboration and mentoring of junior employees.', 'Adam: "What they\'re not measuring is what happens to the team as a whole."', 'This is his core argument: individual data ≠ collective outcome.'),
      q('What is Joanna\'s response to Adam\'s criticism about collaboration?', 'She argues that needing to be in the same building for collaboration is a "20th-century assumption" and that her remote teams collaborate constantly using asynchronous tools.', 'Joanna: "The idea that you need to be in the same building... I\'d argue that\'s a very 20th-century assumption."', ''),
      q('What equity concern does Adam raise, and how does Joanna respond?', 'Adam says not everyone has the same remote work setup — junior employees in shared flats, people without home offices or mentors. Joanna concedes the point but argues the solution is to invest in access, not return to offices.', 'Adam: "What about the junior employee in a shared flat?" / Joanna: "I\'ll concede that. But I\'d argue the solution isn\'t to go back to the office."', 'This is a key exchange — pay attention to how Joanna agrees partially but maintains her position.'),
    ],
    shadowing: [
      {
        line: 'Remote work has real benefits, albeit limited ones for certain roles and demographics, and companies need to stop pretending it\'s a universal solution.',
        focus: 'Rhythm and linking: "real benefits" — "albeit limited ones" — "and companies need to". Note how "albeit" connects the concession without pausing too long.',
        tip: 'Say it as one flowing unit, not word by word. "albeit" sounds like "all-bite" — stress the contrast.',
      },
      {
        line: 'The spontaneous conversations, the accidental collaboration, the mentoring of junior employees — those things don\'t show up in any productivity metric.',
        focus: 'Listing intonation: each item slightly higher than the last, then pause at the dash, then fall on the conclusion.',
        tip: 'The dash (—) is a natural dramatic pause. Use it to breathe and then deliver "those things" as the payoff.',
      },
      {
        line: 'Hybrid that\'s just "come in on Wednesdays and Fridays for no clear reason" is worse than either extreme.',
        focus: 'Sarcastic intonation on the quoted speech. Natural British rhythm on "for no clear reason".',
        tip: 'The quote marks are implied by slight rise in voice + slight pause before and after. This is how native speakers signal irony.',
      },
    ],
    dictationTasks: [
      task('Ouça este trecho e escreva palavra por palavra: "If you\'re going to do hybrid, be intentional about it."', 'Atenção: "intentional" é uma palavra B2 — não "intended" nem "with intention".', '"If you\'re going to do hybrid, be intentional about it."'),
      task('Ouça e escreva: Adam\'s final sentence. Preste atenção em "albeit" e "demographics".', '', '"Remote work has real benefits, albeit limited ones for certain roles and demographics, and companies need to stop pretending it\'s a universal solution."'),
    ],
    oralProduction: task(
      'After listening, respond in 60-90 seconds: "Whose view do you find more convincing — Adam\'s or Joanna\'s? Why?" Use at least 2 discourse markers.',
      'Structure: state your position → give 1 reason → acknowledge the other side → conclude.',
      'Start with: "I find [Adam/Joanna\'s] view more convincing because..." or "On balance, I would side with... nevertheless..."',
    ),
    vocabulary: [
      vocab('presenteeism', 'presenteísmo', '"We\'ve replaced office presenteeism with online presenteeism."', 'Pessoa está "presente" mas não produtiva — problema de gestão'),
      vocab('stipend', 'subsídio, ajuda de custo', '"Co-working space stipends for remote workers."', '"Stipend" = pagamento regular para cobrir custos específicos'),
      vocab('equitable', 'equitativo, justo', '"Remote work needs to be done equitably."', 'Mais formal que "fair"; implica consideração de desigualdades estruturais'),
    ],
  }),

  // ─── WRITING ────────────────────────────────────────────────────────────────

  createWritingLesson({
    ...common,
    id: 'B2-WRITING-001',
    order: 1,
    title: 'Formal opinion paragraph with hedging and discourse markers',
    objectives: [
      'Escrever um parágrafo de opinião formal de 100-130 palavras com estrutura clara.',
      'Usar hedging language para expressar posições com a certeza adequada.',
      'Integrar discourse markers B2 (nevertheless, albeit, notwithstanding, in contrast).',
      'Incluir evidência ou exemplo concreto para suportar o argumento.',
      'Fazer uma concessão genuína sem abandonar a posição central.',
    ],
    modelText: `In my view, remote work represents a significant improvement in quality of life for many professionals, albeit one that brings genuine challenges that should not be ignored. The evidence suggests that flexible working arrangements increase individual productivity and reduce commuting stress — benefits that are difficult to dismiss. Nevertheless, the social dimension of office work — informal mentoring, spontaneous collaboration, team cohesion — is not easily replicated online. Notwithstanding these limitations, I would argue that the solution is not a return to full-time office work, but rather a thoughtful hybrid model that balances individual flexibility with collective needs. On balance, the benefits of remote work outweigh the drawbacks, provided it is implemented with care and equity.`,
    modelTextBreakdown: [
      { part: 'Position opener', text: '"In my view, remote work represents a significant improvement in quality of life for many professionals"', note: '"In my view" is more formal than "I think". The position is clear and direct from the start.' },
      { part: 'Concession with albeit', text: '"albeit one that brings genuine challenges that should not be ignored"', note: '"Albeit one that..." = even though it is one that. Compact, formal concession immediately after the position.' },
      { part: 'Evidence with hedging', text: '"The evidence suggests that flexible working arrangements increase individual productivity..."', note: '"The evidence suggests" = hedging. Not "proves" — the author is measured, not absolute.' },
      { part: 'Contrast with nevertheless', text: '"Nevertheless, the social dimension of office work... is not easily replicated online."', note: '"Nevertheless" signals the counter-argument. "Not easily replicated" is hedged — not "cannot be replicated".' },
      { part: 'Position with notwithstanding', text: '"Notwithstanding these limitations, I would argue that..."', note: '"Notwithstanding" acknowledges the limitations but moves past them. "I would argue" is more tentative than "I believe".' },
      { part: 'Balanced conclusion', text: '"On balance, the benefits of remote work outweigh the drawbacks, provided it is implemented with care and equity."', note: '"On balance" = after considering everything. "Provided" = conditional — the conclusion is not unconditional.' },
    ],
    writingBlocks: [
      { step: 1, name: 'Position opener', instruction: 'State your opinion on the topic clearly. Use: "In my view", "I would argue that", or "From my perspective".' },
      { step: 2, name: 'Concession (albeit)', instruction: 'Add an immediate concession using "albeit" + noun phrase or adjective. Do NOT use albeit + subject + verb.' },
      { step: 3, name: 'Evidence', instruction: 'Support your position with a specific example or piece of evidence. Use: "The evidence suggests that...", "Research indicates that...", "Studies show that...".' },
      { step: 4, name: 'Counter-argument (nevertheless)', instruction: 'Acknowledge the main objection to your view. Use: "Nevertheless," or "That said," or "Whilst I acknowledge that...".' },
      { step: 5, name: 'Your response to the counter', instruction: 'Refute or qualify the counter-argument. Use: "Notwithstanding", "I would argue that", "The solution is not X but rather Y".' },
      { step: 6, name: 'Conclusion', instruction: 'End with a balanced conclusion. Use: "On balance,", "In conclusion,", "Ultimately,".' },
    ],
    grammarForWriting: [
      { structure: 'Hedging with suggest/appear', example: '"The evidence suggests that..." / "It would appear that..."', note: 'Use hedging when you\'re presenting data or claims that are probable but not absolute.' },
      { structure: 'Conditional conclusion', example: '"...provided it is implemented carefully." / "...as long as..."', note: 'A conditional shows maturity — you\'re not making unconditional claims.' },
      { structure: 'Passive for objectivity', example: '"It is widely argued that..." / "Remote work is often cited as..."', note: 'Impersonal passive creates academic distance.' },
      { structure: 'Concessive adverbials', example: '"Notwithstanding the challenges..." / "Despite the limitations..."', note: 'Both introduce a concession — notwithstanding is more formal.' },
    ],
    usefulSentences: [
      'In my view, [topic] represents [position], albeit [concession].',
      'The evidence suggests that [claim], a benefit that is difficult to dismiss.',
      'Nevertheless, [counter-argument] should not be overlooked.',
      'Notwithstanding [limitation], I would argue that [your response].',
      'On balance, [conclusion], provided [condition].',
      'Whilst I acknowledge that [concession], I maintain that [position].',
      'It is worth noting that [important point], which [implication].',
    ],
    draftTask: task(
      'Write your opinion paragraph (100-130 words) on ONE of the following topics. Follow the 6-step structure above.',
      'Choose: (A) "Should university education be free for everyone?", (B) "Is technology making us less creative?", or (C) "Should social media companies be regulated by governments?"',
      'Your paragraph must include: a clear position, an albeit concession, evidence or example, nevertheless + counter-argument, notwithstanding or "that said" + response, and on balance + conclusion.',
    ),
    revisionTask: task(
      'Review your paragraph using the checklist below. Then revise it once before submitting.',
      'Minimum revision: fix any discourse marker errors and check word count (100-130).',
    ),
    revisionChecklist: [
      'My paragraph states a clear position in the first sentence.',
      '"Albeit" is followed by a noun phrase or adjective — NOT by a full clause (subject + verb).',
      '"Nevertheless" or "that said" introduces a genuine counter-argument, not just repetition.',
      '"Notwithstanding" acknowledges the limitation and moves the argument forward.',
      'I used at least one form of hedging (the evidence suggests, I would argue, arguably, it would appear).',
      'I gave at least one specific example or piece of evidence.',
      'My conclusion uses "On balance" or equivalent and summarises my position.',
      'I avoided starting sentences with "And" or "But" in formal writing.',
      'Word count is between 100 and 130 words.',
      'There are no direct copies from the model text — the ideas and examples are my own.',
    ],
    commonWritingMistakes: [
      { mistake: '"Albeit it is expensive..."', correction: '"...albeit an expensive one" / "...albeit expensive"', explanation: 'Albeit is followed directly by an adjective, noun or noun phrase — not by a full clause.' },
      { mistake: '"On the contrary, remote work has benefits."', correction: '"In contrast, remote work offers significant benefits." / "On balance, remote work..."', explanation: '"On the contrary" corrects a false premise. "On balance" and "in contrast" are for weighing views.' },
      { mistake: '"I think that maybe remote work could perhaps be..."', correction: '"I would argue that remote work is..."', explanation: 'Stacked hedging sounds unconfident. One form of hedging is sufficient ("I would argue", "the evidence suggests").' },
      { mistake: '"The evidences show..."', correction: '"The evidence shows..." / "Studies indicate..."', explanation: '"Evidence" is uncountable in English. Never use "evidences" or "an evidence".' },
    ],
    feedbackPreparation: [
      task('After writing your draft, read it aloud once. Does each sentence connect smoothly to the next?', 'Check: no abrupt jumps between ideas. Each discourse marker should signal the relationship clearly.'),
      task('Count the discourse markers you used. Did you use at least 3 (albeit, nevertheless, notwithstanding or equivalent)?'),
    ],
  }),

]);

export const B2_DEEP_BRIDGE_PART2_BY_PILLAR = Object.freeze({
  grammar: Object.freeze([]),
  vocabulary: Object.freeze([]),
  reading: Object.freeze(B2_DEEP_BRIDGE_PART2.filter(l => l.pillar === 'reading')),
  listening: Object.freeze(B2_DEEP_BRIDGE_PART2.filter(l => l.pillar === 'listening')),
  speaking: Object.freeze([]),
  writing: Object.freeze(B2_DEEP_BRIDGE_PART2.filter(l => l.pillar === 'writing')),
});
