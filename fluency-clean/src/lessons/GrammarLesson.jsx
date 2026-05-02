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

const englishSignals = /\b(I|you|he|she|it|we|they|am|are|is|was|were|have|has|had|do|does|did|can|could|will|would|should|must|student|doctor|brazilian|happy|car|book|home|lunch|ready|kind|friends|table|class|Brazil|from|here|good|new)\b/i;
const strictEnglishPattern = /\b(?:I\s+am|I'm|You\s+are|You're|He\s+is|He's|She\s+is|She's|It\s+is|It's|We\s+are|We're|They\s+are|They're|Am\s+I|Is\s+(?:he|she|it|you|we|they|the|this|that|there|[A-Z][a-z]+)|Are\s+(?:you|we|they|there|the|these|those|[A-Z][a-z]+)|The\s+\w+\s+is|This\s+\w+\s+is|That\s+\w+\s+is)\b/i;
const portugueseMixSignals = /\b(correto|pois|combina|com|para|fixar|significa|exemplo|outro|cada|desses|demonstra|regra|portugu[eê]s|verbo|muda|termina[cç][aã]o|forma|falantes|brasileiros|pergunta|frase|aqui|dizendo|como|lembre-se|garante|quest[aã]o|classe|alunos|esquecer|sempre|antes|sujeito|pode|ser|substitu[ií]do|pronto|mesa|livro|gentil|todos|novo|estudante|ela|ele|eles|elas|n[oó]s|voc[eê]|isso|essa|esses|essas|uma|um|o|a|os|as)\b/i;
const shortCuePattern = /^(?:para fixar|exemplo|outro exemplo|frase|modelo)\s*:?$/i;
const connectorPatternText = connectorBreaks.join('|');
const exampleHeaderPattern = /\b(Exemplos? do professor|Exemplos? guiados|Exemplos?)\s*:?\s*/i;

function normalizeVisualSpacing(value) {
  return String(value ?? '')
    .replace(/\*\*(.*?)\*\*/g, '$1')
    .replace(/^\s*[-*]\s+/gm, '')
    .replace(/([.!?])(?=[A-ZÁÉÍÓÚÂÊÔÃÕÇ])/g, '$1 ')
    .replace(/\)(?=(Já|Outro exemplo|Outro|Veja|Assim|Portanto|Além disso|Na prática|Observe|Agora)\b)/g, ') ')
    .replace(/([,;:])(?=\S)/g, '$1 ')
    .replace(new RegExp(`\\s*([.!?])\\s*(?=(${connectorPatternText})\\b)`, 'gi'), '$1\n\n')
    .replace(new RegExp(`\\s+(?=(${connectorPatternText})\\b)`, 'gi'), '\n\n')
    .replace(/\n{3,}/g, '\n\n')
    .replace(/[ \t]{2,}/g, ' ')
    .trim();
}

function cleanText(value) {
  return normalizeVisualSpacing(value);
}

function stripQuotes(value) {
  return cleanText(value).replace(/^["'“”]+|["'“”]+$/g, '').trim();
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
  const value = stripQuotes(text);
  if (!value) return false;
  const words = value.split(/\s+/).filter(Boolean);
  const hasEnglishSignal = englishSignals.test(value);
  const hasPortugueseAccent = /[áàâãéêíóôõúç]/i.test(value);
  const hasPortugueseMix = portugueseMixSignals.test(value);
  return words.length >= 2 && value.length <= 150 && hasEnglishSignal && !hasPortugueseAccent && !hasPortugueseMix && strictEnglishPattern.test(value);
}

function splitByExampleHeader(text) {
  const clean = cleanText(text);
  const match = clean.match(exampleHeaderPattern);
  if (!match || typeof match.index !== 'number') return null;

  const before = clean
    .slice(0, match.index)
    .replace(/\bPor\s*$/i, '')
    .replace(/\bPor exemplo\s*:?\s*$/i, '')
    .trim();
  const after = clean.slice(match.index + match[0].length).trim();
  return { before, after };
}

function splitExampleCandidates(text) {
  return cleanText(text)
    .split(/\n{2,}|\s+(?=\d+[.)]\s+)|\s+(?=[•-]\s+)/gi)
    .map((item) => item.replace(/^\s*(\d+[.)]|[•-])\s*/, '').trim())
    .filter(Boolean);
}

function splitCueFromEnglish(text) {
  const clean = cleanText(text).replace(/^[,.;:\s]+/, '').trim();
  const colonMatch = clean.match(/^([^:]{2,42}:)\s*(.{2,160})$/);
  if (!colonMatch) return null;

  const before = cleanText(colonMatch[1]).replace(/:$/, '').trim();
  const after = stripQuotes(colonMatch[2]);
  if (!looksLikeEnglish(after)) return null;

  return {
    english: after,
    before: shortCuePattern.test(before) ? '' : before,
    after: '',
  };
}

function splitParentheticalEnglish(text) {
  const clean = cleanText(text).replace(/^[,.;:\s]+/, '').trim();
  const parenthetical = clean.match(/^([^(]{2,160}?)\s*\(([^)]{2,160})\)\s*(.*)$/i);

  if (!parenthetical) return null;
  const english = stripQuotes(parenthetical[1]);
  if (!looksLikeEnglish(english)) return null;

  return {
    english,
    translation: cleanText(parenthetical[2]),
    before: '',
    after: cleanText(parenthetical[3]).replace(/^[,.;:\s]+/, '').trim(),
  };
}

function splitQuotedEnglish(text) {
  const clean = cleanText(text).replace(/^[,.;:\s]+/, '').trim();
  const quoteMatches = [...clean.matchAll(/["'“”]([^"'“”]{2,150})["'“”]/g)];
  const match = quoteMatches.find((item) => looksLikeEnglish(item[1]));
  if (!match || typeof match.index !== 'number') return null;

  return {
    english: stripQuotes(match[1]),
    before: cleanText(clean.slice(0, match.index)).replace(/^[,.;:\s]+|[,.;:\s]+$/g, '').trim(),
    after: cleanText(clean.slice(match.index + match[0].length)).replace(/^[,.;:\s]+/, '').trim(),
  };
}

function splitDirectEnglish(text) {
  const clean = stripQuotes(text).replace(/^[,.;:\s]+/, '').trim();
  if (!looksLikeEnglish(clean)) return null;
  return { english: clean, before: '', after: '' };
}

function splitEnglishLead(text) {
  const clean = cleanText(text).replace(/^[,.;:\s]+/, '').trim();
  const result = splitParentheticalEnglish(clean) || splitCueFromEnglish(clean) || splitDirectEnglish(clean) || splitQuotedEnglish(clean);

  if (!result) {
    return { english: '', translation: '', rest: clean };
  }

  const translationResult = extractTranslation(result.after || '');
  const restParts = [result.before, translationResult.rest]
    .map((part) => cleanText(part).replace(/^[,.;:\s]+|[,.;:\s]+$/g, '').trim())
    .filter(Boolean)
    .filter((part) => !shortCuePattern.test(part));

  return {
    english: result.english,
    translation: result.translation || translationResult.translation,
    rest: restParts.join(' '),
  };
}

function extractTranslation(text) {
  const clean = cleanText(text).replace(/^[,.;:\s]+/, '').trim();
  if (!clean) return { translation: '', rest: '' };

  const meaningMatch = clean.match(/^(?:significa|quer dizer|traduzindo)\s*["'“”]?([^"'“”]+?[.!?]?)["'“”]?\s*(.*)$/i);
  if (meaningMatch && looksLikePortugueseTranslation(meaningMatch[1])) {
    return {
      translation: cleanText(meaningMatch[1]),
      rest: cleanText(meaningMatch[2]),
    };
  }

  const sentences = splitSentences(clean);
  if (sentences.length && looksLikePortugueseTranslation(sentences[0])) {
    return {
      translation: stripQuotes(sentences[0]),
      rest: cleanText(sentences.slice(1).join(' ')),
    };
  }

  return { translation: '', rest: clean };
}

function looksLikePortugueseTranslation(text) {
  const value = stripQuotes(text);
  if (!value || looksLikeEnglish(value)) return false;
  if (/^(correto|pois|aqui|cada|em portugu[eê]s|o erro|lembre-se|para perguntar)\b/i.test(value)) return false;
  return /[áàâãéêíóôõúç]/i.test(value) || /^(Eu|Ele|Ela|Nós|Nos|Eles|Elas|Você|Vocês|O|A|Os|As)\b/.test(value);
}

function parseExampleCard(rawExample) {
  const text = cleanText(rawExample).replace(/^[,.;:\s]+/, '').trim();
  const sentences = splitSentences(text);
  const fallback = { original: text, english: '', translation: '', explanation: text };

  for (let index = 0; index < sentences.length; index += 1) {
    const current = sentences[index];
    const parsed = splitEnglishLead(current);
    if (!parsed.english) continue;

    const before = sentences.slice(0, index).join(' ');
    const afterSource = [parsed.rest, ...sentences.slice(index + 1)].filter(Boolean).join(' ');
    const translationResult = parsed.translation ? { translation: parsed.translation, rest: afterSource } : extractTranslation(afterSource);
    const explanation = cleanText([before, translationResult.rest]
      .filter(Boolean)
      .join(' '))
      .replace(/^(,|\.|;|:|significa\s*\.?|quer dizer\s*\.?)\s*/i, '')
      .trim();

    return {
      original: text,
      english: parsed.english,
      translation: translationResult.translation,
      explanation,
    };
  }

  return fallback;
}

function collectProfessorExamples(content) {
  const headerSplit = splitByExampleHeader(content);
  const explanationSource = headerSplit ? headerSplit.before : content;
  const exampleSource = headerSplit ? headerSplit.after : content;
  const candidates = splitExampleCandidates(exampleSource);
  const examples = [];
  const explanation = [];
  const afterExamples = [];

  if (headerSplit?.before) {
    explanation.push(...splitParagraphs(headerSplit.before));
  }

  candidates.forEach((candidate) => {
    const parsed = parseExampleCard(candidate);
    const isExample = Boolean(parsed.english);

    if (isExample) {
      examples.push(parsed);
      return;
    }

    const destination = examples.length ? afterExamples : explanation;
    destination.push(...splitParagraphs(candidate));
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
        afterExamples: [],
      };
    }
  }

  return {
    explanation: explanation.length ? explanation : splitParagraphs(explanationSource),
    examples,
    afterExamples,
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

  const { explanation, examples, afterExamples } = collectProfessorExamples(content);
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
      {afterExamples.length ? afterExamples.map((paragraph, index) => <p key={`after-${paragraph}-${index}`}>{paragraph}</p>) : null}
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
