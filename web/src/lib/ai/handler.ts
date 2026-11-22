import { CHAT_LIMITS, type AdvisorResponse, type ChatErrorCode, type ChatRequest } from "./contracts";
import { AdvisorError, requestAdvisor } from "./provider";
import { safetyPreflight } from "./safety";
import { chatRequestSchema } from "./validation";

const errorStatus: Record<ChatErrorCode, number> = {
  BAD_REQUEST: 400, BODY_TOO_LARGE: 413, UNSUPPORTED_MEDIA_TYPE: 415,
  RATE_LIMITED: 429, NOT_CONFIGURED: 503,
  UPSTREAM_TIMEOUT: 504, UPSTREAM_ERROR: 502, INVALID_RESPONSE: 502,
};
function errorResponse(code: ChatErrorCode) {
  return Response.json({ error: { code } }, {
    status: errorStatus[code],
    headers: { "Cache-Control": "no-store", ...(code === "RATE_LIMITED" ? { "Retry-After": "60" } : {}) },
  });
}
class InputError extends Error {
  constructor(readonly code: ChatErrorCode) { super(code); }
}

async function readJson(request: Request): Promise<unknown> {
  if (!request.headers.get("content-type")?.split(";")[0].trim().match(/^application\/json$/i)) {
    throw new InputError("UNSUPPORTED_MEDIA_TYPE");
  }
  const contentLength = Number(request.headers.get("content-length"));
  if (contentLength > CHAT_LIMITS.bodyBytes) throw new InputError("BODY_TOO_LARGE");
  const reader = request.body?.getReader();
  if (!reader) throw new InputError("BAD_REQUEST");
  let bytes = 0;
  const decoder = new TextDecoder("utf-8", { fatal: true });
  let text = "";
  let timer: ReturnType<typeof setTimeout> | undefined;
  try {
    return await Promise.race([
      (async () => {
        while (true) {
          const chunk = await reader.read();
          if (chunk.done) break;
          bytes += chunk.value.byteLength;
          if (bytes > CHAT_LIMITS.bodyBytes) throw new InputError("BODY_TOO_LARGE");
          text += decoder.decode(chunk.value, { stream: true });
        }
        text += decoder.decode();
        return JSON.parse(text);
      })(),
      new Promise<never>((_, reject) => {
        timer = setTimeout(() => reject(new InputError("BAD_REQUEST")), 5_000);
      }),
    ]);
  } catch (error) {
    if (error instanceof InputError) throw error;
    throw new InputError("BAD_REQUEST");
  } finally {
    clearTimeout(timer);
    // Cancel rather than waiting indefinitely on an oversized or stalled upload.
    void reader.cancel().catch(() => {});
  }
}

export type AdvisorTransport = (request: ChatRequest) => Promise<AdvisorResponse>;

function hasAllowedOrigin(request: Request) {
  const site = request.headers.get("sec-fetch-site");
  if (site === "cross-site" || site === "same-site") return false;
  const origin = request.headers.get("origin");
  if (!origin || origin === new URL(request.url).origin) return true;

  // Next.js can reconstruct the URL using localhost even when the browser used
  // 127.0.0.1 or a reverse proxy. The received Host still matches its authority.
  const parsed = URL.parse(origin);
  return parsed?.origin === origin && /^https?:$/.test(parsed.protocol) && parsed.host === request.headers.get("host");
}

// One limiter per handler/process. No IP headers are trusted or stored. This is
// a local cost bound, not a distributed rate limiter or a provider budget cap.
export function createChatHandler(transport: AdvisorTransport = requestAdvisor) {
  let minuteStart = Date.now();
  let dayStart = minuteStart;
  let minuteCount = 0;
  let dayCount = 0;
  let active = 0;
  return async function handleChat(request: Request): Promise<Response> {
    if (!hasAllowedOrigin(request)) return errorResponse("BAD_REQUEST");
    const now = Date.now();
    if (now - minuteStart >= 60_000) { minuteStart = now; minuteCount = 0; }
    if (now - dayStart >= 86_400_000) { dayStart = now; dayCount = 0; }
    if (minuteCount >= CHAT_LIMITS.requestsPerMinute || dayCount >= CHAT_LIMITS.requestsPerDay || active >= CHAT_LIMITS.concurrentRequests) {
      return errorResponse("RATE_LIMITED");
    }
    minuteCount++;
    dayCount++;
    active++;
    try {
      const parsed = chatRequestSchema.safeParse(await readJson(request));
      if (!parsed.success) return errorResponse("BAD_REQUEST");
      const preflight = safetyPreflight(parsed.data);
      const answer = preflight ?? await transport(parsed.data);
      return Response.json(answer, { headers: { "Cache-Control": "no-store" } });
    } catch (error) {
      return errorResponse(error instanceof AdvisorError || error instanceof InputError ? error.code : "UPSTREAM_ERROR");
    } finally {
      active--;
    }
  };
}
