import { z } from "zod";
import { CHAT_LIMITS, type ChatRequest, type AdvisorResponse } from "./contracts";

export const chatRequestSchema = z.object({
  profile: z.enum(["novice_caregiver", "experienced_caregiver", "family"]),
  locale: z.enum(["zh-TW", "en", "id"]),
  style: z.enum(["brief", "detailed"]),
  intent: z.enum(["guidance", "phrase"]),
  messages: z.array(z.object({
    role: z.enum(["user", "assistant"]),
    content: z.string().trim().min(1).max(CHAT_LIMITS.messageChars),
  }).strict()).min(1).max(CHAT_LIMITS.messages),
  scenarioId: z.string().regex(/^[a-z0-9-]{1,64}$/).optional(),
}).strict().refine((value) =>
  value.messages.reduce((count, message) => count + message.content.length, 0) <= CHAT_LIMITS.totalChars &&
  value.messages.every((message, index) => message.role === (index % 2 ? "assistant" : "user")) &&
  value.messages.at(-1)?.role === "user",
  "History must be bounded, alternating, start and end with a user message",
);

const text = z.string().trim().min(1).max(1_200);
// All fields are required and nullable for the provider's strict JSON schema.
// Runtime validation additionally bounds lengths and requires meaningful sections.
export const modelAnswerSchema = z.object({
  kind: z.enum(["guidance", "clarification", "escalation"]),
  locale: z.enum(["zh-TW", "en", "id"]),
  understanding: text.nullable(),
  actions: z.array(text).max(3).nullable(),
  phrase: z.object({ primary: text, zhTwReference: text.nullable() }).strict().nullable(),
  questions: z.array(text).max(2).nullable(),
  observe: z.array(text).max(3).nullable(),
  seekHelp: text.nullable(),
  limitations: z.array(text).max(3).nullable(),
}).strict();

export function parseModelAnswer(value: unknown, request: ChatRequest): Omit<AdvisorResponse, "modelInfo"> {
  const answer = modelAnswerSchema.parse(value);
  if (answer.locale !== request.locale ||
      (answer.kind === "clarification" && !answer.questions?.length) ||
      (answer.kind === "escalation" && !answer.seekHelp) ||
      (answer.kind === "guidance" && !answer.actions?.length && !answer.phrase) ||
      (request.intent === "phrase" && answer.kind === "guidance" && !answer.phrase)) {
    throw new Error("INVALID_RESPONSE");
  }
  return {
    kind: answer.kind,
    locale: answer.locale,
    ...(answer.understanding && { understanding: answer.understanding }),
    ...(answer.actions?.length && { actions: answer.actions }),
    ...(answer.phrase && { phrase: {
      primary: answer.phrase.primary,
      ...(answer.phrase.zhTwReference && { zhTwReference: answer.phrase.zhTwReference }),
    } }),
    ...(answer.questions?.length && { questions: answer.questions }),
    ...(answer.observe?.length && { observe: answer.observe }),
    ...(answer.seekHelp && { seekHelp: answer.seekHelp }),
    ...(answer.limitations?.length && { limitations: answer.limitations }),
  };
}
