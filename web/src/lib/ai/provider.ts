// Node-only imports make this module unsuitable for client bundles.
import { env } from "node:process";
import { createHash } from "node:crypto";
import OpenAI from "openai";
import { zodTextFormat } from "openai/helpers/zod";
import { CHAT_LIMITS, type AdvisorResponse, type ChatRequest } from "./contracts";
import { chatRequestSchema, modelAnswerSchema, parseModelAnswer } from "./validation";
import { preferenceContext, PROMPT_REVISION, PROMPT_SOURCES, type PromptVersion } from "./prompts";

export class AdvisorError extends Error {
  constructor(public readonly code: "NOT_CONFIGURED" | "UPSTREAM_TIMEOUT" | "UPSTREAM_ERROR" | "INVALID_RESPONSE") {
    super(code);
  }
}

function configuration() {
  const apiKey = env.OPENAI_API_KEY?.trim();
  const model = env.OPENAI_MODEL?.trim();
  if (!apiKey || !model || !/^[a-zA-Z0-9._:-]{1,100}$/.test(model)) {
    throw new AdvisorError("NOT_CONFIGURED");
  }
  return { apiKey, model };
}

// Local evaluation entry point only. No HTTP route accepts a version override.
// Caller must obtain paid-request authorization and retain only fictional cases.
// The same generic preference metadata is supplied to every version, including
// Baseline. Baseline has no CareBridge system/developer strategy and no schema.
export async function evaluatePrompt(request: ChatRequest, version: PromptVersion) {
  // Local callers receive the same bounds as HTTP callers; TypeScript alone is
  // not runtime validation for imported JS or command-line evaluation inputs.
  chatRequestSchema.parse(request);
  if (!Object.hasOwn(PROMPT_SOURCES, version)) throw new AdvisorError("INVALID_RESPONSE");
  const { apiKey, model } = configuration();
  const prompt = PROMPT_SOURCES[version];
  const client = new OpenAI({
    apiKey, baseURL: "https://api.openai.com/v1",
    timeout: CHAT_LIMITS.timeoutMs, maxRetries: 0, logLevel: "off",
  });
  try {
    const response = await client.responses.create({
      model,
      store: false,
      max_output_tokens: CHAT_LIMITS.outputTokens,
      input: [
        ...(prompt ? [{ role: "developer" as const, content: prompt }] : []),
        { role: "user" as const, content: `Response preferences: ${preferenceContext(request)}` },
        ...request.messages.map(({ role, content }) => ({ role, content })),
      ],
      ...(version === "V3" ? { text: { format: zodTextFormat(modelAnswerSchema, "carebridge_advisor") } } : {}),
    });
    return {
      timestamp: new Date().toISOString(),
      provider: "openai" as const,
      model: response.model,
      requestedModel: model,
      promptVersion: `${version}-${PROMPT_REVISION}`,
      promptSha256: createHash("sha256").update(prompt).digest("hex"),
      prompt,
      parameters: { maxOutputTokens: CHAT_LIMITS.outputTokens, store: false, maxRetries: 0, timeoutMs: CHAT_LIMITS.timeoutMs },
      input: request,
      status: response.status,
      outputText: response.output_text,
      output: response.output,
      usage: response.usage,
    };
  } catch (error) {
    // Do not expose provider bodies, request content, headers or credentials.
    if (error instanceof OpenAI.APIConnectionTimeoutError ||
        (error instanceof Error && (error.name === "AbortError" || error.name === "TimeoutError"))) {
      throw new AdvisorError("UPSTREAM_TIMEOUT");
    }
    throw new AdvisorError("UPSTREAM_ERROR");
  }
}

export async function requestAdvisor(request: ChatRequest): Promise<AdvisorResponse> {
  const result = await evaluatePrompt(request, "V3");
  if (result.status !== "completed" || typeof result.model !== "string" || !result.model ||
      !result.outputText || result.outputText.length > 20_000) {
    throw new AdvisorError("INVALID_RESPONSE");
  }
  try {
    const answer = parseModelAnswer(JSON.parse(result.outputText), request);
    return {
      ...answer,
      modelInfo: {
        provider: "openai", model: result.model,
        promptVersion: result.promptVersion, provenance: "model",
        maxOutputTokens: CHAT_LIMITS.outputTokens,
      },
    };
  } catch {
    throw new AdvisorError("INVALID_RESPONSE");
  }
}
