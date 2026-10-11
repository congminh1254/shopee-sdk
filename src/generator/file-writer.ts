import fs from "node:fs";
import path from "node:path";
import ts from "typescript";
import { EndpointSpec, getManagerClassName, toCamelCase, toPascalCase } from "./types.js";
import { AstBuilder } from "./ast-builder.js";

/** Owns generated files completely. Handwritten code belongs outside these outputs. */
export class FileWriter {
  private printer = ts.createPrinter({ newLine: ts.NewLineKind.LineFeed });

  constructor(private astBuilder: AstBuilder) {}

  public writeSchemaFile(filePath: string, specs: EndpointSpec[]): void {
    const localSpecs = structuredClone(specs);
    this.astBuilder.clearRegistry();
    this.astBuilder.enumNames.clear();
    const enums = new Map<string, string>();
    const nodes: ts.Statement[] = [];
    for (const spec of localSpecs) {
      for (const value of spec.enums) {
        const declaration = this.astBuilder.buildEnum(value);
        if (!enums.has(value.name)) {
          enums.set(
            value.name,
            JSON.stringify([value.type, value.members.map((m) => [m.name, m.value]).sort()])
          );
          nodes.push(declaration);
        }
        const key = JSON.stringify([
          value.type,
          value.members.map((m) => [m.name, m.value]).sort(),
        ]);
        if (enums.get(value.name) !== key) throw new Error(`Conflicting enum ${value.name}`);
        this.astBuilder.enumNames.add(value.name);
      }
    }
    for (const spec of localSpecs) {
      nodes.push(
        ...this.astBuilder.buildNestedInterfaces(
          spec.requestParams,
          spec.endpointName,
          true,
          `${toPascalCase(spec.endpointName)}Request`
        )
      );
      nodes.push(
        this.astBuilder.buildRequestInterface(
          spec.endpointName,
          spec.requestParams,
          spec.description
        )
      );
      nodes.push(
        ...this.astBuilder.buildNestedInterfaces(
          spec.responseParams,
          spec.endpointName,
          false,
          `${toPascalCase(spec.endpointName)}Response`
        )
      );
      nodes.push(
        ...this.astBuilder.buildResponseInterface(
          spec.endpointName,
          spec.responseParams,
          spec.description
        )
      );
    }
    const unique = new Map<string, { key: string; node: ts.Statement }>();
    for (const node of nodes) {
      if (
        !ts.isInterfaceDeclaration(node) &&
        !ts.isTypeAliasDeclaration(node) &&
        !ts.isEnumDeclaration(node)
      )
        continue;
      // Comments describe usage, not structure. Compare declarations without synthetic comments.
      const comparable = ts.isInterfaceDeclaration(node)
        ? ts.factory.updateInterfaceDeclaration(
            node,
            node.modifiers,
            node.name,
            node.typeParameters,
            node.heritageClauses,
            [...node.members].sort((a, b) =>
              String((a.name as ts.Identifier)?.text).localeCompare(
                String((b.name as ts.Identifier)?.text)
              )
            )
          )
        : node;
      const key = ts
        .createPrinter({ removeComments: true })
        .printNode(
          ts.EmitHint.Unspecified,
          comparable,
          ts.createSourceFile("generated.ts", "", ts.ScriptTarget.Latest)
        );
      const previous = unique.get(node.name.text);
      if (previous && previous.key !== key)
        throw new Error(
          `Conflicting generated declaration ${node.name.text} in ${filePath}:\n${previous.key}\nvs\n${key}`
        );
      if (!previous) unique.set(node.name.text, { key, node });
    }
    this.write(
      filePath,
      'import { FetchResponse } from "./fetch.js";\n' +
        [...unique.values()].map(({ node }) => this.print(node)).join("\n")
    );
  }

  public writeManagerFile(filePath: string, specs: EndpointSpec[], moduleName: string): void {
    const names = new Set<string>();
    const imports: string[] = [];
    const methods = specs.map((spec) => {
      const name = toCamelCase(spec.endpointName);
      if (names.has(name)) throw new Error(`Duplicate manager method ${name}`);
      names.add(name);
      imports.push(
        `${toPascalCase(spec.endpointName)}Request`,
        `${toPascalCase(spec.endpointName)}Response`
      );
      return this.print(
        this.astBuilder.buildManagerMethod(
          spec.endpointName,
          spec.method,
          spec.path,
          spec.auth,
          spec.timestampPaths,
          spec.description,
          spec.requestParams
        )
      );
    });
    this.write(
      filePath,
      `import { ${imports.join(", ")} } from "../schemas/${moduleName}.js";
import { ShopeeConfig } from "../sdk.js";
import { BaseManager } from "./base.manager.js";
import { ShopeeFetch } from "../fetch.js";
export class ${getManagerClassName(moduleName)} extends BaseManager {
  constructor(config: ShopeeConfig) { super(config); }
  ${methods.join("\n")}
}
`
    );
  }

  private print(node: ts.Node): string {
    const source = ts.createSourceFile("generated.ts", "", ts.ScriptTarget.Latest);
    return this.printer.printNode(ts.EmitHint.Unspecified, node, source);
  }

  private write(filePath: string, content: string): void {
    fs.mkdirSync(path.dirname(filePath), { recursive: true });
    fs.writeFileSync(
      filePath,
      `// NOTE: This file is auto-generated. Do not edit directly.\n\n${content}`,
      "utf8"
    );
  }
}
