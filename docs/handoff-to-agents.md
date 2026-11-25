# CareBridge 開發交接

## 先確認狀態

1. 讀根目錄 AGENTS.md、README、requirements.md、architecture.md、ux-flows.md、ai-advisor-design.md、evaluation-plan.md 與 security-and-privacy.md。
2. 檢查 working tree、目前分支與 remote。原始企劃與跨專案研究稿如有保留在本機 `docs/source/`，當成內部參考。
3. 維持單一 `web/` 的 server 邊界。一般對話走 OpenAI，家屬摘要在瀏覽器運作。連線、部署和個資範圍依各次授權。
4. 用 README 的指令啟動及驗證。使用虛構資料。未設定 OpenAI 時確認錯誤流程及固定安全提示，將真實模型評估留在證據表的待測狀態。

## 公開展示準備

- 確認公開環境的 OpenAI 專案、模型 ID、預算與 Vercel 正式網址。先讀證據表及本機原始案例，比對已知缺口，再補剩餘案例與人工評分。
- 學生用最終版完成完整虛構對話，主動匯出並準備評審可存取的紀錄。公開展示需親測桌機、手機與無痕模式，確認限流、成本、瀏覽權限和錯誤處理。
- 同步 [競賽證據表](evidence-log.md)，在英文 PDF 揭露實測範圍、未審查語言、照護限制及學生與 AI 的實際分工。
