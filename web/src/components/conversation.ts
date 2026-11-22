import { CHAT_LIMITS, type AdvisorResponse, type ChatMessage, type ChatRequest } from "@/lib/ai/contracts";

export type Turn = {
  askedAt: string;
  answeredAt: string;
  request: Omit<ChatRequest, "messages">;
  question: string;
  response: AdvisorResponse;
};

function advisorText(response: AdvisorResponse) {
  return [
    response.seekHelp, response.understanding, ...response.actions ?? [],
    response.phrase?.primary, response.phrase?.zhTwReference,
    ...response.questions ?? [], ...response.observe ?? [], ...response.limitations ?? [],
  ].filter(Boolean).join("\n").slice(0, CHAT_LIMITS.messageChars);
}

export function prepareRequest(settings: Turn["request"], question: string, turns: Turn[]) {
  const messages: ChatMessage[] = [{ role: "user", content: question }];
  let length = question.length;

  for (const turn of turns.slice(-Math.floor(CHAT_LIMITS.messages / 2)).reverse()) {
    const answer = advisorText(turn.response);
    if (length + turn.question.length + answer.length > CHAT_LIMITS.totalChars) break;
    const pair: ChatMessage[] = [
      { role: "user", content: turn.question }, { role: "assistant", content: answer },
    ];
    const bytes = new TextEncoder().encode(JSON.stringify({ ...settings, messages: [...pair, ...messages] }));
    if (bytes.length > CHAT_LIMITS.bodyBytes) break;

    messages.unshift(...pair);
    length += turn.question.length + answer.length;
  }

  return { ...settings, messages };
}
