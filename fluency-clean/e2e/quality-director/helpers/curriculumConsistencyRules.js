const LEVELS = ['A1', 'A2', 'B1', 'B2', 'C1', 'C2'];
const PILLARS = ['grammar', 'vocabulary', 'reading', 'listening', 'speaking', 'writing'];
const PILLAR_ID = {
  grammar: 'GRAMMAR',
  vocabulary: 'VOCABULARY',
  reading: 'READING',
  listening: 'LISTENING',
  speaking: 'SPEAKING',
  writing: 'WRITING',
};

const CEFR_SIGNALS = {
  A1: {
    tooAdvanced: [/nevertheless/i, /whereas/i, /notwithstanding/i, /sophisticated/i, /hypothetical/i, /counterargument/i, /discourse marker/i],
    tooBasic: [],
  },
  A2: {
    tooAdvanced: [/notwithstanding/i, /counterargument/i, /academic register/i, /nuance/i, /synthesis/i],
    tooBasic: [],
  },
  B1: {
    tooAdvanced: [/notwithstanding/i, /rhetorical/i, /academic register/i],
    tooBasic: [/my name is/i, /this is a pen/i],
  },
  B2: {
    tooAdvanced: [/near-native/i, /C2/i],
    tooBasic: [/my name is/i, /hello,? how are you/i, /this is a pen/i],
  },
  C1: {
    tooAdvanced: [],
    tooBasic: [/my name is/i, /i am fine/i, /this is a pen/i, /basic greetings/i],
  },
  C2: {
    tooAdvanced: [],
    tooBasic: [/my name is/i, /i am fine/i, /this is a pen/i, /basic greetings/i, /simple present only/i],
  },
};

function clean(value) {
  if (value === null || value === undefined) return '';
  if (typeof value === 'string' || typeof value === 'number') return String(value).trim().replace(/\s+/g, ' ');
  if (Array.isArray(value)) return value.map(clean).filter(Boolean).join(' ');
  if (typeof value === 'object') return clean(Object.values(value));
  return '';
}

function addIssue(issues, issue) {
  issues.push({ severity: 'P2', ...issue });
}

function area(level, extra = 'Currículo') {
  return `${extra} · ${level}`;
}

function lessonArea(lesson) {
  return `Currículo · ${lesson?.level || '??'} · ${lesson?.pillar || lesson?.type || 'unknown'} · ${lesson?.id || 'sem-id'}`;
}

function expectedIdPrefix(lesson) {
  const pillar = String(lesson?.pillar || '').toLowerCase();
  return `${lesson?.level || ''}-${PILLAR_ID[pillar] || pillar.toUpperCase()}-`;
}

function duplicateValues(values) {
  const seen = new Set();
  const duplicates = new Set();
  values.filter(Boolean).forEach((value) => {
    if (seen.has(value)) duplicates.add(value);
    seen.add(value);
  });
  return [...duplicates];
}

export function auditCurriculumConsistency(curriculum) {
  const issues = [];
  const levels = curriculum?.levels || {};
  const allLessons = [];

  LEVELS.forEach((level) => {
    const entry = levels[level];
    if (!entry) {
      addIssue(issues, {
        severity: 'P0',
        area: area(level),
        title: 'Nível CEFR ausente no currículo',
        impact: 'O curso A1→C2 fica incompleto.',
        recommendation: 'Adicionar entrada do nível em STATIC_CURRICULUM.levels.',
      });
      return;
    }

    if (!entry.title || !entry.description) {
      addIssue(issues, {
        severity: 'P1',
        area: area(level),
        title: 'Nível sem título ou descrição',
        impact: 'O aluno pode não entender o objetivo do nível.',
        recommendation: 'Adicionar título e descrição CEFR clara.',
      });
    }

    PILLARS.forEach((pillar) => {
      const lessons = entry.pillars?.[pillar] || [];
      if (!Array.isArray(lessons) || lessons.length === 0) {
        addIssue(issues, {
          severity: 'P1',
          area: area(level, `Pilar ${pillar}`),
          title: 'Pilar sem aulas no mapa',
          impact: 'O aluno pode avançar com lacuna em um pilar essencial.',
          recommendation: 'Adicionar aulas planejadas ou ready para o pilar.',
        });
        return;
      }

      const orders = lessons.map((lesson) => lesson.order);
      const duplicateOrders = duplicateValues(orders.map(String));
      if (duplicateOrders.length) {
        addIssue(issues, {
          severity: 'P1',
          area: area(level, `Pilar ${pillar}`),
          title: 'Ordens duplicadas no pilar',
          impact: 'A sequência do curso pode ficar ambígua.',
          evidence: duplicateOrders.join(', '),
          recommendation: 'Garantir order único e crescente por pilar.',
        });
      }

      lessons.forEach((lesson, index) => {
        allLessons.push(lesson);
        const expectedOrder = index + 1;
        if (lesson.order !== expectedOrder) {
          addIssue(issues, {
            severity: 'P2',
            area: lessonArea(lesson),
            title: 'Ordem da aula não segue sequência do mapa',
            impact: 'Pode afetar pré-requisitos e progressão visual.',
            evidence: `order=${lesson.order}; esperado=${expectedOrder}`,
            recommendation: 'Revisar ordem do map ou geração das aulas do pilar.',
          });
        }

        if (!lesson.id || !String(lesson.id).startsWith(expectedIdPrefix(lesson))) {
          addIssue(issues, {
            severity: 'P1',
            area: lessonArea(lesson),
            title: 'ID da aula não segue padrão esperado do pilar',
            impact: 'Pode quebrar busca, pré-requisitos, progresso e renderizadores.',
            evidence: `id=${lesson.id}; prefixo esperado=${expectedIdPrefix(lesson)}`,
            recommendation: 'Padronizar IDs como LEVEL-PILLAR-001.',
          });
        }

        if (!lesson.title || clean(lesson.title).length < 6) {
          addIssue(issues, {
            severity: 'P1',
            area: lessonArea(lesson),
            title: 'Aula sem título forte',
            impact: 'A trilha parece inacabada ou genérica.',
            recommendation: 'Adicionar título claro e específico.',
          });
        }

        if (!lesson.objective || clean(lesson.objective).length < 12) {
          addIssue(issues, {
            severity: 'P2',
            area: lessonArea(lesson),
            title: 'Aula sem objetivo pedagógico claro',
            impact: 'Pode dificultar auditoria e orientação do aluno.',
            recommendation: 'Adicionar objetivo observável da aula.',
          });
        }

        const prereqs = Array.isArray(lesson.prerequisites) ? lesson.prerequisites : [];
        if (lesson.order > 1 && prereqs.length === 0) {
          addIssue(issues, {
            severity: 'P2',
            area: lessonArea(lesson),
            title: 'Aula sequencial sem pré-requisito',
            impact: 'Aluno pode acessar conteúdo sem base anterior.',
            recommendation: 'Adicionar pré-requisito da aula anterior do mesmo pilar quando aplicável.',
          });
        }

        if (lesson.status === 'ready') {
          if (!lesson.schemaVersion && !lesson.generationMeta?.source) {
            addIssue(issues, {
              severity: 'P1',
              area: lessonArea(lesson),
              title: 'Aula ready sem marca de schema/source',
              impact: 'Pode ser conteúdo misturado sem contrato claro de renderização.',
              recommendation: 'Garantir schemaVersion ou generationMeta.source no conteúdo ready.',
            });
          }
          if (String(lesson.pillar || lesson.type || '').toLowerCase() !== pillar) {
            addIssue(issues, {
              severity: 'P1',
              area: lessonArea(lesson),
              title: 'Pilar da aula ready diverge do mapa',
              impact: 'Renderizador errado pode ser usado.',
              evidence: `map=${pillar}; lesson=${lesson.pillar || lesson.type}`,
              recommendation: 'Sincronizar pillar/type do conteúdo ready com o mapa.',
            });
          }
        }
      });
    });

    const readyCount = allLessons.filter((lesson) => lesson.level === level && lesson.status === 'ready').length;
    if (Number(entry.readyLessonCount || 0) !== readyCount) {
      addIssue(issues, {
        severity: 'P2',
        area: area(level),
        title: 'readyLessonCount diverge da contagem real',
        impact: 'Indicadores do currículo podem mostrar progresso estrutural errado.',
        evidence: `entry.readyLessonCount=${entry.readyLessonCount}; real=${readyCount}`,
        recommendation: 'Revisar getStaticReadyLessons(level) e composição dos mapas.',
      });
    }
  });

  const ids = allLessons.map((lesson) => lesson.id);
  const duplicateIds = duplicateValues(ids);
  duplicateIds.forEach((id) => {
    addIssue(issues, {
      severity: 'P0',
      area: 'Currículo global',
      title: 'ID duplicado no currículo',
      impact: 'Progresso, conclusão, pré-requisitos e busca de aula podem quebrar.',
      evidence: id,
      recommendation: 'Garantir IDs únicos em todos os níveis e pilares.',
    });
  });

  const idSet = new Set(ids);
  allLessons.forEach((lesson) => {
    const prereqs = Array.isArray(lesson.prerequisites) ? lesson.prerequisites : [];
    prereqs.forEach((prereq) => {
      if (!idSet.has(prereq)) {
        addIssue(issues, {
          severity: 'P1',
          area: lessonArea(lesson),
          title: 'Pré-requisito aponta para aula inexistente',
          impact: 'Gate/progressão pode bloquear ou liberar errado.',
          evidence: prereq,
          recommendation: 'Corrigir ID de pré-requisito ou adicionar aula ausente.',
        });
      }
    });
  });

  return issues;
}

export function auditCefrCoherence(lesson) {
  const issues = [];
  const level = String(lesson?.level || '').toUpperCase();
  const rules = CEFR_SIGNALS[level];
  if (!rules) return issues;
  const text = clean(lesson);

  rules.tooAdvanced.forEach((pattern) => {
    if (pattern.test(text)) {
      addIssue(issues, {
        severity: level === 'A1' || level === 'A2' ? 'P1' : 'P2',
        area: lessonArea(lesson),
        title: 'Sinal de linguagem avançada demais para o nível',
        impact: 'Aluno pode encontrar conteúdo acima do nível CEFR planejado.',
        evidence: `Padrão encontrado: ${pattern}`,
        recommendation: 'Revisar vocabulário, complexidade e scaffolding para o nível.',
      });
    }
  });

  rules.tooBasic.forEach((pattern) => {
    if (pattern.test(text)) {
      addIssue(issues, {
        severity: level === 'C1' || level === 'C2' ? 'P1' : 'P2',
        area: lessonArea(lesson),
        title: 'Sinal de conteúdo básico demais para o nível',
        impact: 'Níveis intermediários/avançados podem parecer rasos ou repetitivos.',
        evidence: `Padrão encontrado: ${pattern}`,
        recommendation: 'Elevar complexidade, autonomia, nuance e produção esperada.',
      });
    }
  });

  return issues;
}

export function summarizeCurriculum(curriculum) {
  const levels = curriculum?.levels || {};
  return LEVELS.map((level) => {
    const entry = levels[level] || {};
    const lessons = PILLARS.flatMap((pillar) => entry.pillars?.[pillar] || []);
    return {
      level,
      planned: Number(entry.plannedLessonCount || lessons.length || 0),
      mapped: lessons.length,
      ready: lessons.filter((lesson) => lesson.status === 'ready').length,
      pillars: Object.fromEntries(PILLARS.map((pillar) => [pillar, (entry.pillars?.[pillar] || []).length])),
    };
  });
}
