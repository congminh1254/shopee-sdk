import fs from "node:fs";
import path from "node:path";
import { EndpointSpec, NormalizedParam, getManagerClassName, toCamelCase } from "./types.js";

export function parsePrimitive(val: string, type: string): unknown {
  const lowerType = type.toLowerCase();
  if (lowerType === "integer" && /^-?\d+$/.test(val) && !Number.isSafeInteger(Number(val)))
    return val;
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
      "integer",
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

  if (param.enum)
    return param.type.endsWith("[]")
      ? [param.enum.members[0]?.value]
      : param.enum.members[0]?.value;
  if (["BinaryFile", "BinaryFiles"].includes(param.type)) return "__binary_fixture__";
  if (param.type.startsWith("Record<"))
    return typeof param.sample === "object" && param.sample !== null ? param.sample : {};
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

    const binary =
      spec.responseParams.some((p) => p.type === "BinaryFile") &&
      spec.responseParams.every(
        (p) => p.type === "BinaryFile" || ["request_id", "error", "message"].includes(p.name)
      );
    const mockResponse = binary
      ? "__binary_response__"
      : {
          ...(hasResponseWrapper
            ? { response: exampleResponse }
            : (exampleResponse as Record<string, unknown>)),
          request_id: "test-request-id",
          error: "",
          message: "",
        };
    fileContent += `
  describe("${methodName}", () => {
    it("should forward the exact request options and return the response", async () => {
      const exampleRequest = ${JSON.stringify(exampleRequest, null, 2).replace(/"__binary_fixture__"/g, 'Buffer.from("test_binary")')};

      const exampleResponse = ${JSON.stringify(mockResponse, null, 2).replace(/"__binary_response__"/g, 'Buffer.from("test_binary")')};
      mockFetch.mockResolvedValueOnce(exampleResponse);

      const result = await manager.${methodName}(exampleRequest);

      expect(mockFetch).toHaveBeenCalledTimes(1);
      expect(mockFetch).toHaveBeenCalledWith(
        mockConfig,
        ${JSON.stringify(spec.path)},
        {
          method: "${spec.method}",
          ${spec.auth ? "auth: true," : ""}
          ${spec.authMode && !["shop", "partner"].includes(spec.authMode) ? `authMode: "${spec.authMode}",` : ""}
          ${spec.method === "GET" ? "params" : "body"}: exampleRequest,
          ${spec.timestampPaths.length ? `timestampPaths: ${JSON.stringify(spec.timestampPaths)},` : ""}
        }
      );

      expect(result).toEqual(exampleResponse);
    });
  });
`;
  }

  fileContent += `});\n`;

  fs.writeFileSync(testFilePath, fileContent, "utf-8");
}
