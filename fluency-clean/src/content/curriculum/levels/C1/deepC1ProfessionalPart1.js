import { createGrammarLesson, createVocabularyLesson, createSpeakingLesson } from '../../../schemas/index.js';

const level = 'C1';
const status = 'ready';
const common = { level, status, estimatedMinutes: 70, tags: ['c1-5', 'professional', 'business-english', 'academic', 'deep-approved-target'] };

function task(instruction, note = '', expected = '') { return { instruction, note, expected }; }

export const C1_DEEP_PROFESSIONAL_PART1 = Object.freeze([

  // ─── GRAMMAR-012: Conditional and hypothetical language in professional contexts
  createGrammarLesson({
    ...common,
    id: 'C1-GRAMMAR-012',
    order: 12,
    title: 'Advanced conditional and hypothetical language in professional communication',
    objectives: [
      'Use mixed conditionals (third + second, second + third) to express complex hypothetical scenarios.',
      'Use "were to," "should" (formal conditional), and "had" inversion in professional writing.',
      'Distinguish between open, remote, and counterfactual conditionals in professional register.',
      'Use hypothetical structures to soften requests, hedge proposals, and distance claims.',
      'Recognise how conditional structures in professional communication function as politeness strategies.',
    ],
    teacherOpening: 'In professional English, conditionals do more than express logical relationships — they perform social functions. "If you have time, please review this" is a request. "Should you have any opportunity to review this, we would greatly appreciate your input" is a request with a politeness level calibrated to a senior recipient. "Were this proposal to be adopted, the long-term implications would warrant careful consideration" is a hedged recommendation that maintains professional distance. At C1, the grammar of conditionality is inseparable from the pragmatics of professional discourse.',
    whyItMatters: 'Professional communication at C1 requires the ability to make proposals, requests, and recommendations at a range of politeness and formality levels. Conditional structures are one of the primary tools for calibrating this — they allow speakers and writers to soften demands, hedge claims, and propose alternatives without direct confrontation.',
    differenceFromA2: 'B2: "If you don\'t fix this, we will have a problem." C1: "Should this issue remain unaddressed, we would anticipate significant operational consequences in the following quarter, particularly in relation to the procurement timeline."',
    grammarTable: {
      headers: ['Conditional type', 'Structure', 'Professional example', 'Function'],
      rows: [
        ['Formal "should" conditional', 'Should + subject + base verb', 'Should you require any further information, please do not hesitate to contact us.', 'Formal alternative to "if you need" — standard in business correspondence'],
        ['Formal "were to" conditional', 'Were + subject + to + verb', 'Were the board to approve the proposal, implementation could begin in Q3.', 'Remote/hypothetical — presents something as possible but not assumed'],
        ['"Had" inversion (third conditional)', 'Had + subject + past participle', 'Had the due diligence been completed earlier, the discrepancy would have been identified.', 'Counterfactual — formal alternative to "if the due diligence had been completed"'],
        ['Mixed conditional (3rd + 2nd)', 'If + past perfect, would + base verb', 'If the merger had gone ahead as planned, we would now be in a stronger negotiating position.', 'Past cause, present consequence'],
        ['Mixed conditional (2nd + 3rd)', 'If + past simple, would have + past participle', 'If the team were more experienced, this would have been flagged at an earlier stage.', 'Present/permanent cause, past consequence'],
        ['Softened request', 'I wonder whether / It would be helpful if', 'It would be extremely helpful if the report could be made available by Thursday.', 'Indirect request — more polite than "please send by Thursday"'],
      ],
    },
    commonErrors: [
      { wrong: 'If you will look at the attached document, you will find the relevant data.', right: 'Should you have an opportunity to review the attached document, you will find the relevant data presented in full.', explanation: '"If you will" in conditional clauses is non-standard in formal professional English. "Should you have an opportunity to" is more formal and more polite.' },
      { wrong: 'If the company would agree to our terms, we could proceed faster.', right: 'Were the company to agree to our terms, we would be in a position to expedite the process considerably.', explanation: '"Would" in the if-clause is generally not used in conditional structures (except in polite requests). "Were...to" with "would" in the main clause is the correct formal structure.' },
      { wrong: 'If they had listened to us, everything would be fine now.', right: 'Had they acted on the advice provided at the initial consultation, the organisation would now be well positioned to manage this transition.', explanation: 'The original is correct but informal. The C1 version uses "had" inversion, a precise professional reformulation of the counterfactual, and avoids the colloquial "fine."' },
    ],
    examples: [
      { sentence: 'Should the committee decide not to proceed, we would recommend a formal review of the underlying assumptions before any further investment is committed.', explanation: '"Should...decide" is formal conditional; "we would recommend" is appropriately hedged — a recommendation, not a command. The whole sentence makes a professionally appropriate contingent recommendation.' },
      { sentence: 'Were this proposal to be adopted without the risk assessment modifications suggested in section 4.3, the organisation would be exposed to a category of regulatory liability that is unlikely to be covered by existing indemnity arrangements.', explanation: '"Were...to be adopted" presents the scenario as genuinely possible but not assumed. The consequence clause is specific and factual in register, not alarmist.' },
      { sentence: 'Had the procurement team been consulted at the design stage, several of the bottlenecks now delaying the rollout would in all probability have been identified and addressed before implementation began.', explanation: '"Had...been consulted" is third-conditional inversion (counterfactual); "would in all probability have been" is appropriately hedged (not "would definitely have been"). The sentence makes a professional critique while maintaining diplomatic register.' },
    ],
    tasks: [
      task(
        'Rewrite the following using a formal conditional structure: "If you send the invoice by Friday, we will process it in this month\'s payment run."',
        'Consider: what level of formality is appropriate? What conditional form signals that formality? Should the consequence be hedged?',
        'Example: "Should the invoice be received by close of business Friday, we would anticipate being able to include it in the current month\'s payment cycle."'
      ),
      task(
        'Write a mixed conditional sentence (past cause, present consequence) about a professional situation: a project that failed to meet a deadline and the current consequences.',
        'The if-clause should refer to the past (what didn\'t happen); the main clause should refer to the present (what would be true now if it had happened).',
        'Example: "Had the project team been allocated the resources requested in the original specification, we would now be entering the final phase of testing rather than managing a six-week delay."'
      ),
      task(
        'Write a formally hedged proposal using "were...to" for the following situation: your company is considering expanding into a new market but has not yet made a decision.',
        'The sentence should present the expansion as a possibility under consideration, not as a decision. Use professional hedging language in the consequence clause.',
        'Example: "Were the board to approve an expansion into the South Asian market, our preliminary analysis suggests that the investment could be expected to break even within three to four years, though this projection is sensitive to the assumptions regarding regulatory approval timelines."'
      ),
      task(
        'Use a conditional structure to soften the following demand: "You must submit the compliance documentation by the end of the month."',
        'The content stays the same (the deadline is real) but the form should be less directive. Use "should," "were to," or a softened request structure.',
        'Example: "We would be grateful if the compliance documentation could be submitted before the end of the month. Should there be any difficulty meeting this deadline, please contact us at the earliest opportunity so that we can discuss whether an extension might be accommodated."'
      ),
    ],
  }),

  // ─── GRAMMAR-013: Formal register and tonal calibration ──────────────────────
  createGrammarLesson({
    ...common,
    id: 'C1-GRAMMAR-013',
    order: 13,
    title: 'Formal register in professional communication: tonal calibration, distancing, and indirect speech acts',
    objectives: [
      'Calibrate register across a range of professional communication types (formal correspondence, presentations, negotiations, meetings).',
      'Use distancing devices (the passive, impersonal constructions, nominalisation) to reduce directness in professional contexts.',
      'Recognise and produce indirect speech acts: requests as questions, suggestions as observations, disagreement as concern.',
      'Distinguish between formal, semi-formal, and informal registers in professional English.',
      'Avoid register mismatches that undermine professional credibility.',
    ],
    teacherOpening: 'Professional register in English is not a single level — it is a spectrum from highly formal (board reports, legal correspondence) through semi-formal (team emails, internal proposals) to informal (messaging platforms, team meetings with close colleagues). At C1, the skill is not just using formal language — it is calibrating the level of formality to the context, the recipient, and the communicative purpose. Doing this requires understanding how distancing devices, indirect speech acts, and lexical choices work differently across the spectrum.',
    whyItMatters: 'Register mismatches — using overly formal language with close colleagues, or insufficiently formal language with senior external stakeholders — are among the most common and most consequential errors in professional communication. They signal either social unawareness or disrespect. At C1, this calibration should be automatic.',
    differenceFromA2: 'B2: "I think there is a problem with this plan." C1 (formal): "It may be worth considering whether the proposed timeline adequately accounts for the complexity of the regulatory approval process." C1 (semi-formal): "I\'d want to flag a potential concern about the timeline before we commit to this approach."',
    grammarTable: {
      headers: ['Communicative function', 'Informal', 'Semi-formal', 'Formal'],
      rows: [
        ['Disagreement', '"I don\'t agree."', '"I have some reservations about this approach."', '"It may be appropriate to revisit the assumptions underlying this proposal before a final decision is taken."'],
        ['Request', '"Can you send me the report?"', '"Would it be possible to have the report by Thursday?"', '"We would be grateful if the report could be made available before the end of the week."'],
        ['Bad news', '"The project is late."', '"I should flag that we are currently running behind schedule."', '"It is my duty to advise that the project timeline has been subject to a delay of approximately three weeks, attributable to..."'],
        ['Apology', '"Sorry about that."', '"I apologise for any inconvenience caused."', '"We deeply regret any disruption that this situation may have caused and wish to assure all affected parties that steps are being taken..."'],
        ['Suggestion', '"Maybe we should try X."', '"It might be worth exploring whether X would address the underlying issue."', '"One approach that the committee may wish to consider is whether the adoption of X would provide a more durable solution to the structural challenges identified."'],
        ['Declining', '"No, I can\'t do that."', '"I\'m afraid that won\'t be possible given current commitments."', '"Regrettably, we are not in a position to accommodate this request within the current operational constraints."'],
      ],
    },
    commonErrors: [
      { wrong: 'I just wanted to quickly touch base and ask if you can ping me the Q3 results whenever.', right: 'I am writing to request the Q3 financial results at your earliest convenience, as they are required for the board report currently in preparation.', explanation: 'The original is appropriate for a message to a close colleague but entirely inappropriate for external professional correspondence or senior stakeholder communication. The C1 version provides the reason for the request and uses formal constructions throughout.' },
      { wrong: 'Sorry but your proposal is not good.', right: 'Thank you for sharing your proposal. Having reviewed it in detail, I would welcome the opportunity to discuss a number of aspects that may benefit from further development before the presentation to the full committee.', explanation: 'Direct negative evaluation is damaging in professional contexts. The C1 version acknowledges the submission, signals concern diplomatically, proposes a constructive next step, and avoids any direct negative characterisation.' },
      { wrong: 'We need you to fix this immediately.', right: 'We would appreciate your urgent attention to the matter described below, as the operational impact is time-sensitive and the relevant stakeholders have indicated a requirement for resolution by the end of this week.', explanation: 'The original is acceptable in an internal emergency but inappropriate in most professional written contexts. The C1 version uses hedged necessity ("would appreciate your urgent attention"), explains the time-sensitivity without issuing a command, and refers to stakeholder requirements rather than the writer\'s own demand.' },
    ],
    examples: [
      { sentence: 'It has come to our attention that certain discrepancies exist between the figures reported in the original submission and those contained in the supplementary documentation provided last week.', explanation: 'The impersonal construction ("it has come to our attention") is a formal distancing device — it avoids directly accusing anyone of providing inconsistent information. "Certain discrepancies exist" is formally distanced (passive-like quality of "exist") and specific without being accusatory.' },
      { sentence: 'We would be grateful if you could confirm, at your earliest convenience, whether the amended terms are acceptable, so that the necessary documentation may be prepared in advance of the scheduled signing date.', explanation: 'A model of formal professional correspondence: conditional request ("would be grateful if you could"), politeness marker ("at your earliest convenience"), reason given ("so that"), passive to maintain impersonality ("may be prepared").' },
    ],
    tasks: [
      task(
        'Rewrite the following for a formal external audience (a senior partner at a client firm): "Hey, the deadline for the draft was last Monday and we still haven\'t got it. Can you send it today?"',
        'Think about: appropriate salutation tone, explanation of the situation, polite but clear urgency, and a forward-looking request. Avoid any accusatory language.',
        'Example: "I am writing to follow up on the draft that was anticipated by the close of business last Monday. We appreciate that competing demands may have affected your team\'s capacity, and would be grateful if it could be made available to us at your earliest convenience, as its receipt is critical to our ability to meet the client submission deadline later this week."'
      ),
      task(
        'Convert this direct disagreement into a professional semi-formal expression of concern: "This strategy is wrong. We will lose clients if we do this."',
        'The content (concern about client loss) should be preserved; the directness should be reduced. Use hedging, an indirect speech act, and a constructive framing.',
        'Example: "I\'d want to flag a significant concern about this strategy before we proceed. My reading of the client feedback we\'ve received over the past six months suggests there\'s a real risk of disengagement if we move in this direction — it would be worth making sure we\'ve stress-tested this scenario with the accounts team before we commit."'
      ),
      task(
        'Write a formal email opening and closing for a message to a regulatory body requesting an extension on a filing deadline. Use the formal register features from this lesson.',
        'Consider: how to introduce who you are and why you are writing; how to frame the request as appropriate and justified; how to close appropriately.',
        'Example opening: "I am writing on behalf of [Company Name] to request a short extension to the submission deadline for [filing reference], which is currently scheduled for [date]. Following an unexpected operational disruption affecting our compliance team, we find ourselves unable to meet the deadline without compromise to the accuracy and completeness of the submission." Example closing: "We would be grateful for your consideration of this request and are happy to provide any further information that may be required. We apologise for any inconvenience this request may cause and wish to assure you of our commitment to submitting a complete and accurate filing at the earliest practicable date."'
      ),
    ],
  }),

  // ─── VOCABULARY-009: Advanced professional and business vocabulary ─────────────
  createVocabularyLesson({
    ...common,
    id: 'C1-VOCABULARY-009',
    order: 9,
    title: 'Vocabulary: advanced professional and business English at C1',
    objectives: [
      'Use precise professional vocabulary in correspondence, presentations, and meetings.',
      'Distinguish between synonyms with different professional register implications.',
      'Use nominalised professional vocabulary (procurement, mitigation, diligence, attrition).',
      'Recognise and avoid pseudo-formal clichés ("going forward," "reach out," "impactful").',
    ],
    teacherOpening: 'Professional English at C1 has two failure modes: using language that is not formal enough for the context, and using pseudo-formal language — buzzwords, management-speak, and inflated vocabulary that sounds professional but communicates vaguely. Words like "synergy," "leverage," "impactful," "going forward," and "circle back" are pervasive in corporate communication but are often vague substitutes for precise expression. At C1, the goal is precision, not performance.',
    words: [
      { word: 'mitigation', partOfSpeech: 'noun', definition: 'the action of reducing the severity, seriousness, or painfulness of something; in professional contexts, specifically the reduction of risk or negative impact', example: 'The risk register identifies four high-priority exposures, each with a proposed mitigation strategy and an assigned owner responsible for its implementation.', collocations: ['risk mitigation', 'mitigation strategy', 'mitigation measures', 'in mitigation', 'mitigation of impact'] },
      { word: 'procurement', partOfSpeech: 'noun', definition: 'the action of obtaining or buying goods and services, especially by a formal process', example: 'The procurement team has been asked to evaluate three alternative suppliers against a set of criteria that includes price, quality, delivery timelines, and sustainability credentials.', collocations: ['procurement process', 'procurement team', 'procurement policy', 'public procurement', 'strategic procurement'] },
      { word: 'attrition', partOfSpeech: 'noun', definition: 'the process of reducing something\'s strength or effectiveness through sustained pressure or loss; in business, the gradual reduction of a workforce through natural losses', example: 'The high rate of staff attrition in the customer service division has been identified as a significant contributor to service quality degradation over the past eighteen months.', collocations: ['staff attrition', 'attrition rate', 'natural attrition', 'customer attrition', 'reduce attrition'] },
      { word: 'due diligence', partOfSpeech: 'noun phrase', definition: 'a thorough and systematic investigation or audit of a potential investment, acquisition, or business partner, conducted before entering a transaction', example: 'The board has instructed that full due diligence be completed before any commitment is made, including financial, legal, and operational assessments.', collocations: ['conduct due diligence', 'due diligence process', 'due diligence findings', 'failure of due diligence'] },
      { word: 'mandate', partOfSpeech: 'noun/verb', definition: 'an official instruction or authority to act; to give an official instruction or authority to do something', example: 'The committee\'s mandate extends to all aspects of compliance policy, but does not include operational decisions, which remain within the remit of the executive team.', collocations: ['within the mandate', 'exceed the mandate', 'clear mandate', 'mandate to act', 'the committee\'s mandate'] },
      { word: 'escalation', partOfSpeech: 'noun', definition: 'the process of raising an issue to a higher level of authority for decision or resolution; also the increase in severity of a problem or conflict', example: 'The protocol requires that any unresolved dispute between operational teams be subject to a formal escalation to the relevant director within five working days.', collocations: ['escalation process', 'formal escalation', 'escalation path', 'requires escalation', 'trigger an escalation'] },
      { word: 'liability', partOfSpeech: 'noun', definition: 'the state of being legally responsible for something; also, a financial obligation or debt', example: 'The legal team has advised that proceeding without the required certification would expose the company to potential liability for any harm arising from non-compliance.', collocations: ['legal liability', 'limit liability', 'exposure to liability', 'liability clause', 'assume liability'] },
      { word: 'stakeholder', partOfSpeech: 'noun', definition: 'a person or organisation that has an interest or concern in a business or project, including but not limited to shareholders', example: 'Effective stakeholder management requires not only identifying all parties whose interests are affected by the project, but understanding the nature and degree of that interest and the appropriate channels for engagement.', collocations: ['key stakeholders', 'stakeholder engagement', 'stakeholder management', 'stakeholder map', 'consult with stakeholders'] },
      { word: 'deliverable', partOfSpeech: 'noun', definition: 'a product or result that is produced and delivered as part of a project or contract, especially a specific output that can be evaluated', example: 'The contract specifies six deliverables over a twelve-month period, with payment milestones linked to the acceptance of each deliverable by the client.', collocations: ['key deliverables', 'project deliverables', 'deliver the deliverables', 'deliverable milestones', 'final deliverable'] },
      { word: 'bandwidth', partOfSpeech: 'noun', definition: 'in professional English, the capacity of a person or team to take on additional work (informal but widely used); in technical contexts, the rate of data transfer', example: 'Before assigning additional responsibilities to the compliance team, it is worth establishing whether they have the bandwidth to absorb them without compromising existing commitments.', collocations: ['have the bandwidth', 'bandwidth constraints', 'available bandwidth', 'limited bandwidth'] },
    ],
    tasks: [
      task(
        'Identify the pseudo-formal clichés in the following and rewrite with precise professional language: "Going forward, we should leverage our synergies to impactfully circle back to the key stakeholders and reach out to them about the issues."',
        'Each underlined phrase is vague or meaningless. Replace with precise professional expression.',
        'Example: "In the next phase of the project, we should capitalise on the complementary expertise within our teams, provide substantive updates to the key stakeholders, and initiate formal consultation on the issues identified in the most recent review."'
      ),
      task(
        'Write a sentence using "mitigation" and "liability" together in a professional context — for example, advising a colleague on a business decision.',
        'Think about a real professional scenario: a risk has been identified; there is potential liability; mitigation measures are being proposed.',
        'Example: "The legal team has recommended that we implement the proposed mitigation measures before proceeding, as failing to do so would expose the organisation to significant liability in the event that the risk materialises."'
      ),
      task(
        'Use "escalation" and "mandate" in two sentences from a professional context where a problem has exceeded a team\'s authority to resolve.',
        'Think about: who does the escalation, why, and where the mandate limit is.',
        'Example: "The operational team has flagged this issue for escalation, as the resolution requires a decision that falls outside their mandate." / "The escalation has been directed to the relevant director, in line with the established protocol."'
      ),
    ],
  }),

  // ─── SPEAKING-005: Negotiation and persuasion in professional English ──────────
  createSpeakingLesson({
    ...common,
    id: 'C1-SPEAKING-005',
    order: 5,
    title: 'Speaking: professional negotiation — framing positions, making concessions, and reaching agreement',
    objectives: [
      'Use advanced conditional and hedging structures in a professional negotiation context.',
      'Make, qualify, and withdraw positions in a professional register.',
      'Use strategic concession-and-counter patterns appropriate to business negotiation.',
      'Maintain formal professional register throughout a simulated negotiation.',
    ],
    teacherOpening: 'Professional negotiation in English requires a specific spoken register: formal enough to signal respect and seriousness, flexible enough to accommodate movement, and precise enough that the terms of any agreement are unambiguous. The grammar of negotiation relies heavily on conditionals (what we will do if...), hedging (our current position is...), and strategic concession (we are prepared to consider X if...).',
    dialogueTurns: [
      { speaker: 'Client (Selin)', text: 'Thank you for meeting with us today. We\'ve reviewed your proposal and we think it has strong foundations. However, our main concern is the timeline — the twelve-month implementation period is significantly longer than we\'d anticipated, and we\'d need to understand whether that\'s negotiable before we can move forward.' },
      { speaker: 'Supplier (Raj)', text: 'Thank you, Selin. We appreciate the positive feedback on the proposal. On the timeline, I want to be transparent: the twelve months reflects the complexity of the integration work, and we would not want to commit to a shorter timeline without understanding more about your technical infrastructure. That said, I understand the business need. I wonder if it would be helpful to explore whether a phased delivery model might address your concerns — one that delivers core functionality within six months, with full integration completed by month twelve.' },
      { speaker: 'Selin', text: 'A phased approach could work for us. What would phase one cover, specifically, and what would still be outstanding at the six-month point?' },
      { speaker: 'Raj', text: 'Phase one would deliver the full data migration and the core analytics dashboard — the two components your team identified as the highest-priority items. The integration with your legacy systems and the custom reporting module would follow in phase two. Were you to accept this structure, we\'d be in a position to commit to phase one delivery by month six, subject to the agreed data access and testing protocols being in place by week two.' },
      { speaker: 'Selin', text: 'That\'s helpful. On pricing — we\'d expected the phased approach to come with a cost reduction, since we\'re effectively deferring part of the delivery. Is there flexibility on the overall fee structure?' },
      { speaker: 'Raj', text: 'I understand the logic. I\'m not in a position to offer a reduction on the overall contract value — the scope of work is unchanged — but I could explore whether the payment schedule might be restructured to align with the phased delivery. In that scenario, you would only be invoiced for phase one on completion, with phase two invoiced on final delivery. Would that address the financial concern?' },
      { speaker: 'Selin', text: 'It would help, yes. Let me put forward a counter-proposal. If you can confirm the phased approach in writing, with the phase one deliverables and the month-six commitment clearly specified, and restructure the payments as you\'ve suggested, we\'d be in a position to sign the heads of terms by end of next week.' },
      { speaker: 'Raj', text: 'That works for us. To confirm: we\'ll provide a written summary of the phased delivery structure and the revised payment schedule within 48 hours, and on that basis you\'re prepared to commit to heads of terms by Friday of next week?' },
      { speaker: 'Selin', text: 'Correct — subject to legal review, which shouldn\'t take more than a day or two. I think we have the basis for an agreement.' },
      { speaker: 'Raj', text: 'Agreed. I\'ll get the summary to you by close of business tomorrow. Thank you, Selin — this has been a very productive conversation.' },
    ],
    tasks: [
      task(
        'Analyse Raj\'s second turn. Identify: (a) a conditional structure used to hedge a proposal, (b) a phrase used to signal transparency and establish trust, (c) a strategic concession, and (d) a counter-proposal.',
        'Re-read Raj\'s second turn carefully. Each of the four features should be identifiable as a specific phrase.',
        '(a) Conditional hedge: "we would not want to commit to a shorter timeline without understanding more about your technical infrastructure" — remote conditional implying that more information could change the position. (b) Trust signal: "I want to be transparent" — explicit meta-communication about intent. (c) Strategic concession: "I understand the business need" — acknowledgment of the client\'s position without accepting it. (d) Counter-proposal: "I wonder if it would be helpful to explore whether a phased delivery model might address your concerns" — an indirect suggestion framed as a question (indirect speech act).'
      ),
      task(
        'In Raj\'s fourth turn, a conditional structure signals that a commitment is dependent on a condition. Identify the structure and explain what the condition is.',
        'Look for "were you to" and "subject to." What conditions must be met before Raj can commit?',
        '"Were you to accept this structure, we\'d be in a position to commit to phase one delivery by month six, subject to the agreed data access and testing protocols being in place by week two." The commitment (phase one by month six) is conditional on two things: (a) Selin accepting the phased structure, and (b) data access and testing protocols being in place by week two. "Were you to accept" is formal conditional inversion; "subject to" is a professional scope-limiting phrase.'
      ),
      task(
        'Prepare and deliver a 2–3 minute negotiation role-play opening. You are a service provider who has received a complaint that your fees are too high. Your position: the fees reflect the quality and expertise of the service; you are prepared to discuss a payment plan or a small-scope reduction, but not a significant price cut. Use: at least one formal conditional, at least one indirect speech act (suggestion as question), and a strategic concession.',
        'Plan: what is your opening acknowledgment? What is your statement of your position? What conditional offer can you make? What are your limits?',
        'Your opening should: acknowledge the concern without accepting the premise (the fees are too high); explain the value proposition; make a conditional offer (subject to / were you to / should you); use an indirect speech act to introduce the offer; and be clear about your limits without being confrontational. Avoid: defensive language, over-apologising, or making concessions before they have been requested.'
      ),
    ],
  }),

]);

export const C1_DEEP_PROFESSIONAL_PART1_BY_PILLAR = Object.freeze({
  grammar: Object.freeze(C1_DEEP_PROFESSIONAL_PART1.filter(l => l.pillar === 'grammar')),
  vocabulary: Object.freeze(C1_DEEP_PROFESSIONAL_PART1.filter(l => l.pillar === 'vocabulary')),
  reading: Object.freeze([]),
  listening: Object.freeze([]),
  speaking: Object.freeze(C1_DEEP_PROFESSIONAL_PART1.filter(l => l.pillar === 'speaking')),
  writing: Object.freeze([]),
  checkpoint: Object.freeze([]),
});
