# WAICY Track 4 Rubric Map (30-slide deck)

**Status:** Self-assessment only; this is not a predicted score or an official judging result.

**Deck:** Private Claude Slides artifact. Its editable source backup is stored locally in `docs/source/waicy-submission/deck-source/` and is excluded from version control. Slide numbers below refer to that artifact; they preserve the team's current slide references and do not imply publication or a PDF export.

The official WAICY 2026 LLM rubric currently lists the criteria and maximum points below. Check the live rubric again before submission in case it changes.

| Official criterion (maximum) | Deck slides | Evidence currently represented | Remaining gap / status |
|---|---:|---|---|
| Specific AI Service (25) | 6–14 | Service definition and boundaries; three users with differentiated needs; same-scenario responses; three languages with Traditional Chinese references; five-field family-summary draft; safety rules; architecture. | Public chatbot link is still a placeholder on slide 23. Real-phone and private/incognito review have not been completed. |
| Iterative Development (25) | 15–23 | Official five-step loop; prompt/version evolution; Baseline–V5 table; 109-run experiment graphic; four documented errors with problem, change, retest, and remaining issue; model selection. The fresh local English Chromium capture (Nov. 23, 2026) has 10 turns / 20 messages, uses V5 with OpenAI `gpt-6.1-terra` / medium reasoning across three role settings on one fictional case, and passed 10/10 turns. | The listed tests are single-sample evidence and are not generalizable pass rates. Archive older AI-simulated-user chat evidence separately. The [English transcript](source/waicy-submission/english-evidence-2026-11-23/final-english-conversation.md) can be added to slides 22–23. |
| Motivation & Problem Statement (10) | 2–5 | Scenario hook, WHO and Taiwan context, migrant-caregiver context, and a baseline failure example. | Some statistics were secondary reporting and need the source/denominator corrections recorded in [`waicy-research-notes.md`](waicy-research-notes.md). A student-origin motivation story has not been confirmed. |
| Limitations & Considerations (10) | 13, 24–25 | Accuracy and hallucination risks, unreviewed language output, evidence limits, lack of clinical review, privacy, dignity, over-reliance, and accessibility. | The app has keyboard and viewport checks. Formal accessibility and bias audits remain pending. |
| Future Development & Clear Reference (10) | 26–27, 29–30 | Limitations-to-next-steps/evidence table; conclusion; 18 APA references. | Innovation claims are intentionally conservative; speech and additional languages are proposals. Conclusion could include a confirmed student perspective. Verify every reference, source language/title, and claim against the final exported PDF. |
| Presentation and Communication (10) | All | Lesson Plan visual theme, progress track, one main point per slide, and screenshots. | Deck notes report offline Playwright rendering and visual inspection of about 22 of 30 slides, with fixes for spacing, card overflow, and clipping. Screenshot images/connector lines were not present in that preview, and the fallback font may affect line breaks. Claude Slides visual review and final PDF inspection remain outstanding. |
| Originality & Creativity (10) | 5, 8–9, 12, 20 | “Fluent ≠ faithful” framing; three user profiles on the same scenario; the “later” is not consent rule; five-field, user-confirmed summary. | Student contributions remain unconfirmed (placeholder on slide 28). Make the students' own work clear and separate it from advisor and AI-tool contributions. |

## Official Track 4 submission requirements

The official guide requires one PDF containing the following; the slide numbers are the current mapping, not proof that the required evidence is complete.

| Required element | Current slide(s) / state |
|---|---|
| Specific AI service | 6–7 |
| At least three meaningfully different user profiles | 8–9 |
| Motivation | 2–5 |
| Link to chat history with at least 10 exchanged messages with the final assistant | The [English transcript](source/waicy-submission/english-evidence-2026-11-23/final-english-conversation.md) contains 20 messages from the locally tested final configuration. |
| Live chatbot link for judge interaction | Slide 23 placeholder; public link pending. |
| Iterative design process | 15–21 |
| Limitations | 24–25 |
| Future development | 26 |
| Conclusion | 27 |
| Recognized-style references | 29–30 |

The submission form separately limits the brief description to 200 words and requires a Google Drive project-folder link accessible to everyone. The fresh English conversation exports are local at [`final-english-conversation.html`](source/waicy-submission/english-evidence-2026-11-23/final-english-conversation.html) and [`final-english-conversation.json`](source/waicy-submission/english-evidence-2026-11-23/final-english-conversation.json). The [English transcript](source/waicy-submission/english-evidence-2026-11-23/final-english-conversation.md) is the judge-facing reading view. There is no standalone hosted chatbot yet; its public link and final incognito-access check remain pending.

## Recorded deck review (from the current project notes)

- A Playwright offline render of all 30 slides was reported, with about 22 slides visually inspected and fixes recorded for upper-page whitespace, card overflow (`scale-runs`, `family`), and cover-column clipping.
- Images and connector lines were absent from that preview; image-layout dimensions were checked by calculation. Review inside Claude Slides remains required.
- PDF export and rendered-PDF inspection were not performed in the recorded review. No live links existed to click-check. Automated color-contrast scanning was not done.
- The local presentation artifact remains private and has not been published or delivered as an official PDF.

## Official sources

- [WAICY 2026 Rubrics](https://www.waicy.org/rubrics/) — LLM track criteria, as checked 2026-11-23.
- [WAICY 2026 Guidebook, LLM & AI Agent Track (PDF)](https://waicy-cdn.wholeren.cn/wp-content/uploads/2026/10/WAICY-2026-Guidebook-2.pdf) — track requirements, message-history minimum, and folder/file naming.
- [WAICY 2026 Project Submission form](https://www.waicy.org/2026-submission/) — 200-word brief and public Google Drive folder link.
