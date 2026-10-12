import fs from "node:fs";
import { parseResponseJson } from "../utils/response-json.js";
import path from "node:path";
import { validateSchema } from "./schema-validation.js";
import {
  EndpointSpec,
  NormalizedParam,
  ParsedEnum,
  ParsedEnumMember,
  SpecFieldNode,
  normalizeSchemaName,
  toPascalCase,
} from "./types.js";

// Clean JSDoc and description tags
export function cleanDescription(desc: unknown): string {
  if (desc === undefined || desc === null) return "";
  const str = typeof desc === "string" ? desc : String(desc);
  return str
    .replace(/[\u00A0\u1680\u180E\u2000-\u200B\u202F\u205F\u3000\uFEFF]/g, " ") // Replace irregular whitespaces
    .replace(/<[^>]*>/g, "") // Strip HTML tags
    .replace(/&nbsp;/g, " ")
    .replace(/&amp;/g, "&")
    .replace(/&lt;/g, "<")
    .replace(/&gt;/g, ">")
    .trim();
}

// Type overrides to resolve Shopee's inaccurate documentation schemas
const NODE_PATH_TYPE_OVERRIDES: Record<string, string> = {
  // get_income_detail uses an object containing list and next_page despite its name.
  "v2.payment.get_income_detail:income_detail_list": "unknown",
  "publish_item.model": "object[]",
};

const FIELD_NAME_TYPE_OVERRIDES: Record<string, { expectedType: string; resolvedType: string }> = {
  image_id_list: { expectedType: "unknown[]", resolvedType: "string[]" },
};

function deduplicateMembers(members: ParsedEnumMember[]): ParsedEnumMember[] {
  const seenNames = new Set<string>();
  const seenValues = new Set<string | number>();
  const result: ParsedEnumMember[] = [];
  for (const m of members) {
    if (!seenNames.has(m.name) && !seenValues.has(m.value)) {
      seenNames.add(m.name);
      seenValues.add(m.value);
      result.push(m);
    }
  }
  return result;
}

// Parse enums from parameter descriptions strictly matching exact formats
export function parseEnumFromDescription(
  fieldName: string,
  desc: string,
  nodeType?: string
): ParsedEnum | null {
  const cleanText = cleanDescription(desc);
  const enumName = toPascalCase(fieldName);

  const isNumericOrTimestamp =
    nodeType &&
    [
      "int",
      "integer",
      "int32",
      "int64",
      "float",
      "double",
      "numeric",
      "number",
      "timestamp",
    ].includes(nodeType.replace(/\s+/g, "").replace(/\[\]$/, "").toLowerCase());

  // 1. Available values pattern (e.g. "Available value: upcoming/ongoing/expired" or "Available values: all, upcoming, ongoing")
  const availableValuesRegex = /available\s+values?\s*:\s*([a-zA-Z0-9_\s,/|-]+)/i;
  const availableMatch = availableValuesRegex.exec(cleanText);
  if (availableMatch) {
    const rawValues = availableMatch[1];
    // Split by comma, slash, or pipe
    const values = rawValues
      .split(/[,/|]/)
      .map((val) => val.trim())
      .filter((val) => val.length > 0 && !val.toLowerCase().startsWith("e.g"));

    if (values.length >= 2) {
      const isNumeric = values.every((v) => /^\d+$/.test(v));

      if (isNumericOrTimestamp && !isNumeric) {
        return null;
      }

      const members: ParsedEnumMember[] = values.map((val) => {
        if (isNumeric) {
          const num = parseInt(val, 10);
          return {
            name: `VALUE_${num}`,
            value: num,
          };
        } else {
          return {
            name: val.replace(/[^a-zA-Z0-9_]/g, "_").toUpperCase(),
            value: val,
          };
        }
      });
      return {
        name: enumName,
        type: isNumeric ? "number" : "string",
        members: deduplicateMembers(members),
      };
    }
  }

  if (!isNumericOrTimestamp) {
    // 2. Slash-separated string enums (e.g. NORMAL/BANNED/UNLIST or upcoming/ongoing)
    // Look for multiple words separated by slashes, requiring at least one letter and 2+ characters per word
    const slashEnumRegex = /\b([a-zA-Z_][a-zA-Z0-9_]+(?:\/[a-zA-Z_][a-zA-Z0-9_]+)+)\b/;
    const slashMatch = slashEnumRegex.exec(cleanText);
    if (slashMatch) {
      const rawMatch = slashMatch[1];

      // Ignore paths, urls, or anything starting with api or http
      if (
        rawMatch.includes("/v2") ||
        rawMatch.toLowerCase().startsWith("api") ||
        rawMatch.startsWith("http")
      ) {
        return null;
      }

      const values = rawMatch.split("/");
      const members: ParsedEnumMember[] = values.map((val) => ({
        name: val.toUpperCase(),
        value: val,
      }));
      return {
        name: enumName,
        type: "string",
        members: deduplicateMembers(members),
      };
    }
  }

  // 2. Numeric key-value mappings (consecutive lines of Pattern A "Number: Name" or Pattern B "Name = Number")
  const lines = cleanText
    .split("\n")
    .map((l) => l.trim())
    .filter(Boolean);

  // Try Pattern A: "Number: Name" (e.g., "5: High Late Shipment Rate" or "1 = Fulfillment Performance")
  const patternAMembers: ParsedEnumMember[] = [];
  const patternARegex = /^(\d+)\s*[:=-]\s*(.+)$/;
  for (const line of lines) {
    const match = patternARegex.exec(line);
    if (match) {
      const val = parseInt(match[1], 10);
      const name = toPascalCase(match[2].trim());
      if (name && !isNaN(val)) {
        patternAMembers.push({ name, value: val, description: match[2].trim() });
      }
    }
  }

  if (patternAMembers.length >= 2) {
    return {
      name: enumName,
      type: "number",
      members: deduplicateMembers(patternAMembers),
    };
  }

  // Try Pattern B: "Name = Number" (e.g., "Poor = 1" or "FulfillmentPerformance = 1")
  const patternBMembers: ParsedEnumMember[] = [];
  const patternBRegex = /^([a-zA-Z0-9_\s'/-]+)\s*[:=-]\s*(\d+)$/;
  for (const line of lines) {
    const match = patternBRegex.exec(line);
    if (match) {
      const val = parseInt(match[2], 10);
      const name = toPascalCase(match[1].trim());
      if (name && !isNaN(val)) {
        patternBMembers.push({ name, value: val, description: match[1].trim() });
      }
    }
  }

  if (patternBMembers.length >= 2) {
    return {
      name: enumName,
      type: "number",
      members: deduplicateMembers(patternBMembers),
    };
  }

  return null;
}

export function mapType(schemaType: string | undefined, name?: string): string {
  if (!schemaType) throw new Error(`Missing type for field ${name ?? "unnamed"}`);
  const raw = schemaType.toLowerCase().replace(/\s+/g, "");
  const array = raw.endsWith("[]");
  const base = array ? raw.slice(0, -2) : raw;
  const mapped: Record<string, string> = {
    string: "string",
    boolean: "boolean",
    bool: "boolean",
    int: "number",
    integer: "number",
    int32: "number",
    float: "number",
    double: "number",
    numeric: "number",
    number: "number",
    int64: "Integer",
    uint64: "Integer",
    timestamp: "Date",
    file: "BinaryFile",
    object: "unknown",
    dict: "Record<string, unknown>",
    list: "unknown",
  };
  if (!Object.hasOwn(mapped, base))
    throw new Error(`Unsupported field type ${schemaType} for ${name ?? "unnamed"}`);
  // Keep known corrections for documentation that labels a list as a scalar.
  const inferredArray =
    name &&
    /^list$|_(?:list|ids|sns)$|array/.test(name) &&
    ["string", "int", "integer", "int32", "int64", "uint64", "float", "number", "object"].includes(
      base
    );
  return mapped[base] + (array || inferredArray || base === "list" ? "[]" : "");
}

// Recursively parse parameter lists into NormalizedParam structures
function parseParams(
  nodes: SpecFieldNode[],
  enums: ParsedEnum[],
  timestampPaths: string[],
  currentPath: string,
  apiName: string
): NormalizedParam[] {
  const result: NormalizedParam[] = [];

  for (const node of nodes) {
    if (!node.name) {
      if (node.children && node.children.length > 0) {
        node.name = "response";
      } else {
        continue;
      }
    }

    const fieldName = node.name.trim();
    const nodePath = currentPath ? `${currentPath}.${fieldName}` : fieldName;
    const description = cleanDescription(node.description);

    let tsType = mapType(node.type, fieldName);
    if (fieldName === "images" && node.type === "file") tsType = "BinaryFiles";
    let enumDefinition: ParsedEnum | undefined;

    // Apply static overrides
    const override =
      NODE_PATH_TYPE_OVERRIDES[`${apiName}:${nodePath}`] ?? NODE_PATH_TYPE_OVERRIDES[nodePath];
    if (override) tsType = override;
    const fieldOverride = FIELD_NAME_TYPE_OVERRIDES[fieldName];
    if (fieldOverride && tsType === fieldOverride.expectedType) {
      tsType = fieldOverride.resolvedType;
    }

    const hasChildren = node.children && node.children.length > 0;
    const isBooleanType =
      node.type &&
      (node.type.trim().toLowerCase() === "boolean" || node.type.trim().toLowerCase() === "bool");

    // Check if there is an enum in the description
    if (!hasChildren && !isBooleanType && node.type?.toLowerCase() !== "file") {
      const parsedEnum = parseEnumFromDescription(fieldName, node.description || "", node.type);
      if (parsedEnum) {
        enumDefinition = parsedEnum;
        enums.push(parsedEnum);
        tsType = parsedEnum.name + (tsType.endsWith("[]") ? "[]" : "");
      } else {
        // Warning if the description mentions enum-like words but we failed to parse an enum
        const descLower = description.toLowerCase();
        if (
          descLower.includes("available values:") ||
          descLower.includes("available value:") ||
          descLower.includes("available value :") ||
          (descLower.includes("1:") && descLower.includes("2:"))
        ) {
          // eslint-disable-next-line no-console
          console.warn(
            `[Generator Warning] Field "${nodePath}" might contain an enum in its description but failed to parse: "${description.substring(0, 100)}..."`
          );
        }
      }
    }

    // Check if it is a timestamp
    if (node.type?.trim().toLowerCase() === "timestamp") {
      timestampPaths.push(nodePath);
    }

    // Determine optionality
    const optional =
      String(node.required).toLowerCase() === "false" ||
      String(node.required).toLowerCase() === "no" ||
      node.required === false ||
      node.required === null ||
      node.required === undefined;

    const param: NormalizedParam = {
      name: fieldName,
      type: tsType,
      description,
      optional,
      sample: node.sample,
      enum: enumDefinition,
    };

    if (node.children && node.children.length > 0) {
      const childParams = parseParams(node.children, enums, timestampPaths, nodePath, apiName);
      param.children = childParams;

      // Adjust type if it is an object array
      if (tsType === "object[]") {
        // Nested array item type name will be generated by AST builder
      }
    }

    result.push(param);
  }

  return result;
}

function parseSchema(filePath: string): EndpointSpec {
  const fileName = path.basename(filePath);
  // Match v2.<module>.<endpoint>.json
  const match = /^v2\.([a-z0-9_-]+)\.([^.]+)\.json$/.exec(normalizeSchemaName(fileName));
  if (!match) throw new Error(`Unsupported schema filename: ${fileName}`);

  const moduleName = match[1];
  const endpointName = match[2].normalize("NFD").replace(/[\u0300-\u036f]/g, "");
  const apiName = `v2.${moduleName}.${endpointName}`;

  const raw = fs.readFileSync(filePath, "utf-8");
  let schema: unknown;
  try {
    schema = parseResponseJson(raw);
    validateSchema(schema);
  } catch (error) {
    throw new Error(
      `Invalid schema ${fileName}: ${error instanceof Error ? error.message : String(error)}`,
      { cause: error }
    );
  }

  const methodVal = schema.method;
  let method: "GET" | "POST" = methodVal === 2 ? "GET" : "POST";
  // Issue 227: Shopee spec incorrectly marks get_escrow_detail_batch as GET (method 2),
  // but live Shopee gateway only accepts POST.
  if (moduleName === "payment" && endpointName === "get_escrow_detail_batch") {
    method = "POST";
  }
  const rawPath = schema.path || `/api/v2/${moduleName}/${endpointName}`;
  const pathVal = rawPath.replace("/api/v2/", "/"); // shopee fetch uses "/module/endpoint" format

  const names = new Set(schema.common_params?.map((param) => param.name) ?? []);
  // Missing documentation metadata is a partner fixture; actual schemas declare their scope.
  const authMode = !names.has("access_token")
    ? "partner"
    : names.has("merchant_id")
      ? "merchant"
      : names.has("shop_id")
        ? "shop"
        : names.has("user_id") || schema.api_type === "User"
          ? "user"
          : "token";
  const auth = authMode !== "partner";

  const rawDefine = schema.define;
  const defineStr = typeof rawDefine === "string" ? rawDefine : rawDefine?.content || "";
  const description =
    cleanDescription(defineStr) +
    (/[(（]only\s*(?:for\s*)?BR\s*now[)）]/i.test(schema.api_name ?? "")
      ? "\n\nOnly available in Brazil (BR)."
      : "");

  const enums: ParsedEnum[] = [];
  const timestampPaths: string[] = [];

  const requestParams = parseParams(schema.params?.request_params ?? [], enums, [], "", apiName);

  // Extract response object fields (passing the entire root level to preserve the "response" property node)
  const responseParams = parseParams(
    schema.params?.response_params ?? [],
    enums,
    timestampPaths,
    "",
    apiName
  );

  return {
    apiName,
    moduleName,
    endpointName,
    method,
    path: pathVal,
    auth,
    authMode,
    description,
    requestParams,
    responseParams,
    enums,
    timestampPaths,
  };
}

export function parseAllSchemas(schemasDir: string): Map<string, EndpointSpec[]> {
  const result = new Map<string, EndpointSpec[]>();
  const files = fs
    .readdirSync(schemasDir)
    .filter((f) => f.endsWith(".json"))
    .sort();

  for (const file of files) {
    const spec = parseSchemaFile(path.join(schemasDir, file));

    const list = result.get(spec.moduleName) || [];
    list.push(spec);
    result.set(spec.moduleName, list);
  }

  return result;
}

export function parseSchemaFile(filePath: string): EndpointSpec {
  try {
    return parseSchema(filePath);
  } catch (error) {
    if (error instanceof Error && error.message.startsWith("Invalid schema ")) throw error;
    throw new Error(
      `Invalid schema ${path.basename(filePath)}: ${error instanceof Error ? error.message : String(error)}`,
      { cause: error }
    );
  }
}
