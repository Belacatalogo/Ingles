import { useEffect, useMemo, useState } from 'react';
import { BookOpenCheck, CheckCircle2, Lightbulb, MessageSquareText, PencilLine, Sparkles, Target } from 'lucide-react';
import { Card } from '../components/ui/Card.jsx';
import { ProgressPill } from '../components/ui/ProgressPill.jsx';
import { completeLesson, getLessonDraft, isLessonCompleted, saveLessonDraft } from '../services/progressStore.js';

const fallbackSections = [
  {
    title: 'Regra principal',
    content: 'Use simple present para falar sobre rotina, fatos e hábitos. Com he, she e it, o verbo normalmente muda: She studies. He works.',
  },
  {
    title: 'Exemplos seguros',
    content: 'I work. You work. He works. She studies. We play. They live.',
  },
  {
    title: 'Erro comum',
    content: 'Não use do/does em frases afirmativas simples: diga “She studies English”, não “She does studies English”.',
  },
];

const fallbackTips = [
  'Leia a regra principal primeiro.',
  'Observe os exemplos em inglês antes de praticar.',
  'Faça a Prática Profunda para testar se você realmente entendeu.',
];

const connectorBreaks = [
  'Por exemplo',
  'Já',
  'Outro exemplo',
  'Outro',
  'Veja',
  'Assim',
  'Portanto',
  'Além disso',
  'Na prática',
  'Observe',
  'Agora',
];

const englishSignals = /\b(I|you|he|she|it|we|they|am|are|is|was|were|have|has|had|do|does|did|can|could|will|would|should|must|go|goes|went|work|works|study|studies|live|lives|like|likes|want|wants|need|needs|make|makes|take|takes|there|this|that|these|those|because|although|if|when|where|what|why|how|student|doctor|brazilian|happy|car|book|home|lunch)\b/i;
const connectorPatternText = connectorBreaks.join('|');
const connectorBoundary = new RegExp(`\\b(${connectorPatternText})\\b`, 'i');

function normalizeVisualSpacing(value) {
  return String(value ?? '')
    .replace(/\*\*(.*?)\*\*/g, '$1')
    .replace(/^\s*[-*]\s+/gm, '')
    .replace(/([.!?])(?=[A-ZÁÉÍÓÚÂÊÔÃÕÇ])/g, '$1 ')
    .replace(/\)(?=(Por exemplo|Já|Outro exemplo|Outro|Veja|Assim|Portanto|Além disso|Na prática|Observe|Agora)\b)/g, ') ')
    .replace(/([,;:])(?=\S)/g, '$1 ')
    .replace(new RegExp(`\\s*([.!?])\\s*(?=(${connectorPatternText})\\b)`, 'gi'), '$1\n\n')
    .replace(new RegExp(`\\s+(?=(Já|Outro exemplo|Outro|Veja|Assim|Portanto|Além disso|Na prática|Observe|Agora)\\b)`, 'gi'), '\n\n')
    .replace(/\n{3,}/g, '\n\n')
    .replace(/[ \t]{2,}/g, ' ')
    .trim();
}

function cleanText(value) {
  return normalizeVisualSpacing(value);
}

function splitSentences(text) {
  return cleanText(text)
    .split(/(?<=[.!?])\s+/)
    .map((item) => item.trim())
    .filter(Boolean);
}

function splitParagraphs(text) {
  const clean = cleanText(text);
  if (!clean) return [];

  const byBreaks = clean
    .split(/\n{2,}/g)
    .map((item) => item.trim())
    .filter(Boolean);

  if (byBreaks.length > 1) return byBreaks;
  return splitSentences(clean);
}

function splitNumberedList(text) {
  const clean = cleanText(text);
  const parts = clean.split(/\s+(?=\d+\.\s+)/g).map((part) => part.trim()).filter(Boolean);
  if (parts.length < 2) return null;
  const intro = parts[0].match(/^\d+\./) ? '' : parts.shift();
  const items = parts.map((part) => part.replace(/^\d+\.\s*/, '').trim()).filter(Boolean);
  return { intro, items };
}

function looksLikeEnglish(text) {
  const value = cleanText(text);
  if (!value) return false;
  const hasEnglishSignal = englishSignals.test(value);
  const hasPortugueseAccent = /[áàâãéêíóôõúç]/i.test(value);
  return hasEnglishSignal && !hasPortugueseAccent;
}

function splitByExampleHeader(text) {
  const clean = cleanText(text);
  const match = clean.match(/\b(Exemplos? do professor|Exemplos? guiados|Exemplos?)\s*:?\s*/i);
  if (!match || typeof match.index !== 'number') return null;

  const before = clean.slice(0, match.index).trim();
  const after = clean.slice(match.index + match[0].length).trim();
  return { before, after };
}

function splitExampleCandidates(text) {
  return cleanText(text)
    .split(/\n{2,}|\s+(?=\d+[.)]\s+)|\s+(?=[•-]\s+)/gi)
    .map((item) => item.replace(/^\s*(\d+[.)]|[•-])\s*/, '').trim())
    .filter(Boolean);
}

function extractLeadingParenthetical(text) {
  const match = cleanText(text).match(/^\(?([^()]{2,120})\)?(?=\s|,|\.|$)/);
  if (!match) return '';
  const value = cleanText(match[1]);
  return looksLikeEnglish(value) ? '' : value;
}

function splitEnglishLead(text) {
  const clean = cleanText(text).replace(/^[:\s]+/, '').trim();
  const directParenthetical = clean.match(/^([^().,;:!?]{2,90}?\b(?:am|are|is|was|were|have|has|had|do|does|did|can|will|would|should|must)\b[^().,;:!?]{0,90})\s*,?\s*\(([^)]{2,120})\)\s*(.*)$/i);

  if (directParenthetical && looksLikeEnglish(directParenthetical[1])) {
    return {
      english: cleanText(directParenthetical[1]),
      translation: cleanText(directParenthetical[2]),
      rest: cleanText(directParenthetical[3]).replace(/^[,.;:\s]+/, '').trim(),
    };
  }

  const sentenceParts = splitSentences(clean);
  const firstEnglish = sentenceParts.find((sentence) => looksLikeEnglish(sentence) && sentence.length <= 120);
  if (!firstEnglish) return { english: '', translation: '', rest: clean };

  const afterEnglish = cleanText(clean.replace(firstEnglish, '')).replace(/^[,.;:\s]+/, '').trim();
  const translation = extractLeadingParenthetical(afterEnglish);
  const rest = translation
    ? cleanText(afterEnglish.replace(new RegExp(`^\\(?${translation.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')}\\)?`), '')).replace(/^[,.;:\s]+/, '').trim()
    : afterEnglish;

  return {
    english: cleanText(firstEnglish.replace(/[“”"']/g, '')),
    translation,
    rest,
  };
}

function parseExampleCard(rawExample) {
  const text = cleanText(rawExample).replace(/^[:\s]+/, '').trim();
  const { english, translation, rest } = splitEnglishLead(text);
  const safeRest = rest || (!english ? text : '');

  return {
    original: text,
    english,
    translation,
    explanation: safeRest.replace(/^(,|\.|;|:|significa\s*\.?|quer dizer\s*\.?)\s*/i, '').trim(),
  };
}

function collectProfessorExamples(content) {
  const headerSplit = splitByExampleHeader(content);
  const explanationSource = headerSplit ? headerSplit.before : content;
  const exampleSource = headerSplit ? headerSplit.after : content;
  const candidates = splitExampleCandidates(exampleSource);
  const examples = [];
  const explanation = [];

  if (headerSplit?.before) {
    explanation.push(...splitParagraphs(headerSplit.before));
  }

  candidates.forEach((candidate) => {
    const parsed = parseExampleCard(candidate);
    const isExample = Boolean(headerSplit) || Boolean(parsed.english) || connectorBoundary.test(candidate);

    if (isExample) {
      examples.push(parsed);
    } else {
      explanation.push(...splitParagraphs(candidate));
    }
  });

  if (!headerSplit && !examples.length) {
    const sentences = splitSentences(explanationSource);
    const detectedExamples = sentences
      .map(parseExampleCard)
      .filter((example) => example.english);

    if (detectedExamples.length) {
      const exampleOriginals = new Set(detectedExamples.map((example) => example.original));
      return {
        explanation: sentences.filter((sentence) => !exampleOriginals.has(sentence)),
        examples: detectedExamples,
      };
    }
  }

  return {
    explanation: explanation.length ? explanation : splitParagraphs(explanationSource),
    examples,
  };
}

function normalizeSections(lesson) {
  const sections = Array.isArray(lesson?.sections) ? lesson.sections : [];
  const normalized = sections.map((section, index) => ({
    title: cleanText(section?.title || section?.heading || `Parte ${index + 1}`),
    content: cleanText(section?.content || section?.text || section?.body || section?.explanation || ''),
  })).filter((section) => section.title || section.content);

  return normalized.length ? normalized : fallbackSections;
}

function normalizeTips(lesson) {
  const tips = Array.isArray(lesson?.tips) ? lesson.tips : [];
  const cleanTips = tips.map((tip) => cleanText(typeof tip === 'string' ? tip : tip?.text || tip?.tip || '')).filter(Boolean);
  return cleanTips.length ? cleanTips : fallbackTips;
}

function ExampleCard({ example, index }) {
  return (
    <article className="grammar-professor-example-card">
      <span className="grammar-example-index">Exemplo {index + 1}</span>
      {example.english ? <strong className="grammar-example-english">{example.english}</strong> : null}
      {example.translation ? <p className="grammar-example-translation">{example.translation}</p> : null}
      {example.explanation ? <p className="grammar-example-explanation">{example.explanation}</p> : null}
      {!example.english && !example.explanation ? <p className="grammar-example-explanation">{example.original}</p> : null}
    </article>
  );
}

function SectionContent({ content }) {
  const hasExampleHeader = Boolean(splitByExampleHeader(content));
  const numbered = hasExampleHeader ? null : splitNumberedList(content);

  if (numbered) {
    return (
      <div className="grammar-deep-content">
        {numbered.intro ? <p>{numbered.intro}</p> : null}
        <ul className="grammar-guided-list">
          {numbered.items.map((item, index) => <li key={`${item}-${index}`}>{item}</li>)}
        </ul>
      </div>
    );
  }

  const { explanation, examples } = collectProfessorExamples(content);
  return (
    <div className="grammar-deep-content grammar-readable-content">
      {explanation.length ? explanation.map((paragraph, index) => <p key={`${paragraph}-${index}`}>{paragraph}</p>) : <p>{cleanText(content)}</p>}
      {examples.length ? (
        <div className="grammar-example-stack grammar-professor-examples">
          <div className="grammar-example-heading">Exemplos do professor</div>
          <div className="grammar-example-card-list">
            {examples.map((example, index) => <ExampleCard key={`${example.original}-${index}`} example={example} index={index} />)}
          </div>
        </div>
      ) : null}
    </div>
  );
}

export function GrammarLesson({ lesson }) {
  const [writtenAnswer, setWrittenAnswer] = useState('');
  const [completed, setCompleted] = useState(false);
  const [completionMessage, setCompletionMessage] = useState('');
  const sections = useMemo(() => normalizeSections(lesson), [lesson]);
  const tips = useMemo(() => normalizeTips(lesson), [lesson]);

  useEffect(() => {
    setWrittenAnswer(getLessonDraft(lesson?.id || lesson?.title || 'grammar'));
    setCompleted(isLessonCompleted(lesson));
    setCompletionMessage(isLessonCompleted(lesson) ? 'Esta aula já foi concluída.' : '');
  }, [lesson?.id, lesson?.title]);

  function handleSaveDraft() {
    saveLessonDraft({ lesson, answer: writtenAnswer });
    setCompletionMessage('Rascunho salvo.');
  }

  function handleCompleteLesson() {
    const result = completeLesson({ lesson, answers: {}, writtenAnswer });
    setCompleted(true);
    setCompletionMessage(result.alreadyCompleted ? 'Aula já estava concluída. Progresso mantido.' : '+25 XP. Grammar concluída e progresso salvo.');
  }

  return (
    <article className="grammar-layout grammar-lesson-v1 grammar-deep-lesson-v2">
      <Card
        eyebrow={`Grammar profunda · ${lesson.level}`}
        title={lesson.title}
        action={<ProgressPill current={completed ? 5 : 2} total={5} label={completed ? 'Concluída' : 'Estudo'} />}
      >
        <div className="lesson-intro-grid">
          <p>{cleanText(lesson?.intro || lesson?.subtitle || 'Nesta aula, você vai estudar o tema em profundidade, com explicação guiada, exemplos e prática ativa.')}</p>
          <div className="lesson-objective-card">
            <Target size={18} />
            <span>Objetivo real</span>
            <strong>{cleanText(lesson?.objective || lesson?.raw?.objective || 'Entender a regra, reconhecer padrões e produzir frases próprias com segurança.')}</strong>
          </div>
        </div>
      </Card>

      <section className="grammar-study-grid">
        <div className="grammar-main-panel">
          <div className="panel-title"><BookOpenCheck size={18} /> Aula guiada do professor</div>
          <div className="grammar-section-list">
            {sections.map((section, index) => (
              <article className="grammar-rule-card grammar-deep-card" key={`${section.title}-${index}`}>
                <span>Momento {index + 1}</span>
                <strong>{section.title}</strong>
                <SectionContent content={section.content} />
              </article>
            ))}
          </div>
        </div>

        <aside className="grammar-side-panel">
          <div className="mini-card">
            <div className="panel-title"><Lightbulb size={18} /> Como estudar</div>
            <ul>
              {tips.map((tip, index) => <li key={`${tip}-${index}`}>{tip}</li>)}
            </ul>
          </div>
          <div className="mini-card grammar-warning-card">
            <div className="panel-title"><Sparkles size={18} /> Prática profunda</div>
            <p>Leia a explicação completa primeiro. Depois use “Começar prática” para provar domínio com exercícios em tela cheia.</p>
          </div>
        </aside>
      </section>

      <section className="answer-card guided-answer-card">
        <div className="panel-title"><MessageSquareText size={18} /> Produção própria</div>
        <label className="answer-label" htmlFor="grammar-answer">
          Depois da Prática Profunda, escreva 3 a 6 frases suas usando a regra da aula. Tente criar frases reais sobre você.
        </label>
        <textarea
          id="grammar-answer"
          name="grammar-answer"
          inputMode="text"
          autoCapitalize="sentences"
          autoCorrect="on"
          spellCheck="true"
          placeholder="Write your own sentences using today's grammar..."
          value={writtenAnswer}
          onChange={(event) => setWrittenAnswer(event.target.value)}
        />
        <div className="answer-actions">
          <button type="button" className="secondary-button" onClick={handleSaveDraft}><PencilLine size={16} /> Salvar rascunho</button>
          <button type="button" className="primary-button" onClick={handleCompleteLesson}><CheckCircle2 size={16} /> {completed ? 'Aula concluída' : 'Concluir Grammar'}</button>
        </div>
        {completionMessage ? <p className="generator-message completion-message">{completionMessage}</p> : null}
      </section>
    </article>
  );
}
