import ts from "typescript";
import { NormalizedParam, ParsedEnum, toPascalCase, toCamelCase } from "./types.js";

// Singularize name for interface type names
function singularize(name: string): string {
  if (name.endsWith("_list")) {
    return name.slice(0, -5);
  }
  if (
    name.endsWith("s") &&
    !name.endsWith("status") &&
    !name.endsWith("class") &&
    !name.endsWith("address") &&
    !name.endsWith("metrics") &&
    !name.endsWith("analysis")
  ) {
    return name.slice(0, -1);
  }
  return name;
}

// Helper to add JSDoc comments to nodes
function addJsDoc(node: ts.Node, text: string): ts.Node {
  if (!text) return node;
  // Format text as multiline JSDoc
  const lines = text.split("\n").map((l) => l.trim());
  const comment = "*\n" + lines.map((l) => ` * ${l}`).join("\n") + "\n ";
  return ts.addSyntheticLeadingComment(node, ts.SyntaxKind.MultiLineCommentTrivia, comment, true);
}

export class AstBuilder {
  public enumNames = new Set<string>();
  // Registry to prevent duplicates and resolve collisions structurally
  private declaredInterfaces = new Map<string, { key: string; name: string }>();

  // Clear registry for a new module
  public clearRegistry() {
    this.declaredInterfaces.clear();
  }

  // Create a structural key for an interface representation
  private getStructureKey(params: NormalizedParam[]): string {
    return params
      .map((p) => `${p.name}:${p.type}:${p.optional}`)
      .sort()
      .join("|");
  }

  // Register or resolve an interface name based on structure
  private resolveInterfaceName(
    preferredName: string,
    params: NormalizedParam[],
    endpointName: string
  ): string {
    const key = this.getStructureKey(params);
    const existing = this.declaredInterfaces.get(preferredName);

    if (existing) {
      if (existing.key === key) {
        // Structurally identical, safe to reuse
        return existing.name;
      } else {
        // Collision! Append endpoint name to make it unique
        const uniqueName = `${toPascalCase(endpointName)}_${preferredName}`;
        this.declaredInterfaces.set(uniqueName, { key, name: uniqueName });
        return uniqueName;
      }
    }

    this.declaredInterfaces.set(preferredName, { key, name: preferredName });
    return preferredName;
  }

  // Build enum declaration AST
  public buildEnum(parsedEnum: ParsedEnum): ts.EnumDeclaration {
    const members = parsedEnum.members.map((m) => {
      const initializer =
        parsedEnum.type === "string"
          ? ts.factory.createStringLiteral(m.value as string)
          : ts.factory.createNumericLiteral(m.value as number);

      let member = ts.factory.createEnumMember(m.name, initializer);
      if (m.description) {
        member = addJsDoc(member, m.description) as ts.EnumMember;
      }
      return member;
    });

    const enumNode = ts.factory.createEnumDeclaration(
      [ts.factory.createModifier(ts.SyntaxKind.ExportKeyword)],
      parsedEnum.name,
      members
    );

    return addJsDoc(enumNode, `Enum generated for field ${parsedEnum.name}`) as ts.EnumDeclaration;
  }

  // Recursively collect and build nested object interfaces
  public buildNestedInterfaces(
    params: NormalizedParam[],
    endpointName: string,
    isRequest: boolean,
    parentTypeName: string
  ): ts.InterfaceDeclaration[] {
    const declarations: ts.InterfaceDeclaration[] = [];

    for (const param of params) {
      if (param.children && param.children.length > 0) {
        const preferredName =
          param.name === "response"
            ? param.type.endsWith("[]")
              ? `${toPascalCase(endpointName)}ResponseDataItem`
              : `${toPascalCase(endpointName)}ResponseData`
            : `${toPascalCase(endpointName)}${toPascalCase(singularize(param.name))}`;
        const resolvedName = this.resolveInterfaceName(preferredName, param.children, endpointName);

        // Map the type of the property in the parent to the resolved sub-interface name
        const isArray = param.type.endsWith("[]");
        param.type = isArray ? `${resolvedName}[]` : resolvedName;

        // Build child sub-interfaces first
        const childDecls = this.buildNestedInterfaces(
          param.children,
          endpointName,
          isRequest,
          resolvedName
        );
        declarations.push(...childDecls);

        // Build the current sub-interface itself
        const properties = param.children.map((child) => {
          const typeNode = this.getTypeNode(child.type);
          const questionToken = child.optional
            ? ts.factory.createToken(ts.SyntaxKind.QuestionToken)
            : undefined;

          let prop = ts.factory.createPropertySignature(
            undefined,
            child.name,
            questionToken,
            typeNode
          );
          if (child.description) {
            prop = addJsDoc(prop, child.description) as ts.PropertySignature;
          }
          return prop;
        });

        const interfaceDecl = ts.factory.createInterfaceDeclaration(
          [ts.factory.createModifier(ts.SyntaxKind.ExportKeyword)],
          resolvedName,
          undefined,
          undefined,
          properties
        );

        declarations.push(
          addJsDoc(
            interfaceDecl,
            `${resolvedName} sub-interface for ${parentTypeName}`
          ) as ts.InterfaceDeclaration
        );
      }
    }

    return declarations;
  }

  // Convert type string to ts.TypeNode
  private getTypeNode(typeStr: string): ts.TypeNode {
    const isArray = typeStr.endsWith("[]");
    const baseType = isArray ? typeStr.slice(0, -2) : typeStr;

    let baseNode: ts.TypeNode;
    if (baseType === "string") {
      baseNode = ts.factory.createKeywordTypeNode(ts.SyntaxKind.StringKeyword);
    } else if (baseType === "number") {
      baseNode = ts.factory.createKeywordTypeNode(ts.SyntaxKind.NumberKeyword);
    } else if (baseType === "boolean") {
      baseNode = ts.factory.createKeywordTypeNode(ts.SyntaxKind.BooleanKeyword);
    } else if (baseType === "any") {
      baseNode = ts.factory.createKeywordTypeNode(ts.SyntaxKind.AnyKeyword);
    } else if (baseType === "Date") {
      baseNode = ts.factory.createUnionTypeNode([
        ts.factory.createTypeReferenceNode("Date"),
        ts.factory.createKeywordTypeNode(ts.SyntaxKind.NumberKeyword),
      ]);
    } else {
      if (this.enumNames.has(baseType)) {
        baseNode = ts.factory.createUnionTypeNode([
          ts.factory.createTypeReferenceNode(baseType),
          ts.factory.createKeywordTypeNode(ts.SyntaxKind.StringKeyword),
          ts.factory.createKeywordTypeNode(ts.SyntaxKind.NumberKeyword),
        ]);
      } else {
        baseNode = ts.factory.createTypeReferenceNode(baseType);
      }
    }

    return isArray ? ts.factory.createArrayTypeNode(baseNode) : baseNode;
  }

  // Build Request parameter type alias or interface
  public buildRequestInterface(
    endpointName: string,
    params: NormalizedParam[],
    description: string
  ): ts.InterfaceDeclaration | ts.TypeAliasDeclaration {
    const pascalName = toPascalCase(endpointName);
    const typeName = `${pascalName}Request`;

    if (params.length === 0) {
      // Empty params ➡️ type GetItemLimitRequest = Record<string, never>; or similar empty type
      const emptyType = ts.factory.createTypeAliasDeclaration(
        [ts.factory.createModifier(ts.SyntaxKind.ExportKeyword)],
        typeName,
        undefined,
        ts.factory.createTypeReferenceNode("Record", [
          ts.factory.createKeywordTypeNode(ts.SyntaxKind.StringKeyword),
          ts.factory.createKeywordTypeNode(ts.SyntaxKind.NeverKeyword),
        ])
      );
      return addJsDoc(
        emptyType,
        `Request parameters for ${endpointName}\n\n${description}`
      ) as ts.TypeAliasDeclaration;
    }

    const properties = params.map((p) => {
      const typeNode = this.getTypeNode(p.type);
      const questionToken = p.optional
        ? ts.factory.createToken(ts.SyntaxKind.QuestionToken)
        : undefined;

      let prop = ts.factory.createPropertySignature(undefined, p.name, questionToken, typeNode);
      if (p.description) {
        prop = addJsDoc(prop, p.description) as ts.PropertySignature;
      }
      return prop;
    });

    const decl = ts.factory.createInterfaceDeclaration(
      [ts.factory.createModifier(ts.SyntaxKind.ExportKeyword)],
      typeName,
      undefined,
      undefined,
      properties
    );

    return addJsDoc(
      decl,
      `Request parameters for ${endpointName}\n\n${description}`
    ) as ts.InterfaceDeclaration;
  }

  // Build Response interface wrapping payload in FetchResponse
  public buildResponseInterface(
    endpointName: string,
    params: NormalizedParam[],
    description: string
  ): (ts.InterfaceDeclaration | ts.TypeAliasDeclaration)[] {
    const pascalName = toPascalCase(endpointName);
    const dataName = `${pascalName}ResponseData`;
    const responseName = `${pascalName}Response`;

    const responseParam = params.find((p) => p.name === "response");

    let dataDecl: ts.InterfaceDeclaration | ts.TypeAliasDeclaration | undefined;
    if (responseParam) {
      const resolvedType = responseParam.type;
      if (resolvedType === dataName) {
        // Skip creating the type alias, because buildNestedInterfaces has already
        // generated an export interface with this exact name!
        dataDecl = undefined;
      } else {
        dataDecl = ts.factory.createTypeAliasDeclaration(
          [ts.factory.createModifier(ts.SyntaxKind.ExportKeyword)],
          dataName,
          undefined,
          this.getTypeNode(resolvedType)
        );
      }
    } else {
      const nonEnvelopeParams = params.filter(
        (p) => !["request_id", "error", "message"].includes(p.name)
      );

      if (nonEnvelopeParams.length > 0) {
        const properties = nonEnvelopeParams.map((p) => {
          const typeNode = this.getTypeNode(p.type);
          const questionToken = p.optional
            ? ts.factory.createToken(ts.SyntaxKind.QuestionToken)
            : undefined;

          const prop = ts.factory.createPropertySignature(
            undefined,
            p.name,
            questionToken,
            typeNode
          );
          return addJsDoc(prop, p.description) as ts.PropertySignature;
        });

        dataDecl = ts.factory.createInterfaceDeclaration(
          [ts.factory.createModifier(ts.SyntaxKind.ExportKeyword)],
          dataName,
          undefined,
          undefined,
          properties
        );
      } else {
        dataDecl = ts.factory.createTypeAliasDeclaration(
          [ts.factory.createModifier(ts.SyntaxKind.ExportKeyword)],
          dataName,
          undefined,
          ts.factory.createTypeReferenceNode("Record", [
            ts.factory.createKeywordTypeNode(ts.SyntaxKind.StringKeyword),
            ts.factory.createKeywordTypeNode(ts.SyntaxKind.NeverKeyword),
          ])
        );
      }
    }

    const result: (ts.InterfaceDeclaration | ts.TypeAliasDeclaration)[] = [];
    if (dataDecl) {
      const dataDeclWithDoc = addJsDoc(dataDecl, `Response data payload for ${endpointName}`) as
        | ts.InterfaceDeclaration
        | ts.TypeAliasDeclaration;
      result.push(dataDeclWithDoc);
    }

    const responseAlias = ts.factory.createTypeAliasDeclaration(
      [ts.factory.createModifier(ts.SyntaxKind.ExportKeyword)],
      responseName,
      undefined,
      ts.factory.createTypeReferenceNode("FetchResponse", [
        ts.factory.createTypeReferenceNode(dataName),
      ])
    );
    const responseAliasWithDoc = addJsDoc(
      responseAlias,
      `Response payload for ${endpointName}\n\n${description}`
    ) as ts.TypeAliasDeclaration;
    result.push(responseAliasWithDoc);

    return result;
  }

  // Build Manager Method AST
  public buildManagerMethod(
    endpointName: string,
    method: "GET" | "POST",
    path: string,
    auth: boolean,
    timestampPaths: string[],
    description: string
  ): ts.MethodDeclaration {
    const methodName = toCamelCase(endpointName);
    const pascalName = toPascalCase(endpointName);
    const requestType = `${pascalName}Request`;
    const responseType = `${pascalName}Response`;

    // Determine parameter
    const parameter = ts.factory.createParameterDeclaration(
      undefined,
      undefined,
      "params",
      ts.factory.createToken(ts.SyntaxKind.QuestionToken),
      ts.factory.createTypeReferenceNode(requestType),
      undefined
    );

    // Build Fetch Options object literal
    const optionsProperties: ts.ObjectLiteralElementLike[] = [
      ts.factory.createPropertyAssignment("method", ts.factory.createStringLiteral(method)),
    ];

    if (auth) {
      optionsProperties.push(ts.factory.createPropertyAssignment("auth", ts.factory.createTrue()));
    }

    // Pass body (for POST) or params (for GET)
    const payloadProp = method === "POST" ? "body" : "params";
    optionsProperties.push(
      ts.factory.createPropertyAssignment(payloadProp, ts.factory.createIdentifier("params"))
    );

    // Pass timestampPaths if response contains Dates
    if (timestampPaths && timestampPaths.length > 0) {
      const arrayElements = timestampPaths.map((p) => ts.factory.createStringLiteral(p));
      optionsProperties.push(
        ts.factory.createPropertyAssignment(
          "timestampPaths",
          ts.factory.createArrayLiteralExpression(arrayElements)
        )
      );
    }

    const optionsObj = ts.factory.createObjectLiteralExpression(optionsProperties, true);

    // Build call: ShopeeFetch.fetch<GetLateOrdersResponse>(this.config, "/account_health/get_late_orders", { ... })
    const fetchCall = ts.factory.createCallExpression(
      ts.factory.createPropertyAccessExpression(
        ts.factory.createIdentifier("ShopeeFetch"),
        ts.factory.createIdentifier("fetch")
      ),
      [ts.factory.createTypeReferenceNode(responseType)],
      [
        ts.factory.createPropertyAccessExpression(
          ts.factory.createThis(),
          ts.factory.createIdentifier("config")
        ),
        ts.factory.createStringLiteral(path),
        optionsObj,
      ]
    );

    const returnStatement = ts.factory.createReturnStatement(fetchCall);

    const methodDecl = ts.factory.createMethodDeclaration(
      [
        ts.factory.createModifier(ts.SyntaxKind.PublicKeyword),
        ts.factory.createModifier(ts.SyntaxKind.AsyncKeyword),
      ],
      undefined,
      methodName,
      undefined,
      undefined,
      [parameter],
      ts.factory.createTypeReferenceNode("Promise", [
        ts.factory.createTypeReferenceNode(responseType),
      ]),
      ts.factory.createBlock([returnStatement], true)
    );

    return addJsDoc(
      methodDecl,
      `${description || `Executes API endpoint ${path}`}\n\n@param {${requestType}} params Request parameters\n@returns {Promise<${responseType}>} Promise resolving to the response`
    ) as ts.MethodDeclaration;
  }
}
