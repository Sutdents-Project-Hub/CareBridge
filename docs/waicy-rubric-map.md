# WAICY Track 4 Rubric Map (39-slide deck)

**Status:** Evidence map for the report editor.

The [production handoff](waicy-deck-handoff.md) was applied to the deck on 2026-11-28. Page numbers below refer to the revised 39-slide report.

**Deck:** Private Claude Slides artifact (39 slides). The editable source backup is stored locally in `docs/source/waicy-submission/deck-source/` and is excluded from version control. A review PDF was rendered from the same source and kept outside the repository.

The official WAICY 2026 LLM rubric lists the criteria and maximum points below. Check the live rubric again before submission in case it changes.

| Official criterion (maximum) | Deck slides | Evidence currently represented | Remaining gap / status |
|---|---:|---|---|
| Specific AI Service (25) | 9–18 | Service definition and boundaries; three users with the factors the AI considers; same-question replies; three languages; family summary; safety rules; architecture; quoted prompt layers. | Real-phone review is not done. |
| Iterative Development (25) | 19–31 | Five-step loop; commit history; Baseline–V5 table; three iteration pages with quoted prompt additions, verbatim outputs and error analysis; four documented errors; originality; model selection; 10-turn session; live test steps. | No score table in the report: the [60-output review](waicy-evidence/shared-case-review.md) is an Agent annotation; add a table after members score the outputs. The linked session was Agent-operated; a team-operated conversation is still needed. |
| Motivation & Problem Statement (10) | 3–8 | Team motivation supplied by a member (slide 3); fictional test scene; international scale data; language and understanding studies; LLM-for-caregiver studies; our baseline results. | The team should be able to explain the motivation in Q&A. |
| Limitations & Considerations (10) | 16, 32–33 | Accuracy, language, evidence scope, safety rules, privacy, dignity, unintended harm, access and bias. | Formal accessibility and bias audits are pending. |
| Future Development & Clear Reference (10) | 34–35, 37–39 | Limitation, next step and required evidence; conclusion; APA references, each cited in the body. | Click every reference in the final PDF. |
| Presentation & Communication (10) | All | Overview slide with QR code, progress track, real screenshots, team slide. | The team still reviews the final PDF and rehearses Q&A; all five member photos are in the report. |
| Originality & Creativity (10) | 8, 11–12, 16, 18, 27 | “Fluent ≠ faithful”; three jobs for one care moment; “later is not consent”; checked reply fields; user-confirmed summary. | Team confirms individual contributions. |

## Official Track 4 submission requirements

| Required element | Slide(s) |
|---|---|
| Specific AI service | 9–10 |
| At least three meaningfully different user profiles | 11–12 |
| Motivation | 3–8 |
| Link to at least 10 messages exchanged by the entrant and final assistant | 2, 29–31 (link currently points to the Agent-operated session; replace with the [team recording](waicy-team-conversation.md)) |
| Live chatbot link | 1, 2, 31 (https://carebridge-neon.vercel.app) |
| Iterative design process | 19–26, 28 |
| Limitations | 32–33 |
| Future development | 34 |
| Conclusion | 35 |
| Recognized-style references | 37–39 |

The submission form separately limits the brief description to 200 words and requires a Google Drive project-folder link accessible to everyone; the folder is still to be created.

## Recorded deck review

- 2026-11-27: offline Playwright render of all 36 slides with an automated overflow check and visual inspection; fixes were applied for overlaps. This is not the Claude Slides export, so layout can differ slightly.
- Live-demo and QR-code checks are in [Evidence Log, Section N](evidence-log.md#section-n-public-demo-check-2026-11-27); the QR code on the rendered page decoded to the demo URL.
- At the project owner’s request the report PDF carries no AI-assistance wording; the separate [AI-use statement](waicy-ai-use-statement.md) holds the disclosure and the owner decides how to submit it.
- No automated color-contrast scan was done.
- 2026-11-28: the revised 39-slide deck (later reduced to 38 slides in artifact version 25) was rendered with the same offline pipeline; the automated overflow check passed apart from the intentional cover panel. New screenshots were captured from the public demo.

## Official sources

- [WAICY 2026 Rubrics](https://www.waicy.org/rubrics/) — LLM track criteria, as checked 2026-11-23.
- [WAICY 2026 Guidebook, LLM & AI Agent Track (PDF)](https://waicy-cdn.wholeren.cn/wp-content/uploads/2026/10/WAICY-2026-Guidebook-2.pdf) — track requirements, message-history minimum, and folder/file naming.
- [WAICY 2026 Project Submission form](https://www.waicy.org/2026-submission/) — 200-word brief and public Google Drive folder link.
