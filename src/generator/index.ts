/* eslint-disable no-console */
import { generateRepository } from "./pipeline.js";

try {
  const outputs = generateRepository(process.cwd());
  console.log(`Generation completed successfully: ${outputs.length} validated files.`);
} catch (error) {
  console.error("Generation failed:", error instanceof Error ? error.message : error);
  process.exitCode = 1;
}
