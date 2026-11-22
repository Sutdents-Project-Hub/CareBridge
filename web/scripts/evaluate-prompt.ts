import { readFile } from "node:fs/promises";
import { PROMPT_SOURCES, type PromptVersion } from "../src/lib/ai/prompts";
import { AdvisorError, evaluatePrompt } from "../src/lib/ai/provider";
import { chatRequestSchema } from "../src/lib/ai/validation";

async function main() {
  const [version, inputPath] = process.argv.slice(2);
  if (!inputPath || !Object.hasOwn(PROMPT_SOURCES, version)) {
    console.error("Usage: pnpm eval:prompt <Baseline|V1|V2|V3> <fictional-request.json>");
    process.exitCode = 1;
    return;
  }
  const input: unknown = JSON.parse(await readFile(inputPath, "utf8"));
  const request = chatRequestSchema.safeParse(input);
  if (!request.success) throw new Error("Invalid ChatRequest JSON.");
  const evidence = await evaluatePrompt(request.data, version as PromptVersion);
  console.log(JSON.stringify(evidence, null, 2));
  if (evidence.status !== "completed") process.exitCode = 1;
}

main().catch((error: unknown) => {
  // Adapter errors contain only a stable code. File/JSON errors can echo input.
  console.error(error instanceof AdvisorError ? error.code : "Invalid version, input path, or ChatRequest JSON.");
  process.exitCode = 1;
});
