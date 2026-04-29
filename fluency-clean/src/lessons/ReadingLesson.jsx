import { BookOpen, CheckCircle2, Headphones, Lightbulb, ListChecks, MessageSquareText, PencilLine, Sparkles, Target } from 'lucide-react';
import { Card } from '../components/ui/Card.jsx';
import { ProgressPill } from '../components/ui/ProgressPill.jsx';

const paragraphs = [
  'Every morning, Ana opens her notebook and writes three simple goals for the day. She likes short tasks because they help her feel focused and calm.',
  'After breakfast, she reads a small text in English. She does not understand every word, but she marks the new words and tries to guess the meaning from context.',
  'At night, Ana reviews the words again. She writes one sentence with each word and says the sentences out loud. This small habit helps her remember vocabulary and feel more confident.',
];

const vocabulary = [
  { word: 'goal', meaning: 'meta, objetivo', example: 'My goal is to study English every day.' },
  { word: 'focused', meaning: 'concentrado', example: 'I feel focused in the morning.' },
  { word: 'context', meaning: 'contexto', example: 'Guess the meaning from context.' },
  { word: 'habit', meaning: 'hábito', example: 'Reading is a good habit.' },
];

const comprehension = [
  {
    question: 'What does Ana write in her notebook?',
    options: ['Three simple goals', 'A shopping list', 'A long story'],
    answer: 'Three simple goals',
  },
  {
    question: 'What does Ana do when she does not understand every word?',
    options: ['She stops studying', 'She marks new words', 'She deletes the text'],
    answer: 'She marks new words',
  },
  {
    question: 'Why does Ana say the sentences out loud?',
    options: ['To practice speaking', 'To wake up her family', 'To finish faster'],
    answer: 'To practice speaking',
  },
];

const steps = [
  'Leia o texto sem traduzir palavra por palavra.',
  'Marque palavras importantes e tente entender pelo contexto.',
  'Responda às perguntas e escreva uma frase curta em inglês.',
];

export function ReadingLesson({ lesson }) {
  return (
    <article className="reading-layout reading-lesson-v2">
      <Card
        eyebrow={`Reading · ${lesson.level}`}
        title={lesson.title}
        action={<ProgressPill current={1} total={5} label="Aula" />}
      >
        <div className="lesson-intro-grid">
          <div>
            <p>
              Leia com calma, entenda a ideia principal e use o contexto para descobrir palavras novas.
              Esta estrutura foi criada para substituir a aula antiga de Reading sem sobreposição ou injeção de DOM.
            </p>
          </div>
          <div className="lesson-objective-card">
            <Target size={18} />
            <span>Objetivo</span>
            <strong>Compreender um texto curto e responder em inglês simples.</strong>
          </div>
        </div>
      </Card>

      <section className="reading-study-steps">
        {steps.map((step, index) => (
          <div className="study-step" key={step}>
            <span>{index + 1}</span>
            <p>{step}</p>
          </div>
        ))}
      </section>

      <section className="reading-grid reading-main-grid">
        <div className="reading-text-panel reading-paper">
          <div className="panel-title"><BookOpen size={18} /> Texto principal</div>
          <div className="reading-paper-body">
            {paragraphs.map((paragraph, index) => (
              <p key={index}>{paragraph}</p>
            ))}
          </div>
        </div>

        <aside className="reading-side-panel">
          <div className="mini-card listening-card">
            <div className="panel-title"><Headphones size={18} /> Escuta guiada</div>
            <p>O áudio será conectado no bloco de áudio. O botão já fica no lugar certo para evitar remendos depois.</p>
            <button type="button" className="secondary-button">Ouvir texto</button>
          </div>

          <div className="mini-card">
            <div className="panel-title"><Lightbulb size={18} /> Estratégia</div>
            <p>Não tente traduzir tudo. Primeiro encontre quem é a pessoa, o que ela faz e por que ela faz isso.</p>
          </div>
        </aside>
      </section>

      <section className="reading-section-card">
        <div className="panel-title"><Sparkles size={18} /> Vocabulário importante</div>
        <div className="vocabulary-grid">
          {vocabulary.map((item) => (
            <article className="vocab-card" key={item.word}>
              <strong>{item.word}</strong>
              <span>{item.meaning}</span>
              <p>{item.example}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="reading-section-card">
        <div className="panel-title"><ListChecks size={18} /> Compreensão</div>
        <div className="comprehension-list">
          {comprehension.map((item, index) => (
            <article className="question-card" key={item.question}>
              <span>Questão {index + 1}</span>
              <strong>{item.question}</strong>
              <div className="option-list">
                {item.options.map((option) => (
                  <button className={option === item.answer ? 'option-button correct' : 'option-button'} type="button" key={option}>
                    {option}
                  </button>
                ))}
              </div>
            </article>
          ))}
        </div>
      </section>

      <section className="answer-card guided-answer-card">
        <div className="panel-title"><MessageSquareText size={18} /> Resposta guiada</div>
        <label className="answer-label" htmlFor="reading-answer">
          Responda em inglês: What does Ana do after breakfast?
        </label>
        <textarea
          id="reading-answer"
          name="reading-answer"
          inputMode="text"
          autoCapitalize="sentences"
          autoCorrect="on"
          spellCheck="true"
          placeholder="After breakfast, Ana..."
        />
        <div className="answer-actions">
          <button type="button" className="secondary-button"><PencilLine size={16} /> Salvar rascunho</button>
          <button type="button" className="primary-button"><CheckCircle2 size={16} /> Concluir Reading</button>
        </div>
      </section>
    </article>
  );
}
