import { useEffect, useMemo, useState } from 'react';
import { BookOpen, CheckCircle2, Headphones, Lightbulb, ListChecks, Loader2, MessageSquareText, PencilLine, Sparkles, Target } from 'lucide-react';
import { Card } from '../components/ui/Card.jsx';
import { ProgressPill } from '../components/ui/ProgressPill.jsx';
import { playLearningAudio } from '../services/audioPlayback.js';
import { diagnostics } from '../services/diagnostics.js';
import { completeLesson, getLessonDraft, isLessonCompleted, saveLessonDraft } from '../services/progressStore.js';

const fallbackParagraphs = [
  'Every morning, Ana opens her notebook and writes three simple goals for the day. She likes short tasks because they help her feel focused and calm.',
  'After breakfast, she reads a small text in English. She does not understand every word, but she marks the new words and tries to guess the meaning from context.',
  'At night, Ana reviews the words again. She writes one sentence with each word and says the sentences out loud. This small habit helps her remember vocabulary and feel more confident.',
];

const fallbackVocabulary = [
  { word: 'goal', meaning: 'meta, objetivo', example: 'My goal is to study English every day.' },
  { word: 'focused', meaning: 'concentrado', example: 'I feel focused in the morning.' },
  { word: 'context', meaning: 'contexto', example: 'Guess the meaning from context.' },
  { word: 'habit', meaning: 'hábito', example: 'Reading is a good habit.' },
];

const fallbackComprehension = [
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

const fallbackSteps = [
  'Leia o texto sem traduzir palavra por palavra.',
  'Marque palavras importantes e tente entender pelo contexto.',
  'Responda às perguntas e escreva uma frase curta em inglês.',
];

function cleanGeneratedText(value) {
  return String(value ?? '')
    .replace(/\*\*(.*?)\*\*/g, '$1')
    .replace(/^\s*[-*]\s+/gm, '')
    .replace(/\n{3,}/g, '\n\n')
    .trim();
}

function splitParagraphs(value) {
  const clean = cleanGeneratedText(value);
  if (!clean) return [];
  return clean
    .split(/\n\s*\n+/)
    .map((item) => item.trim())
    .filter(Boolean);
}

function normalizeReadingParagraphs(lesson) {
  if (lesson?.listeningText) return splitParagraphs(lesson.listeningText);

  const sections = Array.isArray(lesson?.sections) ? lesson.sections : [];
  const readingSections = sections.filter((section) => {
    const title = String(section?.title || '').toLowerCase();
    return title.includes('texto') || title.includes('reading') || title.includes('main text');
  });

  const sectionTexts = readingSections
    .map((section) => section?.text || section?.content || section?.body || '')
    .flatMap(splitParagraphs)
    .filter(Boolean);

  if (sectionTexts.length) return sectionTexts;
  return fallbackParagraphs;
}

function normalizeVocabulary(lesson) {
  return Array.isArray(lesson?.vocabulary) && lesson.vocabulary.length ? lesson.vocabulary : fallbackVocabulary;
}

function normalizeComprehension(lesson) {
  return Array.isArray(lesson?.exercises) && lesson.exercises.length ? lesson.exercises : fallbackComprehension;
}

function getLessonIntro(lesson) {
  return cleanGeneratedText(
    lesson?.intro ||
    lesson?.subtitle ||
    'Leia com calma, entenda a ideia principal e use o contexto para descobrir palavras novas.'
  );
}

function getLessonObjective(lesson) {
  return cleanGeneratedText(
    lesson?.objective ||
    lesson?.goal ||
    lesson?.raw?.objective ||
    'Compreender o texto principal, aprender vocabulário novo e responder em inglês simples.'
  );
}

function getLessonSteps(lesson) {
  const tips = Array.isArray(lesson?.tips) ? lesson.tips : [];
  const cleanTips = tips
    .map((tip) => cleanGeneratedText(typeof tip === 'string' ? tip : tip?.text || tip?.tip || ''))
    .filter(Boolean)
    .slice(0, 3);
  return cleanTips.length ? cleanTips : fallbackSteps;
}

function normalizeAnswer(value) {
  return cleanGeneratedText(value).toLowerCase().replace(/\s+/g, ' ').trim();
}

function isCorrectOption(option, answer) {
  return normalizeAnswer(option) === normalizeAnswer(answer);
}

export function ReadingLesson({ lesson }) {
  const [audioState, setAudioState] = useState('idle');
  const [audioMessage, setAudioMessage] = useState('Toque em Ouvir texto para reproduzir o áudio no iPhone.');
  const [selectedAnswers, setSelectedAnswers] = useState({});
  const [writtenAnswer, setWrittenAnswer] = useState('');
  const [completionMessage, setCompletionMessage] = useState('');
  const [completed, setCompleted] = useState(false);
  const paragraphs = useMemo(() => normalizeReadingParagraphs(lesson), [lesson]);
  const vocabulary = useMemo(() => normalizeVocabulary(lesson), [lesson]);
  const comprehension = useMemo(() => normalizeComprehension(lesson), [lesson]);
  const intro = useMemo(() => getLessonIntro(lesson), [lesson]);
  const objective = useMemo(() => getLessonObjective(lesson), [lesson]);
  const steps = useMemo(() => getLessonSteps(lesson), [lesson]);
  const readingText = paragraphs.join('\n\n');

  useEffect(() => {
    setSelectedAnswers({});
    setWrittenAnswer(getLessonDraft(lesson?.id || lesson?.title || 'reading'));
    setCompleted(isLessonCompleted(lesson));
    setCompletionMessage(isLessonCompleted(lesson) ? 'Esta aula já foi concluída.' : '');
  }, [lesson?.id, lesson?.title, lesson?.listeningText]);

  function handleSelectAnswer(questionIndex, option) {
    setSelectedAnswers((current) => ({ ...current, [questionIndex]: option }));
  }

  function handleSaveDraft() {
    saveLessonDraft({ lesson, answer: writtenAnswer });
    setCompletionMessage('Rascunho salvo.');
  }

  function handleCompleteLesson() {
    const result = completeLesson({
      lesson,
      answers: selectedAnswers,
      writtenAnswer,
    });

    setCompleted(true);
    setCompletionMessage(result.alreadyCompleted ? 'Aula já estava concluída. Progresso mantido.' : '+25 XP. Aula concluída e progresso salvo.');
  }

  async function handleListen() {
    diagnostics.log('Clique recebido no botão Ouvir texto da aula Reading.', 'info');
    setAudioState('loading');
    setAudioMessage('Preparando áudio...');

    try {
      const result = await playLearningAudio({
        text: readingText,
        label: 'Reading · texto principal',
        voiceName: 'Kore',
        style: 'Natural American English teacher voice, calm and clear, moderate speed, ideal for A1 Brazilian learners.',
      });

      if (result.ok) {
        setAudioMessage(result.source === 'browser-ios' ? 'Áudio iniciado pelo TTS do iPhone.' : 'Áudio iniciado.');
      } else {
        setAudioMessage(result.error || 'Não foi possível reproduzir áudio.');
      }
    } catch (error) {
      diagnostics.log(`Erro inesperado no botão Ouvir texto: ${error?.message || error}`, 'error');
      setAudioMessage(error?.message || 'Erro inesperado ao tentar reproduzir áudio.');
    } finally {
      setAudioState('idle');
    }
  }

  return (
    <article className="reading-layout reading-lesson-v2">
      <Card
        eyebrow={`Reading · ${lesson.level}`}
        title={lesson.title}
        action={<ProgressPill current={completed ? 5 : 1} total={5} label={completed ? 'Concluída' : 'Aula'} />}
      >
        <div className="lesson-intro-grid">
          <div>
            <p>{intro}</p>
          </div>
          <div className="lesson-objective-card">
            <Target size={18} />
            <span>Objetivo</span>
            <strong>{objective}</strong>
          </div>
        </div>
      </Card>

      <section className="reading-study-steps">
        {steps.map((step, index) => (
          <div className="study-step" key={`${step}-${index}`}>
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
              <p key={index}>{cleanGeneratedText(paragraph)}</p>
            ))}
          </div>
        </div>

        <aside className="reading-side-panel">
          <div className="mini-card listening-card">
            <div className="panel-title"><Headphones size={18} /> Escuta guiada</div>
            <p>O botão usa áudio compatível com iPhone e registra erros no diagnóstico.</p>
            <button type="button" className="secondary-button" onClick={handleListen} disabled={audioState === 'loading'}>
              {audioState === 'loading' ? <Loader2 size={16} className="spin" /> : <Headphones size={16} />}
              {audioState === 'loading' ? 'Preparando...' : 'Ouvir texto'}
            </button>
            <p className="generator-message">{audioMessage}</p>
          </div>

          <div className="mini-card">
            <div className="panel-title"><Lightbulb size={18} /> Estratégia</div>
            <p>Primeiro entenda a ideia geral do texto. Depois volte para vocabulário, detalhes e perguntas.</p>
          </div>
        </aside>
      </section>

      <section className="reading-section-card">
        <div className="panel-title"><Sparkles size={18} /> Vocabulário importante</div>
        <div className="vocabulary-grid">
          {vocabulary.map((item, index) => (
            <article className="vocab-card" key={item.word || index}>
              <strong>{cleanGeneratedText(item.word || item.term || 'word')}</strong>
              <span>{cleanGeneratedText(item.meaning || item.translation || item.definition || '—')}</span>
              <p>{cleanGeneratedText(item.example || item.sentence || '')}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="reading-section-card">
        <div className="panel-title"><ListChecks size={18} /> Compreensão</div>
        <div className="comprehension-list">
          {comprehension.map((item, index) => {
            const selected = selectedAnswers[index];
            const hasAnswered = typeof selected === 'string';
            const selectedIsCorrect = hasAnswered && isCorrectOption(selected, item.answer);
            const options = item.options || item.choices || [];

            return (
              <article className="question-card" key={item.question || index}>
                <span>Questão {index + 1}</span>
                <strong>{cleanGeneratedText(item.question || item.prompt || 'Responda à questão.')}</strong>
                <div className="option-list">
                  {options.map((option) => {
                    const optionIsSelected = selected === option;
                    const optionIsCorrect = isCorrectOption(option, item.answer);
                    const revealClass = hasAnswered && optionIsCorrect ? ' correct' : '';
                    const wrongClass = optionIsSelected && hasAnswered && !optionIsCorrect ? ' incorrect' : '';
                    const selectedClass = optionIsSelected ? ' selected' : '';

                    return (
                      <button
                        className={`option-button${selectedClass}${revealClass}${wrongClass}`}
                        type="button"
                        key={option}
                        onClick={() => handleSelectAnswer(index, option)}
                        aria-pressed={optionIsSelected}
                      >
                        {cleanGeneratedText(option)}
                      </button>
                    );
                  })}
                </div>
                {hasAnswered ? (
                  <p className={selectedIsCorrect ? 'question-feedback correct' : 'question-feedback incorrect'}>
                    {selectedIsCorrect ? 'Correto. Boa leitura!' : `Quase. A resposta correta é: ${cleanGeneratedText(item.answer)}.`}
                  </p>
                ) : null}
              </article>
            );
          })}
        </div>
      </section>

      <section className="answer-card guided-answer-card">
        <div className="panel-title"><MessageSquareText size={18} /> Resposta guiada</div>
        <label className="answer-label" htmlFor="reading-answer">
          Responda em inglês sobre o texto da aula.
        </label>
        <textarea
          id="reading-answer"
          name="reading-answer"
          inputMode="text"
          autoCapitalize="sentences"
          autoCorrect="on"
          spellCheck="true"
          placeholder="Write your answer in English..."
          value={writtenAnswer}
          onChange={(event) => setWrittenAnswer(event.target.value)}
        />
        <div className="answer-actions">
          <button type="button" className="secondary-button" onClick={handleSaveDraft}><PencilLine size={16} /> Salvar rascunho</button>
          <button type="button" className="primary-button" onClick={handleCompleteLesson}><CheckCircle2 size={16} /> {completed ? 'Aula concluída' : 'Concluir Reading'}</button>
        </div>
        {completionMessage ? <p className="generator-message completion-message">{completionMessage}</p> : null}
      </section>
    </article>
  );
}
