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
  tags: ['b2-3', 'abstract-discussion', 'conditionals', 'concession', 'deep-approved-target'],
};

// ─── GRAMMAR ────────────────────────────────────────────────────────────────

const grammar007 = createGrammarLesson({
  ...common,
  id: 'B2-GRAMMAR-007',
  title: 'Mixed conditionals: past → present and present → past',
  order: 7,
  theory: {
    explanation: `Mixed conditionals combine time references across the two parts of a conditional sentence. They are essential for expressing how past events affect the present, or how a present reality reflects a past missed opportunity.

**Review: the core conditional types**

| Type | Form | Meaning |
|---|---|---|
| Type 2 | If + past simple, would + base verb | Unreal present / general hypothetical |
| Type 3 | If + past perfect, would have + p.p. | Unreal past — imagining a different past |

**Mixed Conditional Type A: Past condition → Present result**

*If + Past Perfect (if-clause) + would + base verb (result)*

This answers: "If that thing had happened differently in the past, where would I be NOW?"

> *If she had studied medicine, she would be a doctor now.*
> (She didn't study medicine in the past → she's not a doctor now)

> *If he hadn't emigrated in 1990, he would still be living in Portugal.*
> (He did emigrate → he's not in Portugal now)

> *If they had invested earlier, the company would be worth a lot more today.*
> (They didn't invest early → the company is not very valuable now)

**Key signal**: The if-clause refers to the PAST (past perfect). The result refers to NOW (would + base verb, often with *now*, *today*, *still*, *at the moment*).

**Mixed Conditional Type B: Present reality → Past consequence**

*If + Past Simple (if-clause) + would have + p.p. (result)*

This answers: "Given what is true about me/the world NOW, what would have been different in the past?"

> *If I were braver, I would have spoken up at the meeting yesterday.*
> (I'm not brave now → I didn't speak up yesterday)

> *If she weren't so stubborn, she would have accepted the offer.*
> (She is stubborn now → she didn't accept the offer — past result)

> *If it weren't so expensive to travel, I would have visited much sooner.*
> (It is expensive now, generally → I didn't visit sooner)

**Key signal**: The if-clause refers to a PRESENT or GENERAL truth. The result is about a PAST specific event.

**Comparing Type 3 and Mixed A**

| Structure | Example | Meaning |
|---|---|---|
| Type 3 (pure) | *If she had left earlier, she would have caught the train.* | Both past: missed opportunity in the past |
| Mixed A | *If she had left earlier, she would be home now.* | Past cause → present result |

**Common patterns with mixed conditionals**

- *If I had taken that job, I would be living in New York now.*
- *If we hadn't met that day, I wouldn't know him at all.*
- *If she were more confident, she would have applied for the promotion last year.*
- *If the climate weren't changing, we wouldn't have experienced those floods in 2023.*`,

    brazilianMistakes: [
      {
        wrong: "If she had studied more, she would had passed.",
        right: "If she had studied more, she would have passed.",
        explanation: "The result clause in Type 3 is 'would HAVE + past participle' — never 'would had'. 'Would had' does not exist in English.",
      },
      {
        wrong: "If I would have known, I would have told you.",
        right: "If I had known, I would have told you.",
        explanation: "Never use 'would have' in the if-clause. The if-clause uses past perfect ('had known') — the 'would' appears only in the result clause.",
      },
      {
        wrong: "If she studied harder in the past, she would be a doctor now.",
        right: "If she had studied harder, she would be a doctor now.",
        explanation: "For a past condition, use Past Perfect in the if-clause ('had studied'), not simple past.",
      },
      {
        wrong: "If it wouldn't rain so much, the crops would have been better this year.",
        right: "If it didn't rain so much, the crops would have been better this year.",
        explanation: "In a Mixed B conditional, the if-clause uses Past Simple ('didn't rain') to describe a present/general truth — not 'wouldn't'.",
      },
      {
        wrong: "If he had more money now, he would have travelled more in his life.",
        right: "If he had had more money, he would have travelled more in his life.",
        explanation: "Past condition requires Past Perfect: 'had had' (had + had). The double 'had' is correct and necessary.",
      },
    ],

    grammarTable: [
      { structure: 'Mixed A: Past condition → Present result', example: 'If I had taken that job, I would be in London now.', note: 'If + past perfect, would + base verb' },
      { structure: 'Mixed B: Present reality → Past consequence', example: "If she weren't so shy, she would have asked.", note: 'If + past simple, would have + p.p.' },
      { structure: 'Type 3 (pure past)', example: 'If we had left earlier, we would have arrived on time.', note: 'If + past perfect, would have + p.p.' },
      { structure: 'Type 2 (pure present)', example: 'If I had more time, I would help you.', note: 'If + past simple, would + base verb' },
      { structure: 'Mixed A with "still"', example: "If she hadn't moved, she would still be living there.", note: '"Still" marks the present result' },
      { structure: 'Mixed B with "yesterday"', example: 'If I were more organised, I would have finished yesterday.', note: 'Present state + specific past result' },
    ],

    exercises: [
      {
        type: 'multipleChoice',
        question: 'If we ________ that company in 2010, we would be extremely wealthy now.',
        options: ['bought', 'had bought', 'would buy', 'would have bought'],
        correctIndex: 1,
        explanation: "Past condition (if-clause) → present result ('now'). Use Past Perfect in the if-clause: 'had bought'.",
      },
      {
        type: 'multipleChoice',
        question: "If he weren't so impatient, he ________ to hear the full explanation.",
        options: ['would wait', 'would have waited', 'had waited', 'will wait'],
        correctIndex: 1,
        explanation: "Mixed B: present reality ('he is impatient') → past result ('he didn't wait'). Use 'would have + past participle' in the result clause.",
      },
      {
        type: 'multipleChoice',
        question: 'She ________ a completely different life if she had stayed in Brazil.',
        options: ['has', 'would have', 'would be having', 'had had'],
        correctIndex: 1,
        explanation: "Mixed A: past condition ('had stayed') → present result. 'Would have' here means 'would have [a life]' — 'would be having' is also possible but less natural here.",
      },
      {
        type: 'production',
        prompt: "Write three mixed conditional sentences about yourself or someone you know:\n(1) A past choice that has consequences in your present life now.\n(2) A present personal quality that would have affected a past situation.\n(3) A world condition (climate, technology, politics) that, if different in the past, would affect the present.",
        model: "(1) If I had stayed in engineering, I would have a much higher salary now — but I probably wouldn't be doing something I love. (2) If I were less cautious, I would have taken that opportunity when it came up last year. (3) If governments had acted on climate warnings in the 1990s, we would not be facing the level of crisis we see today.",
      },
    ],
  },
});

const grammar008 = createGrammarLesson({
  ...common,
  id: 'B2-GRAMMAR-008',
  title: 'Concession structures: although, even though, despite, whereas, while',
  order: 8,
  theory: {
    explanation: `Concession structures present a surprising or contrasting idea alongside a main point. At B2, using these accurately and fluently signals sophisticated argumentation — the ability to acknowledge one side while maintaining your own position.

**What is concession?**

Concession = "I admit X is true, BUT my main point still stands."
> *Although the plan has some advantages, the risks outweigh the benefits.*
> — You admit advantages exist, but your conclusion is: risks win.

This differs from simple contrast (but/however), where both sides are given equal weight. Concession explicitly acknowledges an opposing point before presenting the main argument.

**The key concession structures**

| Structure | Pattern | Notes |
|---|---|---|
| *although / even though* | + full clause (subject + verb) | *Although she was tired, she stayed.* |
| *though* | + full clause (more informal) | *He was late, though he tried his best.* |
| *despite* | + noun phrase / gerund | *Despite the rain, they played on.* |
| *in spite of* | + noun phrase / gerund | *In spite of her experience, she wasn't hired.* |
| *whereas* | + full clause | *I like coffee, whereas she prefers tea.* (contrast of two different things) |
| *while* | + full clause | *While I understand your point, I disagree.* (formal concession) |
| *even so* | stands alone, at start of sentence | *The policy failed. Even so, it was worth trying.* |
| *nevertheless / nonetheless* | stands alone, at start of sentence | *The evidence is limited. Nevertheless, the findings are significant.* |
| *for all + noun phrase* | formal | *For all its advantages, the system has serious flaws.* |

**Although vs Even Though**

Both introduce a subordinate clause of concession. *Even though* is slightly stronger — it emphasises the surprising nature of the contrast more forcefully.
> *Although it was raining, we went.* (neutral)
> *Even though it was raining, we went.* (stronger: you'd normally expect us NOT to go)

**Despite vs Although**

The most common B2 confusion:
- *Despite* + noun/gerund (NO subject + verb)
  > *Despite the challenges, she succeeded.*
  > *Despite feeling nervous, he spoke clearly.*
- *Although* + full clause (subject + verb required)
  > *Although the challenges were significant, she succeeded.*

**NEVER**: ~~Despite she was tired…~~ — this is the most frequent Brazilian error.

**Whereas vs While**

Both can mark contrast, but *whereas* typically marks a direct factual contrast between two things:
> *The north of the country is mountainous, whereas the south is largely flat.*

*While* is more flexible — it can mean simultaneous actions (temporal), or concession in formal writing:
> *While I appreciate your concern, I think the decision is correct.*

**Position of concession clauses**

Concession clauses can appear before or after the main clause:
- **Before**: *Although the budget was cut, the project continued.* (emphasis on main result)
- **After**: *The project continued, although the budget was cut.* (emphasis on the obstacle)

In formal writing and argument, placing the concession clause FIRST allows you to acknowledge the opposing view before asserting your position.`,

    brazilianMistakes: [
      {
        wrong: "Despite she worked hard, she didn't get the promotion.",
        right: "Despite working hard, she didn't get the promotion. / Although she worked hard, she didn't get the promotion.",
        explanation: "'Despite' cannot be followed by a full clause (subject + verb). Use 'despite + gerund/noun' or switch to 'although/even though + clause'.",
      },
      {
        wrong: "Even though of the rain, we went outside.",
        right: "Despite the rain, we went outside. / Even though it was raining, we went outside.",
        explanation: "'Even though' + full clause (not 'of + noun'). If you want to use a noun phrase, use 'despite' or 'in spite of'.",
      },
      {
        wrong: "Although the plan failed, but we learned from it.",
        right: "Although the plan failed, we learned from it.",
        explanation: "Do NOT use 'but' and 'although' in the same sentence — they both create the contrast. Choose one: 'Although the plan failed, we learned' OR 'The plan failed, but we learned'.",
      },
      {
        wrong: "Whereas I agree with you, but I think we need more data.",
        right: "While I agree with you, I think we need more data.",
        explanation: "'Whereas' usually contrasts two factual differences. For a concession in argument ('I admit X, but...'), use 'while' or 'although'. Again, no 'but' alongside these.",
      },
      {
        wrong: "Despite of her experience, she struggled.",
        right: "Despite her experience, she struggled. / In spite of her experience, she struggled.",
        explanation: "'Despite' does NOT take 'of'. Only 'in spite OF' uses 'of'. 'Despite of' is a very common error.",
      },
    ],

    grammarTable: [
      { structure: 'although / even though + clause', example: 'Although the evidence is limited, the conclusion seems sound.', note: 'Full clause required; "even though" is stronger' },
      { structure: 'despite / in spite of + noun/gerund', example: 'Despite the high cost, the project was approved.', note: 'NO subject+verb after despite' },
      { structure: 'while + clause (concession)', example: 'While I understand the concern, I think the risk is manageable.', note: 'Formal; acknowledges opposing view' },
      { structure: 'whereas + clause (contrast)', example: 'Urban areas grew rapidly, whereas rural regions declined.', note: 'Two different things contrasted directly' },
      { structure: 'nevertheless / nonetheless', example: 'The data is inconclusive. Nevertheless, the trend is clear.', note: 'Standalone; formal discourse marker' },
      { structure: 'even so', example: 'It was a difficult decision. Even so, I stand by it.', note: 'Less formal than nevertheless' },
      { structure: 'for all + noun', example: 'For all its complexity, the system works well in practice.', note: 'Formal; literary register' },
    ],

    exercises: [
      {
        type: 'multipleChoice',
        question: '________ earning a high salary, she was deeply unhappy in the role.',
        options: ['Although', 'Despite', 'Even though', 'Whereas'],
        correctIndex: 1,
        explanation: "'Despite + noun phrase/gerund' — 'earning' is a gerund. 'Although' would require a full clause ('Although she was earning...').",
      },
      {
        type: 'multipleChoice',
        question: 'Public transport is efficient in the capital, ________ smaller cities still rely almost entirely on private cars.',
        options: ['despite', 'even so', 'whereas', 'although'],
        correctIndex: 2,
        explanation: "'Whereas' is used to contrast two different situations factually — capital (efficient transport) vs smaller cities (private cars).",
      },
      {
        type: 'multipleChoice',
        question: 'The proposal was well-argued. ________, the committee rejected it.',
        options: ['Although', 'Despite', 'Nevertheless', 'Whereas'],
        correctIndex: 2,
        explanation: "'Nevertheless' is a standalone connector used between two sentences to introduce a surprising or contrasting result. The other options require a subordinate clause.",
      },
      {
        type: 'production',
        prompt: "Write four sentences on the topic of remote work, using one different concession structure in each: (1) although, (2) despite + gerund, (3) while (for concession), (4) nevertheless.",
        model: "(1) Although remote work increases flexibility, it can lead to professional isolation. (2) Despite offering significant cost savings for companies, remote work remains controversial in many sectors. (3) While I recognise the benefits of working from home, I believe face-to-face collaboration is irreplaceable for creative work. (4) Many employees report higher productivity when working remotely. Nevertheless, managers often struggle to maintain team cohesion in virtual environments.",
      },
    ],
  },
});

const grammar009 = createGrammarLesson({
  ...common,
  id: 'B2-GRAMMAR-009',
  title: 'Passive voice in formal argument: be + past participle, get-passive, have something done',
  order: 9,
  theory: {
    explanation: `Passive voice is not about avoiding the subject — it's a strategic choice. In academic and formal writing, passive structures shift the focus to the action, the result, or the object affected, rather than the agent. Mastering passive voice is essential for B2 formal writing and argument.

**When to choose passive in formal argument**

1. **The agent (doer) is unknown**: *The documents were leaked to the press.*
2. **The agent is obvious or unimportant**: *The law was passed in 1994.* (by Parliament — implied)
3. **The focus should be on the result, not the doer**: *The vaccine was developed in record time.*
4. **Formal impersonal tone**: *It has been argued that... / It is widely believed that...*
5. **The agent is deliberately withheld**: *Mistakes were made.* (classic political passive)

**Forms of the passive across tenses**

| Tense | Passive form | Example |
|---|---|---|
| Present Simple | am/is/are + p.p. | *The report is published annually.* |
| Present Continuous | am/is/are being + p.p. | *The data is being analysed.* |
| Past Simple | was/were + p.p. | *The building was destroyed in 1940.* |
| Past Continuous | was/were being + p.p. | *The proposal was being reviewed when I arrived.* |
| Present Perfect | has/have been + p.p. | *Three candidates have been shortlisted.* |
| Past Perfect | had been + p.p. | *The decision had already been made.* |
| Future Simple | will be + p.p. | *Results will be announced next week.* |
| Modal passive | modal + be + p.p. | *The issue should be addressed urgently.* |

**Impersonal passive constructions (formal argument)**

These are very common in B2 formal writing and academic discourse:

| Structure | Example |
|---|---|
| *It is + adj + that clause* | *It is widely acknowledged that the policy failed.* |
| *It is + past participle + that* | *It has been suggested that further research is needed.* |
| *It is generally believed / argued / claimed / reported + that* | *It is often claimed that social media reduces attention spans.* |
| *Subject + is said / thought / believed / reported + to infinitive* | *The proposal is thought to be unworkable.* |

**Get-passive (informal)**

*Get + past participle* is used in informal or spoken contexts, especially for unexpected or negative events:
> *She got fired last week.* (more informal than "She was fired")
> *He got hurt in the accident.*
> *The car got stolen.*

Avoid get-passive in formal writing — use be-passive instead.

**Have/Get something done (causative)**

Different from the passive — this structure means you arranged for someone else to do something for you:
> *I had my car repaired.* (I arranged for someone to repair it)
> *She had her hair cut.*
> *We need to get the report checked before the deadline.*

This is NOT the same as passive: *My car was repaired* (passive, focus on action) vs *I had my car repaired* (causative, you arranged it).`,

    brazilianMistakes: [
      {
        wrong: "The project was being finished when the client called.",
        right: "The project was being finished when the client called.",
        explanation: "Actually correct! Past Continuous Passive: 'was/were being + past participle'. This is often avoided by Brazilians due to its complexity, but it is correct.",
      },
      {
        wrong: "It is generally thought that the decision was wrong made.",
        right: "It is generally thought that the decision was made wrongly. / The decision was thought to have been wrong.",
        explanation: "Word order: 'was wrongly made' or restructure the sentence. Don't place the adverb between the verb and past participle.",
      },
      {
        wrong: "The house was built by ancient times.",
        right: "The house was built in ancient times.",
        explanation: "'By' introduces the agent (the doer). For time, use 'in': 'built in the 18th century', 'built in ancient times'.",
      },
      {
        wrong: "I had cut my hair yesterday.",
        right: "I had my hair cut yesterday. / I got my hair cut yesterday.",
        explanation: "'Had my hair cut' = causative (someone did it for you). 'Had cut' = past perfect active (I cut it myself). Word order matters: have + object + past participle.",
      },
      {
        wrong: "The problem should addressed immediately.",
        right: "The problem should be addressed immediately.",
        explanation: "Modal passive requires 'be': modal + BE + past participle. Never omit 'be'.",
      },
    ],

    grammarTable: [
      { structure: 'Present perfect passive', example: 'Three solutions have been proposed.', note: 'has/have been + past participle' },
      { structure: 'Modal passive', example: 'This issue must be resolved before the deadline.', note: 'modal + be + past participle' },
      { structure: 'Impersonal: It is + reported + that', example: 'It is reported that negotiations have stalled.', note: 'Very common in formal argument' },
      { structure: 'Subject + is said/thought + to inf.', example: 'The policy is widely considered to be ineffective.', note: 'Formal attribution without naming source' },
      { structure: 'Get-passive (informal)', example: 'She got promoted last month.', note: 'Informal; avoid in formal writing' },
      { structure: 'Causative have/get', example: 'We had the system tested by an independent team.', note: 'have/get + object + past participle' },
    ],

    exercises: [
      {
        type: 'multipleChoice',
        question: 'It ________ that the suspect had been seen near the scene earlier that evening.',
        options: ['is reported', 'is being reported', 'was reported', 'has reported'],
        correctIndex: 2,
        explanation: "'It was reported that' — the reporting happened in the past (past context of the story). 'Was reported' is the correct past tense impersonal passive.",
      },
      {
        type: 'multipleChoice',
        question: 'The final decision ________ until all parties have been consulted.',
        options: ["shouldn't be making", 'should not be made', 'should not made', 'should have been made'],
        correctIndex: 1,
        explanation: "'Should not be made' = modal passive (should + not + be + past participle). The sentence means the decision shouldn't happen until consultations are complete.",
      },
      {
        type: 'multipleChoice',
        question: 'She ________ her apartment painted before selling it.',
        options: ['had', 'got done', 'has had done', 'had painted'],
        correctIndex: 0,
        explanation: "Causative 'have': had + object (her apartment) + past participle (painted). 'She had her apartment painted' = she arranged for someone to paint it.",
      },
      {
        type: 'production',
        prompt: "Rewrite these sentences in a more formal register using passive constructions:\n(1) People widely believe that social inequality has increased.\n(2) The government hasn't resolved the housing crisis.\n(3) Researchers are currently studying the long-term effects.\n(4) Nobody knows exactly when the virus first appeared.",
        model: "(1) It is widely believed that social inequality has increased. (2) The housing crisis has not been resolved by the government. / The housing crisis remains unresolved. (3) The long-term effects are currently being studied. (4) It is not known exactly when the virus first appeared.",
      },
    ],
  },
});

// ─── VOCABULARY ─────────────────────────────────────────────────────────────

const vocabulary007 = createVocabularyLesson({
  ...common,
  id: 'B2-VOCABULARY-007',
  title: 'Concession and qualification language in argument: admittedly, granted, to some extent',
  order: 7,
  theory: {
    introduction: `Strong arguments are not one-sided. B2 speakers and writers qualify their positions, acknowledge opposing views, and use language that signals nuance. This vocabulary — sometimes called "hedging and concession" — is central to academic and professional English at B2+.`,

    words: [
      { word: 'admittedly', definition: 'used to admit that something is true, even if it weakens your argument', example: 'Admittedly, the research has some limitations, but the overall findings are robust.' },
      { word: 'granted', definition: 'used to concede a point before presenting a stronger counter-argument', example: "Granted, the policy is expensive — but the long-term benefits justify the cost." },
      { word: 'to some extent', definition: 'partly but not completely', example: 'To some extent, the criticism is valid — but it ignores the broader context.' },
      { word: 'to a certain degree', definition: 'partially; used similarly to "to some extent"', example: 'The argument is, to a certain degree, compelling.' },
      { word: 'for the most part', definition: 'mostly; in most cases', example: 'For the most part, the results support the hypothesis.' },
      { word: 'broadly speaking', definition: 'in general; without going into detail', example: 'Broadly speaking, the two approaches produce similar outcomes.' },
      { word: 'in broad terms', definition: 'in a general way, without precise detail', example: 'In broad terms, the plan is workable — the details need refinement.' },
      { word: 'by and large', definition: 'on the whole; generally', example: 'By and large, the reforms have been welcomed by the public.' },
      { word: 'on balance', definition: 'considering all factors together', example: 'On balance, the advantages outweigh the disadvantages.' },
      { word: 'all things considered', definition: 'taking everything into account', example: 'All things considered, it was a remarkably successful outcome.' },
      { word: 'it could be argued that', definition: 'a phrase to present a view without fully committing to it', example: 'It could be argued that the benefits of technology outweigh its risks.' },
      { word: 'to a lesser extent', definition: 'to a smaller degree than something else', example: 'Cost is a factor, and, to a lesser extent, so is convenience.' },
    ],

    chunks: [
      { chunk: 'admittedly + clause', example: 'Admittedly, there are risks involved — but that is true of any major policy change.' },
      { chunk: 'granted + clause, + counter-argument', example: 'Granted, the data is incomplete, but the trend is clear enough to act on.' },
      { chunk: 'to some extent + this is true', example: 'To some extent, this is true — but it tells only part of the story.' },
      { chunk: 'on balance, + conclusion', example: 'On balance, the evidence favours intervention rather than inaction.' },
      { chunk: 'broadly speaking, + generalisation', example: 'Broadly speaking, higher education improves lifetime earnings — though exceptions exist.' },
      { chunk: 'it could be argued that + clause', example: 'It could be argued that the real problem lies not in policy but in implementation.' },
      { chunk: 'by and large, + main claim', example: 'By and large, the transition to renewable energy has been smoother than predicted.' },
      { chunk: 'all things considered', example: 'All things considered, the decision to delay was probably the right one.' },
    ],

    dangerousConfusions: [
      {
        words: ['admittedly', 'obviously'],
        explanation: "'Admittedly' signals a concession — you are giving ground on something. 'Obviously' signals something you consider self-evident. Using 'obviously' in an argument can sound condescending (as if the reader should already know this). 'Admittedly' is more rhetorically sophisticated and argument-appropriate.",
        examples: [
          "Admittedly, the solution is expensive. (you concede the cost — strategic)",
          "Obviously, the solution is expensive. (can sound dismissive or arrogant)",
        ],
      },
      {
        words: ['to some extent', 'to a certain extent', 'to a certain degree'],
        explanation: "These three are largely interchangeable. 'To some extent' is the most common. 'To a certain extent' is slightly more formal. 'To a certain degree' is similar but slightly less common. Don't overthink the choice — focus on placing them correctly in the sentence.",
        examples: [
          "The argument is, to some extent, convincing.",
          "To a certain extent, both sides have valid points.",
        ],
      },
    ],

    exercises: [
      {
        type: 'multipleChoice',
        question: '________, the policy has been effective — but it has failed to address the needs of the most vulnerable groups.',
        options: ['Obviously', 'Admittedly', 'Broadly speaking', 'In broad terms'],
        correctIndex: 1,
        explanation: "'Admittedly' introduces a concession: you acknowledge the policy has been effective, then pivot to its failure. This is the classic argument structure: concede → counter-argue.",
      },
      {
        type: 'multipleChoice',
        question: 'The costs and the timeline are both concerns. ________, the proposal is sound.',
        options: ['To some extent', 'On balance', 'Admittedly', 'Granted'],
        correctIndex: 1,
        explanation: "'On balance' = after weighing all factors, this is the conclusion. It's used to close a balanced evaluation before giving a final judgement.",
      },
      {
        type: 'production',
        prompt: "Write a 4-6 sentence paragraph arguing either FOR or AGAINST social media use in schools. You must use at least THREE of the following: admittedly, granted, to some extent, on balance, it could be argued that, broadly speaking.",
        model: "It could be argued that social media has no place in educational settings, given its well-documented potential to distract students. Admittedly, some platforms do offer genuine educational tools — collaborative projects, peer feedback, and access to expert communities. To some extent, therefore, a blanket ban would be an overreaction. Granted, the risks of distraction and misinformation are real — but these are risks that can be managed through proper digital literacy training. On balance, a structured and supervised use of social media is more beneficial than an outright prohibition.",
      },
    ],
  },
});

const vocabulary008 = createVocabularyLesson({
  ...common,
  id: 'B2-VOCABULARY-008',
  title: 'Abstract B2 verbs: undermine, reinforce, reflect, highlight, sustain, challenge',
  order: 8,
  theory: {
    introduction: `These high-frequency abstract verbs are the engines of B2 argumentation. They describe how ideas relate to each other — how one thing supports, contradicts, or complicates another. Controlling these verbs (with their correct collocations) marks the difference between B1 and B2 academic expression.`,

    words: [
      { word: 'undermine', definition: 'weaken or damage something gradually', example: 'Repeated failures undermined public confidence in the government.' },
      { word: 'reinforce', definition: 'make something stronger or more certain; support and strengthen', example: 'The new research reinforces the earlier findings.' },
      { word: 'reflect', definition: 'show or be a sign of something; also: think carefully about', example: 'These statistics reflect a wider trend in consumer behaviour.' },
      { word: 'highlight', definition: 'draw attention to something important', example: 'The report highlights several areas where improvement is needed.' },
      { word: 'sustain', definition: 'maintain or support something over a period of time; also: suffer (sustain an injury/loss)', example: 'It is difficult to sustain economic growth without addressing inequality.' },
      { word: 'challenge', definition: 'question or dispute the validity of something', example: 'Recent evidence challenges the assumption that early intervention is always beneficial.' },
      { word: 'acknowledge', definition: 'admit or recognise the truth or existence of something', example: 'The report acknowledges that the data is incomplete.' },
      { word: 'address', definition: 'deal with or talk about a problem, issue or concern', example: 'The policy fails to address the root causes of poverty.' },
      { word: 'generate', definition: 'produce or create (often abstract: debate, interest, revenue, controversy)', example: 'The proposal generated significant controversy in the media.' },
      { word: 'illustrate', definition: 'show clearly by example or explanation', example: 'This case illustrates the complexity of cross-border regulation.' },
      { word: 'imply', definition: 'suggest something without stating it directly', example: "The data implies a link between screen time and sleep quality." },
      { word: 'establish', definition: 'show something clearly and beyond doubt; also: set up', example: 'Researchers have established a clear correlation between the two variables.' },
    ],

    chunks: [
      { chunk: 'undermine + confidence / credibility / trust / argument', example: 'The scandal undermined public trust in the institution.' },
      { chunk: 'reinforce + findings / stereotype / message / argument', example: 'These results reinforce the findings of the earlier study.' },
      { chunk: 'highlight + the need for / the importance of / a disparity', example: 'The data highlights the need for urgent action.' },
      { chunk: 'challenge + the assumption / the view / the claim / conventional wisdom', example: 'This study challenges the conventional wisdom on diet and exercise.' },
      { chunk: 'address + the issue / the problem / the concern / the question', example: 'The report addresses the question of long-term sustainability.' },
      { chunk: 'generate + debate / interest / controversy / revenue', example: 'The announcement generated considerable debate in academic circles.' },
      { chunk: 'establish + a link / a pattern / a precedent', example: 'Further research is needed to establish a causal link.' },
      { chunk: 'sustain + growth / momentum / an argument / a loss', example: 'It is difficult to sustain this level of growth indefinitely.' },
    ],

    dangerousConfusions: [
      {
        words: ['imply', 'infer'],
        explanation: "'Imply' = the speaker/writer suggests something without saying it directly. 'Infer' = the reader/listener draws a conclusion from what they hear or read. The speaker implies; the listener infers. These are very commonly confused.",
        examples: [
          "The data implies a link between the two factors. (the data suggests it)",
          "From the data, we can infer a link between the two factors. (we draw this conclusion)",
        ],
      },
      {
        words: ['highlight', 'underline'],
        explanation: "Both are used to draw attention to something important. 'Highlight' is more common in formal argument. 'Underline' (in this figurative sense: 'underlines the importance of') is also formal and correct, but slightly less common. They are largely interchangeable in formal writing.",
        examples: [
          "The case highlights the dangers of poor regulation.",
          "The case underlines the importance of clear guidelines.",
        ],
      },
    ],

    exercises: [
      {
        type: 'multipleChoice',
        question: 'The sharp rise in unemployment rates ________ the need for urgent policy intervention.',
        options: ['challenges', 'establishes', 'generates', 'highlights'],
        correctIndex: 3,
        explanation: "'Highlights the need for' is a very common collocation — to highlight = to draw attention to something. The rise in unemployment makes the need for action visible and clear.",
      },
      {
        type: 'multipleChoice',
        question: "A series of data breaches has severely ________ the company's reputation for security.",
        options: ['reinforced', 'undermined', 'sustained', 'reflected'],
        correctIndex: 1,
        explanation: "'Undermined' = gradually damaged or weakened. Data breaches damage a reputation for security — they do not reinforce or sustain it.",
      },
      {
        type: 'production',
        prompt: "Write 4 sentences on the topic of artificial intelligence in the workplace. Each sentence must use one of these verbs: highlight, challenge, generate, reinforce. Use different subjects for each sentence.",
        model: "The rise of AI in recruitment processes highlights serious concerns about algorithmic bias. This development challenges long-held assumptions about which tasks require human judgement. Automation has generated widespread debate about the future of work and economic inequality. At the same time, some early findings reinforce the view that AI can enhance rather than replace human decision-making.",
      },
    ],
  },
});

// ─── READING ────────────────────────────────────────────────────────────────

const reading003 = createReadingLesson({
  ...common,
  id: 'B2-READING-003',
  title: 'Is technology making us less human? — argumentative article critical reading',
  order: 3,
  theory: {
    preReading: {
      vocabulary: [
        { word: 'erode', definition: 'gradually weaken or destroy something over time' },
        { word: 'outsource', definition: 'transfer a task or responsibility to an external source (here: to technology)' },
        { word: 'autonomy', definition: "freedom and ability to act independently and make one's own decisions" },
        { word: 'profound', definition: 'very deep, significant, or far-reaching' },
        { word: 'nuanced', definition: 'showing awareness of subtle distinctions and differences; not black and white' },
        { word: 'pervasive', definition: 'spreading widely through an area or group; present everywhere' },
      ],
      activationQuestion: 'Do you think technology has changed the way you think, communicate or remember things? Give a specific example.',
      readingStrategy: 'This is an argumentative article. As you read, identify: (1) the author\'s main claim; (2) the evidence or examples used; (3) any concessions the author makes; (4) the conclusion. Also notice which vocabulary items from B2-VOCABULARY-007 and 008 appear in the text.',
    },

    mainText: `**Is Technology Making Us Less Human?**

*Opinion — The Modern Review*

There is a view, increasingly pervasive in cultural commentary, that digital technology is eroding something essentially human about the way we live, think and relate to one another. Admittedly, this argument has been made before about every major technological shift — from the printing press to the telephone. And yet, there is something qualitatively different about the digital revolution that deserves serious attention.

To some extent, the concern is about attention. Research has repeatedly highlighted the way in which smartphones and social media platforms are engineered to capture and hold our focus, often at the expense of deeper concentration. The average person checks their phone dozens of times per day — a behaviour pattern that reinforces a fragmented, reactive mode of thinking that some neurologists suggest may be reshaping cognitive habits, particularly in younger generations.

The deeper challenge, however, is not about distraction but about outsourcing. Increasingly, we are transferring to machines the kinds of cognitive and emotional labour that once defined human experience. Navigation, memory, even emotional support — these are tasks we increasingly delegate to algorithms. It could be argued that this represents a form of cognitive liberation: freed from the burden of remembering directions, we can devote mental energy to more creative or meaningful pursuits. Granted, there is something to this view. But it also implies a risk: that by consistently outsourcing effort, we may gradually undermine the very capacities that such effort was building.

The question of relationships is still more complex. Digital communication has, by and large, expanded the range and frequency of human contact. For many people — the isolated, the dispersed, the socially anxious — the internet has provided connection that might otherwise have been unavailable. It would be wrong to dismiss this entirely. Nevertheless, the nature of this connection remains contested. There is growing evidence that the quality of digitally mediated relationships differs from face-to-face interaction in ways we do not yet fully understand.

On balance, the question "is technology making us less human?" may be less useful than: "what kind of humans is technology making us?" The former implies a fixed, stable human essence that technology threatens. The latter acknowledges that what it means to be human has always been in negotiation with the tools and environments we create. The task, then, is not to reject technology, but to remain reflective about how we use it — to sustain our capacity for attention, for depth, for genuine connection, in a world that increasingly rewards none of these.`,

    comprehensionQuestions: [
      {
        question: "What is the author's main claim, in one sentence?",
        type: 'summary',
        model: "The author argues that the question should not be whether technology is making us less human, but what kind of humans it is making us — and that we need to remain reflective about how we use it.",
      },
      {
        question: "The author makes two concessions in the article. What are they, and what do they concede?",
        type: 'analytical',
        model: "First concession: 'Admittedly, this argument has been made before about every major technological shift' — the author acknowledges that concern about technology is not new. Second concession: 'Granted, there is something to this view' (that cognitive outsourcing is liberating) — the author acknowledges the benefit of freeing mental energy before arguing the risk of losing cognitive capacity.",
      },
      {
        question: "What does the author mean by 'outsourcing cognitive and emotional labour'? Do you think this is a problem?",
        type: 'evaluative',
        model: "The author means delegating to technology tasks that humans previously did themselves — remembering routes (GPS), storing information (search engines), emotional support (AI chatbots). The concern is that by consistently delegating these tasks, we may lose the mental capacities that performing them developed. Whether this is a problem depends on what you value: efficiency and liberation from cognitive burden vs the skills and resilience built through effort.",
      },
    ],

    languageFocus: [
      {
        item: 'Admittedly, this argument has been made before about every major technological shift.',
        focus: 'Concession marker',
        question: "Why does the author use 'admittedly' here? What effect does it have?",
        explanation: "'Admittedly' signals that the author is granting the opposing side a point before continuing their argument. It makes the author appear balanced and credible — not ignoring counter-arguments, but engaging with them.",
      },
      {
        item: 'it also implies a risk: that by consistently outsourcing effort, we may gradually undermine the very capacities that such effort was building.',
        focus: 'Abstract verb + hedging modal',
        question: "Find the two abstract verbs from B2-VOCABULARY-008 in this sentence. What do they contribute?",
        explanation: "'Implies' (suggests without stating directly) and 'undermine' (gradually weaken). Together, they allow the author to make a careful, qualified claim — not a certain statement, but a possible risk. This is sophisticated argument: making a strong point while acknowledging it is not proven.",
      },
    ],

    productionTask: {
      prompt: "Write 3-4 sentences responding to the article. Use: at least one concession structure (although / despite / admittedly / granted), at least one abstract verb from B2-VOCABULARY-008, and at least one qualification expression from B2-VOCABULARY-007.",
      writingFocus: ['concession structures', 'abstract argument verbs', 'qualification language'],
    },
  },
});

// ─── LISTENING ──────────────────────────────────────────────────────────────

const listening003 = createListeningLesson({
  ...common,
  id: 'B2-LISTENING-003',
  title: 'The housing crisis — panel discussion with contrasting arguments',
  order: 3,
  theory: {
    context: 'You will hear an excerpt from a radio panel discussion on the housing crisis in urban areas. Three speakers — a journalist (RIYA), an economist (FELIX), and a housing activist (AMARA) — discuss the causes and possible solutions.',

    keyVocabulary: [
      { word: 'affordability', definition: 'how affordable something is; the relationship between cost and people\'s ability to pay' },
      { word: 'speculation', definition: 'buying property to sell it at a higher price rather than to live in it' },
      { word: 'incentive', definition: 'something that motivates a person or organisation to do something' },
      { word: 'tackle', definition: 'deal with a problem directly and energetically' },
      { word: 'long-term', definition: 'relating to a period extending far into the future' },
    ],

    preparation: {
      activationQuestion: 'What do you think are the main causes of high housing costs in large cities? Who is responsible for solving the problem?',
      predictionTask: 'Predict: what arguments might an economist, a journalist, and a housing activist each bring to a discussion about housing?',
    },

    transcript: `**RIYA:** We're all looking at cities where ordinary workers can no longer afford to live close to where they work. Felix, from an economic perspective — what's driving this?

**FELIX:** Well, broadly speaking, it's a supply-demand imbalance. Cities have grown much faster than housing supply has responded. Part of that is planning restrictions — the regulatory cost of building anything is enormous. But I think we also need to acknowledge the role of investment speculation. Large amounts of capital have moved into residential property as an asset class, which drives up prices across the board.

**AMARA:** I'd push back a little on the framing of that. It's not just a market failure — it's a policy failure. We've spent forty years undermining the idea that housing is a social right and treating it purely as a commodity. Admittedly, supply matters, and Riya is right to highlight that. But the suggestion that building more will automatically solve affordability challenges the evidence from cities that have built extensively and still have a crisis.

**RIYA:** Do you think rent control is part of the answer?

**AMARA:** It could be part of the answer in the short term — to prevent the most severe displacement. Although it has real risks if applied clumsily — it can reduce incentives to maintain or build rental property. On balance, it probably needs to be paired with other interventions: social housing investment, land value taxation, restrictions on short-term letting.

**FELIX:** I'd agree to a certain degree. The evidence on rent control is genuinely mixed — some studies reinforce the view that it reduces supply, others highlight its role in maintaining stable communities. What I think we can establish clearly is that no single measure will work. The scale of the problem requires a sustained, multi-pronged approach.

**RIYA:** And are governments anywhere getting this right?

**FELIX:** Vienna is often cited as a model — a city that has maintained large-scale public housing over decades. By and large, it has kept affordability at a level other capitals would envy. But it reflects a political consensus about the role of the state in housing that most English-speaking countries have moved away from.

**AMARA:** And that, I think, is the crux. For all its technical complexity, the housing crisis is fundamentally a political question about who cities are for. Granted, there are technical solutions — but they require political will that, to this point, has been largely absent.`,

    firstListen: [
      {
        task: "What two causes of the housing crisis does Felix identify?",
        answer: "Supply-demand imbalance (cities grew faster than housing supply) and investment speculation (capital moving into residential property as an asset).",
      },
      {
        task: "What does Amara say is wrong with the 'just build more' argument?",
        answer: "She says evidence from cities that have built extensively but still have a crisis challenges the assumption that supply alone solves affordability.",
      },
    ],

    secondListen: [
      {
        task: "Find three vocabulary/chunk items from B2-VOCABULARY-007 (concession and qualification language) used in the discussion.",
        answer: "'Admittedly' (Amara), 'to a certain degree' (Felix), 'by and large' (Felix), 'for all its technical complexity' (Amara), 'granted' (Amara), 'on balance' (Amara).",
      },
      {
        task: "What does Felix say about rent control evidence?",
        answer: "He says the evidence is 'genuinely mixed' — some studies reinforce the view that it reduces supply, others highlight its role in maintaining stable communities. He concludes no single measure will work and a 'sustained, multi-pronged approach' is needed.",
      },
      {
        task: "What does Amara mean when she says the housing crisis is 'a political question about who cities are for'?",
        answer: "She means the real question is not technical (what policies to use) but values-based (which groups of people should cities serve — investors or residents, wealthy or ordinary workers). Technical solutions exist, but the political will to prioritise ordinary people is absent.",
      },
    ],

    listeningQuestions: [
      {
        question: "How do Felix and Amara agree and disagree about rent control?",
        type: 'comparative',
        model: "They partially agree: both acknowledge that rent control has risks and that evidence is mixed. They also agree that no single measure works alone. They differ in emphasis: Felix focuses on technical risks (reduced supply incentives), while Amara is more open to rent control as a short-term displacement prevention tool, alongside other interventions.",
      },
      {
        question: "What is the rhetorical function of Amara's phrase 'For all its technical complexity, the housing crisis is fundamentally a political question'?",
        type: 'language',
        model: "'For all + noun phrase' is a formal concession structure — she is acknowledging that the problem is complex technically. But the phrase pivots: 'fundamentally' shifts the emphasis to politics. She is arguing that complexity is not the real barrier — political choice is. This is a classic argument move: concede complexity, then redirect to the core issue.",
      },
      {
        question: "Do you find Felix's or Amara's position more convincing? Use evidence from the discussion.",
        type: 'evaluative',
        model: "Open question — model: I find Amara's position slightly more persuasive. While Felix correctly identifies supply-demand dynamics, Amara challenges the implicit assumption that market mechanisms alone can resolve a crisis that has developed over decades of policy choices. Her point that cities which have built extensively still face affordability crises suggests that supply alone is insufficient — which Felix himself concedes when he says 'no single measure will work.'",
      },
    ],

    shadowingLines: [
      {
        line: "Admittedly, supply matters, and Riya is right to highlight that. But the suggestion that building more will automatically solve affordability challenges the evidence.",
        focus: 'Concession marker + abstract verb',
        tip: "'Admittedly' is spoken with a slight rise in pitch, signalling concession before the 'but'. 'Challenges the evidence' — stress 'challenges' to mark the pivot to the counter-argument.",
      },
      {
        line: "On balance, it probably needs to be paired with other interventions: social housing investment, land value taxation, restrictions on short-term letting.",
        focus: 'Qualification marker + listing',
        tip: "'On balance' opens with a slight pause after it. The list of interventions should be said with clear, even pacing — each item given equal weight.",
      },
      {
        line: "For all its technical complexity, the housing crisis is fundamentally a political question about who cities are for.",
        focus: 'Formal concession + rhetorical punch',
        tip: "'For all its technical complexity' is said calmly. Slight pause. Then 'fundamentally' carries the main stress — it's the pivot word of the whole sentence.",
      },
    ],

    dictationTask: [
      {
        text: "The scale of the problem requires a sustained, multi-pronged approach.",
        focus: 'Abstract argument vocabulary + collocations',
      },
      {
        text: "Admittedly, supply matters — but supply alone is not the answer.",
        focus: 'Concession marker + reduction',
      },
    ],

    oralProduction: {
      prompt: "In 2 minutes, give your own position on one of the following: (a) Should housing be treated as a social right or a commodity? (b) Is technology solving or worsening social inequality? Use concession language, qualification expressions, and at least two abstract verbs from B2-VOCABULARY-008.",
      speakingFocus: ['concession structures', 'qualification language', 'abstract argument verbs', 'sustained argument'],
    },
  },
});

// ─── SPEAKING ───────────────────────────────────────────────────────────────

const speaking003 = createSpeakingLesson({
  ...common,
  id: 'B2-SPEAKING-003',
  title: 'Expressing and defending a nuanced position in discussion',
  order: 3,
  theory: {
    introduction: `At B2, you are expected to do more than state an opinion — you present a position, acknowledge complexity, respond to counter-arguments, and maintain your view under challenge. This lesson gives you the full toolkit for academic and professional discussion in English.`,

    modelPhrases: [
      { category: 'Stating and introducing your position', phrases: [
        'My overall view is that…',
        'On balance, I think the evidence points to…',
        'I would argue that…, despite acknowledging that…',
        'This is a complex issue, but broadly speaking, I believe…',
      ]},
      { category: 'Acknowledging the other side', phrases: [
        'Admittedly, there is something to that argument.',
        "Granted, the evidence on this is mixed — but…",
        'I can see why people hold that view. Nevertheless, I think…',
        'To some extent, that is true. However, the broader picture suggests…',
      ]},
      { category: 'Presenting evidence and examples', phrases: [
        'Research has highlighted that…',
        'A clear example of this is…',
        'This is illustrated by the case of…',
        'The data suggests / implies that…',
      ]},
      { category: 'Qualifying and hedging', phrases: [
        'It could be argued that…, though the evidence is not conclusive.',
        'To a certain degree, this is the case — though exceptions exist.',
        'This is true for the most part, though…',
        'While I recognise that…, I still think…',
      ]},
      { category: 'Responding to a challenge', phrases: [
        "That's a fair point — but I think it overlooks…",
        'I take your point. Nevertheless, I would maintain that…',
        "You're right that... However, that doesn't change the fact that…",
        'I would challenge that assumption — the evidence actually suggests…',
      ]},
      { category: 'Concluding your position', phrases: [
        'On balance, I remain convinced that…',
        'Taking everything into account, the argument for [X] seems stronger.',
        'All things considered, I think the risks outweigh the benefits.',
        'In short, the question is not whether, but how.',
      ]},
    ],

    guidedSpeakingTasks: [
      {
        title: 'Present and defend: technology in education',
        prompt: "Argue one of these positions for 2 minutes, then respond to a challenge:\nPosition A: Technology in schools does more harm than good.\nPosition B: Technology in schools is essential and should be embraced fully.\nPosition C: Technology in schools needs careful, evidence-based integration rather than wholesale adoption or rejection.",
        steps: [
          'State your position clearly in one or two sentences.',
          'Give two pieces of evidence or examples.',
          'Make one concession to the opposing view.',
          'End with a clear conclusion.',
          'Respond to this challenge: "But technology is simply the world students will enter — school must reflect that reality."',
        ],
        model: "Position C model: Broadly speaking, I think the question is not whether to use technology in schools, but how. The evidence is genuinely mixed — research has highlighted benefits in areas like collaborative learning and access to information, but also concerns about distraction and the impact on deep reading. Admittedly, students will enter a technological world, and schools should prepare them for it. Nevertheless, preparation does not mean uncritical adoption. On balance, a structured, evidence-based approach — where technology serves clear pedagogical goals — seems far more defensible than either blanket rejection or blanket embrace. [Response to challenge:] That's a fair point — and I don't disagree that schools should reflect students' future environment. But I would challenge the assumption that more technology automatically means better preparation. What students also need are the skills that technology can undermine: sustained attention, critical reading, and the ability to think without immediate external input.",
        languageFocus: 'Concession markers, qualification expressions, abstract verbs, responding to challenge phrases.',
      },
      {
        title: 'Two-minute argument: a social or ethical question',
        prompt: "Choose ONE question and argue a clear position for 2 minutes:\n(1) Should voting be compulsory?\n(2) Is privacy more important than security?\n(3) Should universities be free for all students?\nYou must: state your position, give evidence, make one concession, and conclude.",
        steps: [
          'Open with a clear, direct statement of your view.',
          'Give two supporting points with examples or evidence.',
          'Acknowledge the strongest counter-argument.',
          "Dismiss or limit it with a 'nevertheless' or 'even so'.",
          'Close with your final conclusion.',
        ],
        model: "I would argue that compulsory voting, while it may seem to infringe on individual liberty, is ultimately justified in a functioning democracy. Broadly speaking, low turnout means that elected governments represent only a portion of the population — which undermines their legitimacy. This is illustrated by elections where under 40% of eligible voters participate, yet the winners claim a democratic mandate. Admittedly, forcing people to vote doesn't guarantee meaningful engagement — a blank vote or a protest vote is not the same as an informed one. Nevertheless, evidence from countries with compulsory voting suggests that these systems generate higher levels of civic knowledge and engagement over time, not just compliance. On balance, the collective benefit of full democratic participation outweighs the limited restriction on individual choice.",
        languageFocus: 'Full argument structure: position → evidence → concession → counter → conclusion.',
      },
    ],

    recordingTasks: [
      {
        duration: '2 minutes',
        prompt: "Choose a topic you have a genuine opinion on (not from the lesson). Argue your position using the full structure: clear position → evidence/examples → concession → maintained conclusion. Use at least four of the model phrases from this lesson.",
        checklist: [
          'I stated my position clearly in the opening.',
          'I gave at least two pieces of evidence or examples.',
          'I acknowledged the opposing view with a concession marker.',
          'I maintained my position despite the concession.',
          'I used at least one abstract verb from B2-VOCABULARY-008.',
          'I concluded clearly.',
        ],
      },
      {
        duration: '90 seconds',
        prompt: "Respond to this statement: 'Social media has done more harm than good for democracy.' State whether you agree, partially agree, or disagree — and explain why using qualification language.",
        checklist: [
          'I used "to some extent", "on balance" or another qualification phrase.',
          'I acknowledged both sides.',
          'My response was clearly structured.',
          'I maintained a consistent position throughout.',
        ],
      },
    ],

    freeSpeakingPrompts: [
      "Is it possible to be both patriotic and globally minded? How do you balance loyalty to your own country with concern for global problems?",
      "Should governments limit how much any individual can earn? What are the arguments for and against?",
    ],

    substitutionDrills: [
      {
        base: 'Admittedly, [concession] — but [main argument].',
        substitutions: [
          'Admittedly, the policy is expensive — but the long-term gains justify the cost.',
          'Admittedly, no system is perfect — but this one has consistently outperformed the alternatives.',
          'Admittedly, some studies challenge this view — but the weight of evidence supports it.',
        ],
      },
      {
        base: 'To some extent, [concession]. Nevertheless, [maintained position].',
        substitutions: [
          'To some extent, this is true. Nevertheless, the core argument remains valid.',
          'To some extent, both sides have merit. Nevertheless, the evidence favours intervention.',
          'To some extent, the concern is legitimate. Nevertheless, it overstates the risk.',
        ],
      },
    ],

    speakingChecklist: [
      'I stated my position clearly and early.',
      'I used at least two pieces of evidence or examples.',
      'I acknowledged the opposing view (not ignored it).',
      'I used a concession marker correctly (admittedly / granted / to some extent).',
      'I maintained my position after the concession.',
      'I used at least one abstract verb from B2-VOCABULARY-008.',
      'I used at least one qualification phrase from B2-VOCABULARY-007.',
      'I concluded with a clear final statement.',
      'I maintained fluency without long pauses.',
      'My argument was coherent from start to finish (not circular).',
    ],
  },
});

// ─── WRITING ────────────────────────────────────────────────────────────────

const writing003 = createWritingLesson({
  ...common,
  id: 'B2-WRITING-003',
  title: 'Discursive paragraph: presenting and qualifying a position in formal argument',
  order: 3,
  theory: {
    introduction: `A discursive paragraph at B2 level presents a position, supports it with evidence or reasoning, acknowledges complexity, and arrives at a clear conclusion. This is the core unit of academic and professional argument in English — mastering this structure prepares you for essays, reports, and professional writing.`,

    modelText: `The widespread adoption of artificial intelligence in the workplace raises important questions about the future of employment. It could be argued that automation represents a continuation of historical patterns — every major technological revolution has displaced certain jobs while creating new ones. Admittedly, this is true to a certain extent: the industrial revolution eliminated artisan trades while generating factory work, and the digital era created entire industries that did not exist in 1980. Nevertheless, there is growing evidence that the current wave of AI development differs in a significant way: it is beginning to affect not only routine manual tasks but also cognitive and creative work that was previously considered beyond automation's reach. Research has highlighted the potential displacement of roles in law, medicine, journalism, and design — sectors once thought immune. On balance, while the evidence does not support the conclusion that AI will eliminate work entirely, it does suggest that the transition will be uneven, rapid, and, for many workers, deeply disruptive. Sustained policy attention — in education, retraining, and social protection — is therefore urgently required.`,

    modelBreakdown: [
      { sentence: 'The widespread adoption of artificial intelligence in the workplace raises important questions about the future of employment.', note: 'Opening: introduce the topic and why it matters (no position yet — sets up the discussion).' },
      { sentence: 'It could be argued that automation represents a continuation of historical patterns.', note: 'Present a position/argument — hedged with "it could be argued that".' },
      { sentence: 'Admittedly, this is true to a certain extent: the industrial revolution eliminated artisan trades while generating factory work.', note: 'Concession with historical evidence — acknowledges the argument before the pivot.' },
      { sentence: 'Nevertheless, there is growing evidence that the current wave of AI development differs in a significant way.', note: 'Pivot to counter-argument: "nevertheless" signals the turn.' },
      { sentence: 'Research has highlighted the potential displacement of roles in law, medicine, journalism, and design.', note: 'Abstract verb + evidence: "highlighted" is from B2-VOCABULARY-008.' },
      { sentence: 'On balance, while the evidence does not support the conclusion that AI will eliminate work entirely, it does suggest that the transition will be uneven, rapid, and deeply disruptive.', note: 'Qualification + conclusion: "on balance" + hedged conclusion with "suggest".' },
      { sentence: 'Sustained policy attention — in education, retraining, and social protection — is therefore urgently required.', note: 'Final concrete recommendation using passive + abstract vocabulary.' },
    ],

    writingBlocks: [
      {
        block: 'Opening sentence — introduce the issue',
        guidance: "Don't start with your opinion. Introduce the topic and its significance. Use a broad, accurate statement that most readers would accept.",
        examples: [
          'The question of [X] has become increasingly central to debates about [Y].',
          'Few issues in contemporary [field] have generated as much controversy as [X].',
          'The rise of [X] has prompted serious questions about [Y].',
        ],
      },
      {
        block: 'Present the position you will examine',
        guidance: "Introduce the argument, possibly hedged with 'it could be argued that' or 'some maintain that.' This gives you control — you are examining the argument, not necessarily endorsing it yet.",
        examples: [
          'It could be argued that [position].',
          'Proponents of [X] maintain that…',
          'There is a widespread view that…',
        ],
      },
      {
        block: 'Concession — acknowledge the strongest counter-point',
        guidance: "Use 'Admittedly', 'Granted', or 'To some extent'. Give one genuine piece of supporting evidence for the opposing side. This makes you credible.",
        examples: [
          'Admittedly, there is evidence to support this: [example].',
          'Granted, [counter-point] — and this cannot be dismissed.',
          'To some extent, this is true: [evidence].',
        ],
      },
      {
        block: 'Pivot and counter-argument',
        guidance: "Use 'Nevertheless', 'However', or 'And yet'. Present the strongest evidence for your own position. Use abstract verbs: highlight, challenge, reinforce, establish.",
        examples: [
          'Nevertheless, recent research has highlighted [counter-evidence].',
          'However, this view fails to account for [key factor].',
          'And yet, the evidence challenges this assumption in important ways.',
        ],
      },
      {
        block: 'Qualified conclusion',
        guidance: "Use 'On balance', 'All things considered', or 'By and large'. Do not overstate — hedge appropriately. Then add a forward-looking or action-oriented closing sentence.",
        examples: [
          'On balance, the evidence suggests that [qualified conclusion].',
          'All things considered, [position] seems more persuasive, though the debate is far from settled.',
          'By and large, the argument for [X] is stronger — though more research is needed.',
        ],
      },
    ],

    grammarForWriting: [
      {
        point: 'Hedging with modals and phrases',
        rule: "In academic writing, avoid absolute claims. Use: 'it could be argued', 'research suggests', 'the evidence implies', 'there is reason to believe'.",
        example: "NOT: Technology destroys jobs. → The evidence suggests that automation may displace significant numbers of workers in certain sectors.",
      },
      {
        point: 'Passive voice for formal argument',
        rule: "Use passive to focus on findings/actions rather than agents: 'it has been argued', 'research has shown', 'the problem must be addressed'.",
        example: "It is widely acknowledged that the current approach is unsustainable.",
      },
      {
        point: 'Concession + counter-argument sentence pair',
        rule: "Always follow a concession with a counter-argument. The pattern: [concession marker + point]. [Pivot + counter-point].",
        example: "Admittedly, the policy has reduced costs. Nevertheless, the impact on service quality has been significant.",
      },
      {
        point: 'Abstract subject + abstract verb collocation',
        rule: "Strong academic sentences use abstract subjects: 'Research highlights...', 'The data suggests...', 'This case illustrates...'.",
        example: "This finding challenges the assumption that early intervention is always beneficial.",
      },
    ],

    usefulSentenceStems: [
      'It could be argued that…, though the evidence remains inconclusive.',
      'Admittedly, [point] — but this overlooks…',
      'Granted, [concession]: [evidence]. Nevertheless, [counter-argument].',
      'Research has highlighted / established / challenged the view that…',
      'On balance, the evidence suggests / implies that…',
      'This is true to some extent — but only if we ignore…',
      'The debate, ultimately, is about more than [surface issue] — it is about [deeper principle].',
    ],

    draftTask: {
      prompt: 'Write a discursive paragraph of 150-200 words on one of the following topics.',
      options: [
        'Is social media more harmful or beneficial for society?',
        'Should private car ownership be restricted in city centres?',
        'Is economic growth compatible with environmental sustainability?',
      ],
      requirements: [
        'Clear opening that introduces the issue (not just your opinion)',
        'A stated position, hedged appropriately',
        'One concession with marker (admittedly / granted / to some extent)',
        'A pivot to your counter-argument (nevertheless / however)',
        'At least two abstract verbs from B2-VOCABULARY-008',
        'At least one qualification phrase from B2-VOCABULARY-007',
        'A qualified conclusion with "on balance" or "all things considered"',
      ],
    },

    revisionChecklist: [
      'My opening introduces the issue without immediately taking a side.',
      'My position is clear but appropriately hedged.',
      'I made a genuine concession — not a false one.',
      'I pivoted from the concession to my counter-argument clearly.',
      'I used at least two abstract verbs from B2-VOCABULARY-008.',
      'I used at least one qualification phrase from B2-VOCABULARY-007.',
      'My conclusion is qualified — not an absolute claim.',
      'I used passive voice at least once for formal effect.',
      'The paragraph has one unified argument — not multiple separate topics.',
      'Word count is within range (150-200 words).',
    ],

    commonMistakes: [
      {
        mistake: "Conceding and then not counter-arguing — just stopping after 'admittedly'.",
        correction: "Every concession must be followed by a pivot: 'Admittedly X. Nevertheless, Y.' The counter-argument is what makes concession powerful.",
      },
      {
        mistake: "Making absolute claims: 'Technology always...' / 'Everyone agrees...'",
        correction: "Use hedging: 'Technology tends to...', 'Most research suggests...', 'It could be argued that...'",
      },
      {
        mistake: "Using 'but' and 'although' together: 'Although the data is limited, but it suggests...'",
        correction: "Choose one: 'Although the data is limited, it suggests...' OR 'The data is limited, but it suggests...'",
      },
      {
        mistake: "Writing 'Despite she is experienced...' instead of 'Despite her experience...'",
        correction: "'Despite' is always followed by a noun phrase or gerund, never by subject + verb. Use 'although' for full clauses.",
      },
    ],
  },
});

// ─── EXPORTS ─────────────────────────────────────────────────────────────────

export const B2_DEEP_ABSTRACT_DISCUSSION_PART1 = Object.freeze([
  grammar007,
  grammar008,
  grammar009,
  vocabulary007,
  vocabulary008,
  reading003,
  listening003,
  speaking003,
  writing003,
]);

export const B2_DEEP_ABSTRACT_DISCUSSION_PART1_BY_PILLAR = Object.freeze({
  grammar: Object.freeze([grammar007, grammar008, grammar009]),
  vocabulary: Object.freeze([vocabulary007, vocabulary008]),
  reading: Object.freeze([reading003]),
  listening: Object.freeze([listening003]),
  speaking: Object.freeze([speaking003]),
  writing: Object.freeze([writing003]),
  checkpoint: Object.freeze([]),
});
