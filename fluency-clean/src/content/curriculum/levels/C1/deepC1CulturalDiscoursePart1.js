import { createGrammarLesson, createVocabularyLesson, createReadingLesson, createListeningLesson } from '../../../schemas/index.js';

const level = 'C1';
const status = 'ready';
const common = { level, status, estimatedMinutes: 70, tags: ['c1-7', 'cultural-discourse', 'intellectual', 'philosophy', 'deep-approved-target'] };

function task(instruction, note = '', expected = '') { return { instruction, note, expected }; }

export const C1_DEEP_CULTURAL_DISCOURSE_PART1 = Object.freeze([

  // ─── GRAMMAR-016: Subjunctive and hypothetical mood ──────────────────────────
  createGrammarLesson({
    ...common,
    id: 'C1-GRAMMAR-016',
    order: 16,
    title: 'Grammar: The subjunctive and hypothetical mood — distance, desire, and counter-factual thought',
    objectives: [
      'Understand and use the English subjunctive in formal and academic register.',
      'Distinguish between indicative, conditional, and subjunctive moods in complex sentences.',
      'Use counter-factual and hypothetical structures fluently for intellectual discourse.',
      'Avoid Brazilian-influenced errors with modal + infinitive structures.',
    ],
    teacherOpening: 'English has largely absorbed its subjunctive into other structures, but the subjunctive is alive and well in academic, formal, and literary registers — exactly the contexts that matter at C1. It expresses unreality, desire, demand, and counter-factual thought. Mastering it separates formal from semi-formal writing.',
    grammarTable: {
      headers: ['Structure', 'Function', 'Example'],
      rows: [
        ['Present subjunctive (base form)', 'After verbs of demand/recommendation: suggest, recommend, insist, propose, require, ask', '"The committee recommends that the proposal be revised before the next meeting."'],
        ['Present subjunctive (be)', 'Fixed expressions: as it were, come what may, be that as it may, suffice it to say', '"This is, as it were, the crux of the problem — be that as it may, the decision stands."'],
        ['Past subjunctive (were)', 'Counter-factual conditionals (all persons)', '"Were this argument to hold, the entire framework would need to be reconsidered." / "If I were to disagree, I would say…"'],
        ['Past subjunctive + inversion', 'Formal counter-factual (were → inversion replaces if)', '"Were the evidence more compelling, one might conclude otherwise."'],
        ['Should + inversion (rare formal)', 'Hypothetical condition (low probability)', '"Should the results prove inconclusive, the study will need to be repeated."'],
        ['Counter-factual perfect: had + PP', 'Unreal past condition', '"Had the researchers controlled for this variable, the findings might have been more robust."'],
        ['Mixed conditionals', 'Unreal past cause with present result', '"Had the policy been adopted earlier, we would now be in a stronger position."'],
      ],
    },
    brazilianMistakes: [
      { mistake: '"If I would have known this, I would have acted differently."', correction: '"Had I known this, I would have acted differently." — or "If I had known this…" Never use "would" in the if-clause.', explanation: 'Brazilian Portuguese uses "se eu teria sabido" — a modal-in-the-if-clause construction. English does not permit this; the if-clause takes past perfect (had known), not conditional.' },
      { mistake: '"The committee suggested that we should review the policy."', correction: '"The committee suggested that we review the policy." (subjunctive) or "The committee suggested reviewing the policy." (gerund)', explanation: 'After verbs of recommendation/demand, the formal English pattern is bare infinitive (subjunctive), not should + infinitive. "Should" here is redundant in formal register.' },
      { mistake: '"If this was true, it would change everything."', correction: '"If this were true, it would change everything." — the past subjunctive "were" signals counter-factual meaning with all persons.', explanation: 'Using "was" instead of "were" in counter-factual conditionals is common in informal English but incorrect in formal/academic register. C1 writing requires "were."' },
    ],
    controlledPractice: [
      task(
        'Rewrite in formal register using inversion: "If the policy had been implemented earlier, the outcomes would have been different."',
        'Inversion replaces "if" and moves the auxiliary to the front.',
        '"Had the policy been implemented earlier, the outcomes would have been different."'
      ),
      task(
        'Complete with the correct subjunctive form: "The reviewer insisted that the methodology _____ (to be) fully documented before submission."',
        'After verbs of insistence/demand, use bare infinitive (subjunctive).',
        '"…that the methodology be fully documented…"'
      ),
      task(
        'Rewrite formally: "If I was in his position, I would reconsider the decision."',
        'Counter-factual with were + inversion option.',
        '"Were I in his position, I would reconsider the decision." (formal inversion) or "If I were in his position…" (standard formal)'
      ),
      task(
        'Construct a mixed conditional: an unreal past action with a present result, connected to the claim "the infrastructure was not modernised in the 1990s."',
        'Structure: Had [past perfect], [subject] would [present consequence].',
        'Example: "Had the infrastructure been modernised in the 1990s, we would now be in a far more competitive position."'
      ),
    ],
    productionTasks: [
      task(
        'Write 3–4 sentences using the subjunctive and counter-factual structures to evaluate a historical or intellectual "what if": what if a major scientific discovery had been made a century earlier?',
        'Use at least: one "were" counter-factual, one inverted conditional (had…), and one mixed conditional.',
        'Evaluate: is the subjunctive used correctly throughout? Is the formal register maintained? Are the structures varied rather than repetitive?'
      ),
      task(
        'Write a formal paragraph (80–100 words) making a recommendation using subjunctive structures. Topic: recommending changes to how a university handles student feedback.',
        'Include: at least one "recommend that [subject] [base form]" construction, one conditional showing what would follow if the recommendation were adopted.',
        'Evaluate: is the subjunctive bare infinitive used (not should + infinitive) after recommend? Is the conditional correctly formed? Is the register consistently formal?'
      ),
    ],
  }),

  // ─── GRAMMAR-017: Discourse markers and cohesive devices at C1 ───────────────
  createGrammarLesson({
    ...common,
    id: 'C1-GRAMMAR-017',
    order: 17,
    title: 'Grammar: Discourse markers and cohesive devices — organising sophisticated argument across text',
    objectives: [
      'Use a full range of C1-level discourse markers for structuring intellectual argument.',
      'Distinguish between additive, contrastive, causal, sequential, and reformulative markers.',
      'Deploy markers that signal stance, concession, and qualification precisely.',
      'Avoid over-reliance on elementary connectors (however, therefore, also) at C1 level.',
    ],
    teacherOpening: 'At lower levels, connectors are simple: "however," "therefore," "also." At C1, you need a full toolkit of discourse markers that signal not just logical relationships but argumentative stance — concession, qualification, elaboration, and synthesis. These are the markers that distinguish C1 writing from B2.',
    grammarTable: {
      headers: ['Function', 'Markers', 'Register note'],
      rows: [
        ['Additive (and, furthermore)', 'moreover, furthermore, in addition, what is more, beyond this, on top of this, equally', '"Moreover" is the most academic; "on top of this" is less formal.'],
        ['Contrastive (but, however)', 'nevertheless, nonetheless, that said, by contrast, conversely, yet (formal), notwithstanding this', '"That said" is slightly informal; "notwithstanding" is very formal.'],
        ['Concessive (acknowledging an opposing point)', 'admittedly, granted, to be sure, it must be acknowledged that, even so, while it is true that', 'These open a concession and signal that a rebuttal follows.'],
        ['Causal / consequential (so, because)', 'consequently, as a result, hence, thus, it follows that, this in turn, a corollary of this is', '"Hence" and "thus" are more academic; avoid "so" in formal writing.'],
        ['Sequential / structuring', 'in the first instance, to begin with, turning now to, by way of conclusion, in sum', 'Use these to manage the reader\'s experience of argument structure.'],
        ['Reformulative (in other words)', 'that is to say, in other words, to put it another way, more precisely, or rather', 'Signal that you are clarifying or rephrasing — useful for precision.'],
        ['Stance / epistemic', 'crucially, significantly, tellingly, notably, it is worth noting that, what is striking is', 'These signal that the following point is especially important or surprising.'],
        ['Limiting / qualifying', 'to some extent, in certain respects, with some qualification, with this caveat', 'Signal that the claim applies within limits — important for intellectual honesty.'],
      ],
    },
    brazilianMistakes: [
      { mistake: 'Beginning every paragraph with "However" regardless of the logical relationship.', correction: 'Use "however" only for genuine contrast. For concession, use "admittedly" or "granted." For surprising addition, use "moreover" or "what is more."', explanation: 'Many learners default to "however" as a general connector. At C1, precision in the choice of discourse marker is a mark of intellectual rigour.' },
      { mistake: '"Also, this shows that the theory is correct."', correction: '"Furthermore, this provides additional evidence for the theory\'s validity." — in formal writing, "also" at sentence-initial position is too colloquial.', explanation: '"Also" is informal as a sentence-initial connector in academic writing. Use "furthermore," "moreover," or "in addition" instead.' },
      { mistake: '"So, we can conclude that…" in formal writing.', correction: '"It follows, therefore, that… / Consequently, one may conclude that… / Thus, the evidence suggests…"', explanation: '"So" is appropriate in speech and informal writing, but academic writing at C1 requires more precise causal/consequential markers.' },
    ],
    controlledPractice: [
      task(
        'Choose the most precise discourse marker for each blank:\n(a) "The study had a large sample. _____, its findings should be treated with caution, given the absence of a control group."\n(b) "The first argument concerns methodology. _____ to the second, which addresses scope."\n(c) "This interpretation is plausible. _____, it fails to account for the anomalous results in section 3."',
        '(a) needs a concessive marker; (b) a sequential marker; (c) a limiting/qualifying marker.',
        '(a) "That said" or "Nevertheless" — (b) "Turning now" — (c) "That said" or "Admittedly, however," — or "Crucially, however,"'
      ),
      task(
        'Rewrite using a more precise C1-level marker: "The experiment failed because of poor design. Also, the sample was too small."',
        'Replace "Also" with a marker that shows the relationship more precisely.',
        '"The experiment failed primarily as a result of poor design; moreover / furthermore, the sample size was insufficient to yield reliable results."'
      ),
      task(
        'Write a sentence using an epistemic stance marker to introduce a surprising or significant finding.',
        'Choose from: crucially, tellingly, notably, what is striking is…',
        'Example: "Tellingly, the group that received no explicit instruction outperformed the instructed group on every measure of fluency — a finding that calls the pedagogical model into question."'
      ),
    ],
    productionTasks: [
      task(
        'Write a 150-word analytical paragraph on any intellectual topic using at least 5 different types of discourse marker. Label each marker type in brackets after you use it.',
        'Types to include: additive, contrastive, concessive, causal, and either epistemic or qualifying.',
        'Evaluate: are the markers varied and precise? Do they accurately reflect the logical relationships they signal? Is the paragraph still readable and argumentatively coherent?'
      ),
    ],
  }),

  // ─── VOCABULARY-012: Intellectual and philosophical vocabulary ────────────────
  createVocabularyLesson({
    ...common,
    id: 'C1-VOCABULARY-012',
    order: 12,
    title: 'Vocabulary: Intellectual and philosophical discourse — concepts, critique, and abstraction',
    objectives: [
      'Acquire and use high-frequency vocabulary for intellectual and philosophical discourse at C1 level.',
      'Distinguish between near-synonyms in formal intellectual register.',
      'Use these words accurately in context — collocations, register, and syntax.',
    ],
    teacherOpening: 'At C1, the vocabulary that opens doors is not technical jargon from a single discipline — it is the meta-vocabulary of intellectual discourse: the words used to describe, critique, and develop ideas across all fields. These words appear in academic texts, critical reviews, intellectual journalism, and formal seminars.',
    words: [
      { word: 'axiom', definition: 'A statement accepted as self-evidently true and used as a starting point for further reasoning.', example: 'The axiom that human beings are rational actors underpins much of classical economics — an axiom that behavioural research has repeatedly challenged.', collocations: ['a foundational axiom', 'challenge an axiom', 'rest on the axiom that', 'treat as axiomatic'] },
      { word: 'dialectic', definition: 'A method of reasoning through the tension between opposing positions (thesis and antithesis) to reach a synthesis; also used loosely to mean productive tension between ideas.', example: 'The text operates through a dialectic of individual freedom and collective responsibility, ultimately resolving neither in favour of the other.', collocations: ['a Hegelian dialectic', 'a productive dialectic', 'the dialectic between X and Y', 'dialectical tension'] },
      { word: 'reductive', definition: 'Oversimplifying a complex phenomenon by describing it in terms of a single dimension or cause; treating something as simpler than it actually is.', example: 'The journalist\'s account was reductive: it attributed a complex social phenomenon entirely to economic factors, ignoring cultural and political dimensions.', collocations: ['a reductive account', 'a reductive reading', 'unduly reductive', 'risk being reductive'] },
      { word: 'paradigm', definition: 'A conceptual framework or set of assumptions that defines a field of inquiry; a model or pattern.', example: 'Kuhn argued that science progresses not through the accumulation of facts but through paradigm shifts — moments when an entire framework is replaced by a new one.', collocations: ['a dominant paradigm', 'a paradigm shift', 'operate within a paradigm', 'challenge the prevailing paradigm'] },
      { word: 'implication', definition: 'Something that is suggested or follows logically from a claim or finding, without being directly stated; a consequence or effect.', example: 'The implications of this finding extend beyond the immediate research context: if the effect is real, it has implications for the design of all future studies in this area.', collocations: ['the implications of X for Y', 'draw out the implications', 'far-reaching implications', 'carry significant implications'] },
      { word: 'presupposition', definition: 'An assumption that must be true for a claim or question to make sense; something taken for granted in an argument.', example: 'The question "Have you stopped making these errors?" contains a presupposition — that you were making errors before — which makes it impossible to answer without accepting the embedded claim.', collocations: ['a hidden presupposition', 'challenge the presupposition', 'rest on the presupposition that', 'make presuppositions explicit'] },
      { word: 'teleological', definition: 'Relating to or involving the explanation of things by their goals or purposes rather than their causes; directed toward a final end.', example: 'A teleological reading of history — one that sees human progress as moving toward a predetermined goal — is difficult to reconcile with the evidence of contingency and reversal.', collocations: ['a teleological view', 'teleological reasoning', 'a teleological account', 'avoid teleological thinking'] },
      { word: 'hegemony', definition: 'The dominance of one group or set of ideas over others, maintained not only by force but by the consent of those dominated; cultural or ideological dominance.', example: 'Gramsci\'s concept of cultural hegemony explains how dominant groups maintain power not through overt coercion but by making their values appear natural and universal.', collocations: ['cultural hegemony', 'assert hegemony', 'challenge hegemony', 'a hegemonic discourse'] },
      { word: 'contingent', definition: 'Dependent on circumstances; not necessarily the case; able to have been otherwise.', example: 'The reviewer argues that the outcome was contingent on a specific set of historical conditions — it was not, as the author implies, inevitable.', collocations: ['contingent on circumstances', 'historically contingent', 'a contingent fact', 'treat as contingent rather than necessary'] },
      { word: 'normative', definition: 'Relating to or establishing standards or norms; prescriptive rather than descriptive; concerned with how things ought to be rather than how they are.', example: 'The report conflates descriptive and normative claims: it moves from "this is what happens" to "this is what should happen" without marking the shift.', collocations: ['a normative claim', 'normative assumptions', 'the normative dimension', 'descriptive vs. normative'] },
      { word: 'intersubjective', definition: 'Shared between subjects; existing or validated through the agreement of multiple observers rather than by a single individual.', example: 'Scientific objectivity is, on this account, intersubjective rather than purely objective — it depends on the consensus of the scientific community, not on a view from nowhere.', collocations: ['intersubjective agreement', 'an intersubjective framework', 'validated intersubjectively'] },
      { word: 'epistemic', definition: 'Relating to knowledge or the conditions under which knowledge is possible; connected to the theory of knowledge.', example: 'The epistemic status of introspective reports is contested: it is unclear whether reports about one\'s own mental states constitute genuine knowledge or are systematically unreliable.', collocations: ['epistemic status', 'epistemic humility', 'an epistemic claim', 'epistemic limitations'] },
    ],
    dangerousConfusions: [
      { pair: ['implication', 'inference'], explanation: 'An implication is what a statement suggests or entails (the speaker/writer implies). An inference is what a reader/listener concludes from a statement (the reader infers). "The implication of this finding is X" means the finding suggests X. "The inference I draw from this finding is X" means I conclude X from the finding. Common error: using "implication" when "inference" is meant, or vice versa.' },
      { pair: ['normative', 'normal'], explanation: '"Normative" in academic discourse means relating to standards or values — how things ought to be. "Normal" simply means typical or usual. "This is a normative claim" means it is a claim about what should be, not a claim about what usually is. Many learners use "normative" to mean "normal" — incorrect in academic writing.' },
    ],
  }),

  // ─── VOCABULARY-013: Cultural and aesthetic vocabulary ────────────────────────
  createVocabularyLesson({
    ...common,
    id: 'C1-VOCABULARY-013',
    order: 13,
    title: 'Vocabulary: Cultural and aesthetic discourse — criticism, interpretation, and value',
    objectives: [
      'Acquire vocabulary for discussing art, culture, and aesthetic experience at C1 level.',
      'Use evaluative vocabulary with precision and appropriate hedging.',
      'Distinguish between descriptive, interpretive, and evaluative claims in cultural discourse.',
    ],
    teacherOpening: 'Talking and writing about culture, art, and aesthetic experience requires a vocabulary that is at once precise and flexible — precise enough to make specific claims, flexible enough to handle the inherently contested nature of cultural evaluation. These words appear across literary criticism, art history, film studies, and cultural journalism.',
    words: [
      { word: 'juxtaposition', definition: 'The placing of two things side by side, especially for contrast or comparison; in art and literature, a structural device that creates meaning through contrast.', example: 'The film works through juxtaposition: scenes of domestic tranquillity are cut against images of industrial devastation, creating a political argument without a word of dialogue.', collocations: ['a sharp juxtaposition', 'the juxtaposition of X and Y', 'achieve through juxtaposition', 'a deliberate juxtaposition'] },
      { word: 'subversive', definition: 'Challenging, undermining, or seeking to overthrow established norms, values, or authorities; tending to disrupt accepted conventions.', example: 'The novel is subversive in form as well as content: its fragmented chronology refuses the reassurance of linear narrative and forces the reader to construct meaning rather than receive it.', collocations: ['a subversive gesture', 'subversive of convention', 'politically subversive', 'subtly subversive'] },
      { word: 'aesthetic', definition: 'Relating to beauty, art, or the appreciation of them; also used as a noun for a particular set of artistic principles or sensibilities.', example: 'The film\'s aesthetic is spare and unsentimental: long takes, natural light, and an avoidance of non-diegetic music create a documentary-like quality.', collocations: ['an aesthetic choice', 'the film\'s aesthetic', 'an aesthetic of restraint', 'aesthetic and ethical dimensions'] },
      { word: 'didactic', definition: 'Intended to instruct or teach, especially in a morally improving way; often used critically to describe art that is too obviously instructive or moralistic.', example: 'The reviewer criticised the film for being didactic: its political message was delivered so explicitly that it left no room for ambiguity or interpretation.', collocations: ['overly didactic', 'a didactic impulse', 'didactic intent', 'avoid being didactic'] },
      { word: 'ambiguity', definition: 'The quality of being open to more than one interpretation; in artistic contexts, often a deliberate and valued feature rather than a flaw.', example: 'The poem\'s ambiguity is its strength: the final image can be read as triumph, resignation, or irony, and the text refuses to resolve the tension between these readings.', collocations: ['productive ambiguity', 'preserve ambiguity', 'resist ambiguity', 'an irreducible ambiguity'] },
      { word: 'irony', definition: 'The expression of meaning through language that typically signifies the opposite; in broader usage, a state of affairs contrary to what might be expected.', example: 'The novel deploys irony at every level: the narrator\'s earnest claims about the protagonist\'s goodness are systematically undermined by what the narrative shows us about his behaviour.', collocations: ['dramatic irony', 'employ irony', 'the irony of this is', 'a heavy irony'] },
      { word: 'intertextuality', definition: 'The shaping of a text\'s meaning by reference to other texts; the web of relationships between texts.', example: 'The poem is dense with intertextuality: its engagement with Milton, Shakespeare, and the King James Bible creates layers of meaning that reward scholarly attention.', collocations: ['rich intertextuality', 'an intertextual reference', 'the intertextual dimension', 'operate intertextually'] },
      { word: 'canonical', definition: 'Belonging to or having the authority of a canon (an established set of texts or works considered most important in a field); broadly accepted as foundational.', example: 'The course focuses on canonical texts, though the choice of canon is itself a contested political act — one that reflects the values of those who established it.', collocations: ['a canonical text', 'the canonical tradition', 'challenge the canonical reading', 'non-canonical works'] },
      { word: 'catharsis', definition: 'In Aristotle\'s account of tragedy, the emotional purging or release experienced by an audience; more broadly, any emotional release or relief.', example: 'The play\'s ending provides catharsis not by resolving the conflict but by exhausting it: the audience is left drained but somehow clarified.', collocations: ['achieve catharsis', 'a cathartic experience', 'Aristotelian catharsis', 'the cathartic dimension'] },
      { word: 'allegory', definition: 'A narrative in which the characters and events represent abstract ideas or moral qualities; an extended metaphor.', example: 'The novel functions as an allegory of colonial violence: every element of the personal narrative maps onto a political history that the text refuses to name directly.', collocations: ['read as allegory', 'a political allegory', 'the allegorical dimension', 'operate on the level of allegory'] },
    ],
    dangerousConfusions: [
      { pair: ['ambiguous', 'ambivalent'], explanation: '"Ambiguous" means capable of being understood in more than one way — it is about meaning and interpretation. "Ambivalent" means having mixed or conflicting feelings — it is about emotion and attitude. "The poem\'s ending is ambiguous" (it can be read in multiple ways). "The reviewer was ambivalent about the ending" (they had mixed feelings about it). Confusing these is common among advanced learners.' },
      { pair: ['ironic', 'sarcastic'], explanation: '"Ironic" is a broad term for saying something that means the opposite, or for situations that are contrary to expectations — it can be gentle, complex, or intellectually rich. "Sarcastic" is specifically intended to mock or hurt; it is irony with a hostile edge. Literary texts use irony; sarcasm implies intent to wound. In academic writing, prefer "ironic" over "sarcastic" unless genuine hostility is the point.' },
    ],
  }),

  // ─── READING-007: Cultural criticism passage ──────────────────────────────────
  createReadingLesson({
    ...common,
    id: 'C1-READING-007',
    order: 7,
    title: 'Reading: "The Spectacle of Authenticity" — cultural criticism and the performance of identity',
    objectives: [
      'Read a dense cultural criticism text at C1 level and identify its central argument.',
      'Understand how cultural critics use abstract vocabulary and irony.',
      'Answer inference, vocabulary-in-context, and critical evaluation questions at C1 level.',
    ],
    teacherOpening: 'Cultural criticism is a genre that combines sociological analysis with aesthetic interpretation and political argument. This passage analyses the contemporary obsession with "authenticity" — in food, music, lifestyle, and self-presentation. As you read, identify the author\'s position, the evidence they use, and the rhetorical strategies they deploy.',
    passage: `The Spectacle of Authenticity

The contemporary appetite for "authentic" experience is, by any serious analysis, a paradox: the very desire to consume authenticity is what destroys it. The artisan bread sold at the farmers\' market for three times the supermarket price is authentic, we are told, because it is handmade by someone with a story. But the story has been packaged, the price has been calibrated to signal quality, and the farmer\'s market itself is a curated commercial space designed to produce the feeling of unmediated connection to the local and the real. The authenticity on offer is a spectacle of authenticity — a performance that knows it is being watched.

This is not a new observation. Guy Debord\'s analysis of the "society of the spectacle" in 1967 identified the tendency of capitalist culture to transform all experience into image — to substitute representation for reality. What has changed is the sophistication of the performance. The tourist industry has long manufactured experiences of "authentic" culture for those willing to pay for them; what is new is the extension of this logic into the most intimate domains of self-presentation. The Instagram post documenting a meal at a "hidden" restaurant, the Spotify playlist that signals musical taste and cultural capital, the choice of holiday destination chosen for its obscurity — all are performances of authenticity, consumed and evaluated by audiences who know, and do not know, that they are watching a performance.

The philosopher Charles Taylor argued that the ideal of authenticity is genuinely modern and genuinely important: it reflects a moral commitment to living in accordance with one\'s own inner truth rather than external authority. This is, in principle, an emancipatory ideal. The problem is not authenticity as a value but its colonisation by the market. When the desire to be authentic becomes itself a consumer preference, the market provides authenticity on demand — and the result is a culture in which the performance of authenticity is indistinguishable from authenticity itself. Or rather, in which the distinction has ceased to matter to anyone, including those performing it.

Is there a way out? Perhaps only a radical willingness to be ordinary — to resist the compulsion to curate and to allow experience to remain unexperienced rather than transformed into content. But even this resistance risks becoming its own brand. The person who "refuses to use social media" has already begun to construct a performance of refusal. There may be no outside.`,
    wordCount: 360,
    tasks: [
      task(
        'What is the central paradox the author identifies in paragraph 1? Explain it in your own words.',
        'Re-read paragraph 1. The paradox involves the relationship between the desire for authenticity and its effect on what is desired.',
        'The central paradox is that the desire to consume authentic experience destroys the authenticity it seeks. As soon as an experience is marketed as authentic, it becomes a performance — it has been packaged, priced, and curated to produce the feeling of authenticity rather than to be authentic. The artisan bread example illustrates this: the very apparatus (story, premium price, farmers\' market) that signals authenticity is evidence that authenticity has been manufactured. Authenticity on demand is a contradiction in terms.'
      ),
      task(
        'Who is Guy Debord, and how does the author use his ideas? What does the author say is new compared to Debord\'s analysis?',
        'Re-read paragraph 2. The author both acknowledges Debord and distinguishes the current situation from it.',
        'Guy Debord was a French theorist who argued in 1967 that capitalist culture transforms all experience into image — substituting representation for reality (the "society of the spectacle"). The author uses Debord\'s framework as a precedent for their argument. What is new, the author argues, is not the phenomenon itself but its extension from commercial culture (the tourist industry) into the intimate domain of self-presentation — the Instagram post, the Spotify playlist, the obscure holiday. The logic of the spectacle has colonised personal identity, not just commercial culture.'
      ),
      task(
        'What is Charles Taylor\'s contribution to the argument, and how does the author use it? The author calls authenticity an "emancipatory ideal" but then complicates this. What is the complication?',
        'Re-read paragraph 3. Taylor\'s position is introduced and then qualified. What does "colonisation by the market" mean in this context?',
        'Taylor\'s argument is that authenticity is a genuinely modern moral ideal — the commitment to living according to one\'s own inner truth rather than external authority. This is potentially emancipatory. The author uses Taylor\'s positive account to acknowledge what is valuable about the authenticity ideal before identifying the problem. The complication is "colonisation by the market": when authenticity becomes a consumer preference, the market supplies it on demand. The result is that the performance of authenticity becomes indistinguishable from authenticity itself — the distinction between genuine and performed authenticity collapses, and eventually ceases to matter to anyone.'
      ),
      task(
        'How does the final paragraph handle the question "Is there a way out?" What is the author\'s position, and how do they express it without stating it directly?',
        'Re-read paragraph 4. The author suggests a possible escape but then immediately undermines it. What does "There may be no outside" mean?',
        'The author tentatively suggests that resistance might lie in "radical ordinariness" — refusing to curate, allowing experiences to remain unexperienced rather than transformed into content. But the author immediately deconstructs this: even the refusal to perform becomes a performance (the person who "refuses to use social media" has begun constructing a performance of refusal). "There may be no outside" means there is no position outside the logic of the spectacle from which one can authentically resist it — resistance is absorbed into the system it opposes. The author\'s position is implied rather than stated: profound scepticism about the possibility of escaping the paradox, expressed through argument rather than assertion.'
      ),
    ],
  }),

  // ─── LISTENING-007: Cultural panel discussion ─────────────────────────────────
  createListeningLesson({
    ...common,
    id: 'C1-LISTENING-007',
    order: 107,
    title: 'Listening: "High and Low" — a panel discussion on cultural value and the collapse of the culture hierarchy',
    objectives: [
      'Follow a complex panel discussion at C1 level and track multiple positions simultaneously.',
      'Identify how speakers position themselves in relation to each other and to a shared question.',
      'Understand how academic and critical ideas are debated in spoken discourse.',
      'Answer inference, position-attribution, and evaluative questions at C1 level.',
    ],
    teacherOpening: 'This is a panel discussion from a cultural forum, in which three participants debate whether the distinction between "high" and "popular" culture has collapsed and whether this matters. Listen for the different positions each participant holds, the evidence they use, and the moments where they agree or disagree. Track how the conversation moves and develops.',
    transcript: [
      { speaker: 'Moderator', text: 'The question on the table is whether the distinction between high and popular culture has collapsed and, if so, whether this is a loss or a gain. Priya, you\'ve argued that the distinction was never really about quality — it was always about class. Would you defend that?' },
      { speaker: 'Priya', text: 'Strongly. The historical record is pretty clear: the works we now treat as canonical high culture — Shakespeare, Mozart, Dickens — were, in their time, popular entertainments. They were not elevated by intrinsic quality; they were elevated by a process of institutional canonisation that coincided with the formation of bourgeois cultural identity. The distinction was always a class marker, not an aesthetic judgment.' },
      { speaker: 'Rafael', text: 'I think there\'s truth in that historical point, but I\'d resist the conclusion. The fact that canonisation is a social process doesn\'t mean the canon is arbitrary or that quality is entirely a social construction. Some works really do repay more sustained engagement than others. The question is whether we can acknowledge that without reverting to a hierarchy that serves class interests.' },
      { speaker: 'Priya', text: 'But whose criteria of "sustained engagement" are we using? That\'s a normative question that can\'t be answered without making assumptions about what constitutes value. And those assumptions are not neutral — they\'ve historically excluded whole traditions: oral culture, vernacular music, genres associated with women or working-class life.' },
      { speaker: 'Elena', text: 'Can I offer a third position? I think both of you are right about the past and both of you are missing what\'s distinctive about the present. The question isn\'t just whether high and low culture can be distinguished — it\'s whether the infrastructure that maintained the distinction still exists. And I\'d argue it largely doesn\'t. The institutional gatekeepers — the major publishers, the broadcasting networks, the national newspapers — have either collapsed or lost their authority. We\'re in a genuinely different situation.' },
      { speaker: 'Moderator', text: 'Is that a gain or a loss?' },
      { speaker: 'Elena', text: 'Both. The democratisation of production and distribution is genuinely liberating — voices that would have been excluded are now audible. But the collapse of gatekeepers also means the collapse of the shared reference points that allowed cultural conversation to happen at all. When there\'s no common culture, there\'s no shared vocabulary for talking about value.' },
      { speaker: 'Rafael', text: 'I\'d add that the absence of shared reference points isn\'t just a communication problem — it\'s a political one. Common culture has historically been one of the mechanisms through which democratic societies build shared identity. I\'m not arguing for a return to the old hierarchy, but for something that performs some of the same functions without the exclusions.' },
      { speaker: 'Priya', text: 'That sounds like wanting to rehabilitate something whose functions were inseparable from its exclusions. I\'m sceptical that you can separate the "shared reference point" function from the class function — historically, they\'ve been the same thing.' },
      { speaker: 'Elena', text: 'Maybe. But I don\'t think the alternative — a fully fragmented cultural landscape in which no shared evaluation is possible — is obviously better. The question is whether we can build new forms of shared cultural life that are genuinely inclusive rather than exclusive. I don\'t know if we can. But I think it\'s the right question.' },
    ],
    tasks: [
      task(
        'What is Priya\'s central argument about the high/low culture distinction? How does she use historical examples to support it?',
        'Listen to Priya\'s first two turns (turns 2 and 4). She makes a historical claim and a methodological claim. What are they?',
        'Priya\'s central argument is that the high/low culture distinction was always a class marker, not an aesthetic judgment. Her historical evidence: works now considered canonical (Shakespeare, Mozart, Dickens) were popular entertainments in their time — their elevation was the result of institutional canonisation that coincided with the formation of bourgeois cultural identity. Her methodological argument: the criteria for "sustained engagement" (which Rafael uses) are themselves normative and historically have excluded oral culture, vernacular music, and genres associated with women and working-class life. Quality is not neutral.'
      ),
      task(
        'How does Rafael respond to Priya\'s argument? What does he concede and what does he maintain?',
        'Listen to turns 3 and 8. Rafael concedes something to Priya but maintains a distinct position. What is the tension he is trying to hold?',
        'Rafael concedes the historical accuracy of Priya\'s point: canonisation is a social process. But he resists the conclusion that the canon is therefore arbitrary or that quality is entirely socially constructed. He maintains that some works genuinely repay more sustained engagement than others — he believes quality exists, even if the criteria for it are contested. In turn 8, he extends this to argue that common culture serves a democratic function: it provides shared reference points for political identity. He seeks something that performs these functions without the class-based exclusions of the old hierarchy.'
      ),
      task(
        'What is Elena\'s "third position"? How does she distinguish her analysis from both Priya\'s and Rafael\'s?',
        'Listen to Elena\'s two turns (turns 5 and 7). She focuses on infrastructure rather than the aesthetic/political argument between Priya and Rafael.',
        'Elena shifts the frame from the normative question (is the distinction valid?) to the empirical question (does the infrastructure that maintained it still exist?). She argues that the institutional gatekeepers — publishers, broadcasters, national newspapers — have largely collapsed or lost authority. This is a genuinely new situation. She sees both gain and loss: the democratisation of production is liberating, but the collapse of gatekeepers also destroys the shared reference points that enabled cultural conversation about value. Her position is more pragmatic and sociological than either Priya\'s or Rafael\'s.'
      ),
      task(
        'At the end of the discussion, Priya raises a sharp objection to Rafael\'s position. What is it? How does Elena respond?',
        'Listen to turns 9 and 10. Priya\'s objection is about the inseparability of two things. Elena\'s response is about what question to ask.',
        'Priya\'s objection: Rafael wants to rehabilitate the "shared reference point" function of common culture without its class-based exclusions. But Priya argues these functions were historically inseparable — the class function was not incidental but constitutive. You cannot have one without the other. Elena\'s response is more agnostic: she doesn\'t know if Priya is right, but she reframes the question. The alternative to a culturally fragmented society (no shared evaluation possible) isn\'t obviously better than a shared but exclusionary culture. The right question is whether new forms of genuinely inclusive shared cultural life can be built — she holds this open rather than resolving it.'
      ),
    ],
  }),

]);

export const C1_DEEP_CULTURAL_DISCOURSE_PART1_BY_PILLAR = Object.freeze({
  grammar: Object.freeze([
    C1_DEEP_CULTURAL_DISCOURSE_PART1.find(l => l.id === 'C1-GRAMMAR-016'),
    C1_DEEP_CULTURAL_DISCOURSE_PART1.find(l => l.id === 'C1-GRAMMAR-017'),
  ]),
  vocabulary: Object.freeze([
    C1_DEEP_CULTURAL_DISCOURSE_PART1.find(l => l.id === 'C1-VOCABULARY-012'),
    C1_DEEP_CULTURAL_DISCOURSE_PART1.find(l => l.id === 'C1-VOCABULARY-013'),
  ]),
  reading: Object.freeze([
    C1_DEEP_CULTURAL_DISCOURSE_PART1.find(l => l.id === 'C1-READING-007'),
  ]),
  listening: Object.freeze([
    C1_DEEP_CULTURAL_DISCOURSE_PART1.find(l => l.id === 'C1-LISTENING-007'),
  ]),
  speaking: Object.freeze([]),
  writing: Object.freeze([]),
  checkpoint: Object.freeze([]),
});
