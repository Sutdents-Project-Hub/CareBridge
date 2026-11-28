# CareBridge WAICY | Slide production handoff

Use this with the 36-slide English Lesson Plan review PDF dated 27 November. Page numbers below refer to that copy. Insert the new pages using the named anchors, then regenerate page numbers and verify the final links. This handoff supplies English slide text, source evidence, captions, and placement. Team-owned statements are left open.

## Required edits to the current deck

| Existing page | Replacement copy or production instruction |
|---|---|
| 2, 26–28 · Chat history | Label the 27 November session **“Public-demo engineering replay · AI agent operator · 10 turns / 20 messages.”** It can remain as supplemental evidence. Add **“Team conversation with CareBridge”** as the official chat-history link once the team records and checks it. Replace link targets throughout the document. Follow the [recording script](waicy-team-conversation.md). |
| 5 · Language | Replace “Norway · 90 participants” and its footer with **“Norway · 16 focus groups, 19 individual interviews and 3 paired interviews.”** The nine focus groups with 51 older immigrants were one subset; the paper separately describes 12 relatives and two groups of health personnel. Replace “each phrase” with **“English and Indonesian phrase suggestions can include a Traditional Chinese reference.”** Retain the Taiwan statistic only with the October 2026 edition and the occupational denominator. [Sagbakken et al.](https://doi.org/10.1371/journal.pone.0243803) · [Taiwan MOL, Table 12-5](https://statdb.mol.gov.tw/html/mon/212050.pdf) |
| 6 · Related studies | Use **“These examples evaluated generated replies. Zhou et al. (2026) compared 64 answers with 12 expert reviewers and found higher actionability, relevance and perceived satisfaction for the enhanced model, with no significant difference in accuracy or safety/harm. An abstract by Bennett et al. (2025) observed that general replies included follow-up questions, while the prompt-engineered replies in its sample did not.”** The Oh abstract is optional context; do not count it as an independent replication of Zhou. [Zhou et al.](https://doi.org/10.2196/79975) · [Bennett et al.](https://academic.oup.com/innovateage/article/9/Supplement_2/igaf122.2254/8411923) |
| 7 · Baseline | **“C01 offered ‘dinner at six’ as an example without telling the caregiver to check the actual schedule. C07 interpreted a vague refusal-to-bathe scenario as childcare.”** Footer: **“Same model and ten saved requests; V3–V5 also used structured output. One sample per version and case.”** |
| 13–14 · Language and summary | Show an actual English/Traditional Chinese pair, with the Indonesian example labelled as a separate recorded reply. Summary caption: **“Review the five-field preview, then tick one confirmation box to enable Copy summary. Editing resets the confirmation. Blank fields remain to confirm.”** |
| 18 · Experiment loop | **“We used the same ten fictional inputs and model across six versions. Baseline–V2 returned text. V3–V5 also used a shared structured output format. We preserved the full responses and checked each failure before retesting.”** Use **“We iterated across five prompt versions”** rather than asserting five separately documented complete cycles. |
| 19 · Timeline | For `5ec75b5`, use **“English-first UI and a local English replay.”** For the public project entry, use **“Vercel prototype verified publicly; a separate agent ran 10 live English turns on 27 November.”** |
| 20 · Version table | Baseline/C01: **“Unverified time in an illustrative script.”** V3/C01: **“Prompted schedule checking; C09 failed validation.”** V4/C09: **“Same case rendered as guidance and asked the family to confirm details.”** Footer: **“Matching model and saved requests. Structured output began at V3.”** |
| 21 · Before and after | Keep the actual qualifier in the excerpt: **“例如：『晚餐六點，還有半小時。我陪你看看時間。』”** English gloss: **“For example: ‘Dinner is at six, in half an hour. I can look at the time with you.’”** Label **“Example script has an unchecked time”**. For C07 label **“Interprets this as childcare”**. Footer: **“Matching Luna model and user inputs. Baseline text and V5 structured output. English translations of Traditional Chinese excerpts.”** [Full outputs](waicy-evidence/shared-case-outputs.json) |
| 23 · Error analysis | Title **“Unchecked details and broken output format.”** C01: **“The example introduced a concrete time that the user had not supplied. V3 required known/unknown separation. V5 explicitly instructs the model to check the schedule. The V5 reply said the time was unknown and offered to check.”** C09: keep the `questions: null` defect and clarify that V4/V5 render the same case as guidance containing a question for the caregiver. |
| 29 · Evidence limits | **“This evaluation used one archived response per case and version, plus Agent-operated browser replays. We have not measured caregiver outcomes. C13/V5 asked about serious symptoms without an immediate-help instruction in this sample.”** |
| 30 · Confirmation | **“The browser builds a draft from the facts the user enters. The user reviews one preview and ticks one confirmation box before copying. An edit clears confirmation. The user decides where to share it.”** |
| 31–32 · Future and conclusion | Close with **“The current prototype demonstrates role-specific wording, bilingual comparison, and a handover that preserves unknowns in fictional scenarios. Next, repeat the same cases, review translations with native speakers, and test whether caregivers can complete each task without help.”** For C13, test ambiguous changes separately from explicit emergencies and require actionable help when warning signs are present. |
| 33 · Team | Replace drafted personal roles with member-confirmed contributions only. Suggested format for each member: **“I contributed [specific action]. Evidence: [artifact, case or commit]. I can explain [decision and result].”** Keep the AI disclosure reference and include the [AI-use statement](waicy-ai-use-statement.md) with the report. |
| 34–36 · References | Use the [claim-to-source notes](waicy-research-notes.md#november-28-slide-citations-and-research-informed-scenarios). Add an in-slide citation wherever a source supports a claim. Omit reader-facing references that receive no citation. Pair the app and code links with the demo and iteration captions. Split the OpenAI entries if retained. |

## Four pages to insert after “Six versions, one shared test set”

The official example walks through idea, prompt, observed output and error analysis in each iteration. The following blocks supply that sequence. Use the short original quotations as copyable text and place an English gloss below each non-English excerpt. [Official iteration example](https://drive.google.com/file/d/1Mqp7Xv5sUcJkEXBOxp55G0eUumaSTMvc/view?usp=sharing) · [Original prompts, requests and complete replies](waicy-evidence/shared-case-outputs.json)

### A. Baseline → V1 · Scope improved; time still needed checking

- **Idea.** A new caregiver needs a calm sentence they can use immediately when the older adult asks about dinner repeatedly.
- **Baseline setup and result.** No CareBridge developer prompt. C01 introduced the six-o’clock line with “例如” (“for example”). C07 centred its advice on children's bath refusal.
- **Added in V1.** “Offer a short understanding, two or three optional communication approaches and a natural phrase.”
- **Test and next change.** C01/V1 offered “我們六點吃晚餐，還有半小時，我會提醒你。” (*We eat at six. There’s half an hour left. I’ll remind you.*) The script still needed a schedule check. V2 explored adapting to the speaker and required clarifying important missing information. V3 later explicitly prohibited inferring times.

### B. V2 → V3 · Better bilingual wording; a format failure surfaced

- **Idea.** Let a caregiver speak in Indonesian and check the suggested phrase against Traditional Chinese. Give family members an answer that preserves who reported what.
- **Added in V2.** “For English or Indonesian phrases include a Traditional Chinese reference for human checking.” “When important information is missing, ask one or two focused questions before specific suggestions.”
- **V2 evidence.** C03 included a Chinese reference and conditioned an exact time on actually knowing it. C15 called the reported situation “目前已處理好” (*already handled*) before asking what happened and how the person was now.
- **Added in V3.** “Preserve uncertainty and missing facts explicitly.” “Return only the specified JSON fields.”
- **V3 evidence and next change.** C15 improved source attribution (“你說已經處理好了”). C09 returned a sensible family question inside `phrase` with `kind: "clarification"` and `questions: null`. The provider completed it and the app parser rejected it. V4 specified the required fields.

### C. V4 → V5 · Honour refusal and preserve attribution across turns

- **Idea.** A spoken choice must allow the person to decline, and a handover must distinguish stated words from consent and completed care actions.
- **Added in V4.** “Offering a choice requires a genuine option to decline or stop.” V4 also put actual clarification questions in `questions` and allowed `guidance` when there was enough context.
- **V4 evidence.** C05 said “atau melewatkan mandi hari ini?” (*or skip the bath today?*). C09 rendered as guidance. A separate browser replay still inferred willingness to bathe later and described a blanket offer as done.
- **Added in V5.** “In everyday questions about an unknown schedule, suggest checking or say the time is unknown in the phrase itself.” The prompt added explicit examples of source attribution and recipient-specific priorities.
- **V5 evidence and remaining error.** C08 restored three distinct points including what to hand over. C01 offered to verify the mealtime. In the fixed-history H01 sample the model still added an unreported blanket question. This led to a separate model-selection comparison and kept the user-reviewed draft as the formal handover path. [Fixed-history and model-selection record](waicy-iteration-record.md#s4-errors-changes-and-observed-improvements)

### D. Ten cases across six versions

| Version | Met case-specific content criterion | Partial | Missed | Structured replies accepted |
|---|---:|---:|---:|---|
| Baseline | 2/10 | 5 | 3 | Plain text |
| V1 | 2/10 | 6 | 2 | Plain text |
| V2 | 6/10 | 4 | 0 | Plain text |
| V3 | 8/10 | 2 | 0 | 9/10 |
| V4 | 7/10 | 3 | 0 | 10/10 |
| V5 | 9/10 | 1 | 0 | 10/10 |

**Caption.** Codex annotated 60 existing Luna outputs against the original fictional case expectations. One sample per version and case. V4 improved renderability while losing the three-point handover in C08 and attributing C15’s report to an unspecified caregiver. V5 improved those cases while C13 still needed an immediate-help instruction. Raw text and structure results are provided for inspection. [Per-case scores and rationale](waicy-evidence/shared-case-review.md)

## Originality page after the error-analysis section

**Title.** One care moment, three different jobs

**Primary visual.** Start from the same [public comparison case](https://carebridge-neon.vercel.app/compare): the older adult says “Later, I feel cold.” Show what each role needs to do next.

- **New caregiver:** find a gentle sentence and leave room to decline today.
- **Experienced caregiver:** record what was said, what was offered, and what to hand over.
- **Family:** ask the caregiver what happened and keep the later outcome open.

**Implementation caption.** “CareBridge combines role-sensitive conversation, a bilingual reference for checking wording, preset safety routes, and a separate user-confirmed handover. OpenAI generates the conversational replies. CareBridge implements the role controls, response validation and fixed handover form. AI tools helped implement and test the app.” Include the actual member-confirmed contributions on the team page.

## Motivation and Q&A copy

**Motivation.** “CareBridge started with a practical question from our project brief: what can a caregiver say in the moment, and what can the family report afterwards? Those tasks require different answers. A sentence that comforts someone should not become a claim that a bath was completed. The care literature made language and understanding concrete design constraints, so we built the advisor around three roles, three languages, and a way to leave outcomes open.” Ask a team member to add one specific confirmed observation or decision if available. The [research scenarios](waicy-research-notes.md#november-28-slide-citations-and-research-informed-scenarios) supply documented context and simulation assumptions.

**Live walkthrough.** Open Compare roles and point to the shared question. Open one “Try this role” card and press Send to distinguish the saved example from the live reply. In Family summary, load the fictional example, point to the unconfirmed outcome, tick the single review box and copy. If the network stalls, show a dated screenshot and describe what the team actually checked.

**Judging questions.**

- “What changed in V4?” The earlier clarification had a sentence in the wrong field. V4 specified required fields. The matching sample rendered as guidance and still gave the family something to ask.
- “What still fails?” H01 added a statement that was never reported, and C13/V5 omitted an immediate-help instruction. The summary keeps source fields visible for review. More runs and specialist feedback are needed.
- “Who tested it?” Coding agents tested fictional model and browser cases. Only the separately recorded team session can be described as team-operated.

## Screenshot placement

Use the existing white, pale-blue and ink-navy Lesson Plan theme. Fill roughly half the page with one readable crop per screen. Keep the recorded locale and wording visible. Use native slide text for longer excerpts and keep the original capture linked by its caption. Verify the PDF at 100% zoom and in presentation mode.

| Existing page | Asset and crop |
|---|---|
| 11 | [Same-question role cards](source/waicy-submission/demo-capture-2026-11-23/screenshots/02-role-comparison-en.png). Crop to the three role labels and first substantive lines, or use native text for each role and show one representative card. |
| 12–13 | [Indonesian mobile reply](source/waicy-submission/demo-capture-2026-11-23/screenshots/05a-live-indonesian-mobile.png) and [Chinese reference detail](source/waicy-submission/demo-capture-2026-11-23/screenshots/05b-live-bilingual-phrase-mobile.png). Keep the matching phrase and reference together. |
| 14, 30 | [Full summary](waicy-evidence/family-summary.png) and [enlarged preview](waicy-evidence/family-summary-preview.png). Use the unknown result and single checkbox as the focal detail. |
| 15 | [Preset medication safety notice](source/waicy-submission/demo-capture-2026-11-23/screenshots/07-medication-safety-en.png). Crop to request, notice and the preset disclosure. |
| 26–28 | [Public run captures](source/waicy-submission/live-session-2026-11-27/screenshots). Use turn 4 for “later”, turn 8 for handover, and the export dialogue as a separate detail. Keep the Agent-operator caption. Team captures can replace these after an actual team session. |

Before export, check the seven official rubric areas with the [rubric map](waicy-rubric-map.md) and use the [submission checklist](waicy-submission-todo.md).
