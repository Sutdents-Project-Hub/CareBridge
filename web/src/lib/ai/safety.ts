import type { AdvisorResponse, ChatRequest, Locale } from "./contracts";

// Narrow text matches are a preflight aid, not clinical triage or a complete classifier.
// Only user turns are scanned: generated advice cannot become evidence of an emergency.
const urgent = /失去意識|失去反應|沒有反應|無反應|昏倒|昏迷|呼吸困難|無法呼吸|沒[有]?呼吸|單[側邊].{0,5}(無力|沒力)|突然[^，。！？;；\n]{0,12}(?:說話不清|口齒不清|(?:說|講)不出(?:話|完整的話)|嘴角歪斜|臉歪|(?:左|右)手抬不起來)|\bunresponsive\b|\bunconscious\b|\bcollapsed\b|\b(can(?:not|['’]t) breathe|not breathing|trouble breathing|one[- ]sided weakness)\b|tidak (?:sadarkan diri|sadar|merespons|bernapas)|sulit bernapas|sesak napas|tiba-tiba pingsan|lemah (?:di )?satu sisi/iu;
const medication = /(?:藥|药).{0,18}(?:加倍|加量|減量|增[加量]|停[用藥]|換|調整|劑量)|(?:加倍|加量|減量|停用|換|調整).{0,10}[藥药]|\b(?:dose|dosage|prescri(?:be|ption))\b|\b(?:double|increase|decrease|stop|change).{0,25}\b(?:medication|medicine|pills?)\b|\b(?:dosis|resep)\b|\b(?:menambah|mengurangi|menghentikan|mengganti).{0,20}\bobat/iu;
const deniedUrgency = [
  /(^|[，。！？；,.!?;]\s*)(?:長者|他|她|爺爺|奶奶|阿嬤)?(?:沒有|並無|未出現)(?:呼吸困難|失去意識|昏迷|昏倒|單側無力)(?=$|[，。！？；,.!?;])/giu,
  /(^|[,.;!?]\s*)(?:(?:she|he|they|the person) (?:(?:is|are|was|were|has|have|had|did) )?)?(?:no (?:trouble|difficulty) breathing|not (?:unresponsive|unconscious|collapse))(?=\s*(?:$|[,.;!?])|\s+but\b)/giu,
  /(^|[,.;!?]\s*)(?:(?:lansia|nenek|ibu|dia) )?tidak (?:sesak napas|sulit bernapas|pingsan)(?=\s*(?:$|[,.;!?])|\s+tetapi\b)/giu,
];
const professionalHandoff = /(?:^|[。！？；，,.!?;]\s*)(?:剛才)?(?:(?:長者|他|她)已(?:經)?由)?(?:救護人員|醫護人員)(?:已(?:經)?)?接手(?:了)?(?=$|[。！？；，,.!?;])|(?:^|[,.;!?]\s*)(?:the )?(?:paramedics|medical staff) (?:have |has )?taken over(?: (?:her|his|their|the patient['’]s) care)?(?=\s*(?:$|[,.;!?]))|(?:^|[,.;!?]\s*)petugas medis (?:sudah|telah) menangani (?:lansia|nenek|ibu|dia|pasien)(?=\s*(?:$|[,.;!?]))/iu;
const medicationFollowUp = /^(?:那)?(?:現在呢|接下來呢|怎麼辦|可以嗎|少一點呢|多一點呢|要繼續嗎|現在要怎麼辦)[？?。.!！\s]*$|^(?:and )?(?:what now|now what|what (?:should|can|do) I do(?: now)?|is that okay|can I (?:still )?take it)[?.!\s]*$|^(?:lalu )?(?:bagaimana sekarang|apa yang harus saya lakukan|bolehkah)[?.!\s]*$/iu;
const medicationIncident = /(?:剛剛|剛才|已經)[^，。！？\n]{0,8}(?:多吃了|多吞了|多給了|多餵了)|\b(?:already|just) (?:took|swallowed|gave) (?:another|an extra|too many|too much)\b|(?:baru saja|sudah) (?:minum|meminum|menelan|memberi) (?:lebih banyak|terlalu banyak|dosis tambahan)/iu;

function hasUrgentWording(text: string) {
  return urgent.test(deniedUrgency.reduce((value, denial) => value.replace(denial, "$1"), text));
}

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
  let ongoingUrgency = false;
  let medicationContext = false;
  for (const message of request.messages) {
    if (message.role !== "user") continue;
    const text = message.content.trim();
    if (hasUrgentWording(text) || ((medicationContext || medication.test(text)) && medicationIncident.test(text))) ongoingUrgency = true;
    else if (professionalHandoff.test(text)) ongoingUrgency = false;
    medicationContext = medication.test(text) || (medicationContext && medicationFollowUp.test(text));
  }
  const reason = ongoingUrgency ? "urgent" : medicationContext ? "medication" : null;
  if (!reason) return null;
  return {
    kind: "escalation", locale: request.locale,
    seekHelp: copy[request.locale][reason],
    limitations: [copy[request.locale].limitations],
    modelInfo: { provider: "carebridge-rule", model: "none", promptVersion: "rules-2026-11-23", provenance: "deterministic-rule" },
  };
}
