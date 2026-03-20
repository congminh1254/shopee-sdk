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
}

interface SpecSchema {
  method?: number;
  params?: {
    request_params?: Array<{ name?: string }>;
    response?: Array<{ name?: string; children?: SpecFieldNode[] }>;
  };
}

interface SpecFieldNode {
  name?: string;
  children?: SpecFieldNode[];
}

interface SdkEndpointDefinition {
  endpoint: string;
  method: EndpointMethod;
  requestTypeName?: string;
  responseTypeName?: string;
}

const FALLBACK_ENDPOINT_PATH_REGEX = /["`]\/([a-z0-9-]+)\/([a-z0-9_]+)["`]/g;
const METHOD_POST_REGEX = /method\s*:\s*["']POST["']/;

function collectFieldNames(nodes: SpecFieldNode[] = []): Set<string> {
  const fields = new Set<string>();
  const stack = [...nodes];

  while (stack.length > 0) {
    const node = stack.pop();
    if (!node) {
      continue;
    }

    if (node.name) {
      fields.add(node.name);
    }

    if (node.children && node.children.length > 0) {
      stack.push(...node.children);
    }
  }

  return fields;
}

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
            const endpointMatch = /^\/([a-z0-9-]+)\/([a-z0-9_]+)$/.exec(endpointArg.text);
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

function collectTypeFieldNames(
  typeName: string | undefined,
  schemaSource: ts.SourceFile
): Set<string> | null {
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

  const collected = new Set<string>();
  const visited = new Set<string>();

  const visitTypeNode = (node: ts.TypeNode | undefined): void => {
    if (!node) {
      return;
    }

    if (ts.isTypeLiteralNode(node)) {
      for (const member of node.members) {
        if (ts.isPropertySignature(member) && member.name) {
          const fieldName = getPropertyName(member.name);
          if (fieldName) {
            collected.add(fieldName);
          }
          visitTypeNode(member.type);
        }
      }
      return;
    }

    if (ts.isTypeReferenceNode(node)) {
      const refName = getTypeName(node);
      if (refName && declarations.has(refName) && !visited.has(refName)) {
        visited.add(refName);
        visitDeclaration(declarations.get(refName));
      }
      node.typeArguments?.forEach((arg) => visitTypeNode(arg));
      return;
    }

    if (ts.isArrayTypeNode(node)) {
      visitTypeNode(node.elementType);
      return;
    }

    if (ts.isUnionTypeNode(node) || ts.isIntersectionTypeNode(node)) {
      node.types.forEach((type) => visitTypeNode(type));
      return;
    }

    if (ts.isParenthesizedTypeNode(node)) {
      visitTypeNode(node.type);
      return;
    }

    if (ts.isTupleTypeNode(node)) {
      node.elements.forEach((element) => visitTypeNode(element));
      return;
    }

    if (ts.isTypeOperatorNode(node)) {
      visitTypeNode(node.type);
      return;
    }

    if (ts.isConditionalTypeNode(node)) {
      visitTypeNode(node.checkType);
      visitTypeNode(node.extendsType);
      visitTypeNode(node.trueType);
      visitTypeNode(node.falseType);
      return;
    }

    if (ts.isIndexedAccessTypeNode(node)) {
      visitTypeNode(node.objectType);
      visitTypeNode(node.indexType);
      return;
    }

    if (ts.isMappedTypeNode(node)) {
      visitTypeNode(node.type);
      visitTypeNode(node.typeParameter.constraint);
    }
  };

  const visitDeclaration = (
    declaration: ts.InterfaceDeclaration | ts.TypeAliasDeclaration | undefined
  ): void => {
    if (!declaration) {
      return;
    }

    if (ts.isTypeAliasDeclaration(declaration)) {
      visitTypeNode(declaration.type);
      return;
    }

    for (const member of declaration.members) {
      if (ts.isPropertySignature(member) && member.name) {
        const fieldName = getPropertyName(member.name);
        if (fieldName) {
          collected.add(fieldName);
        }
        visitTypeNode(member.type);
      }
    }

    declaration.heritageClauses?.forEach((heritageClause) => {
      heritageClause.types.forEach((heritageType) => {
        visitTypeNode(heritageType);
      });
    });
  };

  const rootDeclaration = declarations.get(typeName);
  if (!rootDeclaration) {
    return null;
  }

  visited.add(typeName);
  visitDeclaration(rootDeclaration);
  return collected;
}

export function auditRepositorySpecs(repoRoot: string): SpecAuditReport {
  const schemasDir = path.join(repoRoot, "schemas");
  const managersDir = path.join(repoRoot, "src", "managers");
  const sdkSchemasDir = path.join(repoRoot, "src", "schemas");

  const schemaFiles = fs
    .readdirSync(schemasDir)
    .filter((file) => file.startsWith("v2.") && file.endsWith(".json"));

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
  const specEndpoints = new Set<string>();

  for (const schemaFile of schemaFiles) {
    const match = /^v2\.([a-z0-9-]+)\.([a-z0-9_]+)\.json$/.exec(schemaFile);
    if (!match) {
      continue;
    }

    const moduleName = match[1];
    const endpointName = match[2];
    const endpointKey = `${moduleName}.${endpointName}`;
    specEndpoints.add(endpointKey);

    const rawSchema = fs.readFileSync(path.join(schemasDir, schemaFile), "utf-8");
    const schema = JSON.parse(rawSchema) as SpecSchema;
    const sdkEndpointDef = sdkEndpoints.get(endpointKey);
    if (!sdkEndpointDef) {
      missingEndpoints.push(endpointKey);
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
    const requestFields = new Set(
      (schema.params?.request_params ?? []).map((item) => item.name).filter(Boolean) as string[]
    );
    const responseRoot = (schema.params?.response ?? []).find((item) => item.name === "response");
    const responseFields = collectFieldNames(responseRoot?.children ?? []);

    const requestTypeFields = collectTypeFieldNames(sdkEndpointDef?.requestTypeName, sdkSchemaAst);
    const responseTypeFields = collectTypeFieldNames(
      sdkEndpointDef?.responseTypeName,
      sdkSchemaAst
    );

    const missingTypeKinds: Array<"request" | "response"> = [];
    if (requestFields.size > 0 && !requestTypeFields) {
      missingTypeKinds.push("request");
    }
    if (responseFields.size > 0 && !responseTypeFields) {
      missingTypeKinds.push("response");
    }
    if (missingTypeKinds.length > 0) {
      endpointTypeGaps.push({ endpoint: endpointKey, missing: missingTypeKinds });
    }

    const missingReq = [...requestFields].filter((fieldName) => !requestTypeFields?.has(fieldName));
    if (missingReq.length > 0) {
      missingRequestFields.push({ endpoint: endpointKey, fields: missingReq });
    }

    const missingRes = [...responseFields].filter(
      (fieldName) => !responseTypeFields?.has(fieldName)
    );
    if (missingRes.length > 0) {
      missingResponseFields.push({ endpoint: endpointKey, fields: missingRes });
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
  };
}
