import { CheckCircle2, RotateCcw } from 'lucide-react';

export function PracticeDone({ reviewMode, correctCount, total, lives, onRestart, onFinish }) {
  return (
    <main className="practice-done">
      <div className="practice-done-medal"><CheckCircle2 size={52} /></div>
      <p className="practice-kind">{reviewMode ? 'Revisão recomendada' : 'Sessão finalizada'}</p>
      <h1>{reviewMode ? 'Você concluiu revisando' : 'Prática concluída'}</h1>
      <p>{reviewMode ? `Você acertou ${correctCount} de ${total}. Refaça a prática para fortalecer os pontos fracos.` : `Você acertou ${correctCount} de ${total} e terminou com ${lives} vida(s). Continue assim.`}</p>
      <button type="button" onClick={onRestart}><RotateCcw size={18} /> Refazer prática</button>
      <button type="button" className="primary" onClick={onFinish}>Voltar para aula</button>
    </main>
  );
}
