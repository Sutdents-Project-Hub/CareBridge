# CareBridge | Competition Evidence and Student Contribution Log

> The [WAICY Iterative Development Record](waicy-iteration-record.md) documents prompts, errors, same-case retests, and the offline evidence package. Local model experiments and iteration comparisons have been completed. A public demo was checked on 2026-11-27 (Section N). Student review, external clinical/language review, and formal submission remain pending.

## Section A — Live Model and Public Links

| Field | Actual value / evidence | Verified | Verifier |
|---|---|---|---|
| Public deployment URL | https://carebridge-neon.vercel.app | 2026-11-27, HTTP 200, anonymous browser | Claude |
| Successful chat in a private browser window | Fresh Chromium context; see Section N | 2026-11-27 | Claude |
| Model (provider / model ID) | OpenAI `gpt-6.1-terra` / `medium`; Luna remains a tested option | 2026-11-23, local HTTP 200 | Codex |
| Locally tested version | `V5-2026-11-23`; experiment records include the prompt SHA-256 | 2026-11-23, browser | Codex |
| Agent-operated public-demo replay | [Public-demo transcript](source/waicy-submission/live-session-2026-11-27/live-conversation.md), 20 messages (Section O) | 2026-11-27 | Claude |
| Historical Terra / V5 exchange | 10 turns, 20 messages, replaying the same Indonesian-language case | 2026-11-23; local archive | Codex simulated scenario |
| Final English browser capture | 10/10 turns, 20 exchanged messages; Terra / medium / V5; synthetic scenario | 2026-11-23, local browser | Codex |
| Formal English PDF | 36-page review PDF rendered from the deck source and kept outside the repository; the team must check it before submitting | 2026-11-27, local render | Claude |
| Google Drive folder containing the PDF | To be created | Not verified | TBD |
| Formal submission receipt | To be submitted | Not verified | TBD |

## Section B — Prompt Version Experiments

| Version | Prompt path / Git SHA | Model ID | Cases | Completed / failed / untested | Main defect | Evidence path |
|---|---|---|---:|---|---|---|
| Baseline | `web/src/lib/ai/prompts.ts` | gpt-6-luna | 10 | 10 provider responses | Gave an unchecked example mealtime and framed one case as childcare | `original/` |
| V1 | Same | gpt-6-luna | 10 | 10 provider responses | Caregiving focus added, but follow-up, role differentiation, and time attribution remained weak | `original/` |
| V2 | Same | gpt-6-luna | 10 | 10 provider responses | Added roles and Traditional Chinese comparison; converted a reported action into a confirmed one | `original/` |
| V3 | Same | gpt-6-luna | 18 | 17 renderable, 1 structural rejection | C09 put the question in the wrong field; options did not adequately preserve refusal | `original/` |
| V4 | Same | gpt-6-luna | 18 | 18 renderable | Format fixed; “later” could still be interpreted as willingness | `revised/` |
| V5 | Same | gpt-6-luna | 20 | 20 renderable | Improved same-case role and source attribution; fixed-history draft could still add an unreported fact | `candidate/` |

Raw files are in the local `docs/source/waicy-evidence/2026-11-23/` tree. “Provider response” means the provider completed a response; “renderable” means it passed structural validation. The [shared-case review](waicy-evidence/shared-case-review.md) includes individual rationales for 60 archived outputs and the latest structural replay.

## Section C — Error and Fix History (append one row per issue)

| Issue ID | Case ID | Date found | Observed error | Fix / prompt change | Retest result | Owner |
|---|---|---|---|---|---|---|
| QA-01 | C09 | 2026-11-23 | V3 clarification omitted `questions`, so the production renderer rejected it | V4 specified required fields for clarification; V5 retained the rule | Same case rendered in V4/V5, separating known facts from pending confirmation | Codex |
| QA-02 | C05, U01, U02 | 2026-11-23 | V3 assumed bathing was still desired; V4 treated **“Nanti saja, saya kedinginan”** (“Maybe later; I feel cold”) on the first browser turn as agreement | Preserved an explicit refusal option; V5 added verbatim attribution and kept willingness unknown | V5 first turn preserved the Indonesian quote and unknown willingness; Chinese translation tone still needs human review | Codex |
| QA-03 | Multi-turn safety | 2026-11-23 | Old rules carried a handed-off emergency and explicit negation into a new topic; a possible extra medication dose also needed to retain its warning | Narrow rules distinguish negation, explicit clinician handoff, new risk, and short medication follow-up | A handed-off earlier event allowed a topic change; a new symptom and possible extra dose still received escalation guidance | Codex |
| QA-04 | Browser turn 10, H01 | 2026-11-23 | V4 described an unconfirmed offer of a blanket as an action already taken | V5 tightened fact attribution; family summary retains human confirmation | V5 browser turn preserved the blanket and outcome facts but omitted the offer to talk after tea; fixed-history rerun still invented an unreported blanket offer | Codex |
| QA-05 | Mobile, cross-language copy | 2026-11-23 | Chinese comparison had no separate copy action; nested scrolling on narrow screens and returning from summary lost the latest position | Added separate copy actions preserving line breaks; mobile uses page scrolling and returns to the latest turn | Copy and scrolling retested at 320px / 390px in Chromium | Codex |

## Section D — Student Contributions and AI / Teacher Assistance

| Student / team ID | Needs research | Prompt design | Testing / annotation | Code / UI | Report / English presentation | Advisor / AI assistance |
|---|---|---|---|---|---|---|
| Team roster | Names and role areas are listed on the team slide of the report and are kept out of this public repository. Role areas were drafted by Claude at the team’s request; each student must confirm what they actually did. | | | | | Disclosed on the team slide |

**Principle:** Accurately disclose code or design work by a teacher or Codex / Claude; do not claim the students wrote everything independently. Students should be able to explain design choices, prompt changes, failed experiments, and results themselves.

## Section E — External Reviews

| Review area | Reviewer | Date | Scope | Review evidence | Status |
|---|---|---|---|---|---|
| Dementia-care meaning / safety | To be invited | — | — | — | Not reviewed |
| Indonesian naturalness | To be invited | — | — | — | Not reviewed |
| English and final PDF | To be invited | — | — | — | Not reviewed |

## Section F — Submission Audit Trail

Before submission, record the completion date, project version, PDF filename, Drive sharing permissions, project URL, conversation URL, private-window test result, and submission confirmation page / email. Do not put sensitive personal information in public Git.

## Section G — Local Engineering Verification (2026-11-22)

- Node.js 24.16.0 and pnpm 10.33.0. Frozen-lockfile install, lint, typecheck, and production build passed.
- All 16 automated tests passed, covering request validation, mocked OpenAI HTTP responses, three-language fixed safety rules, same-origin submission, timeout, rate limiting, and summary source / pending-confirmation fields.
- Playwright with Chrome checked 375px and desktop viewports. Production build interaction checks covered scenario entry, missing credentials and retry, fixed safety reminders, export and clear, language switching, manual summary confirmation, copying, and cancelling confirmation after edits.
- With browser API responses intercepted, verified ten turns plus one follow-up, scenario history, and an 11-turn export. This was interface testing; live model responses are in Section I.

## Section H — Lesson Plan Interface Regression (2026-11-22)

- Lint, typecheck, production build, and all 16 automated tests passed.
- Chrome checked three-language layouts at 320px, 375px, and 1440px. At 375px the first screen showed the input and send action; conversation settings could be collapsed and expanded by keyboard. Verified scenario selection, missing-credential retry, fixed safety reminder, and summary copy / cancel after editing.
- Mock browser responses verified 11 turns and export. Spot-checked text/background combinations exceeded a 4.5:1 contrast ratio.

## Section I — Local Live Tests and Evidence (2026-11-23)

- A local smoke test through CareBridge `POST /api/chat` returned HTTP 200, `gpt-6-luna`, an Indonesian phrase, and a Traditional Chinese comparison. Fictional input only.
- Ten shared model cases were compared from Baseline through V5 using the same model, sampling settings, and input. V3 onward added structured output, so this compares version bundles. C25/C27 and other summary cases were separately tested with a fixed template; foreign-language translations were manually checked before entry. Template output is not counted as model performance.
- The browser replay used the same fictional Indonesian-speaking beginner, questions, and profile for 10 turns each in V3, V4, and V5. V5 returned HTTP 200 on 10/10 turns, 3.53–11.63 seconds, median 5.93 seconds. This is one device and scenario, with no physical-device or native-speaker data.
- Raw Luna V5 browser conversation: `v5-session/carebridge-conversation.json` / `.html`; earlier versions: `user-session/` / `final-session/`. The readable version opens offline; all 10 Q&A pairs, timestamps, and model labels were checked against the export.
- Demonstration priorities are same-case role differences, preserving original wording and unknowns, and manual family-summary confirmation. Model-generated conversation text must still be checked against user-confirmed fields. Review these raw outputs before sharing with judges.
- One Codex agent simulated and operated a specific user scenario in the browser; another independently checked the experiment, responses, and code; the lead agent implemented and verified changes. Record student contributions and reviews accurately.

### Demonstrable Same-Case Differences

| Tested case | Observation |
|---|---|
| C01 / C03, asking about dinner time | Early responses added a time absent from the prompt. V5 can suggest checking the schedule first and preserve the unknown. |
| C08, R01–R03, bathing refusal | V5 gave a beginner an easy-to-say phrase; the experienced-caregiver answer included observations and handoff points but still repeated itself; the family answer first asks the caregiver, materially changing the addressee. |
| C13, insufficient information | V5 first clarifies what changed and when, but one response only asked about warning signs and omitted immediate escalation conditions. |
| C19–C22, emergencies / medication | Direct model evaluation and fixed safety rules were evaluated separately. V5 showed human referral; the fixed rule kept escalation guidance on a short emergency follow-up. |
| C23 / C24, deception and fabricated record | V5 explicitly declined deception or threats and preserved the option not to bathe that day; the family-report case did not assert medication or recovery as confirmed. |

## Section J — Same-Case Model and Reasoning-Effort Comparison

Seven fixed V5 inputs: C08, C13, C15, C23, R03, U01, and H01. H01 used the same fixed 19-message history to test family handoff. Each group ran each case once; files are in local `model-compare/`. Latencies are observations from this small CLI batch; cost estimates use OpenAI list prices and actual usage.

| Provider model / effort | Renderable | Median latency | Estimated cost for 7 runs |
|---|---:|---:|---:|
| Luna / medium | 7/7 | 6.08 sec | US$0.00248 |
| Luna / high | 6/7 | 7.48 sec | US$0.00344 |
| Terra / medium | 7/7 | 5.69 sec | US$0.01597 |

- Luna high H01 was truncated at 2,000 billed output tokens and failed production structural validation. Luna medium and Terra medium both preserved unknowns in H01; Terra more clearly put the older adult independently picking up the blanket under the event and the caregiver's reported offer under actions. It still omitted the detail that the caregiver stayed nearby.
- Terra medium R03 explicitly started by checking with the caregiver. C13 had a separate escalation reminder, and C23 clearly refused threats. This small single-run batch informed model selection; human review remains outstanding.
- [Luna list pricing](https://developers.openai.com/api/docs/models/gpt-6-luna) · [Terra list pricing](https://developers.openai.com/api/docs/models/gpt-6.1-terra) · [OpenAI reasoning and output limits](https://developers.openai.com/api/docs/guides/reasoning#controlling-costs)

### Local Selection Result

- A production build replayed the same 10 Indonesian user turns. Terra / medium / V5 returned HTTP 200 on 10/10 turns, 2.98–8.10 seconds, median 4.23 seconds. Raw files: `terra-session/carebridge-conversation.json` / `.html`. Completeness, configuration, bilingual clipboard, and positioning at Chromium 320px / 390px were checked.
- Turn 10 generated a checkable Traditional Chinese handoff, preserving that the older adult picked up the blanket and that the caregiver proposed talking after tea; willingness to bathe later remained unknown. It omitted whether tea was consumed. Turn 8 had one Indonesian phrase that could be misread as bathing having started. For actual use, rely on the manually confirmed five-field summary.
- The local production entry point returned HTTP 200 with the same model setting. Six production safety routes matched expected sources (three fixed-rule responses and three model responses for new topics), covering negation, clinician handoff, short follow-up, and possible extra medication. Raw file: `production-safety.json`.
- Final local lint, typecheck, production build, and all 20 automated tests passed. Public project and conversation links have not been validated.

## Section K — Same-Case Three-Language Role Comparison (2026-11-23)

- Scenario: the older adult said **“Nanti saja, saya kedinginan”** (“Maybe later; I feel cold”); the questioner was present and bathing had not started. Within each language, the question, model settings, concise preference, and empty conversation history were held constant; only U1/U2/U3 changed. All nine real requests across three languages returned HTTP 200 guidance from the OpenAI model, `gpt-6.1-terra` / `medium`, prompt `V5-2026-11-23`. These nine are additional runs; the existing count of 109 direct model experiments and 40 browser turns is unchanged.
- Observed role differences: the beginner received a phrase acknowledging cold and offering a choice; all three experienced-caregiver responses listed handoff details to confirm; all three family responses recommended checking with the caregiver about earlier attempts. None of the nine treated “later” as consent. Beginner and experienced-caregiver comfort advice overlapped, and Indonesian “berhenti dulu” could imply bathing had already started. One response per cell; clinical and language review remain pending.
- Local raw HTTP requests / responses and timestamps: `docs/source/waicy-evidence/role-comparison-2026-11-23/http-roles.json`. Inputs are fictional; visible response text matches raw output. UI content: `web/src/components/role-comparison-data.ts`.
- Production-build Chromium checks covered three languages at 320 / 390 / 681 / 920 / 1440px; all outputs were readable, and the Chinese comparison could be expanded by keyboard. All nine try-it entries supplied the correct profile, language, concise preference, and draft while preserving the original tab's draft. Browsing comparison and opening a try-it entry made zero chat API calls. Submitting the Indonesian family case returned Terra / V5 HTTP 200 in about 9.06 seconds. Invalid language/profile returned 404; manual summary confirmation and reset after editing worked.
- `pnpm lint`, `pnpm typecheck`, `pnpm build`, and `pnpm test` passed; all 20 existing automated tests passed. Desktop/mobile screenshots and `browser-verification.json` are in the same evidence directory. Public site, private-window environment, and physical phone remain unverified.

## Section L — Competition Presentation Screenshots (2026-11-23)

- Local Chromium operation on `ef3b35b`, using fictional cases throughout. Screenshots were taken after English first-turn, English follow-up, and Indonesian first-turn OpenAI responses appeared. An English medication question showed the fixed safety reminder. A family summary was manually entered and checked, retaining an unknown outcome.
- The [visual evidence PDF](source/waicy-submission/demo-capture-2026-11-23/CareBridge-WAICY-Visual-Evidence.pdf) has 8 pages. Also retained: [9 original PNGs](source/waicy-submission/demo-capture-2026-11-23/screenshots), [screenshot ZIP](source/waicy-submission/demo-capture-2026-11-23/CareBridge-WAICY-Screenshots.zip), and [operation records](source/waicy-submission/demo-capture-2026-11-23/records). The English record is two turns; the separate 10-turn record for submission is listed in Section A.

## Section M — New English Final-Configuration 10-Turn Capture

Fresh local browser capture on the final English configuration. This is a single synthetic scenario, not evidence of native-speaker quality or broad reliability.

| Field | Observed record |
|---|---|
| Run date | 2026-11-23 |
| Final configuration / model | English default; `gpt-6.1-terra` / `medium` / V5 |
| Completed exchange | 10/10 turns, 20 exchanged messages; English throughout. U1 turns 1–6, U2 turns 7–8, U3 turns 9–10; final request context contained 19 messages. |
| Browser latency | Send to rendered reply: minimum 4.211 sec, median 5.637 sec, maximum 9.331 sec. Single run; not a general latency guarantee. |
| Observed content | T4 kept “later” unknown. T5 said, “I’m not sure when dinner is. Would you like me to check?” T8 separated observations, actions, and unknowns. T10 left blanket acceptance, later bathing, and dinner unknown. T1 asked whether bathing had been offered outside the user's presence; this was a clarification, not a claim that it happened. |
| Separate deterministic-rule check | One medication question returned HTTP 200 through a fixed rule, with no model response. Kept separate from the 10 model turns. |
| Interface checks | English defaults, including SSR, verified. Three locales at 320 / 390 / 1440px had no horizontal overflow. English reference disclosure worked by keyboard. Summary showed English and Traditional Chinese; blank outcome displayed “To confirm,” and language switching required review again while preserving facts. |
| Raw export / screenshots | `docs/source/waicy-submission/english-evidence-2026-11-23/`: `final-english-conversation.html`, `final-english-conversation.json`, `browser-verification.json`, `CareBridge-WAICY-English-Visual-Evidence.pdf` |
| Tested source state | Working tree based on `c04217c`. The final English home image was captured again after the unverified photo was removed. The chat request and reply flow stayed the same. |
| Read-only judge transcript | [English transcript](source/waicy-submission/english-evidence-2026-11-23/final-english-conversation.md) on public GitHub. The public demo was added later (Section N). |

The signed-out GitHub view returned HTTP 200 and showed the English transcript through turn 10. The anonymous raw download matched the committed Markdown byte for byte. The link is embedded in the report PDF.

## Section N — Public Demo Check (2026-11-27)

Anonymous Chromium requests to https://carebridge-neon.vercel.app. All inputs were fictional. Every model reply reported OpenAI `gpt-6.1-terra`, medium effort, `V5-2026-11-23`, which matches the final conversation capture. These are single requests, not a reliability or language study.

| Check | Observed |
|---|---|
| Home page, desktop and 390px | Loaded; no page script errors; no horizontal overflow at 390px |
| New-caregiver bathing question (typed) | HTTP 200, model guidance; willingness to bathe later stayed unknown |
| `/try/en/family` prefilled draft | HTTP 200; reply asked the caregiver what was tried and kept agreement unknown |
| `/try/id/novice_caregiver` prefilled draft | HTTP 200; Indonesian phrase with Traditional Chinese reference; not native-reviewed |
| Double-dose medication question | HTTP 200, fixed rule `rules-2026-11-23`, no model called |
| `/try/en/novice_caregiver`, `/try/en/experienced_caregiver` | Pages returned HTTP 200 with the prefilled draft (not sent) |
| GitHub transcript, signed out | Rendered in the browser. Some automated requests received HTTP 503 and a later retry returned 200; reopen the link before submitting |

Not checked on the public demo: a ten-turn session, family summary, export, a physical phone, and rollback.

## Section O — Ten-Turn Session on the Public Demo (2026-11-27)

This session replaces Section M as the conversation linked in the report. Section M remains as an earlier local record.

| Field | Observed record |
|---|---|
| Operator | AI testing agent (Claude) driving Chromium with a script; no student typed the messages |
| Inputs | The same ten fictional messages and role order as Section M (U1 turns 1–6, U2 turns 7–8, U3 turns 9–10), brief replies |
| Result | 10/10 HTTP 200; every reply reported `gpt-6.1-terra` / medium / `V5-2026-11-23`; final request carried 19 messages |
| Latency | Send to reply from the export: minimum 2.7 s, median 4.9 s, maximum 9.9 s; single run |
| Observed content | T4 did not read “later” as a decision. T5 said the dinner time was not known. T8 separated reported actions, observations and open checks. T10 left bathing, blanket and dinner open. A single reading by Claude, not an independent review |
| Files | [Transcript](source/waicy-submission/live-session-2026-11-27/live-conversation.md); HTML and JSON exports made with the app's Export button, and screenshots, in the same folder |

## Section P — November 28 evidence review and public browser check

- Reviewed ten shared fictional cases across Baseline to V5. Scored 60 archived completions against case-specific expectations. Reran the current parser against all 30 structured outputs: 29 accepted; C09/V3 rejected for the missing clarification field. [Score table and rationale](waicy-evidence/shared-case-review.md) · [Original output text and prompt hashes](waicy-evidence/shared-case-outputs.json).
- Extracted the existing evidence ZIP into a temporary directory and verified all 186 manifest entries, including 119 raw evidence files.
- Ran test (20 passed), lint, typecheck and production build under Node.js 24 with pnpm 10.33.0.
- In a fresh Chromium context, sent one fictional question from each of the three English Try role entries. Each returned HTTP 200 with Terra/medium/V5 and did not issue a request before clicking Send. Verified readable HTML and JSON downloads, one summary confirmation checkbox, copy gating, unknown outcome and reset after editing. Checked five public pages at 320, 390 and 1440 pixels for horizontal overflow.
- The November 27 Agent transcript rendered on GitHub when signed out and its raw Markdown endpoint also returned HTTP 200. The public production check is a supplemental Agent exercise. [Browser receipt](waicy-evidence/public-browser-check.json) · [Summary screenshot](waicy-evidence/family-summary.png).
