---
name: update-sdk-from-schemas
description: Guide for updating the Shopee SDK when JSON schemas in the update-schemas branch are added, modified, or deleted. Tells the agent how to check out the branch, inspect differences, align TypeScript schemas and managers, test, and document.
---

# Update SDK from Schemas Skill

Use this skill when schema updates have been fetched from the Shopee Open API and pushed to the `update-schemas` branch, requiring the SDK implementation to be synchronized with the new specifications.

---

## 🛠️ Step-by-Step Sync Workflow

Follow these steps to safely synchronize the SDK code with the latest schema changes:

### 1. Branch Checkout & Inspection
* **Checkout the Target Branch**: Switch to the branch where updated schemas reside:
  ```bash
  git checkout update-schemas
  git pull origin update-schemas
  ```
* **Identify Changed Schemas**: Run git diff to see which schema files under `schemas/` were added, modified, or deleted relative to `main` (or the base development branch):
  ```bash
  git diff --name-status main..HEAD -- schemas/
  ```

### 2. Implement SDK Changes
Group the identified changes and implement them according to the following rules:

#### A. New Schema Files (`[NEW] schemas/v2.<module>.<endpoint>.json`)
1. **Find Target Manager and Schema File**:
   * Manager: `src/managers/<module>.manager.ts` (e.g. `src/managers/product.manager.ts`)
   * Schema: `src/schemas/<module>.ts` (e.g. `src/schemas/product.ts`)
2. **Examine HTTP Method**: Open the schema JSON and inspect the `"method"` field:
   * `"method": 1` ➡️ Use **`POST`** (arguments map to `body: params`)
   * `"method": 2` ➡️ Use **`GET`** (arguments map to `params: params`)
3. **Declare TypeScript Interfaces**: In `src/schemas/<module>.ts`, add the request and response interfaces following the pattern:
   ```typescript
   export interface <EndpointName>Request {
     // Match fields from JSON schema's "request_params"
   }
   
   export interface <EndpointName>ResponseData {
     // Match fields from JSON schema's "response" children
   }
   
   export type <EndpointName>Response = FetchResponse<<EndpointName>ResponseData>;
   ```
4. **Implement Manager Method**: In `src/managers/<module>.manager.ts`, add the corresponding public async method:
   ```typescript
   public async <endpointName>(
     params?: <EndpointName>Request
   ): Promise<<EndpointName>Response> {
     return ShopeeFetch.fetch<<EndpointName>Response>(
       this.config,
       "/<module>/<endpoint_name>",
       {
         method: "POST", // OR "GET" based on schema method
         body: params,   // OR params: params for GET
         auth: true,     // Included only if auth is required (omitted for public endpoints)
         timestampPaths: [...], // Included if response contains date/timestamp fields (optional)
       }
     );
   }
   ```

#### B. Modified Schema Files (`[MODIFY] schemas/v2.<module>.<endpoint>.json`)
1. Locate the corresponding TypeScript interfaces in `src/schemas/<module>.ts` and the manager class method in `src/managers/<module>.manager.ts`.
2. Inspect the JSON diff for any changes in the expected payload (e.g. renamed fields, type changes like nested arrays, or changed HTTP methods).
3. Apply the changes strictly to the TypeScript interfaces and the manager methods. **Do not use any workarounds or bypass signing.**

#### C. Deleted Schema Files (`[DELETE] schemas/v2.<module>.<endpoint>.json`)
1. Locate and delete the corresponding manager method.
2. Remove unused request/response types from the module schema file if they are not used elsewhere.

---

## 🧪 3. Verification & Testing

Always verify correctness through automated checks and tests. Do not skip this step under any circumstances.

### A. Run Spec Audit
Use the SDK's built-in AST parser script to check for any gaps or method mismatches:
```bash
npm run audit:specs
```
Ensure the output shows `0` mismatches, missing request/response types, or field gaps.

> [!WARNING]
> **Response Auditing Limitation**: The current `spec-audit.ts` AST parser uses `schema.params?.response` instead of `response_params` at runtime, which bypasses automated response field validation. Developers must still manually verify that response interface properties accurately match the `response_params` structures defined in the JSON schemas.

### B. Write Unit Tests
1. For every added or modified endpoint, add/update tests in the corresponding unit test file under `src/__tests__/managers/<module>.manager.test.ts`.
2. Mock the HTTP responses using standard Jest/mock patterns already established in the codebase:
   ```typescript
   const mockResponse: <EndpointName>Response = {
     request_id: "test-req-id",
     error: "",
     message: "",
     response: { ... }
   };
   mockShopeeFetch.mockResolvedValue(mockResponse);
   ```
3. Run the test suite and verify coverage remains above the project threshold (minimum **75%** total, **100%** on updated managers):
   ```bash
   npm test
   ```

### C. Lint & Format
Before finalizing any files, check and format the code:
```bash
npm run lint
```
```bash
npm run format
```

---

## 📝 4. Documentation

* **Manager Documentation**: Locate the manager's guide in `docs/managers/<module>.md` and add clear documentation for any new/updated methods.
* **Code Example**: Provide a concise code example demonstrating initialization, request calling, and handling the response for any new methods.
* **Structure**: Maintain the markdown format matching other documentation files in the repository.
