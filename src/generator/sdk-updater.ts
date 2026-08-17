import fs from "node:fs";
import ts from "typescript";
import { getManagerClassName, getSdkPropertyName } from "./types.js";

export function updateSdkRegistration(sdkFilePath: string, modules: string[]): void {
  const existingContent = fs.readFileSync(sdkFilePath, "utf-8");

  const sourceFile = ts.createSourceFile(
    sdkFilePath,
    existingContent,
    ts.ScriptTarget.Latest,
    true,
    ts.ScriptKind.TS
  );

  // Analyze existing imports and properties
  const importedManagers = new Set<string>();
  const classProperties = new Set<string>();
  const constructorAssignments = new Set<string>();

  // Helper to parse imports
  sourceFile.statements.forEach((s) => {
    if (ts.isImportDeclaration(s) && s.importClause?.namedBindings) {
      const bindings = s.importClause.namedBindings;
      if (ts.isNamedImports(bindings)) {
        bindings.elements.forEach((el) => {
          if (el.name.text.endsWith("Manager")) {
            importedManagers.add(el.name.text);
          }
        });
      }
    }
  });

  // Find class and constructor details
  let sdkClass: ts.ClassDeclaration | undefined;
  let constructorNode: ts.ConstructorDeclaration | undefined;

  sourceFile.statements.forEach((s) => {
    if (ts.isClassDeclaration(s) && s.name?.text === "ShopeeSDK") {
      sdkClass = s;
      s.members.forEach((m) => {
        if (ts.isPropertyDeclaration(m) && m.name) {
          classProperties.add(m.name.getText(sourceFile));
        } else if (ts.isConstructorDeclaration(m)) {
          constructorNode = m;
          // check constructor body for assignments
          if (m.body) {
            m.body.statements.forEach((stmt) => {
              if (
                ts.isExpressionStatement(stmt) &&
                ts.isBinaryExpression(stmt.expression) &&
                ts.isPropertyAccessExpression(stmt.expression.left) &&
                stmt.expression.left.expression.kind === ts.SyntaxKind.ThisKeyword
              ) {
                constructorAssignments.add(stmt.expression.left.name.text);
              }
            });
          }
        }
      });
    }
  });

  if (!sdkClass || !constructorNode) {
    throw new Error("Could not locate ShopeeSDK class or its constructor in sdk.ts");
  }

  const modulesToRegister = modules.filter((m) => {
    const managerName = getManagerClassName(m);
    const propertyName = getSdkPropertyName(m);
    return (
      !importedManagers.has(managerName) ||
      !classProperties.has(propertyName) ||
      !constructorAssignments.has(propertyName)
    );
  });

  if (modulesToRegister.length === 0) {
    return; // All modules are already registered!
  }

  // Build new imports, properties, and assignments
  const newImportStatements: ts.ImportDeclaration[] = [];
  const newProperties: ts.PropertyDeclaration[] = [];
  const newAssignments: ts.ExpressionStatement[] = [];

  for (const m of modulesToRegister) {
    const managerName = getManagerClassName(m);
    const propertyName = getSdkPropertyName(m);
    const kebabName = m.replace(/_/g, "-");

    // Create import: import { AccountHealthManager } from "./managers/account-health.manager.js";
    const importStmt = ts.factory.createImportDeclaration(
      undefined,
      ts.factory.createImportClause(
        false,
        undefined,
        ts.factory.createNamedImports([
          ts.factory.createImportSpecifier(
            false,
            undefined,
            ts.factory.createIdentifier(managerName)
          ),
        ])
      ),
      ts.factory.createStringLiteral(`./managers/${kebabName}.manager.js`)
    );
    newImportStatements.push(importStmt);

    // Create property: public readonly accountHealth: AccountHealthManager;
    const propDecl = ts.factory.createPropertyDeclaration(
      [
        ts.factory.createModifier(ts.SyntaxKind.PublicKeyword),
        ts.factory.createModifier(ts.SyntaxKind.ReadonlyKeyword),
      ],
      propertyName,
      undefined,
      ts.factory.createTypeReferenceNode(managerName),
      undefined
    );
    newProperties.push(propDecl);

    // Create assignment: this.accountHealth = new AccountHealthManager(this.config);
    const assignStmt = ts.factory.createExpressionStatement(
      ts.factory.createBinaryExpression(
        ts.factory.createPropertyAccessExpression(
          ts.factory.createThis(),
          ts.factory.createIdentifier(propertyName)
        ),
        ts.factory.createToken(ts.SyntaxKind.EqualsToken),
        ts.factory.createNewExpression(ts.factory.createIdentifier(managerName), undefined, [
          ts.factory.createPropertyAccessExpression(
            ts.factory.createThis(),
            ts.factory.createIdentifier("config")
          ),
        ])
      )
    );
    newAssignments.push(assignStmt);
  }

  // Update statements list by inserting imports
  const lastImportIndex = sourceFile.statements.reduce((acc, stmt, index) => {
    return ts.isImportDeclaration(stmt) ? index : acc;
  }, 0);

  const updatedStatements = [
    ...sourceFile.statements.slice(0, lastImportIndex + 1),
    ...newImportStatements,
    ...sourceFile.statements.slice(lastImportIndex + 1),
  ];

  // Re-map statements to insert properties and constructor assignments in the class
  const classIndex = updatedStatements.findIndex(
    (s) => ts.isClassDeclaration(s) && s.name?.text === "ShopeeSDK"
  );

  const classNodeToUpdate = updatedStatements[classIndex] as ts.ClassDeclaration;

  // Insert properties before constructor
  const constructorIndexInClass = classNodeToUpdate.members.findIndex((m) =>
    ts.isConstructorDeclaration(m)
  );

  const updatedClassMembers = [
    ...classNodeToUpdate.members.slice(0, constructorIndexInClass),
    ...newProperties,
    ...classNodeToUpdate.members.slice(constructorIndexInClass),
  ];

  // Insert constructor assignments in constructor body
  const updatedConstructorIndex = updatedClassMembers.findIndex((m) =>
    ts.isConstructorDeclaration(m)
  );
  const oldConstructor = updatedClassMembers[updatedConstructorIndex] as ts.ConstructorDeclaration;

  const updatedConstructor = ts.factory.updateConstructorDeclaration(
    oldConstructor,
    oldConstructor.modifiers,
    oldConstructor.parameters,
    ts.factory.createBlock([...(oldConstructor.body?.statements ?? []), ...newAssignments], true)
  );

  updatedClassMembers[updatedConstructorIndex] = updatedConstructor;

  const updatedClass = ts.factory.updateClassDeclaration(
    classNodeToUpdate,
    classNodeToUpdate.modifiers,
    classNodeToUpdate.name,
    classNodeToUpdate.typeParameters,
    classNodeToUpdate.heritageClauses,
    updatedClassMembers
  );

  updatedStatements[classIndex] = updatedClass;

  // Print final AST back to sdk.ts
  const printer = ts.createPrinter({ newLine: ts.NewLineKind.LineFeed });
  const outputSource = ts.factory.updateSourceFile(sourceFile, updatedStatements);
  const resultString = printer.printFile(outputSource);

  fs.writeFileSync(sdkFilePath, resultString, "utf-8");
}
