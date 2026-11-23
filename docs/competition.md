# 競賽與展示準備

## 問題與使用對象

提供繁體中文、英文、印尼文的失智照護日常溝通建議、尊重式句型與經使用者確認的中文家屬事實摘要；非醫療診斷或用藥工具。

- 清楚說明要解決的問題、受影響對象與現有做法的限制。

## 展示流程

- 從英文 `/compare` 開始，使用同一虛構個案指出新手的當下句型、資深的交班重點、家屬向照護者核對事實的問法。切換語言可檢視同題另兩組結果。
- 直接從一張角色卡開啟新分頁，核對預填角色與問題後送出。接著用家屬摘要只填入已知事實，展示「待確認」及複製前的人工作業。保存的比較結果可在直播連線不順時繼續說明實驗。

## 證據與來源

- 記錄資料集、研究、開放資料、模型、API、圖片、字型與第三方程式碼的來源及授權。
- AI 產生內容需說明限制、錯誤可能性與不可取代的人工判斷。

本機版本可主動匯出含每輪回覆與模型／提示詞來源的 JSON 或閱讀版 HTML。正式分享連結需用已獲准的虛構測試對話另行建立與驗收。

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
- https://waicy-cdn.wholeren.cn/wp-content/uploads/2026/10/WAICY-2026-Guidebook-2.pdf#page=21

### 交件必須有的實際證據（依所附指南／手冊整理）

1. **一份正式英文 PDF**：作品定位、功能、目標問題、至少三種使用者的差異化需求。
2. 開發動機與具體使用情境，不只講「失智照護很重要」。
3. **評審可親自操作的 Chatbot Link**：不是固定示意圖、空白網站或只有影片。
4. **最終版 AI 至少 10 則交換訊息的對話紀錄與可開啟連結**；團隊保守準備 10 輪完整 Q&A，約 20 則訊息（此為建議，非額外官方條件）。
5. **Prompt 迭代與測試**：Idea → Advisor Design → Testing → Error Analysis → Improvement；保留 Baseline 至 V5 真實輸出及失敗修正，見 [第 6 項迭代開發紀錄](waicy-iteration-record.md)與[證據登記表](evidence-log.md)。
6. 明確寫出模型限制、個人資料、倫理與潛在傷害；醫療安全／翻譯品質未驗證就必須直說。
7. 未來發展、結論、學生貢獻、參考資料。正式報告採實際發生的結果，不把規劃當成果。
8. Google Drive 作品資料夾與正式 PDF 權限、聊天連結、對話連結都應無痕測試；在 https://www.waicy.org/2026-submission/ 提交資料夾分享連結並保留確認信。
9. 報名表英文 Brief Description 上限 **200 words**，與正式 PDF 頁數是不同限制。建議檔名 LLM_High_CareBridge.pdf，資料夾 LLM_High_CareBridge（命名依指南建議，交件前再核對）。
10. 官方第 4 賽道文件清單未要求額外的介紹影片、原始碼或 GitHub Repo；如有決賽展示的新通知另行遵守。

### 簡報主題與樣式

WAICY 簡報的視覺使用 Lesson Plan 主題。完整提示詞保存在本機參考資料。開始製作前先確認簡報主題，再套用到各張投影片。簡報製作待啟動。

### 英文交件草稿

[可編輯英文交件稿](waicy-submission-draft.md)已整理服務、三種角色、迭代、實測錯誤、系統界線、未來發展及參考資料，並備有[英文 PDF 草稿](source/waicy-submission/LLM_High_CareBridge_DRAFT.pdf)。正式稿補上可操作網站、對話紀錄公開網址與團隊確認的學生貢獻。高中組分類待團隊確認。

英文報名簡介獨立放在[交件稿末尾](waicy-submission-draft.md#registration-brief-separate-from-the-report-200-word-maximum)，送件時以公開驗收的實際狀態為準，限制 200 英文字。

### 本機交件證據

- [x] 三語 × 三角色各一個真實同題回覆，原始輸出可核對。現有測試樣本及限制列在[證據登記](evidence-log.md#k-三語同題角色比較2026-11-23)。
- [x] 家屬摘要保留未知。急況、用藥與強制情境的驗證收錄在[第 6 項迭代開發紀錄](waicy-iteration-record.md)。
- [x] Baseline 至 V5 的 Prompt、實測錯誤和同題比較均已保留。
- [x] 最終本機 Terra／V5 已匯出 10 輪、20 則真實交換訊息，公開網址待建立。
- [x] 英文 PDF 與 200 字以內的簡介已準備草稿。
- [x] 虛構情境的實際操作已保存為[圖說 PDF](source/waicy-submission/demo-capture-2026-11-23/CareBridge-WAICY-Visual-Evidence.pdf)及 [9 張原始截圖 ZIP](source/waicy-submission/demo-capture-2026-11-23/CareBridge-WAICY-Screenshots.zip)，另附[兩輪英文實測對話](source/waicy-submission/demo-capture-2026-11-23/records/english-two-turns.html)。

### CareBridge 交件核對清單（學生簽核）

- [ ] 學生報名年齡、隊伍人數、英文姓名、年級與指導者資料經查核。
- [ ] 部署 Chatbot，無痕視窗實際送出一題並收到當前模型的回覆。
- [ ] 為已匯出的最終版真實對話建立無痕可讀連結。
- [ ] 填妥英文 PDF 的兩個已測連結及具名貢獻，核對 200 字以內的英文簡介。
- [ ] 上傳正式 PDF，無痕確認 Google Drive 資料夾及檔案都可讀。
- [ ] 在截止前送出官方表單並保留確認畫面或信件。

### 正式發表可預練問答

- Why CareBridge rather than general ChatGPT? 用同題 Baseline 對照回答，不空喊更好。
- How do the three user profiles differ? 用 U1/U2/U3 對同一情境的真實回答證明。
- How was it improved? 展示 Prompt 修改、測試失敗與複測，而不是編數字。
- What are the limitations? 真實揭露翻譯、個資、模型幻覺與非醫療定位。
- What did the students create? 明確區分學生、指導者與 AI coding assistant 的工作。
