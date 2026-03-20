import path from "node:path";
import { auditRepositorySpecs } from "../src/utils/spec-audit.js";

function main(): void {
  const repoRoot = path.resolve(process.cwd());
  const report = auditRepositorySpecs(repoRoot);

  console.log("Shopee SDK Spec Audit");
  console.log("Strategy:");
  console.log("  1) Every spec endpoint must exist in SDK managers and vice-versa");
  console.log("  2) HTTP methods must match spec definitions exactly");
  console.log("  3) Endpoint request/response must use explicit endpoint type definitions");
  console.log("  4) Spec request/response fields must exist in those endpoint types with exact names");
  console.log(`- Specs scanned: ${report.totalSpecs}`);
  console.log(`- SDK endpoints discovered: ${report.totalSdkEndpoints}`);
  console.log(`- Missing endpoints: ${report.missingEndpoints.length}`);
  console.log(`- SDK endpoints not in spec: ${report.uncoveredSdkEndpoints.length}`);
  console.log(`- Method mismatches: ${report.methodMismatches.length}`);
  console.log(`- Missing request/response types: ${report.endpointTypeGaps.length}`);
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

  if (report.uncoveredSdkEndpoints.length > 0) {
    console.log("\nSDK endpoints not covered by spec:");
    report.uncoveredSdkEndpoints.forEach((endpoint) => console.log(`  - ${endpoint}`));
  }

  if (report.endpointTypeGaps.length > 0) {
    console.log("\nMissing request/response types:");
    report.endpointTypeGaps.forEach((item) =>
      console.log(`  - ${item.endpoint}: missing ${item.missing.join(", ")}`)
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
    report.uncoveredSdkEndpoints.length > 0 ||
    report.methodMismatches.length > 0 ||
    report.endpointTypeGaps.length > 0 ||
    report.missingRequestFields.length > 0 ||
    report.missingResponseFields.length > 0;

  if (hasFailures) {
    process.exitCode = 1;
  }
}

main();
