import { createGrammarLesson, createVocabularyLesson, createSpeakingLesson } from '../../../schemas/index.js';

const level = 'B2';
const status = 'ready';
const common = { level, status, estimatedMinutes: 65, tags: ['b2-1', 'bridge', 'b1-to-b2', 'deep-approved-target'] };

function task(instruction, note = '', expected = '') { return { instruction, note, expected }; }
function vocab(word, meaning, example = '', note = '') { return { word, meaning, example, note }; }
function phrase(text, translation = '', note = '') { return { text, translation, note }; }
function mistake(wrong, right, why = '') { return { wrong, right, why }; }
function q(question, answer, evidence = '', explanation = '', options = []) { return { question, answer, evidence, explanation, options }; }

export const B2_DEEP_BRIDGE_PART1 = Object.freeze([

  // ─── GRAMMAR ────────────────────────────────────────────────────────────────

  createGrammarLesson({
    ...common,
    id: 'B2-GRAMMAR-001',
    order: 1,
    title: 'Advanced discourse markers: nevertheless, albeit, in contrast, notwithstanding',
    objectives: [
      'Usar discourse markers avançados para conectar argumentos com precisão.',
      'Distinguir nevertheless/nonetheless de however e still.',
      'Usar albeit corretamente como substituto formal de "even though".',
      'Aplicar in contrast, on the contrary e notwithstanding em textos formais.',
      'Construir argumentos em inglês B2 com coesão e fluidez profissional.',
    ],
    teacherOpening: 'Você chegou ao B2. Isso significa que already conhece however, but, although e on the other hand. Agora é hora de dominar os conectores que tornam seu inglês fluente, profissional e persuasivo. Esta aula cobre as ferramentas que nativos usam para estruturar argumentos de forma sofisticada.',
    whyItMatters: 'No B2, argumentar não é só dizer "but" ou "however". É mostrar a relação exata entre duas ideias: concessão real, contraste lógico, condição com ressalva. Conectores avançados fazem isso com precisão. Eles também são obrigatórios no IELTS, TOEFL, e em qualquer escrita profissional ou acadêmica séria.',
    differenceFromB1: 'No B1, você usa however no começo de toda frase de contraste. No B2, você escolhe o conector certo para a relação exata: nevertheless (apesar disso, continuando), albeit (embora, com ressalva), notwithstanding (apesar de, legal/formal), in contrast (contrastando dois elementos diferentes). Não são intercambiáveis.',
    realLifeUseCases: [
      'Escrever e-mails profissionais com argumentação clara.',
      'Fazer apresentações com transições coerentes entre pontos.',
      'Responder em debates com frases estruturadas e precisas.',
      'Escrever relatórios, ensaios e análises em inglês.',
      'Ler e entender textos de jornal, negócios e academia.',
    ],
    conceptExplanation: 'Discourse markers avançados sinalizam ao ouvinte/leitor como duas ideias se relacionam. Cada um tem uma função específica:\n\n• nevertheless / nonetheless: "apesar disso" — a situação ou argumento anterior é real, mas a conclusão continua sendo diferente do que se esperaria. Equivale a "mesmo assim", "ainda assim".\n• albeit: "embora" — introduz uma ressalva ou qualificação após uma afirmação. Muito compacto. Sempre seguido de adjetivo, substantivo ou gerúndio, nunca de sujeito+verbo completo.\n• notwithstanding: "apesar de", "não obstante" — muito formal, frequente em textos legais, acadêmicos e oficiais. Pode vir antes ou depois do que modifica.\n• in contrast: "em contraste" — compara dois elementos distintos e opostos. Diferente de "on the contrary" (que corrige uma afirmação errada).',
    mentalModel: {
      title: 'Mapa de conectores de contraste/concessão B2',
      summary: 'Cada conector tem uma relação exata. Escolha com cuidado.',
      steps: [
        'However → simples contraste: "It rained. However, we went out."',
        'Nevertheless → apesar disso, a conclusão surpreende: "The results were poor. Nevertheless, the team continued."',
        'Albeit → ressalva compacta: "It was a success, albeit a modest one."',
        'Notwithstanding → apesar de (formal/legal): "Notwithstanding the risks, the project was approved."',
        'In contrast → comparação entre dois lados: "Brazil is warm. In contrast, Canada is cold."',
        'On the contrary → corrigir algo errado: "He\'s not lazy. On the contrary, he works 12 hours a day."',
      ],
    },
    grammarTable: [
      { connector: 'nevertheless', use: 'apesar disso, ainda assim', position: 'início de nova frase', formality: 'formal/neutro', example: 'The economy is weak. Nevertheless, consumer confidence remains high.' },
      { connector: 'nonetheless', use: 'mesmo assim (=nevertheless)', position: 'início ou fim de frase', formality: 'formal', example: 'There were setbacks. Nonetheless, the deadline was met.' },
      { connector: 'albeit', use: 'embora, ainda que (ressalva)', position: 'dentro da frase', formality: 'formal/escrito', example: 'It was a useful experience, albeit a challenging one.' },
      { connector: 'notwithstanding', use: 'apesar de, não obstante', position: 'início ou final', formality: 'muito formal', example: 'Notwithstanding the difficulties, the agreement was signed.' },
      { connector: 'in contrast', use: 'em contraste (dois elementos)', position: 'início de nova frase', formality: 'neutro/formal', example: 'Eastern cities are growing rapidly. In contrast, rural areas are declining.' },
      { connector: 'on the contrary', use: 'pelo contrário (corrigir)', position: 'início de frase', formality: 'neutro', example: '"Did you enjoy it?" "On the contrary, I found it quite boring."' },
    ],
    commonBrazilianMistakes: [
      mistake('It was hard. However it was worth it.', 'It was hard. However, it was worth it.', 'However precisa de vírgula após ele quando inicia frase.'),
      mistake('Albeit it was difficult, we succeeded.', 'It was difficult, albeit manageable.', 'Albeit não inicia frase com sujeito+verbo. Use-o dentro da frase com adjetivo/substantivo.'),
      mistake('On the contrary, London is expensive.', 'In contrast, London is expensive [ao comparar com cidade barata].', '"On the contrary" corrige algo; "in contrast" compara dois elementos diferentes.'),
      mistake('Notwithstanding, we continued.', 'Notwithstanding the challenges, we continued.', 'Notwithstanding precisa do que está sendo ignorado logo depois ou antes.'),
      mistake('Nevertheless but we tried.', 'Nevertheless, we tried.', 'Nunca combine "nevertheless" com "but" — escolha um dos dois.'),
    ],
    productionTasks: [
      task(
        'Complete cada frase com o discourse marker correto: nevertheless, albeit, notwithstanding, in contrast, on the contrary.',
        'Use cada marker apenas uma vez.',
        '1. The proposal was risky, ____ a calculated one. (albeit)\n2. The north has heavy rainfall. ____, the south is dry. (In contrast)\n3. She had no prior experience. ____, she got the job. (Nevertheless)\n4. ____ his lawyer\'s advice, he signed the contract. (Notwithstanding)\n5. "Did you find the film boring?" "____, I thought it was fascinating." (On the contrary)',
      ),
      task(
        'Escreva 3 frases originais usando discourse markers diferentes. O tema é "technology and daily life".',
        'Use nevertheless, albeit e in contrast. Cada frase deve ter pelo menos 15 palavras.',
        'Ex: Smartphones have transformed communication, albeit at the cost of face-to-face interaction.',
      ),
      task(
        'Reescreva estas frases usando o discourse marker indicado.',
        'Mantenha o sentido original.',
        '1. Even though it was expensive, we bought it. → Use "albeit"\n2. But we tried anyway. → Use "nevertheless"\n3. However, Tokyo is very expensive. [após dizer que Bangkok é barata] → Use "in contrast"',
      ),
    ],
    exercises: [
      {
        type: 'multipleChoice',
        question: 'Choose the correct discourse marker: "The new policy caused controversy. ____, the government implemented it."',
        options: ['In contrast', 'Nevertheless', 'Albeit', 'On the contrary'],
        answer: 'Nevertheless',
        explanation: 'Nevertheless significa "apesar disso". A polêmica existia, mas a decisão foi mantida.',
      },
      {
        type: 'multipleChoice',
        question: '"Did you find the job easy?" "____, it was extremely demanding."',
        options: ['Nevertheless', 'In contrast', 'On the contrary', 'Albeit'],
        answer: 'On the contrary',
        explanation: 'On the contrary corrige uma suposição. A pergunta implica que poderia ser fácil; a resposta contradiz isso.',
      },
      {
        type: 'fillIn',
        question: 'It was a good result, ____ a disappointing one given our expectations.',
        answer: 'albeit',
        explanation: 'Albeit introduz ressalva dentro da frase, sem sujeito+verbo completo depois.',
      },
    ],
    lessonRecap: 'Você aprendeu 5 discourse markers avançados de contraste e concessão: nevertheless, albeit, notwithstanding, in contrast e on the contrary. Cada um tem uma função diferente. Usá-los corretamente mostra domínio real do inglês argumentativo B2.',
    nextLessonBridge: 'Na próxima aula, você aprenderá inversão com advérbios negativos: "Never have I...", "Rarely does...", "Not only...but also" — estruturas de ênfase que transformam qualquer argumento em inglês avançado.',
  }),

  createGrammarLesson({
    ...common,
    id: 'B2-GRAMMAR-002',
    order: 2,
    title: 'Inversion with negative adverbials: Never have I..., Rarely does..., Not only...but also',
    objectives: [
      'Usar inversão gramatical com advérbios negativos para dar ênfase.',
      'Dominar as estruturas Never have I, Rarely does, Seldom did, Not only...but also.',
      'Entender quando a inversão ocorre e como ela muda a ordem das palavras.',
      'Usar inversão corretamente em inglês escrito e falado formal.',
    ],
    teacherOpening: 'Esta aula cobre uma das estruturas mais poderosas do inglês avançado: a inversão com advérbios negativos. Você já a viu em filmes, discursos e textos formais sem perceber. Dominar isso vai tornar seu inglês impressionante e, mais importante, vai ajudá-lo a entender textos B2/C1 com muito mais facilidade.',
    whyItMatters: 'A inversão enfática existe em inglês para destacar uma informação crucial. Ela sinaliza que o que vem a seguir é surpreendente, extremo ou contrastante. É obrigatória em contextos formais escritos e aparece em filmes, discursos políticos, literatura e jornalismo de qualidade.',
    differenceFromB1: 'No B1, você expressa ênfase com "I have never seen...", "I rarely go...". No B2, você aprende a inverter: "Never have I seen...", "Rarely do I go...". A inversão não muda o significado — muda o peso e o registro. Entender isso é essencial para ler textos autênticos.',
    realLifeUseCases: [
      'Escrever introduções impactantes em ensaios e relatórios.',
      'Discursos e apresentações profissionais.',
      'Ler e entender jornalismo, literatura e textos formais.',
      'Responder perguntas B2/C1 com estruturas de alto nível.',
      'IELTS Writing Task 2 e Speaking Part 3.',
    ],
    conceptExplanation: 'Quando colocamos um advérbio negativo ou limitador no início de uma frase para ênfase, o sujeito e o auxiliar invertem de posição — como em perguntas.\n\nRegra: negativo/limitador + auxiliar + sujeito + verbo principal\n\nGrupos principais:\n• Never, Rarely, Seldom, Hardly ever → inversão com did/does/have\n• Not only...but also → inversão na primeira parte\n• Barely, Scarcely, No sooner → inversão\n• In no circumstances, Under no circumstances, At no time → inversão formal\n• Little → inversão em contextos de surpresa',
    mentalModel: {
      title: 'Regra de inversão',
      summary: 'Advérbio negativo no início → inverta como pergunta.',
      steps: [
        'Normal: "I have never seen such chaos."',
        'Invertido: "Never have I seen such chaos." (como: "Have I ever seen? No, never.")',
        'Normal: "She rarely complains."',
        'Invertido: "Rarely does she complain." (como: "Does she complain? Rarely.")',
        'Normal: "He not only won the award but also donated the prize."',
        'Invertido: "Not only did he win the award, but he also donated the prize."',
      ],
    },
    grammarTable: [
      { structure: 'Never', example: 'Never have I felt more inspired.', note: 'Com have/has/had ou did/does' },
      { structure: 'Rarely / Seldom', example: 'Rarely does she miss a deadline.', note: 'Com do/does/did + sujeito' },
      { structure: 'Hardly / Scarcely...when', example: 'Hardly had he sat down when the phone rang.', note: 'Sempre passado perfeito na inversão' },
      { structure: 'No sooner...than', example: 'No sooner had she arrived than it started raining.', note: 'Sempre passado perfeito + than' },
      { structure: 'Not only...but also', example: 'Not only did he apologise, but he also offered to help.', note: 'Did na inversão, sem did na segunda parte' },
      { structure: 'Under no circumstances', example: 'Under no circumstances should you share your password.', note: 'Modal + sujeito + verbo principal' },
      { structure: 'Little', example: 'Little did I know that it would change my life.', note: 'Surpresa; sempre com did' },
      { structure: 'In no way', example: 'In no way does this policy protect citizens.', note: 'Formal; does/did' },
    ],
    commonBrazilianMistakes: [
      mistake('Never I have seen this.', 'Never have I seen this.', 'O auxiliar deve vir antes do sujeito — igual à estrutura de pergunta.'),
      mistake('Not only he won, but also donated.', 'Not only did he win, but he also donated.', 'Not only exige inversão com did + infinitivo na primeira parte.'),
      mistake('Rarely she goes out.', 'Rarely does she go out.', 'Após rarely, o sujeito não vem direto — precisa do auxiliar do/does.'),
      mistake('No sooner had she arrived, it rained.', 'No sooner had she arrived than it rained.', 'No sooner sempre usa "than", nunca "when" ou vírgula sozinha.'),
      mistake('Hardly he had sat when she called.', 'Hardly had he sat down when she called.', 'Hardly também inverte: hardly + had + sujeito + particípio.'),
    ],
    productionTasks: [
      task(
        'Reescreva usando inversão para dar ênfase.',
        'Siga o exemplo: "I have never seen such a crowd." → "Never have I seen such a crowd."',
        '1. She rarely makes mistakes. →\n2. He not only arrived late but also forgot his documents. →\n3. We had barely left the building when the alarm went off. →\n4. Under no circumstances should you use this equipment without training. (já invertido — reescreva sem inversão)',
      ),
      task(
        'Escreva 3 frases originais usando inversão com advérbio negativo. Tema: "your professional or academic experience".',
        'Use Never have I, Rarely does/do e Not only...but also.',
        'Ex: Never have I encountered a challenge that taught me more than this one.',
      ),
    ],
    exercises: [
      {
        type: 'multipleChoice',
        question: 'Complete: "Rarely ____ such dedication in a student."',
        options: ['I have seen', 'have I seen', 'I see', 'did I seen'],
        answer: 'have I seen',
        explanation: 'Rarely inverte o sujeito e o auxiliar. "have I seen" é a inversão correta do present perfect.',
      },
      {
        type: 'multipleChoice',
        question: '"Not only ____ the exam, but she also received a scholarship."',
        options: ['she passed', 'did she pass', 'she did pass', 'has she passed'],
        answer: 'did she pass',
        explanation: 'Not only + did + sujeito + verbo (base form). A inversão usa did, não o auxiliar perfeito.',
      },
      {
        type: 'fillIn',
        question: 'No sooner ____ arrived than the meeting started.',
        answer: 'had he',
        explanation: 'No sooner usa passado perfeito na inversão: had + sujeito + particípio.',
      },
    ],
    lessonRecap: 'Você aprendeu a usar inversão com advérbios negativos: Never have I, Rarely does, Not only...but also, Hardly had, No sooner...than, Under no circumstances. Essa estrutura ocorre no início da frase, coloca o auxiliar antes do sujeito e aumenta o impacto do que está sendo dito.',
    nextLessonBridge: 'Na próxima aula, você aprende clivagem (cleft sentences): "It was Maria who fixed it", "What surprised me was...", "All I need is..." — estruturas que focam atenção em um elemento específico da frase.',
  }),

  createGrammarLesson({
    ...common,
    id: 'B2-GRAMMAR-003',
    order: 3,
    title: 'Cleft sentences for emphasis: It was...that, What...is, All...is',
    objectives: [
      'Usar clivagem para destacar um elemento específico de uma frase.',
      'Dominar It-clefts (It was X that/who) e Wh-clefts (What X is Y).',
      'Usar All-clefts para enfatizar simplicidade ou exclusividade.',
      'Entender a diferença de impacto entre frase normal e clivada.',
    ],
    teacherOpening: 'Cleft sentences são uma das estruturas mais elegantes do inglês. Em vez de dizer "Maria fixed the problem", você diz "It was Maria who fixed the problem" — e agora toda a atenção está em Maria. Isso é fundamental para argumentação, explicação e ênfase precisa em inglês B2/C1.',
    whyItMatters: 'Clivagem aparece constantemente em inglês escrito e falado. Ela resolve ambiguidade: "It was the deadline, not the quality, that caused the problem." Isso é muito mais preciso do que "The deadline caused the problem". Em debates, entrevistas e escrita acadêmica, cleft sentences são ferramentas indispensáveis.',
    differenceFromB1: 'No B1, você enfatiza com "really" ou "very": "She really fixed it." No B2, você usa estrutura gramatical para enfatizar: "It was she who fixed it." A diferença é que a clivagem é neutra em tom mas poderosa em foco — sem depender de advérbio de intensidade.',
    realLifeUseCases: [
      'Explicar quem ou o que causou algo com precisão.',
      'Corrigir um mal-entendido: "It wasn\'t John who called, it was Mark."',
      'Estruturar argumentos: "What concerns me is the lack of transparency."',
      'Escrever introduções de ensaio: "What this essay will argue is..."',
      'Dar ênfase a fatos em apresentações profissionais.',
    ],
    conceptExplanation: 'Existem três tipos principais de clivagem:\n\n1. It-cleft: "It was + X + that/who + resto da frase"\n   → Destaca quem ou o quê: "It was the CEO who made that decision."\n   → Destaca quando: "It was in 2020 that everything changed."\n   → Destaca por quê: "It was because of funding that the project failed."\n\n2. Wh-cleft (pseudo-cleft): "What + sujeito + verbo + is/was + X"\n   → Destaca o que: "What surprised us was the speed of the recovery."\n   → Invertido: "The cause was what nobody expected." (menos comum)\n\n3. All-cleft: "All + sujeito + need/want/do + is + X"\n   → Enfatiza que só uma coisa é necessária: "All I need is a signature."\n   → Enfatiza que só uma coisa aconteceu: "All she did was apologise."',
    mentalModel: {
      title: 'Tipos de clivagem e seus focos',
      summary: 'Escolha o tipo de cleft pelo elemento que quer destacar.',
      steps: [
        'Normal: "The manager solved the problem." → Destaque no sujeito: "It was the manager who solved the problem."',
        'Normal: "We need better communication." → Destaque no objeto: "What we need is better communication."',
        'Normal: "I only want one thing: clarity." → All-cleft: "All I want is clarity."',
        'Normal: "She arrived on Tuesday." → Destaque no tempo: "It was on Tuesday that she arrived."',
        'Normal: "The price worried us." → Wh-cleft: "What worried us was the price."',
      ],
    },
    grammarTable: [
      { type: 'It-cleft (sujeito)', structure: 'It was/is + pessoa/coisa + who/that + resto', example: 'It was the board that approved the decision.' },
      { type: 'It-cleft (tempo)', structure: 'It was + tempo + that + sujeito + verbo', example: 'It was in the 1990s that the internet changed everything.' },
      { type: 'It-cleft (motivo)', structure: 'It was because of + X + that + frase', example: 'It was because of her leadership that the team succeeded.' },
      { type: 'Wh-cleft', structure: 'What + sujeito + verbo + is/was + X', example: 'What the company lacks is a clear strategy.' },
      { type: 'All-cleft', structure: 'All + sujeito + need/want/do + is + X', example: 'All they need is more time to prepare.' },
    ],
    commonBrazilianMistakes: [
      mistake('It was Maria that she fixed it.', 'It was Maria who fixed it.', 'Após identificar a pessoa com "it was", use who ou that — não repita o pronome "she".'),
      mistake('What I need it is more practice.', 'What I need is more practice.', 'Não use "it" após o verbo to be na Wh-cleft. "What I need is..." já é completo.'),
      mistake('It was in 2020 when everything changed.', 'It was in 2020 that everything changed.', 'It-cleft usa "that", não "when" — mesmo quando o elemento é de tempo.'),
      mistake('All what I want is a break.', 'All I want is a break.', '"All" já funciona como pronome relativo aqui. Não adicione "what" depois de "all".'),
      mistake('It is the price what worries me.', 'It is the price that worries me. / What worries me is the price.', 'Escolha um tipo de cleft. Nunca misture "it is" com "what".'),
    ],
    productionTasks: [
      task(
        'Transforme cada frase em uma cleft sentence, destacando o elemento indicado.',
        'Use o tipo de cleft mais adequado.',
        '1. "The lack of communication caused the problem." → Destaque: causa → [It was...that]\n2. "We need a clear deadline." → Destaque: necessidade → [What...is]\n3. "I only need your approval." → Destaque: exclusividade → [All...is]\n4. "The founder launched the company in 1998." → Destaque: ano → [It was in...that]',
      ),
      task(
        'Escreva um parágrafo de 5-6 frases sobre um problema no seu trabalho, estudos ou vida, usando pelo menos 2 cleft sentences.',
        'Use It-cleft e Wh-cleft em posições diferentes.',
        'Ex: "There have been several challenges this year. What concerns me most is the lack of clear communication. It was poor planning that led to most of the delays..."',
      ),
    ],
    exercises: [
      {
        type: 'multipleChoice',
        question: '"____ the price that put us off." Complete with the correct structure.',
        options: ['What was', 'It was', 'That was', 'All was'],
        answer: 'It was',
        explanation: 'It-cleft: "It was + elemento + that + resto da frase."',
      },
      {
        type: 'multipleChoice',
        question: '"____ we need is more funding." Complete.',
        options: ['All what', 'What', 'That which', 'It which'],
        answer: 'What',
        explanation: 'Wh-cleft: "What + sujeito + verbo + is + elemento." "What" funciona como pronome relativo.',
      },
      {
        type: 'fillIn',
        question: 'All she ____ was apologise. (She only apologised — nothing else.)',
        answer: 'did',
        explanation: '"All she did was apologise." All-cleft com "do": destaca que apenas uma ação ocorreu.',
      },
    ],
    lessonRecap: 'Você aprendeu as três estruturas de clivagem do inglês B2: It-cleft ("It was X that..."), Wh-cleft ("What X is Y") e All-cleft ("All I need is Z"). Cada uma serve para focar a atenção em um elemento específico da frase com elegância e precisão.',
    nextLessonBridge: 'A seguir, vocabulário B2.1: verbos do discurso acadêmico (argue, demonstrate, evaluate, illustrate, imply) e como usá-los para construir argumentos com precisão.',
  }),

  // ─── VOCABULARY ─────────────────────────────────────────────────────────────

  createVocabularyLesson({
    ...common,
    id: 'B2-VOCABULARY-001',
    order: 1,
    title: 'Academic discourse verbs: argue, claim, demonstrate, evaluate, illustrate',
    objectives: [
      'Usar verbos do discurso acadêmico com o complemento correto.',
      'Distinguir argue/claim/contend/assert para posições e opiniões.',
      'Usar demonstrate/illustrate/show com rigor e precisão.',
      'Usar evaluate/assess/analyse de forma ativa e passiva.',
      'Evitar "say" e "talk about" em contextos formais e substituir por verbos precisos.',
    ],
    topicContext: 'Verbos do discurso acadêmico são essenciais para escrever, ler e falar em inglês B2. Eles permitem que você descreva o que autores, dados e argumentos fazem de forma precisa — em vez de usar sempre "say" ou "talk about".',
    essentialWords: [
      vocab('argue', 'defender um ponto de vista com razões', 'The author argues that climate policy needs urgent reform.', 'argue + that (never "argue about something as a verb of saying")'),
      vocab('claim', 'afirmar algo (às vezes com ceticismo)', 'Scientists claim that the new drug could reduce recovery time.', 'Pode implicar ceticismo: "He claims to be an expert" pode soar duvidoso'),
      vocab('contend', 'afirmar ou defender (formal)', 'The report contends that stricter regulation is necessary.', 'Mais formal que "argue"; usado em textos legais e acadêmicos'),
      vocab('assert', 'afirmar com confiança', 'The minister asserted that the situation was under control.', 'Diferente de claim: assert é mais definitivo'),
      vocab('demonstrate', 'provar/mostrar com evidência', 'The data demonstrates a clear link between diet and health.', '"Demonstrate" precisa de evidência — não use para opiniões'),
      vocab('illustrate', 'mostrar com exemplo', 'This case illustrates the risks of inadequate training.', 'Illustrate é para exemplos — não para provas definitivas'),
      vocab('indicate', 'mostrar (dados/números)', 'The survey indicates that 70% support the reform.', 'Usado com dados, pesquisa, resultados'),
      vocab('suggest', 'sugerir (com hedging)', 'The findings suggest that further research is needed.', 'Mais cauteloso que "demonstrate"; bom para conclusões incertas'),
      vocab('evaluate', 'avaliar criticamente', 'The committee will evaluate the proposal next month.', 'Evaluate = análise sistemática com critérios; mais que "assess"'),
      vocab('assess', 'estimar, avaliar (situação)', 'We need to assess the impact of the policy change.', 'Menos sistemático que evaluate; mais situacional'),
      vocab('analyse', 'examinar em detalhe', 'The study analyses the effects of social media on teenagers.', 'Foco no processo de exame detalhado — não na conclusão'),
      vocab('examine', 'investigar de perto', 'This chapter examines the causes of the 2008 financial crisis.', 'Usado em títulos de capítulos, relatórios e pesquisa'),
      vocab('challenge', 'questionar ou refutar', 'The new evidence challenges the traditional view.', 'Mais forte que "question": implica questionamento com dados'),
      vocab('acknowledge', 'reconhecer (mesmo que discorde)', 'The author acknowledges the limitations of the study.', 'Importante para concessão acadêmica honesta'),
      vocab('emphasise', 'destacar, dar ênfase', 'The speaker emphasised the importance of early intervention.', 'Emphasise = realçar intencionalmente um ponto'),
      vocab('imply', 'implicar (sem dizer explicitamente)', 'The data implies that inequality is worsening.', 'Diferente de "infer" — o texto implica; o leitor infere'),
      vocab('infer', 'concluir a partir de evidência', 'From the data, we can infer that demand is falling.', 'Leitor/analista infere — texto/autor implica'),
      vocab('highlight', 'chamar atenção para', 'The report highlights several key findings.', 'Usado em textos de negócios, jornalismo e academia'),
    ],
    chunks: [
      phrase('argue that + sujeito + verbo', 'defender que', 'The study argues that investment in education yields long-term returns.'),
      phrase('claim to + verbo', 'afirmar que faz/é algo', 'The company claims to operate sustainably.'),
      phrase('demonstrate a link between X and Y', 'demonstrar a ligação entre', 'The research demonstrates a link between sleep and cognitive performance.'),
      phrase('illustrate the extent to which', 'ilustrar o quanto', 'This example illustrates the extent to which public opinion has shifted.'),
      phrase('assess the impact of', 'avaliar o impacto de', 'We need to assess the impact of remote work on team dynamics.'),
      phrase('evaluate the effectiveness of', 'avaliar a eficácia de', 'The committee was asked to evaluate the effectiveness of the programme.'),
      phrase('acknowledge + that / + -ing', 'reconhecer que', 'She acknowledged that the approach had its limitations.'),
      phrase('imply that / imply + -ing', 'implicar que', 'The statistics imply that the problem is structural, not individual.'),
    ],
    dangerousConfusions: [
      {
        pair: ['argue', 'argue about'],
        correct: '"The author argues that..." (discurso) / "They argued about the deadline." (briga)',
        explanation: 'Quando argue significa "defender ponto de vista em texto", use argue + that. Quando significa "brigar verbalmente", use argue about/over.',
      },
      {
        pair: ['imply', 'infer'],
        correct: 'The data implies X (o dado aponta X). / We can infer X from the data (nós concluímos X).',
        explanation: 'Texto/autor implica → leitor/analista infere. Confundir os dois é erro comum em B2.',
      },
      {
        pair: ['assess', 'evaluate'],
        correct: '"Assess the situation" (situação geral). / "Evaluate the programme" (análise com critérios específicos).',
        explanation: 'Evaluate é mais sistemático e formal. Assess é mais situacional e geral.',
      },
    ],
    miniDialogues: [
      {
        context: 'Em uma reunião acadêmica',
        dialogue: [
          { speaker: 'A', line: 'What does the report actually argue?' },
          { speaker: 'B', line: 'It argues that the current model is unsustainable and suggests a complete redesign.' },
          { speaker: 'A', line: 'Does it demonstrate that with data?' },
          { speaker: 'B', line: 'Yes, it illustrates the point with case studies from three countries.' },
        ],
      },
    ],
    recognitionPractice: [
      task('Leia: "The findings suggest a correlation between urban density and innovation rates." O que o verbo "suggest" implica sobre o nível de certeza?', '', 'Sugere cautela — não é uma conclusão definitiva, apenas uma tendência.'),
      task('Qual a diferença de significado: "The author claims X" vs "The author demonstrates X"?', '', '"claims" = é o que ele afirma (pode ser questionado); "demonstrates" = ele prova com evidência.'),
    ],
    usagePractice: [
      task('Substitua "says" por um verbo mais preciso em cada frase.', 'Escolha: argue, claim, demonstrate, suggest, acknowledge, highlight.', '1. The report says that pollution levels are rising. (dados concretos) → ...\n2. The politician says he never met the suspect. (afirmação contestada) → ...\n3. The study says there might be a connection. (incerto) → ...\n4. The author says his methodology has flaws. (concessão) → ...'),
    ],
    productionTasks: [
      task(
        'Escreva 4 frases originais usando verbos diferentes (argue, demonstrate, acknowledge, imply). Tema: "The role of social media in modern society."',
        'Use pelo menos um verbo na forma passiva (e.g., "It is argued that...").',
        'Ex: It is often argued that social media amplifies polarisation. The data demonstrate that users over 40 engage differently than younger groups.',
      ),
    ],
  }),

  createVocabularyLesson({
    ...common,
    id: 'B2-VOCABULARY-002',
    order: 2,
    title: 'Abstract nouns and B2 collocations: implication, consequence, assumption, evidence',
    objectives: [
      'Usar substantivos abstratos do inglês acadêmico e formal com precisão.',
      'Aprender as colocações mais frequentes de cada substantivo.',
      'Distinguir consequence/implication/outcome/result no uso real.',
      'Usar evidence/proof/data/findings com o nível de certeza correto.',
    ],
    topicContext: 'Substantivos abstratos são a espinha dorsal da escrita e do discurso formais em inglês B2. Saber as colocações certas (os verbos, adjetivos e preposições que andam com cada um) é o que separa um inglês B1 de um inglês B2 real.',
    essentialWords: [
      vocab('implication', 'implicação, consequência não-óbvia', 'The implications of the policy change are still unclear.', 'Sempre no plural quando genérico: "the implications of X". Singular quando específico: "one implication is..."'),
      vocab('consequence', 'consequência direta', 'The consequences of inaction could be severe.', 'consequence of + -ing / consequence for + grupo afetado'),
      vocab('assumption', 'suposição, pressuposto', 'The entire plan rests on a flawed assumption.', 'make an assumption / challenge an assumption / underlying assumption'),
      vocab('evidence', 'evidência (incontável)', 'There is strong evidence to support this theory.', 'Sempre incontável: "an evidence" está errado. "evidence of / for / that"'),
      vocab('outcome', 'resultado/desfecho (do que aconteceu)', 'The outcome of the negotiations was disappointing.', 'outcome of + evento. Focado no resultado final observável'),
      vocab('consequence', 'consequência (geralmente negativa)', 'The policy had serious consequences for small businesses.', 'have consequences (for). Mais forte e negativo que "outcome"'),
      vocab('finding', 'descoberta/resultado de pesquisa', 'The findings of the study were published last year.', 'Sempre plural quando resultado de pesquisa. "findings suggest/indicate/show"'),
      vocab('implication', 'o que algo implica para o futuro', 'This has significant implications for public health.', '"Have implications for" = vai afetar'),
      vocab('assumption', 'algo que se pressupõe ser verdade', 'We cannot make assumptions about people\'s motivations.', '"Make/challenge/question/underlying assumption"'),
      vocab('factor', 'fator contribuinte', 'Several factors contribute to workplace stress.', '"Key/major/contributing factor in/of". Não confundir com "reason"'),
      vocab('extent', 'extensão/grau', 'The extent of the damage was not immediately clear.', '"To some/a great extent" = até certo ponto / em grande medida'),
      vocab('approach', 'abordagem, método', 'A different approach to the problem is needed.', '"take/adopt an approach / approach to + -ing ou noun"'),
      vocab('concern', 'preocupação / motivo de atenção', 'The main concern is data privacy.', '"raise/express a concern / be of concern to"'),
      vocab('perspective', 'perspectiva, ponto de vista', 'From a historical perspective, this is not unusual.', '"From X\'s perspective" / "from a X perspective" (sem artigo)'),
      vocab('framework', 'estrutura, referencial', 'We need a new framework for assessing performance.', '"within a framework / provide/establish a framework"'),
    ],
    chunks: [
      phrase('have implications for', 'ter implicações para', 'This research has significant implications for climate policy.'),
      phrase('to some extent', 'até certo ponto', 'To some extent, the criticism is valid.'),
      phrase('a key factor in', 'um fator fundamental em', 'Trust is a key factor in any successful partnership.'),
      phrase('to a large extent', 'em grande medida', 'The outcome depended to a large extent on external factors.'),
      phrase('make an assumption', 'fazer uma suposição', 'We should not make assumptions without data.'),
      phrase('there is strong/limited evidence that', 'há evidência forte/limitada de que', 'There is strong evidence that exercise reduces anxiety.'),
      phrase('raise concerns about', 'levantar preocupações sobre', 'The report raises serious concerns about data security.'),
      phrase('take a different approach', 'adotar uma abordagem diferente', 'It may be time to take a completely different approach.'),
    ],
    dangerousConfusions: [
      {
        pair: ['evidence', 'proof'],
        correct: '"Evidence" é mais neutro e científico; "proof" é mais definitivo e informal.',
        explanation: '"There is evidence of fraud" (indica, pode não ser conclusivo). "This is proof that he did it" (mais definitivo, mais emocional). Em inglês acadêmico, prefira "evidence".',
      },
      {
        pair: ['outcome', 'consequence'],
        correct: '"Outcome" = resultado final (neutro). "Consequence" = impacto, frequentemente negativo.',
        explanation: '"The outcome of the election was a surprise." / "The consequences of the decision were devastating." Use consequence quando há impacto real — não apenas um resultado.',
      },
      {
        pair: ['from X\'s perspective', 'from the perspective of X'],
        correct: 'Ambos corretos, mas "from a business perspective" é sem artigo quando o tipo de perspectiva.',
        explanation: '"From a business perspective, this is risky." (tipo de perspectiva, sem artigo). "From the investor\'s perspective, it\'s an opportunity." (perspectiva de pessoa específica, com artigo).',
      },
    ],
    miniDialogues: [
      {
        context: 'Discussão sobre um relatório',
        dialogue: [
          { speaker: 'A', line: 'What are the main findings of the report?' },
          { speaker: 'B', line: 'The key finding is that employee engagement is at an all-time low.' },
          { speaker: 'A', line: 'And what are the implications?' },
          { speaker: 'B', line: 'Well, the implication is that productivity and retention will continue to fall unless something changes.' },
          { speaker: 'A', line: 'So the assumption was wrong — that higher pay alone would solve the problem.' },
          { speaker: 'B', line: 'Exactly. The evidence suggests it\'s far more complex than that.' },
        ],
      },
    ],
    recognitionPractice: [
      task('Leia a frase: "The assumption underlying this policy is that citizens will voluntarily comply." O que "underlying" significa neste contexto?', '', '"Underlying" = que está por baixo, que fundamenta. A suposição básica que sustenta a política.'),
    ],
    usagePractice: [
      task('Complete com a colocação correta: assumption, evidence, implication, concern, framework.', '', '1. There is growing ___ about the impact of screen time on children.\n2. The ___ of the study shows a clear link between sleep and productivity.\n3. We cannot operate without a proper legal ___.\n4. The main ___ of this finding is that we need to change our strategy.\n5. He made the ___ that everyone agreed, which was not the case.'),
    ],
    productionTasks: [
      task(
        'Escreva um parágrafo de 80-100 palavras sobre um problema social (ex: desigualdade, saúde mental, educação) usando pelo menos 5 dos substantivos desta aula.',
        'Foque em colacionar corretamente: evidence of, implication for, to some extent, raise concerns about.',
        'Ex: "There is growing evidence that mental health issues among young people are rising. The implications for the education system are significant. To a large extent, the problem stems from unrealistic social media expectations. Experts raise concerns about the lack of support frameworks in schools..."',
      ),
    ],
  }),

  createVocabularyLesson({
    ...common,
    id: 'B2-VOCABULARY-003',
    order: 3,
    title: 'Formal synonyms: obtain, require, significant, sufficient, implement, facilitate',
    objectives: [
      'Substituir palavras informais por equivalentes formais no registro adequado.',
      'Usar obtain, require, significant, sufficient, implement, facilitate com confiança.',
      'Entender o contexto de uso de cada par informal/formal.',
      'Escrever e-mails, relatórios e ensaios com o vocabulário de registro adequado.',
    ],
    topicContext: 'Em inglês B2, o registro conta. Usar "get" em um relatório profissional ou "big" em um ensaio acadêmico é um erro de estilo. Esta aula cobre os pares mais importantes de vocabulário informal→formal que você precisa dominar para o B2.',
    essentialWords: [
      vocab('obtain', 'obter (formal de "get")', 'You can obtain a copy of the report by contacting our office.', '"Obtain" é preferido em textos legais, acadêmicos e formais. "Get" é mais coloquial.'),
      vocab('require', 'requerer, necessitar (formal de "need")', 'All applicants are required to submit a valid ID.', '"Require" é obrigatório em regulamentos e instruções formais.'),
      vocab('significant', 'significativo (formal de "big/important")', 'There has been a significant increase in demand.', '"Significant" = de importância considerável. "A significant number" = um número considerável.'),
      vocab('sufficient', 'suficiente (formal de "enough")', 'The evidence is not sufficient to support this claim.', '"Sufficient" é preferido em argumentação formal. "Enough" é mais coloquial.'),
      vocab('implement', 'implementar (formal de "do/put in place")', 'The company plans to implement the changes by Q3.', '"Implement a plan/policy/strategy/change"'),
      vocab('facilitate', 'facilitar, tornar possível', 'Technology facilitates communication across borders.', '"Facilitate" ≠ "make easier" sempre. Significa "tornar possível/mais fácil" formalmente.'),
      vocab('demonstrate', 'demonstrar (formal de "show")', 'The candidate must demonstrate relevant experience.', 'Já visto na aula anterior, mas aqui como sinônimo formal de "show".'),
      vocab('establish', 'estabelecer, criar formalmente', 'The committee was established to oversee the process.', '"Establish" = criar com caráter oficial. "Set up" é mais informal.'),
      vocab('indicate', 'indicar (formal de "show/point to")', 'The results indicate a 12% growth in revenue.', '"Indicate" com dados e resultados — mais objetivo que "show".'),
      vocab('utilise', 'utilizar (formal de "use")', 'The team utilised all available resources efficiently.', '"Utilise" soa mais formal que "use". Em inglês americano: "utilize".'),
      vocab('additional', 'adicional (formal de "more/extra")', 'Additional funding will be required for phase two.', '"Additional information" em vez de "more information" em textos formais.'),
      vocab('prior to', 'antes de (formal de "before")', 'All documents must be submitted prior to the deadline.', '"Prior to" é preposição formal. Seguido de substantivo ou -ing.'),
      vocab('regarding', 'referente a (formal de "about")', 'I am writing regarding your recent application.', '"Regarding" é neutro-formal. "With regard to" é mais enfático.'),
      vocab('numerous', 'numeroso (formal de "many")', 'There are numerous factors to consider.', '"Numerous" = muitos, vários (neutro-formal). Mais elegante que "many" em textos escritos.'),
      vocab('resolve', 'resolver formalmente', 'The dispute was resolved through mediation.', '"Resolve" = encontrar solução formal. "Fix" ou "sort out" são informais.'),
    ],
    chunks: [
      phrase('obtain permission/approval/information', 'obter permissão/aprovação/informação', 'You must obtain written approval before proceeding.'),
      phrase('significant improvement/progress/impact', 'melhoria/progresso/impacto significativo', 'The programme has led to a significant improvement in outcomes.'),
      phrase('sufficient evidence/reason/time', 'evidência/razão/tempo suficiente', 'There is sufficient evidence to proceed with the investigation.'),
      phrase('implement a policy/strategy/plan', 'implementar uma política/estratégia/plano', 'The government will implement the new policy next year.'),
      phrase('facilitate access/communication/change', 'facilitar acesso/comunicação/mudança', 'This tool facilitates access to educational resources.'),
      phrase('prior to + noun/-ing', 'antes de', 'Prior to the meeting, please review the agenda.'),
      phrase('with regard to / regarding', 'com relação a, referente a', 'Regarding your enquiry, please find the details below.'),
      phrase('on numerous occasions', 'em numerosas ocasiões', 'He had been warned on numerous occasions.'),
    ],
    dangerousConfusions: [
      {
        pair: ['utilise', 'use'],
        correct: '"Utilise" não é simplesmente uma versão mais elegante de "use". Use "utilise" para o uso estratégico ou completo de algo.',
        explanation: '"Use a pen" = normal. "Utilise all available data" = usar estrategicamente. Overusing "utilise" soa pedante. Em dúvida, use "use".',
      },
      {
        pair: ['sufficient', 'enough'],
        correct: 'Ambos corretos grammaticalmente, mas "sufficient" é mais formal. Posição difere: "sufficient evidence" (antes do nome), "evidence is sufficient" (predicado).',
        explanation: '"Enough evidence" ou "sufficient evidence" ambos corretos. "Evidence enough" (formal/poético) existe mas é raro.',
      },
      {
        pair: ['facilitate', 'enable'],
        correct: '"Facilitate" = tornar mais fácil/possível um processo. "Enable" = tornar possível algo que não seria possível de outra forma.',
        explanation: '"Technology facilitates communication" (já existia, agora é mais fácil). "This scholarship enabled her to study" (ela não poderia estudar sem isso).',
      },
    ],
    miniDialogues: [
      {
        context: 'E-mail profissional',
        dialogue: [
          { speaker: 'Remetente', line: 'Dear Ms. Chen, I am writing regarding the proposal submitted last month. We require additional documentation prior to making a final decision. Could you please obtain the relevant permits and forward them at your earliest convenience? We appreciate your continued efforts to facilitate this process.' },
          { speaker: 'Destinatário', line: 'Dear Mr. Lopes, Thank you for your prompt response. I will obtain the permits by Friday. I trust that this will be sufficient to proceed with the next phase.' },
        ],
      },
    ],
    usagePractice: [
      task('Reescreva estas frases em registro formal, substituindo as palavras em itálico.', '', '1. We need to *get* the manager\'s *OK* *before* the meeting. → We require... prior to...\n2. There are a *lot of* reasons to consider this option. → There are numerous...\n3. The program really *helped* our *work together*. → The programme significantly facilitated...\n4. We need *more* time to *look at* the results. → We require additional time to analyse...'),
    ],
    productionTasks: [
      task(
        'Escreva um e-mail formal de 80-100 palavras para um cliente pedindo documentos adicionais. Use pelo menos 6 dos vocabulários desta aula.',
        'Use: require, obtain, prior to, regarding, additional, sufficient, facilitate, significant.',
        'Comece com: "Dear [Nome], I am writing regarding..."',
      ),
    ],
  }),

  // ─── SPEAKING ───────────────────────────────────────────────────────────────

  createSpeakingLesson({
    ...common,
    id: 'B2-SPEAKING-001',
    order: 1,
    title: 'Express and defend a complex opinion with B2 discourse markers',
    objectives: [
      'Estruturar uma resposta de opinião de 2 minutos com introdução, argumento, concessão e conclusão.',
      'Usar discourse markers avançados para sinalizar a estrutura do argumento.',
      'Defender posição com exemplos concretos e linguagem de hedging.',
      'Conceder um ponto contrário sem abandonar a posição principal.',
      'Falar com fluência sustentada sem pausas longas ou fillers excessivos.',
    ],
    speakingSituation: 'Você está em uma discussão formal — pode ser uma entrevista, um debate acadêmico, uma reunião profissional ou uma prova de speaking B2/IELTS. Você precisa expressar e defender sua opinião de forma estruturada, clara e persuasiva durante aproximadamente 2 minutos.',
    modelPhrases: [
      phrase('In my view, / From my perspective,', 'Na minha visão, / Na minha perspectiva,', 'Use no começo para posicionar sua opinião de forma clara e formal.'),
      phrase('I would argue that...', 'Eu defenderia que...', 'Mais formal e ponderado que "I think". Bom para argumentos sérios.'),
      phrase('What concerns me most is...', 'O que mais me preocupa é...', 'Wh-cleft para enfatizar o ponto central da sua preocupação.'),
      phrase('It is worth noting that...', 'Vale notar que...', 'Introduz um ponto importante de forma neutra.'),
      phrase('Nevertheless, I maintain that...', 'Ainda assim, mantenho que...', 'Depois de conceder um ponto — você ainda defende sua posição.'),
      phrase('Whilst I acknowledge that X, I still believe Y.', 'Embora eu reconheça que X, ainda acredito em Y.', 'Concessão elegante que não enfraquece o argumento.'),
      phrase('The evidence suggests that...', 'A evidência sugere que...', 'Hedging — você não afirma como certeza absoluta, mas como dado.'),
      phrase('To illustrate this point, consider...', 'Para ilustrar este ponto, considere...', 'Fórmula para introduzir exemplo concreto.'),
      phrase('On balance, I would say that...', 'Em termos gerais, eu diria que...', 'Conclusão ponderada — olhando os dois lados, aqui está minha posição.'),
      phrase('It is not simply a question of..., but rather...', 'Não é simplesmente uma questão de..., mas sim...', 'Para mostrar que o problema é mais complexo do que parece.'),
      phrase('Arguably, the most important factor is...', 'Provavelmente, o fator mais importante é...', '"Arguably" = hedging elegante: pode ser questionado, mas é defensável.'),
      phrase('That said, / Having said that,', 'Dito isso,', 'Para introduzir uma concessão ou contraste depois do argumento principal.'),
    ],
    guidedSpeaking: [
      {
        prompt: 'Topic: "Social media does more harm than good." Express your opinion in 3-4 sentences using: In my view, I would argue that, Nevertheless.',
        tip: 'Estrutura: posição → razão principal → concessão.',
        model: 'In my view, social media has profoundly changed how we connect — and not always for the better. I would argue that the benefits, such as access to information and community building, are often outweighed by the psychological harm it causes, particularly among teenagers. Nevertheless, I acknowledge that banning it entirely is neither practical nor desirable.',
      },
      {
        prompt: 'Topic: "Remote work should be the norm for all office jobs." Defend or oppose this in 4-5 sentences. Use a Wh-cleft (What concerns me / What makes this work is...) and a cleft sentence.',
        tip: 'Use "What...is" para enfatizar seu ponto principal. Use "It was X that..." para referência histórica.',
        model: 'What concerns me most about mandatory remote work is the impact on collaboration and team culture. It was the pandemic that demonstrated both the feasibility and the limitations of working from home. Whilst some roles are well-suited to remote arrangements, I would argue that a hybrid model is, on balance, the most effective approach.',
      },
      {
        prompt: 'Topic: "Economic growth is more important than environmental protection." Take a clear position and use: albeit, notwithstanding, on balance.',
        tip: 'Conceda a importância econômica, mas defenda o equilíbrio.',
        model: 'Notwithstanding the legitimate economic pressures many countries face, I firmly believe that environmental protection cannot be sacrificed for short-term growth. Economic development is vital, albeit not at the cost of irreversible ecological damage. On balance, the evidence suggests that sustainable development is not only possible but economically advantageous in the long term.',
      },
    ],
    recordingTasks: [
      {
        instruction: 'Choose a topic below and speak for 2 minutes. Structure your answer: position (20s) → argument + evidence (60s) → concession (20s) → conclusion (20s).',
        topics: [
          'Universities should be free for all students.',
          'Artificial intelligence will create more jobs than it destroys.',
          'Governments should limit social media use for people under 18.',
        ],
        duration: '2 minutes',
        tips: [
          'Start with "In my view" or "I would argue that" — not "I think".',
          'Give one specific example or piece of evidence.',
          'Include a concession: "Whilst I acknowledge...", "That said..."',
          'End with "On balance" to signal your conclusion.',
        ],
      },
      {
        instruction: 'React to this statement: "Technology is making us less creative." Speak for 90 seconds. Use at least 3 B2 discourse markers.',
        duration: '90 seconds',
        tips: [
          'You can agree, disagree, or take a nuanced position.',
          'Use: It is worth noting / I would argue / Nevertheless / To illustrate this point.',
          'Avoid starting every sentence with "I think".',
        ],
      },
    ],
    speakingChecklist: [
      'Iniciei com uma frase de posição clara (sem "I think that maybe...")',
      'Usei pelo menos 2 discourse markers avançados (nevertheless, albeit, in contrast, etc.)',
      'Dei pelo menos 1 exemplo concreto para sustentar meu argumento',
      'Fiz uma concessão genuína a um ponto contrário',
      'Usei hedging language (arguably, it would seem, the evidence suggests)',
      'Mantive fluência por pelo menos 90 segundos sem pausa longa',
      'Evitei fillers excessivos (um/dois "well" é OK; mais de cinco é demais)',
      'Concluí com "On balance" ou frase equivalente de fechamento',
      'Usei vocabulário B2 (não apenas B1 words)',
      'Variei os conectores (não repeti "however" cinco vezes)',
    ],
    freeSpeaking: [
      {
        question: 'What do you think is the most pressing global challenge of our time, and why?',
        hint: 'Use: In my view / I would argue / What concerns me most / Nevertheless / On balance.',
        duration: '2-3 minutes',
      },
      {
        question: 'Some people argue that economic inequality is inevitable in a capitalist society. To what extent do you agree?',
        hint: 'Structure: define the issue → present your position → argue → concede → conclude.',
        duration: '2-3 minutes',
      },
    ],
    substitutionDrills: [
      {
        base: 'In my view, social media does more harm than good.',
        slots: [
          { position: 'topic', options: ['remote work is overrated', 'university education needs to change', 'technology is making us less patient'] },
        ],
      },
      {
        base: 'Whilst I acknowledge that X has benefits, I would argue that Y outweighs them.',
        slots: [
          { position: 'X', options: ['economic growth', 'social media use', 'remote work'] },
          { position: 'Y', options: ['the long-term risks', 'the social cost', 'the impact on mental health'] },
        ],
      },
    ],
  }),

]);

export const B2_DEEP_BRIDGE_PART1_BY_PILLAR = Object.freeze({
  grammar: Object.freeze(B2_DEEP_BRIDGE_PART1.filter(l => l.pillar === 'grammar')),
  vocabulary: Object.freeze(B2_DEEP_BRIDGE_PART1.filter(l => l.pillar === 'vocabulary')),
  reading: Object.freeze([]),
  listening: Object.freeze([]),
  speaking: Object.freeze(B2_DEEP_BRIDGE_PART1.filter(l => l.pillar === 'speaking')),
  writing: Object.freeze([]),
});
