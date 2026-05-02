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
    content: 'Exemplos do professor: 1. I work every day. Eu trabalho todos os dias. 2. She studies English. Ela estuda inglês. 3. They live here. Eles moram aqui.',
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
  'Outro lado',
  'Outro',
  'Veja',
  'Assim',
  'Portanto',
  'Além disso',
  'Na prática',
  'Observe',
  'Agora',
  'No entanto',
  'Diferente disso',
];

const exampleHeaderPattern = /\b(Exemplos? do professor|Exemplos? guiados|Exemplos? práticos|Exemplos?)\s*:?\s*/i;
const englishStarterPattern = /^(?:I|You|He|She|It|We|They|This|That|The|A|An|My|Your|His|Her|Our|Their|There|Am|Is|Are|Do|Does|Did|Can|Could|Will|Would|Should|Have|Has|Had)\b/;
const englishFunctionWords = /\b(?:am|are|is|was|were|have|has|had|do|does|did|can|could|will|would|should|must|not|very|from|here|there|today|every|with|for|to|in|on|at|the|a|an|my|your|his|her|our|their|student|doctor|teacher|happy|sad|ready|kind|book|car|table|home|class|Brazil|English)\b/i;
const portugueseSignals = /\b(?:eu|ele|ela|n[oó]s|voc[eê]|voc[eê]s|eles|elas|estou|est[aá]|estamos|feliz|m[eé]dica|m[eé]dico|profiss[aã]o|estado|descreve|indicar|posse|pertence|algu[eé]m|carro|livro|mesa|exemplo|correto|pois|porque|verbo|frase|regra|aluno|brasileiro|portugu[eê]s|ingl[eê]s|pessoa|pessoas|outro|lado|no entanto|diferente|amigo|amigos|novo|nova|gentil|todos|todas|aqui)\b/i;
const translationStarterPattern = /^(?:Eu|Ele|Ela|Nós|Nos|Eles|Elas|Você|Vocês|O|A|Os|As|Meu|Minha|Seu|Sua|Isso|Este|Esta|Esse|Essa)\b/;
const bareBePattern = /^(?:I am|You are|He is|She is|It is|We are|They are|I'm|You're|He's|She's|It's|We're|They're)$/i;
const exampleOverflowPattern = /(?:^|\s)(?=(?:Já|Outro exemplo|Outro lado|Outro|No entanto|Diferente disso)\b\s*["'“”]?(?:I|You|He|She|It|We|They|This|That|The|A|An|My|Your|His|Her|Our|Their)\b)/i;

function normalizeVisualSpacing(value) {
  const connectorPatternText = connectorBreaks.join('|');

  return String(value ?? '')
    .replace(/\*\*(.*?)\*\*/g, '$1')
    .replace(/\r\n/g, '\n')
    .replace(/^\s*[-*]\s+/gm, '')
    .replace(/([.!?])(?=[A-ZÁÉÍÓÚÂÊÔÃÕÇ])/g, '$1 ')
    .replace(/\)(?=(Já|Outro exemplo|Outro lado|Outro|Veja|Assim|Portanto|Além disso|Na prática|Observe|Agora|No entanto|Diferente disso)\b)/g, ') ')
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

function splitParagraphs(text) {
  const clean = cleanText(text);
  if (!clean) return [];

  const hardBreaks = clean
    .split(/\n{2,}/g)
    .map((part) => part.trim())
    .filter(Boolean);

  const source = hardBreaks.length ? hardBreaks : [clean];
  return source.flatMap((paragraph) => {
    if (paragraph.length <= 230) return [paragraph];
    return paragraph
      .split(/(?<=[.!?])\s+(?=(?:Já|Outro|Veja|Assim|Portanto|Além disso|Na prática|Observe|Agora|No entanto|Diferente disso)\b)/g)
      .map((part) => part.trim())
      .filter(Boolean);
  });
}

function splitNumberedList(text) {
  const clean = cleanText(text);
  const matches = [...clean.matchAll(/(?:^|\s)(\d+[.)]\s+)/g)];
  if (matches.length < 2) return null;

  const firstIndex = matches[0].index || 0;
  const intro = clean.slice(0, firstIndex).trim();
  const items = [];

  matches.forEach((match, index) => {
    const start = (match.index || 0) + match[0].length;
    const end = index + 1 < matches.length ? matches[index + 1].index : clean.length;
    const item = clean.slice(start, end).trim();
    if (item) items.push(item);
  });

  return items.length >= 2 ? { intro, items } : null;
}

function splitByExampleHeader(text) {
  const clean = cleanText(text);
  const match = clean.match(exampleHeaderPattern);
  if (!match || typeof match.index !== 'number') return null;

  return {
    before: clean.slice(0, match.index).replace(/\bPor exemplo\s*:?\s*$/i, '').replace(/\bPor\s*$/i, '').trim(),
    after: clean.slice(match.index + match[0].length).trim(),
  };
}

function splitExampleCandidates(text) {
  const clean = cleanText(text);
  if (!clean) return [];

  const numbered = splitNumberedList(clean);
  if (numbered?.items?.length) return numbered.items;

  const labeled = clean
    .split(/\n{2,}|(?=\bExemplo\s+\d+\b\s*:?)|(?=\bExample\s+\d+\b\s*:?)|(?=\s+[•-]\s+)/gi)
    .map((item) => item.replace(/^\s*(?:Exemplo|Example)\s+\d+\s*:?\s*/i, '').replace(/^\s*[•-]\s*/, '').trim())
    .filter(Boolean);

  if (labeled.length > 1) return labeled;
  return clean.split(/\n+/g).map((item) => item.trim()).filter(Boolean);
}

function looksLikeCompleteEnglish(text) {
  const value = stripQuotes(text).replace(/[.!?]+$/, '').trim();
  if (!value || bareBePattern.test(value)) return false;
  if (!englishStarterPattern.test(value)) return false;
  if (/[áàâãéêíóôõúç]/i.test(value) || portugueseSignals.test(value)) return false;

  const words = value.split(/\s+/).filter(Boolean);
  return words.length >= 3 && words.length <= 18 && englishFunctionWords.test(value);
}

function looksLikePortugueseTranslation(text) {
  const value = stripQuotes(text);
  if (!value || looksLikeCompleteEnglish(value)) return false;
  if (/^(correto|pois|porque|aqui|cada|o erro|lembre-se|para perguntar|descreve|mostra|indica)\b/i.test(value)) return false;
  return /[áàâãéêíóôõúç]/i.test(value) || translationStarterPattern.test(value);
}

function findEnglishLead(text) {
  const clean = cleanText(text).replace(/^[,.;:\s]+/, '').trim();
  if (!clean) return null;

  const firstLine = clean.split(/\n+/)[0].trim();
  if (looksLikeCompleteEnglish(firstLine)) {
    return {
      english: stripQuotes(firstLine),
      rest: clean.slice(firstLine.length).trim(),
    };
  }

  const parenthetical = clean.match(/^([A-Z][A-Za-z0-9'\s,.!?-]{4,120}?)\s*\(([^)]{2,140})\)\s*(.*)$/);
  if (parenthetical && looksLikeCompleteEnglish(parenthetical[1])) {
    return {
      english: stripQuotes(parenthetical[1]),
      translation: cleanText(parenthetical[2]),
      rest: cleanText(parenthetical[3]),
    };
  }

  const quotedLead = clean.match(/^["'“”]([^"'“”]{4,120})["'“”]\s*(.*)$/);
  if (quotedLead && looksLikeCompleteEnglish(quotedLead[1])) {
    return {
      english: stripQuotes(quotedLead[1]),
      rest: cleanText(quotedLead[2]),
    };
  }

  const sentenceLead = clean.match(/^([A-Z][A-Za-z0-9'\s-]{4,100}[.!?])\s+(.*)$/);
  if (sentenceLead && looksLikeCompleteEnglish(sentenceLead[1])) {
    return {
      english: stripQuotes(sentenceLead[1]),
      rest: cleanText(sentenceLead[2]),
    };
  }

  return null;
}

function splitExampleOverflow(explanation) {
  const clean = cleanText(explanation);
  if (!clean) return { explanation: '', overflow: '' };

  const match = clean.match(exampleOverflowPattern);
  if (!match || typeof match.index !== 'number') {
    return { explanation: clean, overflow: '' };
  }

  return {
    explanation: clean.slice(0, match.index).trim(),
    overflow: clean.slice(match.index).trim(),
  };
}

function extractTranslation(rest) {
  const clean = cleanText(rest).replace(/^[,.;:\s]+/, '').trim();
  if (!clean) return { translation: '', explanation: '' };

  const explicit = clean.match(/^(?:significa|quer dizer|traduzindo|em portugu[eê]s)\s*["'“”]?(.+?)["'“”]?\s*(?:\.|$)(.*)$/i);
  if (explicit && looksLikePortugueseTranslation(explicit[1])) {
    return {
      translation: cleanText(explicit[1]),
      explanation: cleanText(explicit[2]),
    };
  }

  const sentenceParts = clean.split(/(?<=[.!?])\s+/).map((part) => part.trim()).filter(Boolean);
  if (sentenceParts.length && looksLikePortugueseTranslation(sentenceParts[0])) {
    return {
      translation: stripQuotes(sentenceParts[0]),
      explanation: cleanText(sentenceParts.slice(1).join(' ')),
    };
  }

  return { translation: '', explanation: clean };
}

function parseExampleCard(rawExample) {
  const original = cleanText(rawExample).replace(/^[,.;:\s]+/, '').replace(/^\s*(?:Exemplo|Example)\s+\d+\s*:?\s*/i, '').trim();
  const englishLead = findEnglishLead(original);

  if (!englishLead) {
    return { original, english: '', translation: '', explanation: original, overflow: '' };
  }

  const translationResult = englishLead.translation
    ? { translation: englishLead.translation, explanation: englishLead.rest }
    : extractTranslation(englishLead.rest);
  const safeExplanation = splitExampleOverflow(translationResult.explanation);

  return {
    original,
    english: englishLead.english,
    translation: translationResult.translation,
    explanation: safeExplanation.explanation,
    overflow: safeExplanation.overflow,
  };
}

function collectProfessorExamples(content) {
  const headerSplit = splitByExampleHeader(content);
  if (!headerSplit) {
    return {
      explanation: splitParagraphs(content),
      examples: [],
      afterExamples: [],
    };
  }

  const explanation = splitParagraphs(headerSplit.before);
  const candidates = splitExampleCandidates(headerSplit.after);
  const examples = [];
  const afterExamples = [];

  candidates.forEach((candidate) => {
    const parsed = parseExampleCard(candidate);
    if (parsed.english) {
      examples.push(parsed);
      if (parsed.overflow) {
        afterExamples.push(...splitParagraphs(parsed.overflow));
      }
    } else {
      afterExamples.push(...splitParagraphs(parsed.explanation));
    }
  });

  return {
    explanation,
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
      <strong className="grammar-example-english">{example.english}</strong>
      {example.translation ? <p className="grammar-example-translation">{example.translation}</p> : null}
      {example.explanation ? <p className="grammar-example-explanation">{example.explanation}</p> : null}
    </article>
  );
}

function ParagraphList({ paragraphs, fallback }) {
  const safeParagraphs = paragraphs?.length ? paragraphs : splitParagraphs(fallback);
  return safeParagraphs.map((paragraph, index) => <p key={`${paragraph}-${index}`}>{paragraph}</p>);
}

function SectionContent({ content }) {
  const hasExampleHeader = Boolean(splitByExampleHeader(content));
  const numbered = hasExampleHeader ? null : splitNumberedList(content);

  if (numbered) {
    return (
      <div className="grammar-deep-content grammar-readable-content">
        {numbered.intro ? <p>{numbered.intro}</p> : null}
        <ul className="grammar-guided-list">
          {numbered.items.map((item, index) => <li key={`${item}-${index}`}>{item}</li>)}
        </ul>
      </div>
    );
  }

  const { explanation, examples, afterExamples } = collectProfessorExamples(content);

  return (
    <div className="grammar-deep-content grammar-readable-content grammar-renderer-v3">
      <ParagraphList paragraphs={explanation} fallback={content} />
      {examples.length ? (
        <div className="grammar-example-stack grammar-professor-examples">
          <div className="grammar-example-heading">Exemplos do professor</div>
          <div className="grammar-example-card-list">
            {examples.map((example, index) => <ExampleCard key={`${example.original}-${index}`} example={example} index={index} />)}
          </div>
        </div>
      ) : null}
      {afterExamples.length ? <ParagraphList paragraphs={afterExamples} fallback="" /> : null}
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
    <article className="grammar-layout grammar-lesson-v1 grammar-deep-lesson-v2 grammar-renderer-system-v3 grammar-renderer-overflow-v4">
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
