import { createReadingLesson, createListeningLesson, createSpeakingLesson } from '../../../schemas/index.js';

const level = 'C2';
const status = 'ready';
const common = { level, status, estimatedMinutes: 75, tags: ['c2-3', 'complex-discourse', 'mastery', 'deep-approved-target'] };

function task(instruction, note = '', expected = '') { return { instruction, note, expected }; }

export const C2_DEEP_COMPLEX_DISCOURSE_PART2 = Object.freeze([

  // ─── READING-003: Power, knowledge, and the politics of definition ────────────
  createReadingLesson({
    ...common,
    id: 'C2-READING-003',
    order: 3,
    title: 'Reading: \'Power, Knowledge, and the Politics of Definition\' — a dense sociological argument',
    objectives: [
      'Read a dense sociological argument at C2 level and identify its central claim and supporting structure.',
      'Engage with Foucauldian concepts of discourse and definitional power without reducing them to slogans.',
      'Analyse specific examples from the text to assess the argument\'s force and reach.',
      'Evaluate critically whether the argument proves too much — the risk of theoretical overextension.',
    ],
    teacherOpening: 'This passage argues that the power to define concepts — to determine what counts as a refugee, a crime, or legitimate evidence — is itself a form of political power. The argument draws on Michel Foucault\'s concept of discourse without being a piece of academic philosophy; it is an analytical essay that makes a concrete political claim. Read for the argument, not just the examples. The critical task at the end asks you to do something demanding: to push back on the argument using its own terms.',
    passage: `Power, Knowledge, and the Politics of Definition

Every political struggle involves a prior definitional struggle that rarely receives the same attention. Who counts as a refugee, and who counts merely as an economic migrant? What constitutes a crime, and what is merely rule-breaking without criminal sanction? When does evidence meet the threshold required for conviction, and what falls short? These questions appear procedural — matters of categorisation, of applying clear criteria to particular cases. They are not. The criteria themselves are contested, and control over the criteria is a form of power.

Michel Foucault's concept of discourse offers a framework for understanding this dynamic. For Foucault, a discourse is not simply a body of language on a topic; it is the system of rules that determines what can be said, what counts as true, who has the authority to speak, and what remains unspeakable. Discourses do not merely describe reality — they produce it, in the sense that what can be thought, decided, and acted upon depends on the conceptual categories that a discourse makes available. To control the dominant discourse on a topic is therefore not just to win the argument about how things should be described; it is to determine the space within which any future argument can occur.

The political stakes of definitional power are most visible at the margins. International refugee law provides a stark example. The 1951 Refugee Convention defines a refugee as a person who fears persecution on grounds of race, religion, nationality, political opinion, or membership of a particular social group. This definition, drafted in the aftermath of European displacement following the Second World War, was designed primarily with political dissidents in mind. It does not cover those fleeing generalised violence, state failure, or climate-induced displacement — conditions that characterise the majority of forced population movements today. The definition is not merely outdated; it is actively political: it determines who receives legal protection and who can be legally — if not morally — turned away at the border. States that wish to limit the scope of their humanitarian obligations do not need to repeal the Convention; they need only insist on a narrow interpretation of its definitions.

The same logic operates in criminal law, in the philosophy of science, and in the governance of public health. What counts as evidence sufficient to convict differs across legal systems and has changed historically — in ways that track social power as much as epistemological progress. What counts as scientific consensus, and therefore as a legitimate basis for policy, is partly a product of institutional processes (peer review, expert panels, regulatory agencies) that are themselves subjects of political contestation. To dismiss a finding as insufficiently established is to invoke a standard; to set that standard is to exercise power.

Foucault's insight — that knowledge is never simply the discovery of pre-existing facts but is always also the product of social practices that determine what counts as a fact — does not require us to adopt a wholesale relativism about truth. It requires only the more modest and more defensible claim: that the processes by which statements acquire the status of knowledge are also processes through which power operates, and that this does not leave those processes — or the knowledge they produce — politically innocent.`,
    wordCount: 380,
    tasks: [
      task(
        'What is the central claim of the passage? State it in one sentence, then explain how the three examples (refugee law, criminal law, scientific consensus) each contribute to establishing it.',
        'Re-read paragraph 1 and then the full passage. The central claim is not merely that definitional struggles exist — it is a stronger claim about what kind of power is at stake. Each example should illustrate a distinct dimension of the argument.',
        'Central claim: The power to determine the definitions, criteria, and standards by which cases are classified is a fundamental form of political power, because it determines who receives protection, who is held accountable, and what counts as legitimate knowledge — prior to and independently of any dispute about the application of agreed criteria. Refugee law illustrates that a narrow or broad definition of "refugee" determines legal entitlement to protection and can be used to exclude the most vulnerable without breaching international law. Criminal law illustrates that evidentiary standards have tracked social power as much as epistemic progress — who is believed, what counts as proof, and what falls short are historically variable and politically consequential. Scientific consensus illustrates that the institutional processes determining what "counts" as established knowledge are themselves subjects of contestation, so that invoking a standard of evidence is also an exercise of power over what can be acted upon.'
      ),
      task(
        'Explain the Foucauldian concept of "discourse" as the passage applies it. What does it mean to say that discourses "produce" reality rather than merely describing it? Use an example from the text.',
        'Re-read paragraphs 2 and 3. Be careful: the passage does not claim that discourses invent reality out of nothing; the claim is more specific. What is the specific sense in which a discourse "produces" its object?',
        'Foucault\'s concept of discourse, as applied here, refers to the system of rules that determines what can be said, who has authority to say it, and what counts as true or valid — not merely the content of what is said. A discourse "produces" reality in the specific sense that the categories it makes available determine what can be thought, what decisions are possible, and what actions are legitimate. This is not a claim that physical reality is invented by language, but that the politically and socially significant categories through which human beings organise responses to reality — "refugee," "crime," "evidence" — are not given by nature but are constituted by these systems of rules. The refugee law example illustrates this: the 1951 Convention definition "produces" the category of the refugee (and, by implication, the non-refugee) in a way that has direct material and political consequences. Displacement is a physical fact; who is legally protected from it is a product of a definitional regime that is contingent and changeable.'
      ),
      task(
        'Analyse the refugee law example in detail. What specific features of the 1951 Convention definition does the author identify as politically significant? Why does the author say states do not need to repeal the Convention to limit their obligations?',
        'Re-read paragraph 3 carefully. The argument turns on the distinction between the text of the law and its interpretation — and what that distinction implies about where definitional power operates.',
        'The author identifies two politically significant features of the 1951 Refugee Convention definition. First, its historical contingency: the definition was designed with political dissidents in mind (post-WWII European displacement), not with the forms of forced migration most common today — generalised violence, state failure, climate displacement. The definition is therefore not merely descriptive of some natural category; it reflects the political concerns of a particular historical moment and the interests of the states that negotiated it. Second, and more analytically central: the definition creates a gap between what is morally required and what is legally mandated. A state can turn away someone fleeing climate-induced displacement without violating the Convention — because that person does not meet the definition of "refugee." States can therefore limit the practical scope of their humanitarian obligations not by rejecting the Convention but by insisting on a strict, narrow reading of its terms. The definitional struggle is the site of the political struggle; the text of the treaty is not its own interpreter.'
      ),
      task(
        'The passage\'s final paragraph qualifies the Foucauldian argument by distinguishing it from "wholesale relativism." What is this qualification, and does it successfully defend the argument against the objection that it proves too much? If all definition involves power, how can we distinguish between a legitimate and an illegitimate exercise of definitional power?',
        'This is a critical evaluation question — there is no single correct answer, but quality of reasoning matters. The qualification is in the final paragraph; the question of whether it is adequate requires you to identify the strongest version of the "proves too much" objection.',
        'The qualification: The passage concedes that Foucault\'s insight does not require wholesale relativism about truth. The modest, defensible claim is not that all knowledge is political fabrication, but that the processes by which statements achieve the status of knowledge are also processes through which power operates. Knowledge is not politically innocent; it does not follow that all knowledge claims are equally valid or that no distinction between truth and falsehood is possible. Evaluation of whether this is adequate: The "proves too much" objection runs as follows: if every act of definition involves power, and power is analytically suspect, then there is no vantage point from which to criticise a particular definition as illegitimate rather than merely inconvenient to the powerful. The passage does not fully resolve this. A stronger answer to the objection would need to distinguish between: (a) definitions that are arrived at through inclusive, transparent, revisable processes, with accountability to those they affect; and (b) definitions imposed by dominant interests without contestation, accountability, or revision. The passage points in this direction (the mention of "politically innocent") but does not develop a criterion of legitimacy. This is a genuine gap in the argument — students who identify it are demonstrating the kind of critical engagement the passage demands.'
      ),
    ],
  }),

  // ─── LISTENING-003: Evidence and Interpretation — research methodology seminar ──
  createListeningLesson({
    ...common,
    id: 'C2-LISTENING-003',
    order: 103,
    title: 'Listening: \'Evidence and Interpretation\' — a research methodology seminar at C2',
    objectives: [
      'Follow a complex academic seminar discussion at C2 level, tracking a developing argument across multiple speakers.',
      'Understand the philosophical problem of under-determination and its implications for scientific practice.',
      'Distinguish between what is stated explicitly and what is assumed or implied in academic speech.',
      'Evaluate arguments and identify implicit assumptions in a discussion on scientific epistemology.',
    ],
    listeningPreparation: [
      task('Before listening: consider what it would mean if the same evidence could support multiple incompatible theories. Think about whether scientists choose theories based on evidence alone or whether extra-evidential criteria — simplicity, elegance, fruitfulness — play a necessary role.', 'This philosophical problem is the starting point of the discussion; having a preliminary view sharpens your listening.'),
      task('Prediction: predict one defence of scientific realism (that our best theories describe reality) and one challenge from under-determination (that evidence alone cannot justify realist claims). Consider whether coherentism — mutual support among norms — resolves the tension.', 'Listen for how each speaker navigates between philosophical rigour and practical scientific reasoning.'),
      task('Key words to listen for: epistemological vocabulary (under-determination, empirical adequacy, parsimony, fruitfulness, realism), meta-argumentative markers (that\'s the puzzle, but that generates a regress, maybe that regress isn\'t vicious), and metaphor (Neurath\'s boat, repair the ship at sea).', 'These signals help you track how the argument develops incrementally across speakers rather than in self-contained turns.'),
    ],
    teacherOpening: 'This seminar discussion concerns the problem of under-determination — the philosophical claim that any body of evidence is, in principle, consistent with more than one theory. This has significant implications for how we understand scientific knowledge and scientific realism. The discussion is genuinely complex: the participants are working through a difficult problem in real time, and some of their moves are implicit. Listen carefully, take notes, and be prepared to reconstruct arguments that are developed incrementally across the exchange.',
    transcript: [
      { speaker: 'Prof. Chen', text: 'I want to start with what I think is one of the most underappreciated problems in the philosophy of science — under-determination. The basic claim is this: for any finite body of evidence, there will always be more than one theory that is consistent with that evidence. If that\'s right, it seems to follow that empirical evidence alone can never force us to accept one theory over its rivals. I want to know what you each make of that.' },
      { speaker: 'Amara', text: 'My first instinct is that it\'s true but trivial — of course there are infinitely many theories consistent with any dataset if you allow arbitrary auxiliary hypotheses. The interesting question is whether it has bite in practice. Most of those alternative theories are ad hoc, contrived, or extraordinarily complex. We don\'t take them seriously precisely because they violate every norm of good scientific reasoning except empirical adequacy.' },
      { speaker: 'Daniel', text: 'But that\'s the puzzle, isn\'t it? When you say a theory is "contrived" or "ad hoc," you\'re invoking standards that go beyond the evidence — parsimony, theoretical elegance, explanatory coherence. Those standards are doing a lot of work in scientific practice, but they\'re not themselves justified by the evidence. They\'re methodological preferences. And if that\'s what\'s actually doing the selection work, it\'s not obviously the evidence that\'s deciding between theories.' },
      { speaker: 'Lena', text: 'I think Daniel\'s right that extra-evidential criteria are doing real selection work, but I\'m not sure that\'s a problem. Why should we think the only legitimate basis for theory choice is the evidence? If parsimony consistently leads us to theories that are more fruitful, that generate more novel predictions, that integrate better with other well-confirmed theories — then parsimony is tracking something real about the world, even if it can\'t be directly justified from the evidence in a single case.' },
      { speaker: 'Prof. Chen', text: 'That\'s a nice move, Lena, but it generates a regress. You\'re saying we should trust parsimony because it\'s fruitful. But "fruitfulness" is itself a norm that requires justification. Why should theories that generate more novel predictions be better theories, rather than merely more productive research programmes? You\'re adding a second meta-norm to justify the first.' },
      { speaker: 'Amara', text: 'Maybe that regress isn\'t vicious, though. We accept that all justification has to bottom out somewhere — you can\'t justify every norm by appeal to a higher norm indefinitely. What matters is whether the ensemble of norms we use in scientific practice is coherent and self-supporting: parsimony, fruitfulness, inter-theoretical coherence, and empirical adequacy together form a web in which each norm supports the others. None of them can be justified by the evidence alone, but together they constitute what Neurath\'s boat metaphor is about — we repair the ship at sea, plank by plank, without ever being in dry dock.' },
      { speaker: 'Daniel', text: 'But then here\'s the realism question. If our theory choice is partly governed by extra-evidential norms that we can\'t justify from the evidence, what grounds do we have for thinking the theories we arrive at are true, or approximately true, descriptions of reality? The under-determination problem seems to undermine the scientific realist\'s central claim — that successful science gives us genuine knowledge of unobservable entities, not just an empirically adequate map.' },
      { speaker: 'Lena', text: 'The realist can respond with the no-miracles argument: the best explanation of science\'s predictive success — and it is extraordinary — is that our theories are at least approximately true. If the world were fundamentally different from how our theories describe it, we wouldn\'t expect them to be as successful as they are. The under-determination problem shows that empirical evidence underdetermines theory choice; it doesn\'t show that our theories are likely to be wrong.' },
      { speaker: 'Prof. Chen', text: 'So we might summarise the dialectic like this. Under-determination is a real philosophical problem — it shows that evidence alone doesn\'t determine theory choice. Scientists use extra-evidential criteria — parsimony, fruitfulness, coherence — to navigate the under-determination. Whether those criteria are truth-tracking is itself a contested question. The scientific realist says yes, pointing to the no-miracles argument; the empiricist says we needn\'t make that assumption. What the problem does not show is that science is arbitrary — the norms are intersubjective, revisable, and produce results. Whether they also track truth is a further metaphysical question.' },
    ],
    tasks: [
      task(
        'Define the problem of under-determination as introduced by Prof. Chen. What does it claim, and what does it appear to imply for the relationship between evidence and theory in science?',
        'Listen to the first turn carefully. The problem has two parts: a descriptive claim (about the relationship between evidence and theory) and an apparent implication (about what evidence can and cannot do). What is the implication, and why is it significant for scientific epistemology?',
        'The problem of under-determination: For any finite body of evidence, there will always be more than one theory consistent with that evidence. This is the descriptive claim. The apparent implication is that empirical evidence alone can never compel the acceptance of one theory over its rivals — there will always be alternatives that fit the data equally well. For scientific epistemology, this is significant because it challenges the assumption that science proceeds by choosing theories that are empirically vindicated over those that are not. If multiple incompatible theories can all be consistent with the available evidence, then empirical testing cannot be the sole arbiter of theory choice, and the relationship between evidence and scientific knowledge becomes more complex than a simple process of confirmation or falsification.'
      ),
      task(
        'What role does parsimony play in Daniel\'s argument (turn 3), and how does Lena extend and complicate this in turns 4 and beyond? Explain why parsimony is both a solution to the under-determination problem and, according to Prof. Chen, a source of further difficulty.',
        'Listen to turns 3, 4, and 5. Parsimony is introduced as a tie-breaker; then its justification becomes the problem. Track the dialectic carefully.',
        'Daniel\'s argument (turn 3): When scientists dismiss alternative theories as "contrived" or "ad hoc," they are invoking parsimony and similar extra-evidential criteria. These criteria do real selection work — they determine which of the empirically adequate theories scientists actually take seriously. But because they go beyond the evidence, they require justification beyond the evidence. This makes parsimony a pragmatic solution to under-determination (a method for choosing between equally well-evidenced theories) but also a philosophical problem (its own justification cannot come from the evidence it is supposed to adjudicate between). Lena\'s extension (turn 4): parsimony and fruitfulness are legitimate because they are consistently truth-conducive — they lead us to theories that generate novel predictions and integrate with well-confirmed theoretical systems. Prof. Chen\'s complication (turn 5): this justification generates a regress — "fruitfulness" is itself a norm that requires justification. Why should theories that generate more predictions be better? This is a meta-norm, and it too needs grounding. The regress may be infinite or may need to bottom out in a pragmatic or coherentist stopping point.'
      ),
      task(
        'Evaluate Daniel\'s claim in turn 7 that under-determination "undermines scientific realism." How does Lena respond with the no-miracles argument, and does that response address the challenge adequately?',
        'Listen to turns 7 and 8. The realism question asks whether science gives us genuine knowledge of unobservable reality (atoms, genes, quarks) or merely empirically adequate models. The no-miracles argument is a specific philosophical move — identify it and evaluate its force.',
        'Daniel\'s claim: If theory choice is partly governed by extra-evidential norms that cannot be justified from the evidence, this undermines the scientific realist\'s claim that successful science gives us genuine knowledge of unobservable reality — not just an empirically adequate map. The reasoning is: if our choice between empirically equivalent theories is governed by non-evidential preferences, we have no epistemic ground for claiming that the theory we chose is true rather than merely convenient. Lena\'s no-miracles response: The best explanation of science\'s extraordinary predictive success is that our theories are at least approximately true. If the world were fundamentally different from how our best theories describe it, we would not expect such consistent predictive success. Under-determination shows that evidence underdetermines theory choice; it does not show that our theories are likely to be false. Evaluation: The no-miracles argument is powerful but contested. The instrumentalist or empiricist can respond that predictive success is exactly what we would expect from empirically adequate theories — we do not need to posit approximate truth to explain it. Under-determination remains a problem for the realist because it shows that even the most successful theory has empirically equivalent rivals that are also, in principle, candidates for approximate truth. The no-miracles argument does not dissolve the under-determination problem; it offers a different theoretical context within which to evaluate its significance.'
      ),
      task(
        'Identify one implicit assumption in the discussion that no participant explicitly questions. Explain what the assumption is, why it is philosophically significant, and what a sceptic might say about it.',
        'This question requires you to go beyond what is explicitly said and identify something the participants take for granted. Think about what the entire discussion presupposes in order for it to be a coherent debate.',
        'One significant implicit assumption is that inter-subjective, revisable norms constitute a legitimate form of epistemic justification — that the fact that the scientific community shares and applies norms like parsimony, fruitfulness, and coherence is itself some reason to trust those norms, even if they cannot be grounded in evidence alone. Amara articulates something close to this in turn 6 (the Neurath\'s boat metaphor), but the assumption is not questioned: no one asks why inter-subjectivity should confer epistemic legitimacy. A radical sceptic might point out that a community can systematically share false or unreliable norms — the inter-subjective character of a norm does not guarantee its truth-conduciveness; it might merely reflect shared cognitive biases, cultural assumptions, or the historical contingency of what "looks simple" to a particular scientific community. [Other defensible answers include: the assumption that the no-miracles argument is not circular; the assumption that "fruitfulness" is a unified and measurable property; the assumption that scientific practice is in fact governed by these norms rather than by social or institutional pressures that merely invoke these norms rhetorically. Students should be credited for identifying any well-justified implicit assumption and explaining its significance clearly.]'
      ),
    ],
  }),

  // ─── SPEAKING-003: The graduate seminar contribution ──────────────────────────
  createSpeakingLesson({
    ...common,
    id: 'C2-SPEAKING-003',
    order: 3,
    title: 'Speaking: The graduate seminar contribution — participating in high-level academic discourse',
    objectives: [
      'Contribute substantively to a graduate-level academic discussion, building on and advancing what others have said.',
      'Develop a complex analytical point with supporting reasoning under real-time conversational pressure.',
      'Introduce a complication or objection diplomatically, maintaining collegial tone while making a genuine intellectual challenge.',
      'Close a contribution in a way that invites further dialogue rather than shutting down the discussion.',
    ],
    teacherOpening: 'The graduate seminar is a distinct genre of academic speech. It is not a lecture (you are not performing to an audience), not a debate (you are not trying to win), and not a tutorial (you are not demonstrating knowledge to a teacher). It is a collaborative intellectual inquiry in which every participant is expected to advance the discussion — not merely to agree with the previous speaker or to demonstrate that they have done the reading. At C2, this requires a specific set of linguistic and intellectual moves: how to enter a discussion already in progress, how to build on what has been said rather than starting from scratch, how to challenge without antagonising, and how to close in a way that keeps the conversation open.',
    modelPhrases: [
      'Building on what Professor Chen has just said, I\'d like to push on one aspect of the under-determination thesis.',
      'There\'s one aspect of that summary I\'d like to push on, which is whether parsimony is genuinely epistemic or merely pragmatic.',
      'That framing is helpful — I want to add one complication, which is that the success criterion itself may be theory-laden.',
      'I find that compelling as far as it goes — but I wonder whether it escapes the circularity objection.',
      'My claim is that extra-evidential criteria are not neutral arbiters but themselves require justification.',
      'So my position is, essentially, that under-determination is a genuine constraint — but the question I\'m genuinely uncertain about is whether the realist response fully addresses it.',
    ],
    pronunciationFocus: {
      title: 'Pronunciation & shadowing',
      tips: [
        'Shadow: "Building on what Professor Chen has just said, I\'d like to push on one aspect..." — stress BUILDing and PUSH. Practise the smooth collegial opening as a single breath group.',
        '"There\'s one aspect of that summary I\'d like to push on, which is..." — use rising intonation on "push on" to signal that the challenge is coming.',
        '"That framing is helpful — I want to add one complication, which is that..." — stress COMplication. Practise the diplomatic "that framing is helpful" before introducing the challenge.',
        '"Under-determination is a real philosophical problem." — stress REAL and phiLOsophical. Practise /ˌʌn.dɜː.dɪˌtɜː.mɪˈneɪ.ʃən/ with clear syllable weight.',
      ],
    },
    guidedSpeaking: [
      task(
        'Opening a contribution to build on a previous speaker. Listen to the following fragment from the C2-LISTENING-003 transcript and prepare a 60–90 second contribution that takes the discussion one step further without simply restating what has been said:\n\nFragment: "Under-determination is a real philosophical problem — it shows that evidence alone doesn\'t determine theory choice. Scientists use extra-evidential criteria — parsimony, fruitfulness, coherence — to navigate the under-determination."\n\nYour contribution should: (a) briefly acknowledge what has just been said; (b) identify one specific aspect that you want to develop, question, or extend; (c) make your own claim about that aspect with at least one supporting reason or example.',
        'Useful opening phrases: "Building on what Professor Chen has just said…" / "There\'s one aspect of that summary I\'d like to push on, which is…" / "I think the question of [X] that you\'ve raised deserves more attention, because…" / "That framing is helpful — I want to add one complication, which is that…" Avoid: "I agree with everything that was said." / "As we have learned, under-determination means…" (mere restatement) / "In my opinion, I think maybe…" (hedging that undermines your point before you\'ve made it).',
        'Evaluate: Does the contribution actually advance the discussion, or does it restate what has already been said? Is the acknowledgement of the previous speaker brief and genuine, or formulaic? Is the claim specific enough to be engaged with — or is it so general that no one can disagree with it? Is there at least one piece of reasoning or evidence, or is the contribution purely assertoric?'
      ),
      task(
        'Developing a complex point with evidence under time pressure. You have been asked to explain, in 90 seconds, why parsimony matters as a tie-breaker between equally evidenced theories — and why it is not arbitrary. Structure your contribution as: (1) a clear statement of the claim; (2) the strongest reason for it; (3) one specific example or analogy; (4) a brief acknowledgement of the key objection.',
        'Ninety seconds is less time than it sounds. You must be selective — choose one reason (the strongest) and one example (the most vivid or concrete). Do not try to cover everything. Use signposting phrases to guide your listener through the structure: "My claim is that…" / "The strongest reason for this, I think, is…" / "A concrete example would be…" / "The obvious objection, of course, is…"',
        'Evaluate: Is the claim stated precisely in the first sentence — not buried at the end of a long preamble? Is the supporting reason actually a reason — does it explain why the claim is true — or is it merely a restatement of the claim in different words? Is the example concrete and specific? Is the objection the real strongest objection, or a convenient weaker one? Does the contribution fit in 90 seconds when spoken at natural pace?'
      ),
      task(
        'Introducing a complication or objection diplomatically. The discussion has reached the following point: Lena has argued that parsimony is justified because it leads to fruitful theories. You believe this argument is circular (you\'re using the success of parsimony to justify parsimony, but the success itself depends on what standards you\'re using). Introduce this objection in 60–75 seconds in a way that: (a) acknowledges the genuine strength of what Lena has said; (b) locates the specific point where you want to push back; (c) states the objection clearly; (d) invites Lena\'s response rather than closing off discussion.',
        'Diplomatic challenge phrases: "I find that compelling as far as it goes — but I wonder whether…" / "I want to push back on one specific step in that argument, if I may…" / "I think there might be a circularity lurking there — let me try to make it explicit…" / "That\'s a strong point, and I\'m partly persuaded — but I\'m not sure it escapes the following difficulty…" Avoid: "You\'re wrong because…" / "Actually, that\'s not what the argument says." (dismissive) / "I completely disagree." (without explanation) / "Interesting point, but actually I think…" (the "but actually" that invalidates the concession).',
        'Evaluate: Is the objection stated precisely enough that Lena could actually respond to it? Is the acknowledgement genuine — does it identify something specific that Lena said that is genuinely strong — or is it a pro forma concession before the real attack? Is the circularity objection (or whichever objection the student chooses) stated in a way that identifies the specific logical move that is problematic, rather than just asserting "that\'s circular"? Does the contribution end in a way that invites response — a question, an explicit "I\'d be interested to know how you\'d respond," a formulation of what a successful response would need to show?'
      ),
      task(
        'Closing a contribution so others can respond. After making a sustained 2-minute contribution on the topic of scientific realism and under-determination, close your turn in a way that: (a) summarises your position in one sentence; (b) identifies the key question or uncertainty you are leaving open; (c) explicitly invites the group to engage with a specific aspect of what you have said.',
        'Effective closings do not summarise everything — they identify the crux. "So my position is, essentially, X — but the question I\'m genuinely uncertain about is whether Y follows from it, and I\'d be interested to know what others think, particularly whether the no-miracles argument really escapes the objection I\'ve raised." Avoid: "That\'s basically everything I wanted to say." / "I think I\'ve covered it all." / "So, in conclusion, as I have argued…" (lecture-style).',
        'Evaluate: Is the one-sentence summary genuinely a summary of the position — precise, not vague? Is the open question a real question — something the student is genuinely uncertain about — or a rhetorical move that expects agreement? Is the invitation to engage specific — does it identify what in the student\'s contribution the group should engage with — or is it so open ("What does everyone think?") that it provides no direction? Does the closing invite further discussion, or does it have the register and finality of a lecture conclusion?'
      ),
    ],
    speakingChecklist: [
      'Contribution built on previous speaker — not just restated or ignored.',
      'Specific aspect of prior argument identified for development or challenge.',
      'Objection stated diplomatically with genuine acknowledgement of the strong points.',
      'Closing identified a specific open question and invited further engagement.',
      'Collegial register maintained throughout — challenge without antagonism.',
      'Contribution advanced the discussion rather than merely demonstrating knowledge.',
    ],
    freeSpeaking: [
      { topic: 'Choose any contested philosophical or epistemological question from C2.3 and deliver a 3-minute seminar-style contribution: take a position, support it with one specific reason, acknowledge the strongest counter-argument, and close by identifying the open question you are leaving for others.' },
      { topic: 'Reflect on a moment in the C2 course where your understanding of a concept genuinely changed. In 2 minutes, explain what you previously thought, what shifted, and why that shift matters intellectually.' },
    ],
  }),

]);

export const C2_DEEP_COMPLEX_DISCOURSE_PART2_BY_PILLAR = Object.freeze({
  grammar: Object.freeze([]),
  vocabulary: Object.freeze([]),
  reading: Object.freeze([
    C2_DEEP_COMPLEX_DISCOURSE_PART2.find(l => l.id === 'C2-READING-003'),
  ]),
  listening: Object.freeze([
    C2_DEEP_COMPLEX_DISCOURSE_PART2.find(l => l.id === 'C2-LISTENING-003'),
  ]),
  speaking: Object.freeze([
    C2_DEEP_COMPLEX_DISCOURSE_PART2.find(l => l.id === 'C2-SPEAKING-003'),
  ]),
  writing: Object.freeze([]),
  checkpoint: Object.freeze([]),
});
