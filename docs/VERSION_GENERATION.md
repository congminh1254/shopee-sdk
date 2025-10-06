# Version Generation

## Overview

The SDK version is auto-generated during the build process to support tree-shaking in applications.

## How It Works

1. **Prebuild Script**: The `scripts/generate-version.js` script runs before the build process
2. **Version Extraction**: It reads the version from `package.json`
3. **File Generation**: It creates `src/version.ts` with the version as a constant export
4. **Import**: The `src/fetch.ts` file imports `SDK_VERSION` from `version.ts`
5. **Build**: TypeScript compiles the version file along with the rest of the codebase

## Why This Approach?

In applications that use tree-shaking (like modern bundlers), the `package.json` file is not included in the bundle. Reading the version at runtime using `fs.readFileSync` would fail in such environments.

By generating a TypeScript constant file during the build process:
- The version is embedded directly in the code
- No runtime file system access is needed
- The version can be tree-shaken along with the rest of the code
- Bundle size is optimized

## Files

- `scripts/generate-version.js`: Script that generates the version file
- `src/version.ts`: Auto-generated file (not committed to git)
- `lib/version.js`: Compiled version file (committed to git, published to npm)

## For Developers

The `src/version.ts` file is automatically generated when you run:
- `npm run build` (which runs prebuild automatically)
- `npm run prebuild` (explicitly)

**Do not manually edit `src/version.ts`** - it will be overwritten on the next build.
