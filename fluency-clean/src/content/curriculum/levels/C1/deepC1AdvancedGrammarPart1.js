import { createGrammarLesson, createVocabularyLesson, createSpeakingLesson } from '../../../schemas/index.js';

const level = 'C1';
const status = 'ready';
const common = { level, status, estimatedMinutes: 70, tags: ['c1-2', 'advanced-grammar', 'academic', 'deep-approved-target'] };

function task(instruction, note = '', expected = '') { return { instruction, note, expected }; }

export const C1_DEEP_ADVANCED_GRAMMAR_PART1 = Object.freeze([

  // ─── GRAMMAR-004: Advanced cleft sentences and pseudoclefts ─────────────────
  createGrammarLesson({
    ...common,
    id: 'C1-GRAMMAR-004',
    order: 4,
    title: 'Advanced cleft sentences: pseudoclefts, reversed pseudoclefts and nominative clefts at C1',
    objectives: [
      'Use Wh-pseudoclefts (What I find most compelling is...) for fronted emphasis.',
      'Use reversed pseudoclefts (...is what makes this argument compelling) for end-focus.',
      'Use nominative clefts (The reason X is that..., The thing that concerns me is...) for precision.',
      'Distinguish between cleft structures by register and rhetorical function.',
      'Avoid the most common errors in cleft construction.',
    ],
    teacherOpening: 'At B2 you learned the basic it-cleft: "It was the governance failure that caused the crisis." At C1, cleft structures multiply: pseudoclefts (What-clefts), reversed pseudoclefts, nominal clefts, and clefts with different focus positions. These are not decorative — they control information structure, placing new or important information in the most prominent syntactic position.',
    portugueseContrast: [task('Em Advanced cleft sentences: pseudoclefts, reversed pseudoclefts and nominative clefts at C1, observe que a estrutura do inglês difere da ordem natural do português.'), task('Não traduza literalmente; identifique o padrão do inglês antes de produzir.')], 
    whyItMatters: 'Cleft structures are a signature feature of sophisticated formal writing and academic argument. They allow the writer to manage information flow — making old information the frame and new information the focus — in a way that flat sentences cannot achieve. C1 academic writers use them instinctively; C1 learners need to build that instinct deliberately.',
    differenceFromA2: 'B2: "It was the lack of enforcement that caused the policy to fail." C1: "What caused the policy to fail was not the design of the framework, but the absence of any meaningful enforcement mechanism." The C1 version gives more information, positions the contrast (not X but Y) inside the cleft, and moves the "new information" to the most prominent position.',
    grammarTable: {
      headers: ['Cleft type', 'Structure', 'Focus position', 'Example'],
      rows: [
        ['It-cleft', 'It + be + [focus] + that/who/which + rest', 'Focus element immediately after "be"', 'It was the institutional inertia, not the lack of data, that prevented reform.'],
        ['Wh-pseudocleft (fronted)', 'What + clause + be + [focus]', 'Focus at the end', 'What the evidence consistently demonstrates is that inequality is structural.'],
        ['Wh-pseudocleft (what I think)', 'What + subject + verb + be + [focus]', 'Personal stance focus', 'What I find most concerning is the absence of any accountability mechanism.'],
        ['Reversed pseudocleft', '[Focus] + be + what + clause', 'Focus at the start, reinforced by what-clause', 'A clear accountability framework is what the governance system currently lacks.'],
        ['Nominative cleft (the thing)', 'The thing/point/reason/aspect + that/which + clause + be + [focus]', 'Precision focus', 'The reason this matters is that democratic legitimacy depends on shared epistemic ground.'],
        ['All-cleft', 'All + subject + verb + be + infinitive', 'Minimising focus', 'All the committee did was defer the decision.'],
        ['Cleft with negative focus', 'It was not X + that/who + Y, but Z', 'Contrast cleft', 'It was not the scale of the challenge, but the absence of political will, that proved decisive.'],
      ],
    },
    teacherExamples: [
      'What the data sheds light on is not merely the scale of inequality, but its intractability under current policy regimes.',
      'The reason the framework has been so resistant to reform is that it serves the interests of the actors with the power to change it.',
      'It is not the quantity of evidence that is lacking — it is the political will to act on it.',
      'What distinguishes C1 writing from B2 is the ability to deploy information structure, not just grammar rules, as a rhetorical tool.',
      'A coherent theory of institutional change is what the literature, for all its empirical richness, has consistently failed to provide.',
    ],
    practiceExercises: [
      {
        type: 'cleft-construction',
        instruction: 'Rewrite each sentence using the cleft structure indicated. Focus on what moves to the most prominent position.',
        items: [
          { original: 'The governance failure, not the policy design, caused the crisis.', target: 'It-cleft with contrast', hint: 'It was the governance failure, not the policy design, that...' },
          { original: 'The evidence demonstrates that the relationship is structural.', target: 'Wh-pseudocleft', hint: 'What the evidence demonstrates is...' },
          { original: 'I am most troubled by the absence of enforcement mechanisms.', target: 'What I [verb] is...', hint: 'What I find most troubling is...' },
          { original: 'The framework fails because it has no enforcement mechanism.', target: 'The reason... is that', hint: 'The reason the framework fails is that...' },
          { original: 'The committee deferred the decision — nothing else.', target: 'All-cleft', hint: 'All the committee did was...' },
        ],
      },
      {
        type: 'information-structure',
        instruction: 'In each pair of sentences, which cleft structure is more effective, and why? Consider what information the reader already has.',
        items: [
          { a: 'What gave rise to the crisis was a failure of governance.', b: 'It was a failure of governance that gave rise to the crisis.' },
          { a: 'It is not the policy itself, but its implementation, that has failed.', b: 'The implementation, not the policy itself, has failed.' },
        ],
      },
    ],
    lessonRecap: 'You practised the full C1 range of cleft structures — it-cleft (with contrast), Wh-pseudocleft, reversed pseudocleft, nominative cleft, all-cleft — as tools of information structure and rhetorical emphasis.',
    nextLessonBridge: 'Next: advanced passive voice at C1 — complex causative passives, passive in modal combinations, and the passive as a hedging and distancing device in academic writing.',
  }),

  // ─── GRAMMAR-005: Advanced passive voice at C1 ────────────────────────────────
  createGrammarLesson({
    ...common,
    id: 'C1-GRAMMAR-005',
    order: 5,
    title: 'Advanced passive voice: causatives, complex modal passives and academic distancing',
    objectives: [
      'Use complex causative passive structures (have/get something done; have something done to you).',
      'Use modal passive combinations at C1 level (should be taken, must have been considered, might have been prevented, could have been implemented).',
      'Use the passive as an academic distancing device to present claims with authority without attribution.',
      'Produce complex passive + perfect infinitive structures used in academic writing.',
    ],
    teacherOpening: 'By B2 you were confident with basic passive and with "is believed to be", "is said to have been". At C1, the passive expands into causatives, complex modal combinations, and — most importantly — the strategic use of passive as a rhetorical choice in academic writing. Passive is not just a grammar rule at C1: it is a choice about perspective, attribution and authority.',
    portugueseContrast: [task('Em Advanced passive voice: causatives, complex modal passives and academic distancing, observe que a estrutura do inglês difere da ordem natural do português.'), task('Não traduza literalmente; identifique o padrão do inglês antes de produzir.')], 
    whyItMatters: 'Complex passive structures appear in every academic text, legal document and professional report. The causative passive (the framework was allowed to deteriorate) carries different implications from the simple active (they allowed the framework to deteriorate). At C1, these distinctions are semantic and rhetorical, not just grammatical.',
    differenceFromA2: 'B2: "People believe this policy has failed." → "This policy is believed to have failed." C1: "This policy is widely believed to have been allowed to fail through the systematic underfunding of the institutions charged with its implementation" — passive stacking for maximum academic density.',
    grammarTable: {
      headers: ['Structure', 'Formula', 'Example', 'Effect/use'],
      rows: [
        ['Causative: have sth done', 'subject + have + object + past participle', 'The committee had the report independently verified.', 'Subject arranges for something to be done; they don\'t do it themselves.' ],
        ['Causative passive (adversative)', 'subject + have + object + past participle', 'She had her funding cut without explanation.', 'Subject is affected by something done to their property/situation — adversative meaning.' ],
        ['Get sth done', 'subject + get + object + past participle', 'We need to get these findings reviewed before publication.', 'More informal than "have sth done"; implies effort or difficulty.' ],
        ['Modal passive (present)', 'modal + be + pp', 'These issues should be addressed at the highest level.', 'Obligation/possibility without naming the actor.' ],
        ['Modal passive (past)', 'modal + have been + pp', 'The crisis might have been prevented had early warnings been heeded.', 'Past modal passive for counterfactual.' ],
        ['Complex modal passive', 'modal + be + pp + that-clause', 'It must be acknowledged that the evidence is, at best, mixed.', 'Very formal; academic impersonal authority.' ],
        ['Passive + perfect infinitive', 'be + pp + to have + pp', 'The policy is widely considered to have been undermined by poor implementation.', 'C1 passive reporting with embedded perfect infinitive.' ],
        ['Stacked passive', 'passive in embedded clause', 'It has been argued that the study should have been designed to allow replication.', 'Academic density — multiple passives in one sentence.' ],
      ],
    },
    teacherExamples: [
      'The agreement was allowed to collapse without any meaningful attempt to salvage it.',
      'It must be acknowledged that the evidence, while suggestive, cannot be considered conclusive.',
      'The warnings had been issued, the data had been gathered, and the findings had been presented to the relevant authorities — yet nothing was done.',
      'These failures are widely considered to have been not merely predictable but anticipated, which makes the inaction all the more difficult to explain.',
      'Had the institutional architecture been redesigned to include meaningful enforcement, the outcome might have been very different.',
    ],
    practiceExercises: [
      {
        type: 'transformation',
        instruction: 'Rewrite each sentence using the complex passive structure indicated.',
        items: [
          { original: 'Someone has verified the data independently.', target: 'causative: have sth done', hint: 'The data has been had independently verified / The committee has had the data independently verified.' },
          { original: 'People should address these concerns before any decision is made.', target: 'modal passive: should be + pp', hint: 'These concerns should be addressed...' },
          { original: 'They probably could have prevented the crisis if they had acted earlier.', target: 'past modal passive', hint: 'The crisis could have been prevented...' },
          { original: 'Experts generally think the policy has failed.', target: 'passive + perfect infinitive', hint: 'The policy is generally considered to have failed.' },
        ],
      },
      {
        type: 'academic-distancing',
        instruction: 'Rewrite this paragraph to make it more academic by converting active constructions to appropriate passives. Do NOT convert everything — make choices.',
        paragraph: 'Some researchers argue that the system has failed. Others think that we designed it poorly from the start. We should now redesign it, and we need to acknowledge that the original assumptions were wrong.',
      },
    ],
    lessonRecap: 'You practised advanced passive voice at C1 — causative passives (have/get sth done), complex modal passives (might have been prevented), passive + perfect infinitive, and passive as academic distancing device.',
    nextLessonBridge: 'Final grammar lesson of C1.2: complex verb patterns at C1 — the verb-object-complement constructions, pattern varieties, and the nuanced differences in meaning between related patterns.',
  }),

  // ─── GRAMMAR-006: Complex verb patterns at C1 ────────────────────────────────
  createGrammarLesson({
    ...common,
    id: 'C1-GRAMMAR-006',
    order: 6,
    title: 'Complex verb patterns: verb + object + infinitive/gerund and C1 pattern distinctions',
    objectives: [
      'Use verb + object + infinitive patterns (enable X to, prevent X from, allow X to, compel X to, oblige X to, persuade X to).',
      'Use verb + object + -ing patterns (find X interesting, see X as being, catch X doing).',
      'Distinguish meaning differences in verb patterns that look similar (remember to/doing, stop to/doing, try to/doing, regret to say/having said).',
      'Use verbs of thinking and belief in complex patterns (consider X to be, believe X to be, expect X to, find X to be).',
    ],
    teacherOpening: 'At C1, verb patterns are not just about "right or wrong" — they carry meaning differences. "I stopped to read the report" means something different from "I stopped reading the report." "She remembered to submit" differs from "she remembered submitting." And "He found the argument compelling" differs subtly from "He found the argument to be compelling." Understanding these differences — and using them intentionally — is the mark of a C1 user.',
    portugueseContrast: [task('Em Complex verb patterns: verb + object + infinitive/gerund and C1 pattern distinctions, observe que a estrutura do inglês difere da ordem natural do português.'), task('Não traduza literalmente; identifique o padrão do inglês antes de produzir.')], 
    whyItMatters: 'Complex verb patterns are dense in academic and professional English. The verb-object-infinitive pattern (This enables governments to adopt..., This prevents institutions from functioning...) is the backbone of formal argument about causes, effects, obligations and possibilities.',
    differenceFromA2: 'B2: "The policy stops the banks from doing this." C1: "The regulatory framework is intended to prevent financial institutions from engaging in the kind of speculative behaviour that precipitated the 2008 crisis."',
    grammarTable: {
      headers: ['Pattern', 'Example verbs', 'Example', 'Meaning note'],
      rows: [
        ['Verb + obj + to-inf', 'enable, allow, encourage, force, compel, oblige, persuade, require, cause, prevent + from', 'The framework enables governments to adopt binding targets.', '"prevent" takes from + -ing, not to-inf'],
        ['Verb + obj + bare inf', 'let, make, have, help (informal)', 'This made the committee reconsider its position.', '"make" = force (causative); no "to" in active; passive restores "to"'],
        ['Verb + obj + -ing', 'catch, find, keep, leave, picture, imagine, see, hear, notice', 'I find the argument somewhat compelling.', 'perception verbs + obj + -ing; also: cannot help + -ing'],
        ['Verb + to-inf (to = future orientation)', 'decide, plan, agree, refuse, manage, fail, intend, hope', 'The institution failed to respond adequately.', '"to" marks a future-oriented or unrealised action'],
        ['Verb + -ing (action/process)', 'consider, recommend, suggest, finish, avoid, deny, risk, mind', 'I would recommend reviewing the methodology.', 'gerund marks ongoing or considered process'],
        ['Same verb, different pattern, different meaning', 'remember, forget, stop, try, regret, mean, go on', 'She remembered submitting (she has a memory of doing it) / She remembered to submit (she didn\'t forget).', 'The most tested C1 pattern distinction'],
      ],
    },
    meaningDistinctions: {
      title: 'The most important meaning distinctions at C1',
      items: [
        { verb: 'remember', toInf: 'remember to do = don\'t forget to do it (future/duty)', gerund: 'remember doing = have a memory of having done it (past)' },
        { verb: 'stop', toInf: 'stop to do = pause in order to do something else', gerund: 'stop doing = cease doing something' },
        { verb: 'try', toInf: 'try to do = attempt (may or may not succeed)', gerund: 'try doing = experiment with (to see if it helps)' },
        { verb: 'regret', toInf: 'regret to say = I\'m sorry to tell you now (formal)', gerund: 'regret saying/having said = feel sorry about past action' },
        { verb: 'mean', toInf: 'mean to do = intend to', gerund: 'mean doing = involve, entail' },
        { verb: 'go on', toInf: 'go on to do = do something next in a sequence', gerund: 'go on doing = continue doing the same thing' },
      ],
    },
    teacherExamples: [
      'The failure to establish clear accountability mechanisms enabled the dysfunction to persist unchecked for years.',
      'The regulation is designed to prevent financial institutions from taking on excessive systemic risk.',
      'I regret to say that the evidence does not support the conclusions the report has drawn.',
      'The committee went on to recommend a complete restructuring of the oversight framework.',
      'Insisting on unanimity effectively meant abandoning any hope of rapid reform.',
      'The new framework requires all signatories to report annually and obliges them to demonstrate measurable progress.',
    ],
    practiceExercises: [
      {
        type: 'meaning-distinction',
        instruction: 'Choose the correct form and explain the difference in meaning.',
        items: [
          { a: 'He stopped to read the report.', b: 'He stopped reading the report.' },
          { a: 'I regret to inform you of this decision.', b: 'I regret informing you of this decision.' },
          { a: 'She tried to implement the reform.', b: 'She tried implementing the reform.' },
          { a: 'The regulation means to restrict this activity.', b: 'The regulation means restricting this activity.' },
        ],
      },
      {
        type: 'production',
        instruction: 'Write four sentences using the patterns: (1) prevent X from + -ing; (2) enable X to + inf; (3) regret to say (in a formal email context); (4) a verb + gerund where changing to infinitive would change the meaning.',
      },
    ],
    lessonRecap: 'You practised complex verb patterns at C1 — verb + object + infinitive/gerund, causative patterns (make/let/have), perception patterns, and the critical meaning distinctions (remember to/doing, stop to/doing, try to/doing, regret to/having).',
    nextLessonBridge: 'Next: C1 academic verbs — a higher-register vocabulary set for academic writing (bolster, corroborate, underpin, militate against, lend credence to, gainsay).',
  }),

  // ─── VOCABULARY-003: C1 academic verbs ───────────────────────────────────────
  createVocabularyLesson({
    ...common,
    id: 'C1-VOCABULARY-003',
    order: 3,
    title: 'Vocabulary: C1 academic verbs — bolster, corroborate, underpin, militate against',
    objectives: [
      'Learn and use 12 high-register academic verbs at C1 level.',
      'Distinguish between verbs with similar meanings but different connotations.',
      'Produce these verbs in accurate collocational contexts.',
      'Understand and replicate the density of academic verb use in C1 written production.',
    ],
    teacherOpening: 'Academic writing at C1 is characterised by its verb precision. Where B2 writers use "support" (an argument), C1 writers use "bolster", "corroborate", "substantiate" or "lend credence to" — each with a slightly different meaning. Learning these verbs is not about showing off vocabulary; it is about writing with the precision that academic register requires.',
    targetWords: [
      {
        word: 'bolster',
        partOfSpeech: 'verb',
        definition: 'To support or strengthen something, especially a position, argument or confidence.',
        exampleSentences: [
          'The new evidence considerably bolsters the case for structural reform.',
          'Rather than bolstering the consensus, the leaked data appeared to undermine it.',
        ],
        collocations: ['bolster the case for / bolster confidence / bolster an argument / significantly bolster'],
      },
      {
        word: 'corroborate',
        partOfSpeech: 'verb',
        definition: 'To confirm or give support to a statement, theory or finding by providing additional evidence from an independent source.',
        exampleSentences: [
          'These findings corroborate the conclusions drawn by earlier research on the same phenomenon.',
          'No independent evidence has yet been produced to corroborate the claim.',
        ],
        collocations: ['corroborate a claim / corroborate findings / independently corroborated / corroborating evidence'],
        notToConfuse: 'corroborate (independent evidence confirms a claim) ≠ confirm (restates that something is true)',
      },
      {
        word: 'underpin',
        partOfSpeech: 'verb',
        definition: 'To provide the basis, foundation or support for something.',
        exampleSentences: [
          'The empirical assumptions underpinning the model have been called into question by recent data.',
          'Democratic legitimacy is underpinned by the principle that citizens share a sufficient common epistemic ground.',
        ],
        collocations: ['underpin the argument / underpin the framework / the assumptions underpinning / underpinned by'],
      },
      {
        word: 'militate against',
        partOfSpeech: 'verb phrase',
        definition: 'To be a powerful factor in preventing something from happening.',
        exampleSentences: [
          'Several structural factors militate against rapid reform, chief among them the veto power held by incumbent actors.',
          'The political economy of the situation militates strongly against the kind of redistributive action the evidence demands.',
        ],
        collocations: ['militate strongly against / militate against reform / factors that militate against'],
        notToConfuse: '"militate against" (to work powerfully against) ≠ "mitigate" (to reduce the severity of something) — a very common error',
      },
      {
        word: 'lend credence to',
        partOfSpeech: 'verb phrase',
        definition: 'To make something seem more likely to be true or valid.',
        exampleSentences: [
          'The discovery of internal communications lends considerable credence to the allegation.',
          'Far from lending credence to the conspiracy theory, the available evidence runs counter to it.',
        ],
        collocations: ['lend credence to the claim / considerable credence / lend further credence / lend no credence to'],
      },
      {
        word: 'gainsay',
        partOfSpeech: 'verb',
        definition: 'To deny or contradict (something); to dispute the truth or validity of.',
        exampleSentences: [
          'It is difficult to gainsay the conclusion that the system has failed, given the weight of evidence.',
          'While critics may gainsay the methodology, they cannot dispute the overall direction of the findings.',
        ],
        collocations: ['difficult to gainsay / cannot be gainsaid / gainsay the evidence / gainsay a conclusion'],
        note: 'Almost always used with a negative or in a context implying difficulty: "it is hard to gainsay", "it cannot be gainsaid".',
      },
      {
        word: 'substantiate',
        partOfSpeech: 'verb',
        definition: 'To provide evidence to support the truth, reality or validity of a claim.',
        exampleSentences: [
          'The authors fail to substantiate their central claim with empirical evidence.',
          'The hypothesis has since been substantiated by independent research across multiple institutional contexts.',
        ],
        collocations: ['substantiate a claim / substantiate a hypothesis / fail to substantiate / empirically substantiated'],
      },
      {
        word: 'predispose',
        partOfSpeech: 'verb',
        definition: 'To make someone or something inclined toward a particular attitude, condition or outcome.',
        exampleSentences: [
          'Early institutional choices predispose governance systems toward path dependency, making reform structurally difficult.',
          'The design of the framework predisposes actors to pursue short-term over long-term objectives.',
        ],
        collocations: ['predispose to / predispose toward / predisposed to view / structurally predisposed'],
      },
      {
        word: 'vitiate',
        partOfSpeech: 'verb',
        definition: 'To impair the quality, effectiveness or legal validity of something.',
        exampleSentences: [
          'The absence of independent oversight vitiates the entire accountability framework.',
          'Several methodological errors vitiate the study\'s conclusions, rendering them unreliable.',
        ],
        collocations: ['vitiate the argument / vitiate the framework / vitiate a conclusion / effectively vitiates'],
        register: 'Formal and somewhat elevated — more common in academic and legal writing than in everyday C1 contexts.',
      },
      {
        word: 'attenuate',
        partOfSpeech: 'verb',
        definition: 'To reduce the force, effect or value of something.',
        exampleSentences: [
          'The evidence base, while substantial, is attenuated by significant gaps in longitudinal data.',
          'The impact of the intervention was attenuated by poor implementation at the local level.',
        ],
        collocations: ['significantly attenuated / attenuated by / attenuate the effect / the force of the argument is attenuated'],
      },
      {
        word: 'instantiate',
        partOfSpeech: 'verb',
        definition: 'To represent as a concrete example or instance of an abstract principle.',
        exampleSentences: [
          'The Digital Services Act can be seen as instantiating the principle that platforms bear responsibility for systemic harm.',
          'Each case study is designed to instantiate the broader theoretical claim.',
        ],
        collocations: ['instantiate a principle / instantiate the argument / serve to instantiate'],
      },
      {
        word: 'circumscribe',
        partOfSpeech: 'verb',
        definition: 'To restrict the range or scope of something; to define the limits of.',
        exampleSentences: [
          'National sovereignty severely circumscribes the scope of multilateral intervention.',
          'The legal framework is designed to circumscribe the discretion of individual actors.',
        ],
        collocations: ['circumscribe the scope of / circumscribed by / significantly circumscribed / circumscribe authority'],
      },
    ],
    practiceExercises: [
      {
        type: 'precision-choice',
        instruction: 'Choose the most precise verb from the vocabulary list to complete each sentence. More than one may be possible — justify your choice.',
        items: [
          'The new research _____s the findings of the original study by providing independent replication.  [corroborate / bolster / substantiate]',
          'Several structural factors _____ against rapid reform. [militate / mitigate / underpin]',
          'The absence of transparency _____ the entire accountability process. [vitiates / attenuates / circumscribes]',
          'The existence of private communications _____ credence _____ the allegation. [lends / gives / adds]',
        ],
      },
      {
        type: 'production',
        instruction: 'Write two formal sentences for each of the following verbs: (1) underpin; (2) circumscribe; (3) predispose. Use each in a different academic context.',
      },
    ],
    lessonRecap: 'You learned 12 C1 academic verbs — bolster, corroborate, underpin, militate against, lend credence to, gainsay, substantiate, predispose, vitiate, attenuate, instantiate, circumscribe — with collocations and precision distinctions.',
    nextLessonBridge: 'Next: C1 epistemic and modal vocabulary — the language of degrees of certainty, probability and evidentiality at near-native level.',
  }),

  // ─── VOCABULARY-004: C1 epistemic and modal language ─────────────────────────
  createVocabularyLesson({
    ...common,
    id: 'C1-VOCABULARY-004',
    order: 4,
    title: 'Vocabulary: C1 epistemic language — degrees of certainty, probability and evidentiality',
    objectives: [
      'Use a full range of C1 modal and epistemic adverbs to express degrees of certainty.',
      'Distinguish between epistemic (knowledge-based) and deontic (obligation-based) modal language.',
      'Use evidentiality markers (ostensibly, purportedly, according to, on the basis of) to signal how knowledge was obtained.',
      'Produce calibrated academic claims — neither overclaiming nor underclaiming.',
    ],
    teacherOpening: 'C1 academic writing is characterised by calibrated certainty: the writer says exactly how confident they are and on what basis, no more and no less. "The evidence proves" (overclaiming), "maybe this is true" (underclaiming), and "it is widely believed" (B2 hedging) are all distinct from the C1 range: "the evidence strongly suggests", "on the available evidence it appears likely that", "this finding, if corroborated, would substantially bolster the claim that". Learning this range is the key to sounding academically credible.',
    targetCategories: [
      {
        category: 'Strong certainty (but not absolute)',
        items: [
          { phrase: 'it is virtually certain that', note: 'Near-absolute; appropriate for scientific consensus or overwhelmingly corroborated claims.', example: 'It is virtually certain that anthropogenic emissions are the dominant driver of the observed warming.' },
          { phrase: 'the evidence leaves little room for doubt that', note: 'Strong claim with implicit acknowledgement that some doubt remains.', example: 'Taken together, the evidence leaves little room for doubt that the intervention reduced mortality.' },
          { phrase: 'it can be said with a high degree of confidence that', note: 'Formal quantified certainty expression.', example: 'It can be said with a high degree of confidence that the two indicators move together over the cycle.' },
          { phrase: 'in all probability', note: 'Phrase meaning "almost certainly" — more formal than "probably".', example: 'The disruption was, in all probability, caused by the supply shortage rather than by falling demand.' },
        ],
      },
      {
        category: 'Moderate certainty',
        items: [
          { phrase: 'the weight of evidence suggests', note: 'Implies that multiple sources point in the same direction; calibrated scholarly claim.', example: 'The weight of evidence suggests that early intervention improves long-term outcomes.' },
          { phrase: 'on balance, it appears that', note: 'Acknowledges complexity while stating a directional conclusion.', example: 'On balance, it appears that the reform succeeded, despite uneven implementation across regions.' },
          { phrase: 'the evidence is broadly consistent with the view that', note: 'The claim is supported but not conclusively proven.', example: 'The evidence is broadly consistent with the view that institutions shape long-run growth.' },
          { phrase: 'it seems reasonable to conclude that', note: 'Moderate certainty with epistemic modesty.', example: 'It seems reasonable to conclude that the policy had a modest but genuine effect.' },
          { phrase: 'there are strong grounds for thinking that', note: 'Evidence-based but qualified.', example: 'There are strong grounds for thinking that the decline began well before the crisis.' },
        ],
      },
      {
        category: 'Lower certainty / tentative',
        items: [
          { phrase: 'the tentative suggestion emerges that', note: 'Flagging a hypothesis, not a finding.', example: 'From these pilot results, the tentative suggestion emerges that smaller classes aid retention.' },
          { phrase: 'the data are at least consistent with the hypothesis that', note: 'Very careful: consistent with ≠ proves.', example: 'The data are at least consistent with the hypothesis that exposure precedes preference.' },
          { phrase: 'conceivably', note: 'Possible but not strongly supported — use sparingly.', example: 'The effect could conceivably be an artefact of the sampling method rather than a real trend.' },
          { phrase: 'it is not implausible that', note: 'Double negative for very tentative claim.', example: 'It is not implausible that the two trends share a single underlying cause.' },
          { phrase: 'this may, in part, reflect the fact that', note: '"May" + "in part" + "reflect" — multiple hedges stacked for extreme tentativeness.', example: 'The gap may, in part, reflect the fact that the groups differed at baseline.' },
        ],
      },
      {
        category: 'Evidentiality — how we know',
        items: [
          { phrase: 'ostensibly', note: 'According to appearances (with possible scepticism about the reality).', example: 'The reform was ostensibly about efficiency, though its real purpose was widely contested.' },
          { phrase: 'purportedly', note: 'As claimed (with implied scepticism about the claim).', example: 'The memo, purportedly leaked from the ministry, could not be independently verified.' },
          { phrase: 'on the available evidence', note: 'Scoped to the evidence we have — implies other evidence might change the picture.', example: 'On the available evidence, the link is suggestive rather than firmly established.' },
          { phrase: 'according to the best available data', note: 'Qualifies the claim by the quality and availability of evidence.', example: 'According to the best available data, participation has fallen steadily since 2015.' },
          { phrase: 'as the literature consistently shows', note: 'Attribution to the body of research, not a single source.', example: 'As the literature consistently shows, the timing of feedback affects learning gains.' },
          { phrase: 'to all intents and purposes', note: 'For practical purposes, even if technically not exactly so.', example: 'To all intents and purposes, the negotiation had already collapsed by the time they met.' },
        ],
      },
    ],
    practiceExercises: [
      {
        type: 'calibration',
        instruction: 'Rewrite each sentence to express the degree of certainty indicated in brackets. Use language from the vocabulary above.',
        items: [
          { original: 'The policy failed.', certainty: 'moderate (you have evidence but acknowledge complexity)' },
          { original: 'Inequality is structural.', certainty: 'strong (scientific consensus level)' },
          { original: 'The two phenomena are related.', certainty: 'tentative (you have noticed a pattern but lack confirming evidence)' },
          { original: 'The regulation is working.', certainty: 'low scepticism (it appears to be working, but the data is from the interested party)' },
        ],
      },
      {
        type: 'comparison',
        instruction: 'These four statements make the same basic claim with different degrees of certainty. Rank them from MOST certain to LEAST. Justify your ranking.',
        items: [
          'The evidence proves that the policy has failed.',
          'The weight of evidence suggests that the policy has not achieved its stated objectives.',
          'It is not implausible that the policy may, in part, have contributed to the outcomes observed.',
          'The policy is, in all probability, responsible for the outcomes documented in the study.',
        ],
      },
    ],
    recognitionPractice: [{ question: 'C1 epistemic language — qual expressão indica certeza forte, próxima do absoluto?', options: ['it is virtually certain that', 'on balance, it appears that', 'conceivably'], answer: 'it is virtually certain that', explanation: '"Virtually certain" expressa certeza forte — apropriada para consenso científico ou evidência consolidada.' }, { question: 'C1 epistemic language — qual opção combina com evidentiality marker?', options: ['ostensibly', 'in all probability', 'on balance'], answer: 'ostensibly', explanation: 'Ostensibly é um marcador de evidencialidade — indica que a aparência pode não refletir a realidade.' }],
    lessonRecap: 'You learned and practised C1 epistemic and modal language — strong certainty (in all probability, virtually certain), moderate certainty (the weight of evidence suggests, on balance), tentative (conceivably, consistent with the hypothesis), and evidentiality markers (ostensibly, purportedly, on the available evidence).',
    nextLessonBridge: 'Now the C1.2 Speaking task — argue a complex position on an unseen topic using the full range of C1.2 grammar and vocabulary.',
  }),

  // ─── SPEAKING-002: C1 extended argument with advanced grammar ─────────────────
  createSpeakingLesson({
    ...common,
    id: 'C1-SPEAKING-002',
    order: 2,
    title: 'Speaking: C1 extended argument with cleft sentences, passive and epistemic calibration',
    objectives: [
      'Deliver a fluent 3-minute C1 argument using advanced cleft structures, modal passives and epistemic language.',
      'Demonstrate accurate calibration of certainty in spoken academic English.',
      'Use C1 academic verbs (bolster, militate against, corroborate, underpin) naturally in speech.',
      'Maintain formal register and precise argument structure throughout.',
    ],
    teacherOpening: 'Today\'s speaking task requires you to argue a position on a complex topic — and to argue it with C1 precision: cleft sentences for emphasis, modal passives for academic distancing, and epistemic language that reflects exactly how confident you are in each claim. The topic is unseen: you will choose from the options below and have 2 minutes to prepare.',
    modelPhrases: [
      'It is conceivable that artificial intelligence could bolster, rather than undermine, democratic deliberation.',
      'What the evidence shows is that the relationship between technology and governance is considerably more complex than popular accounts suggest.',
      'This claim should be acknowledged as speculative; on the available evidence, the picture remains inconclusive.',
      'In all probability, the most significant effects will be indirect rather than direct.',
      'The weight of evidence suggests that institutional design matters more than the technology itself.',
      'Were one to adopt this position, the implications for policy would be far-reaching.',
    ],
    pronunciationFocus: {
      title: 'Pronunciation & shadowing',
      tips: [
        'Shadow: "It is conceivable that artificial intelligence could bolster, rather than undermine, democratic deliberation." — stress conCEIVable, BOLster, and UNdermine. Practise the "rather than" contrast with even stress.',
        '"What it is that distinguishes X from Y is..." — practise the cleft structure with emphasis on "IS" in the cleft. Keep "what it is that" as a smooth chunk.',
        '"This is widely regarded as having been established beyond reasonable doubt." — chunk: "this is WIDEly reGARDed / as having been esTABlished / beYOND reasonable DOUBT."',
        '"Were one to adopt this position, the implications would be..." — stress WERE and adOPT in the formal subjunctive opening. Pause after "position".',
      ],
    },
    warmUp: [
      task('Choose a topic from the options below. Spend 2 minutes planning: (1) what you consider virtually certain; (2) what you think is probable; (3) what is a genuinely open question. This epistemic mapping will shape your entire argument.'),
    ],
    topicOptions: [
      'To what extent is the epistemic crisis (discussed in C1.1) an irreversible consequence of digital technology, or can it be mitigated by institutional design?',
      'Does the concentration of power in digital platforms militate against effective democratic governance, or does it simply restructure how that governance operates?',
      'Is it conceivable that artificial intelligence could bolster, rather than undermine, democratic deliberation? What conditions would need to hold?',
      'The case for regulating algorithmic design more heavily than content moderation cannot be gainsaid. Do you agree?',
      'Free choice — any topic from C1.1–C1.2 that permits genuine calibrated argument.',
    ],
    guidedPractice: [
      task('Deliver a 3-minute argument using the structure: (1) frame the question and signal your epistemic stance (virtual certainty / probability / open question); (2) make your central claim using a cleft structure for emphasis; (3) provide evidence, using epistemic language to calibrate each claim; (4) address the strongest counterargument, using passive for distancing if needed; (5) conclude with "on balance" or "the weight of evidence suggests" to signal a measured conclusion.', 'Record yourself. Target: 2:50–3:15. No script.'),
    ],
    speakingChecklist: [
      'Duration: 2:45–3:15.',
      'At least one cleft structure (What I find is... / It is not X that Y, but Z / What the evidence shows is...).',
      'At least one modal passive (should be acknowledged / might have been prevented / is widely considered to have...).',
      'At least two epistemic language items (in all probability / the weight of evidence / conceivably / on the available evidence).',
      'At least two C1 academic verbs (bolster, corroborate, underpin, militate against, gainsay, substantiate, lend credence to).',
      'Counterargument addressed — with appropriate epistemic calibration (not dismissed, but weighed).',
      'Measured conclusion — no overclaiming.',
    ],
    freeSpeaking: [
      { topic: 'Listen back to your recording and identify: (1) one sentence where your epistemic calibration was accurate; (2) one sentence where you overclaimed or underclaimed; (3) one C1 structure that came naturally. This self-assessment is part of the task.' },
    ],
    lessonRecap: 'You delivered a 3-minute C1 argument demonstrating advanced cleft structure, modal passives, epistemic calibration and C1 academic verb use in sustained formal spoken production.',
    nextLessonBridge: 'In C1.2 Part 2: reading and listening at full C1 level, and two writing tasks — an essay body paragraph and an extended two-paragraph essay section.',
  }),

]);

export const C1_DEEP_ADVANCED_GRAMMAR_PART1_BY_PILLAR = Object.freeze({
  grammar: C1_DEEP_ADVANCED_GRAMMAR_PART1.filter(l => l.pillar === 'grammar'),
  vocabulary: C1_DEEP_ADVANCED_GRAMMAR_PART1.filter(l => l.pillar === 'vocabulary'),
  speaking: C1_DEEP_ADVANCED_GRAMMAR_PART1.filter(l => l.pillar === 'speaking'),
});
