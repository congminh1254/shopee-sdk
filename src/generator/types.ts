export interface SpecFieldNode {
  name?: string;
  type?: string;
  required?: any;
  description?: string;
  sample?: any;
  children?: SpecFieldNode[];
}

export interface NormalizedParam {
  name: string;
  type: string;
  description: string;
  optional: boolean;
  sample?: any;
  children?: NormalizedParam[];
}

export interface ParsedEnumMember {
  name: string;
  value: string | number;
  description?: string;
}

export interface ParsedEnum {
  name: string;
  type: "string" | "number";
  members: ParsedEnumMember[];
}

export interface EndpointSpec {
  apiName: string;
  moduleName: string;
  endpointName: string;
  method: "GET" | "POST";
  path: string;
  auth: boolean;
  description: string;
  requestParams: NormalizedParam[];
  responseParams: NormalizedParam[];
  enums: ParsedEnum[];
  timestampPaths: string[];
}

export function toPascalCase(str: string): string {
  if (str.toLowerCase() === "livestream") return "LiveStream";
  const normalized = str.normalize("NFD").replace(/[\u0300-\u036f]/g, "");
  return normalized
    .replace(/[^a-zA-Z0-9_\s-]/g, "")
    .split(/[\s_-]+/)
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
    .join("");
}

export function toCamelCase(str: string): string {
  if (str.toLowerCase() === "livestream") return "livestream";
  const pascal = toPascalCase(str);
  return pascal.charAt(0).toLowerCase() + pascal.slice(1);
}

export function getManagerClassName(moduleName: string): string {
  if (moduleName.toLowerCase() === "livestream") return "LiveStreamManager";
  return `${toPascalCase(moduleName)}Manager`;
}

export function getSdkPropertyName(moduleName: string): string {
  if (moduleName.toLowerCase() === "livestream") return "livestream";
  return toCamelCase(moduleName);
}
