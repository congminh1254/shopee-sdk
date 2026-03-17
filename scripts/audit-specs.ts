import path from "node:path";
import { auditRepositorySpecs } from "../src/utils/spec-audit.js";

function main(): void {
  const repoRoot = path.resolve(process.cwd());
  const report = auditRepositorySpecs(repoRoot);

  console.log("Shopee SDK Spec Audit");
  console.log(`- Specs scanned: ${report.totalSpecs}`);
  console.log(`- SDK endpoints discovered: ${report.totalSdkEndpoints}`);
  console.log(`- Missing endpoints: ${report.missingEndpoints.length}`);
  console.log(`- Method mismatches: ${report.methodMismatches.length}`);
  console.log(`- Request field gaps: ${report.missingRequestFields.length}`);
  console.log(`- Response field gaps: ${report.missingResponseFields.length}`);

  if (report.missingEndpoints.length > 0) {
    console.log("\nMissing endpoints:");
    report.missingEndpoints.forEach((endpoint) => console.log(`  - ${endpoint}`));
  }

  if (report.methodMismatches.length > 0) {
    console.log("\nMethod mismatches:");
    report.methodMismatches.forEach((item) =>
      console.log(`  - ${item.endpoint}: expected ${item.expectedMethod}, found ${item.actualMethod}`)
    );
  }

  if (report.missingRequestFields.length > 0) {
    console.log("\nRequest field gaps:");
    report.missingRequestFields.forEach((item) =>
      console.log(`  - ${item.endpoint}: ${item.fields.join(", ")}`)
    );
  }

  if (report.missingResponseFields.length > 0) {
    console.log("\nResponse field gaps:");
    report.missingResponseFields.forEach((item) =>
      console.log(`  - ${item.endpoint}: ${item.fields.join(", ")}`)
    );
  }

  const hasFailures =
    report.missingEndpoints.length > 0 ||
    report.methodMismatches.length > 0 ||
    report.missingRequestFields.length > 0 ||
    report.missingResponseFields.length > 0;

  if (hasFailures) {
    process.exitCode = 1;
  }
}

main();
