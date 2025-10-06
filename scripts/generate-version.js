#!/usr/bin/env node

import { readFileSync, writeFileSync } from 'fs';
import { dirname, join } from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// Read version from package.json
const packageJsonPath = join(__dirname, '../package.json');
const packageJson = JSON.parse(readFileSync(packageJsonPath, 'utf-8'));
const version = packageJson.version;

// Generate version.ts file
const versionFileContent = `// This file is auto-generated during the build process. Do not edit manually.
export const SDK_VERSION = "${version}";
`;

const versionFilePath = join(__dirname, '../src/version.ts');
writeFileSync(versionFilePath, versionFileContent, 'utf-8');

console.log(`Generated version.ts with version: ${version}`);
