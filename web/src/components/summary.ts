import { fieldIds } from "./copy";

export type Facts = Record<(typeof fieldIds)[number], string>;
export type SummaryLanguage = "en" | "zh-TW";

export const emptyFacts: Facts = {
  event: "", observations: "", actionsTaken: "", outcome: "", unknowns: "",
};

export const summaryFormats: Record<SummaryLanguage, { title: string; headings: Facts; unknown: string; separator: string; example: Facts }> = {
  en: {
    title: "Family care summary",
    headings: { event: "Event", observations: "Observations", actionsTaken: "Actions taken", outcome: "Current outcome", unknowns: "Still to confirm" },
    unknown: "To confirm",
    separator: ": ",
    example: {
      event: "The older adult declined a bath this afternoon.",
      observations: "When asked about bathing, they said, “I don’t want to right now.”",
      actionsTaken: "I asked whether they would prefer to bathe later.",
      outcome: "",
      unknowns: "Whether they wanted to bathe later.",
    },
  },
  "zh-TW": {
    title: "家屬照護摘要",
    headings: { event: "事件", observations: "實際觀察", actionsTaken: "已採取行動", outcome: "目前結果", unknowns: "尚需確認" },
    unknown: "待確認",
    separator: "：",
    example: {
      event: "長者下午表示不想洗澡",
      observations: "聽到提議洗澡時，長者說「我現在不想」",
      actionsTaken: "詢問長者是否想晚一點再洗",
      outcome: "",
      unknowns: "長者稍後是否願意洗澡",
    },
  },
};

export function summaryRows(facts: Facts, language: SummaryLanguage) {
  const { headings, unknown } = summaryFormats[language];
  return fieldIds.map((key) => ({
    key,
    heading: headings[key],
    text: facts[key].trim() || unknown,
  }));
}

export function formatSummary(facts: Facts, language: SummaryLanguage) {
  const { title, separator } = summaryFormats[language];
  return [title, ...summaryRows(facts, language).map(({ heading, text }) => `${heading}${separator}${text}`)].join("\n");
}
