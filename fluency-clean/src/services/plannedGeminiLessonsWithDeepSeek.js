import { diagnostics } from './diagnostics.js';
import { generatePlannedLessonDraft as generateBasePlannedLessonDraft } from './plannedGeminiLessons.js';
import { repairReadingExercisesWithDeepSeek } from './deepSeekReadingRepair.js';

export async function generatePlannedLessonDraft(options = {}) {
  const result = await generateBasePlannedLessonDraft(options);
  if (result?.status !== 'success' || !result.lesson) return result;
  if (String(result.lesson.type || '').toLowerCase() !== 'reading') return result;

  try {
    const repair = await repairReadingExercisesWithDeepSeek(result.lesson, { fetcher: options.fetcher });
    if (repair?.applied && repair.lesson) {
      diagnostics.log('Aula Reading recebeu reparo DeepSeek antes da validação final da tela.', 'success', repair.lesson.readingExerciseRepair);
      return { ...result, lesson: repair.lesson, deepSeekReadingRepair: true };
    }
    diagnostics.log(`DeepSeek Reading Repair não aplicado: ${repair?.reason || 'indisponível'}.`, 'info', repair);
    return result;
  } catch (error) {
    diagnostics.log(`DeepSeek Reading Repair falhou e a aula original foi mantida: ${error?.message || error}`, 'warn');
    return result;
  }
}
