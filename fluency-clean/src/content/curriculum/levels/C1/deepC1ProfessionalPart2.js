import { createReadingLesson, createListeningLesson, createWritingLesson } from '../../../schemas/index.js';

const level = 'C1';
const status = 'ready';
const common = { level, status, estimatedMinutes: 70, tags: ['c1-5', 'professional', 'business-english', 'academic', 'deep-approved-target'] };

function task(instruction, note = '', expected = '') { return { instruction, note, expected }; }

export const C1_DEEP_PROFESSIONAL_PART2 = Object.freeze([

  // ─── READING-005: The Language of Risk ───────────────────────────────────────
  createReadingLesson({
    ...common,
    id: 'C1-READING-005',
    order: 5,
    title: 'Reading: "The Language of Risk" — professional discourse, hedging, and liability in business communication',
    objectives: [
      'Read a complex professional/analytical text on communication and risk at C1 level.',
      'Identify how professional writers use conditional, passive, and hedging structures to manage liability and tone.',
      'Answer inference, vocabulary-in-context, and text-organisation questions at C1 level.',
    ],
    teacherOpening: 'This passage is written in the register of a professional communication guide aimed at senior executives. It analyses the linguistic features of high-stakes professional communication. Read it both for its content and for the way it itself deploys the features it describes.',
    passage: `The Language of Risk: How Professional Writers Manage Liability Through Linguistics

Every sentence written in a professional context carries a degree of legal and reputational risk. The question for the professional writer is not whether that risk exists but how it can be managed — through the strategic deployment of hedging devices, passive constructions, conditional structures, and carefully calibrated assertions. Understanding this dimension of professional communication is not merely a matter of style; it is a matter of institutional risk management.

Consider the difference between two formulations of the same conclusion: "The product is defective" and "Our preliminary investigation suggests that certain components may not meet the tolerances specified in the original product brief." The first is direct, clear, and actionable — it is also a potential admission of liability. The second is hedged ("preliminary investigation"), qualified ("certain components"), conditionalised ("may not meet"), and bounded ("specified in the original product brief"). It conveys the same essential information to a professional reader while maintaining the institutional protections that the first formulation would have surrendered.

This is not dishonesty. The hedged formulation is, in a certain sense, more accurate: it acknowledges the limits of the investigation, the partial nature of the finding, and the need for further verification. The unhedged formulation presents as settled something that may not be settled. The professional writer who understands this is not being evasive; they are being epistemically responsible.

Passive constructions perform a similar function. "Errors were made" is not merely a famous political evasion; it is a standard professional tool for acknowledging an outcome without assigning liability. The passive here is not dishonest — it simply declines to specify the agent, which may be genuinely unknown, genuinely shared, or simply not relevant to the communicative purpose at hand. The institutional passive ("it has been noted that," "it is our understanding that," "it has been brought to our attention") has the additional function of presenting the communication as the product of an institutional process rather than an individual judgment, which distributes responsibility and signals that the claim has been through an internal review.

The professional writer must also manage the tension between clarity and caution. Excessive hedging — the compounding of qualifiers — produces the epistemic evasion discussed earlier: a communication that fails to communicate because it has been drained of all content in the attempt to drain it of all risk. The best professional writing threads this needle: it is precise enough to be useful and hedged enough to be responsible.`,
    wordCount: 360,
    tasks: [
      task(
        'The author distinguishes between "The product is defective" and the hedged formulation. The author says the hedged version is "not dishonesty." What argument does the author give for this claim?',
        'Re-read paragraph 3. The author argues that the hedged version is actually more accurate. On what grounds?',
        'The author argues that the hedged formulation is more accurate because it acknowledges genuine epistemic limitations: the investigation is preliminary, the finding covers "certain components" not the whole product, and the claim is that requirements "may not be met" rather than asserting a definitive defect. The unhedged formulation presents as settled a conclusion that has not yet been fully verified. The hedge is therefore not evasion but accuracy — and, by extension, epistemic responsibility. Whether the author\'s argument is persuasive depends on whether one accepts that the qualified formulation genuinely reflects the epistemic situation or is being deployed strategically to reduce liability while appearing accurate.'
      ),
      task(
        'What two functions does the author identify for the "institutional passive" in paragraph 4?',
        'Re-read paragraph 4. Find the sentence that describes the "institutional passive" and lists its functions.',
        'The institutional passive ("it has been noted that," "it is our understanding that") serves two functions: (1) it presents the communication as the product of an institutional process rather than an individual judgment, which distributes responsibility; and (2) it signals that the claim has been through an internal review, implying a degree of institutional validation. Both functions serve to reduce individual exposure and increase the perceived authority of the communication.'
      ),
      task(
        'The author says professional writers must manage "the tension between clarity and caution." What does this mean, and what is the author\'s proposed resolution of this tension?',
        'Re-read the final paragraph. What is "epistemic evasion" and how does it relate to the tension the author identifies?',
        'The tension is between communicating clearly enough to be useful and hedging enough to be responsible. "Epistemic evasion" is what happens when the balance tips too far toward caution: a communication that has been hedged so extensively that it no longer communicates anything meaningful. The author\'s proposed resolution is that the best professional writing is "precise enough to be useful and hedged enough to be responsible" — a two-sided standard that requires calibration rather than the application of a single rule. The author does not specify how to find this balance; it is presented as a matter of professional judgment.'
      ),
      task(
        'Vocabulary in context: (a) what does "tolerances" mean in the phrase "may not meet the tolerances specified in the original product brief"? (b) what does "calibrated" mean in "carefully calibrated assertions"?',
        '"Tolerances" is a technical term from manufacturing; "calibrated" is used in a broader sense.',
        '(a) "Tolerances" in manufacturing and engineering refers to the acceptable range of variation in a specified measurement — the upper and lower limits within which a component must fall to be considered within specification. Here it refers to the technical specifications for the product. (b) "Calibrated" means adjusted or set with precision to produce a specific effect — here, assertions that have been carefully adjusted to convey the right degree of certainty and commitment, neither overclaiming nor underclaiming. The word implies deliberateness: the calibration is intentional, not accidental.'
      ),
      task(
        'The author mentions "Errors were made" as "a famous political evasion." What is the author\'s position on this phrase — is it evasive, or not? How does this fit with the broader argument?',
        'The author says it "is not merely a famous political evasion" and then adds that it "is simply" a professional tool. What is the author actually arguing?',
        'The author\'s position is nuanced: "Errors were made" is presented as functioning in professional contexts as a legitimate tool (declining to specify the agent when the agent is unknown, shared, or irrelevant) rather than as inherently evasive. "Not merely" implies that the phrase has more dimensions than its political use suggests. However, the author does not deny that it can be evasive — the passive may decline to specify the agent strategically, not because the agent is genuinely unknown. The author\'s broader argument (that hedging is not inherently dishonest) extends to the passive: the evaluation depends on whether the agent really is unknown/irrelevant or is being deliberately concealed.'
      ),
    ],
  }),

  // ─── LISTENING-005: Executive coaching conversation ───────────────────────────
  createListeningLesson({
    ...common,
    id: 'C1-LISTENING-005',
    order: 105,
    title: 'Listening: "The Difficult Conversation" — executive coaching on high-stakes professional communication',
    objectives: [
      'Follow a professional coaching conversation on communication strategy at C1 level.',
      'Identify specific communication strategies and the reasoning behind them.',
      'Analyse the advice given and evaluate its applicability.',
      'Answer inference, summary, and critical evaluation questions at C1 level.',
    ],
    teacherOpening: 'This is an executive coaching conversation. Coach (Maya) is advising a senior manager (Kenji) on how to handle a difficult meeting in which he must communicate negative news to a key client. Listen for the specific communication strategies Maya recommends and the principles behind them.',
    transcript: [
      { speaker: 'Maya', text: 'So Kenji, let\'s think about this meeting. You\'ve got to tell the client that the project is running three weeks behind schedule, and that the original cost estimate needs to be revised upward by about fifteen percent. Both are sensitive. How are you planning to approach it?' },
      { speaker: 'Kenji', text: 'My instinct is to get the bad news out early — be direct about the delay and the cost, take responsibility, and then move quickly to what we\'re doing about it. I don\'t want to bury the lead or make them feel like I\'m not being straight with them.' },
      { speaker: 'Maya', text: 'I think that\'s largely right. But let me complicate it slightly. "Get the bad news out early" can mean two different things: it can mean being honest and clear about the situation, or it can mean leading with numbers and percentages before the client has any context for them. What\'s the risk with the second approach?' },
      { speaker: 'Kenji', text: 'The risk is they hear "fifteen percent more" before they understand why, and the meeting becomes a price negotiation rather than a problem-solving conversation.' },
      { speaker: 'Maya', text: 'Exactly. So the sequence matters as much as the content. I\'d suggest opening with the situation as you understand it — the complexity that emerged, the decision points you faced — before you give them the figures. Not to delay the bad news, but to provide the frame that makes it comprehensible. Transparency is not just about what you say; it\'s about the order in which you say it.' },
      { speaker: 'Kenji', text: 'That makes sense. What about taking responsibility? I want to be accountable, but I don\'t want to sound like I\'m falling on my sword in a way that destroys confidence in the project.' },
      { speaker: 'Maya', text: 'This is a crucial distinction. There\'s a difference between acknowledging that the situation has arisen on your watch — which is professionally honest — and accepting blame in a way that suggests it was avoidable and was your fault. The first is accountability; the second is capitulation. I\'d recommend framing it as: here is the situation; here is our understanding of what drove it; here is what we have put in place to manage it from this point forward. The tone is ownership without self-flagellation.' },
      { speaker: 'Kenji', text: 'And on the cost revision — any specific language you\'d recommend?' },
      { speaker: 'Maya', text: 'A few principles. Don\'t use the passive to distance yourself from the revision: "it has been determined that costs need to be revised" sounds evasive. Own it directly: "we need to revise the cost estimate." But you can use conditionals and scope-limiting language to give it the right shape: "the revised estimate assumes X conditions remaining stable; if those conditions change in either direction, we\'ll update you immediately." That shows control and transparency simultaneously.' },
      { speaker: 'Kenji', text: 'What if they push back hard? I anticipate they\'re going to challenge the fifteen percent figure.' },
      { speaker: 'Maya', text: 'Then your preparation is the key. You need to be able to walk them through the cost breakdown line by line if required — not defensively, but as evidence of rigour. The pushback usually comes from a feeling that the number has appeared without sufficient justification. If you can demonstrate that the revision is well-founded and precisely calculated, the conversation shifts from challenge to understanding. That\'s where you want to be.' },
      { speaker: 'Kenji', text: 'And if they want to renegotiate the overall scope to bring the cost down?' },
      { speaker: 'Maya', text: 'Then you\'re in a different conversation — a commercial negotiation — and the rules change. There, you\'d want to be clear about what is and isn\'t within your discretion to agree. Commit to nothing in the room that requires internal approval; you can say "I\'d want to take that back to the team before we make any commitment" without this being a refusal. Manage the pace. Let them feel heard, but don\'t let the pace of the meeting overtake your ability to assess what you\'re agreeing to.' },
    ],
    tasks: [
      task(
        'Maya makes a distinction between two interpretations of "get the bad news out early." What are the two interpretations, and why does she say the second one is risky?',
        'Listen to turns 3–5. What is the difference between honest transparency and leading with numbers?',
        'The two interpretations are: (1) being honest and clear about the situation, and (2) leading with the numbers (the delay/cost figures) before the client has context for them. The risk with the second is that the client hears the figures before they understand the circumstances that produced them, causing the meeting to become a price negotiation rather than a problem-solving conversation. Maya argues that transparency is not just about what you say but the order in which you say it — the frame must come before the figures.'
      ),
      task(
        'What distinction does Maya draw in turn 7 between "accountability" and "capitulation"? How does she recommend Kenji frame the situation?',
        'Listen carefully to turn 7. What is the difference between "acknowledging the situation arose on your watch" and "accepting blame"?',
        'Accountability means acknowledging that the situation has arisen under your responsibility — which is professionally honest and maintains credibility. Capitulation means accepting blame in a way that implies the situation was avoidable and was your fault — which destroys confidence in the project without serving any constructive purpose. Maya recommends framing it as: here is the situation, here is what drove it, here is what we have put in place to manage it. "Ownership without self-flagellation" — responsible but forward-looking.'
      ),
      task(
        'Maya\'s advice on language for the cost revision (turn 9) involves a specific contrast between two types of construction. What are they, and why does she recommend one over the other?',
        'She contrasts using the passive to distance yourself from the revision with owning it directly. What specific language does she recommend for each?',
        'Maya recommends against: the institutional passive ("it has been determined that costs need to be revised"), which she says sounds evasive because it distances the speaker from the decision. She recommends: direct ownership ("we need to revise the cost estimate") combined with scope-limiting conditionals ("the revised estimate assumes X conditions remaining stable; if those conditions change, we\'ll update you immediately"). The direct ownership shows accountability; the conditional framing shows precision and control. Together they demonstrate that the revision is the result of rigorous analysis, not a miscalculation.'
      ),
      task(
        'What advice does Maya give for handling a scope renegotiation at the end (turn 12)? What is the key principle she identifies for managing the pace of the negotiation?',
        'Listen to the final turn. What does "manage the pace" mean in practical terms?',
        'Maya\'s advice: (1) be clear about what is and isn\'t within your discretion to commit to without internal approval; (2) use the phrase "I\'d want to take that back to the team" as a legitimate way of declining to commit in the moment without framing it as a refusal; (3) let the client feel heard; (4) don\'t let the pace of the meeting overtake your ability to assess what you\'re agreeing to. The key principle is pace management: slowing down the meeting to ensure that any commitments made are ones you have the authority and knowledge to make.'
      ),
    ],
  }),

  // ─── WRITING-009: Formal professional report section ────────────────────────
  createWritingLesson({
    ...common,
    id: 'C1-WRITING-009',
    order: 9,
    title: 'Writing: The professional report section — analysis, findings, and recommendations',
    objectives: [
      'Write a professional report section (250–300 words) covering analysis, findings, and recommendations.',
      'Use appropriate formal register and hedging throughout.',
      'Present findings with precisely attributed evidence.',
      'Frame recommendations with appropriate conditional and modal structures.',
    ],
    teacherOpening: 'A professional report section has a specific structure: it states what was investigated, presents what was found (with appropriate hedging and attribution), and makes specific recommendations (with appropriate conditionality). At C1, the register must be consistently formal without being bureaucratically opaque, and the recommendations must be specific and actionable rather than vague calls to "improve" or "consider."',
    inputText: `Professional report section structure:

FINDING/CONTEXT (2–3 sentences): What was the situation under review? What prompted the investigation or analysis? Frame this in formal, impersonal register.

ANALYSIS (3–4 sentences): What did the investigation find? Use appropriately hedged and attributed language. Distinguish between established findings and tentative inferences. Use the passive and institutional constructions where appropriate.

IMPLICATIONS (1–2 sentences): What do the findings suggest about the underlying situation? This is where you connect the specific findings to the broader question.

RECOMMENDATIONS (2–3 sentences): What specific actions are recommended? Use modal structures (would recommend / should be / it would be advisable to) and conditional framing where appropriate. Be specific: name the action, the responsible party, and the timeframe.

Example of a weak report section:
"We looked at the customer service department. It was not very good. There were many complaints. We recommend improvements."

Example of a strong C1 report section:
"This section addresses the findings of the internal review of the customer service function, initiated following a 23% increase in formal complaints over the preceding twelve months. The review identified three principal drivers of the increase: inadequate staffing levels during peak demand periods, the absence of a structured escalation pathway for complex complaints, and a skills gap in relation to communication under pressure. Taken together, these findings suggest that the increase in complaints reflects systemic rather than individual failures — a distinction that has implications for the nature of the remediation required. It would be premature to attribute the deterioration to any single cause; the evidence supports a multi-dimensional response. The review recommends that the following actions be prioritised: first, a staffing review to establish the adequacy of current levels against demand projections; second, the development and implementation of a formal escalation protocol within the next six weeks; and third, the commissioning of a communication skills training programme for all customer-facing staff."`,
    writingTask: 'Write a professional report section (250–300 words) on ONE of the following scenarios: (a) A review of a company\'s digital communication tools has found that staff are using multiple incompatible platforms, causing information loss. (b) An analysis of a project\'s cost overrun has identified three contributing factors. (c) A review of a university department\'s research output has found that publication rates have declined over three years. Use the four-part structure and include: at least one hedged finding, at least one conditional recommendation, and consistently formal register throughout.',
    wordTarget: 275,
    tasks: [
      task(
        'Write the finding/context sentences. Introduce the situation under review in formal register. Include the reason for the review and its scope.',
        'Avoid starting with "I" or "We looked at." Use impersonal structures ("this section reports on / this review was initiated following / the analysis below addresses").',
        'Example (scenario a): "This section reports on the findings of the internal audit of the organisation\'s digital communication infrastructure, conducted following repeated reports from team leads of information loss and coordination failures attributable to platform fragmentation."'
      ),
      task(
        'Write the analysis sentences. Present your findings using hedged, attributed, formally registered language. Distinguish between what was established and what was inferred.',
        'Use: "the review identified / it was found that / the evidence suggests / it would appear that / preliminary findings indicate." Avoid: "we found out / it is obvious that / clearly."',
        'Check: are your findings specific (named platforms, specific failure modes)? Are the more tentative inferences appropriately hedged? Is the passive used where appropriate to maintain formal register?'
      ),
      task(
        'Write the implications sentence(s). What do the findings suggest about the underlying problem? The implications should connect the specific findings to the broader question that the review was addressing.',
        'The implication is not a repetition of the finding — it is a claim about what the finding means for the organisation\'s situation.',
        'Example: "These findings suggest that the fragmentation reflects the absence of a coherent digital communication policy rather than any technical incompatibility between the platforms themselves — a distinction that has significant implications for the nature of the remediation required."'
      ),
      task(
        'Write the recommendations. Each recommendation should name a specific action, a responsible party where possible, and a timeframe. Use appropriate modal and conditional structures.',
        'Avoid vague recommendations ("improve communication"). Use specific actions ("commission a review / implement a policy / require all teams to adopt a single platform by [date]").',
        'Example: "The review recommends that the following actions be implemented: first, the designation of a single primary platform for all internal communication within thirty working days, with legacy platforms phased out over a subsequent ninety-day period; second, the appointment of a Digital Communication Lead to oversee the transition and manage adherence to the new policy; and third, a review of current data retention and archiving arrangements to ensure that information lost during the transition period can be recovered."'
      ),
    ],
  }),

  // ─── WRITING-010: Professional email — complex scenario ──────────────────────
  createWritingLesson({
    ...common,
    id: 'C1-WRITING-010',
    order: 10,
    title: 'Writing: The complex professional email — delivering difficult news, managing expectations, maintaining relationships',
    objectives: [
      'Write a complex professional email (200–250 words) that delivers difficult news with appropriate register and tone.',
      'Use formal conditional and hedging structures to soften content without obscuring it.',
      'Manage the relationship dimension of professional communication alongside the informational dimension.',
      'Demonstrate consistent C1 professional register throughout.',
    ],
    teacherOpening: 'A professional email that delivers bad news has to achieve two things simultaneously: it must be clear about the facts (the news must not be buried or obscured) and it must maintain the relationship (the recipient must not feel accused, disrespected, or blindsided). At C1, the grammar and vocabulary choices that produce this balance are not automatic — they require deliberate design.',
    inputText: `C1 professional email structure for difficult news:

OPENING: Acknowledge the relationship/context before the news. Do not open with the bad news itself; open with a brief acknowledgment of the situation or relationship that frames what follows.

NEWS: State the difficult information clearly but in hedged, appropriately formal register. Use passive, conditional, and scope-limiting language to reduce directness without obscuring the content.

EXPLANATION/CONTEXT: Provide the reason for the news in a way that is factual, not defensive. Do not over-explain; do not apportion blame. Use the passive and institutional constructions.

FORWARD PLAN: Propose a specific next step or action. This moves the communication from problem-statement to problem-solving and signals professional responsibility.

CLOSE: Close in a way that maintains the relationship — acknowledge the inconvenience, confirm your availability, and signal your commitment.

Example of a weak professional email:
"Hi, the project is delayed by three weeks. Also it will cost 15% more. Sorry. Let me know if you have questions."

Example of a strong C1 professional email:
"Dear [Name], I am writing to update you on the current status of the [project] and to draw your attention to two developments that require your consideration. Following a detailed review of the project timeline conducted last week, it has become clear that the completion date will need to be revised by approximately three weeks. The delay is attributable primarily to unforeseen complexity in the third-party integration work, which required a more extensive period of technical resolution than had been anticipated at the design stage. In addition, the revised timeline has necessitated a corresponding adjustment to the cost estimate, which will increase by approximately 15% relative to the original projection. We deeply regret the inconvenience these revisions may cause. A detailed breakdown of both the revised timeline and the cost adjustment has been attached to this message for your review. I would welcome the opportunity to discuss these developments at your earliest convenience, and am available for a call at any time this week. Please do not hesitate to contact me directly if you have any questions or concerns in the meantime."`,
    writingTask: 'Write a complex professional email (200–250 words) for ONE of the following scenarios: (a) You must inform a client that a key member of their account team is leaving and that their account will be reassigned. (b) You must inform a grant-funding body that a research milestone has been missed and request a three-month extension. (c) You must inform a job applicant who performed well in the interview that they have not been selected, while leaving the relationship intact for future opportunities. Follow the four-part structure and use at least one formal conditional, one hedged statement of the difficult news, and one forward-looking proposal.',
    wordTarget: 225,
    tasks: [
      task(
        'Write the opening. Do not open with the bad news. Open with a brief acknowledgment that establishes the context and signals respect for the relationship.',
        'Consider: what is the context of this relationship? What acknowledgment is appropriate before the news? (receipt of application / continuation of a professional partnership / acknowledgment of the grant agreement)',
        'Example (scenario a): "Dear [Client Name], I am writing to inform you of a change to the composition of your account team, and to assure you of our continuing commitment to the quality of service you have come to expect from us."'
      ),
      task(
        'Write the news sentences. The difficult information must be clear — do not bury it — but use appropriate hedging and formal register. Use the passive or a formal conditional to reduce directness without obscuring the content.',
        'Test: can a professional reader immediately understand what the difficult news is? And: does the register avoid sounding either brutal or evasive?',
        'Example: "Following an internal restructuring of our account management function, [Name], who has been your primary point of contact for the past two years, will be transitioning to a new role within the organisation at the end of this month. We recognise that changes of this kind can be unsettling, and we want to ensure that the transition is managed in a way that minimises any disruption to your experience."'
      ),
      task(
        'Write the explanation/context. Provide the reason briefly and factually. Avoid blame, over-explanation, or defensive tone.',
        'The explanation should answer "why is this happening" without inviting the recipient to question whether it had to happen. Keep it brief: 1–2 sentences.',
        'Example: "The restructuring reflects an organisational decision to align account teams more closely with sector specialism, and [Name]\'s skills will be applied within [relevant sector] going forward."'
      ),
      task(
        'Write the forward plan and close. Propose a specific next step, acknowledge the inconvenience, confirm your availability.',
        'The forward plan should be concrete: who will contact whom, when, for what purpose. The close should signal warmth and accessibility without being informal.',
        'Example: "Your account will be taken over by [New Name], who will be in contact within the next two working days to introduce themselves and to ensure a smooth handover of all relevant context. I would also very much welcome the opportunity to speak with you directly about this transition at your convenience. Please do not hesitate to contact me if you have any questions or concerns, and please be assured of our continued commitment to your account."'
      ),
    ],
  }),

]);

export const C1_DEEP_PROFESSIONAL_PART2_BY_PILLAR = Object.freeze({
  grammar: Object.freeze([]),
  vocabulary: Object.freeze([]),
  reading: Object.freeze(C1_DEEP_PROFESSIONAL_PART2.filter(l => l.pillar === 'reading')),
  listening: Object.freeze(C1_DEEP_PROFESSIONAL_PART2.filter(l => l.pillar === 'listening')),
  speaking: Object.freeze([]),
  writing: Object.freeze(C1_DEEP_PROFESSIONAL_PART2.filter(l => l.pillar === 'writing')),
  checkpoint: Object.freeze([]),
});
