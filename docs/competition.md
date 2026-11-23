# CareBridge at WAICY 2026

CareBridge enters Track 4, **LLM & AI Agent**, under the **AI as a Service** theme. It serves everyday dementia care conversations across three profiles. New caregivers need words they can use now. Experienced caregivers need concise observation and handover priorities. Family members need to verify what happened and what remains unknown.

## English demo

1. Open `/` to show the English home page, then choose **Compare roles**. The three cards are saved replies to the same fictional question. The language picker gives access to the independently captured Traditional Chinese and Indonesian sets.
2. Choose **Try this role** on the new caregiver card. In the new tab review the prefilled question, click **Send**, and wait for the live reply. Point out the respectful phrase and the optional Traditional Chinese reference.
3. Ask a follow-up about the older adult’s choice or what to verify at handover. In **Family summary**, enter the known facts, leave the outcome empty, and confirm the English preview before copying. The outcome stays **To confirm**. Traditional Chinese headings are available without changing the entered wording.
4. For a limits example, open a new tab and submit the fictional medication question shown in the visual evidence. The preset notice directs the user to a doctor or pharmacist. The live conversation can be exported as readable HTML or JSON.

The saved role responses and English screenshots can support the explanation during connection trouble. Verify the live service independently before submitting.

## Judge materials

- [Editable English report and short registration description](waicy-submission-draft.md) · [English report PDF draft](source/waicy-submission/LLM_High_CareBridge_DRAFT.pdf)
- [English visual evidence PDF](source/waicy-submission/english-evidence-2026-11-23/CareBridge-WAICY-English-Visual-Evidence.pdf) · [Original English PNGs](source/waicy-submission/english-evidence-2026-11-23/screenshots)
- [Final-configuration English transcript](source/waicy-submission/english-evidence-2026-11-23/final-english-conversation.md) · [JSON export](source/waicy-submission/english-evidence-2026-11-23/final-english-conversation.json)
- [Iterative development](waicy-iteration-record.md) · [Test plan](evaluation-plan.md) · [Test cases](evaluation-cases.md) · [Evidence and remaining limitations](evidence-log.md)
- [Care guidance sources](knowledge-sources.md) · [Research and statistics sources](waicy-research-notes.md) · [Rubric map](waicy-rubric-map.md)

An earlier [multilingual walkthrough](source/waicy-submission/demo-capture-2026-11-23/CareBridge-WAICY-Visual-Evidence.pdf) records the previous UI. The English visual evidence above is the current competition version.

## Official requirements

The guidebook specifies English as the competition language and requests one PDF covering the service, at least three meaningfully different user profiles, motivation, iterative design and testing, limitations, future development, conclusion, and references using a recognized citation style. Put the **interactive chatbot link** and **final-assistant conversation link** in that PDF. The guidebook requires at least ten exchanged messages. The project prepares ten complete question–answer turns as a conservative count. The rubric assigns 25 points each to Specific AI Service and Iterative Development. [WAICY guidebook, pp. 19–23](https://waicy-cdn.wholeren.cn/wp-content/uploads/2026/10/WAICY-2026-Guidebook-2.pdf#page=20) · [WAICY rubric](https://www.waicy.org/rubrics/)

The submission form requests a description of at most 200 words and an accessible Google Drive folder. It lists November 29, 2026 at 5:00 p.m. EST as the deadline, which is November 30 at 6:00 a.m. in Taiwan. Confirm the team’s eligibility and form group before using `LLM_Category_CareBridge.pdf` and the corresponding folder name. The draft uses `High` provisionally. [WAICY submission form](https://www.waicy.org/2026-submission/) · [Guidebook naming instructions](https://waicy-cdn.wholeren.cn/wp-content/uploads/2026/10/WAICY-2026-Guidebook-2.pdf#page=23)

## Before submitting

- [ ] Confirm team eligibility, English names, grades, and individual contributions. Record teacher and AI assistance accurately.
- [ ] Deploy the chatbot and submit a fictional question in a signed-out browser.
- [ ] Insert the verified chatbot link beside the conversation link, then check the final PDF and registration description.
- [ ] Verify the Google Drive folder and PDF permissions in a signed-out browser, and keep the form confirmation.

The English 32-slide Lesson Plan deck (v2) uses mainly international evidence and the English-first screenshots; its editable backup is local and a review PDF was rendered outside the repository. Use the [rubric map](waicy-rubric-map.md) and [research notes](waicy-research-notes.md) for the remaining checks. The team must still inspect the deck in Claude Slides, fill the placeholders (team, live chatbot URL, QR code) and export the final report PDF.

## Likely judging questions

- **How do the three roles differ?** Start from the same question and show how the saved replies prioritize wording, handover, or fact-checking.
- **What changed between versions?** Show an invented time, a malformed clarification, and a misattributed event. Follow each with the prompt change, actual retest, and remaining error.
- **What are the limits?** Show the human-confirmed summary, the preset safety notice, and the remaining clinician and native-speaker reviews.
- **What did the students do?** Use the team-confirmed contributions and describe the role of AI assistance.
