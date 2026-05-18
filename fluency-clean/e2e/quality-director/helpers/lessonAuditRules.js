export const GENERIC_EXERCISE_PATTERNS = [
  /option\s*[abcd]/i,
  /correct answer/i,
  /wrong answer/i,
  /choose the correct option/i,
  /example sentence/i,
  /placeholder/i,
  /lorem ipsum/i,
];

export const ABSURD_DISTRACTOR_WORDS = [
  'banana',
  'car',
  'blue',
  'pizza',
  'dog',
  'cat',
  'computer',
  'table',
];

function normalizeText(value) {
  return String(value || '').trim().replace(/\s+/g, ' ');
}

function collectStrings(value, result = []) {
  if (typeof value === 'string') {
    result.push(value);
    return result;
  }

  if (Array.isArray(value)) {
    value.forEach((item) => collectStrings(item, result));
    return result;
  }

  if (value && typeof value === 'object') {
    Object.values(value).forEach((item) => collectStrings(item, result));
  }

  return result;
}

function findArraysWithOptions(value, result = []) {
  if (!value || typeof value !== 'object') return result;

  if (Array.isArray(value)) {
    const strings = value.filter((item) => typeof item === 'string').map(normalizeText).filter(Boolean);
    if (strings.length >= 2) result.push(strings);
    value.forEach((item) => findArraysWithOptions(item, result));
    return result;
  }

  Object.entries(value).forEach(([key, item]) => {
    if (/options|alternatives|choices/i.test(key) && Array.isArray(item)) {
      const strings = item.filter((option) => typeof option === 'string').map(normalizeText).filter(Boolean);
      if (strings.length >= 2) result.push(strings);
    }
    findArraysWithOptions(item, result);
  });

  return result;
}

function addIssue(issues, issue) {
  issues.push({ severity: 'P2', ...issue });
}

export function auditLessonObject(lesson) {
  const issues = [];
  const lessonId = lesson?.id || 'unknown-lesson';
  const title = lesson?.title || lessonId;
  const area = `Aula ${lessonId}`;
  const allStrings = collectStrings(lesson).map(normalizeText).filter(Boolean);
  const combined = allStrings.join(' ');

  if (!lesson || typeof lesson !== 'object') {
    addIssue(issues, {
      severity: 'P0',
      area,
      title: 'Aula inválida ou ausente',
      impact: 'O aluno pode abrir uma aula quebrada ou vazia.',
      recommendation: 'Garantir que a aula atual seja objeto válido antes de renderizar.',
    });
    return issues;
  }

  if (!lesson.title || normalizeText(lesson.title).length < 6) {
    addIssue(issues, {
      severity: 'P1',
      area,
      title: 'Título de aula ausente ou fraco',
      impact: 'A aula parece inacabada ou pouco profissional.',
      evidence: `title=${lesson.title || 'vazio'}`,
      recommendation: 'Adicionar título claro com foco pedagógico.',
    });
  }

  if (!lesson.pillar && !lesson.type) {
    addIssue(issues, {
      severity: 'P1',
      area,
      title: 'Aula sem pilar/tipo definido',
      impact: 'O renderizador correto pode não ser escolhido.',
      recommendation: 'Definir `pillar` e/ou `type` de forma consistente.',
    });
  }

  if (combined.length < 450) {
    addIssue(issues, {
      severity: 'P1',
      area,
      title: 'Conteúdo total parece curto demais',
      impact: 'A aula pode ficar rasa e parecer genérica para o aluno.',
      evidence: `${combined.length} caracteres de texto coletado em ${title}`,
      recommendation: 'Revisar se a aula tem explicação, exemplos, prática e fechamento suficientes.',
    });
  }

  for (const pattern of GENERIC_EXERCISE_PATTERNS) {
    if (pattern.test(combined)) {
      addIssue(issues, {
        severity: 'P1',
        area,
        title: 'Texto genérico/placeholder detectado na aula',
        impact: 'Exercícios ou instruções podem parecer gerados às pressas.',
        evidence: `Padrão encontrado: ${pattern}`,
        recommendation: 'Substituir placeholders por textos específicos da aula.',
      });
    }
  }

  const optionGroups = findArraysWithOptions(lesson);
  optionGroups.forEach((options, index) => {
    const unique = new Set(options.map((option) => option.toLowerCase()));
    if (unique.size !== options.length) {
      addIssue(issues, {
        severity: 'P1',
        area,
        title: 'Alternativas duplicadas em exercício',
        impact: 'O exercício perde validade e pode confundir o aluno.',
        evidence: `Grupo ${index + 1}: ${options.join(' | ')}`,
        recommendation: 'Garantir alternativas únicas e plausíveis.',
      });
    }

    // 2-character words (am, is, do, an, in, on, at, be…) are valid grammar options;
    // only single-character entries (<2) are genuinely too short to test comprehension.
    const shortOptions = options.filter((option) => option.length < 2);
    if (shortOptions.length >= 2) {
      addIssue(issues, {
        severity: 'P2',
        area,
        title: 'Alternativas curtas demais',
        impact: 'Pode indicar exercício raso ou pouco contextualizado.',
        evidence: `Grupo ${index + 1}: ${options.join(' | ')}`,
        recommendation: 'Usar alternativas com contexto suficiente para medir compreensão real.',
      });
    }

    const absurdMatches = options.filter((option) => ABSURD_DISTRACTOR_WORDS.includes(option.toLowerCase()));
    if (absurdMatches.length >= 2) {
      addIssue(issues, {
        severity: 'P1',
        area,
        title: 'Distratores absurdos ou fáceis demais',
        impact: 'O aluno acerta por eliminação sem aprender ou compreender o conteúdo.',
        evidence: `Grupo ${index + 1}: ${options.join(' | ')}`,
        recommendation: 'Trocar por distratores plausíveis, próximos do tema da aula.',
      });
    }
  });

  if (/reading/i.test(lesson.pillar || lesson.type || '') && !/evidence|quote|text|passage|mainText/i.test(Object.keys(lesson).join(' '))) {
    addIssue(issues, {
      severity: 'P2',
      area,
      title: 'Reading sem evidência textual clara',
      impact: 'O aluno pode responder sem treinar leitura com base no texto.',
      recommendation: 'Garantir perguntas ligadas a evidências do texto principal.',
    });
  }

  return issues;
}
