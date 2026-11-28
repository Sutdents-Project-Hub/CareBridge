# CareBridge

CareBridge is a communication advisor for everyday dementia care. New caregivers can practice respectful wording, experienced caregivers can check handover priorities, and family members can separate what happened from what still needs confirming.

The website opens in English. Traditional Chinese and Indonesian are available from the language menu. The family-summary tool formats user-entered facts in English or Traditional Chinese and requires a review before copying.

## WAICY 2026

| Material | Where to find it |
|---|---|
| Project report and registration brief | [Editable English report](docs/waicy-submission-draft.md) · [Historical 8-page PDF draft](docs/source/waicy-submission/LLM_High_CareBridge_DRAFT.pdf) |
| Slide production handoff | [Latest English slide text, evidence and submission kit](docs/waicy-deck-handoff.md) |
| English demonstration | [Competition and demo guide](docs/competition.md) · [Visual evidence PDF](docs/source/waicy-submission/english-evidence-2026-11-23/CareBridge-WAICY-English-Visual-Evidence.pdf) |
| Agent-operated English conversation | [Readable transcript](docs/source/waicy-submission/english-evidence-2026-11-23/final-english-conversation.md) · [Raw JSON](docs/source/waicy-submission/english-evidence-2026-11-23/final-english-conversation.json) |
| Design, testing and improvement | [Iteration record](docs/waicy-iteration-record.md) · [Evidence log](docs/evidence-log.md) · [Evaluation plan](docs/evaluation-plan.md) · [Test cases](docs/evaluation-cases.md) |
| Sources and submission | [Care references](docs/knowledge-sources.md) · [Research notes](docs/waicy-research-notes.md) · [Rubric map](docs/waicy-rubric-map.md) · [Submission checklist](docs/waicy-submission-todo.md) |

Local tests use fictional cases. The public chatbot and final submission status are tracked in the [evidence log](docs/evidence-log.md).

## Hosting status

The public demo is at [carebridge-neon.vercel.app](https://carebridge-neon.vercel.app). It answered fictional test requests on 2026-11-27 with `gpt-6.1-terra` / medium / V5. See the [evidence log, Section N](docs/evidence-log.md#section-n-public-demo-check-2026-11-27) and the [deployment notes](docs/deployment.md).

## Run locally

Use Node.js 24 LTS and pnpm 10.

```bash
cd web
pnpm install --frozen-lockfile
pnpm dev --hostname 127.0.0.1 --port 3206
```

Open [the home page](http://127.0.0.1:3206) or [the role comparison](http://127.0.0.1:3206/compare). The comparison shows saved real model replies to the same fictional case. **Try this role** opens an editable draft in a new tab. **Send** starts a live conversation.

For live replies, copy [web/.env.example](web/.env.example) to the ignored local file `web/.env.local`, set `OPENAI_API_KEY` and `OPENAI_MODEL` on the server, and restart the service. The verified demo uses `gpt-6.1-terra`, medium reasoning effort, and prompt V5. The family-summary tool is available without model access.

```bash
pnpm lint
pnpm typecheck
pnpm test
pnpm build
```

## Privacy and care boundaries

- Use fictional or de-identified details. Chat sends the necessary recent messages to the OpenAI Responses API with `store: false`. The family summary is processed in the browser.
- The app has no sign-in or care-record database. Reloading clears the session. Users can export their conversation as JSON or readable HTML.
- CareBridge supports everyday communication. Diagnosis, medication decisions, and urgent situations need appropriate professionals or local emergency services. Clinical and native-speaker review remain pending.

## Technical handoff

[Web component](web/README.md) · [Requirements](docs/requirements.md) · [UX flows](docs/ux-flows.md) · [Architecture](docs/architecture.md) · [OpenAI integration](docs/integrations.md) · [Privacy](docs/security-and-privacy.md) · [Deployment](docs/deployment.md)

Internal engineering notes use Traditional Chinese where it supports the team’s handoff. The table above is the English entry point for judges.
