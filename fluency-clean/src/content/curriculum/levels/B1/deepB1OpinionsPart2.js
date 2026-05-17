import { createGrammarLesson, createReadingLesson, createListeningLesson, createWritingLesson } from '../../../schemas/index.js';

const level = 'B1';
const status = 'ready';
const common = { level, status, estimatedMinutes: 60, tags: ['b1-3', 'opinions', 'discussion', 'deep-approved-target'] };

function task(instruction, note = '', expected = '') { return { instruction, note, expected }; }
function q(question, answer, evidence = '', why = '') { return { question, answer, evidence, why }; }

export const B1_DEEP_OPINIONS_PART2 = Object.freeze([

  // ─── GRAMMAR-008: Linkers ─────────────────────────────────────────────────────
  createGrammarLesson({
    ...common,
    id: 'B1-GRAMMAR-008',
    order: 8,
    title: 'Linkers: although, however, therefore, besides, despite',
    objectives: [
      'Usar "although" e "even though" para contraste dentro de uma frase.',
      'Usar "however" e "nevertheless" para contraste entre frases.',
      'Usar "therefore" e "as a result" para causa-consequência.',
      'Usar "besides" e "moreover" para adição de argumento.',
      'Usar "despite" e "in spite of" com gerúndio ou substantivo.',
    ],
    teacherOpening: 'No B1, você conecta ideias com mais sofisticação. Esta aula ensina os conectores de argumento — as peças que transformam uma lista de frases em um raciocínio organizado e persuasivo.',
    whyItMatters: 'Linkers aparecem em todas as redações de exame B1, em emails formais, em apresentações e em qualquer conversa onde você precise estruturar um argumento. Sem eles, seu inglês soa fragmentado.',
    differenceFromA2: 'No A2: "It is expensive. But it is good." No B1: "Although it is expensive, it is worth the investment. However, not everyone can afford it. Therefore, the government should consider subsidies."',
    grammarTable: {
      headers: ['Função', 'Conector', 'Posição', 'Exemplo'],
      rows: [
        ['Contraste (mesma frase)', 'although / even though', 'início ou meio', 'Although it was raining, we went for a walk.'],
        ['Contraste (frase nova)', 'however / nevertheless', 'início de frase + vírgula', 'It was raining. However, we went for a walk.'],
        ['Consequência', 'therefore / as a result / consequently', 'início de frase + vírgula', 'It rained. Therefore, we cancelled the trip.'],
        ['Adição', 'besides / moreover / what\'s more / furthermore', 'início de frase', 'It\'s cheaper. Besides, it\'s faster.'],
        ['Contraste (preposição)', 'despite / in spite of', 'before noun/gerund', 'Despite the rain, we went out.'],
        ['Concessão', 'even so', 'início de frase', 'It\'s risky. Even so, I think we should try.'],
      ],
    },
    whenToUse: [
      '"Although/Even though": quando o contraste está DENTRO de uma frase com duas cláusulas.',
      '"However/Nevertheless": quando o contraste está ENTRE duas frases separadas.',
      '"Therefore/As a result": para mostrar consequência lógica direta.',
      '"Besides/Moreover": para adicionar argumento a favor (mais forte que "also").',
      '"Despite/In spite of" + noun ou gerund: contraste com substantivo ou -ing, nunca + that-clause diretamente.',
    ],
    whenNotToUse: [
      'Não use "although" e "but" juntos na mesma frase: "Although it was late, but we stayed." → ERRADO.',
      'Não use "despite of": "despite of the cost" → ERRADO. Use "despite the cost".',
      'Não use "however" no meio de uma cláusula como "but": "I however don\'t agree." → use início da frase.',
      'Não use "despite + that-clause" diretamente: "Despite that it rained..." → use "Despite the rain..." ou "Although it rained...".',
    ],
    teacherExamples: [
      task('Although the project was expensive, it delivered excellent results.', '"Although" no início — contraste dentro da frase.', 'Contraste na mesma frase.'),
      task('The project was expensive. However, it delivered excellent results.', '"However" abre a segunda frase — separadas por ponto.', 'Contraste entre frases.'),
      task('Sales increased by 30%. Therefore, the team received a bonus.', '"Therefore" = consequência lógica direta de uma causa.', 'Causa → consequência.'),
      task('It\'s a good opportunity. Besides, the salary is excellent.', '"Besides" adiciona argumento a favor.', 'Adição de argumento.'),
      task('Despite the heavy traffic, she arrived on time.', '"Despite" + substantivo (the heavy traffic), não + that-clause.', 'Preposição de contraste.'),
    ],
    commonBrazilianMistakes: [
      { wrong: 'Although it was raining, but we went out.', right: 'Although it was raining, we went out.', why: '"Although" e "but" não coexistem na mesma frase — escolha um.' },
      { wrong: 'Despite of the difficulties, she succeeded.', right: 'Despite the difficulties, she succeeded.', why: '"Despite" é preposição direta — sem "of".' },
      { wrong: 'Despite that it rained, we went out.', right: 'Despite the rain, we went out. / Although it rained, we went out.', why: '"Despite" não aceita "that" + cláusula. Use substantivo/gerúndio ou troque por "although".' },
      { wrong: 'However it was late, we stayed.', right: 'Although it was late, we stayed. / It was late. However, we stayed.', why: '"However" não substitui "although" — é de frases separadas. Para cláusula subordinada, use "although".' },
    ],
    controlledPractice: [
      task(
        'Complete com o conector correto (although / however / therefore / besides / despite):',
        '1. ___ the cost, the company decided to invest. 2. It is a good product. ___, it is too expensive. 3. ___ she was nervous, she performed well. 4. He worked late. ___, he finished the project on time. 5. It\'s convenient. ___, it saves money.',
        '1. Despite. 2. However. 3. Although. 4. Therefore. 5. Besides.'
      ),
      task(
        'Reescreva usando o conector entre parênteses (mude a estrutura quando necessário):',
        '1. "It was cold. We went swimming." (Although) 2. "She studied hard. She passed the exam." (Therefore) 3. "The traffic was bad. He arrived on time." (Despite)',
        '1. Although it was cold, we went swimming. 2. She studied hard. Therefore, she passed the exam. 3. Despite the bad traffic, he arrived on time.'
      ),
    ],
    errorCorrectionPractice: [
      task('Corrija: "Although it was difficult, but she didn\'t give up."', '', '"Although it was difficult, she didn\'t give up." — remova "but".'),
      task('Corrija: "Despite of his experience, he made mistakes."', '', '"Despite his experience, he made mistakes." — sem "of".'),
      task('Corrija: "However it rained, we had a good time."', '', '"Although it rained, we had a good time." — use "although" para subordinada.'),
    ],
    translationPractice: [
      task('Traduza: "Apesar das dificuldades, o projeto foi bem-sucedido."', '', 'Despite the difficulties, the project was successful.'),
      task('Traduza: "Embora seja caro, vale a pena."', '', 'Although it is expensive, it is worth it.'),
      task('Traduza: "Os custos aumentaram. Portanto, precisamos reduzir gastos."', '', 'Costs increased. Therefore, we need to cut expenses.'),
    ],
    productionTasks: [
      task(
        'Escreva um parágrafo de 5-6 frases sobre um tema atual usando pelo menos: 1× although, 1× however, 1× therefore, 1× besides.',
        'Tema sugerido: vantagens e desvantagens do trabalho remoto / tecnologia na educação.',
      ),
      task(
        'Transforme estas 4 frases simples em um parágrafo conectado usando linkers:',
        '"Technology is useful in schools. It can be distracting. It helps students learn. Teachers need training."',
        'Technology is useful in schools. However, it can be distracting. Despite this, it helps students learn more effectively. Therefore, teachers need training to use it well.'
      ),
    ],
    lessonRecap: [
      '"Although/Even though" = contraste numa frase só. "However" = contraste entre frases separadas.',
      '"Although...but" = ERRADO — nunca juntos.',
      '"Despite" + substantivo/gerúndio — NUNCA "despite of" ou "despite that".',
      '"Therefore" = consequência lógica. "Besides" = adição de argumento favorável.',
    ],
    nextLessonBridge: 'Na próxima aula de Reading, você vai ler um texto de opinião real e identificar como os linkers e as frases de debate estruturam o argumento.',
  }),

  // ─── READING-003: Opinion text ────────────────────────────────────────────────
  createReadingLesson({
    ...common,
    id: 'B1-READING-003',
    order: 3,
    title: 'Reading an opinion text — two sides of an argument',
    objectives: [
      'Ler um texto de opinião de 280-300 palavras com argumento estruturado.',
      'Identificar a posição do autor, os argumentos a favor e os contra.',
      'Reconhecer linkers e frases de opinião em contexto real.',
      'Inferir o tom e a intenção do autor.',
      'Produzir uma resposta pessoal ao argumento.',
    ],
    teacherOpening: 'Textos de opinião são uma forma fundamental de inglês escrito — em jornais, blogs, ensaios e exames. Esta aula treina a leitura crítica: não só o que o texto diz, mas como ele argumenta.',
    whyItMatters: 'Ler textos de opinião prepara você para escrever os seus — e para entender como falantes nativos estruturam argumentos em inglês. É também um componente essencial de todos os exames B1.',
    differenceFromA2: 'No A2, você lia textos descritivos simples. No B1, você lê textos argumentativos — com posição, contra-argumentos e conclusão — e precisa identificar a estrutura lógica, não só o conteúdo.',
    mainText: `Should cities ban cars from their centres?

Traffic congestion and air pollution have become serious problems in many urban areas. As a result, some cities are considering banning private cars from their centres altogether. But is this the right solution?

Those in favour argue that car-free zones would dramatically improve air quality and reduce noise pollution. Moreover, pedestrians and cyclists would feel much safer on the streets. Cities like Amsterdam and Oslo have already shown that reducing car use is not only possible but also beneficial for local businesses, as more people tend to walk into shops.

However, critics point out that banning cars would seriously inconvenience people who rely on them, particularly those with disabilities or those who live far from public transport links. Although better public transport could compensate for this, many cities simply do not have the infrastructure in place. Besides, forcing people to change habits overnight rarely works — a gradual approach might be more effective.

In my view, a complete ban is too drastic. Despite the clear environmental benefits, it is unfair to those who depend on cars. A better approach would be to invest in public transport first and introduce congestion charges to discourage unnecessary car use. That said, I strongly believe that making city centres more pedestrian-friendly is a step in the right direction, and should be a priority for any forward-thinking city.`,
    comprehensionQuestions: [
      q(
        'What is the main problem the text is addressing?',
        'Traffic congestion and air pollution in urban areas.',
        '"Traffic congestion and air pollution have become serious problems in many urban areas."',
        'This is the context that justifies the discussion.'
      ),
      q(
        'What evidence do supporters of car-free zones give from existing cities?',
        'Cities like Amsterdam and Oslo have shown it is possible and beneficial — more people walk into shops.',
        '"Cities like Amsterdam and Oslo have already shown that reducing car use is not only possible but also beneficial for local businesses."',
        'Real-world examples are used to support the argument.'
      ),
      q(
        'What is the main argument AGAINST a car ban?',
        'It would inconvenience people who depend on cars, especially those with disabilities or who live far from public transport.',
        '"Critics point out that banning cars would seriously inconvenience people who rely on them, particularly those with disabilities."',
      ),
      q(
        'What is the author\'s personal conclusion?',
        'A complete ban is too drastic. The author prefers investing in public transport first and using congestion charges — but agrees city centres should become more pedestrian-friendly.',
        '"In my view, a complete ban is too drastic... A better approach would be to invest in public transport first."',
        'The author uses "In my view" to signal their personal stance.'
      ),
      q(
        'Find three linkers from this unit used in the text.',
        'As a result / Moreover / However / Although / Besides / Despite / That said — any three.',
        'Text contains: "As a result", "Moreover", "However", "Although", "Besides", "Despite", "That said".',
        'Identifying linkers in context reinforces their meaning and use.'
      ),
    ],
    vocabularyInContext: [
      task('What does "congestion" mean?', '', 'Too much traffic — vehicles blocking the road because there are too many of them.'),
      task('What does "infrastructure" mean in this context?', '', 'The basic systems a city needs: roads, railways, bus networks — the physical things that make transport work.'),
      task('What does "drastic" mean?', '', 'Extreme, severe — a drastic measure is a very strong action that makes a big change quickly.'),
      task('What does "forward-thinking" mean?', '', 'Thinking about and planning for the future — innovative and progressive.'),
    ],
    inferenceQuestions: [
      task('Does the author think car bans are completely wrong? Use evidence.', '', 'No — they agree city centres should be more pedestrian-friendly ("should be a priority"). They just prefer a gradual approach.'),
      task('Which group of people does the author seem most concerned about?', '', 'People with disabilities and those without good public transport access — mentioned specifically as most affected by a ban.'),
    ],
    guidedSummary: task(
      'Escreva um resumo de 3-4 frases do argumento do texto. Inclua: o problema, os dois lados, e a conclusão do autor.',
      'Use: "The text discusses..." / "Supporters argue that..." / "However, critics claim that..." / "The author concludes that..."',
      'The text discusses whether cities should ban cars from their centres. Supporters argue that car-free zones improve air quality and benefit local businesses. However, critics claim that many people rely on cars and infrastructure is lacking. The author concludes that a gradual approach — investing in transport and using congestion charges — is preferable to an outright ban.'
    ),
    productionTask: task(
      'Escreva 3-4 frases dando sua própria opinião sobre o assunto. Use pelo menos 2 linkers desta aula.',
      'Use: "In my view" / "Although" / "However" / "Despite" / "Therefore".',
    ),
    lessonRecap: [
      'Texto de opinião B1: contexto → argumentos a favor → argumentos contra → posição pessoal.',
      'O autor usa "In my view" para marcar claramente sua opinião pessoal.',
      'Linkers estruturam o argumento: "Moreover" (adição), "However" (contraste), "Despite" (concessão), "Therefore" (consequência).',
      '"That said" no final = forma de qualificar a posição antes da conclusão.',
    ],
    nextLessonBridge: 'Na próxima aula de Listening, você vai ouvir uma discussão entre duas pessoas com opiniões opostas — e praticar identificar os argumentos e os conectores de cada lado.',
  }),

  // ─── LISTENING-003: A discussion ──────────────────────────────────────────────
  createListeningLesson({
    ...common,
    id: 'B1-LISTENING-003',
    order: 3,
    title: 'Listening to a discussion — two people with different views',
    objectives: [
      'Ouvir uma discussão entre duas pessoas com opiniões diferentes.',
      'Identificar a posição de cada falante e os argumentos usados.',
      'Reconhecer frases de concordância, discordância e concessão.',
      'Distinguir quando um falante concede um ponto vs. quando mantém sua posição.',
      'Praticar shadowing de frases de debate.',
    ],
    teacherOpening: 'Ouvir uma discussão real em inglês é diferente de ouvir um monólogo. Os falantes interrompem, concordam parcialmente, contradizem e reformulam. Esta aula treina o ouvido para o inglês de debate.',
    whyItMatters: 'Em reuniões, entrevistas em grupo, conversas informais e podcasts, as pessoas expressam opiniões opostas. Se você só entende opiniões simples, perde metade da conversa.',
    differenceFromA2: 'No A2, você ouvia concordância direta. No B1, você ouve nuances: "That\'s a fair point, but..." / "I see where you\'re coming from, although..." / "Having said that, I still think..."',
    audioDescription: 'Carlos e Priya discutem se cidades deveriam banir carros de seus centros. Carlos é a favor; Priya é contra.',
    transcript: `Carlos: I really think cities should ban cars from their centres. The air quality in most city centres is terrible, and it's getting worse.

Priya: That's a fair point about air quality. However, I'm not convinced a complete ban is the right approach. What about people who genuinely need their cars? People with disabilities, for instance, or people who live far from public transport?

Carlos: Well, in my view, public transport should be improved first — and it will be, if there's enough pressure on governments. Besides, many cities in Europe have already shown it works. Amsterdam, Oslo...

Priya: I see what you mean, although I'd say those cities have been investing in public transport for decades. It's not something you can fix overnight. Despite the environmental benefits, you can't just punish car users before the alternatives are in place.

Carlos: I agree that the transition needs to be gradual. That said, I strongly believe we need to start somewhere. If we wait for perfect public transport before making any changes, nothing will ever happen.

Priya: That's a reasonable point. I suppose what I'm saying is that the priority should be infrastructure first, then restrictions. On the other hand, I'd have to agree that making city centres more pedestrian-friendly — not a full ban, but more walking areas — would be a positive step.

Carlos: Exactly. So we actually agree on the direction, just not the speed?

Priya: I think so, yes. Though I'd say I'm more cautious than you about how fast we can realistically move.

Carlos: Fair enough. As long as we move in the right direction, I can live with that.`,
    comprehensionQuestions: [
      q(
        'What is Carlos\'s main argument in favour of banning cars?',
        'Air quality in city centres is terrible and getting worse.',
        '"The air quality in most city centres is terrible, and it\'s getting worse."',
      ),
      q(
        'What is Priya\'s main concern about a car ban?',
        'People who genuinely need cars — especially those with disabilities or far from public transport — would be disadvantaged.',
        '"What about people who genuinely need their cars? People with disabilities, for instance..."',
      ),
      q(
        'At what point does Priya partially agree with Carlos?',
        'She agrees that making city centres more pedestrian-friendly (more walking areas) would be a positive step — though not a full ban.',
        '"I\'d have to agree that making city centres more pedestrian-friendly... would be a positive step."',
        'Priya concedes a point while maintaining her overall cautious position.'
      ),
      q(
        'Do they reach any agreement? What is it?',
        'Yes — they agree on the direction (more pedestrian-friendly cities) but disagree on the speed of change.',
        '"So we actually agree on the direction, just not the speed?" / "I think so, yes."',
      ),
      q(
        'Find two examples of "partial agreement" language in the discussion.',
        'Any of: "That\'s a fair point. However..." / "I see what you mean, although..." / "That\'s a reasonable point. I suppose..." / "I\'d have to agree that..."',
        'Look for expressions that combine acknowledgement with a "but" — classic B1 debate language.',
      ),
    ],
    vocabulary: [
      task('What does "I see where you\'re coming from" mean?', '', 'I understand your perspective / your reasoning — it shows you\'ve listened even if you disagree.'),
      task('What does "you can\'t just punish car users" mean here?', '', 'You can\'t make things difficult/worse for car users (by removing their access) before giving them a better alternative.'),
      task('What does "live with that" mean in "I can live with that"?', '', 'Accept it, be okay with it — even if it\'s not ideal, it\'s tolerable.'),
    ],
    shadowing: [
      task('That\'s a fair point. However, I\'m not convinced a complete ban is the right approach.', 'Ritmo: THAT\'s a FAIR point. HOW-ever, I\'m not conVINCED...'),
      task('I see what you mean, although I\'d say those cities have been investing for decades.', 'Ligação: "I-see-what-you-mean" = frase fluida, sem pausa entre palavras.'),
      task('Having said that, I strongly believe we need to start somewhere.', 'Stress: having said THAT / STRONG-ly be-LIEVE / START somewhere.'),
    ],
    oralProduction: task(
      'Escolha um lado (Carlos ou Priya) e refaça os seus argumentos principais em suas próprias palavras — 60-90 segundos.',
      'Foco: usar "In my view...", "Although...", "That said...", "I\'m not convinced..."',
    ),
    lessonRecap: [
      '"That\'s a fair point. However..." = a estrutura mais natural de debate: reconhecer + contrastar.',
      '"I see what you mean, although..." = ouvir ativamente + discordar parcialmente.',
      'Concordância parcial: "I\'d have to agree that... (ponto específico), but not (ponto geral)."',
      'Em debates reais, as pessoas frequentemente chegam a acordo sobre a DIREÇÃO mas não a VELOCIDADE.',
    ],
    nextLessonBridge: 'Na próxima aula de Writing, você vai escrever seu próprio parágrafo de opinião — aplicando os linkers, as frases de debate e a estrutura argumento-concessão-conclusão.',
  }),

  // ─── WRITING-003: Opinion paragraph ──────────────────────────────────────────
  createWritingLesson({
    ...common,
    id: 'B1-WRITING-003',
    order: 3,
    title: 'Write an opinion paragraph with argument and concession',
    objectives: [
      'Escrever um parágrafo de opinião de 120-150 palavras com estrutura completa.',
      'Usar linkers de contraste, consequência e adição.',
      'Incluir uma concessão (ponto oposto reconhecido) antes da conclusão.',
      'Aplicar frases de opinião: In my view, I believe, That said, Although.',
    ],
    teacherOpening: 'Escrever opinião em inglês não é só "eu acho que X". É: posição → argumento → argumento → concessão → conclusão. Esta aula guia você passo a passo para escrever um parágrafo de opinião que soa natural, organizado e convincente.',
    whyItMatters: 'Parágrafos de opinião aparecem em exames B1 (IELTS, PET, Cambridge), em emails profissionais, em comentários e em qualquer situação onde você precise defender uma ideia por escrito.',
    modelText: `In my view, working from home has more advantages than disadvantages, at least for most knowledge workers. On the one hand, employees save a significant amount of time by not commuting. What's more, many people find they are more focused and productive in a quiet home environment. Although some argue that remote work leads to isolation, I think this can be managed with regular video calls and team meetings. That said, I do recognise that not everyone has a suitable home office, and that some roles genuinely require physical presence. Nevertheless, for those who do have the option, working from home is a better choice. Therefore, companies should offer flexibility rather than forcing a one-size-fits-all approach.`,
    modelTextBreakdown: [
      { line: 'In my view, working from home has more advantages than disadvantages,', note: 'Opening statement: clear opinion with "In my view" + main claim.' },
      { line: 'at least for most knowledge workers.', note: 'Qualifier: "at least for..." limits the claim — honest and nuanced.' },
      { line: 'On the one hand, employees save a significant amount of time by not commuting.', note: 'First argument: "On the one hand" introduces the first side.' },
      { line: 'What\'s more, many people find they are more focused and productive in a quiet home environment.', note: 'Second argument: "What\'s more" adds a stronger supporting point.' },
      { line: 'Although some argue that remote work leads to isolation,', note: 'Concession begins: "Although some argue..." acknowledges the counterpoint.' },
      { line: 'I think this can be managed with regular video calls and team meetings.', note: 'Rebuttal: author responds to the counterpoint directly.' },
      { line: 'That said, I do recognise that not everyone has a suitable home office,', note: '"That said" + further concession — shows balance and intellectual honesty.' },
      { line: 'and that some roles genuinely require physical presence.', note: 'Second concession: specific limitation recognised.' },
      { line: 'Nevertheless, for those who do have the option, working from home is a better choice.', note: '"Nevertheless" = despite the concessions, the main position holds.' },
      { line: 'Therefore, companies should offer flexibility rather than forcing a one-size-fits-all approach.', note: 'Conclusion: "Therefore" = logical consequence. Specific policy recommendation.' },
    ],
    commonWritingMistakes: [
      { wrong: 'Although it is expensive, but it is worth it.', right: 'Although it is expensive, it is worth it.', why: '"Although" and "but" cannot both appear in the same sentence — use one.' },
      { wrong: 'Despite of the difficulties, she succeeded.', right: 'Despite the difficulties, she succeeded.', why: '"Despite" is followed directly by a noun/gerund — never "of".' },
      { wrong: 'In my opinion I think that...', right: 'In my opinion, ... / I think that...', why: '"In my opinion" and "I think" are redundant together — use one.' },
      { wrong: 'Starting the essay: "I will talk about..."', right: 'Start with your position: "In my view, X is..."', why: 'Opinion paragraphs open with the position, not a meta-statement about what you will do.' },
    ],
    revisionChecklist: [
      task('Meu parágrafo tem 120-150 palavras?'),
      task('Abre com uma frase de opinião clara (In my view / I believe / In my opinion)?'),
      task('Tem pelo menos 2 argumentos a favor da minha posição?'),
      task('Inclui uma concessão (reconhece o ponto oposto)?'),
      task('Responde ao ponto oposto (rebuttal)?'),
      task('Usa pelo menos 3 linkers diferentes?'),
      task('Termina com uma conclusão que retoma a posição?'),
      task('Não usei "although...but" juntos? Não usei "despite of"?'),
    ],
    draftTask: task(
      'Escreva um parágrafo de opinião de 120-150 palavras sobre um dos temas abaixo.',
      'Temas: 1. Deveriam as universidades ser gratuitas? 2. A tecnologia está tornando as pessoas mais solitárias? 3. É melhor morar em cidade grande ou pequena? Estrutura: posição → arg 1 → arg 2 → concessão + rebuttal → conclusão.',
    ),
    revisionTask: task(
      'Revise seu rascunho com o checklist acima. Verifique especialmente: "although...but", "despite of", "in my opinion I think".',
      'Leia em voz alta para verificar se o argumento flui naturalmente.',
    ),
    finalVersionTask: task(
      'Escreva a versão final. Compare a estrutura com o modelo: abre com opinião, desenvolve argumento, faz concessão, conclui.',
      'Identifique no seu texto: 3 linkers, 1 concessão, 1 frase de opinião de abertura.',
    ),
    lessonRecap: [
      'Parágrafo de opinião B1: posição → argumento 1 → argumento 2 → concessão → rebuttal → conclusão.',
      '"Although...but" = ERRADO. "Despite of" = ERRADO. Verificar sempre.',
      '"That said / Nevertheless" = formas de manter a posição após concessão.',
      '"In my opinion I think..." = redundante — use apenas um dos dois.',
    ],
    nextLessonBridge: 'Você concluiu o pacote B1.3 Opinions! No próximo pacote, B1.4 Problems, Advice and Decisions, você vai aprender modais de obrigação e conselho (must, should, might) e como estruturar soluções para problemas.',
  }),

]);

export const B1_DEEP_OPINIONS_PART2_BY_PILLAR = Object.freeze({
  grammar: B1_DEEP_OPINIONS_PART2.filter(l => l.pillar === 'grammar'),
  vocabulary: B1_DEEP_OPINIONS_PART2.filter(l => l.pillar === 'vocabulary'),
  reading: B1_DEEP_OPINIONS_PART2.filter(l => l.pillar === 'reading'),
  listening: B1_DEEP_OPINIONS_PART2.filter(l => l.pillar === 'listening'),
  speaking: B1_DEEP_OPINIONS_PART2.filter(l => l.pillar === 'speaking'),
  writing: B1_DEEP_OPINIONS_PART2.filter(l => l.pillar === 'writing'),
});
