import { AlertCircle, Clock3, Loader2, RefreshCw, Sparkles } from 'lucide-react';
import { useMemo, useState } from 'react';
import { buildCurriculumPrompt, getCurriculumSummary, setActiveCurriculumLesson } from '../../services/curriculumPlan.js';
import { diagnostics } from '../../services/diagnostics.js';
import { generateLessonDraft } from '../../services/geminiLessons.js';
import { getLessonKeysStatus, getLessonFlashKeys, getLessonProKey } from '../../services/lessonKeys.js';
import { getCurrentLessonRaw, getLastGenerationStatus, saveCurrentLesson } from '../../services/lessonStore.js';
import { repairLessonForQuality } from '../../services/lessonRepair.js';
import { attachPedagogicalReview, validateLessonForQuality } from '../../services/lessonValidation.js';
import { buildSaturdayReviewLesson, shouldPrioritizeSaturdayReview } from '../../services/masteryStore.js';

function formatDateTime(value) {
  if (!value) return '';
  try {
    return new Date(value).toLocaleString('pt-BR', { day: '2-digit', month: '2-digit', hour: '2-digit', minute: '2-digit' });
  } catch {
    return String(value).slice(0, 16);
  }
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
    setMessage(saturdayReview ? 'Gerando revisão adaptativa de sábado dos 4 pilares...' : forceNew ? 'Substituindo aula atual e gerando uma nova...' : 'Gerando a próxima aula do cronograma... acompanhe o diagnóstico.');
    diagnostics.log(saturdayReview ? 'Botão Gerar revisão adaptativa de sábado acionado.' : forceNew ? 'Botão Gerar nova aula com substituição acionado.' : 'Botão Gerar próxima aula do cronograma acionado.', 'info');

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

      const result = await generateLessonDraft({ prompt, keys: flashKeys, proKey });

      if (result.status !== 'success' || !result.lesson) {
        setMessage(result.error || 'Não foi possível gerar a aula.');
        return;
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

      diagnostics.log(`Aula aprovada na avaliação pedagógica: ${pedagogicalReview.overallScore}/100.`, 'info', pedagogicalReview);

      const saved = saveCurrentLesson(attachPedagogicalReview(lessonForSave, pedagogicalReview), {
        source: forceNew ? 'generated-replacement' : 'generated',
        status: 'new',
        contractVersion: 'lesson-contract-v1',
        pedagogicalScore: pedagogicalReview.overallScore,
        autoRepaired,
      });
      diagnostics.log(`${saturdayReview ? 'Revisão adaptativa' : 'Aula do cronograma'} pronta para abrir: ${saved.title}`, 'info');
      const repairLabel = autoRepaired ? ' corrigida automaticamente,' : '';
      setMessage(saturdayReview ? `Nova revisão${repairLabel} validada (${pedagogicalReview.overallScore}/100), salva e aberta na aba Aula.` : `Nova aula${repairLabel} validada (${pedagogicalReview.overallScore}/100), salva e aberta na aba Aula.`);
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
          <span>Substituir aula atual e gerar uma nova de verdade</span>
        </label>
      ) : null}

      <div className="generation-status-box"><div><span>Flash/free</span><strong>{keyStatus.flashCount}/{keyStatus.maxFlashKeys}</strong></div><div><span>Pro fallback</span><strong>{keyStatus.proMasked || 'não configurada'}</strong></div></div>

      {!keyStatus.hasAnyKey ? (<div className="inline-warning"><AlertCircle size={16} /><span>Adicione uma key em Ajustes &gt; Chaves de aulas antes de gerar.</span></div>) : null}

      <button type="button" className="primary-button" onClick={handleGenerate} disabled={loading}>
        {loading ? <Loader2 size={16} className="spin" /> : <Sparkles size={16} />}
        {loading ? 'Gerando aula...' : saturdayReview ? 'Gerar revisão de sábado' : pendingSameLesson && !forceNew ? 'Manter aula atual' : 'Gerar nova aula'}
      </button>

      {message ? <p className="generator-message">{message}</p> : null}
    </section>
  );
}
