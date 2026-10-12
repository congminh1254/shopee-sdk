# Integration and contract tests

The normal `npm test` suite includes independent local HTTP tests under
`src/__tests__/contracts`: native fetch, generated managers, HMAC signatures for
partner/shop/merchant/user/principal scopes, query arrays, dates, multipart files,
flat/array/binary responses, exact large integer parsing, refresh retries, and errors.
They bind a temporary loopback server, require no Shopee credentials, and publish no
web preview. Generator compiler fixtures cover accepted/rejected types and removal
of generated modules, SDK registration, and barrel exports.

## Live sandbox runs

Use `npm run test:sandbox` from the repository root. Configure a partner ID/key and
either an existing access/refresh token or sandbox account/password for browser OAuth.
Shop reads also require a shop ID. Numeric identity settings must be positive safe
integers. Never put credential values in source or diagnostic logs; use secure
configuration. Existing injected tokens do not require browser login.

The dedicated runner executes serially, preserves spawn/process failures, and verifies
that the current Jest result file contains at least one passing test. Signal termination,
missing reports, failed tests, and zero-test runs fail the command. Ordinary `npm test`
records unavailable live suites as skipped. An explicitly requested live shop/partner
run fails when its prerequisites are missing.

Negative API tests match explicit error codes and endpoint-specific messages. Network,
authentication, rate-limit, server, and unexpected success outcomes fail those tests;
batch failures also verify the error for the requested order.

Optional read coverage uses:

- `SHOPEE_SANDBOX_MERCHANT_ID`, `SHOPEE_SANDBOX_MERCHANT_ACCESS_TOKEN`, and
  `SHOPEE_SANDBOX_MERCHANT_REFRESH_TOKEN` for a separately authorized merchant.
- `SHOPEE_SANDBOX_ITEM_IDS` for a comma-separated list of existing shop item IDs.
- `SHOPEE_SANDBOX_EXTENDED_READS=1` for recommendation endpoints supported by the
  selected sandbox. Unsupported optional features are skipped, not accepted as a
  successful API call returning an error.

## Mutation lifecycles

Live product/promotion/category/media mutations require
`SHOPEE_SANDBOX_ALLOW_MUTATIONS=1`. Pull-request and push CI runs perform reads only.
The Integration Tests workflow dispatch exposes explicit mutation and extended-read
choices. Use a dedicated test shop with suitable product/category/logistics fixtures;
follow-prize campaigns must not overlap existing campaigns. Tests never delete or end
unrelated campaigns to make their fixtures fit.

Creation is not retried. Capture the returned resource ID before assertions, register
cleanup with `withCleanup`, verify updates by bounded read polling, and remove only
that resource. Combined test/cleanup failures retain both errors. Category deletion is
verified by reading the collection list. Unfinished upload sessions are cancelled;
finished images/videos can remain because these upload APIs offer no corresponding
asset-deletion operation. Enable uploads only in a disposable sandbox where retaining
those assets is acceptable.

Live execution does not establish coverage of every SDK endpoint. Generated mocked
smoke tests cannot independently validate Shopee documentation or remote response
shapes. Keep local transport contracts, generator compile tests, sandbox read checks,
and explicit mutation lifecycles separate in reports.
