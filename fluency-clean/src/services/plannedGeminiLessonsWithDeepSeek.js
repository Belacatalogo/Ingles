import { diagnostics } from './diagnostics.js';
import { generatePlannedLessonDraft as generateBasePlannedLessonDraft } from './plannedGeminiLessons.js';
import { generateResilientLessonDraft } from './resilientGeminiLessonDraft.js';
import { repairReadingExercisesWithDeepSeek } from './deepSeekReadingRepair.js';
import { repairGrammarWithDeepSeek } from './deepSeekGrammarRepair.js';
import { inferLessonTypeFromText, normalizeLessonType } from './lessonTypes.js';

function resolveLessonType(options = {}) {
  const forced = normalizeLessonType(options.forcedType || '');
  if (forced && forced !== 'default') return forced;
  return inferLessonTypeFromText(options.prompt || '');
}

async function repairWithDeepSeekIfAvailable(result, options = {}) {
  if (result?.status !== 'success' || !result.lesson) return result;
  const type = String(result.lesson.type || '').toLowerCase();

  if (type === 'reading') {
    try {
      const repair = await repairReadingExercisesWithDeepSeek(result.lesson, { fetcher: options.fetcher });
      if (repair?.applied && repair.lesson) {
        diagnostics.log('Aula Reading recebeu reparo DeepSeek antes da validação final da tela.', 'success', repair.lesson.readingExerciseRepair);
        return { ...result, lesson: repair.lesson, deepSeekReadingRepair: true };
      }
      diagnostics.log(`DeepSeek Reading Repair não aplicado: ${repair?.reason || 'indisponível'}.`, 'info', repair);
    } catch (error) {
      diagnostics.log(`DeepSeek Reading Repair falhou e a aula original foi mantida: ${error?.message || error}`, 'warn');
    }
  }

  if (type === 'grammar') {
    try {
      const repair = await repairGrammarWithDeepSeek(result.lesson, { fetcher: options.fetcher });
      if (repair?.applied && repair.lesson) {
        diagnostics.log('Aula Grammar recebeu reparo DeepSeek antes da validação final.', 'success', repair.lesson.grammarRepair);
        return { ...result, lesson: repair.lesson, deepSeekGrammarRepair: true };
      }
      diagnostics.log(`DeepSeek Grammar Repair não aplicado: ${repair?.reason || 'indisponível'}.`, 'info', repair);
    } catch (error) {
      diagnostics.log(`DeepSeek Grammar Repair falhou e a aula original foi mantida: ${error?.message || error}`, 'warn');
    }
  }

  return result;
}

export async function generatePlannedLessonDraft(options = {}) {
  const lessonType = resolveLessonType(options);

  if (lessonType === 'grammar') {
    diagnostics.setPhase('Grammar resiliente direta', 'generating');
    diagnostics.log('Grammar está usando fluxo resiliente direto para evitar quebra no bloco 1/4 por JSON escapado do Gemini.', 'warn');
    const result = await generateResilientLessonDraft({
      ...options,
      forcedType: 'grammar',
      level: options.level || 'A1',
    });
    return repairWithDeepSeekIfAvailable(result, options);
  }

  const result = await generateBasePlannedLessonDraft(options);
  return repairWithDeepSeekIfAvailable(result, options);
}
