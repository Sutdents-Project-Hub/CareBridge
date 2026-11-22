# CareBridge｜失智照護三語溝通顧問

CareBridge 為新手照護者、資深照護者與家屬提供繁體中文、英文、印尼文的日常溝通支援。可編輯情境草稿、連續追問、取得尊重長者的句型與中文對照，也能填寫五欄事實，確認後複製家屬摘要。

目前有可在本機啟動的 Web MVP。一般 AI 回覆需要有效的 OpenAI API 金鑰與模型設定。公開 Demo、真實模型評估與 WAICY 正式交件狀態見[競賽證據登記表](docs/evidence-log.md)。

## 本機啟動

使用 Node.js 24 LTS、pnpm 10。唯一執行元件在 `web/`。

```bash
cd web
pnpm install --frozen-lockfile
pnpm dev --hostname 127.0.0.1 --port 3206
```

開啟 [http://127.0.0.1:3206](http://127.0.0.1:3206)。需要測試真實 AI 時，從 [web/.env.example](web/.env.example) 建立忽略檔 `web/.env.local`，在伺服器填入 `OPENAI_API_KEY` 與 `OPENAI_MODEL`，再重啟服務。未設定時仍可操作摘要，顧問會顯示設定狀態。

```bash
pnpm lint
pnpm typecheck
pnpm test
pnpm build
```

## 資料與照護界線

- 請使用虛構案例。聊天會將必要的近期訊息送至 OpenAI，CareBridge 以 `store: false` 發送 Responses API 請求。摘要欄位只在瀏覽器處理。
- 採無登入、無資料庫的單一 Next.js 服務。分頁重新整理會清除內容，對話紀錄由使用者主動匯出。
- 服務提供日常溝通支援。診斷、用藥與緊急情況應聯絡合適的專業人員或當地服務。照護內容及英／印尼文品質仍待人工審查。

## 專案文件

- [Profile](docs/project-profile.md) · [範圍與需求](docs/requirements.md) · [介面與配色](docs/ux-flows.md)
- [Web 操作](web/README.md) · [架構](docs/architecture.md) · [OpenAI 整合](docs/integrations.md) · [隱私](docs/security-and-privacy.md)
- [開發與交接](docs/handoff-to-agents.md) · [實作路線](docs/implementation-roadmap.md) · [評估計畫](docs/evaluation-plan.md)
- [競賽與展示](docs/competition.md) · [證據登記](docs/evidence-log.md) · [部署規劃](docs/deployment.md)

原始發想與跨專案參賽研究稿保留在本機 `docs/source/`。可公開交接所需的 CareBridge 規格與驗收條件已整理在上述文件。
