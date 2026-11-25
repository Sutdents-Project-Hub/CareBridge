# 部署說明

## 目前狀態

- 目標平台：Vercel Hobby；CareBridge 尚未匯入、建立專案或部署。

## 命名契約

| 用途 | 名稱 |
|---|---|
| GitHub repository／本機根資料夾 | `CareBridge` |
| Project slug | `carebridge` |
| 本機 Docker Compose project | `carebridge` |


- 主要 Compose 檔若存在，頂層設定 `name: carebridge`。
- Compose service 使用 `web`、`app`、`api`、`cms`、`backend`、`worker`、`postgres` 等角色，原則上不設定 `container_name`。

## Vercel Hobby 設定（待建立）

- GitHub 匯入此 repo 後建立獨立 Vercel Project，保留此專案自己的 `*.vercel.app` Production 網址。網址和可用性須在建立後記錄，不預先猜測。
- GitHub 匯入此 repo 時選 `main` 為 Production Branch，Root Directory 設 `web`，Framework Preset 使用自動偵測的 Next.js，Node.js Version 設 `24.x`。
- Install Command、Build Command、Output Directory 保留預設。將 `ENABLE_EXPERIMENTAL_COREPACK=1` 加入 Production 環境，讓 Vercel 讀取 `web/package.json` 的 `pnpm@10.33.0`。
- 此 app 的聊天 route 使用 Next.js Node.js runtime，設定 `maxDuration = 40` 秒；供應商請求 timeout 為 30 秒，單次呼叫不重試。Vercel 是否套用 route 設定、runtime 協定與 Function duration 須由實際部署 log/設定確認。
- 本機 Compose 只供本機整合驗證，不是正式 Production entrypoint。

## 環境變數與資料

在 Environment Variables 選 Production，填入以下三項。變更後重新部署才會套用。

| 名稱 | 正式展示設定 |
| --- | --- |
| `OPENAI_API_KEY` | 在 Vercel 填入授權的金鑰，標記為 Sensitive，僅供伺服器使用。 |
| `OPENAI_MODEL` | `gpt-6.1-terra`，聊天 API 需要指定模型。 |
| `OPENAI_REASONING_EFFORT` | `medium`，沿用本機 V5 展示的推理設定。 |

## 部署風險與上線前確認

- API key 僅由 `web/src/lib/ai/provider.ts` 伺服器模組讀取；聊天 API 明確宣告 Node.js runtime。需確認正式 build 未將秘密打包到客戶端，且不在 log 輸出請求內容、供應商錯誤本文或金鑰。
- API 有訊息長度／請求大小限制、單次輸出 token 上限、30 秒供應商 timeout 及程序內 request cap；程序內計數器不是跨 Vercel Function 執行個體的分散式限流，也不是 OpenAI 額度上限。提供公開連結前需確認可接受的濫用與供應商費用風險，並查看 OpenAI 帳號可用的預算／用量控制。
- 只用虛構案例做匿名驗收；以無痕視窗驗證主頁、三語、各角色、十輪聊天、錯誤狀態、摘要與匯出，不輸入真實長者資料。

## 發布與回滾

- 記錄部署前品質檢查、人工驗收、版本識別、發布責任與可執行的回滾方式。
- 未經明確授權，不建立、修改或刪除 production 資源。

### Git import 不可用時的暫存目錄備案

若 Vercel Git Integration 無法匯入此 repo，可從已檢查的 commit 輸出只有 `web/` 的乾淨目錄，再以 Vercel CLI 建立獨立專案。以下是待執行步驟，不代表已 link 或部署；正式部署仍需依專案授權辦理。

```bash
archive_dir=$(mktemp -d /tmp/carebridge-vercel-web.XXXXXX)
git archive HEAD:web | tar -x -C "$archive_dir"
cd "$archive_dir"
vercel link
```

在 Vercel Project Settings 設定 Node.js `24.x`、Production 環境變數及 Production 預設網域；由專案管理者在 Settings 設入 `OPENAI_API_KEY`，並設定上述 `OPENAI_MODEL`、`OPENAI_REASONING_EFFORT`。保持自動偵測的 Next.js build 設定。確認設定後才執行 `vercel deploy --prod`。CLI 專案根目錄是這份乾淨輸出的 `./`，而非原 repo 的 `web/`。


## 公開試用驗收紀錄

部署與公開試用尚未完成。下表只記錄待驗收項目；以 Vercel 實際設定、build log 與匿名操作結果填寫。

### 驗收工單（待填）

| 項目 | 實際值 | 狀態 |
|---|---|---|
| Hosting / project ID | Vercel Hobby 規劃；Project ID 待建立 | 未建立 |
| Production branch / base directory | `main` / `web` | 待 Vercel 匯入驗證 |
| Framework / Node.js | Next.js / `24.x` | 依設定規劃，平台尚未驗證 |
| Install / Build / Output | Vercel 預設值；packageManager `pnpm@10.33.0` | 待 build log 驗證 |
| Public URL | — | 未部署 |
| LLM provider + model | OpenAI，Terra／medium／V5 已在本機驗證 | 公開環境待設定／驗證 |
| Server secret source | Vercel Project Environment Variables（Production） | 未設定 |
| Function runtime / max duration | Node.js / 40 秒 route 設定 | 待部署 log 驗證 |
| Rate limit / 供應商預算 | 程序內限制已實作；非分散式限流／供應商硬上限 | 上線前風險待接受與驗證 |
| 桌面／手機匿名對話 | — | 未測 |
| 無痕存取 chatbot 與 chat history | — | 未測 |
| 回滾、撤站方法 | — | 未建立 |

**安全提醒**：不因評審要試用，就在 GitHub 或網站中暴露 key、繞過成本上限，或蒐集真實長者私密紀錄。

### 平台文件

- [Vercel Hobby 計畫與用途限制](https://vercel.com/docs/plans/hobby)
- [Vercel 專案建置設定與 Root Directory](https://vercel.com/docs/builds/configure-a-build)
- [Vercel Node.js 版本](https://vercel.com/docs/functions/runtimes/node-js/node-js-versions)
- [Vercel Function 時限](https://vercel.com/docs/functions/limitations)
- [Vercel 環境變數](https://vercel.com/docs/environment-variables)
- [Vercel CLI 專案連結與首次建立](https://vercel.com/docs/projects/deploy-from-cli)
- [Vercel CLI Production 部署](https://vercel.com/docs/cli/deploy)
