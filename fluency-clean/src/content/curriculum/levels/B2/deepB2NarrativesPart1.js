import {
  createGrammarLesson,
  createVocabularyLesson,
  createReadingLesson,
  createListeningLesson,
  createSpeakingLesson,
  createWritingLesson,
} from '../../../schemas/index.js';

const level = 'B2';
const status = 'ready';
const common = {
  level,
  status,
  estimatedMinutes: 65,
  tags: ['b2-2', 'narratives', 'past-tenses', 'storytelling', 'deep-approved-target'],
};

// ─── GRAMMAR ────────────────────────────────────────────────────────────────

const grammar004 = createGrammarLesson({
  ...common,
  id: 'B2-GRAMMAR-004',
  title: 'Advanced narrative tenses: past perfect simple vs progressive in stories',
  order: 4,
  theory: {
    explanation: `When telling stories in English, B2 speakers combine four past tenses to show precise timing and perspective. Mastering their interaction is what makes narratives sound natural and sophisticated.

**The four narrative tenses**

| Tense | Form | Core use in narratives |
|---|---|---|
| Simple Past | *walked, said, broke* | Main storyline — the sequence of events |
| Past Continuous | *was walking, were saying* | Background scenes, interrupted actions |
| Past Perfect Simple | *had walked, had broken* | Events that happened BEFORE the main story point |
| Past Perfect Progressive | *had been walking, had been waiting* | Duration of a background action BEFORE the main story point |

**Simple Past vs Past Continuous in narrative**

The Simple Past gives us the foreground — the main plot events in order. The Past Continuous paints the background that was already in progress when those events occurred.

> *She was reading by the window when the phone rang.*
> — "was reading" = background; "rang" = main plot event

**Past Perfect Simple vs Past Perfect Progressive**

Both look backwards from a story moment. The difference is emphasis:

- **Past Perfect Simple** → completed action (focuses on the result or fact that it happened)
  > *He had locked the door before leaving.* — action completed, result matters
  > *She had already eaten, so she wasn't hungry.* — completion before another moment

- **Past Perfect Progressive** → duration of an ongoing action before the story moment (focuses on how long something had been happening)
  > *She had been waiting for two hours when he finally arrived.* — duration, ongoing before arrival
  > *His hands were dirty because he had been working in the garden.* — explains a visible result through duration

**Key temporal connectors in narrative**

These words signal the relationship between narrative tenses:

| Connector | Use | Example |
|---|---|---|
| *by the time* | deadline point for a past action | *By the time we arrived, the show had started.* |
| *once* | completion triggers next event | *Once she had read the letter, she sat down quietly.* |
| *as soon as* | immediate sequence | *As soon as he saw her, he knew something was wrong.* |
| *no sooner…than* | immediate (inverted, formal) | *No sooner had he sat down than the alarm went off.* |
| *while / as* | simultaneous ongoing actions | *While he was talking, she was watching him carefully.* |
| *before / after* | sequence marker | *After they had argued for an hour, she left.* |
| *until* | up to a point | *She had been hiding there until someone found her.* |

**Combining all four: a model paragraph**

> *It was almost midnight. The streets were empty, and a light rain was falling. Tom had been driving for six hours and his eyes were beginning to close. He had planned to stop in Bristol, but he had missed the exit. Just as he was about to pull over, he saw a sign for a motel.*

Breakdown:
- *was… falling* → background (Past Continuous)
- *had been driving* → duration before the story moment (Past Perfect Progressive)
- *had planned, had missed* → completed backstory (Past Perfect Simple)
- *was about to pull over, saw* → main story sequence (Past Continuous / Simple Past)`,

    brazilianMistakes: [
      {
        wrong: "When I arrived, the party finished.",
        right: "When I arrived, the party had finished.",
        explanation: "The party ending happened BEFORE you arrived — use Past Perfect to show that prior event.",
      },
      {
        wrong: "She was waiting since three hours when he came.",
        right: "She had been waiting for three hours when he arrived.",
        explanation: "'Since' requires a time point (since 3pm), 'for' requires a duration (for three hours). Duration before another past event → Past Perfect Progressive.",
      },
      {
        wrong: "He already ate when we invited him.",
        right: "He had already eaten when we invited him.",
        explanation: "Past Perfect is required for actions completed before a specific past moment.",
      },
      {
        wrong: "While she was reading, she heard a noise and stopped the book.",
        right: "While she was reading, she heard a noise and put down the book.",
        explanation: "You 'put down' or 'closed' a book — 'stop the book' is a direct translation from Portuguese that doesn't work in English.",
      },
      {
        wrong: "No sooner I sat down than he called.",
        right: "No sooner had I sat down than he called.",
        explanation: "'No sooner…than' requires inversion: 'No sooner had + subject + past participle…'",
      },
    ],

    grammarTable: [
      { structure: 'Simple Past', example: 'She opened the door and walked in.', note: 'Main events in sequence' },
      { structure: 'Past Continuous', example: 'The radio was playing softly in the kitchen.', note: 'Background / interrupted action' },
      { structure: 'Past Perfect Simple', example: 'She had forgotten to bring her keys.', note: 'Completed before story moment' },
      { structure: 'Past Perfect Progressive', example: 'He had been running, so he was out of breath.', note: 'Duration before story moment' },
      { structure: 'No sooner…than (inverted)', example: 'No sooner had she left than it started to rain.', note: 'Immediate sequence (formal)' },
      { structure: 'By the time + past perfect', example: 'By the time they arrived, we had eaten.', note: 'Deadline point' },
    ],

    exercises: [
      {
        type: 'multipleChoice',
        question: 'She ________ for the bus for 40 minutes when it finally came.',
        options: ['waited', 'was waiting', 'had been waiting', 'had waited'],
        correctIndex: 2,
        explanation: "Duration (40 minutes) of an ongoing action before another past event → Past Perfect Progressive.",
      },
      {
        type: 'multipleChoice',
        question: 'By the time the ambulance arrived, the patient ________ consciousness.',
        options: ['lost', 'was losing', 'had lost', 'had been losing'],
        correctIndex: 2,
        explanation: "Completed action (result: unconscious) before the arrival point → Past Perfect Simple.",
      },
      {
        type: 'multipleChoice',
        question: 'No sooner ________ he answered the phone than his boss walked in.',
        options: ['had', 'did', 'was', 'has'],
        correctIndex: 0,
        explanation: "'No sooner had + subject + past participle' — auxiliary 'had' inverts with the subject.",
      },
      {
        type: 'production',
        prompt: 'Write 3 sentences about arriving late to an event. Use: (1) Past Perfect Simple to explain what had happened, (2) Past Perfect Progressive to show duration, (3) Simple Past for the main sequence.',
        model: '(1) The meeting had started without me. (2) My colleagues had been presenting for over an hour when I finally slipped in. (3) I took a seat at the back and hoped no one would notice.',
      },
      {
        type: 'production',
        prompt: 'Expand this story opening using all four narrative tenses. Begin: "The restaurant was quiet that evening…" (4-6 sentences)',
        model: 'The restaurant was quiet that evening. Most tables were empty — the dinner rush had ended an hour ago. In the corner, an elderly man was sitting alone. He had been coming to this place every Friday for thirty years. His wife had always ordered the fish. Now he ordered it for himself, out of habit.',
      },
    ],
  },
});

const grammar005 = createGrammarLesson({
  ...common,
  id: 'B2-GRAMMAR-005',
  title: 'Advanced reporting verbs: suggest, warn, accuse, deny, insist and more',
  order: 5,
  theory: {
    explanation: `Beyond "say" and "tell," B2 English uses precise reporting verbs that encode the speaker's attitude and the structure of what was said. Each verb follows a specific grammatical pattern.

**Why reporting verbs matter**

Using only "said" or "told" is a B1 habit. B2 writers and speakers choose verbs that carry meaning:
> *He said he wouldn't do it.* (neutral)
> *He refused to do it.* (attitude: deliberate rejection)
> *He denied having done it.* (attitude: rejection of accusation)

**Key reporting verbs and their patterns**

| Verb | Pattern | Example |
|---|---|---|
| *suggest* | + gerund / + that + should | *She suggested taking a break. / She suggested that we should leave.* |
| *recommend* | + gerund / + that + should | *He recommended calling ahead. / He recommended that I book early.* |
| *warn* | + object + not to infinitive | *She warned him not to touch the wire.* |
| *advise* | + object + to infinitive | *The doctor advised me to rest.* |
| *encourage* | + object + to infinitive | *My teacher encouraged me to apply.* |
| *remind* | + object + to infinitive / + of + gerund | *She reminded me to call. / He reminded us of the rules.* |
| *accuse* | + object + of + gerund | *They accused him of lying.* |
| *deny* | + gerund | *She denied stealing the money.* |
| *admit* | + gerund / + to + gerund | *He admitted making a mistake.* |
| *insist* | + on + gerund / + that | *She insisted on paying. / He insisted that it was true.* |
| *refuse* | + to infinitive | *He refused to answer.* |
| *beg* | + object + to infinitive | *She begged him to stay.* |
| *offer* | + to infinitive | *He offered to drive her home.* |
| *threaten* | + to infinitive | *She threatened to call the police.* |
| *promise* | + to infinitive / + that | *He promised to return. / She promised that she would help.* |
| *claim* | + to infinitive / + that | *He claimed to know the answer. / She claimed that she had been there.* |
| *agree* | + to infinitive / + that | *They agreed to wait. / She agreed that it was wrong.* |
| *complain* | + about + gerund / + that | *He complained about waiting. / She complained that it was cold.* |

**Tense backshift in reported speech**

When the reporting verb is in the past, the original tense usually shifts back:

| Direct speech | Reported speech |
|---|---|
| *"I am tired."* | *She said (that) she was tired.* |
| *"I have finished."* | *He said (that) he had finished.* |
| *"I will help."* | *She promised (that) she would help.* |
| *"I can do it."* | *He claimed (that) he could do it.* |
| *"Don't touch it!"* | *She warned me not to touch it.* |

**No backshift when still true:**
> *She mentioned that Paris is the capital of France.* (still a fact)

**Common time/place references that change:**

| Direct | Reported |
|---|---|
| *now* | *then / at that moment* |
| *today* | *that day* |
| *yesterday* | *the day before / the previous day* |
| *tomorrow* | *the following day / the next day* |
| *here* | *there* |
| *this* | *that* |`,

    brazilianMistakes: [
      {
        wrong: "She suggested to take a break.",
        right: "She suggested taking a break. / She suggested that we take a break.",
        explanation: "'Suggest' is NOT followed by a to-infinitive. Use gerund or 'that + subject + (should) + base verb'.",
      },
      {
        wrong: "He warned to not open the door.",
        right: "He warned us not to open the door.",
        explanation: "'Warn' requires an object before 'not to': warn + someone + not to infinitive.",
      },
      {
        wrong: "She denied to steal the money.",
        right: "She denied stealing the money.",
        explanation: "'Deny' is followed by a gerund, not a to-infinitive.",
      },
      {
        wrong: "He accused her to lie.",
        right: "He accused her of lying.",
        explanation: "'Accuse' uses 'of + gerund': accuse someone of doing something.",
      },
      {
        wrong: "She insisted to pay.",
        right: "She insisted on paying.",
        explanation: "'Insist' uses 'on + gerund': insist on doing something.",
      },
    ],

    grammarTable: [
      { structure: 'suggest + gerund', example: 'She suggested leaving early.', note: 'No to-infinitive after suggest' },
      { structure: 'warn + obj + not to inf.', example: 'He warned me not to go alone.', note: 'Object required between warn and not to' },
      { structure: 'accuse + obj + of + gerund', example: 'They accused him of cheating.', note: 'Preposition "of" required' },
      { structure: 'deny + gerund', example: 'She denied saying anything wrong.', note: 'Gerund, not infinitive' },
      { structure: 'insist + on + gerund', example: 'He insisted on driving us home.', note: 'Preposition "on" required' },
      { structure: 'refuse + to infinitive', example: 'She refused to comment on the matter.', note: 'Full infinitive' },
      { structure: 'promise + to infinitive / that', example: 'He promised to call / that he would call.', note: 'Both patterns valid' },
    ],

    exercises: [
      {
        type: 'multipleChoice',
        question: 'The manager ________ the staff not to discuss the matter with journalists.',
        options: ['suggested', 'warned', 'denied', 'insisted'],
        correctIndex: 1,
        explanation: "'Warn + obj + not to' is the structure for prohibiting/cautioning someone against an action.",
      },
      {
        type: 'multipleChoice',
        question: 'She ________ having met him before, even though everyone saw them together.',
        options: ['refused', 'denied', 'suggested', 'claimed'],
        correctIndex: 1,
        explanation: "'Deny + gerund' — she rejected the accusation. 'Denied having met' = Past Perfect gerund for an action before the denial.",
      },
      {
        type: 'multipleChoice',
        question: 'He ________ on paying for everyone, even though we all offered to split the bill.',
        options: ['insisted', 'demanded', 'refused', 'promised'],
        correctIndex: 0,
        explanation: "'Insist on + gerund' — strong determination to do something.",
      },
      {
        type: 'production',
        prompt: 'Rewrite these sentences using the verb in brackets. Do NOT use "said" or "told".\n(1) "You should try the new restaurant." (recommend)\n(2) "I didn\'t take the money." (deny)\n(3) "Don\'t open that file." (warn)\n(4) "I\'ll finish it by Friday." (promise)',
        model: '(1) She recommended trying the new restaurant. (2) He denied taking the money. (3) She warned me not to open that file. (4) He promised to finish it by Friday.',
      },
    ],
  },
});

const grammar006 = createGrammarLesson({
  ...common,
  id: 'B2-GRAMMAR-006',
  title: 'Modal verbs for the past: should have, could have, might have, needn\'t have',
  order: 6,
  theory: {
    explanation: `Past modal verbs allow you to speculate about, criticise, and reflect on past events. They are essential for B2 discussions about decisions, regrets, missed opportunities, and deductions.

**Structure: modal + have + past participle**

All past modals share this structure:
> *should have gone, could have been, might have taken, needn't have worried*

**The six key past modals**

| Modal | Meaning | Example |
|---|---|---|
| *should have* | Past obligation NOT fulfilled — criticism or regret | *You should have called me. (but you didn't)* |
| *shouldn't have* | Past action that was wrong — regret or criticism | *I shouldn't have said that. (but I did)* |
| *could have* | Past possibility that was NOT used | *She could have won if she'd practised more.* |
| *couldn't have* | Past impossibility | *He couldn't have done it — he wasn't there.* |
| *might have / may have* | Past possibility (uncertain, speculative) | *She might have missed the train.* |
| *must have* | Strong deduction — almost certain about past | *He must have forgotten — he's usually punctual.* |
| *can't have* | Strong deduction — impossible, you're certain it didn't happen | *She can't have known — she looked genuinely surprised.* |
| *needn't have* | Action WAS done but was unnecessary | *You needn't have brought food — there was plenty.* |
| *would have* | Hypothetical past — conditional result | *I would have helped if you'd asked.* |

**Should have vs needn't have**

These are frequently confused:
- *should have done* → you DIDN'T do it, but you were supposed to
  > *I should have booked earlier.* (I didn't book early enough — mistake)
- *needn't have done* → you DID it, but it was unnecessary
  > *I needn't have booked — there were plenty of seats.* (I booked, but I didn't need to)

**Must have vs Can't have (deductions)**

These are opposites on a certainty scale:
- *must have* → you're almost certain it happened
  > *She must have worked all night — the report was perfect.*
- *can't have* → you're almost certain it didn't happen
  > *He can't have taken the bus — they were on strike.*

**Might have / could have (speculation)**

Both express uncertainty about the past. *Might have* is slightly less certain:
> *She might have been delayed by traffic.* (I'm not sure)
> *He could have taken a different route.* (it's possible)

**B2 discourse with past modals**

In arguments and discussions, past modals are used to:
- Reflect on mistakes: *We should have invested in renewable energy earlier.*
- Identify missed opportunities: *She could have become a brilliant scientist.*
- Speculate on causes: *The accident must have been caused by the weather.*
- Defend decisions: *We couldn't have known what would happen.*`,

    brazilianMistakes: [
      {
        wrong: "You should have went to the doctor earlier.",
        right: "You should have gone to the doctor earlier.",
        explanation: "After 'should have' (or any modal + have), always use the past participle, not simple past. 'went' → 'gone'.",
      },
      {
        wrong: "She must have forgot her keys.",
        right: "She must have forgotten her keys.",
        explanation: "Past participle required: 'forgotten', not 'forgot'.",
      },
      {
        wrong: "He couldn't have did that.",
        right: "He couldn't have done that.",
        explanation: "'done' is the past participle of 'do'. Never use simple past after 'have'.",
      },
      {
        wrong: "I didn't need to have brought anything — they had food.",
        right: "I needn't have brought anything — they had food.",
        explanation: "'Needn't have + past participle' is the natural structure for an unnecessary completed action.",
      },
      {
        wrong: "She might didn't hear you.",
        right: "She might not have heard you.",
        explanation: "Negative past modal: modal + not + have + past participle. Never insert 'didn't' into a modal structure.",
      },
    ],

    grammarTable: [
      { structure: 'should have + p.p.', example: 'I should have studied more.', note: 'Regret / unfulfilled obligation' },
      { structure: 'could have + p.p.', example: 'She could have been a doctor.', note: 'Unused past possibility' },
      { structure: 'might have + p.p.', example: 'He might have missed the bus.', note: 'Uncertain past speculation' },
      { structure: 'must have + p.p.', example: 'They must have left already.', note: 'Strong deduction (almost certain)' },
      { structure: "can't have + p.p.", example: "She can't have known about it.", note: 'Impossibility deduction' },
      { structure: 'needn\'t have + p.p.', example: "You needn't have worried.", note: 'Done, but unnecessary' },
      { structure: 'would have + p.p.', example: 'I would have helped if I could.', note: 'Hypothetical past (conditional)' },
    ],

    exercises: [
      {
        type: 'multipleChoice',
        question: 'He looks exhausted. He ________ working all night.',
        options: ['should have been', 'must have been', "can't have been", "needn't have been"],
        correctIndex: 1,
        explanation: "'Must have been' = strong deduction based on visible evidence (he looks exhausted).",
      },
      {
        type: 'multipleChoice',
        question: 'You ________ bought so much food — we still have half the fridge full from last week.',
        options: ['should have', 'could have', "needn't have", 'must have'],
        correctIndex: 2,
        explanation: "'Needn't have' = you DID buy it, but it was unnecessary — there was already food.",
      },
      {
        type: 'multipleChoice',
        question: 'She passed the exam without studying. She ________ found it easy.',
        options: ['must have', 'should have', 'needn\'t have', "can't have"],
        correctIndex: 0,
        explanation: "'Must have' = strong deduction: if she passed without studying, the exam was probably easy.",
      },
      {
        type: 'production',
        prompt: "Look at these situations and write a past modal sentence for each:\n(1) You forgot to save your work and lost everything.\n(2) Your friend bought a train ticket but the train was cancelled.\n(3) Someone is very late — they were supposed to be there an hour ago.\n(4) You think someone may not have received your email.",
        model: "(1) I should have saved my work. (2) She needn't have bought a ticket — the train was cancelled anyway. (3) He must have been delayed — he's never this late. (4) She might not have received my email.",
      },
    ],
  },
});

// ─── VOCABULARY ─────────────────────────────────────────────────────────────

const vocabulary004 = createVocabularyLesson({
  ...common,
  id: 'B2-VOCABULARY-004',
  title: 'Narrative verbs of movement, speech and expression',
  order: 4,
  theory: {
    introduction: `Strong narratives use specific verbs that show HOW something happened, not just WHAT happened. Instead of "walked quickly," you write "strode." Instead of "said quietly," you write "murmured." These precise verbs make your stories and descriptions vivid and natural at B2 level.`,

    words: [
      { word: 'stride', definition: 'walk with long, confident steps', example: 'She strode into the room as if she owned it.' },
      { word: 'stroll', definition: 'walk slowly and relaxed', example: 'They strolled along the river in the evening light.' },
      { word: 'dart', definition: 'move suddenly and quickly', example: 'A cat darted across the road in front of the car.' },
      { word: 'stumble', definition: 'trip or walk unsteadily', example: 'He stumbled out of the tent, half asleep.' },
      { word: 'hover', definition: 'stay in one place without settling, or stay nearby nervously', example: 'She hovered by the door, unsure whether to enter.' },
      { word: 'peer', definition: 'look carefully, often through narrowed eyes or into the dark', example: 'He peered through the fog but couldn\'t see anything.' },
      { word: 'glance', definition: 'look quickly at something', example: 'She glanced at her phone and put it back in her bag.' },
      { word: 'stare', definition: 'look fixedly at something for a long time', example: 'He stared at the letter, unable to believe what he was reading.' },
      { word: 'murmur', definition: 'speak very quietly, almost to oneself', example: '"I\'m not sure," she murmured, looking away.' },
      { word: 'whisper', definition: 'speak very softly so only the listener hears', example: 'He leaned close and whispered something in her ear.' },
      { word: 'exclaim', definition: 'say something suddenly with strong emotion', example: '"That\'s extraordinary!" she exclaimed.' },
      { word: 'gasp', definition: 'breathe in suddenly because of shock or surprise', example: 'The audience gasped when the magician revealed the trick.' },
      { word: 'sigh', definition: 'breathe out slowly, showing relief, sadness or boredom', example: 'He sighed deeply and closed the file.' },
      { word: 'hesitate', definition: 'pause before doing or saying something', example: 'She hesitated at the top of the stairs, then turned back.' },
      { word: 'rush', definition: 'move or act very quickly, often urgently', example: 'He rushed to the station but missed the last train.' },
      { word: 'freeze', definition: 'suddenly stop moving because of fear or shock', example: 'She froze when she heard the voice behind her.' },
    ],

    chunks: [
      { chunk: 'stride confidently into', example: 'The CEO strode confidently into the boardroom.' },
      { chunk: 'dart a look at', example: 'She darted a quick look at the clock.' },
      { chunk: 'peer through the darkness', example: 'They peered through the darkness but saw nothing.' },
      { chunk: 'stare into the distance', example: 'He sat staring into the distance for several minutes.' },
      { chunk: 'gasp in disbelief', example: 'She gasped in disbelief when she heard the news.' },
      { chunk: 'hesitate for a moment', example: 'He hesitated for a moment before knocking.' },
      { chunk: 'rush to + verb', example: 'She rushed to explain before he got the wrong idea.' },
      { chunk: 'freeze on the spot', example: 'When he saw the snake, he froze on the spot.' },
    ],

    dangerousConfusions: [
      {
        words: ['glance', 'stare', 'gaze'],
        explanation: "'Glance' = quick look (seconds). 'Stare' = long fixed look (often rude or intense). 'Gaze' = long soft look (often romantic or reflective). All three are different durations and tones.",
        examples: [
          "She glanced at her watch. (quick)",
          "He stared at her, unnerving everyone. (intense, long)",
          "They gazed at the sunset together. (soft, long)",
        ],
      },
      {
        words: ['whisper', 'murmur'],
        explanation: "'Whisper' = deliberate soft speech (you don't want others to hear). 'Murmur' = soft, almost unconscious speech, often expressing uncertainty or reflection. Both are quiet, but the intention differs.",
        examples: [
          "\"Don't tell anyone,\" she whispered. (deliberate secrecy)",
          "\"I'm not sure this is right,\" he murmured. (reflective, half to himself)",
        ],
      },
      {
        words: ['rush', 'dart'],
        explanation: "'Rush' = move fast with urgency (a whole journey or action). 'Dart' = a brief, sudden movement, often evasive or instinctive.",
        examples: [
          "She rushed to the hospital. (urgent trip)",
          "He darted behind a pillar when he saw her. (quick, brief move)",
        ],
      },
    ],

    exercises: [
      {
        type: 'multipleChoice',
        question: 'He ________ at the clock for a split second, then continued speaking.',
        options: ['stared', 'gazed', 'glanced', 'peered'],
        correctIndex: 2,
        explanation: "'Glanced' = very brief look. A 'split second' confirms this was quick, not prolonged.",
      },
      {
        type: 'multipleChoice',
        question: 'When the lights went out suddenly, everyone in the room ________.',
        options: ['sighed', 'gasped', 'murmured', 'hovered'],
        correctIndex: 1,
        explanation: "'Gasped' = sharp involuntary intake of breath caused by shock or surprise — exactly what happens when lights suddenly go out.",
      },
      {
        type: 'production',
        prompt: 'Rewrite these flat sentences using one of the lesson verbs. Keep the meaning but make it more vivid.\n(1) She walked quickly to the exit.\n(2) He said something quietly that I couldn\'t hear.\n(3) She stopped suddenly when she heard the sound.\n(4) He looked carefully through the curtain.',
        model: '(1) She strode / rushed to the exit. (2) He murmured something I couldn\'t catch. (3) She froze when she heard the sound. (4) He peered through the curtain.',
      },
    ],
  },
});

const vocabulary005 = createVocabularyLesson({
  ...common,
  id: 'B2-VOCABULARY-005',
  title: 'Storytelling chunks: out of the blue, as luck would have it, in hindsight',
  order: 5,
  theory: {
    introduction: `Good storytellers don't just recount events — they frame them with expressions that guide the listener's expectations, create suspense, and reflect on events. These fixed expressions (chunks) are essential for natural B2 narration, both in speaking and in writing.`,

    words: [
      { word: 'out of the blue', definition: 'suddenly and unexpectedly, without warning', example: 'Out of the blue, she received a job offer from abroad.' },
      { word: 'all of a sudden', definition: 'very suddenly (informal, spoken)', example: 'All of a sudden, the engine stopped.' },
      { word: 'as luck would have it', definition: 'fortunately (or unfortunately) by chance', example: 'As luck would have it, a taxi appeared just as it started to rain.' },
      { word: 'little did he know', definition: 'used to signal irony — the person didn\'t realise something important at the time', example: 'She drove away happily. Little did she know that she had left her passport on the seat.' },
      { word: 'the next thing I knew', definition: 'used to describe a sudden change or rapid sequence of events', example: 'I sat down for a moment and the next thing I knew, it was morning.' },
      { word: 'it turned out that', definition: 'used to reveal what was later discovered (often a surprise)', example: 'It turned out that he had been living in the city all along.' },
      { word: 'to this day', definition: 'even now, after all this time', example: 'To this day, nobody knows what really happened that night.' },
      { word: 'in hindsight', definition: 'looking back now and understanding something you didn\'t at the time', example: 'In hindsight, I should have asked more questions.' },
      { word: 'before long', definition: 'after a short period of time', example: 'They arrived at the village and before long, everyone was talking about their visit.' },
      { word: 'against all odds', definition: 'despite very unfavourable conditions or low probability', example: 'Against all odds, the small team won the competition.' },
    ],

    chunks: [
      { chunk: 'out of the blue', example: 'And then, completely out of the blue, she resigned.' },
      { chunk: 'as luck would have it', example: 'As luck would have it, there was one seat left on the flight.' },
      { chunk: 'little did [subject] know', example: 'Little did we know that everything was about to change.' },
      { chunk: 'it turned out that', example: 'It turned out that the map had been wrong the entire time.' },
      { chunk: 'to this day', example: 'To this day, I still think about what I should have said.' },
      { chunk: 'in hindsight', example: 'In hindsight, that was probably the worst decision I\'ve ever made.' },
      { chunk: 'against all odds', example: 'Against all odds, the rescue team found them alive.' },
      { chunk: 'the next thing I knew', example: 'I blinked, and the next thing I knew, an hour had passed.' },
    ],

    dangerousConfusions: [
      {
        words: ['out of the blue', 'all of a sudden'],
        explanation: "'Out of the blue' emphasises that something was unexpected and surprising. 'All of a sudden' emphasises the speed — something happened very quickly. Both signal surprise, but 'out of the blue' is usually about something coming from nowhere (a call, an offer, news), while 'all of a sudden' describes a rapid change in events.",
        examples: [
          "Out of the blue, she called after three years of silence. (unexpected contact)",
          "All of a sudden, the lights went out. (sudden rapid change)",
        ],
      },
      {
        words: ['in hindsight', 'in retrospect'],
        explanation: "Both mean 'looking back now with knowledge you didn't have at the time.' 'In hindsight' is very common in both spoken and written English. 'In retrospect' is slightly more formal. They can almost always be used interchangeably.",
        examples: [
          "In hindsight, I should have taken the other route. (spoken/written)",
          "In retrospect, the decision was clearly flawed. (slightly more formal)",
        ],
      },
    ],

    exercises: [
      {
        type: 'multipleChoice',
        question: 'She had been working there for years. ________, she didn\'t realise the company was about to collapse.',
        options: ['All of a sudden', 'Little did she know', 'As luck would have it', 'Before long'],
        correctIndex: 1,
        explanation: "'Little did she know' signals that the person was unaware of something important at the time — perfect for dramatic irony in narratives.",
      },
      {
        type: 'multipleChoice',
        question: '________, the very person we needed happened to be waiting in the lobby.',
        options: ['In hindsight', 'To this day', 'As luck would have it', 'Against all odds'],
        correctIndex: 2,
        explanation: "'As luck would have it' = a convenient or convenient coincidence — something fortunate happening by chance.",
      },
      {
        type: 'production',
        prompt: 'Write a short story opening (4-6 sentences) using at least THREE of the storytelling chunks from this lesson. The story can be real or invented.',
        model: 'It was an ordinary Thursday. I had no plans and wasn\'t expecting anything unusual. Then, out of the blue, I got a message from someone I hadn\'t heard from in five years. As luck would have it, I had just been thinking about them that morning. The next thing I knew, we had arranged to meet for coffee the following day. In hindsight, that chance message changed the course of everything that followed.',
      },
    ],
  },
});

const vocabulary006 = createVocabularyLesson({
  ...common,
  id: 'B2-VOCABULARY-006',
  title: 'Descriptive language: vivid adjectives and precise B2 adverbs',
  order: 6,
  theory: {
    introduction: `B2 descriptions go beyond basic adjectives. You need a range of precise adjectives that convey mood, atmosphere and character, paired with adverbs that add nuance and exactness rather than just intensity. The goal is specificity, not decoration.`,

    words: [
      { word: 'vivid', definition: 'very bright, clear and memorable — often of images, memories or descriptions', example: 'She had a vivid memory of the house where she grew up.' },
      { word: 'striking', definition: 'immediately noticeable and impressive', example: 'There was a striking contrast between the two neighbourhoods.' },
      { word: 'haunting', definition: 'beautiful or sad in a way that stays with you for a long time', example: 'The film had a haunting quality that I couldn\'t shake off.' },
      { word: 'relentless', definition: 'showing no sign of stopping; continuing with great force', example: 'The relentless noise from the construction site made concentration impossible.' },
      { word: 'subtle', definition: 'not immediately obvious; slight and delicate', example: 'There was a subtle change in her expression that told me something was wrong.' },
      { word: 'fleeting', definition: 'lasting only a very short time', example: 'I caught a fleeting glimpse of him through the crowd.' },
      { word: 'bleak', definition: 'cold, bare and without hope or comfort', example: 'The landscape looked bleak in the early morning mist.' },
      { word: 'eerie', definition: 'strange and unsettling in a mysterious way', example: 'There was an eerie silence after the alarm stopped.' },
      { word: 'utterly', definition: 'completely, absolutely (usually with negatives or strong adjectives)', example: 'She was utterly exhausted by the end of the week.' },
      { word: 'remarkably', definition: 'in a way that is surprising or impressive', example: 'He remained remarkably calm throughout the interrogation.' },
      { word: 'barely', definition: 'only just; almost not', example: 'She could barely see through the rain.' },
      { word: 'scarcely', definition: 'almost not; barely (slightly more formal than barely)', example: 'He had scarcely sat down when the phone rang.' },
      { word: 'merely', definition: 'only, just (used to reduce the importance of something)', example: 'This is merely the beginning — the hardest part is still ahead.' },
      { word: 'considerably', definition: 'by a large amount', example: 'The situation improved considerably after the meeting.' },
      { word: 'essentially', definition: 'in the most important or basic way', example: 'Essentially, what they want is more time — not more money.' },
      { word: 'inevitably', definition: 'in a way that cannot be avoided or prevented', example: 'Inevitably, the project was delayed by the bad weather.' },
    ],

    chunks: [
      { chunk: 'utterly + adj', example: 'She was utterly speechless when she heard the news.' },
      { chunk: 'barely visible / barely audible', example: 'The figure in the distance was barely visible through the fog.' },
      { chunk: 'a fleeting moment / glimpse', example: 'For a fleeting moment, everything seemed possible.' },
      { chunk: 'a haunting + noun', example: 'He left a haunting impression on everyone who met him.' },
      { chunk: 'remarkably + adj', example: 'She handled the criticism remarkably well.' },
      { chunk: 'striking contrast / resemblance', example: 'There is a striking resemblance between the two sisters.' },
      { chunk: 'subtle difference / change', example: 'The subtle changes in her tone were enough to tell me she was worried.' },
      { chunk: 'inevitably + clause', example: 'Inevitably, old habits returned once the pressure eased.' },
    ],

    dangerousConfusions: [
      {
        words: ['barely', 'scarcely', 'hardly'],
        explanation: "All three mean 'almost not' and are largely interchangeable. The differences are subtle: 'barely' is most common in everyday English; 'scarcely' sounds slightly more formal; 'hardly' is used in most contexts. All three are negative in meaning and should NOT be combined with 'not' (never say 'hardly not' or 'barely not').",
        examples: [
          "I could barely hear her over the noise.",
          "She had scarcely entered the room when the applause began. (more formal)",
          "I hardly slept last night. (most common general use)",
        ],
      },
      {
        words: ['utterly', 'completely', 'totally'],
        explanation: "'Utterly' is the most literary and formal. 'Completely' is neutral. 'Totally' is informal. All mean 'to the full degree.' In formal writing or sophisticated narratives, prefer 'utterly.' In everyday speech, 'completely' and 'totally' are more natural.",
        examples: [
          "She was utterly devastated by the loss. (literary / formal)",
          "The building was completely destroyed in the fire. (neutral)",
          "I totally forgot about the meeting. (informal speech)",
        ],
      },
    ],

    exercises: [
      {
        type: 'multipleChoice',
        question: 'By the end of the marathon, the runners were ________ exhausted — some could barely stand.',
        options: ['scarcely', 'utterly', 'merely', 'subtly'],
        correctIndex: 1,
        explanation: "'Utterly exhausted' is a very common and powerful collocation. 'Utterly' intensifies strong states, especially negative ones.",
      },
      {
        type: 'multipleChoice',
        question: 'The old photograph brought back a ________ memory of her childhood home.',
        options: ['bleak', 'fleeting', 'relentless', 'vivid'],
        correctIndex: 3,
        explanation: "'Vivid memory' = extremely clear, detailed, almost as if you're there again. This is a very common collocation at B2 level.",
      },
      {
        type: 'production',
        prompt: 'Describe a place (real or imagined) in 4-6 sentences using at least four adjectives and two adverbs from this lesson. Focus on atmosphere.',
        model: 'The old station was utterly silent at that hour. A fleeting sense of unease passed through me as I stepped inside. The light was barely strong enough to see by, casting long, subtle shadows across the platform. The place had a bleak, almost eerie quality — as if it had been abandoned mid-journey. Remarkably, everything was still in place: the sign, the benches, the timetables that would never change now.',
      },
    ],
  },
});

// ─── READING ────────────────────────────────────────────────────────────────

const reading002 = createReadingLesson({
  ...common,
  id: 'B2-READING-002',
  title: 'A Photograph Found in a Drawer — narrative non-fiction critical reading',
  order: 2,
  theory: {
    preReading: {
      vocabulary: [
        { word: 'attic', definition: 'the space at the top of a building, under the roof, often used for storage' },
        { word: 'inscription', definition: 'words written on or in something, especially when carved or printed permanently' },
        { word: 'haunted', definition: 'here: troubled by something from the past that you cannot forget' },
        { word: 'reconcile', definition: 'to find a way to accept two things that seem to contradict each other' },
        { word: 'decades', definition: 'periods of ten years; "for decades" = for many years' },
        { word: 'anonymous', definition: 'without a known name or identity' },
      ],
      activationQuestion: 'Have you ever found an old photograph or letter that made you think differently about someone you knew? What was it like?',
      readingStrategy: 'As you read, notice how the writer uses past tenses to move between different time layers — the present moment, the recent past, and the distant past. Also notice how uncertainty is expressed.',
    },

    mainText: `**A Photograph Found in a Drawer**

*by Eleanor Marsh*

I found it on a Tuesday morning in November, while I was clearing out my mother's attic. It had been buried under a stack of old magazines and a box of Christmas decorations that no longer worked. The photograph was black and white, slightly faded at the edges, and had been folded once along the middle, leaving a pale crease across its centre.

There were two people in it: a young woman and a man I had never seen before. She was laughing — really laughing, in that unguarded way people rarely allow themselves to be photographed. She must have been about twenty, which meant the picture had been taken decades before I was born. She was wearing a coat I recognised, the dark wool one with the oversized buttons that had hung in the wardrobe in the spare room for as long as I could remember. I had always assumed it was merely old-fashioned. I had never thought to ask about it.

The man was looking at her, not at the camera. He was holding her hand — barely, with just their fingertips touching, as though the gesture had been spontaneous and not quite completed. On the back of the photograph, someone had written in blue ink: *For always. — R.*

My mother had never mentioned anyone called R.

I stood there for a long time, turning the photograph over and over in my hands. I had known my mother for forty years. I had been there when she had her first heart attack, when she had recovered, and when, four years later, she had not. I had organised the funeral, written the letters, returned the library books she would never finish. I thought I had understood her life completely.

Little did I know that a single Tuesday morning would leave me with questions that I am still, to this day, unable to answer.

Inevitably, I asked my aunt. She looked at the photograph for what seemed like a very long time, then handed it back without a word. It was only as she was leaving that she said, quietly, almost to herself: "Some things don't need to be reconciled. They just need to be remembered."

I have kept the photograph on my desk since then. I still don't know who R was. I don't know whether the relationship was brief or long, joyful or painful, finished by choice or by circumstance. But whenever I look at my mother's face in that image — young, laughing, completely present — I am struck by how much of a person can remain unknown, even to those who loved them most.`,

    comprehensionQuestions: [
      {
        question: 'Where did the narrator find the photograph, and what was its physical condition?',
        type: 'literal',
        model: "She found it in her mother's attic, buried under magazines and Christmas decorations. It was black and white, faded at the edges, and had been folded once, leaving a crease across the centre.",
      },
      {
        question: 'What clue in the photograph suggested that the gesture between the two people was not posed?',
        type: 'inferential',
        model: "The writer notes that the man was 'holding her hand — barely, with just their fingertips touching, as though the gesture had been spontaneous and not quite completed.' The word 'spontaneous' and the incompleteness of the gesture suggest it was not a posed, deliberate pose.",
      },
      {
        question: "How does the writer's relationship with knowledge about her mother change across the text?",
        type: 'evaluative',
        model: "At the start, the narrator assumes she understood her mother's life completely — she had been present for major life events and had managed her affairs after death. The photograph dismantles this certainty. By the end, she acknowledges that 'how much of a person can remain unknown, even to those who loved them most.' The text traces a shift from confidence to humility about how well we know others.",
      },
    ],

    languageFocus: [
      {
        item: 'It had been buried under a stack of old magazines.',
        focus: 'Past Perfect Passive',
        question: 'Why does the writer use Past Perfect here? What does it tell us about the timeline?',
        explanation: "The Past Perfect ('had been buried') places the action of burying before the story's present moment — before she found it. It suggests this photograph had been hidden there for a long time, adding to the mystery.",
      },
      {
        item: 'Little did I know that a single Tuesday morning would leave me with questions.',
        focus: 'Narrative chunk + would for future-in-past',
        question: 'What effect does "Little did I know" create for the reader?',
        explanation: "'Little did I know' creates dramatic irony — the narrator is telling us, in retrospect, that she was unaware of what was about to happen. 'Would leave' is the future-in-past form, looking forward from a past moment.",
      },
      {
        item: 'She must have been about twenty.',
        focus: 'Past modal for deduction',
        question: 'Is the narrator certain about the woman\'s age? How does "must have been" show this?',
        explanation: "'Must have been' expresses strong deduction — the narrator is reasoning from evidence (the photograph was taken decades before her birth) to reach a confident conclusion, but it is still an inference, not certain knowledge.",
      },
    ],

    productionTask: {
      prompt: "Write 2-3 paragraphs (120-180 words) describing a moment when you discovered something unexpected about someone you thought you knew well — or, if you prefer, invent a scenario. Use: at least one past perfect, one past modal for deduction or speculation, and at least one storytelling chunk from B2-VOCABULARY-005.",
      writingFocus: ['narrative past tenses', 'past modals for speculation', 'storytelling chunks'],
    },
  },
});

// ─── LISTENING ──────────────────────────────────────────────────────────────

const listening002 = createListeningLesson({
  ...common,
  id: 'B2-LISTENING-002',
  title: 'A turning point — interview about a life-changing experience',
  order: 2,
  theory: {
    context: 'You will hear an interview in which a journalist, Marcus, speaks with Sofia, a former architect who changed careers completely at 38. The conversation explores how she came to that decision and what happened as a result.',

    keyVocabulary: [
      { word: 'turning point', definition: 'a moment when an important change happens' },
      { word: 'dread', definition: 'feel strong fear or worry about something in the future' },
      { word: 'leap of faith', definition: 'a decision to do something even though you can\'t be certain it will work' },
      { word: 'burn out', definition: 'become exhausted from overwork, losing all motivation and energy' },
      { word: 'stable', definition: 'not likely to change; secure and reliable' },
    ],

    preparation: {
      activationQuestion: 'Have you ever made a major change in your life — or wanted to? What made it difficult?',
      predictionTask: 'Before listening, predict: What reasons might someone give for leaving a successful professional career in their late 30s?',
    },

    transcript: `**MARCUS:** Sofia, you left a fifteen-year career in architecture at 38 to become a ceramics teacher. Most people would have thought that was professional suicide. What was going through your mind?

**SOFIA:** It sounds dramatic when you say it like that. But at the time, it felt less like a choice and more like a necessity. I had been burning out for years — I just hadn't admitted it to myself. I was waking up every morning dreading going into the office. And one day I realised: I had been doing that for three years. Three years of dreading Monday at four o'clock on Sunday afternoon.

**MARCUS:** What was the turning point, specifically?

**SOFIA:** I was on a project — a huge commercial development, very prestigious. I should have been proud of it. But one evening, I was working late and I looked at the drawings and I thought: I don't care whether this gets built or not. I had been working on it for eight months. And I didn't care. That scared me more than anything else.

**MARCUS:** And ceramics — was that something you'd always been interested in?

**SOFIA:** Not formally. I'd done a short course a few years before, as a kind of stress relief. But that evening, I suddenly remembered how it felt to work with clay — how present it made me feel. Every other part of my life I was planning, managing, projecting forward. With ceramics, it was just: now. This piece of clay. This moment.

**MARCUS:** But making the actual decision — that must have been terrifying.

**SOFIA:** Terrifying isn't quite right. It was more… a deep sadness. I was giving up something I had spent fifteen years building. I'd thought that stability was what I needed. It turned out that what I actually needed was meaning. And I couldn't find that where I was looking for it.

**MARCUS:** What did people say? Your family, colleagues?

**SOFIA:** My mother asked if I'd lost my mind. My colleagues — most of them were supportive, actually. A few of them said, later, that they'd been thinking the same thing. Interestingly, the person who was most encouraging was my oldest client — a developer I'd worked with for years. He said: "Little did I know when I hired you that I was working with someone who'd rather be making bowls." [laughs] He meant it kindly.

**MARCUS:** And how has it turned out?

**SOFIA:** Remarkably well. I'm earning considerably less — I won't pretend otherwise. But I'm present in my life in a way I hadn't been for years. And here's the thing nobody tells you: when you stop dreading Monday, Tuesday looks completely different.`,

    firstListen: [
      {
        task: 'Listen for the main reason Sofia left architecture.',
        answer: 'She had been burning out for years and no longer cared about her work. She realised she needed meaning, not stability.',
      },
      {
        task: 'What specific moment made her realise she needed to change?',
        answer: 'Working late on a prestigious project, she looked at the drawings and realised she didn\'t care whether it got built or not — after eight months of work.',
      },
    ],

    secondListen: [
      {
        task: "Find the storytelling chunk Sofia uses to describe her Sunday afternoons for three years.",
        answer: "She said she had been dreading Monday 'at four o'clock on Sunday afternoon' for three years — not a fixed chunk, but a specific vivid detail that implies 'dreading' had become a habit.",
      },
      {
        task: "What contrast does Sofia draw between ceramics and the rest of her life?",
        answer: "In the rest of her life, she was 'planning, managing, projecting forward.' With ceramics, it was about being present: 'just now. This piece of clay. This moment.'",
      },
      {
        task: "What phrase does the old client use — and which storytelling chunk from B2-VOCABULARY-005 does it echo?",
        answer: "He says 'Little did I know when I hired you…' — this directly echoes the 'little did [subject] know' chunk from Vocabulary-005.",
      },
    ],

    listeningQuestions: [
      {
        question: 'What does Sofia mean when she says the decision felt "less like a choice and more like a necessity"?',
        type: 'inferential',
        model: "She means the situation had become so unsustainable that staying would have been more damaging than leaving. The word 'necessity' suggests it wasn't really optional for her anymore — it was something she had to do for her own wellbeing.",
      },
      {
        question: 'Why does Sofia say "terrifying isn\'t quite right" when Marcus uses that word?',
        type: 'language',
        model: "Sofia is correcting his interpretation. She doesn't want to describe the feeling as purely fearful — she says it was 'more a deep sadness.' She's being precise about the emotional experience, distinguishing fear from grief at leaving something she had worked on for fifteen years.",
      },
      {
        question: 'What is the tone of the final line: "when you stop dreading Monday, Tuesday looks completely different"?',
        type: 'evaluative',
        model: "It's both practical and hopeful. She's using simple, concrete language to express something profound — that the feeling of dread was affecting her entire experience of time and life. When that changes, everything changes. The tone is calm, reflective, and quietly encouraging.",
      },
    ],

    shadowingLines: [
      {
        line: "I had been doing that for three years. Three years of dreading Monday at four o'clock on Sunday afternoon.",
        focus: 'Past Perfect Progressive + repetition for emphasis',
        tip: 'Notice the stress on "three years" — repeated for emotional weight. The phrase "at four o\'clock on Sunday afternoon" is said slowly and clearly, making it feel vivid and specific.',
      },
      {
        line: "It turned out that what I actually needed was meaning. And I couldn't find that where I was looking for it.",
        focus: 'Storytelling chunk + contrast',
        tip: "\"It turned out that\" — slightly slower at the start to signal a revelation. \"Couldn't find that where I was looking for it\" carries quiet resignation — no strong stress, spoken smoothly.",
      },
      {
        line: "When you stop dreading Monday, Tuesday looks completely different.",
        focus: 'Rhythm and emphasis',
        tip: "The contrast is between 'Monday' and 'Tuesday' — both stressed. 'Completely different' is said with gentle conviction, not excitement. This is the key insight of the interview.",
      },
    ],

    dictationTask: [
      {
        text: "I had been working on it for eight months. And I didn't care.",
        focus: 'Past Perfect Progressive + short contrasting statement',
      },
      {
        text: "It turned out that what I actually needed was meaning.",
        focus: 'Storytelling chunk + nominal structure',
      },
    ],

    oralProduction: {
      prompt: "In 90 seconds to 2 minutes, describe a moment when you realised something important needed to change in your life — or invent a character who had that realisation. Use: at least one past narrative tense combination, one modal for the past, and one storytelling chunk.",
      speakingFocus: ['narrative past tenses', 'past modals', 'storytelling chunks', 'descriptive vocabulary'],
    },
  },
});

// ─── SPEAKING ───────────────────────────────────────────────────────────────

const speaking002 = createSpeakingLesson({
  ...common,
  id: 'B2-SPEAKING-002',
  title: 'Telling a personal narrative with advanced past tenses and storytelling language',
  order: 2,
  theory: {
    introduction: `Telling a personal story well at B2 level means more than reporting what happened. You create a scene, manage the timeline clearly with appropriate tenses, use vivid vocabulary, and frame events for your listener. This lesson focuses on the full architecture of a spoken narrative.`,

    modelPhrases: [
      { category: 'Setting the scene', phrases: [
        'It was about three years ago, when I was still working in…',
        'The whole thing started on a [day] in [month], which I still remember clearly.',
        'At the time, I had been living in… for about a year.',
      ]},
      { category: 'Introducing background context (past perfect)', phrases: [
        'I had already decided to…, so when… happened, I was ready.',
        'The thing is, I had been thinking about it for months.',
        'Looking back, I had been ignoring the signs for a long time.',
      ]},
      { category: 'Building narrative tension', phrases: [
        'And then, out of the blue,…',
        'The next thing I knew,…',
        'Little did I know that…',
        'Just as I was about to…, something happened.',
      ]},
      { category: 'Reflecting and evaluating', phrases: [
        'In hindsight, I should have…',
        'It turned out that…, which I never expected.',
        'Looking back, I can see now that…',
        'To this day, I\'m still not entirely sure what made me…',
      ]},
      { category: 'Closing a narrative', phrases: [
        'And that\'s really when everything changed.',
        'It was a small moment, but it had a huge impact.',
        'I\'ve never looked at [situation] the same way since.',
      ]},
    ],

    guidedSpeakingTasks: [
      {
        title: 'A moment of realisation',
        prompt: "Describe a time when you suddenly understood something important that you hadn't seen before. This could be about a person, a situation, your own behaviour, or a belief you changed. Structure: scene-setting → background → the moment → reflection.",
        steps: [
          'Set the scene: where were you, what time of your life was it, what was happening generally?',
          'Give background: what had you been thinking or doing before the realisation?',
          'Describe the moment: what happened or what triggered the realisation?',
          'Reflect: what did you do differently after that, or how do you see it now?',
        ],
        model: "It was in my second year at university. At the time, I had been studying economics because my parents expected it — I\'d never really questioned it. I was sitting in a lecture on corporate finance one afternoon, and I suddenly became aware that I had been sitting in rooms like this for almost two years and never once felt curious. Not once. I looked around the room and thought: everyone here wants to be here. And I just… don\'t. In hindsight, I should have admitted that to myself earlier. It turned out that what I actually wanted was to work with languages — which is, eventually, what I did.",
        languageFocus: 'Past Continuous (setting scene), Past Perfect Progressive (background duration), Simple Past (the moment), past modal should have, it turned out that.',
      },
      {
        title: 'An unexpected encounter',
        prompt: "Tell a story about meeting someone unexpectedly — on a journey, at an event, or in a place you wouldn't usually be. It can be someone you knew before or a complete stranger. Focus on what was unexpected and what (if anything) came from it.",
        steps: [
          'Explain where you were and why.',
          'Set the scene with background description (what was happening around you).',
          'Describe the encounter.',
          'Say what happened next, and how you now look back on it.',
        ],
        model: "I\'d been travelling alone through Portugal for about a week, staying in small guesthouses. One evening in Lisbon, I went for a walk along the river. As I was standing there, watching the ferries cross, a woman sat down on the same bench and started talking — not to me specifically, just… narrating what she was looking at. It turned out she was a retired geography teacher who had been coming to the same spot every evening for twenty years. We ended up talking for nearly two hours. To this day, I remember one thing she said: \'A place looks different every time you return. You just have to be willing to notice.\'",
        languageFocus: 'Past Perfect Progressive for duration, Past Continuous for simultaneous scene, Simple Past for main events, it turned out that, to this day.',
      },
    ],

    recordingTasks: [
      {
        duration: '2 minutes',
        prompt: "Tell the story of a decision that changed your direction — in your studies, work, relationships, or personal life. Use as many narrative tools from this unit as you can. Plan for 30 seconds before recording.",
        checklist: [
          'I set the scene clearly.',
          'I used Past Continuous for background.',
          'I used Past Perfect Simple or Progressive for backstory.',
          'I used at least one past modal.',
          'I included at least one storytelling chunk.',
          'I reflected on the event at the end.',
        ],
      },
      {
        duration: '90 seconds',
        prompt: "Describe a person who had a significant impact on your life. Tell one specific story about them. Focus on showing who they were through what they did or said, not just through adjectives.",
        checklist: [
          'I described the person through action or speech, not just adjectives.',
          'I used at least one narrative tense combination.',
          'I used at least two vocabulary items from B2-VOCABULARY-004 or 006.',
          'I ended with a reflection.',
        ],
      },
    ],

    freeSpeakingPrompts: [
      "Describe the most memorable journey you\'ve taken. What made it memorable — not just the destination, but what happened along the way?",
      "Tell the story of a time when something went wrong but turned out better than expected.",
    ],

    substitutionDrills: [
      {
        base: 'I had been living there for [time] when [event] happened.',
        substitutions: [
          'I had been living there for six months when I met him.',
          'I had been working there for two years when they offered me the promotion.',
          'I had been waiting for nearly an hour when she finally called.',
        ],
      },
      {
        base: 'In hindsight, I should have [verb-ed] [object].',
        substitutions: [
          'In hindsight, I should have asked more questions.',
          'In hindsight, I should have left much earlier.',
          'In hindsight, I should have told her the truth from the start.',
        ],
      },
    ],

    speakingChecklist: [
      'I set the scene clearly at the beginning.',
      'I used Past Continuous for background or interrupted actions.',
      'I used Past Perfect to show what had happened before the main story moment.',
      'I used Past Perfect Progressive to express duration before a key moment.',
      'I used at least one past modal (should have, must have, might have, etc.).',
      'I included at least two storytelling chunks from this unit.',
      'I used specific vocabulary (narrative verbs, descriptive adjectives).',
      'I reflected on events at the end rather than just stopping.',
      'My narrative had a clear structure: scene → background → event → reflection.',
      'I maintained fluency and didn\'t stop to translate in my head.',
    ],
  },
});

// ─── WRITING ────────────────────────────────────────────────────────────────

const writing002 = createWritingLesson({
  ...common,
  id: 'B2-WRITING-002',
  title: 'Personal narrative paragraph with advanced past tenses',
  order: 2,
  theory: {
    introduction: `A B2 narrative paragraph doesn't just describe a sequence of events — it creates atmosphere, manages time through precise tense use, and reflects on meaning. This lesson focuses on how to structure a single rich narrative paragraph that demonstrates full B2 command of past tenses and storytelling language.`,

    modelText: `It was already past eleven when I arrived at the station — later than I had planned, and later than I had any right to be. For over an hour, I had been standing on a cold platform in the wrong city, having misread the departure board. By the time I reached the right train, it had almost left. I threw myself into the last carriage just as the doors closed, and sat there for a moment, trying to catch my breath. The compartment was empty except for an elderly man who was reading, apparently undisturbed by the dramatic entrance. He glanced up briefly, then returned to his book. "You should have left earlier," he said, without looking up. I didn't reply. He was utterly right.`,

    modelBreakdown: [
      { sentence: 'It was already past eleven when I arrived at the station.', note: 'Past Continuous ("was") sets background atmosphere; Simple Past ("arrived") opens the scene.' },
      { sentence: 'later than I had planned, and later than I had any right to be.', note: 'Past Perfect ("had planned") — background preparation before the story moment.' },
      { sentence: 'For over an hour, I had been standing on a cold platform in the wrong city.', note: 'Past Perfect Progressive — duration before the story moment.' },
      { sentence: 'By the time I reached the right train, it had almost left.', note: '"By the time" + Past Perfect — deadline structure.' },
      { sentence: 'I threw myself into the last carriage just as the doors closed.', note: 'Simple Past for main narrative action sequence.' },
      { sentence: '"You should have left earlier," he said, without looking up.', note: 'Past modal for criticism/regret, embedded in direct speech for immediacy.' },
    ],

    writingBlocks: [
      {
        block: 'Opening line — time + place + tone',
        guidance: 'Your first sentence should anchor us in time and place immediately. Use Simple Past for the main action. Set the tone with a detail (late, cold, quiet, unexpected).',
        examples: [
          'It was late afternoon by the time I found the house.',
          'The morning had not started well.',
          'I was already running twenty minutes behind when everything got worse.',
        ],
      },
      {
        block: 'Background — what had been happening',
        guidance: 'Explain what had been going on before this moment. Use Past Perfect Simple (facts/completions) and Past Perfect Progressive (duration).',
        examples: [
          'I had been travelling alone for three days and hadn\'t spoken to anyone.',
          'She had already decided to leave — she just hadn\'t told anyone yet.',
          'We had been waiting for that call for weeks.',
        ],
      },
      {
        block: 'The scene — what was happening around you',
        guidance: 'Use Past Continuous to paint the background while your main actions occur.',
        examples: [
          'Rain was still falling, and the streets were beginning to empty.',
          'People were moving around him, barely noticing the argument.',
          'The lights in the corridor were flickering.',
        ],
      },
      {
        block: 'The key moment — the main event',
        guidance: 'Use Simple Past for the sequence of main events. Keep sentences shorter for pace. Use precise narrative verbs.',
        examples: [
          'He handed me the letter and walked away without looking back.',
          'I froze for a moment, then turned around.',
          'The door opened. Nobody came in.',
        ],
      },
      {
        block: 'Reflection — looking back',
        guidance: 'Close with a reflection. Use a storytelling chunk, past modal, or contrasting comment.',
        examples: [
          'In hindsight, I should have left an hour earlier.',
          'It turned out that what I\'d been looking for had been there all along.',
          'To this day, I\'m not sure what made me turn back.',
        ],
      },
    ],

    grammarForWriting: [
      {
        point: 'Past Perfect Simple vs Progressive in narrative',
        rule: 'Use Past Perfect Simple for completed actions before the story moment. Use Past Perfect Progressive for duration before the story moment.',
        example: 'She had prepared everything carefully. (completed) / She had been preparing all morning. (duration)',
      },
      {
        point: 'By the time + Past Perfect',
        rule: "'By the time' + Simple Past sets a deadline; use Past Perfect in the result clause.",
        example: 'By the time we arrived, the film had already started.',
      },
      {
        point: 'Just as / As soon as + sequence',
        rule: "'Just as' + Past Continuous signals the exact moment of interruption. 'As soon as' + Simple Past signals immediate sequence.",
        example: 'Just as she was leaving, the phone rang. / As soon as he arrived, he apologised.',
      },
      {
        point: 'Past modal for reflection',
        rule: "End narratives with 'should have / could have / needn't have' to evaluate decisions with hindsight.",
        example: 'I should have said something sooner. / She could have taken a different path.',
      },
    ],

    usefulSentenceStems: [
      'It was already [time/weather/situation] when I…',
      'I had been [verb+ing] for [duration] when…',
      'By the time [someone] [did something], I had already…',
      'Just as I was about to…, [event] happened.',
      'In hindsight, I should have…',
      'It turned out that…, which was something I hadn\'t expected.',
      'To this day, I still don\'t know…',
    ],

    draftTask: {
      prompt: 'Write a personal narrative paragraph of 120-180 words. Choose one of the following topics, or propose your own.',
      options: [
        'A journey that didn\'t go as planned',
        'A moment when you said something and immediately wished you hadn\'t',
        'A time when you arrived somewhere and found everything different from what you expected',
      ],
      requirements: [
        'At least one Past Perfect Simple or Progressive',
        'At least one Past Continuous for background or interrupted action',
        'At least one past modal for reflection',
        'At least one storytelling chunk',
        'At least two precise narrative verbs from B2-VOCABULARY-004',
        'A clear reflection or closing line',
      ],
    },

    revisionChecklist: [
      'My opening line anchors time and place clearly.',
      'I used Past Perfect (Simple or Progressive) for backstory.',
      'I used Past Continuous for the background scene.',
      'I used Simple Past for the main sequence of events.',
      'I included at least one past modal (should have, must have, etc.).',
      'I used at least one storytelling chunk naturally.',
      'I used precise verbs (not just "walked", "said", "looked").',
      'My closing line reflects on or evaluates the event.',
      'My paragraph has one clear, unified focus — not multiple separate stories.',
      'Word count is within range (120-180 words).',
    ],

    commonMistakes: [
      {
        mistake: 'Mixing up simple past and past perfect without a clear reason.',
        correction: 'Ask: did this happen BEFORE the main story moment, or AT the story moment? Before → Past Perfect. At the moment → Simple Past.',
      },
      {
        mistake: 'Using "had been + simple past verb" instead of past participle.',
        correction: "'Had been + past participle' (passive) is different from 'had + past participle' (active). Check your participles: 'gone', 'done', 'written', 'seen'.",
      },
      {
        mistake: "Starting too many sentences with 'Then' or 'After that'.",
        correction: "Vary temporal connectors: 'just as', 'by the time', 'as soon as', 'no sooner...than', 'once', 'before long'.",
      },
      {
        mistake: 'Writing the reflection as a separate, unconnected conclusion.',
        correction: "The reflection should connect to the specific story just told. Use 'in hindsight', 'it turned out that', or 'to this day' to anchor it to your narrative.",
      },
    ],
  },
});

// ─── EXPORTS ─────────────────────────────────────────────────────────────────

export const B2_DEEP_NARRATIVES_PART1 = Object.freeze([
  grammar004,
  grammar005,
  grammar006,
  vocabulary004,
  vocabulary005,
  vocabulary006,
  reading002,
  listening002,
  speaking002,
  writing002,
]);

export const B2_DEEP_NARRATIVES_PART1_BY_PILLAR = Object.freeze({
  grammar: Object.freeze([grammar004, grammar005, grammar006]),
  vocabulary: Object.freeze([vocabulary004, vocabulary005, vocabulary006]),
  reading: Object.freeze([reading002]),
  listening: Object.freeze([listening002]),
  speaking: Object.freeze([speaking002]),
  writing: Object.freeze([writing002]),
  checkpoint: Object.freeze([]),
});
