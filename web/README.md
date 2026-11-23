# CareBridge Web

Next.js App Router、React、TypeScript，包含照護對話、實測角色比較與家屬摘要，以及 Node.js runtime 的 `POST /api/chat`。框架以官方 initializer 產生，manifest 與 lockfile 直接在本目錄。

## 開發與檢查

在本目錄以 Node.js 24 和 pnpm 10 執行：

```bash
pnpm install --frozen-lockfile
pnpm dev --hostname 127.0.0.1 --port 3206
pnpm lint
pnpm typecheck
pnpm test
pnpm build
```

若要驗證 production build，可在 `pnpm build` 成功後執行 `pnpm start --hostname 127.0.0.1 --port 3206`。同一埠只啟動一個服務。

## 啟用 OpenAI

在本目錄的 `.env.local` 設定 `OPENAI_API_KEY` 及 `OPENAI_MODEL`；`OPENAI_REASONING_EFFORT` 選填，留空採模型預設。已對照 `gpt-6-luna` 和 `gpt-6.1-terra`；本機展示選擇 Terra／medium。模型須支援 Responses API 及 Structured Outputs，並由操作者確認帳號權限和預算。金鑰與模型皆須明確設定。缺少設定時，一般問題顯示提示，家屬摘要與對少數急迫語句的固定安全提示仍可使用。詳見[整合文件](../docs/integrations.md)。

## 驗收入口

- 選擇三種角色、繁中／英文／印尼文及回答長度。情境快捷入口只會填草稿，送出才呼叫聊天服務。
- `/compare` 以英文開啟角色比較，語言選單可切換三組實測回覆。瀏覽比較時讀取保存的回覆。「試問」會在新分頁套用同一題、語言、角色與精簡設定，送出才會呼叫聊天服務。
- 家屬摘要不帶入對話建議。確認文字前不能複製，修改任一欄會取消確認。
- 匯出對話前查看提醒。JSON 保留完整欄位；閱讀版 HTML 保留逐輪問答、時間、角色、語言與模型／提示詞或固定安全規則來源，可在瀏覽器開啟及列印。
- 英文／印尼文及照護內容的人工審查，填在[證據登記表](../docs/evidence-log.md)。
