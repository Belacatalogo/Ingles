import { A2_SRS_TAGS } from './a2Tags.js';
import { B1_SRS_TAGS } from './b1Tags.js';
import { B2_SRS_TAGS } from './b2Tags.js';
import { C1_SRS_TAGS } from './c1Tags.js';
import { C2_SRS_TAGS } from './c2Tags.js';

const ALL_SRS_TAGS = {
  ...A2_SRS_TAGS,
  ...B1_SRS_TAGS,
  ...B2_SRS_TAGS,
  ...C1_SRS_TAGS,
  ...C2_SRS_TAGS,
};

const KNOWN_PILLARS = new Set([
  'grammar', 'vocabulary', 'reading', 'listening', 'speaking', 'writing', 'checkpoint',
]);

export function getSrsTagsForLesson(lessonId) {
  return ALL_SRS_TAGS[String(lessonId || '')] || [];
}

// Returns true when tags already contain a pedagogically valid pillar at index 1.
export function hasPedagogicalTags(tags) {
  return Array.isArray(tags) && tags.length >= 3 && KNOWN_PILLARS.has(tags[1]);
}
