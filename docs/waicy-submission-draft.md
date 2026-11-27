# CareBridge: A Multilingual Communication Advisor for Dementia Care

**WAICY 2026 · LLM & AI Agent Track · AI as a Service**
**Submission report draft · updated 27 November 2026**
**Status: the 36-slide deck is the report to submit; this file is the editable text source. Human reviews are pending.**

> This editable source contains an English text version of the report in Sections 1–10, followed by a separate registration brief under 200 words. The PDF deliverable is exported from the slide deck.

## 1. The service

CareBridge is a web-based, multilingual communication advisor for everyday situations involving a person living with dementia. It helps a caregiver think through what to say, offers a respectful phrase in the selected conversation language, asks for important missing context, and helps a family member organize reported facts into a handover draft. The English home page also offers Traditional Chinese and Indonesian conversations. Family summaries offer English or Traditional Chinese headings and preserve the wording the user enters.

The service is intentionally narrow. It does not diagnose, prescribe, recommend medication changes, monitor a person, or replace a clinician or trained care professional. It does not claim that a suggested action happened. A separate, browser-side five-field family-summary tool distinguishes **event**, **observation**, **action taken**, **outcome**, and **to confirm**; the user reviews and confirms the text before copying or sharing it.

A typical interaction begins in English with a role and language selection, then a concrete situation such as repeated questions or refusal to bathe. The advisor may ask a clarifying question, offers a possible next step and a phrase that preserves the older adult's choice, and identifies when a person should seek professional or emergency help. Conversation export is user-initiated. The local MVP does not require sign-in or maintain a care-record database.

## 2. Three users with different needs

The roles describe response needs, not identity checks or access permissions. The same situation—an older adult says no to a bath—should produce different assistance for each role.

| Profile | What the person needs | How the advisor should adapt |
|---|---|---|
| **U1 · New caregiver** | Plain-language help in the moment, including words they can actually say. They may be unfamiliar with dementia-related communication and unsure what information matters. | Give a few short steps, a gentle ready-to-use phrase, a brief reason, and a clear point at which to ask another person for help. Avoid implying that the bath must happen. |
| **U2 · Experienced home caregiver** | A fast, low-repetition reminder that supports observation and handover during an ongoing care routine. | Lead with concise priorities, separate observation from interpretation, note what remains unknown, and surface relevant escalation or handover points without repeating basic instruction. |
| **U3 · Family member** | A trustworthy account of what the caregiver actually observed and did, including uncertainty. The family member may not have been present. | Address the caregiver when checking the report; organize reported events, observations, actions, outcomes, and open questions. Never turn a suggestion into a completed action or an unknown result into a fact. |

**Same-case role comparison (local live outputs).** On 23 November, the production chat endpoint returned nine model-provenance responses (HTTP 200): each of U1/U2/U3 for the same fictional “Later, I feel cold” situation in Traditional Chinese, English, and Indonesian, with brief style, no prior history, and `gpt-6.1-terra` / medium / V5. All nine left willingness to bathe later unresolved. The English outputs show how the emphasis changed within that shared case:

| Role | Observed Terra/medium/V5 response |
|---|---|
| **U1 · New caregiver** | “I hear you’re cold. We can pause or skip the bath today—what would you prefer?” A direct phrase and simple choice. |
| **U2 · Experienced caregiver** | “You said you feel cold. Would you like a blanket, or would you prefer to rest?” The answer also asks for a concise handover check: what was tried, what happened, and whether bathing occurred after the caregiver left. |
| **U3 · Family member** | “They said, ‘Later, I feel cold.’ What was tried, and what happened after I left?” It asks the caregiver for the report and keeps the later outcome open. |

This is one sample per role-language pair, not a reliability study or language validation. The answers overlap on comfort advice, and the Indonesian “berhenti dulu” wording may sound ambiguous; qualified language review is still needed. Raw HTTP snapshots: `docs/source/waicy-evidence/role-comparison-2026-11-23/http-roles.json`. The companion comparison screen passed local production UI acceptance: English is the default, all three languages are selectable, and each “Try this role” action opens a matching prefilled draft without an API call; the user sends explicitly. All nine role/language drafts matched the selected role, language, and scenario. One Indonesian family draft was sent and rendered from Terra/V5 medium (HTTP 200, 9.063 seconds), while the original comparison tab remained intact. The comparison flow, summary confirmation/reset, keyboard disclosure, and no-horizontal-overflow layouts passed at 320, 390, 681, 920, and 1440 pixels across the three languages (15 combinations); two invalid routes returned 404. These are local UI checks and do not establish a public evaluator URL.

## 3. Motivation and problem

An ordinary care conversation can become difficult when an older adult repeats a question, refuses bathing, becomes distressed, or does not want to eat. In a multilingual household or care setting, a caregiver may also need to find words in a language they are still learning. A family member who was not there may need a concise update, while the caregiver may be unsure which parts are observation, inference, action, or outcome.

CareBridge was developed to focus on this small but consequential communication task. A general-purpose chatbot can produce fluent text, but fluency alone does not ensure that the response respects refusal, distinguishes a proposed action from one already taken, or adapts to the person asking. The project therefore treats role adaptation, respectful wording, uncertainty, and boundaries as design requirements to test rather than qualities to assume.

Taiwan's Ministry of Health and Welfare estimated 7.99% dementia prevalence among community-dwelling adults aged 65 and older using 2020–2023 survey data. The Ministry of Labor counted 201,177 Indonesian workers among 241,800 migrant workers in the social-welfare category at the end of October 2026 (83.2%). The occupational table gives context for the language choice. It does not measure dementia caregiving or demand for CareBridge. Public dementia-communication resources informed the project design. See references 4–8 and 13–14.

## 4. How the advisor is designed

CareBridge is a Next.js and TypeScript web MVP. The chat request is handled server-side and calls the OpenAI Responses API; the API credential is kept in the server environment. The browser-side family-summary form does not send that summary to the model. The model is prompted to work within everyday communication, adapt to U1/U2/U3 and the selected language, preserve reported wording, ask when essential information is missing, and keep uncertain events and outcomes unresolved.

The application combines model-generated advice with fixed application behavior. Structured-response validation can reject malformed output before it is displayed. Separate safety routing covers selected acute-symptom and medication follow-up cases. These controls reduce some foreseeable errors; they are not a clinically validated triage system and do not guarantee safe output for every phrasing or conversation history.

The chosen evaluation cases use fictional scenarios. Versions were compared on shared inputs, with prompts and raw results retained in a local evidence archive. The application was also replayed through its browser interface. This lets the team inspect both the model's text and whether the real interface can render, preserve, and export it.

## 5. Iterative development and experimental results

The iteration followed the WAICY sequence **Idea → Advisor Design → Testing → Error Analysis → Improvement**. Prompt versions were Baseline, V1, V2, V3, V4, and V5. The work changed the service from a general response instruction into a role-aware advisor with explicit language, uncertainty, respectful-choice, handover, and output-format requirements.

### 5.1 Prompt progression

| Version | Change and observed evidence |
|---|---|
| **Baseline** | A general-purpose baseline with the same model, shared cases, and request settings. It invented a dinner time in C01 and once treated an older adult like a child in C07. |
| **V1** | Narrowed the purpose to everyday care communication and requested conversational, brief wording. Time attribution, role differences, and necessary follow-up remained weak. |
| **V2** | Added three user profiles, three languages, Chinese comparison text, and clarification when information was missing. In C15, a user's report was still phrased as a confirmed fact. |
| **V3** | Added known/unknown distinctions, no invented facts, escalation language, and structured response output. It avoided the invented time in C01, but C09 put clarification text in the wrong field and failed the application's formal validator. |
| **V4** | Specified required fields by response type, preserved refusal as an option, and routed medication questions to a person. The same-case clarification rendered, but multi-turn testing still inferred consent from “later” and misattributed an unreported blanket offer. |
| **V5** | Added examples distinguishing quoted words, reported actions, and inference; prohibited invented times; and made role-specific priorities explicit. Same-case results improved on selected cases, but a fixed-history handover still introduced an unreported blanket question. |

### 5.2 Direct model runs

There were **109 historical direct model runs** across prompt evaluation, fixed-history handover, and model/effort comparison. These counts are from the local iteration record and its evidence index; they are not a pass-rate score.

| Batch | Runs | Observed result |
|---|---:|---|
| Baseline, V1, V2 | 30 (10 each) | All 30 returned provider output. These early outputs were evaluated as text; the later structured-output validator was not retroactively applied. |
| V3 | 18 | 18 provider responses; 17 passed the application's structure check and one (C09) was rejected because the clarification questions field was null. |
| V4 | 18 | 18 passed the structure check. This did not mean all content was correct. |
| V5 | 20 | 20 passed the structure check. This did not mean all content was correct. |
| Fixed-history H01, V4 and V5 | 2 | Both rendered from the same 19-message history; each contained a content error. |
| Model/effort comparison | 21 (7 per setting) | 20 displayed; Luna/high was truncated at its 2,000-token output cap on H01 and failed formal parsing. |
| **Total** | **109** | **108 provider completions; 1 incomplete/truncated result. Structural display and factual quality were assessed separately.** |

The shared prompt comparison used ten fictional cases (C01, C03, C05, C07, C08, C09, C13, C15, C19, C21) with `gpt-6-luna`, matching request data and sampling settings. V3 onward also used the same structured output format, so this is a comparison of versioned system designs, not an isolated causal test of prompt wording. Each case/version is a single sample; model output is non-deterministic.

### 5.3 Browser interaction and final model selection

The same fictional Indonesian-speaking novice profile completed ten browser turns each with Luna/V3, Luna/V4, Luna/V5, and Terra/medium/V5: **40 browser turns total**. The last Indonesian set used `gpt-6.1-terra`, medium reasoning effort, and V5. All ten turns returned HTTP 200; observed response time was 2.98–8.10 seconds, with a 4.23-second median for the one local session.

A separate seven-case V5 model/effort comparison produced these observed results:

| Model / effort | Structurally displayable | Median observed latency | Estimated token cost for seven runs |
|---|---:|---:|---:|
| Luna / medium | 7/7 | 6.08 s | US$0.00248 |
| Luna / high | 6/7 | 7.48 s | US$0.00344 |
| Terra / medium | 7/7 | 5.69 s | US$0.01597 |

The values are from a single small batch and are not benchmarks. Cost is estimated from recorded token usage and listed standard prices, not an invoice. Terra/medium was selected for the local showcase because its handover and role-specific answers were more useful in the inspected cases, then it completed the ten-turn browser replay. Luna/high's incomplete handover shows why a response that hits the output limit must be treated as a failure, even when the model began an answer.

**English final-configuration session.** A separate Chromium session completed 10 English turns with the same fictional case, switching from new caregiver to experienced caregiver and then family member. All ten replies came from Terra/medium/V5 (HTTP 200); the last request included 19 messages of context. The model gave no invented dinner time in turn 5. It separated observations from caregiver actions in turn 8, and left the post-visit bath, blanket acceptance, and dinner unresolved in turn 10. The 20-message transcript is linked in Section 9. These results cover one fictional scenario. They are additional to the 40 historical Indonesian browser turns.

### 5.4 Error analysis and remaining limitations

| Observed failure | Change and retest | Remaining issue |
|---|---|---|
| Baseline invented “dinner at six” although no time was supplied. | V3/V5 made unknown times explicit; V5's C01 suggested checking the schedule first. | A model can still invent context in other phrasings or longer histories. |
| V3 C09 returned a clarification with `questions: null`; the question was embedded in another field. | V4 defined required fields and was replayed against the same case; V4 and V5 rendered it. | Format validation cannot ensure that the question is appropriate or complete. |
| “Later” was treated as agreement to bathe; V4 also attributed a blanket offer that had not been made. | V5 retained the quoted words and treated willingness as unknown. | Translation tone still needs review. In fixed-history H01, a V5 output again invented a blanket question. |
| A long history blurred what the older adult did and what the caregiver did. | V5 and Terra/medium separated the older adult picking up a blanket from the caregiver's reported action in the inspected browser handover. | The Terra summary omitted whether tea was later drunk; an Indonesian phrase in turn 8 could imply bathing had begun. Human confirmation remains necessary. |
| A safety reminder from an earlier topic could persist after a denial or professional handoff; medication overuse follow-up also needed to stay salient. | Narrowed application routing for explicit denials, clinician handoff, new warning signs, short acute follow-ups, and possible extra medication. Six production route cases matched the expected model/fixed-rule path. | This small set is not clinical validation. One C13 model output omitted an immediate-help condition. |

### 5.5 Engineering checks

The final local engineering checks recorded on 23 November were: `pnpm lint`, `pnpm typecheck`, `pnpm build`, and `pnpm test`. All four completed successfully; the test command reported **20 automated tests passing**. These are software checks, separate from the 109 direct model runs and 40 real-model browser turns. The browser test used Chromium at 320px and 390px for the Terra/V5 layout and copy behavior; no physical-phone acceptance is claimed. A separate latest production acceptance checked all three comparison languages at 320/390/681/920/1440px (15 locale/width combinations), role/language/scenario prefill for nine “Try this role” links, explicit-send behavior, a submitted Indonesian family question (HTTP 200; Terra/V5 medium; 9.063 seconds), keyboard disclosure, summary confirmation/reset, and two invalid routes (404). The comparison UI did not call the API until Send. The English acceptance also verified English initial page HTML, keyboard disclosure of the Chinese reference, choice of summary headings, review reset on language change, and retention of an unknown outcome.

## 6. Limitations, ethics, and safeguards

CareBridge can produce plausible but incorrect statements, confuse the speaker or source of a claim, overstate willingness, miss an unresolved outcome, or phrase a translation with unintended force. The Terra/V5 handover preserved who picked up the blanket and what the caregiver proposed, but omitted whether tea was later drunk. It also left a possible ambiguity in an Indonesian phrase about whether bathing had started. These examples show that a well-formed answer is not necessarily a faithful account.

The family summary is a **draft**. Users must check each field and confirm it before sharing. An AI suggestion is not evidence that an action occurred; an unknown result must stay unknown. The service is not an emergency service and cannot make a diagnosis or medication decision. In urgent or out-of-scope situations it should direct people to appropriate human help, but the routing cases have not been reviewed or approved by a clinician.

The evaluation used fictional cases. A simulated reviewer acting as a fictional caregiver used the browser; this was not a real caregiver study, patient test, or usability study with affected families. The recorded review included AI-assisted testing and AI review; student contributions have not yet been supplied. English and Indonesian language quality, especially tone and cultural nuance, still need human review. Dementia communication and acute-symptom references informed the design but do not establish clinical efficacy, translation validity, or certification.

The local MVP does not ask for sign-in and does not maintain a care-record database. Test materials use fictional details. Chat export is initiated by the user, and the browser-side summary is not sent to the model. The English conversation is available through its read-only transcript link. Deployment and a live evaluator session remain pending.

## 7. Future development

| Limitation or unresolved item | Next work | Evidence needed before claiming improvement |
|---|---|---|
| Tea outcome was omitted; a blanket action was invented in another fixed-history run. | Expand source-attribution and long-history tests; inspect each event/action/outcome/unknown field in the family handover. | Reproducible fixed-history cases plus human review showing no unsupported event, action, or outcome. |
| Indonesian tone and the phrase about bathing may be misunderstood. | Ask qualified Indonesian speakers to review complete multi-turn exchanges and translations, including refusal and consent language. | Named reviewer consent, review date, scope, and recorded corrections; do not claim “native-checked” before then. |
| Care advice and acute routing lack professional validation. | Request a dementia-care professional to review the narrow communication guidance and escalation wording. | Reviewer, credentials or role, date, reviewed scenarios, and unresolved concerns recorded; this would not itself imply clinical certification. |
| The role comparison is a single run per role-language pair. | Repeat the same fictional case across runs and inspect whether role differences persist without adding unsupported facts. | Versioned snapshots, repeated samples, failure definitions, and human review; current one-sample comparison is not a reliability claim. |
| Current model and browser samples are small and single-run. | Repeat fixed cases across multiple runs and add more long-history, multilingual, refusal, and safety scenarios. | Versioned inputs, prompts, settings, raw outputs, failure definitions, and denominators reported together. |
| The public demo has been checked only with single requests. | Run a ten-turn session, the family summary and export on the public demo and on a physical phone. | Dated browser record from the public URL. |
| External reviews are not documented and student contributions need confirmation. | Ask each student to confirm their contribution and review the report; retain teacher/AI assistance accurately. | Student-approved contribution statements plus documented human reviews. |

## 8. Conclusion

CareBridge is a focused attempt to make everyday dementia-care communication more respectful, multilingual, and faithful to what people actually reported. Its U1, U2, and U3 designs target different needs: immediate wording, concise observation and handover, and factual family updates. The local experiments moved from a general baseline through five prompt versions and used failures—an invented time, an invalid clarification, inferred consent, and inaccurate handover details—to guide changes.

The evidence is promising only within its tested scope. There were 109 direct model runs and 40 real-model browser turns, but single samples do not establish reliability; even the final Terra/medium/V5 session had an omitted outcome and a phrase requiring review. The service should therefore remain a communication aid with human confirmation, fictional demonstrations, and clear non-medical boundaries. The three-role comparison has one local sample per role-language pair. A separate final-configuration English conversation exercised all three roles. A public demo is available; specialist and language reviews remain pending.

## 9. Team contributions and project links

- **Team:** Empathy Weavers (High School). Names and role areas are on the team slide and are kept out of this public repository; students must confirm their contributions.
- **Teacher/advisor contribution:** none recorded.
- **AI assistance:** project records state that Codex agents simulated a fictional user/browser run and performed an independent AI review; the primary agent implemented and checked changes. Students should verify this account and add their own contributions before submission.
- **Live chatbot:** [https://carebridge-neon.vercel.app](https://carebridge-neon.vercel.app), checked 2026-11-27.
- **Final-edition conversation history:** [Transcript on GitHub](https://github.com/Sutdents-Project-Hub/CareBridge/blob/main/docs/source/waicy-submission/live-session-2026-11-27/live-conversation.md). It contains 20 exchanged messages from the public demo, operated by an AI testing agent on 2026-11-27.
- **Three-profile same-case Terra/medium/V5 comparison:** locally tested with nine model snapshots and accepted prefilled-draft UI flow.

## 10. References

References are presented in APA-style form. Public sources informed design and submission requirements; none constitutes product certification. Web sources accessed 23 November 2026 unless a publication date is shown.

1. World Artificial Intelligence Competition for Youth. (2026). *WAICY 2026 Guidebook* (LLM & AI Agent Track, pp. 19–22). https://waicy-cdn.wholeren.cn/wp-content/uploads/2026/10/WAICY-2026-Guidebook-2.pdf
2. World Artificial Intelligence Competition for Youth. (2026). *WAICY 2026 rubrics: Large Language Models*. https://www.waicy.org/rubrics/
3. World Artificial Intelligence Competition for Youth. (2026). *WAICY 2026 project submission form*. https://www.waicy.org/2026-submission/
4. National Institute on Aging. (n.d.). *Communicating with someone who has Alzheimer's disease*. https://www.nia.nih.gov/health/alzheimers-changes-behavior-and-communication/communicating-someone-who-has-alzheimers
5. National Institute on Aging. (2026, July 22). *Do's and don'ts: Communicating with a person who has Alzheimer's disease*. https://www.nia.nih.gov/health/alzheimers-changes-behavior-and-communication/dos-and-donts-communicating-person-who-has
6. Taichung City Government, Health Bureau. (2026, June 10). *失智症溝通原則（含英文、印尼文、越南文）* [Dementia communication principles, including English, Indonesian, and Vietnamese]. https://www.health.taichung.gov.tw/26198/1614263/1617544/1620768/1679215/3296048
7. World Health Organization. (2019). *iSupport for dementia: Training and support manual for carers of people with dementia*. https://www.who.int/publications/i/item/9789241515863
8. Alzheimer’s Association. (n.d.). *Communication*. https://www.alz.org/help-support/caregiving/daily-care/communications
9. OpenAI. (n.d.). *GPT-6.1 Terra model*. https://developers.openai.com/api/docs/models/gpt-6.1-terra
10. OpenAI. (n.d.). *GPT-6 Luna model*. https://developers.openai.com/api/docs/models/gpt-6-luna
11. OpenAI. (n.d.). *Reasoning models: Controlling costs*. https://developers.openai.com/api/docs/guides/reasoning#controlling-costs
12. CareBridge project team. (2026, November 23). *WAICY iteration record and evidence log* [Internal project records, not published]. See `docs/waicy-iteration-record.md`, `docs/evidence-log.md`, and the local evidence archive `docs/source/waicy-evidence/2026-11-23/`.

13. Ministry of Health and Welfare, Taiwan. (2024, March 21). *Taiwan community dementia epidemiology survey results* [English translation of the Chinese title, updated October 31, 2025]. https://www.mohw.gov.tw/cp-6653-78102-1.html
14. Ministry of Labor, Taiwan. (2026). *Foreign workers in Taiwan by various type and nationality, end of October 2026* (Table 12-5, p. 229). Retrieved November 23, 2026, from https://statdb.mol.gov.tw/html/mon/212050.pdf

---

# Registration Brief (separate from the report; 200-word maximum)

**Word count: 139 (whitespace-separated)**

CareBridge is a multilingual web advisor for everyday dementia-care communication. It helps caregivers find respectful words, asks for missing context, and helps family members organize reported events, actions, outcomes, and unknowns into a handover draft for human review. The interface opens in English and also offers Traditional Chinese and Indonesian conversations. New caregivers get practical wording, experienced caregivers get handover priorities, and family members get help checking facts. We refined five prompt versions using fictional cases and documented failures such as an invented time, an invalid clarification, inferred consent, and a misattributed action. Our local evaluation includes 109 direct model runs, a controlled three-role comparison in three languages, and a final 10-turn English conversation. CareBridge supports communication and directs medical or urgent questions to qualified help. A public demo is live at https://carebridge-neon.vercel.app; specialist and language reviews are pending.
