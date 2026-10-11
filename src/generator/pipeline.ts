import fs from "node:fs";
import os from "node:os";
import path from "node:path";
import { execFileSync } from "node:child_process";
import { parseAllSchemas } from "./schema-parser.js";
import { resolveEnumNames } from "./enum-resolver.js";
import { AstBuilder } from "./ast-builder.js";
import { FileWriter } from "./file-writer.js";
import { updateSdkRegistration } from "./sdk-updater.js";
import { generateModuleTests } from "./test-generator.js";

export type StageValidator = (stageRoot: string, outputs: string[]) => void;

export function validateStage(stageRoot: string, outputs: string[]): void {
  const run = (tool: string, args: string[]) => {
    execFileSync(process.execPath, [path.join(stageRoot, "node_modules", tool), ...args], {
      cwd: stageRoot,
      stdio: "inherit",
    });
  };
  // Only generator-owned outputs are formatted/fixed; handwritten source is untouched.
  run("prettier/bin/prettier.cjs", ["--write", ...outputs]);
  run("eslint/bin/eslint.js", ["--fix", ...outputs]);
  run("typescript/bin/tsc", ["--noEmit", "--project", "tsconfig.json"]);
}

/** Commit a validated batch with rollback if a filesystem operation fails. */
export function publishOutputs(
  repoRoot: string,
  stageRoot: string,
  outputs: string[],
  stale: string[]
): void {
  const backup = new Map<string, Buffer | undefined>();
  const temporaryFiles: string[] = [];
  try {
    for (const relative of [...outputs, ...stale]) {
      const target = path.join(repoRoot, relative);
      backup.set(target, fs.existsSync(target) ? fs.readFileSync(target) : undefined);
      if (stale.includes(relative)) {
        fs.unlinkSync(target);
      } else {
        fs.mkdirSync(path.dirname(target), { recursive: true });
        const temporary = `${target}.generator.tmp`;
        if (fs.existsSync(temporary)) throw new Error(`Refusing to overwrite ${temporary}`);
        temporaryFiles.push(temporary);
        fs.copyFileSync(path.join(stageRoot, relative), temporary);
        fs.renameSync(temporary, target);
      }
    }
  } catch (error) {
    for (const [target, content] of backup) {
      if (content === undefined) fs.rmSync(target, { force: true });
      else fs.writeFileSync(target, content);
    }
    throw error;
  } finally {
    for (const file of temporaryFiles) fs.rmSync(file, { force: true });
  }
}

/** Parse and validate everything before replacing any checkout files. */
export function generateRepository(
  repoRoot: string,
  validate: StageValidator = validateStage
): string[] {
  repoRoot = path.resolve(repoRoot);
  const groups = parseAllSchemas(path.join(repoRoot, "schemas"));
  if (groups.size === 0)
    throw new Error("No endpoint schemas found; refusing to clear generated outputs");
  const modules = [...groups.keys()].map((name) => name.replace(/_/g, "-"));
  if (new Set(modules).size !== modules.length)
    throw new Error("Colliding normalized module names");
  const stageRoot = fs.mkdtempSync(path.join(os.tmpdir(), "shopee-generator-"));
  try {
    fs.cpSync(path.join(repoRoot, "src"), path.join(stageRoot, "src"), { recursive: true });
    for (const file of ["tsconfig.json", "package.json", "eslint.config.js"]) {
      fs.copyFileSync(path.join(repoRoot, file), path.join(stageRoot, file));
    }
    for (const file of [".prettierrc", ".prettierignore"]) {
      if (fs.existsSync(path.join(repoRoot, file)))
        fs.copyFileSync(path.join(repoRoot, file), path.join(stageRoot, file));
    }
    fs.symlinkSync(
      path.join(repoRoot, "node_modules"),
      path.join(stageRoot, "node_modules"),
      "dir"
    );
    const versionFile = path.join(stageRoot, "src/version.ts");
    if (!fs.existsSync(versionFile)) {
      const { version } = JSON.parse(fs.readFileSync(path.join(stageRoot, "package.json"), "utf8"));
      fs.writeFileSync(versionFile, `export const SDK_VERSION = ${JSON.stringify(version)};\n`);
    }
    const outputs: string[] = [];
    const generatedTestsDir = "src/__tests__/generated";
    fs.mkdirSync(path.join(stageRoot, generatedTestsDir), { recursive: true });
    // Remove stale tests in the stage, never in the checkout before validation.
    const oldTests = fs
      .readdirSync(path.join(stageRoot, generatedTestsDir))
      .filter((name) => name.endsWith(".generated.test.ts"));
    for (const name of oldTests) fs.unlinkSync(path.join(stageRoot, generatedTestsDir, name));
    for (const [moduleName, specs] of groups) {
      resolveEnumNames(specs);
      const kebabName = moduleName.replace(/_/g, "-");
      const schema = `src/schemas/${kebabName}.ts`;
      const manager = `src/managers/${kebabName}.manager.ts`;
      const tests = `${generatedTestsDir}/${kebabName}.generated.test.ts`;
      const writer = new FileWriter(new AstBuilder());
      writer.writeSchemaFile(path.join(stageRoot, schema), specs);
      writer.writeManagerFile(path.join(stageRoot, manager), specs, kebabName);
      generateModuleTests(moduleName, specs, path.join(stageRoot, generatedTestsDir));
      outputs.push(schema, manager, tests);
    }
    updateSdkRegistration(path.join(stageRoot, "src/sdk.ts"), modules);
    outputs.push("src/sdk.ts");
    validate(stageRoot, outputs);
    const stale = oldTests
      .map((name) => `${generatedTestsDir}/${name}`)
      .filter((name) => !outputs.includes(name));
    publishOutputs(repoRoot, stageRoot, outputs, stale);
    return outputs;
  } finally {
    fs.rmSync(stageRoot, { recursive: true, force: true });
  }
}
