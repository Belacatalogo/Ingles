import { AlertCircle, Loader2, Sparkles } from 'lucide-react';
import { useMemo, useState } from 'react';
import { buildCurriculumPrompt, getCurriculumSummary, setActiveCurriculumLesson } from '../../services/curriculumPlan.js';
import { diagnostics } from '../../services/diagnostics.js';
import { generateLessonDraft } from '../../services/geminiLessons.js';
import { getLessonKeysStatus, getLessonFlashKeys, getLessonProKey } from '../../services/lessonKeys.js';
import { saveCurrentLesson } from '../../services/lessonStore.js';
import { attachPedagogicalReview, validateLessonForQuality } from '../../services/lessonValidation.js';
import { buildSaturdayReviewLesson, shouldPrioritizeSaturdayReview } from '../../services/masteryStore.js';

export function LessonGeneratorPanel({ onGenerated }) {
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');
  const [version, setVersion] = useState(0);
  const keyStatus = useMemo(() => getLessonKeysStatus(), [version]);
  const curriculum = useMemo(() => getCurriculumSummary(), [version]);
  const saturdayReview = useMemo(() => shouldPrioritizeSaturdayReview() ? buildSaturdayReviewLesson() : null, [version]);
  const nextLesson = saturdayReview || curriculum.nextLesson;

  async function handleGenerate() {
    setVersion((value) => value + 1);
    setLoading(true);
    setMessage(saturdayReview ? 'Gerando revisão adaptativa de sábado dos 4 pilares...' : 'Gerando a próxima aula do cronograma... acompanhe o diagnóstico.');
    diagnostics.log(saturdayReview ? 'Botão Gerar revisão adaptativa de sábado acionado.' : 'Botão Gerar próxima aula do cronograma acionado.', 'info');

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

      if (!saturdayReview) {
        setActiveCurriculumLesson(nextLesson.id);
      }
      const prompt = nextLesson.promptOverride || buildCurriculumPrompt(nextLesson);

      const result = await generateLessonDraft({
        prompt,
        keys: flashKeys,
        proKey,
      });

      if (result.status !== 'success' || !result.lesson) {
        setMessage(result.error || 'Não foi possível gerar a aula.');
        return;
      }

      const lessonToValidate = {
        ...result.lesson,
        id: nextLesson.id,
        curriculumId: nextLesson.id,
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

      const pedagogicalReview = validateLessonForQuality(lessonToValidate, {
        expectedLevel: nextLesson.level,
        expectedType: lessonToValidate.type,
      });

      if (!pedagogicalReview.approved) {
        const issueText = pedagogicalReview.issues.length ? ` Problemas: ${pedagogicalReview.issues.join(' ')}` : '';
        const error = `Aula reprovada na avaliação pedagógica (${pedagogicalReview.overallScore}/100). Gere novamente ou reduza o escopo.${issueText}`;
        diagnostics.setPhase('aula reprovada na avaliação pedagógica', 'error');
        diagnostics.log(error, 'error', pedagogicalReview);
        setMessage(error);
        return;
      }

      diagnostics.log(`Aula aprovada na avaliação pedagógica: ${pedagogicalReview.overallScore}/100.`, 'info', pedagogicalReview);

      const saved = saveCurrentLesson(attachPedagogicalReview(lessonToValidate, pedagogicalReview));
      diagnostics.log(`${saturdayReview ? 'Revisão adaptativa' : 'Aula do cronograma'} pronta para abrir: ${saved.title}`, 'info');
      setMessage(saturdayReview ? `Revisão validada (${pedagogicalReview.overallScore}/100), salva e aberta na aba Aula.` : `Aula validada (${pedagogicalReview.overallScore}/100), salva e aberta na aba Aula.`);
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

      <div className="generation-status-box">
        <div>
          <span>Nível atual</span>
          <strong>{curriculum.currentLevel}</strong>
        </div>
        <div>
          <span>Progresso do nível</span>
          <strong>{curriculum.completedInLevel}/{curriculum.levelTotal}</strong>
        </div>
      </div>

      {nextLesson ? (
        <div className="inline-warning curriculum-next-box">
          <Sparkles size={16} />
          <span>
            {saturdayReview ? 'Sábado: ' : 'Próxima: '}<b>{nextLesson.level}</b> · {nextLesson.type} · {nextLesson.title}
          </span>
        </div>
      ) : null}

      <div className="generation-status-box">
        <div>
          <span>Flash/free</span>
          <strong>{keyStatus.flashCount}/{keyStatus.maxFlashKeys}</strong>
        </div>
        <div>
          <span>Pro fallback</span>
          <strong>{keyStatus.proMasked || 'não configurada'}</strong>
        </div>
      </div>

      {!keyStatus.hasAnyKey ? (
        <div className="inline-warning">
          <AlertCircle size={16} />
          <span>Adicione uma key em Ajustes &gt; Chaves de aulas antes de gerar.</span>
        </div>
      ) : null}

      <button type="button" className="primary-button" onClick={handleGenerate} disabled={loading}>
        {loading ? <Loader2 size={16} className="spin" /> : <Sparkles size={16} />}
        {loading ? 'Gerando aula...' : saturdayReview ? 'Gerar revisão de sábado' : 'Gerar próxima aula'}
      </button>

      {message ? <p className="generator-message">{message}</p> : null}
    </section>
  );
}
