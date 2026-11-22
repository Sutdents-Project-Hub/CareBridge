import type { AdvisorResponse, ChatRequest, Locale } from "./contracts";

// Narrow text matches are a preflight aid, not clinical triage or a complete classifier.
// Only user turns are scanned: generated advice cannot become evidence of an emergency.
const urgent = /失去意識|失去反應|沒有反應|無反應|昏倒|昏迷|呼吸困難|無法呼吸|沒[有]?呼吸|單[側邊].{0,5}(無力|沒力)|突然.{0,8}說話不清|\bunresponsive\b|\bunconscious\b|\bcollapsed\b|\b(can(?:not|'t) breathe|not breathing|trouble breathing|one[- ]sided weakness)\b|tidak (?:sadarkan diri|sadar|merespons|bernapas)|sulit bernapas|sesak napas|tiba-tiba pingsan|lemah (?:di )?satu sisi/iu;
const medication = /(?:藥|药).{0,18}(?:加倍|加量|減量|增[加量]|停[用藥]|換|調整|劑量)|(?:加倍|加量|減量|停用|換|調整).{0,10}[藥药]|\b(?:dose|dosage|prescri(?:be|ption))\b|\b(?:double|increase|decrease|stop|change).{0,25}\b(?:medication|medicine|pills?)\b|\b(?:dosis|resep)\b|\b(?:menambah|mengurangi|menghentikan|mengganti).{0,20}\bobat/iu;

const copy: Record<Locale, { urgent: string; medication: string; limitations: string }> = {
  "zh-TW": {
    urgent: "你描述的內容可能涉及急迫風險。請立即聯絡當地緊急服務或現場醫療人員；不要等待聊天回覆而延誤求助。我無法在此判斷或診斷情況。",
    medication: "我不能提供處方、劑量或調藥指示。請向醫師或藥師確認用藥問題；若有急迫異常，請聯絡當地緊急服務或醫療人員。",
    limitations: "這是固定安全規則提醒，未呼叫 AI；不屬醫療判斷，規則無法辨識所有風險。翻譯未經母語者完整審查。",
  },
  en: {
    urgent: "Your description may involve an urgent risk. Contact local emergency services or on-site medical help immediately. Do not wait for this chat and delay help. I cannot assess or diagnose the situation here.",
    medication: "I cannot provide prescriptions, doses or medication changes. Ask a doctor or pharmacist about medication. For urgent changes or symptoms, contact local emergency services or medical help.",
    limitations: "This is a fixed safety-rule notice; no AI model was called. It is not a medical assessment and cannot detect every risk. Translations have not had full native-speaker review.",
  },
  id: {
    urgent: "Situasi yang Anda ceritakan mungkin mendesak. Segera hubungi layanan darurat setempat atau tenaga medis di lokasi. Jangan menunggu balasan percakapan ini hingga menunda pertolongan. Saya tidak dapat menilai atau mendiagnosis situasi ini.",
    medication: "Saya tidak dapat memberikan resep, dosis, atau petunjuk perubahan obat. Tanyakan kepada dokter atau apoteker. Jika ada perubahan atau gejala mendesak, hubungi layanan darurat setempat atau tenaga medis.",
    limitations: "Ini adalah pemberitahuan aturan keselamatan tetap; tidak ada model AI yang dipanggil. Ini bukan penilaian medis dan tidak dapat mendeteksi semua risiko. Terjemahan belum ditinjau sepenuhnya oleh penutur asli.",
  },
};

export function safetyPreflight(request: ChatRequest): AdvisorResponse | null {
  const userText = request.messages.filter((message) => message.role === "user").map((message) => message.content).join("\n");
  const reason = urgent.test(userText) ? "urgent" : medication.test(userText) ? "medication" : null;
  if (!reason) return null;
  return {
    kind: "escalation", locale: request.locale,
    seekHelp: copy[request.locale][reason],
    limitations: [copy[request.locale].limitations],
    modelInfo: { provider: "carebridge-rule", model: "none", promptVersion: "V3-rule-2026-11-22", provenance: "deterministic-rule" },
  };
}
