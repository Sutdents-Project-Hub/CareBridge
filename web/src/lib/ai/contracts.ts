// Browser-safe contract. Provider configuration and prompts belong on the server.
export const CHAT_LIMITS = {
  messageChars: 4_000,
  messages: 25,
  totalChars: 24_000,
  bodyBytes: 131_072,
  outputTokens: 2_000,
  timeoutMs: 30_000,
  requestsPerMinute: 20,
  requestsPerDay: 200,
  concurrentRequests: 3,
} as const;

export type UserProfile = "novice_caregiver" | "experienced_caregiver" | "family";
export type Locale = "zh-TW" | "en" | "id";
export type AnswerStyle = "brief" | "detailed";
export type Intent = "guidance" | "phrase";
export type ChatMessage = { role: "user" | "assistant"; content: string };
export type ChatRequest = {
  profile: UserProfile;
  locale: Locale;
  style: AnswerStyle;
  intent: Intent;
  messages: ChatMessage[];
  scenarioId?: string;
};
export type ModelInfo = {
  provider: "openai" | "carebridge-rule";
  model: string; // "none" for deterministic rules: no model was called.
  promptVersion: string;
  provenance: "model" | "deterministic-rule";
  maxOutputTokens?: number;
};
export type AdvisorResponse = {
  kind: "guidance" | "clarification" | "escalation";
  locale: Locale;
  understanding?: string;
  actions?: string[];
  phrase?: { primary: string; zhTwReference?: string };
  questions?: string[];
  observe?: string[];
  seekHelp?: string;
  limitations?: string[];
  modelInfo: ModelInfo;
};
export type ChatErrorCode =
  | "BAD_REQUEST" | "BODY_TOO_LARGE" | "UNSUPPORTED_MEDIA_TYPE"
  | "RATE_LIMITED" | "NOT_CONFIGURED" | "UPSTREAM_TIMEOUT"
  | "UPSTREAM_ERROR" | "INVALID_RESPONSE";
export type ChatError = { error: { code: ChatErrorCode } };
