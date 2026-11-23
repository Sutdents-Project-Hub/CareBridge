# CareBridge｜WAICY 簡報外部研究與數據來源（2026-11-23）

本檔記錄英文簡報第 3–4 頁使用的外部數據，分清「公開統計」「本專案實測」「推估」。所有網頁於 2026-11-23 查閱；摘錄為簡短引述，原文以連結為準。

## 公開統計（簡報第 3、4 頁）

| 簡報用語 | 來源與原文重點 | 可信度與限制 |
|---|---|---|
| 2021 年全球約 5,700 萬失智者；每年近 1,000 萬新增 | WHO, *Dementia* fact sheet（頁面顯示更新 2026-10-26）：「In 2021, 57 million people were living with dementia worldwide」、「nearly 10 million new cases」 | 官方；年份為頁面自己標示的 2021 |
| 非正式照護者平均每日 5 小時照護與看顧 | 同上：「provide on average 5 hours of care and supervision per day」 | 官方；為全球平均 |
| 台灣約 35 萬失智者（2024 初）；65 歲以上約 8% | Fulco (2026-05-18), *Taiwan Business TOPICS*：「About 350,000 … as of early 2024, according to MOHW data」；Taipei Times (2025-12-01) 引 2023 NHRI 報告 7.99% | 二手報導引用衛福部資料；Fulco 文章含藥廠主管評論，只取數字。未回查衛福部原始表 |
| 移民看護中 82% 來自印尼；每 4 名移工 1 名從事看護 | El Rahman (2026-02-12), *Taipei Times* 評論：「The latest data from the Ministry of Labor showed …」 | 評論文章，資料時間未標；非勞動部原表。定義為「migrant care workers」，非失智照護者 |
| 94.3% 受訪移工需要失智照護指導 | Yang (2020-07-13), *Taipei Times*：陳正芬（中國文化大學）研究，使用 2019 年資料；「94.3 percent said they need instruction on how to care for people with dementia」 | 新聞轉述；**樣本數文章未載**。同文另列語言障礙為三大問題之一（無百分比） |
| 外籍看護常缺乏流利華語與專業訓練 | Fulco (2026)：「Foreign caregivers often lack both fluency in Mandarin Chinese and specialized training」 | 二手報導語句，非量化 |
| 250 位印尼看護問卷：失智識能中等、負荷低 | Widiyaningsih & Chiu (2025), *Alzheimer's & Dementia* 21(S4):e097972；橫斷研究，便利抽樣，2024 年 6–12 月 | 僅有摘要（補充期刊）；語言只在背景提及，未當預測因子 |

## 本專案實測數據（簡報第 8–9、13、17–23 頁）

來源為 `docs/waicy-iteration-record.md`、`docs/evidence-log.md` 與本機證據包 `docs/source/waicy-evidence/`。數字（109 次直接模型實驗、40 個瀏覽器回合、20 項自動化測試、6／6 安全路由、Terra／Luna 比較）逐項沿用該紀錄，未新增或調整。皆為單次樣本，不是通過率。

## 推估

簡報**沒有**使用任何自行推估的統計。若之後要加入（例如目標使用者規模），需另寫方法與假設，並標示為推估。

## 查證中發現的不一致

- 台灣失智人數預測（2031 年 47 萬、2061 年 88 萬）在 AmCham 與 Taipei Times 的歸屬單位不同（TADA vs. FMPAT），因此簡報**未引用**預測值，只用 2024 年現況。
- 勞動部、移民署對「看護工／家庭幫傭」的口徑不同，簡報只用「migrant care workers」這個報導用語，並在頁尾註明非失智照護者人數。
- 模型名稱（gpt-6.1-terra、gpt-6-luna）與價格取自專案紀錄與其引用的 OpenAI 文件；本次未重新驗證。

## 建議補強（尚未做）

1. 回查勞動部「外籍移工產業及國籍別」原始統計，取代新聞轉述。
2. 回查衛福部或國健署失智症盛行率原始報告。
3. 取得 Chen 研究原始樣本數與抽樣方式。
