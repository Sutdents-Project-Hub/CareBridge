import type { AdvisorResponse } from "@/lib/ai/contracts";
import { dictionary } from "./copy";
import type { Turn } from "./conversation";

function escape(text: string) {
  return text.replace(/[&<>"']/g, (char) => ({
    "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;",
  }[char]!));
}

function paragraph(title: string, body?: string, className = "") {
  return body ? `<section class="${className}"><h3>${escape(title)}</h3><p>${escape(body)}</p></section>` : "";
}

function list(title: string, items?: string[]) {
  return items?.length ? `<section><h3>${escape(title)}</h3><ul>${items.map((item) => `<li>${escape(item)}</li>`).join("")}</ul></section>` : "";
}

function answer(response: AdvisorResponse) {
  const t = dictionary[response.locale];
  const help = paragraph(t.help, response.seekHelp, "help");
  const reference = response.phrase?.zhTwReference;
  return [
    response.modelInfo.provenance === "deterministic-rule" ? `<p>${escape(t.ruleNotice)}</p>` : "",
    response.kind === "escalation" ? help : "",
    paragraph(t.understanding, response.understanding),
    list(t.questions, response.questions),
    list(t.actions, response.actions),
    paragraph(t.phrase, response.phrase?.primary),
    reference ? `<p>${escape(t.reference)} <span lang="zh-TW">${escape(reference)}</span></p>` : "",
    list(t.observe, response.observe),
    response.kind !== "escalation" ? help : "",
    list(t.limitations, response.limitations),
  ].join("");
}

export function transcriptHtml(turns: Turn[], exportedAt: string) {
  const cards = turns.map(({ request, response, question, askedAt, answeredAt }, index) => {
    const t = dictionary[request.locale];
    const { modelInfo } = response;
    const source = modelInfo.provenance === "model" ? `${modelInfo.provider} / ${modelInfo.model}` : "CareBridge safety rule";
    return `<article>
  <h2>Turn ${index + 1}</h2>
  <p class="meta">${escape(t.roles[request.profile][0])} · ${escape(request.locale)} · ${escape(t[request.style])} · ${escape(source)} · ${escape(modelInfo.promptVersion)}${modelInfo.reasoningEffort ? ` · Reasoning: ${escape(modelInfo.reasoningEffort)}` : ""}</p>
  <div lang="${escape(request.locale)}"><h3>${escape(t.you)}</h3><time datetime="${escape(askedAt)}">${escape(askedAt)}</time><p class="question">${escape(question)}</p></div>
  <div lang="${escape(response.locale)}"><h3>${escape(dictionary[response.locale].advisor)}</h3><time datetime="${escape(answeredAt)}">${escape(answeredAt)}</time>${answer(response)}</div>
</article>`;
  });
  return `<!doctype html>
<html lang="en"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1">
<title>CareBridge Conversation</title>
<style>
:root{color-scheme:light;font:16px/1.5 system-ui,sans-serif;color:#1e2b4a;background:#fff}
body{max-width:840px;margin:0 auto;padding:24px}h1,h2,h3,p{margin:0}
header,article{padding:20px;border:1px solid #d6deea;border-radius:12px;margin-bottom:16px}
header,.question{background:#f1f5fb}h1{font-size:1.9rem}h2{font-size:1.4rem}h3{font-size:1rem}
p,ul{white-space:pre-wrap;overflow-wrap:anywhere}p{margin-top:4px}ul{margin:4px 0;padding-left:24px}
.meta,time{color:#3b4763;font-size:.875rem}article>div,section{margin-top:12px}
.question,.help{padding:12px;border-radius:8px}.help{background:#fce3e1;color:#8a302e}
@media print{body{padding:0}section{break-inside:avoid}}
</style></head><body>
<header><h1>CareBridge Conversation</h1><p>${turns.length} turns · Exported ${escape(exportedAt)}</p>
<p>Review and remove identifying details before sharing. CareBridge offers communication support.</p></header>
<main>${cards.join("\n")}</main></body></html>`;
}
