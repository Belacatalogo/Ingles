import { useMemo, useState } from 'react';
import { BookOpen, CheckCircle2, Headphones, Lightbulb, ListChecks, Loader2, MessageSquareText, PencilLine, Sparkles, Target } from 'lucide-react';
import { Card } from '../components/ui/Card.jsx';
import { ProgressPill } from '../components/ui/ProgressPill.jsx';
import { playGeminiTtsAudio } from '../services/geminiTts.js';
import { diagnostics } from '../services/diagnostics.js';

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

const steps = [
  'Leia o texto sem traduzir palavra por palavra.',
  'Marque palavras importantes e tente entender pelo contexto.',
  'Responda às perguntas e escreva uma frase curta em inglês.',
];

function normalizeReadingParagraphs(lesson) {
  const sections = Array.isArray(lesson?.sections) ? lesson.sections : [];
  const sectionTexts = sections
    .map((section) => section?.text || section?.content || section?.body || '')
    .filter(Boolean);

  if (sectionTexts.length) return sectionTexts;
  if (lesson?.listeningText) return [lesson.listeningText];
  if (lesson?.intro) return [lesson.intro, ...fallbackParagraphs.slice(1)];
  return fallbackParagraphs;
}

function normalizeVocabulary(lesson) {
  return Array.isArray(lesson?.vocabulary) && lesson.vocabulary.length ? lesson.vocabulary : fallbackVocabulary;
}

function normalizeComprehension(lesson) {
  return Array.isArray(lesson?.exercises) && lesson.exercises.length ? lesson.exercises : fallbackComprehension;
}

export function ReadingLesson({ lesson }) {
  const [audioState, setAudioState] = useState('idle');
  const [audioMessage, setAudioMessage] = useState('Gemini TTS natural disponível quando houver key de aula.');
  const paragraphs = useMemo(() => normalizeReadingParagraphs(lesson), [lesson]);
  const vocabulary = useMemo(() => normalizeVocabulary(lesson), [lesson]);
  const comprehension = useMemo(() => normalizeComprehension(lesson), [lesson]);
  const readingText = paragraphs.join('\n\n');

  async function handleListen() {
    diagnostics.log('Clique recebido no botão Ouvir texto da aula Reading.', 'info');
    setAudioState('loading');
    setAudioMessage('Preparando áudio natural...');

    try {
      const result = await playGeminiTtsAudio({
        text: readingText,
        voiceName: 'Kore',
        style: 'Natural American English teacher voice, calm and clear, moderate speed, ideal for A1 Brazilian learners.',
      });

      if (result.source === 'gemini') setAudioMessage('Áudio natural Gemini reproduzido.');
      else if (result.source === 'cache') setAudioMessage('Áudio natural carregado do cache.');
      else if (result.source === 'browser-fallback') setAudioMessage('Gemini TTS indisponível; usei o TTS do navegador como fallback.');
      else setAudioMessage(result.error || 'Não foi possível reproduzir áudio.');
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
            <p>O botão usa Gemini TTS natural com fallback automático para TTS do navegador.</p>
            <button type="button" className="secondary-button" onClick={handleListen} disabled={audioState === 'loading'}>
              {audioState === 'loading' ? <Loader2 size={16} className="spin" /> : <Headphones size={16} />}
              {audioState === 'loading' ? 'Gerando áudio...' : 'Ouvir texto'}
            </button>
            <p className="generator-message">{audioMessage}</p>
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
          {vocabulary.map((item, index) => (
            <article className="vocab-card" key={item.word || index}>
              <strong>{item.word || item.term || 'word'}</strong>
              <span>{item.meaning || item.translation || item.definition || '—'}</span>
              <p>{item.example || item.sentence || ''}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="reading-section-card">
        <div className="panel-title"><ListChecks size={18} /> Compreensão</div>
        <div className="comprehension-list">
          {comprehension.map((item, index) => (
            <article className="question-card" key={item.question || index}>
              <span>Questão {index + 1}</span>
              <strong>{item.question || item.prompt || 'Responda à questão.'}</strong>
              <div className="option-list">
                {(item.options || item.choices || []).map((option) => (
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
