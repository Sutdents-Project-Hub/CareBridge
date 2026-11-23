import type { AdvisorResponse, Locale, ModelInfo, UserProfile } from "@/lib/ai/contracts";

// Fictional case captured from nine successful live requests on 2026-11-23.
// See docs/evidence-log.md for the test conditions and original evidence.
export const comparisonCapture = {
  date: "2026-11-23",
  style: "brief",
  modelInfo: {
    "provider": "openai",
    "model": "gpt-6.1-terra",
    "promptVersion": "V5-2026-11-23",
    "provenance": "model",
    "maxOutputTokens": 2000,
    "reasoningEffort": "medium"
  },
} as const satisfies { date: string; style: "brief"; modelInfo: ModelInfo };

type CapturedReply = Omit<AdvisorResponse, "modelInfo"> & {
  understanding: string;
  actions: string[];
  phrase: NonNullable<AdvisorResponse["phrase"]>;
  limitations: string[];
};

export const comparisonExamples: Record<Locale, {
  question: string;
  answers: Record<UserProfile, CapturedReply>;
}> = {
  "zh-TW": {
    "question": "虛構情境：長者今天說「晚點，我覺得冷」。我在現場時，長者還沒洗澡。這時可以怎麼溝通，有哪些事需要確認？",
    "answers": {
      "novice_caregiver": {
        "kind": "guidance",
        "locale": "zh-TW",
        "understanding": "長者說了「晚點，我覺得冷」；您在場時還沒洗澡。這不代表長者已同意稍後洗澡。",
        "actions": [
          "先回應長者覺得冷，問問是否想加衣服或蓋毯子。",
          "尊重長者的選擇：可以先暫停，也可以今天不洗。",
          "需要交接時，確認之後是否有洗澡，並如實轉達長者說的話；若不清楚，就說尚未確認。"
        ],
        "phrase": {
          "primary": "您覺得冷，我們先不洗也可以。您想加件衣服或蓋條毯子嗎？"
        },
        "limitations": [
          "這是溝通建議，不能取代專業照護；如涉及翻譯，內容未經母語人士審校。"
        ]
      },
      "experienced_caregiver": {
        "kind": "guidance",
        "locale": "zh-TW",
        "understanding": "長者說了「晚點，我覺得冷」；您在現場時還沒洗澡。是否願意稍後洗澡仍不清楚。",
        "actions": [
          "先回應覺得冷的感受，確認長者現在是否需要保暖或其他協助。",
          "詢問長者想暫停、稍後再談，或今天不洗；尊重拒絕。",
          "交班時記錄長者的原話、當時尚未洗澡，以及後續是否有決定；不確定的事註明待確認。"
        ],
        "phrase": {
          "primary": "您覺得冷，我們先讓您暖和一點好嗎？洗澡的事可以稍後再談，也可以今天先不洗。"
        },
        "limitations": [
          "這是溝通支持，不能取代專業照護。"
        ]
      },
      "family": {
        "kind": "guidance",
        "locale": "zh-TW",
        "understanding": "您聽到長者說「晚點，我覺得冷」，您在場時長者還沒洗澡。是否願意稍後洗澡，目前還不知道。",
        "actions": [
          "先問照顧者當時的情況、是否試過什麼，以及長者的反應。",
          "確認長者現在是否仍覺得冷、需要什麼協助；不要把「晚點」當作已經同意稍後洗澡。",
          "尊重長者的選擇，可以暫停或今天不洗；若情況有變，再與照顧者確認。"
        ],
        "phrase": {
          "primary": "他說「晚點，我覺得冷」之後，你有試過什麼嗎？他的反應如何？"
        },
        "limitations": [
          "這是溝通建議，不能取代專業照護。"
        ]
      }
    }
  },
  "en": {
    "question": "Fictional scenario: An older adult said, “Later, I feel cold.” They had not bathed while I was there. What could I say, and which facts should I check?",
    "answers": {
      "novice_caregiver": {
        "kind": "guidance",
        "locale": "en",
        "understanding": "They said, “Later, I feel cold,” and had not bathed while you were there. It’s unknown whether they agreed to bathe later.",
        "actions": [
          "Ask whether they still feel cold and what would help them feel comfortable.",
          "Check whether they want to bathe, pause, or skip it today; respect their choice.",
          "If needed, ask the caregiver what has been tried and whether a bath happened at another time."
        ],
        "phrase": {
          "primary": "I hear you’re cold. We can pause or skip the bath today—what would you prefer?",
          "zhTwReference": "我聽到你覺得冷。我們可以先暫停，或今天不洗澡，你比較希望怎麼做？"
        },
        "limitations": [
          "This is communication support, not professional care. The translation has not been reviewed by a native speaker."
        ]
      },
      "experienced_caregiver": {
        "kind": "guidance",
        "locale": "en",
        "understanding": "They said, “Later, I feel cold,” and had not bathed while you were there. Whether they would agree to bathe later is unknown.",
        "actions": [
          "Check whether they still feel cold and what they would prefer now.",
          "For handover, check what was tried, what happened, and whether they bathed after you left."
        ],
        "phrase": {
          "primary": "You said you feel cold. Would you like a blanket, or would you prefer to rest?",
          "zhTwReference": "您說您覺得冷。您想要一條毯子，還是想先休息？"
        },
        "limitations": [
          "This is communication support, not professional care. The translation has not been reviewed by a native speaker."
        ]
      },
      "family": {
        "kind": "guidance",
        "locale": "en",
        "understanding": "You heard “Later, I feel cold,” and the person had not bathed while you were there. Whether they agreed to bathe later is unknown.",
        "actions": [
          "Ask the caregiver what was tried and how the person responded.",
          "Check whether a bath happened after you left and whether the person agreed to it."
        ],
        "phrase": {
          "primary": "They said, “Later, I feel cold.” What was tried, and what happened after I left?",
          "zhTwReference": "他們說：「晚一點，我覺得冷。」當時試了哪些方法？我離開後發生了什麼事？"
        },
        "limitations": [
          "This is communication support, not professional care. The translation has not been reviewed by a native speaker."
        ]
      }
    }
  },
  "id": {
    "question": "Situasi fiktif: Lansia berkata, “Nanti saja, saya kedinginan.” Selama saya ada di sana, beliau belum mandi. Apa yang bisa saya katakan, dan informasi apa yang perlu saya pastikan?",
    "answers": {
      "novice_caregiver": {
        "kind": "guidance",
        "locale": "id",
        "understanding": "Beliau mengatakan, “Nanti saja, saya kedinginan,” dan belum mandi selama Anda berada di sana. Belum diketahui apakah beliau bersedia mandi nanti.",
        "actions": [
          "Tanggapi rasa dinginnya; tawarkan selimut atau pakaian hangat jika beliau mau.",
          "Tanyakan apakah beliau ingin berhenti dulu atau tidak mandi hari ini. Hormati pilihannya.",
          "Pastikan dan catat apa yang sudah dicoba serta apa yang belum diketahui, termasuk apakah beliau mandi di luar waktu Anda berada di sana."
        ],
        "phrase": {
          "primary": "Bapak/Ibu kedinginan, ya? Mau pakai selimut dulu, atau tidak mandi dulu hari ini?",
          "zhTwReference": "您覺得冷啊？要先蓋個毯子，還是今天先不洗澡呢？"
        },
        "limitations": [
          "Ini dukungan komunikasi, bukan pengganti perawatan profesional. Terjemahan belum ditinjau penutur asli."
        ]
      },
      "experienced_caregiver": {
        "kind": "guidance",
        "locale": "id",
        "understanding": "Beliau berkata, “Nanti saja, saya kedinginan,” dan belum mandi selama Anda berada di sana. Kesediaannya untuk mandi nanti belum diketahui.",
        "actions": [
          "Tanyakan apakah beliau masih merasa kedinginan dan apakah ingin dibantu agar lebih nyaman.",
          "Saat serah terima, sampaikan kata-kata beliau dan bahwa beliau belum mandi selama Anda di sana; pastikan apa yang terjadi setelahnya tanpa menganggap beliau setuju mandi nanti."
        ],
        "phrase": {
          "primary": "Mau saya bantu supaya lebih hangat? Kita boleh berhenti dulu, dan tidak harus mandi hari ini.",
          "zhTwReference": "要我幫您暖和一點嗎？我們可以先停下來，今天也不一定要洗澡。"
        },
        "limitations": [
          "Ini dukungan komunikasi, bukan pengganti perawatan profesional. Terjemahan belum ditinjau oleh penutur asli."
        ]
      },
      "family": {
        "kind": "guidance",
        "locale": "id",
        "understanding": "Beliau berkata, “Nanti saja, saya kedinginan,” dan belum mandi selama Anda berada di sana. Belum diketahui apakah beliau bersedia mandi nanti.",
        "actions": [
          "Tanyakan kepada pendamping apa yang sudah dicoba dan bagaimana tanggapan beliau.",
          "Pastikan apakah ada rencana mandi dan apakah beliau bersedia; waktunya belum diketahui."
        ],
        "phrase": {
          "primary": "Tadi beliau bilang, “Nanti saja, saya kedinginan.” Apa yang sudah dicoba, dan apakah beliau bersedia mandi nanti?",
          "zhTwReference": "剛才長輩說：「等一下再說，我覺得冷。」請問已經試過什麼？長輩願意稍後洗澡嗎？"
        },
        "limitations": [
          "Ini dukungan komunikasi, bukan pengganti perawatan profesional. Terjemahan belum ditinjau penutur asli."
        ]
      }
    }
  }
};
