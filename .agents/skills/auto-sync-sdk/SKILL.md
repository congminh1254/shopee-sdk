---
name: auto-sync-sdk
description: Guide for automating the synchronization of the Shopee SDK with the latest schema changes, detailing steps, coding standards, naming conventions, documentation, and strict validation checks.
---

# 🤖 Auto-Sync SDK from Schemas

This document defines the agent skill (`skill`) to automate and standardize the process of updating and synchronizing the Shopee SDK whenever changes (addition, modification, deletion) occur in the JSON schemas directory (`schemas/`).

---

## 🛠️ 1. Workflow Steps

The automatic synchronization workflow consists of the following 10 sequential steps:

### Step 1: Branch Preparation
* Switch to the branch where the updated schemas reside (typically `update-schemas`):
  ```bash
  git checkout update-schemas
  git pull origin update-schemas
  ```
* Compare the modified schema files against the main branch (`main`):
  ```bash
  git diff --name-status main..HEAD -- schemas/
  ```

### Step 2: Change Analysis
Classify the affected schema files (`schemas/v2.<module>.<endpoint>.json`) into three categories:
* **[NEW]**: Schema files added.
* **[MODIFY]**: Schema files with structural changes.
* **[DELETE]**: Schema files removed from the API.

### Step 3: TypeScript Interfaces Synchronization
* Open the corresponding schema definition file at `src/schemas/<module>.ts`.
* Automatically generate or update the `Request` and `Response` interfaces matching the JSON Schema structure:
  * **HTTP Method 1 (POST)** ➡️ Map request fields to the payload body.
  * **HTTP Method 2 (GET)** ➡️ Map request fields to the url query parameters.
* Extract all fields in `request_params` and child fields of the `response` node to map them accurately into TypeScript types.

### Step 4: Manager Class Synchronization
* Identify the corresponding Manager class file at `src/managers/<module>.manager.ts`.
* Implement new or update existing asynchronous API methods (`public async <endpointName>`).
* Call `ShopeeFetch.fetch` with the appropriate generic type arguments, endpoint path, and body/params configuration.

### Step 5: Automatic Spec Audit
* Run the built-in repository spec audit script to check for AST-based mismatches between the SDK code and the JSON schemas:
  ```bash
  npm run audit:specs
  ```
* Fix any reported field mismatches, missing methods, or HTTP method discrepancies.

### Step 6: Code Compilation & Linting
* Ensure the codebase compiles successfully without any TypeScript compiler errors:
  ```bash
  npm run build
  ```
* Run linter checks and format the code according to the project style:
  ```bash
  npm run lint
  ```
  ```bash
  npm run format
  ```

### Step 7: Unit Testing
* Add/update mock HTTP tests in `src/__tests__/managers/<module>.manager.test.ts` using `mockShopeeFetch`.
* Run the entire test suite and verify code coverage satisfies the project's criteria:
  ```bash
  npm test
  ```

### Step 8: Integration Testing
* For new or majorly updated endpoints, write or update real integration tests targeting the Shopee Sandbox environment.
* Refer to **Section 3: Integration Testing Guidelines** for details.

### Step 9: Documentation Updates
* Document the new endpoints by updating code comments (JSDoc), module markdown files, and the `llms.txt` onboarding file.
* Refer to **Section 4: Documentation Standards** for details.

### Step 10: Pull Request Preparation
* Commit your changes following the Conventional Commits style (e.g., `feat(sdk): sync endpoints with updated schema`) and push to the repository to open a PR.

---

## 📐 2. Coding Standards

To ensure generated code is robust and passes the static AST analysis, adhere strictly to the following conventions:

### A. File Mapping Rules
| Spec Directory | SDK Schemas Directory | SDK Managers Directory |
| :--- | :--- | :--- |
| `schemas/v2.<module>.<endpoint>.json` | `src/schemas/<module>.ts` | `src/managers/<module>.manager.ts` |

*Example:* `schemas/v2.product.get_item_limit.json` maps to `src/schemas/product.ts` and `src/managers/product.manager.ts`.

### B. Type Naming Conventions
* **Request Interface**: `<PascalCaseEndpointName>Request` (e.g., `GetItemLimitRequest`).
* **Response Interface**: `<PascalCaseEndpointName>Response extends FetchResponse<{ ... }>` (e.g., `GetItemLimitResponse`).
* **Sub-interfaces**: If a schema contains nested object properties, define them as standalone interfaces rather than using inline object declarations (e.g., `interface ItemLimitInfo`).
* **Case Style**: Maintain `snake_case` naming for properties inside payload types exactly as defined in the Shopee JSON Schema specs (do not camelCase the API fields).

### C. Manager Method Template
Manager class methods must conform to this signature:
```typescript
public async <endpointName>(
  params: <EndpointName>Request
): Promise<<EndpointName>Response> {
  return ShopeeFetch.fetch<<EndpointName>Response>(
    this.config,
    "/<module>/<endpoint_name>",
    {
      method: "POST", // OR "GET" based on the "method" field in JSON Schema
      body: params,   // OR params: params for GET requests
      auth: true,     // Or false if the API is public
    }
  );
}
```

---

## 🧪 3. Integration Testing Guidelines

To verify payload serialization and responses against the real Shopee Sandbox:

### A. Test File Location
* Integration tests must be stored in the `src/__tests__/integration/` directory.
* Naming format: `<module>.integration.test.ts` (e.g., `product.integration.test.ts`).

### B. Environment Configuration
* Use `setupIntegrationTest` from `setup.ts` to retrieve Sandbox configuration and evaluate credentials.
* Wrap all real Sandbox test suites in a skip condition to handle cases where credentials are not present in `.env`:
  ```typescript
  import { describe, it, expect, beforeAll } from "@jest/globals";
  import { setupIntegrationTest } from "./setup.js";
  
  const { runTests, initSdk } = setupIntegrationTest();
  
  (runTests ? describe : describe.skip)("ShopeeSDK Product Integration Tests", () => {
    let sdk: ShopeeSDK;
    beforeAll(async () => {
      sdk = await initSdk();
    });
    
    it("should successfully fetch item list from sandbox", async () => {
      const response = await sdk.product.getItemList({ page_size: 10 });
      expect(response).toBeDefined();
      expect(response.error).toBe("");
    }, 60000); // Set a high timeout (60 seconds) for external sandbox network requests
  });
  ```

---

## 📝 4. Documentation Standards

Keep the project documentation synchronized with the SDK changes:

### A. JSDoc Code Comments
* Write descriptive JSDoc headers above manager class methods:
  * Describe the endpoint's purpose.
  * List main request parameters and explain the response payload.
  * State units clearly (e.g. timeout in milliseconds, price in Vnd, Unix timestamps in seconds).

### B. Manager Guides
* Locate the module guide under `docs/managers/<module>.md` (e.g., `docs/managers/product.md`).
* Add the new method, outlining:
  * Endpoint path and method name.
  * A table describing input parameters.
  * A clear ESM/TypeScript usage example showing initialization and calling.

### C. onboarding and Context (`llms.txt`)
* If a new Manager class or major system module is introduced, document its directory and responsibility in the root-level `llms.txt`.
* This file serves as context-onboarding for future AI agent runs.

---

## 🛡️ 5. Validation & Quality Gates

A synchronization is considered complete and eligible for review/merge only after meeting all these requirements:

1. **Spec Audit Check**: `npm run audit:specs` must exit with **`0`** failures (0 mismatches, 0 gaps, 0 missing type mappings).
2. **Compilation & Linting Check**: `npm run build && npm run format:check && npm run lint` must pass without any warnings or errors.
3. **Test Suite Verification**: `npm test` must pass all unit and integration tests, preserving a minimum of **`75%`** total coverage, and **`100%`** coverage on any added/modified Manager classes.
