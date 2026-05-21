import fs from 'node:fs';
import path from 'node:path';
import {
  getTotalVocabularyBankCount,
  getVocabularyBankAudit,
  getVocabularyDeckCards,
  getVocabularyDecks,
  VOCABULARY_BANK_TARGET,
} from '../../src/services/vocabularyDecks.js';

const OUT_DIR = path.resolve('docs/vocabulary');
const JSON_PATH = path.join(OUT_DIR, 'vocabulary-bank-audit-latest.json');
const MD_PATH = path.join(OUT_DIR, 'vocabulary-bank-audit-latest.md');

function pct(value, total) {
  if (!total) return 0;
  return Math.round((Number(value || 0) / total) * 100);
}

function sortObjectEntries(object = {}) {
  return Object.entries(object).sort(([a], [b]) => String(a).localeCompare(String(b)));
}

function cardsByDeck() {
  return getVocabularyDecks().map((deck) => ({
    id: deck.id,
    title: deck.title,
    level: deck.level,
    topic: deck.topic,
    count: getVocabularyDeckCards(deck.id).length,
  }));
}

function groupBy(items, key) {
  return items.reduce((acc, item) => {
    const value = item[key] || 'unknown';
    acc[value] = acc[value] || [];
    acc[value].push(item);
    return acc;
  }, {});
}

function markdownTable(rows, headers) {
  if (!rows.length) return '_Nenhum item._';
  const head = `| ${headers.join(' | ')} |`;
  const divider = `| ${headers.map(() => '---').join(' | ')} |`;
  const body = rows.map((row) => `| ${headers.map((header) => String(row[header] ?? '').replace(/\|/g, '\\|')).join(' | ')} |`);
  return [head, divider, ...body].join('\n');
}

function topIssues(issues = [], limit = 30) {
  return issues.slice(0, limit).map((item) => ({
    severity: item.severity,
    type: item.type,
    level: item.level,
    deck: item.deck,
    word: item.word,
    message: item.message,
  }));
}

function buildReport() {
  const generatedAt = new Date().toISOString();
  const audit = getVocabularyBankAudit();
  const decks = cardsByDeck();
  const byLevel = groupBy(decks, 'level');
  const byTopic = groupBy(decks, 'topic');
  const cards = getTotalVocabularyBankCount();
  const gap = Math.max(0, VOCABULARY_BANK_TARGET - cards);

  const levelRows = sortObjectEntries(audit.countsByLevel).map(([level, count]) => ({
    level,
    cards: count,
    decks: byLevel[level]?.length || 0,
    share: `${pct(count, cards)}%`,
  }));

  const topicRows = sortObjectEntries(audit.countsByTopic || {}).map(([topic, count]) => ({
    topic,
    cards: count,
    decks: byTopic[topic]?.length || 0,
  }));

  const smallestDecks = [...decks].sort((a, b) => a.count - b.count).slice(0, 12);
  const largestDecks = [...decks].sort((a, b) => b.count - a.count).slice(0, 12);

  const status = {
    generatedAt,
    target: VOCABULARY_BANK_TARGET,
    cards,
    decks: decks.length,
    gap,
    completionPercent: audit.completionPercent,
    countsByLevel: audit.countsByLevel,
    countsByTopic: audit.countsByTopic,
    bySeverity: audit.bySeverity,
    passedStructure: audit.passedStructure,
    passedChunks: audit.passedChunks,
    passedDuplicates: audit.passedDuplicates,
    passedPedagogicalAudit: audit.passedPedagogicalAudit,
    duplicatesCount: audit.duplicates.length,
    repeatedTranslationsCount: audit.repeatedTranslations.length,
    structuralIssuesCount: audit.structuralIssues.length,
    chunkIssuesCount: audit.chunkIssues.length,
    pedagogicalIssuesCount: audit.pedagogicalIssues.length,
    levelRows,
    topicRows,
    smallestDecks,
    largestDecks,
    topDuplicates: audit.duplicates.slice(0, 30),
    topRepeatedTranslations: audit.repeatedTranslations.slice(0, 30),
    topIssues: topIssues(audit.pedagogicalIssues),
  };

  return status;
}

function buildMarkdown(report) {
  return `# Vocabulary Bank Audit — latest

Gerado em: ${report.generatedAt}

## Resumo

- Target planejado: ${report.target} cards.
- Cards atuais: ${report.cards}.
- Decks atuais: ${report.decks}.
- Gap até o target: ${report.gap}.
- Completion: ${report.completionPercent}%.

## Gates

- Estrutura crítica: ${report.passedStructure ? 'PASS' : 'FAIL'}.
- Chunks/collocations: ${report.passedChunks ? 'PASS' : 'FAIL'}.
- Duplicatas graves: ${report.passedDuplicates ? 'PASS' : 'FAIL'}.
- Auditoria pedagógica: ${report.passedPedagogicalAudit ? 'PASS' : 'FAIL'}.

## Issues

- Por severidade: ${JSON.stringify(report.bySeverity)}.
- Issues estruturais: ${report.structuralIssuesCount}.
- Issues de chunk: ${report.chunkIssuesCount}.
- Issues pedagógicas totais: ${report.pedagogicalIssuesCount}.
- Duplicatas: ${report.duplicatesCount}.
- Traduções repetidas: ${report.repeatedTranslationsCount}.

## Distribuição por nível

${markdownTable(report.levelRows, ['level', 'cards', 'decks', 'share'])}

## Distribuição por tópico

${markdownTable(report.topicRows, ['topic', 'cards', 'decks'])}

## Menores decks

${markdownTable(report.smallestDecks, ['level', 'topic', 'id', 'title', 'count'])}

## Maiores decks

${markdownTable(report.largestDecks, ['level', 'topic', 'id', 'title', 'count'])}

## Top duplicatas

${markdownTable(report.topDuplicates.map((item) => ({ word: item.word, count: item.count, levels: item.levels?.join(', '), decks: item.decks?.slice(0, 6).join(', ') })), ['word', 'count', 'levels', 'decks'])}

## Top traduções repetidas

${markdownTable(report.topRepeatedTranslations, ['translation', 'count'])}

## Top issues

${markdownTable(report.topIssues, ['severity', 'type', 'level', 'deck', 'word', 'message'])}

## Próxima ação recomendada

1. Corrigir qualquer issue crítica/major antes de adicionar volume novo.
2. Expandir primeiro os níveis com menor cobertura relativa.
3. Preservar exemplos naturais contendo a palavra alvo.
4. Manter chunks com pelo menos duas palavras e presentes literalmente na frase.
5. Evitar novas duplicatas acima do limite pedagógico.
`;
}

fs.mkdirSync(OUT_DIR, { recursive: true });
const report = buildReport();
fs.writeFileSync(JSON_PATH, `${JSON.stringify(report, null, 2)}\n`);
fs.writeFileSync(MD_PATH, buildMarkdown(report));
console.log(`[vocab-audit] Wrote ${JSON_PATH}`);
console.log(`[vocab-audit] Wrote ${MD_PATH}`);
console.log(`[vocab-audit] ${report.cards}/${report.target} cards · ${report.decks} decks · gap ${report.gap}`);
if (!report.passedPedagogicalAudit) {
  console.warn('[vocab-audit] Pedagogical audit has critical/major issues. Review docs/vocabulary/vocabulary-bank-audit-latest.md.');
}
