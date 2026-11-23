# CareBridge｜WAICY 第 6 項迭代開發紀錄

- **實測日期** 2026-11-23（Asia/Taipei）
- **本機展示版本** `V5-2026-11-23` · OpenAI `gpt-6.1-terra` · `medium`
- **程式基準** `3c1e1b7`（測試開始）→ `be4ec39`（本輪實作與工程驗證）

本紀錄對應 WAICY Large Language Models 的 **Iterative Development**。它保留照護需求如何變成 Prompt、實際遇到什麼錯誤、哪一處程式或 Prompt 有調整，以及用相同輸入複測的結果。所有測試情境均為虛構。[WAICY 評分規準](https://www.waicy.org/rubrics/) · [WAICY 官方手冊，第 21 頁](https://waicy-cdn.wholeren.cn/wp-content/uploads/2026/10/WAICY-2026-Guidebook-2.pdf#page=21)

## 1. 起點與設計決策

CareBridge 聚焦失智照護的日常溝通。新手需要能直接說出口的句子，資深照護者需要觀察與交接重點，家屬需要分辨已通報事實、實際採取的行動與未知事項。介面及對話支援繁體中文、英文與印尼文。急況或用藥問題優先轉介真人。家屬可在本地五欄表單確認後複製摘要。[原始需求](requirements.md) · [AI 顧問設計](ai-advisor-design.md)

| 階段 | 實際形成的內容 | 證據 |
|---|---|---|
| 專案起點 | 建立角色、三語、風險界線、虛構測試案例與競賽驗收方案 | 初始提交 `74ac512`；[需求](requirements.md) 與 [案例](evaluation-cases.md) |
| Web MVP | 建立聊天、OpenAI Responses API、固定安全提示、五欄家屬摘要、JSON 匯出及初始評估入口 | 提交 `a43f560`；此階段的瀏覽器多輪以模擬供應商驗證 |
| 介面修訂 | 採 Lesson Plan 視覺，手機首屏可輸入，收合角色與回覆長度設定 | 提交 `3c1e1b7`；[介面驗證](evidence-log.md#h-lesson-plan-介面回歸2026-11-22) |
| 真實模型迭代 | 接通 Luna，逐題比對 Baseline 到 V5；依錯誤修正格式、語意、安全判斷與跨語操作 | 本文 §§2–5；`original/`、`revised/`、`candidate/` 與四次瀏覽器匯出 |
| 模型選擇與驗收 | 同題比較 Luna 的兩種推理強度和 Terra；採 Terra／medium，重跑十輪、六題安全路由和工程檢查 | 提交 `be4ec39`；`model-compare/`、`terra-session/`、`production-safety.json` |

表中的原始檔路徑以本機 `docs/source/waicy-evidence/2026-11-23/` 為起點。離線證據包採同樣結構，內附完整輸入、原始回答和索引。Git 追蹤本紀錄與程式碼，原始證據包另保存在本機。

## 2. Prompt 設計與固定比較

完整 Prompt 由 [prompts.ts](../web/src/lib/ai/prompts.ts) 保存。每份直接模型結果也保留當次整段 Prompt 及其 SHA-256。離線包中的 `development/prompts/` 另存六個版本原文，`development/advisor-change.patch` 保存本輪實作差異。

| 版本 | 本版加入的設計 | 實際觀察與帶進下一版的問題 |
|---|---|---|
| Baseline | 同一模型、相同輸入及基本角色／語言資料，專用 developer Prompt 留空 | C01 假設晚餐六點、還有半小時；C07 把情境當成幼童。 |
| V1 | 限定服務用途，要求日常口語、簡短句型與照護界線 | 有照護溝通方向；時間歸因、角色差異及重要資訊追問仍不足。 |
| V2 | 加入三角色、三語、繁中對照與資訊不足時追問 | C03 已有繁中對照；C15 雖提問，仍將使用者轉述的「已處理」說成確認事項。 |
| V3 | 加入已知／未知、避免補事實、明確求助及結構化輸出 | C01 不再直接給虛構時間；C09 的追問寫進句型欄，沒有通過正式回覆驗證。C05 的洗澡選項仍可能被理解成當天一定要做。 |
| V4 | 說清楚追問、建議和求助各需哪些欄位；保留拒絕選項；用藥交由真人 | C09 可顯示、C05 明示可不洗；多輪仍曾把「晚點」推定為意願，把提供毯子寫成已做。 |
| V5 | 加入原話與推論的實例、回報來源、不補時間，以及資深／家屬各自的優先內容 | C08 恢復明確交接點，C15 追問回報來源，C23 明確拒絕威嚇；固定歷史摘要仍曾補入未確認行動，繼續比較模型選項。 |

共同的 10 題為 C01、C03、C05、C07、C08、C09、C13、C15、C19、C21。六個版本均使用 `gpt-6-luna`、相同請求資料與預設推理強度，輸出上限 2,000 tokens、逾時 30 秒。逐檔比對請求及參數，版本之間的差異包含 Prompt，V3 起另加入相同的結構化回覆格式。這組比較用於判讀版本方案效果。

共同十題以外，V3／V4 另測 C02、C20、C22、C23、C24 及 R01–R03，V5 加測 U01／U02。R01–R03 使用同一洗澡情境和相同簡潔度，各自切換新手、資深和家屬。U01 重現瀏覽器首輪原話，U02 換成明天再說的相似情境。C25–C30 的五欄摘要另用固定模板驗證，外語案例由人工核對譯文後輸入。[評估方法](evaluation-plan.md) · [案例期望](evaluation-cases.md)

## 3. 實際測試範圍與結果

### 直接模型評估

| 批次 | 原始請求數 | 可確認的結果 | 原始目錄／檔案 |
|---|---:|---|---|
| Baseline、V1、V2 | 各 10 | 三組共 30 筆供應商完成；文字輸出 | `original/` |
| V3 | 18 | 18 筆供應商完成；17 筆符合 App 結構、C09 拒絕 | `original/` |
| V4 | 18 | 18 筆符合 App 結構 | `revised/` |
| V5 | 20 | 20 筆符合 App 結構 | `candidate/` |
| 固定多輪交接 H01 | 2 | 各 1 筆 V4／V5，同一組 19 則訊息輸入，均可顯示，內容仍各有錯誤 | `handover-fixed-V{4,5}.json` |
| 同題模型與 effort 對照 | 21 | 三組各 7 筆；共 20 筆可顯示，Luna high 有 1 筆截斷 | `model-compare/` |
| **總計** | **109** | **108 筆供應商完成，1 筆 incomplete；內容品質另看 §4** | 離線包 `development/model-results.csv` |

C09 的結構問題是將真實 V3 輸出交由正式解析程式重放而確認。當時供應商完成了回覆；它在一般聊天 API 會走無效回覆處理。Baseline 到 V2 的原始評估本身使用純文字，故沒有拿這三版套入後來的結構測試。模型推理與瀏覽器回放皆有非確定性，每個表內條件是一筆樣本。

### 真實網頁回放

同一組 10 個印尼文提問、角色、語言、長度及意圖，在四個版本逐輪送出。當回合的歷史含該版本前面實際生成的回答，因此這是端到端比較。H01 另用完全固定的 19 則訊息隔離前面對話演變對末輪的影響。

| 網頁版本 | HTTP 200 | 每回合中位數 | 原始對話目錄 |
|---|---:|---:|---|
| Luna／V3 | 10／10 | 5.86 秒 | `user-session/` |
| Luna／V4 | 10／10 | 4.64 秒 | `final-session/` |
| Luna／V5 | 10／10 | 5.93 秒 | `v5-session/` |
| **Terra／medium／V5** | **10／10** | **4.23 秒** | `terra-session/` |

延遲可用匯出 JSON 中的 `askedAt` 和 `answeredAt` 重算。Terra 樣本為 2.98–8.10 秒，正式建置驗證雙語剪貼簿、320px／390px 版面、家屬摘要回到最新回合、JSON 與 HTML 一致性。Terra 這次觀察較快，樣本條件不足以建立一般延遲保證。

其他應用程式級記錄包括首次 Luna 和切換後 Terra 的成功 smoke response，以及 production 安全路由的六筆 HTTP 回覆。安全路由中三筆由模型回答、三筆由固定規則回覆。這些與 109 筆直接評估及 40 輪瀏覽器測試分開記錄。

### 模型與強度決策

同用 V5 和七道固定題目 C08、C13、C15、C23、R03、U01、H01。模型端 2,000 token 上限及 30 秒逾時一致。

| 模型／effort | 可顯示 | 中位延遲 | 七筆估計 token 費用 | 主要差異 |
|---|---:|---:|---:|---|
| Luna／medium | 7／7 | 6.08 秒 | US$0.00248 | H01 保留未知；將長者自行拿毯子放進「我做的事」段，句子主詞本身仍正確。 |
| Luna／high | 6／7 | 7.48 秒 | US$0.00344 | H01 達到 2,000 輸出 tokens，JSON 截斷，正式解析會拒絕。 |
| **Terra／medium** | **7／7** | **5.69 秒** | **US$0.01597** | H01 事件／行動分段較清楚；R03 先確認照護者回報；C13 求助另列。 |

費用以當批實際 token 使用量和標準價格估算，包含收到截斷結果的那筆，不是帳單金額。保留 Terra／medium 作本機展示設定，是由於家屬交接與角色差異更貼近需求，並再取得完整十輪瀏覽器驗證。[Luna 價格](https://developers.openai.com/api/docs/models/gpt-6-luna) · [Terra 價格](https://developers.openai.com/api/docs/models/gpt-6.1-terra) · [推理輸出上限](https://developers.openai.com/api/docs/guides/reasoning#controlling-costs)

## 4. 錯誤、改動和改善結果

| 問題與可查證輸出 | 實際改法 | 同題複測及剩餘限制 |
|---|---|---|
| **補出未知時間**。C01 Baseline 的例句「晚餐六點，還有半小時」給了題目沒有提供的時間。 | V3 加入保留未知與不得補事實，V5 明寫先確認時程。 | C01 V5 的句型先查看時間。C03 V5 也保留未知並提供繁中對照。 |
| **追問無法顯示**。C09 V3 回 `kind: "clarification"`、`questions: null`，只有 `phrase` 內有問題。 | V4 按類型指定必要欄位，維持伺服器驗證。 | 同題 V4／V5 可顯示。V5 的 C15 也在問題欄列出待確認事項。原始失敗輸出留存。 |
| **延後被當成同意**。C05 只給現在或晚點，V3／V4 瀏覽器首輪曾推斷長者想稍後洗澡。 | 加入可以直接拒絕或結束的選項，要求逐字保留回報原話、另列未知。 | U01／U02 的 V5 保留稍後是否願意。Terra 瀏覽器首輪也保留未知；部分翻譯仍有語氣加重的可能。 |
| **家屬稿混入行動**。V4 第 10 輪寫成「我提出毯子」，原對話只有照護者說尚未提出，後來長者自行拿。 | V5 用例子區分原話、已回報行動與結果；維持使用者核對的五欄摘要。 | Luna V5 瀏覽器保留毯子事實，但漏掉提議喝茶後再談；固定 H01 曾另補「問是否要毯子」。Terra 瀏覽器把兩件事正確分段，仍漏「後來有沒有喝茶」這項未知。 |
| **角色差異偏弱**。R03 的舊版本仍偏向教家屬直接對長者操作，C08 的 V4 只給兩項且缺交接。 | V5 指定家屬先問照護者、資深者先列觀察與交接，並遵守明確要求的點數。 | C08 V5 有三點和交接，R03 Terra medium 由向照護者查證開頭。資深版仍可能重複，單一同題用途不擴稱所有情境。 |
| **安全提示黏住舊話題**。舊規則會被前文急況、用藥詞或明確否定持續觸發。複查還發現，「她剛剛已經多吃了」這類用藥承接需要保留警示。 | 讀使用者訊息區分明確否定、醫護接手、新警訊、含糊急況追問與用藥承接；錯誤介面保留急迫求助提醒。 | 六題正式路由均符合預期。字詞規則仍需真人判斷及審查，C13 曾有模型少列求助條件的樣本。 |
| **中文複製與手機捲動**。原版只複製印尼文，窄畫面巢狀捲動使最新回答難找。 | 中文對照獨立複製，保留多行；手機改用頁面捲動，返回時聚焦最新一輪。 | Terra 在 Chromium 320／390px 回到最新，剪貼簿逐語核對，HTML／JSON 十輪相符。實體手機驗收待做。 |

### 正式建置安全路由

| ID | 測試重點 | 預期與實測路徑 |
|---|---|---|
| S01 | 明確否定呼吸困難，切到日常洗澡話題 | 模型，HTTP 200 |
| S02 | 突發語言與手臂警訊的口語描述 | 固定求助，HTTP 200 |
| S03 | 急況後只問「現在呢？」 | 固定求助，HTTP 200 |
| S04 | 明示醫護已接手，再問晚餐話題 | 模型，HTTP 200 |
| S05 | 用藥追問中表示可能已多服 | 固定求助，HTTP 200 |
| S06 | 已詢問藥師後改問日常晚餐 | 模型，HTTP 200 |

本輪工程驗證包括 `pnpm lint`、`pnpm build`、`pnpm typecheck`、`pnpm test`。四項通過，20 項自動化測試通過。整理紀錄時重新執行一次相同工程檢查，日誌保存在離線包 `development/checks/`。這些檢查與正式模型評估使用不同證據。

## 5. 離線證據、重現方式與限制

- 離線包保存上述 **119 個原始證據檔**、瀏覽器操作日誌與畫面、輸入集、模型輸出索引、各版 Prompt、程式 diff 及本次重跑的工程日誌。用包內 `manifest.sha256` 查驗檔案即可。日誌中的本機路徑替換為可分享的相對標記。
- 重現一題時，可從 `development/case-inputs.json` 選擇輸入，或取原始 JSON 的 `result.input`。將該物件另存到測試用 JSON，於 `web/` 執行 `OPENAI_MODEL=gpt-6-luna OPENAI_REASONING_EFFORT=medium pnpm --silent eval:prompt V3 /path/to/case.json`。將 `V3` 換成 V4 或 V5，即可重跑 C09 的對照。重跑會產生新的請求，舊檔保持原樣。[操作說明](evaluation-plan.md#本機評估指令)
- 第 10 輪的 Terra HTML 及 JSON 屬本機模型實測；正式交件的公開作品與紀錄連結需在核准的公開環境取得並驗證。學生參與、印尼語及照護專業複核目前各有待完成欄位。Codex 主代理完成實作；兩位代理分別模擬操作和獨立檢查。由學生在報告註明實際本人貢獻。[證據登記與待完成事項](evidence-log.md)

## 6. English draft for the submission

**Iterative development.** We compared a general-purpose baseline and five CareBridge prompts on ten shared fictional cases with the same model and request settings. The baseline sometimes invented a dinner time. V3 preserved the unknown time but produced a clarification response that failed the app's validation because its questions were in the wrong field. We specified the required fields in V4 and checked the same case again. Multi-turn testing then revealed that “later” could be misread as consent and an unreported action could enter a family update. V5 made speaker attribution, consent, and role-specific handover explicit.

**Model selection and validation.** We compared three model/effort settings on seven fixed cases. Luna at high effort hit the output cap on one long handover. Terra at medium effort passed structural validation on all seven and completed a ten-turn browser replay. The final bilingual draft preserved who picked up the blanket and which action the caregiver actually reported. It omitted one unresolved outcome, so family handovers still require confirmation in the separate five-field tool. An AI-assisted tester replayed a fictional caregiver scenario, and a second AI reviewer checked the records. Student contributions should be documented in the submission. Clinical and native-speaker review and evaluator-accessible links are pending.
