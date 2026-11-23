# 部署說明

## 目前狀態

- 目標平台：已規劃，平台尚未確認
- 初始化階段未建立任何外部資源，以下設定均為尚未驗證。

## 命名契約

| 用途 | 名稱 |
|---|---|
| GitHub repository／本機根資料夾 | `CareBridge` |
| Project slug | `carebridge` |
| 本機 Docker Compose project | `carebridge` |


- 主要 Compose 檔若存在，頂層設定 `name: carebridge`。
- Compose service 使用 `web`、`app`、`api`、`cms`、`backend`、`worker`、`postgres` 等角色，原則上不設定 `container_name`。

## 部署契約

- 本機 Compose 只供本機整合驗證，不作正式 production entrypoint。平台確認後，每個獨立部署 component 的 Dockerfile、port、healthcheck、環境變數責任、備份與 rollback 必須由部署文件依實際平台記錄。
- 明確記錄每個可部署元件的 base directory、runtime、install、build、start command、port 與 healthcheck。
- 以上內容只能從實際 manifest、Dockerfile、Compose 或平台設定驗證，不得複製其他專案數值。

## 環境變數與資料

- 只記錄變數名稱、用途、必要性與值的管理位置；不寫真實 secret。
- 若有資料庫、上傳或持久化資料，部署前補上備份、還原、遷移與刪除影響。

## 發布與回滾

- 記錄部署前品質檢查、人工驗收、版本識別、發布責任與可執行的回滾方式。
- 未經明確授權，不建立、修改或刪除 production 資源。


## CareBridge 的公開試用部署規劃（尚未上線）

部署是未來 Sprint 5，非本次初始化。預期部署唯一可執行元件為 web/ 的 Next.js（UI + server /api/chat）。Vercel、其他支援 Next.js server runtime 的平台均屬待比較候選；**目前沒有已決定的託管供應商、公開 URL、付費方案或網域**。

### 部署前必須完成

1. 使用者批准 hosting、LLM provider/model、API Key 管理方式、預算與可能費用。
2. 框架真正存在且 lint/typecheck/test/build 執行有紀錄；查明 framework runtime 和託管相容性。
3. 由 hosting 以 server 環境變數設定 OPENAI_API_KEY、OPENAI_MODEL 及選填的 OPENAI_REASONING_EFFORT，不在公開 build bundle 洩漏；驗證拒絕未設定 key 時清楚報錯。
4. 具有限流、最大 token、長度限制、timeout、供應商預算防護，並確認部署環境的限流是否真的有效（in-memory serverless 可能無法跨執行個體共用）。
5. 禁止把完整 chat messages 或個人資料存進 analytics/exception log；首頁標示示範用途與不要輸入真實病歷。
6. 用新的無痕視窗／非開發者設備驗證首頁、三語、各角色、10 輪聊天、錯誤處理與家屬摘要。
7. 記錄實際 build、start command、port、base directory、public URL、費用、健康檢查、回滾流程；**不可事先猜值**。
8. 若要使用 Docker Compose 僅作本機整合，正式部署需按已確認平台的獨立服務規則，未授權不創建任何容器或資源。

### 驗收工單（待填）

| 項目 | 實際值 | 狀態 |
|---|---|---|
| Hosting / project ID | 待核准 | 未建立 |
| Base directory | 規劃 web/ | 未驗證 |
| Public URL | — | 未部署 |
| LLM provider + model | OpenAI，已在本機驗證 Terra／medium／V5 | 公開環境待驗 |
| Server secret source | 本機忽略檔；公開環境另設 server secret | 公開環境待設定 |
| Build / start / port | — | 未驗證 |
| Rate limit / 供應商預算 | — | 未驗證 |
| 桌面／手機匿名對話 | — | 未測 |
| 無痕存取 chatbot 與 chat history | — | 未測 |
| 回滾、撤站方法 | — | 未建立 |

**安全提醒**：不因評審要試用，就在 GitHub 或網站中暴露 key、繞過成本上限，或蒐集真實長者私密紀錄。
