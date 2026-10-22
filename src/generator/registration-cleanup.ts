import fs from "node:fs";
import path from "node:path";
import ts from "typescript";
import { getManagerClassName, getSdkPropertyName, toPascalCase } from "./types.js";

/** Remove only registrations belonging to previously generator-owned modules. */
export function removeRegistrations(file: string, removed: string[]): void {
  if (!removed.length) return;
  const source = ts.createSourceFile(
    file,
    fs.readFileSync(file, "utf8"),
    ts.ScriptTarget.Latest,
    true
  );
  const classes = new Map(
    removed.map((module) => [getSdkPropertyName(module), getManagerClassName(module)])
  );
  const imports = new Set(removed.map((module) => `./managers/${module}.manager.js`));
  const statements = source.statements
    .filter(
      (stmt) =>
        !ts.isImportDeclaration(stmt) ||
        !ts.isStringLiteral(stmt.moduleSpecifier) ||
        !imports.has(stmt.moduleSpecifier.text)
    )
    .map((stmt) => {
      if (!ts.isClassDeclaration(stmt) || stmt.name?.text !== "ShopeeSDK") return stmt;
      const members = stmt.members
        .filter(
          (member) =>
            !(
              ts.isPropertyDeclaration(member) &&
              ts.isIdentifier(member.name) &&
              member.type &&
              ts.isTypeReferenceNode(member.type) &&
              classes.get(member.name.text) ===
                (member.type as ts.TypeReferenceNode).typeName.getText(source)
            )
        )
        .map((member) => {
          if (!ts.isConstructorDeclaration(member) || !member.body) return member;
          const body = member.body.statements.filter((item) => {
            if (!ts.isExpressionStatement(item) || !ts.isBinaryExpression(item.expression))
              return true;
            const { left, right, operatorToken } = item.expression;
            return !(
              operatorToken.kind === ts.SyntaxKind.EqualsToken &&
              ts.isPropertyAccessExpression(left) &&
              left.expression.kind === ts.SyntaxKind.ThisKeyword &&
              ts.isNewExpression(right) &&
              classes.get(left.name.text) === right.expression.getText(source)
            );
          });
          return ts.factory.updateConstructorDeclaration(
            member,
            member.modifiers,
            member.parameters,
            ts.factory.updateBlock(member.body, body)
          );
        });
      return ts.factory.updateClassDeclaration(
        stmt,
        stmt.modifiers,
        stmt.name,
        stmt.typeParameters,
        stmt.heritageClauses,
        members
      );
    });
  fs.writeFileSync(
    file,
    ts.createPrinter().printFile(ts.factory.updateSourceFile(source, statements))
  );
}

export function updateExports(root: string, modules: string[], removed: string[]): string[] {
  const outputs: string[] = [];
  for (const directory of ["managers", "schemas"]) {
    const relative = `src/${directory}/index.ts`;
    const file = path.join(root, relative);
    const source = ts.createSourceFile(
      file,
      fs.existsSync(file) ? fs.readFileSync(file, "utf8") : "",
      ts.ScriptTarget.Latest,
      true
    );
    const suffix = directory === "managers" ? ".manager.js" : ".js";
    const removedPaths = new Set(removed.map((module) => `./${module}${suffix}`));
    const kept = source.statements.filter(
      (stmt) =>
        !ts.isExportDeclaration(stmt) ||
        !stmt.moduleSpecifier ||
        !ts.isStringLiteral(stmt.moduleSpecifier) ||
        !removedPaths.has(stmt.moduleSpecifier.text)
    );
    const existing = new Set(
      kept
        .filter(ts.isExportDeclaration)
        .map((stmt) => (stmt.moduleSpecifier as ts.StringLiteral | undefined)?.text)
    );
    for (const module of modules) {
      const target = `./${module}${suffix}`;
      if (existing.has(target)) continue;
      // Schema namespaces avoid clashes between module-local types such as Status.
      const clause =
        directory === "schemas"
          ? ts.factory.createNamespaceExport(
              ts.factory.createIdentifier(`${toPascalCase(module)}Schema`)
            )
          : undefined;
      kept.push(
        ts.factory.createExportDeclaration(
          undefined,
          false,
          clause,
          ts.factory.createStringLiteral(target)
        )
      );
    }
    fs.writeFileSync(file, ts.createPrinter().printFile(ts.factory.updateSourceFile(source, kept)));
    outputs.push(relative);
  }
  return outputs;
}
