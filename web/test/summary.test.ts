import { strict as assert } from "node:assert";
import { test } from "node:test";
import { emptyFacts, formatSummary, summaryFormats, summaryRows } from "../src/components/summary";

test("blank and whitespace-only fields stay unknown", () => {
  const rows = summaryRows({ ...emptyFacts, outcome: " \n " }, "zh-TW");
  assert.equal(rows.length, 5);
  assert.ok(rows.every(({ text }) => text === "待確認"));
});

test("summary retains only the submitted facts in their own fields", () => {
  const text = formatSummary(summaryFormats["zh-TW"].example, "zh-TW");
  assert.match(text, /已採取行動：詢問長者是否想晚一點再洗/);
  assert.match(text, /目前結果：待確認/);
  assert.doesNotMatch(text, /已完成洗澡/);
});

test("choosing a summary language changes headings and empty labels while retaining typed facts", () => {
  const facts = { ...emptyFacts, event: "Belum mau mandi", outcome: " \n " };
  assert.match(formatSummary(facts, "en"), /^Family care summary\nEvent: Belum mau mandi/m);
  assert.match(formatSummary(facts, "en"), /^Current outcome: To confirm$/m);
  assert.match(formatSummary(facts, "zh-TW"), /事件：Belum mau mandi/);
  assert.match(formatSummary(facts, "zh-TW"), /目前結果：待確認/);
});
