# WAICY Track 4 Rubric Map (32-slide deck, v2)

**Status:** Self-assessment only; this is not a predicted score or an official judging result.

**Deck:** Private Claude Slides artifact (32 slides). The editable source backup is stored locally in `docs/source/waicy-submission/deck-source/` and is excluded from version control. A review PDF was exported from the same source and kept outside the repository; the team still needs to inspect the deck in Claude Slides and export the final PDF.

The official WAICY 2026 LLM rubric lists the criteria and maximum points below. Check the live rubric again before submission in case it changes.

| Official criterion (maximum) | Deck slides | Evidence currently represented | Remaining gap / status |
|---|---:|---|---|
| Specific AI Service (25) | 7–15 | Service definition and boundaries; three users with different needs; same-scenario answers from the live app; three languages with Traditional Chinese references; five-field family summary; fixed safety rules; architecture. | Public chatbot link is still a placeholder on slide 24. Real-phone and private-window review are not done. |
| Iterative Development (25) | 16–23 | Five-step loop; idea evolution by commit; Baseline–V5 table; 109-run graphic; four documented errors (problem, fix, retest, what remains); model and effort selection; final 10-turn English session (20 messages) using V5 / `gpt-6.1-terra` / medium. | Single-sample evidence; the final session used a simulated user. Repeated runs and a real-caregiver study are future work. |
| Motivation & Problem Statement (10) | 2–6 | Scene hook; WHO, Alzheimer's Association and CDC scale data; Norwegian qualitative study and ADI survey on language and understanding; published LLM-for-caregiver studies; our own baseline failures. | Evidence is mainly international but includes small studies and abstracts (see research notes). A student-origin story is not confirmed. |
| Limitations & Considerations (10) | 14, 25–26 | Accuracy and hallucination, unreviewed language, evidence scope, no clinical review of safety rules, privacy, dignity, over-reliance, accessibility. | Formal accessibility and bias audits are pending. |
| Future Development & Clear Reference (10) | 27–28, 30–32 | Limitation → next step → required evidence table; conclusion; APA references in three slides. | Innovation claims are conservative. Verify every reference in the final PDF. |
| Presentation & Communication (10) | All | Lesson Plan theme, progress track, one idea per slide, real screenshots, layout filled to the page height. | Visual review in Claude Slides and in the final PDF is still the team's job. |
| Originality & Creativity (10) | 6, 9–10, 13, 20–21 | “Fluent ≠ faithful” framing; three roles on the same scenario; the “later is not consent” rule; five-field, user-confirmed summary. | Student contributions are unconfirmed (placeholder on slide 29). |

## Official Track 4 submission requirements

| Required element | Current slide(s) / state |
|---|---|
| Specific AI service | 7–8 |
| At least three meaningfully different user profiles | 9–10 |
| Motivation | 2–6 |
| Link to chat history with at least 10 exchanged messages with the final assistant | Slides 23–24; the [English transcript](source/waicy-submission/english-evidence-2026-11-23/final-english-conversation.md) has 20 messages and is linked on slide 24. |
| Live chatbot link for judge interaction | Slide 24 placeholder; public link pending. |
| Iterative design process | 16–22 |
| Limitations | 25–26 |
| Future development | 27 |
| Conclusion | 28 |
| Recognized-style references | 30–32 |

The submission form separately limits the brief description to 200 words and requires a Google Drive project-folder link accessible to everyone. There is no standalone hosted chatbot yet; its public link and the final private-window access check remain pending.

## Recorded deck review

- Offline Playwright render of all slides, with visual checks and fixes for upper-page whitespace, card overflow and clipping, on the v1 and v2 decks. Screenshots and connector lines are not drawn in that preview, so image sizes were checked by calculation.
- A review PDF (32 pages, 16:9, fonts Fredoka and Andika embedded) was rendered from the deck source with local screenshots and about 15 pages were inspected by eye. This is not the Claude Slides export; layout can differ slightly.
- No automated color-contrast scan was done. The only live link on the slides is the GitHub transcript link, which the project record says returned HTTP 200 signed out on 2026-11-23.

## Official sources

- [WAICY 2026 Rubrics](https://www.waicy.org/rubrics/) — LLM track criteria, as checked 2026-11-23.
- [WAICY 2026 Guidebook, LLM & AI Agent Track (PDF)](https://waicy-cdn.wholeren.cn/wp-content/uploads/2026/10/WAICY-2026-Guidebook-2.pdf) — track requirements, message-history minimum, and folder/file naming.
- [WAICY 2026 Project Submission form](https://www.waicy.org/2026-submission/) — 200-word brief and public Google Drive folder link.
