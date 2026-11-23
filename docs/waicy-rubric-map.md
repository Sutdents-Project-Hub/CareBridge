# CareBridge｜WAICY 評分對照（簡報 30 張）

簡報：Claude Slides（私人 Artifact，來源備份在本機 `docs/source/waicy-submission/deck-source/`，不進版控）。官方評分見 [rubrics](https://www.waicy.org/rubrics/)。以下是自評對應，不是預估分數。

| 評分項（滿分） | 對應頁 | 支持內容 | 還可加強 |
|---|---|---|---|
| Specific AI Service（25） | 6、7、8、9、10、11、12、13、14 | 一句話定義、做／不做清單、三使用者、同題三答（真實輸出截圖）、三語＋中文對照、五欄家屬摘要、固定安全規則、架構圖 | 公開試用連結未接上（23 頁佔位）；實體手機與無痕驗收未做 |
| Iterative Development（25） | 15–23 | 官方 5 步迴圈、commit 演變、Baseline–V5 版本表、109 次實驗圖、四個錯誤的問題／修正／重測／剩餘問題、模型選型、十輪對話 | 每版僅單次樣本；最終對話由 AI 模擬使用者；可補多次重跑 |
| Motivation & Problem Statement（10） | 2、3、4、5 | 情境鉤子、WHO／台灣數據、印尼看護與語言障礙、基線失敗案例 | 部分數據為新聞轉述（見研究筆記）；缺學生自己的啟發故事 |
| Limitations & Considerations（10） | 13、24、25 | 準確性、語言未審、證據範圍、規則未經臨床審查；隱私、尊嚴、過度依賴、可及性 | 偏誤與可及性尚未實測 |
| Future Development & Clear Reference（10） | 26、27、29、30 | 限制→下一步→所需證據表；結論；APA 參考文獻 18 筆 | 未來「創新」程度偏保守（語音、更多語言為構想）；結論可補學生視角 |
| Presentation & Communication（10） | 全部 | Lesson Plan 視覺、四階段進度軌、每頁一個重點、真實截圖 | 請在 Claude 內逐頁目視檢查；預覽使用替代字型，實際換行可能略不同 |
| Originality & Creativity（10） | 5、8、9、12、20 | 「fluent ≠ faithful」切入、三角色同題、「later 不是同意」規則、五欄人工確認摘要 | 學生實際貢獻待填（28 頁） |

## 官方必備十項對照

| 官方項目 | 頁 |
|---|---|
| 1 Specific service | 6、7 |
| 2 Users（≥3） | 8、9 |
| 3 Motivation | 2–5 |
| 4 Chat history link | 22（本機匯出）、23（連結待補） |
| 5 Chatbot link | 23（待補） |
| 6 Iterative design | 15–21 |
| 7 Limitation | 24、25 |
| 8 Future | 26 |
| 9 Conclusion | 27 |
| 10 Reference | 29、30 |

## 品質檢查紀錄（本次實際做的）

- 以 Playwright 離線渲染 30 張並逐張目視抽查（約 22 張），修正過：頁面偏上留白、卡片溢出（scale-runs、family）、封面右欄底部被裁。圖片與連接線在預覽中不繪出，圖片版面尺寸以計算驗證，**請在 Claude Slides 內確認**。
- 未做：PDF 匯出與渲染檢查（使用者自行匯出）、連結點擊檢查（尚無連結）、色彩對比自動掃描（以人工選色：白底深藍字；彩色標籤用深色墨水字）。
- 數據逐項回查原文（見 `waicy-research-notes.md`）。
