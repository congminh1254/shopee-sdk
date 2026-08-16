import fs from "node:fs";
import path from "node:path";
import ts from "typescript";
import {
  EndpointSpec,
  ParsedEnum,
  toPascalCase,
  toCamelCase,
  getManagerClassName,
} from "./types.js";
import { AstBuilder } from "./ast-builder.js";

export class FileMerger {
  private astBuilder: AstBuilder;
  private printer: ts.Printer;

  constructor(astBuilder: AstBuilder) {
    this.astBuilder = astBuilder;
    this.printer = ts.createPrinter({ newLine: ts.NewLineKind.LineFeed });
  }

  public mergeSchemaFile(filePath: string, specs: EndpointSpec[]): void {
    const sourceFile = ts.createSourceFile(
      filePath,
      "", // Always start with empty content to overwrite completely without merging existing code
      ts.ScriptTarget.Latest,
      true,
      ts.ScriptKind.TS
    );

    // Identify all interface names we will generate
    const generatedInterfaceNames = new Set<string>();
    const generatedEnums: ParsedEnum[] = [];
    const astNodes: ts.Node[] = [];

    this.astBuilder.clearRegistry();

    // 1. Process enums and nested interfaces first to resolve names
    for (const spec of specs) {
      generatedInterfaceNames.add(`${toPascalCase(spec.endpointName)}Request`);
      generatedInterfaceNames.add(`${toPascalCase(spec.endpointName)}Response`);

      // Nested sub-interfaces
      // Deep clone to avoid mutating shared structures during dry-run name resolution
      const clonedReqParams = JSON.parse(JSON.stringify(spec.requestParams));
      const clonedResParams = JSON.parse(JSON.stringify(spec.responseParams));

      const nestedReq = this.astBuilder.buildNestedInterfaces(
        clonedReqParams,
        spec.endpointName,
        true,
        `${toPascalCase(spec.endpointName)}Request`
      );
      const nestedRes = this.astBuilder.buildNestedInterfaces(
        clonedResParams,
        spec.endpointName,
        false,
        `${toPascalCase(spec.endpointName)}Response`
      );

      nestedReq.forEach((n) => generatedInterfaceNames.add(n.name.text));
      nestedRes.forEach((n) => generatedInterfaceNames.add(n.name.text));
      generatedEnums.push(...spec.enums);
    }

    // Unique enums
    const uniqueEnums = new Map<string, ParsedEnum>();
    for (const e of generatedEnums) {
      uniqueEnums.set(e.name, e);
    }

    // 2. Filter existing manual statements
    const manualStatements = sourceFile.statements.filter((node) => {
      // Filter out auto-generated Request/Response interfaces and manual types conflicting with generated enums
      if (ts.isInterfaceDeclaration(node) || ts.isTypeAliasDeclaration(node)) {
        const name = node.name.text;
        if (uniqueEnums.has(name)) {
          return false;
        }
        if (
          name.endsWith("Request") ||
          name.endsWith("Response") ||
          name.includes("Request_") ||
          name.includes("Response_")
        ) {
          return false;
        }
        if (generatedInterfaceNames.has(name)) {
          return false;
        }
      }

      // Filter out ALL enums to overwrite them with JSON specs
      if (ts.isEnumDeclaration(node)) {
        return false;
      }

      return true;
    });

    this.astBuilder.clearRegistry(); // Clear the registry so the actual run starts fresh and resolves names identically

    // 3. Generate new nodes
    // Build enums
    for (const [, e] of uniqueEnums.entries()) {
      astNodes.push(this.astBuilder.buildEnum(e));
    }

    // Build interfaces for each endpoint
    for (const spec of specs) {
      // Request nested
      const nestedReq = this.astBuilder.buildNestedInterfaces(
        spec.requestParams,
        spec.endpointName,
        true,
        `${toPascalCase(spec.endpointName)}Request`
      );
      astNodes.push(...nestedReq);

      // Request
      astNodes.push(
        this.astBuilder.buildRequestInterface(
          spec.endpointName,
          spec.requestParams,
          spec.description
        )
      );

      // Response nested
      const nestedRes = this.astBuilder.buildNestedInterfaces(
        spec.responseParams,
        spec.endpointName,
        false,
        `${toPascalCase(spec.endpointName)}Response`
      );
      astNodes.push(...nestedRes);

      // Response
      astNodes.push(
        ...this.astBuilder.buildResponseInterface(
          spec.endpointName,
          spec.responseParams,
          spec.description
        )
      );
    }

    // 4. Combine and check imports
    let finalStatements = [...manualStatements];

    // Ensure BaseResponse and FetchResponse imports exist
    const hasBaseImport = manualStatements.some(
      (s) => ts.isImportDeclaration(s) && s.moduleSpecifier.getText().includes("base.js")
    );
    const hasFetchImport = manualStatements.some(
      (s) => ts.isImportDeclaration(s) && s.moduleSpecifier.getText().includes("fetch.js")
    );

    const extraImports: ts.Statement[] = [];
    if (!hasBaseImport) {
      extraImports.push(
        ts.factory.createImportDeclaration(
          undefined,
          ts.factory.createImportClause(
            false,
            undefined,
            ts.factory.createNamedImports([
              ts.factory.createImportSpecifier(
                false,
                undefined,
                ts.factory.createIdentifier("BaseResponse")
              ),
            ])
          ),
          ts.factory.createStringLiteral("./base.js")
        )
      );
    }
    if (!hasFetchImport) {
      extraImports.push(
        ts.factory.createImportDeclaration(
          undefined,
          ts.factory.createImportClause(
            false,
            undefined,
            ts.factory.createNamedImports([
              ts.factory.createImportSpecifier(
                false,
                undefined,
                ts.factory.createIdentifier("FetchResponse")
              ),
            ])
          ),
          ts.factory.createStringLiteral("./fetch.js")
        )
      );
    }

    // Deduplicate astNodes by name to prevent duplicate declarations in the output
    const seenNames = new Set<string>();
    const uniqueAstNodes: ts.Statement[] = [];
    for (const node of astNodes) {
      if (
        ts.isInterfaceDeclaration(node) ||
        ts.isTypeAliasDeclaration(node) ||
        ts.isEnumDeclaration(node)
      ) {
        const name = node.name.text;
        if (seenNames.has(name)) {
          continue; // Skip duplicate declaration
        }
        seenNames.add(name);
      }
      uniqueAstNodes.push(node as ts.Statement);
    }

    finalStatements = [...extraImports, ...finalStatements, ...uniqueAstNodes];

    // Create printer and output source file
    const outputSource = ts.factory.updateSourceFile(sourceFile, finalStatements);
    let resultString = this.printer.printFile(outputSource);
    resultString = removeUnusedImports(resultString);

    fs.mkdirSync(path.dirname(filePath), { recursive: true });
    fs.writeFileSync(filePath, resultString, "utf-8");
  }

  public mergeManagerFile(filePath: string, specs: EndpointSpec[], moduleName: string): void {
    const className = getManagerClassName(moduleName);

    const defaultContent = `import { ShopeeConfig } from "../sdk.js";
import { BaseManager } from "./base.manager.js";
import { ShopeeFetch } from "../fetch.js";

export class ${className} extends BaseManager {
  constructor(config: ShopeeConfig) {
    super(config);
  }
}
`;

    const sourceFile = ts.createSourceFile(
      filePath,
      defaultContent, // Always use default template to completely overwrite manager class without merging manual methods
      ts.ScriptTarget.Latest,
      true,
      ts.ScriptKind.TS
    );

    // Identify auto-generated method names
    const generatedMethodNames = new Set<string>();
    const generatedTypesToImport = new Set<string>();
    for (const spec of specs) {
      generatedMethodNames.add(toCamelCase(spec.endpointName));
      generatedTypesToImport.add(`${toPascalCase(spec.endpointName)}Request`);
      generatedTypesToImport.add(`${toPascalCase(spec.endpointName)}Response`);
    }

    // Filter statements, separate imports
    let classNode: ts.ClassDeclaration | undefined;
    const remainingStatements = sourceFile.statements.filter((s) => {
      if (ts.isClassDeclaration(s) && s.name?.text === className) {
        classNode = s;
        return false;
      }
      // Remove any existing import from schemas/module
      if (
        ts.isImportDeclaration(s) &&
        s.moduleSpecifier.getText().includes(`/schemas/${moduleName}.js`)
      ) {
        return false;
      }
      return true;
    });

    if (!classNode) {
      throw new Error(`Class ${className} not found in ${filePath}`);
    }

    // Separate class members: manual vs auto-generated methods
    const manualMembers = classNode.members.filter((m) => {
      if (ts.isMethodDeclaration(m) && m.name) {
        const nameText = m.name.getText(sourceFile);
        if (generatedMethodNames.has(nameText)) {
          return false;
        }
      }
      return true;
    });

    // Generate new manager methods
    const generatedMethods = specs.map((spec) => {
      return this.astBuilder.buildManagerMethod(
        spec.endpointName,
        spec.method,
        spec.path,
        spec.auth,
        spec.timestampPaths,
        spec.description
      );
    });

    // Merge class members
    const updatedClass = ts.factory.updateClassDeclaration(
      classNode,
      classNode.modifiers,
      classNode.name,
      classNode.typeParameters,
      classNode.heritageClauses,
      [...manualMembers, ...generatedMethods]
    );

    // Create the schema import statement: import { GetLateOrdersRequest, ... } from "../schemas/module.js";
    const schemaImportNode = ts.factory.createImportDeclaration(
      undefined,
      ts.factory.createImportClause(
        false,
        undefined,
        ts.factory.createNamedImports(
          [...generatedTypesToImport].map((t) =>
            ts.factory.createImportSpecifier(false, undefined, ts.factory.createIdentifier(t))
          )
        )
      ),
      ts.factory.createStringLiteral(`../schemas/${moduleName}.js`)
    );

    // Assemble final statements
    const finalStatements = [schemaImportNode, ...remainingStatements, updatedClass];

    const outputSource = ts.factory.updateSourceFile(sourceFile, finalStatements);
    let resultString = this.printer.printFile(outputSource);
    resultString = removeUnusedImports(resultString);

    fs.mkdirSync(path.dirname(filePath), { recursive: true });
    fs.writeFileSync(filePath, resultString, "utf-8");
  }
}

function removeUnusedImports(sourceText: string): string {
  const tempSourceFile = ts.createSourceFile("temp.ts", sourceText, ts.ScriptTarget.Latest, true);
  const identifiers = new Set<string>();

  // Collect all identifiers used outside of imports
  const visit = (node: ts.Node) => {
    if (ts.isIdentifier(node)) {
      let parent = node.parent;
      let isInsideImport = false;
      while (parent) {
        if (
          ts.isImportSpecifier(parent) ||
          ts.isImportClause(parent) ||
          ts.isImportDeclaration(parent)
        ) {
          isInsideImport = true;
          break;
        }
        parent = parent.parent;
      }
      if (!isInsideImport) {
        identifiers.add(node.text);
      }
    }
    ts.forEachChild(node, visit);
  };

  ts.forEachChild(tempSourceFile, visit);

  // Transform named imports to filter out unused ones
  const transformer = (context: ts.TransformationContext) => {
    return (rootNode: ts.SourceFile) => {
      const visitNode = (node: ts.Node): ts.Node | undefined => {
        if (ts.isImportDeclaration(node)) {
          const clause = node.importClause;
          if (clause && clause.namedBindings && ts.isNamedImports(clause.namedBindings)) {
            const activeElements = clause.namedBindings.elements.filter((el) => {
              return identifiers.has(el.name.text);
            });
            if (activeElements.length === 0) {
              return undefined; // entire import is unused
            }
            return ts.factory.updateImportDeclaration(
              node,
              node.modifiers,
              ts.factory.updateImportClause(
                clause,
                clause.isTypeOnly,
                clause.name,
                ts.factory.createNamedImports(activeElements)
              ),
              node.moduleSpecifier,
              node.attributes
            );
          }
        }
        return ts.visitEachChild(node, visitNode, context);
      };
      return ts.visitNode(rootNode, visitNode) as ts.SourceFile;
    };
  };

  const result = ts.transform(tempSourceFile, [transformer]);
  const printer = ts.createPrinter({ newLine: ts.NewLineKind.LineFeed });
  return printer.printFile(result.transformed[0]);
}
