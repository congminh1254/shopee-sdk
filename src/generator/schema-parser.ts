import fs from "node:fs";
import path from "node:path";
import {
  EndpointSpec,
  NormalizedParam,
  ParsedEnum,
  ParsedEnumMember,
  SpecFieldNode,
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
    ].includes(nodeType.trim().toLowerCase());

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

function mapType(schemaType: string | undefined, name?: string): string {
  if (!schemaType) return "any";
  const t = schemaType.toLowerCase().trim();
  if (name) {
    const lowerName = name.toLowerCase().trim();
    const isList =
      lowerName.endsWith("_list") ||
      lowerName.endsWith("_ids") ||
      lowerName.endsWith("_sns") ||
      lowerName.includes("array") ||
      (lowerName.includes("list") && !lowerName.includes("listen") && !lowerName.includes("blist"));

    if (isList) {
      if (
        ["int", "integer", "int32", "int64", "float", "double", "numeric", "number"].includes(t)
      ) {
        return "number[]";
      }
      if (t === "string") {
        return "string[]";
      }
      if (t === "object") {
        return "any[]";
      }
    }
  }
  if (t === "string") return "string";
  if (t === "boolean" || t === "bool") return "boolean";
  if (["int", "integer", "int32", "int64", "float", "double", "numeric", "number"].includes(t)) {
    return "number";
  }
  if (t === "timestamp") return "Date";
  if (t === "string[]" || t === "string []") return "string[]";
  if (
    [
      "int[]",
      "integer[]",
      "int32[]",
      "int64[]",
      "float[]",
      "number[]",
      "int []",
      "int64 []",
    ].includes(t)
  ) {
    return "number[]";
  }
  if (t === "boolean[]") return "boolean[]";
  if (t.includes("object[]") || t.includes("list")) return "any[]";
  if (t.includes("object") || t.includes("dict")) return "any";
  return "any";
}

// Recursively parse parameter lists into NormalizedParam structures
function parseParams(
  nodes: SpecFieldNode[],
  enums: ParsedEnum[],
  timestampPaths: string[],
  currentPath: string
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

    const hasChildren = node.children && node.children.length > 0;

    // Check if there is an enum in the description
    if (!hasChildren) {
      const parsedEnum = parseEnumFromDescription(fieldName, node.description || "", node.type);
      if (parsedEnum) {
        enums.push(parsedEnum);
        tsType = parsedEnum.name;
      }
    }

    // Check if it is a timestamp
    if (node.type?.trim().toLowerCase() === "timestamp") {
      timestampPaths.push(nodePath);
    }

    // Determine optionality
    const optional =
      node.required === "False" ||
      node.required === false ||
      node.required === null ||
      node.required === undefined;

    const param: NormalizedParam = {
      name: fieldName,
      type: tsType,
      description,
      optional,
      sample: node.sample,
    };

    if (node.children && node.children.length > 0) {
      const childParams = parseParams(node.children, enums, timestampPaths, nodePath);
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

export function parseSchemaFile(filePath: string): EndpointSpec | null {
  const fileName = path.basename(filePath);
  // Match v2.<module>.<endpoint>.json
  const match = /^v2\.([a-z0-9_-]+)\.([^.]+)\.json$/.exec(fileName);
  if (!match) return null;

  const moduleName = match[1];
  const endpointName = match[2].normalize("NFD").replace(/[\u0300-\u036f]/g, "");
  const apiName = `v2.${moduleName}.${endpointName}`;

  const raw = fs.readFileSync(filePath, "utf-8");
  const schema = JSON.parse(raw);

  const methodVal = schema.method;
  const method: "GET" | "POST" = methodVal === 2 ? "GET" : "POST";
  const rawPath = schema.path || `/api/v2/${moduleName}/${endpointName}`;
  const pathVal = rawPath.replace("/api/v2/", "/"); // shopee fetch uses "/module/endpoint" format

  // Public APIs might have no auth, but by default auth is true
  const isPublic = ["public.get_access_token", "public.refresh_access_token"].includes(
    `${moduleName}.${endpointName}`
  );
  const auth = !isPublic;

  const rawDefine = schema.define;
  const defineStr = typeof rawDefine === "string" ? rawDefine : rawDefine?.content || "";
  const description = cleanDescription(defineStr);

  const enums: ParsedEnum[] = [];
  const timestampPaths: string[] = [];

  const requestParams = parseParams(schema.params?.request_params ?? [], enums, timestampPaths, "");

  // Extract response object fields (passing the entire root level to preserve the "response" property node)
  const responseParams = parseParams(
    schema.params?.response_params ?? [],
    enums,
    timestampPaths,
    ""
  );

  return {
    apiName,
    moduleName,
    endpointName,
    method,
    path: pathVal,
    auth,
    description,
    requestParams,
    responseParams,
    enums,
    timestampPaths,
  };
}

export function parseAllSchemas(schemasDir: string): Map<string, EndpointSpec[]> {
  const result = new Map<string, EndpointSpec[]>();
  const files = fs.readdirSync(schemasDir).filter((f) => f.endsWith(".json"));

  for (const file of files) {
    const spec = parseSchemaFile(path.join(schemasDir, file));
    if (!spec) continue;

    const list = result.get(spec.moduleName) || [];
    list.push(spec);
    result.set(spec.moduleName, list);
  }

  return result;
}
