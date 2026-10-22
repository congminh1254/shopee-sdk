# User authentication for Video and Livestream

Video and Livestream APIs authenticate a Shopee **user**, using `user_id` rather than `shop_id`. The app needs the relevant Shopee Video Management or Livestream Management permissions. A seller/shop token cannot substitute for a user authorization.

## Authorize and select a user

```ts
import { ShopeeSDK } from "@congminh1254/shopee-sdk";
import { CustomTokenStorage } from "@congminh1254/shopee-sdk/storage";

const userId = 123456; // The user authorized by your app.
const sdk = new ShopeeSDK(
  { partner_id: partnerId, partner_key: partnerKey },
  new CustomTokenStorage({ user_id: userId })
);

const authorizationUrl = sdk.getAuthorizationUrl(callbackUrl, { auth_type: "user" });
// Redirect to authorizationUrl, then process the callback's one-time code.
await sdk.authenticateWithCode(code, undefined, undefined, userId);

const videos = await sdk.video.getVideoList({
  page_no: 1,
  page_size: 20,
  list_type: [2], // Posted videos.
});
```

The fourth argument to `authenticateWithCode` (and `auth.getAccessToken`) selects the authorized user locally. It is not sent in the code-exchange body: Shopee documents `code`, `partner_id`, and optional `shop_id`/`main_account_id` for that request. The response contains `user_id_list`. When it contains exactly one user, the SDK selects that user automatically, so `authenticateWithCode(code)` also works. When multiple users are returned, select one explicitly; the SDK will not guess. A selection outside the returned list is rejected.

Use a separate SDK/storage instance for each selected user. `CustomTokenStorage({ user_id })` stores `.token/user-<id>.json`, separately from shop files and the default token. Existing numeric shop storage keys remain supported. Applications with their own `TokenStorage` should likewise namespace storage by identity type and ID, and persist the selected `user_id` alongside the token.

## Signing and refresh

Video and Livestream managers use `auth: "user"`. The request query contains `partner_id`, `timestamp`, `access_token`, `user_id`, and `sign`. The HMAC-SHA256 input is the concatenation, without delimiters, of:

```text
partner_id + full API path + timestamp + access_token + user_id
```

The key is `partner_key`; the full path includes `/api/v2`, for example `/api/v2/video/get_video_list`. A missing/invalid selected user fails locally. Existing `auth: true` requests continue to use shop authentication.

Expiry refresh and the single retry after an invalid-token response preserve the selected user. Refresh sends `user_id` in the JSON body, separately from shop or merchant identities, and stores the rotated tokens. `sdk.refreshToken()` uses the stored identity. The low-level explicit form is `sdk.auth.getRefreshToken(refreshToken, undefined, undefined, userId)`.

Shopee documents refresh tokens as single-use per identity. Persist the returned replacement and avoid concurrent refreshes of the same token across application workers.

## Tests

The HTTP integration test exercises a local gateway using real transport and an independent HMAC implementation. It covers authorization exchange, user selection, video/livestream signing, expiry refresh, token rotation, and bounded retry:

```sh
npm test -- --runInBand --coverage=false src/__tests__/integration/user-auth.integration.test.ts
```

The optional live test reads one page of posted videos. Use a fresh **user** access token from an app with Video permission. It does not consume refresh tokens or publish/change videos. Enable it explicitly; missing configuration or API errors fail the test:

```sh
# Supply these via your environment or secret manager; do not commit tokens.
export SHOPEE_RUN_USER_INTEGRATION=1
export SHOPEE_USER_PARTNER_ID=...
export SHOPEE_USER_PARTNER_KEY=...
export SHOPEE_USER_ID=...
export SHOPEE_USER_ACCESS_TOKEN=...
# Optional: SHOPEE_USER_BASE_URL, defaults to the global production API.
npm test -- --runInBand --coverage=false src/__tests__/integration/user-video.live.integration.test.ts
```

## Documentation investigation (issue #288)

The implementation uses Shopee's documentation snapshots already checked into this repository, fetched by `schemas/fetch.ts` from the official documentation API. Fresh access to the public web page and documentation API returned HTTP 403 during this investigation, so these findings are verified against the snapshots, not a newly downloaded version:

- [Video list](https://open.shopee.com/documents/v2/v2.video.get_video_list?module=129&type=1): `schemas/v2.video.get_video_list.json` declares `api_type: "User"`, common `user_id`, user-based signature, and the Video Management app permission. All 15 Video and 25 Livestream snapshots declare User authentication. The generator now derives user auth from this metadata rather than assuming every non-public manager uses shop auth.
- [Code exchange](https://open.shopee.com/documents/v2/v2.public.get_access_token?module=104&type=1): `schemas/v2.public.get_access_token.json` returns `user_id_list` but does not list `user_id` among request fields. This is why the new optional user argument selects the response identity without changing the exchange payload.
- [Refresh](https://open.shopee.com/documents/v2/v2.public.refresh_access_token?module=104&type=1): `schemas/v2.public.refresh_access_token.json` accepts and returns `user_id`. Its request descriptions require identities to be refreshed separately and state that refresh tokens can be used only once per identity.

The snapshots also expose independent authentication gaps for Merchant/Principal APIs and public Media endpoints. Those need a separate audit; this change adds User support while preserving existing behavior for other auth types.
