import assert from "node:assert/strict";
import { test } from "node:test";
import type { Turn } from "../src/components/conversation";
import { transcriptHtml } from "../src/components/transcript";

test("readable transcript preserves locale and provenance and escapes conversation text", () => {
  const time = "2026-11-23T05:30:00.000Z";
  const turn: Turn = {
    askedAt: time, answeredAt: time,
    request: { profile: "novice_caregiver", locale: "id", style: "brief", intent: "phrase" },
    question: 'Text <tag data-value="&"> test',
    response: {
      kind: "guidance", locale: "id",
      phrase: { primary: "Mau duduk bersama saya?", zhTwReference: "想和我一起坐嗎？" },
      modelInfo: { provider: "openai", model: "gpt-6-luna", promptVersion: "V4-2026-11-23", provenance: "model" },
    },
  };
  const html = transcriptHtml([turn], time);
  assert.match(html, /CareBridge Conversation/);
  assert.match(html, /lang="id"/);
  assert.match(html, /lang="zh-TW">想和我一起坐嗎？/);
  assert.match(html, /openai \/ gpt-6-luna · V4-2026-11-23/);
  assert.match(html, /&lt;tag data-value=&quot;&amp;&quot;&gt;/);
  assert.doesNotMatch(html, /<tag/);
});
