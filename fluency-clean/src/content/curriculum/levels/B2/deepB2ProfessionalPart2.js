import { createReadingLesson, createListeningLesson, createSpeakingLesson, createWritingLesson } from '../../../schemas/index.js';

const level = 'B2';
const status = 'ready';
const common = { level, status, estimatedMinutes: 65, tags: ['b2-4', 'professional', 'workplace', 'writing', 'deep-approved-target'] };

function task(instruction, note = '', expected = '') { return { instruction, note, expected }; }

export const B2_DEEP_PROFESSIONAL_PART2 = Object.freeze([

  // ─── READING-004: An email chain about a project delay ────────────────────────
  createReadingLesson({
    ...common,
    id: 'B2-READING-004',
    order: 4,
    title: 'Reading a professional email chain: tone, register and decision-making',
    readingPurpose: 'Read a professional email chain for tone, register shifts, implicit meaning, requests and the decision-making process. At B2, professional reading includes understanding what is politely stated vs directly stated.',
    preReadingVocabulary: [
      { word: 'escalate (a problem)', definition: 'bring an issue to a higher level of authority' },
      { word: 'rectify', definition: 'put right; correct an error or problem' },
      { word: 'oversight', definition: 'an unintentional failure to notice or do something' },
      { word: 'mitigate', definition: 'reduce the severity or impact of something' },
      { word: 'goodwill', definition: 'a friendly and cooperative attitude; extra effort to repair a relationship' },
    ],
    mainText: `---
EMAIL 1 — From: David Park (Client) to: Sofia Martins (Project Manager)
Subject: RE: Project Delta — Delivery Update
Date: 12 May

Dear Sofia,

Further to our conversation last Thursday, I am writing to express my concern regarding the status of Project Delta. We were originally informed that delivery was scheduled for 30 April. As of today, we have received no update, and the revised timeline you mentioned during our call has not been confirmed in writing.

I would be grateful if you could provide a clear explanation of the current status, the revised delivery date, and the steps being taken to prevent further delays. We have significant stakeholder commitments that depend on this timeline.

I look forward to your prompt response.

Kind regards,
David Park
Senior Manager, Procurement

---
EMAIL 2 — From: Sofia Martins to: David Park
Subject: RE: Project Delta — Delivery Update
Date: 12 May

Dear David,

Thank you for your email. I appreciate your patience and I apologise for any inconvenience caused by the delay.

I can confirm that the current delivery date is 20 May. The delay was due to an unforeseen dependency on a third-party supplier that was not identified at the planning stage — an oversight I acknowledge and take full responsibility for.

To mitigate the impact, my team is currently working extended hours to ensure that the core deliverables are prioritised. I propose scheduling a call for Wednesday 14 May at 10 a.m. to walk you through the revised plan in detail.

Should you have any questions in the meantime, please do not hesitate to contact me directly.

I look forward to speaking with you on Wednesday.

Kind regards,
Sofia Martins
Project Manager

---
EMAIL 3 — From: David Park to: Sofia Martins
Date: 14 May (after the call)

Dear Sofia,

Thank you for the call this morning. I appreciate your transparency and the detailed plan you presented.

I would like to confirm that we are in agreement on the following: delivery by 23 May at the latest, weekly status updates until completion, and a formal post-project review to address the planning gap.

Were the delivery to be further delayed beyond 23 May, we would need to escalate this to the respective heads of department.

I trust this reflects our discussion accurately. Please do not hesitate to contact me should you require any clarification.

Kind regards,
David`,
    firstReadTask: task('Read and answer: What is the main problem? How does Sofia respond? What is agreed in Email 3?'),
    evidenceQuestions: [
      task('In Email 1, how does David communicate his dissatisfaction? Is he direct or indirect?', '', 'Indirect but firm — "I am writing to express my concern", "has not been confirmed in writing". He is polite but the pressure is clear.'),
      task('What does Sofia acknowledge in Email 2, and how does she frame it?', '', 'She acknowledges the delay was "an oversight" she takes "full responsibility for" — accepting fault without being defensive.'),
      task('What formal conditional does David use in Email 3? What is its purpose?', '', '"Were the delivery to be further delayed beyond 23 May, we would need to escalate." It is a formal warning — professional but firm.'),
      task('What phrase does Sofia use to open with a polite request pattern?', '', '"I propose scheduling a call" — recommend/propose + gerund. Also: "Should you have any questions, please do not hesitate to contact me."'),
      task('What is the tone difference between Email 1 and Email 3? What changed?', '', 'Email 1 is formal and concerned. Email 3 is warmer — "I appreciate your transparency" — because Sofia responded well. Tone shifts as trust is restored.'),
    ],
    contextVocabularyTasks: [
      task('Find the phrase in Email 2 that means "to reduce the negative impact".', '', '"To mitigate the impact"'),
      task('What does "goodwill" imply in the context of professional email chains?', '', 'Effort to repair or maintain a positive relationship beyond what is strictly required.'),
    ],
    guidedSummary: task('Summarise the email chain in 4 sentences: the problem, Sofia\'s response, what was agreed, and the formal warning.'),
    connectedProduction: task('Write a short reply (Email 4 — 60-80 words) from Sofia confirming the agreement. Include: formal opening with reference, confirmation of the three agreed points, a polite formal conditional ("Should you require..."), and a formal closing.'),
  }),

  // ─── READING-005: A workplace report ─────────────────────────────────────────
  createReadingLesson({
    ...common,
    id: 'B2-READING-005',
    order: 5,
    title: 'Reading a workplace report: key findings and recommendations',
    readingPurpose: 'Read a short workplace report for structure, key findings, evidence, and formal recommendation language. Reports are a key text type in B2 professional English.',
    preReadingVocabulary: [
      { word: 'retention', definition: 'the ability to keep employees or customers' },
      { word: 'engagement', definition: 'the level of commitment and involvement of employees or customers' },
      { word: 'turnover', definition: 'the rate at which employees leave and are replaced' },
      { word: 'benchmark', definition: 'a standard point of reference against which to compare performance' },
      { word: 'implement', definition: 'put into practice' },
    ],
    mainText: `INTERNAL REPORT — Employee Engagement and Retention
Prepared by: People Operations Team | Date: May 2026 | Status: Confidential

1. Executive Summary
This report presents findings from the Q1 2026 Employee Engagement Survey (n=247, 82% response rate). It identifies three key challenges and proposes specific recommendations to address them.

2. Key Findings

2.1 Engagement scores
Overall engagement has declined by 7 percentage points compared to Q1 2025, falling below the industry benchmark of 72%. Departments most affected include Operations (58%) and Customer Services (61%).

2.2 Primary drivers of disengagement
Analysis of qualitative responses identifies three primary factors:
(a) Insufficient recognition of individual contribution (cited by 64% of respondents)
(b) Limited visibility of career progression pathways (58%)
(c) Workload distribution perceived as inequitable (47%)

2.3 Retention risk
Current data indicates that 23% of respondents are actively considering leaving the organisation within the next 12 months. Were this figure to remain unchanged, the estimated annual cost of staff turnover would exceed £1.2 million.

3. Recommendations

3.1 The People Operations Team recommends implementing a structured recognition programme, with monthly team-level and quarterly company-wide recognition activities, commencing in Q3 2026.

3.2 It is further recommended that line managers receive training in career pathway conversations, with a view to increasing the proportion of staff with documented development plans from the current 31% to a target of 75% by year-end.

3.3 A workload audit is proposed for Q2 2026. The People Operations team suggests conducting this audit at team level to ensure fairness and identify structural causes rather than individual performance issues.

4. Conclusion
The findings constitute a significant risk to organisational performance if unaddressed. That said, the proposed measures are achievable within the current budget cycle, and the evidence from comparable organisations suggests they would have a measurable positive impact within two quarters.`,
    firstReadTask: task('Read and identify: (1) What is the main problem? (2) What are the three recommendations?'),
    evidenceQuestions: [
      task('What is the financial risk identified in the report?', '', 'If 23% of staff leave, the annual cost of turnover would exceed £1.2 million.'),
      task('Find the formal conditional sentence in section 2.3 and explain its function.', '', '"Were this figure to remain unchanged..." — formal conditional (inversion, no "if") used to quantify the risk of inaction.'),
      task('What recommendation language is used in section 3?', '', '"recommends implementing", "It is further recommended that", "proposes conducting", "suggests conducting" — variety of recommendation structures.'),
      task('How does the conclusion balance the problem with a solution?', '', '"Constitute a significant risk" (problem) + "That said, the proposed measures are achievable" (solution) — classic concession + reassurance structure.'),
    ],
    guidedSummary: task('Write a 3-sentence summary of the report: main finding, key recommendation, and conclusion.'),
    connectedProduction: task('Write a brief recommendation paragraph (80-100 words) for a problem you have observed in a workplace, school, or organisation. Use: recommend, suggest, propose, it is recommended that, and at least one formal conditional.'),
  }),

  // ─── LISTENING-004: A business meeting ────────────────────────────────────────
  createListeningLesson({
    ...common,
    id: 'B2-LISTENING-004',
    order: 4,
    title: 'A business meeting: agenda, interruptions, clarification and action points',
    listeningPreparation: [
      'You will hear a team meeting with four speakers: CHAIR (Ana), MARCUS (Operations), HELEN (Finance), and DAVID (Client Relations).',
      'Meeting agenda: (1) Q2 performance review (2) Budget approval (3) Client escalations (4) Action points.',
      'Focus on: how the chair controls the flow, how participants interrupt politely, how clarification is requested.',
    ],
    keyWordsToHear: ['agenda', 'defer', 'clarify', 'consensus', 'action point', 'suggest', 'recommend', 'should you', 'I propose'],
    transcript: `ANA (Chair): Right, let\'s get started. We have four items on the agenda today. I\'d like to keep to time, so let\'s aim to wrap up by eleven. First item: Q2 performance review. Marcus, can you take us through the headline figures?

MARCUS: Thanks, Ana. Q2 revenue came in at 94% of target — so slightly below plan, but the shortfall was largely due to the APAC delays we discussed last month. The core domestic markets performed well. I\'d recommend reviewing the APAC model before we commit to Q3 targets.

HELEN: Can I just come in here? If I understand you correctly, Marcus, you are suggesting we defer the Q3 targets rather than confirm them today?

MARCUS: Not exactly — I\'m suggesting we confirm provisional targets and build in a review gate at the six-week mark. Would that work?

ANA: That sounds reasonable. Let\'s add that as an action point. Item two — budget approval. Helen, you have the figures?

HELEN: Yes. I propose approving the core capex budget as presented — £240,000. There is one item, the new CRM system, that I suggest we defer pending a clearer cost-benefit analysis. Were we to approve it now without that analysis, we risk committing to a significant spend without adequate justification.

DAVID: Could I clarify one point? Does deferring the CRM approval affect any of the client-facing deadlines we committed to?

HELEN: Good question. It shouldn\'t, as long as we implement the interim solution we discussed. Should you need the full breakdown, I can circulate the analysis after this meeting.

ANA: Do we have consensus on deferring the CRM and approving the rest? [Agreement] Good. Item three: client escalations. David?

DAVID: Yes — we have two active escalations. I would be grateful if the team could review the communications I\'ve shared before our next client call on Thursday. I recommend addressing the root cause before we escalate further, but should the client request a formal review, we need to be ready.

ANA: Understood. To summarise what we\'ve agreed: Marcus will prepare the provisional Q3 targets with a six-week review. Helen will circulate the CRM analysis. David will lead on client escalations with team input. I\'ll send the notes out by end of day. Any questions? No? Good. Let\'s adjourn.`,
    firstListenTasks: [
      task('What are the four agenda items?'),
      task('What is the key decision about the CRM system?'),
    ],
    listeningComprehension: [
      task('What does Marcus recommend about Q3 targets? What modification does he agree to?', '', 'Recommends reviewing the APAC model. Agrees to confirm provisional targets with a review gate at six weeks.'),
      task('Why does Helen suggest deferring the CRM system?', '', 'No clear cost-benefit analysis — "we risk committing to a significant spend without adequate justification."'),
      task('What formal conditional does Helen use, and what does it signal?', '', '"Were we to approve it now..." — formal conditional (inversion) to signal the risk of a hypothetical action.'),
      task('How does Ana summarise at the end? What three action points are assigned?', '', 'Marcus: Q3 targets + review gate. Helen: CRM analysis. David: client escalations with team input.'),
      task('Count and list all polite request/interruption phrases used in the meeting.', '', '"Can I just come in here?", "Could I clarify one point?", "Would that work?", "I would be grateful if..." etc.'),
    ],
    shadowing: [
      'Were we to approve it now without that analysis, we risk committing to a significant spend without adequate justification.',
      'I recommend addressing the root cause before we escalate further, but should the client request a formal review, we need to be ready.',
      'To summarise what we\'ve agreed: Marcus will prepare the provisional Q3 targets with a six-week review.',
    ],
    oralProduction: task('Record a 90-second summary of this meeting as if you were Ana sending it to a team member who missed it. Include: key decisions, who is responsible for each action point, and any pending items.'),
  }),

  // ─── SPEAKING-005: Deliver a professional opinion ─────────────────────────────
  createSpeakingLesson({
    ...common,
    id: 'B2-SPEAKING-005',
    order: 5,
    title: 'Deliver a professional opinion: feedback, proposal, recommendation',
    speakingSituation: 'You are in a professional context: a team discussion, a one-to-one with your manager, or presenting a recommendation to a group. You need to express your professional view — giving feedback, making a proposal, or defending a recommendation — with clarity, respect and conviction.',
    modelPhrases: [
      'I would like to propose that we...',
      'Based on the available evidence, I would recommend...',
      'With respect, I would challenge the assumption that...',
      'I understand the rationale, but my concern is...',
      'I suggest reconsidering this approach, particularly in light of...',
      'The evidence suggests that, arguably, the most effective option would be...',
      'Should we proceed as proposed, I would recommend adding a safeguard...',
      'I\'d like to flag a potential risk: were we to move forward without...',
      'I acknowledge the urgency, but I believe a more measured approach would...',
      'In summary, my recommendation is...',
    ],
    guidedSpeaking: [
      { prompt: 'Your manager has proposed cutting the training budget by 40% to reduce costs. Give your professional opinion — you disagree, but you need to be constructive and respectful.', structure: 'Acknowledge the pressure → challenge the assumption (with evidence/reasoning) → propose alternative → flag risk (formal conditional) → close with recommendation', minWords: 100 },
      { prompt: 'You have been asked to recommend one of two strategies for a project: (1) a fast, cheaper approach with higher risk, or (2) a slower, more expensive approach with lower risk. Present your recommendation with justification.', structure: 'State recommendation → evidence → acknowledge alternative → formal conditional for risk → conclude with conviction', minWords: 100 },
    ],
    substitutionDrills: [
      { base: 'I would recommend [reviewing] the [budget] before committing to [a final decision].', substitutions: ['reassessing / timeline / launch', 'revisiting / approach / signing', 'consulting / team / proceeding'] },
    ],
    recordingTasks: [
      { prompt: 'Record a 2-minute professional recommendation. You are proposing a change at work, school or in a project. Include: what you are recommending and why (evidence), acknowledgement of an alternative view, a formal conditional to flag a risk, and a clear closing recommendation.', duration: '2 minutes', checklist: [
        'Clear recommendation stated at the start',
        'Evidence or reasoning provided',
        'Alternative view acknowledged politely',
        'Formal conditional used (Should we / Were we to)',
        'At least one gerund recommendation (recommend/suggest + -ing)',
        'Professional tone throughout',
        'Closing statement restates recommendation',
      ]},
    ],
    speakingChecklist: [
      'Recommendation stated clearly and early.',
      'Evidence or reason provided.',
      'Alternative view acknowledged without dismissing it.',
      'Formal conditional used to signal a risk.',
      'Gerund recommendation structure used at least once.',
      'Professional, non-aggressive tone throughout.',
    ],
    freeSpeaking: [
      { topic: 'You have been asked to recommend a tool, process, or change at your workplace or university. Present your recommendation in 2 minutes, addressing potential objections.' },
      { topic: 'Give constructive feedback to a colleague about a presentation or proposal that had some strengths and some weaknesses. Be professional, specific and supportive.' },
    ],
  }),

  // ─── WRITING-004: Professional meeting notes ──────────────────────────────────
  createWritingLesson({
    ...common,
    id: 'B2-WRITING-004',
    order: 4,
    title: 'Write professional meeting notes: structure, action items, formal language',
    modelText: `MEETING NOTES
Project: Project Delta
Date: 14 May 2026 | Time: 10:00–10:45
Attendees: Sofia Martins (Project Manager), David Park (Senior Manager, Procurement)
Purpose: To discuss revised delivery timeline and mitigating actions.

Discussion summary:
The meeting was convened to address concerns raised in David\'s email of 12 May regarding the delay to Project Delta. Sofia acknowledged that the original deadline of 30 April had not been met and attributed this to an unforeseen third-party dependency. The delay was described as a planning oversight.

Key decisions:
1. The revised delivery date has been confirmed as 23 May 2026.
2. Weekly status updates will be provided to the client until project completion.
3. A formal post-project review has been agreed to identify and address the planning gap.

Action points:
| Action | Owner | Deadline |
| Confirm revised delivery in writing | Sofia Martins | 15 May |
| Schedule weekly update calls | Sofia Martins | 16 May |
| Prepare post-project review agenda | Both parties | 24 May |

Escalation note:
Were the delivery to be delayed beyond 23 May, the matter will be escalated to the respective heads of department.

Next steps: Follow-up call scheduled for 21 May at 10 a.m.`,
    modelTextBreakdown: [
      { label: 'Header block', quote: 'MEETING NOTES / Project / Date / Attendees / Purpose', note: 'Standard header gives context immediately — reader knows what this is and when.' },
      { label: 'Discussion summary in passive', quote: 'The meeting was convened... Sofia acknowledged... was attributed to... was described as', note: 'Passive and reporting verbs create formal, objective tone.' },
      { label: 'Key decisions numbered', quote: '1. The revised delivery date has been confirmed...', note: 'Present perfect passive for decisions — signals current status, not just past action.' },
      { label: 'Action points table', quote: 'Action | Owner | Deadline', note: 'Table format ensures clarity and accountability — every action has an owner and a deadline.' },
      { label: 'Escalation note with formal conditional', quote: 'Were the delivery to be delayed...', note: 'Formal conditional (inversion) in written notes adds professional weight without sounding threatening.' },
    ],
    writingBlocks: [
      { block: 'Header', instruction: 'Meeting name/project, date, attendees, purpose — 5-6 lines maximum.' },
      { block: 'Discussion summary', instruction: 'What was discussed? Use passive voice and reporting verbs. 3-5 sentences.' },
      { block: 'Key decisions', instruction: 'Numbered list. Use present perfect passive ("has been agreed", "has been confirmed").' },
      { block: 'Action points', instruction: 'Table or list: Action | Owner | Deadline. Every action must have a named owner and specific date.' },
      { block: 'Escalation / next steps', instruction: 'What happens if X? Use formal conditional. When is the next touchpoint?' },
    ],
    grammarForWriting: [
      'Passive voice for objectivity: "was convened", "has been confirmed", "has been agreed".',
      'Reporting verbs: acknowledged, attributed to, described as, confirmed.',
      'Formal conditional for escalation: "Were X to Y, the matter will be...".',
      'Present perfect passive for status: "has been decided", "has been approved".',
    ],
    revisionChecklist: [
      'Header block is complete (project, date, attendees, purpose).',
      'Discussion summary uses passive voice and reporting verbs.',
      'All key decisions numbered and in present perfect passive.',
      'Every action point has a named owner and deadline.',
      'At least one formal conditional in the escalation note.',
      'No informal vocabulary or contracted forms.',
      'Length: 150-200 words (excluding table).',
    ],
    finalVersionTask: task('Write professional meeting notes (150-200 words, plus action point table) for the following scenario:', 'Scenario: A team of 4 met to discuss a product launch delay. Key points: (1) launch date moved from June 1 to June 20 due to supplier issue; (2) marketing campaign to be paused until June 15; (3) weekly updates to be sent to the CEO. Escalation: if launch is not ready by June 20, board will be notified.'),
  }),

  // ─── WRITING-005: Write a formal email ────────────────────────────────────────
  createWritingLesson({
    ...common,
    id: 'B2-WRITING-005',
    order: 5,
    title: 'Write a formal email: request, complaint, and proposal',
    modelText: `Dear Ms Carvalho,

Further to our conversation on 10 May, I am writing to formally propose extending the current service contract for an additional twelve months, commencing 1 July 2026.

As you will be aware, our organisations have been working together successfully for three years. I believe there is a strong case for continuing this partnership, particularly given the positive outcomes delivered during the most recent contract period.

I would be grateful if you could review the attached proposal and let me know whether you would be available for a brief call to discuss the terms in the week commencing 20 May. Should you have any questions or wish to discuss any aspect of the proposal in advance, please do not hesitate to contact me directly.

I look forward to hearing from you.

Yours sincerely,
Lucas Andrade
Head of Partnerships`,
    modelTextBreakdown: [
      { label: 'Formal opening with reference', quote: 'Further to our conversation on [date], I am writing to...', note: 'Standard formal opener — references the context and states the purpose immediately.' },
      { label: 'Context + rationale', quote: 'As you will be aware... I believe there is a strong case...', note: '"As you will be aware" (shared knowledge). "I believe there is a strong case" (qualified assertion, not overconfident).' },
      { label: 'Polite request with formal conditional', quote: 'I would be grateful if... Should you have any questions...', note: '"I would be grateful if you could" — formal request. "Should you have" — formal conditional.' },
      { label: 'Formal closing + sign-off', quote: 'I look forward to hearing from you. / Yours sincerely,', note: '"I look forward to" — standard formal anticipation. "Yours sincerely" — correct because the recipient is named.' },
    ],
    writingBlocks: [
      { block: 'Opening', instruction: 'Reference the conversation or context: "Further to...", "With reference to...", "I am writing to..."' },
      { block: 'Background / rationale', instruction: 'Provide brief context. Use: "As you will be aware / be familiar with..." and qualified assertions.' },
      { block: 'Request / proposal / complaint', instruction: 'State the core message clearly. Use: "I would be grateful if", "I propose", "I would like to draw your attention to..."' },
      { block: 'Next steps', instruction: 'What action do you want? When? Use polite request: "Would it be possible to...?" or "Should you..."' },
      { block: 'Formal closing', instruction: '"I look forward to [hearing from you / your response]." Then: "Yours sincerely" (named recipient) or "Yours faithfully" (Dear Sir/Madam).' },
    ],
    grammarForWriting: [
      'Formal opening: "Further to... / I am writing to..."',
      'Request: "I would be grateful if you could...", "Would it be possible to...?"',
      'Formal conditional: "Should you have any questions, please do not hesitate to..."',
      'Closing: "I look forward to + -ing"',
      'Sign-off: "Yours sincerely" (name known) / "Yours faithfully" (Dear Sir/Madam)',
    ],
    usefulSentences: [
      'I am writing to [formally request / draw your attention to / propose]...',
      'I would be grateful if you could [confirm / review / let me know]...',
      'Should you require any further information, please do not hesitate to contact me.',
      'I look forward to hearing from you at your earliest convenience.',
      'Please find attached [the proposal / the invoice / the relevant documentation].',
    ],
    revisionChecklist: [
      'Formal opening with reference to previous contact or context.',
      'Purpose stated in the first paragraph.',
      'Rationale provided with at least one qualified statement.',
      'Polite request used ("I would be grateful if / Would it be possible to").',
      'Formal conditional used ("Should you require / Should you wish").',
      'Formal closing ("I look forward to") + correct sign-off.',
      'No contracted forms. No informal vocabulary.',
      'Length: 120-160 words.',
    ],
    finalVersionTask: task('Write a formal email (120-160 words) for ONE of the following situations:', 'Options: (1) Write to a supplier requesting an extension to a payment deadline. (2) Write to a conference organiser proposing a speaking slot on your area of expertise. (3) Write to a client apologising for a service issue and proposing how it will be rectified. Use all five writing blocks.'),
  }),

]);

export const B2_DEEP_PROFESSIONAL_PART2_BY_PILLAR = Object.freeze({
  reading: B2_DEEP_PROFESSIONAL_PART2.filter(l => l.pillar === 'reading'),
  listening: B2_DEEP_PROFESSIONAL_PART2.filter(l => l.pillar === 'listening'),
  speaking: B2_DEEP_PROFESSIONAL_PART2.filter(l => l.pillar === 'speaking'),
  writing: B2_DEEP_PROFESSIONAL_PART2.filter(l => l.pillar === 'writing'),
});
