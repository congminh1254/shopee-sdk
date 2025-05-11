# Release Trigger

This file is used to trigger the initial release process.

## How to trigger a release

Make a commit with a conventional commit message, for example:

- `feat: add Voucher API endpoints` (triggers minor version)
- `fix: correct error handling in API responses` (triggers patch version)
- `docs: update API documentation` (no version change)
- `feat!: rename API parameters` (triggers major version) 