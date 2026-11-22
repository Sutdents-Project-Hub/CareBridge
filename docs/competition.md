# 競賽與展示準備

## 問題與使用對象

提供繁體中文、英文、印尼文的失智照護日常溝通建議、尊重式句型與經使用者確認的中文家屬事實摘要；非醫療診斷或用藥工具。

- 清楚說明要解決的問題、受影響對象與現有做法的限制。

## 展示流程

- 定義一條可重複的主要 demo flow，包含前置資料、操作步驟、預期畫面／輸出與失敗備案。
- 展示內容只使用合法、去識別且可公開的測試資料。

## 證據與來源

- 記錄資料集、研究、開放資料、模型、API、圖片、字型與第三方程式碼的來源及授權。
- AI 產生內容需說明限制、錯誤可能性與不可取代的人工判斷。

本機版本可主動匯出含每輪回覆與模型／提示詞來源的 JSON。正式分享連結需用已獲准的虛構測試對話另行建立與驗收。

## 已知限制

- 區分可運作原型、模擬資料、尚未完成能力與未驗證假設，不誇大正式營運或醫療／安全效果。

## 提交前檢查

- 比賽規則、檔案格式、截止時間、公開權限、影片／簡報連結與 repository 可見性已確認。
- README、demo、程式碼、環境變數範例與實際版本一致。
- 秘密、個資、內部文件與不可再散布素材已排除。

## CareBridge｜WAICY 2026 第 4 賽道專用交件規劃

### 確認的主題與計分（以官方最新規範為準）

- 賽事：WAICY 2026（World Artificial Intelligence Competition for Youth），Track 4／Large Language Models & AI Agent，主題 AI as a Service。
- 主辦公告：2026/11/29 17:00 美東時間收件截止，換算台灣 **2026/11/30 06:00**；建議 11/29 晚間前送件，避免時差及網站故障。
- 官方總分 100：Specific AI Service 25；Iterative Development 25；Motivation & Problem Statement 10；Limitations & Considerations 10；Future Development & Clear Reference 10；Presentation & Communication 10；Originality & Creativity 10。
- **Specific AI Service 與 Iterative Development 各 25 分，合計一半**；所以不應用華麗頁面取代功能、Prompt 和實驗證據。
- 官網報名類別名稱可能顯示「AI Large Language Models Track」，提交時依實際表單選項，並核對高中組。
- 官網年齡寫 6–18 歲、手冊可能使用「未滿 18 歲」；若學生已滿 18 歲應先問 info@waicy.org，勿自行假定可參賽。

官方來源：
- https://www.waicy.org/waicy-2026/
- https://www.waicy.org/rubrics/
- https://www.waicy.org/2026-submission/
- https://waicy-cdn.wholeren.cn/wp-content/uploads/2026/09/WAICY-2026-Guidebook.pdf

### 交件必須有的實際證據（依所附指南／手冊整理）

1. **一份正式英文 PDF**：作品定位、功能、目標問題、至少三種使用者的差異化需求。
2. 開發動機與具體使用情境，不只講「失智照護很重要」。
3. **評審可親自操作的 Chatbot Link**：不是固定示意圖、空白網站或只有影片。
4. **最終版 AI 至少 10 則交換訊息的對話紀錄與可開啟連結**；團隊保守準備 10 輪完整 Q&A，約 20 則訊息（此為建議，非額外官方條件）。
5. **Prompt 迭代與測試**：Idea → Advisor Design → Testing → Error Analysis → Improvement；保留 Baseline/V1/V2/V3 真實輸出及失敗修正。
6. 明確寫出模型限制、個人資料、倫理與潛在傷害；醫療安全／翻譯品質未驗證就必須直說。
7. 未來發展、結論、學生貢獻、參考資料。正式報告採實際發生的結果，不把規劃當成果。
8. Google Drive 作品資料夾與正式 PDF 權限、聊天連結、對話連結都應無痕測試；在 https://www.waicy.org/2026-submission/ 提交資料夾分享連結並保留確認信。
9. 報名表英文 Brief Description 上限 **200 words**，與正式 PDF 頁數是不同限制。建議檔名 LLM_High_CareBridge.pdf，資料夾 LLM_High_CareBridge（命名依指南建議，交件前再核對）。
10. 官方第 4 賽道文件清單未要求額外的介紹影片、原始碼或 GitHub Repo；如有決賽展示的新通知另行遵守。

### 簡報主題與樣式

WAICY 簡報的視覺使用 Lesson Plan 主題。完整提示詞保存在本機參考資料。開始製作前先確認簡報主題，再套用到各張投影片。簡報製作待啟動。

### 建議英文 PDF 章節（約 10–12 頁屬建議，不是官方頁數）

P1 Cover；P2 Motivation；P3 Specific AI Service；P4 Three User Profiles；P5 User Journey & Live AI；P6 Prompt V1；P7 Evaluation Method；P8 Baseline vs V1/V2/V3（填真實數據）；P9 Failure Cases & Improvements；P10 Live Chatbot / Final Chat History Links；P11 Limitations & Future Work；P12 Conclusion / Student Contributions / References。

**切勿現在填測試通過數、公開網址、醫療審稿認證或 LLM Prompt 迭代效果**；必須真實產生後才放入正式 PDF。

### 可以修改的英文報名簡介草稿（尚非正式送件）

> CareBridge is a multilingual AI communication advisor for people supporting older adults with dementia. It focuses on everyday communication challenges, not medical diagnosis or treatment. The assistant is designed for three distinct users: novice caregivers who need simple step-by-step guidance, experienced caregivers who prefer concise insights, and family members who need factual updates. With Traditional Chinese, English, and Indonesian support, CareBridge aims to offer respectful phrases, ask clarifying questions when information is missing, and help users organize what actually happened into a Chinese family summary. The proposed system separates known facts, actions taken, outcomes, and unresolved questions instead of inventing details. Our team plans to evaluate the service using consistent scenarios, compare a general-purpose language model with progressively improved prompts, and document errors and limitations. This description presents the planned service; final submission claims will be updated to match the implemented and tested system.

此段是**尚待學生依完成狀態修訂**的申請文案，不能在服務未實作時直接宣稱已完成。

### CareBridge 交件核對清單（學生簽核）

- [ ] 學生報名年齡、隊伍人數、英文姓名、年級與指導者資料經查核。
- [ ] 可操作的 AI 真的可連續對話，U1/U2/U3 同題有實質差異。
- [ ] zh-TW、en、id 的實際 AI 回覆已測試；語言品質局限誠實說明。
- [ ] 家屬摘要不將未知寫成已執行，急迫／用藥／強制案例有紀錄。
- [ ] Baseline、V1、V2、V3 的結果與失敗修正均有原始實測依據。
- [ ] 最終版真實對話共 10 輪完整問答（保守建議）並有分享連結。
- [ ] 公開 Chatbot、對話分享連結與 Google Drive PDF 無痕可開。
- [ ] 英文 PDF 包含全部指定章節與正式來源，沒有虛構 KPI 或假圖片。
- [ ] 申請簡介在 200 英文字內且陳述已完成的功能，不假報進度。
- [ ] 在截止前送出官方表單並保留確認畫面或信件。

### 正式發表可預練問答

- Why CareBridge rather than general ChatGPT? 用同題 Baseline 對照回答，不空喊更好。
- How do the three user profiles differ? 用 U1/U2/U3 對同一情境的真實回答證明。
- How was it improved? 展示 Prompt 修改、測試失敗與複測，而不是編數字。
- What are the limitations? 真實揭露翻譯、個資、模型幻覺與非醫療定位。
- What did the students create? 明確區分學生、指導者與 AI coding assistant 的工作。
