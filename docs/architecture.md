# 系統架構與元件邊界

## 架構原則

- Repository 預設為單一 Git repository，只有根目錄可擁有 `.git/`。
- `web/`、`app/`、`cms/`、`backend/`、`worker/` 等 component 本身就是 framework root；manifest 與 lockfile 直接位於該目錄。
- 不建立 project-name 或 framework-name wrapper。跨 component 共用程式碼只有在至少兩個真實使用者存在時才放入 `packages/`。
- 未指定技術時採公司基線：Node.js 24 LTS、TypeScript、pnpm、Next.js、React Native with Expo、Payload CMS、NestJS 與 PostgreSQL。
- 學生因競賽、既有 starter、硬體、授權或團隊能力採不同技術時，以核准 Profile 記錄的選型為準。
- 本機 Docker Compose project 固定為 `carebridge`。
- 主要 Compose 檔明確設定頂層 `name: carebridge`，service 使用責任角色且原則上不設定 `container_name`。



## 已核准元件

- `web/`：Web 前端；framework=`Next.js`；package_manager=`pnpm`；technology_source=`specified`。

## 結構例外

無；使用公司固定 component root。

## 跨元件與信任邊界

- UI 可見性不是授權；秘密、資料庫、重要外部 API 與高風險操作由可信任的 backend／platform 邊界持有。
- 新增 component、改變 framework／runtime／package manager、移動責任或建立新的外部服務前，先更新本文件與 Profile 並取得批准。

## 專案限制

- 僅 WAICY 2026 第 4 賽道（LLM & AI Agent / AI as a Service）
- 必須支援三種需求實質不同的角色；不能只變更稱呼
- 繁中、英文、印尼文，語言內容需未經母語者審查標示限制
- 不診斷、不提供處方、藥量調整或冒充專業照護，危急提醒聯絡專業或緊急服務
- 摘要不得虛構事件、處置、結果；由使用者確認後自行分享
- 預設不要求登入、不建立長者資料庫、不儲存個人敏感照護紀錄
- 真實評估與版本結果不得編造；先用虛構案例
- API 金鑰只能存在伺服器環境變數，不進入客戶端或版控
- 2026/11/29 17:00 美東時間官方作品截止，必須提供可操作 AI 連結與最終版至少十則交換訊息連結


## CareBridge Web 技術架構

單一 Next.js App Router、React、TypeScript、pnpm，Node.js 24 runtime。首頁呈現三語照護對話與家屬摘要。server route 由 OpenAI Responses API 產生建議，以 Zod 驗證資料。瀏覽器保留會話及事實草稿，專案沒有獨立後端、登入、資料庫、RAG 或 CMS。

### 瀏覽器與模型信任邊界

    Browser（React UI／三語文字與角色設定）
       │  POST /api/chat；僅送必要最近訊息與 persona/locale
       ▼
    Next.js Server Route Handler（輸入 schema／限制長度／求助界線／timeout）
       │  套用伺服器專用 V5 Prompt 與安全規則
       ▼
    Provider adapter（server-only API key）
       │  OpenAI Responses API，模型由伺服器環境設定
       ▼
    驗證回傳結構 → 安全回退或錯誤 → Browser 分區顯示

    Browser 的五欄事實表單 → 本地確定性英文／繁中摘要
       └─ 使用者人工確認、主動複製／匯出，不自動上傳或傳訊

- Browser 永遠不能持有 API Key 或帶有特權的 system prompt 控制權。使用者輸入皆視為不可信資料。
- 單個 Next.js server runtime 同時提供頁面與 API；「單一 web/」不代表把外部 API 金鑰放前端。
- 預設不記錄對話 request body／response body 到伺服器 log，也不使用包含對話內容的分析平台。
- 供應商實際會接收為產生回答所需的最小對話內容；是否保存／訓練／資料區域與保留期需依服務條款在選擇時確認。
- 不同角色是 UX 功能設定，不是資安授權；如未登入，各角色均只能處理其當次輸入。

### 實際程式邊界

- `web/src/app/`：首頁、基本配置與 `api/chat/route.ts`。
- `web/src/components/`：三語 UX、多輪對話、摘要模板與手動 JSON／HTML 匯出。
- `web/src/lib/ai/`：輸入與回覆契約、OpenAI adapter、Prompt 版本、規則提示。
- `web/test/`：摘要與聊天整合驗證。

API 的限制、錯誤碼及環境變數見 [外部整合](integrations.md)。固定安全提示在模型接通前也可運作，匯出紀錄會標記來源。

### 建議測試邊界

- Unit：角色設定／靜態三語詞典／五欄事實摘要／schema／禁止空值幻覺。
- API Integration：mock provider 測試超時、配額、非法 JSON、濫用、角色 locale 轉換及錯誤訊息。
- E2E：行動裝置 UI、真實鍵盤操作、聊天與摘要複製流程；真人 LLM 呼叫另獨立記錄。
- Evaluation：同題 Baseline/V1/V2/V3 真實輸出、三角色、三語、30 個虛構案例，不能用 mock 結果當 LLM 成績。

### 本地整合與正式部署

目前可用單一 Next.js Web 在本機啟動，指令與埠見 [web README](../web/README.md)。正式部署仍待確認。是否使用任何容器需有實際理由與正式需求。若將來確需本機 Compose，name 固定 carebridge，且本機 Compose 不等於正式 Cloud 部署定義。
