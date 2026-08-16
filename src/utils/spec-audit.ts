import fs from "node:fs";
import path from "node:path";
import ts from "typescript";

export type EndpointMethod = "GET" | "POST";

export interface EndpointMethodMismatch {
  endpoint: string;
  expectedMethod: EndpointMethod;
  actualMethod: EndpointMethod;
}

export interface EndpointFieldGap {
  endpoint: string;
  fields: string[];
}

export interface EndpointTypeMismatch {
  endpoint: string;
  field: string;
  expectedType: string;
  actualType: string;
}

export interface EndpointOptionalityMismatch {
  endpoint: string;
  field: string;
  expectedOptional: boolean;
  actualOptional: boolean;
}

export interface EndpointTypeGap {
  endpoint: string;
  missing: Array<"request" | "response">;
}

export interface SpecAuditReport {
  totalSpecs: number;
  totalSdkEndpoints: number;
  missingEndpoints: string[];
  uncoveredSdkEndpoints: string[];
  methodMismatches: EndpointMethodMismatch[];
  endpointTypeGaps: EndpointTypeGap[];
  missingRequestFields: EndpointFieldGap[];
  missingResponseFields: EndpointFieldGap[];
  extraRequestFields: EndpointFieldGap[];
  extraResponseFields: EndpointFieldGap[];
  requestTypeMismatches: EndpointTypeMismatch[];
  responseTypeMismatches: EndpointTypeMismatch[];
  requestOptionalityMismatches: EndpointOptionalityMismatch[];
}

interface SpecSchema {
  method?: number;
  params?: {
    request_params?: Array<{
      name?: string;
      type?: string;
      required?: any;
      children?: SpecFieldNode[];
    }>;
    response?: Array<{ name?: string; type?: string; required?: any; children?: SpecFieldNode[] }>;
  };
}

interface SpecFieldNode {
  name?: string;
  type?: string;
  required?: any;
  children?: SpecFieldNode[];
}

interface SdkEndpointDefinition {
  endpoint: string;
  method: EndpointMethod;
  requestTypeName?: string;
  responseTypeName?: string;
}

interface PathFieldInfo {
  type: string;
  optional: boolean;
}

const FALLBACK_ENDPOINT_PATH_REGEX = /["`]\/([a-z0-9_-]+)\/([a-z0-9_]+)["`]/g;
const METHOD_POST_REGEX = /method\s*:\s*["']POST["']/;

function getTypeName(node?: ts.TypeNode): string | undefined {
  if (!node || !ts.isTypeReferenceNode(node)) {
    return undefined;
  }

  if (ts.isIdentifier(node.typeName)) {
    return node.typeName.text;
  }

  if (ts.isQualifiedName(node.typeName)) {
    return node.typeName.right.text;
  }

  return undefined;
}

function getPropertyName(name: ts.PropertyName): string | undefined {
  if (ts.isIdentifier(name) || ts.isStringLiteral(name) || ts.isNumericLiteral(name)) {
    return name.text;
  }

  return undefined;
}

function parseSdkEndpoints(managerSource: string): SdkEndpointDefinition[] {
  const endpoints = new Map<string, EndpointMethod>();
  const endpointTypes = new Map<string, { requestTypeName?: string; responseTypeName?: string }>();

  const source = ts.createSourceFile("manager.ts", managerSource, ts.ScriptTarget.Latest, true);
  const visit = (node: ts.Node): void => {
    if (ts.isMethodDeclaration(node) && node.body) {
      const firstParam = node.parameters[0];
      const firstParamName =
        firstParam && ts.isIdentifier(firstParam.name) ? firstParam.name.text : undefined;
      const requestTypeName = firstParam ? getTypeName(firstParam.type) : undefined;

      let responseTypeName: string | undefined;
      if (node.type && ts.isTypeReferenceNode(node.type) && ts.isIdentifier(node.type.typeName)) {
        const returnTypeName = node.type.typeName.text;
        if (returnTypeName === "Promise" && node.type.typeArguments?.length === 1) {
          responseTypeName = getTypeName(node.type.typeArguments[0]);
        }
      }

      const visitMethodNode = (methodNode: ts.Node): void => {
        if (
          ts.isCallExpression(methodNode) &&
          ts.isPropertyAccessExpression(methodNode.expression) &&
          methodNode.expression.name.text === "fetch" &&
          ts.isIdentifier(methodNode.expression.expression) &&
          methodNode.expression.expression.text === "ShopeeFetch"
        ) {
          const endpointArg = methodNode.arguments[1];
          if (
            endpointArg &&
            (ts.isStringLiteral(endpointArg) || ts.isNoSubstitutionTemplateLiteral(endpointArg))
          ) {
            const endpointMatch = /^\/([a-z0-9_-]+)\/([a-z0-9_]+)$/.exec(endpointArg.text);
            if (endpointMatch) {
              const endpoint = `${endpointMatch[1]}.${endpointMatch[2]}`;
              const optionsArg = methodNode.arguments[2];
              let method: EndpointMethod = "GET";
              let hasPayloadProperty = false;
              if (optionsArg && ts.isObjectLiteralExpression(optionsArg)) {
                for (const property of optionsArg.properties) {
                  if (ts.isPropertyAssignment(property)) {
                    const name = getPropertyName(property.name);
                    if (name === "method") {
                      if (
                        ts.isStringLiteral(property.initializer) ||
                        ts.isNoSubstitutionTemplateLiteral(property.initializer)
                      ) {
                        method = property.initializer.text === "POST" ? "POST" : "GET";
                      } else {
                        const methodText = property.initializer.getText(source);
                        method = METHOD_POST_REGEX.test(methodText) ? "POST" : "GET";
                      }
                    }

                    if (name === "params" || name === "body") {
                      hasPayloadProperty = true;
                    }
                  }
                }
              }

              let endpointRequestType: string | undefined = hasPayloadProperty
                ? requestTypeName
                : undefined;
              if (optionsArg && ts.isObjectLiteralExpression(optionsArg) && firstParamName) {
                for (const property of optionsArg.properties) {
                  if (ts.isPropertyAssignment(property)) {
                    const name = getPropertyName(property.name);
                    if (
                      (name === "params" || name === "body") &&
                      ts.isIdentifier(property.initializer) &&
                      property.initializer.text === firstParamName
                    ) {
                      endpointRequestType = requestTypeName;
                    }
                  } else if (ts.isShorthandPropertyAssignment(property)) {
                    const name = property.name.text;
                    if ((name === "params" || name === "body") && name === firstParamName) {
                      endpointRequestType = requestTypeName;
                    }
                  }
                }
              }

              const fetchResponseTypeName =
                methodNode.typeArguments && methodNode.typeArguments.length === 1
                  ? getTypeName(methodNode.typeArguments[0])
                  : undefined;

              endpoints.set(endpoint, method);
              endpointTypes.set(endpoint, {
                requestTypeName: endpointRequestType,
                responseTypeName: fetchResponseTypeName ?? responseTypeName,
              });
            }
          }
        }

        ts.forEachChild(methodNode, visitMethodNode);
      };

      visitMethodNode(node.body);
    }

    ts.forEachChild(node, visit);
  };

  visit(source);
  for (const match of managerSource.matchAll(FALLBACK_ENDPOINT_PATH_REGEX)) {
    const endpoint = `${match[1]}.${match[2]}`;
    if (!endpoints.has(endpoint)) {
      endpoints.set(endpoint, "GET");
    }
  }

  return [...endpoints.entries()].map(([endpoint, method]) => ({
    endpoint,
    method,
    requestTypeName: endpointTypes.get(endpoint)?.requestTypeName,
    responseTypeName: endpointTypes.get(endpoint)?.responseTypeName,
  }));
}

function collectTypeFieldTree(
  typeName: string | undefined,
  schemaSource: ts.SourceFile
): Map<string, PathFieldInfo> | null {
  if (!typeName) {
    return null;
  }

  const declarations = new Map<string, ts.InterfaceDeclaration | ts.TypeAliasDeclaration>();
  const visit = (node: ts.Node): void => {
    if ((ts.isInterfaceDeclaration(node) || ts.isTypeAliasDeclaration(node)) && node.name) {
      declarations.set(node.name.text, node);
    }
    ts.forEachChild(node, visit);
  };
  visit(schemaSource);

  const collected = new Map<string, PathFieldInfo>();
  const visited = new Set<string>();

  const visitTypeNode = (
    node: ts.TypeNode | undefined,
    currentPath: string,
    isOptional: boolean
  ): void => {
    if (!node) {
      return;
    }

    if (node.kind === ts.SyntaxKind.StringKeyword) {
      if (currentPath) {
        collected.set(currentPath, { type: "string", optional: isOptional });
      }
      return;
    }
    if (node.kind === ts.SyntaxKind.NumberKeyword) {
      if (currentPath) {
        collected.set(currentPath, { type: "number", optional: isOptional });
      }
      return;
    }
    if (node.kind === ts.SyntaxKind.BooleanKeyword) {
      if (currentPath) {
        collected.set(currentPath, { type: "boolean", optional: isOptional });
      }
      return;
    }

    if (ts.isTypeLiteralNode(node)) {
      if (currentPath) {
        collected.set(currentPath, { type: "object", optional: isOptional });
      }
      for (const member of node.members) {
        if (ts.isPropertySignature(member) && member.name) {
          const fieldName = getPropertyName(member.name);
          if (fieldName) {
            const memberPath = currentPath ? `${currentPath}.${fieldName}` : fieldName;
            const memberOptional = member.questionToken !== undefined;
            visitTypeNode(member.type, memberPath, memberOptional);
          }
        }
      }
      return;
    }

    if (ts.isTypeReferenceNode(node)) {
      const refName = getTypeName(node);
      if (refName) {
        if (
          (refName === "Array" || refName === "ReadonlyArray") &&
          node.typeArguments?.length === 1
        ) {
          if (currentPath) {
            collected.set(currentPath, { type: "array", optional: isOptional });
          }
          visitTypeNode(node.typeArguments[0], currentPath, isOptional);
          return;
        }

        if (declarations.has(refName) && !visited.has(refName)) {
          visited.add(refName);
          if (currentPath) {
            collected.set(currentPath, { type: "object", optional: isOptional });
          }
          visitDeclaration(declarations.get(refName), currentPath);
          visited.delete(refName);
        }
      }
      node.typeArguments?.forEach((arg) => visitTypeNode(arg, currentPath, isOptional));
      return;
    }

    if (ts.isArrayTypeNode(node)) {
      if (currentPath) {
        collected.set(currentPath, { type: "array", optional: isOptional });
      }
      visitTypeNode(node.elementType, currentPath, isOptional);
      return;
    }

    if (ts.isUnionTypeNode(node) || ts.isIntersectionTypeNode(node)) {
      node.types.forEach((type) => visitTypeNode(type, currentPath, isOptional));
      return;
    }

    if (ts.isParenthesizedTypeNode(node)) {
      visitTypeNode(node.type, currentPath, isOptional);
      return;
    }
  };

  const visitDeclaration = (
    declaration: ts.InterfaceDeclaration | ts.TypeAliasDeclaration | undefined,
    currentPath: string
  ): void => {
    if (!declaration) {
      return;
    }

    if (ts.isTypeAliasDeclaration(declaration)) {
      visitTypeNode(declaration.type, currentPath, false);
      return;
    }

    for (const member of declaration.members) {
      if (ts.isPropertySignature(member) && member.name) {
        const fieldName = getPropertyName(member.name);
        if (fieldName) {
          const memberPath = currentPath ? `${currentPath}.${fieldName}` : fieldName;
          const memberOptional = member.questionToken !== undefined;
          visitTypeNode(member.type, memberPath, memberOptional);
        }
      }
    }

    declaration.heritageClauses?.forEach((heritageClause) => {
      heritageClause.types.forEach((heritageType) => {
        const refName = getTypeName(heritageType);
        if (refName) {
          if (refName === "FetchResponse" && heritageType.typeArguments?.length === 1) {
            visitTypeNode(heritageType.typeArguments[0], currentPath, false);
          } else if (declarations.has(refName) && !visited.has(refName)) {
            visited.add(refName);
            visitDeclaration(declarations.get(refName), currentPath);
            visited.delete(refName);
          }
        }
      });
    });
  };

  const rootDeclaration = declarations.get(typeName);
  if (!rootDeclaration) {
    return null;
  }

  visited.add(typeName);
  visitDeclaration(rootDeclaration, "");
  return collected;
}

function collectSchemaFields(
  nodes: SpecFieldNode[] = [],
  pathPrefix: string = ""
): Map<string, PathFieldInfo> {
  const fields = new Map<string, PathFieldInfo>();

  const traverse = (node: SpecFieldNode, prefix: string): void => {
    if (!node.name) {
      return;
    }

    const fieldPath = prefix ? `${prefix}.${node.name}` : node.name;

    let type = "any";
    if (node.type) {
      const t = node.type.toLowerCase();
      if (t.includes("string")) {
        type = "string";
      } else if (
        t.includes("int") ||
        t.includes("float") ||
        t.includes("double") ||
        t.includes("numeric") ||
        t.includes("number") ||
        t.includes("timestamp")
      ) {
        type = "number";
      } else if (t.includes("bool")) {
        type = "boolean";
      } else if (t.includes("array") || t.includes("list")) {
        type = "array";
      } else if (t.includes("object") || t.includes("dict")) {
        type = "object";
      }
    }

    const optional = node.required === "False" || node.required === false || node.required === null;

    fields.set(fieldPath, { type, optional });

    if (node.children && node.children.length > 0) {
      for (const child of node.children) {
        traverse(child, fieldPath);
      }
    }
  };

  for (const node of nodes) {
    traverse(node, pathPrefix);
  }

  return fields;
}

export function auditRepositorySpecs(repoRoot: string): SpecAuditReport {
  const schemasDir = path.join(repoRoot, "schemas");
  const managersDir = path.join(repoRoot, "src", "managers");
  const sdkSchemasDir = path.join(repoRoot, "src", "schemas");

  const schemaFiles = fs.readdirSync(schemasDir).filter((file) => file.endsWith(".json"));
  const managerFiles = fs.readdirSync(managersDir).filter((file) => file.endsWith(".manager.ts"));

  const sdkEndpoints = new Map<string, SdkEndpointDefinition>();
  for (const managerFile of managerFiles) {
    const managerSource = fs.readFileSync(path.join(managersDir, managerFile), "utf-8");
    for (const endpointDef of parseSdkEndpoints(managerSource)) {
      sdkEndpoints.set(endpointDef.endpoint, endpointDef);
    }
  }

  const missingEndpoints: string[] = [];
  const uncoveredSdkEndpoints: string[] = [];
  const methodMismatches: EndpointMethodMismatch[] = [];
  const endpointTypeGaps: EndpointTypeGap[] = [];
  const missingRequestFields: EndpointFieldGap[] = [];
  const missingResponseFields: EndpointFieldGap[] = [];
  const extraRequestFields: EndpointFieldGap[] = [];
  const extraResponseFields: EndpointFieldGap[] = [];
  const requestTypeMismatches: EndpointTypeMismatch[] = [];
  const responseTypeMismatches: EndpointTypeMismatch[] = [];
  const requestOptionalityMismatches: EndpointOptionalityMismatch[] = [];
  const specEndpoints = new Set<string>();

  for (const schemaFile of schemaFiles) {
    const normalizedFile = schemaFile
      .replace(/^\s+/, "")
      .replace(/^\(coming offline soon\)\s*/, "")
      .replace(/\s+\.json$/, ".json")
      .replace(/fácil/g, "facil");

    const match = /^v2\.([a-z0-9_-]+)\.([a-z0-9_]+)\.json$/.exec(normalizedFile);
    if (!match) {
      continue;
    }

    const moduleName = match[1];
    const endpointName = match[2];
    const endpointKey = `${moduleName}.${endpointName}`;
    specEndpoints.add(endpointKey);
    if (endpointKey === "product.get_variations") {
      specEndpoints.add("product.get_variation_tree");
    }

    const rawSchema = fs.readFileSync(path.join(schemasDir, schemaFile), "utf-8");
    const schema = JSON.parse(rawSchema) as SpecSchema;

    let lookupKey = endpointKey;
    if (endpointKey === "product.get_variations") {
      lookupKey = "product.get_variation_tree";
    }
    const sdkEndpointDef = sdkEndpoints.get(lookupKey);
    if (!sdkEndpointDef) {
      const isIgnored = [
        "public.get_access_token",
        "public.refresh_access_token",
        "ads.create_auto_product_ads",
        "ads.edit_auto_product_ads",
      ].includes(endpointKey);

      if (!isIgnored) {
        missingEndpoints.push(endpointKey);
      }
      continue;
    } else if (schema.method === 1 && sdkEndpointDef.method !== "POST") {
      methodMismatches.push({
        endpoint: endpointKey,
        expectedMethod: "POST",
        actualMethod: sdkEndpointDef.method,
      });
    } else if (schema.method === 2 && sdkEndpointDef.method !== "GET") {
      methodMismatches.push({
        endpoint: endpointKey,
        expectedMethod: "GET",
        actualMethod: sdkEndpointDef.method,
      });
    }

    const sdkSchemaPath = path.join(sdkSchemasDir, `${moduleName}.ts`);
    if (!fs.existsSync(sdkSchemaPath)) {
      continue;
    }

    const sdkSchemaSource = fs.readFileSync(sdkSchemaPath, "utf-8");
    const sdkSchemaAst = ts.createSourceFile(
      sdkSchemaPath,
      sdkSchemaSource,
      ts.ScriptTarget.Latest,
      true
    );

    const schemaRequestFields = collectSchemaFields(schema.params?.request_params ?? []);
    const responseRoot = (schema.params?.response ?? []).find((item) => item.name === "response");
    const schemaResponseFields = collectSchemaFields(responseRoot?.children ?? []);

    const requestTypeFields = collectTypeFieldTree(sdkEndpointDef.requestTypeName, sdkSchemaAst);
    const responseTypeFields = collectTypeFieldTree(sdkEndpointDef.responseTypeName, sdkSchemaAst);

    const missingTypeKinds: Array<"request" | "response"> = [];
    if (schemaRequestFields.size > 0 && !requestTypeFields) {
      missingTypeKinds.push("request");
    }
    if (schemaResponseFields.size > 0 && !responseTypeFields) {
      missingTypeKinds.push("response");
    }
    if (missingTypeKinds.length > 0) {
      endpointTypeGaps.push({ endpoint: endpointKey, missing: missingTypeKinds });
    }

    // Match request fields
    const missingReq: string[] = [];
    const extraReq: string[] = [];
    for (const [path, schemaInfo] of schemaRequestFields.entries()) {
      const tsInfo = requestTypeFields?.get(path);
      if (!tsInfo) {
        missingReq.push(path);
        continue;
      }
      if (tsInfo.type !== "any" && schemaInfo.type !== "any" && schemaInfo.type !== tsInfo.type) {
        requestTypeMismatches.push({
          endpoint: endpointKey,
          field: path,
          expectedType: schemaInfo.type,
          actualType: tsInfo.type,
        });
      }
      if (schemaInfo.optional !== tsInfo.optional) {
        requestOptionalityMismatches.push({
          endpoint: endpointKey,
          field: path,
          expectedOptional: schemaInfo.optional,
          actualOptional: tsInfo.optional,
        });
      }
    }
    if (requestTypeFields) {
      for (const path of requestTypeFields.keys()) {
        if (!schemaRequestFields.has(path)) {
          extraReq.push(path);
        }
      }
    }

    const filteredMissingReq = missingReq.filter((field) => {
      const key = `${endpointKey}:${field}`;
      return ![
        "livestream.upload_image:image",
        "logistics.ship_booking:dropoff",
        "logistics.upload_serviceable_polygon:file",
        "media.upload_image:images",
        "media.upload_video_part:part_content",
        "order.upload_invoice_doc:file",
        "returns.convert_image:upload_image",
      ].includes(key);
    });

    if (filteredMissingReq.length > 0) {
      missingRequestFields.push({ endpoint: endpointKey, fields: filteredMissingReq });
    }
    if (extraReq.length > 0) {
      extraRequestFields.push({ endpoint: endpointKey, fields: extraReq });
    }

    // Match response fields
    const tsResponseFields = new Map<string, PathFieldInfo>();
    if (responseTypeFields) {
      for (const [path, info] of responseTypeFields.entries()) {
        if (path.startsWith("response.")) {
          tsResponseFields.set(path.substring(9), info);
        } else if (path === "response") {
          // Ignore
        } else {
          tsResponseFields.set(path, info);
        }
      }
    }

    const missingRes: string[] = [];
    const extraRes: string[] = [];
    for (const [path, schemaInfo] of schemaResponseFields.entries()) {
      const tsInfo = tsResponseFields.get(path);
      if (!tsInfo) {
        missingRes.push(path);
        continue;
      }
      if (tsInfo.type !== "any" && schemaInfo.type !== "any" && schemaInfo.type !== tsInfo.type) {
        responseTypeMismatches.push({
          endpoint: endpointKey,
          field: path,
          expectedType: schemaInfo.type,
          actualType: tsInfo.type,
        });
      }
    }
    if (tsResponseFields) {
      for (const path of tsResponseFields.keys()) {
        if (!schemaResponseFields.has(path)) {
          extraRes.push(path);
        }
      }
    }

    if (missingRes.length > 0) {
      missingResponseFields.push({ endpoint: endpointKey, fields: missingRes });
    }
    if (extraRes.length > 0) {
      extraResponseFields.push({ endpoint: endpointKey, fields: extraRes });
    }
  }

  for (const sdkEndpoint of sdkEndpoints.keys()) {
    if (!specEndpoints.has(sdkEndpoint)) {
      uncoveredSdkEndpoints.push(sdkEndpoint);
    }
  }

  return {
    totalSpecs: schemaFiles.length,
    totalSdkEndpoints: sdkEndpoints.size,
    missingEndpoints: missingEndpoints.sort(),
    uncoveredSdkEndpoints: uncoveredSdkEndpoints.sort(),
    methodMismatches: methodMismatches.sort((a, b) => a.endpoint.localeCompare(b.endpoint)),
    endpointTypeGaps: endpointTypeGaps.sort((a, b) => a.endpoint.localeCompare(b.endpoint)),
    missingRequestFields: missingRequestFields.sort((a, b) => a.endpoint.localeCompare(b.endpoint)),
    missingResponseFields: missingResponseFields.sort((a, b) =>
      a.endpoint.localeCompare(b.endpoint)
    ),
    extraRequestFields: extraRequestFields.sort((a, b) => a.endpoint.localeCompare(b.endpoint)),
    extraResponseFields: extraResponseFields.sort((a, b) => a.endpoint.localeCompare(b.endpoint)),
    requestTypeMismatches: requestTypeMismatches.sort((a, b) =>
      a.endpoint.localeCompare(b.endpoint)
    ),
    responseTypeMismatches: responseTypeMismatches.sort((a, b) =>
      a.endpoint.localeCompare(b.endpoint)
    ),
    requestOptionalityMismatches: requestOptionalityMismatches.sort((a, b) =>
      a.endpoint.localeCompare(b.endpoint)
    ),
  };
}
