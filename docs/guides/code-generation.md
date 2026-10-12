# Developing the code generator

Run `npm ci` and `npm run generate` from the repository root. Generation consumes
`schemas/v2.<module>.<endpoint>.json` and owns the generated module schema files,
module manager files, and `src/__tests__/generated/*.generated.test.ts` entirely.
Keep handwritten behavior in separate files. `src/sdk.ts` is updated only to add
missing manager imports, properties, and constructor assignments.

The pipeline parses every schema, renders into a temporary copy of `src`, formats
and lints its outputs with the repository configuration, and type-checks the stage.
Only a successful validation publishes files to the checkout. A validation failure
exits nonzero and leaves existing outputs and generated tests intact. Publication
uses temporary-file replacement and restores previous contents if a write fails.
This is rollback for caught filesystem errors, not a crash-proof multi-file transaction.
No repository-wide formatter or lint autofix runs against handwritten source.

Schema errors include the source filename. Unsupported HTTP methods, malformed
parameter trees, unexpected JSON filenames, and colliding generated declarations
fail generation. Input filenames are sorted for deterministic output. Documentation
annotations in either parenthesis style are removed from endpoint names; Brazil-only
availability stays in generated documentation.

Nested interface identity includes all descendant shapes and field optionality.
Identical shapes may share a declaration; incompatible shapes receive distinct
names. Identical enums share a module-local declaration. Conflicting enum definitions
receive endpoint/request-or-response/field-path names, rather than silently keeping
the last definition. Unknown remaining declaration collisions stop generation.

Methods require a request object when the schema contains a required top-level
field; empty requests and requests with only optional fields remain optional.
Timestamp conversion paths come only from response fields. Generated tests assert
exact forwarding options, including auth and timestamp paths, using the standard
Jest matchers. They are contract smoke tests, not independent evidence that upstream
Shopee documentation is accurate.

Run `npm test -- --runTestsByPath src/__tests__/generator/correctness.test.ts` for
collision, schema validation, registration, publication rollback, and isolated
pipeline checks. For a change to parsing or generation, also run `npm run build`,
`npm test -- --maxWorkers=2`, `npm run lint`, and `npm run format:check`. Run
`npm run generate` again and confirm there is no additional diff.

This generator correction intentionally tightens required-request signatures,
qualifies conflicting enums, and restores nested types that were previously lost.
Consumers must migrate to the corrected generated types; backward compatibility
aliases are not maintained. Upstream documentation exceptions should be recorded
explicitly with a comment and regression test, rather than hidden by permissive
assertions.

## Request and response contracts

Authentication comes from `common_params` and the documentation API scope:
partner requests omit tokens; shop, merchant, and user requests bind their respective
identity to the signature; principal requests use a token without a shop identity.
Generated options use `authMode` for scopes beyond shop authentication. Configure
`merchant_id` or `user_id` explicitly and use a token issued for that identity. Use
separate SDK instances/storage for distinct authorization scopes.

Enum fields retain their scalar/array shape and their string/number primitive type.
Flat responses remain flat, `response` payloads remain wrapped, and file-only download
responses are `Buffer`s. Error/message metadata may be absent on successful responses.
Fields with incomplete object definitions are `unknown`, requiring consumer narrowing.
Unsupported type names stop generation with a filename-specific diagnostic.

`int64`/`uint64` fields use `Integer` (`number | string`). Safe JSON integer tokens stay
numbers; larger decimal integer tokens stay exact strings. Supply large request IDs as
decimal strings: unsafe numeric requests are rejected. Unsafe integer-valued response
literals written with a decimal point/exponent are rejected rather than rounded;
ordinary finite fractional values use JavaScript number semantics. `BinaryFile` accepts
`Buffer | Blob`, and multipart image collections may also accept arrays of files.

On module removal, only files bearing the generator ownership header are deleted.
Their SDK registrations and barrel exports are removed in the same validated batch.
Handwritten managers remain intact. New schema barrel entries use namespaces when a
module has no existing export, avoiding collisions between module-local type names.

`npm run fetch-schemas` downloads into a temporary catalog and publishes only after
every selected endpoint succeeds and validates. Partial failures and duplicate or
unsafe filenames preserve the previous catalog; helper source files are retained.
Embedded integer samples use the same precision policy as runtime JSON. This prevents
generator cleanup from interpreting an incomplete download as intentional API removal.
