import { fieldIds } from "./copy";

export type Facts = Record<(typeof fieldIds)[number], string>;

export const emptyFacts: Facts = {
  event: "", observations: "", actionsTaken: "", outcome: "", unknowns: "",
};

export const exampleFacts: Facts = {
  event: "長者下午表示不想洗澡",
  observations: "聽到提議洗澡時，長者說「我現在不想」",
  actionsTaken: "詢問長者是否想晚一點再洗",
  outcome: "",
  unknowns: "長者稍後是否願意洗澡",
};

const headings: Facts = {
  event: "事件", observations: "實際觀察", actionsTaken: "已採取行動",
  outcome: "目前結果", unknowns: "尚需確認",
};

export function summaryRows(facts: Facts) {
  return fieldIds.map((key) => ({
    key,
    heading: headings[key],
    text: facts[key].trim() || "待確認",
  }));
}

export function formatSummary(facts: Facts) {
  return ["家屬照護摘要", ...summaryRows(facts).map(({ heading, text }) => `${heading}：${text}`)].join("\n");
}
