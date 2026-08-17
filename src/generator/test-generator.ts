import fs from "node:fs";
import path from "node:path";
import { EndpointSpec, NormalizedParam, getManagerClassName, toCamelCase } from "./types.js";

export function parsePrimitive(val: string, type: string): unknown {
  const lowerType = type.toLowerCase();
  if (lowerType === "boolean" || lowerType === "bool") {
    return val.toLowerCase() === "true" || val === "1" || val === "yes";
  }
  if (
    [
      "number",
      "int",
      "integer",
      "int32",
      "int64",
      "float",
      "double",
      "numeric",
      "date",
      "datetime",
    ].includes(lowerType) ||
    lowerType.includes("date") ||
    lowerType.includes("number")
  ) {
    const num = Number(val);
    if (!isNaN(num)) {
      return num;
    }
    if (lowerType.includes("date")) {
      return val;
    }
    return 1;
  }
  return val;
}

export function getDefaultPrimitive(type: string): unknown {
  const lowerType = type.toLowerCase();
  if (lowerType === "boolean" || lowerType === "bool") {
    return true;
  }
  if (
    ["number", "int", "integer", "int32", "int64", "float", "double", "numeric"].includes(lowerType)
  ) {
    return 123;
  }
  return "test_string";
}

export function generateParamValue(param: NormalizedParam): unknown {
  if (param.children && param.children.length > 0) {
    const isArray = param.type.endsWith("[]");
    const childObj = generateMockData(param.children);
    return isArray ? [childObj] : childObj;
  }

  const sample = param.sample;
  const rawType = param.type.trim();

  if (sample !== undefined && sample !== null && String(sample).trim() !== "") {
    const sampleStr = String(sample).trim();
    if (rawType.endsWith("[]")) {
      const baseType = rawType.replace("[]", "");
      const cleanVal = sampleStr.replace(/^\[|\]$/g, "");
      const items = cleanVal.split(/[,/|]/).map((item) => item.trim());
      return items.map((item) => parsePrimitive(item, baseType));
    }
    return parsePrimitive(sampleStr, rawType);
  }

  if (rawType.endsWith("[]")) {
    const baseType = rawType.replace("[]", "");
    return [getDefaultPrimitive(baseType)];
  }
  return getDefaultPrimitive(rawType);
}

export function generateMockData(params: NormalizedParam[]): Record<string, unknown> {
  const obj: Record<string, unknown> = {};
  for (const p of params) {
    obj[p.name] = generateParamValue(p);
  }
  return obj;
}

export function generateModuleTests(
  moduleName: string,
  specs: EndpointSpec[],
  outputDir: string
): void {
  const kebabName = moduleName.replace(/_/g, "-");
  const managerClassName = getManagerClassName(moduleName);
  const testFilePath = path.join(outputDir, `${kebabName}.generated.test.ts`);

  let fileContent = `import { jest, describe, it, expect, beforeEach } from "@jest/globals";
import { ShopeeFetch } from "../../fetch.js";
import { ShopeeConfig } from "../../sdk.js";
import { ShopeeRegion } from "../../schemas/region.js";
import { ${managerClassName} } from "../../managers/${kebabName}.manager.js";

const mockFetch = jest.fn() as unknown as jest.MockedFunction<typeof ShopeeFetch.fetch>;
ShopeeFetch.fetch = mockFetch;

describe("${managerClassName} (Generated Tests)", () => {
  let manager: ${managerClassName};
  let mockConfig: ShopeeConfig;

  beforeEach(() => {
    jest.clearAllMocks();
    mockConfig = {
      partner_id: 12345,
      partner_key: "test_partner_key",
      shop_id: 67890,
      region: ShopeeRegion.GLOBAL,
      base_url: "https://partner.test-stable.shopeemobile.com/api/v2",
    };
    manager = new ${managerClassName}(mockConfig);
  });
`;

  for (const spec of specs) {
    const methodName = toCamelCase(spec.endpointName);
    const exampleRequest = generateMockData(spec.requestParams);

    // For nested responses, the actual data is wrapped inside a "response" object
    // Check if the spec's responseParams has a root property named "response"
    const hasResponseWrapper = spec.responseParams.some((p) => p.name === "response");
    let exampleResponse: unknown;
    if (hasResponseWrapper) {
      const responseParam = spec.responseParams.find((p) => p.name === "response")!;
      exampleResponse = generateParamValue(responseParam);
    } else {
      exampleResponse = generateMockData(spec.responseParams);
    }

    fileContent += `
  describe("${methodName}", () => {
    it("should correctly validate request and response formats", async () => {
      const exampleRequest = ${JSON.stringify(exampleRequest, null, 2)};
      const exampleResponse = ${JSON.stringify(exampleResponse, null, 2)};

      mockFetch.mockResolvedValueOnce({
        request_id: "test-request-id",
        error: "",
        message: "",
        response: exampleResponse,
      });

      const result = await manager.${methodName}(exampleRequest);

      expect(mockFetch).toHaveBeenCalledWith(
        mockConfig,
        "${spec.path}",
        expect.objectContaining({
          method: "${spec.method}",
          auth: ${spec.auth},
          ${spec.method === "GET" ? "params" : "body"}: expect.objectContaining(exampleRequest),
        })
      );

      expect(result.response).toEqual(exampleResponse);
    });
  });
`;
  }

  fileContent += `});\n`;

  fs.writeFileSync(testFilePath, fileContent, "utf-8");
}
