export const languages = [
  { id: "zh-TW", name: "繁體中文" },
  { id: "en", name: "English" },
  { id: "id", name: "Bahasa Indonesia" },
] as const;

export const roles = ["novice_caregiver", "experienced_caregiver", "family"] as const;
export const storyIds = ["repeat", "bath", "restless", "meal", "update", "words"] as const;
export const fieldIds = ["event", "observations", "actionsTaken", "outcome", "unknowns"] as const;

type Copy = Record<
  "chat" | "summary" | "privacy" | "language" | "title" | "intro" | "start" |
  "preferences" | "role" | "length" | "brief" | "detailed" | "topics" | "topicHint" |
  "composer" | "followUp" | "placeholder" | "send" | "working" | "replyReady" | "clear" | "retry" | "export" |
  "you" | "advisor" | "understanding" | "actions" | "phrase" | "phraseRequest" | "reference" |
  "questions" | "observe" | "help" | "limitations" | "copy" | "copied" | "copyError" |
  "summaryIntro" | "sourceLanguage" | "preview" | "confirm" | "copySummary" | "example" |
  "privacyIntro" | "privacyOpenAI" | "privacyStorage" | "privacyReview" | "privacyMedical" |
  "exportWarning" | "clearWarning" | "download" | "cancel" | "downloaded" |
  "ruleNotice" | "imageAlt" | "skip" | "limitNotice",
  string
> & {
  roles: Record<(typeof roles)[number], [string, string]>;
  stories: Record<(typeof storyIds)[number], [string, string]>;
  fields: Record<(typeof fieldIds)[number], [string, string]>;
  errors: Record<string, string>;
};

const zh: Copy = {
  chat: "照護對話", summary: "家屬摘要", privacy: "隱私與使用界線", language: "語言",
  title: "不知道怎麼說？\n一起想一句。",
  intro: "用熟悉的語言描述失智照護情境。一起找出尊重長者的說法，也能把實際發生的事整理給家人。",
  start: "開始照護對話", preferences: "對話設定", role: "你的角色", length: "回答長度",
  brief: "精簡", detailed: "詳細", topics: "常見照護情境", topicHint: "選一個情境帶入草稿，修改後再送出。",
  composer: "描述你遇到的情況", followUp: "繼續追問", placeholder: "例如：長者今天不想洗澡，我可以怎麼開口？",
  send: "送出", working: "正在準備回覆…", replyReady: "收到新回覆", clear: "清除", retry: "重試", export: "匯出",
  you: "你", advisor: "CareBridge 顧問", understanding: "我理解的情況", actions: "可以試試",
  phrase: "一句可以直接說的話", phraseRequest: "請給我一句可以直接說的話。", reference: "繁中對照",
  questions: "想先確認", observe: "可以留意", help: "何時尋求協助", limitations: "回覆限制",
  copy: "複製", copied: "已複製", copyError: "無法使用剪貼簿，請選取文字手動複製。",
  summaryIntro: "只填入你能確認的事。保留未知資訊，核對預覽後再自行分享。",
  sourceLanguage: "摘要欄名固定為繁體中文，填入的原文會保留。需要翻譯時，請先自行核對後再填入。",
  preview: "繁中摘要預覽", confirm: "我已核對內容，摘要只包含已知事實與待確認事項。",
  copySummary: "複製摘要", example: "帶入虛構範例",
  privacyIntro: "請使用虛構情境或去識別內容。避免輸入真實姓名、聯絡方式、病歷和能辨識個人的細節。",
  privacyOpenAI: "送出對話時，必要的近期訊息和對話設定會傳給 OpenAI 以產生回覆。家屬摘要欄位只在瀏覽器處理。",
  privacyStorage: "CareBridge 將本次內容保存在分頁記憶體。重新整理或關閉分頁會清除內容。匯出的檔案由你管理。",
  privacyReview: "英文與印尼文內容仍待母語者審查。照護建議尚未經臨床驗證。",
  privacyMedical: "本服務提供日常溝通建議。診斷、用藥或緊急狀況請聯絡合適的專業人員或當地緊急服務。",
  exportWarning: "檔案會包含整段問答、模型及提示詞版本。請確認內容使用虛構案例或已去識別，再下載；分享權限由你管理。",
  clearWarning: "確定要清除這次的對話與草稿？",
  download: "確認並下載", cancel: "取消", downloaded: "已下載對話紀錄",
  ruleNotice: "這則是 CareBridge 的固定安全提醒。", imageAlt: "居家照護者坐在長者身旁，兩人輕聲交談。",
  skip: "跳到主要內容", limitNotice: "顧問會參考近期訊息，完整對話仍可匯出。",
  roles: {
    novice_caregiver: ["新手照護者", "需要可跟著做的步驟"],
    experienced_caregiver: ["資深照護者", "先看重點與觀察事項"],
    family: ["長者家屬", "想釐清事實與未知"],
  },
  stories: {
    repeat: ["反覆提問", "長者一直問同一個問題。我已經回答好幾次，還能怎麼回應？"],
    bath: ["拒絕洗澡", "長者現在不想洗澡，我可以怎麼尊重他的選擇並開口？"],
    restless: ["焦躁不安", "長者看起來焦躁，在房裡來回走動。我可以怎麼和他說話？"],
    meal: ["不願進食", "長者看到餐點後說不想吃。我可以先問什麼、怎麼回應？"],
    update: ["家屬回報", "我想和家屬說明長者下午不想洗澡，我只問了要不要晚點，結果還不知道。可以怎麼說？"],
    words: ["不知道怎麼說", "我想用尊重的方式開口，卻不知道從哪一句開始。可以先幫我釐清情境嗎？"],
  },
  fields: {
    event: ["發生的事件", "例如：長者下午表示不想洗澡"],
    observations: ["實際觀察", "看到或聽到什麼？"],
    actionsTaken: ["已採取的行動", "你實際做了什麼？"],
    outcome: ["目前結果", "發生了什麼變化？"],
    unknowns: ["尚需確認", "還有哪些資訊待確認？"],
  },
  errors: {
    BAD_REQUEST: "訊息無法送出。請縮短內容後再試。",
    NOT_CONFIGURED: "OpenAI 尚未設定。請由管理者設定伺服器環境變數後再試。",
    RATE_LIMITED: "目前使用量較高，請稍後重試。",
    UPSTREAM_TIMEOUT: "回覆逾時，請再試一次。",
    UPSTREAM_ERROR: "暫時無法取得 OpenAI 回覆，請稍後重試。",
    INVALID_RESPONSE: "這次回覆未通過格式檢查，請再試一次。",
    NETWORK: "無法連線，請檢查網路後重試。",
    UNKNOWN: "暫時無法完成對話，請稍後重試。",
  },
};

const en: Copy = {
  chat: "Care conversations", summary: "Family summary", privacy: "Privacy and limits", language: "Language",
  title: "Find the words\nfor daily care.",
  intro: "Describe a dementia care situation in your own language. Find respectful ways to respond and share what happened with family.",
  start: "Start a conversation", preferences: "Conversation settings", role: "Your role", length: "Answer length",
  brief: "Brief", detailed: "Detailed", topics: "Common care situations", topicHint: "Choose a situation to start an editable draft.",
  composer: "Describe the situation", followUp: "Ask a follow-up", placeholder: "For example: The person I care for doesn't want to bathe. What could I say?",
  send: "Send", working: "Preparing a reply…", replyReady: "New reply received", clear: "Clear", retry: "Retry", export: "Export",
  you: "You", advisor: "CareBridge advisor", understanding: "What I understand", actions: "What you can try",
  phrase: "Something you can say", phraseRequest: "Give me one respectful phrase I can say.", reference: "Traditional Chinese reference",
  questions: "Questions to clarify", observe: "What to look out for", help: "When to get help", limitations: "Limits",
  copy: "Copy", copied: "Copied", copyError: "Clipboard unavailable. Select and copy the text manually.",
  summaryIntro: "Enter facts you can confirm. Keep unknowns visible and review the summary before sharing it.",
  sourceLanguage: "Headings appear in Traditional Chinese. Your wording is kept as entered. Review any translation before entering it.",
  preview: "Traditional Chinese preview", confirm: "I checked the summary. It contains known facts and items to confirm.",
  copySummary: "Copy summary", example: "Load fictional example",
  privacyIntro: "Use fictional situations or de-identified details. Avoid real names, contact details, medical records, and identifying information.",
  privacyOpenAI: "When you send a message, the necessary recent messages and settings go to OpenAI for a reply. The family summary is processed in your browser.",
  privacyStorage: "Your session stays in this tab. Reloading or closing the tab clears it. You manage any files you export.",
  privacyReview: "The English and Indonesian content still needs native-speaker review. The care guidance has no clinical validation.",
  privacyMedical: "CareBridge supports everyday communication. For diagnosis, medication, or urgent situations, contact an appropriate professional or local emergency services.",
  exportWarning: "The file includes the full conversation and model and prompt details. Check that the example is fictional or de-identified before downloading. You manage sharing.",
  clearWarning: "Clear this conversation and its draft?",
  download: "Confirm and download", cancel: "Cancel", downloaded: "Conversation downloaded",
  ruleNotice: "This is a preset CareBridge safety notice.", imageAlt: "A caregiver sits beside an older adult and talks with her at home.",
  skip: "Skip to main content", limitNotice: "The advisor uses recent messages. You can export the full conversation.",
  roles: {
    novice_caregiver: ["New caregiver", "Get steps you can follow"],
    experienced_caregiver: ["Experienced caregiver", "See key points and observations"],
    family: ["Family member", "Clarify facts and unknowns"],
  },
  stories: {
    repeat: ["Repeated questions", "The person I care for keeps asking the same question. I've answered several times. How could I respond?"],
    bath: ["Declining a bath", "The person I care for doesn't want to bathe now. How can I respect their choice and start a conversation?"],
    restless: ["Restlessness", "The person I care for seems restless and is pacing. How could I speak with them?"],
    meal: ["Declining a meal", "The person I care for says they don't want to eat. What could I ask first, and how could I respond?"],
    update: ["Updating family", "I want to tell the family the person declined a bath. I only asked about trying later and don't know the outcome. How can I phrase this?"],
    words: ["Finding the words", "I want to start a respectful conversation but don't know what to say. Can you help me clarify the situation first?"],
  },
  fields: {
    event: ["Event", "For example: The person declined a bath in the afternoon"],
    observations: ["Observations", "What did you see or hear?"],
    actionsTaken: ["Actions taken", "What did you actually do?"],
    outcome: ["Current outcome", "What changed?"],
    unknowns: ["Still to confirm", "What is still unknown?"],
  },
  errors: {
    BAD_REQUEST: "This message could not be sent. Shorten it and try again.",
    NOT_CONFIGURED: "OpenAI is not configured. Ask the administrator to set the server environment variables.",
    RATE_LIMITED: "Usage is high right now. Try again later.",
    UPSTREAM_TIMEOUT: "The reply timed out. Try again.",
    UPSTREAM_ERROR: "The OpenAI reply is temporarily unavailable. Try again later.",
    INVALID_RESPONSE: "This reply did not pass validation. Try again.",
    NETWORK: "Unable to connect. Check your connection and retry.",
    UNKNOWN: "The conversation is temporarily unavailable. Try again later.",
  },
};

const id: Copy = {
  chat: "Percakapan perawatan", summary: "Ringkasan keluarga", privacy: "Privasi dan batasan", language: "Bahasa",
  title: "Temukan kata\nuntuk merawat.",
  intro: "Ceritakan situasi saat mendampingi lansia dengan demensia. Cari cara bicara yang menghargai lansia dan sampaikan kejadian kepada keluarga.",
  start: "Mulai percakapan", preferences: "Pengaturan percakapan", role: "Peran Anda", length: "Panjang jawaban",
  brief: "Ringkas", detailed: "Rinci", topics: "Situasi perawatan sehari-hari", topicHint: "Pilih situasi untuk mengisi draf yang bisa diedit.",
  composer: "Ceritakan situasinya", followUp: "Ajukan pertanyaan lanjutan", placeholder: "Contoh: Lansia yang saya rawat tidak mau mandi. Apa yang bisa saya katakan?",
  send: "Kirim", working: "Sedang menyiapkan jawaban…", replyReady: "Balasan baru diterima", clear: "Hapus", retry: "Coba lagi", export: "Ekspor",
  you: "Anda", advisor: "Penasihat CareBridge", understanding: "Pemahaman saya", actions: "Yang bisa dicoba",
  phrase: "Kalimat yang bisa diucapkan", phraseRequest: "Tolong beri satu kalimat yang sopan dan bisa langsung saya ucapkan.", reference: "Padanan Mandarin Tradisional",
  questions: "Hal yang perlu ditanyakan", observe: "Yang perlu diperhatikan", help: "Kapan mencari bantuan", limitations: "Batasan jawaban",
  copy: "Salin", copied: "Disalin", copyError: "Papan klip tidak tersedia. Pilih dan salin teks secara manual.",
  summaryIntro: "Masukkan fakta yang dapat dipastikan. Tunjukkan hal yang belum diketahui dan periksa ringkasan sebelum membagikannya.",
  sourceLanguage: "Judul kolom menggunakan aksara Tionghoa Tradisional. Teks Anda tetap aslinya. Periksa terjemahan sebelum memasukkannya.",
  preview: "Pratinjau Tionghoa Tradisional", confirm: "Saya telah memeriksa fakta dan hal yang masih perlu dikonfirmasi.",
  copySummary: "Salin ringkasan", example: "Gunakan contoh fiktif",
  privacyIntro: "Gunakan situasi fiktif atau informasi anonim. Hindari nama asli, kontak, rekam medis, dan detail pengenal.",
  privacyOpenAI: "Saat Anda mengirim pesan, pesan terbaru yang diperlukan dan pengaturan dikirim ke OpenAI. Ringkasan keluarga diproses di peramban.",
  privacyStorage: "Sesi disimpan di tab ini. Muat ulang atau tutup tab untuk menghapusnya. Anda mengelola file yang diekspor.",
  privacyReview: "Konten bahasa Inggris dan Indonesia masih perlu ditinjau penutur asli. Saran perawatan belum divalidasi secara klinis.",
  privacyMedical: "CareBridge membantu komunikasi sehari-hari. Untuk diagnosis, obat, atau keadaan darurat, hubungi tenaga profesional atau layanan darurat setempat.",
  exportWarning: "File memuat percakapan lengkap, model, dan versi prompt. Pastikan isinya fiktif atau tanpa identitas sebelum mengunduh. Anda mengelola pembagiannya.",
  clearWarning: "Hapus percakapan dan draf ini?",
  download: "Konfirmasi dan unduh", cancel: "Batal", downloaded: "Percakapan telah diunduh",
  ruleNotice: "Ini adalah pemberitahuan keselamatan tetap dari CareBridge.", imageAlt: "Seorang perawat duduk dan berbincang dengan lansia di rumah.",
  skip: "Langsung ke konten utama", limitNotice: "Penasihat melihat pesan terbaru. Seluruh percakapan tetap dapat diekspor.",
  roles: {
    novice_caregiver: ["Pendamping pemula", "Dapatkan langkah yang mudah diikuti"],
    experienced_caregiver: ["Pendamping berpengalaman", "Lihat poin utama dan pengamatan"],
    family: ["Anggota keluarga", "Perjelas fakta dan hal yang belum pasti"],
  },
  stories: {
    repeat: ["Pertanyaan berulang", "Lansia yang saya rawat terus menanyakan hal yang sama. Saya sudah beberapa kali menjawab. Bagaimana saya bisa menanggapi?"],
    bath: ["Menolak mandi", "Lansia yang saya rawat belum mau mandi. Bagaimana saya bisa menghargai pilihannya dan mulai berbicara?"],
    restless: ["Gelisah", "Lansia tampak gelisah dan mondar-mandir. Bagaimana sebaiknya saya berbicara dengannya?"],
    meal: ["Menolak makan", "Lansia berkata tidak ingin makan. Apa yang bisa saya tanyakan dan bagaimana saya bisa menanggapinya?"],
    update: ["Kabar untuk keluarga", "Lansia tidak ingin mandi. Saya sudah menanyakan apakah ingin mandi nanti, tetapi hasilnya belum diketahui. Bagaimana saya menyampaikan ini kepada keluarga?"],
    words: ["Bingung mau bilang apa", "Saya ingin berbicara dengan sopan tetapi bingung harus berkata apa. Bisakah Anda membantu memperjelas situasinya dulu?"],
  },
  fields: {
    event: ["Kejadian", "Contoh: Lansia menolak mandi pada sore hari"],
    observations: ["Pengamatan", "Apa yang dilihat atau didengar?"],
    actionsTaken: ["Tindakan yang dilakukan", "Apa yang benar-benar Anda lakukan?"],
    outcome: ["Hasil saat ini", "Apa yang berubah?"],
    unknowns: ["Perlu dikonfirmasi", "Apa yang belum diketahui?"],
  },
  errors: {
    BAD_REQUEST: "Pesan tidak bisa dikirim. Persingkat lalu coba lagi.",
    NOT_CONFIGURED: "OpenAI belum dikonfigurasi. Minta pengelola mengatur variabel lingkungan server.",
    RATE_LIMITED: "Penggunaan sedang tinggi. Coba lagi nanti.",
    UPSTREAM_TIMEOUT: "Waktu tunggu balasan habis. Coba lagi.",
    UPSTREAM_ERROR: "Jawaban dari OpenAI sementara tidak tersedia. Coba lagi nanti.",
    INVALID_RESPONSE: "Jawaban ini tidak lolos validasi. Coba lagi.",
    NETWORK: "Tidak dapat terhubung. Periksa koneksi dan coba lagi.",
    UNKNOWN: "Percakapan sementara tidak tersedia. Coba lagi nanti.",
  },
};

export const dictionary = { "zh-TW": zh, en, id };
export type Locale = keyof typeof dictionary;
export type Translation = Copy;
