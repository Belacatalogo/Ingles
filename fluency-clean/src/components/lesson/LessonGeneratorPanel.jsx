import { AlertCircle, Clock3, Loader2, RefreshCw, Sparkles } from 'lucide-react';
import { useMemo, useState } from 'react';
import { buildCurriculumPrompt, getCurriculumSummary, setActiveCurriculumLesson } from '../../services/curriculumPlan.js';
import { diagnostics } from '../../services/diagnostics.js';
import { generatePlannedLessonDraft } from '../../services/plannedGeminiLessons.js';
import { generateResilientLessonDraft } from '../../services/resilientGeminiLessonDraft.js';
import { getLessonKeysStatus, getLessonFlashKeys, getLessonProKey } from '../../services/lessonKeys.js';
import { getCurrentLessonRaw, getLastGenerationStatus, saveCurrentLesson } from '../../services/lessonStore.js';
import { repairLessonForQuality } from '../../services/lessonRepair.js';
import { attachPedagogicalReview, validateLessonForQuality } from '../../services/lessonValidation.js';
import { attachTeacherReview, reviewLessonAsTeacher } from '../../services/teacherReviewer.js';
import { needsAntiFalseDomainRepair, repairLessonAgainstFalseDomain } from '../../services/antiFalseDomainRepair.js';
import { repairListeningCoherence, validateListeningCoherence } from '../../services/listeningCoherence.js';
import { attachStudyReadiness, evaluateStudyReadiness } from '../../services/studyReadiness.js';
import { buildSaturdayReviewLesson, shouldPrioritizeSaturdayReview } from '../../services/masteryStore.js';

function formatDateTime(value) {
  if (!value) return '';
  try {
    return new Date(value).toLocaleString('pt-BR', { day: '2-digit', month: '2-digit', hour: '2-digit', minute: '2-digit' });
  } catch {
    return String(value).slice(0, 16);
  }
}

function shouldUseResilientFallback(result) {
  const text = String(result?.error || '');
  return /JSON Parse error|Unrecognized token|Expected ']"|Expected ']'|JSON resiliente|\\"type\\"|Preview: \{\\"/i.test(text);
}

export function LessonGeneratorPanel({ onGenerated }) {
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');
  const [forceNew, setForceNew] = useState(false);
  const [version, setVersion] = useState(0);
  const keyStatus = useMemo(() => getLessonKeysStatus(), [version]);
  const curriculum = useMemo(() => getCurriculumSummary(), [version]);
  const saturdayReview = useMemo(() => shouldPrioritizeSaturdayReview() ? buildSaturdayReviewLesson() : null, [version]);
  const currentLesson = useMemo(() => getCurrentLessonRaw(), [version]);
  const lastGeneration = useMemo(() => getLastGenerationStatus(), [version]);
  const nextLesson = saturdayReview || curriculum.nextLesson;
  const currentMeta = currentLesson?.generationMeta || null;
  const pendingSameLesson = Boolean(currentLesson?.id && nextLesson?.id && currentLesson.id === nextLesson.id);

  async function handleGenerate() {
    setVersion((value) => value + 1);

    if (pendingSameLesson && !forceNew) {
      const msg = 'Existe uma aula atual pendente para esta etapa. Ative “Substituir aula atual” para gerar uma nova de verdade.';
      diagnostics.log(msg, 'warn');
      setMessage(msg);
      return;
    }

    setLoading(true);
    setMessage(saturdayReview ? 'Planejando e gerando revisão adaptativa de sábado...' : forceNew ? 'Planejando substituição da aula atual e gerando versão diferente...' : 'Planejando a próxima aula antes de gerar... acompanhe o diagnóstico.');
    diagnostics.log(saturdayReview ? 'Botão Gerar revisão adaptativa de sábado acionado.' : forceNew ? 'Botão Gerar nova aula com substituição e variação acionado.' : 'Botão Gerar próxima aula do cronograma acionado.', 'info');

    try {
      const flashKeys = getLessonFlashKeys();
      const proKey = getLessonProKey();

      if (!flashKeys.length && !proKey) {
        const error = 'Adicione pelo menos uma key em Ajustes > Chaves de aulas antes de gerar.';
        diagnostics.log(error, 'error');
        setMessage(error);
        return;
      }

      if (!nextLesson) {
        setMessage('Cronograma concluído. Todas as aulas planejadas foram vistas.');
        return;
      }

      if (!saturdayReview) setActiveCurriculumLesson(nextLesson.id);
      const prompt = nextLesson.promptOverride || buildCurriculumPrompt(nextLesson);
      const forcedType = nextLesson.type === 'review' ? '' : nextLesson.type;

      let result = await generatePlannedLessonDraft({ prompt, keys: flashKeys, proKey, previousLesson: forceNew ? currentLesson : null, forceVariation: forceNew, forcedType, level: nextLesson.level || 'A1' });

      if (result.status !== 'success' || !result.lesson) {
        if (shouldUseResilientFallback(result)) {
          diagnostics.setPhase('ativando parser resiliente', 'generating');
          diagnostics.log('Erro de JSON escapado detectado. Tentando fallback resiliente antes de falhar a aula.', 'warn', result);
          setMessage('O Gemini devolveu JSON escapado. Ativando parser resiliente para salvar a aula...');
          result = await generateResilientLessonDraft({ prompt, keys: flashKeys, proKey, forcedType, level: nextLesson.level || 'A1' });
        }

        if (result.status !== 'success' || !result.lesson) {
          setMessage(result.error || 'Não foi possível gerar a aula.');
          return;
        }
      }

      const lessonToValidate = {
        ...result.lesson,
        id: nextLesson.id,
        curriculumId: nextLesson.id,
        curriculumTitle: nextLesson.title,
        expectedTitle: nextLesson.title,
        type: nextLesson.type === 'review' ? result.lesson.type || 'reading' : nextLesson.type,
        level: nextLesson.level,
        unitTitle: nextLesson.unitTitle,
        prerequisites: nextLesson.prerequisites,
        category: nextLesson.category,
        checkpoint: nextLesson.checkpoint,
        pillars: nextLesson.pillars,
        weakPillars: nextLesson.weakPillars,
        weakTopics: nextLesson.weakTopics,
      };

      diagnostics.setPhase('avaliando qualidade pedagógica', 'generating');
      diagnostics.log('Avaliação pedagógica iniciada antes de salvar a aula.', 'info');

      let pedagogicalReview = validateLessonForQuality(lessonToValidate, { expectedLevel: nextLesson.level, expectedType: lessonToValidate.type });
      let lessonForSave = lessonToValidate;
      let autoRepaired = false;
      let antiFalseDomainRepaired = false;
      let listeningCoherenceRepaired = false;

      if (!pedagogicalReview.approved) {
        diagnostics.setPhase('corrigindo aula automaticamente', 'generating');
        diagnostics.log(`Aula reprovada (${pedagogicalReview.overallScore}/100). Tentando correção automática local antes de descartar.`, 'warn', pedagogicalReview);
        setMessage(`Aula ficou fraca (${pedagogicalReview.overallScore}/100). Tentando correção automática antes de salvar...`);

        const repairedLesson = repairLessonForQuality(lessonToValidate, { expectedLevel: nextLesson.level, expectedType: lessonToValidate.type, expectedTitle: nextLesson.title, review: pedagogicalReview });
        const repairedReview = validateLessonForQuality(repairedLesson, { expectedLevel: nextLesson.level, expectedType: lessonToValidate.type });

        if (repairedReview.approved) {
          autoRepaired = true;
          lessonForSave = repairedLesson;
          pedagogicalReview = { ...repairedReview, autoRepaired: true, previousScore: pedagogicalReview.overallScore, previousIssues: pedagogicalReview.issues };
          diagnostics.log(`Correção automática aprovada: ${repairedReview.overallScore}/100.`, 'success', pedagogicalReview);
        } else {
          const issueText = repairedReview.issues.length ? ` Problemas: ${repairedReview.issues.join(' ')}` : '';
          const error = `Aula reprovada mesmo após correção automática (${repairedReview.overallScore}/100). Gere novamente ou reduza o escopo.${issueText}`;
          diagnostics.setPhase('aula reprovada após correção automática', 'error');
          diagnostics.log(error, 'error', repairedReview);
          setMessage(error);
          return;
        }
      }

      const listeningCoherence = validateListeningCoherence(lessonForSave);
      if (!listeningCoherence.approved) {
        diagnostics.setPhase('checando coerência do listening', 'generating');
        diagnostics.log('Listening desalinhado: transcrição, vocabulário ou questões não batem. Tentando reparo local.', 'warn', listeningCoherence);
        setMessage('Listening veio com texto, vocabulário ou questões desalinhados. Tentando reparar antes de salvar...');
        const repairedListening = repairListeningCoherence(lessonForSave);
        const repairedCoherence = validateListeningCoherence(repairedListening);
        if (!repairedCoherence.approved) {
          const error = `Aula bloqueada: Listening incoerente. ${repairedCoherence.issues.join(' ')}`;
          diagnostics.setPhase('listening bloqueado por incoerência', 'error');
          diagnostics.log(error, 'error', repairedCoherence);
          setMessage(error);
          return;
        }
        lessonForSave = repairedListening;
        listeningCoherenceRepaired = true;
        autoRepaired = true;
        pedagogicalReview = validateLessonForQuality(lessonForSave, { expectedLevel: nextLesson.level, expectedType: lessonForSave.type });
        diagnostics.log('Coerência do Listening reparada e aprovada antes de salvar.', 'success', repairedCoherence);
      }

      diagnostics.log(`Aula aprovada na avaliação pedagógica: ${pedagogicalReview.overallScore}/100.`, 'info', pedagogicalReview);

      diagnostics.setPhase('professor revisor avaliando aula', 'generating');
      let teacherReview = reviewLessonAsTeacher(lessonForSave, { expectedLevel: nextLesson.level, expectedType: lessonForSave.type, baseReview: pedagogicalReview });
      diagnostics.log(`Professor revisor avaliou a aula: ${teacherReview.finalScore}/100.`, teacherReview.approved ? 'success' : 'warn', teacherReview);

      if (needsAntiFalseDomainRepair(lessonForSave, teacherReview)) {
        diagnostics.setPhase('reparando falso domínio', 'generating');
        diagnostics.log('Risco de falso domínio detectado. Adicionando produção ativa antes de salvar.', 'warn', teacherReview);
        setMessage('Professor detectou risco de falso domínio. Adicionando produção ativa antes de salvar...');

        const antiFalseDomainLesson = repairLessonAgainstFalseDomain(lessonForSave, {
          expectedLevel: nextLesson.level,
          expectedType: lessonForSave.type,
          teacherReview,
        });
        const antiFalseDomainPedagogicalReview = validateLessonForQuality(antiFalseDomainLesson, { expectedLevel: nextLesson.level, expectedType: lessonForSave.type });
        const antiFalseDomainTeacherReview = reviewLessonAsTeacher(antiFalseDomainLesson, { expectedLevel: nextLesson.level, expectedType: lessonForSave.type, baseReview: antiFalseDomainPedagogicalReview });

        lessonForSave = antiFalseDomainLesson;
        pedagogicalReview = {
          ...antiFalseDomainPedagogicalReview,
          autoRepaired: true,
          antiFalseDomainRepair: true,
          previousScore: pedagogicalReview.overallScore,
          previousIssues: pedagogicalReview.issues,
        };
        teacherReview = {
          ...antiFalseDomainTeacherReview,
          issues: antiFalseDomainTeacherReview.issues.filter((issue) => !/falso domínio|falso dominio|pouca produção|pouca producao|excesso de reconhecimento/i.test(issue)),
          antiFalseDomainRepaired: true,
          previousAntiIllusion: teacherReview.antiIllusion,
          previousIssues: teacherReview.issues,
        };
        antiFalseDomainRepaired = true;
        autoRepaired = true;
        diagnostics.log(`Reparo anti falso domínio aplicado. Professor reavaliou: ${teacherReview.finalScore}/100.`, 'success', teacherReview);
      }

      if (!teacherReview.approved) {
        diagnostics.setPhase('professor revisor pediu reparo', 'generating');
        setMessage(`Professor revisor pediu reparo (${teacherReview.finalScore}/100). Ajustando antes de salvar...`);
        const repairedByTeacher = repairLessonForQuality(lessonForSave, { expectedLevel: nextLesson.level, expectedType: lessonForSave.type, expectedTitle: nextLesson.title, review: { ...pedagogicalReview, issues: [...(pedagogicalReview.issues || []), ...(teacherReview.issues || [])] } });
        const repairedPedagogicalReview = validateLessonForQuality(repairedByTeacher, { expectedLevel: nextLesson.level, expectedType: lessonForSave.type });
        const repairedTeacherReview = reviewLessonAsTeacher(repairedByTeacher, { expectedLevel: nextLesson.level, expectedType: lessonForSave.type, baseReview: repairedPedagogicalReview });

        if (!repairedTeacherReview.approved) {
          const error = `Aula reprovada pelo professor revisor (${repairedTeacherReview.finalScore}/100). ${repairedTeacherReview.issues.join(' ')}`;
          diagnostics.setPhase('aula reprovada pelo professor revisor', 'error');
          diagnostics.log(error, 'error', repairedTeacherReview);
          setMessage(error);
          return;
        }

        autoRepaired = true;
        lessonForSave = repairedByTeacher;
        pedagogicalReview = { ...repairedPedagogicalReview, autoRepaired: true, teacherRepair: true };
        teacherReview = repairedTeacherReview;
        diagnostics.log(`Professor revisor aprovou após reparo: ${teacherReview.finalScore}/100.`, 'success', teacherReview);
      }

      let studyReadiness = evaluateStudyReadiness(lessonForSave, { teacherReview, pedagogicalReview });
      if (studyReadiness.status === 'do-not-study') {
        diagnostics.setPhase('trava de estudo pediu reparo', 'generating');
        diagnostics.log(`Trava de confiança bloqueou a aula: ${studyReadiness.message}`, 'warn', studyReadiness);
        setMessage('A aula ainda não vale seu tempo. Tentando reparo de confiança antes de salvar...');
        const readinessRepairedLesson = repairLessonForQuality(lessonForSave, { expectedLevel: nextLesson.level, expectedType: lessonForSave.type, expectedTitle: nextLesson.title, review: { ...pedagogicalReview, issues: [...(pedagogicalReview.issues || []), ...(teacherReview.issues || []), ...(studyReadiness.missing || []), ...(studyReadiness.criticalIssues || [])] } });
        const readinessReview = validateLessonForQuality(readinessRepairedLesson, { expectedLevel: nextLesson.level, expectedType: lessonForSave.type });
        const readinessTeacherReview = reviewLessonAsTeacher(readinessRepairedLesson, { expectedLevel: nextLesson.level, expectedType: lessonForSave.type, baseReview: readinessReview });
        const readinessCheck = evaluateStudyReadiness(readinessRepairedLesson, { teacherReview: readinessTeacherReview, pedagogicalReview: readinessReview });

        if (readinessCheck.status === 'do-not-study') {
          const error = `Aula bloqueada: ${readinessCheck.message} ${[...(readinessCheck.missing || []), ...(readinessCheck.criticalIssues || [])].join(' ')}`;
          diagnostics.setPhase('aula bloqueada por confiança de estudo', 'error');
          diagnostics.log(error, 'error', readinessCheck);
          setMessage(error);
          return;
        }

        autoRepaired = true;
        lessonForSave = readinessRepairedLesson;
        pedagogicalReview = { ...readinessReview, autoRepaired: true, studyReadinessRepair: true };
        teacherReview = readinessTeacherReview;
        studyReadiness = readinessCheck;
        diagnostics.log(`Trava de confiança liberou após reparo: ${studyReadiness.label}.`, 'success', studyReadiness);
      } else {
        diagnostics.log(`Trava de confiança liberou a aula: ${studyReadiness.label}.`, 'success', studyReadiness);
      }

      const reviewedLesson = attachStudyReadiness(attachTeacherReview(attachPedagogicalReview(lessonForSave, pedagogicalReview), teacherReview), studyReadiness);

      const saved = saveCurrentLesson(reviewedLesson, {
        source: forceNew ? 'generated-replacement-variation' : result.lesson.planContract === 'resilient-json-v1' ? 'generated-resilient-json' : 'generated',
        status: 'new',
        contractVersion: result.lesson.planContract ? `lesson-contract-v1+${result.lesson.planContract}+teacher-reviewer-v1+study-readiness-v1${listeningCoherenceRepaired ? '+listening-coherence-v1' : ''}${antiFalseDomainRepaired ? '+anti-false-domain-v1' : ''}` : `lesson-contract-v1+teacher-reviewer-v1+study-readiness-v1${listeningCoherenceRepaired ? '+listening-coherence-v1' : ''}${antiFalseDomainRepaired ? '+anti-false-domain-v1' : ''}`,
        pedagogicalScore: teacherReview.finalScore,
        autoRepaired,
        antiFalseDomainRepaired,
        listeningCoherenceRepaired,
        studyReady: studyReadiness.status !== 'do-not-study',
        studyReadiness: studyReadiness.status,
        variationMode: forceNew,
        generationSeed: result.lesson.generationSeed,
        planSeed: result.lesson.planSeed,
      });
      diagnostics.log(`${saturdayReview ? 'Revisão adaptativa planejada' : forceNew ? 'Nova versão planejada da aula do cronograma' : 'Aula planejada do cronograma'} pronta para abrir: ${saved.title}`, 'info');
      const repairLabel = listeningCoherenceRepaired ? ' com coerência de Listening reparada,' : antiFalseDomainRepaired ? ' com produção ativa anti falso domínio,' : autoRepaired ? ' corrigida automaticamente,' : '';
      setMessage(saturdayReview ? `Nova revisão planejada${repairLabel} ${studyReadiness.label.toLowerCase()} (${teacherReview.finalScore}/100), salva e aberta na aba Aula.` : forceNew ? `Nova versão planejada${repairLabel} ${studyReadiness.label.toLowerCase()} (${teacherReview.finalScore}/100), salva e aberta na aba Aula.` : `Nova aula planejada${repairLabel} ${studyReadiness.label.toLowerCase()} (${teacherReview.finalScore}/100), salva e aberta na aba Aula.`);
      setForceNew(false);
      onGenerated?.(saved);
    } catch (error) {
      diagnostics.log(`Erro inesperado ao gerar aula do cronograma: ${error?.message || error}`, 'error');
      setMessage(error?.message || 'Erro inesperado ao gerar aula.');
    } finally {
      setLoading(false);
      setVersion((value) => value + 1);
    }
  }

  return (
    <section className="lesson-generator-panel">
      <div className="panel-title"><Sparkles size={18} /> {saturdayReview ? 'Revisão adaptativa de sábado' : 'Próxima aula do cronograma'}</div>
      <p>{saturdayReview ? 'Hoje é sábado e há pontos fracos registrados. O Fluency vai revisar gramática, escrita, leitura e escuta antes de continuar a trilha.' : 'Você não precisa escolher o conteúdo. O Fluency segue uma trilha A1 → C2 em ordem, com pré-requisitos e revisão antes de avançar.'}</p>

      {currentLesson ? (
        <div className="generation-current-box">
          <Clock3 size={16} />
          <span>
            Aula atual: <b>{currentLesson.title}</b>
            {currentMeta?.generatedAt ? <small>Gerada/salva em {formatDateTime(currentMeta.generatedAt)} · {currentMeta.contractVersion || 'sem contrato antigo'} · qualidade {currentMeta.pedagogicalScore || currentLesson?.quality?.pedagogicalScore || 0}/100</small> : <small>Aula carregada do histórico antigo, sem metadados de geração.</small>}
          </span>
        </div>
      ) : null}

      {lastGeneration ? (
        <div className="generation-current-box soft">
          <RefreshCw size={16} />
          <span>Último status: <b>{lastGeneration.message || lastGeneration.event}</b><small>{formatDateTime(lastGeneration.createdAt)} · {lastGeneration.contractVersion || 'sem contrato'}</small></span>
        </div>
      ) : null}

      <div className="generation-status-box"><div><span>Nível atual</span><strong>{curriculum.currentLevel}</strong></div><div><span>Progresso do nível</span><strong>{curriculum.completedInLevel}/{curriculum.levelTotal}</strong></div></div>

      {nextLesson ? (<div className="inline-warning curriculum-next-box"><Sparkles size={16} /><span>{saturdayReview ? 'Sábado: ' : 'Próxima: '}<b>{nextLesson.level}</b> · {nextLesson.type} · {nextLesson.title}</span></div>) : null}

      {pendingSameLesson ? (
        <label className="generation-replace-toggle">
          <input type="checkbox" checked={forceNew} onChange={(event) => setForceNew(event.target.checked)} />
          <span>Substituir aula atual e gerar uma versão diferente</span>
        </label>
      ) : null}

      <div className="generation-status-box"><div><span>Flash/free</span><strong>{keyStatus.flashCount}/{keyStatus.maxFlashKeys}</strong></div><div><span>Pro fallback</span><strong>{keyStatus.proMasked || 'não configurada'}</strong></div></div>

      {!keyStatus.hasAnyKey ? (<div className="inline-warning"><AlertCircle size={16} /><span>Adicione uma key em Ajustes &gt; Chaves de aulas antes de gerar.</span></div>) : null}

      <button type="button" className="primary-button" onClick={handleGenerate} disabled={loading}>
        {loading ? <Loader2 size={16} className="spin" /> : <Sparkles size={16} />}
        {loading ? 'Gerando aula...' : saturdayReview ? 'Gerar revisão de sábado' : pendingSameLesson && !forceNew ? 'Manter aula atual' : forceNew ? 'Gerar versão diferente' : 'Gerar nova aula'}
      </button>

      {message ? <p className="generator-message">{message}</p> : null}
    </section>
  );
}
