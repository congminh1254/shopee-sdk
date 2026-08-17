/* eslint-disable no-console */
import fs from "node:fs";
import path from "node:path";
import { execSync } from "node:child_process";
import { parseAllSchemas } from "./schema-parser.js";
import { AstBuilder } from "./ast-builder.js";
import { FileMerger } from "./file-merger.js";
import { updateSdkRegistration } from "./sdk-updater.js";
import { generateModuleTests } from "./test-generator.js";

function main() {
  const repoRoot = path.resolve(process.cwd());
  const schemasDir = path.join(repoRoot, "schemas");
  const sdkSchemasDir = path.join(repoRoot, "src", "schemas");
  const sdkManagersDir = path.join(repoRoot, "src", "managers");
  const sdkFilePath = path.join(repoRoot, "src", "sdk.ts");

  console.log("Starting Shopee SDK v2.0 AST Code Generator...");
  console.log(`Scanning schemas in: ${schemasDir}`);

  // 1. Parse all schemas grouped by module name
  const groupedSpecs = parseAllSchemas(schemasDir);
  console.log(`Discovered ${groupedSpecs.size} modules.`);

  const astBuilder = new AstBuilder();

  // Register all parsed enum names globally to allow enum union conversion
  for (const specs of groupedSpecs.values()) {
    for (const spec of specs) {
      for (const e of spec.enums) {
        astBuilder.enumNames.add(e.name);
      }
    }
  }

  const fileMerger = new FileMerger(astBuilder);
  const modules: string[] = [];

  const generatedTestsDir = path.join(repoRoot, "src", "__tests__", "generated");
  if (!fs.existsSync(generatedTestsDir)) {
    fs.mkdirSync(generatedTestsDir, { recursive: true });
  } else {
    // Clean up existing generated test files
    const existingFiles = fs.readdirSync(generatedTestsDir);
    for (const f of existingFiles) {
      if (f.endsWith(".generated.test.ts")) {
        fs.unlinkSync(path.join(generatedTestsDir, f));
      }
    }
  }

  // 2. Iterate and generate files for each module
  for (const [moduleName, specs] of groupedSpecs.entries()) {
    const kebabName = moduleName.replace(/_/g, "-");
    modules.push(kebabName);

    const schemaPath = path.join(sdkSchemasDir, `${kebabName}.ts`);
    const managerPath = path.join(sdkManagersDir, `${kebabName}.manager.ts`);

    console.log(`Generating types & methods for module: ${moduleName} -> ${kebabName}`);

    // Merge schema definitions
    fileMerger.mergeSchemaFile(schemaPath, specs);

    // Merge manager declarations
    fileMerger.mergeManagerFile(managerPath, specs, kebabName);

    // Generate unit tests from spec
    console.log(`Generating unit tests for module: ${moduleName}`);
    generateModuleTests(moduleName, specs, generatedTestsDir);
  }

  // 3. Update sdk.ts registration
  console.log("Updating SDK registration in sdk.ts...");
  updateSdkRegistration(sdkFilePath, modules);

  // 4. Run Prettier and ESLint to align styling
  console.log("Formatting generated code with Prettier...");
  try {
    execSync("npm run format", { stdio: "inherit", cwd: repoRoot });
  } catch {
    console.error("Prettier formatting failed");
  }

  console.log("Running ESLint auto-fix...");
  try {
    execSync("npm run lint -- --fix", { stdio: "inherit", cwd: repoRoot });
  } catch {
    console.warn("ESLint completed with some unresolved warnings/errors.");
  }

  console.log("Generation completed successfully!");
}

main();
