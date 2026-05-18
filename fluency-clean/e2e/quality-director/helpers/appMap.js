export const AUDIT_TABS = [
  {
    id: 'today',
    label: 'Hoje',
    expectedTexts: [/fluency/i, /hoje|aula|rotina|progresso/i],
  },
  {
    id: 'course',
    label: 'Curso',
    expectedTexts: [/curso|nível|a1|aula/i],
  },
  {
    id: 'lesson',
    label: 'Aula',
    expectedTexts: [/aula|começar|curso|lesson|daily routine/i],
  },
  {
    id: 'cards',
    label: 'Cartas',
    expectedTexts: [/cartas|flashcards|vocabulário|revis/i],
  },
  {
    id: 'speaking',
    label: 'Speaking',
    expectedTexts: [/speaking|fala|pronúncia|gravar/i],
  },
  {
    id: 'progress',
    label: 'Progresso',
    expectedTexts: [/progresso|xp|domínio|streak|aulas/i],
  },
  {
    id: 'settings',
    label: 'Ajustes',
    expectedTexts: [/ajustes|conta|chaves|preferências|config/i],
  },
];

export const QUALITY_FORBIDDEN_PATTERNS = [
  { pattern: /\bundefined\b/i, reason: 'Texto técnico "undefined" apareceu para o aluno.' },
  { pattern: /\bnull\b/i, reason: 'Texto técnico "null" apareceu para o aluno.' },
  { pattern: /\bNaN\b/, reason: 'Valor inválido "NaN" apareceu na interface.' },
  { pattern: /\[object Object\]/i, reason: 'Objeto bruto apareceu renderizado na interface.' },
  { pattern: /fallback-reading/i, reason: 'Fallback técnico de Reading apareceu para o aluno.' },
  { pattern: /json parse|parse error|syntaxerror/i, reason: 'Erro técnico de parser apareceu na interface.' },
  { pattern: /lorem ipsum|coming soon|todo:/i, reason: 'Placeholder ou texto temporário apareceu na interface.' },
  { pattern: /api[_ -]?key|secret|token/i, reason: 'Possível texto sensível ou técnico apareceu na interface.' },
];

export const QUALITY_BUTTON_PATTERNS = [
  /começar|continuar|revisar|abrir|gerar|salvar|ouvir|gravar|flashcards|curso|aula/i,
];
