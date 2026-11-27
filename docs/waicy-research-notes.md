# WAICY Research Notes and Data Provenance (2026-11-23)

This note distinguishes published or official statistics from CareBridge's own project evidence. Sources were checked on 2026-11-23 unless an item says otherwise. Brief excerpts are included only to identify the supporting claim; consult the linked source for full context.

## External evidence used in the current deck (international sources first; slide numbers in this table follow the earlier 32-slide order, add 1 for slides 3–6)

All items were checked on 2026-11-23 or 2026-11-24 from the cited pages. Brief excerpts identify the claim only.

| Deck claim (slide) | Source and what it supports | Evidence type and limits |
|---|---|---|
| 57 million people living with dementia (2021); nearly 10 million new cases a year; informal carers give about 5 hours of care and supervision a day (3) | WHO, *Dementia* fact sheet (page dated 2026-10-26). | Official global estimates; keep the 2021 reference year with the 57 million figure. The 5 hours figure is the fact sheet's own global average. |
| Nearly 12 million (11.475 million) US caregivers gave 19 billion hours of unpaid care in 2024, valued at $413.4 billion; 60% were employed and 57% of those went in late, left early or took time off (3) | Alzheimer's Association, *2025 Alzheimer's disease facts and figures: Executive summary* (text extracted from the PDF and read locally). | US nonprofit report built on published surveys. US-only. The 57% applies to the employed caregivers, as worded in the summary. |
| 18.3% of US adults (about 47 million) gave regular care to a friend or family member in the past 30 days (3) | Vahratian et al. (2026), NCHS Data Brief 576, 2025 National Health Interview Survey (95% CI 17.7–19.0). | US government survey. Covers caregiving for any health problem or disability, not dementia specifically. |
| About two-thirds of ~70,000 respondents in 155 countries think dementia is a natural part of ageing (4) | Alzheimer's Disease International (2019), *World Alzheimer Report 2019*; ADI news item (published 2019-09-01) analysed by LSE. | Large online attitudes survey of people with dementia, carers, practitioners and the public. Not a probability sample of any country; 2019 data. |
| Language and communication were “the most fundamental barrier” to adjusted dementia care; a shared language “does not guarantee understanding” (4) | Sagbakken, Ingebretsen & Spilker (2020), *PLOS ONE* 15(12): e0243803 (Norway): 9 focus groups with 51 older immigrants from 10 countries, 12 relatives, 27 health professionals. | Qualitative, one country. Quotes taken from the abstract and the first part of the paper; the author initials (M., R., R. S.) were not independently confirmed and should be checked in the final PDF. |
| 83.2% of Taiwan's migrant social-welfare workers are Indonesian (201,177 of 241,800) (4) | Taiwan Ministry of Labor, Table 12-5 (end of October 2026), as recorded earlier in this note; the percentage is our arithmetic. | Occupation-by-nationality counts, not dementia caregivers and not demand for CareBridge. The deck labels it “our calculation”. Only local context for the language choice. |
| Prompt-engineered ChatGPT-4o scored significantly higher on actionability, relevance and perceived satisfaction than the baseline; no significant difference in accuracy or in safety and harm (5) | Zhou, Zhu, Oh & Hong (2026), *JMIR Formative Research* 10: e79975: 32 caregiver questions, 64 responses, 12 content experts, 9 items on a 7-point scale. | Peer-reviewed, small expert panel, ChatGPT only. A machine-extracted numeric summary of the page was inconsistent on satisfaction, so the deck uses only the abstract's wording and no scores. The limitations section was not read verbatim. |
| Both ChatGPT versions were seen as overly verbose (5) | Oh et al. (2025), *Innovation in Aging* 9(Suppl. 2): igaf122.4109 — 12 stakeholders (10 health professionals, 2 caregivers). | Conference abstract in a supplement; no effect sizes. |
| General prompts led ChatGPT to ask follow-up questions; prompt-engineered replies did not (5) | Bennett et al. (2025), *Innovation in Aging* 9(Suppl. 2): igaf122.2254 — 15 ChatGPT responses. | Conference abstract; content analysis, no scores or tests reported. |

## Sources considered but not used

- AARP and National Alliance for Caregiving, *Caregiving in the U.S. 2025* (about 63 million family caregivers): search summaries agreed, but AARP blocked automated page fetches, so the figure was not verified from the page and is not in the deck.
- The v1 deck's Taiwan items (82% from a Taipei Times commentary, the 94.3% report, Fulco's Taiwan Business TOPICS statements, the 250-person Indonesian caregiver abstract, the MOHW 7.99% prevalence) were removed so the evidence is mainly international. The corrections recorded for them in this note's earlier version still apply if any of them return.
- Taiwan's projected dementia counts (470,000 by 2031; 880,000 by 2061) were attributed to different organisations by two articles and were never used.

## Verification gaps to close before submission

1. Open the final PDF and confirm every reference, including author initials for Sagbakken et al.
2. Optionally fetch the Alzheimer's Association full *Facts and Figures* report and the NCHS brief again to confirm the numbers against the primary pages.
3. Read the limitations section of Zhou et al. (2026) in full.
4. Replace the Ministry of Labor derived percentage with a direct citation of the table edition if the table rolls forward.

## CareBridge project evidence (not external population research)

The current slide deck and repository materials refer to project counts and tests such as 109 direct model experiments, 40 browser turns, 20 automated tests, six of six safety routes, model comparisons, three-language/three-role examples, and a ten-round exchange. These are internal project evidence, not population statistics. The repository record and evidence log are the source of truth; do not add, reinterpret, or imply a pass rate beyond the recorded denominator and test conditions.

The fresh English final-configuration conversation was captured on 2026-11-23 in Chromium and passed 10/10 turns using OpenAI `gpt-6.1-terra` / medium effort / V5; it contains 20 messages across three role settings with the same fictional case. It was tested locally; the read-only transcript is available from the project repository. The HTML and JSON exports are [`final-english-conversation.html`](source/waicy-submission/english-evidence-2026-11-23/final-english-conversation.html) and [`final-english-conversation.json`](source/waicy-submission/english-evidence-2026-11-23/final-english-conversation.json). The [English transcript](source/waicy-submission/english-evidence-2026-11-23/final-english-conversation.md) provides a judge-facing reading view on GitHub. Preserve earlier AI-simulated-user material as archived evidence; do not present that older material as this new final-edition conversation. A public demo was checked on 2026-11-27 (evidence log, Section N). Student contribution details still need confirmation. The local capture does not establish an externally accessible chatbot or a competition submission.

The editable 35-slide deck is a private Claude Slides artifact. Its source backup is kept locally at `docs/source/waicy-submission/deck-source/` and is excluded from version control. This repository note records source-check results; it does not assert that the private deck was edited or published.

## Estimates and inferences

The current deck does not use a CareBridge-generated estimate of target-user population. Any future market-size or user-count estimate needs its own method, assumptions, date, and explicit “estimate” label. Calculations in the table above (83.2%, 87.2%, and 26.1%) are arithmetic derived from the cited MOL counts and are labeled as such; they are not separately published MOL rates.

## WAICY requirements cross-check

The official LLM & AI Agent Track guide requires one PDF and includes: a specific AI service, at least three meaningfully different user profiles, motivation, a chat-history link with at least 10 exchanged messages with the final assistant, a live chatbot link, the iterative process, limitations, future development, conclusion, and recognized-style references. A ten-turn exchange containing 20 individual messages exceeds the stated minimum; “ten turns” is a project preparation choice, not the wording of the rule. The submission form separately limits the registration brief description to 200 words and asks for one publicly accessible Google Drive project-folder link. See the official guide and form in the references below.

The guidebook says participants are teams of 1–5 members under age 18; the WAICY 2026 webpage says students ages 6–18, and the form asks for K–12 grade. Those published descriptions are not perfectly aligned. Confirm the team's eligibility from official organizer guidance rather than inferring it from the form field or repeating an unverified age rule.

The official rubric currently uses the seven criteria and point values reproduced in [`waicy-rubric-map.md`](waicy-rubric-map.md). Rubric alignment is not a score prediction or an official judging result.

## Sources (APA-style; original titles retained)

Alzheimer’s Association. (2025). *2025 Alzheimer’s disease facts and figures: Executive summary*. https://www.alz.org/getmedia/c05f7ba4-9aea-4cb0-8898-5e8bff3f0930/executive-summary-2025-alzheimers-disease-facts-and-figures.pdf

Alzheimer’s Disease International. (2019). *World Alzheimer report 2019: Attitudes to dementia*. https://www.alzint.org/resource/world-alzheimer-report-2019/

Bennett, S., Fedorov, A., Chandler, R., Hepburn, K., & Epps, F. (2025). Prompt engineering and ChatGPT: Delivering quality information to dementia caregivers. *Innovation in Aging, 9*(Suppl. 2), igaf122.2254. https://pmc.ncbi.nlm.nih.gov/articles/PMC12761023/

Oh, K. M., Hong, S., Zhu, Z., Zhou, H., & Lee, J. A. (2025). Evaluating large language models to support dementia caregivers: Identifying opportunities for improvement. *Innovation in Aging, 9*(Suppl. 2), igaf122.4109. https://doi.org/10.1093/geroni/igaf122.4109

Sagbakken, M., Ingebretsen, R., & Spilker, R. S. (2020). How to adapt caring services to migration-driven diversity? A qualitative study exploring challenges and possible adjustments in the care of people living with dementia. *PLOS ONE, 15*(12), e0243803. https://doi.org/10.1371/journal.pone.0243803

Vahratian, A., Adjaye-Gbewonyo, D., & Rodriguez, J. (2026, November). *Adult caregivers in the United States, 2025* (NCHS Data Brief No. 576). https://www.cdc.gov/nchs/products/databriefs/db576.htm

Zhou, H., Zhu, Z., Oh, K. M., & Hong, S. R. (2026). Empowering informal caregivers of persons with early-stage dementia by large language models: Mixed methods evaluation. *JMIR Formative Research, 10*, e79975. https://doi.org/10.2196/79975

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
