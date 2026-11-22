# 資料與儲存

## 適用原因

本專案 concerns：ai, external-api, personal-data。

## 必須確認

- Schema、資料來源、擁有元件、測試資料與 production 資料邊界。
- Migration、seed、刪除、修復、備份與還原方式；不得用不可回復操作處理學生成果。
- Upload、媒體或文件的儲存位置、存取權限、容量、保留期與部署持久性。
- README 與元件文件只記錄安全的資料契約，不放真實資料或 credentials。


## MVP 資料與保留

| 資料 | 擁有位置 | 儲存策略 | 隱私條件 |
|---|---|---|---|
| 使用者角色 U1/U2/U3、locale、style | 瀏覽器狀態 | 當前分頁記憶體；可重新選 | 不代表使用者已驗證身份 |
| 暫態多輪 chat messages | 瀏覽器狀態 | 只保留本次 session；重新整理可清除 | 不自動寫入 localStorage、cookie、server DB |
| 必要上下文 | /api/chat 接收 | request 期間處理、回應後不自建永久保存 | 避免 server request/response body logs |
| 家屬摘要的五個欄位 | 瀏覽器表單 | 保留原文，以確定性繁中模板生成 | 人工核對後才允許複製 |
| Prompt 版本／測試題 | 原始程式碼／docs | 版控保留，供重複測試 | 不放個資與真實家屬紀錄 |
| 真實模型測試證據 | 學生主動匯出 | 僅使用虛構案例；依授權保存 | 提交前確認去識別與公開權限 |

### 概念資料模型

- Profile：role(enum)、locale(enum)、style(enum)。
- ChatMessage：role(user/assistant)、text、createdAt（本地）、promptVersion（若為 AI）、modelInfo（安全的公開識別）。
- CareEventDraft：event、observations、actionsTaken、outcome、unknowns，均為使用者**可編修文字**；缺漏不得自動補完。
- Summary：上述五欄的確定性繁中呈現與使用者確認狀態；不能自動傳送給任何家屬。
- EvaluationRecord：caseId、version、model、參數、時間、輸入、完整實際輸出、評分、修正紀錄；只用虛構資料。

### 未做的資料能力

本屆不需要 migration、seed、備份、上傳、雲端歷史、使用者帳號、病歷或多家庭共享。生成的計畫不代表已存在上述資料表、儲存服務或刪除 API。若日後要持久化，先評估保存期限、合法同意、權限、加密、導出與刪除，並更新本文件與安全規範。

### 競賽證據與匿名試用間的矛盾怎麼處理？

評審需要真實對話分享連結，但產品 P0 不保存使用者健康資訊，因此**只允許學生用虛構案例主動匯出或在獲准的分享平台保存示範對話**。報告中的共享連結與 Google Drive 權限須人工測試。公開站台不是永久照護紀錄庫。
