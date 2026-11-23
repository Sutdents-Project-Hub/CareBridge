# CareBridge Web

The Next.js App Router component contains the chat, saved role comparison, browser-only family summary, and Node.js `POST /api/chat` route. The home route is served in English. The language selector also offers Traditional Chinese and Indonesian.

## Develop and verify

Use Node.js 24 and pnpm 10 in this directory.

```bash
pnpm install --frozen-lockfile
pnpm dev --hostname 127.0.0.1 --port 3206
pnpm lint
pnpm typecheck
pnpm test
pnpm build
```

To verify a production build, run `pnpm start --hostname 127.0.0.1 --port 3206` after `pnpm build`. Run one server per port.

## OpenAI configuration

Set `OPENAI_API_KEY` and `OPENAI_MODEL` in the server-only `.env.local`. `OPENAI_REASONING_EFFORT` is optional. The local demonstration uses GPT-6.1 Terra with medium effort after tests on Luna and Terra. The configured model must support the Responses API and Structured Outputs. [Integration details](../docs/integrations.md)

## Demo and verification

- **Chat** lets users choose a role, language, and answer length. Scenario shortcuts populate an editable draft. **Send** submits it.
- **Compare roles** at `/compare` shows saved replies by role. Switch the language to see a different captured set. **Try this role** opens a matching draft and settings in a new tab.
- **Family summary** uses a deterministic browser template. Choose English or Traditional Chinese headings. Facts retain the wording entered. Editing a fact or changing the summary language requires a fresh review before copying.
- **Export** saves JSON or readable HTML, including the per-turn role, language, timestamps and actual model or preset safety-rule provenance.
- See the [English evidence log](../docs/evidence-log.md) and [test plan](../docs/evaluation-plan.md) for measured results and review limits.
