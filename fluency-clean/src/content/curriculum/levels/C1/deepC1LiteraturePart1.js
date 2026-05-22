import { createGrammarLesson, createVocabularyLesson, createSpeakingLesson } from '../../../schemas/index.js';

const level = 'C1';
const status = 'ready';
const common = { level, status, estimatedMinutes: 70, tags: ['c1-4', 'literature', 'critical-reading', 'academic', 'deep-approved-target'] };

function task(instruction, note = '', expected = '') { return { instruction, note, expected }; }

export const C1_DEEP_LITERATURE_PART1 = Object.freeze([

  // ─── GRAMMAR-010: Nominalization and noun phrase complexity ──────────────────
  createGrammarLesson({
    ...common,
    id: 'C1-GRAMMAR-010',
    order: 10,
    title: 'Nominalisation and noun phrase complexity: packaging ideas in academic and critical prose',
    objectives: [
      'Transform verb- and adjective-based expressions into complex noun phrases (nominalisations).',
      'Extend noun phrases with pre- and post-modification to increase information density.',
      'Understand why nominalisation is a characteristic feature of academic and literary critical discourse.',
      'Identify and avoid excessive nominalisation that produces obscurity rather than precision.',
      'Use nominalisation to manage information structure: creating new topics and old themes.',
    ],
    teacherOpening: 'Nominalisation is one of the most powerful — and most misused — tools in academic English. It transforms processes and qualities into "things" that can be moved around the sentence, accumulated, and qualified. "The government failed to respond" becomes "the government\'s failure to respond" — which can then become "the government\'s catastrophic and politically costly failure to respond to the crisis in time" — which can become the grammatical subject of a new sentence, a topic that carries the full weight of the previous analysis. This packaging is what allows academic writing to build complex arguments out of complex ideas.',
    portugueseContrast: [task('Em Nominalisation and noun phrase complexity: packaging ideas in academic and critical prose, observe que a estrutura do inglês difere da ordem natural do português.'), task('Não traduza literalmente; identifique o padrão do inglês antes de produzir.')], 
    whyItMatters: 'Literary critical and academic writing is dense with nominalisations. Understanding and producing them is essential for reading scholarly texts fluently and for writing at C1+ level. They allow a writer to collapse a whole proposition into a noun phrase that can serve as topic, theme, or focus of a new clause.',
    differenceFromA2: 'B2: "People disagree about this policy and they have debated it for years." C1: "The sustained and unresolved nature of the debate surrounding this policy reflects the depth of the underlying value conflict, rather than any failure of analytical rigour."',
    grammarTable: {
      headers: ['Base form', 'Nominalised form', 'Extended noun phrase', 'Function in sentence'],
      rows: [
        ['to fail (verb)', 'failure', 'the catastrophic governance failure of the early 2000s', 'Subject: "This failure precipitated a decade of reform."'],
        ['to assume (verb)', 'assumption', 'the widely contested assumption that markets self-correct', 'Object: "The analysis questions this assumption."'],
        ['complex (adj)', 'complexity', 'the structural complexity of modern supply chains', 'Theme: "This complexity makes regulation difficult."'],
        ['to interpret (verb)', 'interpretation', 'the dominant critical interpretation of the text', 'Topic: "This interpretation has been challenged."'],
        ['to resist (verb)', 'resistance', 'the organised political resistance to the proposed reform', 'Agent nominal: "The resistance delayed implementation."'],
        ['significant (adj)', 'significance', 'the full significance of the initial findings', 'Object: "Scholars have debated its significance."'],
      ],
    },
    commonErrors: [
      { wrong: 'It is important that we understand what causes economic inequality.', right: 'Understanding the structural causes of economic inequality is central to the analytical framework developed in this essay.', explanation: 'The original has two clauses where one noun phrase can do the work. The nominalisation ("understanding the structural causes") becomes the subject of the new clause, is more information-dense, and fits academic register.' },
      { wrong: 'The author tries to show that ambiguity is valuable.', right: 'The author\'s sustained argument for the productive value of ambiguity constitutes one of the text\'s most distinctive contributions.', explanation: '"tries to show that" is process-oriented and informal. The nominalised version "the author\'s sustained argument for the productive value of ambiguity" is a complex noun phrase that can serve as subject, is precise, and can carry post-modification.' },
    ],
    examples: [
      { sentence: 'The sustained critical neglect of working-class narratives in the canonical tradition has been one of the most significant distortions in the history of English literary criticism.', explanation: '"The sustained critical neglect of working-class narratives in the canonical tradition" is a complex noun phrase with pre-modification (sustained, critical), head noun (neglect), and post-modification (of working-class narratives / in the canonical tradition). The whole phrase is the subject of the main clause.' },
      { sentence: 'What this analysis demonstrates is the inadequacy of any purely formalist approach to texts whose meaning is inseparable from their historical embeddedness.', explanation: 'A pseudocleft structure with "the inadequacy of any purely formalist approach" as a complex nominal in focus position, itself containing post-modification ("to texts whose meaning..."). The nominal packages a complex critical claim.' },
    ],
    tasks: [
      task(
        'Nominalise the following and use it as the subject of a new clause: "People failed to respond to the early warning signs of the financial crisis."',
        'First create the nominalisation ("the failure to respond..."). Then decide what can be said about it (it was costly / it has been analysed / it reflects...).',
        'Example: "The widespread failure to respond to the early warning signs of the financial crisis — a failure now extensively documented in the post-crisis literature — reflected not ignorance but the structural incentives that discouraged regulators from acting on evidence that contradicted prevailing market assumptions."'
      ),
      task(
        'Create a complex noun phrase from: "Critics interpret the novel in different ways." Then use it as the object of a new sentence about why interpretive disagreement matters.',
        'First nominalise: "the varied critical interpretation of the novel" or "the multiplicity of critical interpretations." Then construct a sentence that uses this noun phrase to make a claim.',
        'Example: "The multiplicity of critical interpretations that the novel has generated is itself evidence of its capacity to sustain irresolvably competing readings — a capacity that, as this essay argues, is not a weakness of the text but its central formal achievement."'
      ),
      task(
        'Expand this noun phrase with at least two forms of modification (pre- or post-modification): "the assumption about human nature."',
        'Add: which assumption? Whose? In what context? From what period? How contested? Post-modification can use "of," "that," "which," prepositional phrases, or relative clauses.',
        'Example: "the widely shared but rarely examined Enlightenment assumption that human beings are fundamentally rational actors capable of acting in their long-term self-interest" (pre-modification: widely shared, rarely examined, Enlightenment; post-modification: "that human beings are fundamentally rational actors...").'
      ),
    ],
  }),

  // ─── GRAMMAR-011: Reporting and citation in literary critical writing ─────────
  createGrammarLesson({
    ...common,
    id: 'C1-GRAMMAR-011',
    order: 11,
    title: 'Grammar for literary criticism: citation syntax, integrating quotations, and critical commentary',
    objectives: [
      'Integrate short and extended quotations grammatically into analytical sentences.',
      'Use citation verbs (observes, notes, argues, reads, writes, suggests) with appropriate tense and aspect.',
      'Follow a quotation with analytical commentary that adds interpretation rather than paraphrase.',
      'Use ellipsis, square brackets, and signal phrases to handle quotations at C1 level.',
      'Distinguish between summary, paraphrase, and quotation, and know when to use each.',
    ],
    teacherOpening: 'Literary criticism has its own grammar of citation. Unlike social science, which often paraphrases and then attributes, literary criticism frequently quotes directly — because the texture of the language is part of the evidence. The challenge is integrating quotations smoothly and then analysing them rather than merely reproducing them. "The author says X" followed by the quote is not analysis. The quote must be embedded in the analytical sentence so that the grammar of the analysis and the quoted text work together.',
    portugueseContrast: [task('Em Grammar for literary criticism: citation syntax, integrating quotations, and critical commentary, observe que a estrutura do inglês difere da ordem natural do português.'), task('Não traduza literalmente; identifique o padrão do inglês antes de produzir.')], 
    whyItMatters: 'Poorly integrated quotations — "the author says: (block quote) This shows that..." — are one of the most common weaknesses in literary essays at B2–C1 level. Strong literary critical writing integrates the quotation into the analytical sentence so that it is already being interpreted by the grammatical context in which it appears.',
    differenceFromA2: 'B2: "The author writes: \'The darkness was everywhere.\' This shows that the atmosphere is dark." C1: "The insistence on total environmental darkness — \'the darkness was everywhere\' — extends beyond atmosphere to become what the novel\'s opening constructs as an ontological condition: a world in which illumination is not merely absent but structurally foreclosed."',
    grammarTable: {
      headers: ['Citation pattern', 'Structure', 'Example', 'Effect'],
      rows: [
        ['Integrated quotation', '[analysis...] "quote" [continuation]', 'The "catastrophic" quality that Woolf attaches to consciousness here suggests...', 'The quote is grammatically embedded in the analytical sentence'],
        ['Signal phrase', 'Author + verb + "quote"', 'Conrad observes that "the world [...] is a place of limited meanings."', 'Attribution is explicit; tense is usually present for literary texts'],
        ['Syntactic embedding', '[Analysis of phrase] "quoted phrase," which...', 'The "sepulchral whiteness" of the faces, which recurs throughout the passage, enacts...', 'Quote is embedded as object of the preceding clause, followed by relative commentary'],
        ['Lead-in clause', 'The author [verb] that [paraphrase]: "quote."', 'The narrator suggests that knowing is inseparable from suffering: "to know is to mourn what cannot be recovered."', 'Paraphrase sets up the quote; quote confirms or nuances it'],
        ['Analytical apposition', '[Claim], "[quote]."', 'The novel resists easy resolution, "refus[ing] to deliver the comfort that narrative closure conventionally provides."', 'The quote is in apposition to the analytical claim; bracket marks an editorial change'],
      ],
    },
    commonErrors: [
      { wrong: 'Shakespeare writes: "To be or not to be." This shows he is thinking about life and death.', right: 'The opening of the soliloquy — "To be or not to be, that is the question" — does not simply pose the question of suicide; it frames the entire problem as one of epistemology: whether it is possible to know, with sufficient certainty, that non-existence is preferable to existence.', explanation: '"This shows he is thinking about life and death" paraphrases what has just been quoted rather than analysing it. The C1 version uses the quote as evidence for a specific interpretive claim that the quote itself does not explicitly state.' },
      { wrong: 'In chapter three, the author uses a lot of metaphors of light and darkness.', right: 'The systematic opposition of light and darkness that structures the novel\'s symbolic economy reaches its most explicit articulation in the third chapter, where illumination is consistently figured as moral danger rather than moral clarity — a reversal of the conventional symbolic register.', explanation: 'The original identifies a feature without analysing it. The C1 version identifies the feature, locates it precisely, and makes a specific claim about its effect (reversal of convention).' },
    ],
    examples: [
      { sentence: 'The moment at which the protagonist "turned away from the window" — a gesture repeated, with slight variations, at each of the novel\'s structural transitions — marks not withdrawal but the kind of refusal that the text consistently figures as its most powerful form of agency.', explanation: 'The quotation is embedded within a nominalised structure ("the moment at which..."), followed by a dash and an appended clause that specifies its argumentative significance. The analysis does not merely describe the gesture but interprets it within a pattern.' },
      { sentence: 'Eliot\'s insistence, in the opening paragraph, that "we know what we are, but know not what we may be" functions as both a description of the protagonist\'s condition and a diagnosis of the reader\'s interpretive situation: we too are in the position of reading forward without the retrospective knowledge that full understanding requires.', explanation: 'The citation verb "insistence" already begins the analysis (it implies that the assertion is emphatic and deliberate); the quote is embedded within the subject noun phrase; the main clause offers an interpretive claim about its "function"; the second clause extends the analysis to the reader.' },
    ],
    tasks: [
      task(
        'Integrate this quotation from a novel into an analytical sentence — do not just introduce it with "the author writes": "She had lived her whole life preparing for a death that refused to come."',
        'First decide what the quotation shows or does. Then construct a sentence in which the quotation is embedded grammatically within an analytical claim.',
        'Example: "The stark paradox of the sentence — \'she had lived her whole life preparing for a death that refused to come\' — condenses the novel\'s central concern with time wasted in anticipation rather than lived in the present, a preoccupation that gives the protagonist\'s belated awakening its particular pathos."'
      ),
      task(
        'Write a two-sentence literary critical comment on this line from a poem: "The sea asks nothing, and the sea does not forget." First, embed the quotation using one of the citation patterns from the table. Second, add an analytical sentence that advances an interpretive claim.',
        'The second sentence should not paraphrase the first — it should advance the interpretation or connect the line to a larger pattern in the poem.',
        'Example: "The attribution of memory to an entity conventionally associated with indifferent immensity — \'the sea [...] does not forget\' — inverts the expected symbolic hierarchy, in which memory belongs to the human and forgetting to the inhuman. The effect is to suggest that the poem\'s speaker is less a conscious agent than an object acted upon by a sea whose retention is both more capacious and more inexorable than human recollection."'
      ),
      task(
        'Write a sentence that follows a quotation with analytical commentary using "which" to attach the comment: "The broken glass reflected nothing." Write the sentence so that the quotation is grammatically integrated and the "which" clause adds an interpretive claim.',
        '"Which" should refer to something in the quotation (the broken glass, the reflection, nothing). The interpretive claim should say something about what the image does in the text.',
        'Example: "The image of broken glass that \'reflected nothing\' — a formulation which refuses the consolation of even a partial or distorted self-image — aligns the protagonist\'s psychological state with the formal principle of the text itself: a refusal of the mirror that realistic fiction conventionally holds up to its subjects."'
      ),
    ],
  }),

  // ─── VOCABULARY-007: Literary critical vocabulary ────────────────────────────
  createVocabularyLesson({
    ...common,
    id: 'C1-VOCABULARY-007',
    order: 7,
    title: 'Vocabulary: literary and critical analysis vocabulary at C1',
    objectives: [
      'Use precise literary critical vocabulary to describe textual features and analytical moves.',
      'Distinguish between vocabulary for describing what a text does (enacts, figures, constructs) and vocabulary for evaluating it (subverts, recuperates, forecloses).',
      'Build collocational fluency with key terms of literary criticism.',
    ],
    teacherOpening: 'Literary criticism has its own technical vocabulary — terms for what texts do (figure, enact, subvert, foreclose), terms for structural and rhetorical features (irony, ambiguity, register, syntax, voice), and terms for the critic\'s analytical moves (interrogate, contest, recuperate, disavow). These are not jargon for its own sake; each term carries a precise meaning that ordinary language cannot reproduce efficiently.',
    words: [
      { word: 'figure', partOfSpeech: 'verb', definition: 'to represent or portray something in a specific way; to give it a particular symbolic or conceptual form', example: 'The storm is figured throughout the novel as an externalization of the protagonist\'s psychological turmoil rather than as a neutral natural event.', collocations: ['figure as', 'figured as', 'figures X as Y', 'figured in terms of'] },
      { word: 'enact', partOfSpeech: 'verb', definition: 'to perform or embody something at the level of form, structure, or language (rather than merely describe it)', example: 'The fragmented syntax of the final chapter enacts the dissolution of the narrator\'s sense of coherent selfhood.', collocations: ['enact a dissolution', 'enact a refusal', 'formally enacts', 'the text enacts'] },
      { word: 'subvert', partOfSpeech: 'verb', definition: 'to undermine or overturn an expected meaning, convention, or reading', example: 'The novel subverts the conventions of the Victorian marriage plot by refusing to deliver the closure it appears to promise.', collocations: ['subvert conventions', 'subvert expectations', 'subvert the genre', 'subvert the dominant reading'] },
      { word: 'foreclose', partOfSpeech: 'verb', definition: 'to prevent or rule out a particular reading, meaning, or possibility', example: 'The ambiguous final line forecloses any definitive interpretation, leaving the reader in the same state of uncertainty as the protagonist.', collocations: ['foreclose interpretation', 'foreclose the possibility of', 'forecloses a reading', 'does not foreclose'] },
      { word: 'recuperate', partOfSpeech: 'verb', definition: 'to absorb or neutralise a potentially subversive or radical element; to restore it to ideologically safe ground', example: 'While the novel appears to challenge class hierarchies, its resolution effectively recuperates the social order it had seemed to question.', collocations: ['recuperate the radical potential', 'recuperate the challenge', 'ideologically recuperates'] },
      { word: 'interrogate', partOfSpeech: 'verb', definition: 'to examine or question critically, especially underlying assumptions or ideological implications', example: 'The text interrogates the assumption that domestic space is naturally feminine by staging its most violent events within the home.', collocations: ['interrogate the assumption', 'interrogate the text', 'interrogate the concept of', 'interrogates notions of'] },
      { word: 'ambiguity', partOfSpeech: 'noun', definition: 'the quality of being open to multiple, potentially incompatible interpretations; at C1, distinguished from vagueness (which is unintentional)', example: 'The poem\'s productive ambiguity — whether "she" refers to the speaker\'s lover or to death itself — is not a flaw to be resolved but the source of its interpretive richness.', collocations: ['productive ambiguity', 'strategic ambiguity', 'structural ambiguity', 'the text\'s ambiguity', 'exploit the ambiguity'] },
      { word: 'register', partOfSpeech: 'noun', definition: 'a variety of language used in a particular social context or for a particular purpose, characterised by specific lexical, syntactic, and stylistic features', example: 'The sudden shift from the elevated register of the opening stanzas to the colloquial idiom of the final quatrain creates a tonal dissonance that refuses emotional resolution.', collocations: ['shift in register', 'tonal register', 'formal register', 'register of', 'register appropriate to'] },
      { word: 'voice', partOfSpeech: 'noun', definition: 'in literary analysis, the distinctive perspective, tone, and personality expressed through narrative or lyric perspective', example: 'The unreliable narrative voice of the opening chapters gradually discloses its unreliability through internal contradictions that a careful reading reveals.', collocations: ['narrative voice', 'lyric voice', 'authorial voice', 'unreliable voice', 'the text\'s voice'] },
      { word: 'dissonance', partOfSpeech: 'noun', definition: 'a tension or incompatibility between elements, often deployed deliberately to resist resolution or create interpretive difficulty', example: 'The formal dissonance between the poem\'s regular metre and its irregular syntax mirrors the protagonist\'s inability to impose order on experience.', collocations: ['tonal dissonance', 'formal dissonance', 'cognitive dissonance', 'creates dissonance', 'irresolvable dissonance'] },
      { word: 'lacuna', partOfSpeech: 'noun', definition: 'a gap, omission, or absence in a text, argument, or body of knowledge', example: 'The silence at the centre of the narrative — what the protagonist refuses to narrate directly — is a productive lacuna around which the text\'s symbolic structure is organised.', collocations: ['productive lacuna', 'critical lacuna', 'the lacuna at the centre of', 'fill the lacuna'] },
      { word: 'liminal', partOfSpeech: 'adjective', definition: 'occupying a threshold or boundary position between states; transitional', example: 'The novel\'s setting in a port city is not merely geographical; it figures the protagonist\'s liminal status — between cultures, between identities, between the life she has left and the life she cannot yet name.', collocations: ['liminal space', 'liminal figure', 'liminal position', 'occupies a liminal', 'the liminal threshold'] },
    ],
    tasks: [
      task(
        'Use "figure," "enact," and "foreclose" in three sentences analysing the same short text (choose a paragraph, poem, or passage you know). Each verb must be used in its literary critical sense.',
        '"Figure" = represent as; "enact" = perform at the level of form; "foreclose" = rule out a reading/possibility.',
        'Example (on a gothic novel): "The recurring image of locked rooms figures the protagonist\'s psychological inaccessibility as architectural fact." / "The novel\'s use of embedded narratives enacts the structural impossibility of arriving at a single, authoritative account of events." / "The ending forecloses the redemptive reading that the genre\'s conventions had led the reader to expect."'
      ),
      task(
        'Explain the difference between "ambiguity" and "vagueness" in literary critical terms, and give one example of each from any literary text you know.',
        'Think about intentionality and effect. Vagueness is a failure; ambiguity (in literary criticism) is often a success — a deliberate achievement.',
        'Vagueness is unintentional failure of precision — a text is vague when it fails to mean anything clearly. Ambiguity is a deliberate structural feature — the text is open to two or more readings simultaneously, neither of which can be ruled out, and both of which illuminate different aspects of the work. Example of productive ambiguity: the ending of "The Turn of the Screw" — whether the governess sees real ghosts or is psychologically disturbed — is not a vague ending but an ambiguous one, since both readings are fully supported by the text and the text refuses to adjudicate between them.'
      ),
      task(
        'Use "register" and "dissonance" together to analyse a moment of tonal shift in any literary text, poem, or even a speech or film you know.',
        'A register shift creates dissonance when the new register is unexpected or incompatible with the context established by the previous register.',
        'Example: "The shift in register that occurs in Act 3 of Hamlet, when the prince\'s philosophical register gives way to the crude punning of his exchange with Polonius, creates a tonal dissonance that several critics have read as evidence of the performance-within-performance structure of the play: the shift is not lapse but calculated destabilisation."'
      ),
    ],
    recognitionPractice: [{ question: 'Vocabulary: literary and critical analysis vocabulary at C1 — qual vocabulário desta aula significa "to represent or portray something in a specific way; to g..."?', options: ['figure', 'enact', 'subvert'], answer: 'figure', explanation: 'figure = to represent or portray something in a specific way; to g...; vocabulário trabalhado nesta aula.' }, { question: 'Vocabulary: literary and critical analysis vocabulary at C1 — qual opção combina com "figure"?', options: ['to represent or portray something in a specific way; to g...', 'to perform or embody something at the level of form, stru...', 'to undermine or overturn an expected meaning, convention,...'], answer: 'to represent or portray something in a specific way; to g...', explanation: 'figure significa to represent or portray something in a specific way; to g... no contexto desta aula.' }],
  }),

  // ─── VOCABULARY-008: Philosophical and conceptual vocabulary ─────────────────
  createVocabularyLesson({
    ...common,
    id: 'C1-VOCABULARY-008',
    order: 8,
    title: 'Vocabulary: philosophical and conceptual language at C1',
    objectives: [
      'Use philosophical and conceptual vocabulary to develop abstract analytical arguments.',
      'Understand and deploy key terms from critical theory and literary criticism.',
      'Collocate conceptual vocabulary accurately and avoid imprecision.',
    ],
    teacherOpening: 'Literary and critical analysis at C1 draws on a vocabulary that is partly philosophical: terms like "ontological," "dialectical," "contingent," "constitutive," "reductive," and "totalising" allow a critic to make precise claims about the nature and status of a phenomenon without lengthy circumlocution. These terms are not jargon for its own sake — each encodes a distinction that would otherwise take several sentences to express.',
    words: [
      { word: 'ontological', partOfSpeech: 'adjective', definition: 'relating to the nature of being or existence; concerning what kinds of things exist and what it means for them to exist', example: 'The novel\'s central concern is not psychological but ontological: it asks not what the protagonist feels but whether a coherent self is possible in conditions of extreme historical rupture.', collocations: ['ontological question', 'ontological status', 'ontological condition', 'ontological claim'] },
      { word: 'dialectical', partOfSpeech: 'adjective', definition: 'of or relating to the process by which contradictions are resolved through a higher synthesis; involving the tension and resolution of opposing forces', example: 'The text\'s meaning emerges through a dialectical process: the thesis (order) and antithesis (chaos) are not resolved but held in perpetual tension, which itself becomes the work\'s formal subject.', collocations: ['dialectical tension', 'dialectical process', 'dialectical relationship', 'dialectical resolution'] },
      { word: 'contingent', partOfSpeech: 'adjective', definition: 'dependent on circumstances; not necessary or inevitable; could have been otherwise', example: 'What the novel insists on is the radical contingency of the protagonist\'s situation: there is nothing inevitable about her suffering; it is the product of specific, alterable historical conditions.', collocations: ['historically contingent', 'contingent on', 'contingent nature of', 'radically contingent'] },
      { word: 'reductive', partOfSpeech: 'adjective', definition: 'oversimplifying a complex phenomenon by reducing it to a single cause, principle, or explanation', example: 'It would be reductive to interpret the novel solely as a political allegory; its engagement with questions of consciousness and time exceeds what any single allegorical reading can account for.', collocations: ['dangerously reductive', 'reductive reading', 'reductive interpretation', 'overly reductive'] },
      { word: 'totalising', partOfSpeech: 'adjective', definition: 'of an interpretation or system: claiming to explain everything, leaving no remainder; presenting a single, all-encompassing framework', example: 'The danger of a purely Marxist reading is its totalising tendency: it risks explaining the text\'s every feature as an expression of class contradiction, foreclosing the possibility that some elements resist such reduction.', collocations: ['totalising tendency', 'totalising framework', 'totalising reading', 'resist the totalising'] },
      { word: 'aporia', partOfSpeech: 'noun', definition: 'an irresolvable internal contradiction or undecidability in a text or argument; a moment of impasse where logical or interpretive progress appears impossible', example: 'The poem ends in aporia: the final quatrain simultaneously affirms and denies the possibility of consolation, without providing any principle by which to adjudicate between these positions.', collocations: ['fundamental aporia', 'arrive at an aporia', 'the text\'s aporia', 'irresolvable aporia'] },
      { word: 'ideological', partOfSpeech: 'adjective', definition: 'relating to a system of ideas, values, and assumptions that naturalise a particular social order, often by representing contingent arrangements as inevitable or natural', example: 'The novel\'s ideological work is most visible at the moments when it strains to naturalise relations of domination that are, in fact, historically specific and changeable.', collocations: ['ideological work', 'ideological assumptions', 'ideological function', 'ideological critique', 'ideologically motivated'] },
      { word: 'hermeneutic', partOfSpeech: 'adjective/noun', definition: 'relating to the theory and practice of interpretation, especially of texts; a hermeneutic circle is the process by which understanding the whole requires understanding the parts, and vice versa', example: 'The reader is caught in a hermeneutic circle: the meaning of individual passages depends on understanding the novel\'s overall design, which in turn can only be inferred from the passages.', collocations: ['hermeneutic circle', 'hermeneutic question', 'hermeneutic approach', 'hermeneutic challenge'] },
      { word: 'materialist', partOfSpeech: 'adjective', definition: 'in criticism, relating to an approach that grounds textual or cultural analysis in material conditions: economics, class, labour, social relations of production', example: 'A materialist reading of the novel attends to the economic conditions that structure the characters\' choices — conditions that a purely psychological reading tends to naturalise or overlook.', collocations: ['materialist reading', 'materialist critique', 'historical materialist', 'materialist analysis'] },
    ],
    tasks: [
      task(
        'Use "contingent" and "ontological" in two sentences that together make a claim about a literary text or cultural phenomenon you know.',
        '"Contingent" = not inevitable, historically produced; "ontological" = concerning the nature of being/existence. Try to make the two words work together to produce a claim that neither could make alone.',
        'Example: "What makes the protagonist\'s suffering distinctive is its simultaneously contingent and ontological quality: it is the product of historically specific conditions that could have been otherwise, and yet, given those conditions, it has become constitutive of her very being — not something that happened to her, but something that she now is."'
      ),
      task(
        'Explain why a "reductive" reading is a critical term of criticism rather than just a synonym for "bad." What specific kind of failure does it name?',
        'Think about what makes a reading "reductive" as opposed to merely "wrong" or "unconvincing."',
        'A reductive reading is a specific kind of failure: it correctly identifies one element or dimension of a text and then treats that element as the explanation for everything. It is not wrong about what it identifies — it is wrong about the scope of its explanatory power. A purely biographical reading that reduces every image in a poem to the poet\'s childhood trauma is not false (the trauma may be relevant) but reductive (trauma cannot account for all the formal decisions, the genre conventions, the historical context, etc.).'
      ),
      task(
        'Use "aporia" to describe a moment of irresolution in a text, argument, or debate you know — literary or non-literary.',
        '"Aporia" = irresolvable contradiction or undecidability — a point at which the text or argument cannot progress without contradiction.',
        'Example: "The liberal democratic tradition arrives at an aporia when confronted with the question of majority tyranny: the logic of majority rule, taken to its conclusion, is incompatible with the protection of minority rights — and yet the protection of minority rights, taken to its conclusion, places limits on democratic self-determination. No principle internal to liberal democracy can adjudicate between these two values; the impasse is structural."'
      ),
    ],
    recognitionPractice: [{ question: 'Which term relates to the nature of being or existence?', options: ['ontological', 'dialectical', 'contingent'], answer: 'ontological', explanation: 'Ontological concerns what kinds of things exist and how they relate.' }, { question: 'Which term describes something dependent on conditions?', options: ['contingent', 'ontological', 'dialectical'], answer: 'contingent', explanation: 'Contingent means dependent on certain conditions being met.' }],
  }),

  // ─── SPEAKING-004: Seminar presentation — literary/cultural analysis ──────────
  createSpeakingLesson({
    ...common,
    id: 'C1-SPEAKING-004',
    order: 4,
    title: 'Speaking: delivering a literary critical argument — close reading, interpretation, and defending a position',
    objectives: [
      'Deliver a 3–4 minute spoken literary critical argument with a clear interpretive claim.',
      'Quote briefly and accurately from a text and analyse the quotation orally.',
      'Defend an interpretive position against a challenge or alternative reading.',
      'Use literary critical vocabulary from C1.4 in spoken academic discourse.',
    ],
    teacherOpening: 'Literary analysis in a seminar requires a different spoken register from other academic presentations. You are expected to quote — briefly and accurately — and then analyse the quotation rather than just describing it. You are also expected to hold a specific interpretive position and defend it when challenged, acknowledging the alternative reading while explaining why yours is more compelling.',
    modelPhrases: [
      'What is particularly striking is that both readings are fully supported by the textual evidence.',
      'The ambiguity is not a failure of the text to commit; it is the text\'s most distinctive formal achievement.',
      'I would contend that this is precisely what makes it literarily significant.',
      'This is the deployment of precision in the service of undecidability.',
      'The former — structural ambiguity — is an ontological feature of the work; the latter — interpretive ambiguity — is epistemological.',
      'I want to argue for the statement, but with an important qualification.',
    ],
    pronunciationFocus: {
      title: 'Pronunciation & shadowing',
      tips: [
        'Shadow: "What is particularly striking is that both readings are fully supported by the textual evidence." — stress STRIKing and SUPported. Practise the cleft "What is particularly striking is..." as a smooth chunk.',
        '"The ambiguity is not a failure of the text to commit; it is the text\'s most distinctive formal achievement." — pause at the semicolon; stress FAILure and aCHIEVEment as the antithesis.',
        '"I would contend that this is precisely what makes it literarily significant." — stress preCISEly and SIGnificant. Practise "literarily" /ˈlɪt.ər.ər.ɪ.li/.',
        '"This is the deployment of precision in the service of undecidability." — stress dePLOYment, preCISion, and undeCIDability. Practise the rhythm of the abstract noun chain.',
      ],
    },
    dialogueTurns: [
      { speaker: 'Tutor', text: 'For today\'s session, I\'d like you to take a position on the following: "In literature, ambiguity is a formal achievement, not a failure of meaning." Argue for or against this, and use at least one specific textual example. You have three to four minutes.' },
      { speaker: 'Student (model)', text: 'I want to argue for the statement, but with an important qualification: ambiguity is a formal achievement only when it is structural rather than accidental — when it arises from the text\'s deliberate design rather than from a failure of execution.' },
      { speaker: 'Student (model)', text: 'Let me take a specific example: the ending of Henry James\'s "The Turn of the Screw." The question of whether the governess is a reliable narrator — whether the ghosts are real or are projections of her psychological disturbance — has never been definitively resolved by the text, and James shows no sign of having intended it to be. What is particularly striking is that both readings are fully supported by the textual evidence: the syntactic ambiguity of the governess\'s prose, the absence of any external corroboration, and the frame narrative\'s refusal to adjudicate. This is not vagueness — James\'s style is extraordinarily precise — it is the deployment of precision in the service of undecidability.' },
      { speaker: 'Student (model)', text: 'What this example illustrates is the distinction between ambiguity as a feature of the text and ambiguity as a feature of the reader\'s interpretation. The former — what I am calling structural ambiguity — is an ontological feature of the work: the text has been constructed in a way that makes certain determinations impossible. The latter — interpretive ambiguity — is epistemological: we cannot decide, not because the text is structurally open, but because our reading is incomplete.' },
      { speaker: 'Student (model)', text: 'I would contend that "The Turn of the Screw" exemplifies the first kind, and that this is precisely what makes it literarily significant. The ambiguity is not a failure of the text to commit; it is the text\'s most distinctive formal achievement — a construction that foregrounds the hermeneutic difficulty that is, the novel suggests, constitutive of all interpretation of human behaviour.' },
      { speaker: 'Tutor', text: 'That\'s a strong argument. But let me push back. You say that ambiguity is an achievement when it\'s structural and deliberate. But how do we distinguish that from a text that is simply unclear, where the author hasn\'t managed to control the meaning? Isn\'t the distinction between "deliberate ambiguity" and "unintentional vagueness" one that we impose on the text rather than one the text itself encodes?' },
      { speaker: 'Student (model)', text: 'That\'s a challenge I take seriously. The distinction I\'m drawing does rely partly on extra-textual evidence — we know James discussed the text\'s deliberate ambiguities, and his craft is demonstrably precise throughout. But I think there is also a textual criterion: whether the ambiguity is generative — whether it opens up multiple coherent interpretive paths each of which illuminates something about the text — or whether it is merely indeterminate. Vagueness closes down interpretation by leaving nothing to interpret; structural ambiguity proliferates interpretation by sustaining multiple equally coherent readings. I think that distinction holds up, though I concede that it places a significant burden on the reader to make the case for generativity rather than mere indeterminacy.' },
    ],
    tasks: [
      task(
        'Choose a literary text, film, or cultural work you know well. Prepare a 3–4 minute spoken argument for one of these positions: (a) "The work\'s central ambiguity is its most significant formal achievement." (b) "The work subverts the genre conventions it appears to follow." (c) "The work\'s meaning is inseparable from its historical context." Plan: claim + one textual example + analysis of quotation/scene + anticipated challenge + response.',
        'Write bullet points only. Include: your claim (specific and arguable), your textual example (brief quotation or specific scene), your analysis of why the example supports the claim, the strongest objection, and your concession-and-pivot response.',
        'Your spoken argument should include: a specific, arguable interpretive claim | at least one textual example (quotation or specific scene) | analysis of the example using literary critical vocabulary | an anticipated challenge | a concession-and-pivot using "I concede / that said / what I would dispute, however"'
      ),
      task(
        'Practise the quotation-and-analysis move. Choose a sentence or two from a literary text. Say: (a) the signal phrase (what the text "does" at this moment), (b) the quotation, (c) the analytical commentary (what this shows, figures, enacts, or forecloses).',
        'The commentary must add interpretation — it must say something about the quotation that is not already obvious from reading it.',
        'Example structure: "At the novel\'s climactic moment, Conrad figures the protagonist\'s confrontation with moral failure not as dramatic crisis but as quiet collapse: \'He gave up.\' [pause] The starkness of the sentence — its formal refusal of the syntactic elaboration that the moment might have warranted — enacts the very emptiness it describes: an ending without the dignity of struggle, without the consolation of narrative articulation."'
      ),
      task(
        'Practise defending an interpretive position against the challenge: "Isn\'t your reading just imposing your own interpretation on the text?" How would you respond without abandoning your position or becoming evasive?',
        'Acknowledge the legitimate concern (all readings are interpretations). Then make the case for why your reading is better supported by the textual evidence than the alternative.',
        'Example: "That challenge applies to all readings, including the one that says my reading is merely imposed — that reading is also an interpretation. What I would contend is that the relevant question is not whether a reading is an interpretation (all readings are) but whether it is a well-evidenced one. I\'ve shown that the textual features I\'m pointing to — the syntax, the repetition, the frame narrative — are all consistent with my reading. A stronger objection would be to show that those same features are better explained by a different reading. I\'d be genuinely interested to see that argument made."'
      ),
    ],
    speakingChecklist: [
      'Interpretive claim is specific and arguable — not a summary of the text.',
      'At least one quotation cited and analysed, not merely described.',
      'Literary critical vocabulary used accurately (ambiguity, motif, register, syntax, irony).',
      'Position defended against challenge without evasion or complete capitulation.',
      'Quotation-and-analysis move performed: signal phrase → quotation → analytical commentary.',
      'Register consistently formal and academic throughout.',
    ],
  }),

]);

export const C1_DEEP_LITERATURE_PART1_BY_PILLAR = Object.freeze({
  grammar: Object.freeze(C1_DEEP_LITERATURE_PART1.filter(l => l.pillar === 'grammar')),
  vocabulary: Object.freeze(C1_DEEP_LITERATURE_PART1.filter(l => l.pillar === 'vocabulary')),
  reading: Object.freeze([]),
  listening: Object.freeze([]),
  speaking: Object.freeze(C1_DEEP_LITERATURE_PART1.filter(l => l.pillar === 'speaking')),
  writing: Object.freeze([]),
  checkpoint: Object.freeze([]),
});
