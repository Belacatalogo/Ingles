/**
 * Quality validator for static practice exercises.
 * Run with: node e2e/validateExerciseQuality.mjs
 * Checks all lessons in the curriculum for structural exercise quality issues.
 */
import { findStaticLesson, CURRICULUM_LEVELS, CURRICULUM_PILLARS, getStaticLessons } from '../src/content/curriculum/index.js';
import { buildStaticPracticeItems } from '../src/practice/staticPracticeAdapter.js';

const CRITICAL_TYPES = ['choice', 'listenChoice', 'fillBlank'];
const RENDERABLE_PILLARS = ['grammar', 'vocabulary', 'reading', 'writing'];

let totalLessons = 0;
let totalExercises = 0;
let totalCritical = 0;
let totalWarnings = 0;
const report = [];

function checkItem(item, lessonId, pillar, level) {
  const issues = [];
  if (!item.prompt || item.prompt.includes('[object Object]')) issues.push({ sev: 'CRITICAL', msg: 'Empty or [object Object] prompt' });
  if (!item.answer || item.answer.includes('[object Object]')) issues.push({ sev: 'CRITICAL', msg: 'Empty or [object Object] answer' });
  if (CRITICAL_TYPES.includes(item.type) && item.options.length < 2) issues.push({ sev: 'CRITICAL', msg: `${item.type} has ${item.options.length} options (needs ≥2)` });
  if (item.type === 'choice' && !item.options.some(o => o.toLowerCase() === item.answer.toLowerCase())) issues.push({ sev: 'WARNING', msg: 'Answer not in options list' });
  if (item.prompt === item.answer && item.type === 'write') issues.push({ sev: 'WARNING', msg: 'Prompt equals answer (self-referential write)' });
  if (item.answer.length > 200) issues.push({ sev: 'WARNING', msg: `Answer too long: ${item.answer.length} chars` });
  return issues;
}

for (const level of CURRICULUM_LEVELS) {
  const lessons = getStaticLessons(level);
  for (const lesson of lessons) {
    if (!RENDERABLE_PILLARS.includes(lesson.pillar)) continue;
    totalLessons++;
    const items = buildStaticPracticeItems(lesson);
    totalExercises += items.length;

    const lessonIssues = [];
    if (items.length === 0) {
      lessonIssues.push({ sev: 'CRITICAL', msg: 'Zero exercises generated' });
      totalCritical++;
    } else if (items.length < 5) {
      lessonIssues.push({ sev: 'WARNING', msg: `Only ${items.length} exercises (below minimum 5)` });
      totalWarnings++;
    }

    for (const item of items) {
      const itemIssues = checkItem(item, lesson.id, lesson.pillar, level);
      for (const issue of itemIssues) {
        lessonIssues.push({ ...issue, exercise: `[${item.type}] ${item.prompt.slice(0, 50)}` });
        if (issue.sev === 'CRITICAL') totalCritical++;
        else totalWarnings++;
      }
    }

    if (lessonIssues.length > 0) {
      report.push({ level, pillar: lesson.pillar, lessonId: lesson.id, title: lesson.title, exerciseCount: items.length, issues: lessonIssues });
    }
  }
}

// Print report
console.log('\n=== EXERCISE QUALITY VALIDATOR REPORT ===\n');
console.log(`Total renderable lessons: ${totalLessons}`);
console.log(`Total exercises generated: ${totalExercises}`);
console.log(`Average per lesson: ${(totalExercises / totalLessons).toFixed(1)}`);
console.log(`Critical issues: ${totalCritical}`);
console.log(`Warnings: ${totalWarnings}`);
console.log('');

if (report.length === 0) {
  console.log('✅ No issues found!');
} else {
  console.log(`Lessons with issues: ${report.length}\n`);
  for (const entry of report) {
    const critCount = entry.issues.filter(i => i.sev === 'CRITICAL').length;
    const warnCount = entry.issues.filter(i => i.sev === 'WARNING').length;
    const badge = critCount > 0 ? '🔴 CRITICAL' : '🟡 WARNING';
    console.log(`${badge} ${entry.level}/${entry.pillar} | ${entry.lessonId} | "${entry.title?.slice(0, 50)}" | ${entry.exerciseCount} exercises`);
    for (const issue of entry.issues) {
      const prefix = issue.sev === 'CRITICAL' ? '  ❌' : '  ⚠️';
      const ctx = issue.exercise ? ` → ${issue.exercise}` : '';
      console.log(`${prefix} ${issue.msg}${ctx}`);
    }
    console.log('');
  }
}

// Matrix summary
console.log('\n=== MATRIX SUMMARY (exercises per level/pillar) ===\n');
console.log('Level    | grammar | vocabulary | reading | writing');
console.log('---------|---------|------------|---------|--------');
for (const level of CURRICULUM_LEVELS) {
  const lessons = getStaticLessons(level);
  const row = {};
  for (const pillar of RENDERABLE_PILLARS) {
    const pillarLessons = lessons.filter(l => l.pillar === pillar);
    if (pillarLessons.length === 0) { row[pillar] = 'N/A'; continue; }
    const counts = pillarLessons.slice(0, 3).map(l => buildStaticPracticeItems(l).length);
    const avg = counts.reduce((a, b) => a + b, 0) / counts.length;
    row[pillar] = `${avg.toFixed(0)} (${pillarLessons.length}L)`;
  }
  console.log(`${level.padEnd(9)}| ${String(row.grammar||'-').padEnd(8)}| ${String(row.vocabulary||'-').padEnd(11)}| ${String(row.reading||'-').padEnd(8)}| ${row.writing||'-'}`);
}

process.exit(totalCritical > 0 ? 1 : 0);
