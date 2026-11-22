import { strict as assert } from "node:assert";
import { test } from "node:test";
import { emptyFacts, exampleFacts, formatSummary, summaryRows } from "../src/components/summary";

test("blank and whitespace-only fields stay unknown", () => {
  const rows = summaryRows({ ...emptyFacts, outcome: " \n " });
  assert.equal(rows.length, 5);
  assert.ok(rows.every(({ text }) => text === "待確認"));
});

test("summary retains only the submitted facts in their own fields", () => {
  const text = formatSummary(exampleFacts);
  assert.match(text, /已採取行動：詢問長者是否想晚一點再洗/);
  assert.match(text, /目前結果：待確認/);
  assert.doesNotMatch(text, /已完成洗澡/);
});

test("non-Chinese source text is preserved verbatim", () => {
  assert.match(formatSummary({ ...emptyFacts, event: "Belum mau mandi" }), /事件：Belum mau mandi/);
});
