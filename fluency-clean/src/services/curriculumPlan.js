import { storage } from './storage.js';

const CURRICULUM_PROGRESS_KEY = 'curriculum.progress.v1';

const LEVEL_LOCKS = {
  A1: '',
  A2: 'Concluir quase todo o A1, produção final A1 e simulados A1.',
  B1: 'Concluir quase todo o A2, produção final A2 e simulados A2.',
  B2: 'Concluir quase todo o B1, produção final B1 e simulados B1.',
  C1: 'Concluir quase todo o B2, produção final B2 e simulados B2.',
  C2: 'Concluir quase todo o C1, produção final C1 e simulados C1.',
};

const LEVEL_REQUIREMENTS = {
  A1: 0.98,
  A2: 0.97,
  B1: 0.96,
  B2: 0.95,
  C1: 0.94,
  C2: 0.92,
};

const LEVEL_INTRO_PREREQS = {
  A1: ['alfabeto', 'sons básicos', 'nenhuma gramática anterior'],
  A2: ['A1 completo', 'produção final A1', 'simulados A1'],
  B1: ['A2 completo', 'produção final A2', 'simulados A2'],
  B2: ['B1 completo', 'produção final B1', 'simulados B1'],
  C1: ['B2 completo', 'produção final B2', 'simulados B2'],
  C2: ['C1 completo', 'produção final C1', 'simulados C1'],
};

function l(id, type, title, prerequisites = [], category = 'core', checkpoint = '') {
  return { id, type, title, prerequisites, category, checkpoint };
}

function pad(value) {
  return String(value).padStart(3, '0');
}

function normalizeSpec(spec) {
  if (typeof spec === 'string') return { type: 'reading', title: spec, category: 'core', checkpoint: '' };
  return {
    type: spec.type || 'reading',
    title: spec.title,
    category: spec.category || 'core',
    checkpoint: spec.checkpoint || '',
  };
}

function makeLevel({ level, title, requiredCompletion, unlockRule, units }) {
  let counter = 1;
  let previousId = '';

  return {
    level,
    title,
    requiredCompletion,
    unlockRule,
    units: units.map((unit) => {
      const lessons = unit.lessons.map((item) => {
        const spec = normalizeSpec(item);
        const id = `${level.toLowerCase()}-${pad(counter)}`;
        counter += 1;
        const prerequisites = previousId ? [previousId] : LEVEL_INTRO_PREREQS[level];
        previousId = id;
        return l(id, spec.type, spec.title, prerequisites, spec.category, spec.checkpoint);
      });

      return {
        id: unit.id,
        title: unit.title,
        goal: unit.goal,
        lessons,
      };
    }),
  };
}

const A1_UNITS = [
  {
    id: 'a1-01-sounds-identity',
    title: 'Fundamentos: sons, letras e identidade',
    goal: 'Começar sem pular a base: sons, nomes, spelling, números e frase mínima.',
    lessons: [
      { type: 'listening', title: 'Alfabeto, sons iniciais e spelling de nomes', category: 'fundamentos' },
      { type: 'reading', title: 'Cumprimentos, nomes e apresentações simples', category: 'fundamentos' },
      { type: 'grammar', title: 'Verb to be: I am, you are, he/she is', category: 'gramática essencial' },
      { type: 'writing', title: 'Escrevendo uma apresentação pessoal curta', category: 'writing' },
      { type: 'listening', title: 'Entendendo apresentações lentas', category: 'listening' },
      { type: 'grammar', title: 'Pronomes pessoais: I, you, he, she, it, we, they', category: 'gramática essencial' },
      { type: 'reading', title: 'Perfil pessoal: país, idade, profissão e cidade', category: 'leitura' },
      { type: 'writing', title: 'Formulário simples: nome, país, telefone e e-mail', category: 'writing' },
      { type: 'listening', title: 'Números, idade, telefone e spelling em áudio', category: 'listening' },
    ],
  },
  {
    id: 'a1-02-basic-nouns',
    title: 'Objetos, artigos, plural e posse',
    goal: 'Dominar nomes e objetos antes de descrever rotina.',
    lessons: [
      { type: 'grammar', title: 'A/an, singular e plural básico', category: 'gramática essencial' },
      { type: 'reading', title: 'Objetos pessoais e sala de aula', category: 'leitura' },
      { type: 'grammar', title: 'This, that, these, those', category: 'gramática essencial' },
      { type: 'writing', title: 'Descrevendo objetos simples', category: 'writing' },
      { type: 'grammar', title: 'Possessive adjectives: my, your, his, her, our, their', category: 'gramática essencial' },
      { type: 'listening', title: 'Identificando objetos e donos em diálogos curtos', category: 'listening' },
      { type: 'reading', title: 'Família, objetos e pertencimento', category: 'leitura' },
      { type: 'grammar', title: 'Genitive case: Ana’s book, my brother’s phone', category: 'gramática essencial' },
      { type: 'writing', title: 'Mini texto: minha família e meus objetos', category: 'writing' },
    ],
  },
  {
    id: 'a1-03-routine-present',
    title: 'Rotina e Simple Present sem lacunas',
    goal: 'Construir rotina no presente antes de perguntas complexas.',
    lessons: [
      { type: 'grammar', title: 'Simple Present afirmativo: I work, she studies', category: 'gramática essencial' },
      { type: 'reading', title: 'Daily routine com horários simples', category: 'leitura' },
      { type: 'grammar', title: 'He/she/it com -s: regras e erros comuns', category: 'gramática essencial' },
      { type: 'listening', title: 'Rotina de manhã, tarde e noite', category: 'listening' },
      { type: 'writing', title: 'Minha rotina em 8 frases', category: 'writing' },
      { type: 'grammar', title: 'Do/does em perguntas simples', category: 'gramática essencial' },
      { type: 'grammar', title: 'Don’t/doesn’t em negativas simples', category: 'gramática essencial' },
      { type: 'reading', title: 'Hábitos de estudo e trabalho', category: 'leitura' },
      { type: 'listening', title: 'Perguntas sobre rotina em fala lenta', category: 'listening' },
      { type: 'writing', title: 'Perguntas e respostas sobre rotina', category: 'writing' },
    ],
  },
  {
    id: 'a1-04-time-frequency',
    title: 'Tempo, frequência, datas e agenda',
    goal: 'Falar quando as coisas acontecem sem confundir estruturas.',
    lessons: [
      { type: 'grammar', title: 'Horas, dias da semana e partes do dia', category: 'gramática essencial' },
      { type: 'listening', title: 'Ouvindo horários e compromissos simples', category: 'listening' },
      { type: 'grammar', title: 'Preposições de tempo: at, on, in', category: 'gramática essencial' },
      { type: 'reading', title: 'Uma agenda semanal simples', category: 'leitura' },
      { type: 'grammar', title: 'Advérbios de frequência: always, usually, often, sometimes, never', category: 'gramática essencial' },
      { type: 'writing', title: 'Meu calendário de estudo em inglês', category: 'writing' },
      { type: 'listening', title: 'Convites, horários e pequenos compromissos', category: 'listening' },
      { type: 'reading', title: 'Rotina com frequência e horários', category: 'leitura' },
    ],
  },
  {
    id: 'a1-05-place-home-city',
    title: 'Casa, cidade, existência e localização',
    goal: 'Descrever lugares e localizar objetos com segurança.',
    lessons: [
      { type: 'grammar', title: 'There is / there are afirmativo', category: 'gramática essencial' },
      { type: 'reading', title: 'Casa, quarto e objetos pessoais', category: 'leitura' },
      { type: 'grammar', title: 'There is / there are em perguntas e negativas', category: 'gramática essencial' },
      { type: 'grammar', title: 'Preposições de lugar: in, on, under, next to, behind', category: 'gramática essencial' },
      { type: 'listening', title: 'Encontrando objetos em casa', category: 'listening' },
      { type: 'writing', title: 'Descrevendo meu quarto', category: 'writing' },
      { type: 'reading', title: 'Lugares na cidade: market, bank, pharmacy, school', category: 'leitura' },
      { type: 'listening', title: 'Perguntando onde fica um lugar', category: 'listening' },
      { type: 'writing', title: 'Minha cidade em frases simples', category: 'writing' },
    ],
  },
  {
    id: 'a1-06-survival-needs',
    title: 'Sobrevivência: pedidos, comida, compras e transporte',
    goal: 'Usar inglês prático em situações reais de A1.',
    lessons: [
      { type: 'grammar', title: 'Can/can’t para habilidade e pedidos', category: 'gramática essencial' },
      { type: 'reading', title: 'Pedindo café, água e comida simples', category: 'leitura' },
      { type: 'listening', title: 'No café: pedidos curtos e naturais', category: 'listening' },
      { type: 'writing', title: 'Pedidos educados com can/could', category: 'writing' },
      { type: 'grammar', title: 'Imperativos: open, turn left, wait, listen', category: 'gramática essencial' },
      { type: 'reading', title: 'Direções simples na cidade', category: 'leitura' },
      { type: 'listening', title: 'Transporte, estação e direções básicas', category: 'listening' },
      { type: 'writing', title: 'Instruções simples para chegar a um lugar', category: 'writing' },
      { type: 'reading', title: 'Compras: preço, tamanho e quantidade', category: 'leitura' },
      { type: 'listening', title: 'Ouvindo preços e escolhas em uma loja', category: 'listening' },
    ],
  },
  {
    id: 'a1-07-present-continuous',
    title: 'Ações acontecendo agora',
    goal: 'Separar rotina de ação no momento presente.',
    lessons: [
      { type: 'grammar', title: 'Present Continuous afirmativo: I am studying', category: 'gramática essencial' },
      { type: 'reading', title: 'O que as pessoas estão fazendo agora', category: 'leitura' },
      { type: 'grammar', title: 'Present Continuous em perguntas e negativas', category: 'gramática essencial' },
      { type: 'listening', title: 'Identificando ações acontecendo agora', category: 'listening' },
      { type: 'writing', title: 'Descrevendo uma imagem em inglês', category: 'writing' },
      { type: 'grammar', title: 'Simple Present vs Present Continuous no A1', category: 'gramática essencial' },
      { type: 'reading', title: 'Rotina vs agora: dois textos simples', category: 'leitura' },
      { type: 'writing', title: 'Minha rotina e o que estou fazendo hoje', category: 'writing' },
    ],
  },
  {
    id: 'a1-08-a1-review-assessment',
    title: 'Consolidação A1: revisar, produzir e simular',
    goal: 'Não liberar A2 sem revisar todos os pilares do A1.',
    lessons: [
      { type: 'grammar', title: 'Revisão A1 1: to be, pronomes, artigos e plural', category: 'revisão', checkpoint: 'mid-review' },
      { type: 'reading', title: 'Revisão A1 2: pessoa, família, objetos e cidade', category: 'revisão', checkpoint: 'mid-review' },
      { type: 'grammar', title: 'Revisão A1 3: simple present, there is/are, can e present continuous', category: 'revisão', checkpoint: 'final-review' },
      { type: 'listening', title: 'Revisão A1 4: escuta integrada de rotina, lugares e pedidos', category: 'revisão', checkpoint: 'final-review' },
      { type: 'writing', title: 'Produção final A1: quem sou, minha rotina, minha cidade e meus planos simples', category: 'produção final', checkpoint: 'final-production' },
      { type: 'reading', title: 'Simulado A1 Reading: compreensão geral e detalhes', category: 'simulado', checkpoint: 'level-assessment' },
      { type: 'listening', title: 'Simulado A1 Listening: fala lenta, natural e instruções', category: 'simulado', checkpoint: 'level-assessment' },
      { type: 'writing', title: 'Simulado A1 Writing: parágrafo guiado e autocorreção', category: 'simulado', checkpoint: 'level-assessment' },
      { type: 'grammar', title: 'Correção pós-simulado A1: pontos fracos e reforço final', category: 'revisão', checkpoint: 'mastery-lock' },
    ],
  },
];

const A2_UNITS = [
  {
    id: 'a2-01-past-foundation',
    title: 'Passado completo: regular, irregular e perguntas',
    goal: 'Narrar passado sem depender de tradução.',
    lessons: [
      { type: 'grammar', title: 'Simple Past com verbos regulares e pronúncia do -ed', category: 'gramática essencial' },
      { type: 'reading', title: 'Yesterday and last weekend', category: 'leitura' },
      { type: 'listening', title: 'Ouvindo verbos regulares no passado', category: 'listening' },
      { type: 'grammar', title: 'Simple Past com verbos irregulares comuns', category: 'gramática essencial' },
      { type: 'reading', title: 'Histórias curtas com verbos irregulares', category: 'leitura' },
      { type: 'writing', title: 'Meu último fim de semana em detalhes', category: 'writing' },
      { type: 'grammar', title: 'Did em perguntas e negativas no passado', category: 'gramática essencial' },
      { type: 'listening', title: 'Conversas sobre fim de semana e férias', category: 'listening' },
      { type: 'writing', title: 'Uma história curta com começo, meio e fim', category: 'writing' },
      { type: 'grammar', title: 'Past time expressions: yesterday, last, ago, in 2020', category: 'gramática essencial' },
    ],
  },
  {
    id: 'a2-02-future-plans',
    title: 'Futuro, planos e compromissos',
    goal: 'Diferenciar intenção, previsão e compromisso.',
    lessons: [
      { type: 'grammar', title: 'Going to para planos e intenções', category: 'gramática essencial' },
      { type: 'reading', title: 'Planos de estudo, viagem e trabalho', category: 'leitura' },
      { type: 'writing', title: 'Meu plano para a próxima semana', category: 'writing' },
      { type: 'grammar', title: 'Will para decisões, previsões e promessas simples', category: 'gramática essencial' },
      { type: 'listening', title: 'Marcando compromissos e combinando horários', category: 'listening' },
      { type: 'grammar', title: 'Present Continuous para futuro combinado', category: 'gramática essencial' },
      { type: 'reading', title: 'Agenda de viagem e reservas', category: 'leitura' },
      { type: 'writing', title: 'E-mail curto marcando um compromisso', category: 'writing' },
      { type: 'listening', title: 'Planos, convites e respostas educadas', category: 'listening' },
      { type: 'grammar', title: 'Revisão: will vs going to vs present continuous', category: 'revisão', checkpoint: 'mid-review' },
    ],
  },
  {
    id: 'a2-03-description-comparison',
    title: 'Descrição, comparação e quantidade',
    goal: 'Descrever pessoas, lugares, produtos e preferências com mais precisão.',
    lessons: [
      { type: 'grammar', title: 'Adjetivos: ordem, intensidade e uso básico', category: 'gramática essencial' },
      { type: 'reading', title: 'Descrevendo pessoas, lugares e objetos', category: 'leitura' },
      { type: 'grammar', title: 'Comparativos: bigger, easier, more interesting', category: 'gramática essencial' },
      { type: 'writing', title: 'Comparando duas cidades ou rotinas', category: 'writing' },
      { type: 'grammar', title: 'Superlativos básicos: the best, the most useful', category: 'gramática essencial' },
      { type: 'listening', title: 'Escolhendo produtos, lugares e opções', category: 'listening' },
      { type: 'grammar', title: 'Countable/uncountable: some, any, much, many', category: 'gramática essencial' },
      { type: 'reading', title: 'Compras, comida, quantidades e preferências', category: 'leitura' },
      { type: 'writing', title: 'Minha opinião simples sobre duas opções', category: 'writing' },
      { type: 'listening', title: 'Comparações em diálogos reais lentos', category: 'listening' },
    ],
  },
  {
    id: 'a2-04-modals-travel-health',
    title: 'Necessidade, conselho, viagem e saúde',
    goal: 'Resolver situações práticas com modais e vocabulário útil.',
    lessons: [
      { type: 'grammar', title: 'Should/shouldn’t para conselho simples', category: 'gramática essencial' },
      { type: 'reading', title: 'Conselhos de estudo, saúde e rotina', category: 'leitura' },
      { type: 'grammar', title: 'Have to/don’t have to para obrigação', category: 'gramática essencial' },
      { type: 'listening', title: 'Regras, instruções e obrigações simples', category: 'listening' },
      { type: 'writing', title: 'Dando conselhos educados por mensagem', category: 'writing' },
      { type: 'reading', title: 'Viagem: aeroporto, hotel e transporte', category: 'leitura' },
      { type: 'listening', title: 'Check-in, reserva e problemas simples', category: 'listening' },
      { type: 'grammar', title: 'Would like para pedidos e ofertas', category: 'gramática essencial' },
      { type: 'writing', title: 'Mensagem curta pedindo ajuda ou informação', category: 'writing' },
      { type: 'grammar', title: 'Revisão A2: past, future, comparison e modals', category: 'revisão', checkpoint: 'final-review' },
    ],
  },
  {
    id: 'a2-05-a2-assessment',
    title: 'Consolidação A2: produção e simulados',
    goal: 'Bloquear avanço para B1 até haver domínio real do A2.',
    lessons: [
      { type: 'reading', title: 'Revisão integrada A2: passado, futuro e escolhas', category: 'revisão', checkpoint: 'final-review' },
      { type: 'writing', title: 'Produção final A2: passado, presente, planos e opinião simples', category: 'produção final', checkpoint: 'final-production' },
      { type: 'listening', title: 'Simulado A2 Listening: diálogos do dia a dia', category: 'simulado', checkpoint: 'level-assessment' },
      { type: 'reading', title: 'Simulado A2 Reading: detalhes e inferência simples', category: 'simulado', checkpoint: 'level-assessment' },
      { type: 'writing', title: 'Simulado A2 Writing: e-mail curto e parágrafo', category: 'simulado', checkpoint: 'level-assessment' },
      { type: 'grammar', title: 'Correção pós-simulado A2: reforço de lacunas', category: 'revisão', checkpoint: 'mastery-lock' },
    ],
  },
];

const B1_UNITS = [
  {
    id: 'b1-01-perfect-continuity',
    title: 'Experiências, resultados e continuidade',
    goal: 'Usar tempos perfeitos e continuidade com controle intermediário.',
    lessons: [
      { type: 'grammar', title: 'Present Perfect: experiências e resultados', category: 'gramática essencial' },
      { type: 'reading', title: 'Life experiences and achievements', category: 'leitura' },
      { type: 'grammar', title: 'Already, yet, just, ever e never', category: 'gramática essencial' },
      { type: 'listening', title: 'Histórias de aprendizado e experiências', category: 'listening' },
      { type: 'writing', title: 'Minha experiência aprendendo inglês', category: 'writing' },
      { type: 'grammar', title: 'For/since e present perfect continuous', category: 'gramática essencial' },
      { type: 'reading', title: 'Mudanças de vida e progresso pessoal', category: 'leitura' },
      { type: 'writing', title: 'Meu progresso em um projeto pessoal', category: 'writing' },
      { type: 'listening', title: 'Conversas sobre conquistas e desafios', category: 'listening' },
    ],
  },
  {
    id: 'b1-02-narrative-opinion',
    title: 'Narrativa, opinião e consequência',
    goal: 'Contar histórias e defender opiniões sem perder clareza.',
    lessons: [
      { type: 'grammar', title: 'Past Continuous vs Simple Past', category: 'gramática essencial' },
      { type: 'reading', title: 'Narrativas curtas com interrupções', category: 'leitura' },
      { type: 'writing', title: 'Narrando uma experiência marcante', category: 'writing' },
      { type: 'grammar', title: 'First conditional para consequências reais', category: 'gramática essencial' },
      { type: 'reading', title: 'Problemas, escolhas e consequências', category: 'leitura' },
      { type: 'listening', title: 'Conselhos, decisões e consequências', category: 'listening' },
      { type: 'grammar', title: 'Modals: should, must, have to, might', category: 'gramática essencial' },
      { type: 'writing', title: 'Opinião com justificativa e exemplo', category: 'writing' },
      { type: 'reading', title: 'Texto B1 com opinião e experiência', category: 'leitura' },
    ],
  },
  {
    id: 'b1-03-complex-sentences',
    title: 'Frases complexas, conectores e fluência controlada',
    goal: 'Criar parágrafos mais longos com conexão lógica.',
    lessons: [
      { type: 'grammar', title: 'Relative clauses básicas: who, which, that', category: 'gramática essencial' },
      { type: 'reading', title: 'Descrições com frases relativas', category: 'leitura' },
      { type: 'grammar', title: 'Connectors: because, although, however, therefore', category: 'gramática essencial' },
      { type: 'writing', title: 'Parágrafo B1 com contraste e causa', category: 'writing' },
      { type: 'listening', title: 'Entendendo conectores em fala natural', category: 'listening' },
      { type: 'grammar', title: 'Gerunds and infinitives básicos', category: 'gramática essencial' },
      { type: 'reading', title: 'Hábitos, preferências e objetivos', category: 'leitura' },
      { type: 'writing', title: 'Texto B1 sobre opinião pessoal', category: 'writing' },
      { type: 'listening', title: 'Discussões simples com opinião', category: 'listening' },
    ],
  },
  {
    id: 'b1-04-b1-assessment',
    title: 'Consolidação B1: autonomia real',
    goal: 'Não liberar B2 sem domínio intermediário consistente.',
    lessons: [
      { type: 'grammar', title: 'Revisão B1: perfect, narrative, modals e clauses', category: 'revisão', checkpoint: 'mid-review' },
      { type: 'reading', title: 'Revisão B1 integrada: opinião, experiência e inferência', category: 'revisão', checkpoint: 'final-review' },
      { type: 'writing', title: 'Produção final B1: texto argumentativo curto', category: 'produção final', checkpoint: 'final-production' },
      { type: 'listening', title: 'Simulado B1 Listening: conversas naturais', category: 'simulado', checkpoint: 'level-assessment' },
      { type: 'reading', title: 'Simulado B1 Reading: inferência, referência e opinião', category: 'simulado', checkpoint: 'level-assessment' },
      { type: 'writing', title: 'Simulado B1 Writing: opinião organizada', category: 'simulado', checkpoint: 'level-assessment' },
      { type: 'grammar', title: 'Correção pós-simulado B1: reforço final', category: 'revisão', checkpoint: 'mastery-lock' },
    ],
  },
];

const B2_UNITS = [
  {
    id: 'b2-01-argument-precision',
    title: 'Argumentação, precisão e estruturas complexas',
    goal: 'Construir argumentos claros e naturais em temas abstratos.',
    lessons: [
      { type: 'grammar', title: 'Conditionals 0, 1 and 2 em contexto real', category: 'gramática essencial' },
      { type: 'reading', title: 'Debates sobre tecnologia, hábitos e sociedade', category: 'leitura' },
      { type: 'grammar', title: 'Third conditional e arrependimentos', category: 'gramática essencial' },
      { type: 'writing', title: 'Argumentação com hipótese e consequência', category: 'writing' },
      { type: 'listening', title: 'Entrevistas e opiniões longas', category: 'listening' },
      { type: 'grammar', title: 'Passive voice em notícias, processos e ciência', category: 'gramática essencial' },
      { type: 'reading', title: 'Artigos B2 com inferência e tom', category: 'leitura' },
      { type: 'writing', title: 'Essay B2: introdução, desenvolvimento e conclusão', category: 'writing' },
      { type: 'grammar', title: 'Reported speech essencial e avançado', category: 'gramática essencial' },
      { type: 'listening', title: 'Opiniões indiretas e reportagem oral', category: 'listening' },
    ],
  },
  {
    id: 'b2-02-nuance-register',
    title: 'Nuance, registro e coesão',
    goal: 'Aumentar naturalidade e precisão antes do C1.',
    lessons: [
      { type: 'grammar', title: 'Participle clauses e redução de frases', category: 'gramática essencial' },
      { type: 'reading', title: 'Textos com coesão e referência complexa', category: 'leitura' },
      { type: 'writing', title: 'Coesão B2: linking devices e progressão lógica', category: 'writing' },
      { type: 'grammar', title: 'Wish, if only e estruturas de arrependimento', category: 'gramática essencial' },
      { type: 'listening', title: 'Palestra curta com exemplos e digressões', category: 'listening' },
      { type: 'reading', title: 'Análise de argumento e contra-argumento', category: 'leitura' },
      { type: 'writing', title: 'Essay B2 com contraste e concessão', category: 'writing' },
      { type: 'grammar', title: 'Revisão B2: conditionals, passive, reported speech e cohesion', category: 'revisão', checkpoint: 'final-review' },
      { type: 'listening', title: 'Simulado B2 Listening: entrevista e opinião', category: 'simulado', checkpoint: 'level-assessment' },
      { type: 'reading', title: 'Simulado B2 Reading: inferência e tom', category: 'simulado', checkpoint: 'level-assessment' },
      { type: 'writing', title: 'Produção final B2: essay completo com opinião', category: 'produção final', checkpoint: 'final-production' },
      { type: 'grammar', title: 'Correção pós-simulado B2: reforço de precisão', category: 'revisão', checkpoint: 'mastery-lock' },
    ],
  },
];

const C1_UNITS = [
  {
    id: 'c1-01-advanced-control',
    title: 'Controle avançado: estilo, nuance e densidade',
    goal: 'Produzir e compreender inglês avançado com precisão e intenção.',
    lessons: [
      { type: 'grammar', title: 'Advanced clauses and emphasis', category: 'gramática avançada' },
      { type: 'reading', title: 'Artigos longos com nuance e subtexto', category: 'leitura avançada' },
      { type: 'grammar', title: 'Inversion, fronting and advanced linking', category: 'gramática avançada' },
      { type: 'writing', title: 'Argumentação sofisticada com voz clara', category: 'writing avançado' },
      { type: 'listening', title: 'Palestras e entrevistas densas', category: 'listening avançado' },
      { type: 'grammar', title: 'Hedging, stance and cautious language', category: 'gramática avançada' },
      { type: 'reading', title: 'Análise de tom, viés e intenção', category: 'leitura avançada' },
      { type: 'writing', title: 'Produção C1: artigo opinativo refinado', category: 'produção final', checkpoint: 'final-production' },
      { type: 'listening', title: 'Simulado C1 Listening: palestra e entrevista densa', category: 'simulado', checkpoint: 'level-assessment' },
      { type: 'reading', title: 'Simulado C1 Reading: nuance, inferência e propósito', category: 'simulado', checkpoint: 'level-assessment' },
      { type: 'grammar', title: 'Correção pós-simulado C1: precisão e naturalidade', category: 'revisão', checkpoint: 'mastery-lock' },
    ],
  },
];

const C2_UNITS = [
  {
    id: 'c2-01-mastery',
    title: 'Maestria: voz autoral, subtexto e leitura crítica',
    goal: 'Refinar o uso avançado, natural e crítico do inglês.',
    lessons: [
      { type: 'reading', title: 'Leitura crítica avançada', category: 'leitura crítica' },
      { type: 'grammar', title: 'Estilo, registro e nuance em nível C2', category: 'estilo' },
      { type: 'writing', title: 'Texto avançado com voz autoral', category: 'writing avançado' },
      { type: 'listening', title: 'Compreensão natural rápida e fala sobreposta', category: 'listening avançado' },
      { type: 'reading', title: 'Humor, subtexto, ironia e implicatura', category: 'leitura crítica' },
      { type: 'writing', title: 'Produção C2: resposta crítica sofisticada', category: 'produção final', checkpoint: 'final-production' },
      { type: 'listening', title: 'Simulado C2 Listening: fala natural, rápida e idiomática', category: 'simulado', checkpoint: 'level-assessment' },
      { type: 'reading', title: 'Simulado C2 Reading: crítica, nuance e ambiguidade', category: 'simulado', checkpoint: 'level-assessment' },
      { type: 'grammar', title: 'Correção pós-simulado C2: refinamento final', category: 'revisão', checkpoint: 'mastery-lock' },
    ],
  },
];

export const CURRICULUM_LEVELS = [
  makeLevel({ level: 'A1', title: 'Fundação absoluta', requiredCompletion: LEVEL_REQUIREMENTS.A1, unlockRule: 'A1 começa aberto; A2 só libera após produção final, simulados e correção pós-simulado.', units: A1_UNITS }),
  makeLevel({ level: 'A2', title: 'Expansão essencial', requiredCompletion: LEVEL_REQUIREMENTS.A2, unlockRule: LEVEL_LOCKS.A2, units: A2_UNITS }),
  makeLevel({ level: 'B1', title: 'Independência controlada', requiredCompletion: LEVEL_REQUIREMENTS.B1, unlockRule: LEVEL_LOCKS.B1, units: B1_UNITS }),
  makeLevel({ level: 'B2', title: 'Fluência intermediária alta', requiredCompletion: LEVEL_REQUIREMENTS.B2, unlockRule: LEVEL_LOCKS.B2, units: B2_UNITS }),
  makeLevel({ level: 'C1', title: 'Avançado funcional', requiredCompletion: LEVEL_REQUIREMENTS.C1, unlockRule: LEVEL_LOCKS.C1, units: C1_UNITS }),
  makeLevel({ level: 'C2', title: 'Maestria e refinamento', requiredCompletion: LEVEL_REQUIREMENTS.C2, unlockRule: LEVEL_LOCKS.C2, units: C2_UNITS }),
];

function normalizeRawLesson(raw) {
  if (Array.isArray(raw)) {
    const [id, type, title, prerequisites = []] = raw;
    return { id, type, title, prerequisites, category: 'core', checkpoint: '' };
  }
  return raw;
}

function expandLesson(rawLesson, level, unit, index, levelIndex) {
  const raw = normalizeRawLesson(rawLesson);
  return {
    id: raw.id,
    curriculumId: raw.id,
    type: raw.type,
    title: raw.title,
    level: level.level,
    levelTitle: level.title,
    unitId: unit.id,
    unitTitle: unit.title,
    unitGoal: unit.goal || '',
    order: index + 1,
    levelIndex,
    prerequisites: raw.prerequisites || [],
    category: raw.category || 'core',
    checkpoint: raw.checkpoint || '',
    isReview: raw.category === 'revisão' || String(raw.checkpoint).includes('review') || raw.checkpoint === 'mastery-lock',
    isAssessment: raw.category === 'simulado' || raw.checkpoint === 'level-assessment',
    isFinalProduction: raw.checkpoint === 'final-production',
    isMasteryLock: raw.checkpoint === 'mastery-lock',
  };
}

export function getCurriculumLessons() {
  const lessons = [];
  CURRICULUM_LEVELS.forEach((level, levelIndex) => {
    level.units.forEach((unit) => {
      unit.lessons.forEach((raw) => {
        lessons.push(expandLesson(raw, level, unit, lessons.length, levelIndex));
      });
    });
  });
  return lessons;
}

export function getCurriculumProgress() {
  return storage.get(CURRICULUM_PROGRESS_KEY, { completedIds: [], activeLessonId: '' });
}

export function saveCurriculumProgress(progress) {
  const completedIds = Array.from(new Set(progress?.completedIds || []));
  const activeLessonId = progress?.activeLessonId || '';
  const next = { completedIds, activeLessonId };
  storage.set(CURRICULUM_PROGRESS_KEY, next);
  return next;
}

export function markCurriculumLessonComplete(lesson) {
  const progress = getCurriculumProgress();
  const curriculumId = lesson?.curriculumId || lesson?.raw?.curriculumId || lesson?.id;
  if (!curriculumId) return progress;
  return saveCurriculumProgress({
    ...progress,
    completedIds: [...progress.completedIds, curriculumId],
    activeLessonId: '',
  });
}

function isLevelUnlocked(levelIndex, completed, lessons) {
  if (levelIndex <= 0) return true;
  const previousLevel = CURRICULUM_LEVELS[levelIndex - 1];
  const previousLessons = lessons.filter((lesson) => lesson.level === previousLevel.level);
  const required = Math.ceil(previousLessons.length * previousLevel.requiredCompletion);
  const completedPrevious = previousLessons.filter((lesson) => completed.has(lesson.id)).length;
  const masteryLessons = previousLessons.filter((lesson) => lesson.isAssessment || lesson.isFinalProduction || lesson.isMasteryLock);
  const completedMastery = masteryLessons.every((lesson) => completed.has(lesson.id));
  return completedPrevious >= required && completedMastery;
}

export function getNextCurriculumLesson() {
  const progress = getCurriculumProgress();
  const lessons = getCurriculumLessons();
  const completed = new Set(progress.completedIds || []);
  const active = lessons.find((lesson) => lesson.id === progress.activeLessonId && !completed.has(lesson.id));
  if (active && isLevelUnlocked(active.levelIndex, completed, lessons)) return active;
  return lessons.find((lesson) => !completed.has(lesson.id) && isLevelUnlocked(lesson.levelIndex, completed, lessons)) || lessons[lessons.length - 1];
}

export function setActiveCurriculumLesson(lessonId) {
  const progress = getCurriculumProgress();
  return saveCurriculumProgress({ ...progress, activeLessonId: lessonId });
}

export function getCurriculumSummary() {
  const lessons = getCurriculumLessons();
  const progress = getCurriculumProgress();
  const completed = new Set(progress.completedIds || []);
  const nextLesson = getNextCurriculumLesson();
  const currentLevel = nextLesson?.level || 'A1';
  const levelData = CURRICULUM_LEVELS.find((item) => item.level === currentLevel) || CURRICULUM_LEVELS[0];
  const levelLessons = lessons.filter((lesson) => lesson.level === currentLevel);
  const completedInLevel = levelLessons.filter((lesson) => completed.has(lesson.id)).length;
  const levelTotal = levelLessons.length || 1;
  const requiredToUnlock = Math.ceil(levelTotal * levelData.requiredCompletion);
  const remainingToUnlock = Math.max(0, requiredToUnlock - completedInLevel);
  const masteryLessons = levelLessons.filter((lesson) => lesson.isAssessment || lesson.isFinalProduction || lesson.isMasteryLock);
  const pendingAssessments = masteryLessons.filter((lesson) => !completed.has(lesson.id));

  return {
    currentLevel,
    nextLesson,
    totalLessons: lessons.length,
    completedTotal: completed.size,
    levelTotal,
    completedInLevel,
    levelProgress: Math.round((completedInLevel / levelTotal) * 100),
    requiredCompletion: levelData.requiredCompletion,
    requiredToUnlock,
    remainingToUnlock,
    pendingAssessments,
    unlockRule: levelData.unlockRule || '',
  };
}

export function buildCurriculumPrompt(lesson) {
  const prerequisites = (lesson.prerequisites || []).join(', ') || 'nenhum';
  return [
    'Gere a próxima aula obrigatória do cronograma Fluency.',
    `ID da aula: ${lesson.id}.`,
    `Tipo: ${lesson.type}.`,
    `Nível CEFR: ${lesson.level}.`,
    `Unidade: ${lesson.unitTitle}.`,
    `Objetivo da unidade: ${lesson.unitGoal || 'seguir a trilha pedagógica sem pular etapas'}.`,
    `Categoria pedagógica: ${lesson.category || 'core'}.`,
    `Marco/checkpoint: ${lesson.checkpoint || 'aula regular'}.`,
    `Tema obrigatório: ${lesson.title}.`,
    `Pré-requisitos já estudados: ${prerequisites}.`,
    '',
    'Regras pedagógicas obrigatórias:',
    '- Não use conteúdo gramatical que ainda não apareceu nos pré-requisitos.',
    '- Não avance de nível CEFR.',
    '- Não ensine conteúdo futuro como se já fosse conhecido.',
    '- Não mencione que existem níveis futuros como conteúdo da aula.',
    '- A aula deve ser longa, profunda, guiada e adequada ao nível informado.',
    '- Explique em português quando necessário, mas exemplos e prática devem estar em inglês adequado ao nível.',
    '- Inclua muitas perguntas, prática ativa e produção final.',
    '- Se a categoria for revisão, misture conteúdos anteriores e corrija confusões comuns.',
    '- Se a categoria for simulado, crie avaliação guiada sem ensinar conteúdo novo.',
    '- Se for produção final, conduza o aluno a escrever/falar com estrutura, checklist e autocorreção.',
    '- Se for mastery-lock, foque nas lacunas do nível e consolidação antes do próximo nível.',
    '- Retorne conteúdo compatível com o tipo da aula.',
  ].join('\n');
}
