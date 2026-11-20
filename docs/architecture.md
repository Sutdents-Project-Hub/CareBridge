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
