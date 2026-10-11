import { SpecFieldNode } from "./types.js";

export interface InputSchema {
  method: 1 | 2;
  path?: string;
  api_name?: string;
  define?: string | { content?: string };
  params?: { request_params?: SpecFieldNode[]; response_params?: SpecFieldNode[] };
}

/** Validate the parts of Shopee documentation consumed by generation. */
export function validateSchema(value: unknown): asserts value is InputSchema {
  const isObject = (item: unknown): item is Record<string, unknown> =>
    typeof item === "object" && item !== null && !Array.isArray(item);
  if (!isObject(value)) throw new Error("expected a schema object");
  if (value.method !== 1 && value.method !== 2) {
    throw new Error("method must be 1 (POST) or 2 (GET)");
  }
  if (
    value.path !== undefined &&
    (typeof value.path !== "string" ||
      !/^\/api\/v2\/[a-z0-9_-]+\/(?:[^/?#\s]+\/)*[^/?#\s]+$/.test(value.path))
  ) {
    throw new Error("path must be an /api/v2/module/endpoint path");
  }
  if (value.api_name !== undefined && typeof value.api_name !== "string") {
    throw new Error("api_name must be a string");
  }
  if (
    value.define !== undefined &&
    typeof value.define !== "string" &&
    (!isObject(value.define) ||
      (value.define.content !== undefined && typeof value.define.content !== "string"))
  ) {
    throw new Error("define must be a string or an object with string content");
  }
  if (value.params !== undefined && !isObject(value.params)) {
    throw new Error("params must be an object");
  }
  const validateFields = (fields: unknown, location: string): void => {
    if (!Array.isArray(fields)) throw new Error(`${location} must be an array`);
    const names = new Set<string>();
    for (const [index, field] of fields.entries()) {
      const at = `${location}[${index}]`;
      if (!isObject(field)) throw new Error(`${at} must be an object`);
      for (const key of ["name", "type", "description"]) {
        if (field[key] != null && typeof field[key] !== "string") {
          throw new Error(`${at}.${key} must be a string`);
        }
      }
      if (
        field.required != null &&
        ![true, false, "true", "false", "yes", "no"].includes(
          typeof field.required === "string"
            ? field.required.toLowerCase()
            : (field.required as boolean)
        )
      ) {
        throw new Error(`${at}.required must be a boolean or true/false/yes/no`);
      }
      const name = typeof field.name === "string" ? field.name.trim() : "";
      if (!name && (!Array.isArray(field.children) || field.children.length === 0)) {
        throw new Error(
          `${at} needs a field name or nonempty children for an implicit response wrapper`
        );
      }
      if (name && names.has(name)) throw new Error(`${at} duplicates field ${name}`);
      if (name) names.add(name);
      if (field.children !== undefined) validateFields(field.children, `${at}.children`);
    }
  };
  const params = value.params as Record<string, unknown> | undefined;
  for (const side of ["request_params", "response_params"]) {
    if (params?.[side] !== undefined) validateFields(params[side], `params.${side}`);
  }
}
