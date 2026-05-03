import { useEffect, useMemo, useState } from 'react';
import {
  BookOpen,
  CheckCircle2,
  Eye,
  Headphones,
  Highlighter,
  Lightbulb,
  ListChecks,
  Loader2,
  MessageSquareText,
  PencilLine,
  SearchCheck,
  Sparkles,
  Target,
} from 'lucide-react';
import { Card } from '../components/ui/Card.jsx';
import { ProgressPill } from '../components/ui/ProgressPill.jsx';
import { getReadingLevelPolicy } from '../reading/readingLevelPolicy.js';
import { playLearningAudio } from '../services/audioPlayback.js';
import { diagnostics } from '../services/diagnostics.js';
import { completeLesson, getLessonDraft, isLessonCompleted, saveLessonDraft } from '../services/progressStore.js';

const fallbackParagraphs = [
  'Every morning, Ana opens her notebook and writes three simple goals for the day. She likes short tasks because they help her feel focused and calm.',
  'After breakfast, she reads a small text in English. She does not understand every word, but she marks the new words and tries to guess the meaning from context.',
  'At night, Ana reviews the words again. She writes one sentence with each word and says the sentences out loud. This small habit helps her remember vocabulary and feel more confident.',
];

const fallbackPreReading = [
  'Observe o título e pense: quem aparece no texto e qual rotina será descrita?',
  'Leia primeiro para entender a ideia geral. Não traduza palavra por palavra.',
  'Durante a segunda leitura, procure frases que provam suas respostas.',
];

const fallbackVocabulary = [
  { word: 'goal', meaning: 'meta, objetivo', example: 'My goal is to study English every day.' },
  { word: 'focused', meaning: 'concentrado', example: 'I feel focused in the morning.' },
  { word: 'context', meaning: 'contexto', example: 'Guess the meaning from context.' },
  { word: 'habit', meaning: 'hábito', example: 'Reading is a good habit.' },
];

const fallbackComprehension = [
  {
    skill: 'main_idea',
    question: 'What is the main idea of the text?',
    options: ['Ana studies with a small daily routine', 'Ana travels to another country', 'Ana buys a new phone'],
    answer: 'Ana studies with a small daily routine',
    evidence: 'This small habit helps her remember vocabulary and feel more confident.',
  },
  {
    skill: 'detail',
    question: 'What does Ana write in her notebook?',
    options: ['Three simple goals', 'A shopping list', 'A long story'],
    answer: 'Three simple goals',
    evidence: 'Ana opens her notebook and writes three simple goals for the day.',
  },
  {
    skill: 'detail',
    question: 'What does Ana do when she does not understand every word?',
    options: ['She marks new words', 'She stops studying', 'She deletes the text'],
    answer: 'She marks new words',
    evidence: 'She marks the new words and tries to guess the meaning from context.',
  },
  {
    skill: 'inference',
    question: 'Why does Ana say the sentences out loud?',
    options: ['To practice speaking', 'To wake up her family', 'To finish faster'],
    answer: 'To practice speaking',
    evidence: 'She writes one sentence with each word and says the sentences out loud.',
  },
];

const fallbackSteps = [
  'Pré-leitura: prepare o tema antes de abrir o texto.',
  'Leitura: entenda a ideia geral primeiro e só depois procure detalhes.',
  'Pós-leitura: responda, prove com o texto e escreva frases suas.',
];

const readingFlowSteps = [
  'Objetivo',
  'Pré-leitura',
  'Texto principal',
  'Ideia geral',
  'Vocabulário em contexto',
  'Compreensão e evidência',
  'Produção curta',
  'Conclusão',
];

const skillLabels = {
  main_idea: 'Ideia geral',
  detail: 'Detalhe',
  vocabulary_context: 'Vocabulário',
  sequence: 'Sequência',
  evidence: 'Evidência',
  inference: 'Inferência',
  author_purpose: 'Intenção do autor',
  fact_opinion: 'Fato/opinião',
  tone: 'Tom',
  implication: 'Implicação',
  critical_response: 'Análise crítica',
};

const genericQuestionPatterns = [
  'what is the text about',
  'what is this text about',
  'choose the correct answer',
  'select the correct option',
  'answer the question',
  'according to the text',
  'qual é a resposta correta',
  'responda a pergunta',
];

function cleanGeneratedText(value) {
  return String(value ?? '')
    .replace(/\*\*(.*?)\*\*/g, '$1')
    .replace(/^\s*[-*]\s+/gm, '')
    .replace(/\s+([,.!?;:])/g, '$1')
    .replace(/([.!?])(?=[A-ZÁÉÍÓÚÂÊÔÃÕ])/g, '$1 ')
    .replace(/\n{3,}/g, '\n\n')
    .trim();
}

function normalizeAnswer(value) {
  return cleanGeneratedText(value).toLowerCase().replace(/\s+/g, ' ').trim();
}

function splitParagraphs(value) {
  const clean = cleanGeneratedText(value);
  if (!clean) return [];

  const blocks = clean
    .split(/\n\s*\n+/)
    .map((item) => item.trim())
    .filter(Boolean);

  if (blocks.length > 1) return blocks;

  return clean
    .split(/(?<=[.!?])\s+(?=[A-Z])/)
    .reduce((paragraphs, sentence) => {
      const current = paragraphs[paragraphs.length - 1] || '';
      if (!current || current.length > 260) {
        paragraphs.push(sentence.trim());
      } else {
        paragraphs[paragraphs.length - 1] = `${current} ${sentence.trim()}`.trim();
      }
      return paragraphs;
    }, [])
    .filter(Boolean);
}

function extractSectionText(section) {
  if (!section) return '';
  return cleanGeneratedText(section.text || section.content || section.body || section.value || '');
}

function normalizeListItems(value) {
  if (Array.isArray(value)) {
    return value
      .map((item) => cleanGeneratedText(typeof item === 'string' ? item : item?.text || item?.tip || item?.content || item?.question || ''))
      .filter(Boolean);
  }
  return splitParagraphs(value);
}

function normalizePreReading(lesson) {
  const direct = normalizeListItems(lesson?.preReading || lesson?.pre_reading || lesson?.beforeReading);
  if (direct.length) return direct.slice(0, 4);

  const sections = Array.isArray(lesson?.sections) ? lesson.sections : [];
  const preSections = sections.filter((section) => {
    const title = String(section?.title || section?.heading || '').toLowerCase();
    return title.includes('pré') || title.includes('pre') || title.includes('antes') || title.includes('pre-reading');
  });

  const fromSections = preSections.map(extractSectionText).flatMap(normalizeListItems).filter(Boolean);
  return fromSections.length ? fromSections.slice(0, 4) : fallbackPreReading;
}

function normalizeReadingParagraphs(lesson) {
  const directText = lesson?.readingText || lesson?.text || lesson?.story || lesson?.article || lesson?.passage || lesson?.listeningText;
  const directParagraphs = splitParagraphs(directText);
  if (directParagraphs.length) return directParagraphs;

  const sections = Array.isArray(lesson?.sections) ? lesson.sections : [];
  const readingSections = sections.filter((section) => {
    const title = String(section?.title || section?.heading || '').toLowerCase();
    return title.includes('texto') || title.includes('reading') || title.includes('main text') || title.includes('passage') || title.includes('story');
  });

  const sectionTexts = readingSections
    .map(extractSectionText)
    .flatMap(splitParagraphs)
    .filter(Boolean);

  if (sectionTexts.length) return sectionTexts;
  return fallbackParagraphs;
}

function normalizeVocabulary(lesson, paragraphs) {
  const rawVocabulary = Array.isArray(lesson?.vocabulary) && lesson.vocabulary.length ? lesson.vocabulary : fallbackVocabulary;
  return rawVocabulary
    .map((item, index) => {
      const word = cleanGeneratedText(item?.word || item?.term || item?.english || item?.title || `word ${index + 1}`);
      const meaning = cleanGeneratedText(item?.meaning || item?.translation || item?.definition || item?.portuguese || '—');
      const example = cleanGeneratedText(item?.example || item?.sentence || item?.context || findEvidenceForTerm(word, paragraphs));
      return { word, meaning, example };
    })
    .filter((item) => item.word && item.meaning)
    .slice(0, 8);
}

function normalizeOptions(item) {
  const rawOptions = item?.options || item?.choices || item?.alternatives || [];
  const options = Array.isArray(rawOptions) ? rawOptions : [];
  const cleanOptions = options
    .map((option) => cleanGeneratedText(typeof option === 'string' ? option : option?.text || option?.label || option?.value || ''))
    .filter(Boolean);

  return [...new Set(cleanOptions)].slice(0, 4);
}

function isGenericQuestion(question) {
  const normalized = normalizeAnswer(question).replace(/[?.!]/g, '');
  if (!normalized || normalized.length < 14) return true;
  return genericQuestionPatterns.some((pattern) => normalized === pattern || normalized.includes(`${pattern} `));
}

function findEvidenceForTerm(term, paragraphs) {
  const normalizedTerm = normalizeAnswer(term);
  if (!normalizedTerm) return '';
  return paragraphs.find((paragraph) => normalizeAnswer(paragraph).includes(normalizedTerm)) || '';
}

function findQuestionEvidence(item, paragraphs) {
  const explicitEvidence = cleanGeneratedText(item?.evidence || item?.quote || item?.reference || item?.explanation || item?.because || '');
  if (explicitEvidence && normalizeAnswer(explicitEvidence) !== normalizeAnswer(item?.answer)) return explicitEvidence;

  const answer = normalizeAnswer(item?.answer || item?.correctAnswer || item?.correct || '');
  if (!answer) return '';
  return paragraphs.find((paragraph) => normalizeAnswer(paragraph).includes(answer)) || '';
}

function normalizeComprehension(lesson, paragraphs) {
  const rawExercises = Array.isArray(lesson?.readingQuestions) && lesson.readingQuestions.length
    ? lesson.readingQuestions
    : Array.isArray(lesson?.comprehension) && lesson.comprehension.length
      ? lesson.comprehension
      : Array.isArray(lesson?.questions) && lesson.questions.length
        ? lesson.questions
        : Array.isArray(lesson?.exercises) && lesson.exercises.length
          ? lesson.exercises
          : fallbackComprehension;

  const safeQuestions = rawExercises
    .map((item, index) => {
      const question = cleanGeneratedText(item?.question || item?.prompt || item?.title || '');
      const answer = cleanGeneratedText(item?.answer || item?.correctAnswer || item?.correct || '');
      const options = normalizeOptions(item);
      const evidence = findQuestionEvidence(item, paragraphs);
      const skill = cleanGeneratedText(item?.skill || item?.type || (index === 0 ? 'main_idea' : 'detail'));
      return { question, answer, options, evidence, skill, index };
    })
    .filter((item) => item.question && item.answer && item.options.length >= 2)
    .filter((item) => !isGenericQuestion(item.question) || item.skill === 'main_idea')
    .filter((item) => !normalizeAnswer(item.question).includes(normalizeAnswer(item.answer)))
    .slice(0, 6);

  const source = safeQuestions.length >= 2 ? safeQuestions : fallbackComprehension;
  return source.map((item, index) => ({ ...item, index: item.index ?? index, skill: item.skill || (index === 0 ? 'main_idea' : 'detail') }));
}

function getLessonIntro(lesson) {
  return cleanGeneratedText(
    lesson?.intro ||
    lesson?.subtitle ||
    'Leia com calma, entenda a ideia principal e use evidências do texto para responder sem decorar respostas.'
  );
}

function getLessonObjective(lesson) {
  return cleanGeneratedText(
    lesson?.objective ||
    lesson?.goal ||
    lesson?.raw?.objective ||
    'Compreender o texto principal, reconhecer vocabulário em contexto e justificar respostas com evidência textual.'
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

function isCorrectOption(option, answer) {
  return normalizeAnswer(option) === normalizeAnswer(answer);
}

function getReadingRenderReport({ paragraphs, vocabulary, comprehension, preReading, levelPolicy }) {
  return {
    preReading: preReading.length,
    paragraphs: paragraphs.length,
    vocabulary: vocabulary.length,
    questions: comprehension.length,
    hasEvidence: comprehension.filter((item) => item.evidence).length,
    level: levelPolicy.level,
    protected: true,
  };
}

function QuestionCard({ item, index, selectedAnswers, onSelectAnswer }) {
  const questionKey = item.index ?? index;
  const selected = selectedAnswers[questionKey];
  const hasAnswered = typeof selected === 'string';
  const selectedIsCorrect = hasAnswered && isCorrectOption(selected, item.answer);
  const skillLabel = skillLabels[item.skill] || 'Leitura';

  return (
    <article className="question-card reading-question-card-v3" key={`${item.question}-${index}`}>
      <span>{skillLabel} · Questão {index + 1}</span>
      <strong>{item.question}</strong>
      {item.evidence ? <p className="reading-evidence-hint">Dica: a resposta precisa aparecer ou ser provada por uma frase do texto.</p> : null}
      <div className="option-list reading-option-list-v3">
        {item.options.map((option) => {
          const optionIsSelected = selected === option;
          const selectedClass = optionIsSelected ? ' selected' : '';
          const correctnessClass = optionIsSelected && hasAnswered ? (selectedIsCorrect ? ' correct' : ' incorrect') : '';

          return (
            <button
              className={`option-button reading-option-button-v3${selectedClass}${correctnessClass}`}
              type="button"
              key={option}
              onClick={() => onSelectAnswer(questionKey, option)}
              aria-pressed={optionIsSelected}
            >
              {option}
            </button>
          );
        })}
      </div>
      {hasAnswered ? (
        <div className={selectedIsCorrect ? 'question-feedback correct' : 'question-feedback incorrect'}>
          <strong>{selectedIsCorrect ? 'Correto.' : 'Revise o trecho antes de tentar novamente.'}</strong>
          {item.evidence ? <p>Trecho de apoio: “{item.evidence}”</p> : null}
        </div>
      ) : null}
    </article>
  );
}

export function ReadingLesson({ lesson }) {
  const [audioState, setAudioState] = useState('idle');
  const [audioMessage, setAudioMessage] = useState('');
  const [selectedAnswers, setSelectedAnswers] = useState({});
  const [writtenAnswer, setWrittenAnswer] = useState('');
  const [completionMessage, setCompletionMessage] = useState('');
  const [completed, setCompleted] = useState(false);
  const levelPolicy = useMemo(() => getReadingLevelPolicy(lesson?.level || 'A1'), [lesson?.level]);
  const paragraphs = useMemo(() => normalizeReadingParagraphs(lesson), [lesson]);
  const preReading = useMemo(() => normalizePreReading(lesson), [lesson]);
  const vocabulary = useMemo(() => normalizeVocabulary(lesson, paragraphs), [lesson, paragraphs]);
  const comprehension = useMemo(() => normalizeComprehension(lesson, paragraphs), [lesson, paragraphs]);
  const mainIdeaQuestion = comprehension[0];
  const detailQuestions = comprehension.slice(1);
  const intro = useMemo(() => getLessonIntro(lesson), [lesson]);
  const objective = useMemo(() => getLessonObjective(lesson), [lesson]);
  const steps = useMemo(() => getLessonSteps(lesson), [lesson]);
  const renderReport = useMemo(() => getReadingRenderReport({ paragraphs, vocabulary, comprehension, preReading, levelPolicy }), [paragraphs, vocabulary, comprehension, preReading, levelPolicy]);
  const readingText = paragraphs.join('\n\n');

  useEffect(() => {
    setSelectedAnswers({});
    setWrittenAnswer(getLessonDraft(lesson?.id || lesson?.title || 'reading'));
    setCompleted(isLessonCompleted(lesson));
    setCompletionMessage(isLessonCompleted(lesson) ? 'Esta aula já foi concluída.' : '');
    setAudioMessage('');
  }, [lesson?.id, lesson?.title, lesson?.listeningText, lesson?.readingText]);

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
    setCompletionMessage(result.alreadyCompleted ? 'Aula já estava concluída. Progresso mantido.' : '+25 XP. Reading concluída e progresso salvo.');
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
    <article className="reading-layout reading-lesson-v3 reading-complete-render-review-lab reading-pedagogical-flow-v1 reading-level-policy-v1">
      <Card
        eyebrow={`Reading · ${levelPolicy.level}`}
        title={lesson.title}
        action={<ProgressPill current={completed ? 8 : 1} total={8} label={completed ? 'Concluída' : 'Aula completa'} />}
      >
        <div className="lesson-intro-grid reading-hero-grid">
          <div>
            <p>{intro}</p>
            <div className="reading-skill-strip" aria-label="Habilidades treinadas nesta aula">
              <span><Eye size={14} /> Ideia geral</span>
              <span><SearchCheck size={14} /> Evidência</span>
              <span><Highlighter size={14} /> Contexto</span>
            </div>
          </div>
          <div className="lesson-objective-card reading-objective-card">
            <Target size={18} />
            <span>Objetivo real</span>
            <strong>{objective}</strong>
          </div>
        </div>
      </Card>

      <section className="reading-official-flow-card" aria-label="Ordem oficial da aula Reading">
        {readingFlowSteps.map((step, index) => (
          <div key={step} className={completed ? 'done' : index === 0 ? 'active' : ''}>
            <span>{index + 1}</span>
            <strong>{step}</strong>
          </div>
        ))}
      </section>

      <section className="reading-study-steps reading-method-steps">
        {steps.map((step, index) => (
          <div className="study-step" key={`${step}-${index}`}>
            <span>{index + 1}</span>
            <p>{step}</p>
          </div>
        ))}
      </section>

      <section className="reading-section-card reading-pre-reading-card">
        <div className="panel-title"><Lightbulb size={18} /> Pré-leitura</div>
        <p className="reading-section-intro">Antes de responder qualquer exercício, prepare seu cérebro para o tema do texto.</p>
        <div className="reading-pre-reading-list">
          {preReading.map((item, index) => (
            <article key={`${item}-${index}`}>
              <span>{index + 1}</span>
              <p>{item}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="reading-grid reading-main-grid reading-main-grid-v3">
        <div className="reading-text-panel reading-paper reading-paper-v3">
          <div className="panel-title"><BookOpen size={18} /> Texto principal</div>
          <div className="reading-paper-body reading-paper-body-v3">
            {paragraphs.map((paragraph, index) => (
              <p key={`${paragraph}-${index}`}>
                <span className="reading-paragraph-index">{index + 1}</span>
                {cleanGeneratedText(paragraph)}
              </p>
            ))}
          </div>
        </div>

        <aside className="reading-side-panel reading-side-panel-v3">
          <div className="mini-card listening-card reading-audio-card">
            <div className="panel-title"><Headphones size={18} /> Escuta opcional</div>
            <p>Use o áudio para reforçar pronúncia depois da primeira leitura. O clique é compatível com iPhone.</p>
            <button type="button" className="secondary-button" onClick={handleListen} disabled={audioState === 'loading'}>
              {audioState === 'loading' ? <Loader2 size={16} className="spin" /> : <Headphones size={16} />}
              {audioState === 'loading' ? 'Preparando...' : 'Ouvir texto'}
            </button>
            {audioMessage ? <p className="generator-message">{audioMessage}</p> : null}
          </div>

          <div className="mini-card reading-render-report-card reading-render-report-compact">
            <div className="panel-title"><Sparkles size={18} /> Aula segura</div>
            <p>{renderReport.questions} perguntas · {renderReport.hasEvidence} evidências · nível {renderReport.level}.</p>
          </div>

          <div className="mini-card reading-strategy-card">
            <div className="panel-title"><Lightbulb size={18} /> Como ler</div>
            <p>Procure palavras repetidas, nomes, ações e frases que provam sua resposta.</p>
          </div>
        </aside>
      </section>

      {mainIdeaQuestion ? (
        <section className="reading-section-card reading-main-idea-card">
          <div className="panel-title"><Eye size={18} /> Ideia geral</div>
          <p className="reading-section-intro">Responda primeiro pensando no assunto central do texto. Detalhes vêm depois.</p>
          <QuestionCard item={mainIdeaQuestion} index={0} selectedAnswers={selectedAnswers} onSelectAnswer={handleSelectAnswer} />
        </section>
      ) : null}

      <section className="reading-section-card reading-vocabulary-context-card">
        <div className="panel-title"><Highlighter size={18} /> Vocabulário em contexto</div>
        <div className="vocabulary-grid reading-vocabulary-grid-v3">
          {vocabulary.map((item, index) => (
            <article className="vocab-card reading-vocab-card-v3" key={`${item.word}-${index}`}>
              <strong>{item.word}</strong>
              <span>{item.meaning}</span>
              {item.example ? <p>{item.example}</p> : <p>Procure esta palavra no texto e tente entender pelo contexto.</p>}
            </article>
          ))}
        </div>
      </section>

      <section className="reading-section-card reading-comprehension-card-v3">
        <div className="panel-title"><ListChecks size={18} /> Compreensão com evidência textual</div>
        <p className="reading-section-intro">Agora responda detalhes, vocabulário e inferências simples. Cada resposta deve ter apoio no texto.</p>
        <div className="comprehension-list reading-question-list-v3">
          {detailQuestions.map((item, index) => (
            <QuestionCard
              key={`${item.question}-${index}`}
              item={item}
              index={index + 1}
              selectedAnswers={selectedAnswers}
              onSelectAnswer={handleSelectAnswer}
            />
          ))}
        </div>
      </section>

      <section className="answer-card guided-answer-card reading-production-card-v3">
        <div className="panel-title"><MessageSquareText size={18} /> Produção curta</div>
        <label className="answer-label" htmlFor="reading-answer">
          {levelPolicy.production.instruction}
        </label>
        <textarea
          id="reading-answer"
          name="reading-answer"
          inputMode="text"
          autoCapitalize="sentences"
          autoCorrect="on"
          spellCheck="true"
          placeholder={levelPolicy.level === 'A1' ? 'Write 1 to 3 simple sentences about the text...' : 'Write your response based on the text...'}
          value={writtenAnswer}
          onChange={(event) => setWrittenAnswer(event.target.value)}
        />
        <div className="answer-actions">
          <button type="button" className="secondary-button" onClick={handleSaveDraft}><PencilLine size={16} /> Salvar rascunho</button>
          <button type="button" className="primary-button" onClick={handleCompleteLesson}><CheckCircle2 size={16} /> {completed ? 'Aula concluída' : 'Concluir Reading'}</button>
        </div>
        {completionMessage ? <p className="generator-message completion-message">{completionMessage}</p> : null}
      </section>

      <section className="reading-section-card reading-after-lesson-card">
        <div className="panel-title"><Sparkles size={18} /> Depois da aula</div>
        <p>A Reading agora é uma aula completa dentro desta aba. A Prática Profunda vem depois como complemento para reforçar vocabulário, detalhes e interpretação.</p>
      </section>
    </article>
  );
}
