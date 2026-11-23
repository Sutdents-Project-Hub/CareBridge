# WAICY Research Notes and Data Provenance (2026-11-23)

This note distinguishes published or official statistics from CareBridge's own project evidence. Sources were checked on 2026-11-23 unless an item says otherwise. Brief excerpts are included only to identify the supporting claim; consult the linked source for full context.

## External statistics and background used in the current deck

| Deck claim / topic | Source and what it supports | Evidence type and limits |
|---|---|---|
| In 2021, 57 million people worldwide were living with dementia; nearly 10 million new cases occur each year. | WHO's *Dementia* fact sheet says both. | Official global estimates. Keep the 2021 reference year attached to the 57 million figure. The fact sheet was updated 2026-10-26. |
| Informal carers provide an average of five hours of care and supervision per day. | The same WHO fact sheet reports this under its cost estimate for 2019. | The five-hour figure is a global average reported in a 2019 context, not a 2021 measure and not a Taiwan-specific statistic. |
| Taiwan has about 350,000 people with dementia (2024 estimate); 7.99% of community-dwelling adults aged 65+ have dementia. | MOHW's 2024 survey release reports 7.99% among community-dwelling adults aged 65+ and estimates about 350,000 people aged 65+ for 2024 using survey prevalence and population projections. | Primary government source. The percentage is a survey estimate based on 2020–2023 fieldwork across 22 cities/counties; the population count is modeled, not a registry count. The 2024 MOHW annual report later estimates 354,586 people for the end of 2024, of whom 239,720 were recorded as diagnosed. If the deck uses “about 350,000,” label it as the 2024 MOHW estimate, not as a direct count. |
| Migrant caregivers are a substantial part of Taiwan's care workforce; many come from Indonesia. | An earlier deck draft cited a 2026 Taipei Times commentary reporting one in four migrant workers in the care sector and 82% of migrant care workers from Indonesia, attributed generally to MOL. The October 2026 MOL table reports 926,202 foreign workers in total and 241,800 social-welfare foreign workers; within that category, 201,177 are Indonesian. | Use the primary MOL table and explicitly label the category and date. On the MOL table's “social welfare” denominator, 201,177 / 241,800 = 83.2%; on the narrower “family nursing” denominator, 188,424 / 216,193 = 87.2%. “One in four” is approximately 26.1% if calculated as all 241,800 social-welfare workers divided by all 926,202 foreign workers. These data count migrant workers by occupation and nationality, not dementia caregivers. |
| A 94.3% figure for migrant caregivers needing dementia-care instruction. | A 2020 Taipei Times report attributes this result to a 2019 study by Chen Cheng-fen (陳正芬), saying respondents reported needing instruction on caring for people with dementia. | Secondary report. The article does not state the sample size, sampling frame, survey instrument, or uncertainty for 94.3%. Do not present it as a representative prevalence estimate or imply all migrant caregivers need the same support. If retained, describe it explicitly as a reported 2019 study finding and disclose that the article omits the denominator and sampling details. |
| Dementia literacy and caregiver burden among Indonesian caregivers in Taiwan. | Widiyaningsih and Chiu's 2025 conference abstract reports a cross-sectional convenience sample of 250 Indonesian caregivers interviewed in Taiwan from June to December 2024. | Primary study abstract in *Alzheimer’s & Dementia*. It reports mean dementia-literacy score 72.29 (SD 13.82) and mean Zarit Burden Interview score 30.48 (SD 16.44), with associations in this sample. It is not a probability sample and cannot be generalized to all Indonesian or migrant caregivers. The abstract mentions language barriers in its background but does not establish language as a measured predictor. |
| Foreign caregivers may face limited Mandarin fluency or specialized training. | An earlier deck uses a 2026 Taiwan Business TOPICS statement by Fulco. The live article returned HTTP 403 during this review; the citation was recovered from the archived slide bibliography. | Secondary, non-quantitative reporting. Do not turn this sentence into a measured rate or imply it applies to every caregiver. Use a qualified attribution or remove it if the deck lacks room for context. |

## Data and source corrections to apply to the slide deck

1. Replace the prior “82%” with the explicitly defined October 2026 social-welfare category figure: 83.2% Indonesian (201,177 of 241,800). Do not describe this as the share of dementia caregivers. The narrower family-nursing subset is 87.2% (188,424 of 216,193), but do not switch categories without explaining the denominator.
2. Omit the 94.3% claim from the deck. The newspaper report gives no sample size or sampling method, so this statistic is weak support for a broad population claim. If retained in a later version, label it as an incompletely documented report of a 2019 study, not a representative estimate.
3. Prefer the MOHW primary source for Taiwan's 7.99% and population estimate. Distinguish the 2024 survey-based estimate (~350,000) from the later annual-report estimate of 354,586 at the end of 2024 and the 239,720 diagnosed cases. Do not label estimates as confirmed diagnoses.
4. Keep WHO's 2021 global population figure separate from its five-hours-per-day 2019 caregiver estimate.
5. Treat the 250-person study as a small cross-sectional convenience sample. It is not evidence that CareBridge improves caregiver literacy or outcomes.

## CareBridge project evidence (not external population research)

The current slide deck and repository materials refer to project counts and tests such as 109 direct model experiments, 40 browser turns, 20 automated tests, six of six safety routes, model comparisons, three-language/three-role examples, and a ten-round exchange. These are internal project evidence, not population statistics. The repository record and evidence log are the source of truth; do not add, reinterpret, or imply a pass rate beyond the recorded denominator and test conditions.

The fresh English final-configuration conversation was captured on 2026-11-23 in Chromium and passed 10/10 turns using OpenAI `gpt-6.1-terra` / medium effort / V5; it contains 20 messages across three role settings with the same fictional case. It was tested locally; the read-only transcript is available from the project repository. The HTML and JSON exports are [`final-english-conversation.html`](source/waicy-submission/english-evidence-2026-11-23/final-english-conversation.html) and [`final-english-conversation.json`](source/waicy-submission/english-evidence-2026-11-23/final-english-conversation.json). The [English transcript](source/waicy-submission/english-evidence-2026-11-23/final-english-conversation.md) provides a judge-facing reading view on GitHub. Preserve earlier AI-simulated-user material as archived evidence; do not present that older material as this new final-edition conversation. There is no standalone hosted chatbot yet, so its public URL remains pending. Team identity and contribution details also remain pending confirmation. The local capture does not establish an externally accessible chatbot or a competition submission.

The editable 30-slide deck is a private Claude Slides artifact. Its source backup is kept locally at `docs/source/waicy-submission/deck-source/` and is excluded from version control. This repository note records source-check results; it does not assert that the private deck was edited or published.

## Estimates and inferences

The current deck does not use a CareBridge-generated estimate of target-user population. Any future market-size or user-count estimate needs its own method, assumptions, date, and explicit “estimate” label. Calculations in the table above (83.2%, 87.2%, and 26.1%) are arithmetic derived from the cited MOL counts and are labeled as such; they are not separately published MOL rates.

## WAICY requirements cross-check

The official LLM & AI Agent Track guide requires one PDF and includes: a specific AI service, at least three meaningfully different user profiles, motivation, a chat-history link with at least 10 exchanged messages with the final assistant, a live chatbot link, the iterative process, limitations, future development, conclusion, and recognized-style references. A ten-turn exchange containing 20 individual messages exceeds the stated minimum; “ten turns” is a project preparation choice, not the wording of the rule. The submission form separately limits the registration brief description to 200 words and asks for one publicly accessible Google Drive project-folder link. See the official guide and form in the references below.

The guidebook says participants are teams of 1–5 members under age 18; the WAICY 2026 webpage says students ages 6–18, and the form asks for K–12 grade. Those published descriptions are not perfectly aligned. Confirm the team's eligibility from official organizer guidance rather than inferring it from the form field or repeating an unverified age rule.

The official rubric currently uses the seven criteria and point values reproduced in [`waicy-rubric-map.md`](waicy-rubric-map.md). Rubric alignment is not a score prediction or an official judging result.

## Sources (APA-style; original titles retained)

Centers for Disease Control and Prevention. (2026, May 19). *Signs and symptoms of stroke*. https://www.cdc.gov/stroke/signs-symptoms/

El Rahman, V. (2026, February 12). Taiwan is losing its appeal to migrants. *Taipei Times*. https://www.taipeitimes.com/News/editorials/archives/2026/02/12/2003852174

Fulco, M. (2026, May 18). Taiwan’s super-aged society amplifies dementia challenges. *Taiwan Business TOPICS*. https://topics.amcham.com.tw/2026/05/taiwans-super-aged-society-amplifies-dementia-challenges/

Ministry of Health and Welfare, Taiwan. (2024, March 21; updated 2025, October 31). *衛生福利部公布最新臺灣社區失智症流行病學調查結果* [MOHW announces results of Taiwan's latest community dementia epidemiology survey]. https://www.mohw.gov.tw/cp-6653-78102-1.html

Ministry of Health and Welfare, Taiwan. (2025). *2024 臺灣高齡健康與長照服務年報* [2024 Annual Report on Aging and Long-Term Care in Taiwan], Table 21. https://www.mohw.gov.tw/dl-101009-fdb65b5b-a402-40ea-a507-4b57e44db29c.html

Ministry of Labor, Taiwan, Workforce Development Agency. (2026). *Table 12-5: Foreign workers in Taiwan by various type and nationality, end of October 2026* (p. 229). Retrieved November 23, 2026, from https://statdb.mol.gov.tw/html/mon/212050.pdf. The table rolls forward by month; use the [official bulletin index](https://www.mol.gov.tw/1607/71771/72772/72774/statisticalReportList) to identify the edition.

National Institute on Aging. (2026, July 22). *Infographic: Do’s and don’ts: Communicating with a person who has Alzheimer's disease*. https://www.nia.nih.gov/health/alzheimers-changes-behavior-and-communication/dos-and-donts-communicating-person-who-has

National Institute on Aging. (n.d.). *Communicating with someone who has Alzheimer’s disease*. Retrieved November 23, 2026, from https://www.nia.nih.gov/health/alzheimers-changes-behavior-and-communication/communicating-someone-who-has-alzheimers

Taipei Times. (2020, July 13). Immigrant workers: Taipei launches training program for migrant caregivers to boost job skills. https://www.taipeitimes.com/News/taiwan/archives/2020/07/13/2003739836

Widiyaningsih, & Chiu, H. L. (2025). Dementia literacy on foreign caregivers and the impact of care burden [Conference abstract]. *Alzheimer’s & Dementia, 21*(Suppl. 4), e097972. https://doi.org/10.1002/alz.70858_097972

World Health Organization. (2019). *iSupport for dementia: Training and support manual for carers of people with dementia*. https://www.who.int/publications-detail-redirect/9789241515863

World Health Organization. (2026, October 26). *Dementia*. https://www.who.int/news-room/fact-sheets/detail/dementia

World Artificial Intelligence Competition for Youth. (2026). *WAICY 2026 guidebook* (LLM & AI Agent Track, pp. 19–22). https://waicy-cdn.wholeren.cn/wp-content/uploads/2026/10/WAICY-2026-Guidebook-2.pdf

World Artificial Intelligence Competition for Youth. (2026). *WAICY 2026 rubrics*. Retrieved November 23, 2026, from https://www.waicy.org/rubrics/

World Artificial Intelligence Competition for Youth. (2026). *WAICY 2026 project submission*. Retrieved November 23, 2026, from https://www.waicy.org/2026-submission/
