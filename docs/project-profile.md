# 學生專案 Profile

## 基本資訊

- Project name：CareBridge｜失智照護者的三語情境溝通 AI 顧問
- Repository name：`CareBridge`
- Project slug：`carebridge`
- Local Docker Compose project：`carebridge`
- Stage：`competition`
- Product type：`web`
- Bootstrap mode：`scaffold`
- Deployment：`planned`
- Team collaboration：`true`
- Technology policy：未指定時採公司技術基線
- Structure exception：無；使用固定 component root

## 摘要

提供繁體中文、英文、印尼文的失智照護日常溝通建議、尊重式句型與經使用者確認的中文家屬事實摘要；非醫療診斷或用藥工具。

## 元件

- `web`：path=`web`，kind=`web`，framework=`Next.js`，package_manager=`pnpm`，quality=lint, typecheck, test, build，technology_source=`specified`

## 功能領域

- 三種使用者角色與新手／資深差異化體驗
- 繁中、英文、印尼文對話與中文對照
- 可連續追問的照護情境 AI 顧問
- 尊重長者的溝通句型
- 事實、已做、結果、待確認的家屬摘要草稿與人工確認
- 危險與超出能力時的求助提醒
- 評審可操作的連結、真實聊天紀錄匯出與 Baseline/V1/V2/V3 迭代證據

## 專案限制

- 只做文件與目錄 scaffold，不安裝框架、依賴或實作產品功能
- 僅 WAICY 2026 第 4 賽道（LLM & AI Agent / AI as a Service）
- 必須支援三種需求實質不同的角色；不能只變更稱呼
- 繁中、英文、印尼文，語言內容需未經母語者審查標示限制
- 不診斷、不提供處方、藥量調整或冒充專業照護，危急提醒聯絡專業或緊急服務
- 摘要不得虛構事件、處置、結果；由使用者確認後自行分享
- 預設不要求登入、不建立長者資料庫、不儲存個人敏感照護紀錄
- 真實評估與版本結果不得編造；先用虛構案例
- API 金鑰只能存在伺服器環境變數，不進入客戶端或版控
- 2026/11/29 17:00 美東時間官方作品截止，必須提供可操作 AI 連結與最終版至少十則交換訊息連結

## 關注事項

- ai
- external-api
- personal-data

## 假設

- 優先單一 Next.js Web 服務，使用 server-side Route Handlers 呼叫外部 LLM，避免為短期競賽額外建 NestJS/DB
- Node.js 24 LTS、TypeScript、pnpm、Next.js 與原生 Web 無障礙設計為預計選型，尚未安裝驗證
- 長期儲存、登入、語音、原生 App、RAG、管理後台與自動傳訊均非 MVP
- 評審展示只用虛構資料，聊天內容匯出需人工同意與脫敏
- 正式部署平台、API 提供商和實際成本待決定；未建立任何遠端服務

## 未決定事項

- 指導者與學生的實際分工、英文姓名與參賽隊伍資訊待補
- 採用哪一個 LLM provider、模型名稱、額度與模型穩定性待實測
- 部署到哪一個可公開試用的網站，及是否需要匿名試用配額控管
- 照護內容審稿人、印尼語母語審查與授權素材來源尚未確認
- 主辦第 4 賽道的登入可用性、18 歲參賽等仍須依實際隊伍狀況核對
