import { BookOpen, CheckCircle2, Headphones, PencilLine } from 'lucide-react';
import { Card } from '../components/ui/Card.jsx';

const paragraphs = [
  'Every morning, Ana opens her notebook and writes three simple goals for the day. She likes short tasks because they help her feel focused and calm.',
  'After breakfast, she reads a small text in English. She does not understand every word, but she marks the new words and tries to guess the meaning from context.',
];

const tasks = [
  'Identifique a ideia principal do texto.',
  'Marque três palavras novas.',
  'Responda em inglês: What does Ana do after breakfast?',
];

export function ReadingLesson({ lesson }) {
  return (
    <article className="reading-layout">
      <Card eyebrow={`Reading · ${lesson.level}`} title={lesson.title}>
        <p>
          Layout novo de Reading: sério, elegante, dividido em leitura, vocabulário, compreensão e resposta guiada.
          Esta versão não se sobrepõe à aula antiga; ela substitui a renderização quando `lesson.type === reading`.
        </p>
      </Card>

      <section className="reading-grid">
        <div className="reading-text-panel">
          <div className="panel-title"><BookOpen size={18} /> Texto principal</div>
          {paragraphs.map((paragraph, index) => (
            <p key={index}>{paragraph}</p>
          ))}
        </div>

        <aside className="reading-side-panel">
          <div className="mini-card">
            <div className="panel-title"><Headphones size={18} /> Escuta</div>
            <p>Botão de áudio/TTS será migrado no bloco de áudio.</p>
          </div>
          <div className="mini-card">
            <div className="panel-title"><PencilLine size={18} /> Tarefas</div>
            <ul>
              {tasks.map((task) => <li key={task}>{task}</li>)}
            </ul>
          </div>
        </aside>
      </section>

      <section className="answer-card">
        <div className="panel-title"><CheckCircle2 size={18} /> Resposta do aluno</div>
        <textarea placeholder="Digite sua resposta aqui..." />
        <button type="button" className="primary-button">Salvar resposta</button>
      </section>
    </article>
  );
}
