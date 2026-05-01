function clean(value) {
  return String(value ?? '').trim();
}

function getSeedNumber(seed = '') {
  const source = clean(seed) || `${Date.now()}`;
  return Array.from(source).reduce((total, char) => total + char.charCodeAt(0), 0);
}

function pick(seed, items) {
  if (!items.length) return '';
  return items[getSeedNumber(seed) % items.length];
}

const TYPE_PLANS = {
  listening: {
    mission: 'treinar compreensão auditiva real com escuta global, escuta por detalhes, transcrição, vocabulário ouvido e shadowing',
    exerciseMix: ['escuta global', 'detalhes do áudio', 'vocabulário auditivo', 'ditado curto', 'spelling escrito', 'correção de spelling', 'shadowing oral'],
    qualityChecks: ['transcrição coerente e natural', 'ditados curtos para A1', 'sem perguntas de spelling fracas apenas com alternativa pronta', 'áudio dividido em trechos úteis', 'exercícios derivados da transcrição'],
    progression: ['ouvir sem ler', 'ouvir buscando detalhes', 'comparar com transcrição', 'responder', 'repetir em voz alta'],
  },
  grammar: {
    mission: 'ensinar uma estrutura gramatical com uso real, forma, exemplos, erros comuns e produção própria',
    exerciseMix: ['escolha da forma correta', 'completar frase', 'corrigir erro', 'transformar frase', 'explicar regra', 'produção curta'],
    qualityChecks: ['regra clara', 'exemplos naturais', 'sem respostas reveladas cedo', 'progressão do fácil ao produtivo', 'erros comuns úteis'],
    progression: ['entender uso', 'ver forma', 'comparar exemplos', 'corrigir erros', 'criar frases próprias'],
  },
  reading: {
    mission: 'desenvolver leitura com ideia principal, detalhes, vocabulário em contexto e produção curta',
    exerciseMix: ['ideia principal', 'detalhe textual', 'vocabulário em contexto', 'inferência simples', 'ordem das ideias', 'resumo curto'],
    qualityChecks: ['texto adequado ao nível', 'vocabulário contextualizado', 'perguntas com evidência no texto', 'progressão clara', 'produção final curta'],
    progression: ['pré-leitura', 'leitura global', 'leitura por detalhes', 'vocabulário', 'resumo/produção'],
  },
  writing: {
    mission: 'guiar escrita com modelo, estrutura, frases úteis, revisão e produção gradual',
    exerciseMix: ['copiar modelo', 'completar frase', 'corrigir frase', 'montar frase', 'escrever resposta pessoal', 'revisar texto'],
    qualityChecks: ['modelo simples', 'checklist claro', 'produção curta no início', 'correção de erros bobos', 'revisão antes de concluir'],
    progression: ['ver modelo', 'entender estrutura', 'praticar microfrases', 'escrever', 'revisar'],
  },
  speaking: {
    mission: 'desenvolver fala com repetição, pronúncia, respostas curtas, mini diálogo e revisão oral',
    exerciseMix: ['repetir frase', 'responder pergunta', 'escolher resposta oral', 'pronunciar palavra-chave', 'mini diálogo', 'gravar novamente'],
    qualityChecks: ['frases curtas', 'foco em clareza', 'sem exigir fala longa cedo', 'feedback por tentativa', 'repetição útil'],
    progression: ['ouvir modelo', 'repetir', 'responder curto', 'criar variação', 'regravar melhorando'],
  },
};

const SCENARIOS = {
  beginner: [
    'uma situação cotidiana curta, com frases simples e vocabulário controlado',
    'uma interação entre professor e aluno, com repetição natural e foco em clareza',
    'uma situação prática de escola, recepção, casa, cafeteria ou chamada curta',
  ],
  elementary: [
    'uma situação realista com duas pessoas e objetivo comunicativo claro',
    'uma rotina simples com problema pequeno e solução curta',
    'uma conversa guiada com vocabulário reutilizável em outros contextos',
  ],
  intermediate: [
    'uma situação com opinião, motivo e pequena comparação',
    'uma conversa com detalhes suficientes para inferência simples',
    'um texto ou áudio com começo, desenvolvimento e conclusão claros',
  ],
  advanced: [
    'um contexto mais autêntico com nuance, precisão lexical e produção crítica',
    'um tema comunicativo com análise, contraste e síntese',
    'uma situação longa com vocabulário natural e tarefa final exigente',
  ],
};

function getLevelBand(level = 'A1') {
  const normalized = clean(level).toUpperCase();
  if (normalized === 'A1') return 'beginner';
  if (normalized === 'A2') return 'elementary';
  if (normalized.startsWith('B')) return 'intermediate';
  return 'advanced';
}

function inferTopic(prompt = '') {
  const text = clean(prompt);
  const match = text.match(/(?:tema|aula|sobre|topic|title)[:\-–]\s*([^\n.]+)/i);
  if (match?.[1]) return clean(match[1]).slice(0, 120);
  const compact = text.replace(/\s+/g, ' ');
  return compact.slice(0, 140) || 'conteúdo da próxima aula';
}

function getTypePlan(type) {
  return TYPE_PLANS[type] || TYPE_PLANS.reading;
}

export function buildPedagogicalPlan({ prompt = '', lessonType = 'reading', level = 'A1', seed = '', previousLesson = null, forceVariation = false } = {}) {
  const type = clean(lessonType || 'reading').toLowerCase();
  const levelBand = getLevelBand(level);
  const base = getTypePlan(type);
  const topic = inferTopic(prompt);
  const scenario = pick(`${seed}-${type}-${level}`, SCENARIOS[levelBand] || SCENARIOS.beginner);
  const previousTitle = clean(previousLesson?.title);
  const previousTranscript = clean(previousLesson?.listeningText).slice(0, 260);
  const mustAvoid = [];

  if (forceVariation || previousLesson) {
    mustAvoid.push('não copiar a aula anterior');
    mustAvoid.push('não reutilizar o mesmo roteiro, nomes, exemplos e perguntas');
    if (previousTitle) mustAvoid.push(`não repetir o mesmo título literal: ${previousTitle}`);
    if (previousTranscript) mustAvoid.push(`não repetir o começo da transcrição anterior: ${previousTranscript}`);
  }

  if (type === 'listening' && levelBand === 'beginner') {
    mustAvoid.push('não exigir ditado de frases longas no começo do A1');
    mustAvoid.push('não transformar spelling em pergunta fraca com a resposta pronta em múltipla escolha');
  }

  const plan = {
    contract: 'lesson-plan-v1',
    type,
    level,
    levelBand,
    topic,
    scenario,
    mission: base.mission,
    sequence: base.progression,
    exerciseMix: base.exerciseMix,
    qualityChecks: base.qualityChecks,
    mustAvoid,
    generationRules: [
      'a aula deve seguir este plano antes de qualquer texto final',
      'cada bloco da aula deve conversar com o mesmo cenário e objetivo',
      'os exercícios devem nascer do texto/transcrição/conceito gerado, não de frases aleatórias',
      'a dificuldade deve subir devagar dentro da mesma prática',
      'o aluno deve terminar sentindo que praticou algo real, não só clicou em respostas óbvias',
    ],
  };

  return plan;
}

export function buildPlanPromptText(plan) {
  return [
    'PLANO PEDAGÓGICO OBRIGATÓRIO DA AULA:',
    JSON.stringify(plan, null, 2),
    'Siga este plano de forma fiel. Não ignore mission, scenario, exerciseMix, qualityChecks nem mustAvoid.',
    'Se houver conflito entre pedido genérico e plano, o plano vence.',
  ].join('\n');
}

export function summarizePlanForDiagnostics(plan) {
  if (!plan) return '';
  return `${plan.type} · ${plan.level} · ${plan.levelBand} · ${plan.scenario}`;
}
